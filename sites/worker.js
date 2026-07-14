import { submitIntake } from "./intake.js";

function jsonResponse(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

async function handleIntake(request, environment) {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405, {
      Allow: "POST",
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "A valid JSON body is required." }, 400);
  }

  const result = await submitIntake(body, environment);
  return jsonResponse(result.body, result.status);
}

async function serveSite(request, environment) {
  if (!environment.ASSETS?.fetch) {
    return new Response("Static asset binding is unavailable.", {
      status: 500,
    });
  }

  const response = await environment.ASSETS.fetch(request);
  if (response.status !== 404 || !["GET", "HEAD"].includes(request.method)) {
    return response;
  }

  const indexUrl = new URL("/index.html", request.url);
  return environment.ASSETS.fetch(new Request(indexUrl, request));
}

export default {
  async fetch(request, environment) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/intake") {
      return handleIntake(request, environment);
    }

    return serveSite(request, environment);
  },
};
