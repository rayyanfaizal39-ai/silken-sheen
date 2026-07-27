import { describe, expect, it } from "vitest";
import { bahasaMelayuForm2AyatAktifMindMap } from "@/content/bm/ayat-aktif-form2-mindmap";
import { bahasaMelayuForm2FrasaAdjektifMindMap } from "@/content/bm/frasa-adjektif-form2-mindmap";
import { bahasaMelayuForm2AyatPasifMindMap } from "@/content/bm/ayat-pasif-form2-mindmap";
import { bahasaMelayuForm2AyatTunggalMindMap } from "@/content/bm/ayat-tunggal-form2-mindmap";
import { bahasaMelayuForm2FrasaKerjaMindMap } from "@/content/bm/frasa-kerja-form2-mindmap";
import { bahasaMelayuForm2FrasaNamaMindMap } from "@/content/bm/frasa-nama-form2-mindmap";
import { bahasaMelayuImbuhanMindMap } from "@/content/bm/imbuhan-mindmap";
import { bahasaMelayuKataAdjektifMindMap } from "@/content/bm/kata-adjektif-mindmap";
import { bahasaMelayuKataGantiNamaMindMap } from "@/content/bm/kata-ganti-nama-mindmap";
import { bahasaMelayuKataBilanganMindMap } from "@/content/bm/kata-bilangan-mindmap";
import { bahasaMelayuKataHubungMindMap } from "@/content/bm/kata-hubung-mindmap";
import { bahasaMelayuKataKerjaMindMap } from "@/content/bm/kata-kerja-mindmap";
import { bahasaMelayuKataNamaMindMap } from "@/content/bm/kata-nama-mindmap";
import { bahasaMelayuKataSendiNamaMindMap } from "@/content/bm/kata-sendi-nama-mindmap";
import { bahasaMelayuPenandaWacanaMindMap } from "@/content/bm/penanda-wacana-mindmap";
import { bahasaMelayuPenjodohBilanganMindMap } from "@/content/bm/penjodoh-bilangan-mindmap";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindMapPosition,
  type MindNode,
} from "./MindMap";

const tatabahasaMindMaps = [
  ["Kata Nama", bahasaMelayuKataNamaMindMap],
  ["Kata Ganti Nama", bahasaMelayuKataGantiNamaMindMap],
  ["Kata Kerja", bahasaMelayuKataKerjaMindMap],
  ["Kata Adjektif", bahasaMelayuKataAdjektifMindMap],
  ["Kata Sendi Nama", bahasaMelayuKataSendiNamaMindMap],
  ["Kata Hubung", bahasaMelayuKataHubungMindMap],
  ["Kata Bilangan", bahasaMelayuKataBilanganMindMap],
  ["Penjodoh Bilangan", bahasaMelayuPenjodohBilanganMindMap],
  ["Imbuhan", bahasaMelayuImbuhanMindMap],
  ["Penanda Wacana", bahasaMelayuPenandaWacanaMindMap],
  ["Frasa Nama (Form 2)", bahasaMelayuForm2FrasaNamaMindMap],
  ["Frasa Kerja (Form 2)", bahasaMelayuForm2FrasaKerjaMindMap],
  ["Frasa Adjektif (Form 2)", bahasaMelayuForm2FrasaAdjektifMindMap],
  ["Ayat Aktif (Form 2)", bahasaMelayuForm2AyatAktifMindMap],
  ["Ayat Pasif (Form 2)", bahasaMelayuForm2AyatPasifMindMap],
  ["Ayat Tunggal (Form 2)", bahasaMelayuForm2AyatTunggalMindMap],
] as const;

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function visibleLabels(data: MindNode, expanded: ReadonlySet<string>) {
  return getVisibleMindNodes(data, expanded).map(({ node }) => node.label);
}

function rectangle(position: MindMapPosition) {
  return {
    left: position.x,
    right: position.x + position.w,
    top: position.y - position.h / 2,
    bottom: position.y + position.h / 2,
  };
}

function overlaps(a: MindMapPosition, b: MindMapPosition) {
  const first = rectangle(a);
  const second = rectangle(b);
  return !(
    first.right <= second.left ||
    second.right <= first.left ||
    first.bottom <= second.top ||
    second.bottom <= first.top
  );
}

describe("MindMap reusable hierarchy", () => {
  it.each(tatabahasaMindMaps)("%s keeps every first-level branch title-only", (_, data) => {
    expect(data.children?.length).toBeGreaterThan(0);
    data.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });

    const overview = visibleLabels(data, new Set([data.id]));
    expect(overview).toEqual([data.label, ...(data.children?.map((branch) => branch.label) ?? [])]);
  });

  it("reveals Kata Adjektif detail nodes only when their parent branch is expanded", () => {
    const data = bahasaMelayuKataAdjektifMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("Sifat");
    expect(overview).not.toContain("Pengelasan");

    const definition = data.children?.find((branch) => branch.label === "Definisi");
    const definitionOpen = getVisibleMindNodes(data, new Set([data.id, definition?.id ?? ""]));
    const meaning = definitionOpen.find(({ node }) => node.label === "Maksud")?.node;
    expect(meaning?.summary).toBe(
      "Kata adjektif menerangkan sifat, keadaan atau kualiti bagi sesuatu kata nama atau frasa nama.",
    );

    const functionBranch = data.children?.find((branch) => branch.label === "Fungsi");
    expect(visibleLabels(data, new Set([data.id, functionBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Sifat", "Keadaan", "Rupa", "Warna", "Ukuran", "Perasaan"]),
    );

    const examples = data.children?.find((branch) => branch.label === "Contoh Kata Adjektif");
    const exampleNodes = getVisibleMindNodes(data, new Set([data.id, examples?.id ?? ""]));
    expect(exampleNodes.find(({ node }) => node.label === "Warna")?.node.summary).toBe(
      "merah • hijau • biru",
    );
  });

  it("supports expand-all and collapse-all visibility without duplicated branch summaries", () => {
    const data = bahasaMelayuKataAdjektifMindMap;
    const allNodes = collectNodes(data);
    const expanded = getExpandableMindNodeIds(data);
    const expandedNodes = getVisibleMindNodes(data, expanded);

    expect(expandedNodes).toHaveLength(allNodes.length);
    expect(visibleLabels(data, new Set([data.id]))).toHaveLength((data.children?.length ?? 0) + 1);

    const content = allNodes.flatMap((node) => [node.label, node.summary].filter(Boolean));
    [
      "Kata adjektif menjadi inti kepada Frasa Adjektif.",
      "Kata adjektif yang lebih deskriptif dapat meningkatkan mutu penulisan.",
      "Gunakan kata adjektif yang diberi dengan bentuk dan maksud yang tepat.",
      "Kata Adjektif = menerangkan sifat atau keadaan",
    ].forEach((detail) => {
      expect(content.filter((entry) => entry === detail)).toHaveLength(1);
    });
  });

  it("reveals Kata Sendi Nama rules only through their matching branches", () => {
    const data = bahasaMelayuKataSendiNamaMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Kegunaan");
    expect(overview).not.toContain("dari");
    expect(overview).not.toContain("Formula");

    const diBranch = data.children?.find((branch) => branch.label === "di");
    const diOpen = getVisibleMindNodes(data, new Set([data.id, diBranch?.id ?? ""]));
    expect(diOpen.find(({ node }) => node.label === "Kegunaan")?.node.summary).toBe(
      "Digunakan untuk menunjukkan tempat atau lokasi.",
    );
    expect(diOpen.map(({ node }) => node.label)).toEqual(
      expect.arrayContaining(["Contoh", "Nota Ejaan", "Bezakan dengan Imbuhan di-"]),
    );

    const dariBranch = data.children?.find((branch) => branch.label === "dari / daripada");
    const dariOpen = getVisibleMindNodes(data, new Set([data.id, dariBranch?.id ?? ""]));
    expect(dariOpen.find(({ node }) => node.label === "dari")?.node.summary).toBe(
      "Gunakan rumus ATM: Arah, Tempat, Masa.",
    );
    expect(dariOpen.map(({ node }) => node.label)).toEqual(
      expect.arrayContaining(["daripada", "Perbandingan Ringkas"]),
    );

    const frasaBranch = data.children?.find((branch) => branch.label === "Frasa Sendi Nama");
    expect(visibleLabels(data, new Set([data.id, frasaBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Maksud", "Formula", "Pola Ayat", "Contoh"]),
    );
  });

  it("reveals Frasa Nama structure and sentence roles only through their matching branches", () => {
    const data = bahasaMelayuForm2FrasaNamaMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("FN + FK");
    expect(overview).not.toContain("Kenal Pasti Seluruh Frasa");

    const definitionBranch = data.children?.find((branch) => branch.label === "Definisi");
    expect(visibleLabels(data, new Set([data.id, definitionBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Maksud", "Inti Frasa", "Contoh"]),
    );

    const patternBranch = data.children?.find((branch) => branch.label === "Pola Ayat Dasar");
    expect(visibleLabels(data, new Set([data.id, patternBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["FN + FK", "FN + FA", "FN + FS", "FN + FN"]),
    );

    const subjectBranch = data.children?.find((branch) => branch.label === "Sebagai Subjek");
    expect(visibleLabels(data, new Set([data.id, subjectBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Penerangan",
        "Kenal Pasti Seluruh Frasa",
        "Contoh 1",
        "Contoh 2",
        "Contoh 3",
      ]),
    );
  });

  it("reveals Frasa Kerja syntax only through its matching branches", () => {
    const data = bahasaMelayuForm2FrasaKerjaMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("Kata Bantu Aspek");
    expect(overview).not.toContain("Frasa Sendi Nama");
    expect(overview).not.toContain("FN + FS");

    const definitionBranch = data.children?.find((branch) => branch.label === "Definisi");
    expect(visibleLabels(data, new Set([data.id, definitionBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Maksud", "Inti Frasa", "Contoh", "Peranan dalam Sintaksis"]),
    );

    const auxiliaryBranch = data.children?.find((branch) => branch.label === "Dengan Kata Bantu");
    expect(visibleLabels(data, new Set([data.id, auxiliaryBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Maksud", "Kata Bantu Aspek", "Kata Bantu Ragam", "Contoh Ayat"]),
    );

    const compareBranch = data.children?.find((branch) => branch.label === "Bezakan Jenis Frasa");
    expect(visibleLabels(data, new Set([data.id, compareBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Frasa Kerja",
        "Frasa Sendi Nama",
        "Frasa Adjektif",
        "Frasa Nama",
        "Rumus",
      ]),
    );

    const tipBranch = data.children?.find((branch) => branch.label === "Tip UASA");
    expect(visibleLabels(data, new Set([data.id, tipBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Cari Subjek",
        "Cari Kata Kerja Inti",
        "Ambil Keseluruhan Predikat",
        "Tentukan Pola",
        "Bezakan Frasa",
        "Bina Ayat Gramatis",
      ]),
    );
  });

  it("reveals Frasa Adjektif syntax only through its matching branches", () => {
    const data = bahasaMelayuForm2FrasaAdjektifMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("Contoh 1");
    expect(overview).not.toContain("Frasa Sendi Nama");
    expect(overview).not.toContain("Nota Ketepatan");

    const definitionBranch = data.children?.find((branch) => branch.label === "Definisi");
    expect(visibleLabels(data, new Set([data.id, definitionBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Maksud", "Inti Frasa", "Fungsi Umum"]),
    );

    const patternBranch = data.children?.find((branch) => branch.label === "Pola FN + FA");
    expect(visibleLabels(data, new Set([data.id, patternBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Contoh 1", "Contoh 2", "Contoh 3", "Formula"]),
    );

    const compareBranch = data.children?.find((branch) => branch.label === "Bezakan Jenis Frasa");
    expect(visibleLabels(data, new Set([data.id, compareBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Frasa Adjektif",
        "Frasa Kerja",
        "Frasa Nama",
        "Frasa Sendi Nama",
        "Peraturan",
      ]),
    );

    const tipBranch = data.children?.find((branch) => branch.label === "Tip UASA");
    expect(visibleLabels(data, new Set([data.id, tipBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Cari Kata Sifat",
        "Cari Keseluruhan Frasa",
        "Bezakan dengan Kata Kerja",
        "Tentukan Pola",
        "Bina Ayat Lengkap",
      ]),
    );
  });

  it("reveals Ayat Pasif rules only through their matching branches", () => {
    const data = bahasaMelayuForm2AyatPasifMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("Rumus Asas");
    expect(overview).not.toContain("Langkah 1: Cari Pelaku");
    expect(overview).not.toContain("Mengekalkan meN-");

    const thirdPersonBranch = data.children?.find((branch) => branch.label === "Pasif Diri Ketiga");
    expect(visibleLabels(data, new Set([data.id, thirdPersonBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Pelaku",
        "Rumus Asas",
        "Contoh",
        "Dengan Kata Bantu",
        'Penggunaan "oleh"',
        "Ejaan di-",
      ]),
    );

    const conversionBranch = data.children?.find((branch) => branch.label === "Penukaran Ayat");
    expect(visibleLabels(data, new Set([data.id, conversionBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Langkah 1: Cari Pelaku",
        "Langkah 2: Cari Kata Kerja Transitif",
        "Langkah 3: Cari Objek",
        "Langkah 4: Tentukan Jenis Pelaku",
        "Langkah 5: Susun Ayat Pasif",
        "Syarat Penukaran Terus",
      ]),
    );

    const errorBranch = data.children?.find((branch) => branch.label === "Kesalahan Lazim");
    expect(visibleLabels(data, new Set([data.id, errorBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Mengekalkan meN-",
        "Menggunakan di- untuk Diri Pertama",
        "Salah Susunan Diri Kedua",
        "Memisahkan Awalan di-",
        "Menggugurkan Kata Bantu",
      ]),
    );
  });

  it("reveals Ayat Aktif syntax only through its matching branches", () => {
    const data = bahasaMelayuForm2AyatAktifMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("Struktur Umum");
    expect(overview).not.toContain("Contoh Tanpa Pelengkap");
    expect(overview).not.toContain("Langkah 1: Cari Pelaku");

    const structureBranch = data.children?.find((branch) => branch.label === "Struktur Ayat");
    expect(visibleLabels(data, new Set([data.id, structureBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Struktur Umum",
        "Contoh Transitif",
        "Contoh Tak Transitif",
        "Subjek",
        "Predikat",
      ]),
    );

    const intransitiveBranch = data.children?.find(
      (branch) => branch.label === "Ayat Aktif Tak Transitif",
    );
    expect(visibleLabels(data, new Set([data.id, intransitiveBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Maksud",
        "Contoh Tanpa Pelengkap",
        "Contoh dengan Keterangan",
        "Contoh dengan Pelengkap",
        "Tidak Boleh Dipasifkan Secara Biasa",
      ]),
    );

    const conversionBranch = data.children?.find((branch) => branch.label === "Penukaran Ayat");
    expect(visibleLabels(data, new Set([data.id, conversionBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Langkah 1: Cari Pelaku",
        "Langkah 4: Pastikan Transitif",
        "Langkah 6: Tukar kepada Pasif",
        "Contoh Orang Pertama",
        "Contoh Orang Kedua",
        "Contoh Orang Ketiga",
        "Penukaran Pasif kepada Aktif",
      ]),
    );
  });

  it("reveals Ayat Tunggal syntax only through its matching branches", () => {
    const data = bahasaMelayuForm2AyatTunggalMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("FN + FN");
    expect(overview).not.toContain("Contoh Seluruh Predikat");
    expect(overview).not.toContain("Ayat Tunggal 1");

    const subjectBranch = data.children?.find((branch) => branch.label === "Subjek dan Predikat");
    expect(visibleLabels(data, new Set([data.id, subjectBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Subjek", "Predikat", "Cari Sempadan Frasa", "Formula", "Nota"]),
    );

    const patternBranch = data.children?.find((branch) => branch.label === "Pola Ayat Dasar");
    expect(visibleLabels(data, new Set([data.id, patternBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["FN + FN", "FN + FK", "FN + FA", "FN + FS", "Nota"]),
    );

    const pencerakinanBranch = data.children?.find((branch) => branch.label === "Pencerakinan");
    expect(visibleLabels(data, new Set([data.id, pencerakinanBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Maksud",
        "Contoh Asal",
        "Ayat Tunggal 1",
        "Ayat Tunggal 2",
        "Kekalkan Maksud",
        "Kekalkan Maklumat",
        "Contoh Subjek Sama",
        "Nota",
      ]),
    );
  });

  it("reveals Kata Hubung explanations only through their matching branches", () => {
    const data = bahasaMelayuKataHubungMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("Gabungan");
    expect(overview).not.toContain("Peranan");

    const typesBranch = data.children?.find((branch) => branch.label === "Jenis Kata Hubung");
    expect(visibleLabels(data, new Set([data.id, typesBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Gabungan",
        "Pilihan",
        "Sebab",
        "Tujuan",
        "Pertentangan",
        "Perbandingan",
      ]),
    );

    const compoundBranch = data.children?.find((branch) => branch.label === "Dalam Ayat Majmuk");
    expect(visibleLabels(data, new Set([data.id, compoundBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Peranan", "Formula", "Contoh", "Contoh 2"]),
    );

    const discourseBranch = data.children?.find((branch) => branch.label === "Penanda Wacana");
    expect(visibleLabels(data, new Set([data.id, discourseBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Pengenalan", "Contoh", "Nota"]),
    );
  });

  it("reveals Penjodoh Bilangan classifiers only through their matching branches", () => {
    const data = bahasaMelayuPenjodohBilanganMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("orang");
    expect(overview).not.toContain("helai");

    const definitionBranch = data.children?.find((branch) => branch.label === "Definisi");
    expect(visibleLabels(data, new Set([data.id, definitionBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Maksud", "Fungsi", "Struktur"]),
    );

    const shapeBranch = data.children?.find((branch) => branch.label === "Benda Mengikut Bentuk");
    expect(visibleLabels(data, new Set([data.id, shapeBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "helai",
        "batang",
        "bilah",
        "utas",
        "keping",
        "butir",
        "biji",
        "Nota Perbandingan",
      ]),
    );

    const errorBranch = data.children?.find((branch) => branch.label === "Kesalahan Lazim");
    expect(visibleLabels(data, new Set([data.id, errorBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Salah Penjodoh Bilangan",
        "Tidak Sesuai dengan Bentuk",
        "Penggunaan pada Kata Abstrak",
        "Menggandakan Bilangan",
        "Menghafal Tanpa Memahami",
      ]),
    );
  });

  it("reveals Kata Bilangan categories only through their matching branches", () => {
    const data = bahasaMelayuKataBilanganMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("Bentuk Gandaan");
    expect(overview).not.toContain("Dengan Angka");

    const indefiniteBranch = data.children?.find(
      (branch) => branch.label === "Kata Bilangan Tak Tentu",
    );
    expect(visibleLabels(data, new Set([data.id, indefiniteBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Maksud",
        "Contoh",
        "beberapa",
        "semua",
        "ramai",
        "para",
        "segala",
        "Nota Perbandingan",
      ]),
    );

    const spellingBranch = data.children?.find((branch) => branch.label === "Ejaan");
    expect(visibleLabels(data, new Set([data.id, spellingBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "ke- dengan Angka",
        "Angka dengan -an",
        "Gandaan",
        "Nombor dan Perkataan",
        "Konsisten",
      ]),
    );

    const relationshipBranch = data.children?.find(
      (branch) => branch.label === "Hubungan dengan Penjodoh Bilangan",
    );
    expect(visibleLabels(data, new Set([data.id, relationshipBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Struktur Umum",
        "Tanpa Penjodoh Bilangan",
        "Bezakan",
        "Nota",
        "Penjodoh Bilangan",
      ]),
    );
  });

  it("reveals Imbuhan rules only through their matching branches", () => {
    const data = bahasaMelayuImbuhanMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("Fungsi Ringkas");
    expect(overview).not.toContain("Kata Nama Khas");

    const prefixBranch = data.children?.find((branch) => branch.label === "Imbuhan Awalan");
    expect(visibleLabels(data, new Set([data.id, prefixBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Maksud", "Contoh", "Contoh Perkataan", "Fungsi Ringkas"]),
    );

    const suffixBranch = data.children?.find((branch) => branch.label === "Imbuhan Akhiran");
    expect(visibleLabels(data, new Set([data.id, suffixBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Maksud", "Contoh", "Pembentukan Perkataan", "Nota Ejaan"]),
    );

    const borrowedBranch = data.children?.find((branch) => branch.label === "Imbuhan Pinjaman");
    expect(visibleLabels(data, new Set([data.id, borrowedBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Maksud", "Contoh", "Contoh Perkataan", "Kata Nama Khas"]),
    );
  });

  it("reveals Penanda Wacana guidance only through its matching branches", () => {
    const data = bahasaMelayuPenandaWacanaMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Memulakan Perenggan");
    expect(overview).not.toContain("Marcapada");
    expect(overview).not.toContain("Persamaan");

    const openingBranch = data.children?.find((branch) => branch.label === "Memulakan Idea");
    expect(visibleLabels(data, new Set([data.id, openingBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Memulakan Perenggan", "Contoh Ayat", "Kegunaan"]),
    );

    const vocabularyBranch = data.children?.find(
      (branch) => branch.label === "Kosa Kata Aras Tinggi",
    );
    expect(visibleLabels(data, new Set([data.id, vocabularyBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Marcapada",
        "Sementelahan",
        "Izharnya",
        "Seyogia",
        "Kendatipun",
        "Kosa Kata Lanjutan",
      ]),
    );

    const relationshipBranch = data.children?.find(
      (branch) => branch.label === "Hubungan dengan Kata Hubung",
    );
    const differenceBranch = relationshipBranch?.children?.find(
      (branch) => branch.label === "Perbezaan",
    );
    expect(
      visibleLabels(
        data,
        new Set([data.id, relationshipBranch?.id ?? "", differenceBranch?.id ?? ""]),
      ),
    ).toEqual(
      expect.arrayContaining(["Persamaan", "Perbezaan", "Kata Hubung", "Penanda Wacana", "Nota"]),
    );
  });

  it("reveals Kata Ganti Nama person categories only through their matching branch", () => {
    const data = bahasaMelayuKataGantiNamaMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Orang Pertama");
    expect(overview).not.toContain("ini");
    expect(overview).not.toContain("Situasi Rasmi");

    const diriBranch = data.children?.find((branch) => branch.label === "Kata Ganti Nama Diri");
    const diriOpen = getVisibleMindNodes(data, new Set([data.id, diriBranch?.id ?? ""]));
    expect(diriOpen.map(({ node }) => node.label)).toEqual(
      expect.arrayContaining(["Maksud", "Orang Pertama", "Orang Kedua", "Orang Ketiga"]),
    );
    expect(diriOpen.find(({ node }) => node.label === "Orang Pertama")?.node.summary).toBe(
      "Merujuk kepada orang yang bercakap: saya, aku, kami dan kita.",
    );

    const tunjukBranch = data.children?.find((branch) => branch.label === "Kata Ganti Nama Tunjuk");
    expect(visibleLabels(data, new Set([data.id, tunjukBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["ini", "itu", "sini, situ dan sana"]),
    );

    const contextBranch = data.children?.find(
      (branch) => branch.label === "Pemilihan Mengikut Konteks",
    );
    expect(visibleLabels(data, new Set([data.id, contextBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Situasi Rasmi", "Situasi Tidak Formal", "Bilangan", "Kesantunan"]),
    );
  });
});

describe("MindMap balanced desktop layout", () => {
  it.each(tatabahasaMindMaps)(
    "%s distributes collapsed first-level branches on both sides",
    (_, data) => {
      const layout = calculateMindMapLayout(data, new Set([data.id]));
      const root = layout.positions.get(data.id);
      expect(root).toBeDefined();

      const branches = (data.children ?? []).map((branch) => {
        const position = layout.positions.get(branch.id);
        expect(position).toBeDefined();
        return position!;
      });
      const left = branches.filter((position) => position.x + position.w <= root!.x);
      const right = branches.filter((position) => position.x >= root!.x + root!.w);

      expect(left.length).toBeGreaterThan(0);
      expect(right.length).toBeGreaterThan(0);
      expect(Math.abs(left.length - right.length)).toBeLessThanOrEqual(1);
      expect(branches.every((position) => position.w >= 188)).toBe(true);
      expect(layout.edges).toHaveLength(data.children?.length ?? 0);
    },
  );

  it.each(tatabahasaMindMaps)(
    "%s keeps fully expanded nodes separate and growing outward",
    (_, data) => {
      const layout = calculateMindMapLayout(data, getExpandableMindNodeIds(data));
      const positions = [...layout.positions.entries()];

      positions.forEach(([firstId, firstPosition], firstIndex) => {
        positions.slice(firstIndex + 1).forEach(([secondId, secondPosition]) => {
          expect(overlaps(firstPosition, secondPosition), `${firstId} overlaps ${secondId}`).toBe(
            false,
          );
        });
      });

      layout.edges.forEach(({ from, to }) => {
        const parent = layout.positions.get(from)!;
        const child = layout.positions.get(to)!;
        expect(
          child.x + child.w <= parent.x || child.x >= parent.x + parent.w,
          `${to} must grow outward from ${from}`,
        ).toBe(true);
      });
    },
  );
});
