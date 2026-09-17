import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
import { chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { ReproductiveSystemPanel } from "./blocks/Chapter4ReproductiveAnatomy";
const state = vi.hoisted(() => ({ selected: null as number | null }));
vi.mock("react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react")>()),
  useId: () => "anatomy-panel",
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
  state.selected = null;
});
for (const lang of ["bm", "en"] as const)
  for (const sex of ["male", "female"] as const)
    it(`${lang} ${sex}: each real structure button shows its canonical name/function and highlights anatomy`, () => {
      const content = structuredClone(chapter4Content[lang]);
      const parts =
        sex === "male"
          ? content.humanReproductiveSystem.maleParts
          : content.humanReproductiveSystem.femaleParts;
      parts.forEach((part, index) => {
        part.part = `SOURCE NAME ${index}`;
        part.function = `SOURCE FUNCTION ${index}`;
      });
      const render = () => ReproductiveSystemPanel({ content, lang, sex });
      for (let selected = 0; selected < parts.length; selected++) {
        const controls = buttons(render());
        expect(controls).toHaveLength(parts.length);
        controls[selected].props.onClick();
        const html = renderToStaticMarkup(render());
        expect(html).toContain(`SOURCE NAME ${selected}`);
        expect(html).toContain(`SOURCE FUNCTION ${selected}`);
        expect(html).toContain(
          `data-reproductive-organ="${selected}" data-highlighted="true" opacity="1"`,
        );
        const originalParts =
          sex === "male"
            ? chapter4Content[lang].humanReproductiveSystem.maleParts
            : chapter4Content[lang].humanReproductiveSystem.femaleParts;
        for (const part of originalParts)
          expect(html).not.toContain(part.function.replaceAll("'", "&#x27;"));
        expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
      }
    });
