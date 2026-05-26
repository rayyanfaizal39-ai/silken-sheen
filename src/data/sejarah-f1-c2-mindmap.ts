import type { MindNode } from "@/components/MindMap";

export const zamanAirBatuMindMap: MindNode = {
  id: "root",
  label: "Zaman Air Batu",
  children: [
    {
      id: "b1",
      label: "Bidang Ilmu Utama",
      children: [
        { id: "b1-1", label: "Geologi (Sejarah bumi)" },
        { id: "b1-2", label: "Paleontologi (Fosil & organisma)" },
      ],
    },
    {
      id: "b2",
      label: "Tahap Zaman Air Batu",
      children: [
        { id: "b2-1", label: "Miosen (23–5 juta tahun)" },
        { id: "b2-2", label: "Pliosen (5–2.5 juta tahun)" },
        { id: "b2-3", label: "Pleistosen (2.5 juta – 11,700 tahun)" },
        { id: "b2-4", label: "Holosen (11,700 tahun – Kini)" },
      ],
    },
    {
      id: "b3",
      label: "Ciri-ciri Akhir Zaman",
      children: [
        {
          id: "b3-1",
          label: "Kehidupan Manusia",
          children: [
            { id: "b3-1-1", label: "Hidup secara nomad" },
            { id: "b3-1-2", label: "Memburu binatang" },
            { id: "b3-1-3", label: "Tinggal di tanah pamah" },
          ],
        },
        {
          id: "b3-2",
          label: "Binatang",
          children: [
            { id: "b3-2-1", label: "Mamot" },
            { id: "b3-2-2", label: "Sloth" },
            { id: "b3-2-3", label: "Bison" },
            { id: "b3-2-4", label: "Harimau bertaring panjang" },
          ],
        },
        {
          id: "b3-3",
          label: "Tumbuhan",
          children: [
            { id: "b3-3-1", label: "Lumut" },
            { id: "b3-3-2", label: "Tumbuhan renek" },
          ],
        },
        {
          id: "b3-4",
          label: "Fizikal Bumi",
          children: [
            { id: "b3-4-1", label: "Suhu dunia terlalu sejuk" },
            { id: "b3-4-2", label: "Permukaan dilitupi ais/salji" },
            { id: "b3-4-3", label: "Paras air laut rendah (beku)" },
          ],
        },
      ],
    },
    {
      id: "b4",
      label: "Geografi Dunia",
      children: [
        {
          id: "b4-1",
          label: "Benua",
          children: [
            { id: "b4-1-1", label: "Asia" },
            { id: "b4-1-2", label: "Afrika" },
            { id: "b4-1-3", label: "Eropah" },
            { id: "b4-1-4", label: "Amerika Utara/Selatan" },
            { id: "b4-1-5", label: "Antartika" },
            { id: "b4-1-6", label: "Oceania" },
          ],
        },
        {
          id: "b4-2",
          label: "Lautan",
          children: [
            { id: "b4-2-1", label: "Pasifik" },
            { id: "b4-2-2", label: "Atlantik" },
            { id: "b4-2-3", label: "Hindi" },
            { id: "b4-2-4", label: "Selatan" },
            { id: "b4-2-5", label: "Arktik" },
          ],
        },
      ],
    },
    {
      id: "b5",
      label: "Perubahan & Kesan Akhir",
      children: [
        {
          id: "b5-1",
          label: "Proses Glasiar",
          children: [
            { id: "b5-1-1", label: "Peningkatan suhu bumi" },
            { id: "b5-1-2", label: "Pencairan ais (Glasiar)" },
            { id: "b5-1-3", label: "Kenaikan paras laut (100m)" },
          ],
        },
        {
          id: "b5-2",
          label: "Kesan Fizikal",
          children: [
            { id: "b5-2-1", label: "Pembentukan tasik air tawar" },
            { id: "b5-2-2", label: "Pembentukan sungai" },
            { id: "b5-2-3", label: "Kepupusan binatang besar" },
          ],
        },
        {
          id: "b5-3",
          label: "Pentas Sunda",
          children: [
            { id: "b5-3-1", label: "Daratan luas Asia Tenggara" },
            { id: "b5-3-2", label: "Malaysia–Singapura–Borneo–Indonesia bersatu" },
            { id: "b5-3-3", label: "Tenggelam akibat kenaikan laut" },
            { id: "b5-3-4", label: "Migrasi manusia & haiwan" },
          ],
        },
      ],
    },
  ],
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

