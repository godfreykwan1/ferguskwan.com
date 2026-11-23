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
npm run dev            # local dev server (Next.js)
npm run build          # Next.js static export to ./out
npm run lint           # ESLint (next core-web-vitals + typescript)
npm run deploy         # next build && wrangler deploy (PRODUCTION: ferguskwan.com custom domains)
npm run deploy:preview # next build && wrangler deploy --config wrangler.preview.jsonc (fergus-kwan-preview on workers.dev)
npm run wrangler:dev   # next build && wrangler dev (local Cloudflare Worker)
```

There are no tests. No test runner is configured.

## Architecture

This is a **multi-page personal website** for Vancouver-based pianist Fergus Kwan, deployed as a **Cloudflare Worker** that serves a **Next.js static export**. Positioning is performer first; teaching and compositions are secondary.

### Deployment model

`next.config.ts` sets `output: 'export'`, so `next build` produces a fully static `./out` directory (`/media` becomes `out/media.html`). `worker.ts` is the Cloudflare Worker entry point: it redirects `www` to the apex domain, handles one server-side concern (`POST /api/contact`) and falls through to the `ASSETS` binding for every other request, which serves the static export. Secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) are Cloudflare Worker secrets; `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is baked in at build time.

Two Wrangler configs share `worker.ts` and `./out`:
- `wrangler.jsonc`: production Worker `fergus-kwan` with the `ferguskwan.com` and `www.ferguskwan.com` custom domains. Do not deploy to it casually.
- `wrangler.preview.jsonc`: preview Worker `fergus-kwan-preview`, workers.dev only, no routes. It needs its own secrets (`wrangler secret put ... --config wrangler.preview.jsonc`) and its hostname in the Turnstile widget allowlist.

Because the site is statically exported, **Next.js server features (server actions, server components that fetch data, API routes, default image optimization) are not available**. The contact form is the only dynamic endpoint and lives entirely in `worker.ts`. Images are plain `<img>` tags.

### Routes

- `/` (`src/app/page.tsx`): Hero, CredentialStrip, FeaturedVideos, About, Disciplines, Events, Contact. Person JSON-LD.
- `/media` (`src/app/media/page.tsx`): filterable video library (`MediaLibrary`).
- `/teaching` (`src/app/teaching/page.tsx`): studio cards, levels, how to start, CTA. Service JSON-LD.
- `src/app/not-found.tsx`: dark 404, exported as `out/404.html` and served by the Worker's `404-page` handling.
- `Nav` and `Footer` are rendered once in `src/app/layout.tsx`. Nav links to sections use `/#anchor` so they work from any page.

### Metadata

Root metadata lives in `src/app/layout.tsx` (default title `Fergus Kwan | Pianist`, template `%s | Fergus Kwan`). Next merges metadata shallowly, so each page sets its own `alternates.canonical` and spreads `BASE_OPEN_GRAPH` / `BASE_TWITTER` from `src/content/site.ts` to keep the OG image. Add new routes to `src/app/sitemap.ts`.

### Content

Editable content is kept in typed data files so real data is a one-file edit:
- `src/content/site.ts`: nav links, credentials, teachers, masterclasses, recognition, contact email, shared metadata.
- `src/content/videos.ts`: every YouTube video (id, title, venue, year, category). Bracketed values like `[Piece, Composer]` are visible placeholders.
- `src/content/events.ts`: upcoming performances (currently `[DATE]` placeholders).

### Component layout

- `src/components/sections/`: home page sections plus Nav and Footer.
- `src/components/media/MediaLibrary.tsx`: client component with category filters, "now showing" player and grid.
- `src/components/teaching/`: StudioCards, Levels, HowToStart.
- `src/components/ui/`: `VideoFacade` (click-to-play YouTube; no iframe until click, then youtube-nocookie with autoplay), `Placeholder` (dashed photo box), `Eyebrow`, `ButtonLink`.
- `src/lib/utils.ts`: exports `cn()` (clsx + tailwind-merge).

### Contact form / Worker API

The contact form (`src/components/sections/Contact.tsx`) POSTs JSON to `/api/contact`. The Worker validates a **Cloudflare Turnstile** token (bot protection) then sends the email via **Resend**. Form state machine: `idle`, `sending`, then `sent` or `error`. On failure the Turnstile widget resets via the `TurnstileInstance` ref. The enquiry type is sent in the `lessonType` field (the Worker reads that name); option values are the human-readable labels.

### Design system ("Dark editorial")

Tailwind v4 with `@theme` tokens in `src/app/globals.css`:
- **Fonts**: `font-display` (Cormorant Garamond 400/500) and `font-body` (Inter 400/500/600), loaded via `next/font/google`.
- **Colours**: `ink` #0E0E0F (page), `ink-2` #141416 (alternate sections), `fill` #1A1A1D, `line` #2A2A2E, `dash` #3A3A40, `heading` #EDEAE3, `body` #C8C4BB, `muted` #A19D94, `label` #8F8B83, `accent` #C9A86A, `accent-hover` #E2C68E.
- **Rules**: no rounded corners, gradients or shadows. Sections alternate `ink` / `ink-2` and are separated by 1px `line` borders. Eyebrows are 13px uppercase, 0.24em tracking, accent. Section h2 is 56px display. Touch targets are at least 44px.
- **Photos**: no stock photos. Missing photos use `Placeholder` with a label describing the shot.
- **Copy**: no em-dashes anywhere (copy, metadata, comments).
- Form controls use the `.field` class; anchored sections get `scroll-margin-top` globally to clear the sticky header.

### Path aliases

`@/` maps to `src/` (configured in `tsconfig.json`).
