// geo-chapter2-content.ts
// Source-verified content for Geography Form 1, Bab 2 — Kedudukan (Position)
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 12-23)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface RelativePositionExample {
  person: string;
  relation: string;
  direction: 'hadapan' | 'belakang' | 'kiri' | 'kanan';
}

export interface LatitudeLine {
  value: string;
  name: string;
}

export interface CoordinateStep {
  step: number;
  instruction: string;
}

export interface Geo2Content {
  hook: { title: string; body: string };
  relativePosition: {
    definition: string;
    referencePointNote: string;
    classroomExamples: RelativePositionExample[];
    fieldExample: {
      referencePoint: string;
      positions: RelativePositionExample[];
    };
    changingReferencePointNote: string;
  };
  latitude: {
    definition: string;
    valueRange: string;
    equatorNote: string;
    mainLines: LatitudeLine[];
    equatorLengthFact: string;
  };
  longitude: {
    definition: string;
    primeMeridian: string;
    internationalDateLine: string;
    dateLineTimeNote: string;
    malaysiaCenterFact: string;
  };
  readingCoordinates: {
    steps: CoordinateStep[];
    example: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const geo2Content: Geo2Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap tempat di Bumi mempunyai alamat unik — bukan alamat jalan, tetapi satu set nombor yang dipanggil latitud dan longitud. Bab ini mengajar anda cara menentukan kedudukan sesuatu tempat, sama ada berbanding objek lain di sekeliling anda, atau berbanding seluruh planet ini."
  },
  relativePosition: {
    definition: "Kedudukan ialah tempat letaknya sesuatu objek dalam sesuatu kawasan. Kedudukan relatif ditentukan dengan merujuk kepada satu titik rujukan.",
    referencePointNote: "Sekiranya titik rujukan ditukar kepada objek atau orang lain, kedudukan relatif turut akan berubah.",
    classroomExamples: [
      { person: "Chin", relation: "duduk di hadapan Siti", direction: "hadapan" },
      { person: "Siva", relation: "duduk di belakang Siti", direction: "belakang" },
      { person: "Akmal", relation: "duduk di sebelah kiri Siti", direction: "kiri" },
      { person: "Dina", relation: "duduk di sebelah kanan Siti", direction: "kanan" }
    ],
    fieldExample: {
      referencePoint: "Masjid",
      positions: [
        { person: "Bank", relation: "terletak di hadapan masjid", direction: "hadapan" },
        { person: "Hospital", relation: "terletak di belakang masjid", direction: "belakang" },
        { person: "Sekolah", relation: "terletak di sebelah kiri masjid", direction: "kiri" },
        { person: "Pejabat pos", relation: "terletak di sebelah kanan masjid", direction: "kanan" }
      ]
    },
    changingReferencePointNote: "Titik rujukan boleh menjadi apa-apa sahaja — seorang murid, sebuah bangunan, atau rumah anda sendiri — dan kedudukan relatif semua objek lain akan berubah mengikut titik rujukan yang dipilih."
  },
  latitude: {
    definition: "Garisan latitud ialah garisan yang dilukis secara melintang atau mendatar pada glob atau peta atlas.",
    valueRange: "Setiap latitud diberi nilai 0° hingga 90°U dan 0° hingga 90°S, yang diukur dari pusat bumi.",
    equatorNote: "Latitud 0°, atau Garisan Khatulistiwa, membahagikan Bumi kepada Hemisfera Utara dan Hemisfera Selatan.",
    mainLines: [
      { value: "90°U", name: "Kutub Utara" },
      { value: "66°U", name: "Garisan Artik" },
      { value: "23°U", name: "Garisan Sartan" },
      { value: "0°", name: "Garisan Khatulistiwa" },
      { value: "23°S", name: "Garisan Jadi" },
      { value: "66°S", name: "Garisan Antartik" },
      { value: "90°S", name: "Kutub Selatan" }
    ],
    equatorLengthFact: "Panjang Garisan Khatulistiwa kira-kira 40 075 km. Malaysia merupakan antara negara yang terletak berhampiran dengan Garisan Khatulistiwa."
  },
  longitude: {
    definition: "Garisan longitud ialah garisan yang dilukis secara menegak dari Kutub Utara ke Kutub Selatan pada glob atau atlas.",
    primeMeridian: "Longitud 0° dinamakan Garisan Meridian Pangkal (GMP), yang memisahkan bahagian timur dan barat bumi. Garisan ini juga dikenali sebagai Garisan Meridian Greenwich (berhampiran Bandar Greenwich, London).",
    internationalDateLine: "Garisan Tarikh Antarabangsa (GTA) terletak pada 180° T/B, selari dengan Garisan Meridian Pangkal.",
    dateLineTimeNote: "GTA memisahkan tarikh dan waktu di Bumi — tarikh dan waktu di sebelah timur adalah sehari lebih awal berbanding di sebelah barat.",
    malaysiaCenterFact: "Titik tengah bagi Semenanjung Malaysia terletak di Kampung Paya Siput, Lanchang, Temerloh, Pahang."
  },
  readingCoordinates: {
    steps: [
      { step: 1, instruction: "Kenal pasti garisan latitud bagi titik tersebut" },
      { step: 2, instruction: "Kenal pasti garisan longitud bagi titik tersebut" },
      { step: 3, instruction: "Kenal pasti titik persilangan antara garisan latitud dan longitud tersebut" }
    ],
    example: "Contoh: titik A bersilang pada garisan 30°U dan 40°T — maka kedudukan titik A ialah 30°U 40°T"
  },
  keyExamFacts: [
    "Kedudukan relatif sentiasa bergantung kepada titik rujukan yang dipilih — jika titik rujukan berubah, kedudukan relatif turut berubah",
    "Empat arah kedudukan relatif: hadapan, belakang, kiri, kanan",
    "Garisan latitud melintang/mendatar; garisan longitud menegak",
    "Terdapat 5 garisan latitud utama: Garisan Artik (66°U), Garisan Sartan (23°U), Khatulistiwa (0°), Garisan Jadi (23°S), Garisan Antartik (66°S)",
    "Garisan Khatulistiwa (0°) membahagikan Bumi kepada Hemisfera Utara dan Selatan",
    "Garisan Meridian Pangkal (0° longitud) memisahkan timur dan barat Bumi",
    "Garisan Tarikh Antarabangsa terletak pada 180° T/B, memisahkan tarikh dan waktu di Bumi",
    "Kedudukan sesuatu tempat dinyatakan berdasarkan persilangan garisan latitud dan longitudnya"
  ],
  keyTerms: [
    "Kedudukan", "Kedudukan relatif", "Titik rujukan", "Latitud", "Longitud",
    "Hemisfera", "Kutub", "Garisan Khatulistiwa", "Garisan Artik", "Garisan Sartan",
    "Garisan Jadi", "Garisan Antartik", "Garisan Meridian Pangkal", "Garisan Meridian Greenwich",
    "Garisan Tarikh Antarabangsa"
  ],
  chapterSummary: "Bab 2 merangkumi dua cara menentukan kedudukan: kedudukan relatif berdasarkan titik rujukan (hadapan, belakang, kiri, kanan), dan kedudukan mutlak berdasarkan latitud dan longitud. Bab ini turut meliputi lima garisan latitud utama, Garisan Meridian Pangkal, Garisan Tarikh Antarabangsa, dan cara menentukan kedudukan sesuatu tempat berdasarkan persilangan latitud dan longitudnya."
};

export default geo2Content;
