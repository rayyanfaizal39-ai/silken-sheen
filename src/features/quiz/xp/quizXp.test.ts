import { describe, expect, it } from "vitest";
import {
  addCorrectAnswer,
  bmWorldBandXp,
  buildCanonicalQuizKey,
  buildQuizKey,
  calculateOriginalQuizXp,
  createNonEarningQuizResult,
  createQuizCompletionId,
  EMPTY_CORRECT_BY_DIFFICULTY,
  historicalDifficultyTier,
  timerModeFromPref,
} from "./quizXp";

const scienceF1C7 = (easy: number, medium: number, hard: number, timerMode = "none") =>
  calculateOriginalQuizXp({
    formula: "standard",
    total: 30,
    correct: { easy, medium, hard },
    timerMode: timerMode as "none",
  });

describe("original quiz XP economy (client mirror of the server)", () => {
  it.each([
    ["none", 675],
    ["60", 825],
    ["30", 975],
    ["15", 1125],
  ])("Science F1 Ch7 30/30 with timer %s = %i XP", (timer, expected) => {
    expect(scienceF1C7(15, 10, 5, timer)).toMatchObject({
      baseXp: 500,
      correctBonusXp: 150,
      passBonusXp: 25,
      totalXp: expected,
    });
  });

  it("26/30 depends on which questions were missed", () => {
    expect(scienceF1C7(11, 10, 5).totalXp).toBe(615);
    expect(scienceF1C7(15, 10, 1).totalXp).toBe(535);
    expect(scienceF1C7(11, 10, 5, "15").totalXp).toBe(1005);
    expect(scienceF1C7(15, 10, 1, "15").totalXp).toBe(925);
  });

  it("pays the +25 pass bonus from a rounded 80%", () => {
    const at = (correct: number, total: number) =>
      calculateOriginalQuizXp({
        formula: "objective",
        total,
        correct: { easy: correct, medium: 0, hard: 0 },
        timerMode: "none",
      }).passBonusXp;
    expect(at(24, 30)).toBe(25); // 80%
    expect(at(23, 30)).toBe(0); // 77%
    expect(at(7, 9)).toBe(0); // 78%
  });

  it("never pays timer XP on English / Maths objective", () => {
    expect(
      calculateOriginalQuizXp({
        formula: "objective",
        total: 30,
        correct: { easy: 17, medium: 13, hard: 0 },
        timerMode: "15",
      }),
    ).toMatchObject({ timerBonusXp: 0, totalXp: 605 });
  });

  it("prices BM World with its score band and fixed per-correct bonuses", () => {
    const bm = (correct: number) =>
      calculateOriginalQuizXp({
        formula: "bm_world",
        total: 15,
        correct: { easy: 0, medium: correct, hard: 0 },
        timerMode: "none",
      }).totalXp;
    expect(bm(15)).toBe(220);
    expect(bm(13)).toBe(190);
    expect(bm(9)).toBe(110);
    expect(bm(0)).toBe(10);
    expect([90, 80, 60, 59].map(bmWorldBandXp)).toEqual([45, 35, 20, 10]);
  });

  it("classifies difficulty exactly like the historical getBaseQuestionXp", () => {
    expect(historicalDifficultyTier("Hard")).toBe("hard");
    expect(historicalDifficultyTier("MEDIUM")).toBe("medium");
    expect(historicalDifficultyTier("Easy")).toBe("easy");
    expect(historicalDifficultyTier(undefined)).toBe("easy");
    // Aliases were never recognised by the XP code, so they paid Easy XP.
    expect(historicalDifficultyTier("Sukar")).toBe("easy");
    expect(addCorrectAnswer(EMPTY_CORRECT_BY_DIFFICULTY, "Hard")).toEqual({
      easy: 0,
      medium: 0,
      hard: 1,
    });
  });

  it("maps the timer picker to the server's timer modes", () => {
    expect(timerModeFromPref(null)).toBe("none");
    expect(timerModeFromPref({ mode: "none", seconds: 15 })).toBe("none");
    expect(timerModeFromPref({ mode: "timer", seconds: 15 })).toBe("15");
    expect(timerModeFromPref({ mode: "timer", seconds: 45 })).toBe("none");
  });

  it("shows guests what the quiz would have earned, but earns 0", () => {
    expect(
      createNonEarningQuizResult(
        { formula: "standard", total: 30, correct: { easy: 15, medium: 10, hard: 5 }, timerMode: "15" },
        "guest",
      ),
    ).toMatchObject({ eligible: false, xpEarned: 0, potentialXp: 1125 });
  });
});

describe("quiz keys", () => {
  it("separates BM and DLP banks in the canonical key", () => {
    const key = (lang: string) =>
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "science",
        form: "Form 1",
        chapterKey: "Chapter 7",
        lang,
        set: null,
        difficulty: "All",
      });
    expect(key("bm")).toBe("quiz-v2:standard:science:form-1:chapter-7:bm:set-default:difficulty-all");
    expect(key("dlp")).not.toBe(key("bm"));
  });

  it("builds stable keys for every quiz type", () => {
    expect(buildCanonicalQuizKey({ kind: "english", form: "Form 2", setId: "objective-a" })).toBe(
      "quiz-v2:english:english:form-2:paper-1:en:objective-a",
    );
    expect(buildCanonicalQuizKey({ kind: "bm-world", form: "Form 1", setId: "bm-f1-obj1" })).toBe(
      "quiz-v2:bm-world:bm:form-1:kertas-1-objektif:bm:bm-f1-obj1",
    );
    expect(
      buildCanonicalQuizKey({
        kind: "math-objective",
        form: "Form 2",
        chapterKey: "Chapter 1",
        lang: "dlp",
        objectiveId: "objective-3",
      }),
    ).toBe("quiz-v2:math-objective:math:form-2:chapter-1:dlp:objective-3");
  });

  it("keeps the 2026-09-23 client's v1 key format for the legacy catalog", () => {
    expect(
      buildQuizKey({ subjectId: "English", form: "Form 2", chapterKey: "Paper 1", variant: "Set A" }),
    ).toBe("quiz-v1:english:form-2:paper-1:set-a");
  });

  it("creates UUID completion ids for retry idempotency", () => {
    expect(createQuizCompletionId()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });
});
