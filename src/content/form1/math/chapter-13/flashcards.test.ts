import { describe, expect, it } from "vitest";
import { buildMathF1C13Flashcards, C13_CHALLENGES } from "./flashcards";
import { cardsForReviewMode } from "@/features/flashcards/structuredFlashcard";
describe("Form 1 Maths Chapter 13 three review modes", () => {
 it("preserves all 57 existing IDs for each language", () => {
  const cats=["concepts","operations","facts","practice"] as const;
  const counts=[15,16,14,12];
  for(const lang of ["bm","dlp"] as const){
   const cards=buildMathF1C13Flashcards(lang);
   const ids=cats.flatMap((cat,j)=>Array.from({length:counts[j]},(_,i)=>`math-f1-c13-${lang}-${cat}-${i+1}`));
   expect(cards.map(card=>card.id)).toEqual(ids);
  }
 });
 it("has 12 Concept, 29 Practice and 16 Challenge cards", () => {
  const cards=buildMathF1C13Flashcards("dlp");
  expect(cards).toHaveLength(57);
  expect(cardsForReviewMode(cards,"concept")).toHaveLength(12);
  expect(cardsForReviewMode(cards,"practice")).toHaveLength(29);
  expect(cardsForReviewMode(cards,"challenge")).toHaveLength(16);
 });
 it("aligns three-part Challenges across BM and DLP", () => {
  const en=buildMathF1C13Flashcards("dlp"),bm=buildMathF1C13Flashcards("bm");
  expect(C13_CHALLENGES).toHaveLength(16);
  en.forEach((card,i)=>{
   expect(card.reviewMode).toBe(bm[i].reviewMode);
   if(card.reviewMode==="challenge"){
    expect(card.structured?.parts).toHaveLength(3);
    expect(bm[i].structured?.parts).toHaveLength(3);
    expect(card.structured?.answer).toHaveLength(3);
    expect(bm[i].structured?.answer).toHaveLength(3);
    expect(card.structured?.visuals).toBeUndefined();
   }
  });
 });
});
