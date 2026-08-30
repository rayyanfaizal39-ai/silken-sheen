import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter8VisualNotesBlock } from "./ScienceF3Chapter8VisualNotesBlock";
import { scienceF3C8Interactive } from "@/content/form3/science/chapter-8/interactive";
import { projectF3Interactive } from "@/content/form3/science/project-bilingual";

const scienceF3C8InteractiveBM = projectF3Interactive(scienceF3C8Interactive, "bm");
const scienceF3C8InteractiveDLP = projectF3Interactive(scienceF3C8Interactive, "dlp");

describe("ScienceF3Chapter8VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter8VisualNotesBlock, { id: "science-notes-content", content: scienceF3C8InteractiveBM, lang: "bm" }));
    expect(html).toContain("Lihat yang tidak kelihatan");
    expect(html).toContain("Tiga penemuan membuka dunia atom");
    expect(html).toContain("Separuh hayat: separuh, kemudian separuh lagi");
    expect(html).toContain("Cas atom berubah apabila elektron bergerak");
    expect(html).toContain("Satu fenomena, enam bidang");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in English", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter8VisualNotesBlock, { content: scienceF3C8InteractiveDLP, lang: "en" }));
    expect(html).toContain("See the invisible");
    expect(html).toContain("Three discoveries opened the atomic world");
    expect(html).toContain("Half-life: halve it, then halve it again");
    expect(html).toContain("An atom&#x27;s charge changes when electrons move");
    expect(html).toContain("One phenomenon, six fields");
  });
});
