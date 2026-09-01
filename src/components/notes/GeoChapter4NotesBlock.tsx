import type { ReactNode } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  Compass,
  Flag,
  Frame,
  Grid3X3,
  Landmark,
  Lightbulb,
  Map,
  MapPin,
  Navigation,
  PencilRuler,
  Ruler,
  Waves,
} from "lucide-react";
import type { Geo4Content } from "@/content/form1/geography/chapter-4/geo4-content";

const sections = [
  [
    "4.1",
    "Malaysia terbahagi kepada dua wilayah utama",
    "Semenanjung Malaysia serta Sabah dan Sarawak dipisahkan oleh Laut China Selatan.",
  ],
  [
    "4.1",
    "Tiga belas negeri dan tiga Wilayah Persekutuan membentuk Malaysia",
    "Kenal pasti kedudukan negeri pada peta sebelum menghafal nama dan ibu negerinya.",
  ],
  [
    "4.2",
    "Setiap negeri mempunyai pusat pentadbirannya sendiri",
    "Pasangkan 13 negeri dengan ibu negeri yang betul.",
  ],
  [
    "4.2",
    "Kuala Lumpur dan Putrajaya menjalankan peranan yang berbeza",
    "Ibu negara tidak sama dengan Pusat Pentadbiran Kerajaan Persekutuan.",
  ],
  [
    "4.3",
    "Lakaran yang tepat dibina secara berperingkat",
    "Mulakan dengan grid dan bentuk luar sebelum menambah sempadan, simbol dan ciri peta.",
  ],
  [
    "4.3",
    "Empat ciri melengkapkan lakaran peta Malaysia",
    "Tajuk, arah Utara, petunjuk dan pemidang menjadikan peta boleh dibaca dengan betul.",
  ],
  [
    "Ulang kaji",
    "Hubungkan lokasi, pentadbiran dan kemahiran melakar",
    "Gunakan fakta utama dan soalan ingatan aktif untuk menguji kefahaman seluruh bab.",
  ],
] as const;

const mapElementIcons = [Flag, Compass, MapPin, Frame];

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

function MalaysiaMapFigure() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/50 p-2 sm:p-3">
      <img
        src="/geography/malaysia-map.png"
        alt="Peta Malaysia yang menunjukkan Semenanjung Malaysia, Sabah, Sarawak dan Wilayah Persekutuan Labuan"
        width={1408}
        height={768}
        loading="lazy"
        decoding="async"
        className="aspect-[11/6] w-full rounded-xl object-cover"
      />
      <figcaption className="px-2 pb-1 pt-3 text-center text-xs leading-5 text-slate-400">
        Gunakan peta untuk mengenal pasti kedudukan relatif negeri dan dua bahagian utama Malaysia.
      </figcaption>
    </figure>
  );
}

function DrawingGuideDiagram() {
  return (
    <div
      aria-label="Grid panduan untuk melakar bentuk Semenanjung Malaysia, Sabah dan Sarawak"
      className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border-2 border-amber-300/30 bg-[linear-gradient(rgba(251,191,36,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,.13)_1px,transparent_1px)] bg-[size:12.5%_16.66%]"
    >
      <div className="absolute left-[10%] top-[16%] h-[66%] w-[25%] rotate-[-9deg] rounded-[42%_58%_48%_52%/22%_30%_70%_78%] border-2 border-cyan-300/70 bg-cyan-300/10" />
      <div className="absolute left-[53%] top-[43%] h-[28%] w-[26%] -rotate-6 rounded-[65%_35%_48%_52%] border-2 border-emerald-300/70 bg-emerald-300/10" />
      <div className="absolute right-[7%] top-[20%] h-[31%] w-[20%] rotate-6 rounded-[42%_58%_65%_35%] border-2 border-emerald-300/70 bg-emerald-300/10" />
      <span className="absolute left-[8%] top-[6%] rounded-full bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-cyan-100">
        Semenanjung
      </span>
      <span className="absolute bottom-[12%] left-[54%] rounded-full bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-emerald-100">
        Sarawak
      </span>
      <span className="absolute right-[5%] top-[8%] rounded-full bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-emerald-100">
        Sabah
      </span>
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center text-amber-200">
        <Navigation className="h-7 w-7" aria-hidden="true" />
        <span className="text-[10px] font-black">U</span>
      </div>
    </div>
  );
}

export function GeoChapter4NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo4Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const peninsularCapitals = content.stateCapitals.filter(
    (item) => item.region === "Semenanjung Malaysia",
  );
  const borneoCapitals = content.stateCapitals.filter((item) => item.region === "Pulau Borneo");

  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#07131d] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-cyan-300">
            <Map className="h-6 w-6" aria-hidden="true" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 4
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Lakaran Peta Malaysia: negeri, ibu negeri dan pentadbiran
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              ["4.1", "Negeri & wilayah"],
              ["4.2", "Ibu negeri"],
              ["4.2", "Kuala Lumpur & Putrajaya"],
              ["4.3", "Melakar peta"],
            ].map(([number, label]) => (
              <span
                key={`${number}-${label}`}
                className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-slate-300"
              >
                <strong className="text-cyan-200">{number}</strong> · {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-14 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section className="space-y-6">
          <SectionHeading section={sections[0]} />
          <div className="grid gap-5 lg:grid-cols-[.75fr_1.25fr]">
            <div className="space-y-4">
              <Panel>
                <Compass className="h-7 w-7 text-cyan-300" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-white">Asia Tenggara</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {content.malaysiaPosition.region}
                </p>
              </Panel>
              <Panel className="border-blue-300/20">
                <Waves className="h-7 w-7 text-blue-300" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-white">Laut China Selatan</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {content.malaysiaPosition.seaDivision}
                </p>
              </Panel>
            </div>
            <MalaysiaMapFigure />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel>
              <h3 className="font-bold text-cyan-200">Semenanjung Malaysia</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {content.malaysiaPosition.peninsularBorders}
              </p>
            </Panel>
            <Panel>
              <h3 className="font-bold text-emerald-200">Sabah dan Sarawak</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {content.malaysiaPosition.borneoBorders}
              </p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Panel className="border-cyan-300/20">
              <p className="font-mono text-4xl font-black text-cyan-200">
                {content.malaysiaPosition.totalStates}
              </p>
              <p className="mt-2 font-bold text-white">buah negeri</p>
            </Panel>
            <Panel className="border-amber-300/20">
              <p className="font-mono text-4xl font-black text-amber-200">
                {content.malaysiaPosition.totalFederalTerritories}
              </p>
              <p className="mt-2 font-bold text-white">Wilayah Persekutuan</p>
            </Panel>
            <Panel>
              <Landmark className="h-8 w-8 text-rose-300" aria-hidden="true" />
              <p className="mt-3 text-sm font-bold leading-6 text-white">
                Kuala Lumpur · Putrajaya · Labuan
              </p>
            </Panel>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
            <Panel>
              <h3 className="font-bold text-cyan-200">11 negeri di Semenanjung Malaysia</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {content.malaysiaPosition.peninsularStates.map((state) => (
                  <span
                    key={state}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-2 text-xs font-bold text-cyan-100"
                  >
                    {state}
                  </span>
                ))}
              </div>
            </Panel>
            <Panel>
              <h3 className="font-bold text-emerald-200">2 negeri di Pulau Borneo</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {content.malaysiaPosition.borneoStates.map((state) => (
                  <span
                    key={state}
                    className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-2 text-xs font-bold text-emerald-100"
                  >
                    {state}
                  </span>
                ))}
              </div>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <Panel>
            <p className="text-sm leading-7 text-slate-300">{content.nationalCapital.definition}</p>
          </Panel>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-2 bg-cyan-300/10 px-4 py-3 text-xs font-black uppercase tracking-wider text-cyan-100">
              <span>Negeri</span>
              <span>Ibu negeri</span>
            </div>
            {[...peninsularCapitals, ...borneoCapitals].map((item, index) => (
              <div
                key={item.state}
                className={`grid grid-cols-2 gap-3 px-4 py-3 text-sm ${index % 2 === 0 ? "bg-white/[0.035]" : "bg-slate-950/25"}`}
              >
                <span className="font-bold text-white">{item.state}</span>
                <span className="text-slate-300">{item.capital}</span>
              </div>
            ))}
          </div>
          <p className="text-xs leading-5 text-slate-400">
            Petua: hafal secara berpasangan mengikut kedudukan negeri dari utara ke selatan,
            kemudian tambah Sabah dan Sarawak.
          </p>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel className="border-rose-300/20">
              <Landmark className="h-8 w-8 text-rose-300" aria-hidden="true" />
              <p className="mt-4 font-mono text-xs font-black text-rose-200">1963</p>
              <h3 className="mt-1 text-xl font-black text-white">Kuala Lumpur</h3>
              <Checklist items={content.nationalCapital.kualaLumpurFacts} />
            </Panel>
            <Panel className="border-amber-300/20">
              <Building2 className="h-8 w-8 text-amber-300" aria-hidden="true" />
              <p className="mt-4 font-mono text-xs font-black text-amber-200">2001</p>
              <h3 className="mt-1 text-xl font-black text-white">Putrajaya</h3>
              <Checklist items={content.nationalCapital.putrajayaFacts} />
              <p className="mt-4 rounded-xl bg-amber-300/[0.07] p-3 text-sm leading-6 text-amber-100">
                {content.nationalCapital.putrajayaNameOrigin}
              </p>
            </Panel>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] p-4 text-center font-bold text-rose-100">
              Kuala Lumpur = ibu negara
            </div>
            <span className="hidden text-center font-mono text-xs font-black text-slate-500 sm:block">
              BERBEZA
            </span>
            <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-4 text-center font-bold text-amber-100">
              Putrajaya = pusat pentadbiran Persekutuan
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[4]} />
          <p className="max-w-3xl text-sm leading-7 text-slate-300">
            {content.mapDrawing.introduction}
          </p>
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
            <DrawingGuideDiagram />
            <div className="space-y-3">
              {content.mapDrawing.steps.map((step) => (
                <Panel key={step.step}>
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-300/10 font-mono text-sm font-black text-amber-200">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="font-bold text-white">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{step.instruction}</p>
                    </div>
                  </div>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[5]} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.mapDrawing.requiredElements.map((element, index) => {
              const Icon = mapElementIcons[index];
              return (
                <Panel key={element}>
                  <Icon className="h-7 w-7 text-cyan-300" aria-hidden="true" />
                  <h3 className="mt-3 font-bold text-white">{element}</h3>
                </Panel>
              );
            })}
          </div>
          <Panel className="border-violet-300/20">
            <div className="flex items-start gap-3">
              <Ruler className="mt-1 h-6 w-6 shrink-0 text-violet-300" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-violet-200">Peranan JUPEM</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{content.jupemFact}</p>
              </div>
            </div>
          </Panel>
          <div className="grid gap-4 md:grid-cols-3">
            <Panel>
              <Grid3X3 className="h-7 w-7 text-amber-300" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-white">1 · Imbangkan</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Grid membantu menentukan saiz dan kedudukan setiap wilayah.
              </p>
            </Panel>
            <Panel>
              <PencilRuler className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-white">2 · Bentukkan</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Garis pantai dan sempadan dilakar berpandukan peta sebenar.
              </p>
            </Panel>
            <Panel>
              <MapPin className="h-7 w-7 text-rose-300" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-white">3 · Lengkapkan</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Simbol pusat pentadbiran dan ciri peta ditambah pada akhir.
              </p>
            </Panel>
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
                    "Apakah yang memisahkan dua bahagian utama Malaysia?",
                    "Laut China Selatan memisahkan Semenanjung Malaysia daripada Sabah dan Sarawak.",
                  ],
                  [
                    "Berapakah negeri dan Wilayah Persekutuan di Malaysia?",
                    "Malaysia mempunyai 13 negeri dan 3 Wilayah Persekutuan.",
                  ],
                  [
                    "Apakah perbezaan Kuala Lumpur dengan Putrajaya?",
                    "Kuala Lumpur ialah ibu negara, manakala Putrajaya ialah Pusat Pentadbiran Kerajaan Persekutuan.",
                  ],
                  [
                    "Apakah empat ciri wajib pada lakaran peta?",
                    "Tajuk, arah Utara, petunjuk dan pemidang peta.",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                      <span>{question}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-cyan-300 transition group-open:rotate-180 motion-reduce:transition-none" />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel className="border-cyan-300/25 bg-gradient-to-br from-cyan-300/10 to-amber-300/10">
            <div className="flex items-start gap-3">
              <Map className="mt-1 h-6 w-6 shrink-0 text-cyan-300" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-cyan-200">Rumusan bab</h3>
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
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-cyan-300 to-amber-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? "Bab 4 telah selesai" : "Tandakan Bab 4 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
