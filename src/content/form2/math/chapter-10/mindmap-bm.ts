import type { MindNode } from "@/components/MindMap";

export const mathF2C10MindMapBM: MindNode = {
  id: "math-c10-bm-root",
  label: "Kecerunan dan Luas di bawah Graf",
  children: [
    {
      id: "math-c10-bm-1",
      label: "Kecerunan Garis Lurus",
      children: [
        { id: "math-c10-bm-1-1", label: "Definisi: perubahan menegak / perubahan mengufuk" },
        { id: "math-c10-bm-1-2", label: "Formula: m = (y2 - y1) / (x2 - x1)" },
        {
          id: "math-c10-bm-1-3",
          label: "Jenis Kecerunan",
          children: [
            { id: "math-c10-bm-1-3-1", label: "Naik kiri ke kanan → positif" },
            { id: "math-c10-bm-1-3-2", label: "Menurun kiri ke kanan → negatif" },
            { id: "math-c10-bm-1-3-3", label: "Mengufuk → sifar" },
            { id: "math-c10-bm-1-3-4", label: "Mencancang → tak tertakrif" },
          ],
        },
      ],
    },
    {
      id: "math-c10-bm-2",
      label: "Graf Jarak-Masa",
      children: [
        { id: "math-c10-bm-2-1", label: "Paksi-y: jarak; Paksi-x: masa" },
        { id: "math-c10-bm-2-2", label: "Kecerunan = laju" },
        {
          id: "math-c10-bm-2-3",
          label: "Ciri Graf",
          children: [
            { id: "math-c10-bm-2-3-1", label: "Garis naik → laju seragam" },
            { id: "math-c10-bm-2-3-2", label: "Garis mengufuk → objek berhenti" },
            { id: "math-c10-bm-2-3-3", label: "Garis melengkung → laju berubah" },
          ],
        },
        { id: "math-c10-bm-2-4", label: "Contoh: Laju = jarak / masa = 120 km / 2 j = 60 km/j" },
      ],
    },
    {
      id: "math-c10-bm-3",
      label: "Graf Laju-Masa",
      children: [
        { id: "math-c10-bm-3-1", label: "Paksi-y: laju; Paksi-x: masa" },
        { id: "math-c10-bm-3-2", label: "Kecerunan = pecutan" },
        {
          id: "math-c10-bm-3-3",
          label: "Ciri Graf",
          children: [
            { id: "math-c10-bm-3-3-1", label: "Garis naik → pecutan positif" },
            { id: "math-c10-bm-3-3-2", label: "Garis mengufuk → pecutan sifar (laju seragam)" },
            { id: "math-c10-bm-3-3-3", label: "Garis menurun → nyahpecutan (pecutan negatif)" },
          ],
        },
        { id: "math-c10-bm-3-4", label: "Contoh: a = (25 - 5) / 4 = 5 m/s²" },
      ],
    },
    {
      id: "math-c10-bm-4",
      label: "Luas di bawah Graf Laju-Masa",
      children: [
        { id: "math-c10-bm-4-1", label: "Luas = jarak yang dilalui" },
        {
          id: "math-c10-bm-4-2",
          label: "Formula Luas",
          children: [
            { id: "math-c10-bm-4-2-1", label: "Segi tiga: 1/2 x tapak x tinggi" },
            { id: "math-c10-bm-4-2-2", label: "Segi empat tepat: panjang x lebar" },
            { id: "math-c10-bm-4-2-3", label: "Trapezium: 1/2 x (a + b) x h" },
          ],
        },
        { id: "math-c10-bm-4-3", label: "Pecahkan graf kompleks kepada bentuk asas" },
        { id: "math-c10-bm-4-4", label: "Contoh: Jarak = 1/2 x 10 x 20 = 100 m" },
      ],
    },
    {
      id: "math-c10-bm-5",
      label: "Kesilapan Lazim",
      children: [
        { id: "math-c10-bm-5-1", label: "Terbalik formula kecerunan" },
        { id: "math-c10-bm-5-2", label: "Keliru paksi graf jarak-masa vs laju-masa" },
        { id: "math-c10-bm-5-3", label: "Lupa tanda negatif untuk nyahpecutan" },
        { id: "math-c10-bm-5-4", label: "Salah guna formula luas (segi tiga vs trapezium)" },
      ],
    },
    {
      id: "math-c10-bm-6",
      label: "Ringkasan",
      children: [
        { id: "math-c10-bm-6-1", label: "Kecerunan jarak-masa = laju" },
        { id: "math-c10-bm-6-2", label: "Kecerunan laju-masa = pecutan" },
        { id: "math-c10-bm-6-3", label: "Luas bawah graf laju-masa = jarak" },
        { id: "math-c10-bm-6-4", label: "Semak unit dan tanda sebelum menjawab" },
      ],
    },
  ],
};
