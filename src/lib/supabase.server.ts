// Per-request Supabase client for the server (TanStack Start server functions).
//
// It reads the logged-in user's auth cookie so every query runs *as that user*,
// which means Row Level Security decides what they can see. An admin sees all
// rows; a student sees only their own. No service-role key is shipped to the
// edge, so there's no way for this client to leak data past RLS.
//
// ── INTEGRATION SEAM ───────────────────────────────────────────────────────
// On Cloudflare Workers, env vars usually arrive via bindings rather than
// process.env. If you already expose them through process.env (e.g. with the
// `nitro`/`vinxi` cloudflare preset and wrangler vars) this works as-is.
// Otherwise swap the two `process.env.*` reads for your binding accessor.

import { createServerClient } from '@supabase/ssr';
import { getCookies } from '@tanstack/start-server-core';

export function isSupabaseServerConfigured() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? '';
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? '';
  return !!(url && key);
}

export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? '';
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? '';
  if (!url || !key) return null;
  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return Object.entries(getCookies()).map(([name, value]) => ({ name, value: value ?? '' }));
        },
        setAll() {},
      },
    },
  );
}
