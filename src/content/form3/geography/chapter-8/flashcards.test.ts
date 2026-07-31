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

import { geographyF3C8Flashcards } from "./flashcards";

describe("Geography Form 3 Chapter 8 flashcards", () => {
  it("contains exactly 65 ordered cards using the existing identity schema", () => {
    expect(geographyF3C8Flashcards).toHaveLength(65);
    expect(geographyF3C8Flashcards.map((card) => card.id)).toEqual(
      Array.from({ length: 65 }, (_, index) => `geo-f3-c8-f${index + 1}`),
    );
    expect(geographyF3C8Flashcards[0]).toMatchObject({
      front: "Namakan empat kawasan utama yang dipelajari dalam Bab 8.",
      back: "Gurun Panas, Hutan Monsun Tropika, Hutan Daun Luruh Sederhana, dan Hutan Konifer",
    });
    expect(geographyF3C8Flashcards.at(-1)).toMatchObject({
      front: "Mengapakah kita perlu menjaga keseimbangan ekosistem dunia?",
      back: "Untuk memastikan kelangsungan hidup flora, fauna, dan manusia bagi generasi akan datang (Pembangunan Lestari)",
    });
  });

  it("preserves the required fields for every card", () => {
    for (const card of geographyF3C8Flashcards) {
      expect(Object.keys(card).sort()).toEqual(
        ["back", "chapter", "form", "front", "id", "subjectId"].sort(),
      );
      expect(card).toMatchObject({
        subjectId: "geography",
        form: "Form 3",
        chapter: "Chapter 8",
      });
    }
  });

  it("contains no source markers, blank text, or duplicate cards", () => {
    const fronts = geographyF3C8Flashcards.map((card) => card.front);
    const pairs = geographyF3C8Flashcards.map((card) => `${card.front}\u0000${card.back}`);

    expect(geographyF3C8Flashcards.every((card) => card.front.trim() && card.back.trim())).toBe(
      true,
    );
    expect(geographyF3C8Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.front))).toBe(true);
    expect(geographyF3C8Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.back))).toBe(true);
    expect(geographyF3C8Flashcards.every((card) => !/\[\d+\]/.test(card.front + card.back))).toBe(
      true,
    );
    expect(geographyF3C8Flashcards.every((card) => !/^\s*\.\s*$/.test(card.front))).toBe(true);
    expect(geographyF3C8Flashcards.every((card) => !/^\s*\.\s*$/.test(card.back))).toBe(true);
    expect(new Set(fronts).size).toBe(65);
    expect(new Set(pairs).size).toBe(65);
  });

  it("is exposed through the existing global content and Chapter 8 route mapping", () => {
    const globalDeck = flashcards.filter(
      (card) =>
        card.subjectId === "geography" && card.form === "Form 3" && card.chapter === "Chapter 8",
    );
    const routedDeck = getFlashcardDeckCards("geografi", "Form 3", "Bab 8");

    expect(globalDeck).toEqual(geographyF3C8Flashcards);
    expect(getChapter("geography", "Chapter 8", undefined, "Form 3")).toMatchObject({
      id: "geography-f3-c8",
      title: "Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar di Dunia",
      flashcards: geographyF3C8Flashcards,
    });
    expect(routedDeck).toEqual(geographyF3C8Flashcards);
    expect(hasFlashcardDeck("geography", 3, "Chapter 8")).toBe(true);
  });
});
