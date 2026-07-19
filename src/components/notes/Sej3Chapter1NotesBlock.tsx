import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej3Ch1Content } from "@/content/form3/sejarah/chapter-1/sej3ch1-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { NarrowingHierarchyTiers, type NarrowingHierarchyTier } from "./blocks/NarrowingHierarchyTiers";
import { bgPanel, groupGlow, neon } from "./blocks/neon-tokens";
import kemakmuranPelabuhan from "@/assets/form3-content/kemakmuran-pelabuhan.png";

const ORBIT_LABELS = [
  "Pemerintahan",
  "Kemakmuran",
  "Syarikat & Terusan",
  "3 Abad Kedatangan",
  "Persaingan Kuasa",
  "Strategi",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 1.1", title: "Sistem Pemerintahan Sebelum Penjajahan", sub: "Kestabilan bermula daripada sistem pemerintahan beraja yang mantap." },
  { eyebrow: "◆ 1.1", title: "Kemakmuran Negara Kita", sub: "Hasil bumi, sistem ekonomi dan mata wang sendiri sebelum kedatangan Barat." },
  { eyebrow: "◆ 1.2", title: "Syarikat Dagangan Timur & Terusan Suez", sub: "Institusi dan infrastruktur yang mempercepat kedatangan kuasa Barat." },
  { eyebrow: "◆ 1.2", title: "Faktor Kedatangan — Tiga Abad", sub: "Motif kuasa Barat berubah mengikut zaman, tetapi ketamakan tetap sama." },
  { eyebrow: "◆ 1.3", title: "Persaingan Kuasa Barat Mendapatkan Tanah Jajahan", sub: "Sepuluh kuasa berlumba-lumba meluaskan pengaruh di rantau ini." },
  { eyebrow: "◆ 1.4", title: "Strategi Belanda vs British", sub: "British menggunakan jauh lebih banyak taktik untuk menguasai negeri Melayu." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

const GOV_COLORS: NarrowingHierarchyTier["color"][] = ["violet", "violet", "green"];
const GOV_WIDTHS = [280, 340, 400];

export function Sej3Chapter1NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej3Ch1Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej3-c1-section` : undefined;
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

  const govTiers: NarrowingHierarchyTier[] = content.stability.governance.map((g, i) => ({
    label: g.tier,
    description: g.points.join(" · "),
    color: GOV_COLORS[i] ?? "grey",
    maxWidthPx: GOV_WIDTHS[i] ?? 400,
  }));

  const ERA_COLORS = [neon.amber, neon.blue, neon.green];

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🧭</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.stability.intro}</p>
            <NarrowingHierarchyTiers tiers={govTiers} />
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{content.stability.preColonialEvidence}</p>
            </div>
            <DataTable
              headers={["Jenis Perundangan", "Contoh"]}
              rows={content.stability.legalSystems.map((l) => [l.type, l.examples.join(", ")])}
            />
            <ChipRow heading="🌐 Faedah Hubungan Luar" items={content.stability.foreignRelationsBenefit} />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.prosperity.intro}</p>
            <ChipRow heading="⛏️ Hasil Bumi" items={content.prosperity.naturalResources} />
            <ChipRow heading="🧵 Kraf Tangan" items={content.prosperity.craftsmanship} />
            <img
              src={kemakmuranPelabuhan}
              alt="Kemakmuran Pelabuhan Sebelum Penjajahan"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <div className="flex flex-wrap justify-center gap-4">
              {content.prosperity.economicSystem.currency.map((c) => (
                <div
                  key={c.name}
                  className="w-[170px] rounded-2xl p-4.5 text-center"
                  style={{ background: bgPanel, boxShadow: groupGlow(neon.amber, 14, 0.12) }}
                >
                  <div
                    className="mx-auto mb-2.5 h-14 w-14 rounded-full"
                    style={{
                      background: "radial-gradient(circle at 35% 30%, #fde68a, #b45309)",
                      boxShadow: "inset 0 0 8px rgba(0,0,0,0.3), 0 0 12px rgba(251,191,90,0.3)",
                    }}
                  />
                  <h6 className="font-display text-[12px] font-bold text-foreground">{c.name}</h6>
                  <p className="mt-0.5 text-[9.5px] text-muted-foreground">{c.origin}</p>
                </div>
              ))}
            </div>
            <ChipRow heading="⚓ Pelabuhan Utama" items={content.prosperity.economicSystem.ports} />
            <ChipRow heading="⚖️ Sukatan & Timbangan" items={content.prosperity.economicSystem.weightsAndMeasures} />
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{content.prosperity.economicSystem.taxation}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">🕌 Pendidikan Formal</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[11px] leading-relaxed text-muted-foreground">
                  {content.prosperity.education.formal.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">🏡 Pendidikan Tidak Formal</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[11px] leading-relaxed text-muted-foreground">
                  {content.prosperity.education.informal.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.arrivalFactors.intro}</p>
            <DataTable
              headers={["Syarikat", "Ditubuhkan", "Bangsa / Tujuan"]}
              rows={content.arrivalFactors.eastIndiaCompanies.map((e) => [e.name, e.founded, e.nation])}
            />
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12.5px] font-semibold text-foreground">🚢 Terusan Suez</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Dibina {content.arrivalFactors.suezCanal.builder}, mula {content.arrivalFactors.suezCanal.startYear}. {content.arrivalFactors.suezCanal.distanceSaved}.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.arrivalFactors.ideologySlogans.map((s) => (
                <div key={s.power} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <p className="text-[12.5px] font-semibold text-foreground">
                    {s.power}: <span className="italic">"{s.slogan}"</span>
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{s.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-0">
            {content.arrivalFactors.byEra.map((era, i) => (
              <div key={era.era} className="relative flex gap-4 pb-6 last:pb-0">
                {i < content.arrivalFactors.byEra.length - 1 && (
                  <div className="absolute left-6 top-14 h-[calc(100%-2.5rem)] w-0.5" style={{ background: "var(--border)" }} />
                )}
                <div
                  className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-center text-[11px] font-bold leading-tight"
                  style={{ background: bgPanel, border: `2px solid ${ERA_COLORS[i % ERA_COLORS.length]}`, color: ERA_COLORS[i % ERA_COLORS.length] }}
                >
                  {era.era.replace("Abad Ke-", "").replace(" dan Ke-", "-").replace(" hingga Ke-", "-")}
                </div>
                <div className="flex-1 pt-1">
                  <h5 className="font-display mb-2 text-sm font-bold text-foreground">{era.era}</h5>
                  <div className="flex flex-wrap gap-2">
                    {era.factors.map((f) => (
                      <div key={f.name} className="rounded-lg px-3 py-2" style={{ background: bgPanel }}>
                        <p className="text-[11px] font-semibold text-foreground">{f.name}</p>
                        <p className="mt-0.5 max-w-xs text-[10px] leading-relaxed text-muted-foreground">{f.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.competition.intro}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.competition.colonialClaims.map((c) => (
                <div key={c.power} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <h6 className="font-display text-[12px] font-bold" style={{ color: neon.red }}>
                    {c.power}
                  </h6>
                  <p className="mt-1 text-[10.5px] leading-relaxed text-muted-foreground">{c.claim}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.strategies.intro}</p>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12.5px] font-semibold text-foreground">📅 {content.strategies.policyShift.year}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {content.strategies.policyShift.event} — {content.strategies.policyShift.meaning}
              </p>
            </div>
            <div className="flex flex-wrap gap-5">
              <div className="min-w-[250px] flex-1">
                <h4 className="font-display mb-2.5 text-center text-sm font-bold" style={{ color: neon.red }}>
                  Belanda
                </h4>
                <div className="space-y-2">
                  {content.strategies.dutchStrategies.map((s) => (
                    <div key={s} className="rounded-lg px-3.5 py-2.5 text-[11px]" style={{ background: bgPanel }}>
                      <b className="block text-foreground">{s}</b>
                    </div>
                  ))}
                </div>
              </div>
              <div className="min-w-[250px] flex-1">
                <h4 className="font-display mb-2.5 text-center text-sm font-bold" style={{ color: neon.amber }}>
                  British
                </h4>
                <div className="space-y-2">
                  {content.strategies.britishStrategies.map((s) => (
                    <div key={s.term} className="rounded-lg px-3.5 py-2.5 text-[11px]" style={{ background: bgPanel }}>
                      <b className="block text-foreground">{s.term}</b>
                      <span className="text-[10px] text-muted-foreground">{s.definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
