import type { ReactNode } from "react";
import {
  Check,
  ChevronDown,
  CloudSun,
  Droplets,
  Factory,
  Fish,
  FlaskConical,
  HeartPulse,
  Lightbulb,
  Megaphone,
  Microscope,
  Pickaxe,
  Recycle,
  Scale,
  ShieldCheck,
  Trash2,
  TreePine,
  TriangleAlert,
  Users,
  Waves,
  Wheat,
} from "lucide-react";
import type { Geo12Content } from "@/content/form1/geography/chapter-12/geo12-content";

const sections = [
  [
    "12.1",
    "Jenis sumber air di Malaysia",
    "Bandingkan air permukaan dengan air bawah tanah serta fahami laluan air hujan.",
  ],
  [
    "12.2",
    "Enam punca krisis air",
    "Krisis berlaku apabila sumber yang banyak tidak dapat dibekalkan dalam keadaan bersih dan selamat.",
  ],
  [
    "12.3",
    "Empat kesan krisis air",
    "Kekurangan air menjejaskan kehidupan harian, pertanian, ekosistem dan kesihatan.",
  ],
  [
    "12.4",
    "Enam langkah mengurangkan krisis",
    "Perlindungan sumber, penguatkuasaan, teknologi dan pendidikan perlu bergerak bersama.",
  ],
  [
    "Ulang kaji",
    "Bina jawapan berantai",
    "Hubungkan punca, proses, kesan dan langkah supaya jawapan geografi lebih lengkap.",
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

function WaterShareDiagram() {
  return (
    <div
      aria-label="Air permukaan membentuk 97 peratus sumber air Malaysia dan air bawah tanah membentuk 3 peratus"
      className="space-y-4"
    >
      <div>
        <div className="mb-2 flex items-end justify-between gap-3">
          <p className="text-sm font-bold text-cyan-100">Air permukaan</p>
          <p className="font-mono text-2xl font-black text-cyan-300">97%</p>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-slate-950/70">
          <div className="h-full w-[97%] rounded-full bg-gradient-to-r from-cyan-500 to-sky-300" />
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-end justify-between gap-3">
          <p className="text-sm font-bold text-violet-100">Air bawah tanah</p>
          <p className="font-mono text-2xl font-black text-violet-300">3%</p>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-slate-950/70">
          <div className="h-full min-w-3 w-[3%] rounded-full bg-violet-300" />
        </div>
      </div>
    </div>
  );
}

export function GeoChapter12NotesBlock({
  id,
  content,
  isRead = false,
  onMarkRead,
}: {
  id?: string;
  content: Geo12Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const causeIcons = [TreePine, CloudSun, Trash2, Factory, FlaskConical, Users];
  const effectIcons = [Droplets, Wheat, Fish, HeartPulse];
  const stepIcons = [TreePine, Scale, Recycle, Pickaxe, Megaphone, Microscope];

  return (
    <section
      id={id}
      className="mt-8 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#06151d] text-slate-100 shadow-2xl shadow-slate-950/30"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-cyan-300">
            <Droplets className="h-6 w-6" aria-hidden="true" />
            <p className="font-mono text-xs font-black uppercase tracking-[.18em]">
              Geografi Tingkatan 1 · Bab 12
            </p>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Sumber air: banyak tidak semestinya sentiasa cukup
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {content.hook.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["2 sumber utama", "6 punca", "4 kesan", "6 langkah"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-slate-300"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-14 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section className="space-y-6">
          <SectionHeading section={sections[0]} />
          <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <Panel className="border-cyan-300/20">
              <Waves className="h-8 w-8 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black text-white">Nisbah sumber air negara</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Malaysia menerima hujan {content.overview.annualRainfall}. Namun, sumber air negara
                masih sangat bergantung pada air di permukaan.
              </p>
              <div className="mt-5">
                <WaterShareDiagram />
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Sumber: {content.overview.source}
              </p>
            </Panel>
            <Panel>
              <h3 className="text-lg font-black text-white">Laluan air hujan</h3>
              <div
                aria-label="Hujan melalui intersepsi dan infiltrasi sebelum menjadi air permukaan atau air bawah tanah"
                className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center"
              >
                <div className="rounded-xl bg-sky-300/10 p-4 text-center font-bold text-sky-100">
                  Hujan turun
                </div>
                <span className="text-center text-cyan-300" aria-hidden="true">
                  →
                </span>
                <div className="rounded-xl bg-cyan-300/10 p-4 text-center font-bold text-cyan-100">
                  Intersepsi · Infiltrasi
                </div>
                <span className="text-center text-cyan-300" aria-hidden="true">
                  →
                </span>
                <div className="rounded-xl bg-violet-300/10 p-4 text-center font-bold text-violet-100">
                  Permukaan · Akuifer
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {content.hydrologyTerms.map((item) => (
                  <div
                    key={item.term}
                    className="rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <p className="font-bold text-cyan-200">{item.term}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.meaning}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <Waves className="h-7 w-7 text-cyan-300" aria-hidden="true" />
                <h3 className="text-lg font-black text-white">Air permukaan</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {content.surfaceWater.definition}
              </p>
              <p className="mt-3 rounded-xl bg-cyan-300/10 p-3 text-sm font-bold leading-6 text-cyan-100">
                {content.surfaceWater.riverBasinCount}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {content.surfaceWater.examples.map((group) => (
                  <div key={group.type}>
                    <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-400">
                      {group.type}
                    </p>
                    <Checklist items={group.examples} />
                  </div>
                ))}
              </div>
            </Panel>
            <Panel className="border-violet-300/20">
              <Pickaxe className="h-7 w-7 text-violet-300" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-black text-white">Air bawah tanah</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {content.groundwater.definition}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-violet-300/10 p-4 text-center">
                  <p className="font-mono text-lg font-black text-violet-100">5,000 bilion m³</p>
                  <p className="mt-1 text-xs text-slate-400">anggaran simpanan</p>
                </div>
                <div className="rounded-xl bg-cyan-300/10 p-4 text-center">
                  <p className="font-mono text-2xl font-black text-cyan-100">3%</p>
                  <p className="mt-1 text-xs text-slate-400">digunakan</p>
                </div>
              </div>
              <div className="mt-4">
                <Checklist items={content.groundwater.examples} />
              </div>
            </Panel>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[1]} />
          <Panel className="border-amber-300/20 bg-amber-300/[0.055]">
            <TriangleAlert className="h-7 w-7 text-amber-300" aria-hidden="true" />
            <h3 className="mt-3 font-bold text-amber-100">Maksud krisis air</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{content.crisisDefinition}</p>
          </Panel>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {content.crisisCauses.map((cause, index) => {
              const Icon = causeIcons[index];
              return (
                <Panel key={cause.cause}>
                  <div className="flex items-start justify-between gap-3">
                    <Icon className="h-8 w-8 text-amber-300" aria-hidden="true" />
                    <span className="font-mono text-xs font-black text-slate-500">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-black text-white">{cause.cause}</h3>
                  <div className="mt-4">
                    <Checklist items={cause.details} />
                  </div>
                </Panel>
              );
            })}
          </div>
          <Panel>
            <p className="text-xs font-black uppercase tracking-wider text-amber-300">
              Rantaian punca
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
              {[
                "Hutan tadahan ditebang",
                "Hakisan meningkat",
                "Kelodak mendap",
                "Kapasiti dan kualiti air merosot",
              ].map((label, index) => (
                <div key={label} className="contents">
                  <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4 text-center text-sm font-bold text-white">
                    {label}
                  </div>
                  {index < 3 && (
                    <span className="text-center text-amber-300" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[2]} />
          <div className="grid gap-5 md:grid-cols-2">
            {content.crisisEffects.map((effect, index) => {
              const Icon = effectIcons[index];
              return (
                <Panel key={effect.effect} className="border-rose-300/15">
                  <Icon className="h-8 w-8 text-rose-300" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-black text-white">{effect.effect}</h3>
                  <div className="mt-4">
                    <Checklist items={effect.details} />
                  </div>
                </Panel>
              );
            })}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Taun · kolera", "Demam kepialu · tifoid", "Leptospirosis · kencing tikus"].map(
              (disease) => (
                <div
                  key={disease}
                  className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] p-4 text-center text-sm font-bold text-rose-100"
                >
                  {disease}
                </div>
              ),
            )}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[3]} />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {content.mitigationSteps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <Panel key={step.name} className="border-emerald-300/15">
                  <div className="flex items-start justify-between gap-3">
                    <Icon className="h-8 w-8 text-emerald-300" aria-hidden="true" />
                    <span className="font-mono text-xs font-black text-emerald-300/70">
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-black text-white">{step.name}</h3>
                  <div className="mt-4">
                    <Checklist items={step.details} />
                  </div>
                </Panel>
              );
            })}
          </div>
          <Panel className="border-emerald-300/20 bg-emerald-300/[0.055]">
            <ShieldCheck className="h-7 w-7 text-emerald-300" aria-hidden="true" />
            <h3 className="mt-3 font-bold text-emerald-100">Contoh kawasan tadahan</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Hutan seluas 160,000 hektar di Padang Terap, Kedah dipelihara sebagai kawasan tadahan
              hujan bagi Empangan Pedu yang membekalkan air ke jelapang padi Kedah.
            </p>
          </Panel>
        </section>

        <section className="space-y-6">
          <SectionHeading section={sections[4]} />
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
                    "Apakah dua sumber air utama Malaysia?",
                    "Air permukaan sebanyak 97% dan air bawah tanah sebanyak 3%.",
                  ],
                  [
                    "Apakah beza intersepsi dengan infiltrasi?",
                    "Intersepsi ialah pintasan hujan oleh tumbuhan, manakala infiltrasi ialah resapan air ke dalam tanah.",
                  ],
                  [
                    "Mengapa penebangan hutan menyebabkan krisis air?",
                    "Hakisan membawa kelodak ke sungai dan empangan lalu mengurangkan kapasiti serta kualiti air.",
                  ],
                  [
                    "Nyatakan empat kesan krisis air.",
                    "Kekurangan air bersih, tanih dan pertanian terjejas, kepupusan flora dan fauna, serta kemudaratan kepada manusia.",
                  ],
                  [
                    "Bagaimanakah teknologi membantu menjamin bekalan air?",
                    "Kurangkan kehilangan air, teroka air bawah tanah, tuai air hujan dan kaji penyahgaraman air laut.",
                  ],
                ].map(([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                      <span>{question}</span>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-cyan-300 transition group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="pt-3 text-sm leading-6 text-slate-300">{answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel className="border-cyan-300/25 bg-gradient-to-br from-cyan-300/10 to-blue-300/10">
            <div className="flex items-start gap-3">
              <Droplets className="mt-1 h-6 w-6 shrink-0 text-cyan-300" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-cyan-100">Rumusan bab</h3>
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
                {isRead ? "Bab 12 telah selesai" : "Tandakan Bab 12 selesai"}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
