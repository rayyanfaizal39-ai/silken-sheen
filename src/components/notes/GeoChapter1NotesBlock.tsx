import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  Crosshair,
  Gauge,
  History,
  Lightbulb,
  LocateFixed,
  Map,
  Orbit,
  RotateCw,
  Satellite,
  Smartphone,
  Sun,
} from "lucide-react";
import type { Geo1Content } from "@/content/form1/geography/chapter-1/geo1-content";

const sections = [
  [
    "1.1",
    "Arah memberikan kedudukan yang tepat",
    "Lapan arah mata angin menjadi bahasa asas untuk menerangkan hala tuju.",
  ],
  [
    "1.2",
    "Matahari menjadi panduan semula jadi",
    "Putaran Bumi menerangkan sebab matahari kelihatan terbit di Timur dan terbenam di Barat.",
  ],
  [
    "1.3",
    "Kompas menentukan arah dengan tepat",
    "Jarum magnet dan pemuka kompas perlu diorientasikan tanpa gangguan logam.",
  ],
  [
    "1.3",
    "Teknologi kompas berkembang mengikut keperluan",
    "Pelayaran, ibadah, dan operasi ketenteraan menggunakan reka bentuk kompas yang berbeza.",
  ],
  [
    "1.4",
    "Bearing menukar arah kepada nombor",
    "Bearing azimut diukur dari Utara mengikut arah pusingan jam dalam unit darjah.",
  ],
  [
    "1.4",
    "Bearing melebihi 180° memerlukan satu langkah tambahan",
    "Ukur dari Selatan, kemudian tambah 180° untuk memperoleh bearing penuh.",
  ],
  [
    "1.5",
    "Alat moden mempercepat navigasi",
    "Navigator, GPS, dan kompas digital menggabungkan arah dengan kedudukan semasa.",
  ],
  [
    "Ulang kaji",
    "Bina jawapan daripada titik rujukan",
    "Tentukan rujukan dahulu, pilih kaedah yang sesuai, kemudian nyatakan arah atau bearing.",
  ],
] as const;

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
      <p className="font-mono text-xs font-black uppercase tracking-[.18em] text-amber-300">
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
          className={`min-h-12 cursor-pointer rounded-xl border px-4 py-2 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 motion-reduce:transition-none ${selected === index ? "border-amber-300/50 bg-amber-300/15 text-amber-100" : "border-white/10 bg-slate-950/40 text-slate-300 hover:border-white/25"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function StepFlow({ steps }: { steps: { step: number; instruction: string }[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step) => (
        <Panel key={step.step}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-300/10 font-mono text-sm font-black text-amber-200">
            {step.step}
          </span>
          <p className="mt-3 text-sm leading-6 text-slate-300">{step.instruction}</p>
        </Panel>
      ))}
    </div>
  );
}

function CompassRose({ content }: { content: Geo1Content["compassDirections"]["directions"] }) {
  const byCode = Object.fromEntries(content.map((item) => [item.code, item]));
  const positions = [
    ["U", "left-1/2 top-2 -translate-x-1/2"],
    ["TL", "right-[12%] top-[15%]"],
    ["T", "right-2 top-1/2 -translate-y-1/2"],
    ["Tg", "bottom-[15%] right-[12%]"],
    ["S", "bottom-2 left-1/2 -translate-x-1/2"],
    ["BD", "bottom-[15%] left-[12%]"],
    ["B", "left-2 top-1/2 -translate-y-1/2"],
    ["BL", "left-[12%] top-[15%]"],
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md rounded-full border border-amber-300/30 bg-[radial-gradient(circle,rgba(251,191,36,.13),transparent_60%)]">
      <div className="absolute inset-[18%] rotate-45 border border-dashed border-amber-300/30" />
      <div className="absolute left-1/2 top-[12%] h-[76%] w-px -translate-x-1/2 bg-amber-300/35" />
      <div className="absolute left-[12%] top-1/2 h-px w-[76%] -translate-y-1/2 bg-amber-300/35" />
      <Compass
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-amber-300"
        aria-hidden="true"
      />
      {positions.map(([code, position]) => {
        const direction = byCode[code];
        return (
          <div
            key={code}
            className={`absolute ${position} min-w-14 rounded-xl border border-white/10 bg-[#111b2b] px-2 py-1 text-center shadow-lg`}
          >
            <p className="font-mono text-xs font-black text-amber-300">{code}</p>
            <p className="text-[11px] font-semibold text-white sm:text-xs">{direction.name}</p>
          </div>
        );
      })}
    </div>
  );
}

function BearingDial({ degree, label }: { degree: number; label: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-xs rounded-full border-2 border-cyan-300/35 bg-slate-950/55">
      <span className="absolute left-1/2 top-2 -translate-x-1/2 font-mono text-xs font-black text-cyan-200">
        U · 000°
      </span>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">
        090°
      </span>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-xs text-slate-400">
        180°
      </span>
      <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">
        270°
      </span>
      <div
        className="absolute left-1/2 top-1/2 h-[39%] w-1 origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-gradient-to-t from-cyan-300 to-amber-300"
        style={{ transform: `translate(-50%, -100%) rotate(${degree}deg)` }}
      >
        <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-amber-300" />
      </div>
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 rounded-full bg-cyan-300/10 px-3 py-1 text-center">
        <p className="font-mono text-lg font-black text-cyan-200">
          {String(degree).padStart(3, "0")}°
        </p>
        <p className="text-[10px] text-slate-400">{label}</p>
      </div>
    </div>
  );
}

export function GeoChapter1NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo1Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const [directionType, setDirectionType] = useState(0);
  const [compassPart, setCompassPart] = useState(0);
  const [historyItem, setHistoryItem] = useState(0);
  const [bearingMode, setBearingMode] = useState(0);
  const [modernTool, setModernTool] = useState(0);
  const directions = content.compassDirections.directions.filter(
    (item) => item.type === (directionType === 0 ? "utama" : "perantaraan"),
  );
  const selectedPart = content.compassMethod.parts[compassPart];
  const selectedHistory = content.compassMethod.historyFacts[historyItem];
  const selectedTool = content.modernNavigation.tools[modernTool];
  const ToolIcon = [Smartphone, Satellite, Compass][modernTool];

  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-amber-300/15 bg-[#08111f] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-amber-300">
            <Compass className="h-6 w-6" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 1
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Arah: daripada matahari kepada bearing
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              ["1.1", "Mata angin"],
              ["1.2", "Matahari"],
              ["1.3", "Kompas"],
              ["1.4", "Bearing"],
              ["1.5", "Alat moden"],
            ].map(([number, label]) => (
              <span
                key={number}
                className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-slate-300"
              >
                <strong className="text-amber-200">{number}</strong> · {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-14 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section className="space-y-6">
          <SectionHeading section={sections[0]} />
          <p className="max-w-3xl text-sm leading-6 text-slate-300">
            {content.compassDirections.definition}
          </p>
          <div className="grid items-center gap-7 lg:grid-cols-[1.1fr_.9fr]">
            <CompassRose content={content.compassDirections.directions} />
            <div>
              <Tabs
                labels={["Arah utama", "Arah perantaraan"]}
                selected={directionType}
                onSelect={setDirectionType}
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-2" role="tabpanel">
                {directions.map((item) => (
                  <Panel key={item.code}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-300/10 font-mono text-sm font-black text-amber-200">
                        {item.code}
                      </span>
                      <div>
                        <h3 className="font-bold text-white">{item.name}</h3>
                        <p className="mt-1 text-xs leading-5 text-slate-400">{item.note}</p>
                      </div>
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          </div>
          <Panel className="border-cyan-300/20">
            <div className="flex items-center gap-3">
              <Orbit className="h-6 w-6 text-cyan-300" />
              <h3 className="font-bold text-white">Navigasi semula jadi</h3>
            </div>
            <div className="mt-4">
              <Checklist items={content.compassDirections.naturalNavigationFacts} />
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <Panel className="border-orange-300/20 bg-gradient-to-br from-orange-300/10 to-amber-300/[0.04]">
            <div className="flex items-start gap-4">
              <Sun className="h-8 w-8 shrink-0 text-amber-300" />
              <p className="text-sm leading-7 text-slate-200">{content.sunMethod.whyItWorks}</p>
            </div>
          </Panel>
          <div className="grid gap-4 lg:grid-cols-4">
            {content.sunMethod.steps.map((step, index) => (
              <Panel key={step.step} className="relative">
                <span className="font-mono text-xs font-black text-amber-300">
                  LANGKAH {step.step}
                </span>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.instruction}</p>
                {index < content.sunMethod.steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 text-amber-300 lg:block" />
                )}
              </Panel>
            ))}
            <Panel className="border-cyan-300/20">
              <LocateFixed className="h-6 w-6 text-cyan-300" />
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Dengan empat arah utama ini, kenal pasti juga TL, Tg, BD dan BL.
              </p>
            </Panel>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <Panel>
              <p className="text-xs font-black text-amber-300">HADAPAN</p>
              <p className="mt-1 font-bold text-white">Timur</p>
            </Panel>
            <Panel>
              <p className="text-xs font-black text-amber-300">BELAKANG</p>
              <p className="mt-1 font-bold text-white">Barat</p>
            </Panel>
            <Panel>
              <p className="text-xs font-black text-amber-300">TANGAN KIRI</p>
              <p className="mt-1 font-bold text-white">Utara</p>
            </Panel>
            <Panel>
              <p className="text-xs font-black text-amber-300">TANGAN KANAN</p>
              <p className="mt-1 font-bold text-white">Selatan</p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <Panel>
              <div className="mx-auto flex aspect-square max-w-xs items-center justify-center rounded-full border-[10px] border-slate-700 bg-slate-950/70 shadow-[inset_0_0_35px_rgba(251,191,36,.12)]">
                <div className="relative h-4/5 w-4/5 rounded-full border border-amber-300/30">
                  <span className="absolute left-1/2 top-2 -translate-x-1/2 font-black text-rose-300">
                    U
                  </span>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-black text-slate-400">
                    S
                  </span>
                  <div className="absolute left-1/2 top-1/2 h-[42%] w-2 origin-bottom -translate-x-1/2 -translate-y-full bg-gradient-to-t from-white to-rose-400 [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300" />
                </div>
              </div>
              <p className="mt-4 text-center text-sm leading-6 text-slate-300">
                {content.compassMethod.whyNeedlePointsNorth}
              </p>
            </Panel>
            <div>
              <h3 className="font-bold text-white">Bahagian kompas magnetik</h3>
              <div className="mt-4">
                <Tabs
                  labels={content.compassMethod.parts.map((item) => item.name)}
                  selected={compassPart}
                  onSelect={setCompassPart}
                />
              </div>
              <Panel className="mt-4">
                <div role="tabpanel">
                  <Crosshair className="h-7 w-7 text-amber-300" />
                  <h4 className="mt-3 text-xl font-black text-white">{selectedPart.name}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{selectedPart.function}</p>
                </div>
              </Panel>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {content.compassMethod.definition}
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-white">Cara menggunakan kompas dengan betul</h3>
            <StepFlow steps={content.compassMethod.orientationSteps} />
          </div>
          <Panel className="border-rose-300/25 bg-rose-300/[0.06]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-rose-300" />
              <div>
                <h3 className="font-bold text-rose-200">Elakkan gangguan magnet</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {content.compassMethod.interferenceWarning}
                </p>
              </div>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <Tabs
            labels={content.compassMethod.historyFacts.map((item) => item.origin)}
            selected={historyItem}
            onSelect={setHistoryItem}
          />
          <Panel className="border-violet-300/20">
            <div role="tabpanel" className="flex items-start gap-4">
              <History className="h-8 w-8 shrink-0 text-violet-300" />
              <div>
                <h3 className="text-xl font-black text-white">{selectedHistory.origin}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{selectedHistory.fact}</p>
              </div>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[4]} />
          <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
            <Panel>
              <div className="flex items-center gap-3">
                <Gauge className="h-7 w-7 text-cyan-300" />
                <h3 className="font-bold text-white">Maksud bearing sudutan</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{content.bearing.definition}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-cyan-300/10 p-3">
                  <p className="text-xs text-slate-400">Unit</p>
                  <p className="mt-1 font-black text-cyan-200">{content.bearing.unit}</p>
                </div>
                <div className="rounded-xl bg-cyan-300/10 p-3">
                  <p className="text-xs text-slate-400">Mula</p>
                  <p className="mt-1 font-black text-cyan-200">Utara · 000°</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {content.bearing.etymologyNote}
              </p>
            </Panel>
            <BearingDial degree={120} label="Y dari X" />
          </div>
          <div>
            <h3 className="mb-4 font-bold text-white">Mengukur bearing kurang daripada 180°</h3>
            <StepFlow steps={content.bearing.basicMethodSteps} />
          </div>
          <Panel className="border-cyan-300/20">
            <div className="flex items-center gap-3 text-cyan-200">
              <RotateCw className="h-6 w-6" />
              <p className="font-bold">Utara (000°) → ikut arah pusingan jam → garisan objek</p>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[5]} />
          <Tabs
            labels={["Kurang daripada 180°", "Lebih daripada 180°"]}
            selected={bearingMode}
            onSelect={setBearingMode}
          />
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <BearingDial
              degree={bearingMode === 0 ? 120 : 300}
              label={bearingMode === 0 ? "Y dari X" : "P dari Q"}
            />
            <div role="tabpanel">
              {bearingMode === 0 ? (
                <StepFlow steps={content.bearing.basicMethodSteps.slice(0, 3)} />
              ) : (
                <div className="space-y-4">
                  <StepFlow steps={content.bearing.over180Rule.steps} />
                  <Panel className="border-amber-300/20">
                    <p className="font-mono text-lg font-black text-amber-200">
                      180° + 120° = 300°
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      {content.bearing.over180Rule.example}
                    </p>
                  </Panel>
                </div>
              )}
            </div>
          </div>
          <Panel className="border-rose-300/25 bg-rose-300/[0.06]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-rose-300" />
              <p className="text-sm leading-6 text-rose-100">
                {content.bearing.commonMistakeWarning}
              </p>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[6]} />
          <p className="max-w-3xl text-sm leading-6 text-slate-300">
            {content.modernNavigation.introduction}
          </p>
          <Tabs
            labels={content.modernNavigation.tools.map((item) => item.name)}
            selected={modernTool}
            onSelect={setModernTool}
          />
          <Panel className="border-cyan-300/20">
            <div role="tabpanel" className="mx-auto max-w-2xl text-center">
              <ToolIcon className="mx-auto h-10 w-10 text-cyan-300" />
              <h3 className="mt-4 text-xl font-black text-white">{selectedTool.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{selectedTool.use}</p>
            </div>
          </Panel>
          <div className="grid gap-3 md:grid-cols-3">
            {content.modernNavigation.tools.map((tool, index) => {
              const Icon = [Smartphone, Satellite, Compass][index];
              return (
                <Panel key={tool.name}>
                  <Icon className="h-6 w-6 text-cyan-300" />
                  <h4 className="mt-3 font-bold text-white">{tool.name}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{tool.use}</p>
                </Panel>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[7]} />
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <Check className="h-6 w-6 text-emerald-300" />
                <h3 className="font-bold text-white">Fakta skor tinggi</h3>
              </div>
              <div className="mt-4">
                <Checklist items={content.keyExamFacts} />
              </div>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-300" />
                <h3 className="font-bold text-white">Ingatan aktif</h3>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  [
                    "Mengapa matahari boleh digunakan untuk menentukan arah?",
                    content.sunMethod.whyItWorks,
                  ],
                  [
                    "Mengapa kompas perlu dijauhkan daripada objek besi?",
                    content.compassMethod.interferenceWarning,
                  ],
                  [
                    "Bagaimanakah bearing 300° diperoleh?",
                    "Ukur 120° dari arah Selatan mengikut arah pusingan jam, kemudian tambah 180°: 180° + 120° = 300°.",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none">
                      <span>{question}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-amber-300 transition group-open:rotate-180 motion-reduce:transition-none" />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel className="border-amber-300/25 bg-gradient-to-br from-amber-300/10 to-cyan-300/10">
            <div className="flex items-start gap-3">
              <Map className="mt-1 h-6 w-6 shrink-0 text-amber-300" />
              <div>
                <h3 className="font-bold text-amber-200">Rumusan bab</h3>
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
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-amber-300 to-cyan-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? "Bab 1 telah selesai" : "Tandakan Bab 1 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
