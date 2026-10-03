// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import {
  chapter8Content,
  chapter8Supplement,
} from "@/content/form1/science/chapter-8/chapter8-content";
import { ScienceF1Chapter8VisualNotesBlock } from "./ScienceF1Chapter8VisualNotesBlock";

describe("8.7 colour teaching refinement", () => {
  for (const lang of ["en", "bm"] as const) {
    it(`${lang}: renders the authorised additions and preserves every mixing interaction and filter`, () => {
      Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
      const host = document.createElement("div");
      const root = createRoot(host);
      const data = chapter8Content[lang].colorAdditionSubtraction;
      try {
        act(() =>
          root.render(
            createElement(ScienceF1Chapter8VisualNotesBlock, { content: chapter8Content, lang }),
          ),
        );
        expect(host.querySelectorAll("[data-colour-refinement]")).toHaveLength(4);
        for (const field of [
          "additionDefinition",
          "subtractionDefinition",
          "additionEverydayExample",
          "additionSubtractionComparison",
        ] as const) {
          expect(host.querySelector(`[data-colour-refinement="${field}"]`)?.textContent).toBe(
            data[field],
          );
        }
        expect(data.subtractionDefinition).toContain(
          lang === "en" ? "absorbed or blocked" : "diserap atau dihalang",
        );
        expect(data.additionEverydayExample).toContain(
          lang === "en" ? "red, green and blue" : "merah, hijau dan biru",
        );
        const section = host.querySelector("#chapter8-87")!;
        expect(data.additionDefinition).toBe(
          lang === "en"
            ? "Addition of light occurs when two or more primary coloured lights are combined to produce another colour."
            : "Penambahan cahaya berlaku apabila dua atau lebih cahaya berwarna primer digabungkan untuk menghasilkan warna lain.",
        );
        const categories = section.querySelector("[data-light-colour-categories]")!;
        expect([...categories.querySelectorAll("dt")].map((n) => n.textContent)).toEqual(
          lang === "en"
            ? ["Primary colours of light", "Secondary colours of light"]
            : ["Warna primer cahaya", "Warna sekunder cahaya"],
        );
        expect([...categories.querySelectorAll("dd")].map((n) => n.textContent)).toEqual(
          lang === "en"
            ? ["Red · Green · Blue", "Yellow · Magenta · Cyan"]
            : ["Merah · Hijau · Biru", "Kuning · Magenta · Sian"],
        );
        const expectedMixes =
          lang === "en"
            ? [
                ["Red", "Blue", "Magenta"],
                ["Red", "Green", "Yellow"],
                ["Blue", "Green", "Cyan"],
              ]
            : [
                ["Merah", "Biru", "Magenta"],
                ["Merah", "Hijau", "Kuning"],
                ["Biru", "Hijau", "Sian"],
              ];
        expect(data.additionFormula.map((m) => [m.color1, m.color2, m.result])).toEqual(
          expectedMixes,
        );
        expect(data.allThreeMixed).toBe(
          lang === "en" ? "Red + Blue + Green = White" : "Merah + Biru + Hijau = Putih",
        );
        const definition = section.querySelector('[data-colour-refinement="additionDefinition"]')!;
        expect(
          categories.compareDocumentPosition(definition) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
        expect(
          definition.compareDocumentPosition(section.querySelector("button")!) &
            Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
        for (const mix of data.additionFormula) {
          const button = [...section.querySelectorAll("button")].find(
            (el) => el.textContent === `${mix.color1} + ${mix.color2}`,
          )!;
          expect(button).toBeTruthy();
          act(() => button.click());
          expect(section.querySelector('[role="tabpanel"]')?.textContent).toBe(
            `${mix.color1}+${mix.color2}=${mix.result}`,
          );
        }
        expect(section.textContent).toContain(data.allThreeMixed);
        for (const filter of chapter8Supplement[lang].filters) {
          expect(host.textContent).toContain(filter.rule);
          filter.examples.forEach((example) => expect(host.textContent).toContain(example));
        }
        for (const row of chapter8Supplement[lang].filterMatrix)
          expect(host.textContent).toContain(row.reason);
        const rules = section.querySelector("[data-colour-filter-rules]")!;
        const worked = section.querySelector("[data-worked-filter-example]")!;
        const matrix = section.querySelector("[data-filter-matrix]")!;
        expect(section.querySelectorAll("[data-worked-filter-example]")).toHaveLength(1);
        expect(rules.textContent).toContain(chapter8Supplement[lang].filterGate);
        expect(
          [...worked.querySelectorAll("li > span:last-child")].map((n) => n.textContent),
        ).toEqual(
          lang === "en"
            ? ["White light", "Red filter", "Red light", "Cyan filter", "No light", "Black / Dark"]
            : [
                "Cahaya putih",
                "Penapis merah",
                "Cahaya merah",
                "Penapis sian",
                "Tiada cahaya",
                "Hitam / Gelap",
              ],
        );
        expect(worked.textContent).toContain(chapter8Supplement[lang].workedFilter.explanation);
        expect(worked.querySelector("[data-both-filter-rule]")?.textContent).toBe(
          lang === "en"
            ? "When two filters are used, only colours that can pass through BOTH filters reach the screen."
            : "Apabila dua penapis digunakan, hanya warna yang boleh melalui KEDUA-DUA penapis akan sampai ke skrin.",
        );
        expect(
          rules.compareDocumentPosition(worked) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
        expect(
          worked.compareDocumentPosition(matrix) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
        const expectedRows =
          lang === "en"
            ? [
                ["Red", "Yellow", "Red"],
                ["Red", "Magenta", "Red"],
                ["Red", "Cyan", "Black"],
                ["Green", "Yellow", "Green"],
                ["Green", "Magenta", "Black"],
                ["Green", "Cyan", "Green"],
                ["Blue", "Yellow", "Black"],
                ["Blue", "Magenta", "Blue"],
                ["Blue", "Cyan", "Blue"],
              ]
            : [
                ["Merah", "Kuning", "Merah"],
                ["Merah", "Magenta", "Merah"],
                ["Merah", "Sian", "Hitam"],
                ["Hijau", "Kuning", "Hijau"],
                ["Hijau", "Magenta", "Hitam"],
                ["Hijau", "Sian", "Hijau"],
                ["Biru", "Kuning", "Hitam"],
                ["Biru", "Magenta", "Biru"],
                ["Biru", "Sian", "Biru"],
              ];
        const rows = [...matrix.querySelectorAll("tbody tr")];
        expect(rows).toHaveLength(9);
        expect(
          rows.map((row) => [...row.querySelectorAll("td")].slice(0, 3).map((n) => n.textContent)),
        ).toEqual(expectedRows);
        expect(
          matrix.querySelector("table")?.parentElement?.classList.contains("overflow-x-auto"),
        ).toBe(true);
        expect(section.querySelector('[role="tabpanel"]')?.classList.contains("flex-wrap")).toBe(
          true,
        );
        const objectRows = [...section.querySelectorAll("table")[0].querySelectorAll("tbody tr")];
        expect(
          objectRows.map((row) => [...row.querySelectorAll("td")].map((n) => n.textContent)),
        ).toEqual(
          chapter8Supplement[lang].objectColourRows.map((row) => [
            row.object,
            row.incident,
            row.reflected,
            row.absorbed,
          ]),
        );
        expect(section.querySelectorAll("img,image")).toHaveLength(0);
        expect(worked.querySelectorAll("svg")).toHaveLength(0);
      } finally {
        act(() => root.unmount());
      }
    });
  }
});
