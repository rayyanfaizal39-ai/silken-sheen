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

      for (const chapter of chapters) {
        expect(chapter.available).toBe(true);
        expect(hasResourceContent("science", "Form 3", chapter.key, "quiz", lang)).toBe(true);

        const questions = getChapterQuizQuestions("science", "Form 3", chapter.key, lang);
        const expectedLength = 50;
        expect(questions).toHaveLength(expectedLength);
        expect(new Set(questions.map((question) => question.id))).toHaveLength(expectedLength);
        expect(
          questions.reduce<Record<string, number>>((counts, question) => {
            counts[question.difficulty] = (counts[question.difficulty] ?? 0) + 1;
            return counts;
          }, {}),
        ).toEqual({ Easy: 16, Medium: 22, Hard: 12 });
        expect(questions.filter((question) => question.set === "A")).toHaveLength(25);
        expect(questions.filter((question) => question.set === "B")).toHaveLength(25);
        expect(questions.every((question) => question.explanation?.trim())).toBe(true);
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

  it("loads Chapter 6 Sets A and B as standalone bilingual questions", () => {
    const forbiddenReference =
      /\b(?:buku teks|textbook|Rajah|Jadual|diagram|table)\s+(?:di bawah|berikut|below|following)\b/i;

    for (const lang of ["bm", "dlp"] as const) {
      const questions = getChapterQuizQuestions("science", "Form 3", "Chapter 6", lang);
      expect(questions).toHaveLength(50);
      expect(questions.filter((question) => question.set === "A")).toHaveLength(25);
      expect(questions.filter((question) => question.set === "B")).toHaveLength(25);
      expect(questions.every((question) => !forbiddenReference.test(question.question))).toBe(true);
      expect(questions.every((question) => !/[\\$]|\*\*|`/.test(question.question))).toBe(true);

      const correctedTransformerQuestion = questions.find(
        (question) => question.id === `sci-f3-c6-set-b-${lang}-q11`,
      );
      expect(correctedTransformerQuestion?.options[0]).toContain("720");
      expect(correctedTransformerQuestion?.answerIndex).toBe(0);
      expect(correctedTransformerQuestion?.explanation).not.toMatch(/let'?s correct|rewrite/i);
    }
  });

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
