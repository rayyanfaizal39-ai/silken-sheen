import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import { ScienceF1Chapter2VisualNotesBlock } from "./ScienceF1Chapter2VisualNotesBlock";

describe("ScienceF1Chapter2VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter2VisualNotesBlock, {
        id: "science-notes-content",
        content: chapter2Content,
        lang: "bm",
      }),
    );
    expect(html).toContain("Setiap hidupan bermula daripada sel");
    expect(html).toContain("Sel haiwan dan sel tumbuhan");
    expect(html).toContain("Sediakan sel untuk pemerhatian mikroskop");
    expect(html).toContain("Terokai 11 sistem badan manusia");
    expect(html).toContain("Ujian kanji daun");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter2VisualNotesBlock, { content: chapter2Content, lang: "en" }),
    );
    expect(html).toContain("Every living thing begins with a cell");
    expect(html).toContain("Animal and plant cells");
    expect(html).toContain("Prepare cells for microscopic observation");
    expect(html).toContain("Explore the 11 human body systems");
    expect(html).toContain("Leaf starch test");
  });
});
