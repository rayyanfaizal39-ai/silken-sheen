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
export function Chapter8Scattering({ source: s }: { source: ScatteringLesson }) {
  const l = s.labels;
  const skyKey = [l.sun, l.particles, l.observer, l.earth];
  return (
    <div data-scattering-lesson="" className="space-y-8 text-sm leading-6 text-slate-200">
      <p data-scattering-definition="">{s.definition}</p>
      <div
        data-scattering-comparison=""
        className="flex flex-wrap gap-x-8 gap-y-2 border-l-2 border-sky-300 pl-4 font-bold"
      >
        <p className="text-sky-200">{s.revision.blue}</p>
        <p className="text-orange-200">{s.revision.red}</p>
      </div>
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
              {sunset && (
                <p data-sunset-path="" className="mt-3">
                  {s.revision.longerPath}
                </p>
              )}
              <p className="mt-3">{sunset ? s.sunsetExplanation : s.middayExplanation}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <dl
        data-dispersion-scattering-comparison=""
        className="grid gap-4 border-t border-slate-700 pt-5 sm:grid-cols-2"
      >
        {s.revision.comparison.map((item) => (
          <div key={item.process}>
            <dt className="font-bold text-white">{item.process}</dt>
            <dd className="mt-1">
              {item.explanation}
              <p className="mt-1 text-slate-400">{item.examples}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
