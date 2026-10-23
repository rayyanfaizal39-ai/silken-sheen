/**
 * Previous calendar month in Asia/Kuala_Lumpur for the automatic parent report.
 * The measured window is [1st 00:00, next 1st 00:00). Rank and streak stay
 * current; quiz totals come only from that month.
 */
import { subjectDisplayName } from "./weekly-parent-report.ts";

const KL_OFFSET_MS = 8 * 60 * 60 * 1000;
const PASS_PCT = 80;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const RANKS: Array<{ name: string; minXp: number }> = [
  { name: "Space Cadet", minXp: 0 },
  { name: "Moon Explorer", minXp: 1500 },
  { name: "Planet Voyager", minXp: 4000 },
  { name: "Star Captain", minXp: 8000 },
  { name: "Galaxy Guardian", minXp: 15000 },
  { name: "Cosmic Legend", minXp: 30000 },
];

export type MonthlyQuizRow = {
  createdAt: string;
  scorePct: number | string | null;
  subjectId: string;
  chapterKey: string;
};

export type MonthlyReportPeriod = {
  monthStart: string;
  periodLabel: string;
  startIso: string;
  endIso: string;
};

export function previousKualaLumpurMonth(now: Date): MonthlyReportPeriod {
  const shifted = new Date(now.getTime() + KL_OFFSET_MS);
  let year = shifted.getUTCFullYear();
  let month = shifted.getUTCMonth() - 1;
  if (month < 0) {
    month = 11;
    year -= 1;
  }
  const startMs = Date.UTC(year, month, 1) - KL_OFFSET_MS;
  const endMs = Date.UTC(year, month + 1, 1) - KL_OFFSET_MS;
  return {
    monthStart: `${year}-${String(month + 1).padStart(2, "0")}-01`,
    periodLabel: `${MONTHS[month]} ${year}`,
    startIso: new Date(startMs).toISOString(),
    endIso: new Date(endMs).toISOString(),
  };
}

export function rankNameForXp(xp: number): string {
  const safeXp = Number.isFinite(xp) ? Math.max(0, Math.floor(xp)) : 0;
  let name = RANKS[0].name;
  for (const rank of RANKS) {
    if (safeXp >= rank.minXp) name = rank.name;
  }
  return name;
}

function finiteScore(value: number | string | null): number | null {
  const score = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(score)) return null;
  return Math.max(0, Math.min(100, score));
}

function average(scores: number[]): number {
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

export function summarizeMonthlyQuizzes(quizzes: MonthlyQuizRow[]): {
  totalQuizzes: number;
  overallAvg: number;
  passRate: number;
  strongest: { name: string; avgScore: number } | null;
  weakSpots: Array<{ subjectName: string; chapterLabel: string; avgScore: number }>;
  recommendation: string;
} {
  const scored = quizzes.flatMap((quiz) => {
    const scorePct = finiteScore(quiz.scorePct);
    if (scorePct === null || !quiz.subjectId || !quiz.chapterKey) return [];
    return [{ ...quiz, scorePct }];
  });
  if (scored.length === 0) {
    return {
      totalQuizzes: 0,
      overallAvg: 0,
      passRate: 0,
      strongest: null,
      weakSpots: [],
      recommendation:
        "Take your first quiz and the Tracker will start charting your strengths and weak spots.",
    };
  }

  const overallAvg = average(scored.map((quiz) => quiz.scorePct));
  const passRate = Math.round(
    (scored.filter((quiz) => quiz.scorePct >= PASS_PCT).length / scored.length) * 100,
  );

  const bySubject = new Map<string, number[]>();
  const byChapter = new Map<string, { subjectId: string; chapterKey: string; scores: number[] }>();
  for (const quiz of scored) {
    const subjectScores = bySubject.get(quiz.subjectId) ?? [];
    subjectScores.push(quiz.scorePct);
    bySubject.set(quiz.subjectId, subjectScores);
    const key = `${quiz.subjectId}::${quiz.chapterKey}`;
    const chapter = byChapter.get(key) ?? {
      subjectId: quiz.subjectId,
      chapterKey: quiz.chapterKey,
      scores: [],
    };
    chapter.scores.push(quiz.scorePct);
    byChapter.set(key, chapter);
  }

  const subjectStats = [...bySubject.entries()].map(([subjectId, scores]) => ({
    name: subjectDisplayName(subjectId),
    avgScore: average(scores),
  }));
  const strongest = [...subjectStats].sort((a, b) => b.avgScore - a.avgScore)[0] ?? null;
  const weakest = [...subjectStats].sort((a, b) => a.avgScore - b.avgScore)[0] ?? null;
  const weakSpots = [...byChapter.values()]
    .map((chapter) => ({
      subjectName: subjectDisplayName(chapter.subjectId),
      chapterLabel: chapter.chapterKey,
      avgScore: average(chapter.scores),
    }))
    .filter((spot) => spot.avgScore < PASS_PCT)
    .sort((a, b) => a.avgScore - b.avgScore)
    .slice(0, 5);

  let recommendation: string;
  if (weakSpots.length > 0) {
    const spot = weakSpots[0];
    recommendation = `Focus next on ${spot.subjectName} — "${spot.chapterLabel}" is averaging ${spot.avgScore}%. Re-read the notes, then re-take the quiz to push past ${PASS_PCT}%.`;
  } else if (weakest && weakest.avgScore < 90) {
    recommendation = `Strong work — every chapter is above ${PASS_PCT}%. Tighten up ${weakest.name} (avg ${weakest.avgScore}%) to reach mastery.`;
  } else {
    recommendation =
      "Outstanding — you're mastering every subject you've tried. Explore a new world to keep the streak alive.";
  }

  return {
    totalQuizzes: scored.length,
    overallAvg,
    passRate,
    strongest,
    weakSpots,
    recommendation,
  };
}
