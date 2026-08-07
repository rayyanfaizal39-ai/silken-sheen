// Form 1 Mathematics, Chapter 3 — Squares, Square Roots, Cubes and Cube
// Roots / Kuasa Dua, Punca Kuasa Dua, Kuasa Tiga dan Punca Kuasa Tiga
// Interactive bilingual content, ported from
// design-reference/math1-chapter3-squares-cubes-notes-v4.html. The
// perfect-square/cube checker (prime-factorise → group into pairs/triples)
// already lives in src/components/notes/blocks/FactorGroupChecker.tsx and
// is reused as-is, not reimplemented; likewise the isometric cube-stack
// illustration already lives in
// src/components/notes/blocks/IsometricCubeStack.tsx (the corrected
// hexagon-split-into-3-rhombi, depth-sorted construction). Content only —
// no presentation markup (rendered by MathF1Chapter3NotesBlock).
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export interface MathC3SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  /** 3.1 only — 4×4 unit-square area-model illustration. */
  squareGridCaption?: string;
  /** 3.2 only — 2×2×2 isometric unit-cube-stack illustration. */
  cubeStackCaption?: string;
  inverseFormula: { eyebrow: string; formula: string; legend: { label: string; text: string }[] };
  checkDemo: { eyebrow: string; introText: string; n: number; size: 2 | 3; symbol: string };
  worked: { question: string; n: number; size: 2 | 3; symbol: string; extraIntro?: string };
  guided: { question: string; answer: string };
  /** 3.1 only — the mistake note embeds an always-visible grouping check for n=54. */
  mistake: {
    wrong: string;
    right: string;
    groupCheck?: { n: number; size: 2 | 3; symbol: string };
  };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife: string[];
}

export interface MathF1C3Content {
  subtopics: MathC3SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF1C3Content = {
  subtopics: [
    {
      num: "3.1",
      title: "Squares and Square Roots",
      ideaParagraphs: [
        'A square with sides of 4 units has area 4 × 4 = 16 unit². We write 4² = 16 — "the square of 4". Numbers like 1, 4, 9, 16, 25… are perfect squares.',
        "Squaring and square-rooting are opposite operations. If area = 36 unit², then side length — the square root — is 6, written √36 = 6.",
      ],
      squareGridCaption:
        "A 4-by-4 grid of unit squares — the area IS the square of the side length",
      inverseFormula: {
        eyebrow: "Inverse Operations",
        formula: "√(a × a) = a",
        legend: [
          { label: "a²", text: "= a × a" },
          { label: "√a²", text: "= a" },
        ],
      },
      checkDemo: {
        eyebrow: "Checking a Perfect Square",
        introText: "Prime-factorise, then group the factors into identical PAIRS.",
        n: 100,
        size: 2,
        symbol: "√",
      },
      worked: {
        question: "Is 36 a perfect square? Check using prime factorisation.",
        n: 36,
        size: 2,
        symbol: "√",
      },
      guided: {
        question: "Find √81 without a calculator.",
        answer: "81 = 9 × 9 = 9². So √81 = 9.",
      },
      mistake: {
        wrong: 'Guessing 54 is a perfect square because it "feels close" to 49 and 64.',
        right:
          "54 = 2×3×3×3 — can't split into two identical groups, so it's NOT a perfect square.",
        groupCheck: { n: 54, size: 2, symbol: "√" },
      },
      practice: {
        easy: {
          question: "Find (–0.5)² without a calculator.",
          answer: "0.25",
        },
        medium: {
          question: "Find √(27/48) without a calculator.",
          answer: "¾",
        },
        hard: {
          question:
            "A square photo (area 90.25 cm²) sits in the middle of 12 cm cardboard. Gap on each side?",
          answer: "Photo side = 9.5 cm. Leftover = 2.5 cm. Each gap = 1.25 cm.",
        },
      },
      realLife: ["🥋 Sports courts", "🖼️ Framing photos"],
    },
    {
      num: "3.2",
      title: "Cubes and Cube Roots",
      ideaParagraphs: [
        'A cube with sides of 2 units contains 2×2×2 = 8 unit cubes. We write 2³ = 8 — "the cube of 2". Numbers like 1, 8, 27, 64… are perfect cubes.',
        "If volume = 8 unit³, side length — the cube root — is 2, written ∛8 = 2. Unlike squares, cubing a negative number always gives a negative result.",
      ],
      cubeStackCaption:
        "Eight unit cubes make a 2-by-2-by-2 cube — the volume IS the cube of the side length",
      inverseFormula: {
        eyebrow: "Inverse Operations",
        formula: "∛(a × a × a) = a",
        legend: [
          { label: "a³", text: "= a × a × a" },
          { label: "∛a³", text: "= a" },
        ],
      },
      checkDemo: {
        eyebrow: "Checking a Perfect Cube",
        introText: "Prime-factorise, then group the factors into identical TRIPLES.",
        n: 216,
        size: 3,
        symbol: "∛",
      },
      worked: {
        question:
          "A sculptor carves a small cube from a 6 cm wooden block. Remaining wood: 189 cm³. Find the small cube's side length.",
        n: 27,
        size: 3,
        symbol: "∛",
        extraIntro:
          "Block volume = 6³ = 216 cm³. Small cube volume = 216 − 189 = 27 cm³. Now find ∛27:",
      },
      guided: {
        question: "Find ∛216 without a calculator.",
        answer: "216 = 6×6×6 = 6³. So ∛216 = 6.",
      },
      mistake: {
        wrong: "Writing 2³ = 2 × 3 = 6.",
        right: "2³ = 2 × 2 × 2 = 8 — the base multiplied by ITSELF, 3 times.",
      },
      practice: {
        easy: {
          question: "Find (–0.3)³ without a calculator.",
          answer: "–0.027",
        },
        medium: {
          question: "Find ∛(–81/192) without a calculator.",
          answer: "–¾",
        },
        hard: {
          question: "A cubic box has faces of 2,500 mm². (a) Side length? (b) Volume?",
          answer: "(a) 50 mm. (b) 125,000 mm³",
        },
      },
      realLife: ["🧊 Salt crystals", "📦 Box design"],
    },
  ],
  summary: {
    center: "Squares, Roots, Cubes",
    branches: [
      { title: "Squares", points: ["a² = a×a, √(a²)=a"] },
      { title: "Cubes", points: ["a³ = a×a×a, ∛(a³)=a"] },
      { title: "Checking", points: ["2 groups (square) or 3 groups (cube)"] },
    ],
  },
  formulaSheet: [
    { formula: "a² = a × a", label: "Square" },
    { formula: "√(a²) = a", label: "Square root" },
    { formula: "a³ = a × a × a", label: "Cube" },
    { formula: "∛(a³) = a", label: "Cube root" },
  ],
  quickRevision: [
    "I can find squares, square roots, cubes and cube roots.",
    "I can check perfect squares/cubes using prime factorisation.",
    "I can solve real-life problems involving squares and cubes.",
  ],
  examTips: [
    "To estimate a square root, find the two nearest perfect squares and take their roots.",
    "Memorise perfect squares to 15² and perfect cubes to 5³ for faster mental estimation.",
  ],
  challenge: {
    question:
      "5 = 1+4 (1²+2²) and 5² = 25 = 9+16 (3²+4²). Find one other number with both properties.",
    answer: "Try 10: 10=1+9 (1²+3²). 10²=100=36+64 (6²+8²). Both check out!",
  },
};

const bm: MathF1C3Content = {
  subtopics: [
    {
      num: "3.1",
      title: "Kuasa Dua dan Punca Kuasa Dua",
      ideaParagraphs: [
        'Segi empat sama bersisi 4 unit mempunyai luas 4 × 4 = 16 unit². Kita tulis 4² = 16 — "kuasa dua bagi 4". Nombor seperti 1, 4, 9, 16, 25… ialah kuasa dua sempurna.',
        "Menguasaduakan dan mencari punca kuasa dua adalah operasi bertentangan. Jika luas = 36 unit², maka panjang sisi — punca kuasa dua — ialah 6, ditulis √36 = 6.",
      ],
      squareGridCaption:
        "Grid 4 kali 4 unit segi empat sama — luas ADALAH kuasa dua bagi panjang sisi",
      inverseFormula: {
        eyebrow: "Operasi Songsang",
        formula: "√(a × a) = a",
        legend: [
          { label: "a²", text: "= a × a" },
          { label: "√a²", text: "= a" },
        ],
      },
      checkDemo: {
        eyebrow: "Menyemak Kuasa Dua Sempurna",
        introText: "Pemfaktoran perdana, kemudian kumpulkan faktor kepada PASANGAN yang sama.",
        n: 100,
        size: 2,
        symbol: "√",
      },
      worked: {
        question: "Adakah 36 kuasa dua sempurna? Semak dengan pemfaktoran perdana.",
        n: 36,
        size: 2,
        symbol: "√",
      },
      guided: {
        question: "Cari √81 tanpa kalkulator.",
        answer: "81 = 9 × 9 = 9². Jadi √81 = 9.",
      },
      mistake: {
        wrong: 'Meneka 54 kuasa dua sempurna kerana "rasa dekat" dengan 49 dan 64.',
        right: "54 = 2×3×3×3 — tidak boleh pecah dua kumpulan sama, jadi BUKAN kuasa dua sempurna.",
        groupCheck: { n: 54, size: 2, symbol: "√" },
      },
      practice: {
        easy: {
          question: "Cari (–0.5)² tanpa kalkulator.",
          answer: "0.25",
        },
        medium: {
          question: "Cari √(27/48) tanpa kalkulator.",
          answer: "¾",
        },
        hard: {
          question:
            "Foto segi empat sama (luas 90.25 cm²) di tengah kadbod 12 cm. Jarak setiap sisi?",
          answer: "Sisi foto = 9.5 cm. Baki = 2.5 cm. Setiap jarak = 1.25 cm.",
        },
      },
      realLife: ["🥋 Gelanggang sukan", "🖼️ Membingkai foto"],
    },
    {
      num: "3.2",
      title: "Kuasa Tiga dan Punca Kuasa Tiga",
      ideaParagraphs: [
        'Kubus bersisi 2 unit mengandungi 2×2×2 = 8 unit kubus. Kita tulis 2³ = 8 — "kuasa tiga bagi 2". Nombor seperti 1, 8, 27, 64… ialah kuasa tiga sempurna.',
        "Jika isi padu = 8 unit³, panjang sisi — punca kuasa tiga — ialah 2, ditulis ∛8 = 2. Berbeza dengan kuasa dua, menguasatigakan nombor negatif sentiasa memberi hasil negatif.",
      ],
      cubeStackCaption:
        "Lapan unit kubus membentuk kubus 2×2×2 — isi padu ADALAH kuasa tiga bagi panjang sisi",
      inverseFormula: {
        eyebrow: "Operasi Songsang",
        formula: "∛(a × a × a) = a",
        legend: [
          { label: "a³", text: "= a × a × a" },
          { label: "∛a³", text: "= a" },
        ],
      },
      checkDemo: {
        eyebrow: "Menyemak Kuasa Tiga Sempurna",
        introText: "Pemfaktoran perdana, kemudian kumpulkan faktor kepada TIGA yang sama.",
        n: 216,
        size: 3,
        symbol: "∛",
      },
      worked: {
        question:
          "Pengukir mengukir kubus kecil daripada blok kayu 6 cm. Baki kayu: 189 cm³. Cari panjang sisi kubus kecil.",
        n: 27,
        size: 3,
        symbol: "∛",
        extraIntro:
          "Isi padu blok = 6³ = 216 cm³. Isi padu kubus kecil = 216 − 189 = 27 cm³. Kini cari ∛27:",
      },
      guided: {
        question: "Cari ∛216 tanpa kalkulator.",
        answer: "216 = 6×6×6 = 6³. Jadi ∛216 = 6.",
      },
      mistake: {
        wrong: "Menulis 2³ = 2 × 3 = 6.",
        right: "2³ = 2 × 2 × 2 = 8 — asas didarab dengan DIRINYA, 3 kali.",
      },
      practice: {
        easy: {
          question: "Cari (–0.3)³ tanpa kalkulator.",
          answer: "–0.027",
        },
        medium: {
          question: "Cari ∛(–81/192) tanpa kalkulator.",
          answer: "–¾",
        },
        hard: {
          question: "Kotak kubus bermuka 2,500 mm². (a) Panjang sisi? (b) Isi padu?",
          answer: "(a) 50 mm. (b) 125,000 mm³",
        },
      },
      realLife: ["🧊 Kristal garam", "📦 Reka bentuk kotak"],
    },
  ],
  summary: {
    center: "Kuasa Dua, Punca, Kuasa Tiga",
    branches: [
      { title: "Kuasa Dua", points: ["a² = a×a, √(a²)=a"] },
      { title: "Kuasa Tiga", points: ["a³ = a×a×a, ∛(a³)=a"] },
      { title: "Menyemak", points: ["2 kumpulan (kuasa dua) atau 3 (kuasa tiga)"] },
    ],
  },
  formulaSheet: [
    { formula: "a² = a × a", label: "Kuasa Dua" },
    { formula: "√(a²) = a", label: "Punca Kuasa Dua" },
    { formula: "a³ = a × a × a", label: "Kuasa Tiga" },
    { formula: "∛(a³) = a", label: "Punca Kuasa Tiga" },
  ],
  quickRevision: [
    "Saya boleh mencari kuasa dua, punca kuasa dua, kuasa tiga dan punca kuasa tiga.",
    "Saya boleh semak kuasa dua/tiga sempurna guna pemfaktoran perdana.",
    "Saya boleh menyelesaikan masalah kehidupan sebenar melibatkan kuasa dua dan tiga.",
  ],
  examTips: [
    "Untuk anggar punca kuasa dua, cari dua kuasa dua sempurna terdekat dan ambil puncanya.",
    "Hafal kuasa dua sempurna hingga 15² dan kuasa tiga sempurna hingga 5³ untuk anggaran lebih pantas.",
  ],
  challenge: {
    question:
      "5 = 1+4 (1²+2²) dan 5² = 25 = 9+16 (3²+4²). Cari satu lagi nombor dengan kedua-dua sifat.",
    answer: "Cuba 10: 10=1+9 (1²+3²). 10²=100=36+64 (6²+8²). Kedua-dua berjaya!",
  },
};

export const mathF1C3InteractiveContent: { en: MathF1C3Content; bm: MathF1C3Content } = { en, bm };
