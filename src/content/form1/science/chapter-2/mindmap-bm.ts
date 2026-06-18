import type { MindNode } from "@/components/MindMap";

export const scienceF1C2MindMapBM: MindNode = {
  id: "science-c2-bm-root",
  label: "Sel sebagai Unit Asas Hidupan",
  children: [
    {
      id: "science-c2-bm-1",
      label: "Mikroskop",
      children: [
        { id: "science-c2-bm-1-1", label: "Fungsi: Membesarkan objek seni" },
        {
          id: "science-c2-bm-1-2",
          label: "Bahagian Utama",
          children: [
            { id: "science-c2-bm-1-2-1", label: "Kanta mata: Membesarkan imej spesimen" },
            { id: "science-c2-bm-1-2-2", label: "Tombol fokus kasar: Melaraskan fokus awal" },
            { id: "science-c2-bm-1-2-3", label: "Tombol fokus halus: Melaraskan fokus tajam" },
            {
              id: "science-c2-bm-1-2-4",
              label: "Kanta objek: Membesarkan spesimen (4x, 10x, 40x)",
            },
            { id: "science-c2-bm-1-2-5", label: "Pentas & Klip: Tempat letak slaid" },
            { id: "science-c2-bm-1-2-6", label: "Diafragma & Cermin: Kawal dan pantul cahaya" },
          ],
        },
      ],
    },
    {
      id: "science-c2-bm-2",
      label: "Struktur dan Fungsi Sel",
      children: [
        { id: "science-c2-bm-2-1", label: "Nukleus: Mengawal aktiviti sel & mengandungi DNA" },
        { id: "science-c2-bm-2-2", label: "Sitoplasma: Tempat tindak balas kimia berlaku" },
        { id: "science-c2-bm-2-3", label: "Membran Sel: Mengawal pergerakan bahan keluar masuk" },
        {
          id: "science-c2-bm-2-4",
          label: "Dinding Sel: Memberi sokongan dan bentuk tetap (Tumbuhan)",
        },
        { id: "science-c2-bm-2-5", label: "Kloroplas: Tempat fotosintesis (Tumbuhan)" },
        { id: "science-c2-bm-2-6", label: "Vakuol: Menyimpan air, nutrien, dan bahan buangan" },
        {
          id: "science-c2-bm-2-7",
          label: "Mitokondria: Tapak penghasilan tenaga (Respirasi sel)",
        },
      ],
    },
    {
      id: "science-c2-bm-3",
      label: "Jenis Organisma",
      children: [
        {
          id: "science-c2-bm-3-1",
          label: "Unisel (Satu Sel)",
          children: [
            { id: "science-c2-bm-3-1-1", label: "Haiwan: Amoeba, Paramecium" },
            { id: "science-c2-bm-3-1-2", label: "Tumbuhan: Euglena, Chlamydomonas, Pleurococcus" },
          ],
        },
        {
          id: "science-c2-bm-3-2",
          label: "Multisel (Banyak Sel)",
          children: [
            { id: "science-c2-bm-3-2-1", label: "Haiwan: Manusia, Mamalia, Hydra" },
            { id: "science-c2-bm-3-2-2", label: "Tumbuhan: Spirogyra, Mukor, Paku pakis" },
          ],
        },
      ],
    },
    {
      id: "science-c2-bm-4",
      label: "Organisasi Sel",
      children: [
        { id: "science-c2-bm-4-1", label: "Urutan: Sel → Tisu → Organ → Sistem → Organisma" },
        {
          id: "science-c2-bm-4-2",
          label: "Contoh Sel Manusia",
          children: [
            { id: "science-c2-bm-4-2-1", label: "Sel darah merah: Angkut oksigen" },
            { id: "science-c2-bm-4-2-2", label: "Sel darah putih: Bunuh bakteria" },
            { id: "science-c2-bm-4-2-3", label: "Sel saraf: Hantar maklumat" },
            { id: "science-c2-bm-4-2-4", label: "Sel sperma/ovum: Pembiakan" },
          ],
        },
      ],
    },
    {
      id: "science-c2-bm-5",
      label: "Proses Kimia",
      children: [
        {
          id: "science-c2-bm-5-1",
          label: "Respirasi Sel",
          children: [
            { id: "science-c2-bm-5-1-1", label: "Berlaku dalam mitokondria" },
            {
              id: "science-c2-bm-5-1-2",
              label: "Glukosa + Oksigen → Tenaga + Karbon Dioksida + Air",
            },
          ],
        },
        {
          id: "science-c2-bm-5-2",
          label: "Fotosintesis",
          children: [
            { id: "science-c2-bm-5-2-1", label: "Berlaku dalam kloroplas" },
            {
              id: "science-c2-bm-5-2-2",
              label: "Air + Karbon Dioksida + Cahaya → Glukosa + Oksigen",
            },
          ],
        },
      ],
    },
  ],
};
