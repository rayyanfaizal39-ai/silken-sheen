import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleDot,
  Database,
  Grid3X3,
  Lightbulb,
  LocateFixed,
  Map,
  MapPin,
  Navigation,
  Satellite,
  ScanLine,
  Sparkles,
  Users,
} from "lucide-react";
import type {
  Geo2Content,
  RelativePositionExample,
} from "@/content/form1/geography/chapter-2/geo2-content";

const sections = [
  [
    "2.1",
    "Kedudukan relatif berubah bersama titik rujukan",
    "Hadapan, belakang, kiri, dan kanan hanya bermakna apabila rujukannya jelas.",
  ],
  [
    "2.1",
    "Rujukan berfungsi di kelas dan di lapangan",
    "Murid, bangunan, dan mercu tanda boleh menjadi pusat perbandingan.",
  ],
  [
    "2.2",
    "Latitud mengukur kedudukan Utara–Selatan",
    "Garisan melintang yang selari diukur dari Khatulistiwa hingga ke kutub.",
  ],
  [
    "2.2",
    "Longitud mengukur kedudukan Timur–Barat",
    "Garisan menegak menghubungkan kedua-dua kutub dan berpusat pada Meridian Greenwich.",
  ],
  [
    "2.3",
    "Persilangan menghasilkan kedudukan mutlak",
    "Baca latitud dahulu, kemudian longitud, supaya setiap lokasi mempunyai koordinat unik.",
  ],
  [
    "2.3",
    "Atlas memerlukan anggaran antara garisan",
    "Bahagikan sela utama kepada bahagian sekata untuk mendapatkan darjah yang lebih kecil.",
  ],
  [
    "2.4",
    "GPS menentukan lokasi; GIS memahami lokasi",
    "Satelit menghasilkan koordinat, manakala data spatial diproses untuk melihat pola dan hubungan.",
  ],
  [
    "Ulang kaji",
    "Pilih jenis kedudukan yang betul",
    "Gunakan rujukan untuk kedudukan relatif dan koordinat untuk kedudukan mutlak.",
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
      <p className="font-mono text-xs font-black uppercase tracking-[.18em] text-emerald-300">
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
          className={`min-h-12 cursor-pointer rounded-xl border px-4 py-2 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 motion-reduce:transition-none ${selected === index ? "border-emerald-300/50 bg-emerald-300/15 text-emerald-100" : "border-white/10 bg-slate-950/40 text-slate-300 hover:border-white/25"}`}
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

function StepFlow({ steps }: { steps: { step: number; instruction: string }[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {steps.map((step) => (
        <Panel key={step.step}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-300/10 font-mono text-sm font-black text-emerald-200">
            {step.step}
          </span>
          <p className="mt-3 text-sm leading-6 text-slate-300">{step.instruction}</p>
        </Panel>
      ))}
    </div>
  );
}

function RelativePositionMap({
  reference,
  positions,
}: {
  reference: string;
  positions: RelativePositionExample[];
}) {
  const item = (direction: RelativePositionExample["direction"]) =>
    positions.find((position) => position.direction === direction);
  return (
    <div
      className="mx-auto grid w-full max-w-lg grid-cols-3 grid-rows-3 gap-3"
      aria-label={`Kedudukan relatif dengan ${reference} sebagai titik rujukan`}
    >
      <div />
      <PositionCard item={item("hadapan")} label="Hadapan" />
      <div />
      <PositionCard item={item("kiri")} label="Kiri" />
      <div className="flex min-h-28 flex-col items-center justify-center rounded-2xl border-2 border-emerald-300/50 bg-emerald-300/15 p-3 text-center">
        <LocateFixed className="h-6 w-6 text-emerald-300" />
        <p className="mt-2 text-xs font-black uppercase tracking-wider text-emerald-200">
          Titik rujukan
        </p>
        <p className="mt-1 font-black text-white">{reference}</p>
      </div>
      <PositionCard item={item("kanan")} label="Kanan" />
      <div />
      <PositionCard item={item("belakang")} label="Belakang" />
      <div />
    </div>
  );
}

function PositionCard({ item, label }: { item?: RelativePositionExample; label: string }) {
  return (
    <div className="flex min-h-24 flex-col items-center justify-center rounded-xl border border-white/10 bg-slate-950/45 p-2 text-center">
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-white">{item?.person ?? "—"}</p>
    </div>
  );
}

function GlobeDiagram({
  mode,
  lines,
}: {
  mode: "latitud" | "longitud";
  lines: Geo2Content["latitude"]["mainLines"];
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full border-2 border-cyan-300/40 bg-[radial-gradient(circle_at_35%_30%,rgba(103,232,249,.25),rgba(14,116,144,.12)_45%,rgba(2,6,23,.7)_75%)] shadow-[0_0_45px_rgba(34,211,238,.12)]">
      {mode === "latitud" ? (
        <>
          {[18, 30, 40, 50, 60, 70, 82].map((top, index) => (
            <div
              key={top}
              className={`absolute left-[8%] w-[84%] rounded-[50%] border ${index === 3 ? "border-amber-300" : "border-cyan-200/35"}`}
              style={{ top: `${top}%`, height: `${Math.max(5, 18 - Math.abs(3 - index) * 3)}%` }}
            />
          ))}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/15 px-3 py-1 text-xs font-black text-amber-200">
            Khatulistiwa 0°
          </span>
        </>
      ) : (
        <>
          {[18, 34, 50, 66, 82].map((left, index) => (
            <div
              key={left}
              className={`absolute top-[6%] h-[88%] rounded-[50%] border ${index === 2 ? "border-amber-300" : "border-cyan-200/35"}`}
              style={{
                left: `${left}%`,
                width: `${Math.max(5, 22 - Math.abs(2 - index) * 5)}%`,
                transform: "translateX(-50%)",
              }}
            />
          ))}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/15 px-3 py-1 text-center text-xs font-black text-amber-200">
            Meridian Pangkal 0°
          </span>
        </>
      )}
      <span className="sr-only">
        {mode === "latitud"
          ? lines.map((line) => `${line.name} ${line.value}`).join(", ")
          : "Garisan longitud dari Kutub Utara ke Kutub Selatan"}
      </span>
    </div>
  );
}

function CoordinateGrid({
  point,
  latitude,
  longitude,
}: {
  point: string;
  latitude: string;
  longitude: string;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm rounded-2xl border border-cyan-300/25 bg-[linear-gradient(rgba(103,232,249,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,.16)_1px,transparent_1px)] bg-[size:20%_20%]">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 font-mono text-xs font-black text-cyan-200">
        LATITUD {latitude}
      </span>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-xs font-black text-cyan-200">
        LONGITUD {longitude}
      </span>
      <div className="absolute left-[62%] top-[38%] -translate-x-1/2 -translate-y-1/2 text-center">
        <MapPin className="mx-auto h-9 w-9 fill-amber-300/20 text-amber-300" />
        <span className="rounded-full bg-amber-300/15 px-2 py-1 text-xs font-black text-amber-100">
          Titik {point}
        </span>
      </div>
    </div>
  );
}

export function GeoChapter2NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo2Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const [referenceMode, setReferenceMode] = useState(0);
  const [practice, setPractice] = useState(0);
  const [earthLine, setEarthLine] = useState(0);
  const [technology, setTechnology] = useState(0);
  const referenceData =
    referenceMode === 0
      ? { referencePoint: "Siti", positions: content.relativePosition.classroomExamples }
      : content.relativePosition.fieldExample;
  const practiceData = content.relativePosition.classroomPractice[practice];

  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-emerald-300/15 bg-[#07121a] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-emerald-300">
            <MapPin className="h-6 w-6" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 2
            </p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Kedudukan: daripada rujukan kepada koordinat
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              ["2.1", "Relatif"],
              ["2.2", "Latitud"],
              ["2.2", "Longitud"],
              ["2.3", "Koordinat"],
              ["2.4", "GPS & GIS"],
            ].map(([number, label]) => (
              <span
                key={`${number}-${label}`}
                className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-slate-300"
              >
                <strong className="text-emerald-200">{number}</strong> · {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-14 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section className="space-y-6">
          <SectionHeading section={sections[0]} />
          <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
            <Panel>
              <Users className="h-7 w-7 text-emerald-300" />
              <h3 className="mt-3 font-bold text-white">Maksud kedudukan relatif</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {content.relativePosition.definition}
              </p>
              <p className="mt-4 rounded-xl bg-emerald-300/[0.07] p-3 text-sm leading-6 text-emerald-100">
                {content.relativePosition.referencePointNote}
              </p>
            </Panel>
            <RelativePositionMap
              reference="Siti"
              positions={content.relativePosition.classroomExamples}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {["hadapan", "belakang", "kiri", "kanan"].map((direction) => (
              <Panel key={direction} className="text-center">
                <Navigation
                  className={`mx-auto h-6 w-6 text-cyan-300 ${direction === "belakang" ? "rotate-180" : direction === "kiri" ? "-rotate-90" : direction === "kanan" ? "rotate-90" : ""}`}
                />
                <p className="mt-2 font-bold capitalize text-white">{direction}</p>
              </Panel>
            ))}
          </div>
          <Panel className="border-amber-300/20">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
              <p className="text-sm leading-6 text-slate-300">
                {content.relativePosition.changingReferencePointNote}
              </p>
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <Tabs
            labels={["Dalam kelas · Siti", "Di lapangan · Masjid"]}
            selected={referenceMode}
            onSelect={setReferenceMode}
          />
          <div role="tabpanel">
            <RelativePositionMap
              reference={referenceData.referencePoint}
              positions={referenceData.positions}
            />
          </div>
          <div>
            <h3 className="mb-4 font-bold text-white">
              Tukar titik rujukan dan lihat kedudukan berubah
            </h3>
            <Tabs
              labels={content.relativePosition.classroomPractice.map((item) => item.referencePoint)}
              selected={practice}
              onSelect={setPractice}
            />
            <Panel className="mt-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="tabpanel">
                {practiceData.positions.map((position) => (
                  <div key={position.person} className="rounded-xl bg-slate-950/40 p-3">
                    <p className="font-bold text-white">{position.person}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{position.relation}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <div className="grid items-center gap-7 lg:grid-cols-2">
            <GlobeDiagram mode="latitud" lines={content.latitude.mainLines} />
            <div>
              <p className="text-sm leading-7 text-slate-300">{content.latitude.definition}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{content.latitude.valueRange}</p>
              <Panel className="mt-4 border-amber-300/20">
                <h3 className="font-bold text-amber-200">Garisan Khatulistiwa · 0°</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {content.latitude.equatorNote}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {content.latitude.equatorLengthFact}
                </p>
              </Panel>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-white">Garisan latitud utama</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {content.latitude.mainLines
                .filter((line) => !line.name.includes("Kutub"))
                .map((line) => (
                  <Panel
                    key={line.name}
                    className={line.value === "0°" ? "border-amber-300/25" : ""}
                  >
                    <p className="font-mono text-lg font-black text-cyan-200">{line.value}</p>
                    <p className="mt-1 text-sm font-bold text-white">{line.name}</p>
                  </Panel>
                ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <Tabs labels={["Latitud", "Longitud"]} selected={earthLine} onSelect={setEarthLine} />
          <div className="grid items-center gap-7 lg:grid-cols-2" role="tabpanel">
            <GlobeDiagram
              mode={earthLine === 0 ? "latitud" : "longitud"}
              lines={content.latitude.mainLines}
            />
            {earthLine === 0 ? (
              <Panel>
                <h3 className="font-bold text-white">Latitud</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {content.latitude.definition}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Mengukur kedudukan dari 0° hingga 90°U atau 90°S.
                </p>
              </Panel>
            ) : (
              <div className="space-y-4">
                <Panel>
                  <h3 className="font-bold text-white">Longitud</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {content.longitude.definition}
                  </p>
                </Panel>
                <Panel className="border-amber-300/20">
                  <h3 className="font-bold text-amber-200">Garisan Meridian Pangkal · 0°</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {content.longitude.primeMeridian}
                  </p>
                </Panel>
                <Panel className="border-violet-300/20">
                  <h3 className="font-bold text-violet-200">
                    Garisan Tarikh Antarabangsa · 180°T/B
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {content.longitude.internationalDateLine}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {content.longitude.dateLineTimeNote}
                  </p>
                </Panel>
              </div>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel>
              <p className="text-xs font-black uppercase tracking-wider text-cyan-300">Latitud</p>
              <p className="mt-2 font-bold text-white">Melintang · Utara / Selatan</p>
            </Panel>
            <Panel>
              <p className="text-xs font-black uppercase tracking-wider text-emerald-300">
                Longitud
              </p>
              <p className="mt-2 font-bold text-white">Menegak · Timur / Barat</p>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[4]} />
          <div className="grid items-center gap-7 lg:grid-cols-2">
            <CoordinateGrid point="A" latitude="30°U" longitude="40°T" />
            <div>
              <h3 className="font-bold text-white">Urutan wajib</h3>
              <div className="mt-4">
                <StepFlow steps={content.readingCoordinates.steps} />
              </div>
              <Panel className="mt-4 border-cyan-300/20">
                <p className="font-mono text-lg font-black text-cyan-200">LATITUD → LONGITUD</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {content.readingCoordinates.example}
                </p>
              </Panel>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[5]} />
          <StepFlow steps={content.readingCoordinates.atlasEstimationSteps} />
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <CoordinateGrid point="P" latitude="4°U" longitude="102°T" />
            <Panel className="border-amber-300/20">
              <ScanLine className="h-7 w-7 text-amber-300" />
              <h3 className="mt-3 font-bold text-white">Contoh anggaran atlas</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {content.readingCoordinates.atlasExample}
              </p>
              <div className="mt-4 flex items-center gap-2 font-mono text-lg font-black text-amber-200">
                <span>4°U</span>
                <ArrowRight className="h-5 w-5" />
                <span>102°T</span>
              </div>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[6]} />
          <Tabs labels={["GPS", "GIS"]} selected={technology} onSelect={setTechnology} />
          <Panel className="border-cyan-300/20">
            <div role="tabpanel" className="grid items-center gap-5 md:grid-cols-[auto_1fr]">
              {technology === 0 ? (
                <Satellite className="h-14 w-14 text-cyan-300" />
              ) : (
                <Database className="h-14 w-14 text-emerald-300" />
              )}
              <div>
                {technology === 0 ? (
                  <>
                    <h3 className="text-xl font-black text-white">Sistem Kedudukan Global</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {content.technology.gps.definition}
                    </p>
                    <p className="mt-3 rounded-xl bg-cyan-300/10 p-3 text-sm font-semibold leading-6 text-cyan-100">
                      {content.technology.gps.satelliteRequirement}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-black text-white">Sistem Maklumat Geografi</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {content.technology.gis.definition}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {content.technology.gis.functions.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-2 text-xs font-bold text-emerald-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Panel>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel>
              <Satellite className="h-7 w-7 text-cyan-300" />
              <h3 className="mt-3 font-bold text-white">GPS menjawab “Di mana?”</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Empat atau lebih satelit membantu penerima mengira koordinat dengan tepat.
              </p>
            </Panel>
            <Panel>
              <Grid3X3 className="h-7 w-7 text-emerald-300" />
              <h3 className="mt-3 font-bold text-white">GIS menjawab “Apakah polanya?”</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Lapisan data spatial dikumpul, dikemas kini, dianalisis dan dipersembahkan.
              </p>
            </Panel>
          </div>
          <Panel className="border-amber-300/20">
            <div className="flex items-start gap-3">
              <CircleDot className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
              <div>
                <h3 className="font-bold text-amber-200">Info geografi</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {content.longitude.malaysiaCenterFact}
                </p>
              </div>
            </div>
          </Panel>
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
                    "Mengapa kedudukan relatif boleh berubah?",
                    content.relativePosition.changingReferencePointNote,
                  ],
                  [
                    "Apakah perbezaan latitud dengan longitud?",
                    "Latitud melintang dan mengukur Utara–Selatan; longitud menegak dari kutub ke kutub dan mengukur Timur–Barat.",
                  ],
                  [
                    "Mengapa latitud ditulis dahulu?",
                    "Format koordinat geografi sentiasa menyatakan latitud dahulu, kemudian longitud, contohnya 4°U 102°T.",
                  ],
                  [
                    "Apakah perbezaan fungsi GPS dan GIS?",
                    "GPS menentukan koordinat sesuatu lokasi menggunakan satelit; GIS mengurus dan menganalisis data spatial tentang lokasi.",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none">
                      <span>{question}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-emerald-300 transition group-open:rotate-180 motion-reduce:transition-none" />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel className="border-emerald-300/25 bg-gradient-to-br from-emerald-300/10 to-cyan-300/10">
            <div className="flex items-start gap-3">
              <Map className="mt-1 h-6 w-6 shrink-0 text-emerald-300" />
              <div>
                <h3 className="font-bold text-emerald-200">Rumusan bab</h3>
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
                className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "cursor-pointer bg-gradient-to-r from-emerald-300 to-cyan-300 text-slate-950 hover:brightness-110"}`}
              >
                {isRead ? "Bab 2 telah selesai" : "Tandakan Bab 2 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
