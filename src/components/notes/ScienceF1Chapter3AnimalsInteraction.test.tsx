import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
import { chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";
import { Chapter3AnimalHomeostasis } from "./blocks/Chapter3AnimalHomeostasis";

// Exercise the real button handlers and render their resulting state without a browser dependency.
const state = vi.hoisted(() => ({ selected: 0 }));
vi.mock("react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react")>()),
  useId: () => "animal-panel",
  useState: () => [
    state.selected,
    (next: number) => {
      state.selected = next;
    },
  ],
}));
function buttons(node: ReactNode): ReactElement<{ onClick: () => void; children: ReactNode }>[] {
  if (Array.isArray(node)) return node.flatMap(buttons);
  if (!isValidElement<{ children?: ReactNode }>(node)) return [];
  if (node.type === "button")
    return [node as ReactElement<{ onClick: () => void; children: ReactNode }>];
  return buttons(node.props.children);
}
beforeEach(() => {
  state.selected = 0;
});
for (const lang of ["bm", "en"] as const)
  it(`${lang}: tapping every selector updates the main diagram and active button`, () => {
    const render = () => Chapter3AnimalHomeostasis({ content: chapter3Content[lang], lang });
    for (const selected of [3, 4, 1, 2, 0]) {
      const selectors = buttons(render());
      expect(selectors).toHaveLength(5);
      selectors[selected].props.onClick();
      const html = renderToStaticMarkup(render());
      expect(html).toContain(`data-animal-selection="${selected}"`);
      const renderedButtons = [...html.matchAll(/<button[\s\S]*?<\/button>/g)].map(
        (match) => match[0],
      );
      expect(renderedButtons[selected]).toContain('aria-pressed="true"');
      expect(
        renderedButtons.filter((button) => button.includes('aria-pressed="true"')),
      ).toHaveLength(1);
    }
  });
