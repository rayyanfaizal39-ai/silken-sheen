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

// Subject-aware accent palette
const SUBJECT_PALETTE: Record<string, { primary: string; glow: string; from: string; to: string }> = {
  science:   { primary: "#38BDF8", glow: "rgba(56,189,248,0.25)",  from: "#38BDF8", to: "#0EA5E9" },
  sejarah:   { primary: "#FB923C", glow: "rgba(251,146,60,0.25)",  from: "#FB923C", to: "#F97316" },
  geography: { primary: "#34D399", glow: "rgba(52,211,153,0.25)",  from: "#34D399", to: "#10B981" },
  english:   { primary: "#C084FC", glow: "rgba(192,132,252,0.25)", from: "#C084FC", to: "#A855F7" },
  math:      { primary: "#FBBF24", glow: "rgba(251,191,36,0.25)",  from: "#FBBF24", to: "#F59E0B" },
  bm:        { primary: "#F472B6", glow: "rgba(244,114,182,0.25)", from: "#F472B6", to: "#EC4899" },
  _default:  { primary: "#8B5CF6", glow: "rgba(139,92,246,0.25)",  from: "#8B5CF6", to: "#6366F1" },
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
  subjectId,
}: {
  notes?: StructuredNotes;
  sections?: NotesAccordionSection[];
  id?: string;
  subjectId?: string;
}) {
  const subjectPalette = SUBJECT_PALETTE[subjectId ?? "_default"] ?? SUBJECT_PALETTE["_default"];
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
      className="mx-auto mb-8 w-full max-w-5xl scroll-mt-24 rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/70 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl animate-fade-up overflow-hidden"
      style={{ boxShadow: `0 20px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)` }}
    >
      {/* ── Subject accent top bar ─────────────────────────────────── */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${subjectPalette.from}, ${subjectPalette.to}, transparent)` }}
      />

      {/* ── Header bar ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 border-b border-white/[0.06] p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${subjectPalette.from}33, ${subjectPalette.to}22)`,
              boxShadow: `0 0 28px ${subjectPalette.glow}`,
            }}
          >
            <BookOpen className="h-5 w-5" style={{ color: subjectPalette.primary }} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">Study Notes</h2>
            {filteredSections.length > 0 && (
              <p className="mt-0.5 text-xs text-white/40">
                {filteredSections.length} section{filteredSections.length !== 1 ? "s" : ""}
                {quickRevision.length > 0 && ` · ${quickRevision.length} quick revision points`}
              </p>
            )}
          </div>
        </div>
        <div className="w-full sm:max-w-sm">
          <label htmlFor="chapter-notes-search" className="sr-only">
            Search within these notes
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              id="chapter-notes-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes…"
              className="w-full rounded-2xl border border-white/[0.10] bg-white/[0.05] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/25 focus:bg-white/[0.08] transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                <span className="text-xs">✕</span>
              </button>
            )}
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
            <nav className="h-fit overflow-hidden rounded-2xl border border-white/[0.07] bg-[#060C1A]/80 lg:sticky lg:top-24">
              {/* Nav header */}
              <div
                className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3"
                style={{ background: `linear-gradient(135deg, ${subjectPalette.from}11, transparent)` }}
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: subjectPalette.primary, boxShadow: `0 0 8px ${subjectPalette.glow}` }}
                />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Sections
                </p>
                <span className="ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: `${subjectPalette.from}22`, color: subjectPalette.primary }}>
                  {filteredSections.length}
                </span>
              </div>
              <div className="space-y-0.5 p-2">
                {filteredSections.map((section, i) => {
                  const value = section.id ?? section.title;
                  const active = openValue === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => jumpToSection(value)}
                      className={`group relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs font-semibold leading-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                        active
                          ? "text-white"
                          : "text-white/45 hover:bg-white/[0.05] hover:text-white/80"
                      }`}
                      style={active ? {
                        background: `${subjectPalette.from}18`,
                        borderRadius: "0.75rem",
                      } : undefined}
                    >
                      {active && (
                        <span
                          className="absolute left-0 top-1/2 h-4 w-[2.5px] -translate-y-1/2 rounded-full"
                          style={{ background: subjectPalette.primary, boxShadow: `0 0 8px ${subjectPalette.primary}` }}
                        />
                      )}
                      <span
                        className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded text-[8px] font-black text-white/80"
                        style={active
                          ? { background: `linear-gradient(135deg, ${subjectPalette.from}, ${subjectPalette.to})` }
                          : { background: "rgba(255,255,255,0.08)" }
                        }
                      >
                        {i + 1}
                      </span>
                      <span className="flex-1 leading-tight">{section.title}</span>
                      {active && <ChevronRight className="h-3 w-3 shrink-0" style={{ color: subjectPalette.primary }} />}
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
              className="min-w-0 space-y-2.5"
            >
              {filteredSections.map((section, i) => {
                const value = section.id ?? section.title;
                const accent = SECTION_ACCENTS[i % SECTION_ACCENTS.length];
                const isOpen = openValue === value;
                return (
                  <AccordionItem
                    id={`notes-section-${value}`}
                    key={value}
                    value={value}
                    className={`scroll-mt-28 overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-white/[0.12] bg-white/[0.04]"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.09] hover:bg-white/[0.03]"
                    }`}
                    style={isOpen ? {
                      boxShadow: `0 0 0 1px ${subjectPalette.from}20, 0 8px 32px rgba(0,0,0,0.2)`,
                    } : undefined}
                  >
                    {/* Accent top stripe on open sections */}
                    {isOpen && (
                      <div
                        className="h-0.5 w-full"
                        style={{ background: `linear-gradient(90deg, ${subjectPalette.from}80, ${subjectPalette.to}40, transparent)` }}
                      />
                    )}
                    <AccordionTrigger className="px-4 py-4 text-left hover:no-underline sm:px-5 [&[data-state=open]]:pb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-[11px] font-black text-white transition-all"
                          style={isOpen ? {
                            background: `linear-gradient(135deg, ${subjectPalette.from}, ${subjectPalette.to})`,
                            boxShadow: `0 0 16px ${subjectPalette.glow}`,
                          } : { background: "rgba(255,255,255,0.08)" }}
                        >
                          {i + 1}
                        </span>
                        <span className={`text-sm font-bold sm:text-base ${isOpen ? "text-white" : "text-white/75"}`}>
                          {section.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-5 px-4 pb-5 sm:px-5">
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
                            subjectPalette={subjectPalette}
                          />
                        ))}
                        {!!section.keywords?.length && (
                          <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
                            {section.keywords.map((keyword) => (
                              <span
                                key={keyword}
                                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:brightness-110"
                                style={{
                                  borderColor: `${subjectPalette.from}30`,
                                  background: `${subjectPalette.from}15`,
                                  color: subjectPalette.primary,
                                }}
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
          <div
            className="overflow-hidden rounded-2xl border p-5"
            style={{
              borderColor: `${subjectPalette.from}22`,
              background: `linear-gradient(135deg, ${subjectPalette.from}0d, ${subjectPalette.to}07)`,
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-lg"
                style={{ background: `${subjectPalette.from}25` }}
              >
                <FlaskConical className="h-3.5 w-3.5" style={{ color: subjectPalette.primary }} />
              </div>
              <h3 className="font-bold" style={{ color: subjectPalette.primary }}>Key Terms</h3>
              <span
                className="ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold"
                style={{ background: `${subjectPalette.from}20`, color: subjectPalette.primary }}
              >
                {keyTerms.length} terms
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {keyTerms.map((term) => (
                <span
                  key={term}
                  className="rounded-full px-4 py-1.5 text-sm font-medium transition-all hover:brightness-110 cursor-default"
                  style={{
                    border: `1px solid ${subjectPalette.from}25`,
                    background: `${subjectPalette.from}12`,
                    color: subjectPalette.primary,
                  }}
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Key Exam Facts ────────────────────────────────────── */}
        {keyExamFacts.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
                <GraduationCap className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-200">Key Exam Facts</h3>
                <p className="text-[10px] text-emerald-400/70">High-probability exam topics</p>
              </div>
              <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                <Target className="h-2.5 w-2.5" />
                Likely Tested
              </span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {keyExamFacts.map((fact, i) => (
                <div
                  key={fact}
                  className="flex items-start gap-3 rounded-xl border border-emerald-500/12 bg-emerald-500/6 p-3.5 text-sm text-slate-200"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/25 text-[9px] font-black text-emerald-300">
                    {i + 1}
                  </span>
                  <span className="leading-6">{fact}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Chapter Summary ───────────────────────────────────── */}
        {notes?.chapterSummary && (
          <div
            className="relative overflow-hidden rounded-2xl border p-5 sm:p-6"
            style={{
              borderColor: `${subjectPalette.from}25`,
              background: `linear-gradient(135deg, ${subjectPalette.from}10, ${subjectPalette.to}06)`,
            }}
          >
            {/* Ambient glow orb */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full opacity-20 blur-3xl"
              style={{ background: subjectPalette.primary }}
            />
            <div className="relative mb-3 flex items-center gap-2">
              <Star className="h-5 w-5" style={{ color: subjectPalette.primary }} />
              <h3 className="font-display text-lg font-bold text-white">Chapter Summary</h3>
            </div>
            <p className="relative text-sm leading-8 text-slate-200 sm:text-base">{notes.chapterSummary}</p>
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
  subjectPalette,
}: {
  sub: ScienceNotesSubsection;
  keywords: string[];
  accentClass: string;
  subjectPalette: { primary: string; glow: string; from: string; to: string };
}) {
  return (
    <div className="space-y-3">
      {sub.title && (
        <h3 className="flex items-center gap-2.5 text-sm font-bold text-white/90 sm:text-base">
          <span
            className="h-4 w-1 shrink-0 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${subjectPalette.from}, ${subjectPalette.to})` }}
          />
          {sub.title}
        </h3>
      )}
      {sub.content && (
        <ReadableContent text={sub.content} keywords={keywords} />
      )}
      {Array.isArray(sub.bulletPoints) && sub.bulletPoints.length > 0 && (
        <ul className="space-y-2 pl-1">
          {sub.bulletPoints.map((p: string) => (
            <li key={p} className="flex items-start gap-3 text-sm leading-7 text-slate-300">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: subjectPalette.primary, boxShadow: `0 0 6px ${subjectPalette.glow}` }}
              />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
      {sub.formula && (
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-[#0A1628] to-[#0C1E38] p-4 sm:p-5">
          {/* Glow accent */}
          <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-500/10 blur-2xl" />
          <div className="absolute right-3 top-3 rounded-full border border-cyan-500/25 bg-cyan-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-300">
            Formula
          </div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-cyan-400">
            <FlaskConical className="h-3.5 w-3.5" />
            Key Formula
          </div>
          <div className="mt-1 border-t border-cyan-500/15 pt-3 font-mono text-sm leading-8 text-cyan-100">{sub.formula}</div>
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
      <div className="flex gap-3 rounded-xl border border-amber-500/25 bg-gradient-to-r from-amber-500/10 to-transparent p-3.5">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
          <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
        </div>
        <p className="whitespace-pre-line text-amber-100/90 text-sm leading-7">{highlight(paragraph, keywords)}</p>
      </div>
    );
  }

  if (isTip) {
    return (
      <div className="flex gap-3 rounded-xl border border-emerald-500/25 bg-gradient-to-r from-emerald-500/10 to-transparent p-3.5">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20">
          <Lightbulb className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <p className="whitespace-pre-line text-emerald-100/90 text-sm leading-7">{highlight(paragraph, keywords)}</p>
      </div>
    );
  }

  if (isFormula) {
    return (
      <p className="whitespace-pre-line rounded-xl border border-cyan-500/20 bg-cyan-500/6 px-4 py-3 font-mono text-sm text-cyan-200 leading-8">
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
