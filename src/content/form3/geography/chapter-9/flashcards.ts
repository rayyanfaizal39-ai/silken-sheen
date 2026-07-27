import type { Flashcard } from "@/data/types";

const flashcardContent = [
  ["Namakan negara pengeluar petroleum utama di dunia.", "Arab Saudi"],
  ["Di manakah taburan gas asli utama dunia ditemui?", "Amerika Syarikat"],
  ["Negara manakah merupakan pengeluar arang batu yang besar?", "Rusia"],
  ["Namakan negara yang terkenal dengan penggunaan tenaga geoterma.", "Iceland"],
  ["Tenaga angin sangat signifikan di negara mana?", "Belanda"],
  ["Di manakah letaknya stesen tenaga ombak yang utama?", "Perancis"],
  ["Negara manakah mendahului dalam penggunaan tenaga suria?", "Jepun"],
  ["Tenaga hidroelektrik (air) paling banyak dijana di negara mana?", "China"],
  ["Di manakah lokasi penggunaan tenaga biomas yang meluas?", "India"],
  [
    "Apakah beza sumber tenaga bahan bakar dan tenaga alternatif?",
    "Bahan bakar (petroleum, gas, arang batu) akan habis, manakala alternatif (suria, angin) tidak akan habis",
  ],
  [
    "Mengapakah Iceland sesuai untuk tenaga geoterma?",
    "Kerana terletak di kawasan yang mempunyai haba dalaman bumi yang tinggi (dekat gunung berapi)",
  ],
  ["Alat apakah yang digunakan di Jepun untuk menjana tenaga suria?", "Panel fotovoltaik"],
  [
    "Bagaimanakah tenaga biomas dihasilkan?",
    "Daripada bahan buangan organisma hidup seperti sisa tumbuhan dan tinja haiwan",
  ],
  [
    "Mengapakah Malaysia mengeksport minyak mentah gred premium?",
    "Kerana mempunyai kandungan sulfur yang rendah dan berkualiti tinggi",
  ],
  [
    "Apakah fungsi turbin dalam stesen hidroelektrik?",
    "Turbin diputarkan oleh aliran air untuk menghasilkan tenaga elektrik",
  ],
  [
    "Nyatakan satu krisis sumber dari aspek ekonomi.",
    "Peningkatan kos sara hidup akibat kenaikan harga sumber",
  ],
  [
    "Bagaimanakah krisis sumber menjejaskan pendapatan negara?",
    "Pendapatan pengeksport dan pengimport menjadi tidak menentu",
  ],
  [
    "Berikan satu kesan krisis sumber terhadap politik.",
    "Perebutan kawasan yang mempunyai sumber semula jadi sehingga membawa kepada konflik wilayah",
  ],
  [
    "Apakah itu tekanan politik dalam konteks sumber?",
    "Tekanan yang dikenakan ke atas negara-negara pengeluar sumber oleh negara kuasa besar",
  ],
  [
    "Nyatakan dua kesan krisis sumber terhadap masyarakat.",
    "Peningkatan kadar kemiskinan dan kebuluran",
  ],
  [
    "Mengapakah masalah sosial wujud akibat krisis sumber?",
    "Kekurangan pendapatan dan sumber membawa kepada masalah seperti jenayah dan pengangguran",
  ],
  [
    "Terangkan kesan krisis sumber terhadap alam sekitar.",
    "Kemerosotan kualiti alam sekitar dan ketidakseimbangan ekosistem",
  ],
  [
    "Apakah kesan eksploitasi hutan terhadap flora dan fauna?",
    "Kemusnahan habitat menyebabkan kepupusan pelbagai spesies",
  ],
  [
    "Mengapakah harga petroleum sering naik di pasaran dunia?",
    "Kerana kuantiti sumber semakin berkurangan berbanding permintaan yang tinggi",
  ],
  [
    "Apakah implikasi kejatuhan nilai mata wang terhadap kuasa beli?",
    "Kuasa beli penduduk menjadi lemah kerana harga barang import meningkat",
  ],
  [
    "Bagaimanakah krisis sumber boleh mencetuskan perang?",
    "Perebutan wilayah yang kaya dengan mineral atau bahan api",
  ],
  ["Apakah kesan krisis makanan global?", "Peningkatan kadar kebuluran di negara-negara membangun"],
  [
    "Sejauh manakah ketidakseimbangan ekosistem memberi kesan kepada manusia?",
    "Mengganggu rantaian makanan dan menyebabkan bencana alam",
  ],
  [
    "Mengapakah generasi akan datang mungkin tidak mengenali flora tertentu?",
    "Akibat kemusnahan hutan yang berterusan untuk sumber ekonomi",
  ],
  [
    "Apakah cara terbaik menangani krisis sumber?",
    "Pengurusan yang terancang, penggunaan tenaga alternatif, dan kerjasama ekonomi",
  ],
  ["Apakah maksud ASEAN?", "Pertubuhan Negara-negara Asia Tenggara"],
  [
    "Bilakah ASEAN ditubuhkan dan berapakah anggotanya?",
    "Ditubuhkan pada 1967, dianggotai 10 buah negara",
  ],
  [
    "Apakah fokus utama kerjasama IMS-GT?",
    "Pelaburan, perdagangan, pertanian, perikanan, dan pelancongan",
  ],
  [
    "Bilakah IMS-GT ditubuhkan dan kawasan mana yang terlibat?",
    "Ditubuhkan pada 1992; melibatkan Singapura, Indonesia, dan wilayah selatan Malaysia (Johor, Melaka, N. Sembilan, Pahang)",
  ],
  [
    "Nyatakan fokus utama kerjasama IMT-GT.",
    "Pertanian, industri asas tani, produk halal, dan pelancongan",
  ],
  ["Bilakah IMT-GT ditubuhkan?", "Tahun 1994"],
  [
    "Apakah itu Kesatuan Eropah (EU)?",
    "Kerjasama ekonomi melibatkan 28 buah negara di Eropah (dahulunya Komuniti Ekonomi Eropah)",
  ],
  [
    "Nyatakan keistimewaan perdagangan dalam EU.",
    "Perdagangan bebas tanpa had kuantiti import/eksport antara negara anggota",
  ],
  [
    "Apakah tujuan penubuhan APEC?",
    "Menggalakkan perdagangan bebas dan pelaburan di rantau Asia Pasifik",
  ],
  ["Bilakah APEC ditubuhkan?", "Tahun 1989"],
  ["Berikan dua contoh negara anggota APEC.", "China dan Amerika Syarikat"],
  [
    "Apakah fungsi utama Pertubuhan Perdagangan Dunia (WTO)?",
    "Mengendalikan sistem perdagangan global dan menyelesaikan pertikaian perdagangan",
  ],
  [
    "Bilakah WTO ditubuhkan dan berapa banyakkah negara anggotanya?",
    "Ditubuhkan pada 1995, melibatkan 164 buah negara",
  ],
  ["Namakan agensi Malaysia yang menguruskan perdagangan luar.", "MATRADE dan MITI"],
  [
    "Apakah peranan Malaysia dalam persidangan APEC?",
    "Malaysia menjadi tuan rumah persidangan pada 1998 dan 2020",
  ],
  ["Adakah Australia menganggotai ASEAN?", "Tidak"],
  [
    "Nyatakan dua negara rakan dagang utama Malaysia untuk eksport petroleum.",
    "Australia dan India",
  ],
  ["Ke manakah kayu balak Malaysia paling banyak dieksport (67%)?", "India"],
  ["Dari manakah Malaysia paling banyak mengimport petroleum mentah?", "Arab Saudi"],
  ["Negara manakah pembekal arang batu terbesar kepada Malaysia (60%)?", "Indonesia"],
  [
    "Nyatakan satu kepentingan kerjasama ekonomi berkaitan buruh.",
    "Mempermudah kemasukan tenaga buruh asing untuk menampung keperluan sektor perkilangan dan pembinaan",
  ],
  ["Dari manakah buruh profesional biasanya berasal?", "Dari negara-negara maju"],
  [
    "Bagaimanakah pemindahan teknologi berlaku melalui pembelian barangan modal?",
    "Melalui pembelian mesin dan jentera canggih dari luar negara",
  ],
  [
    "Apakah itu pembelian ekuiti dalam pemindahan teknologi?",
    "Syarikat asing memiliki saham dalam syarikat tempatan dan melatih pekerja tempatan",
  ],
  [
    "Terangkan peranan perjanjian pelesenan.",
    "Syarikat tempatan menjadi pengedar produk keluaran syarikat asing",
  ],
  [
    "Apakah faedah kerjasama ekonomi terhadap pasaran?",
    "Meluaskan pasaran eksport bagi barangan keluaran negara",
  ],
  ["Nyatakan dua contoh negara yang melabur besar di Malaysia.", "Jepun dan Korea Selatan"],
  [
    "Sektor manakah yang menerima pelaburan langsung asing (FDI) yang tinggi?",
    "Sektor elektrik dan elektronik serta industri minyak dan gas",
  ],
  [
    "Mengapakah kerjasama ekonomi penting untuk bekalan bahan mentah?",
    "Membolehkan negara memperoleh bahan mentah yang tidak cukup di dalam negara melalui import",
  ],
  ["Negara manakah yang mengimport gas asli dari Amerika Syarikat?", "Mexico dan Kanada"],
  [
    "Apakah kesan pengurangan tarif dalam hubungan perdagangan?",
    "Mengurangkan kos barangan dan merancakkan perdagangan antarabangsa",
  ],
  [
    "Definisi tarif mengikut glosari.",
    "Cukai yang dikenakan oleh kerajaan ke atas barangan import",
  ],
  ["Apakah maksud embargo?", "Larangan mengeksport dagangan ke sesebuah negara"],
  [
    "Bagaimanakah latihan sambil kerja membantu pekerja tempatan?",
    "Pekerja atau pakar asing berkongsi kemahiran dengan pekerja tempatan",
  ],
  [
    "Mengapakah hubungan diplomatik penting untuk kerjasama ekonomi?",
    "Sebagai asas pembentukan perjanjian perdagangan yang menguntungkan kedua-dua pihak",
  ],
] as const;

export const geographyF3C9Flashcards: Flashcard[] = flashcardContent.map(
  ([front, back], index) => ({
    id: `geo-f3-c9-f${index + 1}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: "Chapter 9",
    front,
    back,
  }),
);
