import type { ContentDataModule, ContentRegistryModule } from "@/hooks/use-content-registry";
import type { Flashcard, Form } from "@/data/content";

import { normalizeChapterParam, normalizeFormParam, normalizeSubjectParam } from "./study-routing";

const SINGLE_SET_DECK_SIZE = 20;
const THREE_SET_DECK_SIZE = 60;

// registry/dataModule are passed in (loaded client-side via useContentRegistry
// / useContentDataModule) rather than imported statically — a static import
// here would pull the full multi-MB curriculum registry + legacy content
// barrel into the SSR bundle for every route that renders flashcard chips.
export function hasFlashcardDeck(
  subjectValue: unknown,
  formValue: unknown,
  chapterValue: unknown,
  language: "bm" | "dlp" | undefined,
  registry: ContentRegistryModule | null,
  dataModule: ContentDataModule | null,
) {
  const subjectId = normalizeSubjectParam(subjectValue);
  const form = normalizeFormParam(formValue) as Form;
  const chapterKey = normalizeChapterParam(chapterValue);

  if (!subjectId || !chapterKey) return false;

  return (
    getFlashcardDeckCards(subjectId, form, chapterKey, language, registry, dataModule).length > 0
  );
}

export function getFlashcardDeckCards(
  subjectValue: unknown,
  formValue: unknown,
  chapterValue: unknown,
  language: "bm" | "dlp" | undefined,
  registry: ContentRegistryModule | null,
  dataModule: ContentDataModule | null,
): Flashcard[] {
  const subjectId = normalizeSubjectParam(subjectValue);
  const form = normalizeFormParam(formValue) as Form;
  const chapterKey = normalizeChapterParam(chapterValue);

  if (!subjectId || !chapterKey) return [];

  const registeredCards =
    registry?.getChapter(subjectId, chapterKey, language, form)?.flashcards ?? [];
  const legacyCards = dataModule
    ? dataModule.flashcards.filter((card) => {
        if (card.subjectId !== subjectId || card.form !== form) return false;
        if (normalizeChapterParam(dataModule.getItemChapterKey(card)) !== chapterKey) return false;
        if (language && card.lang && card.lang !== language) return false;
        return true;
      })
    : [];

  const source = registeredCards.length >= legacyCards.length ? registeredCards : legacyCards;
  const isSejarahF3TwoSetChapter =
    subjectId === "sejarah" &&
    form === "Form 3" &&
    ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"].includes(chapterKey);
  return standardizeFlashcardDeck(source, SINGLE_SET_DECK_SIZE, isSejarahF3TwoSetChapter ? 40 : 60);
}

export function standardizeFlashcardDeck(
  cards: Flashcard[],
  singleSetSize = SINGLE_SET_DECK_SIZE,
  multiSetSize = THREE_SET_DECK_SIZE,
) {
  const uniqueCards = [...new Map(cards.map((card) => [card.id, card])).values()];
  if (
    multiSetSize === THREE_SET_DECK_SIZE
      ? uniqueCards.length >= THREE_SET_DECK_SIZE
      : uniqueCards.length === multiSetSize
  ) {
    return uniqueCards;
  }
  return uniqueCards.length === singleSetSize ? uniqueCards : [];
}

export function splitFlashcardDeck(cards: Flashcard[], setCount: 2 | 3 = 3) {
  const deckSize = SINGLE_SET_DECK_SIZE * setCount;
  if (cards.length !== deckSize || new Set(cards.map((card) => card.id)).size !== deckSize) {
    return [];
  }
  return Array.from({ length: setCount }, (_, index) =>
    cards.slice(index * SINGLE_SET_DECK_SIZE, (index + 1) * SINGLE_SET_DECK_SIZE),
  );
}
