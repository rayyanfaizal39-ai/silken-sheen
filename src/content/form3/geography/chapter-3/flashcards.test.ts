import { describe, expect, it } from "vitest";

import { getChapter } from "@/content/registry";
import { flashcards } from "@/data/content";
import { getFlashcardDeckCards, hasFlashcardDeck } from "@/lib/flashcard-availability";
import { geographyF3C3Flashcards } from "./flashcards";

describe("Geografi Tingkatan 3 Bab 3 replacement flashcards", () => {
  it("contains all 65 CSV rows in source order", () => {
    expect(geographyF3C3Flashcards).toHaveLength(65);
    expect(geographyF3C3Flashcards.map(({ id }) => id)).toEqual(
      Array.from({ length: 65 }, (_, index) => `geo-f3-c3-f${index + 1}`),
    );
    expect(geographyF3C3Flashcards[0]).toMatchObject({
      front:
        "Senaraikan empat faktor persekitaran fizikal yang mempengaruhi kepelbagaian tumbuh-tumbuhan semula jadi dan hidupan liar.",
      back: "Bentuk muka bumi, saliran, tanih, dan iklim.",
    });
    expect(geographyF3C3Flashcards[64]).toMatchObject({
      front:
        "Tumbuhan 'feather grass' dan 'fringed sagebrush' boleh ditemui di kawasan tanih _____.",
      back: "Chernozem",
    });
  });

  it("preserves the existing Form 3 Geography Chapter 3 card schema", () => {
    geographyF3C3Flashcards.forEach((card) => {
      expect(card).toMatchObject({
        subjectId: "geography",
        form: "Form 3",
        chapter: "Chapter 3",
      });
      expect(Object.keys(card).sort()).toEqual(
        ["back", "chapter", "form", "front", "id", "subjectId"].sort(),
      );
    });
  });

  it("contains no duplicate IDs, questions, or question-answer pairs", () => {
    const ids = geographyF3C3Flashcards.map(({ id }) => id);
    const fronts = geographyF3C3Flashcards.map(({ front }) => front);
    const pairs = geographyF3C3Flashcards.map(({ front, back }) => `${front}\u0000${back}`);

    expect(new Set(ids).size).toBe(65);
    expect(new Set(fronts).size).toBe(65);
    expect(new Set(pairs).size).toBe(65);
    expect(new Set(geographyF3C3Flashcards.map(({ back }) => back)).size).toBe(60);
  });

  it("fully replaces the globally exposed Chapter 3 deck", () => {
    const globalDeck = flashcards.filter(
      (card) =>
        card.subjectId === "geography" && card.form === "Form 3" && card.chapter === "Chapter 3",
    );
    const routedDeck = getFlashcardDeckCards("geography", "Form 3", "Chapter 3");
    const chapter = getChapter("geography", "Chapter 3", undefined, "Form 3");

    expect(globalDeck).toEqual(geographyF3C3Flashcards);
    expect(routedDeck).toEqual(geographyF3C3Flashcards);
    expect(chapter?.flashcards).toEqual(geographyF3C3Flashcards);
    expect(hasFlashcardDeck("geography", "Form 3", "Chapter 3")).toBe(true);
  });
});
