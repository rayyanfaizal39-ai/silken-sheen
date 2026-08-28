import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  MindMap,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuTingkatan1AkuMindMap } from "./aku-form1-mindmap";
import { bahasaMelayuTingkatan1KomsasRegistry } from "./tingkatan1-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Aku";
const expectedBranches = [
  "Jenis Karya",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Gaya Bahasa",
  "Nilai",
  "Pengajaran",
  "Maksud Rangkap",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

const expectedChildren = {
  "Jenis Karya": ["Sajak"],
  Tema: ["Semangat perjuangan dan keberanian", "Ketabahan menghadapi dugaan"],
  Persoalan: [
    "Keberanian menghadapi cabaran",
    "Ketabahan dalam perjuangan",
    "Keazaman mencapai matlamat",
    "Keyakinan diri",
  ],
  Bentuk: ["Sajak", "Rangkap", "Baris", "Bahasa padat"],
  "Gaya Bahasa": ["Bahasa puitis", "Pengulangan", "Imejan", "Bahasa figuratif"],
  Nilai: ["Keberanian", "Ketabahan", "Kegigihan", "Keyakinan"],
  Pengajaran: [
    "Berani menghadapi cabaran",
    "Jangan mudah berputus asa",
    "Berusaha mencapai matlamat",
    "Yakin terhadap diri",
  ],
  "Maksud Rangkap": [
    "Kenal pasti idea utama",
    "Tafsir bahasa puitis",
    "Hubungkan baris",
    "Tulis dengan ayat sendiri",
  ],
  "Teknik Menjawab": [
    "Baca kehendak soalan",
    "Berikan isi tepat",
    "Gunakan bukti teks jika diperlukan",
    "Gunakan ayat lengkap",
    "Bezakan nilai dan pengajaran",
  ],
  "Kesalahan Lazim": [
    "Keliru tema dengan persoalan",
    "Keliru nilai dengan pengajaran",
    "Menyalin tanpa menjelaskan",
    "Jawapan terlalu umum",
    "Mereka-reka bukti",
  ],
} as const;

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 1 Aku mind map", () => {
  it("registers Aku after Oren while preserving every existing KOMSAS topic", () => {
    expect(bahasaMelayuTingkatan1KomsasRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Strategi Memahami dan Menjawab KOMSAS",
      "Asal Padi",
      "Oren",
      title,
      "Kunci Bahasa",
      "Hadiah",
      "Kuih Bakul Limau Mandarin",
      "Hadiah — Drama",
      "Kita Umpama Sehelai Daun",
      "Pantun Dua Kerat (Nasihat)",
      "Syair Pohon Buluh",
    ]);

    const chapter = getChapter("bm", title, undefined, "Form 1");
    expect(chapter).toMatchObject({
      id: "bm-f1-aku-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: title,
      title,
      description:
        "Sajak mengetengahkan semangat seseorang yang berani menghadapi cabaran dan terus berjuang untuk mencapai matlamat.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan1AkuMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 1", title, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
  });

  it("keeps Aku isolated to Form 1 and correctly ordered in KOMSAS navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 1").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual([
      "Strategi Memahami dan Menjawab KOMSAS",
      "Asal Padi",
      "Oren",
      title,
      "Kunci Bahasa",
      "Hadiah",
      "Kuih Bakul Limau Mandarin",
      "Hadiah — Drama",
      "Kita Umpama Sehelai Daun",
      "Pantun Dua Kerat (Nasihat)",
      "Syair Pohon Buluh",
    ]);
    expect(topics[index - 1]?.key).toBe("Oren");
    expect(topics[index + 1]?.key).toBe("Kunci Bahasa");
    expect(getChapter("bm", title, undefined, "Form 2")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("uses Aku as the central title with exactly ten title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan1AkuMindMap).toMatchObject({
      id: "bm-f1-aku-root",
      label: title,
    });
    expect(bahasaMelayuTingkatan1AkuMindMap.summary).toBeUndefined();
    expect(bahasaMelayuTingkatan1AkuMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan1AkuMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("contains every required child node with an approved summary", () => {
    for (const [branchLabel, childLabels] of Object.entries(expectedChildren)) {
      const selected = bahasaMelayuTingkatan1AkuMindMap.children?.find(
        (item) => item.label === branchLabel,
      );
      expect(selected?.children?.map((item) => item.label)).toEqual(childLabels);
      selected?.children?.forEach((item) => expect(item.summary).toBeTruthy());
    }
  });

  it("does not add unsupported literary facts or fabricated textual evidence", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1AkuMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(allText).not.toMatch(/pengarang|rima|rangkap\s+\d+|\d+\s+(?:rangkap|baris)/i);
    expect(allText).not.toMatch(/petikan\s*:/i);
    expect(allText).toContain("Jangan mencipta petikan, peristiwa atau fakta");
  });

  it("supports expand and collapse with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1AkuMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1AkuMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1AkuMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1AkuMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuTingkatan1AkuMindMap, expanded).positions.values(),
    );
    for (let first = 0; first < positions.length; first += 1) {
      for (let second = first + 1; second < positions.length; second += 1) {
        const a = positions[first];
        const b = positions[second];
        expect(
          a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y - a.h / 2 < b.y + b.h / 2 &&
            a.y + a.h / 2 > b.y - b.h / 2,
        ).toBe(false);
      }
    }
  });

  it("renders an accessible collapsed mobile path without horizontal page overflow", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan1AkuMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain(">Aku<");
    expect(markup).toContain("Maksud Rangkap");
    expect(markup).not.toContain("Seseorang perlu mempunyai keberanian");
  });
});
