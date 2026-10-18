import { describe, expect, it } from "vitest";
import { C3_CHALLENGES, buildMathF1C3Flashcards } from "./flashcards";
import { cardsForReviewMode } from "@/features/flashcards/structuredFlashcard";

describe("Form 1 Mathematics Chapter 3 structured reviews",()=>{
 it("preserves all legacy IDs per language",()=>{
  for(const lang of ["dlp","bm"] as const){
   const cards=buildMathF1C3Flashcards(lang);
   const expected=[...Array.from({length:30},(_,i)=>`math-f1-c3-${lang}-concepts-${i+1}`),...Array.from({length:15},(_,i)=>`math-f1-c3-${lang}-operations-${i+1}`),...Array.from({length:10},(_,i)=>`math-f1-c3-${lang}-facts-${i+1}`),...Array.from({length:5},(_,i)=>`math-f1-c3-${lang}-practice-${i+1}`)];
   expect(cards.map(c=>c.id)).toEqual(expected);
  }
 });
 it("has Concept 12, Practice 32, Challenge 16",()=>{
  const cards=buildMathF1C3Flashcards("dlp");
  expect(cards).toHaveLength(60);
  expect(cardsForReviewMode(cards,"concept")).toHaveLength(12);
  expect(cardsForReviewMode(cards,"practice")).toHaveLength(32);
  expect(cardsForReviewMode(cards,"challenge")).toHaveLength(16);
 });
 it("keeps bilingual three-part challenges aligned without leaking answers in visuals",()=>{
  const a=buildMathF1C3Flashcards("dlp"),b=buildMathF1C3Flashcards("bm");
  expect(C3_CHALLENGES).toHaveLength(16);
  a.forEach((c,i)=>{
   expect(c.reviewMode).toBe(b[i].reviewMode);
   expect(c.structured?.visuals).toEqual(b[i].structured?.visuals);
   if(c.reviewMode==="challenge"){
    expect(c.structured?.parts).toHaveLength(3);
    expect(b[i].structured?.parts).toHaveLength(3);
    expect(c.structured?.answer).toHaveLength(3);
    expect(b[i].structured?.answer).toHaveLength(3);
   }
  });
 });
});
