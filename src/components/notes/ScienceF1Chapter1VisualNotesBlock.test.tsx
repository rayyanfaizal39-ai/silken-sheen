import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import { laboratoryApparatus } from "@/content/form1/science/chapter-1/chapter1-canonical";
import {
  pendulumReadings,
  reportHeadings,
} from "@/content/form1/science/chapter-1/chapter1-cleanup";
import { ScienceF1Chapter1VisualNotesBlock } from "./ScienceF1Chapter1VisualNotesBlock";

function renderChapter(lang: "bm" | "en") {
  return renderToStaticMarkup(
    createElement(ScienceF1Chapter1VisualNotesBlock, { content: chapter1Content, lang }),
  );
}

describe("Section 1.3 — live length conversion ladder", () => {
  function ladder(lang: "bm" | "en", title: string) {
    const match = renderChapter(lang).match(
      new RegExp(`<h4[^>]*>${title}</h4><ol[^>]*>([\\s\\S]*?)</ol>`),
    );
    expect(match, `${lang}: ${title} ladder`).not.toBeNull();
    const html = match![1];
    return {
      html,
      units: [...html.matchAll(/<span class="rounded-lg[^"]*">([^<]+)<\/span>/g)].map((m) => m[1]),
      multiply: [...html.matchAll(/×(\d+) →/g)].map((m) => Number(m[1])),
      divide: [...html.matchAll(/← ÷(\d+)/g)].map((m) => Number(m[1])),
    };
  }

  it.each(["bm", "en"] as const)(
    "%s renders dm between m and cm with correct factors in both directions",
    (lang) => {
      const length = ladder(lang, lang === "en" ? "Length" : "Panjang");
      expect(length.units).toEqual(["km", "m", "dm", "cm", "mm"]);
      expect(length.multiply).toEqual([1000, 10, 10, 10]);
      expect(length.divide).toEqual([1000, 10, 10, 10]);
      const mass = ladder(lang, lang === "en" ? "Mass" : "Jisim");
      expect(mass.units).toEqual(["kg", "g"]);
      expect(mass.multiply).toEqual([1000]);
      expect(mass.divide).toEqual([1000]);
      const time = ladder(lang, lang === "en" ? "Time" : "Masa");
      expect(time.units).toEqual(
        lang === "en" ? ["hour", "minute", "second"] : ["jam", "minit", "saat"],
      );
      expect(time.multiply).toEqual([60, 60]);
      expect(time.divide).toEqual([60, 60]);
    },
  );

  it("renders identical BM/DLP length conversion structure", () => {
    expect(ladder("bm", "Panjang")).toEqual(ladder("en", "Length"));
  });
});

describe("Section 1.1 — live canonical career map", () => {
  it.each(["bm", "en"] as const)(
    "%s renders all four branches and every canonical career together",
    (lang) => {
      const html = renderChapter(lang);
      const map = html.match(/<section data-science-career-map[\s\S]*?<\/section>/)?.[0];
      expect(map).toBeDefined();
      const expected = chapter1Content[lang].scienceInLife.careers;
      expect(expected).toHaveLength(4);
      expect(map!.match(/data-career-branch=/g)).toHaveLength(4);
      expect(map!.match(/data-career-name=/g)).toHaveLength(
        expected.reduce((count, branch) => count + branch.jobs.length, 0),
      );
      for (const branch of expected) {
        expect(map).toContain(`data-career-branch="${branch.field}"`);
        for (const job of branch.jobs) expect(map).toContain(`data-career-name="true">${job}</li>`);
      }
      expect(map).toContain(lang === "en" ? "Careers in Science" : "Kerjaya dalam Sains");
      expect(map).toContain(
        lang === "en"
          ? "What is your ambition? Which science subjects would help you achieve it?"
          : "Apakah cita-cita anda? Apakah mata pelajaran sains yang dapat membantu anda mencapainya?",
      );
      expect(map).not.toContain("<button");
      expect(map).not.toContain("<img");
      expect(map).not.toContain(
        `data-career-branch="${lang === "en" ? "Astronomy" : "Astronomi"}"`,
      );
      expect(map).not.toContain(
        `data-career-branch="${lang === "en" ? "Meteorology" : "Meteorologi"}"`,
      );
      const selector = html.slice(0, html.indexOf("data-science-career-map"));
      expect(chapter1Content[lang].scienceInLife.fields).toHaveLength(6);
      for (const field of chapter1Content[lang].scienceInLife.fields)
        expect(selector).toContain(field.name);
    },
  );

  it("derives the live map from supplied career data, not a duplicated list", () => {
    const source = readFileSync(
      resolve("src/components/notes/ScienceF1Chapter1VisualNotesBlock.tsx"),
      "utf8",
    );
    const mapSource = source.slice(
      source.indexOf("<section data-science-career-map"),
      source.indexOf('<Chapter1Completion section="science"'),
    );
    expect(mapSource).toContain("t.scienceInLife.careers.map");
    expect(mapSource).toContain("branch.jobs.map");
    // Changing the supplied canonical record must change the displayed map in both streams.
    for (const lang of ["bm", "en"] as const) {
      const content = structuredClone(chapter1Content);
      content[lang].scienceInLife.careers = [
        { field: "__branch_probe__", subject: "__subject_probe__", jobs: ["__career_probe__"] },
      ];
      const html = renderToStaticMarkup(
        createElement(ScienceF1Chapter1VisualNotesBlock, { content, lang }),
      );
      const map = html.match(/<section data-science-career-map[\s\S]*?<\/section>/)![0];
      expect(map.match(/data-career-branch=/g)).toHaveLength(1);
      expect(map).toContain("__career_probe__");
      expect(map).not.toContain("__subject_probe__");
      for (const branch of chapter1Content[lang].scienceInLife.careers) {
        for (const job of branch.jobs) {
          expect(map).not.toContain(`>${job}</li>`);
          expect(mapSource).not.toContain(JSON.stringify(job));
        }
      }
    }
  });
});

describe("Final cleanup — current live renderer, not legacy interactions", () => {
  it.each(["bm", "en"] as const)("%s exposes the source-backed teaching additions", (lang) => {
    const html = renderChapter(lang);
    for (const marker of [
      "data-career-subject",
      "data-fire-prevention",
      "data-conversion-ladders",
      "data-instrument-readings",
      "data-equal-volume-cubes",
      "data-investigation-report",
      "data-zero-correction",
    ])
      expect(html).toContain(marker);
    for (const diagram of [
      "standard-units",
      "vernier-reading",
      "micrometer-reading",
      "density-formula-triangle",
      "vernier-zero-0.00",
      "vernier-zero-+0.03",
      "vernier-zero-−0.06",
    ])
      expect(html).toContain(`data-chapter1-diagram="${diagram}"`);
    for (const value of ["3.20", "0.02", "3.22", "3.50", "0.38", "3.88", "+0.03", "−0.06"])
      expect(html).toContain(value);
    for (const heading of reportHeadings[lang]) expect(html).toContain(heading);
    expect(html).toContain(lang === "en" ? "AcadeMY Tip" : "Tip AcadeMY");
    expect(html).toContain(lang === "en" ? "Consistency" : "Kepersisan");
    expect(html).not.toMatch(/\bprecision\b/i);
  });

  it.each(["bm", "en"] as const)(
    "%s renders all source readings, preserving the original averages",
    (lang) => {
      const html = renderChapter(lang);
      const expected = [
        "20,9.1,9.2,9,9.1",
        "30,11.3,11.4,11.4,11.4",
        "40,13.1,13,13.1,13.1",
        "50,14.4,14.3,14.3,14.3",
        "60,15.2,15.1,15.3,15.2",
      ];
      expect(pendulumReadings.map((r) => [r.length, ...r.readings, r.average].join(","))).toEqual(
        expected,
      );
      for (const row of expected) expect(html).toContain(`data-pendulum-row="${row}"`);
      expect(html.replace(/<!--.*?-->/g, "")).toContain(lang === "en" ? "Reading 3" : "Cubaan 3");
    },
  );

  it("preserves the explicitly approved BM/DLP textbook conclusion difference", () => {
    expect(renderChapter("en")).toContain(
      "The longer the length of the pendulum, the longer the time taken for 10 complete oscillations.",
    );
    expect(renderChapter("bm")).toContain(
      "Hipotesis diterima. Semakin panjang bandul, semakin panjang tempoh diambil untuk satu ayunan lengkap.",
    );
  });

  it.each(["bm", "en"] as const)(
    "%s removes repeated function sentences and displacement step cards only from the live presentation",
    (lang) => {
      const html = renderChapter(lang);
      const entries = html.match(/<li[^>]*data-classified-apparatus="[^"]+"[^>]*>[\s\S]*?<\/li>/g)!;
      expect(entries).toHaveLength(14);
      for (const entry of entries) expect(entry).not.toContain("text-slate-300");
      expect(html).toContain('data-chapter1-diagram="water-displacement"');
      const source = readFileSync(
        resolve("src/components/notes/ScienceF1Chapter1VisualNotesBlock.tsx"),
        "utf8",
      );
      expect(source).not.toContain("t.density.waterDisplacement.map");
      expect(source).not.toContain("c.pendulumVariables.join");
    },
  );
});

describe("ScienceF1Chapter1VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(
      createElement(ScienceF1Chapter1VisualNotesBlock, {
        id: "science-notes-content",
        content: chapter1Content,
        lang: "bm",
      }),
    );
    expect(html).toContain("Pengenalan kepada Penyiasatan Saintifik");
    expect(html).toContain("Makmal sains anda");
    expect(html).toContain("Kuantiti fizik dan unitnya");
    expect(html).toContain("Pepejal di dalam air");
    expect(html).toContain("Kajian kes: eksperimen bandul");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in DLP English", () => {
    const html = renderChapter("en");
    expect(html).toContain("Introduction to Scientific Investigation");
    expect(html).toContain("Your science laboratory");
    expect(html).toContain("Physical quantities and their units");
    expect(html).toContain("Solid in water");
    expect(html).toContain("Case study: the pendulum experiment");
  });

  it.each([
    ["bm", "bm"],
    ["DLP", "en"],
  ] as const)("renders all 14 canonical apparatus with %s labels", (_stream, lang) => {
    const html = renderChapter(lang);
    expect(html.match(/data-apparatus-option=/g)).toHaveLength(14);
    for (const item of laboratoryApparatus) {
      expect(html).toContain(`data-apparatus-option="${item.id}"`);
      expect(html).toContain(item.name[lang]);
    }
  });

  it("wires the tap/click gallery to one selected detail panel", () => {
    const html = renderChapter("en");
    expect(html).toContain('role="tablist"');
    expect(html).toContain('aria-controls="selected-apparatus-detail"');
    expect(html).toContain('aria-selected="true"');
    expect(html).toContain('role="tabpanel"');
    expect(html).toContain('data-selected-apparatus="boiling-tube"');
    expect(html).toContain("How to recognise it");
  });

  it("includes the four important same-scale comparison groups and heating support context", () => {
    const html = renderChapter("en");
    for (const pair of [
      "test-tube:boiling-tube",
      "beaker:measuring-cylinder",
      "conical-flask:flat-bottom-flask",
      "burette:pipette",
    ]) {
      expect(html).toContain(`data-apparatus-comparison="${pair}"`);
    }
    expect(html).toContain("Don&#x27;t Mix Them Up");
    expect(html).toContain("data-heating-support-visual");
  });

  it("keeps names and functions in canonical data instead of duplicating them in the visual files", () => {
    const visualSource = [
      "src/components/notes/ScienceF1Chapter1VisualNotesBlock.tsx",
      "src/components/notes/blocks/LaboratoryApparatusVisual.tsx",
    ]
      .map((file) => readFileSync(resolve(process.cwd(), file), "utf8"))
      .join("\n");

    for (const item of laboratoryApparatus) {
      expect(visualSource).not.toContain(item.function.en);
      expect(visualSource).not.toContain(item.function.bm);
    }
  });
});

describe("Chapter 1 completion — live render fidelity", () => {
  const escape = (text: string) =>
    renderToStaticMarkup(createElement("span", null, text)).slice(6, -7);
  it.each(["bm", "en"] as const)(
    "%s exposes the canonical learning content in the live notes",
    (lang) => {
      const t = chapter1Content[lang];
      const html = renderChapter(lang);
      const required = [
        ...t.laboratory.rules,
        ...t.laboratory.safetyMeasures,
        ...t.laboratory.accidentSteps,
        ...t.scienceInLife.dailyConnections,
        t.scienceInLife.innovation.definition,
        ...t.scienceInLife.innovation.examples,
        t.quantitiesAndUnits.physicalQuantityDefinition,
        ...t.quantitiesAndUnits.prefixes.flatMap((p) => [
          p.prefix,
          p.symbol,
          p.standardForm,
          p.value,
        ]),
        t.measuringInstruments.innovation,
        ...t.measuringInstruments.errorTypes.flatMap((e) => [
          e.definition,
          ...e.examples,
          ...e.waysToOvercome,
        ]),
        t.density.operationalDefinition,
        ...t.density.everydayExamples,
        t.attitudesAndValues.purpose,
      ];
      expect(t.laboratory.rules).toHaveLength(10);
      for (const text of required) expect(html.includes(escape(text)), text).toBe(true);
      for (const item of laboratoryApparatus) {
        expect(html).toContain(`data-classified-apparatus="${item.id}"`);
      }
      const activities = Object.values(t.learningExperiences).flat();
      expect(activities).toHaveLength(8);
      for (const activity of activities) {
        expect(html).toContain(`data-learning-experience="${activity.id}"`);
        for (const text of [
          activity.title,
          activity.purpose,
          activity.practicalNotice!,
          ...activity.instructions,
        ])
          expect(html.includes(escape(text)), text).toBe(true);
      }
      for (const id of [
        "water-displacement",
        "pendulum-setup",
        "pendulum-graph",
        "parallax-meniscus",
      ]) {
        expect(html).toContain(`data-chapter1-diagram="${id}"`);
      }
      expect(html.match(/data-apparatus-option=/g)).toHaveLength(14);
      expect(html.match(/data-apparatus-comparison=/g)).toHaveLength(4);
      expect(html.match(/data-liquid-density=/g)).toHaveLength(4);
      expect(html).toContain('data-solid-state="float"');
    },
  );

  it.each(["bm", "en"] as const)(
    "%s preserves ten-oscillation data and one-oscillation conceptual wording",
    (lang) => {
      const html = renderChapter(lang);
      for (const pair of ["20,9.1", "30,11.4", "40,13.1", "50,14.3", "60,15.2"])
        expect(html).toContain(`data-pendulum-point="${pair}"`);
      expect(html).toContain(
        lang === "en"
          ? "Time taken for 10 complete oscillations (s)"
          : "Masa untuk 10 ayunan lengkap (s)",
      );
      expect(html).toContain(lang === "en" ? "Length of pendulum (cm)" : "Panjang bandul (cm)");
      expect(html).toContain(
        lang === "en" ? "time for one complete oscillation" : "masa untuk satu ayunan lengkap",
      );
      const procedure = chapter1Content[lang].learningExperiences.investigation[0].instructions[0];
      expect(procedure).toContain(lang === "en" ? "10 complete oscillations" : "10 ayunan lengkap");
    },
  );

  it("shares diagrams and practical depth across BM and DLP", () => {
    const markers = (html: string) =>
      html.match(
        /data-(?:chapter1-diagram|learning-experience|classified-apparatus|pendulum-point)="[^"]+"/g,
      );
    expect(markers(renderChapter("bm"))).toEqual(markers(renderChapter("en")));
  });
});
