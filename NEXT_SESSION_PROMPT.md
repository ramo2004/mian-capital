# Next Session Prompt

Use this prompt to continue the project:

```text
We are working in `/Users/omarmian/dev/islamic finance`.

Read `HANDOFF.md`, run the verification plan, then upgrade the current static Islamic finance scrollytelling landing page into a React/Vite implementation that uses:

- `@shadergradient/react`
- `@react-three/fiber`
- `three`
- `three-stdlib`
- `camera-controls`

Design goal:
Keep the current premium Islamic fintech SaaS direction: warm cream/off-white, dark navy text, pale muted lime accents, sand/gold micro-details, thin dark outlines, rounded rectangles, clean grotesk typography, soft brutalist/pastel product branding, and modern Stripe/Ramp/Mercury/Wise-style product storytelling. Avoid mosque clichés and avoid crypto/gambling energy.

3D/WebGL direction:
Use WebGL as atmosphere and product metaphor, not as the main UI.

1. Add a soft shader gradient layer behind the hero:
   - Cream, muted lime, sand/gold, and faint navy depth.
   - Slow, low-contrast motion.
   - Must feel premium fintech, not neon crypto.
   - Respect `prefers-reduced-motion`.

2. Add a subtle shader gradient wash behind the final CTA:
   - Warmer, calmer, and more minimal than the hero.
   - Should support the headline “Build a portfolio that reflects your values.”

3. Implement the “glass ledger blocks” concept with React Three Fiber:
   - Floating translucent rounded ledger blocks/cards represent connected accounts, holdings, cash, retirement, sukuk, equities, zakat, and purification.
   - Hero: blocks float gently around or behind the HTML dashboard, with subtle depth and glass material.
   - Step 1: blocks drift in from different directions and organize into a unified financial stack/view.
   - Step 2: blocks pass through or align around a screening ring, with compliant/review/action states shown through muted green, amber, and soft red accents.
   - Step 3: blocks settle into a balanced allocation constellation, suggesting advice, diversification, zakat, purification, and long-term planning.
   - Keep all real dashboard/card/text UI as HTML/CSS, not canvas text.

Implementation constraints:
- Convert to React + Vite only if needed for these libraries.
- Preserve the existing content, page order, core layout, dashboard UI, CTA labels, and scrollytelling journey.
- Keep dashboard cards, buttons, feature cards, security section, and footer code-native HTML/CSS.
- Do not make the whole page a 3D demo.
- Clamp pixel density for performance and lazy-load or isolate WebGL components where practical.
- Mobile must not have horizontal overflow and should show the product signal early.
- Run formatter/build checks and rendered browser QA after implementation.
- Update `HANDOFF.md` before stopping.

Expected deliverables:
- React/Vite project structure.
- Shader gradient hero and final CTA backgrounds.
- R3F glass ledger block scene tied visually to the hero and/or scrollytelling step state.
- Scroll state still updates the dashboard mockup across setup, screening, and advice.
- Desktop and mobile verification with no console errors.
```

```

```
