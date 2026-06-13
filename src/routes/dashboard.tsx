import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
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
} from "@/hooks/use-progress";
import { subjects } from "@/data/content";
import {
  Flame,
  Trophy,
  Zap,
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
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.03] active:scale-[0.98]"
        >
          Study Now <ArrowRight className="h-4 w-4" />
        </Link>
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

      {/* ── Stats row ─────────────────────────────────────────────────── */}
      <div className="mb-6 grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Zap className="h-5 w-5" />}       label="Total XP"       value={progress.xp}            color="from-blue-500 to-indigo-500" />
        <StatCard icon={<Flame className="h-5 w-5" />}     label="Day Streak"     value={progress.streak}        color="from-orange-500 to-rose-500" />
        <StatCard icon={<Target className="h-5 w-5" />}    label="Quizzes Done"   value={progress.quizzesTaken}  color="from-emerald-500 to-teal-500" />
        <StatCard icon={<Trophy className="h-5 w-5" />}    label="Cards Mastered" value={masteredCount}          color="from-amber-500 to-yellow-500" />
      </div>

      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Left column (2/3) ── */}
        <div className="space-y-6 lg:col-span-2">

          {/* Space Rank */}
          <Card>
            <SectionLabel>Space Rank</SectionLabel>
            <div className="flex items-center gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
                style={{ background: `${rank.color}18`, boxShadow: `0 0 20px ${rank.color}44` }}
              >
                {rank.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-xl font-bold" style={{ color: rank.color }}>{rank.name}</p>
                <p className="text-xs text-[#94A3B8]">{rank.description} · {progress.xp.toLocaleString()} XP</p>
                {nextRank && (
                  <div className="mt-2">
                    <div className="mb-1 flex justify-between text-[10px] text-[#94A3B8]">
                      <span>{rank.name}</span>
                      <span>{nextRank.emoji} {nextRank.name} at {nextRank.minXp.toLocaleString()} XP</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${rankPct}%`, background: `linear-gradient(90deg, ${rank.color}, ${nextRank.color})` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Rank road-map */}
            <div className="mt-5 overflow-x-auto">
              <div className="flex min-w-max items-center gap-1 pb-1">
                {SPACE_RANKS.map((r, i) => {
                  const done = progress.xp >= r.minXp;
                  const isCurrent = r.id === rank.id;
                  return (
                    <div key={r.id} className="flex items-center">
                      <div
                        title={`${r.name} (${r.minXp.toLocaleString()} XP)`}
                        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-base transition-all ${
                          isCurrent ? "scale-110 border-2 shadow-lg" : done ? "opacity-80" : "opacity-30 grayscale"
                        }`}
                        style={isCurrent ? { borderColor: r.color, boxShadow: `0 0 16px ${r.color}66` } : { borderColor: "rgba(255,255,255,0.1)" }}
                      >
                        {r.emoji}
                      </div>
                      {i < SPACE_RANKS.length - 1 && (
                        <div className={`h-0.5 w-5 rounded-full ${done ? "bg-white/30" : "bg-white/[0.08]"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Subject Progress */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <SectionLabel>Subject Progress</SectionLabel>
              <Link to="/notes" className="text-xs font-bold text-[#94A3B8] hover:text-white transition-colors">
                Study Now →
              </Link>
            </div>
            <div className="space-y-4">
              {subjects.map((s) => {
                const xp = progress.subjectXp[s.id] ?? 0;
                const acts = Object.entries(progress.chapterActivity)
                  .filter(([k]) => k.startsWith(`${s.id}:`))
                  .map(([, v]) => v);
                const chapDone = acts.filter((a) => a.read && a.quiz && a.cards).length;
                const chapStarted = acts.filter((a) => a.read || a.quiz || a.cards).length;
                const pct = Math.min(100, Math.round((xp / 500) * 100));
                return (
                  <div key={s.id}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <span>{s.emoji}</span>{s.name}
                      </span>
                      <span className="flex items-center gap-2 text-[#94A3B8] text-xs">
                        {chapStarted > 0 && (
                          <span className="rounded-full bg-white/[0.06] px-2 py-0.5">
                            {chapDone}/{chapStarted} chapters
                          </span>
                        )}
                        <span className="font-bold text-white">{xp} XP</span>
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
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

function StatCard({ icon, label, value, color }: { icon: ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl transition-all hover:-translate-y-1">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white`}>
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-white">{value.toLocaleString()}</p>
    </div>
  );
}
