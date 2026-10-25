// Cards deliberately reuses AcadeMY's per-request, RLS-bound Supabase client.
// This keeps the existing auth cookie format and never introduces a service key.
export {
  getSupabaseServerClient,
  getSupabaseServerClientForRequest,
  isSupabaseServerConfigured,
} from "../../../../src/lib/supabase.server";
