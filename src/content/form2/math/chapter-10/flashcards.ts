import type { Flashcard } from "@/data/content";
import { structuredFront, structuredBack } from "@/features/flashcards/structuredFlashcard";
import { MATH_F2_C10_BANK } from "./flashcard-bank";

export function buildMathF2C10Flashcards(lang: "dlp" | "bm"): Flashcard[] {
  return MATH_F2_C10_BANK.map((entry, index) => {
    const structured = { ...entry[lang], visuals: entry.visuals };
    return {
      id: `math-f2-c10-${lang}-f${index + 1}`,
      subjectId: "math", form: "Form 2", chapter: "Chapter 10", lang,
      front: structuredFront(structured), back: structuredBack(structured),
      subtopic: entry.subtopic, reviewMode: entry.mode, structured,
    };
  });
}
