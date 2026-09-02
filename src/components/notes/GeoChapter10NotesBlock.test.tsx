import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo10Content } from "@/content/form1/geography/chapter-10/geo10-content";
import { GeoChapter10NotesBlock } from "./GeoChapter10NotesBlock";

describe("GeoChapter10NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 10 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter10NotesBlock, {
        id: "geography-notes-content",
        content: geo10Content,
      }),
    );

    expect(html).toContain("Asia Tenggara: landskap yang menghubungkan sebuah rantau");
    expect(html).toContain("4 506 600 km²");
    expect(html).toContain("Timor Leste");
    expect(html).toContain("Dataran Tinggi Korat (Thailand)");
    expect(html).toContain("Dataran Tinggi Shan (Myanmar)");
    expect(html).toContain("Laos ialah negara daratan tanpa pantai");
    expect(html).toContain("Sungai Mekong · 4 880 km");
    expect(html).toContain("lebih 90 juta penduduk");
    expect(html).toContain("10 000 km²");
    expect(html).toContain("Tasik Kenyir");
    expect(html).toContain("penjanaan kuasa hidroelektrik");
    expect(html).toContain('id="geography-notes-content"');
    for (const diagram of ["tanah tinggi", "tanah pamah", "pinggir laut", "gunung berapi"]) {
      expect(html.split(`aria-label="Rajah kawasan ${diagram}"`).length - 1).toBe(1);
    }
  });
});
