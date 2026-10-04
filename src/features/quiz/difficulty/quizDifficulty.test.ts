import { describe, expect, it } from "vitest";
import {
  createAttemptSnapshot,
  normalizeQuizDifficulty,
  orderQuestionsByDifficulty,
  orderRegularQuizQuestions,
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

describe("Science Form 1 full-pool ordering", () => {
  const science = { subjectId: "science", form: "Form 1" };

  it("mixes difficulty tiers, retains every question and preserves metadata", () => {
    const original = structuredClone(questions);
    const ordered = orderRegularQuizQuestions(questions, science, () => 0).questions;
    expect(ordered.map((q) => q.id)).toEqual(["e2", "m1", "m2", "h1", "h2", "e1"]);
    expect(new Set(ordered.map((q) => q.id))).toEqual(new Set(questions.map((q) => q.id)));
    expect(ordered).toHaveLength(questions.length);
    for (const q of ordered) expect(q).toEqual(questions.find((source) => source.id === q.id));
    expect(questions).toEqual(original);
  });

  it.each(["easy", "medium", "hard"])("shuffles only the filtered %s pool", (difficulty) => {
    const filtered = questions.filter((q) => normalizeQuizDifficulty(q.difficulty) === difficulty);
    const result = orderRegularQuizQuestions(filtered, science, () => 0).questions;
    expect(result).toEqual([...filtered].reverse());
    expect(result.every((q) => normalizeQuizDifficulty(q.difficulty) === difficulty)).toBe(true);
  });

  it.each([
    ["science", "Form 2"], ["science", "Form 3"], ["math", "Form 1"],
    ["sejarah", "Form 1"], ["english", "Form 1"], ["bm", "Form 1"],
  ])("preserves the old ordering for %s %s", (subjectId, form) => {
    expect(orderRegularQuizQuestions(questions, { subjectId, form }, () => 0.2))
      .toEqual(orderQuestionsByDifficulty(questions, () => 0.2));
  });

  it("supports new orders, correct shuffled options and saved attempt restoration", () => {
    const build = (random: () => number) => orderRegularQuizQuestions(questions, science, random)
      .questions.map((q) => shuffleQuestionOptions(q, random));
    const attempt = build(() => 0);
    const next = build(() => 0.99);
    expect(attempt.map((q) => q.id)).not.toEqual(next.map((q) => q.id));
    for (const q of attempt) {
      const source = questions.find((item) => item.id === q.id)!;
      expect(q.options).not.toEqual(source.options);
      expect(q.options[q.answerIndex]).toBe(source.options[source.answerIndex]);
    }
    const snapshot = createAttemptSnapshot("science-f1-ch1", "one", attempt)!;
    expect(restoreAttemptOrder(snapshot, snapshot.quizKey, attempt)).toEqual(attempt);
    expect(restoreAttemptOrder(snapshot, "another-quiz", attempt)).toBeNull();
  });
});
