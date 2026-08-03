// Form 1 Mathematics, Chapter 6 — Linear Equations / Persamaan Linear
// Interactive bilingual content. EN sourced from T1 BT MAT DLP - MATHEMATICS.pdf,
// BM sourced from T1 BT MAT- MATEMATIK.pdf (KSSM counterpart), cross-checked
// against design-reference/math1-chapter6-linear-equations-notes-v3.html.
// Content only — no presentation markup (rendered by MathF1Chapter6NotesBlock).
//
// Note on 6.3's "Try It Yourself": the mockup's substitution example (x−3y=7,
// 5x+2y=1) was promoted to a full step-reveal worked example below (matching
// elimination's treatment — the fix design review flagged). Its guided-card
// slot is filled with a freshly authored, hand-verified substitution question
// in the same style/difficulty, not lifted from the mockup.
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export interface MathC6SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
  /** 6.3 only — substitution method, given the same step-reveal treatment as elimination. */
  secondWorked?: { question: string; steps: WorkedStep[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF1C6Content {
  subtopics: MathC6SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF1C6Content = {
  subtopics: [
    {
      num: "6.1",
      title: "Linear Equations in One Variable",
      ideaParagraphs: [
        'An equation is a mathematical sentence with an "=" sign. A linear equation in one variable has exactly ONE variable, and its power is 1 — like x+5=8. The value that makes both sides equal is the solution (or root) of the equation.',
        "Three ways to solve: trial and improvement (guess, check, adjust), the equality concept (do the same operation to both sides — like a balance scale), and backtracking (reverse the operations in order).",
      ],
      formula: {
        eyebrow: "Equality Concept — Keep Both Sides Balanced",
        formula: "2x + 1 = 7  ⟹  2x = 6  ⟹  x = 3",
        legend: [
          {
            label: "Rule",
            text: "Whatever you do to one side, do the exact same thing to the other",
          },
        ],
      },
      worked: {
        question: "Solve 5(x − 4) = x + 16 using the equality concept.",
        steps: [
          { calc: "5(x − 4) = x + 16", why: "Start with the original equation." },
          { calc: "5x − 20 = x + 16", why: "Expand the brackets on the left." },
          {
            calc: "5x − 20 + 20 = x + 16 + 20",
            why: "Add 20 to BOTH sides to remove −20 from the left.",
          },
          { calc: "5x = x + 36", why: "Simplify." },
          {
            calc: "5x − x = x + 36 − x",
            why: "Subtract x from BOTH sides to gather x terms on one side.",
          },
          { calc: "4x = 36   →   x = 9", why: "Divide both sides by 4." },
        ],
      },
      guided: {
        question:
          "After 10 years, Jalil's age will be thrice his age this year. What is Jalil's age now?",
        answer:
          "Let x = current age. x + 10 = 3x. Subtract x from both sides: 10 = 2x. Divide by 2: x = 5.",
      },
      mistake: {
        wrong: "Adding or subtracting a number on only ONE side of the equation.",
        right:
          "Every operation must be applied to BOTH sides — that's what keeps the equation balanced and true.",
      },
      practice: {
        easy: {
          question: "Solve x − 10 = 3.",
          answer: "Add 10 to both sides: x = 13.",
        },
        medium: {
          question: "Solve 2x/5 + 13 = 7 using the equality concept.",
          answer: "×5 both sides: 2x+65=35. −65: 2x=−30. ÷2: x=−15.",
        },
        hard: {
          question:
            "Azmah scored 17 more than Yazid; Suzana scored twice Yazid's. Total = 161. Find Azmah's score.",
          answer: "Let Yazid=x. x+(x+17)+2x=161. 4x+17=161. 4x=144. x=36. Azmah=36+17=53.",
        },
      },
      realLife: ["🎂 Age problems", "📏 Perimeter and dimension problems"],
    },
    {
      num: "6.2",
      title: "Linear Equations in Two Variables",
      ideaParagraphs: [
        "A linear equation in two variables has TWO variables, each with power 1 — general form ax + by = c. Unlike one-variable equations, it has MANY possible solution pairs (x, y), not just one.",
        "Every solution pair, when plotted, sits exactly on a STRAIGHT LINE — that's why it's called \"linear\".",
      ],
      formula: {
        eyebrow: "General Form",
        formula: "ax + by = c   (a, b ≠ 0)",
      },
      worked: {
        question: "Write three possible pairs of solutions for 2x + y = 6.",
        steps: [
          {
            calc: "When x=0: 2(0)+y=6 → y=6",
            why: "Substitute x=0 into the equation and solve for y.",
          },
          { calc: "When x=1: 2(1)+y=6 → y=4", why: "Substitute x=1 and solve for y." },
          { calc: "When x=2: 2(2)+y=6 → y=2", why: "Substitute x=2 and solve for y." },
          {
            calc: "(0,6), (1,4), (2,2)",
            why: "Each (x,y) pair written as an ordered pair is a valid solution.",
          },
        ],
      },
      guided: {
        question:
          "Osman bought 5 jerseys total for two teams. Write the equation, and find two possible solutions.",
        answer: "x + y = 5. Possible pairs: (x=1,y=4), (x=2,y=3), (x=3,y=2), (x=4,y=1).",
      },
      mistake: {
        wrong:
          "Thinking a two-variable equation has only ONE correct answer, like a one-variable equation.",
        right:
          "A two-variable equation has INFINITELY many valid (x,y) pairs — every point on its line.",
      },
      practice: {
        easy: {
          question: "Write three possible pairs of solutions for x − y = 7.",
          answer: "(7,0), (8,1), (9,2) — any pair where x is 7 more than y.",
        },
        medium: {
          question:
            "Sani won 4 medals, all gold and bronze. What are the possible numbers of each?",
          answer:
            "g+b=4. Possible: (1,3),(2,2),(3,1) gold-bronze pairs (excluding 0 of either if both types won).",
        },
        hard: {
          question:
            "A shirt costs RM20, pants RM10. Sheimah spends RM80 total. What's the max number of shirts she can buy?",
          answer: "20x+10y=80. Max shirts when y is smallest valid (y=0): x=4 shirts.",
        },
      },
      realLife: ["🛍️ Budget-constrained shopping", "🪙 Coin and combination problems"],
    },
    {
      num: "6.3",
      title: "Simultaneous Linear Equations in Two Variables",
      ideaParagraphs: [
        "A single two-variable equation has endless solutions. But TWO equations with the SAME two variables, solved together, usually narrow it down to just ONE pair — that's a simultaneous linear equation.",
        "Graphically: two lines that intersect give a unique solution; parallel lines give no solution; overlapping lines give infinite solutions.",
      ],
      formula: {
        eyebrow: "Elimination Method",
        formula: "Match Coefficients → Add or Subtract → Eliminate",
        legend: [
          {
            label: "Rule",
            text: "Multiply one or both equations so a variable's coefficients match, then add or subtract to eliminate it.",
          },
        ],
      },
      worked: {
        question: "Solve using elimination: 2x + 5y = 14 and 3x + 4y = 7.",
        steps: [
          {
            calc: "2x + 5y = 14 ……(1)   3x + 4y = 7 ……(2)",
            why: "Start with both equations.",
          },
          {
            calc: "(1)×3: 6x+15y=42 ……(3)   (2)×2: 6x+8y=14 ……(4)",
            why: "Multiply so the x-coefficient matches in both (LCM of 2,3 is 6).",
          },
          {
            calc: "(3) − (4): 7y = 28   →   y = 4",
            why: "Subtract to eliminate x, then solve for y.",
          },
          {
            calc: "2x + 5(4) = 14   →   x = −3",
            why: "Substitute y=4 back into equation (1) to find x.",
          },
        ],
      },
      secondWorked: {
        question: "Solve using substitution: x − 3y = 7 and 5x + 2y = 1.",
        steps: [
          {
            calc: "x − 3y = 7 ……(1)   5x + 2y = 1 ……(2)",
            why: "Start with both equations.",
          },
          { calc: "From (1): x = 7 + 3y", why: "Make x the subject in equation (1)." },
          {
            calc: "5(7 + 3y) + 2y = 1",
            why: "Substitute this expression for x into equation (2).",
          },
          {
            calc: "35 + 17y = 1   →   y = −2",
            why: "Expand (5×7=35, 5×3y=15y, +2y=17y), then solve for y.",
          },
          {
            calc: "x = 7 + 3(−2) = 1",
            why: "Substitute y = −2 back into x = 7 + 3y from step 2.",
          },
        ],
      },
      guided: {
        question: "Solve using substitution: y = x + 2 and 3x + y = 18.",
        answer:
          "From eq 1: y = x+2. Substitute into eq 2: 3x+(x+2)=18 → 4x+2=18 → x=4. Then y=4+2=6.",
      },
      mistake: {
        wrong: "Multiplying only ONE side of an equation when scaling it to match coefficients.",
        right: "Multiply EVERY term in the equation — both sides, all variables and the constant.",
      },
      practice: {
        easy: {
          question: "What type of solution do parallel lines give?",
          answer: "No solution — parallel lines never intersect.",
        },
        medium: {
          question: "Solve: x + 2y = 9 and 3x − 2y = 15.",
          answer: "Add both equations: 4x=24, x=6. Substitute: 6+2y=9, y=1.5.",
        },
        hard: {
          question:
            "2 adults + 3 children cost RM97; 4 adults + 1 child cost RM139. Find the adult and child ticket prices.",
          answer:
            "2x+3y=97, 4x+y=139. Multiply eq2 by 3: 12x+3y=417. Subtract eq1: 10x=320, x=32. Then y=139−128=11. Adult=RM32, child=RM11.",
        },
      },
      realLife: ["🎟️ Ticket pricing (adult vs child)", "🐔 Livestock/farming cost problems"],
    },
  ],
  summary: {
    center: "Linear Equations",
    branches: [
      { title: "One Variable", points: ["One solution; balance both sides"] },
      { title: "Two Variables", points: ["Infinite solution pairs; forms a line"] },
      { title: "Simultaneous", points: ["Substitution or elimination narrows to one pair"] },
    ],
  },
  formulaSheet: [
    { formula: "ax + b = c", label: "Linear eq., one variable" },
    { formula: "ax + by = c", label: "Linear eq., two variables" },
    { formula: "Intersecting → Unique", label: "Parallel → None; Overlap → Infinite" },
    { formula: "Substitution or Elimination", label: "Two solving methods" },
  ],
  quickRevision: [
    "I can identify and solve linear equations in one variable.",
    "I can identify linear equations in two variables and find possible solution pairs.",
    "I can solve simultaneous linear equations using substitution or elimination.",
  ],
  examTips: [
    "After solving, ALWAYS substitute your answer back into the original equation to check.",
    "For elimination, pick whichever variable needs the SMALLEST multiplier to match coefficients — less arithmetic, fewer mistakes.",
  ],
  challenge: {
    question:
      "A rectangular swimming pool has length p m and width q m. The length is twice the width. If the perimeter is 150 m, find p and q.",
    answer: "p=2q and 2(p+q)=150 → p+q=75. Substitute: 2q+q=75, 3q=75, q=25. p=50.",
  },
};

const bm: MathF1C6Content = {
  subtopics: [
    {
      num: "6.1",
      title: "Persamaan Linear dalam Satu Pemboleh Ubah",
      ideaParagraphs: [
        'Persamaan ialah ayat matematik dengan tanda "=". Persamaan linear dalam satu pemboleh ubah mempunyai TEPAT SATU pemboleh ubah, dan kuasanya 1 — seperti x+5=8. Nilai yang menjadikan kedua-dua belah sama ialah penyelesaian (atau punca) persamaan itu.',
        "Tiga cara untuk menyelesaikan: cuba jaya (teka, semak, laras), konsep kesamaan (lakukan operasi sama pada kedua-dua belah — seperti neraca), dan pematahbalikan (songsangkan operasi mengikut turutan).",
      ],
      formula: {
        eyebrow: "Konsep Kesamaan — Kekalkan Kedua-dua Belah Seimbang",
        formula: "2x + 1 = 7  ⟹  2x = 6  ⟹  x = 3",
        legend: [
          {
            label: "Peraturan",
            text: "Apa sahaja yang anda lakukan pada satu belah, lakukan perkara sama tepat pada belah satu lagi",
          },
        ],
      },
      worked: {
        question: "Selesaikan 5(x − 4) = x + 16 menggunakan konsep kesamaan.",
        steps: [
          { calc: "5(x − 4) = x + 16", why: "Mula dengan persamaan asal." },
          { calc: "5x − 20 = x + 16", why: "Kembangkan kurungan di sebelah kiri." },
          {
            calc: "5x − 20 + 20 = x + 16 + 20",
            why: "Tambah 20 pada KEDUA-DUA belah untuk buang −20 daripada kiri.",
          },
          { calc: "5x = x + 36", why: "Permudahkan." },
          {
            calc: "5x − x = x + 36 − x",
            why: "Tolak x daripada KEDUA-DUA belah untuk kumpulkan sebutan x pada satu belah.",
          },
          { calc: "4x = 36   →   x = 9", why: "Bahagi kedua-dua belah dengan 4." },
        ],
      },
      guided: {
        question:
          "Selepas 10 tahun, umur Jalil akan menjadi tiga kali umurnya tahun ini. Berapakah umur Jalil sekarang?",
        answer:
          "Biar x = umur semasa. x + 10 = 3x. Tolak x daripada kedua-dua belah: 10 = 2x. Bahagi dengan 2: x = 5.",
      },
      mistake: {
        wrong: "Menambah atau menolak nombor hanya pada SATU belah persamaan.",
        right:
          "Setiap operasi mesti dikenakan pada KEDUA-DUA belah — itulah yang mengekalkan persamaan seimbang dan benar.",
      },
      practice: {
        easy: {
          question: "Selesaikan x − 10 = 3.",
          answer: "Tambah 10 pada kedua-dua belah: x = 13.",
        },
        medium: {
          question: "Selesaikan 2x/5 + 13 = 7 menggunakan konsep kesamaan.",
          answer: "×5 kedua-dua belah: 2x+65=35. −65: 2x=−30. ÷2: x=−15.",
        },
        hard: {
          question:
            "Azmah skor 17 lebih daripada Yazid; Suzana skor dua kali Yazid. Jumlah = 161. Cari skor Azmah.",
          answer: "Biar Yazid=x. x+(x+17)+2x=161. 4x+17=161. 4x=144. x=36. Azmah=36+17=53.",
        },
      },
      realLife: ["🎂 Masalah umur", "📏 Masalah perimeter dan dimensi"],
    },
    {
      num: "6.2",
      title: "Persamaan Linear dalam Dua Pemboleh Ubah",
      ideaParagraphs: [
        "Persamaan linear dalam dua pemboleh ubah mempunyai DUA pemboleh ubah, setiap satu berkuasa 1 — bentuk am ax + by = c. Berbeza dengan persamaan satu pemboleh ubah, ia mempunyai BANYAK pasangan penyelesaian (x, y) yang mungkin, bukan hanya satu.",
        'Setiap pasangan penyelesaian, apabila diplot, terletak tepat pada satu GARIS LURUS — itulah sebabnya dipanggil "linear".',
      ],
      formula: {
        eyebrow: "Bentuk Am",
        formula: "ax + by = c   (a, b ≠ 0)",
      },
      worked: {
        question: "Tulis tiga pasangan penyelesaian mungkin bagi 2x + y = 6.",
        steps: [
          {
            calc: "Apabila x=0: 2(0)+y=6 → y=6",
            why: "Gantikan x=0 ke dalam persamaan dan selesaikan y.",
          },
          { calc: "Apabila x=1: 2(1)+y=6 → y=4", why: "Gantikan x=1 dan selesaikan y." },
          { calc: "Apabila x=2: 2(2)+y=6 → y=2", why: "Gantikan x=2 dan selesaikan y." },
          {
            calc: "(0,6), (1,4), (2,2)",
            why: "Setiap pasangan (x,y) ditulis sebagai pasangan tertib adalah penyelesaian sah.",
          },
        ],
      },
      guided: {
        question:
          "Osman beli 5 jersi jumlah untuk dua pasukan. Tulis persamaan, dan cari dua penyelesaian mungkin.",
        answer: "x + y = 5. Pasangan mungkin: (x=1,y=4), (x=2,y=3), (x=3,y=2), (x=4,y=1).",
      },
      mistake: {
        wrong:
          "Menganggap persamaan dua pemboleh ubah hanya ada SATU jawapan betul, seperti persamaan satu pemboleh ubah.",
        right:
          "Persamaan dua pemboleh ubah mempunyai pasangan (x,y) sah yang TIDAK TERHINGGA banyaknya — setiap titik pada garisnya.",
      },
      practice: {
        easy: {
          question: "Tulis tiga pasangan penyelesaian mungkin bagi x − y = 7.",
          answer: "(7,0), (8,1), (9,2) — sebarang pasangan dengan x 7 lebih daripada y.",
        },
        medium: {
          question:
            "Sani menang 4 pingat, semua emas dan gangsa. Apakah bilangan mungkin setiap satu?",
          answer:
            "e+g=4. Mungkin: (1,3),(2,2),(3,1) pasangan emas-gangsa (tidak termasuk 0 jika kedua-dua jenis dimenangi).",
        },
        hard: {
          question:
            "Kemeja RM20, seluar RM10. Sheimah belanja RM80 jumlah. Apakah bilangan maksimum kemeja boleh dibeli?",
          answer: "20x+10y=80. Kemeja maksimum apabila y terkecil sah (y=0): x=4 kemeja.",
        },
      },
      realLife: ["🛍️ Beli-belah dengan bajet terhad", "🪙 Masalah syiling dan kombinasi"],
    },
    {
      num: "6.3",
      title: "Persamaan Linear Serentak dalam Dua Pemboleh Ubah",
      ideaParagraphs: [
        "Satu persamaan dua pemboleh ubah mempunyai penyelesaian tanpa had. Tetapi DUA persamaan dengan pemboleh ubah SAMA, diselesaikan bersama, biasanya menyempitkannya kepada hanya SATU pasangan — itulah persamaan linear serentak.",
        "Secara grafik: dua garis yang bersilang memberi penyelesaian unik; garis selari memberi tiada penyelesaian; garis bertindih memberi penyelesaian tak terhingga.",
      ],
      formula: {
        eyebrow: "Kaedah Penghapusan",
        formula: "Sepadan Pekali → Tambah atau Tolak → Hapuskan",
        legend: [
          {
            label: "Peraturan",
            text: "Darab satu atau kedua-dua persamaan supaya pekali pemboleh ubah sepadan, kemudian tambah atau tolak untuk menghapuskannya.",
          },
        ],
      },
      worked: {
        question: "Selesaikan menggunakan penghapusan: 2x + 5y = 14 dan 3x + 4y = 7.",
        steps: [
          {
            calc: "2x + 5y = 14 ……(1)   3x + 4y = 7 ……(2)",
            why: "Mula dengan kedua-dua persamaan.",
          },
          {
            calc: "(1)×3: 6x+15y=42 ……(3)   (2)×2: 6x+8y=14 ……(4)",
            why: "Darab supaya pekali x sepadan dalam kedua-dua (GSTK 2,3 ialah 6).",
          },
          {
            calc: "(3) − (4): 7y = 28   →   y = 4",
            why: "Tolak untuk menghapuskan x, kemudian selesaikan y.",
          },
          {
            calc: "2x + 5(4) = 14   →   x = −3",
            why: "Gantikan y=4 semula ke persamaan (1) untuk cari x.",
          },
        ],
      },
      secondWorked: {
        question: "Selesaikan menggunakan penggantian: x − 3y = 7 dan 5x + 2y = 1.",
        steps: [
          {
            calc: "x − 3y = 7 ……(1)   5x + 2y = 1 ……(2)",
            why: "Mula dengan kedua-dua persamaan.",
          },
          { calc: "Daripada (1): x = 7 + 3y", why: "Jadikan x sebagai objek dalam persamaan (1)." },
          {
            calc: "5(7 + 3y) + 2y = 1",
            why: "Gantikan ungkapan ini bagi x ke dalam persamaan (2).",
          },
          {
            calc: "35 + 17y = 1   →   y = −2",
            why: "Kembangkan (5×7=35, 5×3y=15y, +2y=17y), kemudian selesaikan y.",
          },
          {
            calc: "x = 7 + 3(−2) = 1",
            why: "Gantikan y = −2 semula ke x = 7 + 3y daripada langkah 2.",
          },
        ],
      },
      guided: {
        question: "Selesaikan menggunakan penggantian: y = x + 2 dan 3x + y = 18.",
        answer:
          "Daripada pers 1: y = x+2. Gantikan ke pers 2: 3x+(x+2)=18 → 4x+2=18 → x=4. Kemudian y=4+2=6.",
      },
      mistake: {
        wrong: "Mendarab hanya SATU belah persamaan apabila menskalakannya untuk sepadan pekali.",
        right:
          "Darab SETIAP sebutan dalam persamaan — kedua-dua belah, semua pemboleh ubah dan pemalar.",
      },
      practice: {
        easy: {
          question: "Apakah jenis penyelesaian diberi oleh garis selari?",
          answer: "Tiada penyelesaian — garis selari tidak pernah bersilang.",
        },
        medium: {
          question: "Selesaikan: x + 2y = 9 dan 3x − 2y = 15.",
          answer: "Tambah kedua-dua persamaan: 4x=24, x=6. Gantikan: 6+2y=9, y=1.5.",
        },
        hard: {
          question:
            "2 dewasa + 3 kanak-kanak kos RM97; 4 dewasa + 1 kanak-kanak kos RM139. Cari harga tiket dewasa dan kanak-kanak.",
          answer:
            "2x+3y=97, 4x+y=139. Darab pers2 dengan 3: 12x+3y=417. Tolak pers1: 10x=320, x=32. Kemudian y=139−128=11. Dewasa=RM32, kanak-kanak=RM11.",
        },
      },
      realLife: ["🎟️ Harga tiket (dewasa lwn kanak-kanak)", "🐔 Masalah kos ternakan/pertanian"],
    },
  ],
  summary: {
    center: "Persamaan Linear",
    branches: [
      { title: "Satu Pemboleh Ubah", points: ["Satu penyelesaian; seimbangkan kedua-dua belah"] },
      {
        title: "Dua Pemboleh Ubah",
        points: ["Pasangan penyelesaian tak terhingga; membentuk garis"],
      },
      {
        title: "Serentak",
        points: ["Penggantian atau penghapusan menyempitkan kepada satu pasangan"],
      },
    ],
  },
  formulaSheet: [
    { formula: "ax + b = c", label: "Pers. linear, satu pemboleh ubah" },
    { formula: "ax + by = c", label: "Pers. linear, dua pemboleh ubah" },
    { formula: "Bersilang → Unik", label: "Selari → Tiada; Bertindih → Tak terhingga" },
    { formula: "Penggantian atau Penghapusan", label: "Dua kaedah penyelesaian" },
  ],
  quickRevision: [
    "Saya boleh mengenal pasti dan menyelesaikan persamaan linear satu pemboleh ubah.",
    "Saya boleh mengenal pasti persamaan linear dua pemboleh ubah dan cari pasangan penyelesaian mungkin.",
    "Saya boleh menyelesaikan persamaan linear serentak menggunakan penggantian atau penghapusan.",
  ],
  examTips: [
    "Selepas menyelesaikan, SENTIASA gantikan jawapan anda semula ke persamaan asal untuk semak.",
    "Untuk penghapusan, pilih pemboleh ubah yang perlukan pendarab TERKECIL untuk sepadan pekali — kurang pengiraan, kurang kesilapan.",
  ],
  challenge: {
    question:
      "Kolam renang segi empat tepat mempunyai panjang p m dan lebar q m. Panjang ialah dua kali lebar. Jika perimeter ialah 150 m, cari p dan q.",
    answer: "p=2q dan 2(p+q)=150 → p+q=75. Gantikan: 2q+q=75, 3q=75, q=25. p=50.",
  },
};

export const mathF1C6InteractiveContent: { en: MathF1C6Content; bm: MathF1C6Content } = { en, bm };
