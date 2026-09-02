import type { ReactNode } from "react";
import {
  Bug,
  Check,
  ChevronDown,
  CloudRain,
  Droplets,
  Flame,
  GraduationCap,
  Leaf,
  Lightbulb,
  Megaphone,
  PackageOpen,
  Recycle,
  Scale,
  Trash2,
  WalletCards,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import type { Geo13Content } from "@/content/form1/geography/chapter-13/geo13-content";

const sections = [
  [
    "13.1–13.2",
    "Kenali dan kelaskan sisa domestik",
    "Bezakan jenis bahan daripada keadaan fizikal supaya pengelasan tidak bercampur.",
  ],
  [
    "13.3",
    "Empat kesan pembuangan sisa",
    "Ikuti rantaian daripada tindakan manusia kepada kesan terhadap alam, kesihatan dan bandar.",
  ],
  [
    "13.4",
    "Lima langkah mengurangkan kesan",
    "Perubahan tabiat, teknologi, undang-undang, kempen dan pendidikan perlu bergerak bersama.",
  ],
  [
    "Ulang kaji",
    "Bina jawapan geografi yang lengkap",
    "Gunakan pola tindakan → proses → kesan → langkah untuk menjawab soalan struktur.",
  ],
] as const;

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:p-5 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ section }: { section: (typeof sections)[number] }) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs font-black uppercase tracking-[.18em] text-lime-300">
        {section[0]}
      </p>
      <h2 className="mt-2 font-display text-2xl font-black leading-tight text-white sm:text-3xl">
        {section[1]}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">{section[2]}</p>
    </div>
  );
}

function Checklist({ items, tone = "lime" }: { items: string[]; tone?: "lime" | "rose" }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
          <Check
            className={`mt-1 h-4 w-4 shrink-0 ${tone === "rose" ? "text-rose-300" : "text-lime-300"}`}
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function WasteFlowDiagram() {
  const stages = ["Sisa dibuang", "Saliran tersumbat", "Hujan lebat", "Banjir kilat"];

  return (
    <div
      aria-label="Sisa dibuang ke saliran lalu menyumbat aliran. Semasa hujan lebat, keadaan ini menyebabkan banjir kilat."
      className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center"
    >
      {stages.map((stage, index) => (
        <div key={stage} className="contents">
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4 text-center text-sm font-bold text-white">
            {stage}
          </div>
          {index < stages.length - 1 && (
            <span className="text-center text-sky-300" aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function GeoChapter13NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo13Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const effectIcons = [Wind, Bug, CloudRain, WalletCards];
  const stepIcons = [Recycle, Zap, Scale, Megaphone, GraduationCap];

  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-lime-300/15 bg-[#0a1510] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-lime-300">
            <Trash2 className="h-6 w-6" aria-hidden="true" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 13
            </p>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Sisa domestik: daripada rumah kepada kesan seluruh bandar
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["2 kategori bahan", "2 keadaan fizikal", "4 kesan", "5 langkah"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-slate-300"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-14 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section className="space-y-6">
          <SectionHeading section={sections[0]} />
          <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
            <Panel className="border-lime-300/20 bg-lime-300/[0.055]">
              <Trash2 className="h-8 w-8 text-lime-300" aria-hidden="true" />
              <p className="mt-4 font-mono text-4xl font-black text-lime-200 sm:text-5xl">
                {content.headlineStat.value}
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-white">
                {content.headlineStat.label}
              </p>
              <p className="mt-2 text-xs text-slate-400">{content.headlineStat.period}</p>
            </Panel>
            <Panel>
              <h3 className="text-lg font-black text-white">Apakah sisa domestik?</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{content.overview}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-lime-300/10 p-4">
                  <p className="font-bold text-lime-100">Kandungan bahan</p>
                  <p className="mt-1 text-sm text-slate-300">Organik atau bukan organik</p>
                </div>
                <div className="rounded-xl bg-sky-300/10 p-4">
                  <p className="font-bold text-sky-100">Keadaan fizikal</p>
                  <p className="mt-1 text-sm text-slate-300">Pepejal atau cecair</p>
                </div>
              </div>
            </Panel>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {content.wasteCategories.map((category, index) => {
              const Icon = index === 0 ? Leaf : PackageOpen;
              return (
                <Panel
                  key={category.category}
                  className={index === 0 ? "border-lime-300/20" : "border-amber-300/20"}
                >
                  <Icon
                    className={`h-8 w-8 ${index === 0 ? "text-lime-300" : "text-amber-300"}`}
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-xs font-black uppercase tracking-wider text-slate-400">
                    Kategori {index + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-black capitalize text-white">
                    Bahan {category.category}
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-white">
                    {category.definition}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{category.source}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.examples.map((example) => (
                      <span
                        key={example}
                        className="rounded-full border border-white/10 bg-slate-950/35 px-3 py-1.5 text-xs text-slate-200"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </Panel>
              );
            })}
          </div>

          <Panel>
            <div className="flex items-center gap-3">
              <Droplets className="h-7 w-7 text-sky-300" aria-hidden="true" />
              <h3 className="text-lg font-black text-white">Kelaskan mengikut keadaan fizikal</h3>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
              <div className="rounded-xl border border-white/10 bg-slate-950/35 p-4">
                <p className="font-bold text-lime-100">Sisa pepejal</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {content.solidWasteExamples.map((example) => (
                    <span
                      key={example}
                      className="rounded-full bg-lime-300/10 px-3 py-1.5 text-xs text-lime-100"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/35 p-4">
                <p className="font-bold text-sky-100">Sisa cecair</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {content.liquidWasteExamples.map((example) => (
                    <span
                      key={example}
                      className="rounded-full bg-sky-300/10 px-3 py-1.5 text-xs text-sky-100"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <div className="grid gap-5 md:grid-cols-2">
            {content.effects.map((effect, index) => {
              const Icon = effectIcons[index];
              return (
                <Panel key={effect.effect} className="border-rose-300/15">
                  <div className="flex items-start justify-between gap-3">
                    <Icon className="h-8 w-8 text-rose-300" aria-hidden="true" />
                    <span className="font-mono text-xs font-black text-slate-500">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-black text-white">{effect.effect}</h3>
                  <div className="mt-4">
                    <Checklist items={effect.details} tone="rose" />
                  </div>
                </Panel>
              );
            })}
          </div>

          <Panel className="border-sky-300/20">
            <p className="text-xs font-black uppercase tracking-wider text-sky-300">
              Rantaian banjir kilat
            </p>
            <div className="mt-4">
              <WasteFlowDiagram />
            </div>
          </Panel>

          <div className="grid gap-3 sm:grid-cols-5">
            {["Taun", "Demam denggi", "Malaria", "Rotavirus", "Virus zika"].map((disease) => (
              <div
                key={disease}
                className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] p-4 text-center text-sm font-bold text-rose-100"
              >
                {disease}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <Panel className="border-lime-300/20 bg-lime-300/[0.055]">
            <Recycle className="h-8 w-8 text-lime-300" aria-hidden="true" />
            <h3 className="mt-3 text-lg font-black text-white">Amalan 3R bermula di rumah</h3>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {content.threeR.map((item, index) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-white/10 bg-slate-950/35 p-4"
                >
                  <span className="font-mono text-xs font-black text-lime-300">0{index + 1}</span>
                  <h4 className="mt-2 font-black text-white">{item.name}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.examples.map((example) => (
                      <span
                        key={example}
                        className="rounded-full bg-lime-300/10 px-2.5 py-1 text-xs text-lime-100"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {content.mitigationMeasures.map((measure, index) => {
              const Icon = stepIcons[index];
              return (
                <Panel key={measure.name} className="border-emerald-300/15">
                  <div className="flex items-start justify-between gap-3">
                    <Icon className="h-8 w-8 text-emerald-300" aria-hidden="true" />
                    <span className="font-mono text-xs font-black text-emerald-300/70">
                      {String(measure.step).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-black text-white">{measure.name}</h3>
                  <div className="mt-4">
                    <Checklist items={measure.details} />
                  </div>
                </Panel>
              );
            })}
          </div>

          <Panel className="border-amber-300/20 bg-amber-300/[0.055]">
            <Flame className="h-7 w-7 text-amber-300" aria-hidden="true" />
            <h3 className="mt-3 font-bold text-amber-100">Teknologi yang mengubah sisa</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-950/35 p-4">
                <p className="font-mono text-3xl font-black text-amber-200">85%</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  pengurangan sisa yang dihantar ke tapak pelupusan melalui loji Waste to Energy.
                </p>
              </div>
              <div className="rounded-xl bg-slate-950/35 p-4">
                <p className="font-bold text-emerald-100">Ubi kayu → pinggan biodegradasi</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Produk mesra alam menggantikan polistirena yang sukar diuraikan.
                </p>
              </div>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <Check className="h-6 w-6 text-lime-300" aria-hidden="true" />
                <h3 className="font-bold text-white">Fakta skor tinggi</h3>
              </div>
              <div className="mt-4">
                <Checklist items={content.keyExamFacts} />
              </div>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-300" aria-hidden="true" />
                <h3 className="font-bold text-white">Ingatan aktif</h3>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  [
                    "Apakah maksud sisa domestik?",
                    "Sisa pepejal dan cecair yang terhasil dari kawasan perumahan.",
                  ],
                  [
                    "Apakah beza bahan organik dengan bukan organik?",
                    "Bahan organik berasal daripada haiwan atau tumbuhan dan boleh diuraikan; bahan bukan organik berasal daripada mineral dan sukar diuraikan.",
                  ],
                  [
                    "Bagaimanakah sisa domestik menyebabkan banjir kilat?",
                    "Sisa menyumbat longkang, parit dan sungai. Semasa hujan lebat, saliran gagal menampung air lalu berlaku banjir kilat.",
                  ],
                  [
                    "Nyatakan empat kesan utama pembuangan sisa domestik.",
                    "Pencemaran alam sekitar, wabak penyakit, banjir kilat dan peningkatan kos penyelenggaraan.",
                  ],
                  [
                    "Apakah lima langkah mengurangkan kesan sisa domestik?",
                    "Amalan 3R, teknologi terkini, penguatkuasaan undang-undang, kempen kesedaran dan pendidikan.",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300">
                      <span>{question}</span>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-lime-300 transition group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>

          <Panel className="border-lime-300/25 bg-gradient-to-br from-lime-300/10 to-emerald-300/10">
            <div className="flex items-start gap-3">
              <Waves className="mt-1 h-6 w-6 shrink-0 text-lime-300" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-lime-100">Rumusan bab</h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">{content.chapterSummary}</p>
              </div>
            </div>
          </Panel>

          {onMarkRead && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onMarkRead}
                disabled={isRead}
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-lime-300 to-emerald-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? "Bab 13 telah selesai" : "Tandakan Bab 13 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
