import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  buildParentDashboardModel,
  type ParentDashboardQuiz,
} from "./parentDashboardData";

const NOW = new Date("2026-10-05T04:00:00.000Z");

function quiz(
  createdAt: string,
  subjectId: string,
  chapterKey: string,
  scorePct: number,
  xpEarned = 0,
): ParentDashboardQuiz {
  return { createdAt, scorePct, subjectId, chapterKey, xpEarned };
}

function repeat(
  count: number,
  createdAt: string,
  subjectId: string,
  chapterKey: string,
  scorePct: number,
): ParentDashboardQuiz[] {
  return Array.from({ length: count }, () => quiz(createdAt, subjectId, chapterKey, scorePct));
}

describe("parent dashboard scopes", () => {
  it("keeps an empty Malaysia week separate from recent history", () => {
    const model = buildParentDashboardModel({
      studentName: "Rayyan",
      now: NOW,
      quizzes: [
        quiz("2026-10-04T14:00:00.000Z", "geography", "Chapter 1", 90, 40),
        ...repeat(8, "2026-09-20T04:00:00.000Z", "geography", "Chapter 2", 90),
        ...repeat(3, "2026-09-18T04:00:00.000Z", "sejarah", "Chapter 6", 66.7),
        quiz("2026-09-18T05:00:00.000Z", "sejarah", "Chapter 1", 40),
      ],
    });

    expect(model.thisWeek).toEqual({ quizzes: 0, weeklyXp: 0, average: null, activeDays: 0 });
    expect(model.recent.quizzes).toBe(13);
    expect(model.recent.average).toBeCloseTo(80.8, 1);
    expect(model.recent.strongest).toMatchObject({ name: "Geography", average: 90, quizzes: 9 });
    expect(model.recent.weakestSubject).toMatchObject({ name: "Sejarah", quizzes: 4 });
    expect(model.recent.weakestChapter).toMatchObject({
      subjectName: "Sejarah",
      chapterKey: "Chapter 6",
      attempts: 3,
    });
    expect(model.recent.insight).toContain("completed 13 quizzes in the last 30 days");
    expect(model.recent.insight).toContain("Geography is currently Rayyan's strongest recent subject.");
    expect(model.recent.insight).not.toMatch(/retention|study time|memory/i);
    expect(model.mostImproved).toBeNull();
  });

  it("counts a Monday 00:30 Kuala Lumpur quiz in this week and not the Sunday before it", () => {
    const model = buildParentDashboardModel({
      studentName: "Maya",
      now: NOW,
      quizzes: [
        quiz("2026-10-04T15:30:00.000Z", "science", "Chapter 1", 80, 10),
        quiz("2026-10-04T16:30:00.000Z", "science", "Chapter 1", 100, 25),
      ],
    });

    expect(model.thisWeek).toEqual({ quizzes: 1, weeklyXp: 25, average: 100, activeDays: 1 });
    expect(model.recent.quizzes).toBe(2);
  });

  it("does not invent recent insight for a student with no quiz history", () => {
    const model = buildParentDashboardModel({ studentName: "New Student", now: NOW, quizzes: [] });

    expect(model.thisWeek).toEqual({ quizzes: 0, weeklyXp: 0, average: null, activeDays: 0 });
    expect(model.recent.quizzes).toBe(0);
    expect(model.recent.average).toBeNull();
    expect(model.recent.strongest).toBeNull();
    expect(model.recent.weakestSubject).toBeNull();
    expect(model.recent.weakestChapter).toBeNull();
    expect(model.recent.insight).toBe("Not enough recent data.");
    expect(model.recent.recommendation).toBe("Not enough recent data.");
    expect(model.mostImproved).toBeNull();
  });

  it("ranks the strongest recent subject from repeated quizzes, not one high score", () => {
    const model = buildParentDashboardModel({
      studentName: "Maya",
      now: NOW,
      quizzes: [
        quiz("2026-09-20T04:00:00.000Z", "math", "Chapter 1", 100),
        ...repeat(3, "2026-09-20T04:00:00.000Z", "geography", "Chapter 1", 90),
        ...repeat(4, "2026-09-20T04:00:00.000Z", "science", "Chapter 1", 70),
      ],
    });

    expect(model.recent.strongest?.name).toBe("Geography");
    expect(model.recent.strongest?.quizzes).toBe(3);
  });

  it("chooses the repeated weak chapter over a single lower attempt", () => {
    const model = buildParentDashboardModel({
      studentName: "Maya",
      now: NOW,
      quizzes: [
        ...repeat(3, "2026-09-20T04:00:00.000Z", "geography", "Chapter 1", 95),
        quiz("2026-09-21T04:00:00.000Z", "sejarah", "Chapter 1", 40),
        ...repeat(3, "2026-09-22T04:00:00.000Z", "sejarah", "Chapter 6", 66.7),
      ],
    });

    expect(model.recent.weakestChapter).toMatchObject({
      subjectName: "Sejarah",
      chapterKey: "Chapter 6",
      attempts: 3,
    });
    expect(model.recent.recommendation).toContain("Chapter 6");
    expect(model.recent.recommendation).not.toContain("Chapter 1");
  });

  it("hides improvement when the previous 30 days do not contain a real comparison", () => {
    const risingInsideOneWindow = buildParentDashboardModel({
      studentName: "Maya",
      now: NOW,
      quizzes: [
        ...repeat(3, "2026-09-10T04:00:00.000Z", "science", "Chapter 1", 40),
        ...repeat(3, "2026-09-28T04:00:00.000Z", "science", "Chapter 1", 90),
        quiz("2026-08-20T04:00:00.000Z", "science", "Chapter 1", 10),
      ],
    });
    const compared = buildParentDashboardModel({
      studentName: "Maya",
      now: NOW,
      quizzes: [
        ...repeat(3, "2026-08-20T04:00:00.000Z", "science", "Chapter 1", 50),
        ...repeat(3, "2026-09-20T04:00:00.000Z", "science", "Chapter 1", 80),
      ],
    });

    expect(risingInsideOneWindow.mostImproved).toBeNull();
    expect(compared.mostImproved).toEqual({ name: "Science", change: 30 });
  });

  it("does not describe subject XP share as mastery or current progress", () => {
    const source = readFileSync(new URL("../../routes/parent-dashboard.tsx", import.meta.url), "utf8");
    expect(source).toContain("Share of subject XP");
    expect(source).not.toContain("Current progress");
    expect(source).not.toContain("Chapters completed");
    expect(source).not.toContain("Weekly activity");
    expect(source).not.toMatch(/mastery/i);
  });
});
