import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter9VisualNotesBlock } from "./ScienceF3Chapter9VisualNotesBlock";
import { scienceF3C9Interactive } from "@/content/form3/science/chapter-9/interactive";
import { projectF3Interactive } from "@/content/form3/science/project-bilingual";

const scienceF3C9InteractiveBM = projectF3Interactive(scienceF3C9Interactive, "bm");
const scienceF3C9InteractiveDLP = projectF3Interactive(scienceF3C9Interactive, "dlp");

describe("ScienceF3Chapter9VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter9VisualNotesBlock, { id: "science-notes-content", content: scienceF3C9InteractiveBM, lang: "bm" }));
    expect(html).toContain("Dari denyutan Matahari ke sistem di Bumi");
    expect(html).toContain("Enam lapisan, satu aliran tenaga");
    expect(html).toContain("Tujuh wajah Matahari yang aktif");
    expect(html).toContain("Magnetosfera ialah perisai dinamik");
    expect(html).toContain("Lebih banyak tompok, lebih aktif cuaca angkasa");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in English", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter9VisualNotesBlock, { content: scienceF3C9InteractiveDLP, lang: "en" }));
    expect(html).toContain("From the Sun&#x27;s pulse to systems on Earth");
    expect(html).toContain("Six layers, one energy flow");
    expect(html).toContain("Seven faces of an active Sun");
    expect(html).toContain("The magnetosphere is a dynamic shield");
    expect(html).toContain("More sunspots, more active space weather");
  });
});
