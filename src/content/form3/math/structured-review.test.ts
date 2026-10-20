import { describe, expect, it } from "vitest";
import { buildMathF3Flashcards, MATH_F3_CHAPTERS } from "./structured-review";
import { cardsForReviewMode } from "@/features/flashcards/structuredFlashcard";

describe("Form 3 Maths unified flashcard review", () => {
  it("provides nine bilingual chapters with 60 original card IDs per language", () => {
    expect(MATH_F3_CHAPTERS).toHaveLength(9);
    for (let chapter = 1; chapter <= 9; chapter++) {
      for (const lang of ["bm", "dlp"] as const) {
        const cards = buildMathF3Flashcards("Chapter " + chapter, lang);
        expect(cards).toHaveLength(60);
        expect(cards.map(c => c.id)).toEqual(
          Array.from({ length: 60 }, (_, i) => "math-f3-c" + chapter + "-" + lang + "-f" + (i + 1)),
        );
        expect(new Set(cards.map(c => c.id)).size).toBe(60);
      }
    }
  });
  it("splits every chapter into 12 Concept, 32 Practice and 16 Challenge", () => {
    for (const chapter of MATH_F3_CHAPTERS) {
      const cards = buildMathF3Flashcards(chapter, "dlp");
      expect(cardsForReviewMode(cards, "concept")).toHaveLength(12);
      expect(cardsForReviewMode(cards, "practice")).toHaveLength(32);
      expect(cardsForReviewMode(cards, "challenge")).toHaveLength(16);
    }
  });
  it("preserves content and BM/DLP structural alignment", () => {
    for (const chapter of MATH_F3_CHAPTERS) {
      const bm = buildMathF3Flashcards(chapter, "bm");
      const dlp = buildMathF3Flashcards(chapter, "dlp");
      for (let i = 0; i < 60; i++) {
        expect(bm[i].reviewMode).toBe(dlp[i].reviewMode);
        expect(bm[i].structured?.prompt).toBeTruthy();
        expect(dlp[i].structured?.prompt).toBeTruthy();
        expect(bm[i].structured?.answer?.[0]?.[0]).toBeTruthy();
        expect(dlp[i].structured?.answer?.[0]?.[0]).toBeTruthy();
      }
    }
  });
});
