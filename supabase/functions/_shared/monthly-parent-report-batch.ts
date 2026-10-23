import { claimDeliverySlot, type ClaimOutcome } from "./delivery-claim.ts";
import { maskEmailAddress, type EmailContent } from "./email-brand.ts";
import { buildParentReportEmail } from "./email-templates.ts";
import {
  previousKualaLumpurMonth,
  rankNameForXp,
  summarizeMonthlyQuizzes,
  type MonthlyQuizRow,
} from "./monthly-parent-report.ts";
import { resolveParentReportRecipient } from "./parent-email-consent.ts";
import { usableEmail } from "./weekly-parent-report.ts";
import { hasParentReportsAccess } from "./weekly-parent-report.ts";

export const PARENT_DASHBOARD_URL = "https://www.myacademy.my/parent-dashboard";

export type MonthlyStudent = {
  fullName: string | null;
  profilePlan: string | null;
  subscriptionPlan: string | null;
  parentReportEmail: string | null;
  accountEmail: string | null;
  xp: number;
  streak: number;
  quizzes: MonthlyQuizRow[];
};

export type MonthlyStore = {
  entitledStudentIds(): Promise<string[]>;
  loadStudent(studentId: string): Promise<MonthlyStudent | null>;
  claim(studentId: string, monthStart: string, recipient: string): Promise<ClaimOutcome>;
  markSent(studentId: string, monthStart: string, messageId: string): Promise<void>;
  markFailed(studentId: string, monthStart: string, message: string): Promise<void>;
};

export type SendParentReport = (input: {
  to: string;
  content: EmailContent;
  idempotencyKey: string;
}) => Promise<{ id: string }>;

export async function runMonthlyParentBatch(
  store: MonthlyStore,
  send: SendParentReport,
  options: { dryRun: boolean; now?: Date },
): Promise<Record<string, unknown>> {
  const now = options.now ?? new Date();
  const period = previousKualaLumpurMonth(now);
  const studentIds = await store.entitledStudentIds();
  const counts = {
    sent: 0,
    skipped: 0,
    failed: 0,
    noActivity: 0,
    noRecipient: 0,
    wouldSend: 0,
    withActivity: 0,
    lostRace: 0,
  };
  const recipients: Array<{ maskedEmail: string; subject: string }> = [];

  for (const studentId of studentIds) {
    const student = await store.loadStudent(studentId);
    if (!student) {
      counts.failed += 1;
      continue;
    }
    if (!hasParentReportsAccess(student.subscriptionPlan, student.profilePlan)) continue;

    const quizzes = quizzesInPeriod(student.quizzes, period.startIso, period.endIso);
    if (quizzes.length > 0) counts.withActivity += 1;
    const summary = summarizeMonthlyQuizzes(quizzes);
    if (summary.totalQuizzes === 0) {
      counts.noActivity += 1;
      continue;
    }
    const recipient = resolveParentReportRecipient(student);
    if (!recipient) {
      counts.noRecipient += 1;
      continue;
    }
    const content = monthlyEmail(student, summary, period.periodLabel, true);
    if (options.dryRun) {
      counts.wouldSend += 1;
      recipients.push({ maskedEmail: maskEmailAddress(recipient), subject: content.subject });
      continue;
    }

    const claim = await store.claim(studentId, period.monthStart, recipient);
    if (claim === "lost") {
      counts.lostRace += 1;
      counts.skipped += 1;
      continue;
    }
    if (claim !== "claimed") {
      counts.failed += 1;
      continue;
    }
    try {
      const delivery = await send({
        to: recipient,
        content,
        idempotencyKey: `academy-monthly-parent-report-${studentId}-${period.monthStart}`,
      });
      await store.markSent(studentId, period.monthStart, delivery.id);
      counts.sent += 1;
    } catch (error) {
      const message =
        error instanceof Error ? error.message.slice(0, 200) : "Email delivery failed";
      await store.markFailed(studentId, period.monthStart, message);
      counts.failed += 1;
    }
  }

  return {
    dryRun: options.dryRun,
    monthStart: period.monthStart,
    periodLabel: period.periodLabel,
    windowStart: period.startIso,
    windowEnd: period.endIso,
    eligible: studentIds.length,
    withActivity: counts.withActivity,
    noActivity: counts.noActivity,
    alreadySent: counts.skipped,
    wouldSend: options.dryRun ? counts.wouldSend : counts.sent,
    noRecipient: counts.noRecipient,
    failed: counts.failed,
    lostRace: counts.lostRace,
    ...(options.dryRun ? { recipients } : {}),
  };
}

export type ParentReportAttempt = "ok" | "limited" | "error";

export async function runManualParentReport(input: {
  student: MonthlyStudent | null;
  userId: string;
  now?: Date;
  recordAttempt: (recipient: string) => Promise<ParentReportAttempt>;
  send: SendParentReport;
}): Promise<{ status: number; body: Record<string, unknown> }> {
  const student = input.student;
  if (!student) return { status: 500, body: { error: "The report could not be prepared." } };
  if (!hasParentReportsAccess(student.subscriptionPlan, student.profilePlan)) {
    return { status: 403, body: { error: "Parent Reports are included with Premium." } };
  }
  const recipient = resolveParentReportRecipient(student);
  if (!recipient) {
    return { status: 422, body: { error: "This account has no email address for the report." } };
  }
  const recorded = await input.recordAttempt(recipient);
  if (recorded === "limited") {
    return { status: 429, body: { error: "You can send up to five parent reports per hour." } };
  }
  if (recorded !== "ok")
    return { status: 500, body: { error: "Could not record the email attempt." } };

  const now = input.now ?? new Date();
  const period = previousKualaLumpurMonth(now);
  const summary = summarizeMonthlyQuizzes(
    quizzesInPeriod(student.quizzes, period.startIso, period.endIso),
  );
  const content = monthlyEmail(student, summary, period.periodLabel, false);
  try {
    const delivery = await input.send({
      to: recipient,
      content,
      idempotencyKey: `academy-parent-report-${input.userId}-${Date.now()}`,
    });
    return {
      status: 200,
      body: {
        sent: true,
        id: delivery.id,
        usedParentEmail: recipient !== usableEmail(student.accountEmail),
      },
    };
  } catch (error) {
    return {
      status: 502,
      body: { error: error instanceof Error ? error.message : "Email delivery failed" },
    };
  }
}

function quizzesInPeriod(quizzes: MonthlyQuizRow[], startIso: string, endIso: string) {
  const start = Date.parse(startIso);
  const end = Date.parse(endIso);
  return quizzes.filter((quiz) => {
    const at = new Date(quiz.createdAt).getTime();
    return at >= start && at < end;
  });
}

function monthlyEmail(
  student: MonthlyStudent,
  summary: ReturnType<typeof summarizeMonthlyQuizzes>,
  periodLabel: string,
  automatic: boolean,
) {
  const totalXp = Number.isFinite(student.xp) ? Math.max(0, Math.round(student.xp)) : 0;
  const streak = Number.isFinite(student.streak) ? Math.max(0, Math.round(student.streak)) : 0;
  return buildParentReportEmail({
    cadence: "monthly",
    automatic,
    studentName: student.fullName?.trim() || "Student",
    periodLabel,
    totalQuizzes: summary.totalQuizzes,
    overallAvg: summary.overallAvg,
    passRate: summary.passRate,
    rankName: rankNameForXp(totalXp),
    totalXp,
    studyStreak: streak,
    strongest: summary.strongest,
    weakSpots: summary.weakSpots,
    recommendation: summary.recommendation,
    dashboardUrl: PARENT_DASHBOARD_URL,
  });
}

export { claimDeliverySlot };
