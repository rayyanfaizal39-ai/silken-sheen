import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Sej7Content } from "@/content/form1/sejarah/chapter-7/sej7-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { IconCardGrid } from "./blocks/IconCardGrid";
import { DynastyMilitaryCards } from "./blocks/DynastyMilitaryCards";
import { ChinaDynastyTimeline } from "./blocks/ChinaDynastyTimeline";
import { ExamSpanTimeline } from "./blocks/ExamSpanTimeline";
import { bgPanel, groupGlow, neon } from "./blocks/neon-tokens";
import transformasiAsoka from "@/assets/form1-content/transformasi-asoka.png";
import {
  Chapter7Flow,
  Chapter7ExamLadder,
  Chapter7PaperProcess,
} from "./SejChapter7LearningVisuals";

const TOTAL = 10;
const STEP_ORDER = [0, 1, 2, 3, 4, 5, 6, 8, 9, 7];

export function SejChapter7NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
  initialSection = 0,
}: {
  id?: string;
  content: Sej7Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
  initialSection?: number;
}) {
  const stateKey = storageKey ? `${storageKey}:sej-c7-section` : undefined;
  const [current, setCurrent] = useState(initialSection);

  useEffect(() => {
    if (!stateKey) return;
    const saved = window.sessionStorage.getItem(stateKey);
    const parsed = saved ? Number(saved) : 0;
    if (Number.isFinite(parsed)) setCurrent(Math.max(0, Math.min(parsed, TOTAL - 1)));
  }, [stateKey]);

  useEffect(() => {
    if (stateKey) window.sessionStorage.setItem(stateKey, String(current));
  }, [current, stateKey]);

  const isLast = current === 7;
  const official =
    current < 5
      ? content.officialSubtopics[0]
      : current === 7
        ? undefined
        : content.officialSubtopics[1];

  function go(dir: number) {
    setCurrent((c) => STEP_ORDER[Math.max(0, Math.min(TOTAL - 1, STEP_ORDER.indexOf(c) + dir))]);
  }

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-5">
        <div className="shrink-0 text-2xl">🏯</div>
        <div>
          <p className="font-display mb-1 text-base font-bold text-foreground sm:text-lg">
            {content.hook.title}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{content.hook.body}</p>
        </div>
      </div>

      <nav aria-label="Subtopik rasmi" className="mb-4 flex flex-wrap gap-3">
        {content.officialSubtopics.map((sub) => (
          <button
            key={sub.number}
            type="button"
            data-official-subtopic={sub.number}
            onClick={() => setCurrent(sub.start)}
            className="rounded-lg border border-primary/40 px-4 py-2 text-sm font-bold"
          >
            {sub.number} {sub.title}
          </button>
        ))}
      </nav>
      <nav aria-label="Bahagian pembelajaran" className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {STEP_ORDER.map((i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === current}
            onClick={() => setCurrent(i)}
            className={`shrink-0 rounded-lg border px-3 py-2 text-xs ${i === current ? "border-primary bg-primary/10 font-bold text-primary" : "border-border text-muted-foreground"}`}
          >
            {i === 0 ? "Tamadun India" : i === 5 ? "Tamadun China" : content.learningSections[i]}
          </button>
        ))}
      </nav>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8 [&_p]:text-sm [&_h5]:text-sm">
        {official && (
          <p
            data-section-number={official.number}
            className="mb-1 text-xs font-bold uppercase tracking-wider text-primary"
          >
            {official.title}
          </p>
        )}
        <h2 className="font-display mb-6 text-xl font-bold text-foreground sm:text-2xl">
          {content.learningSections[current]}
        </h2>

        {current === 0 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.indiaOverview.intro}
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.indiaOverview.locationShift}
            </p>
            <Chapter7Flow
              items={content.indiaOverview.development}
              label="Lokasi dan Perkembangannya"
            />
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.indiaOverview.janapadaSystem}
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.indiaOverview.magadhaRise}
            </p>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.powerExpansion.definition}
            </p>
            <IconCardGrid
              items={content.powerExpansion.factors.map((f) => ({
                label: f.factor,
                detail: f.description,
              }))}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {content.powerExpansion.forms.map((f) => (
                <div key={f.type} className="rounded-xl border border-border bg-secondary/40 p-3.5">
                  <p className="text-[12.5px] font-semibold text-foreground">{f.type}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <Chapter7Flow
              items={content.indianDynasties.map((d) => d.name)}
              label="Dinasti India"
            />
            <DynastyMilitaryCards dynasties={content.indianDynasties} />
            <dl className="grid gap-3 sm:grid-cols-2">
              {content.glossary.slice(0, 4).map((g) => (
                <div key={g.term}>
                  <dt className="font-semibold">{g.term}</dt>
                  <dd className="text-sm text-muted-foreground">{g.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-6">
            <img
              src={transformasiAsoka}
              alt="Transformasi Asoka"
              className="notes-figure-img rounded-2xl border border-border"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div
                className="rounded-2xl p-4"
                style={{ background: bgPanel, boxShadow: groupGlow(neon.red, 18, 0.15) }}
              >
                <h5 className="font-display mb-2 text-sm font-bold" style={{ color: neon.red }}>
                  ⚔️ Sebelum Perang Kalinga
                </h5>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {content.asokaTransformation.beforeKalinga}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  {content.asokaTransformation.kalingaWar}
                </p>
              </div>
              <div
                className="rounded-2xl p-4"
                style={{ background: bgPanel, boxShadow: groupGlow(neon.green, 18, 0.15) }}
              >
                <h5 className="font-display mb-2 text-sm font-bold" style={{ color: neon.green }}>
                  ☸️ Selepas Perang Kalinga
                </h5>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {content.asokaTransformation.afterKalinga}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  {content.asokaTransformation.asokaPillar}
                </p>
              </div>
            </div>
            <ChipRow heading="☸️ Misi Buddha" items={content.asokaTransformation.buddhistMission} />
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                {content.guptaGoldenAge.founder}
              </span>{" "}
              ({content.guptaGoldenAge.duration})
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.guptaGoldenAge.religionFocus}
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.guptaGoldenAge.samudragupta}
            </p>
            <FactGrid heading="Zaman Gupta" facts={content.guptaGoldenAge.achievements} />
            <p className="text-sm text-muted-foreground">
              {content.glossary[4].term}: {content.glossary[4].meaning}
            </p>
            <FactGrid heading="Tamadun India" facts={content.indianAchievements} />
            <details>
              <summary className="cursor-pointer font-semibold">Aktiviti</summary>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                {content.activities[0].tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </details>
          </div>
        )}

        {current === 5 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.chinaOverview.intro}
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.chinaOverview.location}
            </p>
            <ChinaDynastyTimeline
              items={content.chineseDynasties.map((d, i) => ({
                name: d.name,
                duration: d.duration,
                fact: d.facts[0] ?? "",
                color: i === 0 ? neon.red : neon.blue,
              }))}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {content.chineseDynasties.map((d) => (
                <div key={d.name}>
                  <h3 className="mb-2 font-bold">{d.name}</h3>
                  <p className="text-sm">{d.founder}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{d.capital}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                    {d.facts.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <h3 className="font-bold">Laluan Sutera</h3>
            <Chapter7Flow
              items={content.silkRoad.route}
              label="Laluan Sutera — skema laluan, bukan peta berskala"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {content.silkRoad.definition}. {content.silkRoad.significance}.
            </p>
          </div>
        )}

        {current === 6 && (
          <div className="space-y-6">
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              {content.education.intro}
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                {content.education.confucius.name}
              </span>{" "}
              ({content.education.confucius.lifespan}) — {content.education.confucius.work}.{" "}
              {content.education.confucius.legacy}
            </p>
            <Chapter7Flow items={content.education.chronology} label="Perkembangan Pendidikan" />
            <div className="grid gap-4 sm:grid-cols-2">
              <section>
                <h3 className="mb-2 font-bold">Dinasti Qin</h3>
                <p className="text-sm leading-relaxed">{content.education.qinEducation}</p>
              </section>
              <section>
                <h3 className="mb-2 font-bold">Dinasti Han</h3>
                <p className="text-sm leading-relaxed">{content.education.hanEducation}</p>
              </section>
            </div>
            <h3 className="font-bold">Tahap Sistem Pendidikan</h3>
            <p className="text-sm">{content.education.skills}</p>
            <IconCardGrid
              items={content.education.levels.map((l) => ({ label: l.level, detail: l.focus }))}
            />
            <ChipRow
              heading="🎯 Matlamat Pendidikan"
              items={content.education.goals.map((g) => g.goal)}
            />
            <p className="text-sm">{content.education.socialImportance}</p>
            <Chapter7Flow items={content.education.socialHierarchy} label="Hierarki sosial" />
          </div>
        )}

        {current === 8 && (
          <div className="space-y-6">
            <p className="text-sm leading-relaxed">{content.education.examSystem.intro}</p>
            <ExamSpanTimeline
              startLabel={`Diperkenalkan — ${content.education.examSystem.introduced}`}
              startYear="29 SM"
              endLabel={`Dimansuhkan oleh ${content.education.examSystem.abolishedBy}`}
              endYear={content.education.examSystem.abolished}
            />
            <Chapter7ExamLadder exam={content.education.examSystem} />
            <h3 className="font-bold">Ciri-ciri sistem peperiksaan perkhidmatan awam</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm">
              {content.education.examSystem.characteristics.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed">{content.education.examSystem.sponsorship}</p>
            <ul className="list-disc space-y-2 border-l-2 border-primary/40 pl-5 text-sm">
              {content.education.examSystem.controls.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="text-sm">{content.education.examSystem.syllabus}</p>
            <details>
              <summary className="cursor-pointer font-semibold">Sembilan Buku Suci</summary>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {content.education.examSystem.books.map((group) => (
                  <div key={group.group}>
                    <h4 className="font-semibold">{group.group}</h4>
                    <ul className="mt-2 list-disc pl-5 text-sm">
                      {group.titles.map((title) => (
                        <li key={title}>{title}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
            <h3 className="font-bold">Tokoh intelektual</h3>
            <dl className="grid gap-4 sm:grid-cols-2">
              {content.education.scholars.map((scholar) => (
                <div key={scholar.name} className="border-t border-border pt-3">
                  <dt className="font-semibold">
                    {scholar.name}{" "}
                    <span className="text-xs text-muted-foreground">{scholar.lifespan}</span>
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed">{scholar.contribution}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm">{content.education.examSystem.legacy}</p>
            {content.activities.slice(1).map((activity) => (
              <details key={activity.page}>
                <summary className="cursor-pointer font-semibold">{activity.title}</summary>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                  {activity.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        )}

        {current === 9 && <Chapter7PaperProcess paper={content.education.paperInvention} />}

        {current === 7 && (
          <div className="space-y-6">
            <FactGrid heading="Fakta Penting Peperiksaan" facts={content.keyExamFacts} />
            <FactGrid heading="Nilai, Patriotisme dan Iktibar" facts={content.values} />
            <ChipRow heading="📘 Istilah Utama" items={content.keyTerms} />
            <div>
              <h4 className="font-display mb-2 text-sm font-bold text-foreground">
                ⭐ Rumusan Bab
              </h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                {content.chapterSummary}
              </p>
            </div>
            <details>
              <summary className="cursor-pointer font-semibold">
                Pemahaman dan Pemikiran Kritis
              </summary>
              <ol className="mt-4 list-decimal space-y-5 pl-5">
                {content.practice.map((q) => (
                  <li key={q.question} className="text-sm leading-relaxed">
                    {q.context && (
                      <ul className="mb-2 list-disc pl-4">
                        {q.context.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    )}
                    <p>{q.question}</p>
                    {q.options && (
                      <ol className="mt-2 list-[upper-alpha] pl-5">
                        {q.options.map((option) => (
                          <li key={option}>{option}</li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ol>
            </details>
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
