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
import { bahasaMelayuTingkatan3KbatPenyelesaianMindMap } from "./menjawab-soalan-kbat-penyelesaian-masalah-form3-mindmap";
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
  "Kesalahan Lazim dan Strategi Semakan Pemahaman",
];

const expectedBranches = [
  "Apa Itu KBAT?",
  "Kenal Pasti Jenis Soalan",
  "Pendirian dan Justifikasi",
  "Cadangkan Penyelesaian",
  "Ramalkan Kesan",
  "Nilai Tindakan",
  "Pilih Penyelesaian Terbaik",
  "Hubungkan dengan Petikan",
  "Gunakan Bukti",
  "Bina Jawapan Matang",
  "Uji Logik",
  "Contoh KBAT",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan3KbatPenyelesaianMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 3 Menjawab Soalan KBAT dan Penyelesaian Masalah mind map", () => {
  it("registers sixth with the exact card and page identity", () => {
    expect(bahasaMelayuTingkatan3PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan3PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );
    const chapter = getChapter(
      "bm",
      "Menjawab Soalan KBAT dan Penyelesaian Masalah",
      undefined,
      "Form 3",
    );
    expect(chapter).toMatchObject({
      id: "bm-f3-menjawab-soalan-kbat-penyelesaian-masalah-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Menjawab Soalan KBAT dan Penyelesaian Masalah",
      title: "Menjawab Soalan KBAT dan Penyelesaian Masalah",
      description:
        "Membina jawapan KBAT yang matang melalui pendirian, alasan, bukti, cadangan, ramalan dan penyelesaian yang logik serta relevan.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan3KbatPenyelesaianMindMap,
        title: "Menjawab Soalan KBAT dan Penyelesaian Masalah",
      },
    });
    expect(hasResourceContent("bm", "Form 3", chapter!.chapterKey, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("uses the exact root and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan3KbatPenyelesaianMindMap).toMatchObject({
      id: "bm-f3-menjawab-soalan-kbat-penyelesaian-masalah-root",
      label: "KBAT & PENYELESAIAN",
      summary:
        "Soalan KBAT memerlukan murid menggunakan maklumat dalam petikan untuk membuat pertimbangan, memberikan justifikasi, meramal kesan dan mencadangkan penyelesaian yang munasabah.",
    });
    expect(
      bahasaMelayuTingkatan3KbatPenyelesaianMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan3KbatPenyelesaianMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches mature evaluation, prediction and problem solving without unsafe shortcuts", () => {
    expect(branchText("Apa Itu KBAT?")).toContain("Pendapat Rawak");
    expect(branchText("Kenal Pasti Jenis Soalan")).toContain("Kata Tugas Menentukan Struktur");
    expect(branchText("Pendirian dan Justifikasi")).toContain(
      "PENDIRIAN + ALASAN + KESAN / CONTOH",
    );
    expect(branchText("Cadangkan Penyelesaian")).toContain("MASALAH ↓ PIHAK ↓ TINDAKAN ↓ KESAN");
    expect(branchText("Ramalkan Kesan")).toContain("Ramalan Bukan Fakta Terjamin");
    expect(branchText("Nilai Tindakan")).toContain("PERTIMBANGAN + ALASAN + KESAN MUNGKIN");
    expect(branchText("Pilih Penyelesaian Terbaik")).toContain(
      "Tiada Pilihan Sempurna untuk Semua Keadaan",
    );
    expect(branchText("Hubungkan dengan Petikan")).toContain("PETIKAN → ISU → IDEA → ALASAN");
    expect(branchText("Gunakan Bukti")).toContain("Sokongan Berasaskan Teks");
    expect(branchText("Gunakan Bukti")).toContain("Sokongan Berasaskan Konteks");
    expect(branchText("Bina Jawapan Matang")).toContain("Matang Tidak Bererti Panjang");
    expect(branchText("Uji Logik")).toContain("Adakah Saya Mereka Fakta?");
  });

  it("includes the complete guided social-media worked example", () => {
    const example = branchText("Contoh KBAT");
    expect(example).toContain("CONTOH LATIHAN");
    expect(example).toContain("Penggunaan media sosial memberikan pelbagai manfaat");
    expect(example).toContain("Soalan 1 — Tindakan Bertanggungjawab");
    expect(example).toContain("menyemak kesahihan maklumat");
    expect(example).toContain("Soalan 2 — Ramalkan Kesan");
    expect(example).toContain("Soalan 3 — Nilai Pemantauan");
    expect(example).toContain("tanpa mengabaikan keperluan privasi");
    expect(example).toContain("Soalan 4 — Penyelesaian Sekolah");
    expect(example).toContain("program literasi digital");
  });

  it("keeps memory aids flexible and rejects invented or fixed-answer shortcuts", () => {
    const memory = branchText("Teknik Mengingat");
    expect(memory).toContain("P-A-K");
    expect(memory).toContain("P-T-K");
    expect(memory).toContain("M-A-S-A");
    expect(memory).toContain("Bukan Formula Kaku");
    expect(branchText("Kesalahan Lazim")).toContain("Fakta Direka");
    expect(branchText("Kesalahan Lazim")).toContain("Ramalan Dianggap Pasti");
    expect(branchText("Tip UASA")).toContain("Jangan menetapkan markah, panjang, bilangan ayat");
  });

  it("derives previous and seventh-topic next navigation while keeping Form 1 and Form 2 isolated", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 3").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const index = topics.findIndex(
      (topic) => topic.key === "Menjawab Soalan KBAT dan Penyelesaian Masalah",
    );
    expect(topics[index - 1]?.key).toBe("Maksud Frasa, Ungkapan dan Bahasa Kiasan");
    expect(topics[index + 1]?.key).toBe("Teknik Membuat Rumusan dan Sintesis Maklumat");
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(8);
    expect(getChapter("bm", expectedTopics[5], undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", expectedTopics[5], undefined, "Form 2")).toBeUndefined();
  });

  it("supports complete expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan3KbatPenyelesaianMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3KbatPenyelesaianMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan3KbatPenyelesaianMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3KbatPenyelesaianMindMap, expanded),
    ).toHaveLength(nodes.length);
    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan3KbatPenyelesaianMindMap,
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
        data: bahasaMelayuTingkatan3KbatPenyelesaianMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("KBAT &amp; PENYELESAIAN");
    expect(markup).toContain("Apa Itu KBAT?");
    expect(markup).not.toContain("KBAT ialah kemahiran menggunakan maklumat");
  });
});
