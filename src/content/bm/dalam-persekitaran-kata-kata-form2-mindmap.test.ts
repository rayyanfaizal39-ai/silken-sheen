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
import { bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap } from "./dalam-persekitaran-kata-kata-form2-mindmap";
import { bahasaMelayuTingkatan2KomsasRegistry } from "./tingkatan2-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Dalam Persekitaran Kata-kata";
const expectedTopics = [
  "Pantun Alam Remaja",
  "Pantun Kiasan",
  "Pantun Budi",
  "Pantun Nasihat",
  "Pantun Kasih Sayang",
  "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
  title,
  "Roti",
  "Kucari Damai di Sini",
];
const expectedBranches = [
  "Maksud Bahagian",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Gaya Bahasa",
  "Bahasa sebagai Anugerah",
  "Bahasa dan Ilmu",
  "Bahasa, Alam dan Tuhan",
  "Nilai",
  "Pengajaran",
  "Nada",
  "Kata Kunci",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Dalam Persekitaran Kata-kata mind map", () => {
  it("preserves every existing topic and registers the sajak exactly once", () => {
    const keys = bahasaMelayuTingkatan2KomsasRegistry.map((topic) => topic.chapterKey);
    expect(keys).toEqual(expectedTopics);
    expect(keys.filter((key) => key === title)).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 2")).toMatchObject({
      id: "bm-f2-dalam-persekitaran-kata-kata-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: title,
      title,
      description:
        "Sajak yang mengangkat bahasa sebagai anugerah Tuhan yang membolehkan manusia berfikir, menyampaikan ilmu, memahami alam dan membina tamadun dari satu zaman ke zaman yang lain.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap, title },
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
    expect(topics.map((topic) => topic.key)).toEqual(expectedTopics);
    expect(topics[index - 1]?.key).toBe("Syair Nasihat (Penghujung Thamarat al-Muhimmah)");
    expect(topics[index + 1]?.key).toBe("Roti");
  });

  it("uses the prescribed identity and fourteen title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap).toMatchObject({
      id: "bm-f2-dalam-persekitaran-kata-kata-root",
      label: "DALAM\nPERSEKITARAN\nKATA-KATA",
    });
    expect(
      bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("separates the Quranic epigraph from the four authored rangkap", () => {
    const maksud = bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap.children?.find(
      (item) => item.label === "Maksud Bahagian",
    );
    expect(maksud?.children?.slice(0, 5).map((item) => item.label)).toEqual([
      "Pembuka / Epigraf al-Quran",
      "Rangkap 1 — Kata-kata dan Akal",
      "Rangkap 2 — Bangsa dan Pengembaraan",
      "Rangkap 3 — Alam Menjadi Sumber Ilmu",
      "Rangkap 4 — Bahasa Memahami Kehidupan",
    ]);
    maksud?.children?.slice(0, 5).forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.map((child) => child.label)).toEqual([
        "Maksud Mudah",
        "Idea Utama",
        "Kata Kunci",
      ]);
    });
    expect(branchText("Maksud Bahagian")).toContain("Sesetengah nota");
    expect(branchText("Maksud Bahagian")).toContain("lima rangkap");
  });

  it("records the verified author, anthology, form, lines and rhymes", () => {
    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("Baha Zain");
    expect(bentuk).toContain("sajak atau puisi moden");
    expect(bentuk).toContain("Baik Budi, Indah Bahasa");
    expect(bentuk).toContain("Surah ar-Rahman, ayat 3–4");
    expect(bentuk).toContain("Lima baris dengan rima akhir aaabc");
    expect(bentuk).toContain("Lima baris dengan rima akhir abccd");
    expect(bentuk).toContain("Sembilan baris dengan rima akhir abcaaadda");
    expect(bentuk).toContain("Tiga baris dengan rima akhir aba");
    expect(bentuk).toContain("Dua hingga Empat Patah Kata");
    expect(bentuk).toContain("Lapan hingga Tiga Belas Suku Kata");
    expect(bentuk).toContain("Sajak Bebas");
    expect(bentuk).toContain("Pantun vs Syair vs Sajak");
  });

  it("uses the language-centred theme and source-supported analysis", () => {
    expect(branchText("Tema")).toContain(
      "KEPENTINGAN BAHASA SEBAGAI ANUGERAH TUHAN DALAM KEHIDUPAN MANUSIA",
    );
    expect(branchText("Persoalan")).toContain("Bangsa Melayu sebagai Bangsa Pelayar");
    expect(branchText("Persoalan")).toContain("Kepentingan Membaca");
    expect(branchText("Bahasa sebagai Anugerah")).toContain(
      "TUHAN → AKAL + BAHASA → PEMIKIRAN → KOMUNIKASI → ILMU → TAMADUN",
    );
    expect(branchText("Bahasa dan Ilmu")).toContain(
      "KATA → MAKNA → PENGETAHUAN → ILMU → PEMAHAMAN",
    );
    expect(branchText("Bahasa, Alam dan Tuhan")).toContain(
      "ALAM → DIPERHATI → DINAMAKAN → DIKAJI → DIFAHAMI → MENYEDARI PENCIPTA",
    );
    expect(branchText("Nilai")).toContain("Kesyukuran");
    expect(branchText("Pengajaran")).toContain("Kita Hendaklah Menghargai Bahasa");
  });

  it("preserves the project tone while documenting the reference disagreement", () => {
    const nada = branchText("Nada");
    expect(nada).toContain("ROMANTIK — NADA PROJEK YANG DISAHKAN");
    expect(nada).toContain("Keagamaan — Dimensi Isi");
    expect(nada).toContain("sesetengah rujukan menamakannya sebagai nada utama");
  });

  it("uses only verified short literary-device evidence", () => {
    const gaya = branchText("Gaya Bahasa");
    for (const technique of [
      "Anafora",
      "Repetisi",
      "Personifikasi",
      "Simile",
      "Imejan Alam",
      "Kata Ganda",
      "Bahasa Klasik",
      "Bahasa Arab",
      "Asonansi",
      "Aliterasi",
    ]) {
      expect(gaya).toContain(technique);
    }
    expect(gaya).not.toContain("Hiperbola");

    const allText = collectNodes(bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(allText).not.toContain("Engkau beri kami kata-kata dan akal untuk mengucapkannya");
    expect(allText).not.toContain("Kata-kata yang berselerakan langit, bumi, laut, gunung");
  });

  it("keeps ids unique and the expanded desktop layout free of overlap", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(
      bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap,
    );
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap, expanded),
    ).toHaveLength(nodes.length);

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap,
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
        data: bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("DALAM");
    expect(markup).toContain("Bahasa sebagai Anugerah");
    expect(markup).not.toContain("Baha Zain");
  });
});
