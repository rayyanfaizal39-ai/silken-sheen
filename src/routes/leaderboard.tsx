import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Trophy,
  Crown,
  Medal,
  GraduationCap,
  Download,
  Send,
  Sparkles,
  Star,
  Lock,
  Flame,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { useProgress, getRank } from "@/hooks/use-progress";
import { useAuth } from "@/context/auth-context";
import { Avatar } from "@/components/Avatar";
import { buildLeaderboard, nomineesToCsv, type RankedStudent } from "@/lib/leaderboard";
import { SCHOLARSHIP_COORDINATOR_EMAIL, SCHOLARSHIP_MIN_XP } from "@/data/leaderboard";
import { analyzeProgress } from "@/lib/tracker";
import { getLeaderboardData, type LeaderboardData, type LeaderboardStudentRow } from "./-leaderboard.server";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Galaxy Hall of Fame — AcadeMY" },
      {
        name: "description",
        content: "Real monthly XP rankings — top 100 KSSM students, refreshed every season.",
      },
    ],
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
  const { progress, setStudentProfile } = useProgress();

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
  return <LegacyLocalLeaderboard progress={progress} setStudentProfile={setStudentProfile} userName={user?.name} />;
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
  setStudentProfile,
  userName,
}: {
  progress: ReturnType<typeof useProgress>["progress"];
  setStudentProfile: ReturnType<typeof useProgress>["setStudentProfile"];
  userName?: string;
}) {
  const board = useMemo(() => buildLeaderboard(progress, userName), [progress, userName]);
  const me = board.currentUser;
  const insight = useMemo(() => analyzeProgress(progress.quizHistory ?? []), [progress.quizHistory]);

  const [name, setName] = useState(progress.displayName ?? userName ?? "");
  const [school, setSchool] = useState(progress.school ?? "");
  const [parentEmail, setParentEmail] = useState(progress.parentEmail ?? "");

  const podium = board.ranked.slice(0, 3);
  const rest = board.ranked.slice(3, 100);
  const eligible = me?.scholarshipEligible ?? false;
  const myRank = getRank(progress.xp);

  function saveProfile() {
    setStudentProfile(name.trim() || undefined, school.trim() || undefined);
  }

  function submitNomination() {
    saveProfile();
    const subject = `Scholarship Nomination — ${name || "Student"} (Rank #${me?.rank ?? "-"})`;
    const body = [
      `AcadeMY — Scholarship Nomination`,
      ``,
      `Student: ${name || "—"}`,
      `School: ${school || "—"}`,
      `Hall of Fame rank: #${me?.rank ?? "—"}`,
      `Cosmic Rank: ${myRank.name}`,
      `Total XP: ${(me?.xp ?? 0).toLocaleString()}`,
      `Quiz average: ${insight.overallAvg}%  ·  Pass rate: ${insight.passRate}%`,
      `Study streak: ${progress.streak} day${progress.streak !== 1 ? "s" : ""}`,
      insight.strongest
        ? `Strongest subject: ${insight.strongest.name} (${insight.strongest.avgScore}%)`
        : ``,
      parentEmail ? `Parent contact: ${parentEmail}` : ``,
      ``,
      `Please consider this student for scholarship recognition.`,
    ]
      .filter(Boolean)
      .join("\n");
    const cc = parentEmail ? `&cc=${encodeURIComponent(parentEmail)}` : "";
    window.location.href = `mailto:${SCHOLARSHIP_COORDINATOR_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}${cc}`;
  }

  function exportCsv() {
    const csv = nomineesToCsv(board.ranked);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "academy-scholarship-nominees.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

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

      <LegacyScholarshipPanel
        eligible={eligible}
        me={me}
        topN={board.topN}
        name={name}
        school={school}
        parentEmail={parentEmail}
        onName={setName}
        onSchool={setSchool}
        onParentEmail={setParentEmail}
        onSave={saveProfile}
        onSubmit={submitNomination}
        onExport={exportCsv}
        myRankColor={myRank.color}
      />

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
      {student.scholarshipEligible && (
        <span className="hidden items-center gap-1 rounded-full bg-[#FBBF24]/15 px-2 py-1 text-[10px] font-black text-[#FCD34D] sm:flex">
          <GraduationCap className="h-3 w-3" /> Nominee
        </span>
      )}
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="flex items-center gap-1 text-xs font-black tabular-nums" style={{ color: r.color }}>
          {r.emoji} {r.name}
        </span>
        <span className="text-[9px] text-white/35 tabular-nums">{student.xp.toLocaleString()} XP</span>
      </div>
    </li>
  );
}

function LegacyScholarshipPanel({
  eligible,
  me,
  topN,
  name,
  school,
  parentEmail,
  onName,
  onSchool,
  onParentEmail,
  onSave,
  onSubmit,
  onExport,
  myRankColor,
}: {
  eligible: boolean;
  me: RankedStudent | null;
  topN: number;
  name: string;
  school: string;
  parentEmail: string;
  onName: (v: string) => void;
  onSchool: (v: string) => void;
  onParentEmail: (v: string) => void;
  onSave: () => void;
  onSubmit: () => void;
  onExport: () => void;
  myRankColor: string;
}) {
  const xp = me?.xp ?? 0;
  const xpToGo = Math.max(0, SCHOLARSHIP_MIN_XP - xp);

  return (
    <section
      className="rounded-[2rem] border p-6 backdrop-blur-2xl sm:p-7"
      style={{
        borderColor: eligible ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)",
        background: eligible
          ? "linear-gradient(160deg, rgba(124,58,237,0.14), rgba(11,18,32,0.6))"
          : "rgba(11,18,32,0.62)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{ background: eligible ? "linear-gradient(135deg,#7C3AED,#6D28D9)" : "rgba(255,255,255,0.06)" }}
        >
          <GraduationCap className={`h-6 w-6 ${eligible ? "text-white" : "text-white/50"}`} />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-white">Scholarship recognition</h2>
          <p className="text-sm text-white/50">
            {eligible
              ? `You're ranked #${me?.rank} — eligible to be put forward for a scholarship. 🎓`
              : `Reach the top ${topN} (min ${SCHOLARSHIP_MIN_XP.toLocaleString()} XP) to qualify.`}
          </p>
        </div>
      </div>

      {eligible ? (
        <div className="mt-5 space-y-3">
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Field label="Full name" value={name} onChange={onName} placeholder="As it should appear" />
            <Field label="School" value={school} onChange={onSchool} placeholder="e.g. SMK Seri Bintang" />
          </div>
          <Field
            label="Parent / guardian email (optional)"
            value={parentEmail}
            onChange={onParentEmail}
            placeholder="parent@example.com"
            type="email"
          />
          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row">
            <button
              type="button"
              onClick={onSubmit}
              disabled={!name.trim() || !school.trim()}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-5 text-sm font-black text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" /> Submit nomination
            </button>
            <button
              type="button"
              onClick={() => {
                onSave();
                window.print();
              }}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 text-sm font-bold text-white transition-colors hover:bg-white/[0.12]"
            >
              <Star className="h-4 w-4" /> Certificate
            </button>
          </div>
          <p className="text-[11px] leading-relaxed text-white/35">
            Submitting opens your email app addressed to the scholarship coordinator with your
            achievements attached.
          </p>
        </div>
      ) : (
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold text-white/60">
              <Lock className="h-3.5 w-3.5" /> Progress to eligibility
            </span>
            <span className="font-black tabular-nums text-white">
              {xp.toLocaleString()} / {SCHOLARSHIP_MIN_XP.toLocaleString()} XP
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, Math.round((xp / SCHOLARSHIP_MIN_XP) * 100))}%`,
                background: `linear-gradient(90deg, ${myRankColor}, #7C3AED)`,
              }}
            />
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-white/55">
            <Flame className="h-4 w-4 text-orange-400" />
            {xpToGo > 0
              ? `${xpToGo.toLocaleString()} XP to go — keep passing quizzes to climb the Hall of Fame.`
              : `You've got the XP — climb into the top ${topN} to unlock nomination.`}
          </p>
          <Link
            to="/quizzes"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          >
            <Trophy className="h-4 w-4" /> Earn more XP
          </Link>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
        <p className="flex items-center gap-1.5 text-[11px] text-white/40">
          <Medal className="h-3.5 w-3.5" /> For teachers &amp; coordinators
        </p>
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white/[0.12]"
        >
          <Download className="h-3.5 w-3.5" /> Export nominees (CSV)
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/40">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[44px] w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white placeholder:text-white/30 focus:border-[#7C3AED]/50 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
      />
    </label>
  );
}
