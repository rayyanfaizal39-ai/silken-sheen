import { describe, expect, it } from "vitest";
import { MATH_F2_C10_BANK } from "./flashcard-bank";
import { mathF2C10FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C10FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 10 gradient flashcards", () => {
  it("retains 60 IDs per language", () => {
    for (const [lang, deck] of [["dlp", mathF2C10FlashcardsDLP], ["bm", mathF2C10FlashcardsBM]] as const) {
      expect(deck).toHaveLength(60);
      expect(new Set(deck.map(c => c.id)).size).toBe(60);
      deck.forEach((c, i) => expect(c.id).toBe(`math-f2-c10-${lang}-f${i+1}`));
    }
  });
  it("provides 12 concept, 33 practice, 15 challenge across all three subtopics", () => {
    for (const [mode, count] of [["concept",12],["practice",33],["challenge",15]] as const) {
      const items = MATH_F2_C10_BANK.filter(c => c.mode === mode);
      expect(items).toHaveLength(count);
      expect(new Set(items.map(c => c.subtopic))).toEqual(new Set(["10.1","10.2","10.3"]));
    }
  });
  it("pairs bilingual diagrams and three worked challenge parts", () => {
    mathF2C10FlashcardsDLP.forEach((card,i) => {
      const bm = mathF2C10FlashcardsBM[i];
      expect(card.reviewMode).toBe(bm.reviewMode);
      expect(card.subtopic).toBe(bm.subtopic);
      expect(card.structured?.visuals).toEqual(bm.structured?.visuals);
      if (card.reviewMode === "challenge") {
        expect(card.structured?.parts).toHaveLength(3);
        expect(card.structured?.answer).toHaveLength(3);
        expect(bm.structured?.parts).toHaveLength(3);
      }
    });
  });
});
