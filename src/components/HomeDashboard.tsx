import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Circle,
  Compass,
  FlaskConical,
  GraduationCap,
  Library,
  NotebookTabs,
  PlayCircle,
  Sparkles,
  Zap,
  Flame,
  Trophy,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import { AstronautScene } from "@/components/AstronautScene";
import { SubjectPlanetLink } from "@/components/AcademyPage";
import { useProgress, getRank, getNextRank, getRankProgress, DAILY_MISSIONS, chapterActivityKey, chapterProgressPct } from "@/hooks/use-progress";

const quickAccess = [
  {
    title: "Notes",
    description: "Smart KSSM summaries",
    to: "/notes" as const,
    icon: NotebookTabs,
    color: "#3B82F6",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    title: "Flashcards",
    description: "Fast active recall",
    to: "/flashcards" as const,
    icon: Library,
    color: "#8B5CF6",
    gradient: "from-purple-500/20 to-violet-500/20",
  },
  {
    title: "Quizzes",
    description: "Practice with instant feedback",
    to: "/quizzes" as const,
    icon: Brain,
    color: "#F59E0B",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Mind Maps",
    description: "See topics connected",
    to: "/notes" as const,
    icon: Compass,
    color: "#10B981",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Videos",
    description: "Learn chapter by chapter",
    to: "/notes" as const,
    icon: PlayCircle,
    color: "#EC4899",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
] as const;

// Subject metadata for the "Continue Learning" section
const SUBJECT_META = [
  { id: "science",   label: "Science",        icon: FlaskConical,  color: "#3B82F6" },
  { id: "math",      label: "Mathematics",     icon: TrendingUp,    color: "#8B5CF6" },
  { id: "sejarah",   label: "Sejarah",         icon: GraduationCap, color: "#F97316" },
  { id: "geography", label: "Geography",       icon: Compass,       color: "#10B981" },
  { id: "bm",        label: "Bahasa Melayu",   icon: BookOpen,      color: "#EC4899" },
  { id: "english",   label: "English",         icon: BookOpen,      color: "#06B6D4" },
] as const;

export function HomeDashboard() {
  const { progress } = useProgress();
  const rank = getRank(progress.xp);
  const nextRank = getNextRank(progress.xp);
  const rankPct = getRankProgress(progress.xp);

  // Compute subject progress from real activity data
  const subjectCards = SUBJECT_META.map((s) => {
    const activities = Object.entries(progress.chapterActivity)
      .filter(([k]) => k.startsWith(`${s.id}:`))
      .map(([, v]) => v);
    const total = activities.length;
    const pct = total === 0 ? 0 : Math.round(
      activities.reduce((sum, a) => sum + chapterProgressPct(a), 0) / total
    );
    // Last active chapter (most recent, has any activity)
    const lastKey = Object.keys(progress.chapterActivity)
      .filter((k) => k.startsWith(`${s.id}:`))
      .at(-1);
    const chapter = lastKey ? lastKey.replace(`${s.id}:`, "").replaceAll("-", " ") : "No chapters yet";
    return { ...s, pct, chapter, total };
  }).filter((s) => s.total > 0).slice(0, 4);

  // Fall back to demo cards if no real progress yet
  const continueCards = subjectCards.length > 0 ? subjectCards : [
    { id: "science",   label: "Science",      icon: FlaskConical,  color: "#3B82F6", chapter: "Start studying Science",  pct: 0 },
    { id: "math",      label: "Mathematics",  icon: TrendingUp,    color: "#8B5CF6", chapter: "Start studying Math",      pct: 0 },
    { id: "sejarah",   label: "Sejarah",      icon: GraduationCap, color: "#F97316", chapter: "Start studying Sejarah",   pct: 0 },
    { id: "geography", label: "Geography",    icon: Compass,       color: "#10B981", chapter: "Start studying Geography", pct: 0 },
  ];

  // Daily missions with today's progress
  const missionDate = progress.missions?.dailyDate ?? "";
  const todayDate = new Date().toISOString().slice(0, 10);
  const missionsActive = missionDate === todayDate;

  return (
    <section className="px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* ── Main column ─────────────────────────────────────────── */}
        <div className="min-w-0 space-y-6">

          {/* ── HERO ─────────────────────────────────────────────── */}
          <section className="hero-section relative isolate -mx-4 -mt-6 min-h-[560px] overflow-hidden px-4 pb-14 pt-12 sm:-mx-6 sm:px-6 md:min-h-[660px] md:pb-18 md:pt-16 lg:-mx-8 lg:px-8">
            <AstronautScene />

            {/* Deeper atmospheric nebula — denser for drama */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -left-[15%] top-[5%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.48),transparent_60%)] blur-3xl" />
              <div className="absolute left-[15%] top-[40%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.38),transparent_62%)] blur-3xl" />
              <div className="absolute right-[2%] top-[0%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.38),transparent_62%)] blur-3xl" />
              <div className="absolute right-[20%] bottom-[-8%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.22),transparent_68%)] blur-3xl" />
              {/* Gold accent near headline */}
              <div className="absolute left-[8%] top-[20%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.10),transparent_70%)] blur-2xl" />
            </div>

            {/* Left-side legibility scrim — stronger gradient for clear text */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(5,8,22,0.88)_0%,rgba(5,8,22,0.72)_38%,rgba(5,8,22,0.28)_62%,transparent_80%)]" aria-hidden />
            {/* Bottom scrim */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050816] to-transparent" aria-hidden />

            {/* Glowing star particles — more varied */}
            <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
              <span className="absolute left-[28%] top-[24%] h-2 w-2 rounded-full bg-white/90 shadow-[0_0_22px_6px_rgba(167,139,250,0.95)] animate-pulse" />
              <span className="absolute left-[44%] top-[55%] h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_18px_4px_rgba(99,102,241,0.9)] animate-pulse [animation-delay:600ms]" />
              <span className="absolute left-[53%] top-[35%] h-1 w-1 rounded-full bg-white/70 shadow-[0_0_14px_4px_rgba(244,114,182,0.8)] animate-pulse [animation-delay:1200ms]" />
              <span className="absolute left-[37%] top-[70%] h-1 w-1 rounded-full bg-white/60 shadow-[0_0_12px_3px_rgba(59,130,246,0.9)] animate-pulse [animation-delay:1800ms]" />
              <span className="absolute left-[60%] top-[18%] h-[3px] w-[3px] rounded-full bg-white/90 shadow-[0_0_18px_5px_rgba(255,255,255,0.7)] animate-pulse [animation-delay:900ms]" />
              <span className="absolute left-[20%] top-[68%] h-1 w-1 rounded-full bg-white/50 shadow-[0_0_10px_3px_rgba(167,139,250,0.7)] animate-pulse [animation-delay:2400ms]" />
              <span className="absolute left-[70%] top-[50%] h-[2px] w-[2px] rounded-full bg-white/70 shadow-[0_0_12px_3px_rgba(250,204,21,0.6)] animate-pulse [animation-delay:300ms]" />
            </div>

            {/* Headline + CTAs */}
            <div className="relative z-20 flex min-h-[560px] flex-col justify-center md:min-h-[660px]">
              <div className="max-w-[560px]">
                {/* Rank badge — live, premium style */}
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.12] bg-black/30 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-2xl">
                  <span className="text-base leading-none">{rank.emoji}</span>
                  <span className="font-black" style={{ color: rank.color }}>{rank.name}</span>
                  {progress.xp > 0 && (
                    <>
                      <span className="h-3 w-px bg-white/20" />
                      <Zap className="h-3 w-3 text-yellow-400" />
                      <span className="text-[10px] font-bold text-white/60">
                        {progress.xp.toLocaleString()} XP
                      </span>
                    </>
                  )}
                </div>

                {/* Main headline — blended with astronaut atmosphere */}
                <h1 className="font-display font-extrabold leading-[0.92] tracking-tight text-white [text-shadow:0_0_60px_rgba(99,102,241,0.5),0_0_120px_rgba(139,92,246,0.3)]" style={{ fontSize: "clamp(2.75rem,6vw,4.5rem)" }}>
                  <span className="block">Learn Smarter.</span>
                  <span className="mt-2 block bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent [filter:drop-shadow(0_0_30px_rgba(167,139,250,0.5))]">
                    Reach Further.
                  </span>
                  <span className="mt-1 block text-white/90">
                    Rise <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent">Higher.</span>
                  </span>
                </h1>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
                  The ultimate KSSM Form 1 platform. Master Science, Math, Sejarah, Geography and
                  more — with notes, flashcards, quizzes, mind maps and AI tutoring.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/notes"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-7 py-4 text-sm font-bold text-white shadow-[0_20px_50px_-10px_rgba(99,102,241,0.65)] transition-all hover:scale-[1.03] hover:shadow-[0_24px_60px_-10px_rgba(99,102,241,0.75)]"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.14] bg-white/[0.06] px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition-all hover:bg-white/[0.10] hover:border-white/[0.22]"
                  >
                    <TrendingUp className="h-4 w-4" />
                    My Progress
                  </Link>
                </div>
              </div>
            </div>

            {/* Live streak chip — top right float */}
            {progress.streak > 0 && (
              <div className="pointer-events-none absolute right-5 top-8 z-30 hidden items-center gap-2.5 rounded-2xl border border-orange-500/25 bg-orange-950/60 p-2.5 shadow-[0_4px_30px_rgba(249,115,22,0.25)] backdrop-blur-2xl md:right-10 md:top-10 md:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/25">
                  <Flame className="h-4 w-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-orange-300/60">Streak</p>
                  <p className="text-sm font-extrabold text-white">{progress.streak}d 🔥</p>
                </div>
              </div>
            )}

            {/* Live rank progress chip — bottom right float */}
            {nextRank && (
              <div className="pointer-events-none absolute bottom-16 right-5 z-30 hidden rounded-2xl border border-white/[0.09] bg-black/50 p-3 shadow-2xl backdrop-blur-2xl md:bottom-20 md:right-10 md:block">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm leading-none">{rank.emoji}</span>
                  <span className="text-[10px] font-bold" style={{ color: rank.color }}>{rank.name}</span>
                  <span className="text-white/25">→</span>
                  <span className="text-[10px] text-white/40">{nextRank.emoji} {nextRank.name}</span>
                </div>
                <div className="h-1.5 w-36 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${rankPct}%`, background: `linear-gradient(90deg, ${rank.color}, ${nextRank.color})` }}
                  />
                </div>
                <p className="mt-1.5 text-[9px] text-white/35">{rankPct}% to next rank</p>
              </div>
            )}
          </section>

          {/* ── SUBJECTS ─────────────────────────────────────────── */}
          <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#6366F1]">Choose Your World</p>
                <h2 className="font-display text-2xl font-bold text-white">
                  Learning Worlds
                  <span className="ml-2 inline-block rounded-lg bg-[#6366F1]/20 px-2 py-0.5 text-sm font-bold text-[#818CF8]">
                    6
                  </span>
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

          {/* ── CONTINUE LEARNING ────────────────────────────────── */}
          <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Continue Learning</h2>
              <Link to="/notes" className="rounded-2xl border border-white/[0.08] px-4 py-2 text-sm font-bold text-[#94A3B8] transition-colors hover:text-white">
                View All
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {continueCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.id}
                    to="/notes"
                    search={{ subject: card.id, form: 1 }}
                    className="group rounded-3xl border border-white/[0.08] bg-[#101827]/78 p-4 transition-all hover:-translate-y-1 hover:bg-[#101827] hover:border-white/[0.14]"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                        style={{ background: `${card.color}24`, color: card.color }}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-bold">{card.label}</p>
                          <span className="text-xs font-bold" style={{ color: card.pct > 0 ? card.color : "#94A3B8" }}>{card.pct}%</span>
                        </div>
                        <p className="mt-1 truncate text-xs capitalize text-[#94A3B8]">{card.chapter}</p>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${card.pct}%`, background: card.color }}
                          />
                        </div>
                      </div>
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] transition-transform group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── QUICK ACCESS ─────────────────────────────────────── */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {quickAccess.map((item) => {
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
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{item.description}</p>
                </Link>
              );
            })}
          </section>
        </div>

        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <aside className="space-y-6">
          <ProgressPanel />
          <DailyMissionsPanel missionsActive={missionsActive} missions={progress.missions} />
          {progress.badges.length > 0 && <RecentBadgesPanel badges={progress.badges} />}
        </aside>
      </div>
    </section>
  );
}

// ─── Progress Panel (live) ────────────────────────────────────────────────────
function ProgressPanel() {
  const { progress } = useProgress();
  const rank = getRank(progress.xp);
  const nextRank = getNextRank(progress.xp);
  const rankPct = getRankProgress(progress.xp);

  const completedChapters = Object.values(progress.chapterActivity).filter(
    (a) => a.read && a.quiz && a.cards
  ).length;

  const totalActivities = Object.values(progress.chapterActivity).reduce(
    (sum, a) => sum + (a.read ? 1 : 0) + (a.quiz ? 1 : 0) + (a.cards ? 1 : 0),
    0
  );
  const overallPct = totalActivities === 0 ? 0 : Math.min(100, Math.round((completedChapters / Math.max(1, Object.keys(progress.chapterActivity).length)) * 100));

  return (
    <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/68 p-5 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">Your Progress</h2>
        <Link to="/dashboard" className="text-xs font-bold text-[#94A3B8] hover:text-white transition-colors">
          Full Stats →
        </Link>
      </div>

      {/* Rank + XP */}
      <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
            style={{ background: `${rank.color}22` }}
          >
            {rank.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ color: rank.color }}>{rank.name}</p>
            <p className="text-xs text-[#94A3B8]">{progress.xp.toLocaleString()} XP total</p>
          </div>
          <Zap className="h-4 w-4 text-[#FBBF24]" />
        </div>
        {nextRank && (
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[10px] text-[#94A3B8]">
              <span>{rank.name}</span>
              <span>{nextRank.emoji} {nextRank.name}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${rankPct}%`, background: `linear-gradient(90deg, ${rank.color}, ${nextRank.color})` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="mt-4 grid gap-3">
        {[
          { label: "Chapters Mastered", value: completedChapters, icon: <Trophy className="h-4 w-4 text-[#FBBF24]" /> },
          { label: "Day Streak",        value: progress.streak,   icon: <Flame className="h-4 w-4 text-orange-400" /> },
          { label: "Quizzes Done",      value: progress.quizzesTaken, icon: <Target className="h-4 w-4 text-[#60A5FA]" /> },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-2xl bg-white/[0.05] px-4 py-3"
          >
            <div className="flex items-center gap-2">
              {icon}
              <span className="text-sm text-[#94A3B8]">{label}</span>
            </div>
            <span className="font-bold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Daily Missions Panel ─────────────────────────────────────────────────────
function DailyMissionsPanel({
  missionsActive,
  missions,
}: {
  missionsActive: boolean;
  missions?: { dailyDate: string; readChapters: number; quizzesDone: number; flashcardsDone: number };
}) {
  const completed = DAILY_MISSIONS.filter((m) =>
    missionsActive && missions ? m.current(missions) >= m.target : false
  ).length;

  return (
    <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/68 p-5 backdrop-blur-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-[#FBBF24]" />
          <h2 className="font-display text-xl font-bold">Daily Missions</h2>
        </div>
        <span className="rounded-full bg-[#FBBF24]/20 px-2.5 py-1 text-xs font-bold text-[#FBBF24]">
          {completed}/{DAILY_MISSIONS.length}
        </span>
      </div>
      <div className="space-y-3">
        {DAILY_MISSIONS.map((mission) => {
          const current = missionsActive && missions ? mission.current(missions) : 0;
          const done = current >= mission.target;
          const pct = Math.min(100, Math.round((current / mission.target) * 100));
          return (
            <div
              key={mission.id}
              className={`rounded-2xl border p-3 transition-all ${
                done
                  ? "border-emerald-500/30 bg-emerald-500/10"
                  : "border-white/[0.08] bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                {done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-[#94A3B8]" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{mission.label}</span>
                    <span className="shrink-0 rounded-full bg-[#FBBF24]/20 px-2 py-0.5 text-[10px] font-bold text-[#FBBF24]">
                      +{mission.xpReward} XP
                    </span>
                  </div>
                  {!done && (
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Recent Badges Panel ──────────────────────────────────────────────────────
import { ALL_BADGES } from "@/hooks/use-progress";

function RecentBadgesPanel({ badges }: { badges: string[] }) {
  const recent = badges.slice(-6).reverse();
  const defs = recent.map((id) => ALL_BADGES.find((b) => b.id === id)).filter(Boolean);

  if (defs.length === 0) return null;

  return (
    <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/68 p-5 backdrop-blur-2xl">
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="h-4 w-4 text-[#FBBF24]" />
        <h2 className="font-display text-xl font-bold">Recent Badges</h2>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {defs.map((badge) => badge && (
          <div
            key={badge.id}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3 text-center"
          >
            <span className="text-2xl">{badge.emoji}</span>
            <span className="text-[10px] font-bold leading-4" style={{ color: badge.color }}>
              {badge.name}
            </span>
          </div>
        ))}
      </div>
      {badges.length > 6 && (
        <Link to="/dashboard" className="mt-3 block text-center text-xs font-bold text-[#94A3B8] hover:text-white transition-colors">
          +{badges.length - 6} more badges →
        </Link>
      )}
    </div>
  );
}
