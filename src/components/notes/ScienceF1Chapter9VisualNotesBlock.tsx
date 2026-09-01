import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  CloudSun,
  Droplets,
  Earth,
  Flame,
  Lightbulb,
  Mountain,
  Pickaxe,
  Radio,
  Recycle,
  ShieldAlert,
  Sparkles,
  Waves,
  Wind,
} from "lucide-react";
import type { Chapter9Content } from "@/content/form1/science/chapter-9/chapter9-content";
import { chapter9Supplement } from "@/content/form1/science/chapter-9/chapter9-content";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Form 1 Science · Chapter 9",
    title: "Earth is a connected, changing system",
    subtitle:
      "Travel from the atmosphere to the core, then connect rocks, moving plates, geohazards, fossils, and the resources beneath our feet.",
    path: [
      ["9.1", "Earth system"],
      ["9.2", "Rocks"],
      ["9.3", "Processes"],
      ["9.4", "Geohazards"],
      ["9.5", "Earth's age"],
      ["9.6", "Resources"],
    ],
    sections: [
      [
        "9.1",
        "Four spheres make one habitable Earth",
        "Life depends on interactions among air, water, living things, and solid Earth.",
      ],
      [
        "9.1",
        "Height and depth reveal distinct zones",
        "Atmospheric and ocean zones change as pressure, temperature, and light change.",
      ],
      [
        "9.1",
        "Earth is layered and water keeps cycling",
        "The planet has a solid outer structure, a moving mantle system, and a metallic core.",
      ],
      [
        "9.2",
        "Rocks record a continuous cycle",
        "Formation conditions determine a rock's texture, fossils, and examples.",
      ],
      [
        "9.3",
        "External and internal forces reshape Earth",
        "Surface agents wear land down while internal heat builds and moves it.",
      ],
      [
        "9.4",
        "Geohazards have traceable causes",
        "Science cannot stop every hazard, but detection can provide time to act.",
      ],
      [
        "9.5",
        "Rocks and fossils are clocks",
        "Radioactive dating and fossil evidence reconstruct Earth's 4.5-billion-year history.",
      ],
      [
        "9.6",
        "Earth resources support life and technology",
        "Water, minerals, fuels, and geothermal heat must be used responsibly.",
      ],
      [
        "Review",
        "Connect cause → process → evidence",
        "Strong answers name the mechanism, its observable result, and its consequence.",
      ],
    ],
    life: "Why Earth sustains life",
    composition: "Atmospheric composition",
    atmosphere: "Explore an atmospheric layer",
    ocean: "Explore an ocean zone",
    altitude: "Altitude relationships",
    internal: "Internal structure",
    waterCycle: "The water cycle",
    constant: "Why the amount of water stays constant",
    chooseRock: "Choose a rock type",
    formation: "Formation",
    characteristics: "Characteristics",
    examples: "Examples",
    exam: "Exam link",
    cycle: "Continuous rock cycle",
    chooseProcess: "Compare the processes",
    plate: "Plate movement outcomes",
    convection: "Mantle convection drives the system",
    chooseHazard: "Choose a geohazard",
    cause: "Cause",
    impact: "Impact",
    warning: "Early-warning technology",
    age: "Estimated age",
    timeline: "Biological milestones",
    fossils: "Why fossils matter",
    chooseResource: "Explore Earth resources",
    water: "Water resources",
    minerals: "Economic minerals",
    fuels: "Fossil fuels",
    geothermal: "Hydrothermal & geothermal",
    responsibility: "Human activity changes Earth systems",
    facts: "High-yield facts",
    recall: "Active recall",
    summary: "Chapter in one view",
    mark: "Mark Chapter 9 as read",
    marked: "Chapter 9 completed",
  },
  bm: {
    eyebrow: "Sains Tingkatan 1 · Bab 9",
    title: "Bumi ialah sistem yang saling berhubung dan sentiasa berubah",
    subtitle:
      "Jelajah dari atmosfera hingga teras, kemudian hubungkan batuan, pergerakan plat, geobahaya, fosil, dan sumber di bawah kaki kita.",
    path: [
      ["9.1", "Sistem Bumi"],
      ["9.2", "Batuan"],
      ["9.3", "Proses"],
      ["9.4", "Geobahaya"],
      ["9.5", "Usia Bumi"],
      ["9.6", "Sumber"],
    ],
    sections: [
      [
        "9.1",
        "Empat sfera membentuk Bumi yang sesuai untuk hidupan",
        "Hidupan bergantung pada interaksi udara, air, benda hidup, dan Bumi pepejal.",
      ],
      [
        "9.1",
        "Ketinggian dan kedalaman mempunyai zon berbeza",
        "Zon atmosfera dan lautan berubah mengikut tekanan, suhu, dan cahaya.",
      ],
      [
        "9.1",
        "Bumi berlapis dan air terus berkitar",
        "Planet ini mempunyai struktur luar pepejal, sistem mantel yang bergerak, dan teras logam.",
      ],
      [
        "9.2",
        "Batuan merekodkan kitaran berterusan",
        "Keadaan pembentukan menentukan tekstur, fosil, dan contoh sesuatu batuan.",
      ],
      [
        "9.3",
        "Daya luaran dan dalaman membentuk semula Bumi",
        "Agen permukaan menghauskan daratan manakala haba dalaman membina dan menggerakkannya.",
      ],
      [
        "9.4",
        "Geobahaya mempunyai punca yang dapat dijejaki",
        "Sains tidak dapat menghentikan semua bahaya, tetapi pengesanan memberi masa untuk bertindak.",
      ],
      [
        "9.5",
        "Batuan dan fosil ialah jam Bumi",
        "Pentarikhan radioaktif dan bukti fosil membina semula sejarah Bumi selama 4.5 bilion tahun.",
      ],
      [
        "9.6",
        "Sumber Bumi menyokong kehidupan dan teknologi",
        "Air, mineral, bahan api, dan haba geoterma mesti digunakan secara bertanggungjawab.",
      ],
      [
        "Ulang kaji",
        "Hubungkan sebab → proses → bukti",
        "Jawapan kukuh menyatakan mekanisme, hasil yang diperhatikan, dan kesannya.",
      ],
    ],
    life: "Mengapa Bumi menyokong hidupan",
    composition: "Komposisi atmosfera",
    atmosphere: "Teroka satu lapisan atmosfera",
    ocean: "Teroka satu zon lautan",
    altitude: "Hubungan altitud",
    internal: "Struktur dalaman",
    waterCycle: "Kitaran air",
    constant: "Mengapa jumlah air kekal malar",
    chooseRock: "Pilih satu jenis batuan",
    formation: "Pembentukan",
    characteristics: "Ciri-ciri",
    examples: "Contoh",
    exam: "Hubungan peperiksaan",
    cycle: "Kitar batuan berterusan",
    chooseProcess: "Bandingkan proses",
    plate: "Hasil pergerakan plat",
    convection: "Perolakan mantel memacu sistem",
    chooseHazard: "Pilih satu geobahaya",
    cause: "Punca",
    impact: "Kesan",
    warning: "Teknologi amaran awal",
    age: "Anggaran usia",
    timeline: "Peristiwa penting biologi",
    fossils: "Mengapa fosil penting",
    chooseResource: "Teroka sumber Bumi",
    water: "Sumber air",
    minerals: "Mineral ekonomi",
    fuels: "Bahan api fosil",
    geothermal: "Hidroterma & geoterma",
    responsibility: "Aktiviti manusia mengubah sistem Bumi",
    facts: "Fakta skor tinggi",
    recall: "Ingatan aktif",
    summary: "Bab dalam satu pandangan",
    mark: "Tandakan Bab 9 selesai",
    marked: "Bab 9 telah selesai",
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
          className={`min-h-12 cursor-pointer rounded-xl border px-4 py-2 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none ${selected === index ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-slate-950/40 text-slate-300 hover:border-white/25"}`}
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] p-3 text-center">
      <p className="font-display text-xl font-black text-cyan-200">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
  );
}

function EarthLayers({ names }: { names: string[] }) {
  const colours = [
    "border-sky-300 bg-sky-300/15",
    "border-amber-300 bg-amber-300/15",
    "border-orange-400 bg-orange-400/15",
    "border-yellow-200 bg-yellow-200/15",
  ];
  return (
    <div className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-full border-8 border-sky-300/60 bg-sky-300/10 p-[9%] shadow-[0_0_45px_rgba(56,189,248,.12)]">
      {names.slice(1).reduceRight<ReactNode>(
        (inside, name, index) => (
          <div
            className={`flex h-full w-full items-center justify-center rounded-full border-8 ${colours[index + 1]}`}
            title={name}
          >
            {inside ?? (
              <span className="px-2 text-center text-xs font-black text-white">{name}</span>
            )}
          </div>
        ),
        null,
      )}
      <span className="sr-only">{names.join(", ")}</span>
    </div>
  );
}

export function ScienceF1Chapter9VisualNotesBlock({
  id,
  content,
  lang = "en",
  onMarkRead,
  isRead = false,
}: {
  id?: string;
  content: { en: Chapter9Content; bm: Chapter9Content };
  lang?: Lang;
  onMarkRead?: () => void;
  isRead?: boolean;
  storageKey?: string;
}) {
  const t = content[lang];
  const extra = chapter9Supplement[lang];
  const copy = ui[lang];
  const [atmosphere, setAtmosphere] = useState(0);
  const [ocean, setOcean] = useState(0);
  const [rock, setRock] = useState(0);
  const [process, setProcess] = useState(0);
  const [hazard, setHazard] = useState(0);
  const [resource, setResource] = useState(0);
  const atmosphereLayer = t.earthSystem.atmosphereLayers[atmosphere];
  const oceanZone = t.earthSystem.oceanZones[ocean];
  const rockType = t.composition.rockTypes[rock];
  const rockExtra = extra.rockExamples[rock];
  const selectedProcess = process === 0 ? t.mainProcesses.exogenic : t.mainProcesses.endogenic;
  const selectedHazard = extra.geohazardMatrix[hazard];

  return (
    <section
      id={id}
      className="overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#07111f] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-cyan-300">
            <Earth className="h-6 w-6" aria-hidden="true" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              {copy.eyebrow}
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {copy.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {copy.path.map(([number, label]) => (
              <span
                key={number}
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
          <SectionHeading section={copy.sections[0]} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.earthSystem.spheres.map((sphere, index) => {
              const Icon = [Wind, Sparkles, Droplets, Mountain][index];
              return (
                <Panel key={sphere.name}>
                  <Icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                  <h3 className="mt-3 font-bold text-white">{sphere.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{sphere.description}</p>
                </Panel>
              );
            })}
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <Panel>
              <h3 className="font-bold text-white">{copy.life}</h3>
              <div className="mt-4">
                <Checklist items={t.earthSystem.whyEarthSustainsLife} />
              </div>
            </Panel>
            <Panel>
              <h3 className="font-bold text-white">{copy.composition}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {extra.atmosphereComposition.map((item) => (
                  <Stat key={item.gas} value={item.percentage} label={item.gas} />
                ))}
              </div>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={copy.sections[1]} />
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <CloudSun className="h-6 w-6 text-cyan-300" />
                <h3 className="font-bold text-white">{copy.atmosphere}</h3>
              </div>
              <div className="mt-4">
                <Tabs
                  labels={t.earthSystem.atmosphereLayers.map((item) => item.name)}
                  selected={atmosphere}
                  onSelect={setAtmosphere}
                />
              </div>
              <div
                className="mt-5 rounded-xl border border-cyan-300/15 bg-slate-950/45 p-4"
                role="tabpanel"
              >
                <p className="font-mono text-xs font-black text-cyan-300">
                  {atmosphereLayer.altitude}
                </p>
                <h4 className="mt-1 text-xl font-black text-white">{atmosphereLayer.name}</h4>
                <div className="mt-3">
                  <Checklist items={atmosphereLayer.facts} />
                </div>
              </div>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <Waves className="h-6 w-6 text-sky-300" />
                <h3 className="font-bold text-white">{copy.ocean}</h3>
              </div>
              <div className="mt-4">
                <Tabs
                  labels={t.earthSystem.oceanZones.map((item) => item.name)}
                  selected={ocean}
                  onSelect={setOcean}
                />
              </div>
              <div
                className="mt-5 rounded-xl border border-sky-300/15 bg-gradient-to-b from-sky-300/10 to-slate-950/70 p-4"
                role="tabpanel"
              >
                <p className="font-mono text-xs font-black text-sky-300">{oceanZone.depth}</p>
                <h4 className="mt-1 text-xl font-black text-white">{oceanZone.name}</h4>
                <div className="mt-3">
                  <Checklist items={oceanZone.facts} />
                </div>
              </div>
            </Panel>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-white">{copy.altitude}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {extra.altitudeRelationships.map((item) => (
                <Panel key={item.variable}>
                  <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
                    {item.variable}
                  </p>
                  <p className="mt-2 font-bold text-white">{item.relationship}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.explanation}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={copy.sections[2]} />
          <div className="grid items-center gap-7 lg:grid-cols-2">
            <EarthLayers names={t.earthSystem.earthLayers.map((item) => item.name)} />
            <div className="space-y-3">
              <h3 className="font-bold text-white">{copy.internal}</h3>
              {t.earthSystem.earthLayers.map((layer, index) => (
                <Panel key={layer.name} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 font-mono text-sm font-black text-cyan-200">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-white">{layer.name}</h4>
                    {layer.subLayers && (
                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        {layer.subLayers.join(" · ")}
                      </p>
                    )}
                  </div>
                </Panel>
              ))}
            </div>
          </div>
          <Panel>
            <div className="flex items-center gap-3">
              <Recycle className="h-6 w-6 text-emerald-300" />
              <h3 className="font-bold text-white">{copy.waterCycle}</h3>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {t.earthSystem.waterCycleSteps.map((step, index) => (
                <div
                  key={step}
                  className="relative rounded-xl bg-slate-950/40 p-4 text-sm leading-6 text-slate-300"
                >
                  <span className="font-mono text-xs font-black text-emerald-300">
                    0{index + 1}
                  </span>
                  <p className="mt-2">{step}</p>
                  {index < t.earthSystem.waterCycleSteps.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 text-emerald-300 lg:block" />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4 text-sm leading-6 text-emerald-100">
              <strong>{copy.constant}:</strong> {t.earthSystem.waterConstancyFact}
            </p>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={copy.sections[3]} />
          <h3 className="font-bold text-white">{copy.chooseRock}</h3>
          <Tabs
            labels={t.composition.rockTypes.map((item) => item.name)}
            selected={rock}
            onSelect={setRock}
          />
          <Panel className="border-amber-300/20">
            <div className="grid gap-5 lg:grid-cols-3" role="tabpanel">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-amber-300">
                  {copy.formation}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{rockType.formation}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-amber-300">
                  {copy.characteristics}
                </p>
                <div className="mt-3">
                  <Checklist items={rockType.characteristics} />
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-amber-300">
                  {copy.examples}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {rockExtra.examples.join(" · ")}
                </p>
                <p className="mt-3 rounded-lg bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">
                  <strong>{copy.exam}:</strong> {rockExtra.examNote}
                </p>
              </div>
            </div>
          </Panel>
          <div>
            <h3 className="mb-4 font-bold text-white">{copy.cycle}</h3>
            <div className="grid gap-3 md:grid-cols-5">
              {t.composition.rockCycleSteps.map((step, index) => (
                <Panel key={step} className="relative">
                  <span className="font-mono text-xs font-black text-amber-300">0{index + 1}</span>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{step}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={copy.sections[4]} />
          <h3 className="font-bold text-white">{copy.chooseProcess}</h3>
          <Tabs
            labels={[t.mainProcesses.exogenic.name, t.mainProcesses.endogenic.name]}
            selected={process}
            onSelect={setProcess}
          />
          <Panel>
            <h4 className="text-xl font-black text-white">{selectedProcess.name}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-300">{selectedProcess.description}</p>
            <div className="mt-4">
              <Checklist items={selectedProcess.examples} />
            </div>
          </Panel>
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel className="border-orange-300/20">
              <div className="flex items-center gap-3">
                <Flame className="h-6 w-6 text-orange-300" />
                <h3 className="font-bold text-white">{copy.convection}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {t.mainProcesses.mantleConvectionNote}
              </p>
              <div className="mt-4 flex items-center justify-center gap-3 text-orange-200">
                <ArrowDown className="h-6 w-6" />
                <span className="text-sm font-bold">hot rises · cool sinks</span>
                <ArrowDown className="h-6 w-6 rotate-180" />
              </div>
            </Panel>
            <Panel>
              <h3 className="font-bold text-white">{copy.plate}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {t.mainProcesses.plateTectonicsNote}
              </p>
              <div className="mt-4 space-y-3">
                {extra.plateBoundaries.map((item) => (
                  <div key={item.movement} className="rounded-xl bg-slate-950/40 p-3">
                    <p className="text-sm font-bold text-cyan-200">{item.movement}</p>
                    <p className="mt-1 text-sm text-slate-300">{item.result}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={copy.sections[5]} />
          <h3 className="font-bold text-white">{copy.chooseHazard}</h3>
          <Tabs
            labels={extra.geohazardMatrix.map((item) => item.hazard)}
            selected={hazard}
            onSelect={setHazard}
          />
          <Panel className="border-rose-300/20">
            <div className="grid gap-5 md:grid-cols-2" role="tabpanel">
              <div>
                <div className="flex items-center gap-2 text-rose-300">
                  <CircleDot className="h-5 w-5" />
                  <p className="text-xs font-black uppercase tracking-wider">{copy.cause}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{selectedHazard.cause}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-amber-300">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="text-xs font-black uppercase tracking-wider">{copy.impact}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{selectedHazard.impact}</p>
              </div>
            </div>
          </Panel>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Radio className="h-6 w-6 text-cyan-300" />
              <h3 className="font-bold text-white">{copy.warning}</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {t.geohazards.earlyWarningTech.map((item) => (
                <Panel key={item.device}>
                  <h4 className="font-bold text-white">{item.device}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.purpose}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={copy.sections[6]} />
          <div className="grid gap-5 lg:grid-cols-[.65fr_1.35fr]">
            <Panel className="border-violet-300/20 bg-violet-300/[0.06]">
              <Clock3 className="h-7 w-7 text-violet-300" />
              <p className="mt-4 text-xs font-black uppercase tracking-wider text-violet-300">
                {copy.age}
              </p>
              <p className="mt-2 font-display text-3xl font-black text-white">
                {t.ageOfEarth.estimatedAge}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{t.ageOfEarth.ageMethod}</p>
            </Panel>
            <Panel>
              <h3 className="font-bold text-white">{copy.timeline}</h3>
              <div className="mt-4 space-y-3 border-l border-violet-300/30 pl-5">
                {t.ageOfEarth.lifeTimeline.map((item) => (
                  <div key={item.period} className="relative">
                    <span className="absolute -left-[1.47rem] top-2 h-2 w-2 rounded-full bg-violet-300" />
                    <p className="text-xs font-black text-violet-300">{item.period}</p>
                    <p className="mt-1 text-sm text-slate-300">{item.note}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          <Panel>
            <h3 className="font-bold text-white">{copy.fossils}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t.ageOfEarth.fossilDefinition}</p>
            <div className="mt-4">
              <Checklist items={t.ageOfEarth.fossilImportance} />
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={copy.sections[7]} />
          <h3 className="font-bold text-white">{copy.chooseResource}</h3>
          <Tabs
            labels={[copy.water, copy.minerals, copy.fuels, copy.geothermal]}
            selected={resource}
            onSelect={setResource}
          />
          <Panel className="min-h-56">
            <div role="tabpanel">
              {resource === 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {extra.earthResources.water.map((item) => (
                    <div key={item.type} className="rounded-xl bg-slate-950/40 p-4">
                      <Droplets className="h-6 w-6 text-sky-300" />
                      <h4 className="mt-3 font-bold text-white">{item.type}</h4>
                      <p className="mt-2 text-sm text-slate-300">{item.location}</p>
                      <p className="mt-3 text-sm leading-6 text-rose-200">
                        <strong>{copy.impact}:</strong> {item.pollutionRisk}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {resource === 1 && (
                <div className="grid gap-4 md:grid-cols-3">
                  {extra.earthResources.minerals.map((item) => (
                    <div key={item.group} className="rounded-xl bg-slate-950/40 p-4">
                      <Pickaxe className="h-6 w-6 text-amber-300" />
                      <h4 className="mt-3 font-bold text-white">{item.group}</h4>
                      <p className="mt-2 text-sm text-amber-100">{item.examples}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{item.importance}</p>
                    </div>
                  ))}
                </div>
              )}
              {resource === 2 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {extra.earthResources.fossilFuels.map((item) => (
                    <div key={item.resource} className="rounded-xl bg-slate-950/40 p-4">
                      <Flame className="h-6 w-6 text-orange-300" />
                      <h4 className="mt-3 font-bold text-white">{item.resource}</h4>
                      <p className="mt-2 text-sm text-orange-100">{item.source}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{item.formation}</p>
                    </div>
                  ))}
                </div>
              )}
              {resource === 3 && (
                <div className="mx-auto max-w-2xl text-center">
                  <Waves className="mx-auto h-9 w-9 text-cyan-300" />
                  <h4 className="mt-4 text-xl font-black text-white">{copy.geothermal}</h4>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {extra.earthResources.hydrothermal}
                  </p>
                </div>
              )}
            </div>
          </Panel>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <ShieldAlert className="h-6 w-6 text-rose-300" />
              <h3 className="font-bold text-white">{copy.responsibility}</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {extra.earthResources.humanImpacts.map((item) => (
                <Panel key={item.activity}>
                  <h4 className="font-bold text-rose-200">{item.activity}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.effect}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={copy.sections[8]} />
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
                      <ChevronDown className="h-4 w-4 shrink-0 text-cyan-300 transition group-open:rotate-180 motion-reduce:transition-none" />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel className="border-cyan-300/25 bg-gradient-to-br from-cyan-300/10 to-emerald-300/10">
            <h3 className="font-bold text-cyan-200">{copy.summary}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-200">{t.chapterSummary}</p>
          </Panel>
          {onMarkRead && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onMarkRead}
                disabled={isRead}
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-cyan-300 to-emerald-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? copy.marked : copy.mark}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
