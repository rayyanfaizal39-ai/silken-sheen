import { describe, expect, it } from "vitest";

import { getChapter } from "@/content/registry";
import { flashcards } from "@/data/content";
import { geographyF3C2Flashcards } from "./flashcards";

describe("Geografi Tingkatan 3 Bab 2 Carta Pai flashcards", () => {
  it("contains exactly sixty ordered cards", () => {
    expect(geographyF3C2Flashcards).toHaveLength(60);
    expect(geographyF3C2Flashcards.map(({ id }) => id)).toEqual(
      Array.from({ length: 60 }, (_, index) => `geo-f3-c2-f${index + 1}`),
    );
  });

  it("preserves the Form 3 Geography chapter identity on every card", () => {
    geographyF3C2Flashcards.forEach((card) => {
      expect(card).toMatchObject({
        subjectId: "geography",
        form: "Form 3",
        chapter: "Chapter 2",
      });
      expect(Object.keys(card).sort()).toEqual(
        ["back", "chapter", "form", "front", "id", "subjectId"].sort(),
      );
    });
  });

  it("contains no duplicate IDs, questions, or question-answer pairs", () => {
    const ids = geographyF3C2Flashcards.map(({ id }) => id);
    const fronts = geographyF3C2Flashcards.map(({ front }) => front);
    const pairs = geographyF3C2Flashcards.map(({ front, back }) => `${front}\u0000${back}`);

    expect(new Set(ids).size).toBe(60);
    expect(new Set(fronts).size).toBe(60);
    expect(new Set(pairs).size).toBe(60);
    expect(geographyF3C2Flashcards.every((card) => card.front.trim() && card.back.trim())).toBe(true);
  });

  it("is the complete deck exposed by the chapter mapping", () => {
    const globalDeck = flashcards.filter(
      (card) =>
        card.subjectId === "geography" &&
        card.form === "Form 3" &&
        card.chapter === "Chapter 2",
    );
    const chapter = getChapter("geography", "Chapter 2", undefined, "Form 3");

    expect(globalDeck).toEqual(geographyF3C2Flashcards);
    expect(chapter).toMatchObject({
      id: "geography-f3-c2",
      title: "Carta Pai",
      flashcards: geographyF3C2Flashcards,
    });
  });
});
