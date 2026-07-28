import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X, Sparkles, ArrowRight, Star, Loader2, Crown, Rocket } from "lucide-react";
import { AcademyPageShell } from "@/components/AcademyPage";
import { useAuth } from "@/context/auth-context";
import { createCheckout, simulateMockPayment, type UpgradePlan } from "./-upgrade.server";
import { seoMeta } from "@/lib/seo";
import { MySubscription } from "@/components/billing/MySubscription";
import { StudentRating } from "@/components/ratings/StudentRating";

export const Route = createFileRoute("/upgrade")({
  head: () =>
    seoMeta({
      title: "AcadeMY Pricing — Basic, Pro & Premium Plans",
      description:
        "Simple pricing for Malaysian KSSM students. Start free, upgrade to Pro for Cikgu AI & analytics, or go Premium for parent dashboard and weekly reports.",
      path: "/upgrade",
      keywords: [
        "AcadeMY pricing",
        "KSSM premium",
        "AI tutor Malaysia",
        "parent dashboard Malaysia",
      ],
    }),
  component: UpgradePage,
});

// ─── Data ───────────────────────────────────────────────────────────────

type PlanKey = "basic" | "pro" | "premium";

type Feature = { label: string; included: boolean };

const BASIC_FEATURES: Feature[] = [
  { label: "Chapter 1 Notes", included: true },
  { label: "Chapter 1 Video Lessons", included: true },
  { label: "Chapter 1 Mind Maps", included: true },
  { label: "Chapter 1 Flashcards", included: true },
  { label: "Chapter 1 Quizzes", included: true },
  { label: "Available for Form 1, Form 2 and Form 3", included: true },
];

const PRO_FEATURES: Feature[] = [
  { label: "All chapters for Form 1, Form 2 and Form 3", included: true },
  { label: "Full notes", included: true },
  { label: "All video lessons", included: true },
  { label: "All mind maps", included: true },
  { label: "All flashcards", included: true },
  { label: "All quizzes", included: true },
  { label: "Cikgu AI", included: true },
  { label: "Progress tracking", included: true },
  { label: "XP, streaks and leaderboard", included: true },
  { label: "Companion growth", included: true },
  { label: "Personalised learning recommendations", included: true },
];

const PREMIUM_FEATURES: Feature[] = [
  { label: "Everything in Pro", included: true },
  { label: "Parent Dashboard", included: true },
  { label: "Weekly parent reports", included: true },
  { label: "Detailed progress analytics", included: true },
  { label: "Strong and weak topic analysis", included: true },
  { label: "Study-time tracking", included: true },
  { label: "Parent recommendations and alerts", included: true },
];

const WEEKLY_REPORT_ITEMS = [
  { icon: "📈", label: "Overall Progress" },
  { icon: "📚", label: "Subjects Studied" },
  { icon: "🎯", label: "Strongest Subjects" },
  { icon: "⚠️", label: "Weakest Topics" },
  { icon: "🔥", label: "Learning Streak" },
  { icon: "📝", label: "Quiz Performance" },
  { icon: "🤖", label: "AI Recommendations" },
  { icon: "❤️", label: "Encouragement & Next Steps" },
];

// ─── Small UI bits ─────────────────────────────────────────────────────

function FeatureRow({ label, included }: Feature) {
  return (
    <li className="flex items-start gap-3 text-sm">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          included ? "bg-emerald-500/20 text-emerald-400" : "bg-white/[0.05] text-white/30"
        }`}
      >
        {included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </span>
      <span className={included ? "text-white/85" : "text-white/40 line-through"}>{label}</span>
    </li>
  );
}

type CheckoutStatus = "idle" | "loading" | "error";

function CtaButton({
  plan,
  label,
  className,
}: {
  plan: UpgradePlan | null;
  label: string;
  className: string;
}) {
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<CheckoutStatus>("idle");

  if (plan === null) {
    return (
      <Link to="/subjects" className={className}>
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }

  if (!authLoading && !user) {
    return (
      <Link to="/login" className={className}>
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }

  async function handleClick() {
    if (!plan) return;
    setStatus("loading");
    try {
      const checkout = await createCheckout({
        data: { plan, idempotencyKey: crypto.randomUUID() },
      });
      if (checkout.mode === "toyyibpay") {
        window.location.assign(checkout.checkoutUrl);
        return;
      }
      await simulateMockPayment({
        data: { paymentId: checkout.paymentId, outcome: "successful" },
      });
      window.dispatchEvent(new Event("academy:billing-updated"));
      setStatus("idle");
    } catch (err) {
      console.error("[upgrade] checkout failed:", err);
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "loading"}
        className={className}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          <>
            {label} <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {status === "error" && (
        <p className="mt-2 text-center text-xs text-red-400">
          Payments are temporarily unavailable. No charge was made. Please try again later.
        </p>
      )}
    </>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────

function UpgradePage() {
  return (
    <AcademyPageShell>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#A78BFA]">
          🚀 AcadeMY Pricing
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-5xl">
          Choose the plan that fits your journey
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#94A3B8] sm:text-base">
          Complete Chapter 1 access, free.
        </p>
      </div>

      <StudentRating />

      {/* ── Plan cards ─────────────────────────────────────────────────── */}
      <div id="pricing-plans" className="mx-auto grid max-w-6xl scroll-mt-24 gap-6 lg:grid-cols-3">
        {/* Basic */}
        <div className="flex flex-col rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-7 backdrop-blur-2xl">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-2xl">🆓</span>
            <p className="font-display text-lg font-bold text-white">Basic</p>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Explore the complete first chapter of every subject for free.
          </p>
          <div className="mt-5 mb-6">
            <p className="text-4xl font-bold text-white">FREE</p>
            <p className="mt-1 text-xs text-[#94A3B8]">Forever</p>
          </div>
          <ul className="mb-4 flex-1 space-y-2.5">
            {BASIC_FEATURES.map((f) => (
              <FeatureRow key={f.label} {...f} />
            ))}
          </ul>
          <p className="mb-6 text-xs font-semibold text-white/60">
            Chapter 2 and later chapters require Pro.
          </p>
          <CtaButton
            plan={null}
            label="Start Learning Free"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-white/[0.08]"
          />
        </div>

        {/* Pro */}
        <div className="relative flex flex-col rounded-[2rem] border border-[#6366F1]/50 bg-gradient-to-br from-[#6366F1]/15 to-[#8B5CF6]/15 p-7 backdrop-blur-2xl shadow-[0_0_48px_rgba(99,102,241,0.2)]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-1 text-[11px] font-bold text-white shadow-[0_4px_16px_rgba(99,102,241,0.5)]">
              <Star className="h-3 w-3" /> MOST POPULAR
            </span>
          </div>
          <div className="mb-1 flex items-center gap-2">
            <Rocket className="h-5 w-5 text-[#A78BFA]" />
            <p className="font-display text-lg font-bold text-white">Pro</p>
          </div>
          <p className="text-xs text-[#94A3B8]">Unlock the complete AcadeMY learning library.</p>
          <div className="mt-5 mb-6">
            <p className="mt-1 text-4xl font-bold text-white">
              RM29
              <span className="text-sm font-normal text-[#94A3B8]">/month</span>
            </p>
          </div>
          <ul className="mb-8 flex-1 space-y-2.5">
            {PRO_FEATURES.map((f) => (
              <FeatureRow key={f.label} {...f} />
            ))}
          </ul>
          <CtaButton
            plan="pro_monthly"
            label="Unlock the Complete Library"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
          />
        </div>

        {/* Premium */}
        <div className="relative flex flex-col rounded-[2rem] border border-[#F59E0B]/40 bg-gradient-to-br from-[#F59E0B]/10 to-[#D97706]/10 p-7 backdrop-blur-2xl shadow-[0_0_48px_rgba(245,158,11,0.15)]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-4 py-1 text-[11px] font-bold text-white shadow-[0_4px_16px_rgba(245,158,11,0.5)]">
              <Crown className="h-3 w-3" /> FOR PARENTS
            </span>
          </div>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-2xl">👨‍👩‍👧</span>
            <p className="font-display text-lg font-bold text-white">Premium</p>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Complete learning support for students and parents.
          </p>
          <div className="mt-5 mb-6">
            <p className="mt-1 text-4xl font-bold text-white">
              RM59
              <span className="text-sm font-normal text-[#94A3B8]">/month</span>
            </p>
          </div>
          <ul className="mb-6 flex-1 space-y-2.5">
            {PREMIUM_FEATURES.map((f) => (
              <FeatureRow key={f.label} {...f} />
            ))}
          </ul>
          <CtaButton
            plan="premium_monthly"
            label="Upgrade to Premium"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(245,158,11,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
          />
        </div>
      </div>

      {/* ── Weekly Parent Report ─────────────────────────────────────────── */}
      <div className="mx-auto mt-14 max-w-4xl">
        <div className="rounded-[2rem] border border-[#F59E0B]/25 bg-gradient-to-br from-[#F59E0B]/10 to-[#D97706]/5 p-6 backdrop-blur-2xl sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-3xl">📧</span>
            <div>
              <p className="font-display text-lg font-bold text-white">Weekly Parent Report</p>
              <p className="text-xs text-[#94A3B8]">
                Delivered every Sunday, powered by AcadeMY Brain
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {WEEKLY_REPORT_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-xs font-medium text-white/80"
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why this structure works ────────────────────────────────────── */}
      <div className="mx-auto mt-14 max-w-4xl">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: "🆓",
              title: "Basic",
              text: "Complete Chapter 1 access, free.",
            },
            {
              icon: "⭐",
              title: "Pro",
              text: "For students who want personalized AI support, analytics and progress tracking.",
            },
            {
              icon: "👨‍👩‍👧",
              title: "Premium",
              text: "For parents who want visibility into their child's learning through weekly AI reports.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/[0.07] bg-[#0B1220]/62 p-5 backdrop-blur-2xl"
            >
              <div className="mb-2 text-2xl">{item.icon}</div>
              <p className="font-display font-bold text-white">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#94A3B8]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trust footer ─────────────────────────────────────────────────── */}
      <div className="mx-auto mt-14 max-w-4xl">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/60">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" /> Cancel anytime
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-400" /> No ads, ever
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-400" /> Built for KSSM syllabus
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-400" /> Safe for students
          </span>
        </div>
      </div>

      <MySubscription />
    </AcademyPageShell>
  );
}
