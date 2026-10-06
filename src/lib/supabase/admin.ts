import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only admin client (service role, bypasses RLS).
 * Delegates to the generated Lovable Cloud client, which handles
 * the new opaque sb_* API keys correctly. Loaded lazily so this
 * module never pulls server-only code into the client bundle.
 */
export async function getSupabaseAdmin(): Promise<SupabaseClient> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as unknown as SupabaseClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
