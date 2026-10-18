import { describe, expect, it } from "vitest";
import { buildMathF1C10Flashcards, C10_CHALLENGES } from "./flashcards";
import { cardsForReviewMode } from "@/features/flashcards/structuredFlashcard";
describe("Form 1 Maths Chapter 10 three review modes", () => {
 it("preserves all 59 existing IDs for each language", () => {
  const cats=["concepts","operations","facts","practice"] as const;
  const counts=[15,17,14,13];
  for(const lang of ["bm","dlp"] as const){
   const cards=buildMathF1C10Flashcards(lang);
   const ids=cats.flatMap((cat,j)=>Array.from({length:counts[j]},(_,i)=>`math-f1-c10-${lang}-${cat}-${i+1}`));
   expect(cards.map(card=>card.id)).toEqual(ids);
  }
 });
 it("has 12 Concept, 31 Practice and 16 Challenge cards", () => {
  const cards=buildMathF1C10Flashcards("dlp");
  expect(cards).toHaveLength(59);
  expect(cardsForReviewMode(cards,"concept")).toHaveLength(12);
  expect(cardsForReviewMode(cards,"practice")).toHaveLength(31);
  expect(cardsForReviewMode(cards,"challenge")).toHaveLength(16);
 });
 it("aligns three-part Challenges across BM and DLP", () => {
  const en=buildMathF1C10Flashcards("dlp"),bm=buildMathF1C10Flashcards("bm");
  expect(C10_CHALLENGES).toHaveLength(16);
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
