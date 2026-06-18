import type { MindNode } from "@/components/MindMap";

export const mathF1C12MindMapBM: MindNode = {
  id: "math-c12-bm-root",
  label: "Pengendalian Data",
  children: [
    {
      id: "math-c12-bm-1",
      label: "Jenis Data",
      children: [
        { id: "math-c12-bm-1-1", label: "Data diskret: boleh dikira (cth: bilangan murid)" },
        { id: "math-c12-bm-1-2", label: "Data berterusan: ukuran (cth: tinggi, berat, masa)" },
        { id: "math-c12-bm-1-3", label: "Data kualitatif: bukan nombor (cth: warna, jantina)" },
        { id: "math-c12-bm-1-4", label: "Data kuantitatif: nombor (cth: markah, suhu)" },
      ],
    },
    {
      id: "math-c12-bm-2",
      label: "Pengumpulan Data",
      children: [
        { id: "math-c12-bm-2-1", label: "Tally / Jadual turus" },
        { id: "math-c12-bm-2-2", label: "Soal selidik / soalan kaji selidik" },
        { id: "math-c12-bm-2-3", label: "Pemerhatian langsung" },
      ],
    },
    {
      id: "math-c12-bm-3",
      label: "Ukuran Memusat",
      children: [
        {
          id: "math-c12-bm-3-1",
          label: "Min (Purata)",
          children: [
            { id: "math-c12-bm-3-1-1", label: "Min = Jumlah nilai ÷ Bilangan nilai" },
            { id: "math-c12-bm-3-1-2", label: "Dipengaruhi oleh nilai ekstrem" },
          ],
        },
        {
          id: "math-c12-bm-3-2",
          label: "Mod",
          children: [
            { id: "math-c12-bm-3-2-1", label: "Nilai yang paling kerap muncul" },
            { id: "math-c12-bm-3-2-2", label: "Boleh ada lebih daripada satu mod" },
          ],
        },
        {
          id: "math-c12-bm-3-3",
          label: "Median",
          children: [
            { id: "math-c12-bm-3-3-1", label: "Nilai tengah setelah disusun" },
            { id: "math-c12-bm-3-3-2", label: "Bilangan ganjil: nilai tengah" },
            { id: "math-c12-bm-3-3-3", label: "Bilangan genap: min dua nilai tengah" },
          ],
        },
      ],
    },
    {
      id: "math-c12-bm-4",
      label: "Julat",
      children: [
        { id: "math-c12-bm-4-1", label: "Julat = Nilai terbesar − Nilai terkecil" },
        { id: "math-c12-bm-4-2", label: "Mengukur taburan data" },
        { id: "math-c12-bm-4-3", label: "Nilai ekstrem meningkatkan julat" },
      ],
    },
    {
      id: "math-c12-bm-5",
      label: "Perwakilan Data",
      children: [
        { id: "math-c12-bm-5-1", label: "Graf palang (bar chart)" },
        { id: "math-c12-bm-5-2", label: "Carta pai (pie chart): sudut = nilai/jumlah × 360°" },
        { id: "math-c12-bm-5-3", label: "Piktograf (pictograph)" },
        { id: "math-c12-bm-5-4", label: "Histogram: data berterusan (tiada jurang)" },
        { id: "math-c12-bm-5-5", label: "Poligon kekerapan: sambungkan titik tengah palang" },
      ],
    },
  ],
};
