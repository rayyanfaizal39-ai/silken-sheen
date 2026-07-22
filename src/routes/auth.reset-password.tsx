import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Lock } from "lucide-react";
import { AcademyLogo } from "@/components/AcademyLogo";
import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/auth/reset-password")({
  head: () =>
    seoMeta({
      title: "Reset Password",
      description: "Choose a new password for your AcadeMY account.",
      path: "/auth/reset-password",
      noindex: true,
    }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!loading && !user)
      setError("This reset link is invalid or has expired. Request a new one.");
  }, [loading, user]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Use at least 8 characters for your new password.");
      return;
    }
    if (password !== confirmation) {
      setError("The passwords do not match.");
      return;
    }

    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setComplete(true);
    window.setTimeout(() => void navigate({ to: "/home", replace: true }), 1400);
  }

  return (
    <section className="flex min-h-[calc(100svh-80px)] items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.09] bg-[#080E1C] p-7 shadow-[0_32px_80px_rgba(0,0,0,0.6)] sm:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#6366F1]/20 blur-3xl" />
        <div className="relative">
          <AcademyLogo className="mb-6 h-auto w-[156px]" />
          <h1 className="font-display text-2xl font-bold text-white">Set a new password</h1>
          <p className="mt-2 text-sm leading-6 text-white/55">
            Choose a strong password you do not use for another account.
          </p>

          {complete ? (
            <div
              className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200"
              role="status"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <span>Password updated. Taking you back to AcadeMY…</span>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={submit}>
              {[
                {
                  label: "New password",
                  value: password,
                  setter: setPassword,
                  autoComplete: "new-password",
                },
                {
                  label: "Confirm password",
                  value: confirmation,
                  setter: setConfirmation,
                  autoComplete: "new-password",
                },
              ].map((field) => (
                <label className="block" key={field.label}>
                  <span className="mb-1.5 block text-xs font-semibold text-white/60">
                    {field.label}
                  </span>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input
                      type="password"
                      required
                      minLength={8}
                      autoComplete={field.autoComplete}
                      value={field.value}
                      onChange={(event) => field.setter(event.target.value)}
                      className="min-h-12 w-full rounded-2xl border border-white/[0.09] bg-white/[0.04] py-3 pl-10 pr-4 text-base text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
                    />
                  </div>
                </label>
              ))}

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
                disabled={busy || loading || !user}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_40px_-8px_rgba(99,102,241,0.6)] transition hover:brightness-110 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                Update password
              </button>
            </form>
          )}

          <p className="mt-5 text-center text-xs text-white/40">
            Need a new link?{" "}
            <Link to="/" className="font-semibold text-violet-300 hover:text-violet-200">
              Return to sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
