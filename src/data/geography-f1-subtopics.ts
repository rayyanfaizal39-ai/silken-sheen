import type { Subtopic } from "./sejarah-f1-subtopics";

export type { Subtopic };

// Geography Form 1 (KSSM) subtopics, keyed by chapter (e.g. "Chapter 1").
// Summaries derived from the existing Geography notes in src/data/notes.ts,
// re-organised to match the official KSSM Geografi Tingkatan 1 structure.
export const geographyF1Subtopics: Record<string, Subtopic[]> = {
  "Chapter 1": [
    {
      key: "geo-c1-s1",
      num: 1,
      title: "1.1 Arah Mata Angin",
      summary:
        "Arah ialah hala tuju sesuatu tempat dari satu tempat yang lain. Terdapat lapan arah mata angin yang terbahagi kepada dua kategori. Empat arah mata angin utama: Utara (atas peta), Selatan (bawah), Timur (kanan, arah matahari terbit), dan Barat (kiri, arah matahari terbenam). Empat arah mata angin perantaraan terletak tepat di tengah-tengah arah utama: Timur Laut (antara U–T), Tenggara (antara T–S), Barat Daya (antara B–S), dan Barat Laut (antara B–U). Penguasaan arah mata angin adalah asas utama sebelum mempelajari kemahiran geografi lain seperti pembacaan peta lakar dan kerja lapangan.",
      keywords: [
        "Arah",
        "Mata Angin Utama",
        "Mata Angin Perantaraan",
        "Utara",
        "Selatan",
        "Timur",
        "Barat",
        "Timur Laut",
        "Tenggara",
        "Barat Daya",
        "Barat Laut",
      ],
    },
    {
      key: "geo-c1-s2",
      num: 2,
      title: "1.2 Cara Menentukan Arah Mata Angin Menggunakan Matahari",
      summary:
        "Pada waktu siang, arah boleh ditentukan secara semula jadi dengan berpandukan matahari. Berdiri menghadap matahari terbit pada awal pagi: arah hadapan ialah Timur dan belakang ialah Barat. Apabila kedua-dua belah tangan didepakan, tangan kiri menunjuk ke Utara dan tangan kanan menunjuk ke Selatan. Pada waktu malam, buruj seperti Buruj Biduk di langit cerah digunakan untuk menunjukkan arah Utara.",
      keywords: [
        "Matahari Terbit",
        "Matahari Terbenam",
        "Buruj",
        "Buruj Biduk",
        "Kaedah Semula Jadi",
      ],
    },
    {
      key: "geo-c1-s3",
      num: 3,
      title: "1.3 Cara Menentukan Arah Mata Angin Menggunakan Kompas",
      summary:
        "Kompas magnetik ialah instrumen yang menentukan arah dengan tepat. Jarum magnetnya sentiasa menunjuk ke arah utara bumi disebabkan tarikan Kutub Utara magnetik. Komponen utamanya: jarum kompas, muka dial (petunjuk arah), dan perumah pelindung. Langkah penggunaan: (1) berdiri menghadap objek rujukan; (2) letak kompas di permukaan rata supaya jarum bebas berpusing; (3) jauhi objek besi/logam (tiang lampu, pagar, jam tangan) yang boleh mengganggu jarum; (4) pusing badan kompas perlahan-lahan sehingga jarum bertindih dengan tanda U/N pada dial; (5) baca arah objek pada petunjuk dial.",
      keywords: [
        "Kompas Magnetik",
        "Jarum Kompas",
        "Muka Dial",
        "Kutub Utara Magnet",
        "Orientasi Kompas",
        "Gangguan Besi",
      ],
    },
    {
      key: "geo-c1-s4",
      num: 4,
      title: "1.4 Bearing Sudutan",
      summary:
        "Bearing ialah arah sesuatu objek dari satu titik rujukan, diukur dalam unit darjah (°). Bearing sudutan (azimuth) diukur bermula dari arah Utara (0°) mengikut arah pusingan jam menggunakan jangka sudut. Langkah: (1) sambung dua titik dengan garis lurus; (2) tentukan titik rujukan dengan kata kunci 'dari'; (3) bina simbol mata angin di titik rujukan dengan U menghadap atas; (4) letak pusat jangka sudut di titik rujukan dan selaraskan 0° dengan Utara; (5) baca skala LUAR mengikut arah jam. Jika objek melebihi separuh bulatan (selepas Selatan/180°), ukur sudut baki dari Selatan dan tambah 180°. Contoh: sudut baki 121° → bearing = 180° + 121° = 301°. Jangan baca skala dalam jangka sudut kerana ia mengikut arah lawan jam.",
      keywords: [
        "Bearing Sudutan",
        "Azimuth",
        "Jangka Sudut",
        "Titik Rujukan",
        "Arah Pusingan Jam",
        "Skala Luar",
        "Melebihi 180 Darjah",
      ],
    },
  ],
  "Chapter 2": [
    {
      key: "geo-c2-s1",
      num: 1,
      title: "2.1 Kedudukan Relatif",
      summary:
        "Kedudukan relatif menentukan lokasi sesuatu objek dengan merujuk kepada satu titik rujukan yang bertindak sebagai pusat, menggunakan istilah hadapan, belakang, sebelah kanan, dan sebelah kiri. Contohnya, jika Siti dijadikan titik rujukan dalam kelas, murid di arah muka Siti berada di hadapan, di arah punggung berada di belakang, dan kiri/kanan ditentukan berdasarkan tangan Siti. Di lapangan, kedudukan bangunan ditentukan dengan mengenal pasti pintu depan bangunan rujukan untuk menetapkan arah hadapan, belakang, dan sisi kiri/kanan.",
      keywords: ["Kedudukan Relatif", "Titik Rujukan", "Hadapan", "Belakang", "Kiri", "Kanan"],
    },
    {
      key: "geo-c2-s2",
      num: 2,
      title: "2.2 Latitud dan Longitud",
      summary:
        "Kedudukan mutlak ditentukan secara saintifik mengikut koordinat persilangan latitud dan longitud pada glob atau atlas. Latitud ialah garisan imaginasi melintang. Lima latitud utama: Garisan Artik (66½° U), Sartan (23½° U), Khatulistiwa (0°, membahagi Hemisfera Utara dan Selatan), Jadi (23½° S), dan Antartik (66½° S); nilai 0°–90° U/S. Longitud ialah garisan imaginasi menegak dari Kutub Utara ke Kutub Selatan. Garisan Meridian Pangkal (GMP, 0°) merentasi Greenwich, London. Garisan Tarikh Antarabangsa (GTA, 180°) dilukis bengkang-bengkok untuk mengelak daratan/pulau yang sama mempunyai dua tarikh berbeza. Peraturan penulisan koordinat: latitud (U/S) dahulu, kemudian longitud (T/B), contohnya 30° U, 40° T.",
      keywords: [
        "Latitud",
        "Longitud",
        "Garisan Khatulistiwa",
        "Garisan Artik",
        "Garisan Sartan",
        "Garisan Jadi",
        "Garisan Antartik",
        "GMP",
        "Greenwich",
        "GTA",
        "Koordinat",
      ],
    },
  ],
  "Chapter 3": [
    {
      key: "geo-c3-s1",
      num: 1,
      title: "3.1 Ciri-ciri Peta Lakar",
      summary:
        "Peta lakar ialah gambaran permukaan bumi yang dilukis dari pandangan atas untuk mewakili kawasan luas menggunakan simbol bagi menggantikan lukisan rumit. Lima ciri utama peta lakar yang lengkap: (1) Tajuk — ditulis dengan huruf besar di bahagian atas dan digariskan; (2) Bingkai — garisan luar yang mengelilingi peta untuk menandakan had kawasan; (3) Arah Mata Angin — menunjukkan orientasi peta (biasanya Utara); (4) Simbol — mewakili ciri geografi untuk menjimatkan ruang; (5) Petunjuk — menjelaskan maksud setiap simbol yang digunakan.",
      keywords: ["Peta Lakar", "Tajuk", "Bingkai", "Arah Mata Angin", "Simbol", "Petunjuk"],
    },
    {
      key: "geo-c3-s2",
      num: 2,
      title: "3.2 Simbol-simbol dalam Peta Lakar",
      summary:
        "Simbol dibahagikan kepada empat kategori: Simbol Titik untuk kedudukan spesifik (masjid, kuil, gereja, tanda aras, stesen trigonometri); Simbol Garisan untuk ciri memanjang (jalan raya, sungai, jalan kereta api, sempadan); Simbol Kawasan untuk ruang luas (sawah padi, hutan, kelapa sawit, getah); dan Simbol Bergambar yang berbentuk lukisan ringkas menyerupai objek asal (pokok kelapa). Singkatan turut digunakan untuk menjimatkan ruang: B.P. (Balai Polis), Sek. (Sekolah), Hosp. (Hospital), P.P./Pej. Pos (Pejabat Pos), Kg. (Kampung), Pt. (Parit).",
      keywords: [
        "Simbol Titik",
        "Simbol Garisan",
        "Simbol Kawasan",
        "Simbol Bergambar",
        "Singkatan Peta",
      ],
    },
    {
      key: "geo-c3-s3",
      num: 3,
      title: "3.3 Pandang Darat Fizikal dan Pandang Darat Budaya",
      summary:
        "Kandungan peta lakar diklasifikasikan kepada dua ciri utama. Pandang Darat Fizikal (semula jadi) merangkumi bentuk muka bumi (tanah tinggi, tanah pamah, bukit, lembah), saliran (sungai, tasik, paya bakau, paya air tawar), dan tumbuhan semula jadi (hutan rimba, belukar) — tanpa campur tangan manusia. Pandang Darat Budaya (buatan manusia) merangkumi petempatan (rumah, bandar), pengangkutan (jalan raya, kereta api, jambatan, jeti), kegiatan ekonomi (sawah padi, ladang kelapa sawit, kilang, lombong), dan kemudahan sosial. Kedua-duanya berkait rapat — manusia membina ciri budaya berdasarkan potensi ciri fizikal: tanah pamah subur untuk padi dan petempatan, pinggir laut untuk perikanan dan jeti, tanah tinggi untuk pelancongan dan penanaman teh.",
      keywords: [
        "Pandang Darat Fizikal",
        "Pandang Darat Budaya",
        "Bentuk Muka Bumi",
        "Saliran",
        "Petempatan",
        "Pengangkutan",
      ],
    },
    {
      key: "geo-c3-s4",
      num: 4,
      title: "3.4 Langkah-langkah Melukis Peta Lakar",
      summary:
        "Langkah sistematik melukis peta lakar: (1) pilih tajuk kawasan; (2) lukis bingkai peta; (3) tentukan simbol yang sesuai; (4) plotkan ciri-ciri geografi mengikut kedudukan yang betul, dengan mendahulukan ciri fizikal sebelum ciri budaya; (5) lengkapkan petunjuk dan arah mata angin. Susunan ini memastikan peta mudah dibaca dan tidak bertindih.",
      keywords: ["Melukis Peta", "Langkah Sistematik", "Ciri Fizikal Dahulu", "Petunjuk"],
    },
  ],
  "Chapter 4": [
    {
      key: "geo-c4-s1",
      num: 1,
      title: "4.1 Kedudukan Negeri-negeri di Malaysia",
      summary:
        "Malaysia terbahagi kepada dua bahagian yang dipisahkan oleh Laut China Selatan: Semenanjung Malaysia dan Malaysia Timur. Semenanjung mempunyai 11 buah negeri — Perlis (negeri terkecil, paling utara; ibu negeri Kangar), Kedah (Jelapang Padi; Alor Setar), Pulau Pinang (pulau + Seberang Perai; George Town), Perak (bijih timah; Ipoh), Selangor (paling maju; Shah Alam), Negeri Sembilan (adat perpatih; Seremban), Melaka (bersejarah; Bandaraya Melaka), Johor (paling selatan; Johor Bahru), Pahang (terbesar di Semenanjung; Kuantan), Terengganu (pantai timur; Kuala Terengganu), dan Kelantan (sempadan Thailand; Kota Bharu). Malaysia Timur di Pulau Borneo: Sarawak (negeri terbesar di Malaysia; Kuching) dan Sabah (Gunung Kinabalu; Kota Kinabalu).",
      keywords: [
        "Semenanjung Malaysia",
        "Malaysia Timur",
        "13 Negeri",
        "Borneo",
        "Ibu Negeri",
        "Laut China Selatan",
      ],
    },
    {
      key: "geo-c4-s2",
      num: 2,
      title: "4.2 Kedudukan Ibu Negeri, Ibu Negara dan Pusat Pentadbiran Kerajaan Persekutuan",
      summary:
        "Malaysia mempunyai 3 Wilayah Persekutuan yang ditadbir terus oleh Kerajaan Persekutuan: Kuala Lumpur (ibu negara dan pusat kewangan), Putrajaya (pusat pentadbiran kerajaan persekutuan), dan Labuan (pusat kewangan luar pesisir antarabangsa). Setiap ibu negeri berfungsi sebagai pusat pentadbiran kerajaan negeri, pusat ekonomi, dan pusat perkhidmatan utama. Langkah melakar Peta Malaysia: (1) bingkai peta; (2) lakar bentuk kasar Semenanjung dan Borneo; (3) lukis sempadan negeri dan negara jiran (Brunei, Indonesia, Thailand); (4) label nama negeri dan Wilayah Persekutuan dengan huruf besar; (5) lengkapkan tajuk 'Peta Malaysia', arah Utara, dan petunjuk.",
      keywords: [
        "Wilayah Persekutuan",
        "Kuala Lumpur",
        "Putrajaya",
        "Labuan",
        "Lakaran Peta Malaysia",
        "Sempadan",
      ],
    },
  ],
  "Chapter 5": [
    {
      key: "geo-c5-s1",
      num: 1,
      title: "5.1 Sistem Fizikal Bumi",
      summary:
        "Bumi mempunyai empat sistem fizikal yang saling berinteraksi untuk menyokong hidupan: Atmosfera (lapisan udara — 78% Nitrogen, 21% Oksigen, argon, karbon dioksida, debu, wap air; melindungi bumi daripada sinaran ultraungu); Hidrosfera (71% permukaan bumi yang dilitupi air — lautan, sungai, tasik, air bawah tanah, wap air); Litosfera (lapisan luar pejal merangkumi kerak bumi dan bahagian atas mantel; kaya dengan batuan dan mineral); dan Biosfera (kawasan yang didiami manusia, haiwan, dan tumbuhan, hasil interaksi tiga sistem fizikal lain).",
      keywords: ["Atmosfera", "Hidrosfera", "Litosfera", "Biosfera", "Sistem Fizikal Bumi"],
    },
    {
      key: "geo-c5-s2",
      num: 2,
      title: "5.2 Struktur Bumi",
      summary:
        "Struktur dalaman bumi terbahagi kepada tiga lapisan: Kerak Bumi (paling luar, nipis, pejal) — terdiri daripada Sial (Silika & Aluminium) di benua dan Sima (Silika & Magnesium) di dasar lautan; Mantel — lapisan paling tebal (80% isi padu bumi), sebahagiannya separa cecair atau magma panas; Teras Bumi — paling dalam, sangat panas dan bertekanan tinggi, terbahagi kepada Teras Luar (cecair) dan Teras Dalam (pepejal).",
      keywords: ["Kerak Bumi", "Sial", "Sima", "Mantel", "Magma", "Teras Luar", "Teras Dalam"],
    },
    {
      key: "geo-c5-s3",
      num: 3,
      title: "5.3 Benua, Lautan, Laut Utama dan Selat",
      summary:
        "29% permukaan bumi ialah daratan yang membentuk 7 benua: Asia (terbesar), Afrika, Amerika Utara, Amerika Selatan, Antartika (paling sejuk), Eropah, dan Oceania/Australia (terkecil). 71% lagi ialah perairan yang membentuk 5 lautan utama: Pasifik (terbesar dan terdalam), Atlantik, Hindi, Selatan, dan Artik (terkecil). Di sekitar Malaysia terdapat perairan penting: Laut China Selatan, Selat Melaka (selat terpanjang di dunia), Selat Tebrau, dan Laut Sulu.",
      keywords: ["7 Benua", "5 Lautan", "Asia", "Pasifik", "Selat Melaka", "Laut China Selatan"],
    },
    {
      key: "geo-c5-s4",
      num: 4,
      title: "5.4 Kesan Pergerakan Kerak Bumi",
      summary:
        "Pergerakan kerak bumi digerakkan oleh arus perolakan magma dalam mantel. Kesannya merangkumi hanyutan benua, pembentukan gunung lipat, letusan gunung berapi (vulkanisme), gempa bumi, dan tsunami di dasar laut. Fenomena ini membentuk semula muka bumi dan boleh mengancam petempatan manusia di kawasan plat tektonik aktif.",
      keywords: [
        "Pergerakan Kerak Bumi",
        "Arus Perolakan",
        "Hanyutan Benua",
        "Gunung Lipat",
        "Vulkanisme",
        "Gempa Bumi",
        "Tsunami",
      ],
    },
  ],
  "Chapter 6": [
    {
      key: "geo-c6-s1",
      num: 1,
      title: "6.1 Bentuk Muka Bumi di Malaysia",
      summary:
        "Bentuk muka bumi Malaysia dibahagikan kepada empat kategori: Tanah Tinggi, Tanah Pamah, Pinggir Laut, dan Saliran. Tanah Tinggi melebihi 180 meter dari aras laut, terbentuk daripada lipatan kerak bumi (contoh Banjaran Titiwangsa, Banjaran Crocker dengan Gunung Kinabalu 4,095 m). Tanah Pamah kurang 180 meter, biasanya terbentuk di lembah sungai melalui pemendapan aluvium (Dataran Kedah-Perlis, Dataran Kelantan). Pinggir Laut kaya dengan tanjung, pulau, dan teluk terlindung. Saliran merangkumi sistem sungai dan tasik.",
      keywords: [
        "Tanah Tinggi",
        "Tanah Pamah",
        "Pinggir Laut",
        "Saliran",
        "Banjaran Titiwangsa",
        "Gunung Kinabalu",
        "Aluvium",
      ],
    },
    {
      key: "geo-c6-s2",
      num: 2,
      title: "6.2 Kepelbagaian Bentuk Muka Bumi di Malaysia",
      summary:
        "Kepelbagaian bentuk muka bumi memberi Malaysia keunikan geografi. Banjaran Titiwangsa berfungsi sebagai 'tulang belakang' Semenanjung. Tanah pamah aluvium di Kedah-Perlis dan Kelantan adalah antara yang paling subur. Pinggir laut mempunyai teluk semula jadi seperti di Pelabuhan Klang serta pulau peranginan seperti Pulau Redang dan Pulau Sipadan. Sungai Rajang ialah sungai terpanjang di Malaysia; Tasik Bera ialah tasik semula jadi terbesar manakala Tasik Kenyir ialah tasik buatan.",
      keywords: [
        "Kepelbagaian Bentuk Muka Bumi",
        "Banjaran Titiwangsa",
        "Sungai Rajang",
        "Tasik Bera",
        "Tasik Kenyir",
        "Pulau Redang",
      ],
    },
    {
      key: "geo-c6-s3",
      num: 3,
      title: "6.3 Kepentingan Pelbagai Bentuk Muka Bumi di Malaysia",
      summary:
        "Tanah Tinggi: pusat pelancongan (suhu turun ~6.5°C bagi setiap 1,000 m), pertanian hawa sederhana (teh, strawberi, sayur), dan penjanaan kuasa hidroelektrik (Empangan Bakun). Tanah Pamah: pertanian padi (mudah pengairan dan jentera), petempatan dan perindustrian (kos pembinaan rendah), serta jaringan pengangkutan yang efisien. Pinggir Laut: pelabuhan semula jadi terlindung (Pelabuhan Klang), perikanan komersial (pentas benua cetek kaya plankton), dan pelancongan terumbu karang. Saliran: bekalan air domestik dan industri, jalan perhubungan di pedalaman Sabah dan Sarawak, serta sempadan semula jadi geopolitik (Sungai Golok Malaysia–Thailand).",
      keywords: [
        "Hidroelektrik",
        "Empangan Bakun",
        "Pertanian Hawa Sederhana",
        "Pelabuhan Klang",
        "Pentas Benua",
        "Sempadan Semula Jadi",
      ],
    },
  ],
  "Chapter 7": [
    {
      key: "geo-c7-s1",
      num: 1,
      title: "7.1 Pandang Darat Fizikal Peringkat Aliran Sungai",
      summary:
        "Sistem saliran di Malaysia padat disebabkan Iklim Khatulistiwa yang membawa hujan tahunan melebihi 2,500 mm. Sungai mempunyai tiga peringkat aliran: hulu di tanah tinggi (aliran deras, jeram, air terjun), pertengahan, dan hilir di tanah pamah (aliran perlahan, berliku-liku, sering melimpah). Aliran sungai membentuk lembah, dataran banjir, dan delta.",
      keywords: [
        "Peringkat Aliran Sungai",
        "Hulu",
        "Hilir",
        "Iklim Khatulistiwa",
        "Jeram",
        "Delta",
      ],
    },
    {
      key: "geo-c7-s2",
      num: 2,
      title: "7.2 Sungai dan Tasik Utama di Malaysia",
      summary:
        "Sungai utama Semenanjung: Sungai Pahang (terpanjang di Semenanjung, hasil pertemuan Sungai Jelai dan Sungai Tembeling), Sungai Perak (nadi hidroelektrik melalui Empangan Temenggor dan Bersia), dan Sungai Kelantan (lembah subur tanih aluvium untuk padi). Di Borneo: Sungai Rajang di Sarawak (terpanjang di Malaysia, 563 km, Empangan Bakun), Sungai Kinabatangan di Sabah (habitat Gajah Pygmy dan Monyet Belanda), dan Sungai Baram (laluan pengangkutan kayu balak). Tasik semula jadi: Tasik Bera (terbesar, dilindungi RAMSAR) dan Tasik Chini. Tasik buatan: Tasik Kenyir (Terengganu) dan Tasik Bakun (Sarawak).",
      keywords: [
        "Sungai Pahang",
        "Sungai Perak",
        "Sungai Kelantan",
        "Sungai Rajang",
        "Sungai Kinabatangan",
        "Tasik Bera",
        "Tasik Chini",
        "Tasik Kenyir",
        "RAMSAR",
      ],
    },
    {
      key: "geo-c7-s3",
      num: 3,
      title: "7.3 Kepentingan Sungai dan Tasik di Malaysia",
      summary:
        "Sungai dan tasik membekalkan 90% air tawar domestik, menjana kuasa hidroelektrik mesra alam, menjadi sempadan semula jadi geopolitik (Sungai Golok Malaysia–Thailand, Sungai Bernam Selangor–Perak), berfungsi sebagai jalan perhubungan utama bagi bot di pedalaman Sabah dan Sarawak, menyediakan sumber protein dan aktiviti akuakultur sangkar, serta membekalkan sistem pengairan padi sawah melalui terusan bagi menjamin keselamatan makanan.",
      keywords: [
        "Bekalan Air",
        "Hidroelektrik",
        "Sempadan Semula Jadi",
        "Sungai Golok",
        "Akuakultur",
        "Terusan Pengairan",
      ],
    },
  ],
  "Chapter 8": [
    {
      key: "geo-c8-s1",
      num: 1,
      title: "8.1 Taburan Penduduk di Malaysia",
      summary:
        "Taburan penduduk Malaysia adalah tidak sekata, dibahagikan kepada tiga jenis berdasarkan orang per km². Penduduk Padat (melebihi 200/km²) tertumpu di bandar besar dan dataran subur seperti Kuala Lumpur, Shah Alam, George Town, Johor Bahru, dan Kota Kinabalu. Penduduk Sederhana (50–200/km²) di kawasan pertanian, pesisir pantai, dan bandar kecil seperti utara Perak, Kedah, dan pesisir Sarawak. Penduduk Jarang (kurang 50/km²) di pedalaman Borneo, Banjaran Titiwangsa, dan hutan rimba.",
      keywords: [
        "Taburan Penduduk",
        "Penduduk Padat",
        "Penduduk Sederhana",
        "Penduduk Jarang",
        "Kepadatan Penduduk",
      ],
    },
    {
      key: "geo-c8-s2",
      num: 2,
      title: "8.2 Faktor-faktor yang Mempengaruhi Taburan Penduduk di Malaysia",
      summary:
        "Empat faktor utama: (1) Faktor Fizikal — tanah pamah rata menjadi tumpuan padat, tanah tinggi bercerun dan hutan tebal berpenduduk jarang kecuali pusat pelancongan sejuk. (2) Faktor Ekonomi — peluang pekerjaan dalam pertanian aluvium (Dataran Kedah-Perlis), perindustrian (Lembah Klang, Bayan Lepas), dan perlombongan petroleum (Kerteh, Bintulu). (3) Faktor Sosial — infrastruktur pengangkutan maju, hospital pakar, dan pusat pendidikan tinggi (Bangi, Skudai). (4) Faktor Dasar Kerajaan — tanah rancangan FELDA untuk menyeimbangkan penduduk luar bandar, pewartaan bandar baru, dan pembangunan Putrajaya.",
      keywords: [
        "Faktor Fizikal",
        "Faktor Ekonomi",
        "Faktor Sosial",
        "Dasar Kerajaan",
        "FELDA",
        "Lembah Klang",
        "Bayan Lepas",
      ],
    },
  ],
  "Chapter 9": [
    {
      key: "geo-c9-s1",
      num: 1,
      title: "9.1 Jenis-jenis Petempatan di Malaysia",
      summary:
        "Petempatan dibahagikan kepada dua jenis utama. Petempatan Bandar: penduduk melebihi 10,000 orang, kepadatan tinggi, bangunan rapat atau pencakar langit, ekonomi berasaskan perindustrian dan perkhidmatan (Kuala Lumpur, Kuching). Petempatan Luar Bandar: penduduk kurang 10,000 orang, kepadatan rendah, persekitaran semula jadi, ekonomi primer seperti pertanian dan perikanan (kampung tradisional, FELDA).",
      keywords: [
        "Petempatan Bandar",
        "Petempatan Luar Bandar",
        "Kepadatan",
        "Ekonomi Primer",
        "FELDA",
      ],
    },
    {
      key: "geo-c9-s2",
      num: 2,
      title: "9.2 Pola Petempatan di Malaysia",
      summary:
        "Empat pola petempatan: Pola Berselerak — rumah berjauhan di kawasan kebun kecil; Pola Berjajar — rumah sebaris selari di sepanjang jalan raya, tebing sungai, atau pesisir pantai; Pola Berkelompok — rumah rapat dalam kumpulan tersusun seperti tanah rancangan FELDA; Pola Terpusat — bangunan padat mengelilingi titik tumpuan seperti simpang jalan atau stesen kereta api di bandar.",
      keywords: [
        "Pola Berselerak",
        "Pola Berjajar",
        "Pola Berkelompok",
        "Pola Terpusat",
        "Susun Atur",
      ],
    },
    {
      key: "geo-c9-s3",
      num: 3,
      title: "9.3 Fungsi Petempatan Bandar dan Luar Bandar",
      summary:
        "Fungsi Petempatan Bandar: pusat pentadbiran (Putrajaya), pusat perniagaan dan kewangan (Kuala Lumpur), pusat perindustrian (Shah Alam), dan pusat pendidikan (Bangi). Fungsi Petempatan Luar Bandar: fungsi ekonomi primer (pertanian, perikanan), industri desa (IKS), fungsi sosial asas (klinik desa, balai raya), serta fungsi governan tempatan melalui pejabat penghulu atau ketua kampung.",
      keywords: [
        "Pusat Pentadbiran",
        "Pusat Perniagaan",
        "Pusat Perindustrian",
        "Industri Kecil Sederhana",
        "Balai Raya",
        "Penghulu",
      ],
    },
  ],
  "Chapter 10": [
    {
      key: "geo-c10-s1",
      num: 1,
      title: "10.1 Negara-negara di Asia Tenggara",
      summary:
        "Asia Tenggara terdiri daripada 11 buah negara yang dibahagikan kepada Tanah Besar (Semenanjung Malaysia, Thailand, Myanmar, Laos, Kemboja, Vietnam) dan Kepulauan (Sabah, Sarawak, Singapura, Indonesia, Brunei, Filipina, Timor-Leste). Laos ialah satu-satunya negara tanpa pinggir laut (landlocked).",
      keywords: [
        "Asia Tenggara",
        "11 Negara",
        "Tanah Besar",
        "Kepulauan",
        "Landlocked Country",
        "Laos",
      ],
    },
    {
      key: "geo-c10-s2",
      num: 2,
      title: "10.2 Bentuk Muka Bumi di Asia Tenggara",
      summary:
        "Ciri fizikal utama: Tanah Tinggi (Sistem Banjaran Himalaya/Gunung Lipat Muda), kawasan Gunung Berapi aktif di Indonesia dan Filipina dalam Lingkaran Api Pasifik, puncak tertinggi Hkakabo Razi (5,881 m) di Myanmar, dan Tanah Pamah (lembah dan delta sungai) yang kaya dengan tanih aluvium subur untuk pertanian padi sawah, petempatan padat, dan pengangkutan.",
      keywords: [
        "Banjaran Himalaya",
        "Gunung Lipat Muda",
        "Lingkaran Api Pasifik",
        "Hkakabo Razi",
        "Tanah Pamah",
        "Tanih Aluvium",
      ],
    },
    {
      key: "geo-c10-s3",
      num: 3,
      title: "10.3 Sungai dan Tasik Utama di Asia Tenggara",
      summary:
        "Sungai Mekong — sungai terpanjang, mengalir melalui 6 negara dengan delta produktif di Vietnam. Sungai Irrawaddy — nadi perhubungan dan 'mangkuk nasi' Myanmar. Menam Chao Phraya — jalan air komersial utama Bangkok dan Dataran Tengah Thailand. Tonle Sap di Kemboja — tasik air tawar terbesar yang mengawal banjir Mekong dan membekalkan protein ikan. Sistem ini penting untuk pertanian padi sawah berskala besar, perikanan, hidroelektrik (Laos digelar 'Bateri Asia'), dan pelancongan global seperti Teluk Ha Long (Vietnam) dan Pulau Bali (Indonesia).",
      keywords: [
        "Sungai Mekong",
        "Sungai Irrawaddy",
        "Menam Chao Phraya",
        "Tonle Sap",
        "Bateri Asia",
        "Teluk Ha Long",
      ],
    },
  ],
  "Chapter 11": [
    {
      key: "geo-c11-s1",
      num: 1,
      title: "11.1 Taburan Penduduk Asia Tenggara",
      summary:
        "Taburan penduduk Asia Tenggara tidak sekata. Kawasan Padat: Pulau Jawa, Bangkok, Manila, Delta Sungai Red, dan Lembah Klang — tertumpu di delta subur dan kawasan metropolitan. Kawasan Sederhana: pesisir pantai dan pinggir bandar. Kawasan Jarang: pedalaman Borneo, pergunungan utara Myanmar, dan paya Sumatera akibat rintangan semula jadi. Faktor: fizikal (tanah pamah aluvium untuk padi), ekonomi (peluang pekerjaan industri/perdagangan), sosial (pendidikan, MRT/LRT), dan dasar kerajaan (ibu kota baharu seperti Putrajaya dan Naypyidaw, program transmigrasi).",
      keywords: [
        "Pulau Jawa",
        "Delta Sungai Red",
        "Lembah Klang",
        "Kawasan Padat",
        "Kawasan Jarang",
        "Transmigrasi",
        "Naypyidaw",
      ],
    },
    {
      key: "geo-c11-s2",
      num: 2,
      title: "11.2 Fungsi-fungsi Petempatan Bandar Utama di Asia Tenggara",
      summary:
        "Bandar utama Asia Tenggara mempunyai fungsi dinamik tersendiri. Kuala Lumpur — pusat kewangan dan komersial. Bangkok — pusat pelancongan antarabangsa dan pentadbiran. Jakarta — metropolitan terbesar dan pusat politik. Manila — hab perdagangan Pasifik yang sangat padat. Singapura — pusat kewangan dan pelabuhan antarabangsa tersibuk. Petempatan luar bandar pula bercorak berjajar di sepanjang saliran/pantai atau berselerak di kawasan pertanian.",
      keywords: [
        "Kuala Lumpur",
        "Bangkok",
        "Jakarta",
        "Manila",
        "Singapura",
        "Pelabuhan",
        "Hab Perdagangan",
      ],
    },
  ],
  "Chapter 12": [
    {
      key: "geo-c12-s1",
      num: 1,
      title: "12.1 Jenis-jenis Sumber Air",
      summary:
        "Sumber air di Malaysia terbahagi kepada dua jenis utama. Air Permukaan menyumbang sekitar 97% bekalan, meliputi sungai, tasik, dan paya. Air Tanah menyumbang sekitar 3%, disimpan dalam akuifer bawah tanah. Sumber alternatif lain termasuk Sistem Penuaian Air Hujan (SPAHL) dan air sungai yang dirawat untuk kegunaan domestik dan industri.",
      keywords: ["Air Permukaan", "Air Tanah", "Akuifer", "SPAHL", "Sumber Alternatif"],
    },
    {
      key: "geo-c12-s2",
      num: 2,
      title: "12.2 Punca Krisis Air di Malaysia",
      summary:
        "Krisis air berlaku apabila permintaan melebihi bekalan bersih. Punca utamanya: penebangan hutan di kawasan tadahan hujan, pencemaran sungai oleh sisa kilang dan domestik, pertambahan penduduk, pembaziran air oleh pengguna, serta fenomena cuaca kemarau seperti El Nino.",
      keywords: [
        "Krisis Air",
        "Kawasan Tadahan Hujan",
        "Pencemaran Sungai",
        "Pembaziran Air",
        "El Nino",
      ],
    },
    {
      key: "geo-c12-s3",
      num: 3,
      title: "12.3 Kesan Krisis Air di Malaysia",
      summary:
        "Impak krisis air merangkumi kekurangan bekalan air bersih (catuan air dilaksanakan), gangguan kepada sektor industri dan pertanian, kepupusan hidupan akuatik akibat sungai kering atau tercemar, serta ancaman penyakit bawaan air seperti kolera dan tifoid. Krisis air juga membebankan ekonomi kerana kos rawatan dan pengangkutan bekalan tambahan.",
      keywords: [
        "Catuan Air",
        "Kepupusan Hidupan Akuatik",
        "Penyakit Bawaan Air",
        "Kolera",
        "Tifoid",
      ],
    },
    {
      key: "geo-c12-s4",
      num: 4,
      title: "12.4 Langkah Mengurangkan Kesan Krisis Air",
      summary:
        "Langkah mitigasi: pemeliharaan kawasan tadahan hujan, penguatkuasaan Akta Kualiti Alam Sekeliling 1974, kempen kesedaran penjimatan air, rawatan air kumbahan untuk kegunaan industri, serta penerokaan sumber alternatif seperti Sistem Penuaian Air Hujan (SPAHL) dan air tanah. Setiap pengguna turut berperanan dengan amalan jimat seperti menutup paip ketika tidak digunakan dan mengitar semula air greywater.",
      keywords: [
        "Pemeliharaan Tadahan",
        "Akta Kualiti Alam Sekeliling 1974",
        "Kempen Kesedaran",
        "SPAHL",
        "Jimat Air",
      ],
    },
  ],
  "Chapter 13": [
    {
      key: "geo-c13-s1",
      num: 1,
      title: "13.1 Jenis-jenis Sisa Domestik",
      summary:
        "Sisa domestik ialah bahan buangan pepejal dan cecair dari kawasan perumahan atau institusi. Sisa Organik boleh diurai secara semula jadi (sisa makanan, sisa kebun, kertas) dan boleh dijadikan baja kompos. Sisa Bukan Organik sukar diurai (plastik, kaca, logam, sisa elektronik). Sisa juga wujud sebagai sisa pepejal mahupun sisa cecair (air kumbahan dan greywater).",
      keywords: [
        "Sisa Organik",
        "Sisa Bukan Organik",
        "Sisa Pepejal",
        "Sisa Cecair",
        "Greywater",
        "Baja Kompos",
      ],
    },
    {
      key: "geo-c13-s2",
      num: 2,
      title: "13.2 Sisa-sisa Domestik di Malaysia",
      summary:
        "Di Malaysia, sisa domestik terdiri terutamanya daripada sisa makanan, kertas, plastik, kaca, dan logam. Purata setiap rakyat menghasilkan lebih 1 kg sisa sehari. Sisa elektronik (e-waste) seperti telefon dan komputer lama semakin meningkat. Pengurusan sisa adalah tanggungjawab Pihak Berkuasa Tempatan (PBT) di bawah Akta Pengurusan Sisa Pepejal dan Pembersihan Awam 2007.",
      keywords: [
        "Sisa Makanan",
        "Sisa Plastik",
        "Sisa Elektronik",
        "E-waste",
        "Pihak Berkuasa Tempatan",
        "Akta 672",
      ],
    },
    {
      key: "geo-c13-s3",
      num: 3,
      title: "13.3 Kesan-kesan Pembuangan Sisa Domestik",
      summary:
        "Pembuangan sisa yang tidak teratur menyebabkan pencemaran alam sekitar (air, udara, bau), penularan wabak penyakit (demam denggi, kolera, kencing tikus), peningkatan kos penyelenggaraan oleh kerajaan, dan kejadian banjir kilat akibat saluran longkang tersumbat sampah.",
      keywords: [
        "Pencemaran Alam Sekitar",
        "Wabak Penyakit",
        "Demam Denggi",
        "Kencing Tikus",
        "Banjir Kilat",
      ],
    },
    {
      key: "geo-c13-s4",
      num: 4,
      title: "13.4 Langkah-langkah Mengurangkan Kesan Pembuangan Sisa Domestik",
      summary:
        "Langkah mitigasi: amalan 3R (Reduce, Reuse, Recycle), penguatkuasaan undang-undang yang ketat oleh PBT di bawah Akta Pengurusan Sisa Pepejal dan Pembersihan Awam 2007, pelaksanaan pendidikan serta kempen kesedaran pengasingan sisa di punca, dan inovasi teknologi seperti penghasilan baja kompos daripada sisa dapur dan penjanaan tenaga daripada gas pelupusan sampah (landfill gas).",
      keywords: [
        "3R",
        "Reduce",
        "Reuse",
        "Recycle",
        "Akta Pengurusan Sisa Pepejal",
        "Pengasingan Sisa",
        "Landfill Gas",
      ],
    },
  ],
};

export function getGeographyF1Subtopics(chapterKey: string): Subtopic[] {
  return geographyF1Subtopics[chapterKey] ?? [];
}
