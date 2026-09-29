import { Chapter7Combustion } from "./Chapter7Combustion";
import { Chapter7AirComposition } from "./Chapter7AirComposition";
import { Chapter7AirPollution } from "./Chapter7AirPollution";
import { Wind, Sparkles } from "lucide-react";
import type { Bab7Content } from "@/content/form1/science/chapter-7/bab7-content";
type Lang = "en" | "bm";
const ui = {
  en: {
    eyebrow: "Form 1 Science · Chapter 7",
    mark: "Mark Chapter 7 as read",
    marked: "Chapter 7 completed",
  },
  bm: {
    eyebrow: "Sains Tingkatan 1 · Bab 7",
    mark: "Tandakan Bab 7 selesai",
    marked: "Bab 7 telah selesai",
  },
};

export function ScienceF1Chapter7VisualNotesBlock({
  id,
  content,
  lang = "en",
  onMarkRead,
  isRead = false,
  storageKey: _storageKey,
}: {
  id?: string;
  content: { en: Bab7Content; bm: Bab7Content };
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
      className="relative isolate overflow-hidden rounded-[2rem] border border-sky-300/15 bg-[#050b1d] text-slate-100 shadow-2xl shadow-sky-950/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,.15),transparent_30%),radial-gradient(circle_at_90%_34%,rgba(34,197,94,.11),transparent_32%)]" />
      <div className="relative px-4 py-8 sm:px-7 sm:py-10 lg:px-10">
        <header className="rounded-3xl border border-sky-300/20 bg-slate-950/55 p-5 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-black uppercase tracking-[.2em] text-sky-300">
                {copy.eyebrow}
              </p>
              <h1 className="mt-3 font-display text-3xl font-black leading-tight text-white sm:text-5xl">
                {t.airLesson.title}
              </h1>
            </div>
            <div className="relative mx-auto grid h-36 w-36 shrink-0 place-items-center rounded-full border border-sky-300/30 bg-sky-300/10 lg:mx-0">
              <Wind className="h-20 w-20 text-sky-300" aria-hidden="true" />
              <Sparkles
                className="absolute right-4 top-4 h-6 w-6 text-emerald-300"
                aria-hidden="true"
              />
            </div>
          </div>
          <nav aria-label={t.airLesson.title} className="mt-6 grid gap-2 sm:grid-cols-3">
            {t.airLesson.subtopics.map(({ code, title }) => (
              <a
                key={code}
                href={`#chapter7-${code.replace(".", "")}`}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-bold text-sky-100 hover:bg-sky-300/10"
              >
                {code} {title}
              </a>
            ))}
          </nav>
        </header>

        <div className="mt-12 space-y-16">
          <section id="chapter7-71" data-official-subtopic="7.1" className="space-y-6">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {t.airLesson.subtopics[0].code} {t.airLesson.subtopics[0].title}
            </h2>
            <Chapter7AirComposition content={t} />
          </section>
          <section id="chapter7-72" data-official-subtopic="7.2" className="space-y-6">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {t.airLesson.subtopics[1].code} {t.airLesson.subtopics[1].title}
            </h2>
            <Chapter7Combustion source={t.combustion} />
          </section>

          <section id="chapter7-73" data-official-subtopic="7.3" className="space-y-6">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {t.airLesson.subtopics[2].code} {t.airLesson.subtopics[2].title}
            </h2>
            <Chapter7AirPollution source={t.pollution} />
          </section>
          <section className="space-y-5 border-t border-white/15 pt-6" data-chapter-review>
            <h3 className="text-xl font-bold">{t.pollution.labels.review}</h3>
            <p>{t.chapterSummary}</p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              {t.keyExamFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <h4 className="font-bold text-sky-200">{t.pollution.labels.terms}</h4>
            <p className="text-sm text-slate-300">{t.keyTerms.join(" · ")}</p>
            {onMarkRead && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={onMarkRead}
                  disabled={isRead}
                  className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-sky-400 to-emerald-400 text-slate-950 hover:brightness-110"}`}
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
