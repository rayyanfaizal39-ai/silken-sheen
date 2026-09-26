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

  const registeredCards = keepSelectedFormCards(
    registry?.getChapter(subjectId, chapterKey, language, form)?.flashcards ?? [],
    subjectId,
    form,
    chapterKey,
  );
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

/**
 * Cards in a deck that don't belong to the selected subject + form. Every
 * deck the player shows must come back empty here.
 */
export function findFlashcardFormLeaks(cards: Flashcard[], subjectId: string, form: Form) {
  return cards.filter((card) => card.subjectId !== subjectId || card.form !== form);
}

/**
 * Drops (never substitutes) cards from another subject/form, and reports the
 * leak in development so a bad chapter builder is caught at the source.
 */
export function keepSelectedFormCards(
  cards: Flashcard[],
  subjectId: string,
  form: Form,
  context = "",
): Flashcard[] {
  const leaks = findFlashcardFormLeaks(cards, subjectId, form);
  if (leaks.length === 0) return cards;
  if (import.meta.env.DEV) {
    console.error("FLASHCARD FORM LEAK", {
      subjectId,
      form,
      context,
      leaked: leaks.length,
      total: cards.length,
      sample: leaks.slice(0, 3).map((card) => `${card.id} (${card.subjectId} ${card.form})`),
    });
  }
  return cards.filter((card) => card.subjectId === subjectId && card.form === form);
}

/**
 * Identity of one study session. Form is part of it, so the same chapter
 * number in another form ("Chapter 1" exists in Form 1, 2 and 3) is always a
 * different deck, e.g. `flashcard-session:sejarah:f1:chapter-1`.
 */
export function getFlashcardSessionKey(
  subjectId: string | null,
  form: string,
  chapter: string | null,
  ...variant: Array<string | number | null | undefined>
) {
  const formPart = form === "All" ? "all" : `f${form.replace(/\D/g, "")}`;
  const chapterPart = (chapter ?? "none").toLowerCase().replace(/\s+/g, "-");
  const variantParts = variant.filter((part) => part !== null && part !== undefined);
  return ["flashcard-session", subjectId ?? "none", formPart, chapterPart, ...variantParts].join(
    ":",
  );
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
