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
import { bahasaMelayuTingkatan2PantunNasihatMindMap } from "./pantun-nasihat-form2-mindmap";
import { bahasaMelayuTingkatan2KomsasRegistry } from "./tingkatan2-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Pantun Nasihat";
const expectedBranches = [
  "Maksud Rangkap",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Ciri Pantun",
  "Gaya Bahasa",
  "Nilai",
  "Pengajaran",
  "Adab Kehidupan",
  "Kata Kunci",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2PantunNasihatMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Pantun Nasihat mind map", () => {
  it("preserves earlier topics and registers Pantun Nasihat exactly once", () => {
    expect(bahasaMelayuTingkatan2KomsasRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Pantun Alam Remaja",
      "Pantun Kiasan",
      "Pantun Budi",
      title,
      "Pantun Kasih Sayang",
      "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
      "Dalam Persekitaran Kata-kata",
    ]);
    expect(
      bahasaMelayuTingkatan2KomsasRegistry.filter((topic) => topic.chapterKey === title),
    ).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 2")).toMatchObject({
      id: "bm-f2-pantun-nasihat-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: title,
      title,
      description:
        "Pantun yang memberikan panduan hidup supaya manusia melakukan kebaikan, menjauhi perbuatan buruk, menjaga tutur kata, beradab dan pandai membawa diri.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan2PantunNasihatMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 2", title, "mindMap")).toBe(true);
    expect(getChapter("bm", title, undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("uses registry-driven previous and next navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual([
      "Pantun Alam Remaja",
      "Pantun Kiasan",
      "Pantun Budi",
      title,
      "Pantun Kasih Sayang",
      "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
      "Dalam Persekitaran Kata-kata",
    ]);
    expect(topics[index - 1]?.key).toBe("Pantun Budi");
    expect(topics[index + 1]?.key).toBe("Pantun Kasih Sayang");
  });

  it("uses the prescribed identity and twelve title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2PantunNasihatMindMap).toMatchObject({
      id: "bm-f2-pantun-nasihat-root",
      label: "PANTUN NASIHAT",
      summary:
        "Pantun Nasihat memberikan panduan tentang cara menjalani kehidupan dengan baik melalui amalan kebaikan, menjauhi keburukan, menjaga tutur kata, mengawal emosi dan memelihara adab dalam masyarakat.",
    });
    expect(bahasaMelayuTingkatan2PantunNasihatMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan2PantunNasihatMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches exactly seven verified rangkap meanings and memory cues", () => {
    const branch = bahasaMelayuTingkatan2PantunNasihatMindMap.children?.find(
      (item) => item.label === "Maksud Rangkap",
    );
    expect(branch?.children?.map((item) => item.label)).toEqual([
      "Rangkap 1 — Kebaikan dan Kejahatan",
      "Rangkap 2 — Jauhi Perkara Haram",
      "Rangkap 3 — Jangan Larut dalam Kesedihan",
      "Rangkap 4 — Jaga Tutur Kata",
      "Rangkap 5 — Keharmonian Rumah Tangga",
      "Rangkap 6 — Adab dan Bahasa",
      "Rangkap 7 — Pandai Membawa Diri",
    ]);
    const text = branchText("Maksud Rangkap");
    expect(text).toContain("BUAT BAIK → BERPADA-PADA; BUAT JAHAT → JANGAN");
    expect(text).toContain("bukan bermaksud jangan terlalu baik");
    expect(text).toContain("HARAM + MUDARAT → JAUHI");
    expect(text).toContain("SEDIH + RISAU → KAWAL");
    expect(text).toContain("FIKIR → CAKAP");
    expect(text).toContain("ADAT + BAHASA → MASYARAKAT BERADAB");
    expect(text).toContain("TEMPAT ORANG ↓ HORMAT ↓ SESUAIKAN DIRI ↓ JAGA TINGKAH LAKU");
    expect(text).not.toContain("Rangkap 8");
  });

  it("handles the traditional relationship context without normalising harmful behaviour", () => {
    const text = branchText("Maksud Rangkap");
    expect(text).toContain("Konteks Teks Tradisional");
    expect(text).toContain("Nilai Universal");
    expect(text).toContain("PERSEFAHAMAN + PERTIMBANGAN + KOMUNIKASI → RUMAH TANGGA HARMONI");
    expect(text).toContain("kedua-dua pasangan bertanggungjawab");
    expect(text).toContain("tidak bertanggungjawab atas salah laku pasangannya");
    expect(branchText("Kesalahan Lazim")).toContain(
      "Jangan menyalahkan seseorang atas salah laku pasangannya",
    );
  });

  it("uses the accepted theme, supported issues and verified formal structure", () => {
    expect(branchText("Tema")).toContain(
      "NASIHAT SEBAGAI PANDUAN UNTUK MENJALANI KEHIDUPAN YANG BAIK",
    );
    const persoalan = branchText("Persoalan");
    for (const idea of [
      "Melakukan Kebaikan dan Menjauhi Kejahatan",
      "Menjauhi Perkara yang Memudaratkan",
      "Kepentingan Mengawal Emosi",
      "Kepentingan Menjaga Tutur Kata",
      "Kepentingan Persefahaman dalam Rumah Tangga",
      "Kepentingan Budi Bahasa",
      "Kepentingan Pandai Membawa Diri",
    ]) {
      expect(persoalan).toContain(idea);
    }
    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("Baik Budi, Indah Bahasa");
    expect(bentuk).toContain("Tujuh Rangkap");
    expect(bentuk).toContain("Pantun Empat Kerat");
    expect(bentuk).toContain("Baris pertama dan kedua ialah pembayang");
    expect(bentuk).toContain("Baris ketiga dan keempat menyampaikan maksud");
    for (let rangkap = 1; rangkap <= 7; rangkap += 1) {
      expect(bentuk).toContain(`Rangkap ${rangkap} — abab`);
    }
    expect(bentuk).not.toContain("Patah Kata");
    expect(bentuk).not.toContain("Suku Kata");
  });

  it("uses only verified literary devices, short evidence, values and answer guards", () => {
    const gaya = branchText("Gaya Bahasa");
    for (const technique of [
      "Anafora",
      "Inversi",
      "Unsur Alam",
      "Simile",
      "Asonansi",
      "Aliterasi",
      "Kata Ganda",
    ]) {
      expect(gaya).toContain(technique);
    }
    for (const value of [
      "Baik Hati",
      "Kebijaksanaan",
      "Rasional",
      "Ketabahan",
      "Kesopanan",
      "Persefahaman",
      "Beradab",
      "Hormat-menghormati",
    ]) {
      expect(branchText("Nilai")).toContain(value);
    }
    expect(branchText("Kata Kunci")).toContain(
      "BAIK ↓ JAUHI BURUK ↓ KAWAL DIRI ↓ JAGA KATA ↓ FAHAMI ORANG ↓ BERADAB ↓ BAWA DIRI",
    );
    const errors = branchText("Kesalahan Lazim");
    expect(errors).toContain("‘Berpada-pada’ = Jangan Terlalu Baik");
    expect(errors).toContain("Pantun Menggalakkan Mencuba Perkara Haram");
    expect(errors).toContain("Sedih = Tidak Boleh Bersedih");
    expect(errors).toContain("Tema = Budi Bahasa");
    expect(errors).toContain("Gaya Bahasa Direka");

    const allText = collectNodes(bahasaMelayuTingkatan2PantunNasihatMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(allText).not.toContain("Tanam balik buah peria, Buah peria mahal sekali");
    expect(allText).not.toContain("Pulau di balik Pulau Gosong, Pandan di Jawa diranggungkan");
  });

  it("supports full expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2PantunNasihatMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2PantunNasihatMindMap, new Set())).toHaveLength(
      1,
    );
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2PantunNasihatMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2PantunNasihatMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan2PantunNasihatMindMap,
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
        data: bahasaMelayuTingkatan2PantunNasihatMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("PANTUN NASIHAT");
    expect(markup).toContain("Adab Kehidupan");
    expect(markup).not.toContain("Tujuh Rangkap");
  });
});
