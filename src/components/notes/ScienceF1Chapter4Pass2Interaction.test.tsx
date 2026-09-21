import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
import { chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { Chapter4MenstrualCycle } from "./blocks/Chapter4MenstrualCycle";
import { PregnancySupport } from "./blocks/Chapter4PregnancyVisuals";
const state = vi.hoisted(() => ({ selected: 0 }));
vi.mock("react", async (original) => ({
  ...(await original<typeof import("react")>()),
  useId: () => "pass2",
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
  it(`${lang}: tapping each phase updates actual lining and canonical description`, () => {
    const content = structuredClone(chapter4Content[lang]);
    content.menstrualCycle.phases.forEach((p, i) => {
      p.description = `SOURCE PHASE ${i}`;
    });
    const render = () => Chapter4MenstrualCycle({ content, lang });
    for (let i = 0; i < 4; i++) {
      const controls = buttons(render());
      expect(controls).toHaveLength(4);
      controls[i].props.onClick();
      const html = renderToStaticMarkup(render());
      expect(html).toContain(`data-lining-state="${i}"`);
      expect(html).toContain(`SOURCE PHASE ${i}`);
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
    }
  });
  it(`${lang}: tapping each support structure highlights it and renders its supplied canonical function`, () => {
    const content = structuredClone(chapter4Content[lang]);
    const keys = [
      "placentaFunction",
      "umbilicalCordFunction",
      "amnionFunction",
      "amnioticFluidFunction",
      "uterineWallFunction",
    ] as const;
    keys.forEach((key, i) => {
      content.fertilisationAndPregnancy[key] = `SOURCE FUNCTION ${i}`;
    });
    const render = () => PregnancySupport({ content, lang });
    for (let i = 0; i < 5; i++) {
      const controls = buttons(render());
      expect(controls).toHaveLength(5);
      controls[i].props.onClick();
      const html = renderToStaticMarkup(render());
      expect(html).toContain(`data-support="${keys[i]}" data-highlighted="true" opacity="1"`);
      expect(html).toContain(`SOURCE FUNCTION ${i}`);
      expect(html.match(/SOURCE FUNCTION/g)).toHaveLength(1);
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
    }
  });
}
