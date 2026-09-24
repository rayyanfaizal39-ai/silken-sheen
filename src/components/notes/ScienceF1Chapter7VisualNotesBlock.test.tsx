import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { bab7Content } from "@/content/form1/science/chapter-7/bab7-content";
import { ScienceF1Chapter7VisualNotesBlock } from "./ScienceF1Chapter7VisualNotesBlock";

describe("ScienceF1Chapter7VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter7VisualNotesBlock, {
        id: "science-notes-content",
        content: bab7Content,
        lang: "bm",
      }),
    );

    expect(html).toContain("Komposisi Udara");
    expect(html).toContain("Aktiviti 7.1");
    expect(html).toContain("Tiga keperluan pembakaran");
    expect(html).toContain("Indeks Pencemaran Udara");
    expect(html).toContain("Logam seperti kalium dan natrium");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter7VisualNotesBlock, {
        content: bab7Content,
        lang: "en",
      }),
    );

    expect(html).toContain("Composition of Air");
    expect(html).toContain("1/5 ≈ 20% oxygen");
    expect(html).toContain("Do not pour water onto an oil fire");
    expect(html).toContain("Air Pollutant Index");
    expect(html).toContain("Why can cave explorers");
  });
});
