import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-mengenal-pasti-isi-tersirat";

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

export const bahasaMelayuTingkatan1IsiTersiratMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "ISI TERSIRAT",
  summary:
    "Isi tersirat ialah maklumat yang tidak dinyatakan secara langsung tetapi boleh difahami melalui petunjuk, tindakan, perasaan dan hubungan antara idea dalam petikan.",
  children: [
    branch("apa-itu", "Apa Itu?", [
      node(
        "apa-itu-definisi",
        "Definisi",
        "Isi tersirat ialah maklumat yang tidak dinyatakan secara terus tetapi boleh difahami melalui petunjuk dalam petikan.",
      ),
      node(
        "apa-itu-berfikir",
        "Perlu Berfikir",
        "Murid perlu membaca maklumat, mengenal pasti petunjuk, menghubungkan idea dan membuat kesimpulan yang munasabah.",
      ),
      node(
        "apa-itu-petikan",
        "Berdasarkan Petikan",
        "Walaupun jawapan tidak ditulis secara langsung, jawapan mesti tetap disokong oleh maklumat dalam petikan.",
      ),
      node(
        "apa-itu-bukan-meneka",
        "Bukan Meneka",
        "Inferens yang baik mestilah logik, berkaitan, selaras dengan petikan dan tidak menambah fakta baharu.",
      ),
      branch("apa-itu-contoh", "Contoh Ringkas", [
        node(
          "apa-itu-contoh-petikan",
          "Petikan",
          "“Ali membawa payung sebelum keluar dari rumah. Langit kelihatan gelap dan guruh kedengaran.”",
        ),
        node("apa-itu-contoh-inferens", "Isi Tersirat", "“Hujan mungkin akan turun.”"),
      ]),
    ]),
    branch("tersurat-tersirat", "Tersurat vs Tersirat", [
      branch("banding-tersurat", "Isi Tersurat", [
        node("banding-tersurat-maksud", "Maksud", "Maklumat dinyatakan secara jelas."),
        node("banding-tersurat-contoh", "Contoh", "“Farah menangis kerana kehilangan kucingnya.”"),
        node("banding-tersurat-isi", "Tersurat", "Farah kehilangan kucingnya."),
      ]),
      branch("banding-tersirat", "Isi Tersirat", [
        node("banding-tersirat-maksud", "Maksud", "Maklumat difahami melalui petunjuk."),
        node("banding-tersirat-isi", "Tersirat", "Farah berasa sedih dan sayang akan kucingnya."),
      ]),
      node(
        "banding-utama",
        "Perbezaan Utama",
        "Isi tersurat dinyatakan secara terus, manakala isi tersirat perlu disimpulkan daripada petunjuk.",
      ),
      node(
        "banding-soalan-tersurat",
        "Soalan Tersurat",
        "Lazimnya menggunakan siapa, apa, bila, di mana atau nyatakan.",
      ),
      node(
        "banding-soalan-tersirat",
        "Soalan Tersirat",
        "Lazimnya meminta sebab, kesimpulan, perasaan, nilai, pengajaran atau pendapat berdasarkan petikan.",
      ),
      node(
        "banding-inferens-pendapat",
        "Inferens vs Pendapat",
        "Inferens disimpulkan daripada petunjuk petikan. Pendapat ialah pandangan peribadi yang mesti kekal relevan dan disokong apabila soalan meminta jawapan berdasarkan petikan.",
      ),
      node(
        "banding-nota",
        "Nota",
        "Bukan semua soalan ‘mengapa’ bersifat inferens. Jika sebab dinyatakan secara langsung, jawapannya masih isi tersurat.",
      ),
    ]),
    branch("cari-petunjuk", "Cari Petunjuk", [
      node(
        "petunjuk-perkataan",
        "Perkataan Penting",
        "Cari perkataan yang menunjukkan emosi, tindakan, perubahan, reaksi, sebab atau akibat.",
      ),
      node(
        "petunjuk-tindakan",
        "Tindakan",
        "Tindakan sering menunjukkan tujuan, perwatakan, perasaan atau nilai.",
      ),
      node(
        "petunjuk-dialog",
        "Dialog",
        "Kata-kata watak boleh menunjukkan keprihatinan, kemarahan, ketakutan, keyakinan atau nasihat.",
      ),
      node(
        "petunjuk-keadaan",
        "Keadaan",
        "Gambaran persekitaran boleh menunjukkan suasana, bahaya, kecemasan, kegembiraan atau kesedihan.",
      ),
      node(
        "petunjuk-hubungan",
        "Hubungan Idea",
        "Hubungkan dua atau lebih butiran sebelum membuat kesimpulan.",
      ),
      branch("petunjuk-langkah", "Langkah", [
        node("petunjuk-langkah-1", "Langkah 1", "Baca soalan."),
        node("petunjuk-langkah-2", "Langkah 2", "Cari bahagian petikan yang berkaitan."),
        node("petunjuk-langkah-3", "Langkah 3", "Gariskan petunjuk."),
        node("petunjuk-langkah-4", "Langkah 4", "Tanya perkara yang ditunjukkan oleh petunjuk."),
        node("petunjuk-langkah-5", "Langkah 5", "Bina jawapan yang logik."),
      ]),
      node(
        "petunjuk-bukan-satu",
        "Jangan Guna Satu Petunjuk Sahaja",
        "Baca ayat berdekatan kerana maksud lengkap mungkin tersebar dalam beberapa butiran.",
      ),
    ]),
    branch("tindakan-watak", "Tindakan Watak", [
      branch("tindakan-sikap", "Tindakan Menunjukkan Sikap", [
        node(
          "tindakan-sikap-contoh",
          "Contoh",
          "“Rina membantu jirannya membawa barang tanpa diminta.”",
        ),
        node(
          "tindakan-sikap-inferens",
          "Inferens Munasabah",
          "Rina seorang yang ringan tulang dan prihatin.",
        ),
      ]),
      branch("tindakan-tujuan", "Tindakan Menunjukkan Tujuan", [
        node("tindakan-tujuan-contoh", "Contoh", "“Amir mengulang kaji setiap malam.”"),
        node(
          "tindakan-tujuan-inferens",
          "Inferens Munasabah",
          "Amir mahu memperoleh keputusan yang baik.",
        ),
      ]),
      branch("tindakan-nilai", "Tindakan Menunjukkan Nilai", [
        node("tindakan-nilai-baik", "Membantu", "Menunjukkan sikap baik hati."),
        node("tindakan-nilai-jujur", "Memulangkan Barang", "Menunjukkan kejujuran."),
        node("tindakan-nilai-rajin", "Berlatih Selalu", "Menunjukkan kerajinan."),
        node("tindakan-nilai-rendah", "Meminta Maaf", "Menunjukkan kerendahan hati."),
      ]),
      node(
        "tindakan-bukti",
        "Bukti",
        "Sentiasa kaitkan sifat yang disimpulkan dengan tindakan watak.",
      ),
      node(
        "tindakan-jawapan",
        "Contoh Jawapan",
        "“Rina seorang yang prihatin kerana dia membantu jirannya membawa barang.”",
      ),
      node(
        "tindakan-kesalahan",
        "Kesalahan Lazim",
        "Jangan pilih nilai yang tidak berkaitan dengan tindakan.",
      ),
    ]),
    branch("perasaan-watak", "Perasaan Watak", [
      node(
        "perasaan-petunjuk",
        "Petunjuk Perasaan",
        "Cari ekspresi wajah, tindakan, dialog, reaksi dan nada.",
      ),
      node(
        "perasaan-gembira",
        "Gembira",
        "Petunjuk yang mungkin: tersenyum, ketawa, bersorak atau mengucapkan syukur.",
      ),
      node(
        "perasaan-sedih",
        "Sedih",
        "Petunjuk yang mungkin: menangis, muram, terdiam atau kecewa.",
      ),
      node(
        "perasaan-takut",
        "Takut",
        "Petunjuk yang mungkin: menggigil, bersembunyi, berlari atau suara terketar-ketar.",
      ),
      node(
        "perasaan-risau",
        "Risau",
        "Petunjuk yang mungkin: tidak senang duduk, menunggu dengan cemas atau berulang kali bertanya.",
      ),
      branch("perasaan-contoh", "Contoh", [
        node(
          "perasaan-contoh-petikan",
          "Petikan",
          "“Lina tersenyum lebar apabila namanya diumumkan sebagai pemenang.”",
        ),
        node("perasaan-contoh-inferens", "Inferens", "Lina berasa gembira dan bangga."),
      ]),
      node(
        "perasaan-umum",
        "Jangan Terlalu Umum",
        "Pilih perasaan yang paling sepadan dengan bukti.",
      ),
    ]),
    branch("sebab-akibat", "Sebab dan Akibat", [
      branch("sebab-tersirat", "Sebab Tersirat", [
        node("sebab-tersirat-nota", "Nota", "Kadangkala sebab tidak dinyatakan secara langsung."),
        node(
          "sebab-tersirat-contoh",
          "Contoh",
          "“Jalan raya basah dan beberapa orang membawa payung.”",
        ),
        node("sebab-tersirat-inferens", "Sebab Mungkin", "Hujan telah turun."),
      ]),
      branch("akibat-tersirat", "Akibat Tersirat", [
        node(
          "akibat-tersirat-contoh",
          "Contoh",
          "“Amir tidak mengulang kaji dan kelihatan kecewa selepas menerima keputusan.”",
        ),
        node(
          "akibat-tersirat-inferens",
          "Akibat Mungkin",
          "Amir memperoleh keputusan yang kurang baik.",
        ),
      ]),
      node(
        "sebab-hubung",
        "Hubungkan Maklumat",
        "Tanya perkara yang berlaku dahulu, perkara yang berlaku kemudian, punca yang mungkin dan kesan yang mungkin.",
      ),
      node(
        "sebab-penanda",
        "Gunakan Penanda",
        "Contohnya: hal ini mungkin berlaku kerana, kesannya, oleh sebab itu dan berdasarkan keadaan tersebut.",
      ),
      node(
        "sebab-jangan-tambah",
        "Jangan Tambah Fakta",
        "Gunakan hanya kesimpulan yang disokong secara munasabah oleh petikan.",
      ),
    ]),
    branch("nilai", "Nilai", [
      node(
        "nilai-maksud",
        "Maksud",
        "Nilai ialah sifat positif yang ditunjukkan melalui tindakan, sikap atau keputusan.",
      ),
      node(
        "nilai-umum",
        "Nilai Umum",
        "Contohnya: kasih sayang, kerajinan, keberanian, kejujuran, tanggungjawab, kerjasama, hormat-menghormati dan prihatin.",
      ),
      node("nilai-cara", "Cara Mencari", "Tanya: “Apakah sifat baik yang ditunjukkan oleh watak?”"),
      branch("nilai-contoh", "Contoh", [
        node(
          "nilai-contoh-petikan",
          "Petikan",
          "“Azlan memulangkan dompet yang ditemukannya kepada guru.”",
        ),
        node("nilai-contoh-nilai", "Nilai", "Kejujuran."),
      ]),
      node(
        "nilai-jawapan",
        "Jawapan Lengkap",
        "“Nilai kejujuran ditunjukkan oleh Azlan apabila dia memulangkan dompet yang ditemukannya kepada guru.”",
      ),
      branch("nilai-bukan-sahaja", "Jangan Tulis Nilai Sahaja", [
        node("nilai-bukan-nota", "Nota", "Jika sesuai, sertakan bukti."),
        node("nilai-bukan-lemah", "Lemah", "“Kejujuran.”"),
        node(
          "nilai-bukan-baik",
          "Lebih Baik",
          "“Nilai kejujuran ditunjukkan apabila Azlan memulangkan dompet tersebut.”",
        ),
      ]),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-maksud",
        "Maksud",
        "Pengajaran ialah perkara baik yang boleh dipelajari daripada peristiwa atau tindakan dalam petikan.",
      ),
      node(
        "pengajaran-bentuk",
        "Bentuk Jawapan",
        "Gunakan bentuk seperti “Kita hendaklah…”, “Kita mestilah…” atau “Kita sepatutnya…”.",
      ),
      branch("pengajaran-contoh", "Contoh", [
        node(
          "pengajaran-contoh-petikan",
          "Petikan",
          "“Lina rajin mengulang kaji sehingga berjaya.”",
        ),
        node(
          "pengajaran-contoh-jawapan",
          "Pengajaran",
          "“Kita hendaklah rajin berusaha untuk mencapai kejayaan.”",
        ),
      ]),
      branch("pengajaran-nilai", "Pengajaran vs Nilai", [
        node("pengajaran-nilai-sifat", "Nilai", "Kerajinan."),
        node("pengajaran-nilai-nasihat", "Pengajaran", "Kita hendaklah rajin berusaha."),
      ]),
      node(
        "pengajaran-peristiwa",
        "Berdasarkan Peristiwa",
        "Pengajaran mestilah timbul daripada peristiwa dalam petikan.",
      ),
      node(
        "pengajaran-kesalahan",
        "Kesalahan Lazim",
        "Jangan berikan pengajaran yang tidak berkaitan dengan petikan.",
      ),
    ]),
    branch("inferens", "Inferens", [
      node(
        "inferens-maksud",
        "Maksud",
        "Inferens ialah kesimpulan yang dibuat berdasarkan petunjuk dan pengetahuan yang munasabah.",
      ),
      branch("inferens-formula", "Formula", [
        node("inferens-formula-petunjuk", "Petunjuk", "Maklumat penting daripada petikan."),
        node("inferens-formula-hubungan", "+ Hubungan Idea", "Hubungkan petunjuk yang berkaitan."),
        node("inferens-formula-hasil", "= Inferens", "Bina kesimpulan yang munasabah."),
      ]),
      branch("inferens-contoh-1", "Contoh 1", [
        node(
          "inferens-contoh-1-petunjuk",
          "Petunjuk",
          "Awan gelap, guruh dan orang membawa payung.",
        ),
        node("inferens-contoh-1-jawapan", "Inferens", "Hujan akan turun."),
      ]),
      branch("inferens-contoh-2", "Contoh 2", [
        node(
          "inferens-contoh-2-petunjuk",
          "Petunjuk",
          "Murid berlatih setiap hari, guru memujinya dan dia berjaya dalam pertandingan.",
        ),
        node(
          "inferens-contoh-2-jawapan",
          "Inferens",
          "Usaha yang bersungguh-sungguh membawa kejayaan.",
        ),
      ]),
      node(
        "inferens-munasabah",
        "Inferens Mesti Munasabah",
        "Beberapa jawapan mungkin boleh diterima, tetapi setiap jawapan mesti sepadan dengan bukti.",
      ),
      node(
        "inferens-jauh",
        "Jangan Terlalu Jauh",
        "Jangan cipta masa, tempat, orang atau statistik yang tepat jika tidak disokong.",
      ),
      node(
        "inferens-uji",
        "Uji Jawapan",
        "Tanya: “Apakah bukti dalam petikan yang menyokong kesimpulan ini?”",
      ),
    ]),
    branch("bina-jawapan", "Bina Jawapan", [
      node("bina-inferens", "Nyatakan Inferens", "Mulakan dengan kesimpulan yang jelas."),
      node(
        "bina-alasan",
        "Berikan Alasan",
        "Gunakan kerana, berdasarkan, hal ini dapat dilihat apabila atau buktinya mengikut kesesuaian.",
      ),
      branch("bina-formula", "Formula Jawapan", [
        node("bina-formula-inferens", "Inferens", "Nyatakan kesimpulan."),
        node("bina-formula-bukti", "+ Bukti", "Sertakan alasan atau petunjuk yang menyokong."),
      ]),
      branch("bina-contoh", "Contoh", [
        node("bina-contoh-soalan", "Soalan", "“Apakah yang dapat disimpulkan tentang Amir?”"),
        node(
          "bina-contoh-jawapan",
          "Jawapan",
          "“Amir seorang yang rajin kerana dia mengulang kaji pelajaran setiap malam.”",
        ),
      ]),
      node(
        "bina-perasaan",
        "Soalan Perasaan",
        "Gunakan perasaan + bukti. Contoh: “Lina berasa gembira kerana dia tersenyum selepas diumumkan sebagai pemenang.”",
      ),
      node("bina-nilai", "Soalan Nilai", "Gunakan nilai + tindakan."),
      node(
        "bina-pengajaran",
        "Soalan Pengajaran",
        "Gunakan “Kita hendaklah…” diikuti alasan atau keadaan jika berguna.",
      ),
      node(
        "bina-gramatis",
        "Bahasa Gramatis",
        "Jangan tulis perkataan terpencil kecuali dibenarkan secara jelas.",
      ),
    ]),
    branch("bukti-petikan", "Bukti Petikan", [
      node(
        "bukti-penting",
        "Mengapa Bukti Penting",
        "Bukti menunjukkan bahawa inferens berdasarkan petikan dan bukannya imaginasi.",
      ),
      node("bukti-tepat", "Pilih Bukti Tepat", "Gunakan hanya butiran yang menyokong jawapan."),
      branch("bukti-contoh", "Contoh", [
        node("bukti-contoh-inferens", "Inferens", "“Ravi seorang yang bertanggungjawab.”"),
        node("bukti-contoh-bukti", "Bukti", "“Dia menyiapkan tugasan sebelum membantu rakannya.”"),
      ]),
      node(
        "bukti-jawapan",
        "Jawapan Lengkap",
        "“Ravi seorang yang bertanggungjawab kerana dia menyiapkan tugasannya terlebih dahulu.”",
      ),
      node(
        "bukti-ringkas",
        "Tidak Perlu Salin Panjang",
        "Frasa pendek yang relevan sudah memadai.",
      ),
      node(
        "bukti-olah",
        "Olah dengan Betul",
        "Maklumat boleh diolah semula jika maksud asal dikekalkan.",
      ),
      node(
        "bukti-jangan-cipta",
        "Jangan Cipta Bukti",
        "Jangan tambah tindakan atau peristiwa yang tidak terdapat dalam petikan.",
      ),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "kesalahan-meneka",
        "Meneka Tanpa Bukti",
        "Murid memberikan jawapan berdasarkan imaginasi sendiri sahaja.",
      ),
      node(
        "kesalahan-salin",
        "Salin Ayat Tersurat",
        "Murid menyalin ayat tanpa membuat kesimpulan yang diminta.",
      ),
      node(
        "kesalahan-jauh",
        "Inferens Terlalu Jauh",
        "Murid menambah butiran yang tidak disokong.",
      ),
      node(
        "kesalahan-nilai",
        "Salah Nilai",
        "Murid memilih nilai yang tidak sepadan dengan tindakan.",
      ),
      branch("kesalahan-keliru", "Nilai dan Pengajaran Keliru", [
        node("kesalahan-keliru-nilai", "Nilai", "Kerajinan."),
        node("kesalahan-keliru-pengajaran", "Pengajaran", "Kita hendaklah rajin berusaha."),
      ]),
      branch("kesalahan-alasan", "Jawapan Tanpa Alasan", [
        node("kesalahan-alasan-lemah", "Lemah", "“Ali sedih.”"),
        node(
          "kesalahan-alasan-baik",
          "Lebih Baik",
          "“Ali berasa sedih kerana dia kehilangan haiwan peliharaannya.”",
        ),
      ]),
      node(
        "kesalahan-pengetahuan",
        "Guna Pengetahuan Luar Sahaja",
        "Pengetahuan sendiri boleh membantu proses berfikir tetapi tidak boleh menggantikan bukti petikan.",
      ),
      node("kesalahan-fakta", "Ubah Fakta", "Jangan ubah orang, tindakan atau peristiwa."),
    ]),
    branch("teknik-mengingat", "Teknik Mengingat", [
      branch("teknik-petunjuk", "Rumus PETUNJUK", [
        node("teknik-p", "P — Perhatikan tindakan", "Kenal pasti tindakan yang penting."),
        node("teknik-e", "E — Emosi watak", "Cari petunjuk tentang perasaan."),
        node("teknik-t", "T — Tanda dalam dialog", "Teliti kata-kata dan nada watak."),
        node(
          "teknik-u1",
          "U — Urutan peristiwa",
          "Hubungkan perkara yang berlaku dahulu dan kemudian.",
        ),
        node("teknik-n", "N — Nilai yang ditunjukkan", "Padankan tindakan dengan sifat positif."),
        node("teknik-j", "J — Jelaskan hubungan", "Terangkan hubungan antara petunjuk."),
        node("teknik-u2", "U — Uji dengan bukti", "Pastikan kesimpulan disokong petikan."),
        node("teknik-k", "K — Kesimpulan", "Bina inferens yang munasabah."),
      ]),
      node("teknik-ib", "Rumus I-B", "Inferens + Bukti."),
      node(
        "teknik-nilai-pengajaran",
        "Nilai dan Pengajaran",
        "Nilai ialah satu sifat, manakala pengajaran ialah ayat nasihat.",
      ),
      node(
        "teknik-garis",
        "Garis Petunjuk",
        "Semasa latihan, gariskan setiap butiran yang menyokong inferens.",
      ),
      node(
        "teknik-kenapa",
        "Tanya ‘Kenapa?’",
        "Jika sesuatu tindakan berlaku, fikirkan sebab watak mungkin bertindak demikian.",
      ),
      node(
        "teknik-jangan-hafal",
        "Jangan Hafal Jawapan",
        "Jawapan inferens bergantung pada konteks petikan.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node(
        "uasa-soalan",
        "Baca Soalan Dahulu",
        "Kenal pasti sama ada soalan meminta inferens, perasaan, nilai, pengajaran, sebab atau kesimpulan.",
      ),
      node("uasa-petunjuk", "Cari Petunjuk", "Gunakan tindakan, dialog, penerangan dan reaksi."),
      node("uasa-gabung", "Gabungkan Maklumat", "Satu petunjuk mungkin belum mencukupi."),
      node("uasa-bukti", "Jawab dengan Bukti", "Gunakan inferens + alasan atau bukti."),
      node("uasa-munasabah", "Pastikan Munasabah", "Jawapan mesti sepadan dengan konteks."),
      node("uasa-jangan-meneka", "Jangan Meneka", "Jangan cipta maklumat."),
      node("uasa-ayat", "Ayat Lengkap", "Tulis jawapan yang lengkap dan gramatis apabila sesuai."),
      node(
        "uasa-semak",
        "Semak",
        "Pastikan inferens logik, disokong, menjawab fokus yang betul dan tidak mengubah fakta.",
      ),
      node(
        "uasa-arahan",
        "Ikut Arahan",
        "Jangan tetapkan markah, bilangan ayat, panjang jawapan atau jaminan skor. Ikuti arahan soalan dan format pentaksiran semasa.",
      ),
    ]),
  ],
};
