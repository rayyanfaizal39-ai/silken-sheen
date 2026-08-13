import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  mathF2C1ChallengeQuizzesDLP,
  mathF2C1FoundationQuizzesDLP,
  mathF2C1PracticeQuizzesDLP,
  mathF2C1QuizzesDLP,
} from "./quizzes-dlp";

const expectedAnswers = {
  foundation: [
    "A rule or arrangement followed by numbers or objects",
    "21",
    "Subtract 3",
    "48",
    "10",
    "34",
    "63",
    "8",
    "21",
    "1",
    "1, 4, 6, 4, 1",
    "Numbers or objects arranged according to a pattern",
    "22",
    "33",
    "1,250",
    "9",
    "18",
    "24",
    "T₅",
    "4n",
    "5, 10, 15, 20, …",
    "Add 7 to the previous number",
    "Divide the previous number by 2",
    "2, 5, 8, 11, …",
    "12",
    "2.5",
    "−6",
    "8",
    "−3",
    "11",
  ],
  practice: [
    "46, 54",
    "53, 35",
    "121.5",
    "40",
    "16",
    "34",
    "T₆",
    "T₆",
    "5n + 1",
    "4n − 6",
    "23",
    "8",
    "34, 55",
    "21",
    "6",
    "1, 6, 15, 20, 15, 6, 1",
    "13, 23, 33, 43",
    "+10",
    "2½",
    "0.2",
    "2, 8, 32, 128, …",
    "243, 81, 27, 9, …",
    "29",
    "24",
    "9:10 a.m.",
    "4 hours",
    "2:15 p.m.",
    "T₅ = 16",
    "6",
    "Number rule +7; Tₙ = 7n",
  ],
  challenge: [
    "48, 63",
    "10, 2",
    "54, 58",
    "68",
    "95",
    "40",
    "127",
    "28",
    "7n + 4",
    "22 − 4n",
    "67",
    "T₉",
    "−23",
    "T₈",
    "5n − 1",
    "99",
    "Incorrect; the next term is 13",
    "30",
    "6",
    "76",
    "9:20 a.m.",
    "11:35 a.m.",
    "2:30 p.m.",
    "62",
    "Stage 20",
    "Yes, because T₁₅ = −5 + 14(7) = 93",
    "Both increase by the same amount each term",
    "26",
    "4",
    "T₃",
  ],
} as const;

const objectiveBanks = [
  ["foundation", mathF2C1FoundationQuizzesDLP, expectedAnswers.foundation],
  ["practice", mathF2C1PracticeQuizzesDLP, expectedAnswers.practice],
  ["challenge", mathF2C1ChallengeQuizzesDLP, expectedAnswers.challenge],
] as const;

describe("Mathematics Form 2 Chapter 1 DLP curated quiz bank", () => {
  it.each(objectiveBanks)("keeps %s as a separate 30-question objective", (_, bank) => {
    expect(bank).toHaveLength(30);
  });

  it("contains exactly 90 questions with valid options, answers, explanations, and unique IDs", () => {
    expect(mathF2C1QuizzesDLP).toHaveLength(90);
    expect(new Set(mathF2C1QuizzesDLP.map(({ id }) => id)).size).toBe(90);
    expect(new Set(mathF2C1QuizzesDLP.map(({ question }) => question)).size).toBe(90);

    mathF2C1QuizzesDLP.forEach((question) => {
      expect(question.options).toHaveLength(4);
      expect(question.answerIndex).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex).toBeLessThan(4);
      expect(question.options[question.answerIndex]).toBeTruthy();
      expect(question.explanation?.trim()).toBeTruthy();
      expect(question).toMatchObject({
        subjectId: "math",
        form: "Form 2",
        chapter: "Chapter 1",
        lang: "dlp",
      });
    });
  });

  it.each(objectiveBanks)("preserves every independently checked %s answer", (_, bank, answers) => {
    expect(bank.map((question) => question.options[question.answerIndex])).toEqual(answers);
  });

  it("keeps the intended objective difficulty progression", () => {
    expect(new Set(mathF2C1FoundationQuizzesDLP.map(({ difficulty }) => difficulty))).toEqual(
      new Set(["Easy"]),
    );
    expect(new Set(mathF2C1PracticeQuizzesDLP.map(({ difficulty }) => difficulty))).toEqual(
      new Set(["Medium"]),
    );
    expect(new Set(mathF2C1ChallengeQuizzesDLP.map(({ difficulty }) => difficulty))).toEqual(
      new Set(["Medium", "Hard"]),
    );
  });

  it("contains none of the removed legacy DLP prompts", () => {
    const questions = new Set(mathF2C1QuizzesDLP.map(({ question }) => question));
    expect(questions.has("What is the meaning of a pattern?")).toBe(false);
    expect(questions.has("Which operations can form a number pattern?")).toBe(false);
    expect(questions.has("The time interval formula in the notes is")).toBe(false);
  });
});

describe("Mathematics Form 2 Chapter 1 objective routing contract", () => {
  const routeSource = readFileSync(
    new URL("../../../../routes/quizzes.tsx", import.meta.url),
    "utf8",
  );

  it("routes only the Form 2 Chapter 1 DLP chapter through the three existing objective cards", () => {
    expect(routeSource).toContain("const MATH_F2_C1_DLP_OBJECTIVE_BANK");
    expect(routeSource).toContain('form === "Form 2"');
    expect(routeSource).toContain('chapter === "Chapter 1"');
    expect(routeSource).toContain('scienceLang === "dlp"');
    expect(routeSource).toContain("MATH_F2_C1_DLP_OBJECTIVE_BANK[mathObjectiveId]");
    expect(routeSource).toContain('form === "Form 1" || isForm2Chapter1DlpObjective');
  });

  it("retains the existing objective scoring, explanations, results, and retry handlers", () => {
    expect(routeSource).toContain("function answerMathObjective(i: number)");
    expect(routeSource).toContain("i === currentMathQuestion.answerIndex");
    expect(routeSource).toContain("current.explanation");
    expect(routeSource).toContain("function nextMathObjectiveQuestion()");
    expect(routeSource).toContain("onRetry={() =>");
    expect(routeSource).toContain('setMathObjectivePhase("intro")');
  });
});
