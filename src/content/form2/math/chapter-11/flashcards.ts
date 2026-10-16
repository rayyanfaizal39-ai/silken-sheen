import type { Flashcard } from "@/data/content";
import { structuredFront, structuredBack } from "@/features/flashcards/structuredFlashcard";
import { MATH_F2_C11_BANK } from "./flashcard-bank";

export function buildMathF2C11Flashcards(lang: "dlp" | "bm"): Flashcard[] {
  return MATH_F2_C11_BANK.map((entry, index) => {
    const structured = { ...entry[lang], visuals: entry.visuals };
    return {
      id: `math-f2-c11-${lang}-f${index + 1}`,
      subjectId: "math", form: "Form 2", chapter: "Chapter 11", lang,
      front: structuredFront(structured), back: structuredBack(structured),
      subtopic: entry.subtopic, reviewMode: entry.mode, structured,
    };
  });
}
