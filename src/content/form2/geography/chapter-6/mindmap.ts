import type { MindNode } from "@/components/MindMap";

export const geoF2C6MindMap: MindNode = {
  id: "root",
  label: "Telekomunikasi di Malaysia",
  children: [
    {
      id: "c1",
      label: "6.1 Alat Telekomunikasi",
      children: [
        { id: "c1-1", label: "Tradisional: telegraf, telefon, mesin teleks, mesin faks" },
        { id: "c1-2", label: "Moden: telefon bimbit, telefon pintar" },
      ],
    },
    {
      id: "c2",
      label: "6.2 Kemajuan Alat Telekomunikasi",
      children: [
        { id: "c2-1", label: "Satelit: stesen bumi 1970, TiungSAT-1, RazakSAT, MEASAT" },
        { id: "c2-2", label: "Kabel fiber optik, telefon pintar 3G/4G, TM, MSC, jalur lebar" },
      ],
    },
    {
      id: "c3",
      label: "6.3 Kepentingan Telekomunikasi",
      children: [
        { id: "c3-1", label: "Silaturahim, pentadbiran negara, integrasi, pendidikan" },
        { id: "c3-2", label: "Maklumat cuaca, data tersimpan, siaran langsung, kewangan" },
      ],
    },
    {
      id: "c4",
      label: "6.4 Kesan terhadap Pembangunan Negara",
      children: [
        { id: "c4-1", label: "Positif: e-perbankan, e-kerajaan, e-dagang, telekesihatan" },
        { id: "c4-2", label: "Negatif: maklumat negatif, pencerobohan data, maklumat tidak tepat" },
      ],
    },
    {
      id: "c5",
      label: "6.5 Penggunaan Beretika",
      children: [
        { id: "c5-1", label: "Etika: elak plagiat, sopan, jaga privasi" },
        { id: "c5-2", label: "Akta Komunikasi dan Multimedia 1998 (Seksyen 211, 233)" },
      ],
    },
  ],
};
