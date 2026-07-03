import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Library,
  NotebookTabs,
  PlayCircle,
  Compass,
  Zap,
  Flame,
  RotateCcw,
  Bell,
  Radar,
  Users,
  Target,
  Sparkles,
  TrendingUp,
  Rocket,
  Trophy,
  GraduationCap,
  LogIn,
  ShieldCheck,
  NotebookPen,
  BrainCircuit,
  Layers,
  LineChart,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useMemo, type CSSProperties } from "react";
import { AstronautScene } from "@/components/AstronautScene";
import heroGraduates from "@/assets/hero-graduates.png.asset.json";
import { useSignInModal } from "@/context/sign-in-modal";
import { Avatar } from "@/components/Avatar";
import {
  useProgress,
  COMPANION_STAGES,
  getCompanionStageForXp,
  getRank,
  getNextRank,
  getRankProgress,
  getChessRating,
  getDueCount,
  getMasteredCount,
  DAILY_MISSIONS,
  type LastVisited,
} from "@/hooks/use-progress";
import { CompanionImage, getCompanionDisplayName, useCompanionMessage } from "@/companion";
import { analyzeProgress } from "@/lib/tracker";
import { buildLeaderboard } from "@/lib/leaderboard";
import { SubjectWorldArt } from "@/components/SubjectWorldArt";
import { getSubjectFormStats } from "@/content/registry";
import { NextMissionCard } from "@/components/NextMissionCard";

// ─── World portal definitions ─────────────────────────────────────────────────

const WORLD_PORTALS = [
  {
    id: "science" as const,
    worldName: "Science Frontier",
    eyebrow: "Research Station",
    icon: "🧪",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.55)",
    ctaLabel: "Enter Lab",
    symbols: ["⚛", "🔬", "⚗", "🧫"],
  },
  {
    id: "math" as const,
    worldName: "Mathematics Galaxy",
    eyebrow: "Mission Control",
    icon: "🧮",
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.55)",
    ctaLabel: "Launch Mission",
    symbols: ["π", "∑", "∞", "√"],
  },
  {
    id: "english" as const,
    worldName: "English Realm",
    eyebrow: "Literary District",
    icon: "📖",
    color: "#C084FC",
    glow: "rgba(192,132,252,0.55)",
    ctaLabel: "Open the Book",
    symbols: ["A", "❝", "B", "Z"],
  },
  {
    id: "geography" as const,
    worldName: "Geography Expedition",
    eyebrow: "Exploration Base",
    icon: "🌍",
    color: "#34D399",
    glow: "rgba(52,211,153,0.55)",
    ctaLabel: "Start Expedition",
    symbols: ["🧭", "N", "S", "E"],
  },
  {
    id: "sejarah" as const,
    worldName: "Sejarah Chronicles",
    eyebrow: "History Archives",
    icon: "🏛️",
    color: "#FB923C",
    glow: "rgba(251,146,60,0.55)",
    ctaLabel: "Enter the Era",
    symbols: ["⏳", "📜", "⚔", "🏛"],
  },
  {
    id: "bm" as const,
    worldName: "Nusantara Realm",
    eyebrow: "Dewan Sastera",
    icon: "📝",
    color: "#F472B6",
    glow: "rgba(244,114,182,0.55)",
    ctaLabel: "Masuk Dunia",
    symbols: ["ا", "بـم", "ث", "ج"],
  },
] as const;

type WorldPortal = (typeof WORLD_PORTALS)[number];

// ─── Quick access tiles ───────────────────────────────────────────────────────
const QUICK_ACCESS = [
  {
    title: "Notes",
    description: "Smart KSSM chapter summaries",
    to: "/notes" as const,
    icon: NotebookTabs,
    color: "#3B82F6",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    title: "Flashcards",
    description: "Active recall with spaced repetition",
    to: "/flashcards" as const,
    icon: Library,
    color: "#8B5CF6",
    gradient: "from-purple-500/20 to-violet-500/20",
  },
  {
    title: "Quizzes",
    description: "Instant feedback, XP rewards",
    to: "/quizzes" as const,
    icon: Brain,
    color: "#F59E0B",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Mind Maps",
    description: "Visual concept connections",
    to: "/notes" as const,
    icon: Compass,
    color: "#10B981",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Videos",
    description: "Chapter by chapter walkthroughs",
    to: "/notes" as const,
    icon: PlayCircle,
    color: "#EC4899",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
] as const;

// ─── Feature highlights ───────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Radar,
    color: "#22D3EE",
    title: "AI Study Tracker",
    desc: "Watches every quiz and pinpoints your weak chapters — so study time goes where it counts.",
    badge: "New",
  },
  {
    icon: Brain,
    color: "#F59E0B",
    title: "Smart Quizzes",
    desc: "XP rewards, streaks, combo multipliers, and instant explanations for every question.",
    badge: null,
  },
  {
    icon: Sparkles,
    color: "#34D399",
    title: "Spaced Repetition",
    desc: "Science-backed flashcards scheduled exactly when you're about to forget.",
    badge: null,
  },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TYPE_ROUTES = { notes: "/notes", flashcards: "/flashcards", quiz: "/quizzes" } as const;
const TYPE_ICONS: Record<string, string> = { notes: "📖", flashcards: "🃏", quiz: "🧠" };
const TYPE_LABELS: Record<string, string> = {
  notes: "Notes",
  flashcards: "Flashcards",
  quiz: "Quiz",
};

function timeAgo(ts: number) {
  const h = Math.floor((Date.now() - ts) / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function useStreakUrgent(lastActive: string, streak: number) {
  return (
    streak > 0 &&
    lastActive !== new Date().toISOString().slice(0, 10) &&
    new Date().getHours() >= 15
  );
}

// ─── World Portal Card ────────────────────────────────────────────────────────

function WorldPortalCard({
  world,
  isCurrentWorld,
}: {
  world: WorldPortal;
  isCurrentWorld: boolean;
}) {
  const formStats = getSubjectFormStats(world.id);
  return (
    <Link
      to="/notes"
      search={{ subject: world.id, form: 1 } as Record<string, unknown>}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border transition-all duration-300 hover:-translate-y-1.5"
      style={
        {
          borderColor: `${world.color}28`,
          background: `linear-gradient(135deg, ${world.color}14 0%, ${world.color}07 60%, transparent 100%)`,
          boxShadow: `0 4px 24px ${world.color}1e`,
        } as CSSProperties
      }
    >
      {/* Hover atmosphere ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 70px ${world.color}1a, 0 12px 50px ${world.color}40` }}
      />

      {/* World illustration strip — the subject's real shape, not an emoji */}
      <div
        className="relative h-20 w-full shrink-0 overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${world.color}1c, transparent)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <SubjectWorldArt subjectId={world.id} color={world.color} width={240} height={80} />
        </div>
        {isCurrentWorld && (
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-widest"
            style={{ background: `${world.color}30`, color: world.color }}
          >
            ● Current Mission
          </span>
        )}
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5 pt-3">
        <p
          className="text-[9px] font-black uppercase tracking-[0.18em]"
          style={{ color: world.color, opacity: 0.65 }}
        >
          {world.eyebrow}
        </p>
        <h3 className="mt-0.5 truncate font-display text-base font-black leading-tight text-white">
          {world.worldName}
        </h3>

        {/* Form 1/2/3 coverage — real per-form chapter counts, so the card
            never implies the subject is just one form deep */}
        <div className="mt-3 flex items-stretch gap-1">
          {formStats.map((stat) => {
            const ready = stat.chapterCount > 0;
            return (
              <div
                key={stat.form}
                className="flex-1 rounded-md px-1 py-1 text-center"
                style={{
                  background: ready ? `${world.color}16` : "rgba(255,255,255,0.04)",
                }}
              >
                <span
                  className="block text-[9px] font-bold leading-tight"
                  style={{ color: ready ? world.color : "rgba(255,255,255,0.35)" }}
                >
                  {stat.form.replace("Form ", "F")}
                </span>
                <span className="block text-[9px] font-semibold leading-tight text-white/50">
                  {ready ? `${stat.chapterCount} Ch` : "Soon"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Enter CTA */}
        <div className="mt-2 flex items-center justify-end">
          <span
            className="flex translate-x-[-4px] items-center gap-1 text-[11px] font-bold opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            style={{ color: world.color }}
          >
            {world.ctaLabel}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Bottom atmosphere line */}
        <div
          className="mt-3.5 h-px w-full opacity-20 transition-opacity duration-300 group-hover:opacity-60"
          style={{
            background: `linear-gradient(to right, transparent, ${world.color}, transparent)`,
          }}
        />
      </div>
    </Link>
  );
}

// ─── Universe section header ──────────────────────────────────────────────────

function UniverseHeader() {
  return (
    <div className="mb-6">
      {/* Constellation dot-line decoration */}
      <div className="pointer-events-none mb-4 flex items-center gap-2" aria-hidden>
        {WORLD_PORTALS.map((w, i) => (
          <span key={w.id} className="flex items-center gap-2">
            <span
              className="block h-2 w-2 rounded-full"
              style={{ background: w.color, boxShadow: `0 0 8px ${w.color}b3` }}
            />
            {i < WORLD_PORTALS.length - 1 && (
              <span className="block h-px w-4 rounded-full bg-white/10" />
            )}
          </span>
        ))}
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#6366F1]">
            ✦ Explore
          </p>
          <h2 className="font-display text-2xl font-bold text-white">Academy Universe</h2>
          <p className="mt-1 text-sm text-white/40">
            Six worlds. Choose your destination and begin.
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-center">
          <p className="text-xl font-black tabular-nums text-white">
            6 <span className="text-sm font-bold text-white/30">Worlds</span>
          </p>
          <p className="text-[8px] font-bold uppercase tracking-widest text-white/25">
            KSSM Form 1
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Hero world mini-strip ────────────────────────────────────────────────────

function HeroWorldStrip() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      <span className="mr-1 hidden self-center text-[9px] font-black uppercase tracking-[0.22em] text-white/20 sm:block">
        6 Worlds
      </span>
      {WORLD_PORTALS.map((w) => (
        <Link
          key={w.id}
          to="/notes"
          search={{ subject: w.id, form: 1 } as Record<string, unknown>}
          className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold backdrop-blur-xl transition-all duration-200 hover:scale-[1.06]"
          style={
            {
              borderColor: `${w.color}35`,
              background: `${w.color}14`,
              color: w.color,
            } as CSSProperties
          }
        >
          <span className="text-sm leading-none">{w.icon}</span>
          <span className="font-black">
            {w.id === "bm" ? "BM" : w.id.charAt(0).toUpperCase() + w.id.slice(1)}
          </span>
        </Link>
      ))}
    </div>
  );
}

// ─── Rank progression card (desktop hero overlay) ────────────────────────────

function HeroRankCard() {
  const { progress } = useProgress();
  const rank = getRank(progress.xp);
  const nextRank = getNextRank(progress.xp);
  const rankPct = getRankProgress(progress.xp);

  return (
    <div className="hero-rank-card pointer-events-auto absolute bottom-24 right-4 z-30 hidden w-56 md:right-8 md:block lg:bottom-28 lg:right-12">
      <div className="rounded-[1.5rem] border border-white/[0.12] bg-[#050816]/80 p-4 shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
              style={{ background: `${rank.color}1A`, boxShadow: `0 0 16px ${rank.color}55` }}
            >
              {rank.emoji}
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30">
                Your Rank
              </p>
              <p className="text-sm font-bold leading-tight" style={{ color: rank.color }}>
                {rank.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-2 py-1">
            <Zap className="h-3 w-3 text-yellow-400" />
            <span className="text-[11px] font-bold text-yellow-300">
              {getChessRating(progress.xp).toLocaleString()}
            </span>
          </div>
        </div>

        {nextRank ? (
          <>
            <div className="mb-1 flex justify-between text-[9px] text-white/25">
              <span>{rankPct}% to next</span>
              <span>{nextRank.minXp.toLocaleString()} XP</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="hero-rank-bar-fill h-full rounded-full"
                style={
                  {
                    width: `${rankPct}%`,
                    "--bar-from": rank.color,
                    "--bar-to": nextRank.color,
                  } as CSSProperties
                }
              />
            </div>
            <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.04] p-2">
              <span className="text-base">{nextRank.emoji}</span>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/25">
                  Next Rank
                </p>
                <p className="text-xs font-bold text-white">{nextRank.name}</p>
              </div>
              <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-white/20" />
            </div>
          </>
        ) : (
          <p className="mt-2 text-center text-[10px] font-bold text-white/30">
            ✨ Maximum rank achieved
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function HomeDashboard() {
  const { progress } = useProgress();
  const { user, isConfigured } = useAuth();
  const { open: openSignIn } = useSignInModal();
  const rank = getRank(progress.xp);
  const streakUrgent = useStreakUrgent(progress.lastActive, progress.streak);
  const dueCount = getDueCount(progress.cardMastery);
  const masteredCount = getMasteredCount(progress.cardMastery);
  const hasProgress = progress.xp > 0 || !!progress.lastVisited;
  const insight = useMemo(
    () => analyzeProgress(progress.quizHistory ?? []),
    [progress.quizHistory],
  );
  const topWeakSpot = insight.weakSpots[0] ?? null;
  const board = useMemo(() => buildLeaderboard(progress), [progress]);
  const myRank = board.currentUser?.rank ?? null;
  const scholarshipEligible = board.currentUser?.scholarshipEligible ?? false;
  const mission = progress.missions;
  const missionState = DAILY_MISSIONS.map((m) => ({
    ...m,
    done: mission ? Math.min(m.current(mission), m.target) : 0,
  }));
  const missionsComplete = missionState.reduce((n, m) => n + (m.done >= m.target ? 1 : 0), 0);
  const companionStageIndex = Math.max(
    0,
    COMPANION_STAGES.findIndex((stage) => stage.id === getCompanionStageForXp(progress.xp)),
  );
  const companionStage = COMPANION_STAGES[companionStageIndex] ?? COMPANION_STAGES[0];
  const nextCompanionStage = COMPANION_STAGES[companionStageIndex + 1] ?? null;
  const companionName = progress.companion ? getCompanionDisplayName(progress.companion) : "Nova";
  const companionDailyMessage = useCompanionMessage();

  return (
    <section className="px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10 space-y-6">
      {/* ════════════════════════════════════════════════════════════
          HERO — Universe gateway
          ════════════════════════════════════════════════════════════ */}
      <div className="hero-section relative isolate -mx-4 -mt-6 overflow-hidden px-4 pb-20 pt-10 sm:-mx-6 sm:px-6 md:pb-24 md:pt-14 lg:-mx-8 lg:min-h-[820px] lg:px-8">
        {/* Hero image — KSSM graduates */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-[62%] lg:block" aria-hidden>
          <img
            src={heroGraduates.url}
            alt=""
            className="absolute bottom-0 right-0 h-full w-auto max-w-none object-contain object-bottom"
            style={{
              filter: "drop-shadow(0 30px 60px rgba(99,102,241,0.35))",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 90% at 70% 60%, #000 55%, transparent 88%)",
              maskImage:
                "radial-gradient(ellipse 90% 90% at 70% 60%, #000 55%, transparent 88%)",
            }}
          />
        </div>
        {/* Mobile hero image */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex justify-center lg:hidden" aria-hidden>
          <img
            src={heroGraduates.url}
            alt=""
            className="h-[380px] w-auto max-w-none object-contain object-bottom opacity-90"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 85% at 50% 65%, #000 55%, transparent 88%)",
              maskImage:
                "radial-gradient(ellipse 80% 85% at 50% 65%, #000 55%, transparent 88%)",
            }}
          />
        </div>

        {/* Nebula orbs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-[20%] top-[0%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.48),transparent_55%)] blur-3xl" />
          <div className="absolute left-[8%] top-[30%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.32),transparent_58%)] blur-3xl" />
          <div className="absolute right-[-5%] top-[-8%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_58%)] blur-3xl" />
          <div className="absolute left-[30%] bottom-[-8%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.16),transparent_62%)] blur-3xl" />
          <div className="absolute left-[3%] top-[15%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.11),transparent_65%)] blur-2xl" />
        </div>

        {/* Left atmosphere veil — keeps text readable */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 82% at 18% 50%, rgba(5,8,22,0.92) 0%, rgba(5,8,22,0.74) 30%, rgba(5,8,22,0.38) 55%, rgba(5,8,22,0.10) 72%, transparent 86%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050816] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050816]/35 to-transparent"
          aria-hidden
        />

        {/* Star accent particles */}
        <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
          <span className="absolute left-[8%]  top-[24%] h-[6px] w-[6px] rounded-full bg-white/90 shadow-[0_0_18px_6px_rgba(167,139,250,1)]   animate-pulse" />
          <span className="absolute left-[22%] top-[64%] h-[5px] w-[5px] rounded-full bg-white/80 shadow-[0_0_14px_4px_rgba(99,102,241,0.9)]  animate-pulse [animation-delay:700ms]" />
          <span className="absolute left-[40%] top-[32%] h-[4px] w-[4px] rounded-full bg-white/75 shadow-[0_0_14px_5px_rgba(244,114,182,0.88)] animate-pulse [animation-delay:1100ms]" />
          <span className="absolute left-[46%] top-[68%] h-[3px] w-[3px] rounded-full bg-white/65 shadow-[0_0_12px_4px_rgba(59,130,246,0.9)]  animate-pulse [animation-delay:1900ms]" />
          <span className="absolute left-[60%] top-[18%] h-[4px] w-[4px] rounded-full bg-white/90 shadow-[0_0_16px_5px_rgba(255,255,255,0.75)] animate-pulse [animation-delay:850ms]" />
          <span className="absolute left-[72%] top-[55%] h-[3px] w-[3px] rounded-full bg-white/70 shadow-[0_0_12px_3px_rgba(250,204,21,0.65)]  animate-pulse [animation-delay:350ms]" />
          <span className="absolute left-[82%] top-[30%] h-[2px] w-[2px] rounded-full bg-white/55 shadow-[0_0_8px_3px_rgba(99,102,241,0.7)]   animate-pulse [animation-delay:2200ms]" />
        </div>

        {/* ── Headline + CTAs + World strip ───────────────────────── */}
        <div className="hero-copy-arrive relative z-20 flex min-h-[640px] flex-col justify-center lg:min-h-[820px]">
          <div className="relative max-w-[560px]">
            {/* Subtle text-zone backing */}
            <div
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem]"
              style={{
                background:
                  "radial-gradient(ellipse at 38% 50%, rgba(5,8,22,0.60) 0%, rgba(5,8,22,0.28) 50%, transparent 78%)",
                filter: "blur(20px)",
              }}
            />


            {/* Universe eyebrow */}
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#818CF8]/60">
              ✦ ACADEMY UNIVERSE ✦
            </p>

            {/* Universe-first headline */}
            <h1
              className="font-display font-extrabold leading-[0.93] tracking-tight text-white"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
                textShadow:
                  "0 0 60px rgba(99,102,241,0.5), 0 0 120px rgba(139,92,246,0.25), 0 2px 4px rgba(0,0,0,0.7)",
              }}
            >
              <span className="block">Choose Your</span>
              <span
                className="mt-1 block bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent"
                style={{ filter: "drop-shadow(0 0 30px rgba(167,139,250,0.6))" }}
              >
                World.
              </span>
              <span className="mt-1 block text-white/90">
                Begin Your{" "}
                <span
                  className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent"
                  style={{ filter: "drop-shadow(0 0 22px rgba(251,191,36,0.55))" }}
                >
                  Mission.
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-[420px] text-sm leading-[1.9] text-white/50">
              Six learning worlds. One universe. Complete KSSM Form 1 through notes, flashcards,
              quizzes, mind maps, and AI tutoring — all in one place.
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/notes"
                className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_48px_-8px_rgba(99,102,241,0.70)] transition-all hover:scale-[1.04] hover:shadow-[0_20px_60px_-8px_rgba(99,102,241,0.85)] active:scale-[0.98]"
              >
                🚀 Enter the Universe
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              {hasProgress ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.15] bg-white/[0.07] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-all hover:bg-white/[0.12] hover:border-white/[0.25]"
                >
                  <TrendingUp className="h-4 w-4" />
                  Continue Journey
                </Link>
              ) : (
                <Link
                  to="/subjects"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.15] bg-white/[0.07] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-all hover:bg-white/[0.12] hover:border-white/[0.25]"
                >
                  🌍 Explore Worlds
                </Link>
              )}

              {isConfigured && !user && (
                <button
                  type="button"
                  onClick={openSignIn}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/[0.15] bg-white/[0.07] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-[#8B5CF6]/50 hover:bg-white/[0.12] hover:shadow-[0_16px_48px_-8px_rgba(139,92,246,0.55)] active:scale-[0.98]"
                >
                  <LogIn className="h-4 w-4" />
                  Sign in to sync progress
                </button>
              )}
            </div>

            {/* World portal mini-strip */}
            <HeroWorldStrip />
          </div>
        </div>

        {/* Live streak chip */}
        {progress.streak > 0 && (
          <div className="pointer-events-none absolute right-5 top-10 z-30 hidden items-center gap-2.5 rounded-2xl border border-orange-500/30 bg-[#0F0805]/72 p-2.5 shadow-[0_4px_28px_rgba(249,115,22,0.24)] backdrop-blur-2xl md:right-8 md:flex lg:right-12">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/20">
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-orange-300/60">
                Streak
              </p>
              <p className="text-sm font-extrabold text-white">{progress.streak}d 🔥</p>
            </div>
          </div>
        )}

        {/* Rank progression card */}
        <HeroRankCard />
      </div>

      {/* ── ABOUT ACADEMY — visible to every visitor, signed in or not ─── */}
      <section
        aria-labelledby="about-academy-heading"
        className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6"
      >
        <h2 id="about-academy-heading" className="font-display text-lg font-bold text-white sm:text-xl">
          What is AcadeMY?
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/60">
          AcadeMY is a free educational platform built for Malaysian KSSM students in Form 1–3.
          Here, students can:
        </p>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          <li className="flex items-center gap-2.5 text-sm text-white/70">
            <NotebookPen className="h-4 w-4 shrink-0 text-[#60A5FA]" /> Study interactive, KSSM-aligned notes
          </li>
          <li className="flex items-center gap-2.5 text-sm text-white/70">
            <BrainCircuit className="h-4 w-4 shrink-0 text-[#FBBF24]" /> Complete quizzes with instant feedback
          </li>
          <li className="flex items-center gap-2.5 text-sm text-white/70">
            <Layers className="h-4 w-4 shrink-0 text-[#A855F7]" /> Review flashcards with spaced repetition
          </li>
          <li className="flex items-center gap-2.5 text-sm text-white/70">
            <LineChart className="h-4 w-4 shrink-0 text-[#34D399]" /> Track learning progress, XP, and streaks
          </li>
        </ul>
        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#818CF8]" />
          <p className="text-xs leading-6 text-white/50">
            Students can optionally sign in with Google to securely save their learning progress
            and sync it across devices. We use Google Sign-In only to authenticate your account
            and save your progress — we do not request unnecessary Google data. See our{" "}
            <a href="/privacy" className="text-white/75 underline underline-offset-2 hover:text-white">
              Privacy Policy
            </a>{" "}
            for details.
          </p>
        </div>
      </section>

      {/* ── NEXT MISSION ──────────────────────────────────────────────── */}
      <NextMissionCard />

      {/* ── RESUME BANNER ─────────────────────────────────────────────── */}
      {progress.lastVisited && <ResumeBanner lastVisited={progress.lastVisited} />}

      {/* ── STREAK URGENCY ────────────────────────────────────────────── */}
      {streakUrgent && (
        <Link
          to="/flashcards"
          className="flex items-center gap-4 rounded-[2rem] border border-orange-500/30 bg-orange-500/10 px-5 py-4 backdrop-blur-2xl transition-all hover:border-orange-500/50 hover:bg-orange-500/15"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500/20">
            <Bell className="h-5 w-5 text-orange-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-orange-200">
              Don't break your {progress.streak}-day streak! 🔥
            </p>
            <p className="text-sm text-orange-300/70">
              Study any chapter before midnight to keep it alive.
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-orange-400" />
        </Link>
      )}

      {/* ── DUE CARDS BANNER ──────────────────────────────────────────── */}
      {dueCount > 0 && (
        <Link
          to="/flashcards"
          className="flex items-center gap-4 rounded-[2rem] border border-sky-500/30 bg-sky-500/10 px-5 py-4 backdrop-blur-2xl transition-all hover:border-sky-500/50 hover:bg-sky-500/15"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/20">
            <RotateCcw className="h-5 w-5 text-sky-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sky-200">
              {dueCount} flashcard{dueCount !== 1 ? "s" : ""} due for review today
            </p>
            <p className="text-sm text-sky-300/70">
              {masteredCount} cards mastered · Spaced repetition active
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-sky-400" />
        </Link>
      )}

      {/* ════════════════════════════════════════════════════════════
          TODAY'S MISSION + AVATAR COMMAND
          ════════════════════════════════════════════════════════════ */}
      <section className="grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* Today's Mission */}
        <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#818CF8]">
                Today's Mission
              </p>
              <h2 className="mt-0.5 font-display text-xl font-bold text-white">
                {missionsComplete >= DAILY_MISSIONS.length
                  ? "Mission complete! 🎉"
                  : "Keep your orbit steady"}
              </h2>
            </div>
            <span className="shrink-0 rounded-full border border-white/[0.1] bg-white/[0.05] px-3 py-1.5 text-xs font-black tabular-nums text-white">
              {missionsComplete}/{DAILY_MISSIONS.length}
            </span>
          </div>
          <div className="space-y-2.5">
            {missionState.map((m) => {
              const pct = Math.round((m.done / m.target) * 100);
              const complete = m.done >= m.target;
              return (
                <div
                  key={m.id}
                  className={`flex items-center gap-3 rounded-2xl border p-3 ${
                    complete
                      ? "border-emerald-400/30 bg-emerald-500/[0.08]"
                      : "border-white/[0.07] bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black tabular-nums ${
                      complete ? "bg-emerald-400 text-[#04130C]" : "bg-white/[0.08] text-white/60"
                    }`}
                  >
                    {m.done}/{m.target}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">{m.label}</p>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background: complete
                            ? "#34D399"
                            : "linear-gradient(90deg,#818CF8,#C084FC)",
                        }}
                      />
                    </div>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-[11px] font-black text-[#FBBF24]">
                    <Zap className="h-3.5 w-3.5" /> {m.xpReward}
                  </span>
                </div>
              );
            })}
          </div>
          <Link
            to="/quizzes"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Rocket className="h-4 w-4" /> Continue mission
          </Link>
        </div>

        {/* Cosmic Companion card */}
        <div className="relative flex flex-col items-center overflow-hidden rounded-[2rem] border border-[#F0ABFC]/20 bg-gradient-to-b from-[#312E81]/42 to-[#0B1220]/76 p-5 text-center backdrop-blur-2xl">
          <div className="pointer-events-none absolute -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(240,171,252,0.32),transparent_65%)] blur-xl" />
          <div className="relative mb-3 flex h-52 w-52 items-center justify-center">
            <div className="cosmic-companion-glow absolute inset-0 rounded-full bg-[#F0ABFC]/25 blur-2xl" />
            <div className="cosmic-companion-ring absolute inset-1 rounded-full border border-dashed border-white/15" />
            <div className="cosmic-companion-ring-reverse absolute inset-5 rounded-full border border-white/10 shadow-[0_0_48px_rgba(240,171,252,0.35)_inset]" />

            {/* Orbiting sparkles */}
            <span
              className="cosmic-companion-sparkle absolute h-1.5 w-1.5 rounded-full bg-[#F0ABFC] shadow-[0_0_10px_rgba(240,171,252,0.9)]"
              style={{ ["--sparkle-start" as any]: "0deg", ["--sparkle-radius" as any]: "88px", ["--sparkle-duration" as any]: "9s" }}
            />
            <span
              className="cosmic-companion-sparkle absolute h-1 w-1 rounded-full bg-[#A5B4FC] shadow-[0_0_10px_rgba(165,180,252,0.9)]"
              style={{ ["--sparkle-start" as any]: "140deg", ["--sparkle-radius" as any]: "78px", ["--sparkle-duration" as any]: "12s" }}
            />
            <span
              className="cosmic-companion-sparkle absolute h-1 w-1 rounded-full bg-[#67E8F9] shadow-[0_0_10px_rgba(103,232,249,0.9)]"
              style={{ ["--sparkle-start" as any]: "245deg", ["--sparkle-radius" as any]: "92px", ["--sparkle-duration" as any]: "14s" }}
            />

            <div className="cosmic-companion-egg-anim relative flex h-40 w-40 items-center justify-center">
              <CompanionImage
                speciesId={progress.companion?.id ?? "nova"}
                stage={companionStage.id}
                size={148}
              />
            </div>
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F0ABFC]/70">
            Cosmic Companion
          </p>
          <h3 className="mt-1 font-display text-xl font-black text-white">
            {companionName} {companionStage.name}
          </h3>
          <p className="mt-2 max-w-[220px] text-xs italic leading-5 text-white/55">
            "{companionDailyMessage}"
          </p>
          <p className="mt-2 text-xs font-bold text-white/45">
            {nextCompanionStage
              ? `${progress.xp.toLocaleString()} / ${nextCompanionStage.xpRequired.toLocaleString()} XP`
              : "Guardian evolution complete"}
          </p>
          <Link
            to="/companion"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#F0ABFC]/30 bg-[#F0ABFC]/10 px-4 py-2.5 text-xs font-bold text-[#F5D0FE] transition-colors hover:bg-[#F0ABFC]/20"
          >
            <Sparkles className="h-4 w-4" /> Open Companion
          </Link>
        </div>
      </section>

      {/* ── WEAKNESS TEASER (AI Tracker) ──────────────────────────────── */}
      {topWeakSpot && (
        <Link
          to="/tracker"
          className="group flex items-center gap-4 rounded-[2rem] border border-[#22D3EE]/25 bg-[#22D3EE]/[0.08] px-5 py-4 backdrop-blur-2xl transition-all hover:border-[#22D3EE]/45 hover:bg-[#22D3EE]/[0.14]"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#22D3EE]/20">
            <Target className="h-5 w-5 text-[#67E8F9]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#67E8F9]">
              AI Tracker · Focus next
            </p>
            <p className="truncate font-bold text-white">
              {topWeakSpot.subjectName}: {topWeakSpot.chapterLabel}
            </p>
            <p className="text-sm text-white/45">
              Averaging {topWeakSpot.avgScore}% — let's push past 80%.
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-[#67E8F9] transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}

      {/* ── PARENT REPORT TEASER ──────────────────────────────────────── */}
      <Link
        to="/parent"
        className="group flex items-center gap-4 rounded-[2rem] border border-[#34D399]/25 bg-[#34D399]/[0.08] px-5 py-4 backdrop-blur-2xl transition-all hover:border-[#34D399]/45 hover:bg-[#34D399]/[0.14]"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#34D399]/20">
          <Users className="h-5 w-5 text-[#6EE7B7]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6EE7B7]">
            For parents
          </p>
          <p className="font-bold text-white">Send a weekly or monthly Mission Report</p>
          <p className="text-sm text-white/45">
            Keep parents in the loop with a clear, syllabus-aligned summary.
          </p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#6EE7B7] transition-transform group-hover:translate-x-0.5" />
      </Link>

      {/* ── HALL OF FAME / SCHOLARSHIP TEASER ──────────────────────────── */}
      <Link
        to="/leaderboard"
        className="group flex items-center gap-4 rounded-[2rem] border border-[#FBBF24]/25 bg-[#FBBF24]/[0.08] px-5 py-4 backdrop-blur-2xl transition-all hover:border-[#FBBF24]/45 hover:bg-[#FBBF24]/[0.14]"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FBBF24]/20">
          {scholarshipEligible ? (
            <GraduationCap className="h-5 w-5 text-[#FCD34D]" />
          ) : (
            <Trophy className="h-5 w-5 text-[#FCD34D]" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#FCD34D]">
            Hall of Fame{myRank ? ` · You're #${myRank}` : ""}
          </p>
          <p className="font-bold text-white">
            {scholarshipEligible
              ? "You're scholarship-eligible — submit your nomination 🎓"
              : "Climb the ranking to earn scholarship recognition"}
          </p>
          <p className="text-sm text-white/45">
            Top students are recognised and put forward for scholarships.
          </p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#FCD34D] transition-transform group-hover:translate-x-0.5" />
      </Link>

      {/* ════════════════════════════════════════════════════════════
          ACADEMY UNIVERSE — World portal grid
          ════════════════════════════════════════════════════════════ */}
      <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
        <UniverseHeader />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {WORLD_PORTALS.map((world) => (
            <WorldPortalCard
              key={world.id}
              world={world}
              isCurrentWorld={progress.lastVisited?.subjectId === world.id}
            />
          ))}
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section>
        <div className="mb-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6366F1]">
            Built Different
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-white">Why AcadeMY?</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="relative rounded-3xl border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl"
              >
                {f.badge && (
                  <span
                    className="absolute right-4 top-4 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide"
                    style={{ background: `${f.color}25`, color: f.color }}
                  >
                    {f.badge}
                  </span>
                )}
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `${f.color}18`, color: f.color }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── QUICK ACCESS ──────────────────────────────────────────────── */}
      <section>
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">Jump Into</p>
          <h2 className="mt-1 font-display text-xl font-bold text-white">Quick Access</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {QUICK_ACCESS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.to}
                className={`group rounded-3xl border border-white/[0.08] bg-gradient-to-br ${item.gradient} p-5 backdrop-blur-2xl transition-all hover:-translate-y-1 hover:border-white/[0.16]`}
              >
                <span
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                  style={{ background: `${item.color}22`, color: item.color }}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{item.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── AI TRACKER CTA ────────────────────────────────────────────── */}
      <section className="rounded-[2rem] border border-[#22D3EE]/25 bg-gradient-to-br from-[#0E7490]/15 to-[#6366F1]/10 p-6 backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #22D3EE, #6366F1)",
              boxShadow: "0 0 32px rgba(34,211,238,0.4)",
            }}
          >
            <Radar className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <h2 className="font-display text-xl font-bold text-white">Your AI Study Tracker</h2>
              <Sparkles className="h-4 w-4 text-[#FBBF24]" />
            </div>
            <p className="mt-1.5 text-sm leading-6 text-white/60">
              {topWeakSpot
                ? `Right now your weakest spot is ${topWeakSpot.subjectName} — "${topWeakSpot.chapterLabel}" at ${topWeakSpot.avgScore}%. The Tracker shows exactly what to study next.`
                : "Take a few quizzes and the Tracker maps your strengths and weak chapters automatically."}
            </p>
          </div>
          <Link
            to="/tracker"
            className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#22D3EE] to-[#6366F1] px-6 py-3 text-sm font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            <Radar className="h-4 w-4" />
            Open Tracker
          </Link>
        </div>
      </section>
    </section>
  );
}

// ─── Resume Banner ────────────────────────────────────────────────────────────

function ResumeBanner({ lastVisited }: { lastVisited: LastVisited }) {
  const world = WORLD_PORTALS.find((w) => w.id === lastVisited.subjectId);
  const formNumber = Number(lastVisited.form?.match(/\d/)?.[0] ?? 1);
  return (
    <Link
      to={TYPE_ROUTES[lastVisited.type]}
      search={{ subject: lastVisited.subjectId, form: formNumber } as Record<string, unknown>}
      className="group flex items-center gap-4 rounded-[2rem] border border-[#6366F1]/30 bg-[#6366F1]/10 px-5 py-4 backdrop-blur-2xl transition-all hover:border-[#6366F1]/50 hover:bg-[#6366F1]/15"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl"
        style={
          world
            ? { background: `${world.color}20`, boxShadow: `0 0 16px ${world.color}4d` }
            : { background: "rgba(99,102,241,0.2)" }
        }
      >
        {world ? world.icon : TYPE_ICONS[lastVisited.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#818CF8]">
          Continue Mission
        </p>
        <p className="font-bold text-white capitalize truncate">{lastVisited.label}</p>
        <p className="text-xs text-white/40 capitalize">
          {world?.worldName ?? lastVisited.subjectId} · {TYPE_LABELS[lastVisited.type]} ·{" "}
          {timeAgo(lastVisited.timestamp)}
        </p>
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl bg-[#6366F1]/20 px-3 py-1.5 text-xs font-bold text-[#818CF8] transition-transform group-hover:translate-x-0.5">
        Resume <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}
