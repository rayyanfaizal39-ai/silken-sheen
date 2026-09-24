import { useState } from "react";
import type { Chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";
import {
  CompoundFormationDiagram,
  CompoundActivityDiagram,
  CompoundMassDiagram,
  EverydayCompoundObject,
  ElectrolysisDiagram,
  ChangeComparisonDiagram,
} from "./Chapter6CompoundDiagrams";

type Source = Chapter6Content["compounds"];
const sectionClass = "border-t border-white/15 pt-8 space-y-5";
const buttonClass =
  "min-h-11 rounded-xl border px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200";

function PresentationTask({ activity }: { activity: Source["activity610"] }) {
  return (
    <details
      data-presentation-task
      className="border-l-2 border-cyan-300/40 pl-4 text-sm leading-6 text-slate-300"
    >
      <summary className="min-h-11 cursor-pointer py-2 font-semibold text-cyan-100">
        {activity.title}
      </summary>
      <ol className="list-decimal space-y-1 pl-5">
        {activity.instructions.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>
    </details>
  );
}

export function CompoundActivity({ source }: { source: Source }) {
  const [stage, setStage] = useState(0);
  const c = source.labels;
  return (
    <section data-activity="6.11" className={sectionClass}>
      <h3 className="text-xl font-bold">{source.activity611.title}</h3>
      <figure>
        <CompoundFormationDiagram source={source} />
        <figcaption className="grid grid-cols-[1fr_auto_1fr] gap-3 text-center text-sm">
          <span>
            {c.before}
            <br />
            {source.formations[5].reactants}
          </span>
          <span className="text-amber-200">
            {c.heat}
            <br />→
          </span>
          <span>
            {c.after}
            <br />
            {source.formations[5].product}
          </span>
        </figcaption>
      </figure>
      <div className="rounded-2xl border border-cyan-300/15 bg-[#081328] p-3 sm:p-5">
        <div className="grid items-center gap-4 lg:grid-cols-[1.5fr_1fr]">
          <CompoundActivityDiagram source={source} stage={stage} />
          <ol className="grid grid-cols-2 gap-3 text-xs leading-5 sm:text-sm lg:grid-cols-1">
            {source.activity611.apparatus.map((a, i) => (
              <li key={a.id}>
                <span className="mr-2 font-mono text-cyan-300">{i + 1}.</span>
                {a.label}
              </li>
            ))}
          </ol>
        </div>
        <div role="group" aria-label={c.procedure} className="mt-4 flex gap-2">
          {source.activity611.steps.map((step, i) => (
            <button
              type="button"
              key={step}
              aria-label={step}
              aria-pressed={stage === i}
              onClick={() => setStage(i)}
              className={`${buttonClass} ${stage === i ? "border-cyan-300 bg-cyan-300/15 text-cyan-100" : "border-white/15 text-slate-300"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <p
          data-activity-step
          aria-live="polite"
          className="mt-4 min-h-16 text-sm leading-6 text-cyan-50"
        >
          {source.activity611.steps[stage]}
        </p>
        <p className="mt-2 text-xs text-slate-400">{c.schematic}</p>
      </div>
      <p className="text-sm leading-6 text-slate-300">
        <strong className="text-slate-100">{c.materials}: </strong>
        {source.activity611.materials}
      </p>
      {source.activity611.safety && (
        <p className="text-sm text-amber-200">{source.activity611.safety}</p>
      )}
    </section>
  );
}

export function CompoundElectrolysis({ source }: { source: Source }) {
  const [selected, setSelected] = useState<"anode" | "cathode">("cathode");
  const c = source.labels,
    e = source.electrolysis;
  const keys = [
    ...e.products.map((p) => `${p.electrode} → ${p.gas}`),
    e.labels.water,
    e.labels.ammeter,
    e.labels.battery,
  ];
  return (
    <section data-electrolysis className={sectionClass}>
      <h3 className="text-xl font-bold">{c.separation}</h3>
      <p className="max-w-3xl text-sm leading-6 text-slate-300">{source.separation}</p>
      <div className="grid gap-4 sm:grid-cols-2 text-sm">
        <p className="border-l-2 border-cyan-300 pl-3">
          {c.mixture} → {c.physicalSeparation}
        </p>
        <p className="border-l-2 border-violet-300 pl-3">
          {c.compound} → {c.chemicalSeparation}
        </p>
      </div>
      <h4 className="text-lg font-bold text-cyan-100">{c.electrolysis}</h4>
      <p className="max-w-3xl text-sm leading-6 text-slate-300">{source.electrolysisDefinition}</p>
      <div className="rounded-2xl border border-cyan-300/15 bg-[#081328] p-3 sm:p-5">
        <div className="grid items-center gap-4 lg:grid-cols-[1.5fr_1fr]">
          <ElectrolysisDiagram source={source} selected={selected} />
          <ol className="space-y-3 text-sm leading-6">
            {keys.map((text, i) => (
              <li key={text}>
                <span className="mr-2 font-mono text-cyan-300">{i + 1}.</span>
                {text}
              </li>
            ))}
          </ol>
        </div>
        <div
          role="group"
          aria-label={e.labels.electrodes}
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          {e.products.map((p) => (
            <button
              type="button"
              key={p.id}
              aria-pressed={selected === p.id}
              onClick={() => setSelected(p.id)}
              className={`${buttonClass} text-left ${selected === p.id ? "border-cyan-300 bg-cyan-300/15 text-cyan-100" : "border-white/15 text-slate-300"}`}
            >
              <span className="block">{p.electrode}</span>
              <span className="mt-1 block text-base">→ {p.gas}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">{c.schematic}</p>
      </div>
    </section>
  );
}

function ChangeComparison({ source }: { source: Chapter6Content }) {
  const c = source.compounds.labels,
    change = source.physicalVsChemicalChange;
  return (
    <section className={sectionClass} data-change-comparison>
      <h3 className="text-xl font-bold">{c.changes}</h3>
      <div className="grid gap-6 md:grid-cols-2">
        {[false, true].map((chemical) => (
          <div
            key={String(chemical)}
            className={`border-l-2 pl-4 ${chemical ? "border-violet-300" : "border-cyan-300"}`}
          >
            <h4 className={`text-lg font-bold ${chemical ? "text-violet-200" : "text-cyan-200"}`}>
              {chemical ? c.chemical : c.physical}
            </h4>
            <ChangeComparisonDiagram source={source.compounds} chemical={chemical} />
            <dl className="space-y-3 text-sm">
              {change.comparison.map((row) => (
                <div key={row.characteristic}>
                  <dt className="text-slate-400">{row.characteristic}</dt>
                  <dd className="mt-1 text-slate-100">
                    {chemical ? row.chemicalChange : row.physicalChange}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="mt-5 flex flex-wrap gap-2 text-xs leading-5 text-slate-200">
              {(chemical ? change.chemicalExamples : change.physicalExamples).map((example) => (
                <li key={example} className="rounded-lg bg-white/5 px-3 py-2">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-slate-300">{change.common.join(" · ")}</p>
      <p className="text-xs text-slate-400">{c.schematic}</p>
    </section>
  );
}

export function Chapter6Compounds({ source }: { source: Chapter6Content }) {
  const s = source.compounds,
    c = s.labels;
  return (
    <div data-compounds className="space-y-9">
      <p className="max-w-3xl text-base leading-7 text-slate-200">{s.definition}</p>
      <div>
        <h3 className="text-xl font-bold">{c.everyday}</h3>
        <ul className="mt-4 flex flex-wrap gap-2 text-sm">
          {s.examples.map((e) => (
            <li key={e} className="rounded-full border border-white/15 px-3 py-2">
              {e}
            </li>
          ))}
        </ul>
        <div className="mt-5 divide-y divide-white/10">
          {s.everyday.map((item) => (
            <div
              key={item.id}
              data-everyday-compound={item.id}
              className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 py-4 text-center text-xs sm:gap-5 sm:text-sm"
            >
              <span className="text-cyan-100">{item.elements}</span>
              <span aria-hidden="true">→</span>
              <strong className="text-violet-200">{item.compound}</strong>
              <span aria-hidden="true">→</span>
              <figure>
                <EverydayCompoundObject id={item.id} label={item.object} />
                <figcaption>{item.object}</figcaption>
              </figure>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">{s.rust}</p>
      </div>
      <PresentationTask activity={s.activity610} />
      <section className={sectionClass} data-compound-equations>
        <h3 className="max-w-3xl text-xl font-bold">{c.formation}</h3>
        <p className="rounded-xl bg-cyan-300/10 p-4 text-center font-semibold text-cyan-100">
          {c.metalEquation}
        </p>
        <ul className="space-y-3 text-sm">
          {s.formations.slice(0, 5).map((eq) => (
            <li key={eq.reactants} className="grid grid-cols-[1fr_auto_1fr] gap-3">
              <span>{eq.reactants}</span>
              <span className="text-cyan-300">→</span>
              <span className="text-violet-200">{eq.product}</span>
            </li>
          ))}
        </ul>
        <p className="max-w-3xl text-sm leading-6 text-slate-300">{s.alkaliMetalNote}</p>
        <ul className="space-y-3 text-sm">
          {s.alkaliFormations.map((eq) => (
            <li key={eq.reactants} className="grid grid-cols-[1fr_auto_1fr] gap-3">
              <span>{eq.reactants}</span>
              <span className="text-cyan-300">→</span>
              <span className="text-violet-200">{eq.product}</span>
            </li>
          ))}
        </ul>
      </section>
      <CompoundActivity source={s} />
      <figure data-conservation className="border-y border-amber-300/20 py-6">
        <div className="grid grid-cols-2 gap-10 text-center text-sm">
          <p>
            {c.before}
            <br />
            {c.mixture}
            <br />
            <span className="text-amber-200">{c.initialMass}</span>
          </p>
          <p>
            {c.after}
            <br />
            {s.formations[5].product}
            <br />
            <span className="text-amber-200">{c.finalMass}</span>
          </p>
        </div>
        <CompoundMassDiagram source={s} />
        <figcaption className="text-center text-sm leading-6 text-amber-100">
          {s.massConservationNote}
        </figcaption>
      </figure>
      <p className="max-w-3xl text-sm leading-6 text-slate-300">{s.mineralNote}</p>
      <CompoundElectrolysis source={s} />
      <ChangeComparison source={source} />
      <section className={sectionClass} data-mixture-compound-comparison>
        <h3 className="text-xl font-bold">{c.comparison}</h3>
        <CompoundFormationDiagram source={s} />
        <div className="grid grid-cols-2 gap-6 text-center text-sm">
          <p>
            <strong className="block text-cyan-200">{c.mixture}</strong>
            {s.formations[5].reactants}
            <br />
            {c.physicalSeparation}
          </p>
          <p>
            <strong className="block text-violet-200">{c.compound}</strong>
            {s.formations[5].product}
            <br />
            {c.chemicalSeparation}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[430px] text-left text-sm">
            <caption className="mb-3 text-left text-slate-300">
              {c.table} · {c.answerKey}
            </caption>
            <thead className="bg-cyan-300/10 text-cyan-100">
              <tr>
                {[c.characteristic, c.mixture, c.compound].map((h) => (
                  <th key={h} className="p-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {source.mixturesVsCompounds.map((row, i) => (
                <tr
                  key={row.characteristic}
                  data-source={i < 4 ? "table-6.2" : "answer-key-6.3"}
                  className="border-b border-white/10 align-top"
                >
                  <th scope="row" className="p-3 font-medium">
                    {row.characteristic}
                  </th>
                  <td className="p-3 leading-6 text-slate-300">{row.mixture}</td>
                  <td className="p-3 leading-6 text-slate-300">{row.compound}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PresentationTask activity={s.activity612} />
      </section>
      <section className={sectionClass} data-compound-recall>
        <h3 className="text-xl font-bold">{c.recall}</h3>
        <div className="divide-y divide-white/10">
          {s.activeRecall.map((item) => (
            <details key={item.question} className="py-2">
              <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold text-cyan-100">
                {item.question}
              </summary>
              <p className="pb-3 text-sm leading-6 text-slate-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className={sectionClass} data-chapter-summary>
        <h3 className="text-xl font-bold">{c.facts}</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
          {source.keyExamFacts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="border-l-2 border-cyan-300 pl-4 text-sm leading-6 text-cyan-100">
          {source.chapterSummary}
        </p>
        <details className="text-sm">
          <summary className="min-h-11 cursor-pointer py-3 font-semibold">{c.terms}</summary>
          <p className="leading-7 text-slate-300">{source.keyTerms.join(" · ")}</p>
        </details>
      </section>
    </div>
  );
}
