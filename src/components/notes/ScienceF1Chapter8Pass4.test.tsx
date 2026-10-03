// Authorised 8.7 teaching refinement: supplement and 8.7 presentation snapshots updated; other locks unchanged.
// Authorised glass-entry simplification: only 8.4 snapshots updated.
// 8.3 application refinement: only reflection content/component snapshots updated for the supplied explanation.
// Revision cleanup (2026-10-03): only the four 8.1–8.4 component snapshots are updated; canonical/deferred locks are unchanged.
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
    reflection: "86f052c685158c7c3fee19cd721bbd84c8c9652bf78f19a26dbe04207c5bba09",
    refraction: "b93cec69af9ac56c6cf93e31d703e442c973cc5e53d84c0188fbad2d02d81f68",
    colorAdditionSubtraction: "20f5b6f8c49cfc15f5319083dc2ec59f7b0276310ece22eca45921e21728eee0",
    deferred: "95a724cbdb1d34b00f8b15710a3f8754012f798d50c9b2665f0bea41b1fe9ef9",
    supplement: "f372bff938253bcb1a1e26327fc617a2a11e5dd6726fdb620cf35266ba5ad595",
  },
  bm: {
    mirrors: "a2a31f0fbd34c9e4efe16bc472ea69a83c07d5d280b676ebff796171cb260e2a",
    propertiesOfLight: "98f9abcf4c1563d3b0f0427f4cef260bc2aeb5b42b715e56af831751032cfe6a",
    reflection: "c2f9235ecf43c945af6bd2db40448c0c36f34eab5d7ef946dbd939f5250c0bc1",
    refraction: "cbe4a4dfa8ec8ed78f4e26b29e715f243025a042ff836cb44d51903dd7ac6916",
    colorAdditionSubtraction: "9c63a2eab4f9dde4a883afb797192472ccab6e42139692df8983f09634a315e4",
    deferred: "5b924ae4a14de777bdce2320a23ab1434729e9e37368b03fe35af7833691d552",
    supplement: "1e10cd62d684a16a0cc8389b986555cf9ac6395bdb7668857ff9b4de065198f5",
  },
  Chapter8Mirrors: "0ec93bea9fc2e5a8c32eac59f48279ce3e011f49a23af25129b7c680ddea48fb",
  Chapter8PropertiesOfLight: "fafce58d624495031073d45fb2f9ec12c2bacaccb49b43ab3e2d55f7761c0508",
  Chapter8Reflection: "b4e09434648f359a49c1db0375deb99a0d09328fdaf1415b3bafdb5d8f176a81",
  Chapter8Refraction: "91241476e3beb06bbf40ec2b81e0e00edc9aac71967c6a1fdf2e51ebbc42260c",
  presentation: "e21fb8f35694fe887082c16586fec3d0ec9220a16ccc8a534eeebbac296cb883",
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
    expect(
      sha(
        root
          .slice(root.indexOf('          <section id="chapter8-87"'))
          .replace(
            /^ +<p\n +data-colour-refinement="[^"\n]+"\n +className="[^"\n]+"\n +>\n[^\n]*\n +<\/p>\n/gm,
            "",
          ),
      ),
    ).toBe(locks.presentation);
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
    it(`${lang}: explains dispersion before its diagram and lists each spectrum colour once`, () => {
      dispersion();
      const lesson = host.querySelector("[data-dispersion-lesson]")!;
      expect(lesson.firstElementChild?.getAttribute("data-dispersion-definition")).toBe("");
      expect(lesson.firstElementChild?.textContent).toBe(d.prismBehaviour[0]);
      expect(host.querySelector("[data-prism-exit]")?.textContent).toBe(d.prismBehaviour[1]);
      expect(d.prismBehaviour[1]).not.toContain(d.spectrumOrder.join(", ").toLowerCase());
      const spectrum = host.querySelector("figure figcaption ol:last-child")!;
      expect([...spectrum.querySelectorAll("li")].map((n) => n.textContent)).toEqual(
        d.spectrumOrder,
      );
      // The long colour-list sentence used to repeat the labelled spectrum in DLP.
      expect(host.textContent).not.toContain("The spectrum of white light consists of red, orange");
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
    it(`${lang}: rainbow chain is source-backed without an extra inquiry block`, () => {
      dispersion();
      const v = host.querySelector('[data-optics-visual="rainbow"]')!;
      expect(v.querySelector("[data-water-droplet]")).not.toBeNull();
      expect(v.querySelectorAll('[data-light-ray="dispersed-colour"]')).toHaveLength(7);
      expect(host.textContent).toContain(d.rainbowFormation);
      expect(d.rainbowFormation).toMatch(
        lang === "bm" ? /dibiaskan dan disebarkan/ : /refracted and dispersed/,
      );
      expect(host.querySelector("[data-prism-inquiry]")).toBeNull();
      expect(d.inquiry.endsWith("?")).toBe(true);
    });
    it(`${lang}: Activity 8.7 source is preserved without classroom procedures in revision notes`, () => {
      dispersion();
      expect(d.activity.parts.map((p) => p.steps.length)).toEqual([5, 5]);
      expect(host.querySelector("[data-activity]")).toBeNull();
      expect(host.querySelector("[data-procedure]")).toBeNull();
      expect(host.textContent).not.toContain(d.activity.aim);
      expect(host.textContent).not.toContain(d.labels.apparatus);
      expect(host.textContent).toContain(d.rainbowFormation);
      expect(host.textContent).toContain(d.speedFact);
    });
    it(`${lang}: dispersion uses only one explanatory prism and one rainbow`, () => {
      dispersion();
      expect(
        [...host.querySelectorAll("svg")].map((n) => n.getAttribute("data-optics-visual")),
      ).toEqual(["prism", "rainbow"]);
      expect(host.querySelector("[data-practice]")).toBeNull();
      expect(host.textContent).not.toContain(d.inquiry);
      expect(host.textContent).not.toMatch(/8\.5\.[12]|Basic text/);
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
          "Scattering of light occurs when light rays are obstructed and reflected in all directions by clouds or particles in the air.",
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
    it(`${lang}: Activity 8.8 data remains complete but the laboratory manual is absent`, () => {
      scattering();
      expect(s.activity.steps).toHaveLength(7);
      expect(s.activity.questions).toHaveLength(2);
      expect(s.activity).not.toHaveProperty("result");
      expect(host.querySelector("[data-activity]")).toBeNull();
      expect(host.querySelector("[data-procedure]")).toBeNull();
      expect(host.textContent).not.toContain(s.activity.aim);
      expect(host.textContent).not.toContain(s.labels.apparatus);
      expect(host.textContent).not.toContain(s.activity.questions[0]);
    });
    it(`${lang}: sunset path and blue versus red/orange comparison are explicit`, () => {
      scattering();
      expect(host.querySelector("[data-sunset-path]")!.textContent).toBe(s.revision.longerPath);
      expect(s.revision.longerPath).toContain(
        lang === "en"
          ? "longer path in the atmosphere"
          : "lintasan yang lebih panjang dalam atmosfera",
      );
      const compare = host.querySelector("[data-scattering-comparison]")!;
      expect(compare.textContent).toContain(s.revision.blue);
      expect(compare.textContent).toContain(s.revision.red);
      expect(host.textContent).not.toMatch(/8\.6\.[12]|Basic text/);
    });
    it(`${lang}: two unique sky diagrams retain concepts and a concise distinction from dispersion`, () => {
      scattering();
      expect(
        [...host.querySelectorAll("svg")].map((n) => n.getAttribute("data-optics-visual")),
      ).toEqual(["midday", "sunset"]);
      const comparison = host.querySelector("[data-dispersion-scattering-comparison]")!;
      expect(comparison.querySelectorAll("dt")).toHaveLength(2);
      s.revision.comparison.forEach((row) =>
        Object.values(row).forEach((v) => expect(comparison.textContent).toContain(v)),
      );
      expect(host.querySelector("[data-practice]")).toBeNull();
    });
  }
  it("BM and DLP share byte-identical geometry for exactly four explanatory diagrams", () => {
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
    expect(initial).toHaveLength(4);
    render("bm");
    expect(geometry()).toEqual(initial);
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
    // These are code-native diagrams with readable HTML captions, not external image assets.
    expect(host.querySelectorAll("img, image")).toHaveLength(0);
    expect(host.querySelectorAll("svg")).toHaveLength(4);
    host
      .querySelectorAll("[data-diagram-callout] text")
      .forEach((n) => expect(Number(n.getAttribute("font-size"))).toBeGreaterThanOrEqual(18));
    expect(host.querySelectorAll("figure figcaption")).toHaveLength(4);
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
