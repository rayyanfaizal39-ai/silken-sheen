// sej2-chapter1-content.ts
// Source-verified content for Sejarah Form 2, Bab 1 — Kerajaan Alam Melayu (Malay World Kingdoms)
// Sourced from T2_BT_SEJ.pdf (pages 2-21)
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
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej2Ch1Content: Sej2Ch1Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Semasa Funan mencapai kegemilangannya, Empayar Rom sedang membina Colosseum. Semasa Srivijaya menguasai Selat Melaka, Dinasti Tang memerintah China. Bab ini menunjukkan bahawa kerajaan-kerajaan Alam Melayu bukan sekadar wujud — mereka setanding dengan tamadun-tamadun besar dunia pada zaman yang sama."
  },
  concept: {
    intro: "Alam Melayu merangkumi gugusan kepulauan dan tanah besar di bahagian tenggara benua Asia. Turut dikenali sebagai Kepulauan Melayu dan Dunia Melayu — istilah berbeza mengikut peredaran zaman.",
    sundaShelfLink: "Gugusan tanah luas yang menghubungkan kawasan daratan dengan kepulauan ini dahulunya dikenali sebagai Pentas Sunda (dipelajari di Tingkatan 1). Manusia di kawasan ini berkongsi tamadun yang sama — kepercayaan, asal usul keturunan, bahasa, budaya dan masyarakat.",
    geographyViews: [
      { scholar: "Prof. Emeritus Dato' Dr. Nik Hassan Shuhaimi Nik Abdul Rahman", role: "Ahli arkeologi", view: "Alam Melayu meliputi kawasan dari Madagaskar ke Tanah Melayu, Papua New Guinea, Australia, New Zealand, Kepulauan Pasifik dan sampai ke Taiwan.", source: "Asal Usul Melayu, Induknya di Benua Sunda (2016)" },
      { scholar: "Abdul Hadi Haji Hassan", role: "Ahli akademik", view: "Alam Melayu merupakan suatu lingkungan geografi yang luas meliputi Kepulauan Melayu hingga selatan Thailand.", source: "Rujukan tempatan (dipetik bersama nota tentang buku Ilmu Alam Melayu oleh R.O. Winstedt)" },
      { scholar: "Prof. Emeritus Tan Sri Dato' Pendeta (Dr.) Ismail Hussein", role: "Ahli bahasa dan budayawan", view: "Dunia Melayu meliputi selatan Vietnam, Kemboja, selatan Myanmar, Segenting Kra, Malaysia, Indonesia, Brunei dan Filipina.", source: "Antara Dunia Melayu dengan Dunia Kebangsaan (1993)" },
      { scholar: "Alfred Russel Wallace", role: "Sarjana Barat", view: "Kepulauan Melayu meliputi Tanah Melayu hingga Tenasserim dan Kepulauan Nicobar, Filipina dan Kepulauan Solomon hingga Papua New Guinea.", source: "The Annotated Malay Archipelago (2009)" },
      { scholar: "Prof. Dr. Ding Choo Ming", role: "Pengkaji manuskrip Melayu", view: "Dunia Melayu merupakan sebuah kawasan yang luas meliputi Malaysia, Indonesia, Brunei, Singapura, selatan Thailand dan Filipina.", source: "Manuskrip Melayu: Sumber Maklumat Peribumi (2016)" }
    ],
    geographyConsensus: "Pandangan tokoh-tokoh ini hampir sama dari aspek geografi — kawasan merangkumi Malaysia, Indonesia, Singapura, Brunei, Filipina, selatan Thailand, selatan Myanmar dan selatan Indochina. Alam Melayu kini merupakan sebahagian daripada Asia Tenggara.",
    language: {
      familyName: "Bahasa Austronesia (dahulu dikenali sebagai Melayu Polinesia sebelum digantikan pada 1972 oleh UNESCO)",
      scholarView: "Bahasa Melayu tergolong dalam bahasa Austronesia — antara 200 bahasa yang dipertuturkan di Alam Melayu. Bahasa serumpun ini mempunyai perkaitan dengan bahasa etnik peribumi (Prof. Emeritus Dato' Dr. Asmah Haji Omar).",
      comparisonTable: [
        { word: "Empat", translations: [{ language: "Melayu (Malaysia)", term: "Empat" }, { language: "Jawa (Indonesia)", term: "Papat" }, { language: "Melayu (Brunei)", term: "Ampat" }, { language: "Tagalog (Filipina)", term: "Apat" }, { language: "Melanau (Sibu, Sarawak)", term: "Pat" }, { language: "Kadazandusun (Sabah)", term: "Apat" }] },
        { word: "Lima", translations: [{ language: "Melayu (Malaysia)", term: "Lima" }, { language: "Jawa (Indonesia)", term: "Limo" }, { language: "Melayu (Brunei)", term: "Lima" }, { language: "Tagalog (Filipina)", term: "Lima" }, { language: "Melanau (Sibu, Sarawak)", term: "Limah" }, { language: "Kadazandusun (Sabah)", term: "Limo" }] }
      ]
    },
    culture: {
      sharedElements: ["Bahasa dan tulisan", "Persuratan", "Struktur sosial", "Kesenian", "Kepercayaan", "Adat"],
      scholarView: "Budaya di Alam Melayu berkembang maju sejak awal dengan kepandaian asli seperti pembuatan gangsa dan seni mempertahankan diri (silat). Nilai gotong-royong wujud dalam masyarakat, dan wayang kulit muncul di Kelantan dan Pulau Jawa (Dato' A. Aziz Deraman, budayawan)."
    }
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
      { name: "Kerajaan Gangga Nagara", location: "Pantai barat bahagian tengah Tanah Melayu", era: "Abad Keenam", capital: "Pangkalan" }
    ]
  },
  famousKingdoms: [
    { name: "Kerajaan Funan", location: "Lembah Sungai Mekong", era: "Abad Pertama", capital: "Vyadhapura", founder: "Kaundinya (Brahmin)", foundingStory: "Kaundinya berkahwin dengan Soma, pemerintah wanita di Sungai Mekong, membentuk kerajaan Funan", glory: "Masyhur di bawah Fan Shih-man, yang meluaskan empayar ke Sungai Mekong hingga Teluk Camranh, menguasai selatan Myanmar dan Segenting Kra — menjadikan Funan pusat perdagangan utama Alam Melayu pada abad ketiga", keyRuler: "Fan Shih-man", decline: "Raja terakhir Rudravarman; serangan kerajaan Chenla di utara menyebabkan kemerosotan" },
    { name: "Kerajaan Champa", location: "Selatan dan tengah Vietnam", era: "Abad Kedua", capital: "Indrapura", founder: "Chu-Lien (192 M)", foundingStory: "Chu-Lien membebaskan Champa daripada pengaruh China", glory: "Zaman kemasyhuran di bawah Che Bong Nga, yang mengatasi ancaman Dai Viet dan meluaskan empayar hingga Lembah Sungai Merah, membunuh Raja Tran Due Tong; mendapat pengiktirafan Dinasti Ming pada 1369", keyRuler: "Che Bong Nga", decline: "Kematian Indravarman (1441); Dai Viet menawan Champa pada 1471" },
    { name: "Kerajaan Srivijaya", location: "Lembah Sungai Musi, Sumatera", era: "Abad Ketujuh", capital: "Palembang", founder: "Dapunta Hyang Sri Jayanasa (683 M)", foundingStory: "Menakluk kawasan sekitar seperti Bangka dan Taruma", glory: "Di bawah Sangramadhananjaya (abad kelapan), menakluk Sumatera, selatan Myanmar, Tanah Melayu dan Segenting Kra — menguasai Selat Melaka dan Selat Sunda, menjadi kuasa perdagangan utama dan pusat pengajian agama Buddha", keyRuler: "Sangramadhananjaya", decline: "Serangan tentera Chola dari selatan India pada 1025" },
    { name: "Kerajaan Angkor", location: "Lembah Sungai Mekong", era: "Abad Kesembilan", capital: "Hariharalaya", founder: "Jayavarman II (dari Chenla)", foundingStory: "Menyatukan wilayah di Lembah Sungai Mekong", glory: "Suryavarman II meluaskan empayar ke selatan Myanmar; Jayavarman VII meluaskan hingga sempadan Annam, membina Angkor Thom dan mendirikan 102 buah hospital", keyRuler: "Jayavarman VII", decline: "Selepas kematian Jayavarman VII, serangan Siam pada 1594 melemahkan kerajaan" },
    { name: "Kerajaan Majapahit", location: "Lembah Sungai Brantas, Jawa Timur", era: "Abad Ke-13", capital: "Kota Trowulan", founder: "Raden Vijaya (1294, dibantu tentera Mongol)", foundingStory: "Kemenangan dalam perebutan kuasa di Jawa", glory: "Patih Gajah Mada (Perdana Menteri, dilantik Tribuana Tunggadewi) meluaskan jajahan ke timur Jawa, pesisir timur Sumatera, selatan/barat Borneo, selatan/timur Sulawesi, Kepulauan Maluku — pusat perdagangan abad ke-14", keyRuler: "Patih Gajah Mada", decline: "Kematian Patih Gajah Mada dan serangan kerajaan Demak pada 1478" },
    { name: "Kerajaan Kedah Tua", location: "Sungai Mas dan Sungai Bujang", era: "Abad Kelima", capital: "Sungai Mas dan Pangkalan Bujang", foundingStory: "Bermula dengan masyarakat Guar Kepah berdagang dengan pedagang luar di Sungai Mas; dikenali sebagai Chieh Ch'a (China), Kataha (India), Kalah-bar (Arab)", glory: "Kepesatan perdagangan di Lembah Bujang, menjadi pusat keagamaan Buddha — menyebabkan Srivijaya menguasainya", decline: "Serangan tentera Chola dari India pada 1025; berubah menjadi Kesultanan Kedah pada abad ketujuh" },
    { name: "Kerajaan Gangga Nagara", location: "Pantai barat bahagian tengah Tanah Melayu", era: "Abad Keenam (pelabuhan sejak abad kelima)", capital: "Pangkalan", founder: "Raja Ganji Sarjuna (atau Raja Khmer dari Kemboja, menurut pendapat lain)", glory: "Kemasyhuran bermula abad kesembilan — dikunjungi pedagang luar kerana kekayaan emas dan bijih timah; berjaya mempertahankan kedaulatan daripada serangan Srivijaya pada 850 M", decline: "Serangan tentera Chola dari India pada 1025 memusnahkan pelabuhan" }
  ],
  contemporaryKingdoms: {
    intro: "Kemunculan kerajaan Alam Melayu sezaman dengan kerajaan-kerajaan luar yang lain, membuktikan Alam Melayu membangun dan maju setanding dengan tamadun besar dunia.",
    eras: [
      { century: "Abad Pertama", malayKingdoms: ["Funan"], foreignKingdoms: ["Empayar Rom", "Empayar Parsi", "Empayar Kushan", "Dinasti Han"] },
      { century: "Abad Kesembilan", malayKingdoms: ["Champa", "Srivijaya", "Angkor"], foreignKingdoms: ["Kerajaan Abbasiyah", "Empayar Byzantine", "Dinasti Tang", "Kerajaan Chola"] },
      { century: "Abad Ke-14", malayKingdoms: ["Champa", "Angkor", "Majapahit"], foreignKingdoms: ["Empayar Mongol", "Kerajaan Turki Uthmaniyah", "Kesultanan Delhi"] }
    ],
    relations: [
      { type: "Perdagangan", description: "Kedudukan strategik di laluan perdagangan timur-barat serta kekayaan hasil bumi mendorong hubungan perdagangan — barangan Alam Melayu dibawa ke Rom melalui pelabuhan seperti Kedah Tua, Oc Eo, dan Palembang, melalui Lautan Hindi ke Alexandria, Tyre, Antioch" },
      { type: "Keagamaan", description: "Kerajaan seperti Srivijaya dan Kedah Tua menjadi pusat pengajian agama Buddha, menarik golongan agama dari China, India dan Arab-Parsi" },
      { type: "Diplomatik", description: "Hubungan diplomatik terjalin, contohnya pengiktirafan Dinasti Ming terhadap pemerintahan Champa pada 1369" }
    ]
  },
  keyExamFacts: [
    "Alam Melayu boleh dilihat dari 3 sudut: geografi, bahasa, budaya",
    "4 tokoh mengemukakan pandangan geografi Alam Melayu: Nik Hassan Shuhaimi, Ismail Hussein, Alfred Russel Wallace, Ding Choo Ming",
    "Bahasa Melayu tergolong dalam keluarga bahasa Austronesia (dahulu Melayu Polinesia)",
    "7 kerajaan awal Alam Melayu: Funan, Champa, Srivijaya, Angkor, Majapahit, Kedah Tua, Gangga Nagara",
    "Funan (abad pertama) ialah kerajaan Alam Melayu paling awal, diasaskan Kaundinya, berpusat di Vyadhapura",
    "Kerajaan-kerajaan Alam Melayu sezaman dengan Empayar Rom (abad 1), Dinasti Tang/Abbasiyah (abad 9), Empayar Mongol/Uthmaniyah (abad 14)",
    "Kebanyakan kerajaan awal Alam Melayu runtuh akibat serangan tentera Chola dari India pada tahun 1025 (Srivijaya, Kedah Tua, Gangga Nagara)"
  ],
  keyTerms: [
    "Alam Melayu", "Kepulauan Melayu", "Dunia Melayu", "Pentas Sunda", "Bahasa Austronesia",
    "Serumpun", "Gotong-royong", "Silat", "Wayang kulit", "Brahmin", "Kemasyhuran"
  ],
  chapterSummary: "Bab 1 memperkenalkan konsep Alam Melayu dari sudut geografi (4 pandangan tokoh), bahasa (keluarga Austronesia, persamaan bunyi merentas 6 bahasa serumpun) dan budaya (silat, wayang kulit, gotong-royong), kewujudan 7 kerajaan awal Alam Melayu di lembah sungai, kemasyhuran setiap kerajaan (pengasas, zaman kegemilangan, kemerosotan), serta kedudukan kerajaan Alam Melayu yang sezaman dengan tamadun besar dunia (Rom, Tang, Mongol) melalui hubungan perdagangan, keagamaan dan diplomatik."
};

export default sej2Ch1Content;
