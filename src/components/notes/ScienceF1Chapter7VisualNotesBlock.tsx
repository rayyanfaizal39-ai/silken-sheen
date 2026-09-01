import { useState, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  Check,
  ChevronDown,
  CircleGauge,
  Cloud,
  Factory,
  Flame,
  FlaskConical,
  HeartPulse,
  Leaf,
  Lightbulb,
  Recycle,
  ShieldCheck,
  Sparkles,
  Trees,
  Wind,
} from "lucide-react";
import type { Bab7Content } from "@/content/form1/science/chapter-7/bab7-content";
import { bab7Supplement } from "@/content/form1/science/chapter-7/bab7-content";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Form 1 Science · Chapter 7",
    title: "Air is an invisible life-support system",
    subtitle:
      "Explore its gas mixture, linked natural cycles, combustion, fire safety, and the evidence behind air-pollution control.",
    path: [
      ["7.1", "Composition"],
      ["7.1", "Gas roles"],
      ["7.1", "Cycles"],
      ["7.2", "Combustion"],
      ["7.3", "Pollution"],
    ],
    sections: [
      [
        "7.1",
        "Air is a physical mixture",
        "Its gases retain their properties and can be separated physically.",
      ],
      [
        "Activity 7.1",
        "Measure oxygen using combustion",
        "A one-fifth rise in water links observation to atmospheric composition.",
      ],
      [
        "7.1",
        "Every atmospheric gas has a role",
        "Small percentages can still have major biological or industrial importance.",
      ],
      [
        "7.1",
        "Carbon and oxygen move in linked cycles",
        "Photosynthesis connects the two cycles and helps maintain balance.",
      ],
      ["7.2", "Fire needs three conditions", "Remove heat, oxygen, or fuel and combustion stops."],
      [
        "7.3",
        "Pollutants connect sources to consequences",
        "Trace each pollutant from its source to health and environmental damage.",
      ],
      [
        "7.3",
        "Control pollution on three fronts",
        "Law, technology, and education work best together.",
      ],
      [
        "Review",
        "Turn evidence into exam answers",
        "Use scientific principles to justify safety and environmental decisions.",
      ],
    ],
    atmosphere: "Standard atmospheric composition",
    whyMixture: "Why air is a mixture",
    variable: "Other variable components",
    experiment: "Oxygen experiment",
    aim: "Aim",
    steps: "Method and observation",
    predict: "Predict the water rise",
    correct: "Correct",
    tryAgain: "Try again",
    gasRole: "Choose a gas",
    uses: "Scientific and industrial roles",
    cycles: "Compare the cycles",
    protect: "Protect the balance",
    triangle: "Fire triangle",
    validate: "Experimental validation",
    procedure: "Procedure",
    observation: "Observation",
    conclusion: "Conclusion",
    extinguish: "Choose an extinguisher by fuel",
    examples: "Examples",
    media: "Correct extinguishing media",
    techniques: "Three firefighting techniques",
    warning: "Critical safety warning",
    safety: "Fire prevention checklist",
    pollution: "Air pollution",
    sources: "Sources and pollutants",
    effects: "Effects",
    api: "Air Pollutant Index (API)",
    prevention: "Prevention and control",
    facts: "High-yield facts",
    recall: "Active recall",
    summary: "Chapter rule",
    mark: "Mark Chapter 7 as read",
    marked: "Chapter 7 completed",
  },
  bm: {
    eyebrow: "Sains Tingkatan 1 · Bab 7",
    title: "Udara ialah sistem sokongan hidup yang tidak kelihatan",
    subtitle:
      "Terokai campuran gas, kitar semula jadi yang berkait, pembakaran, keselamatan kebakaran, dan bukti di sebalik kawalan pencemaran udara.",
    path: [
      ["7.1", "Komposisi"],
      ["7.1", "Peranan gas"],
      ["7.1", "Kitar"],
      ["7.2", "Pembakaran"],
      ["7.3", "Pencemaran"],
    ],
    sections: [
      [
        "7.1",
        "Udara ialah campuran fizikal",
        "Gas-gasnya mengekalkan sifat dan boleh dipisahkan secara fizikal.",
      ],
      [
        "Aktiviti 7.1",
        "Ukur oksigen melalui pembakaran",
        "Kenaikan air satu perlima menghubungkan pemerhatian dengan komposisi atmosfera.",
      ],
      [
        "7.1",
        "Setiap gas atmosfera mempunyai peranan",
        "Peratusan kecil masih boleh mempunyai kepentingan biologi atau industri yang besar.",
      ],
      [
        "7.1",
        "Karbon dan oksigen bergerak dalam kitar berkait",
        "Fotosintesis menghubungkan kedua-dua kitar dan membantu mengekalkan keseimbangan.",
      ],
      [
        "7.2",
        "Api memerlukan tiga syarat",
        "Singkirkan haba, oksigen, atau bahan api dan pembakaran terhenti.",
      ],
      [
        "7.3",
        "Bahan pencemar menghubungkan punca dengan kesan",
        "Jejaki setiap bahan pencemar daripada puncanya kepada kerosakan kesihatan dan alam sekitar.",
      ],
      [
        "7.3",
        "Kawal pencemaran melalui tiga pendekatan",
        "Undang-undang, teknologi, dan pendidikan paling berkesan apabila digabungkan.",
      ],
      [
        "Ulang kaji",
        "Tukar bukti kepada jawapan peperiksaan",
        "Gunakan prinsip saintifik untuk mewajarkan keputusan keselamatan dan alam sekitar.",
      ],
    ],
    atmosphere: "Komposisi atmosfera piawai",
    whyMixture: "Mengapa udara ialah campuran",
    variable: "Komponen lain yang berubah-ubah",
    experiment: "Eksperimen oksigen",
    aim: "Tujuan",
    steps: "Kaedah dan pemerhatian",
    predict: "Ramalkan kenaikan air",
    correct: "Betul",
    tryAgain: "Cuba lagi",
    gasRole: "Pilih satu gas",
    uses: "Peranan saintifik dan industri",
    cycles: "Bandingkan kitar",
    protect: "Lindungi keseimbangan",
    triangle: "Segi tiga api",
    validate: "Pengesahan eksperimen",
    procedure: "Prosedur",
    observation: "Pemerhatian",
    conclusion: "Kesimpulan",
    extinguish: "Pilih pemadam mengikut bahan api",
    examples: "Contoh",
    media: "Medium pemadam yang betul",
    techniques: "Tiga teknik memadam kebakaran",
    warning: "Amaran keselamatan kritikal",
    safety: "Senarai semak pencegahan kebakaran",
    pollution: "Pencemaran udara",
    sources: "Punca dan bahan pencemar",
    effects: "Kesan",
    api: "Indeks Pencemaran Udara (IPU)",
    prevention: "Pencegahan dan kawalan",
    facts: "Fakta skor tinggi",
    recall: "Ingatan aktif",
    summary: "Hukum bab",
    mark: "Tandakan Bab 7 selesai",
    marked: "Bab 7 telah selesai",
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
          className={`min-h-12 cursor-pointer rounded-xl border px-4 py-2 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${selected === index ? "border-sky-300/50 bg-sky-300/15 text-sky-100" : "border-white/10 bg-slate-950/40 text-slate-300 hover:border-white/25"}`}
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

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[680px] border-collapse text-left text-sm">
        <thead className="bg-sky-300/10 text-sky-100">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row) => (
            <tr key={row.join("-")} className="bg-slate-950/20">
              {row.map((cell, index) => (
                <td
                  key={`${cell}-${index}`}
                  className={`px-4 py-3 align-top leading-6 ${index === 0 ? "font-semibold text-white" : "text-slate-300"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ScienceF1Chapter7VisualNotesBlock({
  id,
  content,
  lang = "en",
  onMarkRead,
  isRead = false,
  storageKey: _storageKey,
}: {
  id?: string;
  content: { en: Bab7Content; bm: Bab7Content };
  lang?: Lang;
  onMarkRead?: () => void;
  isRead?: boolean;
  storageKey?: string;
}) {
  const t = content[lang];
  const extra = bab7Supplement[lang];
  const copy = ui[lang];
  const [gas, setGas] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [fireFactor, setFireFactor] = useState(0);
  const [fireClass, setFireClass] = useState(0);
  const [prediction, setPrediction] = useState<number | null>(null);

  const cycleBoxes = [t.cycles.carbonCycle, t.cycles.oxygenCycle];
  const predictionIsCorrect =
    prediction !== null && t.experiment.predictOptions[prediction].correct;

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden rounded-[2rem] border border-sky-300/15 bg-[#050b1d] text-slate-100 shadow-2xl shadow-sky-950/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,.15),transparent_30%),radial-gradient(circle_at_90%_34%,rgba(34,197,94,.11),transparent_32%)]" />
      <div className="relative px-4 py-8 sm:px-7 sm:py-10 lg:px-10">
        <header className="rounded-3xl border border-sky-300/20 bg-slate-950/55 p-5 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-black uppercase tracking-[.2em] text-sky-300">
                {copy.eyebrow}
              </p>
              <h1 className="mt-3 font-display text-3xl font-black leading-tight text-white sm:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                {copy.subtitle}
              </p>
            </div>
            <div className="relative mx-auto grid h-36 w-36 shrink-0 place-items-center rounded-full border border-sky-300/30 bg-sky-300/10 lg:mx-0">
              <Wind className="h-20 w-20 text-sky-300" aria-hidden="true" />
              <Sparkles
                className="absolute right-4 top-4 h-6 w-6 text-emerald-300"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-5">
            {copy.path.map(([code, label]) => (
              <div
                key={`${code}-${label}`}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3"
              >
                <span className="font-mono text-[10px] font-black uppercase text-sky-300">
                  {code}
                </span>
                <p className="mt-1 text-xs font-bold text-slate-200">{label}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="mt-12 space-y-16">
          <section className="space-y-6">
            <SectionHeading section={copy.sections[0]} />
            <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
              <Panel className="grid place-items-center">
                <div className="w-full max-w-xs">
                  <div
                    aria-label={copy.atmosphere}
                    className="mx-auto aspect-square w-52 rounded-full border-8 border-slate-950 shadow-[0_0_50px_rgba(56,189,248,.15)]"
                    style={{
                      background:
                        "conic-gradient(#38bdf8 0 78%, #a78bfa 78% 99%, #fbbf24 99% 99.03%, #4ade80 99.03% 100%)",
                    }}
                  />
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {t.composition.legend.map((item) => (
                      <div key={item.name} className="rounded-lg bg-slate-950/35 p-3">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <p className="mt-1 text-xs text-slate-300">{item.name}</p>
                        <p className="font-mono text-lg font-black text-white">{item.percentage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
              <div className="grid gap-4">
                <Panel>
                  <h3 className="font-bold text-sky-200">{copy.whyMixture}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {t.composition.reveals[2].body}
                  </p>
                </Panel>
                <Panel>
                  <h3 className="font-bold text-emerald-200">{copy.variable}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {t.composition.reveals[0].body}
                  </p>
                </Panel>
                <Panel>
                  <h3 className="font-bold text-violet-200">
                    {t.composition.reveals[1].chipLabel.replace(/^[^A-Za-zÀ-ÿ"]+/, "")}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {t.composition.reveals[1].body}
                  </p>
                </Panel>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[1]} />
            <Panel>
              <div className="flex items-center gap-3">
                <FlaskConical className="h-6 w-6 text-sky-300" />
                <h3 className="font-bold text-white">{copy.experiment}</h3>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-sky-300">
                {copy.aim}
              </p>
              <p className="mt-1 text-sm text-slate-200">{t.experiment.aim}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {t.experiment.steps.map((step, index) => (
                  <div
                    key={step.caption}
                    className="rounded-xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-300/15 font-mono text-sm font-black text-sky-300">
                      {index + 1}
                    </span>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{step.caption}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-300/[0.06] p-4 sm:p-5">
                <h4 className="font-bold text-white">{copy.predict}</h4>
                <p className="mt-1 text-sm text-slate-300">{t.experiment.predictQuestion}</p>
                <div className="mt-4 grid gap-2 md:grid-cols-3">
                  {t.experiment.predictOptions.map((option, index) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setPrediction(index)}
                      className={`min-h-12 cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${prediction === index ? (option.correct ? "border-emerald-300/50 bg-emerald-300/15 text-emerald-100" : "border-rose-300/50 bg-rose-300/15 text-rose-100") : "border-white/10 bg-slate-950/40 text-slate-200 hover:border-white/25"}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {prediction !== null && (
                  <p
                    role="status"
                    className={`mt-4 rounded-xl p-3 text-sm leading-6 ${predictionIsCorrect ? "bg-emerald-300/10 text-emerald-100" : "bg-rose-300/10 text-rose-100"}`}
                  >
                    <strong>{predictionIsCorrect ? copy.correct : copy.tryAgain}.</strong>{" "}
                    {predictionIsCorrect
                      ? t.experiment.predictFeedback
                      : t.experiment.predictQuestion}
                  </p>
                )}
              </div>
            </Panel>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[2]} />
            <Panel>
              <div className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-violet-300" />
                <h3 className="font-bold text-white">{copy.gasRole}</h3>
              </div>
              <div className="mt-4">
                <Tabs
                  labels={t.uses.tabs.map((item) => `${item.symbol} · ${item.name}`)}
                  selected={gas}
                  onSelect={setGas}
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2" role="tabpanel">
                {t.uses.tabs[gas].uses.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <p className="font-bold text-white">{item.label}</p>
                    {item.sub && <p className="mt-1 text-sm text-slate-300">{item.sub}</p>}
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[3]} />
            <Panel>
              <div className="flex items-center gap-3">
                <Recycle className="h-6 w-6 text-emerald-300" />
                <h3 className="font-bold text-white">{copy.cycles}</h3>
              </div>
              <div className="mt-4">
                <Tabs
                  labels={cycleBoxes.map((item) => item.heading)}
                  selected={cycle}
                  onSelect={setCycle}
                />
              </div>
              <div
                className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4"
                role="tabpanel"
              >
                <Checklist items={cycleBoxes[cycle].steps} />
              </div>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <Trees className="h-6 w-6 text-emerald-300" />
                <h3 className="font-bold text-white">{copy.protect}</h3>
              </div>
              <div className="mt-4">
                <Checklist items={t.cycles.balanceActions} />
              </div>
            </Panel>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[4]} />
            <div className="grid gap-5 lg:grid-cols-[.75fr_1.25fr]">
              <Panel className="grid place-items-center">
                <div className="w-full max-w-sm text-center">
                  <Flame className="mx-auto h-12 w-12 text-orange-300" />
                  <h3 className="mt-3 font-bold text-white">{copy.triangle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.combustion.definition}</p>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {Object.values(t.combustion.triangle).map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-orange-300/25 bg-orange-300/10 p-3 text-sm font-black text-orange-100"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
              <Panel>
                <h3 className="font-bold text-white">{copy.validate}</h3>
                <div className="mt-4">
                  <Tabs
                    labels={extra.combustionExperiments.map((item) => item.factor)}
                    selected={fireFactor}
                    onSelect={setFireFactor}
                  />
                </div>
                <div className="mt-4 space-y-3" role="tabpanel">
                  {([copy.procedure, copy.observation, copy.conclusion] as const).map(
                    (label, index) => (
                      <div key={label} className="rounded-xl bg-slate-950/35 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-orange-300">
                          {label}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-300">
                          {index === 0
                            ? extra.combustionExperiments[fireFactor].procedure
                            : index === 1
                              ? extra.combustionExperiments[fireFactor].observation
                              : extra.combustionExperiments[fireFactor].conclusion}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </Panel>
            </div>
            <Panel>
              <h3 className="font-bold text-white">{copy.extinguish}</h3>
              <div className="mt-4">
                <Tabs
                  labels={t.combustion.extinguisherTable.map((item) => item.material)}
                  selected={fireClass}
                  onSelect={setFireClass}
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2" role="tabpanel">
                <div className="rounded-xl bg-orange-300/10 p-4">
                  <p className="text-xs font-bold uppercase text-orange-300">{copy.examples}</p>
                  <p className="mt-2 font-semibold text-white">
                    {t.combustion.extinguisherTable[fireClass].examples}
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-300/10 p-4">
                  <p className="text-xs font-bold uppercase text-emerald-300">{copy.media}</p>
                  <p className="mt-2 font-semibold text-white">
                    {t.combustion.extinguisherTable[fireClass].extinguishers.join(" · ")}
                  </p>
                </div>
              </div>
            </Panel>
            <div className="grid gap-5 lg:grid-cols-2">
              <Panel>
                <h3 className="mb-4 font-bold text-white">{copy.techniques}</h3>
                <div className="space-y-3">
                  {t.combustion.methods.map((item) => (
                    <div key={item.heading} className="border-l-2 border-orange-300 pl-4">
                      <p className="font-bold text-orange-200">{item.heading}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{item.body}</p>
                    </div>
                  ))}
                </div>
              </Panel>
              <Panel className="border-rose-300/25 bg-rose-300/[0.06]">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-rose-300" />
                  <h3 className="font-bold text-white">{copy.warning}</h3>
                </div>
                <div className="mt-4">
                  <Checklist items={extra.fireWarnings} />
                </div>
              </Panel>
            </div>
            <Panel>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-300" />
                <h3 className="font-bold text-white">{copy.safety}</h3>
              </div>
              <div className="mt-4 grid gap-x-6 gap-y-2 md:grid-cols-2">
                <Checklist items={t.combustion.safetyChecklist} />
              </div>
            </Panel>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[5]} />
            <Panel>
              <div className="flex items-center gap-3">
                <Cloud className="h-6 w-6 text-slate-300" />
                <h3 className="font-bold text-white">{copy.pollution}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{extra.pollutionDefinition}</p>
            </Panel>
            <div>
              <h3 className="mb-4 font-bold text-white">{copy.sources}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {t.pollutionSources.map((source) => (
                  <Panel key={source.from}>
                    <Factory className="h-5 w-5 text-slate-300" />
                    <p className="mt-3 font-bold text-white">{source.from}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {source.pollutants.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-rose-300/10 px-3 py-1 text-xs text-rose-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-bold text-white">{copy.effects}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {t.pollutionEffects.map((effect, index) => {
                  const Icon = [HeartPulse, Factory, Leaf, Cloud][index];
                  return (
                    <Panel key={effect.heading}>
                      <Icon className="h-6 w-6 text-sky-300" />
                      <h4 className="mt-3 font-bold text-white">{effect.heading}</h4>
                      <div className="mt-3">
                        <Checklist items={effect.items} />
                      </div>
                    </Panel>
                  );
                })}
              </div>
            </div>
            <Panel>
              <div className="flex items-center gap-3">
                <CircleGauge className="h-6 w-6 text-sky-300" />
                <h3 className="font-bold text-white">{copy.api}</h3>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-5">
                {t.api.map((row, index) => (
                  <div
                    key={row.range}
                    className={`rounded-xl border p-3 ${["border-emerald-300/30 bg-emerald-300/10", "border-sky-300/30 bg-sky-300/10", "border-amber-300/30 bg-amber-300/10", "border-orange-300/30 bg-orange-300/10", "border-rose-300/30 bg-rose-300/10"][index]}`}
                  >
                    <p className="font-mono text-lg font-black text-white">{row.range}</p>
                    <p className="mt-1 text-xs font-bold text-slate-200">{row.label}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[6]} />
            <div className="grid gap-4 lg:grid-cols-3">
              {t.prevention.map((category) => (
                <Panel key={category.heading}>
                  <h3 className="font-bold text-sky-200">{category.heading}</h3>
                  <div className="mt-4">
                    <Checklist items={category.items} />
                  </div>
                </Panel>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[7]} />
            <div className="grid gap-5 lg:grid-cols-2">
              <Panel>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-300" />
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
                        <ChevronDown className="h-4 w-4 shrink-0 text-sky-300 transition group-open:rotate-180" />
                      </summary>
                      <p className="pt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </Panel>
            </div>
            <Panel className="border-sky-300/25 bg-gradient-to-br from-sky-300/10 to-emerald-300/10">
              <h3 className="font-bold text-sky-200">{copy.summary}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">{t.chapterSummary}</p>
            </Panel>
            {onMarkRead && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={onMarkRead}
                  disabled={isRead}
                  className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-sky-400 to-emerald-400 text-slate-950 hover:brightness-110"}`}
                >
                  {isRead ? copy.marked : copy.mark}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
