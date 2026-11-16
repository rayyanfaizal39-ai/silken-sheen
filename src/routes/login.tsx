import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { AcademyLogo } from "@/components/AcademyLogo";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthPageBackdrop } from "@/components/auth/AuthPageBackdrop";
import { useAuth } from "@/context/auth-context";
import { getAuthReturnTo } from "@/lib/auth-return-to";
import { enableGuestMode } from "@/lib/guest-mode";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { next?: string } => ({
    next: typeof search.next === "string" ? getAuthReturnTo(search.next) : undefined,
  }),
  head: () =>
    seoMeta({
      title: "Log In",
      description: "Log in to AcadeMY and continue your learning journey.",
      path: "/login",
      noindex: true,
    }),
  component: LoginPage,
});

function LoginPage() {
  const { user, loading } = useAuth();
  const { next } = Route.useSearch();
  const returnTo = next ?? "/home";

  useEffect(() => {
    if (!loading && user) window.location.replace(returnTo);
  }, [loading, returnTo, user]);

  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-[#050816] px-4 py-5 text-white sm:px-6 sm:py-8">
      <AuthPageBackdrop />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-bold text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
        <AcademyLogo className="h-auto w-[142px] sm:w-[176px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 pb-10 pt-8 lg:min-h-[calc(100svh-104px)] lg:grid-cols-[1fr_480px] lg:py-12">
        <section className="max-w-xl text-center lg:text-left" aria-labelledby="login-heading">
          <p className="inline-flex min-h-11 items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[0.08] px-4 py-2 text-sm font-bold text-violet-100">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Your progress is waiting
          </p>
          <h1
            id="login-heading"
            className="mt-5 font-display text-[clamp(2.25rem,7vw,4.75rem)] font-black leading-[1.02] tracking-tight"
          >
            Welcome Back to <span className="text-violet-300">AcadeMY</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-white/70 sm:text-lg lg:mx-0">
            Log in to continue with your existing account, saved progress, XP, and achievements.
          </p>
          <div className="mt-6 flex items-start justify-center gap-3 text-sm leading-6 text-white/65 lg:justify-start">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
            <p>Returning students do not need to choose a learning world again.</p>
          </div>
        </section>

        <section
          className="rounded-[28px] border border-white/15 bg-[#080E1C]/90 p-5 shadow-[0_32px_90px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:p-8"
          aria-label="Log in to AcadeMY"
        >
          <h2 className="font-display text-2xl font-black">Log In</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Use the same Google account or email you registered with.
          </p>
          <div className="mt-6">
            <AuthForm
              mode="signin"
              returnTo={next}
              onSuccess={() => window.location.replace(returnTo)}
            />
          </div>
          <div className="mt-4 border-t border-white/10 pt-4 text-center">
            <Link
              to="/home"
              onClick={() => enableGuestMode()}
              className="inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-bold text-white/60 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 motion-reduce:transition-none"
            >
              Continue as guest
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
