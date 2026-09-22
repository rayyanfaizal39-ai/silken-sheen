import { getAuthReturnTo } from "./auth-return-to";
import { getSupabaseServerClientForRequest } from "./supabase.server";

/** Exchange before rendering React or initializing the browser auth client. */
export async function handleAuthCallback(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const headers = new Headers({
    "Cache-Control": "private, no-store, max-age=0",
    "Referrer-Policy": "no-referrer",
  });
  const failure = () => {
    headers.set("Content-Type", "text/html; charset=utf-8");
    return new Response(
      '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Sign in — AcadeMY</title><main><h1>Sign-in could not be completed</h1><p>Please try again in the same browser where you started signing in.</p><a href="/login">Return to login</a></main></html>',
      { status: 400, headers },
    );
  };
  const code = url.searchParams.get("code");
  if (!code || url.searchParams.has("error")) return failure();

  const serverClient = getSupabaseServerClientForRequest(request, { forCodeExchange: true });
  if (!serverClient) return failure();
  const { supabase, responseHeaders } = serverClient;
  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error || !data.session) {
      console.warn("[AuthCallback] Code exchange failed", { code: error?.code });
      return failure();
    }
    // Preserve every chunked Set-Cookie and the SSR library's no-cache headers.
    responseHeaders.set("Referrer-Policy", "no-referrer");
    const next = url.searchParams.get("next");
    const destination = getAuthReturnTo(next);
    responseHeaders.set("Location", new URL(destination, request.url).toString());
    return new Response(null, { status: 303, headers: responseHeaders });
  } catch {
    // Never log the authorization code, verifier, cookies or tokens.
    console.warn("[AuthCallback] Code exchange unavailable");
    return failure();
  }
}
