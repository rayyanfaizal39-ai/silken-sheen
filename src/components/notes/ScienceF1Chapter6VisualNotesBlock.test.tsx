import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";
import { ScienceF1Chapter6VisualNotesBlock } from "./ScienceF1Chapter6VisualNotesBlock";

describe("ScienceF1Chapter6VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter6VisualNotesBlock, {
        id: "science-notes-content",
        content: chapter6Content,
        lang: "bm",
      }),
    );

    expect(html).toContain("Unsur membina dunia bahan");
    expect(html).toContain("Dmitri Mendeleev");
    expect(html).toContain("Pilih kaedah pemisahan");
    expect(html).toContain("Elektrolisis air");
    expect(html).toContain("Ingatan aktif");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter6VisualNotesBlock, {
        content: chapter6Content,
        lang: "en",
      }),
    );

    expect(html).toContain("Elements build the material world");
    expect(html).toContain("Hydrogen gas");
    expect(html).toContain("2 : 1");
    expect(html).toContain("Why is air a mixture?");
    expect(html).toContain("germanium");
  });
});
