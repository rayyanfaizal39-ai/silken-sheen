import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const { user, session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.info("[Auth] OAuth callback route mounted", {
      hasCode: new URLSearchParams(window.location.search).has("code"),
      hasHash: window.location.hash.length > 1,
    });
  }, []);

  useEffect(() => {
    console.info("[Auth] OAuth callback session state", {
      loading,
      hasSession: !!session,
      hasUser: !!user,
    });
    if (!loading && user) {
      console.info("[Auth] OAuth callback complete; navigating home");
      void navigate({ to: "/home", replace: true });
    }
  }, [loading, navigate, session, user]);

  return (
    <section className="min-h-[calc(100svh-80px)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        <p className="mt-4 text-sm text-white/60">
          {loading || user ? "Completing secure sign-in…" : "Sign-in could not be completed. Please return to login."}
        </p>
      </div>
    </section>
  );
}
