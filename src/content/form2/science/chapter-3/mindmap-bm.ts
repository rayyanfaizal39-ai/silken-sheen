import type { MindNode } from "@/components/MindMap";

export const scienceF2C3MindMapBM: MindNode = {
  id: "root",
  label: "Nutrisi",
  children: [
    {
      id: "c1",
      label: "3.1 Kelas-Kelas Makanan",
      children: [
        {
          id: "c1-1",
          label: "Karbohidrat",
          children: [
            { id: "c1-1-1", label: "Fungsi: bekal tenaga (kanji, glikogen, selulosa)" },
            { id: "c1-1-2", label: "Sumber: nasi, pisang, kentang, madu, roti, gula" },
          ],
        },
        {
          id: "c1-2",
          label: "Protein",
          children: [
            { id: "c1-2-1", label: "Fungsi: pertumbuhan, baiki tisu, sintesis enzim/hormon" },
            { id: "c1-2-2", label: "Sumber: ayam, makanan laut, telur, kekacang" },
            { id: "c1-2-3", label: "Kekurangan: Kwashiorkor (kanak-kanak 1-3 tahun)" },
          ],
        },
        {
          id: "c1-3",
          label: "Lemak",
          children: [
            { id: "c1-3-1", label: "2× tenaga karbohidrat; lindung organ; penebat haba" },
            { id: "c1-3-2", label: "Sumber: mentega, minyak sawit, kacang tanah" },
          ],
        },
        {
          id: "c1-4",
          label: "Vitamin (A,B,C,D,E,K)",
          children: [
            { id: "c1-4-1", label: "Larut air: B (Beri-beri/Anemia), C (Skurvi)" },
            { id: "c1-4-2", label: "Larut lemak: A (rabun senja), D (Riket), E (mandul), K (pendarahan)" },
          ],
        },
        {
          id: "c1-5",
          label: "Mineral",
          children: [
            { id: "c1-5-1", label: "Kalsium (Riket), Ferum (Anemia), Iodin (Goiter)" },
            { id: "c1-5-2", label: "Fosforus (DNA/RNA), Natrium & Potasium (saraf/otot)" },
          ],
        },
        { id: "c1-6", label: "Pelawas: selulosa, rangsang peristalsis, cegah sembelit" },
        { id: "c1-7", label: "Air: pelarut, pengangkutan, kawal suhu badan (2L/hari)" },
        {
          id: "c1-8",
          label: "Ujian Makanan",
          children: [
            { id: "c1-8-1", label: "Iodin: kanji → hitam-kebiruan" },
            { id: "c1-8-2", label: "Benedict: gula → hijau/kuning/merah bata" },
            { id: "c1-8-3", label: "Millon: protein → merah bata" },
            { id: "c1-8-4", label: "Emulsi alkohol: lemak → emulsi putih berkabus" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "3.2 Gizi Seimbang",
      children: [
        { id: "c2-1", label: "Piramid Makanan: tapak (nasi/bijirin) ke puncak (lemak/gula)" },
        {
          id: "c2-2",
          label: "Faktor Keperluan Kalori",
          children: [
            { id: "c2-2-1", label: "Kesihatan, cuaca, kerja" },
            { id: "c2-2-2", label: "Jantina, saiz badan, umur" },
          ],
        },
        {
          id: "c2-3",
          label: "Nilai Kalori",
          children: [
            { id: "c2-3-1", label: "Lemak: 37 kJ/g (9 kkal/g)" },
            { id: "c2-3-2", label: "Protein & Karbohidrat: 17 kJ/g (4 kkal/g)" },
            { id: "c2-3-3", label: "1 kal = 4.2 J; 1 kkal = 4.2 kJ" },
          ],
        },
        { id: "c2-4", label: "BMI = Jisim (kg) ÷ [Ketinggian (m)]²" },
        {
          id: "c2-5",
          label: "Amalan Pemakanan Sihat",
          children: [
            { id: "c2-5-1", label: "NHMS 2016: diabetes 17.5%, obesiti 17%, berat lebih 40%" },
            { id: "c2-5-2", label: "Kempen Makan Sayur & Buah; gaya hidup sihat" },
            { id: "c2-5-3", label: "Isu lain: obesiti, malnutrisi (sebutan ringkas)" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "3.3 Sistem Pencernaan",
      children: [
        { id: "c3-1", label: "Pencernaan fizikal (mulut, tiada enzim) vs kimia (enzim)" },
        {
          id: "c3-2",
          label: "Urutan Organ",
          children: [
            { id: "c3-2-1", label: "Mulut → Esofagus → Perut → Duodenum" },
            { id: "c3-2-2", label: "Usus kecil → Usus besar → Rektum → Anus" },
          ],
        },
        {
          id: "c3-3",
          label: "Enzim Pencernaan",
          children: [
            { id: "c3-3-1", label: "Amilase: kanji → maltosa" },
            { id: "c3-3-2", label: "Protease perut: protein → polipeptida" },
            { id: "c3-3-3", label: "Protease pankreas: polipeptida → dipeptida" },
            { id: "c3-3-4", label: "Maltase: maltosa → glukosa" },
            { id: "c3-3-5", label: "Protease usus: dipeptida → asid amino" },
            { id: "c3-3-6", label: "Lipase: lemak → asid lemak + gliserol" },
          ],
        },
        { id: "c3-4", label: "Hempedu: emulsi lemak, neutral asid (bukan enzim)" },
      ],
    },
    {
      id: "c4",
      label: "3.4 Penyerapan & Penyahtinjaan",
      children: [
        { id: "c4-1", label: "Vilus: tambah luas permukaan, dinding 1 sel tebal" },
        { id: "c4-2", label: "Lakteal: serap lemak ke sistem limfa" },
        {
          id: "c4-3",
          label: "Asimilasi",
          children: [
            { id: "c4-3-1", label: "Glukosa → tenaga" },
            { id: "c4-3-2", label: "Asid amino → komponen sel" },
            { id: "c4-3-3", label: "Asid lemak + gliserol → lemak" },
          ],
        },
        { id: "c4-4", label: "Penyahtinjaan: penyerapan semula air & mineral di usus besar, najis disingkir melalui anus" },
      ],
    },
  ],
};
