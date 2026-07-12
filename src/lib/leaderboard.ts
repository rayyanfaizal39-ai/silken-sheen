// ─── Leaderboard compute — ranks the local student against the cohort ───────────

import { COHORT } from "@/data/leaderboard";
import type { Progress } from "@/hooks/use-progress";

export interface RankedStudent {
  id: string;
  name: string;
  school: string;
  xp: number;
  rank: number;
  isCurrentUser: boolean;
}

export interface LeaderboardResult {
  ranked: RankedStudent[];
  currentUser: RankedStudent | null;
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

  const ranked: RankedStudent[] = rows.map((r, i) => ({
    ...r,
    rank: i + 1,
  }));

  return {
    ranked,
    currentUser: ranked.find((r) => r.isCurrentUser) ?? null,
  };
}
