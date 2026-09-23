import { useState } from "react";
import type {
  Chapter6Content,
  SeparationMethod,
} from "@/content/form1/science/chapter-6/chapter6-content";
import { MixtureApparatus, PhysicalMixtureDiagram } from "./Chapter6MixtureDiagrams";

type Source = Chapter6Content["mixtures"];
const buttonClass =
  "min-h-11 rounded-xl border px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200";

export function MixtureMethod({ source, method }: { source: Source; method: SeparationMethod }) {
  const [stage, setStage] = useState(0);
  return (
    <article
      id={`mixture-${method.id}`}
      data-method={method.id}
      className="scroll-mt-24 border-t border-white/15 pt-8"
    >
      <div className="flex items-baseline gap-3">
        {method.activity && (
          <span
            data-activity={method.activity}
            className="rounded-lg bg-cyan-300/10 px-2 py-1 font-mono text-sm text-cyan-200"
          >
            {method.activity}
          </span>
        )}
        <h3 className="text-xl font-bold text-white">{method.name}</h3>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{method.usedFor}</p>
      <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-[#081328] p-3 sm:p-5">
        <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(200px,1fr)]">
          <figure>
            <MixtureApparatus method={method} stage={stage} />
            <figcaption className="text-center text-xs text-slate-400">
              {source.labels.schematic}
            </figcaption>
          </figure>
          <ol
            aria-label={source.labels.materials}
            className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs leading-5 sm:text-sm lg:grid-cols-1"
          >
            {method.apparatus.map((a, i) => (
              <li key={a.id} className="flex gap-2">
                <span className="font-mono text-cyan-300">{i + 1}.</span>
                <span>{a.label}</span>
              </li>
            ))}
          </ol>
        </div>
        <div
          className="mt-5 flex items-center gap-2"
          role="group"
          aria-label={`${method.name}: ${source.labels.instruction}`}
        >
          {method.steps.map((step, i) => (
            <button
              key={step}
              type="button"
              aria-label={step}
              aria-pressed={stage === i}
              onClick={() => setStage(i)}
              className={`${buttonClass} ${stage === i ? "border-cyan-300 bg-cyan-300/20 text-cyan-100" : "border-white/15 text-slate-300"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <p
          data-process-step
          aria-live="polite"
          className="mt-3 min-h-16 text-sm leading-6 text-cyan-50"
        >
          {method.steps[stage]}
        </p>
        <p className="border-t border-white/10 pt-3 text-sm leading-6 text-amber-100">
          {method.observation}
        </p>
      </div>
      <details className="mt-3 text-sm leading-6 text-slate-300">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold text-slate-100">
          {source.labels.materials}
        </summary>
        <p>{method.materials}</p>
      </details>
      {method.notes.length > 0 && (
        <aside className="mt-3 border-l-2 border-amber-300/50 pl-4 text-sm leading-6 text-slate-300">
          {method.id === "chromatography" && (
            <h4 className="font-bold text-amber-200">{source.labels.exploration}</h4>
          )}
          {method.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </aside>
      )}
    </article>
  );
}

function MatchingQuestion({
  source,
  item,
  index,
}: {
  source: Source;
  item: Source["formativePractice"][number];
  index: number;
}) {
  const [answer, setAnswer] = useState("");
  return (
    <div className="border-b border-white/10 py-4">
      <label htmlFor={`mixture-question-${index}`} className="block text-sm font-medium">
        {item.mixture}
      </label>
      <select
        id={`mixture-question-${index}`}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="mt-2 min-h-11 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 text-sm text-slate-100 focus-visible:outline-cyan-300"
      >
        <option value="">{source.labels.choose}</option>
        {source.separationMethods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.name}
          </option>
        ))}
      </select>
      {answer && (
        <p
          role="status"
          data-correct={answer === item.method}
          className={`mt-2 text-sm ${answer === item.method ? "text-emerald-300" : "text-amber-200"}`}
        >
          {answer === item.method ? source.labels.correct : source.labels.retry}
        </p>
      )}
    </div>
  );
}

export function Chapter6Mixtures({ source }: { source: Source }) {
  return (
    <div data-mixtures className="space-y-8">
      <p className="max-w-3xl text-base leading-7 text-slate-200">{source.definition}</p>
      <figure className="mx-auto max-w-2xl">
        <PhysicalMixtureDiagram label={source.physicalSeparation} />
        <div className="grid grid-cols-3 gap-6 text-center text-xs sm:text-sm">
          <span>{source.labels.componentA}</span>
          <span>{source.labels.componentB}</span>
          <span>{source.labels.mixture}</span>
        </div>
        <figcaption className="mt-5 text-center text-sm leading-6 text-cyan-100">
          {source.physicalSeparation}
        </figcaption>
      </figure>
      <ul className="flex flex-wrap justify-center gap-3 text-sm text-slate-300">
        {source.examples.map((e) => (
          <li key={e} className="rounded-full border border-white/10 px-3 py-2">
            {e}
          </li>
        ))}
      </ul>
      <div>
        <h3 className="text-xl font-bold">{source.labels.overview}</h3>
        <nav
          data-method-overview
          aria-label={source.labels.choose}
          className="mt-4 flex flex-wrap gap-2"
        >
          {source.separationMethods.map((m, i) => (
            <a
              href={`#mixture-${m.id}`}
              key={m.id}
              className={`${buttonClass} border-cyan-300/20 bg-cyan-300/5 text-cyan-100`}
            >
              <span className="mr-2 text-cyan-400">{i + 1}</span>
              {m.name}
            </a>
          ))}
        </nav>
      </div>
      <div>
        <p className="font-semibold">{source.labels.selection}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-300">
          {source.selectionFactors.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <ol data-method-decision className="mt-5 grid gap-3 sm:grid-cols-4">
          {source.decision.map((d, i) => (
            <li key={d} className="flex items-center gap-3 text-sm text-cyan-100">
              <span className="rounded-lg bg-cyan-300/10 p-3">{d}</span>
              {i < source.decision.length - 1 && (
                <span aria-hidden="true" className="text-cyan-300">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      {source.separationMethods.map((method) => (
        <MixtureMethod key={method.id} source={source} method={method} />
      ))}
      <div className="border-t border-white/15 pt-8">
        <div className="overflow-x-auto">
          <table data-method-comparison className="w-full min-w-[540px] text-left text-sm">
            <caption className="mb-3 text-left text-lg font-bold">{source.labels.overview}</caption>
            <thead className="bg-cyan-300/10 text-cyan-100">
              <tr>
                {[source.labels.method, source.labels.property, source.labels.example].map((h) => (
                  <th key={h} className="p-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {source.separationMethods.map((m) => (
                <tr key={m.id} className="border-b border-white/10 align-top">
                  <th scope="row" className="p-3 font-medium">
                    {m.name}
                  </th>
                  <td className="p-3 leading-6 text-slate-300">{m.usedFor}</td>
                  <td className="p-3 leading-6 text-slate-300">{m.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <section data-mixture-practice>
        <h3 className="text-xl font-bold">{source.labels.practice}</h3>
        <p className="mt-3 text-sm text-slate-300">{source.labels.match}</p>
        <div className="grid gap-x-6 sm:grid-cols-2">
          {source.formativePractice.map((item, index) => (
            <MatchingQuestion key={item.mixture} source={source} item={item} index={index} />
          ))}
        </div>
        <details className="mt-6 rounded-xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6">
          <summary className="cursor-pointer font-semibold text-amber-100">
            {source.reasoning.question}
          </summary>
          <p className="mt-3 text-slate-200">{source.reasoning.answer}</p>
        </details>
      </section>
    </div>
  );
}
