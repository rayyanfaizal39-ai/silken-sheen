import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import {
  scienceF1QuizVisualById,
  scienceF1QuizVisualDescriptions,
} from "@/content/form1/science/quiz-visuals";
import { ScienceF1QuizVisual } from "./ScienceF1QuizVisual";

describe("Science F1 visual presentation", () => {
  for (const [id, src] of Object.entries(scienceF1QuizVisualById)) {
    it(`renders the real mapped asset and localised description for ${id}`, () => {
      const [, chapter, lang] = id.match(/^sci-f1-c(\d)-(bm|dlp)-/)!;
      const q = getChapterQuizQuestions(
        "science",
        "Form 1",
        `Chapter ${chapter}`,
        lang as "bm" | "dlp",
      ).find((q) => q.id === id)!;
      const original = JSON.stringify(q);
      const html = renderToStaticMarkup(<ScienceF1QuizVisual question={q} />);
      const name = src
        .split("/")
        .at(-1)!
        .replace(/\.svg$/, "");
      expect(html).toContain(`src="${src}"`);
      expect(html).toContain(scienceF1QuizVisualDescriptions[name][lang as "bm" | "dlp"]);
      expect(existsSync(resolve("public", src.slice(1)))).toBe(true);
      expect(JSON.stringify(q)).toBe(original);
    });
  }
  it("omits irrelevant pollination-definition and generic triangle images", () => {
    for (const lang of ["bm", "dlp"]) {
      for (const [chapter, number] of [
        [4, 14],
        [7, 12],
      ]) {
        expect(
          renderToStaticMarkup(
            <ScienceF1QuizVisual
              question={{ id: `sci-f1-c${chapter}-${lang}-q${number}`, question: "" }}
            />,
          ),
        ).toBe("");
      }
    }
  });
  it("keeps four Earth layers, equal particle counts, and a perpendicular labelled normal", () => {
    const svg = (name: string) =>
      readFileSync(resolve(`public/quiz-visuals/science-f1/${name}.svg`), "utf8");
    expect(svg("earth-layers").match(/<circle /g)).toHaveLength(4);
    expect(svg("earth-layers")).toContain("Not to scale / Bukan mengikut skala");
    expect(svg("particles").match(/<circle /g)).toHaveLength(36);
    expect(svg("reflection")).toContain('x1="320" y1="55" x2="320" y2="250"');
    expect(svg("reflection")).toContain('x="320" y="35"');
    expect(svg("refraction-water")).toContain('y="150" width="570" height="125" fill="#BAE6FD"');
    expect(svg("refraction-water")).toContain('x="480" y="90" text-anchor="middle">Air / Udara');
  });
});
