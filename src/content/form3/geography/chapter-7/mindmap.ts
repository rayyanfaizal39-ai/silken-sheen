import type { MindNode } from "@/components/MindMap";

export const geoF3C7MindMap: MindNode = {
  id: "root",
  label: "Kegiatan Ekonomi di Malaysia",
  children: [
    { id: "sektor", label: "Jenis Kegiatan Ekonomi", children: [
      { id: "sektor-1", label: "Primer • pertanian • perikanan • perlombongan" },
      { id: "sektor-2", label: "Sekunder • perkilangan • pembinaan" },
      { id: "sektor-3", label: "Tertier • perkhidmatan • pelancongan • pengangkutan" },
    ]},
    { id: "taburan", label: "Taburan Kegiatan", children: [
      { id: "taburan-1", label: "Pertanian • kawasan sesuai tanih dan iklim" },
      { id: "taburan-2", label: "Perindustrian • bandar • pelabuhan • jaringan pengangkutan" },
      { id: "taburan-3", label: "Pelancongan • tarikan semula jadi dan budaya" },
    ]},
    { id: "faktor", label: "Faktor Mempengaruhi", children: [
      { id: "faktor-1", label: "Fizikal • bentuk muka bumi • tanih • iklim" },
      { id: "faktor-2", label: "Manusia • modal • teknologi • buruh • pasaran" },
      { id: "faktor-3", label: "Infrastruktur • dasar kerajaan" },
    ]},
    { id: "penting", label: "Kepentingan", children: [
      { id: "penting-1", label: "Peluang pekerjaan • pendapatan" },
      { id: "penting-2", label: "Kemajuan infrastruktur • urbanisasi" },
      { id: "penting-3", label: "Eksport • pertumbuhan ekonomi negara" },
    ]},
  ],
};
