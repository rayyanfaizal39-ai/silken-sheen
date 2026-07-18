import { useMemo } from "react";
import { ArrowRight, BookOpen, LayoutGrid, Pencil } from "lucide-react";
import { subjects, type Form } from "@/data/subjects-meta";
import { SubjectGrid } from "@/components/ChapterPicker";
import { DailyQuote } from "@/components/DailyQuote";
import { AcademyHero } from "@/components/AcademyPage";
import type { Progress } from "@/hooks/use-progress";
import { chapterProgressPct, chapterActivityKey } from "@/hooks/use-progress";
import { getFormChapterCount } from "@/content/registry";

const SUBJECT_ACCENT: Record<string, { text: string; bar: string; ring: string }> = {
  bm: { text: "text-rose-300", bar: "from-rose-500 to-orange-500", ring: "ring-rose-500/40" },
  english: { text: "text-sky-300", bar: "from-sky-500 to-blue-600", ring: "ring-sky-500/40" },
  math: {
    text: "text-indigo-300",
    bar: "from-indigo-500 to-purple-600",
    ring: "ring-indigo-500/40",
  },
  science: {
    text: "text-emerald-300",
    bar: "from-emerald-500 to-teal-600",
    ring: "ring-emerald-500/40",
  },
  sejarah: {
    text: "text-amber-300",
    bar: "from-amber-500 to-yellow-500",
    ring: "ring-amber-500/40",
  },
  geography: {
    text: "text-cyan-300",
    bar: "from-cyan-500 to-emerald-500",
    ring: "ring-cyan-500/40",
  },
};

function subjectName(id: string) {
  return subjects.find((subject) => subject.id === id)?.name ?? id;
}

interface RecentItem {
  subjectId: string;
  chapterKey: string;
  label: string;
  form: Form;
  pct: number;
}

export interface NotesLandingProps {
  progress: Progress;
  onSelectSubject: (id: string) => void;
  onContinueReading: (subjectId: string, chapterKey: string, form: Form) => void;
}

export function NotesLanding({ progress, onSelectSubject, onContinueReading }: NotesLandingProps) {
  const recent: RecentItem[] = useMemo(() => {
    const out: RecentItem[] = [];
    const seen = new Set<string>();

    const push = (item: {
      subjectId: string;
      chapterKey: string;
      label: string;
      form?: Form;
      type?: string;
    }) => {
      if (item.type && item.type !== "notes") return;
      const id = `${item.subjectId}:${item.chapterKey}`;
      if (seen.has(id)) return;
      seen.add(id);
      const form: Form = item.form ?? "Form 1";
      const pct = chapterProgressPct(
        progress.chapterActivity[chapterActivityKey(item.subjectId, item.chapterKey)],
      );
      out.push({ ...item, form, pct });
    };

    for (const item of progress.recentActivity ?? []) push(item);
    if (progress.lastVisited) push(progress.lastVisited);
    return out.slice(0, 4);
  }, [progress]);

  const subjectChapterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const subject of subjects) {
      counts[subject.id] =
        getFormChapterCount(subject.id, "Form 1") +
        getFormChapterCount(subject.id, "Form 2") +
        getFormChapterCount(subject.id, "Form 3");
    }
    return counts;
  }, []);

  return (
    <div>
      <AcademyHero
        eyebrow="Smart revision"
        title="Summary"
        gradientTitle="Notes"
        description="Quick, focused notes that get you ready in minutes."
        stats={[
          { label: "Reading Progress", value: "Ready" },
          {
            label: "Chapters Completed",
            value: Object.values(progress.chapterActivity).filter((activity) => activity.read)
              .length,
          },
          { label: "Study Mode", value: "Explore" },
        ]}
      />
      <div className="mb-7 flex justify-center">
        <DailyQuote />
      </div>

      <div className="space-y-10 lg:space-y-12">
        <section>
          <header className="mb-5 flex items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-300">
                <BookOpen className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                  Continue Reading
                </h2>
                <p className="mt-0.5 text-sm text-slate-400">Pick up where you left off</p>
              </div>
            </div>
          </header>

          {recent.length === 0 ? (
            <EmptyContinueReading />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {recent.map((item) => {
                const accent = SUBJECT_ACCENT[item.subjectId] ?? SUBJECT_ACCENT.math;
                return (
                  <button
                    key={`${item.subjectId}:${item.chapterKey}`}
                    type="button"
                    onClick={() => onContinueReading(item.subjectId, item.chapterKey, item.form)}
                    className={`group relative flex min-h-48 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1024]/82 p-5 text-left shadow-[0_18px_50px_-30px_rgba(76,29,149,0.7)] transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-purple-300/25 hover:bg-[#111633] hover:shadow-[0_24px_55px_-26px_rgba(124,58,237,0.65)] focus-visible:outline-none focus-visible:ring-2 ${accent.ring}`}
                  >
                    <div
                      aria-hidden
                      className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.bar} opacity-70`}
                    />
                    <p className={`text-xs font-bold uppercase tracking-[0.08em] ${accent.text}`}>
                      {subjectName(item.subjectId)}
                    </p>
                    <p className="mt-2 line-clamp-2 text-base font-bold leading-6 text-white">
                      {item.label}
                    </p>
                    <div className="mt-auto pt-5">
                      <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{item.form}</span>
                        <span>{item.pct}% completed</span>
                      </div>
                      <div
                        className="h-1.5 overflow-hidden rounded-full bg-white/10"
                        role="progressbar"
                        aria-label={`${item.label} reading progress`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={item.pct}
                      >
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${accent.bar}`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-200 transition-colors duration-200 group-hover:text-white">
                        Continue Reading
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className="rounded-[1.75rem] border border-white/[0.07] bg-[#090d1e]/48 p-4 sm:p-6">
          <header className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-300">
              <LayoutGrid className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                Notes by Subject
              </h2>
              <p className="mt-0.5 text-sm text-slate-400">
                Explore notes by your favourite subjects
              </p>
            </div>
          </header>
          <SubjectGrid onSelect={onSelectSubject} />
          <ul
            className="mt-5 flex flex-wrap gap-2 text-[11px] text-slate-400"
            aria-label="Available chapter counts"
          >
            {subjects.map((subject) => (
              <li
                key={subject.id}
                className="rounded-full border border-white/[0.07] bg-white/[0.035] px-3 py-1.5"
              >
                <span className={SUBJECT_ACCENT[subject.id]?.text ?? "text-slate-200"}>
                  {subject.name}
                </span>
                <span className="ml-1.5">{subjectChapterCounts[subject.id] ?? 0} chapters</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function EmptyContinueReading() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-purple-300/[0.18] bg-[#0b0f24]/70 p-8 text-center shadow-[0_18px_60px_-40px_rgba(124,58,237,0.7)]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_45%)]"
      />
      <div className="relative">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full border border-purple-400/20 bg-purple-500/10 text-purple-300">
          <Pencil className="h-5 w-5" aria-hidden />
        </div>
        <p className="font-display text-lg font-bold text-white">
          Your reading journey starts here.
        </p>
        <p className="mx-auto mt-1 max-w-xl text-sm leading-6 text-slate-400">
          Choose a subject below to open your first chapter — we&apos;ll remember where you left
          off.
        </p>
      </div>
    </div>
  );
}
