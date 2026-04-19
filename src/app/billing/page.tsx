import { openCustomerPortal, startCheckout } from "@/app/billing/actions";
import { createClient } from "@/lib/supabase/server";
import { isProSubscriptionStatus } from "@/lib/subscription-status";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Billing",
};

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/billing");
  }

  const params = await searchParams;
  const checkout = typeof params.checkout === "string" ? params.checkout : undefined;
  const portal = typeof params.portal === "string" ? params.portal : undefined;

  const { data: subscription } = await supabase
    .from("billing_subscriptions")
    .select("status, price_id, current_period_end, cancel_at_period_end")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: customer } = await supabase
    .from("billing_customers")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const isPro = isProSubscriptionStatus(subscription?.status ?? null);
  const hasStripeCustomer = Boolean(customer?.stripe_customer_id);
  const stripeConfigured = Boolean(process.env.STRIPE_PRICE_ID);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 py-16">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Billing
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Stripe Checkout + Customer Portal. Webhooks sync subscription state into
          Supabase (`billing_subscriptions`).
        </p>
      </div>

      {!stripeConfigured && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
          Set <span className="font-mono">STRIPE_PRICE_ID</span> and other Stripe env
          vars (see <span className="font-mono">docs/saas-day-one.md</span> in the repo)
          to enable payments in this environment.
        </p>
      )}

      {checkout === "success" && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          Checkout completed. It can take a few seconds for webhooks to update your
          subscription row — refresh if your status does not flip to active yet.
        </p>
      )}

      {checkout === "canceled" && (
        <p className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
          Checkout canceled. No charges were made.
        </p>
      )}

      {portal === "missing_customer" && (
        <p className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
          Start a subscription first so Stripe has a customer record to open in the
          portal.
        </p>
      )}

      <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
        <p className="font-medium text-zinc-900 dark:text-zinc-50">Subscription</p>
        <dl className="mt-3 space-y-2">
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500 dark:text-zinc-400">Status</dt>
            <dd className="font-mono text-xs">{subscription?.status ?? "none"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500 dark:text-zinc-400">Pro access</dt>
            <dd>{isPro ? "yes" : "no"}</dd>
          </div>
          {subscription?.current_period_end && (
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500 dark:text-zinc-400">Renews / ends</dt>
              <dd className="text-xs">
                {new Date(subscription.current_period_end).toLocaleString()}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <form action={startCheckout}>
          <button
            type="submit"
            disabled={!stripeConfigured}
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto"
          >
            {isPro ? "Manage plan (Checkout)" : "Subscribe with Stripe"}
          </button>
        </form>

        <form action={openCustomerPortal}>
          <button
            type="submit"
            disabled={!hasStripeCustomer || !stripeConfigured}
            className="inline-flex h-11 w-full items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900 sm:w-auto"
          >
            Customer portal
          </button>
        </form>
      </div>

      <Link
        href="/"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Home
      </Link>
    </div>
  );
}
