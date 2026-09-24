// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";
import { Chapter6Compounds } from "./blocks/Chapter6Compounds";
import { ScienceF1Chapter6VisualNotesBlock } from "./ScienceF1Chapter6VisualNotesBlock";

let host: HTMLDivElement, root: Root;
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
});
for (const lang of ["en", "bm"] as const) {
  it(`${lang}: Activity 6.11 advances from mixing to weighing, heating and cooled product`, () => {
    const source = chapter6Content[lang];
    act(() => root.render(createElement(Chapter6Compounds, { source })));
    const activity = host.querySelector('[data-activity="6.11"]')!;
    const buttons = activity.querySelectorAll("button");
    expect(buttons).toHaveLength(4);
    buttons.forEach((button, stage) => {
      act(() => button.click());
      expect(activity.querySelector("[data-activity-step]")?.textContent).toBe(
        source.compounds.activity611.steps[stage],
      );
      expect(activity.querySelectorAll('[aria-pressed="true"]')).toHaveLength(1);
      const svg = activity.querySelector('[data-compound-diagram="activity611"]')!;
      expect(svg.querySelectorAll("[data-active-heat]")).toHaveLength(stage === 2 ? 1 : 0);
      expect(svg.querySelectorAll('[data-apparatus="crucible-with-lid"]')).toHaveLength(1);
      expect(svg.querySelector("[data-content]")?.getAttribute("data-content")).toBe(
        stage === 3 ? "compound" : "mixture",
      );
      expect(
        svg.querySelector('[data-apparatus="crucible-with-lid"]')?.getAttribute("transform"),
      ).toBe(stage === 1 || stage === 3 ? "translate(340 156)" : "translate(117 100)");
    });
  });
  it(`${lang}: tapping either electrode highlights the corresponding collection tube`, () => {
    const source = chapter6Content[lang];
    act(() => root.render(createElement(Chapter6Compounds, { source })));
    const section = host.querySelector("[data-electrolysis]")!;
    section.querySelectorAll("button").forEach((button, index) => {
      act(() => button.click());
      const product = source.compounds.electrolysis.products[index];
      expect(button.textContent).toContain(product.electrode);
      expect(button.textContent).toContain(product.gas);
      const highlighted = section.querySelectorAll('[data-highlighted="true"]');
      expect(highlighted).toHaveLength(1);
      expect(highlighted[0].getAttribute("data-electrode")).toBe(product.id);
      expect(
        highlighted[0]
          .querySelector("[data-collection-tube]")
          ?.getAttribute("data-collection-tube"),
      ).toBe(product.id);
      expect(section.querySelectorAll('[aria-pressed="true"]')).toHaveLength(1);
    });
  });
  it(`${lang}: all four formative questions reveal their canonical answers by tap`, () => {
    const source = chapter6Content[lang];
    act(() => root.render(createElement(Chapter6Compounds, { source })));
    const details = host.querySelectorAll<HTMLDetailsElement>("[data-compound-recall] details");
    expect(details).toHaveLength(4);
    details.forEach((detail, i) => {
      expect(detail.open).toBe(false);
      act(() => detail.querySelector("summary")!.click());
      expect(detail.open).toBe(true);
      expect(detail.querySelector("p")?.textContent).toBe(source.compounds.activeRecall[i].answer);
    });
  });
}
it("preserves Mark as Read and its completed state", () => {
  const onMarkRead = vi.fn();
  act(() =>
    root.render(
      createElement(ScienceF1Chapter6VisualNotesBlock, {
        content: chapter6Content,
        lang: "en",
        onMarkRead,
      }),
    ),
  );
  const button = [...host.querySelectorAll("button")].find(
    (b) => b.textContent === "Mark Chapter 6 as read",
  )!;
  act(() => button.click());
  expect(onMarkRead).toHaveBeenCalledOnce();
  act(() =>
    root.render(
      createElement(ScienceF1Chapter6VisualNotesBlock, {
        content: chapter6Content,
        lang: "en",
        onMarkRead,
        isRead: true,
      }),
    ),
  );
  expect(
    [...host.querySelectorAll("button")].find((b) => b.textContent === "Chapter 6 completed")
      ?.disabled,
  ).toBe(true);
});
