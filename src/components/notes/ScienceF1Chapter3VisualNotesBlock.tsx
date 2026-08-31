import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Droplets,
  HeartPulse,
  Leaf,
  PawPrint,
  RotateCcw,
  Snowflake,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import type { Chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Chapter 3 visual map",
    title: "Homeostasis keeps life in balance",
    subtitle:
      "Follow the negative-feedback loop through water balance, body temperature, pulse rate, animal adaptations and plant transpiration.",
    path: [
      ["3.1", "Control loop"],
      ["3.2", "Water balance"],
      ["3.2", "Temperature"],
      ["Experiment 3.2", "Pulse rate"],
      ["3.3", "Animals"],
      ["3.4", "Plants"],
    ],
    sections: [
      [
        "3.1",
        "A stable internal environment",
        "Homeostasis keeps conditions such as temperature, water content, pH and blood pressure within a balanced range.",
      ],
      [
        "3.2",
        "Regulating water content",
        "The brain, endocrine system and kidneys coordinate urine production and thirst to restore water balance.",
      ],
      [
        "3.2",
        "Regulating body temperature",
        "Effectors in the skin, muscles and endocrine system respond in opposite ways when the body is too hot or too cold.",
      ],
      [
        "Experiment 3.2",
        "Physical activity changes pulse rate",
        "Measure pulse rate at rest, while walking and after jogging to connect muscle activity with oxygen and energy demand.",
      ],
      [
        "3.3",
        "Animals solve homeostasis differently",
        "Behavioural and structural adaptations help animals regulate temperature or prevent excessive water loss.",
      ],
      [
        "3.4",
        "Plants balance water loss and cooling",
        "Transpiration creates upward water pull and evaporative cooling, while guard cells control each stoma.",
      ],
      [
        "Chapter check",
        "Connect every response to the control loop",
        "Use the exam facts and practice prompts to explain stimulus, detection, correction and return to normal.",
      ],
    ],
    meaning: "What homeostasis means",
    origin: "Word origin",
    importance: "Why stability matters",
    controlLoop: "The negative-feedback control loop",
    loop: [
      "Internal change",
      "Receptor detects",
      "Brain / control centre",
      "Corrective mechanism",
      "Normal range restored",
    ],
    chooseDirection: "Choose a change",
    increases: "Factor increases",
    decreases: "Factor decreases",
    systems: "Systems involved",
    organs: "Organs involved",
    detected: "Detected by",
    correction: "Corrective response",
    result: "Result",
    sweatUrine: "Sweat and urine move in opposite directions",
    sweatUrineText:
      "Hot day or exercise: sweating increases, blood water falls and urine volume decreases. Cold day: sweating decreases and urine volume increases.",
    chooseCondition: "Choose the surrounding condition",
    hot: "Hot day",
    cold: "Cold day",
    coreTemperature: "Why 37°C matters",
    enzymeText:
      "Human enzymes work best near 37°C. Low temperature slows enzyme activity; very high core temperature can denature enzymes and damage cells.",
    practical: "Compulsory investigation",
    method: "Method sequence",
    expected: "Expected pulse range",
    conclusion: "Conclusion",
    chooseAnimal: "Choose an animal adaptation",
    transpiration: "Transpiration",
    functions: "Why transpiration matters",
    waterFact: "Water-loss fact",
    chooseStoma: "Choose a stoma condition",
    open: "Open stoma",
    closed: "Closed stoma",
    banana: "Banana-leaf response",
    bananaText:
      "On a hot afternoon, banana leaves roll up to reduce the surface area exposed to sunlight and reduce water loss.",
    examFacts: "Key exam facts",
    practice: "Test your explanation",
    questions: [
      [
        "How do blood vessels and sweat glands cool the body?",
        "Skin blood vessels dilate to increase heat loss. More sweat evaporates from the skin and removes heat.",
      ],
      [
        "Why drink during vigorous exercise before severe thirst?",
        "Heavy sweating removes water from blood and tissues. Drinking restores water balance before dehydration becomes serious.",
      ],
      [
        "How do banana leaves and bees limit water loss?",
        "Banana leaves roll up to reduce exposure; bees have a waxy layer and close spiracles between breaths.",
      ],
    ],
    summary: "Chapter summary",
    mark: "Mark Chapter 3 Complete",
    marked: "Chapter 3 complete",
  },
  bm: {
    eyebrow: "Peta visual Bab 3",
    title: "Homeostasis mengekalkan keseimbangan hidupan",
    subtitle:
      "Ikuti gelung maklum balas negatif melalui keseimbangan air, suhu badan, kadar nadi, adaptasi haiwan dan transpirasi tumbuhan.",
    path: [
      ["3.1", "Gelung kawalan"],
      ["3.2", "Keseimbangan air"],
      ["3.2", "Suhu badan"],
      ["Eksperimen 3.2", "Kadar nadi"],
      ["3.3", "Haiwan"],
      ["3.4", "Tumbuhan"],
    ],
    sections: [
      [
        "3.1",
        "Persekitaran dalaman yang stabil",
        "Homeostasis mengekalkan keadaan seperti suhu, kandungan air, pH dan tekanan darah dalam julat yang seimbang.",
      ],
      [
        "3.2",
        "Mengawal kandungan air",
        "Otak, sistem endokrin dan buah pinggang menyelaras penghasilan air kencing serta rasa dahaga untuk memulihkan keseimbangan air.",
      ],
      [
        "3.2",
        "Mengawal suhu badan",
        "Efektor pada kulit, otot dan sistem endokrin bertindak secara bertentangan apabila badan terlalu panas atau terlalu sejuk.",
      ],
      [
        "Eksperimen 3.2",
        "Aktiviti fizikal mengubah kadar denyutan nadi",
        "Ukur kadar nadi semasa rehat, berjalan dan selepas berjoging untuk menghubungkan aktiviti otot dengan keperluan oksigen dan tenaga.",
      ],
      [
        "3.3",
        "Haiwan mengawal homeostasis dengan cara berbeza",
        "Adaptasi tingkah laku dan struktur membantu haiwan mengawal suhu atau mencegah kehilangan air berlebihan.",
      ],
      [
        "3.4",
        "Tumbuhan mengimbangi kehilangan air dan penyejukan",
        "Transpirasi menghasilkan tarikan air ke atas dan penyejukan melalui penyejatan, manakala sel pengawal mengawal setiap stoma.",
      ],
      [
        "Semakan bab",
        "Hubungkan setiap gerak balas dengan gelung kawalan",
        "Gunakan fakta peperiksaan dan soalan latihan untuk menerangkan rangsangan, pengesanan, pembetulan dan kembali normal.",
      ],
    ],
    meaning: "Maksud homeostasis",
    origin: "Asal perkataan",
    importance: "Mengapa kestabilan penting",
    controlLoop: "Gelung kawalan maklum balas negatif",
    loop: [
      "Perubahan dalaman",
      "Reseptor mengesan",
      "Otak / pusat kawalan",
      "Mekanisme pembetulan",
      "Julat normal dipulihkan",
    ],
    chooseDirection: "Pilih perubahan",
    increases: "Faktor meningkat",
    decreases: "Faktor menurun",
    systems: "Sistem terlibat",
    organs: "Organ terlibat",
    detected: "Dikesan oleh",
    correction: "Gerak balas pembetulan",
    result: "Hasil",
    sweatUrine: "Peluh dan air kencing berubah secara songsang",
    sweatUrineText:
      "Hari panas atau senaman: peluh meningkat, air dalam darah berkurang dan isi padu air kencing menurun. Hari sejuk: peluh berkurang dan air kencing meningkat.",
    chooseCondition: "Pilih keadaan persekitaran",
    hot: "Hari panas",
    cold: "Hari sejuk",
    coreTemperature: "Mengapa 37°C penting",
    enzymeText:
      "Enzim manusia berfungsi paling baik sekitar 37°C. Suhu rendah memperlahankan aktiviti enzim; suhu teras yang sangat tinggi boleh menyahaslikan enzim dan merosakkan sel.",
    practical: "Penyiasatan wajib",
    method: "Urutan kaedah",
    expected: "Julat nadi dijangka",
    conclusion: "Kesimpulan",
    chooseAnimal: "Pilih adaptasi haiwan",
    transpiration: "Transpirasi",
    functions: "Mengapa transpirasi penting",
    waterFact: "Fakta kehilangan air",
    chooseStoma: "Pilih keadaan stoma",
    open: "Stoma terbuka",
    closed: "Stoma tertutup",
    banana: "Gerak balas daun pisang",
    bananaText:
      "Pada waktu petang yang panas, daun pisang menggulung untuk mengurangkan luas permukaan terdedah kepada cahaya matahari dan mengurangkan kehilangan air.",
    examFacts: "Fakta penting peperiksaan",
    practice: "Uji penerangan anda",
    questions: [
      [
        "Bagaimanakah salur darah dan kelenjar peluh menyejukkan badan?",
        "Salur darah kulit berdilat untuk meningkatkan kehilangan haba. Lebih banyak peluh menyejat dari kulit dan menyingkirkan haba.",
      ],
      [
        "Mengapa perlu minum ketika bersenam cergas sebelum terlalu dahaga?",
        "Peluh yang banyak menyingkirkan air daripada darah dan tisu. Minum memulihkan keseimbangan air sebelum dehidrasi menjadi serius.",
      ],
      [
        "Bagaimanakah daun pisang dan lebah mengehadkan kehilangan air?",
        "Daun pisang menggulung untuk mengurangkan pendedahan; lebah mempunyai lapisan berlilin dan menutup spirakel antara pernafasan.",
      ],
    ],
    summary: "Rumusan bab",
    mark: "Tandakan Bab 3 Selesai",
    marked: "Bab 3 selesai",
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
      <span className="text-xs font-black uppercase tracking-[.2em] text-amber-300">
        {section[0]}
      </span>
      <h2 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">{section[1]}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
        {section[2]}
      </p>
    </div>
  );
}

function Checklist({ items }: { items: readonly string[] | string[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <p key={item} className="flex gap-2 text-sm leading-6 text-slate-300">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
          {item}
        </p>
      ))}
    </div>
  );
}

function MechanismCard({
  mechanism,
  labels,
  tone,
}: {
  mechanism: Chapter3Content["waterRegulation"]["increase"];
  labels: { detected: string; result: string };
  tone: "amber" | "cyan";
}) {
  return (
    <Panel className={tone === "amber" ? "border-amber-300/20" : "border-cyan-300/20"}>
      <p className={`font-black ${tone === "amber" ? "text-amber-200" : "text-cyan-200"}`}>
        {mechanism.trigger}
      </p>
      <p className="mt-3 text-xs font-black uppercase tracking-wider text-slate-400">
        {labels.detected}: {mechanism.detectedBy}
      </p>
      <div className="mt-3">
        <Checklist items={mechanism.mechanism} />
      </div>
      <p className="mt-4 rounded-xl bg-emerald-300/10 p-3 text-sm font-black text-emerald-100">
        {labels.result}: {mechanism.result}
      </p>
    </Panel>
  );
}

export function ScienceF1Chapter3VisualNotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter3Content; bm: Chapter3Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const c = ui[lang];
  const [waterDirection, setWaterDirection] = useState<"increase" | "decrease">("increase");
  const [temperature, setTemperature] = useState<"hotCondition" | "coldCondition">("hotCondition");
  const [animal, setAnimal] = useState(0);
  const [stoma, setStoma] = useState(0);
  const selectedWater = t.waterRegulation[waterDirection];
  const selectedTemperature = t.temperatureRegulation[temperature];
  const selectedAnimal = t.animalHomeostasis[animal];
  const selectedStoma = t.plantHomeostasis.stomaStates[stoma];

  return (
    <section
      id={id}
      data-lang={lang}
      data-chapter="3"
      className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-amber-300/15 bg-[#17120b] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_14%_8%,rgba(245,158,11,.2),transparent_34%),radial-gradient(circle_at_84%_10%,rgba(56,189,248,.14),transparent_30%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-amber-400/15 via-slate-950/35 to-cyan-400/10 p-5 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-amber-200">
            <CircleGauge className="h-4 w-4" aria-hidden="true" />
            {c.eyebrow}
          </div>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-[1.04] text-white sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{c.subtitle}</p>
          <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {c.path.map((item, index) => (
              <div
                key={`${item[0]}-${item[1]}`}
                className="relative rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <span className="font-mono text-xs font-black text-cyan-300">{item[0]}</span>
                <p className="mt-1 text-xs font-black text-white">{item[1]}</p>
                {index < c.path.length - 1 && (
                  <ChevronRight
                    className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-[#17120b] p-1 text-amber-300 xl:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </header>

        <div className="space-y-6">
          <SectionHeading section={c.sections[0]} />
          <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <Panel>
              <div className="flex items-center gap-3">
                <CircleGauge className="h-7 w-7 text-amber-300" />
                <h3 className="font-black text-white">{c.meaning}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{t.definition.meaning}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs font-black uppercase text-amber-300">{c.origin}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.definition.etymology}</p>
                </div>
                <div className="rounded-xl bg-rose-300/10 p-3">
                  <p className="text-xs font-black uppercase text-rose-200">{c.importance}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{t.definition.importance}</p>
                </div>
              </div>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-7 w-7 text-cyan-300" />
                <h3 className="font-black text-white">{c.controlLoop}</h3>
              </div>
              <div className="mt-4 space-y-2">
                {c.loop.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 font-mono text-xs font-black text-cyan-200">
                      {index + 1}
                    </span>
                    <p className="font-bold text-slate-200">{step}</p>
                    {index < c.loop.length - 1 && (
                      <ChevronRight className="ml-auto h-4 w-4 text-amber-300" />
                    )}
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          <p className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] p-4 text-sm leading-6 text-slate-300">
            {t.controlProcessConcept}
          </p>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[1]} />
          <Panel>
            <div className="flex items-center gap-3">
              <Droplets className="h-7 w-7 text-cyan-300" />
              <h3 className="font-black text-white">{c.chooseDirection}</h3>
            </div>
            <div
              className="mt-4 grid grid-cols-2 gap-2"
              role="tablist"
              aria-label={c.chooseDirection}
            >
              {(["increase", "decrease"] as const).map((direction) => (
                <button
                  key={direction}
                  type="button"
                  role="tab"
                  aria-selected={waterDirection === direction}
                  onClick={() => setWaterDirection(direction)}
                  className={`min-h-12 cursor-pointer rounded-xl border px-4 text-sm font-black transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${waterDirection === direction ? "border-cyan-300 bg-cyan-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                >
                  {direction === "increase" ? c.increases : c.decreases}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <MechanismCard
                mechanism={selectedWater}
                labels={c}
                tone={waterDirection === "increase" ? "cyan" : "amber"}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-slate-200">
                {c.systems}: {t.waterRegulation.systemsInvolved}
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-slate-200">
                {c.organs}: {t.waterRegulation.organsInvolved}
              </span>
            </div>
          </Panel>
          <div className="rounded-2xl border border-amber-300/25 bg-amber-300/[0.08] p-4">
            <p className="flex items-center gap-2 font-black text-amber-200">
              <Droplets className="h-5 w-5" />
              {c.sweatUrine}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{c.sweatUrineText}</p>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[2]} />
          <Panel>
            <div className="flex items-center gap-3">
              <Thermometer className="h-7 w-7 text-rose-300" />
              <h3 className="font-black text-white">{c.chooseCondition}</h3>
            </div>
            <div
              className="mt-4 grid grid-cols-2 gap-2"
              role="tablist"
              aria-label={c.chooseCondition}
            >
              {(["hotCondition", "coldCondition"] as const).map((condition) => (
                <button
                  key={condition}
                  type="button"
                  role="tab"
                  aria-selected={temperature === condition}
                  onClick={() => setTemperature(condition)}
                  className={`min-h-12 cursor-pointer rounded-xl border px-4 text-sm font-black transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${temperature === condition ? "border-amber-300 bg-amber-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                >
                  {condition === "hotCondition" ? c.hot : c.cold}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
              <div className="flex items-center gap-3">
                {temperature === "hotCondition" ? (
                  <Sun className="h-8 w-8 text-amber-300" />
                ) : (
                  <Snowflake className="h-8 w-8 text-cyan-300" />
                )}
                <div>
                  <p className="font-black text-white">{selectedTemperature.trigger}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-wider text-slate-400">
                    {c.detected}: {selectedTemperature.detectedBy}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {selectedTemperature.mechanism.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-white/5 p-3 text-sm font-bold leading-6 text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-xl bg-emerald-300/10 p-3 text-sm font-black text-emerald-100">
                {c.result}: {selectedTemperature.result}
              </p>
            </div>
          </Panel>
          <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.07] p-4">
            <p className="flex items-center gap-2 font-black text-rose-200">
              <AlertTriangle className="h-5 w-5" />
              {c.coreTemperature}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{c.enzymeText}</p>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[3]} />
          <Panel>
            <div className="flex items-center gap-3">
              <HeartPulse className="h-7 w-7 text-rose-300" />
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-rose-200">
                  {c.practical}
                </p>
                <h3 className="font-black text-white">{t.pulseExperiment.purpose}</h3>
              </div>
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-wider text-slate-400">
              {c.method}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-5">
              {t.pulseExperiment.sequence.map((step, index) => (
                <div key={step} className="rounded-xl bg-white/5 p-3">
                  <span className="font-mono text-xs font-black text-rose-300">0{index + 1}</span>
                  <p className="mt-2 text-xs font-bold leading-5 text-slate-200">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {t.pulseExperiment.results.map((row, index) => (
                <div
                  key={row.activity}
                  className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"
                >
                  <p className="font-black text-white">{row.activity}</p>
                  <p className="mt-2 text-2xl font-black text-rose-200">{row.pulseRange}</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-rose-400"
                      style={{ width: `${45 + index * 25}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-300">{row.explanation}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-emerald-300/10 p-3 text-sm font-black text-emerald-100">
              {c.conclusion}: {t.pulseExperiment.conclusion}
            </p>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[4]} />
          <Panel>
            <div className="flex items-center gap-3">
              <PawPrint className="h-7 w-7 text-amber-300" />
              <h3 className="font-black text-white">{c.chooseAnimal}</h3>
            </div>
            <div
              className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
              role="tablist"
              aria-label={c.chooseAnimal}
            >
              {t.animalHomeostasis.map((item, index) => (
                <button
                  key={`${item.animal}-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={animal === index}
                  onClick={() => setAnimal(index)}
                  className={`min-h-14 cursor-pointer rounded-xl border p-2 text-left text-xs font-black transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${animal === index ? "border-amber-300 bg-amber-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                >
                  {item.animal}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-slate-950/40 p-5">
              <h4 className="text-xl font-black text-white">{selectedAnimal.animal}</h4>
              <p className="mt-3 text-sm leading-6 text-slate-300">{selectedAnimal.adaptation}</p>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[5]} />
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <Leaf className="h-7 w-7 text-emerald-300" />
                <h3 className="font-black text-white">{c.transpiration}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {t.plantHomeostasis.transpirationDefinition}
              </p>
              <p className="mt-4 text-xs font-black uppercase tracking-wider text-emerald-300">
                {c.functions}
              </p>
              <div className="mt-3">
                <Checklist items={t.plantHomeostasis.transpirationFunctions} />
              </div>
              <p className="mt-4 rounded-xl bg-cyan-300/10 p-3 text-sm font-bold leading-6 text-cyan-100">
                {c.waterFact}: {t.plantHomeostasis.waterLossFact}
              </p>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <Wind className="h-7 w-7 text-cyan-300" />
                <h3 className="font-black text-white">{c.chooseStoma}</h3>
              </div>
              <div
                className="mt-4 grid grid-cols-2 gap-2"
                role="tablist"
                aria-label={c.chooseStoma}
              >
                {t.plantHomeostasis.stomaStates.map((item, index) => (
                  <button
                    key={item.condition}
                    type="button"
                    role="tab"
                    aria-selected={stoma === index}
                    onClick={() => setStoma(index)}
                    className={`min-h-12 cursor-pointer rounded-xl border px-3 text-sm font-black transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${stoma === index ? "border-cyan-300 bg-cyan-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                  >
                    {item.condition}
                  </button>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-4 rounded-2xl bg-slate-950/40 p-4">
                <div
                  className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-8 ${selectedStoma.stomaState === "open" ? "border-emerald-300/50 bg-emerald-300/10" : "border-amber-300/50 bg-amber-300/10"}`}
                >
                  <span className="text-xs font-black uppercase text-white">
                    {selectedStoma.stomaState === "open" ? c.open : c.closed}
                  </span>
                </div>
                <div>
                  <p className="font-black text-white">{selectedStoma.condition}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{selectedStoma.reason}</p>
                </div>
              </div>
            </Panel>
          </div>
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.07] p-4">
            <p className="font-black text-emerald-200">{c.banana}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{c.bananaText}</p>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[6]} />
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <Panel>
              <h3 className="font-black text-white">{c.examFacts}</h3>
              <div className="mt-4">
                <Checklist items={t.keyExamFacts} />
              </div>
            </Panel>
            <Panel>
              <h3 className="font-black text-white">{c.practice}</h3>
              <div className="mt-4 space-y-3">
                {c.questions.map(([question, answer], index) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-white/[0.035] p-3"
                  >
                    <summary className="cursor-pointer list-none font-black text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
                      <span className="mr-2 font-mono text-cyan-300">Q{index + 1}</span>
                      {question}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel>
            <h3 className="font-black text-white">{c.summary}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t.chapterSummary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.keyTerms.map((term) => (
                <span
                  key={term}
                  className="rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1 text-xs font-bold text-amber-100"
                >
                  {term}
                </span>
              ))}
            </div>
          </Panel>
          {onMarkRead && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onMarkRead}
                disabled={isRead}
                className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${isRead ? "cursor-default bg-emerald-500/20 text-emerald-200" : "bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:scale-105 motion-reduce:hover:scale-100"}`}
              >
                <BookOpenCheck className="h-5 w-5" />
                {isRead ? c.marked : c.mark}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
