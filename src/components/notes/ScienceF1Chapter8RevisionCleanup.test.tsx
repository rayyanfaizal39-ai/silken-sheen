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
    // Canonical snapshot includes the authorised 8.3 application explanation; all 8.5–8.7 snapshots remain unchanged.
    const locks = {
      "src/content/form1/science/chapter-8/chapter8-content.ts":
        "6714d3cab42e577b6ddfa19579ab59a1883ab5ef58a4038a207847972a025988",
      "src/components/notes/Chapter8Dispersion.tsx":
        "0f3e2a243cffe37a54e3217ca763a311aa4726b8bb38cb8a1274473e98f9bf13",
      "src/components/notes/Chapter8Scattering.tsx":
        "9db35631b73340e6feef776dd441758ecc83a38aa765104445f511e77d93de3a",
      "src/components/notes/ScienceF1Chapter8VisualNotesBlock.tsx":
        "5ccdf5d4805bfa8f4df3f558d077210a67ee2e7bc7415a9101ebbadd8bf9c0d7",
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
