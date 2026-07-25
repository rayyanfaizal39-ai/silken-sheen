import { describe, expect, it } from "vitest";

import { getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { getItemChapterKey, quizzes } from "@/data/content";

const FORM = "Form 3" as const;
const LANGUAGES = ["bm", "dlp"] as const;

function rendererPool(chapter: string, lang: (typeof LANGUAGES)[number]) {
  return quizzes.filter(
    (quiz) =>
      quiz.subjectId === "math" &&
      quiz.form === FORM &&
      getItemChapterKey(quiz) === chapter &&
      quiz.lang === lang,
  );
}

describe("Mathematics Form 3 quiz renderer registration", () => {
  it.each(LANGUAGES)("gives every registered %s chapter a non-empty renderer pool", (lang) => {
    const chapters = getRegisteredSubjectChapters("math", lang, FORM);

    expect(chapters.map((chapter) => chapter.key)).toEqual(
      Array.from({ length: 9 }, (_, index) => `Chapter ${index + 1}`),
    );

    for (const chapter of chapters) {
      expect(
        hasResourceContent("math", FORM, chapter.key, "quiz", lang),
        `${lang} ${chapter.key} should be registered`,
      ).toBe(true);
      expect(
        rendererPool(chapter.key, lang).length,
        `${lang} ${chapter.key} renderer pool`,
      ).toBeGreaterThan(0);
    }
  });

  it("aggregates all 976 existing questions without duplicating IDs", () => {
    const form3MathQuizzes = quizzes.filter(
      (quiz) => quiz.subjectId === "math" && quiz.form === FORM,
    );
    const bmQuizzes = form3MathQuizzes.filter((quiz) => quiz.lang === "bm");
    const dlpQuizzes = form3MathQuizzes.filter((quiz) => quiz.lang === "dlp");

    expect(form3MathQuizzes).toHaveLength(976);
    expect(bmQuizzes).toHaveLength(488);
    expect(dlpQuizzes).toHaveLength(488);
    expect(new Set(form3MathQuizzes.map((quiz) => quiz.id)).size).toBe(976);
  });
});
