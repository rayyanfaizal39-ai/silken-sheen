import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = [
  {
    "no": "11.1",
    "title": "Pantulan",
    "formula": "object and image are the same distance from mirror line",
    "example": "reflection in x-axis maps (x, y) to (x, -y)",
    "skill": "gunakan garis cermin dan jarak serenjang yang sama"
  },
  {
    "no": "11.2",
    "title": "Putaran",
    "formula": "rotation needs centre, angle and direction",
    "example": "90° clockwise about O changes orientation but not size",
    "skill": "nyatakan pusat, sudut dan arah"
  },
  {
    "no": "11.3",
    "title": "Translasi",
    "formula": "translation vector = (movement in x, movement in y)",
    "example": "vector (3, -2) moves 3 right and 2 down",
    "skill": "gerakkan setiap titik dengan vektor yang sama"
  },
  {
    "no": "11.4",
    "title": "Kekongruenan",
    "formula": "isometry preserves shape and size",
    "example": "object and image are congruent after reflection, rotation or translation",
    "skill": "semak bentuk sama dan saiz sama"
  }
];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c11-bm-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 11",
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
      "Semakan akhir mengelakkan kesilapan lazim dalam Bab 11. Contoh rujukan: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C11QuizzesBM: QuizQuestion[] = buildQuiz(makeSeeds());
