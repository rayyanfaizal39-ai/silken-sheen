// Form 2 Mathematics, Chapter 4 — Polygon / Poligon. Interactive bilingual
// content. EN sourced from T2_BT_MAT_DLP_-_MATHEMATICS.pdf, BM sourced from
// T2_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math2-chapter4-polygon-notes-v1.html.
// Content only — no presentation markup (rendered by MathF2Chapter4NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF2C4Visual =
  | { kind: "regularVsIrregular"; regularLabel: string; irregularLabel: string; caption?: string }
  | { kind: "triangleFan"; n: number; caption?: string }
  | { kind: "walkAround"; n: number; caption?: string };

export interface MathF2C4Block {
  ideaTag?: string;
  ideaParagraphs: string[];
  visual?: MathF2C4Visual;
  formula?: { eyebrow?: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
}

export interface MathF2C4SubtopicContent {
  num: string;
  title: string;
  blocks: MathF2C4Block[];
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C4Content {
  subtopics: MathF2C4SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C4Content = {
  subtopics: [
    {
      num: "4.1",
      title: "Regular Polygon",
      blocks: [
        {
          ideaParagraphs: [
            "A regular polygon has ALL sides the same length AND all interior angles the same size — both, not just one. If either is uneven, it's irregular.",
          ],
          visual: {
            kind: "regularVsIrregular",
            regularLabel: "regular",
            irregularLabel: "irregular",
            caption:
              "Same number of sides, very different shapes — only one has equal sides AND equal angles",
          },
          formula: {
            eyebrow: "The Diameter of Symmetry",
            formula: "A regular polygon has an axis of symmetry through every vertex",
          },
          worked: {
            question: "Which shapes below are regular, and which are irregular?",
            steps: [
              {
                calc: "Check EVERY side and EVERY angle",
                why: "A shape is only regular if ALL sides match AND all angles match — check both properties, not just one.",
              },
              {
                calc: "Equilateral triangle, square: regular",
                why: "Both have every side and every angle identical.",
              },
              {
                calc: "Rectangle, rhombus, scalene triangle: irregular",
                why: "Each fails one condition — a rectangle's sides aren't all equal; a rhombus's angles aren't all equal.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "A stop sign is a regular octagon. How many axes of symmetry does it have?",
        answer: "A regular polygon has one axis of symmetry per vertex — an octagon has 8.",
      },
      mistake: {
        wrong: 'Calling a shape "regular" just because its sides look equal.',
        right:
          "BOTH conditions must hold — equal sides AND equal angles. A rhombus has equal sides but unequal angles, so it's NOT regular.",
      },
      practice: {
        easy: {
          question: "Is a square a regular polygon?",
          answer: "Yes — all 4 sides equal, all 4 angles are 90°.",
        },
        medium: {
          question: "Is a rectangle (non-square) a regular polygon? Explain.",
          answer: "No — angles are all 90° but sides aren't all equal (length ≠ width).",
        },
        hard: {
          question:
            "A regular pentagon has how many axes of symmetry, and where do they pass through?",
          answer: "5 axes, each passing through one vertex and the midpoint of the opposite side.",
        },
      },
      realLife: ["🕌 Mosque architecture", "🛑 Traffic signs"],
    },
    {
      num: "4.2",
      title: "Interior Angles and Exterior Angles of Polygons",
      blocks: [
        {
          ideaParagraphs: [
            "Draw lines from ONE corner of a polygon to every other corner — it splits into triangles. Since every triangle's angles add to 180°, the WHOLE polygon's interior angles add to (number of triangles) × 180°.",
          ],
          visual: {
            kind: "triangleFan",
            n: 5,
            caption:
              "A pentagon (5 sides) splits into 3 triangles from one vertex — always 2 fewer triangles than sides",
          },
          formula: {
            eyebrow: "Sum of Interior Angles",
            formula: "(n − 2) × 180°",
            legend: [
              {
                label: "n",
                text: "= number of sides. A pentagon (n=5) splits into 3 triangles: 3×180°=540°",
              },
            ],
          },
          worked: {
            question: "A pentagon has interior angles 100°, 130°, 60°, 90° and x. Find x.",
            steps: [
              {
                calc: "Sum for a pentagon = (5−2)×180° = 540°",
                why: "A pentagon splits into 3 triangles, so its angles total 3×180°.",
              },
              {
                calc: "x + 100+130+60+90 = 540",
                why: "All 5 interior angles must add up to that total.",
              },
              { calc: "x = 540 − 380 = 160°", why: "Subtract the four known angles to find x." },
            ],
          },
        },
        {
          ideaTag: "Exterior Angles — Always 360°",
          ideaParagraphs: [
            "Walk around the outside of ANY polygon, turning slightly at each corner. By the time you're back at the start, you've turned exactly one full circle — 360° — no matter how many sides the polygon has.",
          ],
          visual: {
            kind: "walkAround",
            n: 5,
            caption:
              "Every corner you turn a bit — by the end you've rotated exactly once, all the way around",
          },
          formula: {
            formula: "Sum of exterior angles = 360°, always",
            legend: [
              {
                label: "→",
                text: "Interior + Exterior at the SAME vertex always = 180° (they're on a straight line)",
              },
            ],
          },
          worked: {
            question: "Find the exterior AND interior angle of a regular octagon.",
            steps: [
              {
                calc: "Exterior angle = 360° ÷ 8 = 45°",
                why: "A regular octagon has 8 EQUAL exterior angles sharing the fixed 360° total.",
              },
              {
                calc: "Interior angle = 180° − 45° = 135°",
                why: "Interior and exterior at the same corner always add to 180° (they sit on a straight line).",
              },
            ],
          },
        },
      ],
      guided: {
        question: "A regular polygon has an interior angle of 144°. How many sides does it have?",
        answer: "Exterior = 180−144 = 36°. n = 360÷36 = 10 sides.",
      },
      mistake: {
        wrong: "Using (n−2)×180° for EXTERIOR angles too.",
        right:
          "Exterior angles ALWAYS sum to 360° — that formula never changes, no matter the shape.",
      },
      practice: {
        easy: {
          question: "Find the interior angle sum of a hexagon (n=6).",
          answer: "(6−2)×180° = 720°",
        },
        medium: {
          question: "Find the exterior angle of a regular octagon.",
          answer: "360÷8 = 45°",
        },
        hard: {
          question:
            "ABCDE is a regular pentagon. BCF and EDF are straight lines. Find x, the angle at F.",
          answer:
            "Interior angle = 540÷5 = 108°. ∠FCD=180−108=72°, same for ∠FDC. x=180−72−72=36°.",
        },
      },
      realLife: ["🏗️ Roof truss design", "🎨 Tiling and mosaics"],
    },
  ],
  summary: {
    center: "Polygon",
    branches: [
      { title: "Regular", points: ["Equal sides AND equal angles"] },
      { title: "Interior Sum", points: ["(n−2)×180°"] },
      { title: "Exterior Sum", points: ["Always 360°"] },
    ],
  },
  formulaSheet: [
    { formula: "(n−2)×180°", label: "Interior angle sum" },
    { formula: "360°", label: "Exterior angle sum, always" },
    { formula: "Interior + Exterior = 180°", label: "at the same vertex" },
    { formula: "n = 360° ÷ exterior angle", label: "Finding number of sides" },
  ],
  quickRevision: [
    "I can identify regular and irregular polygons.",
    "I can find interior and exterior angles of polygons.",
  ],
  examTips: [
    "Exterior always sums to 360° — that number never changes with the shape.",
    "Finding sides from an angle? Convert to exterior angle first, then divide 360° by it.",
  ],
  challenge: {
    question:
      "A polygon's interior angle sum is 1440°. How many sides does it have, and what shape is that?",
    answer: "1440÷180=8, so n−2=8, n=10 — a decagon.",
  },
};

const bm: MathF2C4Content = {
  subtopics: [
    {
      num: "4.1",
      title: "Poligon Sekata",
      blocks: [
        {
          ideaParagraphs: [
            "Poligon sekata mempunyai SEMUA sisi panjang sama DAN semua sudut pedalaman saiz sama — kedua-dua, bukan satu sahaja. Jika mana-mana tidak sekata, ia tak sekata.",
          ],
          visual: {
            kind: "regularVsIrregular",
            regularLabel: "sekata",
            irregularLabel: "tak sekata",
            caption:
              "Bilangan sisi sama, bentuk sangat berbeza — hanya satu ada sisi sama DAN sudut sama",
          },
          formula: {
            eyebrow: "Simetri",
            formula: "Poligon sekata mempunyai paksi simetri melalui setiap bucu",
          },
          worked: {
            question: "Bentuk manakah sekata, dan manakah tak sekata?",
            steps: [
              {
                calc: "Semak SETIAP sisi dan SETIAP sudut",
                why: "Bentuk hanya sekata jika SEMUA sisi sepadan DAN semua sudut sepadan — semak kedua-dua sifat, bukan satu sahaja.",
              },
              {
                calc: "Segi tiga sama sisi, segi empat sama: sekata",
                why: "Kedua-duanya ada setiap sisi dan setiap sudut sama.",
              },
              {
                calc: "Segi empat tepat, rombus, segi tiga sekata sisi: tak sekata",
                why: "Setiap satu gagal satu syarat — sisi segi empat tepat tidak semua sama; sudut rombus tidak semua sama.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Papan tanda berhenti ialah oktagon sekata. Berapa paksi simetri ia ada?",
        answer: "Poligon sekata ada satu paksi simetri setiap bucu — oktagon ada 8.",
      },
      mistake: {
        wrong: 'Panggil bentuk "sekata" hanya kerana sisinya nampak sama.',
        right:
          "KEDUA-DUA syarat mesti berlaku — sisi sama DAN sudut sama. Rombus ada sisi sama tetapi sudut tidak sama, jadi ia BUKAN sekata.",
      },
      practice: {
        easy: {
          question: "Adakah segi empat sama poligon sekata?",
          answer: "Ya — semua 4 sisi sama, semua 4 sudut 90°.",
        },
        medium: {
          question: "Adakah segi empat tepat (bukan sama) poligon sekata? Jelaskan.",
          answer: "Tidak — sudut semua 90° tetapi sisi tidak semua sama (panjang ≠ lebar).",
        },
        hard: {
          question: "Pentagon sekata ada berapa paksi simetri, dan melalui mana?",
          answer: "5 paksi, setiap satu melalui satu bucu dan titik tengah sisi bertentangan.",
        },
      },
      realLife: ["🕌 Senibina masjid", "🛑 Papan tanda jalan"],
    },
    {
      num: "4.2",
      title: "Sudut Pedalaman dan Sudut Peluaran Poligon",
      blocks: [
        {
          ideaParagraphs: [
            "Lukis garis dari SATU penjuru poligon ke setiap penjuru lain — ia terbahagi kepada segi tiga. Oleh kerana sudut setiap segi tiga berjumlah 180°, sudut pedalaman KESELURUHAN poligon berjumlah (bilangan segi tiga) × 180°.",
          ],
          visual: {
            kind: "triangleFan",
            n: 5,
            caption:
              "Pentagon (5 sisi) terbahagi 3 segi tiga dari satu bucu — sentiasa 2 kurang segi tiga daripada sisi",
          },
          formula: {
            eyebrow: "Jumlah Sudut Pedalaman",
            formula: "(n − 2) × 180°",
            legend: [
              {
                label: "n",
                text: "= bilangan sisi. Pentagon (n=5) terbahagi 3 segi tiga: 3×180°=540°",
              },
            ],
          },
          worked: {
            question: "Pentagon ada sudut pedalaman 100°, 130°, 60°, 90° dan x. Cari x.",
            steps: [
              {
                calc: "Jumlah pentagon = (5−2)×180° = 540°",
                why: "Pentagon terbahagi 3 segi tiga, jadi sudutnya berjumlah 3×180°.",
              },
              {
                calc: "x + 100+130+60+90 = 540",
                why: "Kesemua 5 sudut pedalaman mesti berjumlah kepada jumlah itu.",
              },
              { calc: "x = 540 − 380 = 160°", why: "Tolak empat sudut diketahui untuk cari x." },
            ],
          },
        },
        {
          ideaTag: "Sudut Peluaran — Sentiasa 360°",
          ideaParagraphs: [
            "Berjalan mengelilingi luar SEBARANG poligon, berpusing sedikit di setiap penjuru. Apabila anda kembali ke permulaan, anda telah berpusing tepat satu bulatan penuh — 360° — tidak kira berapa sisi poligon itu.",
          ],
          visual: {
            kind: "walkAround",
            n: 5,
            caption:
              "Setiap penjuru anda berpusing sedikit — akhirnya anda berpusing tepat sekali, sepenuhnya",
          },
          formula: {
            formula: "Jumlah sudut peluaran = 360°, sentiasa",
            legend: [
              {
                label: "→",
                text: "Pedalaman + Peluaran pada bucu SAMA sentiasa = 180° (ia pada garis lurus)",
              },
            ],
          },
          worked: {
            question: "Cari sudut peluaran DAN pedalaman oktagon sekata.",
            steps: [
              {
                calc: "Sudut peluaran = 360° ÷ 8 = 45°",
                why: "Oktagon sekata ada 8 sudut peluaran SAMA berkongsi jumlah tetap 360°.",
              },
              {
                calc: "Sudut pedalaman = 180° − 45° = 135°",
                why: "Pedalaman dan peluaran pada penjuru sama sentiasa berjumlah 180° (ia pada garis lurus).",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Poligon sekata ada sudut pedalaman 144°. Berapa sisi ia ada?",
        answer: "Peluaran = 180−144 = 36°. n = 360÷36 = 10 sisi.",
      },
      mistake: {
        wrong: "Guna (n−2)×180° untuk sudut PELUARAN juga.",
        right:
          "Sudut peluaran SENTIASA berjumlah 360° — formula itu tidak pernah berubah, tidak kira bentuknya.",
      },
      practice: {
        easy: {
          question: "Cari jumlah sudut pedalaman heksagon (n=6).",
          answer: "(6−2)×180° = 720°",
        },
        medium: {
          question: "Cari sudut peluaran oktagon sekata.",
          answer: "360÷8 = 45°",
        },
        hard: {
          question: "ABCDE pentagon sekata. BCF dan EDF garis lurus. Cari x, sudut di F.",
          answer:
            "Sudut pedalaman = 540÷5 = 108°. ∠FCD=180−108=72°, sama untuk ∠FDC. x=180−72−72=36°.",
        },
      },
      realLife: ["🏗️ Reka bentuk kekuda bumbung", "🎨 Jubin dan mozek"],
    },
  ],
  summary: {
    center: "Poligon",
    branches: [
      { title: "Sekata", points: ["Sisi sama DAN sudut sama"] },
      { title: "Jumlah Pedalaman", points: ["(n−2)×180°"] },
      { title: "Jumlah Peluaran", points: ["Sentiasa 360°"] },
    ],
  },
  formulaSheet: [
    { formula: "(n−2)×180°", label: "Jumlah sudut pedalaman" },
    { formula: "360°", label: "Jumlah sudut peluaran, sentiasa" },
    { formula: "Pedalaman + Peluaran = 180°", label: "pada bucu sama" },
    { formula: "n = 360° ÷ sudut peluaran", label: "Cari bilangan sisi" },
  ],
  quickRevision: [
    "Saya boleh kenal pasti poligon sekata dan tak sekata.",
    "Saya boleh cari sudut pedalaman dan peluaran poligon.",
  ],
  examTips: [
    "Peluaran sentiasa berjumlah 360° — nombor itu tidak pernah berubah dengan bentuk.",
    "Cari sisi daripada sudut? Tukar kepada sudut peluaran dahulu, kemudian bahagi 360° dengannya.",
  ],
  challenge: {
    question:
      "Jumlah sudut pedalaman poligon ialah 1440°. Berapa sisi ia ada, dan bentuk apakah itu?",
    answer: "1440÷180=8, jadi n−2=8, n=10 — dekagon.",
  },
};

export const mathF2C4InteractiveContent: { en: MathF2C4Content; bm: MathF2C4Content } = { en, bm };
