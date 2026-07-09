import { Link } from "@tanstack/react-router";
import { Check, Crown, Sparkles, Zap, BarChart3, MessageCircle, ShieldCheck } from "lucide-react";

const CAPTAIN_PERKS = [
  { icon: MessageCircle, label: "Unlimited Cikgu AI tutor" },
  { icon: BarChart3, label: "Deep progress insights & weekly reports" },
  { icon: Zap, label: "Priority AI answers + faster mind maps" },
  { icon: ShieldCheck, label: "Parent Dashboard & family view" },
];

export function UpgradePanel() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-amber-300/20 bg-gradient-to-br from-[#12112a] via-[#0b1327] to-[#050b1a] p-8 md:p-10">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-400/20 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-[100px]" aria-hidden />

      <div className="relative grid gap-8 lg:grid-cols-[1.1fr,1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200">
            <Crown className="h-3.5 w-3.5" />
            Captain rank
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight text-white">
            Ready to take command of your mission,{" "}
            <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              Captain?
            </span>
          </h2>
          <p className="mt-3 max-w-lg text-slate-400">
            Cadets learn free. Captains unlock the full AcadeMY Brain — unlimited
            AI tutoring, mission analytics, and a parent flight-log so your
            family sees every win.
          </p>

          <ul className="mt-6 space-y-3">
            {CAPTAIN_PERKS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-3 text-sm text-slate-200">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300 ring-1 ring-amber-300/30">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/upgrade"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_18px_40px_-15px_rgba(251,191,36,0.9)] hover:brightness-110 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Become a Captain
            </Link>
            <span className="text-xs text-slate-500">
              7-day free trial · Cancel anytime
            </span>
          </div>
        </div>

        {/* Plans */}
        <div className="grid gap-4">
          <PlanCard
            name="Cadet"
            tag="Free forever"
            price="RM 0"
            perks={["All KSSM notes & mind maps", "Daily quizzes & flashcards", "5 Cikgu AI questions / day"]}
            ctaLabel="Continue as Cadet"
            ctaTo="/subjects"
            variant="ghost"
          />
          <PlanCard
            name="Captain"
            tag="Most popular"
            price="RM 19"
            priceSuffix="/mo"
            perks={["Everything in Cadet", "Unlimited Cikgu AI + priority", "Insights, reports & Parent view"]}
            ctaLabel="Upgrade now"
            ctaTo="/upgrade"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  name,
  tag,
  price,
  priceSuffix,
  perks,
  ctaLabel,
  ctaTo,
  variant,
}: {
  name: string;
  tag: string;
  price: string;
  priceSuffix?: string;
  perks: string[];
  ctaLabel: string;
  ctaTo: string;
  variant: "primary" | "ghost";
}) {
  const isPrimary = variant === "primary";
  return (
    <div
      className={
        "relative overflow-hidden rounded-2xl border p-5 " +
        (isPrimary
          ? "border-amber-300/40 bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-transparent shadow-[0_20px_60px_-30px_rgba(251,191,36,0.7)]"
          : "border-white/[0.08] bg-white/[0.02]")
      }
    >
      {isPrimary && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200 ring-1 ring-amber-300/40">
          {tag}
        </span>
      )}
      <div className="flex items-baseline gap-2">
        <h3 className="font-display text-lg font-bold text-white">{name}</h3>
        {!isPrimary && (
          <span className="text-[10px] uppercase tracking-wider text-slate-500">{tag}</span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-display text-3xl font-bold text-white">{price}</span>
        {priceSuffix && <span className="text-xs text-slate-400">{priceSuffix}</span>}
      </div>
      <ul className="mt-4 space-y-2">
        {perks.map((p) => (
          <li key={p} className="flex items-start gap-2 text-xs text-slate-300">
            <Check className={"mt-0.5 h-3.5 w-3.5 flex-shrink-0 " + (isPrimary ? "text-amber-300" : "text-cyan-300")} />
            {p}
          </li>
        ))}
      </ul>
      <Link
        to={ctaTo}
        className={
          "mt-5 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-xs font-semibold transition-all " +
          (isPrimary
            ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 hover:brightness-110"
            : "border border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.06]")
        }
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
