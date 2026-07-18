import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch10Content } from "@/content/form2/sejarah/chapter-10/sej2ch10-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { EraDotTimeline } from "./blocks/EraDotTimeline";
import { KingdomChipGrid } from "./blocks/KingdomChipGrid";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { bgPanel, groupGlow, neon } from "./blocks/neon-tokens";
import santubongImg from "@/assets/form2-content/santubong-pelabuhan-purba.png";
import kaumBumiputeraImg from "@/assets/form2-content/kaum-bumiputera-sarawak-sabah.png";

const ORBIT_LABELS = ["Alam Melayu", "Pemerintahan Tempatan", "Ekonomi & Sungai", "Kaum & Warisan", "Rumusan"];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 10.1", title: "Sarawak dan Sabah dalam Alam Melayu", sub: "Bukan wilayah terpencil — sebahagian penting rangkaian perdagangan dan pengaruh Alam Melayu sejak sebelum Masihi." },
  { eyebrow: "◆ 10.2", title: "Kemunculan Pemerintahan Tempatan", sub: "Kepimpinan kesukuan, kerajaan lembah sungai, wakil raja dan ketua bebas." },
  { eyebrow: "◆ 10.3", title: "Kegiatan Ekonomi dan Kepentingan Sungai", sub: "Kegiatan ekonomi menyesuaikan diri dengan pedalaman, lembah sungai dan pesisir pantai." },
  { eyebrow: "◆ 10.4", title: "Keunikan Kaum Bumiputera dan Warisan", sub: "Kepelbagaian kaum menghasilkan tenunan, perayaan, tarian dan seni bina tersendiri." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

const EMPIRE_COLORS: Record<string, keyof typeof neon> = {
  Srivijaya: "violet",
  Majapahit: "blue",
  Sambas: "amber",
  Brunei: "green",
  Sulu: "red",
};

export function Sej2Chapter10NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch10Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c10-section` : undefined;
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

  const empireChain = ["Srivijaya", "Majapahit", "Sambas", "Brunei", "Sulu"];

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🌴</div>
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
          <div className="space-y-8">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.connectionToAlamMelayu.intro}</p>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">⚓ Pelabuhan Awal</h4>
              <img
                src={santubongImg}
                alt="Santubong Pelabuhan Purba"
                className="mx-auto mb-4 block w-full max-w-2xl rounded-2xl border border-border"
              />
              <EraDotTimeline
                items={content.connectionToAlamMelayu.earlyTradePosts
                  .filter((t) => t.facts.length > 0)
                  .map((t, i) => ({
                    label: t.name,
                    detail: `${t.era} — ${t.facts.join("; ")}`,
                    color: (["amber", "blue", "green", "violet"] as const)[i % 4],
                  }))}
              />
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">👑 Rantaian Pengaruh Empayar</h4>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {empireChain.map((name, i) => (
                  <div key={name} className="flex items-center gap-2">
                    <span
                      className="rounded-xl px-4 py-2.5 text-[12px] font-bold"
                      style={{ background: bgPanel, color: neon[EMPIRE_COLORS[name]] }}
                    >
                      {name}
                    </span>
                    {i < empireChain.length - 1 && <span className="text-muted-foreground">→</span>}
                  </div>
                ))}
              </div>
              <ul className="mt-4 space-y-1.5">
                {content.connectionToAlamMelayu.empireInfluence.map((e) => (
                  <li key={e} className="text-[11px] leading-relaxed text-muted-foreground">
                    · {e}
                  </li>
                ))}
              </ul>
            </div>
            <ChipRow heading="🕌 Pengaruh Agama" items={content.connectionToAlamMelayu.religiousInfluence} />
          </div>
        )}

        {current === 1 && (
          <div className="space-y-8">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🏘️ Gelaran Pemimpin Kesukuan</h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[...content.localGovernance.sarawak.tribalLeadership, ...content.localGovernance.sabah.tribalLeadership].map((t) => (
                  <div key={t.ethnicGroup} className="rounded-xl p-3.5 text-center" style={{ background: bgPanel }}>
                    <p className="text-[9px] uppercase tracking-wide text-muted-foreground/70">{t.ethnicGroup}</p>
                    <h6 className="font-display mt-1 text-[13px] font-bold text-foreground">{t.title}</h6>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🏞️ Lima Kerajaan Lembah Sungai Sarawak</h4>
              <KingdomChipGrid
                items={content.localGovernance.sarawak.riverKingdoms.map((r) => ({
                  name: r.name,
                  chips: [r.era],
                  note: [r.location, r.founder].filter(Boolean).join(" · "),
                }))}
              />
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: groupGlow(neon.green, 14, 0.1) }}>
                <h5 className="font-display mb-1.5 text-[12.5px] font-bold" style={{ color: neon.green }}>
                  Wakil Raja — Sarawak
                </h5>
                <p className="text-[10.5px] leading-relaxed text-muted-foreground">{content.localGovernance.sarawak.royalRepresentative}</p>
              </div>
              <div className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: groupGlow(neon.blue, 14, 0.1) }}>
                <h5 className="font-display mb-1.5 text-[12.5px] font-bold" style={{ color: neon.blue }}>
                  Wakil Raja & Ketua Bebas — Sabah
                </h5>
                <p className="text-[10.5px] leading-relaxed text-muted-foreground">{content.localGovernance.sabah.royalRepresentative}</p>
                <ul className="mt-2 space-y-1">
                  {content.localGovernance.sabah.freeChiefs.map((c) => (
                    <li key={c.name} className="text-[10px] text-muted-foreground">
                      · {c.name} — {c.territory}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-display mb-2 text-sm font-bold" style={{ color: neon.green }}>
                  Sarawak
                </h4>
                <DataTable
                  headers={["Kawasan", "Kegiatan"]}
                  rows={content.economy.sarawak.map((e) => [e.location, e.activities.join(", ")])}
                />
              </div>
              <div>
                <h4 className="font-display mb-2 text-sm font-bold" style={{ color: neon.blue }}>
                  Sabah
                </h4>
                <DataTable
                  headers={["Kawasan", "Kegiatan"]}
                  rows={content.economy.sabah.map((e) => [e.location, e.activities.join(", ")])}
                />
              </div>
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🌊 Kepentingan Sungai</h4>
              <IconCardGrid
                items={content.economy.riverImportance.map((r) => ({ label: r.use, detail: r.note }))}
              />
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-8">
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🎭 Kepelbagaian Kaum Bumiputera</h4>
              <img
                src={kaumBumiputeraImg}
                alt="Kaum Bumiputera Sarawak dan Sabah"
                className="mx-auto mb-4 block w-full max-w-2xl rounded-2xl border border-border"
              />
              <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {[...content.bumiputeraUniqueness.sarawakGroups, ...content.bumiputeraUniqueness.sabahGroups].map((g) => (
                  <div key={g.name} className="rounded-2xl p-4" style={{ background: bgPanel }}>
                    <h6 className="font-display mb-1 text-[12.5px] font-bold text-foreground">{g.name}</h6>
                    <p className="text-[10px] leading-relaxed text-muted-foreground">
                      {g.origin}
                      {g.note !== "-" && ` — ${g.note}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display mb-3 text-sm font-bold text-foreground">🧵 Kesenian, Perayaan dan Seni Bina</h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {content.bumiputeraUniqueness.heritage.map((h) => (
                  <div key={`${h.category}-${h.name}`} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                    <p className="text-[9px] uppercase tracking-wide" style={{ color: h.region === "Sarawak" ? neon.green : neon.blue }}>
                      {h.category} · {h.region}
                    </p>
                    <h6 className="font-display mt-1 text-[12.5px] font-bold text-foreground">{h.name}</h6>
                    <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{h.note}</p>
                  </div>
                ))}
              </div>
            </div>
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 10 Selesai"}
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
