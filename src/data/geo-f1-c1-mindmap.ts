import type { MindNode } from "@/components/MindMap";

export const geoF1C1MindMap: MindNode = {
  id: "root",
  label: "Arah",
  children: [
    {
      id: "c1",
      label: "1.1 Arah Mata Angin",
      children: [
        {
          id: "c1-1",
          label: "Mata Angin Utama (4)",
          children: [
            { id: "c1-1-1", label: "Utara (U) — atas peta" },
            { id: "c1-1-2", label: "Selatan (S) — bawah" },
            { id: "c1-1-3", label: "Timur (T) — matahari terbit" },
            { id: "c1-1-4", label: "Barat (B) — matahari terbenam" },
          ],
        },
        {
          id: "c1-2",
          label: "Mata Angin Perantaraan (4)",
          children: [
            { id: "c1-2-1", label: "Timur Laut (TL)" },
            { id: "c1-2-2", label: "Tenggara (TG)" },
            { id: "c1-2-3", label: "Barat Daya (BD)" },
            { id: "c1-2-4", label: "Barat Laut (BL)" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "1.2 Kaedah Semula Jadi",
      children: [
        {
          id: "c2-1",
          label: "Menggunakan Matahari",
          children: [
            { id: "c2-1-1", label: "Hadap matahari terbit → Timur" },
            { id: "c2-1-2", label: "Tangan kiri → Utara" },
            { id: "c2-1-3", label: "Tangan kanan → Selatan" },
          ],
        },
        {
          id: "c2-2",
          label: "Menggunakan Buruj (malam)",
          children: [
            { id: "c2-2-1", label: "Buruj Biduk → arah Utara" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "1.3 Kompas Magnetik",
      children: [
        {
          id: "c3-1",
          label: "Komponen Kompas",
          children: [
            { id: "c3-1-1", label: "Jarum magnetik" },
            { id: "c3-1-2", label: "Muka dial" },
            { id: "c3-1-3", label: "Perumah pelindung" },
          ],
        },
        {
          id: "c3-2",
          label: "Prinsip",
          children: [
            { id: "c3-2-1", label: "Jarum sentiasa menunjuk Utara" },
            { id: "c3-2-2", label: "Disebabkan Kutub Utara Magnet Bumi" },
          ],
        },
        {
          id: "c3-3",
          label: "Gangguan",
          children: [
            { id: "c3-3-1", label: "Besi dan logam berhampiran" },
            { id: "c3-3-2", label: "Tiang lampu, pagar, jam tangan" },
          ],
        },
      ],
    },
    {
      id: "c4",
      label: "1.4 Bearing Sudutan",
      children: [
        {
          id: "c4-1",
          label: "Definisi",
          children: [
            { id: "c4-1-1", label: "Diukur dari Utara (0°)" },
            { id: "c4-1-2", label: "Mengikut arah pusingan jam" },
            { id: "c4-1-3", label: "Unit: darjah (°)" },
          ],
        },
        {
          id: "c4-2",
          label: "Langkah Pengukuran",
          children: [
            { id: "c4-2-1", label: "1. Sambung dua titik" },
            { id: "c4-2-2", label: "2. Titik rujukan (kata kunci: 'dari')" },
            { id: "c4-2-3", label: "3. Bina simbol mata angin di titik rujukan" },
            { id: "c4-2-4", label: "4. Letak pusat jangka sudut" },
            { id: "c4-2-5", label: "5. Baca skala LUAR (ikut jam)" },
          ],
        },
        {
          id: "c4-3",
          label: "Bearing Melebihi 180°",
          children: [
            { id: "c4-3-1", label: "Ukur sudut baki dari Selatan" },
            { id: "c4-3-2", label: "Tambah 180°" },
            { id: "c4-3-3", label: "Contoh: 121° + 180° = 301°" },
          ],
        },
      ],
    },
  ],
};
