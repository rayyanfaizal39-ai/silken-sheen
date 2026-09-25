// @vitest-environment jsdom
import { act, createElement, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { bab7Content } from "@/content/form1/science/chapter-7/bab7-content";
import { AirCycleDiagram, Chapter7AirComposition, OxygenApparatus } from "./Chapter7AirComposition";
import { ScienceF1Chapter7VisualNotesBlock } from "./ScienceF1Chapter7VisualNotesBlock";

function renderLiveMarkup(node: ReactNode) {
  act(() => root.render(node));
  return host.innerHTML;
}
function documentOf(html: string) {
  return new DOMParser().parseFromString(html, "text/html");
}
const render = (lang: "en" | "bm") =>
  documentOf(
    renderLiveMarkup(
      createElement(ScienceF1Chapter7VisualNotesBlock, { content: bab7Content, lang }),
    ),
  );
const geometry = (html: string) =>
  [...documentOf(html).querySelectorAll("svg")].map((svg) => {
    svg.removeAttribute("aria-label");
    return svg.outerHTML;
  });
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

describe("Chapter 7 Pass 1 live Notes", () => {
  for (const lang of ["en", "bm"] as const) {
    const t = bab7Content[lang],
      a = t.airLesson;
    it(`${lang}: exactly three official sections and navigation links`, () => {
      const doc = render(lang);
      expect(
        [...doc.querySelectorAll("[data-official-subtopic]")].map((n) =>
          n.getAttribute("data-official-subtopic"),
        ),
      ).toEqual(["7.1", "7.2", "7.3"]);
      expect([...doc.querySelectorAll("h2")].map((n) => n.textContent)).toEqual(
        a.subtopics.map((s) => `${s.code} ${s.title}`),
      );
      expect(doc.querySelectorAll("h2").length).toBe(3);
      expect(
        [...doc.querySelectorAll("nav a")].map((n) => [n.textContent, n.getAttribute("href")]),
      ).toEqual(
        a.subtopics.map((s) => [`${s.code} ${s.title}`, `#chapter7-${s.code.replace(".", "")}`]),
      );
      expect(doc.querySelectorAll('[data-official-subtopic="7.1"]')).toHaveLength(1);
    });
    it(`${lang}: exact textbook percentages with readable individual HTML labels`, () => {
      const doc = render(lang);
      expect(
        [...doc.querySelectorAll("[data-composition-gas] dd")].map((n) => n.textContent),
      ).toEqual(["78%", "21%", "0.03%", "0.97%"]);
      expect(
        [...doc.querySelectorAll("[data-composition-gas] dt")].map((n) => n.textContent),
      ).toEqual(
        lang === "en"
          ? ["Nitrogen", "Oxygen", "Carbon dioxide", "Inert gases"]
          : ["Nitrogen", "Oksigen", "Karbon dioksida", "Gas nadir"],
      );
      expect(doc.querySelectorAll('[data-visual="air-composition"] svg path')).toHaveLength(4);
    });
    it(`${lang}: variable components have no fabricated fixed percentage`, () => {
      const text = render(lang).querySelector("[data-variable-components]")!.textContent!;
      expect(text).toContain(t.composition.reveals[0].body);
      expect(text).not.toMatch(/%/);
      expect(text).toMatch(
        lang === "en"
          ? /water vapour, dust and microorganisms/
          : /wap air, habuk dan mikroorganisma/,
      );
    });
    it(`${lang}: mixture and physical fractional distillation explanation remains canonical`, () => {
      const text = render(lang).querySelector("[data-air-lesson]")!.textContent!;
      expect(text).toContain(t.composition.reveals[2].body);
      a.distillation.forEach((s) => expect(text).toContain(s));
      expect(text).toContain(lang === "en" ? "physical method" : "kaedah fizikal");
    });
    it(`${lang}: all eight apparatus items render and the jar has five equal air-volume divisions`, () => {
      const doc = render(lang),
        activity = doc.querySelector('[data-activity="7.1"]')!;
      expect(
        [...activity.querySelectorAll("[data-apparatus]")]
          .map((n) => n.getAttribute("data-apparatus"))
          .sort(),
      ).toEqual(a.apparatus.map((x) => x.id).sort());
      a.apparatus.forEach((item) => expect(activity.textContent).toContain(item.label));
      expect(
        [...activity.querySelectorAll("[data-jar-division] rect")].map((n) => [
          n.getAttribute("y"),
          n.getAttribute("height"),
          n.getAttribute("width"),
        ]),
      ).toEqual([60, 100, 140, 180, 220].map((y) => [String(y), "40", "158"]));
      t.experiment.steps.forEach((s) => expect(activity.textContent).toContain(s.caption));
    });
    it(`${lang}: before/during/after changes apparatus, flame and one-fifth water level on tap`, () => {
      act(() => root.render(createElement(Chapter7AirComposition, { content: t })));
      const activity = host.querySelector('[data-activity="7.1"]')!;
      const buttons = activity.querySelectorAll("button");
      expect(buttons).toHaveLength(3);
      const jarPaths: string[] = [];
      buttons.forEach((button, stage) => {
        act(() => button.click());
        const svg = activity.querySelector("svg")!;
        jarPaths.push(svg.querySelector('[data-apparatus="jar"]')!.getAttribute("d")!);
        expect(svg.getAttribute("data-apparatus-stage")).toBe(String(stage));
        expect(activity.querySelector('[role="status"]')!.textContent).toContain(
          a.stageCaptions[stage],
        );
        expect(activity.querySelectorAll('[aria-pressed="true"]')).toHaveLength(1);
        expect(svg.querySelectorAll("[data-flame]")).toHaveLength(stage === 2 ? 0 : 1);
        expect(svg.querySelectorAll("[data-water-rise]")).toHaveLength(stage === 2 ? 1 : 0);
        if (stage === 2) {
          expect(svg.querySelector("[data-water-rise]")!.getAttribute("height")).toBe("40");
          expect(svg.querySelector("[data-water-rise]")!.getAttribute("y")).toBe("220");
        }
      });
      expect(jarPaths[0]).not.toBe(jarPaths[1]);
      expect(jarPaths[1]).toBe(jarPaths[2]);
    });
    it(`${lang}: experimental approximately 20% and composition 21% stay separately labelled`, () => {
      const doc = render(lang);
      expect(doc.querySelector("[data-activity-estimate]")!.textContent).toBe(a.estimate);
      expect(a.estimate).toContain("1/5 ≈ 20%");
      expect(doc.querySelector("[data-chart-oxygen]")!.textContent).toBe(a.chartOxygen);
      expect(a.chartOxygen).toContain("21%");
      expect(t.experiment.predictFeedback).toMatch(/Approximately 20%|Kira-kira 20%/);
      expect(doc.querySelector('[data-activity="7.1"]')!.textContent).not.toMatch(
        /°C|seconds|minit|pascal|as it cools|That's proof/,
      );
    });
    for (const [index, name] of ["oxygen", "carbon dioxide", "nitrogen", "inert gases"].entries()) {
      it(`${lang}: all verified ${name} uses appear together without hidden tabs`, () => {
        const section = render(lang).querySelector("[data-gas-uses]")!;
        t.uses.tabs[index].uses.forEach((use) => {
          expect(section.textContent).toContain(use.label);
          if (use.sub) expect(section.textContent).toContain(use.sub);
        });
        expect(section.querySelectorAll('[hidden],[role="tabpanel"],button')).toHaveLength(0);
      });
    }
    it(`${lang}: krypton/xenon remain composition examples, not fake uses`, () => {
      const doc = render(lang);
      expect(doc.querySelector('[data-visual="air-composition"]')!.textContent).toMatch(/xenon/i);
      expect(doc.querySelector("[data-gas-uses]")!.textContent).not.toMatch(
        /krypton|kripton|xenon/i,
      );
      expect(t.uses.tabs[3].uses.map((u) => u.label)).toEqual(["Helium", "Neon", "Argon"]);
    });
    it(`${lang}: carbon cycle branches to eating/death/fossil formation and returns to atmosphere`, () => {
      const cycle = render(lang).querySelector('[data-cycle="carbon"]')!;
      const expected = [
        ["photosynthesis", "atmosphere", "plants", "uses"],
        ["plant-respiration", "plants", "atmosphere", "returns"],
        ["animal-respiration", "animals", "atmosphere", "returns"],
        ["feeding", "plants", "animals", "transfer"],
        ["plant-death", "plants", "dead", "transfer"],
        ["animal-death", "animals", "dead", "transfer"],
        ["decomposition", "dead", "atmosphere", "returns"],
        ["formation", "dead", "fossil", "transfer"],
        ["combustion", "fossil", "atmosphere", "returns"],
      ];
      expect(
        [...cycle.querySelectorAll("[data-edge]")].map((e) =>
          ["data-edge", "data-from", "data-to", "data-flow"].map((k) => e.getAttribute(k)),
        ),
      ).toEqual(expected);
      expect(cycle.textContent).toContain(a.carbon.definition);
      expect(cycle.textContent).toMatch(/bacteria and fungi|bakteria dan kulat/);
      expect(cycle.textContent).toContain(a.carbon.legend.uses);
      expect(cycle.textContent).toContain(a.carbon.legend.returns);
    });
    it(`${lang}: oxygen goes to respiration/rusting/combustion/decomposition and photosynthesis returns it`, () => {
      const cycle = render(lang).querySelector('[data-cycle="oxygen"]')!;
      ["respiration", "rusting", "combustion", "decomposition"].forEach((id) => {
        const edge = cycle.querySelector(`[data-edge="${id}"]`)!;
        expect([
          edge.getAttribute("data-from"),
          edge.getAttribute("data-to"),
          edge.getAttribute("data-flow"),
        ]).toEqual(["oxygen", id, "uses"]);
      });
      const photo = cycle.querySelector('[data-edge="photosynthesis"]')!;
      expect([
        photo.getAttribute("data-from"),
        photo.getAttribute("data-to"),
        photo.getAttribute("data-flow"),
      ]).toEqual(["plants", "oxygen", "returns"]);
      expect(cycle.querySelector('[data-edge="carbon-uptake"]')!.getAttribute("data-from")).toBe(
        "carbon",
      );
      expect(cycle.querySelectorAll('[data-from="rusting"]')).toHaveLength(0);
    });
    for (const kind of ["carbon", "oxygen"] as const) {
      it(`${lang}: each ${kind} process can be tapped, with its canonical endpoints and flow highlighted`, () => {
        act(() =>
          root.render(
            createElement(AirCycleDiagram, {
              cycle: a[kind],
              kind,
              title: t.cycles[kind === "carbon" ? "carbonCycle" : "oxygenCycle"].heading,
            }),
          ),
        );
        const buttons = [...host.querySelectorAll("button")].filter(
          (b) => !b.hasAttribute("aria-label"),
        );
        expect(buttons).toHaveLength(a[kind].edges.length);
        buttons.forEach((button, i) => {
          act(() => button.click());
          const edge = a[kind].edges[i];
          expect(host.querySelector(`[data-edge="${edge.id}"]`)!.getAttribute("stroke-width")).toBe(
            "5",
          );
          const status = host.querySelector('[role="status"]')!.textContent!;
          expect(status).toContain(edge.label);
          for (const id of [edge.from, edge.to])
            expect(status).toContain(a[kind].nodes.find((n) => n.id === id)!.label);
        });
      });
    }
    it(`${lang}: Activity 7.2 is source-backed research and communication`, () => {
      const section = render(lang).querySelector('[data-activity="7.2"]')!;
      expect(section.getAttribute("data-activity-kind")).toBe("research-presentation");
      expect(section.querySelectorAll("[data-apparatus],svg")).toHaveLength(0);
      a.research.instructions.forEach((s) => expect(section.textContent).toContain(s));
      expect(section.textContent).toMatch(/thinking map|peta pemikiran/);
      expect(a.research.instructions.length).toBe(lang === "en" ? 5 : 4);
    });
    it(`${lang}: interference and all five preventive actions render without a new pollution lesson`, () => {
      const section = render(lang).querySelector("[data-interference]")!;
      [
        ...a.interference.causes,
        a.interference.increase,
        ...a.interference.effects,
        ...t.cycles.balanceActions,
      ].forEach((s) => expect(section.textContent).toContain(s));
      expect(section.querySelectorAll("ol li")).toHaveLength(5);
    });
    it(`${lang}: exactly five source practice questions, no invented gas-test answers`, () => {
      const section = render(lang).querySelector('[data-practice="7.1"]')!;
      expect([...section.querySelectorAll("li")].map((n) => n.textContent)).toEqual(
        a.practice.questions,
      );
      expect(a.practice.questions).toHaveLength(5);
      expect(section.textContent).not.toMatch(/glowing splint|limewater|kayu uji|air kapur/);
    });
    it(`${lang}: approved 7.1 remains unchanged through subsequent passes`, () => {
      const locked = {
        ...Object.fromEntries(
          ["airLesson", "hook", "composition", "experiment", "uses", "cycles"].map((key) => [
            key,
            t[key as keyof typeof t],
          ]),
        ),
      };
      expect(createHash("sha256").update(JSON.stringify(locked)).digest("hex")).toBe(
        lang === "en"
          ? "fccd4fe42abca059ec47002e2441eef562d2a5e31c4cdda98a564dab9bc04845"
          : "d5c75650d83564ed67ae45b26ee927eeb095a8b819085963053a52a304f98631",
      );
    });
  }
  it("BM and DLP share every scientific SVG geometry, including all activity stages", () => {
    const renderLesson = (lang: "en" | "bm") =>
      renderLiveMarkup(createElement(Chapter7AirComposition, { content: bab7Content[lang] }));
    expect(geometry(renderLesson("bm"))).toEqual(geometry(renderLesson("en")));
    for (const stage of [0, 1, 2])
      expect(
        geometry(
          renderLiveMarkup(createElement(OxygenApparatus, { content: bab7Content.bm, stage })),
        ),
      ).toEqual(
        geometry(
          renderLiveMarkup(createElement(OxygenApparatus, { content: bab7Content.en, stage })),
        ),
      );
  });
  it("scientific facts are consumed from canonical data rather than component datasets", () => {
    const source = structuredClone(bab7Content.en);
    source.airLesson.carbon.nodes[0].label = "canonical atmosphere sentinel";
    source.uses.tabs[0].uses[0].label = "canonical use sentinel";
    const html = renderLiveMarkup(createElement(Chapter7AirComposition, { content: source }));
    expect(html).toContain("canonical atmosphere sentinel");
    expect(html).toContain("canonical use sentinel");
    const component = readFileSync("src/components/notes/Chapter7AirComposition.tsx", "utf8");
    expect(component).not.toMatch(/const (en|bm|facts|uses|questions|instructions)\s*=/);
    expect(component).not.toContain("Nitric acid");
    expect(component).not.toContain("Approximately 20%");
  });
  it("retains Mark as Read and completed state", () => {
    const onMarkRead = vi.fn();
    act(() =>
      root.render(
        createElement(ScienceF1Chapter7VisualNotesBlock, { content: bab7Content, onMarkRead }),
      ),
    );
    const button = [...host.querySelectorAll("button")].find(
      (b) => b.textContent === "Mark Chapter 7 as read",
    )!;
    act(() => button.click());
    expect(onMarkRead).toHaveBeenCalledOnce();
    act(() =>
      root.render(
        createElement(ScienceF1Chapter7VisualNotesBlock, {
          content: bab7Content,
          onMarkRead,
          isRead: true,
        }),
      ),
    );
    expect(
      [...host.querySelectorAll("button")].find((b) => b.textContent === "Chapter 7 completed")!
        .disabled,
    ).toBe(true);
  });
});
