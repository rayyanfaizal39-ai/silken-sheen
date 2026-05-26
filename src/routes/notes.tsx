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
import { mengenaliSejarahMindMap } from "@/data/mengenaliSejarahMindMap";
import { zamanPrasejarahMindMap } from "@/data/zamanPrasejarahMindMap";
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
        <SubjectGrid onSelect={(id) => { setSubject(id); setChapter(null); setSubtopic(null); }} />
      ) : !chapter ? (
        <ChapterGrid
          subjectId={subject}
          onSelect={(key) => { setChapter(key); setSubtopic(null); }}
          onBack={() => { setSubject(null); setChapter(null); setSubtopic(null); }}
        />
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
          )}

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

          {subject === "sejarah" && chapter === "Chapter 3" && (
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
      )}

      {chapterKey === "Chapter 2" && (
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
      )}

      {chapterKey === "Chapter 3" && (
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
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subtopics.map((s, i) => (
          <button
            key={s.key}
            onClick={() => onSelect(s)}
            className="group relative text-left glass rounded-2xl p-6 card-glow-hover border border-transparent hover:border-primary/50 animate-slide-up overflow-hidden"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl group-hover:opacity-40 transition-opacity" aria-hidden />
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
