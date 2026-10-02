// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import {
  chapter8Content,
  chapter8Supplement,
} from "@/content/form1/science/chapter-8/chapter8-content";
import { ScienceF1Chapter8VisualNotesBlock } from "./ScienceF1Chapter8VisualNotesBlock";

describe("8.7 small wording refinement", () => {
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
        const definition = section.querySelector('[data-colour-refinement="additionDefinition"]')!;
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
        expect(section.querySelectorAll("img")).toHaveLength(0);
      } finally {
        act(() => root.unmount());
      }
    });
  }
});
