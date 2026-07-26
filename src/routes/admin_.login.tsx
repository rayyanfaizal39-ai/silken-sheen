import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { AlertCircle, LockKeyhole, ShieldCheck } from "lucide-react";
import { AcademyLogo } from "@/components/AcademyLogo";
import { useAuth } from "@/context/auth-context";
import { getProfileForAdminCheck, hasAdministratorRole } from "@/lib/admin-access";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/admin_/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    denied: search.denied === true || search.denied === "true",
  }),
  head: () =>
    seoMeta({
      title: "Admin Login",
      description: "Secure sign-in for AcadeMY administrators.",
      path: "/admin/login",
      noindex: true,
    }),
  component: AdminLoginPage,
});

const ACCESS_ERROR = "This account does not have administrator access.";

function AdminLoginPage() {
  const { denied } = Route.useSearch();
  const { user, loading, isConfigured, signInWithEmail, signInWithGoogle, signOut } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(denied ? ACCESS_ERROR : null);

  useEffect(() => {
    if (loading || !user) return;
    let cancelled = false;

    void getProfileForAdminCheck(user.id)
      .then((profile) => {
        if (cancelled) return;
        if (hasAdministratorRole(profile)) {
          void navigate({ to: "/admin", replace: true });
        } else {
          setError(ACCESS_ERROR);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Administrator access could not be verified. Please try again.");
      });

    return () => {
      cancelled = true;
    };
  }, [loading, navigate, user?.id]);

  async function handleEmailLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await signInWithEmail(email.trim(), password);
    } catch {
      setError("The email or password is incorrect.");
      setSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setSubmitting(true);
    setError(null);
    try {
      await signInWithGoogle("/admin/login");
    } catch {
      setError("Google sign-in could not be started. Please try again.");
      setSubmitting(false);
    }
  }

  async function handleSwitchAccount() {
    await signOut();
    setError(null);
    setSubmitting(false);
  }

  const authenticatedWithoutAccess = Boolean(user && error === ACCESS_ERROR);

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#050816] px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.24),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.20),transparent_30%)]" />
      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#080E1C]/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.55)]">
        <AcademyLogo className="h-auto w-[170px]" />
        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold">AcadeMY Admin</h1>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Sign in with an administrator account to continue to Mission Control.
        </p>

        {error && (
          <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {authenticatedWithoutAccess ? (
          <button
            type="button"
            onClick={() => void handleSwitchAccount()}
            className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
          >
            Sign out and use another account
          </button>
        ) : (
          <>
            <form className="mt-6 space-y-4" onSubmit={handleEmailLogin}>
              <label className="block text-sm font-medium text-white/70">
                Email
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-400/60"
                />
              </label>
              <label className="block text-sm font-medium text-white/70">
                Password
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-400/60"
                />
              </label>
              <button
                type="submit"
                disabled={submitting || loading || !isConfigured}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-bold shadow-lg shadow-violet-950/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LockKeyhole className="h-4 w-4" />
                {submitting ? "Checking access…" : "Sign in to Admin Portal"}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-widest text-white/25">
              <span className="h-px flex-1 bg-white/10" />
              or
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              disabled={submitting || loading || !isConfigured}
              onClick={() => void handleGoogleLogin()}
              className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue with Google
            </button>
          </>
        )}
      </section>
    </main>
  );
}
