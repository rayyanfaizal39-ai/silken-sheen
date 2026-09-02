import type { ReactNode } from "react";
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Cloud,
  Droplets,
  Flame,
  Globe2,
  Layers3,
  Leaf,
  Lightbulb,
  Map,
  Mountain,
  MoveHorizontal,
  Orbit,
  Radio,
  Waves,
} from "lucide-react";
import type { Geo5Content } from "@/content/form1/geography/chapter-5/geo5-content";

const sections = [
  [
    "5.1",
    "Empat sfera saling melengkapi untuk membentuk sistem Bumi",
    "Udara, batuan, air dan hidupan berinteraksi dalam satu sistem fizikal.",
  ],
  [
    "5.1",
    "Atmosfera mempunyai lima lapisan dari permukaan ke angkasa",
    "Urutan lapisan bermula dengan troposfera dan berakhir dengan eksosfera.",
  ],
  [
    "5.2",
    "Struktur Bumi berubah daripada kerak pejal kepada teras panas",
    "Kerak, mantel dan teras berbeza dari segi kedudukan, bahan dan sifat.",
  ],
  [
    "5.3",
    "Tujuh benua membentuk bahagian daratan yang sangat luas",
    "Bandingkan saiz dan kedudukan istimewa setiap benua.",
  ],
  [
    "5.3",
    "Lima lautan serta laut dan selat menghubungkan dunia",
    "Lautan meliputi kawasan luas; selat ialah laluan air sempit antara daratan.",
  ],
  [
    "5.4",
    "Arus perolakan menggerakkan plat kerak Bumi",
    "Pertembungan, pencapahan dan sesaran menghasilkan perubahan pada permukaan Bumi.",
  ],
  [
    "5.4",
    "Daya yang berbeza menghasilkan bentuk gunung yang berbeza",
    "Mampatan membentuk gunung lipat, manakala sesaran membentuk gunung bongkah.",
  ],
  [
    "5.4",
    "Tenaga plat boleh membentuk gunung berapi, gempa dan tsunami",
    "Kesan pergerakan plat paling jelas berlaku di sempadan plat.",
  ],
  [
    "Ulang kaji",
    "Baca Bumi sebagai satu sistem yang sentiasa berubah",
    "Hubungkan sfera, lapisan, benua, lautan dan proses plat untuk memahami keseluruhan bab.",
  ],
] as const;

const sphereIcons = [Cloud, Mountain, Droplets, Leaf];
const sphereColors = ["text-sky-300", "text-amber-300", "text-cyan-300", "text-lime-300"];

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
      <p className="font-mono text-xs font-black uppercase tracking-[.18em] text-sky-300">
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

function EarthSystemDiagram({ content }: { content: Geo5Content["physicalSystem"] }) {
  return (
    <div
      aria-label="Empat komponen sistem fizikal Bumi"
      className="relative mx-auto grid w-full max-w-2xl grid-cols-2 gap-3 rounded-3xl border border-sky-300/20 bg-slate-950/40 p-4 sm:gap-5 sm:p-6"
    >
      {content.spheres.map((sphere, index) => {
        const Icon = sphereIcons[index];
        return (
          <div
            key={sphere.name}
            className="relative z-10 rounded-2xl border border-white/10 bg-[#0b1a27]/95 p-4"
          >
            <Icon className={`h-7 w-7 ${sphereColors[index]}`} aria-hidden="true" />
            <h3 className="mt-3 font-bold text-white">{sphere.name}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6">
              {sphere.description}
            </p>
          </div>
        );
      })}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-sky-200/40 bg-[radial-gradient(circle_at_35%_30%,#38bdf8,#0369a1_55%,#164e63)] shadow-[0_0_35px_rgba(56,189,248,.25)] sm:h-24 sm:w-24">
        <Globe2 className="h-10 w-10 text-white" aria-hidden="true" />
      </div>
    </div>
  );
}

function PlateMotionDiagram({ mode }: { mode: "Pertembungan" | "Pencapahan" | "Sesaran" }) {
  return (
    <div
      aria-label={`Rajah pergerakan plat: ${mode}`}
      className="rounded-2xl border border-white/10 bg-slate-950/45 p-4"
    >
      <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-xl bg-slate-900/80">
        {mode === "Pertembungan" ? (
          <>
            <ArrowRight className="absolute left-5 h-7 w-7 text-rose-300" />
            <div className="h-7 w-[36%] -skew-y-6 border-t-4 border-amber-300 bg-amber-300/10" />
            <div className="h-7 w-[36%] skew-y-6 border-t-4 border-orange-300 bg-orange-300/10" />
            <ArrowLeft className="absolute right-5 h-7 w-7 text-rose-300" />
          </>
        ) : mode === "Pencapahan" ? (
          <>
            <ArrowLeft className="absolute left-5 h-7 w-7 text-cyan-300" />
            <div className="h-8 w-[34%] border-t-4 border-cyan-300 bg-cyan-300/10" />
            <div className="mx-2 h-12 w-2 rounded-full bg-orange-300/70" />
            <div className="h-8 w-[34%] border-t-4 border-cyan-300 bg-cyan-300/10" />
            <ArrowRight className="absolute right-5 h-7 w-7 text-cyan-300" />
          </>
        ) : (
          <>
            <div className="absolute left-[15%] top-[30%] h-7 w-[65%] -rotate-6 border-t-4 border-violet-300 bg-violet-300/10" />
            <div className="absolute left-[20%] top-[58%] h-7 w-[65%] -rotate-6 border-t-4 border-fuchsia-300 bg-fuchsia-300/10" />
            <ArrowRight className="absolute left-8 top-3 h-6 w-6 text-violet-300" />
            <ArrowLeft className="absolute bottom-3 right-8 h-6 w-6 text-fuchsia-300" />
          </>
        )}
      </div>
      <h3 className="mt-3 text-center font-bold text-white">{mode}</h3>
    </div>
  );
}

export function GeoChapter5NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo5Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const foldedMountain = content.crustMovement.effects.find((item) => item.name === "Gunung Lipat");
  const blockMountain = content.crustMovement.effects.find(
    (item) => item.name === "Gunung Bongkah",
  );
  const volcano = content.crustMovement.effects.find((item) => item.name === "Gunung Berapi");

  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-sky-300/15 bg-[#07131d] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-sky-300">
            <Globe2 className="h-6 w-6" aria-hidden="true" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 5
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Bumi: sistem, struktur dan kuasa yang membentuknya
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              ["5.1", "Sistem fizikal"],
              ["5.2", "Struktur Bumi"],
              ["5.3", "Benua & lautan"],
              ["5.4", "Pergerakan kerak"],
            ].map(([number, label]) => (
              <span
                key={number}
                className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-slate-300"
              >
                <strong className="text-sky-200">{number}</strong> · {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-14 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section className="space-y-6">
          <SectionHeading section={sections[0]} />
          <div className="grid items-center gap-6 lg:grid-cols-[.65fr_1.35fr]">
            <div className="space-y-4">
              <Panel>
                <Orbit className="h-7 w-7 text-sky-300" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-white">510 juta km²</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {content.physicalSystem.surfaceArea}
                </p>
              </Panel>
              <Panel>
                <div
                  className="overflow-hidden rounded-full bg-slate-800"
                  aria-label="71 peratus air dan 29 peratus daratan"
                >
                  <div className="flex h-10 text-xs font-black text-slate-950">
                    <div className="flex w-[71%] items-center justify-center bg-cyan-300">
                      71% air
                    </div>
                    <div className="flex w-[29%] items-center justify-center bg-amber-300">
                      29% darat
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {content.physicalSystem.waterVsLand}
                </p>
              </Panel>
            </div>
            <EarthSystemDiagram content={content.physicalSystem} />
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <div className="mx-auto max-w-3xl space-y-2">
            {[...content.physicalSystem.atmosphereLayers].reverse().map((layer, index) => (
              <div
                key={layer.name}
                className="flex items-center gap-4 rounded-xl border border-sky-300/15 bg-gradient-to-r from-sky-300/[0.05] to-transparent p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-300/10 font-mono text-xs font-black text-sky-200">
                  {5 - index}
                </span>
                <span className="font-bold text-white">{layer.name}</span>
              </div>
            ))}
            <div className="flex items-center justify-center gap-2 pt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
              Permukaan Bumi
            </div>
          </div>
          <Panel className="border-sky-300/20">
            <div className="flex items-start gap-3">
              <Cloud className="mt-1 h-6 w-6 shrink-0 text-sky-300" aria-hidden="true" />
              <p className="text-sm leading-6 text-slate-300">
                Hafal dari bawah ke atas: Troposfera → Stratosfera → Mesosfera → Termosfera →
                Eksosfera.
              </p>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <div className="grid items-center gap-7 lg:grid-cols-[1.15fr_.85fr]">
            <figure className="overflow-hidden rounded-2xl border border-orange-300/20 bg-slate-950/45 p-2">
              <img
                src="/geography/earth-structure.png"
                alt="Keratan rentas struktur Bumi yang menunjukkan kerak, mantel, teras luar dan teras dalam"
                width={2048}
                height={1118}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full rounded-xl object-cover"
              />
              <figcaption className="px-2 pb-1 pt-3 text-center text-xs text-slate-400">
                Kerak Bumi → mantel → teras Bumi
              </figcaption>
            </figure>
            <div className="space-y-4">
              {content.structure.layers.map((layer, index) => (
                <Panel
                  key={layer.name}
                  className={
                    index === 0
                      ? "border-amber-300/20"
                      : index === 1
                        ? "border-orange-300/20"
                        : "border-rose-300/20"
                  }
                >
                  <h3 className="font-bold text-white">{layer.name}</h3>
                  <div className="mt-3">
                    <Checklist items={layer.facts} />
                  </div>
                </Panel>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel>
              <p className="font-mono text-lg font-black text-amber-200">SIAL</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Silika + aluminium · bahagian atas kerak · membentuk benua
              </p>
            </Panel>
            <Panel>
              <p className="font-mono text-lg font-black text-orange-200">SIMA</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Silika + magnesium · di bawah sial · dasar lautan
              </p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <p className="max-w-3xl text-sm leading-7 text-slate-300">
            {content.continentsOceans.definition}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.continentsOceans.continents.map((continent, index) => (
              <Panel key={continent.name} className={index === 0 ? "border-lime-300/25" : ""}>
                <span className="font-mono text-xs font-black text-lime-300">{index + 1}</span>
                <h3 className="mt-2 text-lg font-black text-white">{continent.name}</h3>
                <div className="mt-3">
                  <Checklist items={continent.facts} />
                </div>
              </Panel>
            ))}
          </div>
          <Panel className="border-lime-300/20">
            <div className="flex items-start gap-3">
              <Globe2 className="mt-1 h-6 w-6 shrink-0 text-lime-300" aria-hidden="true" />
              <p className="text-sm leading-6 text-slate-300">
                Asia ialah benua terbesar, manakala Australia ialah benua paling mendatar. Antartika
                pula terletak paling selatan.
              </p>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[4]} />
          <div>
            <h3 className="mb-4 font-bold text-white">Lima lautan luas</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {content.continentsOceans.oceans.map((ocean, index) => (
                <Panel key={ocean.name} className={index === 0 ? "border-cyan-300/25" : ""}>
                  <Waves className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                  <h3 className="mt-3 font-bold text-white">{ocean.name}</h3>
                  <div className="mt-3">
                    <Checklist items={ocean.facts} />
                  </div>
                </Panel>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-white">Laut dan selat penting</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {content.continentsOceans.seasAndStraits.map((item) => (
                <Panel key={item.name}>
                  <h3 className="font-bold text-sky-200">{item.name}</h3>
                  <div className="mt-3">
                    <Checklist items={item.facts} />
                  </div>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[5]} />
          <Panel>
            <p className="text-sm leading-7 text-slate-300">{content.crustMovement.definition}</p>
          </Panel>
          <div className="grid gap-4 md:grid-cols-3">
            {content.crustMovement.keyTerms.map((item) => (
              <div key={item.term}>
                <PlateMotionDiagram mode={item.term as "Pertembungan" | "Pencapahan" | "Sesaran"} />
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.definition}</p>
              </div>
            ))}
          </div>
          <Panel className="border-violet-300/20">
            <div className="flex items-start gap-3">
              <MoveHorizontal
                className="mt-1 h-6 w-6 shrink-0 text-violet-300"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-bold text-violet-200">Hanyutan benua</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {content.crustMovement.continentalDrift}
                </p>
              </div>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[6]} />
          <div className="grid gap-6 lg:grid-cols-2">
            {foldedMountain && (
              <div className="space-y-4">
                <figure className="overflow-hidden rounded-2xl border border-amber-300/20 bg-slate-950/45 p-2">
                  <img
                    src="/geography/gunung-lipat.png"
                    alt="Rajah pembentukan gunung lipat oleh daya mampatan"
                    width={2048}
                    height={1118}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full rounded-xl object-cover"
                  />
                  <figcaption className="px-2 pb-1 pt-3 text-center font-bold text-amber-100">
                    Gunung Lipat · daya mampatan
                  </figcaption>
                </figure>
                <Panel>
                  <Checklist items={foldedMountain.process} />
                </Panel>
              </div>
            )}
            {blockMountain && (
              <div className="space-y-4">
                <figure className="overflow-hidden rounded-2xl border border-violet-300/20 bg-slate-950/45 p-2">
                  <img
                    src="/geography/gunung-bongkah.png"
                    alt="Rajah pembentukan gunung bongkah dan lurah gelinciran oleh sesaran"
                    width={2048}
                    height={1118}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full rounded-xl object-cover"
                  />
                  <figcaption className="px-2 pb-1 pt-3 text-center font-bold text-violet-100">
                    Gunung Bongkah · gelinciran atau sesaran
                  </figcaption>
                </figure>
                <Panel>
                  <Checklist items={blockMountain.process} />
                </Panel>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[7]} />
          <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative mx-auto flex aspect-square w-full max-w-sm items-end justify-center overflow-hidden rounded-3xl border border-orange-300/20 bg-[linear-gradient(#07131d_0_42%,#431407_42%_100%)]">
              <div className="absolute bottom-[18%] h-[48%] w-[70%] [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-gradient-to-b from-orange-300/80 to-stone-700" />
              <div className="absolute bottom-[18%] left-1/2 h-[46%] w-3 -translate-x-1/2 bg-orange-400/80" />
              <div className="absolute left-1/2 top-[18%] h-16 w-16 -translate-x-1/2 rounded-full bg-orange-400/25 blur-xl" />
              <Flame
                className="absolute left-1/2 top-[20%] h-12 w-12 -translate-x-1/2 text-orange-300"
                aria-hidden="true"
              />
              <span className="relative z-10 mb-6 rounded-full bg-slate-950/80 px-3 py-2 text-xs font-black text-orange-100">
                Magma → lava → gunung berapi
              </span>
            </div>
            {volcano && (
              <Panel className="border-orange-300/20">
                <Flame className="h-8 w-8 text-orange-300" aria-hidden="true" />
                <h3 className="mt-3 text-xl font-black text-white">Gunung Berapi</h3>
                <div className="mt-4">
                  <Checklist items={volcano.process} />
                </div>
              </Panel>
            )}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Panel className="border-rose-300/20">
              <Activity className="h-8 w-8 text-rose-300" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-black text-white">Gempa Bumi</h3>
              <div className="mt-4">
                <Checklist items={content.crustMovement.earthquakeFacts} />
              </div>
            </Panel>
            <Panel className="border-cyan-300/20">
              <Radio className="h-8 w-8 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-black text-white">Tsunami</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {content.crustMovement.tsunamiFact}
              </p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[8]} />
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
                    "Apakah empat komponen sistem fizikal Bumi?",
                    "Atmosfera, litosfera, hidrosfera dan biosfera.",
                  ],
                  [
                    "Apakah tiga lapisan utama struktur Bumi?",
                    "Kerak Bumi, mantel dan teras Bumi.",
                  ],
                  [
                    "Apakah benua dan lautan terbesar?",
                    "Asia ialah benua terbesar dan Lautan Pasifik ialah lautan terbesar.",
                  ],
                  [
                    "Apakah tiga jenis utama pergerakan plat?",
                    "Pertembungan, pencapahan dan sesaran.",
                  ],
                  [
                    "Bagaimanakah tsunami boleh berlaku?",
                    "Gempa bumi di dasar laut boleh menghasilkan ombak besar yang dikenali sebagai tsunami.",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
                      <span>{question}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-sky-300 transition group-open:rotate-180 motion-reduce:transition-none" />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel className="border-sky-300/25 bg-gradient-to-br from-sky-300/10 to-orange-300/10">
            <div className="flex items-start gap-3">
              <Layers3 className="mt-1 h-6 w-6 shrink-0 text-sky-300" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-sky-200">Rumusan bab</h3>
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
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-sky-300 to-orange-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? "Bab 5 telah selesai" : "Tandakan Bab 5 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
