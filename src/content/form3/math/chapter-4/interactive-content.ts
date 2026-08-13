// Form 3 Mathematics, Chapter 4 — Scale Drawings / Lukisan Berskala. 1
// official subtopic (4.1, Scale Drawings), built as 2 flowing sections
// ("Scale Drawings" and "Solving Problems with Scale Drawings"). Interactive
// bilingual content. EN sourced from T3_BT_MAT_DLP_-_MATHEMATICS.pdf, BM
// sourced from T3_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math3-chapter4-scale-drawings-notes-v1.html.
// Content only — no presentation markup (rendered by MathF3Chapter4NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF3C4Visual = {
  kind: "scaleCompare";
  smallerLabel: string;
  actualLabel: string;
  biggerLabel: string;
  caption: string;
};

export interface MathF3C4Block {
  formula: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked?: { question: string; steps: WorkedStep[] };
}

export interface MathF3C4SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF3C4Visual;
  blocks: MathF3C4Block[];
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF3C4Content {
  subtopics: MathF3C4SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF3C4Content = {
  subtopics: [
    {
      num: "4.1",
      title: "Scale Drawings",
      ideaParagraphs: [
        "A scale drawing keeps every length proportional to the real object — angles stay exactly the same, only the SIZE changes. The scale is the ratio comparing the drawing's measurement to the actual measurement.",
      ],
      visual: {
        kind: "scaleCompare",
        smallerLabel: "1:2 (smaller)",
        actualLabel: "1:1 (actual)",
        biggerLabel: "1:½ (bigger)",
        caption:
          "Same square shape, three different sizes — every side scaled by the same factor, angles unchanged",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Scale",
            formula: "Scale = Drawing measurement ÷ Actual measurement",
            legend: [
              {
                label: "1:n",
                text: "one unit on the drawing represents n units in real life",
              },
            ],
          },
          worked: {
            question:
              "Khairul draws a square to a scale of 1:⅓. If the actual side length is 6 cm, find the side length of the scale drawing.",
            steps: [
              {
                calc: "Scale 1:⅓ means the drawing is 3× the actual size",
                why: "A scale of 1:n where n<1 means one drawing unit represents LESS than one actual unit — so the drawing is bigger.",
              },
              {
                calc: "Drawing side = 6 × 3 = 18 cm",
                why: "Multiply the actual length by 3 to get the drawing length.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "A poster is drawn 24 cm long at a scale of 1:3. What is the actual length?",
        answer: "1:3 means the actual is 3 times bigger: 24×3 = 72 cm.",
      },
      mistake: {
        wrong: "Assuming n>1 always means the drawing is bigger.",
        right:
          "In 1:n, a bigger n means the drawing is SMALLER than the object (it's shrunk by more). n<1 means the drawing is bigger.",
      },
      practice: {
        easy: {
          question: "A drawing side is 12 cm, the actual side is 4 cm. State the scale as 1:n.",
          answer: "1:⅓ (drawing is 3× bigger than actual)",
        },
        medium: {
          question:
            "Siew Lin draws a right triangle at scale 1:⅓. If the drawing's hypotenuse is 18 cm, find the actual hypotenuse.",
          answer: "1:⅓ means the drawing is 3× the actual, so actual = 18÷3 = 6 cm.",
        },
        hard: {
          question:
            "A triangle drawn on a 1cm×1cm grid is redrawn on a 1.5cm×1.5cm grid. State the scale used, in the form 1:n.",
          answer: "Scale = 1.5:1 = 1:(1÷1.5) = 1:⅔.",
        },
      },
      realLife: ["🗺️ Maps and navigation apps", "🏗️ Architectural floor plans"],
    },
    {
      num: "4.1",
      title: "Solving Problems with Scale Drawings",
      ideaParagraphs: [
        "Real map and drawing problems usually chain TWO steps together: first convert drawing-to-actual (or actual-to-drawing) using the scale, then use that real-world distance for something else — like calculating travel time.",
      ],
      blocks: [
        {
          formula: {
            eyebrow: "Two-Step Problems",
            formula: "Convert to actual FIRST, then apply the next formula",
          },
          worked: {
            question:
              "The distance on a map between two towns is 4 cm, at a scale of 1 cm : 50 km. (a) Find the actual distance. (b) If travelling at 80 km/h, find the time taken.",
            steps: [
              {
                calc: "(a) Actual = 4 × 50 = 200 km",
                why: "Each cm on the map represents 50 km — multiply the map distance by that scale factor.",
              },
              {
                calc: "(b) Time = 200 ÷ 80 = 2.5 hours",
                why: "Time = distance ÷ speed, using the ACTUAL distance just calculated.",
              },
              { calc: "= 2 hours 30 minutes", why: "0.5 hours = 30 minutes." },
            ],
          },
        },
      ],
      guided: {
        question:
          "A map has scale 1 cm : 150 km. What length on the map represents an actual distance of 810 km?",
        answer: "810 ÷ 150 = 5.4 cm.",
      },
      mistake: {
        wrong: "Using the drawing distance directly in a speed/time calculation.",
        right:
          "Always convert to the ACTUAL distance FIRST using the scale — speed and time only make sense with real-world distances.",
      },
      practice: {
        easy: {
          question:
            "A map scale is 1 cm : 20 km. A road measures 3 cm on the map. Find the actual length.",
          answer: "60 km",
        },
        medium: {
          question:
            "The map distance between Bintulu and Miri is 4 cm, at scale 1 cm : 50 km. Find the distance on a redrawn map at scale 1 : 2 000 000 (in cm; note 50 km = 5,000,000 cm).",
          answer:
            "Actual = 4×50 = 200 km = 20,000,000 cm. New drawing distance = 20,000,000÷2,000,000 = 10 cm.",
        },
        hard: {
          question:
            "A floor plan is drawn at scale 1:50. If a room measures 6 cm × 4 cm on the plan, find the ACTUAL floor area of the room in m².",
          answer: "Actual: 6×50=300cm=3m, 4×50=200cm=2m. Area=3×2=6 m².",
        },
      },
      realLife: ["🚗 Trip planning", "🏠 Interior design layouts"],
    },
  ],
  summary: {
    center: "Scale Drawings",
    branches: [
      { title: "Scale", points: ["Drawing ÷ Actual, written 1:n"] },
      { title: "n>1", points: ["Drawing smaller than actual"] },
      { title: "n<1", points: ["Drawing bigger than actual"] },
    ],
  },
  formulaSheet: [
    { formula: "Scale = Drawing ÷ Actual", label: "" },
    { formula: "1:n", label: "1 unit drawn = n units actual" },
  ],
  quickRevision: [
    "I can interpret and calculate scales in the form 1:n.",
    "I can solve real-world problems involving scale drawings.",
  ],
  examTips: [
    "Convert to actual distance FIRST before using it in any other formula (speed, area, time).",
  ],
  challenge: {
    question:
      "A rectangular garden is drawn on a plan at scale 1:200. The drawing measures 8 cm by 5 cm. Find (a) the actual dimensions in metres, (b) the actual area, (c) how many 1m×1m paving tiles are needed to cover it.",
    answer: "(a) 8×200=1600cm=16m, 5×200=1000cm=10m. (b) 16×10=160 m². (c) 160 tiles.",
  },
};

const bm: MathF3C4Content = {
  subtopics: [
    {
      num: "4.1",
      title: "Lukisan Berskala",
      ideaParagraphs: [
        "Lukisan berskala mengekalkan setiap panjang berkadar dengan objek sebenar — sudut kekal tepat sama, hanya SAIZ berubah. Skala ialah nisbah membanding ukuran lukisan dengan ukuran sebenar.",
      ],
      visual: {
        kind: "scaleCompare",
        smallerLabel: "1:2 (lebih kecil)",
        actualLabel: "1:1 (sebenar)",
        biggerLabel: "1:½ (lebih besar)",
        caption:
          "Bentuk segi empat sama sama, tiga saiz berbeza — setiap sisi diskalakan faktor sama, sudut tidak berubah",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Skala",
            formula: "Skala = Ukuran lukisan ÷ Ukuran sebenar",
            legend: [
              {
                label: "1:n",
                text: "satu unit pada lukisan mewakili n unit dalam kehidupan sebenar",
              },
            ],
          },
          worked: {
            question:
              "Khairul lukis segi empat sama pada skala 1:⅓. Jika panjang sisi sebenar 6 cm, cari panjang sisi lukisan berskala.",
            steps: [
              {
                calc: "Skala 1:⅓ bermaksud lukisan 3× saiz sebenar",
                why: "Skala 1:n dengan n<1 bermaksud satu unit lukisan mewakili KURANG daripada satu unit sebenar — jadi lukisan lebih besar.",
              },
              {
                calc: "Sisi lukisan = 6 × 3 = 18 cm",
                why: "Darab panjang sebenar dengan 3 untuk dapat panjang lukisan.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Poster dilukis panjang 24 cm pada skala 1:3. Apakah panjang sebenar?",
        answer: "1:3 bermaksud sebenar 3 kali lebih besar: 24×3 = 72 cm.",
      },
      mistake: {
        wrong: "Menganggap n>1 sentiasa bermaksud lukisan lebih besar.",
        right:
          "Dalam 1:n, n lebih besar bermaksud lukisan LEBIH KECIL daripada objek (dikecilkan lebih). n<1 bermaksud lukisan lebih besar.",
      },
      practice: {
        easy: {
          question: "Sisi lukisan 12 cm, sisi sebenar 4 cm. Nyatakan skala sebagai 1:n.",
          answer: "1:⅓ (lukisan 3× lebih besar daripada sebenar)",
        },
        medium: {
          question:
            "Siew Lin lukis segi tiga tegak pada skala 1:⅓. Jika hipotenus lukisan 18 cm, cari hipotenus sebenar.",
          answer: "1:⅓ bermaksud lukisan 3× sebenar, jadi sebenar = 18÷3 = 6 cm.",
        },
        hard: {
          question:
            "Segi tiga dilukis pada grid 1cm×1cm dilukis semula pada grid 1.5cm×1.5cm. Nyatakan skala digunakan, dalam bentuk 1:n.",
          answer: "Skala = 1.5:1 = 1:(1÷1.5) = 1:⅔.",
        },
      },
      realLife: ["🗺️ Peta dan aplikasi navigasi", "🏗️ Pelan lantai senibina"],
    },
    {
      num: "4.1",
      title: "Menyelesaikan Masalah Lukisan Berskala",
      ideaParagraphs: [
        "Masalah peta dan lukisan sebenar biasanya rangkaikan DUA langkah bersama: pertama tukar lukisan-ke-sebenar (atau sebenar-ke-lukisan) guna skala, kemudian guna jarak dunia sebenar itu untuk sesuatu lain — seperti mengira masa perjalanan.",
      ],
      blocks: [
        {
          formula: {
            eyebrow: "Masalah Dua Langkah",
            formula: "Tukar kepada sebenar DAHULU, kemudian guna formula seterusnya",
          },
          worked: {
            question:
              "Jarak pada peta antara dua bandar 4 cm, pada skala 1 cm : 50 km. (a) Cari jarak sebenar. (b) Jika memandu 80 km/j, cari masa diambil.",
            steps: [
              {
                calc: "(a) Sebenar = 4 × 50 = 200 km",
                why: "Setiap cm pada peta mewakili 50 km — darab jarak peta dengan faktor skala itu.",
              },
              {
                calc: "(b) Masa = 200 ÷ 80 = 2.5 jam",
                why: "Masa = jarak ÷ laju, guna jarak SEBENAR baru dikira.",
              },
              { calc: "= 2 jam 30 minit", why: "0.5 jam = 30 minit." },
            ],
          },
        },
      ],
      guided: {
        question:
          "Peta ada skala 1 cm : 150 km. Panjang apa pada peta mewakili jarak sebenar 810 km?",
        answer: "810 ÷ 150 = 5.4 cm.",
      },
      mistake: {
        wrong: "Guna jarak lukisan terus dalam pengiraan laju/masa.",
        right:
          "Sentiasa tukar kepada jarak SEBENAR DAHULU guna skala — laju dan masa hanya bermakna dengan jarak dunia sebenar.",
      },
      practice: {
        easy: {
          question:
            "Skala peta 1 cm : 20 km. Jalan berukuran 3 cm pada peta. Cari panjang sebenar.",
          answer: "60 km",
        },
        medium: {
          question:
            "Jarak peta Bintulu-Miri 4 cm, skala 1 cm : 50 km. Cari jarak pada peta dilukis semula pada skala 1 : 2 000 000 (dalam cm; ambil perhatian 50 km = 5,000,000 cm).",
          answer:
            "Sebenar = 4×50 = 200 km = 20,000,000 cm. Jarak lukisan baharu = 20,000,000÷2,000,000 = 10 cm.",
        },
        hard: {
          question:
            "Pelan lantai dilukis pada skala 1:50. Jika bilik berukuran 6 cm × 4 cm pada pelan, cari LUAS lantai sebenar bilik dalam m².",
          answer: "Sebenar: 6×50=300cm=3m, 4×50=200cm=2m. Luas=3×2=6 m².",
        },
      },
      realLife: ["🚗 Perancangan perjalanan", "🏠 Susun atur reka bentuk dalaman"],
    },
  ],
  summary: {
    center: "Lukisan Berskala",
    branches: [
      { title: "Skala", points: ["Lukisan ÷ Sebenar, ditulis 1:n"] },
      { title: "n>1", points: ["Lukisan lebih kecil daripada sebenar"] },
      { title: "n<1", points: ["Lukisan lebih besar daripada sebenar"] },
    ],
  },
  formulaSheet: [
    { formula: "Skala = Lukisan ÷ Sebenar", label: "" },
    { formula: "1:n", label: "1 unit lukisan = n unit sebenar" },
  ],
  quickRevision: [
    "Saya boleh mentafsir dan mengira skala dalam bentuk 1:n.",
    "Saya boleh selesaikan masalah dunia sebenar melibatkan lukisan berskala.",
  ],
  examTips: [
    "Tukar kepada jarak sebenar DAHULU sebelum guna dalam sebarang formula lain (laju, luas, masa).",
  ],
  challenge: {
    question:
      "Taman segi empat tepat dilukis pada pelan skala 1:200. Lukisan berukuran 8 cm dengan 5 cm. Cari (a) dimensi sebenar dalam meter, (b) luas sebenar, (c) berapa jubin turapan 1m×1m diperlukan untuk melitupinya.",
    answer: "(a) 8×200=1600cm=16m, 5×200=1000cm=10m. (b) 16×10=160 m². (c) 160 jubin.",
  },
};

export const mathF3C4InteractiveContent: { en: MathF3C4Content; bm: MathF3C4Content } = { en, bm };
