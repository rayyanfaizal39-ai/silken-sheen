import { describe, expect, it } from "vitest";
import {
  buildQuizKey,
  calculateQuizXp,
  calculateQuizXpFromScore,
  createQuizCompletionId,
  QUIZ_MAX_XP,
} from "./quizXp";

describe("quiz XP", () => {
  it.each([
    [50, 20],
    [60, 25],
    [79, 25],
    [80, 30],
    [89, 30],
    [90, 40],
    [99, 40],
    [100, 50],
  ])("awards %i%% as %i XP", (score, expectedXp) => {
    expect(calculateQuizXpFromScore(score).totalXp).toBe(expectedXp);
  });

  it("never exceeds 50 XP", () => {
    expect(calculateQuizXpFromScore(500).totalXp).toBe(QUIZ_MAX_XP);
  });

  it("derives the same award from correct and total", () => {
    expect(calculateQuizXp(9, 10)).toMatchObject({ scorePct: 90, totalXp: 40 });
  });

  it("uses stable keys while keeping explicit quiz variants separate", () => {
    expect(
      buildQuizKey({
        subjectId: "English",
        form: "Form 2",
        chapterKey: "Paper 1",
        variant: "Set A",
      }),
    ).toBe("quiz-v1:english:form-2:paper-1:set-a");
    expect(
      buildQuizKey({
        subjectId: "English",
        form: "Form 2",
        chapterKey: "Paper 1",
        variant: "Set B",
      }),
    ).not.toBe("quiz-v1:english:form-2:paper-1:set-a");
  });

  it("creates UUID completion ids for retry idempotency", () => {
    expect(createQuizCompletionId()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });
});
