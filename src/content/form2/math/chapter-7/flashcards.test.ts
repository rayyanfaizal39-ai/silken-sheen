import { describe, expect, it } from "vitest";
import { MATH_F2_C7_BANK } from "./flashcard-bank";
import { mathF2C7FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C7FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 7 coordinate flashcards", () => {
  it("preserves all 60 original IDs in both languages", () => {
    for (const [lang, deck] of [["dlp", mathF2C7FlashcardsDLP], ["bm", mathF2C7FlashcardsBM]] as const) {
      expect(deck).toHaveLength(60);
      expect(new Set(deck.map(c => c.id)).size).toBe(60);
      deck.forEach((card, i) => expect(card.id).toBe(`math-f2-c7-${lang}-f${i + 1}`));
    }
  });
  it("combines 7.1 to 7.3 into 12 concept, 33 practice and 15 challenge", () => {
    for (const [mode, count] of [["concept", 12], ["practice", 33], ["challenge", 15]] as const) {
      const subset = MATH_F2_C7_BANK.filter(c => c.mode === mode);
      expect(subset).toHaveLength(count);
      expect(new Set(subset.map(c => c.subtopic))).toEqual(new Set(["7.1", "7.2", "7.3"]));
    }
  });
  it("provides in-bounds identical coordinate visuals and worked answers", () => {
    mathF2C7FlashcardsDLP.forEach((card, i) => {
      const bm = mathF2C7FlashcardsBM[i];
      expect(card.reviewMode).toBe(bm.reviewMode);
      expect(card.structured?.visuals).toEqual(bm.structured?.visuals);
      const visual = MATH_F2_C7_BANK[i].visuals?.[0];
      expect(visual?.kind).toBe("coordinate-plane");
      if (visual?.kind === "coordinate-plane") {
        const [xmin, xmax, ymin, ymax] = visual.domain;
        visual.points?.forEach(p => {
          expect(p.at[0]).toBeGreaterThanOrEqual(xmin);
          expect(p.at[0]).toBeLessThanOrEqual(xmax);
          expect(p.at[1]).toBeGreaterThanOrEqual(ymin);
          expect(p.at[1]).toBeLessThanOrEqual(ymax);
        });
      }
      if (card.reviewMode === "challenge") {
        expect(card.structured?.parts).toHaveLength(3);
        expect(card.structured?.answer).toHaveLength(3);
        expect(bm.structured?.parts).toHaveLength(3);
      }
    });
  });
});
