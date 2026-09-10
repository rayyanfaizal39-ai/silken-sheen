import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter5VisualNotesBlock } from "./ScienceF3Chapter5VisualNotesBlock";
import { scienceF3C5InteractiveBM } from "@/content/form3/science/chapter-5/interactive-bm";
import { scienceF3C5InteractiveDLP } from "@/content/form3/science/chapter-5/interactive-dlp";

describe("ScienceF3Chapter5VisualNotesBlock", () => {
  it("renders the complete Malay thermochemistry learning path", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter5VisualNotesBlock, { id: "science-notes-content", content: scienceF3C5InteractiveBM, lang: "bm" }));
    expect(html).toContain("Termokimia");
    expect(html).toContain("Tindak balas endotermik dan eksotermik.");
    expect(html).toContain("Tindak Balas Endotermik dan Eksotermik");
    expect(html).toContain("Perbandingan dan Perbezaan Utama");
    expect(html).toContain("Aktiviti Inkuiri 5.1: Membandingkan Tindak Balas Eksotermik dan Endotermik");
    expect(html).toContain("Empat campuran, satu kaedah pengelasan");
    expect(html).toContain("Contoh Tindak Balas Eksotermik dan Endotermik dalam Kehidupan Harian");
    expect(html).toContain("Rekaan STEM dan Aplikasi Kejuruteraan Termokimia");
    expect(html).toContain("Aplikasi Industri: Tindak Balas Termit");
    expect(html).toContain("Isu Alam Sekitar: Pemanasan Global dan Fotosintesis");
    expect(html).not.toContain("Fahami arah aliran haba");
    expect(html).toContain("id=\"science-notes-content\"");
  });

  it("renders the same learning path in English", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter5VisualNotesBlock, { content: scienceF3C5InteractiveDLP, lang: "en" }));
    expect(html).toContain("Thermochemistry");
    expect(html).toContain("Endothermic and exothermic reactions.");
    expect(html).toContain("Endothermic and Exothermic Reactions");
    expect(html).toContain("Main Comparison and Differences");
    expect(html).toContain("Inquiry Activity 5.1: Comparing Exothermic and Endothermic Reactions");
    expect(html).toContain("Four mixtures, one classification method");
    expect(html).toContain("Examples of Exothermic and Endothermic Reactions in Daily Life");
    expect(html).toContain("STEM Design and Thermochemistry Engineering Applications");
    expect(html).toContain("Industrial Application: Thermite Reaction");
    expect(html).toContain("Environmental Issue: Global Warming and Photosynthesis");
    expect(html).not.toContain("Understand the direction of heat flow");
  });
});
