import type { MindNode } from "@/components/MindMap";

export const mathF2C1MindMapBM: MindNode = {
  id: "c1",
  label: "Corak dan Jujukan",
  children: [
    {
      id: "c1-1",
      label: "1.1 Corak",
      children: [
        {
          id: "c1-1-1",
          label: "Mengenal Corak Nombor",
          children: [
            { id: "c1-1-1-1", label: "Corak: senarai nombor atau objek mengikut peraturan/reka bentuk" },
            { id: "c1-1-1-2", label: "Tambah: -10, -4, 2, 8, ... -> +6" },
            { id: "c1-1-1-3", label: "Tolak: 17, 7, -3, -13, ... -> -10" },
            { id: "c1-1-1-4", label: "Darab: 2, 6, 18, 54, ... -> x3" },
            { id: "c1-1-1-5", label: "Bahagi: 81, 27, 9, 3, ... -> bahagi 3" },
            { id: "c1-1-1-6", label: "Nombor genap: boleh dibahagi tepat dengan 2" },
            { id: "c1-1-1-7", label: "Nombor ganjil: tidak boleh dibahagi tepat dengan 2" },
          ],
        },
        {
          id: "c1-1-2",
          label: "Segi Tiga Pascal",
          children: [
            { id: "c1-1-2-1", label: "Bermula dengan 1" },
            { id: "c1-1-2-2", label: "Setiap baris bermula dan berakhir dengan 1" },
            { id: "c1-1-2-3", label: "Nombor tengah = hasil tambah dua nombor di atas" },
            { id: "c1-1-2-4", label: "Contoh baris: 1, 4, 6, 4, 1" },
          ],
        },
        {
          id: "c1-1-3",
          label: "Nombor Fibonacci",
          children: [
            { id: "c1-1-3-1", label: "Jujukan: 0, 1, 1, 2, 3, 5, 8, ..." },
            { id: "c1-1-3-2", label: "Sebutan seterusnya = hasil tambah dua sebutan sebelumnya" },
            { id: "c1-1-3-3", label: "Contoh: 3 + 5 = 8" },
          ],
        },
        {
          id: "c1-1-4",
          label: "Fokus Peperiksaan",
          children: [
            { id: "c1-1-4-1", label: "Bandingkan sebutan berturutan sebelum menentukan peraturan" },
            { id: "c1-1-4-2", label: "Untuk objek, perhatikan susunan" },
            { id: "c1-1-4-3", label: "Untuk Fibonacci, guna dua sebutan sebelumnya" },
          ],
        },
      ],
    },
    {
      id: "c1-2",
      label: "1.2 Jujukan",
      children: [
        {
          id: "c1-2-1",
          label: "Jujukan",
          children: [
            { id: "c1-2-1-1", label: "Set nombor atau objek yang disusun mengikut corak" },
            { id: "c1-2-1-2", label: "Senarai ialah jujukan hanya jika peraturan berterusan" },
            { id: "c1-2-1-3", label: "Contoh: -10, -6, -2, 2, 6, ... -> +4" },
          ],
        },
        {
          id: "c1-2-2",
          label: "Corak Suatu Jujukan",
          children: [
            { id: "c1-2-2-1", label: "Lengkapkan sebutan hilang dengan peraturan yang sama" },
            { id: "c1-2-2-2", label: "7, 13, 19, 25, 31, ... -> +6" },
            { id: "c1-2-2-3", label: "88, 76, 64, 52, 40, ... -> -12" },
            { id: "c1-2-2-4", label: "1, 0.3, 0.09, 0.027, ... -> x0.3" },
          ],
        },
        {
          id: "c1-2-3",
          label: "Jujukan Nombor",
          children: [
            { id: "c1-2-3-1", label: "Boleh melibatkan nombor bulat, negatif, perpuluhan atau pecahan" },
            { id: "c1-2-3-2", label: "Peraturan diberi: tambah 7 -> 42, 49, 56, 63, ..." },
            { id: "c1-2-3-3", label: "Peraturan diberi: bahagi 2 -> 96, 48, 24, 12, ..." },
            { id: "c1-2-3-4", label: "Nombor segi tiga: 1, 3, 6, 10, 15, ..." },
          ],
        },
      ],
    },
    {
      id: "c1-3",
      label: "1.3 Corak dan Jujukan",
      children: [
        {
          id: "c1-3-1",
          label: "Nombor, Perkataan dan Ungkapan Algebra",
          children: [
            { id: "c1-3-1-1", label: "Nombor: tunjuk operasi, contoh +8" },
            { id: "c1-3-1-2", label: "Perkataan: tambah 8 kepada nombor sebelumnya" },
            { id: "c1-3-1-3", label: "Algebra: 1 + 8n, dengan n = 0, 1, 2, ..." },
            { id: "c1-3-1-4", label: "Uji algebra dengan menggantikan n" },
          ],
        },
        {
          id: "c1-3-2",
          label: "Sebutan Suatu Jujukan",
          children: [
            { id: "c1-3-2-1", label: "Tn = sebutan ke-n" },
            { id: "c1-3-2-2", label: "T1 sebutan pertama, T2 sebutan kedua, T3 sebutan ketiga" },
            { id: "c1-3-2-3", label: "2, 10, 18, 26, 34 -> T5 = 34" },
            { id: "c1-3-2-4", label: "65, 60, 55, 50, 45, 40 -> 40 ialah T6" },
          ],
        },
        {
          id: "c1-3-3",
          label: "Menyelesaikan Masalah",
          children: [
            { id: "c1-3-3-1", label: "Fahami masalah" },
            { id: "c1-3-3-2", label: "Rancang strategi" },
            { id: "c1-3-3-3", label: "Laksanakan strategi" },
            { id: "c1-3-3-4", label: "Tulis kesimpulan dengan unit yang betul" },
            { id: "c1-3-3-5", label: "Pemberi makanan ikan: 24/4 = 6 jam; T3 = 7:35 p.m." },
          ],
        },
      ],
    },
    {
      id: "c1-4",
      label: "Ringkasan Bab",
      children: [
        { id: "c1-4-1", label: "Corak: nombor/objek disusun mengikut peraturan/reka bentuk" },
        { id: "c1-4-2", label: "Jujukan: nombor/objek yang mengikut corak" },
        { id: "c1-4-3", label: "Pascal: tambah dua nombor di atas" },
        { id: "c1-4-4", label: "Fibonacci: tambah dua sebutan sebelumnya" },
        { id: "c1-4-5", label: "Tn menandakan kedudukan sebutan" },
      ],
    },
  ],
};
