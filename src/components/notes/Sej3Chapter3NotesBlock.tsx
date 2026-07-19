import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej3Ch3Content } from "@/content/form3/sejarah/chapter-3/sej3ch3-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { NarrowingHierarchyTiers, type NarrowingHierarchyTier } from "./blocks/NarrowingHierarchyTiers";
import { bgPanel, groupGlow, neon } from "./blocks/neon-tokens";
import legendaBijihTimah from "@/assets/form3-content/legenda-bijih-timah-larut.png";
import perjanjianPangkor from "@/assets/form3-content/perjanjian-pangkor-1874.png";

const ORBIT_LABELS = ["Bijih Timah", "Titah Long Jaafar", "Emas Pahang", "Perjanjian Pangkor", "Sistem Residen", "NNMB", "Rumusan"];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 3.1", title: "Kekayaan Bijih Timah — Empat Era", sub: "Bijih timah menjadi barangan dagangan penting sejak zaman Kesultanan Melayu Melaka." },
  { eyebrow: "◆ 3.1", title: "Titah Sultan kepada Long Jaafar", sub: "Surat kuasa pengurniaan daerah Larut, 28 Februari 1850." },
  { eyebrow: "◆ 3.1", title: "Jalur Emas Pahang", sub: "Nama purba Semenanjung Tanah Melayu sejak berabad lalu." },
  { eyebrow: "◆ 3.2 & 3.3", title: "Perjanjian Pangkor 1874", sub: "Ditandatangani di atas kapal perang British, HMS Pluto." },
  { eyebrow: "◆ 3.3", title: "Sistem Residen", sub: "Sistem pemerintahan British secara tidak langsung." },
  { eyebrow: "◆ 3.4", title: "Pembentukan & Pentadbiran NNMB", sub: "Perjanjian Persekutuan 1895 mengukuhkan kuasa British." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

const FMS_TIERS: NarrowingHierarchyTier["color"][] = ["violet", "violet", "green"];
const FMS_WIDTHS = [260, 340, 460];

export function Sej3Chapter3NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej3Ch3Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej3-c3-section` : undefined;
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

  const fmsTiers: NarrowingHierarchyTier[] = [
    { label: "Residen Jeneral", description: "Ketua pentadbiran kerajaan persekutuan", color: FMS_TIERS[0], maxWidthPx: FMS_WIDTHS[0] },
    { label: content.administration.federalCouncil.councilName, description: `Dipengerusikan ${content.administration.federalCouncil.chair}`, color: FMS_TIERS[1], maxWidthPx: FMS_WIDTHS[1] },
    { label: "Perak · Selangor · Negeri Sembilan · Pahang", description: "Empat negeri anggota NNMB", color: FMS_TIERS[2], maxWidthPx: FMS_WIDTHS[2] },
  ];

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">⛏️</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.tinWealth.intro}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {content.tinWealth.eras.map((era) => (
                <div key={era.era} className="rounded-2xl p-4" style={{ background: bgPanel }}>
                  <h6 className="font-display mb-2 text-[12px] font-bold" style={{ color: neon.amber }}>
                    {era.era}
                  </h6>
                  <ul className="list-disc space-y-1 pl-3.5 text-[10px] leading-relaxed text-muted-foreground">
                    {era.facts.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <img
              src={legendaBijihTimah}
              alt="Legenda Penemuan Bijih Timah di Larut"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <div
              className="rounded-2xl border-l-[3px] p-6"
              style={{ background: bgPanel, borderColor: neon.amber, boxShadow: groupGlow(neon.amber, 24, 0.15) }}
            >
              <p className="mb-3 text-[10.5px] font-bold" style={{ color: neon.amber }}>
                {content.tinWealth.longJaafarQuote.context}
              </p>
              <p className="font-display text-[14px] italic leading-relaxed text-foreground">"{content.tinWealth.longJaafarQuote.quote}"</p>
              <p className="mt-3 text-right text-[10px] text-muted-foreground">{content.tinWealth.longJaafarQuote.date}</p>
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.goldWealth.location}</p>
            <div className="flex flex-wrap justify-center gap-5">
              {content.goldWealth.ancientNames.map((n) => (
                <div key={n.name} className="w-[220px] rounded-2xl p-4.5 text-center" style={{ background: bgPanel }}>
                  <h5 className="font-display mb-1 text-[15px] font-bold" style={{ color: neon.green }}>
                    {n.name}
                  </h5>
                  <p className="mb-1.5 text-[9.5px] text-muted-foreground">{n.source}</p>
                  <p className="text-[11px] text-muted-foreground">"{n.meaning}"</p>
                </div>
              ))}
            </div>
            <ChipRow heading="✨ Kegunaan Emas" items={content.goldWealth.uses} />
            <h4 className="font-display text-sm font-bold text-foreground">🗺️ Strategi Peluasan Kuasa British Mengikut Negeri</h4>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {content.expansionStrategies.stateExpansions.map((s) => (
                <div key={s.state} className="rounded-2xl p-4" style={{ background: bgPanel }}>
                  <h6 className="font-display mb-2 text-[12.5px] font-bold text-foreground">{s.state}</h6>
                  <ul className="mb-2 list-disc space-y-1 pl-3.5 text-[10px] leading-relaxed text-muted-foreground">
                    {s.pretext.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <p className="border-t border-border pt-2 text-[10px] font-semibold leading-relaxed text-emerald-300">✓ {s.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.pangkorTreaty.intro}</p>
            <img
              src={perjanjianPangkor}
              alt="Perjanjian Pangkor 1874"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <p className="text-[12px] leading-relaxed text-muted-foreground">
              <b className="text-foreground">Pengantara:</b> {content.pangkorTreaty.mediator}
            </p>
            <div className="flex flex-col gap-0">
              {content.pangkorTreaty.terms.map((term, i) => (
                <div key={term} className="relative flex gap-3 py-2">
                  {i < content.pangkorTreaty.terms.length - 1 && (
                    <div className="absolute left-[13px] top-[34px] h-[calc(100%-8px)] w-0.5" style={{ background: "var(--border)" }} />
                  )}
                  <div
                    className="z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ background: bgPanel, border: `1px solid ${neon.red}`, color: neon.red }}
                  >
                    {i + 1}
                  </div>
                  <p className="pt-0.5 text-[11px] leading-relaxed text-muted-foreground">{term}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-[11px] text-muted-foreground">{content.pangkorTreaty.signingLocation}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <ChipRow heading="✓ Hadir" items={content.pangkorTreaty.attendees} />
              <ChipRow heading="✗ Tidak Hadir" items={content.pangkorTreaty.absentees} />
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.residentialSystem.intro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.residentialSystem.characteristics.map((c) => (
                <div key={c} className="rounded-xl p-3.5 text-[10.5px] leading-relaxed text-muted-foreground" style={{ background: bgPanel }}>
                  {c}
                </div>
              ))}
            </div>
            <ChipRow heading="🏛️ Jabatan Baharu" items={content.residentialSystem.newDepartments} />
            <div className="rounded-xl p-3.5" style={{ background: bgPanel, boxShadow: groupGlow(neon.red, 16, 0.1) }}>
              <p className="text-[12.5px] font-semibold text-foreground">
                {content.residentialSystem.firstResident.name} — {content.residentialSystem.firstResident.state}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{content.residentialSystem.assassinationNote}</p>
            </div>
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.fmsFormation.intro}</p>
            <ChipRow heading="🏴 Ciri-ciri NNMB" items={content.fmsFormation.characteristics} />
            <ChipRow heading="⭐ Faktor Pembentukan" items={content.fmsFormation.formationFactors} />
            <p className="text-center text-[11px] text-muted-foreground">{content.fmsFormation.alternateName}</p>
            <h4 className="font-display text-sm font-bold text-foreground">🏛️ Struktur Pentadbiran NNMB</h4>
            <NarrowingHierarchyTiers tiers={fmsTiers} />
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[11.5px] leading-relaxed text-muted-foreground">
                {content.administration.stateCouncil.role}. {content.administration.stateCouncil.changeAfterFMS}
              </p>
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12.5px] font-semibold text-foreground">🎪 Durbar</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {content.administration.durbar.purpose}. Pertama diadakan {content.administration.durbar.firstHeld}.
              </p>
            </div>
            <DataTable
              headers={["Jawatan Frank Swettenham", "Tempoh"]}
              rows={content.administration.swettenhamRoles.map((r) => [r.role, r.years])}
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
