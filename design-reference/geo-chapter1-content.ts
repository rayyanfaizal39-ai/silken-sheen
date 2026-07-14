// geo-chapter1-content.ts
// Source-verified content for Geography Form 1, Bab 1 — Arah (Direction)
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 1-11)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface CompassDirection {
  code: string;
  name: string;
  type: 'utama' | 'perantaraan';
  note?: string;
}

export interface SunMethodStep {
  step: number;
  instruction: string;
}

export interface CompassPart {
  name: string;
  function: string;
}

export interface CompassOrientationStep {
  step: number;
  instruction: string;
}

export interface CompassHistoryFact {
  origin: string;
  fact: string;
}

export interface BearingStep {
  step: number;
  instruction: string;
}

export interface Geo1Content {
  hook: { title: string; body: string };
  compassDirections: {
    definition: string;
    directions: CompassDirection[];
    naturalNavigationFacts: string[];
  };
  sunMethod: {
    whyItWorks: string;
    steps: SunMethodStep[];
    nightMethod: string;
  };
  compassMethod: {
    definition: string;
    parts: CompassPart[];
    whyNeedlePointsNorth: string;
    orientationSteps: CompassOrientationStep[];
    interferenceWarning: string;
    historyFacts: CompassHistoryFact[];
  };
  bearing: {
    definition: string;
    unit: string;
    etymologyNote: string;
    basicMethodSteps: BearingStep[];
    over180Rule: { steps: BearingStep[]; example: string };
    commonMistakeWarning: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const geo1Content: Geo1Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap peta, setiap arah pandu arah, dan setiap penerokaan bermula dengan satu kemahiran asas: mengetahui arah. Bab ini mengajar tiga cara berbeza untuk menentukan arah — menggunakan lapan arah mata angin, matahari, dan kompas — kemahiran yang akan anda gunakan dalam setiap bab geografi seterusnya."
  },
  compassDirections: {
    definition: "Arah ialah hala tuju sesuatu tempat dari satu tempat yang lain. Terdapat lapan arah mata angin yang terbahagi kepada dua kategori.",
    directions: [
      { code: "U", name: "Utara", type: "utama", note: "atas peta" },
      { code: "S", name: "Selatan", type: "utama", note: "bawah peta" },
      { code: "T", name: "Timur", type: "utama", note: "kanan, arah matahari terbit" },
      { code: "B", name: "Barat", type: "utama", note: "kiri, arah matahari terbenam" },
      { code: "TL", name: "Timur Laut", type: "perantaraan", note: "antara Utara dan Timur" },
      { code: "Tg", name: "Tenggara", type: "perantaraan", note: "antara Timur dan Selatan" },
      { code: "BD", name: "Barat Daya", type: "perantaraan", note: "antara Barat dan Selatan" },
      { code: "BL", name: "Barat Laut", type: "perantaraan", note: "antara Barat dan Utara" }
    ],
    naturalNavigationFacts: [
      "Buruj Biduk (sekumpulan bintang di langit malam yang cerah) boleh digunakan untuk menentukan arah Utara",
      "Burung merpati menggunakan pelbagai cara untuk menentukan arah dengan cepat, termasuk penglihatan visual, medan magnet bumi, deria bau, dan deria rasa"
    ]
  },
  sunMethod: {
    whyItWorks: "Bumi berputar pada paksinya dari barat ke timur. Keadaan ini menyebabkan matahari kelihatan terbit di sebelah timur dan terbenam di sebelah barat. Oleh itu, kita dapat menggunakan matahari sebagai panduan untuk menentukan arah mata angin.",
    steps: [
      { step: 1, instruction: "Berdiri menghadap ke arah matahari terbit pada awal pagi" },
      { step: 2, instruction: "Arah di hadapan anda ialah Timur, manakala arah di belakang anda ialah Barat" },
      { step: 3, instruction: "Depakan kedua-dua belah tangan anda — tangan kiri menunjukkan arah Utara, tangan kanan menunjukkan arah Selatan" }
    ],
    nightMethod: "Pada waktu malam, buruj seperti Buruj Biduk di langit cerah digunakan untuk menunjukkan arah Utara."
  },
  compassMethod: {
    definition: "Kompas magnetik ialah instrumen yang dicipta untuk menentukan arah dengan tepat.",
    parts: [
      { name: "Perumah", function: "Bekas pelindung kompas" },
      { name: "Pemuka (muka dial)", function: "Permukaan yang menunjukkan lapan arah mata angin" },
      { name: "Jarum kompas", function: "Sentiasa menunjuk ke arah utara" }
    ],
    whyNeedlePointsNorth: "Jarum kompas sentiasa menunjuk ke arah utara kerana dipengaruhi oleh tarikan magnet daripada kutub utara bumi.",
    orientationSteps: [
      { step: 1, instruction: "Berdiri menghadap objek yang anda ingin tentukan arah" },
      { step: 2, instruction: "Letakkan kompas pada permukaan yang rata, supaya jarum bebas berpusing" },
      { step: 3, instruction: "Pastikan anda menjauhi objek besi/logam seperti tiang lampu, pagar, atau jam tangan yang boleh mengganggu jarum" },
      { step: 4, instruction: "Orientasikan kompas dengan memusingkan badan kompas perlahan-lahan sehingga jarum bertindih dengan tanda U pada dial" },
      { step: 5, instruction: "Baca arah objek tersebut berpandukan petunjuk pada dial" }
    ],
    interferenceWarning: "Objek besi atau logam berhampiran (tiang lampu, pagar, jam tangan) boleh mengganggu bacaan jarum kompas — pastikan anda menjauhinya semasa mengorientasikan kompas.",
    historyFacts: [
      { origin: "Tamadun Islam", fact: "Kompas jarum dicipta pada Zaman Tamadun Islam dan digunakan oleh pelayar-pelayar Islam di Lautan Hindi" },
      { origin: "Dinasti Han, China", fact: "Kompas purba China ini dicipta pada Zaman Dinasti Han, pada awalnya digunakan untuk tujuan pelayaran" },
      { origin: "Kompas Kiblat", fact: "Kompas kiblat mempunyai konsep hampir sama dengan kompas magnetik, digunakan untuk menentukan arah kiblat bagi umat Islam" }
    ]
  },
  bearing: {
    definition: "Bearing ialah arah sesuatu objek atau tempat dari satu titik rujukan.",
    unit: "Darjah (°)",
    etymologyNote: "Bearing sudutan juga dikenali sebagai bearing azimut. Perkataan azimut berasal daripada bahasa Arab 'al-sumut', yang bermaksud arah.",
    basicMethodSteps: [
      { step: 1, instruction: "Sambungkan dua titik dengan garis lurus" },
      { step: 2, instruction: "Tentukan titik rujukan (dikenal pasti dengan kata kunci 'dari')" },
      { step: 3, instruction: "Bina simbol mata angin di titik rujukan, dengan Utara menghadap atas" },
      { step: 4, instruction: "Letakkan pusat jangka sudut di titik rujukan dan selaraskan 0° dengan Utara" },
      { step: 5, instruction: "Baca skala LUAR jangka sudut mengikut arah pusingan jam untuk mendapatkan bearing sudutan" }
    ],
    over180Rule: {
      steps: [
        { step: 1, instruction: "Jika objek berada melebihi separuh bulatan (selepas arah Selatan/180°), ukur sudut baki daripada Selatan" },
        { step: 2, instruction: "Tambah 180° kepada sudut baki tersebut untuk mendapatkan bearing sudutan penuh" }
      ],
      example: "Contoh: sudut baki 121° → bearing sudutan = 180° + 121° = 301°"
    },
    commonMistakeWarning: "Jangan baca skala DALAM pada jangka sudut kerana ia mengikut arah lawan jam — ini adalah kesilapan biasa yang menyebabkan jawapan salah."
  },
  keyExamFacts: [
    "Terdapat lapan arah mata angin — empat utama (U, S, T, B) dan empat perantaraan (TL, Tg, BD, BL)",
    "Bumi berputar dari barat ke timur, menyebabkan matahari terbit di timur dan terbenam di barat",
    "Jarum kompas sentiasa menunjuk ke utara kerana tarikan magnet daripada kutub utara bumi",
    "Objek besi/logam berhampiran boleh mengganggu bacaan kompas",
    "Bearing sudutan diukur dari Utara (0°) mengikut arah pusingan jam, menggunakan jangka sudut",
    "Bearing sudutan juga dikenali sebagai bearing azimut",
    "Untuk bearing melebihi 180°, ukur sudut baki daripada Selatan dan tambah 180°",
    "Baca skala LUAR pada jangka sudut, bukan skala dalam"
  ],
  keyTerms: [
    "Arah", "Arah mata angin utama", "Arah mata angin perantaraan", "Kompas magnetik",
    "Perumah", "Pemuka", "Jarum kompas", "Orientasi kompas", "Kutub utara magnet",
    "Bearing", "Bearing sudutan", "Azimut", "Titik rujukan", "Jangka sudut", "Skala luar"
  ],
  chapterSummary: "Bab 1 memperkenalkan tiga cara menentukan arah: lapan arah mata angin (utama dan perantaraan), kaedah semula jadi menggunakan matahari (dan buruj pada waktu malam), dan penggunaan kompas magnetik yang tepat termasuk sejarahnya. Bab ini turut merangkumi cara mengukur bearing sudutan menggunakan jangka sudut, termasuk kaedah khas untuk bearing yang melebihi 180°."
};

export default geo1Content;
