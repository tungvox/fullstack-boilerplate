import { describe, expect, it } from "vitest";
import { isProSubscriptionStatus } from "./subscription-status";

describe("isProSubscriptionStatus", () => {
  it("treats active and trialing as pro", () => {
    expect(isProSubscriptionStatus("active")).toBe(true);
    expect(isProSubscriptionStatus("trialing")).toBe(true);
  });

  it("rejects other Stripe statuses", () => {
    expect(isProSubscriptionStatus("past_due")).toBe(false);
    expect(isProSubscriptionStatus("canceled")).toBe(false);
    expect(isProSubscriptionStatus("incomplete")).toBe(false);
    expect(isProSubscriptionStatus(null)).toBe(false);
    expect(isProSubscriptionStatus(undefined)).toBe(false);
  });
});
