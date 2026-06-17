// ─── Karangan Pendek — Pusat Persediaan Peperiksaan Lengkap (KSSM Tingkatan 1) ──
// Data sahaja. Paparan diuruskan oleh src/components/KaranganPendekHub.tsx

export interface FormulaSkorAStep {
  code: string;
  label: string;
  desc: string;
}

export const FORMULA_SKOR_A_FLOW = [
  "Pendahuluan",
  "Isi 1 + Huraian + Kesan",
  "Isi 2 + Huraian + Kesan",
  "Isi 3 + Huraian + Kesan",
  "Kesimpulan + Harapan",
];

export const FORMULA_SKOR_A_CODE = "P + IHK + IHK + IHK + KH";

export const FORMULA_SKOR_A_STEPS: FormulaSkorAStep[] = [
  { code: "P", label: "Pendahuluan", desc: "Satu ayat topik berdasarkan tajuk bahan grafik." },
  { code: "I", label: "Isi", desc: "Maklumat penting yang dipilih daripada bahan grafik." },
  { code: "H", label: "Huraian", desc: "Penjelasan lanjut tentang isi yang ditulis." },
  { code: "K", label: "Kesan", desc: "Akibat, kepentingan atau hasil daripada isi tersebut." },
  { code: "KH", label: "Kesimpulan + Harapan", desc: "Rumusan keseluruhan disertai satu harapan." },
];

export interface PenandaWacanaGroup {
  kategori: string;
  items: string[];
}

export const PENANDA_WACANA_GROUPS: PenandaWacanaGroup[] = [
  { kategori: "Pendahuluan", items: ["Pada masa kini", "Sejak akhir-akhir ini", "Mutakhir ini"] },
  { kategori: "Isi", items: ["Antaranya", "Selain itu", "Di samping itu", "Seterusnya"] },
  { kategori: "Penutup", items: ["Kesimpulannya", "Oleh itu", "Jelaslah bahawa"] },
];

export interface UngkapanMenarikItem {
  tema: string;
  icon: string;
  ungkapan: string;
}

export const UNGKAPAN_MENARIK_BANK: UngkapanMenarikItem[] = [
  { tema: "Kesihatan", icon: "🩺", ungkapan: "Mencegah lebih baik daripada mengubati" },
  { tema: "Pendidikan", icon: "📚", ungkapan: "Melentur buluh biarlah dari rebungnya" },
  { tema: "Perpaduan", icon: "🤝", ungkapan: "Bersatu teguh, bercerai roboh" },
  { tema: "Kebersihan", icon: "🧹", ungkapan: "Kebersihan asas kesihatan" },
  { tema: "Teknologi", icon: "💻", ungkapan: "Teknologi pemangkin kemajuan" },
  { tema: "Patriotisme", icon: "🇲🇾", ungkapan: "Cintakan negara tanda warga bertanggungjawab" },
];

export interface GrafikJenis {
  nama: string;
  icon: "Table2" | "PieChart" | "BarChart3" | "Network" | "ScrollText" | "Image";
  tip: string;
}

export const GRAFIK_JENIS: GrafikJenis[] = [
  { nama: "Jadual", icon: "Table2", tip: "Baca tajuk lajur dan baris, bandingkan nilai tertinggi dan terendah." },
  { nama: "Carta Pai", icon: "PieChart", tip: "Kenal pasti bahagian paling besar dan paling kecil dalam bulatan." },
  { nama: "Carta Bar", icon: "BarChart3", tip: "Bandingkan ketinggian setiap bar — cari yang tertinggi dan terendah." },
  { nama: "Peta Minda", icon: "Network", tip: "Mula daripada topik utama di tengah, ikut setiap cabang sebagai satu isi." },
  { nama: "Poster", icon: "ScrollText", tip: "Cari slogan, tajuk besar dan senarai langkah atau maklumat yang disenaraikan." },
  { nama: "Gambar", icon: "Image", tip: "Perhatikan aktiviti, watak dan suasana — huraikan secara teratur." },
];

export const GRAFIK_STEPS: string[] = [
  "Cari tajuk grafik untuk tahu topik utama",
  "Cari isi utama yang ditunjukkan dalam grafik",
  "Pilih 3-4 isi terbaik sahaja — jangan ambil semua",
  "Jangan salin bulat-bulat ayat atau frasa dalam grafik",
  "Kembangkan isi yang dipilih menjadi ayat penuh dengan huraian",
];

export interface IsiAyatContoh {
  ringkas: string;
  ayatPenuh: string;
}

export const ISI_CONTOH_TOPIK = "Langkah Pencegahan Denggi";

export const ISI_CONTOH_GRAFIK: string[] = [
  "Membersihkan longkang",
  "Menutup bekas air",
  "Menggunakan semburan",
];

export const ISI_CONTOH_AYAT: IsiAyatContoh[] = [
  {
    ringkas: "Isi 1: Membersihkan longkang",
    ayatPenuh: "Antaranya, penduduk perlu membersihkan longkang agar air tidak bertakung dan menjadi tempat pembiakan nyamuk.",
  },
  {
    ringkas: "Isi 2: Menutup bekas air",
    ayatPenuh: "Selain itu, semua bekas takungan air perlu ditutup rapat untuk mengelakkan nyamuk Aedes bertelur.",
  },
  {
    ringkas: "Isi 3: Menggunakan semburan",
    ayatPenuh: "Di samping itu, pihak berkuasa perlu menjalankan semburan racun serangga di kawasan yang dikenal pasti berisiko tinggi.",
  },
];

export interface KesalahanLazimItem {
  label: string;
  mengapa: string;
  caraBetulkan: string;
}

export const KESALAHAN_LAZIM: KesalahanLazimItem[] = [
  {
    label: "Kurang daripada 50 patah perkataan",
    mengapa: "Karangan terlalu ringkas dan isi tidak berkembang, markah akan dipotong.",
    caraBetulkan: "Tambah huraian ringkas pada setiap isi dan gunakan penanda wacana untuk menyambung ayat.",
  },
  {
    label: "Lebih daripada 80 patah perkataan",
    mengapa: "Karangan tidak mengikut arahan soalan dan membuang masa peperiksaan.",
    caraBetulkan: "Pilih hanya 3-4 isi terpenting dan elakkan huraian yang berulang-ulang.",
  },
  {
    label: "Menyalin grafik bulat-bulat",
    mengapa: "Tidak menunjukkan kefahaman dan kemahiran berbahasa pelajar sendiri.",
    caraBetulkan: "Tukar frasa dalam grafik kepada ayat sendiri dengan kata kerja dan kata hubung yang sesuai.",
  },
  {
    label: "Tiada penanda wacana",
    mengapa: "Karangan kelihatan berselerak dan tidak mengalir dengan baik antara isi.",
    caraBetulkan: "Gunakan penanda wacana seperti 'antaranya', 'selain itu', 'di samping itu' antara isi.",
  },
  {
    label: "Tiada kesimpulan",
    mengapa: "Karangan kelihatan tidak lengkap walaupun semua isi telah ditulis.",
    caraBetulkan: "Tulis satu ayat penutup yang bermula dengan 'Kesimpulannya' atau 'Oleh itu'.",
  },
  {
    label: "Bahasa pasar",
    mengapa: "Bahasa tidak formal tidak sesuai digunakan dalam karangan peperiksaan.",
    caraBetulkan: "Gunakan bahasa baku, contohnya 'tidak' bukan 'tak', dan 'sangat' bukan 'sgt'.",
  },
  {
    label: "Tidak mengembangkan isi",
    mengapa: "Isi yang hanya disenaraikan tanpa huraian dianggap kurang lengkap oleh pemeriksa.",
    caraBetulkan: "Tambah satu ayat huraian atau kesan selepas setiap isi utama ditulis.",
  },
];

export interface PerbandinganAspek {
  aspek: string;
  lemah: string;
  cemerlang: string;
}

export const LEMAH_VS_CEMERLANG: PerbandinganAspek[] = [
  { aspek: "Bilangan Patah Perkataan", lemah: "35 patah perkataan (terlalu sedikit)", cemerlang: "68 patah perkataan (tepat dalam julat 50–80)" },
  { aspek: "Penanda Wacana", lemah: "Tiada penanda wacana, ayat berselerak", cemerlang: "Menggunakan 'antaranya', 'selain itu', 'kesimpulannya'" },
  { aspek: "Huraian", lemah: "Isi disenaraikan tanpa huraian", cemerlang: "Setiap isi disertai huraian ringkas" },
  { aspek: "Kesimpulan", lemah: "Tiada ayat penutup", cemerlang: "Ada ayat kesimpulan yang jelas" },
  { aspek: "Markah Anggaran", lemah: "3 / 10", cemerlang: "9 / 10" },
];

export interface ContohEssayParts {
  pendahuluan: string;
  isi1: string;
  isi2: string;
  isi3: string;
  kesimpulan: string;
}

export interface ContohKaranganTema {
  id: string;
  tema: string;
  icon: string;
  tajukGrafik: string;
  grafik: string[];
  rangka: { pendahuluan: string; isi: string[]; kesimpulan: string };
  karangan: ContohEssayParts;
}

export const CONTOH_KARANGAN_CEMERLANG: ContohKaranganTema[] = [
  {
    id: "kesihatan",
    tema: "Kesihatan",
    icon: "🩺",
    tajukGrafik: "Poster: Cara Mengelakkan Selesema",
    grafik: ["Memakai pelitup muka", "Mencuci tangan kerap", "Mengelakkan tempat sesak"],
    rangka: {
      pendahuluan: "Poster - cara elak selesema",
      isi: ["Pakai pelitup muka", "Cuci tangan kerap", "Elak tempat sesak"],
      kesimpulan: "Amalan kesihatan elak jangkitan",
    },
    karangan: {
      pendahuluan: "Poster di atas menunjukkan beberapa cara untuk mengelakkan jangkitan selesema dalam kalangan masyarakat.",
      isi1: "Antaranya, setiap orang perlu memakai pelitup muka semasa berada di tempat awam untuk mengurangkan risiko jangkitan.",
      isi2: "Selain itu, mencuci tangan dengan kerap menggunakan sabun dapat membunuh kuman yang melekat pada tangan.",
      isi3: "Di samping itu, masyarakat digalakkan mengelakkan tempat yang sesak terutamanya semasa musim selesema merebak.",
      kesimpulan: "Kesimpulannya, amalan kesihatan yang baik dapat mengelakkan penyebaran selesema dalam komuniti.",
    },
  },
  {
    id: "pendidikan",
    tema: "Pendidikan",
    icon: "📚",
    tajukGrafik: "Carta Bar: Aktiviti Galakan Membaca",
    grafik: ["Program Nilam", "Sudut Bacaan Kelas", "Pertandingan Membaca"],
    rangka: {
      pendahuluan: "Carta bar - aktiviti galak membaca",
      isi: ["Program Nilam", "Sudut bacaan kelas", "Pertandingan membaca"],
      kesimpulan: "Usaha berterusan pupuk tabiat membaca",
    },
    karangan: {
      pendahuluan: "Carta bar di atas menunjukkan beberapa aktiviti yang dijalankan untuk meningkatkan minat membaca dalam kalangan murid.",
      isi1: "Antaranya, sekolah menjalankan Program Nilam supaya murid digalakkan membaca buku secara berterusan.",
      isi2: "Selain itu, setiap kelas menyediakan sudut bacaan agar murid mudah mendapatkan buku semasa waktu lapang.",
      isi3: "Seterusnya, pihak sekolah mengadakan pertandingan membaca untuk menarik minat murid terhadap aktiviti membaca.",
      kesimpulan: "Kesimpulannya, pelbagai usaha perlu dilaksanakan secara berterusan untuk memupuk tabiat membaca dalam kalangan murid.",
    },
  },
  {
    id: "teknologi",
    tema: "Teknologi",
    icon: "💻",
    tajukGrafik: "Jadual: Faedah Telefon Pintar dalam Pembelajaran",
    grafik: ["Mencari maklumat", "Belajar secara dalam talian", "Berhubung dengan guru"],
    rangka: {
      pendahuluan: "Jadual - faedah telefon pintar",
      isi: ["Cari maklumat", "Belajar dalam talian", "Hubung guru"],
      kesimpulan: "Banyak manfaat jika guna bijak",
    },
    karangan: {
      pendahuluan: "Jadual di atas menunjukkan beberapa faedah penggunaan telefon pintar dalam proses pembelajaran murid.",
      isi1: "Antaranya, murid dapat mencari maklumat tambahan dengan pantas untuk melengkapkan kerja sekolah.",
      isi2: "Selain itu, murid boleh mengikuti pembelajaran secara dalam talian pada bila-bila masa sahaja.",
      isi3: "Di samping itu, telefon pintar membolehkan murid berhubung dengan guru untuk bertanya soalan berkaitan pelajaran.",
      kesimpulan: "Kesimpulannya, telefon pintar memberi banyak manfaat sekiranya digunakan secara bijak dalam pembelajaran.",
    },
  },
  {
    id: "patriotisme",
    tema: "Patriotisme",
    icon: "🇲🇾",
    tajukGrafik: "Gambar: Sambutan Hari Kebangsaan",
    grafik: ["Mengibarkan bendera", "Menyanyikan lagu patriotik", "Menghadiri perbarisan"],
    rangka: {
      pendahuluan: "Gambar - pupuk semangat patriotisme",
      isi: ["Kibar bendera", "Nyanyi lagu patriotik", "Hadiri perbarisan"],
      kesimpulan: "Semangat patriotisme demi negara",
    },
    karangan: {
      pendahuluan: "Gambar di atas menunjukkan beberapa aktiviti yang dijalankan untuk memupuk semangat patriotisme dalam kalangan rakyat.",
      isi1: "Antaranya, rakyat mengibarkan bendera Jalur Gemilang di rumah masing-masing sebagai tanda cinta akan negara.",
      isi2: "Selain itu, lagu-lagu patriotik dinyanyikan secara beramai-ramai untuk membangkitkan semangat cinta akan tanah air.",
      isi3: "Di samping itu, ramai rakyat menghadiri perbarisan sambutan Hari Kebangsaan yang diadakan di seluruh negara.",
      kesimpulan: "Kesimpulannya, semangat patriotisme perlu disemai dalam diri setiap rakyat demi kesejahteraan negara.",
    },
  },
  {
    id: "kebersihan",
    tema: "Kebersihan",
    icon: "🧹",
    tajukGrafik: "Poster: Sekolah Bersih",
    grafik: ["Membuang sampah pada tong sampah", "Mengadakan gotong-royong", "Mengasingkan sampah kitar semula"],
    rangka: {
      pendahuluan: "Poster - jaga kebersihan sekolah",
      isi: ["Buang sampah di tong", "Gotong-royong", "Asing sampah kitar semula"],
      kesimpulan: "Kerjasama jaga kebersihan sekolah",
    },
    karangan: {
      pendahuluan: "Poster di atas menunjukkan beberapa langkah untuk menjaga kebersihan kawasan sekolah.",
      isi1: "Antaranya, setiap murid perlu membuang sampah ke dalam tong sampah yang disediakan di kawasan sekolah.",
      isi2: "Selain itu, pihak sekolah mengadakan gotong-royong pada hujung minggu untuk membersihkan kawasan sekolah.",
      isi3: "Di samping itu, murid digalakkan mengasingkan sampah kitar semula daripada sampah biasa.",
      kesimpulan: "Kesimpulannya, kerjasama semua pihak amat penting untuk memastikan kawasan sekolah sentiasa bersih.",
    },
  },
  {
    id: "alam-sekitar",
    tema: "Alam Sekitar",
    icon: "🌳",
    tajukGrafik: "Carta Pai: Aktiviti Kitar Semula",
    grafik: ["Mengitar semula plastik", "Menjimatkan penggunaan air", "Menanam pokok"],
    rangka: {
      pendahuluan: "Carta pai - langkah jaga alam sekitar",
      isi: ["Kitar semula plastik", "Jimat air", "Tanam pokok"],
      kesimpulan: "Tanggungjawab jaga alam sekitar",
    },
    karangan: {
      pendahuluan: "Carta pai di atas menunjukkan beberapa langkah yang boleh diambil untuk menjaga alam sekitar.",
      isi1: "Antaranya, masyarakat digalakkan mengitar semula bahan plastik supaya tidak mencemarkan alam sekitar.",
      isi2: "Selain itu, setiap individu perlu menjimatkan penggunaan air bagi mengelakkan pembaziran sumber semula jadi.",
      isi3: "Seterusnya, aktiviti menanam pokok perlu dipergiatkan untuk mengekalkan keseimbangan ekosistem.",
      kesimpulan: "Kesimpulannya, setiap individu bertanggungjawab menjaga alam sekitar demi kesejahteraan generasi akan datang.",
    },
  },
  {
    id: "minggu-bahasa-melayu",
    tema: "Minggu Bahasa Melayu",
    icon: "🗣️",
    tajukGrafik: "Jadual: Aktiviti Minggu Bahasa Melayu",
    grafik: ["Pertandingan pidato", "Pertandingan deklamasi sajak", "Pameran buku"],
    rangka: {
      pendahuluan: "Jadual - aktiviti Minggu Bahasa Melayu",
      isi: ["Pertandingan pidato", "Deklamasi sajak", "Pameran buku"],
      kesimpulan: "Martabatkan bahasa Melayu",
    },
    karangan: {
      pendahuluan: "Jadual di atas menunjukkan beberapa aktiviti yang dianjurkan sempena Minggu Bahasa Melayu di sekolah.",
      isi1: "Antaranya, pertandingan pidato diadakan untuk menggilap kemahiran berbahasa dalam kalangan murid.",
      isi2: "Selain itu, pertandingan deklamasi sajak dijalankan untuk memupuk minat murid terhadap kesusasteraan Melayu.",
      isi3: "Di samping itu, pameran buku diadakan untuk menggalakkan murid membaca bahan dalam bahasa Melayu.",
      kesimpulan: "Kesimpulannya, Minggu Bahasa Melayu berperanan penting dalam memartabatkan bahasa Melayu di sekolah.",
    },
  },
  {
    id: "hari-kemerdekaan",
    tema: "Hari Kemerdekaan",
    icon: "🎉",
    tajukGrafik: "Gambar: Sambutan Hari Kemerdekaan di Sekolah",
    grafik: ["Perbarisan murid", "Pertandingan menghias kelas", "Nyanyian lagu kebangsaan"],
    rangka: {
      pendahuluan: "Gambar - sambutan Hari Kemerdekaan",
      isi: ["Perbarisan murid", "Hias kelas", "Nyanyi lagu kebangsaan"],
      kesimpulan: "Pupuk cinta akan negara",
    },
    karangan: {
      pendahuluan: "Gambar di atas menunjukkan beberapa aktiviti sempena sambutan Hari Kemerdekaan di sekolah.",
      isi1: "Antaranya, murid mengambil bahagian dalam perbarisan sebagai tanda menghormati kemerdekaan negara.",
      isi2: "Selain itu, pertandingan menghias kelas dengan tema kemerdekaan diadakan untuk memeriahkan sambutan tersebut.",
      isi3: "Di samping itu, semua murid menyanyikan lagu kebangsaan dengan penuh semangat pada hari tersebut.",
      kesimpulan: "Kesimpulannya, sambutan Hari Kemerdekaan dapat memupuk rasa cinta murid terhadap negara.",
    },
  },
  {
    id: "perpaduan",
    tema: "Perpaduan",
    icon: "🤝",
    tajukGrafik: "Peta Minda: Perpaduan Kaum",
    grafik: ["Mengadakan rumah terbuka", "Menyertai aktiviti kemasyarakatan", "Saling menghormati budaya"],
    rangka: {
      pendahuluan: "Peta minda - ukuh perpaduan kaum",
      isi: ["Rumah terbuka", "Aktiviti kemasyarakatan", "Hormat budaya kaum lain"],
      kesimpulan: "Perpaduan jamin kestabilan negara",
    },
    karangan: {
      pendahuluan: "Peta minda di atas menunjukkan beberapa cara untuk mengukuhkan perpaduan kaum di Malaysia.",
      isi1: "Antaranya, rumah terbuka diadakan semasa perayaan untuk mengeratkan hubungan antara kaum yang berbeza.",
      isi2: "Selain itu, penyertaan dalam aktiviti kemasyarakatan dapat memupuk semangat kerjasama antara kaum.",
      isi3: "Di samping itu, setiap kaum perlu saling menghormati adat dan budaya kaum lain.",
      kesimpulan: "Kesimpulannya, perpaduan kaum yang utuh dapat menjamin keharmonian dan kestabilan negara.",
    },
  },
  {
    id: "kokurikulum",
    tema: "Kokurikulum",
    icon: "🏆",
    tajukGrafik: "Carta Bar: Faedah Penyertaan Aktiviti Kokurikulum",
    grafik: ["Membina jati diri", "Meningkatkan kecergasan fizikal", "Mengeratkan silaturahim"],
    rangka: {
      pendahuluan: "Carta bar - faedah kokurikulum",
      isi: ["Bina jati diri", "Tingkat kecergasan", "Erat silaturahim"],
      kesimpulan: "Kokurikulum bantu perkembangan holistik",
    },
    karangan: {
      pendahuluan: "Carta bar di atas menunjukkan beberapa faedah penyertaan murid dalam aktiviti kokurikulum.",
      isi1: "Antaranya, penyertaan dalam aktiviti kokurikulum dapat membina jati diri dan keyakinan murid.",
      isi2: "Selain itu, aktiviti seperti sukan dapat meningkatkan tahap kecergasan fizikal murid.",
      isi3: "Di samping itu, aktiviti kokurikulum dapat mengeratkan silaturahim antara murid daripada latar belakang berbeza.",
      kesimpulan: "Kesimpulannya, aktiviti kokurikulum memberi banyak faedah kepada perkembangan diri murid secara holistik.",
    },
  },
];

export interface LatihanBerpanduTema {
  id: string;
  tema: string;
  icon: string;
  tajukGrafik: string;
  grafik: string[];
  isiBetul: string[];
  modelKaranganRef: string;
}

export const LATIHAN_BERPANDU: LatihanBerpanduTema[] = [
  {
    id: "latihan-kesihatan",
    tema: "Kesihatan",
    icon: "🩺",
    tajukGrafik: "Poster: Cara Mencegah Demam Denggi",
    grafik: ["Membersihkan kawasan rumah", "Memakai losyen anti-nyamuk", "Melaporkan kawasan lopak air"],
    isiBetul: [
      "Bersihkan kawasan rumah daripada sampah yang bertakung",
      "Gunakan losyen anti-nyamuk semasa keluar rumah",
      "Laporkan kawasan lopak air kepada pihak berkuasa",
    ],
    modelKaranganRef: "kesihatan",
  },
  {
    id: "latihan-pendidikan",
    tema: "Pendidikan",
    icon: "📚",
    tajukGrafik: "Jadual: Cara Meningkatkan Prestasi Akademik",
    grafik: ["Membuat jadual belajar", "Menyertai kelas tambahan", "Berbincang dengan rakan sebaya"],
    isiBetul: [
      "Sediakan jadual belajar yang teratur",
      "Sertai kelas tambahan untuk subjek yang lemah",
      "Berbincang dan belajar bersama rakan sebaya",
    ],
    modelKaranganRef: "pendidikan",
  },
  {
    id: "latihan-teknologi",
    tema: "Teknologi",
    icon: "💻",
    tajukGrafik: "Carta Bar: Kegunaan Komputer dalam Pembelajaran",
    grafik: ["Menyiapkan tugasan", "Mengakses bahan rujukan", "Mengikuti kelas maya"],
    isiBetul: [
      "Gunakan komputer untuk menyiapkan tugasan sekolah",
      "Akses bahan rujukan tambahan secara dalam talian",
      "Ikuti kelas maya pada bila-bila masa",
    ],
    modelKaranganRef: "teknologi",
  },
  {
    id: "latihan-patriotisme",
    tema: "Patriotisme",
    icon: "🇲🇾",
    tajukGrafik: "Gambar: Aktiviti Sempena Bulan Kemerdekaan",
    grafik: ["Memasang bendera di rumah", "Menghadiri program kerajaan", "Memakai pakaian bertemakan kemerdekaan"],
    isiBetul: [
      "Pasang bendera Jalur Gemilang di hadapan rumah",
      "Hadiri program anjuran kerajaan tempatan",
      "Pakai pakaian bertemakan kemerdekaan semasa sambutan",
    ],
    modelKaranganRef: "patriotisme",
  },
  {
    id: "latihan-kebersihan",
    tema: "Kebersihan",
    icon: "🧹",
    tajukGrafik: "Poster: Amalan Kebersihan Diri",
    grafik: ["Mencuci tangan sebelum makan", "Memotong kuku dengan kerap", "Menggosok gigi dua kali sehari"],
    isiBetul: [
      "Cuci tangan sebelum dan selepas makan",
      "Potong kuku dengan kerap supaya kuman tidak bersarang",
      "Gosok gigi sekurang-kurangnya dua kali sehari",
    ],
    modelKaranganRef: "kebersihan",
  },
];

export const QUICK_REVISION_CHECKLIST: string[] = [
  "50–80 patah perkataan",
  "Ada pendahuluan",
  "Ada 3 isi",
  "Ada huraian",
  "Ada kesimpulan",
  "Ada penanda wacana",
  "Ada ungkapan menarik",
];

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function essayWordCount(parts: ContohEssayParts): number {
  return countWords(`${parts.pendahuluan} ${parts.isi1} ${parts.isi2} ${parts.isi3} ${parts.kesimpulan}`);
}
