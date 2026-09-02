import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  Building2,
  Calculator,
  Check,
  ChevronDown,
  Factory,
  Fish,
  GraduationCap,
  Landmark,
  Lightbulb,
  Map,
  Mountain,
  Network,
  RadioTower,
  Route,
  Sprout,
  Trees,
  UserRound,
  Users,
  Waves,
} from "lucide-react";
import type { Geo8Content } from "@/content/form1/geography/chapter-8/geo8-content";

const sections = [
  [
    "8.1",
    "Taburan penduduk Malaysia tidak sekata",
    "Kepadatan membandingkan jumlah penduduk dengan keluasan kawasan yang didiami.",
  ],
  [
    "8.1",
    "Tiga kategori menunjukkan tahap tumpuan penduduk",
    "Kawasan padat, sederhana padat dan jarang mempunyai nilai, ciri serta lokasi berbeza.",
  ],
  [
    "8.2",
    "Bentuk muka bumi mempengaruhi kemudahan membina dan bergerak",
    "Tanah pamah menarik penduduk, manakala kawasan tinggi dan pedalaman mengehadkan akses.",
  ],
  [
    "8.2",
    "Peluang pekerjaan menarik penduduk ke pusat ekonomi",
    "Pertanian dan perindustrian menghasilkan tumpuan lebih padat berbanding kegiatan berskala sederhana.",
  ],
  [
    "8.2",
    "Kemudahan sosial menentukan keselesaan dan pilihan lokasi",
    "Infrastruktur asas dan pendidikan meningkatkan daya tarikan sesuatu kawasan.",
  ],
  [
    "8.2",
    "Dasar kerajaan boleh mencipta pusat penduduk baharu",
    "Tanah rancangan dan bandar baharu mengubah kawasan jarang kepada sederhana padat atau padat.",
  ],
  [
    "Ulang kaji",
    "Terangkan taburan sebagai rangkaian sebab dan kesan",
    "Kenal pasti kategori, kemudian hubungkan lokasi dengan faktor fizikal, ekonomi, sosial atau governan.",
  ],
] as const;

const densityColors = ["bg-rose-300", "bg-amber-300", "bg-emerald-300"];

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
  const visibleDots = [24, 13, 5][index];
  return (
    <div
      aria-label={["Taburan padat", "Taburan sederhana padat", "Taburan jarang"][index]}
      className="grid h-28 grid-cols-6 gap-2 rounded-xl border border-white/10 bg-slate-950/45 p-3"
    >
      {Array.from({ length: 24 }).map((_, dot) => (
        <span
          key={dot}
          className={`rounded-full ${dot < visibleDots ? densityColors[index] : "border border-white/10 bg-transparent"}`}
        />
      ))}
    </div>
  );
}

function FactorGrid({
  items,
  icon: Icon,
  color,
}: {
  items: Geo8Content["factors"][keyof Geo8Content["factors"]];
  icon: typeof Mountain;
  color: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Panel key={item.factor}>
          <Icon className={`h-7 w-7 ${color}`} aria-hidden="true" />
          <h3 className="mt-3 font-bold text-white">{item.factor}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{item.effect}</p>
          {item.examples.length > 0 && (
            <div className="mt-3">
              <Checklist items={item.examples} />
            </div>
          )}
        </Panel>
      ))}
    </div>
  );
}

export function GeoChapter8NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo8Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[#100b1b] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-rose-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-violet-300">
            <Users className="h-6 w-6" aria-hidden="true" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 8
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Penduduk di Malaysia: membaca corak tumpuan manusia
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              ["8.1", "Taburan & kepadatan"],
              ["8.1", "Tiga kategori"],
              ["8.2", "Faktor fizikal"],
              ["8.2", "Ekonomi & sosial"],
              ["8.2", "Governan"],
            ].map(([number, label]) => (
              <span
                key={`${number}-${label}`}
                className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-slate-300"
              >
                <strong className="text-violet-200">{number}</strong> · {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-14 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section className="space-y-6">
          <SectionHeading section={sections[0]} />
          <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
            <div className="space-y-4">
              <Panel>
                <Map className="h-7 w-7 text-violet-300" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-white">Maksud taburan penduduk</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {content.overview.definition}
                </p>
              </Panel>
              <Panel className="border-rose-300/20">
                <Users className="h-7 w-7 text-rose-300" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-white">Rujukan buku teks</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {content.overview.totalPopulation}.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Sumber: {content.overview.populationSource}
                </p>
              </Panel>
            </div>
            <Panel className="border-violet-300/20">
              <Calculator className="h-8 w-8 text-violet-300" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-black text-white">Formula kepadatan penduduk</h3>
              <div className="mt-6 rounded-2xl bg-slate-950/50 p-5 text-center">
                <p className="font-mono text-sm font-black text-violet-100 sm:text-lg">
                  Jumlah penduduk (orang)
                </p>
                <div className="mx-auto my-3 h-px max-w-sm bg-violet-300/50" />
                <p className="font-mono text-sm font-black text-violet-100 sm:text-lg">
                  Keluasan kawasan (km²)
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                <span className="rounded-xl bg-white/[0.05] p-3 text-center font-mono text-sm text-slate-200">
                  10,000 orang
                </span>
                <span className="text-center font-black text-violet-300">÷</span>
                <span className="rounded-xl bg-white/[0.05] p-3 text-center font-mono text-sm text-slate-200">
                  50 km²
                </span>
                <span className="text-center font-black text-violet-300">=</span>
                <span className="rounded-xl bg-violet-300/10 p-3 text-center font-mono text-sm font-black text-violet-100">
                  200 orang/km²
                </span>
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
                <p className="mt-2 font-mono text-sm font-black text-violet-200">
                  {category.range}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{category.reason}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Contoh
                </p>
                <div className="mt-2">
                  <Checklist items={category.examples} />
                </div>
              </Panel>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] p-4 text-center">
              <p className="font-bold text-rose-100">Padat · lebih 200 orang/km²</p>
            </div>
            <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-4 text-center">
              <p className="font-bold text-amber-100">Sederhana · 50–200 orang/km²</p>
            </div>
            <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4 text-center">
              <p className="font-bold text-emerald-100">Jarang · kurang 50 orang/km²</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <FactorGrid items={content.factors.physical} icon={Mountain} color="text-lime-300" />
          <div className="grid gap-4 md:grid-cols-3">
            <Panel>
              <Route className="h-7 w-7 text-lime-300" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-white">Tanah pamah</h3>
              <p className="mt-2 text-sm text-slate-300">Mudah dibina dan mudah dihubungi</p>
            </Panel>
            <Panel>
              <Trees className="h-7 w-7 text-emerald-300" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-white">Tanah tinggi</h3>
              <p className="mt-2 text-sm text-slate-300">
                Cerun, hutan dan akses mengehadkan tumpuan
              </p>
            </Panel>
            <Panel>
              <Waves className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-white">Pinggir air</h3>
              <p className="mt-2 text-sm text-slate-300">Perikanan menyokong kepadatan sederhana</p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <FactorGrid
            items={content.factors.economic}
            icon={BriefcaseBusiness}
            color="text-amber-300"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Panel>
              <Sprout className="h-7 w-7 text-lime-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Pertanian</p>
            </Panel>
            <Panel>
              <Factory className="h-7 w-7 text-violet-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Perindustrian</p>
            </Panel>
            <Panel>
              <Fish className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Perikanan</p>
            </Panel>
            <Panel>
              <Building2 className="h-7 w-7 text-rose-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Perlombongan</p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[4]} />
          <FactorGrid items={content.factors.social} icon={Network} color="text-sky-300" />
          <div className="grid gap-5 md:grid-cols-2">
            <Panel className="border-sky-300/20">
              <RadioTower className="h-8 w-8 text-sky-300" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black text-white">Infrastruktur asas</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Air bersih · elektrik · telekomunikasi · pengangkutan
              </p>
            </Panel>
            <Panel className="border-violet-300/20">
              <GraduationCap className="h-8 w-8 text-violet-300" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black text-white">Pendidikan</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Universiti dan kolej menarik pelajar, pekerja dan perkhidmatan sokongan.
              </p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[5]} />
          <FactorGrid
            items={content.factors.governmentPolicy}
            icon={Landmark}
            color="text-rose-300"
          />
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4 text-center font-bold text-white">
              Dasar kerajaan
            </div>
            <span className="text-center text-rose-300">→</span>
            <div className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] p-4 text-center font-bold text-rose-100">
              Peluang dan kemudahan baharu
            </div>
            <span className="text-center text-rose-300">→</span>
            <div className="rounded-xl border border-violet-300/20 bg-violet-300/[0.06] p-4 text-center font-bold text-violet-100">
              Penduduk berpindah masuk
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
                    "Apakah maksud taburan penduduk?",
                    "Sebaran penduduk di dalam sesuatu kawasan atau negara.",
                  ],
                  [
                    "Bagaimanakah kepadatan penduduk dikira?",
                    "Bahagikan jumlah penduduk dengan keluasan kawasan dalam kilometer persegi.",
                  ],
                  [
                    "Mengapa tanah pamah biasanya berpenduduk padat?",
                    "Permukaannya rata, mudah dihubungi dan sesuai untuk petempatan serta kegiatan ekonomi.",
                  ],
                  [
                    "Apakah empat faktor taburan penduduk?",
                    "Fizikal, ekonomi, sosial dan dasar kerajaan atau governan.",
                  ],
                  [
                    "Bagaimanakah FELDA mengubah taburan penduduk?",
                    "Pembukaan penempatan dan pertanian baharu menarik perpindahan ke kawasan yang dahulunya jarang.",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
                      <span>{question}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-violet-300 transition group-open:rotate-180 motion-reduce:transition-none" />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel className="border-violet-300/25 bg-gradient-to-br from-violet-300/10 to-rose-300/10">
            <div className="flex items-start gap-3">
              <UserRound className="mt-1 h-6 w-6 shrink-0 text-violet-300" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-violet-200">Rumusan bab</h3>
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
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-violet-300 to-rose-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? "Bab 8 telah selesai" : "Tandakan Bab 8 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
