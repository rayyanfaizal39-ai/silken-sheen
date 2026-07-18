import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch8Content } from "@/content/form2/sejarah/chapter-8/sej2ch8-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { PortGoodsGrid } from "./blocks/PortGoodsGrid";
import { bgPanel, groupGlow, hexToRgba, neon } from "./blocks/neon-tokens";

const ORBIT_LABELS = ["Pengasasan", "Asas Hubungan", "Diplomatik & Dagang", "Rumusan"];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 8.1", title: "Empat Kerajaan, Empat Cara Pengasasan", sub: "Kedah, Kelantan, Negeri Sembilan dan Perlis muncul melalui proses pengasasan yang tersendiri." },
  { eyebrow: "◆ 8.2", title: "Asas Hubungan Antara Kerajaan Melayu", sub: "Keserumpunan, geografi dan agama menjadi tiga asas hubungan negeri Melayu." },
  { eyebrow: "◆ 8.2", title: "Hubungan Diplomatik dan Perdagangan", sub: "Pengiktirafan, bantuan pertahanan dan perkahwinan diraja mengukuhkan kedaulatan; pelabuhan mengukuhkan kemakmuran." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function Sej2Chapter8NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch8Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c8-section` : undefined;
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

  const basisColors: Record<string, keyof typeof neon> = {
    Keserumpunan: "violet",
    Geografi: "blue",
    Agama: "green",
  };

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🏯</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.founding.intro}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.founding.kingdoms.map((k) => (
                <div key={k.name} className="rounded-2xl p-4.5" style={{ background: bgPanel, boxShadow: groupGlow(neon.amber, 16, 0.1) }}>
                  <h4 className="font-display text-sm font-bold text-foreground">{k.name}</h4>
                  <p className="mb-2 text-[11px] font-bold" style={{ color: neon.amber }}>
                    {k.founder} · {k.foundingYear}
                  </p>
                  <p className="text-[10.5px] leading-relaxed text-muted-foreground">{k.origin}</p>
                  <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted-foreground/80">
                    <b className="text-foreground">Pusat:</b> {k.firstCenter}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {k.notableFacts.map((f) => (
                      <li key={f} className="text-[10px] leading-relaxed text-muted-foreground">
                        · {f}
                      </li>
                    ))}
                  </ul>
                  {k.notableRuler && (
                    <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground">
                      <b className="text-foreground">{k.notableRuler.name}</b> ({k.notableRuler.reignYears}): {k.notableRuler.achievement}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.relations.intro}</p>
            <div className="grid gap-3.5 sm:grid-cols-3">
              {content.relations.bases.map((b) => {
                const color = neon[basisColors[b.basis] ?? "violet"];
                return (
                  <div key={b.basis} className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: groupGlow(color, 14, 0.12) }}>
                    <h5 className="font-display mb-2 text-[13px] font-bold" style={{ color }}>
                      {b.basis}
                    </h5>
                    <ul className="space-y-1.5">
                      {b.points.map((p) => (
                        <li key={p} className="text-[10.5px] leading-relaxed text-muted-foreground">
                          · {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-8">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🤝 Kaedah Diplomatik</h4>
              <div className="grid gap-3.5 sm:grid-cols-3">
                {content.relations.diplomaticMethods.map((m) => (
                  <div
                    key={m.method}
                    className="rounded-2xl p-4"
                    style={{ background: bgPanel, boxShadow: `0 0 14px ${hexToRgba(neon.blue, 0.1)}` }}
                  >
                    <h5 className="font-display mb-1.5 text-[12.5px] font-bold text-foreground">{m.method}</h5>
                    <p className="text-[10.5px] leading-relaxed text-muted-foreground">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">⚓ Hubungan Perdagangan</h4>
              <PortGoodsGrid
                items={content.relations.tradeGoods.map((t) => ({ kingdom: t.kingdom, ports: [t.ports], goods: t.goods }))}
              />
            </div>
          </div>
        )}

        {current === 3 && (
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
