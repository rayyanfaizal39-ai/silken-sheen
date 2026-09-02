import type { ReactNode } from "react";
import {
  Anchor,
  Building2,
  Check,
  ChevronDown,
  CloudRain,
  Droplets,
  Factory,
  Fish,
  Gauge,
  House,
  Landmark,
  Leaf,
  Lightbulb,
  Map,
  Mountain,
  Route,
  Ship,
  Sprout,
  Trees,
  Waves,
  Wheat,
  Zap,
} from "lucide-react";
import type { Geo6Content } from "@/content/form1/geography/chapter-6/geo6-content";

const sections = [
  [
    "Pengenalan",
    "Empat bentuk muka bumi membentuk landskap Malaysia",
    "Tanah tinggi, tanah pamah, pinggir laut dan saliran mempunyai ciri serta fungsi yang berbeza.",
  ],
  [
    "6.1",
    "Tanah tinggi melebihi 180 meter dari aras laut",
    "Banjaran utama tertumpu di tengah Semenanjung, pedalaman Sarawak serta barat dan tengah Sabah.",
  ],
  [
    "6.2",
    "Tanah pamah ialah kawasan rata atau beralun rendah",
    "Lembangan sungai, dataran, delta dan dataran pantai menjadi tumpuan kegiatan manusia.",
  ],
  [
    "6.3",
    "Ombak membentuk pinggir laut Malaysia sepanjang 4,800 kilometer",
    "Hakisan dan pemendapan menghasilkan pantai, tebing, gua, gerbang, tanjung, teluk dan lagun.",
  ],
  [
    "6.4",
    "Saliran menghubungkan kawasan tadahan, sungai dan tasik",
    "Sungai utama berpunca di tanah tinggi, manakala tasik boleh terbentuk secara semula jadi atau dibina manusia.",
  ],
  [
    "6.5",
    "Tanah tinggi dan tanah pamah menyokong kegiatan yang berbeza",
    "Ketinggian, suhu, cerun dan kerataan menentukan cara sesuatu kawasan dimanfaatkan.",
  ],
  [
    "6.5",
    "Pinggir laut dan saliran menyokong ekonomi serta kehidupan harian",
    "Air menjadi sumber makanan, pengangkutan, bekalan domestik dan pintu perdagangan.",
  ],
  [
    "Ulang kaji",
    "Padankan ciri fizikal dengan lokasi dan kepentingannya",
    "Gunakan nilai 180 m, lokasi utama dan contoh kegiatan sebagai kata kunci peperiksaan.",
  ],
] as const;

const landformIcons = [Mountain, Wheat, Waves, Droplets];
const landformColors = ["text-amber-300", "text-lime-300", "text-cyan-300", "text-blue-300"];

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

function LandformTypeGrid({ types }: { types: Geo6Content["landformTypes"] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {types.map((type, index) => {
        const Icon = landformIcons[index];
        return (
          <Panel key={type.name}>
            <Icon className={`h-8 w-8 ${landformColors[index]}`} aria-hidden="true" />
            <h3 className="mt-3 text-lg font-black text-white">{type.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{type.definition}</p>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              Contoh: {type.examples.join(" · ")}
            </p>
          </Panel>
        );
      })}
    </div>
  );
}

function DrainageDiagram() {
  return (
    <div
      aria-label="Aliran air dari kawasan tadahan hujan di tanah tinggi menuju sungai dan tasik"
      className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border border-blue-300/20 bg-gradient-to-b from-sky-300/10 via-slate-950/20 to-blue-950/60"
    >
      <CloudRain
        className="absolute left-[12%] top-[10%] h-10 w-10 text-sky-300"
        aria-hidden="true"
      />
      <div className="absolute bottom-[28%] left-[-5%] h-[55%] w-[55%] [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-gradient-to-b from-emerald-300/60 to-emerald-950" />
      <div className="absolute bottom-[15%] left-[31%] h-[68%] w-4 rotate-[42deg] rounded-full bg-blue-300/70 shadow-[0_0_16px_rgba(125,211,252,.3)]" />
      <div className="absolute bottom-[10%] right-[8%] h-[24%] w-[44%] rounded-[50%] border border-blue-200/40 bg-blue-400/30" />
      <span className="absolute left-[5%] top-[42%] rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-bold text-emerald-100">
        Kawasan tadahan
      </span>
      <span className="absolute bottom-[35%] left-[46%] rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-bold text-blue-100">
        Sungai
      </span>
      <span className="absolute bottom-[16%] right-[20%] rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-bold text-blue-100">
        Tasik
      </span>
    </div>
  );
}

function ImportanceCards({ category }: { category: Geo6Content["importance"][number] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {category.uses.map((item) => (
        <Panel key={item.use}>
          <h3 className="font-bold text-white">{item.use}</h3>
          <div className="mt-3">
            <Checklist items={item.examples} />
          </div>
        </Panel>
      ))}
    </div>
  );
}

export function GeoChapter6NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo6Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const highlandImportance = content.importance.find((item) => item.landform === "Tanah Tinggi");
  const lowlandImportance = content.importance.find((item) => item.landform === "Tanah Pamah");
  const coastalImportance = content.importance.find((item) => item.landform === "Pinggir Laut");
  const drainageImportance = content.importance.find((item) => item.landform === "Saliran");

  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-lime-300/15 bg-[#08140f] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-lime-300">
            <Mountain className="h-6 w-6" aria-hidden="true" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 6
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Bentuk muka Bumi Malaysia: daripada puncak ke pinggir laut
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              ["6.1", "Tanah tinggi"],
              ["6.2", "Tanah pamah"],
              ["6.3", "Pinggir laut"],
              ["6.4", "Saliran"],
              ["6.5", "Kepentingan"],
            ].map(([number, label]) => (
              <span
                key={number}
                className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-slate-300"
              >
                <strong className="text-lime-200">{number}</strong> · {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-14 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section className="space-y-6">
          <SectionHeading section={sections[0]} />
          <p className="max-w-3xl text-sm leading-7 text-slate-300">{content.overview}</p>
          <figure className="overflow-hidden rounded-2xl border border-lime-300/20 bg-slate-950/45 p-2">
            <img
              src="/geography/tanah-tinggi-vs-pamah.png"
              alt="Perbandingan tanah tinggi dan tanah pamah menggunakan sempadan 180 meter dari aras laut"
              width={2816}
              height={1536}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full rounded-xl object-cover"
            />
            <figcaption className="px-2 pb-1 pt-3 text-center text-xs leading-5 text-slate-400">
              Nilai pemisah utama: tanah tinggi melebihi 180 m; tanah pamah tidak melebihi 180 m.
            </figcaption>
          </figure>
          <LandformTypeGrid types={content.landformTypes} />
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <div className="grid gap-4 md:grid-cols-2">
            <Panel className="border-amber-300/20">
              <Gauge className="h-7 w-7 text-amber-300" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-white">Melebihi 180 m</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Banjaran terbentuk melalui proses lipatan dan mempunyai suhu lebih rendah.
              </p>
            </Panel>
            <Panel className="border-sky-300/20">
              <CloudRain className="h-7 w-7 text-sky-300" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-white">19°C berbanding 27°C</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Purata Cameron Highlands ialah 19°C, manakala Kuala Lumpur sekitar 27°C.
              </p>
            </Panel>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {content.highlandLocations.map((location) => (
              <Panel key={location.region}>
                <h3 className="text-lg font-black text-amber-100">{location.region}</h3>
                <p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Banjaran
                </p>
                <div className="mt-2">
                  <Checklist items={location.ranges} />
                </div>
                <p className="mt-5 text-xs font-black uppercase tracking-wider text-slate-400">
                  Puncak
                </p>
                <div className="mt-2 space-y-2">
                  {location.peaks.map((peak) => (
                    <div key={peak.name} className="rounded-xl bg-slate-950/40 p-3">
                      <p className="font-bold text-white">{peak.name}</p>
                      <p className="mt-1 font-mono text-xs text-amber-200">{peak.height}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
          <figure className="overflow-hidden rounded-2xl border border-amber-300/20 bg-slate-950/45 p-2">
            <img
              src="/geography/perbandingan-ketinggian-puncak.png"
              alt="Carta perbandingan ketinggian puncak gunung utama di Malaysia"
              width={2816}
              height={1536}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full rounded-xl object-cover"
            />
            <figcaption className="px-2 pb-1 pt-3 text-center text-xs leading-5 text-slate-400">
              {content.highestPeak}
            </figcaption>
          </figure>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <Panel className="border-lime-300/20">
            <div className="flex items-start gap-3">
              <Wheat className="mt-1 h-6 w-6 shrink-0 text-lime-300" aria-hidden="true" />
              <p className="text-sm leading-7 text-slate-300">
                Tanah pamah lazimnya terdapat di lembangan sungai, dataran, delta dan dataran
                pantai. Bentuknya memudahkan pertanian, petempatan dan pengangkutan.
              </p>
            </div>
          </Panel>
          {content.lowlandLocations.map((region) => (
            <div key={region.region}>
              <h3 className="mb-4 font-bold text-white">{region.region}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {region.areas.map((area) => (
                  <Panel key={area.name}>
                    <Sprout className="h-6 w-6 text-lime-300" aria-hidden="true" />
                    <h3 className="mt-3 font-bold text-white">{area.name}</h3>
                    <div className="mt-3">
                      <Checklist items={area.facts} />
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Panel className="border-cyan-300/20">
              <p className="font-mono text-3xl font-black text-cyan-200">4,800 km</p>
              <p className="mt-2 text-sm text-slate-300">Panjang pinggir laut Malaysia</p>
            </Panel>
            {content.coastline.surroundingSeas.map((sea) => (
              <Panel key={sea}>
                <Waves className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                <p className="mt-3 text-sm font-bold text-white">{sea}</p>
              </Panel>
            ))}
          </div>
          <Panel className="border-blue-300/20">
            <h3 className="font-bold text-blue-200">Pentas Sunda</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Laut cetek di sekeliling Malaysia terletak di atas pentas benua yang dikenali sebagai
              Pentas Sunda.
            </p>
          </Panel>
          <figure className="overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/45 p-2">
            <img
              src="/geography/ciri-pinggir-laut.png"
              alt="Urutan hakisan pinggir laut daripada tebing tinggi kepada gua, gerbang laut dan batu tunggul"
              width={2816}
              height={1536}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full rounded-xl object-cover"
            />
            <figcaption className="px-2 pb-1 pt-3 text-center text-xs text-slate-400">
              Hakisan ombak membentuk satu urutan perubahan pada tebing pantai.
            </figcaption>
          </figure>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.coastline.features.map((feature) => (
              <Panel key={feature.name}>
                <h3 className="font-bold text-cyan-100">{feature.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{feature.formation}</p>
              </Panel>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[4]} />
          <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <DrainageDiagram />
            <div className="space-y-4">
              <Panel>
                <Droplets className="h-7 w-7 text-blue-300" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-white">Sungai dan tasik</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {content.drainage.definition}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {content.drainage.riverSource}
                </p>
              </Panel>
              <Panel className="border-emerald-300/20">
                <h3 className="font-bold text-emerald-200">Tasik semula jadi</h3>
                <div className="mt-3">
                  <Checklist items={content.drainage.naturalLakes} />
                </div>
              </Panel>
              {content.drainage.artificialLakes.map((lake) => (
                <Panel key={lake.name} className="border-amber-300/20">
                  <h3 className="font-bold text-amber-200">Tasik buatan manusia</h3>
                  <p className="mt-2 font-bold text-white">{lake.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{lake.function}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[5]} />
          <div className="grid gap-6 lg:grid-cols-2">
            {highlandImportance && (
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Mountain className="h-7 w-7 text-amber-300" aria-hidden="true" />
                  <h3 className="text-xl font-black text-white">Tanah Tinggi</h3>
                </div>
                <ImportanceCards category={highlandImportance} />
              </div>
            )}
            {lowlandImportance && (
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Wheat className="h-7 w-7 text-lime-300" aria-hidden="true" />
                  <h3 className="text-xl font-black text-white">Tanah Pamah</h3>
                </div>
                <ImportanceCards category={lowlandImportance} />
              </div>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <Panel>
              <Trees className="h-7 w-7 text-emerald-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Tadahan hujan</p>
            </Panel>
            <Panel>
              <Zap className="h-7 w-7 text-amber-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Hidroelektrik</p>
            </Panel>
            <Panel>
              <House className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Petempatan</p>
            </Panel>
            <Panel>
              <Factory className="h-7 w-7 text-violet-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Perindustrian</p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[6]} />
          <div className="grid gap-6 lg:grid-cols-2">
            {coastalImportance && (
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Anchor className="h-7 w-7 text-cyan-300" aria-hidden="true" />
                  <h3 className="text-xl font-black text-white">Pinggir Laut</h3>
                </div>
                <ImportanceCards category={coastalImportance} />
              </div>
            )}
            {drainageImportance && (
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Droplets className="h-7 w-7 text-blue-300" aria-hidden="true" />
                  <h3 className="text-xl font-black text-white">Saliran</h3>
                </div>
                <ImportanceCards category={drainageImportance} />
              </div>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <Panel>
              <Fish className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Sumber protein</p>
            </Panel>
            <Panel>
              <Ship className="h-7 w-7 text-blue-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Pelabuhan</p>
            </Panel>
            <Panel>
              <Route className="h-7 w-7 text-lime-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Pengangkutan</p>
            </Panel>
            <Panel>
              <Building2 className="h-7 w-7 text-amber-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Penambakan</p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[7]} />
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
                    "Apakah empat bentuk muka bumi utama Malaysia?",
                    "Tanah tinggi, tanah pamah, pinggir laut dan saliran.",
                  ],
                  [
                    "Apakah nilai yang membezakan tanah tinggi dengan tanah pamah?",
                    "Tanah tinggi melebihi 180 m, manakala tanah pamah tidak melebihi 180 m dari aras laut.",
                  ],
                  [
                    "Apakah gunung tertinggi di Malaysia?",
                    "Gunung Kinabalu setinggi 4,095 m di Banjaran Crocker, Sabah.",
                  ],
                  [
                    "Apakah perbezaan tasik semula jadi dan tasik buatan?",
                    "Tasik Bera dan Tasik Chini terbentuk semula jadi; Tasik Kenyir dibina manusia dan digunakan untuk hidroelektrik.",
                  ],
                  [
                    "Mengapa tanah pamah penting untuk pembangunan?",
                    "Permukaannya yang rata memudahkan petempatan, pengangkutan, pertanian dan perindustrian.",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300">
                      <span>{question}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-lime-300 transition group-open:rotate-180 motion-reduce:transition-none" />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel className="border-lime-300/25 bg-gradient-to-br from-lime-300/10 to-cyan-300/10">
            <div className="flex items-start gap-3">
              <Landmark className="mt-1 h-6 w-6 shrink-0 text-lime-300" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-lime-200">Rumusan bab</h3>
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
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-lime-300 to-cyan-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? "Bab 6 telah selesai" : "Tandakan Bab 6 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
