// ─── AI Tracker — weakness analysis over quiz history ───────────────────────────
// Pure functions. Turns a student's QuizResult[] into per-subject mastery,
// weakest chapters, momentum, and plain-language recommendations. Powers the
// Tracker route, the Home weakness teaser, and the Parent Report.

import { subjects, getSubjectChapters } from "@/data/content";
import { QUIZ_PASS_PCT, type QuizResult } from "@/hooks/use-progress";

export interface SubjectStat {
  subjectId: string;
  name: string;
  attempts: number;
  avgScore: number; // 0–100
  lastScore: number; // most recent attempt
  bestScore: number;
  trend: number; // recent avg − earlier avg (positive = improving)
}

export interface WeakSpot {
  subjectId: string;
  subjectName: string;
  chapterKey: string;
  chapterLabel: string;
  avgScore: number;
  attempts: number;
}

export interface TrackerInsight {
  totalQuizzes: number;
  overallAvg: number;
  passRate: number; // % of quizzes at/above pass threshold
  subjectStats: SubjectStat[];
  weakSpots: WeakSpot[];
  strongest: SubjectStat | null;
  weakest: SubjectStat | null;
  recommendation: string;
}

function subjectName(id: string): string {
  return subjects.find((s) => s.id === id)?.name ?? id;
}

function chapterLabel(subjectId: string, chapterKey: string): string {
  try {
    const ch = getSubjectChapters(subjectId).find((c) => c.key === chapterKey);
    return ch?.label ?? chapterKey;
  } catch {
    return chapterKey;
  }
}

function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

/** Filter history to the last `days` days (use Infinity for all-time). */
export function withinDays(history: QuizResult[], days: number): QuizResult[] {
  if (!Number.isFinite(days)) return history;
  const cutoff = Date.now() - days * 86_400_000;
  return history.filter((r) => new Date(r.date).getTime() >= cutoff);
}

export function analyzeProgress(history: QuizResult[]): TrackerInsight {
  const totalQuizzes = history.length;

  if (totalQuizzes === 0) {
    return {
      totalQuizzes: 0,
      overallAvg: 0,
      passRate: 0,
      subjectStats: [],
      weakSpots: [],
      strongest: null,
      weakest: null,
      recommendation:
        "Take your first quiz and the Tracker will start charting your strengths and weak spots.",
    };
  }

  const sorted = [...history].sort((a, b) => a.date.localeCompare(b.date));
  const overallAvg = avg(sorted.map((r) => r.scorePct));
  const passRate = Math.round(
    (sorted.filter((r) => r.scorePct >= QUIZ_PASS_PCT).length / totalQuizzes) * 100,
  );

  // Per-subject aggregation
  const bySubject = new Map<string, QuizResult[]>();
  for (const r of sorted) {
    const list = bySubject.get(r.subjectId) ?? [];
    list.push(r);
    bySubject.set(r.subjectId, list);
  }

  const subjectStats: SubjectStat[] = Array.from(bySubject.entries()).map(([id, list]) => {
    const scores = list.map((r) => r.scorePct);
    const half = Math.floor(list.length / 2);
    const earlier = half > 0 ? avg(scores.slice(0, half)) : avg(scores);
    const recent = half > 0 ? avg(scores.slice(half)) : avg(scores);
    return {
      subjectId: id,
      name: subjectName(id),
      attempts: list.length,
      avgScore: avg(scores),
      lastScore: scores[scores.length - 1],
      bestScore: Math.max(...scores),
      trend: recent - earlier,
    };
  });

  // Weak spots: chapters with the lowest average, biased toward more attempts
  const byChapter = new Map<string, QuizResult[]>();
  for (const r of sorted) {
    const k = `${r.subjectId}::${r.chapterKey}`;
    const list = byChapter.get(k) ?? [];
    list.push(r);
    byChapter.set(k, list);
  }
  const weakSpots: WeakSpot[] = Array.from(byChapter.entries())
    .map(([k, list]) => {
      const [subjectId, chapterKey] = k.split("::");
      return {
        subjectId,
        subjectName: subjectName(subjectId),
        chapterKey,
        chapterLabel: chapterLabel(subjectId, chapterKey),
        avgScore: avg(list.map((r) => r.scorePct)),
        attempts: list.length,
      };
    })
    .filter((w) => w.avgScore < QUIZ_PASS_PCT)
    .sort((a, b) => a.avgScore - b.avgScore)
    .slice(0, 5);

  const ranked = [...subjectStats].sort((a, b) => b.avgScore - a.avgScore);
  const strongest = ranked[0] ?? null;
  const weakest = ranked[ranked.length - 1] ?? null;

  let recommendation: string;
  if (weakSpots.length > 0) {
    const w = weakSpots[0];
    recommendation = `Focus next on ${w.subjectName} — "${w.chapterLabel}" is averaging ${w.avgScore}%. Re-read the notes, then re-take the quiz to push past ${QUIZ_PASS_PCT}%.`;
  } else if (weakest && weakest.avgScore < 90) {
    recommendation = `Strong work — every chapter is above ${QUIZ_PASS_PCT}%. Tighten up ${weakest.name} (avg ${weakest.avgScore}%) to reach mastery.`;
  } else {
    recommendation =
      "Outstanding — you're mastering every subject you've tried. Explore a new world to keep the streak alive.";
  }

  return {
    totalQuizzes,
    overallAvg,
    passRate,
    subjectStats,
    weakSpots,
    strongest,
    weakest,
    recommendation,
  };
}
