import type { MindNode } from "@/components/MindMap";

export const mathF1C4MindMapBM: MindNode = {
  id: "math-c4-bm-root",
  label: "Nisbah, Kadar dan Kadaran",
  children: [
    {
      id: "math-c4-bm-1",
      label: "Nisbah",
      children: [
        { id: "math-c4-bm-1-1", label: "Perbandingan dua kuantiti dalam unit yang sama" },
        { id: "math-c4-bm-1-2", label: "Penulisan: a : b atau a/b" },
        { id: "math-c4-bm-1-3", label: "Nisbah setara: darab/bahagi dengan nombor yang sama" },
        { id: "math-c4-bm-1-4", label: "Nisbah paling mudah: FSTB = 1" },
        {
          id: "math-c4-bm-1-5",
          label: "Nisbah Tiga Kuantiti",
          children: [
            { id: "math-c4-bm-1-5-1", label: "a : b : c" },
            { id: "math-c4-bm-1-5-2", label: "Cari bahagian dengan jumlah nisbah" },
          ],
        },
      ],
    },
    {
      id: "math-c4-bm-2",
      label: "Kadar",
      children: [
        { id: "math-c4-bm-2-1", label: "Perbandingan dua kuantiti berbeza unit" },
        { id: "math-c4-bm-2-2", label: "Contoh: km/j, RM/kg, m/s" },
        { id: "math-c4-bm-2-3", label: "Kadar unit: kadar bagi 1 unit" },
        { id: "math-c4-bm-2-4", label: "Formula: Kadar = Kuantiti 1 ÷ Kuantiti 2" },
      ],
    },
    {
      id: "math-c4-bm-3",
      label: "Kadaran",
      children: [
        {
          id: "math-c4-bm-3-1",
          label: "Kadaran Terus",
          children: [
            { id: "math-c4-bm-3-1-1", label: "y naik apabila x naik" },
            { id: "math-c4-bm-3-1-2", label: "y/x = tetap (k)" },
            { id: "math-c4-bm-3-1-3", label: "Graf: garis lurus melalui asalan" },
          ],
        },
        {
          id: "math-c4-bm-3-2",
          label: "Kadaran Songsang",
          children: [
            { id: "math-c4-bm-3-2-1", label: "y turun apabila x naik" },
            { id: "math-c4-bm-3-2-2", label: "xy = tetap (k)" },
            { id: "math-c4-bm-3-2-3", label: "Graf: lengkung hiperbola" },
          ],
        },
      ],
    },
    {
      id: "math-c4-bm-4",
      label: "Tips Peperiksaan",
      children: [
        { id: "math-c4-bm-4-1", label: "Semak unit dalam soalan kadar" },
        { id: "math-c4-bm-4-2", label: "Gunakan kaedah titik silang (cross multiply)" },
        { id: "math-c4-bm-4-3", label: "Bezakan kadaran terus vs songsang" },
      ],
    },
  ],
};
