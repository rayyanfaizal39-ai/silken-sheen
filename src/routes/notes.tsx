import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { subjects, forms, notes, sejarahChapterFromId, sejarahForm1Chapters } from "@/data/content";
import { Search } from "lucide-react";
import { z } from "zod";
import {
  SejarahChapterGrid,
  SejarahChapterHeader,
  SejarahComingSoon,
} from "@/components/SejarahChapterPicker";

const searchSchema = z.object({
  subject: z.string().optional(),
});

export const Route = createFileRoute("/notes")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Summary Notes — LearnNova" },
      { name: "description", content: "Bite-sized KSSM notes by subject, form, and chapter." },
      { property: "og:title", content: "Summary Notes — LearnNova" },
      { property: "og:description", content: "Clean, highlighted study notes for Form 1–3 students." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const search = Route.useSearch();
  const [subject, setSubject] = useState<string>(search.subject ?? "all");
  const [form, setForm] = useState<string>("All");
  const [q, setQ] = useState("");
  const [sejChapter, setSejChapter] = useState<number | null>(null);

  const sejarahF1Mode = subject === "sejarah" && form === "Form 1";
  const selectedChapterMeta =
    sejarahF1Mode && sejChapter !== null
      ? sejarahForm1Chapters.find((c) => c.num === sejChapter)
      : null;

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      if (subject !== "all" && n.subjectId !== subject) return false;
      if (form !== "All" && n.form !== form) return false;
      if (sejarahF1Mode && sejChapter !== null) {
        if (sejarahChapterFromId(n.id) !== sejChapter) return false;
      }
      if (q) {
        const hay = `${n.title} ${n.summary} ${n.chapter} ${n.keywords.join(" ")}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [subject, form, q, sejarahF1Mode, sejChapter]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-5xl font-bold">Summary <span className="gradient-text">Notes</span></h1>
        <p className="mt-3 text-muted-foreground">Quick, focused notes that get you ready in minutes.</p>
      </div>

      <div className="glass-strong rounded-2xl p-5 mb-8 flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search chapters or keywords…"
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="px-4 py-3 rounded-full bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">All subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
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
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((n) => {
            const subj = subjects.find((s) => s.id === n.subjectId)!;
            return (
              <article
                key={n.id}
                className="glass rounded-2xl p-6 hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <span>{subj.emoji}</span>
                    {subj.name} • {n.form} • {n.chapter}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold">{n.title}</h3>
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
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
            <mark key={`${idx}-${i}-${j}`} className="bg-nova-yellow/20 text-nova-yellow rounded px-1 mx-0.5">
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
