// sej3-chapter7-content.ts
// Source-verified content for Sejarah Form 3, Bab 7 — Penentangan Masyarakat Tempatan (Local Resistance)
// Sourced from SEJ_FORM_3.pdf (pages 170-197)
// Content data only — no presentation markup.

export interface ResistanceLeader {
  name: string;
  realName?: string;
  region: string;
  background: string[];
  reasons: string[];
  events: string[];
  outcome: string;
}

export interface Sej3Ch7Content {
  hook: { title: string; body: string };
  goalsAndForms: {
    intro: string;
    goals: string[];
    forms: string[];
  };
  administrativeImpact: {
    intro: string;
    governancePower: { region: string; details: string[] }[];
    legalPower: { region: string; details: string }[];
    financialPower: { region: string; details: string }[];
    impactOnRakyat: {
      intro: string;
      pasirPutehTaxTable: { before: string[]; after: string[]; specificRates: { item: string; rate: string }[] };
      sabahMurutTaxTable: { item: string; rate: string }[];
      murutMistreatment: string[];
      sarawakIbanTaxResistance: string[];
    };
  };
  resistanceStrengths: {
    intro: string;
    alliance: { leader: string; details: string[] }[];
    fortification: { leader: string; details: string[] }[];
    weaponry: { leader: string; details: string[] }[];
    legalArgument: { leader: string; details: string[] }[];
  };
  armedResistance: ResistanceLeader[];
  challengingTreaties: {
    intro: string;
    birchAssassination: ResistanceLeader;
    conspiracyTimeline: { date: string; event: string }[];
  };
  legalResistance: {
    intro: string;
    limbong: ResistanceLeader;
    uprisingWaves: { year: string; details: string[] }[];
  };
  effects: {
    intro: string;
    armedDefeatReasons: { leader: string; reason: string }[];
    generalWeakness: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej3Ch7Content: Sej3Ch7Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Seorang pemimpin agama di Terengganu tidak mengangkat senjata — sebaliknya, beliau memohon lesen sebagai peguam (pleader) dan menggunakan mahkamah British sendiri untuk mencabar undang-undang tanah kolonial. Bab ini menunjukkan bahawa penentangan terhadap penjajahan bukan sekadar peperangan bersenjata, tetapi juga perjuangan menggunakan undang-undang, ilmu dan kebijaksanaan."
  },
  goalsAndForms: {
    intro: "Campur tangan kuasa Barat membawa perubahan kepada sistem pentadbiran tempatan, menyebabkan masyarakat tempatan kehilangan hak dan kedudukan — mendorong penentangan.",
    goals: [
      "Mempertahankan hak dan kedudukan pemerintah tempatan",
      "Mengembalikan dan mengekalkan sistem pentadbiran tradisional",
      "Menentang pentadbiran dan peraturan baharu yang menyusahkan rakyat"
    ],
    forms: ["Penentangan bersenjata", "Mencabar perjanjian", "Menggunakan sistem perundangan"]
  },
  administrativeImpact: {
    intro: "Sistem pentadbiran Barat memberikan kesan kepada kuasa pemerintahan dan kehidupan masyarakat tempatan — mereka kehilangan kuasa dari segi mentadbir dan hubungan luar, kuasa perundangan, dan kuasa kewangan.",
    governancePower: [
      { region: "Negeri Sembilan", details: ["British mula meluaskan kuasa di Sungai Ujong (1874) dengan menyebelahi Dato' Kelana", "Menggugat kewibawaan dan mencabar kedudukan Yamtuan Antah", "Menguasai Rembau, Jelebu dan Seri Menanti melalui Pegawai Majistret dan Pemungut Hasil", "1895: menyatukan semua daerah membentuk Persekutuan Negeri Sembilan"] },
      { region: "Sarawak", details: ["Brooke melibatkan penduduk tempatan (Datu Patinggi, Datu Bandar, Datu Temenggung) dalam pentadbiran untuk memudahkan menghapuskan kebangkitan pemimpin tempatan"] },
      { region: "Pahang", details: ["Pembentukan daerah di bawah Pemungut Cukai dan Majistret menghilangkan kuasa pentadbiran pembesar", "British memaksa Sultan Ahmad melucutkan gelaran Dato' Setia Perkasa Pahlawan Semantan daripada Dato' Bahaman — memalukan beliau, mencetuskan kebangkitan"] },
      { region: "Perak", details: ["J.W.W. Birch (Residen British pertama) menekan Sultan Abdullah menandatangani surat pengisytiharan membolehkan Residen mentadbir hasil negeri atas nama sultan"] },
      { region: "Sabah", details: ["Pentadbiran SBUB menggugat kedudukan Mat Salleh; selepas rundingan dengan William Cowie membenarkannya mentadbir Tambunan, SBUB memungkiri janji dan mengambil semula Tambunan"] },
      { region: "Kelantan", details: ["Pembentukan jajahan mengambil alih kuasa pembesar; Engku Besar Jeram Tuan Ahmad hanya diberi jawatan rendah (Tok Kweng Muda), kehilangan kuasa dan keistimewaan — beliau dan Tok Janggut menjalankan kempen menentang"] },
      { region: "Terengganu", details: ["Pelantikan Penasihat British di Kuala Terengganu dan Penolong Penasihat di Besut/Kemaman menggugat kekuasaan sultan dan pembesar; hubungan luar negeri ditetapkan British"] }
    ],
    legalPower: [
      { region: "Naning", details: "British berusaha melaksanakan undang-undang Barat, mencabar bidang kuasa penghakiman Dol Said dan mengganggu sistem Adat Perpatih" },
      { region: "Pahang", details: "Pembinaan balai polis dan pelantikan Kapten Speedy sebagai Penolong Residen di Larut mengurangkan kuasa Menteri Ngah Ibrahim, kerana beliau diminta menerima nasihat Kapten Speedy" }
    ],
    financialPower: [
      { region: "Perak", details: "Pembatalan pajakan pungutan cukai dan larangan mengutip cukai oleh J.W.W. Birch di Kuala Sungai Perak menjejaskan pendapatan Sultan Abdullah, Menteri Ngah Ibrahim dan pembesar Perak" },
      { region: "Pahang", details: "Dato' Bahaman dan pembesar lain di Semantan tidak dibenarkan memungut cukai — ditawarkan elaun bulanan kecil ($70.00 untuk Dato' Bahaman); pembesar Pahang membantah, tidak berpuas hati" }
    ],
    impactOnRakyat: {
      intro: "British memperkenalkan pelbagai jenis cukai terhadap tanah, hasil hutan dan tumbuh-tumbuhan — menjejaskan kehidupan penduduk tempatan. Di Kelantan, sistem pungutan cukai baharu dikuatkuasakan 1 Januari 1915.",
      pasirPutehTaxTable: {
        before: ["Kutipan cukai berdasarkan jumlah keluaran", "Hasil tanaman sedikit → cukai rendah", "Tanah tidak diusahakan dikecualikan cukai"],
        after: ["Setiap penduduk wajib lapor keluasan sawah padi dimiliki", "Tanah 400 depa persegi dikenakan 3 kupang (30 sen) setahun", "Semua pemilik tanah wajib membayar cukai"],
        specificRates: [
          { item: "Tanah pertanian", rate: "40 sen hingga $1.20 seekar" },
          { item: "Pokok durian", rate: "12½ sen sepokok" },
          { item: "Pokok kelapa berbuah", rate: "3 sen sepokok" },
          { item: "Pokok pinang", rate: "1 sen sepokok" },
          { item: "Sirih", rate: "5 sen sejunjung" },
          { item: "Lembu dan kerbau", rate: "20 sen seekor setahun" }
        ]
      },
      sabahMurutTaxTable: [
        { item: "1 ekar tanah", rate: "$1.00" },
        { item: "Tanah melebihi 1 ekar", rate: "$2.00" },
        { item: "Hak milik tanah setiap 0.4 hektar", rate: "50 sen setahun" },
        { item: "Pokok kelapa menghasilkan nira", rate: "25 sen setahun" },
        { item: "Segantang beras", rate: "2 sen" },
        { item: "Tangkapan ikan besar", rate: "$1.00 seekor" },
        { item: "Memelihara anjing", rate: "$1.00 seekor" }
      ],
      murutMistreatment: [
        "Dilarang membuka tanah baharu untuk pertanian pindah/penempatan — kekurangan bekalan beras",
        "Dikenakan bayaran menyukat tanah untuk menentukan sempadan",
        "Suami isteri dipaksa tinggal berasingan (dipisahkan aliran sungai) — dikenakan denda $1.00 setiap kali ingin berjumpa"
      ],
      sarawakIbanTaxResistance: [
        "1894: D.J.S. Bailey (pegawai Brooke di Simanggang) mengenakan cukai terhadap orang Iban di Ulu Batang Lupar",
        "Mengarahkan pemusnahan rumah panjang di kawasan sempadan Sarawak-Kalimantan",
        "Barang seperti tempayan dan tembaga dirampas kerana gagal membayar cukai, didenda 10 kati ($7.20)"
      ]
    }
  },
  resistanceStrengths: {
    intro: "Pada peringkat awal, pembesar tempatan mengecap kejayaan menentang kuasa Barat melalui beberapa kekuatan strategi: muafakat, kubu pertahanan, persenjataan dan perundangan.",
    alliance: [
      { leader: "Dato' Maharaja Lela", details: ["16 Okt 1874: pakatan sulit menghapuskan J.W.W. Birch", "21 Julai 1875: mesyuarat di Durian Sebatang — berjabat tangan, mengangkat sumpah", "5 Sept 1875: mesyuarat di rumah Dato' Sagor — bersumpah meminum air keris merahsiakan pakatan", "12 Sept 1875: mesyuarat khas malam di Istana Sultan Ismail, Belanja", "Selepas 7 kali mesyuarat, berjaya membunuh J.W.W. Birch"] },
      { leader: "Sharif Masahor", details: ["Berjaya menyerang Kanowit dengan bantuan Datu Patinggi Abdul Gapur", "Pakatan berjaya membunuh 2 pegawai British", "Brooke tidak dapat membuktikan penglibatannya"] }
    ],
    fortification: [
      { leader: "Yamtuan Antah", details: ["Kubu Paroi dan Bukit Putus — kubu semula jadi sukar ditembusi (bukit tinggi, ranjau, pokok tumbang, hutan tebal)"] },
      { leader: "Rentap", details: ["Berjaya mematahkan serangan Brooke 2 kali (1857, 1858)", "Kubu Bukit Sadok di kawasan curam, dikelilingi hutan rimba dan bukit batu kapur", "Halangan kayu belian setebal 2 kaki tidak boleh ditembusi peluru", "Menggunakan meriam besi 'Bujang Timpang Berang'"] },
      { leader: "Mat Sator", details: ["Kota Mat Sator di Kampung Kapayan Lama, Tambunan — berdekatan Kota Mat Salleh di Tibabar", "Strategik di tebing Sungai Sunsuron (sumber air)"] }
    ],
    weaponry: [
      { leader: "Dol Said", details: ["Bantuan angkatan tentera dari Rembau dan wilayah jiran Naning", "Senapang jenis flintlock dan snider rifles untuk serangan hendap", "Meriam kecil (lela rentaka) mudah dibawa ke medan pertempuran"] }
    ],
    legalArgument: [
      { leader: "Haji Abdul Rahman Limbong", details: ["Memohon lesen pleader membela petani Terengganu menggunakan hujah agama", "Tanah yang dikerjakan ialah 'Hak Allah SWT' — rakyat bebas mengerjakannya tanpa cukai", "Sistem percukaian British berlawanan hukum syarak"] }
    ]
  },
  armedResistance: [
    {
      name: "Dol Said",
      region: "Naning",
      background: ["Abdul Said bin Omar, dikenali Penghulu Naning Seri Merah Raja Dol Said", "Lahir 1773, dari suku Semelenggang"],
      reasons: ["Menentang cukai hasil tahunan 1/10 yang dikenakan British", "Mendakwa Naning ialah negeri merdeka"],
      events: ["Bermuafakat dengan Yamtuan Muda Raja Ali (Rembau), Dato' Kelana Sungai Ujong dan pembesar lain — kira-kira 4,000 hulubalang Melayu", "Perang Naning Pertama (1831): Dol Said menang", "Perang Naning Kedua (1832): pakatan berpecah, pembesar lain enggan bantu"],
      outcome: "British menakluki Taboh (pusat pentadbiran Naning), menyatukan Naning dengan Melaka"
    },
    {
      name: "Yamtuan Antah",
      region: "Negeri Sembilan",
      background: ["Tunku Antah, anak Raja Radin Yamtuan Besar Negeri Sembilan (1833-1861)", "1875: dilantik Yamtuan Seri Menanti"],
      reasons: ["Menentang campur tangan British di Sungai Ujong", "Bimbang British meluaskan kuasa ke wilayah sekitar"],
      events: ["Memimpin 4,000 pengikut menentang Dato' Kelana (disokong tentera British)", "British menggunakan meriam besar menghancurkan kubu; Yamtuan Antah kehabisan peluru dan ubat bedil", "British menawan Paroi dan Bukit Putus; Yamtuan Antah berundur ke Johor"],
      outcome: "1876: berunding dengan Gabenor Negeri-negeri Selat William Jervouis — British melantiknya sebagai Yamtuan Besar Seri Menanti"
    },
    {
      name: "Dato' Bahaman",
      region: "Pahang",
      background: [],
      reasons: [],
      events: ["Dibantu Tok Gajah (Imam Perang Rasul) dan Mat Kilau", "1894: menawan Kuala Tembeling"],
      outcome: "Berundur ke Kelantan"
    },
    {
      name: "Rentap",
      realName: "Wira Bukit Sadok — bermaksud 'penggoncang'",
      region: "Sarawak",
      background: ["Dituduh oleh James Brooke sebagai pemberontak"],
      reasons: [],
      events: ["1853: menyerang kubu Brooke di Nanga Skrang", "1854: James Brooke menyerbu kubu Rentap di Sungai Lang — Rentap berundur ke Bukit Sadok", "1857 dan 1858: Charles Brooke menggempur Bukit Sadok, gagal", "1861: Charles Brooke menyerang Bukit Sadok menggunakan meriam tembaga 'Bukit Sadok' dan tentera besar — berjaya menawan"],
      outcome: "Rentap berundur ke Entabai, meninggal dunia beberapa tahun kemudian"
    },
    {
      name: "Tok Janggut",
      realName: "Haji Hassan bin Munas",
      region: "Kelantan (Pasir Puteh)",
      background: ["Lahir 1853 di Kampung Jeram, Pasir Puteh", "Pendidikan pondok di Kelantan dan Makkah"],
      reasons: ["Menentang kekerasan pentadbiran Encik Abdul Latiff (Ketua Jajahan Pasir Puteh)", "Menentang cukai tanah 1915", "Bersemangat jihad menentang British"],
      events: ["29 April 1915: mesyuarat di Kampung Tok Akib memboikot cukai British", "Merancang serang Pasir Puteh, disokong Haji Said, Penghulu Adam, Che Ishak Merbol", "British menyerang kubu di Kampung Dalam Pupuh Saring"],
      outcome: "Tok Janggut terkorban dalam pertempuran"
    },
    {
      name: "Mat Salleh",
      realName: "Mohammad Salleh",
      region: "Sabah",
      background: ["Lahir di Inanam, Sabah — berketurunan Bajau dan Suluk"],
      reasons: ["Menentang SBUB mengambil alih hak memungut cukai — pembesar tempatan kehilangan kuasa", "Gabenor Beaufort menganggapnya ancaman selepas rundingan gagal"],
      events: ["Julai 1897: menyerang pusat pentadbiran British di Pulau Gaya; membina kubu di Ranau", "November 1897: menyerang Ambong", "1898: berunding dengan Cowie di Menggatal — dibenarkan mentadbir Tambunan", "1899: SBUB mungkir janji, ambil alih Tambunan", "Tentera SBUB menyerang kubu di Teboh, Tambunan secara besar-besaran"],
      outcome: "1900: Mat Salleh gugur dalam pertempuran di Tambunan"
    },
    {
      name: "Mat Sator",
      realName: "turut dikenali Mat Jator",
      region: "Sabah",
      background: ["Orang kanan dan Ketua Leftenan Mat Salleh; pemimpin Kadazandusun di Tambunan"],
      reasons: ["Memperjuangkan kedaulatan tanah air", "Meneruskan perjuangan selepas kematian Mat Salleh (1900)"],
      events: ["Membina kubu di Kampung Kapayan Lama, Tambunan berhampiran kubu Mat Salleh di Tibabar", "Berundur ke Sungai Sunsuron", "April 1900: berjaya menawan Kudat"],
      outcome: "British menyerang balas — Mat Sator terkorban"
    },
    {
      name: "Sharif Masahor",
      region: "Sarawak (Kanowit)",
      background: [],
      reasons: [],
      events: ["Menyerang Kanowit dengan bantuan Datu Patinggi Abdul Gapur", "Pakatan berjaya membunuh 2 orang pegawai British"],
      outcome: "Brooke tidak dapat membuktikan penglibatan Sharif Masahor dalam serangan tersebut"
    }
  ],
  challengingTreaties: {
    intro: "Raja-raja Melayu menyedari kehadiran Residen dan Penasihat British bukan sekadar menasihati tetapi cuba memerintah — mendorong pemerintah tempatan mencabar perjanjian yang telah dimeterai.",
    birchAssassination: {
      name: "Dato' Maharaja Lela",
      realName: "Pandak Lam",
      region: "Perak (Pasir Salak)",
      background: ["Keturunan Daeng Salili anak Raja Bugis dari Luwuk, Sulawesi", "Orang Besar Berlapan Perak, mentadbir Pasir Salak"],
      reasons: ["J.W.W. Birch mengambil alih kuasa Sultan, hak mengutip cukai, dan mencabuli adat resam Melayu"],
      events: [
        "16 Oktober 1874: Sultan Abdullah upah R.C. Woods (peguam Pulau Pinang) memansuhkan Perjanjian Pangkor — gagal",
        "Mesyuarat sulit Sultan Abdullah dengan pembesar merancang menghapuskan J.W.W. Birch",
        "2 November 1875: J.W.W. Birch tiba di Pasir Salak (diiringi Leftenan Abbott, Mat Arshad) untuk menampal perisytiharan cukai — Dato' Maharaja Lela dan pengikutnya membunuhnya"
      ],
      outcome: "1877: Dato' Maharaja Lela, Dato' Sagor, Pandak Indut, Siputum dijatuhi hukuman gantung sampai mati; Sultan Abdullah, Raja Ismail, Ngah Ibrahim dibuang negeri"
    },
    conspiracyTimeline: [
      { date: "16 Oktober 1874", event: "Sultan Abdullah, Ngah Ibrahim, Dato' Maharaja Lela, Dato' Sagor dan pembesar lain mengadakan pakatan sulit menghapuskan J.W.W. Birch" },
      { date: "21 Julai 1875", event: "Mesyuarat penting di Durian Sebatang — berjabat tangan, mengangkat sumpah tidak memungkiri keputusan" },
      { date: "5 September 1875", event: "Mesyuarat di rumah Dato' Sagor — bersumpah meminum air keris merahsiakan pakatan" },
      { date: "12 September 1875", event: "Mesyuarat khas waktu malam di Istana Sultan Ismail, Belanja" },
      { date: "2 November 1875", event: "Selepas 7 kali mesyuarat, J.W.W. Birch dibunuh di Pasir Salak" }
    ]
  },
  legalResistance: {
    intro: "Gerakan Kebangkitan Tani di Terengganu (1922, 1925, 1928) unik kerana pemimpinnya menggunakan sistem perundangan dan agama, bukan senjata, untuk menentang peraturan baharu British.",
    limbong: {
      name: "Haji Abdul Rahman Limbong",
      realName: "Haji Abdul Rahman bin Abdul Hamid bin Haji Abdul Qadir",
      region: "Terengganu",
      background: ["Keluarga berasal dari Patani dan Terengganu", "Lahir 1868, meninggal dunia di Makkah 1929"],
      reasons: ["Menentang pengenalan pentadbiran Barat", "Menolak undang-undang tanah yang berlawanan dengan hukum syarak"],
      events: [
        "Memohon Lesen Wakil (pleader) menjadi wakil tertuduh",
        "Bertindak sebagai peguam mewakili penduduk Ulu Telemong menentang kerajaan (diwakili renjer hutan)",
        "Kegagalan peguam cara/hakim menjelaskan pertanyaannya menyebabkan perbicaraan ditangguhkan tanpa keputusan — akhirnya berpihak kepadanya",
        "Berhujah sistem percukaian British berlawanan hukum syarak; menuntut hak mengerjakan tanah mengikut hukum Islam"
      ],
      outcome: "Kebangkitan Tani 1928: ditangkap atas tuduhan menghasut, dibicarakan di Kuala Terengganu, dijatuhi hukuman buang negeri ke Makkah"
    },
    uprisingWaves: [
      { year: "1922", details: ["Petani Kuala Telemong membersihkan tanah tanpa pas kebenaran"] },
      { year: "1925", details: ["300-500 petani berkumpul di Kuala Telemong", "Membersihkan 200 ekar tanah Tengku Nik Maimunah dan 400 ekar tanah kerajaan tanpa pas"] },
      { year: "1928", details: ["Kebangkitan Tani di Marang, Kuala Telemong, Kuala Berang", "Mengisytiharkan perang terhadap British, menduduki balai polis dan bangunan kerajaan", "Mengibarkan bendera merah di Kuala Berang", "Haji Abdul Rahman Limbong ditangkap dan dibuang negeri ke Makkah"] }
    ]
  },
  effects: {
    intro: "Kebanyakan kebangkitan hanya dimenangi masyarakat tempatan pada peringkat awal — selepas itu, mudah ditangkis British.",
    armedDefeatReasons: [
      { leader: "Yamtuan Antah", reason: "British menggunakan meriam besar; Yamtuan Antah kehabisan peluru dan ubat bedil" },
      { leader: "Rentap", reason: "Brooke menewaskan Rentap dalam serangan ketiga (1861) menggunakan meriam tembaga 'Bukit Sadok' dan tentera lebih besar" }
    ],
    generalWeakness: "Kekurangan senjata moden, bekalan terhad, dan kegagalan mengekalkan perpaduan/pakatan jangka panjang antara pembesar tempatan menjadi punca utama kegagalan kebangkitan bersenjata"
  },
  keyExamFacts: [
    "3 bentuk penentangan: bersenjata, mencabar perjanjian, sistem perundangan",
    "Dol Said (Naning) menang Perang Naning Pertama 1831, tewas 1832 selepas pakatan berpecah",
    "Yamtuan Antah menentang British di Sungai Ujong, akhirnya dilantik Yamtuan Besar Seri Menanti 1876",
    "Rentap (bermaksud 'penggoncang') bertahan di Bukit Sadok 1853-1861 sebelum ditewaskan meriam 'Bukit Sadok'",
    "Tok Janggut (nama sebenar Haji Hassan bin Munas) terkorban menentang cukai tanah Kelantan 1915",
    "Mat Salleh (Bajau-Suluk) gugur di Tambunan 1900; Mat Sator meneruskan perjuangan, turut terkorban",
    "J.W.W. Birch dibunuh 2 November 1875 di Pasir Salak oleh Dato' Maharaja Lela (nama sebenar Pandak Lam)",
    "1877: Dato' Maharaja Lela, Dato' Sagor, Pandak Indut, Siputum digantung; Sultan Abdullah/Raja Ismail/Ngah Ibrahim dibuang negeri",
    "Haji Abdul Rahman Limbong menggunakan Lesen Wakil (pleader) melawan British di mahkamah — bukan senjata",
    "Kebangkitan Tani Terengganu: 1922, 1925 (300-500 petani, 600 ekar), 1928 (bendera merah dikibarkan, Limbong dibuang negeri ke Makkah)",
    "Pakatan membunuh J.W.W. Birch melibatkan 7 kali mesyuarat rahsia (16 Okt 1874 hingga 2 Nov 1875), termasuk sumpah meminum air keris",
    "Sharif Masahor menyerang Kanowit (Sarawak), membunuh 2 pegawai British — Brooke tidak dapat membuktikan penglibatannya",
    "Rentap menggunakan meriam besi bernama 'Bujang Timpang Berang' mempertahankan Bukit Sadok",
    "Cukai tanah Pasir Puteh berubah daripada berasaskan hasil kepada cukai tetap (40 sen-$1.20 seekar) selepas British",
    "SBUB mengenakan cukai ke atas orang Murut termasuk denda $1.00 kepada pasangan suami isteri yang dipisahkan sungai untuk bertemu"
  ],
  keyTerms: [
    "Dol Said", "Perang Naning", "Yamtuan Antah", "Dato' Bahaman", "Tok Gajah", "Mat Kilau",
    "Rentap", "Tok Janggut", "Mat Salleh", "Mat Sator", "Dato' Maharaja Lela", "J.W.W. Birch",
    "Haji Abdul Rahman Limbong", "Lesen Wakil", "Kebangkitan Tani"
  ],
  chapterSummary: "Bab 7 mengkaji matlamat dan 3 bentuk penentangan masyarakat tempatan terhadap British (bersenjata, mencabar perjanjian, sistem perundangan), kesan pentadbiran Barat terhadap kuasa pemerintahan/perundangan/kewangan tempatan serta kehidupan rakyat (termasuk cukai tanah Pasir Puteh dan penindasan cukai Murut di Sabah), kekuatan strategi awal penentangan (muafakat, kubu pertahanan, persenjataan, perundangan), tokoh-tokoh penentangan bersenjata (Dol Said, Yamtuan Antah, Dato' Bahaman, Rentap, Tok Janggut, Mat Salleh, Mat Sator, Sharif Masahor), pembunuhan J.W.W. Birch melalui pakatan 7 mesyuarat rahsia oleh Dato' Maharaja Lela, penentangan unik melalui sistem perundangan oleh Haji Abdul Rahman Limbong dalam Kebangkitan Tani Terengganu, serta kesan keseluruhan menunjukkan kelemahan strategi tempatan berbanding kekuatan ketenteraan British."
};

export default sej3Ch7Content;
