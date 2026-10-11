import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapters } from "@/content/registry";
import { MindMap } from "@/components/MindMap";
import { formatMindMapTitle } from "./format";
import { collectAllNodes, normalizeMindNode, type MindNode } from "./tree";

describe("formatMindMapTitle", () => {
  it.each([
    ["8.1 Force", "Force"],
    ["8.2 Effects of Force", "Effects of Force"],
    ["8.1.1 Types of Forces", "Types of Forces"],
    ["5.1 Establishment of Melaka", "Establishment of Melaka"],
    ["5.2 Administration", "Administration"],
    ["3.4.2 Chemical Reactions", "Chemical Reactions"],
    ["5.1 Pengasasan Kesultanan Melayu Melaka", "Pengasasan Kesultanan Melayu Melaka"],
    ["3.2.1 Types of Chemical Bonds", "Types of Chemical Bonds"],
    ["10.3 Tenaga Elektrik", "Tenaga Elektrik"],
    ["11.2.4 Ekosistem", "Ekosistem"],
    ["   8.1   Force", "Force"],
    ["8.1. Force", "Force"],
    ["8.1: Force", "Force"],
    ["8.1 - Force", "Force"],
    ["8.1 — Daya", "Daya"],
    ["1.1.1.1 Sub", "Sub"],
    ["2.3 Évolution", "Évolution"],
    // "Min" is Malay for "mean" (Maths F2 Ch12), not minutes.
    ["12.1 Min", "Min"],
    ["5.1 Unit Ukuran", "Unit Ukuran"],
  ])("strips the section number from %j", (input, expected) => {
    expect(formatMindMapTitle(input)).toBe(expected);
  });

  it.each([
    "Force",
    "Chapter 8: Force and Motion",
    "Bab 8: Daya dan Gerakan",
    "2.5 cm",
    "2.5 cm panjang",
    "1.5 kg beras",
    "101.3 kPa",
    "2.5 min",
    "9.8 N",
    "3.14",
    "3.14 adalah nilai π",
    "10.5%",
    "1.5 × 10³",
    "1.5 x 10^3",
    "0.008025 -> 0.00803 (3 s.f.)",
    "0.03025 = 3.025 x 10^-2",
    "3.025 Malaysia",
    "1. Sambung dua titik",
    "2. Titik rujukan (kata kunci: 'dari')",
    "1511",
    "1446–1456",
    "11 September 1509",
    "1994: First direct collision of a comet",
    "44 fasal",
    "71% surface water, 29% land",
    "30°: sin=1/2",
    "a^2 - b^2 = (a + b)(a - b)",
    "8.1",
    "8.1 ",
    "8.1 A",
    "1.2 juta penduduk",
    "1.2 Juta penduduk",
    "",
  ])("keeps %j unchanged", (input) => {
    expect(formatMindMapTitle(input)).toBe(input);
  });
});

const allMindMaps = chapters
  .filter((chapter) => chapter.mindMap)
  .map((chapter) => ({
    name: `${chapter.subjectId} ${chapter.form} ${chapter.chapterKey} ${chapter.lang ?? ""}`,
    data: chapter.mindMap!.data,
  }));

const SECTION = /^[1-9]\d?(\.\d{1,2})+ \p{Lu}/u;

describe("mind map titles across every chapter", () => {
  it("removes every textbook section number and changes nothing else", () => {
    let stripped = 0;
    for (const { name, data } of allMindMaps) {
      for (const { node } of collectAllNodes(data)) {
        const shown = formatMindMapTitle(node.label);
        if (shown === node.label) {
          expect(SECTION.test(node.label), `${name}: ${node.label}`).toBe(false);
          continue;
        }
        stripped += 1;
        expect(SECTION.test(node.label), `${name}: ${node.label}`).toBe(true);
        expect(node.label.endsWith(shown), `${name}: ${node.label}`).toBe(true);
        expect(shown).not.toMatch(/^\s*\d/);
      }
    }
    expect(stripped).toBeGreaterThan(300);
  });

  it("keeps ids, order, hierarchy and summaries in the display tree", () => {
    for (const { name, data } of allMindMaps) {
      const before = JSON.stringify(data);
      const display = normalizeMindNode(data);
      expect(JSON.stringify(data), `${name}: source data untouched`).toBe(before);

      const raw = collectAllNodes(data);
      const shown = collectAllNodes(display);
      expect(
        shown.map(({ node }) => node.id),
        name,
      ).toEqual(raw.map(({ node }) => node.id));
      expect(
        shown.map(({ depth }) => depth),
        name,
      ).toEqual(raw.map(({ depth }) => depth));
      shown.forEach(({ node }, index) => {
        expect(node.summary, name).toBe(
          raw[index].node.summary?.trim() ? raw[index].node.summary : undefined,
        );
        expect(node.label, name).toBe(formatMindMapTitle(raw[index].node.label));
      });
    }
  });
});

describe("Science Form 2 Chapter 8 mind map", () => {
  const chapter8 = chapters.filter(
    (chapter) =>
      chapter.subjectId === "science" &&
      chapter.form === "Form 2" &&
      chapter.chapterKey === "Chapter 8" &&
      chapter.mindMap,
  );

  it("exists in both languages", () => {
    expect(chapter8.map((chapter) => chapter.lang).sort()).toEqual(["bm", "dlp"]);
  });

  it.each([
    ["dlp", ["8.1 Force", "8.2 Effects of Force"], ["Force", "Effects of Force"]],
    ["bm", ["8.1 Daya", "8.2 Kesan Daya"], ["Daya", "Kesan Daya"]],
  ] as const)("%s shows clean primary branches and keeps their children", (lang, raw, clean) => {
    const data = chapter8.find((chapter) => chapter.lang === lang)!.mindMap!.data as MindNode;
    expect(data.children?.map((branch) => branch.label)).toEqual(raw);

    const display = normalizeMindNode(data);
    expect(display.children?.map((branch) => branch.label)).toEqual(clean);
    display.children?.forEach((branch, index) => {
      const source = data.children![index];
      expect(branch.id).toBe(source.id);
      expect(branch.children?.map((child) => [child.id, child.label])).toEqual(
        source.children?.map((child) => [child.id, child.label]),
      );
    });

    const markup = renderToStaticMarkup(<MindMap data={data} height={700} />);
    clean.forEach((label) => expect(markup).toContain(`>${label}</span>`));
    raw.forEach((label) => expect(markup).not.toContain(label));
    // The section number survives in the source content.
    expect(data.children?.[0].label).toBe(raw[0]);
  });
});
