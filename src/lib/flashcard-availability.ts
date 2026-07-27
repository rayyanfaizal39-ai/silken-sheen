import { getChapter } from "@/content/registry";
import { flashcards, getItemChapterKey, type Flashcard, type Form } from "@/data/content";

import { normalizeChapterParam, normalizeFormParam, normalizeSubjectParam } from "./study-routing";

const SINGLE_SET_DECK_SIZE = 20;
const THREE_SET_DECK_SIZE = 60;

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

  return getFlashcardDeckCards(subjectId, form, chapterKey, language).length > 0;
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

  const registeredCards = getChapter(subjectId, chapterKey, language, form)?.flashcards ?? [];
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
  if (uniqueCards.length >= THREE_SET_DECK_SIZE) {
    return uniqueCards;
  }
  return uniqueCards.length === SINGLE_SET_DECK_SIZE ? uniqueCards : [];
}

export function splitFlashcardDeck(cards: Flashcard[]) {
  if (
    cards.length !== THREE_SET_DECK_SIZE ||
    new Set(cards.map((card) => card.id)).size !== THREE_SET_DECK_SIZE
  ) {
    return [];
  }
  return [
    cards.slice(0, SINGLE_SET_DECK_SIZE),
    cards.slice(SINGLE_SET_DECK_SIZE, SINGLE_SET_DECK_SIZE * 2),
    cards.slice(SINGLE_SET_DECK_SIZE * 2, THREE_SET_DECK_SIZE),
  ] as const;
}
