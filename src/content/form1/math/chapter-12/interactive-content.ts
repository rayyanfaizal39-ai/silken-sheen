// Form 1 Mathematics, Chapter 12 — Data Handling / Pengendalian Data
// Interactive bilingual content, ported from
// design-reference/math1-chapter12-data-handling-notes-v5.html. Content
// spot-verified: bar chart (8,9,7,6,4), pie chart (Red 9, Yellow 12, White
// 10, Blue 5 / 36 total), stem-and-leaf grouping (stems 3/5/6/7/8 for the
// 20-mark dataset), interpretation mean (2.2) — all independently recomputed
// and confirmed correct. Content only — no presentation markup (rendered by
// MathF1Chapter12NotesBlock).
//
// Structural note: Chapter 12 has only ONE official KSSM subtopic (12.1),
// but the mockup splits it into six visual sections — Classification (must
// render FIRST), then Pie/Bar/Line/Dot/Stem-Leaf/Interpretation, each with
// its own mini "Idea" + worked example — deliberately, so the chapter
// doesn't collapse back into one undifferentiated block. The Pie Chart
// section uniquely has no subtopic header/idea paragraphs of its own — in
// the mockup it follows directly from the classification guided card,
// introduced by its formula card alone.
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";
import type { ChartDatum, PieDatum } from "@/components/notes/blocks/DataCharts";

export type MathC12Widget =
  | { kind: "categoryBuckets"; categoricalExample: string; numericalExample: string }
  | { kind: "statQCompare"; fixedLabel: string; variedLabel: string }
  | { kind: "stemLeafMini"; stem: string; leaf: string; resultLabel: string }
  | { kind: "miniLineGraph"; points: ChartDatum[] }
  | { kind: "representationCompare"; positionOnlyLabel: string; exactValuesLabel: string };

export interface MathC12PracticeItem {
  question: string;
  answer: string;
  widget?: MathC12Widget;
}

export interface MathC12ChartSection {
  key: "bar" | "line" | "dot" | "stemleaf" | "interpret";
  title: string;
  ideaParagraphs: string[];
  workedQuestion: string;
  chart?:
    | { kind: "bar"; data: ChartDatum[] }
    | { kind: "line"; values: number[]; unit: string }
    | { kind: "dot"; values: number[] }
    | { kind: "stemleaf"; values: number[]; keyCaption: string };
  /** Interpretation only — a step-by-step reveal instead of a static chart. */
  steps?: WorkedStep[];
}

export interface MathF1C12Content {
  /** The chapter's single official KSSM subtopic (12.1) header. */
  subtopicNum: string;
  subtopicTitle: string;
  classification: {
    ideaParagraphs: string[];
    guided: { question: string; widget: MathC12Widget; answer: string };
  };
  pie: {
    formula: { eyebrow: string; formula: string };
    workedQuestion: string;
    data: PieDatum[];
  };
  chartSections: MathC12ChartSection[];
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, MathC12PracticeItem>;
  realLife: string[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; widget: MathC12Widget; answer: string };
}

const PIE_DATA: PieDatum[] = [
  { label: "Red", value: 9, color: "#f87171" },
  { label: "Yellow", value: 12, color: "#fbbf5a" },
  { label: "White", value: 10, color: "#e5e5e5" },
  { label: "Blue", value: 5, color: "#4d7cfe" },
];
const BAR_DATA_EN: ChartDatum[] = [
  { label: "Reading", value: 8 },
  { label: "TV", value: 9 },
  { label: "Internet", value: 7 },
  { label: "Exercise", value: 6 },
  { label: "Music", value: 4 },
];
const BAR_DATA_BM: ChartDatum[] = [
  { label: "Membaca", value: 8 },
  { label: "TV", value: 9 },
  { label: "Internet", value: 7 },
  { label: "Bersenam", value: 6 },
  { label: "Muzik", value: 4 },
];
const LINE_VALUES = [37.8, 37.9, 38.2, 38.4, 38.2, 37.9, 37.9, 37.6, 37.6, 37.5];
const DOT_VALUES = [10, 11, 11, 12, 12, 12, 13, 13, 13, 13, 14, 15];
const STEMLEAF_VALUES = [
  60, 56, 69, 32, 63, 58, 71, 86, 52, 64, 50, 67, 82, 63, 75, 50, 69, 78, 77, 59,
];
const HARD_LINE_POINTS = [
  { label: "'10", value: 1.9 },
  { label: "'11", value: 2.1 },
  { label: "'12", value: 2.9 },
  { label: "'13", value: 2.6 },
  { label: "'14", value: 2.1 },
  { label: "'15", value: 1.6 },
];

const en: MathF1C12Content = {
  subtopicNum: "12.1",
  subtopicTitle:
    "Data Collection, Organization and Representation Process, and Interpretation of Data Representation",
  classification: {
    ideaParagraphs: [
      'A statistical question expects VARIED answers when data is collected (e.g. "How tall are the students in class?"), unlike a question with one fixed answer. Data collected splits into categorical (described, not measured — e.g. blood group) and numerical (measured — e.g. height), and numerical data is further either discrete (whole-unit counts) or continuous (measured on a scale).',
      "Once collected and classified, data is organised into a frequency table, then represented visually — bar chart, pie chart, line graph, dot plot, or stem-and-leaf plot — whichever best suits the data and the question being asked.",
    ],
    guided: {
      question:
        "Classify: (a) the body temperature of each student (b) the causes of road accidents. Which is categorical and which is numerical?",
      widget: {
        kind: "categoryBuckets",
        categoricalExample: "e.g. blood group",
        numericalExample: "e.g. height",
      },
      answer:
        "(a) Numerical — temperature is measured. (b) Categorical — causes are described, not measured.",
    },
  },
  pie: {
    formula: {
      eyebrow: "Pie Chart — Angle of Each Sector",
      formula: "Angle = (Frequency ÷ Total) × 360°",
    },
    workedQuestion:
      "A car dealer sold Red:9, Yellow:12, White:10, Blue:5 cars (36 total). Construct a pie chart.",
    data: PIE_DATA,
  },
  chartSections: [
    {
      key: "bar",
      title: "Bar Chart",
      ideaParagraphs: [
        'A bar chart uses bars of equal width to compare frequencies across categories — best when you want to compare one category directly against another (e.g. "which activity is most popular?"). Bars can run vertically or horizontally, but must be evenly spaced with a consistent scale.',
      ],
      workedQuestion:
        "Leisure activities of Form 1 Bakti students: Reading 8, TV 9, Internet 7, Exercise 6, Music 4. Construct a bar chart.",
      chart: { kind: "bar", data: BAR_DATA_EN },
    },
    {
      key: "line",
      title: "Line Graph",
      ideaParagraphs: [
        "A line graph plots points and connects them with straight lines — best for showing how a value CHANGES OVER TIME (e.g. temperature hour by hour). The direction of the line — rising, falling, or flat — tells the story of the trend at a glance.",
      ],
      workedQuestion:
        "A patient's temperature (°C) over 10 hours: 37.8, 37.9, 38.2, 38.4, 38.2, 37.9, 37.9, 37.6, 37.6, 37.5. Construct a line graph.",
      chart: { kind: "line", values: LINE_VALUES, unit: "°" },
    },
    {
      key: "dot",
      title: "Dot Plot",
      ideaParagraphs: [
        "A dot plot places one dot above each data value on a number line — stacking dots when a value repeats. It's the fastest way to spot where data CLUSTERS, and to notice any unusual values (outliers) sitting apart from the rest.",
      ],
      workedQuestion:
        "The lifespans (nearest hour) of 12 dry cells tested: 10, 11, 11, 12, 12, 12, 13, 13, 13, 13, 14, 15. Construct a dot plot.",
      chart: { kind: "dot", values: DOT_VALUES },
    },
    {
      key: "stemleaf",
      title: "Stem-and-Leaf Plot",
      ideaParagraphs: [
        'A stem-and-leaf plot splits each number into a "stem" (the leading digit(s)) and a "leaf" (the last digit). Unlike a bar chart or dot plot, it keeps every EXACT original value — so you can still do arithmetic on the data afterward, not just see its shape.',
      ],
      workedQuestion:
        "Mathematics marks for 20 students: 60,56,69,32,63,58,71,86,52,64,50,67,82,63,75,50,69,78,77,59. Construct a stem-and-leaf plot.",
      chart: { kind: "stemleaf", values: STEMLEAF_VALUES, keyCaption: "Key: 3 | 2 means 32 marks" },
    },
    {
      key: "interpret",
      title: "Interpreting Data Representations",
      ideaParagraphs: [
        "Once a chart is built, the real work is READING it — pulling out specific values, spotting trends, making inferences, and predicting what comes next.",
      ],
      workedQuestion:
        "The line graph shows waste (thousand tonnes) produced in a city, 2010-2015: 1.9, 2.1, 2.9, 2.6, 2.1, 1.6. (a) Mass in 2010? (b) Compare 2011 and 2014. (c) Find the mean. (d) State one inference. (e) Predict 2016.",
      steps: [
        {
          calc: "(a) 2010 mass = 1.9 thousand tonnes",
          why: "Read the value directly off the graph at year 2010.",
        },
        {
          calc: "(b) 2011 and 2014 both = 2.1 — the same",
          why: "Compare the heights of both points on the graph.",
        },
        {
          calc: "(c) Mean = (1.9+2.1+2.9+2.6+2.1+1.6)/6 = 13.2/6 = 2.2",
          why: "Add every value and divide by the number of years.",
        },
        {
          calc: "(d) Waste decreases every year after 2012",
          why: "An inference is a reasonable conclusion drawn directly from the pattern shown.",
        },
        {
          calc: "(e) 2016 prediction ≈ 1.1 thousand tonnes",
          why: "Extend the downward trend from 2014-2015 by roughly the same amount.",
        },
      ],
    },
  ],
  mistake: {
    wrong:
      "Using a pie chart for data with MANY categories, or a stem-and-leaf plot for categorical (non-numeric) data.",
    right:
      "Pie charts suit few categories comparing to a whole; stem-and-leaf plots need numerical data with a clear tens/units split.",
  },
  practice: {
    easy: {
      question: 'Is "How tall is Rosmee?" a statistical question?',
      widget: {
        kind: "statQCompare",
        fixedLabel: "one fixed answer",
        variedLabel: "varied answers",
      },
      answer:
        "No — it has one fixed answer (Rosmee's exact height), no variability across different data points.",
    },
    medium: {
      question:
        'The stem-and-leaf key reads "3 | 2 means 32 marks". What mark does the leaf "8" on stem "6" represent?',
      widget: { kind: "stemLeafMini", stem: "6", leaf: "8", resultLabel: "68" },
      answer: "68",
    },
    hard: {
      question:
        "A line graph shows waste (thousand tonnes): 2010:1.9, 2011:2.1, 2012:2.9, 2013:2.6, 2014:2.1, 2015:1.6. Find the mean over the 6 years.",
      widget: { kind: "miniLineGraph", points: HARD_LINE_POINTS },
      answer: "Total = 1.9+2.1+2.9+2.6+2.1+1.6 = 13.2. Mean = 13.2÷6 = 2.2 thousand tonnes.",
    },
  },
  realLife: ["📰 News infographics", "🗳️ Population census reports"],
  summary: {
    center: "Data Handling",
    branches: [
      { title: "Collect & Classify", points: ["Statistical questions; categorical vs numerical"] },
      { title: "Represent", points: ["Bar, pie, line, dot, stem-and-leaf"] },
      { title: "Interpret", points: ["Mean, inference, prediction"] },
    ],
  },
  formulaSheet: [
    { formula: "Pie angle = (f ÷ total) × 360°", label: "f = frequency" },
    { formula: "Mean = total ÷ count", label: "for interpretation" },
    { formula: "Categorical", label: "described, not measured" },
    { formula: "Numerical: discrete or continuous", label: "measured quantities" },
  ],
  quickRevision: [
    "I can generate statistical questions and classify data as categorical or numerical.",
    "I can construct frequency tables and choose an appropriate data representation.",
    "I can interpret data representations to make inferences and predictions.",
  ],
  examTips: [
    'Ask "does this have one fixed answer, or will it vary across people/items?" to check if a question is statistical.',
    "When justifying a chart choice, name the data type AND the purpose (comparison, trend over time, proportion of a whole).",
  ],
  challenge: {
    question:
      "A dot plot shows the lifespans (nearest hour) of 24 dry cells tested in a quality control lab. Explain what additional information a stem-and-leaf plot of the same data could reveal that the dot plot cannot.",
    widget: {
      kind: "representationCompare",
      positionOnlyLabel: "position only",
      exactValuesLabel: "exact values kept",
    },
    answer:
      "A stem-and-leaf plot retains the EXACT original data values (via stem and leaf digits), so you can do precise arithmetic on it — a dot plot only shows relative position and clustering, not exact recoverable values.",
  },
};

const bm: MathF1C12Content = {
  subtopicNum: "12.1",
  subtopicTitle:
    "Proses Pengumpulan, Penyusunan dan Perwakilan Data, dan Pentafsiran Perwakilan Data",
  classification: {
    ideaParagraphs: [
      'Soalan statistik mengharapkan jawapan BERBEZA-BEZA apabila data dikumpul (cth. "Berapa tinggi pelajar dalam kelas?"), berbeza dengan soalan berjawapan tunggal tetap. Data dikumpul terbahagi kepada kategori (diterangkan, tidak diukur — cth. kumpulan darah) dan numerik (diukur — cth. tinggi), dan data numerik selanjutnya sama ada diskret (kiraan unit bulat) atau selanjar (diukur pada skala).',
      "Selepas dikumpul dan dikelaskan, data disusun ke dalam jadual kekerapan, kemudian diwakilkan secara visual — carta palang, carta pai, graf garis, plot titik, atau plot batang-dan-daun — mana-mana yang paling sesuai dengan data dan soalan ditanya.",
    ],
    guided: {
      question:
        "Kelaskan: (a) suhu badan setiap pelajar (b) punca kemalangan jalan raya. Mana kategori dan mana numerik?",
      widget: {
        kind: "categoryBuckets",
        categoricalExample: "cth. kumpulan darah",
        numericalExample: "cth. tinggi",
      },
      answer: "(a) Numerik — suhu diukur. (b) Kategori — punca diterangkan, bukan diukur.",
    },
  },
  pie: {
    formula: {
      eyebrow: "Carta Pai — Sudut Setiap Sektor",
      formula: "Sudut = (Kekerapan ÷ Jumlah) × 360°",
    },
    workedQuestion:
      "Peniaga kereta jual Merah:9, Kuning:12, Putih:10, Biru:5 kereta (36 jumlah). Bina carta pai.",
    data: PIE_DATA,
  },
  chartSections: [
    {
      key: "bar",
      title: "Carta Palang",
      ideaParagraphs: [
        'Carta palang menggunakan palang lebar sama untuk membanding kekerapan merentasi kategori — terbaik apabila anda mahu banding satu kategori terus dengan satu lagi (cth. "aktiviti manakah paling popular?"). Palang boleh berjalan menegak atau mendatar, tetapi mesti berjarak sama dengan skala konsisten.',
      ],
      workedQuestion:
        "Aktiviti riadah pelajar Tingkatan 1 Bakti: Membaca 8, TV 9, Internet 7, Bersenam 6, Muzik 4. Bina carta palang.",
      chart: { kind: "bar", data: BAR_DATA_BM },
    },
    {
      key: "line",
      title: "Graf Garis",
      ideaParagraphs: [
        "Graf garis memplot titik dan menyambungkannya dengan garis lurus — terbaik untuk menunjukkan bagaimana nilai BERUBAH DARI SEMASA KE SEMASA (cth. suhu jam demi jam). Arah garis — naik, turun, atau mendatar — menceritakan trend serta-merta.",
      ],
      workedQuestion:
        "Suhu pesakit (°C) sepanjang 10 jam: 37.8, 37.9, 38.2, 38.4, 38.2, 37.9, 37.9, 37.6, 37.6, 37.5. Bina graf garis.",
      chart: { kind: "line", values: LINE_VALUES, unit: "°" },
    },
    {
      key: "dot",
      title: "Plot Titik",
      ideaParagraphs: [
        "Plot titik meletakkan satu titik di atas setiap nilai data pada garis nombor — menyusun titik apabila nilai berulang. Ia cara terpantas untuk kesan di mana data BERKELOMPOK, dan perasan sebarang nilai luar biasa (nilai terpencil) berasingan daripada yang lain.",
      ],
      workedQuestion:
        "Jangka hayat (jam terdekat) 12 sel kering diuji: 10, 11, 11, 12, 12, 12, 13, 13, 13, 13, 14, 15. Bina plot titik.",
      chart: { kind: "dot", values: DOT_VALUES },
    },
    {
      key: "stemleaf",
      title: "Plot Batang-dan-Daun",
      ideaParagraphs: [
        'Plot batang-dan-daun memecahkan setiap nombor kepada "batang" (digit hadapan) dan "daun" (digit terakhir). Berbeza dengan carta palang atau plot titik, ia mengekalkan setiap nilai asal TEPAT — jadi anda masih boleh buat pengiraan pada data selepas itu, bukan sekadar lihat bentuknya.',
      ],
      workedQuestion:
        "Markah Matematik 20 pelajar: 60,56,69,32,63,58,71,86,52,64,50,67,82,63,75,50,69,78,77,59. Bina plot batang-dan-daun.",
      chart: {
        kind: "stemleaf",
        values: STEMLEAF_VALUES,
        keyCaption: "Kunci: 3 | 2 bermaksud 32 markah",
      },
    },
    {
      key: "interpret",
      title: "Mentafsir Perwakilan Data",
      ideaParagraphs: [
        "Selepas carta dibina, kerja sebenar ialah MEMBACANYA — mengeluarkan nilai khusus, mengesan trend, membuat inferens, dan meramalkan apa yang berlaku seterusnya.",
      ],
      workedQuestion:
        "Graf garis tunjuk sisa (ribu tan) dihasilkan di sebuah bandar, 2010-2015: 1.9, 2.1, 2.9, 2.6, 2.1, 1.6. (a) Jisim 2010? (b) Banding 2011 dan 2014. (c) Cari min. (d) Nyatakan satu inferens. (e) Ramalkan 2016.",
      steps: [
        {
          calc: "(a) Jisim 2010 = 1.9 ribu tan",
          why: "Baca nilai terus daripada graf pada tahun 2010.",
        },
        {
          calc: "(b) 2011 dan 2014 kedua-duanya = 2.1 — sama",
          why: "Banding ketinggian kedua-dua titik pada graf.",
        },
        {
          calc: "(c) Min = (1.9+2.1+2.9+2.6+2.1+1.6)/6 = 13.2/6 = 2.2",
          why: "Tambah setiap nilai dan bahagi dengan bilangan tahun.",
        },
        {
          calc: "(d) Sisa berkurangan setiap tahun selepas 2012",
          why: "Inferens ialah kesimpulan munasabah ditarik terus daripada corak ditunjukkan.",
        },
        {
          calc: "(e) Ramalan 2016 ≈ 1.1 ribu tan",
          why: "Sambungkan trend menurun daripada 2014-2015 dengan jumlah lebih kurang sama.",
        },
      ],
    },
  ],
  mistake: {
    wrong:
      "Guna carta pai untuk data dengan BANYAK kategori, atau plot batang-dan-daun untuk data kategori (bukan numerik).",
    right:
      "Carta pai sesuai untuk kategori sedikit dibanding keseluruhan; plot batang-dan-daun perlukan data numerik dengan pembahagian puluh/unit jelas.",
  },
  practice: {
    easy: {
      question: 'Adakah "Berapa tinggi Rosmee?" soalan statistik?',
      widget: {
        kind: "statQCompare",
        fixedLabel: "satu jawapan tetap",
        variedLabel: "jawapan berbeza-beza",
      },
      answer:
        "Tidak — ia ada satu jawapan tetap (tinggi tepat Rosmee), tiada variasi merentasi titik data berbeza.",
    },
    medium: {
      question:
        'Kunci batang-dan-daun "3 | 2 bermaksud 32 markah". Markah apakah daun "8" pada batang "6"?',
      widget: { kind: "stemLeafMini", stem: "6", leaf: "8", resultLabel: "68" },
      answer: "68",
    },
    hard: {
      question:
        "Graf garis tunjuk sisa (ribu tan): 2010:1.9, 2011:2.1, 2012:2.9, 2013:2.6, 2014:2.1, 2015:1.6. Cari min sepanjang 6 tahun.",
      widget: { kind: "miniLineGraph", points: HARD_LINE_POINTS },
      answer: "Jumlah = 1.9+2.1+2.9+2.6+2.1+1.6 = 13.2. Min = 13.2÷6 = 2.2 ribu tan.",
    },
  },
  realLife: ["📰 Infografik berita", "🗳️ Laporan banci populasi"],
  summary: {
    center: "Pengendalian Data",
    branches: [
      { title: "Kumpul & Kelaskan", points: ["Soalan statistik; kategori lwn numerik"] },
      { title: "Wakilkan", points: ["Palang, pai, garis, titik, batang-dan-daun"] },
      { title: "Tafsir", points: ["Min, inferens, ramalan"] },
    ],
  },
  formulaSheet: [
    { formula: "Sudut pai = (f ÷ jumlah) × 360°", label: "f = kekerapan" },
    { formula: "Min = jumlah ÷ bilangan", label: "untuk tafsiran" },
    { formula: "Kategori", label: "diterangkan, tidak diukur" },
    { formula: "Numerik: diskret atau selanjar", label: "kuantiti diukur" },
  ],
  quickRevision: [
    "Saya boleh menjana soalan statistik dan mengelaskan data sebagai kategori atau numerik.",
    "Saya boleh membina jadual kekerapan dan pilih perwakilan data yang sesuai.",
    "Saya boleh mentafsir perwakilan data untuk membuat inferens dan ramalan.",
  ],
  examTips: [
    'Tanya "adakah ini ada satu jawapan tetap, atau ia akan berbeza merentasi orang/item?" untuk semak jika soalan statistik.',
    "Apabila mewajarkan pilihan carta, namakan jenis data DAN tujuan (perbandingan, trend dari semasa ke semasa, perkadaran keseluruhan).",
  ],
  challenge: {
    question:
      "Plot titik tunjuk jangka hayat (jam terdekat) 24 sel kering diuji di makmal kawalan kualiti. Jelaskan maklumat tambahan apa plot batang-dan-daun data sama boleh dedahkan yang plot titik tidak boleh.",
    widget: {
      kind: "representationCompare",
      positionOnlyLabel: "kedudukan sahaja",
      exactValuesLabel: "nilai tepat dikekalkan",
    },
    answer:
      "Plot batang-dan-daun mengekalkan nilai data asal TEPAT (melalui digit batang dan daun), jadi anda boleh buat pengiraan tepat — plot titik hanya tunjuk kedudukan relatif dan pengelompokan, bukan nilai tepat boleh dipulihkan.",
  },
};

export const mathF1C12InteractiveContent: { en: MathF1C12Content; bm: MathF1C12Content } = {
  en,
  bm,
};
