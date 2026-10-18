import { describe, expect, it } from "vitest";
import { buildMathF1C9Flashcards, C9_CHALLENGES } from "./flashcards";
import { cardsForReviewMode } from "@/features/flashcards/structuredFlashcard";

describe("Form 1 Maths Chapter 9 — Basic Polygons", () => {
 it("preserves all 61 existing IDs in each language", () => {
  const categories=[["concepts",18],["operations",17],["facts",13],["practice",13]] as const;
  for(const lang of ["bm","dlp"] as const) {
   const deck=buildMathF1C9Flashcards(lang);
   const ids=categories.flatMap(([category,count])=>Array.from({length:count},(_,i)=>`math-f1-c9-${lang}-${category}-${i+1}`));
   expect(deck.map(card=>card.id)).toEqual(ids);
  }
 });
 it("has 12 Concept, 33 Practice and 16 Challenge cards", () => {
  const deck=buildMathF1C9Flashcards("dlp");
  expect(deck).toHaveLength(61);
  expect(cardsForReviewMode(deck,"concept")).toHaveLength(12);
  expect(cardsForReviewMode(deck,"practice")).toHaveLength(33);
  expect(cardsForReviewMode(deck,"challenge")).toHaveLength(16);
 });
 it("aligns all three Challenge parts and answers across BM and DLP", () => {
  const english=buildMathF1C9Flashcards("dlp"),malay=buildMathF1C9Flashcards("bm");
  expect(C9_CHALLENGES).toHaveLength(16);
  english.forEach((card,i)=>{
   expect(card.reviewMode).toBe(malay[i].reviewMode);
   expect(card.subtopic).toBe(malay[i].subtopic);
   if(card.reviewMode==="challenge"){
    expect(card.structured?.parts).toHaveLength(3);
    expect(card.structured?.answer).toHaveLength(3);
    expect(malay[i].structured?.parts).toHaveLength(3);
    expect(malay[i].structured?.answer).toHaveLength(3);
   }
  });
 });
});
