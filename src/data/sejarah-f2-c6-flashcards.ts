import type { Flashcard } from "./types";

const cardContent: Array<[front: string, back: string]> = [
  // Set 1: Pengasasan, Cabaran dan Strategi
  ["Siapakah pengasas Kesultanan Johor Riau?", "Raja Ali."],
  ["Raja Ali ialah putera kepada siapa?", "Sultan Mahmud Shah dan Tun Fatimah."],
  [
    "Apakah gelaran Raja Ali selepas mengasaskan Kesultanan Johor Riau?",
    "Sultan Alauddin Riayat Shah I.",
  ],
  ["Bilakah Kesultanan Johor Riau diasaskan?", "Tahun 1528."],
  [
    "Apakah yang diwarisi Johor Riau daripada Kesultanan Melayu Melaka?",
    "Sistem pemerintahan dan pentadbiran serta wilayah jajahan takluk dan naungan.",
  ],
  [
    "Di manakah Sultan Alauddin Riayat Shah I membina pusat pemerintahan pada tahun 1528?",
    "Kota Kara, Pekan Tua.",
  ],
  [
    "Apakah kelebihan kedudukan Kota Kara?",
    "Terletak berhampiran sungai yang lebar dan dalam yang memudahkan kapal keluar masuk.",
  ],
  [
    "Bagaimanakah Kota Kara dipertahankan?",
    "Dikelilingi kawasan berbukit-bukau dan diperkukuh dengan pancang kayu besar setinggi 40 kaki, bedil dan meriam.",
  ],
  [
    "Apakah yang berlaku kepada Kota Kara pada tahun 1535?",
    "Diserang dan dimusnahkan oleh Portugis.",
  ],
  [
    "Mengapakah Kota Sayong lebih selamat?",
    "Kapal perang musuh sukar melintasi sungainya yang sempit.",
  ],
  [
    "Ke manakah pusat pemerintahan Johor Riau dipindahkan pada tahun 1540?",
    "Kota Batu, Johor Lama.",
  ],
  ["Apakah nama lain Kota Batu?", "Tanjung Batu."],
  [
    "Apakah empat cabaran utama yang dihadapi Kesultanan Johor Riau?",
    "Persaingan Johor-Acheh-Portugis, Perang Johor-Jambi, konflik pembesar dan ancaman Raja Kechil.",
  ],
  ["Apakah tujuan persaingan Johor, Acheh dan Portugis?", "Menguasai perdagangan di Selat Melaka."],
  [
    "Apakah nama persaingan antara Johor, Acheh dan Portugis?",
    "Perang Tiga Segi atau Perang Seratus Tahun.",
  ],
  [
    "Mengapakah Johor menyerang Portugis di Melaka?",
    "Untuk merampas semula Melaka daripada Portugis.",
  ],
  ["Apakah punca Perang Johor-Jambi?", "Johor menuntut wilayah Tungkal daripada Jambi."],
  [
    "Apakah kesudahan serangan Johor terhadap Jambi pada Jun 1679?",
    "Jambi tewas dan tunduk di bawah kuasa Kesultanan Johor Riau yang berpusat di Riau.",
  ],
  [
    "Siapakah dua pembesar yang berkonflik untuk menguasai pemerintahan Johor Riau?",
    "Bendahara Tun Habib Abdul Majid dan Laksamana Tun Abdul Jamil.",
  ],
  [
    "Apakah tiga strategi utama Johor Riau menghadapi cabaran?",
    "Memindahkan pusat pemerintahan, membina kota pertahanan dan menjalinkan hubungan dengan Belanda.",
  ],

  // Set 2: Perdagangan dan Pengurusan Pelabuhan
  [
    "Mengapakah Johor Lama, Batu Sawar dan Panchor mudah dimudiki kapal besar?",
    "Sungai Johor lebar dan dalam.",
  ],
  [
    "Apakah kelebihan pelabuhan Johor Riau di selatan Selat Melaka?",
    "Membolehkannya mengawal lalu lintas kapal dagang dari Timur dan Barat.",
  ],
  [
    "Mengapakah pelabuhan Riau menjadi tumpuan pedagang luar?",
    "Terletak di persimpangan lalu lintas maritim yang strategik.",
  ],
  [
    "Pedagang dari manakah yang menjadi tumpuan di Johor Riau?",
    "China, Gujerat, Belanda dan Inggeris.",
  ],
  [
    "Mengapakah pedagang Jawa memilih pelabuhan Johor?",
    "Mereka tidak berminat berdagang dengan Portugis di Melaka.",
  ],
  ["Apakah hasil pertanian yang dipasarkan oleh pedagang Siam?", "Beras."],
  [
    "Apakah fungsi Johor Riau sebagai pusat pengumpulan dan pengedaran?",
    "Menjadi pusat pertukaran barangan Alam Melayu dengan barangan dari China, India dan Arab.",
  ],
  [
    "Apakah barangan utama yang dibekalkan oleh jajahan dan naungan Johor?",
    "Lada hitam, bijih timah dan emas.",
  ],
  [
    "Dari manakah bijih timah dibawa ke pelabuhan Johor Riau?",
    "Klang, Sungai Ujong, Bernam dan Pulau Bangka.",
  ],
  ["Dari manakah lada hitam dan emas dibawa?", "Lada hitam dari Jambi dan emas dari Inderagiri."],
  [
    "Namakan barangan dari China yang diperdagangkan di Johor Riau.",
    "Benang emas, kain sutera putih, tembikar, seramik, kuali besi, teh dan tembaga.",
  ],
  ["Apakah barangan yang dibawa pedagang Gujerat?", "Kain, wangian dan manik."],
  [
    "Berapakah kapal dagang yang berlabuh di pelabuhan Johor Riau?",
    "Antara 500 hingga 600 buah kapal.",
  ],
  [
    "Apakah kemudahan yang disediakan di pelabuhan Johor Riau?",
    "Gudang bawah tanah, pegawai terlatih dan bekalan barangan yang diperlukan pedagang.",
  ],
  [
    "Bagaimanakah urusan jual beli dijalankan di Johor Riau?",
    "Secara tukar barang dan menggunakan mata wang.",
  ],
  [
    "Apakah mata wang Johor Riau yang diperkenalkan oleh Sultan Alauddin Riayat Shah I?",
    "Mas untuk emas, kupang untuk perak dan katun untuk timah.",
  ],
  [
    "Apakah tugas syahbandar di pelabuhan Johor Riau?",
    "Mengurus jual beli dan kutipan cukai serta menetapkan ukuran dan berat timbangan barangan.",
  ],
  [
    "Siapakah yang memberikan naungan kepada pedagang dalam Sistem Naungan?",
    "Bendahara, Temenggung, Laksamana dan Raja Indera Bongsu.",
  ],
  [
    "Apakah balasan pedagang kepada pihak yang memberikan naungan?",
    "Sebahagian hasil keuntungan diberikan dalam bentuk cukai perdagangan.",
  ],
  [
    "Apakah peranan Orang Laut dalam kegemilangan pelabuhan Johor Riau?",
    "Menjadi pengawal pelabuhan, penunda kapal, penunjuk arah, pengawal perairan dan tentera angkatan laut serta mahir membina kapal.",
  ],

  // Set 3: Strategi, Persuratan dan Warisan Johor Riau
  ["Bilakah Raja Kechil menyerang Johor?", "Tahun 1718."],
  [
    "Raja Kechil mendakwa dirinya putera siapa?",
    "Sultan Mahmud Shah I, Sultan Mahmud Mangkat Dijulang.",
  ],
  [
    "Apakah gelaran yang digunakan Raja Kechil selepas mengisytiharkan dirinya sebagai Sultan Johor Riau?",
    "Sultan Abdul Jalil Rahmat Shah.",
  ],
  [
    "Siapakah yang diminta membantu Raja Sulaiman mengusir Raja Kechil?",
    "Opu Bugis Lima Bersaudara.",
  ],
  ["Bilakah Raja Kechil berjaya dikalahkan?", "4 Oktober 1722."],
  ["Siapakah Yamtuan Muda Bugis pertama di Johor?", "Daeng Merewah."],
  ["Bilakah hubungan Johor dengan Belanda bermula?", "Tahun 1602."],
  ["Bilakah Perjanjian Johor-Belanda ditandatangani?", "17 Mei 1606."],
  [
    "Di atas kapal apakah Perjanjian Johor-Belanda ditandatangani?",
    "Kapal Belanda bernama Oranje.",
  ],
  [
    "Bilakah Portugis di Melaka berjaya ditewaskan dengan bantuan Johor kepada Belanda?",
    "Januari 1641.",
  ],
  [
    "Apakah dua bidang utama kegemilangan Kesultanan Johor Riau?",
    "Perdagangan dan persuratan Melayu.",
  ],
  [
    "Apakah maksud karya agung?",
    "Karya bahasa Melayu yang mencetuskan pemikiran, nilai, kepercayaan, falsafah atau pandangan hidup bangsa Melayu.",
  ],
  [
    "Apakah dua pusat penting perkembangan persuratan Johor Riau?",
    "Batu Sawar dan Pulau Penyengat, Riau.",
  ],
  ["Apakah maksud Sulalatus Salatin?", "Salasilah Raja-Raja atau Peraturan Segala Raja-Raja."],
  ["Apakah nama asal Sulalatus Salatin?", "Hikayat Melayu."],
  [
    "Siapakah yang menyusun dan menulis semula Sulalatus Salatin pada tahun 1612?",
    "Tun Seri Lanang.",
  ],
  [
    "Apakah kandungan utama Sulalatus Salatin?",
    "Asal usul raja-raja Melaka, adat istiadat kerajaan dan sejarah Kesultanan Melayu Melaka.",
  ],
  [
    "Apakah tema utama Hikayat Hang Tuah?",
    "Ketaatan dan kesetiaan Hang Tuah kepada raja serta Kesultanan Melayu Melaka.",
  ],
  [
    "Namakan karya yang dikarang oleh Raja Ali Haji.",
    "Tuhfat al-Nafis, Salasilah Melayu dan Bugis dan Gurindam Dua Belas.",
  ],
  [
    "Apakah peristiwa yang menamatkan sistem pemerintahan bercorak empayar Kesultanan Johor Riau?",
    "Perjanjian Inggeris-Belanda 1824.",
  ],
];

export const sejarahF2C6Flashcards: Flashcard[] = cardContent.map(([front, back], index) => ({
  id: `sej-f2-c6-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 2",
  chapter: "Chapter 6",
  front,
  back,
}));
