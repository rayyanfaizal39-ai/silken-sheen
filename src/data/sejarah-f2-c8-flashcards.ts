import type { Flashcard } from "./types";

const cardContent: Array<[front: string, back: string]> = [
  // Set 1: Kerajaan, pengasas, pusat pemerintahan dan tokoh penting
  ["Siapakah pengasas Kerajaan Kedah?", "Maharaja Derbar Raja."],
  ["Bilakah Kerajaan Kedah diasaskan?", "Sekitar tahun 630 Masihi."],
  [
    "Bagaimanakah Maharaja Derbar Raja menjadi Raja Kedah?",
    "Maharaja Derbar Raja dari Parsi dilantik oleh Tan Dermadewa dan Tun Perkasa, manakala nobat yang dibawa dari Parsi diiktiraf sebagai alat kebesaran.",
  ],
  ["Di manakah pusat pemerintahan awal Kedah?", "Sungai Mas."],
  ["Siapakah yang mengasaskan Alor Setar?", "Sultan Muhammad Jiwa Zainal Adilin Mu'adzam Shah II."],
  ["Siapakah pengasas Negara Patani Besar?", "Raja Sakti I."],
  ["Siapakah pengasas Kerajaan Kelantan?", "Long Yunus pada tahun 1762."],
  ["Apakah gelaran Long Yunus selepas mengasaskan Kerajaan Kelantan?", "Yang di-Pertuan Kelantan."],
  ["Di manakah pusat pemerintahan Long Yunus pada tahun 1777?", "Kota Galoh."],
  [
    "Apakah sumbangan Sultan Muhammad II kepada Kelantan?",
    "Mengasaskan Kota Bharu sebagai pusat pemerintahan pada tahun 1844, membina Istana Balai Besar dan menguatkuasakan undang-undang syarak.",
  ],
  ["Siapakah pengasas Kerajaan Negeri Sembilan?", "Raja Melewar pada tahun 1773."],
  [
    "Apakah tindakan empat Penghulu Luak pada tahun 1770?",
    "Menghantar utusan untuk menjemput anak raja Minangkabau di Sumatera bagi dirajakan di Negeri Sembilan.",
  ],
  ["Di manakah pusat pemerintahan awal Negeri Sembilan?", "Seri Menanti."],
  ["Apakah gelaran Raja Melewar?", "Yamtuan Seri Menanti."],
  [
    "Siapakah yang memilih pemerintah Negeri Sembilan?",
    "Undang Yang Empat, iaitu Sungai Ujong, Jelebu, Johol dan Rembau.",
  ],
  ["Siapakah pemerintah awal Kerajaan Perlis?", "Syed Hussin Jamalullail."],
  ["Bilakah Syed Hussin Jamalullail diiktiraf sebagai pemerintah Perlis?", "Tahun 1843."],
  ["Di manakah pusat pemerintahan Kerajaan Perlis?", "Arau."],
  [
    "Apakah yang berlaku kepada wilayah Kedah di bawah pengaruh Siam pada tahun 1839?",
    "Wilayah Kedah dipecahkan kepada empat unit pentadbiran, iaitu Setul, Perlis, Kubang Pasu dan Kedah.",
  ],
  ["Siapakah yang membangunkan Kota Kayang II?", "Sultan Dhiauddin Mukarram Shah II."],

  // Set 2: Asas hubungan dan hubungan diplomatik
  ["Apakah persamaan yang mewujudkan keserumpunan?", "Bahasa dan budaya."],
  ["Apakah kesan keserumpunan terhadap kerajaan Melayu?", "Memudahkan interaksi."],
  ["Apakah sikap kerajaan Melayu terhadap budaya kerajaan lain?", "Toleransi."],
  ["Apakah faktor geografi yang memudahkan perhubungan?", "Sempadan berjiran."],
  ["Apakah laluan perhubungan yang dikongsi antara negeri?", "Sungai."],
  ["Di manakah pelabuhan dibentuk untuk menggalakkan hubungan?", "Di pinggir sungai."],
  ["Apakah tarikan geografi dalam hubungan antara negeri?", "Sumber alam dan sumber bumi."],
  ["Apakah agama yang diterima oleh pemerintah kerajaan Melayu?", "Agama Islam."],
  ["Siapakah yang memperkukuh kegiatan keagamaan?", "Ulama."],
  [
    "Apakah tujuan Perlis menghantar Bunga Mas kepada Siam?",
    "Dihantar setiap tiga tahun sebagai tanda persahabatan dan untuk menjamin keselamatan.",
  ],
  ["Apakah tujuan pengiktirafan diplomatik?", "Mengabsahkan sultan sebagai pemerintah."],
  ["Siapakah yang mengiktiraf kedaulatan Kedah pada abad ke-15?", "Sultan Mahmud Shah."],
  ["Siapakah yang mengiktiraf Kelantan pada tahun 1775?", "Sultan Terengganu."],
  ["Apakah tujuan hubungan pertahanan?", "Mengekalkan kedaulatan."],
  ["Kerajaan manakah membantu Long Yunus menyatukan Kelantan?", "Terengganu dan Reman."],
  [
    "Apakah jawatan Long Gaffar dalam pemerintahan Kelantan?",
    "Perdana Menteri Kelantan merangkap Panglima Perang.",
  ],
  ["Siapakah puteri Kelantan yang berkahwin dengan Sultan Mahmud Shah?", "Onang Kening."],
  ["Siapakah puteri Long Yunus yang berkahwin dengan Tengku Muhammad?", "Che' Ku Wan."],
  ["Siapakah isteri Raja Syed Hussin?", "Tengku Nor Asiah."],
  [
    "Apakah kesan perkahwinan diraja terhadap hubungan kerajaan?",
    "Mengukuhkan hubungan dan menjamin kedaulatan sesebuah kerajaan.",
  ],

  // Set 3: Hubungan perdagangan, barang dagangan dan kesannya
  ["Apakah yang menjadi asas hubungan perdagangan?", "Pelabuhan dan hasil tempatan."],
  ["Siapakah pedagang tempatan di pelabuhan kerajaan Melayu?", "Pedagang Melaka, Perak dan Johor."],
  ["Di sungai manakah Pangkalan Kuala Merbok terletak?", "Sungai Merbok."],
  ["Di sungai manakah Pangkalan Kuala Muda terletak?", "Sungai Muda."],
  ["Apakah hasil pertanian utama yang diperdagangkan Kedah?", "Beras."],
  ["Apakah logam yang diperdagangkan Kedah?", "Emas urai."],
  ["Apakah haiwan yang dibekalkan Kedah untuk perdagangan entrepot?", "Gajah."],
  ["Apakah pangkalan perdagangan Kelantan?", "Pangkalan Galoh."],
  ["Apakah mata wang perdagangan Kelantan?", "Dinar."],
  ["Apakah barang dagangan utama Kelantan?", "Emas."],
  ["Di sungai manakah pangkalan Negeri Sembilan terletak?", "Sungai Linggi."],
  ["Apakah logam yang diperdagangkan Negeri Sembilan?", "Bijih timah."],
  ["Apakah hasil hutan wangi yang diperdagangkan Negeri Sembilan?", "Kayu gaharu."],
  ["Apakah pelabuhan perdagangan Perlis?", "Kuala Perlis."],
  ["Apakah hasil pertanian yang diperdagangkan Perlis?", "Beras."],
  [
    "Dengan siapakah Perlis menjalankan perdagangan beras dan bijih timah?",
    "Negeri jiran dan Siam.",
  ],
  ["Apakah kesan pengiktirafan terhadap pemerintah?", "Mengukuhkan kedaulatan."],
  ["Apakah kesan kerjasama pertahanan terhadap kerajaan?", "Menjamin keselamatan."],
  ["Apakah kesan pembinaan pelabuhan?", "Mengembangkan perdagangan."],
  ["Apakah kesan kepelbagaian barang dagangan?", "Menarik kedatangan pedagang."],
];

export const sejarahF2C8Flashcards: Flashcard[] = cardContent.map(([front, back], index) => ({
  id: `sej-f2-c8-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 2",
  chapter: "Chapter 8",
  front,
  back,
}));
