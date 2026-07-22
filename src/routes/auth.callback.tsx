import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const { user, session, loading } = useAuth();
  const navigate = useNavigate();
  const exchangeStarted = useRef(false);
  const initialCode = useRef(
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("code")
      : null,
  );
  const nextPath = useRef<"/auth/reset-password" | "/home">(
    typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("next") === "/auth/reset-password"
      ? "/auth/reset-password"
      : "/home",
  );
  const [callbackError, setCallbackError] = useState<string | null>(null);
  const [exchangeComplete, setExchangeComplete] = useState(!initialCode.current);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    console.info("[Auth] callback route mounted", {
      hasCode: Boolean(code),
      hasHash: window.location.hash.length > 1,
    });

    if (!code || exchangeStarted.current) {
      return;
    }

    exchangeStarted.current = true;
    setCallbackError(null);

    void (async () => {
      try {
        console.info("[Auth] code exchange started", {
          callbackPath: window.location.pathname,
        });
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        console.info("[Auth] code exchange completed", {
          hasSession: !!data.session,
          hasUser: !!data.user,
          error: error ? { message: error.message, status: error.status, code: error.code } : null,
        });
        if (error) throw error;

        const cleanUrl = `${window.location.origin}/auth/callback`;
        window.history.replaceState({}, "", cleanUrl);
        setExchangeComplete(true);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Auth callback exchange failed";
        console.error("[Auth] callback exchange failed", e);
        setCallbackError(message);
      }
    })();
  }, []);

  useEffect(() => {
    console.info("[Auth] OAuth callback session state", {
      loading,
      hasSession: !!session,
      hasUser: !!user,
    });
    if (!loading && user && exchangeComplete) {
      console.info("[Auth] callback complete; navigating", { nextPath: nextPath.current });
      void navigate({ to: nextPath.current, replace: true });
    }
  }, [exchangeComplete, loading, navigate, session, user]);

  return (
    <section className="min-h-[calc(100svh-80px)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        <p className="mt-4 text-sm text-white/60">
          {callbackError
            ? `Sign-in could not be completed. ${callbackError}`
            : loading || user
              ? "Completing secure sign-in…"
              : "Sign-in could not be completed. Please return to login."}
        </p>
      </div>
    </section>
  );
}
