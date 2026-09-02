import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo5Content } from "@/content/form1/geography/chapter-5/geo5-content";
import { GeoChapter5NotesBlock } from "./GeoChapter5NotesBlock";

describe("GeoChapter5NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 5 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter5NotesBlock, {
        id: "geography-notes-content",
        content: geo5Content,
      }),
    );

    expect(html).toContain("Bumi: sistem, struktur dan kuasa yang membentuknya");
    expect(html).toContain("71% air");
    expect(html).toContain("Atmosfera");
    expect(html).toContain("Troposfera → Stratosfera → Mesosfera → Termosfera → Eksosfera");
    expect(html).toContain("SIAL");
    expect(html).toContain("Tujuh benua");
    expect(html).toContain("Lautan Pasifik");
    expect(html).toContain("Salah satu laluan pelayaran terpenting di dunia");
    expect(html).toContain("Hanyutan benua");
    expect(html).toContain("Gunung Lipat");
    expect(html).toContain("Gunung Berapi");
    expect(html).toContain("Tsunami");
    expect(html).toContain('id="geography-notes-content"');
    expect(html.split('src="/geography/earth-structure.png"').length - 1).toBe(1);
    expect(html.split('src="/geography/gunung-lipat.png"').length - 1).toBe(1);
    expect(html.split('src="/geography/gunung-bongkah.png"').length - 1).toBe(1);
  });
});
