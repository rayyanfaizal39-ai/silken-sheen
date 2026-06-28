import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Mail, Lock, AlertCircle, CheckCircle2, Rocket, Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

type Mode = "signin" | "signup";

export function SignInModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, isConfigured, user } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<"email" | "google" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Close on successful sign-in
  useEffect(() => {
    if (open && user) onClose();
  }, [user, open, onClose]);

  // Lock scroll + escape to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Reset state when reopened
  useEffect(() => {
    if (open) {
      setError(null);
      setNotice(null);
    }
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  async function handleGoogle() {
    setError(null);
    setNotice(null);
    setBusy("google");
    try {
      await signInWithGoogle();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't connect to Google.");
      setBusy(null);
    }
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (mode === "signup" && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setBusy("email");
    try {
      if (mode === "signin") {
        await signInWithEmail(email, password);
        // Auth state change will close the modal, but close immediately too
        // so the spinner can't appear stuck on slow auth-state propagation.
        onClose();
      } else {
        const { needsConfirmation } = await signUpWithEmail(email, password);
        if (needsConfirmation) {
          setNotice("Check your inbox to confirm your email, then sign in.");
          setMode("signin");
        } else {
          onClose();
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[#020410]/80 backdrop-blur-md"
      />

      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.09] bg-[#080E1C]/95 p-7 shadow-[0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl animate-in zoom-in-95 duration-200">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#6366F1]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#8B5CF6]/20 blur-3xl" />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-white/60 transition hover:bg-white/[0.08] hover:text-white"
          aria-label="Close sign-in"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          {/* Header */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_0_28px_rgba(99,102,241,0.6)]">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                {mode === "signin" ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-xs text-white/50">
                {mode === "signin" ? "Sign in to sync your progress." : "Start saving your XP & streaks."}
              </p>
            </div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={!isConfigured || busy !== null}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-[0_2px_16px_rgba(0,0,0,0.3)] transition hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy === "google" ? (
              <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
            ) : (
              <GoogleIcon />
            )}
            <span>{busy === "google" ? "Redirecting…" : "Continue with Google"}</span>
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.07]" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">or</span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmail} className="space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Email
              </span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@school.my"
                  className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-3.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#8B5CF6]/50 focus:bg-white/[0.06]"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Password
              </span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  required
                  minLength={mode === "signup" ? 6 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
                  className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-3.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#8B5CF6]/50 focus:bg-white/[0.06]"
                />
              </div>
            </label>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-xs text-red-300">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {notice && (
              <div className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-xs text-emerald-300">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{notice}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!isConfigured || busy !== null}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_40px_-8px_rgba(99,102,241,0.6)] transition hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy === "email" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          {/* Mode toggle */}
          <p className="mt-5 text-center text-xs text-white/40">
            {mode === "signin" ? "New to AcadeMY?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
                setNotice(null);
              }}
              className="font-semibold text-white/80 underline underline-offset-2 transition hover:text-white"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>

          {!isConfigured && (
            <p className="mt-3 text-center text-[10px] text-amber-300/70">
              Cloud sync isn't configured yet.
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
