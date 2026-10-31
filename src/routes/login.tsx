import { getAuthReturnTo } from "@/lib/auth-return-to";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Zap,
  ChartNoAxesColumnIncreasing,
  Cloud,
  ShieldCheck,
  UsersRound,
  Laptop,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { seoMeta } from "@/lib/seo";
import { AcademyLogo } from "@/components/AcademyLogo";
import { LearningLevelSelector } from "@/components/auth/LearningLevelSelector";
import { enableGuestMode } from "@/lib/guest-mode";
import { DevSignInSlot } from "@/lib/dev-auth/DevSignInSlot";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { next?: string } => ({
    next: typeof search.next === "string" ? getAuthReturnTo(search.next) : undefined,
  }),
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

// Study-desk artwork supplied by the AcadeMY team (896×1120 WebP). The overlay
// in LoginBackdrop keeps text legible if this image is swapped.
const LOGIN_BACKGROUND_SRC = "/images/login/login-background.webp";

const TEXT_SHADOW = "[text-shadow:0_2px_14px_rgba(0,0,0,0.45)]";

const PERKS = [
  {
    icon: Zap,
    color: "text-[#FACC15] fill-[#FACC15]",
    label: "XP & Rank",
    desc: "Earn points and unlock Space Ranks",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    color: "text-[#A855F7]",
    label: "Streak Tracking",
    desc: "Keep your daily learning fire alive",
  },
  {
    icon: Cloud,
    color: "text-[#60A5FA]",
    label: "Sync Everywhere",
    desc: "Across all your devices",
  },
];

const TRUST_NOTES = [
  { icon: ShieldCheck, label: "Safe & Secure", desc: "Your data is protected" },
  {
    icon: UsersRound,
    label: "Built for Malaysian Students",
    desc: "Designed for our national curriculum",
  },
  { icon: Laptop, label: "Works on All Devices", desc: "Learn anytime, anywhere" },
];

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0 sm:h-6 sm:w-6" viewBox="0 0 24 24" aria-hidden="true">
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

/**
 * Static, decorative backdrop with a dark overlay for legibility. An <img> (not a
 * CSS background) so the browser fetches it early; it fades in over the matching
 * navy fill once decoded. The position keeps the backpack and books in view on
 * narrow screens and the desk on wide ones.
 */
function LoginBackdrop() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // A cached or SSR-delivered image can finish before hydration, so onLoad never fires.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <img
        ref={imgRef}
        src={LOGIN_BACKGROUND_SRC}
        alt=""
        width={896}
        height={1120}
        decoding="async"
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover object-[72%_60%] motion-safe:transition-opacity motion-safe:duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/55" />
    </div>
  );
}

function LoginPage() {
  const { user, loading, isConfigured, devAuthBypass, signInWithGoogle } = useAuth();
  const { next } = Route.useSearch();
  const returnTo = next ?? "/home";
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, continue to the safe requested route.
  useEffect(() => {
    if (!loading && user) {
      window.location.replace(returnTo);
    }
  }, [user, loading, returnTo]);

  async function handleGoogle() {
    console.info("[Auth] Google login button clicked");
    setError(null);
    setSigning(true);
    try {
      await signInWithGoogle(next);
      // Page will redirect to Google — spinner stays
    } catch (cause) {
      console.error("[Auth] Google login failed before redirect", cause);
      setError("Couldn't connect to Google. Please try again.");
      setSigning(false);
    }
  }

  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-[#0A1128] text-white">
      <LoginBackdrop />

      <Link
        to="/"
        className={`group absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-md text-sm text-white/90 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-safe:transition-colors sm:left-8 sm:top-6 sm:text-base ${TEXT_SHADOW}`}
      >
        <ArrowLeft className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:-translate-x-0.5 sm:h-5 sm:w-5" />
        Back to home
      </Link>

      <div className="relative mx-auto w-full max-w-[1240px] px-3 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-7">
        <header className="text-center">
          <AcademyLogo className="mx-auto h-auto w-[180px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] sm:w-[224px]" />
          <h1
            className={`mt-3 font-display text-[clamp(1.75rem,6.2vw,4.25rem)] font-bold leading-[1.05] tracking-tight sm:mt-4 ${TEXT_SHADOW}`}
          >
            Your journey <span className="text-[#A259FF]">awaits</span>
          </h1>
          <p className={`mt-2 text-sm text-white/90 sm:mt-3 sm:text-xl ${TEXT_SHADOW}`}>
            Sign in to save your progress, streaks, and achievements — forever.
          </p>
        </header>

        <ul className="mx-auto mt-5 grid max-w-[1060px] grid-cols-3 divide-x divide-white/25 sm:mt-7">
          {PERKS.map(({ icon: Icon, color, label, desc }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-2 px-1.5 text-center sm:px-5 lg:flex-row lg:justify-center lg:gap-4 lg:text-left"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-sm sm:h-14 sm:w-14">
                <Icon
                  aria-hidden="true"
                  strokeWidth={2.25}
                  className={`h-5 w-5 sm:h-7 sm:w-7 ${color}`}
                />
              </span>
              <div className={`min-w-0 ${TEXT_SHADOW}`}>
                <p className="text-[12px] font-semibold leading-tight sm:text-base">{label}</p>
                <p className="mt-0.5 hidden text-sm leading-snug text-white/85 sm:block">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-[24px] border border-white/20 bg-[#0A1128]/45 px-2.5 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl sm:mt-8 sm:rounded-[36px] sm:px-8 sm:py-10 lg:px-10 lg:py-8">
          <LearningLevelSelector />

          <div className="mx-auto mt-7 max-w-[860px] sm:mt-8">
            {error && (
              <div
                role="alert"
                className="mb-4 flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-950/70 px-3.5 py-3 text-sm text-red-200"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {devAuthBypass && <DevSignInSlot active={devAuthBypass} />}

            {!loading && !isConfigured && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-400/40 bg-amber-950/70 px-3.5 py-3 text-sm text-amber-200">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
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

            {!devAuthBypass && (
              <button
                type="button"
                onClick={handleGoogle}
                disabled={signing || loading || !isConfigured}
                aria-busy={signing}
                className="relative flex h-14 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-white px-10 text-[15px] font-semibold text-[#111827] shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:bg-[#F7F5FF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A855F7]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1128] active:bg-[#EDE9FE] disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-colors sm:h-16 sm:gap-4 sm:px-16 sm:text-xl"
              >
                {signing ? (
                  <div className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                ) : (
                  <GoogleIcon />
                )}
                <span>{signing ? "Redirecting to Google…" : "Continue with Google"}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="absolute right-5 h-5 w-5 text-[#111827]/80 max-[359px]:hidden sm:right-7 sm:h-6 sm:w-6"
                />
              </button>
            )}

            <div className="mt-5 flex items-center gap-4 sm:mt-6">
              <div className="h-px flex-1 bg-white/25" />
              <span className="text-sm text-white/80">or</span>
              <div className="h-px flex-1 bg-white/25" />
            </div>

            <p className="mt-3 text-center sm:mt-4">
              <Link
                to="/home"
                onClick={() => enableGuestMode()}
                className="rounded-md text-[15px] font-semibold text-[#D8B4FE] underline decoration-[#D8B4FE]/60 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-safe:transition-colors sm:text-lg"
              >
                Continue as guest
              </Link>
            </p>
          </div>

          <ul className="mx-auto mt-8 grid max-w-[940px] grid-cols-3 divide-x divide-white/25 sm:mt-8">
            {TRUST_NOTES.map(({ icon: Icon, label, desc }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-1.5 px-1.5 text-center sm:px-4 lg:flex-row lg:justify-center lg:gap-3 lg:text-left"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-6 w-6 shrink-0 text-white sm:h-8 sm:w-8"
                />
                <div className="min-w-0">
                  <p className="text-[10.5px] font-semibold leading-tight text-white sm:text-sm">
                    {label}
                  </p>
                  <p className="mt-0.5 hidden text-xs leading-snug text-white/75 sm:block">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
