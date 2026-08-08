// Form 2 Mathematics, Chapter 3 — Algebraic Formulae / Rumus Algebra.
// Only ONE official subtopic (3.1), built as 4 visual mini-sections: Forming
// Formulae, Changing the Subject, Determining the Value of a Variable,
// Solving Problems. Interactive bilingual content. EN sourced from
// T2_BT_MAT_DLP_-_MATHEMATICS.pdf, BM sourced from T2_BT_MAT_-_MATEMATIK.pdf,
// cross-checked against design-reference/math2-chapter3-algebraic-formulae-notes-v2.html.
// Content only — no presentation markup (rendered by MathF2Chapter3NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF2C3Visual = {
  kind: "balanceScale";
  leftLabel?: string;
  rightLabel?: string;
  caption?: string;
};

export interface MathF2C3Block {
  formula?: { eyebrow?: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
}

export interface MathF2C3MiniSection {
  slug: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF2C3Visual;
  blocks: MathF2C3Block[];
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C3Content {
  miniSections: MathF2C3MiniSection[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C3Content = {
  miniSections: [
    {
      slug: "forming",
      title: "Forming Formulae",
      ideaParagraphs: [
        "An algebraic formula is a rule connecting variables. The letter standing ALONE on one side is the subject.",
      ],
      blocks: [
        {
          formula: {
            eyebrow: "Subject of the Formula",
            formula: "P = a + 2b",
            legend: [{ label: "P", text: "is the subject — alone on the left" }],
          },
          worked: {
            question:
              "Suzi sells cake at RM3/slice, cheese cake at double that. A 10% discount applies to everything. Form a formula for the selling price z, for m chocolate slices and n cheese slices.",
            steps: [
              {
                calc: "Cheese cake price = 2 × RM3 = RM6",
                why: '"Twice the price" means multiply by 2.',
              },
              {
                calc: "Full price = 3m + 6n",
                why: "m slices at RM3 plus n slices at RM6, before any discount.",
              },
              {
                calc: "z = 0.9(3m + 6n) = 2.7m + 5.4n",
                why: "A 10% discount means paying 90% of the total — multiply everything by 0.9, then expand.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "A taxi charges RM3 flag-down plus RM2 per km. Write a formula for the fare F for k km.",
        answer: "F = 3 + 2k",
      },
      mistake: {
        wrong: "Applying a discount to only PART of the total.",
        right: "Add up the FULL price first, THEN discount the combined total once.",
      },
      practice: {
        easy: {
          question: "Write a formula for perimeter P of a rectangle, length l, width w.",
          answer: "P = 2l + 2w",
        },
        medium: {
          question:
            "A phone plan: RM30 base, 5GB free, RM4/extra GB. Formula for bill B with g extra GB?",
          answer: "B = 30 + 4g",
        },
        hard: {
          question:
            "A store sells shirts at RMx, discounted RM(x−5) during sale. Write a formula for total T when 3 shirts are bought on sale.",
          answer: "T = 3(x−5)",
        },
      },
      realLife: ["💻 Spreadsheets", "📱 Phone billing"],
    },
    {
      slug: "changingSubject",
      title: "Changing the Subject of Formula",
      ideaParagraphs: [
        "Think of a formula as a balanced scale. Whatever you do to ONE side, you must do to the OTHER — that keeps it balanced while you move things around to isolate a different letter.",
      ],
      visual: {
        kind: "balanceScale",
        caption:
          "Add m to BOTH sides, subtract a number from BOTH sides — the scale stays level the whole time",
      },
      blocks: [
        {
          worked: {
            question: "State m as the subject: b = 2s − m",
            steps: [
              {
                calc: "b = 2s − m  →  b + m = 2s",
                why: "Add m to both sides — like adding weight to both sides of the scale.",
              },
              { calc: "m = 2s − b", why: "Subtract b from both sides to leave m alone." },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Squares and Square Roots Undo Each Other",
            formula: "s = p² ⟹ p = √s",
          },
          worked: {
            question: "State p as the subject: t = 1/p²",
            steps: [
              {
                calc: "t = 1/p²  →  tp² = 1",
                why: "Multiply both sides by p² to clear the fraction.",
              },
              { calc: "p² = 1/t", why: "Divide both sides by t." },
              { calc: "p = √(1/t)", why: "Square-root both sides to finally isolate p." },
            ],
          },
        },
      ],
      guided: {
        question: "State p as the subject: w = p/3",
        answer: "Multiply both sides by 3: p = 3w.",
      },
      mistake: {
        wrong: "Leaving the answer as −m instead of finishing to a POSITIVE m.",
        right: "Ended with −m? Multiply BOTH sides by −1 to flip every sign.",
      },
      practice: {
        easy: { question: "State m as the subject: q = m + p", answer: "m = q − p" },
        medium: { question: "State p as the subject: s = p²", answer: "p = √s" },
        hard: { question: "State m as the subject: a = 5/(2m)", answer: "m = 5/(2a)" },
      },
      realLife: ["🌡️ Temperature conversion", "📊 Science formulas"],
    },
    {
      slug: "determiningValue",
      title: "Determining the Value of a Variable",
      ideaParagraphs: [
        "Once you have known values, plug them into the formula, then solve for whatever's left.",
      ],
      blocks: [
        {
          worked: {
            question: "Given m = ¼(p − q)², find q when m = 16 and p = 3.",
            steps: [
              {
                calc: "16×4 = (3−q)²",
                why: "Multiply both sides by 4 to clear the ¼, then substitute m=16.",
              },
              { calc: "64 = (3−q)²", why: "Simplify." },
              { calc: "8 = 3 − q", why: "Square-root both sides." },
              { calc: "q = 3 − 8 = −5", why: "Rearrange to solve for q." },
            ],
          },
        },
      ],
      guided: {
        question: "Given w = 7t − 5u, find t when w = 15 and u = 4.",
        answer: "7t − 20 = 15. 7t = 35. t = 5.",
      },
      mistake: {
        wrong: "Square-rooting only part of a bracket instead of the whole thing.",
        right: "Square-rooting means the ENTIRE bracket gets rooted together.",
      },
      practice: {
        easy: { question: "Given A = πr², find A when r = 7 (π≈22/7).", answer: "A = 154" },
        medium: { question: "Given v = u + at, find a when v=20, u=5, t=3.", answer: "a = 5" },
        hard: { question: "Given m = ¼(p − q)², find p if m = 9, q = −1.", answer: "p = 5" },
      },
      realLife: ["🚀 Physics formulas", "🏦 Interest calculations"],
    },
    {
      slug: "solvingProblems",
      title: "Solving Problems",
      ideaParagraphs: [
        "Real problems don't hand you a formula — you build one. Name the unknown with a letter, turn the story into an equation, then solve.",
      ],
      blocks: [
        {
          worked: {
            question:
              "Chicken costs twice a bun. With RM5, Azman buys 2 buns and 1 chicken, RM1 left over. With RM12 buying the same buns, how many chickens can he afford?",
            steps: [
              {
                calc: "Let bun = RMx, chicken = RM2x",
                why: "Name the unknown — chicken costs twice a bun.",
              },
              {
                calc: "2x + 2x + 1 = 5  →  x = 1",
                why: "2 buns + 1 chicken + RM1 leftover = RM5.",
              },
              {
                calc: "With RM12: 2 buns = RM2, leaving RM10 → 5 chickens",
                why: "Buy the same 2 buns first, spend the rest on chicken at RM2 each.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Clothes sell at RMy, discounted to RM(y−8). 5 items cost RM60 total. Find y.",
        answer: "5(y−8) = 60. y−8 = 12. y = 20.",
      },
      mistake: {
        wrong: "Jumping to arithmetic without defining what your letter means.",
        right: 'Always write "Let x = ..." first.',
      },
      practice: {
        easy: {
          question:
            "A pen costs RM2 more than a pencil. 3 pencils and 2 pens cost RM19. Find the pencil's price.",
          answer: "RM3",
        },
        medium: {
          question:
            "A rectangle's length is 3 cm more than its width. Perimeter 26 cm. Find the width.",
          answer: "5 cm",
        },
        hard: { question: "B = 30 + 4g. Bill was RM58. How many extra GB?", answer: "7 GB" },
      },
      realLife: ["🛍️ Shopping and budgeting"],
    },
  ],
  summary: {
    center: "Algebraic Formulae",
    branches: [
      { title: "Forming", points: ["Translate a story into an equation"] },
      { title: "Changing Subject", points: ["Same balance-scale method"] },
      { title: "Solving", points: ["Substitute known values"] },
    ],
  },
  formulaSheet: [
    { formula: "Subject: alone, coefficient 1", label: "" },
    { formula: "s = p² ⟹ p = √s", label: "" },
    { formula: "−m? Multiply both sides by −1", label: "" },
  ],
  quickRevision: [
    "I can write a formula from a real situation.",
    "I can change the subject, including squares and roots.",
    "I can substitute and solve real-world formula problems.",
  ],
  examTips: [
    "Underline every number and relationship BEFORE writing algebra.",
    "Check your rearranged formula by plugging the original numbers back in.",
  ],
  challenge: {
    question: "A ball's height: h = 20t − 5t². Find h when t=2.",
    answer: "h=20(2)−5(4)=40−20=20 m.",
  },
};

const bm: MathF2C3Content = {
  miniSections: [
    {
      slug: "forming",
      title: "Membentuk Rumus",
      ideaParagraphs: [
        "Rumus algebra ialah peraturan menghubungkan pemboleh ubah. Huruf berdiri SENDIRIAN pada satu belah ialah perkara.",
      ],
      blocks: [
        {
          formula: {
            eyebrow: "Perkara Rumus",
            formula: "P = a + 2b",
            legend: [{ label: "P", text: "ialah perkara — sendirian di kiri" }],
          },
          worked: {
            question:
              "Suzi jual kek RM3/hiris, kek keju dua kali harga itu. Diskaun 10% dikenakan pada semuanya. Bentuk rumus harga jualan z, bagi m hiris kek coklat dan n hiris kek keju.",
            steps: [
              {
                calc: "Harga kek keju = 2 × RM3 = RM6",
                why: '"Dua kali harga" bermaksud darab dengan 2.',
              },
              {
                calc: "Harga penuh = 3m + 6n",
                why: "m hiris pada RM3 tambah n hiris pada RM6, sebelum diskaun.",
              },
              {
                calc: "z = 0.9(3m + 6n) = 2.7m + 5.4n",
                why: "Diskaun 10% bermaksud bayar 90% jumlah — darab semua dengan 0.9, kemudian kembangkan.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Teksi caj RM3 tambang minimum tambah RM2 setiap km. Tulis rumus tambang F bagi k km.",
        answer: "F = 3 + 2k",
      },
      mistake: {
        wrong: "Mengenakan diskaun hanya pada SEBAHAGIAN jumlah.",
        right: "Jumlahkan harga PENUH dahulu, KEMUDIAN diskaun jumlah gabungan sekali.",
      },
      practice: {
        easy: {
          question: "Tulis rumus perimeter P segi empat tepat, panjang l, lebar w.",
          answer: "P = 2l + 2w",
        },
        medium: {
          question:
            "Pelan telefon: RM30 asas, 5GB percuma, RM4/GB tambahan. Rumus bil B dengan g GB tambahan?",
          answer: "B = 30 + 4g",
        },
        hard: {
          question:
            "Kedai jual baju RMx, diskaun RM(x−5) semasa jualan. Tulis rumus jumlah T bila 3 baju dibeli semasa jualan.",
          answer: "T = 3(x−5)",
        },
      },
      realLife: ["💻 Hamparan", "📱 Pengebilan telefon"],
    },
    {
      slug: "changingSubject",
      title: "Menukar Perkara Rumus",
      ideaParagraphs: [
        "Fikirkan rumus sebagai neraca seimbang. Apa sahaja anda buat pada SATU belah, anda mesti buat pada belah SATU LAGI — itu kekalkan imbangan semasa anda alih benda untuk asingkan huruf berbeza.",
      ],
      visual: {
        kind: "balanceScale",
        caption:
          "Tambah m pada KEDUA-DUA belah, tolak nombor daripada KEDUA-DUA belah — neraca kekal rata sepanjang masa",
      },
      blocks: [
        {
          worked: {
            question: "Nyatakan m sebagai perkara: b = 2s − m",
            steps: [
              {
                calc: "b = 2s − m  →  b + m = 2s",
                why: "Tambah m pada kedua-dua belah — seperti tambah berat pada kedua-dua belah neraca.",
              },
              {
                calc: "m = 2s − b",
                why: "Tolak b daripada kedua-dua belah untuk tinggalkan m sendirian.",
              },
            ],
          },
        },
        {
          formula: { eyebrow: "Kuasa Dua dan Punca Saling Batal", formula: "s = p² ⟹ p = √s" },
          worked: {
            question: "Nyatakan p sebagai perkara: t = 1/p²",
            steps: [
              {
                calc: "t = 1/p²  →  tp² = 1",
                why: "Darab kedua-dua belah dengan p² untuk kosongkan pecahan.",
              },
              { calc: "p² = 1/t", why: "Bahagi kedua-dua belah dengan t." },
              { calc: "p = √(1/t)", why: "Cari punca kuasa dua kedua-dua belah untuk asingkan p." },
            ],
          },
        },
      ],
      guided: {
        question: "Nyatakan p sebagai perkara: w = p/3",
        answer: "Darab kedua-dua belah dengan 3: p = 3w.",
      },
      mistake: {
        wrong: "Membiarkan jawapan −m tanpa selesaikan kepada m POSITIF.",
        right: "Berakhir dengan −m? Darab KEDUA-DUA belah dengan −1 untuk tukar setiap tanda.",
      },
      practice: {
        easy: { question: "Nyatakan m sebagai perkara: q = m + p", answer: "m = q − p" },
        medium: { question: "Nyatakan p sebagai perkara: s = p²", answer: "p = √s" },
        hard: { question: "Nyatakan m sebagai perkara: a = 5/(2m)", answer: "m = 5/(2a)" },
      },
      realLife: ["🌡️ Penukaran suhu", "📊 Formula sains"],
    },
    {
      slug: "determiningValue",
      title: "Menentukan Nilai Pemboleh Ubah",
      ideaParagraphs: [
        "Sebaik anda ada nilai diketahui, masukkan ke dalam rumus, kemudian selesaikan yang tinggal.",
      ],
      blocks: [
        {
          worked: {
            question: "Diberi m = ¼(p − q)², cari q apabila m = 16 dan p = 3.",
            steps: [
              {
                calc: "16×4 = (3−q)²",
                why: "Darab kedua-dua belah dengan 4, kemudian gantikan m=16.",
              },
              { calc: "64 = (3−q)²", why: "Permudahkan." },
              { calc: "8 = 3 − q", why: "Cari punca kuasa dua kedua-dua belah." },
              { calc: "q = 3 − 8 = −5", why: "Susun semula untuk selesaikan q." },
            ],
          },
        },
      ],
      guided: {
        question: "Diberi w = 7t − 5u, cari t apabila w = 15 dan u = 4.",
        answer: "7t − 20 = 15. 7t = 35. t = 5.",
      },
      mistake: {
        wrong: "Cari punca kuasa dua sebahagian kurungan sahaja, bukan keseluruhan.",
        right: "Mencari punca kuasa dua bermaksud KESELURUHAN kurungan dicari bersama.",
      },
      practice: {
        easy: { question: "Diberi A = πr², cari A apabila r = 7 (π≈22/7).", answer: "A = 154" },
        medium: { question: "Diberi v = u + at, cari a apabila v=20, u=5, t=3.", answer: "a = 5" },
        hard: { question: "Diberi m = ¼(p − q)², cari p jika m = 9, q = −1.", answer: "p = 5" },
      },
      realLife: ["🚀 Formula fizik", "🏦 Pengiraan faedah"],
    },
    {
      slug: "solvingProblems",
      title: "Menyelesaikan Masalah",
      ideaParagraphs: [
        "Masalah sebenar tidak beri rumus — anda bina satu. Namakan yang tidak diketahui dengan huruf, tukar cerita kepada persamaan, kemudian selesaikan.",
      ],
      blocks: [
        {
          worked: {
            question:
              "Ayam harga dua kali bun. Dengan RM5, Azman beli 2 bun dan 1 ayam, baki RM1. Dengan RM12 beli bun sama, berapa ayam mampu dibeli?",
            steps: [
              {
                calc: "Biar bun = RMx, ayam = RM2x",
                why: "Namakan yang tidak diketahui — ayam dua kali bun.",
              },
              {
                calc: "2x + 2x + 1 = 5  →  x = 1",
                why: "2 bun + 1 ayam + baki RM1 = RM5.",
              },
              {
                calc: "Dengan RM12: 2 bun = RM2, tinggal RM10 → 5 ekor ayam",
                why: "Beli 2 bun sama dahulu, belanja baki pada ayam RM2 setiap satu.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Pakaian jual RMy, diskaun RM(y−8). 5 item kos RM60. Cari y.",
        answer: "5(y−8) = 60. y−8 = 12. y = 20.",
      },
      mistake: {
        wrong: "Terus ke pengiraan tanpa tentukan maksud huruf anda.",
        right: 'Sentiasa tulis "Biar x = ..." dahulu.',
      },
      practice: {
        easy: {
          question:
            "Pen RM2 lebih daripada pensel. 3 pensel dan 2 pen kos RM19. Cari harga pensel.",
          answer: "RM3",
        },
        medium: {
          question:
            "Panjang segi empat tepat 3 cm lebih daripada lebar. Perimeter 26 cm. Cari lebar.",
          answer: "5 cm",
        },
        hard: { question: "B = 30 + 4g. Bil RM58. Berapa GB tambahan?", answer: "7 GB" },
      },
      realLife: ["🛍️ Beli-belah dan bajet"],
    },
  ],
  summary: {
    center: "Rumus Algebra",
    branches: [
      { title: "Membentuk", points: ["Terjemah cerita kepada persamaan"] },
      { title: "Menukar Perkara", points: ["Kaedah neraca sama"] },
      { title: "Menyelesaikan", points: ["Gantikan nilai diketahui"] },
    ],
  },
  formulaSheet: [
    { formula: "Perkara: sendirian, pekali 1", label: "" },
    { formula: "s = p² ⟹ p = √s", label: "" },
    { formula: "−m? Darab kedua-dua belah −1", label: "" },
  ],
  quickRevision: [
    "Saya boleh tulis rumus daripada situasi sebenar.",
    "Saya boleh tukar perkara, termasuk kuasa dua dan punca.",
    "Saya boleh gantikan dan selesaikan masalah rumus dunia sebenar.",
  ],
  examTips: [
    "Garis bawah setiap nombor dan perhubungan SEBELUM menulis algebra.",
    "Semak rumus disusun semula dengan masukkan semula nombor asal.",
  ],
  challenge: {
    question: "Ketinggian bola: h = 20t − 5t². Cari h apabila t=2.",
    answer: "h=20(2)−5(4)=40−20=20 m.",
  },
};

export const mathF2C3InteractiveContent: { en: MathF2C3Content; bm: MathF2C3Content } = { en, bm };
