import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-kesalahan-lazim-strategi-semakan-pemahaman";

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

export const bahasaMelayuTingkatan3KesalahanSemakanPemahamanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "SEMAK PEMAHAMAN",
  summary:
    "Jawapan pemahaman yang baik bukan hanya bergantung pada pengetahuan, tetapi juga pada ketepatan memahami soalan, memilih bukti, membuat inferens dan menyemak semula jawapan sebelum dihantar.",
  children: [
    branch("soalan", "Salah Faham Soalan", [
      branch("soalan-punca", "Kesalahan yang Sering Berlaku", [
        node(
          "soalan-kata-tugas",
          "Kata Tugas Terlepas",
          "Tidak membaca kata tugas seperti jelaskan, nyatakan, mengapakah atau bagaimanakah.",
        ),
        node(
          "soalan-fokus",
          "Salah Fokus",
          "Menjawab tema umum tetapi bukan perkara khusus yang dikehendaki.",
        ),
        node(
          "soalan-bilangan",
          "Bilangan Isi Terlepas",
          "Tidak memberikan bilangan isi yang diminta.",
        ),
        node(
          "soalan-subsoalan",
          "Subsoalan Tidak Lengkap",
          "Gagal menjawab semua bahagian soalan.",
        ),
      ]),
      branch("soalan-contoh", "SALAH → BETUL", [
        node(
          "soalan-tanya",
          "Soalan",
          "“Jelaskan dua kesan penggunaan media sosial secara berlebihan.”",
        ),
        node("soalan-salah", "SALAH", "“Media sosial digunakan untuk berkomunikasi.”"),
        node(
          "soalan-kenapa",
          "KENAPA SALAH",
          "Jawapan menerangkan fungsi media sosial, bukan dua kesan penggunaannya secara berlebihan.",
        ),
        node(
          "soalan-betul",
          "BETUL",
          "“Penggunaan media sosial secara berlebihan boleh menyebabkan pembaziran masa dan mengganggu tumpuan terhadap pembelajaran.”",
        ),
        node(
          "soalan-baik",
          "KENAPA LEBIH BAIK",
          "Jawapan menepati kata tugas, fokus dan bilangan isi: KATA TUGAS + FOKUS + BILANGAN ISI.",
        ),
      ]),
    ]),
    branch("bukti", "Salah Pilih Bukti", [
      node(
        "bukti-prinsip",
        "Benar Belum Tentu Kuat",
        "Ayat yang benar daripada petikan masih lemah jika tidak membuktikan jawapan.",
      ),
      branch("bukti-contoh", "Uji Bukti", [
        node("bukti-dakwaan", "Dakwaan", "“Program itu berjaya.”"),
        node(
          "bukti-lemah",
          "BUKTI LEMAH",
          "“Program itu diadakan di dewan sekolah.” Maklumat ini benar tetapi tidak menunjukkan kejayaan.",
        ),
        node(
          "bukti-kuat",
          "BUKTI KUAT",
          "“Jumlah peserta meningkat dan semakin ramai murid mengambil bahagian.”",
        ),
        node(
          "bukti-tanya",
          "Soalan Semakan",
          "Adakah bukti ini benar-benar membuktikan jawapan saya?",
        ),
      ]),
    ]),
    branch("tersurat-tersirat", "Tersurat vs Tersirat", [
      node(
        "tt-beza",
        "Bezakan",
        "TERSURAT ialah apa yang berlaku; TERSIRAT ialah perkara yang dicadangkan oleh tindakan atau petunjuk itu.",
      ),
      branch("tt-contoh", "SALAH → BETUL", [
        node("tt-petikan", "Petikan", "“Hakim datang awal setiap hari untuk berlatih.”"),
        node("tt-soalan", "Soalan", "“Apakah sikap Hakim?”"),
        node("tt-lemah", "JAWAPAN LEMAH", "“Hakim datang awal.”"),
        node(
          "tt-kenapa",
          "KENAPA SALAH",
          "Jawapan hanya mengulang tindakan tersurat dan belum menyatakan sikap.",
        ),
        node(
          "tt-betul",
          "JAWAPAN LEBIH BAIK",
          "“Hakim seorang yang berdisiplin kerana dia datang awal setiap hari untuk berlatih.”",
        ),
      ]),
    ]),
    branch("inferens", "Inferens Lemah", [
      branch("inferens-masalah", "Masalah Lazim", [
        node(
          "inferens-tiada-bukti",
          "Tiada Bukti",
          "Inferens dibuat tanpa petunjuk daripada teks.",
        ),
        node(
          "inferens-terlalu-jauh",
          "Terlalu Jauh",
          "Kesimpulan melebihi perkara yang boleh disokong.",
        ),
        node(
          "inferens-kabur",
          "Terlalu Kabur",
          "Inferens tidak menyatakan sifat atau kesimpulan yang jelas.",
        ),
        node(
          "inferens-konteks",
          "Konteks Diabaikan",
          "Memilih satu kemungkinan tanpa menilai petunjuk sekeliling.",
        ),
      ]),
      branch("inferens-contoh", "SALAH → BETUL", [
        node("inferens-bukti", "Bukti", "Ali mengulang kaji setiap malam."),
        node("inferens-salah", "SALAH", "“Ali seorang genius.”"),
        node(
          "inferens-kenapa",
          "KENAPA SALAH",
          "Belajar secara tetap tidak membuktikan bahawa seseorang itu genius.",
        ),
        node(
          "inferens-betul",
          "BETUL",
          "“Ali seorang yang rajin kerana dia mengulang kaji setiap malam.”",
        ),
        node("inferens-had", "Had Inferens", "INFERENS tidak boleh melebihi BUKTI."),
      ]),
    ]),
    branch("hujah", "Hujah Tidak Logik", [
      node(
        "hujah-prinsip",
        "Hubungan Mesti Munasabah",
        "Dakwaan dan alasan perlu bersambung secara logik: TINDAKAN → KESAN LOGIK.",
      ),
      branch("hujah-contoh", "SALAH → BETUL", [
        node(
          "hujah-salah",
          "SALAH",
          "“Sekolah perlu menanam lebih banyak pokok supaya semua murid mendapat keputusan cemerlang.”",
        ),
        node(
          "hujah-kenapa",
          "KENAPA SALAH",
          "Tiada hubungan sebab-akibat yang munasabah antara tindakan dengan hasil tersebut.",
        ),
        node(
          "hujah-betul",
          "BETUL",
          "“Sekolah boleh menanam lebih banyak pokok untuk mewujudkan persekitaran yang lebih nyaman dan hijau.”",
        ),
        node(
          "hujah-baik",
          "KENAPA LEBIH BAIK",
          "Kesan yang diberikan berkaitan secara langsung dengan tindakan.",
        ),
      ]),
    ]),
    branch("kbat", "KBAT Tidak Relevan", [
      node(
        "kbat-rangka",
        "Rangka Relevan",
        "ISU → IDEA → ALASAN → KESAN. Jawapan positif masih salah jika tidak berkaitan dengan isu.",
      ),
      branch("kbat-contoh", "SALAH → BETUL", [
        node("kbat-soalan", "Soalan", "“Cadangkan cara mengurangkan penggunaan plastik.”"),
        node("kbat-salah", "SALAH", "“Murid perlu belajar bersungguh-sungguh.”"),
        node("kbat-kenapa", "KENAPA SALAH", "Cadangan tidak menangani penggunaan plastik."),
        node(
          "kbat-betul",
          "BETUL",
          "“Murid boleh membawa botol dan bekas makanan guna semula supaya penggunaan plastik sekali guna dapat dikurangkan.”",
        ),
      ]),
    ]),
    branch("frasa", "Maksud Frasa Salah", [
      branch("frasa-punca", "Kesalahan Lazim", [
        node(
          "frasa-perkataan",
          "Terjemah Satu demi Satu",
          "Maksud keseluruhan frasa tidak semestinya sama dengan gabungan maksud setiap perkataan.",
        ),
        node("frasa-konteks", "Konteks Diabaikan", "Maksud perlu sesuai dengan ayat dan petikan."),
        node(
          "frasa-literal",
          "Kiasan Dianggap Harfiah",
          "Bahasa kiasan tidak boleh ditafsir secara literal.",
        ),
        node(
          "frasa-sinonim",
          "Sinonim Tidak Tepat",
          "Perkataan ganti mesti memelihara maksud dalam konteks.",
        ),
        node("frasa-ulang", "Frasa Asal Diulang", "Mengulang frasa belum menjelaskan maksudnya."),
      ]),
      branch("frasa-contoh", "SALAH → BETUL", [
        node("frasa-ayat", "Ayat", "“Program itu membuka mata masyarakat.”"),
        node("frasa-salah", "SALAH", "“Masyarakat membuka mata.”"),
        node("frasa-betul", "BETUL", "“Program itu memberikan kesedaran kepada masyarakat.”"),
        node("frasa-proses", "Proses", "FRASA → KONTEKS → MAKSUD → GANTI → SEMAK."),
      ]),
    ]),
    branch("sintesis", "Sintesis Lemah", [
      branch("sintesis-contoh", "SALAH → BETUL", [
        node(
          "sintesis-salah",
          "SALAH",
          "“Bahan 1 kata bersenam. Bahan 2 kata tidur. Bahan 3 kata makan.”",
        ),
        node("sintesis-kenapa", "KENAPA SALAH", "Idea hanya disenaraikan dan belum dihubungkan."),
        node(
          "sintesis-betul",
          "BETUL",
          "“Gaya hidup sihat memerlukan gabungan aktiviti fizikal, tidur yang mencukupi dan pemakanan seimbang.”",
        ),
        node(
          "sintesis-baik",
          "KENAPA LEBIH BAIK",
          "Jawapan membina satu idea menyeluruh: SINTESIS = HUBUNG + GABUNG, bukan sekadar SENARAI.",
        ),
      ]),
    ]),
    branch("fakta", "Fakta Berubah", [
      node(
        "fakta-prinsip",
        "Parafrasa Mesti Setia",
        "Mengolah ayat tidak boleh mengubah kuantiti, kepastian, subjek, sebab, kesan, masa atau tempat.",
      ),
      branch("fakta-contoh", "Perubahan yang Salah", [
        node(
          "fakta-kuantiti",
          "Kuantiti",
          "ASAL: “Sebahagian murid menghadapi masalah tidur.” SALAH: “Semua murid mengalami masalah tidur.”",
        ),
        node("fakta-pasti", "Kepastian", "ASAL: “Mungkin berlaku.” SALAH: “Pasti berlaku.”"),
        node(
          "fakta-kesan",
          "Kesan",
          "ASAL: “Boleh membantu.” SALAH: “Akan menyelesaikan sepenuhnya.”",
        ),
      ]),
      node(
        "fakta-check",
        "Semak Fakta",
        "Periksa kuantiti, kepastian, subjek, sebab, kesan, masa dan tempat.",
      ),
    ]),
    branch("lengkap", "Jawapan Tidak Lengkap", [
      node(
        "lengkap-prinsip",
        "Ayat Lengkap Lebih Jelas",
        "Sampaikan jawapan dalam ayat yang jelas dan tepat mengikut kehendak soalan.",
      ),
      branch("lengkap-membaca", "Contoh: Mengapakah?", [
        node("lengkap-membaca-soalan", "Soalan", "“Mengapakah amalan membaca penting?”"),
        node("lengkap-membaca-lemah", "LEMAH", "“Tambah ilmu.”"),
        node(
          "lengkap-membaca-betul",
          "LEBIH BAIK",
          "“Amalan membaca penting kerana dapat menambah ilmu pengetahuan.”",
        ),
      ]),
      branch("lengkap-bersih", "Contoh: Bagaimanakah?", [
        node("lengkap-bersih-soalan", "Soalan", "“Bagaimanakah murid boleh menjaga kebersihan?”"),
        node("lengkap-bersih-lemah", "LEMAH", "“Gotong-royong.”"),
        node(
          "lengkap-bersih-betul",
          "LEBIH BAIK",
          "“Murid boleh menjaga kebersihan dengan menyertai aktiviti gotong-royong.”",
        ),
      ]),
    ]),
    branch("bahasa", "Bahasa Tidak Gramatis", [
      node(
        "bahasa-ringkas",
        "Semakan Praktikal",
        "Semak cebisan ayat, imbuhan, ejaan, tanda baca, kata ganti nama, kata sendi dan susunan perkataan. Fokusnya ialah kejelasan jawapan pemahaman.",
      ),
      branch("bahasa-contoh", "SALAH → BETUL", [
        node(
          "bahasa-cebisan",
          "Cebisan Ayat",
          "SALAH: “Kerana untuk menjaga kesihatan.” BETUL: “Murid perlu bersenam untuk menjaga kesihatan.”",
        ),
        node("bahasa-ejaan", "Ejaan dan Jarak", "SALAH: “diSekolah” BETUL: “di sekolah”."),
      ]),
    ]),
    branch("semak-fokus", "Semakan Fokus", [
      branch("semak-fokus-soalan", "FOKUS CHECK", [
        node("semak-fokus-kata", "Apa Kata Tugas?", "Kenal pasti tindakan yang perlu dilakukan."),
        node("semak-fokus-apa", "Apakah Fokus?", "Bezakan tema umum daripada fokus khusus."),
        node("semak-fokus-bilangan", "Berapa Isi Diminta?", "Patuhi bilangan isi yang dinyatakan."),
        node(
          "semak-fokus-semua",
          "Semua Bahagian Dijawab?",
          "Semak setiap subsoalan sebelum selesai.",
        ),
      ]),
      node(
        "semak-fokus-aliran",
        "Aliran Semakan",
        "Kata tugas ↓ Tema ↓ Fokus ↓ Bilangan isi ↓ Jawapan.",
      ),
      node(
        "semak-fokus-amaran",
        "Jangan Tersasar",
        "Jika soalan meminta dua sebab, jangan berikan tiga kesan.",
      ),
    ]),
    branch("semak-bukti", "Semakan Bukti", [
      node("semak-bukti-tepat", "Tepat", "Adakah bukti sepadan dengan teks?"),
      node("semak-bukti-relevan", "Relevan", "Adakah bukti menyokong jawapan?"),
      node("semak-bukti-cukup", "Cukup", "Adakah sokongan yang diberikan memadai?"),
      node("semak-bukti-3b", "3B", "Bukti Betul • Bukti Berkaitan • Bukti Bersesuaian."),
      node(
        "semak-bukti-kualiti",
        "Kualiti Mengatasi Kuantiti",
        "Lebih banyak bukti tidak semestinya lebih baik; pilih bukti yang paling relevan dan mencukupi.",
      ),
    ]),
    branch("semak-logik", "Semakan Logik", [
      node("semak-logik-sebab", "Sebab → Kesan", "Adakah kesan benar-benar mengikuti sebab?"),
      node("semak-logik-dakwaan", "Dakwaan → Alasan", "Adakah alasan menyokong dakwaan?"),
      node(
        "semak-logik-masalah",
        "Masalah → Penyelesaian",
        "Adakah penyelesaian menangani masalah?",
      ),
      node("semak-logik-inferens", "Inferens → Bukti", "Adakah bukti menyokong inferens?"),
      node(
        "semak-logik-ramalan",
        "Ramalan → Konteks",
        "Adakah ramalan munasabah berdasarkan situasi?",
      ),
      node("semak-logik-tanya", "Ujian Akhir", "Tanya: “Masuk akal atau tidak?”"),
    ]),
    branch("semak-bahasa", "Semakan Bahasa", [
      branch("semak-bahasa-check", "BAHASA CHECK", [
        node("semak-bahasa-b", "B — Binaan Ayat", "Pastikan binaan ayat teratur."),
        node("semak-bahasa-a1", "A — Ayat Lengkap", "Elakkan cebisan ayat."),
        node("semak-bahasa-h", "H — Huruf dan Ejaan", "Semak huruf, ejaan dan tanda baca."),
        node("semak-bahasa-a2", "A — Arti Tepat", "Pastikan maksud dan fakta tidak berubah."),
        node("semak-bahasa-s", "S — Susunan Jelas", "Susun idea supaya mudah difahami."),
        node(
          "semak-bahasa-a3",
          "A — Akhir Sekali Baca Semula",
          "Baca semula jawapan untuk mengesan kesilapan terakhir.",
        ),
      ]),
      node(
        "semak-bahasa-ingat",
        "Alat Ingatan",
        "BAHASA ialah bantuan ingatan, bukan formula peperiksaan yang kaku.",
      ),
    ]),
    branch("uasa", "Tip UASA", [
      branch("uasa-rutin", "Rutin Menjawab", [
        node("uasa-baca", "1. BACA", "Baca soalan dengan teliti."),
        node("uasa-fokus", "2. FOKUS", "Kenal pasti perkara yang dikehendaki."),
        node("uasa-cari", "3. CARI", "Cari bukti yang berkaitan."),
        node(
          "uasa-fikir",
          "4. FIKIR",
          "Tentukan sama ada jawapan memerlukan tersurat, tersirat, KBAT atau sintesis.",
        ),
        node("uasa-jawab", "5. JAWAB", "Tulis dengan jelas."),
        node("uasa-uji", "6. UJI", "Semak bukti dan hubungan logik."),
        node("uasa-semak", "7. SEMAK", "Semak bahasa dan kelengkapan."),
      ]),
      branch("uasa-semak-master", "S-E-M-A-K", [
        node("uasa-s", "S — Soalan Difahami", "Kata tugas, fokus dan bilangan isi dikenal pasti."),
        node("uasa-e", "E — Evidens / Bukti Tepat", "Bukti benar-benar menyokong jawapan."),
        node("uasa-m", "M — Maksud Tidak Berubah", "Fakta dan tahap kepastian dikekalkan."),
        node("uasa-a", "A — Ayat Gramatis", "Jawapan lengkap dan jelas."),
        node("uasa-k", "K — Kesemua Bahagian Dijawab", "Tiada subsoalan tertinggal."),
      ]),
      branch("uasa-bersama", "Semak Jawapan Bersama", [
        node(
          "uasa-bersama-petikan",
          "PETIKAN",
          "“Sekolah melaksanakan kempen membawa botol minuman guna semula. Selepas beberapa minggu, jumlah botol plastik yang dibuang semakin berkurang. Murid juga mula mengingatkan rakan mereka supaya mengurangkan penggunaan plastik sekali guna.”",
        ),
        node(
          "uasa-bersama-soalan",
          "SOALAN",
          "“Apakah yang dapat disimpulkan tentang kempen tersebut?”",
        ),
        node("uasa-bersama-lemah", "JAWAPAN LEMAH", "“Kempen itu tentang botol.”"),
        node(
          "uasa-bersama-diagnosis",
          "KENAPA LEMAH",
          "Jawapan terlalu kabur, tidak membentuk inferens dan tidak menggunakan bukti.",
        ),
        node(
          "uasa-bersama-betul",
          "JAWAPAN LEBIH BAIK",
          "“Kempen tersebut berjaya meningkatkan kesedaran murid tentang pengurangan penggunaan plastik kerana jumlah botol plastik yang dibuang semakin berkurang dan murid mula mengingatkan rakan mereka.”",
        ),
        branch("uasa-bersama-check", "CHECK", [
          node("uasa-bersama-fokus", "✓ Fokus", "Kesimpulan menjawab perkara yang ditanya."),
          node(
            "uasa-bersama-inferens",
            "✓ Inferens",
            "Jawapan menyimpulkan kejayaan dan peningkatan kesedaran.",
          ),
          node("uasa-bersama-bukti", "✓ Bukti", "Dua petunjuk daripada petikan digunakan."),
          node("uasa-bersama-logik", "✓ Logik", "Bukti menyokong kesimpulan."),
          node(
            "uasa-bersama-gramatis",
            "✓ Tatabahasa",
            "Jawapan ditulis sebagai ayat yang lengkap dan jelas.",
          ),
          node("uasa-bersama-fakta", "✓ Fakta Kekal", "Kesimpulan tidak melampaui sumber."),
        ]),
        node(
          "uasa-bersama-kuat",
          "KENAPA INI LEBIH KUAT",
          "Jawapan menepati soalan, membentuk kesimpulan, menggunakan dua petunjuk, kekal dalam batas sumber dan menggunakan ayat lengkap.",
        ),
      ]),
      node(
        "uasa-tiada-formula",
        "Tiada Formula Jaminan",
        "Panjang jawapan, bilangan ayat, masa dan bentuk respons bergantung pada soalan. Utamakan ketepatan, relevansi dan kejelasan.",
      ),
    ]),
  ],
};
