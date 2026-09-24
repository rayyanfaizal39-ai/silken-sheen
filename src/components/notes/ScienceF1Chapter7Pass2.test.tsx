// @vitest-environment jsdom
import { act, createElement, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { beforeEach, afterEach, describe, expect, it } from "vitest";
import {
  bab7Content,
  bab7Supplement,
  type FireCondition,
} from "@/content/form1/science/chapter-7/bab7-content";
import { Chapter7Combustion, CombustionApparatus, FireTriangle } from "./Chapter7Combustion";
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
const click = (selector: string, index = 0) =>
  act(() => host.querySelectorAll<HTMLButtonElement>(selector)[index].click());
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
const geometry = () =>
  [...host.querySelectorAll("svg")].map((svg) => {
    const copy = svg.cloneNode(true) as SVGElement;
    copy.removeAttribute("aria-label");
    return copy.outerHTML;
  });

describe("Chapter 7 Pass 2", () => {
  it("does not edit the approved Pass 1 visual component", () => {
    expect(
      hash(
        readFileSync("src/components/notes/Chapter7AirComposition.tsx", "utf8").replace(
          /\r\n/g,
          "\n",
        ),
      ),
    ).toBe("1fae01ab2ba68bd943122bde98c33590a93c080ab99e76d27caf160d43b5f24c");
  });
  for (const lang of ["en", "bm"] as const) {
    const t = bab7Content[lang],
      c = t.combustion,
      l = c.lesson;
    const render = () => mount(createElement(Chapter7Combustion, { source: c }));
    it(`${lang}: one official 7.2 in the three-section chapter`, () => {
      mount(createElement(ScienceF1Chapter7VisualNotesBlock, { content: bab7Content, lang }));
      expect(
        [...host.querySelectorAll("[data-official-subtopic]")].map((n) =>
          n.getAttribute("data-official-subtopic"),
        ),
      ).toEqual(["7.1", "7.2", "7.3"]);
      expect(host.querySelectorAll('[data-official-subtopic="7.2"]')).toHaveLength(1);
      expect([...host.querySelectorAll("h2")].map((n) => n.textContent)).toEqual(
        t.airLesson.subtopics.map((s) => `${s.code} ${s.title}`),
      );
    });
    it(`${lang}: all non-combustion canonical content and 7.3 pollution definition retain their pre-pass hashes`, () => {
      const locked = {
        ...Object.fromEntries(Object.entries(t).filter(([key]) => key !== "combustion")),
        pollutionDefinition: bab7Supplement[lang].pollutionDefinition,
      };
      expect(hash(JSON.stringify(locked))).toBe(
        lang === "en"
          ? "fa8fd0bdee4b8e4fd047de329871b8a137f6d4bb7d9545c4738c935d9cf92ef3"
          : "669f5f1cdb1a745b12b150c0dec45eee3f1a4d36c6e4520d1568c73c1a888885",
      );
    });
    it(`${lang}: definition matches the textbook`, () => {
      render();
      expect(host.querySelector("[data-combustion-definition]")!.textContent).toBe(
        lang === "en"
          ? "Combustion is the reaction that occurs when a substance is heated in the presence of oxygen which produces heat energy and light energy."
          : "Pembakaran bermaksud tindak balas yang berlaku apabila suatu bahan dipanaskan dengan kehadiran oksigen dan membebaskan tenaga haba dan tenaga cahaya.",
      );
    });
    it(`${lang}: each triangle condition is essential; removal hides its actual side and extinguishes the flame`, () => {
      render();
      const triangle = host.querySelector("[data-fire-triangle]")!;
      expect(triangle.querySelectorAll("[data-triangle-side]")).toHaveLength(3);
      expect(triangle.querySelector("[data-flame]")).not.toBeNull();
      const conditions = ["heat", "oxygen", "fuel"] as const;
      conditions.forEach((condition, i) => {
        click("[data-triangle-controls] button", i);
        expect(triangle.getAttribute("data-removed")).toBe(condition);
        expect(
          triangle.querySelector(`[data-triangle-side="${condition}"]`)!.getAttribute("opacity"),
        ).toBe("0");
        expect(triangle.querySelectorAll('[data-present="true"]')).toHaveLength(2);
        expect(triangle.querySelector("[data-flame]")).toBeNull();
        expect(triangle.textContent).toContain(l.stopped);
      });
      click("[data-triangle-controls] button", 3);
      expect(triangle.querySelectorAll('[data-present="true"]')).toHaveLength(3);
      expect(triangle.querySelector("[data-flame]")).not.toBeNull();
    });
    it(`${lang}: three investigations switch the actual apparatus and canonical instructions`, () => {
      render();
      const drawings: string[] = [];
      l.investigations.forEach((item, i) => {
        click("[data-condition-selector] button", i);
        const area = host.querySelector('[data-activity="7.3"]')!;
        expect(area.querySelector("svg")!.getAttribute("data-investigation-svg")).toBe(item.id);
        drawings.push(area.querySelector("svg")!.innerHTML);
        [
          item.heading,
          ...item.apparatus,
          ...item.procedure,
          item.observation,
          item.conclusion,
        ].forEach((text) => expect(area.textContent).toContain(text));
      });
      expect(new Set(drawings).size).toBe(3);
    });
    it(`${lang}: fuel investigation contains all seven source materials/apparatus and categorical results`, () => {
      render();
      const area = host.querySelector('[data-activity="7.3"]')!;
      expect(l.investigations[0].apparatus).toEqual(
        lang === "en"
          ? ["Bunsen burner", "Tongs", "Lighter", "Glass rod", "Wood", "Candle", "Stone"]
          : ["Penunu Bunsen", "Penyepit besi", "Pemetik api", "Rod kaca", "Kayu", "Lilin", "Batu"],
      );
      ["bunsen-burner", "tongs", "igniter"].forEach((id) =>
        expect(area.querySelector(`[data-apparatus="${id}"]`)).not.toBeNull(),
      );
      click("[data-observation-controls] button", 1);
      l.fuelMaterials.forEach((m, i) => {
        click("[data-fuel-selector] button", i);
        expect(area.querySelector("[data-fuel-classification]")!.textContent).toBe(
          `${m.label} → ${m.isFuel ? l.fuel : l.nonFuel}`,
        );
        expect(area.querySelectorAll("[data-material-burning]")).toHaveLength(m.isFuel ? 1 : 0);
      });
      expect(l.fuelMaterials.map((m) => m.isFuel)).toEqual([false, true, true, false]);
    });
    it(`${lang}: oxygen setup uses two equal candles, two white tiles, plasticine and an inverted gas jar over X only`, () => {
      render();
      click("[data-condition-selector] button", 1);
      const area = host.querySelector('[data-activity="7.3"]')!;
      expect(area.querySelectorAll('[data-apparatus="white-tile"]')).toHaveLength(2);
      expect(area.querySelectorAll('[data-apparatus="plasticine"]')).toHaveLength(2);
      expect(
        [...area.querySelectorAll('[data-apparatus="same-sized-candle"]')].map((n) => [
          n.getAttribute("height"),
          n.getAttribute("width"),
        ]),
      ).toEqual([
        ["82", "18"],
        ["82", "18"],
      ]);
      expect(area.querySelector('[data-apparatus="inverted-gas-jar"]')!.getAttribute("d")).toBe(
        "M95 268 V52 H205 V268",
      );
      expect(area.querySelectorAll("[data-flame]")).toHaveLength(2);
      click("[data-observation-controls] button", 1);
      expect(area.querySelector('[data-candle="X"] [data-flame]')).toBeNull();
      expect(area.querySelector('[data-candle="Y"] [data-flame]')).not.toBeNull();
    });
    it(`${lang}: cold P and ordinary Q stay an observation question, with no fabricated ignition result`, () => {
      render();
      click("[data-condition-selector] button", 2);
      click("[data-observation-controls] button", 1);
      const area = host.querySelector('[data-activity="7.3"]')!;
      expect(area.querySelector('[data-apparatus="refrigerator"]')).not.toBeNull();
      expect(area.querySelector('[data-apparatus="matchbox"]')).not.toBeNull();
      expect(
        [...area.querySelectorAll("[data-match]")].map((n) => n.getAttribute("data-match")),
      ).toEqual(["P", "Q"]);
      expect(area.querySelectorAll("[data-observation-unknown]")).toHaveLength(2);
      expect(area.querySelectorAll("[data-flame]")).toHaveLength(0);
      expect(area.querySelector('[data-observation-question="true"]')!.textContent).toContain(
        l.investigations[2].observation,
      );
      expect(area.textContent).not.toMatch(
        /immediately|initially fails|ignition point|serta-merta|gagal menyala|takat pencucuhan|\d+\s*(seconds|minutes|saat|minit|°C)/i,
      );
    });
    it(`${lang}: exact four extinguisher categories/media appear in the full table`, () => {
      render();
      const rows = host.querySelectorAll("[data-extinguisher-table] tbody tr");
      expect(rows).toHaveLength(4);
      rows.forEach((row, i) => {
        const data = c.extinguisherTable[i];
        expect([...row.children].map((n) => n.textContent)).toEqual([
          data.material,
          data.examples,
          data.extinguishers.join(" / "),
        ]);
      });
      expect(c.extinguisherTable.map((row) => row.extinguishers)).toEqual(
        lang === "en"
          ? [
              ["Water", "Dry powder"],
              ["Foam", "Dry powder", "Carbon dioxide"],
              ["Foam", "Dry powder", "Carbon dioxide"],
              ["Dry powder", "Dry sand"],
            ]
          : [
              ["Air", "Serbuk kering"],
              ["Busa", "Serbuk kering", "Karbon dioksida"],
              ["Busa", "Serbuk kering", "Karbon dioksida"],
              ["Serbuk kering", "Pasir kering"],
            ],
      );
      expect(host.querySelector("[data-extinguisher-choice]")!.textContent).not.toMatch(
        /Class [A-F]|Kelas [A-F]/,
      );
    });
    it(`${lang}: extinguisher choice changes the pictured burning material and media`, () => {
      render();
      c.extinguisherTable.forEach((row, i) => {
        click("[data-extinguisher-selector] button", i);
        expect(
          host
            .querySelector("[data-extinguisher-category]")!
            .getAttribute("data-extinguisher-category"),
        ).toBe(String(i));
        const status = host.querySelector(
          '[data-extinguisher-choice] [role="status"]',
        )!.textContent!;
        expect(status).toContain(row.examples);
        row.extinguishers.forEach((m) => expect(status).toContain(m));
      });
    });
    it(`${lang}: oil-fire cross-section has water below oil and foam alternative without splash claims`, () => {
      render();
      const diagram = host.querySelector("[data-oil-fire]")!;
      expect(diagram.querySelector('[data-layer="water-below-oil"]')).not.toBeNull();
      expect(diagram.querySelector('[data-layer="foam"]')).not.toBeNull();
      expect(diagram.querySelectorAll("[data-flame]")).toHaveLength(1);
      expect(host.querySelector("[data-oil-warning]")!.textContent).toBe(l.oilWarning);
      expect(l.oilWarning).toMatch(/denser than oil|lebih tumpat daripada minyak/);
      expect(l.oilWarning).toMatch(/sink below|tenggelam di bawah/);
      expect(l.oilWarning).not.toMatch(/splash|explos|terpercik|letupan/);
    });
    it(`${lang}: covering/cooling/reducing fuel remove the corresponding triangle side`, () => {
      render();
      expect(c.methods.map((m) => m.removes)).toEqual(["oxygen", "heat", "fuel"]);
      c.methods.forEach((m, i) => {
        click("[data-method-selector] button", i);
        const section = host.querySelector("[data-extinguishing-methods]")!;
        expect(section.querySelector("[data-fire-triangle]")!.getAttribute("data-removed")).toBe(
          m.removes,
        );
        expect(section.querySelector('[role="status"]')!.textContent).toContain(m.body);
      });
    });
    it(`${lang}: fire blanket covers the flame and stops oxygen, using the full source explanation`, () => {
      render();
      const area = host.querySelector("[data-fire-blanket]")!;
      expect(area.textContent).toContain(l.blanket);
      expect(area.querySelector("[data-flame]")).not.toBeNull();
      click("[data-fire-blanket] button");
      expect(area.querySelector("[data-flame]")).toBeNull();
      expect(area.querySelector("[data-blanket-cover]")).not.toBeNull();
      expect(area.querySelector("button")!.getAttribute("aria-pressed")).toBe("true");
    });
    it(`${lang}: all six prevention measures render`, () => {
      render();
      expect(
        [...host.querySelectorAll("[data-fire-prevention] li")].map((n) =>
          n.textContent!.replace(/^\d+/, ""),
        ),
      ).toEqual(c.safetyChecklist);
      expect(c.safetyChecklist).toHaveLength(6);
    });
    it(`${lang}: Activity 7.4 remains a group poster activity, selecting three posters`, () => {
      render();
      const area = host.querySelector('[data-activity="7.4"]')!;
      expect(area.getAttribute("data-activity-kind")).toBe("poster");
      expect(area.querySelectorAll("svg,[data-apparatus]")).toHaveLength(0);
      expect(area.textContent).toContain(l.poster.aim);
      l.poster.instructions.forEach((i) => expect(area.textContent).toContain(i));
      expect(area.textContent).toMatch(/best three|tiga poster terbaik/);
    });
    it(`${lang}: all five formative questions reveal canonical answers and narrow paraffin explanation`, () => {
      render();
      const details = host.querySelectorAll<HTMLDetailsElement>('[data-practice="7.2"] details');
      expect(details).toHaveLength(5);
      details.forEach((detail, i) => {
        expect(detail.querySelector("summary")!.textContent).toContain(l.questions[i]);
        act(() => detail.querySelector("summary")!.click());
        expect(detail.open).toBe(true);
      });
      expect(details[4].querySelector("p")!.textContent).toBe(l.paraffinAnswer);
      expect(l.paraffinAnswer).toMatch(
        /flammable when exposed to the air|mudah terbakar apabila terdedah kepada udara/,
      );
      expect(l.paraffinAnswer).not.toMatch(/moisture|explos|kelembapan|letupan/);
    });
    it(`${lang}: no independent supplement combustion facts or unsupported electrical teaching remain`, () => {
      expect(Object.keys(bab7Supplement[lang])).toEqual(["pollutionDefinition", "activeRecall"]);
      expect(bab7Supplement[lang].activeRecall).toHaveLength(1);
      mount(createElement(ScienceF1Chapter7VisualNotesBlock, { content: bab7Content, lang }));
      expect(host.textContent).not.toMatch(
        /electrocute|water conducts electricity|air mengkonduksi elektrik|renjatan kepada pengguna|rapid reactions|tindak balas pantas/,
      );
    });
  }
  it("BM/DLP share all scientific SVG geometry in every investigation/triangle state", () => {
    const compare = (node: (lang: "en" | "bm") => ReactNode) => {
      mount(node("en"));
      const en = geometry();
      mount(node("bm"));
      expect(geometry()).toEqual(en);
    };
    compare((lang) => createElement(Chapter7Combustion, { source: bab7Content[lang].combustion }));
    for (const condition of ["fuel", "oxygen", "heat"] as FireCondition[])
      for (const after of [false, true])
        for (const material of [0, 1, 2, 3])
          compare((lang) =>
            createElement(CombustionApparatus, {
              source: bab7Content[lang].combustion,
              condition,
              after,
              material,
            }),
          );
    for (const removed of [null, "heat", "oxygen", "fuel"] as (FireCondition | null)[])
      compare((lang) =>
        createElement(FireTriangle, { source: bab7Content[lang].combustion, removed }),
      );
  });
  it("visuals render canonical facts, including changed data, without parallel language datasets", () => {
    const source = structuredClone(bab7Content.en.combustion);
    source.definition = "definition sentinel";
    source.lesson.investigations[0].observation = "observation sentinel";
    source.lesson.paraffinAnswer = "answer sentinel";
    mount(createElement(Chapter7Combustion, { source }));
    ["definition sentinel", "observation sentinel", "answer sentinel"].forEach((t) =>
      expect(host.textContent).toContain(t),
    );
    const component = readFileSync("src/components/notes/Chapter7Combustion.tsx", "utf8");
    expect(component).not.toMatch(/const (en|bm|facts|investigations)\s*=/);
    expect(component).not.toContain("Potassium and sodium");
    expect(component).not.toContain("water is denser");
  });
});
