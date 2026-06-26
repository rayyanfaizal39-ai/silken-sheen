import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = [
  {
    "no": "12.1",
    "title": "Min",
    "formula": "mean = sum of data / number of data",
    "example": "2, 4, 9 has mean 5",
    "skill": "jumlahkan semua nilai sebelum membahagi"
  },
  {
    "no": "12.2",
    "title": "Median",
    "formula": "median = middle value after data is arranged",
    "example": "3, 5, 8 has median 5",
    "skill": "susun data dahulu"
  },
  {
    "no": "12.3",
    "title": "Mod",
    "formula": "mode = value with highest frequency",
    "example": "2, 4, 4, 7 has mode 4",
    "skill": "kira kekerapan dengan teliti"
  },
  {
    "no": "12.4",
    "title": "Memilih Sukatan yang Sesuai",
    "formula": "outliers affect mean strongly",
    "example": "median may be better when data has an extreme value",
    "skill": "pilih min, median atau mod mengikut konteks"
  }
];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c12-bm-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 12",
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
      "Semakan akhir mengelakkan kesilapan lazim dalam Bab 12. Contoh rujukan: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C12QuizzesBM: QuizQuestion[] = buildQuiz(makeSeeds());
