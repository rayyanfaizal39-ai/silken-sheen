import type { MindNode } from "@/components/MindMap";
import { scienceF3Chapters } from "./chapter-data";

type Lang = "bm" | "dlp";

function chapterSource(chapter: number) {
  const source = scienceF3Chapters.find((item) => item.chapter === chapter);
  if (!source) throw new Error(`Missing Science Form 3 Chapter ${chapter} source`);
  return source;
}

function text(value: { bm: string; dlp: string }, lang: Lang) {
  return value[lang];
}

function node(id: string, label: string, children: MindNode[] = []): MindNode {
  return { id, label, ...(children.length ? { children } : {}) };
}

export function buildScienceF3MindMap(chapter: number, lang: Lang): MindNode {
  const source = chapterSource(chapter);
  const children = source.subtopics.map((subtopic, subIndex) =>
    node(
      `c${chapter}-${subIndex + 1}`,
      `${subtopic.number} ${text(subtopic.title, lang)}`,
      [
        node(
          `c${chapter}-${subIndex + 1}-intro`,
          lang === "bm" ? "Penerangan ringkas" : "Short explanation",
          [node(`c${chapter}-${subIndex + 1}-intro-1`, text(subtopic.introduction, lang))],
        ),
        node(
          `c${chapter}-${subIndex + 1}-facts`,
          lang === "bm" ? "Fakta penting" : "Key facts",
          subtopic.facts.map((fact, factIndex) =>
            node(
              `c${chapter}-${subIndex + 1}-fact-${factIndex + 1}`,
              `${text(fact.term, lang)}: ${text(fact.statement, lang)}`,
            ),
          ),
        ),
      ],
    ),
  );

  return node(`science-f3-c${chapter}-${lang}`, source.title[lang], children);
}
