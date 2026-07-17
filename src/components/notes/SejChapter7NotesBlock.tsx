import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej7Content } from "@/content/form1/sejarah/chapter-7/sej7-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { DynastyMilitaryCards } from "./blocks/DynastyMilitaryCards";
import { ChinaDynastyTimeline } from "./blocks/ChinaDynastyTimeline";
import { ExamSpanTimeline } from "./blocks/ExamSpanTimeline";
import { bgPanel, groupGlow, neon } from "./blocks/neon-tokens";
import transformasiAsoka from "@/assets/form1-content/transformasi-asoka.png";
import dinastiQinHan from "@/assets/form1-content/dinasti-qin-han.png";

const ORBIT_LABELS = [
  "Pengenalan India",
  "Perluasan Kuasa",
  "Tiga Dinasti India",
  "Transformasi Asoka",
  "Zaman Gupta",
  "Tamadun China",
  "Pendidikan China",
  "Rumusan",
];

const SECTION_CHROME: Array<{ eyebrow: string; title: string; sub?: string }> = [
  { eyebrow: "◆ 7.1", title: "Tamadun India" },
  { eyebrow: "◆ 7.2", title: "Lima Faktor Perluasan Kuasa", sub: "Apa yang membolehkan sesebuah kerajaan India berkembang menjadi empayar." },
  { eyebrow: "◆ 7.3", title: "Tiga Dinasti India — Kekuatan Ketenteraan", sub: "Semua berpusat di Pataliputra, semua bergantung pada kekuatan tentera." },
  { eyebrow: "◆ 7.4", title: "Transformasi Asoka — Sebelum dan Selepas Kalinga", sub: "Satu peperangan yang mengubah keseluruhan hala tuju empayar." },
  { eyebrow: "◆ 7.5", title: "Zaman Keemasan Gupta" },
  { eyebrow: "◆ 7.6", title: "Dinasti Qin ke Dinasti Han", sub: "Penyatuan China, kemudian pembukaan dunia melalui Laluan Sutera." },
  { eyebrow: "◆ 7.7", title: "Sistem Pendidikan Tamadun China", sub: "Tiga peringkat, satu matlamat: peperiksaan perkhidmatan awam." },
  { eyebrow: "◆ Rumusan", title: "Fakta Penting & Istilah Utama" },
];

const TOTAL = ORBIT_LABELS.length;

export function SejChapter7NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: Sej7Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const stateKey = storageKey ? `${storageKey}:sej-c7-section` : undefined;
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
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.indiaOverview.intro}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.indiaOverview.locationShift}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.indiaOverview.janapadaSystem}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.indiaOverview.magadhaRise}</p>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.powerExpansion.definition}</p>
            <IconCardGrid
              items={content.powerExpansion.factors.map((f) => ({ label: f.factor, detail: f.description }))}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {content.powerExpansion.forms.map((f) => (
                <div key={f.type} className="rounded-xl border border-border bg-secondary/40 p-3.5">
                  <p className="text-[12.5px] font-semibold text-foreground">{f.type}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 2 && <DynastyMilitaryCards dynasties={content.indianDynasties} />}

        {current === 3 && (
          <div className="space-y-6">
            <img
              src={transformasiAsoka}
              alt="Transformasi Asoka"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: groupGlow(neon.red, 18, 0.15) }}>
                <h5 className="font-display mb-2 text-sm font-bold" style={{ color: neon.red }}>
                  ⚔️ Sebelum Perang Kalinga
                </h5>
                <p className="text-[11px] leading-relaxed text-muted-foreground">{content.asokaTransformation.beforeKalinga}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{content.asokaTransformation.kalingaWar}</p>
              </div>
              <div className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: groupGlow(neon.green, 18, 0.15) }}>
                <h5 className="font-display mb-2 text-sm font-bold" style={{ color: neon.green }}>
                  ☸️ Selepas Perang Kalinga
                </h5>
                <p className="text-[11px] leading-relaxed text-muted-foreground">{content.asokaTransformation.afterKalinga}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{content.asokaTransformation.asokaPillar}</p>
              </div>
            </div>
            <ChipRow heading="☸️ Misi Buddha" items={content.asokaTransformation.buddhistMission} />
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">{content.guptaGoldenAge.founder}</span> ({content.guptaGoldenAge.duration})
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.guptaGoldenAge.religionFocus}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.guptaGoldenAge.samudragupta}</p>
            <FactGrid heading="🏆 Pencapaian Zaman Gupta" facts={content.guptaGoldenAge.achievements} />
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.chinaOverview.intro}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.chinaOverview.location}</p>
            <img
              src={dinastiQinHan}
              alt="Dinasti Qin dan Han"
              className="mx-auto block w-full max-w-2xl rounded-2xl border border-border"
            />
            <ChinaDynastyTimeline
              items={content.chineseDynasties.map((d, i) => ({
                name: d.name,
                duration: d.duration,
                fact: d.facts[0] ?? "",
                color: i === 0 ? neon.red : neon.blue,
              }))}
            />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.silkRoad.definition}</p>
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">{content.education.intro}</p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Confucius</span> ({content.education.confucius.lifespan}) —{" "}
              {content.education.confucius.work}. {content.education.confucius.legacy}
            </p>
            <IconCardGrid
              items={content.education.levels.map((l) => ({ label: l.level, detail: l.focus }))}
            />
            <ChipRow heading="🎯 Matlamat Pendidikan" items={content.education.goals.map((g) => g.goal)} />
            <ExamSpanTimeline
              startLabel={`Diperkenalkan — ${content.education.examSystem.introduced}`}
              startYear="29 SM"
              endLabel={`Dimansuhkan oleh ${content.education.examSystem.abolishedBy}`}
              endYear={content.education.examSystem.abolished}
            />
            <p className="text-center text-[11px] text-muted-foreground">
              Kertas dicipta oleh {content.education.paperInvention.inventor} — {content.education.paperInvention.materials}
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
                  {isRead ? "Selesai ditanda ✓" : "📘 Tandakan Bab 7 Selesai"}
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
