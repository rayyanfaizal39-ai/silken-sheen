import { describe, expect, it } from "vitest";

import { getChapter } from "@/content/registry";
import { flashcards } from "@/data/content";
import { getFlashcardDeckCards, hasFlashcardDeck } from "@/lib/flashcard-availability";

import { geographyF3C11Flashcards } from "./flashcards";

describe("Geography Form 3 Chapter 11 flashcards", () => {
  it("contains exactly 65 ordered cards using the existing identity schema", () => {
    expect(geographyF3C11Flashcards).toHaveLength(65);
    expect(geographyF3C11Flashcards.map((card) => card.id)).toEqual(
      Array.from({ length: 65 }, (_, index) => `geo-f3-c11-f${index + 1}`),
    );
    expect(geographyF3C11Flashcards[0]).toMatchObject({
      front: "Apakah definisi kitar semula mengikut Akta 672?",
      back: "Memungut dan mengasingkan sisa pepejal bagi maksud menghasilkan keluaran",
    });
    expect(geographyF3C11Flashcards.at(-1)).toMatchObject({
      front: "Apakah matlamat akhir semua negara dalam memperkasakan kitar semula?",
      back: "Untuk memastikan kelestarian alam sekitar secara global",
    });
  });

  it("preserves the required fields for every card", () => {
    for (const card of geographyF3C11Flashcards) {
      expect(Object.keys(card).sort()).toEqual(
        ["back", "chapter", "form", "front", "id", "subjectId"].sort(),
      );
      expect(card).toMatchObject({
        subjectId: "geography",
        form: "Form 3",
        chapter: "Chapter 11",
      });
    }
  });

  it("contains no source markers, blank text, or duplicate cards", () => {
    const fronts = geographyF3C11Flashcards.map((card) => card.front);
    const backs = geographyF3C11Flashcards.map((card) => card.back);
    const pairs = geographyF3C11Flashcards.map((card) => `${card.front}\u0000${card.back}`);

    expect(geographyF3C11Flashcards.every((card) => card.front.trim() && card.back.trim())).toBe(
      true,
    );
    expect(geographyF3C11Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.front))).toBe(true);
    expect(geographyF3C11Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.back))).toBe(true);
    expect(geographyF3C11Flashcards.every((card) => !/\[\d+\]/.test(card.front + card.back))).toBe(
      true,
    );
    expect(geographyF3C11Flashcards.every((card) => !/^\s*\.\s*$/.test(card.front))).toBe(true);
    expect(geographyF3C11Flashcards.every((card) => !/^\s*\.\s*$/.test(card.back))).toBe(true);
    expect(new Set(fronts).size).toBe(65);
    expect(new Set(backs).size).toBe(65);
    expect(new Set(pairs).size).toBe(65);
  });

  it("is exposed through the existing global content and Chapter 11 route mapping", () => {
    const globalDeck = flashcards.filter(
      (card) =>
        card.subjectId === "geography" && card.form === "Form 3" && card.chapter === "Chapter 11",
    );
    const routedDeck = getFlashcardDeckCards("geografi", "Form 3", "Bab 11");

    expect(globalDeck).toEqual(geographyF3C11Flashcards);
    expect(getChapter("geography", "Chapter 11", undefined, "Form 3")).toMatchObject({
      id: "geography-f3-c11",
      title: "Kitar Semula",
      flashcards: geographyF3C11Flashcards,
    });
    expect(routedDeck).toEqual(geographyF3C11Flashcards);
    expect(hasFlashcardDeck("geography", 3, "Chapter 11")).toBe(true);
  });
});
