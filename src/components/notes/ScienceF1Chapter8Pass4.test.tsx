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
import { Chapter8Dispersion } from "./Chapter8Dispersion";
import { Chapter8Scattering } from "./Chapter8Scattering";
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
const tap = (selector: string, index = 0) =>
  act(() => host.querySelectorAll<HTMLButtonElement>(selector)[index].click());
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const hash = (v: unknown) => sha(JSON.stringify(v));
const read = (p: string) => readFileSync(p, "utf8").replace(/\r\n/g, "\n");
const nums = (s: string) => s.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
const ray = (el: Element) => nums(el.getAttribute("d")!);
const angle = (p: number[]) => Math.atan2(p[3] - p[1], p[2] - p[0]);
const geometry = () => [...host.querySelectorAll("svg")].map((n) => n.outerHTML);

// Captured from the clean working tree before Pass 4. Never generated from edited data.
const locks = {
  en: {
    mirrors: "f9ba2250f78733bf980abf159591493f7718fb0502bcbf72d8af1b3ed0085115",
    propertiesOfLight: "30892516c7b52edbeb3a815af5dd9e0c68697f3e459a4564257fab75f28f5b32",
    reflection: "edb95a522087ad0eecc853000d66d3984a8eff84382aedb7e9bf003d8cdd9da4",
    refraction: "5a0d44c713094b70a792918002d0cfe4033801a1bdf0ceb4d8240d5b51722571",
    colorAdditionSubtraction: "20f5b6f8c49cfc15f5319083dc2ec59f7b0276310ece22eca45921e21728eee0",
    deferred: "95a724cbdb1d34b00f8b15710a3f8754012f798d50c9b2665f0bea41b1fe9ef9",
    supplement: "bdf887aa50e4f06d1d1d4abddd0a2a95d532327f68e842093f03525eebeb5389",
  },
  bm: {
    mirrors: "a2a31f0fbd34c9e4efe16bc472ea69a83c07d5d280b676ebff796171cb260e2a",
    propertiesOfLight: "98f9abcf4c1563d3b0f0427f4cef260bc2aeb5b42b715e56af831751032cfe6a",
    reflection: "6f63c7b902fa79fa6711548e6ae2bc511ef95bbfc4a764d4255ec38f9cf57888",
    refraction: "f3d720a5b196d3a487d52a981b70845ace3553273c3b970d7d6351634f5b878d",
    colorAdditionSubtraction: "9c63a2eab4f9dde4a883afb797192472ccab6e42139692df8983f09634a315e4",
    deferred: "5b924ae4a14de777bdce2320a23ab1434729e9e37368b03fe35af7833691d552",
    supplement: "072172febec651301b49dc36b96d24bccd3d75c541ec7d446b2ed61d386844a8",
  },
  Chapter8Mirrors: "e048f18ea0739910d13aebe1d90987ef190543dcf6c7fbabc90726f52f05056d",
  Chapter8PropertiesOfLight: "e92572bc4e6980b5505efd0b7cab711c95a024b4fe2f71afeb5855b8be078d64",
  Chapter8Reflection: "63e3e7cbd789f880780d8103b6b859c45b4f2225602b6da80cffd6c345d2ec56",
  Chapter8Refraction: "12bfc933e74e482e50eae8a71a843a3976c8b08e24e34fa2c524f4da3e549de1",
  presentation: "1586997d29b96f961b6c0fe2f5283c1e4d6bffb287927828d21ff6f9547a4d15",
};

describe("Chapter 8 Pass 4 — audited dispersion and scattering", () => {
  it("locks all four approved component files and the complete 8.7/review presentation", () => {
    for (const name of [
      "Chapter8Mirrors",
      "Chapter8PropertiesOfLight",
      "Chapter8Reflection",
      "Chapter8Refraction",
    ] as const)
      expect(sha(read(`src/components/notes/${name}.tsx`))).toBe(locks[name]);
    const root = read("src/components/notes/ScienceF1Chapter8VisualNotesBlock.tsx");
    expect(sha(root.slice(root.indexOf('          <section id="chapter8-87"')))).toBe(
      locks.presentation,
    );
  });
  for (const lang of ["en", "bm"] as const) {
    const t = content[lang],
      d = t.dispersion,
      s = t.scattering;
    const dispersion = () => mount(createElement(Chapter8Dispersion, { source: d }));
    const scattering = () => mount(createElement(Chapter8Scattering, { source: s }));
    it(`${lang}: 8.1–8.4, 8.7 and remaining supplements retain pre-edit hashes`, () => {
      for (const k of [
        "mirrors",
        "propertiesOfLight",
        "reflection",
        "refraction",
        "colorAdditionSubtraction",
      ] as const)
        expect(hash(t[k])).toBe(locks[lang][k]);
      expect(hash(supplement[lang])).toBe(locks[lang].supplement);
      expect(supplement[lang]).not.toHaveProperty("dispersionExperiments");
      expect(supplement[lang]).not.toHaveProperty("scatteringExperiment");
    });
    it(`${lang}: seven official sections, source terminology and navigation remain`, () => {
      mount(createElement(ScienceF1Chapter8VisualNotesBlock, { content, lang }));
      expect(
        [...host.querySelectorAll("[data-official-subtopic]")].map((n) =>
          n.getAttribute("data-official-subtopic"),
        ),
      ).toEqual(["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7"]);
      expect(host.querySelectorAll("nav a")).toHaveLength(7);
      expect(host.querySelector("#chapter8-85 h2")!.textContent).toBe(
        lang === "bm" ? "8.5 Penyebaran Cahaya" : "8.5 Dispersion of Light",
      );
      expect(host.querySelector("#chapter8-86 h2")!.textContent).toBe(
        lang === "bm" ? "8.6 Penyerakan Cahaya" : "8.6 Scattering of Light",
      );
      expect(host.textContent).not.toMatch(/MUJHHBIU|\bNila\b|Serakan cahaya/i);
    });
    it(`${lang}: spectrum is precisely the seven textbook components and speed comparison renders`, () => {
      dispersion();
      expect(d.spectrumOrder).toEqual(
        lang === "bm"
          ? ["Merah", "Jingga", "Kuning", "Hijau", "Biru", "Indigo", "Ungu"]
          : ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"],
      );
      for (const text of [d.definition, d.speedFact, ...d.prismBehaviour, ...d.spectrumOrder])
        expect(host.textContent).toContain(text);
      expect(d.speedFact).toMatch(
        lang === "bm"
          ? /merah.*paling tinggi.*paling kurang.*ungu.*paling rendah.*paling banyak/
          : /red.*highest speed.*least.*violet.*lowest speed.*most/,
      );
      expect(host.textContent).not.toMatch(
        /Snell|refractive index|indeks biasan|wavelength|frequency|quantum|pantulan dalam|internal reflection/i,
      );
      if (lang === "bm") {
        expect(host.textContent).toContain("disebarkan");
        expect(host.textContent).not.toContain("diserakkan");
      }
    });
    it(`${lang}: white ray enters a triangular prism, seven ordered nonparallel rays reach a white screen`, () => {
      dispersion();
      const svg = host.querySelector('[data-optics-visual="prism"]')!;
      expect(svg.querySelector("[data-prism]")!.getAttribute("d")).toBe("M230 30L130 220H330Z");
      expect(ray(svg.querySelector('[data-light-ray="white-entry"] path')!).slice(2)).toEqual([
        185, 115.5,
      ]);
      const rays = [...svg.querySelectorAll("[data-spectrum-ray]")];
      expect(rays).toHaveLength(7);
      let previous = -Infinity;
      for (const r of rays) {
        const internal = ray(r.querySelector("[data-internal-ray]")!),
          exit = ray(r.querySelector('[data-light-ray="spectrum-exit"] path')!);
        expect(internal.slice(0, 2)).toEqual([185, 115.5]);
        expect(exit.slice(0, 2)).toEqual(internal.slice(2));
        // Exit point lies on the right glass face, rather than floating inside/outside it.
        expect(exit[1]).toBeCloseTo(1.9 * exit[0] - 407, 5);
        expect(exit[2]).toBe(428);
        expect(exit[3]).toBeGreaterThan(previous);
        previous = exit[3];
        expect(r.querySelector("polygon")).not.toBeNull();
      }
      expect(svg.querySelector("[data-white-screen]")!.getAttribute("fill")).toBe("#f8fafc");
    });
    it(`${lang}: actual prism ray angles bend toward entry normal, away at exit, red least/violet most`, () => {
      dispersion();
      const svg = host.querySelector('[data-optics-visual="prism"]')!;
      const incoming = angle(ray(svg.querySelector('[data-light-ray="white-entry"] path')!));
      const entryNormal = Math.atan(1 / 1.9),
        exitNormal = -entryNormal;
      const deviations: number[] = [];
      svg.querySelectorAll("[data-spectrum-ray]").forEach((r) => {
        const inside = angle(ray(r.querySelector("[data-internal-ray]")!)),
          out = angle(ray(r.querySelector('[data-light-ray="spectrum-exit"] path')!));
        expect(Math.abs(inside - entryNormal)).toBeLessThan(Math.abs(incoming - entryNormal));
        expect(Math.abs(out - exitNormal)).toBeGreaterThan(Math.abs(inside - exitNormal));
        deviations.push(out - incoming);
      });
      expect(deviations.every((v, i) => i === 0 || v > deviations[i - 1])).toBe(true);
      const a = ray(svg.querySelector('[data-normal="entry"]')!),
        b = ray(svg.querySelector('[data-normal="exit"]')!);
      expect(((a[3] - a[1]) / (a[2] - a[0])) * -1.9).toBeCloseTo(-1, 2);
      expect(((b[3] - b[1]) / (b[2] - b[0])) * 1.9).toBeCloseTo(-1, 2);
    });
    it(`${lang}: rainbow chain and inverted-prism inquiry are source-backed, with no invented answer`, () => {
      dispersion();
      const v = host.querySelector('[data-optics-visual="rainbow"]')!;
      expect(v.querySelector("[data-water-droplet]")).not.toBeNull();
      expect(v.querySelectorAll('[data-light-ray="dispersed-colour"]')).toHaveLength(7);
      expect(host.textContent).toContain(d.rainbowFormation);
      expect(d.rainbowFormation).toMatch(
        lang === "bm" ? /dibiaskan dan disebarkan/ : /refracted and dispersed/,
      );
      expect(host.querySelector("[data-prism-inquiry]")!.textContent).toBe(d.inquiry);
      expect(d.inquiry.endsWith("?")).toBe(true);
    });
    it(`${lang}: Activity 8.7 has two real selectable setups and complete five-step source procedures`, () => {
      dispersion();
      const a = host.querySelector('[data-activity="8.7"]')!;
      expect(d.activity.parts.map((p) => p.id)).toEqual(lang === "bm" ? ["A", "B"] : ["I", "II"]);
      d.activity.apparatus.forEach((v) => expect(a.textContent).toContain(v));
      expect(a.querySelector("[data-ray-box]")).not.toBeNull();
      expect(a.querySelector("[data-prism]")).not.toBeNull();
      expect(a.querySelectorAll("[data-procedure] li")).toHaveLength(5);
      d.activity.parts[0].steps.forEach((p) => expect(a.textContent).toContain(p));
      tap('[data-activity="8.7"] button', 1);
      expect(a.querySelector('[data-activity-part="B"]')).not.toBeNull();
      for (const key of [
        "basin",
        "water",
        "inclined-mirror",
        "tape",
        "torch",
        "black-card",
        "white-paper",
      ])
        expect(a.querySelector(`[data-${key}]`)).not.toBeNull();
      expect(a.querySelectorAll('[data-light-ray="mirror-to-paper"]')).toHaveLength(7);
      expect(a.querySelectorAll("[data-procedure] li")).toHaveLength(5);
      d.activity.parts[1].steps.forEach((p) => expect(a.textContent).toContain(p));
      expect(a.querySelectorAll("button")[1].getAttribute("aria-pressed")).toBe("true");
      tap('[data-activity="8.7"] button');
      expect(a.querySelector('[data-optics-visual="prism-apparatus"]')).not.toBeNull();
    });
    it(`${lang}: Formative Practice 8.5 retains exactly its two concepts and apparatus visual`, () => {
      dispersion();
      const p = host.querySelector('[data-practice="8.5"]')!;
      expect(p.querySelectorAll("li")).toHaveLength(2);
      d.practice.questions.forEach((q) => expect(p.textContent).toContain(q));
      expect(p.querySelector("[data-prism]")).not.toBeNull();
    });
    it(`${lang}: source scattering definition, particles and day/evening explanations render`, () => {
      scattering();
      expect(host.querySelector("[data-scattering-definition]")!.textContent).toBe(s.definition);
      if (lang === "bm")
        expect(s.definition).toBe(
          "Penyerakan cahaya berlaku apabila sinar cahaya dihalang dan dipantulkan ke semua arah oleh awan atau zarah-zarah dalam udara.",
        );
      else
        expect(s.definition).toBe(
          "Scattering of light occurs when light is reflected in all directions by clouds or particles in the air.",
        );
      [s.middayExplanation, s.sunsetExplanation, s.labels.particles].forEach((v) =>
        expect(host.textContent).toContain(v),
      );
      expect(host.textContent).not.toMatch(/more atmosphere|lebih banyak atmosfera|Rayleigh/i);
      if (lang === "bm") expect(host.textContent).toContain("diserak");
    });
    it(`${lang}: midday sunlight meets particles, blue redirects in many directions including the observer`, () => {
      scattering();
      const svg = host.querySelector('[data-optics-visual="midday"]')!;
      expect(svg.querySelectorAll("[data-air-particle]").length).toBeGreaterThan(2);
      expect(svg.querySelectorAll('[data-light-ray="blue-scattered"]')).toHaveLength(6);
      const branches = [...svg.querySelectorAll('[data-light-ray="blue-scattered"] path')].map(ray);
      expect(branches.every((p) => p[0] === 215 && p[1] === 113)).toBe(true);
      expect(branches.some((p) => p[3] < 113)).toBe(true);
      expect(branches.some((p) => p[3] > 113)).toBe(true);
      expect(branches.some((p) => p[2] === 163 && p[3] === 170)).toBe(true);
      expect(Number(svg.querySelector("[data-sun]")!.getAttribute("cy"))).toBeLessThan(113);
    });
    it(`${lang}: sunset is horizontal; red/orange reach observer while blue leaves the original path`, () => {
      scattering();
      const svg = host.querySelector('[data-optics-visual="sunset"]')!;
      for (const k of ["red", "orange"]) {
        const p = ray(svg.querySelector(`[data-light-ray="${k}-to-observer"] path`)!);
        expect(p[1]).toBe(p[3]);
        expect(p[2]).toBeLessThan(p[0]);
        expect(p[2]).toBe(78);
      }
      const branches = [...svg.querySelectorAll('[data-light-ray="blue-away"] path')].map(ray);
      expect(branches).toHaveLength(3);
      expect(branches.every((p) => p[1] !== p[3])).toBe(true);
    });
    it(`${lang}: Activity 8.8 has the four source apparatus, water, seven steps and two questions`, () => {
      scattering();
      const a = host.querySelector('[data-activity="8.8"]')!;
      expect(s.activity.apparatus).toEqual(
        lang === "bm"
          ? ["Serbuk susu", "Bikar kaca 1000 ml", "Kotak sinar", "Skrin putih"]
          : ["Milk powder", "1000 ml glass beaker", "Ray box", "White screen"],
      );
      for (const key of [
        "beaker",
        "water",
        "milk-spoon",
        "ray-box",
        "white-screen",
        "side-observation",
        "screen-observation",
      ])
        expect(a.querySelector(`[data-${key}]`)).not.toBeNull();
      expect(a.querySelectorAll("[data-procedure] li")).toHaveLength(7);
      [...s.activity.apparatus, ...s.activity.steps, ...s.activity.questions].forEach((v) =>
        expect(a.textContent).toContain(v),
      );
      expect(a.querySelectorAll("[data-activity-questions] li")).toHaveLength(2);
    });
    it(`${lang}: observation selector changes viewing position without inventing measured colours or answers`, () => {
      scattering();
      const a = host.querySelector('[data-activity="8.8"]')!;
      expect(a.querySelector('[data-observation-position="side"]')).not.toBeNull();
      expect(a.querySelector("[data-side-observation]")!.getAttribute("opacity")).toBe("1");
      tap('[data-activity="8.8"] button', 1);
      expect(a.querySelector('[data-observation-position="screen"]')).not.toBeNull();
      expect(a.querySelector("[data-screen-observation]")!.getAttribute("opacity")).toBe("1");
      expect(a.textContent).not.toMatch(
        /kebiruan|merah jingga|mewakili.*atmosfera|bluish|reddish|represent.*atmosphere/i,
      );
      expect(a.querySelector("[data-white-screen]")!.getAttribute("fill")).toBe("#e2e8f0");
      expect(a.querySelector("[data-water]")!.getAttribute("fill")).toBe("#cbd5e115");
      expect(s.activity).not.toHaveProperty("result");
      expect(s.activity).not.toHaveProperty("answers");
    });
    it(`${lang}: Practice 8.6 has two questions and two observer diagrams with unfilled comparisons`, () => {
      scattering();
      const p = host.querySelector('[data-practice="8.6"]')!;
      expect(p.querySelectorAll("li")).toHaveLength(2);
      expect(p.querySelectorAll("svg")).toHaveLength(2);
      expect(p.querySelectorAll("[data-observer]")).toHaveLength(2);
      [...s.practice.questions, ...s.practice.comparisons].forEach((v) =>
        expect(p.textContent).toContain(v),
      );
      expect(s.practice.comparisons.every((q) => q.includes("______"))).toBe(true);
    });
  }
  it("BM and DLP share byte-identical SVG geometry in both activity states", () => {
    const render = (lang: "en" | "bm") =>
      mount(
        createElement(
          "div",
          { key: lang },
          createElement(Chapter8Dispersion, { source: content[lang].dispersion }),
          createElement(Chapter8Scattering, { source: content[lang].scattering }),
        ),
      );
    render("en");
    const initial = geometry();
    tap('[data-activity="8.7"] button', 1);
    tap('[data-activity="8.8"] button', 1);
    const alternate = geometry();
    render("bm");
    expect(geometry()).toEqual(initial);
    tap('[data-activity="8.7"] button', 1);
    tap('[data-activity="8.8"] button', 1);
    expect(geometry()).toEqual(alternate);
  });
  it("new components consume canonical props; dispersion and scattering are structurally distinct", () => {
    mount(
      createElement(
        "div",
        null,
        createElement(Chapter8Dispersion, { source: content.en.dispersion }),
        createElement(Chapter8Scattering, { source: content.en.scattering }),
      ),
    );
    expect(host.querySelector("[data-dispersion-lesson] [data-prism]")).not.toBeNull();
    expect(host.querySelector("[data-dispersion-lesson] [data-air-particle]")).toBeNull();
    expect(host.querySelector("[data-scattering-lesson] [data-air-particle]")).not.toBeNull();
    expect(host.querySelector("[data-scattering-lesson] [data-prism]")).toBeNull();
    for (const name of ["Chapter8Dispersion", "Chapter8Scattering"]) {
      const source = read(`src/components/notes/${name}.tsx`);
      expect(source).not.toMatch(/lang\s*===|chapter8Supplement|const\s+(?:en|bm)\s*=/);
      expect(source).toContain("source: s");
      for (const fact of [
        content.en.dispersion.definition,
        content.bm.dispersion.definition,
        content.en.scattering.definition,
        content.bm.scattering.definition,
      ])
        expect(source).not.toContain(fact);
    }
  });
});
