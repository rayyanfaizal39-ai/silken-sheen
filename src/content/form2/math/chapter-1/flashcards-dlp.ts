import type { Flashcard } from "@/data/content";
import { buildMathF2C1Flashcards } from "./flashcards";

// Form 2 Maths Chapter 1: 1.1 Patterns, 1.2 Sequences, 1.3 Patterns and Sequences.
// Built from the shared bilingual bank (flashcard-bank.ts). IDs stay
// `math-f2-c1-dlp-f1` … `f60` so existing progress and favourites carry over.
export const mathF2C1FlashcardsDLP: Flashcard[] = buildMathF2C1Flashcards("dlp");
