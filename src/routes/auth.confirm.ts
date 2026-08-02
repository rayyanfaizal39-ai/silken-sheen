import { createFileRoute } from "@tanstack/react-router";
import { serializeCookieHeader } from "@supabase/ssr";
import { isInternalPath, RECOVERY_SESSION_COOKIE } from "@/lib/auth-recovery";
import { getSupabaseServerClientForRequest } from "@/lib/supabase.server";

const RESET_PATH = "/auth/reset-password";
const FAILURE_PATH = "/forgot-password?error=invalid_or_expired_link";

function redirect(request: Request, pathname: string, headers = new Headers()) {
  headers.set("Location", new URL(pathname, request.url).toString());
  headers.set("Cache-Control", "private, no-store, max-age=0");
  return new Response(null, { status: 303, headers });
}

export const Route = createFileRoute("/auth/confirm")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const tokenHash = url.searchParams.get("token_hash");
        const type = url.searchParams.get("type");
        const next = url.searchParams.get("next");

        if (!tokenHash || type !== "recovery" || !isInternalPath(next)) {
          return redirect(request, FAILURE_PATH);
        }

        const serverClient = getSupabaseServerClientForRequest(request);
        if (!serverClient) {
          console.error("[AuthConfirm] Supabase server client is not configured");
          return redirect(request, FAILURE_PATH);
        }

        const { supabase, responseHeaders, secure } = serverClient;
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: "recovery",
        });

        if (error) {
          // Deliberately omit tokens, codes, URLs, and session data from logs.
          console.warn("[AuthConfirm] Recovery link verification failed", {
            status: error.status,
            code: error.code,
          });
          return redirect(request, FAILURE_PATH, responseHeaders);
        }

        responseHeaders.append(
          "Set-Cookie",
          serializeCookieHeader(RECOVERY_SESSION_COOKIE, "verified", {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure,
            maxAge: 30 * 60,
          }),
        );
        return redirect(request, RESET_PATH, responseHeaders);
      },
    },
  },
});
