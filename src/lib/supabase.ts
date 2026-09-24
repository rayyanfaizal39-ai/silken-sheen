import { createBrowserClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { type SupabaseClient as SupabaseClientClass } from "@supabase/supabase-js";
import {
  SUPABASE_AUTH_COOKIE_NAME,
  getSupabaseAuthCookieOptions,
  getSupabaseCookieWrites,
  migrateBrowserAuthCookies,
} from "./supabase-auth-cookie";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function getConfigurationError(url: string | undefined, key: string | undefined) {
  if (!url || !key) return "Supabase URL and publishable key are required.";

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:" || !parsedUrl.hostname) {
      return "VITE_SUPABASE_URL must be a valid HTTPS project URL.";
    }
  } catch {
    return "VITE_SUPABASE_URL must be a valid HTTPS project URL.";
  }

  if (
    key.includes("your-") ||
    (!key.startsWith("sb_publishable_") && key.split(".").length !== 3)
  ) {
    return "VITE_SUPABASE_ANON_KEY must contain your Supabase publishable key (or legacy anon key).";
  }

  if (key.startsWith("sb_secret_") || (key.startsWith("eyJ") && key.includes("service_role"))) {
    return "Do not expose a Supabase secret or service_role key in the browser.";
  }

  return null;
}

export const supabaseConfigurationError = getConfigurationError(supabaseUrl, supabaseAnonKey);
export const isSupabaseConfigured = supabaseConfigurationError === null;

// Disable browser-only auth features during SSR to prevent HTTP calls from Node.js
const isBrowser = typeof window !== "undefined";

// Create a no-op stub when env vars are missing so the app still loads
function createStubClient() {
  return null as unknown as SupabaseClientClass;
}

const readBrowserCookies = () =>
  parseCookieHeader(document.cookie).map(({ name, value }) => ({ name, value: value ?? "" }));
if (isBrowser && isSupabaseConfigured) {
  migrateBrowserAuthCookies(
    readBrowserCookies,
    ({ name, value, options }) => {
      document.cookie = serializeCookieHeader(name, value, options);
    },
    supabaseUrl!,
    window.location.hostname,
    window.location.protocol === "https:",
  );
}

export const supabase = isSupabaseConfigured
  ? createBrowserClient(supabaseUrl!, supabaseAnonKey!, {
      cookieOptions: {
        name: SUPABASE_AUTH_COOKIE_NAME,
        ...getSupabaseAuthCookieOptions(
          isBrowser ? window.location.hostname : "",
          isBrowser && window.location.protocol === "https:",
        ),
      },
      cookies: isBrowser
        ? {
            getAll: readBrowserCookies,
            setAll: (cookies) => {
              for (const { name, value, options } of getSupabaseCookieWrites(
                cookies,
                readBrowserCookies(),
                supabaseUrl!,
                window.location.hostname,
                window.location.protocol === "https:",
              )) {
                document.cookie = serializeCookieHeader(name, value, options);
              }
            },
          }
        : undefined,
      auth: {
        flowType: "pkce",
        persistSession: isBrowser,
        autoRefreshToken: isBrowser,
        // /auth/callback explicitly owns the one-time PKCE code exchange.
        // Automatic detection here would race it and consume the verifier twice.
        detectSessionInUrl: false,
        storageKey: SUPABASE_AUTH_COOKIE_NAME,
      },
    })
  : createStubClient();

export type SupabaseClient = typeof supabase;
