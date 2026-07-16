import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej8Content } from "@/content/form1/sejarah/chapter-8/sej8-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { DataTable } from "./blocks/DataTable";
import { FlatSplitCards } from "./blocks/FlatSplitCards";
import { FlatLifeTimeline } from "./blocks/FlatLifeTimeline";
import { TraitTiles } from "./blocks/TraitTiles";
import { LeadershipCategoryGrid } from "./blocks/LeadershipCategoryGrid";
import { ScholarCards } from "./blocks/ScholarCards";
import seniBinaTamadunIslam from "@/assets/form1-content/seni-bina-tamadun-islam.png";

const ORBIT_LABELS = [
  "Arab Sebelum Islam",
  "Peristiwa Penting",
  "Sifat Terpuji",
  "Ketokohan Pemimpin",
  "Sumbangan Dunia",
  "Seni Bina Islam",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 8.1", title: "Masyarakat Arab Sebelum Islam", sub: "Dua kumpulan masyarakat, dua cara hidup yang berbeza." },
  { eyebrow: "◆ 8.2", title: "Peristiwa Penting — Kelahiran hingga Wahyu Pertama", sub: "Susur galur kronologi seperti yang dicatatkan dalam sejarah." },
  { eyebrow: "◆ 8.3", title: "Empat Sifat Terpuji" },
  { eyebrow: "◆ 8.4", title: "Ketokohan sebagai Pemimpin", sub: "Empat aspek kepimpinan yang diiktiraf." },
  { eyebrow: "◆ 8.5", title: "Tujuh Tokoh Ilmuwan Islam", sub: "Sumbangan yang membentuk sains dan falsafah dunia." },
  { eyebrow: "◆ 8.6", title: "Seni Bina Islam", sub: "Bermula dengan Masjid Quba' — model bagi seni bina masjid sehingga kini." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function SejChapter8NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej8Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej-c8-section` : undefined;
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
      <div className="mb-6 rounded-2xl border border-border bg-secondary/30 p-5">
        <p className="font-display mb-1 text-base font-bold text-foreground sm:text-lg">{content.hook.title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{content.hook.body}</p>
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
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-all ${
                i < current
                  ? "border-border bg-secondary text-foreground"
                  : i === current
                    ? "border-foreground text-foreground"
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
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{chrome.eyebrow}</p>
        <h2 className="font-display mb-1 text-xl font-bold text-foreground sm:text-2xl">{chrome.title}</h2>
        {chrome.sub && <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">{chrome.sub}</p>}
        {!chrome.sub && <div className="mb-6" />}

        {current === 0 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.preIslamicArabia.location}</p>
            <ChipRow heading="🗺️ Wilayah" items={content.preIslamicArabia.regions} />
            <ChipRow heading="🏙️ Bandar Utama" items={content.preIslamicArabia.keyCities} />
            <FlatSplitCards
              items={content.preIslamicArabia.politicalSystem.groups.map((g, i) => ({
                title: g.name,
                color: i === 0 ? "#fbbf5a" : "#4fb0ff",
                description: g.description,
              }))}
            />
            <p className="text-center text-[11px] text-muted-foreground">{content.preIslamicArabia.jahiliahMeaning}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.preIslamicArabia.politicalSystem.assabiyah}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.preIslamicArabia.politicalSystem.makkahAdmin}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.preIslamicArabia.maarib}</p>
            <ChipRow heading="🌾 Pertanian" items={content.preIslamicArabia.economicSystem.agriculture} />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.preIslamicArabia.economicSystem.tradeRoutes}</p>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <FlatLifeTimeline
              steps={[
                {
                  step: 1,
                  text: `${content.emergenceOfIslam.prophetBirth.date} — kelahiran, ayahanda ${content.emergenceOfIslam.prophetBirth.father}, ibunda ${content.emergenceOfIslam.prophetBirth.mother}`,
                },
                { step: 2, text: content.emergenceOfIslam.earlyLife[0] },
                { step: 3, text: content.emergenceOfIslam.earlyLife[1] },
                { step: 4, text: content.emergenceOfIslam.earlyLife[2] },
                { step: 5, text: content.emergenceOfIslam.earlyLife[4] },
                {
                  step: 6,
                  text: `${content.emergenceOfIslam.firstRevelation.date} — wahyu pertama di ${content.emergenceOfIslam.firstRevelation.location}, ${content.emergenceOfIslam.firstRevelation.surah}`,
                },
                { step: 7, text: `Dakwah secara rahsia (${content.emergenceOfIslam.dakwahStages.secret[0]}), kemudian terang-terangan` },
                { step: 8, text: `${content.emergenceOfIslam.hijrah}. Piagam Madinah: ${content.emergenceOfIslam.piagamMadinah}` },
              ]}
            />
            <ChipRow heading="🌍 Dakwah Antarabangsa" items={content.emergenceOfIslam.internationalDakwah} />
          </div>
        )}

        {current === 2 && <TraitTiles items={content.emergenceOfIslam.fourTraits} />}

        {current === 3 && <LeadershipCategoryGrid categories={content.prophetLeadership} />}

        {current === 4 && (
          <div className="space-y-6">
            <ChipRow heading="🌾 Inovasi Pertanian" items={content.worldContributions.agriculturalInnovation} />
            <DataTable
              headers={["Pusat Intelektual", "Fakta"]}
              rows={content.worldContributions.intellectualCenters.map((c) => [c.location, c.facts.join(" · ")])}
            />
            <ScholarCards scholars={content.worldContributions.scholars} />
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.architecture.definition}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.architecture.firstMosque}</p>
            <img
              src={seniBinaTamadunIslam}
              alt="Seni Bina Tamadun Islam"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <IconCardGrid
              items={content.architecture.features.map((f) => ({
                label: f.feature,
                detail: f.example ? [f.description, `Contoh: ${f.example}`] : f.description,
              }))}
            />
            <ChipRow
              heading="🕌 Contoh Sebenar"
              items={content.architecture.realExamples.map((e) => `${e.building} (${e.location})`)}
            />
          </div>
        )}

        {current === 6 && (
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
                  className={`inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors ${
                    isRead ? "cursor-default bg-secondary/60 text-foreground" : "bg-secondary/30 text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 8 Selesai"}
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/60"
            >
              Seksyen seterusnya <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
