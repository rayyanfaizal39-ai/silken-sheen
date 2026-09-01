import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter9Content } from "@/content/form1/science/chapter-9/chapter9-content";
import { ScienceF1Chapter9VisualNotesBlock } from "./ScienceF1Chapter9VisualNotesBlock";

describe("ScienceF1Chapter9VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter9VisualNotesBlock, {
        id: "science-notes-content",
        content: chapter9Content,
        lang: "bm",
      }),
    );

    expect(html).toContain("Bumi ialah sistem yang saling berhubung");
    expect(html).toContain("Komposisi atmosfera");
    expect(html).toContain("Geobahaya mempunyai punca yang dapat dijejaki");
    expect(html).toContain("Sumber Bumi menyokong kehidupan dan teknologi");
    expect(html).toContain("Mengapa fosil tiada dalam batuan igneus?");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter9VisualNotesBlock, {
        content: chapter9Content,
        lang: "en",
      }),
    );

    expect(html).toContain("Earth is a connected, changing system");
    expect(html).toContain("4.5 billion years");
    expect(html).toContain("Earth resources support life and technology");
    expect(html).toContain("Economic minerals");
    expect(html).toContain("Why are fossils absent from igneous rocks?");
  });
});
