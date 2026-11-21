import { describe, expect, it } from "vitest";
import * as registry from "@/content/registry";
import * as data from "@/data/content";
import { flashcards as legacyMirror } from "@/data/flashcards";
import { sej7Flashcards } from "@/content/form1/sejarah/chapter-7/sej7-revision";
import { getFlashcardDeckCards, splitFlashcardDeck } from "@/lib/flashcard-availability";

// Regression for the actual learner-facing loader. It silently returned [] when
// Bab 1 had 55 cards and Bab 7 had 40 instead of three full sets of 20.
const deck = (chapter: number) =>
  getFlashcardDeckCards(
    "sejarah",
    "Form 1",
    `Chapter ${chapter}`,
    undefined,
    registry,
    data,
  );

const card = (chapter: number, index: number) =>
  deck(chapter).find((c) => c.id === `sej-f1-c${chapter}-fc${index}`)!;

describe("Sejarah Form 1 — every flashcard chapter is playable", () => {
  it("keeps the legacy flashcard mirror synchronized with the actual learner-facing source", () => {
    const inScope = (c: { id: string; subjectId: string; form: string }) =>
      c.subjectId === "sejarah" && c.form === "Form 1" && /^sej-f1-c[1-8]-fc\d+$/.test(c.id);
    const snapshot = (cards: typeof data.flashcards) =>
      cards.filter(inScope)
        .map(({ id, front, back }) => ({ id, front, back }))
        .sort((a, b) => a.id.localeCompare(b.id));

    expect(snapshot(data.flashcards)).toEqual(snapshot(legacyMirror));
    expect(snapshot(data.flashcards)).toHaveLength(480);
  });

  it("serves 480 original, form-scoped cards across all eight chapters", () => {
    const all = Array.from({ length: 8 }, (_, i) => deck(i + 1)).flat();
    expect(all).toHaveLength(480);
    expect(new Set(all.map((c) => c.id)).size).toBe(480);
    expect(all.every((c) => c.subjectId === "sejarah" && c.form === "Form 1")).toBe(true);
  });

  it.each(Array.from({ length: 8 }, (_, i) => i + 1))(
    "Bab %i serves 60 distinct, valid cards in three sets of 20",
    (chapter) => {
      const cards = deck(chapter);
      expect(cards).toHaveLength(60);
      expect(cards.map((c) => c.id)).toEqual(
        Array.from({ length: 60 }, (_, i) => `sej-f1-c${chapter}-fc${i + 1}`),
      );
      expect(new Set(cards.map((c) => c.front.trim().toLowerCase())).size).toBe(60);
      for (const c of cards) {
        expect(c.front.trim().length, c.id).toBeGreaterThan(12);
        expect(c.back.trim().length, c.id).toBeGreaterThan(4);
        expect(c.front.length, c.id).toBeLessThanOrEqual(200);
        expect(c.back.length, c.id).toBeLessThanOrEqual(450);
        expect(c.front).not.toMatch(/gambar di atas|rajah berikut|lihat (?:rajah|gambar)/i);
      }
      expect(splitFlashcardDeck(cards).map((set) => set.length)).toEqual([20, 20, 20]);
    },
  );

  it("keeps Bab 7's source-derived records as the sole canonical set", () => {
    expect(sej7Flashcards).toHaveLength(60);
    expect(deck(7)).toEqual(sej7Flashcards);
    expect(card(7, 41).front).toContain("fizikal");
    expect(card(7, 60).front).toContain("Dinasti Qin");
  });

  it("corrects civitas and the Islamic hadharah/madaniyyah distinction", () => {
    expect(card(4, 2).back).toBe("Civitas.");
    expect(card(4, 3).front).toContain("civitas");
    expect(card(4, 9).back).toMatch(/Hadharah.*nilai.*madaniyyah.*kebendaan/i);
  });

  it("corrects key Athens facts without altering the quiz or scoring engine", () => {
    expect(card(6, 14).back).toMatch(/secara langsung/);
    expect(card(6, 18).back).toMatch(/500.*Dewan Perhimpunan.*dua tahun/);
    expect(card(6, 21).back).toMatch(/101 hingga 1001/);
  });

  it("avoids unsupported Indus and early Islam absolutes", () => {
    expect(card(5, 29).back).not.toMatch(/setiap rumah|paling awal/i);
    expect(card(5, 30).back).not.toMatch(/ritual|upacara/i);
    expect(card(5, 45).back).toContain("Enuma Elish");
    for (const n of [11, 12, 42]) {
      expect(card(8, n).back).not.toMatch(/sistem kasta|perniagaan berhala/i);
    }
  });
});
