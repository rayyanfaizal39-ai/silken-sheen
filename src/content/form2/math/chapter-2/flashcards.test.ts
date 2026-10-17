import { describe, expect, it } from "vitest";
import { MATH_F2_C2_BANK } from "./flashcard-bank";
import { mathF2C2FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C2FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 2 combined review decks", () => {
  it("has 60 cards per language with stable, distinct IDs", () => {
    for (const [lang, cards] of [["dlp", mathF2C2FlashcardsDLP], ["bm", mathF2C2FlashcardsBM]] as const) {
      expect(cards).toHaveLength(60);
      expect(new Set(cards.map((card) => card.id)).size).toBe(60);
      cards.forEach((card, i) => expect(card.id).toBe(`math-f2-c2-${lang}-f${i + 1}`));
    }
  });
  it("covers all subtopics with 12 concept, 32 practice and 16 challenge cards", () => {
    expect(new Set(MATH_F2_C2_BANK.map((c) => c.subtopic))).toEqual(
      new Set(["2.1", "2.2", "2.3", "2.4"]),
    );
    for (const subtopic of ["2.1", "2.2", "2.3", "2.4"]) {
      const subset = MATH_F2_C2_BANK.filter((c) => c.subtopic === subtopic);
      expect(subset.filter((c) => c.mode === "concept")).toHaveLength(3);
      expect(subset.filter((c) => c.mode === "practice")).toHaveLength(8);
      expect(subset.filter((c) => c.mode === "challenge")).toHaveLength(4);
    }
  });
  it("requires real structured parts, worked steps, and a visual on challenges", () => {
    for (const entry of MATH_F2_C2_BANK.filter((c) => c.mode === "challenge")) {
      expect(entry.visuals?.length).toBeGreaterThan(0);
      for (const side of [entry.dlp, entry.bm]) {
        expect(side.parts).toHaveLength(3);
        expect(side.answer).toHaveLength(3);
        expect(side.answer.every((lines) => lines.length > 0 && lines.every(Boolean))).toBe(true);
      }
    }
  });
  it("keeps DLP and BM paired with identical mode and visual data", () => {
    mathF2C2FlashcardsDLP.forEach((card, i) => {
      const bm = mathF2C2FlashcardsBM[i];
      expect(card.subtopic).toBe(bm.subtopic);
      expect(card.reviewMode).toBe(bm.reviewMode);
      expect(card.structured?.visuals).toEqual(bm.structured?.visuals);
    });
  });
});
