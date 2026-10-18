import { describe, it, expect } from "vitest";
import { buildMathF1C2Flashcards, C2_CHALLENGES } from "./flashcards";
import { cardsForReviewMode } from "@/features/flashcards/structuredFlashcard";

describe("Form 1 Maths Chapter 2 structured bilingual flashcards",()=>{
  it("preserves all 60 legacy IDs per language",()=>{
    for(const lang of ["bm","dlp"] as const){
      const cards=buildMathF1C2Flashcards(lang);
      const ids=[
        ...Array.from({length:30},(_,i)=>`math-f1-c2-${lang}-concepts-${i+1}`),
        ...Array.from({length:15},(_,i)=>`math-f1-c2-${lang}-operations-${i+1}`),
        ...Array.from({length:10},(_,i)=>`math-f1-c2-${lang}-facts-${i+1}`),
        ...Array.from({length:5},(_,i)=>`math-f1-c2-${lang}-practice-${i+1}`),
      ];
      expect(cards.map(c=>c.id)).toEqual(ids);
    }
  });
  it("has exactly three review modes, covering every card once",()=>{
    const cards=buildMathF1C2Flashcards("dlp");
    expect(cards).toHaveLength(60);
    expect(cardsForReviewMode(cards,"concept")).toHaveLength(12);
    expect(cardsForReviewMode(cards,"practice")).toHaveLength(32);
    expect(cardsForReviewMode(cards,"challenge")).toHaveLength(16);
  });
  it("aligns BM and DLP Challenge parts and answers",()=>{
    const a=buildMathF1C2Flashcards("dlp"),b=buildMathF1C2Flashcards("bm");
    expect(C2_CHALLENGES).toHaveLength(16);
    for(let i=0;i<60;i++){
      expect(a[i].reviewMode).toBe(b[i].reviewMode);
      expect(a[i].subtopic).toBe(b[i].subtopic);
      expect(a[i].structured?.visuals).toEqual(b[i].structured?.visuals);
      if(a[i].reviewMode==="challenge"){
        expect(a[i].structured?.parts).toHaveLength(3);
        expect(b[i].structured?.parts).toHaveLength(3);
        expect(a[i].structured?.answer).toHaveLength(3);
        expect(b[i].structured?.answer).toHaveLength(3);
      }
    }
  });
});
