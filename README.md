# Fullstack boilerplate

Opinionated starter for **Next.js (App Router)**, **Supabase**, and **Vercel**, with Cursor rules, MCP templates, Vitest, and Playwright smoke tests.

## SaaS day one (golden path)

Single-user subscriptions with **Stripe Checkout + Customer Portal + webhooks**, mirrored into Supabase (`billing_*` tables) with RLS. Follow the ordered checklist:

- [`docs/saas-day-one.md`](docs/saas-day-one.md)

## Features

- **Versioned SQL schema** under `supabase/migrations` (profiles + billing mirrors + RLS)
- Supabase Auth with **cookie-based SSR** (`middleware.ts`, server/browser clients)
- Example **magic link** flow (`/login` → `/auth/callback` → `/protected`)
- **Billing** (`/billing`) and **premium gating** (`/premium`) wired to Stripe subscription status
- **Cursor** rules: repo conventions plus vendored **[matank001/cursor-security-rules](https://github.com/matank001/cursor-security-rules)** selections under `.cursor/rules/security/`
- **MCP templates** for Supabase, Google Stitch, and GitNexus (`.cursor/mcp.example.json`, `docs/mcp.md`)
- **Vercel Labs agent skills** install docs (`.cursor/skills/README.md`)
- **CI** via GitHub Actions (lint, unit tests, build, Playwright)
- **Vercel-inspired UI spec** via [getdesign](https://getdesign.md): root `DESIGN.md` (refresh with `npm run design:vercel`)

## Prerequisites

- Node.js 20+ (CI uses 22)
- npm (or swap in pnpm/yarn if you standardize on them)
- A Supabase project

## Quick start

```bash
cp .env.example .env.local
```

Fill in values from [`.env.example`](.env.example): Supabase URL/keys, **`SUPABASE_SERVICE_ROLE_KEY`** (webhooks), Stripe keys, and `STRIPE_PRICE_ID`. Set `NEXT_PUBLIC_SITE_URL` on Vercel when deploying.

```bash
npm install
npm run dev
```

Visit [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Scripts

- `npm run dev` — Next dev server (Turbopack)
- `npm run build` / `npm run start` — production build and server
- `npm run lint` — ESLint (Next core web vitals + TypeScript presets)
- `npm run test` — Vitest unit/component tests
- `npm run test:e2e` — Playwright smoke tests (starts `npm run dev` automatically). First run locally may need `npx playwright install chromium`.

## Documentation

- [`docs/saas-day-one.md`](docs/saas-day-one.md) — deploy checklist (Supabase migrations, Stripe webhooks, Vercel env)
- [`docs/database.md`](docs/database.md) — migrations, RLS, and typed client notes
- [`docs/vercel.md`](docs/vercel.md) — environment variables and deployment notes
- [`docs/mcp.md`](docs/mcp.md) — Supabase, Google Stitch, and GitNexus MCP wiring (includes Windows `cmd /c` examples)
- [`docs/frontend-architecture.md`](docs/frontend-architecture.md) — how this repo maps to Vercel React guidance
- [`docs/design.md`](docs/design.md) — **getdesign** / `DESIGN.md` workflow (`npm run design:vercel`)
- [`DESIGN.md`](DESIGN.md) — Vercel-inspired design tokens and UI rules for agents
- [`AGENTS.md`](AGENTS.md) — guidance for AI agents working in this repository

## Vercel Labs agent skills

```bash
npx skills add vercel-labs/agent-skills
```

See [`.cursor/skills/README.md`](.cursor/skills/README.md) for suggested skills and offline notes.

## Vercel-inspired design spec (getdesign)

Install or refresh the committed UI reference (overwrites `DESIGN.md`):

```bash
npm run design:vercel
```

Details: [`docs/design.md`](docs/design.md).

## Security rules (matank001)

Upstream: [https://github.com/matank001/cursor-security-rules](https://github.com/matank001/cursor-security-rules)

Vendored copies live under `.cursor/rules/security/` with attribution in that folder’s `README.md`.

## License

Application code: default Next.js template licensing applies to generated scaffold; adapt as needed for your product. Third-party rule files retain their upstream MIT license in `.cursor/rules/security/LICENSE`.
