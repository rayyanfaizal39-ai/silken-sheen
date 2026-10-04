// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { chapter8Content } from "@/content/form1/science/chapter-8/chapter8-content";
import { ScienceF1Chapter8VisualNotesBlock } from "./ScienceF1Chapter8VisualNotesBlock";

describe("8.1–8.4 revision cleanup boundary", () => {
  it("preserves all canonical source data and the complete 8.5–8.7 implementation against pre-cleanup hashes", () => {
    // Content/root snapshots include the authorised 8.7 teaching refinement; visual QA adds mobile-only callout sizing and filter-matrix wrapping.
    const locks = {
      "src/content/form1/science/chapter-8/chapter8-content.ts":
        "74ab9ff8e5d6e08fa560e18cb14a0e586a80bd5fdc56de18ed06a2baed86e07f",
      "src/components/notes/Chapter8Dispersion.tsx":
        "3847282aba4c90fb549049a46c3171a7c7a299f832c35c412bd3f50353adc53e",
      "src/components/notes/Chapter8Scattering.tsx":
        "9db35631b73340e6feef776dd441758ecc83a38aa765104445f511e77d93de3a",
      "src/components/notes/ScienceF1Chapter8VisualNotesBlock.tsx":
        "62d00ee6abcf3373a0e37310545e04c81f6c19d4dc44bd767b8f5c4a96292149",
    };
    for (const [file, expected] of Object.entries(locks)) {
      expect(
        createHash("sha256")
          .update(readFileSync(file, "utf8").replace(/\r\n/g, "\n"))
          .digest("hex"),
      ).toBe(expected);
    }
  });
  for (const lang of ["en", "bm"] as const) {
    it(`${lang}: retains teaching outcomes without classroom worksheets in the actual chapter renderer`, () => {
      const host = document.createElement("div");
      Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
      const root = createRoot(host);
      act(() =>
        root.render(
          createElement(ScienceF1Chapter8VisualNotesBlock, { content: chapter8Content, lang }),
        ),
      );
      try {
        const sections = ["8.1", "8.2", "8.3", "8.4"].map(
          (code) => host.querySelector(`[data-official-subtopic="${code}"]`)!,
        );
        sections.forEach((section) => {
          expect(
            section.querySelectorAll(
              "table,[data-practice],[data-mirror-activity],[data-refraction-activity]",
            ),
          ).toHaveLength(0);
          expect(section.querySelectorAll("img")).toHaveLength(0);
        });
        const [mirrors, properties, reflection, refraction] = sections;
        const source = chapter8Content[lang];
        for (const text of [
          ...Object.values(source.mirrors.realVsVirtual),
          ...source.mirrors.planeMirrorCharacteristics,
        ])
          expect(mirrors.textContent).toContain(text);
        expect(
          mirrors.querySelector("[data-periscope-construction]")?.querySelectorAll("li"),
        ).toHaveLength(3);
        expect(properties.querySelectorAll("svg")).toHaveLength(3);
        expect(reflection.querySelectorAll("svg")).toHaveLength(2);
        expect(reflection.textContent).toContain(source.reflection.experiment.hypothesis);
        expect(refraction.querySelectorAll("svg")).toHaveLength(7);
        expect(refraction.textContent).toContain(source.refraction.experiment.hypothesis);
        for (const text of source.refraction.activity.instructions)
          expect(refraction.textContent).not.toContain(text);
      } finally {
        act(() => root.unmount());
      }
    });
  }
});
