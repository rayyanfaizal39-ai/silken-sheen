import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Trophy,
  Crown,
  Sparkles,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { useProgress, getRank } from "@/hooks/use-progress";
import { useAuth } from "@/context/auth-context";
import { Avatar } from "@/components/Avatar";
import { buildLeaderboard, type RankedStudent } from "@/lib/leaderboard";
import { getLeaderboardData, type LeaderboardData, type LeaderboardStudentRow } from "./-leaderboard.server";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/leaderboard")({
  head: () => seoMeta({
    title: "Galaxy Hall of Fame — KSSM Leaderboard",
    description: "Real monthly XP rankings — top 100 KSSM students on AcadeMY, refreshed every season.",
    path: "/leaderboard",
    keywords: ["KSSM leaderboard", "student rankings Malaysia", "Malaysia learning platform"],
  }),
  loader: async () => {
    try {
      return { leaderboard: await getLeaderboardData() };
    } catch (e) {
      console.error("[leaderboard] loader failed:", e);
      return { leaderboard: null as LeaderboardData | null };
    }
  },
  component: LeaderboardPage,
});

const MEDALS = ["#FBBF24", "#CBD5E1", "#FB923C"]; // gold / silver / bronze

// ── A single ranked row derived from the real get_leaderboard() RPC ─────────
interface RealRankedStudent {
  id: string;
  rank: number;
  name: string;
  school: string;
  lifetimeXp: number;
  monthlyXp: number;
  monthlyQuizCount: number;
  monthlyAccuracy: number | null; // null = no quiz data this month, never fabricated
  streak: number | null; // null = no user_progress row yet
  isCurrentUser: boolean;
}

function rankRealStudents(data: LeaderboardData, currentUserId?: string): RealRankedStudent[] {
  return data.students.map((s: LeaderboardStudentRow, i: number) => ({
    id: s.id,
    rank: i + 1,
    name: s.full_name?.trim() || "Unnamed student",
    school: s.school?.trim() || "—",
    lifetimeXp: s.lifetime_xp,
    monthlyXp: s.monthly_xp,
    monthlyQuizCount: s.monthly_quiz_count,
    monthlyAccuracy: s.monthly_total > 0 ? Math.round((s.monthly_correct / s.monthly_total) * 100) : null,
    streak: s.streak,
    isCurrentUser: s.id === currentUserId,
  }));
}

function top3Label(rank: number): string | null {
  if (rank === 1) return "Champion";
  if (rank <= 3) return "Top 3";
  if (rank <= 10) return "Top 10";
  return null;
}

function LeaderboardPage() {
  const { leaderboard: loaderLeaderboard } = Route.useLoaderData() as { leaderboard: LeaderboardData | null };
  const { user } = useAuth();
  const { progress } = useProgress();

  // The route loader only runs once at initial navigation. If the student
  // signs in *after* that (client-side, no hard refresh), the loader's
  // `leaderboard: null` result is stale — self-heal by re-fetching once we
  // see a real signed-in user but no real board yet.
  const [clientLeaderboard, setClientLeaderboard] = useState<LeaderboardData | null>(null);
  const leaderboard = loaderLeaderboard ?? clientLeaderboard;

  useEffect(() => {
    if (leaderboard || !user) return;
    let alive = true;
    getLeaderboardData()
      .then((data) => {
        if (alive && data) setClientLeaderboard(data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [leaderboard, user?.id]);

  const realRanked = useMemo(
    () => (leaderboard ? rankRealStudents(leaderboard, user?.id) : null),
    [leaderboard, user?.id],
  );

  if (realRanked) {
    return <GalaxyHallOfFame ranked={realRanked} month={leaderboard!.month} />;
  }

  // ── Fallback: no signed-in session / RPC unavailable — the original
  // local-progress + seeded-cohort board, kept fully intact so the page is
  // never blank (this is the "do not break the current leaderboard
  // backend" guarantee: buildLeaderboard/COHORT are untouched below). ──
  return <LegacyLocalLeaderboard progress={progress} userName={user?.name} />;
}

// ── Galaxy Hall of Fame — real Supabase data ─────────────────────────────────

function GalaxyHallOfFame({ ranked, month }: { ranked: RealRankedStudent[]; month: string }) {
  const me = ranked.find((s) => s.isCurrentUser) ?? null;
  const hasMonthlyActivity = ranked.some((s) => s.monthlyQuizCount > 0);
  const podium = ranked.slice(0, 3);
  const rest = ranked.slice(3, 100);
  const myIdx = me ? ranked.findIndex((s) => s.id === me.id) : -1;
  const nextAbove = myIdx > 0 ? ranked[myIdx - 1] : null;
  const xpToNext = nextAbove && me ? Math.max(0, nextAbove.monthlyXp - me.monthlyXp) : null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10 space-y-6">
      {/* ── Header: Galaxy Hall of Fame + season ── */}
      <header className="relative overflow-hidden rounded-[2rem] border border-[#7C3AED]/30 bg-gradient-to-br from-[#3B0764]/30 via-[#0B1220]/70 to-[#312E81]/30 p-6 backdrop-blur-2xl sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35),transparent_60%)] blur-2xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_60%)] blur-2xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] shadow-[0_0_28px_rgba(124,58,237,0.55)]">
              <Rocket className="h-7 w-7 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#C4B5FD]">
                Galaxy Hall of Fame
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                Cosmic Leaderboard
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                Real monthly XP, refreshed live from every student's quizzes this season.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#C4B5FD]">
            <Sparkles className="h-3.5 w-3.5" /> Season · {month}
          </span>
        </div>
      </header>

      {/* ── Student rank card ── */}
      {me ? (
        <StudentRankCard student={me} xpToNext={xpToNext} nextAboveName={nextAbove?.name ?? null} />
      ) : (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-4 text-center text-sm text-white/50 backdrop-blur-xl">
          Sign in as a student to see your position on the Galaxy Hall of Fame.
        </div>
      )}

      {/* ── No activity this month empty state ── */}
      {!hasMonthlyActivity && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-4 text-center text-sm text-white/50 backdrop-blur-xl">
          No quiz activity yet this month. Monthly rankings will update as students complete
          quizzes in {month}.
        </div>
      )}

      {/* ── Cosmic Champion + floating top 3 ── */}
      {podium.length > 0 && (
        <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
            <Crown className="h-5 w-5 text-[#FBBF24]" /> Cosmic Champion
          </h2>
          <div className="grid grid-cols-3 items-end gap-3">
            {[1, 0, 2].map((slot) => {
              const s = podium[slot];
              if (!s) return <div key={slot} />;
              const heights = ["h-24", "h-32", "h-20"];
              const hi = slot === 0 ? 1 : slot === 1 ? 0 : 2;
              const cosmicRank = getRank(s.lifetimeXp);
              const label = top3Label(s.rank);
              return (
                <div key={s.id} className="flex flex-col items-center">
                  <PodiumAvatar student={s} medal={MEDALS[slot]} rankGlow={cosmicRank.glowColor} />
                  {label && (
                    <span
                      className="mt-2 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide"
                      style={{ background: `${MEDALS[slot]}22`, color: MEDALS[slot] }}
                    >
                      {label}
                    </span>
                  )}
                  <p className="mt-1 max-w-full truncate text-center text-xs font-bold text-white">
                    {s.name}
                  </p>
                  <p className="max-w-full truncate text-center text-[10px] text-white/40">{s.school}</p>
                  <CosmicRankBadge xp={s.lifetimeXp} small />
                  <div
                    className={`mt-2 flex ${heights[hi]} w-full flex-col items-center justify-start rounded-t-xl border-t-2 pt-2`}
                    style={{
                      borderColor: MEDALS[slot],
                      background: `linear-gradient(180deg, ${MEDALS[slot]}22, transparent)`,
                    }}
                  >
                    <span className="font-display text-2xl font-black" style={{ color: MEDALS[slot] }}>
                      #{s.rank}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-white/70">
                      <Sparkles className="h-3 w-3 text-[#FBBF24]" /> {s.monthlyXp.toLocaleString()} XP
                    </span>
                    <span className="text-[9px] text-white/35">this month</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Top 100 table ── */}
      <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-3 backdrop-blur-2xl sm:p-4">
        <h2 className="px-2 py-2 font-display text-lg font-bold text-white">Full ranking · Top 100</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wide text-white/35">
                <th className="px-2 py-2">Rank</th>
                <th className="px-2 py-2">Student</th>
                <th className="px-2 py-2">School</th>
                <th className="px-2 py-2 text-right">Monthly XP</th>
                <th className="px-2 py-2 text-right">Quizzes</th>
                <th className="px-2 py-2 text-right">Accuracy</th>
                <th className="px-2 py-2 text-right">Streak</th>
                <th className="px-2 py-2">Cosmic Rank</th>
                <th className="px-2 py-2 text-right">Movement</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((s) => (
                <RankTableRow key={s.id} student={s} />
              ))}
              {me && me.rank > 100 && (
                <>
                  <tr>
                    <td colSpan={9} className="px-2 py-1 text-center text-xs text-white/30">
                      · · ·
                    </td>
                  </tr>
                  <RankTableRow student={me} />
                </>
              )}
            </tbody>
          </table>
        </div>
        {!ranked.length && (
          <p className="px-2 py-6 text-center text-sm text-white/40">
            No students found. Rankings will appear once students begin learning.
          </p>
        )}
      </section>
    </section>
  );
}

function StudentRankCard({
  student,
  xpToNext,
  nextAboveName,
}: {
  student: RealRankedStudent;
  xpToNext: number | null;
  nextAboveName: string | null;
}) {
  const cosmicRank = getRank(student.lifetimeXp);
  const label = top3Label(student.rank);
  return (
    <div
      className="flex flex-wrap items-center gap-4 rounded-2xl border px-4 py-4 backdrop-blur-xl"
      style={{ borderColor: `${cosmicRank.color}44`, background: cosmicRank.glowColor }}
    >
      <span className="text-2xl">{cosmicRank.emoji}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-white/60">Your position</p>
        <p className="font-display text-xl font-black" style={{ color: cosmicRank.color }}>
          #{student.rank}{" "}
          <span className="text-sm font-bold opacity-70">
            · {student.monthlyXp.toLocaleString()} monthly XP
          </span>
        </p>
        {label && (
          <span className="mt-1 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white/70">
            {label}
          </span>
        )}
      </div>
      <div className="text-right">
        <p className="flex items-center justify-end gap-1 text-[10px] text-white/40">
          <TrendingUp className="h-3 w-3" /> XP to next rank
        </p>
        <p className="font-display text-lg font-black text-white">
          {xpToNext == null ? "—" : xpToNext === 0 ? "Tied!" : `${xpToNext.toLocaleString()} XP`}
        </p>
        {nextAboveName && xpToNext !== null && xpToNext > 0 && (
          <p className="text-[10px] text-white/35">to pass {nextAboveName}</p>
        )}
      </div>
      <div className="flex gap-4 border-l border-white/10 pl-4 text-right text-[11px] text-white/50">
        <div>
          <p className="uppercase tracking-wide text-white/35">Accuracy</p>
          <p className="font-bold text-white">
            {student.monthlyAccuracy == null ? "—" : `${student.monthlyAccuracy}%`}
          </p>
        </div>
        <div>
          <p className="uppercase tracking-wide text-white/35">Streak</p>
          <p className="font-bold text-white">{student.streak == null ? "—" : `${student.streak}d`}</p>
        </div>
      </div>
    </div>
  );
}

function CosmicRankBadge({ xp, small = false }: { xp: number; small?: boolean }) {
  const r = getRank(xp);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-black ${small ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]"}`}
      style={{
        background: `${r.color}18`,
        border: `1px solid ${r.color}44`,
        color: r.color,
        boxShadow: `0 0 6px ${r.glowColor}`,
      }}
    >
      {r.emoji} {r.name}
    </span>
  );
}

function PodiumAvatar({
  student,
  medal,
  rankGlow,
}: {
  student: RealRankedStudent;
  medal: string;
  rankGlow: string;
}) {
  return (
    <div className="relative">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl border-2"
        style={{ borderColor: medal, boxShadow: `0 0 22px ${medal}66`, background: `${medal}1a` }}
      >
        <span className="font-display text-xl font-black text-white">{student.name[0]}</span>
      </div>
      <span
        className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[#050816]"
        style={{ background: medal }}
      >
        <Crown className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

function RankTableRow({ student }: { student: RealRankedStudent }) {
  const r = getRank(student.lifetimeXp);
  const label = top3Label(student.rank);
  return (
    <tr
      className={student.isCurrentUser ? "bg-[#7C3AED]/10" : "odd:bg-white/[0.015]"}
    >
      <td className="px-2 py-2.5 font-display font-black tabular-nums text-white/70">#{student.rank}</td>
      <td className="px-2 py-2.5">
        <div className="flex items-center gap-2">
          <span className="truncate font-bold text-white">{student.name}</span>
          {student.isCurrentUser && (
            <span className="shrink-0 text-[10px] font-black uppercase text-[#C4B5FD]">You</span>
          )}
          {label && (
            <span className="hidden shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white/60 sm:inline-block">
              {label}
            </span>
          )}
        </div>
      </td>
      <td className="px-2 py-2.5 truncate text-white/40">{student.school}</td>
      <td className="px-2 py-2.5 text-right font-bold tabular-nums text-white">
        {student.monthlyXp.toLocaleString()}
      </td>
      <td className="px-2 py-2.5 text-right tabular-nums text-white/50">{student.monthlyQuizCount}</td>
      <td className="px-2 py-2.5 text-right tabular-nums text-white/50">
        {student.monthlyAccuracy == null ? "—" : `${student.monthlyAccuracy}%`}
      </td>
      <td className="px-2 py-2.5 text-right tabular-nums text-white/50">
        {student.streak == null ? "—" : `${student.streak}d`}
      </td>
      <td className="px-2 py-2.5">
        <span className="flex items-center gap-1 text-xs font-black tabular-nums" style={{ color: r.color }}>
          {r.emoji} {r.name}
        </span>
      </td>
      <td className="px-2 py-2.5 text-right text-white/30">—</td>
    </tr>
  );
}

// ── Legacy fallback board (unchanged engine: buildLeaderboard + COHORT) ──────
// Rendered only when there's no real Supabase session/data, so the page is
// never blank. This is the "do not break the current leaderboard backend"
// guarantee — everything below is the pre-existing implementation.

function LegacyLocalLeaderboard({
  progress,
  userName,
}: {
  progress: ReturnType<typeof useProgress>["progress"];
  userName?: string;
}) {
  const board = useMemo(() => buildLeaderboard(progress, userName), [progress, userName]);
  const me = board.currentUser;

  const podium = board.ranked.slice(0, 3);
  const rest = board.ranked.slice(3, 100);
  const myRank = getRank(progress.xp);

  return (
    <section className="mx-auto max-w-4xl px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10 space-y-6">
      <header className="relative overflow-hidden rounded-[2rem] border border-[#7C3AED]/30 bg-gradient-to-br from-[#3B0764]/30 via-[#0B1220]/70 to-[#312E81]/30 p-6 backdrop-blur-2xl sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.3),transparent_60%)] blur-2xl" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] shadow-[0_0_28px_rgba(124,58,237,0.55)]">
            <Trophy className="h-7 w-7 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#C4B5FD]">
              Hall of Fame · Top 100
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
              AcadeMy Cosmic Leaderboard
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
              Sign in to see the real Galaxy Hall of Fame. Meanwhile, here's a preview using your
              local progress against a demo cohort.
            </p>
          </div>
        </div>
      </header>

      {me && (
        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-xl"
          style={{ borderColor: `${myRank.color}44`, background: `${myRank.glowColor}` }}
        >
          <span className="text-2xl">{myRank.emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white/60">Your Cosmic Rank</p>
            <p className="font-display text-xl font-black" style={{ color: myRank.color }}>
              {myRank.name}{" "}
              <span className="text-sm font-bold opacity-70">· {progress.xp.toLocaleString()} XP</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/40">Hall of Fame</p>
            <p className="font-display text-lg font-black text-white">#{me.rank}</p>
          </div>
        </div>
      )}

      <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
        <div className="grid grid-cols-3 items-end gap-3">
          {[1, 0, 2].map((slot) => {
            const s = podium[slot];
            if (!s) return <div key={slot} />;
            const heights = ["h-24", "h-32", "h-20"];
            const hi = slot === 0 ? 1 : slot === 1 ? 0 : 2;
            const studentRank = getRank(s.xp);
            return (
              <div key={s.id} className="flex flex-col items-center">
                <LegacyPodiumAvatar
                  student={s}
                  medal={MEDALS[slot]}
                  isMe={s.isCurrentUser}
                  avatarConfig={progress.avatar}
                  rankGlow={studentRank.glowColor}
                />
                <p className="mt-2 max-w-full truncate text-center text-xs font-bold text-white">
                  {s.name}
                </p>
                <p className="max-w-full truncate text-center text-[10px] text-white/40">{s.school}</p>
                <CosmicRankBadge xp={s.xp} small />
                <div
                  className={`mt-2 flex ${heights[hi]} w-full flex-col items-center justify-start rounded-t-xl border-t-2 pt-2`}
                  style={{
                    borderColor: MEDALS[slot],
                    background: `linear-gradient(180deg, ${MEDALS[slot]}22, transparent)`,
                  }}
                >
                  <span className="font-display text-2xl font-black" style={{ color: MEDALS[slot] }}>
                    #{s.rank}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-white/70">
                    <Sparkles className="h-3 w-3 text-[#FBBF24]" /> {s.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-3 backdrop-blur-2xl sm:p-4">
        <h2 className="px-2 py-2 font-display text-lg font-bold text-white">Full ranking · Top 100</h2>
        <ul className="space-y-1.5">
          {rest.map((s) => (
            <LegacyRankRow key={s.id} student={s} avatarConfig={progress.avatar} />
          ))}
        </ul>
        {me && me.rank > 100 && (
          <>
            <p className="px-2 py-1 text-center text-xs text-white/30">· · ·</p>
            <LegacyRankRow student={me} avatarConfig={progress.avatar} />
          </>
        )}
      </section>
    </section>
  );
}

function LegacyPodiumAvatar({
  student,
  medal,
  isMe,
  avatarConfig,
  rankGlow,
}: {
  student: RankedStudent;
  medal: string;
  isMe: boolean;
  avatarConfig: Parameters<typeof Avatar>[0]["config"];
  rankGlow: string;
}) {
  return (
    <div className="relative">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl border-2"
        style={{ borderColor: medal, boxShadow: `0 0 22px ${medal}66`, background: `${medal}1a` }}
      >
        {isMe ? (
          <Avatar config={avatarConfig} size={52} glow={false} rankGlow={rankGlow} />
        ) : (
          <span className="font-display text-xl font-black text-white">{student.name[0]}</span>
        )}
      </div>
      <span
        className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[#050816]"
        style={{ background: medal }}
      >
        <Crown className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

function LegacyRankRow({
  student,
  avatarConfig,
}: {
  student: RankedStudent;
  avatarConfig: Parameters<typeof Avatar>[0]["config"];
}) {
  const r = getRank(student.xp);
  return (
    <li
      className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 ${
        student.isCurrentUser ? "border-[#7C3AED]/45 bg-[#7C3AED]/10" : "border-white/[0.06] bg-white/[0.02]"
      }`}
    >
      <span className="w-8 shrink-0 text-center font-display text-sm font-black tabular-nums text-white/70">
        {student.rank}
      </span>
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white"
        style={{ background: `${r.color}15`, border: `1px solid ${r.color}30` }}
      >
        {student.isCurrentUser ? (
          <Avatar config={avatarConfig} size={34} glow={false} rankGlow={r.glowColor} />
        ) : (
          student.name[0]
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-white">
          {student.name}
          {student.isCurrentUser && (
            <span className="ml-1.5 text-[10px] font-black uppercase text-[#C4B5FD]">You</span>
          )}
        </p>
        <p className="truncate text-[11px] text-white/40">{student.school}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="flex items-center gap-1 text-xs font-black tabular-nums" style={{ color: r.color }}>
          {r.emoji} {r.name}
        </span>
        <span className="text-[9px] text-white/35 tabular-nums">{student.xp.toLocaleString()} XP</span>
      </div>
    </li>
  );
}

