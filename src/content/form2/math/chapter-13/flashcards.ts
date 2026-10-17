import type { Flashcard } from "@/data/content";
import { structuredBack, structuredFront } from "@/features/flashcards/structuredFlashcard";
import { MATH_F2_C13_BANK } from "./flashcard-bank";
export function buildMathF2C13Flashcards(lang: "dlp" | "bm"): Flashcard[] {
 return MATH_F2_C13_BANK.map((entry,index) => {
  const structured = {...entry[lang],visuals:entry.visuals};
  return {id:`math-f2-c13-${lang}-f${index+1}`,subjectId:"math",form:"Form 2",chapter:"Chapter 13",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:entry.subtopic,reviewMode:entry.mode,structured};
 });
}
