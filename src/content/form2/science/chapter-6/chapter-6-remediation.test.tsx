import { describe, expect, it } from "vitest";
import { scienceF2C6InteractiveBM } from "./interactive-bm";
import { scienceF2C6InteractiveDLP } from "./interactive-dlp";
import { scienceF2C6QuizzesBM } from "./quizzes-bm";
import { scienceF2C6QuizzesDLP } from "./quizzes-dlp";
import { scienceF2C6FlashcardsBM } from "./flashcards-bm";
import { scienceF2C6FlashcardsDLP } from "./flashcards-dlp";
import { scienceF2C6MindMapBM } from "./mindmap-bm";
import { scienceF2C6MindMapDLP } from "./mindmap-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Regression guards for the Chapter 6 remediation — see
 * SCIENCE_F2_CH06_REMEDIATION_CHANGELOG.md.
 *
 * The chapter's headline defect was a strength mis-classification: vinegar was
 * labelled a strong acid and ammonia a strong alkali, contradicting the
 * textbook's own canonical weak examples. Several guards below therefore have
 * to tell an *assertion* apart from a *misconception being refuted* — the
 * remediated chapter deliberately poses "does vinegar contain a strong acid?"
 * in order to answer no, and a naive substring check would fire on that.
 *
 * Only live surfaces are covered. notes-bm.ts / notes-dlp.ts are shadowed by
 * the interactive branch in routes/notes.tsx and are deliberately excluded.
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C6InteractiveBM],
  ["dlp", scienceF2C6InteractiveDLP],
];

const text = (v: unknown) => JSON.stringify(v);

/** Prose a learner reads as a statement — excludes question stems and their answers. */
function assertedProse(c: ScienceF2InteractiveContent): string {
  const parts: string[] = [];
  for (const s of c.sections) {
    if (s.intro) parts.push(s.intro);
    for (const card of s.cards ?? []) parts.push(card.title, card.body, card.detail ?? "");
    for (const a of s.accordions ?? []) parts.push(a.title, a.body);
    for (const t of s.tabs ?? []) parts.push(t.title, t.body);
    for (const f of s.flipCards ?? []) parts.push(f.label, f.fact);
    for (const p of s.phSlider?.scale ?? []) parts.push(p.name, p.description);
    const sc = s.strengthComparison;
    if (sc) {
      parts.push(sc.condition, sc.keyPoint);
      for (const e of sc.entries) parts.push(e.name, e.ph, e.note);
    }
  }
  return parts.join(" \n ");
}

describe("Chapter 6 — structure", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: notes are split into 7-9 sections, not the original 2`, () => {
      expect(content.sections.length).toBeGreaterThanOrEqual(7);
      expect(content.sections.length).toBeLessThanOrEqual(9);
    });

    it(`${lang}: every section has a title and at least one learning block`, () => {
      for (const s of content.sections) {
        expect(s.title.trim().length).toBeGreaterThan(0);
        const hasBlock =
          s.cards ||
          s.accordions ||
          s.tabs ||
          s.phSlider ||
          s.indicatorTable ||
          s.dryVsAqueous ||
          s.titrationSchematic ||
          s.strengthComparison ||
          s.conceptContrast ||
          s.methodCards;
        expect(hasBlock, `section "${s.title}" has no learning block`).toBeTruthy();
      }
    });

    it(`${lang}: no learner-facing SP code such as 6.1.3 is exposed`, () => {
      expect(text(content)).not.toMatch(/\b6\.\d\.\d\b/);
    });
  }

  it("BM and DLP stay in lockstep on section count and order", () => {
    expect(scienceF2C6InteractiveDLP.sections.length).toBe(
      scienceF2C6InteractiveBM.sections.length,
    );
    expect(scienceF2C6InteractiveDLP.sections.map((s) => s.number)).toEqual(
      scienceF2C6InteractiveBM.sections.map((s) => s.number),
    );
  });

  it("BM and DLP carry the same block types in the same sections", () => {
    const shape = (c: ScienceF2InteractiveContent) =>
      c.sections.map((s) =>
        (
          [
            "cards",
            "accordions",
            "tabs",
            "phSlider",
            "indicatorTable",
            "dryVsAqueous",
            "titrationSchematic",
            "strengthComparison",
            "conceptContrast",
            "methodCards",
          ] as const
        )
          .filter((k) => s[k] !== undefined)
          .join(","),
      );
    expect(shape(scienceF2C6InteractiveDLP)).toEqual(shape(scienceF2C6InteractiveBM));
  });
});

describe("Chapter 6 — acid/alkali strength (the critical regression)", () => {
  for (const [lang, content] of LANGS) {
    const block = content.sections.find((s) => s.strengthComparison)?.strengthComparison;

    it(`${lang}: a strength comparison block exists`, () => {
      expect(block, "no strengthComparison block").toBeTruthy();
    });

    it(`${lang}: the equal-concentration condition is stated`, () => {
      expect(block!.condition).toMatch(
        lang === "bm" ? /kepekatan yang sama/i : /same concentration/i,
      );
    });

    it(`${lang}: ethanoic acid is the weak acid and hydrochloric acid the strong one`, () => {
      const eth = block!.entries.find((e) => e.id === "ethanoic")!;
      const hcl = block!.entries.find((e) => e.id === "hcl")!;
      expect(eth.strength).toBe("weak");
      expect(eth.kind).toBe("acid");
      expect(hcl.strength).toBe("strong");
      expect(hcl.kind).toBe("acid");
    });

    it(`${lang}: ammonia is the weak alkali and sodium hydroxide the strong one`, () => {
      const amm = block!.entries.find((e) => e.id === "ammonia")!;
      const naoh = block!.entries.find((e) => e.id === "naoh")!;
      expect(amm.strength).toBe("weak");
      expect(amm.kind).toBe("alkali");
      expect(naoh.strength).toBe("strong");
      expect(naoh.kind).toBe("alkali");
    });

    it(`${lang}: vinegar's acid is explicitly identified as weak`, () => {
      const prose = assertedProse(content);
      expect(prose).toMatch(lang === "bm" ? /asid lemah/i : /weak acid/i);
      expect(prose).toMatch(lang === "bm" ? /cuka/i : /vinegar/i);
    });

    it(`${lang}: no asserted prose calls vinegar a strong acid`, () => {
      // Guards the original defect. Question stems that pose the misconception in
      // order to refute it are excluded by construction (see assertedProse).
      const prose = assertedProse(content);
      expect(prose).not.toMatch(
        lang === "bm" ? /[Cc]uka[^.\n]{0,50}asid kuat/ : /[Vv]inegar[^.\n]{0,50}strong acid/,
      );
    });

    it(`${lang}: no asserted prose calls ammonia solution a strong alkali`, () => {
      const prose = assertedProse(content);
      expect(prose).not.toMatch(
        lang === "bm" ? /ammonia[^.\n]{0,40}[Aa]lkali kuat/ : /ammonia[^.\n]{0,40}strong alkali/i,
      );
    });

    it(`${lang}: the pH slider uses position language, not strong/weak identity`, () => {
      const slider = content.sections.find((s) => s.phSlider)?.phSlider;
      expect(slider, "no phSlider").toBeTruthy();
      const vinegar = slider!.scale.find((p) => /cuka|vinegar/i.test(p.name))!;
      const ammonia = slider!.scale.find((p) => /ammonia/i.test(p.name))!;
      expect(vinegar.description).not.toMatch(lang === "bm" ? /asid kuat/i : /strong acid/i);
      expect(ammonia.description).not.toMatch(lang === "bm" ? /alkali kuat/i : /strong alkali/i);
      expect(slider!.scale).toHaveLength(15); // pH 0..14 inclusive
    });
  }
});

describe("Chapter 6 — no learner-facing textbook activity numbers", () => {
  const SURFACES: [string, unknown][] = [
    ["interactive bm", scienceF2C6InteractiveBM],
    ["interactive dlp", scienceF2C6InteractiveDLP],
    ["quizzes bm", scienceF2C6QuizzesBM],
    ["quizzes dlp", scienceF2C6QuizzesDLP],
    ["flashcards bm", scienceF2C6FlashcardsBM],
    ["flashcards dlp", scienceF2C6FlashcardsDLP],
    ["mindmap bm", scienceF2C6MindMapBM],
    ["mindmap dlp", scienceF2C6MindMapDLP],
  ];

  for (const [name, surface] of SURFACES) {
    it(`${name}: no "Aktiviti 6.x" / "Activity 6.x"`, () => {
      const t = text(surface);
      expect(t, `${name} leaks an activity number`).not.toMatch(/Aktiviti\s*\d\.\d/i);
      expect(t, `${name} leaks an activity number`).not.toMatch(/\bActivity\s*\d\.\d/i);
    });
  }
});

describe("Chapter 6 — previously missing content is now taught", () => {
  for (const [lang, content] of LANGS) {
    const prose = assertedProse(content);

    it(`${lang}: fabric softener is taught in the notes`, () => {
      expect(prose).toMatch(lang === "bm" ? /pelembut fabrik/i : /fabric softener/i);
      // and it must say it is acidic, neutralising alkaline residue
      expect(prose).toMatch(lang === "bm" ? /beralkali|alkali/i : /alkaline/i);
    });

    it(`${lang}: the pH meter is present among the measuring tools`, () => {
      expect(text(content)).toMatch(lang === "bm" ? /Meter pH/i : /pH meter/i);
      const tools = content.sections.find((s) => s.methodCards)?.methodCards;
      expect(tools, "no methodCards block").toBeTruthy();
      expect(tools!.cards.map((c) => c.id).sort()).toEqual(["litmus", "ph-meter", "universal"]);
    });

    it(`${lang}: agriculture and industry uses are covered`, () => {
      expect(prose).toMatch(lang === "bm" ? /pertanian/i : /agriculture/i);
      expect(prose).toMatch(lang === "bm" ? /industri/i : /industry/i);
    });

    it(`${lang}: the dry-versus-aqueous comparison has all four cases`, () => {
      const block = content.sections.find((s) => s.dryVsAqueous)?.dryVsAqueous;
      expect(block, "no dryVsAqueous block").toBeTruthy();
      expect(block!.panels.map((p) => p.id).sort()).toEqual([
        "acid-dry",
        "acid-wet",
        "alkali-dry",
        "alkali-wet",
      ]);
      // the dry cases must leave the paper unchanged, the wet cases must change it
      const dryAcid = block!.panels.find((p) => p.id === "acid-dry")!;
      const wetAcid = block!.panels.find((p) => p.id === "acid-wet")!;
      expect(dryAcid.result).toBe("blue");
      expect(wetAcid.result).toBe("red");
      const dryAlkali = block!.panels.find((p) => p.id === "alkali-dry")!;
      const wetAlkali = block!.panels.find((p) => p.id === "alkali-wet")!;
      expect(dryAlkali.result).toBe("red");
      expect(wetAlkali.result).toBe("blue");
    });

    it(`${lang}: the titration schematic labels the apparatus and end point`, () => {
      const block = content.sections.find((s) => s.titrationSchematic)?.titrationSchematic;
      expect(block, "no titrationSchematic block").toBeTruthy();
      expect(block!.labels.map((l) => l.id).sort()).toEqual([
        "acid",
        "burette",
        "endpoint",
        "flask",
        "indicator",
      ]);
      expect(block!.endpointCaption).toMatch(
        lang === "bm" ? /merah jambu.*tidak berwarna/i : /pink.*colourless/i,
      );
    });

    it(`${lang}: the jellyfish answer teaches the expected model, not a hedge`, () => {
      const check = content.sections.at(-1)!.checks.find((c) => /ubur-ubur|jellyfish/i.test(c.question));
      expect(check, "jellyfish check missing").toBeTruthy();
      const hint = check!.hint;
      // must name soap/toothpaste as alkaline AND name an acidic remedy
      expect(hint).toMatch(lang === "bm" ? /alkali/i : /alkaline/i);
      expect(hint).toMatch(lang === "bm" ? /cuka/i : /vinegar/i);
      // must not retreat into "depends on the actual chemistry" as the whole answer
      expect(hint).not.toMatch(
        lang === "bm"
          ? /^Jika kimia sengatan itu bukan asid mudah/
          : /^If the sting's chemistry isn't a straightforward acid/,
      );
    });

    it(`${lang}: no wasp example was ever introduced`, () => {
      expect(text(content)).not.toMatch(/tebuan|wasp/i);
    });
  }
});

describe("Chapter 6 — indicator colours stay correct", () => {
  const EXPECTED: Record<string, [string, string, string]> = {
    phenolphthalein: ["colourless", "colourless", "pink"],
    universal: ["red", "green", "blue"],
    "methyl-orange": ["red", "yellow", "yellow"],
    "blue-litmus": ["red", "blue", "blue"],
    "red-litmus": ["red", "red", "blue"],
  };
  const BM: Record<string, string> = {
    colourless: "tidak berwarna",
    pink: "merah jambu",
    red: "merah",
    green: "hijau",
    blue: "biru",
    yellow: "kuning",
  };

  for (const [lang, content] of LANGS) {
    it(`${lang}: all five indicators match the source colour table`, () => {
      const block = content.sections.find((s) => s.indicatorTable)?.indicatorTable;
      expect(block, "no indicatorTable block").toBeTruthy();
      expect(block!.rows).toHaveLength(5);
      for (const row of block!.rows) {
        const want = EXPECTED[row.id];
        expect(want, `unexpected indicator id ${row.id}`).toBeTruthy();
        const got = [row.acid, row.neutral, row.alkali].map((v) => v.toLowerCase());
        const expected = lang === "bm" ? want.map((w) => BM[w]) : want;
        expect(got, `${row.id} colours`).toEqual(expected);
      }
    });

    it(`${lang}: methyl orange is yellow in BOTH neutral and alkali`, () => {
      const row = content.sections
        .find((s) => s.indicatorTable)!
        .indicatorTable!.rows.find((r) => r.id === "methyl-orange")!;
      expect(row.neutral.toLowerCase()).toBe(row.alkali.toLowerCase());
    });
  }
});

describe("Chapter 6 — neutralisation stays correct", () => {
  for (const [lang, content] of LANGS) {
    const prose = assertedProse(content);

    it(`${lang}: the word equation is present`, () => {
      expect(prose).toMatch(
        lang === "bm" ? /Asid \+ Alkali → Garam \+ Air/ : /Acid \+ Alkali → Salt \+ Water/,
      );
    });

    it(`${lang}: all three salt pairs match the source`, () => {
      const pairs =
        lang === "bm"
          ? [/natrium klorida/i, /kalium sulfat/i, /natrium nitrat/i]
          : [/sodium chloride/i, /potassium sulphate/i, /sodium nitrate/i];
      for (const p of pairs) expect(prose).toMatch(p);
    });

    it(`${lang}: sulphuric acid is paired with potassium hydroxide, not sodium`, () => {
      expect(prose).toMatch(
        lang === "bm"
          ? /Asid sulfurik \+ Kalium hidroksida/i
          : /Sulphuric acid \+ Potassium hydroxide/i,
      );
    });
  }
});

describe("Chapter 6 — properties and water requirement stay correct", () => {
  for (const [lang, content] of LANGS) {
    const prose = assertedProse(content);
    const contrast = content.sections.find((s) => s.conceptContrast)?.conceptContrast;

    it(`${lang}: the water requirement is stated`, () => {
      expect(prose).toMatch(
        lang === "bm"
          ? /hanya menunjukkan sifatnya (dengan|apabila) .*air/i
          : /only show their properties .*water/i,
      );
    });

    it(`${lang}: acid reacts with metals, alkali does not`, () => {
      expect(contrast, "no conceptContrast block").toBeTruthy();
      const acid = contrast!.left.examples.join(" ");
      const alkali = contrast!.right.examples.join(" ");
      expect(acid).toMatch(lang === "bm" ? /logam/i : /metals/i);
      expect(alkali).toMatch(lang === "bm" ? /[Tt]idak bertindak balas/ : /does not react/i);
    });

    it(`${lang}: taste is present but carries a do-not-taste safety note`, () => {
      expect(contrast!.left.examples.join(" ")).toMatch(lang === "bm" ? /masam/i : /sour/i);
      expect(contrast!.keyPoint).toMatch(
        lang === "bm" ? /[Jj]angan sekali-kali merasa/ : /[Nn]ever taste/,
      );
    });
  }
});

describe("Chapter 6 — BM terminology matches the source", () => {
  const bm = text(scienceF2C6InteractiveBM);
  const surfaces: [string, unknown][] = [
    ["interactive", scienceF2C6InteractiveBM],
    ["quizzes", scienceF2C6QuizzesBM],
    ["flashcards", scienceF2C6FlashcardsBM],
    ["mindmap", scienceF2C6MindMapBM],
  ];

  for (const [name, s] of surfaces) {
    it(`${name}: uses "penunjuk", never "petunjuk"`, () => {
      expect(text(s), `${name} still uses petunjuk`).not.toMatch(/petunjuk/i);
    });
    it(`${name}: uses "kapur mati", never "kapur terhidrat"`, () => {
      expect(text(s), `${name} still uses kapur terhidrat`).not.toMatch(/kapur terhidrat/i);
    });
  }

  it("the universal indicator is named penunjuk semesta", () => {
    expect(bm).toMatch(/[Pp]enunjuk semesta/);
  });
});

describe("Chapter 6 — no mandatory-experiment framing", () => {
  for (const [lang, content] of LANGS) {
    it(`${lang}: titration is not staged as a variable-controlled experiment`, () => {
      // Chapter 6 has zero Jadual 9 experiments; the Chapter 5 scaffold must not appear.
      expect(content.sections.every((s) => s.miniExperiment === undefined)).toBe(true);
      const t = text(content);
      expect(t).not.toMatch(
        lang === "bm" ? /pemboleh ubah dimanipulasikan/i : /manipulated variable/i,
      );
      expect(t).not.toMatch(lang === "bm" ? /pemboleh ubah bergerak balas/i : /responding variable/i);
    });
  }
});

describe("Chapter 6 — assessment integrity", () => {
  const QUIZZES: [string, typeof scienceF2C6QuizzesBM][] = [
    ["bm", scienceF2C6QuizzesBM],
    ["dlp", scienceF2C6QuizzesDLP],
  ];

  for (const [lang, quiz] of QUIZZES) {
    it(`${lang}: every answer index is in range and ids are unique`, () => {
      const ids = new Set<string>();
      for (const q of quiz) {
        expect(q.answerIndex, `${q.id} answerIndex`).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex, `${q.id} answerIndex`).toBeLessThan(q.options.length);
        expect(ids.has(q.id), `duplicate quiz id ${q.id}`).toBe(false);
        ids.add(q.id);
      }
    });

    it(`${lang}: strength and equal-concentration are assessed`, () => {
      const joined = text(quiz);
      expect(joined).toMatch(lang === "bm" ? /kepekatan yang sama/i : /same concentration/i);
      expect(joined).toMatch(lang === "bm" ? /asid lemah/i : /weak acid/i);
    });
  }

  it("BM and DLP quizzes stay the same length", () => {
    expect(scienceF2C6QuizzesDLP.length).toBe(scienceF2C6QuizzesBM.length);
  });

  it("the protected quiz items survive and keep their keys", () => {
    const find = (id: string) => scienceF2C6QuizzesBM.find((q) => q.id === id);
    for (const id of ["sci-f2-c6-bm-q20", "sci-f2-c6-bm-q22", "sci-f2-c6-bm-q27"]) {
      expect(find(id), `${id} was removed`).toBeTruthy();
    }
    // q20 still tests the titration end point, now self-contained
    const q20 = find("sci-f2-c6-bm-q20")!;
    expect(q20.options[q20.answerIndex]).toMatch(/merah jambu/i);
    // q22 still tests fabric softener
    expect(find("sci-f2-c6-bm-q22")!.question).toMatch(/pelembut fabrik/i);
  });

  it("flashcards and mind maps stay in BM/DLP parity", () => {
    expect(scienceF2C6FlashcardsDLP.length).toBe(scienceF2C6FlashcardsBM.length);
    const count = (n: unknown): number => {
      const node = n as { children?: unknown[] };
      return 1 + (node.children ?? []).reduce<number>((a, c) => a + count(c), 0);
    };
    expect(count(scienceF2C6MindMapDLP)).toBe(count(scienceF2C6MindMapBM));
  });

  it("mind-map node ids are unique in both languages", () => {
    const ids = (n: unknown, acc: string[] = []): string[] => {
      const node = n as { id: string; children?: unknown[] };
      acc.push(node.id);
      for (const c of node.children ?? []) ids(c, acc);
      return acc;
    };
    for (const [lang, map] of [
      ["bm", scienceF2C6MindMapBM],
      ["dlp", scienceF2C6MindMapDLP],
    ] as const) {
      const all = ids(map);
      expect(new Set(all).size, `${lang} mind map has duplicate node ids`).toBe(all.length);
    }
  });
});
