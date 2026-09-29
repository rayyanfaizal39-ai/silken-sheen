// @vitest-environment jsdom
import { act, createElement, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { bab7Content, bab7Supplement } from "@/content/form1/science/chapter-7/bab7-content";
import { Chapter7AirPollution } from "./Chapter7AirPollution";
import { ScienceF1Chapter7VisualNotesBlock } from "./ScienceF1Chapter7VisualNotesBlock";
let host: HTMLDivElement, root: Root;
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
});
const mount = (node: ReactNode) => {
  act(() => root.render(node));
  return host;
};
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
const geometry = () => [...host.querySelectorAll("svg")].map((n) => n.outerHTML);
const selectSource = (i: number) =>
  act(() => host.querySelectorAll<HTMLButtonElement>("[data-source-link] button")[i].click());
describe("Chapter 7 Pass 3 source-only pollution", () => {
  it("both approved visual files retain their exact normalized hashes", () => {
    for (const [file, digest] of Object.entries({
      Chapter7AirComposition: "1fae01ab2ba68bd943122bde98c33590a93c080ab99e76d27caf160d43b5f24c",
      Chapter7Combustion: "5d04f9eca0b4222190e6221275fba5b25b944cb4fdb0a11cdb6e3c32425d9cc0",
    }))
      expect(
        hash(readFileSync(`src/components/notes/${file}.tsx`, "utf8").replace(/\r\n/g, "\n")),
      ).toBe(digest);
  });
  for (const lang of ["en", "bm"] as const) {
    const t = bab7Content[lang],
      p = t.pollution;
    const render = () => mount(createElement(Chapter7AirPollution, { source: p }));
    it(`${lang}: locked 7.1 and 7.2 data retain pre-pass hashes`, () => {
      expect(
        hash(
          JSON.stringify(
            Object.fromEntries(
              (["airLesson", "hook", "composition", "experiment", "uses", "cycles"] as const).map(
                (k) => [k, t[k]],
              ),
            ),
          ),
        ),
      ).toBe(
        lang === "en"
          ? "fccd4fe42abca059ec47002e2441eef562d2a5e31c4cdda98a564dab9bc04845"
          : "d5c75650d83564ed67ae45b26ee927eeb095a8b819085963053a52a304f98631",
      );
      expect(hash(JSON.stringify(t.combustion))).toBe(
        lang === "en"
          ? "5498a3f0332402f9d247f3f2f591449872bc906ea46cf471d70b4f62e87fb002"
          : "e6bd38e1315b86aec0f4a18be8252576b93a3ba576ec49cf6dcc9a54e5b77ffd",
      );
    });
    it(`${lang}: exactly three official sections, one 7.3, source definition and no legacy copy`, () => {
      mount(createElement(ScienceF1Chapter7VisualNotesBlock, { content: bab7Content, lang }));
      expect(
        [...host.querySelectorAll("[data-official-subtopic]")].map((n) =>
          n.getAttribute("data-official-subtopic"),
        ),
      ).toEqual(["7.1", "7.2", "7.3"]);
      expect(host.querySelector("[data-pollution-definition]")?.textContent).toBe(p.definition);
      expect(host.textContent).not.toMatch(
        /biological contaminants|bahan cemar biologi|Why can cave explorers|peneroka gua|unsafe level|aras tidak selamat/,
      );
      expect(p.definition).toBe(
        lang === "en"
          ? "Air pollution is a situation which involves the presence of any pollutants in the air. This brings harm and discomfort to living things and destroys the environment."
          : "Pencemaran udara merupakan satu keadaan yang melibatkan kehadiran sebarang bahan pencemar dalam udara. Keadaan ini boleh menyebabkan kemudaratan dan ketidakselesaan kepada manusia atau organisma hidup lain serta merosakkan alam sekitar apabila dibebaskan ke atmosfera.",
      );
    });
    it(`${lang}: every source-to-pollutant connection is visible and selectable`, () => {
      render();
      expect(host.querySelectorAll("[data-source-link]")).toHaveLength(6);
      p.sources.forEach((s, i) => {
        const row = host.querySelector(`[data-source-link="${i}"]`)!;
        expect(row.textContent).toContain(s.from);
        expect([...row.querySelectorAll("li")].map((n) => n.textContent)).toEqual(s.pollutants);
        selectSource(i);
        expect(row.querySelector("button")?.getAttribute("aria-pressed")).toBe("true");
        expect(
          host.querySelector("[data-selected-source] svg")?.getAttribute("data-pollution-symbol"),
        ).toBe(`source-${i}`);
        expect(host.querySelector("[data-selected-source]")?.textContent).toContain(
          s.pollutants.join(" · "),
        );
      });
    });
    it(`${lang}: discussion 7.5 preserves historical 2015 context and presentation`, () => {
      render();
      const a = host.querySelector('[data-pollution-activity="7.5"]')!;
      expect(a.textContent).toContain(p.activity75.aim);
      expect(a.textContent).toContain(p.activity75.context);
      expect(a.textContent).toMatch(/Kuala Lumpur, 2015/);
      expect([...a.querySelectorAll("li")].map((n) => n.textContent)).toEqual(
        p.activity75.instructions,
      );
      expect(a.textContent).not.toMatch(/apparatus|radas|experiment|eksperimen/i);
    });
    for (const group of p.effects)
      it(`${lang}: ${group.category} has every verified relationship`, () => {
        render();
        expect(
          [...host.querySelectorAll(`[data-effect-group="${group.category}"] li`)].map(
            (n) => n.textContent,
          ),
        ).toEqual(group.items);
        expect(host.querySelectorAll("[data-effect-group]")).toHaveLength(4);
      });
    it(`${lang}: four separate pathways with canonical causes, not one generic climate box`, () => {
      render();
      expect(
        [...host.querySelectorAll("[data-effect-path]")].map((n) =>
          n.getAttribute("data-effect-path"),
        ),
      ).toEqual(["haze", "greenhouse", "ozone", "acid"]);
      p.pathways.forEach((path) => {
        const node = host.querySelector(`[data-effect-path="${path.id}"]`)!;
        expect(node.textContent).toContain(path.pollutant);
        expect(node.querySelector("figcaption")?.textContent).toBe(path.effect);
        expect(node.querySelector("svg")?.getAttribute("data-pollution-symbol")).toBe(path.id);
      });
      expect(host.textContent).not.toMatch(/PM2\.5|infrared|radiative|radical|pH\s?\d/);
    });
    it(`${lang}: factory → smoke → haze → chimney filter uses source-backed relationships`, () => {
      render();
      const n = host.querySelector("[data-source-effect-control]")!;
      [
        p.sources[0].origins[1],
        p.pathways[0].pollutant,
        p.pathways[0].effect,
        p.controls[2].items[2],
      ].forEach((s) => expect(n.textContent).toContain(s));
    });
    it(`${lang}: acid rain has four separate consequences and plant pathway shows sunlight/photosynthesis`, () => {
      render();
      expect([...host.querySelectorAll("[data-acid-effect] p")].map((n) => n.textContent)).toEqual([
        p.effects[1].items[1],
        p.effects[1].items[2],
        p.effects[2].items[0],
        p.effects[2].items[1],
      ]);
      expect(
        [...host.querySelectorAll("[data-acid-effect] svg")].map((n) =>
          n.getAttribute("data-pollution-symbol"),
        ),
      ).toEqual(["buildings", "iron", "soil", "water"]);
      p.photosynthesis.forEach((s) =>
        expect(host.querySelector("[data-photosynthesis-path]")?.textContent).toContain(s),
      );
      expect(
        host.querySelector("[data-photosynthesis-path] svg")?.getAttribute("data-pollution-symbol"),
      ).toBe("plants");
    });
    for (let i = 0; i < 3; i++)
      it(`${lang}: control pillar ${i} contains all source measures`, () => {
        render();
        const n = host.querySelector(`[data-control-pillar="${i}"]`)!;
        expect(n.textContent).toContain(p.controls[i].heading);
        expect([...n.querySelectorAll("li span:last-child")].map((n) => n.textContent)).toEqual(
          p.controls[i].items,
        );
        expect(p.controls[i].items).toHaveLength([4, 4, 5][i]);
      });
    it(`${lang}: Activity 7.6 remains group research and presentation`, () => {
      render();
      const a = host.querySelector('[data-pollution-activity="7.6"]')!;
      expect(a.textContent).toContain(p.activity76.aim);
      expect([...a.querySelectorAll("li")].map((n) => n.textContent)).toEqual(
        p.activity76.instructions,
      );
      expect(a.textContent).toContain("Jabatan Alam Sekitar");
      expect(a.textContent).not.toMatch(/apparatus|radas|experiment|eksperimen/i);
    });
    it(`${lang}: API has exactly five range-plus-label bands, no live readings`, () => {
      render();
      expect(p.api.bands.map((b) => b.range)).toEqual([
        "0–50",
        "51–100",
        "101–200",
        "201–300",
        ">300",
      ]);
      expect([...host.querySelectorAll("[data-api-band]")].map((n) => n.textContent)).toEqual(
        p.api.bands.map((b) => b.range + b.label),
      );
      expect(host.querySelector("[data-api-scale]")?.textContent).toContain(p.api.guidance);
      expect(host.querySelector("[data-api-scale]")?.textContent).not.toMatch(
        /live|current|semasa|real.time/i,
      );
    });
    it(`${lang}: six textbook practice questions and exact answer mapping`, () => {
      render();
      expect(
        [...host.querySelectorAll("[data-practice-question] > p")].map((n) => n.textContent),
      ).toEqual(p.practice.questions);
      expect(p.practice.matches.map((m) => m.effect)).toEqual([
        p.pathways[1].effect,
        p.pathways[3].effect,
        p.pathways[2].effect,
      ]);
      expect(p.practice.choices.map((c) => c.correct)).toEqual([true, true, false, true, false]);
    });
    it(`${lang}: matching and checkbox answers respond to incorrect then correct input`, () => {
      render();
      const check = () =>
        act(() => host.querySelector<HTMLButtonElement>('[data-practice="7.3"] button')!.click());
      check();
      expect(host.querySelector('[data-match-feedback="0"]')?.textContent).toBe(p.labels.retry);
      p.practice.matches.forEach((m, i) =>
        act(() => {
          const s = host.querySelectorAll("select")[i];
          s.value = m.effect;
          s.dispatchEvent(new Event("change", { bubbles: true }));
        }),
      );
      [0, 1, 3].forEach((i) =>
        act(() => host.querySelectorAll<HTMLInputElement>('[type="checkbox"]')[i].click()),
      );
      check();
      expect(
        [...host.querySelectorAll("[data-match-feedback], [data-choice-feedback]")].map(
          (n) => n.textContent,
        ),
      ).toEqual(Array(8).fill(p.labels.correct));
      expect(host.querySelector("[aria-live]")?.textContent).toBe(p.labels.correct);
    });
    it(`${lang}: legacy aliases refer to one canonical owner; review adds no new claims`, () => {
      expect(t.pollutionSources).toBe(p.sources);
      expect(t.pollutionEffects).toBe(p.effects);
      expect(t.prevention).toBe(p.controls);
      expect(t.api).toBe(p.api.bands);
      expect(bab7Supplement[lang].pollutionDefinition).toBe(p.definition);
      expect(bab7Supplement[lang].activeRecall).toEqual([]);
      expect(t.keyExamFacts).toEqual(p.effects[3].items);
      expect(t.chapterSummary).toBe(t.airLesson.subtopics.map((s) => s.title).join(" · "));
      expect(t.keyTerms).toHaveLength(16);
      expect(t.keyExamFacts.join(" ")).not.toMatch(/blood|darah/);
    });
  }
  it("Figure 7.12 keeps the verified edition-specific pollutant edges", () => {
    const en = bab7Content.en.pollution.sources,
      bm = bab7Content.bm.pollution.sources;
    expect(en.map((s) => s.pollutants)).toEqual([
      [
        "Smoke",
        "Soot",
        "Dust",
        "Carbon monoxide",
        "Sulphur dioxide",
        "Nitrogen dioxide",
        "Plumbum",
      ],
      ["Dust", "Soot", "Smoke"],
      ["Dust", "Soot"],
      ["Radioactive materials"],
      ["Aerosol spray", "Chemical fertilisers"],
      ["Chlorofluorocarbon (CFC)"],
    ]);
    expect(bm.map((s) => s.pollutants)).toEqual([
      [
        "Asap",
        "Jelaga",
        "Habuk",
        "Karbon monoksida",
        "Sulfur dioksida",
        "Nitrogen dioksida",
        "Plumbum",
      ],
      ["Habuk", "Jelaga", "Asap", "Zarah logam"],
      ["Habuk dan debu"],
      ["Bahan radioaktif"],
      ["Bahan semburan pestisid", "Baja kimia"],
      ["Klorofluorokarbon (CFC)"],
    ]);
    expect(bab7Content.bm.pollution.effects[0].items[0]).toContain("Asap dan jelaga");
    expect(bab7Content.en.pollution.effects[0].items[0]).toContain("Smoke and dust");
    expect(bab7Content.bm.pollution.practice.choices[4].text).toBe(
      "Menggunakan minyak dan petrol berplumbum",
    );
  });
  it("BM/DLP share every scientific SVG in every source-selection state", () => {
    for (let i = 0; i < 6; i++) {
      mount(createElement(Chapter7AirPollution, { source: bab7Content.en.pollution }));
      selectSource(i);
      const en = geometry();
      mount(createElement(Chapter7AirPollution, { source: bab7Content.bm.pollution }));
      selectSource(i);
      expect(geometry()).toEqual(en);
    }
  });
  it("component consumes canonical facts and contains no factual language datasets", () => {
    const source = structuredClone(bab7Content.en.pollution);
    source.sources[0].pollutants[0] = "canonical pollutant sentinel";
    source.effects[0].items[0] = "canonical effect sentinel";
    source.controls[0].items[0] = "canonical measure sentinel";
    source.practice.questions[0] = "canonical question sentinel";
    mount(createElement(Chapter7AirPollution, { source }));
    ["pollutant", "effect", "measure", "question"].forEach((s) =>
      expect(host.textContent).toContain(`canonical ${s} sentinel`),
    );
    const file = readFileSync("src/components/notes/Chapter7AirPollution.tsx", "utf8");
    expect(file).not.toMatch(/const (en|bm|facts|pollutants|questions)\s*=/);
    expect(file).not.toMatch(/Sulphur dioxide|Karbon monoksida|Kuala Lumpur|HCFC|fetch\(/);
  });
});
