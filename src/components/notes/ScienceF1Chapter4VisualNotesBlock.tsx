import { Chapter4MenstrualCycle } from "./blocks/Chapter4MenstrualCycle";
import { Chapter4PregnancyVisuals } from "./blocks/Chapter4PregnancyVisuals";
import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  BookOpenCheck,
  Check,
  ChevronRight,
  Dna,
  Egg,
  Flower2,
  HeartPulse,
  Microscope,
  Sprout,
  TestTube2,
  Wind,
} from "lucide-react";
import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";

import { Chapter4ReproductionVisuals } from "./blocks/Chapter4ReproductionVisuals";
import { ReproductiveSystemPanel } from "./blocks/Chapter4ReproductiveAnatomy";
import { Chapter4Gametes, Chapter4Puberty } from "./blocks/Chapter4GametesPuberty";

type Lang = "en" | "bm";

const ui = {
  en: {
    eyebrow: "Form 1 Science · Chapter 4",
    title: "Reproduction builds the next generation",
    subtitle:
      "Follow the complete story from cells and human development to flowers, seeds, and germination.",
    sections: [
      [
        "4.1",
        "Two ways to reproduce",
        "Sexual reproduction creates variation; asexual reproduction makes clones.",
      ],
      [
        "4.2",
        "Human reproductive systems",
        "Match every structure to its function, then compare the two gametes.",
      ],
      [
        "4.3",
        "A 28-day menstrual cycle",
        "Four phases prepare the uterus for a possible pregnancy.",
      ],
      [
        "4.4",
        "From fertilisation to birth",
        "One fused cell divides, implants, and develops over about 38 weeks.",
      ],
      [
        "4.5-4.6",
        "Healthy development and family planning",
        "Nutrition supports development while harmful substances create serious risks.",
      ],
      [
        "4.7",
        "Flowers transfer genetic information",
        "Pollination brings pollen to a stigma before fertilisation can occur.",
      ],
      [
        "4.7",
        "Seeds begin a new plant",
        "A seed needs water, oxygen, and a suitable temperature - not light - to germinate.",
      ],
      [
        "Review",
        "Lock in the chapter",
        "Use the exam facts and glossary for a final retrieval pass.",
      ],
    ],
    definition: "Core definition",
    sexual: "Sexual",
    asexual: "Asexual",
    parentsGametes: "Parents and gametes",
    variation: "Genetic result",
    occurs: "Occurs in",
    fertilisation: "Types of fertilisation",
    internal: "Internal",
    external: "External",
    examples: "Examples",
    chooseSystem: "Choose a system",
    male: "Male",
    female: "Female",
    part: "Structure",
    fn: "Function",
    gametes: "Sperm compared with ovum",
    sperm: "Sperm",
    ovum: "Ovum",
    puberty: "Changes at puberty",
    typicalAge: "Typical age",
    choosePhase: "Choose a phase",
    controlled: "Controlled by",
    average: "Average length",
    ovulation: "Ovulation checkpoint",
    hygiene: "Personal hygiene",
    irregular: "Irregular menstruation",
    causes: "Possible causes",
    effects: "Possible effects",
    process: "Development pathway",
    support: "Foetal support structures",
    nutrients: "Nutrients during pregnancy",
    harmful: "Substances to avoid",
    breastfeeding: "Why breastfeeding helps",
    infertility: "Infertility and treatments",
    factors: "Factors",
    treatments: "Treatments",
    contraception: "Contraception methods",
    chooseAgent: "Compare pollinating agents",
    flowerParts: "Flower structures",
    flowerTypes: "Flower types",
    pollinationTypes: "Self vs cross-pollination",
    advantages: "Advantages of cross-pollination",
    plantFertilisation: "Plant fertilisation pathway",
    becomes: "develops into",
    seedParts: "Inside a seed",
    seedTypes: "Monocot vs dicot",
    germinationTypes: "Epigeal vs hypogeal",
    chooseCondition: "Experiment 4.1: choose a germination condition",
    examTip: "Exam tip",
    examFacts: "Key exam facts",
    glossary: "Glossary",
    summary: "Chapter summary",
    mark: "Mark Chapter 4 as read",
    marked: "Chapter 4 completed",
  },
  bm: {
    eyebrow: "Sains Tingkatan 1 · Bab 4",
    title: "Pembiakan membina generasi seterusnya",
    subtitle:
      "Ikuti keseluruhan cerita daripada sel dan perkembangan manusia kepada bunga, biji benih, dan percambahan.",
    sections: [
      [
        "4.1",
        "Dua cara untuk membiak",
        "Pembiakan seks menghasilkan variasi; pembiakan aseks menghasilkan klon.",
      ],
      [
        "4.2",
        "Sistem pembiakan manusia",
        "Padankan setiap struktur dengan fungsinya, kemudian bandingkan kedua-dua gamet.",
      ],
      ["4.3", "Kitar haid 28 hari", "Empat fasa menyediakan uterus untuk kemungkinan kehamilan."],
      [
        "4.4",
        "Daripada persenyawaan hingga kelahiran",
        "Satu sel yang bercantum membahagi, tertanam, dan berkembang selama kira-kira 38 minggu.",
      ],
      [
        "4.5-4.6",
        "Perkembangan sihat dan perancangan keluarga",
        "Nutrisi menyokong perkembangan manakala bahan berbahaya membawa risiko serius.",
      ],
      [
        "4.7",
        "Bunga memindahkan maklumat genetik",
        "Pendebungaan membawa debunga ke stigma sebelum persenyawaan berlaku.",
      ],
      [
        "4.7",
        "Biji benih memulakan tumbuhan baharu",
        "Biji benih memerlukan air, oksigen, dan suhu sesuai - bukan cahaya - untuk bercambah.",
      ],
      [
        "Ulang kaji",
        "Kukuhkan bab ini",
        "Gunakan fakta peperiksaan dan glosari untuk latihan ingatan terakhir.",
      ],
    ],
    definition: "Definisi utama",
    sexual: "Seks",
    asexual: "Aseks",
    parentsGametes: "Induk dan gamet",
    variation: "Hasil genetik",
    occurs: "Berlaku pada",
    fertilisation: "Jenis persenyawaan",
    internal: "Dalaman",
    external: "Luaran",
    examples: "Contoh",
    chooseSystem: "Pilih sistem",
    male: "Lelaki",
    female: "Perempuan",
    part: "Struktur",
    fn: "Fungsi",
    gametes: "Perbandingan sperma dengan ovum",
    sperm: "Sperma",
    ovum: "Ovum",
    puberty: "Perubahan semasa akil baligh",
    typicalAge: "Usia lazim",
    choosePhase: "Pilih satu fasa",
    controlled: "Dikawal oleh",
    average: "Tempoh purata",
    ovulation: "Titik semak ovulasi",
    hygiene: "Kebersihan diri",
    irregular: "Haid tidak teratur",
    causes: "Punca yang mungkin",
    effects: "Kesan yang mungkin",
    process: "Laluan perkembangan",
    support: "Struktur sokongan fetus",
    nutrients: "Nutrien semasa mengandung",
    harmful: "Bahan yang perlu dielakkan",
    breastfeeding: "Mengapa penyusuan susu ibu membantu",
    infertility: "Kemandulan dan rawatan",
    factors: "Faktor",
    treatments: "Rawatan",
    contraception: "Kaedah kontraseptif",
    chooseAgent: "Bandingkan agen pendebungaan",
    flowerParts: "Struktur bunga",
    flowerTypes: "Jenis bunga",
    pollinationTypes: "Pendebungaan sendiri lwn kacukan",
    advantages: "Kelebihan pendebungaan kacukan",
    plantFertilisation: "Laluan persenyawaan tumbuhan",
    becomes: "berkembang menjadi",
    seedParts: "Di dalam biji benih",
    seedTypes: "Monokotiledon lwn dikotiledon",
    germinationTypes: "Epigeal lwn hipogeal",
    chooseCondition: "Eksperimen 4.1: pilih syarat percambahan",
    examTip: "Tip peperiksaan",
    examFacts: "Fakta penting peperiksaan",
    glossary: "Glosari",
    summary: "Rumusan bab",
    mark: "Tandakan Bab 4 selesai",
    marked: "Bab 4 telah selesai",
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
      <p className="font-mono text-xs font-black uppercase tracking-[.18em] text-fuchsia-300">
        {section[0]}
      </p>
      <h2 className="mt-2 font-display text-2xl font-black leading-tight text-white sm:text-3xl">
        {section[1]}
      </h2>
      {section[2] && (
        <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">{section[2]}</p>
      )}
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
      className={`min-h-12 cursor-pointer rounded-xl border px-4 py-2 text-left text-sm font-black transition-colors hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 ${
        selected
          ? "border-fuchsia-300 bg-fuchsia-300/15 text-white"
          : "border-white/10 bg-white/[0.035] text-slate-300"
      }`}
    >
      {children}
    </button>
  );
}

export function ScienceF1Chapter4VisualNotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter4Content; bm: Chapter4Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const c = ui[lang];
  const [pollinator, setPollinator] = useState(0);
  const [germinationCondition, setGerminationCondition] = useState(0);
  const selectedPollinator = t.plantReproduction.pollinatingAgents[pollinator];
  const selectedCondition = t.plantReproduction.germinationConditionDetails[germinationCondition];

  return (
    <section
      id={id}
      data-lang={lang}
      data-chapter="4"
      className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-fuchsia-300/15 bg-[#061923] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(circle_at_12%_7%,rgba(217,70,239,.2),transparent_32%),radial-gradient(circle_at_86%_12%,rgba(34,211,238,.14),transparent_30%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-fuchsia-400/15 via-slate-950/40 to-cyan-400/10 p-5 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-fuchsia-200">
            <Dna className="h-4 w-4" aria-hidden="true" />
            {c.eyebrow}
          </div>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-[1.04] text-white sm:text-5xl">
            {t.chapterTitle}
          </h1>
          <div
            data-chapter-path="true"
            className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {t.officialSubtopics.map((item, index) => (
              <div
                key={item.number}
                className="relative rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <span className="font-mono text-xs font-black text-cyan-300">{item.number}</span>
                <p className="mt-1 text-xs font-black text-white">{item.title}</p>
                {index < t.officialSubtopics.length - 1 && (
                  <ChevronRight
                    className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-[#061923] p-1 text-fuchsia-300 xl:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </header>

        <section data-curriculum-subtopic="4.1" className="space-y-6">
          <SectionHeading
            section={[t.officialSubtopics[0].number, t.officialSubtopics[0].title, ""]}
          />
          <Chapter4ReproductionVisuals content={t} lang={lang} />
        </section>
        <section data-curriculum-subtopic="4.2" className="space-y-6">
          <SectionHeading
            section={[t.officialSubtopics[1].number, t.officialSubtopics[1].title, ""]}
          />
          <ReproductiveSystemPanel content={t} lang={lang} sex="male" />
          <ReproductiveSystemPanel content={t} lang={lang} sex="female" />
          <Chapter4Gametes content={t} lang={lang} />
          <Chapter4Puberty content={t} lang={lang} />
        </section>

        <section data-curriculum-subtopic="4.3" className="space-y-6">
          <SectionHeading
            section={[t.officialSubtopics[2].number, t.officialSubtopics[2].title, ""]}
          />
          <Chapter4MenstrualCycle content={t} lang={lang} />
        </section>
        <section data-curriculum-subtopic="4.4" className="space-y-6">
          <SectionHeading
            section={[t.officialSubtopics[3].number, t.officialSubtopics[3].title, ""]}
          />
          <Chapter4PregnancyVisuals content={t} lang={lang} />
        </section>

        <div className="space-y-6">
          <SectionHeading
            section={[t.officialSubtopics[4].number, t.officialSubtopics[4].title, ""]}
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <HeartPulse className="h-7 w-7 text-rose-300" />
                <h3 className="font-black text-white">{c.nutrients}</h3>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.foetalDevelopmentFactors.nutrientNeeds.map((item) => (
                  <div key={item.nutrient} className="rounded-xl bg-white/5 p-3">
                    <p className="font-black text-white">{item.nutrient}</p>
                    <p className="mt-1 text-xs font-bold text-fuchsia-200">{item.examples}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-300">{item.fn}</p>
                  </div>
                ))}
              </div>
            </Panel>
            <div className="space-y-4">
              <Panel>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-7 w-7 text-rose-300" />
                  <h3 className="font-black text-white">{c.harmful}</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {t.foetalDevelopmentFactors.harmfulSubstances.map((item) => (
                    <div
                      key={item.substance}
                      className="rounded-xl border border-rose-300/15 bg-rose-300/[0.06] p-3"
                    >
                      <p className="font-black text-rose-100">{item.substance}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-300">
                        {item.effects.join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
              <Panel>
                <h3 className="font-black text-white">{c.breastfeeding}</h3>
                <div className="mt-4">
                  <Checklist items={t.foetalDevelopmentFactors.breastfeedingBenefits} />
                </div>
              </Panel>
            </div>
          </div>
          <SectionHeading
            section={[t.officialSubtopics[5].number, t.officialSubtopics[5].title, ""]}
          />
          <Panel>
            <div className="flex items-center gap-3">
              <TestTube2 className="h-7 w-7 text-cyan-300" />
              <h3 className="font-black text-white">{c.infertility}</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{t.infertility.definition}</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div>
                <p className="font-black text-cyan-100">
                  {c.male} · {c.factors}
                </p>
                <div className="mt-2">
                  <Checklist items={t.infertility.maleFactors} />
                </div>
              </div>
              <div>
                <p className="font-black text-fuchsia-100">
                  {c.female} · {c.factors}
                </p>
                <div className="mt-2">
                  <Checklist items={t.infertility.femaleFactors} />
                </div>
              </div>
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-wider text-emerald-200">
              {c.treatments}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {t.infertility.treatments.map((item) => (
                <div key={item.name} className="rounded-xl bg-emerald-300/[0.07] p-3">
                  <p className="font-black text-emerald-100">{item.name}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <h3 className="font-black text-white">{c.contraception}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {t.infertility.contraceptionMethods.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-white/10 bg-white/[0.035] p-3"
                >
                  <p className="font-black text-white">{item.name}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-wider text-fuchsia-200">
                    {item.classification}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[5]} />
          <div className="grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
            <Panel>
              <div className="flex items-center gap-3">
                <Flower2 className="h-7 w-7 text-fuchsia-300" />
                <h3 className="font-black text-white">{c.flowerParts}</h3>
              </div>
              <div className="mt-4 space-y-3">
                {t.plantReproduction.flowerParts.map((item) => (
                  <div key={item.part} className="rounded-xl bg-white/5 p-3">
                    <p className="font-black text-white">{item.part}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{item.function}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 font-black text-white">{c.flowerTypes}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {t.plantReproduction.flowerTypes.bisexual}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {t.plantReproduction.flowerTypes.unisexual} ·{" "}
                {t.plantReproduction.flowerTypes.unisexualExamples.join(", ")}
              </p>
            </Panel>
            <Panel>
              <div className="flex items-center gap-3">
                <Wind className="h-7 w-7 text-cyan-300" />
                <h3 className="font-black text-white">{c.chooseAgent}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {t.plantReproduction.pollinationDefinition}
              </p>
              <div
                className="mt-4 grid grid-cols-2 gap-2"
                role="tablist"
                aria-label={c.chooseAgent}
              >
                {t.plantReproduction.pollinatingAgents.map((item, index) => (
                  <TabButton
                    key={item.agent}
                    selected={pollinator === index}
                    onClick={() => setPollinator(index)}
                  >
                    {item.agent}
                  </TabButton>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
                <p className="font-black text-cyan-100">{selectedPollinator.agent}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedPollinator.mechanism}
                </p>
                <div className="mt-3">
                  <Checklist items={selectedPollinator.flowerCharacteristics} />
                </div>
                <p className="mt-3 text-xs font-bold text-fuchsia-200">
                  {c.examples}: {selectedPollinator.examples.join(", ")}
                </p>
              </div>
              <p className="mt-5 font-black text-white">{c.pollinationTypes}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <p className="rounded-xl bg-white/5 p-3 text-sm leading-6 text-slate-300">
                  {t.plantReproduction.pollinationTypes.self}
                </p>
                <p className="rounded-xl bg-white/5 p-3 text-sm leading-6 text-slate-300">
                  {t.plantReproduction.pollinationTypes.cross}
                </p>
              </div>
              <p className="mt-5 font-black text-white">{c.advantages}</p>
              <div className="mt-3">
                <Checklist items={t.plantReproduction.crossPollinationAdvantages} />
              </div>
            </Panel>
          </div>
          <Panel>
            <div className="flex items-center gap-3">
              <Microscope className="h-7 w-7 text-fuchsia-300" />
              <h3 className="font-black text-white">{c.plantFertilisation}</h3>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.plantReproduction.fertilisationSteps.map((step, index) => (
                <div key={step} className="rounded-xl bg-white/5 p-3">
                  <span className="font-mono text-xs font-black text-cyan-300">0{index + 1}</span>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {t.plantReproduction.afterFertilisation.map((item) => (
                <p
                  key={item.source}
                  className="rounded-xl bg-emerald-300/[0.08] p-4 text-center font-black text-emerald-100"
                >
                  {item.source} <ChevronRight className="mx-2 inline h-4 w-4" /> {c.becomes}{" "}
                  <span className="text-white">{item.outcome}</span>
                </p>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[6]} />
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <Egg className="h-7 w-7 text-amber-300" />
                <h3 className="font-black text-white">{c.seedParts}</h3>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.plantReproduction.seedParts.map((item) => (
                  <div key={item.part} className="rounded-xl bg-white/5 p-3">
                    <p className="font-black text-amber-100">{item.part}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-300">{item.function}</p>
                  </div>
                ))}
              </div>
            </Panel>
            <div className="space-y-4">
              <Panel>
                <h3 className="font-black text-white">{c.seedTypes}</h3>
                <div className="mt-3 space-y-2">
                  <p className="rounded-xl bg-white/5 p-3 text-sm text-slate-300">
                    {t.plantReproduction.seedTypes.monocotyledonous}
                  </p>
                  <p className="rounded-xl bg-white/5 p-3 text-sm text-slate-300">
                    {t.plantReproduction.seedTypes.dicotyledonous}
                  </p>
                </div>
              </Panel>
              <Panel>
                <h3 className="font-black text-white">{c.germinationTypes}</h3>
                <div className="mt-3 space-y-2">
                  <p className="rounded-xl bg-white/5 p-3 text-sm text-slate-300">
                    {t.plantReproduction.germinationTypes.epigeal}
                  </p>
                  <p className="rounded-xl bg-white/5 p-3 text-sm text-slate-300">
                    {t.plantReproduction.germinationTypes.hypogeal}
                  </p>
                </div>
              </Panel>
            </div>
          </div>
          <Panel>
            <div className="flex items-center gap-3">
              <Sprout className="h-7 w-7 text-emerald-300" />
              <h3 className="font-black text-white">{c.chooseCondition}</h3>
            </div>
            <div
              className="mt-4 grid gap-2 sm:grid-cols-3"
              role="tablist"
              aria-label={c.chooseCondition}
            >
              {t.plantReproduction.germinationConditionDetails.map((item, index) => (
                <TabButton
                  key={item.condition}
                  selected={germinationCondition === index}
                  onClick={() => setGerminationCondition(index)}
                >
                  {item.condition}
                </TabButton>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.07] p-5">
              <p className="text-xl font-black text-emerald-100">{selectedCondition.condition}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{selectedCondition.reason}</p>
            </div>
            <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[0.08] p-4 text-sm font-black leading-6 text-amber-100">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />{" "}
              <span>
                <span className="uppercase">{c.examTip}:</span>{" "}
                {t.plantReproduction.germinationExamTip}
              </span>
            </p>
          </Panel>
        </div>

        <div className="space-y-6">
          <SectionHeading section={c.sections[7]} />
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center gap-3">
                <BookOpenCheck className="h-7 w-7 text-fuchsia-300" />
                <h3 className="font-black text-white">{c.examFacts}</h3>
              </div>
              <div className="mt-4">
                <Checklist items={t.keyExamFacts} />
              </div>
            </Panel>
            <Panel>
              <h3 className="font-black text-white">{c.glossary}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.keyTerms.map((term) => (
                  <span
                    key={term}
                    className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/[0.07] px-3 py-1 text-xs font-bold text-fuchsia-100"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </Panel>
          </div>
          <Panel>
            <h3 className="font-black text-white">{c.summary}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t.chapterSummary}</p>
          </Panel>
          {onMarkRead && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onMarkRead}
                disabled={isRead}
                className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 ${isRead ? "cursor-default bg-emerald-500/20 text-emerald-200" : "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white hover:scale-105 motion-reduce:hover:scale-100"}`}
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
