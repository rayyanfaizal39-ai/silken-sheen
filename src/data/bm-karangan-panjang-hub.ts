// ─── Karangan Panjang (Respons Terbuka) — Pusat Persediaan Peperiksaan Lengkap (KSSM Tingkatan 1) ──
// Data sahaja. Paparan diuruskan oleh src/components/KaranganPanjangHub.tsx

export const FORMULA_PANJANG_FLOW = ["Pendahuluan", "Isi 1", "Isi 2", "Isi 3", "Isi 4", "Isi 5", "Penutup"];

export const FORMULA_PANJANG_NOTES: string[] = [
  "Melebihi 180 patah perkataan",
  "Disyorkan 250–350 patah perkataan",
  "Sekurang-kurangnya 5 isi",
  "Menggunakan penanda wacana",
  "Menggunakan ungkapan menarik",
];

export interface ImbakStep {
  code: string;
  label: string;
  desc: string;
}

export const IMBAK_STEPS: ImbakStep[] = [
  { code: "I", label: "Isi", desc: "Nyatakan satu isi atau idea utama yang berkaitan dengan tajuk." },
  { code: "M", label: "Mengapa", desc: "Jelaskan sebab atau rasional isi tersebut penting." },
  { code: "B", label: "Bagaimana", desc: "Huraikan cara atau langkah isi tersebut dilaksanakan." },
  { code: "A", label: "Akibat / Kesan", desc: "Nyatakan kesan sekiranya isi itu diamalkan atau diabaikan." },
  { code: "K", label: "Kesimpulan Kecil", desc: "Tutup perenggan isi dengan satu ayat rumusan ringkas." },
];

export interface ImbakExample {
  i: string;
  m: string;
  b: string;
  a: string;
  k: string;
}

export const IMBAK_WORKED_EXAMPLE: ImbakExample = {
  i: "Salah satu isi yang dapat dikemukakan ialah kepentingan mengamalkan kitar semula dalam kehidupan seharian.",
  m: "Hal ini demikian kerana kitar semula dapat mengurangkan jumlah sampah yang dihantar ke tapak pelupusan serta menjimatkan sumber asli yang semakin berkurangan.",
  b: "Bagi merealisasikannya, setiap rumah dan sekolah perlu menyediakan tong kitar semula yang berasingan mengikut kategori seperti plastik, kertas dan kaca.",
  a: "Sekiranya amalan ini diabaikan, pencemaran alam sekitar akan semakin serius dan sumber asli akan cepat pupus.",
  k: "Tegasnya, kitar semula merupakan langkah mudah tetapi memberi impak besar kepada kelestarian alam sekitar.",
};

export interface PendahuluanPart {
  part: string;
  desc: string;
  example: string;
}

export const PENDAHULUAN_PARTS: PendahuluanPart[] = [
  {
    part: "Pengenalan",
    desc: "Satu hingga dua ayat umum yang mengaitkan tajuk dengan isu semasa atau konteks yang lebih luas.",
    example: "Pada masa kini, isu alam sekitar semakin mendapat perhatian masyarakat seluruh dunia.",
  },
  {
    part: "Huraian",
    desc: "Ayat yang mengembangkan pengenalan dengan menghubungkannya kepada tajuk soalan secara lebih khusus.",
    example: "Pelbagai pihak termasuk kerajaan, badan bukan kerajaan dan orang awam digesa memainkan peranan masing-masing untuk memastikan alam sekitar terpelihara.",
  },
  {
    part: "Penegas",
    desc: "Ayat yang menegaskan tajuk karangan serta menyatakan isi yang akan dibincangkan.",
    example: "Oleh itu, esei ini akan membincangkan beberapa langkah yang boleh diambil untuk memastikan kelestarian alam sekitar terus terpelihara.",
  },
];

export const ISI_FORMULA_STEPS: string[] = ["Isi", "Mengapa", "Bagaimana", "Contoh", "Kesan", "Kesimpulan Kecil"];

export interface IsiFormulaExample {
  isi: string;
  mengapa: string;
  bagaimana: string;
  contoh: string;
  kesan: string;
  kesimpulanKecil: string;
}

export const ISI_FORMULA_EXAMPLE: IsiFormulaExample = {
  isi: "Salah satu langkah yang boleh diambil ialah mengamalkan penjimatan penggunaan air.",
  mengapa: "Hal ini kerana sumber air bersih semakin berkurangan akibat pertambahan penduduk dan pencemaran sungai.",
  bagaimana: "Antara caranya, kita boleh menutup paip air apabila tidak digunakan dan membaiki paip yang bocor dengan segera.",
  contoh: "Sebagai contoh, sesetengah sekolah memasang paip berkadar aliran rendah di tandas bagi mengurangkan pembaziran air.",
  kesan: "Dengan itu, bekalan air bersih dapat dijimatkan untuk generasi akan datang.",
  kesimpulanKecil: "Tegasnya, penjimatan air merupakan tanggungjawab bersama yang perlu dipupuk sejak kecil.",
};

export const PENUTUP_PARTS: string[] = ["Kesimpulan", "Penegas", "Harapan", "Ungkapan Menarik"];

export interface PenutupExample {
  kesimpulan: string;
  penegas: string;
  harapan: string;
  ungkapanMenarik: string;
}

export const PENUTUP_EXAMPLE: PenutupExample = {
  kesimpulan: "Kesimpulannya, pelbagai usaha perlu dilaksanakan secara bersepadu untuk memastikan alam sekitar terus terpelihara.",
  penegas: "Semua pihak termasuk kerajaan, sektor swasta dan masyarakat perlu memainkan peranan masing-masing tanpa mengira keadaan.",
  harapan: "Diharapkan agar alam sekitar yang lestari dapat dinikmati oleh generasi akan datang.",
  ungkapanMenarik: "Sesungguhnya, alam terpelihara, hidup sejahtera.",
};

export interface PenandaWacanaGroup {
  kategori: string;
  items: string[];
}

export const PENANDA_WACANA_PANJANG_GROUPS: PenandaWacanaGroup[] = [
  { kategori: "Pendahuluan", items: ["Pada masa kini", "Sejak akhir-akhir ini", "Mutakhir ini", "Dewasa ini"] },
  { kategori: "Isi", items: ["Pertama", "Selain itu", "Di samping itu", "Seterusnya", "Tambahan pula"] },
  { kategori: "Huraian", items: ["Hal ini demikian kerana", "Hal ini kerana", "Ini disebabkan oleh"] },
  { kategori: "Contoh", items: ["Sebagai contoh", "Contohnya", "Misalnya"] },
  { kategori: "Kesan", items: ["Oleh itu", "Dengan itu", "Hasilnya", "Natijahnya"] },
  { kategori: "Penutup", items: ["Kesimpulannya", "Tegasnya", "Konklusinya", "Jelaslah bahawa"] },
];

export interface UngkapanMenarikGroup {
  tema: string;
  icon: string;
  ungkapan: string[];
}

export const UNGKAPAN_MENARIK_PANJANG: UngkapanMenarikGroup[] = [
  { tema: "Pendidikan", icon: "📚", ungkapan: ["Ilmu pelita hidup", "Menuntut ilmu sehingga ke akhir hayat", "Ilmu umpama cahaya yang menerangi kehidupan"] },
  { tema: "Kesihatan", icon: "🩺", ungkapan: ["Mencegah lebih baik daripada mengubati", "Kesihatan tunjang kesejahteraan hidup", "Badan sihat, minda cerdas"] },
  { tema: "Perpaduan", icon: "🤝", ungkapan: ["Bersatu teguh, bercerai roboh", "Perpaduan tunjang kestabilan negara", "Pelangi indah kerana warna-warni, negara indah kerana perpaduan"] },
  { tema: "Patriotisme", icon: "🇲🇾", ungkapan: ["Cintakan negara tanda warga bertanggungjawab", "Pertahankan maruah bangsa dan negara", "Negara dipelihara, generasi sejahtera"] },
  { tema: "Alam Sekitar", icon: "🌳", ungkapan: ["Alam terpelihara, hidup sejahtera", "Hijaukan bumi, lestarikan alam", "Alam dijaga, rahmat dikurnia"] },
];

export interface KesalahanLazimItem {
  label: string;
  mengapa: string;
  contohSalah: string;
  contohBetul: string;
}

export const KESALAHAN_LAZIM_PANJANG: KesalahanLazimItem[] = [
  {
    label: "Kurang daripada 180 patah perkataan",
    mengapa: "Karangan dianggap tidak lengkap dan isi tidak berkembang dengan baik, markah akan terjejas.",
    contohSalah: "Pencemaran alam sekitar perlu dikurangkan. Kerajaan perlu buat undang-undang. Rakyat perlu jaga alam sekitar.",
    contohBetul: "Pencemaran alam sekitar merupakan isu yang perlu ditangani segera oleh semua pihak. Kerajaan perlu menggubal undang-undang yang lebih tegas dan menjalankan kempen kesedaran secara berterusan agar rakyat lebih prihatin terhadap kelestarian alam sekitar.",
  },
  {
    label: "Isi terlalu pendek",
    mengapa: "Isi yang pendek tanpa huraian menunjukkan kurangnya pengembangan idea.",
    contohSalah: "Kerajaan perlu membantu rakyat miskin.",
    contohBetul: "Kerajaan perlu membantu rakyat miskin dengan menyediakan bantuan kewangan dan peluang pekerjaan supaya taraf hidup mereka dapat ditingkatkan.",
  },
  {
    label: "Tiada huraian",
    mengapa: "Isi tanpa huraian hanya menyatakan fakta tanpa penjelasan lanjut, menjadikan karangan kurang berbobot.",
    contohSalah: "Kita perlu menjaga alam sekitar.",
    contohBetul: "Kita perlu menjaga alam sekitar kerana alam yang bersih dapat menjamin kesihatan serta kesejahteraan hidup generasi akan datang.",
  },
  {
    label: "Tiada contoh",
    mengapa: "Tanpa contoh, isi yang dikemukakan kelihatan kurang meyakinkan dan sukar dibuktikan.",
    contohSalah: "Pelbagai pihak telah menjalankan aktiviti kitar semula.",
    contohBetul: "Sebagai contoh, pihak sekolah telah menyediakan tong kitar semula bagi memudahkan murid mengamalkan tabiat kitar semula.",
  },
  {
    label: "Tiada penanda wacana",
    mengapa: "Karangan tanpa penanda wacana kelihatan berselerak dan tidak mengalir dengan baik antara isi.",
    contohSalah: "Kerajaan perlu membantu rakyat. Rakyat perlu berusaha sendiri.",
    contohBetul: "Pertama, kerajaan perlu membantu rakyat. Selain itu, rakyat juga perlu berusaha sendiri untuk meningkatkan taraf hidup masing-masing.",
  },
  {
    label: "Tiada penutup",
    mengapa: "Karangan tanpa penutup kelihatan tergantung dan tidak lengkap walaupun semua isi telah ditulis.",
    contohSalah: "(Karangan terus tamat selepas isi terakhir tanpa sebarang rumusan.)",
    contohBetul: "Kesimpulannya, semua pihak perlu bekerjasama untuk memastikan isu ini dapat ditangani dengan berkesan demi kesejahteraan bersama.",
  },
  {
    label: "Mengulang isi yang sama",
    mengapa: "Isi yang berulang menunjukkan kekurangan idea dan membuang ruang yang sepatutnya digunakan untuk isi baharu.",
    contohSalah: "Isi 1: Kerajaan perlu menjaga alam sekitar. Isi 3: Kerajaan perlu menjaga alam sekitar dengan baik.",
    contohBetul: "Isi 1: Kerajaan perlu menggubal undang-undang alam sekitar. Isi 3: Sektor swasta perlu mengamalkan teknologi mesra alam dalam operasi perniagaan.",
  },
];

export interface PerbandinganAspek {
  aspek: string;
  lemah: string;
  cemerlang: string;
}

export const LEMAH_VS_CEMERLANG_PANJANG: PerbandinganAspek[] = [
  { aspek: "Bilangan Isi", lemah: "3 isi (tidak mencukupi)", cemerlang: "5 isi atau lebih (mencukupi syarat)" },
  { aspek: "Huraian", lemah: "Isi tanpa huraian lanjut", cemerlang: "Setiap isi dihuraikan dengan jelas" },
  { aspek: "Contoh", lemah: "Tiada contoh konkrit", cemerlang: "Setiap isi disertai contoh yang relevan" },
  { aspek: "Penanda Wacana", lemah: "Tiada penanda wacana, ayat berselerak", cemerlang: "Penanda wacana digunakan dengan tepat antara perenggan" },
  { aspek: "Ungkapan Menarik", lemah: "Bahasa biasa tanpa variasi", cemerlang: "Menggunakan ungkapan menarik yang sesuai dengan tema" },
  { aspek: "Anggaran Markah", lemah: "8 / 20", cemerlang: "18 / 20" },
];

export interface KaranganBerpanduIsi {
  i: string;
  m: string;
  b: string;
  a: string;
  k: string;
}

export interface KaranganBerpanduTema {
  id: string;
  tema: string;
  icon: string;
  pendahuluan: string;
  isi: KaranganBerpanduIsi[];
  penutup: string;
}

export const KARANGAN_BERPANDU_PANJANG: KaranganBerpanduTema[] = [
  {
    id: "kesihatan",
    tema: "Kesihatan",
    icon: "🩺",
    pendahuluan: "Pada masa kini, isu kesihatan semakin mendapat perhatian masyarakat global.",
    isi: [
      { i: "Mengamalkan pemakanan seimbang", m: "Badan memperoleh nutrien yang cukup untuk berfungsi dengan baik", b: "Makan pelbagai jenis sayur dan buah setiap hari", a: "Tubuh menjadi cergas dan tahan penyakit", k: "Pemakanan seimbang asas tubuh yang sihat." },
      { i: "Bersenam secara berkala", m: "Membantu mengekalkan ketahanan fizikal dan mental", b: "Beriadah sekurang-kurangnya tiga kali seminggu", a: "Risiko penyakit kronik dapat dikurangkan", k: "Senaman kunci kepada tubuh yang sihat." },
      { i: "Mengamalkan tabiat tidur yang cukup", m: "Membolehkan badan dan minda berehat secukupnya", b: "Tidur sekurang-kurangnya lapan jam sehari", a: "Tubuh lebih bertenaga dan fokus meningkat", k: "Tidur cukup penting untuk kesihatan optimum." },
      { i: "Mengelakkan tabiat tidak sihat seperti merokok", m: "Tabiat ini boleh merosakkan organ dalaman badan", b: "Mengganti tabiat buruk dengan aktiviti yang sihat", a: "Risiko penyakit seperti kanser dapat dikurangkan", k: "Mengelak tabiat buruk memanjangkan usia." },
      { i: "Menjalani pemeriksaan kesihatan secara berkala", m: "Membantu mengesan sebarang masalah kesihatan lebih awal", b: "Membuat pemeriksaan kesihatan sekurang-kurangnya sekali setahun", a: "Rawatan awal dapat diberikan sebelum keadaan bertambah serius", k: "Pemeriksaan berkala elemen penting kesihatan jangka panjang." },
    ],
    penutup: "Kesimpulannya, kesihatan yang baik perlu dijaga melalui pelbagai usaha berterusan demi kesejahteraan hidup.",
  },
  {
    id: "pendidikan",
    tema: "Pendidikan",
    icon: "📚",
    pendahuluan: "Pada masa kini, pendidikan dianggap sebagai kunci kejayaan dalam kehidupan.",
    isi: [
      { i: "Mengamalkan tabiat membaca", m: "Membaca dapat meluaskan ilmu pengetahuan", b: "Meluangkan masa membaca buku setiap hari", a: "Pengetahuan dan kemahiran berbahasa meningkat", k: "Membaca asas kepada ilmu yang luas." },
      { i: "Menggunakan teknologi dalam pembelajaran", m: "Teknologi memudahkan capaian maklumat dengan pantas", b: "Menggunakan aplikasi pembelajaran dalam talian", a: "Proses pembelajaran menjadi lebih menarik dan berkesan", k: "Teknologi pemangkin pendidikan moden." },
      { i: "Mengamalkan disiplin dalam pembelajaran", m: "Disiplin membentuk tabiat belajar yang konsisten", b: "Menyediakan jadual belajar yang teratur", a: "Pencapaian akademik dapat ditingkatkan", k: "Disiplin tunjang kejayaan akademik." },
      { i: "Mendapatkan bimbingan daripada guru", m: "Guru membantu murid memahami pelajaran dengan lebih jelas", b: "Bertanya soalan semasa sesi pembelajaran", a: "Murid lebih yakin dan faham topik yang diajar", k: "Bimbingan guru elemen penting proses pembelajaran." },
      { i: "Belajar secara berkumpulan dengan rakan", m: "Perbincangan kumpulan dapat mengukuhkan kefahaman", b: "Mengadakan sesi perbincangan kumpulan secara berkala", a: "Murid dapat berkongsi idea dan menyelesaikan masalah bersama", k: "Kerjasama rakan memperkaya proses pembelajaran." },
    ],
    penutup: "Kesimpulannya, pendidikan yang berkualiti memerlukan usaha bersepadu daripada murid, guru dan ibu bapa.",
  },
  {
    id: "teknologi",
    tema: "Teknologi",
    icon: "💻",
    pendahuluan: "Pada masa kini, teknologi telah menjadi sebahagian daripada kehidupan seharian masyarakat.",
    isi: [
      { i: "Teknologi memudahkan komunikasi", m: "Manusia dapat berhubung tanpa mengira jarak dan masa", b: "Menggunakan aplikasi pesanan segera dan panggilan video", a: "Hubungan kekeluargaan dan persahabatan terus terjalin", k: "Teknologi mempererat hubungan sesama manusia." },
      { i: "Teknologi memajukan sektor perniagaan", m: "Perniagaan dalam talian membuka peluang pasaran lebih luas", b: "Menjual produk melalui platform e-dagang", a: "Pendapatan peniaga kecil dapat ditingkatkan", k: "Teknologi pemangkin ekonomi digital." },
      { i: "Teknologi mempermudah proses pembelajaran", m: "Murid dapat mengakses ilmu dengan lebih pantas", b: "Menggunakan platform pembelajaran dalam talian", a: "Proses pembelajaran menjadi fleksibel dan menyeronokkan", k: "Teknologi mentransformasi sistem pendidikan." },
      { i: "Teknologi membantu sektor perubatan", m: "Teknologi perubatan canggih meningkatkan kualiti rawatan", b: "Menggunakan peralatan perubatan termoden seperti telaperubatan", a: "Kadar kesembuhan pesakit dapat dipertingkatkan", k: "Teknologi penyumbang kepada sistem kesihatan yang lebih baik." },
      { i: "Teknologi perlu digunakan secara bertanggungjawab", m: "Penyalahgunaan teknologi boleh membawa kesan negatif", b: "Mengehadkan masa penggunaan media sosial", a: "Risiko ketagihan dan masalah kesihatan mental dapat dikurangkan", k: "Kebijaksanaan menggunakan teknologi amat penting." },
    ],
    penutup: "Kesimpulannya, teknologi memberi banyak manfaat sekiranya digunakan secara bijak dan bertanggungjawab.",
  },
  {
    id: "patriotisme",
    tema: "Patriotisme",
    icon: "🇲🇾",
    pendahuluan: "Pada masa kini, semangat patriotisme perlu dipupuk dalam kalangan generasi muda.",
    isi: [
      { i: "Menyertai sambutan Hari Kebangsaan", m: "Sambutan ini memupuk rasa cinta akan tanah air", b: "Menghadiri perbarisan dan aktiviti sempena Hari Kebangsaan", a: "Semangat perpaduan dan kebanggaan negara meningkat", k: "Sambutan kebangsaan asas semangat patriotisme." },
      { i: "Mengibarkan bendera Jalur Gemilang", m: "Tindakan ini melambangkan rasa hormat kepada negara", b: "Mengibarkan bendera di rumah dan premis perniagaan", a: "Identiti dan maruah negara dapat dipertahankan", k: "Bendera lambang kedaulatan negara." },
      { i: "Menghormati lagu kebangsaan Negaraku", m: "Lagu kebangsaan melambangkan jati diri sebuah negara", b: "Berdiri tegak dan menyanyikan lagu kebangsaan dengan khidmat", a: "Rasa cinta dan taat setia kepada negara terpupuk", k: "Penghormatan lagu kebangsaan tanda patriotisme sejati." },
      { i: "Menggunakan barangan buatan tempatan", m: "Tindakan ini menyokong pertumbuhan ekonomi negara", b: "Memilih produk tempatan berbanding produk import", a: "Industri tempatan dapat berkembang maju", k: "Sokongan barangan tempatan tanda cinta akan negara." },
      { i: "Mempertahankan maruah dan nama baik negara", m: "Maruah negara perlu dipelihara di mata dunia", b: "Berkelakuan baik semasa berada di luar negara", a: "Imej negara terus dihormati di peringkat antarabangsa", k: "Mempertahan maruah negara tanggungjawab setiap warga." },
    ],
    penutup: "Kesimpulannya, semangat patriotisme perlu disemai dalam diri setiap rakyat demi kesejahteraan dan kedaulatan negara.",
  },
  {
    id: "alam-sekitar",
    tema: "Alam Sekitar",
    icon: "🌳",
    pendahuluan: "Pada masa kini, isu alam sekitar semakin mendapat perhatian masyarakat global.",
    isi: [
      { i: "Mengamalkan kitar semula", m: "Kitar semula dapat mengurangkan pencemaran dan sampah", b: "Mengasingkan sampah mengikut kategori plastik, kertas dan kaca", a: "Alam sekitar lebih bersih dan sumber asli terjimat", k: "Kitar semula langkah mudah berimpak besar." },
      { i: "Mengamalkan penjimatan air", m: "Sumber air bersih semakin berkurangan", b: "Menutup paip air apabila tidak digunakan", a: "Bekalan air bersih dapat dijimatkan untuk generasi akan datang", k: "Penjimatan air tanggungjawab bersama." },
      { i: "Menggalakkan aktiviti penanaman pokok", m: "Pokok membantu mengurangkan kesan rumah hijau", b: "Mengadakan program penanaman pokok di kawasan kejiranan", a: "Kualiti udara bertambah baik dan suhu bumi dapat dikawal", k: "Penanaman pokok pelaburan untuk masa depan." },
      { i: "Mengurangkan penggunaan plastik sekali guna", m: "Plastik mengambil masa lama untuk terurai", b: "Menggunakan beg dan botol yang boleh digunakan semula", a: "Pencemaran sampah plastik di lautan dapat dikurangkan", k: "Pengurangan plastik langkah kecil bermakna besar." },
      { i: "Memperkukuh penguatkuasaan undang-undang alam sekitar", m: "Undang-undang yang tegas mengelakkan pencemaran berleluasa", b: "Mengenakan tindakan tegas kepada pihak yang mencemarkan alam", a: "Kesedaran masyarakat tentang kepentingan alam sekitar meningkat", k: "Penguatkuasaan undang-undang penting demi kelestarian alam." },
    ],
    penutup: "Kesimpulannya, kelestarian alam sekitar memerlukan usaha bersepadu daripada semua pihak demi generasi akan datang.",
  },
];

export const CHECKLIST_SKOR_A_PANJANG: string[] = [
  "Melebihi 180 patah perkataan",
  "Ada pendahuluan",
  "Ada 5 isi atau lebih",
  "Ada huraian",
  "Ada contoh",
  "Ada penanda wacana",
  "Ada ungkapan menarik",
  "Ada penutup lengkap",
];

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
