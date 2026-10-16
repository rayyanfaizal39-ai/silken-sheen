import type { Flashcard } from "@/data/content";
import { structuredBack, structuredFront } from "@/features/flashcards/structuredFlashcard";
import { MATH_F2_C3_BANK } from "./flashcard-bank";

/** Keep historical progress/favourite IDs while upgrading to structured review cards. */
export function buildMathF2C3Flashcards(lang: "dlp" | "bm"): Flashcard[] {
  return MATH_F2_C3_BANK.map((entry, index) => {
    const side = entry[lang];
    const structured = { prompt: side.prompt, answer: side.answer };
    return {
      id: `math-f2-c3-${lang}-f${index + 1}`,
      subjectId: "math",
      form: "Form 2",
      chapter: "Chapter 3",
      lang,
      front: structuredFront(structured),
      back: structuredBack(structured),
      subtopic: entry.subtopic,
      reviewMode: entry.mode,
      structured,
    };
  });
}
