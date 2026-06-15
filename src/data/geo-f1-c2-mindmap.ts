import type { MindNode } from "@/components/MindMap";

export const geoF1C2MindMap: MindNode = {
  id: "root",
  label: "Kedudukan",
  children: [
    {
      id: "c1",
      label: "2.1 Kedudukan Relatif",
      children: [
        {
          id: "c1-1",
          label: "Konsep",
          children: [
            { id: "c1-1-1", label: "Menggunakan titik rujukan" },
            { id: "c1-1-2", label: "Menentukan lokasi objek secara bandingan" },
          ],
        },
        {
          id: "c1-2",
          label: "Arah Rujukan",
          children: [
            { id: "c1-2-1", label: "Hadapan (arah muka)" },
            { id: "c1-2-2", label: "Belakang (arah punggung)" },
            { id: "c1-2-3", label: "Kiri (tangan kiri)" },
            { id: "c1-2-4", label: "Kanan (tangan kanan)" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "2.2 Kedudukan Mutlak",
      children: [
        {
          id: "c2-1",
          label: "Latitud (Garisan Melintang)",
          children: [
            {
              id: "c2-1-1",
              label: "5 Garisan Utama",
              children: [
                { id: "c2-1-1-1", label: "Artik: 66½° U" },
                { id: "c2-1-1-2", label: "Sartan: 23½° U" },
                { id: "c2-1-1-3", label: "Khatulistiwa: 0°" },
                { id: "c2-1-1-4", label: "Jadi: 23½° S" },
                { id: "c2-1-1-5", label: "Antartik: 66½° S" },
              ],
            },
            { id: "c2-1-2", label: "Nilai: 0°–90° Utara / Selatan" },
            { id: "c2-1-3", label: "Khatulistiwa — bahagi Hemisfera U & S" },
          ],
        },
        {
          id: "c2-2",
          label: "Longitud (Garisan Menegak)",
          children: [
            {
              id: "c2-2-1",
              label: "Meridian Pangkal (GMP): 0°",
              children: [
                { id: "c2-2-1-1", label: "Merentasi Greenwich, London" },
              ],
            },
            {
              id: "c2-2-2",
              label: "Garisan Tarikh Antarabangsa (GTA): 180°",
              children: [
                { id: "c2-2-2-1", label: "Dilukis bengkang-bengkok" },
                { id: "c2-2-2-2", label: "Elak daratan/pulau berpecah tarikh" },
              ],
            },
            { id: "c2-2-3", label: "Nilai: 0°–180° Timur / Barat" },
          ],
        },
        {
          id: "c2-3",
          label: "Penulisan Koordinat",
          children: [
            { id: "c2-3-1", label: "Latitud (U/S) dahulu" },
            { id: "c2-3-2", label: "Kemudian Longitud (T/B)" },
            { id: "c2-3-3", label: "Contoh: 30° U, 40° T" },
          ],
        },
      ],
    },
  ],
};
