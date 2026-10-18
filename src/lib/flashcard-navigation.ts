/**
 * URL-driven navigation for the structured Form 1 Maths flashcard flow:
 *
 *   chapters ─▶ language ─▶ review categories ─▶ flashcard arena
 *   ?chapter     &lang       (no set)              &set=N&mode=…
 *
 * Every level is a URL state, so the in-page Back button, the browser's
 * Back/Forward buttons, refresh and direct links all agree on one screen.
 * Previously the language lived only in component state: browser Back
 * restored a URL with `set`/`mode` but no language, showing the language
 * picker while the URL still pointed at an arena, and choosing a language
 * then jumped straight back into that stale arena.
 */

export type MathFlashcardLang = "bm" | "dlp";

/** The search params the flashcards page reads (as TanStack parses them). */
export interface FlashcardSearch {
  subject?: string;
  form?: string | number;
  chapter?: string;
  lang?: string;
  set?: string | number;
  mode?: string;
}

/** Form 1 Maths chapters that use the combined Concept / Practice / Challenge deck. */
const STRUCTURED_MATH_F1_CHAPTERS = new Set(["Chapter 1"]);

export function isStructuredMathF1Chapter(
  subject: string | null | undefined,
  form: string | null | undefined,
  chapter: string | null | undefined,
) {
  return subject === "math" && form === "Form 1" && !!chapter && STRUCTURED_MATH_F1_CHAPTERS.has(chapter);
}

export function normalizeMathLangParam(value: unknown): MathFlashcardLang | null {
  return value === "bm" || value === "dlp" ? value : null;
}

export type StructuredFlashcardLevel = "chapters" | "language" | "categories" | "arena";

/** Which screen a structured-flow URL shows. */
export function structuredFlashcardLevel(search: FlashcardSearch): StructuredFlashcardLevel {
  if (!search.chapter) return "chapters";
  if (!normalizeMathLangParam(search.lang)) return "language";
  if (search.set === undefined || search.set === null || search.set === "") return "categories";
  return "arena";
}

/**
 * The URL one level up: the arena drops `set`/`mode`, the categories drop
 * `lang`, the language picker drops `chapter` (and anything below it).
 */
export function parentFlashcardSearch(search: FlashcardSearch): FlashcardSearch {
  const { set: _set, mode: _mode, lang, chapter, ...rest } = search;
  switch (structuredFlashcardLevel(search)) {
    case "arena":
      return { ...rest, chapter, lang };
    case "categories":
      return { ...rest, chapter };
    default:
      return rest;
  }
}

/** Stable comparison key for a search (key order and number/string forms ignored). */
export function flashcardSearchKey(search: FlashcardSearch) {
  const keys = ["subject", "form", "chapter", "lang", "set", "mode"] as const;
  return keys
    .map((key) => {
      const value = search[key];
      return value === undefined || value === null || value === "" ? "" : `${key}=${String(value)}`;
    })
    .filter(Boolean)
    .join("&");
}

/**
 * How the in-page Back button should leave the current screen. If the entry
 * just behind this one in browser history is exactly the parent screen, step
 * back through history, so browser Forward still works and no duplicate entry
 * is pushed. Otherwise (a direct link, a refresh, or arriving from elsewhere)
 * replace the current entry with the parent — never push, so browser Back can
 * never return to the arena the student has just left.
 */
export function chooseBackAction(
  currentIndex: number | undefined,
  visited: ReadonlyMap<number, string>,
  parentKey: string,
): "history-back" | "replace" {
  if (currentIndex === undefined || currentIndex < 1) return "replace";
  return visited.get(currentIndex - 1) === parentKey ? "history-back" : "replace";
}
