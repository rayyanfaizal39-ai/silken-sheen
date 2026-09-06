import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { BreezeDiagram } from "@/components/notes/blocks/BreezeDiagram";
import { ConvectionRadiation } from "@/components/notes/blocks/ConvectionRadiation";
import { BimetallicStrip } from "@/components/notes/blocks/BimetallicStrip";
import { SurfaceComparison } from "@/components/notes/blocks/SurfaceComparison";
import {
  BASE_GAP,
  ExpansionParticles,
  HEATED_SCALE,
  PARTICLE_R,
} from "@/components/notes/blocks/ExpansionParticles";
import {
  CANS,
  CH9_ART,
  COAST,
  FIRE_ALARM,
  KITCHEN,
  absorptionRays,
  breezeFlow,
  contactClosed,
  convectionLoop,
  emissionRays,
  radiationRays,
  stripLayers,
} from "@/components/notes/blocks/ch9-heat-geometry";
import {
  LEARNING_IMAGE_VARIANTS,
  parseAspectRatio,
} from "@/components/notes/blocks/learning-image";
import { SCIENCE_F2_CH9_IMAGES } from "../visual-assets";
import type { ScienceF2InteractiveContent } from "../interactive-types";
import { scienceF2C9InteractiveBM } from "./interactive-bm";
import { scienceF2C9InteractiveDLP } from "./interactive-dlp";

/**
 * Guards the Chapter 9 (Heat) visual pass.
 *
 * The chapter's artwork was approved before this pass and is not regenerated,
 * so most of what is asserted here is about the teaching layer drawn OVER that
 * artwork: that the airflow on the two coastline photographs really does run
 * the way each breeze is named, that the strip only reads as closing a circuit
 * when it actually reaches the contact, and that a particle never changes size.
 * Each of those is a claim the chapter makes in words, checked against the
 * geometry that draws it.
 */

const PUBLIC_ROOT = resolve(process.cwd(), "public");

const STREAMS: [string, "bm" | "en", ScienceF2InteractiveContent][] = [
  ["BM", "bm", scienceF2C9InteractiveBM],
  ["DLP", "en", scienceF2C9InteractiveDLP],
];

/** The five files this pass added, in the order the chapter uses them. */
const NEW_ASSETS: [string, string][] = [
  ["hero", SCIENCE_F2_CH9_IMAGES.heatHero],
  ["heat vs temperature", SCIENCE_F2_CH9_IMAGES.heatVsTemperature],
  ["polar bear", SCIENCE_F2_CH9_IMAGES.polarBear],
  ["expansion uses", SCIENCE_F2_CH9_IMAGES.expansionUses],
  ["absorption/emission", SCIENCE_F2_CH9_IMAGES.absorptionEmission],
];

/** The artwork the pass was told to keep exactly as it was. */
const KEPT_ASSETS: [string, string][] = [
  ["sea breeze", SCIENCE_F2_CH9_IMAGES.seaBreeze],
  ["land breeze", SCIENCE_F2_CH9_IMAGES.landBreeze],
  ["kitchen", SCIENCE_F2_CH9_IMAGES.kitchenHeatTransfer],
  ["conductor vs insulator", SCIENCE_F2_CH9_IMAGES.conductorInsulator],
  ["fire alarm", SCIENCE_F2_CH9_IMAGES.bimetallicAlarm],
  ["green building", SCIENCE_F2_CH9_IMAGES.greenBuilding],
];

const blockOf = <T,>(c: ScienceF2InteractiveContent, key: string): T =>
  (c.sections.find((s) => (s as Record<string, unknown>)[key]) as Record<string, unknown>)[
    key
  ] as T;

type BreezeBlock = Parameters<typeof BreezeDiagram>[0]["block"];
type ConvectionBlock = Parameters<typeof ConvectionRadiation>[0]["block"];
type BimetallicBlock = Parameters<typeof BimetallicStrip>[0]["block"];
type SurfaceBlock = Parameters<typeof SurfaceComparison>[0]["block"];

/**
 * The particle figure's own SVG, without the card chrome around it — the
 * interactive badge carries an icon whose circles would otherwise be counted
 * as particles.
 */
function particleSvg(markup: string): string {
  const at = markup.lastIndexOf('<svg viewBox="0 0 ');
  return markup.slice(at, markup.indexOf("</svg>", at) + 6);
}

/** Renders a two-state figure with the named state selected. */
function renderState<B extends { [k: string]: unknown }>(
  Component: (props: { block: B; lang?: string }) => ReactElement,
  block: B,
  listKey: string,
  id: string,
  lang: string,
) {
  const list = block[listKey] as { id: string }[];
  const target = list.find((x) => x.id === id)!;
  return renderToStaticMarkup(
    <Component
      block={{ ...block, [listKey]: [target, ...list.filter((x) => x.id !== id)] } as B}
      lang={lang}
    />,
  );
}

// ---------------------------------------------------------------------------

describe("Ch9 artwork — the files themselves", () => {
  it.each([...NEW_ASSETS, ...KEPT_ASSETS])("%s ships a WebP that exists", (_name, src) => {
    expect(src.endsWith(".webp"), `${src} is not a WebP`).toBe(true);
    const file = resolve(PUBLIC_ROOT, src.replace(/^\//, ""));
    expect(existsSync(file), `${src} is missing from public/`).toBe(true);
    expect(statSync(file).size).toBeGreaterThan(4096);
  });

  it.each(NEW_ASSETS)("%s ships no PNG beside it in the production folder", (_name, src) => {
    const png = resolve(PUBLIC_ROOT, src.replace(/^\//, "").replace(/\.webp$/, ".png"));
    expect(existsSync(png), `${png} would ship the unconverted source`).toBe(false);
  });

  it("gives the chapter its own hero instead of the generic subject banner", () => {
    const source = readFileSync(resolve(process.cwd(), "src/routes/notes.tsx"), "utf8");
    expect(source).toMatch(
      /activeChapterKey === "Chapter 9"[\s\S]{0,60}\? SCIENCE_F2_CH9_IMAGES\.heatHero/,
    );
    // And shows it whole: a hero drawn for one chapter carries teaching content
    // down to the bottom of its frame, which a banner crop would cut off.
    expect(source).toContain("chapterArtworkIsWhole");
    expect(source).toContain("object-contain");
  });
});

describe("Ch9 — every kept visual is still used, exactly once", () => {
  it.each(STREAMS)("%s still uses all six approved Chapter 9 images", (_n, _l, content) => {
    const used = JSON.stringify(content);
    for (const [name, src] of KEPT_ASSETS) {
      expect(used.split(`"${src}"`).length - 1, `${name} is not used exactly once`).toBe(1);
    }
  });

  it.each(STREAMS)("%s uses each new file exactly once", (_n, _l, content) => {
    const used = JSON.stringify(content);
    // The hero is chapter chrome, set in the route rather than in content.
    for (const [name, src] of NEW_ASSETS.filter(([n]) => n !== "hero")) {
      expect(used.split(`"${src}"`).length - 1, `${name} is not used exactly once`).toBe(1);
    }
    expect(used).not.toContain(SCIENCE_F2_CH9_IMAGES.heatHero);
  });

  it.each(STREAMS)("%s shows the Hidden Polar Bear enrichment card once only", (_n, _l, c) => {
    expect(c.blogHighlight.imagePath).toBe(SCIENCE_F2_CH9_IMAGES.polarBear);
    expect((c.blogHighlight.imageAlt ?? "").length).toBeGreaterThan(30);
    // One card, and nothing in the sections repeats it.
    expect(JSON.stringify(c.sections)).not.toContain(SCIENCE_F2_CH9_IMAGES.polarBear);
  });

  it.each(STREAMS)("%s keeps one figure per concept, with no leftover duplicate", (_n, _l, c) => {
    // Each of these blocks now owns the photograph it teaches on, so the same
    // picture must not also appear as a static context image beside it.
    const contextSrcs = c.sections.flatMap((s) => (s.contextImages ?? []).map((i) => i.src));
    for (const src of [
      SCIENCE_F2_CH9_IMAGES.kitchenHeatTransfer,
      SCIENCE_F2_CH9_IMAGES.bimetallicAlarm,
      SCIENCE_F2_CH9_IMAGES.seaBreeze,
      SCIENCE_F2_CH9_IMAGES.landBreeze,
    ]) {
      expect(contextSrcs, `${src} is duplicated beside its figure`).not.toContain(src);
    }
    expect(c.sections.filter((s) => s.contextImagePair?.length)).toHaveLength(0);
  });
});

describe("Ch9 sea and land breeze — the airflow matches the name", () => {
  it("a sea breeze blows from the sea toward the land at the surface", () => {
    const flow = breezeFlow("land"); // daytime: the land is the warmer side
    expect(flow.surface.x1).toBe(COAST.seaX);
    expect(flow.surface.x2).toBe(COAST.landX);
    expect(flow.surface.x2, "surface wind does not run sea -> land").toBeGreaterThan(
      flow.surface.x1,
    );
  });

  it("a land breeze blows from the land toward the sea at the surface", () => {
    const flow = breezeFlow("sea"); // night: the sea is the warmer side
    expect(flow.surface.x1).toBe(COAST.landX);
    expect(flow.surface.x2).toBe(COAST.seaX);
    expect(flow.surface.x2, "surface wind does not run land -> sea").toBeLessThan(flow.surface.x1);
  });

  it("the two breezes are exact opposites, not two versions of the same picture", () => {
    const day = breezeFlow("land");
    const night = breezeFlow("sea");
    // The two horizontal flows run opposite ways...
    for (const key of ["surface", "aloft"] as const) {
      expect(Math.sign(day[key].x2 - day[key].x1), key).toBe(
        -Math.sign(night[key].x2 - night[key].x1),
      );
    }
    // ...and the vertical ones have swapped sides of the coast.
    expect(day.rising.x1).toBe(night.sinking.x1);
    expect(day.sinking.x1).toBe(night.rising.x1);
    expect(day.warmX).toBe(night.coolX);
    expect(day.coolX).toBe(night.warmX);
  });

  it("warm air rises over the warmer side and cool air sinks over the other", () => {
    for (const warmer of ["land", "sea"] as const) {
      const flow = breezeFlow(warmer);
      expect(flow.rising.y2, "rising air does not go up").toBeLessThan(flow.rising.y1);
      expect(flow.sinking.y2, "sinking air does not go down").toBeGreaterThan(flow.sinking.y1);
      expect(flow.rising.x1).toBe(flow.warmX);
      expect(flow.sinking.x1).toBe(flow.coolX);
    }
  });

  it("the circulation closes: what rises on one side sinks on the other", () => {
    for (const warmer of ["land", "sea"] as const) {
      const flow = breezeFlow(warmer);
      expect(flow.aloft.x1).toBe(flow.rising.x2);
      expect(flow.aloft.x2).toBe(flow.sinking.x1);
      expect(flow.surface.x2).toBe(flow.rising.x1);
    }
  });

  it("every arrow stays inside the photograph", () => {
    for (const warmer of ["land", "sea"] as const) {
      for (const arrow of Object.values(breezeFlow(warmer))) {
        if (typeof arrow === "number") continue;
        for (const x of [arrow.x1, arrow.x2]) expect(x).toBeGreaterThan(0);
        for (const x of [arrow.x1, arrow.x2]) expect(x).toBeLessThan(CH9_ART.width);
        for (const y of [arrow.y1, arrow.y2]) expect(y).toBeGreaterThan(0);
        for (const y of [arrow.y1, arrow.y2]) expect(y).toBeLessThan(CH9_ART.height);
      }
    }
  });

  it.each(STREAMS)("%s teaches each breeze on the photograph of its own time of day", (_n, lang, c) => {
    const block = blockOf<BreezeBlock>(c, "breezeDiagram");
    const day = block.breezes.find((b) => b.id === "sea")!;
    const night = block.breezes.find((b) => b.id === "land")!;
    expect(day.image.src).toBe(SCIENCE_F2_CH9_IMAGES.seaBreeze);
    expect(night.image.src).toBe(SCIENCE_F2_CH9_IMAGES.landBreeze);
    expect(day.warmerSide).toBe("land");
    expect(night.warmerSide).toBe("sea");

    for (const [id, src] of [
      ["sea", SCIENCE_F2_CH9_IMAGES.seaBreeze],
      ["land", SCIENCE_F2_CH9_IMAGES.landBreeze],
    ] as const) {
      const markup = renderState(BreezeDiagram, block, "breezes", id, lang);
      expect(markup).toContain(`src="${src}"`);
      // One photograph on screen at a time: the other belongs to the other state.
      const other = id === "sea" ? SCIENCE_F2_CH9_IMAGES.landBreeze : SCIENCE_F2_CH9_IMAGES.seaBreeze;
      expect(markup).not.toContain(`src="${other}"`);
    }
  });
});

describe("Ch9 convection and radiation — drawn on the kitchen scene", () => {
  it("the convection loop stays inside the pan", () => {
    const { pan } = KITCHEN;
    const numbers = convectionLoop().d.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    for (let i = 0; i + 1 < numbers.length; i += 2) {
      expect(numbers[i]).toBeGreaterThanOrEqual(pan.x);
      expect(numbers[i]).toBeLessThanOrEqual(pan.x + pan.w);
      expect(numbers[i + 1]).toBeGreaterThanOrEqual(pan.y);
      expect(numbers[i + 1]).toBeLessThanOrEqual(pan.y + pan.h);
    }
  });

  it("fluid rises over the flame and sinks at the sides", () => {
    const { arrows } = convectionLoop();
    const rise = arrows.find((a) => a.key === "rise")!;
    expect(rise.x1).toBe(KITCHEN.flameX);
    expect(rise.y2, "the middle of the pan is not rising").toBeLessThan(rise.y1);
    for (const sink of arrows.filter((a) => a.key.startsWith("sink"))) {
      expect(sink.y2, "a side of the pan is not sinking").toBeGreaterThan(sink.y1);
      expect(Math.abs(sink.x1 - KITCHEN.flameX)).toBeGreaterThan(100);
    }
  });

  it("radiation runs from the pan to the hand, with nothing drawn between", () => {
    const rays = radiationRays();
    expect(rays.length).toBeGreaterThan(1);
    for (const ray of rays) {
      expect(ray.x1).toBeGreaterThanOrEqual(KITCHEN.pan.x + KITCHEN.pan.w);
      expect(ray.x2).toBeLessThan(KITCHEN.hand.x);
      expect(ray.x2, "a ray points back at the pan").toBeGreaterThan(ray.x1);
    }
  });

  it.each(STREAMS)("%s draws no medium in the radiation gap", (_n, lang, c) => {
    const block = blockOf<ConvectionBlock>(c, "convectionRadiation");
    const markup = renderState(ConvectionRadiation, block, "modes", "radiation", lang);
    // The cut-away panel belongs to convection; in radiation the space between
    // pan and hand must stay empty, which is the whole point of the mode.
    expect(markup).not.toContain(`width="${KITCHEN.pan.w}"`);
    expect(markup).toContain(`src="${SCIENCE_F2_CH9_IMAGES.kitchenHeatTransfer}"`);
  });
});

describe("Ch9 bimetallic strip — the circuit closes only when it actually reaches", () => {
  it("the strip is straight at room temperature and bent when heated", () => {
    expect(stripLayers(false).endY).toBe(FIRE_ALARM.ironY);
    expect(stripLayers(true).endY, "heating did not bend the strip").toBeGreaterThan(
      FIRE_ALARM.ironY,
    );
  });

  it("the circuit is open at room temperature and complete when heated", () => {
    expect(contactClosed(false)).toBe(false);
    expect(contactClosed(true)).toBe(true);
  });

  it("closure is computed from the geometry, not asserted by the state name", () => {
    // The strip's free end must genuinely arrive at the contact screw.
    expect(stripLayers(true).endY).toBeGreaterThanOrEqual(FIRE_ALARM.contact.y);
    expect(stripLayers(false).endY).toBeLessThan(FIRE_ALARM.contact.y);
  });

  it("the faster-expanding metal lies on the outside of the bend", () => {
    // Copper is drawn above iron, and the strip bends downward — so copper is
    // on the longer, outer arc, which is the only way a strip can bend.
    expect(FIRE_ALARM.copperY).toBeLessThan(FIRE_ALARM.seamY);
    expect(FIRE_ALARM.seamY).toBeLessThan(FIRE_ALARM.ironY);
    expect(stripLayers(true).endY).toBeGreaterThan(stripLayers(false).endY);
  });

  it("the redrawn strip only covers the strip, never the clamp that holds it", () => {
    expect(FIRE_ALARM.mask.x).toBeGreaterThanOrEqual(FIRE_ALARM.pivotX - 8);
    expect(FIRE_ALARM.mask.y).toBeLessThan(FIRE_ALARM.copperY);
    expect(FIRE_ALARM.mask.y + FIRE_ALARM.mask.h).toBeGreaterThan(FIRE_ALARM.ironY);
    // And nothing below the strip: the burner and the contact screw stay visible.
    expect(FIRE_ALARM.mask.y + FIRE_ALARM.mask.h).toBeLessThan(FIRE_ALARM.contact.y);
  });

  it.each(STREAMS)("%s renders the apparatus in both states, alarm state included", (_n, lang, c) => {
    const block = blockOf<BimetallicBlock>(c, "bimetallicStrip");
    expect(block.image.src).toBe(SCIENCE_F2_CH9_IMAGES.bimetallicAlarm);
    const room = renderState(BimetallicStrip, block, "states", "room", lang);
    const heated = renderState(BimetallicStrip, block, "states", "heated", lang);
    for (const markup of [room, heated]) {
      expect(markup).toContain(`src="${SCIENCE_F2_CH9_IMAGES.bimetallicAlarm}"`);
    }
    expect(room).toContain(block.circuitOpenLabel);
    expect(heated).toContain(block.circuitClosedLabel);
    // Only the heated state repaints the strip.
    expect(room).not.toContain(FIRE_ALARM.backdrop);
    expect(heated).toContain(FIRE_ALARM.backdrop);
  });
});

describe("Ch9 absorption and emission — the same radiation, two surfaces", () => {
  it("both cans receive exactly the same incoming radiation", () => {
    const incoming = absorptionRays().filter((r) => r.key.includes("-in-"));
    const dark = incoming.filter((r) => r.key.startsWith("dark"));
    const shiny = incoming.filter((r) => r.key.startsWith("shiny"));
    expect(dark.length, "the two cans receive different numbers of rays").toBe(shiny.length);
    expect(dark.length).toBe(3);
    const length = (r: (typeof incoming)[number]) => Math.hypot(r.x2 - r.x1, r.y2 - r.y1);
    dark.forEach((ray, i) => expect(length(ray)).toBeCloseTo(length(shiny[i]), 6));
  });

  it("the matte surface absorbs more of it than the shiny one", () => {
    const rays = absorptionRays();
    const absorbed = (side: string) => rays.filter((r) => r.key.startsWith(`${side}-abs-`)).length;
    const reflected = (side: string) => rays.filter((r) => r.key.startsWith(`${side}-ref-`)).length;
    expect(absorbed("dark")).toBe(3);
    expect(reflected("dark")).toBe(0);
    expect(absorbed("shiny")).toBeLessThan(absorbed("dark"));
    expect(reflected("shiny")).toBeGreaterThan(0);
  });

  it("absorbed rays go into their can and reflected rays come away from it", () => {
    const { dark, shiny } = CANS;
    for (const ray of absorptionRays()) {
      const can = ray.key.startsWith("dark") ? dark : shiny;
      const inside = (x: number) => x > can.x && x < can.x + can.w;
      if (ray.key.includes("-abs-")) expect(inside(ray.x2), ray.key).toBe(true);
      if (ray.key.includes("-ref-")) expect(inside(ray.x2), ray.key).toBe(false);
    }
  });

  it("the matte surface also emits more than the shiny one", () => {
    const rays = emissionRays();
    const dark = rays.filter((r) => r.key.startsWith("dark"));
    const shiny = rays.filter((r) => r.key.startsWith("shiny"));
    expect(dark.length).toBeGreaterThan(shiny.length);
    expect(dark.every((r) => r.strong)).toBe(true);
    expect(shiny.every((r) => !r.strong)).toBe(true);
  });

  it("emitted rays leave each can outward, away from the other one", () => {
    const { dark, shiny } = CANS;
    for (const ray of emissionRays()) {
      if (ray.key.startsWith("dark")) expect(ray.x2, ray.key).toBeLessThan(dark.x);
      else expect(ray.x2, ray.key).toBeGreaterThan(shiny.x + shiny.w);
    }
  });

  it.each(STREAMS)("%s draws both modes on the two-can experiment", (_n, lang, c) => {
    const block = blockOf<SurfaceBlock>(c, "surfaceComparison");
    expect(block.image.src).toBe(SCIENCE_F2_CH9_IMAGES.absorptionEmission);
    for (const id of ["absorb", "emit"] as const) {
      const markup = renderState(SurfaceComparison, block, "modes", id, lang);
      expect(markup).toContain(`src="${SCIENCE_F2_CH9_IMAGES.absorptionEmission}"`);
      expect(markup).toContain(block.darkLabel);
      expect(markup).toContain(block.shinyLabel);
    }
  });
});

describe("Ch9 particle model — spacing changes, particles do not", () => {
  it("one radius serves every state and both temperatures", () => {
    expect(PARTICLE_R).toBeGreaterThan(0);
    for (const [lang, content] of STREAMS.map(([, l, c]) => [l, c] as const)) {
      const block = blockOf<Parameters<typeof ExpansionParticles>[0]["block"]>(
        content,
        "expansionParticles",
      );
      const radii = new Set<string>();
      for (const stateId of block.states.map((s) => s.id)) {
        const figure = particleSvg(
          renderState(ExpansionParticles, block, "states", stateId, lang),
        );
        for (const m of figure.matchAll(/<circle[^>]*r="([\d.]+)"/g)) radii.add(m[1]);
      }
      expect([...radii], `${lang} drew more than one particle size`).toEqual([String(PARTICLE_R)]);
    }
  });

  it("heating moves the particles apart without changing them", () => {
    for (const state of Object.keys(BASE_GAP)) {
      expect(BASE_GAP[state] * HEATED_SCALE, state).toBeGreaterThan(BASE_GAP[state]);
    }
    expect(HEATED_SCALE).toBeGreaterThan(1);
  });

  it("the chamber fills its canvas instead of floating in empty card space", () => {
    const block = blockOf<Parameters<typeof ExpansionParticles>[0]["block"]>(
      scienceF2C9InteractiveDLP,
      "expansionParticles",
    );
    const markup = particleSvg(renderState(ExpansionParticles, block, "states", "gas", "en"));
    const view = markup.match(/viewBox="0 0 (\d+) (\d+)"/)!;
    // Read the container's own `width`, not the `stroke-width` that follows it:
    // the lookbehind for a space is what tells the two apart.
    const attrs = markup.match(/<rect ([^>]*)>/)![1];
    const chamberWidth = Number(/(?:^| )width="([\d.]+)"/.exec(attrs)![1]);
    const coverage = chamberWidth / Number(view[1]);
    expect(coverage, "the chamber uses less than half the canvas width").toBeGreaterThan(0.6);
  });
});

describe("Ch9 figure sizing — bounded, and never cropped", () => {
  const SPEC: Record<string, { maxWidth: number; maxHeight: number }> = {
    // A single contextual scene.
    scene: { maxWidth: 600, maxHeight: 360 },
    // A multi-panel visual, which the brief allows more width.
    panel: { maxWidth: 660, maxHeight: 380 },
  };

  it.each(STREAMS)("%s keeps every context figure inside the agreed ceilings", (_n, _l, c) => {
    const figures = c.sections.flatMap((s) => s.contextImages ?? []);
    expect(figures.length).toBeGreaterThan(0);
    for (const figure of figures) {
      const size = figure.size!;
      expect(Object.keys(SPEC), figure.src).toContain(size);
      const variant = LEARNING_IMAGE_VARIANTS[size];
      const ratio = parseAspectRatio(figure.aspect ?? "3 / 2");
      const budget = Number(/min\((?:[\d.]+vh), (\d+)px\)/.exec(variant.heightBudget)?.[1]);
      const width = Math.min(variant.maxWidth, budget * ratio);
      expect(width, figure.src).toBeLessThanOrEqual(SPEC[size].maxWidth);
      expect(width / ratio, figure.src).toBeLessThanOrEqual(SPEC[size].maxHeight);
    }
  });

  it.each(STREAMS)("%s never crops a teaching figure", (_n, lang, c) => {
    // Every overlay figure shows the whole picture: the SVG teaching layer is
    // positioned in the artwork's own coordinates, so a crop would move the
    // arrows off the things they point at.
    const markups = [
      renderState(BreezeDiagram, blockOf<BreezeBlock>(c, "breezeDiagram"), "breezes", "sea", lang),
      renderState(
        ConvectionRadiation,
        blockOf<ConvectionBlock>(c, "convectionRadiation"),
        "modes",
        "convection",
        lang,
      ),
      renderState(
        BimetallicStrip,
        blockOf<BimetallicBlock>(c, "bimetallicStrip"),
        "states",
        "room",
        lang,
      ),
      renderState(
        SurfaceComparison,
        blockOf<SurfaceBlock>(c, "surfaceComparison"),
        "modes",
        "absorb",
        lang,
      ),
    ];
    for (const markup of markups) {
      expect(markup).toContain("object-contain");
      expect(markup).not.toContain("object-cover");
      expect(markup).toContain(`viewBox="0 0 ${CH9_ART.width} ${CH9_ART.height}"`);
      expect(markup).toContain("aspect-ratio:16 / 9");
    }
  });
});

describe("Ch9 green building — hotspots on the house", () => {
  const WANTED = ["reflective-roof", "insulation", "overhang", "ventilation", "trees"];

  it.each(STREAMS)("%s marks all five features on the approved house image", (_n, _l, c) => {
    const figure = c.sections
      .flatMap((s) => s.contextImages ?? [])
      .find((i) => i.src === SCIENCE_F2_CH9_IMAGES.greenBuilding)!;
    expect(figure, "the green building image is gone").toBeTruthy();
    expect(figure.annotations.map((a) => a.id)).toEqual(WANTED);
    for (const hotspot of figure.annotations) {
      expect(hotspot.x, hotspot.id).toBeGreaterThan(0);
      expect(hotspot.x, hotspot.id).toBeLessThan(100);
      expect(hotspot.y, hotspot.id).toBeGreaterThan(0);
      expect(hotspot.y, hotspot.id).toBeLessThan(100);
      expect((hotspot.note ?? "").length, hotspot.id).toBeGreaterThan(40);
    }
  });

  it("each language writes its own hotspot words on the same positions", () => {
    const spots = (c: ScienceF2InteractiveContent) =>
      c.sections
        .flatMap((s) => s.contextImages ?? [])
        .find((i) => i.src === SCIENCE_F2_CH9_IMAGES.greenBuilding)!.annotations;
    const bm = spots(scienceF2C9InteractiveBM);
    const dlp = spots(scienceF2C9InteractiveDLP);
    bm.forEach((spot, i) => {
      expect(spot.x).toBe(dlp[i].x);
      expect(spot.y).toBe(dlp[i].y);
      expect(spot.label).not.toBe(dlp[i].label);
      expect(spot.note).not.toBe(dlp[i].note);
    });
  });

  it.each(STREAMS)("%s gives the enrichment section its own check heading", (_n, _l, c) => {
    const green = c.sections.find((s) => s.checksTitle);
    expect(green, "no section carries a check-heading override").toBeTruthy();
    // The heading words change; the curriculum reference does not.
    expect(green!.number).toBe("9.4");
    expect(green!.checksTitle).not.toContain("9.4");
    // Exactly one section overrides it, so no other heading silently changed.
    expect(c.sections.filter((s) => s.checksTitle)).toHaveLength(1);
  });
});

describe("Ch9 — the academic content this pass was not to touch", () => {
  it.each(STREAMS)("%s keeps its section count, checks, reflection and quiz", (_n, _l, c) => {
    expect(c.chapter).toBe(9);
    expect(c.sections).toHaveLength(9);
    expect(c.reflectionItems).toHaveLength(10);
    expect(c.miniQuiz).toHaveLength(3);
    for (const section of c.sections) expect(section.checks.length, section.title).toBe(2);
  });

  it("both languages still describe the same chapter, section for section", () => {
    const numbers = (c: ScienceF2InteractiveContent) => c.sections.map((s) => s.number);
    expect(numbers(scienceF2C9InteractiveBM)).toEqual(numbers(scienceF2C9InteractiveDLP));
  });

  it("the quiz answers are untouched", () => {
    // Structural guard: the same questions, in the same order, with the same
    // answers in both languages.
    for (const c of [scienceF2C9InteractiveBM, scienceF2C9InteractiveDLP]) {
      const [first, second, third] = c.miniQuiz;
      expect(first.type).toBe("true-false");
      expect((first as { answer: boolean }).answer).toBe(false);
      expect((second as { answerIndex: number }).answerIndex).toBe(2);
      expect((third as { answerIndex: number }).answerIndex).toBe(1);
    }
  });
});

describe("Ch9 — controls stay usable", () => {
  it.each(STREAMS)("%s gives every figure control a tap target and a pressed state", (_n, lang, c) => {
    const markups = [
      renderState(BreezeDiagram, blockOf<BreezeBlock>(c, "breezeDiagram"), "breezes", "sea", lang),
      renderState(
        ConvectionRadiation,
        blockOf<ConvectionBlock>(c, "convectionRadiation"),
        "modes",
        "convection",
        lang,
      ),
      renderState(
        BimetallicStrip,
        blockOf<BimetallicBlock>(c, "bimetallicStrip"),
        "states",
        "room",
        lang,
      ),
      renderState(
        SurfaceComparison,
        blockOf<SurfaceBlock>(c, "surfaceComparison"),
        "modes",
        "absorb",
        lang,
      ),
    ];
    for (const markup of markups) {
      const buttons = [...markup.matchAll(/<button[^>]*>/g)].map((m) => m[0]);
      expect(buttons.length).toBeGreaterThanOrEqual(2);
      for (const button of buttons) {
        expect(button).toContain("aria-pressed=");
        expect(button).toContain("min-h-11");
        expect(button).toContain("focus-visible:ring-2");
      }
      expect(markup).toContain('aria-live="polite"');
    }
  });
});
