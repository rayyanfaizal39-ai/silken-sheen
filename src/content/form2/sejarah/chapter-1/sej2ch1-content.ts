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
    geographyViews: ScholarView[];
    geographyConsensus: string;
    language: {
      intro: string;
      scholars: { scholar: string; role: string; view: string }[];
      comparisonTable: LanguageComparison[];
      conclusion: string;
    };
    culture: {
      intro: string;
      sharedElements: string[];
      scholar: { scholar: string; role: string; view: string };
      conclusion: string;
    };
  };
  kingdomEmergence: {
    intro: string;
    kingdoms: { name: string; location: string; era: string; capital: string }[];
    significance: string;
  };
  famousKingdoms: EarlyKingdom[];
  contemporaryKingdoms: {
    intro: string;
    eras: ContemporaryEra[];
    relations: { type: string; description: string; closing?: string }[];
    tradePorts?: { malayWorld: string[]; india: string[]; china: string[]; westAsiaAndRome: string[] };
    religionSpread?: ReligionSpread[];
    religionImpact?: string;
    diplomaticMissions?: { china: DiplomaticMission[]; india: DiplomaticMission[] };
  };
  evidence?: { find: string; place: string; page: string }[];
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
    intro: "Alam Melayu merangkumi gugusan kepulauan dan tanah besar di bahagian tenggara benua Asia. Kawasan ini juga dikenali sebagai Kepulauan Melayu dan Dunia Melayu; istilahnya berbeza mengikut peredaran zaman. Pada masa dahulu, gugusan tanah ini dikenali sebagai Pentas Sunda (Tingkatan 1). Penduduknya berkongsi kepercayaan, asal usul keturunan, bahasa, budaya dan masyarakat. Oleh itu, konsep Alam Melayu dilihat dari sudut geografi, bahasa dan budaya.",
    geographyViews: [
      { scholar: "Nik Hassan Shuhaimi Nik Abdul Rahman", role: "Ahli arkeologi", view: "Alam Melayu meliputi kawasan dari Madagaskar ke Tanah Melayu, Papua New Guinea, Australia, New Zealand, Kepulauan Pasifik dan sampai ke Taiwan.", source: "Asal Usul Melayu, Induknya di Benua Sunda (2016)" },
      { scholar: "Abdul Hadi Haji Hassan", role: "Ahli akademik", view: "Alam Melayu merupakan suatu lingkungan geografi yang luas meliputi Kepulauan Melayu hingga selatan Thailand.", source: "" },
      { scholar: "Ismail Hussein", role: "Ahli bahasa dan budayawan", view: "Dunia Melayu meliputi selatan Vietnam, Kemboja, selatan Myanmar, Segenting Kra, Malaysia, Indonesia, Brunei dan Filipina.", source: "Antara Dunia Melayu dengan Dunia Kebangsaan (1993)" },
      { scholar: "Alfred Russel Wallace", role: "Sarjana Barat", view: "Kepulauan Melayu meliputi Tanah Melayu hingga Tenasserim dan Kepulauan Nicobar, Filipina dan Kepulauan Solomon hingga Papua New Guinea.", source: "The Annotated Malay Archipelago (2009)" },
      { scholar: "Ding Choo Ming", role: "Pengkaji manuskrip Melayu", view: "Dunia Melayu merupakan sebuah kawasan yang luas meliputi Malaysia, Indonesia, Brunei, Singapura, selatan Thailand dan Filipina.", source: "Manuskrip Melayu: Sumber Maklumat Peribumi (2016)" },
    ],
    geographyConsensus: "Pandangan tokoh-tokoh ini hampir sama dari aspek geografi — kawasan merangkumi Malaysia, Indonesia, Singapura, Brunei, Filipina, selatan Thailand, selatan Myanmar dan selatan Indochina. Pada hari ini, Alam Melayu merupakan sebahagian daripada Asia Tenggara.",
    language: {
      intro: "Konsep Alam Melayu juga dilihat melalui bahasa serumpun yang dikaitkan dengan bahasa Melayu. Bahasa Melayu tergolong dalam bahasa Austronesia, iaitu antara 200 bahasa yang dipertuturkan di Alam Melayu.",
      scholars: [
        { scholar: "Asmah Haji Omar", role: "Tokoh bahasa", view: "Bahasa serumpun di Alam Melayu berkait dengan bahasa etnik peribumi. Persamaannya dapat dikenal pasti melalui kata-kata tertentu dan menunjukkan pertalian kekeluargaan dengan bahasa Melayu." },
        { scholar: "Sutan Takdir Alisjahbana", role: "Tokoh bahasa", view: "Bahasa Melayu digunakan secara meluas sejak awal Masihi kerana orang Melayu gemar belayar, dan bahasanya sederhana serta mudah dipelajari." },
      ],
      comparisonTable: [
        { word: "Empat", translations: [{ language: "Melayu (Malaysia)", term: "Empat" }, { language: "Jawa (Indonesia)", term: "Papat" }, { language: "Melayu (Brunei)", term: "Ampat" }, { language: "Tagalog (Filipina)", term: "Apat" }, { language: "Melanau (Sibu, Sarawak)", term: "Pat" }, { language: "Kadazandusun (Sabah)", term: "Apat" }] },
        { word: "Lima", translations: [{ language: "Melayu (Malaysia)", term: "Lima" }, { language: "Jawa (Indonesia)", term: "Limo" }, { language: "Melayu (Brunei)", term: "Lima" }, { language: "Tagalog (Filipina)", term: "Lima" }, { language: "Melanau (Sibu, Sarawak)", term: "Limah" }, { language: "Kadazandusun (Sabah)", term: "Limo" }] },
      ],
      conclusion: "Persamaan bunyi sebutan ini menunjukkan bahawa bahasa di Alam Melayu adalah serumpun.",
    },
    culture: {
      intro: "Penduduk Alam Melayu mempunyai budaya serumpun yang merangkumi:",
      sharedElements: ["Bahasa dan tulisan", "Persuratan", "Struktur sosial", "Kesenian", "Kepercayaan", "Adat"],
      scholar: { scholar: "A. Aziz Deraman", role: "Budayawan", view: "Budaya Alam Melayu berkembang maju sejak awal dengan kepandaian asli seperti pembuatan gangsa dan seni mempertahankan diri. Nilai gotong-royong wujud dalam masyarakat, manakala wayang kulit muncul di Kelantan dan Pulau Jawa." },
      conclusion: "Persamaan budaya ini membuktikan bahawa Alam Melayu memiliki kebudayaan serumpun; silat menjadi salah satu identitinya.",
    },
  },
  kingdomEmergence: {
    intro: "Kerajaan Alam Melayu bermula daripada petempatan kecil yang berkembang menjadi pelabuhan, lalu menjadi kerajaan. Kerajaan terawal muncul seawal abad pertama.",
    kingdoms: [
      { name: "Kerajaan Funan", location: "Lembah Sungai Mekong", era: "Abad Pertama", capital: "Vyadhapura" },
      { name: "Kerajaan Champa", location: "Selatan dan tengah Vietnam", era: "Abad Kedua", capital: "Indrapura" },
      { name: "Kerajaan Kedah Tua", location: "Sungai Mas dan Sungai Bujang", era: "Abad Kelima", capital: "Sungai Mas dan Pangkalan Bujang" },
      { name: "Kerajaan Gangga Nagara", location: "Pantai barat bahagian tengah Tanah Melayu", era: "Abad Keenam", capital: "Pangkalan" },
      { name: "Kerajaan Srivijaya", location: "Lembah Sungai Musi, Sumatera", era: "Abad Ketujuh", capital: "Palembang" },
      { name: "Kerajaan Angkor", location: "Lembah Sungai Mekong", era: "Abad Kesembilan", capital: "Hariharalaya" },
      { name: "Kerajaan Majapahit", location: "Lembah Sungai Brantas, Jawa Timur", era: "Abad Ke-13", capital: "Kota Trowulan" },
    ],
    significance: "Kewujudan kerajaan sejak abad pertama membuktikan bahawa Alam Melayu mempunyai kerajaan yang sezaman dengan tamadun lain dan berjaya membina kegemilangan yang agung.",
  },
  famousKingdoms: [
    { name: "Kerajaan Funan", location: "Lembah Sungai Mekong", era: "Abad Pertama", capital: "Vyadhapura", foundingStory: "Diasaskan oleh Kaundinya, seorang Brahmin, yang berkahwin dengan Soma, pemerintah wanita di Sungai Mekong. Berpusat di Vyadhapura.", glory: "Fan Shih-man meluaskan empayar ke Sungai Mekong hingga Teluk Camranh, kemudian menguasai selatan Myanmar dan Segenting Kra. Funan menguasai jalan perdagangan utama timur–barat dan menjadi pusat perdagangan utama Alam Melayu pada abad ketiga.", keyRuler: "Fan Shih-man", decline: "Raja terakhir ialah Rudravarman. Serangan kerajaan Chenla dari utara menyebabkan kemerosotan Funan." },
    { name: "Kerajaan Champa", location: "Selatan dan tengah Vietnam", era: "Abad Kedua", capital: "Indrapura", foundingStory: "Diasaskan oleh Chu-Lien pada tahun 192 M dan berpusat di Indrapura. Walaupun sering diserang Dai Viet, Chu-Lien membebaskan Champa daripada pengaruh China.", glory: "Che Bong Nga mengatasi ancaman Dai Viet dan meluaskan empayar ke wilayah Dai Viet hingga Lembah Sungai Merah; Raja Tran Due Tong terbunuh. Pemerintahannya diiktiraf Dinasti Ming pada tahun 1369.", keyRuler: "Che Bong Nga", decline: "Indravarman meninggal dunia pada tahun 1441. Dai Viet melancarkan beberapa serangan dan menawan Champa pada tahun 1471." },
    { name: "Kerajaan Srivijaya", location: "Lembah Sungai Musi, Sumatera", era: "Abad Ketujuh", capital: "Palembang", foundingStory: "Diasaskan oleh Dapunta Hyang Sri Jayanasa pada tahun 683 M di Palembang. Beliau memperkukuh kerajaan dengan menakluk Bangka dan Taruma.", glory: "Pada abad kelapan, Sangramadhananjaya menakluk Sumatera, selatan Myanmar, Tanah Melayu dan Segenting Kra. Srivijaya menguasai Selat Melaka dan Selat Sunda, menjadi kuasa perdagangan utama Alam Melayu dan pusat pengajian agama Buddha.", keyRuler: "Sangramadhananjaya", decline: "Serangan tentera Chola dari selatan India pada tahun 1025 melemahkan Srivijaya." },
    { name: "Kerajaan Angkor", location: "Lembah Sungai Mekong", era: "Abad Kesembilan", capital: "Hariharalaya", foundingStory: "Diasaskan oleh Jayavarman II dari Chenla dan berpusat di Hariharalaya. Beliau menyatukan wilayah di Lembah Sungai Mekong.", glory: "Suryavarman II meluaskan empayar hingga selatan Myanmar, menghalang ancaman Champa dan Dai Viet, serta menjalinkan perdagangan dengan pedagang luar. Jayavarman VII pula meluaskan empayar hingga sempadan Annam, membina Angkor Thom dan mendirikan 102 buah hospital.", keyRuler: "Jayavarman VII", decline: "Angkor mula lemah selepas kematian Jayavarman VII. Serangan Siam pada tahun 1594 melemahkan kerajaan ini." },
    { name: "Kerajaan Majapahit", location: "Lembah Sungai Brantas, Jawa Timur", era: "Abad Ke-13", capital: "Kota Trowulan", foundingStory: "Diasaskan oleh Raden Vijaya pada tahun 1294 dengan bantuan tentera Mongol dalam perebutan kuasa di Jawa. Berpusat di Kota Trowulan.", glory: "Tribuana Tunggadewi melantik Patih Gajah Mada sebagai Perdana Menteri. Beliau mengembalikan keamanan dan meluaskan jajahan ke timur Pulau Jawa, pesisir timur Sumatera, pesisir selatan dan barat Borneo, selatan dan timur Sulawesi serta Kepulauan Maluku. Majapahit menjadi pusat perdagangan pada abad ke-14.", keyRuler: "Patih Gajah Mada", decline: "Kematian Patih Gajah Mada dan serangan kerajaan Demak pada tahun 1478 melemahkan Majapahit." },
    { name: "Kerajaan Kedah Tua", location: "Sungai Mas dan Sungai Bujang", era: "Abad Kelima", capital: "Sungai Mas dan Pangkalan Bujang", foundingStory: "Bermula apabila masyarakat Guar Kepah berdagang dengan pedagang luar di Sungai Mas. Pusat awalnya di Sungai Mas dan Pangkalan Bujang. Sumber China, India dan Arab menamakannya Chieh Ch'a, Kataha dan Kalah-bar.", glory: "Perdagangan di Lembah Bujang berkembang pesat dengan kedatangan pedagang dari timur dan barat. Kedah Tua juga menjadi pusat keagamaan agama Buddha.", decline: "Kemasyhurannya menyebabkan Srivijaya menguasai Kedah Tua. Serangan tentera Chola dari India pada tahun 1025 melemahkan perdagangannya. Pemerintahan mula berubah pada abad ketujuh apabila Kesultanan Kedah diasaskan sebagai kerajaan baharu." },
    { name: "Kerajaan Gangga Nagara", location: "Pantai barat bahagian tengah Tanah Melayu", era: "Abad Keenam", capital: "Pangkalan", foundingStory: "Muncul pada abad keenam tetapi sudah berfungsi sebagai pelabuhan sejak abad kelima. Menurut sumber tradisi, pengasasnya ialah Raja Ganji Sarjuna; pendapat lain menyatakan ia dibuka oleh Raja Khmer dari Kemboja. Pusat awalnya di Pangkalan.", glory: "Kemasyhuran bermula pada abad kesembilan. Pedagang luar datang kerana emas dan bijih timah. Gangga Nagara berjaya mempertahankan kedaulatannya daripada serangan Srivijaya pada tahun 850 M.", decline: "Serangan tentera Chola dari India pada tahun 1025 memusnahkan pelabuhannya." },
  ],
  contemporaryKingdoms: {
    intro: "Kerajaan Alam Melayu muncul sezaman dengan kerajaan luar yang lain. Hal ini menunjukkan bahawa kerajaan Alam Melayu membangun dan maju setanding dengan kerajaan tersebut, serta menjalinkan hubungan perdagangan, keagamaan dan diplomatik dengannya.",
    eras: [
      { century: "Abad Pertama", malayKingdoms: ["Funan"], foreignKingdoms: ["Empayar Rom", "Empayar Parsi", "Empayar Kushan", "Dinasti Han"] },
      { century: "Abad Kesembilan", malayKingdoms: ["Champa", "Srivijaya", "Angkor"], foreignKingdoms: ["Kerajaan Abbasiyah", "Empayar Byzantine", "Dinasti Tang", "Kerajaan Chola"] },
      { century: "Abad Ke-14", malayKingdoms: ["Champa", "Angkor", "Majapahit"], foreignKingdoms: ["Empayar Mongol", "Kerajaan Turki Uthmaniyah", "Kesultanan Delhi"] },
    ],
    relations: [
      { type: "Hubungan Perdagangan", description: "Kedudukan strategik di laluan perdagangan timur dan barat serta kekayaan hasil bumi mendorong pemerintah kerajaan Alam Melayu menjalinkan hubungan perdagangan dengan kerajaan lain, dari abad pertama hingga abad ke-15.", closing: "Sikap keterbukaan para pemerintah ini membawa kemakmuran ekonomi." },
      { type: "Hubungan Keagamaan", description: "Hubungan dengan kerajaan luar mendorong penyebaran agama Hindu, Buddha dan Islam, sekali gus menggambarkan sikap keterbukaan penduduk Alam Melayu." },
      { type: "Hubungan Diplomatik", description: "Hubungan diplomatik ialah hubungan politik antara dua kerajaan. Kerajaan Alam Melayu menjalinkan hubungan dengan China dan India untuk mengukuhkan kedudukannya dan membuka jalan kepada perkembangan perdagangan.", closing: "Hubungan ini menunjukkan usaha persahabatan antara kerajaan. Kerajaan Alam Melayu bersifat terbuka dan saling menghormati dalam hubungan dengan kerajaan luar." },
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
