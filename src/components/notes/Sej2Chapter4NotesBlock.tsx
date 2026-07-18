import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej2Ch4Content } from "@/content/form2/sejarah/chapter-4/sej2ch4-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { IconCardGrid, type IconCardGridItem } from "./blocks/IconCardGrid";
import { EraDotTimeline, type EraDotTimelineItem } from "./blocks/EraDotTimeline";
import { bgPanel, groupGlow, neon } from "./blocks/neon-tokens";
import penyebaranAgama from "@/assets/form2-content/penyebaran-agama-alam-melayu.png";

const ORBIT_LABELS = [
  "Kepercayaan Awal",
  "Penyebaran Agama",
  "Warisan Pemerintahan",
  "Warisan Ekonomi & Budaya",
  "5 Aspek Warisan",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 4.1", title: "Kepercayaan Awal", sub: "Sebelum Hindu, Buddha dan Islam — animisme dan dinamisme membentuk pandangan alam masyarakat." },
  { eyebrow: "◆ 4.1", title: "Penyebaran Agama — Detik Penting", sub: "Daripada animisme kepada Islam, merentas tujuh kerajaan Alam Melayu." },
  { eyebrow: "◆ 4.2", title: "Keunikan Warisan — Pemerintahan dan Kebijaksanaan", sub: "Bagaimana pemerintah mengasimilasikan pengaruh agama dan memilih lokasi strategik." },
  { eyebrow: "◆ 4.2", title: "Keunikan Warisan — Ekonomi dan Sosiobudaya", sub: "Kesuburan tanah, pengairan, pelabuhan, tulisan, persuratan dan seni bina yang diwarisi." },
  { eyebrow: "◆ 4.2", title: "Amalan Beragama & Lima Aspek Keunikan Warisan", sub: "Legasi yang membentuk tamadun Melayu, diwarisi hingga kini." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

const RELIGION_TIMELINE: EraDotTimelineItem[] = [
  { label: "Abad 1", detail: "Hindu/Buddha tersebar — Funan", color: "amber" },
  { label: "Abad 7", detail: "Islam tiba di Alam Melayu", color: "blue" },
  { label: "Abad 13", detail: "Merah Silu (Pasai) → Sultan Malik al-Saleh", color: "green" },
  { label: "1136", detail: "Maharaja Derbar Raja II (Kedah) memeluk Islam", color: "violet" },
  { label: "Abad 16", detail: "Masjid Demak — pusat pengajian Islam terbesar Jawa", color: "red" },
];

export function Sej2Chapter4NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej2Ch4Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej2-c4-section` : undefined;
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

  const heritageItems: IconCardGridItem[] = [
    { icon: "👑", label: "Pemerintahan Beraja", detail: content.governanceHeritage.intro },
    { icon: "🧭", label: "Kebijaksanaan Pemerintah", detail: content.wiseLeadership.diplomaticRelations.map((d) => d.type).join(", ") },
    { icon: "💰", label: "Kegiatan Ekonomi", detail: content.economicHeritage.ports.map((p) => p.type).join(", ") },
    { icon: "📚", label: "Sosiobudaya", detail: content.socioculturalHeritage.writingLanguage },
    { icon: "🕌", label: "Amalan Beragama", detail: content.religiousPracticeHeritage.tolerance },
  ];

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🕌</div>
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.earlyBeliefs.intro}</p>
            <div className="flex flex-wrap gap-4">
              <div
                className="min-w-[250px] flex-1 rounded-2xl p-4.5"
                style={{ background: bgPanel, boxShadow: groupGlow(neon.green, 18, 0.12) }}
              >
                <h4 className="font-display mb-2 text-sm font-bold" style={{ color: neon.green }}>
                  Animisme
                </h4>
                <p className="text-[11.5px] leading-relaxed text-muted-foreground">{content.earlyBeliefs.animism}</p>
              </div>
              <div
                className="min-w-[250px] flex-1 rounded-2xl p-4.5"
                style={{ background: bgPanel, boxShadow: groupGlow(neon.blue, 18, 0.12) }}
              >
                <h4 className="font-display mb-2 text-sm font-bold" style={{ color: neon.blue }}>
                  Dinamisme
                </h4>
                <p className="text-[11.5px] leading-relaxed text-muted-foreground">{content.earlyBeliefs.dynamism}</p>
              </div>
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.religionSpread.intro}</p>
            <img
              src={penyebaranAgama}
              alt="Penyebaran Agama di Alam Melayu"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <EraDotTimeline items={RELIGION_TIMELINE} />
            <p className="text-center text-[11px] text-muted-foreground">
              Toleransi: Candi Prambanan (Hindu) dibina berdekatan Candi Borobudur (Buddha), Jawa Tengah
            </p>
            <DataTable
              headers={["Kerajaan", "Perkembangan Agama", "Bukti"]}
              rows={content.religionSpread.byKingdom.map((k) => [
                k.kingdom.replace(/^Kerajaan\s+/, ""),
                k.religiousDevelopment.join("; "),
                k.evidence.length > 0 ? k.evidence.join(", ") : "—",
              ])}
            />
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{content.religionSpread.pasaiFact}</p>
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.heritageIntro}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.governanceHeritage.intro}</p>
            <ChipRow heading="👑 Pemilihan Raja" items={content.governanceHeritage.kingSelection} />
            <ChipRow heading="🙏 Kedudukan Raja" items={content.governanceHeritage.kingPosition} />
            <ChipRow heading="📛 Gelaran" items={content.governanceHeritage.titles} />
            <ChipRow heading="🧭 Pemilihan Lokasi" items={content.wiseLeadership.locationChoice} />
            <DataTable
              headers={["Jenis Hubungan", "Contoh"]}
              rows={content.wiseLeadership.diplomaticRelations.map((d) => [d.type, d.example])}
            />
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">🌾 Kesuburan Tanah</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{content.economicHeritage.soilFertility}</p>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">💧 Pengairan</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{content.economicHeritage.irrigation}</p>
              </div>
            </div>
            <DataTable
              headers={["Jenis Pelabuhan", "Definisi"]}
              rows={content.economicHeritage.ports.map((p) => [p.type, p.definition])}
            />
            <div className="grid gap-3.5 sm:grid-cols-3">
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">✍️ Tulisan & Bahasa</p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-muted-foreground">{content.socioculturalHeritage.writingLanguage}</p>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">📜 Persuratan</p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-muted-foreground">{content.socioculturalHeritage.literature}</p>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">🏛️ Seni Bina</p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-muted-foreground">{content.socioculturalHeritage.architecture}</p>
              </div>
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">🌐 Keterbukaan</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{content.religiousPracticeHeritage.openness}</p>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
                <p className="text-[12.5px] font-semibold text-foreground">🤝 Toleransi</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{content.religiousPracticeHeritage.tolerance}</p>
              </div>
            </div>
            <div className="rounded-xl p-3.5" style={{ background: bgPanel }}>
              <p className="text-[12.5px] font-semibold text-foreground">⚖️ Agama sebagai Simbol Penyatuan</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{content.religiousPracticeHeritage.religionAsUnifyingSymbol}</p>
            </div>
            <h4 className="font-display text-sm font-bold text-foreground">⭐ Lima Aspek Keunikan Warisan</h4>
            <IconCardGrid items={heritageItems} />
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
