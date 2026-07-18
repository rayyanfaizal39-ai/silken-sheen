import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch3Content } from "@/content/form2/sejarah/chapter-3/sej2ch3-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { KingdomChipGrid, type KingdomChipGridItem } from "./blocks/KingdomChipGrid";
import { NarrowingHierarchyTiers, type NarrowingHierarchyTier } from "./blocks/NarrowingHierarchyTiers";
import { bgPanel, groupGlow, neon } from "./blocks/neon-tokens";
import angkorWatBorobudur from "@/assets/form2-content/angkor-wat-borobudur.png";

const ORBIT_LABELS = [
  "Bahasa & Tulisan",
  "Talang Tuwo",
  "Persuratan",
  "Seni Bina",
  "Struktur Sosial",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 3.1", title: "Bahasa dan Tulisan Mengikut Kerajaan", sub: "Sifat keterbukaan masyarakat Alam Melayu membolehkan sistem tulisan berkembang dalam pelbagai kerajaan." },
  { eyebrow: "◆ 3.1", title: "Batu Bersurat Talang Tuwo", sub: "Inskripsi 1,300 tahun yang masih boleh dibaca hari ini." },
  { eyebrow: "◆ 3.2", title: "Persuratan", sub: "Daripada tradisi lisan kepada batu bersurat dan manuskrip — bukti keintelektualan masyarakat." },
  { eyebrow: "◆ 3.3", title: "Seni Bina Kerajaan Alam Melayu", sub: "Candi, perkapalan dan sistem pengairan — kecemerlangan yang masih berdiri hingga kini." },
  { eyebrow: "◆ 3.4", title: "Struktur Sosial — Empat Lapisan", sub: "Kelas atasan (golongan pemerintah) dan kelas bawahan (golongan diperintah)." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

const TIER_COLORS: NarrowingHierarchyTier["color"][] = ["violet", "violet", "green", "red"];
const TIER_WIDTHS = [500, 440, 380, 320];

export function Sej2Chapter3NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch3Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c3-section` : undefined;
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

  const languageItems: KingdomChipGridItem[] = content.languageWriting.byKingdom.map((k) => ({
    name: k.kingdom.replace(/^Kerajaan\s+/, ""),
    chips: [...k.languages, ...k.writingSystems],
    note: k.evidence,
  }));

  const hierarchyTiers: NarrowingHierarchyTier[] = content.socialStructure.classes.map((c, i) => ({
    label: c.className,
    description: c.composition.join(", "),
    color: TIER_COLORS[i] ?? "grey",
    maxWidthPx: TIER_WIDTHS[i] ?? 300,
  }));

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">📜</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.languageWriting.intro}</p>
            <KingdomChipGrid items={languageItems} />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">🎓 Pendidikan Formal</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{content.languageWriting.education.formal}</p>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">🌾 Pendidikan Tidak Formal</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{content.languageWriting.education.informal}</p>
              </div>
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <div
              className="rounded-2xl p-6"
              style={{ background: bgPanel, boxShadow: groupGlow(neon.amber, 24, 0.15) }}
            >
              <p className="mb-2.5 text-[11px] font-bold" style={{ color: neon.amber }}>
                {content.languageWriting.talangTuwoInscription.context}
              </p>
              <p className="text-[13.5px] italic leading-relaxed text-foreground">
                "{content.languageWriting.talangTuwoInscription.translation}"
              </p>
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.literature.intro}</p>
            <ChipRow heading="🗣️ Tema Tradisi Lisan" items={content.literature.oralTraditionThemes} />
            <DataTable
              headers={["Kerajaan", "Bukti Persuratan", "Karya Terkenal"]}
              rows={content.literature.byKingdom.map((k) => [
                k.kingdom.replace(/^Kerajaan\s+/, ""),
                k.evidence,
                k.famousWorks.length > 0 ? k.famousWorks.join(", ") : "—",
              ])}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">🕉️ Pengaruh India</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {content.literature.indianInfluence.epics.map((e) => (
                    <span key={e} className="rounded-md bg-card px-2 py-1 text-[9.5px] text-foreground">
                      {e}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[10.5px] leading-relaxed text-muted-foreground">{content.literature.indianInfluence.localAdaptation}</p>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">☪️ Pengaruh Islam</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {content.literature.islamicInfluence.forms.map((f) => (
                    <span key={f} className="rounded-md bg-card px-2 py-1 text-[9.5px] text-foreground">
                      {f}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[10.5px] leading-relaxed text-muted-foreground">
                  {[...content.literature.islamicInfluence.propheticWorks, ...content.literature.islamicInfluence.heroicWorks].join(", ")}
                </p>
              </div>
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <img
              src={angkorWatBorobudur}
              alt="Angkor Wat dan Candi Borobudur"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <div className="grid gap-3.5 sm:grid-cols-2">
              {content.architecture.byKingdom.map((a) => (
                <div
                  key={a.kingdom}
                  className="rounded-2xl p-4"
                  style={{ background: bgPanel, boxShadow: groupGlow(neon.violet, 16, 0.1) }}
                >
                  <h5 className="font-display mb-2 text-[12.5px] font-bold text-foreground">
                    {a.kingdom.replace(/^Kerajaan\s+/, "")}
                  </h5>
                  <ul className="list-disc space-y-1 pl-4 text-[10px] leading-relaxed text-muted-foreground">
                    {[...a.structures, ...a.highlights].map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{content.architecture.borobudurFact}</p>
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.socialStructure.intro}</p>
            <NarrowingHierarchyTiers tiers={hierarchyTiers} />
            <div className="grid gap-3 sm:grid-cols-2">
              {content.socialStructure.classes.map((c) => (
                <div key={c.className} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                  <p className="text-[12.5px] font-semibold text-foreground">{c.className}</p>
                  <p className="mt-0.5 text-[10px] font-medium text-muted-foreground">{c.rank}</p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{c.role}</p>
                </div>
              ))}
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
