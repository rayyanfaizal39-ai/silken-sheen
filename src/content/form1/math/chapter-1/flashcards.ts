import type { Flashcard } from "@/data/content";
import { structuredBack, structuredFront } from "@/features/flashcards/structuredFlashcard";
import { MATH_F1_C1_BANK } from "./flashcard-bank";

/** Retain legacy category IDs even though study now uses three review modes. */
function legacyId(index: number, lang: "bm" | "dlp") {
  const slots = [
    ["concepts", 33],
    ["operations", 18],
    ["facts", 9],
    ["practice", 8],
  ] as const;
  let offset = index;
  for (const [category, size] of slots) {
    if (offset < size) return `math-f1-c1-${lang}-${category}-${offset + 1}`;
    offset -= size;
  }
  throw new Error("Form 1 Chapter 1 card count exceeds preserved IDs");
}

export function buildMathF1C1Flashcards(lang: "bm" | "dlp"): Flashcard[] {
  return MATH_F1_C1_BANK.map((entry, index) => {
    const structured = { ...entry[lang], visuals: entry.visuals };
    return {
      id: legacyId(index, lang),
      subjectId: "math",
      form: "Form 1",
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
