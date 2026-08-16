// Form 3 Mathematics, Chapter 9 — Straight Lines / Garis Lurus. Only ONE
// official subtopic (9.1, "Straight Lines"), built as 2 flowing sections:
// "The Equation of a Straight Line" and "Point of Intersection of Two
// Straight Lines" — both carry the textbook's own "9.1" badge (matching the
// source mockup, which numbers both sec-9-1a and sec-9-1b as "9.1"); `num`
// stays a unique per-section key ("9.1a"/"9.1b") for scroll-tracking while
// `badge` renders the shared "9.1" the textbook uses. Interactive bilingual
// content, cross-checked against
// design-reference/math3-chapter9-straight-lines-notes-v1.html.
//
// Content accuracy notes:
// - The challenge-mission cross-check was independently verified: L1:
//   y=2x+4, L2: y=−x−2. Setting equal: 2x+4=−x−2 → 3x=−6 → x=−2,
//   y=2(−2)+4=0 → (−2,0). Checked against BOTH original equations:
//   L1: y=2(−2)+4=0 ✓. L2: y=−(−2)−2=0 ✓.
// - Several answer strings in the source mockup (e.g. "(3,3)", pure
//   algebra lines) only ever had an <span class="en"> written, or no span
//   at all, because they're just numbers/symbols. Where the content is
//   genuinely language-neutral (coordinates, equations) the same string is
//   reused for both `en` and `bm`; where connecting words exist ("Adding:",
//   "Point:") a proper Malay translation is supplied instead of leaving BM
//   mode fall back to English.
//
// Content only — no presentation markup (rendered by MathF3Chapter9NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF3C9Visual =
  | { kind: "parallelLines"; caption: string }
  | { kind: "lineIntersection"; label: string; caption: string };

export interface MathF3C9Block {
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked?: { question: string; steps: WorkedStep[] };
}

export interface MathF3C9SubtopicContent {
  /** Unique key used for the scroll-tracking DOM id (e.g. "9.1a", "9.1b"). */
  num: string;
  /** Displayed section badge, matching the textbook's own numbering (both flowing sections show "9.1"). */
  badge: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF3C9Visual;
  blocks: MathF3C9Block[];
  guided?: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF3C9Content {
  subtopics: MathF3C9SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF3C9Content = {
  subtopics: [
    {
      num: "9.1a",
      badge: "9.1",
      title: "The Equation of a Straight Line",
      ideaParagraphs: [
        "Every straight line's equation can be written as y = mx + c. The number m is the gradient (how steep), and c is the y-intercept (where it crosses the y-axis). Lines with the SAME gradient never meet — they're parallel.",
      ],
      visual: {
        kind: "parallelLines",
        caption: "Same slope, different starting height — parallel lines never touch",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Equation of a Straight Line",
            formula: "y = mx + c",
            legend: [
              { label: "m", text: "= gradient" },
              { label: "c", text: "= y-intercept" },
            ],
          },
          worked: {
            question: "Determine the gradient and y-intercept of: (a) y=2x+9 (b) 3y=−2x+12",
            steps: [
              {
                calc: "(a) y=2x+9 → gradient=2, y-intercept=9",
                why: "Already in y=mx+c form — just read off m and c directly.",
              },
              {
                calc: "(b) 3y=−2x+12 → y=−⅔x+4",
                why: "Divide every term by 3 to isolate y first.",
              },
              {
                calc: "gradient=−⅔, y-intercept=4",
                why: "Now read off m and c from the rearranged form.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Line A is y=4x−1. Line B is y=4x+7. Are they parallel? Explain.",
        answer: "Yes — both have gradient 4. Only the y-intercepts differ, so they never cross.",
      },
      mistake: {
        wrong:
          "Reading the gradient straight off an equation like 3y=−2x+12 without dividing through first.",
        right:
          "Always rearrange into y=mx+c FIRST (divide every term by the coefficient of y) — only then read off m and c.",
      },
      practice: {
        easy: {
          question: "State the gradient and y-intercept of y=5x−3.",
          answer: "gradient=5, y-intercept=−3",
        },
        medium: {
          question: "Rewrite 2y+4x=8 in the form y=mx+c, then state the gradient.",
          answer: "y=−2x+4. Gradient=−2.",
        },
        hard: {
          question: "A line passes through (0,5) and is parallel to y=3x−7. Find its equation.",
          answer:
            "Parallel means same gradient (3). Passing through (0,5) means y-intercept=5. Equation: y=3x+5.",
        },
      },
      realLife: ["📈 Cost/profit projections", "🛤️ Railway track planning"],
    },
    {
      num: "9.1b",
      badge: "9.1",
      title: "Point of Intersection of Two Straight Lines",
      ideaParagraphs: [
        "Two non-parallel lines cross at exactly ONE point — the only (x,y) that satisfies BOTH equations at once. Solve the two equations together (substitution or elimination) to find it, without needing to draw anything.",
      ],
      visual: {
        kind: "lineIntersection",
        label: "intersection",
        caption:
          "Two non-parallel lines meet at exactly one point — the (x,y) that solves both equations",
      },
      blocks: [
        {
          worked: {
            question: "Find the point of intersection of 2x+y=5 and x+2y=1.",
            steps: [
              { calc: "From eq1: y=5−2x", why: "Rearrange the simpler equation to isolate y." },
              {
                calc: "Substitute into eq2: x+2(5−2x)=1",
                why: "Replace y in the second equation with the expression just found.",
              },
              { calc: "x+10−4x=1 → −3x=−9 → x=3", why: "Simplify and solve for x." },
              {
                calc: "y=5−2(3)=−1. Point: (3,−1)",
                why: "Substitute x back into the rearranged equation to find y.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Find the point of intersection of y=x+2 and y=3x−4.",
        answer: "x+2=3x−4 → 6=2x → x=3. y=3+2=5. Point: (3,5).",
      },
      mistake: {
        wrong: "Solving for x, then forgetting to substitute back to find y.",
        right:
          "A point of intersection needs BOTH coordinates — always substitute your x (or y) back into one of the original equations to find the other.",
      },
      practice: {
        easy: {
          question: "Find the point of intersection of y=x and y=6−x.",
          answer: "(3,3)",
        },
        medium: {
          question: "Find the point of intersection of 3x+y=7 and x−y=1.",
          answer: "Adding: 4x=8, x=2. Then y=2−1=1. Point: (2,1).",
        },
        hard: {
          question:
            "Two plants' heights (cm) after x days are y=8+2x and y=20−x. Find the day and height at which both plants are equal.",
          answer: "8+2x=20−x. 3x=12. x=4 days. y=8+2(4)=16cm.",
        },
      },
      realLife: ["💰 Break-even point analysis", "🚦 Traffic route planning"],
    },
  ],
  summary: {
    center: "Straight Lines",
    branches: [
      { title: "Equation", points: ["y = mx + c"] },
      { title: "Parallel", points: ["Same gradient m"] },
      { title: "Intersection", points: ["Solve both equations together"] },
    ],
  },
  formulaSheet: [
    { formula: "y = mx + c", label: "" },
    { formula: "Parallel lines: equal gradients", label: "" },
  ],
  quickRevision: [
    "I can find the gradient and y-intercept from an equation.",
    "I can identify parallel lines and find the point of intersection of two lines.",
  ],
  examTips: [
    "Always rearrange into y=mx+c before reading off the gradient — never read it straight from an unrearranged equation.",
  ],
  challenge: {
    question:
      "Line L1 passes through (0,4) with gradient 2. Line L2 passes through (0,−2) with gradient −1. Find their point of intersection, and verify it lies on BOTH lines by substituting back into each equation.",
    answer:
      "L1: y=2x+4. L2: y=−x−2. Setting equal: 2x+4=−x−2. 3x=−6. x=−2. y=2(−2)+4=0. Point: (−2,0). Check L1: 2(−2)+4=0 ✓. Check L2: −(−2)−2=0 ✓.",
  },
};

const bm: MathF3C9Content = {
  subtopics: [
    {
      num: "9.1a",
      badge: "9.1",
      title: "Persamaan Garis Lurus",
      ideaParagraphs: [
        "Persamaan setiap garis lurus boleh ditulis sebagai y = mx + c. Nombor m ialah kecerunan (seberapa curam), dan c ialah pintasan-y (di mana ia melintasi paksi-y). Garis dengan kecerunan SAMA tidak pernah bertemu — ia selari.",
      ],
      visual: {
        kind: "parallelLines",
        caption: "Cerun sama, ketinggian mula berbeza — garis selari tidak pernah sentuh",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Persamaan Garis Lurus",
            formula: "y = mx + c",
            legend: [
              { label: "m", text: "= kecerunan" },
              { label: "c", text: "= pintasan-y" },
            ],
          },
          worked: {
            question: "Tentukan kecerunan dan pintasan-y bagi: (a) y=2x+9 (b) 3y=−2x+12",
            steps: [
              {
                calc: "(a) y=2x+9 → kecerunan=2, pintasan-y=9",
                why: "Sudah dalam bentuk y=mx+c — baca terus m dan c.",
              },
              {
                calc: "(b) 3y=−2x+12 → y=−⅔x+4",
                why: "Bahagi setiap sebutan dengan 3 untuk asingkan y dahulu.",
              },
              {
                calc: "kecerunan=−⅔, pintasan-y=4",
                why: "Sekarang baca m dan c daripada bentuk disusun semula.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Garis A ialah y=4x−1. Garis B ialah y=4x+7. Adakah ia selari? Jelaskan.",
        answer:
          "Ya — kedua-dua ada kecerunan 4. Hanya pintasan-y berbeza, jadi tidak pernah bersilang.",
      },
      mistake: {
        wrong: "Baca kecerunan terus daripada persamaan seperti 3y=−2x+12 tanpa bahagi dahulu.",
        right:
          "Sentiasa susun semula ke y=mx+c DAHULU (bahagi setiap sebutan dengan pekali y) — hanya kemudian baca m dan c.",
      },
      practice: {
        easy: {
          question: "Nyatakan kecerunan dan pintasan-y bagi y=5x−3.",
          answer: "kecerunan=5, pintasan-y=−3",
        },
        medium: {
          question: "Tulis semula 2y+4x=8 dalam bentuk y=mx+c, kemudian nyatakan kecerunan.",
          answer: "y=−2x+4. Kecerunan=−2.",
        },
        hard: {
          question: "Garis melalui (0,5) dan selari dengan y=3x−7. Cari persamaannya.",
          answer:
            "Selari bermaksud kecerunan sama (3). Melalui (0,5) bermaksud pintasan-y=5. Persamaan: y=3x+5.",
        },
      },
      realLife: ["📈 Unjuran kos/keuntungan", "🛤️ Perancangan trek keretapi"],
    },
    {
      num: "9.1b",
      badge: "9.1",
      title: "Titik Persilangan Dua Garis Lurus",
      ideaParagraphs: [
        "Dua garis tidak selari bersilang pada tepat SATU titik — satu-satunya (x,y) memenuhi KEDUA-DUA persamaan serentak. Selesaikan kedua-dua persamaan bersama (gantian atau penghapusan) untuk cari, tanpa perlu lukis apa-apa.",
      ],
      visual: {
        kind: "lineIntersection",
        label: "persilangan",
        caption:
          "Dua garis tidak selari bertemu tepat satu titik — (x,y) yang selesaikan kedua-dua persamaan",
      },
      blocks: [
        {
          worked: {
            question: "Cari titik persilangan 2x+y=5 dan x+2y=1.",
            steps: [
              {
                calc: "Daripada pers1: y=5−2x",
                why: "Susun semula persamaan lebih mudah untuk asingkan y.",
              },
              {
                calc: "Gantikan ke pers2: x+2(5−2x)=1",
                why: "Ganti y dalam persamaan kedua dengan ungkapan baru dijumpai.",
              },
              { calc: "x+10−4x=1 → −3x=−9 → x=3", why: "Permudahkan dan selesaikan untuk x." },
              {
                calc: "y=5−2(3)=−1. Titik: (3,−1)",
                why: "Gantikan x semula ke persamaan disusun semula untuk cari y.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Cari titik persilangan y=x+2 dan y=3x−4.",
        answer: "x+2=3x−4 → 6=2x → x=3. y=3+2=5. Titik: (3,5).",
      },
      mistake: {
        wrong: "Selesaikan untuk x, kemudian terlupa gantikan semula untuk cari y.",
        right:
          "Titik persilangan perlukan KEDUA-DUA koordinat — sentiasa gantikan x (atau y) anda semula ke satu persamaan asal untuk cari yang satu lagi.",
      },
      practice: {
        easy: {
          question: "Cari titik persilangan y=x dan y=6−x.",
          answer: "(3,3)",
        },
        medium: {
          question: "Cari titik persilangan 3x+y=7 dan x−y=1.",
          answer: "Tambah: 4x=8, x=2. Kemudian y=2−1=1. Titik: (2,1).",
        },
        hard: {
          question:
            "Ketinggian dua pokok (cm) selepas x hari ialah y=8+2x dan y=20−x. Cari hari dan ketinggian apabila kedua-dua pokok sama.",
          answer: "8+2x=20−x. 3x=12. x=4 hari. y=8+2(4)=16cm.",
        },
      },
      realLife: ["💰 Analisis titik pulang modal", "🚦 Perancangan laluan trafik"],
    },
  ],
  summary: {
    center: "Garis Lurus",
    branches: [
      { title: "Persamaan", points: ["y = mx + c"] },
      { title: "Selari", points: ["Kecerunan m sama"] },
      { title: "Persilangan", points: ["Selesaikan kedua-dua persamaan bersama"] },
    ],
  },
  formulaSheet: [
    { formula: "y = mx + c", label: "" },
    { formula: "Garis selari: kecerunan sama", label: "" },
  ],
  quickRevision: [
    "Saya boleh cari kecerunan dan pintasan-y daripada persamaan.",
    "Saya boleh kenal pasti garis selari dan cari titik persilangan dua garis.",
  ],
  examTips: [
    "Sentiasa susun semula ke y=mx+c sebelum baca kecerunan — jangan baca terus daripada persamaan tidak disusun.",
  ],
  challenge: {
    question:
      "Garis L1 melalui (0,4) dengan kecerunan 2. Garis L2 melalui (0,−2) dengan kecerunan −1. Cari titik persilangan mereka, dan sahkan ia terletak pada KEDUA-DUA garis dengan gantikan semula ke setiap persamaan.",
    answer:
      "L1: y=2x+4. L2: y=−x−2. Samakan: 2x+4=−x−2. 3x=−6. x=−2. y=2(−2)+4=0. Titik: (−2,0). Semak L1: 2(−2)+4=0 ✓. Semak L2: −(−2)−2=0 ✓.",
  },
};

export const mathF3C9InteractiveContent: { en: MathF3C9Content; bm: MathF3C9Content } = { en, bm };
