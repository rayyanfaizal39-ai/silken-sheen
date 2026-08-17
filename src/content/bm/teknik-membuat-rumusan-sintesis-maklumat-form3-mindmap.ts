import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-teknik-membuat-rumusan-sintesis-maklumat";

function node(id: string, label: string, summary?: string, children?: MindNode[]): MindNode {
  return {
    id: `${PREFIX}-${id}`,
    label,
    ...(summary ? { summary } : {}),
    ...(children?.length ? { children } : {}),
  };
}

function branch(id: string, label: string, children: MindNode[]): MindNode {
  return node(id, label, undefined, children);
}

export const bahasaMelayuTingkatan3RumusanSintesisMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "RUMUSAN & SINTESIS",
  summary:
    "Rumusan memilih dan memadatkan isi penting, manakala sintesis menghubungkan maklumat berkaitan daripada beberapa bahagian atau bahan untuk menghasilkan kefahaman yang lebih menyeluruh.",
  children: [
    branch("rumusan", "Apa Itu Rumusan?", [
      node(
        "rumusan-definisi",
        "Definisi",
        "Rumusan ialah penyampaian semula isi penting daripada sesuatu bahan secara lebih ringkas tanpa mengubah maksud asal.",
      ),
      branch("rumusan-proses", "Proses Membuat Rumusan", [
        node("rumusan-fokus", "Kenal Pasti Fokus", "Tentukan perkara yang benar-benar diminta."),
        node("rumusan-isi", "Pilih Isi Utama", "Ambil idea yang diperlukan untuk memahami mesej."),
        node(
          "rumusan-buang",
          "Buang Butiran Tidak Perlu",
          "Singkirkan contoh atau huraian yang tidak diperlukan.",
        ),
        node(
          "rumusan-gabung",
          "Gabungkan Idea Berkaitan",
          "Satukan isi bertindih tanpa pengulangan.",
        ),
        node("rumusan-jelas", "Gunakan Bahasa Jelas", "Sampaikan isi dengan padat dan gramatis."),
      ]),
      branch("rumusan-bukan", "Rumusan Bukan...", [
        node(
          "rumusan-bukan-salin",
          "Menyalin Ayat yang Lebih Pendek",
          "Rumusan memerlukan pemilihan dan pengolahan idea.",
        ),
        node(
          "rumusan-bukan-semua",
          "Menyenaraikan Setiap Butiran",
          "Tidak semua huraian atau contoh ialah isi penting.",
        ),
        node(
          "rumusan-bukan-opini",
          "Menambah Pendapat Peribadi",
          "Jangan masukkan pandangan yang tidak diminta atau disokong bahan.",
        ),
      ]),
    ]),
    branch("sintesis", "Apa Itu Sintesis?", [
      node(
        "sintesis-definisi",
        "Gabung dan Hubungkan",
        "Sintesis ialah proses menggabungkan maklumat berkaitan daripada beberapa ayat, perenggan atau bahan untuk membentuk satu kefahaman yang koheren.",
      ),
      branch("sintesis-sihat", "Contoh Gaya Hidup Sihat", [
        node("sintesis-sihat-1", "Bahan 1", "Aktiviti fizikal meningkatkan kecergasan."),
        node("sintesis-sihat-2", "Bahan 2", "Tidur mencukupi membantu pemulihan tubuh."),
        node("sintesis-sihat-3", "Bahan 3", "Pemakanan seimbang membekalkan nutrien."),
        node(
          "sintesis-sihat-hasil",
          "Sintesis",
          "Gaya hidup sihat memerlukan gabungan aktiviti fizikal, rehat yang mencukupi dan pemakanan seimbang.",
        ),
      ]),
      node(
        "sintesis-bukan-senarai",
        "Sintesis ≠ Senarai Fakta",
        "Sintesis mesti menunjukkan hubungan antara idea dan konsep yang lebih besar, bukan sekadar meletakkan fakta bersebelahan.",
      ),
    ]),
    branch("fokus", "Kenal Pasti Fokus", [
      node(
        "fokus-sebelum",
        "Tentukan Sebelum Memilih",
        "Kenal pasti tema, fokus soalan dan kategori maklumat yang diminta sebelum menandakan isi.",
      ),
      branch("fokus-jenis", "Fokus yang Mungkin", [
        node("fokus-faktor", "Faktor", "Punca atau sebab sesuatu berlaku."),
        node("fokus-kesan", "Kesan", "Akibat atau hasil sesuatu keadaan."),
        node("fokus-langkah", "Langkah", "Tindakan untuk mencapai tujuan atau menangani masalah."),
        node("fokus-faedah", "Faedah", "Manfaat yang diperoleh."),
        node("fokus-cabaran", "Cabaran", "Halangan atau kesukaran."),
        node("fokus-peranan", "Peranan", "Tanggungjawab atau sumbangan sesuatu pihak."),
        node("fokus-penting", "Kepentingan", "Sebab sesuatu perkara bernilai atau diperlukan."),
      ]),
      branch("fokus-sungai", "Contoh Isu Sungai", [
        node("fokus-sungai-bahan", "Bahan", "Petikan membincangkan isu alam sekitar secara luas."),
        node("fokus-sungai-soalan", "Fokus Soalan", "Langkah menjaga sungai."),
        node(
          "fokus-sungai-pilih",
          "Pemilihan",
          "Pilih langkah penjagaan sungai; jangan masukkan semua sebab dan kesan jika tidak berkaitan.",
        ),
      ]),
    ]),
    branch("utama", "Cari Isi Utama", [
      branch("utama-petunjuk", "Petunjuk Isi Utama", [
        node("utama-topik", "Ayat Topik", "Ayat yang memperkenalkan idea utama perenggan."),
        node("utama-ulang", "Idea Berulang", "Idea pusat yang diterangkan lebih daripada sekali."),
        node("utama-sebab", "Sebab Utama", "Punca penting yang menggerakkan isu."),
        node("utama-kesan", "Kesan Utama", "Akibat penting yang perlu difahami."),
        node("utama-cadang", "Cadangan Utama", "Langkah pokok yang disarankan."),
      ]),
      branch("utama-membaca", "Contoh Amalan Membaca", [
        node(
          "utama-membaca-p",
          "Perenggan",
          "Membaca dapat meningkatkan pengetahuan. Aktiviti ini juga memperluas kosa kata. Banyak murid membaca di perpustakaan pada waktu rehat.",
        ),
        node("utama-membaca-1", "Isi Utama 1", "Meningkatkan pengetahuan."),
        node("utama-membaca-2", "Isi Utama 2", "Memperluas kosa kata."),
        node("utama-membaca-detail", "Butiran Kecil", "Membaca di perpustakaan pada waktu rehat."),
      ]),
    ]),
    branch("sokongan", "Bezakan Isi Sokongan", [
      node("sokongan-utama", "Isi Utama", "Idea yang diperlukan untuk memahami mesej pusat."),
      node("sokongan-huraian", "Huraian", "Penerangan yang mengembangkan isi utama."),
      node("sokongan-contoh", "Contoh", "Situasi khusus yang menggambarkan isi."),
      node(
        "sokongan-detail",
        "Butiran",
        "Maklumat tambahan yang memberi konteks tetapi mungkin boleh dibuang.",
      ),
      node(
        "sokongan-uji",
        "Ujian Pembuangan",
        "Tanya: ‘Jika maklumat ini dibuang, adakah maksud utama masih kekal?’ Jika ya, maklumat itu mungkin huraian, contoh atau butiran sokongan.",
      ),
      node(
        "sokongan-bukan-semua",
        "Tidak Semua Contoh Diperlukan",
        "Utamakan isi; masukkan contoh hanya apabila soalan atau kejelasan benar-benar memerlukannya.",
      ),
    ]),
    branch("gabung", "Gabungkan Maklumat", [
      node(
        "gabung-prinsip",
        "Satukan Idea Bertindih",
        "Idea yang membawa maksud hampir sama tidak perlu dikira atau ditulis dua kali.",
      ),
      branch("gabung-membaca", "Contoh Ilmu Pengetahuan", [
        node("gabung-membaca-a", "Ayat A", "Amalan membaca meningkatkan ilmu."),
        node("gabung-membaca-b", "Ayat B", "Amalan membaca menambah pengetahuan."),
        node("gabung-membaca-hasil", "Gabungan", "Amalan membaca dapat menambah ilmu pengetahuan."),
      ]),
      branch("gabung-senam", "Contoh Kecergasan Tubuh", [
        node("gabung-senam-a", "Ayat A", "Bersenam meningkatkan kecergasan."),
        node("gabung-senam-b", "Ayat B", "Bersenam membantu menguatkan tubuh."),
        node(
          "gabung-senam-hasil",
          "Gabungan",
          "Bersenam membantu meningkatkan kecergasan dan kekuatan tubuh.",
        ),
      ]),
      node(
        "gabung-semak",
        "Semak Pertindihan",
        "Pastikan gabungan memelihara semua perbezaan penting dan tidak mengulang idea yang sama.",
      ),
    ]),
    branch("pelbagai", "Hubungkan Pelbagai Bahan", [
      branch("pelbagai-langkah", "Lima Langkah", [
        node(
          "pelbagai-1",
          "1. Ringkaskan Setiap Bahan",
          "Catat satu idea pusat bagi setiap bahan.",
        ),
        node("pelbagai-2", "2. Cari Tema Bersama", "Kenal pasti isu yang menyatukan bahan."),
        node(
          "pelbagai-3",
          "3. Kenal Pasti Isi Unik",
          "Tandai maklumat yang hanya muncul dalam bahan tertentu.",
        ),
        node(
          "pelbagai-4",
          "4. Kenal Pasti Isi Bertindih",
          "Gabungkan idea yang sama atau hampir sama.",
        ),
        node("pelbagai-5", "5. Hubungkan Mengikut Soalan", "Susun hubungan yang menjawab fokus."),
      ]),
      branch("pelbagai-sungai", "Contoh Pencemaran Sungai", [
        node(
          "pelbagai-sungai-1",
          "Bahan 1 — Sebab",
          "Pembuangan sisa menjadi punca pencemaran sungai.",
        ),
        node("pelbagai-sungai-2", "Bahan 2 — Kesan", "Pencemaran menjejaskan alam sekitar."),
        node(
          "pelbagai-sungai-3",
          "Bahan 3 — Penyelesaian",
          "Masyarakat perlu mengurus sisa secara bertanggungjawab.",
        ),
        node(
          "pelbagai-sungai-hasil",
          "Sintesis",
          "Pencemaran sungai berpunca daripada pembuangan sisa dan boleh menjejaskan alam sekitar. Oleh itu, masyarakat perlu mengamalkan pengurusan sisa yang lebih bertanggungjawab.",
        ),
      ]),
      node(
        "pelbagai-jangan-paksa",
        "Jangan Paksa Satu Ayat",
        "Tidak semua bahan perlu dipaksa ke dalam satu ayat; gunakan lebih daripada satu ayat apabila hubungan lebih jelas.",
      ),
    ]),
    branch("susun", "Susun Idea", [
      branch("susun-pola", "Pola Susunan Logik", [
        node("susun-sebab", "Sebab → Kesan", "Mulakan dengan punca sebelum akibat."),
        node(
          "susun-masalah",
          "Masalah → Penyelesaian",
          "Nyatakan isu sebelum langkah menanganinya.",
        ),
        node("susun-umum", "Umum → Khusus", "Perkenalkan konsep sebelum butiran penting."),
        node(
          "susun-penting",
          "Kepentingan → Tindakan",
          "Terangkan nilai sesuatu perkara sebelum cadangan.",
        ),
        node("susun-masa", "Kronologi", "Susun peristiwa mengikut urutan masa."),
      ]),
      branch("susun-aliran", "PENCEMARAN ↓ KESAN ↓ LANGKAH", [
        node("susun-aliran-masalah", "Pencemaran Berlaku", "Nyatakan masalah."),
        node("susun-aliran-kesan", "↓ Memberi Kesan", "Terangkan akibat berkaitan."),
        node(
          "susun-aliran-langkah",
          "↓ Langkah Diambil",
          "Hubungkan kepada tindakan penyelesaian.",
        ),
      ]),
      node(
        "susun-wacana",
        "Penanda Wacana Secukupnya",
        "Gunakan penanda seperti oleh itu atau selain itu apabila membantu hubungan idea; jangan memenuhi rumusan pendek dengan penanda yang tidak meningkatkan kejelasan.",
      ),
    ]),
    branch("bahasa", "Gunakan Bahasa Sendiri", [
      branch("bahasa-cara", "Cara Memparafrasa", [
        node(
          "bahasa-struktur",
          "Ubah Struktur Ayat",
          "Susun semula unsur ayat tanpa mengubah hubungan idea.",
        ),
        node(
          "bahasa-sinonim",
          "Gunakan Sinonim Sesuai",
          "Ganti perkataan hanya apabila maksud dan konteks kekal.",
        ),
        node(
          "bahasa-gabung",
          "Gabungkan Idea",
          "Satukan isi berkaitan dengan ayat yang lebih padat.",
        ),
        node("bahasa-pendek", "Pendekkan Ungkapan", "Buang kata atau frasa yang tidak diperlukan."),
      ]),
      branch("bahasa-koku", "Contoh Kokurikulum", [
        node(
          "bahasa-koku-asal",
          "Ayat Asal",
          "Murid digalakkan untuk mengambil bahagian dalam aktiviti kokurikulum bagi meningkatkan keyakinan diri.",
        ),
        node(
          "bahasa-koku-olah",
          "Parafrasa",
          "Penglibatan dalam kokurikulum dapat membantu murid membina keyakinan diri.",
        ),
      ]),
      node(
        "bahasa-bukan-semua",
        "Tidak Perlu Ganti Semua Perkataan",
        "Tujuan parafrasa ialah menjelaskan dan memadatkan maklumat, bukan menukar setiap perkataan sehingga ayat menjadi janggal.",
      ),
    ]),
    branch("maksud", "Kekalkan Maksud", [
      branch("maksud-unsur", "Nuansa yang Perlu Dipelihara", [
        node("maksud-kuantiti", "Kuantiti", "Bezakan sebahagian, kebanyakan dan semua."),
        node("maksud-pasti", "Tahap Kepastian", "Bezakan mungkin, boleh dan pasti."),
        node("maksud-sebab", "Sebab", "Jangan tukar punca kepada perkara lain."),
        node("maksud-kesan", "Kesan", "Pastikan akibat asal tidak berubah."),
        node("maksud-subjek", "Subjek", "Kekalkan pihak yang melakukan tindakan."),
        node("maksud-masa", "Tempoh Masa", "Jangan ubah bila sesuatu berlaku."),
        node("maksud-skala", "Skop", "Jangan meluaskan atau mengecilkan dakwaan tanpa bukti."),
      ]),
      branch("maksud-remaja", "Contoh ‘Sebahagian Remaja’", [
        node("maksud-remaja-asal", "Ayat Asal", "Sebahagian remaja kurang aktif."),
        node("maksud-remaja-salah", "Salah", "Semua remaja malas bersenam."),
        node(
          "maksud-remaja-betul",
          "Betul",
          "Sesetengah remaja kurang melakukan aktiviti fizikal.",
        ),
      ]),
      node(
        "maksud-jangan-lebih",
        "Jangan Melebih-lebihkan",
        "Parafrasa yang baik memadatkan bahasa tanpa menambah kepastian, penilaian atau fakta baharu.",
      ),
    ]),
    branch("bina-rumusan", "Bina Rumusan", [
      branch("bina-rumusan-aliran", "FOKUS ↓ ISI UTAMA ↓ PADATKAN", [
        node("bina-rumusan-fokus", "Fokus", "Nyatakan atau fahami perkara yang dirumuskan."),
        node("bina-rumusan-1", "↓ Isi Utama 1", "Pilih idea penting pertama."),
        node("bina-rumusan-2", "↓ Isi Utama 2", "Tambahkan idea penting seterusnya."),
        node("bina-rumusan-3", "↓ Isi Utama 3", "Masukkan isi lain hanya jika relevan."),
        node(
          "bina-rumusan-akhir",
          "↓ Penutup Ringkas jika Perlu",
          "Gunakan hanya apabila sesuai dengan soalan.",
        ),
      ]),
      node(
        "bina-rumusan-contoh",
        "Contoh",
        "Petikan membincangkan faedah amalan membaca. Antaranya, membaca dapat meningkatkan pengetahuan, memperluas kosa kata dan mengembangkan kemahiran berfikir.",
      ),
      node(
        "bina-rumusan-format",
        "Format Mengikut Soalan",
        "Bentuk sebenar bergantung pada arahan; jangan hafal satu pembukaan wajib atau menganggap setiap rumusan memerlukan kesimpulan.",
      ),
    ]),
    branch("bina-sintesis", "Bina Sintesis", [
      node(
        "bina-sintesis-prinsip",
        "Tunjukkan Hubungan",
        "Sintesis yang kuat menerangkan cara idea saling melengkapi, bertentangan atau membentuk syarat kepada idea lain.",
      ),
      branch("bina-sintesis-digital", "Contoh Pembelajaran Digital", [
        node(
          "bina-sintesis-a",
          "Maklumat A",
          "Pembelajaran digital memudahkan akses kepada bahan.",
        ),
        node(
          "bina-sintesis-b",
          "Maklumat B",
          "Murid masih perlu berdisiplin dalam mengurus masa skrin.",
        ),
        node(
          "bina-sintesis-lemah",
          "Lemah",
          "Pembelajaran digital memberikan akses kepada bahan. Murid memerlukan disiplin.",
        ),
        node(
          "bina-sintesis-kuat",
          "Sintesis Lebih Kuat",
          "Pembelajaran digital memudahkan akses kepada bahan pendidikan, tetapi murid tetap perlu mengurus penggunaan teknologi secara berdisiplin agar pembelajaran kekal berkesan.",
        ),
      ]),
      node(
        "bina-sintesis-beza",
        "Hubungan, Bukan Pengumpulan",
        "Kata hubung dan struktur ayat perlu menunjukkan hubungan sebenar, bukan sekadar menyambungkan dua fakta.",
      ),
    ]),
    branch("contoh", "Contoh Latihan", [
      branch("contoh-latihan", "CONTOH LATIHAN — Kesihatan Remaja", [
        node(
          "contoh-bahan-1",
          "Bahan 1",
          "Remaja perlu melakukan aktiviti fizikal secara berkala untuk mengekalkan kecergasan.",
        ),
        node(
          "contoh-bahan-2",
          "Bahan 2",
          "Tidur yang mencukupi membantu tubuh pulih dan meningkatkan tumpuan.",
        ),
        node(
          "contoh-bahan-3",
          "Bahan 3",
          "Pemakanan seimbang membekalkan nutrien yang diperlukan untuk pertumbuhan.",
        ),
        branch("contoh-tugasan-1", "Tugasan 1 — Isi Utama Setiap Bahan", [
          node("contoh-t1-soalan", "Arahan", "Nyatakan isi utama setiap bahan."),
          node("contoh-t1-b1", "Bahan 1", "Aktiviti fizikal penting untuk kecergasan."),
          node("contoh-t1-b2", "Bahan 2", "Tidur mencukupi membantu pemulihan dan tumpuan."),
          node("contoh-t1-b3", "Bahan 3", "Pemakanan seimbang membekalkan nutrien."),
        ]),
        branch("contoh-tugasan-2", "Tugasan 2 — Bina Sintesis", [
          node("contoh-t2-soalan", "Arahan", "Bina satu sintesis."),
          node(
            "contoh-t2-jawapan",
            "Jawapan Mungkin",
            "Kesihatan remaja dapat dipelihara melalui aktiviti fizikal yang berkala, tidur yang mencukupi dan pemakanan yang seimbang.",
          ),
          node(
            "contoh-t2-hurai",
            "Penjelasan",
            "Jawapan menggabungkan tiga idea berkaitan di bawah konsep kesihatan remaja.",
          ),
        ]),
        branch("contoh-tugasan-3", "Tugasan 3 — Nilai Kesilapan", [
          node(
            "contoh-t3-soalan",
            "Soalan",
            "Apakah kesilapan jika murid hanya menyalin ketiga-tiga bahan?",
          ),
          node(
            "contoh-t3-jawapan",
            "Jawapan",
            "Murid hanya mengumpulkan maklumat tanpa mengolah dan menunjukkan hubungan, maka maklumat itu belum disintesis.",
          ),
        ]),
      ]),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-salin",
        "Salin Bulat-bulat",
        "Maklumat disalin tanpa pemilihan, pemadatan atau pengolahan.",
      ),
      node(
        "kesalahan-semua",
        "Semua Ayat Dianggap Isi",
        "Huraian, contoh dan butiran tidak dibezakan daripada isi utama.",
      ),
      node(
        "kesalahan-dua",
        "Isi Sama Dikira Dua Kali",
        "Idea bertindih diulang sebagai isi berasingan.",
      ),
      node(
        "kesalahan-contoh",
        "Terlalu Banyak Contoh",
        "Contoh memenuhi rumusan sehingga isi utama tenggelam.",
      ),
      node(
        "kesalahan-opini",
        "Tambah Pendapat Sendiri",
        "Pandangan baharu dimasukkan walaupun tidak diminta.",
      ),
      node(
        "kesalahan-fakta",
        "Fakta Berubah",
        "Parafrasa mengubah kuantiti, sebab, kesan, subjek atau kepastian.",
      ),
      node(
        "kesalahan-senarai",
        "Sintesis Jadi Senarai",
        "Idea diletakkan bersebelahan tanpa menunjukkan hubungan.",
      ),
      node("kesalahan-panjang", "Terlalu Panjang", "Teks tidak benar-benar dipadatkan."),
      node(
        "kesalahan-pendek",
        "Terlalu Pendek",
        "Maklumat penting hilang sehingga mesej tidak lengkap.",
      ),
      node(
        "kesalahan-paksa",
        "Paksa Semua Bahan",
        "Maklumat tidak relevan dimasukkan semata-mata untuk menggunakan setiap bahan.",
      ),
      node(
        "kesalahan-wacana",
        "Penanda Wacana Berlebihan",
        "Rumusan pendek menjadi janggal dan sarat.",
      ),
      node(
        "kesalahan-kesimpulan",
        "Kesimpulan Baharu",
        "Dakwaan yang tidak disokong bahan ditambah pada akhir rumusan.",
      ),
    ]),
    branch("uasa", "Tip UASA", [
      branch("uasa-proses", "RINGKASKAN → PILIH → GABUNG → HUBUNG → OLAH → SEMAK", [
        node(
          "uasa-ringkas",
          "Ringkaskan",
          "Catat satu nota pendek bagi setiap perenggan atau bahan.",
        ),
        node("uasa-pilih", "→ Pilih", "Kekalkan hanya maklumat yang penting dan relevan."),
        node("uasa-gabung", "→ Gabung", "Satukan idea yang bertindih."),
        node("uasa-hubung", "→ Hubung", "Tunjukkan hubungan antara isi."),
        node("uasa-olah", "→ Olah", "Gunakan bahasa sendiri yang tepat."),
        node("uasa-semak", "→ Semak", "Periksa maksud, fokus dan relevan."),
      ]),
      branch("uasa-pghos", "P-G-H-O-S", [
        node("uasa-p", "P — Pilih", "Kenal pasti isi penting."),
        node("uasa-g", "G — Gabung", "Satukan pertindihan."),
        node("uasa-h", "H — Hubung", "Bina hubungan idea."),
        node("uasa-o", "O — Olah", "Parafrasa dengan tepat."),
        node("uasa-s", "S — Semak", "Pastikan maksud kekal."),
      ]),
      node(
        "uasa-rumusan",
        "RUMUSAN = PILIH + PADATKAN",
        "Gunakan sebagai gambaran konsep rumusan.",
      ),
      node(
        "uasa-sintesis",
        "SINTESIS = HUBUNG + GABUNG",
        "Gunakan sebagai gambaran konsep sintesis.",
      ),
      node(
        "uasa-arahan",
        "Alat Konsep, Bukan Formula Markah",
        "Jangan menetapkan had perkataan, bilangan isi, bilangan perenggan atau markah yang dijamin. Ikut arahan pentaksiran sebenar.",
      ),
    ]),
  ],
};
