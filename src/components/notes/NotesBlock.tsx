import { useEffect, useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  Lightbulb,
  FlaskConical,
  Star,
  Zap,
  Hash,
  ChevronRight,
  GraduationCap,
  Target,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ScienceNotesSection, ScienceNotesSubsection } from "@/data/content";
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

// Colour palette rotated across sections for visual variety
const SECTION_ACCENTS = [
  { bg: "bg-blue-500/10",    border: "border-blue-500/20",    num: "bg-blue-500",   text: "text-blue-300" },
  { bg: "bg-purple-500/10",  border: "border-purple-500/20",  num: "bg-purple-500", text: "text-purple-300" },
  { bg: "bg-emerald-500/10", border: "border-emerald-500/20", num: "bg-emerald-500",text: "text-emerald-300" },
  { bg: "bg-amber-500/10",   border: "border-amber-500/20",   num: "bg-amber-500",  text: "text-amber-300" },
  { bg: "bg-pink-500/10",    border: "border-pink-500/20",    num: "bg-pink-500",   text: "text-pink-300" },
  { bg: "bg-cyan-500/10",    border: "border-cyan-500/20",    num: "bg-cyan-500",   text: "text-cyan-300" },
];

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
  const [openValue, setOpenValue] = useState<string | undefined>(undefined);
  const quickRevision = Array.isArray(notes?.quickRevision) ? notes.quickRevision : [];
  const keyTerms = Array.isArray(notes?.keyTerms) ? notes.keyTerms : [];
  const keyExamFacts = Array.isArray(notes?.keyExamFacts) ? notes.keyExamFacts : [];

  const displaySections = useMemo<DisplaySection[]>(() => {
    const structuredSections = Array.isArray(notes?.sections) ? notes.sections : undefined;
    if (structuredSections) return structuredSections;
    if (!Array.isArray(sections)) return [];
    return sections.map((section) => ({
      id: section.id,
      title: section.title,
      content: section.content,
      keywords: section.keywords,
    }));
  }, [notes, sections]);

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

  useEffect(() => {
    const first = filteredSections[0];
    if (!first) {
      setOpenValue(undefined);
      return;
    }
    const values = filteredSections.map((section) => section.id ?? section.title);
    setOpenValue((current) => (current && values.includes(current) ? current : values[0]));
  }, [filteredSections]);

  function jumpToSection(value: string) {
    setOpenValue(value);
    window.requestAnimationFrame(() => {
      document.getElementById(`notes-section-${value}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <div
      id={id}
      className="mx-auto mb-8 w-full max-w-5xl scroll-mt-24 rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 shadow-[0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl animate-fade-up overflow-hidden"
    >
      {/* ── Header bar ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 border-b border-white/[0.06] p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <BookOpen className="h-5 w-5 text-blue-300" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Study Notes</h2>
            {filteredSections.length > 0 && (
              <p className="text-xs text-[#94A3B8]">{filteredSections.length} section{filteredSections.length !== 1 ? "s" : ""}</p>
            )}
          </div>
        </div>
        <div className="w-full sm:max-w-sm">
          <label htmlFor="chapter-notes-search" className="sr-only">
            Search within these notes
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              id="chapter-notes-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes…"
              className="w-full rounded-full border border-white/[0.10] bg-[#050816]/80 py-3 pl-11 pr-4 text-sm text-white placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 p-4 sm:p-6">
        {/* ── Quick Revision Cards ───────────────────────────────── */}
        {quickRevision.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#FBBF24]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#FBBF24]">Quick Revision</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickRevision.map((item, i) => (
                <div
                  key={item}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#FBBF24]/5 to-transparent p-4 text-sm leading-7 text-slate-100 shadow-sm transition-all hover:border-[#FBBF24]/20 hover:-translate-y-0.5"
                >
                  <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-[#FBBF24] to-[#F59E0B] opacity-60" />
                  <div className="flex items-start gap-3 pl-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FBBF24]/20 text-[10px] font-bold text-[#FBBF24]">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Main sections ──────────────────────────────────────── */}
        {filteredSections.length === 0 ? (
          <div className="flex items-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6 text-sm text-rose-100">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
            No matching notes found. Try a different keyword.
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
            {/* Sticky nav */}
            <nav className="h-fit rounded-2xl border border-white/[0.06] bg-[#050816]/70 p-3 lg:sticky lg:top-24">
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B5CF6]">
                Sections
              </p>
              <div className="space-y-0.5">
                {filteredSections.map((section, i) => {
                  const value = section.id ?? section.title;
                  const active = openValue === value;
                  const accent = SECTION_ACCENTS[i % SECTION_ACCENTS.length];
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => jumpToSection(value)}
                      className={`group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs font-semibold leading-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                        active
                          ? `${accent.bg} ${accent.border} border text-white`
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded text-[8px] font-black text-white ${accent.num}`}
                      >
                        {i + 1}
                      </span>
                      <span className="flex-1 leading-tight">{section.title}</span>
                      {active && <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Accordion sections */}
            <Accordion
              type="single"
              collapsible
              value={openValue}
              onValueChange={setOpenValue}
              className="min-w-0 space-y-3"
            >
              {filteredSections.map((section, i) => {
                const value = section.id ?? section.title;
                const accent = SECTION_ACCENTS[i % SECTION_ACCENTS.length];
                return (
                  <AccordionItem
                    id={`notes-section-${value}`}
                    key={value}
                    value={value}
                    className={`scroll-mt-28 overflow-hidden rounded-2xl border ${
                      openValue === value
                        ? `${accent.border} ${accent.bg}`
                        : "border-white/[0.07] bg-[#050816]/60"
                    } transition-all`}
                  >
                    <AccordionTrigger className="px-4 py-4 text-left text-sm font-bold hover:no-underline sm:text-base [&[data-state=open]]:pb-0">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-black text-white ${accent.num}`}
                        >
                          {i + 1}
                        </span>
                        <span>{section.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-5 px-4 pb-5 pt-4">
                        {section.content && (
                          <ReadableContent
                            text={section.content}
                            keywords={section.keywords ?? []}
                          />
                        )}
                        {section.subsections?.map((sub, index) => (
                          <SubsectionBlock
                            key={`${section.title}-${index}`}
                            sub={sub}
                            keywords={section.keywords ?? []}
                            accentClass={accent.text}
                          />
                        ))}
                        {!!section.keywords?.length && (
                          <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
                            {section.keywords.map((keyword) => (
                              <span
                                key={keyword}
                                className="inline-flex items-center gap-1 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/15 px-3 py-1 text-xs font-medium text-[#A78BFA]"
                              >
                                <Hash className="h-2.5 w-2.5" />
                                {keyword}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}

        {/* ── Key Terms ─────────────────────────────────────────── */}
        {keyTerms.length > 0 && (
          <div className="rounded-2xl border border-blue-500/15 bg-gradient-to-br from-blue-500/8 to-indigo-500/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-blue-400" />
              <h3 className="font-bold text-blue-200">Key Terms</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {keyTerms.map((term) => (
                <span
                  key={term}
                  className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-200 transition-colors hover:bg-blue-500/20"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Key Exam Facts ────────────────────────────────────── */}
        {keyExamFacts.length > 0 && (
          <div className="rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/8 to-teal-500/5 p-5">
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-emerald-400" />
              <h3 className="font-bold text-emerald-200">Key Exam Facts</h3>
              <span className="ml-auto rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                Likely Tested
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {keyExamFacts.map((fact, i) => (
                <div
                  key={fact}
                  className="flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3 text-sm text-slate-200"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Chapter Summary ───────────────────────────────────── */}
        {notes?.chapterSummary && (
          <div className="rounded-2xl border border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/10 to-[#6366F1]/5 p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-[#A78BFA]" />
              <h3 className="font-display text-lg font-bold text-white">Chapter Summary</h3>
            </div>
            <p className="text-sm leading-8 text-slate-200 sm:text-base">{notes.chapterSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Subsection block ─────────────────────────────────────────────────────────
function SubsectionBlock({
  sub,
  keywords,
  accentClass,
}: {
  sub: ScienceNotesSubsection;
  keywords: string[];
  accentClass: string;
}) {
  return (
    <div className="space-y-3">
      {sub.title && (
        <h3 className={`flex items-center gap-2 text-base font-bold ${accentClass}`}>
          <span className="h-1 w-4 rounded-full bg-current opacity-60" />
          {sub.title}
        </h3>
      )}
      {sub.content && (
        <ReadableContent text={sub.content} keywords={keywords} />
      )}
      {Array.isArray(sub.bulletPoints) && sub.bulletPoints.length > 0 && (
        <ul className="space-y-2 pl-2">
          {sub.bulletPoints.map((p: string) => (
            <li key={p} className="flex items-start gap-2.5 text-sm leading-7 text-slate-200">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B5CF6]" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
      {sub.formula && (
        <div className="relative overflow-hidden rounded-xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-4">
          <div className="absolute right-3 top-3 rounded-full bg-cyan-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-300">
            Formula
          </div>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold text-cyan-300">
            <FlaskConical className="h-3.5 w-3.5" />
            Key Formula
          </div>
          <div className="mt-2 font-mono text-sm leading-7 text-cyan-100">{sub.formula}</div>
        </div>
      )}
      {sub.table &&
        Array.isArray(sub.table.headers) &&
        Array.isArray(sub.table.rows) && (
          <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                  {sub.table.headers.map((h: string) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-300"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sub.table.rows.map((row: string[], ri: number) => (
                  <tr
                    key={`${ri}-${row[0]}`}
                    className={`border-b border-white/[0.04] transition-colors hover:bg-white/[0.03] ${ri % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"}`}
                  >
                    {(Array.isArray(row) ? row : []).map((cell: string, ci: number) => (
                      <td
                        key={ci}
                        className="px-4 py-2.5 text-sm text-slate-300"
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
  );
}

// ─── Readable content with smart rendering ────────────────────────────────────
function ReadableContent({ text, keywords }: { text: string; keywords: string[] }) {
  const paragraphs = getReadableParagraphs(text);
  return (
    <div className="space-y-3 break-words text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
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
  const isFormula =
    paragraph.includes("=") ||
    paragraph.includes("→") ||
    /^(formula|rumus|rule|peraturan)\b/i.test(paragraph);

  const isImportantNote =
    /^(note:|nota:|important:|penting:|remember:|ingat:)/i.test(paragraph.trim());

  const isTip =
    /^(tip:|hint:|petua:|cara:|strategy:|strategi:)/i.test(paragraph.trim());

  if (isImportantNote) {
    return (
      <div className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/8 p-3">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
        <p className="whitespace-pre-line text-amber-100 text-sm leading-6">{highlight(paragraph, keywords)}</p>
      </div>
    );
  }

  if (isTip) {
    return (
      <div className="flex gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/8 p-3">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
        <p className="whitespace-pre-line text-emerald-100 text-sm leading-6">{highlight(paragraph, keywords)}</p>
      </div>
    );
  }

  if (isFormula) {
    return (
      <p className="whitespace-pre-line rounded-xl border border-cyan-500/20 bg-cyan-500/8 p-3 font-mono text-sm text-cyan-100">
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
      <mark key={index} className="rounded bg-[#8B5CF6]/25 px-1 py-0.5 text-[#C4B5FD] not-italic font-medium">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}
