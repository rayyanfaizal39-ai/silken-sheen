import { describe, expect, it } from "vitest";

import { getChaptersForSubject } from "@/content/registry";

const chapters = getChaptersForSubject("geography", undefined, "Form 3");

function walkMindMap(node: { label: string; children?: Array<{ label: string; children?: any[] }> }) {
  const labels: string[] = [node.label];
  for (const child of node.children ?? []) {
    labels.push(...walkMindMap(child));
  }
  return labels;
}

describe("Form 3 Geography release quality", () => {
  it("registers all eleven KSSM chapters with all three learning resources", () => {
    expect(chapters).toHaveLength(11);

    for (const chapter of chapters) {
      expect(chapter.flashcards?.length ?? 0).toBeGreaterThanOrEqual(60);
      expect(chapter.quiz).toHaveLength(30);
      expect(chapter.mindMap?.data).toBeTruthy();
    }
  });

  it("keeps flashcard decks substantial, unique and free from extraction debris", () => {
    for (const chapter of chapters) {
      const cards = chapter.flashcards ?? [];
      const ids = cards.map((card) => card.id);
      const fronts = cards.map((card) => card.front.trim());
      const pairs = cards.map((card) => `${card.front.trim()}\u0000${card.back.trim()}`);

      expect(cards.length).toBeGreaterThanOrEqual(60);
      expect(new Set(ids).size).toBe(cards.length);
      expect(new Set(fronts).size).toBe(cards.length);
      expect(new Set(pairs).size).toBe(cards.length);

      for (const card of cards) {
        expect(card.front.trim().length).toBeGreaterThan(5);
        expect(card.back.trim().length).toBeGreaterThan(0);
        expect(card.front + card.back).not.toMatch(/KSSM_\d+|\.indd\b|\[\d+\]|10\/\d+\/\d+/i);
      }
    }
  });

  it("requires every quiz chapter to contain thirty unique, balanced questions", () => {
    for (const chapter of chapters) {
      const quiz = chapter.quiz ?? [];
      const questions = quiz.map((item) => item.question.trim());
      const ids = quiz.map((item) => item.id);
      const difficultyCounts = quiz.reduce<Record<string, number>>((counts, item) => {
        counts[item.difficulty] = (counts[item.difficulty] ?? 0) + 1;
        return counts;
      }, {});

      expect(quiz).toHaveLength(30);
      expect(new Set(ids).size).toBe(30);
      expect(new Set(questions).size).toBe(30);
      expect(difficultyCounts).toEqual({ Easy: 10, Medium: 10, Hard: 10 });
    }
  });

  it("keeps each multiple-choice item valid and avoids low-quality source debris", () => {
    for (const chapter of chapters) {
      const quiz = chapter.quiz ?? [];
      const answerPositions = [0, 0, 0, 0];

      for (const item of quiz) {
        expect(item.options).toHaveLength(4);
        expect(new Set(item.options.map((option) => option.trim())).size).toBe(4);
        expect(item.answerIndex).toBeGreaterThanOrEqual(0);
        expect(item.answerIndex).toBeLessThan(4);
        expect(item.question.trim().length).toBeGreaterThan(10);
        expect(item.explanation?.trim().length ?? 0).toBeGreaterThan(0);
        expect(item.question).not.toMatch(
          /^(Senaraikan|Nyatakan|Berikan|Namakan|Sebutkan)\s+(dua|tiga|empat|lima|enam)\b/i,
        );
        expect(item.question + item.options.join(" ")).not.toMatch(
          /KSSM_\d+|\.indd\b|\[\d+\]|10\/\d+\/\d+/i,
        );

        answerPositions[item.answerIndex] += 1;
      }

      // A healthy bank must not leak a fixed correct-answer position.
      for (const count of answerPositions) {
        expect(count).toBeGreaterThanOrEqual(5);
      }
    }
  });

  it("uses concise, clean mind-map labels instead of numbered OCR note dumps", () => {
    for (const chapter of chapters) {
      const data = chapter.mindMap?.data;
      expect(data).toBeTruthy();
      if (!data) continue;

      expect(data.children?.length ?? 0).toBeGreaterThanOrEqual(3);
      const labels = walkMindMap(data);

      for (const label of labels) {
        expect(label.length).toBeLessThanOrEqual(105);
        expect(label).not.toMatch(/^\d+(?:\.\d+)+\s/);
        expect(label).not.toMatch(/KSSM_\d+|\.indd\b|\[\d+\]|10\/\d+\/\d+/i);
      }
    }
  });
});
