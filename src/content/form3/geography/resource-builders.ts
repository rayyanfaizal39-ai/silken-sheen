import type { MindNode } from "@/components/MindMap";
import type { StructuredNotes } from "@/content/types";
import type { Flashcard, QuizQuestion } from "@/data/content";

type Fact = {
  section: string;
  context: string;
  text: string;
};

const SKIP_SECTIONS = new Set(["Pengenalan Bab", "Imbas Kembali"]);
const SKIP_SUBSECTIONS = new Set([
  "Tip mengingat",
  "Fokus UASA",
  "Rumusan",
  "Checklist subtopik",
  "Checklist akhir bab",
  "Cara ulang kaji pantas",
]);

const FACT_PRIORITY = [
  "Fakta penting",
  "Konsep utama",
  "Definisi",
  "Penerangan lengkap",
  "Proses / langkah penting",
  "Pengenalan",
];

function clean(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/^[-•✓*]+\s*/, "")
    .replace(/\s*\(Sumber:[^)]+\)\s*/gi, " ")
    .trim();
}

function stripNumbering(value: string) {
  return clean(value)
    .replace(/^\d+(?:\.\d+)*\s*[-.:]?\s*/, "")
    .replace(/^Bab\s+\d+\s*[-.:]?\s*/i, "")
    .trim();
}

function looksBroken(value: string) {
  const text = clean(value);
  if (!text) return true;
  if (/KSSM_\d+|\.indd\b|10\/\d+\/\d+/i.test(text)) return true;
  if (/^(Sumber|Rajah|Jadual)\s*[:.]?\s*$/i.test(text)) return true;
  if (/\b(?:yang|dan|atau|di|ke|daripada|dengan|secara|seramai|sebanyak|seperti)\s*$/i.test(text)) return true;
  if (/^[\d.\s]+$/.test(text)) return true;
  return false;
}

function usable(value: string, max = 280) {
  const text = clean(value);
  return text.length >= 18 && text.length <= max && !looksBroken(text);
}

function uniqueStrings(values: string[]) {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = clean(value).toLocaleLowerCase("ms");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function shortenFact(value: string, max = 118) {
  const text = clean(value);
  if (text.length <= max) return text;

  const sentence = text.split(/(?<=[.!?])\s+/)[0];
  if (sentence.length >= 24 && sentence.length <= max) return sentence;

  const clauses = text.split(/\s*[;:]\s*/);
  if (clauses[0]?.length >= 24 && clauses[0].length <= max) return clauses[0];

  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, Math.max(lastSpace, 60)).trim()}…`;
}

function subsectionFacts(subsection: NonNullable<StructuredNotes["sections"][number]["subsections"]>[number]) {
  const values: string[] = [];
  if (subsection.content && usable(subsection.content)) values.push(clean(subsection.content));

  for (const point of subsection.bulletPoints ?? []) {
    if (usable(point)) values.push(clean(point));
  }

  for (const row of subsection.table?.rows ?? []) {
    const text = clean(row.filter(Boolean).join(": "));
    if (usable(text)) values.push(text);
  }

  if (subsection.formula && usable(subsection.formula)) values.push(clean(subsection.formula));
  return uniqueStrings(values);
}

function collectFacts(notes: StructuredNotes): Fact[] {
  const candidates: Fact[] = [];

  for (const section of notes.sections) {
    if (SKIP_SECTIONS.has(section.title)) continue;
    const sectionName = stripNumbering(section.title);

    for (const subsection of section.subsections ?? []) {
      const context = stripNumbering(subsection.title ?? section.title);
      if (SKIP_SUBSECTIONS.has(subsection.title ?? "")) continue;

      for (const text of subsectionFacts(subsection)) {
        candidates.push({ section: sectionName, context, text });
      }
    }
  }

  const seen = new Set<string>();
  return candidates.filter(({ text }) => {
    const key = clean(text).toLocaleLowerCase("ms");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mindMapFactsForSection(section: StructuredNotes["sections"][number]) {
  const subsections = section.subsections ?? [];
  const ordered = [...subsections].sort((a, b) => {
    const ai = FACT_PRIORITY.indexOf(a.title ?? "");
    const bi = FACT_PRIORITY.indexOf(b.title ?? "");
    const ar = ai === -1 ? FACT_PRIORITY.length : ai;
    const br = bi === -1 ? FACT_PRIORITY.length : bi;
    return ar - br;
  });

  const values: string[] = [];
  for (const subsection of ordered) {
    if (SKIP_SUBSECTIONS.has(subsection.title ?? "")) continue;
    values.push(...subsectionFacts(subsection));
  }

  return uniqueStrings(values)
    .map((value) => shortenFact(value))
    .filter((value) => usable(value, 140))
    .slice(0, 6);
}

export function buildGeographyF3MindMap(
  chapter: number,
  title: string,
  notes: StructuredNotes,
): MindNode {
  return {
    id: "root",
    label: title,
    children: notes.sections
      .filter((section) => !SKIP_SECTIONS.has(section.title))
      .map((section, sectionIndex) => {
        const sectionLabel = stripNumbering(section.title);
        const facts = mindMapFactsForSection(section);

        return {
          id: `c${chapter}-s${sectionIndex + 1}`,
          label: sectionLabel,
          children: facts.map((fact, factIndex) => ({
            id: `c${chapter}-s${sectionIndex + 1}-f${factIndex + 1}`,
            label: fact,
          })),
        };
      })
      .filter((node) => node.children.length > 0),
  };
}

export function buildGeographyF3Flashcards(chapter: number, notes: StructuredNotes): Flashcard[] {
  const facts = collectFacts(notes);
  if (facts.length === 0) return [];

  const selected = Array.from({ length: Math.min(60, facts.length) }, (_, index) => {
    const position =
      facts.length <= 60 ? index : Math.round((index * (facts.length - 1)) / 59);
    return facts[position];
  });

  return selected.map(({ section, context, text }, index) => ({
    id: `geo-f3-c${chapter}-f${index + 1}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: `Chapter ${chapter}`,
    front:
      section === context
        ? `Apakah perkara penting tentang ${context}?`
        : `Apakah fakta penting tentang ${context} dalam topik ${section}?`,
    back: text,
  }));
}

function answerKind(answer: string) {
  const text = clean(answer);
  if (/^[\d.,\s()+\-÷×/%°]+(?:mm|cm|m|km|°C|orang|tahun)?\.?$/i.test(text)) return "number";
  if (/[=÷×]/.test(text)) return "formula";
  if ((text.match(/,/g) ?? []).length >= 2 || /\b(?:dan|serta)\b/.test(text) && text.length < 150) return "list";
  if (text.length <= 35) return "short";
  if (text.length <= 85) return "medium";
  return "long";
}

function questionComplexity(front: string, back: string) {
  const question = front.toLocaleLowerCase("ms");
  let score = 0;

  if (/mengapa|bagaimanakah|huraikan|jelaskan|kesan|kepentingan|tujuan|fungsi|perbezaan|hubung|sebab/.test(question)) {
    score += 3;
  } else if (/apakah|di manakah|bilakah|siapakah|namakan/.test(question)) {
    score += 1;
  }

  if (/kira|formula|peratus|sudut|skala|tafsir|banding/.test(question)) score += 2;
  if (back.length > 90) score += 1;
  return score;
}

function quizSuitable(card: Flashcard) {
  const front = clean(card.front);
  const back = clean(card.back);

  if (!front.endsWith("?") && !front.includes("_____")) return false;
  if (front.length < 12 || front.length > 190 || back.length < 1 || back.length > 240) return false;
  if (/^(Senaraikan|Nyatakan|Berikan|Namakan)\s+(?:dua|tiga|empat|lima|enam)\b/i.test(front)) return false;
  return true;
}

function evenlySpaced<T>(items: T[], count: number) {
  if (items.length <= count) return [...items];
  const picked: T[] = [];
  const used = new Set<number>();

  for (let index = 0; index < count; index += 1) {
    let position = Math.round((index * (items.length - 1)) / (count - 1));
    while (used.has(position) && position + 1 < items.length) position += 1;
    used.add(position);
    picked.push(items[position]);
  }

  return picked;
}

function buildOptions(cards: Flashcard[], correctCard: Flashcard, seed: number) {
  const correct = clean(correctCard.back);
  const correctKind = answerKind(correct);
  const sourceIndex = cards.indexOf(correctCard);

  const ranked = cards
    .map((card, index) => ({
      card,
      index,
      answer: clean(card.back),
    }))
    .filter(({ card, answer }) => card !== correctCard && answer.toLocaleLowerCase("ms") !== correct.toLocaleLowerCase("ms"))
    .sort((a, b) => {
      const aKindPenalty = answerKind(a.answer) === correctKind ? 0 : 100;
      const bKindPenalty = answerKind(b.answer) === correctKind ? 0 : 100;
      const aDistance = Math.abs(a.index - sourceIndex);
      const bDistance = Math.abs(b.index - sourceIndex);
      const aLength = Math.abs(a.answer.length - correct.length) / 8;
      const bLength = Math.abs(b.answer.length - correct.length) / 8;
      return aKindPenalty + aDistance + aLength - (bKindPenalty + bDistance + bLength);
    });

  const distractors = uniqueStrings(ranked.map(({ answer }) => answer)).slice(0, 3);
  if (distractors.length < 3) {
    throw new Error(`Not enough unique distractors for Geography Form 3 quiz card: ${correctCard.id}`);
  }

  const options = [correct, ...distractors];
  const rotation = seed % 4;
  const rotated = [...options.slice(rotation), ...options.slice(0, rotation)];
  return {
    options: rotated,
    answerIndex: rotated.indexOf(correct),
  };
}

export function buildGeographyF3QuizzesFromFlashcards(
  chapter: number,
  flashcards: Flashcard[],
): QuizQuestion[] {
  const deduped = flashcards.filter((card, index, all) => {
    const frontKey = clean(card.front).toLocaleLowerCase("ms");
    const backKey = clean(card.back).toLocaleLowerCase("ms");
    return (
      all.findIndex(
        (candidate) =>
          clean(candidate.front).toLocaleLowerCase("ms") === frontKey &&
          clean(candidate.back).toLocaleLowerCase("ms") === backKey,
      ) === index
    );
  });

  const suitable = deduped.filter(quizSuitable);
  const source = suitable.length >= 30 ? suitable : deduped;
  const selected = evenlySpaced(source, Math.min(30, source.length));

  const ranked = [...selected]
    .map((card, index) => ({
      card,
      index,
      score: questionComplexity(card.front, card.back),
    }))
    .sort((a, b) => a.score - b.score || a.index - b.index);

  const difficultyById = new Map<string, "Easy" | "Medium" | "Hard">();
  ranked.forEach(({ card }, rank) => {
    difficultyById.set(card.id, rank < 10 ? "Easy" : rank < 20 ? "Medium" : "Hard");
  });

  return selected.map((card, index) => {
    const { options, answerIndex } = buildOptions(deduped, card, index);

    return {
      id: `geo-f3-c${chapter}-q${index + 1}`,
      subjectId: "geography",
      form: "Form 3",
      chapter: `Chapter ${chapter}`,
      lang: "bm",
      difficulty: difficultyById.get(card.id) ?? "Medium",
      question: clean(card.front),
      options,
      answerIndex,
      explanation: clean(card.back),
    };
  });
}

export function buildGeographyF3Quizzes(chapter: number, notes: StructuredNotes): QuizQuestion[] {
  const facts = collectFacts(notes);
  const selected = evenlySpaced(facts, Math.min(30, facts.length));

  return selected.map(({ section, context, text }, index) => {
    const sameSection = facts.filter(
      (fact) => fact.section === section && clean(fact.text) !== clean(text),
    );
    const fallback = facts.filter((fact) => clean(fact.text) !== clean(text));
    const distractorFacts = uniqueStrings(
      [...sameSection, ...fallback].map((fact) => clean(fact.text)),
    ).slice(0, 3);

    const answerIndex = index % 4;
    const options = [...distractorFacts];
    options.splice(answerIndex, 0, text);

    return {
      id: `geo-f3-c${chapter}-q${index + 1}`,
      subjectId: "geography",
      form: "Form 3",
      chapter: `Chapter ${chapter}`,
      lang: "bm",
      difficulty: index < 10 ? "Easy" : index < 20 ? "Medium" : "Hard",
      question:
        section === context
          ? `Antara berikut, yang manakah menerangkan ${context} dengan tepat?`
          : `Antara berikut, yang manakah tepat tentang ${context} dalam topik ${section}?`,
      options,
      answerIndex,
      explanation: text,
    };
  });
}
