import { useState } from "react";
import type { ScatteringLesson } from "@/content/form1/science/chapter-8/chapter8-content";
import { DiagramKey, LightArrow, Pin } from "./Chapter8Dispersion";

function Observer({ x, y }: { x: number; y: number }) {
  return (
    <g
      data-observer=""
      transform={`translate(${x} ${y})`}
      fill="none"
      stroke="#e2e8f0"
      strokeWidth="3"
    >
      <circle cy="-20" r="8" />
      <path d="M0 -12V18M-13 3L0 -5L13 3M0 18L-12 32M0 18L12 32" />
    </g>
  );
}
export function SkyDiagram({ sunset = false }: { sunset?: boolean }) {
  return (
    <svg
      data-optics-visual={sunset ? "sunset" : "midday"}
      viewBox="0 0 440 260"
      className="w-full"
      aria-hidden="true"
    >
      <path data-earth="" d="M10 246Q220 188 430 246V260H10Z" fill="#134e4a" stroke="#5eead4" />
      <path
        data-atmosphere=""
        d="M12 210Q220 -45 428 210"
        stroke="#7dd3fc"
        strokeDasharray="4 6"
        fill="none"
      />
      <circle data-sun="" cx={sunset ? 400 : 215} cy={sunset ? 180 : 30} r="22" fill="#fbbf24" />
      {sunset ? (
        <>
          <LightArrow from={[375, 176]} to={[78, 176]} color="#fb923c" kind="orange-to-observer" />
          <LightArrow from={[375, 183]} to={[78, 183]} color="#f87171" kind="red-to-observer" />
          {[
            [310, 180, 310, 120],
            [245, 180, 265, 210],
            [178, 180, 140, 115],
          ].map(([x, y, a, b]) => (
            <LightArrow key={x} from={[x, y]} to={[a, b]} color="#38bdf8" kind="blue-away" />
          ))}
          <Observer x={67} y={201} />
        </>
      ) : (
        <>
          <LightArrow from={[215, 55]} to={[215, 113]} kind="incoming-sunlight" />
          {[
            [120, 68],
            [312, 77],
            [110, 144],
            [308, 151],
            [163, 170],
            [270, 195],
          ].map((to, i) => (
            <LightArrow key={i} from={[215, 113]} to={to} color="#38bdf8" kind="blue-scattered" />
          ))}
          <Observer x={163} y={190} />
        </>
      )}
      {(sunset
        ? [
            [310, 180],
            [245, 180],
            [178, 180],
          ]
        : [
            [215, 113],
            [185, 95],
            [244, 98],
            [227, 142],
          ]
      ).map(([x, y], i) => (
        <circle key={i} data-air-particle="" cx={x} cy={y} r="5" fill="#cbd5e1" />
      ))}
      <Pin x={sunset ? 402 : 264} y={sunset ? 137 : 28} n={1} />
      <Pin x={sunset ? 323 : 259} y={sunset ? 214 : 123} n={2} />
      <Pin x={sunset ? 44 : 124} y={sunset ? 211 : 205} n={3} />
      <Pin x={351} y={242} n={4} />
    </svg>
  );
}
function MilkDiagram({ position }: { position: number }) {
  return (
    <svg
      data-optics-visual="milk-apparatus"
      data-observation-position={position === 0 ? "side" : "screen"}
      viewBox="0 0 460 345"
      className="w-full"
      aria-hidden="true"
    >
      <rect
        data-ray-box=""
        x="18"
        y="127"
        width="65"
        height="44"
        rx="4"
        fill="#475569"
        stroke="#cbd5e1"
      />
      <path
        data-beaker=""
        d="M142 83V227Q142 237 152 237H278Q288 237 288 227V83M133 83H150M281 83H297"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="3"
      />
      <path
        data-water=""
        d="M146 121H284V225Q284 233 278 233H153Q146 233 146 225Z"
        fill="#cbd5e115"
        stroke="#94a3b8"
      />
      <path
        data-milk-spoon=""
        d="M211 48L263 14M211 48Q184 44 188 61Q200 72 215 56"
        fill="#cbd5e1"
        stroke="#cbd5e1"
        strokeWidth="4"
      />
      {[80, 93, 106].map((y) => (
        <circle key={y} cx={201} cy={y} r="2" fill="#fff" />
      ))}
      {[165, 190, 215, 245, 269].map((x, i) => (
        <circle data-milk-particle="" key={x} cx={x} cy={176 + (i % 2) * 30} r="2" fill="#cbd5e1" />
      ))}
      <path data-white-screen="" d="M355 65L390 51V235L355 250Z" fill="#e2e8f0" stroke="#fff" />
      <LightArrow from={[83, 150]} to={[355, 150]} kind="unrecorded-beam" />
      <g data-side-observation="" opacity={position === 0 ? 1 : 0.45}>
        <path d="M212 270V237" stroke="#fbbf24" strokeDasharray="4 4" />
        <Observer x={212} y={296} />
      </g>
      <g data-screen-observation="" opacity={position === 1 ? 1 : 0.45}>
        <path d="M423 154L391 150" stroke="#fbbf24" strokeDasharray="4 4" />
        <Observer x={430} y={180} />
      </g>
      <Pin x={44} y={108} n={1} />
      <Pin x={304} y={213} n={2} />
      <Pin x={273} y={117} n={3} />
      <Pin x={179} y={36} n={4} />
      <Pin x={374} y={33} n={5} />
      <Pin x={177} y={282} n={6} />
      <Pin x={430} y={231} n={7} />
    </svg>
  );
}
export function Chapter8Scattering({ source: s }: { source: ScatteringLesson }) {
  const [position, setPosition] = useState(0);
  const l = s.labels;
  const skyKey = [l.sun, l.particles, l.observer, l.earth];
  return (
    <div data-scattering-lesson="" className="space-y-8 text-sm leading-6 text-slate-200">
      <p data-scattering-definition="">{s.definition}</p>
      <div className="grid gap-6 lg:grid-cols-2">
        {[false, true].map((sunset) => (
          <figure
            key={String(sunset)}
            className="rounded-2xl border border-sky-300/20 bg-slate-950/40 p-4"
          >
            <h3 className="text-lg font-bold text-white">{sunset ? l.sunset : l.midday}</h3>
            <SkyDiagram sunset={sunset} />
            <figcaption>
              <DiagramKey items={skyKey} />
              <p className="mt-4 text-sky-200">{l.blue}</p>
              {sunset && <p className="text-orange-200">{l.red}</p>}
              <p className="mt-3">{sunset ? s.sunsetExplanation : s.middayExplanation}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <section data-activity="8.8" className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-bold text-white">{s.activity.title}</h3>
        <p className="mt-2">{s.activity.aim}</p>
        <p className="mt-3">
          <strong>{l.apparatus}: </strong>
          {s.activity.apparatus.join(", ")}
        </p>
        <div className="my-4 flex flex-wrap gap-2">
          {[l.side, l.screen].map((label, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={position === i}
              onClick={() => setPosition(i)}
              className={`rounded-lg border px-4 py-3 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${position === i ? "border-cyan-300 bg-cyan-300/15" : "border-slate-600"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <figure className="rounded-xl bg-slate-950/40 p-4">
          <MilkDiagram position={position} />
          <figcaption>
            <DiagramKey items={[l.rayBox, l.beaker, l.water, l.milk, l.screen, l.side, l.screen]} />
          </figcaption>
        </figure>
        <h4 className="mt-4 font-bold">{l.instructions}</h4>
        <ol data-procedure="8.8" className="mt-2 list-decimal space-y-2 pl-6">
          {s.activity.steps.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
        <h4 className="mt-5 font-bold">{l.questions}</h4>
        <ol data-activity-questions="8.8" className="mt-2 list-decimal space-y-3 pl-6">
          {s.activity.questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </section>
      <section data-practice="8.6" className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-bold text-white">{s.practice.title}</h3>
        <ol className="mt-3 list-decimal space-y-3 pl-6">
          {s.practice.questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {s.practice.comparisons.map((q, i) => (
            <figure key={q}>
              <SkyDiagram sunset={i === 1} />
              <figcaption>
                <p className="font-bold">
                  {i === 0 ? l.midday : l.sunset} · {l.observer}
                </p>
                <p>{q}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
