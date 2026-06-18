import type { MindNode } from "@/components/MindMap";

export const geoF1C12MindMap: MindNode = {
  id: "root",
  label: "Sumber Air",
  children: [
    {
      id: "c1",
      label: "Jenis Sumber Air",
      children: [
        {
          id: "c1-1",
          label: "Air Permukaan",
          children: [
            { id: "c1-1-1", label: "Sungai — sumber utama air terawat" },
            { id: "c1-1-2", label: "Tasik — simpanan air semula jadi" },
            { id: "c1-1-3", label: "Empangan — kawalan & simpanan" },
          ],
        },
        {
          id: "c1-2",
          label: "Air Bawah Tanah",
          children: [
            { id: "c1-2-1", label: "Akuifer — lapisan batuan berliang" },
            { id: "c1-2-2", label: "Perigi — perairan tradisional" },
          ],
        },
        {
          id: "c1-3",
          label: "Air Hujan",
          children: [
            { id: "c1-3-1", label: "Tangkian air hujan" },
            { id: "c1-3-2", label: "Digunakan kawasan pedalaman & pulau" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "Penggunaan Air",
      children: [
        { id: "c2-1", label: "Domestik — minum, memasak, mandi" },
        { id: "c2-2", label: "Pertanian — pengairan padi, perladangan" },
        { id: "c2-3", label: "Industri — proses pengeluaran, pendinginan" },
        { id: "c2-4", label: "Tenaga — hidroelektrik" },
      ],
    },
    {
      id: "c3",
      label: "Kitaran Air (Hidrologi)",
      children: [
        { id: "c3-1", label: "Penyejatan (Evaporation) — air → wap" },
        { id: "c3-2", label: "Transpirasi — tumbuhan lepas wap" },
        { id: "c3-3", label: "Kondensasi — wap → awan" },
        { id: "c3-4", label: "Pemendakan (Precipitation) — hujan, salji" },
        { id: "c3-5", label: "Aliran permukaan & resapan" },
      ],
    },
    {
      id: "c4",
      label: "Pencemaran Air",
      children: [
        { id: "c4-1", label: "Sisa kumbahan — rumah tangga" },
        { id: "c4-2", label: "Sisa industri — logam berat, bahan kimia" },
        { id: "c4-3", label: "Racun pertanian — baja & pestisid" },
        { id: "c4-4", label: "Pembalakan — mendapan lumpur tinggi" },
      ],
    },
    {
      id: "c5",
      label: "Pemeliharaan Sumber Air",
      children: [
        { id: "c5-1", label: "Kawasan tadahan air dilindungi (hutan simpan)" },
        { id: "c5-2", label: "Rawatan air kumbahan sebelum dibuang" },
        { id: "c5-3", label: "Kempen jimat air" },
        { id: "c5-4", label: "Teknologi kitar semula air" },
      ],
    },
  ],
};
