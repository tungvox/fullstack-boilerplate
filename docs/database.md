# Database (Supabase)

This project keeps the schema in versioned SQL migrations under [`supabase/migrations/`](../supabase/migrations/).

## What ships in the baseline migration

- `public.profiles` — one row per `auth.users` row (created by a trigger).
- `public.billing_customers` — maps a Supabase user to a Stripe Customer id.
- `public.billing_subscriptions` — mirrors Stripe subscription status for entitlement checks.

Row Level Security (RLS) allows authenticated users to **read their own** profile and billing mirror rows. **Writes** to billing mirror tables are intended to happen only from trusted server code using the **service role** (Stripe webhooks), not from the browser.

## Apply migrations to a hosted project

Prereqs: install the [Supabase CLI](https://supabase.com/docs/guides/cli) and log in.

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

## Local development (optional)

```bash
supabase start
supabase db reset
```

Local ports and Postgres major version are controlled by [`supabase/config.toml`](../supabase/config.toml). Keep the `[db].major_version` aligned with your hosted database to avoid drift.

## Preview / reset workflows

- **Preview branches:** give each Vercel preview its own Supabase project or use branching (Supabase feature) so migrations and webhooks do not collide.
- **Destructive reset:** prefer `supabase db reset` locally only. On hosted projects, use deliberate migrations and backups — never reset production casually.

## Types in the app

[`src/types/database.ts`](../src/types/database.ts) is a **minimal** hand-maintained mirror of the tables the Next.js app touches. After you change SQL, update these types (or regenerate with the Supabase CLI and merge).
