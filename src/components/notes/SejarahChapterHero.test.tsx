import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { getRegisteredSubjectChapters } from "@/content/registry";
import { getSejarahChapterTheme, sejarahChapterThemes } from "@/data/sejarahChapterThemes";
import type { Form } from "@/data/subjects-meta";
import { normalizeChapterParam } from "@/lib/study-routing";

import { SejarahChapterHero } from "./SejarahChapterHero";

const forms = ["Form 1", "Form 2", "Form 3"] as const;

describe("Sejarah chapter archive themes", () => {
  it.each(forms)("covers every registered %s chapter with its exact title", (form) => {
    const registered = getRegisteredSubjectChapters("sejarah", undefined, form);
    const themes = sejarahChapterThemes[form];

    expect(Object.keys(themes)).toEqual(registered.map((chapter) => chapter.key));

    for (const chapter of registered) {
      const theme = getSejarahChapterTheme(form, chapter.key);
      expect(theme?.title, `${form} ${chapter.key}`).toBe(
        chapter.label.replace(/^Chapter \d+: /, ""),
      );
    }
  });

  it("gives all 26 chapters a distinct illustration motif", () => {
    const motifs = forms.flatMap((form) =>
      Object.values(sejarahChapterThemes[form]).map((theme) => theme.motif),
    );

    expect(motifs).toHaveLength(26);
    expect(new Set(motifs).size).toBe(26);
  });

  it.each(["chapter=Chapter+1", "chapter=Chapter%201"])(
    "preserves supported chapter query encoding: %s",
    (query) => {
      const value = new URLSearchParams(query).get("chapter");
      expect(normalizeChapterParam(value)).toBe("Chapter 1");
    },
  );
});

describe("SejarahChapterHero", () => {
  it.each([
    ["Form 1", "Chapter 1"],
    ["Form 1", "Chapter 5"],
    ["Form 1", "Chapter 8"],
    ["Form 2", "Chapter 1"],
    ["Form 2", "Chapter 6"],
    ["Form 2", "Chapter 10"],
    ["Form 3", "Chapter 1"],
    ["Form 3", "Chapter 4"],
    ["Form 3", "Chapter 8"],
  ] as const)("renders the exact %s %s archive identity", (form, chapterKey) => {
    const theme = getSejarahChapterTheme(form as Form, chapterKey)!;
    const markup = renderToStaticMarkup(
      <SejarahChapterHero
        form={form}
        chapterKey={chapterKey}
        title={theme.title}
        readingProgress={37}
        chapterProgress={24}
        isRead={false}
      />,
    );

    expect(markup).toContain("data-sejarah-chapter-hero");
    expect(markup).toContain('data-layout="compact"');
    expect(markup).toContain(`data-chapter="${chapterKey}"`);
    expect(markup).toContain(`data-motif="${theme.motif}"`);
    expect(markup).toContain(theme.title);
    expect(markup).toContain("37%");
    expect(markup).not.toContain("Summary Notes");
  });

  it("uses only real supplied progress and completion state", () => {
    const theme = sejarahChapterThemes["Form 2"]["Chapter 5"];
    const markup = renderToStaticMarkup(
      <SejarahChapterHero
        form="Form 2"
        chapterKey="Chapter 5"
        title={theme.title}
        readingProgress={62}
        chapterProgress={81}
        isRead
      />,
    );

    expect(markup).toContain("81%");
    expect(markup).toContain("Selesai dibaca");
    expect(markup).toContain("Bab telah ditandakan selesai");
  });
});
