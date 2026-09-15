import { describe, expect, it } from "vitest";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import {
  AsteroidBeltFigure,
  BELT_ROCKS,
  ORBIT_R,
} from "@/components/notes/blocks/AsteroidBeltFigure";
import {
  CometOrbitFigure,
  cometGeometry,
  COMET_STOP_COUNT,
  COMET_VIEWBOX,
} from "@/components/notes/blocks/CometOrbitFigure";
import { COMET_ORIGIN_R } from "@/components/notes/blocks/CometOriginFigure";
import {
  CROSSING_ORBIT_ELEMENTS,
  CROSSING_ORBIT_VIEWBOX,
  CrossingOrbitsFigure,
  crossingOrbitGeometry,
  EARTH_ORBIT_PX,
} from "@/components/notes/blocks/CrossingOrbitsFigure";
import {
  CH13_FIGURE_GEOMETRY,
  CH13_FIGURE_ORDER,
} from "@/components/notes/blocks/ch13-approved-figure-geometry";
import { SHOWER_STREAKS } from "@/components/notes/blocks/MeteorShowerFigure";
import { SCIENCE_F2_CH13_IMAGES } from "../visual-assets";
import { scienceF2C13InteractiveBM } from "./interactive-bm";
import { scienceF2C13InteractiveDLP } from "./interactive-dlp";
import { scienceF2C13QuizzesBM } from "./quizzes-bm";
import { scienceF2C13QuizzesDLP } from "./quizzes-dlp";
import { scienceF2C13FlashcardsBM } from "./flashcards-bm";
import { scienceF2C13FlashcardsDLP } from "./flashcards-dlp";
import { scienceF2C13MindMapBM } from "./mindmap-bm";
import { scienceF2C13MindMapDLP } from "./mindmap-dlp";
import type { LessonFlowPart, ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Regression guards for Chapter 13 — Meteoroid, Asteroid, Comet.
 *
 * Two generations of fixes live here. The first remediation (see
 * SCIENCE_F2_CH13_DEEP_AUDIT_REPORT.md) corrected facts: the meteoroid size,
 * the quiz bank, the meteoroid/orbit distinction. The master remediation
 * (SCIENCE_F2_CH13_THREE_LESSON_RESTRUCTURE_REPORT.md) restructured the chapter
 * into separate object lessons, took meteor shower OFF the meteoroid's journey,
 * and brought in four approved figures. Both sets of guards stay.
 *
 * Only the live interactive path is covered for layout. notes-bm.ts /
 * notes-dlp.ts are shadowed by the interactive branch in routes/notes.tsx.
 */

type Kind = LessonFlowPart["kind"];
type PartOf<K extends Kind> = Extract<LessonFlowPart, { kind: K }>;

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C13InteractiveBM],
  ["dlp", scienceF2C13InteractiveDLP],
];

type Quiz = {
  id: string;
  difficulty: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};
type Card = { id: string; front: string; back: string };

const QUIZZES: [string, Quiz[]][] = [
  ["bm", scienceF2C13QuizzesBM as unknown as Quiz[]],
  ["dlp", scienceF2C13QuizzesDLP as unknown as Quiz[]],
];
const DECKS: [string, Card[]][] = [
  ["bm", scienceF2C13FlashcardsBM as unknown as Card[]],
  ["dlp", scienceF2C13FlashcardsDLP as unknown as Card[]],
];
const SURFACES: [string, unknown][] = [
  ["interactive bm", scienceF2C13InteractiveBM],
  ["interactive dlp", scienceF2C13InteractiveDLP],
  ["mindmap bm", scienceF2C13MindMapBM],
  ["mindmap dlp", scienceF2C13MindMapDLP],
  ["quizzes bm", scienceF2C13QuizzesBM],
  ["quizzes dlp", scienceF2C13QuizzesDLP],
  ["flashcards bm", scienceF2C13FlashcardsBM],
  ["flashcards dlp", scienceF2C13FlashcardsDLP],
];

const all = (v: unknown) => JSON.stringify(v);

/** Section indices, fixed by the restructure and asserted below. */
const S = {
  intro: 0,
  meteoroid: 1,
  asteroid: 2,
  comet: 3,
  protect: 4,
  compare: 5,
  check: 6,
} as const;

function partsIn(content: ScienceF2InteractiveContent, sectionIndex: number): LessonFlowPart[] {
  return content.sections[sectionIndex]?.lessonFlow ?? [];
}

function findPart<K extends Kind>(
  content: ScienceF2InteractiveContent,
  sectionIndex: number,
  kind: K,
  pred: (part: PartOf<K>) => boolean = () => true,
): PartOf<K> {
  const found = partsIn(content, sectionIndex)
    .filter((part): part is PartOf<K> => part.kind === kind)
    .find(pred);
  if (!found) throw new Error(`section ${sectionIndex} has no ${kind} part`);
  return found;
}

function figure(
  content: ScienceF2InteractiveContent,
  sectionIndex: number,
  id: PartOf<"figure">["figure"],
) {
  return findPart(content, sectionIndex, "figure", (part) => part.figure === id);
}

/** The sectioned shell renders one section body at a time. */
function sectionMarkup(content: ScienceF2InteractiveContent, lang: "bm" | "en", index: number) {
  return renderToStaticMarkup(
    createElement(ScienceF2InteractiveNotesBlock, {
      content: { ...content, sections: [content.sections[index]] },
      lang,
    }),
  );
}

/** Every learner-facing string, skipping ids, kinds, file paths and figure keys. */
function learnerStrings(node: unknown, key = ""): string[] {
  if (typeof node === "string")
    return ["id", "kind", "src", "figure", "tone", "imagePath"].includes(key) ? [] : [node];
  if (Array.isArray(node)) return node.flatMap((item) => learnerStrings(item, key));
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([k, v]) => learnerStrings(v, k));
  }
  return [];
}

describe("Chapter 13 — structure follows the DSKP", () => {
  it("has one Standard Kandungan, so every section is numbered 13.1", () => {
    for (const [lang, content] of LANGS) {
      const numbers = content.sections.map((s) => s.number);
      expect(numbers.length, lang).toBeGreaterThanOrEqual(1);
      for (const n of numbers) expect(n, lang).toBe("13.1");
    }
  });

  it("carries one reflection statement per Standard Pembelajaran", () => {
    // DSKP printed p.91: SP 13.1.1, 13.1.2, 13.1.3 — three, no more
    for (const [lang, content] of LANGS) {
      expect(content.reflectionItems.length, lang).toBe(3);
    }
  });
});

describe("Chapter 13 — three separate object lessons", () => {
  it("teaches the chapter in the agreed learner-facing order", () => {
    expect(scienceF2C13InteractiveDLP.sections.map((s) => s.title)).toEqual([
      "Other Objects in the Solar System",
      "Meteoroids, Meteors & Meteorites",
      "Asteroids",
      "Comets",
      "Protecting Earth from Asteroid Impacts",
      "Meteoroid vs Asteroid vs Comet",
      "Check Yourself",
    ]);
    expect(scienceF2C13InteractiveBM.sections.map((s) => s.title)).toEqual([
      "Objek Lain dalam Sistem Suria",
      "Meteoroid, Meteor dan Meteorit",
      "Asteroid",
      "Komet",
      "Melindungi Bumi daripada Hentaman Asteroid",
      "Meteoroid vs Asteroid vs Komet",
      "Semak Diri",
    ]);
  });

  it("gives each object its own major section: definition, then characteristics first", () => {
    for (const [lang, content] of LANGS) {
      for (const index of [S.meteoroid, S.asteroid, S.comet]) {
        const section = content.sections[index];
        expect(section.conceptQuestion, `${lang} ${section.title}`).toBeTruthy();
        expect(section.intro, `${lang} ${section.title} one-sentence definition`).toMatch(
          /^[^.]+\.(\s|$)/,
        );
        expect(
          section.lessonFlow?.[0]?.kind,
          `${lang} ${section.title} opens on characteristics`,
        ).toBe("points");
      }
    }
  });

  it("keeps the introduction to three one-line orientation cards", () => {
    for (const [lang, content] of LANGS) {
      const intro = content.sections[S.intro];
      expect(intro.cards?.length, lang).toBe(3);
      expect(intro.lessonFlow, `${lang} intro carries no lesson`).toBeUndefined();
      for (const card of intro.cards ?? []) {
        // one sentence, and no characteristics: the numbers belong in the lessons
        expect(card.body.split(/\.\s/).length, `${lang} ${card.title}`).toBe(1);
        expect(card.body, `${lang} ${card.title} carries a characteristic`).not.toMatch(/\d/);
        expect(card.detail, `${lang} ${card.title}`).toBeUndefined();
      }
    }
  });

  it("does not interleave one object's facts into another object's lesson", () => {
    for (const [lang, content] of LANGS) {
      const text = (i: number) => all(content.sections[i]);
      // meteoroid-only facts
      expect(text(S.meteoroid), lang).toMatch(/42 km/);
      for (const i of [S.asteroid, S.comet])
        expect(text(i), `${lang} section ${i}`).not.toMatch(/42 km|Hoba/);
      // asteroid-only facts
      expect(text(S.asteroid), lang).toMatch(/Apollo/);
      for (const i of [S.meteoroid, S.comet])
        expect(text(i), `${lang} section ${i}`).not.toMatch(/Apollo|Ceres|−73°C/);
      // comet-only facts
      expect(text(S.comet), lang).toMatch(/Kuiper/);
      for (const i of [S.meteoroid, S.asteroid])
        expect(text(i), `${lang} section ${i}`).not.toMatch(/Kuiper|Oort|Halley|250,000/);
    }
  });

  it("does not keep the old combined characteristic cards or accordions", () => {
    for (const [lang, content] of LANGS) {
      for (const section of content.sections) {
        expect(section.accordions, `${lang} ${section.title}`).toBeUndefined();
      }
    }
  });

  it("gathers every check into the final Check Yourself section", () => {
    for (const [lang, content] of LANGS) {
      const last = content.sections.length - 1;
      expect(last, lang).toBe(S.check);
      content.sections.forEach((section, i) => {
        if (i === last) expect(section.checks.length, lang).toBeGreaterThanOrEqual(8);
        else expect(section.checks, `${lang} ${section.title}`).toEqual([]);
      });
    }
  });

  it("renders a Check yourself heading only where there are checks", () => {
    for (const [lang, content] of LANGS) {
      const l = lang === "bm" ? "bm" : "en";
      for (let i = 0; i < S.check; i += 1) {
        expect(sectionMarkup(content, l, i), `${lang} section ${i}`).not.toMatch(
          /Check yourself|Semak diri —/,
        );
      }
      expect(sectionMarkup(content, l, S.check)).toContain(content.sections[S.check].checksTitle!);
    }
  });
});

describe("Chapter 13 — BM / DLP parity", () => {
  function structureOf(part: LessonFlowPart): unknown {
    switch (part.kind) {
      case "points":
        return { kind: part.kind, items: part.items.length };
      case "figure":
        return {
          kind: part.kind,
          figure: part.figure,
          src: part.src,
          concepts: part.concepts.map((c) => c.id),
        };
      case "branchFlow":
        return {
          kind: part.kind,
          nodes: part.nodes.length,
          endings: part.endings.map((e) => ({ id: e.id, result: Boolean(e.result) })),
        };
      case "blog":
        return { kind: part.kind, src: part.src, points: part.points.length };
      case "asteroidBelt":
        return { kind: part.kind, items: part.items.map((i) => i.id) };
      case "crossingOrbits":
        return { kind: part.kind, orbits: part.orbits.map((o) => o.id) };
      case "cometOrigin":
        return { kind: part.kind, regions: part.regions.map((r) => r.id) };
      case "cometOrbit":
        return { kind: part.kind, stages: part.stages.length };
      case "contextCards":
        return {
          kind: part.kind,
          cards: part.cards.map((c) => ({
            id: c.id,
            body: Boolean(c.body),
            points: c.points?.length ?? 0,
          })),
        };
      case "processFlow":
        return { kind: part.kind, steps: part.steps.map((s) => s.id) };
      case "comparisonTable":
        return {
          kind: part.kind,
          columns: part.columns.map((c) => c.id),
          rows: part.rows.map((r) => ({ id: r.id, values: r.values.length })),
        };
      default:
        return { kind: part.kind };
    }
  }

  const shapeOf = (content: ScienceF2InteractiveContent) => ({
    sections: content.sections.map((s) => ({
      number: s.number,
      keys: Object.keys(s).sort(),
      cards: s.cards?.length ?? 0,
      checks: s.checks.length,
      parts: (s.lessonFlow ?? []).map(structureOf),
    })),
    keywords: content.keywords.length,
    miniQuiz: content.miniQuiz.length,
  });

  it("keeps BM and DLP structurally identical — same order, images, hotspots and interactions", () => {
    expect(shapeOf(scienceF2C13InteractiveBM)).toEqual(shapeOf(scienceF2C13InteractiveDLP));
  });

  it("uses the same numerical values in both languages", () => {
    const numbers = (content: ScienceF2InteractiveContent) =>
      [
        ...new Set(learnerStrings(content).flatMap((text) => text.match(/\d+(?:[.,]\d+)*/g) ?? [])),
      ].sort();
    expect(numbers(scienceF2C13InteractiveBM)).toEqual(numbers(scienceF2C13InteractiveDLP));
  });

  it("writes its own words for each language", () => {
    const dlp = learnerStrings(scienceF2C13InteractiveDLP);
    const bm = learnerStrings(scienceF2C13InteractiveBM);
    const shared = bm.filter(
      (text) => dlp.includes(text) && /\s/.test(text) && /[a-z]{4,}/i.test(text),
    );
    // only the object names themselves (identical in both languages) may coincide
    for (const text of shared) {
      expect(text, `untranslated: ${text}`).toMatch(
        /^(\S+ )?(Meteoroid|Asteroid|Meteor)$|^Meteoroid vs Asteroid vs/,
      );
    }
  });

  it("leaks no English into the BM chapter", () => {
    const ENGLISH = /\b(the|and|with|from|comet|shower|belt|cloud|tail|solar wind|meteorite)\b/i;
    for (const text of learnerStrings(scienceF2C13InteractiveBM)) {
      expect(ENGLISH.test(text), `English in BM: ${text}`).toBe(false);
    }
  });
});

describe("Chapter 13 — meteoroid size (the critical fix)", () => {
  it("never ships the impossible '10 m – 1 m' range on any learner surface", () => {
    for (const [name, surface] of SURFACES) {
      expect(all(surface), name).not.toMatch(/10 m (hingga|to) 1 m/i);
    }
  });

  it("states the textbook's 10 μm lower bound wherever the range appears", () => {
    // textbook printed p.271: "iaitu antara 10 μm hingga 1 m"
    for (const [name, surface] of SURFACES) {
      const text = all(surface);
      const ranges = text.match(/\d+\s*(?:μm|µm|m)\s*(?:hingga|to)\s*1 m/gi) ?? [];
      for (const r of ranges) {
        expect(r, `${name}: ${r}`).toMatch(/10\s*[μµ]m/);
      }
    }
  });

  it("keeps the asteroid range distinct from the meteoroid range", () => {
    for (const [lang, content] of LANGS) {
      expect(all(content.sections[S.meteoroid]), lang).toMatch(/10\s*[μµ]m/);
      expect(all(content.sections[S.asteroid]), lang).toMatch(/1[,. ]?000 ?km/);
    }
  });
});

describe("Chapter 13 — quiz bank", () => {
  it("ships 30 questions in each language, four options each", () => {
    for (const [lang, quiz] of QUIZZES) {
      expect(quiz.length, lang).toBe(30);
      for (const q of quiz) expect(q.options.length, `${lang} ${q.id}`).toBe(4);
    }
  });

  it("keys every question to a real option", () => {
    for (const [lang, quiz] of QUIZZES) {
      for (const q of quiz) {
        expect(q.answerIndex, `${lang} ${q.id}`).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex, `${lang} ${q.id}`).toBeLessThan(q.options.length);
        expect(new Set(q.options).size, `${lang} ${q.id} has duplicate options`).toBe(4);
      }
    }
  });

  it("q4 keys the meteoroid size range the textbook gives", () => {
    for (const [lang, quiz] of QUIZZES) {
      const q4 = quiz.find((q) => q.id.endsWith("-q4"))!;
      expect(q4.options[q4.answerIndex], `${lang} q4 key`).toMatch(
        /10\s*[μµ]m\s*(hingga|to)\s*1 m/,
      );
      expect(q4.explanation, `${lang} q4 explanation`).toMatch(/10\s*[μµ]m/);
    }
  });

  it("q21 compares the two printed temperatures and explains nothing the source does not", () => {
    const UNSOURCED =
      /lebih jauh daripada Matahari|farther from the Sun|berhampiran Bumi|near Earth|orbit dalam|inner orbits|bayang-bayang/i;
    for (const [lang, quiz] of QUIZZES) {
      const q21 = quiz.find((q) => q.id.endsWith("-q21"))!;
      const keyed = q21.options[q21.answerIndex];
      expect(keyed, `${lang} q21 key`).toMatch(/0°C/);
      expect(keyed, `${lang} q21 key`).toMatch(/−73°C/);
      expect(q21.explanation, `${lang} q21 explanation`).toMatch(/0°C/);
      expect(q21.explanation, `${lang} q21 explanation`).toMatch(/−73°C/);
      for (const text of [q21.question, q21.explanation, ...q21.options]) {
        expect(UNSOURCED.test(text), `${lang} q21 unsourced reasoning: ${text}`).toBe(false);
      }
    }
  });

  it("spreads the correct answer across all four positions", () => {
    for (const [lang, quiz] of QUIZZES) {
      const counts = [0, 0, 0, 0];
      for (const q of quiz) counts[q.answerIndex] += 1;
      for (let i = 0; i < 4; i += 1) {
        expect(counts[i], `${lang} position ${i} used ${counts[i]}x`).toBeGreaterThanOrEqual(5);
      }
      expect(Math.max(...counts) - Math.min(...counts), `${lang} spread`).toBeLessThanOrEqual(3);
    }
  });

  it("keeps BM and DLP keys and difficulty aligned question by question", () => {
    const [, bm] = QUIZZES[0];
    const [, dlp] = QUIZZES[1];
    expect(bm.length).toBe(dlp.length);
    for (let i = 0; i < bm.length; i += 1) {
      expect(dlp[i].answerIndex, `${bm[i].id} vs ${dlp[i].id} key`).toBe(bm[i].answerIndex);
      expect(dlp[i].difficulty, `${bm[i].id} vs ${dlp[i].id} difficulty`).toBe(bm[i].difficulty);
    }
  });

  it("balances difficulty across the bank", () => {
    for (const [lang, quiz] of QUIZZES) {
      const counts: Record<string, number> = {};
      for (const q of quiz) counts[q.difficulty] = (counts[q.difficulty] ?? 0) + 1;
      expect(counts, lang).toEqual({ Easy: 10, Medium: 10, Hard: 10 });
    }
  });
});

describe("Chapter 13 — the meteoroid / asteroid / comet distinction", () => {
  it("never says a meteoroid orbits the Sun", () => {
    // Rajah 13.1 (p.270) and p.272: asteroids and comets travel on their own
    // orbit around the Sun; a meteoroid "bergerak secara bebas di angkasa".
    const ORBITS =
      /(mengorbit Matahari|orbiting the Sun|orbits the Sun|mengelilingi Matahari mengikut orbitnya|on its own orbit around the Sun)/gi;
    const NEGATED = /\b(bukan|bukannya|tidak|not|never|no)\b[^.]{0,40}$/i;
    for (const [name, surface] of SURFACES) {
      for (const raw of all(surface).match(/"(?:[^"\\]|\\.)*"/g) ?? []) {
        if (!/meteoroid/i.test(raw)) continue;
        for (const m of raw.matchAll(ORBITS)) {
          const before = raw.slice(Math.max(0, (m.index ?? 0) - 60), m.index);
          if (/(asteroid|komet|comet)[^.]{0,60}$/i.test(before)) continue;
          if (NEGATED.test(before)) continue;
          expect.fail(`${name} says a meteoroid orbits the Sun: ${raw.slice(0, 140)}`);
        }
      }
    }
  });

  it("teaches that a meteoroid moves freely, influenced by nearby gravity", () => {
    for (const [lang, content] of LANGS) {
      const text = all(content.sections[S.meteoroid]);
      expect(text, lang).toMatch(/bebas di angkasa|freely through space|freely in outer space/i);
      expect(text, lang).toMatch(
        /graviti planet, bulan|gravit\w+ (pull|of) .{0,30}(planets|planet)/i,
      );
    }
  });
});

describe("Chapter 13 — meteoroid, meteor, meteorite", () => {
  it("never claims meteors burn up completely without the textbook's qualifier", () => {
    const ABSOLUTE =
      /(terbakar sepenuhnya|habis terbakar|burns? up completely|burnt up completely)/i;
    const HEDGE = /kebiasaan|kebanyakan|biasanya|usually|most\b/i;
    for (const [name, surface] of SURFACES) {
      for (const raw of all(surface).match(/"(?:[^"\\]|\\.)*"/g) ?? []) {
        if (!ABSOLUTE.test(raw)) continue;
        expect(HEDGE.test(raw), `${name} states it absolutely: ${raw.slice(0, 140)}`).toBe(true);
      }
    }
  });

  it("teaches the meteoroid before the meteor, with the journey image straight after the characteristics", () => {
    for (const [lang, content] of LANGS) {
      const kinds = partsIn(content, S.meteoroid).map((p) => p.kind);
      expect(kinds.slice(0, 3), lang).toEqual(["points", "figure", "branchFlow"]);
      const journey = figure(content, S.meteoroid, "meteoroid-journey");
      expect(journey.src, lang).toBe(SCIENCE_F2_CH13_IMAGES.meteoroidJourney);
      expect(
        journey.concepts.map((c) => c.id),
        lang,
      ).toEqual(["meteoroid", "meteor", "meteorite"]);
    }
  });

  it("defines meteor by atmospheric entry and meteorite by surviving to the surface", () => {
    for (const [lang, content] of LANGS) {
      const [meteoroid, meteor, meteorite] = figure(
        content,
        S.meteoroid,
        "meteoroid-journey",
      ).concepts;
      expect(meteoroid.note, lang).toMatch(lang === "bm" ? /angkasa/ : /space/);
      expect(meteor.note, lang).toMatch(
        lang === "bm" ? /memasuki atmosfera Bumi/ : /enters Earth's atmosphere/,
      );
      expect(meteorite.note, lang).toMatch(
        lang === "bm" ? /terselamat.*permukaan Bumi/ : /survives.*Earth's surface/,
      );
    }
  });

  it("forks the journey: meteor either burns up or survives to become a meteorite", () => {
    for (const [lang, content] of LANGS) {
      const flow = findPart(content, S.meteoroid, "branchFlow");
      expect(
        flow.nodes.map((n) => n.label),
        lang,
      ).toEqual(["Meteoroid", "Meteor"]);
      expect(
        flow.endings.map((e) => e.id),
        lang,
      ).toEqual(["burns-up", "survives"]);
      expect(flow.endings[0].result, `${lang} burning up leads nowhere`).toBeUndefined();
      expect(flow.endings[1].result?.label, lang).toBe(lang === "bm" ? "Meteorit" : "Meteorite");
    }
  });

  it("never puts meteor shower on the journey", () => {
    const SHOWER = /shower|hujan meteor|pancuran/i;
    for (const [lang, content] of LANGS) {
      expect(all(figure(content, S.meteoroid, "meteoroid-journey")), lang).not.toMatch(SHOWER);
      expect(all(findPart(content, S.meteoroid, "branchFlow")), lang).not.toMatch(SHOWER);
    }
    for (const [name, map] of [
      ["mindmap bm", scienceF2C13MindMapBM],
      ["mindmap dlp", scienceF2C13MindMapDLP],
    ] as const) {
      expect(all(map), name).not.toMatch(/meteor → (meteor shower|pancuran meteor|hujan meteor) →/);
    }
  });

  it("teaches meteor shower separately, after the journey, as many meteors at once", () => {
    for (const [lang, content] of LANGS) {
      const kinds = partsIn(content, S.meteoroid).map((p) => p.kind);
      expect(kinds.indexOf("meteorShower"), lang).toBeGreaterThan(kinds.indexOf("branchFlow"));
      const shower = findPart(content, S.meteoroid, "meteorShower");
      expect(shower.title, lang).toBe(lang === "bm" ? "Hujan Meteor" : "Meteor Shower");
      expect(shower.body, lang).toMatch(lang === "bm" ? /banyak meteor/ : /many meteors/);
      expect(shower.note, lang).toMatch(lang === "bm" ? /bukan satu peringkat/ : /not a stage/);
    }
  });

  it("draws the shower as many streaks inside the frame, with no meteorite", () => {
    expect(SHOWER_STREAKS.length).toBeGreaterThanOrEqual(10);
    for (const streak of SHOWER_STREAKS) {
      for (const p of [streak.start, streak.end]) {
        expect(p.x).toBeGreaterThan(0);
        expect(p.x).toBeLessThan(320);
        expect(p.y).toBeGreaterThan(30);
        expect(p.y).toBeLessThan(125);
      }
    }
  });

  it("uses 'hujan meteor' for the shower in BM", () => {
    expect(all(scienceF2C13InteractiveBM)).toMatch(/[Hh]ujan [Mm]eteor/);
  });
});

describe("Chapter 13 — Hoba Meteorite", () => {
  it("teaches Hoba once, inside the meteoroid lesson, on the resting-meteorite photograph", () => {
    for (const [lang, content] of LANGS) {
      const blog = findPart(content, S.meteoroid, "blog");
      expect(blog.src, lang).toBe(SCIENCE_F2_CH13_IMAGES.hobaMeteorite);
      const text = blog.points.join(" ");
      for (const fact of [/Grootfontein/, /Namibia/, /1920/, /80,000/])
        expect(text, lang).toMatch(fact);
      expect(text, lang).toMatch(lang === "bm" ? /tiada kawah besar/ : /no large crater/);
      expect(text, lang).toMatch(lang === "bm" ? /leper/ : /flat/);
      // the chapter-level blog no longer pairs Hoba with the space-scene banner
      expect(all(content.blogHighlight), lang).not.toMatch(/Hoba/);
      // every mention of Hoba lives in that one card
      expect(all(content).match(/Hoba/g)?.length, lang).toBe(all(blog).match(/Hoba/g)?.length);
    }
  });
});

describe("Chapter 13 — asteroids", () => {
  it("lists the textbook characteristics", () => {
    for (const [lang, content] of LANGS) {
      const text = findPart(content, S.asteroid, "points").items.join(" | ");
      for (const fact of [
        /1 m (hingga|to) 1,000 km/,
        /−73°C/,
        /25 km s⁻¹/,
        /Ceres, Pallas, Juno (dan|and) Vesta/,
      ]) {
        expect(text, lang).toMatch(fact);
      }
      expect(text, lang).toMatch(lang === "bm" ? /besi dan nikel/ : /iron and nickel/);
      expect(text, lang).toMatch(lang === "bm" ? /Marikh dengan Musytari/ : /Mars and Jupiter/);
      expect(text, lang).toMatch(lang === "bm" ? /planet kecil/ : /small planets/);
    }
  });

  it("draws the belt strictly between the Mars and Jupiter orbits, with many bodies", () => {
    expect(ORBIT_R.beltInner).toBeGreaterThan(ORBIT_R.mars);
    expect(ORBIT_R.beltOuter).toBeLessThan(ORBIT_R.jupiter);
    expect(ORBIT_R.earth).toBeLessThan(ORBIT_R.mars);
    expect(BELT_ROCKS.length).toBeGreaterThanOrEqual(100);
    for (const rock of BELT_ROCKS) {
      expect(rock.r).toBeGreaterThan(ORBIT_R.beltInner);
      expect(rock.r).toBeLessThan(ORBIT_R.beltOuter);
    }
  });

  it("lets the learner select Mars, the belt and Jupiter", () => {
    for (const [lang, content] of LANGS) {
      const belt = findPart(content, S.asteroid, "asteroidBelt");
      expect(
        belt.items.map((i) => i.id),
        lang,
      ).toEqual(["mars", "belt", "jupiter"]);
      expect(
        belt.items.map((i) => i.label),
        lang,
      ).toEqual(
        lang === "bm"
          ? ["Marikh", "Jalur asteroid", "Musytari"]
          : ["Mars", "Asteroid belt", "Jupiter"],
      );
      const markup = renderToStaticMarkup(
        <AsteroidBeltFigure block={belt} lang={lang === "bm" ? "bm" : "en"} />,
      );
      expect(markup.match(/aria-pressed="true"/g)?.length, lang).toBe(1);
      expect(markup, lang).toContain('data-active="belt"');
      expect(markup, `${lang} no Venus clutter`).not.toMatch(/Venus|Zuhrah/);
    }
  });

  it("draws Apollo, Amor and Aten all at once — compact and static, nothing to tap", () => {
    // The orbit-cleanup pass removed the one-at-a-time toggle, the crossing
    // and closest-approach markers, and the legend underneath: a Form 2
    // learner only needs to see that three orbits exist outside the belt and
    // that they sit differently against Earth's own, not tap through them.
    for (const [lang, content] of LANGS) {
      const block = findPart(content, S.asteroid, "crossingOrbits");
      expect(
        block.orbits.map((o) => o.label),
        lang,
      ).toEqual(["Apollo", "Amor", "Aten"]);
      const markup = renderToStaticMarkup(
        <CrossingOrbitsFigure block={block} lang={lang === "bm" ? "bm" : "en"} />,
      );
      // all three orbits drawn, none selected/dimmed, no buttons at all
      expect(markup.match(/data-orbit="(apollo|amor|aten)"/g)?.length, lang).toBe(3);
      expect(markup, `${lang} still has a selected/dimmed state`).not.toMatch(/data-selected=/);
      expect(markup, `${lang} still shows crossing markers`).not.toMatch(/data-marker=/);
      expect(markup, `${lang} still offers a tap control`).not.toMatch(/<button/);
      // rendered markup HTML-escapes apostrophes, so check the first sentence
      // (which has none) rather than the whole explanation
      const explanationLead = block.explanation.split(".")[0]!;
      expect(markup, lang).toContain(explanationLead);
    }
  });

  it("computes where each orbit meets Earth's: Apollo and Aten cross, Amor only comes close", () => {
    const onEllipse = (
      g: ReturnType<typeof crossingOrbitGeometry>,
      p: { x: number; y: number },
    ) => {
      const a = (-g.rotation * Math.PI) / 180;
      const dx = p.x - g.centre.x;
      const dy = p.y - g.centre.y;
      const x = dx * Math.cos(a) - dy * Math.sin(a);
      const y = dx * Math.sin(a) + dy * Math.cos(a);
      return (x * x) / (g.rx * g.rx) + (y * y) / (g.ry * g.ry);
    };
    for (const id of ["apollo", "aten"] as const) {
      const g = crossingOrbitGeometry(id);
      expect(g.intersections, id).toHaveLength(2);
      for (const p of g.intersections) {
        expect(Math.hypot(p.x - g.sun.x, p.y - g.sun.y), `${id} on Earth's orbit`).toBeCloseTo(
          EARTH_ORBIT_PX,
          6,
        );
        expect(onEllipse(g, p), `${id} on its own orbit`).toBeCloseTo(1, 6);
      }
      expect(g.nearestDistance, id).toBeLessThan(1);
      expect(g.farthestDistance, id).toBeGreaterThan(1);
    }
    expect(CROSSING_ORBIT_ELEMENTS.apollo.a).toBeGreaterThan(1);
    expect(CROSSING_ORBIT_ELEMENTS.aten.a).toBeLessThan(1);
    const amor = crossingOrbitGeometry("amor");
    expect(amor.crosses).toBe(false);
    expect(amor.nearestDistance).toBeGreaterThan(1);
    expect(amor.nearestDistance).toBeLessThan(1.3);
  });

  it("keeps every orbit inside the canvas", () => {
    for (const id of ["apollo", "amor", "aten"] as const) {
      const g = crossingOrbitGeometry(id);
      const reach = g.farthestDistance * EARTH_ORBIT_PX;
      expect(g.sun.x - reach, id).toBeGreaterThan(8);
      expect(g.sun.x + reach, id).toBeLessThan(CROSSING_ORBIT_VIEWBOX.width - 8);
      expect(g.sun.y - reach, id).toBeGreaterThan(8);
      expect(g.sun.y + reach, id).toBeLessThan(CROSSING_ORBIT_VIEWBOX.height - 8);
    }
  });

  it("teaches one shared idea in words — visual understanding, not per-orbit classification", () => {
    // The master remediation over-taught each orbit's own definition ("Aten
    // lies mostly inside Earth's orbit..."). It became one shared sentence
    // for all three orbits, then the orbit-cleanup pass moved that sentence
    // off the (now removed) per-orbit selection panel onto the block itself,
    // so there is exactly one `explanation`, not one note per orbit.
    for (const [lang, content] of LANGS) {
      const block = findPart(content, S.asteroid, "crossingOrbits");
      const SHARED =
        lang === "bm"
          ? /contoh orbit asteroid di luar jalur asteroid/
          : /examples of asteroid orbits outside the asteroid belt/;
      expect(block.explanation, lang).toMatch(SHARED);
      expect(block.explanation, `${lang} still over-explains one orbit`).not.toMatch(
        /mostly (outside|inside) Earth's orbit|kebanyakannya terletak/i,
      );
    }
  });

  it("teaches collision, then the resulting crater — never an incoming asteroid", () => {
    for (const [lang, content] of LANGS) {
      const kinds = partsIn(content, S.asteroid).map((p) => p.kind);
      const heading = findPart(content, S.asteroid, "heading");
      expect(heading.title, lang).toBe(
        lang === "bm"
          ? "Apabila Asteroid Berlanggar dengan Bumi"
          : "When an Asteroid Collides with Earth",
      );
      expect(kinds.indexOf("heading"), lang).toBeLessThan(
        partsIn(content, S.asteroid).findIndex((p) => p.kind === "figure"),
      );
      const crater = figure(content, S.asteroid, "impact-crater");
      expect(crater.title, lang).toBe(lang === "bm" ? "Kesan Hentaman" : "Impact Effects");
      expect(crater.src, lang).toBe(SCIENCE_F2_CH13_IMAGES.impactCrater);
      expect(crater.caption, lang).toMatch(
        lang === "bm" ? /bukan asteroid itu sendiri/ : /not the asteroid itself/,
      );
      // One simple concept, not a crater-anatomy lesson: no floor, rim or
      // rock-layer hotspots to memorise, just "a large impact can form a
      // crater on Earth's surface".
      expect(
        crater.concepts.map((c) => c.id),
        lang,
      ).toEqual(["crater"]);
      expect(crater.concepts[0].note, lang).toMatch(
        lang === "bm" ? /membentuk kawah/ : /can form a crater/,
      );
      expect(crater.alt, `${lang} alt describes a crater`).toMatch(
        lang === "bm" ? /kawah/i : /crater/i,
      );
    }
  });

  it("gives the Arizona crater and a cautious dinosaur explanation", () => {
    for (const [lang, content] of LANGS) {
      const cards = findPart(content, S.asteroid, "contextCards").cards;
      const arizona = cards.find((c) => c.id === "arizona")!;
      expect(arizona.points?.join(" "), lang).toMatch(/50,000/);
      expect(arizona.points?.join(" "), lang).toMatch(/1\.2 km/);
      const dinosaurs = cards.find((c) => c.id === "dinosaurs")!;
      expect(dinosaurs.body, lang).toMatch(
        lang === "bm" ? /Satu penjelasan saintifik/ : /One scientific explanation/,
      );
      expect(dinosaurs.body, lang).toMatch(/10 km/);
      expect(dinosaurs.body, `${lang} no certainty claim`).not.toMatch(
        /proved|proven|certainly|terbukti|pasti/i,
      );
    }
  });
});

describe("Chapter 13 — comets", () => {
  it("lists the textbook characteristics before any movement", () => {
    for (const [lang, content] of LANGS) {
      const text = findPart(content, S.comet, "points").items.join(" | ");
      for (const fact of [/250,000 km/, /150,000,000 km/, /10 km s⁻¹ (hingga|to) 70 km s⁻¹/]) {
        expect(text, lang).toMatch(fact);
      }
      expect(text, lang).toMatch(lang === "bm" ? /kepala dan ekor/ : /head and a tail/);
      expect(text, lang).toMatch(lang === "bm" ? /elips/ : /elliptical/);
      expect(text, lang).toMatch(lang === "bm" ? /ais, debu/ : /ice, dust/);
      const kinds = partsIn(content, S.comet).map((p) => p.kind);
      expect(kinds.indexOf("points"), lang).toBeLessThan(kinds.indexOf("cometOrbit"));
    }
  });

  it("teaches Head, Tail and Solar Wind on the approved comet image — not nucleus/coma", () => {
    // The textbook's own vocabulary is HEAD and TAIL. "Nucleus" and "coma" are
    // no longer required student vocabulary, so the two are taught together
    // as one concept, "Head", on the same artwork.
    for (const [lang, content] of LANGS) {
      const anatomy = figure(content, S.comet, "comet-anatomy");
      expect(anatomy.src, lang).toBe(SCIENCE_F2_CH13_IMAGES.cometAnatomy);
      expect(
        anatomy.concepts.map((c) => c.id),
        lang,
      ).toEqual(["head", "tail", "solar-wind"]);
      expect(
        anatomy.concepts.map((c) => c.label),
        lang,
      ).toEqual(lang === "bm" ? ["Kepala", "Ekor", "Angin Suria"] : ["Head", "Tail", "Solar Wind"]);
      const wind = anatomy.concepts[2];
      expect(wind.note, lang).toMatch(lang === "bm" ? /menjauhi Matahari/ : /away from the Sun/);
    }
  });

  it("never explains the tail as simply trailing behind a moving comet", () => {
    for (const [lang, content] of LANGS) {
      const texts = learnerStrings(content.sections[S.comet]);
      for (const text of texts) {
        if (lang === "dlp" && /trail/i.test(text))
          expect(text, lang).toMatch(/does not simply trail|not simply/);
        if (lang === "bm" && /mengekori/i.test(text))
          expect(text, lang).toMatch(/bukan sekadar mengekori/);
      }
    }
  });

  it("names the Kuiper Belt and the Oort Cloud and draws them nested beyond the planets", () => {
    for (const [lang, content] of LANGS) {
      const origin = findPart(content, S.comet, "cometOrigin");
      expect(
        origin.regions.map((r) => r.label),
        lang,
      ).toEqual(lang === "bm" ? ["Jalur Kuiper", "Awan Oort"] : ["Kuiper Belt", "Oort Cloud"]);
    }
    expect(COMET_ORIGIN_R.kuiperInner).toBeGreaterThan(COMET_ORIGIN_R.neptune);
    expect(COMET_ORIGIN_R.oortInner).toBeGreaterThan(COMET_ORIGIN_R.kuiperOuter);
  });

  it("steps through three named positions, one stage text per position", () => {
    // The orbit-cleanup pass dropped the five numbered positions for three
    // named ones: far from the Sun, near the Sun, moving away — enough to
    // teach the concept without turning it into a geometry exercise.
    expect(COMET_STOP_COUNT).toBe(3);
    for (const [lang, content] of LANGS) {
      const stages = findPart(content, S.comet, "cometOrbit").stages;
      expect(stages, lang).toHaveLength(COMET_STOP_COUNT);
      expect(
        stages.map((s) => s.label),
        lang,
      ).toEqual(
        lang === "bm"
          ? ["Jauh dari Matahari", "Berhampiran Matahari", "Bergerak menjauhi Matahari"]
          : ["Far from the Sun", "Near the Sun", "Moving away"],
      );
    }
  });

  it("points the comet tail away from the Sun at every orbital position", () => {
    for (let i = 0; i < COMET_STOP_COUNT; i += 1) {
      const g = cometGeometry(i);
      const awayX = g.comet.x - g.sun.x;
      const awayY = g.comet.y - g.sun.y;
      const mag = Math.hypot(awayX, awayY);
      const cosine = (g.tail.ux * awayX + g.tail.uy * awayY) / mag;
      expect(cosine, `position ${i + 1} tail is not anti-sunward`).toBeCloseTo(1, 6);
    }
  });

  it("does not tie tail direction to travel direction: the tail trails inbound and leads outbound", () => {
    // "Far from the Sun" is deliberately not the exact aphelion: at aphelion
    // and perihelion the tail sits perpendicular to travel (dot 0), which
    // would not prove the tail is Sun-relative rather than travel-relative.
    const dots = Array.from({ length: COMET_STOP_COUNT }, (_, i) => {
      const g = cometGeometry(i);
      return g.tail.ux * g.travel.ux + g.tail.uy * g.travel.uy;
    });
    expect(Math.min(...dots), "some position where the tail is behind the comet").toBeLessThan(
      -0.3,
    );
    expect(Math.max(...dots), "some position where the tail is ahead of the comet").toBeGreaterThan(
      0.3,
    );
  });

  it("keeps the whole comet and its whole tail inside the viewBox at every position", () => {
    const { width, height } = COMET_VIEWBOX;
    const MARGIN = 8;
    for (let i = 0; i < COMET_STOP_COUNT; i += 1) {
      const g = cometGeometry(i);
      const tipX = g.comet.x + g.tail.ux * g.tailLength;
      const tipY = g.comet.y + g.tail.uy * g.tailLength;
      for (const [label, x, y] of [
        ["head", g.comet.x, g.comet.y],
        ["tail tip", tipX, tipY],
      ] as const) {
        expect(x, `position ${i + 1} ${label}`).toBeGreaterThanOrEqual(MARGIN);
        expect(x, `position ${i + 1} ${label}`).toBeLessThanOrEqual(width - MARGIN);
        expect(y, `position ${i + 1} ${label}`).toBeGreaterThanOrEqual(MARGIN);
        expect(y, `position ${i + 1} ${label}`).toBeLessThanOrEqual(height - MARGIN);
      }
    }
  });

  it("grows the coma and tail nearer the Sun, as the source describes", () => {
    const stops = Array.from({ length: COMET_STOP_COUNT }, (_, i) => cometGeometry(i));
    const nearest = stops.reduce((a, b) => (a.distanceToSun <= b.distanceToSun ? a : b));
    const farthest = stops.reduce((a, b) => (a.distanceToSun >= b.distanceToSun ? a : b));
    expect(nearest.tailLength).toBeGreaterThan(farthest.tailLength);
    expect(nearest.comaRadius).toBeGreaterThan(farthest.comaRadius);
    expect(nearest.isNear).toBe(true);
    expect(farthest.isNear).toBe(false);
    // position 2 ("Near the Sun", 180°) is the nearest of the three
    expect(stops.indexOf(nearest)).toBe(1);
  });

  it("states the tail rule the way the source does", () => {
    for (const [lang, content] of LANGS) {
      expect(findPart(content, S.comet, "cometOrbit").tailRule, lang).toMatch(
        lang === "bm" ? /menjauhi Matahari.*angin suria/ : /away from the Sun.*solar wind/,
      );
    }
  });

  it("covers Halley's Comet and collision risk from outer-planet gravity", () => {
    for (const [lang, content] of LANGS) {
      const text = all(content.sections[S.comet]);
      expect(text, lang).toMatch(/1986/);
      expect(text, lang).toMatch(/2061/);
      const risk = findPart(content, S.comet, "heading");
      expect(risk.body, lang).toMatch(
        lang === "bm" ? /graviti planet-planet luar/ : /gravitational pull of the outer planets/,
      );
      // Textbook-level wording only: the gravitational disturbance and the
      // possible collision, without an added "this is very rare" aside.
      expect(risk.body, lang).toMatch(
        lang === "bm" ? /berlanggar dengan.*Bumi/ : /collide with.*Earth/,
      );
      expect(risk.body, `${lang} still adds an unneeded rarity aside`).not.toMatch(
        lang === "bm" ? /jarang berlaku/ : /(very|extremely) rare/,
      );
    }
  });
});

describe("Chapter 13 — protecting Earth", () => {
  it("is a visible section with a simplified three-step process, not an accordion", () => {
    // The five-step detect -> track -> assess -> warn -> deflect workflow was
    // more elaborate than Form 2 needs. It is now exactly three conceptual
    // steps: monitor, warn, change course.
    for (const [lang, content] of LANGS) {
      const section = content.sections[S.protect];
      expect(section.accordions, lang).toBeUndefined();
      const flow = findPart(content, S.protect, "processFlow");
      expect(
        flow.steps.map((s) => s.id),
        lang,
      ).toEqual(["monitor", "warn", "change-course"]);
      const [monitor, warn, changeCourse] = flow.steps;
      expect(monitor.note, lang).toMatch(lang === "bm" ? /[Mm]emantau/ : /[Mm]onitor/);
      expect(warn.note, lang).toMatch(lang === "bm" ? /[Aa]maran/ : /[Ww]arnings/);
      expect(changeCourse.note, lang).toMatch(
        lang === "bm" ? /diubah lalunya|ubah haluan/ : /course changed/,
      );
    }
  });

  it("removes the detailed detection/tracking workflow and the 'rare' and 'last resort' asides", () => {
    for (const [lang, content] of LANGS) {
      const text = all(content.sections[S.protect]);
      expect(text, `${lang} still has a separate tracking step`).not.toMatch(
        /\btrack\b|\bmenjejak\b|\bassess\b|\bmenilai\b/i,
      );
      expect(text, `${lang} still says collisions are rare`).not.toMatch(/\brare\b|\bjarang\b/i);
      expect(text, `${lang} still says "as a last resort"`).not.toMatch(
        /as a last resort|pilihan terakhir/i,
      );
    }
  });

  it("stays conceptual — no weapon or explosive detail", () => {
    for (const [lang, content] of LANGS) {
      expect(all(content.sections[S.protect]), lang).not.toMatch(
        /nuclear|nuklear|explosi|letupan|\bbomb|\bbom\b|missile|peluru|warhead|kinetic impactor/i,
      );
    }
  });
});

describe("Chapter 13 — final comparison", () => {
  it("compares all three objects on the five agreed features", () => {
    // Movement and orbit were two separate rows saying related things; the
    // simplification pass merged them into one "Movement / Orbit" row, so the
    // table now matches exactly: composition, size, movement/orbit, key
    // feature, possible effect on Earth.
    for (const [lang, content] of LANGS) {
      const table = findPart(content, S.compare, "comparisonTable");
      expect(
        table.columns.map((c) => c.id),
        lang,
      ).toEqual(["meteoroid", "asteroid", "comet"]);
      expect(
        table.rows.map((r) => r.id),
        lang,
      ).toEqual(["composition", "size", "movement", "feature", "effect"]);
      for (const row of table.rows) {
        expect(row.values, `${lang} ${row.id}`).toHaveLength(3);
        for (const value of row.values)
          expect(value.trim().length, `${lang} ${row.id}`).toBeGreaterThan(10);
      }
      // not just "small / medium / large"
      const composition = table.rows[0].values;
      expect(composition[2], lang).toMatch(lang === "bm" ? /[Aa]is/ : /[Ii]ce/);
    }
  });

  it("drops 'coma' as required comparison-table terminology", () => {
    for (const [lang, content] of LANGS) {
      const table = findPart(content, S.compare, "comparisonTable");
      expect(all(table), `${lang} still names coma in the table`).not.toMatch(/\bcoma\b|\bkoma\b/i);
    }
  });
});

describe("Chapter 13 — approved images", () => {
  const PUBLIC_ROOT = resolve(process.cwd(), "public");

  it("ships four WebPs in the Chapter 13 folder, with no PNG beside them", () => {
    const srcs = Object.values(SCIENCE_F2_CH13_IMAGES);
    expect(srcs).toHaveLength(4);
    for (const src of srcs) {
      expect(src).toMatch(/^\/science\/form2\/chapter-13\/science-f2-ch13-[a-z-]+\.webp$/);
      const file = resolve(PUBLIC_ROOT, src.replace(/^\//, ""));
      expect(existsSync(file), src).toBe(true);
      expect(statSync(file).size, src).toBeGreaterThan(20_000);
      expect(existsSync(file.replace(/\.webp$/, ".png")), `${src} png duplicate`).toBe(false);
    }
  });

  it("uses each image exactly once per language, in the same place in BM and DLP", () => {
    const placed = (content: ScienceF2InteractiveContent) =>
      content.sections.flatMap((section, s) =>
        (section.lessonFlow ?? []).flatMap((part, p) =>
          "src" in part ? [`${part.src}@${s}.${p}`] : [],
        ),
      );
    const bm = placed(scienceF2C13InteractiveBM);
    const dlp = placed(scienceF2C13InteractiveDLP);
    expect(bm).toEqual(dlp);
    expect(bm.map((entry) => entry.split("@")[0]).sort()).toEqual(
      Object.values(SCIENCE_F2_CH13_IMAGES).sort(),
    );
  });

  it("keeps every hotspot inside the artwork and in the taught order", () => {
    for (const [id, geometry] of Object.entries(CH13_FIGURE_GEOMETRY)) {
      expect(geometry.aspect, id).toBe("2 / 1");
      expect(Object.keys(geometry.regions), id).toEqual([
        ...CH13_FIGURE_ORDER[id as keyof typeof CH13_FIGURE_ORDER],
      ]);
      for (const [region, shapes] of Object.entries(geometry.regions)) {
        expect(shapes.length, `${id} ${region}`).toBeGreaterThan(0);
        for (const shape of shapes) {
          const box =
            shape.kind === "ellipse"
              ? [shape.cx - shape.rx, shape.cy - shape.ry, shape.cx + shape.rx, shape.cy + shape.ry]
              : shape.kind === "rect"
                ? [shape.x, shape.y, shape.x + shape.w, shape.y + shape.h]
                : (() => {
                    const pts = shape.points
                      .split(/\s+/)
                      .map((pair) => pair.split(",").map(Number));
                    const xs = pts.map((p) => p[0]);
                    const ys = pts.map((p) => p[1]);
                    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
                  })();
          for (const v of box) {
            expect(v, `${id} ${region}`).toBeGreaterThanOrEqual(0);
            expect(v, `${id} ${region}`).toBeLessThanOrEqual(100);
          }
        }
      }
    }
    for (const [lang, content] of LANGS) {
      for (const [s, id] of [
        [S.meteoroid, "meteoroid-journey"],
        [S.asteroid, "impact-crater"],
        [S.comet, "comet-anatomy"],
      ] as const) {
        expect(
          figure(content, s, id).concepts.map((c) => c.id),
          `${lang} ${id}`,
        ).toEqual([...CH13_FIGURE_ORDER[id]]);
      }
    }
  });

  it("lights up the whole head — the same solid-core-inside-a-glow shapes the artwork always had", () => {
    // "Nucleus" and "coma" are no longer separately selectable concepts, but
    // the head region still nests the same two shapes: a small solid-core
    // ellipse strictly inside a larger glow ellipse, so both light up as one.
    const [core, glow] = CH13_FIGURE_GEOMETRY["comet-anatomy"].regions.head;
    if (core.kind !== "ellipse" || glow.kind !== "ellipse") throw new Error("expected ellipses");
    expect(core.cx - core.rx).toBeGreaterThan(glow.cx - glow.rx);
    expect(core.cx + core.rx).toBeLessThan(glow.cx + glow.rx);
    expect(core.cy - core.ry).toBeGreaterThan(glow.cy - glow.ry);
    expect(core.cy + core.ry).toBeLessThan(glow.cy + glow.ry);
  });
});

describe("Chapter 13 — rendering", () => {
  it("renders every section in both languages, with the parts in authored order", () => {
    for (const [lang, content] of LANGS) {
      const l = lang === "bm" ? "bm" : "en";
      content.sections.forEach((section, i) => {
        const markup = sectionMarkup(content, l, i);
        const rendered = [...markup.matchAll(/data-lesson-part="([a-zA-Z]+)"/g)].map((m) => m[1]);
        expect(rendered, `${lang} ${section.title}`).toEqual(
          (section.lessonFlow ?? []).map((p) => p.kind),
        );
      });
    }
  });

  it("renders the approved images as interactive spotlight figures with controls", () => {
    for (const [lang, content] of LANGS) {
      const l = lang === "bm" ? "bm" : "en";
      const meteoroid = sectionMarkup(content, l, S.meteoroid);
      expect(meteoroid, lang).toContain(`src="${SCIENCE_F2_CH13_IMAGES.meteoroidJourney}"`);
      expect(meteoroid, lang).toContain('data-ch13-figure="meteoroid-journey"');
      expect(meteoroid, lang).toContain(`src="${SCIENCE_F2_CH13_IMAGES.hobaMeteorite}"`);
      expect(meteoroid, lang).toContain('data-ch13-figure="meteor-shower"');
      const asteroid = sectionMarkup(content, l, S.asteroid);
      expect(asteroid, lang).toContain('data-ch13-figure="impact-crater"');
      expect(asteroid, lang).toContain('data-ch13-figure="asteroid-belt"');
      expect(asteroid, lang).toContain('data-ch13-figure="crossing-orbits"');
      const comet = sectionMarkup(content, l, S.comet);
      expect(comet, lang).toContain('data-ch13-figure="comet-anatomy"');
      expect(comet, lang).toContain('data-ch13-figure="comet-origin"');
      expect(comet, lang).toMatch(lang === "bm" ? /angin suria/ : /solar wind/);
      for (const markup of [meteoroid, asteroid, comet]) {
        expect(markup, lang).toMatch(/aria-pressed="true"/);
        expect(markup, lang).not.toContain('src=""');
        expect(markup, lang).not.toMatch(/chapter-13\/[^"]*\.png/);
      }
      expect(sectionMarkup(content, l, S.protect), lang).toContain("data-process-flow");
      expect(sectionMarkup(content, l, S.compare), lang).toContain("data-comparison-table");
    }
  });

  it("renders the comet orbit figure opening at position 1, with a comet sprite instead of a travel arrow", () => {
    const block = findPart(scienceF2C13InteractiveDLP, S.comet, "cometOrbit");
    const markup = renderToStaticMarkup(<CometOrbitFigure block={block} lang="en" />);
    expect(markup).toContain('data-position="1"');
    expect(markup).toContain("data-comet-tail");
    // the direction-of-travel arrow — a small white triangle beside the
    // comet — is gone; the geometry it demonstrated is still asserted
    // against `cometGeometry(...).travel` above, just not drawn any more
    expect(markup, "still draws the removed travel arrow").not.toContain("data-travel-arrow");
  });
});

describe("Chapter 13 — learner-facing hygiene", () => {
  it("keeps BM and DLP decks at the same size with the same ids", () => {
    const [, bm] = DECKS[0];
    const [, dlp] = DECKS[1];
    expect(bm.length).toBe(dlp.length);
    expect(bm.map((c) => c.id.replace("-bm-", "-"))).toEqual(
      dlp.map((c) => c.id.replace("-dlp-", "-")),
    );
  });

  it("never tells a learner to look at the textbook instead", () => {
    for (const [name, surface] of SURFACES) {
      expect(all(surface), name).not.toMatch(
        /rujuk gambar rajah|buku teks|see diagram in textbook|in the textbook|the textbook/i,
      );
    }
  });

  it("never exposes DSKP, standard numbers or textbook page citations", () => {
    for (const [name, surface] of SURFACES) {
      const text = all(surface);
      expect(text, name).not.toMatch(/DSKP|Standard Pembelajaran|Standard Kandungan|Jadual 9/);
      expect(text, name).not.toMatch(/\bSP 13\.|\bSK 13\./);
      expect(text, name).not.toMatch(/Aktiviti 13\.|Latihan (Formatif|Sumatif)/);
      expect(text, name).not.toMatch(/\bms\. ?2[67]\d|halaman 2[67]\d/);
    }
  });

  it("does not import astronomy the textbook never prints", () => {
    for (const [name, surface] of SURFACES) {
      const text = all(surface);
      expect(text, name).not.toMatch(/Kepler/i);
      expect(text, name).not.toMatch(
        /kemusnahan setempat|localized destruction|localised destruction/i,
      );
      expect(text, name).not.toMatch(/mass extinction threshold/i);
    }
  });

  it("marks every drawn orbit diagram as not to scale", () => {
    for (const [lang, content] of LANGS) {
      for (const [section, kind] of [
        [S.asteroid, "asteroidBelt"],
        [S.asteroid, "crossingOrbits"],
        [S.comet, "cometOrigin"],
        [S.comet, "cometOrbit"],
      ] as const) {
        const part = findPart(content, section, kind) as { scaleNote: string };
        expect(part.scaleNote, `${lang} ${kind}`).toMatch(
          /tidak mengikut skala|not to true scale/i,
        );
      }
    }
  });

  it("uses the agreed BM terms on every BM surface", () => {
    for (const [name, surface] of [
      ["interactive bm", scienceF2C13InteractiveBM],
      ["quizzes bm", scienceF2C13QuizzesBM],
      ["flashcards bm", scienceF2C13FlashcardsBM],
      ["mindmap bm", scienceF2C13MindMapBM],
    ] as const) {
      expect(all(surface), name).not.toMatch(
        /[Ll]ingkaran (Asteroid|asteroid|Kuiper)|[Aa]ngin solar|awan Oort/,
      );
    }
    const bm = all(scienceF2C13InteractiveBM);
    for (const term of [
      /jalur asteroid/i,
      /Jalur Kuiper/,
      /Awan Oort/,
      /[Aa]ngin [Ss]uria/,
      /[Hh]ujan [Mm]eteor/,
      /Meteorit\b/,
      /Komet/,
    ]) {
      expect(bm).toMatch(term);
    }
  });
});
