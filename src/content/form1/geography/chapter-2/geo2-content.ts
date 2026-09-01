// geo2-content.ts
// Source-verified content for Geography Form 1, Bab 2 — Kedudukan (Position)
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 12-23)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface RelativePositionExample {
  person: string;
  relation: string;
  direction: "hadapan" | "belakang" | "kiri" | "kanan";
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
    classroomPractice: {
      referencePoint: string;
      positions: RelativePositionExample[];
    }[];
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
    atlasEstimationSteps: CoordinateStep[];
    atlasExample: string;
  };
  technology: {
    gps: {
      definition: string;
      satelliteRequirement: string;
    };
    gis: {
      definition: string;
      functions: string[];
    };
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo2Content: Geo2Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap tempat di Bumi mempunyai alamat unik — bukan alamat jalan, tetapi satu set nombor yang dipanggil latitud dan longitud. Bab ini mengajar anda cara menentukan kedudukan sesuatu tempat, sama ada berbanding objek lain di sekeliling anda, atau berbanding seluruh planet ini.",
  },
  relativePosition: {
    definition:
      "Kedudukan ialah tempat letaknya sesuatu objek dalam sesuatu kawasan. Kedudukan relatif ditentukan dengan merujuk kepada satu titik rujukan.",
    referencePointNote:
      "Sekiranya titik rujukan ditukar kepada objek atau orang lain, kedudukan relatif turut akan berubah.",
    classroomExamples: [
      { person: "Chin", relation: "duduk di hadapan Siti", direction: "hadapan" },
      { person: "Siva", relation: "duduk di belakang Siti", direction: "belakang" },
      { person: "Akmal", relation: "duduk di sebelah kiri Siti", direction: "kiri" },
      { person: "Dina", relation: "duduk di sebelah kanan Siti", direction: "kanan" },
    ],
    classroomPractice: [
      {
        referencePoint: "Sonia",
        positions: [
          { person: "Raju", relation: "duduk di hadapan Sonia", direction: "hadapan" },
          { person: "Dina", relation: "duduk di belakang Sonia", direction: "belakang" },
          { person: "Siva", relation: "duduk di sebelah kanan Sonia", direction: "kanan" },
          { person: "Adam", relation: "duduk di sebelah kiri Sonia", direction: "kiri" },
        ],
      },
      {
        referencePoint: "Siva",
        positions: [
          { person: "Rita", relation: "duduk di hadapan Siva", direction: "hadapan" },
          { person: "Siti", relation: "duduk di belakang Siva", direction: "belakang" },
          { person: "Asma", relation: "duduk di sebelah kanan Siva", direction: "kanan" },
          { person: "Sonia", relation: "duduk di sebelah kiri Siva", direction: "kiri" },
        ],
      },
      {
        referencePoint: "Dina",
        positions: [
          { person: "Akim", relation: "duduk di hadapan Dina", direction: "hadapan" },
          { person: "Sonia", relation: "duduk di belakang Dina", direction: "belakang" },
          { person: "Zaim", relation: "duduk di sebelah kanan Dina", direction: "kanan" },
          { person: "Siti", relation: "duduk di sebelah kiri Dina", direction: "kiri" },
        ],
      },
    ],
    fieldExample: {
      referencePoint: "Masjid",
      positions: [
        { person: "Bank", relation: "terletak di hadapan masjid", direction: "hadapan" },
        { person: "Hospital", relation: "terletak di belakang masjid", direction: "belakang" },
        { person: "Sekolah", relation: "terletak di sebelah kiri masjid", direction: "kiri" },
        { person: "Pejabat pos", relation: "terletak di sebelah kanan masjid", direction: "kanan" },
      ],
    },
    changingReferencePointNote:
      "Titik rujukan boleh menjadi apa-apa sahaja — seorang murid, sebuah bangunan, atau rumah anda sendiri — dan kedudukan relatif semua objek lain akan berubah mengikut titik rujukan yang dipilih.",
  },
  latitude: {
    definition:
      "Garisan latitud ialah garisan yang dilukis secara melintang atau mendatar pada glob atau peta atlas.",
    valueRange:
      "Setiap latitud diberi nilai 0° hingga 90°U dan 0° hingga 90°S, yang diukur dari pusat bumi.",
    equatorNote:
      "Latitud 0°, atau Garisan Khatulistiwa, membahagikan Bumi kepada Hemisfera Utara dan Hemisfera Selatan.",
    mainLines: [
      { value: "90°U", name: "Kutub Utara" },
      { value: "66°U", name: "Garisan Artik" },
      { value: "23°U", name: "Garisan Sartan" },
      { value: "0°", name: "Garisan Khatulistiwa" },
      { value: "23°S", name: "Garisan Jadi" },
      { value: "66°S", name: "Garisan Antartik" },
      { value: "90°S", name: "Kutub Selatan" },
    ],
    equatorLengthFact:
      "Panjang Garisan Khatulistiwa kira-kira 40 075 km. Malaysia merupakan antara negara yang terletak berhampiran dengan Garisan Khatulistiwa.",
  },
  longitude: {
    definition:
      "Garisan longitud ialah garisan yang dilukis secara menegak dari Kutub Utara ke Kutub Selatan pada glob atau atlas.",
    primeMeridian:
      "Longitud 0° dinamakan Garisan Meridian Pangkal (GMP), yang memisahkan bahagian timur dan barat bumi. Garisan ini juga dikenali sebagai Garisan Meridian Greenwich (berhampiran Bandar Greenwich, London).",
    internationalDateLine:
      "Garisan Tarikh Antarabangsa (GTA) terletak pada 180° T/B, selari dengan Garisan Meridian Pangkal.",
    dateLineTimeNote:
      "GTA memisahkan tarikh dan waktu di Bumi — tarikh dan waktu di sebelah timur adalah sehari lebih awal berbanding di sebelah barat.",
    malaysiaCenterFact:
      "Titik tengah bagi Semenanjung Malaysia terletak di Kampung Paya Siput, Lanchang, Temerloh, Pahang.",
  },
  readingCoordinates: {
    steps: [
      { step: 1, instruction: "Kenal pasti garisan latitud bagi titik tersebut" },
      { step: 2, instruction: "Kenal pasti garisan longitud bagi titik tersebut" },
      {
        step: 3,
        instruction: "Kenal pasti titik persilangan antara garisan latitud dan longitud tersebut",
      },
    ],
    example:
      "Contoh: titik A bersilang pada garisan 30°U dan 40°T — maka kedudukan titik A ialah 30°U 40°T",
    atlasEstimationSteps: [
      {
        step: 1,
        instruction: "Bahagikan ruang antara dua garisan latitud utama kepada bahagian yang sekata",
      },
      {
        step: 2,
        instruction: "Bahagikan ruang antara dua garisan longitud utama dengan cara yang sama",
      },
      {
        step: 3,
        instruction:
          "Anggarkan nilai latitud dan longitud kecil, kemudian tentukan titik persilangannya",
      },
    ],
    atlasExample:
      "Contoh atlas: Titik P berada pada latitud 4°U dan longitud 102°T. Kedudukannya ditulis sebagai 4°U 102°T.",
  },
  technology: {
    gps: {
      definition:
        "Sistem Kedudukan Global (GPS) menggunakan satelit di angkasa lepas yang berhubung dengan penerima GPS untuk menentukan lokasi sesuatu objek atau tempat secara tepat.",
      satelliteRequirement:
        "Penerima GPS perlu berhubung dengan sekurang-kurangnya empat satelit untuk mengira koordinat dan lokasi yang tepat.",
    },
    gis: {
      definition:
        "Sistem Maklumat Geografi (GIS) mengurus data spatial atau geografi supaya pola dan hubungan lokasi dapat difahami.",
      functions: [
        "Mengumpul",
        "Menyimpan",
        "Mengemas kini",
        "Memproses",
        "Menganalisis",
        "Mempersembahkan data spatial",
      ],
    },
  },
  keyExamFacts: [
    "Kedudukan relatif sentiasa bergantung kepada titik rujukan yang dipilih — jika titik rujukan berubah, kedudukan relatif turut berubah",
    "Empat arah kedudukan relatif: hadapan, belakang, kiri, kanan",
    "Garisan latitud melintang/mendatar; garisan longitud menegak",
    "Terdapat 5 garisan latitud utama: Garisan Artik (66°U), Garisan Sartan (23°U), Khatulistiwa (0°), Garisan Jadi (23°S), Garisan Antartik (66°S)",
    "Garisan Khatulistiwa (0°) membahagikan Bumi kepada Hemisfera Utara dan Selatan",
    "Garisan Meridian Pangkal (0° longitud) memisahkan timur dan barat Bumi",
    "Garisan Tarikh Antarabangsa terletak pada 180° T/B, memisahkan tarikh dan waktu di Bumi",
    "Kedudukan sesuatu tempat dinyatakan berdasarkan persilangan garisan latitud dan longitudnya",
    "Tulis latitud dahulu, kemudian longitud",
    "GPS memerlukan sekurang-kurangnya empat satelit untuk menentukan koordinat dengan tepat",
    "GIS digunakan untuk mengurus, menganalisis dan mempersembahkan data spatial",
  ],
  keyTerms: [
    "Kedudukan",
    "Kedudukan relatif",
    "Titik rujukan",
    "Latitud",
    "Longitud",
    "Hemisfera",
    "Kutub",
    "Garisan Khatulistiwa",
    "Garisan Artik",
    "Garisan Sartan",
    "Garisan Jadi",
    "Garisan Antartik",
    "Garisan Meridian Pangkal",
    "Garisan Meridian Greenwich",
    "Garisan Tarikh Antarabangsa",
    "Sistem Kedudukan Global (GPS)",
    "Sistem Maklumat Geografi (GIS)",
    "Data spatial",
  ],
  chapterSummary:
    "Bab 2 merangkumi kedudukan relatif berdasarkan titik rujukan dan kedudukan mutlak berdasarkan persilangan latitud dengan longitud. Bab ini menerangkan garisan utama Bumi, urutan membaca koordinat, anggaran koordinat pada atlas, serta penggunaan GPS dan GIS untuk menentukan dan menganalisis lokasi.",
};

export default geo2Content;
