import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { CurrentFieldPatterns } from "@/components/notes/blocks/CurrentFieldPatterns";
import {
  magnetSelection,
  MagnetFieldDiagram,
  type MagnetPick,
  type MagnetSelection,
} from "@/components/notes/blocks/MagnetFieldDiagram";
import {
  BAR_FIELD_ARCS,
  CH7_ART,
  CURRENT_LOOP,
  isOpposite,
  LIKE_POLE_ARCS,
  LIKE_POLES,
  likePoleClearance,
  loopCurrentArrows,
  loopInteriorField,
  loopReturnField,
  polylinesCross,
  SOLENOID,
  solenoidExteriorLines,
  solenoidInteriorLines,
  solenoidPoles,
  STRAIGHT_WIRE,
  straightWireCurrentArrow,
  straightWireFieldArrows,
} from "@/components/notes/blocks/ch7-field-geometry";
import { SCIENCE_F2_CH7_IMAGES } from "../visual-assets";
import type { ScienceF2InteractiveContent } from "../interactive-types";
import { scienceF2C7InteractiveBM } from "./interactive-bm";
import { scienceF2C7InteractiveDLP } from "./interactive-dlp";

/**
 * Guards the Chapter 7 "magnetic fields from an electric current" visuals: the
 * three apparatus photographs and the deterministic SVG layers drawn over them,
 * plus the two permanent-magnet views that were corrected alongside them.
 *
 * Every assertion here is about a claim the chapter makes in words, checked
 * against the geometry that draws it — because the failures this replaces were
 * exactly that kind: a caption saying "neutral point" beside a magnet that has
 * none, and a loop drawn as two separate circular fields.
 */

const PUBLIC_ROOT = resolve(process.cwd(), "public");

const APPARATUS: [ConductorId, string][] = [
  ["straight", SCIENCE_F2_CH7_IMAGES.straightWireApparatus],
  ["loop", SCIENCE_F2_CH7_IMAGES.circularLoopApparatus],
  ["solenoid", SCIENCE_F2_CH7_IMAGES.solenoidApparatus],
];

type ConductorId = "straight" | "loop" | "solenoid";

const STREAMS: [string, "bm" | "en", ScienceF2InteractiveContent][] = [
  ["BM", "bm", scienceF2C7InteractiveBM],
  ["DLP", "en", scienceF2C7InteractiveDLP],
];

const patternsBlock = (c: ScienceF2InteractiveContent) =>
  c.sections.find((s) => s.currentFieldPatterns)!.currentFieldPatterns!;
const magnetBlock = (c: ScienceF2InteractiveContent) =>
  c.sections.find((s) => s.magnetFieldDiagram)!.magnetFieldDiagram!;

/** Renders the figure with `id` selected, by putting it first in the list. */
function renderConductor(c: ScienceF2InteractiveContent, id: ConductorId, lang: string) {
  const block = patternsBlock(c);
  const target = block.conductors.find((x) => x.id === id)!;
  return renderToStaticMarkup(
    <CurrentFieldPatterns
      block={{ ...block, conductors: [target, ...block.conductors.filter((x) => x.id !== id)] }}
      lang={lang}
    />,
  );
}

/** Renders one magnet arrangement, by putting it first in the shapes list. */
function renderShape(c: ScienceF2InteractiveContent, shapeId: string, lang: string) {
  const block = magnetBlock(c);
  const target = block.shapes.find((s) => s.id === shapeId)!;
  return renderToStaticMarkup(
    <MagnetFieldDiagram
      block={{ ...block, shapes: [target, ...block.shapes.filter((s) => s.id !== shapeId)] }}
      lang={lang}
    />,
  );
}

// ---------------------------------------------------------------------------

describe("Ch7 apparatus artwork — the files themselves", () => {
  it.each(APPARATUS)("%s ships a WebP that exists and is not empty", (_id, src) => {
    expect(src.endsWith(".webp"), `${src} is not a WebP`).toBe(true);
    const file = resolve(PUBLIC_ROOT, src.replace(/^\//, ""));
    expect(existsSync(file), `${src} is missing from public/`).toBe(true);
    expect(statSync(file).size).toBeGreaterThan(4096);
  });

  it.each(APPARATUS)("%s ships no PNG beside it in the production folder", (_id, src) => {
    const png = resolve(PUBLIC_ROOT, src.replace(/^\//, "").replace(/\.webp$/, ".png"));
    expect(existsSync(png), `${png} would ship the unconverted source`).toBe(false);
  });

  it.each(STREAMS)("%s references the WebP and never the source PNG", (_name, lang, content) => {
    for (const [id, src] of APPARATUS) {
      const markup = renderConductor(content, id, lang);
      expect(markup).toContain(`src="${src}"`);
      expect(markup).not.toContain(".png");
      expect(markup).not.toContain('src=""');
    }
  });
});

describe("Ch7 apparatus artwork — BM / DLP parity", () => {
  it("both languages list the same conductors in the same order", () => {
    const [bm, dlp] = STREAMS.map(([, , c]) => patternsBlock(c).conductors.map((x) => x.id));
    expect(bm).toEqual(dlp);
    expect(bm).toEqual(["straight", "loop", "solenoid"]);
  });

  it("both languages point every conductor at the same image file", () => {
    const srcOf = (c: ScienceF2InteractiveContent) =>
      Object.fromEntries(patternsBlock(c).conductors.map((x) => [x.id, x.image.src]));
    expect(srcOf(scienceF2C7InteractiveBM)).toEqual(srcOf(scienceF2C7InteractiveDLP));
    expect(srcOf(scienceF2C7InteractiveBM)).toEqual(Object.fromEntries(APPARATUS));
  });

  it("each language writes its own alt text and caption", () => {
    const bm = patternsBlock(scienceF2C7InteractiveBM).conductors;
    const dlp = patternsBlock(scienceF2C7InteractiveDLP).conductors;
    for (const [i, conductor] of bm.entries()) {
      expect(conductor.image.alt.trim().length).toBeGreaterThan(30);
      expect((conductor.image.caption ?? "").trim().length).toBeGreaterThan(20);
      expect(conductor.image.alt).not.toBe(dlp[i].image.alt);
      expect(conductor.image.caption).not.toBe(dlp[i].image.caption);
    }
  });

  it.each(STREAMS)("%s renders each figure with its own alt text and caption", (_n, lang, content) => {
    for (const conductor of patternsBlock(content).conductors) {
      const markup = renderConductor(content, conductor.id, lang);
      expect(markup, conductor.id).toContain(conductor.image.alt.replace(/"/g, "&quot;"));
      expect(markup, conductor.id).toContain(conductor.image.caption!);
    }
  });
});

describe("Ch7 straight wire — overlay alignment and reversal", () => {
  it("the field circles are centred on the wire, not beside it", () => {
    // A few pixels of tolerance: the wire leans very slightly, and the circles
    // are centred on where it meets the board.
    expect(Math.abs(STRAIGHT_WIRE.centre.x - STRAIGHT_WIRE.x)).toBeLessThan(8);
    // And on the board, not floating above or below it.
    expect(STRAIGHT_WIRE.centre.y).toBe(STRAIGHT_WIRE.boardY);
  });

  it("every arrowhead sits on one of the circles round that centre", () => {
    const arrows = straightWireFieldArrows(false);
    expect(arrows.length).toBe(STRAIGHT_WIRE.radii.length * 4);
    for (const arrow of arrows) {
      const dx = (arrow.x - STRAIGHT_WIRE.centre.x);
      const dy = (arrow.y - STRAIGHT_WIRE.centre.y) / STRAIGHT_WIRE.perspective;
      // Foreshortening divided out, the point is a plain radius from the
      // wire's foot — and that radius is one the figure actually draws.
      const radius = Math.hypot(dx, dy);
      const nearest = STRAIGHT_WIRE.radii.reduce((best, r) =>
        Math.abs(r - radius) < Math.abs(best - radius) ? r : best,
      );
      expect(Math.abs(nearest - radius), `arrowhead is off its circle`).toBeLessThan(1e-6);
    }
  });

  it("no arrowhead is drawn over the wire itself", () => {
    // The top of every circle is directly above the wire's foot, which is
    // where the wire is — an arrowhead there would sit on the copper.
    for (const arrow of straightWireFieldArrows(false)) {
      const overTheWire =
        Math.abs(arrow.x - STRAIGHT_WIRE.x) < 40 && arrow.y < STRAIGHT_WIRE.boardY;
      expect(overTheWire, `an arrowhead at ${arrow.x},${arrow.y} covers the wire`).toBe(false);
    }
  });

  it("the circles stay inside the artwork", () => {
    const rMax = Math.max(...STRAIGHT_WIRE.radii);
    expect(STRAIGHT_WIRE.centre.x - rMax).toBeGreaterThan(0);
    expect(STRAIGHT_WIRE.centre.x + rMax).toBeLessThan(CH7_ART.width);
    expect(STRAIGHT_WIRE.centre.y + rMax * STRAIGHT_WIRE.perspective).toBeLessThan(CH7_ART.height);
  });

  it("reversing the current reverses every field arrow", () => {
    const forward = straightWireFieldArrows(false);
    const back = straightWireFieldArrows(true);
    expect(back).toHaveLength(forward.length);
    for (const [i, arrow] of forward.entries()) {
      expect(isOpposite(arrow.deg, back[i].deg), `arrow ${i} did not reverse`).toBe(true);
    }
  });

  it("reversing the current reverses the current arrow too", () => {
    expect(isOpposite(straightWireCurrentArrow(false).deg, straightWireCurrentArrow(true).deg)).toBe(
      true,
    );
  });

  it("reversing the current leaves the circles exactly where they were", () => {
    // The whole point of the control: direction changes, pattern does not.
    const positions = (reversed: boolean) =>
      straightWireFieldArrows(reversed).map((a) => `${a.x.toFixed(4)},${a.y.toFixed(4)}`);
    expect(positions(true)).toEqual(positions(false));
  });

  it("the current arrow rides the wire, above the board", () => {
    const arrow = straightWireCurrentArrow(false);
    expect(arrow.x).toBe(STRAIGHT_WIRE.x);
    expect(arrow.y).toBeGreaterThan(STRAIGHT_WIRE.topY);
    expect(arrow.y).toBeLessThan(STRAIGHT_WIRE.boardY);
  });
});

describe("Ch7 circular loop — one field through the centre, not two beside it", () => {
  it("draws no second circular field around either side of the conductor", () => {
    // The regression this replaces: two rings of concentric circles, one round
    // each side of the loop, which reads as two fields sitting near each other.
    // The aperture now carries ONE field, drawn as symbols all pointing the
    // same way, so there is no per-side ring to find.
    const interior = loopInteriorField(false);
    expect(interior.length).toBeGreaterThan(6);
    expect(new Set(interior.map((s) => s.out)).size, "the aperture carries two directions").toBe(1);
  });

  it("fills the aperture, spanning both sides of the loop's centre", () => {
    const interior = loopInteriorField(false);
    const xs = interior.map((s) => s.x);
    expect(Math.min(...xs)).toBeLessThan(CURRENT_LOOP.centre.x);
    expect(Math.max(...xs)).toBeGreaterThan(CURRENT_LOOP.centre.x);
    for (const symbol of interior) {
      const r = Math.hypot(symbol.x - CURRENT_LOOP.centre.x, symbol.y - CURRENT_LOOP.centre.y);
      expect(r, "an interior symbol landed on or outside the copper").toBeLessThan(
        CURRENT_LOOP.radius,
      );
    }
  });

  it("the return field outside points the opposite way to the centre field", () => {
    const inside = loopInteriorField(false)[0];
    for (const symbol of loopReturnField(false)) {
      expect(symbol.out, "the return field agrees with the centre field").toBe(!inside.out);
      const r = Math.hypot(symbol.x - CURRENT_LOOP.centre.x, symbol.y - CURRENT_LOOP.centre.y);
      expect(r, "a return symbol landed inside the loop").toBeGreaterThan(CURRENT_LOOP.radius);
    }
  });

  it("the field through the centre is drawn more densely than the return field", () => {
    // Closer together means stronger, and the field through the loop is the
    // stronger one.
    expect(loopInteriorField(false).length).toBeGreaterThan(loopReturnField(false).length * 2);
  });

  it("reversing the current reverses the field through the centre and outside", () => {
    for (const [forward, back] of [
      [loopInteriorField(false), loopInteriorField(true)],
      [loopReturnField(false), loopReturnField(true)],
    ]) {
      expect(back).toHaveLength(forward.length);
      for (const [i, symbol] of forward.entries()) {
        expect(back[i].out, `symbol ${i} did not reverse`).toBe(!symbol.out);
        expect(back[i].x).toBeCloseTo(symbol.x, 6);
        expect(back[i].y).toBeCloseTo(symbol.y, 6);
      }
    }
  });

  it("reversing the current reverses the current arrows on the loop", () => {
    const forward = loopCurrentArrows(false);
    const back = loopCurrentArrows(true);
    for (const [i, arrow] of forward.entries()) {
      expect(isOpposite(arrow.deg, back[i].deg), `loop arrow ${i} did not reverse`).toBe(true);
      expect(back[i].x).toBeCloseTo(arrow.x, 6);
    }
  });

  it("the current arrows sit on the copper loop", () => {
    for (const arrow of loopCurrentArrows(false)) {
      const r = Math.hypot(arrow.x - CURRENT_LOOP.centre.x, arrow.y - CURRENT_LOOP.centre.y);
      expect(r).toBeCloseTo(CURRENT_LOOP.radius, 6);
    }
  });
});

describe("Ch7 solenoid — parallel inside, curved outside, poles that swap", () => {
  it("every interior line is horizontal, so they are parallel to one another", () => {
    const lines = solenoidInteriorLines(false);
    expect(lines.length).toBeGreaterThanOrEqual(4);
    for (const line of lines) {
      const [, y1, , y2] = line.d.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
      expect(y1, "an interior line is not horizontal").toBe(y2);
    }
  });

  it("every interior line runs the full length of the coil", () => {
    for (const line of solenoidInteriorLines(false)) {
      const [x1, , x2] = line.d.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
      expect(x1).toBe(SOLENOID.leftX);
      expect(x2).toBe(SOLENOID.rightX);
    }
  });

  it("every interior arrow points the same way", () => {
    const degs = solenoidInteriorLines(false).flatMap((l) => l.arrows.map((a) => a.deg));
    expect(new Set(degs).size, "the interior field disagrees with itself").toBe(1);
  });

  it("the interior lines are closer together than the exterior ones", () => {
    const gap = (ys: number[]) => {
      const sorted = [...ys].sort((a, b) => a - b);
      return Math.min(...sorted.slice(1).map((y, i) => y - sorted[i]));
    };
    const inside = gap(solenoidInteriorLines(false).map((l) => l.arrows[0].y));
    const outside = gap(solenoidExteriorLines(false).map((l) => l.arrows[0].y));
    expect(inside, "the field is not drawn denser inside the coil").toBeLessThan(outside);
  });

  it("the exterior lines leave the coil, unlike the interior ones", () => {
    for (const line of solenoidExteriorLines(false)) {
      const apex = line.arrows[0].y;
      expect(Math.abs(apex - SOLENOID.axisY)).toBeGreaterThan(
        Math.max(...SOLENOID.interiorOffsets.map(Math.abs)),
      );
    }
  });

  it("the poles are opposite ends, and reversing the current swaps them", () => {
    const forward = solenoidPoles(false);
    const back = solenoidPoles(true);
    expect(forward.left).not.toBe(forward.right);
    expect(back.left).toBe(forward.right);
    expect(back.right).toBe(forward.left);
  });

  it("reversing the current reverses the interior field but not the lines", () => {
    const forward = solenoidInteriorLines(false);
    const back = solenoidInteriorLines(true);
    for (const [i, line] of forward.entries()) {
      expect(back[i].d, "a field line moved when only its direction should have").toBe(line.d);
      expect(isOpposite(line.arrows[0].deg, back[i].arrows[0].deg)).toBe(true);
    }
  });

  it("reversing the current reverses the exterior field too", () => {
    const forward = solenoidExteriorLines(false);
    const back = solenoidExteriorLines(true);
    for (const [i, line] of forward.entries()) {
      expect(isOpposite(line.arrows[0].deg, back[i].arrows[0].deg)).toBe(true);
    }
  });

  it.each(STREAMS)("%s draws N and S as text, not baked into the picture", (_n, lang, content) => {
    const markup = renderConductor(content, "solenoid", lang);
    const letters = [...markup.matchAll(/<text[^>]*aria-label="([^"]+)"[^>]*>([^<]*)<\/text>/g)];
    expect(letters, "the solenoid drew no pole letters").toHaveLength(2);
    const expected = lang === "bm" ? ["U", "S"] : ["N", "S"];
    expect(letters.map((m) => m[2]).sort()).toEqual([...expected].sort());
  });
});

describe("Ch7 permanent magnet — spacing carries the field strength", () => {
  it("field lines crowd at the poles and spread out far away", () => {
    const poleSpread = Math.max(...BAR_FIELD_ARCS.map((a) => a.poleOffset));
    const farSpread = Math.max(...BAR_FIELD_ARCS.map((a) => a.apexOffset));
    expect(farSpread / poleSpread, "the far field is not visibly more spread out").toBeGreaterThan(
      4,
    );
  });

  it("each line stays closer to the axis at the pole than out in the field", () => {
    for (const arc of BAR_FIELD_ARCS) {
      expect(arc.apexOffset).toBeGreaterThan(arc.poleOffset * 2);
    }
  });

  it("no two field lines cross", () => {
    for (let i = 0; i < BAR_FIELD_ARCS.length; i += 1) {
      for (let j = i + 1; j < BAR_FIELD_ARCS.length; j += 1) {
        expect(
          polylinesCross(BAR_FIELD_ARCS[i].points, BAR_FIELD_ARCS[j].points),
          `bar-magnet field lines ${i} and ${j} cross`,
        ).toBe(false);
      }
    }
  });
});

describe("Ch7 like poles — no crossings, and a genuinely empty neutral region", () => {
  it("no two field lines cross", () => {
    for (let i = 0; i < LIKE_POLE_ARCS.length; i += 1) {
      for (let j = i + 1; j < LIKE_POLE_ARCS.length; j += 1) {
        expect(
          polylinesCross(LIKE_POLE_ARCS[i].points, LIKE_POLE_ARCS[j].points),
          `like-pole field lines ${i} and ${j} cross`,
        ).toBe(false);
      }
    }
  });

  it("no field line passes through, or near, the neutral point", () => {
    // The gap between the two magnets is 96 units wide; a clearance of tens of
    // units is a hole the reader can see, not a rounding artefact.
    expect(likePoleClearance()).toBeGreaterThan(20);
  });

  it("the neutral point sits midway between the two facing poles", () => {
    const innerLeft = LIKE_POLES.left.x + LIKE_POLES.left.w;
    const innerRight = LIKE_POLES.right.x;
    expect(LIKE_POLES.neutral.x).toBe((innerLeft + innerRight) / 2);
    expect(LIKE_POLES.neutral.y).toBe(LIKE_POLES.left.y + LIKE_POLES.left.h / 2);
  });

  it("lines bend away from the midline as they approach the gap", () => {
    // Every line that comes near the gap ends up further from the midline than
    // it started, or dives into a pole well to one side of it.
    const nearGap = LIKE_POLE_ARCS.filter((arc) =>
      arc.points.some(([x, y]) => Math.abs(x - LIKE_POLES.neutral.x) < 30 && Math.abs(y - LIKE_POLES.neutral.y) < 60),
    );
    expect(nearGap.length, "no field line comes near the gap at all").toBeGreaterThan(0);
    for (const arc of nearGap) {
      const closest = arc.points.reduce((best, p) =>
        Math.hypot(p[0] - LIKE_POLES.neutral.x, p[1] - LIKE_POLES.neutral.y) <
        Math.hypot(best[0] - LIKE_POLES.neutral.x, best[1] - LIKE_POLES.neutral.y)
          ? p
          : best,
      );
      const end = arc.points[arc.points.length - 1];
      expect(
        Math.abs(end[0] - LIKE_POLES.neutral.x),
        "a line ran into the middle instead of turning aside",
      ).toBeGreaterThan(Math.abs(closest[0] - LIKE_POLES.neutral.x));
    }
  });
});

describe("Ch7 neutral point — explanation and picture cannot come apart", () => {
  const NEUTRAL_ONLY = "like-poles";

  it.each(STREAMS)("%s binds the neutral-point feature to the like-pole arrangement", (_n, _l, c) => {
    const neutral = magnetBlock(c).features.find((f) => f.id === "neutral");
    expect(neutral, "the neutral-point feature is missing").toBeTruthy();
    expect(neutral!.requiresShape).toBe(NEUTRAL_ONLY);
  });

  it.each(STREAMS)("%s leaves the general properties available on every magnet", (_n, _l, c) => {
    for (const feature of magnetBlock(c).features) {
      if (feature.id === "neutral") continue;
      expect(feature.requiresShape, `${feature.id} was wrongly restricted`).toBeUndefined();
    }
  });

  it.each(STREAMS)("%s never prints the neutral-point note beside another magnet", (_n, lang, c) => {
    const note = magnetBlock(c).features.find((f) => f.id === "neutral")!.note;
    for (const shape of magnetBlock(c).shapes) {
      if (shape.id === NEUTRAL_ONLY) continue;
      const markup = renderShape(c, shape.id, lang);
      expect(markup, `${shape.id} showed the neutral-point explanation`).not.toContain(note);
    }
  });

  it.each(STREAMS)("%s draws the neutral marker only on the like-pole view", (_n, lang, c) => {
    const marker = `cx="${LIKE_POLES.neutral.x}" cy="${LIKE_POLES.neutral.y}"`;
    for (const shape of magnetBlock(c).shapes) {
      const markup = renderShape(c, shape.id, lang);
      if (shape.id === NEUTRAL_ONLY) continue;
      expect(markup, `${shape.id} drew a neutral point`).not.toContain(marker);
    }
  });

  it.each(STREAMS)("%s says 'like poles' in the arrangement that owns the neutral point", (_n, _l, c) => {
    const shape = magnetBlock(c).shapes.find((s) => s.id === NEUTRAL_ONLY);
    expect(shape, "the like-pole arrangement is missing").toBeTruthy();
    // Both languages must actually describe two like poles opposing, since the
    // neutral point only exists there.
    expect(shape!.note.length).toBeGreaterThan(30);
  });

  it.each(STREAMS)("%s cannot reach a state that explains it beside another magnet", (_n, _l, c) => {
    // Walks every control from every state the learner can be in, and checks
    // the invariant on each one. The old bug was reachable in a single tap:
    // pick the horseshoe, then pick "Neutral point (X)".
    const { shapes, features } = magnetBlock(c);
    const actions: MagnetPick[] = [
      ...shapes.map((s) => ({ pick: "shape", id: s.id }) as MagnetPick),
      ...features.map((f) => ({ pick: "feature", id: f.id }) as MagnetPick),
    ];

    const seen = new Set<string>();
    const queue: MagnetSelection[] = [{ shape: shapes[0].id, feature: null }];
    const key = (s: MagnetSelection) => `${s.shape}|${s.feature}`;

    while (queue.length) {
      const state = queue.pop()!;
      if (seen.has(key(state))) continue;
      seen.add(key(state));

      const held = features.find((f) => f.id === state.feature);
      if (held?.requiresShape) {
        expect(
          state.shape,
          `"${held.label}" is explained beside the ${state.shape} magnet`,
        ).toBe(held.requiresShape);
      }
      for (const action of actions) queue.push(magnetSelection(features, state, action));
    }

    // The walk has to have actually visited the interesting states.
    expect(seen.size).toBeGreaterThan(shapes.length);
    expect(seen.has(`${NEUTRAL_ONLY}|neutral`), "the neutral view is unreachable").toBe(true);
  });

  it.each(STREAMS)("%s switches to the like-pole magnet when the neutral point is picked", (_n, _l, c) => {
    const { features } = magnetBlock(c);
    for (const shape of magnetBlock(c).shapes) {
      const next = magnetSelection(features, { shape: shape.id, feature: null }, {
        pick: "feature",
        id: "neutral",
      });
      expect(next).toEqual({ shape: NEUTRAL_ONLY, feature: "neutral" });
    }
  });

  it.each(STREAMS)("%s drops the neutral point when another magnet is picked", (_n, _l, c) => {
    const { features } = magnetBlock(c);
    for (const shape of magnetBlock(c).shapes) {
      const next = magnetSelection(features, { shape: NEUTRAL_ONLY, feature: "neutral" }, {
        pick: "shape",
        id: shape.id,
      });
      expect(next.feature).toBe(shape.id === NEUTRAL_ONLY ? "neutral" : null);
    }
  });

  it.each(STREAMS)("%s keeps the general properties when the magnet changes", (_n, _l, c) => {
    const { features, shapes } = magnetBlock(c);
    for (const feature of features.filter((f) => !f.requiresShape)) {
      for (const shape of shapes) {
        const next = magnetSelection(features, { shape: "bar", feature: feature.id }, {
          pick: "shape",
          id: shape.id,
        });
        expect(next, `${feature.id} was dropped`).toEqual({ shape: shape.id, feature: feature.id });
      }
    }
  });
});

describe("Ch7 — one primary visual per concept", () => {
  it.each(STREAMS)("%s uses each apparatus photograph exactly once", (_n, _l, content) => {
    const used = JSON.stringify(content);
    for (const [, src] of APPARATUS) {
      expect(used.split(`"${src}"`).length - 1, `${src} appears more than once`).toBe(1);
    }
  });

  it.each(STREAMS)("%s keeps one current-field block, not a duplicate beside it", (_n, _l, c) => {
    expect(c.sections.filter((s) => s.currentFieldPatterns)).toHaveLength(1);
    expect(c.sections.filter((s) => s.magnetFieldDiagram)).toHaveLength(1);
  });

  it.each(STREAMS)("%s keeps its other Chapter 7 visuals untouched", (_n, _l, content) => {
    // The contextual scenes an earlier pass added must survive this one. The
    // old four-panel "dailyLife" composite was deliberately removed in the
    // final correction pass — it duplicated the approved lightning visual and
    // the daily-life accordions — so it is no longer expected here.
    const used = JSON.stringify(content);
    for (const src of [
      SCIENCE_F2_CH7_IMAGES.chargeTransfer,
      SCIENCE_F2_CH7_IMAGES.meterPlacement,
      SCIENCE_F2_CH7_IMAGES.electromagnetUses,
    ]) {
      expect(used, `${src} was dropped`).toContain(src);
    }
  });

  it.each(STREAMS)("%s no longer carries the redundant four-panel daily-life composite", (_n, _l, content) => {
    const used = JSON.stringify(content);
    expect(used, "dailyLife image should have been removed as duplicative").not.toContain(
      SCIENCE_F2_CH7_IMAGES.dailyLife,
    );
  });
});

describe("Ch7 — the figure works without a mouse or an animation", () => {
  it.each(STREAMS)("%s gives every control a pressed state and a tap target", (_n, lang, content) => {
    const markup = renderConductor(content, "straight", lang);
    const buttons = [...markup.matchAll(/<button[^>]*>/g)].map((m) => m[0]);
    // Three conductors plus the reverse-current control.
    expect(buttons.length).toBeGreaterThanOrEqual(4);
    for (const button of buttons) {
      expect(button, "a control has no pressed state").toContain("aria-pressed=");
      expect(button, "a control is under the 44px tap target").toContain("min-h-11");
      expect(button, "a control has no visible focus ring").toContain("focus-visible:ring-2");
    }
  });

  it.each(STREAMS)("%s announces the explanation panel politely", (_n, lang, content) => {
    expect(renderConductor(content, "loop", lang)).toContain('aria-live="polite"');
  });

  it.each(STREAMS)("%s scales the overlay with the picture rather than pinning pixels", (_n, lang, content) => {
    const markup = renderConductor(content, "solenoid", lang);
    // One viewBox in the artwork's own pixel space, and a box that keeps the
    // artwork's ratio — so nothing needs a desktop-only coordinate.
    expect(markup).toContain(`viewBox="0 0 ${CH7_ART.width} ${CH7_ART.height}"`);
    expect(markup).toContain("aspect-ratio:16 / 9");
    expect(markup).toContain("object-contain");
  });
});
