import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter7VisualNotesBlock } from "./ScienceF3Chapter7VisualNotesBlock";
import { scienceF3C7Interactive } from "@/content/form3/science/chapter-7/interactive";
import { projectF3Interactive } from "@/content/form3/science/project-bilingual";

const scienceF3C7InteractiveBM = projectF3Interactive(scienceF3C7Interactive, "bm");
const scienceF3C7InteractiveDLP = projectF3Interactive(scienceF3C7Interactive, "dlp");

describe("ScienceF3Chapter7VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter7VisualNotesBlock, { id: "science-notes-content", content: scienceF3C7InteractiveBM, lang: "bm" }));
    expect(html).toContain("Tenaga bergerak, kerja berlaku");
    expect(html).toContain("Kerja hanya berlaku apabila daya menghasilkan sesaran");
    expect(html).toContain("Aktiviti Inkuiri 7.1");
    expect(html).toContain("Tiga wajah tenaga mekanikal");
    expect(html).toContain("pistol mainan");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in English", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter7VisualNotesBlock, { content: scienceF3C7InteractiveDLP, lang: "en" }));
    expect(html).toContain("Energy moves, work happens");
    expect(html).toContain("Work only happens when force produces displacement");
    expect(html).toContain("Inquiry Activity 7.1");
    expect(html).toContain("Three faces of mechanical energy");
    expect(html).toContain("Conservation challenge: toy gun");
  });
});
