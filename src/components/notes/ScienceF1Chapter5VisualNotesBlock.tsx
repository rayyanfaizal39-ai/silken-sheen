import { useState, type ReactNode } from "react";
import {
  Beaker,
  BookOpenCheck,
  Check,
  ChevronRight,
  CircleDot,
  Cloud,
  Droplets,
  Flame,
  Gauge,
  Snowflake,
  Sparkles,
  Scale,
  TestTube2,
  Thermometer,
  Wind,
} from "lucide-react";
import type { Chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Form 1 Science · Chapter 5",
    title: "Matter is particles in motion",
    subtitle:
      "See how mass, space, particle arrangement, energy, and attraction explain every state and physical change.",
    path: [
      ["5.1", "Matter"],
      ["5.1", "Properties"],
      ["5.2", "Particles"],
      ["5.2", "Diffusion"],
      ["5.2", "State changes"],
      ["5.2", "Mass conserved"],
    ],
    sections: [
      [
        "5.1",
        "What counts as matter?",
        "Matter has mass and occupies space - even when it is invisible, like air.",
      ],
      [
        "5.1",
        "Matter has identifying properties",
        "Physical properties can be observed without making a new substance; chemical properties appear in reactions.",
      ],
      [
        "5.2",
        "Three states, one particle theory",
        "Arrangement, movement, attraction, and spacing determine how a material behaves.",
      ],
      [
        "5.2",
        "Diffusion reveals moving particles",
        "Particles spread from high concentration to low concentration until they are evenly distributed.",
      ],
      [
        "5.2",
        "Heat drives reversible state changes",
        "Absorbing heat raises particle energy; releasing heat lowers it.",
      ],
      [
        "5.2",
        "Physical change does not change total mass",
        "Arrangement, spacing, and energy can change while particle number stays the same.",
      ],
      [
        "Review",
        "Use matter ideas in real life",
        "Apply evaporation, condensation, and particle theory to familiar situations.",
      ],
    ],
    definition: "Definition",
    matter: "Matter",
    notMatter: "Not matter",
    proof: "Evidence that it has mass and occupies space",
    method: "Method",
    conclusion: "Conclusion",
    physical: "Physical properties",
    chemical: "Chemical properties",
    classify: "Classify materials using",
    density: "Density comparisons",
    points: "Melting and boiling points",
    solubility: "Solubility",
    chooseState: "Choose a state",
    shape: "Shape",
    mass: "Mass",
    volume: "Volume",
    compression: "Compressibility",
    spacing: "Particle spacing",
    arrangement: "Arrangement",
    movement: "Movement",
    chooseDiffusion: "Compare the diffusion experiment",
    relationship: "Scientific relationship",
    chooseChange: "Choose a change of state",
    thermal: "Heat action",
    mechanism: "Particle mechanism",
    constant: "Why temperature can stay constant",
    conservation: "Experiment 5.6: conservation of mass",
    observation: "Observation and conclusion",
    examples: "Everyday examples",
    recall: "Active recall",
    summary: "Chapter rule",
    mark: "Mark Chapter 5 as read",
    marked: "Chapter 5 completed",
  },
  bm: {
    eyebrow: "Sains Tingkatan 1 · Bab 5",
    title: "Jirim ialah zarah yang bergerak",
    subtitle:
      "Lihat bagaimana jisim, ruang, susunan zarah, tenaga, dan daya tarikan menerangkan setiap keadaan serta perubahan fizikal.",
    path: [
      ["5.1", "Jirim"],
      ["5.1", "Sifat"],
      ["5.2", "Zarah"],
      ["5.2", "Resapan"],
      ["5.2", "Perubahan keadaan"],
      ["5.2", "Jisim terpelihara"],
    ],
    sections: [
      [
        "5.1",
        "Apakah yang dikira sebagai jirim?",
        "Jirim mempunyai jisim dan memenuhi ruang - walaupun tidak kelihatan, seperti udara.",
      ],
      [
        "5.1",
        "Jirim mempunyai sifat pengenalan",
        "Sifat fizikal dapat diperhatikan tanpa menghasilkan bahan baharu; sifat kimia muncul dalam tindak balas.",
      ],
      [
        "5.2",
        "Tiga keadaan, satu teori zarah",
        "Susunan, pergerakan, tarikan, dan jarak menentukan kelakuan bahan.",
      ],
      [
        "5.2",
        "Resapan membuktikan zarah bergerak",
        "Zarah tersebar dari kepekatan tinggi ke kepekatan rendah sehingga sekata.",
      ],
      [
        "5.2",
        "Haba memacu perubahan keadaan boleh balik",
        "Penyerapan haba menaikkan tenaga zarah; pembebasan haba menurunkannya.",
      ],
      [
        "5.2",
        "Perubahan fizikal tidak mengubah jumlah jisim",
        "Susunan, jarak, dan tenaga boleh berubah sementara bilangan zarah kekal sama.",
      ],
      [
        "Ulang kaji",
        "Gunakan idea jirim dalam kehidupan",
        "Aplikasikan penyejatan, kondensasi, dan teori zarah pada situasi harian.",
      ],
    ],
    definition: "Definisi",
    matter: "Jirim",
    notMatter: "Bukan jirim",
    proof: "Bukti mempunyai jisim dan memenuhi ruang",
    method: "Kaedah",
    conclusion: "Kesimpulan",
    physical: "Sifat fizikal",
    chemical: "Sifat kimia",
    classify: "Kelaskan bahan menggunakan",
    density: "Perbandingan ketumpatan",
    points: "Takat lebur dan takat didih",
    solubility: "Keterlarutan",
    chooseState: "Pilih satu keadaan",
    shape: "Bentuk",
    mass: "Jisim",
    volume: "Isi padu",
    compression: "Kebolehmampatan",
    spacing: "Jarak zarah",
    arrangement: "Susunan",
    movement: "Pergerakan",
    chooseDiffusion: "Bandingkan eksperimen resapan",
    relationship: "Hubungan saintifik",
    chooseChange: "Pilih perubahan keadaan",
    thermal: "Tindakan haba",
    mechanism: "Mekanisme zarah",
    constant: "Mengapa suhu boleh kekal malar",
    conservation: "Eksperimen 5.6: keabadian jisim",
    observation: "Pemerhatian dan kesimpulan",
    examples: "Contoh harian",
    recall: "Ingatan aktif",
    summary: "Hukum bab",
    mark: "Tandakan Bab 5 selesai",
    marked: "Bab 5 telah selesai",
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

function TabButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={`min-h-12 cursor-pointer rounded-xl border px-4 py-2 text-left text-sm font-black transition-colors hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${selected ? "border-sky-300 bg-sky-300/15 text-white" : "border-white/10 bg-white/[0.035] text-slate-300"}`}
    >
      {children}
    </button>
  );
}

function ParticleDiagram({ state }: { state: string }) {
  const gas = /gas/i.test(state);
  const liquid = /liquid|cecair/i.test(state);
  return (
    <div
      className={`grid h-32 w-full grid-cols-6 gap-2 rounded-2xl border border-sky-300/15 bg-slate-950/50 p-4 ${gas ? "content-between" : liquid ? "content-end" : "content-center"}`}
    >
      {Array.from({ length: gas ? 12 : 24 }, (_, index) => (
        <CircleDot
          key={index}
          className={`h-4 w-4 text-sky-300 ${gas && index % 3 === 0 ? "translate-x-4" : ""}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function ScienceF1Chapter5VisualNotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter5Content; bm: Chapter5Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const c = ui[lang];
  const [propertyType, setPropertyType] = useState<"physical" | "chemical">("physical");
  const [stateIndex, setStateIndex] = useState(0);
  const [diffusionIndex, setDiffusionIndex] = useState(0);
  const [changeIndex, setChangeIndex] = useState(0);
  const state = t.statesOfMatter.stateProperties[stateIndex];
  const diffusion = t.statesOfMatter.diffusionResults[diffusionIndex];
  const change = t.statesOfMatter.changesOfState[changeIndex];
  const properties =
    propertyType === "physical"
      ? t.matterInNature.physicalProperties
      : t.matterInNature.chemicalProperties;
  const propertyLabels = [
    [c.shape, state.shape],
    [c.mass, state.mass],
    [c.volume, state.volume],
    [c.compression, state.compressibility],
    [c.spacing, state.spaceBetweenParticles],
    [c.arrangement, state.particleArrangement],
    [c.movement, state.particleMovement],
  ];

  return (
    <section
      id={id}
      data-lang={lang}
      data-chapter="5"
      className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-sky-300/15 bg-[#07131d] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(circle_at_14%_8%,rgba(14,165,233,.2),transparent_34%),radial-gradient(circle_at_84%_10%,rgba(45,212,191,.14),transparent_30%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-sky-400/15 via-slate-950/40 to-teal-400/10 p-5 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-sky-200">
            <Beaker className="h-4 w-4" aria-hidden="true" />
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
                <span className="font-mono text-xs font-black text-teal-300">{item[0]}</span>
                <p className="mt-1 text-xs font-black text-white">{item[1]}</p>
                {index < c.path.length - 1 && (
                  <ChevronRight
                    className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-[#07131d] p-1 text-sky-300 xl:block"
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
                <Scale className="h-7 w-7 text-sky-300" />
                <h3 className="font-black text-white">{c.definition}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{t.matterInNature.definition}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-xl bg-emerald-300/[0.08] p-3">
                  <p className="font-black text-emerald-100">{c.matter}</p>
                  <p className="mt-1 text-sm text-slate-300">
                    {lang === "en"
                      ? "Living things, water, soil, rocks, and air"
                      : "Benda hidup, air, tanah, batu, dan udara"}
                  </p>
                </div>
                <div className="rounded-xl bg-rose-300/[0.07] p-3">
                  <p className="font-black text-rose-100">{c.notMatter}</p>
                  <p className="mt-1 text-sm text-slate-300">
                    {t.matterInNature.nonMatterExamples.join(" · ")}
                  </p>
                </div>
              </div>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <TestTube2 className="h-7 w-7 text-teal-300" />
                <h3 className="font-black text-white">{c.proof}</h3>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.matterInNature.evidenceActivities.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <p className="font-black text-white">{item.title}</p>
                    <p className="mt-3 text-xs font-black uppercase tracking-wider text-sky-200">
                      {c.method}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{item.method}</p>
                    <p className="mt-3 text-xs font-black uppercase tracking-wider text-emerald-200">
                      {c.conclusion}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{item.conclusion}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[1]} />
          <Panel>
            <div className="grid grid-cols-2 gap-2" role="tablist" aria-label={c.physical}>
              <TabButton
                selected={propertyType === "physical"}
                onClick={() => setPropertyType("physical")}
              >
                {c.physical}
              </TabButton>
              <TabButton
                selected={propertyType === "chemical"}
                onClick={() => setPropertyType("chemical")}
              >
                {c.chemical}
              </TabButton>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {properties.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/[0.035] p-4"
                >
                  <p className="font-black text-white">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </Panel>
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <h3 className="font-black text-white">{c.classify}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.matterInNature.classificationCharacteristics.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-sky-300/20 bg-sky-300/[0.07] px-3 py-1 text-xs font-bold text-sky-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <h3 className="mt-5 font-black text-white">{c.density}</h3>
              <div className="mt-3 space-y-2">
                {t.matterInNature.densityClassification.map((item) => (
                  <div
                    key={item.substance}
                    className="rounded-xl bg-white/5 p-3 text-sm text-slate-300"
                  >
                    <b className="text-white">{item.higherDensity}</b> &gt; {item.lowerDensity}
                  </div>
                ))}
              </div>
            </Panel>
            <Panel>
              <h3 className="font-black text-white">{c.points}</h3>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {t.matterInNature.meltingBoilingPoints.map((item) => (
                  <div key={item.substance} className="rounded-xl bg-white/5 p-3">
                    <p className="font-black text-white">{item.substance}</p>
                    <p className="mt-2 font-mono text-xs text-sky-200">
                      {item.meltingPoint} → {item.boilingPoint}
                    </p>
                  </div>
                ))}
              </div>
              <h3 className="mt-5 font-black text-white">{c.solubility}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {t.matterInNature.solubilityDefinition}
              </p>
            </Panel>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[2]} />
          <Panel>
            <p className="text-sm leading-6 text-slate-300">{t.statesOfMatter.kineticTheory}</p>
            <div
              className="mt-5 grid gap-2 sm:grid-cols-3"
              role="tablist"
              aria-label={c.chooseState}
            >
              {t.statesOfMatter.stateProperties.map((item, index) => (
                <TabButton
                  key={item.state}
                  selected={stateIndex === index}
                  onClick={() => setStateIndex(index)}
                >
                  {item.state}
                </TabButton>
              ))}
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[.7fr_1.3fr]">
              <ParticleDiagram state={state.state} />
              <div className="grid gap-2 sm:grid-cols-2">
                {propertyLabels.map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs font-black uppercase tracking-wider text-sky-200">
                      {label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[3]} />
          <Panel>
            <p className="text-sm leading-6 text-slate-300">
              {t.statesOfMatter.diffusionDefinition}
            </p>
            <div
              className="mt-4 grid gap-2 sm:grid-cols-3"
              role="tablist"
              aria-label={c.chooseDiffusion}
            >
              {t.statesOfMatter.diffusionResults.map((item, index) => (
                <TabButton
                  key={item.state}
                  selected={diffusionIndex === index}
                  onClick={() => setDiffusionIndex(index)}
                >
                  {item.state}
                </TabButton>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-sky-300/20 bg-sky-300/[0.07] p-5">
              <p className="text-2xl font-black text-white">{diffusion.state}</p>
              <p className="mt-1 font-mono text-sm font-black text-teal-200">{diffusion.rate}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{diffusion.observation}</p>
            </div>
            <p className="mt-4 rounded-xl bg-emerald-300/[0.08] p-3 text-center font-black text-emerald-100">
              {c.relationship}: {lang === "en" ? "Gas > Liquid > Solid" : "Gas > Cecair > Pepejal"}
            </p>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[4]} />
          <Panel>
            <div className="flex items-center gap-3">
              <Thermometer className="h-7 w-7 text-amber-300" />
              <h3 className="font-black text-white">{c.chooseChange}</h3>
            </div>
            <div
              className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
              role="tablist"
              aria-label={c.chooseChange}
            >
              {t.statesOfMatter.changesOfState.map((item, index) => (
                <TabButton
                  key={item.name}
                  selected={changeIndex === index}
                  onClick={() => setChangeIndex(index)}
                >
                  {item.name}
                </TabButton>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 font-black text-white">
                  {change.initialState}
                </span>
                <ChevronRight className="h-5 w-5 text-amber-300" />
                <span className="rounded-full bg-white/10 px-3 py-1 font-black text-white">
                  {change.finalState}
                </span>
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-wider text-amber-200">
                {c.thermal}: {change.thermalAction}
              </p>
              <div className="mt-3">
                <Checklist items={change.description} />
              </div>
            </div>
          </Panel>
          <Panel>
            <div className="flex items-center gap-3">
              <Gauge className="h-7 w-7 text-rose-300" />
              <h3 className="font-black text-white">{c.constant}</h3>
            </div>
            <div className="mt-4">
              <Checklist items={t.statesOfMatter.constantFacts} />
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[5]} />
          <Panel>
            <div className="flex items-center gap-3">
              <Scale className="h-7 w-7 text-emerald-300" />
              <h3 className="font-black text-white">{c.conservation}</h3>
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              {t.statesOfMatter.conservationExperiments.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"
                >
                  <span className="font-mono text-xs font-black text-teal-300">0{index + 1}</span>
                  <p className="mt-2 text-lg font-black text-white">{item.title}</p>
                  <p className="mt-3 text-xs font-black uppercase tracking-wider text-sky-200">
                    {c.method}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{item.procedure}</p>
                  <p className="mt-3 text-xs font-black uppercase tracking-wider text-emerald-200">
                    {c.observation}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{item.observation}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[6]} />
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <h3 className="font-black text-white">{c.examples}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.statesOfMatter.everydayExamples.map((item, index) => {
                  const Icon = [Snowflake, Cloud, Wind, Droplets][index] ?? Sparkles;
                  return (
                    <div key={item.process} className="rounded-xl bg-white/5 p-3">
                      <Icon className="h-6 w-6 text-sky-300" aria-hidden="true" />
                      <p className="mt-2 font-black text-white">{item.label}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-300">{item.process}</p>
                    </div>
                  );
                })}
              </div>
            </Panel>
            <Panel>
              <h3 className="font-black text-white">{c.recall}</h3>
              <div className="mt-4 space-y-3">
                {t.statesOfMatter.activeRecall.map((item, index) => (
                  <details
                    key={item.question}
                    className="group rounded-xl border border-white/10 bg-white/[0.035] p-3"
                  >
                    <summary className="cursor-pointer list-none font-black text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
                      <span className="mr-2 font-mono text-teal-300">Q{index + 1}</span>
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
                  </details>
                ))}
              </div>
            </Panel>
          </div>
          <Panel>
            <div className="flex items-center gap-3">
              <Flame className="h-7 w-7 text-amber-300" />
              <h3 className="font-black text-white">{c.summary}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {lang === "en"
                ? "Matter is conserved during physical changes: particles may move faster or slower, spread out or pack together, but they are not created or destroyed."
                : "Jirim terpelihara semasa perubahan fizikal: zarah mungkin bergerak lebih laju atau perlahan, berjauhan atau merapat, tetapi tidak dicipta atau dimusnahkan."}
            </p>
          </Panel>
          {onMarkRead && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onMarkRead}
                disabled={isRead}
                className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${isRead ? "cursor-default bg-emerald-500/20 text-emerald-200" : "bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:scale-105 motion-reduce:hover:scale-100"}`}
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
