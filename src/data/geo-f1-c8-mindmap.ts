import type { MindNode } from "@/components/MindMap";

export const geoF1C8MindMap: MindNode = {
  id: "root",
  label: "Penduduk di Malaysia",
  children: [
    {
      id: "c1",
      label: "Saiz & Pertumbuhan Penduduk",
      children: [
        { id: "c1-1", label: "±33 juta (2023)" },
        { id: "c1-2", label: "Kadar pertumbuhan ≈ 1.1% setahun" },
        {
          id: "c1-3",
          label: "Faktor Pertumbuhan",
          children: [
            { id: "c1-3-1", label: "Kadar kelahiran — tambahan semula jadi" },
            { id: "c1-3-2", label: "Kadar kematian — kurang → penduduk naik" },
            { id: "c1-3-3", label: "Migrasi masuk — pendatang luar" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "Komposisi Penduduk",
      children: [
        {
          id: "c2-1",
          label: "Kaum",
          children: [
            { id: "c2-1-1", label: "Bumiputera (Melayu + Peribumi) — majoriti" },
            { id: "c2-1-2", label: "Cina — kedua terbesar" },
            { id: "c2-1-3", label: "India" },
            { id: "c2-1-4", label: "Lain-lain" },
          ],
        },
        {
          id: "c2-2",
          label: "Jantina",
          children: [
            { id: "c2-2-1", label: "Nisbah lelaki : perempuan ≈ 107 : 100" },
          ],
        },
        {
          id: "c2-3",
          label: "Umur",
          children: [
            { id: "c2-3-1", label: "Piramid penduduk — muda / tua / seimbang" },
            { id: "c2-3-2", label: "Malaysia: struktur muda (banyak bawah 30)" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "Taburan Penduduk",
      children: [
        { id: "c3-1", label: "Tidak sekata — lebih tumpat di Barat Semenanjung" },
        {
          id: "c3-2",
          label: "Kawasan Tumpat",
          children: [
            { id: "c3-2-1", label: "Lembah Klang — pusat ekonomi" },
            { id: "c3-2-2", label: "Pulau Pinang — industri & pelancongan" },
            { id: "c3-2-3", label: "Johor Bahru — berhampiran Singapura" },
          ],
        },
        {
          id: "c3-3",
          label: "Kawasan Jarang",
          children: [
            { id: "c3-3-1", label: "Pedalaman Sabah & Sarawak" },
            { id: "c3-3-2", label: "Tanah tinggi Cameron" },
          ],
        },
      ],
    },
    {
      id: "c4",
      label: "Faktor Taburan Penduduk",
      children: [
        { id: "c4-1", label: "Fizikal: relief, iklim, sumber air, tanah subur" },
        { id: "c4-2", label: "Manusia: peluang pekerjaan, kemudahan, pengangkutan" },
      ],
    },
    {
      id: "c5",
      label: "Isu Kependudukan",
      children: [
        { id: "c5-1", label: "Kepelbagaian kaum — perpaduan penting" },
        { id: "c5-2", label: "Penduduk tua — cabaran masa depan" },
        { id: "c5-3", label: "Migrasi desa-bandar — tekanan infrastruktur" },
      ],
    },
  ],
};
