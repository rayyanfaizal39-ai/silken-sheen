import type { Flashcard } from "@/data/content";
import { structuredBack, structuredFront } from "@/features/flashcards/structuredFlashcard";
import { MATH_F2_C6_BANK } from "./flashcard-bank";

export function buildMathF2C6Flashcards(lang: "dlp" | "bm"): Flashcard[] {
  return MATH_F2_C6_BANK.map((entry, index) => {
    const side = entry[lang];
    const structured = { ...side, visuals: entry.visuals };
    return {
      id: `math-f2-c6-${lang}-f${index + 1}`,
      subjectId: "math",
      form: "Form 2",
      chapter: "Chapter 6",
      lang,
      front: structuredFront(structured),
      back: structuredBack(structured),
      subtopic: entry.subtopic,
      reviewMode: entry.mode,
      structured,
    };
  });
}
