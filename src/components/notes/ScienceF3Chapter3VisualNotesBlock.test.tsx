import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter3VisualNotesBlock } from "./ScienceF3Chapter3VisualNotesBlock";
import { scienceF3C3InteractiveBM } from "@/content/form3/science/chapter-3/interactive-bm";
import { scienceF3C3InteractiveDLP } from "@/content/form3/science/chapter-3/interactive-dlp";

describe("ScienceF3Chapter3VisualNotesBlock", () => {
  it("renders the Malay cells-to-transport-system journey", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter3VisualNotesBlock, { id: "science-notes-content", content: scienceF3C3InteractiveBM, lang: "bm" }));
    expect(html).toContain("Fahami bagaimana bahan bergerak untuk mengekalkan kehidupan");
    expect(html).toContain("3.1 Sistem Pengangkutan dalam Organisma");
    expect(html).toContain("Bandingkan reka bentuk peredaran vertebrata");
    expect(html).toContain("Jejaki dua gelung jantung manusia");
    expect(html).toContain("Uji transfusi ABO");
    expect(html).toContain("Sel pengawal membuka dan menutup stoma");
    expect(html).toContain("Aktiviti 3.8");
    expect(html).toContain("Tujuan sama, reka bentuk berbeza");
    expect(html).toContain("id=\"science-notes-content\"");
  });

  it("renders the same learning journey in English", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter3VisualNotesBlock, { content: scienceF3C3InteractiveDLP, lang: "en" }));
    expect(html).toContain("Understand how substances move to sustain life");
    expect(html).toContain("3.1 Transport Systems in Organisms");
    expect(html).toContain("Compare vertebrate circulation designs");
    expect(html).toContain("Trace the human heart&#x27;s two loops");
    expect(html).toContain("Test ABO compatibility");
    expect(html).toContain("Guard cells open and close stomata");
    expect(html).toContain("Activity 3.8");
    expect(html).toContain("Same purpose, different design");
  });
});
