import type { MindNode } from "@/components/MindMap";

export const mathF1C7MindMapBM: MindNode = {
  id: "math-c7-bm-root",
  label: "Ketaksamaan Linear",
  children: [
    {
      id: "math-c7-bm-1",
      label: "Simbol Ketaksamaan",
      children: [
        { id: "math-c7-bm-1-1", label: "< : kurang daripada" },
        { id: "math-c7-bm-1-2", label: "> : lebih daripada" },
        { id: "math-c7-bm-1-3", label: "≤ : kurang daripada atau sama dengan" },
        { id: "math-c7-bm-1-4", label: "≥ : lebih daripada atau sama dengan" },
      ],
    },
    {
      id: "math-c7-bm-2",
      label: "Hubungan Antara Integer",
      children: [
        { id: "math-c7-bm-2-1", label: "Garis nombor untuk mewakili set penyelesaian" },
        { id: "math-c7-bm-2-2", label: "Bulatan tertutup ● untuk ≤ atau ≥" },
        { id: "math-c7-bm-2-3", label: "Bulatan terbuka ○ untuk < atau >" },
      ],
    },
    {
      id: "math-c7-bm-3",
      label: "Operasi pada Ketaksamaan",
      children: [
        { id: "math-c7-bm-3-1", label: "Tambah/Tolak: simbol tidak berubah" },
        { id: "math-c7-bm-3-2", label: "Darab/Bahagi positif: simbol tidak berubah" },
        { id: "math-c7-bm-3-3", label: "⚠ Darab/Bahagi negatif: simbol BERBALIK" },
        { id: "math-c7-bm-3-4", label: "Contoh: -2x > 6 → x < -3" },
      ],
    },
    {
      id: "math-c7-bm-4",
      label: "Penyelesaian Ketaksamaan Linear",
      children: [
        { id: "math-c7-bm-4-1", label: "Selesaikan seperti persamaan" },
        { id: "math-c7-bm-4-2", label: "Ingat peraturan balik simbol (÷/× negatif)" },
        { id: "math-c7-bm-4-3", label: "Tulis set penyelesaian atau gambar garis nombor" },
      ],
    },
    {
      id: "math-c7-bm-5",
      label: "Tips Peperiksaan",
      children: [
        { id: "math-c7-bm-5-1", label: "Kesalahan biasa: lupa balik simbol bila ÷ negatif" },
        { id: "math-c7-bm-5-2", label: "Semak jawapan dengan mengganti nilai ke dalam ketaksamaan asal" },
        { id: "math-c7-bm-5-3", label: "Lukis garis nombor untuk mengesahkan julat" },
      ],
    },
  ],
};
