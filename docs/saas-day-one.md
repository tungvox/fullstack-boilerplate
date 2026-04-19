# SaaS day-one checklist

Use this sequence when you clone the boilerplate into a new deployable product.

## 1) Supabase project

1. Create a project in the Supabase dashboard.
2. Copy **Project URL** and **anon key** into `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Copy the **service role** key into `.env.local` as `SUPABASE_SERVICE_ROLE_KEY` (server-only; never `NEXT_PUBLIC_*`).
4. Link the CLI and apply migrations:

   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push
   ```

5. Enable **Auth** providers you need (magic link is already wired in the app).
6. Configure **Auth redirect URLs** for production and preview domains (`/auth/callback`).

See also [`database.md`](database.md).

## 2) Stripe (test mode first)

1. Create a **Product** with a recurring **Price**; copy the price id into `STRIPE_PRICE_ID`.
2. Copy **secret key** and **publishable key** into `.env.local` (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`).
3. Create a **Customer Portal** configuration in Stripe (Settings → Billing → Customer portal).
4. Add a **webhook endpoint** pointing to your deployed URL:

   `https://YOUR_DOMAIN/api/webhooks/stripe`

   Subscribe (at minimum) to:

   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

5. Put the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## 3) Vercel

1. Import the Git repository.
2. Set **all** variables from `.env.example` for Production and Preview as appropriate.
3. Set `NEXT_PUBLIC_SITE_URL` to the canonical deployment URL (especially for Production).

See [`vercel.md`](vercel.md).

## 4) Verify end-to-end

1. Sign in on the deployed site.
2. Open **Billing** → start Checkout with a Stripe test card.
3. Confirm Stripe **Webhook deliveries** show `2xx` responses.
4. Confirm `billing_subscriptions.status` becomes `active` or `trialing` for your user.
5. Open **Premium** — it should load only when the subscription is entitled.

## 5) Replace placeholders

- Update the marketing route group pages under `src/app/(marketing)/privacy` and `src/app/(marketing)/terms` with real policies before broad launch.
- Replace copy and navigation in `src/app/page.tsx` with your product marketing surface.

## Follow-ups (not in this baseline)

- Usage-based billing, tax/VAT, dunning emails, and org/workspace tenancy.
- Row-level “plan feature” flags beyond a single `isPro` gate.
- Automated Stripe tax and invoices per jurisdiction.
