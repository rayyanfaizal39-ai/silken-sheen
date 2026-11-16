import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { DevSignInSlot } from "@/lib/dev-auth/DevSignInSlot";
import { isExistingAccountSignUpError } from "@/lib/auth-signup-response";

const NEUTRAL_SIGNUP_GUIDANCE =
  "You may already have an AcadeMY account. Try logging in or resetting your password.";

export type AuthFormMode = "signin" | "signup";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function messageFrom(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export function AuthForm({
  mode,
  returnTo,
  onSuccess,
  onNavigateAway,
  initialEmail = "",
  onEmailChange,
}: {
  mode: AuthFormMode;
  returnTo?: string;
  onSuccess?: () => void;
  onNavigateAway?: () => void;
  initialEmail?: string;
  onEmailChange?: (email: string) => void;
}) {
  const {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    isConfigured,
    devAuthBypass,
    loading,
  } = useAuth();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState<"google" | "email" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [showAccountRecovery, setShowAccountRecovery] = useState(false);

  const signingUp = mode === "signup";
  const disabled = loading || busy !== null || !isConfigured;

  async function handleGoogle() {
    setError(null);
    setNotice(null);
    setShowAccountRecovery(false);
    setBusy("google");
    try {
      await signInWithGoogle(returnTo);
    } catch (cause) {
      setError(messageFrom(cause, "Couldn't connect to Google. Please try again."));
      setBusy(null);
    }
  }

  async function handleEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setShowAccountRecovery(false);

    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      setError("Enter your email address and password.");
      return;
    }
    if (signingUp && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setBusy("email");
    try {
      if (signingUp) {
        const { needsConfirmation } = await signUpWithEmail(normalizedEmail, password);
        if (needsConfirmation) {
          // Use the same response for a new unconfirmed account and Supabase's
          // existing-account outcomes. This prevents email enumeration while
          // still giving every student a clear recovery path.
          setNotice(NEUTRAL_SIGNUP_GUIDANCE);
          setShowAccountRecovery(true);
        } else {
          onSuccess?.();
        }
      } else {
        await signInWithEmail(normalizedEmail, password);
        onSuccess?.();
      }
    } catch (cause) {
      if (signingUp && isExistingAccountSignUpError(cause)) {
        // Defensive fallback in case a custom AuthContext implementation does
        // not normalize Supabase's documented existing-account error.
        setNotice(NEUTRAL_SIGNUP_GUIDANCE);
        setShowAccountRecovery(true);
      } else {
        setError(
          signingUp
            ? "We couldn't create your account. Check your details and try again."
            : messageFrom(cause, "We couldn't sign you in. Check your details and try again."),
        );
      }
    } finally {
      setBusy(null);
    }
  }

  if (devAuthBypass) return <DevSignInSlot active={devAuthBypass} />;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogle}
        disabled={disabled}
        aria-busy={busy === "google"}
        className="flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white px-5 py-3 text-base font-bold text-[#111827] shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-colors duration-200 hover:bg-[#F5F3FF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080E1C] active:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
      >
        {busy === "google" ? (
          <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        ) : (
          <GoogleIcon />
        )}
        {busy === "google" ? "Redirecting to Google…" : "Continue with Google"}
      </button>

      <div className="my-5 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-white/15" />
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">or</span>
        <span className="h-px flex-1 bg-white/15" />
      </div>

      <form className="space-y-4" onSubmit={handleEmail} noValidate>
        <label className="block" htmlFor={`${mode}-email`}>
          <span className="mb-2 block text-sm font-bold text-white/80">Email</span>
          <span className="relative block">
            <Mail
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <input
              id={`${mode}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                onEmailChange?.(event.target.value);
              }}
              className="min-h-12 w-full rounded-2xl border border-white/15 bg-white/[0.06] py-3 pl-12 pr-4 text-base text-white outline-none transition-colors placeholder:text-white/35 hover:border-white/25 focus:border-violet-300 focus:ring-4 focus:ring-violet-400/20 motion-reduce:transition-none"
              placeholder="you@school.my"
            />
          </span>
        </label>

        <label className="block" htmlFor={`${mode}-password`}>
          <span className="mb-2 block text-sm font-bold text-white/80">Password</span>
          <span className="relative block">
            <Lock
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <input
              id={`${mode}-password`}
              type={showPassword ? "text" : "password"}
              autoComplete={signingUp ? "new-password" : "current-password"}
              required
              minLength={signingUp ? 6 : undefined}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-describedby={signingUp ? `${mode}-password-help` : undefined}
              className="min-h-12 w-full rounded-2xl border border-white/15 bg-white/[0.06] py-3 pl-12 pr-14 text-base text-white outline-none transition-colors placeholder:text-white/35 hover:border-white/25 focus:border-violet-300 focus:ring-4 focus:ring-violet-400/20 motion-reduce:transition-none"
              placeholder={signingUp ? "At least 6 characters" : "Your password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl text-white/55 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 motion-reduce:transition-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </span>
          {signingUp && (
            <span id={`${mode}-password-help`} className="mt-2 block text-xs text-white/55">
              Use at least 6 characters.
            </span>
          )}
        </label>

        {!signingUp && (
          <div className="text-right">
            <Link
              to="/forgot-password"
              search={{ error: undefined }}
              className="inline-flex min-h-11 items-center rounded-lg px-1 text-sm font-bold text-violet-200 underline decoration-violet-300/50 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 motion-reduce:transition-none"
            >
              Forgot Password?
            </Link>
          </div>
        )}

        {error && (
          <div
            className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-950/65 px-4 py-3 text-sm leading-6 text-red-100"
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
        {notice && (
          <div
            className="flex items-start gap-2 rounded-xl border border-emerald-300/30 bg-emerald-950/65 px-4 py-3 text-sm leading-6 text-emerald-100"
            role="status"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{notice}</span>
          </div>
        )}
        {signingUp && showAccountRecovery && (
          <div
            className="grid grid-cols-1 gap-2 sm:grid-cols-2"
            aria-label="Account recovery options"
          >
            <Link
              to="/login"
              onClick={onNavigateAway}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-violet-300/35 bg-violet-300/10 px-4 py-2 text-sm font-black text-violet-100 transition-colors hover:bg-violet-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 motion-reduce:transition-none"
            >
              Log In
            </Link>
            <Link
              to="/forgot-password"
              search={{ error: undefined }}
              onClick={onNavigateAway}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-black text-white transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 motion-reduce:transition-none"
            >
              Forgot Password
            </Link>
          </div>
        )}

        <button
          type="submit"
          disabled={disabled}
          aria-busy={busy === "email"}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 text-base font-black text-white shadow-[0_16px_36px_-10px_rgba(139,92,246,0.75)] transition-colors duration-200 hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080E1C] active:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
        >
          {busy === "email" && (
            <Loader2
              className="h-5 w-5 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          )}
          {busy === "email"
            ? signingUp
              ? "Creating account…"
              : "Signing in…"
            : signingUp
              ? "Create Account"
              : "Log In"}
        </button>
      </form>

      {!loading && !isConfigured && (
        <p className="mt-4 text-center text-sm text-amber-200" role="status">
          Cloud sync is not configured in this local environment.
        </p>
      )}

      <p className="mt-6 text-center text-sm leading-6 text-white/65">
        {signingUp ? "Already have an account?" : "New to AcadeMY?"}{" "}
        <Link
          to={signingUp ? "/login" : "/register"}
          onClick={onNavigateAway}
          className="inline-flex min-h-11 items-center font-black text-violet-200 underline decoration-violet-300/50 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 motion-reduce:transition-none"
        >
          {signingUp ? "Log In" : "Start Your Journey"}
        </Link>
      </p>
    </div>
  );
}
