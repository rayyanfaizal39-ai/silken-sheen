import type { Flashcard } from "@/data/content";
import { structuredFront, structuredBack, type StructuredFlashcard } from "@/features/flashcards/structuredFlashcard";
import { mathF3C1FlashcardsBM } from "@/content/form3/math/chapter-1/flashcards-bm";
import { mathF3C1FlashcardsDLP } from "@/content/form3/math/chapter-1/flashcards-dlp";
import { mathF3C2FlashcardsBM } from "@/content/form3/math/chapter-2/flashcards-bm";
import { mathF3C2FlashcardsDLP } from "@/content/form3/math/chapter-2/flashcards-dlp";
import { mathF3C3FlashcardsBM } from "@/content/form3/math/chapter-3/flashcards-bm";
import { mathF3C3FlashcardsDLP } from "@/content/form3/math/chapter-3/flashcards-dlp";
import { mathF3C4FlashcardsBM } from "@/content/form3/math/chapter-4/flashcards-bm";
import { mathF3C4FlashcardsDLP } from "@/content/form3/math/chapter-4/flashcards-dlp";
import { mathF3C5FlashcardsBM } from "@/content/form3/math/chapter-5/flashcards-bm";
import { mathF3C5FlashcardsDLP } from "@/content/form3/math/chapter-5/flashcards-dlp";
import { mathF3C6FlashcardsBM } from "@/content/form3/math/chapter-6/flashcards-bm";
import { mathF3C6FlashcardsDLP } from "@/content/form3/math/chapter-6/flashcards-dlp";
import { mathF3C7FlashcardsBM } from "@/content/form3/math/chapter-7/flashcards-bm";
import { mathF3C7FlashcardsDLP } from "@/content/form3/math/chapter-7/flashcards-dlp";
import { mathF3C8FlashcardsBM } from "@/content/form3/math/chapter-8/flashcards-bm";
import { mathF3C8FlashcardsDLP } from "@/content/form3/math/chapter-8/flashcards-dlp";
import { mathF3C9FlashcardsBM } from "@/content/form3/math/chapter-9/flashcards-bm";
import { mathF3C9FlashcardsDLP } from "@/content/form3/math/chapter-9/flashcards-dlp";

type Lang = "bm" | "dlp";
const BANKS: Record<string, Record<Lang, Flashcard[]>> = {
  "Chapter 1": { bm: mathF3C1FlashcardsBM, dlp: mathF3C1FlashcardsDLP },
  "Chapter 2": { bm: mathF3C2FlashcardsBM, dlp: mathF3C2FlashcardsDLP },
  "Chapter 3": { bm: mathF3C3FlashcardsBM, dlp: mathF3C3FlashcardsDLP },
  "Chapter 4": { bm: mathF3C4FlashcardsBM, dlp: mathF3C4FlashcardsDLP },
  "Chapter 5": { bm: mathF3C5FlashcardsBM, dlp: mathF3C5FlashcardsDLP },
  "Chapter 6": { bm: mathF3C6FlashcardsBM, dlp: mathF3C6FlashcardsDLP },
  "Chapter 7": { bm: mathF3C7FlashcardsBM, dlp: mathF3C7FlashcardsDLP },
  "Chapter 8": { bm: mathF3C8FlashcardsBM, dlp: mathF3C8FlashcardsDLP },
  "Chapter 9": { bm: mathF3C9FlashcardsBM, dlp: mathF3C9FlashcardsDLP },
};

/** Reuse original cards and IDs until audited replacements are ready.
 * Each 60-card bank becomes one unified chapter deck with three review modes.
 */
export function buildMathF3Flashcards(chapter: string, lang: Lang): Flashcard[] {
  const originals = BANKS[chapter]?.[lang] ?? [];
  return originals.map((card, index) => {
    const mode = index < 12 ? "concept" : index < 44 ? "practice" : "challenge";
    const structured: StructuredFlashcard = {
      prompt: card.front,
      answer: [[card.back]],
    };
    return {
      ...card,
      reviewMode: mode,
      structured,
      front: structuredFront(structured),
      back: structuredBack(structured),
    };
  });
}
export const MATH_F3_CHAPTERS = Object.keys(BANKS);
