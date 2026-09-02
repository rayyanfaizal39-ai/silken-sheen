import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo6Content } from "@/content/form1/geography/chapter-6/geo6-content";
import { GeoChapter6NotesBlock } from "./GeoChapter6NotesBlock";

describe("GeoChapter6NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 6 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter6NotesBlock, {
        id: "geography-notes-content",
        content: geo6Content,
      }),
    );

    expect(html).toContain("Bentuk muka Bumi Malaysia: daripada puncak ke pinggir laut");
    expect(html).toContain("tanah tinggi, tanah pamah, pinggir laut dan saliran");
    expect(html).toContain("180 m");
    expect(html).toContain("Gunung Kinabalu");
    expect(html).toContain("4,095 m");
    expect(html).toContain("Delta Segama");
    expect(html).toContain("Pentas Sunda");
    expect(html).toContain("Batu sisa");
    expect(html).toContain("Tasik Bera, Pahang");
    expect(html).toContain("Tasik Kenyir, Terengganu");
    expect(html).toContain("Bekalan air domestik dan industri");
    expect(html).toContain("Penambakan pinggir laut");
    expect(html).toContain('id="geography-notes-content"');
    expect(html.split('src="/geography/tanah-tinggi-vs-pamah.png"').length - 1).toBe(1);
    expect(html.split('src="/geography/perbandingan-ketinggian-puncak.png"').length - 1).toBe(1);
    expect(html.split('src="/geography/ciri-pinggir-laut.png"').length - 1).toBe(1);
  });
});
