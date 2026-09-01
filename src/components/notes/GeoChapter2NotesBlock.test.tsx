import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo2Content } from "@/content/form1/geography/chapter-2/geo2-content";
import { GeoChapter2NotesBlock } from "./GeoChapter2NotesBlock";

describe("GeoChapter2NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 2 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter2NotesBlock, {
        id: "geography-notes-content",
        content: geo2Content,
      }),
    );

    expect(html).toContain("Kedudukan: daripada rujukan kepada koordinat");
    expect(html).toContain("Kedudukan relatif berubah bersama titik rujukan");
    expect(html).toContain("Garisan Khatulistiwa · 0°");
    expect(html).toContain("Garisan Tarikh Antarabangsa terletak pada 180° T/B");
    expect(html).toContain("LATITUD → LONGITUD");
    expect(html).toContain("4°U 102°T");
    expect(html).toContain("Sistem Kedudukan Global");
    expect(html).toContain("GIS digunakan untuk mengurus");
    expect(html).toContain('id="geography-notes-content"');
  });
});
