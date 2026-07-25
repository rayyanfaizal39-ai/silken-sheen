import { describe, expect, it } from "vitest";

import { getRegisteredSubjectChapters, hasFormResourceContent } from "@/content/registry";
import { flashcards, getItemChapterKey } from "@/data/content";
import {
  getStudyRouteMode,
  isRouteActive,
  normalizeFlashcardSetParam,
  normalizeFormParam,
  normalizeSubjectParam,
} from "@/lib/study-routing";
import {
  getFlashcardDeckCards,
  hasFlashcardDeck,
  splitFlashcardDeck,
} from "@/lib/flashcard-availability";

describe("Flashcards route resolution", () => {
  it("keeps Notes, Flashcards, and Quizzes as distinct route modes", () => {
    expect(getStudyRouteMode("/notes")).toBe("notes");
    expect(getStudyRouteMode("/flashcards")).toBe("flashcards");
    expect(getStudyRouteMode("/quizzes")).toBe("quizzes");
  });

  it("activates Flashcards—not Notes—on the Flashcards route", () => {
    expect(isRouteActive("/flashcards", "/flashcards")).toBe(true);
    expect(isRouteActive("/flashcards", "/notes")).toBe(false);
  });

  it("normalizes numeric/string forms and subject aliases consistently", () => {
    expect(normalizeFormParam(1)).toBe("Form 1");
    expect(normalizeFormParam("1")).toBe("Form 1");
    expect(normalizeFormParam("Form 1")).toBe("Form 1");
    expect(normalizeSubjectParam("sains")).toBe("science");
    expect(normalizeSubjectParam("bahasa-melayu")).toBe("bm");
    expect(normalizeSubjectParam("geografi")).toBe("geography");
  });

  it("resolves the Science Form 1 chapter list and BM/DLP Chapter 1 decks", () => {
    const chapters = getRegisteredSubjectChapters("science", "bm", "Form 1");
    const chapterCards = flashcards.filter(
      (card) =>
        card.subjectId === "science" &&
        card.form === "Form 1" &&
        getItemChapterKey(card) === "Chapter 1",
    );
    const bmCards = chapterCards.filter((card) => !card.lang || card.lang === "bm");
    const dlpCards = chapterCards.filter((card) => card.lang === "dlp");

    expect(chapters.length).toBeGreaterThan(0);
    expect(chapters[0]?.key).toBe("Chapter 1");
    expect(bmCards.length).toBeGreaterThan(0);
    expect(dlpCards.length).toBeGreaterThan(0);
    expect(bmCards.map((card) => card.id)).not.toEqual(dlpCards.map((card) => card.id));
  });

  it("marks Science Form 1 Chapter 2 and a later populated chapter as available", () => {
    expect(hasFlashcardDeck("science", 1, "Chapter 2", "bm")).toBe(true);
    expect(hasFlashcardDeck("sains", "Form 1", "Bab 2", "dlp")).toBe(true);
    expect(hasFlashcardDeck("science", "1", "chapter-9", "bm")).toBe(true);
  });

  it("keeps every existing Science Form 1 BM and DLP chapter available", () => {
    for (let chapter = 1; chapter <= 9; chapter += 1) {
      expect(hasFlashcardDeck("science", "Form 1", `Chapter ${chapter}`, "bm")).toBe(true);
      expect(hasFlashcardDeck("sains", 1, `Bab ${chapter}`, "dlp")).toBe(true);
    }
  });

  it("splits a canonical chapter into exactly three unique 20-card sets", () => {
    const cards = getFlashcardDeckCards("science", "Form 1", "Chapter 2", "bm");
    const sets = splitFlashcardDeck(cards);

    expect(sets).toHaveLength(3);
    expect(sets.map((set) => set.length)).toEqual([20, 20, 20]);
    expect(new Set(sets.flat().map((card) => card.id)).size).toBe(60);
  });

  it("registers Geography Form 1 Bab 1 as an available three-deck chapter", () => {
    const chapter = getRegisteredSubjectChapters("geography", undefined, "Form 1").find(
      (item) => item.key === "Chapter 1",
    );
    const cards = getFlashcardDeckCards("geografi", "Form 1", "Bab 1");
    const sets = splitFlashcardDeck(cards);

    expect(chapter).toMatchObject({
      key: "Chapter 1",
      label: "Chapter 1: Arah",
      available: true,
      selectable: true,
    });
    expect(hasFlashcardDeck("geography", 1, "Chapter 1")).toBe(true);
    expect(cards).toHaveLength(60);
    expect(sets.map((set) => set.length)).toEqual([20, 20, 20]);
    expect(new Set(cards.map((card) => card.id)).size).toBe(60);
    expect(cards.every((card) => card.id.startsWith("geo-f1-c1-fc"))).toBe(true);
    expect(sets[0]?.map((card) => card.id)).toEqual(
      Array.from({ length: 20 }, (_, index) => `geo-f1-c1-fc${index + 1}`),
    );
    expect(sets[1]?.map((card) => card.id)).toEqual(
      Array.from({ length: 20 }, (_, index) => `geo-f1-c1-fc${index + 21}`),
    );
    expect(sets[2]?.map((card) => card.id)).toEqual(
      Array.from({ length: 20 }, (_, index) => `geo-f1-c1-fc${index + 41}`),
    );
  });

  it("preserves the supplied Practice Review card order", () => {
    const practiceReview = splitFlashcardDeck(
      getFlashcardDeckCards("geography", 1, "Chapter 1"),
    )[1];

    expect(practiceReview?.map((card) => card.front)).toEqual([
      "If you are facing the direction of the sunrise, what direction is on your left-hand side?",
      "What is the intermediate direction located exactly between West (Barat) and North (Utara)?",
      "Why must a magnetic compass be kept away from iron objects during use?",
      "In bearing measurements, what is the value in degrees for West (Barat)?",
      "If a person turns 180° from facing North, which main direction will they face?",
      "Name the three main parts of a magnetic compass.",
      "What is the bearing value for North-East (Timur Laut)?",
      "If you are facing the setting sun, what direction is directly behind you?",
      "What tool is used to measure bearing sudutan on a map?",
      "From which direction does a bearing measurement always start?",
      "In which direction is a bearing measured using a protractor?",
      "Point A is located at a bearing of 90° from Point B. What is the direction of Point A from Point B?",
      "What is the intermediate direction between South (Selatan) and East (Timur)?",
      "Why does a magnetic compass needle point North?",
      "If you are facing North and turn 90° to your right, what direction will you face?",
      "Between which two main directions is Barat Daya (South-West) located?",
      "What is the definition of “Arah”?",
      "If you stand facing East, which direction is directly to your right?",
      "What is the standard unit used for stating a bearing?",
      "What is the bearing for South (Selatan)?",
    ]);
  });

  it("preserves the supplied Challenge Review card order", () => {
    const challengeReview = splitFlashcardDeck(
      getFlashcardDeckCards("geography", 1, "Chapter 1"),
    )[2];

    expect(challengeReview?.map((card) => card.front)).toEqual([
      "Explain the steps for orienting a magnetic compass correctly.",
      "If the bearing of a school from a house is 315°, in which intermediate direction is the school located?",
      "Which two civilizations were among the early inventors or users of the compass?",
      "If you are facing a bearing of 225°, what direction is directly behind you?",
      "How can a bearing greater than 180° be measured using a standard half-circle protractor?",
      "A traveller is facing East and turns 225° clockwise. What is the traveller’s new direction?",
      "Why is a compass generally more accurate than using the Sun to determine direction?",
      "When measuring the bearing of Point X from Point Y, where must the centre of the protractor be placed?",
      "What is the back bearing of an object located at a bearing of 60°?",
      "Name two specialised compasses other than a standard magnetic compass.",
      "What may happen if a magnetic compass is used inside a car?",
      "If you face the setting sun and turn 90° to your left, what direction will you face?",
      "How many degrees are there between North-East (Timur Laut) and South-East (Tenggara)?",
      "What should be done before measuring the bearing between two points on a sketch map?",
      "A location has a bearing of 135°. What is its intermediate direction?",
      "What is the significance of the 0° or 360° point on a compass?",
      "A student is facing South and turns 135° counter-clockwise. What direction is the student now facing?",
      "A student records a bearing of 400°. Explain why this is not a valid standard bearing.",
      "What direction is located 180° away from North-West (Barat Laut)?",
      "You are at Point A, and Point B is directly North of you. What is the bearing of Point A from Point B?",
    ]);
  });

  it("normalizes direct set links and rejects invalid set numbers", () => {
    expect(normalizeFlashcardSetParam(1)).toBe(0);
    expect(normalizeFlashcardSetParam("2")).toBe(1);
    expect(normalizeFlashcardSetParam(3)).toBe(2);
    expect(normalizeFlashcardSetParam(0)).toBeNull();
    expect(normalizeFlashcardSetParam(4)).toBeNull();
    expect(normalizeFlashcardSetParam("invalid")).toBeNull();
  });

  it("normalizes chapter aliases without making genuinely missing decks available", () => {
    expect(hasFlashcardDeck("geografi", "1", "Bab 2")).toBe(true);
    expect(hasFlashcardDeck("science", "Form 1", "Chapter 99", "bm")).toBe(false);
  });

  it.each(["sejarah", "geography", "bm"] as const)(
    "retains existing Form 1 flashcard registry content for %s",
    (subjectId) => {
      expect(hasFormResourceContent(subjectId, "Form 1", "flashcards")).toBe(true);
    },
  );

  it("keeps registered Form 2 and Form 3 flashcard paths working", () => {
    expect(hasFormResourceContent("science", "Form 2", "flashcards", "bm")).toBe(true);
    expect(hasFormResourceContent("science", "Form 3", "flashcards", "dlp")).toBe(true);
  });
});
