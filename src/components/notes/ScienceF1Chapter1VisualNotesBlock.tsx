import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  Beaker,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Droplets,
  Eye,
  FlaskConical,
  Lightbulb,
  Microscope,
  Ruler,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Thermometer,
  Timer,
} from "lucide-react";
import type { Chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import { HazardPictogram } from "./blocks/HazardDiamonds";

type Lang = "en" | "bm";

const ui = {
  bm: {
    eyebrow: "Peta visual Bab 1",
    title: "Penyiasatan saintifik bermula dengan rasa ingin tahu",
    subtitle:
      "Hubungkan sains dalam kehidupan, keselamatan makmal, pengukuran, ketumpatan dan kaedah saintifik dalam satu aliran pembelajaran.",
    path: [
      ["1.1", "Sains & kerjaya"],
      ["1.2", "Makmal selamat"],
      ["1.3", "Kuantiti & unit"],
      ["1.4", "Pengukuran"],
      ["1.5", "Ketumpatan"],
      ["1.6", "Penyiasatan"],
      ["1.7", "Sikap & nilai"],
    ],
    sections: [
      [
        "1.1",
        "Sains ialah sebahagian daripada kehidupan harian",
        "Sains menggunakan pemerhatian dan eksperimen yang sistematik untuk menerangkan fenomena alam.",
      ],
      [
        "1.2",
        "Makmal sains anda",
        "Kenali fungsi radas, tafsir simbol amaran dan bertindak dengan selamat.",
      ],
      [
        "1.3",
        "Kuantiti fizik dan unitnya",
        "Unit S.I. membolehkan ukuran saintifik dibandingkan dengan tepat di seluruh dunia.",
      ],
      [
        "1.4",
        "Alat pengukur dan ralat",
        "Pilih alat yang sesuai serta bezakan kejituan, kepersisan dan kepekaan.",
      ],
      [
        "1.5",
        "Ketumpatan",
        "Ketumpatan menghubungkan jisim dengan isi padu dan menerangkan sama ada bahan terapung atau tenggelam.",
      ],
      [
        "1.6",
        "Langkah penyiasatan saintifik",
        "Kaedah saintifik mengubah soalan kepada bukti, analisis dan kesimpulan.",
      ],
      [
        "1.7",
        "Sikap saintifik dan nilai murni",
        "Penyiasatan yang baik memerlukan kejujuran, ketepatan, rasa ingin tahu dan tanggungjawab.",
      ],
    ],
    chooseField: "Pilih bidang sains",
    relatedCareers: "Kerjaya berkaitan",
    dailyImpact: "Mengapa sains penting",
    chooseApparatus: "Pilih radas untuk melihat fungsinya",
    chooseHazard: "Pilih simbol amaran",
    examples: "Contoh",
    safety: ["Peraturan makmal", "Langkah keselamatan", "Jika berlaku kemalangan"],
    baseQuantities: "Lima kuantiti asas",
    prefixScale: "Tangga imbuhan",
    conversions: "Pertukaran unit berlangkah",
    concepts: "Tiga idea utama pengukuran",
    chooseInstrument: "Pilih kuantiti untuk membandingkan alat",
    standard: "Alat piawai",
    accurate: "Alat lebih jitu",
    errors: "Ralat dan cara mengurangkannya",
    estimation: "Kaedah anggaran",
    densityLab: "Makmal ketumpatan maya",
    selectMaterial: "Pilih bahan",
    comparedWithWater: "Berbanding air (1.00 g cm⁻³)",
    floats: "Terapung atau hampir terapung",
    sinks: "Tenggelam",
    displacement: "Ketumpatan pepejal tidak sekata: kaedah sesaran air",
    investigationSteps: "Sembilan langkah penyiasatan",
    processSkills: "Dua belas kemahiran proses sains",
    pendulum: "Kajian kes: eksperimen bandul",
    problem: "Pernyataan masalah",
    hypothesis: "Hipotesis",
    variables: "Pemboleh ubah",
    conclusion: "Kesimpulan",
    pendulumProblem: "Bagaimanakah panjang bandul mempengaruhi masa untuk 10 ayunan lengkap?",
    pendulumHypothesis: "Semakin panjang bandul, semakin lama masa untuk 10 ayunan lengkap.",
    pendulumVariables: [
      "Dimanipulasikan: panjang bandul",
      "Bergerak balas: masa untuk 10 ayunan",
      "Dimalarkan: jisim ladung dan sudut ayunan awal",
    ],
    pendulumConclusion:
      "Hipotesis diterima: masa purata meningkat apabila panjang bandul bertambah.",
    length: "Panjang (cm)",
    average: "Purata masa (s)",
    coreValues: "Nilai teras",
    moreValues: "Amalan tambahan",
    recap: "Semak sebelum tamat",
    recapItems: [
      "Sains menerangkan fenomena melalui pemerhatian dan eksperimen sistematik.",
      "Keselamatan makmal bergantung pada radas, simbol, peraturan dan tindakan kecemasan yang betul.",
      "Unit S.I. menyeragamkan ukuran; bacaan yang baik perlu jitu, persis dan peka.",
      "Ketumpatan = jisim ÷ isi padu; bandingkan dengan ketumpatan bendalir untuk meramal apungan.",
      "Penyiasatan saintifik bergerak daripada masalah dan hipotesis kepada data, kesimpulan dan laporan.",
    ],
    mark: "Tandakan Bab 1 Selesai",
    marked: "Bab 1 selesai",
  },
  en: {
    eyebrow: "Chapter 1 visual map",
    title: "Scientific investigation begins with curiosity",
    subtitle:
      "Connect science in daily life, laboratory safety, measurement, density and the scientific method in one learning journey.",
    path: [
      ["1.1", "Science & careers"],
      ["1.2", "Safe laboratory"],
      ["1.3", "Quantities & units"],
      ["1.4", "Measurement"],
      ["1.5", "Density"],
      ["1.6", "Investigation"],
      ["1.7", "Attitudes & values"],
    ],
    sections: [
      [
        "1.1",
        "Science is part of daily life",
        "Science uses systematic observation and experiments to explain natural phenomena.",
      ],
      [
        "1.2",
        "Your science laboratory",
        "Recognise apparatus functions, interpret warning symbols and act safely.",
      ],
      [
        "1.3",
        "Physical quantities and their units",
        "S.I. units allow scientific measurements to be compared accurately worldwide.",
      ],
      [
        "1.4",
        "Measuring instruments and errors",
        "Choose a suitable instrument and distinguish accuracy, precision and sensitivity.",
      ],
      [
        "1.5",
        "Density",
        "Density links mass to volume and explains whether a material floats or sinks.",
      ],
      [
        "1.6",
        "Steps in a scientific investigation",
        "The scientific method turns a question into evidence, analysis and a conclusion.",
      ],
      [
        "1.7",
        "Scientific attitudes and moral values",
        "A sound investigation requires honesty, accuracy, curiosity and responsibility.",
      ],
    ],
    chooseField: "Choose a field of science",
    relatedCareers: "Related careers",
    dailyImpact: "Why science matters",
    chooseApparatus: "Choose apparatus to see its function",
    chooseHazard: "Choose a warning symbol",
    examples: "Examples",
    safety: ["Laboratory rules", "Safety measures", "If an accident occurs"],
    baseQuantities: "Five base quantities",
    prefixScale: "Prefix ladder",
    conversions: "Worked unit conversions",
    concepts: "Three key measurement ideas",
    chooseInstrument: "Choose a quantity to compare instruments",
    standard: "Standard tool",
    accurate: "Higher-accuracy tool",
    errors: "Errors and how to reduce them",
    estimation: "Estimation methods",
    densityLab: "Virtual density laboratory",
    selectMaterial: "Choose a material",
    comparedWithWater: "Compared with water (1.00 g cm⁻³)",
    floats: "Floats or is nearly buoyant",
    sinks: "Sinks",
    displacement: "Density of an irregular solid: water displacement",
    investigationSteps: "Nine investigation steps",
    processSkills: "Twelve science process skills",
    pendulum: "Case study: the pendulum experiment",
    problem: "Problem statement",
    hypothesis: "Hypothesis",
    variables: "Variables",
    conclusion: "Conclusion",
    pendulumProblem: "How does pendulum length affect the time for 10 complete oscillations?",
    pendulumHypothesis:
      "The longer the pendulum, the longer the time for 10 complete oscillations.",
    pendulumVariables: [
      "Manipulated: pendulum length",
      "Responding: time for 10 oscillations",
      "Constant: bob mass and initial angle",
    ],
    pendulumConclusion:
      "The hypothesis is accepted: average time increases as pendulum length increases.",
    length: "Length (cm)",
    average: "Average time (s)",
    coreValues: "Core values",
    moreValues: "Additional practices",
    recap: "Check before you finish",
    recapItems: [
      "Science explains phenomena through systematic observation and experiments.",
      "Laboratory safety depends on correct apparatus, symbols, rules and emergency action.",
      "S.I. units standardise measurement; strong readings need accuracy, precision and sensitivity.",
      "Density = mass ÷ volume; compare it with fluid density to predict floating or sinking.",
      "A scientific investigation moves from a problem and hypothesis to data, conclusion and report.",
    ],
    mark: "Mark Chapter 1 Complete",
    marked: "Chapter 1 complete",
  },
} as const;

const pendulumResults = [
  [20, 9.1],
  [30, 11.4],
  [40, 13.1],
  [50, 14.3],
  [60, 15.2],
] as const;

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
      <span className="text-xs font-black uppercase tracking-[.2em] text-teal-300">
        {section[0]}
      </span>
      <h2 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">{section[1]}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
        {section[2]}
      </p>
    </div>
  );
}

export function ScienceF1Chapter1VisualNotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter1Content; bm: Chapter1Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const c = ui[lang];
  const [field, setField] = useState(0);
  const [apparatus, setApparatus] = useState(0);
  const [hazard, setHazard] = useState(0);
  const [instrument, setInstrument] = useState(0);
  const [material, setMaterial] = useState(6);
  const [investigation, setInvestigation] = useState(0);
  const selectedField = t.scienceInLife.fields[field];
  const selectedCareer = t.scienceInLife.careers.find((item) => item.field === selectedField.name);
  const selectedMaterial = t.density.table[material];
  const selectedDensity = Number(selectedMaterial.density);

  return (
    <section
      id={id}
      data-lang={lang}
      data-chapter="1"
      className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-teal-300/15 bg-[#071b22] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_15%_10%,rgba(20,184,166,.22),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(163,230,53,.12),transparent_30%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-teal-400/15 via-slate-950/35 to-lime-400/10 p-5 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-teal-200">
            <Microscope className="h-4 w-4" aria-hidden="true" />
            {c.eyebrow}
          </div>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-[1.04] text-white sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{c.subtitle}</p>
          <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {c.path.map((item, index) => (
              <div
                key={item[0]}
                className="relative rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <span className="font-mono text-xs font-black text-lime-300">{item[0]}</span>
                <p className="mt-1 text-xs font-black text-white">{item[1]}</p>
                {index < c.path.length - 1 && (
                  <ChevronRight
                    className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-[#071b22] p-1 text-teal-300 xl:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </header>

        <div className="space-y-6">
          <SectionHeading section={c.sections[0]} />
          <div className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
            <Panel>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-7 w-7 text-lime-300" aria-hidden="true" />
                <h3 className="font-black text-white">{c.dailyImpact}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{t.scienceInLife.definition}</p>
              <div className="mt-4 space-y-2">
                {t.scienceInLife.importance.map((item) => (
                  <p key={item} className="flex gap-2 text-sm text-slate-300">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-lime-300"
                      aria-hidden="true"
                    />
                    {item}
                  </p>
                ))}
              </div>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-7 w-7 text-teal-300" aria-hidden="true" />
                <h3 className="font-black text-white">{c.chooseField}</h3>
              </div>
              <div
                className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3"
                role="tablist"
                aria-label={c.chooseField}
              >
                {t.scienceInLife.fields.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={field === index}
                    onClick={() => setField(index)}
                    className={`min-h-12 rounded-xl border px-3 text-left text-xs font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${field === index ? "border-teal-300 bg-teal-300/15 text-teal-100" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-slate-950/50 p-4">
                <h4 className="text-xl font-black text-white">{selectedField.name}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-300">{selectedField.description}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-wider text-teal-300">
                  {c.relatedCareers}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {selectedCareer?.jobs.join(" · ") ?? selectedField.examples.join(" · ")}
                </p>
              </div>
            </Panel>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[1]} />
          <Panel>
            <div className="flex items-center gap-3">
              <FlaskConical className="h-7 w-7 text-teal-300" aria-hidden="true" />
              <h3 className="font-black text-white">{c.chooseApparatus}</h3>
            </div>
            <div
              className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7"
              role="tablist"
              aria-label={c.chooseApparatus}
            >
              {t.laboratory.apparatus.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={apparatus === index}
                  onClick={() => setApparatus(index)}
                  className={`min-h-16 rounded-xl border p-2 text-left text-[11px] font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${apparatus === index ? "border-teal-300 bg-teal-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                >
                  <Beaker className="mb-2 h-4 w-4 text-teal-300" aria-hidden="true" />
                  {item.name}
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-2xl border border-teal-300/20 bg-teal-300/[0.07] p-4">
              <p className="font-black text-teal-100">{t.laboratory.apparatus[apparatus].name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {t.laboratory.apparatus[apparatus].function}
              </p>
            </div>
          </Panel>

          <div className="grid gap-4 lg:grid-cols-[.7fr_1.3fr]">
            <Panel>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-7 w-7 text-amber-300" aria-hidden="true" />
                <h3 className="font-black text-white">{c.chooseHazard}</h3>
              </div>
              <div
                className="mt-4 grid grid-cols-3 gap-2"
                role="tablist"
                aria-label={c.chooseHazard}
              >
                {t.laboratory.hazardSymbols.map((item, index) => (
                  <button
                    key={item.kind}
                    type="button"
                    role="tab"
                    aria-selected={hazard === index}
                    onClick={() => setHazard(index)}
                    className={`min-h-12 rounded-xl border p-2 text-[10px] font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${hazard === index ? "border-amber-300 bg-amber-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-slate-950/55 p-4 text-center">
                <HazardPictogram
                  kind={t.laboratory.hazardSymbols[hazard].kind}
                  label={t.laboratory.hazardSymbols[hazard].name}
                  className="h-28 w-28"
                />
                <h4 className="mt-2 font-black text-white">
                  {t.laboratory.hazardSymbols[hazard].name}
                </h4>
                <p className="mt-2 text-xs leading-5 text-slate-300">
                  {t.laboratory.hazardSymbols[hazard].body}
                </p>
                <p className="mt-2 text-xs font-bold text-amber-200">
                  {c.examples}: {t.laboratory.hazardSymbols[hazard].examples}
                </p>
              </div>
            </Panel>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                t.laboratory.rules.slice(0, 6),
                t.laboratory.safetyMeasures,
                t.laboratory.accidentSteps,
              ].map((items, column) => (
                <Panel key={c.safety[column]} className={column === 2 ? "border-red-300/20" : ""}>
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      className={`h-5 w-5 ${column === 2 ? "text-red-300" : "text-lime-300"}`}
                      aria-hidden="true"
                    />
                    <h3 className="text-sm font-black text-white">{c.safety[column]}</h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    {items.map((item) => (
                      <p key={item} className="text-xs leading-5 text-slate-300">
                        {item}
                      </p>
                    ))}
                  </div>
                </Panel>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[2]} />
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <Scale className="h-7 w-7 text-lime-300" aria-hidden="true" />
                <h3 className="font-black text-white">{c.baseQuantities}</h3>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-5">
                {t.quantitiesAndUnits.baseQuantities.map((item) => (
                  <div key={item.symbol} className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-slate-400">{item.quantity}</p>
                    <p className="mt-1 font-black text-white">{item.unit}</p>
                    <span className="mt-2 inline-block rounded-md bg-lime-300/15 px-2 py-1 font-mono text-xs font-black text-lime-200">
                      {item.symbol}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {t.quantitiesAndUnits.siImportance}
              </p>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <CircleGauge className="h-7 w-7 text-teal-300" aria-hidden="true" />
                <h3 className="font-black text-white">{c.prefixScale}</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {t.quantitiesAndUnits.prefixes.map((item) => (
                  <div
                    key={item.prefix}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-black text-white">{item.prefix}</p>
                      <span className="font-mono text-sm font-black text-teal-300">
                        {item.symbol}
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-xs text-slate-300">{item.standardForm}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          <div>
            <h3 className="font-black text-white">{c.conversions}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.quantitiesAndUnits.conversions.map((item) => (
                <Panel key={item.question}>
                  <p className="text-xs font-black text-teal-200">{item.question}</p>
                  <p className="mt-3 font-mono text-xs text-slate-300">{item.working}</p>
                  <p className="mt-2 font-mono text-lg font-black text-lime-300">{item.answer}</p>
                </Panel>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[3]} />
          <div className="grid gap-3 sm:grid-cols-3">
            {t.measuringInstruments.definitions.map((item, index) => {
              const icons = [Target, CheckCircle2, Eye];
              const Icon = icons[index];
              return (
                <Panel key={item.term}>
                  <Icon className="h-7 w-7 text-teal-300" aria-hidden="true" />
                  <h3 className="mt-3 font-black text-white">{item.term}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.body}</p>
                </Panel>
              );
            })}
          </div>
          <Panel>
            <div className="flex items-center gap-3">
              <Ruler className="h-7 w-7 text-lime-300" aria-hidden="true" />
              <h3 className="font-black text-white">{c.chooseInstrument}</h3>
            </div>
            <div
              className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
              role="tablist"
              aria-label={c.chooseInstrument}
            >
              {t.measuringInstruments.instruments.map((item, index) => (
                <button
                  key={item.quantity}
                  type="button"
                  role="tab"
                  aria-selected={instrument === index}
                  onClick={() => setInstrument(index)}
                  className={`min-h-12 rounded-xl border px-3 text-left text-xs font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 ${instrument === index ? "border-lime-300 bg-lime-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                >
                  {item.quantity}
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-slate-400">{c.standard}</p>
                <p className="mt-2 font-black text-white">
                  {t.measuringInstruments.instruments[instrument].standardTool}
                </p>
              </div>
              <div className="rounded-xl bg-lime-300/[0.07] p-4">
                <p className="text-xs text-lime-200">{c.accurate}</p>
                <p className="mt-2 font-black text-white">
                  {t.measuringInstruments.instruments[instrument].higherAccuracyTool ?? "—"}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              {t.measuringInstruments.instruments[instrument].note}
            </p>
          </Panel>
          <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <h3 className="font-black text-white">{c.errors}</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {t.measuringInstruments.errorTypes.map((error) => (
                  <Panel key={error.type}>
                    <h4 className="font-black text-amber-200">{error.type}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{error.definition}</p>
                    <div className="mt-3 space-y-2">
                      {error.waysToOvercome.map((item) => (
                        <p key={item} className="flex gap-2 text-xs leading-5 text-slate-300">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-lime-300"
                            aria-hidden="true"
                          />
                          {item}
                        </p>
                      ))}
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-black text-white">{c.estimation}</h3>
              <Panel className="mt-3">
                <div className="space-y-3">
                  {t.measuringInstruments.estimationMethods.map((item) => (
                    <div key={item.quantity}>
                      <p className="text-xs font-black text-teal-200">{item.quantity}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-300">{item.method}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[4]} />
          <div className="grid gap-4 lg:grid-cols-[.75fr_1.25fr]">
            <Panel className="border-lime-300/20">
              <Droplets className="h-8 w-8 text-lime-300" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-black text-white">{t.density.definition}</h3>
              <div className="mt-4 rounded-xl bg-lime-300/10 p-4 font-mono text-sm font-black text-lime-200">
                {t.density.formula}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {t.density.workedExample.problem}
              </p>
              <div className="mt-3 space-y-1 font-mono text-xs text-slate-300">
                {t.density.workedExample.working.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="mt-3 font-mono text-xl font-black text-lime-300">
                {t.density.workedExample.answer}
              </p>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <Scale className="h-7 w-7 text-teal-300" aria-hidden="true" />
                <h3 className="font-black text-white">{c.densityLab}</h3>
              </div>
              <p className="mt-2 text-xs text-slate-400">{c.selectMaterial}</p>
              <div
                className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5"
                role="tablist"
                aria-label={c.selectMaterial}
              >
                {t.density.table.map((item, index) => (
                  <button
                    key={item.material}
                    type="button"
                    role="tab"
                    aria-selected={material === index}
                    onClick={() => setMaterial(index)}
                    className={`min-h-12 rounded-xl border p-2 text-left text-[11px] font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${material === index ? "border-teal-300 bg-teal-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                  >
                    {item.material}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid items-center gap-4 rounded-2xl bg-slate-950/55 p-4 sm:grid-cols-[.7fr_1.3fr]">
                <div className="relative mx-auto h-40 w-32 overflow-hidden rounded-b-[2.5rem] rounded-t-xl border-2 border-cyan-300/40 bg-cyan-400/15">
                  <div
                    className={`absolute left-1/2 h-14 w-14 -translate-x-1/2 rounded-full border-4 border-white/60 bg-gradient-to-br from-amber-200 to-orange-500 shadow-lg transition-transform duration-300 motion-reduce:transition-none ${selectedDensity <= 1 ? "top-4" : "top-24"}`}
                  />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{c.comparedWithWater}</p>
                  <h4 className="mt-1 text-2xl font-black text-white">
                    {selectedMaterial.material}
                  </h4>
                  <p className="mt-2 font-mono text-lg font-black text-teal-200">
                    {selectedMaterial.density} g cm⁻³
                  </p>
                  <p
                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-black ${selectedDensity <= 1 ? "bg-lime-300/15 text-lime-200" : "bg-orange-300/15 text-orange-200"}`}
                  >
                    {selectedDensity <= 1 ? c.floats : c.sinks}
                  </p>
                </div>
              </div>
            </Panel>
          </div>
          <Panel>
            <h3 className="font-black text-white">{c.displacement}</h3>
            <div className="mt-4 grid gap-2 lg:grid-cols-5">
              {t.density.waterDisplacement.map((item, index) => (
                <div
                  key={item}
                  className="relative rounded-xl bg-teal-300/[0.07] p-3 text-xs leading-5 text-slate-200"
                >
                  <span className="mb-2 block font-mono font-black text-teal-300">
                    0{index + 1}
                  </span>
                  {item}
                  {index < 4 && (
                    <ChevronRight
                      className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-[#071b22] p-1 text-teal-300 lg:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[5]} />
          <Panel>
            <div className="flex items-center gap-3">
              <BookOpenCheck className="h-7 w-7 text-teal-300" aria-hidden="true" />
              <h3 className="font-black text-white">{c.investigationSteps}</h3>
            </div>
            <div
              className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9"
              role="tablist"
              aria-label={c.investigationSteps}
            >
              {t.investigationSteps.steps.map((step, index) => (
                <button
                  key={step.step}
                  type="button"
                  role="tab"
                  aria-selected={investigation === index}
                  onClick={() => setInvestigation(index)}
                  className={`min-h-14 rounded-xl border p-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${investigation === index ? "border-teal-300 bg-teal-300/15" : "border-white/10 bg-white/[0.04]"}`}
                >
                  <span className="font-mono text-xs font-black text-lime-300">0{step.step}</span>
                  <span className="mt-1 block text-[10px] font-black leading-4 text-white">
                    {step.heading}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-slate-950/55 p-5">
              <p className="text-xs font-black text-teal-300">{investigation + 1}/9</p>
              <h4 className="mt-1 text-xl font-black text-white">
                {t.investigationSteps.steps[investigation].heading}
              </h4>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {t.investigationSteps.steps[investigation].body}
              </p>
            </div>
          </Panel>
          <div>
            <h3 className="font-black text-white">{c.processSkills}</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {t.investigationSteps.processSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                >
                  <span className="font-mono text-[10px] font-black text-lime-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-xs font-black text-white">{skill.name}</p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-400">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
          <Panel className="border-amber-300/20">
            <div className="flex items-center gap-3">
              <Timer className="h-7 w-7 text-amber-300" aria-hidden="true" />
              <h3 className="font-black text-white">{c.pendulum}</h3>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [c.problem, c.pendulumProblem],
                [c.hypothesis, c.pendulumHypothesis],
                [c.variables, c.pendulumVariables.join(" · ")],
                [c.conclusion, c.pendulumConclusion],
              ].map((item) => (
                <div key={item[0]} className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs font-black text-amber-200">{item[0]}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] border-separate border-spacing-y-1 text-left text-xs">
                <thead>
                  <tr className="text-teal-200">
                    <th className="px-3 py-2">{c.length}</th>
                    <th className="px-3 py-2">{c.average}</th>
                    <th className="px-3 py-2">
                      <span className="sr-only">Trend</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendulumResults.map(([length, average], index) => (
                    <tr key={length} className="bg-white/5">
                      <td className="rounded-l-lg px-3 py-2 font-mono text-white">{length}</td>
                      <td className="px-3 py-2 font-mono font-black text-lime-200">{average}</td>
                      <td className="rounded-r-lg px-3 py-2">
                        <div
                          className="h-2 rounded-full bg-amber-300/70"
                          style={{ width: `${35 + index * 14}%` }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[6]} />
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <h3 className="font-black text-lime-200">{c.coreValues}</h3>
              <div className="mt-4 space-y-3">
                {t.attitudesAndValues.core.map((item) => (
                  <p key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <CheckCircle2
                      className="mt-1 h-4 w-4 shrink-0 text-lime-300"
                      aria-hidden="true"
                    />
                    {item}
                  </p>
                ))}
              </div>
            </Panel>
            <Panel>
              <h3 className="font-black text-teal-200">{c.moreValues}</h3>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {t.attitudesAndValues.additional.map((item) => (
                  <p
                    key={item}
                    className="rounded-xl bg-white/5 p-3 text-xs leading-5 text-slate-300"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </Panel>
          </div>
        </div>

        <footer className="rounded-[1.75rem] border border-teal-300/20 bg-teal-300/[0.06] p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-lime-300" aria-hidden="true" />
            <h2 className="text-xl font-black text-white">{c.recap}</h2>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {c.recapItems.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl bg-slate-950/45 p-3 text-sm leading-6 text-slate-200"
              >
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
          {onMarkRead && (
            <button
              type="button"
              disabled={isRead}
              onClick={onMarkRead}
              className="mt-6 min-h-12 w-full rounded-xl bg-lime-300 px-5 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-default disabled:bg-emerald-400"
            >
              <span className="inline-flex items-center gap-2">
                {isRead ? (
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Microscope className="h-5 w-5" aria-hidden="true" />
                )}
                {isRead ? c.marked : c.mark}
              </span>
            </button>
          )}
        </footer>
      </div>
    </section>
  );
}
