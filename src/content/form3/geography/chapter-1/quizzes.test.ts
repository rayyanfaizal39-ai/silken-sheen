import { describe, expect, it } from "vitest";

import { buildGeographyF3Quizzes } from "@/content/form3/geography/resource-builders";
import { getChaptersForSubject, hasResourceContent } from "@/content/registry";
import { getItemChapterKey, quizzes } from "@/data/content";
import { geographyF3C1Notes } from "./notes";
import { geographyF3C1Quizzes } from "./quizzes";

const EXPECTED_IDS = Array.from({ length: 22 }, (_, index) => `geo-f3-c1-bm-set-a-q${index + 9}`);

function studentRendererPool() {
  return quizzes.filter(
    (quiz) =>
      quiz.subjectId === "geography" &&
      quiz.form === "Form 3" &&
      getItemChapterKey(quiz) === "Chapter 1",
  );
}

describe("Geography Form 3 Chapter 1 quiz registration", () => {
  it("replaces the previous 30-question generated chapter set", () => {
    expect(buildGeographyF3Quizzes(1, geographyF3C1Notes)).toHaveLength(30);
    expect(geographyF3C1Quizzes).toHaveLength(22);
  });

  it("contains only the selected BM Set A replacement package", () => {
    expect(geographyF3C1Quizzes).toHaveLength(22);
    expect(geographyF3C1Quizzes.map((quiz) => quiz.id)).toEqual(EXPECTED_IDS);

    for (const quiz of geographyF3C1Quizzes) {
      expect(quiz).toMatchObject({
        subjectId: "geography",
        form: "Form 3",
        chapter: "Chapter 1",
        lang: "bm",
        difficulty: "Medium",
      });
      expect(quiz.options).toHaveLength(4);
      expect(quiz.options.every(Boolean)).toBe(true);
      expect(quiz.answerIndex).toBeGreaterThanOrEqual(0);
      expect(quiz.answerIndex).toBeLessThan(quiz.options.length);
    }
  });

  it("exposes the 22 replacement questions to the student renderer pool", () => {
    const pool = studentRendererPool();

    expect(pool).toHaveLength(22);
    expect(pool.map((quiz) => quiz.id)).toEqual(EXPECTED_IDS);
    expect(pool[0].question).toBe("Apakah definisi bagi jadual mengikut buku teks?");
  });

  it("keeps the existing Geography registry entry active without a registry change", () => {
    const chapter = getChaptersForSubject("geography", undefined, "Form 3").find(
      (candidate) => candidate.chapterKey === "Chapter 1",
    );

    expect(chapter?.id).toBe("geography-f3-c1");
    expect(chapter?.quiz?.map((quiz) => quiz.id)).toEqual(EXPECTED_IDS);
    expect(hasResourceContent("geography", "Form 3", "Chapter 1", "quiz")).toBe(true);
  });
});
