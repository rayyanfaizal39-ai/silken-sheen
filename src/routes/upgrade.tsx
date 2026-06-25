import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Sparkles, ArrowRight, Star, Brain, BarChart2, TrendingUp, GraduationCap, Shield, Ban, BookOpen, Bot, Loader2 } from "lucide-react";
import { AcademyPageShell } from "@/components/AcademyPage";
import { useAuth } from "@/context/auth-context";
import { createAndConfirmStubCheckout, type UpgradePlan } from "./-upgrade.server";

export const Route = createFileRoute("/upgrade")({
  head: () => ({
    meta: [
      { title: "Upgrade — AcadeMY" },
      { name: "description", content: "Unlock unlimited quizzes, AI Study Assistant and personal analytics with AcadeMY Premium." },
    ],
  }),
  component: UpgradePage,
});

const FREE_FEATURES = [
  { icon: "📖", label: "Notes" },
  { icon: "🃏", label: "Flashcards" },
  { icon: "🧠", label: "Limited Quizzes" },
];

const PREMIUM_FEATURES = [
  { icon: Brain,         label: "Unlimited Quizzes",          desc: "No caps — study as much as you want." },
  { icon: Sparkles,      label: "AI Study Assistant",         desc: "Cikgu AI answers your questions 24/7." },
  { icon: BarChart2,     label: "Personal Study Analytics",   desc: "Deep insights into your strengths and gaps." },
  { icon: TrendingUp,    label: "Progress Tracking",          desc: "See exactly what to study next." },
  { icon: GraduationCap, label: "Future Form 4 & 5 Access",  desc: "Unlock upper secondary content when ready." },
];

const TRUST_BADGES = [
  { icon: Shield,   label: "Cancel anytime",         desc: "No lock-in. Stop whenever you want." },
  { icon: Ban,      label: "No advertisements",      desc: "Zero ads. Pure focused study." },
  { icon: Star,     label: "Safe for students",      desc: "Curated, age-appropriate content." },
  { icon: BookOpen, label: "Built for KSSM syllabus", desc: "Covers Form 1–3 Malaysia curriculum." },
];

function PlanFeatureList({ premium = false }: { premium?: boolean }) {
  return (
    <ul className="space-y-3">
      {FREE_FEATURES.map((f) => (
        <li key={f.label} className={`flex items-center gap-3 text-sm ${premium ? "text-white/50" : "text-white/80"}`}>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs">
            {f.icon}
          </span>
          {f.label}
        </li>
      ))}
      {premium && PREMIUM_FEATURES.map((f) => {
        const Icon = f.icon;
        return (
          <li key={f.label} className="flex items-start gap-3 text-sm text-white">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6366F1]/30 text-[#A78BFA]">
              <Check className="h-3.5 w-3.5" />
            </span>
            <div>
              <span className="font-semibold">{f.label}</span>
              <p className="text-[11px] text-[#94A3B8] leading-tight mt-0.5">{f.desc}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

type CheckoutStatus = "idle" | "loading" | "error";

// STUB: redirects to login if logged out, otherwise immediately runs the stub
// checkout (see -upgrade.server.ts) and routes to the dashboard on success.
// There is no real payment gateway yet — see that file for what to swap in.
function UpgradeButton({
  plan,
  label,
  className,
}: {
  plan: UpgradePlan;
  label: string;
  className: string;
}) {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<CheckoutStatus>("idle");

  if (!authLoading && !user) {
    return (
      <div className="mt-auto">
        <Link to="/login" className={className}>
          {label} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  async function handleClick() {
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
    <div className="mt-auto">
      <button type="button" onClick={handleClick} disabled={status === "loading"} className={className}>
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
    </div>
  );
}

function UpgradePage() {
  return (
    <AcademyPageShell>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="mb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6366F1]">Plans</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
          Choose your plan
        </h1>
        <p className="mt-2 text-sm text-[#94A3B8]">
          Start free, upgrade when you're ready to level up.
        </p>
      </div>

      {/* ── Plan cards ─────────────────────────────────────────────────── */}
      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-3">

        {/* Free */}
        <div className="flex flex-col rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <p className="font-display text-lg font-bold text-white">Free</p>
          </div>
          <p className="mb-5 text-2xl font-bold text-white">
            RM0
            <span className="text-sm font-normal text-[#94A3B8]">/month</span>
          </p>
          <div className="mb-6 flex-1">
            <PlanFeatureList />
          </div>
          <div className="mt-auto rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-[#94A3B8]">
            Current plan
          </div>
        </div>

        {/* Premium Monthly */}
        <div className="relative flex flex-col rounded-[2rem] border border-[#6366F1]/50 bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 p-6 backdrop-blur-2xl shadow-[0_0_48px_rgba(99,102,241,0.18)]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-1 text-[11px] font-bold text-white shadow-[0_4px_16px_rgba(99,102,241,0.5)]">
              <Star className="h-3 w-3" /> RECOMMENDED
            </span>
          </div>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <p className="font-display text-lg font-bold text-white">Premium</p>
          </div>
          <p className="mb-5 text-2xl font-bold text-white">
            RM9.90
            <span className="text-sm font-normal text-[#94A3B8]">/month</span>
          </p>
          <div className="mb-6 flex-1">
            <PlanFeatureList premium />
          </div>
          <UpgradeButton
            plan="monthly"
            label="Upgrade Now"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
          />
        </div>

        {/* Annual */}
        <div className="relative flex flex-col rounded-[2rem] border border-[#F59E0B]/40 bg-gradient-to-br from-[#F59E0B]/10 to-[#D97706]/10 p-6 backdrop-blur-2xl shadow-[0_0_48px_rgba(245,158,11,0.12)]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-4 py-1 text-[11px] font-bold text-white shadow-[0_4px_16px_rgba(245,158,11,0.4)]">
              🏆 BEST VALUE
            </span>
          </div>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xl">👑</span>
            <p className="font-display text-lg font-bold text-white">Annual</p>
          </div>
          <div className="mb-1">
            <p className="text-2xl font-bold text-white">
              RM79
              <span className="text-sm font-normal text-[#94A3B8]">/year</span>
            </p>
            <p className="text-[11px] text-[#F59E0B] font-semibold mt-0.5">
              Save RM39.80 vs monthly
            </p>
          </div>
          <div className="mb-6 mt-4 flex-1">
            <PlanFeatureList premium />
          </div>
          <UpgradeButton
            plan="annual"
            label="Get Annual Plan"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
          />
        </div>
      </div>

      {/* ── Cikgu AI spotlight ──────────────────────────────────────────── */}
      <div className="mx-auto mt-12 max-w-4xl">
        <div className="rounded-[2rem] border border-[#6366F1]/25 bg-gradient-to-br from-[#6366F1]/15 to-[#8B5CF6]/15 p-6 backdrop-blur-2xl sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-4xl"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
              👨‍🚀
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-display text-lg font-bold text-white">Cikgu AI</p>
                <Sparkles className="h-4 w-4 text-[#FBBF24]" />
                <span className="rounded-full bg-[#6366F1]/30 px-2 py-0.5 text-[10px] font-bold text-[#A78BFA]">PREMIUM</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Your personal AI tutor, available 24/7. Ask Cikgu AI anything — from explaining a tough Science concept to generating a personalised study plan before your exam. It knows the KSSM syllabus inside out so every answer is relevant to what you're actually studying.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:w-40">
              {[
                { icon: Bot, text: "Explain concepts" },
                { icon: Brain, text: "Generate quizzes" },
                { icon: TrendingUp, text: "Study plans" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/70">
                    <Icon className="h-3.5 w-3.5 text-[#A78BFA] shrink-0" />
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature highlights ──────────────────────────────────────────── */}
      <div className="mx-auto mt-12 max-w-4xl">
        <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
          What you unlock
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PREMIUM_FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className="flex items-start gap-4 rounded-[1.5rem] border border-white/[0.07] bg-[#0B1220]/62 p-5 backdrop-blur-2xl">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6366F1]/20 text-[#A78BFA]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">{f.label}</p>
                  <p className="mt-0.5 text-xs text-[#94A3B8]">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Trust section ───────────────────────────────────────────────── */}
      <div className="mx-auto mt-12 max-w-4xl">
        <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
          Our promise
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_BADGES.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.label} className="flex flex-col items-center gap-2 rounded-[1.5rem] border border-white/[0.07] bg-[#0B1220]/62 p-5 text-center backdrop-blur-2xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-white">{t.label}</p>
                <p className="text-[11px] text-[#94A3B8] leading-snug">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </AcademyPageShell>
  );
}
