import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter10VisualNotesBlock } from "./ScienceF3Chapter10VisualNotesBlock";
import { scienceF3C10Interactive } from "@/content/form3/science/chapter-10/interactive";
import { projectF3Interactive } from "@/content/form3/science/project-bilingual";

const scienceF3C10InteractiveBM = projectF3Interactive(scienceF3C10Interactive, "bm");
const scienceF3C10InteractiveDLP = projectF3Interactive(scienceF3C10Interactive, "dlp");

describe("ScienceF3Chapter10VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF3Chapter10VisualNotesBlock, {
        id: "science-notes-content",
        content: scienceF3C10InteractiveBM,
        lang: "bm",
      }),
    );
    expect(html).toContain("Penerokaan Angkasa Lepas");
    expect(html).not.toContain("Tiga tokoh, tiga model Sistem Suria");
    expect(html).toContain("ptolemy-geosentrik");
    expect(html).toContain("Infografik model geosentrik Ptolemy");
    expect(html).not.toContain("Daripada roket primitif kepada RazakSAT");
    expect(html).not.toContain("Penderiaan jauh: data tanpa menyentuh sasaran");
    expect(html).toContain("Jejak Malaysia di angkasa");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF3Chapter10VisualNotesBlock, {
        content: scienceF3C10InteractiveDLP,
        lang: "en",
      }),
    );
    expect(html).toContain("Space Exploration");
    expect(html).not.toContain("Three astronomers, three Solar System models");
    expect(html).toContain("Ptolemy&#x27;s geocentric model infographic");
    expect(html).not.toContain("From primitive rockets to RazakSAT");
    expect(html).not.toContain("Remote sensing: data without touching the target");
    expect(html).toContain("Malaysia&#x27;s trail in space");
  });
});
