import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-menjawab-soalan-kbat-lanjutan";

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

export const bahasaMelayuTingkatan2KbatMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KBAT LANJUTAN",
  summary:
    "Soalan KBAT memerlukan murid berfikir melangkaui maklumat langsung dalam petikan dengan memberikan idea yang munasabah, relevan dan disokong oleh alasan yang jelas.",
  children: [
    branch("apa-itu", "Apa Itu KBAT?", [
      node(
        "apa-definisi",
        "Definisi",
        "KBAT ialah Kemahiran Berfikir Aras Tinggi yang memerlukan murid menggunakan maklumat untuk membuat pertimbangan, memberikan alasan, mencadangkan penyelesaian atau menghasilkan kesimpulan yang munasabah.",
      ),
      node(
        "apa-bukan-salin",
        "Bukan Salin Petikan",
        "Jawapan KBAT biasanya tidak boleh diperoleh dengan hanya menyalin satu ayat daripada petikan. Murid perlu mengolah maklumat dan mengembangkan idea sendiri.",
      ),
      node(
        "apa-bukan-teka",
        "Bukan Teka",
        "KBAT bukan bermaksud murid boleh memberikan sebarang pendapat. Jawapan mesti relevan, logik, sesuai dengan situasi dan menepati kehendak soalan.",
      ),
      branch("apa-tingkatan-2", "Keperluan Tingkatan 2", [
        node(
          "apa-petikan",
          "Petikan",
          "Kenal pasti isu, situasi atau petunjuk yang menjadi asas jawapan.",
        ),
        node(
          "apa-pengetahuan",
          "+ Pengetahuan",
          "Gunakan pengetahuan sedia ada yang berkaitan dan tidak bercanggah dengan petikan.",
        ),
        node(
          "apa-alasan",
          "+ Alasan",
          "Jelaskan mengapa idea itu sesuai atau bagaimana idea tersebut dapat membantu.",
        ),
        node(
          "apa-jawapan",
          "= Jawapan KBAT",
          "Gabungkan petikan, pengetahuan dan alasan untuk menghasilkan jawapan yang matang.",
        ),
      ]),
    ]),
    branch("kehendak", "Kenal Pasti Kehendak", [
      node(
        "kehendak-mengapa",
        "Mengapakah?",
        "Berikan sebab atau alasan yang menjelaskan sesuatu keadaan.",
      ),
      node(
        "kehendak-bagaimana",
        "Bagaimanakah?",
        "Terangkan cara, tindakan atau langkah yang sesuai untuk mencapai sesuatu tujuan.",
      ),
      node(
        "kehendak-pendapat",
        "Pada Pendapat Anda",
        "Nyatakan pendapat yang jelas dan sokong pendapat tersebut dengan alasan.",
      ),
      node(
        "kehendak-kesan",
        "Apakah Kesan?",
        "Nyatakan akibat atau hasil yang munasabah daripada situasi.",
      ),
      node(
        "kehendak-tindakan",
        "Apakah Tindakan?",
        "Cadangkan tindakan yang sesuai dengan pihak dan keadaan.",
      ),
      node(
        "kehendak-wajar",
        "Wajarkah?",
        "Nyatakan pendirian, kemudian berikan justifikasi yang logik.",
      ),
      node(
        "kehendak-ramalkan",
        "Ramalkan",
        "Jangkakan hasil masa hadapan yang logik berdasarkan bukti atau keadaan dalam petikan.",
      ),
      node(
        "kehendak-fleksibel",
        "Pilih Rangka yang Sesuai",
        "Jangan jawab setiap soalan KBAT dengan rumus yang sama. Kata tugas menentukan bentuk jawapan yang diperlukan.",
      ),
    ]),
    branch("jenis", "Jenis Soalan KBAT", [
      node(
        "jenis-sebab",
        "Sebab",
        "Contoh: Mengapakah amalan membaca perlu dipupuk dalam kalangan remaja?",
      ),
      node(
        "jenis-langkah",
        "Langkah",
        "Contoh: Bagaimanakah sekolah dapat mengurangkan pembaziran air?",
      ),
      node(
        "jenis-kesan",
        "Kesan",
        "Contoh: Apakah kesan penggunaan gajet secara berlebihan terhadap murid?",
      ),
      node(
        "jenis-pendapat",
        "Pendapat",
        "Contoh: Pada pendapat anda, perlukah aktiviti kokurikulum diteruskan?",
      ),
      node(
        "jenis-penilaian",
        "Penilaian",
        "Contoh: Wajarkah penggunaan telefon pintar dihadkan semasa pembelajaran?",
      ),
      node(
        "jenis-ramalan",
        "Ramalan",
        "Contoh: Ramalkan keadaan sungai jika masyarakat terus membuang sampah.",
      ),
      node(
        "jenis-penyelesaian",
        "Penyelesaian",
        "Contoh: Cadangkan cara mengatasi masalah murid kurang berminat membaca.",
      ),
      node(
        "jenis-nilai",
        "Nilai atau Tindakan",
        "Contoh: Apakah tindakan yang patut anda ambil apabila melihat rakan dibuli?",
      ),
      node(
        "jenis-aplikasi",
        "Aplikasi dalam Kehidupan",
        "Contoh: Bagaimanakah amalan berjimat cermat dapat diterapkan dalam kehidupan harian?",
      ),
    ]),
    branch("hubungkan", "Hubungkan dengan Petikan", [
      node(
        "hubungkan-prinsip",
        "Kekal pada Isu",
        "Walaupun menggunakan idea sendiri, jawapan perlu terus berkaitan dengan isu atau situasi dalam bahan sumber.",
      ),
      branch("hubungkan-contoh", "Contoh Kempen Plastik", [
        node(
          "hubungkan-petikan",
          "Petikan",
          "Sekolah menjalankan kempen mengurangkan penggunaan plastik.",
        ),
        node(
          "hubungkan-soalan",
          "Soalan",
          "Pada pendapat anda, apakah tindakan lain yang boleh dilakukan oleh murid?",
        ),
        node(
          "hubungkan-baik",
          "Jawapan Baik",
          "Murid boleh membawa botol minuman dan bekas makanan guna semula supaya penggunaan plastik sekali guna dapat dikurangkan.",
        ),
        node(
          "hubungkan-sebab-baik",
          "Mengapa Baik?",
          "Jawapan itu relevan dengan isu, praktikal dan mengandungi kesan daripada tindakan yang dicadangkan.",
        ),
        node(
          "hubungkan-lemah",
          "Jawapan Tidak Berkaitan",
          "Murid perlu belajar bersungguh-sungguh.",
        ),
        node(
          "hubungkan-sebab-lemah",
          "Mengapa Tidak Sesuai?",
          "Idea itu positif, tetapi tidak menjawab isu pengurangan penggunaan plastik.",
        ),
      ]),
    ]),
    branch("alasan", "Berikan Alasan", [
      node(
        "alasan-prinsip",
        "Idea Perlu Dikembangkan",
        "Idea sahaja mungkin lemah. Kembangkan jawapan melalui urutan Idea → kerana → Alasan.",
      ),
      branch("alasan-gotong-royong", "Contoh Gotong-royong", [
        node("alasan-soalan", "Soalan", "Mengapakah aktiviti gotong-royong perlu diteruskan?"),
        node("alasan-lemah", "Jawapan Lemah", "Gotong-royong perlu diteruskan."),
        node(
          "alasan-baik",
          "Jawapan Lebih Baik",
          "Gotong-royong perlu diteruskan kerana aktiviti tersebut dapat menjaga kebersihan kawasan dan mengeratkan hubungan antara penduduk.",
        ),
      ]),
      node(
        "alasan-tanya",
        "Tanya ‘Mengapa?’",
        "Selepas menghasilkan idea, tanya ‘Mengapa idea ini sesuai?’ untuk membina alasan yang jelas.",
      ),
    ]),
    branch("langkah", "Cadangkan Langkah", [
      branch("langkah-rangka", "Pihak + Tindakan + Cara + Kesan", [
        node(
          "langkah-pihak",
          "Pihak",
          "Kenal pasti pihak yang mempunyai peranan dalam masalah tersebut.",
        ),
        node("langkah-tindakan", "Tindakan", "Nyatakan perkara yang perlu dilakukan."),
        node("langkah-cara", "Cara", "Terangkan bagaimana tindakan itu dilaksanakan."),
        node("langkah-kesan", "Kesan", "Jelaskan hasil yang dijangka daripada tindakan tersebut."),
      ]),
      node(
        "langkah-contoh",
        "Contoh",
        "Pihak sekolah boleh menyediakan lebih banyak tong kitar semula di lokasi strategik supaya murid lebih mudah mengasingkan sisa.",
      ),
      branch("langkah-pihak-sesuai", "Kesesuaian Pihak", [
        node(
          "langkah-murid",
          "Murid",
          "Cadangkan tindakan yang dapat dilakukan secara realistik oleh murid.",
        ),
        node(
          "langkah-sekolah",
          "Sekolah",
          "Cadangkan program, peraturan atau kemudahan di sekolah.",
        ),
        node(
          "langkah-ibu-bapa",
          "Ibu Bapa",
          "Cadangkan bimbingan, teladan atau pemantauan di rumah.",
        ),
        node("langkah-masyarakat", "Masyarakat", "Cadangkan tindakan bersama dalam komuniti."),
        node("langkah-kerajaan", "Kerajaan", "Cadangkan dasar atau inisiatif berskala besar."),
      ]),
      node(
        "langkah-realistik",
        "Elakkan Cadangan Tidak Realistik",
        "Pastikan pihak yang dinamakan mempunyai kemampuan dan kuasa untuk melaksanakan tindakan tersebut.",
      ),
    ]),
    branch("ramalkan", "Ramalkan Kesan", [
      node(
        "ramalkan-rangka",
        "Situasi → Kesan yang Mungkin → Alasan",
        "Gunakan bukti daripada situasi untuk meramalkan akibat yang munasabah, kemudian jelaskan hubungan sebab dan akibat.",
      ),
      branch("ramalkan-sungai", "Contoh Pencemaran Sungai", [
        node("ramalkan-situasi", "Situasi", "Masyarakat terus membuang sampah ke dalam sungai."),
        node(
          "ramalkan-jawapan",
          "Jawapan",
          "Jika perbuatan tersebut berterusan, sungai akan semakin tercemar dan risiko banjir kilat boleh meningkat kerana aliran air tersumbat.",
        ),
      ]),
      node(
        "ramalkan-munasabah",
        "Ramalan Mesti Munasabah",
        "Jangan mereka fakta yang terlalu khusus, statistik atau peristiwa yang tidak disokong oleh konteks.",
      ),
    ]),
    branch("penilaian", "Buat Penilaian", [
      node(
        "penilaian-rangka",
        "Pendirian + Alasan + Kesan atau Contoh",
        "Nyatakan sama ada anda bersetuju atau tidak, kemudian pertahankan pendirian itu secara logik.",
      ),
      branch("penilaian-telefon", "Contoh Telefon Pintar", [
        node(
          "penilaian-soalan",
          "Soalan",
          "Wajarkah penggunaan telefon pintar dihadkan semasa pembelajaran?",
        ),
        node(
          "penilaian-jawapan",
          "Jawapan",
          "Ya, penggunaannya wajar dihadkan semasa sesi pembelajaran supaya murid dapat memberikan tumpuan dan tidak terganggu oleh aplikasi yang tidak berkaitan.",
        ),
      ]),
      node(
        "penilaian-pandangan",
        "Pandangan Lain Boleh Diterima",
        "Soalan penilaian tidak semestinya mempunyai satu pandangan sahaja. Pendirian lain boleh diterima jika relevan dan disokong justifikasi yang logik.",
      ),
    ]),
    branch("penyelesaian", "Penyelesaian Masalah", [
      node(
        "penyelesaian-rangka",
        "Masalah → Punca → Tindakan → Hasil Dijangka",
        "Kenal pasti masalah dan puncanya sebelum memilih tindakan yang dapat menghasilkan perubahan yang sesuai.",
      ),
      branch("penyelesaian-soalan-panduan", "Soalan Panduan", [
        node(
          "penyelesaian-apa",
          "Apakah Masalahnya?",
          "Nyatakan masalah utama yang perlu diselesaikan.",
        ),
        node(
          "penyelesaian-siapa",
          "Siapakah yang Boleh Bertindak?",
          "Pilih pihak yang sesuai dan berupaya.",
        ),
        node(
          "penyelesaian-tindakan",
          "Apakah Tindakannya?",
          "Cadangkan langkah yang khusus dan praktikal.",
        ),
        node(
          "penyelesaian-bantu",
          "Bagaimanakah Tindakan Membantu?",
          "Hubungkan tindakan dengan hasil yang dijangka.",
        ),
      ]),
      branch("penyelesaian-membaca", "Contoh Minat Membaca", [
        node("penyelesaian-masalah", "Masalah", "Murid kurang berminat untuk membaca."),
        node(
          "penyelesaian-jawapan",
          "Cadangan",
          "Pihak sekolah boleh menganjurkan program membaca yang lebih interaktif seperti sesi ulasan buku dan cabaran membaca bagi meningkatkan minat murid.",
        ),
      ]),
    ]),
    branch("matang", "Bina Jawapan Matang", [
      node("matang-aras-1", "Aras 1 — Idea Sahaja", "Murid perlu membaca."),
      node(
        "matang-aras-2",
        "Aras 2 — Idea + Alasan",
        "Murid perlu membaca kerana amalan tersebut dapat menambah pengetahuan.",
      ),
      node(
        "matang-aras-3",
        "Aras 3 — Idea + Alasan + Kesan atau Contoh",
        "Murid perlu menjadikan membaca sebagai amalan kerana aktiviti tersebut dapat menambah pengetahuan dan memperluas kosa kata, sekali gus membantu mereka memahami pelajaran dengan lebih baik.",
      ),
      node(
        "matang-ciri",
        "Ciri Jawapan Matang",
        "Jawapan matang relevan, jelas, disokong dan logik. Jawapan tidak perlu dipanjangkan dengan huraian yang tidak membantu.",
      ),
    ]),
    branch("contoh", "Contoh KBAT", [
      branch("contoh-alam", "Alam Sekitar", [
        node(
          "contoh-alam-soalan",
          "Soalan",
          "Bagaimanakah murid dapat membantu mengurangkan pencemaran?",
        ),
        node(
          "contoh-alam-jawapan",
          "Jawapan",
          "Murid boleh mengamalkan pengasingan sisa dan mengurangkan penggunaan barangan sekali guna supaya jumlah sampah yang dibuang dapat dikurangkan.",
        ),
      ]),
      branch("contoh-kesihatan", "Kesihatan", [
        node(
          "contoh-kesihatan-soalan",
          "Soalan",
          "Mengapakah remaja perlu menjalani gaya hidup sihat?",
        ),
        node(
          "contoh-kesihatan-jawapan",
          "Jawapan",
          "Remaja perlu menjalani gaya hidup sihat supaya tubuh mereka kekal cergas dan risiko menghadapi masalah kesihatan dapat dikurangkan.",
        ),
      ]),
      branch("contoh-teknologi", "Teknologi", [
        node(
          "contoh-teknologi-soalan",
          "Soalan",
          "Apakah cara menggunakan Internet secara bertanggungjawab?",
        ),
        node(
          "contoh-teknologi-jawapan",
          "Jawapan",
          "Pengguna perlu menyemak kesahihan maklumat sebelum berkongsi kandungan supaya berita palsu tidak tersebar.",
        ),
      ]),
      branch("contoh-masyarakat", "Masyarakat", [
        node(
          "contoh-masyarakat-soalan",
          "Soalan",
          "Apakah tindakan yang boleh dilakukan untuk mengeratkan hubungan kejiranan?",
        ),
        node(
          "contoh-masyarakat-jawapan",
          "Jawapan",
          "Penduduk boleh mengadakan aktiviti gotong-royong dan program komuniti supaya mereka mempunyai lebih banyak peluang untuk berinteraksi dan bekerjasama.",
        ),
      ]),
      branch("contoh-pendidikan", "Pendidikan", [
        node(
          "contoh-pendidikan-soalan",
          "Soalan",
          "Bagaimanakah murid dapat meningkatkan prestasi pembelajaran?",
        ),
        node(
          "contoh-pendidikan-jawapan",
          "Jawapan",
          "Murid boleh menyediakan jadual belajar yang teratur dan membuat ulang kaji secara konsisten supaya mereka dapat menguasai pelajaran dengan lebih berkesan.",
        ),
      ]),
    ]),
    branch("semak", "Semak Logik", [
      branch("semak-senarai", "Semakan LOGIK", [
        node("semak-1", "1. Jawab Soalan", "Adakah saya menjawab kehendak soalan?"),
        node("semak-2", "2. Berkaitan", "Adakah idea berkaitan dengan situasi dalam petikan?"),
        node(
          "semak-3",
          "3. Boleh Dilakukan",
          "Adakah tindakan yang dicadangkan dapat dilaksanakan oleh pihak tersebut?",
        ),
        node("semak-4", "4. Alasan Munasabah", "Adakah alasan saya masuk akal?"),
        node(
          "semak-5",
          "5. Kesan Berkaitan",
          "Adakah kesan benar-benar berpunca daripada tindakan?",
        ),
        node(
          "semak-6",
          "6. Fakta Perlu",
          "Adakah saya menambah fakta yang tidak diperlukan atau tidak disokong?",
        ),
      ]),
      branch("semak-contoh", "Contoh Hubungan Logik", [
        node("semak-tindakan", "Tindakan", "Menanam pokok."),
        node("semak-logik", "Kesan Logik", "Membantu menghijaukan kawasan."),
        node(
          "semak-tidak-logik",
          "Kesan Tidak Logik",
          "Menjamin semua murid mendapat keputusan cemerlang.",
        ),
      ]),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "salah-salin",
        "Salin Petikan Sahaja",
        "Jawapan tidak menunjukkan penaakulan atau pengolahan idea sendiri.",
      ),
      node("salah-alasan", "Pendapat Tanpa Alasan", "Idea dinyatakan tetapi tidak dikembangkan."),
      node(
        "salah-berkaitan",
        "Jawapan Tidak Berkaitan",
        "Idea mungkin positif tetapi tidak menjawab isu atau kehendak soalan.",
      ),
      node(
        "salah-realistik",
        "Cadangan Tidak Realistik",
        "Tindakan tidak dapat dilakukan secara munasabah oleh pihak yang dinamakan.",
      ),
      node("salah-umum", "Terlalu Umum", "Contoh: Kita mesti melakukan perkara yang baik."),
      node(
        "salah-ulang",
        "Mengulang Soalan",
        "Jawapan mengulang kata-kata soalan tanpa memberikan maklumat baharu.",
      ),
      node(
        "salah-kesan",
        "Kesan Tidak Logik",
        "Kesan yang dinyatakan tidak berpunca daripada tindakan yang dicadangkan.",
      ),
      node(
        "salah-banyak",
        "Terlalu Banyak Idea",
        "Beberapa idea disenaraikan tetapi tiada satu pun dihuraikan dengan jelas.",
      ),
      node(
        "salah-fakta",
        "Fakta Direka",
        "Statistik, nama atau peristiwa ditambah tanpa sokongan daripada bahan.",
      ),
      node(
        "salah-bahasa",
        "Bahasa Tidak Jelas",
        "Binaan ayat tidak lengkap sehingga idea sukar difahami.",
      ),
    ]),
    branch("teknik", "Teknik Mengingat", [
      branch("teknik-iak", "Rumus I-A-K", [
        node("iak-i", "I — Idea", "Contoh: Membawa botol guna semula."),
        node("iak-a", "A — Alasan", "Contoh: Mengurangkan penggunaan plastik."),
        node("iak-k", "K — Kesan", "Contoh: Jumlah sisa dapat dikurangkan."),
      ]),
      branch("teknik-ptk", "Rumus P-T-K", [
        node("ptk-p", "P — Pihak", "Tentukan pihak yang sesuai untuk bertindak."),
        node("ptk-t", "T — Tindakan", "Nyatakan langkah yang praktikal."),
        node("ptk-k", "K — Kesan", "Hubungkan tindakan dengan hasil yang dijangka."),
      ]),
      branch("teknik-pa", "Rumus P-A", [
        node("pa-p", "P — Pendirian", "Nyatakan pendirian bagi soalan pendapat atau penilaian."),
        node("pa-a", "A — Alasan", "Berikan justifikasi yang menyokong pendirian."),
      ]),
      node(
        "teknik-fleksibel",
        "Alat Berfikir yang Fleksibel",
        "Gunakan rumus sebagai panduan mengembangkan idea, bukan sebagai formula kaku untuk semua soalan peperiksaan.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node(
        "uasa-kata-tugas",
        "Baca Kata Tugas",
        "Kenal pasti sama ada soalan meminta sebab, langkah, kesan, ramalan atau penilaian.",
      ),
      node(
        "uasa-jenis",
        "Kenal Pasti Jenis KBAT",
        "Pilih bentuk jawapan yang sepadan dengan kehendak soalan.",
      ),
      node(
        "uasa-isu",
        "Kaitkan dengan Isu",
        "Pastikan idea terus berkaitan dengan petikan atau situasi.",
      ),
      node(
        "uasa-realistik",
        "Fikir Idea Realistik",
        "Pilih tindakan atau pendapat yang munasabah dan praktikal.",
      ),
      node("uasa-alasan", "Berikan Alasan", "Jelaskan mengapa idea sesuai atau penting."),
      node(
        "uasa-kesan",
        "Nyatakan Kesan Jika Sesuai",
        "Hubungkan tindakan atau keadaan dengan hasil yang logik.",
      ),
      node(
        "uasa-bahasa",
        "Gunakan Bahasa Gramatis",
        "Sampaikan idea melalui ayat yang lengkap dan jelas.",
      ),
      node(
        "uasa-logik",
        "Semak Logik",
        "Pastikan alasan dan kesan benar-benar berkaitan dengan idea.",
      ),
      node(
        "uasa-fakta",
        "Jangan Mereka Fakta",
        "Elakkan statistik, nama atau peristiwa yang tidak diberikan atau tidak diperlukan.",
      ),
      node(
        "uasa-arahan",
        "Ikut Kehendak Semasa",
        "Tiada satu struktur, bilangan ayat atau panjang jawapan yang sesuai untuk semua soalan. Patuhi arahan dan konteks soalan.",
      ),
    ]),
  ],
};
