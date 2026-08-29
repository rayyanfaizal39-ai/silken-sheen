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
import { bahasaMelayuTingkatan2PantunAlamRemajaMindMap } from "./pantun-alam-remaja-form2-mindmap";
import { bahasaMelayuTingkatan2KomsasRegistry } from "./tingkatan2-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Pantun Alam Remaja";
const expectedBranches = [
  "Maksud Rangkap",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Ciri Pantun",
  "Gaya Bahasa",
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
  const selected = bahasaMelayuTingkatan2PantunAlamRemajaMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Pantun Alam Remaja mind map", () => {
  it("keeps the topic first in the growing Form 2 KOMSAS registry", () => {
    expect(bahasaMelayuTingkatan2KomsasRegistry[0]?.chapterKey).toBe(title);
    expect(
      bahasaMelayuTingkatan2KomsasRegistry.filter((topic) => topic.chapterKey === title),
    ).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 2")).toMatchObject({
      id: "bm-f2-pantun-alam-remaja-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: title,
      title,
      description:
        "Pantun yang menggambarkan kehidupan remaja dan hubungan kekeluargaan, khususnya kasih sayang, perhatian dan kegembiraan dalam sesebuah keluarga.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan2PantunAlamRemajaMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 2", title, "mindMap")).toBe(true);
    expect(getChapter("bm", title, undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("starts the Form 2 KOMSAS sequence with registry-driven next navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual([
      title,
      "Pantun Kiasan",
      "Pantun Budi",
      "Pantun Nasihat",
      "Pantun Kasih Sayang",
      "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
      "Dalam Persekitaran Kata-kata",
      "Roti",
      "Kucari Damai di Sini",
      "Pada Sekuntum Mawar",
      "Pelanduk Mengajar Memerang",
      "Banjir di Mata Emak",
    ]);
    expect(topics[index - 1]).toBeUndefined();
    expect(topics[index + 1]?.key).toBe("Pantun Kiasan");
  });

  it("uses the prescribed identity and twelve title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2PantunAlamRemajaMindMap).toMatchObject({
      id: "bm-f2-pantun-alam-remaja-root",
      label: "PANTUN\nALAM REMAJA",
      summary:
        "Pantun menggambarkan kehidupan remaja dalam suasana kekeluargaan serta menonjolkan kasih sayang, perhatian dan hubungan erat antara anak dengan ibu bapa.",
    });
    expect(
      bahasaMelayuTingkatan2PantunAlamRemajaMindMap.children?.map((item) => item.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan2PantunAlamRemajaMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches all seven meanings with a meaning and keywords for each rangkap", () => {
    const branch = bahasaMelayuTingkatan2PantunAlamRemajaMindMap.children?.find(
      (item) => item.label === "Maksud Rangkap",
    );
    expect(branch?.children?.map((item) => item.label)).toEqual(
      Array.from({ length: 7 }, (_, index) => `Rangkap ${index + 1}`),
    );
    branch?.children?.forEach((rangkap) => {
      expect(rangkap.children?.map((item) => item.label)).toEqual(["Maksud", "Kata Kunci"]);
    });
    expect(branchText("Maksud Rangkap")).toContain("cemas, takut dan bimbang");
    expect(branchText("Maksud Rangkap")).toContain("masih muda dan manja");
    expect(branchText("Maksud Rangkap")).not.toContain("Rangkap 8");
  });

  it("records the verified pantun form and its rhyme exception", () => {
    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("Baik Budi, Indah Bahasa");
    expect(bentuk).toContain("Tujuh Rangkap");
    expect(bentuk).toContain("Empat Baris Serangkap");
    expect(bentuk).toContain("Tiga hingga Lima Patah Kata");
    expect(bentuk).toContain("Sembilan hingga Sepuluh Suku Kata");
    expect(bentuk).toContain("Rima abab; Rangkap 2 aaaa");
    expect(bentuk).toContain("Bentuk Terikat");
    expect(branchText("Ciri Pantun")).toContain("Dua baris awal");
  });

  it("keeps the literary analysis supported and distinguishes dominant tone", () => {
    expect(branchText("Tema")).toContain("KEGEMBIRAAN MENYAMBUT KEPULANGAN IBU BAPA");
    expect(branchText("Persoalan")).toContain("Keakraban Hubungan Adik-beradik");
    expect(branchText("Nilai")).toContain("Kasih Sayang");
    expect(branchText("Nilai")).toContain("Tanggungjawab");
    expect(branchText("Nilai")).toContain("Baik Hati");
    expect(branchText("Nilai")).toContain("Hormat-menghormati");
    expect(branchText("Nada")).toContain("CERIA DAN GEMBIRA — NADA UTAMA");
    expect(branchText("Nada")).toContain("MANJA — KESAN SAMPINGAN");

    const gaya = branchText("Gaya Bahasa");
    for (const technique of [
      "Imej Alam",
      "Peribahasa",
      "Inversi",
      "Asonansi",
      "Aliterasi",
      "Kata Ganda",
    ]) {
      expect(gaya).toContain(technique);
    }
    expect(gaya).not.toMatch(/metafora|personifikasi|simile/i);
  });

  it("uses concise evidence, exam scaffolds and guards common errors", () => {
    const allText = collectNodes(bahasaMelayuTingkatan2PantunAlamRemajaMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(branchText("Kata Kunci")).toContain(
      "PULANG → HILANG CEMAS → RAI BERSAMA → TERIMA PEMBERIAN → MOHON PENGERTIAN",
    );
    expect(branchText("Kata Kunci")).toContain("KELUARGA = TEMPAT KASIH SAYANG DAN SOKONGAN");
    expect(branchText("Teknik Menjawab")).toContain("TEKNIK + CONTOH PENDEK");
    expect(branchText("Kesalahan Lazim")).toContain("Rangkap 2 berima aaaa");
    expect(branchText("Kesalahan Lazim")).toContain("SIAPA + PERASAAN + HUBUNGAN + MESEJ");
    expect(allText).not.toContain("Alang-alang menyeluk pekasam");
    expect(allText).not.toContain("Kalau ada jarum yang patah");
  });

  it("supports full expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2PantunAlamRemajaMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2PantunAlamRemajaMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2PantunAlamRemajaMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan2PantunAlamRemajaMindMap, expanded),
    ).toHaveLength(nodes.length);

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan2PantunAlamRemajaMindMap,
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
        data: bahasaMelayuTingkatan2PantunAlamRemajaMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("PANTUN");
    expect(markup).toContain("ALAM REMAJA");
    expect(markup).toContain("Ciri Pantun");
    expect(markup).not.toContain("Tujuh Rangkap");
  });
});
