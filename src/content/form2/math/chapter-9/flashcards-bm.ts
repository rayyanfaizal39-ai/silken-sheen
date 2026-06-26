import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "9.1",
    "title": "Laju",
    "formula": "speed = distance / time",
    "example": "120 km in 2 h gives 60 km/h",
    "skill": "gunakan unit jarak dan masa yang sepadan"
  },
  {
    "no": "9.2",
    "title": "Laju Purata",
    "formula": "average speed = total distance / total time",
    "example": "180 km in 3 h gives 60 km/h",
    "skill": "gunakan jumlah jarak dan jumlah masa"
  },
  {
    "no": "9.3",
    "title": "Pecutan",
    "formula": "acceleration = change in speed / time",
    "example": "from 10 m/s to 25 m/s in 5 s gives 3 m/s^2",
    "skill": "tolak laju awal daripada laju akhir"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c9-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 9",
    lang: "bm",
    front,
    back,
  }));
}

function topic(index: number) {
  return topics[index % topics.length];
}

function makeSeeds(): FlashcardSeed[] {
  const cards: FlashcardSeed[] = [];
  for (let i = 0; i < 20; i++) {
    const t = topic(i);
    cards.push([
      `Konsep ${t.no}: ${t.title} (${i + 1})`,
      `${t.title} memerlukan murid untuk ${t.skill}.`,
    ]);
  }
  for (let i = 0; i < 20; i++) {
    const t = topic(i + 1);
    cards.push([
      `Formula ${t.no}: ${t.title} (${i + 1})`,
      t.formula,
    ]);
  }
  for (let i = 0; i < 20; i++) {
    const t = topic(i + 2);
    cards.push([
      `Pola contoh ${t.no}: ${t.title} (${i + 1})`,
      `${t.example}. Petua: tulis formula, gantikan nilai, kemudian semak jawapan akhir.`,
    ]);
  }
  return cards;
}

export const mathF2C9FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
