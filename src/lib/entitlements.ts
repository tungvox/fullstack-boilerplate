import { createClient } from "@/lib/supabase/server";
import { isProSubscriptionStatus } from "@/lib/subscription-status";

export type Entitlements =
  | { authenticated: false; isPro: false }
  | { authenticated: true; userId: string; isPro: boolean; status: string | null };

export async function getEntitlements(): Promise<Entitlements> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { authenticated: false, isPro: false };
  }

  const { data: sub } = await supabase
    .from("billing_subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .maybeSingle();

  const status = sub?.status ?? null;

  return {
    authenticated: true,
    userId: user.id,
    status,
    isPro: isProSubscriptionStatus(status),
  };
}
