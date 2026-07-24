import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FormGrid } from "./ChapterPicker";
import { SubjectWorldPage } from "./SubjectWorldPage";

function renderFormGrid(mode: "quizzes" | "flashcards") {
  return renderToStaticMarkup(
    createElement(FormGrid, {
      subjectId: "science",
      mode,
      onSelect: () => undefined,
      onBack: () => undefined,
    }),
  );
}

describe("pre-activity quantity labels", () => {
  it.each(["quizzes", "flashcards"] as const)(
    "keeps form identifiers without quantity metadata on %s cards",
    (mode) => {
      const markup = renderFormGrid(mode);

      expect(markup).toContain("Form 1");
      expect(markup).toContain("Form 2");
      expect(markup).toContain("Form 3");
      expect(markup).toContain(`aria-label="Open Form 1 ${mode}"`);
      expect(markup).not.toMatch(/\d+\s+(Questions|Cards)/i);
    },
  );

  it.each(["bm", "dlp"] as const)(
    "removes quiz and flashcard totals from Science %s chapter navigation",
    (scienceLang) => {
      const markup = renderToStaticMarkup(
        createElement(SubjectWorldPage, {
          subjectId: "science",
          form: "Form 2",
          scienceLang,
          resourceType: "quiz",
          onSelectChapter: () => undefined,
          onBack: () => undefined,
        }),
      );

      expect(markup).toContain(scienceLang === "bm" ? "Biodiversiti" : "Biodiversity");
      expect(markup).not.toContain(scienceLang === "bm" ? "Bab 1" : "Chapter 1");
      expect(markup).toContain('aria-label="Open ');
      expect(markup).not.toMatch(/🃏\s*\d+/u);
      expect(markup).not.toMatch(/🧠\s*\d+\s*(q|Qs)?/iu);
      expect(markup).not.toMatch(/\d+\s+cards/i);
    },
  );

  it("keeps all three flashcard sets clickable without ranges or card-count pills", () => {
    const source = readFileSync(new URL("../routes/flashcards.tsx", import.meta.url), "utf8");
    const picker = source.slice(
      source.indexOf("function FlashcardSetPicker"),
      source.indexOf("function FlashcardsPage"),
    );

    expect(source).toContain('title: "Flashcards Set 1"');
    expect(source).toContain('title: "Flashcards Set 2"');
    expect(source).toContain('title: "Flashcards Set 3"');
    expect(picker).toContain("onClick={() => onSelect(set.index)}");
    expect(picker).toContain("aria-label={`Open ${displayTitle}`}");
    expect(picker).toContain('"Foundation Review", "Practice Review", "Challenge Review"');
    expect(picker).toContain("{displayTitle}");
    expect(picker).not.toContain("{set.range}");
    expect(picker).not.toContain("{FLASHCARD_SET_SIZE} Cards");
  });

  it("preserves active quiz and flashcard progress renderers", () => {
    const quizSource = readFileSync(new URL("../routes/quizzes.tsx", import.meta.url), "utf8");
    const flashcardSource = readFileSync(
      new URL("../routes/flashcards.tsx", import.meta.url),
      "utf8",
    );

    expect(quizSource).toContain(
      '<span className="font-display text-sm font-bold">{idx + 1}</span>',
    );
    expect(quizSource).toContain('<span className="text-xs text-white/30">/ {total}</span>');
    expect(quizSource).toContain('aria-label="Quiz progress"');
    expect(flashcardSource).toContain("Card {done + 1} of {total}");
    expect(flashcardSource).toContain('aria-label="Flashcard progress"');
  });
});
