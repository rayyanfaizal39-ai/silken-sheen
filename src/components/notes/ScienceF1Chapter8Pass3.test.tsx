// Revision cleanup (2026-10-03): only the four 8.1–8.4 component snapshots are updated; canonical/deferred locks are unchanged.
// Pass 4 authorises 8.5/8.6 edits; deferred checks now cover pre-Pass-4 8.7 only.
// @vitest-environment jsdom
import { act, createElement, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import {
  chapter8Content as content,
  chapter8Supplement as supplement,
} from "@/content/form1/science/chapter-8/chapter8-content";
import { Chapter8Refraction } from "./Chapter8Refraction";
import { ScienceF1Chapter8VisualNotesBlock } from "./ScienceF1Chapter8VisualNotesBlock";

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
const mount = (node: ReactNode) => act(() => root.render(node));
const tap = (selector: string, i = 0) =>
  act(() => host.querySelectorAll<HTMLButtonElement>(selector)[i].click());
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const hash = (v: unknown) =>
  sha(
    JSON.stringify(v, (key, value) =>
      // The authorised 8.7 refinement adds four fields; retain original hashes for all existing facts.
      [
        "additionDefinition",
        "subtractionDefinition",
        "additionEverydayExample",
        "additionSubtractionComparison",
      ].includes(key)
        ? undefined
        : value,
    ),
  );
const numbers = (s: string) => s.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
const geometry = () => [...host.querySelectorAll("svg")].map((n) => n.outerHTML);
const point = (n: Element) => numbers(n.getAttribute("transform")!);
const path = (d: Element, kind: string) =>
  numbers(d.querySelector(`[data-ray="${kind}"]`)!.getAttribute("d")!);
const angle = (ray: number[]) => Math.atan2(Math.abs(ray[2] - ray[0]), Math.abs(ray[3] - ray[1]));

// These baselines were captured before Pass 3, not generated from the edited objects.
const locks = {
  en: {
    mirrors: "f9ba2250f78733bf980abf159591493f7718fb0502bcbf72d8af1b3ed0085115",
    properties: "30892516c7b52edbeb3a815af5dd9e0c68697f3e459a4564257fab75f28f5b32",
    reflection: "edb95a522087ad0eecc853000d66d3984a8eff84382aedb7e9bf003d8cdd9da4",
    deferred: "95a724cbdb1d34b00f8b15710a3f8754012f798d50c9b2665f0bea41b1fe9ef9",
    supplement: "bdf887aa50e4f06d1d1d4abddd0a2a95d532327f68e842093f03525eebeb5389",
  },
  bm: {
    mirrors: "a2a31f0fbd34c9e4efe16bc472ea69a83c07d5d280b676ebff796171cb260e2a",
    properties: "98f9abcf4c1563d3b0f0427f4cef260bc2aeb5b42b715e56af831751032cfe6a",
    reflection: "6f63c7b902fa79fa6711548e6ae2bc511ef95bbfc4a764d4255ec38f9cf57888",
    deferred: "5b924ae4a14de777bdce2320a23ab1434729e9e37368b03fe35af7833691d552",
    supplement: "072172febec651301b49dc36b96d24bccd3d75c541ec7d446b2ed61d386844a8",
  },
};

describe("Chapter 8 Pass 3 — source-controlled refraction", () => {
  it("keeps all three approved Pass 1/2 diagram implementations unchanged", () => {
    const files = {
      Chapter8Mirrors: "0ec93bea9fc2e5a8c32eac59f48279ce3e011f49a23af25129b7c680ddea48fb",
      Chapter8PropertiesOfLight: "fafce58d624495031073d45fb2f9ec12c2bacaccb49b43ab3e2d55f7761c0508",
      Chapter8Reflection: "b57e8d2bf6fe30c19a7272095e453819c0f9d7ce7404802fe942cd2516a427eb",
    };
    Object.entries(files).forEach(([file, expected]) =>
      expect(
        sha(readFileSync(`src/components/notes/${file}.tsx`, "utf8").replace(/\r\n/g, "\n")),
      ).toBe(expected),
    );
  });
  it("preserves the complete 8.7 presentation and review markup", () => {
    const source = readFileSync(
      "src/components/notes/ScienceF1Chapter8VisualNotesBlock.tsx",
      "utf8",
    ).replace(/\r\n/g, "\n");
    expect(
      sha(
        source
          .slice(source.indexOf('          <section id="chapter8-87"'))
          .replace(
            /^ +<p\n +data-colour-refinement="[^"\n]+"\n +className="[^"\n]+"\n +>\n[^\n]*\n +<\/p>\n/gm,
            "",
          ),
      ),
    ).toBe("1586997d29b96f961b6c0fe2f5283c1e4d6bffb287927828d21ff6f9547a4d15");
  });
  for (const lang of ["en", "bm"] as const) {
    const t = content[lang],
      s = t.refraction;
    const render = () => mount(createElement(Chapter8Refraction, { source: s }));
    it(`${lang}: locks all approved 8.1–8.3 facts and deferred 8.7 facts and supplements`, () => {
      expect(hash(t.mirrors)).toBe(locks[lang].mirrors);
      expect(hash(t.propertiesOfLight)).toBe(locks[lang].properties);
      expect(hash(t.reflection)).toBe(locks[lang].reflection);
      const keys = ["colorAdditionSubtraction"] as const;
      expect(hash(Object.fromEntries(keys.map((k) => [k, t[k]])))).toBe(locks[lang].deferred);
      expect(hash(supplement[lang])).toBe(locks[lang].supplement);
    });
    it(`${lang}: keeps seven official sections with 8.4 isolated`, () => {
      mount(createElement(ScienceF1Chapter8VisualNotesBlock, { content, lang }));
      expect(
        [...host.querySelectorAll("[data-official-subtopic]")].map((n) =>
          n.getAttribute("data-official-subtopic"),
        ),
      ).toEqual(["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7"]);
      expect(host.querySelectorAll("nav a")).toHaveLength(7);
      expect(
        host.querySelectorAll('[data-official-subtopic="8.4"] [data-refraction-lesson]'),
      ).toHaveLength(1);
    });
    it(`${lang}: introduces source illusions before the definition and four ray cases`, () => {
      render();
      expect(host.textContent).toContain(s.illusions.pond);
      expect(host.textContent).toContain(s.illusions.pencil);
      expect(host.querySelector("[data-refraction-definition]")?.textContent).toBe(s.definition);
      expect(s.definition).toBe(
        lang === "en"
          ? "Refraction of light is the change in direction of light when light travels through two media of different densities."
          : "Pembiasan cahaya ialah perubahan arah perambatan atau pembengkokan cahaya apabila cahaya bergerak melalui dua medium yang berbeza ketumpatan.",
      );
      const lesson = host.querySelector("[data-refraction-lesson]")!;
      expect(lesson.children[0].hasAttribute("data-refraction-illusions")).toBe(true);
      expect(host.querySelectorAll("[data-ray-case]")).toHaveLength(4);
      expect(host.textContent).not.toMatch(
        /Snell|refractive index|indeks biasan|i\s*[<>]\s*r|speed increases|speed decreases|kelajuan bertambah|kelajuan berkurang/i,
      );
    });
    it(`${lang}: fish image is shallower, observer above water and rays bend away at the surface`, () => {
      render();
      const d = host.querySelector('[data-refraction-visual="fish"]')!;
      const actual = point(d.querySelector("[data-actual-fish]")!),
        apparent = point(d.querySelector("[data-apparent-fish]")!),
        observer = point(d.querySelector("[data-observer]")!);
      const surface = numbers(d.querySelector("[data-water-surface]")!.getAttribute("d")!)[1];
      expect(actual[1]).toBeGreaterThan(apparent[1]);
      expect(apparent[1]).toBeGreaterThan(surface);
      expect(observer[1]).toBeLessThan(surface);
      d.querySelectorAll("[data-fish-ray-pair]").forEach((pair) => {
        const water = path(pair, "fish-water"),
          air = path(pair, "fish-air"),
          extension = path(pair, "apparent-extension");
        expect(water.slice(0, 2)).toEqual(actual);
        expect(water[3]).toBe(surface);
        expect(air.slice(0, 2)).toEqual(water.slice(2));
        expect(air[3]).toBeLessThan(surface);
        expect(angle(air)).toBeGreaterThan(angle(water));
        expect(extension.slice(2)).toEqual(apparent);
        // Dashed backtrace aligns with the ray in air, not with the underwater ray.
        expect((air[2] - air[0]) / (air[3] - air[1])).toBeCloseTo(
          (extension[2] - extension[0]) / (extension[3] - extension[1]),
          8,
        );
        expect(
          pair.querySelector('[data-ray="apparent-extension"]')?.getAttribute("stroke-dasharray"),
        ).toBe("5 5");
        expect(pair.querySelector('[data-ray-arrow="apparent-extension"]')).toBeNull();
      });
      ["observer", "actualFish", "image", "light"].forEach((k) =>
        expect(host.textContent).toContain(s.labels[k as keyof typeof s.labels]),
      );
      expect(host.textContent).toContain(s.fish.explanation);
      expect(host.textContent).toContain(s.fish.question);
      expect(host.textContent).not.toMatch(/aim below|sasark.*bawah|tujukan.*bawah/i);
    });
    it(`${lang}: all four cases have correct directions, water placement, perpendicular normals and arrows`, () => {
      render();
      s.cases.forEach((c, i) => {
        const f = host.querySelector(`[data-ray-case="${c.id}"]`)!;
        expect(f.textContent).toContain(c.from);
        expect(f.textContent).toContain(c.to);
        expect(f.textContent).toContain(c.behavior);
        expect(f.textContent).toContain(s.labels.incident);
        expect(f.textContent).toContain(s.labels.refracted);
        expect(f.textContent).toContain(s.labels.normal);
        const d = f.querySelector("svg")!;
        expect(d.querySelector("[data-boundary]")?.getAttribute("d")).toBe("M15 120H305");
        expect(d.querySelector("[data-normal]")?.getAttribute("d")).toBe("M160 8V232");
        expect(d.querySelector("[data-water-medium]")?.getAttribute("y")).toBe(
          i % 2 === 0 ? "15" : "120",
        );
        const incident = path(d, "incident"),
          refracted = path(d, "refracted");
        expect(incident.slice(2)).toEqual([160, 120]);
        expect(refracted.slice(0, 2)).toEqual([160, 120]);
        if (i === 0) expect(angle(refracted)).toBeGreaterThan(angle(incident));
        else if (i === 1) expect(angle(refracted)).toBeLessThan(angle(incident));
        else {
          expect(incident[0]).toBe(160);
          expect(refracted[2]).toBe(160);
          expect(angle(incident)).toBe(0);
          expect(angle(refracted)).toBe(0);
        }
        d.querySelectorAll("[data-ray-arrow]").forEach((n) => {
          const v = numbers(n.getAttribute("points")!);
          expect(v[1]).toBeGreaterThan((v[3] + v[5]) / 2);
        });
      });
    });
    it(`${lang}: Experiment 8.2 has source aim, corrected variable mapping and exact apparatus`, () => {
      render();
      const e = host.querySelector("[data-refraction-experiment]")!;
      expect(e.textContent).toContain(s.experiment.aim);
      expect(e.querySelector("[data-refraction-variables]")).toBeNull();
      expect(e.textContent).toContain(s.experiment.hypothesis);
      expect(s.experiment.variables).toEqual(
        lang === "en"
          ? {
              manipulated: "Angle of incidence, i",
              responding: "Angle of refraction, r",
              constant: "Size of slit and shape of glass block",
            }
          : {
              manipulated: "Sudut tuju, i",
              responding: "Sudut biasan, r",
              constant: "Saiz celah dan bentuk bongkah kaca",
            },
      );
      expect(s.experiment.materials).toEqual(
        lang === "en"
          ? [
              "Glass block",
              "Ray box",
              "Single-slit plate",
              "Plastic ruler",
              "Power supply",
              "White paper",
              "Protractor",
            ]
          : [
              "Bongkah kaca",
              "Kotak sinar",
              "Plat satu celah",
              "Pembaris",
              "Bekalan kuasa",
              "Kertas putih",
              "Protraktor",
            ],
      );
      expect(e.querySelector("[data-refraction-materials]")).toBeNull();
    });
    it(`${lang}: glass-block apparatus uses normals for i/r and rays enter, traverse and leave the block`, () => {
      render();
      const d = host.querySelector('[data-refraction-visual="experiment"]')!;
      [
        "glass-block",
        "white-paper",
        "ray-box",
        "single-slit",
        "power-supply",
        "ruler",
        "protractor",
        "entry-normal",
        "traced-outline",
      ].forEach((k) => expect(d.querySelector(`[data-${k}]`)).not.toBeNull());
      const incident = path(d, "incident"),
        internal = path(d, "internal"),
        emerging = path(d, "emerging");
      expect(incident.slice(2)).toEqual(internal.slice(0, 2));
      expect(internal.slice(2)).toEqual(emerging.slice(0, 2));
      expect(internal).toEqual([165, 205, 215, 105]);
      expect(angle(internal)).toBeLessThan(angle(incident));
      expect(angle(emerging)).toBeCloseTo(angle(incident), 8);
      expect(d.querySelector("[data-entry-normal]")?.getAttribute("d")).toBe("M165 140V282");
      expect(d.querySelector("[data-i-arc]")?.getAttribute("d")).toMatch(/^M165 250A45 45/);
      expect(d.querySelector("[data-r-arc]")?.getAttribute("d")).toMatch(/^M165 160A45 45/);
      // Both arc starts are on x=165, the normal through entry (165,205).
      for (const key of ["i", "r"]) {
        const v = numbers(d.querySelector(`[data-${key}-arc]`)!.getAttribute("d")!);
        expect(v[0]).toBe(165);
        expect(v[1]).not.toBe(205);
      }
      d.querySelectorAll("[data-ray-arrow]").forEach((n) => {
        const v = numbers(n.getAttribute("points")!);
        expect(v[1]).toBeLessThan((v[3] + v[5]) / 2);
      });
    });
    it(`${lang}: removing the glass preserves its traced outline and constructed ray path`, () => {
      render();
      const before = host
        .querySelector('[data-refraction-visual="experiment"] [data-ray="internal"]')!
        .getAttribute("d");
      tap("[data-glass-controls] button", 1);
      expect(host.querySelector("[data-glass-block]")).toBeNull();
      expect(host.querySelector("[data-traced-outline]")).not.toBeNull();
      expect(
        host
          .querySelector('[data-refraction-visual="experiment"] [data-ray="internal"]')
          ?.getAttribute("d"),
      ).toBe(before);
      expect(
        host.querySelectorAll("[data-glass-controls] button")[1].getAttribute("aria-pressed"),
      ).toBe("true");
      tap("[data-glass-controls] button", 0);
      expect(host.querySelector("[data-glass-block]")).not.toBeNull();
    });
    it(`${lang}: preserves the air-to-glass relationship and angle labels without procedural results or graph tasks`, () => {
      render();
      const e = host.querySelector("[data-refraction-experiment]")!;
      expect(e.textContent).toContain(s.experiment.aim);
      expect(e.textContent).toContain(s.experiment.hypothesis);
      expect(e.textContent).toContain(s.labels.incidence);
      expect(e.textContent).toContain(s.labels.refraction);
      expect(e.textContent).toContain(s.labels.demo);
      expect(e.querySelector("table,ol,[data-refraction-procedure],[data-graph-axes]")).toBeNull();
      s.experiment.instructions.forEach((text) => expect(e.textContent).not.toContain(text));
      s.experiment.discussion.forEach((text) => expect(e.textContent).not.toContain(text));
      expect(s.experiment.results).toEqual(Array.from({ length: 5 }, () => ({ i: null, r: null })));
    });
    it(`${lang}: Activity 8.6 phenomena accompany the existing illustrations without research instructions`, () => {
      render();
      expect(host.querySelector("[data-refraction-activity]")).toBeNull();
      s.activity.phenomena.forEach((text) =>
        expect(host.querySelector("[data-refraction-illusions]")?.textContent).toContain(text),
      );
      s.activity.instructions.forEach((text) => expect(host.textContent).not.toContain(text));
      expect(host.querySelector('[data-refraction-visual="fish"]')).not.toBeNull();
      expect(host.querySelector('[data-refraction-visual="pencil"]')).not.toBeNull();
    });
    it(`${lang}: removes duplicate practice rays while all four density cases and apparent-depth teaching remain`, () => {
      render();
      expect(host.querySelector('[data-practice="8.4"]')).toBeNull();
      expect(
        host.querySelector(
          '[data-refraction-visual="practice-1"],[data-refraction-visual="practice-2"]',
        ),
      ).toBeNull();
      expect(host.querySelectorAll("[data-ray-case]")).toHaveLength(4);
      s.cases.forEach((c) => {
        const figure = host.querySelector(`[data-ray-case="${c.id}"]`)!;
        expect(figure.textContent).toContain(c.from);
        expect(figure.textContent).toContain(c.to);
        expect(figure.textContent).toContain(c.behavior);
      });
      expect(host.textContent).toContain(s.fish.explanation);
    });
  }
  it("BM labels use refraction terms, never sudut pantulan", () => {
    mount(createElement(Chapter8Refraction, { source: content.bm.refraction }));
    [
      "Sinar tuju",
      "Sinar biasan",
      "Garis normal",
      "Sudut tuju, i",
      "Sudut biasan, r",
      "medium kurang tumpat",
      "medium lebih tumpat",
    ].forEach((s) => expect(host.textContent).toContain(s));
    expect(host.textContent).not.toMatch(/sudut pantulan/i);
  });
  it("BM and DLP use identical SVGs both with and without the glass block", () => {
    for (const i of [0, 1]) {
      mount(createElement(Chapter8Refraction, { source: content.en.refraction }));
      tap("[data-glass-controls] button", i);
      const en = geometry();
      mount(createElement(Chapter8Refraction, { source: content.bm.refraction }));
      tap("[data-glass-controls] button", i);
      expect(geometry()).toEqual(en);
    }
  });
  it("owns all 8.4 facts canonically and removes the replaced supplement fields", () => {
    for (const lang of ["en", "bm"] as const) {
      ["refractionRules", "refractionExperiment", "fishTip"].forEach((k) =>
        expect(supplement[lang]).not.toHaveProperty(k),
      );
    }
    const s = structuredClone(content.en.refraction);
    s.definition = "canonical definition sentinel";
    s.fish.question = "canonical fish question sentinel";
    s.cases[0].behavior = "canonical case sentinel";
    s.experiment.hypothesis = "canonical relationship sentinel";
    s.activity.phenomena[0] = "canonical activity sentinel";
    mount(createElement(Chapter8Refraction, { source: s }));
    ["definition", "fish question", "case", "relationship", "activity"].forEach((k) =>
      expect(host.textContent).toContain(`canonical ${k} sentinel`),
    );
    const source = readFileSync("src/components/notes/Chapter8Refraction.tsx", "utf8");
    expect(source).not.toMatch(
      /Aim below|Snell|refractive index|medium lebih tumpat|sudut biasan|const (en|bm|facts)\s*=/i,
    );
  });
});
