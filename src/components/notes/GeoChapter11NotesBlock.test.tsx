import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo11Content } from "@/content/form1/geography/chapter-11/geo11-content";
import { GeoChapter11NotesBlock } from "./GeoChapter11NotesBlock";

describe("GeoChapter11NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 11 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter11NotesBlock, {
        id: "geography-notes-content",
        content: geo11Content,
      }),
    );

    expect(html).toContain("Asia Tenggara: manusia, bandar dan ruang kehidupan");
    expect(html).toContain("Melebihi 640 juta orang");
    expect(html).toContain("260,834,826");
    expect(html).toContain("Brunei Darussalam");
    expect(html).toContain("Program transmigrasi Indonesia");
    expect(html).toContain("kira-kira 60% penduduk Indonesia");
    expect(html).toContain("Pusat Perdagangan &amp; Kewangan");
    expect(html).toContain("Venice Timur");
    expect(html).toContain("Bandar Raya Singapura");
    expect(html).toContain("Masalah bandar raya padat");
    expect(html).toContain("Membina bandar baharu untuk menyuraikan kepadatan");
    expect(html).toContain('id="geography-notes-content"');
    for (const density of ["padat", "sederhana padat", "jarang"]) {
      expect(html.split(`aria-label="Taburan penduduk ${density}"`).length - 1).toBe(1);
    }
  });
});
