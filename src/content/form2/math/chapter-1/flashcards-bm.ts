import type { Flashcard } from "@/data/content";
import { buildMathF2C1Flashcards } from "./flashcards";

// Matematik Tingkatan 2 Bab 1: 1.1 Corak, 1.2 Jujukan, 1.3 Corak dan Jujukan.
// Dibina daripada bank dwibahasa yang sama (flashcard-bank.ts). ID kekal
// `math-f2-c1-bm-f1` … `f60` supaya kemajuan dan kegemaran sedia ada kekal.
export const mathF2C1FlashcardsBM: Flashcard[] = buildMathF2C1Flashcards("bm");
