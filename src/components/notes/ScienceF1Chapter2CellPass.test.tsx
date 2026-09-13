import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import { chapter2Organelles } from "@/content/form1/science/chapter-2/chapter2-canonical";
import { ScienceF1Chapter2VisualNotesBlock } from "./ScienceF1Chapter2VisualNotesBlock";

// Exercise every selector state in the actual live renderer; not browser-click QA.
const selection = vi.hoisted(() => ({ index: 0, calls: 0 }));
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: (initial: unknown) => {
      const result = actual.useState(initial);
      return selection.calls++ === 0 ? [selection.index, result[1]] : result;
    },
  };
});

function render(lang: "bm" | "en", index = 0, content = chapter2Content) {
  selection.index = index;
  selection.calls = 0;
  return renderToStaticMarkup(createElement(ScienceF1Chapter2VisualNotesBlock, { lang, content }));
}
function diagram(html: string, type: string) {
  const svg = html.match(
    new RegExp(`<svg[^>]*data-cell-diagram="${type}"[^>]*>[\\s\\S]*?<\\/svg>`),
  )?.[0];
  expect(svg).toBeTruthy();
  return svg!;
}

describe("Chapter 2 pass 1 in the live notes renderer", () => {
  for (const lang of ["bm", "en"] as const) {
    it.each(chapter2Organelles.map((_, i) => i))(
      `${lang}: structure %i highlights only its correct cell membership`,
      (index) => {
        const html = render(lang, index);
        const selected = chapter2Organelles[index];
        for (const structure of chapter2Organelles) {
          expect(html).toContain(`data-structure-selector="${structure.id}"`);
          expect(html).toContain(structure.name[lang]);
        }
        expect(html).toContain(selected.function[lang]);
        expect(html).toContain(`aria-pressed="true" data-structure-selector="${selected.id}"`);
        for (const [type, membership] of [
          ["animal", "inAnimal"],
          ["plant", "inPlant"],
        ] as const) {
          const svg = diagram(html, type);
          const expected = chapter2Organelles.filter((s) => s[membership]);
          expect(
            [...svg.matchAll(/data-cell-structure="([^"]+)"/g)].map((m) => m[1]).sort(),
          ).toEqual(expected.map((s) => s.id).sort());
          expect(
            [...svg.matchAll(/data-cell-structure="([^"]+)" data-highlighted="true"/g)].map(
              (m) => m[1],
            ),
          ).toEqual(selected[membership] ? [selected.id] : []);
          expect(svg).toContain('opacity="0.6"');
        }
        expect(html).toContain(
          lang === "en" ? "small temporary vacuoles" : "vakuol sementara yang kecil",
        );
        expect(html).toContain(
          lang === "en" ? "Large permanent vacuole" : "Vakuol kekal yang besar",
        );
      },
    );

    it(`${lang}: renders both visual protocols, cover-slip geometry and limited field views`, () => {
      const html = render(lang);
      for (const [type, count] of [
        ["onion", 7],
        ["cheek", 6],
      ] as const) {
        const sequence = html.match(
          new RegExp(`<section[^>]*data-slide-sequence="${type}"[\\s\\S]*?<\\/section>`),
        )![0];
        expect(sequence.match(/data-preparation-stage=/g)).toHaveLength(count);
        for (const stage of ["sample", "water", "stain", "cover", "blot", "low"])
          expect(sequence).toContain(`data-preparation-stage="${stage}"`);
        const field = html.match(
          new RegExp(`<svg[^>]*data-microscope-field="${type}"[\\s\\S]*?<\\/svg>`),
        )![0];
        expect(field).toContain("clipPath");
        expect(field).not.toMatch(/mitochondria|chloroplast|data-cell-structure/);
      }
      expect(html).toContain('data-cover-slip="wrong"');
      expect(html).toContain('data-cover-slip="correct"');
      expect(html).toContain('d="M74 113 L151 36"'); // Actually inclined at 45°, not just a caption.
      expect(html).toContain("45°");
      expect(html).toContain(lang === "en" ? "filter paper" : "kertas turas");
      expect(html).toContain(lang === "en" ? "methylene blue" : "metilena biru");
      expect(html).toContain(lang === "en" ? "iodine solution" : "larutan iodin");
      expect(html).toContain(
        lang === "en"
          ? "does not prove practical completion"
          : "tidak membuktikan amali telah diselesaikan",
      );
      expect(html).toContain(
        lang === "en"
          ? "compare their visible structures"
          : "bandingkan struktur yang dapat dilihat",
      );
      expect(html).toContain(lang === "en" ? "Not every structure" : "Bukan semua struktur");
    });
  }
  it.each(chapter2Organelles.map((_, i) => i))(
    "BM and DLP have identical diagram geometry in selector state %i",
    (index) => {
      const geometry = (lang: "bm" | "en") =>
        [
          ...render(lang, index).matchAll(
            /<svg[^>]*data-(?:cell-diagram|preparation-stage|cover-slip|microscope-field)=[\s\S]*?<\/svg>/g,
          ),
        ].map((m) =>
          m[0]
            .match(/<(?:path|rect|circle|ellipse|g|line)[^>]*>/g)
            ?.map((tag) => tag.replace(/clip-path="[^"]*"/g, "")),
        );
      expect(geometry("bm")).toEqual(geometry("en"));
    },
  );
  it("uses supplied canonical names/functions/membership instead of another organelle dataset", () => {
    const modified = structuredClone(chapter2Content);
    for (const lang of ["bm", "en"] as const) {
      modified[lang].cellStructures[0].name = `CANONICAL-${lang}`;
      modified[lang].cellStructures[0].function = `FUNCTION-${lang}`;
      modified[lang].cellStructures[0].inAnimal = false;
      const html = render(lang, 0, modified);
      expect(html).toContain(`CANONICAL-${lang}`);
      expect(html).toContain(`FUNCTION-${lang}`);
      expect(diagram(html, "animal")).not.toContain('data-cell-structure="nucleus"');
      expect(diagram(html, "plant")).toContain('data-cell-structure="nucleus"');
    }
    const source = readFileSync(
      new URL("./blocks/Chapter2CellDiagrams.tsx", import.meta.url),
      "utf8",
    );
    expect(source).not.toMatch(/function:\s*["{]|inAnimal:\s*(true|false)|inPlant:\s*(true|false)/);
    for (const organelle of chapter2Organelles) {
      expect(source).not.toContain(organelle.function.bm);
      expect(source).not.toContain(organelle.function.en);
    }
  });
});
