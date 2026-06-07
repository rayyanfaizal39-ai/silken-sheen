import type { MindNode } from "@/components/MindMap";

export const mengenaliSejarahMindMap: MindNode = {
  id: "root",
  label: "Mengenali Sejarah",
  children: [
    {
      id: "c1",
      label: "Pengertian Sejarah Umum",
      children: [
        {
          id: "c1-1",
          label: "Bahasa Melayu",
          children: [
            { id: "c1-1-1", label: "Syajaratun (Pokok)" },
            { id: "c1-1-2", label: "Salasilah / Riwayat / Keturunan" },
          ],
        },
        {
          id: "c1-2",
          label: "Kamus Dewan",
          children: [
            { id: "c1-2-1", label: "Asal-usul" },
            { id: "c1-2-2", label: "Peristiwa masa lalu" },
            { id: "c1-2-3", label: "Tambo (Riwayat dahulu kala)" },
          ],
        },
        {
          id: "c1-3",
          label: "Bahasa Inggeris",
          children: [
            { id: "c1-3-1", label: "History (Cerita seseorang)" },
            { id: "c1-3-2", label: "Historia (Penyelidikan)" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "Pandangan Sejarawan",
      children: [
        { id: "c2-1", label: "Herodotus: Penceritaan tindakan manusia" },
        { id: "c2-2", label: "E.H. Carr: Interaksi sejarawan dan fakta" },
        { id: "c2-3", label: "Ibn Khaldun: Masyarakat dan peradaban" },
        { id: "c2-4", label: "Khoo Kay Kim: Perkara telah berlaku" },
        { id: "c2-5", label: "Muhd Yusof Ibrahim: Masa lalu itu sendiri" },
      ],
    },
    {
      id: "c3",
      label: "Masa Silam dan Ruang",
      children: [
        { id: "c3-1", label: "Kronologi (Urutan masa teratur)" },
        { id: "c3-2", label: "Dekad (10 tahun)" },
        { id: "c3-3", label: "Abad (100 tahun)" },
        { id: "c3-4", label: "Alaf (1000 tahun)" },
        { id: "c3-5", label: "Masihi (Kelahiran Nabi Isa)" },
        { id: "c3-6", label: "Sebelum Masihi" },
      ],
    },
    {
      id: "c4",
      label: "Sumber Sejarah",
      children: [
        {
          id: "c4-1",
          label: "Sumber Primer",
          children: [
            { id: "c4-1-1", label: "Belum diolah / diterbitkan" },
            { id: "c4-1-2", label: "Fosil" },
            { id: "c4-1-3", label: "Artifak" },
            { id: "c4-1-4", label: "Bukan Artifak (Binaan/Dinding)" },
            { id: "c4-1-5", label: "Batu Bersurat" },
          ],
        },
        {
          id: "c4-2",
          label: "Sumber Sekunder",
          children: [
            { id: "c4-2-1", label: "Telah diolah dan diterbitkan" },
            { id: "c4-2-2", label: "Buku Teks" },
            { id: "c4-2-3", label: "Akhbar" },
            { id: "c4-2-4", label: "Majalah" },
          ],
        },
      ],
    },
    {
      id: "c5",
      label: "Kaedah Penyelidikan",
      children: [
        {
          id: "c5-1",
          label: "Kaedah Bertulis",
          children: [
            { id: "c5-1-1", label: "Maklumat dipahat / ditulis" },
            { id: "c5-1-2", label: "Catatan Harian" },
          ],
        },
        {
          id: "c5-2",
          label: "Kaedah Lisan",
          children: [
            { id: "c5-2-1", label: "Proses temubual" },
            { id: "c5-2-2", label: "Rakaman" },
          ],
        },
        {
          id: "c5-3",
          label: "Kaedah Arkeologi",
          children: [
            { id: "c5-3-1", label: "Secara saintifik" },
            { id: "c5-3-2", label: "Aktiviti gali cari" },
          ],
        },
      ],
    },
    {
      id: "c6",
      label: "Pentafsiran Sejarah",
      children: [
        { id: "c6-1", label: "Menerangkan fakta berdasarkan sumber" },
        {
          id: "c6-2",
          label: "Sebab perbezaan tafsiran",
          children: [
            { id: "c6-2-1", label: "Pemilihan sumber pelbagai" },
            { id: "c6-2-2", label: "Perbezaan pandangan / ideologi" },
            { id: "c6-2-3", label: "Tujuan penulisan" },
          ],
        },
        { id: "c6-3", label: "Kepentingan: Mencari bukti kukuh" },
      ],
    },
    {
      id: "c7",
      label: "Kepentingan Belajar Sejarah",
      children: [
        { id: "c7-1", label: "Mengenal asal-usul" },
        { id: "c7-2", label: "Mengambil iktibar" },
        { id: "c7-3", label: "Memupuk patriotisme" },
        { id: "c7-4", label: "Mengukuhkan perpaduan" },
        { id: "c7-5", label: "Aplikasi kemahiran pemikiran kritis" },
      ],
    },
  ],
};
