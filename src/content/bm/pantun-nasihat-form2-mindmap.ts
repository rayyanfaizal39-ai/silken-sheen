import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-pantun-nasihat";

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

export const bahasaMelayuTingkatan2PantunNasihatMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PANTUN NASIHAT",
  summary:
    "Pantun Nasihat memberikan panduan tentang cara menjalani kehidupan dengan baik melalui amalan kebaikan, menjauhi keburukan, menjaga tutur kata, mengawal emosi dan memelihara adab dalam masyarakat.",
  children: [
    branch("maksud-rangkap", "Maksud Rangkap", [
      branch("maksud-1", "Rangkap 1 — Kebaikan dan Kejahatan", [
        node(
          "maksud-1-huraian",
          "Maksud",
          "Apabila melakukan kebaikan, seseorang perlu bertindak secara wajar dan tidak berlebih-lebihan, manakala perbuatan jahat hendaklah dijauhi sama sekali.",
        ),
        node(
          "maksud-1-berpada",
          "Maksud ‘Berpada-pada’",
          "Bertindak dengan sesuai, bijaksana dan mengikut keadaan; ungkapan ini bukan bermaksud jangan terlalu baik.",
        ),
        node("maksud-1-kata-kunci", "Kata Kunci", "BUAT BAIK → BERPADA-PADA; BUAT JAHAT → JANGAN"),
      ]),
      stanza(
        "2",
        "Jauhi Perkara Haram",
        "Seseorang hendaklah menjauhi perkara yang haram, memudaratkan atau memabukkan dan tidak mencubanya walaupun sekali.",
        "HARAM + MUDARAT → JAUHI",
      ),
      stanza(
        "3",
        "Jangan Larut dalam Kesedihan",
        "Perasaan sedih dan risau tidak seharusnya dibiarkan berpanjangan kerana keadaan tersebut boleh memudaratkan diri.",
        "SEDIH + RISAU → KAWAL",
      ),
      stanza(
        "4",
        "Jaga Tutur Kata",
        "Seseorang perlu berhati-hati ketika bercakap kerana kata-kata yang tidak dijaga boleh membawa masalah atau kesengsaraan.",
        "FIKIR → CAKAP",
      ),
      branch("maksud-5", "Rangkap 5 — Keharmonian Rumah Tangga", [
        node(
          "maksud-5-huraian",
          "Maksud",
          "Suami isteri perlu menjaga hubungan dan memahami keadaan pasangan agar keharmonian rumah tangga dapat dipelihara.",
        ),
        node(
          "maksud-5-konteks",
          "Konteks Teks Tradisional",
          "Nasihat asal dibingkaikan secara khusus kepada seorang isteri agar tidak memarahi suaminya yang keletihan.",
        ),
        node(
          "maksud-5-universal",
          "Nilai Universal",
          "Dalam hubungan yang sihat, kedua-dua pasangan bertanggungjawab mengamalkan persefahaman, pertimbangan dan komunikasi.",
        ),
        node(
          "maksud-5-sempadan",
          "Sempadan Tafsiran",
          "Pantun tidak boleh digunakan untuk membenarkan perbuatan tidak setia atau berbahaya, dan seseorang tidak bertanggungjawab atas salah laku pasangannya.",
        ),
        node(
          "maksud-5-kata-kunci",
          "Kata Kunci",
          "PERSEFAHAMAN + PERTIMBANGAN + KOMUNIKASI → RUMAH TANGGA HARMONI",
        ),
      ]),
      stanza(
        "6",
        "Adab dan Bahasa",
        "Manusia hendaklah hidup dengan adat dan budi bahasa yang baik kerana kesantunan amat penting dalam kehidupan bermasyarakat.",
        "ADAT + BAHASA → MASYARAKAT BERADAB",
      ),
      stanza(
        "7",
        "Pandai Membawa Diri",
        "Seseorang yang berada atau merantau di tempat orang perlu pandai menyesuaikan diri, menjaga tingkah laku dan menghormati adat setempat.",
        "TEMPAT ORANG ↓ HORMAT ↓ SESUAIKAN DIRI ↓ JAGA TINGKAH LAKU",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "NASIHAT SEBAGAI PANDUAN UNTUK MENJALANI KEHIDUPAN YANG BAIK", [
        node(
          "tema-huraian",
          "Huraian",
          "Pantun menasihati masyarakat supaya melakukan kebaikan dan menjauhi perkara yang membawa keburukan dalam kehidupan.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema Pantun Nasihat ialah nasihat sebagai panduan hidup supaya masyarakat sentiasa melakukan kebaikan dan menjauhi perkara yang membawa keburukan.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-baik-jahat",
        "Melakukan Kebaikan dan Menjauhi Kejahatan",
        "Kebaikan perlu dilakukan dengan bijaksana, manakala kejahatan hendaklah dihindari.",
        "Rangkap 1 menyampaikan nasihat ini.",
      ),
      supported(
        "persoalan-mudarat",
        "Menjauhi Perkara yang Memudaratkan",
        "Perkara haram, memabukkan dan merosakkan diri tidak wajar dicuba.",
        "Rangkap 2 menegaskan bahaya tersebut.",
      ),
      supported(
        "persoalan-emosi",
        "Kepentingan Mengawal Emosi",
        "Kesedihan dan kerisauan tidak wajar dibiarkan berpanjangan sehingga memudaratkan diri.",
        "Rangkap 3 menyokong persoalan ini.",
      ),
      supported(
        "persoalan-tutur",
        "Kepentingan Menjaga Tutur Kata",
        "Kata-kata yang tidak dijaga boleh membawa akibat buruk.",
        "Rangkap 4 menasihati pembaca agar berhati-hati ketika bercakap.",
      ),
      supported(
        "persoalan-rumah-tangga",
        "Kepentingan Persefahaman dalam Rumah Tangga",
        "Hubungan suami isteri memerlukan pertimbangan, komunikasi dan persefahaman bersama.",
        "Prinsip universal ini dipelajari daripada konteks tradisional Rangkap 5.",
      ),
      supported(
        "persoalan-budi",
        "Kepentingan Budi Bahasa",
        "Adat dan bahasa yang santun penting dalam kehidupan bermasyarakat.",
        "Rangkap 6 menghubungkan adat dengan bahasa.",
      ),
      supported(
        "persoalan-bawa-diri",
        "Kepentingan Pandai Membawa Diri",
        "Seseorang perlu menyesuaikan diri dan menjaga tingkah laku ketika berada di tempat orang.",
        "Rangkap 7 menyampaikan adab orang merantau.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Identiti Karya",
        "Puisi tradisional jenis pantun dalam antologi Baik Budi, Indah Bahasa, Tingkatan 2.",
      ),
      node("bentuk-rangkap", "Tujuh Rangkap", "Pantun ini mengandungi tujuh rangkap."),
      node("bentuk-kerat", "Pantun Empat Kerat", "Setiap rangkap mempunyai empat baris."),
      node("bentuk-pembayang", "Pembayang", "Baris pertama dan kedua ialah pembayang."),
      node("bentuk-maksud", "Maksud", "Baris ketiga dan keempat menyampaikan maksud."),
      branch("bentuk-rima", "Rima Akhir Setiap Rangkap", [
        node(
          "bentuk-rima-1",
          "Rangkap 1 — abab",
          "Bunyi akhir baris pertama bersilang dengan baris ketiga, dan baris kedua dengan baris keempat.",
        ),
        node(
          "bentuk-rima-2",
          "Rangkap 2 — abab",
          "Pola rima akhir Rangkap 2 telah disemak sebagai abab.",
        ),
        node(
          "bentuk-rima-3",
          "Rangkap 3 — abab",
          "Pola rima akhir Rangkap 3 telah disemak sebagai abab.",
        ),
        node(
          "bentuk-rima-4",
          "Rangkap 4 — abab",
          "Pola rima akhir Rangkap 4 telah disemak sebagai abab.",
        ),
        node(
          "bentuk-rima-5",
          "Rangkap 5 — abab",
          "Pola rima akhir Rangkap 5 telah disemak sebagai abab.",
        ),
        node(
          "bentuk-rima-6",
          "Rangkap 6 — abab",
          "Pola rima akhir Rangkap 6 telah disemak sebagai abab.",
        ),
        node(
          "bentuk-rima-7",
          "Rangkap 7 — abab",
          "Pola rima akhir Rangkap 7 telah disemak sebagai abab.",
        ),
      ]),
      node(
        "bentuk-terikat",
        "Bentuk Terikat",
        "Pantun mengikuti susunan rangkap, baris, pembayang, maksud dan rima yang teratur.",
      ),
    ]),
    branch("ciri-pantun", "Ciri Pantun", [
      node(
        "ciri-pembayang-maksud",
        "Pembayang dan Maksud",
        "Dua baris pembayang diikuti dua baris yang membawa maksud.",
      ),
      node("ciri-baris", "Empat Baris", "Setiap rangkap terdiri daripada empat baris."),
      node(
        "ciri-padat",
        "Bahasa Padat",
        "Nasihat yang kompleks disampaikan secara ringkas dan jelas.",
      ),
      node("ciri-irama", "Irama", "Pola bunyi dan rima membantu pantun dilafazkan serta diingati."),
      node(
        "ciri-kehidupan",
        "Unsur Kehidupan",
        "Pembayang menggunakan gambaran alam dan kehidupan sehari-hari.",
      ),
      node(
        "ciri-nasihat",
        "Nasihat",
        "Maksud pantun membimbing tingkah laku manusia dalam kehidupan.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      supported(
        "gaya-anafora",
        "Anafora",
        "Pengulangan kata pada awal dua baris berturutan menegaskan pertentangan antara baik dengan jahat.",
        "Contoh pendek Rangkap 1: ‘Buat baik...’ dan ‘Buat jahat...’.",
      ),
      supported(
        "gaya-inversi",
        "Inversi",
        "Susunan kata diterbalikkan untuk mengekalkan irama dan memberi penegasan.",
        "Contoh pendek Rangkap 1: ‘Buat jahat jangan sekali’.",
      ),
      supported(
        "gaya-alam",
        "Unsur Alam",
        "Imej alam dan kehidupan menghidupkan bahagian pembayang.",
        "Antara contoh yang disahkan ialah buah peria, padi, pulau, pandan dan pisang.",
      ),
      supported(
        "gaya-simile",
        "Simile",
        "Perbandingan langsung menggambarkan keresahan yang tersembunyi di sebalik gelak tawa.",
        "Contoh pendek Rangkap 3: ‘Bagai panas mengandung hujan’.",
      ),
      supported(
        "gaya-asonansi",
        "Asonansi",
        "Pengulangan bunyi vokal a menghasilkan kemerduan.",
        "Bunyi a berulang dalam frasa pendek ‘Batang kapas bertimbal jalan’.",
      ),
      supported(
        "gaya-aliterasi",
        "Aliterasi",
        "Pengulangan bunyi konsonan b menguatkan rentak dan penegasan.",
        "Bunyi b berulang dalam frasa pendek ‘Buat baik berpada-pada’.",
      ),
      supported(
        "gaya-kata-ganda",
        "Kata Ganda",
        "Penggandaan kata membina rentak dan menguatkan maksud.",
        "Contoh pendek yang disahkan: ‘ketua-ketua’, ‘terdorong-dorong’ dan ‘baik-baik’.",
      ),
      node(
        "gaya-had",
        "Had Petikan",
        "Gunakan bukti pendek yang disahkan; jangan menyalin keseluruhan rangkap atau mencipta baris pantun.",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-baik",
        "Baik Hati",
        "Seseorang terdorong untuk melakukan perkara yang baik.",
        "Rangkap 1 mengutamakan kebaikan dan menolak kejahatan.",
      ),
      supported(
        "nilai-bijak",
        "Kebijaksanaan",
        "Tindakan yang baik tetap memerlukan batas, kesesuaian dan pertimbangan.",
        "Maksud ‘berpada-pada’ dalam Rangkap 1 menekankan kebijaksanaan.",
      ),
      supported(
        "nilai-rasional",
        "Rasional",
        "Seseorang menilai risiko dan menjauhi perkara yang haram serta memudaratkan.",
        "Rangkap 2 menasihati pembaca agar tidak mencuba perkara yang diketahui berbahaya.",
      ),
      supported(
        "nilai-tabah",
        "Ketabahan",
        "Seseorang mengurus kesedihan dan kerisauan tanpa membiarkannya memusnahkan diri.",
        "Rangkap 3 menekankan kawalan emosi.",
      ),
      supported(
        "nilai-sopan",
        "Kesopanan",
        "Tutur kata dijaga agar tidak menyinggung atau membawa masalah.",
        "Rangkap 4 memberi peringatan tentang akibat kata-kata.",
      ),
      supported(
        "nilai-faham",
        "Persefahaman",
        "Ahli keluarga saling memahami keadaan dan berkomunikasi secara sihat.",
        "Nilai universal ini dikaitkan dengan Rangkap 5.",
      ),
      supported(
        "nilai-adab",
        "Beradab",
        "Adat dan budi bahasa diamalkan dalam kehidupan bermasyarakat.",
        "Rangkap 6 menekankan kepentingan adab dan bahasa.",
      ),
      supported(
        "nilai-hormat",
        "Hormat-menghormati",
        "Adat setempat dan masyarakat dihormati ketika berada di tempat orang.",
        "Rangkap 7 menekankan adab orang merantau.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-baik",
        "Kita Hendaklah Melakukan Kebaikan",
        "Lakukan perkara baik secara sesuai, bijaksana dan tidak melampaui batas.",
      ),
      node(
        "pengajaran-jahat",
        "Kita Hendaklah Menjauhi Perbuatan Jahat",
        "Kejahatan membawa akibat buruk dan perlu ditolak sama sekali.",
      ),
      node(
        "pengajaran-mudarat",
        "Kita Hendaklah Menjauhi Perkara yang Memudaratkan",
        "Jangan mencuba perkara yang dilarang, memabukkan atau merosakkan diri.",
      ),
      node(
        "pengajaran-emosi",
        "Kita Hendaklah Mengawal Emosi",
        "Urus kesedihan dan kerisauan agar tidak berpanjangan secara merosakkan.",
      ),
      node(
        "pengajaran-kata",
        "Kita Hendaklah Menjaga Tutur Kata",
        "Berfikir sebelum bercakap supaya kata-kata tidak membawa sengsara.",
      ),
      node(
        "pengajaran-keluarga",
        "Kita Hendaklah Menjaga Keharmonian Keluarga",
        "Amalkan persefahaman, pertimbangan dan komunikasi yang saling menghormati.",
      ),
      node(
        "pengajaran-budi",
        "Kita Hendaklah Berbudi Bahasa",
        "Kesantunan dan adat penting dalam kehidupan bermasyarakat.",
      ),
      node(
        "pengajaran-bawa-diri",
        "Kita Hendaklah Pandai Membawa Diri",
        "Hormati adat dan jaga tingkah laku apabila berada di tempat orang.",
      ),
    ]),
    branch("adab-kehidupan", "Adab Kehidupan", [
      node("adab-diri", "Diri", "Jauhi perkara yang haram dan memudaratkan."),
      node(
        "adab-emosi",
        "Emosi",
        "Urus kesedihan dan kerisauan dengan baik serta dapatkan sokongan apabila perlu.",
      ),
      node(
        "adab-percakapan",
        "Percakapan",
        "Fikir sebelum bercakap dan gunakan tutur kata yang sopan.",
      ),
      node(
        "adab-keluarga",
        "Keluarga",
        "Amalkan persefahaman, pertimbangan dan komunikasi bersama.",
      ),
      node("adab-masyarakat", "Masyarakat", "Berbudi bahasa dan patuhi adat yang baik."),
      node(
        "adab-tempat-orang",
        "Tempat Orang",
        "Hormati adat setempat, sesuaikan diri dan jaga tingkah laku.",
      ),
      node(
        "adab-rumus",
        "DIRI + KELUARGA + MASYARAKAT = KEHIDUPAN BERADAB",
        "Adab bermula dengan pengurusan diri, diperkukuh dalam keluarga dan diamalkan dalam masyarakat.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node("kata-r1", "Rangkap 1", "KEBAIKAN"),
      node("kata-r2", "Rangkap 2", "JAUHI MUDARAT"),
      node("kata-r3", "Rangkap 3", "KAWAL EMOSI"),
      node("kata-r4", "Rangkap 4", "JAGA KATA"),
      node("kata-r5", "Rangkap 5", "PERSEFAHAMAN"),
      node("kata-r6", "Rangkap 6", "ADAB"),
      node("kata-r7", "Rangkap 7", "BAWA DIRI"),
      node(
        "kata-rantai",
        "RANTAI INGATAN",
        "BAIK ↓ JAUHI BURUK ↓ KAWAL DIRI ↓ JAGA KATA ↓ FAHAMI ORANG ↓ BERADAB ↓ BAWA DIRI",
      ),
      node(
        "kata-memori",
        "PETA MEMORI",
        "BUAT BAIK ↓ JAUHI BURUK ↓ JAGA DIRI ↓ JAGA EMOSI ↓ JAGA KATA ↓ JAGA HUBUNGAN ↓ JAGA ADAB",
      ),
      node("kata-teras", "TERAS", "NASIHAT → PANDUAN HIDUP"),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node(
        "jawab-maksud",
        "Maksud Rangkap",
        "NASIHAT + PARAFRASA DENGAN BAHASA SENDIRI; jangan salin pantun.",
      ),
      node("jawab-tema", "Tema", "NASIHAT UTAMA + TUJUAN."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + RANGKAP / IDEA SOKONGAN."),
      node("jawab-nilai", "Nilai", "NILAI + BUKTI DARIPADA SIKAP ATAU TINDAKAN."),
      node("jawab-pengajaran", "Pengajaran", "‘Kita hendaklah...’ + TINDAKAN YANG JELAS."),
      node("jawab-bentuk", "Bentuk", "CIRI + BUKTI STRUKTUR."),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + BUKTI RINGKAS YANG DISAHKAN + FUNGSI."),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "salah-berpada",
        "‘Berpada-pada’ = Jangan Terlalu Baik",
        "Salah. Ungkapan itu bermaksud bertindak secara sesuai dan bijaksana.",
      ),
      node(
        "salah-haram",
        "Pantun Menggalakkan Mencuba Perkara Haram",
        "Salah. Rangkap 2 menasihati pembaca supaya menjauhi perkara haram dan memudaratkan.",
      ),
      node(
        "salah-sedih",
        "Sedih = Tidak Boleh Bersedih",
        "Salah. Nasihatnya ialah jangan membiarkan kesedihan dan kerisauan berpanjangan secara merosakkan.",
      ),
      node(
        "salah-r5",
        "Rangkap 5 Disalah Tafsir",
        "Jangan menyalahkan seseorang atas salah laku pasangannya. Ambil prinsip sihat: persefahaman, pertimbangan dan komunikasi bersama.",
      ),
      node(
        "salah-tema",
        "Tema = Budi Bahasa",
        "Jawapan itu terlalu sempit. Budi bahasa ialah satu persoalan dalam nasihat hidup yang lebih luas.",
      ),
      node(
        "salah-pembayang",
        "Pembayang = Maksud",
        "Dua baris awal ialah pembayang; dua baris akhir membawa maksud.",
      ),
      node(
        "salah-nilai",
        "Nilai = Pengajaran",
        "Nilai: kesopanan. Pengajaran: Kita hendaklah menjaga kesopanan ketika bertutur.",
      ),
      node(
        "salah-salin",
        "Maksud Disalin Bulat-bulat",
        "Parafrasa nasihat dengan ayat sendiri tanpa menyalin keseluruhan pantun.",
      ),
      node(
        "salah-gaya",
        "Gaya Bahasa Direka",
        "Gunakan teknik dan bukti pendek yang benar-benar terdapat dalam teks.",
      ),
      node(
        "salah-rima",
        "Rima Tidak Disemak",
        "Ketujuh-tujuh rangkap Pantun Nasihat ini telah disahkan berima akhir abab.",
      ),
    ]),
  ],
};
