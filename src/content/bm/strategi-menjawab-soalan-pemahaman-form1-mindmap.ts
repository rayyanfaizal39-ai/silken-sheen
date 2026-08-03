import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-strategi-menjawab-soalan-pemahaman";

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

export const bahasaMelayuTingkatan1StrategiPemahamanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "STRATEGI PEMAHAMAN",
  summary:
    "Strategi menjawab soalan pemahaman membantu murid membaca petikan secara terarah, memahami kehendak soalan dan membina jawapan yang tepat, lengkap serta gramatis.",
  children: [
    branch("apa-itu", "Apa Itu Pemahaman?", [
      node(
        "apa-itu-definisi",
        "Definisi",
        "Pemahaman ialah kemahiran membaca, memahami, mentafsir dan menjawab soalan berdasarkan sesuatu petikan atau bahan.",
      ),
      node(
        "apa-itu-tujuan",
        "Tujuan",
        "Memahami maklumat • mengenal pasti idea utama • mencari maklumat khusus • membuat inferens • memberikan pendapat • menyokong jawapan dengan bukti.",
      ),
      node(
        "apa-itu-bukan-sekadar",
        "Bukan Sekadar Membaca",
        "Membaca sahaja belum mencukupi. Fahami siapa, apa, bila, di mana, mengapa dan bagaimana.",
      ),
      node(
        "apa-itu-berkualiti",
        "Jawapan Berkualiti",
        "Jawapan mestilah tepat, relevan, lengkap, gramatis dan berdasarkan petikan apabila diminta.",
      ),
      node("apa-itu-prinsip", "Prinsip Utama", "Fahami soalan dahulu sebelum mencari jawapan."),
    ]),
    branch("jenis-petikan", "Jenis Petikan", [
      node(
        "jenis-bukan-sastera",
        "Petikan Bukan Sastera",
        "Rencana, laporan, berita, wawancara, ucapan, fakta umum dan bahan maklumat. Fokus pada fakta, sebab, kesan, langkah, faedah dan pendapat.",
      ),
      node(
        "jenis-sastera",
        "Petikan Sastera",
        "Cerpen, novel, drama, puisi dan prosa tradisional. Fokus pada peristiwa, watak, perasaan, nilai, pengajaran, konflik dan mesej.",
      ),
      node("jenis-dialog", "Dialog", "Kenal pasti penutur, pendengar, tujuan, nada dan respons."),
      node(
        "jenis-visual",
        "Bahan Visual",
        "Poster, iklan, infografik, ilustrasi atau gambar. Perhatikan tajuk, label, slogan, tindakan, simbol dan mesej utama.",
      ),
      node(
        "jenis-nota",
        "Nota",
        "Jangan anggap semua soalan pemahaman menggunakan jenis petikan yang sama.",
      ),
    ]),
    branch("sebelum-membaca", "Sebelum Membaca", [
      node(
        "sebelum-tajuk",
        "Lihat Tajuk",
        "Tajuk sering memberikan petunjuk awal tentang isu utama.",
      ),
      node(
        "sebelum-sumber",
        "Lihat Sumber",
        "Kenal pasti sama ada bahan berbentuk fakta, sastera, dialog atau visual.",
      ),
      node(
        "sebelum-arahan",
        "Baca Arahan",
        "Semak bilangan soalan, sumber jawapan, keperluan pendapat sendiri dan sama ada bukti diminta.",
      ),
      node(
        "sebelum-tema",
        "Jangka Tema",
        "Tanya: ‘Apakah perkara utama yang mungkin dibincangkan?’",
      ),
      node(
        "sebelum-jangan-teka",
        "Jangan Meneka Jawapan",
        "Jangkaan hanya menyediakan minda; jawapan akhir mesti berdasarkan petikan dan soalan sebenar.",
      ),
    ]),
    branch("cara-membaca", "Cara Membaca Petikan", [
      node(
        "baca-pertama",
        "Bacaan Pertama",
        "Baca seluruh petikan untuk memahami maksud umum. Jangan berhenti pada setiap perkataan yang belum dikenal.",
      ),
      node(
        "baca-kedua",
        "Bacaan Kedua",
        "Kenal pasti idea utama, butiran sokongan, pihak, tindakan, sebab, kesan dan contoh penting.",
      ),
      node(
        "baca-garis",
        "Gariskan Maklumat",
        "Tandakan maklumat berguna sahaja, bukan setiap ayat.",
      ),
      node("baca-perenggan", "Setiap Perenggan", "Tanya: ‘Apakah idea utama perenggan ini?’"),
      node(
        "baca-wacana",
        "Perhatikan Penanda Wacana",
        "Kerana, oleh itu, selain itu, walau bagaimanapun, sebagai contohnya dan akhirnya menunjukkan hubungan antara idea.",
      ),
      node(
        "baca-catatan",
        "Catatan Ringkas",
        "Catat satu atau dua kata kunci di sisi perenggan apabila berguna.",
      ),
      node(
        "baca-soalan-semula",
        "Baca Soalan Semula",
        "Selepas membaca petikan, kembali kepada soalan sebelum memilih jawapan.",
      ),
    ]),
    branch("kehendak", "Kehendak Soalan", [
      node(
        "kehendak-maksud",
        "Maksud Perkataan",
        "Berikan maksud perkataan, frasa atau ungkapan mengikut konteks petikan.",
      ),
      node(
        "kehendak-tersurat",
        "Maklumat Tersurat",
        "Jawapan dinyatakan secara langsung dalam petikan.",
      ),
      node(
        "kehendak-tersirat",
        "Maklumat Tersirat",
        "Jawapan disimpulkan daripada petunjuk yang terdapat dalam petikan.",
      ),
      node("kehendak-sebab", "Sebab", "Cari kerana, disebabkan, punca atau faktor."),
      node("kehendak-kesan", "Kesan", "Cari akibat, kesannya, hasilnya atau implikasi."),
      node("kehendak-langkah", "Langkah", "Cari cara, usaha, tindakan atau cadangan."),
      node(
        "kehendak-nilai",
        "Nilai atau Pengajaran",
        "Kenal pasti sifat positif atau pelajaran daripada peristiwa dan watak.",
      ),
      node(
        "kehendak-pendapat",
        "Pendapat",
        "Berikan respons peribadi yang logik dan sokong dengan alasan.",
      ),
      node(
        "kehendak-kata-tugas",
        "Kata Tugas",
        "Perhatikan nyatakan, jelaskan, huraikan, berikan, mengapakah, bagaimanakah dan pada pendapat anda.",
      ),
      node(
        "kehendak-kesalahan",
        "Kesalahan Lazim",
        "Jangan jawab soalan ‘mengapa’ dengan tindakan sahaja atau soalan ‘bagaimana’ dengan sebab sahaja.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kunci-soalan",
        "Dalam Soalan",
        "Kenal pasti orang, isu, tindakan, masa, tempat dan fokus yang diminta.",
      ),
      node(
        "kunci-contoh",
        "Contoh Soalan",
        "‘Mengapakah Amir menyertai pertandingan itu?’ Kata kunci: mengapakah, Amir dan menyertai pertandingan.",
      ),
      node(
        "kunci-padan",
        "Padankan dengan Petikan",
        "Cari perkataan yang sama atau maksud berkaitan; petikan mungkin menggunakan sinonim.",
      ),
      node(
        "kunci-ganti",
        "Kata Ganti Nama",
        "Tentukan pihak yang dirujuk oleh dia, beliau, mereka, mereka itu dan tersebut.",
      ),
      node(
        "kunci-sedikit",
        "Jangan Pilih Terlalu Banyak",
        "Pilih hanya kata kunci yang membantu mencari atau membina jawapan.",
      ),
    ]),
    branch("cari-jawapan", "Cari Jawapan", [
      node("cari-kembali", "Kembali ke Petikan", "Cari perenggan yang berkaitan dengan soalan."),
      node(
        "cari-sokongan",
        "Cari Ayat Sokongan",
        "Cari ayat yang mengandungi jawapan, sebab, kesan atau bukti.",
      ),
      node(
        "cari-sekitar",
        "Baca Sebelum dan Selepas",
        "Jawapan lengkap kadangkala tersebar dalam dua ayat berdekatan.",
      ),
      node(
        "cari-makna",
        "Padankan Makna",
        "Jangan bergantung pada perkataan seiras sahaja. ‘Faedah’ dalam soalan boleh dinyatakan sebagai ‘manfaat’ dalam petikan.",
      ),
      node(
        "cari-relevan",
        "Pilih Maklumat Relevan",
        "Jangan salin butiran tidak berkaitan daripada perenggan yang sama.",
      ),
      node(
        "cari-bilangan",
        "Bilangan Isi",
        "Ikuti arahan soalan dan jangan tambah isi hanya untuk kelihatan lengkap.",
      ),
      node(
        "cari-jangan-teka",
        "Jangan Meneka",
        "Gunakan bukti petikan apabila soalan meminta maklumat daripada teks.",
      ),
    ]),
    branch("bina-jawapan", "Bina Jawapan", [
      node(
        "bina-lengkap",
        "Jawab dalam Ayat Lengkap",
        "Elakkan nota atau perkataan terpencil kecuali soalan membenarkannya.",
      ),
      node(
        "bina-kehendak",
        "Gunakan Kehendak Soalan",
        "Soalan: ‘Mengapakah Amir rajin membaca?’ Jawapan: ‘Amir rajin membaca kerana dia ingin menambah ilmu pengetahuan.’",
      ),
      node(
        "bina-subjek",
        "Subjek Jelas",
        "Pastikan pembaca mengetahui siapa atau perkara yang dirujuk.",
      ),
      node("bina-isi", "Isi Tepat", "Masukkan hanya maklumat yang menjawab soalan."),
      node(
        "bina-huraian",
        "Huraian",
        "Gunakan kerana, supaya, agar, hal ini demikian kerana atau kesannya mengikut hubungan makna.",
      ),
      node(
        "bina-pendapat",
        "Jawapan Pendapat",
        "Pendapat + alasan + contoh atau kesan. Contoh: ‘Pada pendapat saya, murid perlu membaca setiap hari kerana amalan tersebut dapat menambah pengetahuan dan meningkatkan penguasaan bahasa.’",
      ),
      node(
        "bina-jangan-salin",
        "Jangan Salin Soalan Sepenuhnya",
        "Gunakan bahagian soalan yang diperlukan sahaja.",
      ),
    ]),
    branch("bukti", "Bukti Petikan", [
      node(
        "bukti-maksud",
        "Maksud Bukti",
        "Bukti ialah maklumat daripada petikan yang menyokong jawapan.",
      ),
      node(
        "bukti-bila",
        "Bila Diperlukan",
        "Gunakan bukti apabila soalan menyebut berdasarkan petikan, buktikan, nyatakan peristiwa, sebab daripada teks atau tindakan watak.",
      ),
      node(
        "bukti-pilih",
        "Petik Secara Terpilih",
        "Ambil frasa atau maklumat yang relevan sahaja, bukan seluruh perenggan.",
      ),
      node(
        "bukti-olah",
        "Olah Semula",
        "Jika sesuai, bina semula maklumat sebagai ayat sendiri yang gramatis.",
      ),
      node(
        "bukti-contoh",
        "Contoh",
        "Petikan: ‘Farah membantu ibunya menyediakan makanan sebelum pergi ke sekolah.’ Jawapan: ‘Buktinya, Farah membantu ibunya menyediakan makanan sebelum pergi ke sekolah.’",
      ),
      node(
        "bukti-huraian",
        "Bukti dan Huraian",
        "Soalan aras tinggi mungkin memerlukan bukti diikuti penjelasan ringkas.",
      ),
      node("bukti-jangan-cipta", "Jangan Cipta Bukti", "Bukti mesti berasal daripada petikan."),
    ]),
    branch("bahasa-sendiri", "Bahasa Sendiri", [
      node(
        "sendiri-maksud",
        "Maksud",
        "Bahasa sendiri bermaksud mengolah idea tanpa mengubah maksud asal.",
      ),
      node(
        "sendiri-cara",
        "Cara Mudah",
        "Kenal pasti idea utama, pilih kata ganti yang tepat, susun semula ayat dan kekalkan maksud.",
      ),
      node(
        "sendiri-contoh",
        "Contoh",
        "Asal: ‘Murid digalakkan membaca untuk meluaskan pengetahuan.’ Olahan: ‘Amalan membaca dapat membantu murid menambah ilmu.’",
      ),
      node(
        "sendiri-salin",
        "Bila Boleh Menyalin",
        "Frasa pendek boleh dikekalkan bagi nama, istilah teknikal, maksud yang tidak boleh diubah atau bukti yang diminta.",
      ),
      node(
        "sendiri-fakta",
        "Jangan Ubah Fakta",
        "Kekalkan orang, masa, tempat, kuantiti, tindakan, sebab dan hasil.",
      ),
      node(
        "sendiri-kesalahan",
        "Kesalahan Lazim",
        "Sinonim yang tidak sesuai boleh mengubah maksud. Ketepatan lebih penting daripada menukar setiap perkataan.",
      ),
    ]),
    branch("semak", "Semak Jawapan", [
      node(
        "semak-kehendak",
        "Semak Kehendak",
        "Tanya: ‘Adakah jawapan saya menjawab perkara yang diminta?’",
      ),
      node("semak-isi", "Semak Isi", "Pastikan jawapan disokong oleh petikan apabila diperlukan."),
      node(
        "semak-ayat",
        "Semak Ayat",
        "Periksa subjek, predikat, kejelasan maksud dan susunan kata.",
      ),
      node(
        "semak-tatabahasa",
        "Semak Tatabahasa",
        "Periksa imbuhan, kata sendi nama, kata ganti nama, kata hubung dan kata pemeri apabila berkaitan.",
      ),
      node("semak-ejaan", "Semak Ejaan", "Betulkan huruf besar, ejaan baku, jarak dan tanda baca."),
      node(
        "semak-bilangan",
        "Semak Bilangan Jawapan",
        "Berikan bilangan isi yang diminta oleh soalan.",
      ),
      node(
        "semak-baca-semula",
        "Baca Semula",
        "Baca soalan bersama jawapan; jawapan perlu kedengaran logik dan lengkap.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "salah-soalan",
        "Tidak Membaca Soalan",
        "Murid menemukan maklumat tetapi menjawab fokus yang salah.",
      ),
      node(
        "salah-salin",
        "Salin Bulat-bulat",
        "Menyalin bahagian panjang tanpa memilih jawapan yang relevan.",
      ),
      node(
        "salah-ringkas",
        "Jawapan Terlalu Ringkas",
        "Soalan: ‘Mengapakah Amir bersenam?’ Lemah: ‘Sihat.’ Lebih baik: ‘Amir bersenam untuk menjaga kesihatan tubuhnya.’",
      ),
      node(
        "salah-panjang",
        "Jawapan Terlalu Panjang",
        "Maklumat tidak berkaitan boleh menyembunyikan jawapan sebenar.",
      ),
      node(
        "salah-petikan",
        "Tidak Berdasarkan Petikan",
        "Memberikan pendapat sendiri apabila soalan meminta maklumat teks.",
      ),
      node(
        "salah-pendapat",
        "Pendapat Tanpa Alasan",
        "Lemah: ‘Saya setuju.’ Lebih baik: ‘Saya setuju kerana aktiviti tersebut dapat mengeratkan hubungan antara murid.’",
      ),
      node(
        "salah-gramatis",
        "Bahasa Tidak Gramatis",
        "Menulis frasa atau nota apabila ayat lengkap diperlukan.",
      ),
      node(
        "salah-ganti",
        "Salah Menafsir Kata Ganti Nama",
        "Tidak mengenal pasti pihak yang dirujuk oleh ‘dia’ atau ‘mereka’.",
      ),
      node(
        "salah-fakta",
        "Mengubah Fakta",
        "Mengubah orang, tindakan, sebab atau hasil asal petikan.",
      ),
    ]),
    branch("mengingat", "Teknik Mengingat", [
      branch("mengingat-baca", "Rumus BACA", [
        node("baca-b", "B — Baca soalan", "Kenal pasti perkara yang perlu dijawab."),
        node("baca-a1", "A — Analisis kata kunci", "Tentukan fokus, pihak dan kata tugas."),
        node("baca-c", "C — Cari bukti", "Padankan soalan dengan maklumat relevan."),
        node("baca-a2", "A — Ayatkan jawapan", "Tulis jawapan yang lengkap dan gramatis."),
      ]),
      branch("mengingat-semak", "Rumus SEMAK", [
        node("semak-s", "S — Soalan dijawab", "Jawapan menepati fokus."),
        node("semak-e", "E — Ejaan betul", "Ejaan dan tanda baca diperiksa."),
        node("semak-m", "M — Maklumat tepat", "Fakta asal dikekalkan."),
        node("semak-a", "A — Ayat gramatis", "Subjek dan predikat lengkap."),
        node("semak-k", "K — Kehendak dipenuhi", "Arahan soalan dipatuhi."),
      ]),
      node(
        "mengingat-warna",
        "Warna Kata Kunci",
        "Semasa latihan, gunakan warna berbeza bagi fokus soalan, bukti dan jawapan akhir.",
      ),
      node(
        "mengingat-perenggan",
        "Satu Perenggan, Satu Idea",
        "Ringkaskan setiap perenggan dalam beberapa kata.",
      ),
      node(
        "mengingat-latihan",
        "Latihan Kecil",
        "Latih satu soalan pada satu masa sebelum menjawab petikan penuh.",
      ),
      node(
        "mengingat-faham",
        "Faham, Bukan Hafal",
        "Strategi membantu murid berfikir dan tidak menggantikan pembacaan yang teliti.",
      ),
    ]),
    branch("uasa", "Tip UASA", [
      node("uasa-arahan", "Baca Arahan", "Ikuti arahan tepat yang diberikan dalam pentaksiran."),
      node(
        "uasa-soalan",
        "Mulakan dengan Soalan",
        "Baca soalan sebelum mencari bukti dalam petikan.",
      ),
      node(
        "uasa-kunci",
        "Gariskan Kata Kunci",
        "Fokus pada orang, tindakan, sebab, kesan, nilai atau pendapat yang diminta.",
      ),
      node("uasa-terus", "Jawapan Terus", "Mulakan dengan jawapan, bukan pengenalan yang panjang."),
      node(
        "uasa-bukti",
        "Gunakan Bukti",
        "Sokong jawapan berasaskan teks dengan maklumat petikan yang relevan.",
      ),
      node(
        "uasa-kbat",
        "Jawapan KBAT",
        "Gunakan pendapat + alasan + contoh atau kesan secara ringkas dan logik.",
      ),
      node("uasa-gramatis", "Ayat Gramatis", "Tulis ayat lengkap yang mudah difahami."),
      node("uasa-semak", "Semak Akhir", "Periksa fokus, bukti, tatabahasa, ejaan dan kelengkapan."),
      node(
        "uasa-tiada-tetap",
        "Tiada Nombor Tetap",
        "Jangan anggap markah, masa atau panjang jawapan sentiasa sama. Ikuti arahan soalan dan format pentaksiran semasa.",
      ),
    ]),
  ],
};
