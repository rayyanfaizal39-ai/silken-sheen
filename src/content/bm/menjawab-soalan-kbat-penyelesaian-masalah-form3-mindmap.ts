import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-menjawab-soalan-kbat-penyelesaian-masalah";

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

export const bahasaMelayuTingkatan3KbatPenyelesaianMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KBAT & PENYELESAIAN",
  summary:
    "Soalan KBAT memerlukan murid menggunakan maklumat dalam petikan untuk membuat pertimbangan, memberikan justifikasi, meramal kesan dan mencadangkan penyelesaian yang munasabah.",
  children: [
    branch("apa-itu", "Apa Itu KBAT?", [
      node(
        "apa-itu-definisi",
        "Kemahiran Berfikir Aras Tinggi",
        "KBAT ialah kemahiran menggunakan maklumat untuk menganalisis, membuat pertimbangan, menyelesaikan masalah, menilai tindakan, memberikan justifikasi, meramal kesan dan mencadangkan idea.",
      ),
      branch("apa-itu-ciri", "Ciri Jawapan KBAT yang Kuat", [
        node("apa-itu-relevan", "Relevan", "Idea menjawab isu dan kehendak soalan."),
        node("apa-itu-logik", "Logik", "Hubungan alasan, tindakan dan kesan masuk akal."),
        node(
          "apa-itu-sokong",
          "Disokong",
          "Pendirian atau cadangan diterangkan dengan alasan yang sesuai.",
        ),
        node(
          "apa-itu-realistik",
          "Realistik",
          "Tindakan boleh dilaksanakan oleh pihak yang dicadangkan.",
        ),
        node("apa-itu-jelas", "Jelas", "Bahasa mudah difahami dan idea berkembang secara teratur."),
      ]),
      branch("apa-itu-bukan", "KBAT Bukan...", [
        node(
          "apa-itu-bukan-opini",
          "Pendapat Rawak",
          "Pendapat tanpa kaitan atau alasan bukan jawapan KBAT yang matang.",
        ),
        node(
          "apa-itu-bukan-teka",
          "Teka-teki",
          "Jawapan perlu dibina daripada isu, konteks dan penaakulan.",
        ),
        node(
          "apa-itu-bukan-panjang",
          "Menulis Sebanyak Mungkin",
          "Panjang jawapan tidak menjamin ketepatan atau kematangan.",
        ),
      ]),
    ]),
    branch("jenis-soalan", "Kenal Pasti Jenis Soalan", [
      node(
        "jenis-pendapat",
        "‘Pada Pendapat Anda...’",
        "Berikan pendapat dan alasan yang menyokongnya.",
      ),
      node("jenis-wajar", "‘Wajarkah...’", "Nyatakan pendirian dan berikan justifikasi."),
      node("jenis-cadang", "‘Cadangkan...’", "Kemukakan tindakan yang praktikal dan berkaitan."),
      node("jenis-bagaimana", "‘Bagaimanakah...’", "Terangkan kaedah, langkah atau pendekatan."),
      node(
        "jenis-ramal",
        "‘Ramalkan...’",
        "Nyatakan hasil masa hadapan yang munasabah berdasarkan situasi.",
      ),
      node(
        "jenis-kesan",
        "‘Apakah Kesan...’",
        "Terangkan akibat yang mempunyai hubungan logik dengan keadaan.",
      ),
      node(
        "jenis-tindakan",
        "‘Apakah Tindakan...’",
        "Cadangkan respons yang sesuai terhadap masalah.",
      ),
      node(
        "jenis-anda",
        "‘Apakah yang Akan Anda Lakukan...’",
        "Nyatakan tindakan peribadi berserta sebab atau manfaatnya.",
      ),
      node(
        "jenis-arahan",
        "Kata Tugas Menentukan Struktur",
        "Kata tugas yang berbeza memerlukan bentuk jawapan yang berbeza; jangan gunakan satu rangka secara kaku untuk semua soalan.",
      ),
    ]),
    branch("pendirian", "Pendirian dan Justifikasi", [
      branch("pendirian-rumus", "PENDIRIAN + ALASAN + KESAN / CONTOH", [
        node(
          "pendirian-rumus-p",
          "Pendirian",
          "Nyatakan setuju, tidak setuju atau pendirian bersyarat dengan jelas.",
        ),
        node("pendirian-rumus-a", "+ Alasan", "Terangkan sebab pendirian itu munasabah."),
        node(
          "pendirian-rumus-k",
          "+ Kesan atau Contoh",
          "Jelaskan manfaat, akibat atau contoh yang menguatkan alasan apabila sesuai.",
        ),
      ]),
      branch("pendirian-telefon", "Contoh Telefon Pintar", [
        node(
          "pendirian-telefon-soalan",
          "Soalan",
          "Wajarkah penggunaan telefon pintar dikawal semasa pembelajaran?",
        ),
        node(
          "pendirian-telefon-jawapan",
          "Jawapan Kuat",
          "Ya, penggunaannya wajar dikawal supaya murid dapat memberikan tumpuan kepada pembelajaran dan tidak terganggu oleh aplikasi yang tidak berkaitan.",
        ),
        node(
          "pendirian-telefon-ciri",
          "Mengapa Kuat?",
          "Jawapan mempunyai pendirian yang jelas, alasan dan manfaat yang dijangka.",
        ),
      ]),
      node(
        "pendirian-fleksibel",
        "Pendirian Berbeza Boleh Diterima",
        "Murid boleh tidak bersetuju jika pendirian itu berkaitan dan dijustifikasikan secara logik. Ketidaksetujuan semata-mata bukan bukti pemikiran yang lebih tinggi.",
      ),
    ]),
    branch("penyelesaian", "Cadangkan Penyelesaian", [
      branch("penyelesaian-aliran", "MASALAH ↓ PIHAK ↓ TINDAKAN ↓ KESAN", [
        node("penyelesaian-masalah", "Masalah", "Kenal pasti isu sebenar yang perlu ditangani."),
        node("penyelesaian-pihak", "↓ Pihak", "Tentukan pihak yang mampu bertindak."),
        node(
          "penyelesaian-tindakan",
          "↓ Tindakan",
          "Cadangkan langkah yang khusus dan boleh dilakukan.",
        ),
        node(
          "penyelesaian-kesan",
          "↓ Kesan",
          "Terangkan cara tindakan itu membantu menyelesaikan masalah.",
        ),
      ]),
      branch("penyelesaian-membaca", "Contoh Minat Membaca", [
        node("penyelesaian-membaca-masalah", "Masalah", "Murid kurang minat membaca."),
        node(
          "penyelesaian-membaca-jawapan",
          "Penyelesaian Mungkin",
          "Pihak sekolah boleh menyediakan bahan bacaan yang lebih pelbagai dan menganjurkan aktiviti ulasan buku supaya murid lebih berminat untuk membaca.",
        ),
      ]),
      branch("penyelesaian-pihak-sesuai", "Padankan Pihak dengan Tindakan", [
        node("penyelesaian-murid", "Murid", "Amalan dan tindakan peribadi."),
        node("penyelesaian-sekolah", "Sekolah", "Program, peraturan dan kemudahan sekolah."),
        node("penyelesaian-ibu-bapa", "Ibu Bapa", "Bimbingan, sokongan dan pemantauan di rumah."),
        node("penyelesaian-masyarakat", "Masyarakat", "Aktiviti dan kerjasama komuniti."),
        node("penyelesaian-kerajaan", "Kerajaan", "Dasar dan inisiatif yang lebih luas."),
      ]),
      node(
        "penyelesaian-amaran",
        "Elakkan Salah Pihak",
        "Jangan memberikan tindakan berskala besar kepada pihak yang tidak mempunyai kuasa atau sumber untuk melaksanakannya.",
      ),
    ]),
    branch("ramal", "Ramalkan Kesan", [
      branch("ramal-rumus", "SITUASI SEMASA + HUBUNGAN LOGIK = HASIL MASA HADAPAN", [
        node(
          "ramal-situasi",
          "Situasi Semasa",
          "Kenal pasti keadaan atau tindakan yang sedang berlaku.",
        ),
        node(
          "ramal-hubung",
          "+ Hubungan Logik",
          "Jelaskan bagaimana keadaan itu boleh membawa kepada sesuatu akibat.",
        ),
        node(
          "ramal-hasil",
          "= Hasil Masa Hadapan",
          "Nyatakan ramalan yang munasabah dan berkaitan.",
        ),
      ]),
      branch("ramal-tidur", "Contoh Penggunaan Peranti", [
        node(
          "ramal-tidur-situasi",
          "Situasi",
          "Murid semakin kerap tidur lewat akibat penggunaan peranti yang berlebihan.",
        ),
        node(
          "ramal-tidur-jawapan",
          "Ramalan Mungkin",
          "Jika keadaan ini berterusan, murid mungkin menghadapi kesukaran menumpukan perhatian di dalam kelas kerana mereka tidak mendapat rehat yang mencukupi.",
        ),
      ]),
      node(
        "ramal-kata",
        "Gunakan Bahasa Berhati-hati",
        "Gunakan mungkin, berpotensi, boleh atau berkemungkinan apabila hasilnya tidak pasti.",
      ),
      node(
        "ramal-pasti",
        "Ramalan Bukan Fakta Terjamin",
        "Jangan menggunakan ‘pasti’ apabila bukti hanya menyokong satu kemungkinan.",
      ),
    ]),
    branch("nilai", "Nilai Tindakan", [
      branch("nilai-aspek", "Aspek Penilaian", [
        node("nilai-wajar", "Wajar atau Tidak Wajar", "Nilai kesesuaian tindakan dengan keadaan."),
        node(
          "nilai-kesan",
          "Berkesan atau Tidak Berkesan",
          "Nilai sama ada tindakan boleh mencapai tujuan.",
        ),
        node(
          "nilai-adil",
          "Adil atau Tidak Adil",
          "Pertimbangkan kesan terhadap pihak yang terlibat.",
        ),
        node(
          "nilai-tanggung",
          "Bertanggungjawab atau Tidak",
          "Pertimbangkan kewajipan dan akibat tindakan.",
        ),
      ]),
      branch("nilai-rumus", "PENILAIAN = PERTIMBANGAN + ALASAN + KESAN MUNGKIN", [
        node("nilai-rumus-timbang", "Pertimbangan", "Nyatakan penilaian dengan jelas."),
        node("nilai-rumus-alasan", "+ Alasan", "Terangkan sebab penilaian itu munasabah."),
        node(
          "nilai-rumus-kesan",
          "+ Kesan Mungkin",
          "Nyatakan akibat yang berkaitan apabila sesuai.",
        ),
      ]),
      branch("nilai-mesej", "Contoh Mesej Tidak Disahkan", [
        node(
          "nilai-mesej-situasi",
          "Situasi",
          "Seorang murid memanjangkan mesej yang belum disahkan.",
        ),
        node("nilai-mesej-soalan", "Soalan", "Adakah tindakan tersebut wajar?"),
        node(
          "nilai-mesej-jawapan",
          "Jawapan",
          "Tindakan tersebut tidak wajar kerana penyebaran maklumat yang belum disahkan boleh menyebabkan kekeliruan dan menyebarkan berita palsu.",
        ),
      ]),
    ]),
    branch("pilih", "Pilih Penyelesaian Terbaik", [
      node(
        "pilih-prinsip",
        "Banding Beberapa Pilihan",
        "Beberapa penyelesaian mungkin sesuai. Bandingkan pilihan sebelum menentukan yang lebih kukuh untuk konteks tersebut.",
      ),
      branch("pilih-kriteria", "Kriteria Perbandingan", [
        node("pilih-praktikal", "Praktikal", "Bolehkah tindakan dilaksanakan?"),
        node("pilih-relevan", "Relevan", "Adakah tindakan menangani masalah sebenar?"),
        node("pilih-berkesan", "Keberkesanan", "Sejauh mana tindakan boleh membantu?"),
        node("pilih-kos", "Kos atau Usaha", "Adakah sumber dan usaha yang diperlukan munasabah?"),
        node("pilih-pihak", "Pelaksana", "Siapakah yang mampu melaksanakannya?"),
        node("pilih-impak", "Impak Mungkin", "Apakah kesan yang boleh dijangka?"),
      ]),
      branch("pilih-sampah", "Contoh Sampah di Sekolah", [
        node("pilih-sampah-masalah", "Masalah", "Sampah dibuang merata-rata di sekolah."),
        node("pilih-sampah-a", "Pilihan A", "Memasang poster kebersihan."),
        node(
          "pilih-sampah-b",
          "Pilihan B",
          "Menyediakan tong sampah yang mencukupi serta menganjurkan aktiviti kesedaran.",
        ),
        node(
          "pilih-sampah-nilai",
          "Penilaian Lebih Baik",
          "Pilihan B lebih berkesan kerana bukan sahaja meningkatkan kesedaran, malah menyediakan kemudahan yang membolehkan murid membuang sampah dengan betul.",
        ),
      ]),
      node(
        "pilih-bukan-mutlak",
        "Tiada Pilihan Sempurna untuk Semua Keadaan",
        "Pilihan terbaik bergantung pada konteks, bukti dan kriteria; jangan anggap setiap masalah mempunyai satu penyelesaian yang sempurna secara mutlak.",
      ),
    ]),
    branch("hubung", "Hubungkan dengan Petikan", [
      node(
        "hubung-prinsip",
        "Idea Baharu Mesti Kekal Berkaitan",
        "Jawapan KBAT boleh melangkaui kata-kata tepat dalam petikan, tetapi masih perlu menjawab isu yang ditampilkan.",
      ),
      branch("hubung-jalan", "Contoh Kesesakan Lalu Lintas", [
        node("hubung-jalan-petikan", "Isu Petikan", "Kesesakan lalu lintas."),
        node("hubung-jalan-soalan", "Soalan", "Apakah yang boleh dilakukan oleh orang ramai?"),
        node(
          "hubung-jalan-relevan",
          "Relevan",
          "Menggunakan pengangkutan awam atau berkongsi kereta.",
        ),
        node("hubung-jalan-tidak", "Tidak Relevan", "Membaca lebih banyak buku."),
      ]),
      branch("hubung-aliran", "PETIKAN → ISU → IDEA → ALASAN", [
        node("hubung-aliran-petikan", "Petikan", "Fahami maklumat dan situasi."),
        node("hubung-aliran-isu", "→ Isu", "Kenal pasti masalah atau fokus."),
        node("hubung-aliran-idea", "→ Idea", "Kemukakan respons yang berkaitan."),
        node("hubung-aliran-alasan", "→ Alasan", "Jelaskan mengapa idea itu sesuai."),
      ]),
    ]),
    branch("bukti", "Gunakan Bukti", [
      branch("bukti-teks", "Sokongan Berasaskan Teks", [
        node(
          "bukti-teks-guna",
          "Bila Digunakan",
          "Gunakan maklumat langsung daripada petikan apabila soalan memerlukannya.",
        ),
        node(
          "bukti-teks-had",
          "Kekalkan Ketepatan",
          "Jangan mengubah atau menambah fakta yang tidak diberikan.",
        ),
      ]),
      branch("bukti-konteks", "Sokongan Berasaskan Konteks", [
        node(
          "bukti-konteks-guna",
          "Bila Digunakan",
          "Gunakan situasi dalam petikan untuk mewajarkan idea KBAT baharu yang berkaitan.",
        ),
        node(
          "bukti-konteks-beza",
          "Bukan Salinan",
          "Idea tidak semestinya disalin, tetapi mesti bertindak balas terhadap masalah yang ditunjukkan.",
        ),
      ]),
      branch("bukti-komuniti", "Contoh Aktiviti Komuniti", [
        node(
          "bukti-komuniti-petikan",
          "Maklumat Petikan",
          "Penduduk jarang menyertai aktiviti komuniti.",
        ),
        node(
          "bukti-komuniti-cadang",
          "Cadangan KBAT",
          "Pihak komuniti boleh menganjurkan aktiviti yang lebih menarik dan sesuai dengan pelbagai peringkat umur supaya lebih ramai penduduk terdorong untuk mengambil bahagian.",
        ),
        node(
          "bukti-komuniti-hubung",
          "Hubungan",
          "Cadangan tidak disalin, tetapi menjawab terus masalah penyertaan yang rendah.",
        ),
      ]),
    ]),
    branch("matang", "Bina Jawapan Matang", [
      node("matang-1", "Tahap 1 — Terlalu Umum", "Kerajaan perlu membantu."),
      node("matang-2", "Tahap 2 — Lebih Baik", "Kerajaan perlu membantu dengan mengadakan kempen."),
      node(
        "matang-3",
        "Tahap 3 — Jelas dan Berkembang",
        "Kerajaan boleh melaksanakan kempen kesedaran secara berterusan supaya masyarakat memahami kesan isu tersebut dan terdorong untuk mengubah tingkah laku.",
      ),
      branch("matang-ciri", "Empat Ciri Jawapan Matang", [
        node("matang-pihak", "Pihak", "Kenal pasti pelaksana yang sesuai."),
        node("matang-tindakan", "Tindakan", "Nyatakan tindakan yang khusus."),
        node(
          "matang-cara",
          "Cara atau Sebab",
          "Terangkan bagaimana atau mengapa tindakan membantu.",
        ),
        node("matang-kesan", "Kesan", "Jelaskan hasil yang berkaitan apabila sesuai."),
      ]),
      node(
        "matang-panjang",
        "Matang Tidak Bererti Panjang",
        "Utamakan penaakulan yang jelas dan relevan; kosa kata rumit atau ayat panjang tidak semestinya menguatkan jawapan.",
      ),
    ]),
    branch("logik", "Uji Logik", [
      branch("logik-semak", "SEMAKAN LOGIK", [
        node("logik-relevan", "Adakah Idea Relevan?", "Pastikan idea menjawab isu dan kata tugas."),
        node(
          "logik-pihak",
          "Adakah Pihak Sesuai?",
          "Pastikan pihak mempunyai peranan atau kemampuan untuk bertindak.",
        ),
        node(
          "logik-boleh",
          "Bolehkah Tindakan Dilakukan?",
          "Elakkan cadangan mustahil atau tidak praktikal.",
        ),
        node("logik-kesan", "Adakah Kesan Berkaitan?", "Pastikan hubungan sebab dan akibat jelas."),
        node(
          "logik-alasan",
          "Adakah Alasan Munasabah?",
          "Alasan perlu menyokong pendirian atau cadangan.",
        ),
        node(
          "logik-fakta",
          "Adakah Saya Mereka Fakta?",
          "Jangan mencipta statistik, kajian atau pakar.",
        ),
      ]),
      branch("logik-botol", "Contoh Botol Guna Semula", [
        node("logik-botol-tindakan", "Tindakan", "Membawa botol guna semula."),
        node(
          "logik-botol-baik",
          "Kesan Logik",
          "Mengurangkan penggunaan botol plastik sekali guna.",
        ),
        node(
          "logik-botol-lemah",
          "Kesan Tidak Logik",
          "Menjamin semua masalah pencemaran negara selesai.",
        ),
      ]),
      node(
        "logik-melampau",
        "Elakkan Sebab dan Kesan Melampau",
        "Jangan membuat dakwaan besar yang tidak sepadan dengan skala tindakan atau bukti.",
      ),
    ]),
    branch("contoh", "Contoh KBAT", [
      branch("contoh-latihan", "CONTOH LATIHAN", [
        node(
          "contoh-petikan",
          "Petikan",
          "Penggunaan media sosial memberikan pelbagai manfaat kepada remaja, termasuk memudahkan komunikasi dan perkongsian maklumat. Namun, penggunaan tanpa kawalan boleh menyebabkan pembaziran masa dan pendedahan kepada maklumat yang tidak tepat.",
        ),
        branch("contoh-s1", "Soalan 1 — Tindakan Bertanggungjawab", [
          node(
            "contoh-s1-soalan",
            "Soalan",
            "Pada pendapat anda, bagaimanakah remaja boleh menggunakan media sosial secara bertanggungjawab?",
          ),
          node(
            "contoh-s1-jawapan",
            "Jawapan Mungkin",
            "Remaja boleh mengehadkan masa penggunaan media sosial dan menyemak kesahihan maklumat sebelum berkongsi sesuatu kandungan.",
          ),
          node(
            "contoh-s1-hurai",
            "Penjelasan",
            "Jawapan memberikan tindakan praktikal yang berkaitan dengan masalah.",
          ),
        ]),
        branch("contoh-s2", "Soalan 2 — Ramalkan Kesan", [
          node(
            "contoh-s2-soalan",
            "Soalan",
            "Apakah kesan jika remaja terlalu bergantung pada media sosial?",
          ),
          node(
            "contoh-s2-jawapan",
            "Jawapan Mungkin",
            "Remaja mungkin kurang memberikan tumpuan kepada pembelajaran dan aktiviti harian kerana terlalu banyak masa dihabiskan dalam talian.",
          ),
          node(
            "contoh-s2-hurai",
            "Penjelasan",
            "Ramalan dibina secara berhati-hati berdasarkan isu dalam petikan.",
          ),
        ]),
        branch("contoh-s3", "Soalan 3 — Nilai Pemantauan", [
          node(
            "contoh-s3-soalan",
            "Soalan",
            "Wajarkah ibu bapa memantau penggunaan media sosial anak-anak?",
          ),
          node(
            "contoh-s3-jawapan",
            "Jawapan Mungkin",
            "Ya, pemantauan secara berpatutan wajar dilakukan supaya ibu bapa dapat membimbing anak-anak menggunakan media sosial dengan selamat tanpa mengabaikan keperluan privasi mereka.",
          ),
          node(
            "contoh-s3-hurai",
            "Penjelasan",
            "Jawapan menilai secara seimbang dengan mempertimbangkan keselamatan dan privasi.",
          ),
        ]),
        branch("contoh-s4", "Soalan 4 — Penyelesaian Sekolah", [
          node(
            "contoh-s4-soalan",
            "Soalan",
            "Cadangkan satu langkah yang boleh dilakukan oleh sekolah.",
          ),
          node(
            "contoh-s4-jawapan",
            "Jawapan Mungkin",
            "Pihak sekolah boleh menjalankan program literasi digital untuk mengajar murid mengenal pasti maklumat palsu, menjaga privasi dan menggunakan media sosial secara beretika.",
          ),
          node(
            "contoh-s4-hurai",
            "Penjelasan",
            "Jawapan menggunakan pemikiran masalah dan penyelesaian dengan pihak serta tindakan yang sesuai.",
          ),
        ]),
      ]),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-alasan",
        "Pendapat Tanpa Alasan",
        "Jawapan seperti ‘Saya bersetuju’ tidak menjelaskan sebab pendirian.",
      ),
      node(
        "kesalahan-realistik",
        "Cadangan Tidak Realistik",
        "Cadangan seperti memberikan RM1 juta kepada setiap murid tidak praktikal.",
      ),
      node(
        "kesalahan-kaitan",
        "Idea Tidak Berkaitan",
        "Idea mungkin positif tetapi tidak menjawab isu petikan.",
      ),
      node(
        "kesalahan-logik",
        "Kesan Tidak Logik",
        "Kesan yang dinyatakan tidak mempunyai hubungan sebab dan akibat dengan tindakan.",
      ),
      node(
        "kesalahan-pasti",
        "Ramalan Dianggap Pasti",
        "Menggunakan ‘pasti’ apabila bukti hanya menyokong kemungkinan.",
      ),
      node(
        "kesalahan-fakta",
        "Fakta Direka",
        "Mencipta statistik, kajian, organisasi atau pakar yang tidak diberikan.",
      ),
      node(
        "kesalahan-umum",
        "Terlalu Umum",
        "Jawapan seperti ‘Kita perlu membuat perkara yang baik’ tidak menawarkan idea khusus.",
      ),
      node(
        "kesalahan-salin",
        "Salin Petikan",
        "Menyalin maklumat tanpa menunjukkan penaakulan sendiri.",
      ),
      node(
        "kesalahan-banyak",
        "Terlalu Banyak Idea",
        "Beberapa isi disenaraikan tanpa alasan atau pengembangan.",
      ),
      node(
        "kesalahan-pihak",
        "Salah Pihak",
        "Tindakan berskala kerajaan diberikan kepada murid secara individu.",
      ),
      node(
        "kesalahan-tiada-kesan",
        "Tidak Pertimbang Kesan",
        "Tindakan dicadangkan tanpa menerangkan cara tindakan itu membantu.",
      ),
      node(
        "kesalahan-kosong",
        "Jawapan Panjang tetapi Kosong",
        "Banyak perkataan digunakan tetapi penaakulan masih kabur atau berulang.",
      ),
    ]),
    branch("ingat", "Teknik Mengingat", [
      branch("ingat-pak", "P-A-K — Pendapat dan Penilaian", [
        node("ingat-pak-p", "P — Pendirian", "Nyatakan pertimbangan."),
        node("ingat-pak-a", "A — Alasan", "Berikan sebab yang munasabah."),
        node("ingat-pak-k", "K — Kesan", "Nyatakan akibat atau manfaat apabila sesuai."),
      ]),
      branch("ingat-ptk", "P-T-K — Penyelesaian", [
        node("ingat-ptk-p", "P — Pihak", "Tentukan pelaksana yang sesuai."),
        node("ingat-ptk-t", "T — Tindakan", "Cadangkan langkah yang praktikal."),
        node("ingat-ptk-k", "K — Kesan", "Jelaskan cara langkah itu membantu."),
      ]),
      branch("ingat-masa", "M-A-S-A — Penyelesaian Masalah", [
        node("ingat-masa-m", "M — Masalah", "Kenal pasti isu sebenar."),
        node("ingat-masa-a1", "A — Alternatif", "Fikirkan beberapa pilihan tindakan."),
        node("ingat-masa-s", "S — Semak Logik", "Bandingkan kesesuaian dan kebolehlaksanaan."),
        node("ingat-masa-a2", "A — Akibat atau Hasil", "Pertimbangkan kesan setiap pilihan."),
      ]),
      node(
        "ingat-fleksibel",
        "Alat Berfikir, Bukan Formula Kaku",
        "Gunakan bantuan ini mengikut jenis soalan; tidak setiap jawapan perlu memuatkan semua bahagian.",
      ),
    ]),
    branch("uasa", "Tip UASA", [
      node(
        "uasa-1",
        "1. Kenal Pasti Kata Tugas",
        "Tandai arahan seperti nilai, cadangkan, ramalkan atau wajarkah.",
      ),
      node(
        "uasa-2",
        "2. Tentukan Jenis KBAT",
        "Pilih struktur pemikiran yang sesuai dengan arahan.",
      ),
      node("uasa-3", "3. Kaitkan dengan Petikan", "Pastikan jawapan masih menjawab isu asal."),
      node(
        "uasa-4",
        "4. Berikan Idea Realistik",
        "Pilih tindakan atau pendirian yang boleh diterima akal.",
      ),
      node("uasa-5", "5. Jelaskan Alasan", "Terangkan mengapa idea itu sesuai."),
      node(
        "uasa-6",
        "6. Nyatakan Kesan jika Berguna",
        "Tambahkan akibat atau manfaat apabila membantu menjawab soalan.",
      ),
      node("uasa-7", "7. Semak Logik", "Uji pihak, tindakan, alasan dan hubungan sebab-akibat."),
      node("uasa-8", "8. Gunakan Bahasa Gramatis", "Sampaikan penaakulan dengan ayat yang jelas."),
      node(
        "uasa-9",
        "9. Jangan Cipta Fakta",
        "Gunakan petikan dan pengetahuan munasabah tanpa mereka statistik atau sumber.",
      ),
      node(
        "uasa-arahan",
        "Ikut Kehendak Soalan",
        "Jangan menetapkan markah, panjang, bilangan ayat atau formula yang dijamin. Tidak semua jawapan memerlukan semua bahagian rangka; patuhi arahan pentaksiran semasa.",
      ),
    ]),
  ],
};
