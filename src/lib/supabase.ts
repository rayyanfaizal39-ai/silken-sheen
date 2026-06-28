import { createBrowserClient } from "@supabase/ssr";
import { type SupabaseClient as SupabaseClientClass } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Returns true when both env vars are present (i.e. Supabase is configured)
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Disable browser-only auth features during SSR to prevent HTTP calls from Node.js
const isBrowser = typeof window !== "undefined";

// Create a no-op stub when env vars are missing so the app still loads
function createStubClient() {
  return null as unknown as SupabaseClientClass;
}

export const supabase = isSupabaseConfigured
  ? createBrowserClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        flowType: "pkce",
        persistSession: isBrowser,
        autoRefreshToken: isBrowser,
        detectSessionInUrl: isBrowser,
        storageKey: "academy-auth-v1",
      },
    })
  : createStubClient();

export type SupabaseClient = typeof supabase;
