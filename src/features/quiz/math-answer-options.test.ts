import { describe, expect, it } from "vitest";
import { resolveMathObjectiveQuestions } from "@/routes/quizzes";
import { quizzes } from "@/data/content";
import type { QuizQuestion } from "@/data/content";
import { shuffleQuestionOptions } from "./difficulty/quizDifficulty";

const objectiveIds = ["objective-1", "objective-2", "objective-3"] as const;
const languages = ["bm", "dlp"] as const;
const objectiveBanks = ["Form 1", "Form 2"].flatMap((form) =>
  Array.from({ length: 13 }, (_, index) => index + 1).flatMap((chapter) =>
    objectiveIds.flatMap((mathObjectiveId) =>
      languages.map(
        (lang) =>
          resolveMathObjectiveQuestions({
            form,
            chapter: `Chapter ${chapter}`,
            mathObjectiveId,
            lang,
            scienceLang: lang,
          }).questions,
      ),
    ),
  ),
);
const sourceModules = import.meta.glob(
  "../../content/form3/math/chapter-*/quizzes-*.ts",
  { eager: true },
);
const form3Sources = Object.values(sourceModules).flatMap((module) =>
  Object.entries(module as Record<string, QuizQuestion[]>)
    .filter(([name]) => name.includes("QuestionBank"))
    .flatMap(([, bank]) => bank),
);
const questions = [...objectiveBanks.flat(), ...form3Sources];
const find = (id: string) => {
  const q = questions.find((question) => question.id === id);
  if (!q) throw new Error(`Question not found: ${id}`);
  return q;
};
const onlyCorrect = (
  q: Pick<QuizQuestion, "options" | "answerIndex"> & { id?: string },
  satisfies: (option: string) => boolean,
) =>
  expect(q.options.map(satisfies), q.id).toEqual(
    q.options.map((_, index) => index === q.answerIndex),
  );

describe("Mathematics answer-choice quality across Forms 1–3", () => {
  it("checks all 35 chapters in BM and DLP, including reserve questions", () => {
    expect(objectiveBanks).toHaveLength(156);
    objectiveBanks.forEach((bank) => expect(bank).toHaveLength(30));
    const regular = quizzes.filter(
      (q) => q.subjectId === "math" && q.form === "Form 3",
    );
    expect(regular).toHaveLength(900);
    for (let chapter = 1; chapter <= 9; chapter++)
      for (const lang of languages)
        for (const set of ["A", "B"])
          expect(
            regular.filter(
              (q) =>
                q.chapter === `Chapter ${chapter}` &&
                q.lang === lang &&
                q.set === set,
            ),
          ).toHaveLength(25);
    expect(form3Sources.length).toBeGreaterThan(regular.length);
  });

  it("rejects a correct option conspicuously longer than every distractor", () => {
    for (const q of questions) {
      const length = Array.from(q.options[q.answerIndex]).length;
      const longestWrong = Math.max(
        ...q.options
          .filter((_, i) => i !== q.answerIndex)
          .map((option) => Array.from(option).length),
      );
      // Short number signs and unavoidable one-word terms are not verbose answer clues.
      const giveaway =
        length >= 16 &&
        length > longestWrong &&
        (length >= 1.25 * longestWrong || length - longestWrong >= 10);
      expect(giveaway, `${q.id}: ${q.options.join(" | ")}`).toBe(false);
    }
  });

  it("keeps four distinct choices and the correct key after shuffling", () => {
    for (const q of questions) {
      expect(new Set(q.options).size, q.id).toBe(4);
      const shuffled = shuffleQuestionOptions(q, () => 0.37);
      expect(shuffled.options[shuffled.answerIndex], q.id).toBe(
        q.options[q.answerIndex],
      );
    }
  });

  it("checks complete factor and subset lists against every offered choice", () => {
    for (const lang of languages)
      for (const [objective, number, value] of [
        [1, 3, 12],
        [2, 2, 24],
      ]) {
        const q = find(`math-f1-c2-objective-${objective}-${lang}-q${number}`);
        const divisors = Array.from({ length: value }, (_, i) => i + 1).filter(
          (n) => value % n === 0,
        );
        onlyCorrect(
          q,
          (option) =>
            JSON.stringify(option.split(",").map(Number)) ===
            JSON.stringify(divisors),
        );
        expect(
          new Set(q.options.map((option) => option.split(",").length)).size,
        ).toBe(1);
      }
    for (const lang of languages) {
      const q = find(`math-f1-c11-objective-2-${lang}-q5`);
      const powerSet = Array.from({ length: 8 }, (_, mask) =>
        [1, 2, 3].filter((_, index) => mask & (1 << index)).join(","),
      ).sort();
      onlyCorrect(q, (option) => {
        const subsets = [...option.matchAll(/∅|\{([^}]*)\}/g)]
          .map((match) => match[1] ?? "")
          .sort();
        return JSON.stringify(subsets) === JSON.stringify(powerSet);
      });
    }
  });

  it("verifies root-form distractors and multi-part evaluations", () => {
    for (const lang of languages) {
      onlyCorrect(find(`math-f3-c1-${lang}-q29`), (option) => {
        const [, root, radicand, answer] = /([∛√])(\d+)\s*=\s*(\d+)/.exec(
          option,
        )!;
        return root === "∛" && Math.cbrt(Number(radicand)) === Number(answer);
      });
      onlyCorrect(find(`math-f3-c1-${lang}-q30`), (option) => {
        const [, root, power, answer] = /\(([∛∜])81\)\^(\d+)\s*=\s*(\d+)/.exec(
          option,
        )!;
        const computed = 81 ** (Number(power) / (root === "∜" ? 4 : 3));
        return (
          Math.abs(computed - 81 ** (3 / 4)) < 1e-9 &&
          Math.abs(computed - Number(answer)) < 1e-9
        );
      });
      onlyCorrect(find(`math-f3-c1-${lang}-q45`), (option) => {
        const [, m, n, secondN, secondM, answer] =
          /\(81\^(\d+)\)\^\(1\/(\d+)\) = \(81\^\(1\/(\d+)\)\)\^(\d+) = (\d+)/.exec(
            option,
          )!;
        return (
          Number(m) / Number(n) === 3 / 4 &&
          Number(secondM) / Number(secondN) === 3 / 4 &&
          Number(answer) === 81 ** (3 / 4)
        );
      });
    }
  });

  it("recomputes the replacement scale, tangent and view problems", () => {
    for (const lang of languages) {
      const expected = [
        [4, 19, (40 * 100) / 200],
        [6, 54, 52],
        [7, 20, 5],
      ];
      for (const [chapter, number, value] of expected)
        onlyCorrect(
          find(`math-f3-c${chapter}-${lang}-q${number}`),
          (option) => Number.parseFloat(option) === value,
        );
    }
  });
});
