import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej3Ch8Content } from "@/content/form3/sejarah/chapter-8/sej3ch8-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { bgPanel, neon } from "./blocks/neon-tokens";
import diplomasiAbuBakar from "@/assets/form3-content/diplomasi-sultan-abu-bakar-england.png";

const ORBIT_LABELS = [
  "Perjanjian Bangkok 1909",
  "Keengganan Penasihat British",
  "Perlembagaan Bertulis",
  "Tuntutan Durbar",
  "Diplomasi Johor",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 8.1", title: "Reaksi Terhadap Perjanjian Bangkok 1909", sub: "Setiap negeri kehilangan wilayah — dan setiap raja bertindak balas dengan caranya sendiri." },
  { eyebrow: "◆ 8.1", title: "Keengganan Menerima Penasihat British", sub: "Setiap negeri menentang dengan cara berbeza — sesetengah bertahan hingga puluhan tahun." },
  { eyebrow: "◆ 8.4", title: "Perlembagaan Bertulis — Menghalang Penjajahan Melalui Undang-undang", sub: "Dua negeri Melayu menggubal perlembagaan sendiri untuk mengukuhkan kedaulatan." },
  { eyebrow: "◆ 8.2", title: "Tuntutan Durbar", sub: "Raja-raja Melayu menyuarakan pembelaan bangsa di hadapan British." },
  { eyebrow: "◆ 8.3", title: "Diplomasi Sultan Abu Bakar, Johor", sub: "Kebijaksanaan diplomatik mengekalkan kedaulatan Johor lebih 90 tahun." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function Sej3Chapter8NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej3Ch8Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej3-c8-section` : undefined;
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.bangkokTreatyReactions.intro}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.bangkokTreatyReactions.states.map((s) => (
                <div key={s.state} className="sej3-pop-card sej3-hover-lift rounded-2xl p-4" style={{ background: bgPanel }}>
                  <h4 className="font-display text-[14px] font-bold text-foreground">{s.state}</h4>
                  <p className="mb-1.5 text-[9.5px] text-muted-foreground">{s.ruler}</p>
                  {s.territorialLoss && (
                    <p className="mb-2 text-[10px] font-semibold" style={{ color: neon.red }}>Kehilangan: {s.territorialLoss}</p>
                  )}
                  {s.reaction.length > 0 && (
                    <ul className="list-disc space-y-0.5 pl-3.5 text-[9.5px] leading-relaxed text-muted-foreground">
                      {s.reaction.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  )}
                  {s.quote && (
                    <blockquote className="mt-2 border-l-2 pl-2 text-[10.5px] italic" style={{ borderColor: neon.amber, color: neon.amber }}>
                      &ldquo;{s.quote}&rdquo;
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.advisorRefusal.intro}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.advisorRefusal.states.map((s) => {
                const isPerlis = s.state === "Perlis";
                return (
                  <div
                    key={s.state}
                    className="sej3-pop-card sej3-hover-lift rounded-2xl p-4"
                    style={{ background: bgPanel, border: isPerlis ? `1px solid ${neon.red}4d` : undefined, boxShadow: isPerlis ? `0 0 16px ${neon.red}26` : undefined }}
                  >
                    <h4 className="font-display text-[14px] font-bold text-foreground">{s.state}</h4>
                    <p className="mb-2 text-[10px] font-bold" style={{ color: neon.blue }}>{s.advisor} — dilantik {s.appointedDate}</p>
                    {s.conflict.length > 0 && (
                      <ul className="mb-2 list-disc space-y-0.5 pl-3.5 text-[9.5px] leading-relaxed text-muted-foreground">
                        {s.conflict.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    )}
                    {s.quote && (
                      <blockquote className="mb-2 border-l-2 pl-2 text-[10px] italic" style={{ borderColor: neon.amber, color: neon.amber }}>
                        &ldquo;{s.quote}&rdquo;
                      </blockquote>
                    )}
                    <p
                      className="border-t pt-2 text-[10px] font-semibold"
                      style={{ borderColor: "var(--border)", color: isPerlis ? neon.red : neon.green }}
                    >
                      {isPerlis && "🏴 "}{s.finalTreaty}
                    </p>
                    {s.preservedIdentity && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {s.preservedIdentity.map((p) => (
                          <span key={p} className="rounded-md bg-card px-2 py-1 text-[8.5px] text-muted-foreground">{p}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.writtenConstitutions.intro}</p>
            <div className="flex flex-wrap gap-5">
              <div
                className="flex-1 min-w-[280px] rounded-2xl p-6"
                style={{ background: bgPanel, borderLeft: `3px solid ${neon.violet}`, boxShadow: `0 0 20px ${neon.violet}1a` }}
              >
                <p className="text-[10.5px] font-bold" style={{ color: neon.violet }}>{content.writtenConstitutions.johor.date}</p>
                <h4 className="font-display mb-1 text-[14px] font-bold text-foreground">{content.writtenConstitutions.johor.name}</h4>
                <p className="mb-3 text-[9.5px] text-muted-foreground">{content.writtenConstitutions.johor.clauseCount}</p>
                <ul className="mb-3 list-disc space-y-1 pl-3.5 text-[10.5px] leading-relaxed text-muted-foreground">
                  {content.writtenConstitutions.johor.keyProvisions.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="border-t pt-2 text-[9.5px] italic" style={{ borderColor: "var(--border)", color: neon.green }}>
                  {content.writtenConstitutions.johor.significance[0]}
                </p>
                <div
                  className="mt-2 inline-block rounded-lg px-2.5 py-1 text-[9px] font-bold"
                  style={{ background: `${neon.amber}26`, color: neon.amber }}
                >
                  🏆 {content.writtenConstitutions.johor.firstOfItsKind}
                </div>
              </div>
              <div
                className="flex-1 min-w-[280px] rounded-2xl p-6"
                style={{ background: bgPanel, borderLeft: `3px solid ${neon.violet}`, boxShadow: `0 0 20px ${neon.violet}1a` }}
              >
                <p className="text-[10.5px] font-bold" style={{ color: neon.violet }}>{content.writtenConstitutions.terengganu.date}</p>
                <h4 className="font-display mb-1 text-[14px] font-bold text-foreground">{content.writtenConstitutions.terengganu.name}</h4>
                <p className="mb-3 text-[9.5px] text-muted-foreground">{content.writtenConstitutions.terengganu.clauseCount} · {content.writtenConstitutions.terengganu.meaning}</p>
                <ul className="mb-3 list-disc space-y-1 pl-3.5 text-[10.5px] leading-relaxed text-muted-foreground">
                  {content.writtenConstitutions.terengganu.keyProvisions.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="border-t pt-2 text-[9.5px] italic" style={{ borderColor: "var(--border)", color: neon.green }}>
                  {content.writtenConstitutions.terengganu.significance[0]}
                </p>
              </div>
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.durbarDemands.intro}</p>
            <div className="flex flex-col gap-0">
              {content.durbarDemands.events.map((e, i) => (
                <div key={e.year} className="relative flex gap-3.5 py-2.5">
                  {i < content.durbarDemands.events.length - 1 && (
                    <div className="absolute left-[17px] top-10 h-[calc(100%-8px)] w-0.5" style={{ background: "var(--border)" }} />
                  )}
                  <div
                    className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold"
                    style={{ background: bgPanel, border: `2px solid ${neon.violet}`, color: neon.violet }}
                  >
                    {e.year}
                  </div>
                  <div className="pt-0.5">
                    <h6 className="font-display mb-1 text-[13px] font-bold text-foreground">{e.location}</h6>
                    <ul className="list-disc space-y-0.5 pl-3.5 text-[10.5px] leading-relaxed text-muted-foreground">
                      {e.demands.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <img
              src={diplomasiAbuBakar}
              alt="Diplomasi Sultan Abu Bakar Lawatan ke England"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <div className="grid gap-3.5 sm:grid-cols-3">
              {content.johorDiplomacy.actions.map((a) => (
                <div
                  key={a.action}
                  className={`rounded-2xl p-4 ${a.highlight ? "sej3-soft-pulse-highlight" : ""}`}
                  style={{ background: bgPanel }}
                >
                  <h5 className="font-display mb-1.5 text-[12.5px] font-bold" style={{ color: neon.amber }}>
                    {a.highlight && <span className="sej3-flag-icon mr-1">🏴</span>}
                    {a.action}
                  </h5>
                  <ul className="list-disc space-y-0.5 pl-3.5 text-[10px] leading-relaxed text-muted-foreground">
                    {a.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-center text-[11px] text-muted-foreground">{content.johorDiplomacy.outcome}</p>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="mb-1 text-[11.5px] font-semibold text-foreground">Penggantinya: {content.johorDiplomacy.successor.name}</p>
              <ul className="list-disc space-y-0.5 pl-3.5 text-[10.5px] leading-relaxed text-muted-foreground">
                {content.johorDiplomacy.successor.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {current === 5 && (
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
