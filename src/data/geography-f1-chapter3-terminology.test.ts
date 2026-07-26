import { describe, expect, it } from "vitest";
import { geoF1C3MindMap } from "@/content/form1/geography/chapter-3/mindmap";
import {
  flashcards as aggregateFlashcards,
  notes as aggregateNotes,
  quizzes as aggregateQuizzes,
} from "./content";
import { flashcards } from "./flashcards";
import { geographyF1Subtopics } from "./geography-f1-subtopics";
import { notes } from "./notes";
import { quizzes } from "./quizzes";

function geographyChapter3<T extends { subjectId: string; form: string; chapter?: string }>(
  items: T[],
) {
  return items.filter(
    (item) =>
      item.subjectId === "geography" && item.form === "Form 1" && item.chapter === "Chapter 3",
  );
}

describe("Geografi Tingkatan 1 Bab 3 terminology", () => {
  it("uses pemidang instead of bingkai in every Chapter 3 delivery bank", () => {
    const chapterContent = {
      quizzes: geographyChapter3(quizzes),
      flashcards: geographyChapter3(flashcards),
      notes: geographyChapter3(notes),
      aggregateQuizzes: geographyChapter3(aggregateQuizzes),
      aggregateFlashcards: geographyChapter3(aggregateFlashcards),
      aggregateNotes: geographyChapter3(aggregateNotes),
      subtopics: geographyF1Subtopics["Chapter 3"],
      mindMap: geoF1C3MindMap,
    };
    const serialized = JSON.stringify(chapterContent);

    expect(serialized).not.toMatch(/bingkai/i);
    expect(serialized).toMatch(/pemidang/i);
  });

  it("preserves affected quiz IDs and correct-answer mappings", () => {
    for (const bank of [quizzes, aggregateQuizzes]) {
      const question2 = bank.find((question) => question.id === "geo-f1-c3-q2");
      const question27 = bank.find((question) => question.id === "geo-f1-c3-q27");

      expect(question2?.answerIndex).toBe(1);
      expect(question2?.options[1]).toContain("pemidang");
      expect(question27?.answerIndex).toBe(1);
      expect(question27?.options[1]).toContain("pemidang");
    }
  });

  it("preserves affected flashcard and note IDs", () => {
    for (const bank of [flashcards, aggregateFlashcards]) {
      expect(bank.find((card) => card.id === "geo-f1-c3-fc4")?.back).toContain("pemidang");
      expect(bank.find((card) => card.id === "geo-f1-c3-fc7")?.front).toContain("Pemidang");
      expect(bank.find((card) => card.id === "geo-f1-c3-fc54")?.back).toContain("pemidang");
    }

    for (const bank of [notes, aggregateNotes]) {
      const note = bank.find((entry) => entry.id === "geo-f1-c3-note");
      expect(note?.summary).toContain("Pemidang");
      expect(note?.keywords).toContain("Pemidang Peta");
    }
  });
});
