import { describe, expect, it } from "vitest";

import { getChapter } from "@/content/registry";
import { flashcards } from "@/data/content";
import { getFlashcardDeckCards, hasFlashcardDeck } from "@/lib/flashcard-availability";

import { geographyF3C6Flashcards } from "./flashcards";

describe("Geography Form 3 Chapter 6 flashcards", () => {
  it("contains exactly 65 ordered cards using the existing identity schema", () => {
    expect(geographyF3C6Flashcards).toHaveLength(65);
    expect(geographyF3C6Flashcards.map((card) => card.id)).toEqual(
      Array.from({ length: 65 }, (_, index) => `geo-f3-c6-f${index + 1}`),
    );
    expect(geographyF3C6Flashcards[0]).toMatchObject({
      front: "Apakah maksud sumber semula jadi?",
      back: "Bahan atau punca yang terdapat di sekeliling kita, sama ada di atas permukaan bumi, di dalam bumi atau di dalam air",
    });
    expect(geographyF3C6Flashcards.at(-1)).toMatchObject({
      front: "Mengapakah pengurusan sumber yang cekap penting untuk masa hadapan?",
      back: "Untuk menjamin bekalan sumber yang berterusan dan mengekalkan kelestarian alam sekitar",
    });
  });

  it("preserves the required fields for every card", () => {
    for (const card of geographyF3C6Flashcards) {
      expect(Object.keys(card).sort()).toEqual(
        ["back", "chapter", "form", "front", "id", "subjectId"].sort(),
      );
      expect(card).toMatchObject({
        subjectId: "geography",
        form: "Form 3",
        chapter: "Chapter 6",
      });
    }
  });

  it("contains no source markers, blank text, or duplicates", () => {
    const fronts = geographyF3C6Flashcards.map((card) => card.front);
    const backs = geographyF3C6Flashcards.map((card) => card.back);
    const pairs = geographyF3C6Flashcards.map((card) => `${card.front}\u0000${card.back}`);

    expect(geographyF3C6Flashcards.every((card) => card.front.trim() && card.back.trim())).toBe(
      true,
    );
    expect(geographyF3C6Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.front))).toBe(true);
    expect(geographyF3C6Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.back))).toBe(true);
    expect(geographyF3C6Flashcards.every((card) => !/\[\d+\]/.test(card.front + card.back))).toBe(
      true,
    );
    expect(geographyF3C6Flashcards.every((card) => !/^\s*\.\s*$/.test(card.front))).toBe(true);
    expect(geographyF3C6Flashcards.every((card) => !/^\s*\.\s*$/.test(card.back))).toBe(true);
    expect(new Set(fronts).size).toBe(65);
    expect(new Set(backs).size).toBe(65);
    expect(new Set(pairs).size).toBe(65);
  });

  it("is exposed through the existing global content and Chapter 6 route mapping", () => {
    const globalDeck = flashcards.filter(
      (card) =>
        card.subjectId === "geography" && card.form === "Form 3" && card.chapter === "Chapter 6",
    );
    const routedDeck = getFlashcardDeckCards("geografi", "Form 3", "Bab 6");

    expect(globalDeck).toEqual(geographyF3C6Flashcards);
    expect(getChapter("geography", "Chapter 6", undefined, "Form 3")).toMatchObject({
      id: "geography-f3-c6",
      title: "Sumber Semula Jadi di Malaysia",
      flashcards: geographyF3C6Flashcards,
    });
    expect(routedDeck).toEqual(geographyF3C6Flashcards);
    expect(hasFlashcardDeck("geography", 3, "Chapter 6")).toBe(true);
  });
});
