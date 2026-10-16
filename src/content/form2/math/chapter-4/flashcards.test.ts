import { describe, expect, it } from "vitest";
import { MATH_F2_C4_BANK } from "./flashcard-bank";
import { mathF2C4FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C4FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 4 structured polygon flashcards", () => {
  it("provides stable 60-card IDs in both languages", () => {
    for (const [lang, cards] of [["dlp", mathF2C4FlashcardsDLP], ["bm", mathF2C4FlashcardsBM]] as const) {
      expect(cards).toHaveLength(60);
      expect(new Set(cards.map(card => card.id)).size).toBe(60);
      cards.forEach((card, i) => expect(card.id).toBe(`math-f2-c4-${lang}-f${i + 1}`));
    }
  });
  it("covers 3 subtopics and 12 concept / 33 practice / 15 challenge", () => {
    for (const [mode, count] of [["concept", 12], ["practice", 33], ["challenge", 15]] as const) {
      const cards = MATH_F2_C4_BANK.filter(card => card.mode === mode);
      expect(cards).toHaveLength(count);
      expect(new Set(cards.map(card => card.subtopic))).toEqual(new Set(["4.1", "4.2", "4.3"]));
    }
  });
  it("includes matching diagrams and structured solutions in DLP and BM", () => {
    mathF2C4FlashcardsDLP.forEach((dlp, i) => {
      const bm = mathF2C4FlashcardsBM[i];
      expect(dlp.reviewMode).toBe(bm.reviewMode);
      expect(dlp.structured?.visuals).toEqual(bm.structured?.visuals);
      expect(dlp.structured?.visuals?.[0]?.kind).toBe("geometry-diagram");
      expect(dlp.structured?.answer.length).toBe(dlp.reviewMode === "challenge" ? 3 : 1);
      expect(bm.structured?.answer.length).toBe(dlp.structured?.answer.length);
    });
  });
});
