import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
import { chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";
import { MatterEvidenceVisuals } from "./blocks/Chapter5MatterInNature";

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
for (const lang of ["bm", "en"] as const) {
  it(`${lang}: tapping each canonical sample changes both the container and the balance sample`, () => {
    const source = chapter5Content[lang].matterInNature;
    const render = () => MatterEvidenceVisuals({ source });
    const controls = buttons(render());
    expect(controls).toHaveLength(source.evidenceSamples.length);
    const pictures = new Set<string>();
    source.evidenceSamples.forEach((name, i) => {
      controls[i].props.onClick();
      const html = renderToStaticMarkup(render());
      expect(html.match(new RegExp(`data-sample-shape="${i}"`, "g"))).toHaveLength(2);
      expect(html).toContain(`>${name}</button>`);
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
      expect(html).toContain(source.evidenceActivities[0].conclusion);
      pictures.add(html.match(/<svg data-diagram="sample-space"[\s\S]*?<\/svg>/)![0]);
    });
    expect(pictures.size).toBe(3);
  });
}
