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
    expect(html).toContain("Tenaga dan Kuasa");
    expect(html).toContain("Kerja, tenaga dan kuasa, tenaga keupayaan dan tenaga kinetik, serta prinsip keabadian tenaga.");
    expect(html).toContain("7.1 Kerja, Tenaga dan Kuasa");
    expect(html).toContain("7.2 Tenaga Keupayaan dan Tenaga Kinetik");
    expect(html).toContain("7.3 Prinsip Keabadian Tenaga");
    expect(html).toContain("Definisi dan Konsep Tenaga");
    expect(html).toContain("Definisi dan Konsep Kuasa");
    expect(html).toContain("Aktiviti Inkuiri 7.1");
    expect(html).toContain("Hubungan Kerja dengan Tenaga Keupayaan Kenyal");
    expect(html).toContain("Masalah Numerikal Pengiraan Keabadian Tenaga");
    expect(html).toContain("Murid yang mempunyai berat badan 400 N membawa beban seberat 100 N menaiki tangga dengan tinggi tegak 3 m.");
    expect(html).not.toContain("P = 1,500 ÷ 10 = 150 W");
    expect(html).not.toContain("Tenaga bergerak, kerja berlaku");
    expect(html).not.toContain("Tiga wajah tenaga mekanikal");
    expect(html).not.toContain("Cabaran keabadian");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in English", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter7VisualNotesBlock, { content: scienceF3C7InteractiveDLP, lang: "en" }));
    expect(html).toContain("Energy and Power");
    expect(html).toContain("7.1 Work, Energy and Power");
    expect(html).toContain("7.2 Potential Energy and Kinetic Energy");
    expect(html).toContain("7.3 Principle of Conservation of Energy");
    expect(html).toContain("Definition and Concept of Energy");
    expect(html).toContain("Definition and Concept of Power");
    expect(html).toContain("Inquiry Activity 7.1");
    expect(html).toContain("Relationship between Work and Elastic Potential Energy");
    expect(html).toContain("Numerical Problem on the Conservation of Energy");
    expect(html).not.toContain("Energy moves, work happens");
    expect(html).not.toContain("Three faces of mechanical energy");
    expect(html).not.toContain("Conservation challenge");
  });
});
