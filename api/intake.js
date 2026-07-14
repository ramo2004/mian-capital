const destinationEmail = "wlmian31@gmail.com";
const allowedTopics = new Set([
  "Portfolio screening",
  "Investment advice",
  "Open brokerage account",
  "Shariah compliance review",
  "Account transfer",
  "Other",
]);

function cleanString(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizePayload(body) {
  const name = cleanString(body?.name, 120);
  const email = cleanString(body?.email, 180).toLowerCase();
  const phone = cleanString(body?.phone, 60);
  const details = cleanString(body?.details, 2000);
  const topics = Array.isArray(body?.topics)
    ? body.topics
        .map((topic) => cleanString(topic, 80))
        .filter((topic) => allowedTopics.has(topic))
    : [];

  if (!name) {
    return { error: "Name is required." };
  }

  if (!isValidEmail(email)) {
    return { error: "A valid email is required." };
  }

  return {
    data: {
      name,
      email,
      phone,
      details,
      topics: topics.length ? topics : ["General inquiry"],
    },
  };
}

function buildEmail({ name, email, phone, details, topics }) {
  const topicLine = topics.join(", ");
  const text = [
    "New Mian Capital intake submission",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Topics: ${topicLine}`,
    "",
    "Optional details:",
    details || "Not provided",
  ].join("\n");

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Topics", topicLine],
    ["Optional details", details || "Not provided"],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding:8px 12px;border-bottom:1px solid #e7dfcf;vertical-align:top;">${escapeHtml(label)}</th>
          <td style="padding:8px 12px;border-bottom:1px solid #e7dfcf;">${escapeHtml(value).replaceAll("\n", "<br>")}</td>
        </tr>`,
    )
    .join("");

  return {
    subject: `Mian Capital inquiry: ${topicLine}`,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;color:#071b3a;">
        <h1 style="font-size:20px;margin:0 0 16px;">New Mian Capital intake submission</h1>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:680px;">
          ${htmlRows}
        </table>
      </div>`,
  };
}

export async function submitIntake(body, environment) {
  const apiKey = environment?.RESEND_API_KEY;
  const fromEmail = environment?.INTAKE_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return {
      status: 500,
      body: { error: "Email delivery is not configured." },
    };
  }

  const normalized = normalizePayload(body);
  if (normalized.error) {
    return { status: 400, body: { error: normalized.error } };
  }

  const email = buildEmail(normalized.data);

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: destinationEmail,
        reply_to: normalized.data.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error("Resend delivery failed", {
        status: resendResponse.status,
        body: errorBody,
      });
      return {
        status: 502,
        body: { error: "Email delivery failed. Please try again." },
      };
    }

    return { status: 200, body: { ok: true } };
  } catch (error) {
    console.error("Intake submission failed", error);
    return {
      status: 502,
      body: { error: "Email delivery failed. Please try again." },
    };
  }
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const result = await submitIntake(request.body, process.env);
  return response.status(result.status).json(result.body);
}
