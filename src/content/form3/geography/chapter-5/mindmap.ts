import type { MindNode } from "@/components/MindMap";

export const geoF3C5MindMap: MindNode = {
  id: "root",
  label: "Hidupan Liar di Malaysia",
  children: [
    { id: "peranan", label: "Peranan Hidupan Liar", children: [
      { id: "peranan-1", label: "Siratan makanan • keseimbangan ekosistem" },
      { id: "peranan-2", label: "Biodiversiti • kesuburan tanih" },
    ]},
    { id: "ekonomi", label: "Kepentingan", children: [
      { id: "ekonomi-1", label: "Ekopelancongan • peluang pekerjaan" },
      { id: "ekonomi-2", label: "Pendidikan • penyelidikan" },
    ]},
    { id: "ancaman", label: "Ancaman", children: [
      { id: "ancaman-1", label: "Pembalakan • pertanian • empangan" },
      { id: "ancaman-2", label: "Pengkuarian • jalan raya • pencemaran" },
      { id: "ancaman-3", label: "Pemburuan • perdagangan haram" },
    ]},
    { id: "usaha", label: "Pemeliharaan dan Pemuliharaan", children: [
      { id: "usaha-1", label: "Kawasan perlindungan • koridor hidupan liar" },
      { id: "usaha-2", label: "Pusat konservasi • pembiakan" },
      { id: "usaha-3", label: "Undang-undang • EIA • kempen" },
    ]},
    { id: "agensi", label: "Tanggungjawab Bersama", children: [
      { id: "agensi-1", label: "PERHILITAN • kerajaan • NGO" },
      { id: "agensi-2", label: "Penyelidik • masyarakat • komuniti" },
    ]},
  ],
};
