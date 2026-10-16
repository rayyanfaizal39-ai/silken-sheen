import { describe, expect, it } from "vitest";
import {
  mathF2C2FoundationQuizzesBM,
  mathF2C2PracticeQuizzesBM,
  mathF2C2ChallengeQuizzesBM,
  mathF2C2QuizzesBM,
} from "./quizzes-bm";
import {
  mathF2C2FoundationQuizzesDLP,
  mathF2C2PracticeQuizzesDLP,
  mathF2C2ChallengeQuizzesDLP,
  mathF2C2QuizzesDLP,
} from "./quizzes-dlp";
import { MATH_F2_C2_QUIZ_VISUALS } from "./quiz-visuals";

const selected = ["F5", "F7", "P6", "P7", "C4", "C25"] as const;

describe("Form 2 Mathematics Chapter 2 bilingual visual audit", () => {
  it("preserves three 30-item objectives and correct answer indices", () => {
    for (const banks of [
      [mathF2C2FoundationQuizzesBM, mathF2C2PracticeQuizzesBM, mathF2C2ChallengeQuizzesBM],
      [mathF2C2FoundationQuizzesDLP, mathF2C2PracticeQuizzesDLP, mathF2C2ChallengeQuizzesDLP],
    ]) {
      for (const bank of banks) {
        expect(bank).toHaveLength(30);
        for (const item of bank) {
          expect(item.options).toHaveLength(4);
          expect(new Set(item.options).size).toBe(4);
          expect(item.answerIndex).toBeGreaterThanOrEqual(0);
          expect(item.answerIndex).toBeLessThan(4);
          expect(item.options[item.answerIndex]).toBeTruthy();
        }
      }
    }
    expect(mathF2C2QuizzesBM).toHaveLength(90);
    expect(mathF2C2QuizzesDLP).toHaveLength(90);
    expect(new Set(mathF2C2QuizzesBM.map(q => q.id)).size).toBe(90);
    expect(new Set(mathF2C2QuizzesDLP.map(q => q.id)).size).toBe(90);
  });

  it("uses the exact same six unsolved geometrical representations in BM and DLP", () => {
    expect(Object.keys(MATH_F2_C2_QUIZ_VISUALS).sort()).toEqual([...selected].sort());
    for (const key of selected) {
      const bm = mathF2C2QuizzesBM.find(q => q.id === `BM-${key}`);
      const en = mathF2C2QuizzesDLP.find(q => q.id === `DLP-${key}`);
      const expected = MATH_F2_C2_QUIZ_VISUALS[key];
      expect(bm).toBeTruthy();
      expect(en).toBeTruthy();
      expect(bm?.visual).toBe(expected);
      expect(en?.visual).toBe(expected);
      expect(expected.kind).toBe("geometry-diagram");
    }
    expect(mathF2C2QuizzesBM.filter(q => q.visual)).toHaveLength(6);
    expect(mathF2C2QuizzesDLP.filter(q => q.visual)).toHaveLength(6);
  });

  it("shows only given dimensions and no calculated area result", () => {
    const area = MATH_F2_C2_QUIZ_VISUALS["P6"];
    expect(area.kind).toBe("geometry-diagram");
    if (area.kind !== "geometry-diagram") throw new Error("Expected geometry diagram");
    const labels = area.panels[0].labels.map(label => label.text);
    expect(labels).toContain("3x + 2 cm");
    expect(labels).toContain("x + 4 cm");
    expect(labels).not.toContain("3x² + 14x + 8");
    const hole = MATH_F2_C2_QUIZ_VISUALS["C4"];
    expect(hole.kind).toBe("geometry-diagram");
    if (hole.kind !== "geometry-diagram") throw new Error("Expected frame diagram");
    expect(hole.panels[0].paths).toHaveLength(2);
  });
});
