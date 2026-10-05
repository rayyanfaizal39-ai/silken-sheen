/**
 * Student-owned weekly parent report.
 *
 * The student chooses an optional destination email. There is no parent
 * account. Every number in the report comes from quiz_history for the
 * current Monday–Sunday week in Asia/Kuala_Lumpur, plus the current streak
 * on user_progress. Study time, weekly notes, and weekly flashcards are
 * not tracked, so this module never invents them.
 */

const KL_OFFSET_MS = 8 * 60 * 60 * 1000;
const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const SUBJECT_NAMES: Record<string, string> = {
  bm: "Bahasa Melayu",
  english: "English",
  math: "Mathematics",
  science: "Science",
  sejarah: "Sejarah",
  geography: "Geography",
};

export type WeeklyQuizRow = {
  createdAt: string;
  scorePct: number | string | null;
  subjectId: string;
  chapterKey: string;
  xpEarned: number | string | null;
};

export type WeeklyParentReport = {
  studentName: string;
  reportPeriod: string;
  weekStart: string;
  weekEnd: string;
  overallStatus: string;
  weeklySummary: string;
  quizzesCompleted: number;
  averageQuizScore: number | null;
  weeklyXp: number;
  currentStreak: number;
  activeDayMarks: boolean[];
  subjects: Array<{ name: string; percentage: number; status: string }>;
  biggestWin: string;
  focusArea: string;
  brainInsight: string;
  recommendedGoals: string[];
};

export type KualaLumpurWeek = {
  weekStart: string;
  weekEnd: string;
  dayKeys: string[];
  startIso: string;
  endIso: string;
};

/** Closed email cycle. The labeled week is Monday–Sunday; the measured window starts at the previous Sunday 18:00. */
export type EmailedReportCycle = KualaLumpurWeek & {
  periodLabel: string;
  subjectPeriod: string;
};

export function currentKualaLumpurWeek(now: Date): KualaLumpurWeek {
  const shifted = new Date(now.getTime() + KL_OFFSET_MS);
  const weekday = shifted.getUTCDay();
  const daysFromMonday = weekday === 0 ? 6 : weekday - 1;
  const startUtc = Date.UTC(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth(),
    shifted.getUTCDate() - daysFromMonday,
  );
  const dayKeys = Array.from({ length: 7 }, (_, index) => dateKeyFromUtc(startUtc + index * 86_400_000));
  const startIso = new Date(startUtc - KL_OFFSET_MS).toISOString();
  const endIso = new Date(startUtc + 7 * 86_400_000 - KL_OFFSET_MS).toISOString();
  return {
    weekStart: dayKeys[0],
    weekEnd: dayKeys[6],
    dayKeys,
    startIso,
    endIso,
  };
}

export function kualaLumpurDateKey(instant: Date): string {
  return dateKeyFromUtc(instant.getTime() + KL_OFFSET_MS);
}

const EMAIL_CUTOFF_HOUR = 18;

/**
 * The report email that is due at `now`.
 *
 * Asia/Kuala_Lumpur is UTC+8 all year. The send clock is Sunday 18:00 there.
 * Each emailed cycle is the half-open range
 * [previous Sunday 18:00, this Sunday 18:00).
 * Monday 00:00 and Sunday 17:59:59 belong to the cycle that closes that Sunday.
 * Sunday 18:00:00 starts the next cycle, so a late Sunday quiz is not dropped.
 */
export function emailedParentReportCycle(now: Date): EmailedReportCycle {
  const shifted = new Date(now.getTime() + KL_OFFSET_MS);
  const weekday = shifted.getUTCDay();
  const timeOfDayMs =
    ((shifted.getUTCHours() * 60 + shifted.getUTCMinutes()) * 60 + shifted.getUTCSeconds()) * 1000 +
    shifted.getUTCMilliseconds();
  const daysUntilSunday = weekday === 0 ? 0 : 7 - weekday;
  let sundayKlMidnight = Date.UTC(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth(),
    shifted.getUTCDate() + daysUntilSunday,
  );
  const beforeCutoff = weekday !== 0 || timeOfDayMs < EMAIL_CUTOFF_HOUR * 60 * 60 * 1000;
  if (beforeCutoff) sundayKlMidnight -= 7 * 86_400_000;
  const endMs = sundayKlMidnight + EMAIL_CUTOFF_HOUR * 60 * 60 * 1000 - KL_OFFSET_MS;
  const mondayKlMidnight = sundayKlMidnight - 6 * 86_400_000;
  const dayKeys = Array.from({ length: 7 }, (_, index) => dateKeyFromUtc(mondayKlMidnight + index * 86_400_000));
  return {
    weekStart: dayKeys[0],
    weekEnd: dayKeys[6],
    dayKeys,
    startIso: new Date(endMs - 7 * 86_400_000).toISOString(),
    endIso: new Date(endMs).toISOString(),
    periodLabel: formatWeekPeriod(dayKeys[0], dayKeys[6]),
    subjectPeriod: formatSubjectPeriod(dayKeys[0], dayKeys[6]),
  };
}

export function formatSubjectPeriod(weekStart: string, weekEnd: string): string {
  const start = parseDateKey(weekStart);
  const end = parseDateKey(weekEnd);
  const startMonth = monthName(start.month);
  const endMonth = monthName(end.month);
  if (start.month === end.month && start.year === end.year) return `${start.day}–${end.day} ${endMonth}`;
  if (start.year === end.year) return `${start.day} ${startMonth}–${end.day} ${endMonth}`;
  return `${start.day} ${startMonth} ${start.year}–${end.day} ${endMonth} ${end.year}`;
}

export function automatedDeliveryDecision(input: {
  entitled: boolean;
  existingStatus: string | null;
  hasAccountEmail: boolean;
  quizCount: number;
}): "not_entitled" | "skipped" | "no_recipient" | "no_activity" | "send" {
  if (!input.entitled) return "not_entitled";
  if (input.existingStatus === "sent") return "skipped";
  if (!input.hasAccountEmail) return "no_recipient";
  if (input.quizCount < 1) return "no_activity";
  return "send";
}

export function formatWeekPeriod(weekStart: string, weekEnd: string): string {
  const start = parseDateKey(weekStart);
  const end = parseDateKey(weekEnd);
  const sameMonth = start.month === end.month && start.year === end.year;
  const startMonth = monthName(start.month);
  const endMonth = monthName(end.month);
  if (sameMonth) return `${start.day}–${end.day} ${endMonth} ${end.year}`;
  if (start.year === end.year) return `${start.day} ${startMonth}–${end.day} ${endMonth} ${end.year}`;
  return `${start.day} ${startMonth} ${start.year}–${end.day} ${endMonth} ${end.year}`;
}

export function normalizeParentReportEmail(
  value: string,
): { ok: true; email: string | null } | { ok: false; error: string } {
  const trimmed = value.trim();
  if (!trimmed) return { ok: true, email: null };
  const email = trimmed.toLowerCase();
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Enter a valid email address, or leave it blank." };
  }
  return { ok: true, email };
}

/** A stored or account address is usable only when it is a real email. */
export function usableEmail(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) return null;
  return email;
}

/**
 * Parent address when it is present and valid. Otherwise the student's
 * authenticated account email. Returns null only when neither is usable.
 */
export function resolveWeeklyReportRecipient(
  parentReportEmail: string | null | undefined,
  accountEmail: string | null | undefined,
): string | null {
  return usableEmail(parentReportEmail) ?? usableEmail(accountEmail);
}

/**
 * Stored billing values that resolve to a plan with parent_reports.
 * Kept as an explicit list so the Edge Function can apply the same rule
 * without importing the app alias. src/features/parent-report tests lock
 * this list to hasFeature(..., "parent_reports").
 */
export function storedPlanGrantsParentReports(storedPlan: string | null | undefined): boolean {
  return (
    storedPlan === "premium" ||
    storedPlan === "paid" ||
    storedPlan === "captain" ||
    storedPlan === "enterprise"
  );
}

export function hasParentReportsAccess(
  activeSubscriptionPlan: string | null | undefined,
  profilePlan: string | null | undefined,
): boolean {
  const hasActiveSubscription = typeof activeSubscriptionPlan === "string" && activeSubscriptionPlan.length > 0;
  return storedPlanGrantsParentReports(hasActiveSubscription ? activeSubscriptionPlan : profilePlan);
}

export function buildWeeklyParentReport(input: {
  studentName: string;
  streak: number;
  quizzes: WeeklyQuizRow[];
  now?: Date;
  bounds?: KualaLumpurWeek;
  preferRepeatedWeakness?: boolean;
}): WeeklyParentReport {
  const now = input.now ?? new Date();
  const week = input.bounds ?? currentKualaLumpurWeek(now);
  const studentName = input.studentName.trim() || "Student";
  const firstName = studentName.split(/\s+/)[0] ?? studentName;
  const streak = Number.isFinite(input.streak) && input.streak > 0 ? Math.floor(input.streak) : 0;

  const quizzes = input.quizzes
    .map((row) => {
      const created = new Date(row.createdAt);
      return {
        created,
        scorePct: finiteNumber(row.scorePct),
        subjectId: row.subjectId,
        chapterKey: row.chapterKey,
        xpEarned: finiteNumber(row.xpEarned),
      };
    })
    .filter(
      (row) =>
        !Number.isNaN(row.created.getTime()) &&
        row.created.getTime() >= new Date(week.startIso).getTime() &&
        row.created.getTime() < new Date(week.endIso).getTime(),
    );

  const active = new Set(quizzes.map((row) => kualaLumpurDateKey(row.created)));
  const activeDayMarks = week.dayKeys.map((key) => active.has(key));
  const quizzesCompleted = quizzes.length;
  const weeklyXp = quizzes.reduce((sum, row) => sum + row.xpEarned, 0);
  const averageQuizScore =
    quizzesCompleted === 0
      ? null
      : Math.round(quizzes.reduce((sum, row) => sum + row.scorePct, 0) / quizzesCompleted);

  const bySubject = groupAverages(quizzes.map((row) => ({ key: row.subjectId, scorePct: row.scorePct })));
  const subjects = [...bySubject.entries()]
    .map(([subjectId, stats]) => ({
      name: SUBJECT_NAMES[subjectId] ?? subjectId,
      percentage: stats.average,
      status: scoreStatus(stats.average),
    }))
    .sort((a, b) => b.percentage - a.percentage || a.name.localeCompare(b.name));

  const byChapter = groupAverages(
    quizzes.map((row) => ({
      key: `${row.subjectId}::${row.chapterKey}`,
      scorePct: row.scorePct,
    })),
  );
  const chapters = [...byChapter.entries()]
    .map(([key, stats]) => {
      const splitAt = key.indexOf("::");
      const subjectId = key.slice(0, splitAt);
      const chapterKey = key.slice(splitAt + 2);
      return {
        subjectName: SUBJECT_NAMES[subjectId] ?? subjectId,
        chapterKey,
        average: stats.average,
        attempts: stats.attempts,
      };
    })
    .sort((a, b) => a.average - b.average || b.attempts - a.attempts || a.chapterKey.localeCompare(b.chapterKey));

  const strongest = subjects[0] ?? null;
  const bestQuiz = [...quizzes].sort(
    (a, b) => b.scorePct - a.scorePct || b.created.getTime() - a.created.getTime(),
  )[0];

  const overallStatus =
    quizzesCompleted === 0
      ? "No quizzes yet"
      : averageQuizScore !== null && averageQuizScore >= 80
        ? "Strong progress"
        : averageQuizScore !== null && averageQuizScore >= 60
          ? "Steady progress"
          : "Needs support";

  const weeklySummary =
    quizzesCompleted === 0
      ? `${firstName} has no recorded quizzes for this Monday–Sunday week.`
      : `${firstName} completed ${quizzesCompleted} quiz${quizzesCompleted === 1 ? "" : "zes"} this week with an average score of ${averageQuizScore}%.`;

  const biggestWin = bestQuiz
    ? `Scored ${Math.round(bestQuiz.scorePct)}% in ${SUBJECT_NAMES[bestQuiz.subjectId] ?? bestQuiz.subjectId} ${bestQuiz.chapterKey}.`
    : streak > 0
      ? `${firstName} is on a ${streak}-day study streak.`
      : "No quiz result to highlight this week.";

  const subjectAttempts = [...bySubject.entries()].map(([subjectId, stats]) => ({
    name: SUBJECT_NAMES[subjectId] ?? subjectId,
    average: stats.average,
    attempts: stats.attempts,
  }));
  const repeatedFocus = input.preferRepeatedWeakness
    ? repeatedWeaknessFocus(chapters, subjectAttempts)
    : null;
  const weakest = chapters[0] ?? null;
  const focusArea = repeatedFocus
    ? repeatedFocus.focusArea
    : weakest && weakest.average < 80
      ? `${weakest.subjectName} — ${weakest.chapterKey} averaged ${weakest.average}%.`
      : "No chapter stood out as needing extra support this week.";

  const brainInsight = strongest
    ? `${strongest.name} was ${firstName}'s strongest subject this week with an average score of ${strongest.percentage}%.`
    : `${firstName} has no quiz results in this Monday–Sunday week, so there is no subject insight yet.`;

  const weakGoals = input.preferRepeatedWeakness
    ? repeatedFocus?.goals ?? []
    : chapters
        .filter((chapter) => chapter.average < 80)
        .slice(0, 3)
        .map(
          (chapter) =>
            `Revise ${chapter.subjectName} — ${chapter.chapterKey} (averaging ${chapter.average}%).`,
        );
  const recommendedGoals =
    weakGoals.length > 0
      ? weakGoals
      : quizzesCompleted > 0
        ? ["Keep this week's quiz routine going."]
        : ["Complete one quiz so next week's report can show real results."];

  return {
    studentName,
    reportPeriod: formatWeekPeriod(week.weekStart, week.weekEnd),
    weekStart: week.weekStart,
    weekEnd: week.weekEnd,
    overallStatus,
    weeklySummary,
    quizzesCompleted,
    averageQuizScore,
    weeklyXp,
    currentStreak: streak,
    activeDayMarks,
    subjects,
    biggestWin,
    focusArea,
    brainInsight,
    recommendedGoals,
  };
}

function repeatedWeaknessFocus(
  chapters: Array<{ subjectName: string; chapterKey: string; average: number; attempts: number }>,
  subjects: Array<{ name: string; average: number; attempts: number }>,
): { focusArea: string; goals: string[] } | null {
  const weakestSubject = [...subjects]
    .filter((subject) => subject.attempts >= 2)
    .sort((a, b) => a.average - b.average || b.attempts - a.attempts || a.name.localeCompare(b.name))[0];
  if (!weakestSubject) return null;
  const chapter = chapters
    .filter((item) => item.subjectName === weakestSubject.name && item.attempts >= 2)
    .sort((a, b) => a.average - b.average || b.attempts - a.attempts)[0];
  if (chapter && chapter.average < 80) {
    return {
      focusArea: `${chapter.subjectName} — ${chapter.chapterKey} averaged ${chapter.average}% over ${chapter.attempts} quizzes.`,
      goals: [
        `Revise ${chapter.subjectName} — ${chapter.chapterKey} (averaging ${chapter.average}% over ${chapter.attempts} quizzes).`,
      ],
    };
  }
  if (weakestSubject.average < 80) {
    return {
      focusArea: `${weakestSubject.name} averaged ${weakestSubject.average}% across ${weakestSubject.attempts} quizzes.`,
      goals: [
        `Revise ${weakestSubject.name} (averaging ${weakestSubject.average}% across ${weakestSubject.attempts} quizzes).`,
      ],
    };
  }
  return {
    focusArea: "No chapter stood out as needing extra support this week.",
    goals: [],
  };
}

function groupAverages(rows: Array<{ key: string; scorePct: number }>) {
  const groups = new Map<string, { total: number; attempts: number }>();
  for (const row of rows) {
    const current = groups.get(row.key) ?? { total: 0, attempts: 0 };
    current.total += row.scorePct;
    current.attempts += 1;
    groups.set(row.key, current);
  }
  return new Map(
    [...groups.entries()].map(([key, stats]) => [
      key,
      { average: Math.round(stats.total / stats.attempts), attempts: stats.attempts },
    ]),
  );
}

function scoreStatus(average: number): string {
  if (average >= 80) return "Strong";
  if (average >= 60) return "Steady";
  return "Needs revision";
}

function finiteNumber(value: number | string | null | undefined): number {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : 0;
}

function dateKeyFromUtc(utcMs: number): string {
  const date = new Date(utcMs);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}-${day}`;
}

function parseDateKey(key: string): { year: number; month: number; day: number } {
  const [year, month, day] = key.split("-").map(Number);
  return { year, month, day };
}

function monthName(month: number): string {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1] ?? "";
}
