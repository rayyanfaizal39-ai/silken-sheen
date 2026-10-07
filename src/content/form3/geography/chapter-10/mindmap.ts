import type { MindNode } from "@/components/MindMap";

export const geoF3C10MindMap: MindNode = {
  id: "root",
  label: "Sumber Hutan",
  children: [
    { id: "sumber", label: "Sumber Hutan", children: [
      { id: "sumber-1", label: "Sumber boleh baharu • flora • fauna" },
      { id: "sumber-2", label: "Hutan hujan tropika • tanah lembap" },
    ]},
    { id: "penting", label: "Kepentingan Pengurusan", children: [
      { id: "penting-1", label: "Keseimbangan ekosistem • habitat" },
      { id: "penting-2", label: "Bahan mentah • makanan • perubatan" },
      { id: "penting-3", label: "Ekopelancongan • masyarakat setempat" },
    ]},
    { id: "usaha", label: "Pemeliharaan dan Pemuliharaan", children: [
      { id: "usaha-1", label: "Hutan simpan • taman negara • Tapak Ramsar" },
      { id: "usaha-2", label: "Penghutanan semula • ladang hutan" },
      { id: "usaha-3", label: "Pembangunan lestari • pemuliharaan ex situ" },
    ]},
    { id: "agensi", label: "Agensi Kerajaan", children: [
      { id: "agensi-1", label: "JAS • PERHILITAN • FRIM" },
      { id: "agensi-2", label: "Jabatan Perhutanan Sabah • Sarawak Forestry" },
    ]},
    { id: "ngo", label: "Badan Bukan Kerajaan", children: [
      { id: "ngo-1", label: "SAM • MNS • TRAFFIC" },
      { id: "ngo-2", label: "GEC • WWF" },
    ]},
  ],
};
