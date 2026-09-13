import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MiniInvestigation } from "../science/ScienceDiscoveryChrome";
import { ScienceF3Chapter6VisualNotesBlock } from "./ScienceF3Chapter6VisualNotesBlock";
import { scienceF3C6InteractiveBM } from "@/content/form3/science/chapter-6/interactive-bm";
import { scienceF3C6InteractiveDLP } from "@/content/form3/science/chapter-6/interactive-dlp";

describe("ScienceF3Chapter6VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF3Chapter6VisualNotesBlock, {
        id: "science-notes-content",
        content: scienceF3C6InteractiveBM,
        lang: "bm",
      }),
    );

    for (const section of scienceF3C6InteractiveBM.sections) {
      expect(html).toContain(section.title);
    }
    expect(html.replace(/<[^>]*>/g, "")).not.toMatch(/10%|50%|90%|2, 4, 6, 8/);
    expect(html).toContain("P = VI");
    expect(html).toContain("E = Pt");
    expect(html).toContain("0.24");
    expect(html).toContain("RM0.218/unit");
    expect(html).not.toContain("Fahami perjalanan tenaga elektrik");
    expect(html).not.toContain("Arus aruhan bermula dengan gerakan");
    expect(html).not.toContain("tidak akan habis");
    expect(html).toContain("nilai tarif contoh");
    expect(html).toContain("id=\"science-notes-content\"");
  });

  it("renders the same visual-learning path in English", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF3Chapter6VisualNotesBlock, {
        content: scienceF3C6InteractiveDLP,
        lang: "en",
      }),
    );

    for (const section of scienceF3C6InteractiveDLP.sections) {
      expect(html).toContain(section.title);
    }
    expect(html.replace(/<[^>]*>/g, "")).not.toMatch(/10%|50%|90%|2, 4, 6, 8/);
    expect(html).toContain("P = VI");
    expect(html).toContain("E = Pt");
    expect(html).toContain("0.24");
    expect(html).toContain("RM0.218/unit");
    expect(html).not.toContain("Understand the journey");
    expect(html).not.toContain("will not be used up");
    expect(html).toContain("example tariff value");
  });
});


describe("Chapter 6 source-fidelity cleanup", () => {
  it.each(["bm", "en"] as const)("hides only the requested shared headings in %s", (lang) => {
    const hidden = renderToStaticMarkup(createElement(MiniInvestigation, { lang, hideHeading: true }));
    const normal = renderToStaticMarkup(createElement(MiniInvestigation, { lang }));
    expect(hidden).not.toContain("science-mini-investigation-heading");
    expect(hidden).toContain("science-mini-question");
    expect(normal).toContain("science-mini-investigation-heading");
  });

  it("keeps BM/DLP section and numerical parity", () => {
    const contents = [scienceF3C6InteractiveBM, scienceF3C6InteractiveDLP];
    expect(contents[0].sections.map(s => s.number)).toEqual(contents[1].sections.map(s => s.number));
    for (const content of contents) {
      expect(JSON.stringify(content)).not.toMatch(/10%|90%|will never deplete|dan tidak akan habis/);
    }
    const render = (lang: "bm" | "en", content: typeof contents[number]) =>
      renderToStaticMarkup(createElement(ScienceF3Chapter6VisualNotesBlock, { lang, content }));
    const numbers = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/&[^;]+;/g, " ").match(/\d+(?:\.\d+)?/g);
    expect(numbers(render("bm", contents[0]))).toEqual(numbers(render("en", contents[1])));
  });
});
