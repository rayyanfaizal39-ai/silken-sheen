// Form 3 Mathematics, Chapter 5 — Trigonometric Ratios / Nisbah
// Trigonometri. 1 official subtopic (5.1, covering sine/cosine/tangent),
// built as 2 flowing sections ("Sine, Cosine and Tangent of Acute Angles"
// and "Finding Missing Sides and Angles"). Interactive bilingual content. EN
// sourced from T3_BT_MAT_DLP_-_MATHEMATICS.pdf, BM sourced from
// T3_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math3-chapter5-trigonometric-ratios-notes-v1.html.
//
// Correction from the mockup: worked example 5.1b part (c) originally asked
// for "tan∠QPR" — but ∠QPR is the triangle's given 90° right angle (tangent
// of 90° is undefined), and the mockup's own "why" text contradicted the
// question by reasoning about "angle P (not the right angle)". Rewritten
// here to ask for tan∠PQR (the acute angle at Q), verified in Node:
// PR=√161≈12.69, tan∠PQR=PR/PQ=√161/8≈1.59.
//
// Content only — no presentation markup (rendered by MathF3Chapter5NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF3C5Visual = {
  kind: "triangleLabel";
  anchor: "bottomRight" | "top";
  thetaLabel: string;
  oppositeLabel: string;
  adjacentLabel: string;
  hypotenuseLabel: string;
  caption: string;
};

export interface MathF3C5Block {
  formula: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked?: { question: string; steps: WorkedStep[] };
}

export interface MathF3C5SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF3C5Visual;
  blocks: MathF3C5Block[];
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF3C5Content {
  subtopics: MathF3C5SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF3C5Content = {
  subtopics: [
    {
      num: "5.1",
      title: "Sine, Cosine and Tangent of Acute Angles",
      ideaParagraphs: [
        "The hypotenuse is always the longest side, opposite the right angle — that one never changes. But which side is opposite and which is adjacent depends on WHICH acute angle you're looking from.",
      ],
      visual: {
        kind: "triangleLabel",
        anchor: "bottomRight",
        thetaLabel: "θ",
        oppositeLabel: "opposite",
        adjacentLabel: "adjacent",
        hypotenuseLabel: "hypotenuse",
        caption:
          "Hypotenuse never changes — but opposite and adjacent depend on which angle (θ) you're looking from",
      },
      blocks: [
        {
          formula: {
            eyebrow: "SOH-CAH-TOA",
            formula: "sin θ = opp/hyp  |  cos θ = adj/hyp  |  tan θ = opp/adj",
          },
          worked: {
            question:
              "A right triangle has opposite=3, adjacent=4, hypotenuse=5 (relative to angle x). Find sin x, cos x, tan x.",
            steps: [
              { calc: "sin x = opp/hyp = 3/5", why: "SOH: sine is opposite over hypotenuse." },
              { calc: "cos x = adj/hyp = 4/5", why: "CAH: cosine is adjacent over hypotenuse." },
              { calc: "tan x = opp/adj = 3/4", why: "TOA: tangent is opposite over adjacent." },
            ],
          },
        },
      ],
      guided: {
        question: "If sin x = ⅗, what must cos x and tan x be, using the same 3-4-5 triangle?",
        answer: "cos x = 4/5, tan x = 3/4 — the same triangle gives all three ratios at once.",
      },
      mistake: {
        wrong:
          "Labeling opposite/adjacent based on the triangle's position instead of the marked angle.",
        right:
          "Always start from the marked angle. The side touching it (not the hypotenuse) is adjacent; the side across from it is opposite.",
      },
      practice: {
        easy: {
          question: "In a right triangle, which side is always opposite the 90° angle?",
          answer: "The hypotenuse.",
        },
        medium: {
          question:
            "Triangle A has opposite=9, adjacent=12, hyp=15 (angle x). Triangle B has opposite=3, adjacent=4, hyp=5 (angle y). Are sin x and sin y equal? Why?",
          answer:
            "Yes — 9/15=3/5, both give 0.6. The triangles are proportional (same shape, different size), so their angle ratios match.",
        },
        hard: {
          question:
            "A right triangle has tan θ = 5/12. If the hypotenuse is 13, what are the opposite and adjacent sides? (Hint: 5-12-13 is a Pythagorean triple.)",
          answer: "Opposite=5, adjacent=12 (check: 5²+12²=25+144=169=13²).",
        },
      },
      realLife: ["🏔️ Measuring mountain/building heights", "📐 Navigation and surveying"],
    },
    {
      num: "5.1",
      title: "Finding Missing Sides and Angles",
      ideaParagraphs: [
        "Know an angle and ONE side? SOH-CAH-TOA finds any other side. Pick whichever ratio connects the side you KNOW to the side you WANT.",
      ],
      blocks: [
        {
          formula: {
            eyebrow: "Choosing the Right Ratio",
            formula: "Match the KNOWN side and the WANTED side to sin, cos, or tan",
          },
          worked: {
            question:
              "Right triangle PQR: ∠QPR=90°, QR=15, PQ=8. Find (a) PR, (b) sin∠PRQ, (c) tan∠PQR.",
            steps: [
              {
                calc: "(a) PR² = QR² − PQ² = 15² − 8² = 161",
                why: "PQR is right-angled at P, so QR is the hypotenuse — use Pythagoras to find the missing side PR.",
              },
              { calc: "PR = √161 ≈ 12.69", why: "Square-root both sides." },
              {
                calc: "(b) sin∠PRQ = PQ/QR = 8/15 ≈ 0.533",
                why: "From angle R, PQ is opposite and QR is the hypotenuse.",
              },
              {
                calc: "(c) tan∠PQR = PR/PQ = √161/8 ≈ 1.59",
                why: "From angle Q, PR is opposite and PQ is adjacent — QR is the hypotenuse, not adjacent.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "A ladder leans against a wall, making a 60° angle with the ground. If the ladder is 4m long, how high up the wall does it reach? (height = hyp × sin60°)",
        answer: "height = 4 × sin60° = 4 × 0.866 ≈ 3.46 m.",
      },
      mistake: {
        wrong: "Picking a ratio that doesn't involve the side you actually know.",
        right:
          "List which sides you know and want FIRST, then choose whichever of sin/cos/tan connects exactly those two.",
      },
      practice: {
        easy: {
          question:
            "A right triangle has angle 30°, adjacent=10. Find the opposite side (tan30°≈0.577).",
          answer: "opp = 10×tan30° ≈ 5.77",
        },
        medium: {
          question:
            "A right triangle has hypotenuse=20, angle=40°. Find the adjacent side (cos40°≈0.766).",
          answer: "adj = 20×cos40° ≈ 15.32",
        },
        hard: {
          question:
            "A kite string makes a 55° angle with the ground and is 30m long. Find the kite's height, then find how far the kite is horizontally from the person holding it (sin55°≈0.819, cos55°≈0.574).",
          answer: "Height = 30×sin55° ≈ 24.57m. Horizontal = 30×cos55° ≈ 17.21m.",
        },
      },
      realLife: ["🪜 Ladder safety angles", "✈️ Aircraft descent angles"],
    },
  ],
  summary: {
    center: "Trigonometric Ratios",
    branches: [
      { title: "SOH", points: ["sin θ = opp/hyp"] },
      { title: "CAH", points: ["cos θ = adj/hyp"] },
      { title: "TOA", points: ["tan θ = opp/adj"] },
    ],
  },
  formulaSheet: [
    { formula: "sin θ = opp/hyp", label: "" },
    { formula: "cos θ = adj/hyp", label: "" },
    { formula: "tan θ = opp/adj", label: "" },
  ],
  quickRevision: [
    "I can identify opposite, adjacent, and hypotenuse for a given angle.",
    "I can use sin, cos, and tan to find missing sides and ratios.",
  ],
  examTips: [
    "Sketch and label the triangle first, marking which sides are known and unknown — it makes choosing SOH/CAH/TOA obvious.",
  ],
  challenge: {
    question:
      "A surveyor stands 50m from the base of a tower and measures the angle of elevation to the top as 35°. Find the tower's height (tan35°≈0.700).",
    answer: "height = 50 × tan35° ≈ 35 m.",
  },
};

const bm: MathF3C5Content = {
  subtopics: [
    {
      num: "5.1",
      title: "Sinus, Kosinus dan Tangen Sudut Tirus",
      ideaParagraphs: [
        "Hipotenus sentiasa sisi terpanjang, bertentangan sudut tegak — itu tidak pernah berubah. Tetapi sisi mana bertentangan dan mana bersebelahan bergantung pada sudut tirus MANA anda melihat.",
      ],
      visual: {
        kind: "triangleLabel",
        anchor: "bottomRight",
        thetaLabel: "θ",
        oppositeLabel: "bertentangan",
        adjacentLabel: "bersebelahan",
        hypotenuseLabel: "hipotenus",
        caption:
          "Hipotenus tidak pernah berubah — tetapi bertentangan dan bersebelahan bergantung sudut (θ) mana anda melihat",
      },
      blocks: [
        {
          formula: {
            eyebrow: "SOH-CAH-TOA",
            formula: "sin θ = bert/hip  |  kos θ = bers/hip  |  tan θ = bert/bers",
          },
          worked: {
            question:
              "Segi tiga tegak ada bertentangan=3, bersebelahan=4, hipotenus=5 (relatif sudut x). Cari sin x, kos x, tan x.",
            steps: [
              {
                calc: "sin x = bert/hip = 3/5",
                why: "SOH: sinus ialah bertentangan atas hipotenus.",
              },
              {
                calc: "kos x = bers/hip = 4/5",
                why: "CAH: kosinus ialah bersebelahan atas hipotenus.",
              },
              {
                calc: "tan x = bert/bers = 3/4",
                why: "TOA: tangen ialah bertentangan atas bersebelahan.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Jika sin x = ⅗, apakah kos x dan tan x, guna segi tiga 3-4-5 sama?",
        answer: "kos x = 4/5, tan x = 3/4 — segi tiga sama beri kesemua tiga nisbah serentak.",
      },
      mistake: {
        wrong:
          "Menamakan bertentangan/bersebelahan berdasarkan kedudukan segi tiga bukan sudut ditanda.",
        right:
          "Sentiasa mula daripada sudut ditanda. Sisi menyentuhnya (bukan hipotenus) ialah bersebelahan; sisi merentasinya ialah bertentangan.",
      },
      practice: {
        easy: {
          question: "Dalam segi tiga tegak, sisi mana sentiasa bertentangan sudut 90°?",
          answer: "Hipotenus.",
        },
        medium: {
          question:
            "Segi tiga A bertentangan=9, bersebelahan=12, hip=15 (sudut x). Segi tiga B bertentangan=3, bersebelahan=4, hip=5 (sudut y). Adakah sin x dan sin y sama? Kenapa?",
          answer:
            "Ya — 9/15=3/5, kedua-dua beri 0.6. Segi tiga berkadar (bentuk sama, saiz berbeza), jadi nisbah sudut sepadan.",
        },
        hard: {
          question:
            "Segi tiga tegak ada tan θ = 5/12. Jika hipotenus 13, apakah sisi bertentangan dan bersebelahan? (Petunjuk: 5-12-13 ialah triplet Pythagoras.)",
          answer: "Bertentangan=5, bersebelahan=12 (semak: 5²+12²=25+144=169=13²).",
        },
      },
      realLife: ["🏔️ Mengukur ketinggian gunung/bangunan", "📐 Navigasi dan tinjauan"],
    },
    {
      num: "5.1",
      title: "Mencari Sisi dan Sudut Hilang",
      ideaParagraphs: [
        "Tahu sudut dan SATU sisi? SOH-CAH-TOA cari sebarang sisi lain. Pilih nisbah yang menghubungkan sisi anda TAHU dengan sisi anda MAHU.",
      ],
      blocks: [
        {
          formula: {
            eyebrow: "Memilih Nisbah Betul",
            formula: "Padankan sisi DIKETAHUI dan sisi DIMAHUKAN dengan sin, kos, atau tan",
          },
          worked: {
            question:
              "Segi tiga tegak PQR: ∠QPR=90°, QR=15, PQ=8. Cari (a) PR, (b) sin∠PRQ, (c) tan∠PQR.",
            steps: [
              {
                calc: "(a) PR² = QR² − PQ² = 15² − 8² = 161",
                why: "PQR bersudut tegak di P, jadi QR ialah hipotenus — guna Pythagoras untuk cari sisi hilang PR.",
              },
              { calc: "PR = √161 ≈ 12.69", why: "Cari punca kuasa dua kedua-dua belah." },
              {
                calc: "(b) sin∠PRQ = PQ/QR = 8/15 ≈ 0.533",
                why: "Daripada sudut R, PQ bertentangan dan QR hipotenus.",
              },
              {
                calc: "(c) tan∠PQR = PR/PQ = √161/8 ≈ 1.59",
                why: "Daripada sudut Q, PR bertentangan dan PQ bersebelahan — QR ialah hipotenus, bukan bersebelahan.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Tangga bersandar dinding, buat sudut 60° dengan tanah. Jika tangga 4m panjang, berapa tinggi ia sampai dinding? (tinggi = hip × sin60°)",
        answer: "tinggi = 4 × sin60° = 4 × 0.866 ≈ 3.46 m.",
      },
      mistake: {
        wrong: "Memilih nisbah tidak melibatkan sisi anda sebenarnya tahu.",
        right:
          "Senaraikan sisi anda tahu dan mahu DAHULU, kemudian pilih sin/kos/tan yang hubungkan tepat kedua-dua itu.",
      },
      practice: {
        easy: {
          question:
            "Segi tiga tegak ada sudut 30°, bersebelahan=10. Cari sisi bertentangan (tan30°≈0.577).",
          answer: "bert = 10×tan30° ≈ 5.77",
        },
        medium: {
          question:
            "Segi tiga tegak ada hipotenus=20, sudut=40°. Cari sisi bersebelahan (kos40°≈0.766).",
          answer: "bers = 20×kos40° ≈ 15.32",
        },
        hard: {
          question:
            "Tali layang-layang buat sudut 55° dengan tanah dan panjang 30m. Cari ketinggian layang-layang, kemudian cari jarak mendatar layang-layang dari orang memegangnya (sin55°≈0.819, kos55°≈0.574).",
          answer: "Tinggi = 30×sin55° ≈ 24.57m. Mendatar = 30×kos55° ≈ 17.21m.",
        },
      },
      realLife: ["🪜 Sudut keselamatan tangga", "✈️ Sudut penurunan pesawat"],
    },
  ],
  summary: {
    center: "Nisbah Trigonometri",
    branches: [
      { title: "SOH", points: ["sin θ = bert/hip"] },
      { title: "CAH", points: ["kos θ = bers/hip"] },
      { title: "TOA", points: ["tan θ = bert/bers"] },
    ],
  },
  formulaSheet: [
    { formula: "sin θ = bert/hip", label: "" },
    { formula: "kos θ = bers/hip", label: "" },
    { formula: "tan θ = bert/bers", label: "" },
  ],
  quickRevision: [
    "Saya boleh kenal pasti bertentangan, bersebelahan, dan hipotenus bagi sudut diberi.",
    "Saya boleh guna sin, kos, dan tan untuk cari sisi dan nisbah hilang.",
  ],
  examTips: [
    "Lakar dan label segi tiga dahulu, tanda sisi mana diketahui dan tidak — ia jadikan pemilihan SOH/CAH/TOA jelas.",
  ],
  challenge: {
    question:
      "Juruukur berdiri 50m dari tapak menara dan ukur sudut dongakan ke puncak 35°. Cari ketinggian menara (tan35°≈0.700).",
    answer: "tinggi = 50 × tan35° ≈ 35 m.",
  },
};

export const mathF3C5InteractiveContent: { en: MathF3C5Content; bm: MathF3C5Content } = { en, bm };
