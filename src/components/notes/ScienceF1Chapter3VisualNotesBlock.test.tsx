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
    expect(html).toContain("Homeostasis mengekalkan keseimbangan hidupan");
    expect(html).toContain("Mengawal kandungan air");
    expect(html).toContain("Aktiviti fizikal mengubah kadar denyutan nadi");
    expect(html).toContain("Tumbuhan mengimbangi kehilangan air dan penyejukan");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter3VisualNotesBlock, { content: chapter3Content, lang: "en" }),
    );
    expect(html).toContain("Homeostasis keeps life in balance");
    expect(html).toContain("Regulating water content");
    expect(html).toContain("Physical activity changes pulse rate");
    expect(html).toContain("70-80 bpm");
    expect(html).toContain("Plants balance water loss and cooling");
  });
});
