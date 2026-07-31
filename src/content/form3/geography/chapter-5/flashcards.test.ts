import { describe, expect, it } from "vitest";

import { getChapter } from "@/content/registry";
import * as registryModule from "@/content/registry";
import { flashcards } from "@/data/content";
import * as dataModule from "@/data/content";
import {
  getFlashcardDeckCards as getFlashcardDeckCardsWithModules,
  hasFlashcardDeck as hasFlashcardDeckWithModules,
} from "@/lib/flashcard-availability";

// Test-only wrappers: production callers load the registry/data modules
// lazily (client-only dynamic import); tests bind the real modules
// synchronously instead of re-testing the async loading path.
function hasFlashcardDeck(
  subjectValue: unknown,
  formValue: unknown,
  chapterValue: unknown,
  language?: "bm" | "dlp",
) {
  return hasFlashcardDeckWithModules(
    subjectValue,
    formValue,
    chapterValue,
    language,
    registryModule,
    dataModule,
  );
}

function getFlashcardDeckCards(
  subjectValue: unknown,
  formValue: unknown,
  chapterValue: unknown,
  language?: "bm" | "dlp",
) {
  return getFlashcardDeckCardsWithModules(
    subjectValue,
    formValue,
    chapterValue,
    language,
    registryModule,
    dataModule,
  );
}

import { geographyF3C5Flashcards } from "./flashcards";

describe("Geography Form 3 Chapter 5 flashcards", () => {
  it("contains exactly 20 ordered cards using the existing identity schema", () => {
    expect(geographyF3C5Flashcards).toHaveLength(20);
    expect(geographyF3C5Flashcards.map((card) => card.id)).toEqual(
      Array.from({ length: 20 }, (_, index) => `geo-f3-c5-f${index + 1}`),
    );
    expect(geographyF3C5Flashcards[0]).toMatchObject({
      front: "Apakah definisi hidupan liar mengikut Akta 2010?",
      back: "Spesies haiwan liar atau burung liar, sama ada dilindungi atau dilindungi sepenuhnya, vertebrata atau invertebrata, hidup atau mati",
    });
    expect(geographyF3C5Flashcards.at(-1)).toMatchObject({
      front: "Berikan satu kerjaya profesional yang berkaitan dengan hidupan liar.",
      back: "Veterinar, penyelidik, ahli forensik, atau pensyarah",
    });
  });

  it("preserves the required fields for every card", () => {
    for (const card of geographyF3C5Flashcards) {
      expect(Object.keys(card).sort()).toEqual(
        ["back", "chapter", "form", "front", "id", "subjectId"].sort(),
      );
      expect(card).toMatchObject({
        subjectId: "geography",
        form: "Form 3",
        chapter: "Chapter 5",
      });
    }
  });

  it("contains no source markers, blank text, or duplicates", () => {
    const fronts = geographyF3C5Flashcards.map((card) => card.front);
    const backs = geographyF3C5Flashcards.map((card) => card.back);
    const pairs = geographyF3C5Flashcards.map((card) => `${card.front}\u0000${card.back}`);

    expect(geographyF3C5Flashcards.every((card) => card.front.trim() && card.back.trim())).toBe(
      true,
    );
    expect(geographyF3C5Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.front))).toBe(true);
    expect(geographyF3C5Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.back))).toBe(true);
    expect(geographyF3C5Flashcards.every((card) => !/\[\d+\]/.test(card.front + card.back))).toBe(
      true,
    );
    expect(geographyF3C5Flashcards.every((card) => !/^\s*\.\s*$/.test(card.front))).toBe(true);
    expect(geographyF3C5Flashcards.every((card) => !/^\s*\.\s*$/.test(card.back))).toBe(true);
    expect(new Set(fronts).size).toBe(20);
    expect(new Set(backs).size).toBe(20);
    expect(new Set(pairs).size).toBe(20);
  });

  it("is exposed through the existing global content and Chapter 5 route mapping", () => {
    const globalDeck = flashcards.filter(
      (card) =>
        card.subjectId === "geography" && card.form === "Form 3" && card.chapter === "Chapter 5",
    );
    const routedDeck = getFlashcardDeckCards("geografi", "Form 3", "Bab 5");

    expect(globalDeck).toEqual(geographyF3C5Flashcards);
    expect(getChapter("geography", "Chapter 5", undefined, "Form 3")).toMatchObject({
      id: "geography-f3-c5",
      title: "Hidupan Liar di Malaysia",
      flashcards: geographyF3C5Flashcards,
    });
    expect(routedDeck).toEqual(geographyF3C5Flashcards);
    expect(hasFlashcardDeck("geography", 3, "Chapter 5")).toBe(true);
  });
});
