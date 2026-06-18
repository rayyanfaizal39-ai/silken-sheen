import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  useProgress,
  getRank,
  getNextRank,
  getRankProgress,
  SPACE_RANKS,
  ALL_BADGES,
  DAILY_MISSIONS,
  chapterProgressPct,
  totalChaptersCompleted,
  getDueCount,
  getMasteredCount,
  type LastVisited,
  type SpaceRank,
} from "@/hooks/use-progress";
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
} from "lucide-react";
import { AcademyPageShell } from "@/components/AcademyPage";
import { useCikgu } from "@/context/cikgu-context";
import { useAuth } from "@/context/auth-context";

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

  const greeting = (() => {
    const h = new Date().getHours();
    const name = user?.name?.split(" ")[0] ?? "Student";
    if (h < 12) return `Good morning, ${name} ☀️`;
    if (h < 17) return `Good afternoon, ${name} 🌤️`;
    return `Good evening, ${name} 🌙`;
  })();

  return (
    <AcademyPageShell>
      <CosmicDashboardBackdrop />
      {/* ── Welcome header ────────────────────────────────────────────── */}
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#6366F1]">Your Space</p>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">{greeting}</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            {completed === 0
              ? "Start a chapter to begin tracking your progress."
              : `${completed} chapter${completed !== 1 ? "s" : ""} mastered · ${progress.xp.toLocaleString()} XP earned`}
          </p>
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

      {/* ── Continue Learning (real data only) ────────────────────────── */}
      {progress.lastVisited && (
        <ContinueLearningBanner lastVisited={progress.lastVisited} />
      )}

      {/* ── Alert banners ─────────────────────────────────────────────── */}
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

      {dueCount > 0 && (
        <Link
          to="/flashcards"
          className="mb-4 flex items-center gap-4 rounded-[2rem] border border-sky-500/30 bg-sky-500/10 px-5 py-4 backdrop-blur-2xl transition-all hover:border-sky-500/50 hover:bg-sky-500/15"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-500/20">
            <RotateCcw className="h-5 w-5 text-sky-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sky-200">{dueCount} flashcard{dueCount !== 1 ? "s" : ""} due for review</p>
            <p className="text-sm text-sky-300/70">{masteredCount} cards mastered · Keep your streak going</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-sky-400" />
        </Link>
      )}

      {/* ── Today's Progress ──────────────────────────────────────────── */}
      <TodayProgressGrid
        notesStudied={missionsActive && progress.missions ? progress.missions.readChapters : 0}
        quizzesCompleted={missionsActive && progress.missions ? progress.missions.quizzesDone : 0}
        flashcardsMastered={missionsActive && progress.missions ? progress.missions.flashcardsDone : 0}
        totalXp={progress.xp}
      />

      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Left column (2/3) ── */}
        <div className="space-y-6 lg:col-span-2">

          {/* Cosmic Rank Hero */}
          <RankHeroCard rank={rank} nextRank={nextRank} xp={progress.xp} rankPct={rankPct} />

          {/* Cosmic Journey Path */}
          <CosmicJourneyPath ranks={SPACE_RANKS} currentId={rank.id} xp={progress.xp} />

          {/* Subject Progress — planetary cards */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <SectionLabel>Subject Progress</SectionLabel>
              <Link to="/notes" className="text-xs font-bold text-[#94A3B8] hover:text-white transition-colors">
                Study Now →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {subjects.map((s) => {
                const xp = progress.subjectXp[s.id] ?? 0;
                const acts = Object.entries(progress.chapterActivity)
                  .filter(([k]) => k.startsWith(`${s.id}:`))
                  .map(([, v]) => v);
                const chapDone = acts.filter((a) => a.read && a.quiz && a.cards).length;
                const chapStarted = acts.filter((a) => a.read || a.quiz || a.cards).length;
                const pct = Math.min(100, Math.round((xp / 500) * 100));
                return (
                  <SubjectPlanetCard
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

          {/* Weak Chapters */}
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

          {/* Badges */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <SectionLabel>Achievements</SectionLabel>
              <span className="text-xs text-[#94A3B8]">
                {progress.badges.length}/{ALL_BADGES.length} unlocked
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-6">
              {ALL_BADGES.map((badge) => {
                const unlocked = progress.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    title={`${badge.name}: ${badge.description}`}
                    className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-center transition-all ${
                      unlocked
                        ? "border-white/[0.12] bg-gradient-to-br from-white/[0.06] to-white/[0.02]"
                        : "border-white/[0.05] bg-white/[0.02] opacity-30 grayscale"
                    }`}
                  >
                    <span className="text-xl">{unlocked ? badge.emoji : "🔒"}</span>
                    <span className="text-[8px] font-bold leading-tight" style={{ color: unlocked ? badge.color : "#94A3B8" }}>
                      {badge.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ── Right column (1/3) ── */}
        <div className="space-y-6">

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

          {/* Cosmic Companion */}
          <CosmicCompanionCard />

          {/* Daily Missions */}
          <Card>
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-4 w-4 text-[#FBBF24]" />
              <h2 className="font-bold text-white">Daily Missions</h2>
              <span className="ml-auto rounded-full bg-[#FBBF24]/20 px-2 py-0.5 text-[10px] font-bold text-[#FBBF24]">
                {DAILY_MISSIONS.filter((m) =>
                  missionsActive && progress.missions ? m.current(progress.missions) >= m.target : false
                ).length}/{DAILY_MISSIONS.length}
              </span>
            </div>
            <div className="space-y-2.5">
              {DAILY_MISSIONS.map((mission) => {
                const current = missionsActive && progress.missions ? mission.current(progress.missions) : 0;
                const done = current >= mission.target;
                const pct = Math.min(100, Math.round((current / mission.target) * 100));
                return (
                  <div
                    key={mission.id}
                    className={`rounded-xl border p-3 ${done ? "border-emerald-500/30 bg-emerald-500/10" : "border-white/[0.07] bg-white/[0.03]"}`}
                  >
                    <div className="flex items-center gap-2.5">
                      {done
                        ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        : <Circle className="h-4 w-4 shrink-0 text-[#94A3B8]" />}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-sm font-semibold text-white">{mission.label}</span>
                          <span className="shrink-0 rounded-full bg-[#FBBF24]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#FBBF24]">
                            +{mission.xpReward}
                          </span>
                        </div>
                        {!done && (
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                            <div className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" style={{ width: `${pct}%` }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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

          {/* Study links */}
          <Card className="space-y-2">
            <SectionLabel className="mb-3">Jump Into</SectionLabel>
            {[
              { icon: <BookOpen className="h-4 w-4" />, label: "Notes", to: "/notes" as const, color: "#3B82F6" },
              { icon: <BookMarked className="h-4 w-4" />, label: "Flashcards", to: "/flashcards" as const, color: "#8B5CF6" },
              { icon: <TrendingUp className="h-4 w-4" />, label: "Quizzes", to: "/quizzes" as const, color: "#F59E0B" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 text-sm font-semibold text-white/70 transition-all hover:bg-white/[0.08] hover:text-white"
              >
                <span style={{ color: item.color }}>{item.icon}</span>
                {item.label}
                <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-40" />
              </Link>
            ))}
          </Card>
        </div>
      </div>
    </AcademyPageShell>
  );
}

// ─── Continue Learning Banner ─────────────────────────────────────────────────

function ContinueLearningBanner({ lastVisited }: { lastVisited: LastVisited }) {
  return (
    <Link
      to={TYPE_ROUTES[lastVisited.type]}
      search={{ subject: lastVisited.subjectId, form: 1 } as Record<string, unknown>}
      className="group mb-6 flex items-center gap-4 rounded-[2rem] border border-[#6366F1]/30 bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 px-5 py-4 backdrop-blur-2xl transition-all hover:border-[#6366F1]/50 hover:from-[#6366F1]/15 hover:to-[#8B5CF6]/15"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#6366F1]/20 text-2xl">
        {TYPE_ICONS[lastVisited.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#818CF8]">Continue Learning</p>
        <p className="font-bold text-white capitalize truncate">{lastVisited.label}</p>
        <p className="text-xs text-white/40 capitalize">
          {lastVisited.subjectId} · {TYPE_LABELS[lastVisited.type]} · {timeAgo(lastVisited.timestamp)}
        </p>
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl bg-[#6366F1]/20 px-4 py-2 text-sm font-bold text-[#818CF8] transition-transform group-hover:translate-x-0.5 shrink-0">
        Resume <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

// ─── Shared UI pieces ─────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6 ${className}`}>
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
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
  glow: string;
}) {
  const count = useCountUp(value);
  return (
    <div
      className="cosmic-glass-card relative overflow-hidden rounded-[1.75rem] border border-white/[0.10] p-5"
      style={{ ["--stat-glow" as string]: glow }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: `radial-gradient(circle at 26% 18%, ${glow}, transparent 62%)` }}
      />
      <div className="relative z-10">
        <span className="text-2xl">{icon}</span>
        <p className="mt-3 font-display text-3xl font-bold text-white">{count.toLocaleString()}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide" style={{ color }}>{label}</p>
      </div>
    </div>
  );
}

function TodayProgressGrid({
  notesStudied,
  quizzesCompleted,
  flashcardsMastered,
  totalXp,
}: {
  notesStudied: number;
  quizzesCompleted: number;
  flashcardsMastered: number;
  totalXp: number;
}) {
  return (
    <div className="mb-6">
      <SectionLabel className="mb-3">Today's Progress</SectionLabel>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <TodayStatGlassCard icon="📚" label="Notes Studied" value={notesStudied} color="#60A5FA" glow="rgba(96,165,250,0.45)" />
        <TodayStatGlassCard icon="📝" label="Quizzes Completed" value={quizzesCompleted} color="#34D399" glow="rgba(52,211,153,0.45)" />
        <TodayStatGlassCard icon="🎴" label="Flashcards Mastered" value={flashcardsMastered} color="#A78BFA" glow="rgba(167,139,250,0.45)" />
        <TodayStatGlassCard icon="⭐" label="Total XP Earned" value={totalXp} color="#FBBF24" glow="rgba(251,191,36,0.45)" />
      </div>
    </div>
  );
}

// ─── Subject Progress — planetary cards ────────────────────────────────────────

const SUBJECT_PLANET_THEME: Record<string, { label: string; color: string; glow: string }> = {
  bm:        { label: "Green Knowledge Planet",    color: "#22C55E", glow: "rgba(34,197,94,0.55)" },
  english:   { label: "Blue Communication Planet", color: "#3B82F6", glow: "rgba(59,130,246,0.55)" },
  math:      { label: "Purple Logic Planet",        color: "#A855F7", glow: "rgba(168,85,247,0.55)" },
  science:   { label: "Cyan Discovery Planet",       color: "#22D3EE", glow: "rgba(34,211,238,0.55)" },
  sejarah:   { label: "Amber Heritage Planet",       color: "#F59E0B", glow: "rgba(245,158,11,0.55)" },
  geography: { label: "Emerald Earth Planet",        color: "#10B981", glow: "rgba(16,185,129,0.55)" },
};

function SubjectPlanetCard({
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
  const theme = SUBJECT_PLANET_THEME[subject.id] ?? { label: "Mystery Planet", color: "#8B5CF6", glow: "rgba(139,92,246,0.5)" };
  const size = 80;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct / 100);

  return (
    <Link
      to="/notes"
      search={{ subject: subject.id, form: 1 } as Record<string, unknown>}
      className="cosmic-subject-card group relative flex flex-col items-center overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.18]"
      style={{ ["--planet-color" as string]: theme.color, ["--planet-glow" as string]: theme.glow }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 0%, ${theme.glow}, transparent 70%)` }}
      />
      <div className="relative z-10 animate-float-soft" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute inset-0 -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={theme.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(.2,.7,.3,1)" }}
          />
        </svg>
        <div className="cosmic-subject-planet-orb absolute inset-[8px] text-2xl">
          <span>{subject.emoji}</span>
        </div>
      </div>
      <p className="relative z-10 mt-3 text-sm font-bold text-white">{subject.name}</p>
      <p className="relative z-10 text-[9px] font-bold uppercase tracking-wide" style={{ color: theme.color }}>
        {theme.label}
      </p>
      <p className="relative z-10 mt-2 font-display text-xl font-bold text-white">{pct}%</p>
      {chapStarted > 0 && (
        <span className="relative z-10 mt-1 rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] font-semibold text-white/50">
          {chapDone}/{chapStarted} chapters
        </span>
      )}
    </Link>
  );
}

// ─── Cosmic Companion ───────────────────────────────────────────────────────────

function CosmicCompanionCard() {
  return (
    <Card className="relative overflow-hidden text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(circle at 50% 15%, rgba(167,139,250,0.32), transparent 65%)" }}
      />
      <div className="relative z-10">
        <SectionLabel className="mb-1">Your Cosmic Companion</SectionLabel>
        <p className="mb-5 text-[11px] text-white/40">Your companion evolves as you learn.</p>
        <div className="relative mx-auto flex h-32 w-32 items-end justify-center">
          <div className="cosmic-companion-pedestal absolute bottom-1 left-1/2 -translate-x-1/2" />
          <span className="cosmic-companion-egg relative z-10 mb-3 text-6xl">🥚</span>
        </div>
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

/** A glowing celestial body representing a single rank. */
function CosmicPlanet({
  rank,
  size = 56,
  current = false,
  dim = false,
}: {
  rank: SpaceRank;
  size?: number;
  current?: boolean;
  dim?: boolean;
}) {
  return (
    <div
      title={`${rank.name} · ${rank.minXp.toLocaleString()} XP`}
      className={`cosmic-planet ${current ? "cosmic-planet-current" : ""}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        opacity: dim ? 0.32 : 1,
        filter: dim ? "grayscale(0.65)" : "none",
        ["--planet-color" as string]: rank.color,
        ["--planet-glow" as string]: rank.glowColor,
      } as CSSProperties}
    >
      {current && (
        <>
          <span className="cosmic-planet-ring cosmic-planet-ring-outer" />
          <span className="cosmic-planet-ring cosmic-planet-ring-inner" />
        </>
      )}
      <span className="relative z-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]">{rank.emoji}</span>
    </div>
  );
}

/** Rocket progress bar — rocket position reflects XP progress toward the next rank. */
function RocketXpBar({ rank, nextRank, pct }: { rank: SpaceRank; nextRank: SpaceRank | null; pct: number }) {
  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
        <span>{rank.emoji} {rank.name}</span>
        <span>{nextRank ? `${nextRank.name} ${nextRank.emoji}` : "Max Rank"}</span>
      </div>
      <div className="cosmic-rocket-bar">
        <div className="cosmic-rocket-trail" style={{ width: `${pct}%` }} />
        <span className="cosmic-rocket-icon text-lg" style={{ left: `${pct}%` }}>🚀</span>
        <span className="cosmic-destination-star absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-base">
          {nextRank?.emoji ?? "🌟"}
        </span>
      </div>
    </div>
  );
}

/** Large premium hero card for the student's current cosmic rank. */
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
  const xpNeeded = nextRank ? Math.max(0, nextRank.minXp - xp) : 0;
  return (
    <Card className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: `radial-gradient(circle at 14% 22%, ${rank.glowColor}, transparent 58%)` }}
      />
      <div className="relative z-10">
        <SectionLabel>Cosmic Rank</SectionLabel>
        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* LEFT — animated glowing planet */}
          <div className="flex shrink-0 items-center justify-center" style={{ width: 132, height: 132 }}>
            <CosmicPlanet rank={rank} size={104} current />
          </div>

          {/* CENTER — rank identity */}
          <div className="flex-1 min-w-0">
            <p
              className="font-display text-2xl font-bold sm:text-3xl"
              style={{ color: rank.color, textShadow: `0 0 26px ${rank.glowColor}` }}
            >
              {rank.emoji} {rank.name}
            </p>
            <p className="mt-1 text-sm italic text-[#94A3B8]">"{rank.description}"</p>
            <p className="mt-3 text-sm font-bold text-white">
              XP: <span style={{ color: rank.color }}>{xp.toLocaleString()}</span>
            </p>
          </div>

          {/* RIGHT — next evolution preview */}
          {nextRank && (
            <div className="shrink-0 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-4 text-center sm:min-w-[164px]">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Next Evolution</p>
              <p className="mt-1 text-base font-bold" style={{ color: nextRank.color }}>
                {nextRank.emoji} {nextRank.name}
              </p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">XP Needed</p>
              <p className="mt-0.5 font-display text-xl font-bold text-white">{xpNeeded.toLocaleString()}</p>
            </div>
          )}
        </div>

        <RocketXpBar rank={rank} nextRank={nextRank} pct={rankPct} />
      </div>
    </Card>
  );
}

/** Horizontal cosmic journey — orbit-connected planets from Cadet to Cosmic Legend. */
function CosmicJourneyPath({ ranks, currentId, xp }: { ranks: SpaceRank[]; currentId: string; xp: number }) {
  return (
    <Card className="relative overflow-hidden">
      <SectionLabel>Cosmic Journey</SectionLabel>
      <div className="relative mt-6 overflow-x-auto pb-2">
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

        <div className="relative z-10 flex min-w-max items-center gap-1 px-2">
          {ranks.map((r, i) => {
            const done = xp >= r.minXp;
            const isCurrent = r.id === currentId;
            const next = ranks[i + 1];
            const nextDone = next ? xp >= next.minXp : false;
            return (
              <div key={r.id} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <CosmicPlanet rank={r} size={isCurrent ? 64 : 44} current={isCurrent} dim={!done} />
                  <span
                    className="max-w-[76px] text-center text-[9px] font-bold leading-tight"
                    style={{ color: isCurrent ? r.color : done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.28)" }}
                  >
                    {r.name}
                  </span>
                </div>
                {next && (
                  <span
                    className="cosmic-journey-line mx-1 w-10 shrink-0 sm:w-14"
                    style={{
                      ["--from-color" as string]: done ? r.color : "rgba(255,255,255,0.08)",
                      ["--to-color" as string]: nextDone ? next.color : "rgba(255,255,255,0.08)",
                    } as CSSProperties}
                  />
                )}
              </div>
            );
          })}
        </div>
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
