import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter5VisualNotesBlock } from "./ScienceF3Chapter5VisualNotesBlock";
import { scienceF3C5InteractiveBM } from "@/content/form3/science/chapter-5/interactive-bm";
import { scienceF3C5InteractiveDLP } from "@/content/form3/science/chapter-5/interactive-dlp";

describe("ScienceF3Chapter5VisualNotesBlock", () => {
  it("renders the complete Malay thermochemistry learning path", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter5VisualNotesBlock, { id: "science-notes-content", content: scienceF3C5InteractiveBM, lang: "bm" }));
    expect(html).toContain("Fahami arah aliran haba");
    expect(html).toContain("Eksotermik atau endotermik? Ikut anak panah haba");
    expect(html).toContain("Aktiviti Inkuiri 5.1");
    expect(html).toContain("Empat campuran, satu kaedah pengelasan");
    expect(html).toContain("Pek segera: pilih hasil yang diperlukan dahulu");
    expect(html).toContain("Tindak balas termit");
    expect(html).toContain("Termokimia dan suhu Bumi");
    expect(html).toContain("id=\"science-notes-content\"");
  });

  it("renders the same learning path in English", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter5VisualNotesBlock, { content: scienceF3C5InteractiveDLP, lang: "en" }));
    expect(html).toContain("Understand the direction of heat flow");
    expect(html).toContain("Exothermic or endothermic? Follow the heat arrows");
    expect(html).toContain("Inquiry Activity 5.1");
    expect(html).toContain("Four mixtures, one classification method");
    expect(html).toContain("Instant packs: choose the needed effect first");
    expect(html).toContain("Thermite reaction");
    expect(html).toContain("Thermochemistry and Earth&#x27;s temperature");
  });
});
