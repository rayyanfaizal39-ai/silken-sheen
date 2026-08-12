// Form 2 Mathematics, Chapter 12 — Measures of Central Tendencies / Sukatan
// Kecenderungan Memusat. 12.1 is the ONLY official subtopic, built as two
// flowing sections: computing each measure (mode/median/mean), then
// choosing the right one for a given situation.
// Interactive bilingual content. EN sourced from T2_BT_MAT_DLP_-_MATHEMATICS.pdf,
// BM sourced from T2_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math2-chapter12-central-tendencies-notes-v1.html.
// Content only — no presentation markup (rendered by MathF2Chapter12NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export interface MathF2C12Block {
  formula?: { eyebrow: string; formula: string };
  worked?: { question: string; steps: WorkedStep[] };
}

/** Labels for the DecisionTree flowchart in 12.2. */
export interface MathF2C12Visual {
  categoryLabel: string;
  useModeLabel: string;
  extremeLabel: string;
  useMedianLabel: string;
  useMeanLabel: string;
  yesLabel: string;
  noLabel: string;
  caption: string;
}

export interface MathF2C12SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF2C12Visual;
  blocks: MathF2C12Block[];
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C12Content {
  subtopics: MathF2C12SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C12Content = {
  subtopics: [
    {
      num: "12.1",
      title: "Measures of Central Tendencies",
      ideaParagraphs: [
        "A measure of central tendency is one number that represents a whole set of data. There are three: mode (most frequent), median (the middle value), and mean (the total shared equally).",
      ],
      blocks: [
        {
          formula: { eyebrow: "Mean", formula: "Mean = Total of all values ÷ Number of values" },
          worked: {
            question: "Five students' pocket money: RM5, RM8, RM3, RM7, RM5. Find the mean.",
            steps: [
              { calc: "Total = 5+8+3+7+5 = 28", why: "Add up every value in the data set." },
              {
                calc: "Mean = 28 ÷ 5 = 5.6",
                why: 'Divide the total by how many values there are — this "shares" the total equally among all 5 students.',
              },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Median",
            formula: "Arrange in order, find the middle value (or average the middle two)",
          },
          worked: {
            question: "Goals scored by a team in 10 games: 1,5,1,1,4,2,5,1,4,4. Find the median.",
            steps: [
              {
                calc: "Sorted: 1,1,1,1,2,4,4,4,5,5",
                why: 'Arrange the data in order first — the "middle" only means something once it\'s sorted.',
              },
              {
                calc: "10 values (even) → average the middle two: 2 and 4",
                why: "With an even count, there are two middle values, not one.",
              },
              { calc: "Median = (2+4)÷2 = 3", why: "Average those two middle values." },
            ],
          },
        },
      ],
      guided: {
        question:
          "A survey of favourite ice cream flavours: Chocolate, Vanilla, Chocolate, Strawberry, Chocolate, Vanilla. What's the mode?",
        answer: "Chocolate — it appears 3 times, more than any other flavour.",
      },
      mistake: {
        wrong: "Finding the median without arranging the data in order first.",
        right:
          'ALWAYS sort the data first — "the middle value" only means something once it\'s in order.',
      },
      practice: {
        easy: {
          question: "Find the mean of 4, 8, 6, 10, 2.",
          answer: "(4+8+6+10+2)÷5 = 6",
        },
        medium: {
          question: "Find the median of 28,27,21,23,24,21,25,24.",
          answer: "Sorted: 21,21,23,24,24,25,27,28. Middle two: 24,24. Median=24.",
        },
        hard: {
          question:
            "A table shows time (minutes) 10,20,30,40 with frequency 1,6,3,1. Find the median using position n/2 and n/2+1.",
          answer:
            'n=11 (odd). Median = data at position (11+1)/2=6th. Position 6 falls in the "20" group (positions 2-7). Median=20.',
        },
      },
      realLife: ["💰 Average salaries reported", "📊 Test score summaries"],
    },
    {
      num: "12.2",
      title: "The Most Appropriate Measure",
      ideaParagraphs: [
        "A single super-rich person can massively skew a MEAN salary. That's why the right average depends on the data: does it involve categories (not numbers)? Does it have an extreme value dragging things off-centre?",
      ],
      visual: {
        categoryLabel: "Category data?",
        useModeLabel: "Use MODE",
        extremeLabel: "Extreme value?",
        useMedianLabel: "Use MEDIAN",
        useMeanLabel: "Use MEAN",
        yesLabel: "yes",
        noLabel: "no",
        caption: "Category data → mode. Numbers with an extreme value → median. Otherwise → mean.",
      },
      blocks: [
        {
          worked: {
            question:
              "Which measure suits: (a) weights of marbles in jars, no extreme value (b) a pictograph of favourite ice cream flavour?",
            steps: [
              {
                calc: "(a) Mean — no extreme value, numerical data",
                why: "With no unusual outlier and real numbers, mean uses all the information fairly.",
              },
              {
                calc: "(b) Mode — category data",
                why: 'Ice cream flavours aren\'t numbers — you can\'t average "chocolate" with "vanilla". Mode just finds the most popular one.',
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "A dot plot shows driving times from Ipoh to Melaka, with one unusually long trip due to a breakdown. Which measure is best?",
        answer:
          "Median — the breakdown creates an extreme value that would drag the mean off-centre, but the median ignores it.",
      },
      mistake: {
        wrong:
          "Always defaulting to the mean, even when the data has category labels (like flavours) instead of numbers.",
        right:
          "Category data (like favourite items) can't be averaged mathematically — mode is the only measure that makes sense there.",
      },
      practice: {
        easy: {
          question: "A pie chart shows students' favourite fruits. Which measure fits?",
          answer: "Mode — category data.",
        },
        medium: {
          question:
            "A line graph shows monthly palm oil production, no unusual spikes. Which measure fits?",
          answer: "Mean — no extreme value, numerical data.",
        },
        hard: {
          question:
            'A small company\'s salaries are all around RM3,000, except the owner who earns RM50,000. Explain why the mean would mislead someone about "typical" pay here.',
          answer:
            "The owner's RM50,000 is an extreme value — it would pull the mean far above what any typical employee actually earns. The median stays close to the RM3,000 that most people earn.",
        },
      },
      realLife: ["🏠 House price reporting (median)", "👕 Popular clothing sizes (mode)"],
    },
  ],
  summary: {
    center: "Measures of Central Tendencies",
    branches: [
      { title: "Mode", points: ["Most frequent — best for categories"] },
      { title: "Median", points: ["Middle value — ignores extremes"] },
      { title: "Mean", points: ["Total ÷ count — uses everything"] },
    ],
  },
  formulaSheet: [
    { formula: "Mean = Total ÷ Count", label: "" },
    { formula: "Median = middle (sorted first!)", label: "" },
    { formula: "Mode = most frequent", label: "" },
  ],
  quickRevision: [
    "I can find the mode, median, and mean of a data set.",
    "I can choose and justify the most appropriate measure for a situation.",
  ],
  examTips: [
    "See category labels (flavours, colours, brands)? Go straight to mode — mean and median don't apply.",
    "One unusually high or low value in the data is your cue to use median instead of mean.",
  ],
  challenge: {
    question:
      'A shop\'s daily sales for a week (RM): 200, 220, 210, 190, 205, 195, 2000 (a huge one-day sale event). Calculate both the mean and median. Which one better represents a "typical" day, and why?',
    answer:
      "Mean = 3220÷7 ≈ 460. Median (sorted: 190,195,200,205,210,220,2000) = 205. The median (205) better represents a typical day — the mean is dragged way up by the one extreme sale day.",
  },
};

const bm: MathF2C12Content = {
  subtopics: [
    {
      num: "12.1",
      title: "Sukatan Kecenderungan Memusat",
      ideaParagraphs: [
        "Sukatan kecenderungan memusat ialah satu nombor mewakili keseluruhan set data. Ada tiga: mod (paling kerap), median (nilai tengah), dan min (jumlah dikongsi sama rata).",
      ],
      blocks: [
        {
          formula: { eyebrow: "Min", formula: "Min = Jumlah semua nilai ÷ Bilangan nilai" },
          worked: {
            question: "Wang saku lima pelajar: RM5, RM8, RM3, RM7, RM5. Cari min.",
            steps: [
              { calc: "Jumlah = 5+8+3+7+5 = 28", why: "Tambah setiap nilai dalam set data." },
              {
                calc: "Min = 28 ÷ 5 = 5.6",
                why: 'Bahagi jumlah dengan berapa banyak nilai — ini "kongsi" jumlah sama rata antara kesemua 5 pelajar.',
              },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Median",
            formula: "Susun mengikut turutan, cari nilai tengah (atau purata dua tengah)",
          },
          worked: {
            question:
              "Gol dijaringkan pasukan dalam 10 perlawanan: 1,5,1,1,4,2,5,1,4,4. Cari median.",
            steps: [
              {
                calc: "Tersusun: 1,1,1,1,2,4,4,4,5,5",
                why: 'Susun data mengikut turutan dahulu — "tengah" hanya bermakna sebaik ia tersusun.',
              },
              {
                calc: "10 nilai (genap) → purata dua tengah: 2 dan 4",
                why: "Dengan bilangan genap, ada dua nilai tengah, bukan satu.",
              },
              { calc: "Median = (2+4)÷2 = 3", why: "Purata dua nilai tengah itu." },
            ],
          },
        },
      ],
      guided: {
        question:
          "Tinjauan perisa aiskrim kegemaran: Coklat, Vanila, Coklat, Strawberi, Coklat, Vanila. Apakah mod?",
        answer: "Coklat — muncul 3 kali, lebih daripada perisa lain.",
      },
      mistake: {
        wrong: "Cari median tanpa susun data mengikut turutan dahulu.",
        right: 'SENTIASA susun data dahulu — "nilai tengah" hanya bermakna sebaik ia tersusun.',
      },
      practice: {
        easy: {
          question: "Cari min bagi 4, 8, 6, 10, 2.",
          answer: "(4+8+6+10+2)÷5 = 6",
        },
        medium: {
          question: "Cari median bagi 28,27,21,23,24,21,25,24.",
          answer: "Tersusun: 21,21,23,24,24,25,27,28. Dua tengah: 24,24. Median=24.",
        },
        hard: {
          question:
            "Jadual tunjuk masa (minit) 10,20,30,40 dengan kekerapan 1,6,3,1. Cari median guna kedudukan n/2 dan n/2+1.",
          answer:
            'n=11 (ganjil). Median = data pada kedudukan (11+1)/2=ke-6. Kedudukan 6 jatuh dalam kumpulan "20" (kedudukan 2-7). Median=20.',
        },
      },
      realLife: ["💰 Purata gaji dilaporkan", "📊 Ringkasan markah ujian"],
    },
    {
      num: "12.2",
      title: "Sukatan Paling Sesuai",
      ideaParagraphs: [
        "Seorang individu sangat kaya boleh memesongkan MIN gaji secara besar-besaran. Itu sebab purata yang betul bergantung pada data: adakah ia melibatkan kategori (bukan nombor)? Adakah ia ada nilai ekstrem menarik dari tengah?",
      ],
      visual: {
        categoryLabel: "Data kategori?",
        useModeLabel: "Guna MOD",
        extremeLabel: "Nilai ekstrem?",
        useMedianLabel: "Guna MEDIAN",
        useMeanLabel: "Guna MIN",
        yesLabel: "ya",
        noLabel: "tidak",
        caption: "Data kategori → mod. Nombor dengan nilai ekstrem → median. Selainnya → min.",
      },
      blocks: [
        {
          worked: {
            question:
              "Sukatan mana sesuai: (a) berat guli dalam balang, tiada nilai ekstrem (b) piktograf perisa aiskrim kegemaran?",
            steps: [
              {
                calc: "(a) Min — tiada nilai ekstrem, data berangka",
                why: "Tanpa nilai luar biasa dan nombor sebenar, min guna semua maklumat secara adil.",
              },
              {
                calc: "(b) Mod — data kategori",
                why: 'Perisa aiskrim bukan nombor — anda tidak boleh purata "coklat" dengan "vanila". Mod hanya cari yang paling popular.',
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Plot titik tunjuk masa memandu Ipoh ke Melaka, dengan satu perjalanan luar biasa panjang kerana kerosakan. Sukatan mana terbaik?",
        answer:
          "Median — kerosakan cipta nilai ekstrem yang akan menarik min dari tengah, tetapi median mengabaikannya.",
      },
      mistake: {
        wrong:
          "Sentiasa lalai kepada min, walaupun data ada label kategori (seperti perisa) bukan nombor.",
        right:
          "Data kategori (seperti item kegemaran) tidak boleh dipuratakan secara matematik — mod satu-satunya sukatan bermakna di situ.",
      },
      practice: {
        easy: {
          question: "Carta pai tunjuk buah kegemaran pelajar. Sukatan mana sesuai?",
          answer: "Mod — data kategori.",
        },
        medium: {
          question:
            "Graf garis tunjuk pengeluaran minyak sawit bulanan, tiada lonjakan luar biasa. Sukatan mana sesuai?",
          answer: "Min — tiada nilai ekstrem, data berangka.",
        },
        hard: {
          question:
            'Gaji syarikat kecil semua sekitar RM3,000, kecuali pemilik yang perolehi RM50,000. Jelaskan kenapa min akan mengelirukan seseorang tentang gaji "biasa" di sini.',
          answer:
            "RM50,000 pemilik ialah nilai ekstrem — ia akan tarik min jauh melebihi apa yang pekerja biasa sebenarnya perolehi. Median kekal dekat dengan RM3,000 yang kebanyakan orang perolehi.",
        },
      },
      realLife: ["🏠 Laporan harga rumah (median)", "👕 Saiz pakaian popular (mod)"],
    },
  ],
  summary: {
    center: "Sukatan Kecenderungan Memusat",
    branches: [
      { title: "Mod", points: ["Paling kerap — terbaik untuk kategori"] },
      { title: "Median", points: ["Nilai tengah — abaikan ekstrem"] },
      { title: "Min", points: ["Jumlah ÷ bilangan — guna semua"] },
    ],
  },
  formulaSheet: [
    { formula: "Min = Jumlah ÷ Bilangan", label: "" },
    { formula: "Median = tengah (susun dahulu!)", label: "" },
    { formula: "Mod = paling kerap", label: "" },
  ],
  quickRevision: [
    "Saya boleh cari mod, median, dan min set data.",
    "Saya boleh pilih dan wajarkan sukatan paling sesuai untuk situasi.",
  ],
  examTips: [
    "Nampak label kategori (perisa, warna, jenama)? Terus ke mod — min dan median tidak terpakai.",
    "Satu nilai luar biasa tinggi atau rendah dalam data ialah isyarat anda guna median bukan min.",
  ],
  challenge: {
    question:
      'Jualan harian kedai seminggu (RM): 200, 220, 210, 190, 205, 195, 2000 (acara jualan besar sehari). Kira min dan median. Mana lebih baik wakili hari "biasa", dan kenapa?',
    answer:
      "Min = 3220÷7 ≈ 460. Median (tersusun: 190,195,200,205,210,220,2000) = 205. Median (205) lebih baik wakili hari biasa — min ditarik jauh ke atas oleh satu hari jualan ekstrem.",
  },
};

export const mathF2C12InteractiveContent: { en: MathF2C12Content; bm: MathF2C12Content } = {
  en,
  bm,
};
