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
    expect(html).toContain(chapter8Content.bm.mirrors.realVsVirtual.real);
    expect(html).not.toContain("Aktiviti 8.1");
    expect(html).toContain("Pembiasan Cahaya");
    expect(html).toContain("Spektrum");
    expect(html).toContain("Indigo");
    expect(html).not.toContain("MUJHHBIU");
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
    expect(html).toContain("AMBULANCE");
    expect(html).toContain("data-reversed-word");
    expect(html).toContain("data-readable-word");
    expect(html).toContain("data-refraction-lesson");
    expect(html).toContain("Experiment 8.2");
    expect(html).not.toContain("data-refraction-results");
    expect(html).toContain(chapter8Content.en.refraction.experiment.hypothesis);
    expect(html).toContain("Overlapping filter outcomes");
    expect(html).toContain("A red road sign");
  });
});
