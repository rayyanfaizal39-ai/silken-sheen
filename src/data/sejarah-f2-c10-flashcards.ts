import type { Flashcard } from "./types";

const cardContent: Array<[front: string, back: string]> = [
  // Set 1: Hubungan Alam Melayu dan pemerintahan tempatan
  ["Di pulau manakah Sarawak dan Sabah terletak?", "Pulau Borneo."],
  ["Apakah kegiatan awal di Bukit Tengkorak?", "Pembuatan tembikar."],
  ["Apakah barang yang dieksport Chu-Po?", "Besi."],
  ["Apakah pusat perdagangan utama Sarawak pada abad ketujuh?", "Santubong."],
  ["Bilakah Kesultanan Melayu Brunei muncul?", "Abad ke-14."],
  ["Kerajaan manakah menyerahkan wilayah Sarawak kepada Brunei?", "Kerajaan Sambas."],
  ["Di manakah Kesultanan Sulu meluaskan pengaruhnya?", "Pantai timur laut Borneo."],
  ["Apakah kesan kemunculan Kesultanan Sulu terhadap utara Sabah?", "Perdagangan meningkat."],
  ["Apakah hasil utama yang menarik pedagang China ke utara Sabah?", "Sarang burung."],
  ["Apakah industri yang berkembang di Santubong pada abad ke-13?", "Peleburan bijih besi."],
  [
    "Siapakah Ketua Bebas yang terkenal di Sabah dan kawasan kekuasaan mereka?",
    "Syarif Osman menguasai Marudu, manakala Datu Kurunding menguasai Tungku. Mereka mentadbir wilayah dan menjalankan undang-undang sendiri.",
  ],
  ["Di manakah Brunei menyebarkan agama Islam?", "Pesisir Sarawak dan Sabah."],
  ["Di manakah Sulu menyebarkan agama Islam?", "Pantai timur Sabah."],
  ["Apakah gelaran ketua masyarakat Iban?", "Tuai Rumah."],
  ["Apakah gelaran ketua masyarakat Kayan?", "Kelunan Maren atau Hipun Uma."],
  [
    "Apakah peranan wakil raja di Sarawak dan Sabah?",
    "Menjalankan pemerintahan dalam aspek kehakiman, menjaga keamanan dan kebajikan penduduk serta mengutip cukai daripada penduduk dan kegiatan perdagangan.",
  ],
  [
    "Namakan kerajaan awal yang muncul di lembah sungai Sarawak.",
    "Sawaku, Samadong, Kalka, Saribas dan Melano.",
  ],
  ["Apakah bentuk pemerintahan di lembah sungai Sarawak?", "Kerajaan dan wakil raja."],
  [
    "Bagaimanakah kepimpinan kesukuan di pedalaman Sabah diuruskan?",
    "Ketua masyarakat dikenali sebagai Orang Tua, manakala Bobohizan atau Bobolian bagi Kadazandusun dan Babalian bagi Murut mengurus adat serta pantang larang.",
  ],
  [
    "Apakah tiga corak kepimpinan lembah sungai Sabah?",
    "Wakil Brunei, wakil Sulu dan ketua bebas.",
  ],

  // Set 2: Kegiatan ekonomi dan kepentingan sungai
  [
    "Apakah kegiatan ekonomi pedalaman Sarawak?",
    "Mengutip hasil hutan, memburu haiwan liar dan menanam padi.",
  ],
  ["Apakah tanaman utama pedalaman Sarawak?", "Padi."],
  [
    "Kaum manakah menjalankan ekonomi pedalaman Sarawak?",
    "Iban, Kenyah, Penan, Kayan, Kelabit dan Punan.",
  ],
  ["Apakah kegiatan ekonomi lembah sungai Sarawak?", "Menanam padi."],
  ["Apakah tanaman lain di lembah sungai Sarawak?", "Sayur-sayuran dan buah-buahan."],
  ["Apakah kegiatan ekonomi pesisir Sarawak?", "Perdagangan dan menangkap ikan."],
  ["Apakah hasil utama kaum Melanau di pesisir Sarawak?", "Sagu."],
  [
    "Apakah kegiatan ekonomi pedalaman Sabah?",
    "Mengutip hasil hutan, menanam padi dan mengutip sarang burung.",
  ],
  ["Kaum manakah menjalankan ekonomi pedalaman Sabah?", "Murut."],
  ["Apakah kegiatan ekonomi lembah sungai Sabah?", "Menanam padi."],
  [
    "Kaum manakah menjalankan ekonomi lembah sungai Sabah?",
    "Rungus, Kadazandusun dan Orang Sungai.",
  ],
  [
    "Apakah kegiatan ekonomi pesisir Sabah?",
    "Menangkap ikan, membuat perahu, mengutip hasil laut dan menjalankan perdagangan.",
  ],
  ["Kaum manakah menjalankan ekonomi pesisir Sabah?", "Melayu Brunei, Bajau, Iranun dan Suluk."],
  ["Apakah kegunaan harian air sungai?", "Minuman, mandi dan mencuci."],
  ["Apakah pengangkutan utama di sungai?", "Sampan dan bot."],
  ["Apakah fungsi pengangkutan sungai?", "Membawa penumpang dan barang."],
  ["Apakah bentuk petempatan di sungai?", "Kampung air."],
  [
    "Apakah fungsi sungai dalam perdagangan?",
    "Menjadi tempat kegiatan perdagangan dan jual beli sejak zaman-berzaman.",
  ],
  ["Apakah kegiatan rekreasi yang diadakan di sungai?", "Pesta regata."],
  [
    "Apakah kepentingan sungai sebagai sumber rezeki?",
    "Sungai menjadi sumber rezeki kepada penduduk yang tinggal di kawasan sekitarnya.",
  ],

  // Set 3: Masyarakat, perayaan, tarian dan seni bina
  ["Dari manakah Iban dan Bidayuh berasal?", "Iban dari Sungai Kapuas; Bidayuh dari Sungkung."],
  [
    "Apakah Pua Kumbu dan siapakah yang menghasilkannya?",
    "Pua Kumbu ialah hasil tenunan kain kapas kaum Iban yang digunakan dalam majlis kelahiran, perkahwinan dan kematian.",
  ],
  [
    "Namakan contoh hasil kesenian masyarakat Sarawak.",
    "Keringkam oleh masyarakat Melayu, terendak oleh Melanau dan Patung Burung Kenyalang oleh Iban.",
  ],
  [
    "Apakah keunikan Bajau dan kawasan petempatan Murut?",
    "Bajau terkenal berkuda; Murut di Tenom hingga Kalabakan.",
  ],
  [
    "Namakan contoh hasil kesenian masyarakat Sabah.",
    "Inavol oleh Rungus, dastar oleh Iranun, wakid, tayen dan buan oleh masyarakat pedalaman serta duang oleh Bajau/Sama.",
  ],
  [
    "Apakah Gawai Dayak dan siapakah yang menyambutnya?",
    "Pesta menuai yang disambut oleh Iban, Bidayuh dan Orang Ulu. Masyarakat Iban turut mengadakan upacara Miring sebagai tanda terima kasih kepada petara.",
  ],
  [
    "Apakah tujuan Pesta Kaul masyarakat Melanau?",
    "Diadakan untuk mengelakkan malapetaka buruk oleh roh jahat yang dikenali sebagai Ipok, dan antara acaranya ialah permainan Tibau.",
  ],
  [
    "Apakah Pesta Kaamatan dan siapakah yang menyambutnya?",
    "Perayaan kesyukuran masyarakat Kadazandusun dan Murut untuk meraikan semangat padi Bambaazon atau Bambarayon.",
  ],
  [
    "Apakah tujuan Pesta Regata Lepa?",
    "Memperingati peranan lepa dalam kehidupan kaum Bajau/Sama di pantai timur Sabah, dengan acara menghias lepa dan perlumbaan perahu.",
  ],
  [
    "Apakah keunikan tarian Ngajat dan Datun Julud di Sarawak?",
    "Ngajat ditarikan oleh Iban dan Orang Ulu, manakala Datun Julud berasal daripada Orang Ulu sebagai lambang kegembiraan dan terima kasih serta diiringi alat muzik sape.",
  ],
  [
    "Apakah keunikan persembahan Bermukun?",
    "Gendang dipalu oleh wanita, penarinya hanya lelaki dan para pemukul gendang berbalas pantun. Persembahan ini biasa diadakan semasa majlis perkahwinan.",
  ],
  ["Siapakah yang menarikan Sumazau?", "Kadazandusun."],
  ["Siapakah yang menarikan Magunatip?", "Murut."],
  ["Siapakah yang menarikan Limbai?", "Bajau/Sama."],
  ["Siapakah penghuni rumah panjang Sarawak?", "Iban, Bidayuh dan Orang Ulu."],
  ["Siapakah penghuni rumah tinggi Sarawak?", "Melanau."],
  ["Kaum manakah membina rumah Baruk?", "Bidayuh."],
  ["Apakah nama rumah panjang Rungus?", "Vinatang."],
  ["Apakah nama rumah panjang Murut?", "Tulus atau Pahun."],
  ["Apakah fungsi lepa bagi Bajau/Sama?", "Pengangkutan dan tempat tinggal."],
];

export const sejarahF2C10Flashcards: Flashcard[] = cardContent.map(([front, back], index) => ({
  id: `sej-f2-c10-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 2",
  chapter: "Chapter 10",
  front,
  back,
}));
