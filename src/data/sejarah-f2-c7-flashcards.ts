import type { Flashcard } from "./types";

const cardContent: Array<[front: string, back: string]> = [
  // Set 1: Kesultanan, pengasas kerajaan dan pusat pemerintahan
  ["Siapakah pengasas Kesultanan Pahang?", "Raja Muhammad."],
  ["Bilakah Kesultanan Pahang diasaskan?", "Tahun 1470."],
  ["Apakah gelaran Raja Muhammad?", "Sultan Muhammad Shah."],
  ["Di manakah pusat pemerintahan awal Pahang?", "Pekan."],
  ["Pahang pernah menjadi wilayah naungan kerajaan mana?", "Kesultanan Melayu Melaka."],
  ["Siapakah pengasas Kesultanan Perak?", "Raja Muzaffar."],
  ["Bilakah Kesultanan Perak diasaskan?", "Tahun 1528."],
  ["Apakah gelaran Raja Muzaffar?", "Sultan Muzaffar Shah."],
  ["Di manakah pusat pemerintahan awal Perak?", "Tanah Abang."],
  ["Siapakah yang menjemput Raja Muzaffar ke Perak?", "Tun Saban dan Nakhoda Kassim."],
  ["Siapakah pengasas Kesultanan Terengganu?", "Tun Zainal Abidin."],
  ["Bilakah Kesultanan Terengganu diasaskan?", "Tahun 1708."],
  ["Apakah gelaran Tun Zainal Abidin?", "Sultan Zainal Abidin I."],
  ["Di manakah pusat pemerintahan awal Terengganu?", "Tanjung Baru, Kuala Berang."],
  ["Siapakah yang menganugerahkan Terengganu kepada Tun Zainal Abidin?", "Sultan Abdul Jalil."],
  ["Siapakah pengasas Kesultanan Selangor?", "Raja Lumu."],
  ["Bilakah Kesultanan Selangor diasaskan?", "Tahun 1766."],
  ["Apakah gelaran Raja Lumu?", "Sultan Salehuddin Shah."],
  ["Di manakah pusat pemerintahan awal Selangor?", "Kuala Selangor."],
  [
    "Siapakah yang mengiktiraf Raja Lumu sebagai Sultan Selangor?",
    "Sultan Mahmud Shah dari Perak.",
  ],

  // Set 2: Sistem pemerintahan, agama Islam dan perundangan
  ["Apakah adat yang menjadi asas penggantian pemerintah?", "Adat Temenggung."],
  ["Apakah gelaran waris ganti Pahang?", "Tengku Mahkota."],
  [
    "Pihak manakah memberikan persetujuan dalam pelantikan Sultan Pahang?",
    "Jumaah Pangkuan Diraja Negeri.",
  ],
  ["Apakah asas susunan pembesar Pahang?", "Pembesar empat, lapan dan enam belas."],
  ["Siapakah salah seorang pembesar utama Pahang?", "Orang Kaya Indera Shahbandar."],
  ["Apakah sistem pewarisan takhta Perak?", "Sistem penggiliran."],
  ["Siapakah yang memilih dan melantik Sultan Perak?", "Dewan Negara Perak."],
  ["Apakah kedudukan selepas Sultan dalam giliran takhta Perak?", "Raja Muda."],
  ["Apakah asas susunan pembesar Perak?", "Pembesar empat, lapan, enam belas dan tiga puluh dua."],
  ["Apakah gelaran waris ganti Terengganu?", "Yang Di-Pertuan Muda."],
  ["Siapakah yang memilih dan melantik Sultan Terengganu?", "Dewan Pangkuan Diraja."],
  ["Apakah gelaran waris ganti Selangor?", "Raja Muda."],
  ["Siapakah yang mengesahkan pelantikan Sultan Selangor?", "Dewan di-Raja."],
  ["Siapakah ketua agama Islam bagi sesebuah negeri beraja?", "Sultan."],
  [
    "Namakan institusi dan pegawai agama yang berperanan dalam pentadbiran negeri.",
    "Mufti, kadi, mahkamah syariah dan Jabatan Agama Islam.",
  ],
  ["Mufti menjadi anggota institusi diraja yang mana?", "Dewan di-Raja Selangor."],
  ["Berapakah fasal dalam Hukum Kanun Pahang?", "92 fasal."],
  ["Apakah bentuk Undang-Undang 99 Perak?", "Soal jawab."],
  ["Apakah nama lain Undang-Undang Tubuh Terengganu?", "Itqan al-muluk bi ta'dil al-suluk."],
  ["Bilakah Undang-Undang Tubuh Selangor diperkenalkan?", "1 Februari 1948."],

  // Set 3: Adat istiadat, persuratan dan ekonomi
  [
    "Siapakah yang mengasaskan Kesultanan Pahang yang baharu pada tahun 1884?",
    "Bendahara Siwa Raja Wan Ahmad.",
  ],
  ["Apakah yang diperdengarkan kepada bayi selepas dilahirkan?", "Azan."],
  [
    "Apakah gelaran Wan Ahmad selepas ditabalkan pada 12 Disember 1884?",
    "Sultan Ahmad Al-Muazzam Shah.",
  ],
  [
    "Apakah sumbangan Sultan Zainal Abidin III kepada pemodenan Terengganu?",
    "Menggubal undang-undang tubuh, memperkemas sistem sukat dan timbang, menubuhkan mahkamah syariah dan pasukan polis serta membina Istana Maziah.",
  ],
  ["Apakah langkah pertama dalam adat perkahwinan diraja?", "Merisik."],
  ["Bilakah istiadat berinai besar dilaksanakan?", "Malam sebelum perkahwinan."],
  ["Di manakah istiadat bersiram diraja dilakukan?", "Di atas panca persada."],
  ["Apakah nama usungan jenazah diraja?", "Seraja Diraja."],
  [
    "Namakan pelabuhan perdagangan penting di Perak, Selangor dan Terengganu.",
    "Kuala Sungai Perak, Kuala Selangor, Pangkalan Batu dan Kuala Terengganu.",
  ],
  ["Apakah kegiatan ekonomi utama di Perak dan Selangor?", "Perlombongan bijih timah."],
  ["Siapakah pengarang Hikayat Pahang?", "Haji Muhammad Nor."],
  ["Siapakah pengarang Misa Melayu?", "Raja Chulan."],
  ["Siapakah pengarang Syair Tawarikh Zainal Abidin Ketiga?", "Tengku Dalam Kalthum."],
  ["Siapakah pengarang Kenang-Kenangan Selangor?", "Wan Muhamad Amin."],
  ["Siapakah yang menyalin Kitab Tib?", "Haji Mahmud al-Jawi."],
  ["Bilakah Kitab Tib disalin?", "Tahun 1819."],
  ["Apakah mata wang bongkah timah Perak?", "Bidor."],
  ["Apakah mata wang emas Terengganu?", "Kupang emas."],
  ["Apakah pelabuhan entrepot Terengganu pada abad ke-18?", "Kuala Terengganu."],
  [
    "Apakah tujuan utama kegiatan ekonomi sara diri?",
    "Menampung keperluan harian dan menjual lebihan hasil.",
  ],
];

export const sejarahF2C7Flashcards: Flashcard[] = cardContent.map(([front, back], index) => ({
  id: `sej-f2-c7-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 2",
  chapter: "Chapter 7",
  front,
  back,
}));
