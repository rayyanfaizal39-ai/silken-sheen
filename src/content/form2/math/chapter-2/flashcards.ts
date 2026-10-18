import type { Flashcard } from "@/data/content";
import { structuredBack, structuredFront } from "@/features/flashcards/structuredFlashcard";
import { MATH_F2_C2_BANK } from "./flashcard-bank";

/** One shared bilingual bank; preserve the existing 60 progress/favourite IDs. */
export function buildMathF2C2Flashcards(lang: "dlp" | "bm"): Flashcard[] {
  return MATH_F2_C2_BANK.map((entry, index) => {
    const side = entry[lang];
    const structured = {
      prompt: side.prompt,
      parts: side.parts,
      answer: side.answer,
      visuals: entry.visuals,
    };
    return {
      id: `math-f2-c2-${lang}-f${index + 1}`,
      subjectId: "math",
      form: "Form 2",
      chapter: "Chapter 2",
      lang,
      front: structuredFront(structured),
      back: structuredBack(structured),
      subtopic: entry.subtopic,
      reviewMode: entry.mode,
      structured,
    };
  });
}
