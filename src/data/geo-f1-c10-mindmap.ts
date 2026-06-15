import type { MindNode } from "@/components/MindMap";

export const geoF1C10MindMap: MindNode = {
  id: "root",
  label: "Bentuk Muka Bumi & Saliran di Asia Tenggara",
  children: [
    {
      id: "c1",
      label: "Rantau Asia Tenggara",
      children: [
        { id: "c1-1", label: "11 negara — 10 ASEAN + Timor Leste" },
        { id: "c1-2", label: "Tanah Besar: Myanmar, Thailand, Laos, Kemboja, Vietnam" },
        { id: "c1-3", label: "Kepulauan: Malaysia, Indonesia, Filipina, Brunei, Singapura, Timor Leste" },
      ],
    },
    {
      id: "c2",
      label: "Bentuk Muka Bumi",
      children: [
        {
          id: "c2-1",
          label: "Banjaran Gunung Utama",
          children: [
            { id: "c2-1-1", label: "Banjaran Arakan Yoma — Myanmar" },
            { id: "c2-1-2", label: "Banjaran Cardamom — Kemboja" },
            { id: "c2-1-3", label: "Banjaran Titiwangsa — Malaysia" },
            { id: "c2-1-4", label: "Pergunungan Barisan — Sumatera, Indonesia" },
          ],
        },
        {
          id: "c2-2",
          label: "Gunung Tertinggi",
          children: [
            { id: "c2-2-1", label: "Puncak Jaya (5,030 m) — Papua Barat, Indonesia" },
            { id: "c2-2-2", label: "Gunung Kinabalu (4,095 m) — Sabah" },
          ],
        },
        {
          id: "c2-3",
          label: "Tanah Pamah Utama",
          children: [
            { id: "c2-3-1", label: "Tanah pamah Sungai Irrawaddy — Myanmar" },
            { id: "c2-3-2", label: "Tanah pamah Sungai Chao Phraya — Thailand" },
            { id: "c2-3-3", label: "Tanah pamah Sungai Mekong — Kemboja/Vietnam" },
          ],
        },
        {
          id: "c2-4",
          label: "Gunung Berapi Aktif",
          children: [
            { id: "c2-4-1", label: "Indonesia — 'Cincin Api Pasifik', paling banyak" },
            { id: "c2-4-2", label: "Filipina — Gunung Mayon, Taal" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "Saliran Utama",
      children: [
        { id: "c3-1", label: "Sungai Mekong — terpanjang (4,880 km), 6 negara" },
        { id: "c3-2", label: "Sungai Irrawaddy — Myanmar, beras" },
        { id: "c3-3", label: "Sungai Chao Phraya — Thailand (Bangkok)" },
        { id: "c3-4", label: "Sungai Rajang — Sarawak, terpanjang Malaysia" },
        { id: "c3-5", label: "Sungai Mekong Delta — lumbung beras Vietnam" },
      ],
    },
    {
      id: "c4",
      label: "Kepentingan",
      children: [
        { id: "c4-1", label: "Pertanian — tanah pamah lembangan sungai" },
        { id: "c4-2", label: "Pengangkutan — sungai jadi jalan" },
        { id: "c4-3", label: "Pelancongan — gunung berapi, pantai" },
        { id: "c4-4", label: "Tenaga — hidroelektrik (Mekong, Irrawaddy)" },
      ],
    },
  ],
};
