import type { ReactNode } from "react";
import {
  Check,
  ChevronDown,
  Compass,
  Fish,
  Flame,
  Globe2,
  Lightbulb,
  Map,
  Mountain,
  Navigation,
  Ship,
  Sprout,
  Waves,
  Zap,
} from "lucide-react";
import type { Geo10Content } from "@/content/form1/geography/chapter-10/geo10-content";

const sections = [
  [
    "10.1",
    "Kenali Asia Tenggara",
    "Letakkan 11 negara dalam ruang, kedudukan astronomi dan keluasan rantau.",
  ],
  [
    "10.2",
    "Empat bentuk muka bumi",
    "Bandingkan tanah tinggi, tanah pamah, pinggir laut dan kawasan gunung berapi.",
  ],
  [
    "10.3",
    "Sungai utama",
    "Sungai menyokong pertanian, pengangkutan, perniagaan, perikanan dan petempatan.",
  ],
  [
    "10.3",
    "Tasik utama",
    "Tasik semula jadi, vulkanik dan buatan manusia menjalankan fungsi yang berbeza.",
  ],
  [
    "Ulang kaji",
    "Baca hubungan alam dan manusia",
    "Hubungkan ciri fizikal dengan kegunaan dan kepentingannya kepada penduduk.",
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
      <p className="font-mono text-xs font-black uppercase tracking-[.18em] text-teal-300">
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

function LandformDiagram({ type }: { type: "highland" | "lowland" | "coast" | "volcano" }) {
  return (
    <div
      aria-label={
        {
          highland: "Rajah kawasan tanah tinggi",
          lowland: "Rajah kawasan tanah pamah",
          coast: "Rajah kawasan pinggir laut",
          volcano: "Rajah kawasan gunung berapi",
        }[type]
      }
      className="relative h-28 overflow-hidden rounded-xl border border-white/10 bg-slate-950/55"
    >
      {type === "highland" && (
        <>
          <span className="absolute bottom-0 left-0 h-14 w-1/2 origin-bottom-left -skew-x-[28deg] bg-emerald-400/40" />
          <span className="absolute bottom-0 right-0 h-20 w-3/5 origin-bottom-right skew-x-[32deg] bg-teal-300/40" />
          <span className="absolute left-[47%] top-3 h-3 w-3 rounded-full bg-white/70" />
        </>
      )}
      {type === "lowland" && (
        <>
          <span className="absolute bottom-0 left-0 right-0 h-12 bg-lime-300/25" />
          <span className="absolute bottom-12 left-0 right-0 h-px bg-lime-200/60" />
          <span className="absolute bottom-5 left-[18%] h-5 w-8 rounded-sm bg-amber-200/60" />
          <span className="absolute bottom-5 right-[22%] h-5 w-8 rounded-sm bg-amber-200/60" />
        </>
      )}
      {type === "coast" && (
        <>
          <span className="absolute bottom-0 left-0 h-16 w-[43%] bg-amber-200/35" />
          <span className="absolute bottom-0 right-0 h-16 w-[57%] bg-cyan-300/25" />
          <span className="absolute bottom-14 right-0 h-px w-[63%] bg-cyan-200/60" />
          <Ship
            className="absolute bottom-8 right-[18%] h-7 w-7 text-cyan-200"
            aria-hidden="true"
          />
        </>
      )}
      {type === "volcano" && (
        <>
          <span className="absolute bottom-0 left-[20%] h-20 w-3/5 origin-bottom -skew-x-[24deg] bg-rose-400/35" />
          <span className="absolute left-[47%] top-2 h-8 w-3 rounded-full bg-orange-300/60 blur-sm" />
          <Flame
            className="absolute left-1/2 top-3 h-6 w-6 -translate-x-1/2 text-orange-300"
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}

export function GeoChapter10NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo10Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const landformCards = [
    {
      type: "highland" as const,
      title: "Tanah Tinggi",
      icon: Mountain,
      note: content.landforms.highlands.note,
      facts: [...content.landforms.highlands.ranges, ...content.landforms.highlands.plateaus],
    },
    {
      type: "lowland" as const,
      title: "Tanah Pamah",
      icon: Sprout,
      note: content.landforms.lowlands.note,
      facts: content.landforms.lowlands.examples,
    },
    {
      type: "coast" as const,
      title: "Pinggir Laut",
      icon: Waves,
      note: content.landforms.coastline.note,
      facts: [...content.landforms.coastline.seas, content.landforms.coastline.shelfNote],
    },
    {
      type: "volcano" as const,
      title: "Gunung Berapi",
      icon: Flame,
      note: "Terbentuk melalui proses vulkanik di kawasan kerak bumi aktif, terutama di Indonesia dan Filipina.",
      facts: content.landforms.volcanoes.map((volcano) => `${volcano.name} (${volcano.country})`),
    },
  ];

  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-teal-300/15 bg-[#071613] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-teal-300">
            <Globe2 className="h-6 w-6" aria-hidden="true" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 10
            </p>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Asia Tenggara: landskap yang menghubungkan sebuah rantau
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["11 negara", "4 bentuk muka bumi", "3 sungai utama", "3 tasik utama"].map((label) => (
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
            <Panel className="border-teal-300/20">
              <Compass className="h-8 w-8 text-teal-300" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black text-white">Kedudukan rantau</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{content.overview.location}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-teal-300/10 p-3 text-center">
                  <p className="font-mono text-xl font-black text-teal-100">
                    {content.overview.totalCountries}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">buah negara</p>
                </div>
                <div className="rounded-xl bg-sky-300/10 p-3 text-center">
                  <p className="font-mono text-sm font-black text-sky-100">
                    {content.overview.totalArea}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">keluasan</p>
                </div>
              </div>
            </Panel>
            <Panel>
              <Map className="h-8 w-8 text-sky-300" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black text-white">11 negara Asia Tenggara</h3>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {content.countries.map((country, index) => (
                  <div
                    key={country.name}
                    className="rounded-xl border border-white/10 bg-slate-950/35 p-3"
                  >
                    <p className="font-mono text-xs text-teal-300">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">{country.name}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Panel>
              <h3 className="font-bold text-teal-200">Tanah Besar</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {content.overview.mainlandCountries.join(" · ")}
              </p>
            </Panel>
            <Panel>
              <h3 className="font-bold text-sky-200">Kepulauan</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {content.overview.maritimeCountries.join(" · ")}
              </p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <div className="grid gap-5 md:grid-cols-2">
            {landformCards.map((item) => {
              const Icon = item.icon;
              return (
                <Panel key={item.type}>
                  <LandformDiagram type={item.type} />
                  <div className="mt-4 flex items-center gap-3">
                    <Icon className="h-7 w-7 text-teal-300" aria-hidden="true" />
                    <h3 className="text-lg font-black text-white">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.note}</p>
                  <div className="mt-4">
                    <Checklist items={item.facts} />
                  </div>
                </Panel>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <Panel className="border-sky-300/20 bg-sky-300/[0.055]">
            <Navigation className="h-7 w-7 text-sky-300" aria-hidden="true" />
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <div className="rounded-xl bg-slate-950/40 p-4 text-center font-bold text-white">
                Dataran Tibet
              </div>
              <span className="text-center text-sky-300">→</span>
              <div className="rounded-xl bg-sky-300/10 p-4 text-center font-bold text-sky-100">
                Sungai Mekong · 4 880 km
              </div>
              <span className="text-center text-sky-300">→</span>
              <div className="rounded-xl bg-emerald-300/10 p-4 text-center font-bold text-emerald-100">
                Delta di Vietnam
              </div>
            </div>
          </Panel>
          <div className="grid gap-5 lg:grid-cols-3">
            {content.majorRivers.map((river, index) => {
              const icons = [Waves, Ship, Sprout];
              const Icon = icons[index];
              return (
                <Panel key={river.name}>
                  <Icon className="h-8 w-8 text-sky-300" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-black text-white">{river.name}</h3>
                  <div className="mt-4">
                    <Checklist items={river.facts} />
                  </div>
                </Panel>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <div className="grid gap-5 lg:grid-cols-3">
            {content.majorLakes.map((lake, index) => {
              const icons = [Fish, Flame, Zap];
              const colors = ["text-cyan-300", "text-orange-300", "text-yellow-300"];
              const Icon = icons[index];
              return (
                <Panel key={lake.name}>
                  <Icon className={`h-8 w-8 ${colors[index]}`} aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-black text-white">{lake.name}</h3>
                  <div className="mt-4">
                    <Checklist items={lake.facts} />
                  </div>
                </Panel>
              );
            })}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4 text-center">
              <p className="font-bold text-cyan-100">Tonle Sap</p>
              <p className="mt-1 text-xs text-slate-400">Tasik semula jadi</p>
            </div>
            <div className="rounded-xl border border-orange-300/20 bg-orange-300/[0.06] p-4 text-center">
              <p className="font-bold text-orange-100">Danau Toba</p>
              <p className="mt-1 text-xs text-slate-400">Tasik vulkanik</p>
            </div>
            <div className="rounded-xl border border-yellow-300/20 bg-yellow-300/[0.06] p-4 text-center">
              <p className="font-bold text-yellow-100">Tasik Kenyir</p>
              <p className="mt-1 text-xs text-slate-400">Tasik buatan manusia</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[4]} />
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
                    "Berapakah bilangan negara Asia Tenggara?",
                    "11 buah negara dengan keluasan kira-kira 4 506 600 km².",
                  ],
                  [
                    "Negara manakah tidak mempunyai pinggir laut?",
                    "Laos ialah negara daratan tanpa pantai.",
                  ],
                  [
                    "Apakah empat bentuk muka bumi utama?",
                    "Tanah tinggi, tanah pamah, pinggir laut dan gunung berapi.",
                  ],
                  [
                    "Mengapa tanah pamah menjadi tumpuan?",
                    "Tanihnya subur dan petempatan serta jaringan pengangkutan mudah dibina.",
                  ],
                  [
                    "Apakah fenomena unik Tonle Sap?",
                    "Air Mekong masuk ketika monsun dan meluaskan tasik sehingga kira-kira 10 000 km².",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">
                      <span>{question}</span>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-teal-300 transition group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel className="border-teal-300/25 bg-gradient-to-br from-teal-300/10 to-sky-300/10">
            <div className="flex items-start gap-3">
              <Globe2 className="mt-1 h-6 w-6 shrink-0 text-teal-300" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-teal-100">Rumusan bab</h3>
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
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-teal-300 to-sky-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? "Bab 10 telah selesai" : "Tandakan Bab 10 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
