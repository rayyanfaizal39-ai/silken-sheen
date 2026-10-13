import { describe, expect, it } from "vitest";
import {
  IDENTITY_QUESTIONS,
  IDENTITY_TYPES,
  isLearningIdentityResult,
  scoreLearningIdentity,
  type NovaArchetype,
} from "./learning-identity";

describe("Mengenal Diri Nova Egg quest", () => {
  it("has eight accessible questions with exactly four distinct learning types", () => {
    expect(IDENTITY_QUESTIONS).toHaveLength(8);
    for (const question of IDENTITY_QUESTIONS) {
      expect(question.prompt.trim().length).toBeGreaterThan(12);
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options.map(option => option.type)).size).toBe(4);
      expect(question.options.every(option => option.text.trim().length > 10)).toBe(true);
    }
    expect(Object.keys(IDENTITY_TYPES)).toEqual(["explorer", "strategist", "challenger", "creator"]);
  });

  it.each(["explorer", "strategist", "challenger", "creator"] as NovaArchetype[])(
    "selects a clear %s preference",
    (archetype) => {
      expect(scoreLearningIdentity(Array(8).fill(archetype) as NovaArchetype[])).toBe(archetype);
    },
  );

  it("uses the most recent tied preference without privileging an archetype", () => {
    expect(scoreLearningIdentity([
      "explorer", "strategist", "challenger", "creator",
      "explorer", "strategist", "challenger", "creator",
    ])).toBe("creator");
    expect(scoreLearningIdentity([
      "strategist", "creator", "challenger", "explorer",
      "strategist", "creator", "challenger", "explorer",
    ])).toBe("explorer");
  });

  it("rejects partial/invalid submissions", () => {
    expect(() => scoreLearningIdentity(["creator"])).toThrow();
    expect(() => scoreLearningIdentity(Array(8).fill("fake") as NovaArchetype[])).toThrow();
  });

  it("validates saved egg result against unexpected cloud/local data", () => {
    const valid = { archetype: "creator", quizVersion: 1, awardedAt: "2026-10-13T07:01:02.000Z" };
    expect(isLearningIdentityResult(valid)).toBe(true);
    expect(isLearningIdentityResult({ ...valid, archetype: "unknown" })).toBe(false);
    expect(isLearningIdentityResult({ ...valid, quizVersion: 3 })).toBe(false);
    expect(isLearningIdentityResult({ ...valid, awardedAt: "not-a-date" })).toBe(false);
  });
});
