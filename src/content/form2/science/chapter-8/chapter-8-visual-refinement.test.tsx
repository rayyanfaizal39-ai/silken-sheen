import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CHAPTER8_HOTSPOT_GEOMETRY,
  CHAPTER8_LEVER_MARKERS,
  CHAPTER8_LEVER_PANELS,
  CHAPTER8_LEVER_STATES,
  CHAPTER8_SECTION_FIGURES,
  CHAPTER8_FIGURE_VARIANTS,
  CHAPTER8_VISUAL_ASSETS,
  ACTION_REACTION_ARROWS,
  ATMOSPHERE_HAZE_GEOMETRY,
  Chapter8ContextFigure,
  chapter8Concepts,
  type Chapter8FigureKind,
} from "@/components/notes/chapter8/Chapter8ContextFigure";
import { seedParticles, stepParticles } from "@/components/notes/blocks/GasParticles";
import { perpendicularFoot } from "@/components/notes/blocks/MomentDiagram";
import { readingValue, BuoyancySchematic } from "@/components/notes/blocks/BuoyancySchematic";
import { BuoyancySimulator } from "@/components/notes/blocks/BuoyancySimulator";
import { GasParticles } from "@/components/notes/blocks/GasParticles";
import { ForceDiagram } from "@/components/notes/blocks/ForceDiagram";
import { DepthPressure } from "@/components/notes/blocks/DepthPressure";
import { MomentDiagram } from "@/components/notes/blocks/MomentDiagram";
import { CHAPTER8_IMAGES, CHAPTER8_IMAGE_LIST } from "@/components/notes/chapter8/chapter8-assets";
import {
  CHAPTER8_FIGURE_WIDTH,
  chapter8FigureVariant,
} from "@/components/notes/chapter8/Chapter8PhotoFigure";
import { scienceF2C8InteractiveBM } from "./interactive-bm";
import { scienceF2C8InteractiveDLP } from "./interactive-dlp";
import type {
  BuoyancyMaterial,
  ScienceF2InteractiveContent,
  ScienceInteractiveSection,
} from "../interactive-types";

/**
 * Guards for the Chapter 8 visual refinement pass — see
 * SCIENCE_F2_CH08_VISUAL_REFINEMENT_REPORT.md.
 *
 * This pass repaired figure geometry and diagram construction only; no academic
 * content was touched. The defects worth locking are the ones a screenshot
 * caught but a type check never would: hit regions drawn past the edge of the
 * artwork, F/L/E markers that were not on their objects, particles that all sat
 * on one straight line, and a perpendicular distance drawn as a horizontal bar
 * that happened to have the right length.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C8InteractiveBM],
  ["dlp", scienceF2C8InteractiveDLP],
];

const KINDS = Object.keys(CHAPTER8_HOTSPOT_GEOMETRY) as Chapter8FigureKind[];

function sectionFor(content: ScienceF2InteractiveContent, kind: Chapter8FigureKind) {
  const index = Number(
    Object.entries(CHAPTER8_SECTION_FIGURES).find(([, value]) => value === kind)![0],
  );
  return content.sections[index];
}

function sectionWith(content: ScienceF2InteractiveContent, key: string) {
  return content.sections.find((s) => (s as unknown as Record<string, unknown>)[key])!;
}

function blockFrom<T>(section: ScienceInteractiveSection, key: string) {
  return (section as unknown as Record<string, T>)[key];
}

describe("Chapter 8 · hit regions sit on the artwork", () => {
  it("keeps every hit region inside the frame", () => {
    for (const kind of KINDS) {
      for (const point of CHAPTER8_HOTSPOT_GEOMETRY[kind]) {
        const left = point.x - point.w / 2;
        const top = point.y - point.h / 2;
        expect(
          { kind, id: point.id, left, top, right: left + point.w, bottom: top + point.h },
        ).toMatchObject({ kind, id: point.id });
        expect(left, `${kind}/${point.id} left`).toBeGreaterThanOrEqual(-1);
        expect(top, `${kind}/${point.id} top`).toBeGreaterThanOrEqual(-1);
        expect(left + point.w, `${kind}/${point.id} right`).toBeLessThanOrEqual(101);
        expect(top + point.h, `${kind}/${point.id} bottom`).toBeLessThanOrEqual(101);
      }
    }
  });

  it("puts the atmosphere markers on the hikers, not above them", () => {
    const byId = Object.fromEntries(CHAPTER8_HOTSPOT_GEOMETRY.atmosphere.map((p) => [p.id, p]));
    // Measured on 07_atmospheric_pressure_altitude.png: the summit climber spans
    // roughly y 23-32% and the hiker at the foot roughly y 79-95%.
    const summit = byId.summit;
    const foot = byId.foot;
    expect(summit.y - summit.h / 2).toBeLessThan(27.4);
    expect(summit.y + summit.h / 2).toBeGreaterThan(27.4);
    expect(foot.y - foot.h / 2).toBeLessThan(86.5);
    expect(foot.y + foot.h / 2).toBeGreaterThan(86.5);
    // The summit hiker is higher up the frame than the one at the foot.
    expect(summit.y).toBeLessThan(foot.y);
  });

  it("draws no border, background or hover box on the hit region itself", () => {
    for (const [lang, content] of LANGS) {
      const markup = renderToStaticMarkup(
        <Chapter8ContextFigure
          kind="types"
          section={sectionFor(content, "types")}
          lang={lang === "bm" ? "bm" : "en"}
        />,
      );
      const buttons = markup.match(/<button[^>]*data-ch8-hotspot[^>]*>/g) ?? [];
      expect(buttons.length).toBe(CHAPTER8_HOTSPOT_GEOMETRY.types.length);
      for (const button of buttons) {
        expect(button).toContain("border-0");
        expect(button).toContain("bg-transparent");
        expect(button).not.toMatch(/border-2|hover:border|bg-amber-300\/10|shadow-\[inset/);
        // keyboard users must still get a focus ring
        expect(button).toContain("focus-visible:ring-2");
      }
    }
  });

  it("keeps the approved artwork and adds no new raster image", () => {
    expect(Object.values(CHAPTER8_VISUAL_ASSETS).sort()).toEqual([
      "/science/form2/chapter-8/01_effects_of_force.webp",
      "/science/form2/chapter-8/02_buoyancy_everyday_life.webp",
      "/science/form2/chapter-8/03_levers_everyday_life.webp",
      "/science/form2/chapter-8/04_pressure_contact_area.webp",
      "/science/form2/chapter-8/05_types_of_forces.webp",
      "/science/form2/chapter-8/06_action_reaction_palms_touching.webp",
      "/science/form2/chapter-8/07_atmospheric_pressure_altitude.webp",
    ]);
  });
});

describe("Chapter 8 · lever markers", () => {
  it("marks exactly one fulcrum, load and effort per class", () => {
    for (const cls of Object.keys(CHAPTER8_LEVER_MARKERS)) {
      const tags = CHAPTER8_LEVER_MARKERS[cls].map((m) => m.t).sort();
      expect(tags, cls).toEqual(["E", "F", "L"]);
    }
  });

  it("keeps every marker inside its own panel", () => {
    for (const [cls, markers] of Object.entries(CHAPTER8_LEVER_MARKERS)) {
      const panel = CHAPTER8_LEVER_PANELS[cls];
      for (const m of markers) {
        expect(m.x, `${cls}/${m.t} left of panel`).toBeGreaterThan(panel.x0);
        expect(m.x, `${cls}/${m.t} right of panel`).toBeLessThan(panel.x1);
        expect(m.y).toBeGreaterThan(17.9);
        expect(m.y).toBeLessThan(82.4);
      }
    }
  });

  it("orders each class the way its lever actually works", () => {
    const at = (cls: string, t: string) => CHAPTER8_LEVER_MARKERS[cls].find((m) => m.t === t)!;

    // First class (seesaw): the fulcrum is between the load and the effort.
    const f1 = at("first", "F");
    expect(at("first", "L").x).toBeLessThan(f1.x);
    expect(at("first", "E").x).toBeGreaterThan(f1.x);

    // Second class (wheelbarrow): the load is between the fulcrum (wheel) and
    // the effort (hands on the handles). This is the one that must be
    // unambiguous, so it is asserted as an ordering rather than a position.
    const f2 = at("second", "F");
    const l2 = at("second", "L");
    const e2 = at("second", "E");
    expect(l2.x).toBeLessThan(f2.x);
    expect(e2.x).toBeLessThan(l2.x);

    // Third class (fishing rod): the effort is between the fulcrum and the load.
    const f3 = at("third", "F");
    const e3 = at("third", "E");
    const l3 = at("third", "L");
    expect(e3.x).toBeGreaterThan(f3.x);
    expect(l3.x).toBeGreaterThan(e3.x);
  });

  it("keeps button, panel, markers and explanation on one lever state", () => {
    const expected = [
      { id: "first", scene: "seesaw", dlp: /1st class lever/i, bm: /tuas kelas pertama/i },
      { id: "second", scene: "wheelbarrow", dlp: /2nd class lever/i, bm: /tuas kelas kedua/i },
      { id: "third", scene: "fishing-rod", dlp: /3rd class lever/i, bm: /tuas kelas ketiga/i },
    ] as const;

    for (const [lang, content] of LANGS) {
      const section = sectionFor(content, "levers");
      for (const state of expected) {
        const markup = renderToStaticMarkup(
          <Chapter8ContextFigure
            kind="levers"
            section={section}
            lang={lang === "bm" ? "bm" : "en"}
            initialSelection={state.id}
          />,
        );
        const controls = markup.match(/<button[^>]*data-ch8-control[^>]*>/g) ?? [];
        const selectedControls = controls.filter((button) => button.includes('aria-pressed="true"'));
        expect(selectedControls, `${lang}/${state.id} selected button`).toHaveLength(1);
        expect(selectedControls[0]).toContain(`data-ch8-control="${state.id}"`);
        expect(selectedControls[0]).toContain(`data-lever-button="${state.scene}"`);
        expect(markup).toContain(`data-ch8-selection="${state.id}"`);
        expect(markup).toContain(`data-lever-panel="${state.scene}"`);
        expect(markup).toContain(`data-lever-explanation-class="${state.id}"`);
        expect(markup).toMatch(lang === "bm" ? state.bm : state.dlp);

        const markers = markup.match(/<span[^>]*data-lever-marker[^>]*>/g) ?? [];
        expect(markers, `${lang}/${state.id} F/L/E markers`).toHaveLength(3);
        for (const marker of markers) expect(marker).toContain(`data-lever-class="${state.id}"`);
      }
    }
  });

  it("maps each class id to exactly the required contextual scene", () => {
    expect(Object.fromEntries(Object.entries(CHAPTER8_LEVER_STATES).map(([id, state]) => [id, state.scene]))).toEqual({
      first: "seesaw",
      second: "wheelbarrow",
      third: "fishing-rod",
    });
  });
});

describe("Chapter 8 · the action-reaction figure describes its own picture", () => {
  it("does not borrow the trolley example or its equal-distance claim", () => {
    for (const [lang, content] of LANGS) {
      const section = sectionFor(content, "action-reaction");
      const [pair] = chapter8Concepts("action-reaction", section, lang === "bm" ? "bm" : "en");
      const text = `${pair.label} ${pair.note}`;
      expect(text).not.toMatch(/troli|trolley/i);
      // "both move through equal distances" does not follow from equal and
      // opposite forces alone, and must not be attached to this image.
      expect(text).not.toMatch(/jarak yang sama|equal distances/i);
      // it must still carry the section's own validated statement
      expect(pair.note).toContain((section.intro ?? "").slice(0, 40));
    }
  });

  it("draws the two forces equal in length and opposite in direction", () => {
    // Geometry lives in ACTION_REACTION_ARROWS and is asserted there; this
    // checks the figure still mounts and exposes its hit region.
    const markup = renderToStaticMarkup(
      <Chapter8ContextFigure
        kind="action-reaction"
        section={sectionFor(scienceF2C8InteractiveBM, "action-reaction")}
        lang="bm"
      />,
    );
    expect(markup).toContain("data-ch8-hotspot");
    const [left, right] = ACTION_REACTION_ARROWS;
    expect(Math.abs(left.x2 - left.x1)).toBeCloseTo(Math.abs(right.x2 - right.x1), 6);
  });

  it("reuses the approved raster in a palms-touching contact pose", () => {
    const markup = renderToStaticMarkup(
      <Chapter8ContextFigure
        kind="action-reaction"
        section={sectionFor(scienceF2C8InteractiveDLP, "action-reaction")}
        lang="en"
        initialSelection="pair"
      />,
    );
    // The supplied pack ships artwork that already shows the palms in contact,
    // so the figure is one plain image rather than a shifted composite.
    expect(markup).toContain("06_action_reaction_palms_touching.webp");
    expect(markup).not.toContain("data-skater-half");
    // both arrows appear together on selection
    expect(markup.match(/data-arrow=/g)).toHaveLength(2);
  });
});

describe("Chapter 8 · gas particles", () => {
  const gasSection = sectionWith(scienceF2C8InteractiveBM, "gasParticles");
  const gas = blockFrom<{ particleCount: number; states: { id: string }[] }>(gasSection, "gasParticles");

  it("scatters the particles instead of laying them on one line", () => {
    const pts = seedParticles(gas.particleCount, 200, 20);
    const n = pts.length;
    const mx = pts.reduce((s, p) => s + p.x, 0) / n;
    const my = pts.reduce((s, p) => s + p.y, 0) / n;
    let sxy = 0;
    let sxx = 0;
    for (const p of pts) {
      sxy += (p.x - mx) * (p.y - my);
      sxx += (p.x - mx) ** 2;
    }
    const slope = sxy / sxx;
    const maxDeviation = Math.max(...pts.map((p) => Math.abs(p.y - (my + slope * (p.x - mx)))));
    // The old layout put every particle exactly on one line (deviation 0).
    expect(maxDeviation).toBeGreaterThan(15);
  });

  it("is deterministic, so screenshots and tests stay stable", () => {
    expect(seedParticles(gas.particleCount, 200, 20)).toEqual(seedParticles(gas.particleCount, 200, 20));
  });

  it("gives every particle its own velocity", () => {
    const pts = seedParticles(gas.particleCount, 200, 20);
    const directions = new Set(pts.map((p) => `${p.vx.toFixed(3)},${p.vy.toFixed(3)}`));
    expect(directions.size).toBe(pts.length);
    for (const p of pts) expect(Math.hypot(p.vx, p.vy)).toBeCloseTo(20, 6);
  });

  it("bounces off the walls and never leaks out of the container", () => {
    for (const width of [200, 120]) {
      const pts = seedParticles(gas.particleCount, width, 34);
      for (let step = 0; step < 400; step++) {
        stepParticles(pts, 0.05, width);
        for (const p of pts) {
          expect(p.x).toBeGreaterThanOrEqual(60 + 3.2 - 1e-9);
          expect(p.x).toBeLessThanOrEqual(60 + width - 3.2 + 1e-9);
          expect(p.y).toBeGreaterThanOrEqual(30 + 3.2 - 1e-9);
          expect(p.y).toBeLessThanOrEqual(30 + 110 - 3.2 + 1e-9);
        }
      }
    }
  });

  it("keeps the particle count fixed across all three states", () => {
    expect(gas.states.map((s) => s.id).sort()).toEqual(["compressed", "heated", "normal"]);
    const markup = renderToStaticMarkup(<GasParticles block={gas as never} lang="bm" />);
    const drawn = (markup.match(/data-particle="/g) ?? []).length;
    expect(drawn).toBe(gas.particleCount);
    expect(markup).toContain(`data-particle-count="${gas.particleCount}"`);
  });
});

describe("Chapter 8 · moment of a force", () => {
  it("drops a true perpendicular onto the line of action", () => {
    // Pivot (72,104), force applied at (222,104) acting at 45 degrees.
    const u = { x: Math.cos(Math.PI / 4), y: Math.sin(Math.PI / 4) };
    const foot = perpendicularFoot(222, 104, u.x, u.y, 72, 104);
    // the foot lies on the line of action
    const alongX = foot.x - 222;
    const alongY = foot.y - 104;
    expect(alongX * u.y - alongY * u.x).toBeCloseTo(0, 6);
    // and the segment from the pivot meets it at a right angle
    const perpX = foot.x - 72;
    const perpY = foot.y - 104;
    expect(perpX * u.x + perpY * u.y).toBeCloseTo(0, 6);
    // the perpendicular distance is shorter than the handle, which is the point
    const perpLen = Math.hypot(perpX, perpY);
    expect(perpLen).toBeCloseTo(150 * Math.cos(Math.PI / 4), 6);
    expect(perpLen).toBeLessThan(150);
  });

  it("collapses to the handle length when the force is already perpendicular", () => {
    const foot = perpendicularFoot(222, 104, 0, 1, 72, 104);
    expect(Math.hypot(foot.x - 72, foot.y - 104)).toBeCloseTo(150, 6);
  });
});

describe("Chapter 8 · buoyancy figures", () => {
  it("reads the spring balance pointer from the content's own values", () => {
    expect(readingValue("10 N")).toBe(10);
    expect(readingValue("6 N")).toBe(6);
    expect(readingValue("no number here")).toBeNull();
  });

  it("draws a spring balance and keeps the approved readings", () => {
    for (const [lang, content] of LANGS) {
      const section = sectionWith(content, "buoyancySchematic");
      const block = blockFrom<{ realWeight: string; apparentWeight: string; buoyantForce: string }>(
        section,
        "buoyancySchematic",
      );
      const markup = renderToStaticMarkup(
        <BuoyancySchematic block={block as never} lang={lang === "bm" ? "bm" : "en"} />,
      );
      expect(markup).toContain(CHAPTER8_IMAGES.springBalance);
      expect(markup).toContain(block.realWeight);
      expect(markup).toContain(block.apparentWeight);
      expect(markup).toContain(block.buoyantForce);
      // the readings themselves are frozen content
      expect(block.realWeight).toMatch(/10\s*N/);
      expect(block.apparentWeight).toMatch(/6\s*N/);
      expect(block.buoyantForce).toMatch(/4\s*N/);
    }
  });

  it("shows float and sink as positions in a tank of water", () => {
    const section = sectionWith(scienceF2C8InteractiveBM, "buoyancy");
    const block = blockFrom<{ materials: BuoyancyMaterial[] }>(section, "buoyancy");
    const markup = renderToStaticMarkup(<BuoyancySimulator materials={block.materials} lang="bm" />);
    // This is the density interaction, which stays a drawn animated tank. The
    // floating/sinking artwork belongs to the buoyant-force figure instead.
    expect(markup).toContain("<svg");
    expect(markup).toContain('data-state="empty"');
    expect(markup).not.toContain(CHAPTER8_IMAGES.floating);
    // the density values are content and must survive untouched
    expect(block.materials.length).toBeGreaterThan(0);
    for (const m of block.materials) expect(Number.isFinite(m.density)).toBe(true);
  });
});

describe("Chapter 8 · point of application", () => {
  it("puts the force arrow's tail on the hammer claw gripping the nail", () => {
    const source = readFileSync("src/components/notes/blocks/ForceDiagram.tsx", "utf8");
    // the accepted hammer artwork carries the scene; the overlay carries the force
    expect(source).toContain('image: "hammerNail"');
    const nail = /nail: \{([\s\S]*?)\n  \},/.exec(source)![1];
    const tail = /tail: \[(\d+), (\d+)\]/.exec(nail)!;
    const dir = /dir: \[(-?[\d.]+), (-?[\d.]+)\]/.exec(nail)!;
    // the claw grips the nail head at ~(777, 540); the wood surface is ~y 790
    expect(Number(tail[2])).toBeLessThan(790);
    // and the force pulls the nail upward, out of the wood
    expect(Number(dir[2])).toBeLessThan(0);
    const markup = renderToStaticMarkup(
      <ForceDiagram
        block={blockFrom(sectionWith(scienceF2C8InteractiveBM, "forceDiagram"), "forceDiagram") as never}
        lang="bm"
      />,
    );
    expect(markup).toContain("<svg");
  });
});

describe("Chapter 8 · chapter chrome", () => {
  it("declares as many hero modules as the chapter has sections", () => {
    // The section rail renders one step per section, so a hardcoded hero count
    // that disagrees with it is visible to the learner as two different numbers.
    const source = readFileSync("src/routes/notes.tsx", "utf8");
    const entry = /^\s*8: \{ modules: (\d+),/m.exec(source);
    expect(entry, "Chapter 8 needs its own hero meta entry").not.toBeNull();
    expect(Number(entry![1])).toBe(scienceF2C8InteractiveBM.sections.length);
    for (const [lang, content] of LANGS) {
      expect(content.sections.length, lang).toBe(11);
    }
  });

  it("maps every figure kind to a section that can supply its concepts", () => {
    for (const [lang, content] of LANGS) {
      for (const [index, kind] of Object.entries(CHAPTER8_SECTION_FIGURES)) {
        const section = content.sections[Number(index)];
        expect(section, `${lang} section ${index}`).toBeDefined();
        const concepts = chapter8Concepts(kind!, section, lang === "bm" ? "bm" : "en");
        expect(concepts.length, `${lang} ${kind}`).toBe(CHAPTER8_HOTSPOT_GEOMETRY[kind!].length);
        for (const c of concepts) {
          expect(c.label.trim(), `${lang} ${kind}/${c.id} label`).not.toBe("");
          expect(c.note.trim(), `${lang} ${kind}/${c.id} note`).not.toBe("");
        }
      }
    }
  });

  it("uses the Force & Motion asset instead of the Biology-labelled subject banner", () => {
    const source = readFileSync("src/routes/notes.tsx", "utf8");
    expect(source).toContain('import scienceF2Chapter8Artwork from "@/assets/science/form2/ch8-daya-gerakan.png"');
    expect(source).toMatch(/subject === "science" && form === "Form 2" && activeChapterKey === "Chapter 8"[\s\S]{0,120}\? scienceF2Chapter8Artwork/);
  });
});

describe("Chapter 8 · §18 — what already worked is left alone", () => {
  it("keeps the liquid-pressure figure and its interaction unchanged", () => {
    // Section 16 of the spec says keep this figure. The guard is that it still
    // renders every depth level the content declares, with its controls intact.
    for (const [lang, content] of LANGS) {
      const section = sectionWith(content, "depthPressure");
      const block = blockFrom<{ levels: { id: string; label: string }[]; title: string }>(
        section,
        "depthPressure",
      );
      const markup = renderToStaticMarkup(
        <DepthPressure block={block as never} lang={lang === "bm" ? "bm" : "en"} />,
      );
      expect(block.levels.length, lang).toBeGreaterThan(1);
      for (const level of block.levels) expect(markup, `${lang}/${level.id}`).toContain(level.label);
      const buttons = (markup.match(/<button/g) ?? []).length;
      expect(buttons, lang).toBeGreaterThanOrEqual(block.levels.length);
    }
  });

  it("leaves every academic quiz key untouched", () => {
    // Captured from the frozen chapter before this visual pass began.
    const EXPECTED = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1];
    for (const [lang, file] of [
      ["bm", "quizzes-bm.ts"],
      ["dlp", "quizzes-dlp.ts"],
    ] as const) {
      const source = readFileSync(`src/content/form2/science/chapter-8/${file}`, "utf8");
      const keys = [...source.matchAll(/answer(?:Index)?:\s*(\d+)/g)].map((m) => Number(m[1]));
      expect(keys, lang).toEqual(EXPECTED);
    }
  });
});

describe("Chapter 8 · atmospheric pressure renders without ghost boxes", () => {
  it("draws no hit-region box, U-column or dotted line in either state", () => {
    for (const [lang, content] of LANGS) {
      const markup = renderToStaticMarkup(
        <Chapter8ContextFigure
          kind="atmosphere"
          section={sectionFor(content, "atmosphere")}
          lang={lang === "bm" ? "bm" : "en"}
        />,
      );
      const buttons = markup.match(/<button[^>]*data-ch8-hotspot[^>]*>/g) ?? [];
      expect(buttons.length).toBe(2);
      for (const button of buttons) {
        expect(button).toContain("border-0");
        expect(button).toContain("bg-transparent");
      }
      // no dashed strokes anywhere on this figure
      expect(markup).not.toContain("strokeDasharray");
      expect(markup).not.toContain("stroke-dasharray");
    }
    // The selected state paints one feathered haze and nothing box-like; it is
    // much taller for the hiker at the foot, which is the whole point.
    const source = readFileSync("src/components/notes/chapter8/Chapter8ContextFigure.tsx", "utf8");
    const block = /if \(kind === "atmosphere"\) \{[\s\S]*?\n  \}/.exec(source)![0];
    expect(block).toContain("data-air-haze");
    expect(block).toContain("feGaussianBlur");
    expect(block).not.toMatch(/strokeDasharray|<rect|rounded|border/);
    const footHeight = ATMOSPHERE_HAZE_GEOMETRY.foot.bottom - ATMOSPHERE_HAZE_GEOMETRY.foot.top;
    const summitHeight = ATMOSPHERE_HAZE_GEOMETRY.summit.bottom - ATMOSPHERE_HAZE_GEOMETRY.summit.top;
    expect(footHeight).toBeGreaterThan(summitHeight * 3);
  });
});

describe("Chapter 8 · the action-reaction arrows are drawn as a pair", () => {
  it("renders both arrows together from one source", () => {
    expect(ACTION_REACTION_ARROWS).toHaveLength(2);
    const [left, right] = ACTION_REACTION_ARROWS;
    // same line of action
    expect(left.y).toBe(right.y);
    // equal magnitude
    expect(Math.abs(left.x2 - left.x1)).toBeCloseTo(Math.abs(right.x2 - right.x1), 6);
    // opposite directions, each pointing away from the contact between the hands
    expect(left.x2).toBeLessThan(left.x1);
    expect(right.x2).toBeGreaterThan(right.x1);
    expect(left.x1).toBeLessThan(right.x1);
    // short vectors at the hand contact, not movement arrows spanning the scene
    expect(Math.abs(left.x2 - left.x1)).toBeLessThanOrEqual(6);
    // anchored to the palm contact measured on the artwork, so this cannot
    // drift if the scene is ever re-shot at a different centre
    const contact = CHAPTER8_HOTSPOT_GEOMETRY["action-reaction"][0].x;
    expect(Math.abs(left.x1 - contact)).toBeLessThanOrEqual(1);
    expect(Math.abs(right.x1 - contact)).toBeLessThanOrEqual(1);
  });
});

describe("Chapter 8 · final visual pack — WebP production assets", () => {
  const DIR = "public/science/form2/chapter-8";

  it("ships all 16 production images as WebP", () => {
    expect(CHAPTER8_IMAGE_LIST).toHaveLength(16);
    for (const url of CHAPTER8_IMAGE_LIST) {
      expect(url.endsWith(".webp"), url).toBe(true);
      const file = path.join(DIR, path.basename(url));
      expect(existsSync(file), "missing asset: " + file).toBe(true);
      // a truncated or empty file would still "exist"
      expect(statSync(file).size, url).toBeGreaterThan(10000);
    }
  });

  it("declares each of the sixteen images exactly once", () => {
    expect(new Set(CHAPTER8_IMAGE_LIST).size).toBe(16);
  });

  it("serves no Chapter 8 PNG from the production asset path", () => {
    const pngs = readdirSync(DIR).filter((f) => f.toLowerCase().endsWith(".png"));
    expect(pngs, "obsolete PNGs still shipped: " + pngs.join(", ")).toEqual([]);
  });

  it("references no Chapter 8 .png anywhere in the app", () => {
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.tsx?$/.test(entry.name)) {
          const text = readFileSync(full, "utf8");
          if (/chapter-8\/[^"'`]*\.png/.test(text)) offenders.push(full);
        }
      }
    };
    walk("src");
    expect(offenders).toEqual([]);
  });
});

describe("Chapter 8 · final visual pack — figures use the supplied artwork", () => {
  it("uses the real palms-touching image, with no raster shift hack", () => {
    const source = readFileSync("src/components/notes/chapter8/Chapter8ContextFigure.tsx", "utf8");
    expect(CHAPTER8_VISUAL_ASSETS["action-reaction"]).toBe(CHAPTER8_IMAGES.actionReaction);
    expect(source).not.toContain("ACTION_REACTION_CONTACT_SHIFT");
    expect(source).not.toContain("data-skater-half");
    expect(source).not.toContain("clipPath");
  });

  it("maps each force example to its own supplied scene", () => {
    const source = readFileSync("src/components/notes/blocks/ForceDiagram.tsx", "utf8");
    expect(source).toContain('image: "pushBox"');
    expect(source).toContain('image: "hammerNail"');
    const markup = renderToStaticMarkup(
      <ForceDiagram
        block={blockFrom(sectionWith(scienceF2C8InteractiveBM, "forceDiagram"), "forceDiagram") as never}
        lang="bm"
      />,
    );
    // the box example is first, so its artwork and application point render
    expect(markup).toContain(CHAPTER8_IMAGES.pushBox);
    expect(markup).toContain("data-application-point");
    expect(markup).toContain("data-force-arrow");
  });

  it("measures buoyant force on the supplied spring-balance photo", () => {
    for (const [lang, content] of LANGS) {
      const block = blockFrom<{ realWeight: string; apparentWeight: string; buoyantForce: string }>(
        sectionWith(content, "buoyancySchematic"),
        "buoyancySchematic",
      );
      const markup = renderToStaticMarkup(
        <BuoyancySchematic block={block as never} lang={lang === "bm" ? "bm" : "en"} />,
      );
      expect(markup).toContain(CHAPTER8_IMAGES.springBalance);
      // readings stay as SVG text, never baked into the raster
      expect(markup).toContain('data-reading="air"');
      expect(markup).toContain('data-reading="water"');
      expect(markup).toContain(block.realWeight);
      expect(markup).toContain(block.apparentWeight);
      expect(block.realWeight).toMatch(/10\s*N/);
      expect(block.apparentWeight).toMatch(/6\s*N/);
      expect(block.buoyantForce).toMatch(/4\s*N/);
    }
  });

  it("keeps the buoyant-force scenes out of the density selector", () => {
    const block = blockFrom<{ materials: BuoyancyMaterial[] }>(
      sectionWith(scienceF2C8InteractiveBM, "buoyancy"),
      "buoyancy",
    );
    const markup = renderToStaticMarkup(<BuoyancySimulator materials={block.materials} lang="bm" />);
    // floating/sinking artwork belongs to the buoyant-force figure, not here
    expect(markup).not.toContain(CHAPTER8_IMAGES.floating);
    expect(markup).not.toContain(CHAPTER8_IMAGES.sinking);
    expect(markup).toContain("<svg");
    for (const m of block.materials) expect(Number.isFinite(m.density)).toBe(true);
  });

  it("maps each moment situation to its own supplied scene", () => {
    const source = readFileSync("src/components/notes/blocks/MomentDiagram.tsx", "utf8");
    expect(source).toContain('"momentDoor"');
    expect(source).toContain('"momentSpanner"');
    expect(source).toContain("CHAPTER8_IMAGES.momentAngle");
    const markup = renderToStaticMarkup(
      <MomentDiagram
        block={blockFrom(sectionWith(scienceF2C8InteractiveBM, "momentDiagram"), "momentDiagram") as never}
        lang="bm"
      />,
    );
    // door is first: pivot, perpendicular distance and force all overlay the photo
    expect(markup).toContain(CHAPTER8_IMAGES.momentDoor);
    expect(markup).toContain("data-perpendicular");
    expect(markup).toContain("data-force");
    expect(markup).toContain("data-right-angle");
  });

  it("orders the liquid-pressure jets shallow < middle < deep", () => {
    const block = blockFrom<{ levels: { id: string; label: string }[] }>(
      sectionWith(scienceF2C8InteractiveBM, "depthPressure"),
      "depthPressure",
    );
    const markup = renderToStaticMarkup(<DepthPressure block={block as never} lang="bm" />);
    expect(markup).toContain(CHAPTER8_IMAGES.liquidPressure);
    // one SVG jet per outlet, drawn rather than baked into the artwork
    const jets = markup.match(/data-jet="/g) ?? [];
    expect(jets).toHaveLength(block.levels.length);

    // reach must increase with depth, derived from the shipped outlet geometry
    const source = readFileSync("src/components/notes/blocks/DepthPressure.tsx", "utf8");
    const surface = Number(/const SURFACE_Y = (\d+);/.exec(source)![1]);
    const outlets = [...source.matchAll(/\{ y: (\d+) \}/g)].map((m) => Number(m[1]));
    expect(outlets).toHaveLength(3);
    const reaches = outlets.map((y) => Math.sqrt(y - surface));
    expect(reaches[0]).toBeLessThan(reaches[1]);
    expect(reaches[1]).toBeLessThan(reaches[2]);
  });
});

describe("Chapter 8 · no essential teaching content is hidden", () => {
  it("renders no expand/collapse control in the Chapter 8 lesson flow", () => {
    const source = readFileSync("src/components/notes/ScienceF2InteractiveNotesBlock.tsx", "utf8");
    expect(source).not.toContain("<details");
    expect(source).not.toContain("Expand explanation");
    expect(source).not.toContain("Kembangkan penerangan");
  });

  it("drops the duplicate lever schematic for Chapter 8 only", () => {
    const source = readFileSync("src/components/notes/ScienceF2InteractiveNotesBlock.tsx", "utf8");
    expect(source).toContain("section.leverClasses && !isChapter8");
  });
});

describe("Chapter 8 · buoyant force and density are separate interactions", () => {
  const schematicSource = readFileSync("src/components/notes/blocks/BuoyancySchematic.tsx", "utf8");
  const simulatorSource = readFileSync("src/components/notes/blocks/BuoyancySimulator.tsx", "utf8");

  it("gives the buoyant-force figure all three supplied scenes", () => {
    // measuring renders on mount; the other two are asserted from the mapping
    for (const [lang, content] of LANGS) {
      const markup = renderToStaticMarkup(
        <BuoyancySchematic
          block={blockFrom(sectionWith(content, "buoyancySchematic"), "buoyancySchematic") as never}
          lang={lang === "bm" ? "bm" : "en"}
        />,
      );
      expect(markup, lang).toContain(CHAPTER8_IMAGES.springBalance);
    }
    expect(schematicSource).toContain('image={view === "floating" ? "floating" : "sinking"}');
  });

  it("draws floating as equilibrium and sinking as weight greater than buoyancy", () => {
    const floating = /floating: \{ up: (\d+), down: (\d+) \}/.exec(schematicSource)!;
    const sinking = /sinking: \{ up: (\d+), down: (\d+) \}/.exec(schematicSource)!;
    // a floating object is in equilibrium: F = W
    expect(Number(floating[1])).toBe(Number(floating[2]));
    // a sinking object has weight greater than the buoyant force
    expect(Number(sinking[2])).toBeGreaterThan(Number(sinking[1]));
  });

  it("keeps the density selector free of the buoyant-force artwork", () => {
    const block = blockFrom<{ materials: BuoyancyMaterial[] }>(
      sectionWith(scienceF2C8InteractiveBM, "buoyancy"),
      "buoyancy",
    );
    const markup = renderToStaticMarkup(<BuoyancySimulator materials={block.materials} lang="bm" />);
    for (const forbidden of [CHAPTER8_IMAGES.floating, CHAPTER8_IMAGES.sinking]) {
      expect(markup, forbidden).not.toContain(forbidden);
      expect(simulatorSource, forbidden).not.toContain(forbidden);
    }
    // it stays an interactive drawing, not a raster swap
    expect(simulatorSource).not.toContain("Chapter8PhotoFigure");
    expect(markup).toContain("<svg");
  });

  it("keeps every density material control and its approved value", () => {
    for (const [lang, content] of LANGS) {
      const block = blockFrom<{ materials: BuoyancyMaterial[] }>(
        sectionWith(content, "buoyancy"),
        "buoyancy",
      );
      const markup = renderToStaticMarkup(
        <BuoyancySimulator materials={block.materials} lang={lang === "bm" ? "bm" : "en"} />,
      );
      const buttons = markup.match(/<button/g) ?? [];
      expect(buttons.length, lang).toBe(block.materials.length);
      for (const m of block.materials) {
        expect(markup, `${lang} ${m.id}`).toContain(m.label);
        expect(markup, `${lang} ${m.id} density`).toContain(String(m.density));
      }
    }
  });

  it("still classifies each approved material against water", () => {
    const block = blockFrom<{ materials: BuoyancyMaterial[] }>(
      sectionWith(scienceF2C8InteractiveBM, "buoyancy"),
      "buoyancy",
    );
    // the densities are frozen content; this pins them and the float/sink rule
    const byId = Object.fromEntries(block.materials.map((m) => [m.id, m.density]));
    for (const [id, density] of Object.entries(byId)) {
      expect(Number.isFinite(density), id).toBe(true);
    }
    expect(block.materials.some((m) => m.density < 1.0)).toBe(true);
    expect(block.materials.some((m) => m.density > 1.0)).toBe(true);
    // and the visual reports which state it is in, so selection is observable
    expect(simulatorSource).toContain("data-state");
    expect(simulatorSource).toContain("density < 1.0");
    expect(simulatorSource).toContain("transition-transform");
  });

  it("starts the density visual empty and keeps it interactive", () => {
    const block = blockFrom<{ materials: BuoyancyMaterial[] }>(
      sectionWith(scienceF2C8InteractiveBM, "buoyancy"),
      "buoyancy",
    );
    const markup = renderToStaticMarkup(<BuoyancySimulator materials={block.materials} lang="bm" />);
    expect(markup).toContain('data-state="empty"');
  });
});

describe("Chapter 8 · contextual artwork is sized to support the lesson", () => {
  it("caps every figure's display width without touching the assets", () => {
    expect(CHAPTER8_FIGURE_WIDTH.single).toBeLessThanOrEqual(600);
    expect(CHAPTER8_FIGURE_WIDTH.wide).toBeLessThanOrEqual(660);
    expect(CHAPTER8_FIGURE_WIDTH.single).toBeLessThan(CHAPTER8_FIGURE_WIDTH.wide);
    // at 16:9 these caps land inside the intended 340-380px visual height
    for (const w of Object.values(CHAPTER8_FIGURE_WIDTH)) {
      const height = (w * 9) / 16;
      expect(height).toBeLessThanOrEqual(380);
    }
  });

  it("gives multi-panel scenes the wider cap and single scenes the narrower one", () => {
    expect(CHAPTER8_FIGURE_VARIANTS.types).toBe("wide");
    expect(CHAPTER8_FIGURE_VARIANTS.effects).toBe("wide");
    expect(CHAPTER8_FIGURE_VARIANTS.levers).toBe("wide");
    expect(CHAPTER8_FIGURE_VARIANTS.buoyancy).toBe("wide");
    expect(CHAPTER8_FIGURE_VARIANTS["action-reaction"]).toBe("single");
    expect(CHAPTER8_FIGURE_VARIANTS.atmosphere).toBe("single");
    // the simple single-object scenes the spec names
    for (const key of ["pushBox", "hammerNail", "floating", "sinking", "momentDoor", "momentSpanner", "momentAngle"] as const) {
      expect(chapter8FigureVariant(key), key).toBe("single");
    }
  });

  it("renders the cap as a max-width so mobile stays full width", () => {
    const markup = renderToStaticMarkup(
      <Chapter8ContextFigure
        kind="levers"
        section={sectionFor(scienceF2C8InteractiveBM, "levers")}
        lang="bm"
      />,
    );
    // w-full with a max-width cap: full width on mobile, capped on desktop
    expect(markup).toMatch(/max-width:\s*660px/);
    expect(markup).toContain("w-full");
    expect(markup).toContain("mx-auto");
    expect(markup).toContain("aspect-video");
    expect(markup).toContain('data-ch8-figure-variant="wide"');
  });

  it("keeps the overlay inside the image box so it tracks the picture", () => {
    const source = readFileSync("src/components/notes/chapter8/Chapter8PhotoFigure.tsx", "utf8");
    // the wrapper is the positioning context and carries the cap
    expect(source).toContain("relative mx-auto aspect-video w-full");
    expect(source).toContain("CHAPTER8_FIGURE_WIDTH[chapter8FigureVariant(image)]");
    // and the svg overlay is pinned to that same box
    expect(source).toContain("pointer-events-none absolute inset-0 h-full w-full");
  });
});
