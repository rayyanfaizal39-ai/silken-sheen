import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-asas-penulisan";

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

export const bahasaMelayuForm1AsasPenulisanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "ASAS PENULISAN",
  summary:
    "Asas menyampaikan idea, maklumat, pengalaman, perasaan atau pendapat secara jelas, gramatis dan tersusun.",
  children: [
    branch("apa-itu", "Apa Itu Penulisan?", [
      node(
        "apa-itu-maksud",
        "Maksud",
        "Penulisan ialah proses menyampaikan idea, maklumat, pengalaman, perasaan atau pendapat dalam bentuk tulisan yang jelas dan tersusun.",
      ),
      branch("apa-itu-binaan", "Binaan Asas", [
        node("apa-itu-binaan-perkataan", "Perkataan", "Perkataan membentuk sesuatu maksud."),
        node(
          "apa-itu-binaan-ayat",
          "Ayat",
          "Ayat menyampaikan satu fikiran yang lengkap. Contoh: Murid-murid menjaga kebersihan sekolah.",
        ),
        node(
          "apa-itu-binaan-perenggan",
          "Perenggan",
          "Beberapa ayat yang membincangkan satu isi utama.",
        ),
        node(
          "apa-itu-binaan-teks",
          "Teks Lengkap",
          "Teks mempunyai permulaan, perkembangan idea dan pengakhiran yang saling berkaitan.",
        ),
      ]),
      node("apa-itu-urutan", "Urutan Binaan", "Perkataan → Ayat → Perenggan → Teks lengkap."),
      branch("apa-itu-tiga-asas", "Tiga Asas Utama", [
        node("apa-itu-tiga-asas-isi", "Isi", "Perkara atau idea yang hendak disampaikan."),
        node(
          "apa-itu-tiga-asas-bahasa",
          "Bahasa",
          "Ayat, ejaan, tanda baca dan pilihan kata yang digunakan.",
        ),
        node(
          "apa-itu-tiga-asas-susunan",
          "Susunan",
          "Cara idea diatur supaya mudah diikuti oleh pembaca.",
        ),
      ]),
      node(
        "apa-itu-tugas-penulis",
        "Tugas Penulis",
        "Fahami perkara yang hendak disampaikan, pilih isi berkaitan, susun isi, bina ayat lengkap dan gunakan bahasa yang betul.",
      ),
    ]),
    branch("tujuan", "Tujuan Penulisan", [
      node(
        "tujuan-maklumat",
        "Menyampaikan Maklumat",
        "Memberikan fakta atau pengetahuan. Contoh: menerangkan cara menjaga kebersihan sekolah.",
      ),
      node(
        "tujuan-menjelaskan",
        "Menjelaskan Sesuatu",
        "Menghuraikan sebab, cara, langkah, kesan atau kepentingan. Contoh: kepentingan bersenam.",
      ),
      node(
        "tujuan-cerita",
        "Menceritakan Pengalaman",
        "Menyampaikan kejadian mengikut urutan. Contoh: pengalaman menyertai gotong-royong.",
      ),
      node(
        "tujuan-gambaran",
        "Menggambarkan Sesuatu",
        "Membantu pembaca membayangkan orang, tempat, benda atau suasana. Contoh: suasana hari sukan.",
      ),
      node(
        "tujuan-pendapat",
        "Menyatakan Pendapat",
        "Memberikan pandangan, cadangan, harapan atau perasaan dengan alasan yang munasabah.",
      ),
      node(
        "tujuan-meyakinkan",
        "Meyakinkan Pembaca",
        "Mengemukakan alasan dan contoh supaya pembaca menerima pandangan atau melakukan tindakan yang baik.",
      ),
      node(
        "tujuan-prinsip",
        "Prinsip",
        "Tujuan penulisan menentukan jenis isi, nada dan bahasa yang sesuai.",
      ),
    ]),
    branch("ciri", "Ciri-ciri Penulisan yang Baik", [
      node(
        "ciri-arahan",
        "Menepati Arahan",
        "Jawapan membincangkan tugasan yang diberikan, bukan sekadar tema umum.",
      ),
      node(
        "ciri-idea",
        "Idea Utama Jelas",
        "Setiap perenggan isi membincangkan satu idea utama yang dinyatakan dengan jelas.",
      ),
      node(
        "ciri-relevan",
        "Isi Relevan",
        "Setiap isi menjawab tugasan, membawa idea baharu dan tidak berulang.",
      ),
      branch("ciri-huraian", "Isi Dihuraikan", [
        node("ciri-huraian-lemah", "Isi Sahaja", "Contoh lemah: Murid perlu membaca buku."),
        node(
          "ciri-huraian-baik",
          "Isi + Huraian + Contoh",
          "Murid perlu membaca buku pada waktu lapang kerana amalan ini menambahkan ilmu. Sebagai contoh, murid boleh membaca bahan ilmiah di pusat sumber.",
        ),
      ]),
      branch("ciri-susunan", "Susunan Teratur", [
        node("ciri-susunan-mula", "Permulaan", "Memperkenalkan tajuk atau situasi secara jelas."),
        node(
          "ciri-susunan-kembang",
          "Perkembangan",
          "Menghuraikan isi utama dalam perenggan yang berasingan.",
        ),
        node(
          "ciri-susunan-akhir",
          "Pengakhiran",
          "Merumuskan idea serta menyatakan penegasan atau harapan.",
        ),
      ]),
      branch("ciri-ayat", "Ayat Lengkap dan Gramatis", [
        node("ciri-ayat-salah", "Ayat Tidak Lengkap", "Walaupun semua murid telah bekerjasama."),
        node(
          "ciri-ayat-betul",
          "Ayat Lengkap",
          "Walaupun semua murid telah bekerjasama, kawasan itu masih belum dibersihkan sepenuhnya.",
        ),
      ]),
      branch("ciri-wacana", "Penanda Wacana Tepat", [
        node(
          "ciri-wacana-susun",
          "Menyusun Isi",
          "Pertama, antaranya, selain itu, di samping itu, seterusnya, akhir sekali.",
        ),
        node("ciri-wacana-contoh", "Memberikan Contoh", "Sebagai contoh, contohnya, misalnya."),
        node(
          "ciri-wacana-sebab",
          "Sebab atau Kesan",
          "Hal ini demikian kerana, oleh itu, dengan itu, akibatnya.",
        ),
        node("ciri-wacana-tutup", "Menutup", "Kesimpulannya, tegasnya."),
      ]),
      node(
        "ciri-baku",
        "Bahasa Baku",
        "Gunakan bahasa yang sopan, jelas dan sesuai. Elakkan bahasa pasar serta singkatan mesej.",
      ),
      node(
        "ciri-ejaan",
        "Ejaan dan Tanda Baca Betul",
        "Semak huruf besar, noktah, tanda koma dan ejaan kata baku.",
      ),
      node(
        "ciri-padat",
        "Jelas dan Padat",
        "Elakkan perkataan berlebihan. Tulis “naik ke pentas”, bukan “naik ke atas pentas”.",
      ),
    ]),
    branch("sebelum", "Langkah Sebelum Menulis", [
      node(
        "sebelum-baca",
        "1. Baca Arahan",
        "Kenal pasti tajuk, tugasan, bahan rangsangan, konteks dan jumlah patah perkataan jika ditetapkan.",
      ),
      branch("sebelum-kata-kunci", "2. Kenal Pasti Kata Kunci", [
        node(
          "sebelum-kata-kunci-contoh",
          "Contoh Arahan",
          "Jelaskan langkah-langkah menjaga kebersihan sekolah.",
        ),
        node("sebelum-kata-kunci-tugas", "Kata Tugas", "Jelaskan — jawapan memerlukan penerangan."),
        node(
          "sebelum-kata-kunci-fokus",
          "Fokus",
          "Langkah-langkah — jawapan perlu memberikan tindakan yang boleh dilakukan.",
        ),
        node("sebelum-kata-kunci-tema", "Tema", "Kebersihan sekolah."),
      ]),
      node(
        "sebelum-tujuan",
        "3. Tentukan Tujuan dan Pembaca",
        "Tentukan sebab menulis, perkara yang perlu difahami pembaca serta bahasa dan nada yang sesuai.",
      ),
      node(
        "sebelum-jana",
        "4. Jana Idea",
        "Catat kata kunci yang berkaitan. Contoh: tong sampah, gotong-royong, kitar semula dan kebersihan kelas.",
      ),
      node(
        "sebelum-pilih",
        "5. Pilih Isi Terbaik",
        "Pilih isi yang tepat, berbeza, mudah dihuraikan dan boleh disokong dengan contoh.",
      ),
      branch("sebelum-rangka", "6. Susun Rangka", [
        node("sebelum-rangka-mula", "Permulaan", "Perkenalkan isu kebersihan sekolah."),
        node(
          "sebelum-rangka-isi",
          "Isi",
          "Buang sampah ke dalam tong → gotong-royong → asingkan bahan kitar semula.",
        ),
        node(
          "sebelum-rangka-akhir",
          "Pengakhiran",
          "Tegaskan bahawa kebersihan ialah tanggungjawab bersama.",
        ),
      ]),
      branch("sebelum-imbak", "7. Rancang Isi dengan IMBAK", [
        node("sebelum-imbak-i", "I — Isi", "Nyatakan idea utama."),
        node("sebelum-imbak-m", "M — Mengapa", "Jelaskan sebab idea itu penting."),
        node("sebelum-imbak-b", "B — Bagaimana", "Terangkan cara idea itu dilaksanakan."),
        node(
          "sebelum-imbak-a",
          "A — Akibat/Kesan",
          "Nyatakan hasil jika diamalkan atau kesan jika diabaikan.",
        ),
        node("sebelum-imbak-k", "K — Kesimpulan Kecil", "Tegaskan semula isi perenggan."),
        node(
          "sebelum-imbak-guna",
          "Cara Menggunakan",
          "Pilih unsur yang sesuai dengan tugasan dan panjang penulisan; jangan menggunakannya secara kaku.",
        ),
      ]),
      node(
        "sebelum-masa",
        "8. Rancang Masa",
        "Bahagikan masa untuk memahami dan merangka, menulis, kemudian menyemak.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-tugas",
        "Tidak Menjawab Tugasan",
        "Gariskan kata tugas dan fokus supaya jawapan tidak tersasar daripada kehendak soalan.",
      ),
      node(
        "kesalahan-rangka",
        "Menulis Tanpa Rangka",
        "Catat susunan isi supaya idea tidak bercampur, berulang atau terhenti.",
      ),
      node(
        "kesalahan-huraian",
        "Isi Tanpa Huraian",
        "Tambah sebab, cara, contoh atau kesan; jangan hanya menyenaraikan idea.",
      ),
      node(
        "kesalahan-ulang",
        "Isi Berulang",
        "Pastikan setiap isi dalam rangka mempunyai fokus tersendiri.",
      ),
      branch("kesalahan-tergantung", "Ayat Tergantung", [
        node(
          "kesalahan-tergantung-salah",
          "Salah",
          "Walaupun pihak sekolah telah memberikan nasihat.",
        ),
        node(
          "kesalahan-tergantung-betul",
          "Betul",
          "Walaupun pihak sekolah telah memberikan nasihat, masih terdapat murid yang membuang sampah merata-rata.",
        ),
      ]),
      node(
        "kesalahan-panjang",
        "Ayat Terlalu Panjang",
        "Pisahkan ayat mengikut idea dan gunakan tanda baca yang sesuai.",
      ),
      node(
        "kesalahan-perenggan",
        "Tiada Pembahagian Perenggan",
        "Mulakan perenggan baharu apabila memulakan isi utama yang baharu.",
      ),
      node(
        "kesalahan-wacana",
        "Penanda Wacana Tidak Tepat",
        "Pilih penanda berdasarkan hubungan idea dan elakkan pengulangan berlebihan.",
      ),
      branch("kesalahan-bahasa", "Bahasa Pasar dan Singkatan", [
        node("kesalahan-bahasa-salah", "Salah", "Saye rasa budak sekarang main fon je."),
        node(
          "kesalahan-bahasa-betul",
          "Betul",
          "Saya berpendapat bahawa remaja pada masa kini terlalu kerap menggunakan telefon pintar.",
        ),
      ]),
      node(
        "kesalahan-ejaan",
        "Ejaan dan Tanda Baca",
        "Baca semula ayat satu demi satu untuk menyemak huruf besar, ejaan dan tanda baca.",
      ),
      node(
        "kesalahan-lewah",
        "Kata Berlebihan",
        "Tulis “sangat cantik” atau “cantik sekali”, bukan “sangat cantik sekali”; tulis “turun”, bukan “turun ke bawah”.",
      ),
      node(
        "kesalahan-akhir",
        "Tiada Pengakhiran",
        "Sediakan rumusan, penegasan atau harapan yang berkaitan dengan tajuk.",
      ),
      node(
        "kesalahan-semak",
        "Tidak Membuat Semakan",
        "Simpan masa untuk menyemak isi, ayat, ejaan, tanda baca dan arahan.",
      ),
    ]),
    branch("mengingat", "Teknik Mengingat", [
      branch("mengingat-proses", "FAHAM → RANGKA → TULIS → SEMAK", [
        node(
          "mengingat-proses-faham",
          "FAHAM",
          "Kenal pasti tema, kata tugas, fokus, tujuan dan syarat.",
        ),
        node("mengingat-proses-rangka", "RANGKA", "Jana, pilih dan susun isi yang tidak berulang."),
        node(
          "mengingat-proses-tulis",
          "TULIS",
          "Bina ayat lengkap, kembangkan isi dan gunakan penanda wacana.",
        ),
        node(
          "mengingat-proses-semak",
          "SEMAK",
          "Pastikan jawapan menepati arahan dan bahasa telah diperiksa.",
        ),
      ]),
      node(
        "mengingat-imbak",
        "IMBAK",
        "Isi → Mengapa → Bagaimana → Akibat/Kesan → Kesimpulan kecil.",
      ),
      branch("mengingat-ibs", "I-B-S", [
        node(
          "mengingat-ibs-i",
          "I — Isi",
          "Tepat, jelas, tidak berulang serta mempunyai huraian atau contoh.",
        ),
        node(
          "mengingat-ibs-b",
          "B — Bahasa",
          "Ayat lengkap, bahasa baku, ejaan dan tanda baca betul.",
        ),
        node(
          "mengingat-ibs-s",
          "S — Susunan",
          "Idea dan perenggan teratur serta penanda wacana tepat.",
        ),
      ]),
      node(
        "mengingat-bahagian",
        "Fungsi Bahagian",
        "Permulaan: buka dan perkenalkan • Isi: nyatakan dan huraikan • Pengakhiran: rumus dan tegaskan.",
      ),
    ]),
    branch("uasa", "Teknik Menjawab UASA", [
      branch("uasa-sebelum", "Sebelum Menulis", [
        node(
          "uasa-sebelum-teliti",
          "1. Teliti Arahan",
          "Baca soalan sekurang-kurangnya dua kali dan kenal pasti perkara yang wajib dijawab.",
        ),
        node(
          "uasa-sebelum-kunci",
          "2. Tandakan Kata Kunci",
          "Perhatikan kata tugas seperti jelaskan, huraikan, bincangkan, ceritakan atau gambarkan.",
        ),
        node(
          "uasa-sebelum-syarat",
          "3. Patuhi Syarat",
          "Semak bentuk, bahan rangsangan, konteks dan jumlah patah perkataan jika dinyatakan.",
        ),
        node(
          "uasa-sebelum-rangka",
          "4. Bina Rangka Ringkas",
          "Catat isi sebagai kata kunci dan susun mengikut urutan yang sesuai.",
        ),
      ]),
      branch("uasa-semasa", "Semasa Menulis", [
        node(
          "uasa-semasa-mula",
          "5. Mulakan dengan Jelas",
          "Perkenalkan tajuk atau situasi secara terus dan elakkan permulaan yang meleret.",
        ),
        node(
          "uasa-semasa-kembang",
          "6. Kembangkan Isi",
          "Gunakan unsur IMBAK mengikut kesesuaian; pastikan isi dan huraian jelas.",
        ),
        node(
          "uasa-semasa-perenggan",
          "7. Gunakan Perenggan",
          "Mulakan perenggan baharu bagi setiap isi utama yang baharu.",
        ),
        node(
          "uasa-semasa-hubung",
          "8. Hubungkan Idea",
          "Gunakan penanda wacana yang pelbagai dan tepat. Jangan memaksa ungkapan yang tidak sesuai.",
        ),
        node(
          "uasa-semasa-akhir",
          "9. Akhiri dengan Lengkap",
          "Rumuskan perkara utama dan berikan penegasan atau harapan.",
        ),
      ]),
      branch("uasa-selepas", "Selepas Menulis", [
        node(
          "uasa-selepas-isi",
          "10. Semak Isi",
          "Pastikan tugasan dijawab, isi relevan dan huraian serta contoh sesuai.",
        ),
        node(
          "uasa-selepas-bahasa",
          "11. Semak Bahasa",
          "Pastikan ayat lengkap, bahasa baku, ejaan, huruf besar dan tanda baca betul.",
        ),
        node(
          "uasa-selepas-susunan",
          "12. Semak Susunan",
          "Pastikan perenggan tersusun, idea mengalir dan pengakhiran lengkap.",
        ),
        node(
          "uasa-selepas-syarat",
          "13. Semak Syarat",
          "Pastikan semua maklumat penting digunakan dan had perkataan dipatuhi jika ditetapkan.",
        ),
      ]),
      node(
        "uasa-prinsip",
        "Prinsip Utama",
        "Jawapan yang baik menepati arahan, mempunyai isi jelas, huraian relevan, bahasa betul dan susunan yang mudah dibaca.",
      ),
    ]),
  ],
};
