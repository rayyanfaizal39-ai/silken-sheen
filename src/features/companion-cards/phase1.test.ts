import { describe, expect, it } from "vitest";
import {
  ARCHETYPES,
  PROFILE_QUESTIONS,
  WESTERN_ZODIAC,
  CHINESE_ZODIAC,
  designKey,
  generatePhase1Previews,
  reserveFirstUnusedDesign,
  scoreLearningProfile,
  visualDistance,
} from "./phase1";

describe("AcadeMY companion cards — Phase 1 rules", () => {
  it("has ten balanced, scenario-based questions covering all four types", () => {
    expect(PROFILE_QUESTIONS).toHaveLength(10);
    for (const question of PROFILE_QUESTIONS) {
      expect(question.choices).toHaveLength(4);
      expect(question.prompt.length).toBeGreaterThan(12);
      expect(new Set(question.choices.map((choice) => choice.archetype))).toEqual(new Set(ARCHETYPES));
    }
    expect(WESTERN_ZODIAC).toHaveLength(12);
    expect(CHINESE_ZODIAC).toHaveLength(12);
  });

  it("scores only scenarios, with predictable tiebreaks", () => {
    const tenExplorers = Array.from({ length: 10 }, () => "explorer" as const);
    const result = scoreLearningProfile(tenExplorers);
    expect(result.archetype).toBe("explorer");
    expect(result.scores.explorer).toBe(10);
    const tied = scoreLearningProfile([
      "strategist", "explorer", "strategist", "explorer", "challenger",
      "creator", "challenger", "creator", "strategist", "explorer",
    ]);
    expect(tied.archetype).toBe("strategist");
    expect(tied.scores.strategist).toBe(3);
    expect(tied.scores.explorer).toBe(3);
    expect(() => scoreLearningProfile(["creator"])).toThrow(/ten/);
  });

  it("builds exactly 20 distinct configurations without issuing public URLs", () => {
    const cards = generatePhase1Previews();
    expect(cards).toHaveLength(20);
    expect(new Set(cards.map((card) => designKey(card.design))).size).toBe(20);
    expect(new Set(cards.map((card) => card.nickname)).size).toBe(20);
    for (const archetype of ARCHETYPES) {
      expect(cards.filter((card) => card.design.archetype === archetype)).toHaveLength(5);
    }
    for (const card of cards) {
      expect(card).not.toHaveProperty("publicToken");
      expect(card).not.toHaveProperty("ownerId");
    }
    expect(generatePhase1Previews()).toEqual(cards);
  });

  it("enforces three prominent visual differences between every pair", () => {
    const cards = generatePhase1Previews();
    for (let i = 0; i < cards.length; i += 1) {
      for (let j = i + 1; j < cards.length; j += 1) {
        expect(visualDistance(cards[i].design, cards[j].design)).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("skips an already-claimed design and rejects exhaustion", () => {
    const cards = generatePhase1Previews(2);
    const claimed = new Set([designKey(cards[0].design)]);
    expect(reserveFirstUnusedDesign(cards.map((c) => c.design), claimed)).toEqual(cards[1].design);
    expect(claimed.size).toBe(2);
    expect(() => reserveFirstUnusedDesign(cards.map((c) => c.design), claimed)).toThrow(/No unused/);
  });

  it("rejects invalid gallery sizes", () => {
    expect(() => generatePhase1Previews(0)).toThrow();
    expect(() => generatePhase1Previews(21)).toThrow();
    expect(() => generatePhase1Previews(1.5)).toThrow();
  });
});
