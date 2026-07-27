import { describe, expect, it } from "vitest";

import { getChapter } from "@/content/registry";
import { flashcards } from "@/data/content";
import { geographyF3C2Flashcards } from "./flashcards";

describe("Geografi Tingkatan 3 Bab 2 Carta Pai flashcards", () => {
  it("contains exactly the twenty replacement cards in the supplied order", () => {
    expect(geographyF3C2Flashcards).toHaveLength(20);
    expect(geographyF3C2Flashcards.map(({ id }) => id)).toEqual(
      Array.from({ length: 20 }, (_, index) => `geo-f3-c2-f${index + 1}`),
    );
    expect(geographyF3C2Flashcards[0]).toMatchObject({
      front: "Apakah definisi carta pai?",
      back: "Carta pai ialah persembahan data dalam bentuk bulatan yang dibahagikan kepada beberapa sektor.",
    });
    expect(geographyF3C2Flashcards[19]).toMatchObject({
      front: "Mengapakah carta pai memudahkan pembaca memahami data?",
      back: "Kerana perbandingan antara komponen dapat dilihat dengan jelas secara visual.",
    });
  });

  it("preserves the exact Form 3 Geography Chapter 2 identity on every card", () => {
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

  it("contains no duplicate IDs, questions, answers, or question-answer pairs", () => {
    const ids = geographyF3C2Flashcards.map(({ id }) => id);
    const fronts = geographyF3C2Flashcards.map(({ front }) => front);
    const backs = geographyF3C2Flashcards.map(({ back }) => back);
    const pairs = geographyF3C2Flashcards.map(({ front, back }) => `${front}\u0000${back}`);

    expect(new Set(ids).size).toBe(20);
    expect(new Set(fronts).size).toBe(20);
    expect(new Set(backs).size).toBe(20);
    expect(new Set(pairs).size).toBe(20);
  });

  it("is the complete deck exposed by the existing Carta Pai chapter mapping", () => {
    const globalDeck = flashcards.filter(
      (card) =>
        card.subjectId === "geography" && card.form === "Form 3" && card.chapter === "Chapter 2",
    );
    const chapter = getChapter("geography", "Chapter 2", undefined, "Form 3");

    expect(globalDeck).toEqual(geographyF3C2Flashcards);
    expect(chapter).toMatchObject({
      id: "geography-f3-c2",
      title: "Carta Pai",
      flashcards: geographyF3C2Flashcards,
    });
  });

  it("keeps adjacent Form 3 chapters separate from the replacement deck", () => {
    expect(
      flashcards.some(
        (card) =>
          card.subjectId === "geography" &&
          card.form === "Form 3" &&
          card.chapter === "Chapter 1" &&
          card.id.startsWith("geo-f3-c1-"),
      ),
    ).toBe(true);
    expect(
      flashcards.some(
        (card) =>
          card.subjectId === "geography" &&
          card.form === "Form 3" &&
          card.chapter === "Chapter 3" &&
          card.id.startsWith("geo-f3-c3-"),
      ),
    ).toBe(true);
  });
});
