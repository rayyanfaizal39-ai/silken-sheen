import { describe, expect, it } from "vitest";
import { MATH_F2_C11_BANK } from "./flashcard-bank";
import { mathF2C11FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C11FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 11 transformations", () => {
  it("preserves all 60 existing IDs per language", () => {
    for (const [lang, deck] of [["dlp", mathF2C11FlashcardsDLP], ["bm", mathF2C11FlashcardsBM]] as const) {
      expect(deck).toHaveLength(60);
      expect(new Set(deck.map(c => c.id)).size).toBe(60);
      deck.forEach((card,i) => expect(card.id).toBe(`math-f2-c11-${lang}-f${i+1}`));
    }
  });
  it("combines four subtopics in 12 concept, 32 practice and 16 challenge cards", () => {
    for (const [mode, count] of [["concept",12],["practice",32],["challenge",16]] as const) {
      const entries = MATH_F2_C11_BANK.filter(c => c.mode === mode);
      expect(entries).toHaveLength(count);
      expect(new Set(entries.map(e => e.subtopic))).toEqual(new Set(["11.1","11.2","11.3","11.4"]));
    }
  });
  it("preserves parallel BM/DLP diagrams and multipart challenge solutions", () => {
    mathF2C11FlashcardsDLP.forEach((card,i) => {
      const bm = mathF2C11FlashcardsBM[i];
      expect(card.reviewMode).toBe(bm.reviewMode);
      expect(card.subtopic).toBe(bm.subtopic);
      expect(card.structured?.visuals).toEqual(bm.structured?.visuals);
      if (card.reviewMode === "challenge") {
        expect(card.structured?.parts).toHaveLength(3);
        expect(bm.structured?.parts).toHaveLength(3);
        expect(card.structured?.answer).toHaveLength(3);
        expect(bm.structured?.answer).toHaveLength(3);
      }
    });
  });
});
