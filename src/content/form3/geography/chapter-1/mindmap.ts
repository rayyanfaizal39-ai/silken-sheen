import type { MindNode } from "@/components/MindMap";

export const geoF3C1MindMap: MindNode = {
  id: "root",
  label: "Jadual dan Graf",
  children: [
    { id: "jadual", label: "Jadual", children: [
      { id: "jadual-ciri", label: "Tajuk • data • sumber" },
      { id: "jadual-guna", label: "Susun • banding • tafsir data" },
    ]},
    { id: "kutip", label: "Pengumpulan Maklumat", children: [
      { id: "kutip-1", label: "Pemerhatian • temu bual • banci" },
      { id: "kutip-2", label: "Soal selidik • rujukan kepustakaan" },
    ]},
    { id: "graf", label: "Jenis Graf", children: [
      { id: "graf-bar", label: "Graf bar mudah • banding kategori" },
      { id: "graf-line", label: "Graf garisan • perubahan berterusan" },
      { id: "graf-combo", label: "Graf gabungan • dua set data" },
    ]},
    { id: "bina", label: "Membina Graf", children: [
      { id: "bina-1", label: "Paksi • skala • plot data" },
      { id: "bina-2", label: "Tajuk • unit • petunjuk" },
    ]},
    { id: "tafsir", label: "Mentafsir Data", children: [
      { id: "tafsir-1", label: "Nilai tertinggi • terendah • trend" },
      { id: "tafsir-2", label: "Isi tersurat • isi tersirat • rumusan" },
    ]},
  ],
};
