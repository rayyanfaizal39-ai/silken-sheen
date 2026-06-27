import type { MindNode } from "@/components/MindMap";
import type { StructuredNotes } from "@/content/types";
import type { Flashcard, QuizQuestion } from "@/data/content";

type Fact = { context: string; text: string };
const SKIP_SECTIONS = new Set(["Pengenalan Bab", "Imbas Kembali"]);
const SKIP_SUBSECTIONS = new Set(["Tip mengingat", "Fokus UASA", "Rumusan", "Checklist subtopik", "Checklist akhir bab", "Cara ulang kaji pantas"]);

function clean(value: string) {
  return value.replace(/\s+/g, " ").replace(/^[-•✓*]+\s*/, "").trim();
}

function usable(value: string) {
  const text = clean(value);
  return text.length >= 18 && text.length <= 320 && !/^\d+(\.\d+)?\s+[^.]+$/.test(text);
}

function collectFacts(notes: StructuredNotes): Fact[] {
  const candidates: Fact[] = [];
  for (const section of notes.sections) {
    if (SKIP_SECTIONS.has(section.title)) continue;
    for (const subsection of section.subsections ?? []) {
      const context = clean(subsection.title ?? section.title);
      if (SKIP_SUBSECTIONS.has(context)) continue;
      if (subsection.content && usable(subsection.content)) candidates.push({ context, text: clean(subsection.content) });
      for (const point of subsection.bulletPoints ?? []) {
        if (usable(point)) candidates.push({ context, text: clean(point) });
      }
      for (const row of subsection.table?.rows ?? []) {
        const text = clean(row.filter(Boolean).join(": "));
        if (usable(text)) candidates.push({ context, text });
      }
      if (subsection.formula && usable(subsection.formula)) candidates.push({ context, text: clean(subsection.formula) });
    }
  }
  for (const text of [...notes.quickRevision, ...notes.keyExamFacts]) {
    if (usable(text)) candidates.push({ context: "Fakta penting bab", text: clean(text) });
  }
  const seen = new Set<string>();
  return candidates.filter(({ text }) => {
    const key = text.toLocaleLowerCase("ms");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildGeographyF3MindMap(chapter: number, title: string, notes: StructuredNotes): MindNode {
  return {
    id: "root",
    label: title,
    children: notes.sections.filter((section) => !SKIP_SECTIONS.has(section.title)).map((section, si) => ({
      id: `c${chapter}-s${si + 1}`,
      label: section.title,
      children: (section.subsections ?? []).filter((subsection) => !SKIP_SUBSECTIONS.has(subsection.title ?? "")).map((subsection, ni) => {
        const facts: string[] = [];
        if (subsection.content && usable(subsection.content)) facts.push(clean(subsection.content));
        for (const point of subsection.bulletPoints ?? []) if (usable(point)) facts.push(clean(point));
        for (const row of subsection.table?.rows ?? []) {
          const text = clean(row.filter(Boolean).join(": "));
          if (usable(text)) facts.push(text);
        }
        return {
          id: `c${chapter}-s${si + 1}-n${ni + 1}`,
          label: subsection.title ?? section.title,
          children: facts.slice(0, 10).map((fact, fi) => ({ id: `c${chapter}-s${si + 1}-n${ni + 1}-f${fi + 1}`, label: fact })),
        };
      }),
    })),
  };
}

export function buildGeographyF3Flashcards(chapter: number, notes: StructuredNotes): Flashcard[] {
  const facts = collectFacts(notes);
  const contextCounts = new Map<string, number>();
  return facts.slice(0, 60).map(({ context, text }, index) => {
    const count = (contextCounts.get(context) ?? 0) + 1;
    contextCounts.set(context, count);
    const deck = Math.floor(index / 20) + 1;
    const prompt = deck === 1 ? `Apakah fakta utama tentang ${context}?` : deck === 2 ? `Bagaimanakah ${context} diterangkan dalam buku teks?` : `Apakah perkara penting yang perlu diingat tentang ${context}?`;
    return {
      id: `geo-f3-c${chapter}-f${index + 1}`,
      subjectId: "geography",
      form: "Form 3",
      chapter: `Chapter ${chapter}`,
      front: count === 1 ? prompt : `${prompt} (Fakta ${count})`,
      back: text,
    };
  });
}

export function buildGeographyF3Quizzes(chapter: number, notes: StructuredNotes): QuizQuestion[] {
  const facts = collectFacts(notes);
  return facts.slice(0, 30).map(({ context, text }, index) => {
    const answerIndex = index % 4;
    const options = [1, 2, 3].map((offset) => facts[(index + offset * 11) % facts.length].text);
    options.splice(answerIndex, 0, text);
    return {
      id: `geo-f3-c${chapter}-q${index + 1}`,
      subjectId: "geography",
      form: "Form 3",
      chapter: `Chapter ${chapter}`,
      difficulty: index < 10 ? "Easy" : index < 20 ? "Medium" : "Hard",
      question: `Antara berikut, yang manakah menerangkan ${context} dengan tepat?`,
      options,
      answerIndex,
      explanation: text,
    };
  });
}
