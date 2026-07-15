# Handoff

## Goal + Current Status

Redesign Mian Capital in the approved calm premium advisory direction while keeping the site concise and easy to understand, then deploy it publicly with ChatGPT Sites. The concise-copy pass and production intake email are live at `https://mian-capital-advisory.omarimian.chatgpt.site` from Sites version 3 / commit `259d33a`; desktop/mobile QA, production asset/copy checks, and end-to-end Resend delivery pass. The prior design remains recoverable from tag `pre-calm-premium-redesign-2026-07-12`.

## Key Decisions

- The previous site is safely stored on GitHub at commit `25e102b` and annotated tag `pre-calm-premium-redesign-2026-07-12`.
- Replaced the mixed neo-brutalist/fintech styling with an ivory, navy, muted olive, and restrained gold editorial system inspired by the approved first mockup.
- Removed the WebGL shader, Three/R3F dependencies, and generated journey images. The hero atmosphere is now lightweight CSS linework and tonal washes.
- Replaced the animated sticker-like logo with a quiet serif `Mian Capital` wordmark and static gold rule.
- Reframed the primary CTA as `Request an introductory call`; retained concise reassurance and avoided adding speculative marketing sections.
- Rebuilt the hero, journey, and holdings review around code-native advisory documents rather than dashboards or decorative imagery.
- The report uses illustrative holding categories and explicit sample labels rather than unsupported compliance percentages or claims about real securities.
- Only the primary journey retains `01 / 02 / 03`. Supporting artifact numbers, the numbered advisor list, the repeated report-deliverables strip, and the requested explanatory captions were removed.
- `Our approach` now serves only as the journey label; the redundant section headline and explanatory paragraph were removed so step 01 begins immediately.
- Copy is intentionally direct: removed dashboard/platform comparisons, filler qualifiers, the report advisor note, the intake timing claim, and all em dashes from shipped source.
- The footer tagline is `Invest Islamically.`
- Motion is limited to one hero sequence and restrained section reveals. Content is visible by default and `prefers-reduced-motion` remains supported.
- Added a real mobile menu, opaque sticky-header layers, and removed modal backdrop blur after headed Chromium exposed GPU black-compositing artifacts.
- Intake topics are initially unselected. Phone and details are explicitly optional. Mobile actions remain sticky; success replaces the form; errors preserve data, scroll into view, and offer a direct email fallback.
- Added modal focus containment, Escape handling, body scroll lock, and focus restoration.
- Team content remains intentionally honest: layout is complete, but a real founder name, biography, credentials, and portrait were not invented.

## Assumptions / Invariants + Env Notes

- Project root: `/Users/omarmian/dev/islamic finance`.
- Node `v24.15.0`, npm `11.12.1`, Vite `8.0.16`, React `19.2.7`.
- Production email uses a dedicated sending-only Resend key restricted to the verified `mail.lanternnav.com` domain. Sites stores `RESEND_API_KEY` as a secret and `INTAKE_FROM_EMAIL` as `Mian Capital <intake@mail.lanternnav.com>`; no secret value is stored in the repo.
- Local Vite does not run `/api/intake`. Browser success/error states were verified with mocked responses; the handler logic remains serverless/Vercel-compatible.
- No GitHub Actions workflows are configured for `ramo2004/mian-capital`.

## Files Touched

- `src/App.jsx`: complete page composition, copy, document artifacts, navigation, Team page, intake states, accessibility, routing, and restrained GSAP motion.
- `styles.css`: calm premium design system, responsive layouts, report/artifact styling, modal/mobile behavior, and compositing hardening.
- `index.html`: Islamic-investment metadata, theme color, title, and simplified favicon.
- `package.json`, `package-lock.json`: removed `@shadergradient/react`, `@react-three/fiber`, and `three`.
- Deleted `src/components/ShaderAtmosphere.jsx`, `src/components/ViewportVisual.jsx`, and the three generated journey PNGs.
- `HANDOFF.md`: consolidated for a cold restart.
- `.openai/hosting.json`: binds this local repo to the provisioned Mian Capital Sites project; contains no secrets.
- `scripts/prepare-sites-build.mjs`: emits the Sites-required `dist/client`, `dist/server`, and copied hosting manifest structure.
- `sites/worker.js`: serves static SPA routes and the intake endpoint in the Sites Worker runtime.
- `api/intake.js`: shares one validated Resend submission core between Vercel and Sites adapters.

## Commands Run + Outcomes

- Baseline: `npm install`, `npm run format:check`, `npm run build`, `git diff --check` — passed before checkpoint.
- GitHub checkpoint: committed `25e102b`, pushed `main`, created/pushed `pre-calm-premium-redesign-2026-07-12`, and confirmed with `git ls-remote` — passed.
- CI review after push: `gh run list --repo ramo2004/mian-capital --limit 10` returned no runs because no workflows exist.
- Dependency cleanup: `npm uninstall @shadergradient/react @react-three/fiber three` — passed, zero vulnerabilities.
- Current checks: `npm run format`, `npm run format:check`, `npm run build`, `git diff --check` — passed. Build is now 23 modules with no large shader chunk warning.
- Cadence/copy cleanup: `rg` confirmed the requested phrases and report-deliverables selectors are absent; headed browser QA confirmed 3 journey numbers, 0 artifact-header numbers, 0 deliverable strips, the restored tagline, no overflow, and a clean console.
- Sites discovery: official OpenAI docs confirm Sites can deploy compatible local projects and every deployment URL is production. Repeated `list_sites` checks returned no existing projects. Three `create_site` attempts, including one after a full cooldown and duplicate-project check, failed before creation with `More than 2400 requests per 300 seconds reached`; no project ID or manifest was produced.
- Sites retry on July 13: `list_sites` still returned no projects, then one `create_site` call succeeded and `.openai/hosting.json` was persisted immediately.
- Sites version 1 saved successfully but deployment failed with `missing dist/server/index.js`; the plain Vite output was not a compatible deployable artifact.
- Sites-compatible build: `npm run build` now emits `dist/client/index.html`, `dist/server/index.js`, `dist/server/intake.js`, and `dist/.openai/hosting.json`. Direct Worker checks returned 200 for home and route fallback and 400 for invalid intake.
- Sites version 2: source commit `264f229` pushed and saved, public access retained, production deployment succeeded at `https://mian-capital-advisory.omarimian.chatgpt.site`.
- Production HTTP checks: `/` and `/team` returned 200 HTML with the correct title; hashed JavaScript and CSS returned 200; `GET /api/intake` returned the expected 405 JSON response.
- Concise-copy QA: requested phrases and em dashes are absent from shipped source; headed Chromium at desktop and mobile confirmed the new journey/report flow, 0 console errors, and mobile width `375/375` with no overflow.
- Missing Sites email configuration now returns the user-facing `We couldn't send your request.` while preserving the direct-email fallback instead of exposing internal configuration wording.
- Sites version 3: commit `259d33a` saved and deployed publicly. Production HTML and the new `index-B9hOq4R0.js` returned 200; required concise phrases were present, removed phrases and em dashes were absent, and the unconfigured intake endpoint returned the expected user-facing error.
- Production email configuration on July 15: created the domain-restricted, sending-only Resend key `Mian Capital Sites`; saved `RESEND_API_KEY` as a Sites secret and `INTAKE_FROM_EMAIL` as a runtime variable. Sites environment revision advanced to 1, and version 3 was redeployed successfully as deployment `appgdep_6a571f72cdd48191b08519d180db4347` with `env_set_revision: 1`.
- End-to-end production intake test: `POST /api/intake` returned `HTTP 200` with `{"ok":true}`; Resend API logs returned 200 and the email dashboard marked the test message `Delivered` to `wlmian31@gmail.com`.
- Fresh headed-browser QA at `1440x1000` and `390x844` — home, journey, report, Team, navigation, sticky header, mobile menu, intake default/success/error states, and footer rendered correctly.
- Fresh console QA — 0 errors and 0 warnings during normal navigation. The only observed error was the intentional mocked `502` used to verify the recovery state.
- Overflow QA — desktop `1425/1425` and mobile `375/375`; no horizontal overflow. Shader/canvas node count is zero.

## Current Blockers / Unknowns

- Before launch, the user must supply the founder's name, professional biography, credentials, and portrait.
- Advisory and Shariah-screening language should receive appropriate legal/compliance review before production use.

## Lessons / Watchouts

- Transparent composited layers inside sticky or blurred surfaces can render black in headed Chromium on this Mac; keep critical sticky/modal surfaces opaque.
- Use illustrative categories in sample reports unless current security-level classifications and methodology can be verified.
- Vite-only local QA must mock `/api/intake`; do not treat the expected local 404 as a production handler failure.

## Next Steps Checklist

- Review the redesign visually and collect any preference-level refinements.
- Replace the Team placeholder with supplied founder content and photography.
- Complete legal/compliance review before launch.

## Verification Plan

- `npm install`
- `npm run format:check`
- `npm run build`
- `git diff --check`
- `npm run dev -- --host 127.0.0.1 --port 5188 --force`
- Desktop `1440x1000`: verify hero, document artifact, journey, full report, Team, intake states, sticky header, anchors, and console.
- Mobile `390x844`: verify menu, typography, document stacking, sticky intake actions, error recovery, focus behavior, and zero horizontal overflow.

## Risks / Watchouts

- Founder placeholders materially limit launch credibility; do not present them as final content.
- Report classifications are explicitly illustrative; preserve those labels unless real methodology-backed data replaces them.
- To revert safely without reset, restore files from tag `pre-calm-premium-redesign-2026-07-12` or create a new branch from that tag.
