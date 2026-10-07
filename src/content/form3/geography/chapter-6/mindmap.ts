import type { MindNode } from "@/components/MindMap";

export const geoF3C6MindMap: MindNode = {
  id: "root",
  label: "Sumber Semula Jadi di Malaysia",
  children: [
    { id: "jenis", label: "Jenis Sumber", children: [
      { id: "jenis-1", label: "Boleh baharu • hutan • air • suria" },
      { id: "jenis-2", label: "Tidak boleh baharu • petroleum • gas • arang batu" },
    ]},
    { id: "taburan", label: "Taburan", children: [
      { id: "taburan-1", label: "Petroleum dan gas • luar pesisir" },
      { id: "taburan-2", label: "Mineral • kawasan geologi tertentu" },
      { id: "taburan-3", label: "Hutan • kawasan pedalaman dan tanah tinggi" },
    ]},
    { id: "penting", label: "Kepentingan Ekonomi", children: [
      { id: "penting-1", label: "Bahan mentah • tenaga • pekerjaan" },
      { id: "penting-2", label: "Pendapatan negara • eksport • industri" },
    ]},
    { id: "urus", label: "Pengurusan Sumber", children: [
      { id: "urus-1", label: "Penggunaan cekap • kurangkan pembaziran" },
      { id: "urus-2", label: "Pemuliharaan • sumber alternatif" },
    ]},
  ],
};
