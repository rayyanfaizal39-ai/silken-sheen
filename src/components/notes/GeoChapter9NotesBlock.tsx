import type { ReactNode } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  Factory,
  GraduationCap,
  House,
  Landmark,
  Lightbulb,
  MapPinned,
  Network,
  Route,
  Scale,
  ShieldCheck,
  Ship,
  Sprout,
  Store,
  Users,
} from "lucide-react";
import type { Geo9Content, UrbanFunction } from "@/content/form1/geography/chapter-9/geo9-content";

const sections = [
  [
    "9.1",
    "Dua jenis petempatan",
    "Bezakan bandar dan luar bandar melalui penduduk, landskap, kemudahan dan ekonomi.",
  ],
  [
    "9.2",
    "Empat pola petempatan",
    "Baca susunan rumah untuk mengenal cara sesuatu petempatan berkembang.",
  ],
  [
    "9.3",
    "Fungsi petempatan bandar",
    "Bandar menggerakkan ekonomi, menyediakan kemudahan sosial dan menjalankan pentadbiran.",
  ],
  [
    "9.3",
    "Fungsi petempatan luar bandar",
    "Luar bandar membekalkan sumber, membina komuniti dan mengurus pentadbiran akar umbi.",
  ],
  [
    "Ulang kaji",
    "Sambungkan jenis, pola dan fungsi",
    "Gunakan ciri, contoh dan hubungan sebab-akibat untuk membina jawapan lengkap.",
  ],
] as const;

const categoryMeta = {
  ekonomi: {
    label: "Ekonomi",
    icon: Store,
    color: "text-amber-300",
    border: "border-amber-300/20",
  },
  sosial: {
    label: "Sosial",
    icon: GraduationCap,
    color: "text-sky-300",
    border: "border-sky-300/20",
  },
  kerajaan: {
    label: "Kerajaan / Governan",
    icon: Landmark,
    color: "text-rose-300",
    border: "border-rose-300/20",
  },
} as const;

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
      <p className="font-mono text-xs font-black uppercase tracking-[.18em] text-cyan-300">
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

function PatternDiagram({ name }: { name: string }) {
  const positions: Record<string, string[]> = {
    Berpusat: [
      "left-[42%] top-[20%]",
      "left-[30%] top-[42%]",
      "left-[54%] top-[42%]",
      "left-[42%] top-[65%]",
      "left-[58%] top-[20%]",
    ],
    Berkelompok: [
      "left-[18%] top-[24%]",
      "left-[30%] top-[36%]",
      "left-[18%] top-[50%]",
      "left-[62%] top-[30%]",
      "left-[72%] top-[48%]",
    ],
    Berjajar: [
      "left-[8%] top-[46%]",
      "left-[27%] top-[46%]",
      "left-[46%] top-[46%]",
      "left-[65%] top-[46%]",
      "left-[82%] top-[46%]",
    ],
    Berselerak: [
      "left-[8%] top-[18%]",
      "left-[68%] top-[16%]",
      "left-[38%] top-[68%]",
      "left-[82%] top-[62%]",
      "left-[18%] top-[50%]",
    ],
  };
  return (
    <div
      aria-label={`Rajah pola petempatan ${name.toLowerCase()}`}
      className="relative h-28 overflow-hidden rounded-xl border border-white/10 bg-slate-950/50"
    >
      {name === "Berjajar" && (
        <span className="absolute left-2 right-2 top-1/2 h-px bg-cyan-300/35" />
      )}
      {positions[name].map((position, index) => (
        <span
          key={`${name}-${index}`}
          className={`absolute h-4 w-5 rounded-sm border border-cyan-200/40 bg-cyan-300/70 ${position}`}
        />
      ))}
    </div>
  );
}

function FunctionCard({ item }: { item: UrbanFunction }) {
  const meta = categoryMeta[item.category];
  const Icon = meta.icon;
  return (
    <Panel className={meta.border}>
      <Icon className={`h-7 w-7 ${meta.color}`} aria-hidden="true" />
      <h4 className="mt-3 font-bold text-white">{item.name}</h4>
      <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
      {item.examples.length > 0 && (
        <div className="mt-3 border-t border-white/10 pt-3">
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-400">Contoh</p>
          <Checklist items={item.examples} />
        </div>
      )}
    </Panel>
  );
}

export function GeoChapter9NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo9Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#07131c] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-cyan-300">
            <MapPinned className="h-6 w-6" aria-hidden="true" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 9
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Petempatan di Malaysia: tempat manusia membina kehidupan
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              "Bandar & luar bandar",
              "4 pola petempatan",
              "Fungsi bandar",
              "Fungsi luar bandar",
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
          <Panel className="border-cyan-300/20">
            <House className="h-7 w-7 text-cyan-300" aria-hidden="true" />
            <h3 className="mt-3 font-bold text-white">Maksud petempatan</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{content.overview}</p>
          </Panel>
          <div className="grid gap-5 lg:grid-cols-2">
            {content.settlementTypes.map((type) => {
              const urban = type.type === "bandar";
              return (
                <Panel
                  key={type.type}
                  className={urban ? "border-cyan-300/20" : "border-emerald-300/20"}
                >
                  <div className="flex items-center gap-3">
                    {urban ? (
                      <Building2 className="h-8 w-8 text-cyan-300" aria-hidden="true" />
                    ) : (
                      <Sprout className="h-8 w-8 text-emerald-300" aria-hidden="true" />
                    )}
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Petempatan
                      </p>
                      <h3 className="text-xl font-black capitalize text-white">{type.type}</h3>
                    </div>
                  </div>
                  <p
                    className={`mt-5 rounded-xl p-4 font-mono text-sm font-black ${urban ? "bg-cyan-300/10 text-cyan-100" : "bg-emerald-300/10 text-emerald-100"}`}
                  >
                    {type.populationThreshold}
                  </p>
                  <div className="mt-4">
                    <Checklist items={type.characteristics} />
                  </div>
                </Panel>
              );
            })}
          </div>
          <Panel className="border-emerald-300/20 bg-emerald-300/[0.055]">
            <Scale className="h-7 w-7 text-emerald-300" aria-hidden="true" />
            <h3 className="mt-3 font-bold text-emerald-100">Usaha pembangunan luar bandar</h3>
            <p className="mt-2 font-semibold text-white">{content.ruralDevelopment.name}</p>
            <p className="mt-1 text-xs text-slate-400">Melalui {content.ruralDevelopment.agency}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {content.ruralDevelopment.vision}
            </p>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <div className="grid gap-5 md:grid-cols-2">
            {content.settlementPatterns.map((pattern) => (
              <Panel key={pattern.name}>
                <PatternDiagram name={pattern.name} />
                <h3 className="mt-4 text-lg font-black text-white">{pattern.name}</h3>
                <div className="mt-3">
                  <Checklist items={pattern.description} />
                </div>
                <div className="mt-4 rounded-xl bg-cyan-300/[0.07] p-3">
                  <p className="mb-2 text-xs font-black uppercase tracking-wider text-cyan-200">
                    Contoh lokasi
                  </p>
                  <p className="text-sm leading-6 text-slate-300">{pattern.examples.join(" · ")}</p>
                </div>
              </Panel>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          {(["ekonomi", "sosial", "kerajaan"] as const).map((category) => {
            const meta = categoryMeta[category];
            const Icon = meta.icon;
            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon className={`h-6 w-6 ${meta.color}`} aria-hidden="true" />
                  <h3 className="text-lg font-black text-white">Fungsi {meta.label}</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {content.urbanFunctions
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <FunctionCard key={item.name} item={item} />
                    ))}
                </div>
              </div>
            );
          })}
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <div className="grid gap-5 lg:grid-cols-3">
            {content.ruralFunctions.map((item, index) => {
              const icons = [Sprout, Users, ShieldCheck];
              const colors = ["text-amber-300", "text-sky-300", "text-rose-300"];
              const Icon = icons[index];
              return (
                <Panel key={item.category}>
                  <Icon className={`h-8 w-8 ${colors[index]}`} aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-black text-white">{item.category}</h3>
                  <div className="mt-4">
                    <Checklist items={item.points} />
                  </div>
                </Panel>
              );
            })}
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-4 text-center font-bold text-amber-100">
              Bahan mentah & makanan
            </div>
            <Route className="mx-auto h-5 w-5 text-cyan-300" aria-hidden="true" />
            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4 text-center font-bold text-cyan-100">
              Perhubungan bandar–desa
            </div>
            <Route className="mx-auto h-5 w-5 text-cyan-300" aria-hidden="true" />
            <div className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] p-4 text-center font-bold text-rose-100">
              Pasaran & perkhidmatan
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
                    "Apakah pemisah utama bandar dan luar bandar?",
                    "Bandar melebihi 10,000 orang, manakala luar bandar kurang daripada 10,000 orang.",
                  ],
                  [
                    "Apakah empat pola petempatan?",
                    "Berpusat, berkelompok, berjajar dan berselerak.",
                  ],
                  [
                    "Di manakah pola berjajar terbentuk?",
                    "Sepanjang jalan raya, tepi pantai atau tebing sungai.",
                  ],
                  [
                    "Mengapa Bandar Satelit diwujudkan?",
                    "Untuk menyokong bandar utama dan menampung limpahan penduduk serta industri.",
                  ],
                  [
                    "Siapakah mengurus pentadbiran akar umbi?",
                    "Penghulu, ketua kampung atau Jawatankuasa Kemajuan dan Keselamatan Kampung (JKKK).",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                      <span>{question}</span>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-cyan-300 transition group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel className="border-cyan-300/25 bg-gradient-to-br from-cyan-300/10 to-emerald-300/10">
            <div className="flex items-start gap-3">
              <Network className="mt-1 h-6 w-6 shrink-0 text-cyan-300" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-cyan-100">Rumusan bab</h3>
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
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-cyan-300 to-emerald-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? "Bab 9 telah selesai" : "Tandakan Bab 9 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
