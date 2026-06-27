import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { rankArtwork, rankImageScale } from "@/data/rankArtwork";
import {
  useProgress,
  getRank,
  getNextRank,
  getRankProgress,
  SPACE_RANKS,
  ALL_BADGES,
  chapterProgressPct,
  totalChaptersCompleted,
  getDueCount,
  getMasteredCount,
  COMPANION_STAGES,
  DAILY_MISSIONS,
  type LastVisited,
  type MissionProgress,
  type RecentActivity,
  type SpaceRank,
  type CompanionId,
  type CompanionStageId,
  type BadgeDef,
  type Progress,
  getCompanionStageForXp,
} from "@/hooks/use-progress";
import { CompanionImage, getCompanionSpecies } from "@/companion";
import { subjects, type Subject } from "@/data/content";
import {
  Target,
  Star,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  Circle,
  ArrowRight,
  RotateCcw,
  Bell,
  Bot,
  Sparkles,
  AlertTriangle,
  BookMarked,
  GraduationCap,
  Search,
  Compass,
  Clock3,
  ClipboardList,
  PlayCircle,
} from "lucide-react";
import { AcademyPageShell } from "@/components/AcademyPage";
import { useCikgu } from "@/context/cikgu-context";
import { useAuth } from "@/context/auth-context";
import geographyArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 10_59_37 AM.png";
import bmArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 11_00_15 AM.png";
import englishArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 11_00_47 AM.png";
import scienceArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 11_01_08 AM.png";
import sejarahArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 11_01_37 AM.png";
import mathArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 11_02_06 AM.png";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AcadeMY" },
      { name: "description", content: "Track your XP, streaks, badges and study progress." },
      { property: "og:title", content: "Dashboard — AcadeMY" },
      { property: "og:description", content: "Your personal study stats and achievements." },
    ],
  }),
  component: DashboardPage,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TYPE_ROUTES = {
  notes: "/notes",
  flashcards: "/flashcards",
  quiz: "/quizzes",
} as const;

const TYPE_ICONS: Record<string, string> = { notes: "📖", flashcards: "🃏", quiz: "🧠" };
const TYPE_LABELS: Record<string, string> = { notes: "Notes", flashcards: "Flashcards", quiz: "Quiz" };

const STARTER_ACTIONS = [
  { title: "Explore Notes", subtitle: "Pick a subject and start your first chapter.", to: "/notes" as const, Icon: BookOpen, color: "#60A5FA" },
  { title: "Try a Quiz", subtitle: "Test what you already know.", to: "/quizzes" as const, Icon: TrendingUp, color: "#FBBF24" },
  { title: "Review Flashcards", subtitle: "Build memory with quick study cards.", to: "/flashcards" as const, Icon: BookMarked, color: "#A78BFA" },
];

function timeAgo(ts: number) {
  const elapsed = Date.now() - ts;
  const hours = Math.floor(elapsed / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function useStreakUrgent(lastActive: string, streak: number) {
  const today = new Date().toISOString().slice(0, 10);
  const hour = new Date().getHours();
  return streak > 0 && lastActive !== today && hour >= 15;
}

/** Picks the single most useful "what should I do next" prompt from today's daily missions. */
function getNextGoalLabel(missions: MissionProgress | undefined): string {
  for (const m of DAILY_MISSIONS) {
    const current = missions ? Math.min(m.current(missions), m.target) : 0;
    if (current < m.target) return m.label;
  }
  return "All daily missions complete! 🎉";
}

/** Generic progress-toward-next-badge calculation, derived entirely from existing progress fields. */
function getBadgeProgress(
  badgeId: string,
  progress: Progress,
): { current: number; target: number } | null {
  switch (badgeId) {
    case "xp100":
      return { current: Math.min(progress.xp, 100), target: 100 };
    case "scholar":
      return { current: Math.min(progress.xp, 500), target: 500 };
    case "xp1000":
      return { current: Math.min(progress.xp, 1000), target: 1000 };
    case "xp5000":
      return { current: Math.min(progress.xp, 5000), target: 5000 };
    case "streak3":
      return { current: Math.min(progress.streak, 3), target: 3 };
    case "streak7":
      return { current: Math.min(progress.streak, 7), target: 7 };
    case "streak30":
      return { current: Math.min(progress.streak, 30), target: 30 };
    case "quiz10":
      return { current: Math.min(progress.quizzesTaken, 10), target: 10 };
    case "quiz50":
      return { current: Math.min(progress.quizzesTaken, 50), target: 50 };
    case "five_chapters": {
      const done = totalChaptersCompleted(progress.chapterActivity);
      return { current: Math.min(done, 5), target: 5 };
    }
    case "mastery10":
      return { current: Math.min(getMasteredCount(progress.cardMastery), 10), target: 10 };
    case "mastery50":
      return { current: Math.min(getMasteredCount(progress.cardMastery), 50), target: 50 };
    case "mastery100":
      return { current: Math.min(getMasteredCount(progress.cardMastery), 100), target: 100 };
    default:
      return null;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function DashboardPage() {
  const { progress } = useProgress();
  const { user } = useAuth();
  const { openCikgu } = useCikgu();
  const rank       = getRank(progress.xp);
  const nextRank   = getNextRank(progress.xp);
  const rankPct    = getRankProgress(progress.xp);
  const completed  = totalChaptersCompleted(progress.chapterActivity);
  const dueCount   = getDueCount(progress.cardMastery);
  const masteredCount = getMasteredCount(progress.cardMastery);
  const streakUrgent = useStreakUrgent(progress.lastActive, progress.streak);

  const todayDate = new Date().toISOString().slice(0, 10);
  const missionsActive = progress.missions?.dailyDate === todayDate;
  const todaysMissions = missionsActive ? progress.missions : undefined;
  const recentActivity = progress.recentActivity ?? [];

  // Weak chapters: started but not fully completed
  const weakChapters = Object.entries(progress.chapterActivity)
    .filter(([, a]) => (a.read || a.quiz || a.cards) && !(a.read && a.quiz && a.cards))
    .map(([key, a]) => {
      const colonIdx = key.indexOf(":");
      const subjectId = key.slice(0, colonIdx);
      const chapterKey = key.slice(colonIdx + 1);
      const subject = subjects.find((s) => s.id === subjectId);
      const missing: string[] = [];
      if (!a.read)  missing.push("Notes");
      if (!a.quiz)  missing.push("Quiz");
      if (!a.cards) missing.push("Flashcards");
      return { key, subjectId, chapterKey, subject, a, missing, pct: chapterProgressPct(a) };
    })
    .slice(0, 6);

  const firstName = user?.name?.split(" ")[0] ?? "Student";
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return `Good Morning, ${firstName}`;
    if (h < 17) return `Good Afternoon, ${firstName}`;
    return `Good Evening, ${firstName}`;
  })();
  const companionId = progress.companion?.id ?? "nova";
  const nextGoalLabel = getNextGoalLabel(todaysMissions);

  return (
    <AcademyPageShell>
      <CosmicDashboardBackdrop />

      {/* ── Slim header — greeting / streak / CTA ─────────────────────── */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#6366F1]">Your Space Journey</p>
          <h1 className="font-display text-xl font-black text-white sm:text-2xl">{greeting}</h1>
        </div>
        <div className="flex items-center gap-3">
          {progress.streak > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-2 text-xs font-bold text-orange-300">
              🔥 {progress.streak}-day streak
            </span>
          )}
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            Study Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ── ROW 1 — Hero: Rank / Companion / Next Goal (answer in 3 seconds) ── */}
      <HeroRow
        rank={rank}
        nextRank={nextRank}
        xp={progress.xp}
        rankPct={rankPct}
        companionId={companionId}
        nextGoalLabel={nextGoalLabel}
      />

      {/* ── Urgent streak alert (kept near top — time-sensitive) ───────── */}
      {streakUrgent && (
        <Link
          to="/flashcards"
          className="mb-4 flex items-center gap-4 rounded-[2rem] border border-orange-500/30 bg-orange-500/10 px-5 py-4 backdrop-blur-2xl transition-all hover:border-orange-500/50 hover:bg-orange-500/15"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-500/20">
            <Bell className="h-5 w-5 text-orange-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-orange-200">Don't break your {progress.streak}-day streak! 🔥</p>
            <p className="text-sm text-orange-300/70">Study before midnight to keep it alive.</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-orange-400" />
        </Link>
      )}

      {/* ── ROW 2 — Cosmic Journey (65%) / Today's Progress (35%) — equal heights ── */}
      <div className="mb-6 grid gap-6 lg:grid-cols-[65%_1fr] lg:items-stretch">
        <CosmicJourneyPath ranks={SPACE_RANKS} currentId={rank.id} xp={progress.xp} />
        <TodayProgressGrid
          compact
          notesStudied={missionsActive && progress.missions ? progress.missions.readChapters : 0}
          quizzesCompleted={missionsActive && progress.missions ? progress.missions.quizzesDone : 0}
          flashcardsMastered={missionsActive && progress.missions ? progress.missions.flashcardsDone : 0}
          totalXp={progress.xp}
        />
      </div>

      {/* ── ROW 3 — Subject Worlds ────────────────────────────────────── */}
      <Card className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <SectionLabel>Subject Worlds</SectionLabel>
          <Link to="/notes" className="text-xs font-bold text-[#94A3B8] hover:text-white transition-colors">
            Study Now →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => {
            const xp = progress.subjectXp[s.id] ?? 0;
            const acts = Object.entries(progress.chapterActivity)
              .filter(([k]) => k.startsWith(`${s.id}:`))
              .map(([, v]) => v);
            const chapDone = acts.filter((a) => a.read && a.quiz && a.cards).length;
            const chapStarted = acts.filter((a) => a.read || a.quiz || a.cards).length;
            const pct = Math.min(100, Math.round((xp / 500) * 100));
            return (
              <SubjectWorldCard
                key={s.id}
                subject={s}
                chapDone={chapDone}
                chapStarted={chapStarted}
                pct={pct}
              />
            );
          })}
        </div>
      </Card>

      {/* ── ROW 4 — Continue Learning / Flashcards Due / Quick Actions (compact "next action" row) ── */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {progress.lastVisited ? (
          <ContinueLearningCard lastVisited={progress.lastVisited} />
        ) : (
          <StarterCards compact />
        )}
        <FlashcardsDueCard dueCount={dueCount} masteredCount={masteredCount} />
        <QuickActionsCard lastVisited={progress.lastVisited} />
      </div>

      {/* ── ROW 5 — Companion Evolution / Mastery & Cikgu AI ──────────── */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <CosmicCompanionCard xp={progress.xp} companionId={companionId} />
        <div className="space-y-4">
          {/* Chapters mastered stat */}
          <Card className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#8B5CF6]/20">
              <GraduationCap className="h-7 w-7 text-[#A78BFA]" />
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-white">{completed}</p>
              <p className="text-sm text-[#94A3B8]">
                {completed === 0 ? "No chapters fully mastered yet" : `chapter${completed !== 1 ? "s" : ""} fully mastered`}
              </p>
            </div>
          </Card>

          {/* Cikgu AI CTA */}
          <div
            className="rounded-[2rem] border border-[#6366F1]/25 bg-gradient-to-br from-[#6366F1]/15 to-[#8B5CF6]/15 p-5 backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
              >
                👨‍🚀
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-sm text-white">Cikgu AI</p>
                  <Sparkles className="h-3 w-3 text-[#FBBF24]" />
                </div>
                <p className="text-[10px] text-white/40">Your personal AI tutor</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => openCikgu({ mode: "exam-coach" })}
                className="w-full flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.05] px-3 py-2.5 text-left text-xs font-semibold text-white/70 transition-all hover:bg-white/[0.10] hover:text-white"
              >
                <Target className="h-3.5 w-3.5 shrink-0 text-[#A78BFA]" />
                Generate my study plan
              </button>
              <button
                onClick={() => openCikgu({ mode: "general" })}
                className="w-full flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.05] px-3 py-2.5 text-left text-xs font-semibold text-white/70 transition-all hover:bg-white/[0.10] hover:text-white"
              >
                <Bot className="h-3.5 w-3.5 shrink-0 text-[#60A5FA]" />
                Ask about a topic
              </button>
              {weakChapters.length > 0 && (
                <button
                  onClick={() =>
                    openCikgu({
                      mode: "exam-coach",
                      initialMessage: `Saya ada ${weakChapters.length} bab yang belum siap. Boleh Cikgu bagi saya pelan ulangkaji untuk siapkan bab-bab ini?`,
                    })
                  }
                  className="w-full flex items-center gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2.5 text-left text-xs font-semibold text-amber-300 transition-all hover:bg-amber-500/15"
                >
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  Help with my weak chapters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── ROW 6 — Daily Missions ──────────────────────────────────────── */}
      <Card className="mb-6">
        <DailyMissionsSection missions={todaysMissions} />
      </Card>

      {/* ── ROW 7 — Achievements / Recent Activity ──────────────────────── */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <AchievementShowcase progress={progress} />
        <RecentActivityCard activity={recentActivity} />
      </div>

      {/* ── Needs Attention (weak chapters) ─────────────────────────────── */}
      {weakChapters.length > 0 && (
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <SectionLabel>Needs Attention</SectionLabel>
            <span className="ml-auto rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              {weakChapters.length} chapter{weakChapters.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="space-y-2">
            {weakChapters.map((ch) => (
              <div
                key={ch.key}
                className="flex items-center gap-3 rounded-2xl border border-amber-400/10 bg-amber-400/5 px-4 py-3"
              >
                <span className="text-lg">{ch.subject?.emoji ?? "📚"}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white capitalize truncate">
                    {ch.subject?.name ?? ch.subjectId} · {ch.chapterKey}
                  </p>
                  <p className="text-xs text-amber-300/70">
                    Still needed: {ch.missing.join(", ")}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-amber-300">{ch.pct}%</p>
                  <p className="text-[10px] text-white/30">done</p>
                </div>
                <Link
                  to="/notes"
                  search={{ subject: ch.subjectId } as Record<string, unknown>}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 transition-all hover:bg-amber-400/20"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </Card>
      )}
    </AcademyPageShell>
  );
}

// ─── Hero Row — Rank / Companion / Next Goal (3 equal columns, answers "who am I / what's next") ─────

function HeroRow({
  rank,
  nextRank,
  xp,
  rankPct,
  companionId,
  nextGoalLabel,
}: {
  rank: SpaceRank;
  nextRank: SpaceRank | null;
  xp: number;
  rankPct: number;
  companionId: CompanionId;
  nextGoalLabel: string;
}) {
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-3">
      <RankHeroCard rank={rank} nextRank={nextRank} xp={xp} rankPct={rankPct} />
      <CompanionHeroCard xp={xp} companionId={companionId} />
      <NextGoalHeroCard nextGoalLabel={nextGoalLabel} nextRank={nextRank} xp={xp} />
    </div>
  );
}

function RankHeroCard({
  rank,
  nextRank,
  xp,
  rankPct,
}: {
  rank: SpaceRank;
  nextRank: SpaceRank | null;
  xp: number;
  rankPct: number;
}) {
  const xpRemaining = nextRank ? Math.max(0, nextRank.minXp - xp) : 0;
  const theme = getRankTheme(rank.id);

  return (
    <Card className="relative flex h-[280px] flex-col overflow-hidden sm:h-[300px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: `radial-gradient(circle at 20% 18%, ${theme.soft}, transparent 60%)` }}
      />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <SectionLabel className="mb-3">Current Rank</SectionLabel>
        <CosmicPlanet rank={rank} size={88} current spotlight />
        <p
          className="mt-3 font-display text-2xl font-black"
          style={{ color: theme.glow, textShadow: `0 0 24px ${theme.soft}` }}
        >
          {rank.name}
        </p>
        <div className="mt-4 w-full">
          <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-white/60">
            <span>{xp.toLocaleString()} XP</span>
            <span>{rankPct}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${rankPct}%`,
                background: `linear-gradient(90deg, ${rank.color}, #8B5CF6)`,
                boxShadow: `0 0 16px ${theme.soft}`,
              }}
            />
          </div>
          <p className="mt-2 text-xs font-bold text-white/50">
            {nextRank ? `${xpRemaining.toLocaleString()} XP to ${nextRank.name}` : "Highest rank reached! 🌟"}
          </p>
        </div>
      </div>
    </Card>
  );
}

function CompanionHeroCard({ xp, companionId }: { xp: number; companionId: CompanionId }) {
  const stageId = getCompanionStageForXp(xp);
  const stageIndex = Math.max(0, COMPANION_STAGES.findIndex((s) => s.id === stageId));
  const stage = COMPANION_STAGES[stageIndex] ?? COMPANION_STAGES[0];
  const species = getCompanionSpecies(companionId);

  return (
    <Card className="relative flex h-[280px] flex-col overflow-hidden text-center sm:h-[300px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(circle at 50% 10%, rgba(167,139,250,0.32), transparent 65%)" }}
      />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <SectionLabel className="mb-3">Companion</SectionLabel>
        <CompanionImage speciesId={companionId} stage={stageId} size={104} />
        <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-[#C4B5FD]/70">{species.name}</p>
        <p className="font-display text-xl font-black text-white">
          {species.fallbackEmoji[stageId]} {stage.name}
        </p>
        <p className="mt-2 text-sm font-bold text-white">
          XP: <span className="text-[#A78BFA]">{xp.toLocaleString()}</span>
        </p>
      </div>
    </Card>
  );
}

function NextGoalHeroCard({
  nextGoalLabel,
  nextRank,
  xp,
}: {
  nextGoalLabel: string;
  nextRank: SpaceRank | null;
  xp: number;
}) {
  const xpRemaining = nextRank ? Math.max(0, nextRank.minXp - xp) : 0;

  return (
    <Card className="flex h-[280px] flex-col items-center justify-center text-center sm:h-[300px]">
      <SectionLabel className="mb-3">Next Goal</SectionLabel>
      <Target className="h-9 w-9 text-[#A78BFA]" />
      <p className="mt-3 text-base font-black text-white">{nextGoalLabel}</p>
      <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">XP Needed</p>
      <p className="font-display text-2xl font-black text-[#FBBF24]">
        {nextRank ? xpRemaining.toLocaleString() : "—"}
      </p>
      <Link
        to="/notes"
        className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-2 text-xs font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.98]"
      >
        Study Now <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Card>
  );
}

// ─── Continue Learning — compact "resume where you left off" card ─────────────

function ContinueLearningCard({ lastVisited }: { lastVisited: LastVisited }) {
  const formNumber = Number(lastVisited.form?.match(/\d/)?.[0] ?? 1);
  return (
    <Link
      to={TYPE_ROUTES[lastVisited.type]}
      search={{ subject: lastVisited.subjectId, form: formNumber } as Record<string, unknown>}
      className="academy-surface group flex flex-col rounded-[2rem] border border-[#6366F1]/30 bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 p-4 backdrop-blur-2xl transition-all hover:border-[#6366F1]/50 hover:from-[#6366F1]/15 hover:to-[#8B5CF6]/15"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#6366F1]/20 text-xl">
          {TYPE_ICONS[lastVisited.type]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#818CF8]">Continue Learning</p>
          <p className="text-sm font-bold text-white capitalize truncate">{lastVisited.label}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-white/40 capitalize">
        {lastVisited.subjectId} · {TYPE_LABELS[lastVisited.type]} · {timeAgo(lastVisited.timestamp)}
      </p>
      <div className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-bold text-[#818CF8] transition-transform group-hover:translate-x-0.5">
        Resume <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

// ─── Flashcards Due — compact alert/status card ────────────────────────────────

function FlashcardsDueCard({ dueCount, masteredCount }: { dueCount: number; masteredCount: number }) {
  const due = dueCount > 0;
  return (
    <Link
      to="/flashcards"
      className={`academy-surface group flex flex-col rounded-[2rem] border p-4 backdrop-blur-2xl transition-all ${due ? "border-sky-500/30 bg-sky-500/10 hover:border-sky-500/50 hover:bg-sky-500/15" : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06]"}`}
    >
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${due ? "bg-sky-500/20" : "bg-white/[0.06]"}`}>
          <RotateCcw className={`h-5 w-5 ${due ? "text-sky-400" : "text-white/40"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${due ? "text-sky-300" : "text-[#94A3B8]"}`}>Flashcards Due</p>
          <p className="text-sm font-bold text-white">
            {due ? `${dueCount} card${dueCount !== 1 ? "s" : ""} to review` : "All caught up!"}
          </p>
        </div>
      </div>
      <p className="mt-2 text-xs text-white/40">{masteredCount} card{masteredCount !== 1 ? "s" : ""} mastered</p>
      <div className={`mt-auto flex items-center gap-1.5 pt-3 text-sm font-bold transition-transform group-hover:translate-x-0.5 ${due ? "text-sky-300" : "text-white/50"}`}>
        Review <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

// ─── Shared UI pieces ─────────────────────────────────────────────────────────

function StarterCards({ compact = false }: { compact?: boolean }) {
  return (
    <Card className={compact ? "" : "mb-6"}>
      <div className="mb-4 flex items-center gap-2">
        <Compass className="h-4 w-4 text-cyan-300" />
        <SectionLabel>Start Your Journey</SectionLabel>
      </div>
      <div className={compact ? "grid gap-3" : "grid gap-3 md:grid-cols-3"}>
        {STARTER_ACTIONS.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 transition-all hover:-translate-y-0.5 hover:bg-white/[0.07]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.06]" style={{ color: item.color }}>
              <item.Icon className="h-5 w-5" />
            </div>
            <p className="font-bold text-white">{item.title}</p>
            <p className="mt-1 text-xs leading-5 text-white/45">{item.subtitle}</p>
            <ArrowRight className="mt-3 h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white/70" />
          </Link>
        ))}
      </div>
    </Card>
  );
}

// ─── Daily Missions — 3 individual mission cards ───────────────────────────────

const MISSION_ICONS: Record<string, { Icon: typeof BookOpen; color: string }> = {
  read2: { Icon: BookOpen, color: "#60A5FA" },
  quiz2: { Icon: ClipboardList, color: "#FBBF24" },
  cards1: { Icon: BookMarked, color: "#A78BFA" },
};

function DailyMissionsSection({ missions }: { missions?: MissionProgress }) {
  const missionRows = DAILY_MISSIONS.map((m) => ({
    id: m.id,
    label: m.label,
    xpReward: m.xpReward,
    current: missions ? Math.min(m.current(missions), m.target) : 0,
    target: m.target,
    ...(MISSION_ICONS[m.id] ?? { Icon: Star, color: "#94A3B8" }),
  }));
  const doneCount = missionRows.filter((mission) => mission.current >= mission.target).length;

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Star className="h-4 w-4 text-[#FBBF24]" />
        <SectionLabel>Daily Missions</SectionLabel>
        <span className="rounded-full bg-[#FBBF24]/20 px-2 py-0.5 text-[10px] font-bold text-[#FBBF24]">
          {doneCount}/{missionRows.length}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {missionRows.map((mission) => {
          const done = mission.current >= mission.target;
          const pct = Math.min(100, Math.round((mission.current / mission.target) * 100));
          return (
            <div
              key={mission.id}
              className={`rounded-[1.75rem] border p-5 backdrop-blur-2xl transition-all ${done ? "border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.18)]" : "border-white/[0.08] bg-[#0B1220]/62"}`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: `${mission.color}1f` }}
                >
                  <mission.Icon className="h-5 w-5" style={{ color: mission.color }} />
                </div>
                {done ? (
                  <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-emerald-400" />
                ) : (
                  <Circle className="ml-auto h-5 w-5 shrink-0 text-[#94A3B8]" />
                )}
              </div>
              <p className="mt-3 text-sm font-bold text-white">{mission.label}</p>
              <div className="mt-2 flex items-center justify-between text-xs font-bold text-white/50">
                <span>{mission.current}/{mission.target}</span>
                <span className={done ? "text-emerald-300" : "text-[#FBBF24]/80"}>
                  {done ? `✓ +${mission.xpReward} XP` : `+${mission.xpReward} XP`}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className={`h-full rounded-full ${done ? "bg-emerald-400" : "bg-gradient-to-r from-[#6366F1] to-[#22D3EE]"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className={`mt-3 text-[10px] font-bold uppercase tracking-wide ${done ? "text-emerald-300" : "text-white/35"}`}>
                {done ? "Claimed" : "In progress"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Achievement Showcase — recent + next, not the full locked grid ───────────

function AchievementShowcase({ progress }: { progress: Progress }) {
  const unlockedBadges = ALL_BADGES.filter((b) => progress.badges.includes(b.id));
  const recentBadge: BadgeDef | undefined = unlockedBadges[unlockedBadges.length - 1];
  const nextBadge: BadgeDef | undefined = ALL_BADGES.find((b) => !progress.badges.includes(b.id));
  const nextProgress = nextBadge ? getBadgeProgress(nextBadge.id, progress) : null;

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <SectionLabel>Achievements</SectionLabel>
        <span className="text-xs text-[#94A3B8]">
          {progress.badges.length}/{ALL_BADGES.length} unlocked
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Recent achievement */}
        <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Recent Achievement</p>
          {recentBadge ? (
            <>
              <p className="mt-2 text-3xl">{recentBadge.emoji}</p>
              <p className="mt-1 font-bold text-white" style={{ color: recentBadge.color }}>
                {recentBadge.name}
              </p>
              <p className="mt-1 text-[11px] text-white/40">{recentBadge.description}</p>
            </>
          ) : (
            <>
              <p className="mt-2 text-3xl opacity-40">🏆</p>
              <p className="mt-1 text-sm text-white/40">None yet — keep studying!</p>
            </>
          )}
        </div>

        {/* Next achievement */}
        <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Next Achievement</p>
          {nextBadge ? (
            <>
              <p className="mt-2 text-3xl opacity-70">{nextBadge.emoji}</p>
              <p className="mt-1 font-bold text-white">{nextBadge.name}</p>
              <p className="mt-1 text-[11px] text-white/40">{nextBadge.description}</p>
              {nextProgress && (
                <>
                  <p className="mt-2 text-xs font-bold text-[#A78BFA]">
                    {nextProgress.current.toLocaleString()} / {nextProgress.target.toLocaleString()}
                  </p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#A78BFA]"
                      style={{ width: `${Math.min(100, Math.round((nextProgress.current / nextProgress.target) * 100))}%` }}
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <p className="mt-2 text-3xl">🎉</p>
              <p className="mt-1 text-sm font-bold text-white">All achievements unlocked!</p>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

function RecentActivityCard({ activity }: { activity: RecentActivity[] }) {
  const recent = activity.slice(0, 5);
  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <Clock3 className="h-4 w-4 text-cyan-300" />
        <SectionLabel>Recent Activity</SectionLabel>
      </div>
      {recent.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 text-center">
          <p className="text-2xl">🚀</p>
          <p className="mt-2 text-sm font-bold text-white">Your journey starts now</p>
          <p className="mt-1 text-xs leading-5 text-white/40">
            Open a note, take a quiz, or review flashcards — your wins will show up here.
          </p>
        </div>
      ) : (
        <div className="relative space-y-2.5 before:absolute before:bottom-2 before:left-[18px] before:top-2 before:w-px before:bg-white/[0.08] before:content-['']">
          {recent.map((item) => {
            const subjectName = subjects.find((subject) => subject.id === item.subjectId)?.name ?? item.subjectId;
            return (
              <Link
                key={item.id}
                to={TYPE_ROUTES[item.type]}
                search={
                  {
                    subject: item.subjectId,
                    form: Number(item.form?.match(/\d/)?.[0] ?? 1),
                    chapter: item.chapterKey,
                  } as Record<string, unknown>
                }
                className="relative flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-3 transition-all hover:bg-white/[0.08]"
              >
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-white">
                    ✅ {item.label}
                  </span>
                  <span className="block truncate text-xs text-white/40">
                    {subjectName} · {TYPE_LABELS[item.type]} · {timeAgo(item.timestamp)}
                    {item.detail ? ` · ${item.detail}` : ""}
                  </span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/28" />
              </Link>
            );
          })}
        </div>
      )}
    </Card>
  );
}

function QuickActionsCard({ lastVisited }: { lastVisited?: LastVisited }) {
  const continueAction = lastVisited
    ? {
        to: TYPE_ROUTES[lastVisited.type],
        search: {
          subject: lastVisited.subjectId,
          form: Number(lastVisited.form?.match(/\d/)?.[0] ?? 1),
          chapter: lastVisited.chapterKey,
        } as Record<string, unknown>,
      }
    : { to: "/notes" as const, search: { form: 1 } as Record<string, unknown> };

  return (
    <Card className="space-y-2">
      <SectionLabel className="mb-3">Quick Actions</SectionLabel>
      <Link
        to={continueAction.to}
        search={continueAction.search}
        className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 text-sm font-semibold text-white/70 transition-all hover:bg-white/[0.08] hover:text-white"
      >
        <PlayCircle className="h-4 w-4 text-cyan-300" />
        Continue Learning
        <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-40" />
      </Link>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("academy:open-search"))}
        className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 text-left text-sm font-semibold text-white/70 transition-all hover:bg-white/[0.08] hover:text-white"
      >
        <Search className="h-4 w-4 text-[#60A5FA]" />
        Search
        <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-40" />
      </button>
      <Link
        to="/subjects"
        className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 text-sm font-semibold text-white/70 transition-all hover:bg-white/[0.08] hover:text-white"
      >
        <Compass className="h-4 w-4 text-[#A78BFA]" />
        Choose Subject
        <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-40" />
      </Link>
      <Link
        to="/quizzes"
        className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 text-sm font-semibold text-white/70 transition-all hover:bg-white/[0.08] hover:text-white"
      >
        <TrendingUp className="h-4 w-4 text-[#F59E0B]" />
        Start Quiz
        <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-40" />
      </Link>
      <Link
        to="/flashcards"
        className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 text-sm font-semibold text-white/70 transition-all hover:bg-white/[0.08] hover:text-white"
      >
        <BookMarked className="h-4 w-4 text-[#A78BFA]" />
        Review Flashcards
        <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-40" />
      </Link>
    </Card>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`academy-surface rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-wider text-[#94A3B8] ${className}`}>{children}</p>
  );
}

/** Animates a number counting up from 0 to `target` — purely cosmetic, no data changes. */
function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

// ─── Today's Progress — glass cards ────────────────────────────────────────────

function TodayStatGlassCard({
  icon,
  label,
  value,
  color,
  glow,
  compact = false,
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
  glow: string;
  compact?: boolean;
}) {
  const count = useCountUp(value);
  return (
    <div
      className={`cosmic-glass-card relative overflow-hidden rounded-[1.75rem] border border-white/[0.10] ${compact ? "p-3" : "p-5"}`}
      style={{ ["--stat-glow" as string]: glow }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: `radial-gradient(circle at 26% 18%, ${glow}, transparent 62%)` }}
      />
      <div className="relative z-10">
        <span className={compact ? "text-lg" : "text-2xl"}>{icon}</span>
        <p className={`font-display font-bold text-white ${compact ? "mt-2 text-xl" : "mt-3 text-3xl"}`}>{count.toLocaleString()}</p>
        <p className={`mt-1 font-semibold uppercase tracking-wide ${compact ? "text-[10px]" : "text-xs"}`} style={{ color }}>{label}</p>
      </div>
    </div>
  );
}

function TodayProgressGrid({
  notesStudied,
  quizzesCompleted,
  flashcardsMastered,
  totalXp,
  compact = false,
}: {
  notesStudied: number;
  quizzesCompleted: number;
  flashcardsMastered: number;
  totalXp: number;
  compact?: boolean;
}) {
  return (
    <Card className={compact ? "flex h-[380px] flex-col justify-center p-4" : undefined}>
      <SectionLabel className="mb-3">Today's Progress</SectionLabel>
      <div className={compact ? "grid grid-cols-2 gap-3" : "grid grid-cols-2 gap-4 md:grid-cols-4"}>
        <TodayStatGlassCard compact={compact} icon="📚" label="Notes Studied" value={notesStudied} color="#60A5FA" glow="rgba(96,165,250,0.45)" />
        <TodayStatGlassCard compact={compact} icon="📝" label="Quizzes Completed" value={quizzesCompleted} color="#34D399" glow="rgba(52,211,153,0.45)" />
        <TodayStatGlassCard compact={compact} icon="🎴" label="Flashcards Mastered" value={flashcardsMastered} color="#A78BFA" glow="rgba(167,139,250,0.45)" />
        <TodayStatGlassCard compact={compact} icon="⭐" label="XP Earned" value={totalXp} color="#FBBF24" glow="rgba(251,191,36,0.45)" />
      </div>
    </Card>
  );
}

// ─── Subject Worlds ───────────────────────────────────────────────────────────

const SUBJECT_WORLD_THEME: Record<string, { color: string; artwork: string }> = {
  bm:        { color: "#C458A3", artwork: bmArtwork },
  english:   { color: "#8E5ACF", artwork: englishArtwork },
  math:      { color: "#C89B2C", artwork: mathArtwork },
  science:   { color: "#1D5F9F", artwork: scienceArtwork },
  sejarah:   { color: "#C97A3A", artwork: sejarahArtwork },
  geography: { color: "#1FAE8B", artwork: geographyArtwork },
};

function SubjectWorldCard({
  subject,
  chapDone,
  chapStarted,
  pct,
}: {
  subject: Subject;
  chapDone: number;
  chapStarted: number;
  pct: number;
}) {
  const theme = SUBJECT_WORLD_THEME[subject.id];

  return (
    <div
      className="group relative flex h-[280px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#0B1220] transition-[border-color,background-color] duration-200 hover:border-white/[0.16] hover:bg-[#0E1727]"
    >
      {/* Artwork area */}
      <div className="relative h-[52%] w-full shrink-0 overflow-hidden">
        <img
          src={theme.artwork}
          alt=""
          className="h-full w-full object-cover brightness-[0.72] transition-[filter] duration-200 group-hover:brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/25 to-black/15" />
        <span
          className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/55 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white"
        >
          {pct}%
        </span>
      </div>

      {/* Info area — name, chapter count, progress bar, continue button */}
      <div className="flex min-h-0 flex-1 flex-col justify-between p-3">
        <div>
          <p className="text-sm font-bold text-white">{subject.name}</p>
          <p className="text-[9px] font-bold uppercase tracking-wide" style={{ color: theme.color }}>
            {chapStarted > 0 ? `${chapDone}/${chapStarted} chapters` : "Not started"}
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: theme.color }} />
          </div>
        </div>
        <Link
          to="/notes"
          search={{ subject: subject.id, form: 1 } as Record<string, unknown>}
          className="mt-2 flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-[filter] hover:brightness-110"
          style={{ background: `${theme.color}30`, color: theme.color }}
        >
          Continue <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

// ─── Cosmic Companion ───────────────────────────────────────────────────────────

const COMPANION_TIMELINE_EMOJI: Record<CompanionStageId, string> = {
  egg: "🥚",
  blobling: "🫧",
  sprout: "🌱",
  cadet: "🚀",
  guardian: "🛡️",
};

/** Horizontal evolution path — Egg → Blobling → Sprout → Cadet → Guardian. */
function CompanionEvolutionPath({ currentStageId }: { currentStageId: CompanionStageId }) {
  const currentIndex = COMPANION_STAGES.findIndex((s) => s.id === currentStageId);
  return (
    <div className="mt-6 flex items-center justify-between gap-1 overflow-x-auto rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
      {COMPANION_STAGES.map((stage, i) => {
        const done = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={stage.id} className="flex min-w-0 flex-1 items-center">
            <div className="flex flex-1 flex-col items-center gap-1.5">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition-all ${isCurrent ? "scale-110 ring-2 ring-[#A78BFA]" : ""}`}
                style={{
                  background: done ? "rgba(167,139,250,0.18)" : "rgba(255,255,255,0.05)",
                  filter: done ? "none" : "grayscale(1)",
                  opacity: done ? 1 : 0.45,
                  boxShadow: isCurrent ? "0 0 18px rgba(167,139,250,0.55)" : "none",
                }}
              >
                {COMPANION_TIMELINE_EMOJI[stage.id]}
              </span>
              <span
                className="text-[10px] font-bold"
                style={{ color: isCurrent ? "#C4B5FD" : done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)" }}
              >
                {stage.name}
              </span>
            </div>
            {i < COMPANION_STAGES.length - 1 && (
              <span
                className="mx-1 h-px flex-1 shrink-0"
                style={{ background: done ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.08)", minWidth: 16 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Large, prominent companion card — current stage, next evolution, and the full evolution path. */
function CosmicCompanionCard({
  xp,
  companionId,
}: {
  xp: number;
  companionId: CompanionId;
}) {
  const stageId = getCompanionStageForXp(xp);
  const stageIndex = Math.max(0, COMPANION_STAGES.findIndex((s) => s.id === stageId));
  const stage = COMPANION_STAGES[stageIndex] ?? COMPANION_STAGES[0];
  const nextStage = COMPANION_STAGES[stageIndex + 1] ?? null;
  const xpNeeded = nextStage ? Math.max(0, nextStage.xpRequired - xp) : 0;
  const species = getCompanionSpecies(companionId);

  return (
    <Card className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(circle at 50% 10%, rgba(167,139,250,0.32), transparent 65%)" }}
      />
      <div className="relative z-10">
        <SectionLabel>Cosmic Companion</SectionLabel>
        <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          {/* LEFT — large companion artwork */}
          <div className="relative flex shrink-0 items-end justify-center" style={{ width: 168, height: 168 }}>
            <div className="cosmic-companion-pedestal absolute bottom-2 left-1/2 -translate-x-1/2" />
            <div className="cosmic-companion-egg relative z-10 mb-3">
              <CompanionImage speciesId={companionId} stage={stageId} size={140} />
            </div>
          </div>

          {/* CENTER — identity */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C4B5FD]/70">
              {species.name}
            </p>
            <p className="font-display text-2xl font-black text-white sm:text-3xl">
              {species.fallbackEmoji[stageId]} {stage.name}
            </p>
            <p className="mt-2 text-sm font-bold text-white">
              XP: <span className="text-[#A78BFA]">{xp.toLocaleString()}</span>
            </p>
          </div>

          {/* RIGHT — next evolution preview */}
          {nextStage && (
            <div className="shrink-0 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-4 text-center sm:min-w-[164px]">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Next Evolution</p>
              <p className="mt-1 text-base font-bold text-[#F0ABFC]">{nextStage.name}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">XP Remaining</p>
              <p
                className="mt-0.5 font-display text-2xl font-black text-[#F0ABFC]"
                style={{ textShadow: "0 0 18px rgba(240,171,252,0.55)" }}
              >
                {xpNeeded.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Evolution path timeline */}
        <CompanionEvolutionPath currentStageId={stageId} />
      </div>
    </Card>
  );
}

// ─── Cosmic Journey Command Center ─────────────────────────────────────────────

/** Fixed scatter positions so the field looks organic without re-randomizing per render. */
const COSMIC_STAR_SPECKS = [
  { left: "4%", top: "12%", size: 3, dur: 2.4, delay: 0 },
  { left: "14%", top: "70%", size: 2, dur: 3.1, delay: 0.4 },
  { left: "27%", top: "30%", size: 2, dur: 2.7, delay: 1.1 },
  { left: "41%", top: "82%", size: 3, dur: 3.6, delay: 0.2 },
  { left: "55%", top: "18%", size: 2, dur: 2.2, delay: 0.8 },
  { left: "68%", top: "65%", size: 3, dur: 3.3, delay: 1.4 },
  { left: "79%", top: "24%", size: 2, dur: 2.9, delay: 0.6 },
  { left: "91%", top: "75%", size: 2, dur: 2.5, delay: 1.0 },
  { left: "35%", top: "10%", size: 2, dur: 3.4, delay: 0.3 },
  { left: "85%", top: "12%", size: 3, dur: 2.6, delay: 1.2 },
];

const COSMIC_PARTICLE_SPECKS = [
  { left: "10%", top: "45%", size: 4, color: "rgba(167,139,250,0.55)", dur: 5.5, delay: 0 },
  { left: "32%", top: "60%", size: 3, color: "rgba(125,211,252,0.5)", dur: 6.2, delay: 0.8 },
  { left: "58%", top: "38%", size: 4, color: "rgba(251,191,36,0.45)", dur: 5.8, delay: 1.5 },
  { left: "74%", top: "55%", size: 3, color: "rgba(167,139,250,0.5)", dur: 6.6, delay: 0.5 },
  { left: "88%", top: "40%", size: 3, color: "rgba(52,211,153,0.45)", dur: 5.2, delay: 1.1 },
];

/** Premium glow theme per rank — purely presentational, independent of XP/threshold data. */
const RANK_GLOW_THEME: Record<string, { glow: string; soft: string; rainbow?: boolean }> = {
  cadet: { glow: "#22D3EE", soft: "rgba(34,211,238,0.55)" }, // Space Cadet — cyan
  "planet-voyager": { glow: "#2DD4BF", soft: "rgba(45,212,191,0.55)" }, // teal
  "star-captain": { glow: "#FBBF24", soft: "rgba(251,191,36,0.6)" }, // gold
  "galaxy-guardian": { glow: "#A78BFA", soft: "rgba(167,139,250,0.6)" }, // purple
  "celestial-master": { glow: "#F5E9C8", soft: "rgba(245,233,200,0.65)" }, // white-gold
  "cosmic-legend": { glow: "#F0ABFC", soft: "rgba(240,171,252,0.7)", rainbow: true }, // cosmic rainbow
};
function getRankTheme(id: string) {
  return RANK_GLOW_THEME[id] ?? RANK_GLOW_THEME.cadet;
}

/** Small twinkling sparkles scattered around a spotlighted portrait. */
const RANK_SPARKLE_POSITIONS = [
  { left: "6%", top: "12%", size: 4, dur: 2.1, delay: 0 },
  { left: "92%", top: "20%", size: 3, dur: 2.6, delay: 0.4 },
  { left: "14%", top: "82%", size: 3, dur: 2.3, delay: 0.9 },
  { left: "86%", top: "78%", size: 4, dur: 2.8, delay: 0.2 },
  { left: "50%", top: "2%", size: 3, dur: 2.5, delay: 1.2 },
  { left: "50%", top: "96%", size: 3, dur: 2.4, delay: 0.6 },
];

function RankSparkles() {
  return (
    <div className="pointer-events-none absolute inset-[-18%]">
      {RANK_SPARKLE_POSITIONS.map((s, i) => (
        <span
          key={i}
          className="cosmic-rank-spark"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/** A glowing celestial body representing a single rank. */
function CosmicPlanet({
  rank,
  size = 56,
  current = false,
  dim = false,
  spotlight = false,
  floaty = false,
  glowSmall = false,
}: {
  rank: SpaceRank;
  size?: number | string;
  current?: boolean;
  dim?: boolean;
  /** Hero-scale presentation: halo glow + sparkles, used for the Cosmic Rank centerpiece. */
  spotlight?: boolean;
  /** Adds a slight vertical floating motion — used for the active node in the Cosmic Journey. */
  floaty?: boolean;
  /** Subtle static glow for already-completed (but not current) ranks. */
  glowSmall?: boolean;
}) {
  const theme = getRankTheme(rank.id);
  return (
    <div
      title={`${rank.name} · ${rank.minXp.toLocaleString()} XP`}
      className={[
        "cosmic-planet",
        current ? "cosmic-planet-current" : "",
        floaty ? "cosmic-planet-floaty" : "",
        glowSmall ? "cosmic-planet-glow-sm" : "",
        theme.rainbow && current ? "cosmic-planet-rainbow" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: size,
        height: size,
        opacity: dim ? 0.4 : 1,
        filter: dim ? "grayscale(1)" : "none",
        ["--planet-color" as string]: rank.color,
        ["--planet-glow" as string]: theme.glow,
        ["--planet-glow-soft" as string]: theme.soft,
      } as CSSProperties}
    >
      {spotlight && (
        <span
          className="cosmic-rank-halo"
          style={{ background: `radial-gradient(circle, ${theme.soft}, transparent 70%)` }}
        />
      )}
      {current && (
        <>
          <span className="cosmic-planet-ring cosmic-planet-ring-outer" />
          <span className="cosmic-planet-ring cosmic-planet-ring-inner" />
        </>
      )}
      {spotlight && <RankSparkles />}
      <img
        src={rankArtwork[rank.id]}
        alt={rank.name}
        className="cosmic-planet-img"
        style={{ transform: `scale(${rankImageScale[rank.id] ?? 1})` }}
      />
    </div>
  );
}

/** Compact cosmic journey — orbit-connected planets arranged 3-per-row across two rows
 *  (Cadet → Voyager → Captain / Guardian → Master → Legend). Current rank renders 25%
 *  larger than the shared base size, with a glow; completed ranks stay full color,
 *  locked ranks render grayscale. */
function CosmicJourneyPath({ ranks, currentId, xp }: { ranks: SpaceRank[]; currentId: string; xp: number }) {
  const BASE_SIZE = 96;
  const CURRENT_SIZE = 124;
  const rows = [ranks.slice(0, 3), ranks.slice(3, 6)];

  return (
    <Card className="relative flex h-[380px] flex-col overflow-hidden">
      <SectionLabel>Cosmic Journey</SectionLabel>
      {/* Scattered stars + floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {COSMIC_STAR_SPECKS.map((s, i) => (
          <span
            key={i}
            className="cosmic-star-dot"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
        {COSMIC_PARTICLE_SPECKS.map((p, i) => (
          <span
            key={i}
            className="cosmic-particle-dot"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mt-2 flex flex-1 flex-col items-center justify-center gap-3">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex items-center justify-center gap-1">
            {row.map((r, i) => {
              const done = xp >= r.minXp;
              const isCurrent = r.id === currentId;
              const theme = getRankTheme(r.id);
              const next = row[i + 1];
              const nextDone = next ? xp >= next.minXp : false;
              const nextTheme = next ? getRankTheme(next.id) : null;
              return (
                <div key={r.id} className="flex shrink-0 items-center">
                  <div className="flex w-[108px] shrink-0 flex-col items-center gap-1">
                    <div className="flex h-[134px] w-[134px] shrink-0 items-center justify-center">
                      <CosmicPlanet
                        rank={r}
                        size={isCurrent ? CURRENT_SIZE : BASE_SIZE}
                        current={isCurrent}
                        dim={!done}
                        floaty={isCurrent}
                        glowSmall={done && !isCurrent}
                      />
                    </div>
                    <span
                      className="max-w-[96px] truncate text-center text-[11px] font-bold leading-tight"
                      style={{ color: isCurrent ? theme.glow : done ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)" }}
                    >
                      {r.name}
                    </span>
                  </div>
                  {next && (
                    <span
                      className="cosmic-journey-line mx-1 w-6 shrink-0 sm:w-9"
                      style={{
                        ["--from-color" as string]: done ? theme.glow : "rgba(255,255,255,0.08)",
                        ["--to-color" as string]: nextDone && nextTheme ? nextTheme.glow : "rgba(255,255,255,0.08)",
                      } as CSSProperties}
                    >
                      {done && <span className="cosmic-journey-line-energy" />}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
}

/** Lightweight ambient backdrop layer — nebula fog, twinkling stars, particles, rare shooting stars. */
function CosmicDashboardBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 cosmic-bg-nebula" />
      <div className="absolute inset-0 cosmic-bg-stars" />
      <div className="absolute inset-0 cosmic-bg-particles" />
      <span className="cosmic-shooting-star" style={{ left: "8%", top: "6%", animationDelay: "1.5s" }} />
      <span className="cosmic-shooting-star" style={{ left: "55%", top: "2%", animationDelay: "6.5s" }} />
    </div>
  );
}
