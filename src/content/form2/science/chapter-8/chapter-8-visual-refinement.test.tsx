import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CHAPTER8_HOTSPOT_GEOMETRY,
  CHAPTER8_LEVER_MARKERS,
  CHAPTER8_LEVER_PANELS,
  CHAPTER8_LEVER_STATES,
  CHAPTER8_SECTION_FIGURES,
  CHAPTER8_VISUAL_ASSETS,
  ACTION_REACTION_ARROWS,
  ACTION_REACTION_CONTACT_SHIFT,
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
      "/science/form2/chapter-8/01_effects_of_force.png",
      "/science/form2/chapter-8/02_buoyancy_everyday_life.png",
      "/science/form2/chapter-8/03_levers_everyday_life.png",
      "/science/form2/chapter-8/04_pressure_contact_area.png",
      "/science/form2/chapter-8/05_types_of_forces.png",
      "/science/form2/chapter-8/06_action_reaction.png",
      "/science/form2/chapter-8/07_atmospheric_pressure_altitude.png",
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
    expect(ACTION_REACTION_CONTACT_SHIFT).toBeGreaterThan(0);
    expect(markup).toContain("data-action-reaction-contact-image");
    expect(markup).toContain('data-skater-half="left"');
    expect(markup).toContain('data-skater-half="right"');
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
      expect(markup).toContain("data-spring-balance");
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
    expect(markup).toContain('data-state="empty"');
    // the tank, its water and its surface line are drawn before anything is picked
    expect(markup).toContain("<svg");
    expect(markup).toContain("fill-sky-400/25");
    // the density values are content and must survive untouched
    expect(block.materials.length).toBeGreaterThan(0);
    for (const m of block.materials) expect(Number.isFinite(m.density)).toBe(true);
  });
});

describe("Chapter 8 · point of application", () => {
  it("puts the force arrow's tail on the hammer claw gripping the nail", () => {
    const source = readFileSync("src/components/notes/blocks/ForceDiagram.tsx", "utf8");
    // the nail example draws a nail, a claw and a hammer rather than a chevron
    expect(source).toMatch(/the claw, reaching under the nail head/);
    const nail = /nail: \{([\s\S]*?)\}/.exec(source)![1];
    const tailY = Number(/tailY: ([\d.]+)/.exec(nail)![1]);
    // the claw grips just under the nail head at y 96; the wood surface is 104
    expect(tailY).toBeLessThan(104);
    expect(/deg: (-?\d+)/.exec(nail)![1]).toBe("-90");
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
    expect(left.x1).toBeCloseTo(50, 0);
    expect(right.x1).toBeCloseTo(50, 0);
  });
});
