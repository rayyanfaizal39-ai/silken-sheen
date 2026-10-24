import {describe,it,expect} from "vitest";
import {buildMathF1C7Flashcards,C7_CHALLENGES} from "./flashcards";
import {cardsForReviewMode} from "@/features/flashcards/structuredFlashcard";
describe("Form 1 Maths Chapter 7 linear inequalities",()=>{
 it("preserves all 60 legacy card IDs in BM and DLP",()=>{
  const categories=[["concepts",18],["operations",17],["facts",12],["practice",13]] as const;
  for(const lang of ["bm","dlp"] as const){
   const deck=buildMathF1C7Flashcards(lang);
   const ids=categories.flatMap(([category,count])=>Array.from({length:count},(_,i)=>`math-f1-c7-${lang}-${category}-${i+1}`));
   expect(deck.map(card=>card.id)).toEqual(ids);
  }
 });
 it("splits into 12 Concept, 32 Practice and 16 Challenge",()=>{
  const deck=buildMathF1C7Flashcards("dlp");
  expect(deck).toHaveLength(60);
  expect(cardsForReviewMode(deck,"concept")).toHaveLength(12);
  expect(cardsForReviewMode(deck,"practice")).toHaveLength(32);
  expect(cardsForReviewMode(deck,"challenge")).toHaveLength(16);
 });
 it("aligns BM and DLP three-part problems and avoids visually leaking solutions",()=>{
  const a=buildMathF1C7Flashcards("dlp"),b=buildMathF1C7Flashcards("bm");
  expect(C7_CHALLENGES).toHaveLength(16);
  for(let i=0;i<a.length;i++){
   expect(a[i].reviewMode).toBe(b[i].reviewMode);
   expect(a[i].subtopic).toBe(b[i].subtopic);
   if(a[i].reviewMode==="challenge"){
    expect(a[i].structured?.parts).toHaveLength(3);
    expect(b[i].structured?.parts).toHaveLength(3);
    expect(a[i].structured?.answer).toHaveLength(3);
    expect(b[i].structured?.answer).toHaveLength(3);
    expect(a[i].structured?.visuals).toBeUndefined();
   }
  }
 });
});
