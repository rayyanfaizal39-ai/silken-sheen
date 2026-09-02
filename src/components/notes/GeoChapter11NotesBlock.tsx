import type { ReactNode } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  Factory,
  Globe2,
  HousePlus,
  Landmark,
  Lightbulb,
  MapPinned,
  Plane,
  Route,
  Store,
  TriangleAlert,
  Users,
} from "lucide-react";
import type { Geo11Content } from "@/content/form1/geography/chapter-11/geo11-content";

const sections = [
  [
    "11.1",
    "Taburan penduduk serantau",
    "Asia Tenggara mempunyai penduduk yang ramai tetapi tersebar secara tidak sekata.",
  ],
  [
    "11.1",
    "Tiga kategori tumpuan",
    "Ciri fizikal, kegiatan ekonomi dan ketersampaian menentukan padat atau jarangnya sesuatu kawasan.",
  ],
  [
    "11.2",
    "Penduduk mengikut negara",
    "Bandingkan saiz populasi 11 negara berdasarkan anggaran Jun 2016.",
  ],
  [
    "11.3",
    "Lima fungsi bandar utama",
    "Bandar besar menjadi pusat kuasa, ekonomi, industri, pelancongan dan perhubungan.",
  ],
  [
    "11.4–11.5",
    "Profil bandar dan ibu negara",
    "Kenali lokasi, saiz dan peranan lima metropolitan serta ibu negara serantau.",
  ],
  [
    "11.6",
    "Cabaran bandar padat",
    "Pertumbuhan pesat memerlukan perumahan terancang, kemudahan dan bandar baharu.",
  ],
  [
    "Ulang kaji",
    "Bina jawapan berasaskan hubungan",
    "Hubungkan taburan, fungsi bandar, masalah dan langkah penyelesaian.",
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
      <p className="font-mono text-xs font-black uppercase tracking-[.18em] text-fuchsia-300">
        {section[0]}
      </p>
      <h2 className="mt-2 font-display text-2xl font-black leading-tight text-white sm:text-3xl">
        {section[1]}
      </h2>
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

function DensityDots({ index }: { index: number }) {
  const count = [24, 13, 5][index];
  const labels = [
    "Taburan penduduk padat",
    "Taburan penduduk sederhana padat",
    "Taburan penduduk jarang",
  ];
  const colors = ["bg-rose-300", "bg-amber-300", "bg-emerald-300"];
  return (
    <div
      aria-label={labels[index]}
      className="grid h-28 grid-cols-6 gap-2 rounded-xl border border-white/10 bg-slate-950/50 p-3"
    >
      {Array.from({ length: 24 }).map((_, dot) => (
        <span
          key={dot}
          className={`rounded-full ${dot < count ? colors[index] : "border border-white/10"}`}
        />
      ))}
    </div>
  );
}

export function GeoChapter11NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo11Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const maximumPopulation = Number(content.populationByCountry[0].population.replaceAll(",", ""));
  const functionIcons = [Landmark, CircleDollarSign, Factory, Store, Plane];

  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-fuchsia-300/15 bg-[#160a18] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-rose-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-fuchsia-300">
            <Users className="h-6 w-6" aria-hidden="true" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 11
            </p>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Asia Tenggara: manusia, bandar dan ruang kehidupan
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              "640+ juta penduduk",
              "3 kategori taburan",
              "5 fungsi bandar",
              "5 profil metropolitan",
            ].map((label) => (
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
          <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <Panel className="border-fuchsia-300/20">
              <Globe2 className="h-8 w-8 text-fuchsia-300" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black text-white">Maksud taburan penduduk</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{content.overview.definition}</p>
            </Panel>
            <Panel>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 rounded-xl bg-fuchsia-300/10 p-4 text-center">
                  <p className="font-mono text-xl font-black text-fuchsia-100">
                    {content.overview.totalPopulation}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{content.overview.asOf}</p>
                </div>
                <div className="rounded-xl bg-rose-300/10 p-3 text-center">
                  <p className="font-mono text-sm font-black text-rose-100">
                    {content.overview.percentOfWorld}
                  </p>
                </div>
                <div className="rounded-xl bg-violet-300/10 p-3 text-center">
                  <p className="font-mono text-sm font-black text-violet-100">
                    {content.overview.regionArea}
                  </p>
                </div>
              </div>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <div className="grid gap-5 lg:grid-cols-3">
            {content.densityCategories.map((category, index) => (
              <Panel
                key={category.category}
                className={
                  index === 0
                    ? "border-rose-300/20"
                    : index === 1
                      ? "border-amber-300/20"
                      : "border-emerald-300/20"
                }
              >
                <DensityDots index={index} />
                <h3 className="mt-4 text-lg font-black text-white">{category.category}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{category.reason}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Contoh
                </p>
                <div className="mt-2">
                  <Checklist items={category.examples} />
                </div>
              </Panel>
            ))}
          </div>
          <Panel className="border-violet-300/20 bg-violet-300/[0.055]">
            <Route className="h-7 w-7 text-violet-300" aria-hidden="true" />
            <h3 className="mt-3 font-bold text-violet-100">Program transmigrasi Indonesia</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div className="rounded-xl bg-rose-300/10 p-4 text-center text-sm font-bold text-rose-100">
                Pulau Jawa terlalu padat
              </div>
              <span className="text-center text-violet-300">→</span>
              <div className="rounded-xl bg-emerald-300/10 p-4 text-center text-sm font-bold text-emerald-100">
                Pulau lain yang kurang padat
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-300">
              {content.transmigration.purpose} {content.transmigration.movement}
            </p>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <Panel>
            <div className="space-y-3">
              {content.populationByCountry.map((item, index) => {
                const value = Number(item.population.replaceAll(",", ""));
                const width = Math.max(2, (value / maximumPopulation) * 100);
                return (
                  <div
                    key={item.country}
                    className="grid gap-2 sm:grid-cols-[8rem_1fr_7rem] sm:items-center"
                  >
                    <p className="text-sm font-bold text-white">
                      <span className="mr-2 font-mono text-xs text-fuchsia-300">{index + 1}</span>
                      {item.country}
                    </p>
                    <div
                      className="h-3 overflow-hidden rounded-full bg-slate-950/60"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-rose-300"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <p className="font-mono text-xs text-slate-300 sm:text-right">
                      {item.population}
                    </p>
                  </div>
                );
              })}
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.urbanFunctions.map((item, index) => {
              const Icon = functionIcons[index];
              return (
                <Panel key={item.name}>
                  <Icon className="h-8 w-8 text-fuchsia-300" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-black text-white">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                  <div className="mt-4 border-t border-white/10 pt-3">
                    <Checklist items={item.examples} />
                  </div>
                </Panel>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[4]} />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {content.cityProfiles.map((city) => (
              <Panel key={city.city}>
                <MapPinned className="h-7 w-7 text-rose-300" aria-hidden="true" />
                <p className="mt-3 text-xs font-black uppercase tracking-wider text-slate-400">
                  {city.country}
                </p>
                <h3 className="mt-1 text-lg font-black text-white">{city.city}</h3>
                <p className="mt-2 font-mono text-sm font-black text-fuchsia-200">
                  {city.population} orang
                </p>
                <div className="mt-4">
                  <Checklist items={city.facts} />
                </div>
              </Panel>
            ))}
          </div>
          <Panel>
            <div className="flex items-center gap-3">
              <Landmark className="h-7 w-7 text-violet-300" aria-hidden="true" />
              <h3 className="text-lg font-black text-white">11 ibu negara Asia Tenggara</h3>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {content.capitals.map((item) => (
                <div
                  key={item.country}
                  className="rounded-xl border border-white/10 bg-slate-950/35 p-3"
                >
                  <p className="text-xs text-slate-400">{item.country}</p>
                  <p className="mt-1 font-bold text-white">{item.capital}</p>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[5]} />
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel className="border-rose-300/20">
              <TriangleAlert className="h-8 w-8 text-rose-300" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black text-white">Masalah bandar raya padat</h3>
              <div className="mt-4">
                <Checklist items={content.urbanChallenges.problems} />
              </div>
            </Panel>
            <Panel className="border-emerald-300/20">
              <HousePlus className="h-8 w-8 text-emerald-300" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black text-white">Langkah penyelesaian</h3>
              <div className="mt-4">
                <Checklist items={content.urbanChallenges.solutions} />
              </div>
            </Panel>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            <div className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] p-4 text-center font-bold text-rose-100">
              Pertumbuhan pesat
            </div>
            <span className="text-center text-fuchsia-300">→</span>
            <div className="rounded-xl border border-fuchsia-300/20 bg-fuchsia-300/[0.06] p-4 text-center font-bold text-fuchsia-100">
              Tekanan perumahan
            </div>
            <span className="text-center text-fuchsia-300">→</span>
            <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4 text-center font-bold text-emerald-100">
              Perancangan bandar
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[6]} />
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <Check className="h-6 w-6 text-emerald-300" aria-hidden="true" />
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
                    "Negara manakah paling ramai dan paling sedikit penduduk?",
                    "Indonesia paling ramai, manakala Brunei Darussalam paling sedikit.",
                  ],
                  [
                    "Mengapa delta sungai berpenduduk padat?",
                    "Tanihnya subur, sesuai untuk pertanian dan mempunyai ketersampaian yang baik.",
                  ],
                  [
                    "Apakah tujuan transmigrasi?",
                    "Mengurangkan kepadatan Pulau Jawa dengan memindahkan penduduk ke pulau lain.",
                  ],
                  [
                    "Apakah lima fungsi bandar utama?",
                    "Pentadbiran, perdagangan dan kewangan, perindustrian, pelancongan, serta perhubungan dan pengangkutan.",
                  ],
                  [
                    "Bagaimanakah kesesakan bandar dapat dikurangkan?",
                    "Bina perumahan terancang, lengkapkan kemudahan, bantu penduduk setinggan dan wujudkan bandar baharu.",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300">
                      <span>{question}</span>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-fuchsia-300 transition group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel className="border-fuchsia-300/25 bg-gradient-to-br from-fuchsia-300/10 to-rose-300/10">
            <div className="flex items-start gap-3">
              <Building2 className="mt-1 h-6 w-6 shrink-0 text-fuchsia-300" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-fuchsia-100">Rumusan bab</h3>
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
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-fuchsia-300 to-rose-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? "Bab 11 telah selesai" : "Tandakan Bab 11 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
