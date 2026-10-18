import {describe,it,expect} from "vitest";
import {buildMathF1C6Flashcards,C6_CHALLENGES} from "./flashcards";
import {cardsForReviewMode} from "@/features/flashcards/structuredFlashcard";
describe("Form 1 Maths Chapter 6 combined linear equation reviews",()=>{
 it("preserves 60 existing IDs per language",()=>{
  for(const lang of ["bm","dlp"] as const){
   const cards=buildMathF1C6Flashcards(lang);
   const ids=["concepts","operations","facts","practice"].flatMap(category=>Array.from({length:15},(_,i)=>`math-f1-c6-${lang}-${category}-${i+1}`));
   expect(cards.map(c=>c.id)).toEqual(ids);
  }
 });
 it("provides 12 Concept 32 Practice and 16 Challenge cards",()=>{
  const cards=buildMathF1C6Flashcards("dlp");
  expect(cards).toHaveLength(60);
  expect(cardsForReviewMode(cards,"concept")).toHaveLength(12);
  expect(cardsForReviewMode(cards,"practice")).toHaveLength(32);
  expect(cardsForReviewMode(cards,"challenge")).toHaveLength(16);
 });
 it("keeps bilingual three-part Challenges aligned",()=>{
  const en=buildMathF1C6Flashcards("dlp"),bm=buildMathF1C6Flashcards("bm");
  expect(C6_CHALLENGES).toHaveLength(16);
  en.forEach((c,i)=>{
   expect(c.reviewMode).toBe(bm[i].reviewMode);
   expect(c.subtopic).toBe(bm[i].subtopic);
   if(c.reviewMode==="challenge"){
    expect(c.structured?.parts).toHaveLength(3);
    expect(bm[i].structured?.parts).toHaveLength(3);
    expect(c.structured?.answer).toHaveLength(3);
    expect(bm[i].structured?.answer).toHaveLength(3);
   }
  });
 });
});
