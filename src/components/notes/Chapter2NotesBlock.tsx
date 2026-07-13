import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import { DataTable } from "./blocks/DataTable";
import { EffectsGrid, type EffectsGridTint } from "./blocks/EffectsGrid";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { DefinitionCard } from "./blocks/DefinitionCard";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { EquationFlow, parseWordEquation } from "./blocks/EquationFlow";
import { ReciprocalProcess } from "./blocks/ReciprocalProcess";
import { CellDiagram } from "./blocks/CellDiagram";
import { HierarchyFlow } from "./blocks/HierarchyFlow";

type Lang = "en" | "bm";

const ORBIT_LABELS: Record<Lang, string[]> = {
  en: [
    "Cell basics",
    "Cell structures",
    "Animal vs plant",
    "Unicellular & multicellular",
    "Specialised cells",
    "Levels of organisation",
    "Body systems",
    "Respiration & photosynthesis",
    "Working together",
    "Key facts & terms",
  ],
  bm: [
    "Asas sel",
    "Struktur sel",
    "Haiwan lwn tumbuhan",
    "Unisel & multisel",
    "Sel khusus",
    "Tahap organisasi",
    "Sistem badan",
    "Respirasi & fotosintesis",
    "Saling melengkapi",
    "Fakta & istilah penting",
  ],
};

const SECTION_CHROME: Record<Lang, Array<{ eyebrow: string; title: string; sub?: string }>> = {
  en: [
    { eyebrow: "◆ 2.1", title: "The Cell: Basic Unit of Life", sub: "Every living thing, from a single bacterium to you, is built from cells." },
    { eyebrow: "◆ 2.1 continued", title: "Structures Inside a Cell" },
    { eyebrow: "◆ 2.1 continued", title: "Animal Cells vs Plant Cells" },
    { eyebrow: "◆ 2.2", title: "Unicellular & Multicellular Organisms" },
    { eyebrow: "◆ 2.2 continued", title: "Specialised Cell Types", sub: "Different jobs need different cell shapes." },
    { eyebrow: "◆ 2.3", title: "Levels of Organisation", sub: "Cell → Tissue → Organ → System → Organism." },
    { eyebrow: "◆ 2.3 continued", title: "Human Body Systems" },
    { eyebrow: "◆ 2.4", title: "Cell Respiration & Photosynthesis" },
    { eyebrow: "◆ 2.4 continued", title: "How They Work Together", sub: "Two processes, running in opposite directions, keeping each other going." },
    { eyebrow: "◆ Wrap-up", title: "Key Facts & Terms" },
  ],
  bm: [
    { eyebrow: "◆ 2.1", title: "Sel: Unit Asas Hidupan", sub: "Setiap benda hidup, daripada sebiji bakteria hingga anda, dibina daripada sel." },
    { eyebrow: "◆ Sambungan 2.1", title: "Struktur di dalam Sel" },
    { eyebrow: "◆ Sambungan 2.1", title: "Sel Haiwan lwn. Sel Tumbuhan" },
    { eyebrow: "◆ 2.2", title: "Organisma Unisel & Multisel" },
    { eyebrow: "◆ Sambungan 2.2", title: "Jenis Sel Khusus", sub: "Fungsi berbeza memerlukan bentuk sel yang berbeza." },
    { eyebrow: "◆ 2.3", title: "Tahap Organisasi", sub: "Sel → Tisu → Organ → Sistem → Organisma." },
    { eyebrow: "◆ Sambungan 2.3", title: "Sistem dalam Badan Manusia" },
    { eyebrow: "◆ 2.4", title: "Respirasi Sel & Fotosintesis" },
    { eyebrow: "◆ Sambungan 2.4", title: "Bagaimana Ia Saling Melengkapi", sub: "Dua proses, bergerak dalam arah bertentangan, saling menyokong antara satu sama lain." },
    { eyebrow: "◆ Rumusan", title: "Fakta & Istilah Penting" },
  ],
};

const LIFE_FUNCTIONS_HEAD: Record<Lang, string> = { en: "🌱 Life Functions", bm: "🌱 Fungsi Kehidupan" };
const DISCOVERY_HEAD: Record<Lang, string> = { en: "🔬 How Cells Were Discovered", bm: "🔬 Penemuan Sel" };
const UNICELLULAR_HEAD: Record<Lang, string> = { en: "🦠 Unicellular Organisms", bm: "🦠 Organisma Unisel" };
const MULTICELLULAR_HEAD: Record<Lang, string> = { en: "🧬 Multicellular Organisms", bm: "🧬 Organisma Multisel" };
const ANIMAL_CELLS_HEAD: Record<Lang, string> = { en: "🐾 Specialised Animal Cells", bm: "🐾 Sel Haiwan Khusus" };
const PLANT_CELLS_HEAD: Record<Lang, string> = { en: "🌿 Specialised Plant Cells", bm: "🌿 Sel Tumbuhan Khusus" };
const RESPIRATION_HEAD: Record<Lang, string> = { en: "⚡ Cell Respiration", bm: "⚡ Respirasi Sel" };
const PHOTOSYNTHESIS_HEAD: Record<Lang, string> = { en: "🌿 Photosynthesis", bm: "🌿 Fotosintesis" };
const RESPIRATION_TITLE: Record<Lang, string> = { en: "Cell Respiration", bm: "Respirasi Sel" };
const PHOTOSYNTHESIS_TITLE: Record<Lang, string> = { en: "Photosynthesis", bm: "Fotosintesis" };
const REQUIREMENTS_HEAD: Record<Lang, string> = { en: "Requirements", bm: "Keperluan" };
const COMPARISON_HEAD: Record<Lang, string> = { en: "📊 Respiration vs Photosynthesis", bm: "📊 Respirasi lwn. Fotosintesis" };
const FACTS_HEAD: Record<Lang, string> = { en: "⭐ Key exam facts", bm: "⭐ Fakta penting peperiksaan" };
const GLOSS_HEAD: Record<Lang, string> = { en: "📘 Glossary", bm: "📘 Glosari" };
const SUMMARY_HEAD: Record<Lang, string> = { en: "⭐ Chapter Summary", bm: "⭐ Rumusan Bab" };
const MARK_READ_BTN: Record<Lang, string> = { en: "📘 Mark Chapter 2 as Read", bm: "📘 Tandakan Bab 2 Selesai" };
const MARKED_BTN: Record<Lang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };
const BACK_BTN: Record<Lang, string> = { en: "Back", bm: "Kembali" };
const NEXT_BTN: Record<Lang, string> = { en: "Next section", bm: "Seksyen seterusnya" };

export function Chapter2NotesBlock({
  id,
  content,
  lang,
  storageKey,
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
  const total = ORBIT_LABELS[lang].length;
  const stateKey = storageKey ? `${storageKey}:c2-section` : undefined;
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

  const respirationEq = parseWordEquation(t.respiration.wordEquation);
  const photosynthesisEq = parseWordEquation(t.photosynthesis.wordEquation);

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🧫</div>
        <div>
          <p className="font-display mb-1 text-base font-bold text-foreground sm:text-lg">{t.hook.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{t.hook.body}</p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-1 overflow-x-auto pb-1">
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

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">{chrome.eyebrow}</p>
        <h2 className="font-display mb-1 text-xl font-bold text-foreground sm:text-2xl">{chrome.title}</h2>
        {chrome.sub && <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">{chrome.sub}</p>}
        {!chrome.sub && <div className="mb-6" />}

        {current === 0 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.cellBasics.definition}</p>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{DISCOVERY_HEAD[lang]}</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.cellBasics.discoveryHistory}</p>
            </div>
            <ChipRow heading={LIFE_FUNCTIONS_HEAD[lang]} items={t.cellBasics.lifeFunctions} />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-4">
            <CellDiagram structures={t.cellStructures} lang={lang} />
            <DataTable
              headers={lang === "en" ? ["Structure", "Function", "Animal cell", "Plant cell"] : ["Struktur", "Fungsi", "Sel haiwan", "Sel tumbuhan"]}
              rows={t.cellStructures.map((s) => [s.name, s.function, s.inAnimal ? "✓" : "—", s.inPlant ? "✓" : "—"])}
            />
          </div>
        )}

        {current === 2 && (
          <EffectsGrid
            cards={[
              {
                icon: "🐾",
                tint: "blue" as EffectsGridTint,
                heading: lang === "en" ? "Animal cell only" : "Khusus sel haiwan",
                items: t.animalVsPlant.animalOnly,
              },
              {
                icon: "🌱",
                tint: "green" as EffectsGridTint,
                heading: lang === "en" ? "Plant cell only" : "Khusus sel tumbuhan",
                items: t.animalVsPlant.plantOnly,
              },
              {
                icon: "🔗",
                tint: "amber" as EffectsGridTint,
                heading: lang === "en" ? "Found in both" : "Terdapat pada kedua-dua",
                items: t.animalVsPlant.shared,
              },
            ]}
          />
        )}

        {current === 3 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{UNICELLULAR_HEAD[lang]}</h4>
              <IconCardGrid
                items={t.unicellularMulticellular.unicellular.map((o) => ({ icon: o.icon, label: o.name, detail: o.note }))}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{MULTICELLULAR_HEAD[lang]}</h4>
              <IconCardGrid
                items={t.unicellularMulticellular.multicellular.map((o) => ({ icon: o.icon, label: o.name, detail: o.note }))}
              />
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{ANIMAL_CELLS_HEAD[lang]}</h4>
              <DefinitionCard items={t.animalCellTypes.map((c) => ({ name: c.name, body: c.description }))} />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{PLANT_CELLS_HEAD[lang]}</h4>
              <DefinitionCard items={t.plantCellTypes.map((c) => ({ name: c.name, body: c.description }))} />
            </div>
          </div>
        )}

        {current === 5 && <HierarchyFlow levels={t.organisationHierarchy} />}

        {current === 6 && (
          <DataTable
            headers={lang === "en" ? ["System", "Organs", "Function"] : ["Sistem", "Organ", "Fungsi"]}
            rows={t.bodySystems.map((b) => [b.name, b.organs, b.function])}
          />
        )}

        {current === 7 && (
          <div className="space-y-8">
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{RESPIRATION_HEAD[lang]}</h4>
              <p className="mb-3 text-[13.5px] leading-relaxed text-muted-foreground">{t.respiration.definition}</p>
              <EquationFlow reactants={respirationEq.reactants} products={respirationEq.products} />
            </div>
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">{PHOTOSYNTHESIS_HEAD[lang]}</h4>
              <ChipRow heading={REQUIREMENTS_HEAD[lang]} items={t.photosynthesis.requirements} tone="green" />
              <div className="mt-3">
                <EquationFlow
                  reactants={photosynthesisEq.reactants}
                  conditions={photosynthesisEq.conditions}
                  products={photosynthesisEq.products}
                  note={t.photosynthesis.starchTestNote}
                />
              </div>
            </div>
          </div>
        )}

        {current === 8 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{COMPARISON_HEAD[lang]}</h4>
              <DataTable
                headers={lang === "en" ? ["Characteristic", "Respiration", "Photosynthesis"] : ["Ciri", "Respirasi", "Fotosintesis"]}
                rows={t.comparisonTable.map((c) => [c.characteristic, c.respiration, c.photosynthesis])}
              />
            </div>
            <ReciprocalProcess
              left={{ title: RESPIRATION_TITLE[lang], equation: t.respiration.wordEquation, tone: "blue" }}
              right={{ title: PHOTOSYNTHESIS_TITLE[lang], equation: t.photosynthesis.wordEquation, tone: "green" }}
              leftToRightLabel={lang === "en" ? "releases CO₂ for →" : "membebaskan CO₂ untuk →"}
              rightToLeftLabel={lang === "en" ? "← releases O₂ for" : "← membebaskan O₂ untuk"}
              relationship={t.complementaryRelationship}
            />
          </div>
        )}

        {current === 9 && (
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
