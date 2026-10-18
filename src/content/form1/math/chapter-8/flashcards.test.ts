import {describe,it,expect} from "vitest";
import {buildMathF1C8Flashcards,C8_CHALLENGES} from "./flashcards";
import {cardsForReviewMode} from "@/features/flashcards/structuredFlashcard";
describe("Form 1 Maths Chapter 8 Lines and Angles",()=>{
 it("preserves all 63 legacy IDs in both languages",()=>{
  const counts=[["concepts",18],["operations",17],["facts",13],["practice",15]] as const;
  for(const lang of ["bm","dlp"] as const){
   const cards=buildMathF1C8Flashcards(lang);
   const expected=counts.flatMap(([category,count])=>Array.from({length:count},(_,i)=>`math-f1-c8-${lang}-${category}-${i+1}`));
   expect(cards.map(c=>c.id)).toEqual(expected);
  }
 });
 it("has exactly three review categories",()=>{
  const cards=buildMathF1C8Flashcards("dlp");
  expect(cards).toHaveLength(63);
  expect(cardsForReviewMode(cards,"concept")).toHaveLength(12);
  expect(cardsForReviewMode(cards,"practice")).toHaveLength(35);
  expect(cardsForReviewMode(cards,"challenge")).toHaveLength(16);
 });
 it("keeps BM and DLP three-part challenges aligned",()=>{
  const en=buildMathF1C8Flashcards("dlp"),bm=buildMathF1C8Flashcards("bm");
  expect(C8_CHALLENGES).toHaveLength(16);
  en.forEach((card,i)=>{
   expect(card.reviewMode).toBe(bm[i].reviewMode);
   expect(card.subtopic).toBe(bm[i].subtopic);
   if(card.reviewMode==="challenge"){
    expect(card.structured?.parts).toHaveLength(3);
    expect(bm[i].structured?.parts).toHaveLength(3);
    expect(card.structured?.answer).toHaveLength(3);
    expect(bm[i].structured?.answer).toHaveLength(3);
   }
  });
 });
});
