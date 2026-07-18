import { useEffect, useState, type ReactElement } from "react";
import { Anchor, Badge, CheckCircle2, ChevronLeft, ChevronRight, Coins, Receipt, Ship } from "lucide-react";
import type { Sej2Ch5Content } from "@/content/form2/sejarah/chapter-5/sej2ch5-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { IconCardGrid, type IconCardGridItem } from "./blocks/IconCardGrid";
import { EraDotTimeline, type EraDotTimelineItem } from "./blocks/EraDotTimeline";
import { bgPanel, bgCard, groupGlow, neon } from "./blocks/neon-tokens";
import kejatuhanMelaka from "@/assets/form2-content/kejatuhan-melaka.png";

const ORBIT_LABELS = [
  "Pengasasan",
  "Raja & Pentadbiran",
  "Perundangan",
  "Empayar & Hubungan",
  "Perdagangan",
  "Penyebaran Islam",
  "Kejatuhan Melaka",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 5.1", title: "Pengasasan Kesultanan Melayu Melaka", sub: "Kebijaksanaan Parameswara memilih lokasi di muara Sungai Bertam." },
  { eyebrow: "◆ 5.2", title: "Raja dan Sistem Pentadbiran", sub: "Kepemimpinan raja yang berdaulat dan Sistem Pembesar Empat Lipatan." },
  { eyebrow: "◆ 5.2", title: "Sistem Perundangan", sub: "Hukum Kanun Melaka, Undang-Undang Laut Melaka dan Adat Temenggung." },
  { eyebrow: "◆ 5.2", title: "Empayar dan Hubungan Luar", sub: "Tiga cara pembentukan empayar dan rangkaian hubungan diplomatik." },
  { eyebrow: "◆ 5.2", title: "Pusat Perdagangan", sub: "Melaka sebagai pusat pengumpulan dan pengedaran barang dagangan." },
  { eyebrow: "◆ 5.2", title: "Pusat Penyebaran Agama Islam", sub: "Melaka muncul sebagai pusat penyebaran Islam yang paling berpengaruh di Alam Melayu." },
  { eyebrow: "◆ 5.3", title: "Kejatuhan Melaka", sub: "Kelemahan dalaman dan tiga serangan Portugis yang menamatkan Kesultanan Melayu Melaka." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

const FACTOR_ICONS: Record<string, string> = {
  "Laluan Perdagangan": "🚢",
  "Bentuk Muka Bumi": "⛰️",
  "Benteng Pertahanan Semula Jadi": "🌳",
  "Terlindung Angin Monsun": "🌬️",
};

const TRADE_ASPECT_ICONS: Record<string, ReactElement> = {
  "Syahbandar": <Badge style={{ color: neon.amber }} />,
  "Cukai Perdagangan": <Receipt style={{ color: neon.amber }} />,
  "Mata Wang": <Coins style={{ color: neon.amber }} />,
  "Orang Laut": <Ship style={{ color: neon.amber }} />,
  "Kemudahan Pelabuhan": <Anchor style={{ color: neon.amber }} />,
};

const MINISTER_COLORS = [neon.violet, neon.blue, neon.amber, neon.green];

export function Sej2Chapter5NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch5Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c5-section` : undefined;
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

  const factorItems: IconCardGridItem[] = content.founding.strategicFactors.map((f) => ({
    icon: FACTOR_ICONS[f.factor] ?? "⭐",
    label: f.factor,
    detail: f.description,
  }));

  const empireItems: IconCardGridItem[] = content.goldenAge.empire.formationMethods.map((m) => ({
    icon: m.method === "Penaklukan" ? "⚔️" : m.method === "Perkahwinan" ? "💍" : "🤝",
    label: m.method,
    detail: m.examples.join(", "),
  }));

  const tradeItems: IconCardGridItem[] = content.tradeHub.aspects.map((a) => ({
    icon: TRADE_ASPECT_ICONS[a.name] ?? <Anchor style={{ color: neon.amber }} />,
    label: a.name,
    detail: a.description,
  }));

  const fallTimelineItems: EraDotTimelineItem[] = content.fall.timeline.map((t) => ({
    label: t.date,
    detail: t.event,
    color: "red",
  }));

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">⚓</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              <b className="text-foreground">{content.founding.founder}</b> membuka Melaka {content.founding.year.toLowerCase()} di {content.founding.locationName}. {content.founding.priorUse}.
            </p>
            <IconCardGrid items={factorItems} />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.goldenAge.intro}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.goldenAge.kingshipSources[0]}</p>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12.5px] font-semibold text-foreground">👑 Konsep Daulat</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{content.goldenAge.daulatConcept}</p>
            </div>
            <ChipRow heading="🎭 Peranan Raja" items={content.goldenAge.royalRoles} />
            <ChipRow heading="👑 Alat Kebesaran" items={content.goldenAge.royalRegalia} />
            <DataTable
              headers={["Sultan", "Tempoh", "Sifat/Sumbangan"]}
              rows={content.goldenAge.notableSultans.map((s) => [s.name, s.reignYears, s.trait])}
            />

            <h4 className="font-display text-sm font-bold text-foreground">👑 {content.goldenAge.administration.systemName}</h4>
            <div className="flex flex-col items-center gap-2">
              <div
                className="rounded-xl px-8 py-3 text-sm font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${neon.violet}, ${neon.blue})`, boxShadow: groupGlow(neon.violet, 20, 0.4) }}
              >
                Sultan
              </div>
              <div className="h-5 w-0.5 bg-border" />
              <div className="grid w-full gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                {content.goldenAge.administration.fourMinisters.map((m, i) => (
                  <div key={m.title} className="rounded-2xl p-4" style={{ background: bgPanel }}>
                    <h5 className="font-display mb-2 text-[13px] font-bold" style={{ color: MINISTER_COLORS[i % MINISTER_COLORS.length] }}>
                      {m.title}
                    </h5>
                    <ul className="list-disc space-y-1 pl-4 text-[10px] leading-relaxed text-muted-foreground">
                      {m.duties.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <ChipRow heading="🏛️ Lapisan Pentadbiran" items={content.goldenAge.administration.tiers} />
            <div className="grid gap-3 sm:grid-cols-2">
              {content.goldenAge.administration.systems.map((s) => (
                <div key={s.name} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <p className="text-[12.5px] font-semibold text-foreground">{s.name}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              {content.goldenAge.legalSystem.map((law, i) => (
                <div
                  key={law.name}
                  className="min-w-[260px] flex-1 rounded-2xl p-4.5"
                  style={{ background: bgPanel, boxShadow: groupGlow(i === 0 ? neon.amber : neon.blue, 18, 0.12) }}
                >
                  <h4 className="font-display text-sm font-bold text-foreground">{law.name}</h4>
                  <p className="mb-2 text-[10.5px] font-bold" style={{ color: i === 0 ? neon.amber : neon.blue }}>
                    {law.clauseCount}
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">{law.established}</p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{law.content}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12.5px] font-semibold text-foreground">{content.goldenAge.customaryLaw.name}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Diasaskan oleh {content.goldenAge.customaryLaw.founder}. {content.goldenAge.customaryLaw.note}.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {content.goldenAge.customaryLaw.scope.map((s) => (
                  <span key={s} className="rounded-md px-2 py-1 text-[9.5px] text-foreground" style={{ background: bgCard }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.goldenAge.empire.extent}</p>
            <IconCardGrid items={empireItems} />
            <DataTable
              headers={["Kerajaan", "Jenis Hubungan", "Faedah"]}
              rows={content.goldenAge.foreignRelations.map((r) => [r.kingdom, r.relationType, r.benefit])}
            />
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.tradeHub.intro}</p>
            <IconCardGrid items={tradeItems} />
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12.5px] font-semibold text-foreground">🗣️ Bahasa Perdagangan</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {content.goldenAge.languageTrade.linguaFranca}. {content.goldenAge.languageTrade.languageCount}.
              </p>
            </div>
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.islamSpread.intro}</p>
            <FactGrid heading="☪️ Cara Penyebaran Islam" facts={content.islamSpread.methods} />
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <img
              src={kejatuhanMelaka}
              alt="Kejatuhan Melaka 1511"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <EraDotTimeline items={fallTimelineItems} />
            <div className="grid gap-3.5 sm:grid-cols-2">
              {content.fall.internalWeaknesses.map((w) => (
                <div key={w.category} className="rounded-2xl p-4" style={{ background: bgPanel }}>
                  <h5 className="font-display mb-2 text-[13px] font-bold" style={{ color: neon.red }}>
                    {w.category}
                  </h5>
                  <ul className="list-disc space-y-1 pl-4 text-[10.5px] leading-relaxed text-muted-foreground">
                    {w.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ChipRow heading="🎯 Motif Portugis" items={content.fall.portugueseMotives} />
            <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
              {content.fall.resistance.map((r) => `${r.event} (${r.year})`).join(" → ")}
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 5 Selesai"}
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
