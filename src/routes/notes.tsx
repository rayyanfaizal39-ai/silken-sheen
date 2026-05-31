import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { subjects, forms, notes, getItemChapterKey, getSubjectChapters, scienceF1C2NotesBM, scienceF1C2NotesDLP, type ScienceChapter2Notes, type ScienceNotesSection } from "@/data/content";
import { Search, BookOpenCheck, ArrowLeft, BookMarked } from "lucide-react";
import { z } from "zod";
import { SubjectGrid, ChapterGrid, ContentHeader, ComingSoonScreen } from "@/components/ChapterPicker";
import { ScienceLanguagePicker, ScienceLangBar } from "@/components/ScienceLanguagePicker";
import { useScienceLang } from "@/hooks/use-science-lang";
import { DailyQuote } from "@/components/DailyQuote";
import { useProgress, chapterActivityKey } from "@/hooks/use-progress";
import { MindMap } from "@/components/MindMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { zamanAirBatuMindMap } from "@/data/sejarah-f1-c2-mindmap";
import { mengenaliSejarahMindMap } from "@/data/mengenaliSejarahMindMap";
import { zamanPrasejarahMindMap } from "@/data/zamanPrasejarahMindMap";
import { tamadunIndiaChinaMindMap } from "@/data/sejarah-f1-c7-mindmap";
import { tamadunIslamSumbanganMindMap } from "@/data/sejarah-f1-c8-mindmap";
import { mengenaliTamadunMindMap } from "@/data/sejarah-f1-c4-mindmap";
import { tamadunAwalDuniaMindMap } from "@/data/sejarah-f1-c5-mindmap";
import { peningkatanTamadunYunaniRomMindMap } from "@/data/sejarah-f1-c6-mindmap";
import { getSejarahF1Subtopics, type Subtopic } from "@/data/sejarah-f1-subtopics";

const searchSchema = z.object({
  subject: z.string().optional(),
});

export const Route = createFileRoute("/notes")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Summary Notes — AcadeMY" },
      { name: "description", content: "Bite-sized KSSM notes by subject, form, and chapter." },
      { property: "og:title", content: "Summary Notes — AcadeMY" },
      { property: "og:description", content: "Clean, highlighted study notes for Form 1–3 students." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const search = Route.useSearch();
  const initialSubject = search.subject && subjects.some((s) => s.id === search.subject) ? search.subject : null;
  const [subject, setSubject] = useState<string | null>(initialSubject ?? null);
  const [chapter, setChapter] = useState<string | null>(null);
  const [subtopic, setSubtopic] = useState<Subtopic | null>(null);
  const [form, setForm] = useState<string>("All");
  const [q, setQ] = useState("");
  const [notesTab, setNotesTab] = useState<"bm" | "dlp">("bm");
  const [notesSearch, setNotesSearch] = useState("");
  const [scrollPct, setScrollPct] = useState(0);
  const { progress, markChapter } = useProgress();
  const { lang: scienceLang, setLang: setScienceLang } = useScienceLang();
  const needsScienceLang = subject === "science" && !scienceLang;

  const hasSubtopics = subject === "sejarah" && !!chapter;
  const subtopics = hasSubtopics ? getSejarahF1Subtopics(chapter!) : [];

  const chapterMeta =
    subject && chapter ? getSubjectChapters(subject, scienceLang ?? undefined).find((c) => c.key === chapter) : null;
  const isRead = subject && chapter ? !!progress.chapterActivity[chapterActivityKey(subject, chapter)]?.read : false;
  const isScienceChapter2 = subject === "science" && chapter === "Chapter 2";
  const chapterNotes = notesTab === "dlp" ? scienceF1C2NotesDLP : scienceF1C2NotesBM;

  const filteredChapterSections = useMemo(() => {
    if (!notesSearch.trim()) return chapterNotes.sections;
    const query = notesSearch.trim().toLowerCase();
    return chapterNotes.sections
      .map((section) => {
        const sectionMatches = section.title.toLowerCase().includes(query);
        const filteredSubsections = section.subsections?.filter((sub) => {
          const textMatches = [sub.title, sub.content, sub.formula]
            .filter(Boolean)
            .some((text) => text!.toLowerCase().includes(query));
          const bulletsMatch = sub.bulletPoints?.some((point) => point.toLowerCase().includes(query));
          const tableMatch =
            sub.table?.headers.some((header) => header.toLowerCase().includes(query)) ||
            sub.table?.rows.some((row) => row.some((cell) => cell.toLowerCase().includes(query)));
          return sectionMatches || textMatches || bulletsMatch || tableMatch;
        }) ?? [];

        if (sectionMatches) return section;
        if (filteredSubsections.length > 0) return { ...section, subsections: filteredSubsections };
        return null;
      })
      .filter(Boolean) as ScienceNotesSection[];
  }, [chapterNotes, notesSearch]);

  function renderChapterNotes(notesData: ScienceChapter2Notes, sections: ScienceNotesSection[]) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {notesData.quickRevision.map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-100 shadow-sm">
              {item}
            </div>
          ))}
        </div>

        {sections.length === 0 ? (
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-6 text-sm text-rose-100">
            No matching notes found. Try a different keyword.
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {sections.map((section) => (
              <AccordionItem key={section.title} value={section.title} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <AccordionTrigger>{section.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-2">
                    {section.subsections?.map((sub, index) => (
                      <div key={`${section.title}-${index}`} className="space-y-4">
                        {sub.title && <h3 className="text-xl font-semibold">{sub.title}</h3>}
                        {sub.content && <p className="text-sm leading-7 text-slate-300">{sub.content}</p>}
                        {sub.bulletPoints && (
                          <ul className="list-disc list-inside space-y-2 text-sm leading-7 text-slate-300">
                            {sub.bulletPoints.map((point) => (
                              <li key={point}>{point}</li>
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
                                  {sub.table.headers.map((header) => (
                                    <th key={header} className="border-b border-white/10 px-3 py-2 font-semibold text-slate-200">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {sub.table.rows.map((row, rowIndex) => (
                                  <tr key={`${rowIndex}-${row[0]}`} className={rowIndex % 2 === 0 ? "bg-white/5" : "bg-transparent"}>
                                    {row.map((cell, cellIndex) => (
                                      <td key={cellIndex} className="border-b border-white/10 px-3 py-2 text-slate-300">
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
            {notesData.keyExamFacts.map((fact) => (
              <div key={fact} className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-200">
                {fact}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Reading progress bar
  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isScienceChapter2) {
      setNotesTab(scienceLang ?? "bm");
    }
    setNotesSearch("");
  }, [isScienceChapter2, scienceLang]);

  const filtered = useMemo(() => {
    if (!subject || !chapter) return [];
    return notes.filter((n) => {
      if (n.subjectId !== subject) return false;
      if (getItemChapterKey(n) !== chapter) return false;
      if (form !== "All" && n.form !== form) return false;
      if (subject === "science" && n.lang && scienceLang && n.lang !== scienceLang) return false;
      if (q) {
        const hay = `${n.title} ${n.summary} ${n.chapter} ${n.keywords.join(" ")}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [subject, chapter, form, q, scienceLang]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 overflow-visible">
      {/* Reading progress bar */}
      {subject && chapter && (
        <div className="fixed top-0 left-0 right-0 h-1 z-40 bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-nova-yellow transition-all"
            style={{ width: `${scrollPct}%` }}
          />
        </div>
      )}

      <div className="text-center mb-6">
        <h1 className="font-display text-5xl font-bold">
          Summary <span className="gradient-text">Notes</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Quick, focused notes that get you ready in minutes.</p>
      </div>
      <div className="flex justify-center">
        <DailyQuote />
      </div>

      {!subject ? (
        <SubjectGrid
          onSelect={(id) => {
            setSubject(id);
            setChapter(null);
            setSubtopic(null);
          }}
        />
      ) : needsScienceLang ? (
        <ScienceLanguagePicker
          onSelect={(l) => setScienceLang(l)}
          onBack={() => {
            setSubject(null);
            setChapter(null);
            setSubtopic(null);
          }}
        />
      ) : !chapter ? (
        <>
          {subject === "science" && scienceLang && (
            <ScienceLangBar lang={scienceLang} onChange={() => setScienceLang(null)} />
          )}
          <ChapterGrid
            subjectId={subject}
            scienceLang={scienceLang ?? undefined}
            onSelect={(key) => {
              setChapter(key);
              setSubtopic(null);
            }}
            onBack={() => {
              setSubject(null);
              setChapter(null);
              setSubtopic(null);
            }}
          />
        </>
      ) : chapterMeta && !chapterMeta.available ? (
        <ComingSoonScreen subjectId={subject} chapterKey={chapter} onBack={() => setChapter(null)} />
      ) : hasSubtopics && !subtopic ? (
        <SubtopicView
          subjectId={subject}
          chapterKey={chapter}
          subtopics={subtopics}
          onSelect={(s) => setSubtopic(s)}
          onBack={() => setChapter(null)}
        />
      ) : hasSubtopics && subtopic ? (
        <SubtopicDetail
          subjectId={subject}
          chapterKey={chapter}
          subtopic={subtopic}
          isRead={isRead}
          onMarkRead={() => markChapter(subject, chapter, "read")}
          onBack={() => setSubtopic(null)}
        />
      ) : (
        <>
          <ContentHeader subjectId={subject} chapterKey={chapter} onBack={() => setChapter(null)} />

          {subject === "sejarah" && chapter === "Chapter 1" && (
            <>
              <div className="mb-8 animate-fade-up">
                <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="gradient-text">Video Pembelajaran</span> 🎬
                </h2>
                <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/dZuhYNHdQ7U?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                      title="Mengenali Sejarah"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  Hidupkan sari kata untuk pemahaman lebih baik! 💡
                </p>
              </div>

              <div className="mb-8 animate-fade-up">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="font-display text-2xl font-bold">
                    Mind Map <span className="gradient-text">Mengenali Sejarah</span>
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Click nodes to expand • Scroll or pinch to zoom • Drag to pan
                  </span>
                </div>
                <MindMap data={mengenaliSejarahMindMap} height={640} />
              </div>
            </>
          )}

          {subject === "sejarah" && chapter === "Chapter 2" && (
            <>
              <div className="mb-8 animate-fade-up">
                <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="gradient-text">Video Pembelajaran</span> 🎬
                </h2>
                <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/cLgCMnVoJ5g?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                      title="Sejarah Tingkatan 1 Bab 2 - Zaman Air Batu"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  Hidupkan sari kata untuk pemahaman lebih baik! 💡
                </p>
              </div>

              <div className="mb-8 animate-fade-up">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="font-display text-2xl font-bold">
                    Mind Map <span className="gradient-text">Zaman Air Batu</span>
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Click nodes to expand • Scroll or pinch to zoom • Drag to pan
                  </span>
                </div>
                <MindMap data={zamanAirBatuMindMap} height={640} />
              </div>
            </>
          )}

          {isScienceChapter2 && (
            <div className="glass-strong rounded-[2rem] border border-white/10 p-6 mb-8 animate-fade-up">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
                    Science Form 1 • Chapter 2
                  </p>
                  <h2 className="font-display text-3xl font-bold">
                    Cell as the Basic Unit of Life
                  </h2>
                  <p className="max-w-2xl text-muted-foreground">
                    Study the same Chapter 2 content in Bahasa Melayu or DLP English with structured notes, quick revision and exam facts.
                  </p>
                </div>

                <div className="w-full sm:max-w-sm">
                  <label className="sr-only" htmlFor="chapter-notes-search">
                    Search chapter notes
                  </label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="chapter-notes-search"
                      value={notesSearch}
                      onChange={(e) => setNotesSearch(e.target.value)}
                      placeholder="Search within Chapter 2 notes…"
                      className="w-full rounded-full border border-white/10 bg-slate-950/80 py-3 pl-11 pr-4 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Tabs value={notesTab} onValueChange={(value) => setNotesTab(value as "bm" | "dlp")}>
                  <TabsList>
                    <TabsTrigger value="bm">Bahasa Melayu</TabsTrigger>
                    <TabsTrigger value="dlp">DLP (English)</TabsTrigger>
                  </TabsList>

                  <TabsContent value="bm">
                    {renderChapterNotes(scienceF1C2NotesBM, filteredChapterSections)}
                  </TabsContent>
                  <TabsContent value="dlp">
                    {renderChapterNotes(scienceF1C2NotesDLP, filteredChapterSections)}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}

          {subject === "sejarah" && chapter === "Chapter 3" && (
            <>
              <div className="mb-8 animate-fade-up">
                <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="gradient-text">Video Pembelajaran</span> 🎬
                </h2>
                <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/3Hx4FX1avMU?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                      title="Sejarah Tingkatan 1 Bab 3 - Zaman Prasejarah"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  Hidupkan sari kata untuk pemahaman lebih baik! 💡
                </p>
              </div>

              <div className="mb-8 animate-fade-up">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="font-display text-2xl font-bold">
                    Mind Map <span className="gradient-text">Zaman Prasejarah</span>
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Click nodes to expand • Scroll or pinch to zoom • Drag to pan
                  </span>
                </div>
                <MindMap data={zamanPrasejarahMindMap} height={640} />
              </div>
            </>
          )}

          {subject === "sejarah" && chapter === "Chapter 4" && (
            <>
              <div className="mb-8 animate-fade-up">
                <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="gradient-text">Video Pembelajaran</span> 🎬
                </h2>
                <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/fdU9wX5oGAI?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                      title="Sejarah Tingkatan 1 Bab 4 - Mengenali Tamadun"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  Hidupkan sari kata untuk pemahaman lebih baik! 💡
                </p>
              </div>

              <div className="mb-8 animate-fade-up">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="font-display text-2xl font-bold">
                    Mind Map <span className="gradient-text">Mengenali Tamadun</span>
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Click nodes to expand • Scroll or pinch to zoom • Drag to pan
                  </span>
                </div>
                <MindMap data={mengenaliTamadunMindMap} height={640} />
              </div>
            </>
          )}

          {subject === "sejarah" && chapter === "Chapter 5" && (
            <>
              <div className="mb-8 animate-fade-up">
                <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="gradient-text">Video Pembelajaran</span> 🎬
                </h2>
                <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/UXeM03mYPO4?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                      title="Sejarah Tingkatan 1 Bab 5 - Tamadun Awal Dunia"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  Hidupkan sari kata untuk pemahaman lebih baik! 💡
                </p>
              </div>

              <div className="mb-8 animate-fade-up">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="font-display text-2xl font-bold">
                    Mind Map <span className="gradient-text">Tamadun Awal Dunia</span>
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Click nodes to expand • Scroll or pinch to zoom • Drag to pan
                  </span>
                </div>
                <MindMap data={tamadunAwalDuniaMindMap} height={640} />
              </div>
            </>
          )}

          {subject === "sejarah" && chapter === "Chapter 6" && (
            <>
              <div className="mb-8 animate-fade-up">
                <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="gradient-text">Video Pembelajaran</span> 🎬
                </h2>
                <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/gSXFJYisA6w?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                      title="Sejarah Tingkatan 1 Bab 6 - Tamadun Yunani & Rom"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  Hidupkan sari kata untuk pemahaman lebih baik! 💡
                </p>
              </div>

              <div className="mb-8 animate-fade-up">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="font-display text-2xl font-bold">
                    Mind Map <span className="gradient-text">Peningkatan Tamadun Yunani dan Rom</span>
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Click nodes to expand • Scroll or pinch to zoom • Drag to pan
                  </span>
                </div>
                <MindMap data={peningkatanTamadunYunaniRomMindMap} height={640} />
              </div>
            </>
          )}

          {subject === "sejarah" && chapter === "Chapter 7" && (
            <>
              <div className="mb-8 animate-fade-up">
                <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="gradient-text">Video Pembelajaran</span> 🎬
                </h2>
                <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/aeLoGzzm85o?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                      title="Sejarah Tingkatan 1 Bab 7 - India & China Purba"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  Hidupkan sari kata untuk pemahaman lebih baik! 💡
                </p>
              </div>

              <div className="mb-8 animate-fade-up">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="font-display text-2xl font-bold">
                    Mind Map <span className="gradient-text">Tamadun India dan China</span>
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Click nodes to expand • Scroll or pinch to zoom • Drag to pan
                  </span>
                </div>
                <MindMap data={tamadunIndiaChinaMindMap} height={640} />
              </div>
            </>
          )}

          {subject === "sejarah" && chapter === "Chapter 8" && (
            <>
              <div className="mb-8 animate-fade-up">
                <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="gradient-text">Video Pembelajaran</span> 🎬
                </h2>
                <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/RIDZG6LTY5Y?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                      title="Sejarah Tingkatan 1 Bab 8 - Tamadun Islam"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  Hidupkan sari kata untuk pemahaman lebih baik! 💡
                </p>
              </div>

              <div className="mb-8 animate-fade-up">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="font-display text-2xl font-bold">
                    Mind Map <span className="gradient-text">Tamadun Islam dan Sumbangannya</span>
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Click nodes to expand • Scroll or pinch to zoom • Drag to pan
                  </span>
                </div>
                <MindMap data={tamadunIslamSumbanganMindMap} height={640} />
              </div>
            </>
          )}

          <div className="glass-strong rounded-2xl p-5 mb-8 flex flex-col lg:flex-row gap-3 animate-fade-up">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search chapters or keywords…"
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-2">
              {["All", ...forms].map((f) => (
                <button
                  key={f}
                  onClick={() => setForm(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    form === f
                      ? "bg-gradient-to-r from-primary to-accent text-white"
                      : "bg-white/5 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No notes match your filters.</p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-5">
                {filtered.map((n, i) => {
                  const subj = subjects.find((s) => s.id === n.subjectId)!;
                  return (
                    <article
                      key={n.id}
                      className="glass rounded-2xl p-6 hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all animate-slide-up"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <span>{subj.emoji}</span>
                          {subj.name} • {n.form} • {n.chapter}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold">{n.title}</h3>
                      <p className="mt-3 text-sm text-foreground/85 leading-relaxed">
                        {highlight(n.summary, n.keywords)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {n.keywords.map((k) => (
                          <span
                            key={k}
                            className="px-2.5 py-1 rounded-full text-xs bg-accent/20 text-accent border border-accent/30"
                          >
                            #{k}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Mark as Read */}
              <div className="mt-10 flex justify-center animate-fade-up">
                <button
                  onClick={() => subject && chapter && markChapter(subject, chapter, "read")}
                  disabled={isRead}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                    isRead
                      ? "bg-emerald-500/20 text-emerald-200 cursor-default"
                      : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105"
                  }`}
                >
                  <BookOpenCheck className="w-4 h-4" />
                  {isRead ? "Marked as read ✓" : "Mark as Read"}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

function SubtopicView({
  subjectId,
  chapterKey,
  subtopics,
  onSelect,
  onBack,
}: {
  subjectId: string;
  chapterKey: string;
  subtopics: Subtopic[];
  onSelect: (s: Subtopic) => void;
  onBack: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapterLabel = getSubjectChapters(subjectId).find((c) => c.key === chapterKey)?.label ?? chapterKey;
  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to chapters
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name} • {chapterLabel}
        </span>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-display text-3xl font-bold">
          Pilih <span className="gradient-text">Subtopik</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Setiap subtopik dipecahkan untuk pembelajaran yang lebih fokus.
        </p>
      </div>

      {chapterKey === "Chapter 1" && (
        <>
          <div className="mb-8 animate-fade-up">
            <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
              <span className="gradient-text">Video Pembelajaran</span> 🎬
            </h3>
            <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dZuhYNHdQ7U?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                  title="Mengenali Sejarah"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-center">
              Hidupkan sari kata untuk pemahaman lebih baik! 💡
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-display text-2xl font-bold">
                Mind Map <span className="gradient-text">Mengenali Sejarah</span>
              </h3>
              <span className="text-xs text-muted-foreground">
                Click nodes to expand • Scroll or pinch to zoom • Drag to pan
              </span>
            </div>
            <MindMap data={mengenaliSejarahMindMap} height={640} />
          </div>
        </>
      )}

      {chapterKey === "Chapter 2" && (
        <>
          <div className="mb-8 animate-fade-up">
            <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
              <span className="gradient-text">Video Pembelajaran</span> 🎬
            </h3>
            <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/cLgCMnVoJ5g?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                  title="Sejarah Tingkatan 1 Bab 2 - Zaman Air Batu"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-center">
              Hidupkan sari kata untuk pemahaman lebih baik! 💡
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-display text-2xl font-bold">
                Mind Map <span className="gradient-text">Zaman Air Batu</span>
              </h3>
              <span className="text-xs text-muted-foreground">
                Click nodes to expand • Scroll or pinch to zoom • Drag to pan
              </span>
            </div>
            <MindMap data={zamanAirBatuMindMap} height={640} />
          </div>
        </>
      )}

      {chapterKey === "Chapter 3" && (
        <>
          <div className="mb-8 animate-fade-up">
            <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
              <span className="gradient-text">Video Pembelajaran</span> 🎬
            </h3>
            <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/LAAafdFO3Zo?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                  title="Sejarah Tingkatan 1 Bab 3 - Zaman Prasejarah"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-center">
              Hidupkan sari kata untuk pemahaman lebih baik! 💡
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-display text-2xl font-bold">
                Mind Map <span className="gradient-text">Zaman Prasejarah</span>
              </h3>
              <span className="text-xs text-muted-foreground">
                Click nodes to expand • Scroll or pinch to zoom • Drag to pan
              </span>
            </div>
            <MindMap data={zamanPrasejarahMindMap} height={640} />
          </div>
        </>
      )}

      {chapterKey === "Chapter 4" && (
        <>
          <div className="mb-8 animate-fade-up">
            <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
              <span className="gradient-text">Video Pembelajaran</span> 🎬
            </h3>
            <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/fdU9wX5oGAI?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                  title="Sejarah Tingkatan 1 Bab 4 - Mengenali Tamadun"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-center">
              Hidupkan sari kata untuk pemahaman lebih baik! 💡
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-display text-2xl font-bold">
                Mind Map <span className="gradient-text">Mengenali Tamadun</span>
              </h3>
              <span className="text-xs text-muted-foreground">
                Click nodes to expand • Scroll or pinch to zoom • Drag to pan
              </span>
            </div>
            <MindMap data={mengenaliTamadunMindMap} height={640} />
          </div>
        </>
      )}

      {chapterKey === "Chapter 5" && (
        <>
          <div className="mb-8 animate-fade-up">
            <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
              <span className="gradient-text">Video Pembelajaran</span> 🎬
            </h3>
            <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/UXeM03mYPO4?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                  title="Sejarah Tingkatan 1 Bab 5 - Tamadun Awal Dunia"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-center">
              Hidupkan sari kata untuk pemahaman lebih baik! 💡
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-display text-2xl font-bold">
                Mind Map <span className="gradient-text">Tamadun Awal Dunia</span>
              </h3>
              <span className="text-xs text-muted-foreground">
                Click nodes to expand • Scroll or pinch to zoom • Drag to pan
              </span>
            </div>
            <MindMap data={tamadunAwalDuniaMindMap} height={640} />
          </div>
        </>
      )}

      {chapterKey === "Chapter 6" && (
        <>
          <div className="mb-8 animate-fade-up">
            <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
              <span className="gradient-text">Video Pembelajaran</span> 🎬
            </h3>
            <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/gSXFJYisA6w?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                  title="Sejarah Tingkatan 1 Bab 6 - Tamadun Yunani & Rom"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-center">
              Hidupkan sari kata untuk pemahaman lebih baik! 💡
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-display text-2xl font-bold">
                Mind Map <span className="gradient-text">Peningkatan Tamadun Yunani dan Rom</span>
              </h3>
              <span className="text-xs text-muted-foreground">
                Click nodes to expand • Scroll or pinch to zoom • Drag to pan
              </span>
            </div>
            <MindMap data={peningkatanTamadunYunaniRomMindMap} height={640} />
          </div>
        </>
      )}

      {chapterKey === "Chapter 7" && (
        <>
          <div className="mb-8 animate-fade-up">
            <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
              <span className="gradient-text">Video Pembelajaran</span> 🎬
            </h3>
            <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/aeLoGzzm85o?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                  title="Sejarah Tingkatan 1 Bab 7 - India & China Purba"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-center">
              Hidupkan sari kata untuk pemahaman lebih baik! 💡
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-display text-2xl font-bold">
                Mind Map <span className="gradient-text">Tamadun India dan China</span>
              </h3>
              <span className="text-xs text-muted-foreground">
                Click nodes to expand • Scroll or pinch to zoom • Drag to pan
              </span>
            </div>
            <MindMap data={tamadunIndiaChinaMindMap} height={640} />
          </div>
        </>
      )}

      {chapterKey === "Chapter 8" && (
        <>
          <div className="mb-8 animate-fade-up">
            <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
              <span className="gradient-text">Video Pembelajaran</span> 🎬
            </h3>
            <div className="rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_24px_rgba(139,92,246,0.25)] glass-strong">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/RIDZG6LTY5Y?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1"
                  title="Sejarah Tingkatan 1 Bab 8 - Tamadun Islam"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-center">
              Hidupkan sari kata untuk pemahaman lebih baik! 💡
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-display text-2xl font-bold">
                Mind Map <span className="gradient-text">Tamadun Islam dan Sumbangannya</span>
              </h3>
              <span className="text-xs text-muted-foreground">
                Click nodes to expand • Scroll or pinch to zoom • Drag to pan
              </span>
            </div>
            <MindMap data={tamadunIslamSumbanganMindMap} height={720} />
          </div>
        </>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subtopics.map((s, i) => (
          <button
            key={s.key}
            onClick={() => onSelect(s)}
            className="group relative text-left glass rounded-2xl p-6 card-glow-hover border border-transparent hover:border-primary/50 animate-slide-up overflow-hidden"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"
              aria-hidden
            />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-display text-lg font-bold mb-3 shadow-lg">
              {s.num}
            </div>
            <h3 className="font-display text-lg font-bold leading-snug">{s.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground inline-flex items-center gap-1">
              <BookMarked className="w-3 h-3" /> Subtopik {s.num}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function SubtopicDetail({
  subjectId,
  chapterKey,
  subtopic,
  isRead,
  onMarkRead,
  onBack,
}: {
  subjectId: string;
  chapterKey: string;
  subtopic: Subtopic;
  isRead: boolean;
  onMarkRead: () => void;
  onBack: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapterLabel = getSubjectChapters(subjectId).find((c) => c.key === chapterKey)?.label ?? chapterKey;
  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to subtopics
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name} • {chapterLabel}
        </span>
      </div>

      <article className="glass-strong rounded-3xl p-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-display text-lg font-bold shadow-lg">
            {subtopic.num}
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Subtopik {subtopic.num}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight">{subtopic.title}</h2>
          </div>
        </div>

        <p className="mt-4 text-base text-foreground/90 leading-relaxed whitespace-pre-line">
          {highlight(subtopic.summary, subtopic.keywords)}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {subtopic.keywords.map((k) => (
            <span key={k} className="px-2.5 py-1 rounded-full text-xs bg-accent/20 text-accent border border-accent/30">
              #{k}
            </span>
          ))}
        </div>
      </article>

      <div className="mt-10 flex justify-center">
        <button
          onClick={onMarkRead}
          disabled={isRead}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
            isRead
              ? "bg-emerald-500/20 text-emerald-200 cursor-default"
              : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105"
          }`}
        >
          <BookOpenCheck className="w-4 h-4" />
          {isRead ? "Marked as read ✓" : "Mark chapter as Read"}
        </button>
      </div>
    </div>
  );
}

function highlight(text: string, keywords: string[]) {
  const parts: React.ReactNode[] = [text];
  keywords.forEach((kw, idx) => {
    const next: React.ReactNode[] = [];
    parts.forEach((p, i) => {
      if (typeof p !== "string") {
        next.push(p);
        return;
      }
      const pieces = p.split(new RegExp(`(${kw})`, "i"));
      pieces.forEach((pc, j) => {
        if (pc.toLowerCase() === kw.toLowerCase()) {
          next.push(
            <mark
              key={`${idx}-${i}-${j}`}
              className="rounded px-1 mx-0.5 font-semibold text-white"
              style={{
                background: "linear-gradient(90deg, oklch(0.62 0.21 265 / 0.55), oklch(0.63 0.22 295 / 0.55))",
                boxShadow: "0 0 12px -2px oklch(0.63 0.22 295 / 0.6)",
              }}
            >
              {pc}
            </mark>,
          );
        } else next.push(pc);
      });
    });
    parts.splice(0, parts.length, ...next);
  });
  return <>{parts}</>;
}
