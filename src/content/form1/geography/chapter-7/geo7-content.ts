// geo7-content.ts
// Source-verified content for Geography Form 1, Bab 7 — Saliran (Drainage)
// Sourced from T1_BT_GEO_-_GEOGRAFI.pdf (pages 74-85)
// Geography has no official DLP/English textbook — BM only.
// Content data only — no presentation markup.

export interface RiverStage {
  stage: number;
  name: string;
  characteristics: string[];
}

export interface FormationProcess {
  name: string;
  steps: string[];
}

export interface RiverFact {
  name: string;
  facts: string[];
}

export interface LakeFact {
  name: string;
  facts: string[];
}

export interface ImportanceCategory {
  use: string;
  examples: string[];
}

export interface Geo7Content {
  hook: { title: string; body: string };
  overview: string;
  riverStages: RiverStage[];
  oxbowLakeFormation: FormationProcess;
  deltaFormation: FormationProcess;
  majorRivers: RiverFact[];
  majorLakes: LakeFact[];
  importance: ImportanceCategory[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const geo7Content: Geo7Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap sungai bermula sebagai aliran deras di pergunungan dan berakhir sebagai aliran tenang yang bertemu laut — dan sepanjang perjalanan itu, ia mengukir lurah berbentuk V, melengkung menjadi likuan, dan akhirnya membentuk delta. Bab ini menunjukkan bagaimana satu sungai berubah bentuk tiga kali sepanjang alirannya."
  },
  overview: "Air mengalir melalui lurah dan kawasan tadahan hujan di tanah tinggi ke kawasan tanah rendah akhirnya ke tasik dan laut. Keadaan ini membentuk pelbagai pandang darat fizikal di setiap peringkat aliran sungai.",
  riverStages: [
    {
      stage: 1,
      name: "Peringkat Hulu Sungai",
      characteristics: ["Lurah sempit berbentuk 'V'", "Bercerun curam", "Aliran air yang deras", "Banyak jeram dan air terjun", "Terbentuk lubang periuk akibat hakisan"]
    },
    {
      stage: 2,
      name: "Peringkat Tengah Sungai",
      characteristics: ["Lurah berbentuk 'U'", "Susuh bukit berpanca dan terhakis", "Berlaku hakisan sungai", "Likuan sungai (aliran sungai 'melompat')"]
    },
    {
      stage: 3,
      name: "Peringkat Hilir Sungai",
      characteristics: ["Lurah semakin melebar dan cetek", "Aliran sungai perlahan dan berliku-liku", "Cerunnya lebih landai", "Terbentuk tasik ladam, tetambak dan delta", "Pemendapan sungai berlaku"]
    }
  ],
  oxbowLakeFormation: {
    name: "Proses Pembentukan Tasik Ladam",
    steps: [
      "Sungai mengalir berliku-liku membentuk likuan; hakisan berlaku di bahagian luar likuan, pemendapan di bahagian dalam",
      "Likuan semakin melengkung sehingga hampir bertemu di pangkalnya",
      "Air sungai memotong terus melalui pangkal likuan semasa banjir, membentuk likuan terpenggal",
      "Pemendapan menutup kedua-dua hujung likuan terpenggal, menghasilkan tasik ladam yang berasingan daripada aliran sungai utama"
    ]
  },
  deltaFormation: {
    name: "Proses Pembentukan Delta",
    steps: [
      "Aliran sungai semakin perlahan apabila menghampiri muara, menyebabkan proses pemendapan sedimen",
      "Mendapan berterusan membentuk alur delta yang meluas di muara sungai",
      "Delta terus berkembang sehingga membentuk dataran rendah yang luas di kawasan muara"
    ]
  },
  majorRivers: [
    { name: "Sungai Pahang", facts: ["Terletak di negeri Pahang", "Sungai terpanjang di Semenanjung Malaysia, kira-kira 457 km"] },
    { name: "Sungai Bernam", facts: ["Mengalir dari Gunung Liang Timur", "Sempadan semula jadi antara Perak dan Selangor"] },
    { name: "Sungai Endau", facts: ["Mengalir dari Banjaran Tahan, Pahang", "Sempadan antara Johor dan Pahang"] },
    { name: "Sungai Rajang", facts: ["Sungai terpanjang di Malaysia, kira-kira 563 km", "Mengalir dari Banjaran Iran ke Laut China Selatan"] },
    { name: "Sungai Baram", facts: ["Berpunca dari Banjaran Iran", "Mengalir ke arah barat"] },
    { name: "Sungai Kinabatangan", facts: ["Mengalir dari kawasan pergunungan barat daya Sabah", "Mengalir ke Laut Sulu"] }
  ],
  majorLakes: [
    { name: "Tasik Kenyir", facts: ["Terletak di hulu Sungai Kenyir", "Tasik buatan manusia terbesar di Asia Tenggara"] },
    { name: "Tasik Chini", facts: ["Tasik semula jadi", "Terletak di daerah Pekan, Pahang"] },
    { name: "Tasik Bera", facts: ["Tasik semula jadi terbesar di Malaysia", "Terletak di daerah Bera, Pahang"] },
    { name: "Loagan Bunut", facts: ["Tasik semula jadi terbesar di Sarawak", "Terletak kira-kira 120 km di tenggara Miri"] }
  ],
  importance: [
    { use: "Penjanaan Kuasa Hidroelektrik", examples: ["Empangan Pelagus (Sarawak)", "Empangan Kenering (Perak)"] },
    { use: "Sumber Pengairan", examples: ["Sungai Muda (Kedah) — rancangan pengairan padi, membolehkan penanaman dua kali setahun"] },
    { use: "Kegunaan Domestik", examples: ["Sungai Pahang", "Sungai Rajang", "Sungai Kinabatangan"] },
    { use: "Sempadan Semula Jadi", examples: ["Sungai Bernam — sempadan Perak/Selangor", "Sungai Golok — sempadan Malaysia/Thailand"] },
    { use: "Sumber Protein", examples: ["Ikan lampam, tilapia, patin, jelawat, kelah dari Sungai Kinabatangan, Sungai Beruas, Sungai Endau"] }
  ],
  keyExamFacts: [
    "Sungai mempunyai 3 peringkat aliran: hulu (lurah V, deras), tengah (lurah U, likuan), hilir (landai, berliku, delta)",
    "Tasik ladam terbentuk apabila likuan sungai terpenggal dan kedua-dua hujungnya tertutup akibat pemendapan",
    "Delta terbentuk di muara sungai apabila aliran perlahan menyebabkan pemendapan sedimen berterusan",
    "Sungai Rajang (563 km) ialah sungai terpanjang di Malaysia; Sungai Pahang (457 km) terpanjang di Semenanjung",
    "Tasik Kenyir ialah tasik buatan manusia terbesar di Asia Tenggara; Tasik Bera ialah tasik semula jadi terbesar di Malaysia",
    "Sungai penting untuk hidroelektrik, pengairan, kegunaan domestik, sempadan, dan sumber protein"
  ],
  keyTerms: [
    "Peringkat hulu sungai", "Peringkat tengah sungai", "Peringkat hilir sungai",
    "Lubang periuk", "Likuan sungai", "Tasik ladam", "Delta", "Mendapan", "Sedimen",
    "Kawasan tadahan hujan", "Tasik semula jadi", "Tasik buatan manusia"
  ],
  chapterSummary: "Bab 7 menerangkan tiga peringkat aliran sungai (hulu, tengah, hilir) dan bentuk muka bumi yang terhasil di setiap peringkat, proses pembentukan tasik ladam dan delta, sungai dan tasik utama di Malaysia (termasuk Sungai Rajang yang terpanjang), serta kepentingan sungai dan tasik untuk hidroelektrik, pengairan, kegunaan domestik, sempadan dan sumber protein."
};

export default geo7Content;
