import { describe, expect, it } from "vitest";
import {
  createAttemptSnapshot,
  normalizeQuizDifficulty,
  orderQuestionsByDifficulty,
  restoreAttemptOrder,
  shuffleQuestionOptions,
} from "./quizDifficulty";

type TestQuestion = {
  id: string;
  difficulty: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

const questions: TestQuestion[] = [
  { id: "e1", difficulty: "Easy", options: ["a", "b"], answerIndex: 1, explanation: "e1" },
  { id: "e2", difficulty: "mudah", options: ["c", "d"], answerIndex: 0, explanation: "e2" },
  { id: "m1", difficulty: "Medium", options: ["e", "f"], answerIndex: 1, explanation: "m1" },
  {
    id: "m2",
    difficulty: "intermediate",
    options: ["g", "h"],
    answerIndex: 0,
    explanation: "m2",
  },
  { id: "h1", difficulty: "Hard", options: ["i", "j"], answerIndex: 1, explanation: "h1" },
  {
    id: "h2",
    difficulty: "challenge",
    options: ["k", "l"],
    answerIndex: 0,
    explanation: "h2",
  },
];

const sequenceRandom = (...values: number[]) => {
  let index = 0;
  return () => values[index++ % values.length];
};

describe("controlled quiz difficulty ordering", () => {
  it.each([
    ["Easy", "easy"],
    ["mudah", "easy"],
    ["foundation", "easy"],
    ["beginner", "easy"],
    ["Medium", "medium"],
    ["sederhana", "medium"],
    ["intermediate", "medium"],
    ["Hard", "hard"],
    ["sukar", "hard"],
    ["advanced", "hard"],
    ["challenge", "hard"],
  ] as const)("normalizes %s to %s", (value, expected) => {
    expect(normalizeQuizDifficulty(value)).toBe(expected);
  });

  it("keeps Easy before Medium and Medium before Hard", () => {
    const result = orderQuestionsByDifficulty(
      [...questions].reverse(),
      sequenceRandom(0.1, 0.8, 0.2),
    ).questions;
    expect(result.map((question) => normalizeQuizDifficulty(question.difficulty))).toEqual([
      "easy",
      "easy",
      "medium",
      "medium",
      "hard",
      "hard",
    ]);
  });

  it("shuffles independently inside every tier", () => {
    const first = orderQuestionsByDifficulty(questions, () => 0).questions.map(({ id }) => id);
    const second = orderQuestionsByDifficulty(questions, () => 0.99).questions.map(({ id }) => id);
    expect(first.slice(0, 2)).not.toEqual(second.slice(0, 2));
    expect(first.slice(2, 4)).not.toEqual(second.slice(2, 4));
    expect(first.slice(4)).not.toEqual(second.slice(4));
  });

  it("does not mutate difficulty, answers, explanations, or source order", () => {
    const original = structuredClone(questions);
    orderQuestionsByDifficulty(questions, () => 0.2);
    expect(questions).toEqual(original);
  });

  it("keeps the correct option attached when options are shuffled", () => {
    const question = questions[0];
    const correct = question.options[question.answerIndex];
    const shuffled = shuffleQuestionOptions(question, () => 0);
    expect(shuffled.options[shuffled.answerIndex]).toBe(correct);
    expect(shuffled.explanation).toBe(question.explanation);
  });

  it("reports unknown difficulty without changing it", () => {
    const invalid = { ...questions[0], difficulty: "expert-ish" };
    const result = orderQuestionsByDifficulty([invalid]);
    expect(result.issues).toEqual([{ index: 0, questionId: "e1", value: "expert-ish" }]);
    expect(result.questions[0].difficulty).toBe("expert-ish");
  });

  it("restores one attempt while isolating other quiz identities", () => {
    const ordered = orderQuestionsByDifficulty(questions, () => 0).questions;
    const snapshot = createAttemptSnapshot("quiz-a", "attempt-1", ordered);
    expect(snapshot).not.toBeNull();
    expect(restoreAttemptOrder(snapshot!, "quiz-a", questions)).toEqual(ordered);
    expect(restoreAttemptOrder(snapshot!, "quiz-b", questions)).toBeNull();
  });

  it("keeps a created attempt stable and allows a restart to create a new order", () => {
    const activeAttempt = orderQuestionsByDifficulty(questions, () => 0).questions;
    expect(activeAttempt).toBe(activeAttempt);
    const restarted = orderQuestionsByDifficulty(questions, () => 0.99).questions;
    expect(restarted.map(({ id }) => id)).not.toEqual(activeAttempt.map(({ id }) => id));
  });
});
