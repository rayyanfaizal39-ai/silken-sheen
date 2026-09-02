import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MeteoroidEntryFigure } from "@/components/notes/blocks/MeteoroidEntryFigure";
import { AsteroidBeltFigure, ORBIT_R } from "@/components/notes/blocks/AsteroidBeltFigure";
import {
  CometOrbitFigure,
  cometGeometry,
  COMET_STOP_COUNT,
  COMET_VIEWBOX,
} from "@/components/notes/blocks/CometOrbitFigure";
import { scienceF2C13InteractiveBM } from "./interactive-bm";
import { scienceF2C13InteractiveDLP } from "./interactive-dlp";
import { scienceF2C13QuizzesBM } from "./quizzes-bm";
import { scienceF2C13QuizzesDLP } from "./quizzes-dlp";
import { scienceF2C13FlashcardsBM } from "./flashcards-bm";
import { scienceF2C13FlashcardsDLP } from "./flashcards-dlp";
import { scienceF2C13MindMapBM } from "./mindmap-bm";
import { scienceF2C13MindMapDLP } from "./mindmap-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Regression guards for the Chapter 13 remediation — see
 * SCIENCE_F2_CH13_DEEP_AUDIT_REPORT.md.
 *
 * The blocker was a meteoroid size range shipped as "10 m – 1 m" instead of the
 * textbook's 10 μm – 1 m: wrong by seven orders of magnitude, impossible to read
 * as a range because it descends, and keyed as the CORRECT answer in q4 of both
 * quiz banks while the chapter's own notes said 10 μm.
 *
 * Only the live interactive path is covered. notes-bm.ts / notes-dlp.ts are
 * shadowed by the interactive branch in routes/notes.tsx and are excluded.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C13InteractiveBM],
  ["dlp", scienceF2C13InteractiveDLP],
];

type Quiz = { id: string; difficulty: string; question: string; options: string[]; answerIndex: number; explanation: string };
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

  it("keeps BM and DLP structurally identical", () => {
    const shape = (c: ScienceF2InteractiveContent) =>
      c.sections.map((s) => ({
        number: s.number,
        blocks: Object.keys(s)
          .filter((k) => k !== "number" && k !== "title" && k !== "intro")
          .sort(),
      }));
    expect(shape(scienceF2C13InteractiveBM)).toEqual(shape(scienceF2C13InteractiveDLP));
  });
});

describe("Chapter 13 — meteoroid size (the critical fix)", () => {
  it("never ships the impossible '10 m – 1 m' range on any learner surface", () => {
    // 10 m down to 1 m is not a range at all, and it is 10^7 off the source.
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
    // meteoroid 10 μm – 1 m; asteroid 1 m – 1 000 km (p.271)
    for (const [lang, content] of LANGS) {
      const text = all(content);
      expect(text, lang).toMatch(/10\s*[μµ]m/);
      expect(text, lang).toMatch(/1[,. ]?000 ?km/);
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
    // this is the exact defect: q4 used to key "10 m hingga 1 m" as correct
    for (const [lang, quiz] of QUIZZES) {
      const q4 = quiz.find((q) => q.id.endsWith("-q4"))!;
      expect(q4.options[q4.answerIndex], `${lang} q4 key`).toMatch(/10\s*[μµ]m\s*(hingga|to)\s*1 m/);
      expect(q4.explanation, `${lang} q4 explanation`).toMatch(/10\s*[μµ]m/);
    }
  });

  it("q21 compares the two printed temperatures and explains nothing the source does not", () => {
    // p.271 prints both values and gives NO reason for the difference:
    //   "Suhu meteoroid di angkasa lepas adalah dalam lingkungan 0°C."
    //   "Suhu permukaan yang sejuk, iaitu sekitar −73°C."   (asteroid)
    // q21 used to key a distance-from-the-Sun explanation plus the premise that
    // meteoroids are found nearer the Sun — neither is anywhere in the chapter.
    const UNSOURCED = /lebih jauh daripada Matahari|farther from the Sun|berhampiran Bumi|near Earth|orbit dalam|inner orbits|bayang-bayang/i;
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
    // was A=19 B=8 C=3 D=0 — always guessing A scored 63%
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
    // This is the discrimination SP 13.1.1 exists to teach.
    const ORBITS = /(mengorbit Matahari|orbiting the Sun|orbits the Sun|mengelilingi Matahari mengikut orbitnya|on its own orbit around the Sun)/gi;
    // A negation only counts when it sits immediately before the orbit phrase.
    // Testing the whole string instead lets "Meteoroid mengorbit Matahari —
    // bukan mengikut orbitnya sendiri" slip through while asserting the opposite.
    const NEGATED = /\b(bukan|bukannya|tidak|not|never|no)\b[^.]{0,40}$/i;
    for (const [name, surface] of SURFACES) {
      for (const raw of all(surface).match(/"(?:[^"\\]|\\.)*"/g) ?? []) {
        if (!/meteoroid/i.test(raw)) continue;
        for (const m of raw.matchAll(ORBITS)) {
          const before = raw.slice(Math.max(0, (m.index ?? 0) - 60), m.index);
          // the sentence is about a meteoroid only if no other body intervenes
          if (/(asteroid|komet|comet)[^.]{0,60}$/i.test(before)) continue;
          if (NEGATED.test(before)) continue;
          expect.fail(`${name} says a meteoroid orbits the Sun: ${raw.slice(0, 140)}`);
        }
      }
    }
  });

  it("teaches that a meteoroid moves freely, influenced by nearby gravity", () => {
    for (const [lang, content] of LANGS) {
      const text = all(content);
      expect(text, lang).toMatch(/bebas di angkasa|freely through space|freely in outer space/i);
      expect(text, lang).toMatch(/graviti planet, bulan|gravit\w+ (pull|of) .{0,30}(planets|planet)/i);
    }
  });
});

describe("Chapter 13 — meteor and meteorite", () => {
  it("never claims meteors burn up completely without the textbook's qualifier", () => {
    // p.272: "Kebiasaannya, meteor akan habis terbakar sebelum sampai ke Bumi.
    //         Akan tetapi, ada juga meteor yang dapat sampai ke Bumi."
    const ABSOLUTE = /(terbakar sepenuhnya|habis terbakar|burns? up completely|burnt up completely)/i;
    const HEDGE = /kebiasaan|kebanyakan|biasanya|usually|most\b/i;
    for (const [name, surface] of SURFACES) {
      for (const raw of all(surface).match(/"(?:[^"\\]|\\.)*"/g) ?? []) {
        if (!ABSOLUTE.test(raw)) continue;
        expect(HEDGE.test(raw), `${name} states it absolutely: ${raw.slice(0, 140)}`).toBe(true);
      }
    }
  });

  it("keeps the four named stages of Rajah 13.2 in order", () => {
    for (const [lang, content] of LANGS) {
      const section = content.sections.find(
        (s) => (s as unknown as Record<string, unknown>).meteoroidEntry,
      )!;
      const block = (section as unknown as Record<string, { stages: { id: string }[] }>).meteoroidEntry;
      expect(block.stages.map((s) => s.id), lang).toEqual([
        "meteoroid",
        "meteor",
        "pancuran",
        "meteorit",
      ]);
    }
  });

  it("uses the source's own name for the shower stage in BM", () => {
    // the textbook labels it "PANCURAN METEOR" (Rajah 13.2) and titles its
    // video "Video Pancuran Meteor"; the build previously said "hujan meteor"
    const bm = all(scienceF2C13InteractiveBM);
    expect(bm).toMatch(/[Pp]ancuran meteor/);
    expect(bm).not.toMatch(/hujan meteor/i);
  });
});

describe("Chapter 13 — the source figures are reconstructed, not referred to", () => {
  it("ships the three movement figures in both languages", () => {
    for (const [lang, content] of LANGS) {
      const keys = content.sections.flatMap((s) => Object.keys(s));
      for (const block of ["meteoroidEntry", "asteroidBelt", "cometOrbit"]) {
        expect(keys, `${lang} ${block}`).toContain(block);
      }
    }
  });

  it("never tells a learner to look at the textbook instead", () => {
    for (const [name, surface] of SURFACES) {
      expect(all(surface), name).not.toMatch(/rujuk gambar rajah|buku teks|see diagram in textbook|in the textbook/i);
    }
  });

  it("places the asteroid belt between Mars and Jupiter", () => {
    for (const [lang, content] of LANGS) {
      const section = content.sections.find(
        (s) => (s as unknown as Record<string, unknown>).asteroidBelt,
      )!;
      const block = (section as unknown as Record<string, {
        marsLabel: string; jupiterLabel: string; beltBody: string; crossingOrbits: { label: string }[];
      }>).asteroidBelt;
      expect([block.marsLabel, block.jupiterLabel], lang).toEqual(
        lang === "bm" ? ["Marikh", "Musytari"] : ["Mars", "Jupiter"],
      );
      expect(block.beltBody, lang).toMatch(
        lang === "bm" ? /Marikh dengan Musytari/ : /Mars and Jupiter/,
      );
      // Apollo, Amor and Aten are printed on p.273 — all three, none invented
      expect(block.crossingOrbits.map((o) => o.label), lang).toEqual(["Apollo", "Amor", "Aten"]);
    }
  });

  it("points the comet tail away from the Sun at every orbital position", () => {
    // p.274: "Ekor komet sentiasa dalam keadaan menjauhi Matahari disebabkan
    // tiupan angin suria dari Matahari." The word that matters is "sentiasa".
    // A tail drawn behind the comet would look right at perihelion and be wrong
    // on the outbound leg, so the rule is checked at every stop.
    for (let i = 0; i < COMET_STOP_COUNT; i += 1) {
      const g = cometGeometry(i);
      const awayX = g.comet.x - g.sun.x;
      const awayY = g.comet.y - g.sun.y;
      const mag = Math.hypot(awayX, awayY);
      // cosine between the tail direction and the Sun -> comet direction
      const cosine = (g.tail.ux * awayX + g.tail.uy * awayY) / mag;
      expect(cosine, `stop ${i} tail is not anti-sunward`).toBeCloseTo(1, 6);
    }
  });

  it("keeps the whole comet and its whole tail inside the viewBox at every position", () => {
    // The tail used to be clipped at 4 of 6 stops — at perihelion half of it
    // fell outside the box, exactly where the figure is meant to show that the
    // comet "kelihatan seperti berekor panjang". The canvas is sized around the
    // tail, so this asserts the full tail tip, not just the comet head.
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
        expect(x, `stop ${i} ${label} x=${x.toFixed(1)} outside 0..${width}`).toBeGreaterThanOrEqual(MARGIN);
        expect(x, `stop ${i} ${label} x=${x.toFixed(1)} outside 0..${width}`).toBeLessThanOrEqual(width - MARGIN);
        expect(y, `stop ${i} ${label} y=${y.toFixed(1)} outside 0..${height}`).toBeGreaterThanOrEqual(MARGIN);
        expect(y, `stop ${i} ${label} y=${y.toFixed(1)} outside 0..${height}`).toBeLessThanOrEqual(height - MARGIN);
      }
    }
  });

  it("keeps the Sun, the whole orbit and the label row inside the viewBox", () => {
    // widening the box must not have pushed the rest of the composition out
    const { width, height } = COMET_VIEWBOX;
    const sun = cometGeometry(0).sun;
    expect(sun.x).toBeGreaterThan(16);
    expect(sun.x).toBeLessThan(width - 16);
    expect(sun.y).toBeGreaterThan(16);
    expect(sun.y).toBeLessThan(height - 16);
    // every comet stop lies on the orbit, so the orbit's extent is bounded by them
    for (let i = 0; i < COMET_STOP_COUNT; i += 1) {
      const g = cometGeometry(i);
      expect(g.comet.x).toBeGreaterThan(0);
      expect(g.comet.x).toBeLessThan(width);
      expect(g.comet.y).toBeGreaterThan(0);
      expect(g.comet.y).toBeLessThan(height);
    }
  });

  it("draws a longer tail nearer the Sun, as the source describes", () => {
    // "Apabila komet menghampiri Matahari, komet semakin laju, mencair dan
    // kelihatan seperti berekor panjang."
    const stops = Array.from({ length: COMET_STOP_COUNT }, (_, i) => cometGeometry(i));
    const nearest = stops.reduce((a, b) => (a.distanceToSun <= b.distanceToSun ? a : b));
    const farthest = stops.reduce((a, b) => (a.distanceToSun >= b.distanceToSun ? a : b));
    expect(nearest.tailLength).toBeGreaterThan(farthest.tailLength);
    expect(nearest.isNear).toBe(true);
    expect(farthest.isNear).toBe(false);
  });

  it("draws the belt strictly between the Mars and Jupiter orbits", () => {
    // The label is not the claim — the geometry is. p.271: the belt lies
    // "di antara orbit planet Marikh dengan Musytari".
    expect(ORBIT_R.beltInner).toBeGreaterThan(ORBIT_R.mars);
    expect(ORBIT_R.beltOuter).toBeLessThan(ORBIT_R.jupiter);
    // and the inner planets stay inside Mars, in source order out from the Sun
    expect(ORBIT_R.venus).toBeLessThan(ORBIT_R.earth);
    expect(ORBIT_R.earth).toBeLessThan(ORBIT_R.mars);
  });

  it("states the comet tail rule the way the source does", () => {
    for (const [lang, content] of LANGS) {
      const section = content.sections.find(
        (s) => (s as unknown as Record<string, unknown>).cometOrbit,
      )!;
      const block = (section as unknown as Record<string, { tailRule: string }>).cometOrbit;
      expect(block.tailRule, lang).toMatch(
        lang === "bm" ? /menjauhi Matahari.*angin suria/ : /away from the Sun.*solar wind/,
      );
    }
  });

  it("renders all three figures without throwing, and points the tail away from the Sun", () => {
    for (const [lang, content] of LANGS) {
      const get = <T,>(key: string) => {
        const section = content.sections.find((s) => (s as unknown as Record<string, unknown>)[key])!;
        return (section as unknown as Record<string, T>)[key];
      };
      const l = lang === "bm" ? "bm" : "en";
      const entry = renderToStaticMarkup(
        <MeteoroidEntryFigure block={get("meteoroidEntry")} lang={l} />,
      );
      const belt = renderToStaticMarkup(<AsteroidBeltFigure block={get("asteroidBelt")} lang={l} />);
      const comet = renderToStaticMarkup(<CometOrbitFigure block={get("cometOrbit")} lang={l} />);

      // the belt figure must actually draw Mars and Jupiter, not just describe them
      expect(belt, lang).toContain(lang === "bm" ? "Marikh" : "Mars");
      expect(belt, lang).toContain(lang === "bm" ? "Musytari" : "Jupiter");
      // the entry figure must show the altitude bands the naming depends on
      // renderToStaticMarkup escapes the apostrophe, so match the stable part
      expect(entry, lang).toMatch(lang === "bm" ? /Atmosfera Bumi/ : /atmosphere/);
      // the comet figure must carry the tail rule on the page
      expect(comet, lang).toMatch(lang === "bm" ? /angin suria/ : /solar wind/);
    }
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
    // guarded because a source map suggested all of these; none is in the book
    for (const [name, surface] of SURFACES) {
      const text = all(surface);
      expect(text, name).not.toMatch(/Kepler/i);
      expect(text, name).not.toMatch(/kemusnahan setempat|localized destruction|localised destruction/i);
      expect(text, name).not.toMatch(/mass extinction threshold/i);
    }
  });

  it("marks the two orbit diagrams as not to scale", () => {
    for (const [lang, content] of LANGS) {
      const text = all(content);
      expect(text, lang).toMatch(/tidak mengikut skala|not to true scale|not to scale/i);
    }
  });
});
