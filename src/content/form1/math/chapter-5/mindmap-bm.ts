import type { MindNode } from "@/components/MindMap";

export const mathF1C5MindMapBM: MindNode = {
  id: "math-c5-bm-root",
  label: "Ungkapan Algebra",
  children: [
    {
      id: "math-c5-bm-1",
      label: "Pemboleh Ubah dan Pemalar",
      children: [
        { id: "math-c5-bm-1-1", label: "Pemboleh ubah: simbol (x, y, a, b) mewakili nilai yang berubah" },
        { id: "math-c5-bm-1-2", label: "Pemalar: nilai tetap (3, -5, π)" },
        { id: "math-c5-bm-1-3", label: "Pekali: nombor di hadapan pemboleh ubah" },
      ],
    },
    {
      id: "math-c5-bm-2",
      label: "Sebutan Algebra",
      children: [
        { id: "math-c5-bm-2-1", label: "Monomial: satu sebutan (3x)" },
        { id: "math-c5-bm-2-2", label: "Binomial: dua sebutan (2x + 5)" },
        { id: "math-c5-bm-2-3", label: "Trinomial: tiga sebutan (x² + 3x − 2)" },
        { id: "math-c5-bm-2-4", label: "Sebutan serupa: pemboleh ubah & kuasa sama" },
      ],
    },
    {
      id: "math-c5-bm-3",
      label: "Operasi Algebra",
      children: [
        {
          id: "math-c5-bm-3-1",
          label: "Tambah & Tolak",
          children: [
            { id: "math-c5-bm-3-1-1", label: "Hanya sebutan serupa boleh digabung" },
            { id: "math-c5-bm-3-1-2", label: "Contoh: 3x + 5x = 8x" },
          ],
        },
        {
          id: "math-c5-bm-3-2",
          label: "Darab",
          children: [
            { id: "math-c5-bm-3-2-1", label: "Darab pemalar dengan sebutan" },
            { id: "math-c5-bm-3-2-2", label: "Contoh: 2(3x + 4) = 6x + 8" },
          ],
        },
        {
          id: "math-c5-bm-3-3",
          label: "Bahagi",
          children: [
            { id: "math-c5-bm-3-3-1", label: "Bahagi sebutan dengan pemalar" },
            { id: "math-c5-bm-3-3-2", label: "Contoh: 6x ÷ 3 = 2x" },
          ],
        },
      ],
    },
    {
      id: "math-c5-bm-4",
      label: "Nilai Ungkapan Algebra",
      children: [
        { id: "math-c5-bm-4-1", label: "Ganti nilai pemboleh ubah yang diberi" },
        { id: "math-c5-bm-4-2", label: "Contoh: jika x = 3, maka 2x + 1 = 7" },
      ],
    },
    {
      id: "math-c5-bm-5",
      label: "Tips Peperiksaan",
      children: [
        { id: "math-c5-bm-5-1", label: "Kenal pasti sebutan serupa sebelum operasi" },
        { id: "math-c5-bm-5-2", label: "Berhati-hati dengan tanda apabila mengembangkan kurungan" },
        { id: "math-c5-bm-5-3", label: "Ganti nilai dengan teliti — semak tanda negatif" },
      ],
    },
  ],
};
