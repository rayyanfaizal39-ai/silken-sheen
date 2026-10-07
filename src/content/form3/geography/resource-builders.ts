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
  if (/^[\\d.,\\s()+\\-÷×/%°]+(?:mm|cm|m|km|°C|orang|tahun|hektar|juta)?\\.?$/i.test(text)) {
    return "number";
  }
  if (/[=÷×]/.test(text)) return "formula";
  if ((text.match(/,/g) ?? []).length >= 2 || (/\\b(?:dan|serta)\\b/.test(text) && text.length < 150)) {
    return "list";
  }
  if (text.length <= 35) return "short";
  if (text.length <= 85) return "medium";
  return "long";
}

const QUESTION_STOPWORDS = new Set([
  "apakah",
  "yang",
  "manakah",
  "antara",
  "berikut",
  "dalam",
  "bagi",
  "pada",
  "kepada",
  "daripada",
  "dengan",
  "dan",
  "atau",
  "untuk",
  "satu",
  "dua",
  "tiga",
  "empat",
  "lima",
  "enam",
  "nyatakan",
  "namakan",
  "berikan",
  "terangkan",
  "jelaskan",
  "sebutkan",
  "adakah",
  "ialah",
  "adalah",
  "itu",
  "ini",
]);

function questionTokens(question: string) {
  return clean(question)
    .toLocaleLowerCase("ms")
    .replace(/[^a-z0-9À-ž°]+/gi, " ")
    .split(/\\s+/)
    .filter((token) => token.length >= 3 && !QUESTION_STOPWORDS.has(token));
}

const DOMAIN_TERMS = [
  "tanih", "iklim", "hutan", "flora", "fauna", "hidupan", "saliran", "tumbuhan",
  "gurun", "monsun", "ekosistem", "akar", "pokok", "pulau", "negara", "negeri",
  "bandar", "kawasan", "pertanian", "perkilangan", "perindustrian", "pelancongan",
  "sektor", "kegiatan", "ekonomi", "sumber", "mineral", "petroleum", "gas", "arang",
  "tenaga", "agensi", "jabatan", "organisasi", "taman", "ramsar", "geopark",
  "pemeliharaan", "pemuliharaan", "kitar", "semula", "reduce", "reuse", "recycle",
  "jerman", "denmark", "sweden", "taiwan", "sisa", "carta", "graf", "jadual",
  "paksi", "sudut", "peratus", "skala",
] as const;

function questionDomains(question: string) {
  const q = clean(question).toLocaleLowerCase("ms");
  return new Set(DOMAIN_TERMS.filter((term) => q.includes(term)));
}

function domainOverlap(a: Set<string>, b: Set<string>) {
  let overlap = 0;
  for (const term of a) if (b.has(term)) overlap += 1;
  return overlap;
}

function singleNumberParts(value: string) {
  const matches = [...value.matchAll(/-?\d+(?:\.\d+)?/g)];
  if (matches.length !== 1) return null;

  const match = matches[0];
  const raw = match[0];
  const number = Number(raw);
  if (!Number.isFinite(number) || match.index === undefined) return null;

  return {
    number,
    raw,
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + raw.length),
  };
}

function numericDistractors(answer: string) {
  const parts = singleNumberParts(answer);
  if (!parts) return null;

  const { number, raw, prefix, suffix } = parts;
  const isInteger = !raw.includes(".");
  const decimals = isInteger ? 0 : raw.split(".")[1].length;

  let candidates: number[];
  if (number >= 1900 && number <= 2100 && isInteger) {
    candidates = [number - 1, number + 1, number + 2];
  } else if (Math.abs(number) <= 10) {
    const step = isInteger ? 1 : Math.max(0.05, 10 ** -decimals);
    candidates = [number - step, number + step, number + step * 2];
  } else if (Math.abs(number) <= 100) {
    const step = isInteger ? 5 : Math.max(0.1, 10 ** -decimals * 5);
    candidates = [number - step, number + step, number + step * 2];
  } else {
    const step = Math.max(1, Math.round(Math.abs(number) * 0.1));
    candidates = [number - step, number + step, number + step * 2];
  }

  const formatted = candidates
    .filter((candidate) => candidate >= 0)
    .map((candidate) => {
      const rendered = isInteger ? String(Math.round(candidate)) : candidate.toFixed(decimals);
      return clean(`${prefix}${rendered}${suffix}`);
    })
    .filter((candidate) => candidate !== clean(answer));

  return uniqueStrings(formatted).slice(0, 3);
}

type QuestionTag =
  | "definition"
  | "location"
  | "number"
  | "date"
  | "example"
  | "role"
  | "cause"
  | "effect"
  | "type"
  | "agency"
  | "process"
  | "comparison"
  | "classification"
  | "general";

function questionTags(question: string): Set<QuestionTag> {
  const q = clean(question).toLocaleLowerCase("ms");
  const tags = new Set<QuestionTag>();

  if (/maksud|definisi|apa itu|apakah itu/.test(q)) tags.add("definition");
  if (/di mana|dimanakah|terletak|lokasi|negara|negeri|kawasan/.test(q)) tags.add("location");
  if (/berapa|berapakah|peratus|sudut|jumlah|keluasan|ketinggian|nilai/.test(q)) tags.add("number");
  if (/bilakah|tahun|tarikh|mulai/.test(q)) tags.add("date");
  if (/contoh|namakan|senaraikan|sebutkan|berikan/.test(q)) tags.add("example");
  if (/fungsi|peranan|kepentingan|tujuan|kegunaan|sumbangan/.test(q)) tags.add("role");
  if (/mengapa|faktor|sebab/.test(q)) tags.add("cause");
  if (/kesan|akibat|menjejaskan|mengancam/.test(q)) tags.add("effect");
  if (/jenis|kategori/.test(q)) tags.add("type");
  if (/agensi|jabatan|organisasi|badan|singkatan/.test(q)) tags.add("agency");
  if (/bagaimana|bagaimanakah|cara|langkah|proses|kaedah/.test(q)) tags.add("process");
  if (/beza|perbezaan|banding|lebih|kurang/.test(q)) tags.add("comparison");
  if (/dikategorikan|dikaitkan|sinonim|merujuk|tergolong/.test(q)) tags.add("classification");

  if (tags.size === 0) tags.add("general");
  return tags;
}

function tagOverlap(a: Set<QuestionTag>, b: Set<QuestionTag>) {
  let overlap = 0;
  for (const tag of a) if (b.has(tag)) overlap += 1;
  return overlap;
}

function tokenOverlap(a: string[], b: string[]) {
  const right = new Set(b);
  return a.reduce((score, token) => score + (right.has(token) ? 1 : 0), 0);
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
  if (front.length < 12 || front.length > 190 || back.length < 1 || back.length > 220) return false;
  if (/^(Senaraikan|Nyatakan|Berikan|Namakan|Sebutkan)\s+(?:dua|tiga|empat|lima|enam)\b/i.test(front)) {
    return false;
  }
  if (/^Adakah\b/i.test(front)) return false;
  if (/\b(?:pilih satu|atau)\b/i.test(back) && back.length > 70) return false;
  if ((back.match(/-?\d+(?:\.\d+)?/g) ?? []).length > 1 && /berapa|berapakah|bilakah|tahun/i.test(front)) {
    return false;
  }
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

function distractorScore(correctCard: Flashcard, candidate: Flashcard) {
  const correctQuestion = clean(correctCard.front);
  const candidateQuestion = clean(candidate.front);
  const correctAnswer = clean(correctCard.back);
  const candidateAnswer = clean(candidate.back);

  const correctTags = questionTags(correctQuestion);
  const candidateTags = questionTags(candidateQuestion);
  const tags = tagOverlap(correctTags, candidateTags);
  const tokens = tokenOverlap(questionTokens(correctQuestion), questionTokens(candidateQuestion));
  const kindMatch = answerKind(correctAnswer) === answerKind(candidateAnswer) ? 1 : 0;

  const correctDomains = questionDomains(correctQuestion);
  const candidateDomains = questionDomains(candidateQuestion);
  const domains = domainOverlap(correctDomains, candidateDomains);

  const answerLengthPenalty = Math.abs(candidateAnswer.length - correctAnswer.length) / 35;
  const tagBonus = tags * 14;
  const tokenBonus = tokens * 5;
  const kindBonus = kindMatch * 8;
  const domainBonus = domains * 35;
  const domainMismatchPenalty = correctDomains.size > 0 && domains === 0 ? 45 : 0;

  return tagBonus + tokenBonus + kindBonus + domainBonus - domainMismatchPenalty - answerLengthPenalty;
}

function buildOptions(cards: Flashcard[], correctCard: Flashcard, seed: number) {
  const correct = clean(correctCard.back);
  const numeric = numericDistractors(correct);

  let distractors: string[] = [];
  if (
    numeric?.length === 3 &&
    /berapa|berapakah|bilakah|peratus|sudut|jumlah|keluasan|ketinggian|nilai|tahun/i.test(correctCard.front)
  ) {
    distractors = numeric;
  } else {
    const correctDomains = questionDomains(correctCard.front);
    const candidates = cards
      .filter((card) => card !== correctCard)
      .map((card) => ({
        card,
        answer: clean(card.back),
        score: distractorScore(correctCard, card),
        domainMatches: domainOverlap(correctDomains, questionDomains(card.front)),
      }))
      .filter(({ answer }) => answer && answer.toLocaleLowerCase("ms") !== correct.toLocaleLowerCase("ms"))
      .sort((a, b) => b.score - a.score);

    const preferred =
      correctDomains.size > 0
        ? candidates.filter((candidate) => candidate.domainMatches > 0)
        : candidates;

    for (const candidate of [...preferred, ...candidates]) {
      const key = candidate.answer.toLocaleLowerCase("ms");
      if (distractors.some((value) => value.toLocaleLowerCase("ms") === key)) continue;
      distractors.push(candidate.answer);
      if (distractors.length === 3) break;
    }
  }

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
  if (suitable.length < 30) {
    throw new Error(
      `Geography Form 3 Chapter ${chapter} has only ${suitable.length} quiz-suitable flashcards; 30 are required.`,
    );
  }

  const selected = evenlySpaced(suitable, 30);

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
