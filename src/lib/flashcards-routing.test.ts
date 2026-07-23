import { describe, expect, it } from "vitest";

import { getRegisteredSubjectChapters, hasFormResourceContent } from "@/content/registry";
import { flashcards, getItemChapterKey } from "@/data/content";
import {
  getStudyRouteMode,
  isRouteActive,
  normalizeFlashcardSetParam,
  normalizeFormParam,
  normalizeSubjectParam,
} from "@/lib/study-routing";
import {
  getFlashcardDeckCards,
  hasFlashcardDeck,
  splitFlashcardDeck,
} from "@/lib/flashcard-availability";

describe("Flashcards route resolution", () => {
  it("keeps Notes, Flashcards, and Quizzes as distinct route modes", () => {
    expect(getStudyRouteMode("/notes")).toBe("notes");
    expect(getStudyRouteMode("/flashcards")).toBe("flashcards");
    expect(getStudyRouteMode("/quizzes")).toBe("quizzes");
  });

  it("activates Flashcards—not Notes—on the Flashcards route", () => {
    expect(isRouteActive("/flashcards", "/flashcards")).toBe(true);
    expect(isRouteActive("/flashcards", "/notes")).toBe(false);
  });

  it("normalizes numeric/string forms and subject aliases consistently", () => {
    expect(normalizeFormParam(1)).toBe("Form 1");
    expect(normalizeFormParam("1")).toBe("Form 1");
    expect(normalizeFormParam("Form 1")).toBe("Form 1");
    expect(normalizeSubjectParam("sains")).toBe("science");
    expect(normalizeSubjectParam("bahasa-melayu")).toBe("bm");
    expect(normalizeSubjectParam("geografi")).toBe("geography");
  });

  it("resolves the Science Form 1 chapter list and BM/DLP Chapter 1 decks", () => {
    const chapters = getRegisteredSubjectChapters("science", "bm", "Form 1");
    const chapterCards = flashcards.filter(
      (card) =>
        card.subjectId === "science" &&
        card.form === "Form 1" &&
        getItemChapterKey(card) === "Chapter 1",
    );
    const bmCards = chapterCards.filter((card) => !card.lang || card.lang === "bm");
    const dlpCards = chapterCards.filter((card) => card.lang === "dlp");

    expect(chapters.length).toBeGreaterThan(0);
    expect(chapters[0]?.key).toBe("Chapter 1");
    expect(bmCards.length).toBeGreaterThan(0);
    expect(dlpCards.length).toBeGreaterThan(0);
    expect(bmCards.map((card) => card.id)).not.toEqual(dlpCards.map((card) => card.id));
  });

  it("marks Science Form 1 Chapter 2 and a later populated chapter as available", () => {
    expect(hasFlashcardDeck("science", 1, "Chapter 2", "bm")).toBe(true);
    expect(hasFlashcardDeck("sains", "Form 1", "Bab 2", "dlp")).toBe(true);
    expect(hasFlashcardDeck("science", "1", "chapter-9", "bm")).toBe(true);
  });

  it("keeps every existing Science Form 1 BM and DLP chapter available", () => {
    for (let chapter = 1; chapter <= 9; chapter += 1) {
      expect(hasFlashcardDeck("science", "Form 1", `Chapter ${chapter}`, "bm")).toBe(true);
      expect(hasFlashcardDeck("sains", 1, `Bab ${chapter}`, "dlp")).toBe(true);
    }
  });

  it("splits a canonical chapter into exactly three unique 20-card sets", () => {
    const cards = getFlashcardDeckCards("science", "Form 1", "Chapter 2", "bm");
    const sets = splitFlashcardDeck(cards);

    expect(sets).toHaveLength(3);
    expect(sets.map((set) => set.length)).toEqual([20, 20, 20]);
    expect(new Set(sets.flat().map((card) => card.id)).size).toBe(60);
  });

  it("normalizes direct set links and rejects invalid set numbers", () => {
    expect(normalizeFlashcardSetParam(1)).toBe(0);
    expect(normalizeFlashcardSetParam("2")).toBe(1);
    expect(normalizeFlashcardSetParam(3)).toBe(2);
    expect(normalizeFlashcardSetParam(0)).toBeNull();
    expect(normalizeFlashcardSetParam(4)).toBeNull();
    expect(normalizeFlashcardSetParam("invalid")).toBeNull();
  });

  it("normalizes chapter aliases without making genuinely missing decks available", () => {
    expect(hasFlashcardDeck("geografi", "1", "Bab 2")).toBe(true);
    expect(hasFlashcardDeck("science", "Form 1", "Chapter 99", "bm")).toBe(false);
  });

  it.each(["sejarah", "geography", "bm"] as const)(
    "retains existing Form 1 flashcard registry content for %s",
    (subjectId) => {
      expect(hasFormResourceContent(subjectId, "Form 1", "flashcards")).toBe(true);
    },
  );

  it("keeps registered Form 2 and Form 3 flashcard paths working", () => {
    expect(hasFormResourceContent("science", "Form 2", "flashcards", "bm")).toBe(true);
    expect(hasFormResourceContent("science", "Form 3", "flashcards", "dlp")).toBe(true);
  });
});
