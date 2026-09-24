import { Chapter7Combustion } from "./Chapter7Combustion";
import { Chapter7AirComposition } from "./Chapter7AirComposition";
import { type ReactNode } from "react";
import {
  Check,
  ChevronDown,
  CircleGauge,
  Cloud,
  Factory,
  HeartPulse,
  Leaf,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";
import type { Bab7Content } from "@/content/form1/science/chapter-7/bab7-content";
import { bab7Supplement } from "@/content/form1/science/chapter-7/bab7-content";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Form 1 Science · Chapter 7",
    sections: [
      [
        "7.3",
        "Pollutants connect sources to consequences",
        "Trace each pollutant from its source to health and environmental damage.",
      ],
      [
        "7.3",
        "Control pollution on three fronts",
        "Law, technology, and education work best together.",
      ],
      [
        "Review",
        "Turn evidence into exam answers",
        "Use scientific principles to justify safety and environmental decisions.",
      ],
    ],
    pollution: "Air pollution",
    sources: "Sources and pollutants",
    effects: "Effects",
    api: "Air Pollutant Index (API)",
    prevention: "Prevention and control",
    facts: "High-yield facts",
    recall: "Active recall",
    summary: "Chapter rule",
    mark: "Mark Chapter 7 as read",
    marked: "Chapter 7 completed",
  },
  bm: {
    eyebrow: "Sains Tingkatan 1 · Bab 7",
    sections: [
      [
        "7.3",
        "Bahan pencemar menghubungkan punca dengan kesan",
        "Jejaki setiap bahan pencemar daripada puncanya kepada kerosakan kesihatan dan alam sekitar.",
      ],
      [
        "7.3",
        "Kawal pencemaran melalui tiga pendekatan",
        "Undang-undang, teknologi, dan pendidikan paling berkesan apabila digabungkan.",
      ],
      [
        "Ulang kaji",
        "Tukar bukti kepada jawapan peperiksaan",
        "Gunakan prinsip saintifik untuk mewajarkan keputusan keselamatan dan alam sekitar.",
      ],
    ],
    pollution: "Pencemaran udara",
    sources: "Punca dan bahan pencemar",
    effects: "Kesan",
    api: "Indeks Pencemaran Udara (IPU)",
    prevention: "Pencegahan dan kawalan",
    facts: "Fakta skor tinggi",
    recall: "Ingatan aktif",
    summary: "Hukum bab",
    mark: "Tandakan Bab 7 selesai",
    marked: "Bab 7 telah selesai",
  },
} as const;

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:p-5 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ section }: { section: readonly [string, string, string] }) {
  return (
    <div className="max-w-3xl">
      <h3 className="mt-2 font-display text-2xl font-black leading-tight text-white sm:text-3xl">
        {section[1]}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">{section[2]}</p>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
          <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

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
  const extra = bab7Supplement[lang];
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
            <SectionHeading section={copy.sections[0]} />
            <Panel>
              <div className="flex items-center gap-3">
                <Cloud className="h-6 w-6 text-slate-300" />
                <h3 className="font-bold text-white">{copy.pollution}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{extra.pollutionDefinition}</p>
            </Panel>
            <div>
              <h3 className="mb-4 font-bold text-white">{copy.sources}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {t.pollutionSources.map((source) => (
                  <Panel key={source.from}>
                    <Factory className="h-5 w-5 text-slate-300" />
                    <p className="mt-3 font-bold text-white">{source.from}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {source.pollutants.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-rose-300/10 px-3 py-1 text-xs text-rose-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-bold text-white">{copy.effects}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {t.pollutionEffects.map((effect, index) => {
                  const Icon = [HeartPulse, Factory, Leaf, Cloud][index];
                  return (
                    <Panel key={effect.heading}>
                      <Icon className="h-6 w-6 text-sky-300" />
                      <h4 className="mt-3 font-bold text-white">{effect.heading}</h4>
                      <div className="mt-3">
                        <Checklist items={effect.items} />
                      </div>
                    </Panel>
                  );
                })}
              </div>
            </div>
            <Panel>
              <div className="flex items-center gap-3">
                <CircleGauge className="h-6 w-6 text-sky-300" />
                <h3 className="font-bold text-white">{copy.api}</h3>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-5">
                {t.api.map((row, index) => (
                  <div
                    key={row.range}
                    className={`rounded-xl border p-3 ${["border-emerald-300/30 bg-emerald-300/10", "border-sky-300/30 bg-sky-300/10", "border-amber-300/30 bg-amber-300/10", "border-orange-300/30 bg-orange-300/10", "border-rose-300/30 bg-rose-300/10"][index]}`}
                  >
                    <p className="font-mono text-lg font-black text-white">{row.range}</p>
                    <p className="mt-1 text-xs font-bold text-slate-200">{row.label}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[1]} />
            <div className="grid gap-4 lg:grid-cols-3">
              {t.prevention.map((category) => (
                <Panel key={category.heading}>
                  <h3 className="font-bold text-sky-200">{category.heading}</h3>
                  <div className="mt-4">
                    <Checklist items={category.items} />
                  </div>
                </Panel>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[2]} />
            <div className="grid gap-5 lg:grid-cols-2">
              <Panel>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-300" />
                  <h3 className="font-bold text-white">{copy.facts}</h3>
                </div>
                <div className="mt-4">
                  <Checklist items={t.keyExamFacts} />
                </div>
              </Panel>
              <Panel>
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-6 w-6 text-yellow-300" />
                  <h3 className="font-bold text-white">{copy.recall}</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {extra.activeRecall.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                    >
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none">
                        <span>{item.question}</span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-sky-300 transition group-open:rotate-180" />
                      </summary>
                      <p className="pt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </Panel>
            </div>
            <Panel className="border-sky-300/25 bg-gradient-to-br from-sky-300/10 to-emerald-300/10">
              <h3 className="font-bold text-sky-200">{copy.summary}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">{t.chapterSummary}</p>
            </Panel>
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
