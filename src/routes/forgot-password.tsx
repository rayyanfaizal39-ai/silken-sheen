import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { AcademyLogo } from "@/components/AcademyLogo";
import { useAuth } from "@/context/auth-context";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/forgot-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    error: search.error === "invalid_or_expired_link" ? search.error : undefined,
  }),
  head: () =>
    seoMeta({
      title: "Forgot Password",
      description: "Request a secure AcadeMY password reset link.",
      path: "/forgot-password",
      noindex: true,
    }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { error: linkError } = Route.useSearch();
  const { requestPasswordReset, isConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await requestPasswordReset(email.trim());
      setSent(true);
    } catch {
      setError("We couldn't send the reset email. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="flex min-h-[calc(100svh-80px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#080E1C] p-7 shadow-[0_32px_80px_rgba(0,0,0,0.6)] sm:p-8">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#6366F1]/20 blur-3xl" />
          <div className="relative">
            <AcademyLogo className="mb-6 h-auto w-[156px]" />
            <h1 className="font-display text-2xl font-bold text-white">Reset your password</h1>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Enter your account email and we’ll send you a secure reset link.
            </p>

            {linkError && !sent && (
              <div
                className="mt-5 flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3.5 py-3 text-sm text-amber-200"
                role="alert"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  That reset link is invalid, expired, or has already been used. Request a new one
                  below.
                </span>
              </div>
            )}

            {sent ? (
              <div
                className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-200"
                role="status"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  If an AcadeMY account exists for that email, a reset link is on its way.
                </span>
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={submit}>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-white/60">
                    Email address
                  </span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="min-h-12 w-full rounded-2xl border border-white/[0.09] bg-white/[0.04] py-3 pl-10 pr-4 text-base text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
                    />
                  </div>
                </label>
                {error && (
                  <div
                    className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-3 text-sm text-red-300"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={busy || !isConfigured}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_40px_-8px_rgba(99,102,241,0.6)] transition hover:brightness-110 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                  Send reset link
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
