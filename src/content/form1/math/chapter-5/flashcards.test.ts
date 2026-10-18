import {describe,it,expect} from "vitest";
import {buildMathF1C5Flashcards,C5_CHALLENGES} from "./flashcards";
import {cardsForReviewMode} from "@/features/flashcards/structuredFlashcard";
describe("Form 1 Maths Chapter 5 algebra review modes",()=>{
 it("retains all original BM and DLP progress IDs",()=>{
  for(const lang of ["bm","dlp"] as const){
   const cards=buildMathF1C5Flashcards(lang);
   const ids=["concepts","operations","facts","practice"].flatMap(category=>Array.from({length:15},(_,i)=>`math-f1-c5-${lang}-${category}-${i+1}`));
   expect(cards.map(c=>c.id)).toEqual(ids);
  }
 });
 it("shows exactly three combined modes",()=>{
  const cards=buildMathF1C5Flashcards("dlp");
  expect(cards).toHaveLength(60);
  expect(cardsForReviewMode(cards,"concept")).toHaveLength(12);
  expect(cardsForReviewMode(cards,"practice")).toHaveLength(32);
  expect(cardsForReviewMode(cards,"challenge")).toHaveLength(16);
 });
 it("has aligned three-part BM and DLP challenge solutions",()=>{
  const a=buildMathF1C5Flashcards("dlp"),b=buildMathF1C5Flashcards("bm");
  expect(C5_CHALLENGES).toHaveLength(16);
  a.forEach((card,i)=>{
   expect(card.reviewMode).toBe(b[i].reviewMode);
   expect(card.subtopic).toBe(b[i].subtopic);
   if(card.reviewMode==="challenge"){
    expect(card.structured?.parts).toHaveLength(3);
    expect(b[i].structured?.parts).toHaveLength(3);
    expect(card.structured?.answer).toHaveLength(3);
    expect(b[i].structured?.answer).toHaveLength(3);
   }
  });
 });
});
