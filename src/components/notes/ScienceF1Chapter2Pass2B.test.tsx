import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import { chapter2BodySystemNames } from "@/content/form1/science/chapter-2/chapter2-canonical";
import { ScienceF1Chapter2VisualNotesBlock } from "./ScienceF1Chapter2VisualNotesBlock";
import { BodySystemAnatomy, BodySystemsVisual } from "./blocks/Chapter2BodySystemsVisual";
import { BodySystemsVisual as LegacyBodySystemsVisual } from "./blocks/Chapter2LearningVisuals";

// Exercise every state in the actual selector renderer without claiming browser-click QA.
const selection = vi.hoisted(() => ({ index: null as number | null }));
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: (initial: unknown) => {
      const result = actual.useState(initial);
      return selection.index === null ? result : [selection.index, result[1]];
    },
  };
});

describe("Science Form 1 Chapter 2 Pass 2B", () => {
  for (const lang of ["bm", "en"] as const) {
    it.each(chapter2Content[lang].bodySystems.map((_, index) => index))(
      `${lang}: selecting system %i reveals its own anatomy, organs and function only`,
      (index) => {
        let html: string;
        selection.index = index;
        try {
          html = renderToStaticMarkup(
            <BodySystemsVisual content={chapter2Content[lang]} lang={lang} />,
          );
        } finally {
          selection.index = null;
        }
        const system = chapter2Content[lang].bodySystems[index];
        expect(html).toContain(`data-body-system-diagram="${index}"`);
        expect(html.match(/data-anatomy=/g)).toHaveLength(1);
        expect(html).toContain(`${system.name}</h4>`);
        expect(html).toContain(system.function);
        for (const organ of system.organs.split(",")) expect(html).toContain(organ.trim());
        expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
        expect(html).toMatch(new RegExp(`aria-pressed="true"[^>]*>${system.name}</button>`));
        for (const [otherIndex, other] of chapter2Content[lang].bodySystems.entries()) {
          if (otherIndex !== index) {
            expect(html).not.toContain(`data-body-system-diagram="${otherIndex}"`);
            expect(html).not.toContain(other.function);
          }
        }
      },
    );
    it(`${lang}: live renderer uses one body, canonical system order and accessible selection controls`, () => {
      const html = renderToStaticMarkup(
        <ScienceF1Chapter2VisualNotesBlock content={chapter2Content} lang={lang} />,
      );
      const systems = html.slice(
        html.indexOf("data-body-systems"),
        html.indexOf('data-learning-standard="2.1.7"'),
      );
      expect(systems.match(/data-body-outline/g)).toHaveLength(1);
      expect(systems.match(/data-body-system-diagram=/g)).toHaveLength(1);
      expect(systems.match(/aria-pressed="true"/g)).toHaveLength(1);
      expect(systems.match(/aria-pressed="false"/g)).toHaveLength(10);
      let previous = -1;
      for (const name of chapter2BodySystemNames) {
        const next = systems.indexOf(`>${name[lang]}</button>`);
        expect(next).toBeGreaterThan(previous);
        previous = next;
      }
      expect(systems).toContain('data-anatomy="nervous"');
      expect(systems).not.toContain('data-anatomy="digestive"');
      expect(systems).not.toContain("human-body-systems.webp");
    });

    it(`${lang}: each of the 11 anatomy layers connects to the existing organs without changing the silhouette`, () => {
      const outlines = new Set<string>();
      const anatomy = new Set<string>();
      for (const [index, system] of chapter2Content[lang].bodySystems.entries()) {
        const html = renderToStaticMarkup(
          <BodySystemAnatomy content={chapter2Content[lang]} index={index} />,
        );
        expect(html).toContain(`${system.name}: ${system.organs}</title>`);
        expect(html).toContain('role="img"');
        expect(html).not.toContain("undefined");
        expect(html.match(/<text /g)).toHaveLength(system.organs.split(",").length);
        outlines.add(html.match(/data-body-outline="true" d="([^"]+)"/)![1]);
        anatomy.add(html.match(/data-anatomy="([^"]+)"/)![1]);
      }
      expect(outlines.size).toBe(1);
      expect(anatomy.size).toBe(11);
    });

    it(`${lang}: section 2.1.7 preserves all existing reflection content with labelled native checkboxes`, () => {
      const html = renderToStaticMarkup(
        <ScienceF1Chapter2VisualNotesBlock content={chapter2Content} lang={lang} />,
      );
      const reflection = html.match(
        /<fieldset data-learning-standard="2.1.7"[\s\S]*?<\/fieldset>/,
      )![0];
      expect(reflection).toContain(chapter2Content[lang].appreciation.title);
      expect(reflection).toContain(chapter2Content[lang].appreciation.body);
      for (const item of chapter2Content[lang].appreciation.reflectionItems)
        expect(reflection).toContain(item);
      expect(reflection.match(/type="checkbox"/g)).toHaveLength(3);
      expect(reflection.match(/<label /g)).toHaveLength(3);
    });
  }

  it("consumes supplied system names, organs, functions and reflection text rather than copies", () => {
    const content = structuredClone(chapter2Content);
    content.en.bodySystems[6] = {
      name: "SOURCE NAME",
      organs: "SOURCE BRAIN, SOURCE CORD, SOURCE NERVES",
      function: "SOURCE FUNCTION",
    };
    content.en.appreciation = {
      title: "SOURCE TITLE",
      body: "SOURCE BODY",
      reflectionItems: ["SOURCE REFLECTION"],
    };
    const html = renderToStaticMarkup(
      <ScienceF1Chapter2VisualNotesBlock content={content} lang="en" />,
    );
    for (const text of [
      "SOURCE NAME",
      "SOURCE BRAIN",
      "SOURCE CORD",
      "SOURCE NERVES",
      "SOURCE FUNCTION",
      "SOURCE TITLE",
      "SOURCE BODY",
      "SOURCE REFLECTION",
    ])
      expect(html).toContain(text);
  });

  it("the legacy entry point reuses the same component", () => {
    expect(LegacyBodySystemsVisual).toBe(BodySystemsVisual);
  });

  it("BM and DLP have identical anatomy geometry for every system", () => {
    for (let index = 0; index < 11; index++) {
      const geometry = (lang: "bm" | "en") =>
        renderToStaticMarkup(<BodySystemAnatomy content={chapter2Content[lang]} index={index} />)
          .replace(/aria-labelledby="[^"]+"/, "")
          .replace(/<title[\s\S]*?<\/title>/, "");
      expect(geometry("bm")).toBe(geometry("en"));
    }
  });
});
