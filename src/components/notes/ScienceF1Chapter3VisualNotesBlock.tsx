import { type ReactNode } from "react";
import { BookOpenCheck, CheckCircle2, CircleGauge } from "lucide-react";
import type { Chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";

import {
  HomeostaticControlVisual,
  WaterRegulationVisual,
  TemperatureRegulationVisual,
  SweatingExperimentVisual,
  PulseExperimentVisual,
} from "./blocks/Chapter3HomeostasisVisuals";

import { Chapter3AnimalHomeostasis } from "./blocks/Chapter3AnimalHomeostasis";

import { Chapter3PlantHomeostasis, Chapter3Importance } from "./blocks/Chapter3PlantHomeostasis";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Chapter 3 visual map",
    subtitle: "How humans, animals and plants maintain a stable internal environment.",
    origin: "Word origin",
    importance: "Why stability matters",
    examFacts: "Key exam facts",
    practice: "Test your explanation",
    summary: "Chapter summary",
    mark: "Mark Chapter 3 Complete",
    marked: "Chapter 3 complete",
    questions: [
      [
        "How do blood vessels and sweat glands cool the body?",
        "Skin blood vessels dilate to increase heat loss. More sweat evaporates from the skin and removes heat.",
      ],
      [
        "Why drink during vigorous exercise before severe thirst?",
        "Heavy sweating removes water from blood and tissues. Drinking restores water balance before dehydration becomes serious.",
      ],
      [
        "How do banana leaves and bees limit water loss?",
        "Banana leaves roll up to reduce exposure; bees have a waxy layer and close spiracles between breaths.",
      ],
    ],
    human: "Human",
    chapterCheck: "Chapter Check",
  },
  bm: {
    eyebrow: "Peta visual Bab 3",
    subtitle:
      "Bagaimana manusia, haiwan dan tumbuhan mengekalkan persekitaran dalaman yang stabil.",
    origin: "Asal perkataan",
    importance: "Mengapa kestabilan penting",
    examFacts: "Fakta penting peperiksaan",
    practice: "Uji penerangan anda",
    summary: "Rumusan bab",
    mark: "Tandakan Bab 3 Selesai",
    marked: "Bab 3 selesai",
    questions: [
      [
        "Bagaimanakah salur darah dan kelenjar peluh menyejukkan badan?",
        "Salur darah kulit berdilat untuk meningkatkan kehilangan haba. Lebih banyak peluh menyejat dari kulit dan menyingkirkan haba.",
      ],
      [
        "Mengapa perlu minum ketika bersenam cergas sebelum terlalu dahaga?",
        "Peluh yang banyak menyingkirkan air daripada darah dan tisu. Minum memulihkan keseimbangan air sebelum dehidrasi menjadi serius.",
      ],
      [
        "Bagaimanakah daun pisang dan lebah mengehadkan kehilangan air?",
        "Daun pisang menggulung untuk mengurangkan pendedahan; lebah mempunyai lapisan berlilin dan menutup spirakel antara pernafasan.",
      ],
    ],
    human: "Manusia",
    chapterCheck: "Semakan Bab",
  },
} as const;

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:p-5 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="max-w-3xl">
      <h3 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">{title}</h3>
    </div>
  );
}

function Checklist({ items }: { items: readonly string[] | string[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <p key={item} className="flex gap-2 text-sm leading-6 text-slate-300">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
          {item}
        </p>
      ))}
    </div>
  );
}

export function ScienceF1Chapter3VisualNotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter3Content; bm: Chapter3Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const c = ui[lang];
  const path = [
    t.structure.subtopic.replace(/^3\.1 /, ""),
    `${c.human} — ${t.structure.water}`,
    `${c.human} — ${t.structure.temperature}`,
    t.structure.animals,
    t.structure.plants,
    t.structure.importance,
  ];

  return (
    <section
      id={id}
      data-lang={lang}
      data-chapter="3"
      className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#061923] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_14%_8%,rgba(6,182,212,.12),transparent_34%),radial-gradient(circle_at_84%_10%,rgba(56,189,248,.14),transparent_30%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-950/35 to-cyan-400/10 p-5 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-cyan-200">
            <CircleGauge className="h-4 w-4" aria-hidden="true" />
            {c.eyebrow}
          </div>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-[1.04] text-white sm:text-5xl">
            {t.structure.chapter}
          </h1>
          <p className="mt-3 text-sm text-slate-300">{c.subtitle}</p>
          <div data-chapter-path="true" className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {path.map((title, index) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                {index === 0 && (
                  <span className="font-mono text-xs font-bold text-cyan-300">3.1</span>
                )}
                <p className="text-sm font-semibold text-white">{title}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="space-y-6" data-curriculum-subtopic="3.1">
          <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
            {t.structure.subtopic}
          </h2>
          <div data-learning-standard="3.1.1">
            <Panel>
              <SectionHeading title={t.structure.meaning} />
              <p className="mt-4 text-sm leading-6 text-slate-300">{t.definition.meaning}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs font-black uppercase text-amber-300">{c.origin}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.definition.etymology}</p>
                </div>
                <div className="rounded-xl bg-rose-300/10 p-3">
                  <p className="text-xs font-black uppercase text-rose-200">{c.importance}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.definition.importance}</p>
                </div>
              </div>
            </Panel>
          </div>
        </div>
        <section data-learning-standard="3.1.2" className="space-y-6">
          <SectionHeading title={t.structure.humans} />
          <HomeostaticControlVisual content={t} lang={lang} />
          <WaterRegulationVisual content={t} lang={lang} />
          <TemperatureRegulationVisual content={t} lang={lang} />
          <SweatingExperimentVisual content={t} lang={lang} />
          <PulseExperimentVisual content={t} lang={lang} />

          <div className="space-y-6">
            <SectionHeading title={t.structure.animals} />
            <Chapter3AnimalHomeostasis content={t} lang={lang} />
          </div>
        </section>
        <section data-learning-standard="3.1.3" className="space-y-6">
          <SectionHeading title={t.structure.plants} />
          <Chapter3PlantHomeostasis content={t} lang={lang} />
        </section>
        <section data-learning-standard="3.1.4" className="space-y-6">
          <SectionHeading title={t.structure.importance} />
          <Chapter3Importance content={t} />
        </section>

        <div className="space-y-6">
          <SectionHeading title={c.chapterCheck} />
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <Panel>
              <h3 className="font-black text-white">{c.examFacts}</h3>
              <div className="mt-4">
                <Checklist items={t.keyExamFacts} />
              </div>
            </Panel>
            <Panel>
              <h3 className="font-black text-white">{c.practice}</h3>
              <div className="mt-4 space-y-3">
                {c.questions.map(([question, answer], index) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-white/[0.035] p-3"
                  >
                    <summary className="cursor-pointer list-none font-black text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
                      <span className="mr-2 font-mono text-cyan-300">Q{index + 1}</span>
                      {question}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel>
            <h3 className="font-black text-white">{c.summary}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t.chapterSummary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.keyTerms.map((term) => (
                <span
                  key={term}
                  className="rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1 text-xs font-bold text-amber-100"
                >
                  {term}
                </span>
              ))}
            </div>
          </Panel>
          {onMarkRead && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onMarkRead}
                disabled={isRead}
                className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${isRead ? "cursor-default bg-emerald-500/20 text-emerald-200" : "bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:scale-105 motion-reduce:hover:scale-100"}`}
              >
                <BookOpenCheck className="h-5 w-5" />
                {isRead ? c.marked : c.mark}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
