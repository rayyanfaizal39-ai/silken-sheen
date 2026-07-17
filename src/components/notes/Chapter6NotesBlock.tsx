import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { ResearchModuleMeta } from "@/components/science/ScienceDiscoveryChrome";
import type { Chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";
import { DataTable } from "./blocks/DataTable";
import { ChipRow } from "./blocks/ChipRow";
import { DefinitionCard } from "./blocks/DefinitionCard";
import { FactGrid } from "./blocks/FactGrid";
import { AnimatedAtom } from "./blocks/AnimatedAtom";
import { PeriodicTableGrid } from "./blocks/PeriodicTableGrid";

type Lang = "en" | "bm";

const ORBIT_LABELS: Record<Lang, string[]> = {
  en: [
    "Atoms & molecules",
    "Elements & compounds",
    "Periodic table",
    "Metals vs non-metals",
    "Mixtures",
    "Compounds",
    "Physical vs chemical change",
    "Mixtures vs compounds",
    "Key facts & terms",
  ],
  bm: [
    "Atom & molekul",
    "Unsur & sebatian",
    "Jadual berkala",
    "Logam lwn bukan logam",
    "Campuran",
    "Sebatian",
    "Perubahan fizikal lwn kimia",
    "Campuran lwn sebatian",
    "Fakta & istilah penting",
  ],
};

const SECTION_CHROME: Record<Lang, Array<{ eyebrow: string; title: string; sub?: string }>> = {
  en: [
    { eyebrow: "◆ 6.1", title: "Atoms & Molecules", sub: "Every material is built from small, discrete particles called atoms." },
    { eyebrow: "◆ 6.1 continued", title: "Elements & Compounds" },
    { eyebrow: "◆ 6.2", title: "The Periodic Table", sub: "118 known elements, arranged in one orderly, systematic table." },
    { eyebrow: "◆ 6.2 continued", title: "Metals vs Non-metals" },
    { eyebrow: "◆ 6.3", title: "Mixtures", sub: "Combined physically, and can be separated back physically." },
    { eyebrow: "◆ 6.3 continued", title: "Compounds", sub: "Formed chemically, and can only be separated chemically." },
    { eyebrow: "◆ 6.4", title: "Physical vs Chemical Change" },
    { eyebrow: "◆ 6.4 continued", title: "Mixtures vs Compounds" },
    { eyebrow: "◆ Wrap-up", title: "Key Facts & Terms" },
  ],
  bm: [
    { eyebrow: "◆ 6.1", title: "Atom & Molekul", sub: "Setiap bahan dibina daripada zarah kecil dan diskret yang dipanggil atom." },
    { eyebrow: "◆ Sambungan 6.1", title: "Unsur & Sebatian" },
    { eyebrow: "◆ 6.2", title: "Jadual Berkala", sub: "118 unsur yang diketahui, disusun dalam satu jadual yang teratur dan sistematik." },
    { eyebrow: "◆ Sambungan 6.2", title: "Logam lwn. Bukan Logam" },
    { eyebrow: "◆ 6.3", title: "Campuran", sub: "Bergabung secara fizikal, dan boleh dipisahkan semula secara fizikal." },
    { eyebrow: "◆ Sambungan 6.3", title: "Sebatian", sub: "Terbentuk secara kimia, dan hanya boleh dipisahkan secara kimia." },
    { eyebrow: "◆ 6.4", title: "Perubahan Fizikal lwn. Kimia" },
    { eyebrow: "◆ Sambungan 6.4", title: "Campuran lwn. Sebatian" },
    { eyebrow: "◆ Rumusan", title: "Fakta & Istilah Penting" },
  ],
};

const NEUTRALITY_HEAD: Record<Lang, string> = { en: "⚖️ Why Atoms Are Neutral", bm: "⚖️ Sebab Atom Bersifat Neutral" };
const MOLECULE_HEAD: Record<Lang, string> = { en: "🔗 Molecules", bm: "🔗 Molekul" };
const ELEMENT_EX_HEAD: Record<Lang, string> = { en: "Element examples", bm: "Contoh unsur" };
const COMPOUND_EX_HEAD: Record<Lang, string> = { en: "Compound examples", bm: "Contoh sebatian" };
const HISTORY_HEAD: Record<Lang, string> = { en: "📜 History", bm: "📜 Sejarah" };
const ELEMENTS_HEAD: Record<Lang, string> = { en: "🧪 Example Elements", bm: "🧪 Contoh Unsur" };
const NAMING_HEAD: Record<Lang, string> = { en: "🏷️ Naming New Elements", bm: "🏷️ Penamaan Unsur Baharu" };
const SEMI_METAL_HEAD: Record<Lang, string> = { en: "🔶 Semi-metals", bm: "🔶 Semilogam" };
const EXAMPLES_HEAD: Record<Lang, string> = { en: "Examples", bm: "Contoh" };
const SEPARATION_HEAD: Record<Lang, string> = { en: "🧫 Separation Methods", bm: "🧫 Kaedah Pemisahan" };
const SELECTION_HEAD: Record<Lang, string> = { en: "🤔 Factors When Choosing a Method", bm: "🤔 Faktor Semasa Memilih Kaedah" };
const FORMATIONS_HEAD: Record<Lang, string> = { en: "⚗️ Compound Formations", bm: "⚗️ Pembentukan Sebatian" };
const ALKALI_HEAD: Record<Lang, string> = { en: "🧂 Alkali Metals & Water", bm: "🧂 Logam Alkali & Air" };
const MASS_HEAD: Record<Lang, string> = { en: "⚖️ Conservation of Mass", bm: "⚖️ Pengekalan Jisim" };
const ELECTROLYSIS_HEAD: Record<Lang, string> = { en: "🔋 Electrolysis", bm: "🔋 Elektrolisis" };
const PHYSICAL_EX_HEAD: Record<Lang, string> = { en: "Physical change examples", bm: "Contoh perubahan fizikal" };
const CHEMICAL_EX_HEAD: Record<Lang, string> = { en: "Chemical change examples", bm: "Contoh perubahan kimia" };
const FACTS_HEAD: Record<Lang, string> = { en: "⭐ Key exam facts", bm: "⭐ Fakta penting peperiksaan" };
const GLOSS_HEAD: Record<Lang, string> = { en: "📘 Glossary", bm: "📘 Glosari" };
const SUMMARY_HEAD: Record<Lang, string> = { en: "⭐ Chapter Summary", bm: "⭐ Rumusan Bab" };
const MARK_READ_BTN: Record<Lang, string> = { en: "📘 Mark Chapter 6 as Read", bm: "📘 Tandakan Bab 6 Selesai" };
const MARKED_BTN: Record<Lang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };
const BACK_BTN: Record<Lang, string> = { en: "Back", bm: "Kembali" };
const NEXT_BTN: Record<Lang, string> = { en: "Next section", bm: "Seksyen seterusnya" };

export function Chapter6NotesBlock({
  id,
  content,
  lang,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: { en: Chapter6Content; bm: Chapter6Content };
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = content[lang];
  const total = ORBIT_LABELS[lang].length;
  const stateKey = storageKey ? `${storageKey}:c6-section` : undefined;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!stateKey) return;
    const saved = window.sessionStorage.getItem(stateKey);
    const parsed = saved ? Number(saved) : 0;
    if (Number.isFinite(parsed)) setCurrent(Math.max(0, Math.min(parsed, total - 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateKey]);

  useEffect(() => {
    if (stateKey) window.sessionStorage.setItem(stateKey, String(current));
  }, [current, stateKey]);

  const chrome = SECTION_CHROME[lang][current];
  const isLast = current === total - 1;

  function go(dir: number) {
    setCurrent((c) => Math.max(0, Math.min(total - 1, c + dir)));
  }

  return (
    <section id={id} data-lang={lang} className="science-research-modules mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">⚛️</div>
        <div>
          <p className="font-display mb-1 text-base font-bold text-foreground sm:text-lg">{t.hook.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{t.hook.body}</p>
        </div>
      </div>

      <div className="science-research-orbit mb-6 flex items-center justify-between gap-1 overflow-x-auto pb-1">
        {ORBIT_LABELS[lang].map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setCurrent(i)}
            className="flex shrink-0 flex-col items-center gap-1.5 px-1"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all ${
                i < current
                  ? "border-transparent bg-gradient-to-br from-primary to-accent text-white"
                  : i === current
                    ? "border-primary text-primary shadow-[0_0_0_4px_rgba(59,130,246,0.16)]"
                    : "border-border text-muted-foreground"
              }`}
            >
              {i < current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={`max-w-[68px] text-center text-[10px] leading-tight ${
                i === current ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="science-research-module-shell relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">{chrome.eyebrow}</p>
        <h2 className="science-research-title font-display mb-1 text-xl font-bold text-foreground sm:text-2xl">{chrome.title}</h2>
        <ResearchModuleMeta index={current} total={total} title={chrome.title} lang={lang} />
        {chrome.sub && <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">{chrome.sub}</p>}
        {!chrome.sub && <div className="mb-6" />}

        {current === 0 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.atomsAndMolecules.definition}</p>
            <AnimatedAtom particles={t.atomsAndMolecules.subatomicParticles} />
            <DataTable
              headers={lang === "en" ? ["Particle", "Charge", "Location"] : ["Zarah", "Cas", "Lokasi"]}
              rows={t.atomsAndMolecules.subatomicParticles.map((p) => [p.name, p.charge, p.location])}
            />
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{NEUTRALITY_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.atomsAndMolecules.neutralityNote}</p>
            </div>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{MOLECULE_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.atomsAndMolecules.moleculeDefinition}</p>
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-[13.5px] leading-relaxed text-muted-foreground">{t.elementsAndCompounds.elementDefinition}</p>
              <ChipRow heading={ELEMENT_EX_HEAD[lang]} items={t.elementsAndCompounds.elementExamples} />
            </div>
            <div>
              <p className="mb-3 text-[13.5px] leading-relaxed text-muted-foreground">{t.elementsAndCompounds.compoundDefinition}</p>
              <ChipRow heading={COMPOUND_EX_HEAD[lang]} items={t.elementsAndCompounds.compoundExamples} tone="green" />
            </div>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.elementsAndCompounds.separationNote}</p>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{HISTORY_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.periodicTable.history}</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{t.periodicTable.totalDiscovered}</p>
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{ELEMENTS_HEAD[lang]}</h4>
              <PeriodicTableGrid elements={t.periodicTable.exampleElements} lang={lang} />
            </div>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{NAMING_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.periodicTable.namingNote}</p>
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <DataTable
              headers={lang === "en" ? ["Property", "Metal", "Non-metal"] : ["Sifat", "Logam", "Bukan logam"]}
              rows={t.metalsVsNonMetals.comparison.map((c) => [c.property, c.metal, c.nonMetal])}
            />
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{SEMI_METAL_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.metalsVsNonMetals.semiMetalNote}</p>
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.mixtures.definition}</p>
            <ChipRow heading={EXAMPLES_HEAD[lang]} items={t.mixtures.examples} />
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{SEPARATION_HEAD[lang]}</h4>
              <DefinitionCard
                items={t.mixtures.separationMethods.map((m) => ({
                  name: m.name,
                  body: m.usedFor,
                  example: m.example,
                  exampleLabel: EXAMPLES_HEAD[lang],
                }))}
              />
            </div>
            <ChipRow heading={SELECTION_HEAD[lang]} items={t.mixtures.selectionFactors} />
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.compounds.definition}</p>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{FORMATIONS_HEAD[lang]}</h4>
              <DataTable
                headers={lang === "en" ? ["Reactants", "Product"] : ["Bahan Tindak Balas", "Hasil"]}
                rows={t.compounds.formations.map((f) => [f.reactants, f.product])}
              />
            </div>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{ALKALI_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.compounds.alkaliMetalNote}</p>
            </div>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{MASS_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.compounds.massConservationNote}</p>
            </div>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{ELECTROLYSIS_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.compounds.electrolysisDefinition}</p>
            </div>
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <DataTable
              headers={lang === "en" ? ["Characteristic", "Physical change", "Chemical change"] : ["Ciri", "Perubahan fizikal", "Perubahan kimia"]}
              rows={t.physicalVsChemicalChange.comparison.map((c) => [c.characteristic, c.physicalChange, c.chemicalChange])}
            />
            <ChipRow heading={PHYSICAL_EX_HEAD[lang]} items={t.physicalVsChemicalChange.physicalExamples} />
            <ChipRow heading={CHEMICAL_EX_HEAD[lang]} items={t.physicalVsChemicalChange.chemicalExamples} tone="green" />
          </div>
        )}

        {current === 7 && (
          <DataTable
            headers={lang === "en" ? ["Characteristic", "Mixture", "Compound"] : ["Ciri", "Campuran", "Sebatian"]}
            rows={t.mixturesVsCompounds.map((m) => [m.characteristic, m.mixture, m.compound])}
          />
        )}

        {current === 8 && (
          <div className="space-y-6">
            <FactGrid heading={FACTS_HEAD[lang]} facts={t.keyExamFacts} />
            <ChipRow heading={GLOSS_HEAD[lang]} items={t.keyTerms} />
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-5">
              <h4 className="font-display mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                {SUMMARY_HEAD[lang]}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.chapterSummary}</p>
            </div>
            {onMarkRead && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={onMarkRead}
                  disabled={isRead}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    isRead
                      ? "cursor-default bg-emerald-500/20 text-emerald-200"
                      : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105"
                  }`}
                >
                  {isRead ? MARKED_BTN[lang] : MARK_READ_BTN[lang]}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={current === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> {BACK_BTN[lang]}
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              {NEXT_BTN[lang]} <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
