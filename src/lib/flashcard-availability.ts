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

  const registeredCards = registry?.getChapter(subjectId, chapterKey, language, form)?.flashcards ?? [];
  const legacyCards = dataModule
    ? dataModule.flashcards.filter((card) => {
        if (card.subjectId !== subjectId || card.form !== form) return false;
        if (normalizeChapterParam(dataModule.getItemChapterKey(card)) !== chapterKey) return false;
        if (language && card.lang && card.lang !== language) return false;
        return true;
      })
    : [];

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
