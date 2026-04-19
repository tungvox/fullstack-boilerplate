/**
 * Stripe subscription statuses that grant product access for this boilerplate.
 * Adjust if you want grace periods (for example include `past_due`).
 */
export function isProSubscriptionStatus(status: string | null | undefined): boolean {
  return status === "active" || status === "trialing";
}
