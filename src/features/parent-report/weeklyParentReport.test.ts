import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  buildWeeklyParentReportEmail,
  presentWeeklyReportEmail,
} from "../../../supabase/functions/_shared/weekly-parent-report-email.ts";
import { hasFeature, resolveStoredPlan } from "@/lib/feature-access";
import {
  automatedDeliveryDecision,
  buildWeeklyParentReport,
  currentKualaLumpurWeek,
  emailedParentReportCycle,
  hasParentReportsAccess,
  normalizeParentReportEmail,
  resolveWeeklyReportRecipient,
  storedPlanGrantsParentReports,
} from "./weeklyParentReport";

const STORED_PLANS = [
  null,
  "",
  "free",
  "basic",
  "pro",
  "explorer",
  "premium",
  "paid",
  "captain",
  "teacher",
  "school",
  "enterprise",
];

describe("parent report entitlement", () => {
  it("matches hasFeature(parent_reports) for every stored plan value", () => {
    for (const plan of STORED_PLANS) {
      expect(storedPlanGrantsParentReports(plan)).toBe(
        hasFeature(resolveStoredPlan(plan), "parent_reports"),
      );
    }
  });

  it("uses the active subscription when one exists, otherwise the profile plan", () => {
    expect(hasParentReportsAccess("premium", "free")).toBe(true);
    expect(hasParentReportsAccess("pro", "paid")).toBe(false);
    expect(hasParentReportsAccess(null, "paid")).toBe(true);
    expect(hasParentReportsAccess(null, "free")).toBe(false);
  });
});

describe("parent report email", () => {
  it("turns a blank value into null and rejects an invalid address", () => {
    expect(normalizeParentReportEmail("   ")).toEqual({ ok: true, email: null });
    expect(normalizeParentReportEmail(" Mother@Gmail.com ")).toEqual({
      ok: true,
      email: "mother@gmail.com",
    });
    expect(normalizeParentReportEmail("not-an-email").ok).toBe(false);
  });

  it("falls back to the student account email when the parent address is empty or invalid", () => {
    expect(resolveWeeklyReportRecipient(null, "Aiman@Gmail.com")).toBe("aiman@gmail.com");
    expect(resolveWeeklyReportRecipient("  ", "aiman@gmail.com")).toBe("aiman@gmail.com");
    expect(resolveWeeklyReportRecipient("mother@gmail.com", "aina@gmail.com")).toBe("mother@gmail.com");
    expect(resolveWeeklyReportRecipient("not-an-email", "aina@gmail.com")).toBe("aina@gmail.com");
    expect(resolveWeeklyReportRecipient(null, null)).toBeNull();
  });
});

describe("weekly parent report", () => {
  const now = new Date("2026-10-07T02:00:00.000Z"); // Wednesday 10:00 in Kuala Lumpur

  it("uses the Monday–Sunday week in Asia/Kuala_Lumpur", () => {
    expect(currentKualaLumpurWeek(now)).toMatchObject({
      weekStart: "2026-10-05",
      weekEnd: "2026-10-11",
    });
    const sundayNight = new Date("2026-10-04T15:30:00.000Z"); // Sunday 23:30 KL
    expect(currentKualaLumpurWeek(sundayNight).weekStart).toBe("2026-09-28");
    const mondayMorning = new Date("2026-10-04T16:30:00.000Z"); // Monday 00:30 KL
    expect(currentKualaLumpurWeek(mondayMorning).weekStart).toBe("2026-10-05");
  });

  it("sums xp_earned, averages score_pct, and marks the real quiz days", () => {
    const report = buildWeeklyParentReport({
      studentName: "Maya Rahman",
      streak: 4,
      now,
      quizzes: [
        {
          createdAt: "2026-10-06T02:00:00.000Z", // Tuesday KL
          scorePct: 95,
          subjectId: "science",
          chapterKey: "Chapter 4",
          xpEarned: 30,
        },
        {
          createdAt: "2026-10-11T15:00:00.000Z", // Sunday KL
          scorePct: 40,
          subjectId: "sejarah",
          chapterKey: "Bab 3",
          xpEarned: 0,
        },
        {
          createdAt: "2026-10-04T15:00:00.000Z", // previous Sunday KL
          scorePct: 100,
          subjectId: "math",
          chapterKey: "Chapter 1",
          xpEarned: 500,
        },
      ],
    });

    expect(report.quizzesCompleted).toBe(2);
    expect(report.averageQuizScore).toBe(68);
    expect(report.weeklyXp).toBe(30);
    expect(report.activeDayMarks).toEqual([false, true, false, false, false, false, true]);
    expect(report.biggestWin).toBe("Scored 95% in Science Chapter 4.");
    expect(report.focusArea).toBe("Sejarah — Bab 3 averaged 40%.");
    expect(report.brainInsight).toBe(
      "Science was Maya's strongest subject this week with an average score of 95%.",
    );
    expect(report.recommendedGoals).toEqual(["Revise Sejarah — Bab 3 (averaging 40%)."]);
    expect(report.subjects.map((subject) => subject.name)).toEqual(["Science", "Sejarah"]);
    expect(report.reportPeriod).toBe("5–11 Oct 2026");
    expect(report.currentStreak).toBe(4);
  });

  it("does not invent study time or a week of activity when there are no quizzes", () => {
    const report = buildWeeklyParentReport({
      studentName: "Aiman",
      streak: 0,
      now,
      quizzes: [],
    });
    expect(report.quizzesCompleted).toBe(0);
    expect(report.averageQuizScore).toBeNull();
    expect(report.weeklyXp).toBe(0);
    expect(report.activeDayMarks.every((day) => day === false)).toBe(true);
    expect(report.subjects).toEqual([]);
    expect(report.overallStatus).toBe("No quizzes yet");
    expect(report.biggestWin).toBe("No quiz result to highlight this week.");
    expect(JSON.stringify(report)).not.toMatch(/5h 45m|7:30|Puan Farah/);
  });
});

describe("emailed weekly parent report cycle", () => {
  const sundaySend = new Date("2026-10-11T10:00:00.000Z");

  it("includes Monday 00:00 and Sunday 17:59:59, and starts the next cycle at Sunday 18:00", () => {
    const cycle = emailedParentReportCycle(sundaySend);
    expect(cycle).toMatchObject({
      weekStart: "2026-10-05",
      weekEnd: "2026-10-11",
      subjectPeriod: "5–11 Oct",
      startIso: "2026-10-04T10:00:00.000Z",
      endIso: "2026-10-11T10:00:00.000Z",
    });

    const report = buildWeeklyParentReport({
      studentName: "Rayyan",
      streak: 2,
      bounds: cycle,
      preferRepeatedWeakness: true,
      quizzes: [
        quiz("2026-10-04T09:59:59.000Z", 50),
        quiz("2026-10-04T10:00:00.000Z", 70),
        quiz("2026-10-04T16:00:00.000Z", 80),
        quiz("2026-10-11T09:59:59.000Z", 90),
        quiz("2026-10-11T10:00:00.000Z", 10),
      ],
    });

    expect(report.quizzesCompleted).toBe(3);
    expect(report.weeklyXp).toBe(30);
    expect(report.averageQuizScore).toBe(80);
    expect(report.reportPeriod).toBe("5–11 Oct 2026");
  });

  it("reports the completed 28 Sep–4 Oct cycle on the following Monday", () => {
    const cycle = emailedParentReportCycle(new Date("2026-10-05T06:00:00.000Z"));
    expect(cycle.weekStart).toBe("2026-09-28");
    expect(cycle.weekEnd).toBe("2026-10-04");
    expect(cycle.subjectPeriod).toBe("28 Sep–4 Oct");
    expect(cycle.startIso).toBe("2026-09-27T10:00:00.000Z");
    expect(cycle.endIso).toBe("2026-10-04T10:00:00.000Z");
  });

  it("skips empty activity and an existing sent row without treating either as a new send", () => {
    expect(automatedDeliveryDecision({
      entitled: false,
      existingStatus: null,
      hasAccountEmail: true,
      quizCount: 4,
    })).toBe("not_entitled");
    expect(automatedDeliveryDecision({
      entitled: true,
      existingStatus: "sent",
      hasAccountEmail: true,
      quizCount: 4,
    })).toBe("skipped");
    expect(automatedDeliveryDecision({
      entitled: true,
      existingStatus: null,
      hasAccountEmail: true,
      quizCount: 0,
    })).toBe("no_activity");
    expect(automatedDeliveryDecision({
      entitled: true,
      existingStatus: null,
      hasAccountEmail: false,
      quizCount: 2,
    })).toBe("no_recipient");
    expect(automatedDeliveryDecision({
      entitled: true,
      existingStatus: "failed",
      hasAccountEmail: true,
      quizCount: 2,
    })).toBe("send");
  });

  it("uses the repeated weak subject instead of one low score or another subject's chapter", () => {
    const cycle = emailedParentReportCycle(new Date("2026-10-04T10:00:00.000Z"));
    const report = buildWeeklyParentReport({
      studentName: "Maya",
      streak: 1,
      bounds: cycle,
      preferRepeatedWeakness: true,
      quizzes: [
        quiz("2026-09-29T04:00:00.000Z", 94, "geography", "Chapter 2"),
        quiz("2026-09-29T05:00:00.000Z", 94, "geography", "Chapter 2"),
        quiz("2026-09-29T06:00:00.000Z", 94, "geography", "Chapter 2"),
        quiz("2026-09-30T04:00:00.000Z", 88, "science", "Chapter 8"),
        quiz("2026-09-30T05:00:00.000Z", 88, "science", "Chapter 8"),
        quiz("2026-10-01T04:00:00.000Z", 40, "sejarah", "Chapter 1"),
        quiz("2026-10-02T04:00:00.000Z", 90, "sejarah", "Chapter 3"),
        quiz("2026-10-03T04:00:00.000Z", 96, "sejarah", "Chapter 6"),
      ],
    });

    expect(report.focusArea).toBe("Sejarah averaged 75% across 3 quizzes.");
    expect(report.recommendedGoals).toEqual(["Revise Sejarah (averaging 75% across 3 quizzes)."]);
    expect(report.biggestWin).toBe("Scored 96% in Sejarah Chapter 6.");
    expect(report.brainInsight).toContain("Geography");
    expect(JSON.stringify(report)).not.toMatch(/study time|flashcard|retention|mastery/i);
  });
});

function quiz(
  createdAt: string,
  scorePct: number,
  subjectId = "science",
  chapterKey = "Chapter 1",
): {
  createdAt: string;
  scorePct: number;
  subjectId: string;
  chapterKey: string;
  xpEarned: number;
} {
  return { createdAt, scorePct, subjectId, chapterKey, xpEarned: 10 };
}

describe("weekly parent report email template", () => {
  const report = buildWeeklyParentReport({
    studentName: "Maya Rahman",
    streak: 4,
    now: new Date("2026-10-07T02:00:00.000Z"),
    preferRepeatedWeakness: true,
    quizzes: [
      quiz("2026-10-06T02:00:00.000Z", 95, "science", "Chapter 4"),
      quiz("2026-10-06T03:00:00.000Z", 85, "science", "Chapter 4"),
      quiz("2026-10-08T02:00:00.000Z", 70, "sejarah", "Chapter 6"),
      quiz("2026-10-08T03:00:00.000Z", 64, "sejarah", "Chapter 6"),
      quiz("2026-10-08T04:00:00.000Z", 67, "sejarah", "Chapter 6"),
      quiz("2026-10-09T02:00:00.000Z", 40, "sejarah", "Chapter 1"),
    ],
  });
  const email = buildWeeklyParentReportEmail(report);
  const view = presentWeeklyReportEmail(report);

  it("uses the score subject line, a distinct preheader, and four parent metrics", () => {
    expect(email.subject).toBe(`${report.studentName}'s week at AcadeMY · ${report.averageQuizScore}% average`);
    expect(email.html).toContain(view.preheader.replaceAll("'", "&#39;"));
    expect(email.subject).not.toContain(view.preheader);
    expect(email.html).toContain("Quizzes");
    expect(email.html).toContain("Average score");
    expect(email.html).toContain("Active days");
    expect(email.html).toContain("Subjects practised");
    expect(email.html).toContain(`${view.activeDays} / 7`);
    expect(email.html).toContain(`+${view.xpLabel} XP earned`);
    expect(email.html).not.toContain("Current streak");
    expect(email.html).not.toContain("Cosmic Legend");
    expect(email.html).not.toContain("Lifetime");
    expect(email.html).not.toContain("Hello");
    expect(email.html).toContain("Steady progress, Maya.");
    expect(email.html).toContain(`${report.quizzesCompleted} quizzes · ${report.averageQuizScore}% average · active on ${view.activeDays} of 7 days`);
  });

  it("shows the strongest subject, repeated focus, biggest win, and at most three next steps", () => {
    expect(email.html).toContain("Strongest this week");
    expect(email.html).toContain("Science");
    expect(email.html).toContain("Focus next");
    expect(email.html).toContain("Chapter 6");
    expect(email.html).not.toContain("Chapter 1 averaged");
    expect(email.html).toContain("Biggest win");
    expect(email.html).toContain("95%");
    expect(email.html).not.toContain("Perfect score");
    expect(view.recommendations.length).toBeLessThanOrEqual(3);
    expect(email.html).toContain("View Parent Dashboard");
    expect(email.html).toContain("https://www.myacademy.my/parent-dashboard");
    expect(email.html).not.toContain("View Full Parent Dashboard");
  });

  it("uses On track and a perfect-score line only when the week supports them", () => {
    const clear = buildWeeklyParentReport({
      studentName: "Maya Rahman",
      streak: 2,
      now: new Date("2026-10-07T02:00:00.000Z"),
      preferRepeatedWeakness: true,
      quizzes: [
        quiz("2026-10-06T02:00:00.000Z", 100, "geography", "Chapter 4"),
        quiz("2026-10-07T02:00:00.000Z", 93, "geography", "Chapter 5"),
        quiz("2026-10-08T02:00:00.000Z", 90, "science", "Chapter 2"),
        quiz("2026-10-08T03:00:00.000Z", 92, "science", "Chapter 2"),
      ],
    });
    const clearEmail = buildWeeklyParentReportEmail(clear);
    const clearView = presentWeeklyReportEmail(clear);
    expect(clearView.hasMeaningfulFocus).toBe(false);
    expect(clearEmail.html).toContain("On track");
    expect(clearEmail.html).toContain("No major learning concern identified this week.");
    expect(clearEmail.html).not.toContain("Focus next");
    expect(clearEmail.html).not.toContain("No chapter stood out");
    expect(clearEmail.html).toContain("Perfect score — 100%");
    expect(clearEmail.html).toContain("Geography · Chapter 4");
    expect(clearEmail.html).toContain("Maya&#39;s highest quiz result this week.");
    expect(clearEmail.text).toContain("Strong week, Maya.");
  });

  it("explains a shared chapter without treating one high attempt as the average", () => {
    const mixed = buildWeeklyParentReport({
      studentName: "Maya Rahman",
      streak: 1,
      now: new Date("2026-10-07T02:00:00.000Z"),
      preferRepeatedWeakness: true,
      quizzes: [
        quiz("2026-10-06T02:00:00.000Z", 97, "sejarah", "Chapter 6"),
        quiz("2026-10-07T02:00:00.000Z", 40, "sejarah", "Chapter 6"),
        quiz("2026-10-08T02:00:00.000Z", 64, "sejarah", "Chapter 6"),
        quiz("2026-10-06T03:00:00.000Z", 90, "science", "Chapter 1"),
        quiz("2026-10-07T03:00:00.000Z", 90, "science", "Chapter 1"),
      ],
    });
    const mixedView = presentWeeklyReportEmail(mixed);
    expect(mixedView.sameChapterNote).toContain("reached 97% in one attempt");
    expect(mixedView.sameChapterNote).toContain("Chapter 6");
    expect(mixedView.recommendations).toHaveLength(1);
  });

  it("does not keep demo copy in the delivered email", () => {
    const source = readFileSync(
      new URL("../../../supabase/functions/_shared/weekly-parent-report-email.ts", import.meta.url),
      "utf8",
    );
    expect(source).not.toMatch(/Aina|Puan Farah|5h 45m|2,450|2450|\+22%|7:30|8:30/);
    expect(email.html).not.toMatch(/Aina|Puan Farah|5h 45m|2,450|2450|\+22%|7:30|8:30|Cosmic Legend/);
    expect(readFileSync(new URL("../../emails/templates/ParentWeeklyReportEmail.tsx", import.meta.url), "utf8"))
      .not.toMatch(/Aina|Puan Farah|5h 45m|View Full Parent Dashboard/);
  });

  it("leaves the send path's recipient and duplicate protection in place", () => {
    const source = readFileSync(
      new URL("../../../supabase/functions/send-weekly-parent-report/index.ts", import.meta.url),
      "utf8",
    );
    expect(source).toContain("automatedDeliveryDecision");
    expect(source).toContain("usableEmail(accountEmail)");
    expect(source).toContain("resolveWeeklyReportRecipient");
    expect(source).toContain('existing.data?.status === "sent"');
  });
});
