// Form 1 Mathematics, Chapter 10 — Perimeter and Area / Perimeter dan Luas
// Interactive bilingual content, ported from
// design-reference/math1-chapter10-perimeter-area-notes-v6.html
// (perimeter/area/relationship worked examples spot-verified against the
// mockup's actual figures). Content only — no presentation markup (rendered
// by MathF1Chapter10NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

/** Discriminated union covering every perimeter/area diagram variant used across Chapter 10's questions. */
export type MathC10Diagram =
  | {
      kind: "rectanglePerim";
      lenLabel: string;
      widLabel: string;
      unknownSide?: "len" | "wid" | null;
    }
  | { kind: "lShapePerim" }
  | { kind: "overlapSquares"; l1: string; l2: string }
  | { kind: "landPlot"; givenAwayLabel: string }
  | { kind: "triangleArea"; baseLabel: string; heightLabel: string }
  | { kind: "parallelogramArea"; baseLabel: string; heightLabel: string }
  | { kind: "kiteArea"; d1Label: string; d2Label: string }
  | { kind: "triangleInRect"; widthLabel: string; lengthLabel: string }
  | { kind: "squareArea"; areaLabel: string; sideLabel: string }
  | {
      kind: "twoRectCompare";
      w1: number;
      h1: number;
      l1: string;
      w2: number;
      h2: number;
      l2: string;
    };

export interface MathC10PracticeItem {
  question: string;
  answer: string;
  diagram?: MathC10Diagram;
}

export interface MathC10SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  /** 10.2 only — inline formula-sheet grid of the four area types, shown before the diagram grid. */
  areaTypesSheet?: FormulaSheetEntry[];
  /** 10.2 only — the 2×2 grid of area-formula diagrams, embedded in the lesson intro. */
  introDiagram?: {
    kind: "areaFormulaGrid";
    titles: { triangle: string; parallelogram: string; kite: string; trapezium: string };
    subLabels: { base: string; height: string; d1: string; d2: string; a: string; b: string };
    caption: string;
  };
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; diagram?: MathC10Diagram; steps: WorkedStep[] };
  guided: { question: string; diagram?: MathC10Diagram; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, MathC10PracticeItem>;
  realLife: string[];
}

export interface MathF1C10Content {
  subtopics: MathC10SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF1C10Content = {
  subtopics: [
    {
      num: "10.1",
      title: "Perimeter",
      ideaParagraphs: [
        "Perimeter is the total length around an enclosed shape — add up every side. For composite shapes, missing side lengths can often be found from the sides you already know, since opposite sides of a rectangle-based shape must match up.",
      ],
      formula: { eyebrow: "Perimeter = Sum of All Sides", formula: "P = a + b + c + d + …" },
      worked: {
        question:
          "An L-shaped figure has sides 9 cm, 4 cm, 3 cm, 4 cm, 6 cm known — the last side VW is missing, but VW = PQ + RS + TU. Find the perimeter.",
        diagram: { kind: "lShapePerim" },
        steps: [
          {
            calc: "VW = PQ + RS + TU = 4 + 4 + 4 = 12 cm",
            why: 'The missing side equals the sum of the opposite "step" sides.',
          },
          {
            calc: "Perimeter = 4+3+4+3+4+9+12+9",
            why: "Add every side of the shape, including the one just found.",
          },
          { calc: "= 48 cm", why: "Sum them all up." },
        ],
      },
      guided: {
        question:
          "The perimeter of a rectangular laboratory is 64 m. If the length is 23 m, find the width.",
        diagram: { kind: "rectanglePerim", lenLabel: "23 m", widLabel: "?", unknownSide: "wid" },
        answer: "P = 2(l+w). 64 = 2(23+w). 32 = 23+w. w = 9 m.",
      },
      mistake: {
        wrong:
          "Forgetting to find MISSING side lengths in an L- or staircase-shaped figure before adding everything up.",
        right:
          'In rectangular composite shapes, opposite "steps" must add up equally — use this to recover any missing side before summing.',
      },
      practice: {
        easy: {
          question: "Find the perimeter of a rectangle 20 cm long and 6 cm wide.",
          diagram: {
            kind: "rectanglePerim",
            lenLabel: "20 cm",
            widLabel: "6 cm",
            unknownSide: null,
          },
          answer: "P = 2(20+6) = 52 cm",
        },
        medium: {
          question:
            "Two squares of side 8 cm and 2 cm overlap slightly. Calculate the perimeter of the whole diagram.",
          diagram: { kind: "overlapSquares", l1: "8 cm", l2: "2 cm" },
          answer:
            "Add up all outer edges of the combined shape, accounting for the overlap region shared between the two squares.",
        },
        hard: {
          question:
            "A rectangular land PQTV is split by triangle PQR and rectangle STUW, given to Mr Rhuben's brother. Fencing costs RM50/m. Find the fencing cost for the remaining land.",
          diagram: { kind: "landPlot", givenAwayLabel: "given away" },
          answer:
            "Find the missing side lengths from the given dimensions first, sum the perimeter of the remaining fenced region, then multiply by RM50.",
        },
      },
      realLife: ["🚧 Fencing costs", "🖼️ Picture framing"],
    },
    {
      num: "10.2",
      title: "Area of Triangles, Parallelograms, Kites and Trapeziums",
      ideaParagraphs: [
        "Every area formula in this chapter is derived from the rectangle. A triangle is exactly HALF of a rectangle with the same base and height. A parallelogram has the SAME area as a rectangle with the same base and height. A kite's area is half the product of its diagonals — because it fits inside a rectangle built from those diagonals.",
      ],
      areaTypesSheet: [
        { formula: "Triangle", label: "½ × base × height" },
        { formula: "Parallelogram", label: "base × height" },
        { formula: "Kite", label: "½ × d₁ × d₂" },
        { formula: "Trapezium", label: "½ × (a+b) × height" },
      ],
      introDiagram: {
        kind: "areaFormulaGrid",
        titles: {
          triangle: "Triangle",
          parallelogram: "Parallelogram",
          kite: "Kite",
          trapezium: "Trapezium",
        },
        subLabels: { base: "base", height: "height", d1: "d₁", d2: "d₂", a: "a", b: "b" },
        caption: "The dashed line is always the PERPENDICULAR height — never a slanted side",
      },
      worked: {
        question:
          "A rectangular plot PRTV contains a triangular banana patch PQW (base 4m, height 5m) and a trapezium-shaped rambutan patch UTSX (parallel sides 3m and 4m, height 5m). The plot is 16m by 10m. Find the area used for papaya (the remaining region).",
        diagram: { kind: "triangleArea", baseLabel: "4 m", heightLabel: "5 m" },
        steps: [
          { calc: "Area of PRTV = 16 × 10 = 160 m²", why: "The whole rectangular plot's area." },
          { calc: "Area of PQW = ½ × 4 × 5 = 10 m²", why: "The triangular banana patch's area." },
          {
            calc: "Area of UTSX = ½ × (3+4) × 5 = 17.5 m²",
            why: "The trapezium rambutan patch's area.",
          },
          {
            calc: "Papaya area = 160 − 10 − 17.5 = 132.5 m²",
            why: "Subtract both patches from the whole plot to find the remaining area.",
          },
        ],
      },
      guided: {
        question:
          "Find the area of a kite with diagonals 5 cm and 4 cm (where each diagonal is split as 3+2 and 2+2).",
        diagram: { kind: "kiteArea", d1Label: "5 cm", d2Label: "4 cm" },
        answer: "Area = ½ × 5 × 4 = 10 cm².",
      },
      mistake: {
        wrong: 'Using a triangle\'s SLANTED side length as its "height" in the area formula.',
        right:
          "The height must be PERPENDICULAR to the base — a right angle between them, not just any side.",
      },
      practice: {
        easy: {
          question: "Find the area of a triangle with base 5 cm and height 4 cm.",
          diagram: { kind: "triangleArea", baseLabel: "5 cm", heightLabel: "4 cm" },
          answer: "½ × 5 × 4 = 10 cm²",
        },
        medium: {
          question: "Find the area of a parallelogram with base 6.2 cm and height 3 cm.",
          diagram: { kind: "parallelogramArea", baseLabel: "6.2 cm", heightLabel: "3 cm" },
          answer: "6.2 × 3 = 18.6 cm²",
        },
        hard: {
          question:
            "VSR is a straight line and PSUV is a kite (diagonals split into segments 3.5+3.5 and 7+7). Calculate the area of the whole diagram.",
          diagram: { kind: "kiteArea", d1Label: "7 cm", d2Label: "7 cm" },
          answer:
            "Split the whole diagram into the kite plus any additional triangle(s) outside it, apply the kite formula and triangle formula separately, then add.",
        },
      },
      realLife: ["🌾 Farming plot planning", "🪁 Kite-making"],
    },
    {
      num: "10.3",
      title: "Relationship between Perimeter and Area",
      ideaParagraphs: [
        "For a FIXED perimeter, a rectangle's area is LARGEST when it's a square (length = width). For a FIXED area, a rectangle's perimeter is SMALLEST when it's a square. In both cases, the further the shape stretches away from a square, the more \"wasted\" its perimeter or area becomes.",
      ],
      formula: {
        eyebrow: "The Square Rule",
        formula: "Fixed Perimeter → Max Area at Square",
        legend: [{ label: "", text: "Fixed Area → Min Perimeter at Square" }],
      },
      worked: {
        question:
          "A triangle PQS is inscribed in rectangle PQRT. The perimeter of the rectangle is 42 cm and its length is twice its width. Find the area of triangle PQS.",
        diagram: { kind: "triangleInRect", widthLabel: "14 cm", lengthLabel: "7 cm" },
        steps: [
          {
            calc: "2x + 2y = 42, and y = 2x",
            why: "Set width=x, length=y=2x (length is twice width), and use the perimeter formula.",
          },
          { calc: "2x + 2(2x) = 42 → 6x = 42 → x = 7", why: "Substitute y=2x and solve for x." },
          { calc: "y = 2(7) = 14", why: "Find the length." },
          {
            calc: "Area of △PQS = ½ × 14 × 7 = 49 cm²",
            why: "The triangle's base and height match the rectangle's length and width.",
          },
        ],
      },
      guided: {
        question: "The area of a square garden is 500 m². Find its perimeter.",
        diagram: { kind: "squareArea", areaLabel: "500 m²", sideLabel: "? m" },
        answer: "x²=500. x=√500≈22.36 m. Perimeter = 4×22.36 = 89.44 m.",
      },
      mistake: {
        wrong: "Assuming a bigger perimeter always means a bigger area (or vice versa).",
        right:
          "Perimeter and area are INDEPENDENT — a long thin rectangle can have a huge perimeter but tiny area.",
      },
      practice: {
        easy: {
          question:
            "A rectangle has a fixed perimeter. Which shape has the largest area: a 1×9 rectangle or a 5×5 square (both perimeter 20)?",
          diagram: { kind: "twoRectCompare", w1: 60, h1: 8, l1: "1×9", w2: 50, h2: 50, l2: "5×5" },
          answer: "The 5×5 square: area 25, vs the 1×9 rectangle: area 9. The square wins.",
        },
        medium: {
          question:
            "The length of a rectangle is 5 cm more than its width. If the perimeter is 40 cm, find the area.",
          diagram: { kind: "rectanglePerim", lenLabel: "w+5", widLabel: "w", unknownSide: null },
          answer: "2(w+5)+2w=40 → 4w+10=40 → w=7.5. Length=12.5. Area=7.5×12.5=93.75 cm².",
        },
        hard: {
          question:
            "PQTU is a parallelogram with perimeter 24 cm and area 28 cm². UTS and PQR are straight lines with QR=3cm and PU... find the area of the whole diagram.",
          diagram: { kind: "parallelogramArea", baseLabel: "base", heightLabel: "height" },
          answer:
            "Use the parallelogram's given perimeter and area to find its side/height, then add the area of the extra triangle formed by the straight lines.",
        },
      },
      realLife: ["🐄 Maximizing a fenced enclosure", "🏙️ Housing project planning"],
    },
  ],
  summary: {
    center: "Perimeter and Area",
    branches: [
      { title: "Perimeter", points: ["Sum of all sides"] },
      { title: "Area", points: ["All derived from the rectangle"] },
      { title: "Relationship", points: ["Square = max area / min perimeter"] },
    ],
  },
  formulaSheet: [
    { formula: "Triangle", label: "½ × base × height" },
    { formula: "Parallelogram", label: "base × height" },
    { formula: "Kite", label: "½ × d₁ × d₂" },
    { formula: "Trapezium", label: "½ × (a+b) × height" },
  ],
  quickRevision: [
    "I can find the perimeter of various and composite shapes.",
    "I can find the area of triangles, parallelograms, kites and trapeziums.",
    "I understand the relationship between perimeter and area.",
  ],
  examTips: [
    'Always double-check that "height" in your formula is the PERPENDICULAR distance to the base, not a slanted side.',
    "For composite shapes, split into simple shapes (rectangle, triangle, trapezium) you already know the formula for.",
  ],
  challenge: {
    question:
      "A rectangular tile PQRS (perimeter 120 cm) has a kite TUVW inscribed in it, with one diagonal 28 cm and part of the other 12 cm. Find the area of TUVW.",
    answer:
      "Use the rectangle's perimeter to find its full dimensions, identify both diagonal lengths of the kite from the rectangle's sides, then apply the kite area formula ½×d₁×d₂.",
  },
};

const bm: MathF1C10Content = {
  subtopics: [
    {
      num: "10.1",
      title: "Perimeter",
      ideaParagraphs: [
        "Perimeter ialah jumlah panjang sekeliling bentuk tertutup — tambah setiap sisi. Bagi bentuk gubahan, panjang sisi hilang selalunya boleh dicari daripada sisi yang telah diketahui, kerana sisi bertentangan bentuk berasaskan segi empat tepat mesti sepadan.",
      ],
      formula: { eyebrow: "Perimeter = Jumlah Semua Sisi", formula: "P = a + b + c + d + …" },
      worked: {
        question:
          "Bentuk berbentuk L mempunyai sisi 9 cm, 4 cm, 3 cm, 4 cm, 6 cm diketahui — sisi terakhir VW hilang, tetapi VW = PQ + RS + TU. Cari perimeter.",
        diagram: { kind: "lShapePerim" },
        steps: [
          {
            calc: "VW = PQ + RS + TU = 4 + 4 + 4 = 12 cm",
            why: 'Sisi hilang bersamaan jumlah sisi "tangga" bertentangan.',
          },
          {
            calc: "Perimeter = 4+3+4+3+4+9+12+9",
            why: "Tambah setiap sisi bentuk, termasuk yang baru dijumpai.",
          },
          { calc: "= 48 cm", why: "Jumlahkan semuanya." },
        ],
      },
      guided: {
        question:
          "Perimeter makmal segi empat tepat ialah 64 m. Jika panjangnya 23 m, cari lebarnya.",
        diagram: { kind: "rectanglePerim", lenLabel: "23 m", widLabel: "?", unknownSide: "wid" },
        answer: "P = 2(p+l). 64 = 2(23+l). 32 = 23+l. l = 9 m.",
      },
      mistake: {
        wrong:
          "Terlupa cari panjang sisi HILANG dalam bentuk berbentuk L atau tangga sebelum menambah semuanya.",
        right:
          'Dalam bentuk gubahan segi empat tepat, "tangga" bertentangan mesti berjumlah sama — guna ini untuk dapatkan sisi hilang sebelum menjumlahkan.',
      },
      practice: {
        easy: {
          question: "Cari perimeter segi empat tepat panjang 20 cm dan lebar 6 cm.",
          diagram: {
            kind: "rectanglePerim",
            lenLabel: "20 cm",
            widLabel: "6 cm",
            unknownSide: null,
          },
          answer: "P = 2(20+6) = 52 cm",
        },
        medium: {
          question:
            "Dua segi empat sama bersisi 8 cm dan 2 cm bertindih sedikit. Kira perimeter keseluruhan gambar rajah.",
          diagram: { kind: "overlapSquares", l1: "8 cm", l2: "2 cm" },
          answer:
            "Tambah semua tepi luar bentuk gabungan, ambil kira kawasan bertindih dikongsi dua segi empat sama.",
        },
        hard: {
          question:
            "Tanah segi empat tepat PQTV dipecah oleh segi tiga PQR dan segi empat tepat STUW, diberi kepada abang En. Rhuben. Kos pagar RM50/m. Cari kos pagar tanah berbaki.",
          diagram: { kind: "landPlot", givenAwayLabel: "diberi kepada" },
          answer:
            "Cari panjang sisi hilang daripada dimensi diberi dahulu, jumlahkan perimeter kawasan berbaki, kemudian darab dengan RM50.",
        },
      },
      realLife: ["🚧 Kos pagar", "🖼️ Membingkai gambar"],
    },
    {
      num: "10.2",
      title: "Luas Segi Tiga, Segi Empat Selari, Lelayang dan Trapezium",
      ideaParagraphs: [
        "Setiap formula luas dalam bab ini diperoleh daripada segi empat tepat. Segi tiga adalah tepat SEPARUH segi empat tepat dengan tapak dan tinggi sama. Segi empat selari mempunyai luas SAMA dengan segi empat tepat bertapak dan tinggi sama. Luas lelayang ialah separuh hasil darab pepenjurunya — kerana ia muat dalam segi empat tepat dibina daripada pepenjuru itu.",
      ],
      areaTypesSheet: [
        { formula: "Segi Tiga", label: "½ × tapak × tinggi" },
        { formula: "Segi Empat Selari", label: "tapak × tinggi" },
        { formula: "Lelayang", label: "½ × d₁ × d₂" },
        { formula: "Trapezium", label: "½ × (a+b) × tinggi" },
      ],
      introDiagram: {
        kind: "areaFormulaGrid",
        titles: {
          triangle: "Segi Tiga",
          parallelogram: "Segi Empat Selari",
          kite: "Lelayang",
          trapezium: "Trapezium",
        },
        subLabels: { base: "tapak", height: "tinggi", d1: "d₁", d2: "d₂", a: "a", b: "b" },
        caption: "Garis putus-putus sentiasa tinggi SERENJANG — bukan sisi condong",
      },
      worked: {
        question:
          "Plot segi empat tepat PRTV mengandungi kebun pisang segi tiga PQW (tapak 4m, tinggi 5m) dan kebun rambutan trapezium UTSX (sisi selari 3m dan 4m, tinggi 5m). Plot 16m × 10m. Cari luas untuk betik (kawasan berbaki).",
        diagram: { kind: "triangleArea", baseLabel: "4 m", heightLabel: "5 m" },
        steps: [
          { calc: "Luas PRTV = 16 × 10 = 160 m²", why: "Luas keseluruhan plot segi empat tepat." },
          { calc: "Luas PQW = ½ × 4 × 5 = 10 m²", why: "Luas kebun pisang segi tiga." },
          { calc: "Luas UTSX = ½ × (3+4) × 5 = 17.5 m²", why: "Luas kebun rambutan trapezium." },
          {
            calc: "Luas betik = 160 − 10 − 17.5 = 132.5 m²",
            why: "Tolak kedua-dua kebun daripada keseluruhan plot untuk cari luas berbaki.",
          },
        ],
      },
      guided: {
        question:
          "Cari luas lelayang dengan pepenjuru 5 cm dan 4 cm (setiap pepenjuru terbahagi 3+2 dan 2+2).",
        diagram: { kind: "kiteArea", d1Label: "5 cm", d2Label: "4 cm" },
        answer: "Luas = ½ × 5 × 4 = 10 cm².",
      },
      mistake: {
        wrong: 'Guna panjang sisi CONDONG segi tiga sebagai "tinggi" dalam formula luas.',
        right:
          "Tinggi mesti SERENJANG dengan tapak — sudut tegak antara mereka, bukan sebarang sisi.",
      },
      practice: {
        easy: {
          question: "Cari luas segi tiga bertapak 5 cm dan tinggi 4 cm.",
          diagram: { kind: "triangleArea", baseLabel: "5 cm", heightLabel: "4 cm" },
          answer: "½ × 5 × 4 = 10 cm²",
        },
        medium: {
          question: "Cari luas segi empat selari bertapak 6.2 cm dan tinggi 3 cm.",
          diagram: { kind: "parallelogramArea", baseLabel: "6.2 cm", heightLabel: "3 cm" },
          answer: "6.2 × 3 = 18.6 cm²",
        },
        hard: {
          question:
            "VSR garis lurus dan PSUV lelayang (pepenjuru terbahagi 3.5+3.5 dan 7+7). Kira luas keseluruhan gambar rajah.",
          diagram: { kind: "kiteArea", d1Label: "7 cm", d2Label: "7 cm" },
          answer:
            "Pecahkan keseluruhan gambar rajah kepada lelayang tambah segi tiga tambahan di luarnya, guna formula lelayang dan segi tiga berasingan, kemudian tambah.",
        },
      },
      realLife: ["🌾 Perancangan plot pertanian", "🪁 Membuat layang-layang"],
    },
    {
      num: "10.3",
      title: "Perhubungan antara Perimeter dan Luas",
      ideaParagraphs: [
        'Untuk perimeter TETAP, luas segi empat tepat adalah TERBESAR apabila ia segi empat sama (panjang = lebar). Untuk luas TETAP, perimeter segi empat tepat adalah TERKECIL apabila ia segi empat sama. Dalam kedua-dua kes, semakin bentuk meregang jauh daripada segi empat sama, semakin "terbazir" perimeter atau luasnya.',
      ],
      formula: {
        eyebrow: "Peraturan Segi Empat Sama",
        formula: "Perimeter Tetap → Luas Maks pada Segi Empat Sama",
        legend: [{ label: "", text: "Luas Tetap → Perimeter Min pada Segi Empat Sama" }],
      },
      worked: {
        question:
          "Segi tiga PQS terkandung dalam segi empat tepat PQRT. Perimeter segi empat tepat ialah 42 cm dan panjangnya dua kali lebarnya. Cari luas segi tiga PQS.",
        diagram: { kind: "triangleInRect", widthLabel: "14 cm", lengthLabel: "7 cm" },
        steps: [
          {
            calc: "2x + 2y = 42, dan y = 2x",
            why: "Tetapkan lebar=x, panjang=y=2x (panjang dua kali lebar), guna formula perimeter.",
          },
          { calc: "2x + 2(2x) = 42 → 6x = 42 → x = 7", why: "Gantikan y=2x dan selesaikan x." },
          { calc: "y = 2(7) = 14", why: "Cari panjang." },
          {
            calc: "Luas △PQS = ½ × 14 × 7 = 49 cm²",
            why: "Tapak dan tinggi segi tiga sepadan dengan panjang dan lebar segi empat tepat.",
          },
        ],
      },
      guided: {
        question: "Luas taman segi empat sama ialah 500 m². Cari perimeternya.",
        diagram: { kind: "squareArea", areaLabel: "500 m²", sideLabel: "? m" },
        answer: "x²=500. x=√500≈22.36 m. Perimeter = 4×22.36 = 89.44 m.",
      },
      mistake: {
        wrong:
          "Menganggap perimeter lebih besar sentiasa bermaksud luas lebih besar (atau sebaliknya).",
        right:
          "Perimeter dan luas adalah BEBAS — segi empat tepat panjang nipis boleh mempunyai perimeter besar tetapi luas kecil.",
      },
      practice: {
        easy: {
          question:
            "Segi empat tepat mempunyai perimeter tetap. Bentuk manakah luas terbesar: 1×9 segi empat tepat atau 5×5 segi empat sama (kedua-dua perimeter 20)?",
          diagram: { kind: "twoRectCompare", w1: 60, h1: 8, l1: "1×9", w2: 50, h2: 50, l2: "5×5" },
          answer:
            "Segi empat sama 5×5: luas 25, lwn segi empat tepat 1×9: luas 9. Segi empat sama menang.",
        },
        medium: {
          question:
            "Panjang segi empat tepat 5 cm lebih daripada lebarnya. Jika perimeter 40 cm, cari luas.",
          diagram: { kind: "rectanglePerim", lenLabel: "l+5", widLabel: "l", unknownSide: null },
          answer: "2(l+5)+2l=40 → 4l+10=40 → l=7.5. Panjang=12.5. Luas=7.5×12.5=93.75 cm².",
        },
        hard: {
          question:
            "PQTU segi empat selari dengan perimeter 24 cm dan luas 28 cm². UTS dan PQR garis lurus. Cari luas keseluruhan gambar rajah.",
          diagram: { kind: "parallelogramArea", baseLabel: "tapak", heightLabel: "tinggi" },
          answer:
            "Guna perimeter dan luas segi empat selari diberi untuk cari sisi/tingginya, kemudian tambah luas segi tiga tambahan dibentuk oleh garis lurus.",
        },
      },
      realLife: ["🐄 Memaksimumkan kawasan berpagar", "🏙️ Perancangan projek perumahan"],
    },
  ],
  summary: {
    center: "Perimeter dan Luas",
    branches: [
      { title: "Perimeter", points: ["Jumlah semua sisi"] },
      { title: "Luas", points: ["Semua diperoleh daripada segi empat tepat"] },
      { title: "Perhubungan", points: ["Segi empat sama = luas maks / perimeter min"] },
    ],
  },
  formulaSheet: [
    { formula: "Segi Tiga", label: "½ × tapak × tinggi" },
    { formula: "Segi Empat Selari", label: "tapak × tinggi" },
    { formula: "Lelayang", label: "½ × d₁ × d₂" },
    { formula: "Trapezium", label: "½ × (a+b) × tinggi" },
  ],
  quickRevision: [
    "Saya boleh cari perimeter pelbagai bentuk dan bentuk gubahan.",
    "Saya boleh cari luas segi tiga, segi empat selari, lelayang dan trapezium.",
    "Saya faham perhubungan antara perimeter dan luas.",
  ],
  examTips: [
    'Sentiasa semak semula "tinggi" dalam formula anda ialah jarak SERENJANG ke tapak, bukan sisi condong.',
    "Untuk bentuk gubahan, pecahkan kepada bentuk mudah (segi empat tepat, segi tiga, trapezium) yang anda sudah tahu formulanya.",
  ],
  challenge: {
    question:
      "Jubin segi empat tepat PQRS (perimeter 120 cm) mempunyai lelayang TUVW terkandung, dengan satu pepenjuru 28 cm dan sebahagian pepenjuru lain 12 cm. Cari luas TUVW.",
    answer:
      "Guna perimeter segi empat tepat untuk cari dimensi penuhnya, kenal pasti kedua-dua panjang pepenjuru lelayang daripada sisi segi empat tepat, kemudian guna formula luas lelayang ½×d₁×d₂.",
  },
};

export const mathF1C10InteractiveContent: { en: MathF1C10Content; bm: MathF1C10Content } = {
  en,
  bm,
};
