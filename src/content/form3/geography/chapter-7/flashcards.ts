import type { Flashcard } from "@/data/types";

const flashcardContent = [
  ["Apakah maksud kegiatan ekonomi?", "Kegiatan manusia yang menghasilkan pendapatan"],
  [
    "Nyatakan tiga sektor utama kegiatan ekonomi di Malaysia.",
    "Sektor primer, sektor sekunder, dan sektor tertier",
  ],
  [
    "Terangkan definisi sektor primer.",
    "Kegiatan yang mengeluarkan bahan mentah terus daripada sumber semula jadi",
  ],
  [
    "Berikan lima contoh kegiatan di bawah sektor primer.",
    "Pertanian, perikanan, pembalakan, perlombongan, dan penternakan",
  ],
  [
    "Apakah fokus utama sektor sekunder?",
    "Menukarkan bahan mentah kepada barangan siap atau barangan separa siap untuk pengguna",
  ],
  [
    "Nyatakan dua contoh utama kegiatan sektor sekunder.",
    "Pembuatan (perindustrian) dan pembinaan",
  ],
  [
    "Apakah definisi sektor tertier?",
    "Kegiatan ekonomi yang menawarkan pelbagai perkhidmatan kepada orang ramai",
  ],
  [
    "Mengapakah sektor tertier juga dikenali sebagai sektor perkhidmatan?",
    "Kerana ia tidak menghasilkan barangan fizikal sebaliknya menyediakan servis seperti pengangkutan dan kewangan",
  ],
  [
    "Berikan empat contoh kegiatan di bawah sektor tertier.",
    "Pelancongan, perdagangan, pengangkutan, dan pendidikan",
  ],
  [
    "Sektor manakah yang mendominasi pertumbuhan ekonomi Malaysia pada tahun 2017?",
    "Sektor pembuatan dan perkhidmatan",
  ],
  [
    "Berikan contoh aktiviti sektor sekunder yang berasaskan sumber petroleum.",
    "Industri petrokimia seperti pembuatan plastik dan cat",
  ],
  [
    "Adakah perbankan termasuk dalam sektor primer? Jelaskan.",
    "Tidak, ia termasuk dalam sektor tertier kerana ia merupakan satu bentuk perkhidmatan kewangan",
  ],
  ["Berikan contoh barangan siap daripada sektor pembuatan.", "Kereta, televisyen, dan perabot"],
  [
    "Apakah kepentingan sektor primer kepada sektor sekunder?",
    "Membekalkan bahan mentah untuk diproses menjadi barangan siap",
  ],
  [
    "Namakan agensi yang bertanggungjawab mengumpul data guna tenaga di Malaysia.",
    "Jabatan Perangkaan Malaysia",
  ],
  ["Namakan dua tanaman jualan (komoditi) utama di Malaysia.", "Kelapa sawit dan getah"],
  ["Di manakah lokasi utama penanaman kelapa sawit di Perak?", "Teluk Intan"],
  ["Nyatakan tiga lokasi penanaman kelapa sawit di Sabah.", "Lahad Datu, Tawau, dan Sandakan"],
  [
    "Kawasan manakah di Pahang yang terkenal dengan tanaman getah dan kelapa sawit?",
    "Segi Tiga Jengka",
  ],
  ["Di manakah pusat penanaman getah yang utama di Melaka?", "Jasin dan Merlimau"],
  [
    "Negeri manakah yang mencatatkan peningkatan tertinggi kawasan tanaman sawit pada tahun 2017?",
    "Sarawak",
  ],
  [
    "Apakah fungsi utama Lembaga Minyak Sawit Malaysia (MPOB)?",
    "Merancang, menyelidik, dan membangunkan industri kelapa sawit di Malaysia",
  ],
  ["Namakan dua kawasan perindustrian utama di Selangor.", "Shah Alam dan Bangi"],
  ["Di manakah terletaknya kawasan perindustrian Bayan Lepas?", "Pulau Pinang"],
  [
    "Apakah jenis industri yang terdapat di Kidurong, Sarawak?",
    "Industri berasaskan sumber (Gas asli/Petrokimia)",
  ],
  [
    "Namakan tiga lokasi pelancongan tanah tinggi yang popular di Malaysia.",
    "Cameron Highlands, Genting Highlands, dan Bukit Tinggi",
  ],
  ["Pulau manakah di Sabah yang terkenal dengan keindahan batu karang?", "Pulau Sipadan"],
  ["Nyatakan lokasi pelancongan bersejarah yang utama di Malaysia.", "Bandaraya Melaka"],
  [
    "Di manakah terletaknya Taman Negara Mulu yang diiktiraf sebagai Tapak Warisan Dunia?",
    "Sarawak",
  ],
  ["Namakan kawasan tanaman padi yang terbesar di Malaysia.", "Dataran Kedah-Perlis"],
  [
    "Nyatakan lima faktor fizikal yang mempengaruhi kegiatan ekonomi.",
    "Bentuk muka bumi, tanih, iklim, saliran, dan bahan mentah",
  ],
  [
    "Mengapakah tanah pamah sesuai untuk pembinaan kilang?",
    "Kerana kos pembinaan lebih rendah dan mudah untuk membina jaringan pengangkutan",
  ],
  [
    "Apakah kegiatan ekonomi yang sesuai dijalankan di kawasan tanah tinggi?",
    "Pertanian (teh, sayur-sayuran) dan pelancongan",
  ],
  ["Sebutkan jenis tanih yang sesuai untuk penanaman padi sawah.", "Tanih aluvium"],
  ["Tanih laterit sangat sesuai untuk penanaman apa?", "Getah dan kelapa sawit"],
  [
    "Di manakah lokasi utama penanaman nanas yang menggunakan tanih gambut?",
    "Pontian dan Labis, Johor",
  ],
  ["Apakah kelebihan tanih beris di Pantai Timur Semenanjung?", "Sesuai untuk penanaman kenaf"],
  [
    "Bagaimanakah iklim Khatulistiwa membantu sektor pertanian di Malaysia?",
    "Suhu 27°C dan hujan 2,600mm setahun membolehkan pelbagai tanaman tumbuh sepanjang tahun",
  ],
  [
    "Mengapakah Kundasang (Sabah) sesuai untuk tanaman bunga-bungaan?",
    "Mempunyai suhu sederhana (kira-kira 18°C) yang sesuai dengan tumbuhan tersebut",
  ],
  [
    "Apakah kepentingan saliran yang baik kepada penanaman padi?",
    "Membekalkan bekalan air yang cukup melalui sistem pengairan/tali air",
  ],
  [
    "Berikan satu contoh kegiatan ekonomi tertier yang dipengaruhi oleh faktor saliran.",
    "Pelancongan air seperti Melaka River Cruise",
  ],
  ["Apakah bahan mentah utama bagi industri pembuatan perabot?", "Kayu balak"],
  ["Sebutkan bahan mentah yang diperlukan untuk menghasilkan simen.", "Batu kapur"],
  ["Kaolin digunakan sebagai bahan mentah dalam industri apa?", "Pembuatan tembikar dan jubin"],
  [
    "Mengapakah pinggir laut sesuai untuk aktiviti pelabuhan?",
    "Mempunyai kawasan perairan yang dalam dan terlindung",
  ],
  [
    "Senaraikan enam faktor manusia yang mempengaruhi kegiatan ekonomi.",
    "Dasar kerajaan, infrastruktur, teknologi, modal, pasaran, dan buruh",
  ],
  [
    "Apakah peranan Dasar Pertanian Negara?",
    "Memaksimumkan sumbangan sektor pertanian kepada KDNK negara",
  ],
  ["Namakan agensi yang membantu pekebun kecil getah dalam penanaman semula.", "RISDA"],
  [
    "Apakah peranan FELDA dan FELCRA dalam sektor pertanian?",
    "Membuka kawasan pertanian baharu dan meningkatkan taraf hidup penduduk luar bandar",
  ],
  [
    "Bagaimanakah penggunaan teknologi robotik membantu industri automotif?",
    "Mempercepatkan kerja pemasangan kereta dan menjimatkan kos",
  ],
  [
    "Berikan contoh teknologi yang digunakan dalam sektor perikanan.",
    "Gema bunyi (echo sounder) untuk mengesan kumpulan ikan",
  ],
  [
    "Apakah perbezaan antara modal domestik dan pelaburan langsung asing (FDI)?",
    "Modal domestik adalah pelaburan dalam negara (cth: MARA), manakala FDI adalah modal dari pelabur luar negara",
  ],
  [
    "Nyatakan dua jenis pasaran dalam kegiatan ekonomi.",
    "Pasaran tempatan dan pasaran antarabangsa",
  ],
  ["Berapakah umur bagi kategori tenaga buruh di Malaysia?", "15 hingga 64 tahun"],
  [
    "Mengapakah Malaysia memerlukan tenaga buruh asing dalam sektor pertanian?",
    "Bagi menampung kekurangan buruh tempatan dalam sektor perladangan",
  ],
  [
    "Nyatakan lima kepentingan kegiatan ekonomi di Malaysia.",
    "Peningkatan taraf hidup, peluang pekerjaan, kemajuan infrastruktur, pemindahan teknologi, dan proses pembandaran",
  ],
  [
    "Bagaimanakah kegiatan ekonomi dapat mengurangkan kadar pengangguran?",
    "Melalui penyediaan peluang pekerjaan dalam pelbagai sektor",
  ],
  [
    "Apakah petunjuk utama peningkatan taraf hidup penduduk?",
    "Peningkatan pendapatan per kapita, perumahan selesa, dan tahap pendidikan yang lebih baik",
  ],
  [
    "Sebutkan dua cara pemindahan teknologi berlaku di Malaysia.",
    "Latihan pekerja dan latihan sambil kerja",
  ],
  [
    "Bagaimanakah kerajaan mengurangkan kebergantungan kepada barangan import?",
    "Menggalakkan Industri Kecil Sederhana (IKS) dan meningkatkan pengeluaran pertanian tempatan",
  ],
  [
    "Berikan contoh infrastruktur pengangkutan udara yang meningkatkan sektor pelancongan.",
    "Lapangan Terbang Antarabangsa Kuala Lumpur (KLIA)",
  ],
  [
    "Apakah kepentingan pelabuhan antarabangsa seperti Pelabuhan Klang?",
    "Memudahkan urusan eksport dan import barangan",
  ],
  [
    "Namakan dua bandar yang berkembang pesat akibat kegiatan perindustrian.",
    "Shah Alam dan Bayan Lepas",
  ],
  [
    "Apakah maksud proses pembandaran (urbanisasi)?",
    "Perluasan saiz, pertambahan fungsi bandar, dan penghijrahan penduduk ke bandar",
  ],
  [
    "Apakah kriteria bagi Industri Kecil dan Sederhana (IKS)?",
    "Syarikat perkilangan dengan pusing ganti tahunan tidak melebihi RM25 juta",
  ],
] as const;

export const geographyF3C7Flashcards: Flashcard[] = flashcardContent.map(
  ([front, back], index) => ({
    id: `geo-f3-c7-f${index + 1}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: "Chapter 7",
    front,
    back,
  }),
);
