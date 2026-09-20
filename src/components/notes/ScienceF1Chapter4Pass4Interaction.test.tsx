import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
import { chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { FlowerAnatomy } from "./blocks/Chapter4FlowerReproduction";
import { SeedAnatomy } from "./blocks/Chapter4SeedReproduction";
const state = vi.hoisted(() => ({ selected: 0 }));
vi.mock("react", async (original) => ({
  ...(await original<typeof import("react")>()),
  useId: () => "pass4",
  useState: () => [
    state.selected,
    (next: number) => {
      state.selected = next;
    },
  ],
}));
function buttons(node: ReactNode): ReactElement<{ onClick: () => void }>[] {
  if (Array.isArray(node)) return node.flatMap(buttons);
  if (!isValidElement<{ children?: ReactNode }>(node)) return [];
  if (node.type === "button") return [node as ReactElement<{ onClick: () => void }>];
  return buttons(node.props.children);
}
beforeEach(() => {
  state.selected = 0;
});
for (const lang of ["bm", "en"] as const) {
  it(`${lang}: all eight flower selections highlight the actual part and show canonical group function`, () => {
    const source = structuredClone(chapter4Content[lang].plantReproduction);
    source.flowerParts.forEach((p, i) => {
      p.function = `SOURCE FLOWER FUNCTION ${i}`;
    });
    const render = () => FlowerAnatomy({ source, lang });
    const controls = buttons(render());
    expect(controls).toHaveLength(8);
    controls.forEach((button, i) => {
      button.props.onClick();
      const html = renderToStaticMarkup(render());
      const group = [0, 0, 1, 1, 1, 1, 2, 3][i];
      expect(html).toContain(`data-flower-part="${i}" data-highlighted="true" opacity="1"`);
      expect(html).toContain(`SOURCE FLOWER FUNCTION ${group}`);
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
      expect(html).toContain(renderToStaticMarkup(<>{source.flowerParts[group].part}</>));
    });
  });
  it(`${lang}: all six seed selections consume the supplied canonical name and function`, () => {
    const source = structuredClone(chapter4Content[lang].plantReproduction);
    source.seedParts.forEach((p, i) => {
      p.part = `SOURCE SEED ${i}`;
      p.function = `SOURCE SEED FUNCTION ${i}`;
    });
    const render = () => SeedAnatomy({ source, lang });
    const controls = buttons(render());
    expect(controls).toHaveLength(6);
    controls.forEach((button, i) => {
      button.props.onClick();
      const html = renderToStaticMarkup(render());
      expect(html).toContain(`data-seed-part="${i}" data-highlighted="true" opacity="1"`);
      expect(html).toContain(`SOURCE SEED ${i}`);
      expect(html).toContain(`SOURCE SEED FUNCTION ${i}`);
      expect(html.match(/SOURCE SEED FUNCTION/g)).toHaveLength(1);
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
    });
  });
}

it("seed terminology renders Radikel in BM and Radicle in DLP with unchanged functions", () => {
  for (const lang of ["bm", "en"] as const) {
    state.selected = 0;
    const source = chapter4Content[lang].plantReproduction;
    const render = () => SeedAnatomy({ source, lang });
    buttons(render())[4].props.onClick();
    const html = renderToStaticMarkup(render());
    expect(html).toContain(lang === "bm" ? "Radikel" : "Radicle");
    expect(html).not.toContain("Radikal");
    const expectedFunction =
      lang === "bm"
        ? "Bahagian embrio yang berkembang menjadi akar"
        : "Part of the embryo that develops into the root";
    expect(source.seedParts[4].function).toBe(expectedFunction);
    expect(html).toContain(expectedFunction);
  }
});
