import { describe, expect, it } from "vitest";
import { MATH_F2_C5_BANK } from "./flashcard-bank";
import { mathF2C5FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C5FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 5 flashcards", () => {
  it("contains 60 cards in each language with stable IDs", () => {
    for (const [lang, deck] of [["dlp", mathF2C5FlashcardsDLP], ["bm", mathF2C5FlashcardsBM]] as const) {
      expect(deck).toHaveLength(60);
      expect(new Set(deck.map(card => card.id)).size).toBe(60);
      deck.forEach((card, i) => expect(card.id).toBe(`math-f2-c5-${lang}-f${i + 1}`));
    }
  });
  it("combines all three circle subtopics across modes", () => {
    for (const [mode, count] of [["concept", 12], ["practice", 33], ["challenge", 15]] as const) {
      const cards = MATH_F2_C5_BANK.filter(card => card.mode === mode);
      expect(cards).toHaveLength(count);
      expect(new Set(cards.map(card => card.subtopic))).toEqual(new Set(["5.1", "5.2", "5.3"]));
    }
  });
  it("keeps BM/DLP aligned and challenges multi-part", () => {
    mathF2C5FlashcardsDLP.forEach((dlp, i) => {
      const bm = mathF2C5FlashcardsBM[i];
      expect(dlp.subtopic).toBe(bm.subtopic);
      expect(dlp.reviewMode).toBe(bm.reviewMode);
      if (dlp.reviewMode === "challenge") {
        expect(dlp.structured?.parts).toHaveLength(3);
        expect(dlp.structured?.answer).toHaveLength(3);
        expect(bm.structured?.parts).toHaveLength(3);
        expect(bm.structured?.answer).toHaveLength(3);
      }
    });
  });
});
