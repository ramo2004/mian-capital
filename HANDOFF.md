# Handoff

## Goal + Current Status

Upgrade the Mian Capital Islamic finance landing page from static HTML to React/Vite with restrained shader background, GSAP motion, and selective neo-brutalist component polish. The page is positioned as a smaller Islamic investment advising/report service, not a dashboard platform. Current state has a Helvetica-style animated Mian Capital wordmark, an explicit 1:1 journey row layout, a holdings-report section with a single paper/PDF-style sample report, a separate `/team` page with founder placeholders, and an intake modal that submits in-page to `/api/intake`. The GitHub repo is public at `https://github.com/ramo2004/mian-capital`; local `main` tracks `origin/main`.

## Key Decisions

- Preserved the core scrollytelling journey, CTA labels, and footer while moving behavior into React components.
- Kept the hero visual as a simple advisory-report preview, not a platform/dashboard mockup.
- Removed the R3F translucent block scene and Lenis because they made the page feel heavier and visually noisy. The only WebGL-style background left is the smoother shader wash behind the hero.
- Kept `three` and `@react-three/fiber` only because `@shadergradient/react` imports them internally; no local R3F scene code remains.
- Removed React Strict Mode at the root because the third-party shader canvas does not release its development-only first mount quickly enough for constrained WebGL context pools.
- Kept copy outcome-focused and modest in scope: removed the repeated intro strip, section-side restatements, final CTA, standards panel, footer security summary, trust/security section, and ten-card feature grid.
- Replaced the old product-feature section with a holdings-report section: one paper/PDF-style sample report plus three deliverables around compliance snapshot, holdings review, and action notes. Removed the later "Education first, then action" process panel as redundant.
- Reframed the hero as an advisory report. Removed connected-account language, balances, account counts, returns, net-worth animation, watchlist data, and the Aisha investing-roadmap mockup.
- Replaced the sticky header's transparent backdrop blur with an opaque background because WebGL content showed through as a dark blurred band.
- Added GSAP as the motion owner for reveal animations, hero entrance sequencing, advisory-card stagger, stage-panel crossfades, and active-step number emphasis. Kept the existing scroll state logic for journey step selection because it is simple and already works.
- Removed Lenis and CSS smooth scrolling after user feedback that scrolling felt heavy. Anchor clicks use native `scrollIntoView`; wheel/touch scrolling is browser-native.
- Added restrained neo-brutalist polish through sharper borders, square-offset shadows, tighter button states, and numbered-card emphasis. Kept it selective so the site still reads as calm advising rather than a loud novelty style.
- Replaced the direct Start investing `mailto:` CTA with an in-app modal intake form. It collects name, email, phone, multiple service checkboxes, and optional details, then posts JSON to `/api/intake`; it never opens a mail client.
- Added a Vercel-compatible serverless `/api/intake` endpoint that validates input and sends the submission to `wlmian31@gmail.com` through Resend's REST API. No email dependency was added; the function uses built-in `fetch`.
- Top-aligned the advisory-service card grid after QA showed CSS grid stretching made each card roughly 532px tall on desktop; cards now sit around 240px and the section reads denser.
- Reworked journey scrollytelling from one absolute/clipped right-side box into three explicit `.journey-row` pairs. Each row contains one `.step` and one matching `.stage-card`; cards are static grid items, not absolute-positioned overlays, so there is no hidden overlap or clipping. GSAP only highlights the active card/step and staggers active-card content.
- Tuned journey activation to be more lenient and eye-aligned: the next card activates when its left step crosses the upper-middle reading band, instead of waiting for the step center. This makes the second card light up once the first card is mostly leaving view.
- Tightened page copy for an older/professional audience: removed redundant explanatory text, cut the advisory-section paragraph, and kept language concise without making it simplistic.
- Simplified the footer to the brand plus one "Start a conversation" mail link. Removed the tagline and placeholder/redundant Services and Legal link columns.
- Replaced the old `M&` logo mark with a Helvetica-first `Mian Capital` wordmark using CSS font fallbacks and a restrained animated highlight. No external font file was added.
- Added a separate `/team` page with founder-photo and bio placeholders. Header navigation now routes to `/team`; the Team/about content is no longer on the home page.
- Updated intake topics to `Portfolio screening`, `Investment advice`, `Open brokerage account`, `Shariah compliance review`, `Account transfer`, and `Other`; removed `Retirement account setup`.
- Browser plugin was listed but its required Node REPL JavaScript tool was not exposed in this session, so rendered QA used the local Playwright CLI wrapper.

## Assumptions / Invariants + Env Notes

- Project root: `/Users/omarmian/dev/islamic finance`.
- Node `v24.15.0`, npm `11.12.1`.
- Email delivery env vars required in production: `RESEND_API_KEY` and `INTAKE_FROM_EMAIL` using a Resend-verified sender/domain. `.env.example` documents the expected names.
- Local Vite dev (`npm run dev`) serves the React app but does not execute Vercel serverless functions; use Vercel or a serverless-compatible runtime for live `/api/intake` testing. Handler behavior was verified with mocked `fetch`.
- Motion deps: `gsap@3.15.0`, `@gsap/react@2.1.2`.
- Shader deps retained for `@shadergradient/react`: `three@0.182.0`, `@react-three/fiber@9.6.1`.
- WebGL is progressive atmosphere: CSS backgrounds and all product UI remain usable if shader rendering is unavailable.
- Canvas pixel density is clamped to `1.25` for shader gradients.
- `prefers-reduced-motion` disables shader animation, transition duration, and GSAP reveal motion.
- Headless Chromium's SwiftShader backend failed to create WebGL contexts on this Mac. Final rendered QA used headed Chromium, which exercised the real canvases successfully.

## Files Touched

- `package.json`, `package-lock.json`: React/Vite, shader-required deps, GSAP deps, and scripts. Removed `lenis`, `camera-controls`, and `three-stdlib`.
- `index.html`: updated page title and metadata to Mian Capital.
- `src/App.jsx`: page components, GSAP reveal/stage-card motion, route-aware home/team rendering, native anchor handling, shared scrollytelling state, advisory-report hero, paired journey rows, holdings-report section, Team page, intake modal, and advisory-service section. Removed preferred-contact state/control/mail body line and replaced mailto submission with `fetch("/api/intake")`.
- `api/intake.js`: serverless intake endpoint that validates payloads and sends email via Resend to `wlmian31@gmail.com`; topic allow-list matches the frontend intake options.
- `.env.example`: documents `RESEND_API_KEY` and `INTAKE_FROM_EMAIL`.
- `styles.css`: retained design system plus smoother shader/canvas layering, responsive rules, holdings-report paper styles, paired journey-row layout, animated Helvetica wordmark styles, Team page styles, GSAP-owned reveal/stage-card motion baselines, modal/form styling, inline submission status styling, and restrained neo-brutalist button/card/panel styling.
- `HANDOFF.md`: refreshed current state and verification notes.
- `.gitignore`: ignores generated Playwright test results.
- `script.js`: removed; behavior now lives in React.

## Commands Run + Outcomes

- Boot sequence: `cat HANDOFF.md`, `git status`, `git diff --stat`; passed. Worktree already contained the uncommitted React/Vite conversion changes.
- `npm install`; passed, zero vulnerabilities.
- `npm run format:check`; passed after advisory revamp.
- `npm run build`; passed after advisory revamp. Vite reports one expected large shared WebGL chunk warning despite dynamic imports.
- `git diff --check`; passed.
- Current change set: `npm run format:check`, `npm run build`, and `git diff --check` passed after the Mian Capital rename and intake modal work. Vite still reports the expected large shader chunk warning.
- Browser QA on `http://127.0.0.1:5188/`: desktop and mobile snapshots confirmed the Mian Capital brand, the intake modal, the checkbox topics, and clean console output. The modal closes cleanly via Cancel. Screenshots inspected with `view_image`: desktop `.playwright-cli/page-2026-07-11T04-12-03-729Z.png` and mobile `.playwright-cli/page-2026-07-11T04-12-45-596Z.png`.
- `rg` stale-copy check in `index.html`, `src/App.jsx`, and `styles.css`; passed with no matches for old feature-grid, platform, login, trust/security, or removed CTA copy.
- Journey dashboard toolbar removal: removed the dynamic stage label/title and "Updating with scroll" pill, deleted their unused data/styles, and moved stage content up to the panel padding. `npm run format:check` and `npm run build` passed; `rg` found no stale copy or toolbar selectors.
- Hero/email/footer cleanup: changed the heading to "Invest, islamically."; changed both Start investing CTAs to a prefilled `mailto:` for `wlmian31@gmail.com`; added a visible selectable fallback address; reduced the footer to Services (How it works, Account setup, Portfolio review, Shariah screening) and Legal (Privacy policy, Terms of service, Risk disclosure). `npm run format:check`, `npm run build`, and `git diff --check` passed.
- Hero copy follow-up: capitalized the heading to "Invest, Islamically." and removed the visible email fallback line plus its unused CSS. `npm run format:check` and `npm run build` passed.
- Advisory-plan mockup cleanup: replaced the hero "Portfolio overview / Connected accounts" content and the journey net-worth/account aggregation state with an advisor-led starting plan. Removed `AnimatedCurrency` and obsolete wealth/chart/account CSS. Updated 3D block semantics from connected accounts/holdings/cash to goals/account setup/education. Desktop and mobile headed Chromium QA passed with four plan items, no old aggregation copy, no overflow, no console errors, and no mobile panel clipping.
- Rendered QA after advisory revamp: Playwright CLI headed Chromium at `1440x1000` and `390x844` passed title, three advisory cards, zero old `.feature-card` nodes, no stale copy, active canvases, no horizontal overflow, early mobile product signal, and zero console errors/warnings. Screenshots were inspected with `view_image`.
- Previous completed QA before the advisory revamp covered the React/Vite conversion, hero shader/ledger scenes, three scrollytelling states, reduced motion, CTA removal, duplicate-copy removal, and trust/security-section removal.
- GSAP dependency install: `npm install gsap @gsap/react`; passed, zero vulnerabilities. Installed `gsap@3.15.0` and `@gsap/react@2.1.2`.
- GSAP motion implementation: replaced the IntersectionObserver reveal system with scoped `useGSAP` timelines, added ScrollTrigger-backed reveals/staggers, animated active stage panels and step numbers, and removed competing CSS transition ownership for `.reveal`/`.stage-content`.
- GSAP verification: `npm run format:check`, `npm run build`, and `git diff --check` passed. Build still reports the existing large R3F/Three chunk warning.
- Rendered QA after GSAP pass: Playwright CLI fallback at desktop `1440x1000`, journey scroll state, features section, mobile `390x844`, and reduced-motion emulation passed. Console had 0 errors and 0 warnings; only the React DevTools info message appeared. Screenshots in `/tmp/nurah-gsap-*.png` were inspected with `view_image`.
- Browser-path note: attempted to use Browser plugin first, but tool discovery did not expose the required Node REPL `js` tool. Fallback reason recorded per frontend testing workflow.
- Lenis dependency install: `npm install lenis`; passed, zero vulnerabilities. Installed `lenis@1.3.25`.
- Lenis implementation: added `useSmoothScroll`, gated Lenis to `(min-width: 721px) and (pointer: fine)`, drove Lenis with `gsap.ticker`, called `ScrollTrigger.update` on Lenis scroll, disabled native CSS smooth scrolling while Lenis is active, and preserved native anchor fallback for mobile/reduced-motion.
- Lenis verification: `npm run format:check`, `npm run build`, and `git diff --check` passed. Build still reports the existing large R3F/Three chunk warning.
- Rendered QA after Lenis pass: Playwright CLI fallback verified desktop Lenis activation (`data-smooth-scroll="lenis"` and `html.lenis`), `#journey` anchor landing at 96px, wheel scroll progression to active `advice` panel, advisory-card reveal, mobile native mode at `390x844`, reduced-motion native mode, no horizontal overflow, and console with 0 errors/0 warnings. A Three context-lost log appeared during repeated reload testing but was not a warning/error.
- Neo-brutalist styling pass: added hard-shadow tokens, sharper button/card/panel borders, tactile button hover/active/focus states, stronger status/number badge treatment, and mobile shadow softening. Fixed advisory cards from stretched desktop heights to top-aligned card heights after rendered QA.
- Neo-brutalist verification: `npm run format:check`, `npm run build`, and `git diff --check` passed. Build still reports the existing large R3F/Three chunk warning.
- Rendered QA after neo-brutalist pass: Playwright CLI fallback verified desktop `1440x1000` title, Lenis mode, `#features` and `#journey` 96px anchor clearance, active setup panel, advisory-card heights around 239-245px, no horizontal overflow, and console with 0 errors/0 warnings. Mobile `390x844` verified native scroll mode, true top-of-page rendering, journey anchor at 96px, actual "See how it works" click landing, advisory-card heights around 180-199px, button widths within viewport, and no horizontal overflow. Screenshots inspected with `view_image`: desktop advisory `.playwright-cli/page-2026-07-07T03-39-59-842Z.png`, mobile top `.playwright-cli/page-2026-07-07T03-41-22-634Z.png`, mobile journey `.playwright-cli/page-2026-07-07T03-40-34-631Z.png`, and mobile advisory `.playwright-cli/page-2026-07-07T03-40-49-447Z.png`.
- User cleanup pass: removed the Aisha investing-roadmap hero mockup and pointer wobble, replaced it with a static advisory-report preview, removed all local `LedgerScene` usage so the translucent floating boxes no longer render, removed Lenis/native CSS smooth-scroll override, removed the redundant detailed screening-ratio rows, removed the "Simple process / Education first, then action" panel, and softened the hero shader wave settings.
- Dependency cleanup: uninstalled `lenis`, `camera-controls`, and `three-stdlib`; `three` and `@react-three/fiber` were re-added because `@shadergradient/react` imports them internally.
- User cleanup verification: `npm run format:check`, `npm run build`, and `git diff --check` passed. Build still warns that the dynamically imported `ShaderAtmosphere` chunk is larger than 500 kB; that is now from the shader package, not the removed local R3F block scene.
- Rendered QA after cleanup: Playwright CLI fallback at desktop `1440x1000` and mobile `390x844` verified page title, zero `.ledger-scene` nodes, no stale copy for Aisha/roadmap/simple-process/screening-ratio rows, no horizontal overflow, mobile hero-report width inside viewport, advisory section reduced to three cards, and console with 0 errors/0 warnings. Screenshots inspected with `view_image`: desktop hero `.playwright-cli/page-2026-07-07T04-07-26-891Z.png`, desktop advisory `.playwright-cli/page-2026-07-07T04-08-28-699Z.png`, mobile hero `.playwright-cli/page-2026-07-07T04-09-04-411Z.png`, and mobile advisory `.playwright-cli/page-2026-07-07T04-09-19-882Z.png`.
- Journey scrollytelling alignment pass: split the right-side journey content into three separate `.stage-card` boxes, shortened copy, removed the old absolute `.stage-content`/`.product-stage` implementation, and kept GSAP transitions for active-card emphasis/content reveal.
- Journey verification: `npm run format:check`, `npm run build`, and `git diff --check` passed. Playwright desktop `1440x1000` verified setup/screening/advice active left steps map to matching active right cards, all tested active cards remain visible, there are exactly three `.stage-card` nodes, and no horizontal overflow. Mobile `390x844` verified the stacked cards fit within a 347px content width with no horizontal overflow. Console stayed at 0 errors/0 warnings. Screenshots inspected with `view_image`: desktop advice state `.playwright-cli/page-2026-07-07T16-40-48-769Z.png`, mobile journey stack `.playwright-cli/page-2026-07-07T16-40-52-041Z.png`.
- Journey activation/copy pass: changed active-step detection from center-distance to an upper-middle threshold (`window.innerHeight * 0.42`) using the last step whose top crosses the threshold; removed the advisory-section paragraph beginning "For people who want..."; shortened hero report, journey card, journey step, and advisory-card copy.
- Activation/copy verification: `npm run format:check`, `npm run build`, and `git diff --check` passed. Playwright `2048x984` verified active sequence `setup -> screening -> screening -> advice -> advice` across journey offsets, with `screening` active in the screenshot-like state where the first card is mostly leaving. Mobile `390x844` verified the removed advisory paragraph is absent, three advisory cards remain, no horizontal overflow, and console has 0 errors/0 warnings. Screenshot inspected: `.playwright-cli/page-2026-07-07T18-11-40-988Z.png`.
- Footer cleanup: removed "Faith-aligned investing, clearly explained.", the Services column, and the placeholder Legal links. Rendered QA verified footer text is now only `Nurah / Islamic investing / Start a conversation`, old legal/tagline copy is absent, no horizontal overflow, and console has 0 errors/0 warnings.
- Journey/intake fix: replaced the old right-side absolute/stacked journey card setup with three static `.journey-row` pairs, removed stale `.sticky-panel`/`.journey-panel-stack` selectors and GSAP hiding of inactive cards, and removed the preferred-contact field from state, markup, and generated mail body. `rg` found no stale `sticky-panel`, `journey-panel-stack`, `contactPreference`, or "Preferred contact" references in `src/App.jsx`/`styles.css`.
- Current verification: `npm run format:check`, `npm run build`, and `git diff --check` passed. Build still reports the expected large dynamically imported shader chunk warning.
- Current rendered QA on `http://127.0.0.1:5188/`: desktop `1440x1000` verified exactly three `.journey-row` nodes, three `.step` nodes, three `.stage-card` nodes, matching `setup/screening/advice` step-to-panel IDs, static card positioning, no old stack container, and no horizontal overflow. Mobile `390x844` verified each row stacks its card under the matching step with 347px row/card width and no horizontal overflow. Intake modal verification showed labels `Name`, `Email`, `Phone`, `Optional details`, zero selects, and no "Preferred contact" text. Console check reported 0 errors and 0 warnings.
- Real submission flow: added `/api/intake`, removed all executable `mailto` logic, and wired the modal to submit in-page with disabled fields while sending plus success/error messages. Mocked handler verification passed for success (`200`), invalid email (`400`), wrong method (`405` with `Allow: POST`), topic allow-list filtering, `reply_to` set to submitter email, Resend URL `https://api.resend.com/emails`, and destination `wlmian31@gmail.com`.
- Current browser QA with mocked `/api/intake`: success path posted JSON to `/api/intake`, stayed on `http://127.0.0.1:5188/`, and showed "Your intake was sent. We will review it and follow up directly." Failure path posted JSON to `/api/intake`, stayed on-page, and showed "Email delivery failed. Please try again." Browser console reported 0 errors and 0 warnings. `rg` found no executable stale `mailto`, `buildInquiryMailto`, `window.location`, `contactPreference`, or "Preferred contact" references in `src`, `api`, `styles.css`, `index.html`, `package.json`, or `.env.example`.
- Logo/team/form update: replaced the small mark with an animated Helvetica-first `Mian Capital` wordmark, added a separate `/team` page and nav item, updated form topics/backend allow-list, removed retirement setup, and increased spacing between "What do you need?" and topic chips. `npm run format`, `npm run format:check`, `npm run build`, and `git diff --check` passed. Handler mock verified new labels are included and removed label is filtered. Browser QA verified `/team` renders Team only, home no longer contains `main > #team`, wordmark uses `"Helvetica Neue", Helvetica, Arial, sans-serif`, updated six topic chips, 8px legend-to-grid gap, no horizontal overflow, and 0 console errors/warnings.
- Holdings-report section update: repurposed the former advisory cards section into `Holdings report` copy explaining that clients receive a simplified report without brokerage-login navigation. Replaced the dashboard-like compliance widgets with one code-native paper/PDF-style sample report sheet containing report header, metadata, compliance summary, holdings rows, and action notes, plus deliverable cards for `Compliance snapshot`, `Holdings review`, and `Action notes`. `npm run format`, `npm run format:check`, `npm run build`, and `git diff --check` passed. Browser QA verified new heading/label/report paper, no `.report-score`/`.report-bars`/`.report-holdings` widgets, `/team -> /#features` navigation, no stale old copy, no desktop/mobile horizontal overflow, and 0 console errors/warnings.
- GitHub publish: committed the React/Vite site as `9df7159 Build Mian Capital React site`, created public repo `ramo2004/mian-capital`, pushed `main`, and verified the repo metadata with `gh repo view`. `gh run list --repo ramo2004/mian-capital --limit 10` returned no runs, indicating no GitHub Actions workflows are configured.

## Current Blockers / Unknowns

- No code blocker.
- Production email delivery requires a Resend API key and a verified sender configured as `RESEND_API_KEY` and `INTAKE_FROM_EMAIL`.
- The production build warns that the dynamically imported shader chunk is larger than 500 kB. Further reduction would require replacing `@shadergradient/react` with CSS/canvas-native background animation.

## Lessons / Watchouts

- Restart Vite with `--force` after dependency changes so optimized dependencies are rebuilt.
- Use headed Chromium for WebGL QA on this machine; the downloaded headless SwiftShader backend fails before application code can render.
- For temporary QA, prefer the Playwright CLI wrapper (`$HOME/.codex/skills/playwright/scripts/playwright_cli.sh`). `npx --package @playwright/test` exposes the runner binary but not module resolution from this repo, so temporary specs cannot import `@playwright/test` unless it is installed locally.
- Keep the viewport gate around the hero shader canvas to avoid unnecessary GPU work.
- Do not reintroduce the old IntersectionObserver reveal flow; GSAP now owns reveal and stage-panel motion.
- CSS `scroll-margin-top` currently provides the intended 96px anchor clearance.
- Avoid template literals inside shell-quoted Playwright CLI `run-code` snippets because Bash interprets backticks before Playwright receives the code.
- Vite-only local dev will not execute `/api/intake`; use Vercel-compatible tooling or mock `fetch` for browser-level form-state checks.

## Next Steps Checklist

- Review the polished page at `http://127.0.0.1:5188/`.
- Commit the React/Vite upgrade when ready.
- Before production launch, review legal/compliance copy and replace placeholder account/product data.

## Verification Plan

- `npm install`
- `npm run format:check`
- `npm run build`
- `git diff --check`
- `npm run dev -- --host 127.0.0.1 --port 5188 --force`
- Mock or run `/api/intake` and verify intake success/error states without navigation or mail-client launch.
- In headed Chromium or Playwright CLI fallback, verify hero GSAP entrance, smooth hero shader, wordmark fit/animation, `/team` separate page rendering, no Team section on home, report paper layout, no `.ledger-scene` nodes, anchor offsets, all three journey states mapping to matching `.stage-card` panels, advisory-card stagger, intake topic labels/spacing, console health, and mobile `390x844` overflow/native scroll mode.

## Risks / Watchouts

- Shader/WebGL library upgrades can reintroduce console warnings or alter shader output; rerun headed browser QA after dependency changes.
- GSAP changes can affect scroll timing; after each motion change, verify anchor links, sticky journey behavior, ScrollTrigger reveals, and `prefers-reduced-motion`.
- The journey section now uses explicit paired rows; verify row pairing, active-card highlight, and mobile stacking after copy or spacing changes.
- `/api/intake` depends on Resend configuration; if deployment is not Vercel-compatible, port the same handler logic to that host's serverless format.
- To revert without reset, restore the prior static entry files from Git history and remove `src/`, `package.json`, and `package-lock.json`.
