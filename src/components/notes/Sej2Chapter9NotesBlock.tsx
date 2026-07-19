import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch9Content } from "@/content/form2/sejarah/chapter-9/sej2ch9-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { EraDotTimeline } from "./blocks/EraDotTimeline";
import { ProcessSteps } from "./blocks/ProcessSteps";
import { KingdomChipGrid } from "./blocks/KingdomChipGrid";
import { NarrowingHierarchyTiers, type NarrowingHierarchyTier } from "./blocks/NarrowingHierarchyTiers";
import { bgPanel, groupGlow, neon } from "./blocks/neon-tokens";

const ORBIT_LABELS = ["Warisan 3 Kerajaan", "Salasilah & Pertabalan", "Adat Perpatih", "Hierarki Adat", "Rumusan"];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 9.1", title: "5 Aspek Warisan Kedah, Kelantan dan Perlis", sub: "Sistem pemerintahan beraja, adat istiadat, perundangan, persuratan dan kesenian kekal hingga kini." },
  { eyebrow: "◆ 9.1", title: "Salasilah Raja Perlis & Istiadat Pertabalan", sub: "Tujuh Raja Perlis meneruskan salasilah Jamalullail; pertabalan mengikut empat langkah tetap." },
  { eyebrow: "◆ 9.2", title: "Keunikan Adat Perpatih Negeri Sembilan", sub: "Sistem matrilineal yang unik — jurai ibu, perkahwinan luar suku, dan upacara kedim." },
  { eyebrow: "◆ 9.2", title: "Hierarki Pemerintahan Adat Perpatih", sub: "Daripada Yamtuan Besar hingga Ibu Soko — dipilih melalui permuafakatan, bukan diwarisi terus." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

const TIER_WIDTHS: Record<string, number> = {
  "Yamtuan Besar / Yang di-Pertuan Besar": 280,
  Undang: 380,
  Lembaga: 460,
  Buapak: 540,
  "Ibu Soko": 620,
};

const TIER_COLORS: NarrowingHierarchyTier["color"][] = ["violet", "blue", "amber", "green", "pink"];

export function Sej2Chapter9NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch9Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c9-section` : undefined;
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

  const hierarchyTiers: NarrowingHierarchyTier[] = content.negeriSembilanUniqueness.hierarchy.map((h, i) => ({
    label: h.role,
    description: `${h.selectedBy} — ${h.functions.join("; ")}`,
    color: TIER_COLORS[i % TIER_COLORS.length],
    maxWidthPx: TIER_WIDTHS[h.role] ?? 320 + i * 80,
  }));

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🏛️</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.legacyOfThreeKingdoms.intro}</p>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {content.legacyOfThreeKingdoms.aspects.map((a) => (
                <div key={a.aspect} className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: groupGlow(neon.violet, 14, 0.1) }}>
                  <h5 className="font-display mb-1.5 text-[12.5px] font-bold" style={{ color: neon.violet }}>
                    {a.aspect}
                  </h5>
                  <p className="text-[10.5px] leading-relaxed text-muted-foreground">{a.description}</p>
                  {a.detail && (
                    <ul className="mt-2 space-y-1">
                      {a.detail.map((d) => (
                        <li key={d} className="text-[9.5px] leading-relaxed text-muted-foreground/80">
                          · {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <DataTable
              headers={["Negeri", "Gelaran Pemerintah"]}
              rows={content.legacyOfThreeKingdoms.royalTitles.map((r) => [r.kingdom, r.title])}
            />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-8">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">👑 Salasilah 7 Raja Perlis</h4>
              <EraDotTimeline
                items={content.legacyOfThreeKingdoms.perlisLineage.map((r, i) => ({
                  label: r.ruler.replace("Tuanku ", ""),
                  detail: r.years,
                  color: (["violet", "blue", "amber", "green", "pink", "orange", "red"] as const)[i % 7],
                }))}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">📜 Langkah Istiadat Pertabalan</h4>
              <ProcessSteps
                steps={content.legacyOfThreeKingdoms.coronationSteps.map((s, i) => ({
                  step: i + 1,
                  heading: s.split(" — ")[0],
                  body: s.split(" — ").slice(1).join(" — ") || s,
                }))}
              />
            </div>
            <DataTable
              headers={["Peringkat", "Peranan"]}
              rows={content.legacyOfThreeKingdoms.governanceHierarchy.map((g) => [g.tier, g.role])}
            />
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.negeriSembilanUniqueness.intro}</p>
            <KingdomChipGrid
              items={content.negeriSembilanUniqueness.features.map((f) => ({
                name: f.feature,
                chips: [],
                note: f.points.join(" · "),
              }))}
            />
            <div
              className="rounded-2xl border-l-4 p-5"
              style={{ borderColor: neon.amber, background: bgPanel, boxShadow: groupGlow(neon.amber, 18, 0.14) }}
            >
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: neon.amber }}>
                Kedim — perbilangan sumpah
              </p>
              <p className="font-display text-[15px] italic leading-relaxed text-foreground">"{content.negeriSembilanUniqueness.kedimChant}"</p>
            </div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">{content.negeriSembilanUniqueness.sukuCount}</p>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <div className="overflow-x-auto py-2">
              <NarrowingHierarchyTiers tiers={hierarchyTiers} />
            </div>
            <ChipRow heading="👪 Kumpulan Masyarakat" items={content.negeriSembilanUniqueness.societalGroups} />
          </div>
        )}

        {current === 4 && (
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 9 Selesai"}
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
