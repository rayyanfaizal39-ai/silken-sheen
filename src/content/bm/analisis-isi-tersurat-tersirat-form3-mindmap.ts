import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-analisis-isi-tersurat-tersirat";

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

export const bahasaMelayuTingkatan3TersuratTersiratMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "TERSURAT & TERSIRAT",
  summary:
    "Analisis yang baik membezakan maklumat yang dinyatakan secara langsung daripada maklumat yang perlu disimpulkan melalui petunjuk, hubungan idea dan bukti dalam petikan.",
  children: [
    branch("bezakan", "Bezakan Kedua-duanya", [
      branch("bezakan-tersurat", "Isi Tersurat", [
        node("bezakan-tersurat-maksud", "Maksud", "Maklumat dinyatakan secara langsung."),
        node(
          "bezakan-tersurat-contoh",
          "Contoh",
          "‘Azman menyertai pertandingan pidato pada hari Sabtu.’",
        ),
        node(
          "bezakan-tersurat-jawapan",
          "Tersurat",
          "Azman menyertai pertandingan pidato pada hari Sabtu.",
        ),
      ]),
      branch("bezakan-tersirat", "Isi Tersirat", [
        node("bezakan-tersirat-maksud", "Maksud", "Maklumat perlu disimpulkan daripada petunjuk."),
        node(
          "bezakan-tersirat-contoh",
          "Contoh",
          "‘Azman berlatih setiap petang selama dua minggu sebelum pertandingan.’",
        ),
        node(
          "bezakan-tersirat-jawapan",
          "Inferens Mungkin",
          "Azman seorang yang rajin dan bersungguh-sungguh.",
        ),
      ]),
      branch("bezakan-ringkas", "Perbezaan Ringkas", [
        node(
          "bezakan-ringkas-tersurat",
          "TERSURAT → CARI",
          "Boleh ditunjukkan secara terus dalam teks.",
        ),
        node(
          "bezakan-ringkas-tersirat",
          "TERSIRAT → FIKIR + BUKTI",
          "Perlu dibuktikan melalui petunjuk.",
        ),
      ]),
      node(
        "bezakan-nota",
        "Nota Penting",
        "Bukan setiap soalan ‘mengapa’ bersifat tersirat. Jika sebab dinyatakan secara langsung, jawapannya masih tersurat.",
      ),
    ]),
    branch("cari-tersurat", "Cari Isi Tersurat", [
      branch("cari-tersurat-langkah", "Enam Langkah", [
        node("cari-tersurat-1", "1. Kenal Pasti Kata Tugas", "Tentukan tindakan yang diminta."),
        node("cari-tersurat-2", "2. Cari Kata Kunci", "Tandakan subjek dan fokus soalan."),
        node("cari-tersurat-3", "3. Jejak Lokasi", "Cari bahagian berkaitan dalam petikan."),
        node("cari-tersurat-4", "4. Baca Ayat Penuh", "Fahami maklumat dalam konteksnya."),
        node("cari-tersurat-5", "5. Pilih Maklumat Tepat", "Ambil isi yang benar-benar menjawab."),
        node("cari-tersurat-6", "6. Semak Bilangan Isi", "Pastikan jumlah isi menepati arahan."),
      ]),
      branch("cari-tersurat-contoh", "Contoh Program", [
        node(
          "cari-tersurat-petikan",
          "Petikan",
          "‘Program itu bertujuan meningkatkan kesedaran alam sekitar dan menggalakkan amalan kitar semula.’",
        ),
        node("cari-tersurat-soalan", "Soalan", "‘Nyatakan dua tujuan program tersebut.’"),
        node("cari-tersurat-jawapan-1", "Jawapan 1", "Meningkatkan kesedaran alam sekitar."),
        node("cari-tersurat-jawapan-2", "Jawapan 2", "Menggalakkan amalan kitar semula."),
      ]),
      node(
        "cari-tersurat-amaran",
        "Kekal pada Teks",
        "Jangan tambah idea luar walaupun idea itu berkaitan dengan tema petikan.",
      ),
    ]),
    branch("petunjuk", "Cari Petunjuk Tersirat", [
      branch("petunjuk-jenis", "Jenis Petunjuk", [
        node("petunjuk-tindakan", "Tindakan", "Perbuatan watak atau pihak."),
        node("petunjuk-dialog", "Dialog", "Kata-kata dan cara sesuatu diucapkan."),
        node("petunjuk-reaksi", "Reaksi", "Respons terhadap peristiwa atau orang lain."),
        node("petunjuk-perubahan", "Perubahan", "Perbezaan keadaan sebelum dan selepas."),
        node("petunjuk-suasana", "Suasana", "Keadaan yang membentuk maksud peristiwa."),
        node("petunjuk-banding", "Perbandingan", "Persamaan atau perbezaan yang signifikan."),
        node("petunjuk-akibat", "Akibat", "Hasil yang menunjukkan punca atau implikasi."),
        node("petunjuk-ulang", "Pengulangan Idea", "Idea berulang yang menguatkan fokus."),
      ]),
      branch("petunjuk-lina", "Contoh Lina", [
        node(
          "petunjuk-lina-ayat",
          "Ayat",
          "‘Lina berdiam diri, menundukkan kepala dan mengelakkan pandangan rakannya.’",
        ),
        node(
          "petunjuk-lina-inferens",
          "Inferens Mungkin",
          "Lina mungkin berasa malu, sedih atau bersalah, bergantung pada konteks sekeliling.",
        ),
      ]),
      node(
        "petunjuk-semak",
        "Satu Petunjuk Mungkin Tidak Cukup",
        "Baca maklumat berdekatan sebelum memilih inferens; idea yang tidak dinyatakan bukan secara automatik betul.",
      ),
    ]),
    branch("hubung-ayat", "Hubungkan Ayat", [
      node(
        "hubung-ayat-prinsip",
        "Jangan Asingkan Ayat",
        "Jawapan mungkin memerlukan hubungan antara dua atau lebih ayat.",
      ),
      branch("hubung-ayat-contoh", "Ayat A + Ayat B = Kesimpulan", [
        node("hubung-ayat-a", "Ayat A", "‘Program membaca mendapat sambutan baik.’"),
        node("hubung-ayat-b", "+ Ayat B", "‘Jumlah peserta meningkat setiap minggu.’"),
        node("hubung-ayat-hasil", "= Kesimpulan", "Program tersebut semakin diminati."),
      ]),
      node(
        "hubung-ayat-uji",
        "Uji Hubungan",
        "Pastikan kedua-dua ayat menyokong kesimpulan yang sama dan bukan sekadar berkongsi tema.",
      ),
    ]),
    branch("hubung-perenggan", "Hubungkan Perenggan", [
      node(
        "hubung-perenggan-prinsip",
        "Cari Merentas Petikan",
        "Murid Tingkatan 3 mungkin perlu menggabungkan bukti daripada perenggan yang berlainan.",
      ),
      branch("hubung-perenggan-nadia", "Contoh Nadia", [
        node("hubung-perenggan-p1", "Perenggan 1", "Nadia kerap berlatih berucap di khalayak."),
        node(
          "hubung-perenggan-p4",
          "Perenggan 4",
          "Nadia mewakili sekolah dalam pertandingan dengan penuh keyakinan.",
        ),
        node(
          "hubung-perenggan-hasil",
          "Inferens",
          "Latihan telah membantu Nadia membina keyakinan.",
        ),
      ]),
      branch("hubung-perenggan-langkah", "Cara Mensintesis", [
        node("hubung-perenggan-cari", "Cari Lebih Luas", "Jangan berhenti pada satu perenggan."),
        node(
          "hubung-perenggan-ulang",
          "Kesan Idea Berkaitan",
          "Jejak idea yang berulang atau bersambung.",
        ),
        node(
          "hubung-perenggan-tapis",
          "Tapis Butiran",
          "Abaikan maklumat yang tidak menyokong fokus.",
        ),
        node(
          "hubung-perenggan-bina",
          "Bina Kesimpulan",
          "Gabungkan hanya bukti yang berkaitan secara logik.",
        ),
      ]),
    ]),
    branch("sebab-kesan", "Sebab dan Kesan", [
      branch("sebab-kesan-tersurat", "Hubungan Tersurat", [
        node(
          "sebab-kesan-tersurat-ayat",
          "Ayat",
          "‘Hujan lebat menyebabkan jalan raya dinaiki air.’",
        ),
        node("sebab-kesan-tersurat-sebab", "Sebab", "Hujan lebat."),
        node("sebab-kesan-tersurat-kesan", "Kesan", "Jalan raya dinaiki air."),
      ]),
      branch("sebab-kesan-tersirat", "Hubungan Tersirat", [
        node(
          "sebab-kesan-tersirat-ayat",
          "Petunjuk",
          "‘Beberapa longkang tersumbat. Tidak lama kemudian, kawasan perumahan mula dinaiki air.’",
        ),
        node(
          "sebab-kesan-tersirat-hasil",
          "Inferens Mungkin",
          "Longkang tersumbat menyumbang kepada berlakunya banjir.",
        ),
      ]),
      branch("sebab-kesan-rantaian", "Rantaian A → B → C", [
        node("sebab-kesan-a", "A — Kurang Tidur", "Punca awal."),
        node("sebab-kesan-b", "→ B — Hilang Tumpuan", "Kesan pertama dan punca seterusnya."),
        node("sebab-kesan-c", "→ C — Prestasi Terjejas", "Kesan lanjutan."),
      ]),
      node(
        "sebab-kesan-fokus",
        "Ikut Fokus Soalan",
        "Kenal pasti bahagian rantaian yang ditanya dan jangan terbalikkan arah sebab dengan kesan.",
      ),
    ]),
    branch("sikap-niat", "Sikap dan Niat", [
      branch("sikap-niat-petunjuk", "Apa yang Dapat Dikesan?", [
        node("sikap-disiplin", "Disiplin", "Tindakan teratur dan konsisten."),
        node("sikap-tanggungjawab", "Tanggungjawab", "Melaksanakan kewajipan dengan baik."),
        node("sikap-jujur", "Kejujuran", "Bertindak benar walaupun tanpa pengawasan."),
        node("sikap-tekad", "Keazaman", "Terus berusaha menghadapi cabaran."),
        node("sikap-prihatin", "Keprihatinan", "Mengambil berat tentang orang atau keadaan."),
        node(
          "sikap-mementingkan",
          "Mementingkan Diri",
          "Mengutamakan diri hingga mengabaikan orang lain.",
        ),
        node("sikap-niat-tujuan", "Niat", "Tujuan yang dapat disokong oleh tindakan dan konteks."),
      ]),
      branch("sikap-farid", "Contoh Farid", [
        node(
          "sikap-farid-ayat",
          "Ayat",
          "‘Farid memulangkan wang yang ditemukannya walaupun tiada sesiapa melihat.’",
        ),
        node("sikap-farid-sikap", "Sikap", "Farid seorang yang jujur."),
        node("sikap-farid-niat", "Niat Mungkin", "Dia mahu melakukan perkara yang betul."),
      ]),
      node(
        "sikap-had",
        "Had Inferens",
        "Bezakan kesimpulan yang kuat daripada spekulasi; jangan mereka niat khusus tanpa petunjuk yang mencukupi.",
      ),
    ]),
    branch("perasaan", "Perasaan dan Reaksi", [
      branch("perasaan-petunjuk", "Petunjuk Perasaan", [
        node("perasaan-wajah", "Riak Wajah", "Ekspresi yang mengiringi situasi."),
        node("perasaan-gerak", "Pergerakan", "Gerak tubuh atau tindakan spontan."),
        node("perasaan-nada", "Nada", "Cara kata-kata disampaikan."),
        node("perasaan-kata", "Kata-kata", "Pilihan ungkapan watak."),
        node("perasaan-reaksi", "Reaksi", "Respons sebelum atau selepas peristiwa."),
      ]),
      branch("perasaan-contoh", "Contoh Berubah Mengikut Konteks", [
        node(
          "perasaan-ayat-1",
          "Petunjuk Awal",
          "‘Tangannya menggigil ketika namanya dipanggil.’ — perasaan mungkin gugup atau takut.",
        ),
        node(
          "perasaan-ayat-2",
          "Petunjuk Seterusnya",
          "‘Dia tersenyum apabila menerima hadiah.’ — emosi keseluruhan berubah.",
        ),
      ]),
      node(
        "perasaan-konteks",
        "Gunakan Konteks Penuh",
        "Jangan meneka emosi dengan bebas atau memilih perasaan yang terlalu umum apabila petikan memberikan petunjuk lebih tepat.",
      ),
    ]),
    branch("nilai", "Nilai dan Pengajaran", [
      node("nilai-maksud", "Nilai", "Sifat positif yang ditunjukkan melalui tindakan."),
      node(
        "nilai-pengajaran-maksud",
        "Pengajaran",
        "Pelajaran atau tingkah laku yang patut diikuti.",
      ),
      branch("nilai-sara", "Contoh Sara", [
        node("nilai-sara-situasi", "Situasi", "Sara terus membantu ibunya walaupun berasa letih."),
        node("nilai-sara-nilai", "Nilai", "Tanggungjawab atau kasih sayang."),
        node(
          "nilai-sara-pengajaran",
          "Pengajaran",
          "Kita hendaklah membantu keluarga dan melaksanakan tanggungjawab dengan baik.",
        ),
      ]),
      node(
        "nilai-bukti",
        "Buktikan dengan Peristiwa",
        "Nilai positif tidak boleh dipilih secara rawak; padankan jawapan dengan peristiwa sebenar dalam petikan.",
      ),
    ]),
    branch("inferens-berlapis", "Inferens Berlapis", [
      node(
        "inferens-berlapis-maksud",
        "Kemahiran Tingkatan 3",
        "Bergerak melalui beberapa langkah penaakulan sambil mengekalkan sokongan logik.",
      ),
      branch("inferens-berlapis-contoh", "Petunjuk → Inferens → Kesimpulan", [
        node("inferens-berlapis-1", "Petunjuk 1", "Murid jarang menggunakan perpustakaan."),
        node(
          "inferens-berlapis-2",
          "Petunjuk 2",
          "Sekolah memperkenalkan aktiviti bacaan interaktif.",
        ),
        node("inferens-berlapis-3", "Petunjuk 3", "Kehadiran ke perpustakaan kemudian meningkat."),
        node("inferens-berlapis-segera", "Inferens Segera", "Aktiviti baharu menarik minat murid."),
        node(
          "inferens-berlapis-luas",
          "Kesimpulan Lebih Luas",
          "Program yang lebih menarik dapat meningkatkan minat membaca.",
        ),
      ]),
      node(
        "inferens-berlapis-amaran",
        "Jangan Melompat",
        "Kesimpulan luas mesti dapat dijejak kembali kepada petunjuk dan inferens segera; pendapat peribadi bukan pengganti bukti.",
      ),
    ]),
    branch("bukti", "Sokong dengan Bukti", [
      branch("bukti-rumus", "Inferens + Bukti", [
        node("bukti-inferens", "Inferens", "Ravi seorang yang bertanggungjawab."),
        node("bukti-sokongan", "+ Bukti", "Dia menyiapkan tugasan sebelum membantu rakannya."),
        node(
          "bukti-jawapan",
          "Jawapan Lengkap",
          "Ravi seorang yang bertanggungjawab kerana dia menyiapkan tugasan sebelum membantu rakannya.",
        ),
      ]),
      node("bukti-kuat", "Bukti Kuat", "Bukti yang menyokong inferens secara langsung dan khusus."),
      node(
        "bukti-lemah",
        "Bukti Lemah",
        "Maklumat yang berkaitan tetapi tidak membuktikan inferens.",
      ),
      node(
        "bukti-pilih",
        "Pilih Secukupnya",
        "Jangan salin seluruh perenggan; gunakan bahagian tepat yang membuktikan jawapan.",
      ),
    ]),
    branch("bina", "Bina Jawapan", [
      branch("bina-struktur", "Struktur Mengikut Soalan", [
        node("bina-tersurat", "Tersurat", "Berikan maklumat tepat yang diminta."),
        node("bina-tersirat", "Tersirat", "Nyatakan inferens dan bukti."),
        node("bina-sikap", "Sikap", "Nyatakan sifat dan tindakan yang membuktikannya."),
        node("bina-perasaan", "Perasaan", "Nyatakan perasaan dan petunjuk konteks."),
        node(
          "bina-pengajaran",
          "Pengajaran",
          "Gunakan ‘Kita hendaklah…’ diikuti tingkah laku yang sesuai apabila bentuk itu menepati soalan.",
        ),
        node("bina-sebab", "Sebab atau Kesan", "Nyatakan hubungan tepat yang diminta."),
      ]),
      branch("bina-contoh", "Daripada Lemah kepada Tepat", [
        node("bina-lemah", "Jawapan Lemah", "‘Dia rajin.’"),
        node(
          "bina-baik",
          "Jawapan Lebih Baik",
          "‘Amir seorang yang rajin kerana dia mengulang kaji pelajaran setiap malam.’",
        ),
      ]),
      node(
        "bina-fleksibel",
        "Struktur Fleksibel",
        "Pilih struktur yang menepati kata tugas. Tidak setiap soalan memerlukan formula yang sama dan jawapan lebih panjang tidak semestinya lebih kuat.",
      ),
    ]),
    branch("banding", "Banding Jawapan", [
      branch("banding-amir", "Perbandingan 1 — Sikap Amir", [
        node("banding-amir-soalan", "Soalan", "‘Apakah sikap Amir?’"),
        node("banding-amir-lemah", "Lemah", "‘Amir belajar.’"),
        node(
          "banding-amir-lemah-sebab",
          "Mengapa Lemah?",
          "Jawapan hanya menyatakan tindakan dan belum membuat inferens tentang sikap.",
        ),
        node(
          "banding-amir-kuat",
          "Kuat",
          "‘Amir seorang yang rajin kerana dia belajar secara konsisten setiap malam.’",
        ),
        node(
          "banding-amir-kuat-sebab",
          "Mengapa Lebih Kuat?",
          "Jawapan menggabungkan inferens dengan bukti yang khusus.",
        ),
      ]),
      branch("banding-aktiviti", "Perbandingan 2 — Kesan Aktiviti", [
        node("banding-aktiviti-soalan", "Soalan", "‘Apakah kesan aktiviti tersebut?’"),
        node("banding-aktiviti-lemah", "Lemah", "‘Aktiviti itu bagus.’"),
        node(
          "banding-aktiviti-lemah-sebab",
          "Mengapa Lemah?",
          "Penilaian terlalu umum dan tidak menyatakan kesan sebenar.",
        ),
        node(
          "banding-aktiviti-kuat",
          "Kuat",
          "‘Aktiviti tersebut dapat meningkatkan kerjasama antara murid kerana mereka perlu melaksanakan tugasan secara berkumpulan.’",
        ),
        node(
          "banding-aktiviti-kuat-sebab",
          "Mengapa Lebih Kuat?",
          "Kesan dinyatakan dengan tepat dan hubungannya dijelaskan melalui bukti situasi.",
        ),
      ]),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-salin",
        "Salin Tanpa Inferens",
        "Menyalin ayat apabila soalan meminta kesimpulan.",
      ),
      node("kesalahan-tiada-bukti", "Inferens Tanpa Bukti", "Membuat dakwaan tanpa asas teks."),
      node(
        "kesalahan-satu",
        "Satu Petunjuk Sahaja",
        "Membuat keputusan sebelum membaca maklumat lain.",
      ),
      node("kesalahan-sekitar", "Abaikan Ayat Sekitar", "Kehilangan konteks yang mengubah maksud."),
      node("kesalahan-sebab", "Salah Sebab dan Kesan", "Membalikkan atau melangkau hubungan."),
      node("kesalahan-nilai", "Nilai Tidak Sesuai", "Memilih sifat positif yang tidak dibuktikan."),
      node(
        "kesalahan-campur",
        "Nilai dan Pengajaran Bercampur",
        "Tidak membezakan sifat daripada pelajaran.",
      ),
      node(
        "kesalahan-perasaan",
        "Perasaan Terlalu Umum",
        "Tidak menggunakan petunjuk emosi yang tepat.",
      ),
      node("kesalahan-reka", "Fakta Direka", "Menambah maklumat yang tiada dalam petikan."),
      node("kesalahan-jauh", "Kesimpulan Terlalu Jauh", "Melebihi perkara yang dapat disokong."),
      node(
        "kesalahan-panjang",
        "Panjang tetapi Tidak Fokus",
        "Menulis banyak tanpa menjawab kehendak.",
      ),
      node("kesalahan-ubah", "Fakta Berubah", "Mengubah maksud asal ketika mengolah bahasa."),
    ]),
    branch("uasa", "Tip UASA", [
      branch("uasa-langkah", "Semak Sebelum Menjawab", [
        node("uasa-kata", "Baca Kata Tugas", "Tentukan perkara yang perlu dilakukan."),
        node("uasa-jenis", "Tentukan Jenis", "Bezakan jawapan tersurat daripada tersirat."),
        node("uasa-petunjuk", "Cari Petunjuk", "Gunakan lebih daripada satu petunjuk jika perlu."),
        node("uasa-sekitar", "Baca Sekitar", "Semak ayat dan perenggan berkaitan."),
        node("uasa-hubung", "Hubungkan Maklumat", "Cari hubungan yang benar-benar relevan."),
        node("uasa-munasabah", "Bina Inferens Munasabah", "Jangan melampaui bukti."),
        node("uasa-bukti", "Sokong dengan Bukti", "Pilih sokongan yang kuat dan khusus."),
        node("uasa-gramatis", "Jawab Secara Gramatis", "Sampaikan idea dengan jelas."),
        node("uasa-fakta", "Semak Fakta", "Pastikan maklumat asal tidak berubah."),
        node("uasa-fokus", "Semak Fokus", "Pastikan jawapan menepati soalan."),
      ]),
      branch("uasa-tbi", "T-B-I", [
        node("uasa-t", "T — Tanda Petunjuk", "Kenal pasti maklumat yang relevan."),
        node("uasa-b", "B — Bukti", "Pilih asas teks yang menyokong."),
        node("uasa-i", "I — Inferens", "Bina kesimpulan yang munasabah."),
      ]),
      node("uasa-cari", "TERSURAT = CARI", "Jejak jawapan yang dinyatakan dalam teks."),
      node("uasa-fikir", "TERSIRAT = FIKIR + BUKTI", "Simpulkan berdasarkan petunjuk yang sah."),
      node(
        "uasa-nota",
        "Alat Ingatan, Bukan Formula Kaku",
        "Gunakan panduan ini untuk membantu pemikiran sambil tetap mematuhi kata tugas dan konteks sebenar soalan.",
      ),
    ]),
  ],
};
