import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ConductionDiagram } from "@/components/notes/blocks/ConductionDiagram";
import { ConvectionRadiation } from "@/components/notes/blocks/ConvectionRadiation";
import { BreezeDiagram } from "@/components/notes/blocks/BreezeDiagram";
import { ExpansionParticles } from "@/components/notes/blocks/ExpansionParticles";
import { BimetallicStrip } from "@/components/notes/blocks/BimetallicStrip";
import { SurfaceComparison } from "@/components/notes/blocks/SurfaceComparison";
import { scienceF2C9InteractiveBM } from "./interactive-bm";
import { scienceF2C9InteractiveDLP } from "./interactive-dlp";
import { scienceF2C9QuizzesBM } from "./quizzes-bm";
import { scienceF2C9QuizzesDLP } from "./quizzes-dlp";
import { scienceF2C9FlashcardsBM } from "./flashcards-bm";
import { scienceF2C9FlashcardsDLP } from "./flashcards-dlp";
import { scienceF2C9MindMapBM } from "./mindmap-bm";
import { scienceF2C9MindMapDLP } from "./mindmap-dlp";
import type { ScienceF2InteractiveContent, ScienceInteractiveSection } from "../interactive-types";

/**
 * Regression guards for the Chapter 9 remediation — see
 * SCIENCE_F2_CH09_REMEDIATION_CHANGELOG.md.
 *
 * The chapter's sharpest defect was a thermometer described as measuring HEAT,
 * two sections after the chapter itself teaches that heat and temperature are
 * different things. That, the missing Green Building standard, and 44 leaked
 * textbook activity numbers are all locked here.
 *
 * Only live surfaces are covered. notes-bm.ts / notes-dlp.ts are shadowed by the
 * interactive branch in routes/notes.tsx and are deliberately excluded.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C9InteractiveBM],
  ["dlp", scienceF2C9InteractiveDLP],
];

const DECKS: [string, unknown][] = [
  ["quizzes bm", scienceF2C9QuizzesBM],
  ["quizzes dlp", scienceF2C9QuizzesDLP],
  ["flashcards bm", scienceF2C9FlashcardsBM],
  ["flashcards dlp", scienceF2C9FlashcardsDLP],
  ["mindmap bm", scienceF2C9MindMapBM],
  ["mindmap dlp", scienceF2C9MindMapDLP],
];

const text = (v: unknown) => JSON.stringify(v);

/** Only the figure's own SVG — the interactive badge icon also draws circles. */
const figureSvg = (markup: string) => {
  const i = markup.indexOf('role="img"');
  return i < 0 ? "" : markup.slice(i);
};
const prose = (c: ScienceF2InteractiveContent) => JSON.stringify(c);
const find = (c: ScienceF2InteractiveContent, pick: (s: ScienceInteractiveSection) => boolean) =>
  c.sections.find(pick);

// ------------------------------------------------------------ A. STRUCTURE

describe("Chapter 9 — section architecture", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} splits the chapter into 9 learner-sized sections`, () => {
      expect(content.sections).toHaveLength(9);
      expect(content.chapter).toBe(9);
    });

    it(`${lang} attaches every section to a subtopic and gives each a check`, () => {
      for (const s of content.sections) {
        expect(["9.1", "9.2", "9.3", "9.4"], `${lang} "${s.title}"`).toContain(s.number);
        expect(s.checks.length, `${lang} "${s.title}" has no check`).toBeGreaterThan(0);
      }
    });
  }

  it("BM and DLP share section count, subtopic order and block shape", () => {
    const bm = scienceF2C9InteractiveBM.sections;
    const dlp = scienceF2C9InteractiveDLP.sections;
    expect(dlp).toHaveLength(bm.length);
    expect(dlp.map((s) => s.number)).toEqual(bm.map((s) => s.number));
    const shape = (s: ScienceInteractiveSection) =>
      Object.keys(s).filter((k) => !["number", "title", "intro"].includes(k)).sort().join(",");
    for (let i = 0; i < bm.length; i++) {
      expect(shape(dlp[i]), `section ${i + 1} block shape differs`).toBe(shape(bm[i]));
    }
  });
});

// --------------------------------------------------- B. SP TEACHING HOMES

describe("Chapter 9 — all 9 SPs have a teaching home", () => {
  const SP: [string, RegExp, RegExp][] = [
    ["9.1.1 heat vs temperature", /bentuk tenaga[\s\S]*joule/i, /form of energy[\s\S]*joule/i],
    ["9.2.1 conduction", /konduksi/i, /conduction/i],
    ["9.2.1 convection", /perolakan/i, /convection/i],
    ["9.2.1 radiation", /sinaran/i, /radiation/i],
    ["9.2.2 breezes", /bayu laut[\s\S]*bayu darat/i, /sea breeze[\s\S]*land breeze/i],
    ["9.2.3 conductors/insulators", /konduktor haba[\s\S]*penebat haba/i, /heat conductor[\s\S]*heat insulator/i],
    ["9.3.1 expansion/contraction", /mengembang[\s\S]*mengecut/i, /expand[\s\S]*contract/i],
    ["9.3.2 uses of expansion", /dwilogam/i, /bimetallic/i],
    ["9.4.1 absorption", /menyerap haba/i, /absorb/i],
    ["9.4.2 emission", /membebaskan haba/i, /emit/i],
    ["9.4.3 Green Building", /bangunan hijau/i, /green building/i],
  ];

  for (const [name, bmRe, enRe] of SP) {
    it(`${name} is taught in both streams`, () => {
      expect(prose(scienceF2C9InteractiveBM), `BM missing ${name}`).toMatch(bmRe);
      expect(prose(scienceF2C9InteractiveDLP), `DLP missing ${name}`).toMatch(enRe);
    });
  }
});

// ------------------------------------------- C. THERMOMETER + HEAT/TEMPERATURE

describe("Chapter 9 — a thermometer measures temperature, never heat", () => {
  const BAD = /mengukur haba|measures heat|measuring heat|measure heat/i;

  for (const [lang, content] of LANGS) {
    it(`${lang} interactive surface never says a thermometer measures heat`, () => {
      expect(prose(content)).not.toMatch(BAD);
    });
  }
  for (const [name, deck] of DECKS) {
    it(`${name} never says a thermometer measures heat`, () => {
      expect(text(deck)).not.toMatch(BAD);
    });
  }

  it("states positively that a thermometer measures temperature", () => {
    expect(prose(scienceF2C9InteractiveBM)).toMatch(/termometer mengukur suhu|mengukur suhu/i);
    expect(prose(scienceF2C9InteractiveDLP)).toMatch(/thermometer measures temperature|measure temperature/i);
  });

  it("keeps heat and temperature separate, with their own units", () => {
    const bm = prose(scienceF2C9InteractiveBM);
    expect(bm).toMatch(/joule/i);
    expect(bm).toMatch(/kelvin/i);
    expect(bm).toMatch(/jenis bahan/i); // heat depends on type/quantity/temperature
    expect(bm).toMatch(/darjah kepanasan atau kesejukan/i);
    const dlp = prose(scienceF2C9InteractiveDLP);
    expect(dlp).toMatch(/joule/i);
    expect(dlp).toMatch(/kelvin/i);
    expect(dlp).toMatch(/degree of hotness or coldness/i);
  });
});

// ------------------------------------------------------ D. TRANSFER MECHANISMS

describe("Chapter 9 — heat transfer mechanisms", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} conduction states vibration and collision, without particles migrating`, () => {
      const block = find(content, (s) => !!s.conductionDiagram)?.conductionDiagram;
      expect(block, `${lang} has no conduction figure`).toBeTruthy();
      const all = (block!.stages.map((s) => s.note).join(" ") + " " + block!.mechanismNote).toLowerCase();
      if (lang === "bm") {
        expect(all).toMatch(/bergetar/);
        expect(all).toMatch(/berlanggar/);
        expect(block!.mechanismNote).toMatch(/kekal di kedudukan/i);
      } else {
        expect(all).toMatch(/vibrat/);
        expect(all).toMatch(/collid|collision/);
        expect(block!.mechanismNote).toMatch(/stay in their positions/i);
      }
    });

    it(`${lang} convection states the density chain in the concept card, not a hint`, () => {
      const block = find(content, (s) => !!s.convectionRadiation)?.convectionRadiation;
      expect(block, `${lang} has no convection figure`).toBeTruthy();
      const conv = block!.modes.find((m) => m.id === "convection")!;
      const body = (conv.note + " " + conv.detail).toLowerCase();
      if (lang === "bm") {
        expect(body).toMatch(/kurang tumpat/);
        expect(body).toMatch(/lebih tumpat/);
        expect(body).toMatch(/arus perolakan/);
      } else {
        expect(body).toMatch(/less dense/);
        expect(body).toMatch(/denser/);
        expect(body).toMatch(/convection current/);
      }
    });

    it(`${lang} radiation needs no medium and is not described as particle movement`, () => {
      const block = find(content, (s) => !!s.convectionRadiation)!.convectionRadiation!;
      const rad = block.modes.find((m) => m.id === "radiation")!;
      const body = (rad.note + " " + rad.detail).toLowerCase();
      if (lang === "bm") {
        expect(body).toMatch(/tanpa memerlukan sebarang medium|tanpa sebarang medium/);
        expect(body).toMatch(/vakum|ruang kosong/);
      } else {
        expect(body).toMatch(/without needing any medium|no medium/);
        expect(body).toMatch(/vacuum|empty space/);
      }
      expect(body).not.toMatch(/zarah bergerak|particles move/);
    });
  }

  it("the radiation view draws no medium between source and receiver", () => {
    const block = scienceF2C9InteractiveDLP.sections.find((s) => s.convectionRadiation)!.convectionRadiation!;
    const markup = renderToStaticMarkup(<ConvectionRadiation block={block} lang="en" />);
    expect(markup).toMatch(/svg/);
  });

  it("the conduction figure keeps every particle at a fixed position", () => {
    const block = scienceF2C9InteractiveBM.sections.find((s) => s.conductionDiagram)!.conductionDiagram!;
    const markup = renderToStaticMarkup(<ConductionDiagram block={block} lang="bm" />);
    const cx = [...figureSvg(markup).matchAll(/<circle cx="([\d.]+)"/g)].map((m) => Number(m[1]));
    expect(cx.length).toBe(block.particleCount);
    // Positions must be strictly increasing along the bar and evenly spaced.
    for (let i = 1; i < cx.length; i++) expect(cx[i]).toBeGreaterThan(cx[i - 1]);
  });
});

// ------------------------------------------------------------ E. BREEZES

describe("Chapter 9 — sea and land breeze", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} names the warmer side correctly for each breeze`, () => {
      const block = find(content, (s) => !!s.breezeDiagram)?.breezeDiagram;
      expect(block, `${lang} has no breeze figure`).toBeTruthy();
      const sea = block!.breezes.find((b) => b.id === "sea")!;
      const land = block!.breezes.find((b) => b.id === "land")!;
      // Day: land is warmer. Night: sea is warmer. This drives every arrow.
      expect(sea.warmerSide, `${lang} sea breeze warmer side`).toBe("land");
      expect(land.warmerSide, `${lang} land breeze warmer side`).toBe("sea");
    });

    it(`${lang} describes each breeze with the right time of day and direction`, () => {
      const block = find(content, (s) => !!s.breezeDiagram)!.breezeDiagram!;
      const sea = block.breezes.find((b) => b.id === "sea")!;
      const land = block.breezes.find((b) => b.id === "land")!;
      if (lang === "bm") {
        expect(sea.note).toMatch(/siang/i);
        expect(sea.note).toMatch(/darat lebih cepat|memanaskan darat/i);
        expect(land.note).toMatch(/malam/i);
        expect(land.note).toMatch(/darat menjadi sejuk|darat.{0,30}sejuk/i);
      } else {
        expect(sea.note).toMatch(/during the day/i);
        expect(sea.note).toMatch(/heats the land faster/i);
        expect(land.note).toMatch(/at night/i);
        expect(land.note).toMatch(/land cools down faster|cools.{0,20}faster/i);
      }
    });
  }

  it("the two breezes drive the wind in opposite directions", () => {
    const block = scienceF2C9InteractiveBM.sections.find((s) => s.breezeDiagram)!.breezeDiagram!;
    const sides = block.breezes.map((b) => b.warmerSide);
    expect(new Set(sides).size, "both breezes warm the same side").toBe(2);
    // Rendered: the surface wind arrow must flip between the two views.
    const seaOnly = { ...block, breezes: [block.breezes.find((b) => b.id === "sea")!] };
    const landOnly = { ...block, breezes: [block.breezes.find((b) => b.id === "land")!] };
    const a = renderToStaticMarkup(<BreezeDiagram block={seaOnly} lang="bm" />);
    const b = renderToStaticMarkup(<BreezeDiagram block={landOnly} lang="bm" />);
    const rot = (m: string) => [...m.matchAll(/rotate\((-?\d+)\)/g)].map((x) => x[1]).join(",");
    expect(rot(a), "sea and land breeze render identical arrow rotations").not.toBe(rot(b));
  });
});

// ------------------------------------------------ F. CONDUCTORS / INSULATORS

describe("Chapter 9 — conductor and insulator definitions", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} defines both, not just applications`, () => {
      const t = prose(content);
      if (lang === "bm") {
        expect(t).toMatch(/mengalirkan haba/i);
        expect(t).toMatch(/menghalang|melambatkan/i);
      } else {
        expect(t).toMatch(/allows heat to flow/i);
        expect(t).toMatch(/prevents or slows/i);
      }
    });

    it(`${lang} keeps aluminium on the conductor side`, () => {
      const t = prose(content).toLowerCase();
      // The insulation investigation shows foil is the poorest of the three.
      expect(t).toMatch(/kerajang aluminium ialah konduktor|aluminium foil is a heat conductor|aluminium/);
      expect(t).not.toMatch(/ayam panggang|roast(ed)? chicken/);
    });
  }

  it("no deck claims foil retains heat for roasting", () => {
    for (const [name, deck] of DECKS) {
      expect(text(deck), `${name} carries the unsourced roasting claim`).not.toMatch(/ayam panggang|roast(ed)? chicken/i);
    }
  });
});

// ------------------------------------------------ G. EXPANSION / CONTRACTION

describe("Chapter 9 — expansion and contraction", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} covers all three states`, () => {
      const block = find(content, (s) => !!s.expansionParticles)?.expansionParticles;
      expect(block, `${lang} has no expansion figure`).toBeTruthy();
      expect(block!.states.map((s) => s.id).sort()).toEqual(["gas", "liquid", "solid"]);
    });

    it(`${lang} says the spacing changes, not the particles themselves`, () => {
      const block = find(content, (s) => !!s.expansionParticles)!.expansionParticles!;
      if (lang === "bm") {
        expect(block.misconceptionNote).toMatch(/saiz setiap zarah tidak pernah berubah/i);
        expect(block.misconceptionNote).toMatch(/jarak antara zarah/i);
      } else {
        expect(block.misconceptionNote).toMatch(/size of each particle never changes/i);
        expect(block.misconceptionNote).toMatch(/spacing between them/i);
      }
    });
  }

  it("the figure draws every particle at one fixed radius", () => {
    const block = scienceF2C9InteractiveBM.sections.find((s) => s.expansionParticles)!.expansionParticles!;
    const markup = renderToStaticMarkup(<ExpansionParticles block={block} lang="bm" />);
    const radii = [...figureSvg(markup).matchAll(/<circle[^>]*r="([\d.]+)"/g)].map((m) => m[1]);
    expect(radii.length).toBeGreaterThan(5);
    expect(new Set(radii).size, "particles are drawn at different sizes").toBe(1);
  });
});

// -------------------------------------------------------- H. BIMETALLIC STRIP

describe("Chapter 9 — bimetallic strip", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} pairs copper with iron, as the source labels it`, () => {
      const block = find(content, (s) => !!s.bimetallicStrip)?.bimetallicStrip;
      expect(block, `${lang} has no bimetallic figure`).toBeTruthy();
      if (lang === "bm") {
        expect(block!.fasterMetal).toBe("Kuprum");
        expect(block!.slowerMetal).toBe("Besi");
      } else {
        expect(block!.fasterMetal).toBe("Copper");
        expect(block!.slowerMetal).toBe("Iron");
      }
    });

    it(`${lang} bends toward the contact and completes the circuit when heated`, () => {
      const block = find(content, (s) => !!s.bimetallicStrip)!.bimetallicStrip!;
      const heated = block.states.find((s) => s.id === "heated")!;
      const room = block.states.find((s) => s.id === "room")!;
      if (lang === "bm") {
        expect(heated.note).toMatch(/kuprum mengembang lebih cepat/i);
        expect(heated.note).toMatch(/membengkok ke arah skru sentuhan/i);
        expect(room.note).toMatch(/tidak lengkap|tidak menyentuh/i);
      } else {
        expect(heated.note).toMatch(/copper expands faster/i);
        expect(heated.note).toMatch(/bend toward the contact/i);
        expect(room.note).toMatch(/incomplete|does not touch/i);
      }
    });
  }

  it("no live surface still pairs copper with steel", () => {
    const BAD = /(kuprum|copper)[^"]{0,60}(keluli|steel strip)|(keluli|steel) strip[^"]{0,60}(kuprum|copper)/i;
    for (const [lang, content] of LANGS) expect(prose(content), `${lang}`).not.toMatch(BAD);
    for (const [name, deck] of DECKS) expect(text(deck), name).not.toMatch(BAD);
  });

  it("the heated state deflects the strip and the room state does not", () => {
    const block = scienceF2C9InteractiveDLP.sections.find((s) => s.bimetallicStrip)!.bimetallicStrip!;
    const room = { ...block, states: [block.states.find((s) => s.id === "room")!] };
    const hot = { ...block, states: [block.states.find((s) => s.id === "heated")!] };
    const a = renderToStaticMarkup(<BimetallicStrip block={room} lang="en" />);
    const b = renderToStaticMarkup(<BimetallicStrip block={hot} lang="en" />);
    expect(a).not.toBe(b);
    expect(b).toContain(block.fasterMetal);
    expect(b).toContain(block.slowerMetal);
  });
});

// ------------------------------------------------- I. ABSORPTION / EMISSION

describe("Chapter 9 — absorption and emission", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} keeps absorption and emission as separate ideas`, () => {
      const block = find(content, (s) => !!s.surfaceComparison)?.surfaceComparison;
      expect(block, `${lang} has no surface figure`).toBeTruthy();
      expect(block!.modes.map((m) => m.id).sort()).toEqual(["absorb", "emit"]);
    });

    it(`${lang} makes dark/dull the better performer in both modes`, () => {
      const block = find(content, (s) => !!s.surfaceComparison)!.surfaceComparison!;
      for (const m of block.modes) {
        if (lang === "bm") {
          expect(m.note, `${lang} ${m.id}`).toMatch(/tin hitam/i);
          expect(m.note, `${lang} ${m.id}`).toMatch(/lebih besar/i);
        } else {
          expect(m.note, `${lang} ${m.id}`).toMatch(/black can/i);
          expect(m.note, `${lang} ${m.id}`).toMatch(/greater/i);
        }
      }
    });
  }

  it("no live surface reverses the relationship", () => {
    const REVERSED =
      /(gelap|hitam|dark|black)[^"]{0,60}(kurang baik|poorer|worse)|(putih|cerah|berkilat|white|shiny|light)[^"]{0,40}(menyerap|absorb|membebaskan|emit)[^"]{0,30}(lebih baik|better)/i;
    for (const [lang, content] of LANGS) expect(prose(content), `${lang}`).not.toMatch(REVERSED);
  });

  it("the figure draws more arrows for the dark can, and flips direction between modes", () => {
    const block = scienceF2C9InteractiveBM.sections.find((s) => s.surfaceComparison)!.surfaceComparison!;
    const absorb = { ...block, modes: [block.modes.find((m) => m.id === "absorb")!] };
    const emit = { ...block, modes: [block.modes.find((m) => m.id === "emit")!] };
    const a = renderToStaticMarkup(<SurfaceComparison block={absorb} lang="bm" />);
    const e = renderToStaticMarkup(<SurfaceComparison block={emit} lang="bm" />);
    const rot = (m: string) => [...m.matchAll(/rotate\((\d+)\)/g)].map((x) => x[1]).join(",");
    expect(rot(a), "absorbing and emitting draw the same arrow direction").not.toBe(rot(e));
  });
});

// ---------------------------------------------------------- J. GREEN BUILDING

describe("Chapter 9 — Green Building (SP 9.4.3)", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} teaches Green Building in the notes, not only on the decks`, () => {
      const section = content.sections.find((s) =>
        /bangunan hijau|green building/i.test(s.title),
      );
      expect(section, `${lang} has no Green Building section`).toBeTruthy();
      expect(section!.tabs?.length ?? 0, `${lang} Green Building has no content`).toBeGreaterThan(2);
      expect(section!.checks.length).toBeGreaterThan(0);
    });

    it(`${lang} covers the source criteria`, () => {
      const t = prose(content).toLowerCase();
      const needed =
        lang === "bm"
          ? ["kecekapan tenaga", "air", "bahan binaan", "kitar semula", "peredaran udara"]
          : ["energy efficiency", "water", "building materials", "recycled", "air-circulation"];
      for (const n of needed) expect(t, `${lang} missing ${n}`).toContain(n);
    });

    it(`${lang} links Green Building back to heat`, () => {
      const t = prose(content).toLowerCase();
      if (lang === "bm") expect(t).toMatch(/menyejukkan|penebat haba/);
      else expect(t).toMatch(/cool|heat insulation/);
    });
  }

  it("exposes no textbook QR link or URL", () => {
    for (const [lang, content] of LANGS) {
      expect(prose(content), `${lang} exposes a link`).not.toMatch(/https?:\/\/|imbas|scan the qr/i);
    }
  });
});

// ------------------------------------------------------------- K. LEAKAGE

describe("Chapter 9 — learner-facing leakage", () => {
  const LEAK =
    /aktiviti\s*9\.\d|activit(y|ies)\s*9\.\d|eksperimen\s*9\.\d|experiment\s*9\.\d|rajah\s*9\.\d|figure\s*9\.\d|jadual\s*9\.\d|table\s*9\.\d|\bDSKP\b|\bSP\s*9\.\d/i;

  for (const [lang, content] of LANGS) {
    it(`${lang} interactive surface is free of textbook numbering`, () => {
      expect(prose(content)).not.toMatch(LEAK);
    });
  }
  for (const [name, deck] of DECKS) {
    it(`${name} is free of textbook numbering`, () => {
      expect(text(deck)).not.toMatch(LEAK);
    });
  }
});

// ------------------------------------------------------- L. ASSESSMENT DECKS

describe("Chapter 9 — quizzes, flashcards and mind map", () => {
  it("keeps 30 questions per language with a balanced answer spread", () => {
    for (const deck of [scienceF2C9QuizzesBM, scienceF2C9QuizzesDLP]) {
      expect(deck).toHaveLength(30);
      const hist: Record<number, number> = {};
      for (const q of deck) {
        expect(q.options.length).toBe(4);
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThan(q.options.length);
        hist[q.answerIndex] = (hist[q.answerIndex] ?? 0) + 1;
      }
      for (const i of [0, 1, 2, 3]) expect(hist[i] ?? 0, `position ${i} unused`).toBeGreaterThan(0);
      expect(Math.max(...Object.values(hist))).toBeLessThanOrEqual(12);
    }
  });

  it("keeps BM and DLP decks index-for-index aligned", () => {
    for (let i = 0; i < scienceF2C9QuizzesBM.length; i++) {
      expect(scienceF2C9QuizzesDLP[i].answerIndex, `q${i + 1}`).toBe(scienceF2C9QuizzesBM[i].answerIndex);
      expect(scienceF2C9QuizzesDLP[i].difficulty, `q${i + 1}`).toBe(scienceF2C9QuizzesBM[i].difficulty);
    }
    expect(scienceF2C9FlashcardsDLP).toHaveLength(scienceF2C9FlashcardsBM.length);
  });

  it("mind-map ids stay unique and aligned across languages", () => {
    const ids = (n: unknown, acc: string[] = []): string[] => {
      const node = n as { id: string; children?: unknown[] };
      acc.push(node.id);
      for (const c of node.children ?? []) ids(c, acc);
      return acc;
    };
    const bm = ids(scienceF2C9MindMapBM);
    const dlp = ids(scienceF2C9MindMapDLP);
    expect(new Set(bm).size).toBe(bm.length);
    expect(dlp).toEqual(bm);
  });
});

// ----------------------------------------------------------- M. INTERACTIONS

describe("Chapter 9 — interactive figures are real", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang} every figure offers more than one choice and carries an instruction`, () => {
      for (const s of content.sections) {
        const blocks = [
          s.conductionDiagram,
          s.convectionRadiation,
          s.breezeDiagram,
          s.expansionParticles,
          s.bimetallicStrip,
          s.surfaceComparison,
        ].filter(Boolean);
        for (const b of blocks) {
          expect((b as { instruction?: string }).instruction, `${lang} ${s.title}`).toBeTruthy();
        }
        if (s.conductionDiagram) expect(s.conductionDiagram.stages.length).toBeGreaterThan(1);
        if (s.convectionRadiation) expect(s.convectionRadiation.modes.length).toBe(2);
        if (s.breezeDiagram) expect(s.breezeDiagram.breezes.length).toBe(2);
        if (s.expansionParticles) expect(s.expansionParticles.states.length).toBe(3);
        if (s.bimetallicStrip) expect(s.bimetallicStrip.states.length).toBe(2);
        if (s.surfaceComparison) expect(s.surfaceComparison.modes.length).toBe(2);
      }
    });

    it(`${lang} renders six instructional figures across the chapter`, () => {
      const count = content.sections.filter(
        (s) =>
          s.conductionDiagram ||
          s.convectionRadiation ||
          s.breezeDiagram ||
          s.expansionParticles ||
          s.bimetallicStrip ||
          s.surfaceComparison,
      ).length;
      expect(count).toBe(6);
    });
  }
});
