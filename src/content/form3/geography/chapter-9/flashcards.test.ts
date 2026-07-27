import { describe, expect, it } from "vitest";

import { getChapter } from "@/content/registry";
import { flashcards } from "@/data/content";
import { getFlashcardDeckCards, hasFlashcardDeck } from "@/lib/flashcard-availability";

import { geographyF3C9Flashcards } from "./flashcards";

describe("Geography Form 3 Chapter 9 flashcards", () => {
  it("contains exactly 65 ordered cards using the existing identity schema", () => {
    expect(geographyF3C9Flashcards).toHaveLength(65);
    expect(geographyF3C9Flashcards.map((card) => card.id)).toEqual(
      Array.from({ length: 65 }, (_, index) => `geo-f3-c9-f${index + 1}`),
    );
    expect(geographyF3C9Flashcards[0]).toMatchObject({
      front: "Namakan negara pengeluar petroleum utama di dunia.",
      back: "Arab Saudi",
    });
    expect(geographyF3C9Flashcards.at(-1)).toMatchObject({
      front: "Mengapakah hubungan diplomatik penting untuk kerjasama ekonomi?",
      back: "Sebagai asas pembentukan perjanjian perdagangan yang menguntungkan kedua-dua pihak",
    });
  });

  it("preserves the required fields for every card", () => {
    for (const card of geographyF3C9Flashcards) {
      expect(Object.keys(card).sort()).toEqual(
        ["back", "chapter", "form", "front", "id", "subjectId"].sort(),
      );
      expect(card).toMatchObject({
        subjectId: "geography",
        form: "Form 3",
        chapter: "Chapter 9",
      });
    }
  });

  it("contains no source markers, blank text, or duplicate cards", () => {
    const fronts = geographyF3C9Flashcards.map((card) => card.front);
    const pairs = geographyF3C9Flashcards.map((card) => `${card.front}\u0000${card.back}`);

    expect(geographyF3C9Flashcards.every((card) => card.front.trim() && card.back.trim())).toBe(
      true,
    );
    expect(geographyF3C9Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.front))).toBe(true);
    expect(geographyF3C9Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.back))).toBe(true);
    expect(geographyF3C9Flashcards.every((card) => !/\[\d+\]/.test(card.front + card.back))).toBe(
      true,
    );
    expect(geographyF3C9Flashcards.every((card) => !/^\s*\.\s*$/.test(card.front))).toBe(true);
    expect(geographyF3C9Flashcards.every((card) => !/^\s*\.\s*$/.test(card.back))).toBe(true);
    expect(new Set(fronts).size).toBe(65);
    expect(new Set(pairs).size).toBe(65);
  });

  it("is exposed through the existing global content and Chapter 9 route mapping", () => {
    const globalDeck = flashcards.filter(
      (card) =>
        card.subjectId === "geography" && card.form === "Form 3" && card.chapter === "Chapter 9",
    );
    const routedDeck = getFlashcardDeckCards("geografi", "Form 3", "Bab 9");

    expect(globalDeck).toEqual(geographyF3C9Flashcards);
    expect(getChapter("geography", "Chapter 9", undefined, "Form 3")).toMatchObject({
      id: "geography-f3-c9",
      title: "Sumber Semula Jadi Utama dan Kerjasama Ekonomi di Dunia",
      flashcards: geographyF3C9Flashcards,
    });
    expect(routedDeck).toEqual(geographyF3C9Flashcards);
    expect(hasFlashcardDeck("geography", 3, "Chapter 9")).toBe(true);
  });
});
