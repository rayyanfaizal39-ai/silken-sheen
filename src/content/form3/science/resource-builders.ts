import type { Flashcard, QuizQuestion, ScienceChapter2Notes } from "@/data/content";
import { scienceF3Chapters, type ScienceF3ChapterSource } from "./chapter-data";

export type ScienceF3Language = "bm" | "dlp";

function chapterSource(chapter: number): ScienceF3ChapterSource {
  const source = scienceF3Chapters.find((item) => item.chapter === chapter);
  if (!source) throw new Error(`Missing Science Form 3 Chapter ${chapter} source`);
  return source;
}

function text(source: { bm: string; dlp: string }, lang: ScienceF3Language) {
  return source[lang];
}

export function buildScienceF3Notes(chapter: number, lang: ScienceF3Language): ScienceChapter2Notes {
  const source = chapterSource(chapter);
  const facts = source.subtopics.flatMap((subtopic) => subtopic.facts);
  return {
    chapterSummary: text(source.summary, lang),
    quickRevision: facts.slice(0, 10).map((fact) => text(fact.statement, lang)),
    keyTerms: facts.map((fact) => text(fact.term, lang)),
    keyExamFacts: facts.slice(10).map((fact) => text(fact.statement, lang)),
    sections: [
      {
        title: lang === "bm" ? "Mission Brief" : "Mission Brief",
        subsections: [
          { title: lang === "bm" ? "Situasi kehidupan sebenar" : "Real-life context", content: text(source.mission, lang) },
          { title: lang === "bm" ? "Mengapa bab ini penting" : "Why this chapter matters", content: text(source.whyItMatters, lang) },
        ],
      },
      {
        title: lang === "bm" ? "Objektif Pembelajaran" : "Learning Objectives",
        subsections: [{ bulletPoints: source.objectives.map((objective) => text(objective, lang)) }],
      },
      ...source.subtopics.map((subtopic) => ({
        title: `${subtopic.number} ${text(subtopic.title, lang)}`,
        subsections: [
          {
            title: lang === "bm" ? "Penerangan ringkas dan fakta penting" : "Short explanation and key facts",
            content: text(subtopic.introduction, lang),
            bulletPoints: subtopic.facts.map((fact) => `**${text(fact.term, lang)}** — ${text(fact.statement, lang)}`),
          },
          {
            title: lang === "bm" ? "Kata kunci" : "Keywords",
            table: {
              headers: lang === "bm" ? ["Istilah", "Maksud / fakta"] : ["Term", "Meaning / fact"],
              rows: subtopic.facts.map((fact) => [text(fact.term, lang), text(fact.statement, lang)]),
            },
          },
        ],
      })),
      {
        title: lang === "bm" ? "✅ Rumusan Bab" : "✅ Chapter Summary",
        subsections: [{ content: text(source.summary, lang), bulletPoints: facts.slice(0, 8).map((fact) => text(fact.statement, lang)) }],
      },
    ],
  };
}

export function buildScienceF3Quizzes(chapter: number, lang: ScienceF3Language): QuizQuestion[] {
  const source = chapterSource(chapter);
  const facts = source.subtopics.flatMap((subtopic) => subtopic.facts);
  const chapterKey = `Chapter ${chapter}`;
  return Array.from({ length: 30 }, (_, index) => {
    const factIndex = index % facts.length;
    const fact = facts[factIndex];
    const reverse = index >= facts.length;
    const answerIndex = index % 4;
    const distractorIndexes = [7, 11, 15].map((offset) => (factIndex + offset) % facts.length);
    const correct = reverse ? text(fact.term, lang) : text(fact.statement, lang);
    const distractors = distractorIndexes.map((item) => reverse ? text(facts[item].term, lang) : text(facts[item].statement, lang));
    const options = [...distractors];
    options.splice(answerIndex, 0, correct);
    return {
      id: `sci-f3-c${chapter}-${lang}-q${index + 1}`,
      subjectId: "science",
      form: "Form 3",
      chapter: chapterKey,
      lang,
      difficulty: index < 10 ? "Easy" : index < 20 ? "Medium" : "Hard",
      question: reverse
        ? (lang === "bm" ? `Istilah manakah sepadan dengan fakta berikut: ${text(fact.statement, lang)}` : `Which term matches this fact: ${text(fact.statement, lang)}`)
        : (lang === "bm" ? `Pernyataan manakah menerangkan ${text(fact.term, lang)} dengan tepat?` : `Which statement accurately explains ${text(fact.term, lang)}?`),
      options,
      answerIndex,
      explanation: `${text(fact.term, lang)}: ${text(fact.statement, lang)}`,
    };
  });
}

export function buildScienceF3Flashcards(chapter: number, lang: ScienceF3Language): Flashcard[] {
  const source = chapterSource(chapter);
  const facts = source.subtopics.flatMap((subtopic) => subtopic.facts);
  return Array.from({ length: 60 }, (_, index) => {
    const deck = Math.floor(index / 20);
    const fact = facts[index % facts.length];
    const term = text(fact.term, lang);
    const statement = text(fact.statement, lang);
    const front = deck === 0
      ? (lang === "bm" ? `Apakah ${term}?` : `What is ${term}?`)
      : deck === 1
        ? (lang === "bm" ? `Terangkan konsep: ${term}.` : `Explain the concept: ${term}.`)
        : (lang === "bm" ? `Apakah fakta penting yang perlu diingat tentang ${term}?` : `What key fact should you remember about ${term}?`);
    return {
      id: `sci-f3-c${chapter}-${lang}-f${index + 1}`,
      subjectId: "science",
      form: "Form 3",
      chapter: `Chapter ${chapter}`,
      lang,
      front,
      back: statement,
    };
  });
}
