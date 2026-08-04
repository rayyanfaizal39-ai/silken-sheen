// Form 1 Mathematics, Chapter 13 — Pythagoras' Theorem / Teorem Pythagoras
// Interactive bilingual content, ported from
// design-reference/math1-chapter13-pythagoras-theorem-notes-v5.html (content
// spot-verified: ladder problem 4.5²+6²=56.25→7.5m, and the 24-7-25
// right-angle check 625=625). Content only — no presentation markup
// (rendered by MathF1Chapter13NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

/** Label props matching RightTriangleDiagram — base/vert/hyp label strings, optional highlighted unknown side. */
export interface MathC13Triangle {
  base: string;
  vert: string;
  hyp: string;
  unknownSide?: "base" | "vert" | "hyp" | null;
}

export interface MathC13PracticeItem {
  question: string;
  answer: string;
  triangle?: MathC13Triangle;
}

export interface MathC13SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  /** 13.1 — static squares-on-the-legs illustration. 13.2 — the right-angle checker for [24,7,25]. */
  introDiagram:
    | { kind: "pythagSquares"; caption: string }
    | { kind: "rightAngleCheck"; sides: [number, number, number] };
  formula: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; triangle?: MathC13Triangle; steps: WorkedStep[] };
  guided: { question: string; triangle?: MathC13Triangle; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, MathC13PracticeItem>;
  realLife: string[];
}

export interface MathF1C13Content {
  subtopics: MathC13SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; triangle?: MathC13Triangle; answer: string };
}

const en: MathF1C13Content = {
  subtopics: [
    {
      num: "13.1",
      title: "The Pythagoras' Theorem",
      ideaParagraphs: [
        "In any right-angled triangle, the longest side — always the one OPPOSITE the right angle — is the hypotenuse. The Pythagoras' theorem says: the area of the square built on the hypotenuse equals the sum of the areas of the squares built on the other two sides.",
      ],
      introDiagram: {
        kind: "pythagSquares",
        caption:
          "c is opposite the right angle (marked by the small square) — always the longest side, the hypotenuse",
      },
      formula: {
        eyebrow: "The Pythagoras' Theorem",
        formula: "c² = a² + b²",
        legend: [
          { label: "c", text: "= hypotenuse (opposite the right angle)" },
          { label: "a, b", text: "= the other two sides" },
        ],
      },
      worked: {
        question:
          "A fireman's ladder needs to reach a window 6 m high. The base of the ladder is 4.5 m from the wall. How long must the ladder be?",
        triangle: { base: "4.5 m", vert: "6 m", hyp: "?", unknownSide: "hyp" },
        steps: [
          {
            calc: "PR² = PQ² + QR² (let PR = ladder length)",
            why: "The ladder, wall, and ground form a right-angled triangle — the ladder is the hypotenuse.",
          },
          { calc: "= 4.5² + 6²", why: "Substitute the given distances." },
          { calc: "= 20.25 + 36 = 56.25", why: "Square and add." },
          { calc: "PR = √56.25 = 7.5 m", why: "Take the square root to find the ladder length." },
        ],
      },
      guided: {
        question: "A monitor screen is 12 cm wide and 16 cm tall. Find its diagonal screen size.",
        triangle: { base: "12 cm", vert: "16 cm", hyp: "?", unknownSide: "hyp" },
        answer: "c² = 12² + 16² = 144+256 = 400. c = √400 = 20 cm.",
      },
      mistake: {
        wrong:
          "Adding c² = a² + b² when c is NOT the hypotenuse — e.g. treating a known short side as if it were the longest.",
        right:
          "If solving for a SHORT side instead, rearrange: a² = c² − b² (subtract, don't add).",
      },
      practice: {
        easy: {
          question:
            "Find x: a right-angled triangle has sides 12 cm and 16 cm (the two shorter sides). Find the hypotenuse.",
          triangle: { base: "12 cm", vert: "16 cm", hyp: "x", unknownSide: "hyp" },
          answer: "x² = 144+256 = 400. x = 20 cm.",
        },
        medium: {
          question:
            "Calculate the length of PQ: PRS is a right-angled triangle at R with PR=3cm, RQ=4cm, then RQS right-angled at Q with QS=12cm.",
          triangle: { base: "3 cm", vert: "4 cm", hyp: "PR", unknownSide: "hyp" },
          answer:
            "PR²=3²+4²=25, PR=5. Then PQ²=PR²+... apply Pythagoras twice, once per right-angled triangle in the combined figure.",
        },
        hard: {
          question:
            "Ship A is 34 km north of Ship B. Ship C is 10 km west of Ship A. Calculate the distance between Ship B and Ship C, to 2 decimal places.",
          triangle: { base: "10 km", vert: "34 km", hyp: "?", unknownSide: "hyp" },
          answer: "BC² = 34² + 10² = 1156+100 = 1256. BC = √1256 ≈ 35.44 km.",
        },
      },
      realLife: [
        "🚒 Ladder and rope length problems",
        "🧭 Navigation and distance",
        "📺 Screen diagonal sizes",
      ],
    },
    {
      num: "13.2",
      title: "The Converse of Pythagoras' Theorem",
      ideaParagraphs: [
        "The converse runs the theorem BACKWARDS: given three side lengths, if the LONGEST side squared equals the sum of the other two sides squared, the triangle MUST be right-angled — with the right angle opposite the longest side.",
      ],
      introDiagram: { kind: "rightAngleCheck", sides: [24, 7, 25] },
      formula: {
        eyebrow: "The Converse",
        formula: "If c² = a² + b² → right angle opposite c",
      },
      worked: {
        question:
          "Sheila has three straws: 15 cm, 20 cm, 25 cm. Can she form a right-angled triangle frame?",
        triangle: { base: "15 cm", vert: "20 cm", hyp: "25 cm", unknownSide: null },
        steps: [
          {
            calc: "Longest side = 25 cm",
            why: "Identify the longest of the three straws — only this could be the hypotenuse.",
          },
          { calc: "25² = 625", why: "Square the longest side." },
          { calc: "15² + 20² = 225 + 400 = 625", why: "Square and add the other two sides." },
          {
            calc: "625 = 625 → right-angled!",
            why: "The two sides match, confirming a right angle exists (converse of Pythagoras).",
          },
        ],
      },
      guided: {
        question: "Determine whether a triangle with sides 20 cm, 12 cm, 18 cm is right-angled.",
        triangle: { base: "18 cm", vert: "12 cm", hyp: "20 cm", unknownSide: null },
        answer: "Longest = 20. 20²=400. 12²+18²=144+324=468. 400≠468, so NOT right-angled.",
      },
      mistake: {
        wrong:
          'Squaring the wrong side as "c" — not identifying the LONGEST side first before applying the converse.',
        right:
          "ALWAYS identify the longest side first — that's the only one that could be the hypotenuse (c).",
      },
      practice: {
        easy: {
          question: "Is a triangle with sides 9 cm, 40 cm, 41 cm right-angled?",
          triangle: { base: "9 cm", vert: "40 cm", hyp: "41 cm", unknownSide: null },
          answer: "41²=1681. 9²+40²=81+1600=1681. Equal — YES, right-angled.",
        },
        medium: {
          question:
            "A 2.5 m ladder leans on a wall, base 1.5 m from the wall, top 2 m up the wall. Explain how you'd check if the wall is vertical.",
          triangle: { base: "1.5 m", vert: "2 m", hyp: "2.5 m", unknownSide: null },
          answer:
            "Check if 2.5² = 1.5² + 2². 6.25 = 2.25+4 = 6.25. Equal, so the wall makes a right angle with the ground — it IS vertical.",
        },
        hard: {
          question:
            "In the diagram, PQ=6m, QR=8m, RS=10m, ∠PQR=65°, ∠QRS=45°. Find ∠PQS given PS forms the relevant right-angled triangle with PQ and QS.",
          triangle: { base: "6 m", vert: "8 m", hyp: "10 m", unknownSide: null },
          answer:
            "First confirm PQR is right-angled via the converse (6²+8²=10²=100 ✓), establishing ∠PQR=90°, then use the given angles around the diagram to find the required angle by angle sum rules.",
        },
      },
      realLife: ["🏗️ Checking walls are vertical/square", "📐 Carpentry and construction"],
    },
  ],
  summary: {
    center: "The Pythagoras' Theorem",
    branches: [
      { title: "The Theorem", points: ["c² = a² + b²"] },
      { title: "Hypotenuse", points: ["Longest side, opposite the right angle"] },
      { title: "The Converse", points: ["c²=a²+b² proves a right angle exists"] },
    ],
  },
  formulaSheet: [
    { formula: "c² = a² + b²", label: "The Pythagoras' theorem" },
    { formula: "a² = c² − b²", label: "Solving for a shorter side" },
    { formula: "e.g. (3,4,5), (5,12,13)", label: "Pythagorean triples" },
    { formula: "Longest² = sum of others² → right angle", label: "The converse" },
  ],
  quickRevision: [
    "I can identify the hypotenuse and apply the Pythagoras' theorem to find an unknown side.",
    "I can use the theorem to solve real-life and combined-shape problems.",
    "I can use the converse of the theorem to determine whether a triangle is right-angled.",
  ],
  examTips: [
    "Memorise common Pythagorean triples (3,4,5 and 5,12,13 and their multiples) to skip the calculation entirely when you spot them.",
    'For the converse, ALWAYS square the longest side first and compare it to the sum of the other two squares — never assume which side is "c".',
  ],
  challenge: {
    question:
      "A ship departs point O, sails southwest 300 km, then northwest 450 km. Since southwest and northwest are perpendicular directions, calculate the ship's final distance from O, to 2 decimal places.",
    triangle: { base: "300 km", vert: "450 km", hyp: "?", unknownSide: "hyp" },
    answer:
      "The two legs are perpendicular, forming a right angle at the turning point. Distance² = 300² + 450² = 90000+202500 = 292500. Distance = √292500 ≈ 540.83 km.",
  },
};

const bm: MathF1C13Content = {
  subtopics: [
    {
      num: "13.1",
      title: "Teorem Pythagoras",
      ideaParagraphs: [
        "Dalam sebarang segi tiga bersudut tegak, sisi terpanjang — sentiasa yang BERTENTANGAN dengan sudut tegak — ialah hipotenus. Teorem Pythagoras menyatakan: luas segi empat sama dibina pada hipotenus sama dengan jumlah luas segi empat sama dibina pada dua sisi lain.",
      ],
      introDiagram: {
        kind: "pythagSquares",
        caption:
          "c bertentangan sudut tegak (ditanda petak kecil) — sentiasa sisi terpanjang, hipotenus",
      },
      formula: {
        eyebrow: "Teorem Pythagoras",
        formula: "c² = a² + b²",
        legend: [
          { label: "c", text: "= hipotenus (bertentangan sudut tegak)" },
          { label: "a, b", text: "= dua sisi lain" },
        ],
      },
      worked: {
        question:
          "Tangga bomba perlu sampai tingkap 6 m tinggi. Tapak tangga 4.5 m dari dinding. Berapa panjang tangga diperlukan?",
        triangle: { base: "4.5 m", vert: "6 m", hyp: "?", unknownSide: "hyp" },
        steps: [
          {
            calc: "PR² = PQ² + QR² (biar PR = panjang tangga)",
            why: "Tangga, dinding, dan tanah membentuk segi tiga bersudut tegak — tangga ialah hipotenus.",
          },
          { calc: "= 4.5² + 6²", why: "Gantikan jarak diberi." },
          { calc: "= 20.25 + 36 = 56.25", why: "Kuasaduakan dan tambah." },
          { calc: "PR = √56.25 = 7.5 m", why: "Ambil punca kuasa dua untuk cari panjang tangga." },
        ],
      },
      guided: {
        question: "Skrin monitor lebar 12 cm dan tinggi 16 cm. Cari saiz pepenjuru skrin.",
        triangle: { base: "12 cm", vert: "16 cm", hyp: "?", unknownSide: "hyp" },
        answer: "c² = 12² + 16² = 144+256 = 400. c = √400 = 20 cm.",
      },
      mistake: {
        wrong:
          "Menambah c² = a² + b² apabila c BUKAN hipotenus — cth. menganggap sisi pendek diketahui seolah-olah ia terpanjang.",
        right: "Jika menyelesaikan sisi PENDEK, susun semula: a² = c² − b² (tolak, bukan tambah).",
      },
      practice: {
        easy: {
          question:
            "Cari x: segi tiga bersudut tegak bersisi 12 cm dan 16 cm (dua sisi pendek). Cari hipotenus.",
          triangle: { base: "12 cm", vert: "16 cm", hyp: "x", unknownSide: "hyp" },
          answer: "x² = 144+256 = 400. x = 20 cm.",
        },
        medium: {
          question:
            "Kira panjang PQ: PRS segi tiga bersudut tegak di R dengan PR=3cm, RQ=4cm, kemudian RQS bersudut tegak di Q dengan QS=12cm.",
          triangle: { base: "3 cm", vert: "4 cm", hyp: "PR", unknownSide: "hyp" },
          answer:
            "PR²=3²+4²=25, PR=5. Kemudian guna Pythagoras dua kali, sekali bagi setiap segi tiga bersudut tegak dalam rajah gabungan.",
        },
        hard: {
          question:
            "Kapal A 34 km utara Kapal B. Kapal C 10 km barat Kapal A. Kira jarak antara Kapal B dan Kapal C, 2 tempat perpuluhan.",
          triangle: { base: "10 km", vert: "34 km", hyp: "?", unknownSide: "hyp" },
          answer: "BC² = 34² + 10² = 1156+100 = 1256. BC = √1256 ≈ 35.44 km.",
        },
      },
      realLife: [
        "🚒 Masalah panjang tangga dan tali",
        "🧭 Navigasi dan jarak",
        "📺 Saiz pepenjuru skrin",
      ],
    },
    {
      num: "13.2",
      title: "Akas Teorem Pythagoras",
      ideaParagraphs: [
        "Akas menjalankan teorem SECARA SONGSANG: diberi tiga panjang sisi, jika sisi TERPANJANG kuasa dua sama dengan jumlah dua sisi lain kuasa dua, segi tiga MESTI bersudut tegak — dengan sudut tegak bertentangan sisi terpanjang.",
      ],
      introDiagram: { kind: "rightAngleCheck", sides: [24, 7, 25] },
      formula: {
        eyebrow: "Akas",
        formula: "Jika c² = a² + b² → sudut tegak bertentangan c",
      },
      worked: {
        question:
          "Sheila ada tiga penyedut minuman: 15 cm, 20 cm, 25 cm. Bolehkah dia bentuk rangka segi tiga bersudut tegak?",
        triangle: { base: "15 cm", vert: "20 cm", hyp: "25 cm", unknownSide: null },
        steps: [
          {
            calc: "Sisi terpanjang = 25 cm",
            why: "Kenal pasti terpanjang tiga penyedut — hanya ini boleh jadi hipotenus.",
          },
          { calc: "25² = 625", why: "Kuasaduakan sisi terpanjang." },
          { calc: "15² + 20² = 225 + 400 = 625", why: "Kuasaduakan dan tambah dua sisi lain." },
          {
            calc: "625 = 625 → bersudut tegak!",
            why: "Kedua-dua belah sepadan, mengesahkan sudut tegak wujud (akas Pythagoras).",
          },
        ],
      },
      guided: {
        question: "Tentukan sama ada segi tiga bersisi 20 cm, 12 cm, 18 cm bersudut tegak.",
        triangle: { base: "18 cm", vert: "12 cm", hyp: "20 cm", unknownSide: null },
        answer:
          "Terpanjang = 20. 20²=400. 12²+18²=144+324=468. 400≠468, jadi BUKAN bersudut tegak.",
      },
      mistake: {
        wrong:
          'Menguasaduakan sisi salah sebagai "c" — tidak kenal pasti sisi TERPANJANG dahulu sebelum guna akas.',
        right:
          "SENTIASA kenal pasti sisi terpanjang dahulu — itulah satu-satunya yang boleh menjadi hipotenus (c).",
      },
      practice: {
        easy: {
          question: "Adakah segi tiga bersisi 9 cm, 40 cm, 41 cm bersudut tegak?",
          triangle: { base: "9 cm", vert: "40 cm", hyp: "41 cm", unknownSide: null },
          answer: "41²=1681. 9²+40²=81+1600=1681. Sama — YA, bersudut tegak.",
        },
        medium: {
          question:
            "Tangga 2.5 m disandarkan di dinding, tapak 1.5 m dari dinding, atas 2 m di dinding. Jelaskan cara semak jika dinding menegak.",
          triangle: { base: "1.5 m", vert: "2 m", hyp: "2.5 m", unknownSide: null },
          answer:
            "Semak jika 2.5² = 1.5² + 2². 6.25 = 2.25+4 = 6.25. Sama, jadi dinding membentuk sudut tegak dengan tanah — ia MENEGAK.",
        },
        hard: {
          question:
            "Dalam gambar rajah, PQ=6m, QR=8m, RS=10m, ∠PQR=65°, ∠QRS=45°. Cari ∠PQR diberi PS bentuk segi tiga bersudut tegak berkaitan.",
          triangle: { base: "6 m", vert: "8 m", hyp: "10 m", unknownSide: null },
          answer:
            "Sahkan dahulu PQR bersudut tegak melalui akas (6²+8²=10²=100 ✓), menetapkan ∠PQR=90°, kemudian guna sudut diberi sekeliling rajah untuk cari sudut diperlukan melalui peraturan jumlah sudut.",
        },
      },
      realLife: ["🏗️ Menyemak dinding menegak/bersegi", "📐 Pertukangan kayu dan pembinaan"],
    },
  ],
  summary: {
    center: "Teorem Pythagoras",
    branches: [
      { title: "Teorem", points: ["c² = a² + b²"] },
      { title: "Hipotenus", points: ["Sisi terpanjang, bertentangan sudut tegak"] },
      { title: "Akas", points: ["c²=a²+b² membuktikan sudut tegak wujud"] },
    ],
  },
  formulaSheet: [
    { formula: "c² = a² + b²", label: "Teorem Pythagoras" },
    { formula: "a² = c² − b²", label: "Menyelesaikan sisi lebih pendek" },
    { formula: "cth. (3,4,5), (5,12,13)", label: "Tripel Pythagoras" },
    { formula: "Terpanjang² = jumlah lain² → sudut tegak", label: "Akas" },
  ],
  quickRevision: [
    "Saya boleh mengenal pasti hipotenus dan guna teorem Pythagoras untuk cari sisi tidak diketahui.",
    "Saya boleh guna teorem untuk selesaikan masalah kehidupan sebenar dan bentuk gabungan.",
    "Saya boleh guna akas teorem untuk tentukan sama ada segi tiga bersudut tegak.",
  ],
  examTips: [
    "Hafal tripel Pythagoras lazim (3,4,5 dan 5,12,13 dan gandaannya) untuk langkau pengiraan sepenuhnya apabila anda kenal pasti.",
    'Untuk akas, SENTIASA kuasaduakan sisi terpanjang dahulu dan banding dengan jumlah dua kuasa dua lain — jangan anggap sisi mana ialah "c".',
  ],
  challenge: {
    question:
      "Kapal berlepas dari titik O, belayar barat daya 300 km, kemudian barat laut 450 km. Oleh kerana barat daya dan barat laut adalah arah berserenjang, kira jarak akhir kapal dari O, 2 tempat perpuluhan.",
    triangle: { base: "300 km", vert: "450 km", hyp: "?", unknownSide: "hyp" },
    answer:
      "Kedua-dua bahagian berserenjang, membentuk sudut tegak di titik pusingan. Jarak² = 300² + 450² = 90000+202500 = 292500. Jarak = √292500 ≈ 540.83 km.",
  },
};

export const mathF1C13InteractiveContent: { en: MathF1C13Content; bm: MathF1C13Content } = {
  en,
  bm,
};
