import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";
import { ScienceF1Chapter5VisualNotesBlock } from "./ScienceF1Chapter5VisualNotesBlock";

describe("ScienceF1Chapter5VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter5VisualNotesBlock, {
        id: "science-notes-content",
        content: chapter5Content,
        lang: "bm",
      }),
    );

    expect(html).toContain("5.1 Jirim dalam Alam");
    expect(html).toContain("Mempunyai jisim");
    expect(html).toContain("Kadar Resapan dalam Tiga Keadaan Jirim");
    expect(html).toContain("Aktiviti 5.6 B — Jisim tidak berubah semasa perubahan fizikal");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter5VisualNotesBlock, {
        content: chapter5Content,
        lang: "en",
      }),
    );

    expect(html).toContain("5.1 Matter in Nature");
    expect(html).toContain("Experiment 5.2 - air in balloons");
    expect(html).toContain("Gas &gt; Liquid &gt; Solid");
    expect(html).toContain("Activity 5.6 B — Mass remains unchanged during physical change");
    expect(html).toContain("Why does a wet towel dry below 100°C?");
  });
});
