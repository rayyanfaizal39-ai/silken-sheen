import { describe, expect, it } from "vitest";
import {
  calculateQuizQuestionXp,
  normalizeQuizTimerMode,
  QUIZ_CORRECT_STREAK_BONUS_XP,
  QUIZ_TIMER_BONUS_XP,
} from "./quizBonusXp";

describe("quiz bonus XP", () => {
  it.each([
    ["none", 0],
    [60, 5],
    [30, 10],
    [15, 15],
  ] as const)("maps timer %s to +%i XP", (mode, expected) => {
    expect(QUIZ_TIMER_BONUS_XP[mode]).toBe(expected);
  });

  it("normalizes invalid timer input to no timer", () => {
    expect(normalizeQuizTimerMode(5)).toBe("none");
    expect(normalizeQuizTimerMode("15")).toBe(15);
    expect(normalizeQuizTimerMode({ bonus: 500 })).toBe("none");
  });

  it.each([false, undefined, null])("awards no bonuses for wrong/timeout answers", (value) => {
    expect(
      calculateQuizQuestionXp({ correct: value === true, timerMode: 15, difficulty: "Hard" }),
    ).toEqual({ baseXp: 0, timerBonusXp: 0, streakBonusXp: 0, totalQuestionXp: 0 });
  });

  it("always uses a flat +5 correct-streak bonus", () => {
    expect(QUIZ_CORRECT_STREAK_BONUS_XP).toBe(5);
    expect(
      calculateQuizQuestionXp({ correct: true, timerMode: "none", difficulty: "Easy" }),
    ).toMatchObject({ timerBonusXp: 0, streakBonusXp: 5, totalQuestionXp: 15 });
  });

  it.each([
    ["Easy", 15, 30],
    ["Medium", 30, 35],
    ["Hard", 15, 50],
  ] as const)("combines %s + %s seconds into %i XP", (difficulty, timerMode, total) => {
    expect(calculateQuizQuestionXp({ correct: true, timerMode, difficulty }).totalQuestionXp).toBe(
      total,
    );
  });
});
