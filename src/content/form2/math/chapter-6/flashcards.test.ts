import { describe, expect, it } from "vitest";
import { MATH_F2_C6_BANK } from "./flashcard-bank";
import { mathF2C6FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C6FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 6 structured 3D-shapes flashcards", () => {
  it("preserves 60 stable card IDs per language", () => {
    for (const [lang, deck] of [["dlp", mathF2C6FlashcardsDLP], ["bm", mathF2C6FlashcardsBM]] as const) {
      expect(deck).toHaveLength(60);
      expect(new Set(deck.map(c => c.id)).size).toBe(60);
      deck.forEach((card, i) => expect(card.id).toBe(`math-f2-c6-${lang}-f${i + 1}`));
    }
  });
  it("covers each subtopic in Concept, Practice and Challenge", () => {
    for (const [mode, count] of [["concept", 12], ["practice", 33], ["challenge", 15]] as const) {
      const cards = MATH_F2_C6_BANK.filter(c => c.mode === mode);
      expect(cards).toHaveLength(count);
      expect(new Set(cards.map(c => c.subtopic))).toEqual(new Set(["6.1", "6.2", "6.3"]));
    }
  });
  it("keeps DLP and BM aligned and every Challenge multipart", () => {
    mathF2C6FlashcardsDLP.forEach((card, i) => {
      const bm = mathF2C6FlashcardsBM[i];
      expect(card.subtopic).toBe(bm.subtopic);
      expect(card.reviewMode).toBe(bm.reviewMode);
      expect(card.structured?.visuals).toEqual(bm.structured?.visuals);
      if (card.reviewMode === "challenge") {
        expect(card.structured?.parts).toHaveLength(3);
        expect(bm.structured?.parts).toHaveLength(3);
        expect(card.structured?.answer).toHaveLength(3);
        expect(bm.structured?.answer).toHaveLength(3);
      }
    });
  });
  it("includes purposeful geometry and net visuals", () => {
    const visuals = MATH_F2_C6_BANK.flatMap(c => c.visuals ?? []);
    expect(visuals.some(v => v.kind === "geometry-diagram")).toBe(true);
    expect(visuals.some(v => v.kind === "geometry-model")).toBe(true);
  });
});
