import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-strategi-memahami-menjawab-komsas";

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

export const bahasaMelayuTingkatan1StrategiKomsasMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "STRATEGI KOMSAS",
  summary:
    "KOMSAS membantu murid memahami karya sastera melalui tema, persoalan, watak, perwatakan, latar, plot, nilai, pengajaran, gaya bahasa dan bukti daripada teks.",
  children: [
    branch("definisi", "Apa Itu KOMSAS?", [
      node(
        "definisi-maksud",
        "Definisi",
        "KOMSAS ialah Komponen Sastera dalam mata pelajaran Bahasa Melayu. Murid membaca dan memahami karya untuk mengenal pasti tema, persoalan, watak, perwatakan, latar, plot, nilai, pengajaran, gaya bahasa dan mesej.",
      ),
      node(
        "definisi-tujuan",
        "Tujuan",
        "KOMSAS membantu murid memahami karya, menghayati nilai, menilai tindakan watak, memahami bahasa sastera dan menyokong jawapan dengan peristiwa.",
      ),
      node(
        "definisi-prinsip",
        "Prinsip Utama",
        "Jangan hafal fakta secara terpisah. Gunakan KONSEP + PERISTIWA + BUKTI.",
      ),
    ]),
    branch("jenis", "Jenis Karya", [
      node(
        "jenis-novel",
        "Novel",
        "Karya prosa panjang dengan perkembangan watak, konflik dan peristiwa.",
      ),
      node(
        "jenis-cerpen",
        "Cerpen",
        "Cerita pendek yang berfokus pada beberapa watak dan konflik utama.",
      ),
      node("jenis-drama", "Drama", "Karya berbentuk dialog dan aksi untuk dipentaskan."),
      node(
        "jenis-prosa-tradisional",
        "Prosa Tradisional",
        "Karya prosa warisan yang menggunakan bentuk bahasa dan penceritaan tradisional.",
      ),
      node(
        "jenis-sajak",
        "Sajak",
        "Puisi moden yang menyampaikan idea, perasaan atau mesej.",
      ),
      node(
        "jenis-pantun",
        "Pantun",
        "Puisi tradisional yang lazimnya mempunyai pembayang dan maksud.",
      ),
      node(
        "jenis-syair",
        "Syair",
        "Puisi tradisional yang setiap rangkapnya membawa isi atau cerita secara berterusan.",
      ),
    ]),
    branch("tema", "Tema", [
      node(
        "tema-definisi",
        "Idea Utama Karya",
        "Tema ialah idea utama atau persoalan besar yang menjadi dasar keseluruhan karya.",
      ),
      node(
        "tema-soalan",
        "Soalan Panduan",
        "Tanya: “Apakah perkara utama yang menjadi fokus karya ini?”",
      ),
      branch("tema-latihan", "CONTOH LATIHAN", [
        node(
          "tema-latihan-situasi",
          "Situasi",
          "Sebuah cerita mengisahkan seorang murid yang terus belajar walaupun menghadapi kesukaran kewangan.",
        ),
        node(
          "tema-latihan-jawapan",
          "Tema yang Mungkin",
          "Kegigihan dalam menghadapi cabaran hidup.",
        ),
      ]),
      node(
        "tema-keseluruhan",
        "Lihat Keseluruhan Karya",
        "Tema perlu menggambarkan keseluruhan karya, bukan satu peristiwa kecil sahaja. Sesebuah karya boleh menerima ungkapan tema yang berbeza jika tetap tepat dan disokong teks.",
      ),
    ]),
    branch("persoalan", "Persoalan", [
      node(
        "persoalan-definisi",
        "Idea Sampingan",
        "Persoalan ialah idea sampingan yang dikembangkan dalam karya untuk menyokong tema.",
      ),
      branch("persoalan-contoh", "Contoh Persoalan Umum", [
        node("persoalan-kasih", "Kasih Sayang Keluarga"),
        node("persoalan-tanggungjawab", "Tanggungjawab"),
        node("persoalan-berani", "Keberanian"),
        node("persoalan-kerjasama", "Kerjasama"),
        node("persoalan-pendidikan", "Kepentingan Pendidikan"),
      ]),
      branch("persoalan-beza", "Tema → Persoalan", [
        node("persoalan-tema", "Tema", "Kegigihan mencapai kejayaan."),
        node(
          "persoalan-sokongan",
          "Persoalan yang Mungkin",
          "Pengorbanan keluarga, kepentingan ilmu dan sikap tidak mudah berputus asa.",
        ),
      ]),
    ]),
    branch("watak", "Watak & Perwatakan", [
      node("watak-definisi", "Watak", "Individu yang terlibat dalam karya."),
      node("watak-perwatakan", "Perwatakan", "Sifat atau ciri seseorang watak."),
      node(
        "watak-sifat",
        "Contoh Sifat",
        "Rajin, bertanggungjawab, berani, penyayang, jujur, prihatin dan gigih.",
      ),
      branch("watak-bukti", "PERWATAKAN + BUKTI PERISTIWA", [
        node(
          "watak-bukti-jawapan",
          "CONTOH LATIHAN",
          "“Amir seorang yang bertanggungjawab kerana dia menyiapkan tugasannya sebelum membantu rakannya.”",
        ),
        node(
          "watak-bukti-lemah",
          "Jawapan Belum Cukup",
          "“Amir bertanggungjawab.” Jawapan ini belum mempunyai peristiwa sokongan apabila bukti diperlukan.",
        ),
      ]),
    ]),
    branch("latar", "Latar", [
      node(
        "latar-tempat",
        "Latar Tempat",
        "Lokasi sesuatu peristiwa berlaku, contohnya sekolah, rumah atau kampung.",
      ),
      node(
        "latar-masa",
        "Latar Masa",
        "Waktu atau zaman sesuatu peristiwa berlaku, contohnya pagi, malam atau zaman tertentu.",
      ),
      node(
        "latar-masyarakat",
        "Latar Masyarakat",
        "Jenis atau ciri komuniti yang digambarkan, contohnya masyarakat yang bekerjasama atau mementingkan pendidikan.",
      ),
      node(
        "latar-amaran",
        "Jangan Keliru",
        "Latar masyarakat bukan lokasi fizikal. “Sekolah” ialah tempat, manakala “masyarakat yang mementingkan pendidikan” ialah ciri komuniti.",
      ),
    ]),
    branch("plot", "Plot", [
      node(
        "plot-permulaan",
        "Permulaan",
        "Watak atau situasi awal diperkenalkan.",
      ),
      node(
        "plot-perkembangan",
        "Perkembangan",
        "Peristiwa mula berkembang dan menggerakkan cerita.",
      ),
      node(
        "plot-konflik",
        "Perumitan / Konflik",
        "Masalah menjadi lebih jelas atau semakin sukar.",
      ),
      node(
        "plot-klimaks",
        "Klimaks",
        "Titik tertinggi konflik atau ketegangan.",
      ),
      node(
        "plot-peleraian",
        "Peleraian",
        "Konflik bergerak menuju penyelesaian.",
      ),
      node(
        "plot-panduan",
        "Panduan, Bukan Formula",
        "Tidak semua karya pendek mengikuti struktur yang sama secara sempurna. Gunakan urutan ini sebagai panduan membaca, bukan formula yang kaku.",
      ),
    ]),
    branch("nilai", "Nilai", [
      node(
        "nilai-definisi",
        "Sifat atau Amalan Positif",
        "Nilai ialah sifat atau amalan positif yang terdapat dalam karya.",
      ),
      node(
        "nilai-contoh",
        "Contoh Nilai",
        "Kasih sayang, keberanian, kerjasama, kejujuran, tanggungjawab, kegigihan dan hormat-menghormati.",
      ),
      node(
        "nilai-bukti",
        "NILAI + BUKTI",
        "CONTOH LATIHAN: “Nilai kerjasama ditunjukkan apabila penduduk bergotong-royong membersihkan kawasan kampung.”",
      ),
      node(
        "nilai-relevan",
        "Pastikan Relevan",
        "Jangan memilih nilai hanya kerana kedengarannya positif. Peristiwa mesti benar-benar menunjukkan nilai itu.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-definisi",
        "Pedoman daripada Karya",
        "Pengajaran ialah perkara yang boleh dijadikan pedoman daripada karya.",
      ),
      node(
        "pengajaran-struktur",
        "Struktur Biasa",
        "Jawapan boleh dimulakan dengan “Kita hendaklah…”, “Kita mestilah…” atau “Kita haruslah…”.",
      ),
      branch("pengajaran-latihan", "CONTOH LATIHAN", [
        node(
          "pengajaran-peristiwa",
          "Peristiwa",
          "Seorang murid terus mencuba selepas mengalami kegagalan.",
        ),
        node("pengajaran-nilai", "Nilai", "Kegigihan."),
        node(
          "pengajaran-jawapan",
          "Pengajaran",
          "“Kita hendaklah gigih berusaha dan tidak mudah berputus asa.”",
        ),
      ]),
      node(
        "pengajaran-beza",
        "Nilai ≠ Pengajaran",
        "NILAI ialah sifat atau amalan, manakala PENGAJARAN ialah nasihat atau pedoman.",
      ),
    ]),
    branch("gaya", "Gaya Bahasa", [
      node(
        "gaya-simile",
        "Simile",
        "Perbandingan yang menggunakan penanda seperti, bagai, bak atau umpama.",
      ),
      node("gaya-metafora", "Metafora", "Perbandingan secara tidak langsung."),
      node(
        "gaya-personifikasi",
        "Personifikasi",
        "Memberikan tindakan atau sifat manusia kepada benda bukan manusia.",
      ),
      node(
        "gaya-peribahasa",
        "Peribahasa",
        "Ungkapan kiasan yang telah mantap penggunaannya.",
      ),
      node(
        "gaya-pengulangan",
        "Pengulangan",
        "Perkataan atau frasa yang diulang untuk memberikan kesan apabila pengulangan itu benar-benar hadir.",
      ),
      node(
        "gaya-bukti",
        "Rujuk Perkataan Sebenar",
        "Jangan namakan gaya bahasa tanpa sokongan perkataan dalam teks. Ayat yang kreatif tidak semestinya mengandungi gaya bahasa tertentu.",
      ),
    ]),
    branch("bukti", "Bukti Teks", [
      node(
        "bukti-prinsip",
        "JAWAPAN + PERISTIWA",
        "Jawapan KOMSAS yang kukuh sering memerlukan peristiwa relevan daripada karya.",
      ),
      branch("bukti-latihan", "CONTOH LATIHAN", [
        node("bukti-soalan", "Soalan", "“Nyatakan satu nilai.”"),
        node("bukti-lemah", "Jawapan Lemah", "“Kerjasama.”"),
        node(
          "bukti-baik",
          "Jawapan Lebih Baik",
          "“Nilai kerjasama ditunjukkan apabila penduduk bekerjasama membersihkan kawasan mereka.”",
        ),
      ]),
      node(
        "bukti-cukup",
        "Bukti Paling Ringkas yang Mencukupi",
        "Pilih peristiwa yang membuktikan jawapan. Jangan ceritakan semula keseluruhan karya.",
      ),
    ]),
    branch("jawapan", "Bina Jawapan", [
      node(
        "jawapan-tema",
        "Tema",
        "“Tema karya ialah ______.” Huraikan secara ringkas jika soalan memerlukannya.",
      ),
      node(
        "jawapan-persoalan",
        "Persoalan",
        "“Salah satu persoalan ialah ______.” Tambahkan peristiwa yang relevan apabila diperlukan.",
      ),
      node(
        "jawapan-perwatakan",
        "Perwatakan",
        "“Watak ______ seorang yang ______ kerana ______.”",
      ),
      node(
        "jawapan-nilai",
        "Nilai",
        "“Nilai ______ ditunjukkan apabila ______.”",
      ),
      node(
        "jawapan-pengajaran",
        "Pengajaran",
        "“Kita hendaklah ______.” Sertakan konteks atau bukti apabila diperlukan.",
      ),
      node(
        "jawapan-latar",
        "Latar",
        "“Latar tempat yang terdapat dalam karya ialah ______.” Sokong dengan peristiwa.",
      ),
      node(
        "jawapan-anjal",
        "Struktur Fleksibel",
        "Ayat ini ialah perancah untuk membina jawapan, bukan format peperiksaan tetap atau formula jaminan markah.",
      ),
    ]),
    branch("beza", "Bezakan Konsep", [
      node(
        "beza-tema-persoalan",
        "Tema vs Persoalan",
        "TEMA ialah idea utama keseluruhan karya; PERSOALAN ialah idea sampingan yang menyokong tema.",
      ),
      node(
        "beza-watak-perwatakan",
        "Watak vs Perwatakan",
        "WATAK menjawab siapa; PERWATAKAN menerangkan sifat watak itu.",
      ),
      node(
        "beza-nilai-pengajaran",
        "Nilai vs Pengajaran",
        "NILAI ialah sifat atau amalan positif; PENGAJARAN ialah nasihat atau pedoman.",
      ),
      node(
        "beza-latar",
        "Latar Tempat vs Latar Masyarakat",
        "LATAR TEMPAT ialah lokasi; LATAR MASYARAKAT ialah ciri komuniti.",
      ),
      node(
        "beza-plot-peristiwa",
        "Plot vs Peristiwa",
        "PLOT ialah susunan perkembangan cerita; PERISTIWA ialah satu kejadian tertentu.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-tema-kecil",
        "Tema Terlalu Kecil",
        "Satu peristiwa kecil dianggap sebagai idea keseluruhan karya.",
      ),
      node(
        "kesalahan-persoalan-tema",
        "Persoalan = Tema",
        "Jawapan yang sama diulang tanpa membezakan idea utama daripada idea sampingan.",
      ),
      node(
        "kesalahan-watak",
        "Watak = Perwatakan",
        "Nama watak diberikan apabila soalan meminta sifat.",
      ),
      node(
        "kesalahan-perwatakan-bukti",
        "Perwatakan Tanpa Bukti",
        "Sifat dinyatakan tetapi tiada peristiwa yang menyokongnya.",
      ),
      node(
        "kesalahan-nilai-pengajaran",
        "Nilai dan Pengajaran Keliru",
        "NILAI: kerajinan. PENGAJARAN: kita hendaklah rajin.",
      ),
      node(
        "kesalahan-latar",
        "Latar Masyarakat Salah",
        "“Sekolah” ialah lokasi, bukan ciri masyarakat.",
      ),
      node(
        "kesalahan-cerita",
        "Cerita Semula",
        "Seluruh karya diceritakan semula tanpa menjawab unsur yang diminta.",
      ),
      node(
        "kesalahan-bukti",
        "Bukti Tidak Berkaitan",
        "Peristiwa yang dipilih tidak membuktikan sifat atau nilai yang dinyatakan.",
      ),
      node(
        "kesalahan-gaya",
        "Gaya Bahasa Direka",
        "Metafora atau simile didakwa wujud tanpa perkataan yang menyokongnya.",
      ),
      node(
        "kesalahan-fakta",
        "Fakta Diubah",
        "Watak, peristiwa atau hasil cerita ditukar secara tidak sengaja.",
      ),
    ]),
    branch("uasa", "Tip UASA", [
      branch("uasa-proses", "Proses Menjawab", [
        node(
          "uasa-baca",
          "1. BACA SOALAN",
          "Kenal pasti unsur sastera yang diminta.",
        ),
        node(
          "uasa-konsep",
          "2. KENAL PASTI KONSEP",
          "Adakah soalan meminta tema, persoalan, perwatakan, nilai, pengajaran atau latar?",
        ),
        node(
          "uasa-ingat",
          "3. INGAT PERISTIWA",
          "Cari peristiwa yang relevan daripada karya.",
        ),
        node(
          "uasa-padankan",
          "4. PADANKAN",
          "Pastikan peristiwa benar-benar menyokong jawapan.",
        ),
        node("uasa-jawab", "5. JAWAB", "Gunakan ayat yang jelas dan gramatis."),
        node(
          "uasa-semak",
          "6. SEMAK",
          "Semak ketepatan watak, peristiwa dan maksud jawapan.",
        ),
      ]),
      branch("uasa-kbb", "K-B-B", [
        node("uasa-k", "K — Konsep", "Kenal pasti unsur sastera yang ditanya."),
        node("uasa-b1", "B — Bukti", "Pilih peristiwa yang relevan."),
        node("uasa-b2", "B — Bina Jawapan", "Tulis jawapan yang lengkap dan gramatis."),
      ]),
      node(
        "uasa-beza",
        "Tiga Peringatan",
        "WATAK ≠ PERWATAKAN • NILAI ≠ PENGAJARAN • TEMA ≠ PERSOALAN. Semua ini ialah bantuan ingatan, bukan formula pemarkahan yang kaku.",
      ),
      branch("uasa-latihan", "CONTOH LATIHAN — BUKAN TEKS RASMI", [
        node(
          "uasa-latihan-petikan",
          "Petikan Rekaan",
          "“Setiap pagi, Hana membantu ibunya menyediakan kuih sebelum ke sekolah. Walaupun perlu bangun lebih awal daripada rakan-rakannya, Hana tetap menyiapkan kerja sekolahnya pada waktu malam. Dia mahu membantu keluarganya tanpa mengabaikan pelajaran.”",
        ),
        branch("uasa-latihan-q1", "Soalan 1 — Perwatakan", [
          node("uasa-latihan-q1-soalan", "Soalan", "Apakah perwatakan Hana?"),
          node(
            "uasa-latihan-q1-jawapan",
            "Jawapan",
            "“Hana seorang yang bertanggungjawab kerana dia membantu ibunya menyediakan kuih tanpa mengabaikan pelajarannya.”",
          ),
        ]),
        branch("uasa-latihan-q2", "Soalan 2 — Nilai", [
          node("uasa-latihan-q2-soalan", "Soalan", "Nyatakan satu nilai."),
          node(
            "uasa-latihan-q2-jawapan",
            "Jawapan",
            "“Nilai tanggungjawab ditunjukkan apabila Hana membantu keluarganya sambil memastikan kerja sekolahnya disiapkan.”",
          ),
        ]),
        branch("uasa-latihan-q3", "Soalan 3 — Pengajaran", [
          node("uasa-latihan-q3-soalan", "Soalan", "Nyatakan satu pengajaran."),
          node(
            "uasa-latihan-q3-jawapan",
            "Jawapan",
            "“Kita hendaklah melaksanakan tanggungjawab terhadap keluarga tanpa mengabaikan pelajaran.”",
          ),
        ]),
        branch("uasa-latihan-q4", "Soalan 4 — Persoalan", [
          node(
            "uasa-latihan-q4-soalan",
            "Soalan",
            "Apakah persoalan yang dapat dikenal pasti?",
          ),
          node(
            "uasa-latihan-q4-jawapan",
            "Jawapan yang Mungkin",
            "“Persoalan tanggungjawab seorang anak terhadap keluarga.”",
          ),
        ]),
        node(
          "uasa-latihan-rumus",
          "Bezakan Jawapan",
          "PERWATAKAN → sifat • NILAI → sifat positif • PENGAJARAN → pedoman • PERSOALAN → idea sampingan.",
        ),
      ]),
    ]),
  ],
};
