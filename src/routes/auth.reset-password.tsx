import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Lock } from "lucide-react";
import { AcademyLogo } from "@/components/AcademyLogo";
import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";
import { passwordStrengthError } from "@/lib/auth-recovery";
import { seoMeta } from "@/lib/seo";
import { clearRecoverySession, hasValidRecoverySession } from "./-recovery.server";

export const Route = createFileRoute("/auth/reset-password")({
  head: () =>
    seoMeta({
      title: "Reset Password",
      description: "Choose a new password for your AcadeMY account.",
      path: "/auth/reset-password",
      noindex: true,
    }),
  loader: () => hasValidRecoverySession(),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const recoveryAllowed = Route.useLoaderData();
  const { user, loading } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!recoveryAllowed || !user) {
      setError("This reset link is invalid or has expired. Request a new one.");
      return;
    }
    const strengthError = passwordStrengthError(newPassword);
    if (strengthError) {
      setError(strengthError);
      return;
    }
    if (newPassword !== confirmation) {
      setError("The passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (updateError) throw updateError;
      await clearRecoverySession();
      setComplete(true);
      window.setTimeout(() => {
        void supabase.auth.signOut({ scope: "local" }).finally(() => {
          window.location.assign("/login");
        });
      }, 1400);
    } catch {
      setError("We couldn't update your password. Request a new recovery link and try again.");
    } finally {
      setBusy(false);
    }
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

          {!recoveryAllowed || (!loading && !user) ? (
            <div
              className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200"
              role="alert"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>This reset link is invalid or has expired. Request a new one.</span>
              </div>
              <Link
                to="/forgot-password"
                search={{ error: undefined }}
                className="mt-4 inline-flex font-semibold text-violet-300 hover:text-violet-200"
              >
                Request a new reset link
              </Link>
            </div>
          ) : complete ? (
            <div
              className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200"
              role="status"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <span>Password updated. Taking you to sign in…</span>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={submit}>
              {[
                {
                  label: "New password",
                  value: newPassword,
                  setter: setNewPassword,
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
                      minLength={10}
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
                disabled={busy || loading || !user || !recoveryAllowed}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_40px_-8px_rgba(99,102,241,0.6)] transition hover:brightness-110 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                Update password
              </button>
            </form>
          )}

          <p className="mt-5 text-center text-xs text-white/40">
            Need a new link?{" "}
            <Link
              to="/forgot-password"
              search={{ error: undefined }}
              className="font-semibold text-violet-300 hover:text-violet-200"
            >
              Request another
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
