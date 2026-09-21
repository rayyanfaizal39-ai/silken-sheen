import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
import { chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";
import { Chapter5StateChanges } from "./blocks/Chapter5StateChanges";
const state = vi.hoisted(() => ({ selected: "melting" }));
vi.mock("react", async (original) => ({
  ...(await original<typeof import("react")>()),
  useState: () => [
    state.selected,
    (next: string) => {
      state.selected = next;
    },
  ],
}));
function buttons(node: ReactNode): ReactElement<{ onClick: () => void; "data-process": string }>[] {
  if (Array.isArray(node)) return node.flatMap(buttons);
  if (!isValidElement<{ children?: ReactNode }>(node)) return [];
  if (node.type === "button")
    return [node as ReactElement<{ onClick: () => void; "data-process": string }>];
  return buttons(node.props.children);
}
beforeEach(() => {
  state.selected = "melting";
});
for (const lang of ["en", "bm"] as const)
  it(`${lang}: selecting every process updates the particle pair, mechanism and heat label`, () => {
    const source = chapter5Content[lang].statesOfMatter;
    const render = () => Chapter5StateChanges({ source });
    const controls = buttons(render());
    expect(controls).toHaveLength(7);
    for (const control of controls) {
      control.props.onClick();
      const html = renderToStaticMarkup(render());
      const c = source.changesOfState.find((c) => c.id === control.props["data-process"])!;
      expect(html).toContain(`data-selected-process="${c.id}"`);
      expect(html).toContain(
        `data-particle-transition="${c.id}" data-from="${c.from}" data-to="${c.to}"`,
      );
      for (const text of c.description) expect(html).toContain(text);
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
      expect(html).toContain(c.thermalAction);
    }
  });
