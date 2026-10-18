import { describe, expect, it } from "vitest";
import { MATH_F2_C9_BANK } from "./flashcard-bank";
import { mathF2C9FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C9FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 9 speed flashcards", () => {
  it("preserves 60 original IDs per language", () => {
    for (const [lang, deck] of [["dlp", mathF2C9FlashcardsDLP], ["bm", mathF2C9FlashcardsBM]] as const) {
      expect(deck).toHaveLength(60);
      expect(new Set(deck.map(c => c.id)).size).toBe(60);
      deck.forEach((card, index) => expect(card.id).toBe(`math-f2-c9-${lang}-f${index + 1}`));
    }
  });
  it("combines 9.1–9.3 into Concept, Practice and Challenge", () => {
    for (const [mode, count] of [["concept", 12], ["practice", 33], ["challenge", 15]] as const) {
      const cards = MATH_F2_C9_BANK.filter(c => c.mode === mode);
      expect(cards).toHaveLength(count);
      expect(new Set(cards.map(c => c.subtopic))).toEqual(new Set(["9.1", "9.2", "9.3"]));
    }
  });
  it("pairs bilingual visuals and multi-part solutions", () => {
    mathF2C9FlashcardsDLP.forEach((card, index) => {
      const bm = mathF2C9FlashcardsBM[index];
      expect(card.reviewMode).toBe(bm.reviewMode);
      expect(card.subtopic).toBe(bm.subtopic);
      expect(card.structured?.visuals).toEqual(bm.structured?.visuals);
      if (card.reviewMode === "challenge") {
        expect(card.structured?.parts).toHaveLength(3);
        expect(card.structured?.answer).toHaveLength(3);
        expect(bm.structured?.parts).toHaveLength(3);
        expect(bm.structured?.answer).toHaveLength(3);
        expect(card.structured?.visuals?.[0]?.kind).toBe("value-pairs");
      }
    });
  });
});
