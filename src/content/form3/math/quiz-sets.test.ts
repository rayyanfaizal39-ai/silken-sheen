import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { shuffleQuestionOptions } from "@/features/quiz/difficulty/quizDifficulty";
import { buildForm3MathQuizSets } from "./quiz-sets";

describe("Form 3 Maths: two 25-question sets in every chapter", () => {
  it.each(Array.from({ length: 9 }, (_, i) => i + 1))(
    "Chapter %i has matching disjoint BM/DLP sets with balanced coverage",
    (chapter) => {
      const bm = getChapterQuizQuestions(
        "math",
        "Form 3",
        `Chapter ${chapter}`,
        "bm",
      );
      const dlp = getChapterQuizQuestions(
        "math",
        "Form 3",
        `Chapter ${chapter}`,
        "dlp",
      );
      for (const bank of [bm, dlp]) {
        expect(bank).toHaveLength(50);
        expect(new Set(bank.map((q) => q.id)).size).toBe(50);
        for (const set of ["A", "B"]) {
          const questions = bank.filter((q) => q.set === set);
          expect(questions).toHaveLength(25);
          expect(
            ["Easy", "Medium", "Hard"].map(
              (d) => questions.filter((q) => q.difficulty === d).length,
            ),
          ).toEqual([10, 10, 5]);
          for (const q of questions) {
            const shuffled = shuffleQuestionOptions(q, () => 0.25);
            expect(q.question).not.toMatch(
              /from the above|previous question|soalan di atas|soalan sebelumnya/i,
            );
            expect(shuffled.set).toBe(set);
            expect(shuffled.id).toBe(q.id);
            expect(shuffled.visual).toBe(q.visual);
            expect(shuffled.explanation).toBe(q.explanation);
            expect(shuffled.options[shuffled.answerIndex]).toBe(
              q.options[q.answerIndex],
            );
          }
        }
      }
      expect(
        bm.map((q) => [q.id.replace("-bm-", "-dlp-"), q.set, q.difficulty]),
      ).toEqual(dlp.map((q) => [q.id, q.set, q.difficulty]));
    },
  );
  it("fails explicitly rather than publishing an incomplete set", () => {
    expect(() => buildForm3MathQuizSets(1, [])).toThrow(/25 unique questions/);
  });
});
