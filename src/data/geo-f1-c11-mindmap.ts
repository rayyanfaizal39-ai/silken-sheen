import type { MindNode } from "@/components/MindMap";

export const geoF1C11MindMap: MindNode = {
  id: "root",
  label: "Penduduk & Petempatan di Asia Tenggara",
  children: [
    {
      id: "c1",
      label: "Saiz Penduduk Asia Tenggara",
      children: [
        { id: "c1-1", label: "±680 juta (2023)" },
        { id: "c1-2", label: "Indonesia — terbesar (±277 juta)" },
        { id: "c1-3", label: "Filipina — kedua" },
        { id: "c1-4", label: "Vietnam — ketiga" },
        { id: "c1-5", label: "Brunei & Singapura — terkecil" },
      ],
    },
    {
      id: "c2",
      label: "Taburan Penduduk",
      children: [
        {
          id: "c2-1",
          label: "Kawasan Tumpat",
          children: [
            { id: "c2-1-1", label: "Pulau Jawa, Indonesia — terdapat di lembangan sungai" },
            { id: "c2-1-2", label: "Delta Sungai Mekong — Vietnam" },
            { id: "c2-1-3", label: "Tanah pamah Chao Phraya — Thailand" },
            { id: "c2-1-4", label: "Singapura — negara kota" },
          ],
        },
        {
          id: "c2-2",
          label: "Kawasan Jarang",
          children: [
            { id: "c2-2-1", label: "Kalimantan / Borneo — hutan tebal" },
            { id: "c2-2-2", label: "Pedalaman Myanmar & Laos" },
            { id: "c2-2-3", label: "Tanah tinggi & gunung berapi" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "Komposisi Etnik",
      children: [
        { id: "c3-1", label: "Rumpun Melayu — Malaysia, Indonesia, Filipina, Brunei" },
        { id: "c3-2", label: "Cina — Singapura dominan, komuniti besar di Malaysia & Thailand" },
        { id: "c3-3", label: "India — Malaysia, Singapura, Myanmar" },
        { id: "c3-4", label: "Khmer — Kemboja" },
        { id: "c3-5", label: "Burman — Myanmar" },
      ],
    },
    {
      id: "c4",
      label: "Petempatan",
      children: [
        {
          id: "c4-1",
          label: "Bandar Utama",
          children: [
            { id: "c4-1-1", label: "Jakarta — Indonesia (akan berpindah ke Nusantara)" },
            { id: "c4-1-2", label: "Manila — Filipina" },
            { id: "c4-1-3", label: "Bangkok — Thailand" },
            { id: "c4-1-4", label: "Kuala Lumpur — Malaysia" },
            { id: "c4-1-5", label: "Singapura — negara & bandar sekaligus" },
          ],
        },
        {
          id: "c4-2",
          label: "Petempatan Luar Bandar",
          children: [
            { id: "c4-2-1", label: "Kampung tradisional di sawah / pesisir" },
            { id: "c4-2-2", label: "Rumah panjang — Orang Asal Borneo" },
            { id: "c4-2-3", label: "Kampung terapung — Vietnam, Kemboja" },
          ],
        },
      ],
    },
    {
      id: "c5",
      label: "Isu Penduduk",
      children: [
        { id: "c5-1", label: "Perbandaran pesat — tekanan infrastruktur" },
        { id: "c5-2", label: "Kepelbagaian etnik — perpaduan & konflik" },
        { id: "c5-3", label: "Migrasi buruh antara negara" },
      ],
    },
  ],
};
