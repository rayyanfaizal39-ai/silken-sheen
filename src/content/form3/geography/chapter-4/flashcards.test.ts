import { describe, expect, it } from "vitest";

import { getChapter } from "@/content/registry";
import { flashcards } from "@/data/content";
import { getFlashcardDeckCards, hasFlashcardDeck } from "@/lib/flashcard-availability";
import { geographyF3C4Flashcards } from "./flashcards";

describe("Geografi Tingkatan 3 Bab 4 replacement flashcards", () => {
  it("contains all 65 cleaned CSV rows in source order", () => {
    expect(geographyF3C4Flashcards).toHaveLength(65);
    expect(geographyF3C4Flashcards.map(({ id }) => id)).toEqual(
      Array.from({ length: 65 }, (_, index) => `geo-f3-c4-f${index + 1}`),
    );
    expect(geographyF3C4Flashcards[0]).toMatchObject({
      front: "Nyatakan lima jenis hutan utama di Malaysia.",
      back: "Hutan Hujan Tropika, Hutan Paya Air Masin, Hutan Paya Air Tawar, Hutan Pantai, dan Hutan Gunung",
    });
    expect(geographyF3C4Flashcards[64]).toMatchObject({
      front: "Apakah kesan kemusnahan hutan terhadap suhu bumi?",
      back: "Menyebabkan peningkatan suhu global (kesan rumah hijau) kerana kurangnya proses fotosintesis yang menyerap karbon dioksida",
    });
  });

  it("preserves the existing Form 3 Geography Chapter 4 card schema", () => {
    geographyF3C4Flashcards.forEach((card) => {
      expect(card).toMatchObject({
        subjectId: "geography",
        form: "Form 3",
        chapter: "Chapter 4",
      });
      expect(Object.keys(card).sort()).toEqual(
        ["back", "chapter", "form", "front", "id", "subjectId"].sort(),
      );
    });
  });

  it("contains no citation markers, prefixes, or duplicate content", () => {
    const ids = geographyF3C4Flashcards.map(({ id }) => id);
    const fronts = geographyF3C4Flashcards.map(({ front }) => front);
    const backs = geographyF3C4Flashcards.map(({ back }) => back);
    const pairs = geographyF3C4Flashcards.map(({ front, back }) => `${front}\u0000${back}`);

    expect(new Set(ids).size).toBe(65);
    expect(new Set(fronts).size).toBe(65);
    expect(new Set(backs).size).toBe(65);
    expect(new Set(pairs).size).toBe(65);
    geographyF3C4Flashcards.forEach(({ front, back }) => {
      expect(front).not.toMatch(/^\s*S:|\[\d+\]/);
      expect(back).not.toMatch(/^\s*J:|\[\d+\]/);
    });
  });

  it("fully replaces the globally exposed Chapter 4 deck", () => {
    const globalDeck = flashcards.filter(
      (card) =>
        card.subjectId === "geography" && card.form === "Form 3" && card.chapter === "Chapter 4",
    );
    const routedDeck = getFlashcardDeckCards("geography", "Form 3", "Chapter 4");
    const chapter = getChapter("geography", "Chapter 4", undefined, "Form 3");

    expect(globalDeck).toEqual(geographyF3C4Flashcards);
    expect(routedDeck).toEqual(geographyF3C4Flashcards);
    expect(chapter).toMatchObject({
      id: "geography-f3-c4",
      title: "Tumbuh-tumbuhan Semula Jadi di Malaysia",
      flashcards: geographyF3C4Flashcards,
    });
    expect(hasFlashcardDeck("geography", "Form 3", "Chapter 4")).toBe(true);
  });
});
