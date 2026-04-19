# Vercel deployment

## Environment variables

Set these in the Vercel project (**Settings → Environment Variables**):

- **`NEXT_PUBLIC_SUPABASE_URL`** — add for Production, Preview, and Development. Public Supabase URL.
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** — same scopes as above. Public anon key.
- **`NEXT_PUBLIC_SITE_URL`** — strongly recommended for Production (and Preview if you rely on server-side absolute URLs). Example: `https://your-app.vercel.app`.
- **`SUPABASE_SERVICE_ROLE_KEY`** — **required for production SaaS** in this boilerplate so the Stripe webhook can upsert `billing_*` tables. Keep it **server-only**, never prefix with `NEXT_PUBLIC_`. Do not broaden RLS to let browsers write billing tables.
- **`STRIPE_SECRET_KEY`** — server-only Stripe secret key.
- **`STRIPE_WEBHOOK_SECRET`** — signing secret from the Stripe webhook endpoint.
- **`STRIPE_PRICE_ID`** — default recurring price used by Checkout in `/billing`.
- **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`** — publishable key (optional for the current Checkout-only flow, but set it for future client-side Stripe.js features).

This app also reads `VERCEL_URL` at runtime on the server for redirects when `NEXT_PUBLIC_SITE_URL` is unset.

## Build and output

- **Build command:** `npm run build` — runs `next build --webpack` so the PWA Workbox plugin can emit `public/sw.js` (see [`docs/pwa.md`](pwa.md)).
- **Output:** Next.js on Vercel uses the default serverless/edge layout; no custom `vercel.json` is required for a standard App Router app.

## Optional: Vercel Analytics

To add Web Analytics later, install `@vercel/analytics` and follow the official Next.js App Router snippet. It is intentionally omitted here to keep the baseline small.

## Optional: Vercel-inspired UI spec (getdesign)

To (re)generate the Vercel-inspired **`DESIGN.md`** used as the UI source of truth for this boilerplate:

```bash
npm run design:vercel
```

See [`docs/design.md`](design.md) for context and agent usage notes.

## Branch previews

Preview deployments work best when `NEXT_PUBLIC_SITE_URL` matches the preview hostname or when magic-link redirects use relative paths (the login form uses the browser origin for `emailRedirectTo`).
