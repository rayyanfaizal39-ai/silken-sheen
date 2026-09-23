// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it } from "vitest";
import { chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";
import { Chapter6Mixtures } from "./blocks/Chapter6Mixtures";

let host: HTMLDivElement;
let root: Root;
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
  it(`${lang}: clicking each activity step updates its actual apparatus and canonical explanation`, () => {
    const source = chapter6Content[lang].mixtures;
    act(() => root.render(createElement(Chapter6Mixtures, { source })));
    source.separationMethods.forEach((method) => {
      const article = host.querySelector(`[data-method="${method.id}"]`)!;
      const controls = article.querySelectorAll<HTMLButtonElement>("button");
      expect(controls).toHaveLength(method.steps.length);
      controls.forEach((button, i) => {
        act(() => button.click());
        expect(article.querySelector("[data-mixture-diagram]")?.getAttribute("data-stage")).toBe(
          String(i),
        );
        expect(article.querySelector("[data-process-step]")?.textContent).toBe(method.steps[i]);
        expect(article.querySelectorAll('[aria-pressed="true"]')).toHaveLength(1);
      });
    });
    expect(host.querySelector('[data-flow="water-outlet"]')).not.toBeNull();
    expect(host.querySelector('[data-material="iron"][data-attracted="true"]')).not.toBeNull();
    expect(host.querySelector('[data-result="observation-required"]')).not.toBeNull();
  });
  it(`${lang}: all six matching questions accept their canonical method and reject another method`, () => {
    const source = chapter6Content[lang].mixtures;
    act(() => root.render(createElement(Chapter6Mixtures, { source })));
    const selects = host.querySelectorAll("select");
    expect(selects).toHaveLength(6);
    selects.forEach((select, i) => {
      act(() => {
        select.value = "sieving";
        select.dispatchEvent(new Event("change", { bubbles: true }));
      });
      expect(select.parentElement?.querySelector('[role="status"]')?.textContent).toBe(
        source.labels.retry,
      );
      act(() => {
        select.value = source.formativePractice[i].method;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      });
      expect(select.parentElement?.querySelector('[role="status"]')?.textContent).toBe(
        source.labels.correct,
      );
    });
    expect(host.querySelectorAll('[data-correct="true"]')).toHaveLength(6);
  });
}
