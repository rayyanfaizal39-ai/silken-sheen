import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SubjectWorldPage } from "./SubjectWorldPage";

function renderSejarah(
  form: "Form 1" | "Form 2" | "Form 3",
  notesProgress?: Record<string, number>,
) {
  return renderToStaticMarkup(
    createElement(SubjectWorldPage, {
      subjectId: "sejarah",
      form,
      resourceType: "notes",
      notesProgress,
      onSelectChapter: () => undefined,
      onBack: () => undefined,
    }),
  );
}

function chapterCard(markup: string, chapterKey: string) {
  const escapedKey = chapterKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markup.match(
    new RegExp(`<button[^>]*data-chapter-card="${escapedKey}"[^>]*>([\\s\\S]*?)<\\/button>`),
  );
  expect(match, `Expected rendered card for ${chapterKey}`).not.toBeNull();
  return match![1];
}

describe("Sejarah timeline chapter-card eyebrows", () => {
  it.each([
    ["Form 1", "Chapter 1", "Prasejarah", "Chapter 1: Mengenali Sejarah"],
    ["Form 2", "Chapter 1", "Kerajaan Alam Melayu", "Chapter 1: Kerajaan Alam Melayu"],
    ["Form 2", "Chapter 10", "Sarawak &amp; Sabah", "Chapter 10: Sarawak dan Sabah"],
    ["Form 3", "Chapter 1", "Peluasan Kuasa Barat", "Chapter 1: Kedatangan Kuasa Barat"],
    [
      "Form 3",
      "Chapter 6",
      "Kesan Pentadbiran Barat",
      "Chapter 6: Kesan Pentadbiran Barat terhadap Ekonomi dan Sosial",
    ],
  ] as const)("renders %s %s metadata inside its card", (form, chapterKey, eyebrow, title) => {
    const card = chapterCard(renderSejarah(form), chapterKey);

    expect(card).toContain("data-card-eyebrow");
    expect(card).toContain(eyebrow);
    expect(card).toContain(title);
  });

  it.each(["Form 2", "Form 3"] as const)("does not render Form 1 card labels on %s", (form) => {
    const markup = renderSejarah(form);
    const cardEyebrows = Array.from(markup.matchAll(/<p data-card-eyebrow[^>]*>(.*?)<\/p>/g)).map(
      ([, eyebrow]) => eyebrow,
    );

    expect(cardEyebrows).not.toContain("Zaman Batu");
    expect(cardEyebrows).not.toContain("Tamadun Awal");
    expect(cardEyebrows).not.toContain("Tamadun Dunia");
    expect(cardEyebrows).not.toContain("Zaman Klasik");
    expect(cardEyebrows).not.toContain("Zaman Pertengahan");
    expect(cardEyebrows).not.toContain("Tamadun Islam");
  });
});

describe("Sejarah Notes reading progress rings", () => {
  it.each([
    [0, "Chapter 1: Kerajaan Alam Melayu chapter progress: 0%"],
    [40, "Chapter 1: Kerajaan Alam Melayu chapter progress: 40%"],
    [100, "Chapter 1: Kerajaan Alam Melayu chapter progress: 100%"],
  ] as const)("renders the saved %i%% in the chapter ring", (percent, accessibleLabel) => {
    const markup = renderSejarah("Form 2", { "Chapter 1": percent });
    expect(markup).toContain(`aria-label="${accessibleLabel}"`);
  });

  it("keeps progress isolated by chapter", () => {
    const markup = renderSejarah("Form 3", { "Chapter 1": 40 });
    expect(markup).toContain(
      'aria-label="Chapter 1: Kedatangan Kuasa Barat chapter progress: 40%"',
    );
    expect(markup).toContain(
      'aria-label="Chapter 2: Pentadbiran Negeri-negeri Selat chapter progress: 0%"',
    );
  });

  it.each([
    ["science", "Form 2"],
    ["math", "Form 1"],
  ] as const)("uses the shared Notes progress in the %s chapter map", (subjectId, form) => {
    const markup = renderToStaticMarkup(
      createElement(SubjectWorldPage, {
        subjectId,
        form,
        resourceType: "notes",
        notesProgress: { "Chapter 1": 40 },
        onSelectChapter: () => undefined,
        onBack: () => undefined,
      }),
    );
    expect(markup).toContain("chapter progress: 40%");
  });
});
