import type { MindNode } from "@/components/MindMap";

export const geoF3C3MindMap: MindNode = {
  id: "root",
  label: "Pengaruh Persekitaran Fizikal",
  children: [
    { id: "bumi", label: "Bentuk Muka Bumi", children: [
      { id: "bumi-1", label: "Tanah pamah • tanah tinggi" },
      { id: "bumi-2", label: "Ketinggian mempengaruhi suhu dan flora" },
    ]},
    { id: "saliran", label: "Saliran", children: [
      { id: "saliran-1", label: "Saliran baik • air tidak bertakung" },
      { id: "saliran-2", label: "Saliran buruk • hutan paya" },
    ]},
    { id: "tanih", label: "Tanih", children: [
      { id: "tanih-1", label: "Latosol • chernozem • podzol" },
      { id: "tanih-2", label: "Permafrost • aridisols • terra rossa" },
    ]},
    { id: "iklim", label: "Iklim", children: [
      { id: "iklim-1", label: "Suhu • hujan • cahaya matahari" },
      { id: "iklim-2", label: "Gurun Panas • Monsun Tropika" },
      { id: "iklim-3", label: "Siberia • Laurentia" },
    ]},
    { id: "adaptasi", label: "Adaptasi Flora dan Fauna", children: [
      { id: "adaptasi-1", label: "Akar • daun • bentuk pertumbuhan" },
      { id: "adaptasi-2", label: "Ciri badan • habitat • sumber makanan" },
    ]},
  ],
};
