import { describe, expect, it } from "vitest";
import { MATH_F2_C3_BANK } from "./flashcard-bank";
import { mathF2C3FlashcardsBM } from "./flashcards-bm";
import { mathF2C3FlashcardsDLP } from "./flashcards-dlp";

describe("Form 2 Maths Chapter 3 flashcards", () => {
  it("keeps 60 stable card IDs for each language", () => {
    for (const [lang, deck] of [["dlp", mathF2C3FlashcardsDLP], ["bm", mathF2C3FlashcardsBM]] as const) {
      expect(deck).toHaveLength(60);
      expect(new Set(deck.map(card => card.id)).size).toBe(60);
      deck.forEach((card, i) => expect(card.id).toBe(`math-f2-c3-${lang}-f${i + 1}`));
    }
  });
  it("combines all three subtopics in each review mode", () => {
    expect(MATH_F2_C3_BANK.filter(card => card.mode === "concept")).toHaveLength(12);
    expect(MATH_F2_C3_BANK.filter(card => card.mode === "practice")).toHaveLength(33);
    expect(MATH_F2_C3_BANK.filter(card => card.mode === "challenge")).toHaveLength(15);
    for (const mode of ["concept", "practice", "challenge"] as const) {
      expect(new Set(MATH_F2_C3_BANK.filter(card => card.mode === mode).map(card => card.subtopic))).toEqual(new Set(["3.1", "3.2", "3.3"]));
    }
  });
  it("pairs DLP and BM and provides nonempty worked answers", () => {
    mathF2C3FlashcardsDLP.forEach((card, i) => {
      const bm = mathF2C3FlashcardsBM[i];
      expect(card.subtopic).toBe(bm.subtopic);
      expect(card.reviewMode).toBe(bm.reviewMode);
      expect(card.structured?.answer[0]?.[0]).toBeTruthy();
      expect(bm.structured?.answer[0]?.[0]).toBeTruthy();
    });
  });
});
