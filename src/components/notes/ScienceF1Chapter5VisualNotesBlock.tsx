import { Chapter5ParticleStates } from "./blocks/Chapter5ParticleStates";
import { Chapter5Diffusion } from "./blocks/Chapter5Diffusion";
import { Chapter5MatterInNature } from "./blocks/Chapter5MatterInNature";
import { Beaker, BookOpenCheck } from "lucide-react";
import { Chapter5StateChanges, Chapter5BoilingTemperature } from "./blocks/Chapter5StateChanges";
import { Chapter5Conservation } from "./blocks/Chapter5Conservation";
import { Chapter5Applications } from "./blocks/Chapter5Applications";
import type { Chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Form 1 Science · Chapter 5",
    mark: "Mark Chapter 5 as read",
    marked: "Chapter 5 completed",
  },
  bm: {
    eyebrow: "Sains Tingkatan 1 · Bab 5",
    mark: "Tandakan Bab 5 selesai",
    marked: "Bab 5 telah selesai",
  },
} as const;

export function ScienceF1Chapter5VisualNotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter5Content; bm: Chapter5Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const c = ui[lang];

  return (
    <section
      id={id}
      data-lang={lang}
      data-chapter="5"
      className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-sky-300/15 bg-[#07131d] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(circle_at_14%_8%,rgba(14,165,233,.2),transparent_34%),radial-gradient(circle_at_84%_10%,rgba(45,212,191,.14),transparent_30%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-sky-400/15 via-slate-950/40 to-teal-400/10 p-5 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-sky-200">
            <Beaker className="h-4 w-4" aria-hidden="true" />
            {c.eyebrow}
          </div>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-[1.04] text-white sm:text-5xl">
            {t.structure.title}
          </h1>
          <nav
            aria-label={t.structure.title}
            data-chapter-path
            className="mt-7 grid gap-3 sm:grid-cols-2"
          >
            {t.structure.subtopics.map((heading, index) => (
              <a
                key={heading}
                href={`#chapter5-${index === 0 ? "51" : "52"}`}
                className="rounded-xl border border-sky-300/20 bg-white/5 p-4 font-bold text-sky-100 hover:bg-sky-300/10 focus-visible:outline focus-visible:outline-sky-300"
              >
                {heading}
              </a>
            ))}
          </nav>
        </header>

        <Chapter5MatterInNature source={t.matterInNature} heading={t.structure.subtopics[0]} />
        <section id="chapter5-52" data-official-subtopic="5.2" className="scroll-mt-24 space-y-14">
          <h2 className="text-2xl font-black text-white sm:text-3xl">{t.structure.subtopics[1]}</h2>

          <Chapter5ParticleStates source={t.statesOfMatter} />
          <Chapter5Diffusion source={t.statesOfMatter} />

          <Chapter5StateChanges source={t.statesOfMatter} />
          <Chapter5BoilingTemperature source={t.statesOfMatter} />
          <Chapter5Conservation source={t.statesOfMatter} />
          <Chapter5Applications source={t.statesOfMatter} />
          <div>
            {onMarkRead && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={onMarkRead}
                  disabled={isRead}
                  className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${isRead ? "cursor-default bg-emerald-500/20 text-emerald-200" : "bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:scale-105 motion-reduce:hover:scale-100"}`}
                >
                  <BookOpenCheck className="h-5 w-5" />
                  {isRead ? c.marked : c.mark}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
