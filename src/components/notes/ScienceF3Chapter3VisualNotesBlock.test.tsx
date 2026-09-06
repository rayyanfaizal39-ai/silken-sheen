import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter3VisualNotesBlock } from "./ScienceF3Chapter3VisualNotesBlock";
import { scienceF3C3InteractiveBM } from "@/content/form3/science/chapter-3/interactive-bm";
import { scienceF3C3InteractiveDLP } from "@/content/form3/science/chapter-3/interactive-dlp";

describe("ScienceF3Chapter3VisualNotesBlock", () => {
  it("renders the Malay cells-to-transport-system journey", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter3VisualNotesBlock, { id: "science-notes-content", content: scienceF3C3InteractiveBM, lang: "bm" }));
    expect(html).toContain("Pengangkutan");
    expect(html).toContain("Sistem pengangkutan dalam organisma, sistem peredaran darah, darah manusia, pengangkutan dalam tumbuhan, sistem peredaran darah dalam haiwan dan sistem pengangkutan dalam tumbuhan.");
    expect(html).toContain("3.1 Sistem Pengangkutan dalam Organisma");
    expect(html).toContain("Keperluan Sistem Pengangkutan dalam Organisma");
    expect(html).toContain("3.2 Sistem Peredaran Darah");
    expect(html).toContain("Sistem Peredaran Darah Haiwan Vertebrata");
    expect(html).toContain("3.3 Darah Manusia");
    expect(html).toContain("Komponen dan Kandungan Darah Manusia");
    expect(html).toContain("3.4 Pengangkutan dalam Tumbuhan");
    expect(html).toContain("3.5 Sistem Peredaran Darah dalam Haiwan dan Sistem Pengangkutan dalam Tumbuhan");
    expect(html).toContain("Jejaki dua gelung jantung manusia");
    expect(html).toContain("Uji transfusi ABO");
    expect(html).toContain("Sel pengawal membuka dan menutup stoma");
    expect(html).toContain("Aktiviti 3.8");
    expect(html).not.toContain("Fahami bagaimana bahan bergerak untuk mengekalkan kehidupan");
    expect(html).not.toContain("3.5 Haiwan berbanding Tumbuhan");
    expect(html).not.toContain("Tujuan sama, reka bentuk berbeza");
    expect(html).toContain("id=\"science-notes-content\"");
  });

  it("renders the same learning journey in English", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter3VisualNotesBlock, { content: scienceF3C3InteractiveDLP, lang: "en" }));
    expect(html).toContain("Transport");
    expect(html).toContain("Transport system in organisms, blood circulatory system, human blood, transport system in plants, blood circulatory system in animals and transport system in plants.");
    expect(html).toContain("3.1 Transport System in Organisms");
    expect(html).toContain("Need for a Transport System in Organisms");
    expect(html).toContain("3.2 Blood Circulatory System");
    expect(html).toContain("Blood Circulatory System of Vertebrates");
    expect(html).toContain("3.3 Human Blood");
    expect(html).toContain("Components and Constituents of Human Blood");
    expect(html).toContain("3.4 Transport System in Plants");
    expect(html).toContain("3.5 Blood Circulatory System in Animals and Transport System in Plants");
    expect(html).toContain("Trace the human heart&#x27;s two loops");
    expect(html).toContain("Test ABO compatibility");
    expect(html).toContain("Guard cells open and close stomata");
    expect(html).toContain("Activity 3.8");
    expect(html).not.toContain("Understand how substances move to sustain life");
  });
});
