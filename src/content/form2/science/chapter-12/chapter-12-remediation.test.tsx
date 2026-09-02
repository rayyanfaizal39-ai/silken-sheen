import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { AuLightYearCalculator, auLightYearFrom } from "@/components/notes/blocks/AuLightYearCalculator";
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
 * Regression guards for the Chapter 12 remediation — see
 * SCIENCE_F2_CH12_REMEDIATION_REPORT.md.
 *
 * The chapter's blocker was a relationship taught backwards: Saturn was
 * described as having weaker gravity than Earth on a card that displayed
 * 10.44 m s^-2 beside Earth's 9.8. Its structural problem was two sections
 * covering five Standard Pembelajaran, under a section number ("12.2") that
 * does not exist in the DSKP.
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

function allText(content: ScienceF2InteractiveContent) {
  return JSON.stringify(content);
}

function sectionWith(content: ScienceF2InteractiveContent, key: string) {
  return content.sections.find((s) => (s as unknown as Record<string, unknown>)[key]);
}

function blockFrom<T>(section: ScienceInteractiveSection, key: string) {
  return (section as unknown as Record<string, T>)[key];
}

describe("Chapter 12 — structure follows the DSKP", () => {
  it("has one Standard Kandungan, so every section is numbered 12.1", () => {
    for (const [lang, content] of LANGS) {
      const numbers = content.sections.map((s) => s.number);
      expect(numbers, lang).toEqual(["12.1", "12.1", "12.1", "12.1", "12.1"]);
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

  it("gives each of the five Standard Pembelajaran its own teaching area", () => {
    for (const [lang, content] of LANGS) {
      expect(content.sections.length, lang).toBe(5);
      // one reflection statement per SP, matching the source's Refleksi Kendiri
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
});

describe("Chapter 12 — SP 12.1.2 comparison with Earth", () => {
  const REQUIRED_BM = [
    "Saiz",
    "Jarak",
    "Suhu",
    "Ketumpatan",
    "Tarikan graviti",
    "Lapisan atmosfera",
    "Keadaan permukaan",
    "Arah dan kelajuan putaran",
    "Peredaran pada orbit",
    "Satelit semula jadi",
  ];
  const REQUIRED_DLP = [
    "Size",
    "Distance",
    "Temperature",
    "Density",
    "Gravitational attraction",
    "Atmosphere",
    "Surface condition",
    "Direction and rate of rotation",
    "Revolution in orbit",
    "Natural satellites",
  ];

  it("covers all ten DSKP comparison characteristics", () => {
    for (const [lang, content, required] of [
      ["bm", scienceF2C12InteractiveBM, REQUIRED_BM],
      ["dlp", scienceF2C12InteractiveDLP, REQUIRED_DLP],
    ] as const) {
      const section = content.sections.find(
        (s) => (s as unknown as Record<string, unknown>).planetComparison && s.title.match(/Membandingkan|Comparing/),
      )!;
      const block = blockFrom<{ characteristics: { label: string }[] }>(section, "planetComparison");
      const labels = block.characteristics.map((c) => c.label);
      for (const req of required) expect(labels, `${lang} ${req}`).toContain(req);
      expect(labels.length, lang).toBeGreaterThanOrEqual(10);
    }
  });

  it("compares every planet against Earth, in order from the Sun", () => {
    for (const [lang, content] of LANGS) {
      const section = content.sections.find(
        (s) => (s as unknown as Record<string, unknown>).planetComparison && s.title.match(/Membandingkan|Comparing/),
      )!;
      const block = blockFrom<{ planets: string[]; earth: string; characteristics: { values: string[] }[] }>(
        section,
        "planetComparison",
      );
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
    for (const v of ["4 879", "12 756", "142 984", "9.8", "10.44", "24.79", "5.5", "0.7", "164.8"]) {
      expect(bm, v).toContain(v);
    }
  });

  it("says the planet spheres are not to scale", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toMatch(/tidak mengikut skala|not to true scale|not to scale/i);
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
      for (const item of deck as { id: string; front?: string; back?: string; question?: string; options?: string[]; explanation?: string }[]) {
        const answer = `${item.back ?? ""} ${item.explanation ?? ""}`;
        const unit = `${item.front ?? ""} ${item.question ?? ""} ${(item.options ?? []).join(" ")} ${answer}`;
        if (FALSE_FOR.test(unit) && !TRUE_FOR.test(unit) && LOWER_THAN_EARTH.test(unit) && EARTH.test(unit)) {
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
    const section = scienceF2C12InteractiveBM.sections.find(
      (s) => (s as unknown as Record<string, unknown>).planetComparison && s.title.match(/Membandingkan/),
    )!;
    const block = blockFrom<{ planets: string[]; characteristics: { id: string; values: string[] }[] }>(
      section,
      "planetComparison",
    );
    const gravity = block.characteristics.find((c) => c.id === "gravity")!;
    const value = (planet: string) =>
      parseFloat(gravity.values[block.planets.indexOf(planet)]);

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
      expect(text, lang).toMatch(/bergantung pada jisim dan ketumpatan|depends on the planet's mass and its density/i);
    }
  });

  it("teaches the Venus anomaly rather than 'closest is hottest'", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toMatch(/462|paling panas|hottest/i);
      // the misconception must not be stated as a rule
      expect(text, lang).not.toMatch(/planet terdekat sentiasa paling panas|closest planet is always the hottest/i);
    }
  });

  it("keeps Venus and Uranus as the two rotation exceptions", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      expect(text, lang).toMatch(/kecuali Zuhrah dan Uranus|except Venus and Uranus/i);
    }
  });
});

describe("Chapter 12 — SP 12.1.4 hypothetical situations", () => {
  it("covers all four DSKP prompts", () => {
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      const prompts =
        lang === "bm"
          ? [/berputar perlahan atau berhenti berputar/i, /dua bulan atau lebih/i, /rupa bentuk Bumi/i, /fasa/i]
          : [/rotated slowly or stopped rotating/i, /two or more moons/i, /what would Earth look like/i, /phases/i];
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

  it("keeps exactly the six characteristics from Rajah 12.7", () => {
    for (const [lang, content] of LANGS) {
      const section = sectionWith(content, "flipCards")!;
      const cards = blockFrom<{ id: string }[]>(section, "flipCards");
      expect(cards.length, lang).toBe(6);
      expect(cards.map((c) => c.id).sort(), lang).toEqual(
        ["atmosphere", "gravity", "oxygen", "sunlight", "temperature", "water"],
      );
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
      bm: ["Jejak karbon", "Kawasan binaan", "Hutan", "Kawasan pertanian", "Kawasan penternakan", "Kawasan perikanan"],
      dlp: ["Carbon footprint", "Built-up land", "Forest", "Cropland", "Grazing land", "Fishing grounds"],
    } as const;
    for (const [lang, content] of LANGS) {
      const text = allText(content);
      for (const area of expected[lang as "bm" | "dlp"]) {
        expect(text, `${lang} ${area}`).toContain(area);
      }
    }
    // and the mind map carries the same six
    for (const [lang, map] of [["bm", scienceF2C12MindMapBM], ["dlp", scienceF2C12MindMapDLP]] as const) {
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
});

describe("Chapter 12 — source-faithful framing", () => {
  it("keeps Planet Nine unconfirmed", () => {
    for (const [lang, content] of LANGS) {
      const body = content.blogHighlight.body;
      expect(body, lang).toMatch(/masih lagi dalam peringkat kajian|still at the research stage/i);
      expect(body, lang).not.toMatch(/planet kesembilan telah disahkan|confirmed ninth planet|official ninth planet/i);
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
      const section = content.sections.find(
        (s) => (s as unknown as Record<string, unknown>).planetComparison && s.title.match(/Membandingkan|Comparing/),
      )!;
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
    expect(Math.max(...counts)).toBeLessThanOrEqual(Math.ceil((scienceF2C12QuizzesBM as unknown[]).length / 2));
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
    expect((scienceF2C12FlashcardsBM as unknown[]).length).toBe((scienceF2C12FlashcardsDLP as unknown[]).length);
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
  const DECK = { bm: scienceF2C12FlashcardsBM as unknown as Card[], dlp: scienceF2C12FlashcardsDLP as unknown as Card[] };

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
        expect(missing, `${card.id} is missing areas: ${missing.join(", ")} — ${card.back}`).toEqual([]);
      }
    });

    it(`keeps invented ecological-footprint categories out of the ${lang.toUpperCase()} deck`, () => {
      for (const card of DECK[lang]) {
        if (!TOPIC.test(`${card.front} ${card.back}`)) continue;
        const found = card.back.match(INVENTED[lang]);
        expect(found, `${card.id} uses a category that is not in the textbook: ${found?.[0]} — ${card.back}`).toBeNull();
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
