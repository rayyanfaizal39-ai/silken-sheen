import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = [
  {
    "no": "6.1",
    "title": "Sifat Bentuk 3D",
    "formula": "faces, edges and vertices describe solids",
    "example": "cube: 6 faces, 12 edges, 8 vertices",
    "skill": "kira muka, tepi dan bucu secara sistematik"
  },
  {
    "no": "6.2",
    "title": "Bentangan Bentuk 3D",
    "formula": "net = flat pattern that folds into a solid",
    "example": "cube net has 6 congruent squares",
    "skill": "bayangkan lipatan tanpa muka bertindih"
  },
  {
    "no": "6.3",
    "title": "Luas Permukaan dan Isi Padu",
    "formula": "volume of prism = cross-sectional area x length",
    "example": "cuboid volume = l x w x h",
    "skill": "bezakan luas permukaan daripada isi padu"
  }
];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c6-bm-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 6",
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
      "Semakan akhir mengelakkan kesilapan lazim dalam Bab 6. Contoh rujukan: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C6QuizzesBM: QuizQuestion[] = buildQuiz(makeSeeds());
