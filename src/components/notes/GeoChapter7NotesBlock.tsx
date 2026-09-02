import type { ReactNode } from "react";
import {
  Activity,
  Check,
  ChevronDown,
  CloudRain,
  Droplets,
  Fish,
  Gauge,
  House,
  Lightbulb,
  Map,
  MapPin,
  Route,
  Ship,
  Sprout,
  Waves,
  Zap,
} from "lucide-react";
import type { Geo7Content } from "@/content/form1/geography/chapter-7/geo7-content";

const sections = [
  [
    "7.1",
    "Satu sungai berubah melalui tiga peringkat aliran",
    "Cerun, kelajuan air dan proses geomorfologi berubah dari hulu hingga ke hilir.",
  ],
  [
    "7.1",
    "Hakisan dan pemendapan membentuk tasik ladam",
    "Likuan yang semakin sempit akhirnya terputus daripada aliran sungai utama.",
  ],
  [
    "7.1",
    "Sedimen yang terkumpul di muara membentuk delta",
    "Apabila aliran kehilangan tenaga, lumpur, pasir dan kelikir dimendapkan.",
  ],
  [
    "7.2",
    "Enam sungai utama menghubungkan tanah tinggi dengan laut",
    "Ingat lokasi, arah aliran, panjang dan fungsi sempadan setiap sungai.",
  ],
  [
    "7.2",
    "Tasik Malaysia terbentuk secara semula jadi atau melalui pembinaan empangan",
    "Jenis pembentukan mempengaruhi ciri dan kegunaan sesuatu tasik.",
  ],
  [
    "7.3",
    "Sungai menyokong tujuh keperluan penting manusia",
    "Air menggerakkan turbin, mengairi sawah, membekalkan rumah dan menjadi laluan pedalaman.",
  ],
  [
    "7.3",
    "Tasik menjadi takungan tenaga, makanan, air dan rekreasi",
    "Takungan yang luas menyediakan manfaat ekonomi dan sosial kepada penduduk.",
  ],
  [
    "Ulang kaji",
    "Ikuti perjalanan air dari tadahan hujan hingga ke muara",
    "Hubungkan peringkat sungai, bentuk fizikal, lokasi utama dan kegunaannya.",
  ],
] as const;

const stageColors = ["text-sky-300", "text-cyan-300", "text-blue-300"];

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

function ProcessSteps({ steps }: { steps: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {steps.map((step, index) => (
        <Panel key={step}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300/10 font-mono text-sm font-black text-cyan-200">
            {index + 1}
          </span>
          <p className="mt-3 text-sm leading-6 text-slate-300">{step}</p>
        </Panel>
      ))}
    </div>
  );
}

function ImportanceGrid({ items }: { items: Geo7Content["riverImportance"] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.use.includes("Hidroelektrik")
          ? Zap
          : item.use.includes("Pengairan")
            ? Sprout
            : item.use.includes("Domestik")
              ? House
              : item.use.includes("Sempadan")
                ? MapPin
                : item.use.includes("Pengangkutan")
                  ? Ship
                  : item.use.includes("Rekreasi")
                    ? Activity
                    : Fish;
        return (
          <Panel key={item.use}>
            <Icon className="h-7 w-7 text-cyan-300" aria-hidden="true" />
            <h3 className="mt-3 font-bold text-white">{item.use}</h3>
            <div className="mt-3">
              <Checklist items={item.examples} />
            </div>
          </Panel>
        );
      })}
    </div>
  );
}

export function GeoChapter7NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo7Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const naturalLakes = content.majorLakes.filter((lake) => lake.type === "Semula jadi");
  const artificialLakes = content.majorLakes.filter((lake) => lake.type === "Buatan manusia");

  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#06131b] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-cyan-300">
            <Waves className="h-6 w-6" aria-hidden="true" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 7
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Saliran di Malaysia: perjalanan sungai dari hulu ke muara
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              ["7.1", "Peringkat sungai"],
              ["7.1", "Tasik ladam & delta"],
              ["7.2", "Sungai & tasik"],
              ["7.3", "Kepentingan"],
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
          <Panel>
            <div className="flex items-start gap-3">
              <CloudRain className="mt-1 h-6 w-6 shrink-0 text-sky-300" aria-hidden="true" />
              <p className="text-sm leading-7 text-slate-300">{content.overview}</p>
            </div>
          </Panel>
          <figure className="overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/45 p-2">
            <img
              src="/geography/tiga-peringkat-aliran-sungai.png"
              alt="Tiga peringkat aliran sungai, iaitu hulu, tengah dan hilir"
              width={2816}
              height={1536}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full rounded-xl object-cover"
            />
            <figcaption className="px-2 pb-1 pt-3 text-center text-xs text-slate-400">
              Hulu: hakisan menegak · Tengah: hakisan mendatar · Hilir: pemendapan
            </figcaption>
          </figure>
          <div className="grid gap-5 lg:grid-cols-3">
            {content.riverStages.map((stage, index) => (
              <Panel key={stage.name} className={index === 2 ? "border-blue-300/20" : ""}>
                <div className="flex items-center justify-between gap-3">
                  <span className={`font-mono text-4xl font-black ${stageColors[index]}`}>
                    {stage.stage}
                  </span>
                  <Gauge className={`h-7 w-7 ${stageColors[index]}`} aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-lg font-black text-white">{stage.name}</h3>
                <div className="mt-4">
                  <Checklist items={stage.characteristics} />
                </div>
              </Panel>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-sky-300/20 bg-sky-300/[0.06] p-4 text-center">
              <p className="text-xs font-black uppercase tracking-wider text-sky-300">Hulu</p>
              <p className="mt-2 font-bold text-white">Deras · curam · hakisan menegak</p>
            </div>
            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4 text-center">
              <p className="text-xs font-black uppercase tracking-wider text-cyan-300">Tengah</p>
              <p className="mt-2 font-bold text-white">Sederhana · likuan · hakisan sisi</p>
            </div>
            <div className="rounded-xl border border-blue-300/20 bg-blue-300/[0.06] p-4 text-center">
              <p className="text-xs font-black uppercase tracking-wider text-blue-300">Hilir</p>
              <p className="mt-2 font-bold text-white">Perlahan · landai · pemendapan</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <figure className="overflow-hidden rounded-2xl border border-violet-300/20 bg-slate-950/45 p-2">
            <img
              src="/geography/pembentukan-tasik-ladam.png"
              alt="Empat langkah pembentukan tasik ladam daripada likuan sungai"
              width={2816}
              height={1536}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full rounded-xl object-cover"
            />
            <figcaption className="px-2 pb-1 pt-3 text-center text-xs text-slate-400">
              Hakisan luar likuan + pemendapan dalam likuan → likuan terpenggal → tasik ladam
            </figcaption>
          </figure>
          <ProcessSteps steps={content.oxbowLakeFormation.steps} />
          <Panel className="border-violet-300/20">
            <h3 className="font-bold text-violet-200">Kata kunci proses</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Likuan → pangkal menyempit → banjir memotong likuan → pemendapan menutup hujung →
              tasik ladam.
            </p>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_.85fr]">
            <figure className="overflow-hidden rounded-2xl border border-amber-300/20 bg-slate-950/45 p-2">
              <img
                src="/geography/pembentukan-delta.png"
                alt="Proses pemendapan sedimen yang membentuk delta di muara sungai"
                width={2816}
                height={1536}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full rounded-xl object-cover"
              />
              <figcaption className="px-2 pb-1 pt-3 text-center text-xs text-slate-400">
                Delta ialah kawasan mendapan luas dan subur di muara sungai.
              </figcaption>
            </figure>
            <div className="space-y-3">
              {content.deltaFormation.steps.map((step, index) => (
                <Panel key={step}>
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-300/10 font-mono text-sm font-black text-amber-200">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-slate-300">{step}</p>
                  </div>
                </Panel>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Panel>
              <Waves className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-white">Aliran perlahan</h3>
            </Panel>
            <Panel>
              <Droplets className="h-7 w-7 text-amber-300" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-white">Sedimen mendap</h3>
            </Panel>
            <Panel>
              <Sprout className="h-7 w-7 text-lime-300" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-white">Dataran subur terbentuk</h3>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.majorRivers.map((river) => (
              <Panel key={river.name}>
                <Route className="h-7 w-7 text-cyan-300" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-black text-white">{river.name}</h3>
                <div className="mt-3">
                  <Checklist items={river.facts} />
                </div>
              </Panel>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel className="border-cyan-300/20">
              <p className="font-mono text-3xl font-black text-cyan-200">563 km</p>
              <p className="mt-2 font-bold text-white">Sungai Rajang · terpanjang di Malaysia</p>
            </Panel>
            <Panel className="border-blue-300/20">
              <p className="font-mono text-3xl font-black text-blue-200">457 km</p>
              <p className="mt-2 font-bold text-white">
                Sungai Pahang · terpanjang di Semenanjung Malaysia
              </p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[4]} />
          <Panel>
            <p className="text-sm leading-7 text-slate-300">
              Tasik ialah kawasan takungan air di permukaan Bumi. Tasik semula jadi terbentuk
              melalui proses alam, manakala tasik buatan manusia terhasil daripada pembinaan
              empangan.
            </p>
          </Panel>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Droplets className="h-7 w-7 text-emerald-300" aria-hidden="true" />
                <h3 className="text-xl font-black text-white">Tasik Semula Jadi</h3>
              </div>
              <div className="space-y-4">
                {naturalLakes.map((lake) => (
                  <Panel key={lake.name} className="border-emerald-300/15">
                    <h3 className="font-bold text-emerald-100">{lake.name}</h3>
                    <div className="mt-3">
                      <Checklist items={lake.facts} />
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Zap className="h-7 w-7 text-amber-300" aria-hidden="true" />
                <h3 className="text-xl font-black text-white">Tasik Buatan Manusia</h3>
              </div>
              <div className="space-y-4">
                {artificialLakes.map((lake) => (
                  <Panel key={lake.name} className="border-amber-300/15">
                    <h3 className="font-bold text-amber-100">{lake.name}</h3>
                    <div className="mt-3">
                      <Checklist items={lake.facts} />
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[5]} />
          <ImportanceGrid items={content.riverImportance} />
          <Panel className="border-cyan-300/20">
            <div className="flex items-start gap-3">
              <Fish className="mt-1 h-6 w-6 shrink-0 text-cyan-300" aria-hidden="true" />
              <p className="text-sm leading-6 text-slate-300">
                Bandar Temerloh di tepi Sungai Pahang dikenali sebagai Bandar Ikan Patin kerana
                aktiviti ternakan patin sangkar.
              </p>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[6]} />
          <ImportanceGrid items={content.lakeImportance} />
          <div className="grid gap-4 md:grid-cols-4">
            <Panel>
              <Zap className="h-7 w-7 text-amber-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Hidroelektrik</p>
            </Panel>
            <Panel>
              <Fish className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Sumber protein</p>
            </Panel>
            <Panel>
              <Activity className="h-7 w-7 text-lime-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Rekreasi</p>
            </Panel>
            <Panel>
              <House className="h-7 w-7 text-blue-300" aria-hidden="true" />
              <p className="mt-3 font-bold text-white">Kegunaan domestik</p>
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
                    "Apakah proses dominan pada setiap peringkat sungai?",
                    "Hulu: hakisan menegak; tengah: hakisan mendatar; hilir: pemendapan.",
                  ],
                  [
                    "Bagaimanakah tasik ladam terbentuk?",
                    "Likuan semakin sempit, terpotong ketika banjir dan kedua-dua hujungnya ditutup oleh pemendapan.",
                  ],
                  [
                    "Mengapa delta terbentuk di muara?",
                    "Aliran menjadi perlahan lalu tidak mampu membawa sedimen, menyebabkan bahan mendap.",
                  ],
                  [
                    "Apakah sungai terpanjang di Malaysia?",
                    "Sungai Rajang di Sarawak, kira-kira 563 km.",
                  ],
                  [
                    "Apakah perbezaan Tasik Bera dengan Tasik Kenyir?",
                    "Tasik Bera ialah tasik semula jadi terbesar di Malaysia; Tasik Kenyir ialah tasik buatan manusia terbesar di Asia Tenggara.",
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
          <Panel className="border-cyan-300/25 bg-gradient-to-br from-cyan-300/10 to-blue-300/10">
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
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-cyan-300 to-blue-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? "Bab 7 telah selesai" : "Tandakan Bab 7 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
