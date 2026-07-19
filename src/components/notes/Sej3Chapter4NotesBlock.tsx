import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej3Ch4Content } from "@/content/form3/sejarah/chapter-4/sej3ch4-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { bgPanel, neon } from "./blocks/neon-tokens";
import warisanSenibina from "@/assets/form3-content/warisan-senibina-nnmtb.png";

const ORBIT_LABELS = ["Pemerintahan Negeri", "Faktor Peluasan", "Perjanjian Bangkok", "Johor", "Pentadbiran NNMTB", "Rumusan"];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 4.1", title: "Pemerintahan Sebelum Campur Tangan", sub: "Perlis, Kedah, Kelantan, Terengganu dan Johor sebelum Penasihat British." },
  { eyebrow: "◆ 4.2", title: "Faktor Peluasan Kuasa British", sub: "Motif British meluaskan pengaruh ke negeri Melayu utara." },
  { eyebrow: "◆ 4.2", title: "Ke Arah Perjanjian Bangkok 1909", sub: "Siri rundingan British-Siam sejak 1826." },
  { eyebrow: "◆ 4.3", title: "Johor — Berdaulat Hingga 1914", sub: "Kemakmuran sendiri menangguhkan campur tangan selama lebih 90 tahun." },
  { eyebrow: "◆ 4.4", title: "Pentadbiran NNMTB & Paradoks Autonomi", sub: "Negeri 'Tidak Bersekutu' sebenarnya lebih bebas daripada negeri 'Bersekutu'." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

function StateSection({ heading, items }: { heading: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mb-2 last:mb-0">
      <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">{heading}</p>
      <ul className="list-disc space-y-0.5 pl-3.5 text-[10px] leading-relaxed text-muted-foreground">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export function Sej3Chapter4NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej3Ch4Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej3-c4-section` : undefined;
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
            <img
              src={warisanSenibina}
              alt="Warisan Senibina Negeri-negeri Melayu Tidak Bersekutu"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.stateGovernance.map((s) => (
                <div key={s.state} className="rounded-2xl p-4" style={{ background: bgPanel }}>
                  <h4 className="font-display mb-2.5 text-[13.5px] font-bold text-foreground">{s.state}</h4>
                  <StateSection heading="Latar Belakang" items={s.background} />
                  <StateSection heading="Pentadbiran" items={s.administration} />
                  <StateSection heading="Hubungan Luar" items={s.foreignRelations} />
                  <StateSection heading="Perundangan" items={s.legalSystem} />
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <div className="grid gap-3.5 sm:grid-cols-2">
              {content.britishExpansionFactors.map((f) => (
                <div key={f.factor} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <p className="text-[12.5px] font-semibold text-foreground">{f.factor}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.bangkokTreatyPath.intro}</p>
            <DataTable
              headers={["Perjanjian", "Tahun", "Kandungan"]}
              rows={content.bangkokTreatyPath.priorTreaties.map((t) => [t.name, t.year, t.content])}
            />
            <div className="flex flex-col gap-0">
              {content.bangkokTreatyPath.timeline.map((step, i) => {
                const isLastStep = i === content.bangkokTreatyPath.timeline.length - 1;
                return (
                  <div key={step.date} className="relative flex gap-3 py-2">
                    {i < content.bangkokTreatyPath.timeline.length - 1 && (
                      <div className="absolute left-3 top-8 h-[calc(100%-8px)] w-0.5" style={{ background: "var(--border)" }} />
                    )}
                    <div
                      className="z-10 shrink-0 rounded-full"
                      style={
                        isLastStep
                          ? { width: 28, height: 28, background: neon.violet, boxShadow: `0 0 12px ${neon.violet}80` }
                          : { width: 24, height: 24, background: bgPanel, border: `1px solid ${neon.violet}` }
                      }
                    />
                    <p className="pt-1 text-[11px] leading-relaxed text-muted-foreground">
                      <b className="font-mono text-foreground">{step.date}</b> — {step.event}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-[11px] text-muted-foreground">
              Ditandatangani {content.bangkokTreatyPath.signingDetails.date}: {content.bangkokTreatyPath.signingDetails.parties.join(" & ")}
            </p>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{content.bangkokTreatyPath.effect}</p>
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[11.5px] leading-relaxed text-muted-foreground">{content.bangkokTreatyPath.initialRejection}</p>
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.johorExpansion.intro}</p>
            <ChipRow heading="📈 Faktor Kemakmuran" items={content.johorExpansion.prosperityFactors} />
            <div className="flex flex-wrap justify-center gap-3">
              {content.johorExpansion.agreements.map((a) => {
                const isFinal = a.year === "1914";
                return (
                  <div
                    key={a.year}
                    className="w-[180px] rounded-2xl p-4 text-center"
                    style={{
                      background: bgPanel,
                      boxShadow: isFinal ? `0 0 16px ${neon.red}4d` : undefined,
                      border: isFinal ? `1px solid ${neon.red}4d` : undefined,
                    }}
                  >
                    <div className="font-display text-[17px] font-bold" style={{ color: isFinal ? neon.red : neon.amber }}>
                      {a.year}
                    </div>
                    <p className="mt-1.5 text-[9.5px] font-semibold text-foreground">{a.agreement}</p>
                    <p className="mt-1 text-[9.5px] leading-relaxed text-muted-foreground">{a.content}</p>
                  </div>
                );
              })}
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12.5px] font-semibold text-foreground">{content.johorExpansion.firstAdvisor}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{content.johorExpansion.sovereigntyNote}</p>
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.administration.intro}</p>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[11.5px] leading-relaxed text-muted-foreground">{content.administration.keyDifference}</p>
            </div>

            {/* Autonomy comparison bar chart — signature element */}
            <div className="space-y-4 pt-2">
              <div>
                <h5 className="font-display mb-2 text-[13px] font-bold" style={{ color: neon.green }}>
                  Negeri-negeri Melayu Tidak Bersekutu
                </h5>
                <div className="h-[22px] overflow-hidden rounded-full" style={{ background: bgPanel }}>
                  <div
                    className="flex h-full items-center pl-2.5 text-[10px] font-bold"
                    style={{ width: "85%", background: `linear-gradient(90deg, ${neon.green}, #15803d)`, color: "#0c1128" }}
                  >
                    Kuasa Raja Tinggi
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-display mb-2 text-[13px] font-bold" style={{ color: neon.red }}>
                  Negeri-negeri Melayu Bersekutu
                </h5>
                <div className="h-[22px] overflow-hidden rounded-full" style={{ background: bgPanel }}>
                  <div
                    className="flex h-full items-center pl-2.5 text-[10px] font-bold"
                    style={{ width: "35%", background: `linear-gradient(90deg, ${neon.red}, #991b1b)`, color: "#0c1128" }}
                  >
                    Kuasa Raja Rendah
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-[11px] leading-relaxed text-muted-foreground">{content.administration.autonomyComparison}</p>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="mb-1.5 text-[12px] font-semibold text-foreground">Pentadbiran Perlis</p>
                <ul className="list-disc space-y-1 pl-3.5 text-[10.5px] leading-relaxed text-muted-foreground">
                  {content.administration.perlisAdmin.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="mb-1.5 text-[12px] font-semibold text-foreground">Pentadbiran Kedah</p>
                <ul className="list-disc space-y-1 pl-3.5 text-[10.5px] leading-relaxed text-muted-foreground">
                  {content.administration.kedahAdmin.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 4 Selesai"}
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
