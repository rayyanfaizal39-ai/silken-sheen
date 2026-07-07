import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Lock, Orbit, Pencil, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import {
  COMPANION_STAGES,
  type CompanionId,
  type CompanionStageId,
  getCompanionDaysTogether,
  getCompanionStageForXp,
  useProgress,
} from "@/hooks/use-progress";
import {
  CompanionImage,
  getCompanionDisplayName,
  getCompanionMood,
  getCompanionMoodMessage,
  MOOD_EMOJI,
  MOOD_LABEL,
  useCompanionMessage,
} from "@/companion";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/companion")({
  component: CosmicCompanionPage,
  // Per-user gamification state — noindex, same as /dashboard.
  head: () => seoMeta({
    title: "Cosmic Companion",
    description: "Evolve your Cosmic Companion by earning XP on AcadeMY — a gamified KSSM study companion for Form 1-3 students.",
    path: "/companion",
    noindex: true,
  }),
});

// V1 ships Nova only. Future species (Luna, Terra, Comet, Nebula) get added
// here once their assets/personality picker land — nothing else needs to change.
const STARTERS: Array<{
  id: CompanionId;
  name: string;
  role: string;
  focus: string;
  accent: string;
}> = [
  {
    id: "nova",
    name: "Nova",
    role: "Explorer",
    focus: "Balanced growth",
    accent: "#8B5CF6",
  },
];

const STAGE_ART: Record<CompanionStageId, { tint: string }> = {
  egg: { tint: "#FDE68A" },
  blobling: { tint: "#7DD3FC" },
  sprout: { tint: "#34D399" },
  cadet: { tint: "#A78BFA" },
  guardian: { tint: "#F0ABFC" },
};

function CosmicCompanionPage() {
  const { progress, renameCompanion } = useProgress();
  const companion = progress.companion ?? { id: "nova" as CompanionId, level: 1 };
  const activeStarter = STARTERS.find((starter) => starter.id === companion.id) ?? STARTERS[0];
  const displayName = getCompanionDisplayName(companion);
  const dailyMessage = useCompanionMessage();

  // Stage is always derived from XP, so the artwork updates automatically as the student earns XP.
  const currentStageId = getCompanionStageForXp(progress.xp);
  const stageIndex = Math.max(0, COMPANION_STAGES.findIndex((stage) => stage.id === currentStageId));
  const currentStage = COMPANION_STAGES[stageIndex] ?? COMPANION_STAGES[0];
  const nextStage = COMPANION_STAGES[stageIndex + 1] ?? null;
  const stageStart = currentStage.xpRequired;
  const stageGoal = nextStage?.xpRequired ?? currentStage.xpRequired;
  const span = Math.max(1, stageGoal - stageStart);
  const progressPct = nextStage
    ? Math.max(0, Math.min(100, Math.round(((progress.xp - stageStart) / span) * 100)))
    : 100;
  const xpNeeded = nextStage ? Math.max(0, nextStage.xpRequired - progress.xp) : 0;

  const mood = getCompanionMood(progress, currentStageId);
  const moodMessage = getCompanionMoodMessage(mood, displayName);
  const daysTogether = progress.companion ? getCompanionDaysTogether(progress.companion) : 1;

  return (
    <main className="relative isolate overflow-hidden px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10">
      <CompanionBackdrop />

      <section className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0B1220]/70 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.55)] backdrop-blur-2xl sm:p-8">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35),transparent_65%)] blur-2xl" />
          <div className="pointer-events-none absolute -bottom-28 left-12 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_65%)] blur-2xl" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
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

            {/* Nova is the visual centerpiece — bigger display + daily message + mood */}
            <div className="relative min-h-[280px] overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.05] p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_34%)]" />
              <div className="relative flex flex-col items-center justify-center gap-3">
                <CompanionArtwork starter={activeStarter} stage={currentStage.id} size="large" />
                <p className="max-w-[260px] text-center text-sm font-bold leading-5 text-white/80">
                  "{dailyMessage}"
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.06] px-3 py-1 text-[11px] font-bold text-white/60">
                  {MOOD_EMOJI[mood]} {MOOD_LABEL[mood]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="rounded-[2rem] border border-white/[0.09] bg-[#0B1220]/68 p-5 backdrop-blur-2xl sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center">
              <div className="flex justify-center">
                <CompanionArtwork starter={activeStarter} stage={currentStage.id} size="hero" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/[0.1] bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-widest text-white/55">
                    Level {stageIndex + 1}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest text-[#050816]"
                    style={{ background: activeStarter.accent }}
                  >
                    {currentStage.name}
                  </span>
                </div>

                <CompanionNameEditor
                  displayName={displayName}
                  stageName={currentStage.name}
                  onRename={renameCompanion}
                />
                <p className="mt-2 text-sm text-white/50">
                  {activeStarter.role} companion · {activeStarter.focus}
                </p>
                <p className="mt-1 text-xs italic text-white/40">{moodMessage}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <MetricCard label="Current XP" value={progress.xp.toLocaleString()} />
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

                {nextStage ? (
                  <NextEvolutionPreview
                    speciesId={activeStarter.id}
                    nextStage={nextStage}
                    xpNeeded={xpNeeded}
                  />
                ) : (
                  <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-[#FBBF24]/35 bg-[#FBBF24]/10 p-4">
                    <p className="flex-1 text-sm font-black text-[#FDE68A]">
                      ✨ {displayName} reached Guardian — the final stage!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <StarterSelection activeId={companion.id} displayName={displayName} />
            <CompanionStatsCard
              displayName={displayName}
              stageName={currentStage.name}
              level={stageIndex + 1}
              xp={progress.xp}
              mood={mood}
              daysTogether={daysTogether}
            />
          </div>
        </section>

        <EvolutionPath activeStage={currentStage.id} xp={progress.xp} speciesId={activeStarter.id} />
      </section>
    </main>
  );
}

/** Inline rename control — first-time students keep "Nova", or pick their own name. */
function CompanionNameEditor({
  displayName,
  stageName,
  onRename,
}: {
  displayName: string;
  stageName: string;
  onRename: (name: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(displayName);

  function commit() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== displayName) onRename(trimmed);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="mt-4 flex items-center gap-2">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") {
              setDraft(displayName);
              setEditing(false);
            }
          }}
          maxLength={24}
          placeholder="Name your companion"
          className="font-display w-full max-w-[260px] rounded-xl border border-[#A78BFA]/40 bg-white/[0.06] px-3 py-2 text-2xl font-black text-white outline-none placeholder:text-white/30 focus:border-[#A78BFA]"
        />
        <button
          type="button"
          onClick={commit}
          className="shrink-0 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-3 py-2 text-xs font-bold text-white"
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setDraft(displayName);
        setEditing(true);
      }}
      className="group mt-4 flex items-center gap-2 text-left"
      aria-label="Rename companion"
    >
      <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
        {displayName} {stageName}
      </h2>
      <Pencil className="h-4 w-4 text-white/30 transition-colors group-hover:text-white/70" />
    </button>
  );
}

/** Visual preview of what the companion becomes next, so progress feels concrete. */
function NextEvolutionPreview({
  speciesId,
  nextStage,
  xpNeeded,
}: {
  speciesId: CompanionId;
  nextStage: { id: CompanionStageId; name: string; xpRequired: number };
  xpNeeded: number;
}) {
  return (
    <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[#22D3EE]/25 bg-[#22D3EE]/[0.06] p-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/[0.05]">
        <CompanionImage speciesId={speciesId} stage={nextStage.id} size={52} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#67E8F9]">
          Next Evolution
        </p>
        <p className="mt-0.5 font-display text-lg font-black text-white">{nextStage.name}</p>
        <p className="text-xs font-bold text-white/50">
          {xpNeeded.toLocaleString()} XP remaining
        </p>
      </div>
    </div>
  );
}

function CompanionStatsCard({
  displayName,
  stageName,
  level,
  xp,
  mood,
  daysTogether,
}: {
  displayName: string;
  stageName: string;
  level: number;
  xp: number;
  mood: ReturnType<typeof getCompanionMood>;
  daysTogether: number;
}) {
  return (
    <section className="rounded-[2rem] border border-white/[0.09] bg-[#0B1220]/68 p-5 backdrop-blur-2xl sm:p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#818CF8]">
        Companion Profile
      </p>
      <h2 className="mt-1 font-display text-2xl font-black text-white">{displayName}</h2>

      <dl className="mt-4 grid grid-cols-2 gap-2">
        <StatField label="Stage" value={stageName} />
        <StatField label="Level" value={`Level ${level}`} />
        <StatField label="XP" value={`${xp.toLocaleString()} XP`} />
        <StatField label="Mood" value={`${MOOD_EMOJI[mood]} ${MOOD_LABEL[mood]}`} />
      </dl>
      <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
        <p className="text-[9px] font-black uppercase tracking-widest text-white/30">
          Days Together
        </p>
        <p className="mt-0.5 text-sm font-bold text-white">
          {daysTogether} day{daysTogether !== 1 ? "s" : ""}
        </p>
      </div>
    </section>
  );
}

function StatField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
      <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{label}</p>
      <p className="mt-0.5 truncate text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function StarterSelection({
  activeId,
  displayName,
}: {
  activeId: CompanionId;
  displayName: string;
}) {
  return (
    <section className="rounded-[2rem] border border-white/[0.09] bg-[#0B1220]/68 p-5 backdrop-blur-2xl sm:p-6">
      <div className="mb-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#818CF8]">
          Starter Companion
        </p>
        <h2 className="mt-1 font-display text-2xl font-black text-white">Your Active Companion</h2>
      </div>

      <div className="space-y-3">
        {STARTERS.map((starter) => (
          <div
            key={starter.id}
            className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-transform hover:-translate-y-0.5 ${
              starter.id === activeId
                ? "border-[#F0ABFC]/45 bg-[#F0ABFC]/10"
                : "border-white/[0.08] bg-white/[0.04]"
            }`}
          >
            <CompanionMini starter={starter} />
            <div className="min-w-0 flex-1">
              <p className="font-black text-white">{starter.id === activeId ? displayName : starter.name}</p>
              <p className="text-xs text-white/45">
                {starter.role} · {starter.focus}
              </p>
            </div>
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] leading-5 text-white/35">
        More starter companions are on the way — for now, {displayName} is your guide through AcadeMY.
      </p>
    </section>
  );
}

function EvolutionPath({
  activeStage,
  xp,
  speciesId,
}: {
  activeStage: CompanionStageId;
  xp: number;
  speciesId: CompanionId;
}) {
  const activeIndex = Math.max(0, COMPANION_STAGES.findIndex((s) => s.id === activeStage));

  return (
    <section className="rounded-[2rem] border border-white/[0.09] bg-[#0B1220]/68 p-5 backdrop-blur-2xl sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#818CF8]">
            Evolution Journey
          </p>
          <h2 className="mt-1 font-display text-2xl font-black text-white">Growth Path</h2>
        </div>
        <p className="text-xs font-bold text-white/45">Powered by your existing XP</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {COMPANION_STAGES.map((stage, index) => {
          const active = index === activeIndex;
          const completed = index < activeIndex;
          const locked = index > activeIndex;
          return (
            <div
              key={stage.id}
              className={`relative overflow-hidden rounded-2xl border p-4 ${
                active
                  ? "border-[#A78BFA]/50 bg-[#A78BFA]/12 shadow-[0_0_36px_rgba(167,139,250,0.22)]"
                  : completed
                    ? "border-emerald-300/25 bg-emerald-400/[0.06]"
                    : "border-white/[0.07] bg-white/[0.035] opacity-70"
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
                {locked ? (
                  <Lock className="h-4 w-4 text-white/30" />
                ) : (
                  <CompanionImage speciesId={speciesId} stage={stage.id} size={48} />
                )}
              </div>
              <p className="font-black text-white">{stage.name}</p>
              <p className="mt-1 text-xs text-white/45">{stage.xpRequired.toLocaleString()} XP required</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold">
                {active ? (
                  <span className="text-[#C4B5FD]">Current stage</span>
                ) : completed ? (
                  <span className="flex items-center gap-1 text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-white/35">
                    <Lock className="h-3 w-3" /> Locked
                  </span>
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
  const dimension = size === "hero" ? 380 : 190;
  return (
    <div
      className="relative flex items-center justify-center animate-[companionFloat_4.6s_ease-in-out_infinite]"
      style={{ width: dimension, height: dimension }}
      aria-label={`${starter.name} — ${stage} stage`}
    >
      <div
        className="cosmic-companion-glow absolute inset-0 rounded-full opacity-65 blur-2xl"
        style={{ background: starter.accent }}
      />
      <div
        className="absolute inset-[11%] rounded-full border border-white/20"
        style={{ boxShadow: `0 0 50px ${starter.accent}70` }}
      />
      <div className="absolute inset-[4%] rounded-full border border-white/10 animate-[companionOrbit_6s_linear_infinite]" />
      <CompanionImage
        speciesId={starter.id}
        stage={stage}
        size={dimension * 0.95}
        className="relative z-10 drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
      />
      <span className="absolute left-[18%] top-[12%] h-2 w-2 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
      <span className="absolute bottom-[18%] right-[16%] h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
    </div>
  );
}

function CompanionMini({ starter }: { starter: (typeof STARTERS)[number] }) {
  return (
    <div
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
      style={{ boxShadow: `0 0 20px ${starter.accent}55` }}
    >
      <CompanionImage speciesId={starter.id} stage="egg" size={40} />
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
