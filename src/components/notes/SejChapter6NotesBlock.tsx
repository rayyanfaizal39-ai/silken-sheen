import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej6Content } from "@/content/form1/sejarah/chapter-6/sej6-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { PolisPopulationBars } from "./blocks/PolisPopulationBars";
import { GovernmentSystemCards } from "./blocks/GovernmentSystemCards";
import { DewanHierarchyTree } from "./blocks/DewanHierarchyTree";
import { RomanEraTimeline } from "./blocks/RomanEraTimeline";
import { ArchBuildingCards } from "./blocks/ArchBuildingCards";
import { bgPanel, groupGlow, neon } from "./blocks/neon-tokens";
import polisTamadunYunani from "@/assets/form1-content/polis-tamadun-yunani.png";
import seniBinaTamadunRom from "@/assets/form1-content/seni-bina-tamadun-rom.png";

const ORBIT_LABELS = [
  "Pengenalan Yunani",
  "Konsep Polis",
  "Sistem Pemerintahan",
  "Demokrasi Athens",
  "Pengenalan Rom",
  "Tiga Zaman Rom",
  "Seni Bina Rom",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 6.1", title: "Tamadun Yunani" },
  { eyebrow: "◆ 6.2", title: "Konsep Polis", sub: "Athens paling ramai penduduk, Sparta paling luas." },
  { eyebrow: "◆ 6.3", title: "Lima Sistem Pemerintahan Yunani", sub: "Athens beralih daripada empat sistem lain sebelum memilih demokrasi." },
  { eyebrow: "◆ 6.4", title: "Demokrasi Athens", sub: "Dewan Perhimpunan sebagai badan tertinggi." },
  { eyebrow: "◆ 6.5", title: "Tamadun Rom" },
  { eyebrow: "◆ 6.6", title: "Tiga Zaman Tamadun Rom", sub: "Pax Romana — 200 tahun keamanan pada zaman kegemilangan." },
  { eyebrow: "◆ 6.7", title: "Seni Bina Rom", sub: "Empat binaan yang masih kekal sebagai warisan dunia." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const POLIS_VALUES: Record<string, number> = { Athens: 40000, Sparta: 16000, Corinth: 10000 };

const TOTAL = ORBIT_LABELS.length;

export function SejChapter6NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej6Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej-c6-section` : undefined;
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.greekOverview.duration}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.greekOverview.significance}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.greekOverview.location}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.greekOverview.climateEffect}</p>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.polisConcept.definition}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Acropolis: </span>
              {content.polisConcept.acropolis}
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Agora: </span>
              {content.polisConcept.agora}
            </p>
            <img
              src={polisTamadunYunani}
              alt="Polis dalam Tamadun Yunani"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <PolisPopulationBars
              items={content.polisConcept.famousPolis.map((p) => ({
                name: p.name,
                population: p.population,
                populationValue: POLIS_VALUES[p.name] ?? 0,
              }))}
            />
            <p className="text-center text-[11px] text-muted-foreground">
              Keluasan: {content.polisConcept.famousPolis.map((p) => `${p.name} ${p.area}`).join(" · ")}
            </p>
          </div>
        )}

        {current === 2 && <GovernmentSystemCards systems={content.governmentSystems} />}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.athensDemocracy.intro}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.athensDemocracy.type}</p>
            <DewanHierarchyTree top={content.athensDemocracy.structure[0]} items={content.athensDemocracy.structure.slice(1)} />
            <p className="text-center text-[11px] text-muted-foreground">
              {content.athensDemocracy.founder} ({content.athensDemocracy.founderDate}) →{" "}
              {content.athensDemocracy.leaders[1]?.name} ({content.athensDemocracy.leaders[1]?.dateOrDuration}) → {content.athensDemocracy.endDate}
            </p>
            <FactGrid heading="🏛️ Fungsi Dewan Perhimpunan" facts={content.athensDemocracy.assemblyFunctions} />
            <ChipRow heading="👥 Peraturan Keahlian" items={content.athensDemocracy.membershipRules} />
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.romanOverview.relationToGreek}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.romanOverview.location}</p>
            <ChipRow heading="⚔️ Rival Utama" items={content.romanOverview.rivals} />
            <DataTable
              headers={["Kelas Sosial", "Komposisi"]}
              rows={content.romanOverview.socialClasses.map((c) => [c.name, c.composition])}
            />
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <RomanEraTimeline eras={content.romanOverview.eras} />
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: bgPanel, boxShadow: groupGlow(neon.amber, 16, 0.15) }}
            >
              <p className="text-[12.5px] font-bold" style={{ color: neon.amber }}>
                {content.romanOverview.goldenAge}
              </p>
            </div>
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.architecture.intro}</p>
            <img
              src={seniBinaTamadunRom}
              alt="Seni Bina Tamadun Rom"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <ChipRow heading="🏗️ Ciri Seni Bina" items={content.architecture.features} />
            <ArchBuildingCards buildings={content.architecture.buildings} />
            <ChipRow heading="🤝 Penyokong" items={content.architecture.supporters} />
            <p className="text-center text-[11px] text-muted-foreground">
              {content.architecture.keyFigure.name} — "{content.architecture.keyFigure.work}" ({content.architecture.keyFigure.year})
              · {content.architecture.cementFact}
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 6 Selesai"}
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
