import type { MindNode } from "@/components/MindMap";

export const geoF1C3MindMap: MindNode = {
  id: "root",
  label: "Peta Lakar",
  children: [
    {
      id: "c1",
      label: "Ciri-ciri Peta Lakar (5)",
      children: [
        { id: "c1-1", label: "Tajuk — huruf besar, atas, digariskan" },
        { id: "c1-2", label: "Bingkai — garisan luar kawasan" },
        { id: "c1-3", label: "Arah Mata Angin — orientasi peta" },
        { id: "c1-4", label: "Simbol — wakili ciri geografi" },
        { id: "c1-5", label: "Petunjuk — maksud setiap simbol" },
      ],
    },
    {
      id: "c2",
      label: "Jenis-jenis Simbol",
      children: [
        {
          id: "c2-1",
          label: "Simbol Titik (lokasi spesifik)",
          children: [
            { id: "c2-1-1", label: "Masjid, kuil, gereja" },
            { id: "c2-1-2", label: "Tanda aras, stesen trigonometri" },
          ],
        },
        {
          id: "c2-2",
          label: "Simbol Garisan (ciri memanjang)",
          children: [
            { id: "c2-2-1", label: "Jalan raya, kereta api" },
            { id: "c2-2-2", label: "Sungai, sempadan" },
          ],
        },
        {
          id: "c2-3",
          label: "Simbol Kawasan (ruang luas)",
          children: [
            { id: "c2-3-1", label: "Sawah padi, hutan" },
            { id: "c2-3-2", label: "Kelapa sawit, getah" },
          ],
        },
        {
          id: "c2-4",
          label: "Simbol Bergambar",
          children: [
            { id: "c2-4-1", label: "Lukisan ringkas menyerupai objek" },
            { id: "c2-4-2", label: "Contoh: pokok kelapa" },
          ],
        },
        {
          id: "c2-5",
          label: "Singkatan Peta",
          children: [
            { id: "c2-5-1", label: "B.P. (Balai Polis)" },
            { id: "c2-5-2", label: "Sek. (Sekolah)" },
            { id: "c2-5-3", label: "Hosp. (Hospital)" },
            { id: "c2-5-4", label: "Kg. (Kampung), Pt. (Parit)" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "Kandungan Peta Lakar",
      children: [
        {
          id: "c3-1",
          label: "Pandang Darat Fizikal (semula jadi)",
          children: [
            { id: "c3-1-1", label: "Bentuk muka bumi (tanah tinggi, pamah)" },
            { id: "c3-1-2", label: "Saliran (sungai, tasik, paya)" },
            { id: "c3-1-3", label: "Tumbuhan semula jadi (hutan, belukar)" },
          ],
        },
        {
          id: "c3-2",
          label: "Pandang Darat Budaya (buatan manusia)",
          children: [
            { id: "c3-2-1", label: "Petempatan (rumah, bandar)" },
            { id: "c3-2-2", label: "Pengangkutan (jalan, kereta api, jambatan)" },
            { id: "c3-2-3", label: "Kegiatan ekonomi (sawah, ladang, kilang)" },
            { id: "c3-2-4", label: "Kemudahan sosial" },
          ],
        },
      ],
    },
    {
      id: "c4",
      label: "Langkah Melukis Peta Lakar",
      children: [
        { id: "c4-1", label: "1. Pilih tajuk kawasan" },
        { id: "c4-2", label: "2. Lukis bingkai peta" },
        { id: "c4-3", label: "3. Tentukan simbol yang sesuai" },
        { id: "c4-4", label: "4. Plot ciri geografi (fizikal dahulu)" },
        { id: "c4-5", label: "5. Lengkapkan petunjuk & arah mata angin" },
      ],
    },
  ],
};
