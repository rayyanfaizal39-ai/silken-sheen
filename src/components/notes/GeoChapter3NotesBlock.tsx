import { useState, type ReactNode } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  Circle,
  Compass,
  Factory,
  Frame,
  Landmark,
  Lightbulb,
  List,
  Map,
  MapPin,
  Minus,
  Mountain,
  PencilRuler,
  Route,
  School,
  Search,
  Shapes,
  Square,
  Trees,
  Type,
  Waves,
  Wheat,
} from "lucide-react";
import type { Geo3Content } from "@/content/form1/geography/chapter-3/geo3-content";

const sections = [
  [
    "3.1",
    "Peta lakar menukarkan kawasan sebenar kepada bahasa visual",
    "Pandangan atas, simbol, dan singkatan memudahkan ciri geografi dibaca dengan cepat.",
  ],
  [
    "3.1",
    "Lima ciri menjadikan peta lakar lengkap",
    "Tajuk, pemidang, arah Utara, simbol, dan petunjuk masing-masing mempunyai fungsi khusus.",
  ],
  [
    "3.2",
    "Empat jenis simbol mewakili bentuk yang berbeza",
    "Pilih simbol berdasarkan sama ada ciri itu berupa tapak, laluan, kawasan, atau nama ringkas.",
  ],
  [
    "3.2",
    "Singkatan menjimatkan ruang tanpa menghilangkan makna",
    "Huruf ringkas mesti konsisten dan diterangkan melalui petunjuk.",
  ],
  [
    "3.3",
    "Pandang darat fizikal dan budaya menceritakan asal ciri",
    "Ciri semula jadi terbentuk tanpa campur tangan manusia; ciri budaya dibina melalui aktiviti manusia.",
  ],
  [
    "3.4",
    "Peta lakar yang baik bermula sebelum pensel menyentuh kertas",
    "Tinjauan kawasan menentukan ciri, kedudukan, simbol, dan petunjuk yang diperlukan.",
  ],
  [
    "Aplikasi",
    "Semak peta seperti seorang ahli geografi",
    "Pastikan setiap simbol mempunyai makna, setiap ciri berada di lokasi tepat, dan semua unsur wajib hadir.",
  ],
  [
    "Ulang kaji",
    "Kenal pasti bentuk, asal, dan fungsi",
    "Untuk setiap ciri, tentukan jenis simbol, pandang darat, dan sebab pemilihannya.",
  ],
] as const;

const characteristicIcons = [Type, Frame, Compass, Shapes, List];
const symbolIcons = [Circle, Minus, Square, Type];

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
          className={`min-h-12 cursor-pointer rounded-xl border px-4 py-2 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 motion-reduce:transition-none ${selected === index ? "border-lime-300/50 bg-lime-300/15 text-lime-100" : "border-white/10 bg-slate-950/40 text-slate-300 hover:border-white/25"}`}
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

function SketchMapDiagram() {
  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl border-4 border-slate-500/60 bg-[#172638] p-4 shadow-[inset_0_0_50px_rgba(0,0,0,.25)]"
      aria-label="Contoh peta lakar lengkap dengan tajuk, pemidang, arah Utara, simbol dan petunjuk"
    >
      <p className="text-center text-xs font-black uppercase tracking-wider text-white sm:text-sm">
        Peta Lakar Kampung Sejati
      </p>
      <div className="absolute left-[8%] top-[18%] h-[18%] w-[28%] rounded-[50%] border border-lime-300/50 bg-lime-300/10">
        <Trees className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-lime-300" />
      </div>
      <div className="absolute left-[40%] top-[12%] h-[75%] w-3 rotate-[18deg] rounded-full bg-cyan-400/40">
        <Waves className="absolute -left-3 top-1/2 h-6 w-6 text-cyan-300" />
      </div>
      <div className="absolute bottom-[18%] left-[8%] h-[16%] w-[30%] border border-dashed border-amber-300/50 bg-amber-300/10">
        <Wheat className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-amber-300" />
      </div>
      <div className="absolute right-[25%] top-[24%] flex gap-2">
        <Building2 className="h-6 w-6 text-orange-300" />
        <Building2 className="h-6 w-6 text-orange-300" />
      </div>
      <div className="absolute bottom-[18%] right-[32%]">
        <School className="h-7 w-7 text-violet-300" />
        <span className="text-[9px] font-bold text-white">Sek.</span>
      </div>
      <div className="absolute left-[4%] top-1/2 h-2 w-[90%] -rotate-6 bg-slate-300/35">
        <Route className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-200" />
      </div>
      <div className="absolute right-3 top-12 text-center">
        <Compass className="mx-auto h-7 w-7 text-rose-300" />
        <span className="text-[10px] font-black text-white">U</span>
      </div>
      <div className="absolute bottom-2 right-2 w-[28%] rounded-lg border border-white/20 bg-slate-950/75 p-2 text-[8px] text-slate-200 sm:text-[10px]">
        <p className="font-black text-lime-200">PETUNJUK</p>
        <p>Hijau = Hutan</p>
        <p>Biru = Sungai</p>
        <p>Kuning = Sawah</p>
      </div>
    </div>
  );
}

function SymbolPreview({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="flex h-20 items-center justify-center">
        <MapPin className="h-10 w-10 text-rose-300" />
      </div>
    );
  if (index === 1)
    return (
      <div className="flex h-20 items-center justify-center">
        <div className="h-2 w-4/5 rounded-full bg-cyan-300/70" />
      </div>
    );
  if (index === 2)
    return (
      <div className="flex h-20 items-center justify-center">
        <div className="grid h-16 w-4/5 grid-cols-4 gap-1 rounded-lg border border-lime-300/40 bg-lime-300/10 p-2">
          {Array.from({ length: 12 }).map((_, item) => (
            <span key={item} className="rounded-sm bg-lime-300/35" />
          ))}
        </div>
      </div>
    );
  return (
    <div className="flex h-20 items-center justify-center font-mono text-3xl font-black text-amber-200">
      Sek.
    </div>
  );
}

export function GeoChapter3NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo3Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const [characteristic, setCharacteristic] = useState(0);
  const [symbolType, setSymbolType] = useState(0);
  const [landscape, setLandscape] = useState(0);
  const selectedCharacteristic = content.characteristics[characteristic];
  const CharacteristicIcon = characteristicIcons[characteristic];
  const selectedSymbol = content.symbols.types[symbolType];
  const selectedLandscape =
    landscape === 0 ? content.landscapes.physical : content.landscapes.cultural;

  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-lime-300/15 bg-[#09131c] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-lime-300">
            <Map className="h-6 w-6" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 3
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Peta lakar: membaca kawasan melalui simbol
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              ["3.1", "Ciri peta"],
              ["3.2", "Simbol"],
              ["3.3", "Pandang darat"],
              ["3.4", "Melukis peta"],
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
          <div className="grid gap-5 lg:grid-cols-[.75fr_1.25fr]">
            <div className="space-y-4">
              <Panel>
                <Map className="h-7 w-7 text-lime-300" />
                <h3 className="mt-3 font-bold text-white">Maksud peta lakar</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {content.definition.meaning}
                </p>
              </Panel>
              <Panel className="border-cyan-300/20">
                <Shapes className="h-7 w-7 text-cyan-300" />
                <h3 className="mt-3 font-bold text-white">Mengapa simbol digunakan?</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {content.definition.purpose}
                </p>
              </Panel>
            </div>
            <SketchMapDiagram />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <Panel>
              <p className="text-xs font-black uppercase tracking-wider text-lime-300">Pandangan</p>
              <p className="mt-2 font-bold text-white">Dari atas</p>
            </Panel>
            <Panel>
              <p className="text-xs font-black uppercase tracking-wider text-lime-300">Liputan</p>
              <p className="mt-2 font-bold text-white">Kawasan berskala besar</p>
            </Panel>
            <Panel>
              <p className="text-xs font-black uppercase tracking-wider text-lime-300">Bahasa</p>
              <p className="mt-2 font-bold text-white">Simbol dan singkatan</p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <Tabs
            labels={content.characteristics.map((item) => item.name)}
            selected={characteristic}
            onSelect={setCharacteristic}
          />
          <Panel className="border-lime-300/20">
            <div className="grid items-center gap-5 sm:grid-cols-[auto_1fr]" role="tabpanel">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-300/10">
                <CharacteristicIcon className="h-8 w-8 text-lime-300" />
              </div>
              <div>
                <p className="font-mono text-xs font-black text-lime-300">
                  CIRI {selectedCharacteristic.num} / 5
                </p>
                <h3 className="mt-1 text-xl font-black text-white">
                  {selectedCharacteristic.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedCharacteristic.description}
                </p>
              </div>
            </div>
          </Panel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {content.characteristics.map((item, index) => {
              const Icon = characteristicIcons[index];
              return (
                <Panel key={item.name}>
                  <Icon className="h-6 w-6 text-lime-300" />
                  <p className="mt-3 font-bold text-white">{item.name}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{item.description}</p>
                </Panel>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <p className="max-w-3xl text-sm leading-6 text-slate-300">{content.symbols.definition}</p>
          <Tabs
            labels={content.symbols.types.map((item) => item.type)}
            selected={symbolType}
            onSelect={setSymbolType}
          />
          <Panel className="border-cyan-300/20">
            <div className="grid gap-5 lg:grid-cols-[.55fr_1.45fr]" role="tabpanel">
              <div className="rounded-xl bg-slate-950/45 p-4">
                <SymbolPreview index={symbolType} />
                <h3 className="text-center text-lg font-black text-white">{selectedSymbol.type}</h3>
                <p className="mt-2 text-center text-sm leading-6 text-slate-300">
                  {selectedSymbol.description}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white">Contoh pada peta</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedSymbol.examples.map((example) => (
                    <span
                      key={example}
                      className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-2 text-xs font-bold text-cyan-100"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Panel>
          <div className="grid gap-4 md:grid-cols-4">
            {content.symbols.types.map((item, index) => {
              const Icon = symbolIcons[index];
              return (
                <Panel key={item.type}>
                  <Icon className="h-6 w-6 text-cyan-300" />
                  <h3 className="mt-3 font-bold text-white">{item.type}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                </Panel>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            {content.symbols.abbreviations.map((item) => (
              <div
                key={item.short}
                className="rounded-xl border border-white/10 bg-slate-950/45 p-3"
              >
                <p className="font-mono text-lg font-black text-amber-200">{item.short}</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{item.full}</p>
              </div>
            ))}
          </div>
          <Panel className="border-amber-300/20">
            <div className="flex items-start gap-3">
              <Type className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
              <div>
                <h3 className="font-bold text-amber-200">Peraturan singkatan</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Gunakan singkatan yang mudah dibaca, letakkan pada kedudukan ciri sebenar, dan
                  terangkan maksudnya dalam petunjuk peta.
                </p>
              </div>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[4]} />
          <p className="max-w-3xl text-sm leading-6 text-slate-300">
            {content.landscapes.definition}
          </p>
          <Tabs
            labels={["Pandang darat fizikal", "Pandang darat budaya"]}
            selected={landscape}
            onSelect={setLandscape}
          />
          <div className="grid gap-5 lg:grid-cols-[.65fr_1.35fr]" role="tabpanel">
            <Panel className={landscape === 0 ? "border-lime-300/20" : "border-orange-300/20"}>
              {landscape === 0 ? (
                <Mountain className="h-9 w-9 text-lime-300" />
              ) : (
                <Building2 className="h-9 w-9 text-orange-300" />
              )}
              <h3 className="mt-4 text-xl font-black capitalize text-white">
                Pandang darat {selectedLandscape.category}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {landscape === 0
                  ? "Ciri semula jadi yang wujud tanpa campur tangan manusia."
                  : "Ciri buatan manusia hasil penerokaan dan pembangunan alam sekitar."}
              </p>
            </Panel>
            <div className="grid gap-4 sm:grid-cols-2">
              {selectedLandscape.groups.map((group) => (
                <Panel key={group.name}>
                  <h3
                    className={`font-bold ${landscape === 0 ? "text-lime-200" : "text-orange-200"}`}
                  >
                    {group.name}
                  </h3>
                  <div className="mt-3">
                    <Checklist items={group.examples} />
                  </div>
                </Panel>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <Trees className="h-6 w-6 text-lime-300" />
                <h3 className="font-bold text-white">Fizikal = semula jadi</h3>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Gunung · sungai · tasik · hutan · paya bakau
              </p>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <Factory className="h-6 w-6 text-orange-300" />
                <h3 className="font-bold text-white">Budaya = buatan manusia</h3>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Petempatan · jalan · sawah · kilang · sekolah
              </p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[5]} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.drawingSteps.map((step) => (
              <Panel key={step.step}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300/10 font-mono text-sm font-black text-lime-200">
                  {step.step}
                </span>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.instruction}</p>
              </Panel>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Panel>
              <Search className="h-7 w-7 text-cyan-300" />
              <h3 className="mt-3 font-bold text-white">1 · Tinjau</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Catat ciri dan kedudukan sebenar sebelum melukis.
              </p>
            </Panel>
            <Panel>
              <PencilRuler className="h-7 w-7 text-amber-300" />
              <h3 className="mt-3 font-bold text-white">2–5 · Bina</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Sediakan pemidang, simbol, ciri dan arah Utara.
              </p>
            </Panel>
            <Panel>
              <List className="h-7 w-7 text-lime-300" />
              <h3 className="mt-3 font-bold text-white">6 · Jelaskan</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Padankan semua simbol dengan maksud dalam petunjuk.
              </p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[6]} />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <SketchMapDiagram />
            <Panel>
              <h3 className="font-bold text-white">Senarai semak peta lengkap</h3>
              <div className="mt-4">
                <Checklist
                  items={[
                    "Tajuk menyatakan kawasan",
                    "Pemidang mengepung peta",
                    "Arah Utara ditunjukkan",
                    "Simbol sesuai dengan bentuk ciri",
                    "Ciri fizikal dan budaya berada pada kedudukan betul",
                    "Petunjuk menerangkan setiap simbol",
                  ]}
                />
              </div>
            </Panel>
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
                    "Apakah lima ciri peta lakar lengkap?",
                    "Tajuk, pemidang, arah mata angin, simbol, dan petunjuk.",
                  ],
                  [
                    "Bilakah simbol titik digunakan?",
                    "Untuk tempat, tapak, atau nilai pada satu lokasi tertentu seperti masjid, kilang, stesen trigonometri dan tanda aras.",
                  ],
                  [
                    "Mengapa sawah padi ialah pandang darat budaya?",
                    "Sawah diwujudkan dan diusahakan oleh manusia sebagai kegiatan ekonomi, walaupun melibatkan tumbuhan.",
                  ],
                  [
                    "Mengapa tinjauan dibuat sebelum melukis?",
                    "Tinjauan mengumpul maklumat tentang jenis ciri dan kedudukan sebenar supaya peta lakar tepat.",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none">
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
              <Landmark className="mt-1 h-6 w-6 shrink-0 text-lime-300" />
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
                {isRead ? "Bab 3 telah selesai" : "Tandakan Bab 3 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
