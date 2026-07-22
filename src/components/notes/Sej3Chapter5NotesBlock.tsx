import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej3Ch5Content } from "@/content/form3/sejarah/chapter-5/sej3ch5-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { bgPanel, neon } from "./blocks/neon-tokens";
import ketibaanJamesBrooke from "@/assets/form3-content/ketibaan-james-brooke-kuching.png";

const ORBIT_LABELS = ["Pemerintahan Tempatan", "Pengaruh Brunei", "Peluasan Brooke", "Perjanjian & Kubu", "Peluasan SBUB", "Pentadbiran", "Rumusan"];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 5.1", title: "Pemerintahan Tempatan Sebelum Barat", sub: "Sistem kesukuan yang berkesan wujud di Sarawak dan Sabah sebelum kuasa luar tiba." },
  { eyebrow: "◆ 5.1", title: "Pengaruh Kesultanan Brunei", sub: "Pentadbiran sungai dipecahkan mengikut tiga bentuk pemilikan." },
  { eyebrow: "◆ 5.2", title: "Peluasan Kuasa Dinasti Brooke", sub: "James Brooke menggunakan empat strategi untuk menguasai Sarawak." },
  { eyebrow: "◆ 5.2", title: "Perjanjian dan Pengukuhan Kuasa", sub: "1841, 1842 dan 1890 — tiga perjanjian yang membentuk sempadan Sarawak." },
  { eyebrow: "◆ 5.3", title: "Peluasan Kuasa SBUB di Sabah", sub: "Rantaian pemilikan daripada penyewa persendirian kepada sebuah syarikat British." },
  { eyebrow: "◆ 5.4", title: "Bentuk Pentadbiran Barat", sub: "Dasar pentadbiran berbeza di Sarawak dan Sabah." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function Sej3Chapter5NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej3Ch5Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej3-c5-section` : undefined;
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

  const STRATEGY_COLORS = [neon.violet, neon.blue, neon.amber, neon.green];

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🚢</div>
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
              src={ketibaanJamesBrooke}
              alt="Ketibaan James Brooke di Kuching"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.localGovernance.intro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl p-3.5 text-center" style={{ background: bgPanel }}>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Sarawak</p>
                <p className="font-display text-[15px] font-bold text-foreground">{content.localGovernance.ethnicDiversity.sarawak}</p>
              </div>
              <div className="rounded-xl p-3.5 text-center" style={{ background: bgPanel }}>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Sabah</p>
                <p className="font-display text-[15px] font-bold text-foreground">{content.localGovernance.ethnicDiversity.sabah}</p>
              </div>
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12.5px] font-semibold text-foreground">{content.localGovernance.preColonialKingdoms.intro}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {content.localGovernance.preColonialKingdoms.kingdoms.map((k) => (
                  <span key={k} className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground">{k}</span>
                ))}
              </div>
              <p className="mt-2.5 text-[11px] text-muted-foreground">
                Tokoh penentangan tempatan: {content.localGovernance.preColonialKingdoms.resistanceFigures.join(", ")}
              </p>
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🏘️ Gelaran Pemimpin Kesukuan</h4>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {content.localGovernance.tribalSystem.titles.map((t) => {
                  const [group, ...rest] = t.title.split(" — ");
                  return (
                    <div key={t.ethnicGroup} className="rounded-xl p-3.5 text-center" style={{ background: bgPanel }}>
                      <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">{t.ethnicGroup}</p>
                      <p className="font-display mt-1 text-[13px] font-bold text-foreground">{group}</p>
                      {rest.length > 0 && <p className="mt-1 text-[9.5px] leading-snug text-muted-foreground">{rest.join(" — ")}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.localGovernance.bruneiInfluence.intro}</p>
            <div className="grid gap-3.5 sm:grid-cols-3">
              {content.localGovernance.bruneiInfluence.riverTypes.map((r) => (
                <div key={r.type} className="rounded-2xl p-4 text-center" style={{ background: bgPanel }}>
                  <h5 className="font-display text-[13px] font-bold" style={{ color: neon.blue }}>{r.type}</h5>
                  <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted-foreground">{r.description}</p>
                </div>
              ))}
            </div>
            <ChipRow heading="Gelaran Wakil Sultan" items={content.localGovernance.bruneiInfluence.titles} />
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.brookeExpansion.intro}</p>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Latar Belakang</p>
              <ul className="list-disc space-y-1 pl-4 text-[11.5px] leading-relaxed text-muted-foreground">
                {content.brookeExpansion.context.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3 sm:grid-cols-1">
              {content.brookeExpansion.keyFigures.map((f) => (
                <div key={f.name} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <p className="text-[12.5px] font-semibold text-foreground">{f.name}</p>
                  <p className="mb-1.5 text-[10.5px] text-muted-foreground">{f.role}</p>
                  <ul className="list-disc space-y-0.5 pl-4 text-[11px] leading-relaxed text-muted-foreground">
                    {f.actions.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">⚔️ Empat Strategi James Brooke</h4>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {content.brookeExpansion.strategies.map((s, i) => (
                  <div key={s.strategy} className="rounded-2xl p-4" style={{ background: bgPanel }}>
                    <h5 className="font-display mb-2 text-[13px] font-bold" style={{ color: STRATEGY_COLORS[i % STRATEGY_COLORS.length] }}>{s.strategy}</h5>
                    <ul className="list-disc space-y-1 pl-4 text-[10.5px] leading-relaxed text-muted-foreground">
                      {s.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-center gap-3">
              {content.brookeExpansion.treaties.map((t) => (
                <div
                  key={t.year}
                  className="w-full max-w-sm rounded-2xl p-4"
                  style={{ background: bgPanel }}
                >
                  <div className="font-display mb-1 text-[17px] font-bold" style={{ color: neon.amber }}>{t.year}</div>
                  <p className="mb-2 text-[10.5px] font-semibold text-foreground">{t.parties}</p>
                  <ul className="list-disc space-y-1 pl-4 text-[10.5px] leading-relaxed text-muted-foreground">
                    {t.terms.map((term) => (
                      <li key={term}>{term}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🛡️ Taktik Pengukuhan Kuasa</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {content.brookeExpansion.consolidation.map((c) => (
                  <div key={c.tactic} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                    <p className="text-[11.5px] font-semibold text-foreground">{c.tactic}</p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[10.5px] leading-relaxed text-muted-foreground">
                      {c.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {content.brookeExpansion.dynastySuccession.map((d) => (
                <div key={d.name} className="rounded-xl px-4 py-2.5 text-center" style={{ background: bgPanel }}>
                  <p className="text-[11.5px] font-semibold text-foreground">{d.name}</p>
                  <p className="text-[10px] text-muted-foreground">{d.years}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.sbubExpansion.intro}</p>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {content.sbubExpansion.attractionFactors.map((f) => (
                <div key={f.factor} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <p className="text-[12px] font-semibold text-foreground">{f.factor}</p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[10.5px] leading-relaxed text-muted-foreground">
                    {f.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {content.sbubExpansion.priorBritishHoldings.map((h) => (
                <div key={h.location} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <p className="text-[12px] font-semibold text-foreground">{h.location}</p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[10.5px] leading-relaxed text-muted-foreground">
                    {h.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🏢 Rantaian Pemilikan Sabah ke SBUB</h4>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {content.sbubExpansion.pretapakanChain.map((step, i) => (
                  <div key={step.figure} className="flex items-center gap-2">
                    <div className="max-w-[190px] rounded-xl p-3 text-center" style={{ background: bgPanel }}>
                      <p className="font-display text-[11.5px] font-bold text-foreground">{step.figure}</p>
                      <p className="mt-1 text-[9.5px] leading-snug text-muted-foreground">
                        {step.year ? `${step.action} (${step.year})` : step.action}
                      </p>
                    </div>
                    {i < content.sbubExpansion.pretapakanChain.length - 1 && (
                      <span className="text-base text-muted-foreground">→</span>
                    )}
                  </div>
                ))}
                <span className="text-base text-muted-foreground">→</span>
                <div
                  className="max-w-[190px] rounded-xl p-3 text-center"
                  style={{ background: bgPanel, border: `1px solid ${neon.amber}4d`, boxShadow: `0 0 14px ${neon.amber}4d` }}
                >
                  <p className="font-display text-[11.5px] font-bold" style={{ color: neon.amber }}>SBUB</p>
                  <p className="mt-1 text-[9.5px] leading-snug text-muted-foreground">Syarikat Borneo Utara British</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {content.sbubExpansion.charterMilestones.map((m) => (
                <div key={m.year} className="rounded-xl px-4 py-2.5 text-center" style={{ background: bgPanel }}>
                  <p className="font-display text-[15px] font-bold" style={{ color: neon.green }}>{m.year}</p>
                  <p className="text-[10px] text-muted-foreground">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-5">
              <div className="flex-1 min-w-[260px] rounded-2xl p-4" style={{ background: bgPanel }}>
                <h4 className="font-display mb-2.5 text-center text-[14px] font-bold" style={{ color: neon.green }}>Sarawak (Brooke)</h4>
                <p className="mb-2 text-center text-[11px] text-muted-foreground">{content.administration.sarawak.policy}</p>
                {content.administration.sarawak.ethnicRoles.map((r) => (
                  <div key={r.group} className="flex justify-between border-b border-border py-2 text-[11px] last:border-0">
                    <span className="text-foreground">{r.group}</span>
                    <span className="text-muted-foreground">{r.role}</span>
                  </div>
                ))}
                <div className="mt-2.5 space-y-1.5">
                  {content.administration.sarawak.courts.map((c) => (
                    <p key={c.court} className="text-[10.5px] leading-relaxed text-muted-foreground">
                      <b className="text-foreground">{c.court}</b> — {c.role}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-[260px] rounded-2xl p-4" style={{ background: bgPanel }}>
                <h4 className="font-display mb-2.5 text-center text-[14px] font-bold" style={{ color: neon.blue }}>Sabah (SBUB)</h4>
                <p className="mb-2 text-center text-[11px] text-muted-foreground">{content.administration.sabah.policy}</p>
                <div className="mt-2.5 space-y-1.5">
                  {content.administration.sabah.courts.map((c) => (
                    <p key={c.court} className="text-[10.5px] leading-relaxed text-muted-foreground">
                      <b className="text-foreground">{c.court}</b> — {c.role}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[11.5px] leading-relaxed text-muted-foreground">{content.administration.territorialDivision}</p>
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[11.5px] leading-relaxed text-muted-foreground">{content.administration.lawOf1842}</p>
            </div>
          </div>
        )}

        {current === 6 && (
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
