import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej3Content } from "@/content/form1/sejarah/chapter-3/sej3-content";
import { DataTable } from "./blocks/DataTable";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { EpochCards } from "./blocks/EpochCards";
import { SiteCardRow } from "./blocks/SiteCardRow";
import { ContinuityPairs } from "./blocks/ContinuityPairs";
import { MalaysiaSiteList } from "./blocks/MalaysiaSiteList";
import evolusiPeralatan from "@/assets/form1-content/evolusi-peralatan.png";
import kehidupanPrasejarah from "@/assets/form1-content/kehidupan-prasejarah.png";

const ORBIT_LABELS = [
  "Definisi",
  "Zaman Batu",
  "Zaman Logam",
  "Evolusi Peralatan",
  "Kehidupan Prasejarah",
  "Tapak Dunia",
  "Tapak Asia Tenggara",
  "Tujuh Ciri Kehidupan",
  "Kesinambungan",
  "Prasejarah Malaysia",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 3.1", title: "Zaman Prasejarah", sub: "Zaman sebelum manusia mengenal tulisan." },
  { eyebrow: "◆ 3.2", title: "Zaman Batu", sub: "Paleolitik, Mesolitik, Neolitik." },
  { eyebrow: "◆ 3.3", title: "Zaman Logam" },
  { eyebrow: "◆ 3.4", title: "Evolusi Peralatan: Zaman Batu ke Zaman Logam", sub: "Empat era, peningkatan teknologi yang jelas kelihatan." },
  { eyebrow: "◆ 3.5", title: "Kehidupan Manusia Zaman Prasejarah", sub: "Gua, api, tembikar, dan pemburuan." },
  { eyebrow: "◆ 3.6", title: "Tapak Prasejarah Dunia (Diiktiraf UNESCO)", sub: "Lapan tapak terkenal merentasi tiga benua." },
  { eyebrow: "◆ 3.7", title: "Tapak Prasejarah Asia Tenggara", sub: "Lenggong, Perak — antara tapak paling penting di rantau ini." },
  { eyebrow: "◆ 3.8", title: "Tujuh Ciri Kehidupan Merentas Empat Era" },
  { eyebrow: "◆ 3.9", title: "Kesinambungan — Dahulu ke Kini", sub: "Enam aktiviti prasejarah yang masih kita amalkan hari ini." },
  { eyebrow: "◆ 3.10", title: "Zaman Prasejarah di Malaysia", sub: "Manusia telah menetap di negara ini sejak 40,000 tahun dahulu." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function SejChapter3NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej3Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej-c3-section` : undefined;
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
        <div className="shrink-0 text-2xl">🏺</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.definition.meaning}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.definition.altName}</p>
            <ChipRow heading="📚 Pembahagian Zaman Prasejarah" items={content.definition.divisions} />
          </div>
        )}

        {current === 1 && (
          <EpochCards
            epochs={content.stoneAge.map((s) => ({
              name: `${s.name} (${s.altName})`,
              duration: s.duration,
              facts: s.facts,
            }))}
          />
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.metalAge.definition}</p>
            <ChipRow heading="⚒️ Contoh Peralatan" items={content.metalAge.toolExamples} />
            <DataTable
              headers={["Zaman", "Tempoh"]}
              rows={content.periodDurations.map((p) => [p.period, p.duration])}
            />
          </div>
        )}

        {current === 3 && (
          <img
            src={evolusiPeralatan}
            alt="Evolusi Peralatan"
            className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
          />
        )}

        {current === 4 && (
          <img
            src={kehidupanPrasejarah}
            alt="Kehidupan Manusia Zaman Prasejarah"
            className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
          />
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.worldLocations.intro}</p>
            <SiteCardRow sites={content.worldLocations.sites} />
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.seaLocations.intro}</p>
            <SiteCardRow sites={content.seaLocations.sites} highlightName="Lenggong" />
          </div>
        )}

        {current === 7 && (
          <DataTable
            headers={["Ciri", "Paleolitik", "Mesolitik", "Neolitik", "Logam"]}
            rows={content.lifeCharacteristics.map((cat) => [
              cat.category,
              ...cat.byEra.map((e) => e.description),
            ])}
          />
        )}

        {current === 8 && <ContinuityPairs items={content.continuity} />}

        {current === 9 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.malaysia.intro}</p>
            <MalaysiaSiteList eras={content.malaysia.sitesByEra} />
            <p className="text-center text-[11px] text-muted-foreground">{content.malaysia.hoabinhianNote}</p>
          </div>
        )}

        {current === 10 && (
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 3 Selesai"}
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
