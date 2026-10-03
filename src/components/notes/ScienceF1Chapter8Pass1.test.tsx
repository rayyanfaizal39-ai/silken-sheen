// Authorised 8.7 teaching refinement: supplement and 8.7 presentation snapshots updated; other locks unchanged.
// Revision cleanup (2026-10-03): only the four 8.1–8.4 component snapshots are updated; canonical/deferred locks are unchanged.
// Pass 4 authorises 8.5/8.6 edits; deferred checks now cover pre-Pass-4 8.7 only.
// @vitest-environment jsdom
import { act, createElement, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import {
  chapter8Content,
  chapter8Supplement,
} from "@/content/form1/science/chapter-8/chapter8-content";
import {
  Chapter8Mirrors,
  ImageApparatus,
  MirrorProfile,
  MirrorComparison,
  PlaneDistance,
  PeriscopeDiagram,
  KaleidoscopeDiagram,
  ApplicationDiagram,
  LifeDiagram,
} from "./Chapter8Mirrors";
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
const mount = (node: ReactNode) => {
  act(() => root.render(node));
  return host;
};
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
const geometry = () => [...host.querySelectorAll("svg")].map((n) => n.outerHTML);
const click = (selector: string, i = 0) =>
  act(() => host.querySelectorAll<HTMLButtonElement>(selector)[i].click());
describe("Chapter 8 Pass 1: source-controlled mirrors", () => {
  it("locks the approved 8.1 diagram implementation without depending on temporary files", () => {
    const source = readFileSync("src/components/notes/Chapter8Mirrors.tsx", "utf8").replace(
      /\r\n/g,
      "\n",
    );
    expect(createHash("sha256").update(source).digest("hex")).toBe(
      "0ec93bea9fc2e5a8c32eac59f48279ce3e011f49a23af25129b7c680ddea48fb",
    );
  });
  it("removes unused grouped navigation constants", () => {
    const source = readFileSync(
      "src/components/notes/ScienceF1Chapter8VisualNotesBlock.tsx",
      "utf8",
    );
    expect(source).not.toMatch(/path:\s*\[|8\.2-8\.3|8\.5-8\.6/);
  });

  for (const lang of ["en", "bm"] as const) {
    const t = chapter8Content[lang],
      m = t.mirrors,
      l = m.lesson;
    const render = () => mount(createElement(Chapter8Mirrors, { source: m }));
    it(`${lang}: locks all approved 8.1 canonical facts`, () => {
      expect(hash(m)).toBe(
        lang === "en"
          ? "f9ba2250f78733bf980abf159591493f7718fb0502bcbf72d8af1b3ed0085115"
          : "a2a31f0fbd34c9e4efe16bc472ea69a83c07d5d280b676ebff796171cb260e2a",
      );
    });
    it(`${lang}: seven official navigation links resolve to seven distinct sections`, () => {
      mount(createElement(ScienceF1Chapter8VisualNotesBlock, { content: chapter8Content, lang }));
      const links = [...host.querySelectorAll("nav a")];
      expect(links.map((n) => n.textContent)).toEqual(
        t.subtopics.map((s) => `${s.code} ${s.title}`),
      );
      expect(links).toHaveLength(7);
      links.forEach((a) => expect(host.querySelectorAll(a.getAttribute("href")!)).toHaveLength(1));
      expect(
        [...host.querySelectorAll("[data-official-subtopic]")].map((n) =>
          n.getAttribute("data-official-subtopic"),
        ),
      ).toEqual(["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7"]);
      expect(host.querySelector("nav")?.textContent).not.toMatch(/8\.2-8\.3|8\.5-8\.6/);
    });
    it(`${lang}: 8.7 facts, reflection law and deferred supplements retain pre-pass hashes`, () => {
      // Pass 3 authorizes 8.4 edits; these baselines were captured before those edits.
      // All 8.1 hashes above are retained without change.
      // Deferred-only hashes captured before Pass 3; 8.1–8.3 locks are unchanged.
      const keys = ["colorAdditionSubtraction"] as const;
      expect(hash(Object.fromEntries(keys.map((k) => [k, t[k]])))).toBe(
        lang === "en"
          ? "95a724cbdb1d34b00f8b15710a3f8754012f798d50c9b2665f0bea41b1fe9ef9"
          : "5b924ae4a14de777bdce2320a23ab1434729e9e37368b03fe35af7833691d552",
      );
      expect(hash(t.reflection.lawOfReflection)).toBe(
        lang === "en"
          ? "f5ed4cc45268200683339fa2b9f5a1e10617a3731a4ed262fc1d80a26ae297c6"
          : "2b7d5deadb10d6bd033d3018251be4fd1b22574c8097b3457e0c1c465fd0b516",
      );
      expect(hash(chapter8Supplement[lang])).toBe(
        lang === "en"
          ? "deb9383cde7f6969ccd2d0db2013a67b306580713e93201244279919d58b415d"
          : "d21518b43afa4b4a5e3737865688bf6b0c5f82ddd1418ccf4e3c9d8391b5d3a6",
      );
    });
    it(`${lang}: real/virtual are screen-based definitions and plane image is behind mirror`, () => {
      render();
      expect(m.realVsVirtual.real).toBe(
        lang === "en"
          ? "A real image is an image that forms on a screen."
          : "Imej sahih ialah imej yang terbentuk pada skrin.",
      );
      expect(m.realVsVirtual.virtual).toBe(
        lang === "en"
          ? "A virtual image is an image that cannot be formed on a screen."
          : "Imej maya ialah imej yang tidak dapat terbentuk pada skrin.",
      );
      [...Object.values(m.realVsVirtual), l.planeVirtual].forEach((s) =>
        expect(host.textContent).toContain(s),
      );
      expect(host.querySelectorAll("[data-image-comparison] figure")).toHaveLength(2);
    });
    it(`${lang}: the screen test retains real/virtual outcomes without a classroom activity`, () => {
      render();
      expect(host.querySelector('[data-mirror-activity="8.1"]')).toBeNull();
      expect(host.querySelector("[data-white-screen]")).not.toBeNull();
      expect(host.querySelector("[data-blank-screen]")).not.toBeNull();
      Object.values(m.realVsVirtual).forEach((text) => expect(host.textContent).toContain(text));
      l.activity81.instructions.forEach((text) => expect(host.textContent).not.toContain(text));
    });
    it(`${lang}: three mirrors use distinct profiles and Activity 8.2 changes the comparison`, () => {
      render();
      const profiles = m.mirrorTypes.map((_, i) =>
        host
          .querySelector(`[data-mirror-diagram="profile-${i}"] [data-reflecting-surface]`)
          ?.getAttribute("d"),
      );
      expect(new Set(profiles).size).toBe(3);
      m.mirrorTypes.forEach((m, i) => {
        click("[data-mirror-selector] button", i);
        expect(
          host.querySelectorAll("[data-mirror-selector] button")[i].getAttribute("aria-pressed"),
        ).toBe("true");
        expect(host.querySelector(`[data-mirror-diagram="comparison-${i}"]`)).not.toBeNull();
        expect(host.querySelector("[data-mirror-comparison]")?.textContent).toContain(l.sizes[i]);
      });
      expect(host.querySelector('[data-mirror-activity="8.2"]')).toBeNull();
      l.activity82.instructions.forEach((text) => expect(host.textContent).not.toContain(text));
    });
    it(`${lang}: equal object/image distances on graph paper have no fabricated centimetres`, () => {
      render();
      const figure = host.querySelector("[data-equal-distance]")!;
      expect(figure.textContent).toContain(l.labels.distance);
      expect(figure.textContent).not.toMatch(/\d\s*cm/);
      expect(figure.querySelector("[data-object-distance]")?.getAttribute("d")).toBe(
        "M120 195H200",
      );
      expect(figure.querySelector("[data-image-distance]")?.getAttribute("d")).toBe("M200 195H280");
      expect(200 - 120).toBe(280 - 200);
      expect(figure.querySelector("[data-graph-paper]")).not.toBeNull();
      m.planeMirrorCharacteristics.forEach((s) => expect(figure.textContent).toContain(s));
    });
    it(`${lang}: applications connect the three mirror types to all source uses`, () => {
      render();
      const a = host.querySelector("[data-mirror-applications]")!;
      expect(a.querySelectorAll("svg")).toHaveLength(2);
      m.mirrorTypes.forEach((mt) => {
        expect(a.textContent).toContain(mt.name);
        mt.uses.forEach((s) => expect(a.textContent).toContain(s));
      });
      expect(a.querySelector("[data-wide-view]")).not.toBeNull();
      expect(m.mirrorTypes.map((t) => t.uses.length)).toEqual([2, 2, 2]);
    });
    it(`${lang}: mirror applications preserve all uses without group presentation instructions`, () => {
      render();
      expect(host.querySelector('[data-mirror-activity="8.3"]')).toBeNull();
      l.activity83.instructions.forEach((text) => expect(host.textContent).not.toContain(text));
      m.mirrorTypes.forEach((type) =>
        type.uses.forEach((text) => expect(host.textContent).toContain(text)),
      );
    });
    it(`${lang}: periscope has two 45 degree mirrors and a twice-reflected directed light path`, () => {
      render();
      const diagram = host.querySelector('[data-mirror-diagram="periscope"]')!;
      expect(diagram.querySelectorAll("[data-periscope-mirror]")).toHaveLength(2);
      expect(
        [...diagram.querySelectorAll("[data-periscope-mirror]")].map((n) => n.getAttribute("d")),
      ).toEqual(["M155 30L205 80", "M155 180L205 230"]);
      expect((80 - 30) / (205 - 155)).toBe(1);
      expect((230 - 180) / (205 - 155)).toBe(1);
      expect(
        [...diagram.querySelectorAll("[data-light-leg]")].map((n) => n.getAttribute("d")),
      ).toEqual(["M46 55H180", "M180 55V205", "M180 205H309"]);
      expect(diagram.querySelectorAll("text")).toHaveLength(2);
      expect(diagram.querySelector("[data-eye]")).not.toBeNull();
    });
    it(`${lang}: periscope step buttons progressively highlight each light segment`, () => {
      render();
      for (let i = 0; i < 3; i++) {
        click("[data-periscope] button", i);
        const legs = [
          ...host.querySelectorAll('[data-mirror-diagram="periscope"] [data-light-leg]'),
        ];
        expect(legs.map((n) => n.getAttribute("opacity"))).toEqual(
          [0, 1, 2].map((j) => (j <= i ? "1" : "0.15")),
        );
      }
    });
    it(`${lang}: Activity 8.4 keeps construction apparatus, source dimensions and knife warning`, () => {
      render();
      const a = host.querySelector("[data-periscope-construction]")!;
      expect(a.tagName).toBe("DETAILS");
      expect(a.hasAttribute("open")).toBe(false);
      expect(a.querySelectorAll("ol li")).toHaveLength(3);
      l.activity84.instructions
        .slice(0, 3)
        .forEach((text) => expect(a.textContent).toContain(text));
      expect(l.activity84.materials).toEqual(
        lang === "en"
          ? ["Two plane mirrors", "Box", "Knife"]
          : ["Dua keping cermin", "Kotak", "Pisau"],
      );
      l.activity84.materials.forEach((s) => expect(a.textContent).toContain(s));
      expect(a.querySelector("[data-knife-warning]")?.textContent).toBe(l.knifeWarning);
      expect(a.textContent).toContain("30 cm × 10 cm × 15 cm");
      expect(a.textContent).toContain("15 cm × 14 cm");
      expect(l.activity84.instructions).toHaveLength(4);
    });
    it(`${lang}: three kaleidoscope mirrors and repeated bead images remain functional on tap`, () => {
      render();
      expect(host.querySelectorAll("[data-three-mirrors] path")).toHaveLength(3);
      const original = host.querySelector("[data-reflected-pattern]")!.getAttribute("transform");
      const beads = host.querySelector("[data-actual-beads]")!.children.length;
      expect(host.querySelectorAll("[data-reflected-set] > *").length).toBeGreaterThan(beads);
      expect(host.querySelector("[data-kaleidoscope]")?.textContent).toContain(
        m.opticalInstruments[1].howItWorks,
      );
      click("[data-kaleidoscope] button");
      expect(host.querySelector("[data-reflected-pattern]")!.getAttribute("transform")).not.toBe(
        original,
      );
    });
    it(`${lang}: kaleidoscope retains repeated reflection without the ten-step construction worksheet`, () => {
      render();
      expect(host.querySelector('[data-mirror-activity="8.5"]')).toBeNull();
      const a = host.querySelector("[data-kaleidoscope]")!;
      expect(a.querySelectorAll("[data-three-mirrors] path")).toHaveLength(3);
      expect(a.textContent).toContain(m.opticalInstruments[1].howItWorks);
      l.activity85.instructions.forEach((text) => expect(host.textContent).not.toContain(text));
    });
    it(`${lang}: Science in Life has the three source problems and revealed solutions`, () => {
      render();
      expect(l.life.map((s) => s.instrument)).toEqual(["convex", "periscope", "convex"]);
      l.life.forEach((s, i) => {
        const a = host.querySelector(`[data-life-problem="${i}"]`)!;
        expect(a.textContent).toContain(s.problem);
        act(() => a.querySelector("summary")!.click());
        expect(a.querySelector("details")!.open).toBe(true);
        expect(a.textContent).toContain(s.solution);
        expect(a.textContent).toContain(s.reason);
        expect(a.querySelector("svg") !== null).toBe(i !== 1);
      });
    });
    it(`${lang}: removes repeated mirror practice but preserves the unique lift application question`, () => {
      render();
      expect(host.querySelector('[data-practice="8.1"]')).toBeNull();
      expect(host.querySelector('[data-mirror-diagram="practice-mirror"]')).toBeNull();
      expect(host.querySelector("[data-mirror-application-question]")?.textContent).toContain(
        l.practice.questions[2],
      );
      m.planeMirrorCharacteristics.forEach((text) => expect(host.textContent).toContain(text));
      expect(host.textContent).toContain(m.opticalInstruments[0].howItWorks);
    });
    it(`${lang}: law remains under 8.3 and no advanced optics enters 8.1`, () => {
      mount(createElement(ScienceF1Chapter8VisualNotesBlock, { content: chapter8Content, lang }));
      const mirrors = host.querySelector('[data-official-subtopic="8.1"]')!,
        reflection = host.querySelector('[data-official-subtopic="8.3"]')!;
      expect(mirrors.textContent).not.toMatch(
        /i = r|focal|fokus|centre of curvature|pusat kelengkungan|camera obscura/,
      );
      t.reflection.lawOfReflection.statement.forEach((s) =>
        expect(reflection.textContent).toContain(s),
      );
      expect(reflection.textContent).toContain("i = r");
      expect(m).not.toHaveProperty("lawOfReflection");
      expect(chapter8Supplement[lang]).not.toHaveProperty("realVirtualActivity");
    });
  }
  it("preserves Activity 8.2 source-edition differences and exact terminology", () => {
    const en = chapter8Content.en.mirrors.lesson,
      bm = chapter8Content.bm.mirrors.lesson;
    expect(bm.activity82.materials).toContain("Pembaris");
    expect(bm.activity82.instructions[0]).toContain("4 petak");
    expect(en.activity82.materials).not.toContain("Ruler");
    expect(en.activity82.instructions[0]).not.toMatch(/(?:4|four)\s+(?:graph-paper\s+)?squares/i);
    expect(bm.labels.real).toBe("Imej sahih");
  });
  it("all scientific geometry is shared between BM and DLP in every interactive state", () => {
    for (let i = 0; i < 3; i++) {
      mount(createElement(Chapter8Mirrors, { source: chapter8Content.en.mirrors }));
      click("[data-mirror-selector] button", i);
      click("[data-periscope] button", i);
      const en = geometry();
      mount(createElement(Chapter8Mirrors, { source: chapter8Content.bm.mirrors }));
      click("[data-mirror-selector] button", i);
      click("[data-periscope] button", i);
      expect(geometry()).toEqual(en);
    }
    mount(createElement(Chapter8Mirrors, { source: chapter8Content.en.mirrors }));
    click("[data-kaleidoscope] button");
    const en = geometry();
    mount(createElement(Chapter8Mirrors, { source: chapter8Content.bm.mirrors }));
    expect(geometry()).toEqual(en);
  });
  it("every exported drawing can render independently without factual data or language forks", () => {
    const nodes: ReactNode[] = [
      createElement(ImageApparatus),
      createElement(ImageApparatus, { virtual: true }),
      createElement(PlaneDistance),
      createElement(PeriscopeDiagram),
      createElement(KaleidoscopeDiagram),
    ];
    for (let i = 0; i < 3; i++)
      nodes.push(
        createElement(MirrorProfile, { kind: i }),
        createElement(MirrorComparison, { kind: i }),
        createElement(ApplicationDiagram, { kind: i }),
        createElement(LifeDiagram, { kind: i }),
      );
    nodes.forEach((n) => {
      mount(n);
      expect(host.querySelector("svg")).not.toBeNull();
      expect(host.textContent).not.toMatch(/cm/);
    });
  });
  it("facts come from canonical props, not an independent component dataset", () => {
    const m = structuredClone(chapter8Content.en.mirrors);
    m.realVsVirtual.real = "canonical definition sentinel";
    m.lesson.sizes[0] = "canonical size sentinel";
    m.mirrorTypes[1].uses[0] = "canonical application sentinel";
    m.opticalInstruments[1].howItWorks = "canonical reflection sentinel";
    mount(createElement(Chapter8Mirrors, { source: m }));
    ["definition", "size", "application", "reflection"].forEach((s) =>
      expect(host.textContent).toContain(`canonical ${s} sentinel`),
    );
    const file = readFileSync("src/components/notes/Chapter8Mirrors.tsx", "utf8");
    expect(file).not.toMatch(/const (en|bm|facts|instructions|questions)\s*=/);
    expect(file).not.toMatch(/A real image|Imej sahih|21 cm|4\.3 cm|dentist/);
  });
  it("Mark as Read remains functional", () => {
    const onMarkRead = vi.fn();
    mount(
      createElement(ScienceF1Chapter8VisualNotesBlock, { content: chapter8Content, onMarkRead }),
    );
    act(() =>
      [...host.querySelectorAll("button")]
        .find((b) => b.textContent === "Mark Chapter 8 as read")!
        .click(),
    );
    expect(onMarkRead).toHaveBeenCalledOnce();
  });
});
