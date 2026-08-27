import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-kesalahan-lazim-pemahaman-lanjutan";

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

export const bahasaMelayuTingkatan2KesalahanPemahamanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KESALAHAN PEMAHAMAN T2",
  summary:
    "Kesalahan dalam pemahaman sering berlaku apabila murid tersalah mentafsir soalan, memilih bukti yang tidak tepat, membuat inferens tanpa sokongan atau membina jawapan yang tidak lengkap.",
  children: [
    branch("salah-faham", "Salah Faham Soalan", [
      node(
        "faham-punca",
        "Punca Lazim",
        "Murid tidak membaca kata tugas, keliru antara sebab dengan kesan atau langkah dengan faedah, tidak menyedari bilangan isi yang diminta, atau menjawab tema umum tetapi bukan fokus.",
      ),
      branch("faham-contoh", "Contoh Langkah Pencemaran", [
        node("faham-soalan", "Soalan", "Nyatakan dua langkah untuk mengurangkan pencemaran."),
        node("faham-salah", "Jawapan Salah", "Pencemaran menyebabkan kesihatan terjejas."),
        node(
          "faham-sebab",
          "Mengapa Salah?",
          "Soalan meminta tindakan, tetapi jawapan memberikan kesan.",
        ),
        node(
          "faham-betul",
          "Jawapan Betul",
          "Antara langkah yang boleh dilakukan ialah mengurangkan penggunaan plastik dan mengamalkan kitar semula.",
        ),
        node(
          "faham-baik",
          "Mengapa Lebih Baik?",
          "Jawapan memberikan dua tindakan yang menepati kata tugas dan fokus.",
        ),
      ]),
    ]),
    branch("salah-isi", "Salah Pilih Isi", [
      node(
        "isi-prinsip",
        "Tidak Semua Ayat ialah Jawapan",
        "Jangan memilih butiran hanya kerana mengandungi kata kunci yang sama dengan soalan.",
      ),
      branch("isi-contoh", "Contoh Faedah Membaca", [
        node(
          "isi-kandungan",
          "Kandungan Petikan",
          "Petikan menyatakan faedah membaca, lokasi perpustakaan dan nama program membaca.",
        ),
        node("isi-soalan", "Soalan", "Nyatakan dua faedah membaca."),
        node(
          "isi-relevan",
          "Isi Relevan",
          "Pilih hanya maklumat yang menerangkan manfaat membaca.",
        ),
        node(
          "isi-tidak",
          "Isi Tidak Relevan",
          "Lokasi perpustakaan dan nama program tidak menjawab fokus faedah.",
        ),
      ]),
      branch("isi-aliran", "Aliran Pemilihan", [
        node("isi-fokus", "Fokus Soalan", "Tentukan maklumat khusus yang diminta."),
        node("isi-butiran", "→ Butiran Relevan", "Padankan calon isi dengan fokus."),
        node("isi-jawapan", "→ Jawapan", "Gunakan hanya isi yang benar-benar menepati soalan."),
      ]),
    ]),
    branch("tersurat-tersirat", "Tersurat vs Tersirat", [
      node("tt-tersurat", "Tersurat", "Maklumat dinyatakan secara langsung dalam petikan."),
      node("tt-tersirat", "Tersirat", "Jawapan disimpulkan daripada petunjuk yang diberikan."),
      branch("tt-farid", "Contoh Farid", [
        node("tt-petikan", "Petikan", "Farid datang lebih awal setiap hari untuk berlatih."),
        node("tt-soalan", "Soalan", "Apakah sikap Farid?"),
        node("tt-salah", "Jawapan Lemah", "Farid datang lebih awal."),
        node(
          "tt-sebab",
          "Mengapa Lemah?",
          "Jawapan hanya mengulang tindakan tersurat dan tidak menyimpulkan sikap.",
        ),
        node(
          "tt-betul",
          "Jawapan Lebih Baik",
          "Farid seorang yang rajin dan berdisiplin kerana dia datang lebih awal untuk berlatih.",
        ),
        node(
          "tt-baik",
          "Mengapa Lebih Baik?",
          "Sikap diinferenskan dan disokong oleh tindakan dalam petikan.",
        ),
      ]),
    ]),
    branch("inferens", "Inferens Tanpa Bukti", [
      node(
        "inferens-rangka",
        "Inferens + Bukti",
        "Sifat atau kesimpulan perlu disokong oleh tindakan, dialog atau keadaan dalam petikan.",
      ),
      branch("inferens-rina", "Contoh Rina", [
        node("inferens-salah", "Jawapan Salah", "Rina seorang yang baik."),
        node(
          "inferens-sebab",
          "Mengapa Salah?",
          "Sifat itu terlalu umum dan tiada bukti yang menyokongnya.",
        ),
        node(
          "inferens-betul",
          "Jawapan Betul",
          "Rina seorang yang prihatin kerana dia membantu jirannya yang sakit.",
        ),
        node(
          "inferens-baik",
          "Mengapa Lebih Baik?",
          "Inferens khusus dipadankan dengan tindakan yang relevan.",
        ),
      ]),
      node(
        "inferens-rawak",
        "Elakkan Sifat Rawak",
        "Jangan memilih sifat watak yang tidak dapat dibuktikan melalui petikan.",
      ),
    ]),
    branch("bukti", "Bukti Tidak Tepat", [
      node("bukti-dakwaan", "Dakwaan", "Program itu berjaya."),
      node("bukti-lemah", "Bukti Lemah", "Program itu diadakan pada hari Sabtu."),
      node(
        "bukti-sebab-lemah",
        "Mengapa Lemah?",
        "Hari pelaksanaan tidak membuktikan kejayaan program.",
      ),
      node(
        "bukti-kuat",
        "Bukti Kukuh",
        "Jumlah penyertaan meningkat daripada 100 kepada 250 orang.",
      ),
      node(
        "bukti-sebab-kuat",
        "Mengapa Kukuh?",
        "Peningkatan penyertaan menyokong dakwaan kejayaan secara langsung.",
      ),
      node(
        "bukti-uji",
        "Uji Kaitan",
        "Tanya: ‘Adakah bukti ini benar-benar membuktikan jawapan saya?’ Fakta yang benar belum tentu bukti yang relevan.",
      ),
    ]),
    branch("salin", "Salin Berlebihan", [
      node(
        "salin-masalah",
        "Masalah",
        "Menyalin empat atau lima ayat apabila hanya satu frasa diperlukan tidak menunjukkan pemilihan yang tepat.",
      ),
      branch("salin-ali", "Contoh Perasaan Ali", [
        node(
          "salin-petikan",
          "Petikan",
          "Ali berasa gembira apabila diumumkan sebagai pemenang pertandingan. Dia tersenyum dan mengucapkan terima kasih kepada gurunya.",
        ),
        node("salin-soalan", "Soalan", "Bagaimanakah perasaan Ali?"),
        node(
          "salin-salah",
          "Jawapan Salah",
          "Menyalin seluruh petikan tanpa memilih bahagian yang diperlukan.",
        ),
        node(
          "salin-betul",
          "Jawapan Betul",
          "Ali berasa gembira apabila diumumkan sebagai pemenang pertandingan.",
        ),
        node(
          "salin-baik",
          "Mengapa Lebih Baik?",
          "Jawapan terus menyatakan perasaan dan bukti yang berkaitan.",
        ),
      ]),
    ]),
    branch("tidak-lengkap", "Jawapan Tidak Lengkap", [
      branch("lengkap-senaman", "Contoh Bersenam", [
        node("senaman-soalan", "Soalan", "Mengapakah murid perlu bersenam?"),
        node("senaman-lemah", "Jawapan Lemah", "Sihat."),
        node(
          "senaman-sebab",
          "Mengapa Lemah?",
          "Fragmen itu tidak menerangkan hubungan antara tindakan dengan sebab.",
        ),
        node(
          "senaman-betul",
          "Jawapan Lengkap",
          "Murid perlu bersenam untuk menjaga kesihatan dan meningkatkan kecergasan tubuh.",
        ),
      ]),
      branch("lengkap-gotong", "Contoh Gotong-royong", [
        node("gotong-soalan", "Soalan", "Bagaimanakah mereka menjaga kebersihan?"),
        node("gotong-lemah", "Jawapan Lemah", "Gotong-royong."),
        node(
          "gotong-betul",
          "Jawapan Lengkap",
          "Mereka menjaga kebersihan dengan mengadakan aktiviti gotong-royong.",
        ),
      ]),
      node(
        "lengkap-prinsip",
        "Ayat Gramatis",
        "Gunakan ayat lengkap apabila bentuk soalan memerlukannya.",
      ),
    ]),
    branch("kbat", "KBAT Tidak Logik", [
      node(
        "kbat-punca",
        "Masalah Lazim",
        "Idea tidak berkaitan, tindakan tidak realistik, alasan tiada, kesan tidak berpunca daripada tindakan, statistik direka atau jawapan terlalu umum.",
      ),
      branch("kbat-membaca", "Contoh Minat Membaca", [
        node("kbat-soalan", "Soalan", "Cadangkan cara meningkatkan minat membaca."),
        node(
          "kbat-lemah",
          "Jawapan Lemah",
          "Kerajaan perlu memberikan sejuta ringgit kepada setiap murid.",
        ),
        node(
          "kbat-sebab",
          "Mengapa Lemah?",
          "Cadangan tidak realistik dan kaitannya dengan minat membaca tidak dijelaskan.",
        ),
        node(
          "kbat-betul",
          "Jawapan Lebih Baik",
          "Pihak sekolah boleh menganjurkan program membaca yang menarik dan menyediakan bahan bacaan yang pelbagai.",
        ),
        node(
          "kbat-baik",
          "Mengapa Lebih Baik?",
          "Cadangan praktikal, relevan dan boleh dilaksanakan oleh pihak yang dinamakan.",
        ),
      ]),
      node(
        "kbat-rangka",
        "Idea + Alasan atau Kesan",
        "Kembangkan idea dengan sebab atau hasil yang mempunyai hubungan logik.",
      ),
      node(
        "kbat-pandangan",
        "Pandangan Boleh Berbeza",
        "Jawapan KBAT lain boleh diterima jika munasabah, relevan dan dijustifikasikan.",
      ),
    ]),
    branch("frasa", "Maksud Frasa Salah", [
      node(
        "frasa-punca",
        "Punca Lazim",
        "Menterjemah perkataan satu demi satu, mengabaikan konteks, menjelaskan sebahagian frasa, memilih sinonim tidak sesuai atau mengelirukan makna literal dengan kiasan.",
      ),
      branch("frasa-ruang", "Contoh Membuka Ruang", [
        node("frasa-ayat", "Ayat", "Program itu membuka ruang kepada murid untuk berkarya."),
        node("frasa-salah", "Maksud Salah", "Membuka sebuah ruang."),
        node(
          "frasa-sebab",
          "Mengapa Salah?",
          "Makna literal tidak sesuai dengan kegiatan berkarya dalam konteks ayat.",
        ),
        node("frasa-betul", "Maksud Betul", "Memberikan peluang."),
        node(
          "frasa-baik",
          "Mengapa Betul?",
          "Maksud tersebut boleh menggantikan frasa asal tanpa mengubah idea ayat.",
        ),
      ]),
      node(
        "frasa-konteks",
        "Konteks Dahulu",
        "Baca ayat penuh dan ayat sekeliling sebelum menentukan maksud.",
      ),
    ]),
    branch("rumusan", "Rumusan Lemah", [
      node(
        "rumusan-punca",
        "Kesalahan Lazim",
        "Menyalin bulat-bulat, memasukkan terlalu banyak contoh, meninggalkan isi utama, mengulang idea, menambah pendapat sendiri atau mengubah maksud asal.",
      ),
      branch("rumusan-membaca", "Contoh Faedah Membaca", [
        node(
          "rumusan-asal",
          "Idea Asal",
          "Membaca menambah ilmu, memperluas kosa kata dan meningkatkan kemahiran berfikir.",
        ),
        node(
          "rumusan-lemah",
          "Rumusan Lemah",
          "Membaca sangat bagus dan semua orang patut membaca banyak buku di perpustakaan.",
        ),
        node(
          "rumusan-sebab",
          "Mengapa Lemah?",
          "Jawapan terlalu umum, menambah pendapat dan menggugurkan isi penting.",
        ),
        node(
          "rumusan-betul",
          "Rumusan Lebih Baik",
          "Amalan membaca dapat menambah ilmu, memperluas kosa kata dan meningkatkan kemahiran berfikir.",
        ),
        node(
          "rumusan-baik",
          "Mengapa Lebih Baik?",
          "Isi utama digabungkan secara padat tanpa menambah maklumat baharu.",
        ),
      ]),
    ]),
    branch("bahasa", "Kesalahan Bahasa", [
      node(
        "bahasa-jenis",
        "Jenis Kesalahan",
        "Ayat tidak lengkap, imbuhan salah, kesalahan ejaan dan tanda baca, kata sendi nama tidak tepat serta rujukan kata ganti nama yang kabur.",
      ),
      branch("bahasa-ayat", "Contoh Ayat Tidak Lengkap", [
        node("bahasa-salah-1", "Salah", "Kerana untuk menjaga kesihatan."),
        node(
          "bahasa-sebab-1",
          "Mengapa Salah?",
          "Ayat tidak mempunyai subjek dan predikat yang lengkap.",
        ),
        node("bahasa-betul-1", "Betul", "Murid perlu bersenam untuk menjaga kesihatan."),
      ]),
      branch("bahasa-ejaan", "Contoh Kata Sendi Nama", [
        node("bahasa-salah-2", "Salah", "DiSekolah."),
        node("bahasa-betul-2", "Betul", "Di sekolah."),
        node(
          "bahasa-sebab-2",
          "Mengapa Betul?",
          "Kata sendi nama ‘di’ ditulis terpisah daripada kata nama tempat.",
        ),
      ]),
      node(
        "bahasa-prinsip",
        "Bahasa Tetap Dinilai",
        "Jawapan pemahaman perlu menyampaikan idea melalui bahasa yang jelas dan gramatis.",
      ),
    ]),
    branch("fakta", "Fakta Berubah", [
      node(
        "fakta-prinsip",
        "Parafrasa Mesti Tepat",
        "Mengolah ayat tidak membenarkan perubahan pada maklumat asal.",
      ),
      branch("fakta-kuantiti", "Contoh Kuantiti", [
        node("fakta-asal", "Ayat Asal", "Sebahagian murid menghadapi kesukaran mengurus masa."),
        node("fakta-salah", "Ayat Salah", "Semua murid gagal mengurus masa."),
        node(
          "fakta-sebab",
          "Mengapa Salah?",
          "‘Sebahagian’ tidak sama dengan ‘semua’, manakala ‘kesukaran’ tidak semestinya bermaksud gagal.",
        ),
      ]),
      node(
        "fakta-semak",
        "Unsur yang Disemak",
        "Pastikan orang, bilangan, tempat, masa, sebab, kesan dan tahap kepastian kekal tepat.",
      ),
      node(
        "fakta-kepastian",
        "Mungkin ≠ Pasti",
        "Jangan menukar kemungkinan kepada kepastian tanpa bukti.",
      ),
    ]),
    branch("betulkan", "Cara Membetulkan", [
      node("betul-1", "Langkah 1 — Baca Semula", "Baca soalan sekali lagi dan teliti kata tugas."),
      node("betul-2", "Langkah 2 — Tentukan Fokus", "Nyatakan dengan tepat perkara yang diminta."),
      node(
        "betul-3",
        "Langkah 3 — Cari Bukti",
        "Cari maklumat yang benar-benar berkaitan dalam petikan.",
      ),
      node(
        "betul-4",
        "Langkah 4 — Buang Maklumat Lain",
        "Gugurkan contoh atau butiran yang tidak menjawab fokus.",
      ),
      node(
        "betul-5",
        "Langkah 5 — Lengkapkan Jawapan",
        "Tulis semula jawapan dalam ayat yang lengkap.",
      ),
      node(
        "betul-6",
        "Langkah 6 — Semak Fakta",
        "Pastikan kuantiti, subjek dan hubungan idea tidak berubah.",
      ),
      node("betul-7", "Langkah 7 — Semak Bahasa", "Periksa tatabahasa, ejaan dan tanda baca."),
      branch("betul-contoh", "Contoh Pembetulan", [
        node(
          "betul-salah",
          "Jawapan Salah",
          "Program itu berjaya kerana diadakan pada hari Sabtu.",
        ),
        node("betul-masalah", "Masalah", "Hari pelaksanaan tidak membuktikan kejayaan."),
        node(
          "betul-jawapan",
          "Pembetulan",
          "Program itu berjaya kerana jumlah penyertaan meningkat dengan ketara.",
        ),
        node(
          "betul-baik",
          "Mengapa Lebih Baik?",
          "Bukti baharu mempunyai kaitan langsung dengan dakwaan kejayaan.",
        ),
      ]),
      branch("betul-rumus", "Rumus BETUL", [
        node("betul-b", "B — Baca Soalan", "Fahami kata tugas dan perkara yang diminta."),
        node(
          "betul-e",
          "E — Elakkan Maklumat Tidak Berkaitan",
          "Gugurkan butiran yang tidak menjawab fokus.",
        ),
        node("betul-t", "T — Tentukan Bukti", "Pilih petunjuk yang tepat dan relevan."),
        node("betul-u", "U — Uji Logik", "Semak hubungan idea, alasan dan kesan."),
        node("betul-l", "L — Lengkapkan Ayat", "Bina jawapan yang jelas dan gramatis."),
      ]),
      branch("betul-3t", "Semakan 3T", [
        node("t-tepat", "Tepat", "Jawapan betul dan tidak mengubah fakta."),
        node("t-terkait", "Terkait", "Isi berkaitan dengan soalan."),
        node("t-terbukti", "Terbukti", "Jawapan disokong oleh petikan apabila bukti diperlukan."),
      ]),
      node(
        "betul-fleksibel",
        "Alat Berfikir",
        "BETUL dan 3T ialah panduan semakan, bukan formula markah yang kaku.",
      ),
    ]),
    branch("senarai", "Senarai Semak", [
      node("semak-1", "Kata Tugas", "Saya memahami kata tugas."),
      node("semak-2", "Fokus", "Saya menjawab fokus yang betul."),
      node("semak-3", "Isi", "Isi saya relevan."),
      node("semak-4", "Bukti", "Bukti saya tepat."),
      node("semak-5", "Inferens", "Inferens saya disokong."),
      node("semak-6", "Pemilihan", "Saya tidak menyalin terlalu banyak."),
      node("semak-7", "Fakta Tambahan", "Saya tidak menambah fakta sendiri."),
      node("semak-8", "Maksud Frasa", "Maksud frasa saya mengikut konteks."),
      node("semak-9", "Logik KBAT", "Jawapan KBAT saya logik."),
      node("semak-10", "Bahasa", "Ayat saya lengkap dan gramatis."),
      node("semak-11", "Fakta Asal", "Saya tidak mengubah fakta asal."),
      node("semak-12", "Baca Semula", "Saya sudah membaca semula jawapan."),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("uasa-baca", "Baca Soalan Dahulu", "Fahami kehendak sebelum mencari jawapan."),
      node(
        "uasa-kata",
        "Gariskan Kata Tugas",
        "Bezakan sebab, kesan, langkah, bukti dan inferens.",
      ),
      node(
        "uasa-bilangan",
        "Semak Bilangan Isi",
        "Patuhi bilangan isi jika dinyatakan dalam soalan.",
      ),
      node(
        "uasa-bukti",
        "Padankan Jawapan dengan Bukti",
        "Gunakan bukti apabila diperlukan dan pilih yang paling kuat.",
      ),
      node(
        "uasa-beza",
        "Bezakan Tersurat dan Tersirat",
        "Tentukan sama ada jawapan perlu dicari atau diinferenskan.",
      ),
      node("uasa-inferens", "Gunakan Inferens Munasabah", "Sokong kesimpulan dengan petunjuk."),
      node(
        "uasa-kbat",
        "Jawab KBAT Secara Logik",
        "Berikan idea relevan dengan alasan atau kesan yang sesuai.",
      ),
      node("uasa-bahasa", "Gunakan Bahasa Jelas", "Bina ayat lengkap dan gramatis."),
      node(
        "uasa-semak",
        "Semak Fakta dan Ejaan",
        "Pastikan maksud asal dan ketepatan bahasa terpelihara.",
      ),
      node(
        "uasa-arahan",
        "Ikut Arahan Sebenar",
        "Jangan andaikan markah, panjang jawapan atau masa yang tetap, dan jangan bergantung pada formula yang menjamin skor.",
      ),
    ]),
  ],
};
