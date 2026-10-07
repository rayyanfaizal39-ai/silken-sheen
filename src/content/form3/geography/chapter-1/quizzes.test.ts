import { describe, expect, it } from "vitest";

import { getChaptersForSubject, hasResourceContent } from "@/content/registry";
import { getItemChapterKey, quizzes } from "@/data/content";
import { geographyF3C1Quizzes } from "./quizzes";

const EXPECTED_IDS = Array.from({ length: 30 }, (_, index) => `geo-f3-c1-q${index + 1}`);

function studentRendererPool() {
  return quizzes.filter(
    (quiz) =>
      quiz.subjectId === "geography" &&
      quiz.form === "Form 3" &&
      getItemChapterKey(quiz) === "Chapter 1",
  );
}

describe("Geography Form 3 Chapter 1 quiz registration", () => {
  it("contains a complete thirty-question chapter bank", () => {
    expect(geographyF3C1Quizzes).toHaveLength(30);
    expect(geographyF3C1Quizzes.map((quiz) => quiz.id)).toEqual(EXPECTED_IDS);
  });

  it("uses valid BM questions, options and balanced difficulty tiers", () => {
    const difficultyCounts = geographyF3C1Quizzes.reduce<Record<string, number>>(
      (counts, quiz) => {
        counts[quiz.difficulty] = (counts[quiz.difficulty] ?? 0) + 1;
        return counts;
      },
      {},
    );

    expect(difficultyCounts).toEqual({ Easy: 10, Medium: 10, Hard: 10 });

    for (const quiz of geographyF3C1Quizzes) {
      expect(quiz).toMatchObject({
        subjectId: "geography",
        form: "Form 3",
        chapter: "Chapter 1",
        lang: "bm",
      });
      expect(quiz.question.trim().length).toBeGreaterThan(10);
      expect(quiz.options).toHaveLength(4);
      expect(new Set(quiz.options).size).toBe(4);
      expect(quiz.options.every((option) => option.trim().length > 0)).toBe(true);
      expect(quiz.answerIndex).toBeGreaterThanOrEqual(0);
      expect(quiz.answerIndex).toBeLessThan(4);
      expect(quiz.explanation?.trim().length).toBeGreaterThan(0);
    }
  });

  it("exposes the complete bank to the student renderer pool", () => {
    const pool = studentRendererPool();

    expect(pool).toHaveLength(30);
    expect(pool.map((quiz) => quiz.id)).toEqual(EXPECTED_IDS);
  });

  it("keeps the existing Geography registry entry active", () => {
    const chapter = getChaptersForSubject("geography", undefined, "Form 3").find(
      (candidate) => candidate.chapterKey === "Chapter 1",
    );

    expect(chapter?.id).toBe("geography-f3-c1");
    expect(chapter?.quiz?.map((quiz) => quiz.id)).toEqual(EXPECTED_IDS);
    expect(hasResourceContent("geography", "Form 3", "Chapter 1", "quiz")).toBe(true);
  });
});
