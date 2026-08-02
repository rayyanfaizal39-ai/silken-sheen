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

import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import {
  getCookies,
  getRequestProtocol,
  setCookie,
  setResponseHeader,
} from "@tanstack/start-server-core";
import { SUPABASE_AUTH_COOKIE_NAME, SUPABASE_AUTH_COOKIE_OPTIONS } from "./supabase-auth-cookie";

export function isSupabaseServerConfigured() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? "";
  return !!(url && key);
}

export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? "";
  if (!url || !key) return null;
  return createServerClient(url, key, {
    cookieOptions: {
      name: SUPABASE_AUTH_COOKIE_NAME,
      ...SUPABASE_AUTH_COOKIE_OPTIONS,
      secure: getRequestProtocol({ xForwardedProto: true }) === "https",
    },
    cookies: {
      getAll() {
        return Object.entries(getCookies()).map(([name, value]) => ({ name, value: value ?? "" }));
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value, options } of cookiesToSet) {
          setCookie(name, value, options);
        }
        for (const [name, value] of Object.entries(headers)) {
          setResponseHeader(name, value);
        }
      },
    },
  });
}

/**
 * Raw-request variant for server routes that return their own Response.
 * Every cookie emitted by Supabase is appended independently to the returned
 * Headers object so split auth cookies are never collapsed or dropped.
 */
export function getSupabaseServerClientForRequest(request: Request) {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? "";
  if (!url || !key) return null;

  const responseHeaders = new Headers({
    "Cache-Control": "private, no-cache, no-store, must-revalidate, max-age=0",
    Expires: "0",
    Pragma: "no-cache",
  });
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const secure = forwardedProtocol
    ? forwardedProtocol === "https"
    : new URL(request.url).protocol === "https:";

  const supabase = createServerClient(url, key, {
    cookieOptions: {
      name: SUPABASE_AUTH_COOKIE_NAME,
      ...SUPABASE_AUTH_COOKIE_OPTIONS,
      secure,
    },
    auth: {
      flowType: "pkce",
      persistSession: true,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("cookie") ?? "").map(({ name, value }) => ({
          name,
          value: value ?? "",
        }));
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value, options } of cookiesToSet) {
          responseHeaders.append(
            "Set-Cookie",
            serializeCookieHeader(name, value, { ...options, secure }),
          );
        }
        for (const [name, value] of Object.entries(headers)) responseHeaders.set(name, value);
      },
    },
  });

  return { supabase, responseHeaders, secure };
}
