import type { MindNode } from "@/components/MindMap";

export const mathF2C3MindMapBM: MindNode = {
  id: "math-c3-bm-root",
  label: "Formula Algebra",
  children: [
    {
      id: "math-c3-bm-1",
      label: "Menulis Formula",
      children: [
        { id: "math-c3-bm-1-1", label: "Formula: hubungan antara pembolehubah" },
        { id: "math-c3-bm-1-2", label: "Subjek formula: pembolehubah bersendirian di kiri '='" },
        { id: "math-c3-bm-1-3", label: "Contoh: s = vt (jarak = kelajuan x masa)" },
        { id: "math-c3-bm-1-4", label: "Kenal pasti hubungan: tambah, tolak, darab, bahagi" },
      ],
    },
    {
      id: "math-c3-bm-2",
      label: "Mengubah Subjek: Operasi Asas",
      children: [
        { id: "math-c3-bm-2-1", label: "Operasi songsang tambah ialah tolak" },
        { id: "math-c3-bm-2-2", label: "Operasi songsang darab ialah bahagi" },
        { id: "math-c3-bm-2-3", label: "Lakukan pada kedua-dua belah formula" },
        { id: "math-c3-bm-2-4", label: "Contoh: v = u + at -> a = (v - u) / t" },
      ],
    },
    {
      id: "math-c3-bm-3",
      label: "Mengubah Subjek: Kuasa & Punca Kuasa",
      children: [
        { id: "math-c3-bm-3-1", label: "Operasi songsang kuasa dua ialah punca kuasa dua" },
        { id: "math-c3-bm-3-2", label: "Operasi songsang punca kuasa dua ialah kuasa duakan" },
        { id: "math-c3-bm-3-3", label: "Contoh: A = πr² -> r = √(A / π)" },
        { id: "math-c3-bm-3-4", label: "Ambil nilai positif untuk kuantiti fizikal (panjang, jejari)" },
        { id: "math-c3-bm-3-5", label: "Pertimbangkan ± untuk konteks algebra umum" },
      ],
    },
    {
      id: "math-c3-bm-4",
      label: "Menentukan Nilai Pembolehubah",
      children: [
        { id: "math-c3-bm-4-1", label: "Gantikan nilai diketahui ke dalam formula" },
        { id: "math-c3-bm-4-2", label: "Ubah subjek dahulu jika pembolehubah dicari bukan subjek" },
        { id: "math-c3-bm-4-3", label: "Contoh: v = u + at, u=5, a=2, t=4 -> v = 13" },
        { id: "math-c3-bm-4-4", label: "Contoh: A = πr², A=154, π=22/7 -> r = 7 cm" },
      ],
    },
    {
      id: "math-c3-bm-5",
      label: "Ringkasan",
      children: [
        { id: "math-c3-bm-5-1", label: "v = u + at -> a = (v - u) / t" },
        { id: "math-c3-bm-5-2", label: "P = 2(l + b) -> b = (P - 2l) / 2" },
        { id: "math-c3-bm-5-3", label: "A = πr² -> r = √(A / π)" },
        { id: "math-c3-bm-5-4", label: "c² = a² + b² -> a = √(c² - b²)" },
      ],
    },
    {
      id: "math-c3-bm-6",
      label: "Tips Peperiksaan",
      children: [
        { id: "math-c3-bm-6-1", label: "Tulis setiap langkah operasi songsang dengan jelas" },
        { id: "math-c3-bm-6-2", label: "Semak tanda apabila memindahkan sebutan" },
        { id: "math-c3-bm-6-3", label: "Gunakan kurungan semasa menggantikan nilai negatif/pecahan" },
      ],
    },
  ],
};
