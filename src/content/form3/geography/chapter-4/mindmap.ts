import type { MindNode } from "@/components/MindMap";

export const geoF3C4MindMap: MindNode = {
  id: "root",
  label: "Tumbuh-tumbuhan Semula Jadi di Malaysia",
  children: [
    { id: "jenis", label: "Jenis Hutan", children: [
      { id: "jenis-1", label: "Hutan Hujan Tropika" },
      { id: "jenis-2", label: "Hutan Paya Air Masin • Air Tawar" },
      { id: "jenis-3", label: "Hutan Pantai • Hutan Gunung" },
    ]},
    { id: "faktor", label: "Faktor Taburan", children: [
      { id: "faktor-1", label: "Bentuk muka bumi • saliran" },
      { id: "faktor-2", label: "Tanih • iklim" },
    ]},
    { id: "ciri", label: "Ciri Utama", children: [
      { id: "ciri-1", label: "Lapisan renjong • kanopi • lantai hutan" },
      { id: "ciri-2", label: "Akar banir • akar jangkang • pneumatofor" },
      { id: "ciri-3", label: "Perubahan tumbuhan mengikut ketinggian" },
    ]},
    { id: "penting", label: "Kepentingan", children: [
      { id: "penting-1", label: "Tadahan hujan • keseimbangan ekosistem" },
      { id: "penting-2", label: "Bahan mentah • perubatan • habitat" },
    ]},
    { id: "manusia", label: "Kesan Kegiatan Manusia", children: [
      { id: "manusia-1", label: "Pembalakan • penerokaan hutan" },
      { id: "manusia-2", label: "Hakisan • tanah runtuh • pemanasan" },
      { id: "manusia-3", label: "Pemeliharaan • pemuliharaan" },
    ]},
  ],
};
