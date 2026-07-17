// geo12-content.ts
// Source-verified content for Geography Form 1, Bab 12 — Sumber Air (Water Resources)
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 132-143)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface WaterSourceExample {
  type: string;
  examples: string[];
}

export interface CrisisCause {
  cause: string;
  details: string[];
}

export interface CrisisEffect {
  effect: string;
  details: string[];
}

export interface MitigationStep {
  step: number;
  name: string;
  details: string[];
}

export interface Geo12Content {
  hook: { title: string; body: string };
  overview: {
    annualRainfall: string;
    surfaceWaterPercent: string;
    source: string;
  };
  surfaceWater: {
    definition: string;
    process: string[];
    riverBasinCount: string;
    examples: WaterSourceExample[];
  };
  groundwater: {
    definition: string;
    totalReserve: string;
    usagePercent: string;
  };
  crisisDefinition: string;
  crisisCauses: CrisisCause[];
  crisisEffects: CrisisEffect[];
  mitigationSteps: MitigationStep[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo12Content: Geo12Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Malaysia menerima hujan lebih 2,500mm setahun — namun masih mengalami krisis air. Bab ini menunjukkan bagaimana negara yang kaya dengan sumber air masih boleh menghadapi kekurangan, dan apa yang boleh dilakukan untuk mengatasinya."
  },
  overview: {
    annualRainfall: "Kira-kira 2,500 mm hingga 3,000 mm setahun",
    surfaceWaterPercent: "97% sumber air negara adalah daripada air permukaan",
    source: "Jabatan Pengairan dan Saliran Malaysia"
  },
  surfaceWater: {
    definition: "Air permukaan ialah air yang didapati di permukaan daratan.",
    process: [
      "Apabila hujan turun, air hujan mengalami proses hidrologi seperti intersepsi dan infiltrasi",
      "Air hujan mengalir di permukaan bumi sebagai air permukaan",
      "Air permukaan sampai ke sistem saliran seperti sungai, empangan dan tasik"
    ],
    riverBasinCount: "Lebih kurang 150 lembangan sungai utama di Malaysia membekalkan sumber air mentah negara",
    examples: [
      { type: "Sungai", examples: ["Sungai Kelantan (Kelantan)", "Sungai Rajang (Sarawak)", "Sungai Pahang (Pahang)", "Sungai Muda (Kedah)", "Sungai Kinabatangan (Sabah)"] },
      { type: "Tasik", examples: ["Tasik Banding (Perak)", "Tasik Kenyir (Terengganu)", "Tasik Bera (Pahang)", "Tasik Chenderoh (Perak)"] }
    ]
  },
  groundwater: {
    definition: "Air bawah tanah bermaksud air yang tersimpan dalam lapisan tanah atau batuan yang terletak di bawah permukaan bumi.",
    totalReserve: "Kira-kira 5,000 bilion meter padu simpanan air bawah tanah yang belum diterokai",
    usagePercent: "Hanya 3% air bawah tanah yang digunakan di Malaysia"
  },
  crisisDefinition: "Krisis air merujuk kepada situasi kekurangan sumber air yang dapat digunakan. Krisis air pernah berlaku di Malaysia seperti di Selangor, Putrajaya dan Kuala Lumpur pada tahun 2014.",
  crisisCauses: [
    { cause: "Penebangan Hutan di Kawasan Tadahan Air", details: ["Penerokaan hutan secara meluas dalam pembalakan dan pertanian menjadi punca hakisan tanah", "Pemendapan dan hakisan cerun menjejaskan bekalan serta kualiti sumber air"] },
    { cause: "Fenomena Cuaca", details: ["Kemarau dan El Nino merupakan punca krisis air", "El Nino 2016 menyebabkan kemarau panjang di seluruh Semenanjung Malaysia", "Aras air di Empangan Timah Tasoh (Perlis) dan Empangan Tasik Merah (Perak) menyusut ke tahap kritikal"] },
    { cause: "Pembuangan Sampah Sarap ke dalam Sungai", details: ["Kebanyakan sungai di Malaysia tercemar dengan sampah dan sisa industri", "2016: 229 daripada 473 sungai di seluruh negara didapati tercemar"] },
    { cause: "Permintaan Tinggi Sektor Perindustrian", details: ["Menjelang 2020, permintaan air dalam sektor perindustrian terus meningkat", "Industri pemprosesan makanan, pembuatan, penyaduran dan kimia menggunakan banyak air"] },
    { cause: "Penggunaan Baja Kimia dan Racun Serangga dalam Pertanian", details: ["Penggunaan berlebihan atau tidak mengikut piawaian menyebabkan pencemaran sungai yang serius"] },
    { cause: "Peningkatan Populasi Penduduk Malaysia", details: ["Pada 2020, penduduk Malaysia dianggarkan 35 juta orang", "Pertambahan penduduk meningkatkan permintaan terhadap air"] }
  ],
  crisisEffects: [
    { effect: "Kekurangan Bekalan Air Bersih", details: ["Bekalan air bersih terpaksa dicatu semasa krisis air", "Menyukarkan kegiatan harian penduduk dan mengganggu sektor perindustrian"] },
    { effect: "Kesan ke Atas Tanih", details: ["Krisis air menyebabkan tanah kering-kontang dan mengubah tekstur tanah", "Menjejaskan kegiatan pertanian seperti penanaman padi, bekalan makanan dan hasil pengeluaran negara"] },
    { effect: "Kepupusan Flora dan Fauna", details: ["Pencemaran air menyebabkan flora dan fauna mati dan pupus", "Menyebabkan ketidakseimbangan ekosistem yang mengancam kehidupan manusia", "Memberi kesan buruk terhadap hidupan akuatik"] },
    { effect: "Kemudaratan kepada Manusia", details: ["Penyakit bawaan air boleh menular selepas bekalan air bersih tercemar", "Contoh: taun, demam kepialu, leptospirosis"] }
  ],
  mitigationSteps: [
    { step: 1, name: "Pemeliharaan dan Pemuliharaan Kawasan Tadahan Hujan", details: ["Hutan di tanah tinggi berperanan sebagai kawasan tadahan hujan", "Contoh: hutan seluas 160,000 hektar di Padang Terap, Kedah — kawasan tadahan hujan bagi Empangan Pedu"] },
    { step: 2, name: "Penguatkuasaan Undang-undang", details: ["Pihak berkuasa memantau pengusaha industri yang membuang sisa toksik ke longkang dan sungai", "Contoh: Akta Suruhanjaya Perkhidmatan Air, Akta Kualiti Alam Sekeliling 1974"] },
    { step: 3, name: "Rawatan Air Kumbahan", details: [] },
    { step: 4, name: "Meneroka Air Bawah Tanah", details: [] },
    { step: 5, name: "Kempen Kesedaran terhadap Alam Sekitar", details: [] }
  ],
  keyExamFacts: [
    "Malaysia menerima hujan tahunan 2,500-3,000 mm; 97% sumber air negara daripada air permukaan",
    "Lebih 150 lembangan sungai utama membekalkan sumber air mentah negara",
    "Hanya 3% daripada 5,000 bilion meter padu simpanan air bawah tanah digunakan",
    "6 punca krisis air: penebangan hutan tadahan, fenomena cuaca, pembuangan sampah, permintaan perindustrian, baja kimia/racun serangga, peningkatan populasi",
    "2016: 229 daripada 473 sungai di Malaysia didapati tercemar",
    "4 kesan krisis air: kekurangan bekalan air bersih, kesan ke atas tanih, kepupusan flora/fauna, kemudaratan kepada manusia",
    "5 langkah mengurangkan kesan krisis air: pemuliharaan kawasan tadahan, penguatkuasaan undang-undang, rawatan air kumbahan, penerokaan air bawah tanah, kempen kesedaran"
  ],
  keyTerms: [
    "Air permukaan", "Air bawah tanah", "Intersepsi", "Infiltrasi", "Krisis air",
    "Lembangan sungai", "Kawasan tadahan hujan", "Dicatu", "Leptospirosis",
    "Akta Kualiti Alam Sekeliling 1974"
  ],
  chapterSummary: "Bab 12 merangkumi dua jenis sumber air Malaysia (air permukaan 97%, air bawah tanah 3%), definisi krisis air dan 6 puncanya (penebangan hutan, cuaca, pencemaran sampah, permintaan perindustrian, baja kimia, populasi), 4 kesan krisis air (bekalan air, tanih, flora/fauna, kesihatan manusia), serta 5 langkah untuk menguranginya."
};

export default geo12Content;
