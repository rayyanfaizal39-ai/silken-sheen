import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import { ScienceF1Chapter1VisualNotesBlock } from "./ScienceF1Chapter1VisualNotesBlock";

describe("ScienceF1Chapter1VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter1VisualNotesBlock, {
        id: "science-notes-content",
        content: chapter1Content,
        lang: "bm",
      }),
    );
    expect(html).toContain("Penyiasatan saintifik bermula dengan rasa ingin tahu");
    expect(html).toContain("Makmal sains anda");
    expect(html).toContain("Kuantiti fizik dan unitnya");
    expect(html).toContain("Makmal ketumpatan maya");
    expect(html).toContain("Kajian kes: eksperimen bandul");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter1VisualNotesBlock, { content: chapter1Content, lang: "en" }),
    );
    expect(html).toContain("Scientific investigation begins with curiosity");
    expect(html).toContain("Your science laboratory");
    expect(html).toContain("Physical quantities and their units");
    expect(html).toContain("Virtual density laboratory");
    expect(html).toContain("Case study: the pendulum experiment");
  });
});
