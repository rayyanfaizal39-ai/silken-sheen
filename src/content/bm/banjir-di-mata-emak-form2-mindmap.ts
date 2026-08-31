import type { MindNode } from "@/components/MindMap";

// Events and literary analysis are paraphrased from the repository source and
// anthology-aligned KOMSAS references. Long quotations are intentionally omitted.
const PREFIX = "bm-f2-banjir-di-mata-emak";

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

function evidence(id: string, label: string, explanation: string, event: string): MindNode {
  return branch(id, label, [
    node(`${id}-huraian`, "Huraian", explanation),
    node(`${id}-bukti`, "Bukti Peristiwa", event),
  ]);
}

function step(id: string, number: number, label: string, explanation: string): MindNode {
  return node(id, `Langkah ${number} — ${label}`, explanation);
}

export const bahasaMelayuTingkatan2BanjirDiMataEmakMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "BANJIR\nDI MATA EMAK",
  summary:
    "Cerpen • KOMSAS Tingkatan 2\n\nCerpen mengisahkan pertemuan pencerita dengan Mak Piah ketika musim banjir. Hubungan yang terjalin membuka mata pencerita terhadap kesunyian, kerinduan dan harapan seorang ibu terhadap anak-anaknya.",
  children: [
    branch("sinopsis", "Sinopsis", [
      node(
        "sinopsis-identiti",
        "Identiti Karya",
        "Banjir di Mata Emak ialah cerpen karya Che Soo Ismail dalam antologi Baik Budi, Indah Bahasa, Tingkatan 2.",
      ),
      node(
        "sinopsis-telefon",
        "Panggilan yang Tersalah Nombor",
        "Watak ‘Saya’ mahu menelefon temannya, Ameera, tetapi tersalah mendail nombor rumah Mak Piah. Mak Piah menyangka pemanggil itu ialah Nana, anak bongsunya.",
      ),
      node(
        "sinopsis-banjir",
        "Mak Piah Menghadapi Banjir",
        "Mak Piah tinggal sendirian ketika hujan turun empat hari empat malam. Air banjir naik hingga paras dada, bekalan makanannya terputus dan jiran-jiran telah berpindah ke pusat pemindahan.",
      ),
      node(
        "sinopsis-prihatin",
        "Keprihatinan Pencerita",
        "‘Saya’ bimbang lalu mencari alamat Mak Piah dalam buku panduan telefon. Pencerita pergi ke rumahnya dengan membawa lauk dan nasi serta menemani ibu tua itu.",
      ),
      node(
        "sinopsis-hubungan",
        "Hubungan Menjadi Rapat",
        "Mak Piah gembira menerima kunjungan tersebut. ‘Saya’ membiarkannya percaya bahawa makanan itu kiriman Nana, makan bersamanya, membantu mengurus makanan dan berjanji akan datang lagi.",
      ),
      node(
        "sinopsis-kematian",
        "Kematian Mak Piah",
        "‘Saya’ demam panas selama lima hari. Selepas pulih dan banjir surut, pencerita kembali tetapi mendapati jenazah Mak Piah sedang dibawa keluar. Mak Piah meninggal selepas tergelincir dan kepalanya cedera ketika membersihkan rumah.",
      ),
      node(
        "sinopsis-akhir",
        "Penyesalan dan Kesan Emosi",
        "Di tanah perkuburan, Nana dan Nubhan menyesal kerana mengabaikan ibu mereka. ‘Saya’ bersyukur sempat menggembirakan Mak Piah pada penghujung usianya.",
      ),
    ]),
    branch("urutan", "Urutan Peristiwa", [
      step(
        "urutan-1",
        1,
        "Tersalah Mendail",
        "‘Saya’ tersalah mendail nombor ketika mahu menelefon Ameera.",
      ),
      step(
        "urutan-2",
        2,
        "Disangka Nana",
        "Mak Piah menyangka pemanggil itu anak bongsunya, Nana, lalu menceritakan kesukaran akibat banjir.",
      ),
      step(
        "urutan-3",
        3,
        "Pencerita Bimbang",
        "Panggilan terputus dan cubaan seterusnya tidak segera berjawab, menyebabkan ‘Saya’ memikirkan keselamatan Mak Piah.",
      ),
      step(
        "urutan-4",
        4,
        "Alamat Ditemukan",
        "‘Saya’ memperoleh alamat rumah Mak Piah melalui buku panduan telefon.",
      ),
      step(
        "urutan-5",
        5,
        "Membawa Makanan",
        "‘Saya’ menjejaki rumah Mak Piah dengan membawa lauk dan nasi.",
      ),
      step(
        "urutan-6",
        6,
        "Mak Piah Gembira",
        "Mereka makan bersama, dan pencerita membiarkan Mak Piah percaya makanan itu dikirim oleh Nana.",
      ),
      step(
        "urutan-7",
        7,
        "Berjanji Kembali",
        "‘Saya’ membantu Mak Piah dan berjanji akan datang menziarahinya lagi.",
      ),
      step(
        "urutan-8",
        8,
        "Demam Lima Hari",
        "Pencerita jatuh sakit dan tidak dapat kembali seperti yang dirancang.",
      ),
      step(
        "urutan-9",
        9,
        "Banjir Surut",
        "Selepas pulih, ‘Saya’ kembali ke rumah Mak Piah dan melihat orang ramai di pekarangan.",
      ),
      step(
        "urutan-10",
        10,
        "Jenazah Dibawa Keluar",
        "Pencerita tiba ketika jenazah Mak Piah sedang diusung lalu mengikutinya ke tanah perkuburan.",
      ),
      step(
        "urutan-11",
        11,
        "Anak-anak Menyesal",
        "Nana dan Nubhan meratapi kematian ibu mereka serta menyesali pengabaian yang berlaku.",
      ),
      step(
        "urutan-12",
        12,
        "Kesedaran Pencerita",
        "‘Saya’ bersyukur sempat membawa kebahagiaan kepada Mak Piah sebelum kematiannya.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "KETABAHAN SEORANG IBU DALAM MENGHADAPI DUGAAN KEHIDUPAN", [
        node(
          "tema-huraian",
          "Huraian",
          "Mak Piah menghadapi banjir, kekurangan bekalan dan kesunyian tanpa mahu membebankan anak-anaknya.",
        ),
        node(
          "tema-bukti",
          "Bukti Peristiwa",
          "Mak Piah tetap bertahan seorang diri ketika banjir dan masih menyayangi serta menjaga nama baik anak-anaknya walaupun mereka tidak menjenguknya.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema cerpen ini ialah ketabahan seorang ibu dalam menghadapi dugaan kehidupan. Hal ini dibuktikan oleh ketabahan Mak Piah menghadapi banjir dan kesunyian seorang diri.",
        ),
        node(
          "tema-amaran",
          "Bukan Tema",
          "Banjir ialah latar dan peristiwa penting, bukan tema dengan sendirinya.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      evidence(
        "persoalan-ibu",
        "Nasib Ibu Tua yang Kurang Perhatian",
        "Ibu bapa lanjut usia memerlukan perhatian dan kehadiran anak-anak.",
        "Mak Piah tinggal sendirian semasa banjir walaupun mempunyai dua orang anak.",
      ),
      evidence(
        "persoalan-kasih",
        "Kasih Ibu Tidak Berbelah Bagi",
        "Kasih seorang ibu berterusan walaupun anak-anak mengecewakannya.",
        "Mak Piah tetap merindui Nana dan Nubhan serta menjaga nama baik mereka di hadapan jiran.",
      ),
      evidence(
        "persoalan-tanggung",
        "Tanggungjawab Anak terhadap Ibu Bapa",
        "Anak perlu menjaga kebajikan ibu bapa dan tidak membiarkan mereka menghadapi kesusahan sendirian.",
        "Nana dan Nubhan akhirnya menyesal kerana tidak menjenguk atau membantu Mak Piah semasa banjir.",
      ),
      evidence(
        "persoalan-prihatin",
        "Keprihatinan terhadap Orang Lain",
        "Hubungan darah bukan syarat untuk mengambil berat terhadap seseorang.",
        "‘Saya’ mencari rumah Mak Piah, membawa makanan dan menemaninya walaupun mereka tidak pernah bertemu sebelum itu.",
      ),
      evidence(
        "persoalan-simpati",
        "Simpati yang Mendorong Tindakan",
        "Perasaan simpati menjadi bermakna apabila disertai bantuan.",
        "Kebimbangan ‘Saya’ terhadap mangsa banjir mendorongnya menjejaki rumah Mak Piah.",
      ),
      evidence(
        "persoalan-sesal",
        "Penyesalan Selepas Kehilangan",
        "Penyesalan yang datang selepas kematian tidak dapat mengembalikan peluang yang telah hilang.",
        "Nana dan Nubhan hanya benar-benar menyesal selepas Mak Piah meninggal dunia.",
      ),
    ]),
    branch("watak", "Watak & Perwatakan", [
      branch("watak-saya", "‘Saya’ — Pencerita dan Watak Utama", [
        node(
          "watak-saya-identiti",
          "Identiti",
          "Pencerita menggunakan sudut pandangan orang pertama. Nama dan jantinanya tidak dinyatakan dengan jelas, dan ibunya telah meninggal dunia.",
        ),
        evidence(
          "watak-saya-prihatin",
          "Prihatin",
          "Pencerita mengambil berat tentang keselamatan Mak Piah.",
          "‘Saya’ berulang kali menelefon dan kemudian mencari rumah Mak Piah ketika banjir.",
        ),
        evidence(
          "watak-saya-simpati",
          "Mudah Bersimpati",
          "Kesusahan orang yang tidak dikenali menyentuh perasaannya.",
          "Pencerita berasa resah selepas mengetahui Mak Piah tinggal sendirian tanpa bekalan mencukupi.",
        ),
        evidence(
          "watak-saya-baik",
          "Baik Hati",
          "Pencerita membantu dengan ikhlas.",
          "‘Saya’ membawa lauk dan nasi, makan bersama Mak Piah dan membantu menyimpan makanan.",
        ),
        evidence(
          "watak-saya-sayang",
          "Penyayang",
          "Kerinduan terhadap arwah ibunya membuatkan pencerita memahami kerinduan Mak Piah.",
          "Pencerita mahu menggembirakan Mak Piah dan bersyukur sempat berbuat demikian.",
        ),
      ]),
      branch("watak-mak-piah", "Mak Piah — Ibu Tua dan Mangsa Banjir", [
        node(
          "watak-mak-identiti",
          "Identiti",
          "Mak Piah tinggal sendirian dan mempunyai dua orang anak, iaitu Nubhan dan Nana.",
        ),
        evidence(
          "watak-mak-tabah",
          "Tabah",
          "Mak Piah menghadapi kesusahan tanpa mudah menyerah.",
          "Dia bertahan di rumah ketika banjir walaupun bekalan terputus dan anak-anak tidak datang.",
        ),
        evidence(
          "watak-mak-sayang",
          "Penyayang",
          "Dia tetap mengambil berat tentang anak-anaknya.",
          "Mak Piah bertanya khabar keluarga Nana dan masih merindui kedua-dua anaknya.",
        ),
        evidence(
          "watak-mak-peramah",
          "Peramah",
          "Dia mudah berbual dan menerima kehadiran orang lain.",
          "Mak Piah menyambut ‘Saya’ dengan gembira serta makan bersamanya.",
        ),
        evidence(
          "watak-mak-agama",
          "Taat kepada Perintah Tuhan",
          "Dia tetap menunaikan kewajipan agama.",
          "Mak Piah tidak menjawab satu panggilan kerana sedang menunaikan solat zuhur.",
        ),
        evidence(
          "watak-mak-marwah",
          "Menjaga Nama Baik Anak",
          "Dia tidak membuka aib anak-anak kepada masyarakat.",
          "Mak Piah memberitahu jiran bahawa Nana mengirim makanan walaupun makanan itu dibawa oleh ‘Saya’.",
        ),
        node(
          "watak-mak-emosi",
          "Kesunyian Bukan Perwatakan",
          "Kesunyian dan kerinduan ialah keadaan emosi Mak Piah, bukan sifat keperibadian.",
        ),
      ]),
      branch("watak-nana", "Nana — Anak Bongsu Mak Piah", [
        node(
          "watak-nana-hubungan",
          "Hubungan",
          "Nana ialah anak perempuan bongsu Mak Piah dan adik kepada Nubhan.",
        ),
        evidence(
          "watak-nana-takut",
          "Takut kepada Suami",
          "Dia membiarkan kehendak suami mempengaruhi tanggungjawabnya kepada ibu.",
          "Nana mengakui tidak berani melawat Mak Piah kerana dilarang suaminya.",
        ),
        evidence(
          "watak-nana-abai",
          "Mengabaikan Tanggungjawab",
          "Dia tidak menjaga kebajikan ibunya ketika diperlukan.",
          "Nana tidak menelefon, menjenguk atau membantu Mak Piah semasa banjir.",
        ),
        evidence(
          "watak-nana-insaf",
          "Menyesal dan Insaf",
          "Dia menyedari kesilapannya selepas kehilangan ibu.",
          "Di tanah perkuburan, Nana meratapi kematian Mak Piah dan mengakui pengabaiannya.",
        ),
      ]),
      branch("watak-nubhan", "Nubhan — Anak Sulung Mak Piah", [
        node(
          "watak-nubhan-hubungan",
          "Hubungan",
          "Nubhan ialah anak lelaki sulung Mak Piah dan abang kepada Nana.",
        ),
        evidence(
          "watak-nubhan-abai",
          "Mengabaikan Tanggungjawab",
          "Dia tidak memberikan perhatian yang diperlukan oleh ibunya.",
          "Walaupun tinggal berdekatan, Nubhan tidak menjenguk Mak Piah ketika banjir.",
        ),
        evidence(
          "watak-nubhan-insaf",
          "Menyesal",
          "Dia menyedari kesalahannya selepas Mak Piah meninggal dunia.",
          "Nubhan bersedih dan menyesal bersama Nana di tanah perkuburan.",
        ),
      ]),
      node(
        "watak-ameera",
        "Ameera",
        "Teman yang sebenarnya hendak dihubungi oleh ‘Saya’; kesilapan mendail nombornya memulakan cerita.",
      ),
    ]),
    branch("keluarga", "Hubungan Kekeluargaan", [
      node(
        "keluarga-struktur",
        "Hubungan yang Disahkan",
        "MAK PIAH → ibu kepada NUBHAN (anak sulung) + NANA (anak bongsu). ‘Saya’ bukan anak Mak Piah dan bukan Nana.",
      ),
      branch("keluarga-keperluan", "Ibu Bapa Tidak Hanya Memerlukan Wang", [
        node("keluarga-perhatian", "Perhatian", "Bertanya khabar dan mengetahui keadaan ibu bapa."),
        node("keluarga-masa", "Masa", "Meluangkan masa untuk mendengar dan menemani mereka."),
        node("keluarga-kasih", "Kasih Sayang", "Menyatakan kasih melalui tindakan yang konsisten."),
        node("keluarga-komunikasi", "Komunikasi", "Menelefon atau berhubung secara berkala."),
        node(
          "keluarga-hadir",
          "Kehadiran",
          "Datang ketika mereka memerlukan bantuan dan sokongan.",
        ),
        node(
          "keluarga-selamat",
          "Keselamatan",
          "Memastikan keperluan mereka terjaga ketika bencana atau sakit.",
        ),
      ]),
      node(
        "keluarga-formula",
        "Formula Tanggungjawab",
        "TANGGUNGJAWAB = KEPERLUAN MATERIAL + EMOSI + MASA + PERHATIAN.",
      ),
      node(
        "keluarga-bukti",
        "Hubungan dengan Cerita",
        "‘Saya’ yang tiada hubungan darah hadir dan membantu, sedangkan anak-anak Mak Piah tidak datang semasa banjir.",
      ),
      node(
        "keluarga-takeaway",
        "Takeaway Pembelajaran",
        "HADIR ITU JUGA SATU BENTUK KASIH SAYANG. Ini ialah rumusan pembelajaran, bukan petikan cerpen.",
      ),
    ]),
    branch("tajuk", "Maksud Tajuk", [
      branch("tajuk-literal", "Banjir Fizikal", [
        node(
          "tajuk-literal-air",
          "Air Banjir",
          "Kampung dan rumah Mak Piah dilanda banjir sehingga menimbulkan masalah bekalan serta keselamatan.",
        ),
        node(
          "tajuk-literal-kesan",
          "Bencana Luaran",
          "Banjir menjadi latar fizikal yang memperlihatkan kesukaran Mak Piah.",
        ),
      ]),
      branch("tajuk-emosi", "Banjir Emosi", [
        node(
          "tajuk-emosi-mata",
          "Mata Emak",
          "Secara figuratif, mata menghubungkan tajuk dengan air mata, kerinduan, kesedihan dan limpahan perasaan seorang ibu.",
        ),
        node(
          "tajuk-emosi-bahagia",
          "Limpahan Kebahagiaan",
          "Pada penghujung cerita, mata Mak Piah turut dikenang sebagai dilimpahi kebahagiaan kerana sempat menerima perhatian ‘Saya’.",
        ),
        node(
          "tajuk-emosi-had",
          "Interpretasi",
          "Tafsiran simbolik ini menerangkan kesan tajuk; ia tidak menggantikan tema rasmi yang dipilih.",
        ),
      ]),
      node(
        "tajuk-formula",
        "TAJUK = LUARAN + DALAMAN",
        "BANJIR SEBENAR + LIMPAHAN PERASAAN / AIR MATA.",
      ),
    ]),
    branch("plot", "Binaan Plot", [
      node(
        "plot-permulaan",
        "Permulaan",
        "‘Saya’ tersalah mendail nombor Mak Piah. Mak Piah menyangka pencerita ialah Nana lalu mengadukan keadaan banjir dan bekalan yang terputus sebelum panggilan tamat.",
      ),
      node(
        "plot-perkembangan",
        "Perkembangan",
        "Pencerita bimbang, mencari alamat Mak Piah, membawa lauk dan nasi, menemaninya serta berjanji akan datang semula.",
      ),
      node(
        "plot-klimaks",
        "Klimaks",
        "Selepas demam selama lima hari, ‘Saya’ kembali dan terkejut apabila melihat jenazah Mak Piah dibawa keluar dari rumah.",
      ),
      node(
        "plot-peleraian",
        "Peleraian",
        "Nana dan Nubhan menyesal di tanah perkuburan. Pencerita memimpin Nana keluar sambil bersyukur sempat menggembirakan Mak Piah.",
      ),
      node("plot-formula", "Formula", "PERMULAAN → PERKEMBANGAN → KLIMAKS → PELERAIAN."),
    ]),
    branch("teknik", "Teknik Plot", [
      evidence(
        "teknik-dialog",
        "Dialog",
        "Percakapan antara watak menggerakkan cerita dan mendedahkan maklumat.",
        "Perbualan telefon membolehkan pencerita mengetahui keadaan banjir, kesunyian dan keluarga Mak Piah.",
      ),
      evidence(
        "teknik-pemerian",
        "Pemerian",
        "Pencerita menghuraikan keadaan, tindakan dan perasaan.",
        "Keadaan panggilan telefon, perjalanan mencari rumah dan suasana di pekarangan rumah Mak Piah diperikan kepada pembaca.",
      ),
      evidence(
        "teknik-saspens",
        "Saspens",
        "Pembaca dibuat tertanya-tanya tentang identiti atau nasib watak.",
        "Pada awal cerita, pembaca ingin mengetahui pemilik suara tua; kemudian pembaca bimbang akan keselamatan Mak Piah selepas panggilan tidak berjawab.",
      ),
      node(
        "teknik-had",
        "Had Bukti",
        "Analisis teras menggunakan dialog, pemerian dan saspens yang konsisten dalam rujukan terpilih; dialog asal tidak disalin panjang.",
      ),
    ]),
    branch("latar", "Latar", [
      branch("latar-tempat", "Latar Tempat", [
        node(
          "latar-kampung",
          "Kampung",
          "Kawasan tempat tinggal pencerita dan Mak Piah serta lokasi banjir.",
        ),
        node(
          "latar-rumah-saya",
          "Rumah ‘Saya’",
          "Tempat pencerita membuat panggilan yang tersalah nombor.",
        ),
        node(
          "latar-rumah-mak",
          "Rumah Mak Piah",
          "Tempat Mak Piah tinggal sendirian, menerima kunjungan pencerita dan kemudian meninggal dunia.",
        ),
        node(
          "latar-kubur",
          "Tanah Perkuburan",
          "Tempat jenazah Mak Piah dikebumikan dan anak-anaknya meluahkan penyesalan.",
        ),
      ]),
      branch("latar-masa", "Latar Masa", [
        node(
          "latar-banjir",
          "Ketika Banjir",
          "Peristiwa awal berlangsung ketika kampung dilanda banjir.",
        ),
        node("latar-empat", "Empat Hari Empat Malam", "Tempoh hujan turun tanpa henti."),
        node(
          "latar-zuhur",
          "Waktu Zuhur",
          "Mak Piah menunaikan solat zuhur ketika satu panggilan dibuat.",
        ),
        node("latar-lima", "Lima Hari", "Tempoh pencerita mengalami demam panas."),
        node(
          "latar-selepas",
          "Selepas Banjir",
          "Mak Piah membersihkan rumah selepas air surut dan pencerita kembali menziarahinya.",
        ),
      ]),
      branch("latar-masyarakat", "Latar Masyarakat", [
        node(
          "latar-prihatin",
          "Masyarakat Prihatin",
          "Diwakili oleh ‘Saya’ yang membantu seorang ibu tua yang tidak dikenalinya.",
        ),
        node(
          "latar-abai",
          "Masyarakat yang Mengabaikan Tanggungjawab",
          "Diwakili oleh Nana dan Nubhan yang tidak menjenguk ibu mereka semasa banjir.",
        ),
        node(
          "latar-kasih",
          "Masyarakat yang Mementingkan Kasih Sayang",
          "Diwakili oleh Mak Piah dan pencerita yang sama-sama merindui insan tersayang.",
        ),
        node(
          "latar-tolong",
          "Masyarakat Tolong-menolong",
          "Dua remaja kampung membantu pencerita menuju ke rumah Mak Piah dengan perahu.",
        ),
        node(
          "latar-agama",
          "Masyarakat Taat Beragama",
          "Mak Piah tetap menunaikan solat walaupun menghadapi banjir.",
        ),
      ]),
    ]),
    branch("konflik", "Konflik", [
      node(
        "konflik-fizikal",
        "Konflik Fizikal",
        "BANJIR → air meningkat + bekalan terputus + keselamatan terancam.",
      ),
      node(
        "konflik-keluarga",
        "Konflik Kekeluargaan",
        "MAK PIAH MERINDUI ANAK → NANA DAN NUBHAN TIDAK HADIR → KEBAJIKAN IBU TERABAI.",
      ),
      node(
        "konflik-emosi-mak",
        "Konflik Emosi Mak Piah",
        "RINDU + SUNYI + SEDIH, namun Mak Piah tetap menjaga nama baik anak-anaknya.",
      ),
      node(
        "konflik-pencerita",
        "Konflik Emosi Pencerita",
        "Pencerita bimbang akan Mak Piah dan teringat arwah ibunya, lalu memilih untuk membantu serta membiarkan salah faham tentang kiriman Nana berterusan demi menggembirakan Mak Piah.",
      ),
      node(
        "konflik-akhir",
        "Konflik Selepas Kehilangan",
        "KEMATIAN MAK PIAH → PENYESALAN NANA DAN NUBHAN → KESEDARAN BAHAWA PELUANG TIDAK DAPAT DIULANG.",
      ),
      node(
        "konflik-formula",
        "Dua Lapisan",
        "BENCANA LUARAN + MASALAH DALAMAN KELUARGA = KESAN EMOSI CERITA.",
      ),
    ]),
    branch("nilai", "Nilai", [
      evidence(
        "nilai-tabah",
        "Ketabahan",
        "Kekuatan menghadapi dugaan.",
        "Mak Piah bertahan ketika banjir walaupun tinggal sendirian dan kekurangan bekalan.",
      ),
      evidence(
        "nilai-prihatin",
        "Keprihatinan",
        "Mengambil berat masalah orang lain.",
        "‘Saya’ mencari rumah Mak Piah selepas mengetahui kesulitannya.",
      ),
      evidence(
        "nilai-kasih",
        "Kasih Sayang",
        "Kasih ditunjukkan melalui ingatan dan tindakan.",
        "Mak Piah tetap menyayangi anak-anaknya, manakala pencerita menyayangi arwah ibunya dan mahu menggembirakan Mak Piah.",
      ),
      evidence(
        "nilai-baik",
        "Baik Hati",
        "Membantu tanpa mengharapkan balasan.",
        "Pencerita membawa lauk dan nasi serta membantu Mak Piah mengurus makanan.",
      ),
      evidence(
        "nilai-tolong",
        "Tolong-menolong",
        "Masyarakat saling membantu ketika kesusahan.",
        "Dua remaja kampung membantu membawa pencerita ke rumah Mak Piah dengan perahu.",
      ),
      evidence(
        "nilai-taat",
        "Ketaatan",
        "Melaksanakan kewajipan agama dalam apa-apa keadaan.",
        "Mak Piah menunaikan solat zuhur walaupun rumahnya dilanda banjir.",
      ),
      evidence(
        "nilai-insaf",
        "Keinsafan",
        "Menyedari dan menyesali kesalahan.",
        "Nana dan Nubhan menyesal selepas kematian ibu mereka.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "ajar-tanggung",
        "Kita Hendaklah Bertanggungjawab terhadap Ibu Bapa",
        "Kebajikan dan keselamatan mereka perlu dijaga, terutama ketika bencana.",
      ),
      node(
        "ajar-hargai",
        "Kita Hendaklah Menghargai Kasih Sayang Ibu Bapa",
        "Kasih dan pengorbanan ibu bapa perlu dihargai semasa mereka masih hidup.",
      ),
      node(
        "ajar-prihatin",
        "Kita Hendaklah Prihatin terhadap Orang Lain",
        "Keprihatinan pencerita membolehkan Mak Piah menerima bantuan dan perhatian.",
      ),
      node(
        "ajar-tolong",
        "Kita Hendaklah Membantu Orang dalam Kesusahan",
        "Bantuan makanan, masa dan tenaga amat bermakna kepada mangsa bencana.",
      ),
      node(
        "ajar-tegas",
        "Kita Hendaklah Tegas Menunaikan Tanggungjawab Keluarga",
        "Tanggungjawab kepada ibu bapa tidak wajar diketepikan kerana tekanan pihak lain.",
      ),
      node(
        "ajar-nama",
        "Kita Hendaklah Menjaga Nama Baik Keluarga",
        "Mak Piah melindungi maruah anaknya di hadapan jiran walaupun dirinya terabai.",
      ),
      node(
        "ajar-masa",
        "Kita Hendaklah Menghargai Masa Bersama Orang Tersayang",
        "Penyesalan Nana dan Nubhan datang selepas peluang bersama ibu mereka telah hilang.",
      ),
    ]),
    branch("kata", "Kata Kunci", [
      node(
        "kata-urutan",
        "Urutan Ingatan",
        "BANJIR → TELEFON → MAK PIAH → KESUNYIAN → ‘SAYA’ PRIHATIN → KUNJUNGAN → DEMAM → KEMATIAN → PENYESALAN.",
      ),
      node(
        "kata-keluarga",
        "Keperluan Ibu Bapa",
        "BUKAN WANG SAHAJA → MASA + PERHATIAN + KOMUNIKASI + KASIH SAYANG + KEHADIRAN.",
      ),
      node("kata-tajuk", "Dua Banjir", "BANJIR FIZIKAL + BANJIR EMOSI."),
      node("kata-watak", "Identiti", "‘SAYA’ ≠ NANA; NANA + NUBHAN = ANAK MAK PIAH."),
      node(
        "kata-teras",
        "Mesej Teras",
        "JANGAN TUNGGU KEHILANGAN UNTUK MENGHARGAI. Ini ialah rumusan pembelajaran, bukan petikan cerpen.",
      ),
    ]),
    branch("jawab", "Teknik Menjawab", [
      node("jawab-tema", "Tema", "IDEA UTAMA + PERISTIWA SOKONGAN."),
      node("jawab-persoalan", "Persoalan", "ISU + BUKTI PERISTIWA."),
      node(
        "jawab-watak",
        "Watak / Perwatakan",
        "WATAK + SIFAT + PERISTIWA. Jangan berhenti pada ‘Mak Piah seorang yang penyayang’.",
      ),
      node("jawab-nilai", "Nilai", "NILAI + PERISTIWA."),
      node("jawab-pengajaran", "Pengajaran", "‘Kita hendaklah...’ + TINDAKAN / SEBAB."),
      node("jawab-latar", "Latar", "JENIS + LATAR + PERISTIWA."),
      node("jawab-plot", "Binaan Plot", "TAHAP + PERISTIWA."),
      node("jawab-teknik", "Teknik Plot", "TEKNIK + BUKTI PERISTIWA; jangan mencipta dialog."),
      node("jawab-tajuk", "Maksud Tajuk", "MAKSUD LITERAL + MAKSUD TERSIRAT."),
    ]),
    branch("salah", "Kesalahan Lazim", [
      node(
        "salah-banjir",
        "‘Banjir’ = Banjir Fizikal Sahaja",
        "Tidak lengkap untuk tafsiran tajuk. Jelaskan banjir sebenar dan limpahan emosi yang dikaitkan dengan mata Mak Piah.",
      ),
      node(
        "salah-tema",
        "Tema = Banjir",
        "Salah. Banjir ialah latar dan peristiwa; tema yang dipilih ialah ketabahan seorang ibu menghadapi dugaan.",
      ),
      node(
        "salah-mak-saya",
        "Mak Piah = Pencerita",
        "Salah. Mak Piah ialah ibu tua yang dihubungi; ‘Saya’ ialah pencerita tanpa nama.",
      ),
      node(
        "salah-anak",
        "Pencerita = Anak Mak Piah",
        "Salah. Pencerita tiada hubungan darah dengan Mak Piah.",
      ),
      node(
        "salah-nana",
        "Nana = Pencerita",
        "Salah. Mak Piah hanya menyangka ‘Saya’ ialah Nana ketika panggilan telefon.",
      ),
      node(
        "salah-hubungan",
        "Nana dan Nubhan Tertukar",
        "Nana ialah anak bongsu perempuan; Nubhan ialah anak sulung lelaki dan abang Nana.",
      ),
      node(
        "salah-sunyi",
        "Kesunyian = Perwatakan",
        "Kurang tepat. Kesunyian ialah keadaan atau perasaan Mak Piah, bukan sifat keperibadian.",
      ),
      node(
        "salah-hospital",
        "Mak Piah Meninggal di Hospital",
        "Tidak disokong. Tiada peristiwa hospital dalam rujukan terpilih; jenazah dibawa keluar dari rumahnya.",
      ),
      node(
        "salah-punca",
        "Mencipta Punca Kematian",
        "Gunakan fakta yang disahkan: Mak Piah tergelincir dan kepalanya cedera ketika membersihkan rumah selepas banjir.",
      ),
      node(
        "salah-sebab",
        "Mencipta Sebab Anak Tidak Datang",
        "Gunakan hanya maklumat teks tentang pengaruh pasangan; jangan tambah alasan kerja, jarak atau kewangan.",
      ),
      node(
        "salah-bukti",
        "Nilai atau Tema Tanpa Bukti",
        "Jawapan lebih kuat apabila isi disertai peristiwa yang tepat.",
      ),
      node(
        "salah-dialog",
        "Mencipta Dialog",
        "Jangan mereka percakapan atau menyalin petikan panjang. Parafrasa peristiwa yang disahkan.",
      ),
    ]),
  ],
};
