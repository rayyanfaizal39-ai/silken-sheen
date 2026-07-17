// geo13-content.ts
// Source-verified content for Geography Form 1, Bab 13 — Sisa Domestik (Domestic Waste)
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 144-155)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface WasteCategory {
  category: 'organik' | 'bukan organik';
  definition: string;
  source: string;
  examples: string[];
}

export interface WasteEffect {
  effect: string;
  details: string[];
}

export interface MitigationMeasure {
  step: number;
  name: string;
  details: string[];
}

export interface Geo13Content {
  hook: { title: string; body: string };
  overview: string;
  wasteCategories: WasteCategory[];
  solidWasteExamples: string[];
  liquidWasteExamples: string[];
  effects: WasteEffect[];
  mitigationMeasures: MitigationMeasure[];
  threeR: { name: string; description: string }[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo13Content: Geo13Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap hari, isi rumah anda menghasilkan sisa yang berakhir di suatu tempat — sama ada diuraikan semula jadi, atau bertahan bertahun-tahun di tapak pelupusan. Bab ini menunjukkan perbezaan antara sisa yang boleh diuraikan dan yang tidak, serta kesan sebenar apabila sisa ini tidak diurus dengan baik."
  },
  overview: "Sisa domestik terdiri daripada pepejal dan cecair yang boleh dikategorikan sebagai bahan organik dan bahan bukan organik. Sisa domestik di Malaysia dikenali sebagai sisa yang terhasil daripada kawasan perumahan.",
  wasteCategories: [
    { category: "organik", definition: "Boleh diuraikan dan dilupuskan", source: "Dihasilkan daripada sumber haiwan dan tumbuhan", examples: ["Sisa makanan", "Sisa kebun", "Kertas"] },
    { category: "bukan organik", definition: "Sukar diuraikan dan dilupuskan", source: "Dihasilkan daripada sumber mineral", examples: ["Tin", "Plastik", "Besi buruk", "Kaca"] }
  ],
  solidWasteExamples: ["Sisa makanan", "Plastik", "Kertas", "Logam", "Perabot", "Lampin pakai buang"],
  liquidWasteExamples: ["Minyak masak", "Kumbahan"],
  effects: [
    {
      effect: "Pencemaran",
      details: [
        "Pencemaran air — sumber air terutamanya sungai tercemar apabila sampah dibuang ke kawasan sumber air",
        "Pencemaran udara — disebabkan pembakaran sisa domestik di tapak pelupusan sampah",
        "Pencemaran bau — timbunan sisa domestik yang tidak diurus dengan baik"
      ]
    },
    {
      effect: "Wabak Penyakit",
      details: [
        "Sisa pembuangan sampah secara langsung menjadi tempat penularan wabak penyakit yang disebarkan oleh haiwan seperti tikus, lipas dan lalat",
        "Contoh: taun, demam denggi, malaria, zika, rotavirus"
      ]
    },
    {
      effect: "Peningkatan Kos Penyelenggaraan",
      details: [
        "Peningkatan jumlah sisa domestik meningkatkan kos penyelenggaraan diuruskan pihak berkuasa tempatan (PBT)",
        "Kos melibatkan penyelenggaraan tapak pelupusan, baik pulih kemusnahan, perawatan air tercemar, gaji pekerja pembersihan"
      ]
    },
    {
      effect: "Banjir Kilat",
      details: [
        "Sikap tidak bertanggungjawab membuang sisa domestik ke dalam longkang, parit dan sungai menyebabkan aliran air tersekat",
        "Apabila hujan lebat, jumlah air meningkat mendadak sehingga menyebabkan banjir kilat"
      ]
    }
  ],
  mitigationMeasures: [
    { step: 1, name: "Amalan 3R", details: ["Kurangkan (Reduce), guna semula (Reuse), kitar semula (Recycle)"] },
    { step: 2, name: "Penggunaan Teknologi Terkini", details: ["Loji Waste to Energy (WtE) — mengurangkan sisa dihantar ke tapak pelupusan sehingga 85%, dan mengurangkan pencemaran bau", "Penciptaan pinggan daripada ubi kayu menggantikan pinggan polistirena"] },
    { step: 3, name: "Penguatkuasaan Undang-undang", details: ["PBT mengenakan denda dan hukuman lebih berat untuk kesedaran masyarakat", "Akta Pengurusan Sisa Pepejal dan Pembersihan Awam 2007 (Akta 672) dan Akta 673"] }
  ],
  threeR: [
    { name: "Kurangkan (Reduce)", description: "Mengurangkan apa-apa yang boleh menyebabkan sampah, seperti penggunaan beg plastik dan bekas polistirena" },
    { name: "Guna Semula (Reuse)", description: "Menggunakan semula bekas minuman, surat khabar, majalah, atau mendermakan buku-buku dan pakaian" },
    { name: "Kitar Semula (Recycle)", description: "Menghasilkan barangan baharu daripada barangan terbuang, seperti kraf tangan dan baja kompos" }
  ],
  keyExamFacts: [
    "Sisa domestik dikategorikan sebagai bahan organik (boleh diuraikan, dari haiwan/tumbuhan) dan bukan organik (sukar diuraikan, dari mineral)",
    "Sisa domestik terdiri daripada sisa pepejal (makanan, plastik, kertas, logam, perabot) dan sisa cecair (minyak masak, kumbahan)",
    "4 kesan pembuangan sisa domestik: pencemaran (air/udara/bau), wabak penyakit, peningkatan kos penyelenggaraan, banjir kilat",
    "Amalan 3R: Kurangkan (Reduce), Guna Semula (Reuse), Kitar Semula (Recycle)",
    "Loji Waste to Energy (WtE) mampu mengurangkan sisa ke tapak pelupusan sehingga 85%",
    "Akta Pengurusan Sisa Pepejal dan Pembersihan Awam 2007 (Akta 672) menguruskan sisa domestik secara sistematik"
  ],
  keyTerms: [
    "Sisa domestik", "Bahan organik", "Bahan bukan organik", "Sisa pepejal", "Sisa cecair",
    "Mineral", "Amalan 3R", "Kurangkan", "Guna semula", "Kitar semula",
    "Waste to Energy (WtE)", "Pihak Berkuasa Tempatan (PBT)", "Penularan"
  ],
  chapterSummary: "Bab 13 mengklasifikasikan sisa domestik kepada bahan organik dan bukan organik, serta sisa pepejal dan cecair. Bab ini merangkumi 4 kesan pembuangan sisa domestik yang tidak diurus (pencemaran, wabak penyakit, kos penyelenggaraan, banjir kilat), dan 3 langkah mengurangkan kesannya — amalan 3R, teknologi terkini (WtE), dan penguatkuasaan undang-undang."
};

export default geo13Content;
