import { createClient } from "npm:@supabase/supabase-js@2.108.1";

/** Service-role client. Its return type stays inferred from createClient. */
export function createServiceClient(url: string, key: string) {
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type ServiceClient = ReturnType<typeof createServiceClient>;
