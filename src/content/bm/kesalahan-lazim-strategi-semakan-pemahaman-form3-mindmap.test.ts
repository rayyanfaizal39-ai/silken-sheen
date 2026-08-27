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
import { bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap } from "./kesalahan-lazim-strategi-semakan-pemahaman-form3-mindmap";
import { bahasaMelayuTingkatan3PemahamanRegistry } from "./tingkatan3-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Kesalahan Lazim dan Strategi Semakan Pemahaman";
const expectedTopics = [
  "Strategi Menjawab Soalan Pemahaman",
  "Analisis Isi Tersurat dan Tersirat",
  "Analisis Petikan Pelbagai Bahan",
  "Menilai Hujah dan Pendapat",
  "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
  "Menjawab Soalan KBAT dan Penyelesaian Masalah",
  "Teknik Membuat Rumusan dan Sintesis Maklumat",
  title,
];

const expectedBranches = [
  "Salah Faham Soalan",
  "Salah Pilih Bukti",
  "Tersurat vs Tersirat",
  "Inferens Lemah",
  "Hujah Tidak Logik",
  "KBAT Tidak Relevan",
  "Maksud Frasa Salah",
  "Sintesis Lemah",
  "Fakta Berubah",
  "Jawapan Tidak Lengkap",
  "Bahasa Tidak Gramatis",
  "Semakan Fokus",
  "Semakan Bukti",
  "Semakan Logik",
  "Semakan Bahasa",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 3 Kesalahan Lazim dan Strategi Semakan Pemahaman mind map", () => {
  it("registers exactly eighth with the requested card and page identity", () => {
    expect(bahasaMelayuTingkatan3PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan3PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );
    const chapter = getChapter("bm", title, undefined, "Form 3");
    expect(chapter).toMatchObject({
      id: "bm-f3-kesalahan-lazim-strategi-semakan-pemahaman-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: title,
      title,
      description:
        "Mengenal pasti kesalahan yang sering berlaku semasa menjawab soalan pemahaman serta menggunakan strategi semakan untuk meningkatkan ketepatan, logik dan kualiti jawapan.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap,
        title,
      },
    });
    expect(hasResourceContent("bm", "Form 3", title, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
  });

  it("uses the exact root and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap).toMatchObject({
      id: "bm-f3-kesalahan-lazim-strategi-semakan-pemahaman-root",
      label: "SEMAK PEMAHAMAN",
      summary:
        "Jawapan pemahaman yang baik bukan hanya bergantung pada pengetahuan, tetapi juga pada ketepatan memahami soalan, memilih bukti, membuat inferens dan menyemak semula jawapan sebelum dihantar.",
    });
    expect(
      bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("diagnoses and corrects the eight core comprehension error types", () => {
    expect(branchText("Salah Faham Soalan")).toContain("KATA TUGAS + FOKUS + BILANGAN ISI");
    expect(branchText("Salah Pilih Bukti")).toContain("Jumlah peserta meningkat");
    expect(branchText("Tersurat vs Tersirat")).toContain("seorang yang berdisiplin");
    expect(branchText("Inferens Lemah")).toContain("INFERENS tidak boleh melebihi BUKTI");
    expect(branchText("Hujah Tidak Logik")).toContain("persekitaran yang lebih nyaman dan hijau");
    expect(branchText("KBAT Tidak Relevan")).toContain("botol dan bekas makanan guna semula");
    expect(branchText("Maksud Frasa Salah")).toContain("memberikan kesedaran");
    expect(branchText("Sintesis Lemah")).toContain("SINTESIS = HUBUNG + GABUNG");
  });

  it("covers fact preservation, completeness and concise practical language checks", () => {
    expect(branchText("Fakta Berubah")).toContain("Sebahagian murid");
    expect(branchText("Fakta Berubah")).toContain("Semua murid");
    expect(branchText("Fakta Berubah")).toContain(
      "kuantiti, kepastian, subjek, sebab, kesan, masa dan tempat",
    );
    expect(branchText("Jawapan Tidak Lengkap")).toContain("Amalan membaca penting kerana");
    expect(branchText("Jawapan Tidak Lengkap")).toContain("menyertai aktiviti gotong-royong");
    expect(branchText("Bahasa Tidak Gramatis")).toContain("Murid perlu bersenam");
    expect(branchText("Bahasa Tidak Gramatis")).toContain("di sekolah");
  });

  it("includes focus, evidence, logic and language self-checks", () => {
    expect(branchText("Semakan Fokus")).toContain(
      "Kata tugas ↓ Tema ↓ Fokus ↓ Bilangan isi ↓ Jawapan",
    );
    expect(branchText("Semakan Bukti")).toContain(
      "Bukti Betul • Bukti Berkaitan • Bukti Bersesuaian",
    );
    expect(branchText("Semakan Bukti")).toContain("Lebih banyak bukti tidak semestinya lebih baik");
    expect(branchText("Semakan Logik")).toContain("Masuk akal atau tidak?");
    expect(branchText("Semakan Bahasa")).toContain("B — Binaan Ayat");
    expect(branchText("Semakan Bahasa")).toContain("bukan formula peperiksaan yang kaku");
  });

  it("contains the full final routine and worked correction", () => {
    const uasa = branchText("Tip UASA");
    expect(uasa).toContain("1. BACA");
    expect(uasa).toContain("7. SEMAK");
    expect(uasa).toContain("E — Evidens / Bukti Tepat");
    expect(uasa).toContain("Semak Jawapan Bersama");
    expect(uasa).toContain("jumlah botol plastik yang dibuang semakin berkurang");
    expect(uasa).toContain("Kempen itu tentang botol");
    expect(uasa).toContain("berjaya meningkatkan kesedaran murid");
    expect(uasa).toContain("✓ Fakta Kekal");
    expect(uasa).toContain("Tiada Formula Jaminan");
  });

  it("derives final navigation and preserves Form 1 and Form 2 isolation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 3").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics[index - 1]?.key).toBe("Teknik Membuat Rumusan dan Sintesis Maklumat");
    expect(topics[index + 1]).toBeUndefined();
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(8);
    expect(getChapter("bm", title, undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 2")).toBeUndefined();
  });

  it("supports complete expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(
      bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap,
    );
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap, expanded),
    ).toHaveLength(nodes.length);
    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap,
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
        data: bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("SEMAK PEMAHAMAN");
    expect(markup).toContain("Salah Faham Soalan");
    expect(markup).not.toContain("Tidak membaca kata tugas");
  });
});
