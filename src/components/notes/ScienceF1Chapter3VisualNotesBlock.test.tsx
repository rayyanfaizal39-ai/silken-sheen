import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";
import { ScienceF1Chapter3VisualNotesBlock } from "./ScienceF1Chapter3VisualNotesBlock";

describe("ScienceF1Chapter3VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter3VisualNotesBlock, {
        id: "science-notes-content",
        content: chapter3Content,
        lang: "bm",
      }),
    );
    expect(html).toContain("Koordinasi dan Gerak Balas");
    expect(html).toContain("Kawal Atur Kandungan Air");
    expect(html).toContain("Eksperimen 3.2");
    expect(html).toContain("Tumbuhan mengimbangi kehilangan air dan penyejukan");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter3VisualNotesBlock, { content: chapter3Content, lang: "en" }),
    );
    expect(html).toContain("Coordination and Response");
    expect(html).toContain("Regulation of Water Content");
    expect(html).toContain("Experiment 3.2");
    expect(html).not.toContain("70-80 bpm");
    expect(html).toContain("Plants balance water loss and cooling");
  });
});
