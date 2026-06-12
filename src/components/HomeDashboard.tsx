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
  Zap,
  Flame,
  Trophy,
  Star,
  Target,
  TrendingUp,
  Bell,
  RotateCcw,
} from "lucide-react";
import { AstronautScene } from "@/components/AstronautScene";
import { SubjectPlanetLink } from "@/components/AcademyPage";
import { useProgress, getRank, getNextRank, getRankProgress, DAILY_MISSIONS, chapterProgressPct, getDueCount, getMasteredCount, type LastVisited } from "@/hooks/use-progress";

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

function useStreakUrgent(lastActive: string, streak: number) {
  const today = new Date().toISOString().slice(0, 10);
  const hour = new Date().getHours();
  return streak > 0 && lastActive !== today && hour >= 15;
}

export function HomeDashboard() {
  const { progress } = useProgress();
  const rank = getRank(progress.xp);
  const nextRank = getNextRank(progress.xp);
  const rankPct = getRankProgress(progress.xp);
  const streakUrgent = useStreakUrgent(progress.lastActive, progress.streak);
  const dueCount = getDueCount(progress.cardMastery);
  const masteredCount = getMasteredCount(progress.cardMastery);

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
          <section className="hero-section relative isolate -mx-4 -mt-6 overflow-hidden px-4 pb-16 pt-12 sm:-mx-6 sm:px-6 md:pb-20 md:pt-16 lg:-mx-8 lg:min-h-[780px] lg:px-8">

            {/* Astronaut scene — cinematic full-hero background */}
            <AstronautScene />

            {/* ── Deep nebula orbs — distributed across the FULL hero ── */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              {/* Far-left indigo cloud — behind text */}
              <div className="absolute -left-[20%] top-[0%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.48),transparent_55%)] blur-3xl" />
              {/* Center-left violet — connects text to astronaut */}
              <div className="absolute left-[8%] top-[30%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.32),transparent_58%)] blur-3xl" />
              {/* Right blue cloud */}
              <div className="absolute right-[-5%] top-[-8%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_58%)] blur-3xl" />
              {/* Lower-center rose accent */}
              <div className="absolute left-[30%] bottom-[-8%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.16),transparent_62%)] blur-3xl" />
              {/* Gold accent near headline */}
              <div className="absolute left-[3%] top-[15%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.11),transparent_65%)] blur-2xl" />
            </div>

            {/*
              ── CINEMATIC SCRIM ──────────────────────────────────────
              Replaced the old hard linear-gradient (which visually split
              the hero in two) with a RADIAL scrim anchored behind the
              text. This lets the astronaut's atmosphere bleed around and
              through the text zone while still keeping text readable.
              Think: spotlight on the text, darkness falls away naturally.
            */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 58% 78% at 20% 50%, rgba(5,8,22,0.90) 0%, rgba(5,8,22,0.72) 30%, rgba(5,8,22,0.38) 55%, rgba(5,8,22,0.10) 72%, transparent 85%)",
              }}
              aria-hidden
            />
            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050816] to-transparent" aria-hidden />
            {/* Top vignette */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050816]/35 to-transparent" aria-hidden />

            {/* ── Foreground star particles scattered across full width ── */}
            <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
              {/* Text zone sparkles */}
              <span className="absolute left-[8%] top-[24%] h-[6px] w-[6px] rounded-full bg-white/90 shadow-[0_0_18px_6px_rgba(167,139,250,1)] animate-pulse" />
              <span className="absolute left-[22%] top-[64%] h-[5px] w-[5px] rounded-full bg-white/80 shadow-[0_0_14px_4px_rgba(99,102,241,0.9)] animate-pulse [animation-delay:700ms]" />
              {/* Transition zone — connects text and astronaut visually */}
              <span className="absolute left-[40%] top-[32%] h-[4px] w-[4px] rounded-full bg-white/75 shadow-[0_0_14px_5px_rgba(244,114,182,0.88)] animate-pulse [animation-delay:1100ms]" />
              <span className="absolute left-[46%] top-[68%] h-[3px] w-[3px] rounded-full bg-white/65 shadow-[0_0_12px_4px_rgba(59,130,246,0.9)] animate-pulse [animation-delay:1900ms]" />
              <span className="absolute left-[34%] top-[16%] h-[3px] w-[3px] rounded-full bg-white/60 shadow-[0_0_10px_3px_rgba(139,92,246,0.8)] animate-pulse [animation-delay:1600ms]" />
              {/* Astronaut zone sparkles */}
              <span className="absolute left-[60%] top-[18%] h-[4px] w-[4px] rounded-full bg-white/90 shadow-[0_0_16px_5px_rgba(255,255,255,0.75)] animate-pulse [animation-delay:850ms]" />
              <span className="absolute left-[72%] top-[55%] h-[3px] w-[3px] rounded-full bg-white/70 shadow-[0_0_12px_3px_rgba(250,204,21,0.65)] animate-pulse [animation-delay:350ms]" />
              <span className="absolute left-[82%] top-[30%] h-[2px] w-[2px] rounded-full bg-white/55 shadow-[0_0_8px_3px_rgba(99,102,241,0.7)] animate-pulse [animation-delay:2200ms]" />
            </div>

            {/* ── Headline + CTAs ────────────────────────────────────── */}
            <div className="hero-copy-arrive relative z-20 flex min-h-[600px] flex-col justify-center lg:min-h-[780px]">
              <div className="relative max-w-[520px]">

                {/*
                  Text legibility backdrop — a soft frosted scrim that sits
                  directly behind the text block. Uses radial so it fades
                  organically, letting the astronaut environment bleed through
                  at the edges rather than hitting a hard boundary.
                */}
                <div
                  className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem]"
                  style={{
                    background:
                      "radial-gradient(ellipse at 38% 50%, rgba(5,8,22,0.62) 0%, rgba(5,8,22,0.30) 50%, transparent 78%)",
                    filter: "blur(18px)",
                  }}
                />

                {/* Rank badge */}
                <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.14] bg-[#050816]/50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(99,102,241,0.15)]">
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

                {/*
                  Main headline — three lines designed to work with the astronaut:
                  • Line 1 "Learn Smarter." — white, fully in the text safe zone
                  • Line 2 "Reach Further." — gradient, sits in the transition zone
                    where the astronaut atmosphere glow bleeds in
                  • Line 3 "Rise Higher." — white + gold, positioned at the lower
                    boundary — the astronaut's helmet area frames this line
                */}
                <h1
                  className="font-display font-extrabold leading-[0.94] tracking-tight text-white"
                  style={{
                    fontSize: "clamp(2.8rem, 5.5vw, 4.6rem)",
                    textShadow: "0 0 50px rgba(99,102,241,0.45), 0 0 100px rgba(139,92,246,0.25), 0 2px 4px rgba(0,0,0,0.6)",
                  }}
                >
                  <span className="block">Learn Smarter.</span>
                  <span
                    className="mt-2 block bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent"
                    style={{ filter: "drop-shadow(0 0 28px rgba(167,139,250,0.55))" }}
                  >
                    Reach Further.
                  </span>
                  <span className="mt-2 block text-white/90">
                    Rise{" "}
                    <span
                      className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] bg-clip-text text-transparent"
                      style={{ filter: "drop-shadow(0 0 20px rgba(251,191,36,0.5))" }}
                    >
                      Higher.
                    </span>
                  </span>
                </h1>

                {/* Descriptor */}
                <p className="mt-5 max-w-[400px] text-sm leading-[1.85] text-white/55">
                  The ultimate KSSM Form 1 platform — notes, flashcards, quizzes,
                  mind maps and AI tutoring. All in one place.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/notes"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_-8px_rgba(99,102,241,0.65)] transition-all hover:scale-[1.04] hover:shadow-[0_20px_50px_-8px_rgba(99,102,241,0.80)] active:scale-[0.98]"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.15] bg-white/[0.07] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-all hover:bg-white/[0.12] hover:border-white/[0.25]"
                  >
                    <TrendingUp className="h-4 w-4" />
                    My Progress
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Live streak chip — right of hero, vertical center top ── */}
            {progress.streak > 0 && (
              <div className="pointer-events-none absolute right-5 top-10 z-30 hidden items-center gap-2.5 rounded-2xl border border-orange-500/30 bg-[#0F0805]/70 p-2.5 shadow-[0_4px_28px_rgba(249,115,22,0.22)] backdrop-blur-2xl md:right-8 md:flex lg:right-12">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/22">
                  <Flame className="h-4 w-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-orange-300/60">Streak</p>
                  <p className="text-sm font-extrabold text-white">{progress.streak}d 🔥</p>
                </div>
              </div>
            )}

            {/* ── Rank progress chip — bottom right ─────────────────── */}
            {nextRank && (
              <div className="pointer-events-none absolute bottom-20 right-5 z-30 hidden rounded-2xl border border-white/[0.10] bg-[#050816]/65 p-3 shadow-2xl backdrop-blur-2xl md:right-8 md:block lg:bottom-24 lg:right-12">
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

          {/* ── STREAK URGENCY BANNER ────────────────────────────── */}
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

          {/* ── DUE CARDS BANNER ─────────────────────────────────── */}
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
          {progress.lastVisited && <ResumePanel lastVisited={progress.lastVisited} />}
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

// ─── Resume Panel ─────────────────────────────────────────────────────────────
const TYPE_ROUTES = {
  notes: "/notes",
  flashcards: "/flashcards",
  quiz: "/quizzes",
} as const;

const TYPE_ICONS: Record<string, string> = { notes: "📖", flashcards: "🃏", quiz: "🧠" };
const TYPE_LABELS: Record<string, string> = { notes: "Notes", flashcards: "Flashcards", quiz: "Quiz" };

function ResumePanel({ lastVisited }: { lastVisited: LastVisited }) {
  const elapsed = Date.now() - lastVisited.timestamp;
  const hours = Math.floor(elapsed / 3600000);
  const timeAgo = hours < 1 ? "Just now" : hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;

  return (
    <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/68 p-5 backdrop-blur-2xl">
      <p className="text-xs font-bold uppercase tracking-widest text-[#6366F1]">Resume</p>
      <h2 className="mt-1 font-display text-xl font-bold">Continue Where You Left Off</h2>
      <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{TYPE_ICONS[lastVisited.type]}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold capitalize truncate">{lastVisited.label}</p>
            <p className="text-xs text-[#94A3B8] capitalize">{lastVisited.subjectId} · {TYPE_LABELS[lastVisited.type]} · {timeAgo}</p>
          </div>
        </div>
        <Link
          to={TYPE_ROUTES[lastVisited.type]}
          search={{ subject: lastVisited.subjectId, form: 1 } as Record<string, unknown>}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Link>
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
