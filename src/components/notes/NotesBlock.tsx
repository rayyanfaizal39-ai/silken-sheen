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

export function NotesBlock({ notes, id }: { notes: StructuredNotes; id?: string }) {
  const [query, setQuery] = useState("");

  const filteredSections = useMemo(() => {
    if (!query.trim()) return notes.sections;
    const q = query.trim().toLowerCase();
    return notes.sections
      .map((section) => {
        const sectionMatches = section.title.toLowerCase().includes(q);
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
      .filter(Boolean) as ScienceNotesSection[];
  }, [notes, query]);

  return (
    <div id={id} className="glass-strong rounded-[2rem] border border-white/10 p-6 mb-8 animate-fade-up scroll-mt-24">
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

        {filteredSections.length === 0 ? (
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-6 text-sm text-rose-100">
            No matching notes found. Try a different keyword.
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {filteredSections.map((section) => (
              <AccordionItem
                key={section.title}
                value={section.title}
                className="rounded-3xl border border-white/10 bg-slate-950/80 p-4"
              >
                <AccordionTrigger>{section.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-2">
                    {section.subsections?.map((sub, index) => (
                      <div key={`${section.title}-${index}`} className="space-y-4">
                        {sub.title && <h3 className="text-xl font-semibold">{sub.title}</h3>}
                        {sub.content && (
                          <p className="text-sm leading-7 text-slate-300">{sub.content}</p>
                        )}
                        {sub.bulletPoints && (
                          <ul className="list-disc list-inside space-y-2 text-sm leading-7 text-slate-300">
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
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

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
      </div>
    </div>
  );
}
