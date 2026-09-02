import { describe, expect, it } from "vitest";
import {
  getChapterQuizQuestions,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
  hasResourceContent,
} from "./registry";

describe("Science Form 3 quiz registration", () => {
  for (const lang of ["bm", "dlp"] as const) {
    it(`registers and loads all ten ${lang.toUpperCase()} chapters`, () => {
      const chapters = getRegisteredSubjectChapters("science", lang, "Form 3");

      expect(chapters.map((chapter) => chapter.key)).toEqual(
        Array.from({ length: 10 }, (_, index) => `Chapter ${index + 1}`),
      );
      expect(hasFormResourceContent("science", "Form 3", "quiz", lang)).toBe(true);

      for (const [chapterIndex, chapter] of chapters.entries()) {
        expect(chapter.available).toBe(true);
        expect(hasResourceContent("science", "Form 3", chapter.key, "quiz", lang)).toBe(true);

        const questions = getChapterQuizQuestions("science", "Form 3", chapter.key, lang);
        const usesQuizSets = chapterIndex !== 5;
        const expectedLength = usesQuizSets ? 50 : 30;
        expect(questions).toHaveLength(expectedLength);
        expect(new Set(questions.map((question) => question.id))).toHaveLength(expectedLength);
        expect(
          questions.reduce<Record<string, number>>((counts, question) => {
            counts[question.difficulty] = (counts[question.difficulty] ?? 0) + 1;
            return counts;
          }, {}),
        ).toEqual(
          usesQuizSets ? { Easy: 16, Medium: 22, Hard: 12 } : { Easy: 10, Medium: 10, Hard: 10 },
        );
        if (usesQuizSets) {
          expect(questions.filter((question) => question.set === "A")).toHaveLength(25);
          expect(questions.filter((question) => question.set === "B")).toHaveLength(25);
          expect(questions.every((question) => question.explanation?.trim())).toBe(true);
        }
        expect(
          questions.every(
            (question) =>
              question.subjectId === "science" &&
              question.form === "Form 3" &&
              question.chapter === chapter.key &&
              question.lang === lang &&
              question.options.length === 4 &&
              question.answerIndex >= 0 &&
              question.answerIndex < question.options.length,
          ),
        ).toBe(true);
      }
    });
  }

  it.each([
    ["science", "Form 1", "Chapter 1", "bm"],
    ["science", "Form 2", "Chapter 1", "bm"],
    ["geography", "Form 3", "Chapter 1", undefined],
    ["sejarah", "Form 3", "Chapter 1", undefined],
  ] as const)(
    "retains the working %s %s compatibility path",
    (subjectId, form, chapterKey, lang) => {
      expect(getChapterQuizQuestions(subjectId, form, chapterKey, lang).length).toBeGreaterThan(0);
    },
  );
});
