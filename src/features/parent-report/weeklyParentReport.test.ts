import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { hasFeature, resolveStoredPlan } from "@/lib/feature-access";
import {
  buildWeeklyParentReport,
  currentKualaLumpurWeek,
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

describe("weekly parent report email template", () => {
  it("does not keep the Aina demo defaults or a parent-dashboard button", () => {
    const source = readFileSync(
      new URL("../../emails/templates/ParentWeeklyReportEmail.tsx", import.meta.url),
      "utf8",
    );
    expect(source).not.toContain("Puan Farah");
    expect(source).not.toContain("5h 45m");
    expect(source).not.toContain("7:30");
    expect(source).not.toContain("View Full Parent Dashboard");
    expect(source).not.toContain("index < activeDays");
    expect(source).not.toContain('studentName = "Aina"');
  });
});
