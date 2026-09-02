import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo8Content } from "@/content/form1/geography/chapter-8/geo8-content";
import { GeoChapter8NotesBlock } from "./GeoChapter8NotesBlock";

describe("GeoChapter8NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 8 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter8NotesBlock, {
        id: "geography-notes-content",
        content: geo8Content,
      }),
    );

    expect(html).toContain("Penduduk di Malaysia: membaca corak tumpuan manusia");
    expect(html).toContain("Taburan penduduk Malaysia tidak sekata");
    expect(html).toContain("Jumlah penduduk (orang)");
    expect(html).toContain("200 orang/km²");
    expect(html).toContain("Kawasan Berpenduduk Sederhana Padat");
    expect(html).toContain("Ulu Tembeling (Pahang)");
    expect(html).toContain("Banjaran Kapuas Hulu (Sarawak)");
    expect(html).toContain("Tanah Pamah");
    expect(html).toContain("Perindustrian");
    expect(html).toContain("Infrastruktur asas");
    expect(html).toContain("Pembukaan Kawasan Baharu (FELDA)");
    expect(html).toContain("Pembangunan Bandar Baharu");
    expect(html).toContain('id="geography-notes-content"');
    expect(html.split('aria-label="Taburan padat"').length - 1).toBe(1);
    expect(html.split('aria-label="Taburan sederhana padat"').length - 1).toBe(1);
    expect(html.split('aria-label="Taburan jarang"').length - 1).toBe(1);
  });
});
