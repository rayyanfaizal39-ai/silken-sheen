import type { MindNode } from "@/components/MindMap";

export const geoF3C8MindMap: MindNode = {
  id: "root",
  label: "Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar di Dunia",
  children: [
    { id: "gurun", label: "Gurun Panas", children: [
      { id: "gurun-1", label: "Hujan sangat sedikit • suhu tinggi" },
      { id: "gurun-2", label: "Tumbuhan jarang • akar panjang • daun kecil" },
      { id: "gurun-3", label: "Unta • reptilia • mamalia tahan kering" },
    ]},
    { id: "monsun", label: "Hutan Monsun Tropika", children: [
      { id: "monsun-1", label: "Musim hujan dan musim kering nyata" },
      { id: "monsun-2", label: "Jati • buluh • pokok luruh daun" },
      { id: "monsun-3", label: "Harimau Bengal • gajah" },
    ]},
    { id: "luruh", label: "Hutan Daun Luruh Sederhana", children: [
      { id: "luruh-1", label: "Empat musim • daun luruh pada musim tertentu" },
      { id: "luruh-2", label: "Oak • maple • elm" },
      { id: "luruh-3", label: "Rusa • beruang • tupai" },
    ]},
    { id: "konifer", label: "Hutan Konifer", children: [
      { id: "konifer-1", label: "Musim sejuk panjang • suhu rendah" },
      { id: "konifer-2", label: "Daun berbentuk jarum • pokok malar hijau" },
      { id: "konifer-3", label: "Moose • lynx • beruang" },
    ]},
    { id: "penting", label: "Kepentingan Global", children: [
      { id: "penting-1", label: "Habitat • biodiversiti • rantaian makanan" },
      { id: "penting-2", label: "Sumber makanan • bahan mentah • ekopelancongan" },
    ]},
  ],
};
