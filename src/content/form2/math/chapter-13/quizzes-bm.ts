import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = [
  {
    "no": "13.1",
    "title": "Kebarangkalian Eksperimen",
    "formula": "experimental probability = event frequency / total trials",
    "example": "28 heads in 50 tosses gives 14/25",
    "skill": "gunakan keputusan sebenar daripada percubaan"
  },
  {
    "no": "13.2",
    "title": "Ruang Sampel dan Peristiwa",
    "formula": "S = set of all possible outcomes",
    "example": "dice sample space is {1,2,3,4,5,6}",
    "skill": "senaraikan semua keputusan tanpa ulangan"
  },
  {
    "no": "13.3",
    "title": "Kebarangkalian Teori",
    "formula": "P(A) = n(A) / n(S)",
    "example": "even number on a dice has probability 3/6 = 1/2",
    "skill": "kira keputusan memihak dan jumlah keputusan"
  },
  {
    "no": "13.4",
    "title": "Peristiwa Pelengkap",
    "formula": "P(A') = 1 - P(A)",
    "example": "if P(win)=1/5, P(not win)=4/5",
    "skill": "tolak daripada 1"
  }
];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c13-bm-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 13",
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
      "Semakan akhir mengelakkan kesilapan lazim dalam Bab 13. Contoh rujukan: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C13QuizzesBM: QuizQuestion[] = buildQuiz(makeSeeds());
