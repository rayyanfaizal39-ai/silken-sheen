import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Baby,
  CheckCircle2,
  Egg,
  Leaf,
  Lock,
  Orbit,
  Rocket,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import type { CSSProperties } from "react";
import {
  COMPANION_STAGES,
  type CompanionId,
  type CompanionStageId,
  useProgress,
} from "@/hooks/use-progress";

export const Route = createFileRoute("/companion")({
  component: CosmicCompanionPage,
  head: () => ({
    meta: [{ title: "Cosmic Companion | AcadeMY" }],
  }),
});

const STARTERS: Array<{
  id: CompanionId;
  name: string;
  role: string;
  focus: string;
  colors: [string, string, string];
  accent: string;
  glyph: string;
}> = [
  {
    id: "nova",
    name: "Nova",
    role: "Explorer",
    focus: "Balanced growth",
    colors: ["#7DD3FC", "#6366F1", "#F0ABFC"],
    accent: "#8B5CF6",
    glyph: "N",
  },
  {
    id: "luna",
    name: "Luna",
    role: "Wisdom",
    focus: "Knowledge focused",
    colors: ["#E0F2FE", "#A78BFA", "#38BDF8"],
    accent: "#C084FC",
    glyph: "L",
  },
  {
    id: "terra",
    name: "Terra",
    role: "Discipline",
    focus: "Consistency focused",
    colors: ["#6EE7B7", "#10B981", "#FBBF24"],
    accent: "#34D399",
    glyph: "T",
  },
  {
    id: "comet",
    name: "Comet",
    role: "Fast learner",
    focus: "Speed focused",
    colors: ["#FDE68A", "#FB923C", "#F472B6"],
    accent: "#FB923C",
    glyph: "C",
  },
  {
    id: "nebula",
    name: "Nebula",
    role: "Creative thinker",
    focus: "Imagination focused",
    colors: ["#F0ABFC", "#8B5CF6", "#22D3EE"],
    accent: "#F0ABFC",
    glyph: "NB",
  },
];

const STAGE_ART: Record<CompanionStageId, { label: string; icon: typeof Egg; tint: string }> = {
  egg: { label: "🥚", icon: Egg, tint: "#FDE68A" },
  blobling: { label: "👶", icon: Baby, tint: "#7DD3FC" },
  sprout: { label: "🌱", icon: Leaf, tint: "#34D399" },
  cadet: { label: "🚀", icon: Rocket, tint: "#A78BFA" },
  guardian: { label: "🛡", icon: Shield, tint: "#F0ABFC" },
};

function CosmicCompanionPage() {
  const { progress, chooseCompanion, evolveCompanion } = useProgress();
  const activeStarter = STARTERS.find((starter) => starter.id === progress.companion?.id) ?? null;
  const stageIndex = Math.max(
    0,
    COMPANION_STAGES.findIndex((stage) => stage.id === (progress.companion?.stage ?? "egg")),
  );
  const currentStage = COMPANION_STAGES[stageIndex] ?? COMPANION_STAGES[0];
  const nextStage = COMPANION_STAGES[stageIndex + 1] ?? null;
  const stageStart = currentStage.xpRequired;
  const stageGoal = nextStage?.xpRequired ?? currentStage.xpRequired;
  const span = Math.max(1, stageGoal - stageStart);
  const progressPct = nextStage
    ? Math.max(0, Math.min(100, Math.round(((progress.xp - stageStart) / span) * 100)))
    : 100;
  const xpNeeded = nextStage ? Math.max(0, nextStage.xpRequired - progress.xp) : 0;
  const readyToEvolve = Boolean(progress.companion && nextStage && xpNeeded === 0);

  return (
    <main className="relative isolate overflow-hidden px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10">
      <CompanionBackdrop />

      <section className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0B1220]/70 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.55)] backdrop-blur-2xl sm:p-8">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35),transparent_65%)] blur-2xl" />
          <div className="pointer-events-none absolute -bottom-28 left-12 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_65%)] blur-2xl" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A78BFA]/30 bg-[#A78BFA]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#C4B5FD]">
                <Sparkles className="h-3.5 w-3.5" />
                Cosmic Companion
              </div>
              <h1 className="font-display text-4xl font-black leading-tight text-white sm:text-5xl">
                Meet Your Cosmic Companion
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                Study, earn XP, hatch your egg, and evolve your Cosmic Companion as you learn.
              </p>
            </div>

            <div className="relative min-h-[190px] overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.05] p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_34%)]" />
              <div className="relative flex items-center justify-center">
                <CompanionArtwork
                  starter={activeStarter ?? STARTERS[0]}
                  stage={currentStage.id}
                  size="large"
                />
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="rounded-[2rem] border border-white/[0.09] bg-[#0B1220]/68 p-5 backdrop-blur-2xl sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
              <div className="flex justify-center">
                <CompanionArtwork
                  starter={activeStarter ?? STARTERS[0]}
                  stage={currentStage.id}
                  size="hero"
                />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/[0.1] bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-widest text-white/55">
                    Level {progress.companion?.level ?? 1}
                  </span>
                  <span className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest text-[#050816]" style={{ background: activeStarter?.accent ?? "#A78BFA" }}>
                    {currentStage.name}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">
                  {activeStarter ? `${activeStarter.name} ${currentStage.name}` : "Choose Your Egg"}
                </h2>
                <p className="mt-2 text-sm text-white/50">
                  {activeStarter
                    ? `${activeStarter.role} companion · ${activeStarter.focus}`
                    : "Select one starter companion to begin your journey."}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <MetricCard label="Current XP" value={progress.xp.toLocaleString()} />
                  <MetricCard label="Next Evolution" value={nextStage?.name ?? "Complete"} />
                  <MetricCard label="XP Needed" value={xpNeeded.toLocaleString()} />
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between gap-3 text-xs font-bold text-white/55">
                    <span>{progress.xp.toLocaleString()} XP</span>
                    <span>{nextStage ? `${nextStage.xpRequired.toLocaleString()} XP` : "Max stage"}</span>
                  </div>
                  <div className="relative h-4 overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.07]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] via-[#A78BFA] to-[#F0ABFC] shadow-[0_0_24px_rgba(167,139,250,0.7)] transition-all duration-700"
                      style={{ width: `${progressPct}%` }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] opacity-60" />
                  </div>
                </div>

                {readyToEvolve ? (
                  <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-[#FBBF24]/35 bg-[#FBBF24]/10 p-4">
                    <p className="flex-1 text-sm font-black text-[#FDE68A]">✨ Ready to Hatch!</p>
                    <button
                      type="button"
                      onClick={() => evolveCompanion()}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FBBF24] to-[#FB7185] px-5 py-2.5 text-sm font-black text-[#050816] shadow-[0_12px_36px_rgba(251,191,36,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
                    >
                      Hatch / Evolve <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <StarterSelection
            activeId={progress.companion?.id}
            onChoose={(id) => chooseCompanion(id)}
          />
        </section>

        <EvolutionPath activeStage={currentStage.id} xp={progress.xp} />
      </section>
    </main>
  );
}

function StarterSelection({
  activeId,
  onChoose,
}: {
  activeId?: CompanionId;
  onChoose: (id: CompanionId) => void;
}) {
  return (
    <section className="rounded-[2rem] border border-white/[0.09] bg-[#0B1220]/68 p-5 backdrop-blur-2xl sm:p-6">
      <div className="mb-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#818CF8]">
          Starter Companion
        </p>
        <h2 className="mt-1 font-display text-2xl font-black text-white">
          {activeId ? "Your Active Companion" : "Choose One Starter"}
        </h2>
      </div>

      <div className="space-y-3">
        {STARTERS.map((starter) => {
          const active = starter.id === activeId;
          const locked = Boolean(activeId && !active);
          return (
            <button
              key={starter.id}
              type="button"
              disabled={Boolean(activeId)}
              onClick={() => onChoose(starter.id)}
              className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                active
                  ? "border-[#F0ABFC]/45 bg-[#F0ABFC]/10"
                  : "border-white/[0.08] bg-white/[0.04] hover:-translate-y-0.5 hover:bg-white/[0.07]"
              } ${locked ? "opacity-45" : ""}`}
            >
              <CompanionMini starter={starter} />
              <div className="min-w-0 flex-1">
                <p className="font-black text-white">{starter.name}</p>
                <p className="text-xs text-white/45">
                  {starter.role} · {starter.focus}
                </p>
              </div>
              {active ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
              ) : locked ? (
                <Lock className="h-4 w-4 shrink-0 text-white/30" />
              ) : (
                <ArrowRight className="h-4 w-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function EvolutionPath({ activeStage, xp }: { activeStage: CompanionStageId; xp: number }) {
  return (
    <section className="rounded-[2rem] border border-white/[0.09] bg-[#0B1220]/68 p-5 backdrop-blur-2xl sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#818CF8]">
            Evolution System
          </p>
          <h2 className="mt-1 font-display text-2xl font-black text-white">Growth Path</h2>
        </div>
        <p className="text-xs font-bold text-white/45">Powered by your existing XP</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {COMPANION_STAGES.map((stage, index) => {
          const active = stage.id === activeStage;
          const unlocked = xp >= stage.xpRequired;
          const StageIcon = STAGE_ART[stage.id].icon;
          return (
            <div
              key={stage.id}
              className={`relative overflow-hidden rounded-2xl border p-4 ${
                active
                  ? "border-[#A78BFA]/50 bg-[#A78BFA]/12 shadow-[0_0_36px_rgba(167,139,250,0.22)]"
                  : unlocked
                    ? "border-emerald-300/25 bg-emerald-400/[0.06]"
                    : "border-white/[0.07] bg-white/[0.035]"
              }`}
            >
              {index < COMPANION_STAGES.length - 1 && (
                <div className="pointer-events-none absolute right-3 top-1/2 hidden h-px w-10 bg-gradient-to-r from-white/20 to-transparent lg:block" />
              )}
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background: `${STAGE_ART[stage.id].tint}22`,
                  boxShadow: active ? `0 0 28px ${STAGE_ART[stage.id].tint}55` : undefined,
                }}
              >
                <StageIcon className="h-5 w-5" style={{ color: STAGE_ART[stage.id].tint }} />
              </div>
              <p className="font-black text-white">{stage.name}</p>
              <p className="mt-1 text-xs text-white/45">{stage.xpRequired.toLocaleString()} XP</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold">
                {active ? (
                  <span className="text-[#C4B5FD]">Current stage</span>
                ) : unlocked ? (
                  <span className="text-emerald-300">Unlocked</span>
                ) : (
                  <span className="text-white/35">Locked</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CompanionArtwork({
  starter,
  stage,
  size,
}: {
  starter: (typeof STARTERS)[number];
  stage: CompanionStageId;
  size: "large" | "hero";
}) {
  const dimension = size === "hero" ? 220 : 150;
  const stageArt = STAGE_ART[stage];
  return (
    <div
      className="relative animate-[companionFloat_4.6s_ease-in-out_infinite]"
      style={{ width: dimension, height: dimension } as CSSProperties}
      aria-label={`${starter.name} ${stageArt.label}`}
    >
      <div
        className="absolute inset-0 rounded-full opacity-65 blur-2xl"
        style={{ background: starter.accent }}
      />
      <div
        className="absolute inset-[11%] rounded-full border border-white/20"
        style={{ boxShadow: `0 0 50px ${starter.accent}70` }}
      />
      <div className="absolute inset-[4%] rounded-full border border-white/10 animate-[companionOrbit_6s_linear_infinite]" />
      <div
        className="absolute inset-[18%] flex items-center justify-center rounded-full text-5xl font-black text-white shadow-2xl"
        style={{
          background: `radial-gradient(circle at 32% 24%, rgba(255,255,255,0.88), ${starter.colors[0]} 18%, ${starter.colors[1]} 58%, ${starter.colors[2]} 100%)`,
          boxShadow: `inset -18px -22px 34px rgba(5,8,22,0.34), inset 12px 12px 22px rgba(255,255,255,0.22), 0 0 42px ${starter.accent}80`,
        }}
      >
        <span className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]">{stageArt.label}</span>
      </div>
      <span className="absolute left-[18%] top-[12%] h-2 w-2 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
      <span className="absolute bottom-[18%] right-[16%] h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      <span className="absolute right-[25%] top-[20%] rounded-full bg-white/90 px-2 py-1 text-xs font-black text-[#050816]">
        {starter.glyph}
      </span>
    </div>
  );
}

function CompanionMini({ starter }: { starter: (typeof STARTERS)[number] }) {
  return (
    <div
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white"
      style={{
        background: `radial-gradient(circle at 30% 24%, rgba(255,255,255,0.85), ${starter.colors[0]} 20%, ${starter.colors[1]} 66%, ${starter.colors[2]})`,
        boxShadow: `0 0 20px ${starter.accent}55`,
      }}
    >
      {starter.glyph}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">{label}</p>
      <p className="mt-1 truncate text-lg font-black text-white">{value}</p>
    </div>
  );
}

function CompanionBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_5%,rgba(139,92,246,0.25),transparent_30%),radial-gradient(circle_at_88%_20%,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_50%_95%,rgba(244,114,182,0.12),transparent_32%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:38px_38px]" />
      <Star className="absolute left-[8%] top-[16%] h-3 w-3 animate-pulse text-white/60" />
      <Orbit className="absolute right-[12%] top-[34%] h-5 w-5 animate-pulse text-[#A78BFA]/50 [animation-delay:900ms]" />
      <Sparkles className="absolute bottom-[15%] left-[20%] h-4 w-4 animate-pulse text-[#F0ABFC]/50 [animation-delay:1500ms]" />
    </div>
  );
}
