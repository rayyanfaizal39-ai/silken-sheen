import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch2Content } from "@/content/form2/sejarah/chapter-2/sej2ch2-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { IconCardGrid, type IconCardGridItem } from "./blocks/IconCardGrid";
import { KingdomChipGrid, type KingdomChipGridItem } from "./blocks/KingdomChipGrid";
import { PortGoodsGrid } from "./blocks/PortGoodsGrid";
import { bgPanel } from "./blocks/neon-tokens";

const ORBIT_LABELS = [
  "Gelaran Raja",
  "Pertanian",
  "Perdagangan",
  "Hasil & Galian",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 2.1", title: "Sistem Pemerintahan — Gelaran Raja", sub: "Tujuh kerajaan, tujuh cara memaknakan kuasa diraja — namun struktur pusat-wilayah yang sama." },
  { eyebrow: "◆ 2.2", title: "Kegiatan Ekonomi — Pertanian", sub: "Padi ialah tanaman utama; setiap kerajaan memanfaatkan sungai dan tasik yang berbeza." },
  { eyebrow: "◆ 2.2", title: "Kegiatan Ekonomi — Perdagangan", sub: "Setiap kerajaan mempunyai pelabuhan dan barangan eksport tersendiri." },
  { eyebrow: "◆ 2.2", title: "Hasil Hutan, Laut dan Perlombongan", sub: "Kekayaan alam yang menarik pedagang dari serata dunia." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

const RESOURCE_ICONS: Record<string, string> = {
  "Gaharu": "🪵",
  "Sarang burung": "🪺",
  "Rotan": "🎋",
  "Kapur barus": "❄️",
  "Gamat": "🐚",
  "Rumpai laut": "🌿",
  "Mutiara": "🦪",
};

const MINING_ICONS: Record<string, string> = {
  "Emas": "🥇",
  "Perak": "🥈",
  "Bijih besi": "⛏️",
};

export function Sej2Chapter2NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch2Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c2-section` : undefined;
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

  const royalTitleItems: KingdomChipGridItem[] = content.governance.byKingdom.map((k) => ({
    name: k.kingdom.replace(/^Kerajaan\s+/, ""),
    chips: k.royalTitles,
    note: k.regionalAdmin,
  }));

  const manufacturingItems: KingdomChipGridItem[] = content.economy.manufacturing.map((m) => ({
    name: m.kingdom,
    chips: m.products,
  }));

  const resourceItems: IconCardGridItem[] = [
    ...content.economy.forestSeaProducts.map((p) => ({
      icon: RESOURCE_ICONS[p.product] ?? "🌾",
      label: p.product,
      detail: [p.source, p.use],
    })),
    ...content.economy.mining.map((m) => ({
      icon: MINING_ICONS[m.mineral] ?? "⛏️",
      label: m.mineral,
      detail: [`${m.kingdom} — ${m.location}`],
    })),
  ];

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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.governance.intro}</p>
            <KingdomChipGrid items={royalTitleItems} />
            <ChipRow heading="🏛️ Golongan Masyarakat" items={content.governance.socialClasses} />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.economy.intro}</p>
            <DataTable
              headers={["Kerajaan", "Butiran Penanaman Padi"]}
              rows={content.economy.riceCultivation.map((r) => [r.kingdom, r.details])}
            />
            <DataTable
              headers={["Rempah", "Kawasan Tumbuhan"]}
              rows={content.economy.spices.map((s) => [s.spice, s.growingArea])}
            />
            <ChipRow heading="🌾 Tanaman Lain" items={content.economy.otherCrops} />
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <PortGoodsGrid
              items={content.economy.tradePorts.map((t) => ({
                kingdom: t.kingdom.replace(/^Kerajaan\s+/, ""),
                ports: t.ports,
                goods: t.goods,
              }))}
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {content.economy.foreignTraders.map((t) => (
                <div key={t.origin} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <p className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">Pedagang</p>
                  <h5 className="font-display mt-1 mb-1.5 text-[13px] font-bold text-foreground">{t.origin}</h5>
                  <p className="text-[10px] leading-relaxed text-muted-foreground">
                    Membawa: {t.broughtGoods.join(", ")}
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                    Mencari: {t.soughtGoods.join(", ")}
                  </p>
                </div>
              ))}
            </div>
            <FactGrid heading="⚓ Kesan Perdagangan" facts={content.economy.tradeEffects} />
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <IconCardGrid items={resourceItems} />
            <KingdomChipGrid heading="🛠️ Pembuatan" items={manufacturingItems} />
          </div>
        )}

        {current === 4 && (
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 2 Selesai"}
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
