import { describe, expect, it } from "vitest";

import { chapters } from "@/content/registry";
import { flashcards, getItemChapterKey } from "@/data/content";

import { splitFlashcardDeck, standardizeFlashcardDeck } from "./flashcard-availability";

describe("flashcard content audit", () => {
  it("can standardize every complete legacy and registry-backed chapter variant", () => {
    const counts = new Map<string, { count: number; ids: Set<string> }>();

    for (const card of flashcards) {
      const key = [
        card.subjectId,
        card.form,
        getItemChapterKey(card),
        card.lang ?? "default",
      ].join("|");
      const entry = counts.get(key) ?? { count: 0, ids: new Set<string>() };
      entry.count += 1;
      entry.ids.add(card.id);
      counts.set(key, entry);
    }

    for (const chapter of chapters) {
      if (!chapter.flashcards?.length) continue;
      const key = [
        chapter.subjectId,
        chapter.form,
        chapter.chapterKey,
        chapter.lang ?? "default",
      ].join("|");
      if (counts.has(key)) continue;
      counts.set(key, {
        count: chapter.flashcards.length,
        ids: new Set(chapter.flashcards.map((card) => card.id)),
      });
    }

    const report = [...counts]
      .map(([key, entry]) => ({
        key,
        count: entry.count,
        uniqueIds: entry.ids.size,
      }))
      .sort((a, b) => a.key.localeCompare(b.key));

    expect(report.length).toBeGreaterThan(0);
    const auditTemplate = flashcards[0];
    if (!auditTemplate) throw new Error("The flashcard registry must not be empty.");

    for (const entry of counts.values()) {
      if (entry.ids.size < 60) continue;

      const source = [...entry.ids].map((id) => ({
        ...auditTemplate,
        id,
        front: id,
        back: id,
      }));
      const standardized = standardizeFlashcardDeck(source);

      expect(standardized).toHaveLength(60);
      expect(splitFlashcardDeck(standardized).map((set) => set.length)).toEqual([
        20, 20, 20,
      ]);
    }
  });

  it("does not expose incomplete or duplicate decks as three valid sets", () => {
    const sample = flashcards.slice(0, 1);
    if (!sample[0]) throw new Error("The flashcard registry must not be empty.");

    const incomplete = Array.from({ length: 59 }, (_, index) => ({
      ...sample[0],
      id: `audit-incomplete-${index + 1}`,
    }));
    const duplicated = Array.from({ length: 60 }, (_, index) => ({
      ...sample[0],
      id: `audit-duplicate-${(index % 59) + 1}`,
    }));

    expect(standardizeFlashcardDeck(incomplete)).toEqual([]);
    expect(splitFlashcardDeck(duplicated)).toEqual([]);
  });
});
