import type { MindNode } from "@/components/MindMap";

export const zamanAirBatuMindMap: MindNode = {
  id: "root",
  label: "Zaman Air Batu",
  children: [
    {
      id: "b1",
      label: "Bidang Ilmu Utama",
      children: [
        { id: "b1-1", label: "Geologi (Sejarah bumi)" },
        { id: "b1-2", label: "Paleontologi (Fosil & organisma)" },
      ],
    },
    {
      id: "b2",
      label: "Tahap Zaman Air Batu",
      children: [
        { id: "b2-1", label: "Miosen (23–5 juta tahun)" },
        { id: "b2-2", label: "Pliosen (5–2.5 juta tahun)" },
        { id: "b2-3", label: "Pleistosen (2.5 juta – 11,700 tahun)" },
        { id: "b2-4", label: "Holosen (11,700 tahun – Kini)" },
      ],
    },
    {
      id: "b3",
      label: "Ciri-ciri Akhir Zaman",
      children: [
        {
          id: "b3-1",
          label: "Kehidupan Manusia",
          children: [
            { id: "b3-1-1", label: "Hidup secara nomad" },
            { id: "b3-1-2", label: "Memburu binatang" },
            { id: "b3-1-3", label: "Tinggal di tanah pamah" },
          ],
        },
        {
          id: "b3-2",
          label: "Binatang",
          children: [
            { id: "b3-2-1", label: "Mamot" },
            { id: "b3-2-2", label: "Sloth" },
            { id: "b3-2-3", label: "Bison" },
            { id: "b3-2-4", label: "Harimau bertaring panjang" },
          ],
        },
        {
          id: "b3-3",
          label: "Tumbuhan",
          children: [
            { id: "b3-3-1", label: "Lumut" },
            { id: "b3-3-2", label: "Tumbuhan renek" },
          ],
        },
        {
          id: "b3-4",
          label: "Fizikal Bumi",
          children: [
            { id: "b3-4-1", label: "Suhu dunia terlalu sejuk" },
            { id: "b3-4-2", label: "Permukaan dilitupi ais/salji" },
            { id: "b3-4-3", label: "Paras air laut rendah (beku)" },
          ],
        },
      ],
    },
    {
      id: "b4",
      label: "Geografi Dunia",
      children: [
        {
          id: "b4-1",
          label: "Benua",
          children: [
            { id: "b4-1-1", label: "Asia" },
            { id: "b4-1-2", label: "Afrika" },
            { id: "b4-1-3", label: "Eropah" },
            { id: "b4-1-4", label: "Amerika Utara/Selatan" },
            { id: "b4-1-5", label: "Antartika" },
            { id: "b4-1-6", label: "Oceania" },
          ],
        },
        {
          id: "b4-2",
          label: "Lautan",
          children: [
            { id: "b4-2-1", label: "Pasifik" },
            { id: "b4-2-2", label: "Atlantik" },
            { id: "b4-2-3", label: "Hindi" },
            { id: "b4-2-4", label: "Selatan" },
            { id: "b4-2-5", label: "Arktik" },
          ],
        },
      ],
    },
    {
      id: "b5",
      label: "Perubahan & Kesan Akhir",
      children: [
        {
          id: "b5-1",
          label: "Proses Glasiar",
          children: [
            { id: "b5-1-1", label: "Peningkatan suhu bumi" },
            { id: "b5-1-2", label: "Pencairan ais (Glasiar)" },
            { id: "b5-1-3", label: "Kenaikan paras laut (100m)" },
          ],
        },
        {
          id: "b5-2",
          label: "Kesan Fizikal",
          children: [
            { id: "b5-2-1", label: "Pembentukan tasik air tawar" },
            { id: "b5-2-2", label: "Pembentukan sungai" },
            { id: "b5-2-3", label: "Kepupusan binatang besar" },
          ],
        },
        {
          id: "b5-3",
          label: "Pentas Sunda",
          children: [
            { id: "b5-3-1", label: "Daratan luas Asia Tenggara" },
            { id: "b5-3-2", label: "Malaysia–Singapura–Borneo–Indonesia bersatu" },
            { id: "b5-3-3", label: "Tenggelam akibat kenaikan laut" },
            { id: "b5-3-4", label: "Migrasi manusia & haiwan" },
          ],
        },
      ],
    },
  ],
};
