import type Stripe from "stripe";
import { describe, expect, it } from "vitest";
import { pickUserIdFromMetadata } from "./subscription-sync";

describe("pickUserIdFromMetadata", () => {
  it("returns supabase_user_id when present", () => {
    const metadata = {
      supabase_user_id: "11111111-1111-1111-1111-111111111111",
    } as Stripe.Metadata;

    expect(pickUserIdFromMetadata(metadata)).toBe(
      "11111111-1111-1111-1111-111111111111",
    );
  });

  it("returns null when missing or empty", () => {
    expect(pickUserIdFromMetadata(null)).toBeNull();
    expect(pickUserIdFromMetadata({} as Stripe.Metadata)).toBeNull();
    expect(
      pickUserIdFromMetadata({ supabase_user_id: "" } as Stripe.Metadata),
    ).toBeNull();
  });
});
