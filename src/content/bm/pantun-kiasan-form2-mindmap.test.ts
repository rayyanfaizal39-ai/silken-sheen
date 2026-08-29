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
import { bahasaMelayuTingkatan2PantunKiasanMindMap } from "./pantun-kiasan-form2-mindmap";
import { bahasaMelayuTingkatan2KomsasRegistry } from "./tingkatan2-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Pantun Kiasan";
const expectedBranches = [
  "Apa Itu Kiasan?",
  "Maksud Pantun",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Ciri Pantun",
  "Bahasa Kiasan",
  "Gaya Bahasa",
  "Nilai",
  "Pengajaran",
  "Teknik Mentafsir Kiasan",
  "Kata Kunci",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2PantunKiasanMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Pantun Kiasan mind map", () => {
  it("preserves Pantun Alam Remaja and registers Pantun Kiasan exactly once", () => {
    expect(bahasaMelayuTingkatan2KomsasRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Pantun Alam Remaja",
      title,
      "Pantun Budi",
      "Pantun Nasihat",
      "Pantun Kasih Sayang",
      "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
      "Dalam Persekitaran Kata-kata",
      "Roti",
      "Kucari Damai di Sini",
      "Pada Sekuntum Mawar",
    ]);
    expect(
      bahasaMelayuTingkatan2KomsasRegistry.filter((topic) => topic.chapterKey === title),
    ).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 2")).toMatchObject({
      id: "bm-f2-pantun-kiasan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: title,
      title,
      description:
        "Pantun yang menggunakan bahasa kiasan dan perlambangan untuk menyampaikan nasihat, teguran serta pandangan tentang sikap dan kehidupan manusia.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan2PantunKiasanMindMap, title },
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
      title,
      "Pantun Budi",
      "Pantun Nasihat",
      "Pantun Kasih Sayang",
      "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
      "Dalam Persekitaran Kata-kata",
      "Roti",
      "Kucari Damai di Sini",
      "Pada Sekuntum Mawar",
    ]);
    expect(topics[index - 1]?.key).toBe("Pantun Alam Remaja");
    expect(topics[index + 1]?.key).toBe("Pantun Budi");
  });

  it("uses the prescribed identity and fourteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2PantunKiasanMindMap).toMatchObject({
      id: "bm-f2-pantun-kiasan-root",
      label: "PANTUN\nKIASAN",
      summary:
        "Pantun Kiasan menyampaikan maksud secara tidak langsung melalui perbandingan, lambang dan bahasa berkias untuk memberikan nasihat tentang kehidupan dan tingkah laku manusia.",
    });
    expect(bahasaMelayuTingkatan2PantunKiasanMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan2PantunKiasanMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches every verified rangkap as kiasan plus actionable advice", () => {
    const branch = bahasaMelayuTingkatan2PantunKiasanMindMap.children?.find(
      (item) => item.label === "Maksud Pantun",
    );
    expect(branch?.children?.map((item) => item.label)).toEqual(
      Array.from({ length: 17 }, (_, index) => `Rangkap ${index + 1}`),
    );
    branch?.children?.forEach((rangkap) => {
      expect(rangkap.children?.map((item) => item.label)).toEqual(["Maksud Kiasan", "Nasihat"]);
    });
    const text = branchText("Maksud Pantun");
    expect(text).toContain("membazir");
    expect(text).toContain("Pendirian manusia mudah berubah");
    expect(text).toContain("peluang untuk bertaubat sudah terlambat");
    expect(text).toContain("tidak berbudi bahasa");
    expect(text).not.toContain("Rangkap 18");
  });

  it("uses the accepted theme, supported issues and verified formal structure", () => {
    expect(branchText("Tema")).toContain("SINDIRAN TERHADAP SIKAP NEGATIF MANUSIA");
    expect(branchText("Persoalan")).toContain("Keburukan Sikap Membazir");
    expect(branchText("Persoalan")).toContain("Kesabaran Melenyapkan Kemarahan");
    expect(branchText("Persoalan")).toContain("Budi Bahasa Lebih Penting daripada Rupa");

    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("Baik Budi, Indah Bahasa");
    expect(bentuk).toContain("Tujuh Belas Rangkap");
    expect(bentuk).toContain("Pantun Empat Kerat");
    expect(bentuk).toContain("Tiga hingga Lima Patah Kata");
    expect(bentuk).toContain("Sembilan hingga Sebelas Suku Kata");
    expect(bentuk).toContain("Rima Akhir abab");
    expect(bentuk).toContain("Bentuk Terikat");
  });

  it("distinguishes literal imagery, implied meaning and message without over-interpretation", () => {
    expect(branchText("Apa Itu Kiasan?")).toContain("TERSURAT ≠ TERSIRAT");
    expect(branchText("Bahasa Kiasan")).toContain("Gambaran / Maksud Literal");
    expect(branchText("Bahasa Kiasan")).toContain("Maksud Tersirat");
    expect(branchText("Bahasa Kiasan")).toContain("Melukut di Tepi Gantang — Rangkap 2");
    expect(branchText("Bahasa Kiasan")).toContain("Api dan Embun — Rangkap 8");
    expect(branchText("Bahasa Kiasan")).toContain("Tangisan di Pintu Kubur — Rangkap 16");
    expect(branchText("Teknik Mentafsir Kiasan")).toContain("GAMBARAN + APA YANG DIWAKILI + MESEJ");
  });

  it("uses only verified literary devices, values and short evidence", () => {
    const gaya = branchText("Gaya Bahasa");
    for (const technique of [
      "Hiperbola",
      "Inversi",
      "Peribahasa",
      "Personifikasi",
      "Simile",
      "Sinkope",
      "Repetisi",
      "Imej Alam",
      "Asonansi",
      "Aliterasi",
    ]) {
      expect(gaya).toContain(technique);
    }
    for (const value of [
      "Berjimat Cermat",
      "Merendah Diri",
      "Rasional",
      "Kesabaran",
      "Kerajinan",
      "Keinsafan",
      "Berbudi Bahasa",
    ]) {
      expect(branchText("Nilai")).toContain(value);
    }
    const allText = collectNodes(bahasaMelayuTingkatan2PantunKiasanMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(allText).not.toContain("Jangan diikut resmi ayam, Bertelur sebiji riuh sekampung");
    expect(allText).not.toContain("Hujan ribut gunung terbakar, Embun setitik padam apinya");
  });

  it("contains the prescribed memory path, answer scaffolds and error guards", () => {
    expect(branchText("Kata Kunci")).toContain(
      "KIASAN → GAMBARAN → MAKSUD TERSIRAT → SIKAP MANUSIA → NASIHAT → PENGAJARAN",
    );
    expect(branchText("Kata Kunci")).toContain("JANGAN BACA SECARA LITERAL SAHAJA");
    expect(branchText("Kata Kunci")).toContain("LITERAL → TERSIRAT → MESEJ");
    expect(branchText("Teknik Menjawab")).toContain("TEKNIK + CONTOH PENDEK");
    expect(branchText("Kesalahan Lazim")).toContain("Semua Objek Dianggap Simbol");
    expect(branchText("Kesalahan Lazim")).toContain("Tema = Bahasa Kiasan");
    expect(branchText("Kesalahan Lazim")).toContain("Pantun Kiasan mempunyai 17 rangkap");
  });

  it("supports full expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2PantunKiasanMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2PantunKiasanMindMap, new Set())).toHaveLength(
      1,
    );
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2PantunKiasanMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2PantunKiasanMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan2PantunKiasanMindMap,
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
        data: bahasaMelayuTingkatan2PantunKiasanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("PANTUN");
    expect(markup).toContain("KIASAN");
    expect(markup).toContain("Teknik Mentafsir Kiasan");
    expect(markup).not.toContain("Tujuh Belas Rangkap");
  });
});
