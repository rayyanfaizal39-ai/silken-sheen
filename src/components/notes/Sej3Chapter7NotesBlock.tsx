import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej3Ch7Content } from "@/content/form3/sejarah/chapter-7/sej3ch7-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { bgPanel, neon } from "./blocks/neon-tokens";
import kubuRentap from "@/assets/form3-content/kubu-rentap-bukit-sadok.png";

const ORBIT_LABELS = [
  "3 Bentuk Penentangan",
  "Kesan Pentadbiran",
  "Kesan Cukai",
  "Kekuatan Strategi",
  "Tokoh Bersenjata",
  "Pembunuhan Birch",
  "Penentangan Undang-undang",
  "Kesan Keseluruhan",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 7.1", title: "Matlamat & Tiga Bentuk Penentangan", sub: "Penentangan bukan sekadar peperangan — turut merangkumi mencabar perjanjian dan sistem perundangan." },
  { eyebrow: "◆ 7.2", title: "Kesan Pentadbiran Barat Terhadap Kuasa Tempatan", sub: "Kehilangan kuasa pemerintahan, perundangan dan kewangan mengikut negeri." },
  { eyebrow: "◆ 7.2", title: "Kesan Terhadap Kehidupan Rakyat — Cukai", sub: "Pasir Puteh dan cukai SBUB ke atas orang Murut, Sabah." },
  { eyebrow: "◆ 7.3", title: "Kekuatan Strategi Penentangan Awal", sub: "Muafakat, kubu pertahanan, persenjataan dan perundangan." },
  { eyebrow: "◆ 7.3", title: "Tokoh Penentangan Bersenjata", sub: "Lapan pemimpin tempatan yang mengangkat senjata menentang kuasa Barat." },
  { eyebrow: "◆ 7.4", title: "Pembunuhan J.W.W. Birch — Tujuh Mesyuarat Rahsia", sub: "Cabaran terhadap Perjanjian Pangkor, dipimpin Dato' Maharaja Lela." },
  { eyebrow: "◆ 7.5", title: "Penentangan Melalui Undang-undang", sub: "Haji Abdul Rahman Limbong dan Kebangkitan Tani Terengganu." },
  { eyebrow: "◆ 7.6", title: "Kesan Keseluruhan Penentangan", sub: "Kos peperangan British dan reformasi pentadbiran yang menyusul." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;
const FORM_COLORS = [neon.red, neon.blue, neon.green];
const STRENGTH_COLORS = [neon.violet, neon.blue, neon.amber, neon.green];

export function Sej3Chapter7NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej3Ch7Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej3-c7-section` : undefined;
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

  const strengthGroups = [
    { label: "Muafakat", color: STRENGTH_COLORS[0], entries: content.resistanceStrengths.alliance },
    { label: "Kubu Pertahanan", color: STRENGTH_COLORS[1], entries: content.resistanceStrengths.fortification },
    { label: "Persenjataan", color: STRENGTH_COLORS[2], entries: content.resistanceStrengths.weaponry },
    { label: "Perundangan", color: STRENGTH_COLORS[3], entries: content.resistanceStrengths.legalArgument },
  ];

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">⚔️</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.goalsAndForms.intro}</p>
            <div className="flex flex-wrap justify-center gap-3.5">
              {content.goalsAndForms.forms.map((f, i) => (
                <div
                  key={f}
                  className="sej3-stagger-card sej3-hover-lift rounded-xl px-5 py-3.5 text-center text-[12px] font-semibold"
                  style={{ background: bgPanel, color: FORM_COLORS[i % FORM_COLORS.length] }}
                >
                  {f}
                </div>
              ))}
            </div>
            <ChipRow heading="Matlamat Penentangan" items={content.goalsAndForms.goals} />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.administrativeImpact.intro}</p>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🏛️ Kuasa Pemerintahan & Hubungan Luar</h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {content.administrativeImpact.governancePower.map((g, i) => (
                  <div key={g.region} className="sej3-stagger-card rounded-xl p-3.5" style={{ background: bgPanel }}>
                    <h6 className="font-display mb-1.5 text-[12px] font-bold" style={{ color: neon.red }}>{g.region}</h6>
                    <ul className="list-disc space-y-0.5 pl-3.5 text-[9.5px] leading-relaxed text-muted-foreground">
                      {g.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <h6 className="font-display mb-1.5 text-[12px] font-bold" style={{ color: neon.blue }}>⚖️ Kuasa Perundangan</h6>
                {content.administrativeImpact.legalPower.map((l) => (
                  <p key={l.region} className="mb-1.5 text-[10.5px] leading-relaxed text-muted-foreground last:mb-0">
                    <b className="text-foreground">{l.region}:</b> {l.details}
                  </p>
                ))}
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <h6 className="font-display mb-1.5 text-[12px] font-bold" style={{ color: neon.amber }}>💰 Kuasa Kewangan</h6>
                {content.administrativeImpact.financialPower.map((f) => (
                  <p key={f.region} className="mb-1.5 text-[10.5px] leading-relaxed text-muted-foreground last:mb-0">
                    <b className="text-foreground">{f.region}:</b> {f.details}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.administrativeImpact.impactOnRakyat.intro}</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[260px] rounded-xl p-3.5" style={{ background: bgPanel }}>
                <h6 className="font-display mb-2 text-[12px] font-bold" style={{ color: neon.green }}>Pasir Puteh — Sebelum</h6>
                <ul className="mb-3 list-disc space-y-0.5 pl-3.5 text-[10px] leading-relaxed text-muted-foreground">
                  {content.administrativeImpact.impactOnRakyat.pasirPutehTaxTable.before.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <h6 className="font-display mb-2 text-[12px] font-bold" style={{ color: neon.red }}>Selepas British</h6>
                <table className="w-full text-[10px]">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="pb-1.5 text-left font-medium uppercase tracking-wide">Item</th>
                      <th className="pb-1.5 text-left font-medium uppercase tracking-wide">Kadar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.administrativeImpact.impactOnRakyat.pasirPutehTaxTable.specificRates.map((r) => (
                      <tr key={r.item} className="border-t border-border">
                        <td className="py-1.5 pr-2 text-muted-foreground">{r.item}</td>
                        <td className="py-1.5 font-mono font-bold" style={{ color: neon.amber }}>{r.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex-1 min-w-[260px] rounded-xl p-3.5" style={{ background: bgPanel }}>
                <h6 className="font-display mb-2 text-[12px] font-bold" style={{ color: neon.red }}>Cukai SBUB ke atas Orang Murut</h6>
                <table className="w-full text-[10px]">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="pb-1.5 text-left font-medium uppercase tracking-wide">Item</th>
                      <th className="pb-1.5 text-left font-medium uppercase tracking-wide">Kadar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.administrativeImpact.impactOnRakyat.sabahMurutTaxTable.map((r) => {
                      const isShock = r.item.toLowerCase().includes("suami isteri");
                      return (
                        <tr
                          key={r.item}
                          className="border-t border-border"
                          style={isShock ? { background: `${neon.red}1a` } : undefined}
                        >
                          <td className="py-1.5 pr-2" style={{ color: isShock ? neon.red : undefined }}>
                            {isShock ? `⚠️ ${r.item}` : <span className="text-muted-foreground">{r.item}</span>}
                          </td>
                          <td className="py-1.5 font-mono font-bold" style={{ color: isShock ? neon.red : neon.amber }}>{r.rate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <p className="mt-2 text-[9.5px] leading-relaxed text-muted-foreground">
                  Suami isteri yang dipisahkan sungai dikenakan denda setiap kali mereka ingin bertemu — kadar denda paling menyayat hati dalam bab ini.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="mb-1.5 text-[11px] font-semibold text-foreground">Layanan Terhadap Orang Murut</p>
                <ul className="list-disc space-y-0.5 pl-3.5 text-[10px] leading-relaxed text-muted-foreground">
                  {content.administrativeImpact.impactOnRakyat.murutMistreatment.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="mb-1.5 text-[11px] font-semibold text-foreground">Penentangan Cukai Iban, Sarawak</p>
                <ul className="list-disc space-y-0.5 pl-3.5 text-[10px] leading-relaxed text-muted-foreground">
                  {content.administrativeImpact.impactOnRakyat.sarawakIbanTaxResistance.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <img
              src={kubuRentap}
              alt="Kubu Rentap di Bukit Sadok"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <p className="text-center text-[11px] text-muted-foreground">Bertahan 1853-1861 — dilengkapi meriam besi &ldquo;Bujang Timpang Berang&rdquo;.</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.resistanceStrengths.intro}</p>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {strengthGroups.map((g) => (
                <div key={g.label} className="sej3-stagger-card sej3-hover-lift rounded-2xl p-4" style={{ background: bgPanel }}>
                  <h5 className="font-display mb-2 text-[13px] font-bold" style={{ color: g.color }}>{g.label}</h5>
                  {g.entries.map((e) => (
                    <div key={e.leader} className="mb-2 last:mb-0">
                      <p className="text-[10px] font-bold" style={{ color: neon.amber }}>{e.leader}</p>
                      <ul className="list-disc space-y-0.5 pl-3.5 text-[9.5px] leading-relaxed text-muted-foreground">
                        {e.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {content.armedResistance.map((leader) => (
              <div key={leader.name} className="sej3-stagger-card sej3-hover-lift rounded-2xl p-4" style={{ background: bgPanel }}>
                <h5 className="font-display text-[13px] font-bold text-foreground">{leader.name}</h5>
                {leader.realName && <p className="text-[9px] italic text-muted-foreground">{leader.realName}</p>}
                <p className="mb-2 text-[9.5px] font-semibold" style={{ color: neon.amber }}>{leader.region}</p>
                <p className="text-[10px] leading-relaxed text-muted-foreground">{leader.outcome}</p>
              </div>
            ))}
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.challengingTreaties.intro}</p>
            <div className="flex flex-col gap-0">
              {content.challengingTreaties.conspiracyTimeline.map((step, i) => {
                const isLastStep = i === content.challengingTreaties.conspiracyTimeline.length - 1;
                return (
                  <div key={step.date} className="relative flex gap-3 py-2">
                    {!isLastStep && (
                      <div className="absolute left-[13px] top-8 h-[calc(100%-8px)] w-0.5" style={{ background: "var(--border)" }} />
                    )}
                    <div
                      className={`z-10 shrink-0 rounded-full border ${step.climax ? "sej3-birch-climax-dot" : ""}`}
                      style={
                        step.climax
                          ? { width: 28, height: 28, background: neon.red, borderColor: neon.red }
                          : { width: 24, height: 24, background: bgPanel, borderColor: neon.red }
                      }
                    />
                    <p className="pt-1 text-[11px] leading-relaxed text-muted-foreground">
                      <b className="font-mono text-foreground">{step.date}</b> — {step.event}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <div className="rounded-2xl p-4" style={{ background: bgPanel }}>
              <h5 className="font-display mb-2 text-[14px] font-bold" style={{ color: neon.green }}>{content.legalResistance.limbong.name} (Terengganu)</h5>
              <ul className="list-disc space-y-1.5 pl-4 text-[11px] leading-relaxed text-muted-foreground">
                {content.legalResistance.limbong.events.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3.5">
              {content.legalResistance.uprisingWaves.map((w, i) => {
                const isLastWave = i === content.legalResistance.uprisingWaves.length - 1;
                return (
                  <div
                    key={w.year}
                    className={`flex-1 min-w-[180px] rounded-xl p-3.5 ${isLastWave ? "sej3-shimmer-card" : ""}`}
                    style={{ background: bgPanel }}
                  >
                    <h6 className="font-display mb-1.5 text-[12.5px] font-bold" style={{ color: neon.violet }}>{w.year}</h6>
                    <ul className="list-disc space-y-0.5 pl-3.5 text-[9.5px] leading-relaxed text-muted-foreground">
                      {w.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {current === 7 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.effects.intro}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {content.effects.warCosts.map((w) => (
                <div key={w.war} className="rounded-xl px-4 py-2.5 text-center" style={{ background: bgPanel }}>
                  <p className="font-display text-[15px] font-bold" style={{ color: neon.red }}>{w.cost}</p>
                  <p className="text-[10px] text-muted-foreground">{w.war}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.effects.armedDefeatReasons.map((r) => (
                <div key={r.leader} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <p className="text-[11px] font-semibold text-foreground">{r.leader}</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{r.reason}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="mb-1.5 text-[11px] font-semibold text-foreground">Reformasi Selepas Penentangan</p>
              <ul className="list-disc space-y-1 pl-4 text-[10.5px] leading-relaxed text-muted-foreground">
                {content.effects.reforms.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[11px] leading-relaxed text-muted-foreground">{content.effects.generalWeakness}</p>
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
