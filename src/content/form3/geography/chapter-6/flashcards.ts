import type { Flashcard } from "@/data/types";

const flashcardContent = [
  [
    "Apakah maksud sumber semula jadi?",
    "Bahan atau punca yang terdapat di sekeliling kita, sama ada di atas permukaan bumi, di dalam bumi atau di dalam air",
  ],
  [
    "Nyatakan dua jenis utama sumber semula jadi.",
    "Sumber boleh baharu dan sumber tidak boleh baharu",
  ],
  [
    "Apakah definisi sumber boleh baharu?",
    "Sumber semula jadi yang tidak akan habis walaupun diambil dan digunakan secara berterusan",
  ],
  ["Berikan empat contoh kategori sumber boleh baharu.", "Hutan, suria, tanih, dan air"],
  [
    "Apakah definisi sumber tidak boleh baharu?",
    "Sumber semula jadi yang akan habis atau pupus dalam jangka waktu tertentu jika penerokaannya tidak dikawal dan dirancang dengan baik",
  ],
  [
    "Sumber tidak boleh baharu kebanyakannya terdiri daripada sumber apa?",
    "Sumber mineral yang diperoleh melalui penggalian atau perlombongan",
  ],
  ["Apakah dua pecahan utama bagi sumber mineral?", "Mineral logam dan mineral bukan logam"],
  [
    "Namakan lima contoh mineral logam di Malaysia.",
    "Emas, bauksit, bijih timah, kuprum, dan bijih besi",
  ],
  [
    "Namakan enam contoh mineral bukan logam di Malaysia.",
    "Batu granit, kaolin, gas asli, arang batu, pasir, dan petroleum",
  ],
  [
    "Mengapakah kayu cengal dianggap sumber boleh baharu?",
    "Kerana ia merupakan hasil hutan yang boleh diperbaharu melalui penanaman semula",
  ],
  [
    "Adakah petroleum sumber boleh baharu atau tidak?",
    "Tidak boleh baharu kerana bekalannya akan habis jika digunakan secara berlebihan",
  ],
  ["Mineral manakah yang digunakan sebagai bahan asas aluminium?", "Bauksit"],
  ["Kuprum sering digunakan untuk menghasilkan apa?", "Wayar elektrik"],
  ["Apakah kegunaan utama batu granit?", "Dalam industri pembinaan"],
  ["Mineral manakah yang digunakan untuk membuat barangan piuter?", "Bijih timah"],
  [
    "Apakah maksud tenaga alternatif?",
    "Tenaga yang berasaskan alam semula jadi (suria, air, angin, dll) untuk menghasilkan sumber kuasa elektrik",
  ],
  [
    "Nyatakan satu ciri utama tenaga alternatif.",
    "Bersifat mesra alam dan digunakan untuk menggantikan penggunaan bahan api fosil",
  ],
  ["Di manakah lokasi utama penjanaan tenaga hidroelektrik di Terengganu?", "Empangan Kenyir"],
  [
    "Apakah definisi tenaga biomas?",
    "Tenaga yang dihasilkan daripada bahan buangan organisma hidup dalam sesuatu ekosistem",
  ],
  ["Di manakah lokasi tenaga biomas dibangunkan di Sarawak?", "Miri dan Sri Aman"],
  ["Namakan lokasi penggunaan tenaga angin di Malaysia.", "Pulau Layang-layang (Sabah)"],
  [
    "Apakah itu tenaga geoterma?",
    "Tenaga yang dihasilkan atau berpunca daripada haba dalaman bumi",
  ],
  [
    "Melalui proses apakah tenaga suria boleh dijana?",
    "Melalui penggunaan fotovolta atau panel solar",
  ],
  [
    "Mengapakah tenaga suria berpotensi besar di Malaysia?",
    "Kerana Malaysia menerima pancaran matahari sehingga 12 jam sehari",
  ],
  [
    "Kawasan manakah di Malaysia yang berpotensi untuk tenaga ombak?",
    "Perairan Laut China Selatan (Pahang, Terengganu, Kelantan, Sabah, dan Sarawak)",
  ],
  ["Berapakah purata jumlah hujan tahunan di Malaysia?", "Kira-kira 2,600 mm setahun"],
  [
    "Apakah fungsi utama pembinaan empangan?",
    "Menahan aliran air sungai untuk memutarkan turbin bagi menghasilkan tenaga elektrik",
  ],
  ["Namakan empangan hidroelektrik terbesar di Malaysia.", "Empangan Bakun (Sarawak)"],
  ["Berapakah kapasiti penjanaan tenaga elektrik di Empangan Bakun?", "Mampu menjana 2,400 MW"],
  ["Di manakah letaknya Empangan Tenom Pangi?", "Sabah"],
  ["Nyatakan lokasi Empangan Batang Ai.", "Sarawak"],
  [
    "Hutan Hujan Tropika biasanya dikaitkan dengan jenis tanih apa?",
    "Tanih aluvium dan tanih laterit",
  ],
  [
    "Di manakah lokasi Hutan Paya Air Tawar yang utama di Pahang?",
    "Sekitar Tasik Chini dan Tasik Bera",
  ],
  ["Apakah jenis tanih yang dominan di kawasan Hutan Pantai?", "Tanih berpasir"],
  ["Namakan lokasi terkenal bagi Hutan Paya Air Masin di Perak.", "Laut Matang"],
  ["Pokok Ru dan Pokok Kelapa merupakan sumber utama bagi hutan jenis apa?", "Hutan Pantai"],
  ["Di manakah taburan Hutan Gunung boleh ditemui di Sabah?", "Gunung Kinabalu"],
  [
    "Tanih gambut sesuai untuk pertumbuhan hutan jenis apa?",
    "Hutan Paya Air Tawar dan Hutan Paya Air Masin",
  ],
  ["Namakan dua contoh pokok kayu keras di Hutan Hujan Tropika.", "Cengal dan Meranti"],
  ["Rafflesia dan periuk kera biasanya ditemui di kawasan hutan mana?", "Hutan Gunung"],
  [
    "Di manakah lokasi utama perlombongan petroleum dan gas asli di Malaysia?",
    "Luar pesisir pantai Kelantan, Terengganu, Sabah, dan Sarawak",
  ],
  ["Namakan kawasan perlombongan emas di Pahang.", "Raub dan Kuala Lipis"],
  ["Selain di Pahang, di manakah emas turut dilombong di Sarawak?", "Bau"],
  ["Nyatakan lokasi perlombongan arang batu di Sabah.", "Silimpopon dan Maliau"],
  ["Di manakah lokasi Merit-Pila dan Silantek (Sarawak)?", "Kawasan perlombongan arang batu"],
  [
    "Apakah kegunaan utama gas asli mengikut buku teks?",
    "Sebagai bahan api domestik dan industri petrokimia",
  ],
  ["Mineral manakah yang digunakan untuk melebur besi?", "Arang batu"],
  ["Kaolin digunakan untuk menghasilkan barangan apa?", "Barangan tembikar dan porselin"],
  ["Pasir merupakan bahan mentah penting untuk pembuatan apa?", "Barangan kaca"],
  [
    "Apakah persamaan ciri antara petroleum dan gas asli?",
    "Kedua-duanya sumber mineral bukan logam yang dilombong di dasar laut",
  ],
  [
    "Apakah kepentingan utama sumber semula jadi kepada ekonomi Malaysia?",
    "Sebagai sumber bahan mentah, peluang pekerjaan, menjana pendapatan negara, dan pembukaan kawasan baharu",
  ],
  ["Berikan contoh industri hiliran yang berasaskan petroleum.", "Industri petrokimia"],
  ["Kayu balak merupakan bahan asas bagi industri apa?", "Industri pembuatan perabot"],
  [
    "Apakah maksud industri hiliran?",
    "Industri yang berkembang daripada penggunaan bahan mentah yang telah diproses",
  ],
  [
    "Sebutkan sektor yang paling banyak menggunakan tenaga kerja pada tahun 2015.",
    "Sektor perkhidmatan (55.3%)",
  ],
  [
    "Bagaimanakah sumber semula jadi menyumbang kepada kemajuan infrastruktur?",
    "Melalui pembangunan jalan raya, pelabuhan, dan lapangan terbang untuk memudahkan pengurusan sumber",
  ],
  [
    "Namakan lebuh raya yang dibina untuk memudahkan akses sumber di Pantai Timur.",
    "Lebuhraya Jerangau",
  ],
  [
    "Mengapakah landasan kereta api Taiping ke Kuala Sepetang dibina pada kurun ke-19?",
    "Untuk mengangkut bijih timah",
  ],
  [
    "Namakan dua bandar baharu yang muncul akibat industri petroleum di Terengganu.",
    "Kerteh dan Paka",
  ],
  [
    "Apakah bandar baharu yang berkembang pesat di Sarawak akibat sumber gas asli?",
    "Bintulu dan Miri",
  ],
  [
    "Apakah peranan Jabatan Mineral dan Geosains Malaysia?",
    "Menyediakan kepakaran dalam bidang mineral, geosains, dan perlombongan untuk menggalakkan pelaburan",
  ],
  [
    "Bagaimanakah sumber hutan menyumbang kepada industri kraf tangan?",
    "Menyediakan hasil hutan seperti rotan dan buluh sebagai bahan mentah",
  ],
  [
    "Apakah sumbangan sumber semula jadi terhadap KDNK negara?",
    "Menjana pendapatan negara melalui eksport bahan mentah seperti petroleum, gas asli, dan kayu balak",
  ],
  ["Nyatakan satu contoh barangan yang diperbuat daripada sumber kaolin.", "Tembikar"],
  [
    "Mengapakah pengurusan sumber yang cekap penting untuk masa hadapan?",
    "Untuk menjamin bekalan sumber yang berterusan dan mengekalkan kelestarian alam sekitar",
  ],
] as const;

export const geographyF3C6Flashcards: Flashcard[] = flashcardContent.map(
  ([front, back], index) => ({
    id: `geo-f3-c6-f${index + 1}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: "Chapter 6",
    front,
    back,
  }),
);
