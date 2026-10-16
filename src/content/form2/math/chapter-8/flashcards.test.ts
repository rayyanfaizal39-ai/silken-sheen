import { describe, expect, it } from "vitest";
import { MATH_F2_C8_BANK } from "./flashcard-bank";
import { mathF2C8FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C8FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 8 functions and graphs flashcards", () => {
  it("keeps 60 stable IDs in each language", () => {
    for (const [lang, cards] of [["dlp", mathF2C8FlashcardsDLP], ["bm", mathF2C8FlashcardsBM]] as const) {
      expect(cards).toHaveLength(60);
      expect(new Set(cards.map(c => c.id)).size).toBe(60);
      cards.forEach((card, i) => expect(card.id).toBe(`math-f2-c8-${lang}-f${i + 1}`));
    }
  });
  it("combines the three subtopics with 12 concept / 33 practice / 15 challenge", () => {
    for (const [mode, count] of [["concept", 12], ["practice", 33], ["challenge", 15]] as const) {
      const cards = MATH_F2_C8_BANK.filter(c => c.mode === mode);
      expect(cards).toHaveLength(count);
      expect(new Set(cards.map(c => c.subtopic))).toEqual(new Set(["8.1", "8.2", "8.3"]));
    }
  });
  it("provides bilingual visuals, accurate bounds, and multi-part challenges", () => {
    mathF2C8FlashcardsDLP.forEach((card, i) => {
      const bm = mathF2C8FlashcardsBM[i];
      expect(card.subtopic).toBe(bm.subtopic);
      expect(card.reviewMode).toBe(bm.reviewMode);
      expect(card.structured?.visuals).toEqual(bm.structured?.visuals);
      const visual = MATH_F2_C8_BANK[i].visuals?.[0];
      if (visual?.kind === "coordinate-plane") {
        const [xmin,xmax,ymin,ymax] = visual.domain;
        for (const point of visual.points ?? []) {
          expect(point.at[0]).toBeGreaterThanOrEqual(xmin);
          expect(point.at[0]).toBeLessThanOrEqual(xmax);
          expect(point.at[1]).toBeGreaterThanOrEqual(ymin);
          expect(point.at[1]).toBeLessThanOrEqual(ymax);
        }
      }
      if (card.reviewMode === "challenge") {
        expect(card.structured?.parts).toHaveLength(3);
        expect(card.structured?.answer).toHaveLength(3);
        expect(bm.structured?.parts).toHaveLength(3);
      }
    });
  });
});
