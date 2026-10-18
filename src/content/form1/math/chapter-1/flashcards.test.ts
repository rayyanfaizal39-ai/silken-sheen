import { describe, expect, it } from "vitest";
import { MATH_F1_C1_BANK } from "./flashcard-bank";
import { buildMathF1C1Flashcards } from "./flashcards";
import { cardsForReviewMode } from "@/features/flashcards/structuredFlashcard";

describe("Form 1 Maths Chapter 1 combined rational-number reviews", () => {
  it("keeps the 68 previous IDs in each language without duplicates", () => {
    for (const lang of ["bm", "dlp"] as const) {
      const cards = buildMathF1C1Flashcards(lang);
      expect(cards).toHaveLength(68);
      const expected = [
        ...Array.from({length:33},(_,i)=>`math-f1-c1-${lang}-concepts-${i+1}`),
        ...Array.from({length:18},(_,i)=>`math-f1-c1-${lang}-operations-${i+1}`),
        ...Array.from({length:9},(_,i)=>`math-f1-c1-${lang}-facts-${i+1}`),
        ...Array.from({length:8},(_,i)=>`math-f1-c1-${lang}-practice-${i+1}`),
      ];
      expect(cards.map(c=>c.id)).toEqual(expected);
    }
  });
  it("combines four rational-number subtopics into three review modes", () => {
    for (const lang of ["bm", "dlp"] as const) {
      const cards=buildMathF1C1Flashcards(lang);
      for (const [mode,count] of [["concept",12],["practice",40],["challenge",16]] as const) {
        expect(cardsForReviewMode(cards,mode)).toHaveLength(count);
      }
    }
    expect(new Set(MATH_F1_C1_BANK.map(c=>c.subtopic))).toEqual(new Set(["1.1","1.2","1.3","1.4"]));
  });
  it("keeps BM and DLP aligned with identical visual data",()=>{
    const english=buildMathF1C1Flashcards("dlp"), malay=buildMathF1C1Flashcards("bm");
    english.forEach((e,i)=>{
      expect(e.reviewMode).toBe(malay[i].reviewMode);
      expect(e.subtopic).toBe(malay[i].subtopic);
      expect(e.structured?.visuals).toEqual(malay[i].structured?.visuals);
      expect(e.structured?.answer.length).toBeGreaterThan(0);
      if(e.reviewMode==="challenge"){
        expect(e.structured?.parts).toHaveLength(3);
        expect(e.structured?.answer).toHaveLength(3);
        expect(malay[i].structured?.parts).toHaveLength(3);
      }
    });
  });
  it("does not highlight correct answers in number-line visual data",()=>{
    const diagrams=MATH_F1_C1_BANK.flatMap(c=>c.visuals??[]).filter(v=>v.kind==="number-line");
    expect(diagrams.length).toBeGreaterThan(0);
    for(const diagram of diagrams) {
      if(diagram.kind!=="number-line")continue;
      for(const point of diagram.points??[]){
        expect(point.value).toBeGreaterThanOrEqual(diagram.min);
        expect(point.value).toBeLessThanOrEqual(diagram.max);
      }
    }
  });
});
