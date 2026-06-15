// ─── Leaderboard compute — ranks the local student against the cohort ───────────

import { COHORT, SCHOLARSHIP_MIN_XP, SCHOLARSHIP_TOP_N } from "@/data/leaderboard";
import type { Progress } from "@/hooks/use-progress";

export interface RankedStudent {
  id: string;
  name: string;
  school: string;
  xp: number;
  rank: number;
  isCurrentUser: boolean;
  /** Recognised + eligible to be put forward for a scholarship. */
  scholarshipEligible: boolean;
}

export interface LeaderboardResult {
  ranked: RankedStudent[];
  currentUser: RankedStudent | null;
  topN: number;
}

/**
 * Build the Hall of Fame. The local student (from progress) is merged into the
 * seeded cohort by XP and ranked. `name`/`school` fall back to sensible defaults.
 */
export function buildLeaderboard(progress: Progress, fallbackName?: string): LeaderboardResult {
  const meName = progress.displayName?.trim() || fallbackName?.trim() || "You";
  const meSchool = progress.school?.trim() || "Your school";

  const rows = [
    ...COHORT.map((c) => ({ ...c, isCurrentUser: false })),
    { id: "__me__", name: meName, school: meSchool, xp: progress.xp ?? 0, isCurrentUser: true },
  ];

  rows.sort((a, b) => b.xp - a.xp);

  const ranked: RankedStudent[] = rows.map((r, i) => {
    const rank = i + 1;
    return {
      ...r,
      rank,
      scholarshipEligible: rank <= SCHOLARSHIP_TOP_N && r.xp >= SCHOLARSHIP_MIN_XP,
    };
  });

  return {
    ranked,
    currentUser: ranked.find((r) => r.isCurrentUser) ?? null,
    topN: SCHOLARSHIP_TOP_N,
  };
}

/** CSV of the recognised top students for a coordinator to forward to sponsors. */
export function nomineesToCsv(ranked: RankedStudent[]): string {
  const header = "Rank,Name,School,XP,Scholarship Eligible";
  const lines = ranked
    .filter((r) => r.rank <= SCHOLARSHIP_TOP_N)
    .map(
      (r) => `${r.rank},"${r.name}","${r.school}",${r.xp},${r.scholarshipEligible ? "Yes" : "No"}`,
    );
  return [header, ...lines].join("\n");
}
