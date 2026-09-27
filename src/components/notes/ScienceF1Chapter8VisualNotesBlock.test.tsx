import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter8Content } from "@/content/form1/science/chapter-8/chapter8-content";
import { ScienceF1Chapter8VisualNotesBlock } from "./ScienceF1Chapter8VisualNotesBlock";

describe("ScienceF1Chapter8VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter8VisualNotesBlock, {
        id: "science-notes-content",
        content: chapter8Content,
        lang: "bm",
      }),
    );

    expect(html).toContain("Cahaya dan Optik");
    expect(html).toContain("Aktiviti 8.1");
    expect(html).toContain("Pembiasan Cahaya");
    expect(html).toContain("Spektrum MUJHHBIU");
    expect(html).toContain("Peraturan penapis warna");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter8VisualNotesBlock, {
        content: chapter8Content,
        lang: "en",
      }),
    );

    expect(html).toContain("Light and Optics");
    expect(html).toContain("AMBULANCE is written backwards");
    expect(html).toContain("i &gt; r");
    expect(html).toContain("Overlapping filter outcomes");
    expect(html).toContain("A red road sign");
  });
});
