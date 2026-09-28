// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import ts from "typescript";
import { SejChapter7NotesBlock } from "./SejChapter7NotesBlock";
import { sej7Content as c } from "@/content/form1/sejarah/chapter-7/sej7-content";
import {
  sej7Note,
  sej7Subtopics,
  sej7Flashcards,
  sej7Quizzes,
} from "@/content/form1/sejarah/chapter-7/sej7-revision";
import { notes } from "@/data/notes";
import { quizzes } from "@/data/quizzes";
import { flashcards } from "@/data/flashcards";
import { getSejarahF1Subtopics } from "@/data/sejarah-f1-subtopics";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;
const renderedSections = new Map<number, HTMLDivElement>();
function section(index: number) {
  const cached = renderedSections.get(index);
  if (cached) return cached;
  const node = document.createElement("div");
  const sectionRoot = createRoot(node);
  act(() =>
    sectionRoot.render(createElement(SejChapter7NotesBlock, { content: c, initialSection: index })),
  );
  const copy = document.createElement("div");
  copy.innerHTML = node.innerHTML;
  act(() => sectionRoot.unmount());
  renderedSections.set(index, copy);
  return copy;
}
const all = () => Array.from({ length: 10 }, (_, index) => section(index).textContent).join(" ");
const text = (index: number) => section(index).textContent ?? "";
let root: Root | undefined;
let host: HTMLDivElement | undefined;
afterEach(async () => {
  if (root) await act(async () => root?.unmount());
  host?.remove();
  root = undefined;
  window.sessionStorage.clear();
});

describe("Sejarah F1 Chapter 7 textbook completeness and structure", () => {
  it("preserves Malay text and source punctuation without encoding damage", () => {
    expect(JSON.stringify(c)).not.toMatch(/â|�/);
    expect(c.indianDynasties.map((d) => d.duration)).toEqual([
      "345 SM – 321 SM",
      "322 SM – 185 SM",
      "320 M – 550 M",
    ]);
    expect(text(6)).toContain("Konfusius");
  });
  it("has only the two official sections and no fake curriculum numbering in any step", () => {
    expect(c.officialSubtopics.map((s) => `${s.number} ${s.title}`)).toEqual([
      "7.1 Tamadun India",
      "7.2 Tamadun China",
    ]);
    for (let i = 0; i < 10; i++) {
      const dom = section(i);
      expect(dom.querySelectorAll("[data-official-subtopic]")).toHaveLength(2);
      expect(dom.textContent).not.toMatch(/7\.[3-9]/);
      if (i !== 7)
        expect(
          dom.querySelector("[data-section-number]")?.getAttribute("data-section-number"),
        ).toBe(i < 5 ? "7.1" : "7.2");
    }
  });
  it.each(["Lembah Ganges", "Janapada", "Mahajanapada", "Magadha"])(
    "shows India development: %s",
    (label) => {
      expect(text(0)).toContain(label);
    },
  );
  it("retains the verified Magadha dates and trading route without resource embellishment", () => {
    expect(text(0)).toContain("540-490 SM");
    expect(text(0)).toContain("perdagangan Sungai Ganges");
    expect(text(0)).not.toMatch(/540.*320 SM|besi|gajah hutan/);
  });
  it.each(["Dinasti Nanda", "Dinasti Maurya", "Dinasti Gupta"])(
    "renders %s with period, centre and expansion",
    (name) => {
      const dynasty = c.indianDynasties.find((d) => d.name === name)!;
      expect(text(2)).toContain(dynasty.duration);
      for (const fact of dynasty.facts) expect(text(2)).toContain(fact);
      expect(text(2)).toContain("Pataliputra");
    },
  );
  it("renders both forms and all five factors", () => {
    for (const factor of c.powerExpansion.factors) expect(text(1)).toContain(factor.description);
    expect(text(1)).toContain("Fizikal");
    expect(text(1)).toContain("Keagamaan");
  });
  it("keeps Asoka's source figures, transformation, pillar and complete missions", () => {
    expect(text(3)).toContain("150,000 orang kehilangan harta benda dan 100,000 orang terbunuh");
    expect(text(3)).toContain(c.asokaTransformation.afterKalinga);
    expect(text(3)).toContain(c.asokaTransformation.asokaPillar);
    for (const mission of c.asokaTransformation.buddhistMission) expect(text(3)).toContain(mission);
    expect(section(3).querySelector('img[alt="Transformasi Asoka"]')).not.toBeNull();
  });
  it("excludes unsupported enrichment from core and revision answers", () => {
    const answers = [
      ...sej7Flashcards.map((f) => f.back),
      ...sej7Quizzes.map((q) => q.explanation),
    ].join(" ");
    expect(all() + answers + sej7Note.summary + JSON.stringify(sej7Subtopics)).not.toMatch(
      /Chanakya|Bindusara|Mysore|261 SM|Dasar Dharma|hukuman mati|tiga hari tiga malam/i,
    );
  });
  it("separates Gupta Hindu/gold-coin achievements from general India achievements", () => {
    expect(c.guptaGoldenAge.achievements.join(" ")).toContain("wang syiling emas");
    expect(c.guptaGoldenAge.achievements.join(" ")).not.toMatch(/Arthasastra|Ajanta|Ellora/);
    expect(text(4)).toContain("Kaviraja");
    for (const fact of c.indianAchievements) expect(text(4)).toContain(fact);
    expect(text(4)).not.toContain("Pencapaian Zaman Gupta");
  });
  it.each([0, 1])("renders complete Chinese dynasty %i instead of only its first fact", (index) => {
    const dynasty = c.chineseDynasties[index];
    for (const value of [
      dynasty.name,
      dynasty.duration,
      dynasty.founder,
      dynasty.capital,
      ...dynasty.facts,
    ])
      expect(text(5)).toContain(value);
  });
  it("shows the source Silk Road stops as an explicitly schematic route", () => {
    const route = section(5).querySelector('[aria-label^="Laluan Sutera"]');
    expect(route?.textContent).toContain(c.silkRoad.route.join("→"));
    expect(route?.getAttribute("aria-label")).toContain("bukan peta berskala");
    expect(section(5).querySelector('img[alt="Dinasti Qin dan Han"]')).toBeNull();
  });
  it("restores both previously hidden education fields", () => {
    expect(text(6)).toContain(c.education.qinEducation);
    expect(text(6)).toContain(c.education.hanEducation);
    expect(text(6)).toContain("Han Fei Zi");
    expect(text(6)).toContain("Chang'an");
    expect(text(6)).toContain("daerah dan wilayah");
  });
  it("renders all five goals, three levels and social hierarchy", () => {
    for (const goal of c.education.goals) expect(text(6)).toContain(goal.goal);
    for (const level of c.education.levels) expect(text(6)).toContain(level.focus);
    for (const group of c.education.socialHierarchy) expect(text(6)).toContain(group);
  });
  it("uses the textbook Maharaja Wu/Han/29 SM introduction, not Qin", () => {
    expect(text(8)).toContain("29 SM, zaman Maharaja Wu (Dinasti Han)");
    expect(text(8)).toContain("1905");
    expect(text(8)).toContain("Maharani Dowager Cixi");
  });
  it.each([
    [
      "Xiucai",
      "Peringkat daerah",
      "Dua kali setiap tiga tahun",
      "Sehari",
      "500–2,000 orang",
      "1:35",
    ],
    ["Juren", "Ibu kota daerah", "Tiga tahun sekali", "Tiga hari", "4,800–10,000 orang", "1:120"],
    ["Jinshi", "Ibu kota kerajaan", "Tiga tahun sekali", "13 hari", undefined, undefined],
  ])(
    "renders the verified location, frequency, duration and statistics for %s",
    (name, location, frequency, duration, candidates, ratio) => {
      const stage = section(8).querySelector(`[data-exam="${name}"]`)!;
      for (const value of [location, frequency, duration, candidates, ratio].filter(Boolean))
        expect(stage.textContent).toContain(value);
      if (name === "Jinshi")
        expect(stage.textContent).not.toMatch(/Bilangan calon|Kadar kelulusan|Kelayakan/);
    },
  );
  it("keeps Xiucai general eligibility within the male-only context and Juren prerequisite", () => {
    const ladder = section(8).querySelector('[data-visual="examination-ladder"]')!;
    expect(ladder.textContent).toContain(c.education.examSystem.characteristics[1]);
    expect(ladder.textContent).toContain("Terbuka kepada semua orang");
    expect(ladder.textContent).toContain("telah lulus tahap pertama");
  });
  it("renders all examination characteristics, sponsorship and controls without invented punishment/duration", () => {
    const exam = c.education.examSystem;
    for (const value of [...exam.characteristics, exam.sponsorship, ...exam.controls])
      expect(text(8)).toContain(value);
    expect(text(8)).toContain("sebelum peperiksaan berlangsung");
    expect(text(8)).not.toMatch(/hukuman mati|dikurung.*tiga hari/i);
  });
  it("shows the four/five/nine-book relationship and all nine source titles", () => {
    expect(text(8)).toContain(c.education.examSystem.syllabus);
    const titles = c.education.examSystem.books.flatMap((g) => g.titles);
    expect(titles).toHaveLength(9);
    for (const title of titles) expect(text(8)).toContain(title);
  });
  it("retains every stage's privileges", () => {
    for (const stage of c.education.examSystem.stages) {
      const rendered = section(8).querySelector(`[data-exam="${stage.name}"]`)!;
      for (const reward of stage.rewards) expect(rendered.textContent).toContain(reward);
    }
  });
  it("renders Dong Zhongshu, Sima Qian, Shiji and its source coverage", () => {
    for (const scholar of c.education.scholars)
      for (const value of Object.values(scholar)) expect(text(8)).toContain(value);
    expect(text(8)).toContain("hingga tahun 90 SM");
  });
  it("renders Cai Lun and all nine paper-making steps in order", () => {
    const paper = section(9);
    expect(paper.textContent).toContain("Cai Lun");
    expect(paper.querySelectorAll('[data-visual="paper-process"] svg')).toHaveLength(3);
    const steps = [...paper.querySelectorAll("details ol li")].map((li) => li.textContent);
    expect(steps).toEqual(
      c.education.paperInvention.steps.map((step, index) => `${index + 1}${step}`),
    );
    expect(steps).toHaveLength(9);
  });
  it("renders source activities and full chapter recall/conclusion", () => {
    for (const activity of c.activities)
      for (const task of activity.tasks) expect(all()).toContain(task);
    expect(section(7).querySelectorAll("details > ol > li")).toHaveLength(8);
    for (const value of c.values) expect(text(7)).toContain(value);
    for (const term of [
      "India",
      "China",
      "Xiucai",
      "Juren",
      "Jinshi",
      "Dong Zhongshu",
      "Sima Qian",
      "Cai Lun",
    ])
      expect(c.chapterSummary).toContain(term);
  });
});

describe("Chapter 7 live navigation and legacy consistency", () => {
  it("selects all lessons, expands paper steps and reaches Mark as Read after the new lessons", async () => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    const mark = vi.fn();
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    await act(async () =>
      root!.render(<SejChapter7NotesBlock content={c} storageKey="sej7-audit" onMarkRead={mark} />),
    );
    async function click(label: string) {
      const button = [...host!.querySelectorAll("button")].find(
        (b) => b.textContent?.trim() === label,
      )!;
      expect(button).toBeDefined();
      await act(async () => button.click());
    }
    await click("7.2 Tamadun China");
    expect(host.textContent).toContain("Xianyang");
    await click("Peperiksaan Perkhidmatan Awam");
    expect(host.querySelectorAll("[data-exam]")).toHaveLength(3);
    await click("Seksyen seterusnya");
    expect(host.querySelector('[data-visual="paper-process"]')).not.toBeNull();
    const details = host.querySelector("details")!;
    details.querySelector("summary")!.click();
    expect(details.open).toBe(true);
    await click("Seksyen seterusnya");
    expect(host.querySelector("h2")?.textContent).toBe("Rumusan Bab");
    await click("📘 Tandakan Bab 7 Selesai");
    expect(mark).toHaveBeenCalledOnce();
    expect(sessionStorage.getItem("sej7-audit:sej-c7-section")).toBe("7");
    await click("7.1 Tamadun India");
    expect(host.textContent).toContain(c.indiaOverview.magadhaRise);
  });
  it("shares audited records across the split data exports", () => {
    expect(notes.find((n) => n.id === sej7Note.id)).toBe(sej7Note);
    expect(quizzes.filter((q) => q.id.startsWith("sej-f1-c7-"))).toEqual(sej7Quizzes);
    expect(flashcards.filter((q) => q.id.startsWith("sej-f1-c7-"))).toEqual(sej7Flashcards);
    expect(getSejarahF1Subtopics("Chapter 7")).toEqual(sej7Subtopics);
    expect(sej7Quizzes).toHaveLength(30);
    expect(sej7Flashcards).toHaveLength(40);
  });
  it("the legacy monolith also consumes the shared records", () => {
    const source = readFileSync("src/data/content.ts", "utf8");
    for (const name of ["sej7Note", "...sej7Quizzes", "...sej7Flashcards"])
      expect(source).toContain(name);
    expect(source).not.toMatch(/id: "sej-f1-c7-(?:note|q\d+|fc\d+)"/);
  });
  it("revision answers agree on dates, frequencies, confinement and duration", () => {
    expect(sej7Flashcards[2].back).toContain("540-490 SM");
    expect(sej7Flashcards[25].back).toContain("Dua kali setiap tiga tahun");
    expect(sej7Flashcards[26].back).toContain("Tiga hari");
    expect(sej7Flashcards[27].back).toContain("13 hari");
    expect(sej7Flashcards[23].back).toContain("sebelum peperiksaan");
    for (const q of sej7Quizzes) expect(q.options[q.answerIndex]).toBeTruthy();
  });
  it.each(
    Object.entries({
      notes: "c333222088dbf87e3e306681d10d477c3d7fc708f2f2cbeabfdf3ea0e19f1fce",
      content: "6b7d0797bf370325dc78a6c304f2cbb106fc79389d8d64e37168180fc2daffbb",
      quizzes: "eceffa71ed189f535fddf5fc5e65211c6880c9d87b9deb02b2f7b371dc0c1de9",
      flashcards: "8b24aa13a641ead4b1566c466fa58a501afa57f730305fa07fa5e2f9e73c7c50",
    }),
  )("preserves unrelated records in %s", (name, expected) => {
    const source = ts.createSourceFile(
      "data.ts",
      readFileSync(`src/data/${name}.ts`, "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    const records: string[] = [];
    function visit(node: ts.Node) {
      if (ts.isObjectLiteralExpression(node)) {
        const id = node.properties.find(
          (p) => ts.isPropertyAssignment(p) && p.name.getText(source) === "id",
        );
        if (
          id &&
          ts.isPropertyAssignment(id) &&
          ts.isStringLiteral(id.initializer) &&
          !id.initializer.text.startsWith("sej-f1-c7-")
        )
          records.push(node.getText(source).replace(/\r\n/g, "\n"));
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
    expect(createHash("sha256").update(JSON.stringify(records)).digest("hex")).toBe(expected);
  });
});
