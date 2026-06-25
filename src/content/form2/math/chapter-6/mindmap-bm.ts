import type { MindNode } from "@/components/MindMap";

export const mathF2C6MindMapBM: MindNode = {
  id: "root",
  label: "Bentuk Geometri Tiga Matra",
  children: [
    {
      id: "c6-bm-sifat",
      label: "6.1 Sifat Geometri",
      children: [
        {
          id: "c6-bm-sifat-komponen",
          label: "Komponen",
          children: [
            { id: "c6-bm-sifat-komponen-1", label: "Muka (face)" },
            { id: "c6-bm-sifat-komponen-2", label: "Sisi/tepi (edge)" },
            { id: "c6-bm-sifat-komponen-3", label: "Bucu (vertex)" },
          ],
        },
        {
          id: "c6-bm-sifat-prisma",
          label: "Prisma",
          children: [
            { id: "c6-bm-sifat-prisma-1", label: "Dua tapak selari dan sama bentuk/saiz" },
            { id: "c6-bm-sifat-prisma-2", label: "Muka sisi segi empat tepat" },
            { id: "c6-bm-sifat-prisma-3", label: "Dinamakan mengikut bentuk tapak (segi tiga, segi empat, dll.)" },
          ],
        },
        {
          id: "c6-bm-sifat-piramid",
          label: "Piramid",
          children: [
            { id: "c6-bm-sifat-piramid-1", label: "Satu tapak" },
            { id: "c6-bm-sifat-piramid-2", label: "Muka sisi segi tiga bertemu pada apeks" },
            { id: "c6-bm-sifat-piramid-3", label: "Dinamakan mengikut bentuk tapak" },
          ],
        },
        {
          id: "c6-bm-sifat-silinder",
          label: "Silinder",
          children: [
            { id: "c6-bm-sifat-silinder-1", label: "Dua tapak bulatan selari dan sama saiz" },
            { id: "c6-bm-sifat-silinder-2", label: "Satu muka melengkung" },
          ],
        },
        {
          id: "c6-bm-sifat-kon",
          label: "Kon",
          children: [
            { id: "c6-bm-sifat-kon-1", label: "Satu tapak bulatan" },
            { id: "c6-bm-sifat-kon-2", label: "Muka melengkung bertemu pada satu apeks" },
          ],
        },
        {
          id: "c6-bm-sifat-sfera",
          label: "Sfera",
          children: [
            { id: "c6-bm-sifat-sfera-1", label: "Tiada tapak, sisi atau bucu" },
            { id: "c6-bm-sifat-sfera-2", label: "Semua titik permukaan sama jarak dari pusat" },
          ],
        },
      ],
    },
    {
      id: "c6-bm-bentangan",
      label: "6.2 Bentangan",
      children: [
        { id: "c6-bm-bentangan-1", label: "Bentuk dua matra yang boleh dilipat menjadi bentuk tiga matra" },
        { id: "c6-bm-bentangan-2", label: "Kubus: 6 segi empat sama" },
        { id: "c6-bm-bentangan-3", label: "Kuboid: 6 segi empat tepat (3 pasang)" },
        { id: "c6-bm-bentangan-4", label: "Prisma segi tiga: 2 segi tiga + 3 segi empat tepat" },
        { id: "c6-bm-bentangan-5", label: "Piramid segi empat: 1 segi empat + 4 segi tiga" },
        { id: "c6-bm-bentangan-6", label: "Silinder: 2 bulatan + 1 segi empat tepat" },
        { id: "c6-bm-bentangan-7", label: "Kon: 1 bulatan + 1 sektor bulatan" },
      ],
    },
    {
      id: "c6-bm-luas",
      label: "6.3 Luas Permukaan",
      children: [
        { id: "c6-bm-luas-kubus", label: "Kubus: 6s²" },
        { id: "c6-bm-luas-kuboid", label: "Kuboid: 2(lw + lh + wh)" },
        { id: "c6-bm-luas-prisma", label: "Prisma: (2 x Luas Tapak) + (Perimeter Tapak x Tinggi)" },
        { id: "c6-bm-luas-silinder", label: "Silinder: 2πr(r + h)" },
        { id: "c6-bm-luas-piramid", label: "Piramid: Luas Tapak + Jumlah Luas Muka Sisi" },
        { id: "c6-bm-luas-kon", label: "Kon: πr(r + l), l = kecondongan" },
        { id: "c6-bm-luas-sfera", label: "Sfera: 4πr²" },
        { id: "c6-bm-luas-unit", label: "Unit: cm² / m²" },
      ],
    },
    {
      id: "c6-bm-isipadu",
      label: "6.4 Isi Padu",
      children: [
        { id: "c6-bm-isipadu-kubus", label: "Kubus: s³" },
        { id: "c6-bm-isipadu-kuboid", label: "Kuboid: l x w x h" },
        { id: "c6-bm-isipadu-prisma", label: "Prisma: Luas Tapak x Tinggi" },
        { id: "c6-bm-isipadu-silinder", label: "Silinder: πr²h" },
        { id: "c6-bm-isipadu-piramid", label: "Piramid: 1/3 x Luas Tapak x Tinggi" },
        { id: "c6-bm-isipadu-kon", label: "Kon: 1/3 x πr²h" },
        { id: "c6-bm-isipadu-sfera", label: "Sfera: 4/3 x πr³" },
        { id: "c6-bm-isipadu-gabungan", label: "Gabungan bentuk: kira setiap bahagian, tambah/tolak" },
        { id: "c6-bm-isipadu-unit", label: "Unit: cm³ / m³" },
      ],
    },
    {
      id: "c6-bm-ringkasan",
      label: "Ringkasan",
      children: [
        { id: "c6-bm-ringkasan-1", label: "Kenal pasti bentuk asas sebelum kira luas/isi padu" },
        { id: "c6-bm-ringkasan-2", label: "Guna π = 3.142 atau 22/7 mengikut kesesuaian" },
        { id: "c6-bm-ringkasan-3", label: "Semak unit: persegi untuk luas, padu untuk isi padu" },
        { id: "c6-bm-ringkasan-4", label: "Jangan keliru kecondongan (l) dengan tinggi tegak (h)" },
      ],
    },
  ],
};
