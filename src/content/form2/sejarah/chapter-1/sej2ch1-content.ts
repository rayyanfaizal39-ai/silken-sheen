// sej2ch1-content.ts
// Source-verified content for Sejarah Form 2, Bab 1 — Kerajaan Alam Melayu (Malay World Kingdoms)
// Sourced from Buku Teks Sejarah Tingkatan 2 KSSM (halaman 2-23)
// Content data only — no presentation markup.

export interface ScholarView {
  scholar: string;
  role: string;
  view: string;
  source: string;
}

export interface LanguageComparison {
  word: string;
  translations: { language: string; term: string }[];
}

export interface EarlyKingdom {
  name: string;
  location: string;
  era: string;
  capital: string;
  founder?: string;
  foundingStory?: string;
  glory: string;
  keyRuler?: string;
  decline: string;
}

export interface ContemporaryEra {
  century: string;
  malayKingdoms: string[];
  foreignKingdoms: string[];
}

export interface DiplomaticMission {
  kingdom: string;
  century: string;
  purpose: string;
}

export interface ReligionSpread {
  religion: string;
  means: string;
}

export interface Sej2Ch1Content {
  hook: { title: string; body: string };
  concept: {
    intro: string;
    sundaShelfLink: string;
    geographyViews: ScholarView[];
    geographyConsensus: string;
    language: {
      familyName: string;
      scholarView: string;
      spread?: string;
      comparisonTable: LanguageComparison[];
    };
    culture: {
      sharedElements: string[];
      scholarView: string;
    };
  };
  kingdomEmergence: {
    intro: string;
    kingdoms: { name: string; location: string; era: string; capital: string }[];
  };
  famousKingdoms: EarlyKingdom[];
  contemporaryKingdoms: {
    intro: string;
    eras: ContemporaryEra[];
    relations: { type: string; description: string }[];
    tradePorts?: { malayWorld: string[]; india: string[]; china: string[]; westAsiaAndRome: string[] };
    religionSpread?: ReligionSpread[];
    religionImpact?: string;
    diplomaticMissions?: { china: DiplomaticMission[]; india: DiplomaticMission[] };
  };
  evidence?: { find: string; place: string; page: string }[];
  kingdomNotes?: string[];
  citizenship?: { standard: string; title: string; points: string[] }[];
  kbatPrompts?: string[];
  didYouKnow?: string[];
  values?: string[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej2Ch1Content: Sej2Ch1Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Semasa Funan muncul pada abad pertama, Empayar Rom dan Dinasti Han juga wujud. Pada abad kesembilan, ketika Srivijaya, Champa dan Angkor berkembang, Dinasti Tang memerintah China. Bab ini menunjukkan bahawa kerajaan-kerajaan Alam Melayu bukan sekadar wujud — mereka setanding dengan tamadun-tamadun besar dunia pada zaman yang sama.",
  },
  concept: {
    intro: "Alam Melayu merangkumi gugusan kepulauan dan tanah besar di bahagian tenggara benua Asia. Turut dikenali sebagai Kepulauan Melayu dan Dunia Melayu — istilah berbeza mengikut peredaran zaman.",
    sundaShelfLink: "Gugusan tanah luas yang menghubungkan kawasan daratan dengan kepulauan ini dahulunya dikenali sebagai Pentas Sunda (dipelajari di Tingkatan 1). Manusia di kawasan ini berkongsi tamadun yang sama — kepercayaan, asal usul keturunan, bahasa, budaya dan masyarakat.",
    geographyViews: [
      { scholar: "Prof. Emeritus Dato' Dr. Nik Hassan Shuhaimi Nik Abdul Rahman", role: "Ahli arkeologi", view: "Alam Melayu meliputi kawasan dari Madagaskar ke Tanah Melayu, Papua New Guinea, Australia, New Zealand, Kepulauan Pasifik dan sampai ke Taiwan.", source: "Asal Usul Melayu, Induknya di Benua Sunda (2016)" },
      { scholar: "Abdul Hadi Haji Hassan", role: "Ahli akademik", view: "Alam Melayu merupakan suatu lingkungan geografi yang luas meliputi Kepulauan Melayu hingga selatan Thailand.", source: "Buku teks Sejarah Tingkatan 2, hlm. 4" },
      { scholar: "Prof. Emeritus Tan Sri Dato' Pendeta (Dr.) Ismail Hussein", role: "Ahli bahasa dan budayawan", view: "Dunia Melayu meliputi selatan Vietnam, Kemboja, selatan Myanmar, Segenting Kra, Malaysia, Indonesia, Brunei dan Filipina.", source: "Antara Dunia Melayu dengan Dunia Kebangsaan (1993)" },
      { scholar: "Alfred Russel Wallace", role: "Sarjana Barat", view: "Kepulauan Melayu meliputi Tanah Melayu hingga Tenasserim dan Kepulauan Nicobar, Filipina dan Kepulauan Solomon hingga Papua New Guinea.", source: "The Annotated Malay Archipelago (2009)" },
      { scholar: "Prof. Dr. Ding Choo Ming", role: "Pengkaji manuskrip Melayu", view: "Dunia Melayu merupakan sebuah kawasan yang luas meliputi Malaysia, Indonesia, Brunei, Singapura, selatan Thailand dan Filipina.", source: "Manuskrip Melayu: Sumber Maklumat Peribumi (2016)" },
    ],
    geographyConsensus: "Pandangan tokoh-tokoh ini hampir sama dari aspek geografi — kawasan merangkumi Malaysia, Indonesia, Singapura, Brunei, Filipina, selatan Thailand, selatan Myanmar dan selatan Indochina. Alam Melayu kini merupakan sebahagian daripada Asia Tenggara.",
    language: {
      familyName: "Bahasa Austronesia (istilah Melayu Polinesia digunakan sebelum digantikan dengan Austronesia)",
      scholarView: "Bahasa Melayu tergolong dalam bahasa Austronesia — antara 200 bahasa yang dipertuturkan di Alam Melayu. Bahasa serumpun ini mempunyai perkaitan dengan bahasa etnik peribumi (Prof. Emeritus Dato' Dr. Asmah Haji Omar).",
      spread: "Bahasa Melayu telah digunakan secara meluas di Alam Melayu sejak awal Masihi lagi. Sifat orang Melayu yang gemar belayar telah mengembangkan bahasa Melayu, dan sifat bahasa Melayu yang sederhana dan mudah dipelajari membolehkannya diterima di Alam Melayu (Sutan Takdir Alisjahbana, tokoh bahasa; hlm. 6).",
      comparisonTable: [
        { word: "Empat", translations: [{ language: "Melayu (Malaysia)", term: "Empat" }, { language: "Jawa (Indonesia)", term: "Papat" }, { language: "Melayu (Brunei)", term: "Ampat" }, { language: "Tagalog (Filipina)", term: "Apat" }, { language: "Melanau (Sibu, Sarawak)", term: "Pat" }, { language: "Kadazandusun (Sabah)", term: "Apat" }] },
        { word: "Lima", translations: [{ language: "Melayu (Malaysia)", term: "Lima" }, { language: "Jawa (Indonesia)", term: "Limo" }, { language: "Melayu (Brunei)", term: "Lima" }, { language: "Tagalog (Filipina)", term: "Lima" }, { language: "Melanau (Sibu, Sarawak)", term: "Limah" }, { language: "Kadazandusun (Sabah)", term: "Limo" }] },
      ],
    },
    culture: {
      sharedElements: ["Bahasa dan tulisan", "Persuratan", "Struktur sosial", "Kesenian", "Kepercayaan", "Adat"],
      scholarView: "Budaya di Alam Melayu berkembang maju sejak awal dengan kepandaian asli seperti pembuatan gangsa dan seni mempertahankan diri (silat). Nilai gotong-royong wujud dalam masyarakat, dan wayang kulit muncul di Kelantan dan Pulau Jawa (Dato' A. Aziz Deraman, budayawan).",
    },
  },
  kingdomEmergence: {
    intro: "Kerajaan Alam Melayu bermula daripada petempatan kecil yang berkembang menjadi pelabuhan, kemudian berkembang menjadi kerajaan — muncul seawal abad pertama.",
    kingdoms: [
      { name: "Kerajaan Funan", location: "Lembah Sungai Mekong", era: "Abad Pertama", capital: "Vyadhapura" },
      { name: "Kerajaan Champa", location: "Selatan dan tengah Vietnam", era: "Abad Kedua", capital: "Indrapura" },
      { name: "Kerajaan Srivijaya", location: "Lembah Sungai Musi, Sumatera", era: "Abad Ketujuh", capital: "Palembang" },
      { name: "Kerajaan Angkor", location: "Lembah Sungai Mekong", era: "Abad Kesembilan", capital: "Hariharalaya" },
      { name: "Kerajaan Majapahit", location: "Lembah Sungai Brantas, Jawa Timur", era: "Abad Ke-13", capital: "Kota Trowulan" },
      { name: "Kerajaan Kedah Tua", location: "Sungai Mas dan Sungai Bujang", era: "Abad Kelima", capital: "Sungai Mas dan Pangkalan Bujang" },
      { name: "Kerajaan Gangga Nagara", location: "Pantai barat bahagian tengah Tanah Melayu", era: "Abad Keenam", capital: "Pangkalan" },
    ],
  },
  famousKingdoms: [
    { name: "Kerajaan Funan", location: "Lembah Sungai Mekong", era: "Abad Pertama", capital: "Vyadhapura", founder: "Kaundinya (Brahmin)", foundingStory: "Kaundinya berkahwin dengan Soma, pemerintah wanita di Sungai Mekong, membentuk kerajaan Funan", glory: "Masyhur di bawah Fan Shih-man, yang meluaskan empayar ke Sungai Mekong hingga Teluk Camranh, menguasai selatan Myanmar dan Segenting Kra — menjadikan Funan pusat perdagangan utama Alam Melayu pada abad ketiga", keyRuler: "Fan Shih-man", decline: "Raja terakhir Rudravarman; serangan kerajaan Chenla di utara menyebabkan kemerosotan" },
    { name: "Kerajaan Champa", location: "Selatan dan tengah Vietnam", era: "Abad Kedua", capital: "Indrapura", founder: "Chu-Lien (192 M)", foundingStory: "Champa sering berhadapan dengan serangan dari Dai Viet; Chu-Lien berjaya membebaskan Champa daripada pengaruh China (hlm. 9)", glory: "Zaman kemasyhuran di bawah Che Bong Nga, yang mengatasi ancaman Dai Viet dan meluaskan empayar hingga Lembah Sungai Merah, membunuh Raja Tran Due Tong; mendapat pengiktirafan Dinasti Ming pada 1369", keyRuler: "Che Bong Nga", decline: "Kematian Indravarman (1441); Dai Viet menawan Champa pada 1471" },
    { name: "Kerajaan Srivijaya", location: "Lembah Sungai Musi, Sumatera", era: "Abad Ketujuh", capital: "Palembang", founder: "Dapunta Hyang Sri Jayanasa (683 M)", foundingStory: "Menakluk kawasan sekitar seperti Bangka dan Taruma", glory: "Di bawah Sangramadhananjaya (abad kelapan), menakluk Sumatera, selatan Myanmar, Tanah Melayu dan Segenting Kra — menguasai Selat Melaka dan Selat Sunda, menjadi kuasa perdagangan utama dan pusat pengajian agama Buddha", keyRuler: "Sangramadhananjaya", decline: "Serangan tentera Chola dari selatan India pada 1025" },
    { name: "Kerajaan Angkor", location: "Lembah Sungai Mekong", era: "Abad Kesembilan", capital: "Hariharalaya", founder: "Jayavarman II (dari Chenla)", foundingStory: "Menyatukan wilayah di Lembah Sungai Mekong", glory: "Suryavarman II meluaskan empayar ke sekitar Lembah Sungai Mekong hingga selatan Myanmar, menghalang ancaman Champa dan Dai Viet, serta mewujudkan jalinan perdagangan antara pedagang tempatan dengan pedagang luar (hlm. 10); Jayavarman VII meluaskan hingga sempadan Annam, membina Angkor Thom dan mendirikan 102 buah hospital", keyRuler: "Jayavarman VII", decline: "Selepas kematian Jayavarman VII, serangan Siam pada 1594 melemahkan kerajaan" },
    { name: "Kerajaan Majapahit", location: "Lembah Sungai Brantas, Jawa Timur", era: "Abad Ke-13", capital: "Kota Trowulan", founder: "Raden Vijaya (1294, dibantu tentera Mongol)", foundingStory: "Kemenangan dalam perebutan kuasa di Jawa", glory: "Patih Gajah Mada (Perdana Menteri, dilantik Tribuana Tunggadewi) meluaskan jajahan ke timur Jawa, pesisir timur Sumatera, selatan/barat Borneo, selatan/timur Sulawesi, Kepulauan Maluku — pusat perdagangan abad ke-14", keyRuler: "Patih Gajah Mada", decline: "Kematian Patih Gajah Mada dan serangan kerajaan Demak pada 1478" },
    { name: "Kerajaan Kedah Tua", location: "Sungai Mas dan Sungai Bujang", era: "Abad Kelima", capital: "Sungai Mas dan Pangkalan Bujang", foundingStory: "Bermula dengan masyarakat Guar Kepah berdagang dengan pedagang luar di Sungai Mas; dikenali sebagai Chieh Ch'a (China), Kataha (India), Kalah-bar (Arab)", glory: "Kepesatan perdagangan di Lembah Bujang, menjadi pusat keagamaan Buddha — menyebabkan Srivijaya menguasainya", decline: "Serangan tentera Chola dari India pada tahun 1025 telah melemahkan kegiatan perdagangan di Kedah Tua (hlm. 12)" },
    { name: "Kerajaan Gangga Nagara", location: "Pantai barat bahagian tengah Tanah Melayu", era: "Abad Keenam (pelabuhan sejak abad kelima)", capital: "Pangkalan", founder: "Raja Ganji Sarjuna (atau Raja Khmer dari Kemboja, menurut pendapat lain)", glory: "Kemasyhuran bermula abad kesembilan — dikunjungi pedagang luar kerana kekayaan emas dan bijih timah; berjaya mempertahankan kedaulatan daripada serangan Srivijaya pada 850 M", decline: "Serangan tentera Chola dari India pada 1025 memusnahkan pelabuhan" },
  ],
  contemporaryKingdoms: {
    intro: "Kemunculan kerajaan Alam Melayu sezaman dengan kerajaan-kerajaan luar yang lain, membuktikan Alam Melayu membangun dan maju setanding dengan tamadun besar dunia.",
    eras: [
      { century: "Abad Pertama", malayKingdoms: ["Funan"], foreignKingdoms: ["Empayar Rom", "Empayar Parsi", "Empayar Kushan", "Dinasti Han"] },
      { century: "Abad Kesembilan", malayKingdoms: ["Champa", "Srivijaya", "Angkor"], foreignKingdoms: ["Kerajaan Abbasiyah", "Empayar Byzantine", "Dinasti Tang", "Kerajaan Chola"] },
      { century: "Abad Ke-14", malayKingdoms: ["Champa", "Angkor", "Majapahit"], foreignKingdoms: ["Empayar Mongol", "Kerajaan Turki Uthmaniyah", "Kesultanan Delhi"] },
    ],
    relations: [
      { type: "Perdagangan", description: "Kedudukan strategik di laluan perdagangan timur dan barat serta kekayaan hasil bumi mendorong pemerintah kerajaan Alam Melayu menjalinkan hubungan perdagangan dengan kerajaan lain, bermula dari abad pertama hingga abad ke-15. Sikap keterbukaan pemerintah membawa kemakmuran ekonomi. Kedudukan strategik menyumbang kepada kemajuan kerajaan: Funan yang menguasai jalan perdagangan utama antara timur dengan barat menjadi pusat perdagangan utama pada abad ketiga (hlm. 9), manakala Srivijaya yang menguasai Selat Melaka dan Selat Sunda menjadi kuasa perdagangan utama di Alam Melayu (hlm. 10)." },
      { type: "Keagamaan", description: "Hubungan dengan kerajaan luar mendorong penyebaran agama Hindu, Buddha dan Islam ke Alam Melayu. Penyebaran ini menggambarkan sikap keterbukaan penduduk Alam Melayu." },
      { type: "Diplomatik", description: "Hubungan diplomatik ialah hubungan politik antara dua kerajaan. Kerajaan Alam Melayu menjalin hubungan diplomatik dengan China dan India bagi mengukuhkan kedudukannya dan membuka jalan kepada perkembangan perdagangan. Kerajaan-kerajaan Alam Melayu bersifat terbuka dan saling menghormati; pemerintah kerajaan Alam Melayu bijak mengurus hubungan kerajaannya dengan kerajaan luar (hlm. 18-19)." },
    ],
    tradePorts: {
      malayWorld: ["Oc Eo", "Turan", "Kedah Tua", "Palembang", "Tuban"],
      india: ["Barbaricon", "Barygaza", "Arikamedu", "Tamralipti"],
      china: ["Guangzhou"],
      westAsiaAndRome: ["Rom", "Antioch", "Alexandria", "Tyre", "Aden"],
    },
    religionSpread: [
      { religion: "Hindu", means: "Melalui peranan pedagang, tentera dan golongan Brahmin." },
      { religion: "Buddha", means: "Melalui peranan Asoka, pemerintah empayar Maurya, yang menghantar sami-sami Buddha ke Alam Melayu." },
      { religion: "Islam", means: "Melalui peranan pedagang, pemerintah dan pendakwah." },
    ],
    religionImpact: "Penyebaran agama-agama ini mempengaruhi pentadbiran, perundangan, ekonomi dan sosiobudaya. Agama Hindu dan Buddha dianuti oleh sebahagian penduduk tempatan; setelah kedatangan Islam, sebahagian besar penduduk Alam Melayu menganut agama Islam.",
    diplomaticMissions: {
      china: [
        { kingdom: "Funan", century: "Abad ketiga", purpose: "Memohon bantuan ketenteraan untuk melawan Dai Viet." },
        { kingdom: "Champa", century: "Abad ketiga", purpose: "Memulihkan hubungan setelah berperang dengan sekutu China, iaitu Dai Viet." },
        { kingdom: "Srivijaya", century: "Abad ketujuh", purpose: "Mendapatkan pengiktirafan dan memperkukuh hubungan persahabatan dan perdagangan." },
        { kingdom: "Kedah Tua", century: "Abad ketujuh", purpose: "Memperkukuh hubungan perdagangan." },
        { kingdom: "Angkor", century: "Abad ke-12", purpose: "Memperkukuh persahabatan dan perdagangan." },
        { kingdom: "Majapahit", century: "Abad ke-14", purpose: "Menjalinkan hubungan persahabatan." },
      ],
      india: [
        { kingdom: "Funan", century: "Abad ketiga", purpose: "Memperkukuh hubungan perdagangan dan keagamaan dengan India." },
        { kingdom: "Srivijaya", century: "Abad kesembilan", purpose: "Mengeratkan hubungan persahabatan dan hubungan keagamaan." },
        { kingdom: "Angkor", century: "Abad ke-12", purpose: "Mengeratkan hubungan persahabatan." },
        { kingdom: "Majapahit", century: "Abad ke-14", purpose: "Mengeratkan hubungan persahabatan." },
      ],
    },
  },
  evidence: [
    { find: "Penemuan beberapa buah candi yang menunjukkan kewujudan kerajaan Kedah Tua", place: "Lembah Bujang, Kedah", page: "hlm. 13" },
    { find: "Artifak pengaruh Hindu", place: "Lembah Bujang, Kedah", page: "hlm. 17" },
    { find: "Artifak pengaruh Buddha", place: "Lembah Bujang, Kedah", page: "hlm. 17" },
    { find: "Ukiran pengaruh Islam", place: "Beruas, Perak", page: "hlm. 17" },
  ],
  kingdomNotes: [
    "Kedah Tua: Kerajaan Kedah Tua mula mengalami perubahan pemerintahan pada abad ketujuh apabila munculnya pengasasan Kesultanan Kedah yang memulakan kerajaan baharu di Kedah (hlm. 12).",
    "Angkor Thom merupakan ibu kota kerajaan Angkor dan dibina oleh Jayavarman VII (hlm. 10-11).",
  ],
  citizenship: [
    { standard: "K5.1.5", title: "Kepentingan kedudukan strategik", points: [
      "Kedudukan strategik di laluan perdagangan timur dan barat serta kekayaan hasil bumi mendorong pemerintah kerajaan Alam Melayu menjalinkan hubungan perdagangan dengan kerajaan lain (hlm. 16).",
      "Penguasaan jalan perdagangan utama antara timur dengan barat menjadikan Funan pusat perdagangan utama di Alam Melayu pada abad ketiga (hlm. 9).",
      "Penguasaan Selat Melaka dan Selat Sunda menjadikan Srivijaya kuasa perdagangan utama di Alam Melayu (hlm. 10).",
    ] },
    { standard: "K5.1.6", title: "Kebijaksanaan pemimpin untuk kemajuan negara", points: [
      "Kerajaan Funan, Champa, Srivijaya, Angkor, Majapahit, Kedah Tua dan Gangga Nagara merupakan contoh kebijaksanaan kepimpinan masyarakat Alam Melayu (hlm. 13).",
      "Contoh: Fan Shih-man meluaskan empayar Funan (hlm. 9); Patih Gajah Mada mengembalikan keamanan dan keselamatan Majapahit serta meluaskan tanah jajahannya (hlm. 12).",
      "Pemerintah kerajaan Alam Melayu bijak mengurus hubungan kerajaannya dengan kerajaan luar; hubungan ini penting untuk membantu kemajuan kerajaan Alam Melayu (hlm. 19).",
    ] },
    { standard: "K5.1.7", title: "Menghargai kegemilangan dan jati diri", points: [
      "Kewujudan kerajaan ini menyedarkan kita bahawa kawasan yang kita diami ini juga mempunyai warisan kerajaan yang agung seperti tamadun lain di dunia (hlm. 8).",
      "Pemahaman sejarah kewujudan kerajaan Alam Melayu dapat melahirkan rasa bangga akan kegemilangan negara (hlm. 23).",
      "Ikatan keserumpunan bahasa dan budaya masih kuat dan memupuk kesedaran bahawa kita serumpun di Alam Melayu (hlm. 7).",
    ] },
    { standard: "K5.1.8", title: "Kebanggaan terhadap kelangsungan warisan", points: [
      "Kebijaksanaan dan kemasyhuran kerajaan Alam Melayu wajar menjadi contoh kepada kita untuk membina tamadun bangsa yang setanding dengan bangsa-bangsa lain di dunia (hlm. 13).",
      "Hubungan dengan kerajaan luar mendidik kita agar menjalinkan kerjasama dan bersifat terbuka untuk kemakmuran negara (hlm. 23).",
    ] },
  ],
  kbatPrompts: [
    "Kaitkan kepemimpinan pemerintah dengan kemasyhuran sesebuah kerajaan. (hlm. 13)",
    "Mengapakah penguasaan jalan laut antarabangsa membolehkan sesebuah kerajaan menjadi masyhur? (hlm. 10)",
    "Pada pendapat anda, bagaimanakah kita dapat meneruskan kegemilangan tamadun kerajaan Alam Melayu? (hlm. 22, soalan 6(c))",
  ],
  didYouKnow: [
    "Buku Ilmu Alam Melayu yang ditulis oleh R. O. Winstedt digunakan di sekolah-sekolah di Tanah Melayu. Hal ini menunjukkan bahawa istilah Alam Melayu telah digunakan oleh British di Tanah Melayu.",
    "Istilah Melayu Polinesia digunakan sebelum digantikan dengan Austronesia.",
    "Pada tahun 1972, UNESCO telah memilih istilah Melayu bagi merujuk suku bangsa yang berbahasa Melayu yang mendiami Asia Tenggara.",
    "Kerajaan Dai Viet merujuk kawasan utara Vietnam hari ini.",
  ],
  values: [
    "Apabila mempelajari budaya serumpun, kita memperoleh pengetahuan tentang persamaan amalan budaya masyarakat.",
    "Pemahaman sejarah kewujudan kerajaan Alam Melayu dapat melahirkan rasa bangga akan kegemilangan negara.",
    "Hubungan antara kerajaan Alam Melayu dengan kerajaan luar mendidik kita agar menjalinkan kerjasama dan bersifat terbuka untuk kemakmuran negara.",
    "Diri dan keluarga: sikap toleransi dan berbaik-baik dengan ahli keluarga akan mengukuhkan institusi kekeluargaan.",
    "Negara: kita harus berbangga kerana negara kita bersifat terbuka dalam menjalinkan hubungan persahabatan dengan negara luar dan perlu menjaga imej baik negara di mata masyarakat antarabangsa.",
  ],
  keyExamFacts: [
    "Alam Melayu boleh dilihat dari 3 sudut: geografi, bahasa, budaya",
    "5 tokoh mengemukakan pandangan geografi Alam Melayu: Nik Hassan Shuhaimi Nik Abdul Rahman, Abdul Hadi Haji Hassan, Ismail Hussein, Alfred Russel Wallace dan Ding Choo Ming",
    "Bahasa Melayu tergolong dalam bahasa Austronesia, antara 200 bahasa yang dipertuturkan di Alam Melayu (istilah Melayu Polinesia digunakan sebelum digantikan dengan Austronesia)",
    "Pada tahun 1972, UNESCO memilih istilah Melayu bagi merujuk suku bangsa yang berbahasa Melayu yang mendiami Asia Tenggara",
    "7 kerajaan awal Alam Melayu: Funan, Champa, Srivijaya, Angkor, Majapahit, Kedah Tua, Gangga Nagara",
    "Funan (abad pertama) ialah kerajaan Alam Melayu paling awal, diasaskan Kaundinya, berpusat di Vyadhapura",
    "Kerajaan-kerajaan Alam Melayu sezaman dengan Empayar Rom (abad 1), Dinasti Tang/Abbasiyah (abad 9), Empayar Mongol/Uthmaniyah (abad 14)",
    "Serangan tentera Chola dari India pada tahun 1025 melemahkan kerajaan Srivijaya, Kedah Tua dan Gangga Nagara",
    "Kerajaan Alam Melayu menghantar utusan ke China (Funan, Champa, Srivijaya, Kedah Tua, Angkor, Majapahit) dan India (Funan, Srivijaya, Angkor, Majapahit)",
    "Agama Hindu tersebar melalui pedagang, tentera dan Brahmin; Buddha melalui sami yang dihantar oleh Asoka; Islam melalui pedagang, pemerintah dan pendakwah",
    "Bahasa Melayu digunakan secara meluas sejak awal Masihi kerana orang Melayu gemar belayar dan bahasanya sederhana serta mudah dipelajari (hlm. 6)",
    "Kerajaan Alam Melayu yang masyhur merupakan contoh kebijaksanaan kepimpinan masyarakat Alam Melayu (hlm. 13)",
  ],
  keyTerms: [
    "Alam Melayu", "Kepulauan Melayu", "Dunia Melayu", "Pentas Sunda", "Bahasa Austronesia",
    "Serumpun", "Gotong-royong", "Silat", "Wayang kulit", "Brahmin", "Kemasyhuran",
  ],
  chapterSummary: "Bab 1 memperkenalkan konsep Alam Melayu dari sudut geografi (5 pandangan tokoh), bahasa (bahasa Austronesia, persamaan bunyi merentas 6 bahasa serumpun) dan budaya (silat, wayang kulit, gotong-royong), kewujudan 7 kerajaan awal Alam Melayu di lembah sungai, kemasyhuran setiap kerajaan (pengasas, zaman kegemilangan, kemerosotan), serta kedudukan kerajaan Alam Melayu yang sezaman dengan tamadun besar dunia (Rom, Tang, Mongol) melalui hubungan perdagangan, keagamaan dan diplomatik.",
};
