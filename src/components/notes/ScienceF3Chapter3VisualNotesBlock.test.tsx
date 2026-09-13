import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter3VisualNotesBlock } from "./ScienceF3Chapter3VisualNotesBlock";
import { ScienceF3InteractiveNotesBlock } from "./ScienceF3InteractiveNotesBlock";
import { scienceF3ChapterContent } from "@/content/form3/science/registration";
import { chapter3Headings, chapter3Lessons } from "@/content/form3/science/chapter-3/approved-notes";

describe("Chapter 3 approved Notes coverage", () => {
  it.each(["bm", "en"] as const)("renders all approved paragraphs and five official sections through the registered %s path", lang => {
    const registered = scienceF3ChapterContent.find(c => c.chapterKey === "Chapter 3" && c.lang === (lang === "bm" ? "bm" : "dlp"))!;
    const content = registered.sciF3InteractiveData!;
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter3VisualNotesBlock, { id: "science-notes-content", content, lang }));
    for (const item of chapter3Lessons) {
      expect(html).toContain(`data-lesson="${item.id}"`);
      for (const paragraph of item.paragraphs[lang]) {
        const escaped = renderToStaticMarkup(createElement("p", null, paragraph)).slice(3, -4);
        expect(html).toContain(escaped);
      }
      expect(item.paragraphs.bm.length).toBe(item.paragraphs.en.length);
    }
    chapter3Headings[lang].forEach((heading, i) => {
      expect(html).toContain(`3.${i + 1} ${heading}`);
      expect(html).toContain(`data-section="3.${i + 1}"`);
    });
    expect(html.replace(/<[^>]*>/g, " ")).not.toMatch(/Master Coverage|NotebookLM|\[\d+(?:,\s*\d+)*\]|(?:Rajah|Jadual|Aktiviti|Activity|Experiment) 3\.\d|3\.[1-5]\.[0-9]|Pelembaban|Open · water|Terbuka · air/);
    const routed = renderToStaticMarkup(createElement(ScienceF3InteractiveNotesBlock, { content, lang, storageKey: "chapter3-test" }));
    expect(routed).toContain('data-chapter="3"');
    expect(routed).toContain('data-lesson="donation"');
    expect(routed).toContain('data-lesson="ringing"');
  });

  it.each(["bm", "en"] as const)("retains source structures and investigations in %s", lang => {
    const text = chapter3Lessons.flatMap(l => l.paragraphs[lang]).join(" ");
    const terms = lang === "bm" ? ["Amoeba sp.", "Euglena sp.", "Paramecium sp.", "JSTI", "vena kava superior", "vena kava inferior", "trikuspid", "bikuspid", "sfigmomanometer", "mengendur", "dimanipulasikan", "dimalarkan", "aglutinasi", "45 kg", "18–60", "Natrium sitrat", "hidatod", "kloroplas", "lignin", "tiub tapis", "translokasi", "eosin", "dua hingga tiga bulan"] : ["Amoeba sp.", "Euglena sp.", "Paramecium sp.", "surface-area-to-volume", "superior vena cava", "inferior vena cava", "Tricuspid", "Bicuspid", "sphygmomanometer", "ventricular muscles relax", "manipulated variable", "kept constant", "agglutination", "45 kg", "18–60", "Sodium citrate", "hydathodes", "chloroplasts", "lignin", "sieve tubes", "translocation", "eosin", "two to three months"];
    for (const term of terms) expect(text.toLowerCase()).toContain(term.toLowerCase());
  });
});
