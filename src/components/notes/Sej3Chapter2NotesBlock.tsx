import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej3Ch2Content } from "@/content/form3/sejarah/chapter-2/sej3ch2-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { bgPanel, bgCard, neon } from "./blocks/neon-tokens";
import ketibaanFrancisLight from "@/assets/form3-content/ketibaan-francis-light.png";

const ORBIT_LABELS = ["Pulau Pinang", "Singapura", "Perjanjian London", "Negeri-negeri Selat", "Pentadbiran", "Rumusan"];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 2.1", title: "Peluasan Kuasa British — Pulau Pinang", sub: "Tipu helah Francis Light terhadap Sultan Abdullah Kedah." },
  { eyebrow: "◆ 2.1", title: "Peluasan Kuasa British — Singapura", sub: "Manipulasi Raffles terhadap isu pewarisan takhta Johor Riau." },
  { eyebrow: "◆ 2.2", title: "Perjanjian London 1824 — Membelah Alam Melayu", sub: "17 Mac 1824, London — dibuat tanpa merujuk Raja-raja Melayu." },
  { eyebrow: "◆ 2.3", title: "Pembentukan Negeri-negeri Selat", sub: "Penggabungan Pulau Pinang, Singapura dan Melaka pada 1826." },
  { eyebrow: "◆ 2.4", title: "Pentadbiran Negeri-negeri Selat", sub: "Tiga era pentadbiran hingga pembubarannya pada 1946." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

function AcquisitionStory({ narrative, lastRed }: { narrative: string[]; lastRed?: boolean }) {
  return (
    <div className="flex flex-col gap-0">
      {narrative.map((line, i) => (
        <div key={i} className="relative flex gap-2.5 py-1.5">
          {i < narrative.length - 1 && (
            <div className="absolute left-[9px] top-[26px] h-[calc(100%-8px)] w-px" style={{ background: "var(--border)" }} />
          )}
          <div
            className="z-10 mt-0.5 h-[18px] w-[18px] shrink-0 rounded-full"
            style={{
              background: bgCard,
              border: `1px solid ${lastRed && i === narrative.length - 1 ? neon.red : "var(--border)"}`,
            }}
          />
          <p className="pt-px text-[10.5px] leading-relaxed text-muted-foreground">{line}</p>
        </div>
      ))}
    </div>
  );
}

export function Sej3Chapter2NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej3Ch2Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej3-c2-section` : undefined;
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

  const penang = content.acquisitions.find((a) => a.settlement === "Pulau Pinang");
  const singapura = content.acquisitions.find((a) => a.settlement === "Singapura");

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🎭</div>
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

        {current === 0 && penang && (
          <div className="space-y-6">
            <img
              src={ketibaanFrancisLight}
              alt="Ketibaan Francis Light di Pulau Pinang"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <div className="rounded-2xl p-4.5" style={{ background: bgPanel }}>
              <h4 className="font-display text-[15px] font-bold text-foreground">Pulau Pinang</h4>
              <p className="mb-3 text-[10.5px] font-bold" style={{ color: neon.amber }}>
                {penang.keyFigures.join(" · ")}
              </p>
              <AcquisitionStory narrative={penang.narrative} lastRed />
            </div>
            <DataTable
              headers={["Tarikh", "Peristiwa"]}
              rows={penang.keyDates.map((d) => [d.date, d.event])}
            />
          </div>
        )}

        {current === 1 && singapura && (
          <div className="space-y-6">
            <div className="rounded-2xl p-4.5" style={{ background: bgPanel }}>
              <h4 className="font-display text-[15px] font-bold text-foreground">Singapura</h4>
              <p className="mb-3 text-[10.5px] font-bold" style={{ color: neon.amber }}>
                {singapura.keyFigures.join(" · ")}
              </p>
              <AcquisitionStory narrative={singapura.narrative} lastRed />
            </div>
            <DataTable
              headers={["Tarikh", "Peristiwa"]}
              rows={singapura.keyDates.map((d) => [d.date, d.event])}
            />
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.londonTreaty1824.background}</p>
            <ChipRow
              heading="⚔️ Peperangan British-Belanda Terdahulu"
              items={content.londonTreaty1824.priorWars.map((w) => `${w.war} (${w.years})`)}
            />

            {/* Split-screen Alam Melayu division — signature element */}
            <div className="flex overflow-hidden rounded-2xl shadow-[0_0_30px_rgba(139,107,255,0.1)]">
              <div
                className="flex-1 p-6"
                style={{ background: "linear-gradient(135deg, rgba(79,176,255,0.15), rgba(79,176,255,0.05))" }}
              >
                <h4 className="font-display text-base font-bold" style={{ color: neon.blue }}>
                  Tanah Melayu
                </h4>
                <p className="mb-3 text-[10.5px] text-muted-foreground/80">Lingkungan Pengaruh British</p>
                <ul className="list-disc space-y-1.5 pl-4 text-[11px] leading-relaxed text-muted-foreground">
                  {content.londonTreaty1824.terms.find((t) => t.party === "Belanda")?.terms.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <div className="relative w-[3px] shrink-0" style={{ background: `linear-gradient(180deg, ${neon.blue}, ${neon.amber})` }}>
                <div
                  className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs"
                  style={{ background: bgCard }}
                >
                  ⚡
                </div>
              </div>
              <div
                className="flex-1 p-6"
                style={{ background: "linear-gradient(135deg, rgba(251,191,90,0.15), rgba(251,191,90,0.05))" }}
              >
                <h4 className="font-display text-base font-bold" style={{ color: neon.amber }}>
                  Hindia Timur Belanda
                </h4>
                <p className="mb-3 text-[10.5px] text-muted-foreground/80">Lingkungan Pengaruh Belanda</p>
                <ul className="list-disc space-y-1.5 pl-4 text-[11px] leading-relaxed text-muted-foreground">
                  {content.londonTreaty1824.terms.find((t) => t.party === "British")?.terms.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.londonTreaty1824.terms.map((t) => (
                <div key={t.party} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <h6 className="font-display mb-2 text-[12px] font-bold" style={{ color: t.party === "British" ? neon.blue : neon.amber }}>
                    Syarat {t.party}
                  </h6>
                  <ul className="list-disc space-y-1 pl-3.5 text-[10px] leading-relaxed text-muted-foreground">
                    {t.terms.map((term) => (
                      <li key={term}>{term}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{content.londonTreaty1824.effects.divisionOfAlamMelayu}</p>
            </div>
            <ChipRow heading="💔 Kesan ke atas Johor Riau" items={content.londonTreaty1824.effects.johorRiauBreakup} />
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.formation.intro}</p>
            <DataTable
              headers={["Petempatan", "Tempoh", "Fakta"]}
              rows={content.formation.preFormationStatus.map((p) => [p.settlement, p.years, p.facts.join("; ")])}
            />
            <ChipRow heading="⭐ Kepentingan Penubuhan" items={content.formation.importance} />
            <DataTable
              headers={["Wilayah Tambahan", "Tahun", "Catatan"]}
              rows={content.formation.laterTerritories.map((t) => [t.name, t.yearAdded, t.note])}
            />
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-1 py-2">
              {content.administration.eras.map((era, i) => (
                <div key={era.era} className="flex items-center gap-1">
                  <div className="max-w-[170px] px-2.5 text-center">
                    <h6 className="font-display text-[11.5px] font-bold text-foreground">{era.era}</h6>
                    <p className="text-[9.5px] text-muted-foreground">{era.years}</p>
                  </div>
                  {i < content.administration.eras.length - 1 && <span className="px-1 text-base text-muted-foreground">→</span>}
                </div>
              ))}
            </div>
            {content.administration.eras.map((era) => (
              <div key={era.era} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="mb-1.5 text-[12px] font-semibold text-foreground">{era.era} ({era.years})</p>
                <ul className="list-disc space-y-1 pl-4 text-[10.5px] leading-relaxed text-muted-foreground">
                  {[...era.structure, ...era.notes].map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
            <ChipRow heading="📉 Faktor Pertukaran Pentadbiran" items={content.administration.transferFactors} />
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{content.administration.notableFact}</p>
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
