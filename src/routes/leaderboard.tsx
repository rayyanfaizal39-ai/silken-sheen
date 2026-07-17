import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Trophy, Crown, Sparkles, Rocket, TrendingUp, RefreshCw } from "lucide-react";
import { useProgress, getRank } from "@/hooks/use-progress";
import { useAuth } from "@/context/auth-context";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type {
  LeaderboardData,
  LeaderboardResponse,
  LeaderboardStudentRow,
} from "./-leaderboard.server";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/leaderboard")({
  head: () =>
    seoMeta({
      title: "Galaxy Hall of Fame — KSSM Leaderboard",
      description: "Real monthly XP rankings for AcadeMY students.",
      path: "/leaderboard",
      keywords: ["KSSM leaderboard", "student rankings Malaysia", "Malaysia learning platform"],
    }),
  // Authentication is restored by AuthProvider in the browser. Keeping the
  // SSR loader deterministic avoids a server/client session mismatch, and
  // the authenticated RPC is fetched immediately after that restoration.
  loader: () => ({
    leaderboard: { status: "unauthenticated" } satisfies LeaderboardResponse,
  }),
  component: LeaderboardPage,
});

const MEDALS = ["#FBBF24", "#CBD5E1", "#FB923C"]; // gold / silver / bronze

// ── A single ranked row derived from the real get_leaderboard() RPC ─────────
interface RealRankedStudent {
  rank: number;
  name: string;
  lifetimeXp: number;
  monthlyXp: number;
  monthlyQuizCount: number;
  monthlyAccuracy: number | null; // null = no quiz data this month, never fabricated
  streak: number | null; // null = no user_progress row yet
  isCurrentUser: boolean;
}

function rankRealStudents(data: LeaderboardData): RealRankedStudent[] {
  return data.students.map((s: LeaderboardStudentRow) => ({
    rank: s.position,
    name: s.display_name.trim() || "Student",
    lifetimeXp: s.lifetime_xp,
    monthlyXp: s.monthly_xp,
    monthlyQuizCount: s.monthly_quiz_count,
    monthlyAccuracy:
      s.monthly_total > 0 ? Math.round((s.monthly_correct / s.monthly_total) * 100) : null,
    streak: s.streak,
    isCurrentUser: s.is_current_user,
  }));
}

function top3Label(rank: number): string | null {
  if (rank === 1) return "Champion";
  if (rank <= 3) return "Top 3";
  if (rank <= 10) return "Top 10";
  return null;
}

async function getBrowserLeaderboardData(): Promise<LeaderboardResponse> {
  if (!isSupabaseConfigured) {
    return { status: "error", message: "The leaderboard is temporarily unavailable." };
  }

  const { data, error } = await supabase.rpc("get_leaderboard", {
    page_size: 10,
    page_offset: 0,
  });

  if (error || !data) {
    if (import.meta.env.DEV) console.error("[leaderboard] get_leaderboard RPC failed:", error);
    return {
      status: "error",
      message: "The monthly leaderboard could not be loaded. Please try again.",
    };
  }

  return { status: "ok", data: data as LeaderboardData };
}

function LeaderboardPage() {
  const { leaderboard: loaderLeaderboard } = Route.useLoaderData() as {
    leaderboard: LeaderboardResponse;
  };
  const { user, loading: authLoading } = useAuth();
  const { progress } = useProgress();
  const [response, setResponse] = useState<LeaderboardResponse>(loaderLeaderboard);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(
    async (showSpinner = true) => {
      if (!user) return;
      if (showSpinner) setRefreshing(true);
      try {
        setResponse(await getBrowserLeaderboardData());
      } catch (error) {
        if (import.meta.env.DEV) console.error("[leaderboard] refresh failed:", error);
        setResponse({
          status: "error",
          message: "The monthly leaderboard could not be loaded. Please try again.",
        });
      } finally {
        if (showSpinner) setRefreshing(false);
      }
    },
    [user],
  );

  useEffect(() => {
    if (!user) return;
    const timer = window.setTimeout(() => void refresh(response.status !== "ok"), 350);
    return () => window.clearTimeout(timer);
  }, [user, progress.xp, refresh, response.status]);

  const realRanked = useMemo(
    () => (response.status === "ok" ? rankRealStudents(response.data) : null),
    [response],
  );

  if (
    authLoading ||
    (user && response.status === "unauthenticated") ||
    (refreshing && response.status !== "ok")
  ) {
    return <LeaderboardSkeleton />;
  }

  if (!user || response.status === "unauthenticated") {
    return <LeaderboardMessage message="Sign in as a student to view the Monthly Leaderboard." />;
  }

  if (response.status === "error") {
    return <LeaderboardMessage message={response.message} onRetry={() => void refresh()} />;
  }

  const current = response.data.current_position;
  const currentRanked = current
    ? rankRealStudents({ ...response.data, students: [current] })[0]
    : null;

  return (
    <GalaxyHallOfFame
      ranked={realRanked ?? []}
      currentStudent={currentRanked}
      month={response.data.month}
      refreshing={refreshing}
      onRefresh={() => void refresh()}
    />
  );
}

function LeaderboardSkeleton() {
  return (
    <section
      className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8"
      aria-label="Loading leaderboard"
    >
      <div className="h-44 animate-pulse rounded-[2rem] border border-white/[0.08] bg-white/[0.04]" />
      <div className="h-24 animate-pulse rounded-2xl border border-white/[0.08] bg-white/[0.04]" />
      <div className="grid grid-cols-3 items-end gap-3">
        <div className="h-48 animate-pulse rounded-2xl bg-white/[0.04]" />
        <div className="h-56 animate-pulse rounded-2xl bg-white/[0.04]" />
        <div className="h-44 animate-pulse rounded-2xl bg-white/[0.04]" />
      </div>
      <span className="sr-only">Loading Monthly Leaderboard</span>
    </section>
  );
}

function LeaderboardMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 px-6 py-12 text-center backdrop-blur-2xl">
        <Trophy className="mx-auto h-9 w-9 text-[#C4B5FD]" />
        <h1 className="mt-4 font-display text-2xl font-bold text-white">Monthly Leaderboard</h1>
        <p className="mt-2 text-sm text-white/55">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 rounded-full border border-[#7C3AED]/50 bg-[#7C3AED]/15 px-4 py-2 text-xs font-black text-[#DDD6FE]"
          >
            Try again
          </button>
        )}
      </div>
    </section>
  );
}

// ── Galaxy Hall of Fame — real Supabase data ─────────────────────────────────

function GalaxyHallOfFame({
  ranked,
  currentStudent,
  month,
  refreshing,
  onRefresh,
}: {
  ranked: RealRankedStudent[];
  currentStudent: RealRankedStudent | null;
  month: string;
  refreshing: boolean;
  onRefresh: () => void;
}) {
  const me = currentStudent;
  const hasMonthlyActivity = ranked.length > 0;
  const podium = ranked.slice(0, 3);
  const rest = ranked.slice(3, 100);
  const myIdx = me ? ranked.findIndex((s) => s.rank === me.rank) : -1;
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
                Monthly Leaderboard
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                Cosmic Leaderboard
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                Real XP earned from completed quizzes this calendar month.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#C4B5FD]">
              <Sparkles className="h-3.5 w-3.5" /> {month}
            </span>
            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              aria-label="Refresh leaderboard"
              className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-white/60 transition hover:bg-white/[0.08] disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Student rank card ── */}
      {me ? (
        <StudentRankCard student={me} xpToNext={xpToNext} nextAboveName={nextAbove?.name ?? null} />
      ) : (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-4 text-center text-sm text-white/50 backdrop-blur-xl">
          Earn XP from a completed quiz to claim your monthly position.
        </div>
      )}

      {/* ── No activity this month empty state ── */}
      {!hasMonthlyActivity && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-4 text-center text-sm text-white/50 backdrop-blur-xl">
          No missions completed yet this month. Be the first to earn XP.
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
                <div key={s.rank} className="flex flex-col items-center">
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
                    {s.isCurrentUser ? " · You" : ""}
                  </p>
                  <CosmicRankBadge xp={s.lifetimeXp} small />
                  <div
                    className={`mt-2 flex ${heights[hi]} w-full flex-col items-center justify-start rounded-t-xl border-t-2 pt-2`}
                    style={{
                      borderColor: MEDALS[slot],
                      background: `linear-gradient(180deg, ${MEDALS[slot]}22, transparent)`,
                    }}
                  >
                    <span
                      className="font-display text-2xl font-black"
                      style={{ color: MEDALS[slot] }}
                    >
                      #{s.rank}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-white/70">
                      <Sparkles className="h-3 w-3 text-[#FBBF24]" /> {s.monthlyXp.toLocaleString()}{" "}
                      XP
                    </span>
                    <span className="text-[9px] text-white/35">this month</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Positions 4–10 ── */}
      {hasMonthlyActivity && (
        <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-3 backdrop-blur-2xl sm:p-4">
          <h2 className="px-2 py-2 font-display text-lg font-bold text-white">
            Monthly ranking · Top 10
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wide text-white/35">
                  <th className="px-2 py-2">Rank</th>
                  <th className="px-2 py-2">Student</th>
                  <th className="px-2 py-2 text-right">Monthly XP</th>
                  <th className="px-2 py-2 text-right">Quizzes</th>
                  <th className="px-2 py-2 text-right">Accuracy</th>
                  <th className="px-2 py-2 text-right">Streak</th>
                  <th className="px-2 py-2">Cosmic Rank</th>
                </tr>
              </thead>
              <tbody>
                {rest.map((s) => (
                  <RankTableRow key={s.rank} student={s} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
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
        <p className="mt-0.5 text-xs font-bold text-white/75">{student.name} · You</p>
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
          <TrendingUp className="h-3 w-3" /> XP to next position
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
          <p className="font-bold text-white">
            {student.streak == null ? "—" : `${student.streak}d`}
          </p>
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
        className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2"
        style={{ borderColor: medal, boxShadow: `0 0 22px ${medal}66`, background: `${medal}1a` }}
      >
        <img
          src="/companions/Astrounaut/cadet.png"
          alt="Astronaut avatar"
          className="h-full w-full object-cover"
        />
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
    <tr className={student.isCurrentUser ? "bg-[#7C3AED]/10" : "odd:bg-white/[0.015]"}>
      <td className="px-2 py-2.5 font-display font-black tabular-nums text-white/70">
        #{student.rank}
      </td>
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
      <td className="px-2 py-2.5 text-right font-bold tabular-nums text-white">
        {student.monthlyXp.toLocaleString()}
      </td>
      <td className="px-2 py-2.5 text-right tabular-nums text-white/50">
        {student.monthlyQuizCount}
      </td>
      <td className="px-2 py-2.5 text-right tabular-nums text-white/50">
        {student.monthlyAccuracy == null ? "—" : `${student.monthlyAccuracy}%`}
      </td>
      <td className="px-2 py-2.5 text-right tabular-nums text-white/50">
        {student.streak == null ? "—" : `${student.streak}d`}
      </td>
      <td className="px-2 py-2.5">
        <span
          className="flex items-center gap-1 text-xs font-black tabular-nums"
          style={{ color: r.color }}
        >
          {r.emoji} {r.name}
        </span>
      </td>
    </tr>
  );
}
