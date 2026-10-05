import { subjects } from "@/data/subjects-meta";
import {
  currentKualaLumpurWeek,
  formatWeekPeriod,
  kualaLumpurDateKey,
} from "@/features/parent-report/weeklyParentReport";

/** Subjects need repeated quizzes before a recent ranking is shown. */
export const MIN_SUBJECT_QUIZZES = 3;
/** A single low score does not outrank a weaker chapter with repeat attempts. */
export const MIN_CHAPTER_ATTEMPTS = 2;
/** Both 30-day windows need this many quizzes in the same subject. */
export const MIN_COMPARISON_QUIZZES = 3;

const DAY_MS = 86_400_000;

export type ParentDashboardQuiz = {
  createdAt: string;
  scorePct: number | null;
  subjectId: string;
  chapterKey: string;
  xpEarned: number | null;
};

export type RecentSubject = {
  subjectId: string;
  name: string;
  average: number;
  quizzes: number;
};

export type RecentChapter = {
  subjectId: string;
  subjectName: string;
  chapterKey: string;
  average: number;
  attempts: number;
};

export type SubjectImprovement = {
  name: string;
  change: number;
};

export type WeekQuizHighlight = {
  subjectName: string;
  chapterKey: string;
  scorePct: number;
};

export type CompletedWeek = {
  weekStart: string;
  weekEnd: string;
  periodLabel: string;
  quizzes: number;
  average: number | null;
  xpEarned: number;
  activeDays: number;
  strongest: RecentSubject | null;
  weakestSubject: RecentSubject | null;
  weakestChapter: RecentChapter | null;
  biggestWin: WeekQuizHighlight | null;
  summary: string;
};

export type ParentDashboardModel = {
  studentName: string;
  thisWeek: {
    quizzes: number;
    weeklyXp: number;
    average: number | null;
    activeDays: number;
  };
  lastWeek: CompletedWeek;
  recent: {
    quizzes: number;
    average: number | null;
    strongest: RecentSubject | null;
    weakestSubject: RecentSubject | null;
    weakestChapter: RecentChapter | null;
    insight: string;
    recommendation: string;
  };
  mostImproved: SubjectImprovement | null;
};

export function parentDashboardHistorySince(now: Date): string {
  return new Date(now.getTime() - 60 * DAY_MS).toISOString();
}

export function formatQuizAverage(value: number | null): string {
  if (value === null) return "—";
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
}

export function buildParentDashboardModel(input: {
  studentName: string;
  quizzes: ParentDashboardQuiz[];
  now?: Date;
}): ParentDashboardModel {
  const now = input.now ?? new Date();
  const week = currentKualaLumpurWeek(now);
  const lastWeek = previousKualaLumpurWeek(now);
  const recentStart = now.getTime() - 30 * DAY_MS;
  const previousStart = now.getTime() - 60 * DAY_MS;
  const thisWeekRows = input.quizzes.filter((quiz) => inHalfOpenRange(quiz.createdAt, week.startIso, week.endIso));
  const lastWeekRows = input.quizzes.filter((quiz) => inHalfOpenRange(quiz.createdAt, lastWeek.startIso, lastWeek.endIso));
  const recentRows = input.quizzes.filter((quiz) => instant(quiz.createdAt) >= recentStart && instant(quiz.createdAt) <= now.getTime());
  const previousRows = input.quizzes.filter((quiz) => {
    const time = instant(quiz.createdAt);
    return time >= previousStart && time < recentStart;
  });
  const recentSubjects = rankSubjects(recentRows);
  const strongest = recentSubjects[0] ?? null;
  const weakestSubject = recentSubjects.length > 1 ? recentSubjects[recentSubjects.length - 1] : null;
  const weakestChapter = weakestRepeatedChapter(recentRows, weakestSubject?.subjectId ?? null);
  const name = input.studentName.trim() || "Student";

  return {
    studentName: name,
    thisWeek: weekSnapshot(thisWeekRows),
    lastWeek: completedWeekSnapshot(name, lastWeek.weekStart, lastWeek.weekEnd, lastWeekRows),
    recent: {
      quizzes: recentRows.length,
      average: mean(recentRows.map((quiz) => quiz.scorePct)),
      strongest,
      weakestSubject,
      weakestChapter,
      insight: recentInsight(name, recentRows, strongest),
      recommendation: recentRecommendation(weakestChapter, weakestSubject),
    },
    mostImproved: compareWindows(previousRows, recentRows),
  };
}

function previousKualaLumpurWeek(now: Date) {
  const current = currentKualaLumpurWeek(now);
  return currentKualaLumpurWeek(new Date(instant(current.startIso) - 1));
}

function weekSnapshot(quizzes: ParentDashboardQuiz[]) {
  return {
    quizzes: quizzes.length,
    weeklyXp: quizzes.reduce((sum, quiz) => sum + (quiz.xpEarned ?? 0), 0),
    average: mean(quizzes.map((quiz) => quiz.scorePct)),
    activeDays: activeQuizDays(quizzes),
  };
}

function completedWeekSnapshot(
  studentName: string,
  weekStart: string,
  weekEnd: string,
  quizzes: ParentDashboardQuiz[],
): CompletedWeek {
  const subjectsThisWeek = rankSubjects(quizzes);
  const strongest = subjectsThisWeek[0] ?? null;
  const weakestSubject = subjectsThisWeek.length > 1 ? subjectsThisWeek[subjectsThisWeek.length - 1] : null;
  return {
    weekStart,
    weekEnd,
    periodLabel: formatWeekPeriod(weekStart, weekEnd),
    quizzes: quizzes.length,
    average: mean(quizzes.map((quiz) => quiz.scorePct)),
    xpEarned: quizzes.reduce((sum, quiz) => sum + (quiz.xpEarned ?? 0), 0),
    activeDays: activeQuizDays(quizzes),
    strongest,
    weakestSubject,
    weakestChapter: weakestRepeatedChapter(quizzes, weakestSubject?.subjectId ?? null, { stayInSubject: true }),
    biggestWin: highestQuiz(quizzes),
    summary: lastWeekSummary(studentName, quizzes),
  };
}

function lastWeekSummary(name: string, quizzes: ParentDashboardQuiz[]): string {
  if (quizzes.length === 0) return "No quiz activity last week.";
  const label = quizzes.length === 1 ? "quiz" : "quizzes";
  return `${name} completed ${quizzes.length} ${label} last week with an average score of ${formatQuizAverage(mean(quizzes.map((quiz) => quiz.scorePct)))}.`;
}

function activeQuizDays(quizzes: ParentDashboardQuiz[]): number {
  return new Set(quizzes.map((quiz) => kualaLumpurDateKey(new Date(quiz.createdAt)))).size;
}

function highestQuiz(quizzes: ParentDashboardQuiz[]): WeekQuizHighlight | null {
  let best: ParentDashboardQuiz | null = null;
  for (const quiz of quizzes) {
    if (quiz.scorePct === null || !Number.isFinite(quiz.scorePct)) continue;
    if (!best || best.scorePct === null || quiz.scorePct > best.scorePct || (quiz.scorePct === best.scorePct && instant(quiz.createdAt) > instant(best.createdAt))) {
      best = quiz;
    }
  }
  if (!best || best.scorePct === null) return null;
  return {
    subjectName: subjects.find((subject) => subject.id === best.subjectId)?.name ?? best.subjectId,
    chapterKey: best.chapterKey,
    scorePct: best.scorePct,
  };
}

function recentInsight(name: string, quizzes: ParentDashboardQuiz[], strongest: RecentSubject | null): string {
  if (quizzes.length === 0) return "Not enough recent data.";
  const count = `${quizzes.length} quiz${quizzes.length === 1 ? "" : "zes"}`;
  const summary = `${name} completed ${count} in the last 30 days with an average score of ${formatQuizAverage(mean(quizzes.map((quiz) => quiz.scorePct)))}.`;
  if (!strongest) return summary;
  return `${summary} ${strongest.name} is currently ${name}'s strongest recent subject.`;
}

function recentRecommendation(chapter: RecentChapter | null, subject: RecentSubject | null): string {
  if (chapter) {
    return `Revise ${chapter.subjectName} — ${chapter.chapterKey}, averaging ${formatQuizAverage(chapter.average)} over ${chapter.attempts} quizzes in the last 30 days.`;
  }
  if (subject) {
    return `Revise ${subject.name}, averaging ${formatQuizAverage(subject.average)} over ${subject.quizzes} quizzes in the last 30 days.`;
  }
  return "Not enough recent data.";
}

function compareWindows(previousRows: ParentDashboardQuiz[], recentRows: ParentDashboardQuiz[]): SubjectImprovement | null {
  const earlier = new Map(subjectGroups(previousRows).map((subject) => [subject.subjectId, subject]));
  let best: SubjectImprovement | null = null;
  for (const recent of subjectGroups(recentRows)) {
    const prior = earlier.get(recent.subjectId);
    if (!prior || prior.quizzes < MIN_COMPARISON_QUIZZES || recent.quizzes < MIN_COMPARISON_QUIZZES) continue;
    const change = Math.round((recent.average - prior.average) * 10) / 10;
    if (change <= 0) continue;
    if (!best || change > best.change) best = { name: recent.name, change };
  }
  return best;
}

function rankSubjects(quizzes: ParentDashboardQuiz[]): RecentSubject[] {
  return subjectGroups(quizzes)
    .filter((subject) => subject.quizzes >= MIN_SUBJECT_QUIZZES)
    .sort((a, b) => b.average - a.average || b.quizzes - a.quizzes);
}

function weakestRepeatedChapter(
  quizzes: ParentDashboardQuiz[],
  preferredSubjectId: string | null,
  options?: { stayInSubject?: boolean },
): RecentChapter | null {
  const chapters = chapterGroups(quizzes).filter((chapter) => chapter.attempts >= MIN_CHAPTER_ATTEMPTS);
  const preferred = preferredSubjectId
    ? chapters.filter((chapter) => chapter.subjectId === preferredSubjectId)
    : [];
  if (preferredSubjectId && preferred.length === 0 && options?.stayInSubject) return null;
  const pool = preferred.length > 0 ? preferred : chapters;
  return [...pool].sort((a, b) => a.average - b.average || b.attempts - a.attempts)[0] ?? null;
}

function subjectGroups(quizzes: ParentDashboardQuiz[]): RecentSubject[] {
  const groups = new Map<string, ParentDashboardQuiz[]>();
  for (const quiz of quizzes) {
    const list = groups.get(quiz.subjectId) ?? [];
    list.push(quiz);
    groups.set(quiz.subjectId, list);
  }
  return [...groups.entries()].map(([subjectId, list]) => ({
    subjectId,
    name: subjects.find((subject) => subject.id === subjectId)?.name ?? subjectId,
    average: mean(list.map((quiz) => quiz.scorePct)) ?? 0,
    quizzes: list.length,
  }));
}

function chapterGroups(quizzes: ParentDashboardQuiz[]): RecentChapter[] {
  const groups = new Map<string, ParentDashboardQuiz[]>();
  for (const quiz of quizzes) {
    const key = `${quiz.subjectId}::${quiz.chapterKey}`;
    const list = groups.get(key) ?? [];
    list.push(quiz);
    groups.set(key, list);
  }
  return [...groups.entries()].map(([key, list]) => {
    const [subjectId, chapterKey] = key.split("::");
    return {
      subjectId,
      subjectName: subjects.find((subject) => subject.id === subjectId)?.name ?? subjectId,
      chapterKey,
      average: mean(list.map((quiz) => quiz.scorePct)) ?? 0,
      attempts: list.length,
    };
  });
}

function mean(values: Array<number | null>): number | null {
  const scores = values.filter((value): value is number => value !== null && Number.isFinite(value));
  if (scores.length === 0) return null;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function instant(value: string): number {
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? time : 0;
}

function inHalfOpenRange(value: string, startIso: string, endIso: string): boolean {
  const time = instant(value);
  return time >= instant(startIso) && time < instant(endIso);
}
