# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec

## Commands

```bash
npm run dev          # local dev server (Next.js)
npm run build        # Next.js static export → ./out
npm run lint         # ESLint (next core-web-vitals + typescript)
npm run deploy       # next build && wrangler deploy (production)
npm run wrangler:dev # next build && wrangler dev (local Cloudflare Worker)
```

There are no tests. No test runner is configured.

## Architecture

This is a **single-page personal website** for concert pianist Fergus Kwan, deployed as a **Cloudflare Worker** that serves a **Next.js static export**.

### Deployment model

`next.config.ts` sets `output: 'export'`, so `next build` produces a fully static `./out` directory. `worker.ts` is the Cloudflare Worker entry point — it handles one server-side concern (`POST /api/contact`) and falls through to the `ASSETS` binding for every other request, which serves the static export. Secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) are Cloudflare Worker environment variables, not `.env` files.

Because the site is statically exported, **Next.js server features (server actions, server components that fetch data, API routes) are not available**. The contact form is the only dynamic endpoint and lives entirely in `worker.ts`.

### Page structure

`src/app/page.tsx` composes the single page from section components in order:
`Nav → HeroElegant → About → Services → Listen → Contact → Footer`

`src/app/compare/page.tsx` is a **dev-only A/B testing page** at `/compare` that lets you switch between five hero designs (A: EtherealBeams, B: HeroElegant variants b1–b5, C: GlowyWaves, D: Tubes, E: StageParallax). It is not linked from the main site and not excluded from the static export — it ships to production as a hidden review page.

### Component layout

- `src/components/sections/` — page sections (Nav, HeroElegant, About, Services, Listen, Contact, Footer, Testimonials, and hero candidates)
- `src/components/ui/` — sub-components and hero variant implementations (ethereal-beams-hero, glowy-waves-hero-shadcnui, stage-parallax-hero, tubes-hero, video-curtain, animated-feature-card, button, testimonials-columns)
- `src/lib/utils.ts` — exports `cn()` (clsx + tailwind-merge)

### HeroElegant variants

`HeroElegant` accepts a `variant` prop (`'b1'–'b5'`). The current production variant is `b5` (PianoKeys + TrebleClefs combined). All sub-components (TrebleClefs, StaffLines, RadialGlow, PianoKeys) are defined in the same file. TrebleClefs generates positions client-side in `useEffect` to avoid hydration mismatches.

### Contact form / Worker API

The contact form (`src/components/sections/Contact.tsx`) POSTs JSON to `/api/contact`. The Worker validates a **Cloudflare Turnstile** token (bot protection) then sends the email via **Resend**. Form state machine: `idle → sending → sent | error`. On Turnstile failure the widget resets via `TurnstileInstance` ref.

### Design system

Tailwind v4 with `@theme` tokens defined in `src/app/globals.css`:
- **Fonts**: `--font-display` (Cormorant Garamond — headings) and `--font-body` (Inter — body copy), both loaded via `next/font/google`
- **Palette**: ivory `#FDFAF6`, primary near-black `#1C1917`, accent amber `#92400E`, surface cream `#F5F0E8`
- Both oklch CSS custom properties (for shadcn/radix) and hex `--color-*` shortcuts (for JS inline styles) are declared in `:root`
- Animations: `fadeUp` (entrance) and `floatBob` (hero music symbols, reads `--rot` CSS variable per element)
- shadcn/ui is configured via `components.json`; add components with `npx shadcn add <component>`

### Path aliases

`@/` maps to `src/` (configured in `tsconfig.json`).
