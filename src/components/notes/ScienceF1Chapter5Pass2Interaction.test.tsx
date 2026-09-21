import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
import { chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";
import { Chapter5ParticleStates } from "./blocks/Chapter5ParticleStates";

const state = vi.hoisted(() => ({ selected: 0 }));
vi.mock("react", async (original) => ({
  ...(await original<typeof import("react")>()),
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
for (const lang of ["bm", "en"] as const)
  it(`${lang}: every mobile selection changes the visible model while retaining the full comparison`, () => {
    const source = chapter5Content[lang].statesOfMatter;
    const render = () => Chapter5ParticleStates({ source });
    const controls = buttons(render());
    expect(controls).toHaveLength(3);
    controls.forEach((button, i) => {
      button.props.onClick();
      const html = renderToStaticMarkup(render());
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
      const panels = [...html.matchAll(/<figure[^>]*data-state-panel="(\d)"[^>]*>/g)];
      expect(panels).toHaveLength(3);
      panels.forEach(([tag, index]) =>
        expect(tag.includes("hidden md:block")).toBe(Number(index) !== i),
      );
      expect(html).toContain("data-state-comparison");
      for (const s of source.stateProperties) expect(html).toContain(s.mass);
      expect(html).not.toContain("onmouseover");
    });
  });
