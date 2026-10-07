import type { MindNode } from "@/components/MindMap";

export const geoF3C2MindMap: MindNode = {
  id: "root",
  label: "Carta Pai",
  children: [
    { id: "ciri", label: "Ciri Carta Pai", children: [
      { id: "ciri-1", label: "Bulatan dibahagi kepada sektor" },
      { id: "ciri-2", label: "Jumlah = 100% = 360°" },
      { id: "ciri-3", label: "Tajuk • petunjuk • warna/corak" },
    ]},
    { id: "kira", label: "Pengiraan", children: [
      { id: "kira-1", label: "Peratus = nilai ÷ jumlah × 100" },
      { id: "kira-2", label: "Sudut = nilai ÷ jumlah × 360°" },
    ]},
    { id: "bina", label: "Membina Carta Pai", children: [
      { id: "bina-1", label: "Kira jumlah • peratus • sudut" },
      { id: "bina-2", label: "Jangka lukis • jangka sudut" },
      { id: "bina-3", label: "Lukis sektor • warna • petunjuk" },
    ]},
    { id: "tafsir", label: "Mentafsir Carta Pai", children: [
      { id: "tafsir-1", label: "Komponen terbesar • terkecil" },
      { id: "tafsir-2", label: "Banding nilai • pola utama" },
      { id: "tafsir-3", label: "Isi tersirat • rumusan" },
    ]},
  ],
};
