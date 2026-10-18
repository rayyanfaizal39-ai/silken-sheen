import {describe,it,expect} from "vitest";
import {buildMathF1C4Flashcards,C4_CHALLENGES} from "./flashcards";
import {cardsForReviewMode} from "@/features/flashcards/structuredFlashcard";
describe("Form 1 Maths Chapter 4 three reviews",()=>{
 it("preserves 60 legacy IDs for BM and DLP",()=>{
  for(const lang of ["bm","dlp"] as const){
   const cards=buildMathF1C4Flashcards(lang);
   const expected=["concepts","operations","facts","practice"].flatMap(category=>Array.from({length:15},(_,i)=>`math-f1-c4-${lang}-${category}-${i+1}`));
   expect(cards.map(c=>c.id)).toEqual(expected);
  }
 });
 it("provides exactly 12 Concept, 32 Practice, 16 Challenge cards",()=>{
  const cards=buildMathF1C4Flashcards("dlp");
  expect(cards).toHaveLength(60);
  expect(cardsForReviewMode(cards,"concept")).toHaveLength(12);
  expect(cardsForReviewMode(cards,"practice")).toHaveLength(32);
  expect(cardsForReviewMode(cards,"challenge")).toHaveLength(16);
 });
 it("aligns bilingual Challenge problems without answers embedded in diagrams",()=>{
  const en=buildMathF1C4Flashcards("dlp"),bm=buildMathF1C4Flashcards("bm");
  expect(C4_CHALLENGES).toHaveLength(16);
  en.forEach((card,i)=>{
   expect(card.reviewMode).toBe(bm[i].reviewMode);
   expect(card.structured?.visuals).toEqual(bm[i].structured?.visuals);
   if(card.reviewMode==="challenge"){
    expect(card.structured?.parts).toHaveLength(3);
    expect(bm[i].structured?.parts).toHaveLength(3);
    expect(card.structured?.answer).toHaveLength(3);
    expect(bm[i].structured?.answer).toHaveLength(3);
   }
  });
 });
});
