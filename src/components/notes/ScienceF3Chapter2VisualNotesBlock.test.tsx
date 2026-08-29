import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter2VisualNotesBlock } from "./ScienceF3Chapter2VisualNotesBlock";
import { scienceF3C2InteractiveBM } from "@/content/form3/science/chapter-2/interactive-bm";
import { scienceF3C2InteractiveDLP } from "@/content/form3/science/chapter-2/interactive-dlp";

describe("ScienceF3Chapter2VisualNotesBlock", () => {
  it("renders the Malay air-to-gas-exchange journey", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter2VisualNotesBlock, { id: "science-notes-content", content: scienceF3C2InteractiveBM, lang: "bm" }));
    expect(html).toContain("Fahami perjalanan gas yang mengekalkan kehidupan");
    expect(html).toContain("2.1 Sistem Respirasi Manusia");
    expect(html).toContain("Isi padu mengubah tekanan");
    expect(html).toContain("Eksperimen 2.1A");
    expect(html).toContain("Jejaki O₂ ke sel");
    expect(html).toContain("Eksperimen 2.2");
    expect(html).toContain("Habitat berbeza");
    expect(html).toContain("Pencemaran mengganggu");
    expect(html).toContain("id=\"science-notes-content\"");
  });

  it("renders the same learning journey in English", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter2VisualNotesBlock, { content: scienceF3C2InteractiveDLP, lang: "en" }));
    expect(html).toContain("Understand the gas journey that sustains life");
    expect(html).toContain("2.1 Human Respiratory System");
    expect(html).toContain("Volume changes pressure");
    expect(html).toContain("Experiment 2.1A");
    expect(html).toContain("Trace O₂ to cells");
    expect(html).toContain("Experiment 2.2");
    expect(html).toContain("Different habitats");
    expect(html).toContain("Pollution disrupts");
  });
});
