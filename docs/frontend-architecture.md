# Frontend architecture notes

This boilerplate follows **Next.js App Router** defaults plus **Supabase cookie-based sessions** refreshed in `middleware.ts`.

## Design system reference

Root [`DESIGN.md`](../DESIGN.md) describes a **Vercel-inspired** visual language (Geist, monochrome surfaces, shadow-as-border, workflow accents). Regenerate it with `npm run design:vercel` (see [`docs/design.md`](design.md)). Read it before large UI changes so new screens stay consistent with the spec.

## Checklist vs Vercel React best practices

Install the Vercel Labs skill **`react-best-practices`** (see [`.cursor/skills/README.md`](../.cursor/skills/README.md)) and use it during reviews. At the code level, this repo starts from:

- **Server-first data access:** use `src/lib/supabase/server.ts` in Server Components, Route Handlers, and Server Actions — not the browser client.
- **Browser-only Supabase:** use `src/lib/supabase/client.ts` inside Client Components (for example interactive auth forms).
- **Session refresh:** `middleware.ts` calls `getUser()` so auth cookies stay fresh on navigations.
- **Secrets:** never import `SUPABASE_SERVICE_ROLE_KEY` into Client Components or files with `"use client"`.
- **Caching:** prefer explicit `fetch` caching and Route Handler semantics; avoid accidental dynamic data in static routes without meaning to.

## Where to extend

- **Protected routes:** start from `src/app/protected/page.tsx` and add your own layout/groups.
- **Auth flows:** magic link lives under `src/app/login` with `src/app/auth/callback/route.ts` for the OAuth/magic-link code exchange.
