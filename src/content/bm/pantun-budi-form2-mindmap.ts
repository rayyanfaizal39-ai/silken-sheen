import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-pantun-budi";

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

function stanza(id: string, title: string, meaning: string, keywords: string): MindNode {
  return branch(`maksud-${id}`, `Rangkap ${id} — ${title}`, [
    node(`maksud-${id}-huraian`, "Maksud", meaning),
    node(`maksud-${id}-kata-kunci`, "Kata Kunci", keywords),
  ]);
}

function supported(id: string, label: string, explanation: string, evidence: string): MindNode {
  return branch(id, label, [
    node(`${id}-huraian`, "Huraian", explanation),
    node(`${id}-bukti`, "Bukti Idea", evidence),
  ]);
}

export const bahasaMelayuTingkatan2PantunBudiMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PANTUN BUDI",
  summary:
    "Pantun Budi menekankan bahawa budi bahasa dan jasa yang baik amat bernilai dalam kehidupan. Seseorang yang berbudi akan dihormati, manakala martabat masyarakat dan bangsa turut dinilai melalui bahasa serta tingkah lakunya.",
  children: [
    branch("maksud-rangkap", "Maksud Rangkap", [
      stanza(
        "1",
        "Jasa Dikenang",
        "Budi dan jasa baik seseorang akan sentiasa dikenang serta menjadi sebutan orang.",
        "JASA → DIKENANG",
      ),
      stanza(
        "2",
        "Budi dan Bahasa",
        "Seseorang yang baik memperlihatkan budi yang luhur melalui bahasa dan tingkah laku yang baik.",
        "BUDI + BAHASA",
      ),
      stanza(
        "3",
        "Manusia Tanpa Budi",
        "Manusia yang tidak berbudi bahasa akan dipandang rendah dan hina oleh masyarakat.",
        "TIADA BUDI → DIPANDANG HINA",
      ),
      stanza(
        "4",
        "Kekayaan Mengatasi Budi",
        "Pantun mengkritik lumrah masyarakat yang mengutamakan kekayaan sehingga nilai budi diketepikan; sikap ini bukan teladan yang wajar diikuti.",
        "KEKAYAAN vs BUDI",
      ),
      stanza(
        "5",
        "Budi Lebih Utama daripada Kemewahan",
        "Kemiskinan atau kehidupan sederhana bukan penghalang untuk seseorang terus berbudi bahasa.",
        "SEDERHANA + BERBUDI",
      ),
      stanza(
        "6",
        "Budi Memuliakan Diri dan Bangsa",
        "Budi menjadikan seseorang dipandang mulia, manakala bahasa yang baik meninggikan martabat bangsa.",
        "BUDI → MULIA; BAHASA → MARTABAT BANGSA",
      ),
      stanza(
        "7",
        "Kebijaksanaan yang Sepadan",
        "Orang yang bijak akan lebih menyerlah apabila bertemu dengan orang yang setara dari segi kebijaksanaan dan kebolehan.",
        "BIJAK + BIJAK → SEPADAN",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "KEPENTINGAN BUDI BAHASA DALAM KEHIDUPAN", [
        node(
          "tema-huraian",
          "Huraian",
          "Budi bahasa memuliakan diri, memastikan jasa dikenang dan mencerminkan martabat sesebuah bangsa.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema Pantun Budi ialah kepentingan budi bahasa dalam kehidupan kerana orang yang berbudi dihormati dan bahasa yang baik meninggikan martabat bangsa.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-jasa",
        "Jasa yang Baik Sentiasa Dikenang",
        "Kebaikan seseorang kekal dalam ingatan dan menjadi sebutan masyarakat.",
        "Rangkap 1 menegaskan bahawa budi yang baik dikenang.",
      ),
      supported(
        "persoalan-budi",
        "Kepentingan Budi dalam Kehidupan",
        "Budi memperlihatkan kemuliaan diri dan membentuk penghormatan masyarakat.",
        "Idea ini disokong oleh Rangkap 2 dan Rangkap 6.",
      ),
      supported(
        "persoalan-tanpa-budi",
        "Kehinaan Manusia yang Tidak Berbudi",
        "Ketiadaan budi menyebabkan seseorang dipandang rendah.",
        "Rangkap 3 membandingkan kehinaan manusia tanpa budi.",
      ),
      supported(
        "persoalan-kekayaan",
        "Kekayaan Diutamakan sehingga Budi Terpinggir",
        "Masyarakat dikritik apabila harta dijadikan ukuran utama dan nilai budi dilupakan.",
        "Rangkap 4 ialah teguran sosial, bukannya galakan mengutamakan kekayaan.",
      ),
      supported(
        "persoalan-kemiskinan",
        "Kemiskinan Bukan Penghalang untuk Berbudi",
        "Kehidupan sederhana tidak menghalang seseorang daripada berakhlak mulia.",
        "Rangkap 5 mengutamakan budi walaupun hidup serba kekurangan.",
      ),
      supported(
        "persoalan-bangsa",
        "Bahasa Mencerminkan Martabat Bangsa",
        "Tutur kata dan penggunaan bahasa menggambarkan ketinggian sesebuah bangsa.",
        "Rangkap 6 menghubungkan bahasa dengan martabat bangsa.",
      ),
      supported(
        "persoalan-bijak",
        "Kebijaksanaan Menyerlah apabila Bertemu yang Sepadan",
        "Kebijaksanaan dan kebolehan lebih terserlah dalam pasangan atau pertemuan yang setara.",
        "Rangkap 7 menggambarkan kebijaksanaan yang sepadan.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Identiti Karya",
        "Puisi tradisional jenis pantun dalam antologi Baik Budi, Indah Bahasa, Tingkatan 2.",
      ),
      node("bentuk-rangkap", "Tujuh Rangkap", "Pantun ini mengandungi tujuh rangkap."),
      node("bentuk-baris", "Empat Baris Serangkap", "Setiap rangkap mempunyai empat baris."),
      node(
        "bentuk-kerat",
        "Pantun Empat Kerat",
        "Setiap rangkap dibina daripada empat kerat atau baris.",
      ),
      node(
        "bentuk-pembayang",
        "Pembayang dan Maksud",
        "Dua baris pertama ialah pembayang, manakala dua baris terakhir menyampaikan maksud.",
      ),
      node(
        "bentuk-kata",
        "Tiga hingga Enam Patah Kata",
        "Setiap baris mengandungi antara tiga hingga enam patah kata.",
      ),
      node(
        "bentuk-suku-kata",
        "Lima hingga Sebelas Suku Kata",
        "Bilangan suku kata setiap baris adalah antara lima hingga sebelas.",
      ),
      node(
        "bentuk-rima",
        "Rima Dominan abab; Rangkap 5 aaaa",
        "Rangkap 1 hingga 4 serta Rangkap 6 dan 7 berima akhir abab; Rangkap 5 berima akhir aaaa.",
      ),
      node(
        "bentuk-terikat",
        "Bentuk Terikat",
        "Pantun mematuhi pola rangkap, baris, pembayang dan maksud.",
      ),
    ]),
    branch("ciri-pantun", "Ciri Pantun", [
      node(
        "ciri-pembayang",
        "Pembayang",
        "Dua baris awal membina imej dan bunyi sebelum maksud disampaikan.",
      ),
      node(
        "ciri-maksud",
        "Maksud",
        "Dua baris akhir menyampaikan gagasan tentang budi, bahasa dan kebijaksanaan.",
      ),
      node(
        "ciri-rima",
        "Rima Teratur",
        "Persamaan bunyi akhir menghasilkan irama yang mudah diingati.",
      ),
      node("ciri-alam", "Unsur Alam", "Imej alam digunakan terutamanya dalam bahagian pembayang."),
      node(
        "ciri-padat",
        "Bahasa Padat",
        "Setiap rangkap membawa satu idea yang ringkas tetapi bernilai.",
      ),
      node(
        "ciri-seimbang",
        "Pembayang dan Maksud Seimbang",
        "Dua baris pembayang diikuti dua baris maksud dalam setiap rangkap.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      supported(
        "gaya-imej-alam",
        "Imej Alam",
        "Unsur alam menghidupkan pembayang dan membina gambaran yang konkrit.",
        "Antara imej yang digunakan ialah air, laut, bunga, batu dan daun.",
      ),
      supported(
        "gaya-simile",
        "Simile",
        "Perbandingan langsung menonjolkan kesepadanan dua pihak.",
        "Contoh pendek Rangkap 7: ‘Bagai cincin dengan permata’.",
      ),
      supported(
        "gaya-repetisi",
        "Repetisi",
        "Pengulangan kata memberi penegasan dan rentak.",
        "Contoh pendek Rangkap 5: ‘Pandai melompat pandai berlari’.",
      ),
      supported(
        "gaya-asonansi",
        "Asonansi",
        "Pengulangan bunyi vokal menghasilkan kemerduan.",
        "Bunyi a berulang dalam frasa pendek ‘Tinggi bangsa kerana bahasa’.",
      ),
      supported(
        "gaya-aliterasi",
        "Aliterasi",
        "Pengulangan bunyi konsonan menguatkan irama pantun.",
        "Bunyi p berulang dalam frasa pendek ‘Tingkap papan kayu bersegi’.",
      ),
      supported(
        "gaya-kata-ganda",
        "Kata Ganda",
        "Penggandaan kata membina rentak dan menggambarkan keadaan yang berterusan.",
        "Contoh pendek Rangkap 1: ‘tenang-tenang’.",
      ),
      supported(
        "gaya-sinkope",
        "Sinkope",
        "Pemendekan kata mewujudkan gaya bahasa lisan yang bersahaja.",
        "Contoh pendek Rangkap 1: ‘nak’.",
      ),
      node(
        "gaya-had",
        "Had Petikan",
        "Gunakan contoh pendek yang disahkan; jangan menyalin keseluruhan rangkap atau mencipta baris pantun.",
      ),
    ]),
    branch("konsep-budi", "Konsep Budi", [
      node(
        "budi-bukan-baik",
        "Budi Bukan Sekadar ‘Baik’",
        "Budi merangkumi tindakan, pertuturan, sikap dan sumbangan yang mendatangkan manfaat kepada orang lain.",
      ),
      node(
        "budi-perbuatan",
        "Perbuatan",
        "Tindakan yang beradab, bertimbang rasa dan membawa kebaikan.",
      ),
      node("budi-jasa", "Jasa", "Sumbangan atau kebaikan yang dikenang oleh penerimanya."),
      node("budi-bahasa", "Bahasa", "Tutur kata yang sopan mencerminkan kehalusan budi."),
      node("budi-tingkah", "Tingkah Laku", "Kelakuan yang santun memperlihatkan budi seseorang."),
      node("budi-sikap", "Sikap", "Keikhlasan, kebijaksanaan dan rasa hormat melengkapkan budi."),
      node(
        "budi-aliran",
        "BUDI BAIK → DIHORMATI → DIKENANG",
        "Budi yang diamalkan membina penghormatan dan meninggalkan jasa dalam ingatan masyarakat.",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-budi",
        "Berbudi Bahasa",
        "Seseorang menjaga tutur kata dan tingkah laku agar dipandang mulia.",
        "Rangkap 2, 5 dan 6 menegaskan amalan budi bahasa.",
      ),
      supported(
        "nilai-jasa",
        "Mengenang Jasa",
        "Kebaikan dan sumbangan orang lain wajar dihargai serta diingati.",
        "Rangkap 1 menonjolkan jasa yang dikenang.",
      ),
      supported(
        "nilai-bijak",
        "Kebijaksanaan",
        "Kebijaksanaan membantu seseorang mengenali kesepadanan dan membawa diri dengan baik.",
        "Rangkap 7 menonjolkan pertemuan orang yang setara kebijaksanaannya.",
      ),
      supported(
        "nilai-sopan",
        "Kesopanan",
        "Bahasa dan perlakuan yang sopan mencerminkan budi yang luhur.",
        "Rangkap 2 dan 6 menghubungkan budi dengan bahasa.",
      ),
      supported(
        "nilai-rendah",
        "Rendah Hati dan Kesederhanaan",
        "Kemuliaan tidak bergantung pada pakaian, harta atau kemewahan.",
        "Rangkap 4 dan 5 mengingatkan agar budi tidak dikalahkan oleh ukuran kebendaan.",
      ),
      supported(
        "nilai-hargai",
        "Menghargai Kebaikan",
        "Kebaikan orang lain hendaklah dibalas dengan penghargaan dan ingatan yang baik.",
        "Rangkap 1 menunjukkan budi baik menjadi sebutan.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-budi",
        "Kita Hendaklah Berbudi Bahasa",
        "Amalkan bahasa dan tingkah laku yang sopan supaya diri dihormati.",
      ),
      node(
        "pengajaran-jasa",
        "Kita Hendaklah Mengenang Jasa",
        "Hargai orang yang pernah berbuat baik dan jangan melupakan sumbangannya.",
      ),
      node(
        "pengajaran-harta",
        "Kita Janganlah Mengutamakan Kekayaan daripada Budi",
        "Harta bukan ukuran mutlak kemuliaan seseorang.",
      ),
      node(
        "pengajaran-sederhana",
        "Kita Hendaklah Tetap Berbudi walaupun Hidup Sederhana",
        "Kekurangan kebendaan bukan alasan untuk meninggalkan adab.",
      ),
      node(
        "pengajaran-bahasa",
        "Kita Hendaklah Menjaga Tutur Kata",
        "Bahasa yang baik memuliakan diri dan meninggikan martabat bangsa.",
      ),
      node(
        "pengajaran-bijak",
        "Kita Hendaklah Bertindak dengan Bijaksana",
        "Gunakan kebijaksanaan ketika memilih teman, pasangan dan tindakan.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node("kata-tangga", "TANGGA INGATAN", "JASA ↓ BUDI ↓ BAHASA ↓ MULIA ↓ BANGSA"),
      node(
        "kata-budi",
        "BUDI BAIK",
        "DIKENANG → DIHORMATI → MEMULIAKAN DIRI → MENINGGIKAN MARTABAT BANGSA",
      ),
      node("kata-r1", "Rangkap 1", "BUAT BAIK → JASA DIKENANG"),
      node("kata-r2-r3", "Rangkap 2–3", "ADA BUDI → MULIA; TIADA BUDI → HINA"),
      node("kata-r4-r5", "Rangkap 4–5", "BUDI > HARTA; SEDERHANA TETAP BERBUDI"),
      node("kata-r6", "Rangkap 6", "BUDI → DIRI DIMULIAKAN; BAHASA → BANGSA DIMARTABATKAN"),
      node("kata-r7", "Rangkap 7", "BIJAK + BIJAK → SEPADAN"),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node(
        "jawab-maksud",
        "Maksud Rangkap",
        "IDEA UTAMA + PARAFRASA DENGAN BAHASA SENDIRI; jangan salin baris pantun.",
      ),
      node("jawab-tema", "Tema", "TEMA + DUA IDEA SOKONGAN: kemuliaan diri dan martabat bangsa."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + HURAIAN + RANGKAP SOKONGAN."),
      node("jawab-nilai", "Nilai", "NILAI + HURAIAN BERDASARKAN SIKAP ATAU TINDAKAN."),
      node(
        "jawab-pengajaran",
        "Pengajaran",
        "Mulakan dengan ‘Kita hendaklah...’ atau ‘Kita janganlah...’, kemudian nyatakan tindakan.",
      ),
      node(
        "jawab-bentuk",
        "Bentuk",
        "CIRI + BUKTI. Nyatakan pengecualian Rangkap 5 apabila menjawab tentang rima.",
      ),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + CONTOH PENDEK YANG DISAHKAN + FUNGSI."),
      node(
        "jawab-budi",
        "Huraikan Konsep Budi",
        "ASPEK BUDI + KESAN. Contoh: bahasa sopan → diri dihormati.",
      ),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "salah-budi-wang",
        "Budi = Wang",
        "Budi merangkumi jasa, bahasa, perbuatan, sikap dan tingkah laku; budi bukan wang.",
      ),
      node(
        "salah-tema",
        "Tema = Kekayaan",
        "Kekayaan hanyalah unsur teguran dalam Rangkap 4. Tema utama ialah kepentingan budi bahasa.",
      ),
      node(
        "salah-bahasa",
        "Budi Bahasa = Bahasa Sahaja",
        "Budi bahasa turut meliputi perbuatan, adab, sikap dan tingkah laku.",
      ),
      node(
        "salah-r4",
        "Rangkap 4 Dianggap Galakan",
        "Rangkap 4 mengkritik masyarakat yang mengutamakan kekayaan; pantun tidak menyokong sikap itu.",
      ),
      node(
        "salah-miskin",
        "Kemiskinan = Kehinaan",
        "Rangkap 5 menegaskan bahawa hidup sederhana tidak menghalang seseorang daripada berbudi.",
      ),
      node(
        "salah-nilai",
        "Nilai Disamakan dengan Pengajaran",
        "Nilai: berbudi bahasa. Pengajaran: Kita hendaklah berbudi bahasa.",
      ),
      node(
        "salah-pembayang",
        "Pembayang Disamakan dengan Maksud",
        "Dua baris awal ialah pembayang; dua baris akhir membawa maksud.",
      ),
      node(
        "salah-rima",
        "Semua Rima Dianggap abab",
        "Rima dominan ialah abab, tetapi Rangkap 5 berima aaaa.",
      ),
      node(
        "salah-salin",
        "Menyalin Rangkap sebagai Maksud",
        "Parafrasa idea dengan ayat sendiri tanpa menyalin keseluruhan pantun.",
      ),
      node(
        "salah-petikan",
        "Petikan Terlalu Panjang",
        "Gunakan bukti pendek yang tepat dan elakkan menyalin keseluruhan rangkap.",
      ),
    ]),
  ],
};
