import type { MindNode } from "@/components/MindMap";

export const geoF2C4MindMap: MindNode = {
  id: "root",
  label: "Cuaca dan Iklim di Malaysia",
  children: [
    {
      id: "c1",
      label: "4.1 Jenis dan Ciri Iklim",
      children: [
        { id: "c1-1", label: "Iklim Khatulistiwa: panas & lembap sepanjang tahun" },
        { id: "c1-2", label: "Suhu: min tahunan >21°C, julat suhu kecil" },
        { id: "c1-3", label: "Hujan: >2600mm setahun, hujan perolakan & hujan bukit" },
        { id: "c1-4", label: "Angin: Monsun TL/BD, Bayu Sumatera, angin tempatan" },
      ],
    },
    {
      id: "c2",
      label: "4.2 Pengaruh terhadap Kegiatan Manusia",
      children: [
        { id: "c2-1", label: "Pertanian: padi, kelapa sawit, lada hitam, teh" },
        { id: "c2-2", label: "Pembalakan: hutan tropika; sukar semasa tengkujuh" },
        { id: "c2-3", label: "Perikanan: terjejas semasa Monsun Timur Laut" },
        { id: "c2-4", label: "Pelancongan: pantai, terumbu karang, tanah tinggi" },
      ],
    },
    {
      id: "c3",
      label: "4.3 Kesan Kegiatan Manusia",
      children: [
        { id: "c3-1", label: "Kesan Rumah Hijau: CO2, CH4, CFC, N2O" },
        { id: "c3-2", label: "Pulau Haba: bandar lebih panas dari sekitar" },
        { id: "c3-3", label: "Hujan Asid: pH < 5.6" },
        { id: "c3-4", label: "Jerebu: zarah halus terampai di atmosfera" },
      ],
    },
    {
      id: "c4",
      label: "4.4 Perubahan Cuaca dan Iklim",
      children: [
        { id: "c4-1", label: "El Nino: laut Pasifik panas → kemarau" },
        { id: "c4-2", label: "La Nina: laut Pasifik sejuk → banjir besar" },
      ],
    },
  ],
};
