import { useState, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Dna,
  FlaskConical,
  HeartPulse,
  Leaf,
  Microscope,
  Network,
  Sparkles,
  Sun,
} from "lucide-react";
import type { Chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import { localizeChapter2PracticalAreas } from "@/content/form1/science/chapter-2/chapter2-activities";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Chapter 2 visual map",
    title: "Every living thing begins with a cell",
    subtitle:
      "Explore cell structures, microscopic techniques, specialised cells, levels of organisation and the energy cycle that sustains life.",
    path: [
      ["2.1", "Cell basics"],
      ["2.1", "Cell structures"],
      ["2.1", "Microscope practical"],
      ["2.1", "Organisms & cells"],
      ["2.1", "Organisation"],
      ["2.2", "Life processes"],
    ],
    sections: [
      [
        "2.1",
        "A cell is the basic unit of life",
        "Cells perform life processes, divide for growth and repair, and contain structures with specialised functions.",
      ],
      [
        "2.1",
        "Animal and plant cells",
        "Compare the organelles shared by both cell types with structures found mainly in plant cells.",
      ],
      [
        "Practical 2.1",
        "Prepare cells for microscopic observation",
        "Correct staining, cover-slip technique and lens sequence produce a clear specimen without trapped air bubbles.",
      ],
      [
        "2.1",
        "From one cell to specialised cells",
        "Organisms may consist of one cell or many differentiated cells adapted for particular jobs.",
      ],
      [
        "2.1",
        "Cells build tissues, organs and systems",
        "Increasing levels of organisation allow eleven body systems to work together as one organism.",
      ],
      [
        "2.2",
        "Respiration and photosynthesis sustain life",
        "Respiration releases usable energy while photosynthesis stores light energy in glucose.",
      ],
      [
        "Chapter check",
        "Connect the whole chapter",
        "Use the comparison and summary to test the relationships between structures, organisation and processes.",
      ],
    ],
    history: "A short history of cell discovery",
    division: "Controlled division",
    cancer: "When control is lost",
    lifeFunctions: "Four life functions",
    chooseStructure: "Choose a cell structure",
    foundIn: "Found in",
    both: "Animal and plant cells",
    animal: "Animal cell",
    plant: "Plant cell",
    vacuoleTip: "Vacuole exception",
    vacuoleText:
      "Plant cells usually have a large permanent vacuole. Some animal cells can contain small temporary vacuoles with different contents and functions.",
    onion: "Onion epidermal cell",
    cheek: "Human cheek cell",
    protocol: ["Extract & place", "Stain", "Lower cover slip", "Clean & observe"],
    onionSteps: [
      "Peel a thin onion epidermis and place it flat in a drop of water.",
      "Add iodine solution.",
      "Lower the cover slip at about 45° with a mounting needle.",
      "Blot excess stain; observe with low power before high power.",
    ],
    cheekSteps: [
      "Gently scrape the inner cheek and transfer the cells into a drop of water.",
      "Add methylene blue solution.",
      "Lower the cover slip at about 45° without trapping air bubbles.",
      "Blot excess liquid; observe with low power before high power.",
    ],
    practicalEvidence: "Practical evidence",
    unicellular: "Unicellular organisms",
    multicellular: "Multicellular organisms",
    specialisedAnimal: "Specialised animal cells",
    specialisedPlant: "Specialised plant cells",
    hierarchy: "Five levels of organisation",
    animalExample: "Animal example",
    plantExample: "Plant example",
    systems: "Explore the 11 human body systems",
    organs: "Main organs",
    externalRespiration: "External respiration (breathing)",
    externalText: "Physical gas exchange between an organism and its environment.",
    cellRespiration: "Cell respiration",
    photosynthesis: "Photosynthesis",
    requirements: "Four requirements",
    starchTest: "Leaf starch test",
    starchResult: "Brown → blue-black means starch is present and photosynthesis occurred.",
    safety: "Never heat ethanol directly. Use a hot-water bath under teacher supervision.",
    comparison: "Respiration vs photosynthesis",
    relationship: "A complementary cycle",
    examFacts: "Key exam facts",
    summary: "Chapter summary",
    mark: "Mark Chapter 2 Complete",
    marked: "Chapter 2 complete",
  },
  bm: {
    eyebrow: "Peta visual Bab 2",
    title: "Setiap hidupan bermula daripada sel",
    subtitle:
      "Terokai struktur sel, teknik mikroskop, sel khusus, tahap organisasi dan kitar tenaga yang mengekalkan kehidupan.",
    path: [
      ["2.1", "Asas sel"],
      ["2.1", "Struktur sel"],
      ["2.1", "Amali mikroskop"],
      ["2.1", "Organisma & sel"],
      ["2.1", "Organisasi"],
      ["2.2", "Proses kehidupan"],
    ],
    sections: [
      [
        "2.1",
        "Sel ialah unit asas hidupan",
        "Sel menjalankan proses hidup, membahagi untuk pertumbuhan dan pembaikan, serta mempunyai struktur dengan fungsi khusus.",
      ],
      [
        "2.1",
        "Sel haiwan dan sel tumbuhan",
        "Bandingkan organel yang dikongsi oleh kedua-dua jenis sel dengan struktur yang terdapat terutamanya dalam sel tumbuhan.",
      ],
      [
        "Amali 2.1",
        "Sediakan sel untuk pemerhatian mikroskop",
        "Pewarnaan, teknik penutup kaca dan urutan kanta yang betul menghasilkan spesimen jelas tanpa gelembung udara.",
      ],
      [
        "2.1",
        "Daripada satu sel kepada sel khusus",
        "Organisma boleh terdiri daripada satu sel atau banyak sel terbeza yang disesuaikan untuk tugas tertentu.",
      ],
      [
        "2.1",
        "Sel membina tisu, organ dan sistem",
        "Tahap organisasi yang meningkat membolehkan sebelas sistem badan bekerjasama sebagai satu organisma.",
      ],
      [
        "2.2",
        "Respirasi dan fotosintesis mengekalkan hidupan",
        "Respirasi membebaskan tenaga yang boleh digunakan manakala fotosintesis menyimpan tenaga cahaya dalam glukosa.",
      ],
      [
        "Semakan bab",
        "Hubungkan keseluruhan bab",
        "Gunakan perbandingan dan rumusan untuk menguji hubungan antara struktur, organisasi dan proses.",
      ],
    ],
    history: "Sejarah ringkas penemuan sel",
    division: "Pembahagian terkawal",
    cancer: "Apabila kawalan hilang",
    lifeFunctions: "Empat fungsi hidup",
    chooseStructure: "Pilih struktur sel",
    foundIn: "Terdapat dalam",
    both: "Sel haiwan dan tumbuhan",
    animal: "Sel haiwan",
    plant: "Sel tumbuhan",
    vacuoleTip: "Pengecualian vakuol",
    vacuoleText:
      "Sel tumbuhan biasanya mempunyai vakuol kekal yang besar. Sesetengah sel haiwan boleh mempunyai vakuol sementara yang kecil dengan kandungan dan fungsi berbeza.",
    onion: "Sel epidermis bawang",
    cheek: "Sel pipi manusia",
    protocol: ["Ambil & letak", "Warnakan", "Turunkan penutup", "Bersih & perhati"],
    onionSteps: [
      "Kupas epidermis bawang yang nipis dan letakkan rata dalam setitis air.",
      "Titiskan larutan iodin.",
      "Turunkan penutup kaca pada sudut kira-kira 45° menggunakan jarum tenggek.",
      "Serap pewarna berlebihan; perhati dengan kuasa rendah sebelum kuasa tinggi.",
    ],
    cheekSteps: [
      "Kikis bahagian dalam pipi dengan lembut dan pindahkan sel ke dalam setitis air.",
      "Titiskan larutan metilena biru.",
      "Turunkan penutup kaca pada sudut kira-kira 45° tanpa memerangkap gelembung udara.",
      "Serap cecair berlebihan; perhati dengan kuasa rendah sebelum kuasa tinggi.",
    ],
    practicalEvidence: "Bukti amali",
    unicellular: "Organisma unisel",
    multicellular: "Organisma multisel",
    specialisedAnimal: "Sel haiwan khusus",
    specialisedPlant: "Sel tumbuhan khusus",
    hierarchy: "Lima tahap organisasi",
    animalExample: "Contoh haiwan",
    plantExample: "Contoh tumbuhan",
    systems: "Terokai 11 sistem badan manusia",
    organs: "Organ utama",
    externalRespiration: "Respirasi luar (pernafasan)",
    externalText: "Pertukaran gas secara fizikal antara organisma dengan persekitarannya.",
    cellRespiration: "Respirasi sel",
    photosynthesis: "Fotosintesis",
    requirements: "Empat keperluan",
    starchTest: "Ujian kanji daun",
    starchResult: "Perang → biru tua bermaksud kanji hadir dan fotosintesis telah berlaku.",
    safety:
      "Jangan panaskan etanol secara terus. Gunakan rendaman air panas di bawah pengawasan guru.",
    comparison: "Respirasi lwn fotosintesis",
    relationship: "Kitaran saling melengkapi",
    examFacts: "Fakta penting peperiksaan",
    summary: "Rumusan bab",
    mark: "Tandakan Bab 2 Selesai",
    marked: "Bab 2 selesai",
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
      <span className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">
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

export function ScienceF1Chapter2VisualNotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter2Content; bm: Chapter2Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const c = ui[lang];
  const practicals = localizeChapter2PracticalAreas(lang);
  const slidePractical = practicals.find((area) => area.id === "cell-slide-preparation");
  const starchTest = practicals
    .find((area) => area.id === "photosynthesis-investigation-hub")
    ?.investigations?.find((item) => item.id === "starch");
  const [structure, setStructure] = useState(0);
  const [system, setSystem] = useState(0);
  const selectedStructure = t.cellStructures[structure];
  const selectedSystem = t.bodySystems[system];

  return (
    <section
      id={id}
      data-lang={lang}
      data-chapter="2"
      className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#061923] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_14%_8%,rgba(34,211,238,.2),transparent_34%),radial-gradient(circle_at_84%_10%,rgba(52,211,153,.14),transparent_30%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-cyan-400/15 via-slate-950/35 to-emerald-400/10 p-5 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-cyan-200">
            <Microscope className="h-4 w-4" aria-hidden="true" /> {c.eyebrow}
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
                <span className="font-mono text-xs font-black text-emerald-300">{item[0]}</span>
                <p className="mt-1 text-xs font-black text-white">{item[1]}</p>
                {index < c.path.length - 1 && (
                  <ChevronRight
                    className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-[#061923] p-1 text-cyan-300 xl:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </header>

        <div className="space-y-6">
          <SectionHeading section={c.sections[0]} />
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <CircleDot className="h-7 w-7 text-cyan-300" />
                <h3 className="font-black text-white">{c.history}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {t.cellBasics.discoveryHistory}
              </p>
              <p className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] p-4 text-sm leading-6 text-cyan-50">
                {t.cellBasics.definition}
              </p>
            </Panel>
            <Panel>
              <h3 className="font-black text-white">{c.lifeFunctions}</h3>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {t.cellBasics.lifeFunctions.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm font-bold text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-emerald-300/10 p-3">
                  <p className="font-black text-emerald-200">{c.division}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">
                    {t.cellBasics.divisionBody}
                  </p>
                </div>
                <div className="rounded-xl bg-rose-300/10 p-3">
                  <p className="font-black text-rose-200">{c.cancer}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{t.cellBasics.cancerBody}</p>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[1]} />
          <Panel>
            <div className="flex items-center gap-3">
              <Dna className="h-7 w-7 text-cyan-300" />
              <h3 className="font-black text-white">{c.chooseStructure}</h3>
            </div>
            <div
              className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7"
              role="tablist"
              aria-label={c.chooseStructure}
            >
              {t.cellStructures.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={structure === index}
                  onClick={() => setStructure(index)}
                  className={`min-h-14 cursor-pointer rounded-xl border p-2 text-left text-xs font-black transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${structure === index ? "border-cyan-300 bg-cyan-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-4 rounded-2xl border border-cyan-300/20 bg-slate-950/45 p-4 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-cyan-300/30 bg-cyan-300/10">
                <CircleDot className="h-11 w-11 text-cyan-200" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white">{selectedStructure.name}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedStructure.function}
                </p>
                <p className="mt-3 text-xs font-black uppercase tracking-wider text-emerald-300">
                  {c.foundIn}:{" "}
                  {selectedStructure.inAnimal && selectedStructure.inPlant
                    ? c.both
                    : selectedStructure.inAnimal
                      ? c.animal
                      : c.plant}
                </p>
              </div>
            </div>
          </Panel>
          <div className="grid gap-4 lg:grid-cols-3">
            <Panel>
              <h3 className="font-black text-white">{c.animal}</h3>
              <Checklist items={t.animalVsPlant.animalOnly} />
            </Panel>
            <Panel>
              <h3 className="font-black text-white">{c.both}</h3>
              <Checklist items={t.animalVsPlant.shared} />
            </Panel>
            <Panel>
              <h3 className="font-black text-white">{c.plant}</h3>
              <Checklist items={t.animalVsPlant.plantOnly} />
            </Panel>
          </div>
          <div className="rounded-2xl border border-amber-300/25 bg-amber-300/[0.08] p-4">
            <p className="flex items-center gap-2 font-black text-amber-200">
              <Sparkles className="h-5 w-5" />
              {c.vacuoleTip}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{c.vacuoleText}</p>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[2]} />
          <div className="grid gap-4 lg:grid-cols-2">
            {[
              { title: c.onion, steps: c.onionSteps, tone: "emerald" },
              { title: c.cheek, steps: c.cheekSteps, tone: "cyan" },
            ].map((protocol) => (
              <Panel
                key={protocol.title}
                className={
                  protocol.tone === "emerald" ? "border-emerald-300/20" : "border-cyan-300/20"
                }
              >
                <h3 className="flex items-center gap-2 font-black text-white">
                  <Microscope
                    className={`h-6 w-6 ${protocol.tone === "emerald" ? "text-emerald-300" : "text-cyan-300"}`}
                  />
                  {protocol.title}
                </h3>
                <div className="mt-4 space-y-3">
                  {protocol.steps.map((step, index) => (
                    <div key={step} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                          {c.protocol[index]}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
          {slidePractical && (
            <Panel>
              <p className="font-black text-emerald-200">{c.practicalEvidence}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{slidePractical.evidence}</p>
              <p className="mt-3 text-xs leading-5 text-amber-100/80">
                {slidePractical.practicalNotice}
              </p>
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[3]} />
          <p className="text-sm leading-6 text-slate-300">
            {t.unicellularMulticellular.definition}
          </p>
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <h3 className="font-black text-cyan-200">{c.unicellular}</h3>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {t.unicellularMulticellular.unicellular.map((item) => (
                  <div key={item.id} className="rounded-xl bg-white/5 p-3">
                    <p className="font-black text-white">{item.name}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{item.note}</p>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel>
              <h3 className="font-black text-emerald-200">{c.multicellular}</h3>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {t.unicellularMulticellular.multicellular.map((item) => (
                  <div key={item.id} className="rounded-xl bg-white/5 p-3">
                    <p className="font-black text-white">{item.name}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{item.note}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {[
              { title: c.specialisedAnimal, items: t.animalCellTypes },
              { title: c.specialisedPlant, items: t.plantCellTypes },
            ].map((group) => (
              <Panel key={group.title}>
                <h3 className="font-black text-white">{group.title}</h3>
                <div className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-white/10 bg-white/[0.035] p-3"
                    >
                      <p className="font-black text-cyan-100">{item.name}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[4]} />
          <Panel>
            <h3 className="flex items-center gap-2 font-black text-white">
              <Network className="h-6 w-6 text-cyan-300" />
              {c.hierarchy}
            </h3>
            <div className="mt-5 grid gap-2 sm:grid-cols-5">
              {t.organisationHierarchy.map((item, index) => (
                <div
                  key={item.level}
                  className="relative rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] p-3"
                >
                  <span className="font-mono text-xs font-black text-emerald-300">
                    0{index + 1}
                  </span>
                  <p className="mt-1 font-black text-white">{item.level}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{item.description}</p>
                  {index < 4 && (
                    <ChevronRight className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-[#061923] p-1 text-cyan-300 sm:block" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs font-black uppercase text-cyan-300">{c.animalExample}</p>
                <p className="mt-2 text-sm font-bold text-white">
                  {t.organisationExamples.animal.join(" → ")}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs font-black uppercase text-emerald-300">{c.plantExample}</p>
                <p className="mt-2 text-sm font-bold text-white">
                  {t.organisationExamples.plant.join(" → ")}
                </p>
              </div>
            </div>
          </Panel>
          <Panel>
            <div className="flex items-center gap-3">
              <HeartPulse className="h-7 w-7 text-rose-300" />
              <h3 className="font-black text-white">{c.systems}</h3>
            </div>
            <div
              className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
              role="tablist"
              aria-label={c.systems}
            >
              {t.bodySystems.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={system === index}
                  onClick={() => setSystem(index)}
                  className={`min-h-14 cursor-pointer rounded-xl border p-2 text-left text-xs font-black transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 ${system === index ? "border-rose-300 bg-rose-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-slate-950/45 p-4">
              <h4 className="text-xl font-black text-white">{selectedSystem.name}</h4>
              <p className="mt-2 text-xs font-black uppercase tracking-wider text-rose-200">
                {c.organs}: {selectedSystem.organs}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{selectedSystem.function}</p>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[5]} />
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <h3 className="flex items-center gap-2 font-black text-white">
                <Activity className="h-6 w-6 text-cyan-300" />
                {c.cellRespiration}
              </h3>
              <div className="mt-4 rounded-xl bg-cyan-300/10 p-4 text-center text-sm font-black text-cyan-50">
                {t.respiration.wordEquation}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{t.respiration.definition}</p>
              <div className="mt-4 rounded-xl border border-white/10 p-3">
                <p className="font-black text-white">{c.externalRespiration}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{c.externalText}</p>
              </div>
            </Panel>
            <Panel>
              <h3 className="flex items-center gap-2 font-black text-white">
                <Leaf className="h-6 w-6 text-emerald-300" />
                {c.photosynthesis}
              </h3>
              <div className="mt-4 rounded-xl bg-emerald-300/10 p-4 text-center text-sm font-black text-emerald-50">
                {t.photosynthesis.wordEquation}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{t.photosynthesis.definition}</p>
              <p className="mt-4 text-xs font-black uppercase tracking-wider text-emerald-300">
                {c.requirements}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {t.photosynthesis.requirements.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Panel>
          </div>
          {starchTest && (
            <Panel className="border-amber-300/20">
              <h3 className="flex items-center gap-2 font-black text-white">
                <FlaskConical className="h-6 w-6 text-amber-300" />
                {c.starchTest}
              </h3>
              <div className="mt-4 grid gap-2 sm:grid-cols-5">
                {starchTest.visualSteps?.map((step, index) => (
                  <div key={step} className="rounded-xl bg-white/5 p-3">
                    <span className="font-mono text-xs font-black text-amber-300">
                      0{index + 1}
                    </span>
                    <p className="mt-2 text-xs font-bold leading-5 text-slate-200">{step}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-xl bg-emerald-300/10 p-3 text-sm font-black text-emerald-100">
                {c.starchResult}
              </p>
              <p className="mt-3 flex gap-2 text-xs leading-5 text-amber-100">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {c.safety}
              </p>
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[6]} />
          <Panel>
            <h3 className="font-black text-white">{c.comparison}</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[620px] border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr>
                    {[
                      lang === "en" ? "Characteristic" : "Ciri",
                      c.cellRespiration,
                      c.photosynthesis,
                    ].map((head) => (
                      <th
                        key={head}
                        className="border-b border-white/15 bg-white/5 p-3 text-xs font-black uppercase tracking-wider text-cyan-200"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.comparisonTable.map((row) => (
                    <tr key={row.characteristic}>
                      <th className="border-b border-white/10 p-3 font-black text-white">
                        {row.characteristic}
                      </th>
                      <td className="border-b border-white/10 p-3 text-slate-300">
                        {row.respiration}
                      </td>
                      <td className="border-b border-white/10 p-3 text-slate-300">
                        {row.photosynthesis}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
          <Panel className="text-center">
            <Sun className="mx-auto h-9 w-9 text-amber-300" />
            <h3 className="mt-3 font-black text-white">{c.relationship}</h3>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              {t.complementaryRelationship}
            </p>
          </Panel>
          <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
            <Panel>
              <h3 className="font-black text-white">{c.examFacts}</h3>
              <div className="mt-4">
                <Checklist items={t.keyExamFacts} />
              </div>
            </Panel>
            <Panel>
              <h3 className="font-black text-white">{c.summary}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">{t.chapterSummary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.keyTerms.map((term) => (
                  <span
                    key={term}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-bold text-cyan-100"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </Panel>
          </div>
          {onMarkRead && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onMarkRead}
                disabled={isRead}
                className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${isRead ? "cursor-default bg-emerald-500/20 text-emerald-200" : "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:scale-105"}`}
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
