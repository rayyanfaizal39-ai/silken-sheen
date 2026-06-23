import type { MindNode } from "@/components/MindMap";

export const scienceF2C1MindMapBM: MindNode = {
  id: "root",
  label: "Biodiversiti",
  children: [
    {
      id: "c1",
      label: "1.1 Kepelbagaian Organisma",
      children: [
        {
          id: "c1-1",
          label: "Maksud Biodiversiti",
          children: [
            { id: "c1-1-1", label: "Kepelbagaian mikroorganisma, haiwan, tumbuhan" },
            { id: "c1-1-2", label: "Akibat kepelbagaian habitat & iklim" },
            { id: "c1-1-3", label: "Termasuk kepelbagaian genetik" },
            { id: "c1-1-4", label: "Malaysia: 1 daripada 12 negara megabiodiversiti" },
          ],
        },
        {
          id: "c1-2",
          label: "Kepentingan Biodiversiti",
          children: [
            { id: "c1-2-1", label: "Sumber makanan" },
            { id: "c1-2-2", label: "Perubatan" },
            { id: "c1-2-3", label: "Imbangan alam" },
            { id: "c1-2-4", label: "Bahan mentah industri" },
            { id: "c1-2-5", label: "Tempat rekreasi" },
            { id: "c1-2-6", label: "Pendidikan" },
          ],
        },
        {
          id: "c1-3",
          label: "Pengurusan Biodiversiti",
          children: [
            { id: "c1-3-1", label: "Akta Perlindungan Hidupan Liar 1972" },
            { id: "c1-3-2", label: "Taman negara, taman laut, hutan simpan" },
            { id: "c1-3-3", label: "Program pembiakan (semaian, penetasan telur)" },
            { id: "c1-3-4", label: "Spesies endemik: rafflesia, periuk kera, penyu belimbing" },
          ],
        },
        {
          id: "c1-4",
          label: "Pemuliharaan",
          children: [
            { id: "c1-4-1", label: "In situ: dalam habitat asal" },
            { id: "c1-4-2", label: "Ex situ: luar habitat asal (zoo, taman botani)" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "1.2 Klasifikasi Haiwan",
      children: [
        {
          id: "c2-1",
          label: "Invertebrata (tanpa tulang belakang)",
          children: [
            { id: "c2-1-1", label: "Tanpa kaki, tanpa segmen: span, koral, siput" },
            { id: "c2-1-2", label: "Tanpa kaki, bersegmen: lintah, cacing pita" },
            { id: "c2-1-3", label: "3 pasang kaki: semut, rama-rama, lipas" },
            { id: "c2-1-4", label: ">3 pasang kaki: labah-labah, lipan, udang" },
          ],
        },
        {
          id: "c2-2",
          label: "Vertebrata (ada tulang belakang)",
          children: [
            { id: "c2-2-1", label: "Ikan — poikiloterma, insang, sisik" },
            { id: "c2-2-2", label: "Amfibia — poikiloterma, kulit lembap" },
            { id: "c2-2-3", label: "Reptilia — poikiloterma, telur bercengkerang" },
            { id: "c2-2-4", label: "Burung — homeoterma, berbulu" },
            { id: "c2-2-5", label: "Mamalia — homeoterma, melahirkan anak" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "1.2 Klasifikasi Tumbuhan",
      children: [
        {
          id: "c3-1",
          label: "Tidak Berbunga",
          children: [
            { id: "c3-1-1", label: "Lumut — spora, tidak berpembuluh" },
            { id: "c3-1-2", label: "Paku pakis — spora, berpembuluh" },
            { id: "c3-1-3", label: "Konifer — kon, berpembuluh" },
          ],
        },
        {
          id: "c3-2",
          label: "Berbunga",
          children: [
            { id: "c3-2-1", label: "Monokotiledon — akar serabut, urat selari" },
            { id: "c3-2-2", label: "Dikotiledon — akar tunjang, urat jaring" },
          ],
        },
      ],
    },
    {
      id: "c4",
      label: "Kekunci Dikotomi",
      children: [
        { id: "c4-1", label: "Siri kuplet — 2 penyataan (a)/(b) setiap kuplet" },
        { id: "c4-2", label: "Contoh haiwan: poikiloterma/homeoterma → ..." },
        { id: "c4-3", label: "Contoh tumbuhan: berbunga/tidak berbunga → ..." },
      ],
    },
  ],
};
