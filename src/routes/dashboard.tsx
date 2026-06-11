import { createFileRoute } from "@tanstack/react-router";
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
  Lock,
  ArrowRight,
} from "lucide-react";
import { AcademyHero, AcademyPageShell } from "@/components/AcademyPage";
import { Link } from "@tanstack/react-router";

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

// Demo leaderboard — injected with real "You" entry
const leaderboardSeed = [
  { name: "Aisyah",   xp: 1240 },
  { name: "Daniel",   xp: 980  },
  { name: "Mei Ling", xp: 870  },
  { name: "Arjun",    xp: 720  },
  { name: "Hafiz",    xp: 540  },
];

function DashboardPage() {
  const { progress } = useProgress();
  const rank       = getRank(progress.xp);
  const nextRank   = getNextRank(progress.xp);
  const rankPct    = getRankProgress(progress.xp);
  const completed  = totalChaptersCompleted(progress.chapterActivity);
  const board      = [...leaderboardSeed, { name: "You", xp: progress.xp }].sort((a, b) => b.xp - a.xp);

  const todayDate = new Date().toISOString().slice(0, 10);
  const missionsActive = progress.missions?.dailyDate === todayDate;

  return (
    <AcademyPageShell>
      <AcademyHero
        eyebrow="Progress command center"
        title="Your"
        gradientTitle="Dashboard"
        description="Stay consistent, track mastery, and watch your AcadeMy progress level up."
        stats={[
          { label: "Total XP",    value: progress.xp,          tone: "text-[#60A5FA]" },
          { label: "Day Streak",  value: progress.streak,      tone: "text-[#F97316]" },
          { label: "Quizzes",     value: progress.quizzesTaken, tone: "text-[#34D399]" },
        ]}
      />

      {/* ── Top stat cards ───────────────────────────────────────── */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Zap className="h-5 w-5" />}    label="Total XP"       value={progress.xp}           color="from-blue-500 to-indigo-500" />
        <StatCard icon={<Flame className="h-5 w-5" />}  label="Day Streak"     value={progress.streak}       color="from-orange-500 to-rose-500" />
        <StatCard icon={<Target className="h-5 w-5" />} label="Quizzes Done"   value={progress.quizzesTaken} color="from-emerald-500 to-teal-500" />
        <StatCard icon={<Trophy className="h-5 w-5" />} label="Badges Earned"  value={progress.badges.length} color="from-amber-500 to-yellow-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Left: Rank + subject progress ──────────────────────── */}
        <div className="space-y-6 lg:col-span-2">

          {/* Space rank card */}
          <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Space Rank</p>

            {/* Current rank + XP bar */}
            <div className="flex items-center gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
                style={{ background: `${rank.color}18`, boxShadow: `0 0 20px ${rank.color}44` }}
              >
                {rank.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-xl font-bold" style={{ color: rank.color }}>{rank.name}</p>
                <p className="text-xs text-[#94A3B8]">{rank.description} • {progress.xp.toLocaleString()} XP</p>
                {nextRank && (
                  <div className="mt-2">
                    <div className="mb-1 flex justify-between text-[10px] text-[#94A3B8]">
                      <span>{rank.name}</span>
                      <span>{nextRank.emoji} {nextRank.name} at {nextRank.minXp.toLocaleString()} XP</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className="h-full rounded-full transition-all duration-700 animate-progress-fill"
                        style={{ width: `${rankPct}%`, background: `linear-gradient(90deg, ${rank.color}, ${nextRank.color})` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rank road-map */}
            <div className="mt-6 overflow-x-auto">
              <div className="flex min-w-max items-center gap-1 pb-1">
                {SPACE_RANKS.map((r, i) => {
                  const done = progress.xp >= r.minXp;
                  const current = r.id === rank.id;
                  return (
                    <div key={r.id} className="flex items-center">
                      <div
                        title={`${r.name} (${r.minXp.toLocaleString()} XP)`}
                        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg transition-all ${
                          current
                            ? "scale-110 border-2 shadow-lg"
                            : done
                            ? "opacity-80"
                            : "opacity-30 grayscale"
                        }`}
                        style={current ? { borderColor: r.color, boxShadow: `0 0 16px ${r.color}66` } : { borderColor: "rgba(255,255,255,0.1)" }}
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
          </div>

          {/* Subject progress */}
          <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Subject Progress</p>
              <Link to="/notes" className="text-xs font-bold text-[#94A3B8] hover:text-white transition-colors">
                Study Now →
              </Link>
            </div>
            <div className="space-y-4">
              {subjects.map((s) => {
                const xp   = progress.subjectXp[s.id] || 0;
                const acts = Object.entries(progress.chapterActivity)
                  .filter(([k]) => k.startsWith(`${s.id}:`))
                  .map(([, v]) => v);
                const chapDone = acts.filter((a) => a.read && a.quiz && a.cards).length;
                const pct  = Math.min(100, Math.round((xp / 500) * 100));
                return (
                  <div key={s.id}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <span>{s.emoji}</span>
                        {s.name}
                      </span>
                      <span className="flex items-center gap-2 text-[#94A3B8]">
                        {chapDone > 0 && (
                          <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px]">
                            {chapDone} chapters
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
          </div>

          {/* Chapters mastered */}
          <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Chapters Mastered</p>
                <p className="mt-1 font-display text-4xl font-bold">{completed}</p>
              </div>
              <BookOpen className="h-8 w-8 text-[#8B5CF6]" />
            </div>
            <p className="mt-2 text-sm text-[#94A3B8]">
              {completed === 0
                ? "Start learning to earn your first master badge!"
                : `${completed} chapter${completed !== 1 ? "s" : ""} fully completed (notes + quiz + flashcards)`}
            </p>
          </div>
        </div>

        {/* ── Right column ──────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Daily missions */}
          <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl">
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-4 w-4 text-[#FBBF24]" />
              <p className="font-bold">Daily Missions</p>
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
                const pct  = Math.min(100, Math.round((current / mission.target) * 100));
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
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{mission.label}</span>
                          <span className="rounded-full bg-[#FBBF24]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#FBBF24]">
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
          </div>

          {/* Badges */}
          <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Achievements</p>
            <div className="grid grid-cols-3 gap-2.5">
              {ALL_BADGES.map((badge) => {
                const unlocked = progress.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    title={`${badge.name}: ${badge.description}`}
                    className={`flex flex-col items-center gap-1 rounded-xl border p-2.5 text-center transition-all ${
                      unlocked
                        ? "border-white/[0.12] bg-gradient-to-br from-white/[0.06] to-white/[0.02]"
                        : "border-white/[0.05] bg-white/[0.02] opacity-35 grayscale"
                    }`}
                  >
                    <span className="text-xl">{unlocked ? badge.emoji : "🔒"}</span>
                    <span
                      className="text-[9px] font-bold leading-tight"
                      style={{ color: unlocked ? badge.color : "#94A3B8" }}
                    >
                      {badge.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Leaderboard ──────────────────────────────────────────── */}
      <div className="mt-8 rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">🏆 Leaderboard</p>
        <ul className="space-y-2">
          {board.map((u, i) => {
            const isYou = u.name === "You";
            const medal =
              i === 0 ? "bg-yellow-400 text-black" :
              i === 1 ? "bg-gray-300 text-black" :
              i === 2 ? "bg-orange-400 text-black" :
              "bg-white/10 text-white";
            return (
              <li
                key={u.name}
                className={`flex items-center justify-between rounded-xl p-3 ${
                  isYou
                    ? "bg-gradient-to-r from-primary/20 to-accent/20 border border-accent/30"
                    : "bg-white/[0.04] border border-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${medal}`}>
                    {i + 1}
                  </span>
                  <span className={`font-medium ${isYou ? "text-white" : "text-slate-200"}`}>
                    {u.name} {isYou && <span className="text-xs text-[#94A3B8]">(you)</span>}
                  </span>
                </div>
                <span className="font-bold text-[#FBBF24]">{u.xp.toLocaleString()} XP</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-center text-xs text-[#94A3B8]">
          Leaderboard updates as you earn XP from quizzes and chapters
        </p>
      </div>
    </AcademyPageShell>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl transition-all hover:-translate-y-1">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white`}>
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-1 font-display text-4xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}
