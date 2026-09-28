import type { Flashcard } from "./types";

const cardContent: Array<[front: string, back: string]> = [
  // Deck 1: Pengasasan Kesultanan Melayu Melaka
  ["Siapakah pengasas Kesultanan Melayu Melaka?", "Parameswara."],
  ["Bilakah Kesultanan Melayu Melaka diasaskan?", "Sekitar tahun 1400."],
  [
    "Di manakah Parameswara memilih lokasi untuk membentuk kerajaan Melaka?",
    "Di muara Sungai Bertam.",
  ],
  ["Apakah nama lain Sungai Bertam?", "Sungai Melaka."],
  ["Apakah keadaan asal kawasan muara Sungai Bertam?", "Sebuah perkampungan nelayan."],
  [
    "Apakah kegiatan yang dijalankan di muara Sungai Bertam sebelum Melaka berkembang?",
    "Berjual beli dan pertukaran barang dagangan.",
  ],
  [
    "Apakah empat faktor pemilihan lokasi strategik Melaka?",
    "Laluan perdagangan, bentuk muka bumi, benteng pertahanan dan terlindung daripada angin monsun.",
  ],
  [
    "Mengapakah kedudukan Melaka penting dari segi laluan perdagangan?",
    "Melaka terletak di laluan perdagangan utama antara timur dengan barat.",
  ],
  [
    "Apakah kelebihan Melaka berada di laluan perdagangan utama?",
    "Membolehkan Melaka mengawal laluan kapal dagang.",
  ],
  ["Di selat manakah Melaka terletak?", "Selat Melaka."],
  [
    "Bagaimanakah bentuk muka bumi Melaka membantu pertahanan?",
    "Kawasan berbukit-bukau sesuai dijadikan benteng pertahanan.",
  ],
  [
    "Bagaimanakah kawasan berbukit-bukau membantu kapal dagang?",
    "Menjadi panduan kepada kapal dagang.",
  ],
  [
    "Apakah tumbuhan yang menjadi benteng pertahanan semula jadi Melaka?",
    "Pokok bakau dan api-api.",
  ],
  [
    "Apakah kelebihan pokok bakau dan api-api di pesisir pantai Melaka?",
    "Menjadi benteng pertahanan dan pelindung semula jadi yang sukar ditembusi musuh.",
  ],
  ["Melaka terlindung daripada tiupan apa?", "Angin monsun."],
  [
    "Apakah kesan Melaka terlindung daripada angin monsun?",
    "Kapal dagang dapat datang dan berlabuh dengan selamat.",
  ],
  [
    "Bagaimanakah Parameswara memanfaatkan alam semula jadi Melaka?",
    "Memanfaatkan lokasi strategik dan alam semula jadi untuk membangunkan sebuah pelabuhan.",
  ],
  [
    "Apakah yang berlaku kepada perkampungan nelayan selepas lokasi Melaka dimanfaatkan?",
    "Berkembang menjadi sebuah pelabuhan yang maju.",
  ],
  [
    "Apakah kesan kebijaksanaan Parameswara memilih lokasi Melaka?",
    "Melaka muncul sebagai pusat perdagangan antarabangsa.",
  ],
  [
    "Apakah kepentingan kedudukan strategik dalam pengasasan Melaka?",
    "Membantu Melaka berkembang menjadi kerajaan yang unggul di Alam Melayu.",
  ],

  // Deck 2: Faktor dan Aspek Kegemilangan
  [
    "Apakah tiga faktor utama kegemilangan Kesultanan Melayu Melaka?",
    "Kepemimpinan raja yang berwibawa, sistem pentadbiran yang cekap dan sistem perundangan yang tersusun.",
  ],
  [
    "Apakah kedudukan raja dalam pemerintahan Melaka?",
    "Ketua pemerintah dan ketua kerajaan yang mempunyai kuasa tertinggi.",
  ],
  [
    "Apakah peranan utama raja Melaka?",
    "Simbol perpaduan dan kemakmuran, ketua angkatan tentera, ketua hubungan diplomatik, penyelaras ekonomi, Ketua Agama Islam dan penegak keadilan.",
  ],
  [
    "Apakah maksud daulat dalam Kesultanan Melayu Melaka?",
    "Kuasa dan kewibawaan raja sebagai pemimpin.",
  ],
  [
    "Bagaimanakah rakyat mengakui kedaulatan raja?",
    "Dengan memberikan taat setia sepenuhnya dan tidak menderhaka.",
  ],
  ["Namakan alat kebesaran diraja Melaka.", "Cap mohor, nobat, keris, lembing dan mahkota."],
  [
    "Apakah Sistem Pembesar Empat Lipatan?",
    "Sistem pentadbiran yang mempunyai pembesar pada setiap peringkat untuk membantu melicinkan pentadbiran.",
  ],
  [
    "Apakah empat peringkat pembesar dalam Sistem Pembesar Empat Lipatan?",
    "Pembesar Berempat, Pembesar Berlapan, Pembesar Enam Belas dan Pembesar Tiga Puluh Dua.",
  ],
  [
    "Siapakah Pembesar Berempat Kesultanan Melayu Melaka?",
    "Bendahara, Penghulu Bendahari, Temenggung dan Laksamana.",
  ],
  [
    "Apakah tugas utama pembesar Melaka?",
    "Menjaga keamanan, mengutip cukai dan hasil, membekalkan tentera serta menyediakan tenaga buruh.",
  ],
  [
    "Apakah maksud Sistem Serah?",
    "Pemberian sebahagian hasil tanaman rakyat kepada pemerintah sebagai balasan kepada pembesar yang menyediakan tanah.",
  ],
  [
    "Apakah maksud Sistem Kerah?",
    "Pekerjaan yang dilakukan tanpa upah seperti membina istana, kubu, jalan dan saliran.",
  ],
  [
    "Apakah kawasan yang dikurniakan kepada Pembesar Berempat dikenali sebagai?",
    "Kawasan pegangan.",
  ],
  ["Apakah kawasan pembesar jajahan dan daerah dikenali sebagai?", "Kawasan pemakanan."],
  [
    "Apakah dua undang-undang bertulis utama Kesultanan Melayu Melaka?",
    "Hukum Kanun Melaka dan Undang-Undang Laut Melaka.",
  ],
  ["Berapakah fasal dalam Hukum Kanun Melaka?", "44 fasal."],
  [
    "Apakah perkara yang terkandung dalam Hukum Kanun Melaka?",
    "Hak dan tanggungjawab raja serta pembesar, jenayah, jual beli dan kekeluargaan.",
  ],
  ["Berapakah fasal dalam Undang-Undang Laut Melaka?", "25 fasal."],
  ["Apakah tujuan Undang-Undang Laut Melaka?", "Menentukan peraturan pelayaran dan perdagangan."],
  [
    "Apakah tiga cara pembentukan empayar Kesultanan Melayu Melaka?",
    "Penaklukan, perkahwinan dan naungan.",
  ],

  // Deck 3: Empayar, Perdagangan dan Pengakhiran Melaka
  [
    "Sejauh manakah empayar Kesultanan Melayu Melaka berkembang?",
    "Meliputi seluruh Semenanjung Tanah Melayu dan kawasan pantai timur Sumatera.",
  ],
  [
    "Apakah kepentingan politik pembentukan empayar Melaka?",
    "Meluaskan wilayah, mengukuhkan hubungan dengan kerajaan taklukan dan menyekat pengaruh kuasa serantau.",
  ],
  [
    "Apakah kepentingan ekonomi pembentukan empayar Melaka?",
    "Menerima hadiah dan bekalan serta menguasai perdagangan di Selat Melaka.",
  ],
  ["Siapakah pemerintah Melaka yang memeluk Islam pada tahun 1414?", "Sultan Iskandar Shah."],
  ["Siapakah yang menjadikan Islam agama rasmi Kesultanan Melayu Melaka?", "Sultan Muzaffar Shah."],
  [
    "Apakah cara penyebaran Islam oleh Kesultanan Melayu Melaka?",
    "Pengislaman pemerintah, perkahwinan, peranan ulama dan mubaligh, perdagangan serta peluasan kuasa.",
  ],
  [
    "Apakah fungsi pelabuhan Melaka sebagai pelabuhan entrepot?",
    "Mengumpulkan barangan dari Alam Melayu dan mengedarkan barangan dari timur dan barat.",
  ],
  [
    "Siapakah pedagang luar yang paling ramai mengunjungi Melaka?",
    "Pedagang Arab, China dan Gujerat.",
  ],
  [
    "Siapakah pedagang Alam Melayu yang paling ramai mengunjungi Melaka?",
    "Pedagang Pasai dan Jawa.",
  ],
  [
    "Apakah tugas utama syahbandar di pelabuhan Melaka?",
    "Mengurus pasar dan gudang, menjaga kebajikan dan keselamatan pedagang, memeriksa alat timbang, sukatan dan mata wang, mengurus cukai serta menguatkuasakan peraturan pelabuhan.",
  ],
  [
    "Apakah dua jenis cukai perdagangan di Melaka?",
    "Cukai rasmi yang dikenali sebagai panduan dan cukai tidak rasmi dalam bentuk hadiah.",
  ],
  [
    "Apakah dua bentuk urusan jual beli di Melaka?",
    "Pertukaran barangan dan penggunaan mata wang.",
  ],
  [
    "Apakah peranan Orang Laut dalam perdagangan Melaka?",
    "Menjadi pelayar dan penunjuk arah serta tentera yang menjaga keselamatan pedagang.",
  ],
  [
    "Apakah dua bentuk hubungan luar Kesultanan Melayu Melaka?",
    "Hubungan diplomatik dan perdagangan.",
  ],
  [
    "Namakan kerajaan Alam Melayu yang mempunyai hubungan dengan Melaka.",
    "Pasai, Demak, Majapahit dan Makasar.",
  ],
  [
    "Apakah masalah dalaman yang melemahkan Kesultanan Melayu Melaka?",
    "Masalah kepimpinan, pilih kasih, rasuah, penyelewengan, perbalahan pembesar dan masalah perpaduan.",
  ],
  ["Apakah matlamat Portugis datang ke Alam Melayu?", "Kekayaan, keagamaan dan kemasyhuran."],
  [
    "Apakah tujuan Portugis menyerang Melaka?",
    "Mengawal perdagangan rempah, menyebarkan agama Kristian dan menghapuskan penguasaan pedagang Islam.",
  ],
  ["Bilakah Portugis menyerang Melaka pada tahun 1511?", "25 Julai, 10 Ogos dan 24 Ogos 1511."],
  [
    "Bagaimanakah Sultan Mahmud Shah meneruskan perjuangan selepas kejatuhan Melaka?",
    "Baginda berundur ke Bentan, melancarkan tiga serangan antara tahun 1515 hingga 1519, kemudian berundur ke Kampar selepas Bentan dimusnahkan Portugis pada tahun 1526 dan mangkat pada tahun 1528.",
  ],
];

export const sejarahF2C5Flashcards: Flashcard[] = cardContent.map(([front, back], index) => ({
  id: `sej-f2-c5-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 2",
  chapter: "Chapter 5",
  front,
  back,
}));
