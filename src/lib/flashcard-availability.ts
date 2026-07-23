import { getChapter } from "@/content/registry";
import { flashcards, getItemChapterKey, type Flashcard, type Form } from "@/data/content";

import {
  normalizeChapterParam,
  normalizeFormParam,
  normalizeSubjectParam,
} from "./study-routing";

export function hasFlashcardDeck(
  subjectValue: unknown,
  formValue: unknown,
  chapterValue: unknown,
  language?: "bm" | "dlp",
) {
  const subjectId = normalizeSubjectParam(subjectValue);
  const form = normalizeFormParam(formValue) as Form;
  const chapterKey = normalizeChapterParam(chapterValue);

  if (!subjectId || !chapterKey) return false;

  return getFlashcardDeckCards(subjectId, form, chapterKey, language).length === 60;
}

export function getFlashcardDeckCards(
  subjectValue: unknown,
  formValue: unknown,
  chapterValue: unknown,
  language?: "bm" | "dlp",
): Flashcard[] {
  const subjectId = normalizeSubjectParam(subjectValue);
  const form = normalizeFormParam(formValue) as Form;
  const chapterKey = normalizeChapterParam(chapterValue);

  if (!subjectId || !chapterKey) return [];

  const registeredCards =
    getChapter(subjectId, chapterKey, language, form)?.flashcards ?? [];
  const legacyCards = flashcards.filter((card) => {
    if (card.subjectId !== subjectId || card.form !== form) return false;
    if (normalizeChapterParam(getItemChapterKey(card)) !== chapterKey) return false;
    if (language && card.lang && card.lang !== language) return false;
    return true;
  });

  const source = registeredCards.length >= legacyCards.length ? registeredCards : legacyCards;
  return standardizeFlashcardDeck(source);
}

export function standardizeFlashcardDeck(cards: Flashcard[]) {
  const uniqueCards = [...new Map(cards.map((card) => [card.id, card])).values()];
  return uniqueCards.length >= 60 ? uniqueCards.slice(0, 60) : [];
}

export function splitFlashcardDeck(cards: Flashcard[]) {
  if (cards.length !== 60 || new Set(cards.map((card) => card.id)).size !== 60) return [];
  return [cards.slice(0, 20), cards.slice(20, 40), cards.slice(40, 60)] as const;
}
