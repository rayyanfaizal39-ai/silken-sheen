import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Shield, Zap, Star, ArrowLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { seoMeta } from "@/lib/seo";
import { AcademyLogo } from "@/components/AcademyLogo";

export const Route = createFileRoute("/login")({
  head: () =>
    seoMeta({
      title: "Sign In",
      description:
        "Sign in to AcadeMY to save your KSSM study progress, XP, and streaks across devices.",
      path: "/login",
      noindex: true,
    }),
  component: LoginPage,
});

const PERKS = [
  { icon: Zap, color: "#FBBF24", label: "XP & Rank", desc: "Earn points and unlock Space Ranks" },
  {
    icon: Star,
    color: "#A78BFA",
    label: "Streak Tracking",
    desc: "Keep your daily learning fire alive",
  },
  {
    icon: Shield,
    color: "#34D399",
    label: "Sync Everywhere",
    desc: "Progress saved across all your devices",
  },
];

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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

type Star = {
  id: number;
  left: string;
  top: string;
  width: string;
  height: string;
  opacity: number;
  animationDuration: string;
  animationDelay: string;
};

// Fixed starfield data so the server and client render the exact same markup.
const STARS: Star[] = [
  {
    id: 0,
    left: "8%",
    top: "12%",
    width: "1.1px",
    height: "1.1px",
    opacity: 0.32,
    animationDuration: "3.2s",
    animationDelay: "0.1s",
  },
  {
    id: 1,
    left: "16%",
    top: "68%",
    width: "1.4px",
    height: "1.4px",
    opacity: 0.22,
    animationDuration: "4.4s",
    animationDelay: "0.8s",
  },
  {
    id: 2,
    left: "24%",
    top: "28%",
    width: "0.9px",
    height: "0.9px",
    opacity: 0.48,
    animationDuration: "2.8s",
    animationDelay: "1.4s",
  },
  {
    id: 3,
    left: "31%",
    top: "82%",
    width: "1.2px",
    height: "1.2px",
    opacity: 0.27,
    animationDuration: "3.9s",
    animationDelay: "0.5s",
  },
  {
    id: 4,
    left: "39%",
    top: "18%",
    width: "1.5px",
    height: "1.5px",
    opacity: 0.18,
    animationDuration: "5.1s",
    animationDelay: "1.1s",
  },
  {
    id: 5,
    left: "47%",
    top: "54%",
    width: "0.8px",
    height: "0.8px",
    opacity: 0.44,
    animationDuration: "2.6s",
    animationDelay: "0.3s",
  },
  {
    id: 6,
    left: "55%",
    top: "10%",
    width: "1.3px",
    height: "1.3px",
    opacity: 0.29,
    animationDuration: "4.8s",
    animationDelay: "1.7s",
  },
  {
    id: 7,
    left: "63%",
    top: "36%",
    width: "1.0px",
    height: "1.0px",
    opacity: 0.36,
    animationDuration: "3.1s",
    animationDelay: "0.9s",
  },
  {
    id: 8,
    left: "71%",
    top: "76%",
    width: "1.6px",
    height: "1.6px",
    opacity: 0.19,
    animationDuration: "5.4s",
    animationDelay: "1.6s",
  },
  {
    id: 9,
    left: "79%",
    top: "22%",
    width: "0.9px",
    height: "0.9px",
    opacity: 0.41,
    animationDuration: "2.9s",
    animationDelay: "0.2s",
  },
  {
    id: 10,
    left: "87%",
    top: "60%",
    width: "1.4px",
    height: "1.4px",
    opacity: 0.24,
    animationDuration: "4.1s",
    animationDelay: "1.0s",
  },
  {
    id: 11,
    left: "92%",
    top: "14%",
    width: "1.1px",
    height: "1.1px",
    opacity: 0.34,
    animationDuration: "3.5s",
    animationDelay: "1.3s",
  },
  {
    id: 12,
    left: "11%",
    top: "42%",
    width: "0.8px",
    height: "0.8px",
    opacity: 0.5,
    animationDuration: "2.4s",
    animationDelay: "0.6s",
  },
  {
    id: 13,
    left: "19%",
    top: "90%",
    width: "1.3px",
    height: "1.3px",
    opacity: 0.26,
    animationDuration: "4.9s",
    animationDelay: "1.8s",
  },
  {
    id: 14,
    left: "27%",
    top: "6%",
    width: "1.0px",
    height: "1.0px",
    opacity: 0.37,
    animationDuration: "3.3s",
    animationDelay: "0.4s",
  },
  {
    id: 15,
    left: "35%",
    top: "50%",
    width: "1.5px",
    height: "1.5px",
    opacity: 0.21,
    animationDuration: "5.0s",
    animationDelay: "1.2s",
  },
  {
    id: 16,
    left: "43%",
    top: "74%",
    width: "0.9px",
    height: "0.9px",
    opacity: 0.46,
    animationDuration: "2.7s",
    animationDelay: "0.7s",
  },
  {
    id: 17,
    left: "51%",
    top: "26%",
    width: "1.2px",
    height: "1.2px",
    opacity: 0.28,
    animationDuration: "3.8s",
    animationDelay: "1.5s",
  },
  {
    id: 18,
    left: "59%",
    top: "86%",
    width: "1.6px",
    height: "1.6px",
    opacity: 0.17,
    animationDuration: "5.5s",
    animationDelay: "0.9s",
  },
  {
    id: 19,
    left: "67%",
    top: "40%",
    width: "1.0px",
    height: "1.0px",
    opacity: 0.39,
    animationDuration: "3.0s",
    animationDelay: "0.1s",
  },
  {
    id: 20,
    left: "75%",
    top: "8%",
    width: "1.4px",
    height: "1.4px",
    opacity: 0.23,
    animationDuration: "4.3s",
    animationDelay: "1.3s",
  },
  {
    id: 21,
    left: "83%",
    top: "48%",
    width: "0.8px",
    height: "0.8px",
    opacity: 0.47,
    animationDuration: "2.5s",
    animationDelay: "0.5s",
  },
  {
    id: 22,
    left: "90%",
    top: "80%",
    width: "1.1px",
    height: "1.1px",
    opacity: 0.31,
    animationDuration: "3.6s",
    animationDelay: "1.6s",
  },
  {
    id: 23,
    left: "6%",
    top: "62%",
    width: "1.5px",
    height: "1.5px",
    opacity: 0.2,
    animationDuration: "4.7s",
    animationDelay: "0.8s",
  },
  {
    id: 24,
    left: "14%",
    top: "20%",
    width: "1.0px",
    height: "1.0px",
    opacity: 0.43,
    animationDuration: "3.4s",
    animationDelay: "1.1s",
  },
  {
    id: 25,
    left: "22%",
    top: "58%",
    width: "1.3px",
    height: "1.3px",
    opacity: 0.25,
    animationDuration: "4.0s",
    animationDelay: "0.3s",
  },
  {
    id: 26,
    left: "30%",
    top: "94%",
    width: "0.9px",
    height: "0.9px",
    opacity: 0.38,
    animationDuration: "2.9s",
    animationDelay: "1.7s",
  },
  {
    id: 27,
    left: "38%",
    top: "32%",
    width: "1.6px",
    height: "1.6px",
    opacity: 0.18,
    animationDuration: "5.2s",
    animationDelay: "0.4s",
  },
  {
    id: 28,
    left: "46%",
    top: "16%",
    width: "1.1px",
    height: "1.1px",
    opacity: 0.35,
    animationDuration: "3.2s",
    animationDelay: "1.0s",
  },
  {
    id: 29,
    left: "54%",
    top: "70%",
    width: "0.8px",
    height: "0.8px",
    opacity: 0.49,
    animationDuration: "2.6s",
    animationDelay: "1.4s",
  },
  {
    id: 30,
    left: "62%",
    top: "24%",
    width: "1.4px",
    height: "1.4px",
    opacity: 0.22,
    animationDuration: "4.6s",
    animationDelay: "0.6s",
  },
  {
    id: 31,
    left: "70%",
    top: "52%",
    width: "1.0px",
    height: "1.0px",
    opacity: 0.4,
    animationDuration: "3.1s",
    animationDelay: "1.8s",
  },
  {
    id: 32,
    left: "78%",
    top: "12%",
    width: "1.2px",
    height: "1.2px",
    opacity: 0.27,
    animationDuration: "3.7s",
    animationDelay: "0.9s",
  },
  {
    id: 33,
    left: "86%",
    top: "88%",
    width: "1.5px",
    height: "1.5px",
    opacity: 0.2,
    animationDuration: "5.3s",
    animationDelay: "0.2s",
  },
  {
    id: 34,
    left: "94%",
    top: "38%",
    width: "0.9px",
    height: "0.9px",
    opacity: 0.45,
    animationDuration: "2.8s",
    animationDelay: "1.2s",
  },
  {
    id: 35,
    left: "9%",
    top: "74%",
    width: "1.3px",
    height: "1.3px",
    opacity: 0.24,
    animationDuration: "4.2s",
    animationDelay: "0.7s",
  },
  {
    id: 36,
    left: "17%",
    top: "4%",
    width: "1.0px",
    height: "1.0px",
    opacity: 0.37,
    animationDuration: "3.5s",
    animationDelay: "1.5s",
  },
  {
    id: 37,
    left: "25%",
    top: "46%",
    width: "1.6px",
    height: "1.6px",
    opacity: 0.19,
    animationDuration: "5.0s",
    animationDelay: "0.4s",
  },
  {
    id: 38,
    left: "33%",
    top: "66%",
    width: "0.8px",
    height: "0.8px",
    opacity: 0.48,
    animationDuration: "2.5s",
    animationDelay: "1.1s",
  },
  {
    id: 39,
    left: "41%",
    top: "96%",
    width: "1.1px",
    height: "1.1px",
    opacity: 0.3,
    animationDuration: "3.9s",
    animationDelay: "1.7s",
  },
];

function StarField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: s.left,
            top: s.top,
            width: s.width,
            height: s.height,
            opacity: s.opacity,
            animationDuration: s.animationDuration,
            animationDelay: s.animationDelay,
          }}
        />
      ))}
    </div>
  );
}

function LoginPage() {
  const { user, loading, isConfigured, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, go home
  useEffect(() => {
    if (!loading && user) {
      void navigate({ to: "/home" });
    }
  }, [user, loading, navigate]);

  async function handleGoogle() {
    console.info("[Auth] Google login button clicked");
    setError(null);
    setSigning(true);
    try {
      await signInWithGoogle();
      // Page will redirect to Google — spinner stays
    } catch (cause) {
      console.error("[Auth] Google login failed before redirect", cause);
      setError("Couldn't connect to Google. Please try again.");
      setSigning(false);
    }
  }

  return (
    <section className="min-h-[calc(100svh-80px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to home
        </Link>

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#080E1C]/90 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <StarField />

          {/* Ambient glows */}
          <div className="pointer-events-none absolute -top-28 -right-28 w-72 h-72 rounded-full bg-[#6366F1]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-[#8B5CF6]/20 blur-3xl" />

          <div className="relative">
            {/* Logo */}
            <AcademyLogo className="mb-6 h-auto w-[156px]" />

            {/* Heading */}
            <h1 className="font-display text-3xl font-bold leading-tight">
              Your journey{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                awaits
              </span>
            </h1>
            <p className="mt-2 text-sm text-white/50 leading-relaxed">
              Sign in to save your progress, streaks, and achievements — forever.
            </p>

            {/* Perks */}
            <div className="mt-6 grid gap-2.5">
              {PERKS.map(({ icon: Icon, color, label, desc }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${color}20` }}
                  >
                    <Icon className="h-4 w-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{label}</p>
                    <p className="text-[11px] text-white/40">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.07]" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
                sign in free
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-3 text-sm text-red-300">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Not configured */}
            {!isConfigured && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3.5 py-3 text-sm text-amber-300">
                <Sparkles className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  Supabase is not yet configured.{" "}
                  <a
                    href="/.env.example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    See .env.example
                  </a>{" "}
                  to set up cloud sync.
                </span>
              </div>
            )}

            {/* Google button */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={signing || !isConfigured}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 shadow-[0_2px_16px_rgba(0,0,0,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {signing ? (
                <div className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
              ) : (
                <GoogleIcon />
              )}
              <span>{signing ? "Redirecting to Google…" : "Continue with Google"}</span>
            </button>

            {/* Already browsing note */}
            <p className="mt-5 text-center text-xs text-white/30 leading-relaxed">
              Already browsing without an account?{" "}
              <Link
                to="/"
                className="text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors"
              >
                Continue as guest
              </Link>{" "}
              — your local progress is still saved.
            </p>
          </div>
        </div>

        {/* Trust note */}
        <p className="mt-4 text-center text-[11px] text-white/25">
          Secure sign-in · No password required · Free forever
        </p>
      </div>
    </section>
  );
}
