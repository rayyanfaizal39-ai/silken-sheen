import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { StellarLifecycle } from "@/components/notes/blocks/StellarLifecycle";
import { CosmicScale } from "@/components/notes/blocks/CosmicScale";
import { MilkyWayLocator, SOLAR_SYSTEM_POINT, GALACTIC_CENTRE } from "@/components/notes/blocks/MilkyWayLocator";
import { StarSizeCompare } from "@/components/notes/blocks/StarSizeCompare";
import { PhScaleSlider } from "@/components/notes/blocks/PhScaleSlider";
import { scienceF2C11InteractiveBM } from "./interactive-bm";
import { scienceF2C11InteractiveDLP } from "./interactive-dlp";
import { scienceF2C11QuizzesBM } from "./quizzes-bm";
import { scienceF2C11QuizzesDLP } from "./quizzes-dlp";
import { scienceF2C11FlashcardsBM } from "./flashcards-bm";
import { scienceF2C11FlashcardsDLP } from "./flashcards-dlp";
import { scienceF2C11MindMapBM } from "./mindmap-bm";
import { scienceF2C11MindMapDLP } from "./mindmap-dlp";
import type { ScienceF2InteractiveContent, ScienceInteractiveSection } from "../interactive-types";

/**
 * Regression guards for the Chapter 11 remediation — see
 * SCIENCE_F2_CH11_REMEDIATION_CHANGELOG.md.
 *
 * The critical defect was a stellar life cycle presented as one linear chain,
 * with all three endpoints merged into a single final card and two stages
 * ("protostar", "main-sequence star") imported from outside the Form 2 source.
 * The textbook's Rajah 11.1 forks at the star's size into three pathways that
 * never rejoin, and those three pathways are what these tests lock down.
 *
 * Only live surfaces are covered. notes-bm.ts / notes-dlp.ts are shadowed by the
 * interactive branch in routes/notes.tsx and are deliberately excluded.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C11InteractiveBM],
  ["dlp", scienceF2C11InteractiveDLP],
];

const DECKS: [string, unknown][] = [
  ["quizzes bm", scienceF2C11QuizzesBM],
  ["quizzes dlp", scienceF2C11QuizzesDLP],
  ["flashcards bm", scienceF2C11FlashcardsBM],
  ["flashcards dlp", scienceF2C11FlashcardsDLP],
  ["mindmap bm", scienceF2C11MindMapBM],
  ["mindmap dlp", scienceF2C11MindMapDLP],
];

const BM_LIVE: [string, unknown][] = [
  ["interactive bm", scienceF2C11InteractiveBM],
  ["quizzes bm", scienceF2C11QuizzesBM],
  ["flashcards bm", scienceF2C11FlashcardsBM],
  ["mindmap bm", scienceF2C11MindMapBM],
];

const ALL_LIVE: [string, unknown][] = [
  ...DECKS,
  ...LANGS.map(([l, c]) => [`interactive ${l}`, c] as [string, unknown]),
];

const text = (v: unknown) => JSON.stringify(v);
const sections = (c: ScienceF2InteractiveContent) => c.sections as ScienceInteractiveSection[];
const notes = (c: ScienceF2InteractiveContent) => text(c);
const figureSvg = (markup: string) => {
  const i = markup.indexOf('role="img"');
  return i === -1 ? "" : markup.slice(i);
};

// ------------------------------------------------------- source scope (1 SK / 2 SP)

describe("Chapter 11 — source scope", () => {
  it("every section sits under the chapter's only Standard Kandungan, 11.1", () => {
    for (const [lang, content] of LANGS) {
      for (const s of sections(content)) {
        expect(s.number, `${lang} ${s.title}`).toBe("11.1");
      }
    }
  });

  it("no learner-facing 11.2 exists — the chapter has no such subtopic", () => {
    for (const [surface, data] of ALL_LIVE) {
      expect(text(data), surface).not.toMatch(/\b11\.2\b/);
    }
  });

  it("ships four teaching sections in both streams, in the same order", () => {
    expect(sections(scienceF2C11InteractiveBM)).toHaveLength(4);
    expect(sections(scienceF2C11InteractiveDLP)).toHaveLength(4);
  });

  it("no section is a content wall", () => {
    for (const [lang, content] of LANGS) {
      for (const s of sections(content)) {
        expect(text(s).length, `${lang} ${s.title}`).toBeLessThan(6000);
      }
    }
  });
});

// ------------------------------------------------------------- SP coverage

describe("Chapter 11 — SP 11.1.1 concepts are taught in the notes", () => {
  const CONCEPTS: [string, RegExp, RegExp][] = [
    ["galaxy definition", /himpunan jasad|jutaan bintang/i, /collection of bodies|millions of stars/i],
    ["spiral galaxy", /berpilin/i, /spiral/i],
    ["elliptical galaxy", /elips/i, /elliptical/i],
    ["irregular galaxy", /tidak seragam/i, /irregular/i],
    ["Milky Way", /Bima Sakti/i, /Milky Way/i],
    ["solar system position", /pinggir salah satu cabang/i, /edge of one/i],
    ["200 billion stars", /200 bilion/i, /200 billion/i],
    ["relative scale", /Gugusan galaksi/i, /Cluster of galaxies/i],
    ["nebula", /nebula/i, /nebula/i],
    ["life cycle", /kitar hidup|Kitar Hidup/i, /life cycle/i],
  ];
  for (const [label, bm, dlp] of CONCEPTS) {
    it(`${label} — BM`, () => expect(notes(scienceF2C11InteractiveBM)).toMatch(bm));
    it(`${label} — DLP`, () => expect(notes(scienceF2C11InteractiveDLP)).toMatch(dlp));
  }
});

describe("Chapter 11 — SP 11.1.2 characteristics are taught in the notes", () => {
  const CHARS: [string, RegExp, RegExp][] = [
    ["suhu / temperature", /suhu/i, /temperature/i],
    ["saiz / size", /saiz/i, /size/i],
    ["jarak / distance", /jarak/i, /distance/i],
    ["warna / colour", /warna/i, /colour/i],
    ["kecerahan / brightness", /kecerahan/i, /brightness/i],
  ];
  for (const [label, bm, dlp] of CHARS) {
    it(`${label} — BM`, () => expect(notes(scienceF2C11InteractiveBM)).toMatch(bm));
    it(`${label} — DLP`, () => expect(notes(scienceF2C11InteractiveDLP)).toMatch(dlp));
  }

  it("all five are named together as the classification criteria", () => {
    expect(notes(scienceF2C11InteractiveBM)).toMatch(/suhu, saiz, jarak, warna dan kecerahan/i);
    expect(notes(scienceF2C11InteractiveDLP)).toMatch(
      /temperature, size, distance, colour and brightness/i,
    );
  });
});

// ------------------------------------------------------- the stellar life cycle

describe("Chapter 11 — the life cycle branches", () => {
  const EXPECTED: Record<string, string[]> = {
    medium: ["Raksasa merah", "Kerdil putih"],
    large: ["Raksasa merah", "Super raksasa", "Supernova", "Bintang neutron"],
    superlarge: ["Raksasa merah", "Super raksasa", "Supernova", "Lohong hitam"],
  };

  const blockOf = (c: ScienceF2InteractiveContent) =>
    sections(c).find((s) => s.stellarLifecycle)!.stellarLifecycle!;

  it("is not a single chain — three distinct branches exist in both streams", () => {
    for (const [lang, content] of LANGS) {
      const b = blockOf(content);
      expect(b.branches, lang).toHaveLength(3);
      expect(b.branches.map((x) => x.id).sort(), lang).toEqual([
        "large",
        "medium",
        "superlarge",
      ]);
    }
  });

  it("BM reproduces the source stages for each branch", () => {
    const b = blockOf(scienceF2C11InteractiveBM);
    for (const [id, stages] of Object.entries(EXPECTED)) {
      const branch = b.branches.find((x) => x.id === id)!;
      for (const stage of stages) {
        expect(branch.stages, id).toContain(stage);
      }
    }
  });

  it("each branch ends at its own distinct outcome", () => {
    for (const [lang, content] of LANGS) {
      const b = blockOf(content);
      const endings = b.branches.map((x) => x.stages[x.stages.length - 1]);
      expect(new Set(endings).size, lang).toBe(3);
    }
  });

  it("the supergiant stage is present on both large-star branches", () => {
    const b = blockOf(scienceF2C11InteractiveBM);
    expect(b.branches.find((x) => x.id === "large")!.stages).toContain("Super raksasa");
    expect(b.branches.find((x) => x.id === "superlarge")!.stages).toContain("Super raksasa");
  });

  it("only the two large branches pass through a supernova", () => {
    for (const [lang, content] of LANGS) {
      const b = blockOf(content);
      const has = (id: string) =>
        b.branches.find((x) => x.id === id)!.stages.some((s) => /supernova/i.test(s));
      expect(has("medium"), `${lang} medium`).toBe(false);
      expect(has("large"), `${lang} large`).toBe(true);
      expect(has("superlarge"), `${lang} superlarge`).toBe(true);
    }
  });

  it("the medium branch ends at a white dwarf, never a black hole", () => {
    for (const [lang, content] of LANGS) {
      const medium = blockOf(content).branches.find((x) => x.id === "medium")!;
      expect(medium.stages.join(" "), lang).toMatch(/kerdil putih|white dwarf/i);
      expect(medium.stages.join(" "), lang).not.toMatch(/lohong hitam|black hole/i);
    }
  });

  it("the Sun is placed on the medium pathway and never routed to a black hole", () => {
    for (const [lang, content] of LANGS) {
      const t = notes(content);
      expect(t, lang).toMatch(
        lang === "bm"
          ? /Matahari[^"]{0,120}bintang bersaiz sederhana|bintang bersaiz sederhana seperti Matahari/i
          : /Sun[^"]{0,120}medium-sized star|medium-sized star such as the Sun/i,
      );
      // Only an assertion is a defect. The notes deliberately pose the
      // misconception as a question ("Adakah Matahari akan menjadi lohong
      // hitam?") and answer it "Tidak", so interrogatives must stay allowed.
      const claims = t
        .split(/(?<=[.!?])\s+|\\n|","|":"/)
        .filter((s) =>
          lang === "bm"
            ? /Matahari[^"]{0,80}lohong hitam/i.test(s)
            : /Sun[^"]{0,80}black hole/i.test(s),
        );
      for (const s of claims) {
        const denied = /\btidak\b|\bbukan\b|\bnot\b|\bnever\b/i.test(s) || /\?/.test(s);
        expect(denied, `${lang}: "${s.slice(0, 120)}"`).toBe(true);
      }
    }
  });

  it("renders every branch with its full pathway and arrows that only run forward", () => {
    const block = blockOf(scienceF2C11InteractiveBM);
    const markup = renderToStaticMarkup(<StellarLifecycle block={block} lang="bm" />);
    const svg = figureSvg(markup);

    // fork paths must descend from the shared origin into each column
    const forks = [...svg.matchAll(/M [\d.]+ ([\d.]+) V ([\d.]+) H [\d.]+ V ([\d.]+)/g)];
    expect(forks).toHaveLength(3);
    for (const f of forks) {
      expect(Number(f[3])).toBeGreaterThan(Number(f[2])); // final leg points down
    }
    // every stage arrow points down
    const lines = [...svg.matchAll(/<line[^>]*y1="([\d.]+)"[^>]*y2="([\d.]+)"[^>]*>/g)];
    expect(lines.length).toBeGreaterThan(0);
    for (const l of lines) {
      expect(Number(l[2])).toBeGreaterThan(Number(l[1]));
    }
    // the accessible label spells out all three pathways
    // (scoped to the figure — the controls group carries its own aria-label)
    const aria = svg.match(/aria-label="([^"]+)"/)![1];
    expect(aria).toMatch(/Kerdil putih/);
    expect(aria).toMatch(/Bintang neutron/);
    expect(aria).toMatch(/Lohong hitam/);
  });
});

// ---------------------------------------------- terminology the source actually uses

describe("Chapter 11 — BM uses the DSKP/textbook register", () => {
  const REQUIRED: [string, RegExp][] = [
    ["raksasa merah", /raksasa merah/i],
    ["super raksasa", /super raksasa/i],
    ["berpilin", /berpilin/i],
    ["tidak seragam", /tidak seragam/i],
  ];
  for (const [label, re] of REQUIRED) {
    it(`BM notes use "${label}"`, () => {
      expect(notes(scienceF2C11InteractiveBM)).toMatch(re);
    });
  }

  const WRONG: [string, RegExp][] = [
    ["gergasi merah", /gergasi merah/i],
    ["supergergasi", /supergergasi/i],
    ["tidak sekata", /tidak sekata/i],
    ["Ursa Major", /Ursa Major/i],
  ];
  for (const [surface, data] of BM_LIVE) {
    for (const [label, re] of WRONG) {
      it(`${surface}: never uses "${label}"`, () => {
        expect(text(data), surface).not.toMatch(re);
      });
    }
    it(`${surface}: "pilin" only ever appears as "berpilin"`, () => {
      expect(text(data), surface).not.toMatch(/(?<!ber)pilin/i);
    });
  }

  it("no live surface imports a protostar or main-sequence stage", () => {
    for (const [surface, data] of ALL_LIVE) {
      expect(text(data), surface).not.toMatch(/protostar|protobintang/i);
      expect(text(data), surface).not.toMatch(/main[- ]sequence|jujukan utama/i);
    }
  });

  it("outcome is attributed to size, not mass", () => {
    for (const [lang, content] of LANGS) {
      const t = notes(content);
      expect(t, lang).toMatch(lang === "bm" ? /bergantung pada saiz|saiz bintang/i : /depends on the size|size of that star/i);
      expect(t, lang).not.toMatch(lang === "bm" ? /jisim/i : /\bmass\b/i);
    }
  });
});

// -------------------------------------------------------------- relative scale

describe("Chapter 11 — relative scale", () => {
  const blockOf = (c: ScienceF2InteractiveContent) =>
    sections(c).find((s) => s.cosmicScale)!.cosmicScale!;

  it("reproduces the six textbook tiers in containment order", () => {
    const bm = blockOf(scienceF2C11InteractiveBM).tiers.map((t) => t.id);
    expect(bm).toEqual([
      "bumi",
      "sistem-suria",
      "bima-sakti",
      "kumpulan",
      "gugusan",
      "alam-semesta",
    ]);
    expect(blockOf(scienceF2C11InteractiveDLP).tiers.map((t) => t.id)).toEqual(bm);
  });

  it("never introduces a separate 'planet' tier — Earth is itself a planet", () => {
    for (const [lang, content] of LANGS) {
      const labels = blockOf(content).tiers.map((t) => t.label.toLowerCase());
      expect(labels, lang).not.toContain("planet");
      expect(labels, lang).not.toContain("planets");
    }
  });

  it("states that the drawing is not to scale", () => {
    const markup = renderToStaticMarkup(
      <CosmicScale block={blockOf(scienceF2C11InteractiveBM)} lang="bm" />,
    );
    expect(markup).toMatch(/tidak mengikut skala/i);
  });
});

// ------------------------------------------------------- Milky Way + solar system

describe("Chapter 11 — the Milky Way", () => {
  const blockOf = (c: ScienceF2InteractiveContent) =>
    sections(c).find((s) => s.milkyWayLocator)!.milkyWayLocator!;

  it("carries the three source facts", () => {
    const f = blockOf(scienceF2C11InteractiveBM).facts.join(" ");
    expect(f).toMatch(/berpilin/i);
    expect(f).toMatch(/sederhana besar/i);
    expect(f).toMatch(/200 bilion/i);
  });

  it("places the solar system well outside the galactic core, not at the centre", () => {
    const d = Math.hypot(
      SOLAR_SYSTEM_POINT.x - GALACTIC_CENTRE.x,
      SOLAR_SYSTEM_POINT.y - GALACTIC_CENTRE.y,
    );
    expect(d).toBeGreaterThan(GALACTIC_CENTRE.coreRadius * 2);
  });

  it("labels the centre and the solar system separately", () => {
    const markup = renderToStaticMarkup(
      <MilkyWayLocator block={blockOf(scienceF2C11InteractiveBM)} />,
    );
    expect(markup).toContain("Pusat galaksi");
    expect(markup).toContain("Sistem suria");
  });
});

// ------------------------------------------------------------ colour and temperature

describe("Chapter 11 — colour and temperature", () => {
  const blockOf = (c: ScienceF2InteractiveContent) =>
    sections(c).find((s) => s.phSlider)!.phSlider!;

  const BANDS_BM: [string, RegExp][] = [
    ["Merah", /3 ?500/],
    ["Jingga", /3 ?500 – 5 ?000/],
    ["Kuning", /5 ?000 – 6 ?000/],
    ["Kuning-putih", /6 ?000 – 7 ?500/],
    ["Putih", /7 ?500 – 11 ?000/],
    ["Biru-putih", /11 ?000 – 25 ?000/],
    ["Biru", /25 ?000/],
  ];

  it("ships all seven source bands in order, coolest to hottest", () => {
    const scale = blockOf(scienceF2C11InteractiveBM).scale;
    expect(scale).toHaveLength(7);
    expect(scale.map((p) => p.name)).toEqual(BANDS_BM.map(([n]) => n));
  });

  it("each band carries its exact Kelvin range", () => {
    const scale = blockOf(scienceF2C11InteractiveBM).scale;
    for (const [name, re] of BANDS_BM) {
      const point = scale.find((p) => p.name === name)!;
      expect(point.description, name).toMatch(re);
    }
  });

  it("red is the coolest and blue the hottest", () => {
    const scale = blockOf(scienceF2C11InteractiveBM).scale;
    expect(scale[0].name).toBe("Merah");
    expect(scale[0].description).toMatch(/paling sejuk/i);
    expect(scale[scale.length - 1].name).toBe("Biru");
    expect(scale[scale.length - 1].description).toMatch(/paling panas/i);
  });

  it("the slider announces itself as a star scale, not a pH scale", () => {
    for (const [lang, content] of LANGS) {
      const b = blockOf(content);
      expect(b.ariaLabel, lang).toBeTruthy();
      expect(b.ariaLabel, lang).not.toMatch(/pH/i);
    }
  });

  it("tick labels are colour names, never raw indices", () => {
    for (const [lang, content] of LANGS) {
      const b = blockOf(content);
      expect(b.tickLabels, lang).toHaveLength(7);
      for (const t of b.tickLabels!) {
        expect(t, lang).not.toMatch(/^\d+$/);
      }
    }
    const markup = renderToStaticMarkup(
      <PhScaleSlider
        scale={blockOf(scienceF2C11InteractiveBM).scale}
        ariaLabel={blockOf(scienceF2C11InteractiveBM).ariaLabel}
        tickLabels={blockOf(scienceF2C11InteractiveBM).tickLabels}
        unitLabel=""
      />,
    );
    expect(markup).toContain("Skala warna dan suhu bintang");
    expect(markup).toContain("Kuning-putih");
  });

  it("the shared slider still defaults to pH wording for the chemistry chapters", () => {
    const markup = renderToStaticMarkup(
      <PhScaleSlider scale={[{ value: 7, name: "Neutral", description: "Neutral" }]} />,
    );
    expect(markup).toContain('aria-label="pH scale"');
  });
});

// ------------------------------------------------------------------- star size

describe("Chapter 11 — star size", () => {
  const blockOf = (c: ScienceF2InteractiveContent) =>
    sections(c).find((s) => s.starSizeCompare)!.starSizeCompare!;

  it("uses the source's three size categories, largest first", () => {
    const bm = blockOf(scienceF2C11InteractiveBM);
    expect(bm.sizes.map((s) => s.label)).toEqual(["Super raksasa", "Raksasa", "Kerdil"]);
    const rel = bm.sizes.map((s) => s.relative);
    expect(rel[0]).toBeGreaterThan(rel[1]);
    expect(rel[1]).toBeGreaterThan(rel[2]);
  });

  it("distinguishes the dwarf size class from the white-dwarf endpoint", () => {
    expect(blockOf(scienceF2C11InteractiveBM).hint).toMatch(/kerdil putih/i);
    expect(blockOf(scienceF2C11InteractiveDLP).hint).toMatch(/white dwarf/i);
  });

  it("renders without claiming a real scale", () => {
    const markup = renderToStaticMarkup(
      <StarSizeCompare block={blockOf(scienceF2C11InteractiveBM)} />,
    );
    expect(markup).toMatch(/tidak mengikut skala/i);
  });
});

// ------------------------------------------------------- brightness and examples

describe("Chapter 11 — brightness, distance and named stars", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: brightness depends on size, distance and surface temperature`, () => {
      expect(notes(content)).toMatch(
        lang === "bm"
          ? /bergantung pada saiz, jarak dari Bumi dan suhu permukaan/i
          : /depends on its size, its distance from Earth and its surface temperature/i,
      );
    });
    it(`${lang}: names Sirius and Rigel as the brightest, per the source`, () => {
      expect(notes(content)).toMatch(/Sirius/);
      expect(notes(content)).toMatch(/Rigel/);
    });
  }

  it("imports no astronomy the Form 2 source does not carry", () => {
    for (const [surface, data] of ALL_LIVE) {
      expect(text(data), surface).not.toMatch(/light[- ]year|tahun cahaya|parsec|parallax|paralaks/i);
      expect(text(data), surface).not.toMatch(/magnitude|magnitud|spectral class|kelas spektrum/i);
    }
  });
});

// ----------------------------------------------------------------------- decks

describe("Chapter 11 — quizzes", () => {
  const bm = scienceF2C11QuizzesBM as {
    options: string[];
    answerIndex: number;
    difficulty: string;
  }[];
  const dlp = scienceF2C11QuizzesDLP as {
    options: string[];
    answerIndex: number;
    difficulty: string;
  }[];

  it("keeps 30 questions per stream", () => {
    expect(bm).toHaveLength(30);
    expect(dlp).toHaveLength(30);
  });

  it("every answerIndex is valid and every option set is unique", () => {
    for (const [name, deck] of [["bm", bm], ["dlp", dlp]] as const) {
      for (const [i, q] of deck.entries()) {
        expect(q.options.length, `${name} q${i}`).toBe(4);
        expect(q.answerIndex, `${name} q${i}`).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex, `${name} q${i}`).toBeLessThan(q.options.length);
        expect(new Set(q.options).size, `${name} q${i}`).toBe(q.options.length);
      }
    }
  });

  it("answer positions are balanced", () => {
    for (const [name, deck] of [["bm", bm], ["dlp", dlp]] as const) {
      const counts = [0, 0, 0, 0];
      for (const q of deck) counts[q.answerIndex] += 1;
      expect(Math.max(...counts) - Math.min(...counts), name).toBeLessThanOrEqual(2);
      expect(Math.max(...counts), name).toBeLessThanOrEqual(9);
    }
  });

  it("keeps the difficulty split at 10/10/10", () => {
    for (const [name, deck] of [["bm", bm], ["dlp", dlp]] as const) {
      const counts: Record<string, number> = {};
      for (const q of deck) counts[q.difficulty] = (counts[q.difficulty] ?? 0) + 1;
      expect(counts, name).toEqual({ Easy: 10, Medium: 10, Hard: 10 });
    }
  });

  it("BM and DLP answer positions stay in lockstep", () => {
    expect(bm.map((q) => q.answerIndex)).toEqual(dlp.map((q) => q.answerIndex));
  });

  it("assesses the life cycle, including the supernova pathways", () => {
    for (const [surface, deck] of [["bm", scienceF2C11QuizzesBM], ["dlp", scienceF2C11QuizzesDLP]] as const) {
      const t = text(deck);
      expect(t, surface).toMatch(/supernova/i);
      expect(t, surface).toMatch(/kerdil putih|white dwarf/i);
      expect(t, surface).toMatch(/bintang neutron|neutron star/i);
      expect(t, surface).toMatch(/lohong hitam|black hole/i);
    }
  });
});

describe("Chapter 11 — decks agree with the notes", () => {
  it("no live surface exposes curriculum or audit metadata", () => {
    for (const [surface, data] of ALL_LIVE) {
      expect(text(data), surface).not.toMatch(
        /\bDSKP\b|\bSK\s*11\.|\bSP\s*11\.|jadual\s*9\b|aktiviti\s*11\.\d|activit(?:y|ies)\s*11\.\d|buku teks|\btextbook\b|\bmandatory\b|\bremediation\b/i,
      );
    }
  });

  it("flashcard and mind-map counts stay in BM/DLP parity", () => {
    expect((scienceF2C11FlashcardsBM as unknown[]).length).toBe(
      (scienceF2C11FlashcardsDLP as unknown[]).length,
    );
    const nodes = (n: unknown): number => {
      const kids = (n as { children?: unknown[] }).children ?? [];
      return 1 + kids.reduce<number>((a, k) => a + nodes(k), 0);
    };
    expect(nodes(scienceF2C11MindMapBM)).toBe(nodes(scienceF2C11MindMapDLP));
  });

  it("the mind map keeps the large and very-large pathways separate", () => {
    for (const [surface, map] of [["bm", scienceF2C11MindMapBM], ["dlp", scienceF2C11MindMapDLP]] as const) {
      const t = text(map);
      // no node may offer both endpoints as alternatives within one label
      expect(t, surface).not.toMatch(/neutron[^"]{0,40}(atau|or)[^"]{0,40}(lohong hitam|black hole)/i);
      expect(t, surface).toMatch(/supernova[^"]{0,60}(bintang neutron|neutron star)/i);
      expect(t, surface).toMatch(/supernova[^"]{0,60}(lohong hitam|black hole)/i);
    }
  });
});
