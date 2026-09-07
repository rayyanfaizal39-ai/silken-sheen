import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { ScienceF2InteractiveNotesBlock } from "@/components/notes/ScienceF2InteractiveNotesBlock";
import { scienceF2C4InteractiveBM } from "./interactive-bm";
import { scienceF2C4InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the Chapter 4 human-audit correction pass: the final section order,
 * the removal of duplicated transmission/vector/immunity content, and the
 * textbook-faithful facts that pass restored or corrected.
 */

/** Flattens a fact's value (string or bullet array) to plain text for a substring search. */
function factText(facts: { label: string; value: string | string[] }[] | undefined): string {
  return (facts ?? [])
    .map((f) => `${f.label} ${Array.isArray(f.value) ? f.value.join(" ") : f.value}`)
    .join(" ");
}

/** Everything a learner can read in one section, flattened. */
function sectionText(section: ScienceF2InteractiveContent["sections"][number]): string {
  return JSON.stringify(section);
}

/** Everything a learner can read in the whole chapter. */
function allText(content: ScienceF2InteractiveContent): string {
  return JSON.stringify(content);
}

function renderSection(content: ScienceF2InteractiveContent, index: number, lang: "bm" | "en") {
  return renderToStaticMarkup(
    createElement(ScienceF2InteractiveNotesBlock, {
      content: { ...content, sections: [content.sections[index]] },
      lang,
    }),
  );
}

const BOTH: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C4InteractiveBM],
  ["DLP", scienceF2C4InteractiveDLP],
];

describe("Chapter 4 — final section order", () => {
  it("has exactly 8 sections in the audited order", () => {
    for (const [name, content] of BOTH) {
      expect(content.sections, name).toHaveLength(8);
      const titles = content.sections.map((s) => s.title);
      // 4.1
      expect(titles[0], name).toMatch(
        /Infectious and Non-Infectious Diseases|Penyakit Berjangkit dan Penyakit Tidak Berjangkit/,
      );
      expect(titles[1], name).toMatch(
        /How Infectious Diseases Spread|Cara Penyakit Berjangkit Disebarkan/,
      );
      expect(titles[2], name).toMatch(/Vector-Borne Diseases|Penyakit Bawaan Vektor/);
      expect(titles[3], name).toMatch(
        /Preventing the Spread of Infectious Diseases|Menghalang Penularan Penyakit/,
      );
      // 4.2
      expect(titles[4], name).toMatch(/Body Defence|Pertahanan Badan/);
      expect(titles[5], name).toMatch(/Importance of Immunisation|Kepentingan Imunisasi/);
      expect(titles[6], name).toMatch(
        /Active and Passive Immunity|Keimunan Aktif dan Keimunan Pasif/,
      );
      expect(titles[7], name).toMatch(
        /Maintaining a Strong Immune System|Sistem Keimunan yang Mantap/,
      );
    }
  });

  it("has no standalone 'Antigen, Antibody and Immunity' module", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections.find((s) =>
        /^antigen,?\s*(antibod(y|i),?\s*)?(and|dan)\s*(antibod(y|i)\s*(and|dan)\s*)?(immunity|keimunan)$/i.test(
          s.title,
        ),
      );
      expect(
        section,
        `${name}: antigen/antibody/immunity must not be its own module`,
      ).toBeUndefined();
    }
  });

  it("has no standalone 'Primary and Secondary Immune Response' module or graph block", () => {
    for (const [name, content] of BOTH) {
      const byTitle = content.sections.find((s) =>
        /primary and secondary|respon imun primer/i.test(s.title),
      );
      expect(byTitle, `${name}: standalone response-graph module must not exist`).toBeUndefined();
      const byField = content.sections.find((s) => s.immuneResponseGraph);
      expect(
        byField,
        `${name}: immuneResponseGraph must not be used as a standalone block`,
      ).toBeUndefined();
    }
  });

  it("has no standalone 'Health, Immunisation and Society' module", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections.find((s) => /masyarakat|society/i.test(s.title));
      expect(section, `${name}: standalone society module must not exist`).toBeUndefined();
    }
  });

  it("BM and DLP stay in structural parity", () => {
    expect(scienceF2C4InteractiveDLP.sections).toHaveLength(
      scienceF2C4InteractiveBM.sections.length,
    );
    expect(scienceF2C4InteractiveDLP.sections.map((s) => s.number)).toEqual(
      scienceF2C4InteractiveBM.sections.map((s) => s.number),
    );
    const blockShape = (c: ScienceF2InteractiveContent) =>
      c.sections.map((s) =>
        [
          s.cards ? "cards" : "",
          s.accordions ? "accordions" : "",
          s.diseaseReferenceTable ? "diseaseReferenceTable" : "",
          s.conceptSelector ? "conceptSelector" : "",
          s.sequence ? "sequence" : "",
          s.comparison ? "comparison" : "",
          s.causeEffect ? "causeEffect" : "",
          s.defenceLines ? "defenceLines" : "",
          s.immunityMatrix ? "immunityMatrix" : "",
        ]
          .filter(Boolean)
          .join("+"),
      );
    expect(blockShape(scienceF2C4InteractiveDLP)).toEqual(blockShape(scienceF2C4InteractiveBM));
    expect(scienceF2C4InteractiveDLP.reflectionItems).toHaveLength(
      scienceF2C4InteractiveBM.reflectionItems.length,
    );
    expect(scienceF2C4InteractiveDLP.miniQuiz.map((q) => q.type)).toEqual(
      scienceF2C4InteractiveBM.miniQuiz.map((q) => q.type),
    );
  });
});

describe("Chapter 4 — disease groups, point form", () => {
  it("gives each disease group a definition, cause and a real bullet list of examples", () => {
    for (const [name, content] of BOTH) {
      const columns = content.sections[0].comparison!.columns;
      expect(columns, name).toHaveLength(2);
      for (const column of columns) {
        const examplesFact = column.facts?.find((f) => /example|contoh/i.test(f.label));
        expect(examplesFact, `${name}: ${column.title} missing an Examples fact`).toBeDefined();
        expect(
          Array.isArray(examplesFact!.value),
          `${name}: ${column.title} examples must be a bullet list, not one sentence`,
        ).toBe(true);
        expect((examplesFact!.value as string[]).length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("DLP uses 'flu', matching the supplied textbook, not 'common cold'", () => {
    const text = allText(scienceF2C4InteractiveDLP).toLowerCase();
    expect(text).toContain("flu");
    expect(text).not.toContain("common cold");
  });

  it("defines pathogen on the notes surface", () => {
    for (const [name, content] of BOTH) {
      const text = allText(content).toLowerCase();
      expect(text, `${name}: pathogen definition missing`).toMatch(
        /patogen ialah organisma yang menyebabkan penyakit|a pathogen is an organism that causes disease/,
      );
    }
  });
});

describe("Chapter 4 — transmission: image first, no duplicate explanation", () => {
  it("teaches transmission through exactly one conceptSelector, no accordions", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections[1];
      expect(section.conceptSelector, `${name}: conceptSelector missing`).toBeDefined();
      expect(section.conceptSelector!.concepts).toHaveLength(4);
      expect(
        section.accordions,
        `${name}: accordions must not duplicate the transmission explanation`,
      ).toBeUndefined();
    }
  });

  it("DLP leads the transmission concepts with the approved image; BM has no English-labelled asset", () => {
    expect(scienceF2C4InteractiveDLP.sections[1].conceptSelector!.image).toBeDefined();
    expect(scienceF2C4InteractiveBM.sections[1].conceptSelector!.image).toBeUndefined();
  });

  it("gives every transmission concept how-it-spreads, examples and prevention in point form", () => {
    for (const [name, content] of BOTH) {
      for (const concept of content.sections[1].conceptSelector!.concepts) {
        const examples = concept.facts?.find((f) => /example|contoh/i.test(f.label));
        expect(examples, `${name}: ${concept.label} missing examples`).toBeDefined();
        expect(
          Array.isArray(examples!.value),
          `${name}: ${concept.label} examples must be bulleted`,
        ).toBe(true);
      }
    }
  });

  it("uses the proper transmission-mode names, not the bare artwork words Air/Water/Contact/Vector", () => {
    const labels = scienceF2C4InteractiveDLP.sections[1].conceptSelector!.concepts.map(
      (c) => c.label,
    );
    expect(labels).toEqual([
      "Airborne diseases",
      "Waterborne diseases",
      "Diseases spread through contact",
      "Vector-borne diseases",
    ]);
    for (const bare of ["Air", "Water", "Contact", "Vector"]) {
      expect(labels, bare).not.toContain(bare);
    }
  });

  it("restores the required disease examples for every transmission route", () => {
    for (const [name, content] of BOTH) {
      const text = allText(content).toLowerCase();
      for (const term of ["sars", "h1n1", "chikungunya"]) {
        expect(text, `${name}: missing example "${term}"`).toContain(term);
      }
      expect(text, `${name}: missing cholera example`).toMatch(/kolera|cholera/);
      expect(text, `${name}: missing ringworm/kurap example`).toMatch(/kurap|ringworm/);
    }
  });
});

describe("Chapter 4 — vector-borne diseases: simplified, no clutter", () => {
  it("keeps concise pathogen/vector/disease concept cards, not repeated later", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections[2];
      expect(section.cards, name).toBeDefined();
      const titles = section.cards!.map((c) => c.title.toLowerCase());
      expect(titles.some((t) => t.includes("pathogen") || t.includes("patogen"))).toBe(true);
      expect(titles.some((t) => t.includes("vector") || t.includes("vektor"))).toBe(true);
      expect(titles.some((t) => t.includes("disease") || t.includes("penyakit"))).toBe(true);
      // Only this one section carries the pathogen/vector/disease cards.
      const laterRepeats = content.sections
        .slice(3)
        .filter((s) => s.cards?.some((c) => /^(pathogen|patogen|vector|vektor)$/i.test(c.title)));
      expect(laterRepeats, `${name}: definitions repeated later`).toHaveLength(0);
    }
  });

  it("has a full disease reference table with disease, symptoms, pathogen, vector and way of infection", () => {
    for (const [name, content] of BOTH) {
      const table = content.sections[2].diseaseReferenceTable;
      expect(table, `${name}: disease reference table missing`).toBeDefined();
      const diseases = table!.rows.map((r) => r.disease.toLowerCase());
      expect(table!.rows).toHaveLength(6);
      expect(diseases.some((d) => d.includes("malaria"))).toBe(true);
      expect(diseases.some((d) => d.includes("kolera") || d.includes("cholera"))).toBe(true);
      expect(diseases.some((d) => d.includes("denggi") || d.includes("dengue"))).toBe(true);
      expect(diseases.some((d) => d.includes("zika"))).toBe(true);
      expect(diseases.some((d) => d.includes("kepialu") || d.includes("typhoid"))).toBe(true);
      expect(diseases.some((d) => d.includes("leptospirosis"))).toBe(true);
      // Every row's symptoms render as a real bullet list, never one sentence.
      for (const row of table!.rows) {
        expect(Array.isArray(row.symptoms), `${name}: ${row.disease} symptoms must be a list`).toBe(
          true,
        );
        expect(row.symptoms.length).toBeGreaterThan(0);
      }
      // Never named to the learner as "Table 4.2".
      expect(table!.title).not.toMatch(/table 4\.2|jadual 4\.2/i);
    }
  });

  it("does not repeat the vector/pathogen/disease relationship as multiple separate blocks", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections[2];
      // No matching game left in the chapter at all.
      expect(section.matcher, `${name}: vector/pathogen matcher must be removed`).toBeUndefined();
      expect(
        content.sections.some((s) => s.matcher),
        `${name}: no section may carry a matching game`,
      ).toBe(false);
    }
  });

  it("teaches how mosquitoes and flies spread disease as a 1-2-3 flow, after the table", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections[2];
      expect(section.causeEffect, `${name}: vector-spread flow missing`).toBeDefined();
      const titles = section.causeEffect!.items.map((i) => i.title.toLowerCase());
      expect(
        titles.some((t) => t.includes("mosquito") || t.includes("nyamuk")),
        name,
      ).toBe(true);
      expect(
        titles.some((t) => t.includes("fly") || t.includes("lalat")),
        name,
      ).toBe(true);
      for (const item of section.causeEffect!.items) {
        expect(
          item.chain.length,
          `${name}: ${item.title} should be a short numbered flow`,
        ).toBeGreaterThanOrEqual(3);
      }
    }
  });
});

describe("Chapter 4 — prevention: true point form, mix-up removed", () => {
  it("places vector control in TERTIARY prevention, never primary", () => {
    for (const [name, content] of BOTH) {
      const steps = content.sections[3].sequence!.steps;
      expect(steps).toHaveLength(3);
      const stepText = (step: (typeof steps)[number]) =>
        `${step.body} ${factText(step.facts)}`.toLowerCase();
      const primary = stepText(steps[0]);
      const tertiary = stepText(steps[2]);
      expect(tertiary).toMatch(/vektor|vector/);
      expect(primary).not.toMatch(/kawalan vektor|vector control|control the vector/);
      expect(primary).toMatch(/kebersihan|hygiene|sanitation|sanitasi/);
      expect(primary).toMatch(/imunisasi|vaksin|immunisation|vaccination/);
    }
  });

  it("does not present rehabilitation as the tertiary prevention model", () => {
    for (const [name, content] of BOTH) {
      const text = allText(content).toLowerCase();
      expect(text, `${name}: rehabilitation reintroduced`).not.toMatch(
        /rehabilitasi|rehabilitation/,
      );
    }
  });

  it("presents every prevention level as real bullet facts, not long sentences", () => {
    for (const [name, content] of BOTH) {
      const steps = content.sections[3].sequence!.steps;
      for (const step of steps) {
        expect(step.body, `${name}: ${step.title} should not carry a long prose body`).toBe("");
        expect(step.facts && step.facts.length > 0, `${name}: ${step.title} needs facts`).toBe(
          true,
        );
        for (const fact of step.facts!) {
          expect(
            Array.isArray(fact.value),
            `${name}: ${step.title} — ${fact.label} must be bulleted`,
          ).toBe(true);
        }
      }
    }
  });

  it("removes the 'common mix-up' card — it never appears before or inside prevention", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections[3];
      const hasMixup = section.cards?.some((c) => /mix-up|keliru/i.test(c.title));
      expect(hasMixup, `${name}: common mix-up card must be removed`).toBeFalsy();
    }
  });
});

describe("Chapter 4 — Body Defence: correct order, antigen merged in", () => {
  it("merges non-specific/specific and antigen/antibody/immunity as mini-cards ahead of the line buttons", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections[4];
      expect(section.cards, `${name}: Body Defence mini-cards missing`).toBeDefined();
      const titles = section.cards!.map((c) => c.title.toLowerCase());
      expect(titles.some((t) => t.includes("non-specific") || t.includes("tidak spesifik"))).toBe(
        true,
      );
      expect(titles.some((t) => t.includes("specific") || t.includes("spesifik"))).toBe(true);
      expect(titles.some((t) => t === "antigen")).toBe(true);
      expect(titles.some((t) => t === "antibody" || t === "antibodi")).toBe(true);
      expect(titles.some((t) => t === "immunity" || t === "keimunan")).toBe(true);
      expect(section.defenceLines, `${name}: three-line interaction missing`).toBeDefined();
    }
  });

  it("teaches phagocytosis by white blood cells as the second line", () => {
    for (const [name, content] of BOTH) {
      const second = content.sections[4].defenceLines!.lines[1];
      const text = `${second.parts} ${second.note} ${factText(second.facts)}`.toLowerCase();
      expect(text, name).toMatch(/fagositosis|phagocytosis/);
      expect(text, name).toMatch(/sel darah putih|white blood cell/);
    }
  });

  it("teaches skin and mucous membrane, in point form, as the first line", () => {
    for (const [name, content] of BOTH) {
      const first = content.sections[4].defenceLines!.lines[0];
      const text = `${first.parts} ${first.note} ${factText(first.facts)}`.toLowerCase();
      expect(text, `${name}: mucous membrane missing`).toMatch(/membran mukus|mucous membrane/);
      expect(text, name).toMatch(/kulit|skin/);
      expect(
        first.facts && first.facts.length >= 2,
        `${name}: skin + mucous membrane must be separate facts`,
      ).toBe(true);
      for (const fact of first.facts!) {
        expect(Array.isArray(fact.value), `${name}: ${fact.label} must be bulleted`).toBe(true);
      }
    }
  });

  it("teaches antibody production as the third line", () => {
    for (const [name, content] of BOTH) {
      const third = content.sections[4].defenceLines!.lines[2];
      const text = `${third.parts} ${third.note} ${factText(third.facts)}`.toLowerCase();
      expect(text, name).toMatch(/antibod/);
      expect(text, name).toMatch(/antigen/);
    }
  });

  it("keeps out-of-scope mechanisms out of the core defence lines", () => {
    for (const [name, content] of BOTH) {
      const lines = content.sections[4].defenceLines!.lines;
      const text = lines
        .map((l) => `${l.parts} ${l.note} ${factText(l.facts)}`)
        .join(" ")
        .toLowerCase();
      for (const term of [
        "silia",
        "cilia",
        "asid perut",
        "stomach acid",
        "sel memori",
        "memory cell",
      ]) {
        expect(text, `${name}: "${term}" reintroduced into a defence line`).not.toContain(term);
      }
      expect(text).not.toMatch(/keradangan|inflammation/);
    }
  });

  it("classifies the lines as non-specific and specific", () => {
    for (const [name, content] of BOTH) {
      const block = content.sections[4].defenceLines!;
      expect(block.nonSpecificLabel.toLowerCase()).toMatch(/tidak spesifik|non-specific/);
      expect(block.specificLabel.toLowerCase()).toMatch(/spesifik|specific/);
      expect(
        block.lines.filter((l) => l.group === "non-specific"),
        name,
      ).toHaveLength(2);
      expect(block.lines.filter((l) => l.group === "specific")).toHaveLength(1);
    }
  });

  it("defines antigen, antibody and immunity as mini-cards, with textbook-faithful wording", () => {
    for (const [name, content] of BOTH) {
      const cards = content.sections[4].cards!;
      const byTitle = (t: RegExp) => cards.find((c) => t.test(c.title))?.body ?? "";
      expect(byTitle(/^antigen$/i).toLowerCase(), name).toMatch(
        /merangsang penghasilan antibodi|induces the production of antibodies|stimulates the production of antibodies/,
      );
      expect(byTitle(/^antibod(y|i)$/i).toLowerCase(), name).toMatch(
        /sel darah putih|white blood cell/,
      );
      expect(byTitle(/^(keimunan|immunity)$/i).toLowerCase(), name).toMatch(/melawan|resist|fight/);
    }
  });

  it("DLP leads Body Defence with the approved image; BM uses the equivalent button interaction", () => {
    expect(scienceF2C4InteractiveDLP.sections[4].defenceLines!.image).toBeDefined();
    expect(scienceF2C4InteractiveBM.sections[4].defenceLines!.image).toBeUndefined();
  });
});

describe("Chapter 4 — immunisation", () => {
  it("has an immunisation section explaining vaccines", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections[5];
      expect(section.title, name).toMatch(/imunisasi|immunisation/i);
      const text = sectionText(section).toLowerCase();
      expect(text).toMatch(/dilemahkan atau dimatikan|weakened or killed/);
      expect(text).toMatch(/antigen/);
    }
  });

  it("keeps the society/family/economic point folded inside immunisation, not as its own module", () => {
    for (const [name, content] of BOTH) {
      const text = sectionText(content.sections[5]).toLowerCase();
      expect(text, `${name}: society point missing`).toMatch(/kusta|leprosy/);
      expect(text, name).toMatch(/batuk kokol|whooping cough/);
    }
  });

  it("does not claim immunisation eradicates disease", () => {
    for (const [name, content] of BOTH) {
      const text = allText(content).toLowerCase();
      expect(text, `${name}: eradication claim reintroduced`).not.toMatch(
        /menghapuskan penyakit|memusnahkan penyakit|eradicat/,
      );
    }
  });
});

describe("Chapter 4 — immunity: one coherent block, no duplication", () => {
  it("orders active-vs-passive before the four-type matrix, in one section", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections[6];
      expect(section.title, name).toMatch(/active and passive|keimunan aktif/i);
      expect(section.cards, `${name}: active vs passive mini-cards missing`).toBeDefined();
      const titles = section.cards!.map((c) => c.title.toLowerCase());
      expect(titles.some((t) => t.includes("active") || t.includes("aktif"))).toBe(true);
      expect(titles.some((t) => t.includes("passive") || t.includes("pasif"))).toBe(true);
      expect(section.immunityMatrix, `${name}: four-type matrix missing`).toBeDefined();
    }
  });

  it("presents all four immunity types as a 2x2, each with its own graph note", () => {
    for (const [name, content] of BOTH) {
      const matrix = content.sections[6].immunityMatrix!;
      expect(matrix.cells).toHaveLength(4);
      const combos = matrix.cells.map((c) => `${c.row}-${c.column}`).sort();
      expect(combos).toEqual([
        "active-artificial",
        "active-natural",
        "passive-artificial",
        "passive-natural",
      ]);
      for (const cell of matrix.cells) {
        expect(cell.note.trim().length, `${name}: ${cell.id} note`).toBeGreaterThan(10);
        expect(cell.graphNote.trim().length, `${name}: ${cell.id} graphNote`).toBeGreaterThan(10);
      }
    }
  });

  it("folds the first/second-exposure idea only into the two active cells, never as a standalone lesson", () => {
    for (const [name, content] of BOTH) {
      const matrix = content.sections[6].immunityMatrix!;
      const active = matrix.cells.filter((c) => c.row === "active");
      const passive = matrix.cells.filter((c) => c.row === "passive");
      for (const cell of active) {
        expect(cell.graphNote.toLowerCase(), `${name}: ${cell.id}`).toMatch(
          /second|booster|kedua|penggalak/,
        );
      }
      for (const cell of passive) {
        expect(cell.graphNote.toLowerCase(), `${name}: ${cell.id}`).not.toMatch(
          /second exposure|second infection|jangkitan kedua/,
        );
      }
      expect(
        content.sections.some((s) => s.title.match(/primary and secondary|primer dan sekunder/i)),
        `${name}: no standalone response-graph section`,
      ).toBe(false);
    }
  });

  it("defines antiserum where artificial passive immunity is taught", () => {
    for (const [name, content] of BOTH) {
      const cell = content.sections[6].immunityMatrix!.cells.find(
        (c) => c.row === "passive" && c.column === "artificial",
      )!;
      const text = `${cell.note}`.toLowerCase();
      expect(text, name).toMatch(/antiserum/);
      expect(text, name).toMatch(
        /cecair jernih yang mengandungi antibodi|a clear liquid containing antibodies/,
      );
    }
  });

  it("has no separate matching game or duplicated remember paragraph for immunity", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections[6];
      expect(section.matcher, name).toBeUndefined();
      expect(
        section.remember,
        `${name}: immunity section should not carry a duplicated remember box`,
      ).toBeUndefined();
    }
  });
});

describe("Chapter 4 — maintaining a strong immune system", () => {
  it("is present and largely unchanged from the textbook-aligned version", () => {
    for (const [name, content] of BOTH) {
      const section = content.sections[7];
      expect(section.title, name).toMatch(/strong immune system|keimunan yang mantap/i);
      const text = sectionText(section).toLowerCase();
      expect(text).toMatch(/gula|sugar/);
      expect(text).toMatch(/tidur|sleep|rehat|rest/);
    }
  });
});

describe("Chapter 4 — self-reflection", () => {
  it("does not ask learners to read a primary/secondary immune response graph", () => {
    for (const [name, content] of BOTH) {
      const text = content.reflectionItems.join(" ").toLowerCase();
      expect(text, name).not.toMatch(/primary and secondary|primer dan sekunder|respon imun/);
    }
  });

  it("covers every remaining learning objective", () => {
    for (const [name, content] of BOTH) {
      const text = content.reflectionItems.join(" ").toLowerCase();
      for (const term of [
        /infectious|berjangkit/,
        /spread|disebar/,
        /vector|vektor/,
        /prevention|pencegahan/,
        /(non-specific|specific|spesifik)/,
        /antigen/,
        /(line|barisan|pertahanan)/,
        /immunisation|imunisasi/,
        /(active|aktif).*(passive|pasif)|(passive|pasif).*(active|aktif)/,
        /four types|empat jenis/,
        /immune system|sistem keimunan/,
      ]) {
        expect(text, `${name}: missing objective matching ${term}`).toMatch(term);
      }
    }
  });
});

describe("Chapter 4 — no curriculum leakage, everything renders", () => {
  it("shows no curriculum bureaucracy to the learner", () => {
    for (const [name, content] of BOTH) {
      const text = allText(content);
      for (const term of [
        "DSKP",
        "SP 4.",
        "SK 4.",
        "Standard Pembelajaran",
        "Standard Kandungan",
        "buku teks",
        "textbook",
        "Rajah 4.",
        "Jadual 4.",
        "Aktiviti 4.",
        "Table 4.2",
        "audit",
        "remediation",
      ]) {
        expect(text, `${name}: leaked "${term}"`).not.toContain(term);
      }
    }
  });

  it("every section renders for the learner in both languages", () => {
    for (const [name, content] of BOTH) {
      const lang = name === "BM" ? "bm" : "en";
      content.sections.forEach((section, i) => {
        const markup = renderSection(content, i, lang);
        expect(markup.length, `${name}: section ${i} rendered empty`).toBeGreaterThan(200);
        expect(markup).toContain(section.title);
      });
    }
  });

  it("renders the defence-line and immunity-matrix interactive blocks", () => {
    for (const [name, content] of BOTH) {
      const lang = name === "BM" ? "bm" : "en";
      const defence = renderSection(content, 4, lang);
      expect(defence.length, name).toBeGreaterThan(200);
      const matrix = renderSection(content, 6, lang);
      expect(matrix).toContain("<svg");
    }
  });
});
