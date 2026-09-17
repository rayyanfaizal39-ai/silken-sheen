import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
import { chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { ContraceptionSelector, InfertilityFactors } from "./blocks/Chapter4Infertility";
const state = vi.hoisted(() => ({ selected: 0 as number | null }));
vi.mock("react", async (original) => ({
  ...(await original<typeof import("react")>()),
  useId: () => "pass3",
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
  it(`${lang}: every method button changes the diagram and exact source description/classification`, () => {
    const content = chapter4Content[lang];
    const render = () => ContraceptionSelector({ content, lang });
    const controls = buttons(render());
    expect(controls).toHaveLength(content.infertility.contraceptionMethods.length);
    const selected = new Set<number>();
    for (const control of controls) {
      control.props.onClick();
      const index = state.selected!;
      selected.add(index);
      const html = renderToStaticMarkup(render());
      const method = content.infertility.contraceptionMethods[index];
      expect(html).toContain(renderToStaticMarkup(<>{method.description}</>));
      expect(html).toContain(method.classification);
      expect(html).toContain(`data-selected-method="${index}"`);
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
    }
    expect(selected.size).toBe(6);
  });
  it(`${lang}: selected mechanisms come from supplied canonical descriptions, with original duration preserved`, () => {
    const content = structuredClone(chapter4Content[lang]);
    content.infertility.contraceptionMethods.forEach((m, i) => {
      m.description = `SOURCE MECHANISM ${i}`;
    });
    const render = () => ContraceptionSelector({ content, lang });
    for (const control of buttons(render())) {
      control.props.onClick();
      const html = renderToStaticMarkup(render());
      expect(html).toContain(`SOURCE MECHANISM ${state.selected}`);
      for (const method of chapter4Content[lang].infertility.contraceptionMethods)
        expect(html).not.toContain(renderToStaticMarkup(<>{method.description}</>));
    }
    state.selected = 1;
    const original = renderToStaticMarkup(
      ContraceptionSelector({ content: chapter4Content[lang], lang }),
    );
    expect(original).toContain(
      lang === "en"
        ? "Release hormones for 3-5 years to prevent ovulation"
        : "Merembes hormon selama 3-5 tahun untuk mencegah ovulasi",
    );
  });
  for (const sex of ["male", "female"] as const)
    it(`${lang} ${sex}: anatomy-associated factors highlight only the relevant source structure`, () => {
      state.selected = null;
      const render = () => InfertilityFactors({ content: chapter4Content[lang], lang, sex });
      const expected = sex === "male" ? [5] : [1, 0, 2, 2];
      const controls = buttons(render());
      expect(controls).toHaveLength(expected.length);
      controls.forEach((button, i) => {
        button.props.onClick();
        const html = renderToStaticMarkup(render());
        expect(html).toContain(`data-reproductive-organ="${expected[i]}" data-highlighted="true"`);
        expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
      });
    });
}
