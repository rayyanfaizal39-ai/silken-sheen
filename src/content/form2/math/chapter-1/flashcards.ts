import type { Flashcard } from "@/data/content";
import { structuredBack, structuredFront } from "@/features/flashcards/structuredFlashcard";
import { MATH_F2_C1_FLASHCARD_BANK } from "./flashcard-bank";

/**
 * Builds one language's Chapter 1 deck from the bilingual bank. `front` and
 * `back` stay plain text (search, audits, screen-reader fallbacks); the
 * structured question, parts, visuals and worked solution travel alongside.
 */
export function buildMathF2C1Flashcards(lang: "dlp" | "bm"): Flashcard[] {
  return MATH_F2_C1_FLASHCARD_BANK.map((entry, index) => {
    const side = entry[lang];
    const structured = {
      prompt: side.prompt,
      parts: side.parts,
      visuals: entry.visuals,
      answer: side.answer,
      answerVisuals: entry.answerVisuals,
      note: side.note,
    };
    return {
      id: `math-f2-c1-${lang}-f${index + 1}`,
      subjectId: "math",
      form: "Form 2",
      chapter: "Chapter 1",
      lang,
      front: structuredFront(structured),
      back: structuredBack(structured),
      subtopic: entry.subtopic,
      reviewMode: entry.mode,
      structured,
    };
  });
}
