// ─── Model Karangan Bank — Karangan Template Library (KSSM Tingkatan 1) ────────
// Tujuan: bantu pelajar kenal pasti format karangan dengan pantas — BUKAN nota teori.
// Data sahaja. Paparan diuruskan oleh src/components/ModelKaranganHub.tsx

export interface ModelKaranganTemplate {
  id: string;
  jenis: string;
  icon: string;
  definisi?: string;
  ciriCiri?: string[];
  strukturLabel: string;
  strukturFlow: string[];
  kataKunci?: string[];
  kesalahanLazim?: string[];
  frasaPenting?: string[];
  template: string;
  contohSoalan: string[];
  contohCemerlangLabel: string;
  contohCemerlang: string;
}

export const MODEL_KARANGAN_TEMPLATES: ModelKaranganTemplate[] = [
  {
    id: "model-fakta",
    jenis: "Karangan Fakta",
    icon: "📋",
    definisi: "Karangan yang menyampaikan maklumat dan fakta secara objektif tentang sesuatu topik, isu atau perkara.",
    ciriCiri: [
      "Bahasa formal dan objektif",
      "Berdasarkan fakta, bukan pendapat peribadi",
      "Setiap isi disokong huraian dan contoh",
      "Tiada unsur emosi atau cerita peribadi",
    ],
    strukturLabel: "Struktur Karangan",
    strukturFlow: ["Pendahuluan", "Isi 1", "Isi 2", "Isi 3", "Isi 4", "Isi 5", "Penutup"],
    kataKunci: ["Langkah-langkah", "Punca", "Kesan", "Kepentingan", "Faedah", "Cara-cara"],
    template:
      "Pada masa kini, [topik] semakin mendapat perhatian masyarakat. [Huraian ringkas isu]. Oleh itu, [penegas — apa yang akan dibincangkan].\n\nPertama, [isi 1].\n\nSelain itu, [isi 2].\n\nDi samping itu, [isi 3].\n\nTambahan pula, [isi 4].\n\nAkhir sekali, [isi 5].\n\nKesimpulannya, [rumusan]. [Harapan].",
    contohSoalan: [
      "Huraikan langkah-langkah untuk mengatasi masalah pencemaran alam sekitar.",
      "Jelaskan kepentingan menjaga kesihatan dalam kalangan remaja.",
    ],
    contohCemerlangLabel: "Contoh Karangan Cemerlang (Langkah Atasi Pencemaran)",
    contohCemerlang:
      "Pada masa kini, isu pencemaran alam sekitar semakin membimbangkan masyarakat global akibat pembangunan pesat dan sikap tidak bertanggungjawab sesetengah pihak. Oleh itu, beberapa langkah perlu diambil untuk mengatasi masalah ini.\n\nPertama, masyarakat perlu mengamalkan kitar semula untuk mengurangkan sampah yang dihantar ke tapak pelupusan.\n\nSelain itu, penjimatan air dan elektrik perlu diamalkan untuk mengelakkan pembaziran sumber asli.\n\nDi samping itu, aktiviti penanaman pokok perlu dipergiatkan untuk mengurangkan kesan rumah hijau.\n\nTambahan pula, penggunaan plastik sekali guna perlu dikurangkan secara drastik.\n\nAkhir sekali, kerajaan perlu memperkukuh penguatkuasaan undang-undang alam sekitar.\n\nKesimpulannya, kelestarian alam sekitar memerlukan usaha bersepadu daripada semua pihak demi generasi akan datang.",
  },
  {
    id: "model-perbincangan",
    jenis: "Karangan Perbincangan",
    icon: "⚖️",
    definisi: "Karangan yang membincangkan sesuatu isu daripada dua sudut pandangan — kebaikan dan keburukan — sebelum penulis menyatakan pendiriannya.",
    ciriCiri: [
      "Bincang kebaikan dan keburukan secara seimbang",
      "Bahasa neutral semasa membincangkan kedua-dua sudut",
      "Penulis perlu nyatakan pendapat sendiri",
      "Gunakan frasa perbandingan: 'walau bagaimanapun', 'sebaliknya'",
    ],
    strukturLabel: "Format",
    strukturFlow: ["Pendahuluan", "Kebaikan", "Keburukan", "Pendapat", "Penutup"],
    kataKunci: ["Bincangkan", "Huraikan", "Setujukah anda", "Berikan pendapat anda"],
    template:
      "Pada masa kini, [isu] sering dibincangkan dalam masyarakat. [Huraian ringkas]. Perkara ini mempunyai kebaikan dan keburukan yang tersendiri.\n\nDari segi kebaikan, [kebaikan 1]. Selain itu, [kebaikan 2].\n\nWalau bagaimanapun, [keburukan 1]. Di samping itu, [keburukan 2].\n\nPada pandangan saya, [pendirian anda].\n\nKesimpulannya, [rumusan seimbang].",
    contohSoalan: [
      "Bincangkan kebaikan dan keburukan penggunaan media sosial dalam kalangan remaja.",
      "Setujukah anda bahawa telefon pintar perlu dibenarkan di sekolah? Berikan pendapat anda.",
    ],
    contohCemerlangLabel: "Contoh Karangan Cemerlang (Media Sosial dalam Kalangan Remaja)",
    contohCemerlang:
      "Pada masa kini, penggunaan media sosial semakin meluas dalam kalangan remaja. Aplikasi seperti TikTok dan Instagram menjadi pilihan utama golongan muda untuk berhibur dan berkomunikasi. Perkara ini mempunyai kebaikan dan keburukan yang tersendiri.\n\nDari segi kebaikan, media sosial memudahkan remaja berhubung dengan rakan dan keluarga tanpa mengira jarak. Selain itu, media sosial turut menjadi platform untuk berkongsi ilmu dan maklumat berguna.\n\nWalau bagaimanapun, penggunaan media sosial yang berlebihan boleh menyebabkan ketagihan dan menjejaskan pelajaran. Di samping itu, remaja juga terdedah kepada risiko buli siber dan maklumat tidak sahih.\n\nPada pandangan saya, media sosial boleh digunakan asalkan remaja bijak mengawal masa dan kandungan yang dilayari.\n\nKesimpulannya, media sosial bukanlah punca masalah sekiranya digunakan secara bertanggungjawab oleh setiap remaja.",
  },
  {
    id: "model-pengalaman",
    jenis: "Karangan Pengalaman",
    icon: "🎒",
    definisi: "Karangan berbentuk naratif yang ditulis berdasarkan pengalaman peribadi penulis, biasanya dalam kata ganti nama 'saya'.",
    ciriCiri: [
      "Ditulis dalam orang pertama ('saya')",
      "Mengikut urutan masa (kronologi)",
      "Bahasa deskriptif dan penuh perasaan",
      "Diakhiri dengan pengajaran atau refleksi",
    ],
    strukturLabel: "Struktur",
    strukturFlow: ["Permulaan", "Perkembangan", "Kemuncak", "Penutup"],
    kataKunci: ["Pengalaman saya", "Cuti sekolah", "Kenangan", "Peristiwa yang tidak dapat dilupakan"],
    template:
      "Peristiwa ini terjadi pada [masa] yang lalu. Pada masa itu, saya [latar/keadaan].\n\nPada mulanya, [perkembangan peristiwa]. Namun, [konflik/cabaran yang dihadapi].\n\nKemuncak peristiwa berlaku apabila [detik paling penting].\n\nPengalaman itu mengajar saya [pengajaran]. Saya tidak akan melupakan peristiwa tersebut.",
    contohSoalan: [
      "Tulis sebuah karangan tentang pengalaman anda menghadapi cabaran semasa cuti sekolah.",
      "Huraikan sebuah peristiwa yang tidak dapat anda lupakan.",
    ],
    contohCemerlangLabel: "Contoh Karangan Cemerlang (Tersesat di Hutan Rekreasi)",
    contohCemerlang:
      "Peristiwa ini terjadi semasa cuti sekolah tahun lalu apabila saya menyertai aktiviti perkhemahan di hutan rekreasi bersama rakan-rakan.\n\nPada mulanya, saya berasa amat seronok meneroka denai hutan tersebut. Namun, saya secara tidak sengaja terpisah daripada kumpulan ketika mengambil gambar bunga liar.\n\nKemuncak peristiwa berlaku apabila saya menyedari diri saya telah sesat dan tidak dapat mencari jalan keluar. Hati saya berdebar-debar dan air mata mula bertakung di kelopak mata.\n\nPengalaman itu mengajar saya supaya sentiasa berhati-hati dan tidak berpisah daripada kumpulan semasa berada di kawasan yang tidak dikenali. Saya tidak akan melupakan peristiwa tersebut sehingga kini.",
  },
  {
    id: "model-surat",
    jenis: "Surat Tidak Rasmi",
    icon: "✉️",
    definisi: "Surat kepada rakan, saudara atau kenalan rapat — ditulis dalam format dan bahasa tidak formal.",
    strukturLabel: "Format Lengkap",
    strukturFlow: ["Alamat", "Tarikh", "Sapaan", "Isi (3 perenggan)", "Penutup", "Tandatangan"],
    kesalahanLazim: [
      "Menggunakan format surat rasmi",
      "Tidak menulis alamat dan tarikh",
      "Bahasa terlalu kasar atau bahasa pasar",
      "Tiada penutup sebelum tandatangan",
    ],
    template:
      "[Alamat penulis]\n[Tarikh]\n\n[Sapaan, contoh: Sahabatku Hafiz]\n\nSalam sayang aku titipkan,\n\n[Perenggan 1 — tujuan menulis surat]\n\n[Perenggan 2 — isi utama]\n\n[Perenggan 3 — isi tambahan/cadangan]\n\n[Penutup, contoh: Sekian dahulu surat aku kali ini.]\n\n[Tandatangan]\n[Nama]",
    contohSoalan: [
      "Tulis sepucuk surat kepada sahabat anda untuk menceritakan pengalaman anda semasa cuti sekolah.",
      "Tulis sepucuk surat kepada adik anda untuk memberi nasihat tentang pentingnya menjaga kesihatan.",
    ],
    contohCemerlangLabel: "Contoh Surat Cemerlang",
    contohCemerlang:
      "No. 12, Jalan Aman 5,\n81100 Johor Bahru, Johor.\n12 Mac 2026.\n\nSahabatku Hafiz,\n\nSalam sayang aku titipkan,\n\nApa khabar kamu di sana? Aku berharap kamu sentiasa dalam keadaan sihat. Aku menulis surat ini untuk berkongsi pengalaman aku semasa cuti sekolah yang lalu.\n\nSepanjang cuti, aku dan keluarga telah melawat Pulau Langkawi selama tiga hari. Kami berpeluang menaiki kereta kabel dan melihat pemandangan yang sungguh indah dari atas gunung.\n\nSelain itu, aku turut membeli beberapa cenderahati untuk dikongsi bersama kamu apabila bertemu nanti. Aku harap kamu juga mempunyai pengalaman cuti yang menyeronokkan.\n\nSekian dahulu surat aku kali ini. Aku tunggu balasan kamu.\n\nSahabatmu,\nDanial",
  },
  {
    id: "model-laporan",
    jenis: "Karangan Laporan",
    icon: "📰",
    definisi: "Laporan rasmi tentang sesuatu aktiviti atau kejadian yang telah berlaku, ditulis secara ringkas dan berfakta.",
    strukturLabel: "Format Laporan",
    strukturFlow: ["Tajuk", "Pendahuluan", "Isi", "Penutup"],
    kataKunci: ["Sediakan laporan", "Tulis laporan", "Aktiviti yang telah dijalankan"],
    template:
      "LAPORAN [NAMA AKTIVITI]\n\nPada [tarikh], satu [nama aktiviti] telah diadakan di [tempat]. Aktiviti ini bertujuan untuk [tujuan].\n\nAntara aktiviti yang dijalankan adalah [aktiviti 1]. Selain itu, [aktiviti 2]. Seramai [bilangan] orang telah menyertai aktiviti ini.\n\nSecara keseluruhannya, aktiviti ini berjaya mencapai objektifnya. Adalah dicadangkan agar aktiviti seperti ini dapat diteruskan pada masa hadapan.",
    contohSoalan: [
      "Anda merupakan setiausaha kelab. Sediakan laporan mengenai aktiviti gotong-royong yang telah dijalankan di sekolah anda.",
      "Tulis laporan tentang program kempen kebersihan yang dianjurkan oleh PIBG sekolah anda.",
    ],
    contohCemerlangLabel: "Contoh Laporan Cemerlang",
    contohCemerlang:
      "LAPORAN AKTIVITI GOTONG-ROYONG PERDANA SEKOLAH\n\nPada 15 Mac 2026, satu program gotong-royong perdana telah diadakan di kawasan SMK Taman Bahagia. Program ini bertujuan untuk memastikan kawasan sekolah sentiasa bersih dan selesa.\n\nAntara aktiviti yang dijalankan termasuklah membersihkan kawasan taman, mengecat pagar sekolah dan mengumpul sampah di sekitar padang. Seramai 120 orang murid bersama guru telah menyertai aktiviti ini dengan penuh semangat.\n\nSecara keseluruhannya, program ini berjaya mencapai objektifnya apabila kawasan sekolah kelihatan lebih bersih dan ceria. Adalah dicadangkan agar program seumpama ini diadakan secara berkala pada masa hadapan.",
  },
  {
    id: "model-ucapan",
    jenis: "Karangan Ucapan",
    icon: "🎤",
    definisi: "Teks ucapan untuk pelbagai majlis rasmi atau separa rasmi di sekolah, lengkap dengan sapaan khas mengikut hierarki.",
    strukturLabel: "Format Ucapan",
    strukturFlow: ["Sapaan", "Pendahuluan", "Isi (3 isi utama)", "Penutup", "Ucapan terima kasih"],
    frasaPenting: [
      "Yang Berbahagia...",
      "Hadirin yang dihormati sekalian",
      "Tanpa membuang masa...",
      "Sebelum saya mengakhiri ucapan ini...",
      "Sekian, wabillahi taufik wal hidayah",
    ],
    template:
      "Yang Berbahagia [gelaran/nama], serta hadirin yang dihormati sekalian.\n\nPada pagi yang berbahagia ini, saya ingin menyampaikan ucapan bertajuk [tajuk].\n\nPertama, [isi 1]. Selain itu, [isi 2]. Akhir sekali, [isi 3].\n\nSebelum saya mengakhiri ucapan ini, saya ingin mengucapkan terima kasih kepada semua pihak yang terlibat.\n\nSekian, wabillahi taufik wal hidayah.",
    contohSoalan: [
      "Anda dipilih untuk menyampaikan ucapan sempena Hari Kantin sekolah anda. Sediakan teks ucapan tersebut.",
      "Sediakan teks ucapan bertajuk 'Pentingnya Menjaga Kesihatan' untuk disampaikan semasa perhimpunan sekolah.",
    ],
    contohCemerlangLabel: "Contoh Ucapan Cemerlang",
    contohCemerlang:
      "Yang Berbahagia Tuan Pengetua, para guru, serta rakan-rakan sekalian.\n\nPada pagi yang berbahagia ini, saya ingin menyampaikan ucapan bertajuk 'Pentingnya Menjaga Kesihatan'.\n\nPertama, kesihatan yang baik membolehkan kita belajar dengan lebih fokus dan cergas. Selain itu, amalan pemakanan seimbang dan senaman berkala dapat mengelakkan kita daripada pelbagai penyakit. Akhir sekali, kesihatan mental yang stabil membantu kita menghadapi cabaran seharian dengan lebih tenang.\n\nSebelum saya mengakhiri ucapan ini, saya ingin mengucapkan terima kasih kepada pihak sekolah atas peluang ini.\n\nSekian, wabillahi taufik wal hidayah.",
  },
];

export interface JenisKaranganClue {
  trigger: string;
  jenis: string;
}

export const JENIS_KARANGAN_CLUES: JenisKaranganClue[] = [
  { trigger: "Langkah-langkah", jenis: "Karangan Fakta" },
  { trigger: "Bincangkan", jenis: "Karangan Perbincangan" },
  { trigger: "Pengalaman", jenis: "Karangan Pengalaman" },
  { trigger: "Tulis sepucuk surat", jenis: "Surat Tidak Rasmi" },
  { trigger: "Tulis laporan", jenis: "Karangan Laporan" },
  { trigger: "Sediakan ucapan", jenis: "Karangan Ucapan" },
];

export function getModelKarangan(topicId: string): ModelKaranganTemplate | undefined {
  return MODEL_KARANGAN_TEMPLATES.find((m) => m.id === topicId);
}
