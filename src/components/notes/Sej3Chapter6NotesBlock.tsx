import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej3Ch6Content } from "@/content/form3/sejarah/chapter-6/sej3ch6-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { bgPanel, neon } from "./blocks/neon-tokens";
import ekonomiModen from "@/assets/form3-content/ekonomi-moden-bijih-timah-kereta-api.png";

const ORBIT_LABELS = [
  "Ekonomi Moden",
  "Undang-undang Tanah",
  "Sistem Buruh",
  "Jabatan & Syarikat",
  "Kewangan",
  "Kereta Api",
  "Perbandaran",
  "Pendidikan",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 6.0", title: "Ekonomi Moden — Bijih Timah dan Kereta Api", sub: "British memperkenalkan sistem pentadbiran moden untuk memastikan kelangsungan penguasaan ekonomi." },
  { eyebrow: "◆ 6.1", title: "Undang-undang Tanah Mengikut Wilayah", sub: "Akta tanah yang kelihatan melindungi masyarakat tempatan sebenarnya melindungi kepentingan British." },
  { eyebrow: "◆ 6.1", title: "Sistem Buruh — Kontrak vs Kangani", sub: "Dua sistem pengambilan buruh mengikut kaum dan sektor ekonomi." },
  { eyebrow: "◆ 6.1", title: "Jabatan Kerajaan & Syarikat Perwakilan", sub: "Institusi yang menyokong pentadbiran ekonomi British." },
  { eyebrow: "◆ 6.1", title: "Evolusi Mata Wang, Bank & Insurans", sub: "Daripada Dolar Sepanyol kepada Dolar Malaya." },
  { eyebrow: "◆ 6.2", title: "Tiga Fasa Landasan Kereta Api", sub: "Infrastruktur pengangkutan yang mengubah wajah ekonomi Tanah Melayu." },
  { eyebrow: "◆ 6.3", title: "Perkembangan Bandar & Masyarakat Majmuk", sub: "Kepesatan ekonomi membentuk bandar-bandar baharu di seluruh negara." },
  { eyebrow: "◆ 6.3", title: "Pendidikan Vernakular", sub: "Laporan George Maxwell 1920 mendedahkan matlamat sebenar dasar pendidikan Melayu British." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function Sej3Chapter6NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej3Ch6Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej3-c6-section` : undefined;
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
            <img
              src={ekonomiModen}
              alt="Ekonomi Moden Bijih Timah dan Kereta Api"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.modernEconomyIntro}</p>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            {content.administrationForEconomy.landLaws.map((l) => (
              <div key={l.region} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <p className="text-[12.5px] font-semibold text-foreground">{l.region}</p>
                  <p className="font-display text-[12px] font-bold" style={{ color: neon.amber }}>{l.year}</p>
                </div>
                <ul className="list-disc space-y-1 pl-4 text-[11px] leading-relaxed text-muted-foreground">
                  {l.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              {content.administrationForEconomy.laborSystems.map((s, i) => (
                <div key={s.system} className="flex-1 min-w-[240px] rounded-2xl p-4" style={{ background: bgPanel }}>
                  <h4 className="font-display mb-1 text-[14px] font-bold" style={{ color: i === 0 ? neon.red : neon.amber }}>
                    {s.system} ({s.ethnicGroup})
                  </h4>
                  <ul className="list-disc space-y-1 pl-4 text-[11px] leading-relaxed text-muted-foreground">
                    {s.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ChipRow heading="🛡️ Perlindungan Buruh" items={content.administrationForEconomy.laborProtections} />
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {content.administrationForEconomy.govDepartments.map((d) => (
                <div key={d.name} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <div className="mb-1 flex items-baseline justify-between gap-2">
                    <p className="text-[11.5px] font-semibold text-foreground">{d.name}</p>
                    <p className="shrink-0 font-display text-[11px] font-bold" style={{ color: neon.green }}>{d.year}</p>
                  </div>
                  <p className="text-[10.5px] leading-relaxed text-muted-foreground">{d.role}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="mb-2 text-[11.5px] leading-relaxed text-muted-foreground">{content.administrationForEconomy.agencyHouses.intro}</p>
              <ChipRow items={content.administrationForEconomy.agencyHouses.companies.map((c) => c.name)} />
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🪙 Evolusi Mata Wang</h4>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {content.administrationForEconomy.currencyEvolution.map((c, i) => (
                  <div key={c.era} className="flex items-center gap-2">
                    <div className="max-w-[200px] rounded-xl p-3 text-center" style={{ background: bgPanel }}>
                      <p className="font-display text-[13px] font-bold" style={{ color: neon.amber }}>{c.era}</p>
                      <p className="mt-1 text-[9.5px] leading-snug text-muted-foreground">{c.currency}</p>
                    </div>
                    {i < content.administrationForEconomy.currencyEvolution.length - 1 && (
                      <span className="text-base text-muted-foreground">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <DataTable
              headers={["Bank", "Tahun", "Lokasi"]}
              rows={content.administrationForEconomy.banks.map((b) => [b.name, b.year, b.location])}
            />
            <ChipRow heading="Syarikat Insurans" items={content.administrationForEconomy.insuranceCompanies} />
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.economicEffects.intro}</p>
            <div className="grid gap-3.5 sm:grid-cols-3">
              {content.economicEffects.railwayPhases.map((p) => (
                <div key={p.phase} className="rounded-2xl p-4" style={{ background: bgPanel }}>
                  <h5 className="font-display text-[13px] font-bold" style={{ color: neon.blue }}>{p.phase}</h5>
                  <p className="mb-2 text-[9.5px] text-muted-foreground">{p.years}</p>
                  <p className="mb-2 text-[10.5px] leading-relaxed text-muted-foreground">{p.details}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.towns.map((t) => (
                      <span key={t} className="rounded-full border border-border bg-secondary/40 px-2 py-1 text-[9px] font-medium text-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <ChipRow heading="Infrastruktur Lain" items={content.economicEffects.otherInfrastructure} />
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[11.5px] font-semibold text-foreground">Pelaburan Ladang Getah SBUB</p>
              <p className="mt-1 text-[10.5px] text-muted-foreground">{content.economicEffects.sbubRubberEstates.join(", ")}</p>
            </div>
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <div className="grid gap-3.5 sm:grid-cols-3">
              {content.socialEffects.urbanization.map((u) => (
                <div key={u.region} className="rounded-2xl p-4" style={{ background: bgPanel }}>
                  <h5 className="font-display mb-2 text-[13px] font-bold" style={{ color: neon.green }}>{u.region}</h5>
                  <div className="space-y-2">
                    {u.towns.map((t) => (
                      <div key={t.name}>
                        <p className="text-[11px] font-semibold text-foreground">
                          {t.name} {t.founded !== "-" && <span className="font-normal text-muted-foreground">({t.founded})</span>}
                        </p>
                        <p className="text-[9.5px] leading-relaxed text-muted-foreground">{t.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[11.5px] leading-relaxed text-muted-foreground">{content.socialEffects.multiracialSociety}</p>
            </div>
          </div>
        )}

        {current === 7 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.socialEffects.education.intro}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {content.socialEffects.education.schools.map((s) => (
                <div key={s.type} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <p className="mb-1.5 text-[11.5px] font-semibold text-foreground">{s.type}</p>
                  <ul className="list-disc space-y-1 pl-4 text-[10px] leading-relaxed text-muted-foreground">
                    {s.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl border-l-[3px] p-6"
              style={{ background: bgPanel, borderColor: neon.red, boxShadow: `0 0 24px ${neon.red}26` }}
            >
              <p className="mb-3 text-[10.5px] font-bold" style={{ color: neon.red }}>{content.socialEffects.education.maxwellQuote.source}</p>
              <p className="font-display text-[14px] italic leading-relaxed text-foreground">
                &ldquo;{content.socialEffects.education.maxwellQuote.quote}&rdquo;
              </p>
            </div>
          </div>
        )}

        {current === 8 && (
          <div className="space-y-6">
            <FactGrid heading="✅ Fakta Penting Peperiksaan" facts={content.keyExamFacts} />
            <ChipRow heading="🔑 Istilah Utama" items={content.keyTerms} />
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{content.chapterSummary}</p>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={current === 0}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary/60 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Sebelum
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={onMarkRead}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
                isRead ? "bg-emerald-500/15 text-emerald-400" : "bg-gradient-to-r from-primary to-accent text-white"
              }`}
            >
              {isRead ? "✓ Ditandakan Selesai" : "Tandakan Selesai"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => go(1)}
              className="flex items-center gap-1 rounded-lg bg-secondary/60 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Seterusnya <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
