import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo7Content } from "@/content/form1/geography/chapter-7/geo7-content";
import { GeoChapter7NotesBlock } from "./GeoChapter7NotesBlock";

describe("GeoChapter7NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 7 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter7NotesBlock, {
        id: "geography-notes-content",
        content: geo7Content,
      }),
    );

    expect(html).toContain("Saliran di Malaysia: perjalanan sungai dari hulu ke muara");
    expect(html).toContain("Peringkat Hulu Sungai");
    expect(html).toContain("hakisan menegak");
    expect(html).toContain("likuan terpenggal");
    expect(html).toContain("dataran rendah yang luas");
    expect(html).toContain("Sungai Rajang");
    expect(html).toContain("563 km");
    expect(html).toContain("Tasik Temenggor");
    expect(html).toContain("Tasik buatan manusia terbesar di Asia Tenggara");
    expect(html).toContain("Pengangkutan dan Perhubungan");
    expect(html).toContain("Rekreasi dan Pelancongan");
    expect(html).toContain("Takungan air semula jadi menyokong bekalan air");
    expect(html).toContain('id="geography-notes-content"');
    expect(html.split('src="/geography/tiga-peringkat-aliran-sungai.png"').length - 1).toBe(1);
    expect(html.split('src="/geography/pembentukan-tasik-ladam.png"').length - 1).toBe(1);
    expect(html.split('src="/geography/pembentukan-delta.png"').length - 1).toBe(1);
  });
});
