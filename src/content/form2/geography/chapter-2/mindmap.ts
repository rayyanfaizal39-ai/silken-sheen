import type { MindNode } from "@/components/MindMap";

export const geoF2C2MindMap: MindNode = {
  id: "root",
  label: "Peta Topografi",
  children: [
    {
      id: "c1",
      label: "2.1 Maksud Peta Topografi",
      children: [
        { id: "c1-1", label: "Menunjukkan keadaan bentuk muka bumi" },
        { id: "c1-2", label: "Mempunyai garisan grid melintang & menegak" },
        { id: "c1-3", label: "Dilukis menggunakan skala" },
      ],
    },
    {
      id: "c2",
      label: "2.2 Garisan Timuran & Utaraan",
      children: [
        {
          id: "c2-1",
          label: "Garisan Timuran",
          children: [
            { id: "c2-1-1", label: "Menegak, dinomborkan ke arah timur" },
          ],
        },
        {
          id: "c2-2",
          label: "Garisan Utaraan",
          children: [
            { id: "c2-2-1", label: "Melintang, dinomborkan ke arah utara" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "2.3 Rujukan Grid",
      children: [
        {
          id: "c3-1",
          label: "Grid 4 Angka",
          children: [
            { id: "c3-1-1", label: "Kedudukan kawasan (segi empat grid)" },
            { id: "c3-1-2", label: "2 digit timuran + 2 digit utaraan" },
          ],
        },
        {
          id: "c3-2",
          label: "Grid 6 Angka",
          children: [
            { id: "c3-2-1", label: "Kedudukan objek spesifik" },
            { id: "c3-2-2", label: "3 digit timuran + 3 digit utaraan" },
          ],
        },
      ],
    },
    {
      id: "c4",
      label: "2.4 Ciri Pandang Darat",
      children: [
        { id: "c4-1", label: "Fizikal: semula jadi (tanah, saliran, tumbuhan)" },
        { id: "c4-2", label: "Budaya: buatan manusia (petempatan, ekonomi)" },
        { id: "c4-3", label: "Saling berkait — fizikal pengaruhi budaya" },
      ],
    },
    {
      id: "c5",
      label: "2.5 Mentafsir Peta Topografi",
      children: [
        { id: "c5-1", label: "Perhatikan peta secara keseluruhan" },
        { id: "c5-2", label: "Kenal pasti ciri fizikal & budaya" },
        { id: "c5-3", label: "Kaitkan kedua-dua ciri" },
        { id: "c5-4", label: "Tafsirkan dengan bukti dari peta" },
      ],
    },
  ],
};
