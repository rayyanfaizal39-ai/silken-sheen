import type { MindNode } from "@/components/MindMap";

export const geoF2C8MindMap: MindNode = {
  id: "root",
  label: "Jenis dan Kemajuan Pengangkutan di Asia",
  children: [
    {
      id: "c1",
      label: "8.1 Jenis Pengangkutan",
      children: [
        { id: "c1-1", label: "Darat: landasan kereta api India (66 687 km)" },
        { id: "c1-2", label: "Udara: Dubai (tersibuk), Changi (terbaik)" },
        { id: "c1-3", label: "Air: Pelabuhan Jawaharlal, Singapura" },
      ],
    },
    {
      id: "c2",
      label: "8.2 Kemajuan Pengangkutan",
      children: [
        { id: "c2-1", label: "Shinkansen (Jepun): bullet train, 320 km/j" },
        { id: "c2-2", label: "KTX (Korea Selatan): rekod 603 km/j" },
        { id: "c2-3", label: "Beijing-Shanghai (China): 250-300 km/j" },
      ],
    },
    {
      id: "c3",
      label: "8.3 Kesan Pengangkutan",
      children: [
        { id: "c3-1", label: "Masyarakat: taraf hidup, integrasi, peluang kerja" },
        { id: "c3-2", label: "Ekonomi: hab perdagangan, pelancongan" },
        { id: "c3-3", label: "Alam sekitar: positif (kurang pencemaran) vs negatif (kemusnahan hutan)" },
      ],
    },
  ],
};
