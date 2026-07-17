import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch1Content } from "@/content/form2/sejarah/chapter-1/sej2ch1-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { ScholarCards } from "./blocks/ScholarCards";
import { KingdomStageCards } from "./blocks/KingdomStageCards";
import { EraComparisonColumns } from "./blocks/EraComparisonColumns";
import { bgPanel } from "./blocks/neon-tokens";
import angkorThom from "@/assets/form2-content/angkor-thom.png";
import jalinanPerdaganganAlamMelayu from "@/assets/form2-content/jalinan-perdagangan-alam-melayu.png";

const ORBIT_LABELS = [
  "Konsep: Geografi",
  "Konsep: Bahasa & Budaya",
  "Kewujudan Kerajaan",
  "Kerajaan Masyhur",
  "Sezaman Dunia",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 1.1", title: "Konsep Alam Melayu — Geografi", sub: "Sempadan Alam Melayu ditakrifkan berbeza mengikut sarjana, tetapi hampir semua bersetuju ia meliputi Asia Tenggara." },
  { eyebrow: "◆ 1.1", title: "Konsep Alam Melayu — Bahasa dan Budaya", sub: "Bahasa serumpun dan budaya yang dikongsi membuktikan identiti bersama Alam Melayu." },
  { eyebrow: "◆ 1.2", title: "Kewujudan Kerajaan di Alam Melayu", sub: "Kerajaan awal bermula sebagai petempatan kecil di lembah sungai, seawal abad pertama." },
  { eyebrow: "◆ 1.3", title: "Kerajaan Alam Melayu yang Masyhur", sub: "Setiap kerajaan mengikut corak yang sama: dibina, mencapai kegemilangan, kemudian runtuh." },
  { eyebrow: "◆ 1.4", title: "Kerajaan Alam Melayu dan Kerajaan Luar yang Sezaman", sub: "Alam Melayu bukan sekadar wujud — setanding dengan empayar besar dunia pada zaman yang sama." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function Sej2Chapter1NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch1Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c1-section` : undefined;
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

  const languageHeaders = content.concept.language.comparisonTable[0]?.translations.map((t) => t.language) ?? [];

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">👑</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.concept.intro}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.concept.sundaShelfLink}</p>
            <ScholarCards
              scholars={content.concept.geographyViews.map((v) => ({
                field: v.role,
                name: v.scholar,
                contribution: `${v.view} (${v.source})`,
              }))}
            />
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{content.concept.geographyConsensus}</p>
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.concept.language.familyName}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.concept.language.scholarView}</p>
            <DataTable
              headers={["Perkataan", ...languageHeaders]}
              rows={content.concept.language.comparisonTable.map((c) => [
                c.word,
                ...c.translations.map((t) => t.term),
              ])}
            />
            <ChipRow heading="🎭 Budaya Serumpun" items={content.concept.culture.sharedElements} />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.concept.culture.scholarView}</p>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.kingdomEmergence.intro}</p>
            <DataTable
              headers={["Kerajaan", "Lokasi", "Era", "Ibu Negeri"]}
              rows={content.kingdomEmergence.kingdoms.map((k) => [k.name, k.location, k.era, k.capital])}
            />
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <img
              src={angkorThom}
              alt="Angkor Thom"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <KingdomStageCards kingdoms={content.famousKingdoms} />
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.contemporaryKingdoms.intro}</p>
            <img
              src={jalinanPerdaganganAlamMelayu}
              alt="Jalinan Perdagangan Alam Melayu"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <EraComparisonColumns eras={content.contemporaryKingdoms.eras} />
            <div className="grid gap-3 sm:grid-cols-3">
              {content.contemporaryKingdoms.relations.map((r) => (
                <div key={r.type} className="rounded-xl border border-border bg-secondary/40 p-3.5">
                  <p className="text-[12.5px] font-semibold text-foreground">{r.type}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 5 && (
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 1 Selesai"}
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
