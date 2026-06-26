import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = [
  {
    "no": "2.1",
    "title": "Kembangan",
    "formula": "a(b + c) = ab + ac",
    "example": "3x(2x - 5) = 6x^2 - 15x",
    "skill": "darab setiap sebutan dalam kurungan"
  },
  {
    "no": "2.2",
    "title": "Pemfaktoran Ungkapan Algebra",
    "formula": "a^2 - b^2 = (a + b)(a - b)",
    "example": "x^2 + 5x + 6 = (x + 2)(x + 3)",
    "skill": "faktorkan menggunakan FSTB, beza dua kuasa dua atau kaedah silang"
  },
  {
    "no": "2.3",
    "title": "Pendaraban dan Pembahagian Pecahan Algebra",
    "formula": "a/b ÷ c/d = a/b x d/c",
    "example": "(2x)/5 ÷ (4x^2)/15 = 3/(2x)",
    "skill": "faktorkan, batalkan faktor sepunya dan darab"
  },
  {
    "no": "2.4",
    "title": "Penambahan dan Penolakan Pecahan Algebra",
    "formula": "a/c + b/c = (a + b)/c",
    "example": "x/3 + x/4 = 7x/12",
    "skill": "gunakan GSTK sebelum menambah atau menolak"
  }
];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c2-bm-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 2",
    lang: "bm",
    question,
    options,
    answerIndex,
    explanation,
  }));
}

function topic(index: number) {
  return topics[index % topics.length];
}

function makeSeeds(): QuizSeed[] {
  const seeds: QuizSeed[] = [];
  for (let i = 0; i < 30; i++) {
    const t = topic(i);
    seeds.push([
      "Easy",
      `Apakah fokus utama ${t.no} ${t.title}? (Semakan ${i + 1})`,
      [
        t.skill,
        `menyalin tajuk tanpa pengiraan`,
        `menukar semua nilai kepada sifar`,
        `mengabaikan maklumat diberi`,
      ],
      0,
      `Subtopik ini menekankan kemahiran untuk ${t.skill}.`,
    ]);
  }
  for (let i = 0; i < 30; i++) {
    const t = topic(i + 1);
    seeds.push([
      "Medium",
      `Formula manakah yang paling sesuai untuk ${t.no} ${t.title}? (Latihan ${i + 1})`,
      [
        t.formula,
        `jawapan = soalan / tajuk`,
        `jumlah = 0 untuk semua kes`,
        `nilai akhir = nilai awal sahaja`,
      ],
      0,
      `Formula yang sepadan ialah ${t.formula}; kemudian gantikan nilai yang diberi.`,
    ]);
  }
  for (let i = 0; i < 30; i++) {
    const t = topic(i + 2);
    seeds.push([
      "Hard",
      `Dalam soalan berayat ${t.no} ${t.title}, apakah semakan terbaik selepas mendapat jawapan? (Cabaran ${i + 1})`,
      [
        `semak formula, tanda, unit dan bentuk termudah`,
        `padam semua langkah kerja`,
        `pilih pilihan paling panjang`,
        `tukar topik kepada bab lain`,
      ],
      0,
      "Semakan akhir mengelakkan kesilapan lazim dalam Bab 2. Contoh rujukan: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C2QuizzesBM: QuizQuestion[] = buildQuiz(makeSeeds());
