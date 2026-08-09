// Form 2 Mathematics, Chapter 9 — Speed and Acceleration / Laju dan Pecutan.
// 9.1 internally covers speed as a rate, uniform vs non-uniform speed, and
// average speed as three progressively-building ideas under one subtopic.
// Interactive bilingual content. EN sourced from T2_BT_MAT_DLP_-_MATHEMATICS.pdf,
// BM sourced from T2_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math2-chapter9-speed-acceleration-notes-v1.html.
// Content only — no presentation markup (rendered by MathF2Chapter9NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF2C9Visual =
  | {
      kind: "uniformCompare";
      goodPoints: number[];
      badPoints: number[];
      goodLabel: string;
      badLabel: string;
      caption?: string;
    }
  | {
      kind: "speedTimeRamp";
      acceleratingLabel: string;
      deceleratingLabel: string;
      caption?: string;
    };

export interface MathF2C9Block {
  formula: { eyebrow: string; formula: string };
  worked?: { question: string; steps: WorkedStep[] };
}

export interface MathF2C9SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF2C9Visual;
  blocks: MathF2C9Block[];
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C9Content {
  subtopics: MathF2C9SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C9Content = {
  subtopics: [
    {
      num: "9.1",
      title: "Speed",
      ideaParagraphs: [
        "Speed is simply distance divided by the time it took. If a runner covers equal distance in every equal time chunk, that's uniform speed. If the distance covered changes chunk to chunk, that's non-uniform.",
      ],
      visual: {
        kind: "uniformCompare",
        goodPoints: [0, 2, 4, 6, 8],
        badPoints: [0, 2, 3, 5, 8],
        goodLabel: "✓ uniform — straight line",
        badLabel: "✗ non-uniform — bumpy",
        caption:
          "Equal distance every equal time chunk draws a straight line — any deviation is non-uniform",
      },
      blocks: [
        {
          formula: { eyebrow: "Speed", formula: "Speed = Distance ÷ Time" },
          worked: {
            question:
              "A trailer drives 170 km in the first 2 hours, then 190 km in the next 4 hours. Is it moving at a uniform speed?",
            steps: [
              {
                calc: "First 2 hours: 170÷2 = 85 km/h",
                why: "Calculate the speed for the first leg of the journey.",
              },
              {
                calc: "Next 4 hours: 190÷4 = 47.5 km/h",
                why: "Calculate the speed for the second leg.",
              },
              {
                calc: "85 ≠ 47.5, so speed is NON-uniform",
                why: "The two segment speeds are different — the rule (equal distance in equal time) breaks.",
              },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Average Speed",
            formula: "Average speed = Total Distance ÷ Total Time",
          },
        },
      ],
      guided: {
        question:
          "Amir cycles from home to town, 10 km, then rests, then cycles another 25 km. The whole trip takes 3 hours 15 minutes. Find his average speed.",
        answer:
          "Total distance = 35 km. Total time = 3.25 h. Average speed = 35÷3.25 ≈ 10.77 km/h.",
      },
      mistake: {
        wrong:
          "Averaging the individual speeds directly instead of using total distance ÷ total time.",
        right:
          "Average speed ALWAYS uses total distance over total time — it's rarely the same as just averaging two speeds.",
      },
      practice: {
        easy: { question: "Aida walks 100m in 5 minutes. Find her speed.", answer: "20 m/min" },
        medium: {
          question:
            "A bus leaves at 0825 and arrives at 1345, covering 354 km. Find the average speed.",
          answer: "Time = 5h 20min = 5.33h. Speed ≈ 66.4 km/h.",
        },
        hard: {
          question:
            "A golf ball travels P to Q (40m in 2s), Q to R (70m in 3.5s), R to S (60m in 3s). Is the ball's speed uniform? Explain.",
          answer: "All three segments give 20 m/s (40÷2, 70÷3.5, 60÷3) — yes, uniform speed.",
        },
      },
      realLife: ["🚄 Train travel planning", "🏃 Sports timing"],
    },
    {
      num: "9.2",
      title: "Acceleration",
      ideaParagraphs: [
        "A sprinter speeds UP after the starting gun — that's acceleration: how fast speed itself increases. Slowing down after the finish line is deceleration — speed decreasing.",
      ],
      visual: {
        kind: "speedTimeRamp",
        acceleratingLabel: "accelerating",
        deceleratingLabel: "decelerating",
        caption:
          "Rising line = speed increasing (acceleration). Falling line = speed decreasing (deceleration).",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Acceleration",
            formula: "Acceleration = (Final Speed − Initial Speed) ÷ Time",
          },
          worked: {
            question:
              "A motorcycle starts from rest and reaches 20 m/s in 5 seconds. Find its acceleration.",
            steps: [
              {
                calc: "Acceleration = (20−0) ÷ 5",
                why: "Change in speed (final minus initial) divided by the time it took.",
              },
              { calc: "= 4 m/s²", why: "20 divided by 5." },
            ],
          },
        },
      ],
      guided: {
        question:
          "The same motorcycle then brakes from 20 m/s to a full stop in 4 seconds. Find the deceleration.",
        answer:
          "(0−20)/4 = −5 m/s². Deceleration is 5 m/s² (the negative sign just shows it's slowing down).",
      },
      mistake: {
        wrong: "Forgetting to convert units (km/h and seconds don't mix) before dividing.",
        right:
          "Match your speed unit and time unit FIRST — convert km/h to m/s (or the reverse) before calculating.",
      },
      practice: {
        easy: {
          question: "A car speeds up from 10 m/s to 30 m/s in 4 seconds. Find its acceleration.",
          answer: "5 m/s²",
        },
        medium: {
          question:
            "A racing car accelerates from rest to 120 km/h in 6 seconds. Find the acceleration in m/s² (convert first).",
          answer: "120 km/h = 33.33 m/s. Acceleration = 33.33÷6 ≈ 5.56 m/s².",
        },
        hard: {
          question:
            "A train decelerates uniformly at 2 m/s² from 40 m/s. How long does it take to stop?",
          answer: "2 = (0−40)/(−t) → t = 40÷2 = 20 seconds.",
        },
      },
      realLife: ["🏎️ Car performance testing", "🚀 Rocket launches"],
    },
  ],
  summary: {
    center: "Speed and Acceleration",
    branches: [
      { title: "Speed", points: ["Distance ÷ Time"] },
      { title: "Average Speed", points: ["Total distance ÷ total time"] },
      { title: "Acceleration", points: ["Change in speed ÷ time"] },
    ],
  },
  formulaSheet: [
    { formula: "Speed = D ÷ T", label: "" },
    { formula: "Average speed = Total D ÷ Total T", label: "" },
    { formula: "Acceleration = Δspeed ÷ T", label: "" },
  ],
  quickRevision: [
    "I can calculate speed and identify uniform vs non-uniform speed.",
    "I can calculate average speed.",
    "I can calculate acceleration and deceleration, with unit conversion.",
  ],
  examTips: [
    "A negative acceleration is just deceleration — you can write the answer as a positive deceleration value.",
    "Uniform speed check? Calculate speed for EVERY segment, not just the first — they must all match.",
  ],
  challenge: {
    question:
      "A cyclist accelerates uniformly from 5 m/s to 15 m/s over 8 seconds, then travels at that constant speed for 20 seconds. Find (a) the acceleration, (b) the total distance covered in those 28 seconds.",
    answer:
      "(a) (15−5)/8 = 1.25 m/s². (b) Accelerating phase: average speed (5+15)/2=10 m/s × 8s = 80m. Constant phase: 15×20=300m. Total = 380 m.",
  },
};

const bm: MathF2C9Content = {
  subtopics: [
    {
      num: "9.1",
      title: "Laju",
      ideaParagraphs: [
        "Laju hanyalah jarak dibahagi masa yang diambil. Jika pelari merentasi jarak sama dalam setiap tempoh masa sama, itu laju seragam. Jika jarak direntasi berubah setiap tempoh, itu tidak seragam.",
      ],
      visual: {
        kind: "uniformCompare",
        goodPoints: [0, 2, 4, 6, 8],
        badPoints: [0, 2, 3, 5, 8],
        goodLabel: "✓ seragam — garis lurus",
        badLabel: "✗ tidak seragam — tidak licin",
        caption:
          "Jarak sama setiap tempoh sama melukis garis lurus — sebarang penyimpangan tidak seragam",
      },
      blocks: [
        {
          formula: { eyebrow: "Laju", formula: "Laju = Jarak ÷ Masa" },
          worked: {
            question:
              "Treler memandu 170 km dalam 2 jam pertama, kemudian 190 km dalam 4 jam seterusnya. Adakah ia bergerak laju seragam?",
            steps: [
              {
                calc: "2 jam pertama: 170÷2 = 85 km/j",
                why: "Kira laju bagi bahagian pertama perjalanan.",
              },
              {
                calc: "4 jam seterusnya: 190÷4 = 47.5 km/j",
                why: "Kira laju bagi bahagian kedua.",
              },
              {
                calc: "85 ≠ 47.5, jadi laju TIDAK seragam",
                why: "Dua laju bahagian berbeza — peraturan (jarak sama dalam masa sama) pecah.",
              },
            ],
          },
        },
        {
          formula: { eyebrow: "Laju Purata", formula: "Laju purata = Jumlah Jarak ÷ Jumlah Masa" },
        },
      ],
      guided: {
        question:
          "Amir berbasikal dari rumah ke bandar, 10 km, kemudian rehat, kemudian berbasikal lagi 25 km. Keseluruhan perjalanan ambil 3 jam 15 minit. Cari laju puratanya.",
        answer: "Jumlah jarak = 35 km. Jumlah masa = 3.25 j. Laju purata = 35÷3.25 ≈ 10.77 km/j.",
      },
      mistake: {
        wrong: "Purata laju individu terus bukan guna jumlah jarak ÷ jumlah masa.",
        right:
          "Laju purata SENTIASA guna jumlah jarak atas jumlah masa — jarang sama dengan purata terus dua laju.",
      },
      practice: {
        easy: { question: "Aida berjalan 100m dalam 5 minit. Cari lajunya.", answer: "20 m/min" },
        medium: {
          question: "Bas bertolak 0825 dan tiba 1345, merentasi 354 km. Cari laju purata.",
          answer: "Masa = 5j 20min = 5.33j. Laju ≈ 66.4 km/j.",
        },
        hard: {
          question:
            "Bola golf bergerak P ke Q (40m dalam 2s), Q ke R (70m dalam 3.5s), R ke S (60m dalam 3s). Adakah laju bola seragam? Jelaskan.",
          answer: "Kesemua tiga bahagian beri 20 m/s (40÷2, 70÷3.5, 60÷3) — ya, laju seragam.",
        },
      },
      realLife: ["🚄 Perancangan perjalanan kereta api", "🏃 Pemasaan sukan"],
    },
    {
      num: "9.2",
      title: "Pecutan",
      ideaParagraphs: [
        "Pelari PANTAS selepas tembakan mula — itu pecutan: seberapa pantas laju itu sendiri meningkat. Perlahan selepas garisan penamat ialah nyahpecutan — laju menurun.",
      ],
      visual: {
        kind: "speedTimeRamp",
        acceleratingLabel: "memecut",
        deceleratingLabel: "nyahpecut",
        caption: "Garis naik = laju meningkat (pecutan). Garis turun = laju menurun (nyahpecutan).",
      },
      blocks: [
        {
          formula: { eyebrow: "Pecutan", formula: "Pecutan = (Laju Akhir − Laju Awal) ÷ Masa" },
          worked: {
            question:
              "Motosikal bermula dari rehat dan capai 20 m/s dalam 5 saat. Cari pecutannya.",
            steps: [
              {
                calc: "Pecutan = (20−0) ÷ 5",
                why: "Perubahan laju (akhir tolak awal) dibahagi masa yang diambil.",
              },
              { calc: "= 4 m/s²", why: "20 dibahagi 5." },
            ],
          },
        },
      ],
      guided: {
        question:
          "Motosikal sama kemudian brek dari 20 m/s ke henti penuh dalam 4 saat. Cari nyahpecutan.",
        answer:
          "(0−20)/4 = −5 m/s². Nyahpecutan ialah 5 m/s² (tanda negatif hanya tunjuk ia perlahan).",
      },
      mistake: {
        wrong: "Terlupa tukar unit (km/j dan saat tidak bercampur) sebelum membahagi.",
        right:
          "Padankan unit laju dan unit masa DAHULU — tukar km/j kepada m/s (atau sebaliknya) sebelum mengira.",
      },
      practice: {
        easy: {
          question: "Kereta memecut dari 10 m/s ke 30 m/s dalam 4 saat. Cari pecutannya.",
          answer: "5 m/s²",
        },
        medium: {
          question:
            "Kereta lumba memecut dari rehat ke 120 km/j dalam 6 saat. Cari pecutan dalam m/s² (tukar dahulu).",
          answer: "120 km/j = 33.33 m/s. Pecutan = 33.33÷6 ≈ 5.56 m/s².",
        },
        hard: {
          question:
            "Kereta api nyahpecut seragam pada 2 m/s² dari 40 m/s. Berapa lama untuk berhenti?",
          answer: "2 = (0−40)/(−t) → t = 40÷2 = 20 saat.",
        },
      },
      realLife: ["🏎️ Ujian prestasi kereta", "🚀 Pelancaran roket"],
    },
  ],
  summary: {
    center: "Laju dan Pecutan",
    branches: [
      { title: "Laju", points: ["Jarak ÷ Masa"] },
      { title: "Laju Purata", points: ["Jumlah jarak ÷ jumlah masa"] },
      { title: "Pecutan", points: ["Perubahan laju ÷ masa"] },
    ],
  },
  formulaSheet: [
    { formula: "Laju = J ÷ M", label: "" },
    { formula: "Laju purata = Jumlah J ÷ Jumlah M", label: "" },
    { formula: "Pecutan = Δlaju ÷ M", label: "" },
  ],
  quickRevision: [
    "Saya boleh mengira laju dan kenal pasti laju seragam lwn tidak seragam.",
    "Saya boleh mengira laju purata.",
    "Saya boleh mengira pecutan dan nyahpecutan, dengan penukaran unit.",
  ],
  examTips: [
    "Pecutan negatif hanyalah nyahpecutan — anda boleh tulis jawapan sebagai nilai nyahpecutan positif.",
    "Semak laju seragam? Kira laju untuk SETIAP bahagian, bukan hanya pertama — kesemuanya mesti sepadan.",
  ],
  challenge: {
    question:
      "Penunggang basikal memecut seragam dari 5 m/s ke 15 m/s dalam 8 saat, kemudian bergerak laju tetap itu selama 20 saat. Cari (a) pecutan, (b) jumlah jarak dilalui dalam 28 saat itu.",
    answer:
      "(a) (15−5)/8 = 1.25 m/s². (b) Fasa pecutan: laju purata (5+15)/2=10 m/s × 8s = 80m. Fasa tetap: 15×20=300m. Jumlah = 380 m.",
  },
};

export const mathF2C9InteractiveContent: { en: MathF2C9Content; bm: MathF2C9Content } = { en, bm };
