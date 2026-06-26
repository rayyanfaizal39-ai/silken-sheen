import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = [
  {
    "no": "3.1",
    "title": "Rumus Algebra",
    "formula": "subject of formula = variable written alone",
    "example": "A = lw, if l = 5 and w = 3 then A = 15",
    "skill": "gantikan nilai dengan tepat"
  },
  {
    "no": "3.2",
    "title": "Menukar Perkara Rumus",
    "formula": "if y = mx + c, then x = (y - c)/m",
    "example": "P = 2l + 2w, l = (P - 2w)/2",
    "skill": "gunakan operasi songsang pada kedua-dua belah"
  },
  {
    "no": "3.3",
    "title": "Aplikasi Rumus",
    "formula": "replace variables with given values",
    "example": "v = u + at, with u=4, a=2, t=5 gives v=14",
    "skill": "kenal pasti pemboleh ubah dan unit"
  }
];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c3-bm-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 3",
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
      "Semakan akhir mengelakkan kesilapan lazim dalam Bab 3. Contoh rujukan: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C3QuizzesBM: QuizQuestion[] = buildQuiz(makeSeeds());
