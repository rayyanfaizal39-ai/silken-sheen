import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { geo4Content } from "@/content/form1/geography/chapter-4/geo4-content";
import { GeoChapter4NotesBlock } from "./GeoChapter4NotesBlock";

describe("GeoChapter4NotesBlock", () => {
  it("renders the complete Geography Form 1 Chapter 4 learning path", () => {
    const html = renderToStaticMarkup(
      createElement(GeoChapter4NotesBlock, {
        id: "geography-notes-content",
        content: geo4Content,
      }),
    );

    expect(html).toContain("Lakaran Peta Malaysia: negeri, ibu negeri dan pentadbiran");
    expect(html).toContain("Laut China Selatan");
    expect(html).toContain("13</p>");
    expect(html).toContain("Kuala Lumpur · Putrajaya · Labuan");
    expect(html).toContain("Kota Kinabalu");
    expect(html).toContain("Pusat Pentadbiran Kerajaan Persekutuan");
    expect(html).toContain("Sediakan grid");
    expect(html).toContain("Peranan JUPEM");
    expect(html).toContain("Tajuk peta");
    expect(html).toContain('id="geography-notes-content"');
    expect(html.split('src="/geography/malaysia-map.png"').length - 1).toBe(1);
  });
});
