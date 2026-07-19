// sej3ch3-content.ts
// Source-verified content for Sejarah Form 3, Bab 3 — Pentadbiran Negeri-negeri Melayu Bersekutu (Federated Malay States)
// Sourced from SEJ_FORM_3.pdf (pages 56-83)
// Content data only — no presentation markup.

export interface ResourceEra {
  era: string;
  facts: string[];
}

export interface StateExpansion {
  state: string;
  pretext: string[];
  outcome: string;
}

export interface CouncilComposition {
  councilName: string;
  chair: string;
  members: string[];
}

export interface Sej3Ch3Content {
  hook: { title: string; body: string };
  tinWealth: {
    intro: string;
    eras: ResourceEra[];
    longJaafarQuote: { context: string; quote: string; date: string };
  };
  goldWealth: {
    location: string;
    ancientNames: { source: string; name: string; meaning: string }[];
    uses: string[];
  };
  expansionStrategies: {
    intro: string;
    stateExpansions: StateExpansion[];
  };
  pangkorTreaty: {
    intro: string;
    mediator: string;
    attendees: string[];
    absentees: string[];
    terms: string[];
    signingLocation: string;
  };
  residentialSystem: {
    intro: string;
    characteristics: string[];
    newDepartments: string[];
    firstResident: { name: string; state: string };
    assassinationNote: string;
  };
  fmsFormation: {
    intro: string;
    treatyYear: string;
    characteristics: string[];
    alternateName: string;
    formationFactors: string[];
  };
  administration: {
    intro: string;
    stateCouncil: { role: string; changeAfterFMS: string };
    federalCouncil: CouncilComposition;
    durbar: { purpose: string; members: string[]; firstHeld: string };
    swettenhamRoles: { role: string; years: string }[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej3Ch3Content: Sej3Ch3Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Seekor gajah terlepas ke dalam hutan membawa kepada penemuan kawasan bijih timah terkaya di Larut — dan akhirnya kepada Perjanjian Pangkor 1874, perjanjian pertama British dengan negeri Melayu yang ditandatangani di atas kapal perang HMS Pluto. Bab ini menunjukkan bagaimana kekayaan bijih timah dan emas menarik campur tangan British yang mengubah selamanya sistem pemerintahan Perak, Selangor, Negeri Sembilan dan Pahang."
  },
  tinWealth: {
    intro: "Bijih timah merupakan barangan dagangan penting di negeri-negeri Melayu sejak zaman Kesultanan Melayu Melaka.",
    eras: [
      { era: "Abad Ke-15", facts: ["Perlombongan diusahakan orang Melayu di lembah-lembah sungai", "Pembesar Melayu memperoleh kawasan pegangan melalui surat tauliah daripada sultan", "Sultan menerima bahagian daripada hasil perdagangan bijih timah"] },
      { era: "Abad Ke-16 hingga Ke-17", facts: ["Perlombongan tertumpu sepanjang Sungai Perak, Kuala Kangsar, Kelian Intan", "1616: bijih timah mula dilombong di Manjung dan Beruas", "Acheh meletakkan Perak sebagai negeri naungan (abad 16-17) kerana kekayaannya", "Perak menggunakan bijih timah untuk mendapat perlindungan Portugis di Melaka bagi membebaskan diri daripada naungan Acheh"] },
      { era: "Abad Ke-18", facts: ["Dikeluarkan pelombong kecil Melayu di Kerian, Kurau, Larut, Terong, Beruas", "Sultan Muzaffar Shah memeterai perjanjian menjual bijih timah dengan Belanda di Melaka", "Akhir abad ke-18: pengeluaran merosot akibat penyeludupan ke pedagang British di Pulau Pinang melalui Sungai Kurau", "Selangor: 1790, Sultan Ibrahim menandatangani perjanjian penjualan hasil timah dengan Belanda"] },
      { era: "Abad Ke-19", facts: ["1840-an: penemuan bijih timah di Larut mencapai tahap penting", "Long Jaafar dan anaknya Ngah Ibrahim memajukan perlombongan di Klian Pauh dan Klian Baru, membawa masuk pelombong Cina", "Ngah Ibrahim menjadikan Kuala Sepetang sebagai pelabuhan pengangkutan bijih timah ke Pulau Pinang", "Akhir abad ke-19: Lembah Kinta muncul sebagai pengeluar utama dunia — kemunculan bandar Gopeng, Ipoh, Batu Gajah, Kampar", "1870-an: Sultan Ismail memajukan Lembah Kinta, memunculkan bandar Papan dan Pangkalan Peguh"] }
    ],
    longJaafarQuote: {
      context: "Surat kuasa pengurniaan daerah Larut daripada Paduka Seri Sultan Sahabudin Riayat Syah kepada Long Jaafar",
      quote: "Che Long Jaafar telah membuka sebuah daripada jajahan negeri Perak yang dinamakan Larut dan segala sungai-sungai telah dijadikan lombong bijih timah. Segala pekerjaan itu telah dibuatnya dengan usaha dan belanjanya sendiri. Oleh itu, dengan sukacita beta menyerahkan jajahan Larut kepadanya dan anak cucunya bolehlah menerima jajahan itu seperti hak miliknya.",
      date: "28 Februari 1850"
    }
  },
  goldWealth: {
    location: "Jalur emas Pahang meliputi kawasan perlombongan di Raub, berkeluasan 14,000 batu persegi",
    ancientNames: [
      { source: "Rekod India", name: "Suvarnabhumi", meaning: "Bumi Emas" },
      { source: "Claudius Ptolemy (ahli geografi Yunani, abad kedua Masihi)", name: "Golden Khersonese", meaning: "Semenanjung Emas" }
    ],
    uses: ["Eksport utama Pahang sejak abad ke-13 (rekod China)", "Diperdagangkan di Melaka pada abad ke-16 (catatan Portugis)", "Digunakan Sultan Pahang sebagai hadiah kepada negeri lain", "Barangan perhiasan — pending emas bertatah batu permata dipakai kerabat diraja semasa istiadat kebesaran"]
  },
  expansionStrategies: {
    intro: "British menggunakan strategi berbeza mengikut keadaan setempat setiap negeri untuk mendapatkan alasan campur tangan.",
    stateExpansions: [
      { state: "Perak", pretext: ["Perebutan takhta dalam kalangan kerabat diraja", "Pergaduhan antara pelombong Cina (Ghee Hin dan Hai San)"], outcome: "Andrew Clarke (Gabenor Negeri-negeri Selat) memanggil rundingan di Pulau Pangkor — Perjanjian Pangkor 1874" },
      { state: "Selangor", pretext: ["1873: Rompakan kapal dagang British berdekatan Kuala Langat", "1874: Serangan rumah api di Tanjung Rachado (kini Tanjung Tuan)"], outcome: "British mendesak Sultan Abdul Samad menerima perlindungan British atas alasan kegagalan menjaga keselamatan perairan" },
      { state: "Negeri Sembilan", pretext: ["Persaingan dan pergaduhan pembesar Luak Sungai Ujong untuk menguasai hasil bijih timah", "Ketiadaan kuasa pusat yang kukuh merentasi luak-luak Negeri Sembilan"], outcome: "British menandatangani Perjanjian British-Sungai Ujong, diikuti Perjanjian British-Negeri Sembilan 1895 yang mengukuhkan Sistem Residen merentasi luak-luak" },
      { state: "Pahang", pretext: ["Tiada kekacauan pelombong Cina untuk dijadikan alasan", "Sultan Ahmad sangat berhati-hati dalam rundingan", "1887: British menggunakan bantuan Sultan Abu Bakar (Johor) untuk memujuk", "1888: kematian Goh Hui (didakwa 'rakyat British') ditikam di pekarangan istana"], outcome: "Sultan Pahang dipaksa menerima perlindungan British atas alasan gagal mewujudkan keadilan dan ketenteraman awam" }
    ]
  },
  pangkorTreaty: {
    intro: "Perjanjian pertama British dengan negeri Melayu — Perjanjian Pangkor 1874, mengukuhkan kuasa British di Perak.",
    mediator: "Andrew Clarke (Gabenor Negeri-negeri Selat) — memanggil ketua Ghee Hin dan Hai San untuk menamatkan perselisihan",
    attendees: ["Raja Abdullah", "Ngah Ibrahim", "Dato' Sagor"],
    absentees: ["Sultan Ismail", "Raja Yusuf"],
    terms: [
      "Raja Abdullah diiktiraf sebagai Sultan Perak",
      "Raja Ismail dibenarkan memakai gelaran Sultan Muda dan diberikan jajahan kecil",
      "Sultan menerima seorang Residen British — nasihatnya wajib diminta dan dipatuhi kecuali hal agama Islam dan adat Melayu",
      "Ngah Ibrahim diakui sebagai Orang Kaya Menteri Larut, menerima seorang Penolong Residen",
      "British berkuasa penuh ke atas pungutan cukai di Perak"
    ],
    signingLocation: "Ditandatangani di atas kapal perang British, HMS Pluto, di Pulau Pangkor"
  },
  residentialSystem: {
    intro: "Sistem Residen — sistem pemerintahan British secara tidak langsung di Perak, Selangor, Negeri Sembilan dan Pahang.",
    characteristics: [
      "Kedudukan sultan dan pembesar negeri dikekalkan (secara nama)",
      "Nasihat British mesti diterima; Sultan tidak lagi boleh membuat undang-undang seperti sebelumnya",
      "Sultan dan pembesar kehilangan kuasa pentadbiran dan pungutan cukai",
      "Residen mengambil alih pentadbiran peringkat pembesar dan negeri; peranan pembesar digantikan pegawai British",
      "Jabatan dan sistem bercorak Barat menggantikan sistem pentadbiran tradisional"
    ],
    newDepartments: ["Jabatan Tanah dan Ukur", "Jabatan Kehakiman", "Jabatan Polis"],
    firstResident: { name: "J.W.W. Birch", state: "Perak (Residen British pertama, dilantik 1874)" },
    assassinationNote: "J.W.W. Birch dibunuh di Pasir Salak pada 2 November 1875, mencetuskan Perang Perak — bantahan terhadap gaya pentadbirannya yang mengabaikan adat dan kedudukan pembesar tempatan"
  },
  fmsFormation: {
    intro: "Selepas pelaksanaan Sistem Residen, British mengukuhkan kuasa dengan membentuk Negeri-negeri Melayu Bersekutu (NNMB) melalui Perjanjian Persekutuan 1895.",
    treatyYear: "1895 (Perjanjian Persekutuan)",
    characteristics: [
      "Gabungan Perak, Selangor, Negeri Sembilan dan Pahang membentuk satu persekutuan",
      "Residen Jeneral sebagai ketua pentadbiran kerajaan persekutuan",
      "Raja-raja Melayu menerima nasihat Residen Jeneral dalam semua perkara kecuali agama Islam dan adat Melayu",
      "Kuala Lumpur menjadi pusat pentadbiran"
    ],
    alternateName: "Turut dikenali sebagai 'Persekutuan 1896'",
    formationFactors: ["Mengatasi kelemahan Sistem Residen", "Menyeragamkan pentadbiran", "Menjamin keselamatan", "Menangani masalah kewangan negeri Pahang"]
  },
  administration: {
    intro: "NNMB diketuai Residen Jeneral, bertanggungjawab kepada Majlis Mesyuarat Negeri dan Pesuruhjaya Tinggi NNMB (turut merangkap Gabenor Negeri-negeri Selat).",
    stateCouncil: { role: "Majlis Mesyuarat Negeri — dipengerusikan Raja Melayu, menggubal undang-undang dan membantu pentadbiran negeri sebelum NNMB", changeAfterFMS: "Selepas NNMB, majlis ini tidak lagi berkuasa — kuasa perundangan berpindah kepada Residen Jeneral; peranan Raja-raja Melayu terhakis kecuali dalam hal agama dan adat" },
    federalCouncil: {
      councilName: "Majlis Mesyuarat Persekutuan (1909, Persetiaan Persekutuan 1885 turut disebut)",
      chair: "Pesuruhjaya Tinggi British",
      members: ["Residen Jeneral", "4 orang Raja Melayu", "4 orang Residen", "4 Ahli Tidak Rasmi (3 Eropah, 1 Cina)"]
    },
    durbar: { purpose: "Dibentuk British untuk mendapatkan sokongan Raja-raja Melayu terhadap NNMB — menunjukkan tanggungjawab bersama Raja-raja sebagai pelindung orang Melayu", members: ["Pesuruhjaya Tinggi British", "Raja-raja Melayu", "Residen Jeneral", "Residen British"], firstHeld: "1897, di Kuala Kangsar" },
    swettenhamRoles: [
      { role: "Residen Jeneral NNMB", years: "1896-1900" },
      { role: "Pesuruhjaya Tinggi NNMB", years: "1901-1903" }
    ]
  },
  keyExamFacts: [
    "Long Jaafar dan Ngah Ibrahim memajukan perlombongan bijih timah Larut, membawa masuk pelombong Cina",
    "Jalur emas Pahang (Raub, 14,000 batu persegi) dikenali Suvarnabhumi (India) dan Golden Khersonese (Ptolemy, Yunani)",
    "Perjanjian Pangkor 1874 — perjanjian pertama British dengan negeri Melayu, ditandatangani di atas HMS Pluto",
    "5 syarat Perjanjian Pangkor: Raja Abdullah diiktiraf Sultan, Raja Ismail jadi Sultan Muda, Residen British diterima, Ngah Ibrahim jadi Orang Kaya Menteri Larut, British kuasa cukai penuh",
    "Andrew Clarke (Gabenor Negeri-negeri Selat) memanggil rundingan Pangkor",
    "Selangor: rompakan kapal 1873 dan serangan rumah api Tanjung Rachado 1874 jadi alasan campur tangan",
    "Negeri Sembilan: persaingan pembesar Luak Sungai Ujong membawa Perjanjian British-Sungai Ujong dan Perjanjian British-Negeri Sembilan 1895",
    "Pahang: kematian Goh Hui (1888) jadi alasan; Sultan Abu Bakar Johor membantu memujuk (1887)",
    "J.W.W. Birch — Residen British pertama di Perak (1874), dibunuh di Pasir Salak 2 November 1875, mencetuskan Perang Perak",
    "Perjanjian Persekutuan 1895 membentuk Negeri-negeri Melayu Bersekutu (turut dikenali Persekutuan 1896); Kuala Lumpur jadi ibu pentadbiran",
    "Majlis Mesyuarat Persekutuan ditubuhkan 1909 — dipengerusikan Pesuruhjaya Tinggi British",
    "Durbar pertama diadakan 1897 di Kuala Kangsar",
    "Frank Swettenham: Residen Jeneral NNMB (1896-1900), kemudian Pesuruhjaya Tinggi NNMB (1901-1903)"
  ],
  keyTerms: [
    "Long Jaafar", "Ngah Ibrahim", "Suvarnabhumi", "Golden Khersonese", "Andrew Clarke",
    "Perjanjian Pangkor 1874", "HMS Pluto", "Sistem Residen", "J.W.W. Birch", "Perang Perak",
    "Perjanjian Persekutuan 1895", "Residen Jeneral", "Majlis Mesyuarat Persekutuan",
    "Durbar", "Frank Swettenham"
  ],
  chapterSummary: "Bab 3 mengkaji kekayaan bijih timah (merentas 4 era) dan emas (jalur emas Pahang) di Perak, Selangor, Negeri Sembilan dan Pahang, strategi berbeza British meluaskan kuasa di setiap negeri (termasuk Negeri Sembilan), Perjanjian Pangkor 1874 sebagai titik peralihan penguasaan langsung British, Sistem Residen dan ciri-cirinya (termasuk pembunuhan J.W.W. Birch yang mencetuskan Perang Perak), pembentukan Negeri-negeri Melayu Bersekutu melalui Perjanjian Persekutuan 1895, serta struktur pentadbirannya (Majlis Mesyuarat Negeri, Majlis Mesyuarat Persekutuan 1909, Durbar 1897)."
};
