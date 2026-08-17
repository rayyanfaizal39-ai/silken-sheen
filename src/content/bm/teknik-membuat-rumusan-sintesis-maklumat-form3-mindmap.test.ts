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
import { bahasaMelayuTingkatan1PemahamanRegistry } from "./tingkatan1-pemahaman-registry";
import { bahasaMelayuTingkatan2PemahamanRegistry } from "./tingkatan2-pemahaman-registry";
import { bahasaMelayuTingkatan3RumusanSintesisMindMap } from "./teknik-membuat-rumusan-sintesis-maklumat-form3-mindmap";
import { bahasaMelayuTingkatan3PemahamanRegistry } from "./tingkatan3-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedTopics = [
  "Strategi Menjawab Soalan Pemahaman",
  "Analisis Isi Tersurat dan Tersirat",
  "Analisis Petikan Pelbagai Bahan",
  "Menilai Hujah dan Pendapat",
  "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
  "Menjawab Soalan KBAT dan Penyelesaian Masalah",
  "Teknik Membuat Rumusan dan Sintesis Maklumat",
];

const expectedBranches = [
  "Apa Itu Rumusan?",
  "Apa Itu Sintesis?",
  "Kenal Pasti Fokus",
  "Cari Isi Utama",
  "Bezakan Isi Sokongan",
  "Gabungkan Maklumat",
  "Hubungkan Pelbagai Bahan",
  "Susun Idea",
  "Gunakan Bahasa Sendiri",
  "Kekalkan Maksud",
  "Bina Rumusan",
  "Bina Sintesis",
  "Contoh Latihan",
  "Kesalahan Lazim",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan3RumusanSintesisMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 3 Teknik Membuat Rumusan dan Sintesis Maklumat mind map", () => {
  it("registers seventh with the exact card and page identity", () => {
    expect(bahasaMelayuTingkatan3PemahamanRegistry).toHaveLength(7);
    expect(bahasaMelayuTingkatan3PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );
    const chapter = getChapter(
      "bm",
      "Teknik Membuat Rumusan dan Sintesis Maklumat",
      undefined,
      "Form 3",
    );
    expect(chapter).toMatchObject({
      id: "bm-f3-teknik-membuat-rumusan-sintesis-maklumat-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Teknik Membuat Rumusan dan Sintesis Maklumat",
      title: "Teknik Membuat Rumusan dan Sintesis Maklumat",
      description:
        "Mengenal pasti isi penting, menggabungkan maklumat daripada beberapa bahagian atau bahan dan menghasilkan rumusan yang padat, tepat serta koheren.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan3RumusanSintesisMindMap,
        title: "Teknik Membuat Rumusan dan Sintesis Maklumat",
      },
    });
    expect(hasResourceContent("bm", "Form 3", chapter!.chapterKey, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("uses the exact root and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan3RumusanSintesisMindMap).toMatchObject({
      id: "bm-f3-teknik-membuat-rumusan-sintesis-maklumat-root",
      label: "RUMUSAN & SINTESIS",
      summary:
        "Rumusan memilih dan memadatkan isi penting, manakala sintesis menghubungkan maklumat berkaitan daripada beberapa bahagian atau bahan untuk menghasilkan kefahaman yang lebih menyeluruh.",
    });
    expect(
      bahasaMelayuTingkatan3RumusanSintesisMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan3RumusanSintesisMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("distinguishes rumusan from synthesis and teaches accurate integration", () => {
    expect(branchText("Apa Itu Rumusan?")).toContain("tanpa mengubah maksud asal");
    expect(branchText("Apa Itu Rumusan?")).toContain("Menambah Pendapat Peribadi");
    expect(branchText("Apa Itu Sintesis?")).toContain("Sintesis ≠ Senarai Fakta");
    expect(branchText("Kenal Pasti Fokus")).toContain("Langkah menjaga sungai");
    expect(branchText("Cari Isi Utama")).toContain("Butiran Kecil");
    expect(branchText("Bezakan Isi Sokongan")).toContain("Ujian Pembuangan");
    expect(branchText("Gabungkan Maklumat")).toContain("tidak perlu dikira atau ditulis dua kali");
    expect(branchText("Hubungkan Pelbagai Bahan")).toContain("Jangan Paksa Satu Ayat");
    expect(branchText("Susun Idea")).toContain("Sebab → Kesan");
  });

  it("teaches precise paraphrasing, nuance and flexible construction", () => {
    expect(branchText("Gunakan Bahasa Sendiri")).toContain("Tidak Perlu Ganti Semua Perkataan");
    expect(branchText("Kekalkan Maksud")).toContain("Sebahagian remaja kurang aktif");
    expect(branchText("Kekalkan Maksud")).toContain("Semua remaja malas bersenam");
    expect(branchText("Bina Rumusan")).toContain("jangan hafal satu pembukaan wajib");
    expect(branchText("Bina Sintesis")).toContain("Hubungan, Bukan Pengumpulan");
    expect(branchText("Kesalahan Lazim")).toContain("Kesimpulan Baharu");
  });

  it("includes the complete guided adolescent-health worked example", () => {
    const example = branchText("Contoh Latihan");
    expect(example).toContain("CONTOH LATIHAN — Kesihatan Remaja");
    expect(example).toContain("Aktiviti fizikal penting untuk kecergasan");
    expect(example).toContain("Tidur mencukupi membantu pemulihan dan tumpuan");
    expect(example).toContain("Pemakanan seimbang membekalkan nutrien");
    expect(example).toContain("Tugasan 2 — Bina Sintesis");
    expect(example).toContain("Kesihatan remaja dapat dipelihara");
    expect(example).toContain("Tugasan 3 — Nilai Kesilapan");
    expect(example).toContain("belum disintesis");
  });

  it("provides conceptual aids without fixed assessment rules", () => {
    const uasa = branchText("Tip UASA");
    expect(uasa).toContain("RINGKASKAN → PILIH → GABUNG → HUBUNG → OLAH → SEMAK");
    expect(uasa).toContain("P-G-H-O-S");
    expect(uasa).toContain("RUMUSAN = PILIH + PADATKAN");
    expect(uasa).toContain("SINTESIS = HUBUNG + GABUNG");
    expect(uasa).toContain("Jangan menetapkan had perkataan, bilangan isi, bilangan perenggan");
  });

  it("derives previous and disabled next navigation while keeping Form 1 and Form 2 isolated", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 3").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const index = topics.findIndex(
      (topic) => topic.key === "Teknik Membuat Rumusan dan Sintesis Maklumat",
    );
    expect(topics[index - 1]?.key).toBe("Menjawab Soalan KBAT dan Penyelesaian Masalah");
    expect(topics[index + 1]).toBeUndefined();
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(8);
    expect(getChapter("bm", expectedTopics[6], undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", expectedTopics[6], undefined, "Form 2")).toBeUndefined();
  });

  it("supports complete expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan3RumusanSintesisMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3RumusanSintesisMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan3RumusanSintesisMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3RumusanSintesisMindMap, expanded),
    ).toHaveLength(nodes.length);
    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan3RumusanSintesisMindMap,
        expanded,
      ).positions.values(),
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

  it("renders an accessible collapsed mobile path without horizontal overflow", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan3RumusanSintesisMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("RUMUSAN &amp; SINTESIS");
    expect(markup).toContain("Apa Itu Rumusan?");
    expect(markup).not.toContain("Rumusan ialah penyampaian semula isi penting");
  });
});
