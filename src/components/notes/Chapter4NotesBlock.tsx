import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { ResearchModuleMeta } from "@/components/science/ScienceDiscoveryChrome";
import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { DataTable } from "./blocks/DataTable";
import { DefinitionCard } from "./blocks/DefinitionCard";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { MenstrualCycleWheel } from "./blocks/MenstrualCycleWheel";
import { FoetalTimeline } from "./blocks/FoetalTimeline";
import { FlowerDiagram } from "./blocks/FlowerDiagram";

type Lang = "en" | "bm";

const ORBIT_LABELS: Record<Lang, string[]> = {
  en: [
    "Reproduction basics", "Asexual reproduction", "Reproductive systems", "Puberty",
    "The menstrual cycle", "Fertilisation & pregnancy", "Foetal health factors",
    "Infertility & contraception", "Flower structure", "Pollination", "Seeds & germination", "Key facts & terms",
  ],
  bm: [
    "Asas pembiakan", "Pembiakan aseks", "Sistem pembiakan", "Akil baligh",
    "Kitar haid", "Persenyawaan & kehamilan", "Faktor kesihatan fetus",
    "Kemandulan & kontraseptif", "Struktur bunga", "Pendebungaan", "Biji benih & percambahan", "Fakta & istilah penting",
  ],
};

const SECTION_CHROME: Record<Lang, Array<{ eyebrow: string; title: string; sub?: string }>> = {
  en: [
    { eyebrow: "◆ 4.1", title: "Reproduction Basics", sub: "Every organism solves the same problem — sexually, with two parents, or asexually, with one." },
    { eyebrow: "◆ 4.1 continued", title: "Types of Asexual Reproduction" },
    { eyebrow: "◆ 4.2", title: "The Human Reproductive Systems", sub: "Part and function, matching the textbook's own reference tables." },
    { eyebrow: "◆ 4.3", title: "Puberty" },
    { eyebrow: "◆ 4.4", title: "The Menstrual Cycle", sub: "A 28-day cycle across four phases — this diagram's arcs are drawn to the real day-counts." },
    { eyebrow: "◆ 4.5", title: "Fertilisation & Pregnancy" },
    { eyebrow: "◆ 4.5 continued", title: "Factors Affecting Foetal Development" },
    { eyebrow: "◆ 4.6", title: "Infertility & Contraception" },
    { eyebrow: "◆ 4.7", title: "Flower Structure", sub: "Male and female parts are shown as two separate diagrams, not combined." },
    { eyebrow: "◆ 4.7 continued", title: "Pollination" },
    { eyebrow: "◆ 4.7 continued", title: "Seeds & Germination" },
    { eyebrow: "◆ Wrap-up", title: "Key Facts & Terms" },
  ],
  bm: [
    { eyebrow: "◆ 4.1", title: "Asas Pembiakan", sub: "Setiap organisma menyelesaikan masalah yang sama — secara seks dengan dua induk, atau aseks dengan satu induk." },
    { eyebrow: "◆ Sambungan 4.1", title: "Jenis Pembiakan Aseks" },
    { eyebrow: "◆ 4.2", title: "Sistem Pembiakan Manusia", sub: "Bahagian dan fungsi, mengikut format jadual rujukan buku teks." },
    { eyebrow: "◆ 4.3", title: "Akil Baligh" },
    { eyebrow: "◆ 4.4", title: "Kitar Haid", sub: "Kitar 28 hari merentasi empat fasa — lengkung rajah ini dilukis mengikut kiraan hari sebenar." },
    { eyebrow: "◆ 4.5", title: "Persenyawaan & Kehamilan" },
    { eyebrow: "◆ Sambungan 4.5", title: "Faktor yang Mempengaruhi Perkembangan Fetus" },
    { eyebrow: "◆ 4.6", title: "Kemandulan & Kontraseptif" },
    { eyebrow: "◆ 4.7", title: "Struktur Bunga", sub: "Bahagian jantan dan betina ditunjukkan sebagai dua rajah berasingan, tidak digabungkan." },
    { eyebrow: "◆ Sambungan 4.7", title: "Pendebungaan" },
    { eyebrow: "◆ Sambungan 4.7", title: "Biji Benih & Percambahan" },
    { eyebrow: "◆ Rumusan", title: "Fakta & Istilah Penting" },
  ],
};

const SEXUAL_HEAD: Record<Lang, string> = { en: "Sexual reproduction", bm: "Pembiakan seks" };
const ASEXUAL_HEAD: Record<Lang, string> = { en: "Asexual reproduction", bm: "Pembiakan aseks" };
const OCCURS_IN_LABEL: Record<Lang, string> = { en: "Occurs in", bm: "Berlaku pada" };
const INTERNAL_FERT_HEAD: Record<Lang, string> = { en: "Internal fertilisation", bm: "Persenyawaan dalaman" };
const EXTERNAL_FERT_HEAD: Record<Lang, string> = { en: "External fertilisation", bm: "Persenyawaan luaran" };
const MALE_HEAD: Record<Lang, string> = { en: "♂ Male Reproductive System", bm: "♂ Sistem Pembiakan Lelaki" };
const FEMALE_HEAD: Record<Lang, string> = { en: "♀ Female Reproductive System", bm: "♀ Sistem Pembiakan Perempuan" };
const PART_COL: Record<Lang, string> = { en: "Part", bm: "Bahagian" };
const FUNCTION_COL: Record<Lang, string> = { en: "Function", bm: "Fungsi" };
const MALE_AGE_LABEL: Record<Lang, string> = { en: "Typical age", bm: "Usia lazim" };
const AFFECTING_FACTORS_HEAD: Record<Lang, string> = { en: "🎚️ What Can Affect the Cycle", bm: "🎚️ Apa yang Boleh Mempengaruhi Kitar" };
const HYGIENE_HEAD: Record<Lang, string> = { en: "🧼 Menstrual Hygiene", bm: "🧼 Kebersihan Semasa Haid" };
const IRREGULAR_HEAD: Record<Lang, string> = { en: "⚠️ Irregular Menstruation", bm: "⚠️ Haid Tidak Teratur" };
const CAUSES_LABEL: Record<Lang, string> = { en: "Causes", bm: "Punca" };
const EFFECTS_LABEL: Record<Lang, string> = { en: "Possible effects", bm: "Kesan yang mungkin" };
const PROCESS_HEAD: Record<Lang, string> = { en: "🔬 From Fertilisation to Birth", bm: "🔬 Daripada Persenyawaan hingga Kelahiran" };
const TIMELINE_HEAD: Record<Lang, string> = { en: "👶 Foetal Development Timeline", bm: "👶 Garis Masa Perkembangan Fetus" };
const NUTRIENT_HEAD: Record<Lang, string> = { en: "🥗 Nutrient Needs During Pregnancy", bm: "🥗 Keperluan Nutrien Semasa Mengandung" };
const HARMFUL_HEAD: Record<Lang, string> = { en: "🚭 Harmful Substances", bm: "🚭 Bahan Berbahaya" };
const BREASTFEEDING_HEAD: Record<Lang, string> = { en: "Benefits of breastfeeding", bm: "Kebaikan penyusuan susu ibu" };
const MALE_FACTORS_HEAD: Record<Lang, string> = { en: "Male factors", bm: "Faktor lelaki" };
const FEMALE_FACTORS_HEAD: Record<Lang, string> = { en: "Female factors", bm: "Faktor perempuan" };
const TREATMENTS_HEAD: Record<Lang, string> = { en: "💊 Treatments", bm: "💊 Rawatan" };
const CONTRACEPTION_HEAD: Record<Lang, string> = { en: "🚫 Contraception Methods", bm: "🚫 Kaedah Kontraseptif" };
const SCREENING_HEAD: Record<Lang, string> = { en: "🩺 Why Health Screening Matters", bm: "🩺 Kepentingan Saringan Kesihatan" };
const FLOWER_PARTS_HEAD: Record<Lang, string> = { en: "Flower parts reference", bm: "Rujukan bahagian bunga" };
const FLOWER_TYPES_HEAD: Record<Lang, string> = { en: "🌼 Bisexual vs Unisexual Flowers", bm: "🌼 Bunga Biseksual lwn. Unisensual" };
const POLLINATION_AGENTS_HEAD: Record<Lang, string> = { en: "🐝 Pollinating Agents", bm: "🐝 Agen Pendebungaan" };
const CROSS_ADV_HEAD: Record<Lang, string> = { en: "✅ Advantages of Cross-Pollination", bm: "✅ Kelebihan Pendebungaan Kacukan" };
const SEED_PARTS_HEAD: Record<Lang, string> = { en: "Seed parts reference", bm: "Rujukan bahagian biji benih" };
const SEED_TYPES_HEAD: Record<Lang, string> = { en: "🌱 Monocotyledonous vs Dicotyledonous", bm: "🌱 Monokotiledon lwn. Dikotiledon" };
const GERMINATION_TYPES_HEAD: Record<Lang, string> = { en: "🌾 Epigeal vs Hypogeal Germination", bm: "🌾 Percambahan Epigeal lwn. Hipogeal" };
const GERMINATION_COND_HEAD: Record<Lang, string> = { en: "Conditions needed for germination", bm: "Syarat yang diperlukan untuk percambahan" };
const FACTS_HEAD: Record<Lang, string> = { en: "⭐ Key exam facts", bm: "⭐ Fakta penting peperiksaan" };
const GLOSS_HEAD: Record<Lang, string> = { en: "📘 Glossary", bm: "📘 Glosari" };
const SUMMARY_HEAD: Record<Lang, string> = { en: "⭐ Chapter Summary", bm: "⭐ Rumusan Bab" };
const MARK_READ_BTN: Record<Lang, string> = { en: "📘 Mark Chapter 4 as Read", bm: "📘 Tandakan Bab 4 Selesai" };
const MARKED_BTN: Record<Lang, string> = { en: "Marked as read ✓", bm: "Selesai ditanda ✓" };
const BACK_BTN: Record<Lang, string> = { en: "Back", bm: "Kembali" };
const NEXT_BTN: Record<Lang, string> = { en: "Next section", bm: "Seksyen seterusnya" };

export function Chapter4NotesBlock({
  id,
  content,
  lang,
  storageKey,
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
  const total = ORBIT_LABELS[lang].length;
  const stateKey = storageKey ? `${storageKey}:c4-section` : undefined;
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

  const stamenPart = t.plantReproduction.flowerParts[0];
  const pistilPart = t.plantReproduction.flowerParts[1];

  return (
    <section id={id} data-lang={lang} className="science-research-modules mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🔬</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.reproductionBasics.definition}</p>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                <h5 className="font-display mb-1.5 text-[13px] font-bold text-foreground">{SEXUAL_HEAD[lang]}</h5>
                <p className="text-xs leading-relaxed text-muted-foreground">{t.reproductionBasics.sexual.involves}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  <b className="text-foreground">{OCCURS_IN_LABEL[lang]}:</b> {t.reproductionBasics.sexual.occursIn.join(", ")}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                <h5 className="font-display mb-1.5 text-[13px] font-bold text-foreground">{ASEXUAL_HEAD[lang]}</h5>
                <p className="text-xs leading-relaxed text-muted-foreground">{t.reproductionBasics.asexual.involves}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  <b className="text-foreground">{OCCURS_IN_LABEL[lang]}:</b> {t.reproductionBasics.asexual.occursIn.join(", ")}
                </p>
                <p className="mt-2 text-[11px] italic text-muted-foreground">{t.reproductionBasics.asexual.note}</p>
              </div>
            </div>
            <DataTable
              headers={lang === "en" ? ["Fertilisation type", "Details"] : ["Jenis persenyawaan", "Butiran"]}
              rows={[
                [INTERNAL_FERT_HEAD[lang], t.reproductionBasics.fertilisationTypes.internal.join("; ")],
                [EXTERNAL_FERT_HEAD[lang], t.reproductionBasics.fertilisationTypes.external.join("; ")],
              ]}
            />
          </div>
        )}

        {current === 1 && (
          <DefinitionCard
            items={t.asexualTypes.map((a) => ({
              name: a.name,
              body: a.description,
              example: a.examples.join(", "),
              exampleLabel: OCCURS_IN_LABEL[lang],
            }))}
          />
        )}

        {current === 2 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{MALE_HEAD[lang]}</h4>
              <DataTable
                headers={[PART_COL[lang], FUNCTION_COL[lang]]}
                rows={t.humanReproductiveSystem.maleParts.map((p) => [p.part, p.function])}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{FEMALE_HEAD[lang]}</h4>
              <DataTable
                headers={[PART_COL[lang], FUNCTION_COL[lang]]}
                rows={t.humanReproductiveSystem.femaleParts.map((p) => [p.part, p.function])}
              />
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.puberty.definition}</p>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h5 className="font-display text-[13px] font-bold text-foreground">♂ {lang === "en" ? "Male" : "Lelaki"}</h5>
                  <span className="text-[11px] text-muted-foreground">
                    {MALE_AGE_LABEL[lang]}: {t.puberty.maleAge}
                  </span>
                </div>
                {t.puberty.maleChanges.map((c) => (
                  <div key={c.category} className="mb-2.5 last:mb-0">
                    <p className="text-[11.5px] font-semibold text-foreground">{c.category}</p>
                    <ul className="mt-1 flex flex-col gap-1">
                      {c.changes.map((ch) => (
                        <li key={ch} className="flex items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h5 className="font-display text-[13px] font-bold text-foreground">♀ {lang === "en" ? "Female" : "Perempuan"}</h5>
                  <span className="text-[11px] text-muted-foreground">
                    {MALE_AGE_LABEL[lang]}: {t.puberty.femaleAge}
                  </span>
                </div>
                {t.puberty.femaleChanges.map((c) => (
                  <div key={c.category} className="mb-2.5 last:mb-0">
                    <p className="text-[11.5px] font-semibold text-foreground">{c.category}</p>
                    <ul className="mt-1 flex flex-col gap-1">
                      {c.changes.map((ch) => (
                        <li key={ch} className="flex items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-pink-400" />
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.menstrualCycle.definition}</p>
            <MenstrualCycleWheel lang={lang} phases={t.menstrualCycle.phases} />
            <ChipRow heading={AFFECTING_FACTORS_HEAD[lang]} items={t.menstrualCycle.affectingFactors} />
            <ChipRow heading={HYGIENE_HEAD[lang]} items={t.menstrualCycle.hygieneImportance} tone="green" />
            <div className="rounded-2xl border border-border bg-secondary/40 p-4">
              <h5 className="font-display mb-2 text-[13px] font-bold text-foreground">{IRREGULAR_HEAD[lang]}</h5>
              <p className="text-[11.5px] font-semibold text-foreground">{CAUSES_LABEL[lang]}</p>
              <ul className="mb-2 mt-1 flex flex-col gap-1">
                {t.menstrualCycle.irregularMenstruation.causes.map((c) => (
                  <li key={c} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-muted-foreground">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11.5px] font-semibold text-foreground">{EFFECTS_LABEL[lang]}</p>
              <ul className="mt-1 flex flex-col gap-1">
                {t.menstrualCycle.irregularMenstruation.effects.map((e) => (
                  <li key={e} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-muted-foreground">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{PROCESS_HEAD[lang]}</h4>
              <ul className="flex flex-col gap-1.5">
                {t.fertilisationAndPregnancy.process.map((p, i) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="font-display flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
                      {i + 1}
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{TIMELINE_HEAD[lang]}</h4>
              <FoetalTimeline stages={t.fertilisationAndPregnancy.foetalDevelopment} />
            </div>
            <DefinitionCard
              items={[
                { name: lang === "en" ? "Placenta" : "Plasenta", body: t.fertilisationAndPregnancy.placentaFunction },
                { name: lang === "en" ? "Umbilical cord" : "Tali pusat", body: t.fertilisationAndPregnancy.umbilicalCordFunction },
                { name: "Amnion", body: t.fertilisationAndPregnancy.amnionFunction },
                { name: lang === "en" ? "Amniotic fluid" : "Cecair amnion", body: t.fertilisationAndPregnancy.amnioticFluidFunction },
              ]}
            />
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{NUTRIENT_HEAD[lang]}</h4>
              <DataTable
                headers={lang === "en" ? ["Nutrient", "Examples", "Function"] : ["Nutrien", "Contoh", "Fungsi"]}
                rows={t.foetalDevelopmentFactors.nutrientNeeds.map((n) => [n.nutrient, n.examples, n.fn])}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{HARMFUL_HEAD[lang]}</h4>
              <DefinitionCard
                items={t.foetalDevelopmentFactors.harmfulSubstances.map((h) => ({
                  name: h.substance,
                  body: h.effects.join("; "),
                }))}
              />
            </div>
            <ChipRow heading={BREASTFEEDING_HEAD[lang]} items={t.foetalDevelopmentFactors.breastfeedingBenefits} tone="green" />
          </div>
        )}

        {current === 7 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.infertility.definition}</p>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <ChipRow heading={MALE_FACTORS_HEAD[lang]} items={t.infertility.maleFactors} />
              <ChipRow heading={FEMALE_FACTORS_HEAD[lang]} items={t.infertility.femaleFactors} />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{TREATMENTS_HEAD[lang]}</h4>
              <DefinitionCard items={t.infertility.treatments.map((tr) => ({ name: tr.name, body: tr.description }))} />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{CONTRACEPTION_HEAD[lang]}</h4>
              <DefinitionCard items={t.infertility.contraceptionMethods.map((c) => ({ name: c.name, body: c.description }))} />
            </div>
            <ChipRow heading={SCREENING_HEAD[lang]} items={t.infertility.healthScreeningImportance} tone="green" />
          </div>
        )}

        {current === 8 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{FLOWER_PARTS_HEAD[lang]}</h4>
              <DataTable
                headers={[PART_COL[lang], FUNCTION_COL[lang]]}
                rows={t.plantReproduction.flowerParts.map((p) => [p.part, p.function])}
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <FlowerDiagram lang={lang} variant="male" functionText={stamenPart.function} />
              <FlowerDiagram lang={lang} variant="female" functionText={pistilPart.function} />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{FLOWER_TYPES_HEAD[lang]}</h4>
              <DataTable
                headers={lang === "en" ? ["Type", "Description"] : ["Jenis", "Penerangan"]}
                rows={[
                  [lang === "en" ? "Bisexual" : "Biseksual", t.plantReproduction.flowerTypes.bisexual],
                  [lang === "en" ? "Unisexual" : "Unisensual", `${t.plantReproduction.flowerTypes.unisexual} (${t.plantReproduction.flowerTypes.unisexualExamples.join(", ")})`],
                ]}
              />
            </div>
          </div>
        )}

        {current === 9 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{t.plantReproduction.pollinationDefinition}</p>
            <DataTable
              headers={lang === "en" ? ["Type", "Description"] : ["Jenis", "Penerangan"]}
              rows={[
                [lang === "en" ? "Self-pollination" : "Pendebungaan sendiri", t.plantReproduction.pollinationTypes.self],
                [lang === "en" ? "Cross-pollination" : "Pendebungaan kacukan", t.plantReproduction.pollinationTypes.cross],
              ]}
            />
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{POLLINATION_AGENTS_HEAD[lang]}</h4>
              <DefinitionCard
                items={t.plantReproduction.pollinatingAgents.map((a) => ({
                  name: a.agent,
                  body: `${a.mechanism} ${a.flowerCharacteristics.join("; ")}`,
                  example: a.examples.join(", "),
                  exampleLabel: lang === "en" ? "Examples" : "Contoh",
                }))}
              />
            </div>
            <ChipRow heading={CROSS_ADV_HEAD[lang]} items={t.plantReproduction.crossPollinationAdvantages} tone="green" />
          </div>
        )}

        {current === 10 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{SEED_PARTS_HEAD[lang]}</h4>
              <DataTable
                headers={[PART_COL[lang], FUNCTION_COL[lang]]}
                rows={t.plantReproduction.seedParts.map((p) => [p.part, p.function])}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{SEED_TYPES_HEAD[lang]}</h4>
              <DataTable
                headers={lang === "en" ? ["Type", "Description"] : ["Jenis", "Penerangan"]}
                rows={[
                  [lang === "en" ? "Monocotyledonous" : "Monokotiledon", t.plantReproduction.seedTypes.monocotyledonous],
                  [lang === "en" ? "Dicotyledonous" : "Dikotiledon", t.plantReproduction.seedTypes.dicotyledonous],
                ]}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">{GERMINATION_TYPES_HEAD[lang]}</h4>
              <DataTable
                headers={lang === "en" ? ["Type", "Description"] : ["Jenis", "Penerangan"]}
                rows={[
                  [lang === "en" ? "Epigeal" : "Epigeal", t.plantReproduction.germinationTypes.epigeal],
                  [lang === "en" ? "Hypogeal" : "Hipogeal", t.plantReproduction.germinationTypes.hypogeal],
                ]}
              />
            </div>
            <ChipRow heading={GERMINATION_COND_HEAD[lang]} items={t.plantReproduction.germinationConditions} />
          </div>
        )}

        {current === 11 && (
          <div className="space-y-6">
            <FactGrid heading={FACTS_HEAD[lang]} facts={t.keyExamFacts} />
            <ChipRow heading={GLOSS_HEAD[lang]} items={t.keyTerms} />
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-5">
              <h4 className="font-display mb-2 flex items-center gap-2 text-sm font-bold text-foreground">{SUMMARY_HEAD[lang]}</h4>
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
