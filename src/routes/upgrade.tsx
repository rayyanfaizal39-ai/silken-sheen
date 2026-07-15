import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, X, Sparkles, ArrowRight, Star, Loader2, Crown, Rocket } from "lucide-react";
import { AcademyPageShell } from "@/components/AcademyPage";
import { useAuth } from "@/context/auth-context";
import { createAndConfirmStubCheckout, type UpgradePlan } from "./-upgrade.server";
import { seoMeta } from "@/lib/seo";

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

type Billing = "monthly" | "annual";

type PlanKey = "basic" | "pro" | "premium";

type Feature = { label: string; included: boolean };

const BASIC_FEATURES: Feature[] = [
  { label: "All Notes", included: true },
  { label: "All Flashcards", included: true },
  { label: "All Mind Maps", included: true },
  { label: "All Videos", included: true },
  { label: "Practice Quizzes", included: true },
  { label: "Save Progress", included: false },
  { label: "Cikgu AI", included: false },
  { label: "AI Tracker", included: false },
  { label: "Parent Dashboard", included: false },
  { label: "Weekly Parent Reports", included: false },
];

const PRO_FEATURES: Feature[] = [
  { label: "Save Learning Progress", included: true },
  { label: "Sync Progress Across Devices", included: true },
  { label: "Quiz History", included: true },
  { label: "Learning Streak", included: true },
  { label: "XP & Companion Progress", included: true },
  { label: "Unlimited Cikgu AI", included: true },
  { label: "AI Tracker", included: true },
  { label: "Personalized Study Recommendations", included: true },
  { label: "Weak Topic Detection", included: true },
  { label: "Learning Analytics", included: true },
];

const PREMIUM_FEATURES: Feature[] = [
  { label: "Parent Dashboard", included: true },
  { label: "Weekly AI Progress Email", included: true },
  { label: "Learning Progress Monitoring", included: true },
  { label: "Subject Performance Analysis", included: true },
  { label: "Weak Topic Alerts", included: true },
  { label: "AI Learning Recommendations", included: true },
  { label: "Achievement Tracking", included: true },
  { label: "Learning Streak Monitoring", included: true },
  { label: "Parent Insights", included: true },
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

const COMPARISON: Array<{ feature: string; basic: boolean; pro: boolean; premium: boolean }> = [
  { feature: "Notes", basic: true, pro: true, premium: true },
  { feature: "Flashcards", basic: true, pro: true, premium: true },
  { feature: "Mind Maps", basic: true, pro: true, premium: true },
  { feature: "NotebookLM Videos", basic: true, pro: true, premium: true },
  { feature: "Practice Quizzes", basic: true, pro: true, premium: true },
  { feature: "Save Progress", basic: false, pro: true, premium: true },
  { feature: "Quiz History", basic: false, pro: true, premium: true },
  { feature: "XP & Companion", basic: true, pro: true, premium: true },
  { feature: "Cikgu AI", basic: false, pro: true, premium: true },
  { feature: "AI Tracker", basic: false, pro: true, premium: true },
  { feature: "Learning Analytics", basic: false, pro: true, premium: true },
  { feature: "Parent Dashboard", basic: false, pro: false, premium: true },
  { feature: "Weekly Parent Email", basic: false, pro: false, premium: true },
  { feature: "AI Parent Insights", basic: false, pro: false, premium: true },
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
  const navigate = useNavigate();
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
      await createAndConfirmStubCheckout({ data: { plan } });
      navigate({ to: "/dashboard" });
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
          Something went wrong. Please try again.
        </p>
      )}
    </>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────

function UpgradePage() {
  const [billing, setBilling] = useState<Billing>("monthly");

  const proPrice = billing === "monthly" ? "RM19" : "RM190";
  const proPeriod = billing === "monthly" ? "/month" : "/year";
  const premiumPrice = billing === "monthly" ? "RM49" : "RM490";
  const premiumPeriod = billing === "monthly" ? "/month" : "/year";

  const proPlan: UpgradePlan = billing === "monthly" ? "pro_monthly" : "pro_annual";
  const premiumPlan: UpgradePlan = billing === "monthly" ? "premium_monthly" : "premium_annual";

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
          Every student gets full learning content free. Upgrade for AI, analytics and parent
          insights.
        </p>

        {/* Billing toggle */}
        <div className="mt-8 inline-flex rounded-full border border-white/[0.08] bg-[#0B1220]/70 p-1 backdrop-blur-2xl">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all sm:text-sm ${
              billing === "monthly" ? "bg-white text-slate-900" : "text-white/60 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling("annual")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all sm:text-sm ${
              billing === "annual"
                ? "bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white shadow-[0_4px_16px_rgba(245,158,11,0.4)]"
                : "text-white/60 hover:text-white"
            }`}
          >
            Annual
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
              2 months FREE
            </span>
          </button>
        </div>
      </div>

      {/* ── Plan cards ─────────────────────────────────────────────────── */}
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
        {/* Basic */}
        <div className="flex flex-col rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-7 backdrop-blur-2xl">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-2xl">🆓</span>
            <p className="font-display text-lg font-bold text-white">Basic</p>
          </div>
          <p className="text-xs text-[#94A3B8]">Perfect for students to start learning</p>
          <div className="mt-5 mb-6">
            <p className="text-4xl font-bold text-white">FREE</p>
            <p className="mt-1 text-xs text-[#94A3B8]">Forever</p>
          </div>
          <ul className="mb-8 flex-1 space-y-2.5">
            {BASIC_FEATURES.map((f) => (
              <FeatureRow key={f.label} {...f} />
            ))}
          </ul>
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
          <p className="text-xs text-[#94A3B8]">Best for students</p>
          <div className="mt-5 mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-white/40 line-through">
                {billing === "monthly" ? "RM39" : "RM390"}
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                50% OFF
              </span>
            </div>
            <p className="mt-1 text-4xl font-bold text-white">
              {proPrice}
              <span className="text-sm font-normal text-[#94A3B8]">{proPeriod}</span>
            </p>
            {billing === "annual" && (
              <p className="mt-1 text-[11px] font-semibold text-emerald-300">
                Save RM38 • Pay for 10 months, enjoy 12
              </p>
            )}
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
            Everything in Basic, plus:
          </p>
          <ul className="mb-8 flex-1 space-y-2.5">
            {PRO_FEATURES.map((f) => (
              <FeatureRow key={f.label} {...f} />
            ))}
          </ul>
          <CtaButton
            plan={proPlan}
            label="Upgrade to Pro"
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
          <p className="text-xs text-[#94A3B8]">Best for parents</p>
          <div className="mt-5 mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-white/40 line-through">
                {billing === "monthly" ? "RM79" : "RM790"}
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                38% OFF
              </span>
            </div>
            <p className="mt-1 text-4xl font-bold text-white">
              {premiumPrice}
              <span className="text-sm font-normal text-[#94A3B8]">{premiumPeriod}</span>
            </p>
            {billing === "annual" && (
              <p className="mt-1 text-[11px] font-semibold text-emerald-300">
                Save RM98 • Pay for 10 months, enjoy 12
              </p>
            )}
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
            Everything in Pro, plus:
          </p>
          <ul className="mb-6 flex-1 space-y-2.5">
            {PREMIUM_FEATURES.map((f) => (
              <FeatureRow key={f.label} {...f} />
            ))}
            <li className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F59E0B]/20 text-[#F59E0B]">
                🚀
              </span>
              <span className="text-white/85">
                Early Risk Detection
                <span className="ml-1 rounded-full bg-white/[0.08] px-1.5 py-0.5 text-[10px] text-white/60">
                  Coming Soon
                </span>
              </span>
            </li>
          </ul>
          <CtaButton
            plan={premiumPlan}
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

      {/* ── Comparison Table ─────────────────────────────────────────────── */}
      <div className="mx-auto mt-14 max-w-4xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#A78BFA]">
            Full Comparison
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            What's in each plan
          </h2>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 backdrop-blur-2xl">
          <div className="grid grid-cols-4 border-b border-white/[0.08] bg-white/[0.03]">
            <div className="p-4 text-xs font-bold uppercase tracking-wider text-white/60">
              Feature
            </div>
            <div className="p-4 text-center text-xs font-bold text-white/70">Basic</div>
            <div className="p-4 text-center text-xs font-bold text-[#A78BFA]">⭐ Pro</div>
            <div className="p-4 text-center text-xs font-bold text-[#F59E0B]">👨‍👩‍👧 Premium</div>
          </div>
          {COMPARISON.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-4 items-center ${
                i !== COMPARISON.length - 1 ? "border-b border-white/[0.05]" : ""
              }`}
            >
              <div className="p-4 text-sm text-white/85">{row.feature}</div>
              <div className="flex justify-center p-4">
                {row.basic ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <X className="h-4 w-4 text-white/25" />
                )}
              </div>
              <div className="flex justify-center p-4">
                {row.pro ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <X className="h-4 w-4 text-white/25" />
                )}
              </div>
              <div className="flex justify-center p-4">
                {row.premium ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <X className="h-4 w-4 text-white/25" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why this structure works ────────────────────────────────────── */}
      <div className="mx-auto mt-14 max-w-4xl">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: "🆓",
              title: "Basic",
              text: "Every student gets full learning content free — so parents can see the value before paying.",
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
    </AcademyPageShell>
  );
}
