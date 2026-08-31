import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { ScienceF1Chapter4VisualNotesBlock } from "./ScienceF1Chapter4VisualNotesBlock";

describe("ScienceF1Chapter4VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter4VisualNotesBlock, {
        id: "science-notes-content",
        content: chapter4Content,
        lang: "bm",
      }),
    );

    expect(html).toContain("Pembiakan membina generasi seterusnya");
    expect(html).toContain("Kitar haid 28 hari");
    expect(html).toContain("Daripada persenyawaan hingga kelahiran");
    expect(html).toContain("Eksperimen 4.1: pilih syarat percambahan");
    expect(html).toContain("Cahaya tidak diperlukan untuk percambahan biji benih");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter4VisualNotesBlock, {
        content: chapter4Content,
        lang: "en",
      }),
    );

    expect(html).toContain("Reproduction builds the next generation");
    expect(html).toContain("Sperm compared with ovum");
    expect(html).toContain("From fertilisation to birth");
    expect(html).toContain("Experiment 4.1: choose a germination condition");
    expect(chapter4Content.en.plantReproduction.germinationConditionDetails[2].reason).toContain(
      "25-35°C",
    );
    expect(html).toContain("Light is not required for seed germination");
  });
});
