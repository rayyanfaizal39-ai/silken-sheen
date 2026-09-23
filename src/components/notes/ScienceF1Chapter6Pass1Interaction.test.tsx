import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
import { chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";
import { Chapter6Atoms } from "./blocks/Chapter6Atoms";
import { Chapter6PeriodicTable } from "./blocks/Chapter6PeriodicTable";
import { ExperimentPanel } from "./blocks/Chapter6Experiments";
const state = vi.hoisted(() => ({ value: 0 as string | number }));
vi.mock("react", async (original) => ({
  ...(await original<typeof import("react")>()),
  useState: () => [
    state.value,
    (v: string | number) => {
      state.value = v;
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
  state.value = 0;
});
for (const lang of ["en", "bm"] as const) {
  it(`${lang}: each subatomic selection highlights its actual location and canonical facts`, () => {
    const source = chapter6Content[lang];
    const render = () => Chapter6Atoms({ source });
    const controls = buttons(render());
    expect(controls).toHaveLength(3);
    controls.forEach((b, i) => {
      b.props.onClick();
      const html = renderToStaticMarkup(render());
      expect(html).toContain(
        `data-subatomic="${["proton", "neutron", "electron"][i]}" data-highlighted="true"`,
      );
      expect(html.match(/data-highlighted="true"/g)).toHaveLength(1);
      expect(html).toContain(source.atomsAndMolecules.subatomicParticles[i].charge);
      expect(html).toContain(source.atomsAndMolecules.subatomicParticles[i].location);
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
    });
  });
  it(`${lang}: region buttons highlight the corresponding table cells`, () => {
    state.value = "metal";
    const source = chapter6Content[lang];
    const render = () => Chapter6PeriodicTable({ source });
    buttons(render()).forEach((b, i) => {
      b.props.onClick();
      const html = renderToStaticMarkup(render());
      const region = source.classification.regions[i].id;
      const cells = [...html.matchAll(/<rect data-region="([^"]+)"[^>]*opacity="([^"]+)"/g)];
      expect(cells.length).toBeGreaterThan(80);
      cells.forEach((m) => expect(m[2]).toBe(m[1] === region ? "1" : "0.3"));
    });
  });
  it(`${lang}: every experiment sample changes both the diagram and conclusion`, () => {
    const source = chapter6Content[lang];
    for (const experiment of source.classification.experiments) {
      state.value = 0;
      const render = () => ExperimentPanel({ source, experiment });
      const controls = buttons(render());
      expect(controls).toHaveLength(experiment.samples.length);
      controls.forEach((b, i) => {
        b.props.onClick();
        const html = renderToStaticMarkup(render());
        expect(html).toContain(
          `data-sample="${experiment.samples[i].material}" data-effect="${experiment.samples[i].effect}"`,
        );
        expect(html).toContain(experiment.samples[i].outcome);
        expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
      });
    }
  });
}
