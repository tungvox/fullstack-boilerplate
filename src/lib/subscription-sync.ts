import type { Database } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

type AdminClient = SupabaseClient<Database>;

export function pickUserIdFromMetadata(metadata: Stripe.Metadata | null): string | null {
  const raw = metadata?.supabase_user_id;
  return raw && raw.length > 0 ? raw : null;
}

export async function upsertBillingFromSubscription(
  admin: AdminClient,
  subscription: Stripe.Subscription,
  fallbackUserId?: string | null,
): Promise<void> {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;

  if (!customerId) {
    throw new Error("Subscription missing customer id");
  }

  const userIdFromMeta =
    pickUserIdFromMetadata(subscription.metadata) ?? fallbackUserId ?? null;

  let userId = userIdFromMeta;

  if (!userId) {
    const { data: row } = await admin
      .from("billing_customers")
      .select("user_id")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();

    userId = row?.user_id ?? null;
  }

  if (!userId) {
    throw new Error("Unable to resolve Supabase user id for subscription");
  }

  const primaryItem = subscription.items.data[0];
  const priceId = primaryItem?.price?.id ?? null;
  const periodEndSeconds = primaryItem?.current_period_end;
  const currentPeriodEnd =
    typeof periodEndSeconds === "number"
      ? new Date(periodEndSeconds * 1000).toISOString()
      : null;

  const { error: customerError } = await admin.from("billing_customers").upsert(
    {
      user_id: userId,
      stripe_customer_id: customerId,
    },
    { onConflict: "user_id" },
  );

  if (customerError) {
    throw customerError;
  }

  const { error: subError } = await admin.from("billing_subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: customerId,
      status: subscription.status,
      price_id: priceId,
      current_period_end: currentPeriodEnd,
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (subError) {
    throw subError;
  }
}

export async function markSubscriptionCanceled(
  admin: AdminClient,
  subscription: Stripe.Subscription,
): Promise<void> {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;

  if (!customerId) {
    return;
  }

  const { data: row } = await admin
    .from("billing_customers")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (!row?.user_id) {
    return;
  }

  await admin
    .from("billing_subscriptions")
    .update({
      status: "canceled",
      cancel_at_period_end: false,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", row.user_id);
}

export async function handleCheckoutSessionCompleted(
  admin: AdminClient,
  session: Stripe.Checkout.Session,
): Promise<void> {
  const userId =
    pickUserIdFromMetadata(session.metadata) ??
    (session.client_reference_id && session.client_reference_id.length > 0
      ? session.client_reference_id
      : null);

  if (!userId) {
    throw new Error("Checkout session missing supabase_user_id metadata");
  }

  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  if (!customerId || !subscriptionId) {
    throw new Error("Checkout session missing customer or subscription");
  }

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  await upsertBillingFromSubscription(admin, subscription, userId);
}
