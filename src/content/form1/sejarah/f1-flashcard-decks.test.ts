import { describe, expect, it } from "vitest";

import * as registryModule from "@/content/registry";
import * as dataModule from "@/data/content";
import { getFlashcardDeckCards, splitFlashcardDeck } from "@/lib/flashcard-availability";

// Chapters 1 and 7 were topped up to 60 cards (fc56–fc60 and fc41–fc60) so
// every Sejarah Form 1 chapter forms a complete three-set deck.
describe("Sejarah Form 1 flashcard decks", () => {
  for (const chapterNum of [1, 2, 3, 4, 5, 6, 7, 8]) {
    it(`Chapter ${chapterNum} has 60 unique Form 1 cards split into 3 sets of 20`, () => {
      const deck = getFlashcardDeckCards(
        "sejarah",
        "Form 1",
        `Chapter ${chapterNum}`,
        undefined,
        registryModule,
        dataModule,
      );
      expect(deck).toHaveLength(60);
      expect(new Set(deck.map((card) => card.id)).size).toBe(60);
      expect(new Set(deck.map((card) => card.front.trim().toLowerCase())).size).toBe(60);
      expect(new Set(deck.map((card) => card.back.trim().toLowerCase())).size).toBe(60);
      expect(deck.filter((card) => card.chapter !== `Chapter ${chapterNum}`).map((card) => card.id)).toEqual([]);
      expect(deck.map((card) => Number(card.id.split("-fc")[1])).sort((a, b) => a - b)).toEqual(
        Array.from({ length: 60 }, (_, index) => index + 1),
      );
      expect(
        deck.every(
          (card) =>
            card.subjectId === "sejarah" &&
            card.form === "Form 1" &&
            card.id.startsWith(`sej-f1-c${chapterNum}-`),
        ),
      ).toBe(true);
      expect(splitFlashcardDeck(deck).map((set) => set.length)).toEqual([20, 20, 20]);
    });
  }

  it("keeps the new Chapter 1 and Chapter 7 cards in the Chapter N metadata", () => {
    const added = dataModule.flashcards.filter(
      (card) =>
        /^sej-f1-c1-fc(5[6-9]|60)$/.test(card.id) || /^sej-f1-c7-fc(4[1-9]|5\d|60)$/.test(card.id),
    );
    expect(added).toHaveLength(25);
    for (const card of added) {
      expect(card.chapter).toBe(card.id.startsWith("sej-f1-c1-") ? "Chapter 1" : "Chapter 7");
    }
  });
});
