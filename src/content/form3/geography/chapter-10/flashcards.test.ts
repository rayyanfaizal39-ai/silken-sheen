import { describe, expect, it } from "vitest";

import { getChapter } from "@/content/registry";
import { flashcards } from "@/data/content";
import { getFlashcardDeckCards, hasFlashcardDeck } from "@/lib/flashcard-availability";

import { geographyF3C10Flashcards } from "./flashcards";

describe("Geography Form 3 Chapter 10 flashcards", () => {
  it("contains exactly 65 ordered cards using the existing identity schema", () => {
    expect(geographyF3C10Flashcards).toHaveLength(65);
    expect(geographyF3C10Flashcards.map((card) => card.id)).toEqual(
      Array.from({ length: 65 }, (_, index) => `geo-f3-c10-f${index + 1}`),
    );
    expect(geographyF3C10Flashcards[0]).toMatchObject({
      front: "Apakah definisi sumber hutan?",
      back: "Sumber boleh baharu yang meliputi kawasan yang ditumbuhi pelbagai jenis flora dan fauna yang hidup secara semula jadi",
    });
    expect(geographyF3C10Flashcards.at(-1)).toMatchObject({
      front: "Apakah kepentingan utama pengurusan sumber hutan secara lestari kepada negara?",
      back: "Sebagai gagasan untuk menangani isu tuntutan pembangunan sambil memastikan pemuliharaan alam sekitar untuk generasi depan",
    });
  });

  it("preserves the required fields for every card", () => {
    for (const card of geographyF3C10Flashcards) {
      expect(Object.keys(card).sort()).toEqual(
        ["back", "chapter", "form", "front", "id", "subjectId"].sort(),
      );
      expect(card).toMatchObject({
        subjectId: "geography",
        form: "Form 3",
        chapter: "Chapter 10",
      });
    }
  });

  it("contains no source markers, blank text, or duplicate cards", () => {
    const fronts = geographyF3C10Flashcards.map((card) => card.front);
    const pairs = geographyF3C10Flashcards.map((card) => `${card.front}\u0000${card.back}`);

    expect(geographyF3C10Flashcards.every((card) => card.front.trim() && card.back.trim())).toBe(
      true,
    );
    expect(geographyF3C10Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.front))).toBe(true);
    expect(geographyF3C10Flashcards.every((card) => !/^\s*[SJ]\s*:/.test(card.back))).toBe(true);
    expect(geographyF3C10Flashcards.every((card) => !/\[\d+\]/.test(card.front + card.back))).toBe(
      true,
    );
    expect(geographyF3C10Flashcards.every((card) => !/^\s*\.\s*$/.test(card.front))).toBe(true);
    expect(geographyF3C10Flashcards.every((card) => !/^\s*\.\s*$/.test(card.back))).toBe(true);
    expect(new Set(fronts).size).toBe(65);
    expect(new Set(pairs).size).toBe(65);
  });

  it("is exposed through the existing global content and Chapter 10 route mapping", () => {
    const globalDeck = flashcards.filter(
      (card) =>
        card.subjectId === "geography" && card.form === "Form 3" && card.chapter === "Chapter 10",
    );
    const routedDeck = getFlashcardDeckCards("geografi", "Form 3", "Bab 10");

    expect(globalDeck).toEqual(geographyF3C10Flashcards);
    expect(getChapter("geography", "Chapter 10", undefined, "Form 3")).toMatchObject({
      id: "geography-f3-c10",
      title: "Sumber Hutan",
      flashcards: geographyF3C10Flashcards,
    });
    expect(routedDeck).toEqual(geographyF3C10Flashcards);
    expect(hasFlashcardDeck("geography", 3, "Chapter 10")).toBe(true);
  });
});
