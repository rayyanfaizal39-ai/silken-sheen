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
import { Chapter8PropertiesOfLight } from "./Chapter8PropertiesOfLight";
import { Chapter8Reflection } from "./Chapter8Reflection";
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
const hash = (v: unknown) =>
  createHash("sha256")
    .update(
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
    )
    .digest("hex");
const nums = (s: string) => s.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
const geometry = () =>
  [...host.querySelectorAll("svg")].map((svg) => {
    const clone = svg.cloneNode(true) as SVGElement;
    clone.querySelectorAll("text").forEach((n) => (n.textContent = ""));
    return clone.outerHTML;
  });

describe("Chapter 8 Pass 2 — source-controlled 8.2 and 8.3", () => {
  it("retains the approved mirror component byte-for-byte after normalizing line endings", () => {
    expect(
      createHash("sha256")
        .update(
          readFileSync("src/components/notes/Chapter8Mirrors.tsx", "utf8").replace(/\r\n/g, "\n"),
        )
        .digest("hex"),
    ).toBe("0ec93bea9fc2e5a8c32eac59f48279ce3e011f49a23af25129b7c680ddea48fb");
  });
  for (const lang of ["en", "bm"] as const) {
    const t = content[lang],
      p = t.propertiesOfLight,
      r = t.reflection;
    const properties = () => mount(createElement(Chapter8PropertiesOfLight, { source: p }));
    const reflection = () => mount(createElement(Chapter8Reflection, { source: r }));
    it(`${lang}: approved 8.1 facts and all deferred 8.7 data remain locked`, () => {
      expect(hash(t.mirrors)).toBe(
        lang === "en"
          ? "f9ba2250f78733bf980abf159591493f7718fb0502bcbf72d8af1b3ed0085115"
          : "a2a31f0fbd34c9e4efe16bc472ea69a83c07d5d280b676ebff796171cb260e2a",
      );
      // Deferred-only hashes captured before Pass 3; 8.1–8.3 locks are unchanged.
      const keys = ["colorAdditionSubtraction"] as const;
      expect(hash(Object.fromEntries(keys.map((k) => [k, t[k]])))).toBe(
        lang === "en"
          ? "95a724cbdb1d34b00f8b15710a3f8754012f798d50c9b2665f0bea41b1fe9ef9"
          : "5b924ae4a14de777bdce2320a23ab1434729e9e37368b03fe35af7833691d552",
      );
      expect(hash(supplement[lang])).toBe(
        lang === "en"
          ? "bdf887aa50e4f06d1d1d4abddd0a2a95d532327f68e842093f03525eebeb5389"
          : "072172febec651301b49dc36b96d24bccd3d75c541ec7d446b2ed61d386844a8",
      );
    });
    it(`${lang}: seven separate official sections still render`, () => {
      mount(createElement(ScienceF1Chapter8VisualNotesBlock, { content, lang }));
      expect(
        [...host.querySelectorAll("[data-official-subtopic]")].map((n) =>
          n.getAttribute("data-official-subtopic"),
        ),
      ).toEqual(["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7"]);
      expect(host.querySelectorAll('[data-official-subtopic="8.1"]')).toHaveLength(1);
      expect(host.querySelectorAll("nav a")).toHaveLength(7);
      expect(host.querySelector("nav")?.textContent).not.toMatch(/8\.2-8\.3|8\.5-8\.6/);
    });
    it(`${lang}: verified speed, lightning and straight-line travel render without added advanced optics`, () => {
      properties();
      expect(host.textContent).toContain("3.0 × 10⁸ m/s");
      p.facts.forEach((f) => expect(host.textContent).toContain(f));
      expect(host.textContent).toMatch(lang === "en" ? /lightning.*thunder/ : /kilat.*guruh/);
      expect(host.textContent).not.toMatch(/gnomon|umbra|penumbra|diffraction|difraksi/i);
      expect(host.textContent).toContain(p.rainbow);
    });
    it(`${lang}: the opaque definition and complete umbrella/shadow teaching chain are learner-facing`, () => {
      properties();
      const lesson = host.querySelector("[data-opaque-lesson]")!;
      expect(lesson.querySelector("[data-opaque-definition]")?.textContent).toBe(
        lang === "en"
          ? "An opaque object does not allow light to pass through it."
          : "Objek legap tidak membenarkan cahaya menembusinya.",
      );
      expect(lesson.textContent).toContain(lang === "en" ? "Opaque object" : "Objek legap");
      expect(lesson.textContent).toContain(
        lang === "en" ? "Umbrella = opaque object" : "Payung = objek legap",
      );
      expect(lesson.textContent).toContain(p.labels.sun);
      expect(lesson.textContent).toContain(p.opaqueObject.blockedLight);
      expect(lesson.textContent).toContain(p.labels.shadow);
      expect(
        [...lesson.querySelectorAll("[data-shadow-chain] li")].map(
          (n) => n.querySelectorAll("span")[1].textContent,
        ),
      ).toEqual(
        lang === "en"
          ? [
              "Sunlight travels in straight lines",
              "Opaque object blocks the light",
              "Light cannot pass through",
              "Shadow forms behind the opaque object",
            ]
          : [
              "Cahaya matahari bergerak lurus",
              "Objek legap menghalang cahaya",
              "Cahaya tidak dapat menembusinya",
              "Bayang-bayang terbentuk di belakang objek legap",
            ],
      );
      expect(lesson.textContent).toContain(p.opaqueObject.chain[3]);
      expect(lesson.textContent).not.toContain(p.shadowFormation[2]);
      expect(lesson.textContent).not.toMatch(/transparent|translucent|lut sinar|lut cahaya/i);
    });
    it(`${lang}: sunlight ends at the opaque umbrella, never continues through it, and the shadow is behind it`, () => {
      properties();
      const d = host.querySelector('[data-light-diagram="shadow"]')!;
      expect(d.querySelector("[data-source]")?.getAttribute("d")).toBe("M90 14H310");
      expect(d.querySelector("[data-opaque-object]")?.getAttribute("d")).toMatch(
        /^M100 130Q200 -10 300 130/,
      );
      const rays = [...d.querySelectorAll("[data-straight-ray]")];
      expect(rays).toHaveLength(5);
      expect(d.querySelectorAll("[data-blocked-ray]")).toHaveLength(5);
      rays.forEach((n) => {
        const [x1, y1, x2, y2] = nums(n.getAttribute("d")!);
        expect(x1).toBe(x2);
        expect(y1).toBe(25);
        const t = (x2 - 100) / 200;
        const canopyY = (1 - t) * (1 - t) * 130 + 2 * (1 - t) * t * -10 + t * t * 130;
        expect(y2).toBeCloseTo(canopyY, 8);
        expect(y2).toBeGreaterThan(y1);
        expect(n.getAttribute("d")?.match(/[ML]/g)).toHaveLength(2);
      });
      expect(d.querySelectorAll("[data-transmitted-ray]")).toHaveLength(0);
      // The shadow lies beyond the canopy along the downward sunlight direction.
      expect(Number(d.querySelector("[data-shadow]")?.getAttribute("cy"))).toBeGreaterThan(130);
      expect(d.querySelector("[data-shadow]")?.getAttribute("cx")).toBe("200");
      expect(d.querySelector("[data-blocked-region]")?.getAttribute("d")).toBe(
        "M100 130H300V218H100Z",
      );
      expect(d.querySelector("[data-screen]")).toBeNull();
    });
    it(`${lang}: tapping sundial positions moves both sunlight and shadow, without invented hour readings`, () => {
      properties();
      const states: string[] = [];
      for (let i = 0; i < 3; i++) {
        tap("[data-sundial-controls] button", i);
        expect(
          host.querySelectorAll("[data-sundial-controls] button")[i].getAttribute("aria-pressed"),
        ).toBe("true");
        states.push(host.querySelector("[data-dial-shadow]")!.getAttribute("d")!);
      }
      expect(new Set(states).size).toBe(3);
      expect(host.querySelector("[data-sundial]")?.textContent).toContain(p.sundial.explanation);
      expect(host.querySelector("[data-sundial]")?.textContent).not.toMatch(/\d\d:\d\d|gnomon/i);
    });
    it(`${lang}: shadow puppets show a light source, opaque puppet, screen and shadow`, () => {
      properties();
      const d = host.querySelector('[data-light-diagram="puppet"]')!;
      ["source", "opaque-object", "screen", "shadow", "blocked-ray"].forEach((key) =>
        expect(d.querySelector(`[data-${key}]`)).not.toBeNull(),
      );
      expect(d.querySelector("[data-opaque-object]")?.getAttribute("d")).toBe(
        d.querySelector("[data-shadow]")?.getAttribute("d"),
      );
      expect(host.querySelector("[data-wayang]")?.textContent).toContain(p.wayangKulit.explanation);
    });
    it(`${lang}: removes duplicate shadow practice while preserving the three explanatory shadow visuals`, () => {
      properties();
      expect(host.querySelector('[data-practice="8.2"]')).toBeNull();
      expect(host.querySelector('[data-light-diagram="shadow-practice"]')).toBeNull();
      expect(host.querySelectorAll("[data-light-diagram]")).toHaveLength(3);
      p.opaqueObject.chain.forEach((text) => expect(host.textContent).toContain(text));
      expect(host.textContent).toContain(p.rainbow);
      expect(host.textContent).not.toMatch(/prism|prisma|indigo/i);
    });
    it(`${lang}: both source law statements, plane mirror, normal and incidence point render`, () => {
      reflection();
      r.lawOfReflection.statement.forEach((f) => expect(host.textContent).toContain(f));
      expect(host.textContent).toContain("i = r");
      const d = host.querySelector('[data-reflection-diagram="law"]')!;
      expect(d.querySelector("[data-plane-mirror]")?.getAttribute("y")).toBe("260");
      expect(d.querySelector("[data-normal]")?.getAttribute("d")).toBe("M210 35V260");
      expect(d.querySelector("[data-point-of-incidence]")?.getAttribute("cx")).toBe("210");
      expect(d.querySelector("[data-point-of-incidence]")?.getAttribute("cy")).toBe("260");
    });
    it(`${lang}: all five ray states measure equal angles from the normal, with correct arrow directions`, () => {
      reflection();
      for (let i = 0; i < 5; i++) {
        tap("[data-angle-selector] button", i);
        for (const mode of ["law"]) {
          const d = host.querySelector(`[data-reflection-diagram="${mode}"]`)!;
          const a = nums(d.querySelector("[data-incident-ray]")!.getAttribute("d")!);
          const b = nums(d.querySelector("[data-reflected-ray]")!.getAttribute("d")!);
          expect(a.slice(2)).toEqual([210, 260]);
          expect(b.slice(0, 2)).toEqual([210, 260]);
          const ai = (Math.atan2(210 - a[0], 260 - a[1]) * 180) / Math.PI;
          const ar = (Math.atan2(b[2] - 210, 260 - b[3]) * 180) / Math.PI;
          expect(ai).toBeCloseTo(r.experiment.angles[i], 8);
          expect(ar).toBeCloseTo(ai, 8);
          expect(d.querySelector("[data-incidence-arc]")?.getAttribute("d")).toMatch(
            /A60 60 0 0 1 210 200$/,
          );
          expect(d.querySelector("[data-reflection-arc]")?.getAttribute("d")).toMatch(
            /^M210 200A60 60/,
          );
          // Arc junction (210,200) lies on the normal, not on the mirror y=260.
          const ia = nums(d.querySelector("[data-incident-arrow]")!.getAttribute("points")!);
          const ra = nums(d.querySelector("[data-reflected-arrow]")!.getAttribute("points")!);
          expect(ia[1]).toBeGreaterThan((ia[3] + ia[5]) / 2);
          expect(ra[1]).toBeLessThan((ra[3] + ra[5]) / 2);
        }
      }
    });
    it(`${lang}: Experiment 8.1 retains its relationship without a duplicate ray diagram or worksheet`, () => {
      reflection();
      const e = host.querySelector("[data-reflection-experiment]")!;
      expect(e.textContent).toContain(r.experiment.aim);
      expect(e.textContent).toContain(r.experiment.hypothesis);
      expect(host.querySelectorAll('[data-reflection-diagram="law"]')).toHaveLength(1);
      expect(host.querySelector('[data-reflection-diagram="experiment"]')).toBeNull();
      expect(host.querySelector("table")).toBeNull();
      expect(e.querySelector("ol,dl,details")).toBeNull();
      r.experiment.instructions.forEach((text) => expect(e.textContent).not.toContain(text));
      expect(host.querySelectorAll("[data-angle-selector] button")).toHaveLength(5);
      expect(host.textContent).toContain("i = r");
    });
    it(`${lang}: the vehicle word is mirrored but the rear-view image is readable`, () => {
      reflection();
      const section = host.querySelector("[data-lateral-inversion]")!;
      expect(section.querySelector("[data-reversed-word]")?.getAttribute("transform")).toBe(
        "translate(210 0) scale(-1 1)",
      );
      expect(section.querySelector("[data-reversed-word]")?.textContent).toBe(
        r.lateralInversion.word,
      );
      expect(section.querySelector("[data-readable-word]")?.textContent).toBe(
        r.lateralInversion.word,
      );
      expect(section.querySelector("[data-readable-word]")?.hasAttribute("transform")).toBe(false);
      expect(section.querySelector("[data-driver]")).not.toBeNull();
      expect(section.textContent).toContain(r.lateralInversion.prompt);
    });
    it(`${lang}: all road applications remain concise without decorative icons or repeated practice`, () => {
      reflection();
      expect(host.querySelectorAll("[data-reflection-application]")).toHaveLength(0);
      r.applications.items.forEach((text) =>
        expect(host.querySelector("[data-reflection-applications]")?.textContent).toContain(text),
      );
      expect(host.querySelector('[data-practice="8.3"]')).toBeNull();
      r.lawOfReflection.statement.forEach((text) => expect(host.textContent).toContain(text));
      expect(host.querySelector("[data-lateral-inversion] svg")).not.toBeNull();
    });
  }
  it("BM corrects chapter-wide legacy terms without touching approved 8.1", () => {
    mount(createElement(ScienceF1Chapter8VisualNotesBlock, { content, lang: "bm" }));
    expect(host.textContent).toMatch(/songsang sisi/i);
    expect(host.textContent).not.toMatch(/pembalikan sisi|berbalik sisi|imej nyata/i);
    expect(content.bm.keyTerms).toContain("Imej sahih");
    expect(content.bm.keyExamFacts.join(" ")).toContain("songsang sisi");
    expect(Object.values(content.bm.reflection.rayLabels).join(" ")).toMatch(
      /Sinar tuju.*Sinar pantulan.*Sudut tuju.*Sudut pantulan/,
    );
  });
  it("both languages share all 8.2 SVG geometry and sundial states", () => {
    for (let i = 0; i < 3; i++) {
      mount(createElement(Chapter8PropertiesOfLight, { source: content.en.propertiesOfLight }));
      tap("[data-sundial-controls] button", i);
      const en = geometry();
      mount(createElement(Chapter8PropertiesOfLight, { source: content.bm.propertiesOfLight }));
      tap("[data-sundial-controls] button", i);
      expect(geometry()).toEqual(en);
    }
  });
  it("both languages share all 8.3 SVG geometry and five ray states", () => {
    for (let i = 0; i < 5; i++) {
      mount(createElement(Chapter8Reflection, { source: content.en.reflection }));
      tap("[data-angle-selector] button", i);
      const en = geometry();
      mount(createElement(Chapter8Reflection, { source: content.bm.reflection }));
      tap("[data-angle-selector] button", i);
      expect(geometry()).toEqual(en);
    }
  });
  it("new components consume canonical source props, with no duplicate factual supplement", () => {
    const p = structuredClone(content.en.propertiesOfLight),
      r = structuredClone(content.en.reflection);
    p.facts[0] = "source speed sentinel";
    p.opaqueObject.definition = "source opaque sentinel";
    p.sundial.explanation = "source sundial sentinel";
    p.rainbow = "source rainbow sentinel";
    mount(createElement(Chapter8PropertiesOfLight, { source: p }));
    ["speed", "sundial", "rainbow", "opaque"].forEach((s) =>
      expect(host.textContent).toContain(`source ${s} sentinel`),
    );
    r.lawOfReflection.statement[0] = "source law sentinel";
    r.experiment.hypothesis = "source relationship sentinel";
    r.lateralInversion.prompt = "source application sentinel";
    mount(createElement(Chapter8Reflection, { source: r }));
    ["law", "relationship", "application"].forEach((s) =>
      expect(host.textContent).toContain(`source ${s} sentinel`),
    );
    for (const lang of ["en", "bm"] as const) {
      ["opticalHistory", "reflectionExperiment", "lateralInversion"].forEach((k) =>
        expect(supplement[lang]).not.toHaveProperty(k),
      );
    }
    ["Chapter8PropertiesOfLight", "Chapter8Reflection"].forEach((file) => {
      const s = readFileSync(`src/components/notes/${file}.tsx`, "utf8");
      expect(s).not.toMatch(
        /gnomon|Light travels|Cahaya bergerak|AMBULANS|AMBULANCE|3\.0 ×|const (en|bm|facts)\s*=/,
      );
    });
  });
});
