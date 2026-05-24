import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { subjects, forms, notes, getItemChapterKey, getSubjectChapters } from "@/data/content";
import { Search, BookOpenCheck, ArrowLeft, BookMarked } from "lucide-react";
import { z } from "zod";
import {
  SubjectGrid,
  ChapterGrid,
  ContentHeader,
  ComingSoonScreen,
} from "@/components/ChapterPicker";
import { DailyQuote } from "@/components/DailyQuote";
import { useProgress, chapterActivityKey } from "@/hooks/use-progress";
import { MindMap } from "@/components/MindMap";
import { zamanAirBatuMindMap } from "@/data/sejarah-f1-c2-mindmap";
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
  const [scrollPct, setScrollPct] = useState(0);
  const { progress, markChapter } = useProgress();

  const hasSubtopics = subject === "sejarah" && !!chapter;
  const subtopics = hasSubtopics ? getSejarahF1Subtopics(chapter!) : [];

  const chapterMeta = subject && chapter ? getSubjectChapters(subject).find((c) => c.key === chapter) : null;
  const isRead =
    subject && chapter
      ? !!progress.chapterActivity[chapterActivityKey(subject, chapter)]?.read
      : false;

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

  const filtered = useMemo(() => {
    if (!subject || !chapter) return [];
    return notes.filter((n) => {
      if (n.subjectId !== subject) return false;
      if (getItemChapterKey(n) !== chapter) return false;
      if (form !== "All" && n.form !== form) return false;
      if (q) {
        const hay = `${n.title} ${n.summary} ${n.chapter} ${n.keywords.join(" ")}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [subject, chapter, form, q]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
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
        <h1 className="font-display text-5xl font-bold">Summary <span className="gradient-text">Notes</span></h1>
        <p className="mt-3 text-muted-foreground">Quick, focused notes that get you ready in minutes.</p>
      </div>
      <div className="flex justify-center"><DailyQuote /></div>

      {!subject ? (
        <SubjectGrid onSelect={(id) => { setSubject(id); setChapter(null); }} />
      ) : !chapter ? (
        <ChapterGrid
          subjectId={subject}
          onSelect={(key) => setChapter(key)}
          onBack={() => { setSubject(null); setChapter(null); }}
        />
      ) : chapterMeta && !chapterMeta.available ? (
        <ComingSoonScreen subjectId={subject} chapterKey={chapter} onBack={() => setChapter(null)} />
      ) : (
        <>
          <ContentHeader subjectId={subject} chapterKey={chapter} onBack={() => setChapter(null)} />

          {subject === "sejarah" && chapter === "Chapter 2" && (
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
                          <span key={k} className="px-2.5 py-1 rounded-full text-xs bg-accent/20 text-accent border border-accent/30">
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

function highlight(text: string, keywords: string[]) {
  const parts: React.ReactNode[] = [text];
  keywords.forEach((kw, idx) => {
    const next: React.ReactNode[] = [];
    parts.forEach((p, i) => {
      if (typeof p !== "string") { next.push(p); return; }
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
            </mark>
          );
        } else next.push(pc);
      });
    });
    parts.splice(0, parts.length, ...next);
  });
  return <>{parts}</>;
}
