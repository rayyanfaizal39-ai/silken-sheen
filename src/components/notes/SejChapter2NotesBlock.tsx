import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Content } from "@/content/form1/sejarah/chapter-2/sej2-content";
import { DataTable } from "./blocks/DataTable";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { StepList } from "./blocks/StepList";
import { EpochCards } from "./blocks/EpochCards";
import { EffectsGrid, type EffectsGridTint } from "./blocks/EffectsGrid";
import pembentukanFizikalBumi from "@/assets/form1-content/pembentukan-fizikal-bumi.png";
import zamanAirBatuAkhir from "@/assets/form1-content/zaman-air-batu-akhir.png";
import pentasSunda from "@/assets/form1-content/pentas-sunda.png";

const ORBIT_LABELS = [
  "Dunia Kita",
  "Pembentukan Bumi",
  "Zaman Air Batu",
  "Empat Tahap",
  "Zaman Air Batu Akhir",
  "Perubahan & Kesan",
  "Pentas Sunda",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 2.1", title: "Dunia Kita", sub: "Lautan, selat dan teluk yang membentuk rupa bumi." },
  { eyebrow: "◆ 2.2", title: "Pembentukan Fizikal Bumi", sub: "Enam babak, 650 juta tahun kepada hari ini." },
  { eyebrow: "◆ 2.3", title: "Zaman Air Batu" },
  { eyebrow: "◆ 2.4", title: "Empat Tahap Zaman Air Batu", sub: "Miosen, Pliosen, Pleistosen, Holosen." },
  { eyebrow: "◆ 2.5", title: "Zaman Air Batu Akhir", sub: "Haiwan berbulu tebal, jambatan darat, dan kehidupan nomad." },
  { eyebrow: "◆ 2.6", title: "Perubahan Zaman Air Batu Akhir", sub: "Empat kesan besar terhadap rupa bumi dan kehidupan." },
  { eyebrow: "◆ 2.7", title: "Pentas Sunda", sub: "Asia Tenggara sebagai satu daratan." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const CHARACTERISTIC_ICONS: Record<string, string> = {
  "Jambatan Darat": "🌉",
  "Kehidupan Manusia": "🏕️",
  "Ciri Fizikal Bumi": "❄️",
  Binatang: "🦣",
  Tumbuhan: "🌾",
  Suhu: "🌡️",
};

const CHANGE_ICONS: Record<string, string> = {
  "Perubahan Rupa Bentuk Fizikal Bumi": "🌋",
  "Pembentukan Tasik Air Tawar": "💧",
  "Kepupusan Haiwan": "🦴",
  "Pergerakan Manusia": "🚶",
};

const CHANGE_TINTS: EffectsGridTint[] = ["green", "blue", "amber", "red"];

const TOTAL = ORBIT_LABELS.length;

export function SejChapter2NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej-c2-section` : undefined;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!stateKey) return;
    const saved = window.sessionStorage.getItem(stateKey);
    const parsed = saved ? Number(saved) : 0;
    if (Number.isFinite(parsed)) setCurrent(Math.max(0, Math.min(parsed, TOTAL - 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateKey]);

  useEffect(() => {
    if (stateKey) window.sessionStorage.setItem(stateKey, String(current));
  }, [current, stateKey]);

  const chrome = SECTION_CHROME[current];
  const isLast = current === TOTAL - 1;

  function go(dir: number) {
    setCurrent((c) => Math.max(0, Math.min(TOTAL - 1, c + dir)));
  }

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">❄️</div>
        <div>
          <p className="font-display mb-1 text-base font-bold text-foreground sm:text-lg">{content.hook.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{content.hook.body}</p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-1 overflow-x-auto pb-1">
        {ORBIT_LABELS.map((label, i) => (
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.ourWorld.intro}</p>
            <p className="text-[13.5px] font-semibold text-foreground">{content.ourWorld.earthAge}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.ourWorld.oceanFact}</p>
            <ChipRow heading="🌊 Lima Lautan Dunia" items={content.ourWorld.oceans} />
            <DataTable
              headers={["Istilah", "Definisi"]}
              rows={content.ourWorld.landDefinitions.map((d) => [d.term, d.definition])}
            />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <StepList
              steps={content.ourWorld.formationStages.map((s, i) => ({
                step: i + 1,
                instruction: `${s.yearsAgo} — ${s.description}`,
              }))}
            />
            <img
              src={pembentukanFizikalBumi}
              alt="Pembentukan Fizikal Bumi"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.iceAgeOverview.definition}</p>
            <ChipRow heading="🧊 Tahap Pengglasieran" items={content.iceAgeOverview.glaciationStages} />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.iceAgeOverview.endCause}</p>
          </div>
        )}

        {current === 3 && <EpochCards epochs={content.epochs} />}

        {current === 4 && (
          <div className="space-y-6">
            <img
              src={zamanAirBatuAkhir}
              alt="Zaman Air Batu Akhir"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <IconCardGrid
              items={content.lateIceAgeCharacteristics.map((c) => ({
                icon: CHARACTERISTIC_ICONS[c.aspect] ?? "❄️",
                label: c.aspect,
                detail: c.description,
              }))}
            />
          </div>
        )}

        {current === 5 && (
          <EffectsGrid
            cards={content.changes.map((c, i) => ({
              icon: CHANGE_ICONS[c.effect] ?? "🌍",
              tint: CHANGE_TINTS[i % CHANGE_TINTS.length],
              heading: c.effect,
              items: [c.description],
            }))}
          />
        )}

        {current === 6 && (
          <div className="space-y-6">
            <img
              src={pentasSunda}
              alt="Pentas Sunda"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <p className="text-center text-[12px] text-muted-foreground">
              Pentas Sunda ({content.southeastAsiaEffects.sundaShelf.area}) menyatukan Malaysia, Indonesia, Thailand,
              Filipina — asas perkongsian bahasa Melayu serantau
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.southeastAsiaEffects.sundaShelf.definition}
            </p>
            <ChipRow heading="🗺️ Kawasan Yang Bersambung" items={content.southeastAsiaEffects.sundaShelf.connectedRegions} />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.southeastAsiaEffects.seaLevelRise}</p>
            <ChipRow heading="🌊 Terbentuk Akibat Kenaikan Aras Laut" items={content.southeastAsiaEffects.formationResults} />
            <ChipRow heading="🦴 Haiwan Pupus" items={content.southeastAsiaEffects.extinctAnimals} />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.southeastAsiaEffects.mammalStat}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.southeastAsiaEffects.culturalSignificance}
            </p>
          </div>
        )}

        {current === 7 && (
          <div className="space-y-6">
            <FactGrid heading="⭐ Fakta Penting Peperiksaan" facts={content.keyExamFacts} />
            <ChipRow heading="📘 Istilah Utama" items={content.keyTerms} />
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">⭐ Rumusan Bab</h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.chapterSummary}</p>
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 2 Selesai"}
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
            <ChevronLeft className="h-4 w-4" /> Kembali
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Seksyen seterusnya <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
