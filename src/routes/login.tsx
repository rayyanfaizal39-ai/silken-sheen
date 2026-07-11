import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Rocket, Sparkles, Shield, Zap, Star, ArrowLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () => seoMeta({
    title: "Sign In",
    description: "Sign in to AcadeMY to save your KSSM study progress, XP, and streaks across devices.",
    path: "/login",
    noindex: true,
  }),
  component: LoginPage,
});

const PERKS = [
  { icon: Zap,    color: "#FBBF24", label: "XP & Rank",      desc: "Earn points and unlock Space Ranks" },
  { icon: Star,   color: "#A78BFA", label: "Streak Tracking", desc: "Keep your daily learning fire alive" },
  { icon: Shield, color: "#34D399", label: "Sync Everywhere", desc: "Progress saved across all your devices" },
];

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

// Deterministic pseudo-random in [0, 1), seeded by an integer. Unlike
// Math.random(), this produces the exact same sequence on the server and
// on the client, so SSR-rendered markup matches what hydration re-renders
// — Math.random() here would fire a hydration mismatch on every star.
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function StarField() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 12.9898) * 100,
    y: seededRandom(i * 78.233 + 1) * 100,
    size: seededRandom(i * 39.425 + 2) * 1.5 + 0.5,
    opacity: seededRandom(i * 94.673 + 3) * 0.5 + 0.15,
    delay: seededRandom(i * 15.732 + 4) * 4,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDuration: `${2 + s.delay}s`,
            animationDelay: `${s.delay}s`,
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
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_0_28px_rgba(99,102,241,0.6)]">
                <Rocket className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-white">Acade</span>
                <span
                  className="text-nova-yellow"
                  style={{ textShadow: "0 0 12px rgba(250,204,21,0.7), 0 0 24px rgba(250,204,21,0.4)" }}
                >
                  MY
                </span>
              </span>
            </div>

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
              <Link to="/" className="text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors">
                Continue as guest
              </Link>
              {" "}— your local progress is still saved.
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
