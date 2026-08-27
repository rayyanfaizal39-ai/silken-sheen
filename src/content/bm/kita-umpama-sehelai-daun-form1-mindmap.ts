import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-kita-umpama-sehelai-daun";

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

function supported(id: string, label: string, explanation: string, support: string): MindNode {
  return branch(id, label, [
    node(`${id}-huraian`, "Huraian", explanation),
    node(`${id}-sokongan`, "Idea / Rangkap Sokongan", support),
  ]);
}

export const bahasaMelayuTingkatan1KitaUmpamaSehelaiDaunMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KITA UMPAMA\nSEHELAI DAUN",
  summary:
    "Sajak mengingatkan bahawa kehidupan manusia bersifat sementara. Oleh itu, manusia hendaklah berbuat jasa, membantu golongan yang memerlukan dan meninggalkan kebaikan yang terus bermanfaat.",
  children: [
    branch("maksud-rangkap", "Maksud Rangkap", [
      node(
        "maksud-rangkap-1",
        "Rangkap 1 — Hidup Hendaklah Bermanfaat",
        "Manusia diumpamakan seperti daun yang tumbuh dan berkembang. Sebagaimana daun memberikan teduhan kepada unggas, manusia hendaklah memberikan manfaat kepada makhluk lain. HIDUP → MEMBESAR → MEMBERI MANFAAT.",
      ),
      node(
        "maksud-rangkap-2",
        "Rangkap 2 — Jangan Kedekut Berbuat Jasa",
        "Sikap kikir untuk memberikan jasa dan bakti menyebabkan golongan yang lemah kehilangan bantuan serta tempat bergantung. KIKIR → TIADA BANTUAN → ORANG LAIN MENDERITA.",
      ),
      node(
        "maksud-rangkap-3",
        "Rangkap 3 — Hidup Tidak Kekal",
        "Manusia akan menjadi tua dan meninggal dunia. Oleh itu, manusia tidak patut angkuh akan keupayaan diri sehingga melupakan golongan duafa. HIDUP SEMENTARA → JANGAN SOMBONG → PRIHATIN.",
      ),
      node(
        "maksud-rangkap-4",
        "Rangkap 4 — Tinggalkan Jasa",
        "Manusia hendaklah menjalani kehidupan yang bermanfaat. Seperti daun kering yang menjadi baja, jasa seseorang boleh terus memberikan manfaat selepas kehidupannya berakhir. HIDUP → BERJASA → MANFAAT BERTERUSAN.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "MANUSIA HENDAKLAH BERBUAT JASA DALAM KEHIDUPAN", [
        node(
          "tema-huraian",
          "Huraian",
          "Penyajak menyeru manusia supaya menggunakan kehidupan yang sementara untuk memberikan manfaat, membantu golongan yang memerlukan dan tidak mementingkan diri sendiri.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema sajak Kita Umpama Sehelai Daun ialah manusia hendaklah berbuat jasa dalam kehidupan. Kehidupan manusia bersifat sementara dan seharusnya digunakan untuk memberikan manfaat kepada orang lain.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-jasa",
        "Kepentingan Berbuat Jasa",
        "Manusia hendaklah menyumbangkan kebaikan kepada masyarakat.",
        "Rangkap 1 dan 4 menggambarkan daun yang memberikan teduhan dan terus bermanfaat sebagai baja.",
      ),
      supported(
        "persoalan-prihatin",
        "Keprihatinan terhadap Golongan yang Memerlukan",
        "Golongan yang lemah dan kurang bernasib baik tidak seharusnya diabaikan.",
        "Rangkap 2 dan 3 menyebut unggas yang memerlukan perlindungan serta makhluk duafa yang mencari tempat bergantung.",
      ),
      supported(
        "persoalan-rendah-hati",
        "Sikap Rendah Hati",
        "Manusia tidak sepatutnya sombong dengan keupayaan yang dimiliki.",
        "Rangkap 3 mengingatkan bahawa keupayaan manusia bersifat sementara.",
      ),
      supported(
        "persoalan-tidak-penting-diri",
        "Sikap Tidak Mementingkan Diri",
        "Sikap kikir memberikan bantuan akan menyusahkan pihak yang memerlukan.",
        "Rangkap 2 menunjukkan kesan apabila jasa dan bakti tidak diberikan.",
      ),
      supported(
        "persoalan-sementara",
        "Kesedaran tentang Kehidupan yang Sementara",
        "Manusia perlu sedar bahawa usia dan keupayaan tidak kekal.",
        "Rangkap 3 menggunakan keadaan daun yang bakal kering untuk menggambarkan usia manusia.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Identiti Karya",
        "Kita Umpama Sehelai Daun ialah sajak atau puisi moden karya SMahadzir dalam antologi Kuingin Berterima Kasih.",
      ),
      node("bentuk-rangkap", "Empat Rangkap", "Sajak ini terdiri daripada empat rangkap."),
      node("bentuk-rangkap-1", "Rangkap 1", "Lima baris dengan rima akhir ababc."),
      node("bentuk-rangkap-2", "Rangkap 2", "Empat baris dengan rima akhir abcd."),
      node("bentuk-rangkap-3", "Rangkap 3", "Lima baris dengan rima akhir abcbd."),
      node("bentuk-rangkap-4", "Rangkap 4", "Tiga baris dengan rima akhir abb."),
      node(
        "bentuk-bebas",
        "Bentuk Bebas",
        "Bilangan baris dan susunan rima tidak sama bagi setiap rangkap, maka sajak ini berbentuk bebas.",
      ),
      node(
        "bentuk-sempadan",
        "Butiran yang Tidak Digunakan",
        "Bilangan perkataan dan suku kata tidak dimasukkan kerana arahan topik mengehadkan bentuk kepada butiran yang benar-benar diperlukan.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      branch("gaya-simile", "Simile", [
        node("gaya-simile-contoh", "Contoh Ringkas", "‘umpama sehelai daun’"),
        node(
          "gaya-simile-kesan",
          "Kesan",
          "Perbandingan ini memudahkan pembaca membayangkan kehidupan manusia yang sementara tetapi mampu memberikan manfaat.",
        ),
      ]),
      branch("gaya-personifikasi", "Personifikasi", [
        node("gaya-personifikasi-contoh", "Contoh Ringkas", "‘tempat bercanda unggas meriang’"),
        node(
          "gaya-personifikasi-kesan",
          "Kesan",
          "Gambaran yang hidup menguatkan peranan daun sebagai tempat unggas menikmati perlindungan.",
        ),
      ]),
      branch("gaya-repetisi", "Repetisi", [
        node(
          "gaya-repetisi-bukti",
          "Bukti",
          "Perbandingan manusia dengan sehelai daun diulang pada permulaan rangkap 1 dan rangkap 3.",
        ),
        node(
          "gaya-repetisi-kesan",
          "Kesan",
          "Pengulangan menegaskan simbol utama dan mesej sajak.",
        ),
      ]),
      branch("gaya-imej-alam", "Imej Alam", [
        node("gaya-imej-alam-contoh", "Contoh", "Daun, ranting, unggas dan mentari."),
        node(
          "gaya-imej-alam-kesan",
          "Kesan",
          "Imej alam menghubungkan kitaran hidup daun dengan kehidupan manusia.",
        ),
      ]),
      branch("gaya-hiperbola", "Hiperbola", [
        node("gaya-hiperbola-contoh", "Contoh Ringkas", "‘tusukan bahang memijar’"),
        node(
          "gaya-hiperbola-kesan",
          "Kesan",
          "Ungkapan yang diperhebat menonjolkan kesukaran unggas tanpa tempat berlindung.",
        ),
      ]),
      branch("gaya-asonansi", "Asonansi", [
        node("gaya-asonansi-contoh", "Contoh Ringkas", "‘umpama sehelai daun’"),
        node(
          "gaya-asonansi-kesan",
          "Kesan",
          "Pengulangan bunyi vokal menghasilkan kesan bunyi yang teratur.",
        ),
      ]),
      branch("gaya-aliterasi", "Aliterasi", [
        node("gaya-aliterasi-contoh", "Contoh Ringkas", "‘hijau menunas menyegar mata’"),
        node(
          "gaya-aliterasi-kesan",
          "Kesan",
          "Pengulangan bunyi konsonan menimbulkan kemerduan dan penegasan.",
        ),
      ]),
      node(
        "gaya-amaran",
        "Had Petikan",
        "Gunakan hanya frasa pendek yang telah disahkan. Jangan menyalin rangkap penuh atau mereka-reka baris sajak.",
      ),
    ]),
    branch("simbol-daun", "Simbol Daun", [
      node(
        "simbol-muda",
        "Daun Muda",
        "Melambangkan permulaan dan perkembangan kehidupan manusia.",
      ),
      node(
        "simbol-teduh",
        "Daun Memberikan Teduhan",
        "Melambangkan manusia yang membantu serta memberikan manfaat kepada pihak lain.",
      ),
      node(
        "simbol-kering",
        "Daun Menjadi Kering",
        "Melambangkan proses penuaan dan kehidupan manusia yang bersifat sementara.",
      ),
      node("simbol-gugur", "Daun Gugur", "Melambangkan berakhirnya kehidupan manusia."),
      node(
        "simbol-baja",
        "Daun Menjadi Baja",
        "Melambangkan jasa yang terus memberikan manfaat walaupun seseorang telah meninggal dunia.",
      ),
      node(
        "simbol-aliran",
        "DAUN — KITARAN KEHIDUPAN",
        "TUMBUH → MEMBERI TEDUH → MENJADI TUA → GUGUR → TERUS MEMBERI MANFAAT.",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-baik-hati",
        "Baik Hati",
        "Kesediaan memberikan manfaat kepada makhluk lain.",
        "Daun dijadikan lambang insan yang memberikan teduhan dan jasa.",
      ),
      supported(
        "nilai-prihatin",
        "Keprihatinan dan Simpati",
        "Kepekaan terhadap golongan yang lemah atau kurang bernasib baik.",
        "Unggas kecil dan makhluk duafa digambarkan memerlukan tempat berlindung.",
      ),
      supported(
        "nilai-tanggungjawab",
        "Tanggungjawab",
        "Manusia bertanggungjawab memberikan sumbangan kepada masyarakat.",
        "Penyajak menyeru manusia supaya menabur jasa dan bakti sepanjang hidup.",
      ),
      supported(
        "nilai-rendah-hati",
        "Rendah Hati",
        "Manusia tidak angkuh dengan keupayaan diri.",
        "Rangkap 3 mengingatkan bahawa keupayaan dan kehidupan tidak kekal.",
      ),
      supported(
        "nilai-keinsafan",
        "Keinsafan",
        "Kesedaran bahawa manusia akan menjadi tua dan meninggal dunia.",
        "Daun yang kering dan gugur melambangkan pengakhiran hidup.",
      ),
      supported(
        "nilai-kesyukuran",
        "Kesyukuran",
        "Nikmat serta keupayaan diri digunakan untuk memberikan manfaat.",
        "Penyajak menyeru manusia memanfaatkan keupayaan sebelum usia berakhir.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-jasa",
        "Kita Hendaklah Berbuat Jasa",
        "Gunakan kebolehan dan masa hidup untuk memberikan manfaat kepada orang lain.",
      ),
      node(
        "pengajaran-bantu",
        "Kita Hendaklah Membantu Golongan yang Memerlukan",
        "Kita perlu prihatin terhadap golongan yang lemah serta kurang bernasib baik.",
      ),
      node(
        "pengajaran-sombong",
        "Kita Tidak Sewajarnya Bersikap Sombong",
        "Keupayaan dan kelebihan diri hanya bersifat sementara.",
      ),
      node(
        "pengajaran-penting-diri",
        "Kita Hendaklah Mengelakkan Sikap Mementingkan Diri",
        "Keengganan membantu boleh menyebabkan pihak lain menghadapi kesusahan.",
      ),
      node(
        "pengajaran-insaf",
        "Kita Hendaklah Menginsafi Kehidupan",
        "Hidup yang sementara perlu diisi dengan tindakan yang bermanfaat.",
      ),
      node(
        "pengajaran-syukur",
        "Kita Hendaklah Bersyukur",
        "Gunakan nikmat dan keupayaan yang dimiliki secara bertanggungjawab.",
      ),
    ]),
    branch("nada", "Nada", [
      node(
        "nada-romantis",
        "ROMANTIS — NADA YANG DISAHKAN",
        "Sajak menggunakan imej alam yang tenang dan indah untuk menyampaikan renungan tentang kehidupan serta jasa manusia.",
      ),
      node(
        "nada-nasihat",
        "Nasihat — Kesan Mesej",
        "Penyajak menasihati pembaca supaya berbuat jasa, tidak sombong dan menyedari bahawa hidup bersifat sementara.",
      ),
      node(
        "nada-seruan",
        "Seruan — Cara Penyampaian",
        "Penyajak menyeru manusia agar menjadi insan yang bermanfaat kepada makhluk lain.",
      ),
      node(
        "nada-beza",
        "Bezakan Istilah",
        "Untuk analisis KOMSAS, romantis ialah nada formal yang lazim diterima; nasihat dan seruan menerangkan kesan serta tujuan mesej sajak.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kata-rangkap-1",
        "Rangkap 1 — MANFAAT",
        "Daun dan manusia memberikan manfaat kepada pihak lain.",
      ),
      node("kata-rangkap-2", "Rangkap 2 — BANTU", "Jangan kikir memberikan jasa dan bantuan."),
      node(
        "kata-rangkap-3",
        "Rangkap 3 — INSAF",
        "Hidup sementara; jangan sombong dan lupakan golongan duafa.",
      ),
      node(
        "kata-rangkap-4",
        "Rangkap 4 — BERJASA",
        "Kebaikan boleh terus bermanfaat selepas hidup berakhir.",
      ),
      node("kata-empat", "EMPAT RANGKAP", "MANFAAT → BANTU → INSAF → BERJASA."),
      node("kata-daun", "DAUN = KEHIDUPAN MANUSIA", "TUMBUH → MEMBERI → TUA → GUGUR → JASA KEKAL."),
      node(
        "kata-peta",
        "KITA UMPAMA SEHELAI DAUN — PETA INGATAN",
        "HIDUP → BERMANFAAT → BANTU ORANG → JANGAN SOMBONG → INSAF → TINGGALKAN JASA.",
      ),
      node("kata-mesej", "MESEJ TERAS", "HIDUP SEMENTARA + JASA BOLEH BERKEKALAN."),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-maksud", "Maksud Rangkap", "IDEA + PARAFRASA. Jangan salin seluruh rangkap."),
      node("jawab-tema", "Tema", "TEMA + DUA IDEA SOKONGAN."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + IDEA RANGKAP."),
      node("jawab-nilai", "Nilai", "NILAI + HURAIAN."),
      node(
        "jawab-pengajaran",
        "Pengajaran",
        "Mulakan dengan ‘Kita hendaklah...’ + tindakan atau pelajaran.",
      ),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + CONTOH PENDEK YANG DISAHKAN + KESAN."),
      node("jawab-simbol", "Simbol", "OBJEK + PERKARA YANG DILAMBANGKAN."),
      node(
        "jawab-simbol-contoh",
        "Contoh Simbol",
        "Daun yang kering → kehidupan manusia yang semakin tua.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-literal",
        "Daun Ditafsir Secara Literal Sahaja",
        "Daun juga menjadi simbol kehidupan manusia, bukannya tumbuhan semata-mata.",
      ),
      node(
        "kesalahan-alam",
        "Tema = Alam Sekitar",
        "Imej alam digunakan untuk menyampaikan mesej tentang tingkah laku manusia dan amalan berbuat jasa.",
      ),
      node(
        "kesalahan-daun",
        "Tema = Daun",
        "Daun ialah imej dan simbol utama, bukan rumusan tema yang lengkap.",
      ),
      node(
        "kesalahan-salin",
        "Maksud Rangkap Disalin Bulat-bulat",
        "Parafrasa idea rangkap dengan bahasa sendiri tanpa menyalin keseluruhan sajak.",
      ),
      node(
        "kesalahan-nilai",
        "Nilai dan Pengajaran Keliru",
        "Nilai: keprihatinan. Pengajaran: Kita hendaklah prihatin terhadap golongan yang memerlukan.",
      ),
      node(
        "kesalahan-kering",
        "‘Kering’ Ditafsir Secara Literal Sahaja",
        "Dalam konteks simbolik sajak, daun yang kering turut menggambarkan penuaan dan kehidupan yang menuju penghujung.",
      ),
      node(
        "kesalahan-nada",
        "Nada dan Mesej Disamakan",
        "Nada formalnya romantis, manakala nasihat dan seruan menerangkan kesan serta tujuan mesej.",
      ),
      node(
        "kesalahan-gaya",
        "Gaya Bahasa Direka",
        "Jangan menambah teknik atau contoh tanpa bukti daripada teks yang disahkan.",
      ),
      node(
        "kesalahan-petikan",
        "Petikan Direka",
        "Jangan mereka-reka baris sajak. Gunakan frasa pendek yang telah disahkan sahaja.",
      ),
      node(
        "kesalahan-tema-umum",
        "Tema Terlalu Umum",
        "‘Kehidupan manusia’ terlalu umum; nyatakan bahawa manusia hendaklah berbuat jasa dalam kehidupan.",
      ),
    ]),
  ],
};
