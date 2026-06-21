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
  ["Siapakah Ketua Bebas yang terkenal di Sabah?", "Syarif Osman dan Datu Kurunding."],
  ["Di manakah Brunei menyebarkan agama Islam?", "Pesisir Sarawak dan Sabah."],
  ["Di manakah Sulu menyebarkan agama Islam?", "Pantai timur Sabah."],
  ["Apakah gelaran ketua masyarakat Iban?", "Tuai Rumah."],
  ["Apakah gelaran ketua masyarakat Kayan?", "Kelunan Maren atau Hipun Uma."],
  ["Apakah gelaran ketua masyarakat Kenyah?", "Peran Lepo."],
  ["Apakah gelaran ketua masyarakat Kelabit?", "Laih Rayeh."],
  ["Apakah bentuk pemerintahan di lembah sungai Sarawak?", "Kerajaan dan wakil raja."],
  ["Apakah gelaran ketua kesukuan pedalaman Sabah?", "Orang Tua."],
  [
    "Apakah tiga corak kepimpinan lembah sungai Sabah?",
    "Wakil Brunei, wakil Sulu dan ketua bebas.",
  ],

  // Set 2: Kegiatan ekonomi dan kepentingan sungai
  ["Apakah kegiatan ekonomi pedalaman Sarawak?", "Mengutip hasil hutan."],
  ["Apakah tanaman utama pedalaman Sarawak?", "Padi bukit."],
  [
    "Kaum manakah menjalankan ekonomi pedalaman Sarawak?",
    "Iban, Kenyah, Penan, Kayan, Kelabit dan Punan.",
  ],
  ["Apakah kegiatan ekonomi lembah sungai Sarawak?", "Menanam padi."],
  ["Apakah tanaman lain di lembah sungai Sarawak?", "Sayur-sayuran dan buah-buahan."],
  ["Apakah kegiatan ekonomi pesisir Sarawak?", "Perdagangan dan menangkap ikan."],
  ["Apakah hasil utama kaum Melanau di pesisir Sarawak?", "Sagu."],
  ["Apakah kegiatan ekonomi pedalaman Sabah?", "Mengutip hasil hutan dan sarang burung."],
  ["Kaum manakah menjalankan ekonomi pedalaman Sabah?", "Murut."],
  ["Apakah kegiatan ekonomi lembah sungai Sabah?", "Menanam padi."],
  [
    "Kaum manakah menjalankan ekonomi lembah sungai Sabah?",
    "Rungus, Kadazandusun dan Orang Sungai.",
  ],
  ["Apakah kegiatan ekonomi pesisir Sabah?", "Berdagang dan menangkap hasil laut."],
  ["Kaum manakah menjalankan ekonomi pesisir Sabah?", "Berunai, Bajau/Sama, Iranun dan Suluk."],
  ["Apakah kegunaan harian air sungai?", "Minuman, mandi dan mencuci."],
  ["Apakah pengangkutan utama di sungai?", "Sampan dan bot."],
  ["Apakah fungsi pengangkutan sungai?", "Membawa penumpang dan barang."],
  ["Apakah bentuk petempatan di sungai?", "Kampung air."],
  ["Apakah fungsi sungai dalam perdagangan?", "Menjadi lokasi pelabuhan."],
  ["Apakah kegiatan rekreasi yang diadakan di sungai?", "Pesta regata."],
  ["Apakah sumber rezeki daripada sungai?", "Sumber makanan."],

  // Set 3: Masyarakat, perayaan, tarian dan seni bina
  ["Dari manakah Iban dan Bidayuh berasal?", "Iban dari Sungai Kapuas; Bidayuh dari Sungkung."],
  [
    "Di manakah Melayu dan Melanau banyak menetap di Sarawak?",
    "Melayu di pesisir; Melanau di kawasan tengah.",
  ],
  [
    "Siapakah Orang Ulu dan di manakah Kadazandusun menetap?",
    "Orang Ulu kaum pedalaman; Kadazandusun di Penampang hingga Ranau.",
  ],
  [
    "Apakah keunikan Bajau dan kawasan petempatan Murut?",
    "Bajau terkenal berkuda; Murut di Tenom hingga Kalabakan.",
  ],
  [
    "Di manakah Suluk dan Orang Sungai menetap?",
    "Suluk di pantai timur; Orang Sungai di lembah sungai utama Sabah.",
  ],
  ["Siapakah yang menyambut Hari Gawai?", "Iban, Bidayuh dan Orang Ulu."],
  ["Siapakah yang menyambut Pesta Kaul?", "Melanau."],
  ["Siapakah yang menyambut Pesta Kaamatan?", "Kadazandusun dan Murut."],
  ["Kaum manakah menganjurkan Regatta Lepa?", "Bajau/Sama."],
  ["Siapakah yang menarikan Ngajat?", "Iban dan Orang Ulu."],
  ["Apakah acara persembahan Bermukun?", "Bergendang, berpantun dan menari."],
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
