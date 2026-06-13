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
  Bot,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { CSSProperties } from "react";
import { AstronautScene } from "@/components/AstronautScene";
import { SubjectPlanetLink } from "@/components/AcademyPage";
import {
  useProgress,
  getRank,
  getNextRank,
  getRankProgress,
  getDueCount,
  getMasteredCount,
  type LastVisited,
} from "@/hooks/use-progress";
import { useCikgu } from "@/context/cikgu-context";

// ─── Subject planet strip data ────────────────────────────────────────────────
const HERO_PLANETS = [
  { id: "math",      emoji: "🧮", label: "Maths",     color: "#FBBF24", glow: "rgba(251,191,36,0.35)",   bg: "rgba(251,191,36,0.18)",  dur: "5.2s", delay: "0s"    },
  { id: "science",   emoji: "🧪", label: "Science",   color: "#38BDF8", glow: "rgba(56,189,248,0.35)",   bg: "rgba(56,189,248,0.18)",  dur: "6.0s", delay: "0.35s" },
  { id: "english",   emoji: "📖", label: "English",   color: "#C084FC", glow: "rgba(192,132,252,0.35)",  bg: "rgba(192,132,252,0.18)", dur: "4.8s", delay: "0.7s"  },
  { id: "geography", emoji: "🌍", label: "Geo",       color: "#34D399", glow: "rgba(52,211,153,0.35)",   bg: "rgba(52,211,153,0.18)",  dur: "5.6s", delay: "1.05s" },
  { id: "sejarah",   emoji: "🏛️", label: "Sejarah",  color: "#FB923C", glow: "rgba(251,146,60,0.35)",   bg: "rgba(251,146,60,0.18)",  dur: "5.0s", delay: "1.4s"  },
  { id: "bm",        emoji: "📝", label: "BM",        color: "#F472B6", glow: "rgba(244,114,182,0.35)",  bg: "rgba(244,114,182,0.18)", dur: "6.4s", delay: "1.75s" },
] as const;

// ─── Quick access tiles ───────────────────────────────────────────────────────
const QUICK_ACCESS = [
  { title: "Notes",       description: "Smart KSSM chapter summaries",          to: "/notes"      as const, icon: NotebookTabs, color: "#3B82F6", gradient: "from-blue-500/20 to-indigo-500/20"   },
  { title: "Flashcards",  description: "Active recall with spaced repetition",  to: "/flashcards" as const, icon: Library,     color: "#8B5CF6", gradient: "from-purple-500/20 to-violet-500/20" },
  { title: "Quizzes",     description: "Instant feedback, XP rewards",          to: "/quizzes"    as const, icon: Brain,       color: "#F59E0B", gradient: "from-amber-500/20 to-orange-500/20"  },
  { title: "Mind Maps",   description: "Visual concept connections",            to: "/notes"      as const, icon: Compass,     color: "#10B981", gradient: "from-emerald-500/20 to-teal-500/20"  },
  { title: "Videos",      description: "Chapter by chapter walkthroughs",       to: "/notes"      as const, icon: PlayCircle,  color: "#EC4899", gradient: "from-pink-500/20 to-rose-500/20"     },
] as const;

// ─── Feature highlights ───────────────────────────────────────────────────────
const FEATURES = [
  { icon: "🤖", color: "#8B5CF6", title: "Cikgu AI Tutor",    desc: "A patient AI teacher available 24/7. Ask anything. Get taught — not just answered.", badge: "New" },
  { icon: "🧠", color: "#F59E0B", title: "Smart Quizzes",     desc: "XP rewards, streaks, combo multipliers, and instant explanations for every question.", badge: null },
  { icon: "🃏", color: "#34D399", title: "Spaced Repetition", desc: "Science-backed flashcard system that schedules cards exactly when you're about to forget.", badge: null },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TYPE_ROUTES = { notes: "/notes", flashcards: "/flashcards", quiz: "/quizzes" } as const;
const TYPE_ICONS: Record<string, string>  = { notes: "📖", flashcards: "🃏", quiz: "🧠" };
const TYPE_LABELS: Record<string, string> = { notes: "Notes", flashcards: "Flashcards", quiz: "Quiz" };

function timeAgo(ts: number) {
  const h = Math.floor((Date.now() - ts) / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function useStreakUrgent(lastActive: string, streak: number) {
  return streak > 0 && lastActive !== new Date().toISOString().slice(0, 10) && new Date().getHours() >= 15;
}

// ─── Hero subject strip ───────────────────────────────────────────────────────

function HeroSubjectStrip() {
  return (
    <div className="hero-subject-strip mt-9 flex flex-wrap items-center gap-2">
      <span className="mr-1 hidden text-[9px] font-black uppercase tracking-[0.22em] text-white/20 sm:block">
        Explore
      </span>
      {HERO_PLANETS.map((p) => (
        <Link
          key={p.id}
          to="/notes"
          search={{ subject: p.id, form: 1 } as Record<string, unknown>}
          className="hero-planet-pill"
          style={{
            "--pill-color": p.color,
            "--pill-glow":  p.glow,
            "--bob-dur":    p.dur,
            "--bob-delay":  p.delay,
          } as CSSProperties}
        >
          <span
            className="hero-planet-orb"
            style={{ "--orb-bg": p.bg } as CSSProperties}
          >
            {p.emoji}
          </span>
          <span className="hero-planet-name" style={{ color: p.color }}>
            {p.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

// ─── Rank progression card ────────────────────────────────────────────────────

function HeroRankCard() {
  const { progress } = useProgress();
  const rank     = getRank(progress.xp);
  const nextRank = getNextRank(progress.xp);
  const rankPct  = getRankProgress(progress.xp);

  return (
    <div className="hero-rank-card pointer-events-auto absolute bottom-24 right-4 z-30 hidden w-56 md:right-8 md:block lg:bottom-28 lg:right-12">
      <div className="rounded-[1.5rem] border border-white/[0.12] bg-[#050816]/80 p-4 shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        {/* Current rank */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
              style={{ background: `${rank.color}1A`, boxShadow: `0 0 16px ${rank.color}55` }}
            >
              {rank.emoji}
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30">Current Rank</p>
              <p className="text-sm font-bold leading-tight" style={{ color: rank.color }}>{rank.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-2 py-1">
            <Zap className="h-3 w-3 text-yellow-400" />
            <span className="text-[11px] font-bold text-yellow-300">{progress.xp.toLocaleString()}</span>
          </div>
        </div>

        {nextRank ? (
          <>
            {/* Progress bar */}
            <div className="mb-1 flex justify-between text-[9px] text-white/25">
              <span>{rankPct}% there</span>
              <span>{nextRank.minXp.toLocaleString()} XP</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="hero-rank-bar-fill h-full rounded-full"
                style={{
                  width: `${rankPct}%`,
                  "--bar-from": rank.color,
                  "--bar-to":   nextRank.color,
                } as CSSProperties}
              />
            </div>

            {/* Next rank */}
            <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.04] p-2">
              <span className="text-base">{nextRank.emoji}</span>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/25">Next Rank</p>
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
  const { openCikgu } = useCikgu();
  const rank         = getRank(progress.xp);
  const streakUrgent = useStreakUrgent(progress.lastActive, progress.streak);
  const dueCount     = getDueCount(progress.cardMastery);
  const masteredCount = getMasteredCount(progress.cardMastery);
  const hasProgress   = progress.xp > 0 || !!progress.lastVisited;

  return (
    <section className="px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10 space-y-6">

      {/* ════════════════════════════════════════════════════════════
          HERO — One cinematic space scene
          ════════════════════════════════════════════════════════════ */}
      <div className="hero-section relative isolate -mx-4 -mt-6 overflow-hidden px-4 pb-20 pt-10 sm:-mx-6 sm:px-6 md:pb-24 md:pt-14 lg:-mx-8 lg:min-h-[820px] lg:px-8">

        {/* Living space scene */}
        <AstronautScene />

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
          style={{ background: "radial-gradient(ellipse 62% 82% at 18% 50%, rgba(5,8,22,0.92) 0%, rgba(5,8,22,0.74) 30%, rgba(5,8,22,0.38) 55%, rgba(5,8,22,0.10) 72%, transparent 86%)" }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050816] to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050816]/35 to-transparent" aria-hidden />

        {/* Star accent particles (mid foreground) */}
        <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
          <span className="absolute left-[8%] top-[24%] h-[6px] w-[6px] rounded-full bg-white/90 shadow-[0_0_18px_6px_rgba(167,139,250,1)] animate-pulse" />
          <span className="absolute left-[22%] top-[64%] h-[5px] w-[5px] rounded-full bg-white/80 shadow-[0_0_14px_4px_rgba(99,102,241,0.9)] animate-pulse [animation-delay:700ms]" />
          <span className="absolute left-[40%] top-[32%] h-[4px] w-[4px] rounded-full bg-white/75 shadow-[0_0_14px_5px_rgba(244,114,182,0.88)] animate-pulse [animation-delay:1100ms]" />
          <span className="absolute left-[46%] top-[68%] h-[3px] w-[3px] rounded-full bg-white/65 shadow-[0_0_12px_4px_rgba(59,130,246,0.9)] animate-pulse [animation-delay:1900ms]" />
          <span className="absolute left-[60%] top-[18%] h-[4px] w-[4px] rounded-full bg-white/90 shadow-[0_0_16px_5px_rgba(255,255,255,0.75)] animate-pulse [animation-delay:850ms]" />
          <span className="absolute left-[72%] top-[55%] h-[3px] w-[3px] rounded-full bg-white/70 shadow-[0_0_12px_3px_rgba(250,204,21,0.65)] animate-pulse [animation-delay:350ms]" />
          <span className="absolute left-[82%] top-[30%] h-[2px] w-[2px] rounded-full bg-white/55 shadow-[0_0_8px_3px_rgba(99,102,241,0.7)] animate-pulse [animation-delay:2200ms]" />
        </div>

        {/* ── Headline + CTAs + Planet strip ──────────────────────── */}
        <div className="hero-copy-arrive relative z-20 flex min-h-[640px] flex-col justify-center lg:min-h-[820px]">
          <div className="relative max-w-[540px]">

            {/* Subtle text-zone backing so copy reads over astronaut */}
            <div
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem]"
              style={{ background: "radial-gradient(ellipse at 38% 50%, rgba(5,8,22,0.60) 0%, rgba(5,8,22,0.28) 50%, transparent 78%)", filter: "blur(20px)" }}
            />

            {/* Live rank badge */}
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.14] bg-[#050816]/52 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(99,102,241,0.15)]">
              <span className="text-base leading-none">{rank.emoji}</span>
              <span className="font-black" style={{ color: rank.color }}>{rank.name}</span>
              {progress.xp > 0 && (
                <>
                  <span className="h-3 w-px bg-white/20" />
                  <Zap className="h-3 w-3 text-yellow-400" />
                  <span className="text-[10px] font-bold text-white/60">{progress.xp.toLocaleString()} XP</span>
                </>
              )}
            </div>

            {/* Main headline */}
            <h1
              className="font-display font-extrabold leading-[0.93] tracking-tight text-white"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)", textShadow: "0 0 60px rgba(99,102,241,0.5), 0 0 120px rgba(139,92,246,0.25), 0 2px 4px rgba(0,0,0,0.7)" }}
            >
              <span className="block">Learn Smarter.</span>
              <span
                className="mt-2 block bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent"
                style={{ filter: "drop-shadow(0 0 30px rgba(167,139,250,0.6))" }}
              >
                Reach Further.
              </span>
              <span className="mt-2 block text-white/90">
                Rise{" "}
                <span
                  className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent"
                  style={{ filter: "drop-shadow(0 0 22px rgba(251,191,36,0.55))" }}
                >
                  Higher.
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-[400px] text-sm leading-[1.9] text-white/52">
              The complete KSSM Form 1 platform — notes, flashcards, quizzes,
              mind maps, and AI tutoring. Everything in one place.
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/notes"
                className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_48px_-8px_rgba(99,102,241,0.70)] transition-all hover:scale-[1.04] hover:shadow-[0_20px_60px_-8px_rgba(99,102,241,0.85)] active:scale-[0.98]"
              >
                🚀 Launch Mission
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
                  to="/flashcards"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.15] bg-white/[0.07] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-all hover:bg-white/[0.12] hover:border-white/[0.25]"
                >
                  🃏 Explore Academy
                </Link>
              )}
            </div>

            {/* Subject planet strip */}
            <HeroSubjectStrip />
          </div>
        </div>

        {/* Live streak chip */}
        {progress.streak > 0 && (
          <div className="pointer-events-none absolute right-5 top-10 z-30 hidden items-center gap-2.5 rounded-2xl border border-orange-500/30 bg-[#0F0805]/72 p-2.5 shadow-[0_4px_28px_rgba(249,115,22,0.24)] backdrop-blur-2xl md:right-8 md:flex lg:right-12">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/20">
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-orange-300/60">Streak</p>
              <p className="text-sm font-extrabold text-white">{progress.streak}d 🔥</p>
            </div>
          </div>
        )}

        {/* Rank progression card */}
        <HeroRankCard />
      </div>

      {/* ── RESUME BANNER (real data only) ───────────────────────────────── */}
      {progress.lastVisited && (
        <ResumeBanner lastVisited={progress.lastVisited} />
      )}

      {/* ── STREAK URGENCY (real data only) ──────────────────────────────── */}
      {streakUrgent && (
        <Link
          to="/flashcards"
          className="flex items-center gap-4 rounded-[2rem] border border-orange-500/30 bg-orange-500/10 px-5 py-4 backdrop-blur-2xl transition-all hover:border-orange-500/50 hover:bg-orange-500/15"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500/20">
            <Bell className="h-5 w-5 text-orange-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-orange-200">Don't break your {progress.streak}-day streak! 🔥</p>
            <p className="text-sm text-orange-300/70">Study any chapter before midnight to keep it alive.</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-orange-400" />
        </Link>
      )}

      {/* ── DUE CARDS BANNER (real data only) ────────────────────────────── */}
      {dueCount > 0 && (
        <Link
          to="/flashcards"
          className="flex items-center gap-4 rounded-[2rem] border border-sky-500/30 bg-sky-500/10 px-5 py-4 backdrop-blur-2xl transition-all hover:border-sky-500/50 hover:bg-sky-500/15"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500/20">
            <RotateCcw className="h-5 w-5 text-sky-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sky-200">{dueCount} flashcard{dueCount !== 1 ? "s" : ""} due for review today</p>
            <p className="text-sm text-sky-300/70">{masteredCount} cards mastered · Spaced repetition active</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-sky-400" />
        </Link>
      )}

      {/* ── LEARNING WORLDS ──────────────────────────────────────────────── */}
      <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#6366F1]">KSSM Form 1</p>
            <h2 className="font-display text-2xl font-bold text-white">
              Learning Worlds
              <span className="ml-2 inline-block rounded-lg bg-[#6366F1]/20 px-2 py-0.5 text-sm font-bold text-[#818CF8]">6</span>
            </h2>
          </div>
          <Link
            to="/subjects"
            className="hidden items-center gap-1.5 rounded-2xl border border-white/[0.08] px-4 py-2 text-sm font-bold text-[#94A3B8] transition-all hover:border-white/[0.15] hover:text-white sm:inline-flex"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {(["science", "math", "english", "geography", "sejarah", "bm"] as const).map((id) => (
            <SubjectPlanetLink key={id} subjectId={id} to="/notes" />
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section>
        <div className="mb-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6366F1]">Built Different</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-white">Why AcadeMY?</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
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
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                style={{ background: `${f.color}18` }}
              >
                {f.icon}
              </div>
              <h3 className="font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUICK ACCESS ─────────────────────────────────────────────────── */}
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

      {/* ── CIKGU AI CTA ─────────────────────────────────────────────────── */}
      <section className="rounded-[2rem] border border-[#6366F1]/25 bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 p-6 backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
            style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 0 32px rgba(99,102,241,0.4)" }}
          >
            👨‍🚀
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <h2 className="font-display text-xl font-bold text-white">Meet Cikgu AI</h2>
              <Sparkles className="h-4 w-4 text-[#FBBF24]" />
            </div>
            <p className="mt-1.5 text-sm leading-6 text-white/60">
              Stuck on a concept? Cikgu AI explains it at your level — in BM or English — without you leaving AcadeMY.
            </p>
          </div>
          <button
            onClick={() => openCikgu({ mode: "general" })}
            className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-6 py-3 text-sm font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            <Bot className="h-4 w-4" />
            Ask Cikgu AI
          </button>
        </div>
      </section>

    </section>
  );
}

// ─── Resume Banner ────────────────────────────────────────────────────────────

function ResumeBanner({ lastVisited }: { lastVisited: LastVisited }) {
  return (
    <Link
      to={TYPE_ROUTES[lastVisited.type]}
      search={{ subject: lastVisited.subjectId, form: 1 } as Record<string, unknown>}
      className="group flex items-center gap-4 rounded-[2rem] border border-[#6366F1]/30 bg-[#6366F1]/10 px-5 py-4 backdrop-blur-2xl transition-all hover:border-[#6366F1]/50 hover:bg-[#6366F1]/15"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#6366F1]/20 text-xl">
        {TYPE_ICONS[lastVisited.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#818CF8]">Continue Learning</p>
        <p className="font-bold text-white capitalize truncate">{lastVisited.label}</p>
        <p className="text-xs text-white/40 capitalize">
          {lastVisited.subjectId} · {TYPE_LABELS[lastVisited.type]} · {timeAgo(lastVisited.timestamp)}
        </p>
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl bg-[#6366F1]/20 px-3 py-1.5 text-xs font-bold text-[#818CF8] transition-transform group-hover:translate-x-0.5">
        Resume <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}
