import { describe, expect, it } from "vitest";
import { MATH_F2_C13_BANK } from "./flashcard-bank";
import { mathF2C13FlashcardsDLP } from "./flashcards-dlp";
import { mathF2C13FlashcardsBM } from "./flashcards-bm";

describe("Form 2 Maths Chapter 13 structured bilingual flashcards", () => {
 it("keeps stable existing identifiers in both languages", () => {
  for (const [lang,deck] of [["dlp",mathF2C13FlashcardsDLP],["bm",mathF2C13FlashcardsBM]] as const) {
   expect(deck).toHaveLength(60);
   expect(new Set(deck.map(c=>c.id)).size).toBe(60);
   deck.forEach((card,i)=>expect(card.id).toBe(`math-f2-c13-${lang}-f${i+1}`));
  }
 });
 it("covers all four subtopics across the three review modes", () => {
  for (const [mode,count] of [["concept",12],["practice",32],["challenge",16]] as const) {
   const selected=MATH_F2_C13_BANK.filter(c=>c.mode===mode);
   expect(selected).toHaveLength(count);
   expect(new Set(selected.map(c=>c.subtopic))).toEqual(new Set(["13.1","13.2","13.3","13.4"]));
  }
 });
 it("keeps worked answers, shared visual data and three challenge parts", () => {
  mathF2C13FlashcardsDLP.forEach((card,i)=>{
   const bm=mathF2C13FlashcardsBM[i];
   expect(card.subtopic).toBe(bm.subtopic);
   expect(card.reviewMode).toBe(bm.reviewMode);
   expect(card.structured?.visuals).toEqual(bm.structured?.visuals);
   expect(card.structured?.answer?.length).toBeGreaterThan(0);
   if(card.reviewMode==="challenge"){
    expect(card.structured?.parts).toHaveLength(3);
    expect(card.structured?.answer).toHaveLength(3);
    expect(bm.structured?.parts).toHaveLength(3);
    expect(bm.structured?.answer).toHaveLength(3);
   }
  });
 });
});
