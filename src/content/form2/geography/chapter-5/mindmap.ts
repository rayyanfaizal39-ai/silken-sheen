import type { MindNode } from "@/components/MindMap";

export const geoF2C5MindMap: MindNode = {
  id: "root",
  label: "Pengangkutan di Malaysia",
  children: [
    {
      id: "c1",
      label: "5.1 Pengangkutan Darat",
      children: [
        { id: "c1-1", label: "Jaringan jalan raya: Lebuhraya Utara-Selatan, Pan Borneo" },
        { id: "c1-2", label: "Landasan kereta api: pertama 1885, Port Weld-Bukit Berapit" },
      ],
    },
    {
      id: "c2",
      label: "5.2 Pengangkutan Udara dan Air",
      children: [
        { id: "c2-1", label: "Lapangan terbang: 6 antarabangsa, 16 domestik, 18 padang terbang" },
        { id: "c2-2", label: "Pelabuhan: Klang, Tanjung Pelepas, Kuantan, Bintulu" },
      ],
    },
    {
      id: "c3",
      label: "5.3 Pengangkutan Awam",
      children: [
        { id: "c3-1", label: "Darat: bas, teksi, e-panggilan, LRT, MRT, ETS" },
        { id: "c3-2", label: "Air: feri, bot ekspres. Udara: kapal terbang" },
      ],
    },
    {
      id: "c4",
      label: "5.4 Faktor Mempengaruhi Jaringan",
      children: [
        { id: "c4-1", label: "Bentuk muka bumi, kemajuan teknologi" },
        { id: "c4-2", label: "Dasar kerajaan, kegiatan ekonomi" },
      ],
    },
    {
      id: "c5",
      label: "5.5 Kepentingan Darat, Udara, Air",
      children: [
        { id: "c5-1", label: "Bandar satelit, ketersampaian, koridor ekonomi" },
        { id: "c5-2", label: "Integrasi nasional, hubung kawasan pedalaman" },
      ],
    },
    {
      id: "c6",
      label: "5.6 Kepentingan Pengangkutan Awam",
      children: [
        { id: "c6-1", label: "Kurangkan kesesakan & pencemaran udara" },
        { id: "c6-2", label: "Majukan pelancongan & peluang pekerjaan" },
      ],
    },
    {
      id: "c7",
      label: "5.7 Amalan Pengangkutan Lestari",
      children: [
        { id: "c7-1", label: "Kereta elektrik/hibrid, berkongsi kereta" },
        { id: "c7-2", label: "Penggunaan pengangkutan awam" },
      ],
    },
  ],
};
