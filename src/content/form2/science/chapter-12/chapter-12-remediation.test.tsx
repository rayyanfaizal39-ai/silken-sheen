import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import {
  Chapter12PlanetExplorer,
  Chapter12SpotlightFigure,
} from "@/components/notes/blocks/Chapter12SpotlightFigure";
import {
  CH12_ART_HEIGHT,
  CH12_ART_WIDTH,
  CH12_FIGURE_GEOMETRY,
  CH12_FIGURE_ORDER,
} from "@/components/notes/blocks/ch12-approved-figure-geometry";
import { spotlightBounds } from "@/components/notes/blocks/spotlight-shapes";
import { SCIENCE_F2_CH12_IMAGES } from "../visual-assets";
import {
  AuLightYearCalculator,
  auLightYearFrom,
} from "@/components/notes/blocks/AuLightYearCalculator";
import { PlanetComparisonTable } from "@/components/notes/blocks/PlanetComparisonTable";
import { scienceF2C12InteractiveBM } from "./interactive-bm";
import { scienceF2C12InteractiveDLP } from "./interactive-dlp";
import { scienceF2C12QuizzesBM } from "./quizzes-bm";
import { scienceF2C12QuizzesDLP } from "./quizzes-dlp";
import { scienceF2C12FlashcardsBM } from "./flashcards-bm";
import { scienceF2C12FlashcardsDLP } from "./flashcards-dlp";
import { scienceF2C12MindMapBM } from "./mindmap-bm";
import { scienceF2C12MindMapDLP } from "./mindmap-dlp";
import type { ScienceF2InteractiveContent, ScienceInteractiveSection } from "../interactive-types";

/**
 * Regression guards for the Chapter 12 textbook-order remediation.
 *
 * The chapter previously grouped five Standard Pembelajaran into five broad
 * AcadeMY sections (e.g. "Membandingkan Planet", "Hubungan antara Ciri
 * Planet") instead of following the textbook's own subtopic order. This file
 * now locks in the textbook's exact 21-subtopic learner-facing sequence, in
 * addition to every data/wording guard the chapter has already earned.
 *
 * Only the live interactive path is covered. notes-bm.ts / notes-dlp.ts are
 * shadowed by the interactive branch in routes/notes.tsx and are excluded.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C12InteractiveBM],
  ["dlp", scienceF2C12InteractiveDLP],
];

const DECKS: [string, unknown[]][] = [
  ["quizzes bm", scienceF2C12QuizzesBM as unknown[]],
  ["quizzes dlp", scienceF2C12QuizzesDLP as unknown[]],
  ["flashcards bm", scienceF2C12FlashcardsBM as unknown[]],
  ["flashcards dlp", scienceF2C12FlashcardsDLP as unknown[]],
];

// The exact textbook subtopic order (task: MASTER TEXTBOOK-ORDER REMEDIATION).
// 21 learner-facing sections, one per textbook subtopic, in this exact order.
const EXPECTED_TITLES_DLP = [
  "Comparison of Planet Distances in the Solar System from the Sun",
  "Astronomical Unit (A.U.)",
  "Light Years (ly)",
  "Converting Units between Astronomical Unit, Light Years and Kilometres",
  "Worked Examples — A.U. / ly Conversions",
  "Table 12.1 — Distance of Planets from the Sun in A.U. and ly",
  "Planets in the Solar System",
  "General Characteristics of Planets in the Solar System — Table 12.2",
  "Relationship between Temperature of a Planet and the Sun — Table 12.3",
  "Relationship between Density and Gravitational Pull of the Planets — Table 12.4",
  "Relationship between Distance, Time and Speed — Table 12.5",
  "Rotational Direction of the Planets",
  "Hypothetical Situation Related to the Solar System",
  "Natural Satellites",
  "Earth–Moon System",
  "The Earth as a Planet for Living Things",
  "Characteristics of the Earth",
  "Love Our Earth",
  "Ecological Footprint",
  "Reducing Our Ecological Footprint",
  "Formative Practice 12.1",
];

const EXPECTED_TITLES_BM = [
  "Perbandingan Jarak Planet dalam Sistem Suria dari Matahari",
  "Unit Astronomi (A.U.)",
  "Tahun Cahaya (ly)",
  "Menukar Unit antara Unit Astronomi, Tahun Cahaya dan Kilometer",
  "Contoh Pengiraan — Penukaran A.U. / ly",
  "Jadual 12.1 — Jarak Planet dari Matahari dalam A.U. dan ly",
  "Planet dalam Sistem Suria",
  "Ciri-ciri Am Planet dalam Sistem Suria — Jadual 12.2",
  "Hubungan antara Suhu Planet dengan Matahari — Jadual 12.3",
  "Hubungan antara Ketumpatan dan Tarikan Graviti Planet — Jadual 12.4",
  "Hubungan antara Jarak, Masa dan Kelajuan — Jadual 12.5",
  "Arah Putaran Planet",
  "Situasi Hipotetikal Berkaitan Sistem Suria",
  "Satelit Semula Jadi",
  "Sistem Bumi–Bulan",
  "Bumi sebagai Planet untuk Hidupan",
  "Ciri-ciri Bumi",
  "Cintai Bumi Kita",
  "Jejak Ekologi",
  "Mengurangkan Jejak Ekologi",
  "Latihan Formatif 12.1",
];

function allText(content: ScienceF2InteractiveContent) {
  return JSON.stringify(content);
}

function sectionWith(content: ScienceF2InteractiveContent, key: string) {
  return content.sections.find((s) => (s as unknown as Record<string, unknown>)[key]);
}

function blockFrom<T>(section: ScienceInteractiveSection, key: string) {
  return (section as unknown as Record<string, T>)[key];
}

function table12_2(content: ScienceF2InteractiveContent) {
  return content.sections.find((s) => s.title.match(/Jadual 12\.2|Table 12\.2/))!;
}

describe("Chapter 12 — strict textbook-order regression (task item 26)", () => {
  it("renders the exact 21 textbook subtopics, in the exact textbook order, for DLP", () => {
    const titles = scienceF2C12InteractiveDLP.sections.map((s) => s.title);
    expect(titles).toEqual(EXPECTED_TITLES_DLP);
  });

  it("renders the exact 21 textbook subtopics, in the exact textbook order, for BM", () => {
    const titles = scienceF2C12InteractiveBM.sections.map((s) => s.title);
    expect(titles).toEqual(EXPECTED_TITLES_BM);
  });

  it("never duplicates a section title", () => {
    for (const [lang, content] of LANGS) {
      const titles = content.sections.map((s) => s.title);
      expect(new Set(titles).size, lang).toBe(titles.length);
    }
  });

  it("places Characteristics of the Earth after Earth–Moon System and before Love Our Earth", () => {
    for (const [lang, titles] of [
      ["dlp", EXPECTED_TITLES_DLP],
      ["bm", EXPECTED_TITLES_BM],
    ] as const) {
      const moon = titles.findIndex((t) => /Earth–Moon|Bumi–Bulan/.test(t));
      const characteristics = titles.findIndex((t) =>
        /^Characteristics of the Earth$|^Ciri-ciri Bumi$/.test(t),
      );
      const loveEarth = titles.findIndex((t) => /Love Our Earth|Cintai Bumi Kita/.test(t));
      const footprint = titles.findIndex((t) => /^Ecological Footprint$|^Jejak Ekologi$/.test(t));
      expect(moon, lang).toBeGreaterThanOrEqual(0);
      expect(characteristics, lang).toBeGreaterThan(moon);
      expect(loveEarth, lang).toBeGreaterThan(characteristics);
      expect(footprint, lang).toBeGreaterThan(loveEarth);
    }
  });

  it("places Natural Satellites after the hypothetical-rotation section, not merged into it", () => {
    for (const titles of [EXPECTED_TITLES_DLP, EXPECTED_TITLES_BM]) {
      const hypothetical = titles.findIndex((t) =>
        /Hypothetical Situation|Situasi Hipotetikal/.test(t),
      );
      const satellites = titles.findIndex((t) => /Natural Satellites|Satelit Semula Jadi/.test(t));
      expect(satellites).toBeGreaterThan(hypothetical);
    }
  });

  it("keeps Formative Practice as the final learner-facing section", () => {
    for (const [lang, content] of LANGS) {
      const last = content.sections.at(-1)!;
      expect(last.title, lang).toMatch(/Formative Practice|Latihan Formatif/);
    }
  });
});

describe("Chapter 12 — structure follows the DSKP", () => {
  it("has one Standard Kandungan, so every section is numbered 12.1", () => {
    for (const [lang, content] of LANGS) {
      const numbers = content.sections.map((s) => s.number);
      expect(numbers, lang).toEqual(Array(21).fill("12.1"));
    }
  });

  it("never shows a 12.2 section number to a learner", () => {
    // The DSKP has a single SK. The textbook uses "12.2" only for
    // Rajah/Jadual/Aktiviti numbering, never as a subtopic heading.
    for (const [lang, content] of LANGS) {
      const numbers = content.sections.map((s) => s.number);
      expect(numbers, lang).not.toContain("12.2");
    }
  });

  it("gives every textbook subtopic its own learner-facing section", () => {
    for (const [lang, content] of LANGS) {
      expect(content.sections.length, lang).toBe(21);
      expect(content.reflectionItems.length, lang).toBe(5);
    }
  });

  it("keeps BM and DLP structurally identical", () => {
    const shape = (c: ScienceF2InteractiveContent) =>
      c.sections.map((s) => ({
        number: s.number,
        blocks: Object.keys(s)
          .filter((k) => k !== "number" && k !== "title" && k !== "intro")
          .sort(),
      }));
    expect(shape(scienceF2C12InteractiveBM)).toEqual(shape(scienceF2C12InteractiveDLP));
  });
});

describe("Chapter 12 — SP 12.1.1 astronomical distance", () => {
  it("uses the textbook's constants", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toContain("1.5 × 10⁸");
      expect(text, lang).toContain("9.5 × 10¹²");
    }
  });

  it("converts correctly in both directions", () => {
    // Earth: 1.5e8 km = 1.0 A.U. = 1.58e-5 ly (textbook p.253)
    const earth = auLightYearFrom(1.5e8, "km");
    expect(earth.au).toBeCloseTo(1.0, 6);
    expect(earth.ly).toBeCloseTo(1.58e-5, 7);
    // Saturn worked example: 1.43e9 km = 9.5 A.U. = 1.51e-4 ly
    const saturn = auLightYearFrom(1.43e9, "km");
    expect(saturn.au).toBeCloseTo(9.53, 2);
    expect(saturn.ly).toBeCloseTo(1.51e-4, 6);
    // and the reverse direction the DSKP Catatan asks for
    expect(auLightYearFrom(1, "au").km).toBeCloseTo(1.5e8, 0);
    expect(auLightYearFrom(1, "ly").km).toBeCloseTo(9.5e12, 0);
  });

  it("teaches the light year as a unit of distance, never of time", () => {
    const bm = allText(scienceF2C12InteractiveBM);
    const dlp = allText(scienceF2C12InteractiveDLP);
    expect(bm).toMatch(/unit JARAK|jarak yang ditempuh|jarak yang dilalui/i);
    expect(dlp).toMatch(/unit of DISTANCE|distance travelled by light/i);
  });

  it("never asks the learner to memorise anything", () => {
    for (const [lang, content] of LANGS) {
      expect(allText(content), lang).not.toMatch(/hafal|menghafal|memoris|memorise|memorize/i);
    }
  });

  it("walks the worked examples question-first: given/find/formula/substitute before the answer", () => {
    for (const [lang, content] of LANGS) {
      const section = sectionWith(content, "guidedCalculations")!;
      const calcs = blockFrom<
        { given: string[]; find: string; formula: string; substitute: string; answer: string }[]
      >(section, "guidedCalculations");
      expect(calcs.length, lang).toBe(2);
      for (const calc of calcs) {
        expect(calc.given.length, lang).toBeGreaterThan(0);
        expect(calc.find.length, lang).toBeGreaterThan(0);
        expect(calc.formula.length, lang).toBeGreaterThan(0);
        expect(calc.substitute.length, lang).toBeGreaterThan(0);
        expect(calc.answer.length, lang).toBeGreaterThan(0);
      }
    }
  });
});

describe("Chapter 12 — SP 12.1.2 comparison with Earth (Table 12.2)", () => {
  const REQUIRED_BM = [
    "Jarak dari Matahari",
    "Jisim relatif",
    "Diameter",
    "Ketumpatan",
    "Tarikan graviti",
    "Suhu purata permukaan",
    "Masa peredaran mengelilingi Matahari",
    "Masa untuk satu putaran lengkap",
    "Kelajuan putaran pada paksi",
    "Bilangan satelit semula jadi",
    "Kandungan atmosfera utama",
    "Keadaan permukaan planet",
  ];
  const REQUIRED_DLP = [
    "Distance from Sun",
    "Relative mass",
    "Diameter",
    "Density",
    "Gravitational pull",
    "Average surface temperature",
    "Time taken to orbit the Sun",
    "Time taken for one complete rotation",
    "Velocity of rotation on axis",
    "Number of natural satellites",
    "Main atmospheric content",
    "Condition of planet's surface",
  ];

  it("covers all twelve textbook comparison characteristics, including Relative Mass and Diameter (not Size)", () => {
    for (const [lang, content, required] of [
      ["bm", scienceF2C12InteractiveBM, REQUIRED_BM],
      ["dlp", scienceF2C12InteractiveDLP, REQUIRED_DLP],
    ] as const) {
      const section = table12_2(content);
      const block = blockFrom<{ characteristics: { label: string }[] }>(
        section,
        "planetComparison",
      );
      const labels = block.characteristics.map((c) => c.label);
      for (const req of required) expect(labels, `${lang} ${req}`).toContain(req);
      expect(labels.length, lang).toBeGreaterThanOrEqual(12);
      expect(labels, lang).not.toContain("Size");
      expect(labels, lang).not.toContain("Saiz");
    }
  });

  it("compares every planet against Earth, in order from the Sun", () => {
    for (const [lang, content] of LANGS) {
      const section = table12_2(content);
      const block = blockFrom<{
        planets: string[];
        earth: string;
        characteristics: { values: string[] }[];
      }>(section, "planetComparison");
      expect(block.planets.length, lang).toBe(8);
      expect(block.planets, lang).toContain(block.earth);
      expect(block.planets.indexOf(block.earth), lang).toBe(2);
      // every characteristic must supply a value for every planet
      for (const c of block.characteristics) expect(c.values.length, lang).toBe(8);
    }
  });

  it("keeps the textbook's own planet values", () => {
    const bm = allText(scienceF2C12InteractiveBM);
    // Jadual 12.2 spot values
    for (const v of [
      "4 879",
      "12 756",
      "142 984",
      "9.8",
      "10.44",
      "24.79",
      "5.5",
      "0.7",
      "164.8",
      "317.8",
    ]) {
      expect(bm, v).toContain(v);
    }
  });

  it("says the planet spheres are not to scale", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toMatch(/tidak mengikut skala|not to true scale|not to scale/i);
    }
  });

  it("does not leak Venus's old, textbook-inaccurate trace-gas breakdown", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).not.toMatch(/neon/i);
    }
  });
});

describe("Chapter 12 — SP 12.1.3 relationships (the critical fix)", () => {
  it("never says Saturn's gravity is weaker or lower than Earth's", () => {
    // Phrase-only matching is what let this defect back in: "graviti lebih
    // lemah" was removed but "tidak setinggi Bumi" meant the same thing and
    // sailed straight through. Match the CLAIM, and only for the planets the
    // claim is false about.
    //
    // Earth 9.8 · Saturn 10.44 · Neptune 11.15 · Uranus 8.69
    // "lower than Earth" is FALSE for Saturn and Neptune, and TRUE for Uranus,
    // Mercury and Mars — so this can never be a blanket ban on the phrasing.
    const LOWER_THAN_EARTH =
      /lebih lemah|lebih rendah|tidak setinggi|tak setinggi|kurang daripada|weaker than|lower than|not as high as|less than|as high as/i;
    const FALSE_FOR = /Zuhal|Saturn|Neptun/i;
    const TRUE_FOR = /Uranus|Utarid|Mercury|Marikh|Mars/i;
    const EARTH = /Bumi|Earth/i;
    // A unit that answers the misconception is teaching it correctly.
    const REFUTES = /^\s*(Tidak|No)\b|tidak terlalu tinggi|not much higher/i;

    const violations: string[] = [];

    // Decks carry a question and its answer; judge them together.
    for (const [name, deck] of DECKS) {
      for (const item of deck as {
        id: string;
        front?: string;
        back?: string;
        question?: string;
        options?: string[];
        explanation?: string;
      }[]) {
        const answer = `${item.back ?? ""} ${item.explanation ?? ""}`;
        const unit = `${item.front ?? ""} ${item.question ?? ""} ${(item.options ?? []).join(" ")} ${answer}`;
        if (
          FALSE_FOR.test(unit) &&
          !TRUE_FOR.test(unit) &&
          LOWER_THAN_EARTH.test(unit) &&
          EARTH.test(unit)
        ) {
          if (!REFUTES.test(answer)) violations.push(`${name} ${item.id}: ${unit.slice(0, 120)}`);
        }
      }
    }

    // A mind-map child says "Graviti 10.44 m s⁻² — lebih lemah daripada Bumi"
    // while the planet sits on its parent node, so the walk carries the
    // nearest ancestor that names one. Nearest wins: a node that names its own
    // planet overrides whatever it is nested under.
    type Tree = { [k: string]: unknown } | unknown[] | string | number | boolean | null;
    const walk = (node: Tree, name: string, inherited: string) => {
      if (node === null || typeof node !== "object") return;
      const own = Object.values(node)
        .filter((v): v is string => typeof v === "string")
        .join(" ");
      // nearest naming ancestor wins
      const scope = FALSE_FOR.test(own) || TRUE_FOR.test(own) ? own : inherited;
      if (LOWER_THAN_EARTH.test(own) && EARTH.test(own) && !REFUTES.test(own)) {
        if (FALSE_FOR.test(scope) && !TRUE_FOR.test(scope)) {
          violations.push(`${name}: ${own.slice(0, 120)}`);
        }
      }
      for (const child of Object.values(node)) {
        if (child && typeof child === "object") walk(child as Tree, name, scope);
      }
    };

    for (const [name, surface] of [
      ["interactive bm", scienceF2C12InteractiveBM],
      ["interactive dlp", scienceF2C12InteractiveDLP],
      ["mindmap bm", scienceF2C12MindMapBM],
      ["mindmap dlp", scienceF2C12MindMapDLP],
    ] as const) {
      walk(surface as unknown as Tree, name, "");
    }

    expect(violations, violations.join("\n")).toEqual([]);
  });

  it("keeps the gravity values in the right numeric relationship to Earth", () => {
    // The wording must agree with the data the chapter itself displays.
    const section = table12_2(scienceF2C12InteractiveBM);
    const block = blockFrom<{
      planets: string[];
      characteristics: { id: string; values: string[] }[];
    }>(section, "planetComparison");
    const gravity = block.characteristics.find((c) => c.id === "gravity")!;
    const value = (planet: string) => parseFloat(gravity.values[block.planets.indexOf(planet)]);

    const earth = value("Bumi");
    expect(earth).toBeCloseTo(9.8, 5);
    expect(value("Zuhal"), "Saturn must be above Earth").toBeGreaterThan(earth);
    expect(value("Neptun"), "Neptune must be above Earth").toBeGreaterThan(earth);
    expect(value("Uranus"), "Uranus really is below Earth").toBeLessThan(earth);
    expect(value("Musytari")).toBeGreaterThan(earth);
    expect(value("Utarid")).toBeLessThan(earth);
    expect(value("Marikh")).toBeLessThan(earth);
  });

  it("still allows the true lower-than-Earth statements", () => {
    // Uranus, Mercury and Mars genuinely are below Earth, and the textbook
    // says so (ms. 259). The guard above must not have removed these.
    const map = JSON.stringify(scienceF2C12MindMapBM) + JSON.stringify(scienceF2C12MindMapDLP);
    expect(map).toMatch(/Utarid & Marikh: graviti lebih rendah|Mercury & Mars: lower gravity/);
    expect(map).toMatch(/Uranus/);
  });

  it("states the gas giants' gravity the way the textbook does", () => {
    const bm = allText(scienceF2C12InteractiveBM);
    const dlp = allText(scienceF2C12InteractiveDLP);
    expect(bm).toMatch(/tidak terlalu tinggi berbanding Bumi/);
    expect(dlp).toMatch(/not much higher than Earth/);
  });

  it("keeps the DSKP's density-to-gravity relationship, not a mass-only substitute", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      // density must appear alongside gravity in the relationship card
      expect(text, lang).toMatch(/ketumpatan|density/i);
      expect(text, lang).toMatch(
        /bergantung pada jisim dan ketumpatan|depends on the planet's mass and its density/i,
      );
    }
  });

  it("teaches the Venus anomaly rather than 'closest is hottest'", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toMatch(/462|paling panas|hottest/i);
      // the misconception must not be stated as a rule
      expect(text, lang).not.toMatch(
        /planet terdekat sentiasa paling panas|closest planet is always the hottest/i,
      );
    }
  });

  it("keeps Venus and Uranus as the two rotation exceptions", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toMatch(/kecuali Zuhrah dan Uranus|except Venus and Uranus/i);
    }
  });

  it("gives Earth its own temperature-relationship explanation (trapped heat vs reflected sunlight)", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toMatch(/atmosfera Bumi memerangkap|Earth's atmosphere traps/i);
      expect(text, lang).toMatch(/awan memantulkan|clouds reflect/i);
    }
  });

  it("keeps rotational-direction data for all eight planets as its own section, with deterministic (non-AI) angle values", () => {
    for (const [lang, content] of LANGS) {
      const section = sectionWith(content, "planetAxialTilt")!;
      const block = blockFrom<{ planets: { tiltDeg: number; direction: string }[] }>(
        section,
        "planetAxialTilt",
      );
      const angles = block.planets.map((p) => p.tiltDeg);
      expect(angles, lang).toEqual([0.1, 117, 23, 25, 3, 27, 98, 30]);
      expect(
        block.planets.find((p) => p.direction === "retrograde"),
        lang,
      ).toBeTruthy();
      expect(
        block.planets.find((p) => p.direction === "sideways"),
        lang,
      ).toBeTruthy();
    }
  });

  it("keeps density/gravity and distance/time/speed as their own separate sections", () => {
    for (const [lang, content] of LANGS) {
      const densityGravity = content.sections.find((s) =>
        s.title.match(/Jadual 12\.4|Table 12\.4/),
      )!;
      const distanceTimeSpeed = content.sections.find((s) =>
        s.title.match(/Jadual 12\.5|Table 12\.5/),
      )!;
      expect(densityGravity.title, lang).not.toBe(distanceTimeSpeed.title);
    }
  });
});

describe("Chapter 12 — SP 12.1.4 hypothetical situations", () => {
  it("covers all four DSKP prompts", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      const prompts =
        lang === "bm"
          ? [
              /berputar perlahan atau berhenti berputar/i,
              /dua bulan atau lebih/i,
              /rupa bentuk Bumi/i,
              /fasa/i,
            ]
          : [
              /rotated slowly or stopped rotating/i,
              /two or more moons/i,
              /what would Earth look like/i,
              /phases/i,
            ];
      for (const p of prompts) expect(text, `${lang} ${p}`).toMatch(p);
    }
  });

  it("keeps the four printed consequences of Earth halting its rotation", () => {
    const bm = allText(scienceF2C12InteractiveBM);
    for (const effect of [/gurun/i, /siang dan malam/i, /pasang surut/i, /dingin/i]) {
      expect(bm, String(effect)).toMatch(effect);
    }
  });

  it("does not fabricate answers the textbook leaves open", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      // the phases question must remain a question to discuss
      expect(text, lang).toMatch(/untuk dibincangkan|to discuss/i);
    }
  });

  it("defines natural satellites in their own section, separate from the hypothetical-rotation section", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toMatch(
        /jasad yang mengelilingi planet dengan orbitnya sendiri|objects that move around planets in their own orbits/i,
      );
      const hypothetical = content.sections.find((s) =>
        s.title.match(/Hypothetical Situation|Situasi Hipotetikal/),
      )!;
      const satellites = content.sections.find((s) =>
        s.title.match(/Natural Satellites|Satelit Semula Jadi/),
      )!;
      expect(hypothetical.title, lang).not.toBe(satellites.title);
    }
  });
});

describe("Chapter 12 — SP 12.1.5 Earth and the ecological footprint", () => {
  const HABITABILITY_BM = [
    "tarikan graviti",
    "kandungan air",
    "kandungan oksigen",
    "cahaya matahari",
    "atmosfera",
    "julat suhu",
  ];

  it("keeps exactly the six characteristics from Rajah 12.7, in the Characteristics of the Earth section", () => {
    for (const [lang, content] of LANGS) {
      // The six are taught on the approved Earth figure now; the old flip-card
      // grid was a second teaching system for the same six and is gone.
      const section = content.sections.find(
        (s) => s.ch12SpotlightFigure?.figure === "earth-characteristics",
      )!;
      expect(section.title, lang).toMatch(/^Characteristics of the Earth$|^Ciri-ciri Bumi$/);
      expect(section.flipCards, lang).toBeUndefined();
      const cards = section.ch12SpotlightFigure!.concepts!;
      expect(cards.length, lang).toBe(6);
      expect(cards.map((c) => c.id).sort(), lang).toEqual([
        "atmosphere",
        "gravity",
        "oxygen",
        "sunlight",
        "temperature",
        "water",
      ]);
    }
    const bm = allText(scienceF2C12InteractiveBM).toLowerCase();
    for (const item of HABITABILITY_BM) expect(bm, item).toContain(item);
  });

  it("never adds a habitable zone or magnetic field", () => {
    // Neither appears anywhere in the authoritative Chapter 12 source.
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).not.toMatch(/zon boleh huni|habitable zone|medan magnet|magnetic field/i);
    }
  });

  it("lists the six ecological-footprint areas from the textbook", () => {
    const expected = {
      bm: [
        "Jejak karbon",
        "Kawasan binaan",
        "Hutan",
        "Kawasan pertanian",
        "Kawasan penternakan",
        "Kawasan perikanan",
      ],
      dlp: [
        "Carbon footprint",
        "Built-up land",
        "Forest",
        "Cropland",
        "Grazing land",
        "Fishing grounds",
      ],
    } as const;
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      for (const area of expected[lang as "bm" | "dlp"]) {
        expect(text, `${lang} ${area}`).toContain(area);
      }
    }
    // and the mind map carries the same six
    for (const [lang, map] of [
      ["bm", scienceF2C12MindMapBM],
      ["dlp", scienceF2C12MindMapDLP],
    ] as const) {
      const text = JSON.stringify(map);
      for (const area of expected[lang]) expect(text, `mindmap ${lang} ${area}`).toContain(area);
    }
  });

  it("keeps the definition and the consequence of exceeding it", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toMatch(/jejak ekologi|ecological footprint/i);
      expect(text, lang).toMatch(/kehabisan sumber|run out of resources/i);
    }
  });

  it("presents Characteristics of the Earth before Ecological Footprint, never after", () => {
    for (const titles of [EXPECTED_TITLES_DLP, EXPECTED_TITLES_BM]) {
      const characteristics = titles.findIndex((t) =>
        /^Characteristics of the Earth$|^Ciri-ciri Bumi$/.test(t),
      );
      const footprint = titles.findIndex((t) => /^Ecological Footprint$|^Jejak Ekologi$/.test(t));
      expect(characteristics).toBeGreaterThanOrEqual(0);
      expect(footprint).toBeGreaterThan(characteristics);
    }
  });

  it("gives Love Our Earth its own visible section, with the DLP heading literally 'Love Our Earth'", () => {
    const dlpSection = scienceF2C12InteractiveDLP.sections.find(
      (s) => s.title === "Love Our Earth",
    );
    expect(dlpSection).toBeTruthy();
    const bmSection = scienceF2C12InteractiveBM.sections.find(
      (s) => s.title === "Cintai Bumi Kita",
    );
    expect(bmSection).toBeTruthy();
  });

  it("has a dedicated Reducing Our Ecological Footprint section, with concrete consumer steps", () => {
    for (const [lang, content] of LANGS) {
      const section = content.sections.find((s) =>
        s.title.match(/Reducing Our Ecological Footprint|Mengurangkan Jejak Ekologi/),
      );
      expect(section, lang).toBeTruthy();
      const cards = blockFrom<{ body: string }[]>(section!, "cards");
      expect(cards.length, lang).toBeGreaterThan(0);
    }
  });
});

describe("Chapter 12 — source-faithful framing", () => {
  it("keeps Planet Nine unconfirmed", () => {
    for (const [lang, content] of LANGS) {
      const body = content.blogHighlight.body;
      expect(body, lang).toMatch(/masih lagi dalam peringkat kajian|still at the research stage/i);
      expect(body, lang).not.toMatch(
        /planet kesembilan telah disahkan|confirmed ninth planet|official ninth planet/i,
      );
    }
  });

  it("keeps Pluto a dwarf planet from 2006", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toMatch(/2006/);
      expect(text, lang).toMatch(/planet kerdil|dwarf planet/i);
    }
  });

  it("does not import unsupported enrichment", () => {
    for (const [lang, content] of LANGS) {
      expect(allText(content), lang).not.toMatch(/terraform/i);
    }
  });
});

describe("Chapter 12 — the calculator is localised", () => {
  it("renders Malay chrome in the BM stream", () => {
    const markup = renderToStaticMarkup(<AuLightYearCalculator defaultKm={150000000} lang="bm" />);
    expect(markup).toContain("Jarak (km)");
    expect(markup).not.toContain("Distance (km)");
  });

  it("renders English chrome in the DLP stream", () => {
    const markup = renderToStaticMarkup(<AuLightYearCalculator defaultKm={150000000} lang="en" />);
    expect(markup).toContain("Distance (km)");
  });

  it("offers all three units so the conversion works both ways", () => {
    const markup = renderToStaticMarkup(<AuLightYearCalculator defaultKm={150000000} lang="bm" />);
    expect(markup).toContain("A.U.");
    expect(markup).toContain("ly");
    expect(markup).toContain("km");
  });

  it("gives its input a touch-friendly height", () => {
    const source = readFileSync("src/components/notes/blocks/AuLightYearCalculator.tsx", "utf8");
    expect(source).toContain("min-h-11");
  });

  it("agrees with its own instruction: the default renders as 1.0 A.U.", () => {
    for (const [lang, content] of LANGS) {
      const section = sectionWith(content, "calculators")!;
      const calcs = blockFrom<{ defaultKm?: number }[]>(section, "calculators");
      expect(calcs[0].defaultKm, lang).toBe(150000000);
      expect(auLightYearFrom(calcs[0].defaultKm!, "km").au).toBeCloseTo(1.0, 6);
    }
  });
});

describe("Chapter 12 — comparison table renders", () => {
  it("shows every planet with Earth marked as the reference", () => {
    for (const [lang, content] of LANGS) {
      const section = table12_2(content);
      const block = blockFrom(section, "planetComparison");
      const markup = renderToStaticMarkup(
        <PlanetComparisonTable block={block as never} lang={lang === "bm" ? "bm" : "en"} />,
      );
      const rows = markup.match(/data-planet="/g) ?? [];
      expect(rows.length, lang).toBe(8);
      expect(markup, lang).toContain('data-earth="true"');
    }
  });
});

describe("Chapter 12 — data QA (task item 27)", () => {
  it("teaches 1 A.U. = 1.5 × 10⁸ km and 1 ly = 9.5 × 10¹² km explicitly", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toMatch(/1 A\.U\. = 1\.5 × 10⁸ km/);
      expect(text, lang).toMatch(/1 ly = 9\.5 × 10¹² km/);
    }
  });

  it("gives Table 12.3 the exact textbook temperature values", () => {
    for (const [lang, content] of LANGS) {
      const section = content.sections.find((s) => s.title.match(/Jadual 12\.3|Table 12\.3/))!;
      const block = blockFrom<{ characteristics: { id: string; values: string[] }[] }>(
        section,
        "planetComparison",
      );
      const temperature = block.characteristics.find((c) => c.id === "temperature")!;
      expect(temperature.values, lang).toEqual([
        "167",
        "457",
        "14",
        "−55",
        "−153",
        "−185",
        "−214",
        "−225",
      ]);
    }
  });

  it("gives Table 12.5 the exact textbook orbital periods", () => {
    for (const [lang, content] of LANGS) {
      const section = content.sections.find((s) => s.title.match(/Jadual 12\.5|Table 12\.5/))!;
      const block = blockFrom<{ characteristics: { id: string; values: string[] }[] }>(
        section,
        "planetComparison",
      );
      const orbit = block.characteristics.find((c) => c.id === "orbit-period")!;
      expect(orbit.values[0], lang).toBe(lang === "bm" ? "88 hari" : "88 days");
      expect(orbit.values[7], lang).toBe(lang === "bm" ? "164.8 tahun" : "164.8 years");
    }
  });

  it("keeps the six textbook characteristics of Earth verbatim in spirit", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content).toLowerCase();
      const probes =
        lang === "bm"
          ? [
              /melayang ke angkasa lepas/,
              /keperluan hidupan/,
              /respirasi/,
              /fotosintesis/,
              /ultraungu/,
              /tidak terlalu panas atau terlalu sejuk/,
            ]
          : [
              /float(ing)?( off)? away|float off into space/,
              /living processes|needs of living things/,
              /respiration/,
              /photosynthesis/,
              /ultraviolet/,
              /neither too hot nor too cold|not too hot and not too cold/,
            ];
      for (const p of probes) expect(text, `${lang} ${p}`).toMatch(p);
    }
  });
});

describe("Chapter 12 — decks", () => {
  it("keeps every quiz answer key valid and both streams in step", () => {
    for (const [name, deck] of DECKS.filter(([n]) => n.startsWith("quizzes"))) {
      for (const item of deck as { id: string; options: string[]; answerIndex: number }[]) {
        expect(item.options.length, `${name} ${item.id}`).toBe(4);
        expect(item.answerIndex, `${name} ${item.id}`).toBeGreaterThanOrEqual(0);
        expect(item.answerIndex, `${name} ${item.id}`).toBeLessThan(item.options.length);
        expect(new Set(item.options).size, `${name} ${item.id}`).toBe(4);
      }
    }
    const bm = scienceF2C12QuizzesBM as { answerIndex: number }[];
    const dlp = scienceF2C12QuizzesDLP as { answerIndex: number }[];
    expect(bm.length).toBe(dlp.length);
    expect(bm.map((q) => q.answerIndex)).toEqual(dlp.map((q) => q.answerIndex));
  });

  it("spreads the correct answer across all four positions", () => {
    const counts = [0, 0, 0, 0];
    for (const q of scienceF2C12QuizzesBM as { answerIndex: number }[]) counts[q.answerIndex]++;
    // no position may be unused, and none may dominate
    for (let i = 0; i < 4; i++) expect(counts[i], `position ${i}`).toBeGreaterThan(0);
    expect(Math.max(...counts)).toBeLessThanOrEqual(
      Math.ceil((scienceF2C12QuizzesBM as unknown[]).length / 2),
    );
  });

  it("assesses every Standard Pembelajaran", () => {
    const text = JSON.stringify(scienceF2C12QuizzesBM);
    // one probe per SP, drawn from the source's own vocabulary
    expect(text, "12.1.1").toMatch(/A\.U\.|tahun cahaya/i);
    expect(text, "12.1.2").toMatch(/satelit semula jadi|diameter|ketumpatan/i);
    expect(text, "12.1.3").toMatch(/rumah hijau|semakin jauh|graviti/i);
    expect(text, "12.1.4").toMatch(/berhenti berputar|menghadap Bumi/i);
    expect(text, "12.1.5").toMatch(/jejak ekologi|sesuai untuk hidupan|hidupan/i);
  });

  it("keeps flashcards in parity and free of the Demos misspelling", () => {
    expect((scienceF2C12FlashcardsBM as unknown[]).length).toBe(
      (scienceF2C12FlashcardsDLP as unknown[]).length,
    );
    for (const [name, deck] of DECKS.filter(([n]) => n.startsWith("flashcards"))) {
      const text = JSON.stringify(deck);
      expect(text, name).not.toMatch(/Phobos (dan|and) Demos/);
      expect(text, name).toMatch(/Deimos/);
    }
  });
});

describe("Chapter 12 — no academic source leakage", () => {
  it("exposes no DSKP, SP, SK or audit vocabulary to learners", () => {
    const surfaces: [string, unknown][] = [
      ["interactive bm", scienceF2C12InteractiveBM],
      ["interactive dlp", scienceF2C12InteractiveDLP],
      ["mindmap bm", scienceF2C12MindMapBM],
      ["mindmap dlp", scienceF2C12MindMapDLP],
      ...DECKS,
    ];
    for (const [name, surface] of surfaces) {
      const text = JSON.stringify(surface);
      expect(text, name).not.toMatch(/DSKP|Standard Pembelajaran|Standard Kandungan|Jadual 9/);
      expect(text, name).not.toMatch(/\bSP 12\.|\bSK 12\./);
      expect(text, name).not.toMatch(/Catatan:|audit|NotebookLM/i);
    }
  });
});

describe("Chapter 12 — SP 12.1.5 ecological footprint areas", () => {
  /**
   * Textbook ms. 263, verbatim: "Jejak Ekologi merupakan ukuran nisbah sumber
   * bagi enam kawasan, iaitu jejak karbon, kawasan binaan, hutan, kawasan
   * pertanian, kawasan penternakan dan kawasan perikanan dalam bentuk tapak
   * kaki manusia."
   *
   * Three cards asked the same question and two answered it with categories
   * that are not in the source ("rawatan sisa karbon dioksida", "pembinaan",
   * "ladang"), so a learner drilling the deck met two different answers.
   *
   * The guard is on the six CONCEPTS, not on one sentence: any wording that
   * carries all six and none of the invented variants passes, so the cards can
   * still be phrased differently from each other.
   */
  const CONCEPTS = {
    bm: {
      carbon: /jejak karbon/i,
      builtUp: /kawasan binaan/i,
      forest: /\bhutan\b/i,
      cropland: /kawasan pertanian/i,
      grazing: /kawasan penternakan/i,
      fishing: /kawasan perikanan/i,
    },
    dlp: {
      carbon: /carbon footprint/i,
      builtUp: /built-up land/i,
      forest: /\bforests?\b/i,
      cropland: /cropland/i,
      grazing: /grazing land/i,
      fishing: /fishing grounds/i,
    },
  } as const;

  // the exact categories the previous defect invented
  const INVENTED = {
    bm: /rawatan sisa karbon dioksida|\bladang\b|\bpembinaan\b/i,
    dlp: /carbon dioxide waste treatment|\bconstruction\b|\bagriculture\b|\bfarming\b|\bfishing\b(?! grounds)/i,
  } as const;

  const TOPIC = /jejak ekologi|ecological footprint/i;

  type Card = { id: string; front: string; back: string };
  const DECK = {
    bm: scienceF2C12FlashcardsBM as unknown as Card[],
    dlp: scienceF2C12FlashcardsDLP as unknown as Card[],
  };

  // Which cards owe all six? The ones that ASK for all six. Counting areas in
  // the answer cannot tell "listed 2 because 2 were asked for" apart from
  // "listed 2 because 4 are wrong" — the question is what settles it. Cards
  // that ask about a subset (f52 asks for the two food-production areas the
  // textbook lists separately) are still covered by the invented-terminology
  // guard below, which applies to every card on this topic.
  const ASKS_FOR_ALL_SIX = /enam kawasan|berapa kawasan|six areas|how many areas/i;
  const enumerating = (lang: "bm" | "dlp") =>
    DECK[lang].filter((c) => TOPIC.test(`${c.front} ${c.back}`) && ASKS_FOR_ALL_SIX.test(c.front));

  for (const lang of ["bm", "dlp"] as const) {
    it(`gives every ${lang.toUpperCase()} ecological-footprint card the same six source areas`, () => {
      const cards = enumerating(lang);
      // the deck must actually still teach this, or the guard is vacuous
      expect(cards.length, `${lang} cards asking for all six`).toBeGreaterThanOrEqual(2);
      for (const card of cards) {
        const missing = Object.entries(CONCEPTS[lang])
          .filter(([, rx]) => !rx.test(card.back))
          .map(([name]) => name);
        expect(
          missing,
          `${card.id} is missing areas: ${missing.join(", ")} — ${card.back}`,
        ).toEqual([]);
      }
    });

    it(`keeps invented ecological-footprint categories out of the ${lang.toUpperCase()} deck`, () => {
      for (const card of DECK[lang]) {
        if (!TOPIC.test(`${card.front} ${card.back}`)) continue;
        const found = card.back.match(INVENTED[lang]);
        expect(
          found,
          `${card.id} uses a category that is not in the textbook: ${found?.[0]} — ${card.back}`,
        ).toBeNull();
      }
    });
  }

  it("teaches the same six areas in the notes and the mind map as in the decks", () => {
    // the decks must not drift away from the surfaces the gate already passed
    for (const [lang, surfaces] of [
      ["bm", [scienceF2C12InteractiveBM, scienceF2C12MindMapBM]],
      ["dlp", [scienceF2C12InteractiveDLP, scienceF2C12MindMapDLP]],
    ] as const) {
      const text = surfaces.map((s) => JSON.stringify(s)).join(" ");
      for (const [name, rx] of Object.entries(CONCEPTS[lang])) {
        expect(rx.test(text), `${lang} notes/mind map missing ${name}`).toBe(true);
      }
    }
  });

  it("keeps BM and DLP semantically equivalent, area for area", () => {
    const bm = enumerating("bm").map((c) => c.id.replace("-bm-", "-"));
    const dlp = enumerating("dlp").map((c) => c.id.replace("-dlp-", "-"));
    expect(bm.sort()).toEqual(dlp.sort());
  });

  it("answers subset questions from the same six areas, never from outside them", () => {
    for (const lang of ["bm", "dlp"] as const) {
      const subsetCards = DECK[lang].filter(
        (c) => TOPIC.test(`${c.front} ${c.back}`) && !ASKS_FOR_ALL_SIX.test(c.front),
      );
      for (const card of subsetCards) {
        const named = Object.values(CONCEPTS[lang]).filter((rx) => rx.test(card.back)).length;
        // a subset card either names areas — and then only real ones — or
        // discusses the concept without listing areas at all
        if (named === 0) continue;
        expect(INVENTED[lang].test(card.back), `${card.id}: ${card.back}`).toBe(false);
      }
    }
  });

  it("gives f52 and f61 different questions and different answers", () => {
    // they were three variants of one question; correcting two of them made
    // the redundancy exact, so f52 was repurposed
    for (const lang of ["bm", "dlp"] as const) {
      const f52 = DECK[lang].find((c) => c.id.endsWith("-f52"))!;
      const f61 = DECK[lang].find((c) => c.id.endsWith("-f61"))!;
      expect(f52.front, lang).not.toBe(f61.front);
      expect(f52.back, lang).not.toBe(f61.back);
    }
  });

  it("has no two cards sharing an answer in either deck", () => {
    for (const lang of ["bm", "dlp"] as const) {
      const seen = new Map<string, string>();
      const dupes: string[] = [];
      for (const card of DECK[lang]) {
        const prev = seen.get(card.back);
        if (prev) dupes.push(`${prev} = ${card.id}: ${card.back.slice(0, 80)}`);
        else seen.set(card.back, card.id);
      }
      expect(dupes, `${lang} duplicate answers`).toEqual([]);
    }
  });
});

describe("Chapter 12 — approved images", () => {
  const PUBLIC_ROOT = resolve(process.cwd(), "public");
  const TITLE = {
    opening:
      /^Comparison of Planet Distances in the Solar System from the Sun$|^Perbandingan Jarak Planet dalam Sistem Suria dari Matahari$/,
    planets: /^Planets in the Solar System$|^Planet dalam Sistem Suria$/,
    table12_2: /Table 12\.2|Jadual 12\.2/,
    earthForLife: /^The Earth as a Planet for Living Things$|^Bumi sebagai Planet untuk Hidupan$/,
    characteristics: /^Characteristics of the Earth$|^Ciri-ciri Bumi$/,
    loveEarth: /^Love Our Earth$|^Cintai Bumi Kita$/,
  };
  const uiLang = (lang: string) => (lang === "bm" ? "bm" : "en");
  const titleIndex = (content: ScienceF2InteractiveContent, rx: RegExp) =>
    content.sections.findIndex((s) => rx.test(s.title));
  const figureIndex = (content: ScienceF2InteractiveContent, figure: string) =>
    content.sections.findIndex((s) => s.ch12SpotlightFigure?.figure === figure);
  const figureAt = (content: ScienceF2InteractiveContent, figure: string) =>
    content.sections[figureIndex(content, figure)].ch12SpotlightFigure!;
  const sectionMarkup = (content: ScienceF2InteractiveContent, lang: string, index: number) =>
    renderToStaticMarkup(
      createElement(ScienceF2InteractiveNotesBlock, {
        content: { ...content, sections: [content.sections[index]] },
        lang: uiLang(lang),
      }),
    );
  const hotspotIds = (markup: string) =>
    [...markup.matchAll(/data-hotspot="([^"]+)"/g)].map((match) => match[1]);
  const pressedCount = (markup: string) => (markup.match(/aria-pressed="/g) ?? []).length;
  const centre = (shapes: Parameters<typeof spotlightBounds>[0]) => {
    const b = spotlightBounds(shapes);
    return { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 };
  };

  /** Width and height straight from the WebP header — lossy, lossless or extended. */
  function webpSize(buf: Buffer) {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") {
      return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
    }
    throw new Error(`unrecognised WebP chunk ${chunk}`);
  }

  it("ships three full-size WebPs in the Chapter 12 folder, with no PNG beside them", () => {
    expect(Object.values(SCIENCE_F2_CH12_IMAGES)).toEqual([
      "/science/form2/chapter-12/science-f2-ch12-solar-system-overview.webp",
      "/science/form2/chapter-12/science-f2-ch12-eight-planets-sheet.webp",
      "/science/form2/chapter-12/science-f2-ch12-earth-characteristics.webp",
    ]);
    for (const src of Object.values(SCIENCE_F2_CH12_IMAGES)) {
      const file = resolve(PUBLIC_ROOT, src.slice(1));
      expect(existsSync(file), src).toBe(true);
      expect(statSync(file).size, src).toBeGreaterThan(20_000);
      const bytes = readFileSync(file);
      expect(bytes.toString("ascii", 0, 4), src).toBe("RIFF");
      expect(bytes.toString("ascii", 8, 12), src).toBe("WEBP");
      // the source resolution, uncropped and not upscaled
      expect(webpSize(bytes), src).toEqual({ width: CH12_ART_WIDTH, height: CH12_ART_HEIGHT });
      expect(existsSync(file.replace(/\.webp$/, ".png")), `${src} png duplicate`).toBe(false);
    }
    for (const geometry of Object.values(CH12_FIGURE_GEOMETRY)) {
      expect(geometry.aspect).toBe(`${CH12_ART_WIDTH} / ${CH12_ART_HEIGHT}`);
    }
  });

  it("uses each image exactly once per language, in the same section in BM and DLP", () => {
    const placed = (content: ScienceF2InteractiveContent) =>
      content.sections.flatMap((section, index) =>
        section.ch12SpotlightFigure ? [`${section.ch12SpotlightFigure.src}@${index}`] : [],
      );
    const bm = placed(scienceF2C12InteractiveBM);
    expect(bm).toEqual(placed(scienceF2C12InteractiveDLP));
    expect(bm.map((entry) => entry.split("@")[0]).sort()).toEqual(
      Object.values(SCIENCE_F2_CH12_IMAGES).sort(),
    );
  });

  it("opens the chapter with the solar system overview, ahead of the first distance table", () => {
    for (const [lang, content] of LANGS) {
      expect(figureIndex(content, "solar-system"), lang).toBe(0);
      expect(titleIndex(content, TITLE.opening), lang).toBe(0);
      const markup = sectionMarkup(content, lang, 0);
      const figure = markup.indexOf('data-ch12-figure="solar-system"');
      expect(figure, lang).toBeGreaterThan(-1);
      expect(figure, lang).toBeLessThan(markup.indexOf('data-planet="'));
    }
  });

  it("leads Planets in the Solar System with the planet sheet, before the profile cards and Table 12.2", () => {
    for (const [lang, content] of LANGS) {
      const index = figureIndex(content, "eight-planets");
      expect(index, lang).toBe(titleIndex(content, TITLE.planets));
      expect(index, lang).toBeLessThan(titleIndex(content, TITLE.table12_2));
      // the sheet is a selector, not a replacement: the cards and Table 12.2 stay
      expect(content.sections[index].planets?.planets.length, lang).toBe(8);
      expect(
        table12_2(content).planetComparison?.characteristics.length,
        lang,
      ).toBeGreaterThanOrEqual(12);
      const markup = sectionMarkup(content, lang, index);
      const figure = markup.indexOf('data-ch12-figure="eight-planets"');
      expect(figure, lang).toBeGreaterThan(-1);
      expect(figure, lang).toBeLessThan(markup.indexOf("data-planet-card="));
      // each profile card rendered once — the sheet does not duplicate them
      expect((markup.match(/data-planet-card="/g) ?? []).length, lang).toBe(8);
    }
  });

  it("puts the Earth figure only in Characteristics of the Earth — after Earth for Living Things, before Love Our Earth", () => {
    for (const [lang, content] of LANGS) {
      const index = figureIndex(content, "earth-characteristics");
      expect(index, lang).toBe(titleIndex(content, TITLE.characteristics));
      expect(index, lang).toBeGreaterThan(titleIndex(content, TITLE.earthForLife));
      expect(index, lang).toBeLessThan(titleIndex(content, TITLE.loveEarth));
      const markup = sectionMarkup(content, lang, index);
      expect(markup, lang).toContain('data-ch12-figure="earth-characteristics"');
    }
  });

  it("offers the planets in order from the Sun, on the picture and in the controls", () => {
    for (const [lang, content] of LANGS) {
      const overview = figureAt(content, "solar-system");
      expect(
        overview.concepts!.map((c) => c.id),
        lang,
      ).toEqual([...CH12_FIGURE_ORDER["solar-system"]]);
      const overviewMarkup = renderToStaticMarkup(
        createElement(Chapter12SpotlightFigure, { block: overview, lang: uiLang(lang) }),
      );
      expect(hotspotIds(overviewMarkup), lang).toEqual([...CH12_FIGURE_ORDER["solar-system"]]);
      expect(pressedCount(overviewMarkup), lang).toBe(9 * 2);

      const index = figureIndex(content, "eight-planets");
      const planets = content.sections[index].planets!;
      expect(
        planets.planets.map((p) => p.id),
        lang,
      ).toEqual([...CH12_FIGURE_ORDER["eight-planets"]]);
      const sheetMarkup = renderToStaticMarkup(
        createElement(Chapter12PlanetExplorer, {
          figure: content.sections[index].ch12SpotlightFigure!,
          planets,
          lang: uiLang(lang),
        }),
      );
      expect(hotspotIds(sheetMarkup), lang).toEqual([...CH12_FIGURE_ORDER["eight-planets"]]);
      // eight hotspots and eight controls; the profile cards use aria-expanded
      expect(pressedCount(sheetMarkup), lang).toBe(8 * 2);
      for (const planet of planets.planets) expect(sheetMarkup, lang).toContain(planet.name);
    }
  });

  it("renders exactly six characteristic controls and six matching hotspots", () => {
    for (const [lang, content] of LANGS) {
      const block = figureAt(content, "earth-characteristics");
      const markup = renderToStaticMarkup(
        createElement(Chapter12SpotlightFigure, { block, lang: uiLang(lang) }),
      );
      expect(hotspotIds(markup), lang).toEqual([...CH12_FIGURE_ORDER["earth-characteristics"]]);
      expect(pressedCount(markup), lang).toBe(6 * 2);
      for (const concept of block.concepts!) expect(markup, lang).toContain(concept.label);
    }
  });

  it("uses the requested chip wording: the DLP short names, the BM textbook terms", () => {
    const labels = (content: ScienceF2InteractiveContent) =>
      figureAt(content, "earth-characteristics").concepts!.map((c) => c.label);
    expect(labels(scienceF2C12InteractiveDLP)).toEqual([
      "Gravity",
      "Water",
      "Oxygen",
      "Sunlight",
      "Protective Atmosphere",
      "Suitable Temperature",
    ]);
    expect(labels(scienceF2C12InteractiveBM)).toEqual([
      "Tarikan graviti",
      "Kandungan air",
      "Kandungan oksigen",
      "Cahaya matahari",
      "Atmosfera pelindung",
      "Julat suhu yang sesuai",
    ]);
  });

  it("maps each Earth characteristic to its own circle on the artwork", () => {
    const { regions, hitAreas } = CH12_FIGURE_GEOMETRY["earth-characteristics"];
    const at = (id: string) => centre(regions[id]);
    const left = (id: string) => at(id).x < 50;
    const row = (id: string) => (at(id).y < 33 ? "top" : at(id).y < 66 ? "middle" : "bottom");
    expect([left("gravity"), row("gravity")]).toEqual([true, "top"]);
    expect([left("water"), row("water")]).toEqual([false, "top"]);
    expect([left("atmosphere"), row("atmosphere")]).toEqual([true, "middle"]);
    expect([left("oxygen"), row("oxygen")]).toEqual([false, "middle"]);
    expect([left("sunlight"), row("sunlight")]).toEqual([true, "bottom"]);
    expect([left("temperature"), row("temperature")]).toEqual([false, "bottom"]);
    // each hit area is centred on the circle it selects
    for (const id of CH12_FIGURE_ORDER["earth-characteristics"]) {
      expect(Math.abs(hitAreas[id].x - at(id).x), id).toBeLessThan(1);
      expect(Math.abs(hitAreas[id].y - at(id).y), id).toBeLessThan(1);
    }
  });

  it("lays the overview out as one row from the Sun and the sheet as two rows of four", () => {
    const overview = CH12_FIGURE_GEOMETRY["solar-system"].regions;
    const xs = CH12_FIGURE_ORDER["solar-system"].map((id) => centre(overview[id]).x);
    expect([...xs].sort((a, b) => a - b)).toEqual(xs);

    const sheet = CH12_FIGURE_GEOMETRY["eight-planets"].regions;
    const [top, bottom] = [
      CH12_FIGURE_ORDER["eight-planets"].slice(0, 4),
      CH12_FIGURE_ORDER["eight-planets"].slice(4),
    ];
    expect(top).toEqual(["mercury", "venus", "earth", "mars"]);
    expect(bottom).toEqual(["jupiter", "saturn", "uranus", "neptune"]);
    for (const [rowIds, isTop] of [
      [top, true],
      [bottom, false],
    ] as const) {
      const points = rowIds.map((id) => centre(sheet[id]));
      for (const point of points) expect(point.y < 50).toBe(isTop);
      const rowXs = points.map((point) => point.x);
      expect([...rowXs].sort((a, b) => a - b)).toEqual(rowXs);
    }
  });

  it("keeps every region and hit area inside the artwork, in the taught order", () => {
    for (const [id, geometry] of Object.entries(CH12_FIGURE_GEOMETRY)) {
      const order = [...CH12_FIGURE_ORDER[id as keyof typeof CH12_FIGURE_ORDER]];
      expect(Object.keys(geometry.regions), id).toEqual(order);
      expect(Object.keys(geometry.hitAreas), id).toEqual(order);
      for (const [region, shapes] of Object.entries(geometry.regions)) {
        expect(shapes.length, `${id} ${region}`).toBeGreaterThan(0);
        const b = spotlightBounds(shapes);
        for (const v of [b.minX, b.minY, b.maxX, b.maxY]) {
          expect(v, `${id} ${region}`).toBeGreaterThanOrEqual(0);
          expect(v, `${id} ${region}`).toBeLessThanOrEqual(100);
        }
      }
      for (const [region, area] of Object.entries(geometry.hitAreas)) {
        expect(area.x - area.w / 2, `${id} ${region}`).toBeGreaterThanOrEqual(0);
        expect(area.y - area.h / 2, `${id} ${region}`).toBeGreaterThanOrEqual(0);
        expect(area.x + area.w / 2, `${id} ${region}`).toBeLessThanOrEqual(100);
        expect(area.y + area.h / 2, `${id} ${region}`).toBeLessThanOrEqual(100);
      }
    }
  });

  it("never lets one hotspot swallow a tap aimed at another", () => {
    // AnnotatedImage stacks smaller hit areas above larger ones, so a smaller
    // (or equal) neighbour that reaches over a hotspot's centre takes the tap.
    // That is exactly how the asteroid belt once selected Mars.
    const covers = (a: { x: number; y: number; w: number; h: number }, x: number, y: number) =>
      Math.abs(x - a.x) < a.w / 2 && Math.abs(y - a.y) < a.h / 2;
    for (const [id, geometry] of Object.entries(CH12_FIGURE_GEOMETRY)) {
      const areas = Object.entries(geometry.hitAreas);
      for (const [name, area] of areas) {
        const own = spotlightBounds(geometry.regions[name]);
        expect(area.x, `${id} ${name} hit centre x`).toBeGreaterThanOrEqual(own.minX);
        expect(area.x, `${id} ${name} hit centre x`).toBeLessThanOrEqual(own.maxX);
        expect(area.y, `${id} ${name} hit centre y`).toBeGreaterThanOrEqual(own.minY);
        expect(area.y, `${id} ${name} hit centre y`).toBeLessThanOrEqual(own.maxY);
        for (const [other, otherArea] of areas) {
          if (other === name || otherArea.w * otherArea.h > area.w * area.h) continue;
          expect(covers(otherArea, area.x, area.y), `${id}: ${other} covers ${name}`).toBe(false);
        }
      }
    }
  });

  it("adds 'not to scale' as UI text, never in the artwork, in each language", () => {
    for (const [lang, content] of LANGS) {
      const expected = lang === "bm" ? "Tidak mengikut skala" : "Not to scale";
      for (const figure of ["solar-system", "eight-planets"]) {
        const index = figureIndex(content, figure);
        expect(content.sections[index].ch12SpotlightFigure!.scaleNote, `${lang} ${figure}`).toBe(
          expected,
        );
        expect(sectionMarkup(content, lang, index), `${lang} ${figure}`).toMatch(
          new RegExp(`<figcaption[^>]*>${expected}</figcaption>`),
        );
      }
    }
  });

  it("writes alt text and hotspot names in the learner's language", () => {
    for (const figure of ["solar-system", "eight-planets", "earth-characteristics"]) {
      const bm = figureAt(scienceF2C12InteractiveBM, figure);
      const dlp = figureAt(scienceF2C12InteractiveDLP, figure);
      expect(bm.alt, figure).not.toBe(dlp.alt);
      expect(bm.alt.length, figure).toBeGreaterThan(40);
      expect(dlp.alt.length, figure).toBeGreaterThan(40);
    }
    expect(figureAt(scienceF2C12InteractiveBM, "solar-system").alt).toMatch(/Utarid/);
    expect(figureAt(scienceF2C12InteractiveDLP, "solar-system").alt).toMatch(/Mercury/);
    const bmMarkup = renderToStaticMarkup(
      createElement(Chapter12SpotlightFigure, {
        block: figureAt(scienceF2C12InteractiveBM, "solar-system"),
        lang: "bm",
      }),
    );
    expect(bmMarkup).toContain('aria-label="Utarid"');
    expect(bmMarkup).not.toContain('aria-label="Mercury"');
  });

  it("keeps the BM and DLP figures structurally identical — same images, regions and order", () => {
    const shape = (content: ScienceF2InteractiveContent) =>
      content.sections.flatMap((section, index) => {
        const block = section.ch12SpotlightFigure;
        if (!block) return [];
        return [
          {
            index,
            figure: block.figure,
            src: block.src,
            keys: Object.keys(block).sort(),
            concepts: block.concepts?.map((c) => c.id),
          },
        ];
      });
    expect(shape(scienceF2C12InteractiveBM)).toEqual(shape(scienceF2C12InteractiveDLP));
  });

  it("says the atmosphere blocks harmful ultraviolet radiation — not that it reflects all sunlight", () => {
    const note = (content: ScienceF2InteractiveContent) =>
      figureAt(content, "earth-characteristics").concepts!.find((c) => c.id === "atmosphere")!.note;
    expect(note(scienceF2C12InteractiveDLP)).toMatch(/harmful ultraviolet/);
    expect(note(scienceF2C12InteractiveDLP)).toMatch(/does not reflect all sunlight/);
    expect(note(scienceF2C12InteractiveBM)).toMatch(/ultraungu yang berbahaya/);
    expect(note(scienceF2C12InteractiveBM)).toMatch(/tidak memantulkan semua cahaya matahari/);
  });

  it("teaches gravity as a pull towards Earth, and the asteroid belt as separate rocks between Mars and Jupiter", () => {
    const concept = (content: ScienceF2InteractiveContent, figure: string, id: string) =>
      figureAt(content, figure).concepts!.find((c) => c.id === id)!.note;
    expect(concept(scienceF2C12InteractiveDLP, "earth-characteristics", "gravity")).toMatch(
      /floating away.*towards Earth/,
    );
    expect(concept(scienceF2C12InteractiveBM, "earth-characteristics", "gravity")).toMatch(
      /ke arah Bumi.*melayang/,
    );
    expect(concept(scienceF2C12InteractiveDLP, "solar-system", "asteroid-belt")).toMatch(
      /between Mars and Jupiter.*separate rocky objects/,
    );
    expect(concept(scienceF2C12InteractiveBM, "solar-system", "asteroid-belt")).toMatch(
      /di antara Marikh dan Musytari.*objek berbatu yang berasingan/,
    );
  });
});
