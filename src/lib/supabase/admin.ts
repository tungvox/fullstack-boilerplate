import type { Database } from "@/types/database";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Use only in trusted server contexts (e.g. Stripe webhooks).
 * Never import from Client Components or expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
