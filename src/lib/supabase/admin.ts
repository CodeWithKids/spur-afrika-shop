import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only admin client (service role, bypasses RLS).
 * Delegates to the generated Lovable Cloud client, which handles
 * the new opaque sb_* API keys correctly.
 */
export function getSupabaseAdmin(): SupabaseClient {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { supabaseAdmin } = require("@/integrations/supabase/client.server") as {
    supabaseAdmin: SupabaseClient;
  };
  return supabaseAdmin;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
