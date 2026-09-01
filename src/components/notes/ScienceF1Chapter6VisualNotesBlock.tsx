import { useState, type ReactNode } from "react";
import {
  Atom,
  Beaker,
  BookOpenCheck,
  Check,
  ChevronDown,
  CircleDot,
  FlaskConical,
  History,
  Lightbulb,
  Magnet,
  Orbit,
  Sparkles,
  TableProperties,
  TestTubes,
  Zap,
} from "lucide-react";
import type { Chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";
import { chapter6Supplement } from "@/content/form1/science/chapter-6/chapter6-content";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Form 1 Science · Chapter 6",
    title: "Elements build the material world",
    subtitle:
      "Move from the atom to the Periodic Table, then learn how physical mixing differs from chemical bonding.",
    path: [
      ["6.1", "Atoms"],
      ["6.1", "Periodic Table"],
      ["6.2", "Mixtures"],
      ["6.3", "Compounds"],
      ["Review", "Compare"],
    ],
    sections: [
      [
        "6.1",
        "Atoms, elements, and compounds",
        "Start with the smallest particles and follow how they join.",
      ],
      [
        "6.1",
        "The Periodic Table is a map",
        "Its arrangement reveals families and broad material properties.",
      ],
      [
        "6.1",
        "Metals, non-metals, and semi-metals",
        "Properties determine how an element can be used.",
      ],
      [
        "6.2",
        "A mixture keeps its components",
        "Choose a physical separation method using a property difference.",
      ],
      [
        "6.3",
        "A compound is a new substance",
        "Chemical bonding produces new properties and conserves mass.",
      ],
      [
        "6.3",
        "Electrolysis breaks a compound apart",
        "Electrical energy decomposes water into two testable gases.",
      ],
      [
        "Review",
        "Make the distinctions exam-ready",
        "Compare changes and practise explaining unfamiliar situations.",
      ],
    ],
    particle: "Choose a subatomic particle",
    charge: "Charge",
    location: "Location",
    neutral: "Why an atom is neutral",
    molecule: "Molecule",
    element: "Element",
    compound: "Compound",
    history: "How the table developed",
    arrangement: "Arrangement rule",
    regions: "Read the regions",
    applications: "Element properties → applications",
    compareProperties: "Compare properties",
    property: "Property",
    metal: "Metal",
    nonMetal: "Non-metal",
    chooseMethod: "Choose a separation method",
    principle: "What it separates",
    example: "Example",
    selection: "Choose using",
    reactions: "Compound formation",
    reactants: "Reactants",
    product: "Product",
    electrolysis: "Electrolysis of water",
    setup: "Set-up",
    gasTests: "Products and gas tests",
    ratio: "Volume ratio",
    changes: "Physical change vs chemical change",
    materials: "Mixture vs compound",
    facts: "High-yield facts",
    recall: "Active recall",
    summary: "Chapter rule",
    mark: "Mark Chapter 6 as read",
    marked: "Chapter 6 completed",
  },
  bm: {
    eyebrow: "Sains Tingkatan 1 · Bab 6",
    title: "Unsur membina dunia bahan",
    subtitle:
      "Bergerak daripada atom ke Jadual Berkala, kemudian fahami perbezaan antara percampuran fizikal dengan ikatan kimia.",
    path: [
      ["6.1", "Atom"],
      ["6.1", "Jadual Berkala"],
      ["6.2", "Campuran"],
      ["6.3", "Sebatian"],
      ["Ulang kaji", "Bandingkan"],
    ],
    sections: [
      [
        "6.1",
        "Atom, unsur, dan sebatian",
        "Mulakan dengan zarah terkecil dan ikuti cara zarah bergabung.",
      ],
      [
        "6.1",
        "Jadual Berkala ialah sebuah peta",
        "Susunannya menunjukkan keluarga dan sifat umum bahan.",
      ],
      [
        "6.1",
        "Logam, bukan logam, dan semilogam",
        "Sifat menentukan cara sesuatu unsur digunakan.",
      ],
      [
        "6.2",
        "Campuran mengekalkan komponennya",
        "Pilih kaedah pemisahan fizikal berdasarkan perbezaan sifat.",
      ],
      [
        "6.3",
        "Sebatian ialah bahan baharu",
        "Ikatan kimia menghasilkan sifat baharu dan mengekalkan jisim.",
      ],
      [
        "6.3",
        "Elektrolisis menguraikan sebatian",
        "Tenaga elektrik menguraikan air kepada dua gas yang boleh diuji.",
      ],
      [
        "Ulang kaji",
        "Kuasai perbezaan untuk peperiksaan",
        "Bandingkan perubahan dan latih penerangan situasi baharu.",
      ],
    ],
    particle: "Pilih zarah subatom",
    charge: "Cas",
    location: "Lokasi",
    neutral: "Mengapa atom bersifat neutral",
    molecule: "Molekul",
    element: "Unsur",
    compound: "Sebatian",
    history: "Perkembangan jadual",
    arrangement: "Peraturan susunan",
    regions: "Baca kawasan",
    applications: "Sifat unsur → kegunaan",
    compareProperties: "Bandingkan sifat",
    property: "Sifat",
    metal: "Logam",
    nonMetal: "Bukan logam",
    chooseMethod: "Pilih kaedah pemisahan",
    principle: "Bahan yang dipisahkan",
    example: "Contoh",
    selection: "Pilih berdasarkan",
    reactions: "Pembentukan sebatian",
    reactants: "Bahan tindak balas",
    product: "Hasil",
    electrolysis: "Elektrolisis air",
    setup: "Susunan radas",
    gasTests: "Hasil dan ujian gas",
    ratio: "Nisbah isi padu",
    changes: "Perubahan fizikal vs perubahan kimia",
    materials: "Campuran vs sebatian",
    facts: "Fakta skor tinggi",
    recall: "Ingatan aktif",
    summary: "Hukum bab",
    mark: "Tandakan Bab 6 selesai",
    marked: "Bab 6 telah selesai",
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
          className={`min-h-12 rounded-xl border px-4 py-2 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
            selected === index
              ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
              : "border-white/10 bg-slate-950/40 text-slate-300 hover:border-white/25"
          }`}
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
      <table className="w-full min-w-[620px] border-collapse text-left text-sm">
        <thead className="bg-cyan-300/10 text-cyan-100">
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
                  className={`px-4 py-3 leading-6 ${index === 0 ? "font-semibold text-white" : "text-slate-300"}`}
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

export function ScienceF1Chapter6VisualNotesBlock({
  id,
  content,
  lang = "en",
  onMarkRead,
  isRead = false,
  storageKey: _storageKey,
}: {
  id?: string;
  content: { en: Chapter6Content; bm: Chapter6Content };
  lang?: Lang;
  onMarkRead?: () => void;
  isRead?: boolean;
  storageKey?: string;
}) {
  const t = content[lang];
  const extra = chapter6Supplement[lang];
  const copy = ui[lang];
  const [particle, setParticle] = useState(0);
  const [property, setProperty] = useState(0);
  const [method, setMethod] = useState(0);

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#050b1d] text-slate-100 shadow-2xl shadow-cyan-950/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(34,211,238,.14),transparent_30%),radial-gradient(circle_at_90%_30%,rgba(168,85,247,.12),transparent_30%)]" />
      <div className="relative px-4 py-8 sm:px-7 sm:py-10 lg:px-10">
        <header className="rounded-3xl border border-cyan-300/20 bg-slate-950/55 p-5 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-black uppercase tracking-[.2em] text-cyan-300">
                {copy.eyebrow}
              </p>
              <h1 className="mt-3 font-display text-3xl font-black leading-tight text-white sm:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                {copy.subtitle}
              </p>
            </div>
            <div className="relative mx-auto grid h-36 w-36 shrink-0 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 lg:mx-0">
              <Orbit
                className="h-24 w-24 animate-[spin_14s_linear_infinite] text-cyan-300 motion-reduce:animate-none"
                aria-hidden="true"
              />
              <CircleDot className="absolute h-10 w-10 text-fuchsia-300" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-5">
            {copy.path.map(([code, label]) => (
              <div
                key={`${code}-${label}`}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3"
              >
                <span className="font-mono text-[10px] font-black uppercase text-cyan-300">
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
            <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
              <Panel>
                <div className="flex items-center gap-3">
                  <Atom className="h-6 w-6 text-cyan-300" />
                  <h3 className="font-bold text-white">{copy.particle}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {t.atomsAndMolecules.definition}
                </p>
                <div className="mt-4">
                  <Tabs
                    labels={t.atomsAndMolecules.subatomicParticles.map((item) => item.name)}
                    selected={particle}
                    onSelect={setParticle}
                  />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2" role="tabpanel">
                  <div className="rounded-xl bg-cyan-300/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                      {copy.charge}
                    </p>
                    <p className="mt-1 font-bold text-white">
                      {t.atomsAndMolecules.subatomicParticles[particle].charge}
                    </p>
                  </div>
                  <div className="rounded-xl bg-fuchsia-300/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-fuchsia-300">
                      {copy.location}
                    </p>
                    <p className="mt-1 font-bold text-white">
                      {t.atomsAndMolecules.subatomicParticles[particle].location}
                    </p>
                  </div>
                </div>
              </Panel>
              <div className="grid gap-5">
                <Panel>
                  <h3 className="font-bold text-cyan-200">{copy.neutral}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {t.atomsAndMolecules.neutralityNote}
                  </p>
                </Panel>
                <Panel>
                  <h3 className="font-bold text-fuchsia-200">{copy.molecule}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {t.atomsAndMolecules.moleculeDefinition}
                  </p>
                </Panel>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Panel>
                <h3 className="font-bold text-cyan-200">{copy.element}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {t.elementsAndCompounds.elementDefinition}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {t.elementsAndCompounds.elementExamples.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Panel>
              <Panel>
                <h3 className="font-bold text-fuchsia-200">{copy.compound}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {t.elementsAndCompounds.compoundDefinition}
                </p>
                <p className="mt-3 rounded-xl bg-fuchsia-300/10 p-3 text-sm text-fuchsia-100">
                  {t.elementsAndCompounds.separationNote}
                </p>
              </Panel>
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[1]} />
            <div className="grid gap-5 lg:grid-cols-2">
              <Panel>
                <div className="flex items-center gap-3">
                  <History className="h-6 w-6 text-violet-300" />
                  <h3 className="font-bold text-white">{copy.history}</h3>
                </div>
                <div className="mt-4 space-y-4">
                  {extra.periodicHistory.map((item) => (
                    <div key={item.scientist} className="border-l-2 border-violet-300 pl-4">
                      <p className="font-bold text-violet-200">{item.scientist}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{item.contribution}</p>
                    </div>
                  ))}
                </div>
              </Panel>
              <Panel>
                <div className="flex items-center gap-3">
                  <TableProperties className="h-6 w-6 text-cyan-300" />
                  <h3 className="font-bold text-white">{copy.arrangement}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{extra.periodicArrangement}</p>
                <p className="mt-3 rounded-xl bg-cyan-300/10 p-3 text-sm font-bold text-cyan-100">
                  {t.periodicTable.totalDiscovered}
                </p>
              </Panel>
            </div>
            <Panel>
              <h3 className="font-bold text-white">{copy.regions}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {extra.periodicRegions.map((item, index) => (
                  <div
                    key={item.name}
                    className={`rounded-xl border p-4 ${index === 0 ? "border-sky-300/30 bg-sky-300/10" : index === 1 ? "border-amber-300/30 bg-amber-300/10" : index === 2 ? "border-fuchsia-300/30 bg-fuchsia-300/10" : "border-emerald-300/30 bg-emerald-300/10"}`}
                  >
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-300">{item.location}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[2]} />
            <Panel>
              <h3 className="font-bold text-white">{copy.compareProperties}</h3>
              <div className="mt-4">
                <Tabs
                  labels={t.metalsVsNonMetals.comparison.map((item) => item.property)}
                  selected={property}
                  onSelect={setProperty}
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2" role="tabpanel">
                <div className="rounded-xl border border-sky-300/25 bg-sky-300/10 p-4">
                  <p className="text-xs font-bold uppercase text-sky-300">{copy.metal}</p>
                  <p className="mt-2 text-lg font-black text-white">
                    {t.metalsVsNonMetals.comparison[property].metal}
                  </p>
                </div>
                <div className="rounded-xl border border-amber-300/25 bg-amber-300/10 p-4">
                  <p className="text-xs font-bold uppercase text-amber-300">{copy.nonMetal}</p>
                  <p className="mt-2 text-lg font-black text-white">
                    {t.metalsVsNonMetals.comparison[property].nonMetal}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {t.metalsVsNonMetals.semiMetalNote}
              </p>
            </Panel>
            <div>
              <h3 className="mb-4 font-bold text-white">{copy.applications}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {extra.elementApplications.map((item) => (
                  <Panel key={item.element}>
                    <p className="font-bold text-cyan-200">{item.element}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.properties}</p>
                    <p className="mt-3 text-sm font-semibold text-white">{item.uses}</p>
                  </Panel>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[3]} />
            <Panel>
              <div className="flex items-center gap-3">
                <Magnet className="h-6 w-6 text-emerald-300" />
                <h3 className="font-bold text-white">{copy.chooseMethod}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{t.mixtures.definition}</p>
              <div className="mt-4">
                <Tabs
                  labels={t.mixtures.separationMethods.map((item) => item.name)}
                  selected={method}
                  onSelect={setMethod}
                />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2" role="tabpanel">
                <div className="rounded-xl bg-emerald-300/10 p-4">
                  <p className="text-xs font-bold uppercase text-emerald-300">{copy.principle}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {t.mixtures.separationMethods[method].usedFor}
                  </p>
                </div>
                <div className="rounded-xl bg-cyan-300/10 p-4">
                  <p className="text-xs font-bold uppercase text-cyan-300">{copy.example}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {t.mixtures.separationMethods[method].example}
                  </p>
                </div>
              </div>
            </Panel>
            <Panel>
              <h3 className="mb-3 font-bold text-white">{copy.selection}</h3>
              <Checklist items={t.mixtures.selectionFactors} />
            </Panel>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[4]} />
            <p className="max-w-3xl text-sm leading-6 text-slate-300">{t.compounds.definition}</p>
            <DataTable
              headers={[copy.reactants, copy.product]}
              rows={t.compounds.formations.map((item) => [item.reactants, item.product])}
            />
            <div className="grid gap-5 md:grid-cols-2">
              <Panel>
                <FlaskConical className="h-6 w-6 text-amber-300" />
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {t.compounds.alkaliMetalNote}
                </p>
              </Panel>
              <Panel>
                <Sparkles className="h-6 w-6 text-fuchsia-300" />
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {t.compounds.massConservationNote}
                </p>
              </Panel>
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[5]} />
            <Panel className="border-violet-300/20 bg-violet-300/[0.06]">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-yellow-300" />
                <h3 className="font-bold text-white">{copy.electrolysis}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {t.compounds.electrolysisDefinition}
              </p>
              <div className="mt-5 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-violet-300">
                    {copy.setup}
                  </p>
                  <Checklist items={extra.electrolysis.setup} />
                </div>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-violet-300">
                    {copy.gasTests}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {extra.electrolysis.products.map((item) => (
                      <div
                        key={item.electrode}
                        className="rounded-xl border border-white/10 bg-slate-950/40 p-4"
                      >
                        <p className="font-mono text-xs font-black text-yellow-300">
                          {item.electrode}
                        </p>
                        <p className="mt-2 font-bold text-white">{item.gas}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{item.test}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-cyan-300/25 bg-cyan-300/10 p-4">
                <TestTubes className="h-6 w-6 shrink-0 text-cyan-300" />
                <div>
                  <p className="text-xs font-bold uppercase text-cyan-300">{copy.ratio}</p>
                  <p className="mt-1 font-black text-white">{extra.electrolysis.volumeRatio}</p>
                </div>
              </div>
            </Panel>
          </section>

          <section className="space-y-6">
            <SectionHeading section={copy.sections[6]} />
            <div>
              <h3 className="mb-4 font-bold text-white">{copy.changes}</h3>
              <DataTable
                headers={[
                  lang === "en" ? "Characteristic" : "Ciri",
                  lang === "en" ? "Physical change" : "Perubahan fizikal",
                  lang === "en" ? "Chemical change" : "Perubahan kimia",
                ]}
                rows={t.physicalVsChemicalChange.comparison.map((item) => [
                  item.characteristic,
                  item.physicalChange,
                  item.chemicalChange,
                ])}
              />
            </div>
            <div>
              <h3 className="mb-4 font-bold text-white">{copy.materials}</h3>
              <DataTable
                headers={[
                  lang === "en" ? "Characteristic" : "Ciri",
                  lang === "en" ? "Mixture" : "Campuran",
                  lang === "en" ? "Compound" : "Sebatian",
                ]}
                rows={t.mixturesVsCompounds.map((item) => [
                  item.characteristic,
                  item.mixture,
                  item.compound,
                ])}
              />
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <Panel>
                <div className="flex items-center gap-3">
                  <BookOpenCheck className="h-6 w-6 text-emerald-300" />
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
                        <ChevronDown className="h-4 w-4 shrink-0 text-cyan-300 transition group-open:rotate-180" />
                      </summary>
                      <p className="pt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </Panel>
            </div>
            <Panel className="border-cyan-300/25 bg-gradient-to-br from-cyan-300/10 to-violet-300/10">
              <h3 className="font-bold text-cyan-200">{copy.summary}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">{t.chapterSummary}</p>
            </Panel>
            {onMarkRead && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={onMarkRead}
                  disabled={isRead}
                  className={`min-h-12 rounded-full px-6 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none ${isRead ? "cursor-default bg-emerald-300/15 text-emerald-200" : "bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 hover:brightness-110"}`}
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
