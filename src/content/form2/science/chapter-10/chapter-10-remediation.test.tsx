import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SoundMediaDiagram } from "@/components/notes/blocks/SoundMediaDiagram";
import { EchoDiagram } from "@/components/notes/blocks/EchoDiagram";
import {
  DopplerWavefronts,
  backEdge,
  frontEdge,
  SOURCE_SPEED,
  WAVE_SPEED,
} from "@/components/notes/blocks/DopplerWavefronts";
import { EcholocationDiagram } from "@/components/notes/blocks/EcholocationDiagram";
import { HearingRangeChart, xForHz } from "@/components/notes/blocks/HearingRangeChart";
import { scienceF2C10InteractiveBM } from "./interactive-bm";
import { scienceF2C10InteractiveDLP } from "./interactive-dlp";
import { scienceF2C10QuizzesBM } from "./quizzes-bm";
import { scienceF2C10QuizzesDLP } from "./quizzes-dlp";
import { scienceF2C10FlashcardsBM } from "./flashcards-bm";
import { scienceF2C10FlashcardsDLP } from "./flashcards-dlp";
import { scienceF2C10MindMapBM } from "./mindmap-bm";
import { scienceF2C10MindMapDLP } from "./mindmap-dlp";
import type { ScienceF2InteractiveContent, ScienceInteractiveSection } from "../interactive-types";

/**
 * Regression guards for the Chapter 10 remediation — see
 * SCIENCE_F2_CH10_REMEDIATION_CHANGELOG.md.
 *
 * The chapter's critical defect was that the BM stream had invented vocabulary
 * for all four of its core terms: echo was called "gegaran" (a tremor), pitch
 * "kelaraban" (not a word), loudness "kelantangan", and propagation "merebak"
 * (to spread, as a disease spreads). None of the four DSKP/textbook terms
 * appeared anywhere. Those, the two missing standards, and the eighteen leaked
 * activity numbers are locked here.
 *
 * Only live surfaces are covered. notes-bm.ts / notes-dlp.ts are shadowed by the
 * interactive branch in routes/notes.tsx and are deliberately excluded.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C10InteractiveBM],
  ["dlp", scienceF2C10InteractiveDLP],
];

const DECKS: [string, unknown][] = [
  ["quizzes bm", scienceF2C10QuizzesBM],
  ["quizzes dlp", scienceF2C10QuizzesDLP],
  ["flashcards bm", scienceF2C10FlashcardsBM],
  ["flashcards dlp", scienceF2C10FlashcardsDLP],
  ["mindmap bm", scienceF2C10MindMapBM],
  ["mindmap dlp", scienceF2C10MindMapDLP],
];

const BM_LIVE: [string, unknown][] = [
  ["interactive bm", scienceF2C10InteractiveBM],
  ["quizzes bm", scienceF2C10QuizzesBM],
  ["flashcards bm", scienceF2C10FlashcardsBM],
  ["mindmap bm", scienceF2C10MindMapBM],
];

const text = (v: unknown) => JSON.stringify(v);

const sectionsOf = (c: ScienceF2InteractiveContent) => c.sections as ScienceInteractiveSection[];

/** Every string a learner can read in one stream's notes. */
const notesText = (c: ScienceF2InteractiveContent) => text(c);

/** Only the SVG the figure itself draws — lucide chrome icons are excluded. */
const figureSvg = (markup: string) => {
  const i = markup.indexOf('role="img"');
  return i === -1 ? "" : markup.slice(i);
};

// ---------------------------------------------------------------- structure

describe("Chapter 10 — section architecture", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: ships nine learner sections`, () => {
      expect(sectionsOf(content)).toHaveLength(9);
    });

    it(`${lang}: every section carries an intro and self-check questions`, () => {
      for (const s of sectionsOf(content)) {
        expect(s.intro, s.title).toBeTruthy();
        expect(s.checks.length, s.title).toBeGreaterThanOrEqual(1);
      }
    });

    it(`${lang}: section numbers stay inside the three textbook subtopics`, () => {
      for (const s of sectionsOf(content)) {
        expect(["10.1", "10.2", "10.3"]).toContain(s.number);
      }
    });
  }

  it("BM and DLP have the same section count and subtopic order", () => {
    const bm = sectionsOf(scienceF2C10InteractiveBM).map((s) => s.number);
    const dlp = sectionsOf(scienceF2C10InteractiveDLP).map((s) => s.number);
    expect(bm).toEqual(dlp);
  });

  it("no section is a content wall", () => {
    for (const [lang, content] of LANGS) {
      for (const s of sectionsOf(content)) {
        expect(text(s).length, `${lang} ${s.title}`).toBeLessThan(6000);
      }
    }
  });
});

// -------------------------------------------------------- BM terminology

describe("Chapter 10 — BM scientific vocabulary", () => {
  const WRONG: [string, RegExp][] = [
    ["kelaraban (pitch)", /kelaraban/i],
    ["kelantangan (loudness)", /kelantangan/i],
    ["gegaran (echo)", /gegaran/i],
    ["merebak (propagation)", /merebak/i],
  ];

  for (const [surface, data] of BM_LIVE) {
    for (const [label, re] of WRONG) {
      it(`${surface}: never uses ${label}`, () => {
        expect(text(data)).not.toMatch(re);
      });
    }
  }

  const REQUIRED: [string, RegExp][] = [
    ["gema", /gema/i],
    ["kelangsingan", /kelangsingan/i],
    ["kenyaringan", /kenyaringan/i],
    ["merambat", /merambat/i],
  ];

  for (const [label, re] of REQUIRED) {
    it(`BM notes use the DSKP term "${label}"`, () => {
      expect(notesText(scienceF2C10InteractiveBM)).toMatch(re);
    });
  }

  it("BM uses the textbook's O.S.K., not the English C.R.O.", () => {
    expect(notesText(scienceF2C10InteractiveBM)).toMatch(/O\.S\.K\./);
    for (const [surface, data] of BM_LIVE) {
      expect(text(data), surface).not.toMatch(/C\.R\.O/);
    }
  });

  it("BM keyword list carries the corrected vocabulary only", () => {
    const kw = scienceF2C10InteractiveBM.keywords.join(" ");
    expect(kw).toMatch(/Gema/);
    expect(kw).toMatch(/Kelangsingan/);
    expect(kw).toMatch(/Kenyaringan/);
    expect(kw).not.toMatch(/Gegaran|Kelaraban|Kelantangan/);
  });
});

// ------------------------------------------------------------- SP coverage

describe("Chapter 10 — every SP has a teaching home in the notes", () => {
  const SP: [string, RegExp, RegExp][] = [
    // code, BM evidence, DLP evidence
    ["10.1.1 medium + vacuum", /memerlukan medium/i, /needs a medium/i],
    ["10.1.1 speed by state", /pepejal/i, /solid/i],
    ["10.2.1 frequency + Hz", /bilangan getaran lengkap dalam masa satu saat/i, /number of complete vibrations in one second/i],
    ["10.2.1 amplitude definition", /sesaran maksimum/i, /maximum displacement/i],
    ["10.2.1 oscilloscope", /O\.S\.K\./, /oscilloscope/i],
    ["10.2.2 pitch", /kelangsingan.{0,40}frekuensi|frekuensi.{0,40}kelangsingan/is, /pitch.{0,40}frequency|frequency.{0,40}pitch/is],
    ["10.2.3 loudness", /kenyaringan.{0,40}amplitud|amplitud.{0,40}kenyaringan/is, /loudness.{0,40}amplitude|amplitude.{0,40}loudness/is],
    ["10.2.4 musical instruments", /gitar/i, /guitar/i],
    ["10.3.1 echo", /gema/i, /echo/i],
    ["10.3.1 Doppler", /kesan Doppler/i, /Doppler effect/i],
    ["10.3.2 sonar", /sonar/i, /sonar/i],
    ["10.3.2 sonogram", /sonogram/i, /sonogram/i],
    ["10.3.2 bat", /kelawar/i, /bat/i],
    ["10.3.3 human range", /20 ?000 Hz/i, /20 ?000 Hz/i],
    ["10.3.3 animal ranges", /Lumba-lumba/i, /Dolphin/i],
    ["10.3.4 devices", /stetoskop/i, /stethoscope/i],
  ];

  for (const [label, bmRe, dlpRe] of SP) {
    it(`${label} — BM`, () => expect(notesText(scienceF2C10InteractiveBM)).toMatch(bmRe));
    it(`${label} — DLP`, () => expect(notesText(scienceF2C10InteractiveDLP)).toMatch(dlpRe));
  }
});

// --------------------------------------------------------------- science

describe("Chapter 10 — sound requires a medium", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: teaches that sound cannot travel through a vacuum`, () => {
      expect(notesText(content)).toMatch(lang === "bm" ? /vakum/i : /vacuum/i);
    });
    it(`${lang}: teaches vibration as the origin of sound`, () => {
      expect(notesText(content)).toMatch(lang === "bm" ? /getaran/i : /vibration/i);
    });
  }
});

describe("Chapter 10 — speed is never inferred from loudness", () => {
  it("BM names the container demonstration as a loudness comparison", () => {
    const t = notesText(scienceF2C10InteractiveBM);
    expect(t).toMatch(/membandingkan kekuatan bunyi, bukan mengukur kelajuan bunyi/i);
  });

  it("DLP names the container demonstration as a loudness comparison", () => {
    const t = notesText(scienceF2C10InteractiveDLP);
    expect(t).toMatch(/compares loudness — it does not measure the speed of sound/i);
  });

  it("no surface claims a louder sound travels faster", () => {
    for (const [surface, data] of [...DECKS, ...LANGS.map(([l, c]) => [l, c] as [string, unknown])]) {
      expect(text(data), surface).not.toMatch(/lebih kuat,? (jadi|maka).{0,30}(lebih cepat|lebih pantas)/i);
      expect(text(data), surface).not.toMatch(/louder,? so.{0,30}faster/i);
    }
  });

  it("speed ordering is solid > liquid > gas by particle spacing", () => {
    const block = sectionsOf(scienceF2C10InteractiveBM).find((s) => s.soundMedia)?.soundMedia;
    expect(block).toBeTruthy();
    const ranks = Object.fromEntries(block!.states.map((s) => [s.id, s.speedRank]));
    expect(ranks.solid).toBeLessThan(ranks.liquid);
    expect(ranks.liquid).toBeLessThan(ranks.gas);
  });
});

describe("Chapter 10 — no mathematical proportionality is claimed", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: uses "depends on" rather than a proportionality symbol`, () => {
      const t = notesText(content);
      expect(t).not.toMatch(/∝/);
      expect(t).toMatch(lang === "bm" ? /bergantung pada/i : /depends on/i);
    });
  }
});

describe("Chapter 10 — reflection and absorption", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: hard and smooth reflect, soft and rough absorb`, () => {
      const t = notesText(content);
      expect(t).toMatch(lang === "bm" ? /keras dan licin/i : /hard,? smooth/i);
      expect(t).toMatch(lang === "bm" ? /lembut dan kasar/i : /soft,? rough/i);
    });

    it(`${lang}: never imports the angle of incidence law, which Chapter 10 does not teach`, () => {
      expect(notesText(content)).not.toMatch(/sudut tuju|sudut pantulan|angle of incidence|angle of reflection/i);
    });
  }
});

describe("Chapter 10 — musical instruments keep loudness and pitch apart", () => {
  for (const [lang, content] of LANGS) {
    const t = notesText(content);

    it(`${lang}: plucking harder is tied to amplitude and loudness`, () => {
      expect(t).toMatch(
        lang === "bm"
          ? /dipetik.{0,120}amplitud.{0,120}nyaring/is
          : /plucking .{0,120}amplitude.{0,120}louder/is,
      );
    });

    it(`${lang}: plucking harder explicitly does NOT raise pitch`, () => {
      expect(t).toMatch(
        lang === "bm" ? /Kelangsingan bunyi tidak berubah/i : /pitch does not change/i,
      );
    });

    it(`${lang}: tightening the string raises frequency and pitch`, () => {
      expect(t).toMatch(
        lang === "bm"
          ? /diketatkan.{0,140}frekuensi.{0,140}kelangsingan/is
          : /tighten\w*.{0,140}frequency.{0,140}pitch/is,
      );
    });

    it(`${lang}: covers the source-named instruments`, () => {
      for (const name of lang === "bm"
        ? ["piano", "rekorder", "gendang", "drum", "gitar"]
        : ["piano", "recorder", "gendang", "drum", "guitar"]) {
        expect(t.toLowerCase(), name).toContain(name);
      }
    });
  }
});

describe("Chapter 10 — Doppler", () => {
  it("is filed under subtopic 10.3, not 10.2", () => {
    for (const [lang, content] of LANGS) {
      const s = sectionsOf(content).find((x) => x.dopplerWavefronts);
      expect(s, lang).toBeTruthy();
      expect(s!.number, lang).toBe("10.3");
    }
  });

  for (const [lang, content] of LANGS) {
    it(`${lang}: says the emitted frequency itself does not change`, () => {
      const block = sectionsOf(content).find((s) => s.dopplerWavefronts)!.dopplerWavefronts!;
      expect(block.emittedNote).toMatch(
        lang === "bm" ? /frekuensi yang tetap/i : /steady frequency/i,
      );
    });

    it(`${lang}: approaching raises and receding lowers the received frequency`, () => {
      const block = sectionsOf(content).find((s) => s.dopplerWavefronts)!.dopplerWavefronts!;
      expect(block.observers.find((o) => o.id === "ahead")!.effect).toBe("higher");
      expect(block.observers.find((o) => o.id === "behind")!.effect).toBe("lower");
    });
  }

  it("wavefronts are compressed ahead of the source and spread behind it", () => {
    // Derived from the motion constants, so the figure cannot be drawn backwards.
    expect(SOURCE_SPEED).toBeGreaterThan(0);
    expect(WAVE_SPEED).toBeGreaterThan(SOURCE_SPEED);
    const ages = [1, 2, 3];
    const frontGaps = ages.slice(1).map((a, i) => frontEdge(a) - frontEdge(ages[i]));
    const backGaps = ages.slice(1).map((a, i) => backEdge(ages[i]) - backEdge(a));
    expect(Math.max(...frontGaps)).toBeLessThan(Math.min(...backGaps));
  });

  it("renders both observers and the steady-frequency note", () => {
    const block = sectionsOf(scienceF2C10InteractiveBM).find((s) => s.dopplerWavefronts)!
      .dopplerWavefronts!;
    const markup = renderToStaticMarkup(<DopplerWavefronts block={block} lang="bm" />);
    expect(markup).toContain("Pemerhati di hadapan");
    expect(markup).toContain("Pemerhati di belakang");
    expect(markup).toMatch(/frekuensi yang tetap/i);
    expect(figureSvg(markup)).toBeTruthy();
  });
});

describe("Chapter 10 — echo figure", () => {
  it("draws an outgoing leg and a returning leg", () => {
    const block = sectionsOf(scienceF2C10InteractiveBM).find((s) => s.echoDiagram)!.echoDiagram!;
    const svg = figureSvg(renderToStaticMarkup(<EchoDiagram block={block} lang="bm" />));
    const lines = [...svg.matchAll(/<line[^>]*x1="([\d.]+)"[^>]*x2="([\d.]+)"[^>]*>/g)].map((m) => ({
      x1: Number(m[1]),
      x2: Number(m[2]),
    }));
    expect(lines.some((l) => l.x2 > l.x1)).toBe(true); // out to the surface
    expect(lines.some((l) => l.x2 < l.x1)).toBe(true); // back to the listener
  });

  it("names only source-supported places", () => {
    const bm = sectionsOf(scienceF2C10InteractiveBM).find((s) => s.echoDiagram)!.echoDiagram!;
    expect(bm.places).toEqual(["Dewan tertutup", "Bilik kosong", "Gua", "Terowong", "Gaung"]);
  });

  it("states no numeric echo-distance formula", () => {
    for (const [lang, content] of LANGS) {
      expect(notesText(content), lang).not.toMatch(/jarak\s*=\s*|distance\s*=\s*|v\s*[×x]\s*t/i);
    }
  });
});

describe("Chapter 10 — sonar and echolocation", () => {
  for (const [lang, content] of LANGS) {
    const block = sectionsOf(content).find((s) => s.echolocation)!.echolocation!;

    it(`${lang}: sonar travels through water and the bat through air`, () => {
      expect(block.modes.find((m) => m.id === "sonar")!.medium).toBe("water");
      expect(block.modes.find((m) => m.id === "bat")!.medium).toBe("air");
    });

    it(`${lang}: both modes draw a send and a return`, () => {
      for (const mode of block.modes) {
        const one = { ...block, modes: [mode] };
        const svg = figureSvg(renderToStaticMarkup(<EcholocationDiagram block={one} lang={lang} />));
        const lines = [...svg.matchAll(/<line[^>]*x1="([\d.]+)"[^>]*x2="([\d.]+)"[^>]*>/g)].map(
          (m) => ({ x1: Number(m[1]), x2: Number(m[2]) }),
        );
        expect(lines.some((l) => l.x2 > l.x1), `${mode.id} send`).toBe(true);
        expect(lines.some((l) => l.x2 < l.x1), `${mode.id} return`).toBe(true);
      }
    });
  }

  it("adds no application the source does not carry", () => {
    for (const [surface, data] of [...DECKS, ...LANGS.map(([l, c]) => [l, c] as [string, unknown])]) {
      expect(text(data), surface).not.toMatch(/retak|crack detection|barang kemas|jewell?ery/i);
    }
  });
});

describe("Chapter 10 — hearing ranges", () => {
  const EXPECTED: [string, number, number][] = [
    ["human", 20, 20000],
    ["bat", 2000, 110000],
    ["dolphin", 40, 100000],
    ["dog", 67, 45000],
    ["horse", 55, 33500],
    ["elephant", 16, 12000],
  ];

  for (const [lang, content] of LANGS) {
    const block = sectionsOf(content).find((s) => s.hearingRange)!.hearingRange!;

    it(`${lang}: carries the exact source values`, () => {
      for (const [id, min, max] of EXPECTED) {
        const e = block.entries.find((x) => x.id === id);
        expect(e, `${lang} ${id}`).toBeTruthy();
        expect(e!.minHz, `${lang} ${id} min`).toBe(min);
        expect(e!.maxHz, `${lang} ${id} max`).toBe(max);
      }
    });

    it(`${lang}: marks the human row as the reference`, () => {
      expect(block.entries.filter((e) => e.human)).toHaveLength(1);
      expect(block.entries.find((e) => e.human)!.id).toBe("human");
    });
  }

  it("bar positions are derived from the values, on a log axis", () => {
    // An elephant's 16 Hz must start left of the human 20 Hz, and a bat's
    // 110 kHz must end right of the human 20 kHz.
    expect(xForHz(16)).toBeLessThan(xForHz(20));
    expect(xForHz(110000)).toBeGreaterThan(xForHz(20000));
    // Log spacing: each decade is the same width.
    const d1 = xForHz(1000) - xForHz(100);
    const d2 = xForHz(10000) - xForHz(1000);
    expect(Math.abs(d1 - d2)).toBeLessThan(0.01);
  });

  it("renders every range into the accessible label", () => {
    const block = sectionsOf(scienceF2C10InteractiveBM).find((s) => s.hearingRange)!.hearingRange!;
    const markup = renderToStaticMarkup(<HearingRangeChart block={block} />);
    expect(markup).toMatch(/20–20000 Hz/);
    expect(markup).toMatch(/2000–110000 Hz/);
  });
});

describe("Chapter 10 — overcoming hearing limits", () => {
  for (const [lang, content] of LANGS) {
    const t = notesText(content);

    it(`${lang}: teaches the three textbook devices`, () => {
      for (const d of lang === "bm"
        ? ["stetoskop", "alat bantu pendengaran", "pembesar suara"]
        : ["stethoscope", "hearing aid", "loudspeaker"]) {
        expect(t.toLowerCase(), d).toContain(d);
      }
    });

    it(`${lang}: states the devices do not widen the frequency range`, () => {
      expect(t).toMatch(
        lang === "bm"
          ? /tidak meluaskan julat frekuensi pendengaran manusia/i
          : /do not widen the human hearing frequency range/i,
      );
    });

    it(`${lang}: frames the limitation as sound too weak or too far`, () => {
      expect(t).toMatch(
        lang === "bm" ? /terlalu lemah atau terlalu jauh/i : /too weak or too far/i,
      );
    });
  }

  it("no live surface presents a megaphone as a Chapter 10 device", () => {
    for (const [surface, data] of [...DECKS, ...LANGS.map(([l, c]) => [l, c] as [string, unknown])]) {
      expect(text(data), surface).not.toMatch(/megafon|megaphone/i);
    }
  });

  it("no live surface claims a device extends the biological range", () => {
    // Pairing a device with ultrasound is only wrong when it is asserted rather
    // than denied — the notes deliberately say a hearing aid does NOT let a
    // human hear ultrasound, and that sentence must stay allowed.
    const DEVICE = /alat bantu|pembesar suara|stetoskop|hearing aid|loudspeaker|stethoscope/i;
    const ULTRA = /ultrabunyi|ultrasound/i;
    const NEGATED = /\btidak\b|\bbukan\b|\bnot\b|\bnever\b|\bcannot\b/i;
    // A question asserts nothing — the chapter deliberately poses the
    // misconception ("can a hearing aid let us hear ultrasound?") and answers no.
    const IS_QUESTION = /\?/;

    for (const [surface, data] of [...DECKS, ...LANGS.map(([l, c]) => [l, c] as [string, unknown])]) {
      const sentences = text(data)
        .split(/(?<=[.!?])\s+|\\n|","|":"/)
        .filter((s) => DEVICE.test(s) && ULTRA.test(s));
      for (const s of sentences) {
        const safe = NEGATED.test(s) || IS_QUESTION.test(s);
        expect(safe, `${surface}: "${s.slice(0, 140)}"`).toBe(true);
      }
    }
  });
});

// ------------------------------------------------------------------ figures

describe("Chapter 10 — figures are accessible and self-consistent", () => {
  it("the sound-media figure keeps particle size constant and varies only spacing", () => {
    const block = sectionsOf(scienceF2C10InteractiveBM).find((s) => s.soundMedia)!.soundMedia!;
    const radii = new Set<string>();
    for (const state of block.states) {
      const one = { ...block, states: [state] };
      const svg = figureSvg(renderToStaticMarkup(<SoundMediaDiagram block={one} lang="bm" />));
      for (const m of svg.matchAll(/<circle[^>]*r="([\d.]+)"/g)) radii.add(m[1]);
    }
    expect([...radii]).toHaveLength(1);
  });

  it("every new figure exposes role=img with a label", () => {
    const bm = scienceF2C10InteractiveBM;
    const s = sectionsOf(bm);
    const markups = [
      renderToStaticMarkup(<SoundMediaDiagram block={s.find((x) => x.soundMedia)!.soundMedia!} lang="bm" />),
      renderToStaticMarkup(<EchoDiagram block={s.find((x) => x.echoDiagram)!.echoDiagram!} lang="bm" />),
      renderToStaticMarkup(<DopplerWavefronts block={s.find((x) => x.dopplerWavefronts)!.dopplerWavefronts!} lang="bm" />),
      renderToStaticMarkup(<EcholocationDiagram block={s.find((x) => x.echolocation)!.echolocation!} lang="bm" />),
      renderToStaticMarkup(<HearingRangeChart block={s.find((x) => x.hearingRange)!.hearingRange!} />),
    ];
    for (const m of markups) {
      expect(m).toContain('role="img"');
      expect(m).toMatch(/aria-label="[^"]+"/);
    }
  });
});

// -------------------------------------------------------------------- decks

describe("Chapter 10 — quizzes", () => {
  const bm = scienceF2C10QuizzesBM as { options: string[]; answerIndex: number; difficulty: string }[];
  const dlp = scienceF2C10QuizzesDLP as { options: string[]; answerIndex: number; difficulty: string }[];

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
});

describe("Chapter 10 — decks agree with the notes", () => {
  it("no deck exposes a textbook activity number", () => {
    for (const [surface, data] of DECKS) {
      expect(text(data), surface).not.toMatch(/aktiviti\s*10\.\d|activit(?:y|ies)\s*10\.\d/i);
    }
  });

  it("no live surface exposes curriculum or audit metadata", () => {
    for (const [surface, data] of [...DECKS, ...LANGS.map(([l, c]) => [l, c] as [string, unknown])]) {
      expect(text(data), surface).not.toMatch(
        /\bDSKP\b|\bSK\s*10\.|\bSP\s*10\.|jadual\s*9\b|buku teks|\btextbook\b|\bmandatory\b|\bremediation\b/i,
      );
    }
  });

  it("flashcard and mind-map counts stay in BM/DLP parity", () => {
    expect((scienceF2C10FlashcardsBM as unknown[]).length).toBe(
      (scienceF2C10FlashcardsDLP as unknown[]).length,
    );
    const nodes = (n: unknown): number => {
      const kids = (n as { children?: unknown[] }).children ?? [];
      return 1 + kids.reduce<number>((a, k) => a + nodes(k), 0);
    };
    expect(nodes(scienceF2C10MindMapBM)).toBe(nodes(scienceF2C10MindMapDLP));
  });
});
