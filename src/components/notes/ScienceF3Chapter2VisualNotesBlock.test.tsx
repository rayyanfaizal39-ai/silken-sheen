import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter2VisualNotesBlock } from "./ScienceF3Chapter2VisualNotesBlock";
import { scienceF3C2InteractiveBM } from "@/content/form3/science/chapter-2/interactive-bm";
import { scienceF3C2InteractiveDLP } from "@/content/form3/science/chapter-2/interactive-dlp";

describe("ScienceF3Chapter2VisualNotesBlock", () => {
  it("renders the Malay air-to-gas-exchange journey", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter2VisualNotesBlock, { id: "science-notes-content", content: scienceF3C2InteractiveBM, lang: "bm" }));
    expect(html).toContain("Respirasi");
    expect(html).toContain("Sistem respirasi, pergerakan dan pertukaran gas dalam badan manusia, kesihatan sistem respirasi manusia, adaptasi dalam sistem respirasi dan pertukaran gas dalam tumbuhan.");
    expect(html).toContain("2.1 Sistem Respirasi");
    expect(html).toContain("2.2 Pergerakan dan Pertukaran Gas di dalam Badan Manusia");
    expect(html).toContain("2.3 Kesihatan Sistem Respirasi Manusia");
    expect(html).toContain("2.4 Adaptasi dalam Sistem Respirasi");
    expect(html).toContain("2.5 Pertukaran Gas dalam Tumbuhan");
    expect(html).toContain("Laluan udara dari hidung ke peparu");
    expect(html).not.toContain("Altitud tinggi mempunyai kurang");
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
    expect(html).toContain("Respiration");
    expect(html).toContain("Human respiratory system, movement and exchange of gases in the human body, health of human respiratory system, adaptations in respiratory systems and gaseous exchange in plants.");
    expect(html).toContain("2.1 Human Respiratory System");
    expect(html).toContain("Air pathway from the nose to the lungs");
    expect(html).toContain("2.2 Movement and Exchange of Gases in the Human Body");
    expect(html).toContain("2.3 Health of Human Respiratory System");
    expect(html).toContain("2.4 Adaptations in Respiratory Systems");
    expect(html).toContain("2.5 Gaseous Exchange in Plants");
    expect(html).toContain("Volume changes pressure");
    expect(html).toContain("Experiment 2.1A");
    expect(html).toContain("Experiment 2.2");
    expect(html).toContain("Pollution disrupts");
    expect(html).not.toContain("High altitude has less");
    expect(html).not.toContain("Understand the gas journey that sustains life");
  });
});
