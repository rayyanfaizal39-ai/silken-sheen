import type { ParticleStateSource } from "./Chapter5ParticleStates";
import { MotionArrow } from "./Chapter5ParticleStates";

// Schematic coordinates only: the same 16 coloured particles before and after.
const concentrated = Array.from({ length: 16 }, (_, i) => [
  34 + (i % 4) * 12,
  51 + Math.floor(i / 4) * 14,
]);
const spread = [
  [29, 38],
  [87, 40],
  [145, 31],
  [211, 47],
  [265, 35],
  [57, 76],
  [120, 80],
  [182, 91],
  [251, 84],
  [30, 133],
  [88, 123],
  [151, 148],
  [216, 133],
  [275, 145],
  [61, 170],
  [244, 178],
];

function ConcentrationModel({ after, label }: { after: boolean; label: string }) {
  return (
    <svg
      data-concentration={after ? "spread" : "concentrated"}
      viewBox="0 0 300 205"
      role="img"
      aria-label={label}
      className="mx-auto w-full max-w-sm"
    >
      <desc>{label}</desc>
      <rect
        x="12"
        y="12"
        width="276"
        height="180"
        rx="12"
        fill="#0b2230"
        stroke="#7dd3fc"
        strokeWidth="2"
      />
      {(after ? spread : concentrated).map(([x, y], i) => (
        <circle
          data-diffusing-particle
          key={i}
          cx={x}
          cy={y}
          r="5"
          fill="#38bdf8"
          stroke="#bae6fd"
        />
      ))}
    </svg>
  );
}

function GasDiffusionApparatus({ after, source }: { after: boolean; source: ParticleStateSource }) {
  const l = source.diffusionPresentation;
  return (
    <div>
      <svg
        data-diffusion-apparatus="gas-jars"
        data-stage={after ? "after" : "before"}
        viewBox="0 0 260 250"
        role="img"
        aria-label={after ? l.mixture : `${l.air}; ${l.lid}; ${l.bromine}`}
        className="mx-auto w-full max-w-xs"
      >
        <desc>{source.diffusionResults[2].observation}</desc>
        <path
          data-gas-region="upper"
          d="M86 121 V27 Q86 22 91 22 H169 Q174 22 174 27 V121 Z"
          fill={after ? "#b77936" : "#0b2230"}
          fillOpacity={after ? ".55" : "1"}
          stroke="#7dd3fc"
          strokeWidth="2.5"
        />
        <path
          data-gas-region="lower"
          d="M86 129 V223 Q86 228 91 228 H169 Q174 228 174 223 V129 Z"
          fill="#b77936"
          fillOpacity={after ? ".55" : ".85"}
          stroke="#7dd3fc"
          strokeWidth="2.5"
        />
        <path d="M80 121 H180 M80 129 H180" stroke="#7dd3fc" strokeWidth="2" />
        {!after && <rect data-lid x="72" y="122" width="116" height="6" rx="2" fill="#cbd5e1" />}
        {(after
          ? [
              [103, 41],
              [152, 63],
              [111, 95],
              [157, 110],
              [102, 146],
              [149, 168],
              [111, 192],
              [155, 213],
            ]
          : [
              [103, 146],
              [151, 150],
              [122, 167],
              [157, 178],
              [100, 186],
              [135, 194],
              [111, 213],
              [155, 214],
            ]
        ).map(([x, y], i) => (
          <circle data-bromine-particle key={i} cx={x} cy={y} r="4" fill="#fbbf24" />
        ))}
        {after && (
          <g data-gas-diffusion-motion>
            <MotionArrow x={120} y={70} dx={21} dy={-25} />
            <MotionArrow x={140} y={144} dx={-23} dy={23} />
          </g>
        )}
      </svg>
      <p className="min-h-10 text-center text-xs leading-5 text-sky-200">
        {after ? (
          l.mixture
        ) : (
          <>
            {l.air}
            <br />
            {l.lid}
            <br />
            {l.bromine}
          </>
        )}
      </p>
    </div>
  );
}

function DiffusionApparatus({
  index,
  after,
  source,
}: {
  index: number;
  after: boolean;
  source: ParticleStateSource;
}) {
  const l = source.diffusionPresentation;
  const solid = index === 0;
  return (
    <svg
      data-diffusion-apparatus={solid ? "inverted-test-tube" : "upright-test-tube"}
      data-stage={after ? "after" : "before"}
      viewBox="0 0 260 250"
      role="img"
      aria-label={`${after ? l.after : l.before}: ${solid ? l.gel : l.water}; ${l.crystal}`}
      className="mx-auto w-full max-w-xs"
    >
      <desc>{source.diffusionResults[index].observation}</desc>
      {solid ? (
        <g>
          <path
            data-gel
            d="M103 203 V48 A27 27 0 0 1 157 48 V203 Z"
            fill={after ? "#38bdf8" : "#cbd5e1"}
            fillOpacity={after ? ".55" : ".12"}
            stroke="#7dd3fc"
            strokeWidth="2.5"
          />
          <rect
            data-stopper
            x="100"
            y="205"
            width="60"
            height="22"
            rx="2"
            fill="#b59368"
            stroke="#e1c9a7"
            strokeWidth="2"
          />
          {[112, 126, 143].map((x) => (
            <path
              data-crystal
              key={x}
              d={`M${x} 201 l-4 -7 5 -7 6 6 -2 8 Z`}
              fill="#0ea5e9"
              stroke="#bae6fd"
              strokeWidth="1"
              opacity={after ? 0.25 : 1}
            />
          ))}
          <path d="M102 224 H83 M159 224 H178" stroke="#e1c9a7" strokeWidth="2" />
        </g>
      ) : (
        <g>
          <path
            data-water
            d="M94 91 H166 V184 A36 36 0 0 1 94 184 Z"
            fill="#38bdf8"
            fillOpacity={after ? ".55" : ".08"}
          />
          {!after && (
            <path d="M95 191 Q128 169 165 191 A36 36 0 0 1 95 191 Z" fill="#38bdf8" opacity=".6" />
          )}
          <path
            d="M94 30 V184 A36 36 0 0 0 166 184 V30 M89 30 H171"
            stroke="#7dd3fc"
            strokeWidth="2.5"
            fill="none"
          />
          <path d="M94 91 H166" stroke="#7dd3fc" strokeWidth="2" />
          {!after &&
            [118, 132, 142].map((x) => (
              <path
                data-crystal
                key={x}
                d={`M${x} 216 l-4 -5 5 -6 5 5 -2 6 Z`}
                fill="#0ea5e9"
                stroke="#bae6fd"
              />
            ))}
        </g>
      )}
    </svg>
  );
}

export function Chapter5Diffusion({ source }: { source: ParticleStateSource }) {
  const l = source.diffusionPresentation;
  return (
    <section data-visual="diffusion" className="space-y-8">
      <div>
        <h3 className="text-xl font-black text-white">{l.heading}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{source.diffusionDefinition}</p>
      </div>
      <figure
        data-visual="concentration-model"
        className="rounded-xl border border-sky-300/15 p-3 sm:p-5"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div>
            <p className="text-center text-sm font-bold text-sky-200">{l.high}</p>
            <ConcentrationModel after={false} label={l.high} />
          </div>
          <span aria-hidden="true" className="text-2xl text-emerald-300">
            →
          </span>
          <div>
            <p className="text-center text-sm font-bold text-emerald-200">{l.even}</p>
            <ConcentrationModel after label={l.even} />
          </div>
        </div>
        <figcaption className="text-center text-sm text-slate-300">{l.spread}</figcaption>
      </figure>
      <div className="grid gap-8 xl:grid-cols-3">
        {source.diffusionResults.map((result, i) => (
          <figure
            key={result.state}
            data-diffusion-state={i}
            className="min-w-0 border-t border-sky-300/25 pt-4"
          >
            <h4 className="text-lg font-black text-white">{result.state}</h4>
            <p className="mt-1 text-xs leading-5 text-sky-200">
              {i === 0 ? l.gel : i === 1 ? l.water : l.bromine}
            </p>
            {i < 2 && <p className="text-xs leading-5 text-slate-400">{l.crystal}</p>}
            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-1">
              {[false, true].map((after) => (
                <div
                  key={String(after)}
                  className={after ? "col-start-3 row-start-1" : "col-start-1 row-start-1"}
                >
                  <p className="text-center text-xs font-bold text-sky-100">
                    {after ? l.after : l.before}
                  </p>
                  {i < 2 ? (
                    <DiffusionApparatus index={i} after={after} source={source} />
                  ) : (
                    <GasDiffusionApparatus after={after} source={source} />
                  )}
                </div>
              ))}
              <span className="col-start-2 row-start-1 text-xl text-emerald-300" aria-hidden="true">
                →
              </span>
            </div>
            <figcaption className="space-y-3">
              <p className="text-sm leading-6 text-slate-300">{result.observation}</p>
              <p className="border-l-2 border-emerald-300 pl-3 text-sm leading-6 text-sky-100">
                {source.stateProperties[i].particleArrangement};{" "}
                {source.stateProperties[i].particleMovement}
                <span aria-hidden="true" className="mx-2 text-emerald-300">
                  →
                </span>
                <b className="text-emerald-200">{result.rate}</b>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      <figure
        data-visual="diffusion-rate-comparison"
        className="rounded-xl border border-emerald-300/20 bg-emerald-300/[.04] p-4"
      >
        <figcaption className="mb-4 text-center font-black text-emerald-100">
          {l.relationship}
        </figcaption>
        <div className="grid gap-3 sm:grid-cols-3">
          {[2, 1, 0].map((i) => (
            <div key={i} data-rate-state={i}>
              <p className="text-sm font-bold text-sky-100">
                {source.diffusionResults[i].state} · {source.diffusionResults[i].rate}
              </p>
              <svg
                viewBox="0 0 240 50"
                role="img"
                aria-label={`${source.diffusionResults[i].state}: ${source.diffusionResults[i].rate}`}
                className="w-full"
              >
                <circle cx="16" cy="25" r="6" fill="#38bdf8" />
                <g data-speed-cue={i}>
                  <MotionArrow x={30} y={25} dx={[35, 100, 190][i]} dy={0} color="#6ee7b7" />
                </g>
              </svg>
            </div>
          ))}
        </div>
      </figure>
    </section>
  );
}
