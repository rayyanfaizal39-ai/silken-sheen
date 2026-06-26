import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = [
  {
    "no": "5.1",
    "title": "Sifat Bulatan",
    "formula": "diameter = 2 x radius",
    "example": "radius 7 cm gives diameter 14 cm",
    "skill": "kenal pusat, jejari, diameter, perentas, lengkok dan sektor"
  },
  {
    "no": "5.2",
    "title": "Lilitan Bulatan",
    "formula": "C = 2πr = πd",
    "example": "r = 7 cm, C = 44 cm using π = 22/7",
    "skill": "pilih formula jejari atau diameter dengan betul"
  },
  {
    "no": "5.3",
    "title": "Luas Bulatan",
    "formula": "A = πr^2",
    "example": "r = 7 cm, A = 154 cm^2 using π = 22/7",
    "skill": "kuasakan dua jejari sebelum mendarab pi"
  }
];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c5-bm-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 5",
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
      "Semakan akhir mengelakkan kesilapan lazim dalam Bab 5. Contoh rujukan: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C5QuizzesBM: QuizQuestion[] = buildQuiz(makeSeeds());
