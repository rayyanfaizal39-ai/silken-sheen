import { Chapter8Dispersion } from "./Chapter8Dispersion";
import { Chapter8Scattering } from "./Chapter8Scattering";
import { Chapter8Refraction } from "./Chapter8Refraction";
import { Chapter8PropertiesOfLight } from "./Chapter8PropertiesOfLight";
import { Chapter8Reflection } from "./Chapter8Reflection";
import { Chapter8Mirrors } from "./Chapter8Mirrors";
import { useState, type ReactNode } from "react";
import { Aperture, Check, ChevronDown, Filter, Lightbulb, Palette, Sparkles } from "lucide-react";
import type { Chapter8Content } from "@/content/form1/science/chapter-8/chapter8-content";
import { chapter8Supplement } from "@/content/form1/science/chapter-8/chapter8-content";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Form 1 Science · Chapter 8",
    title: "Light changes direction, colour, and what we see",
    subtitle:
      "Trace light through mirrors, boundaries, prisms, particles, objects, and filters using evidence you can draw and explain.",
    sections: [
      [
        "8.7",
        "Objects and filters subtract light",
        "The colours that survive absorption determine what reaches the eye.",
      ],
      [
        "Review",
        "Build explanations from ray behaviour",
        "Use the correct principle, direction, and observation in every answer.",
      ],
    ],
    activity: "Activity 8.1 evidence",
    chooseMirror: "Choose a mirror",
    image: "Image characteristics",
    applications: "Daily applications",
    instruments: "Optical instruments",
    experiment: "Experiment",
    addition: "Choose two primary lights",
    allThree: "All three primary lights",
    subtraction: "Object-colour subtraction",
    object: "Object",
    incident: "Incident light",
    reflected: "Reflected / seen",
    absorbed: "Absorbed",
    filterRules: "Colour-filter rules",
    filterMatrix: "Overlapping filter outcomes",
    first: "First filter",
    second: "Second filter",
    result: "Result",
    reason: "Reason",
    facts: "High-yield facts",
    recall: "Active recall",
    summary: "Chapter rule",
    mark: "Mark Chapter 8 as read",
    marked: "Chapter 8 completed",
  },
  bm: {
    eyebrow: "Sains Tingkatan 1 · Bab 8",
    title: "Cahaya mengubah arah, warna, dan apa yang kita lihat",
    subtitle:
      "Jejaki cahaya melalui cermin, sempadan, prisma, zarah, objek, dan penapis menggunakan bukti yang boleh dilukis dan diterangkan.",
    sections: [
      [
        "8.7",
        "Objek dan penapis menolak cahaya",
        "Warna yang tidak diserap menentukan cahaya yang sampai ke mata.",
      ],
      [
        "Ulang kaji",
        "Bina penerangan daripada tingkah laku sinar",
        "Gunakan prinsip, arah, dan pemerhatian yang betul dalam setiap jawapan.",
      ],
    ],
    activity: "Bukti Aktiviti 8.1",
    chooseMirror: "Pilih satu cermin",
    image: "Ciri imej",
    applications: "Aplikasi harian",
    instruments: "Alat optik",
    experiment: "Eksperimen",
    addition: "Pilih dua cahaya primer",
    allThree: "Ketiga-tiga cahaya primer",
    subtraction: "Penolakan warna objek",
    object: "Objek",
    incident: "Cahaya tuju",
    reflected: "Dipantulkan / dilihat",
    absorbed: "Diserap",
    filterRules: "Peraturan penapis warna",
    filterMatrix: "Hasil penapis bertindih",
    first: "Penapis pertama",
    second: "Penapis kedua",
    result: "Hasil",
    reason: "Sebab",
    facts: "Fakta skor tinggi",
    recall: "Ingatan aktif",
    summary: "Hukum bab",
    mark: "Tandakan Bab 8 selesai",
    marked: "Bab 8 telah selesai",
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
      <p className="font-mono text-xs font-black uppercase tracking-[.18em] text-violet-300">
        {section[0]}
      </p>
      <h2 className="mt-2 font-display text-2xl font-black leading-tight text-white sm:text-3xl">
        {section[1]}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">{section[2]}</p>
    </div>
  );
}

function Tabs({
  labels,
  selected,
  onSelect,
}: {
  labels: string[];
  selected: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist">
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          role="tab"
          aria-selected={selected === index}
          onClick={() => onSelect(index)}
          className={`min-h-12 cursor-pointer rounded-xl border px-4 py-2 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 ${selected === index ? "border-violet-300/50 bg-violet-300/15 text-violet-100" : "border-white/10 bg-slate-950/40 text-slate-300 hover:border-white/25"}`}
        >
          {label}
        </button>
      ))}
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

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[680px] border-collapse text-left text-sm">
        <thead className="bg-violet-300/10 text-violet-100">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row) => (
            <tr key={row.join("-")} className="bg-slate-950/20">
              {row.map((cell, index) => (
                <td
                  key={`${cell}-${index}`}
                  className={`px-4 py-3 align-top leading-6 ${index === 0 ? "font-semibold text-white" : "text-slate-300"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ScienceF1Chapter8VisualNotesBlock({
  id,
  content,
  lang = "en",
  onMarkRead,
  isRead = false,
  storageKey: _storageKey,
}: {
  id?: string;
  content: { en: Chapter8Content; bm: Chapter8Content };
  lang?: Lang;
  onMarkRead?: () => void;
  isRead?: boolean;
  storageKey?: string;
}) {
  const t = content[lang];
  const extra = chapter8Supplement[lang];
  const copy = ui[lang];
  const [mix, setMix] = useState(0);
  const mixes = t.colorAdditionSubtraction.additionFormula;

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[#06091b] text-slate-100 shadow-2xl shadow-violet-950/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(139,92,246,.16),transparent_30%),radial-gradient(circle_at_90%_34%,rgba(14,165,233,.12),transparent_32%)]" />
      <div className="relative px-4 py-8 sm:px-7 sm:py-10 lg:px-10">
        <header className="rounded-3xl border border-violet-300/20 bg-slate-950/55 p-5 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-black uppercase tracking-[.2em] text-violet-300">
                {copy.eyebrow}
              </p>
              <h1 className="mt-3 font-display text-3xl font-black leading-tight text-white sm:text-5xl">
                {t.title}
              </h1>
            </div>
            <div className="relative mx-auto grid h-36 w-36 shrink-0 place-items-center rounded-full border border-violet-300/30 bg-violet-300/10 lg:mx-0">
              <Aperture className="h-20 w-20 text-violet-300" aria-hidden="true" />
              <Sparkles
                className="absolute right-4 top-4 h-6 w-6 text-sky-300"
                aria-hidden="true"
              />
            </div>
          </div>
          <nav aria-label={t.title} className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {t.subtopics.map(({ code, title }) => (
              <a
                key={code}
                href={`#chapter8-${code.replace(".", "")}`}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-bold text-violet-100"
              >
                {code} {title}
              </a>
            ))}
          </nav>
        </header>

        <div className="mt-12 space-y-16">
          <section id="chapter8-81" data-official-subtopic="8.1" className="space-y-6">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {t.subtopics[0].code} {t.subtopics[0].title}
            </h2>
            <Chapter8Mirrors source={t.mirrors} />
          </section>

          <section id="chapter8-82" data-official-subtopic="8.2" className="space-y-6">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {t.subtopics[1].code} {t.subtopics[1].title}
            </h2>
            <Chapter8PropertiesOfLight source={t.propertiesOfLight} />
          </section>
          <section id="chapter8-83" data-official-subtopic="8.3" className="space-y-6">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {t.subtopics[2].code} {t.subtopics[2].title}
            </h2>
            <Chapter8Reflection source={t.reflection} />
          </section>

          <section id="chapter8-84" data-official-subtopic="8.4" className="space-y-6">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {t.subtopics[3].code} {t.subtopics[3].title}
            </h2>
            <Chapter8Refraction source={t.refraction} />
          </section>

          <section id="chapter8-85" data-official-subtopic="8.5" className="space-y-6">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {t.subtopics[4].code} {t.subtopics[4].title}
            </h2>
            <Chapter8Dispersion source={t.dispersion} />
          </section>
          <section id="chapter8-86" data-official-subtopic="8.6" className="space-y-6">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {t.subtopics[5].code} {t.subtopics[5].title}
            </h2>
            <Chapter8Scattering source={t.scattering} />
          </section>

          <section id="chapter8-87" data-official-subtopic="8.7" className="space-y-6">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              {t.subtopics[6].code} {t.subtopics[6].title}
            </h2>
            <p
              data-colour-refinement="additionDefinition"
              className="text-sm leading-6 text-slate-300"
            >
              {t.colorAdditionSubtraction.additionDefinition}
            </p>
            <Panel>
              <div className="flex items-center gap-3">
                <Palette className="h-6 w-6 text-fuchsia-300" />
                <h3 className="font-bold text-white">{copy.addition}</h3>
              </div>
              <div className="mt-4">
                <Tabs
                  labels={mixes.map((item) => `${item.color1} + ${item.color2}`)}
                  selected={mix}
                  onSelect={setMix}
                />
              </div>
              <div
                className="mt-5 flex items-center justify-center gap-4 rounded-2xl bg-slate-950/35 p-6"
                role="tabpanel"
              >
                <span className="rounded-full border border-white/20 px-4 py-3 font-bold text-white">
                  {mixes[mix].color1}
                </span>
                <span className="font-black text-slate-400">+</span>
                <span className="rounded-full border border-white/20 px-4 py-3 font-bold text-white">
                  {mixes[mix].color2}
                </span>
                <span className="font-black text-slate-400">=</span>
                <span className="rounded-full bg-fuchsia-300/20 px-5 py-3 text-lg font-black text-fuchsia-100">
                  {mixes[mix].result}
                </span>
              </div>
              <div className="mt-5 rounded-xl border border-white/15 bg-white/10 p-4 text-center">
                <p className="text-xs font-bold uppercase text-slate-300">{copy.allThree}</p>
                <p className="mt-2 font-mono text-xl font-black text-white">
                  {t.colorAdditionSubtraction.allThreeMixed}
                </p>
              </div>
              <p
                data-colour-refinement="additionEverydayExample"
                className="text-sm leading-6 text-slate-300"
              >
                {t.colorAdditionSubtraction.additionEverydayExample}
              </p>
            </Panel>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-bold">{copy.sections[0][1]}</h3>
            <p
              data-colour-refinement="subtractionDefinition"
              className="text-sm leading-6 text-slate-300"
            >
              {t.colorAdditionSubtraction.subtractionDefinition}
            </p>
            <p
              data-colour-refinement="additionSubtractionComparison"
              className="text-sm leading-6 text-slate-300"
            >
              {t.colorAdditionSubtraction.additionSubtractionComparison}
            </p>
            <p className="max-w-3xl text-sm leading-6 text-slate-300">
              {t.colorAdditionSubtraction.subtractionPrinciple}
            </p>
            <DataTable
              headers={[copy.object, copy.incident, copy.reflected, copy.absorbed]}
              rows={extra.objectColourRows.map((item) => [
                item.object,
                item.incident,
                item.reflected,
                item.absorbed,
              ])}
            />
            <div>
              <h3 className="mb-4 font-bold text-white">{copy.filterRules}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {extra.filters.map((item) => (
                  <Panel key={item.type}>
                    <Filter className="h-6 w-6 text-violet-300" />
                    <h4 className="mt-3 font-bold text-white">{item.type}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.rule}</p>
                    <div className="mt-3">
                      <Checklist items={item.examples} />
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-bold text-white">{copy.filterMatrix}</h3>
              <DataTable
                headers={[copy.first, copy.second, copy.result, copy.reason]}
                rows={extra.filterMatrix.map((item) => [
                  item.first,
                  item.second,
                  item.result,
                  item.reason,
                ])}
              />
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[1]} />
            <div className="grid gap-5 lg:grid-cols-2">
              <Panel>
                <div className="flex items-center gap-3">
                  <Check className="h-6 w-6 text-emerald-300" />
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
                        <ChevronDown className="h-4 w-4 shrink-0 text-violet-300 transition group-open:rotate-180" />
                      </summary>
                      <p className="pt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </Panel>
            </div>
            <Panel className="border-violet-300/25 bg-gradient-to-br from-violet-300/10 to-sky-300/10">
              <h3 className="font-bold text-violet-200">{copy.summary}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">{t.chapterSummary}</p>
            </Panel>
            {onMarkRead && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={onMarkRead}
                  disabled={isRead}
                  className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-violet-400 to-sky-400 text-slate-950 hover:brightness-110"}`}
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
