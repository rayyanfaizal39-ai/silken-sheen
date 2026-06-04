import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ScienceNotesSection } from "@/data/content";
import type { StructuredNotes } from "@/content/types";

export type NotesAccordionSection = {
  id: string;
  title: string;
  content: string;
  keywords?: string[];
};

type DisplaySection = ScienceNotesSection & {
  id?: string;
  keywords?: string[];
};

export function NotesBlock({
  notes,
  sections,
  id,
}: {
  notes?: StructuredNotes;
  sections?: NotesAccordionSection[];
  id?: string;
}) {
  const [query, setQuery] = useState("");
  const displaySections = useMemo<DisplaySection[]>(
    () =>
      notes?.sections ??
      sections?.map((section) => ({
        id: section.id,
        title: section.title,
        content: section.content,
        keywords: section.keywords,
      })) ??
      [],
    [notes, sections],
  );

  const filteredSections = useMemo(() => {
    if (!query.trim()) return displaySections;
    const q = query.trim().toLowerCase();
    return displaySections
      .map((section) => {
        const sectionMatches = [section.title, section.content, ...(section.keywords ?? [])]
          .filter(Boolean)
          .some((text) => text!.toLowerCase().includes(q));
        const filteredSubsections =
          section.subsections?.filter((sub) => {
            const textMatches = [sub.title, sub.content, sub.formula]
              .filter(Boolean)
              .some((t) => t!.toLowerCase().includes(q));
            const bulletsMatch = sub.bulletPoints?.some((p) => p.toLowerCase().includes(q));
            const tableMatch =
              sub.table?.headers.some((h) => h.toLowerCase().includes(q)) ||
              sub.table?.rows.some((row) => row.some((cell) => cell.toLowerCase().includes(q)));
            return sectionMatches || textMatches || bulletsMatch || tableMatch;
          }) ?? [];
        if (sectionMatches) return section;
        if (filteredSubsections.length > 0) return { ...section, subsections: filteredSubsections };
        return null;
      })
      .filter(Boolean) as DisplaySection[];
  }, [displaySections, query]);

  return (
    <div
      id={id}
      className="glass-strong mx-auto mb-8 w-full max-w-5xl scroll-mt-24 rounded-[2rem] border border-white/10 p-4 animate-fade-up sm:p-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="font-display text-2xl font-bold">Notes</h2>
        <div className="w-full sm:max-w-sm">
          <label htmlFor="chapter-notes-search" className="sr-only">
            Search within these notes
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="chapter-notes-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search within these notes…"
              className="w-full rounded-full border border-white/10 bg-slate-950/80 py-3 pl-11 pr-4 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {!!notes?.quickRevision.length && (
          <div className="grid gap-4 sm:grid-cols-2">
            {notes.quickRevision.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-100 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        )}

        {filteredSections.length === 0 ? (
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-6 text-sm text-rose-100">
            No matching notes found. Try a different keyword.
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {filteredSections.map((section) => (
              <AccordionItem
                key={section.id ?? section.title}
                value={section.id ?? section.title}
                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 px-4 sm:px-5"
              >
                <AccordionTrigger className="py-5 text-left text-base font-bold hover:no-underline sm:text-lg">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 border-t border-white/10 pb-5 pt-5">
                    {section.content && (
                      <ReadableContent text={section.content} keywords={section.keywords ?? []} />
                    )}
                    {section.subsections?.map((sub, index) => (
                      <div key={`${section.title}-${index}`} className="space-y-4">
                        {sub.title && <h3 className="text-xl font-semibold">{sub.title}</h3>}
                        {sub.content && (
                          <ReadableContent text={sub.content} keywords={section.keywords ?? []} />
                        )}
                        {sub.bulletPoints && (
                          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300 marker:text-accent">
                            {sub.bulletPoints.map((p) => (
                              <li key={p}>{p}</li>
                            ))}
                          </ul>
                        )}
                        {sub.formula && (
                          <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-100">
                            <span className="font-medium text-cyan-200">Formula:</span>
                            <div className="mt-2 font-mono text-sm leading-6">{sub.formula}</div>
                          </div>
                        )}
                        {sub.table && (
                          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/70 p-2">
                            <table className="min-w-full text-left text-sm">
                              <thead>
                                <tr className="text-slate-300">
                                  {sub.table.headers.map((h) => (
                                    <th
                                      key={h}
                                      className="border-b border-white/10 px-3 py-2 font-semibold text-slate-200"
                                    >
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {sub.table.rows.map((row, ri) => (
                                  <tr
                                    key={`${ri}-${row[0]}`}
                                    className={ri % 2 === 0 ? "bg-white/5" : "bg-transparent"}
                                  >
                                    {row.map((cell, ci) => (
                                      <td
                                        key={ci}
                                        className="border-b border-white/10 px-3 py-2 text-slate-300"
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                    {!!section.keywords?.length && (
                      <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5">
                        {section.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="max-w-full break-words rounded-full border border-accent/30 bg-accent/20 px-3 py-1.5 text-xs text-accent"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {!!notes?.keyTerms?.length && (
          <div className="rounded-3xl border border-blue-500/15 bg-blue-500/10 p-6 text-slate-100">
            <h3 className="text-xl font-semibold text-white">Key Terms</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {notes.keyTerms.map((term) => (
                <span
                  key={term}
                  className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm font-medium text-slate-200"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        )}

        {!!notes?.keyExamFacts.length && (
          <div className="rounded-3xl border border-emerald-500/15 bg-emerald-500/10 p-6 text-slate-100">
            <h3 className="text-xl font-semibold text-white">Key Exam Facts</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {notes.keyExamFacts.map((fact) => (
                <div
                  key={fact}
                  className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-200"
                >
                  {fact}
                </div>
              ))}
            </div>
          </div>
        )}

        {notes?.chapterSummary && (
          <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6 text-slate-100 sm:p-8">
            <h3 className="font-display text-2xl font-bold text-white">Chapter Summary</h3>
            <p className="mt-4 text-base leading-8 text-slate-200">{notes.chapterSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ReadableContent({ text, keywords }: { text: string; keywords: string[] }) {
  const paragraphs = getReadableParagraphs(text);
  return (
    <div className="space-y-4 break-words text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
      {paragraphs.map((paragraph, index) => (
        <ContentParagraph
          key={`${index}-${paragraph.slice(0, 32)}`}
          paragraph={paragraph}
          keywords={keywords}
        />
      ))}
    </div>
  );
}

function ContentParagraph({ paragraph, keywords }: { paragraph: string; keywords: string[] }) {
  const isKeyInformation =
    paragraph.includes("=") ||
    paragraph.includes("→") ||
    /^(formula|rumus|rule|peraturan)\b/i.test(paragraph);
  if (isKeyInformation) {
    return (
      <p className="whitespace-pre-line rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-cyan-100">
        {highlight(paragraph, keywords)}
      </p>
    );
  }
  return <p className="whitespace-pre-line">{highlight(paragraph, keywords)}</p>;
}

function getReadableParagraphs(text: string) {
  const blocks = text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  return blocks.flatMap((block) => {
    if (block.includes("\n")) return [block];
    const sentences = block.match(/[^.!?]+[.!?]+(?:["')\]]+)?|[^.!?]+$/g)?.map((s) => s.trim());
    if (!sentences || sentences.length <= 3) return [block];
    const groups: string[] = [];
    for (let index = 0; index < sentences.length; index += 3) {
      groups.push(sentences.slice(index, index + 3).join(" "));
    }
    return groups;
  });
}

function highlight(text: string, keywords: string[]) {
  if (!keywords.length) return text;
  const escaped = keywords.map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`\\b(${escaped.join("|")})\\b`, "gi");
  return text.split(re).map((part, index) =>
    keywords.some((keyword) => part.toLowerCase() === keyword.toLowerCase()) ? (
      <mark key={index} className="rounded bg-accent/30 px-1 py-0.5 text-foreground not-italic">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}
