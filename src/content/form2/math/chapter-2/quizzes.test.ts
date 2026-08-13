import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  mathF2C2ChallengeQuizzesBM,
  mathF2C2FoundationQuizzesBM,
  mathF2C2PracticeQuizzesBM,
  mathF2C2QuizzesBM,
} from "./quizzes-bm";
import {
  mathF2C2ChallengeQuizzesDLP,
  mathF2C2FoundationQuizzesDLP,
  mathF2C2PracticeQuizzesDLP,
  mathF2C2QuizzesDLP,
} from "./quizzes-dlp";

const expectedAnswerKeys = {
  foundation: "BCBABACBCABCBABACABACDABABBBCB",
  practice: "AACAABCBAABAABBABACABABBBBBBBB",
  challenge: "AACBAAAAABABBBBBABBCCCBBABCABA",
} as const;

const expectedMathAnswers = {
  foundation: [
    null,
    "3x + 12",
    "−2a + 10",
    "8m² + 12m",
    "x² + 5x + 6",
    "y² − 2y − 8",
    "a² + 10a + 25",
    "p² − 6p + 9",
    "m² − 49",
    "10x + 6",
    null,
    "6x",
    "4(2a + 3)",
    "5m(3m − 4)",
    "(x + 3)(x + 4)",
    "(x − 4)(x − 5)",
    "(x − 5)(x + 5)",
    "(x + 5)²",
    "4(y − 3)(y + 3)",
    "(2x + 1)(x + 3)",
    "x + 3",
    "4y",
    "2x/3",
    "3a/5",
    "b/2",
    "3/x",
    "2/m",
    "2",
    "6",
    "x + 3",
  ],
  practice: [
    "8x − 23",
    "2a² − 5a − 12",
    "9m² − 12m + 4",
    "16p² − 1",
    "2x² + 4x − 12",
    "3x² + 14x + 8",
    "4y² − 12y + 9",
    "2a² + 11a",
    "−x² + 13x",
    "m² + 8m + 13",
    "6xy",
    "7ab(2a − 3b)",
    "3x(x + 4)",
    "(x + 5)(x + 6)",
    "(x − 7)(x + 5)",
    "(2x + 1)(x + 4)",
    "(3m − 1)(m − 4)",
    "(3a − 4)²",
    "(5p − 7q)(5p + 7q)",
    "(a + b)(x + y)",
    "11x/12",
    "7a/12",
    "7/(2m)",
    "(2x + y)/6",
    "13/(6a)",
    "2/3",
    "3/4",
    "x + 4",
    "a − 3",
    "x + 3",
  ],
  challenge: [
    "x² − 12x + 19",
    "3a² + a − 8",
    "8x + 2",
    "10x + 25",
    "3x(2x − 5)",
    "(x + 5)(x − 4)",
    "(3x + 2)(2x − 1)",
    "(−2x + 1)(x − 3)",
    "(2a − 3b)²",
    "(7m − 9n)(7m + 9n)",
    "(2a − 3b)(x + y)",
    "(x + 2), (x + 5)",
    "2x − 1",
    "(x + 3)/(x − 3)",
    "(a − 2)/(a + 2)",
    "(5x − 1)/6",
    "(7a + 7)/12",
    "3x/(x + 1)",
    "2",
    "3",
    "x + 4",
    "7/(4x)",
    "3/a",
    "2x − 3",
    "x + 4",
    "RM(7x + 4)",
    "4x + 9",
    "a² + 2ab + b²",
    "2",
    "2x − 5",
  ],
} as const;

const bmObjectives = [
  ["foundation", mathF2C2FoundationQuizzesBM, expectedMathAnswers.foundation],
  ["practice", mathF2C2PracticeQuizzesBM, expectedMathAnswers.practice],
  ["challenge", mathF2C2ChallengeQuizzesBM, expectedMathAnswers.challenge],
] as const;
const dlpObjectives = [
  ["foundation", mathF2C2FoundationQuizzesDLP, expectedMathAnswers.foundation],
  ["practice", mathF2C2PracticeQuizzesDLP, expectedMathAnswers.practice],
  ["challenge", mathF2C2ChallengeQuizzesDLP, expectedMathAnswers.challenge],
] as const;

function answerKey(bank: typeof mathF2C2QuizzesBM) {
  return bank.map(({ answerIndex }) => "ABCD"[answerIndex]).join("");
}

describe.each([
  ["BM", mathF2C2QuizzesBM, bmObjectives, "bm", "BM-"],
  ["DLP", mathF2C2QuizzesDLP, dlpObjectives, "dlp", "DLP-"],
] as const)(
  "Mathematics Form 2 Chapter 2 %s curated bank",
  (_, all, objectives, lang, idPrefix) => {
    it.each(objectives)("keeps %s as a separate 30-question objective", (name, bank) => {
      expect(bank).toHaveLength(30);
      expect(answerKey(bank)).toBe(expectedAnswerKeys[name]);
    });

    it("contains exactly 90 valid, explained, unique questions", () => {
      expect(all).toHaveLength(90);
      expect(new Set(all.map(({ id }) => id)).size).toBe(90);
      expect(new Set(all.map(({ question }) => question)).size).toBe(90);
      all.forEach((question) => {
        expect(question.id.startsWith(idPrefix)).toBe(true);
        expect(question.subjectId).toBe("math");
        expect(question.form).toBe("Form 2");
        expect(question.chapter).toBe("Chapter 2");
        expect(question.lang).toBe(lang);
        expect(question.options).toHaveLength(4);
        expect(new Set(question.options).size).toBe(4);
        expect(question.answerIndex).toBeGreaterThanOrEqual(0);
        expect(question.answerIndex).toBeLessThan(4);
        expect(question.explanation?.trim()).toBeTruthy();
      });
    });

    it.each(objectives)("matches independently recalculated answers for %s", (_, bank, answers) => {
      bank.forEach((question, index) => {
        const expected = answers[index];
        if (expected !== null) {
          const languageSpecificExpected =
            lang === "dlp" && question.id === "DLP-C12" ? "(x + 2) and (x + 5)" : expected;
          expect(question.options[question.answerIndex]).toBe(languageSpecificExpected);
        }
      });
    });

    it("preserves the required difficulty progression", () => {
      expect(objectives[0][1].every(({ difficulty }) => difficulty === "Easy")).toBe(true);
      expect(objectives[1][1].every(({ difficulty }) => difficulty === "Medium")).toBe(true);
      expect(objectives[2][1].slice(0, 15).every(({ difficulty }) => difficulty === "Medium")).toBe(
        true,
      );
      expect(objectives[2][1].slice(15).every(({ difficulty }) => difficulty === "Hard")).toBe(
        true,
      );
    });
  },
);

describe("Chapter 2 bilingual separation and routing contract", () => {
  const routeSource = readFileSync(
    new URL("../../../../routes/quizzes.tsx", import.meta.url),
    "utf8",
  );

  it("keeps BM and DLP as disjoint one-to-one banks", () => {
    expect(mathF2C2QuizzesBM.every(({ lang }) => lang === "bm")).toBe(true);
    expect(mathF2C2QuizzesDLP.every(({ lang }) => lang === "dlp")).toBe(true);
    expect(new Set(mathF2C2QuizzesBM.map(({ id }) => id)).size).toBe(90);
    expect(new Set(mathF2C2QuizzesDLP.map(({ id }) => id)).size).toBe(90);
    expect(mathF2C2QuizzesBM.map(({ answerIndex }) => answerIndex)).toEqual(
      mathF2C2QuizzesDLP.map(({ answerIndex }) => answerIndex),
    );
  });

  it("contains no generated legacy prompts", () => {
    const allText = [...mathF2C2QuizzesBM, ...mathF2C2QuizzesDLP]
      .map(({ question }) => question)
      .join("\n");
    expect(allText).not.toContain("Semakan ");
    expect(allText).not.toContain("Latihan ");
    expect(allText).not.toContain("Cabaran ");
    expect(allText).not.toContain("Review ");
    expect(allText).not.toContain("Practice ");
    expect(allText).not.toContain("Challenge ");
  });

  it("selects only the matching Chapter 2 language bank", () => {
    expect(routeSource).toContain("const MATH_F2_C2_BM_OBJECTIVE_BANK");
    expect(routeSource).toContain("const MATH_F2_C2_DLP_OBJECTIVE_BANK");
    expect(routeSource).toContain('chapter === "Chapter 2" && scienceLang === "bm"');
    expect(routeSource).toContain('chapter === "Chapter 2" && scienceLang === "dlp"');
    expect(routeSource).toContain("MATH_F2_C2_BM_OBJECTIVE_BANK[mathObjectiveId]");
    expect(routeSource).toContain("MATH_F2_C2_DLP_OBJECTIVE_BANK[mathObjectiveId]");
  });

  it("retains scoring, explanations, results, retry, and option randomisation", () => {
    expect(routeSource).toContain("function answerMathObjective(i: number)");
    expect(routeSource).toContain("i === currentMathQuestion.answerIndex");
    expect(routeSource).toContain("current.explanation");
    expect(routeSource).toContain("function nextMathObjectiveQuestion()");
    expect(routeSource).toContain("onRetry={() =>");
    expect(routeSource).toContain("shuffleQuestionOptions");
  });
});
