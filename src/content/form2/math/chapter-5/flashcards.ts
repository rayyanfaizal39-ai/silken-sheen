import type { Flashcard } from "@/data/content";
import { structuredBack, structuredFront } from "@/features/flashcards/structuredFlashcard";
import { MATH_F2_C5_BANK } from "./flashcard-bank";
import { MATH_F2_C5_VISUALS } from "./flashcard-visuals";

export function buildMathF2C5Flashcards(lang: "dlp" | "bm"): Flashcard[] {
  return MATH_F2_C5_BANK.map((entry, index) => {
    const side = entry[lang];
    const visual = MATH_F2_C5_VISUALS.get(index);
    const structured = {
      prompt: side.prompt,
      parts: side.parts,
      answer: side.answer,
      ...(visual ? { visuals: [visual] } : {}),
    };
    return {
      id: `math-f2-c5-${lang}-f${index + 1}`,
      subjectId: "math",
      form: "Form 2",
      chapter: "Chapter 5",
      lang,
      front: structuredFront(structured),
      back: structuredBack(structured),
      subtopic: entry.subtopic,
      reviewMode: entry.mode,
      structured,
    };
  });
}
