import type { Chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";

import { Chapter6Atoms } from "./blocks/Chapter6Atoms";
import { Chapter6PeriodicTable, Chapter6MetalProperties } from "./blocks/Chapter6PeriodicTable";
import { Chapter6Experiments } from "./blocks/Chapter6Experiments";

import { Chapter6Compounds } from "./blocks/Chapter6Compounds";
import { Chapter6Mixtures } from "./blocks/Chapter6Mixtures";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Form 1 Science · Chapter 6",
    mark: "Mark Chapter 6 as read",
    marked: "Chapter 6 completed",
  },
  bm: {
    eyebrow: "Sains Tingkatan 1 · Bab 6",
    mark: "Tandakan Bab 6 selesai",
    marked: "Bab 6 telah selesai",
  },
} as const;

export function ScienceF1Chapter6VisualNotesBlock({
  id,
  content,
  lang = "en",
  onMarkRead,
  isRead = false,
  storageKey: _storageKey,
}: {
  id?: string;
  content: { en: Chapter6Content; bm: Chapter6Content };
  lang?: Lang;
  onMarkRead?: () => void;
  isRead?: boolean;
  storageKey?: string;
}) {
  const t = content[lang];
  const copy = ui[lang];

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#050b1d] text-slate-100 shadow-2xl shadow-cyan-950/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(34,211,238,.14),transparent_30%),radial-gradient(circle_at_90%_30%,rgba(168,85,247,.12),transparent_30%)]" />
      <div className="relative px-4 py-8 sm:px-7 sm:py-10 lg:px-10">
        <header className="rounded-3xl border border-cyan-300/20 bg-slate-950/55 p-5 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-black uppercase tracking-[.2em] text-cyan-300">
                {copy.eyebrow}
              </p>
              <h1 className="mt-3 font-display text-3xl font-black leading-tight text-white sm:text-5xl">
                {t.structure.title}
              </h1>
            </div>
          </div>
          <nav
            data-chapter-path
            aria-label={t.structure.title}
            className="mt-6 grid gap-3 sm:grid-cols-3"
          >
            {t.structure.subtopics.map((heading, i) => (
              <a
                key={heading}
                href={`#chapter6-6${i + 1}`}
                className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm font-bold text-cyan-100 focus-visible:outline focus-visible:outline-cyan-200"
              >
                {heading}
              </a>
            ))}
          </nav>
        </header>

        <div className="mt-12 space-y-16">
          <section
            id="chapter6-61"
            data-official-subtopic="6.1"
            className="scroll-mt-24 space-y-12"
          >
            <h2 className="text-2xl font-black sm:text-3xl">{t.structure.subtopics[0]}</h2>
            <Chapter6Atoms source={t} />
            <Chapter6PeriodicTable source={t} />
            <Chapter6MetalProperties source={t} />
            <Chapter6Experiments source={t} />
          </section>
          <section id="chapter6-62" data-official-subtopic="6.2" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl font-black sm:text-3xl">{t.structure.subtopics[1]}</h2>
            <Chapter6Mixtures source={t.mixtures} />
          </section>

          <section
            id="chapter6-63"
            data-official-subtopic="6.3"
            className="scroll-mt-24 space-y-12"
          >
            <h2 className="text-2xl font-black sm:text-3xl">{t.structure.subtopics[2]}</h2>
            <Chapter6Compounds source={t} />
            {onMarkRead && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={onMarkRead}
                  disabled={isRead}
                  className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 hover:brightness-110"}`}
                >
                  {isRead ? copy.marked : copy.mark}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
