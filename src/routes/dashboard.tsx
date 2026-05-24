import { createFileRoute } from "@tanstack/react-router";
import { useProgress } from "@/hooks/use-progress";
import { subjects, badges } from "@/data/content";
import { Flame, Trophy, Zap, Target, Sparkles } from "lucide-react";

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

// fake leaderboard with the user injected
const leaderboardSeed = [
  { name: "Aisyah", xp: 1240 },
  { name: "Daniel", xp: 980 },
  { name: "Mei Ling", xp: 870 },
  { name: "Arjun", xp: 720 },
  { name: "Hafiz", xp: 540 },
];

function DashboardPage() {
  const { progress } = useProgress();

  const level = Math.floor(progress.xp / 100) + 1;
  const intoLevel = progress.xp % 100;

  const board = [...leaderboardSeed, { name: "You", xp: progress.xp }]
    .sort((a, b) => b.xp - a.xp);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      <div className="mb-10">
        <h1 className="font-display text-5xl font-bold">Your <span className="gradient-text">Dashboard</span></h1>
        <p className="mt-3 text-muted-foreground">Stay consistent. Watch yourself level up.</p>
      </div>

      {/* top stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Zap className="w-5 h-5" />} label="Total XP" value={progress.xp} color="from-blue-500 to-indigo-500" />
        <StatCard icon={<Flame className="w-5 h-5" />} label="Day Streak" value={progress.streak} color="from-orange-500 to-rose-500" />
        <StatCard icon={<Target className="w-5 h-5" />} label="Quizzes Done" value={progress.quizzesTaken} color="from-emerald-500 to-teal-500" />
        <StatCard icon={<Trophy className="w-5 h-5" />} label="Badges" value={progress.badges.length} color="from-amber-500 to-yellow-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Level card */}
        <div className="lg:col-span-2 glass-strong rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs text-muted-foreground font-semibold">CURRENT LEVEL</p>
              <p className="font-display text-3xl font-bold">Level {level}</p>
            </div>
            <Sparkles className="w-8 h-8 text-nova-yellow" />
          </div>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${intoLevel}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{intoLevel}/100 XP to Level {level + 1}</p>

          {/* subject progress */}
          <div className="mt-8 space-y-3">
            <p className="text-xs text-muted-foreground font-semibold">SUBJECT PROGRESS</p>
            {subjects.map((s) => {
              const xp = progress.subjectXp[s.id] || 0;
              const pct = Math.min(100, (xp / 200) * 100);
              return (
                <div key={s.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{s.emoji} {s.name}</span>
                    <span className="text-muted-foreground">{xp} XP</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${s.color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Daily challenge */}
          <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-nova-yellow/20 blur-3xl rounded-full" />
            <p className="text-xs text-muted-foreground font-semibold">DAILY CHALLENGE</p>
            <h3 className="font-display text-xl font-bold mt-1">Answer 5 quizzes today</h3>
            <p className="text-sm text-muted-foreground mt-2">Reward: +50 XP & streak boost</p>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-nova-yellow to-orange-500" style={{ width: `${Math.min(100, (progress.quizzesTaken % 5) * 20)}%` }} />
            </div>
          </div>

          {/* Badges */}
          <div className="glass-strong rounded-2xl p-6">
            <p className="text-xs text-muted-foreground font-semibold mb-4">ACHIEVEMENTS</p>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((b) => {
                const unlocked = progress.badges.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`rounded-xl p-3 text-center border ${
                      unlocked
                        ? "bg-gradient-to-br from-primary/20 to-accent/20 border-accent/40"
                        : "bg-white/5 border-white/10 opacity-50"
                    }`}
                  >
                    <div className="text-3xl">{b.emoji}</div>
                    <p className="text-xs font-semibold mt-1">{b.name}</p>
                    <p className="text-[10px] text-muted-foreground">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="mt-8 glass-strong rounded-2xl p-6">
        <p className="text-xs text-muted-foreground font-semibold mb-4">🏆 LEADERBOARD</p>
        <ul className="space-y-2">
          {board.map((u, i) => (
            <li
              key={u.name}
              className={`flex items-center justify-between p-3 rounded-xl ${
                u.name === "You" ? "bg-gradient-to-r from-primary/20 to-accent/20 border border-accent/30" : "bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${
                  i === 0 ? "bg-yellow-400 text-black" : i === 1 ? "bg-gray-300 text-black" : i === 2 ? "bg-orange-400 text-black" : "bg-white/10"
                }`}>{i + 1}</span>
                <span className="font-medium">{u.name}</span>
              </div>
              <span className="font-bold text-nova-yellow">{u.xp} XP</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3`}>
        {icon}
      </div>
      <p className="text-xs text-muted-foreground font-semibold">{label.toUpperCase()}</p>
      <p className="font-display text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
