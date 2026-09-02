// Source-grounded content for Geography Form 1, Bab 13 — Sisa Domestik.
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface WasteCategory {
  category: "organik" | "bukan organik";
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
  headlineStat: { value: string; label: string; period: string };
  overview: string;
  wasteCategories: WasteCategory[];
  solidWasteExamples: string[];
  liquidWasteExamples: string[];
  effects: WasteEffect[];
  mitigationMeasures: MitigationMeasure[];
  threeR: { name: string; description: string; examples: string[] }[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo13Content: Geo13Content = {
  hook: {
    title: "Sisa rumah, kesan seluruh bandar",
    body: "Sisa domestik bermula daripada aktiviti harian di rumah. Apabila tidak diurus dengan baik, sampah yang kecil boleh mencemarkan air dan udara, menyebarkan penyakit, menyumbat saliran serta meningkatkan kos penyelenggaraan.",
  },
  headlineStat: {
    value: "33,000",
    label: "tan metrik sisa domestik sehari di Malaysia",
    period: "Perangkaan setakat Januari 2016",
  },
  overview:
    "Sisa domestik ialah sisa pepejal dan sisa cecair yang terhasil dari kawasan perumahan. Sisa ini boleh dikelaskan mengikut kandungan kepada bahan organik dan bahan bukan organik.",
  wasteCategories: [
    {
      category: "organik",
      definition: "Boleh diuraikan dan dilupuskan secara semula jadi.",
      source: "Dihasilkan daripada sumber haiwan dan tumbuhan.",
      examples: ["Sisa makanan", "Sisa kebun", "Kertas"],
    },
    {
      category: "bukan organik",
      definition: "Sukar diuraikan dan dilupuskan secara semula jadi.",
      source: "Dihasilkan daripada sumber mineral seperti logam dan petroleum.",
      examples: ["Besi buruk", "Plastik", "Tin", "Kaca"],
    },
  ],
  solidWasteExamples: [
    "Sisa makanan",
    "Kertas",
    "Plastik",
    "Logam",
    "Perabot",
    "Lampin pakai buang",
  ],
  liquidWasteExamples: ["Kumbahan", "Minyak masak"],
  effects: [
    {
      effect: "Pencemaran Alam Sekitar",
      details: [
        "Pencemaran air berlaku apabila sampah dibuang terus ke dalam sungai atau sumber air.",
        "Pencemaran udara berlaku akibat pembakaran terbuka sisa domestik di tapak pelupusan.",
        "Pencemaran bau terhasil daripada timbunan sisa yang tidak diurus dengan baik.",
      ],
    },
    {
      effect: "Wabak Penyakit",
      details: [
        "Timbunan sampah menjadi tempat pembiakan tikus, lipas dan lalat yang membawa penyakit.",
        "Penyakit yang boleh menular termasuk taun, demam denggi, malaria, rotavirus dan virus zika.",
      ],
    },
    {
      effect: "Banjir Kilat",
      details: [
        "Sisa yang dibuang ke dalam longkang, parit dan sungai menyumbat serta menyekat aliran air.",
        "Semasa hujan lebat, saliran tidak mampu menampung peningkatan air lalu mencetuskan banjir kilat.",
      ],
    },
    {
      effect: "Peningkatan Kos Penyelenggaraan",
      details: [
        "Pertambahan sisa meningkatkan beban kewangan Pihak Berkuasa Tempatan (PBT).",
        "Kos meliputi pengurusan tapak pelupusan, baik pulih infrastruktur, rawatan air tercemar dan gaji pekerja pembersihan.",
      ],
    },
  ],
  mitigationMeasures: [
    {
      step: 1,
      name: "Amalan 3R",
      details: [
        "Reduce mengurangkan penggunaan bahan yang menghasilkan sampah.",
        "Reuse menggunakan semula atau mendermakan barangan yang masih elok.",
        "Recycle memproses barangan terbuang menjadi barangan baharu.",
      ],
    },
    {
      step: 2,
      name: "Penggunaan Teknologi Terkini",
      details: [
        "Loji Waste to Energy (WtE) membakar sisa dan menukarkannya kepada tenaga elektrik.",
        "WtE mampu mengurangkan sisa ke tapak pelupusan sehingga 85% serta mengurangkan pencemaran bau.",
        "Pinggan biodegradasi daripada ubi kayu boleh menggantikan polistirena yang sukar diurai.",
      ],
    },
    {
      step: 3,
      name: "Penguatkuasaan Undang-undang",
      details: [
        "Pengurusan sisa pepejal dilaksanakan secara lebih sistematik melalui peruntukan undang-undang.",
        "Akta Pengurusan Sisa Pepejal dan Pembersihan Awam 2007 (Akta 672).",
        "Akta Perbadanan Pengurusan Sisa Pepejal dan Pembersihan Awam 2007 (Akta 673).",
      ],
    },
    {
      step: 4,
      name: "Kempen Kesedaran",
      details: [
        "Agensi kerajaan, badan bukan kerajaan (NGO) dan PBT menyebarkan kesedaran melalui media sosial.",
        "Contoh: Kempen Kesedaran Alam Sekitar, Kempen 3R dan Kempen Cintai Sungai Kita oleh Jabatan Alam Sekitar (JAS).",
      ],
    },
    {
      step: 5,
      name: "Pendidikan",
      details: [
        "Nilai murni penjagaan alam sekitar dipupuk sejak peringkat awal persekolahan.",
        "Geografi dan Sains membina keprihatinan murid, manakala aktiviti kitar semula membentuk amalan sebenar di sekolah.",
      ],
    },
  ],
  threeR: [
    {
      name: "Reduce · Kurangkan",
      description: "Kurangkan penggunaan bahan yang akhirnya menjadi sampah.",
      examples: ["Beg plastik", "Bekas polistirena"],
    },
    {
      name: "Reuse · Guna Semula",
      description: "Gunakan semula atau salurkan barangan yang masih boleh digunakan.",
      examples: ["Bekas minuman", "Akhbar dan majalah", "Buku dan pakaian"],
    },
    {
      name: "Recycle · Kitar Semula",
      description: "Proses bahan terbuang untuk menghasilkan barangan baharu.",
      examples: ["Kraf tangan", "Baja kompos daripada sisa makanan"],
    },
  ],
  keyExamFacts: [
    "Sisa domestik ialah sisa pepejal dan cecair yang terhasil dari kawasan perumahan.",
    "Bahan organik boleh diuraikan secara semula jadi dan berasal daripada haiwan atau tumbuhan.",
    "Bahan bukan organik sukar diuraikan dan berasal daripada mineral seperti logam dan petroleum.",
    "Empat kesan utama ialah pencemaran, wabak penyakit, banjir kilat dan peningkatan kos penyelenggaraan.",
    "Amalan 3R ialah Reduce, Reuse dan Recycle.",
    "Loji Waste to Energy boleh mengurangkan sisa ke tapak pelupusan sehingga 85%.",
    "Lima langkah pengurangan ialah 3R, teknologi, undang-undang, kempen kesedaran dan pendidikan.",
  ],
  keyTerms: [
    "Sisa domestik",
    "Bahan organik",
    "Bahan bukan organik",
    "Sisa pepejal",
    "Sisa cecair",
    "Amalan 3R",
    "Waste to Energy (WtE)",
    "Biodegradasi",
    "Pihak Berkuasa Tempatan (PBT)",
    "Jabatan Alam Sekitar (JAS)",
  ],
  chapterSummary:
    "Bab 13 menerangkan sisa domestik dari kawasan perumahan melalui dua cara pengelasan: bahan organik atau bukan organik, serta sisa pepejal atau cecair. Pembuangan yang tidak terkawal menyebabkan pencemaran, wabak penyakit, banjir kilat dan kos penyelenggaraan meningkat. Kesannya boleh dikurangkan melalui amalan 3R, teknologi terkini, penguatkuasaan undang-undang, kempen kesedaran dan pendidikan.",
};

export default geo13Content;
