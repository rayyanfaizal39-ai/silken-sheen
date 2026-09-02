// geo8-content.ts
// Source-verified content for Geography Form 1, Bab 8 — Penduduk di Malaysia
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 86-95)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface DensityCategory {
  category: string;
  range: string;
  reason: string;
  examples: string[];
}

export interface FactorExample {
  factor: string;
  effect: string;
  examples: string[];
}

export interface Geo8Content {
  hook: { title: string; body: string };
  overview: {
    definition: string;
    totalPopulation: string;
    populationSource: string;
  };
  densityFormula: string;
  densityCategories: DensityCategory[];
  factors: {
    physical: FactorExample[];
    economic: FactorExample[];
    social: FactorExample[];
    governmentPolicy: FactorExample[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo8Content: Geo8Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Kenapa Kuala Lumpur sesak dengan manusia sementara pedalaman Pahang hampir kosong? Bab ini menunjukkan bahawa taburan penduduk bukan secara rawak — ia mengikuti corak yang boleh dijelaskan melalui bentuk muka bumi, ekonomi, kemudahan sosial dan dasar kerajaan.",
  },
  overview: {
    definition:
      "Taburan penduduk merujuk kepada sebaran penduduk di sesuatu kawasan atau negara. Taburan penduduk di Malaysia tidak sekata — terdapat kawasan yang berpenduduk padat, sederhana dan jarang.",
    totalPopulation:
      "Anggaran jumlah penduduk Malaysia pada tahun 2016 adalah seramai 31.7 juta orang",
    populationSource: "Jabatan Perangkaan Malaysia",
  },
  densityFormula: "Kepadatan Penduduk = Jumlah Penduduk (orang) ÷ Keluasan Kawasan (km²)",
  densityCategories: [
    {
      category: "Kawasan Berpenduduk Padat",
      range: "Lebih daripada 200 orang bagi sekilometer persegi",
      reason:
        "Kawasannya rata dan subur serta sesuai untuk pelbagai kegiatan seperti pertanian, perindustrian, perniagaan dan perlombongan",
      examples: [
        "Wilayah Persekutuan Kuala Lumpur",
        "Shah Alam (Selangor)",
        "Kuching (Sarawak)",
        "Kota Kinabalu (Sabah)",
        "Ipoh (Perak)",
        "Alor Setar (Kedah)",
        "Johor Bahru (Johor)",
      ],
    },
    {
      category: "Kawasan Berpenduduk Sederhana Padat",
      range: "50 hingga 200 orang bagi sekilometer persegi",
      reason:
        "Melibatkan kegiatan pertanian dan perikanan serta kawasan pinggir bandar dan bandar baharu",
      examples: [
        "Pantai timur Semenanjung Malaysia",
        "Kawasan pertanian dan perikanan di pesisir pantai",
        "Kawasan pinggir bandar dan bandar baharu",
      ],
    },
    {
      category: "Kawasan Berpenduduk Jarang",
      range: "Kurang daripada 50 orang bagi sekilometer persegi",
      reason:
        "Tertumpu di kawasan yang berhutan tebal dan kawasan tanah tinggi, melibatkan kawasan bergunung-ganang dan pedalaman",
      examples: [
        "Ulu Tembeling (Pahang)",
        "Banjaran Kapuas Hulu (Sarawak)",
        "Banjaran Tahan (Pahang)",
        "Kapit (Sarawak)",
      ],
    },
  ],
  factors: {
    physical: [
      {
        factor: "Tanah Pamah",
        effect:
          "Kawasan tumpuan penduduk kerana sesuai untuk pelbagai aktiviti ekonomi dan petempatan",
        examples: [
          "Dataran Kedah–Perlis",
          "Dataran Kelantan",
          "Seremban (N.Sembilan)",
          "Petaling Jaya (Selangor)",
          "Sibu (Sarawak)",
        ],
      },
      {
        factor: "Tanah Tinggi",
        effect:
          "Kurang menjadi tumpuan penduduk akibat darjah ketersampaian yang rendah dan kos pembinaan tinggi",
        examples: [
          "Ulu Tembeling (Pahang)",
          "Banjaran Kapuas Hulu (Sarawak)",
          "Banjaran Tahan (Pahang)",
        ],
      },
      {
        factor: "Pinggir Laut dan Saliran",
        effect:
          "Kawasan perikanan di pinggir laut atau pinggir sungai lazimnya berpenduduk sederhana padat",
        examples: ["Kawasan pertanian dan perikanan di pesisir pantai"],
      },
    ],
    economic: [
      {
        factor: "Pertanian",
        effect: "Kegiatan pertanian menjadikan kawasan berpenduduk padat",
        examples: ["Dataran Kedah–Perlis", "Dataran Kelantan", "Delta Rajang"],
      },
      {
        factor: "Perlombongan",
        effect:
          "Kegiatan perlombongan petroleum dan gas asli menyebabkan kawasan menjadi tumpuan penduduk",
        examples: ["Kerteh (Terengganu)", "Miri (Sarawak)"],
      },
      {
        factor: "Perikanan",
        effect: "Kawasan perikanan menjadi kawasan tumpuan penduduk berkepadatan sederhana",
        examples: ["Semporna (Sabah)", "Tumpat (Kelantan)", "Kemaman (Terengganu)"],
      },
      {
        factor: "Perindustrian",
        effect:
          "Sektor perindustrian menyediakan peluang pekerjaan yang menggalakkan penghijrahan penduduk",
        examples: ["Bayan Lepas (P.Pinang)", "Shah Alam (Selangor)", "Nilai (N.Sembilan)"],
      },
    ],
    social: [
      {
        factor: "Infrastruktur",
        effect:
          "Kawasan dengan bekalan air, elektrik, telekomunikasi dan pengangkutan menjadi tumpuan penduduk; kawasan pedalaman berpenduduk jarang kerana kekurangan kemudahan",
        examples: [],
      },
      {
        factor: "Pendidikan",
        effect:
          "Kawasan dengan kemudahan pendidikan seperti pusat pengajian tinggi menjadi pilihan penduduk",
        examples: ["UPSI, Tanjung Malim (Perak)", "UTM, Skudai (Johor)", "UKM, Bangi (Selangor)"],
      },
    ],
    governmentPolicy: [
      {
        factor: "Pembukaan Kawasan Baharu (FELDA)",
        effect:
          "Kawasan penempatan dan pertanian baharu menarik perpindahan penduduk serta mengubah kawasan jarang menjadi sederhana padat",
        examples: ["Rancangan tanah FELDA"],
      },
      {
        factor: "Pembangunan Bandar Baharu",
        effect: "Pusat pentadbiran atau perindustrian baharu mengubah taburan penduduk setempat",
        examples: ["Putrajaya — pusat pentadbiran Persekutuan"],
      },
    ],
  },
  keyExamFacts: [
    "Taburan penduduk Malaysia tidak sekata — terbahagi kepada padat, sederhana, dan jarang",
    "Formula kepadatan penduduk = Jumlah Penduduk ÷ Keluasan Kawasan (km²)",
    "Padat = lebih 200 orang/km²; Sederhana = 50-200 orang/km²; Jarang = kurang 50 orang/km²",
    "Jumlah penduduk Malaysia (2016) ialah kira-kira 31.7 juta orang",
    "4 faktor mempengaruhi taburan penduduk: fizikal, ekonomi, sosial, dasar kerajaan/governan",
    "Tanah pamah menjadi tumpuan penduduk; tanah tinggi kurang menjadi tumpuan kerana darjah ketersampaian rendah",
    "Tanah rancangan FELDA dan pembangunan bandar baharu boleh mengubah taburan penduduk",
  ],
  keyTerms: [
    "Taburan penduduk",
    "Kepadatan penduduk",
    "Penduduk padat",
    "Penduduk sederhana",
    "Penduduk jarang",
    "Darjah ketersampaian",
    "Infrastruktur",
    "Governan",
    "Kelestarian",
    "Tanah rancangan",
    "FELDA",
  ],
  chapterSummary:
    "Bab 8 menerangkan taburan penduduk Malaysia yang tidak sekata, terbahagi kepada kawasan berpenduduk padat, sederhana dan jarang berdasarkan formula kepadatan penduduk. Bab ini merangkumi empat faktor yang mempengaruhi taburan tersebut — fizikal (bentuk muka bumi), ekonomi (pertanian, perlombongan, perikanan, perindustrian), sosial (infrastruktur, pendidikan) dan dasar kerajaan/governan (bandar baharu, taman negara, tanah rancangan).",
};

export default geo8Content;
