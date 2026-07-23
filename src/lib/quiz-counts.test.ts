import { describe, expect, it } from "vitest";

import { chapters, getChaptersForSubject, getSubjectFormStats } from "@/content/registry";
import type { ChapterContent } from "@/content/types";

import { getQuizQuestionCount, getUniqueQuizQuestions } from "./quiz-counts";

describe("quiz question counts", () => {
  it("deduplicates the same question across sets", () => {
    const first = { id: "q-1", question: "One?", options: ["A", "B"] };
    const second = { id: "q-2", question: "Two?", options: ["A", "B"] };

    expect(getQuizQuestionCount([[first, second], [first]])).toBe(2);
    expect(getUniqueQuizQuestions([[first], [first]])).toEqual([first]);
  });

  it("uses content identity when a quiz source has no stable id", () => {
    const question = { question: "Shared?", options: ["A", "B"] };
    expect(getQuizQuestionCount([[question], [{ ...question }]])).toBe(1);
  });

  it("matches each registry-backed form total to its resolved language rows", () => {
    const subjects = [...new Set(chapters.map((chapter) => chapter.subjectId))];
    const forms: ChapterContent["form"][] = ["Form 1", "Form 2", "Form 3"];

    for (const subjectId of subjects) {
      for (const form of forms) {
        const language = subjectId === "science" || subjectId === "math" ? "bm" : undefined;
        const expected = getQuizQuestionCount(
          getChaptersForSubject(subjectId, language, form).map((chapter) => chapter.quiz),
        );
        const actual = getSubjectFormStats(subjectId).find((stat) => stat.form === form)?.quizCount;

        expect(actual, `${subjectId} ${form}`).toBe(expected);
      }
    }
  });

  it("does not combine BM and DLP variants into one displayed form total", () => {
    const bmRows = getChaptersForSubject("science", "bm", "Form 2");
    const dlpRows = getChaptersForSubject("science", "dlp", "Form 2");
    const displayed = getSubjectFormStats("science").find(
      (stat) => stat.form === "Form 2",
    )?.quizCount;

    expect(displayed).toBe(getQuizQuestionCount(bmRows.map((chapter) => chapter.quiz)));
    expect(displayed).not.toBe(
      getQuizQuestionCount(
        [...bmRows, ...dlpRows].map((chapter) => chapter.quiz),
      ),
    );
  });
});
