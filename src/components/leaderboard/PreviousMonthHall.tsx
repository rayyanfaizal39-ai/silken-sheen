import { useState } from "react";
import { ChevronDown, School, Trophy } from "lucide-react";
import { getRank } from "@/data/rankAssets";
import { CosmicRankIcon, COSMIC_RANK_ICON_FRAME } from "@/components/CosmicRankIcon";
import { formatLeaderboardMonth } from "@/lib/leaderboard-month";
import { formatSchoolName } from "@/lib/school-display";
import { cn } from "@/lib/utils";

const MEDALS = ["#FBBF24", "#CBD5E1", "#FB923C"];

export interface PreviousLeaderboardStudent {
  position: number;
  display_name: string;
  school_name: string | null;
  monthly_xp: number;
  monthly_quiz_count: number;
  monthly_correct: number;
  monthly_total: number;
  /** Quiz XP plus mission rewards awarded before this month ended. */
  xp_through_month_end: number;
  is_current_user: boolean;
}

export interface PreviousLeaderboardData {
  month_key: string;
  period_start: string;
  period_end: string;
  generated_at: string;
  students: PreviousLeaderboardStudent[];
}

export type PreviousLeaderboardResponse =
  | { status: "loading" }
  | { status: "ok"; data: PreviousLeaderboardData }
  | { status: "error" };

/** A successful RPC payload. An empty student list is a real empty month, not an error. */
export function normalizePreviousLeaderboard(data: unknown): PreviousLeaderboardData | null {
  if (!data || typeof data !== "object") return null;
  const row = data as Partial<PreviousLeaderboardData>;
  if (typeof row.month_key !== "string") return null;
  try {
    formatLeaderboardMonth(row.month_key);
  } catch {
    return null;
  }
  return {
    month_key: row.month_key,
    period_start: typeof row.period_start === "string" ? row.period_start : "",
    period_end: typeof row.period_end === "string" ? row.period_end : "",
    generated_at: typeof row.generated_at === "string" ? row.generated_at : "",
    students: Array.isArray(row.students) ? row.students : [],
  };
}

function accuracy(student: PreviousLeaderboardStudent): number | null {
  if (student.monthly_total <= 0) return null;
  return Math.round((student.monthly_correct / student.monthly_total) * 100);
}

export function PreviousMonthHall({ history }: { history: PreviousLeaderboardResponse }) {
  const [expanded, setExpanded] = useState(false);

  if (history.status === "loading") {
    return (
      <section
        className="rounded-[2rem] border border-white/[0.06] bg-[#0B1220]/40 p-4"
        aria-label="Loading last month's Hall of Fame"
      >
        <div className="h-24 animate-pulse rounded-2xl bg-white/[0.04]" />
      </section>
    );
  }

  if (history.status === "error") {
    return (
      <section className="rounded-[2rem] border border-white/[0.06] bg-[#0B1220]/40 px-4 py-4 text-center text-sm text-white/50">
        Last month's Hall of Fame could not be loaded.
      </section>
    );
  }

  let monthFormat: { name: string; label: string };
  try {
    monthFormat = formatLeaderboardMonth(history.data.month_key);
  } catch {
    return (
      <section className="rounded-[2rem] border border-white/[0.06] bg-[#0B1220]/40 px-4 py-4 text-center text-sm text-white/50">
        Last month's Hall of Fame could not be loaded.
      </section>
    );
  }
  const { name, label } = monthFormat;
  const students = Array.isArray(history.data.students) ? history.data.students : [];
  const topThree = students.filter((student) => student.position <= 3);
  const rest = students.filter((student) => student.position > 3);
  const canExpand = rest.length > 0;

  return (
    <section className="rounded-[2rem] border border-white/[0.06] bg-[#0B1220]/40 p-4 backdrop-blur-xl sm:p-5">
      <div className="flex items-start gap-3">
        <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-[#C4B5FD]/80" aria-hidden="true" />
        <div className="min-w-0">
          <h2 className="font-display text-base font-bold text-white/90">{name} Hall of Fame</h2>
          <p className="mt-0.5 text-xs text-white/45">Last month's champions · {label}</p>
        </div>
      </div>

      {topThree.length === 0 ? (
        <p className="mt-4 text-sm leading-relaxed text-white/50">
          No previous monthly leaderboard yet. This month's champions will enter the Hall of Fame next month.
        </p>
      ) : (
        <>
          <div className="mt-4 hidden gap-3 md:grid md:grid-cols-3">
            {topThree.map((student) => (
              <HistoricalPodiumCard key={student.position} student={student} />
            ))}
          </div>
          <div className="mt-4 space-y-2 md:hidden">
            {topThree.map((student) => (
              <HistoricalMobileRow key={student.position} student={student} featured />
            ))}
          </div>

          {canExpand && (
            <>
              <button
                type="button"
                className="mx-auto mt-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-white/60 transition hover:bg-white/[0.06] hover:text-white/80"
                aria-expanded={expanded}
                onClick={() => setExpanded((open) => !open)}
              >
                {expanded ? `Hide ${name} Top 10` : `View ${name} Top 10`}
                <ChevronDown className={cn("h-3.5 w-3.5 transition", expanded && "rotate-180")} />
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                  expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
                aria-hidden={!expanded}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="mt-3 hidden md:block">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-[10px] uppercase tracking-wide text-white/35">
                          <th className="px-2 py-2">Rank</th>
                          <th className="px-2 py-2">Student &amp; Cosmic Rank</th>
                          <th className="px-2 py-2 text-right">Monthly XP</th>
                          <th className="px-2 py-2 text-right">Quizzes</th>
                          <th className="px-2 py-2 text-right">Accuracy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rest.map((student) => (
                          <HistoricalTableRow key={student.position} student={student} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 space-y-2 md:hidden">
                    {rest.map((student) => (
                      <HistoricalMobileRow key={student.position} student={student} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

function HistoricalPodiumCard({ student }: { student: PreviousLeaderboardStudent }) {
  const medal = MEDALS[student.position - 1] ?? MEDALS[2];
  const rank = getRank(student.xp_through_month_end);
  const school = formatSchoolName(student.school_name);
  const frame =
    student.position === 1 ? COSMIC_RANK_ICON_FRAME.hallChampion : COSMIC_RANK_ICON_FRAME.hall;
  return (
    <article
      className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-4 text-center"
      style={{ boxShadow: `inset 0 0 0 1px ${medal}22` }}
    >
      <span className="font-display text-sm font-black" style={{ color: medal }}>
        #{student.position}
      </span>
      <div className={cn("relative mt-2 shrink-0 overflow-hidden rounded-2xl border", frame)} style={{ borderColor: `${medal}66` }}>
        <CosmicRankIcon rank={rank} size="fill" glow={false} />
      </div>
      <p className="mt-2 max-w-full truncate text-sm font-bold text-white">
        {student.display_name}
        {student.is_current_user ? " · You" : ""}
      </p>
      {school && (
        <p className="flex max-w-full items-center gap-1 text-[10px] text-white/40">
          <School className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="truncate">{school}</span>
        </p>
      )}
      <p className="mt-1 text-xs font-bold text-white/70">{student.monthly_xp.toLocaleString()} XP</p>
      <p className="mt-0.5 truncate text-[10px] font-black" style={{ color: rank.color }}>
        {rank.name}
      </p>
    </article>
  );
}

function HistoricalTableRow({ student }: { student: PreviousLeaderboardStudent }) {
  const rank = getRank(student.xp_through_month_end);
  const school = formatSchoolName(student.school_name);
  const score = accuracy(student);
  return (
    <tr className="odd:bg-white/[0.015]">
      <td className="px-2 py-2.5 font-display font-black tabular-nums text-white/60">
        #{student.position}
      </td>
      <td className="px-2 py-2.5">
        <div className="flex min-w-[180px] items-center gap-2.5">
          <CosmicRankIcon rank={rank} size="table" glow={false} />
          <div className="min-w-0">
            <p className="truncate font-bold text-white">
              {student.display_name}
              {student.is_current_user ? " · You" : ""}
            </p>
            {school && (
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/40">
                <School className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{school}</span>
              </p>
            )}
            <p className="mt-0.5 truncate text-[11px] font-black" style={{ color: rank.color }}>
              {rank.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-2 py-2.5 text-right font-bold tabular-nums text-white/80">
        {student.monthly_xp.toLocaleString()}
      </td>
      <td className="px-2 py-2.5 text-right tabular-nums text-white/50">
        {student.monthly_quiz_count}
      </td>
      <td className="px-2 py-2.5 text-right tabular-nums text-white/50">
        {score == null ? "—" : `${score}%`}
      </td>
    </tr>
  );
}

function HistoricalMobileRow({
  student,
  featured = false,
}: {
  student: PreviousLeaderboardStudent;
  featured?: boolean;
}) {
  const rank = getRank(student.xp_through_month_end);
  const school = formatSchoolName(student.school_name);
  const medal = MEDALS[student.position - 1] ?? "#C4B5FD";
  const score = accuracy(student);
  return (
    <article className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
      <span className="w-8 shrink-0 font-display text-sm font-black tabular-nums" style={{ color: medal }}>
        #{student.position}
      </span>
      <CosmicRankIcon
        rank={rank}
        size={featured ? (student.position === 1 ? "hallChampion" : "hall") : "compact"}
        glow={false}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-white">
          {student.display_name}
          {student.is_current_user ? " · You" : ""}
        </p>
        {school && <p className="truncate text-[10px] text-white/40">{school}</p>}
        <p className="truncate text-[10px] font-black" style={{ color: rank.color }}>
          {rank.name}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-display text-sm font-black tabular-nums text-white/85">
          {student.monthly_xp.toLocaleString()}
        </p>
        <p className="text-[9px] font-bold uppercase tracking-wide text-white/35">XP</p>
        {!featured && (
          <p className="mt-1 text-[9px] text-white/40">
            {student.monthly_quiz_count} quizzes
            {score == null ? "" : ` · ${score}%`}
          </p>
        )}
      </div>
    </article>
  );
}
