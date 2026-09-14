import { useId, useState, type ReactNode } from "react";
import type { Chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";

type Lang = "bm" | "en";
// Presentation labels only. Animal names and adaptation explanations come from animalHomeostasis.
const labels = {
  en: {
    choose: "Choose an animal adaptation",
    challenge: "Environmental challenge",
    response: "Response",
    benefit: "Homeostasis benefit",
    hot: "Hot surroundings",
    cold: "Cold surroundings",
    dry: "Dry / exposed",
    humid: "Humid location",
    evaporation: "Evaporation",
    air: "Trapped air",
    heatLoss: "Reduced heat loss",
    cooler: "Body temperature decreases",
    slow: "Slower",
    fast: "Faster",
    temperature: "Temperature control",
    water: "Water-loss control",
    waterLoss: "Water loss",
    fluid: "Fluid",
    lessWater: "Reduced water loss",
    wax: "Waxy outer layer",
    spiracle: "Spiracle",
    open: "Spiracle open",
    closed: "Closed between breaths",
    gas: "Gas exchange",
    vapour: "Water vapour",
  },
  bm: {
    choose: "Pilih adaptasi haiwan",
    challenge: "Cabaran persekitaran",
    response: "Gerak balas",
    benefit: "Manfaat homeostasis",
    hot: "Persekitaran panas",
    cold: "Persekitaran sejuk",
    dry: "Kering / terdedah",
    humid: "Tempat lembap",
    evaporation: "Penyejatan",
    air: "Udara terperangkap",
    heatLoss: "Kehilangan haba berkurang",
    cooler: "Suhu badan menurun",
    slow: "Lebih perlahan",
    fast: "Lebih pantas",
    temperature: "Kawal atur suhu",
    water: "Kawal atur kehilangan air",
    waterLoss: "Kehilangan air",
    fluid: "Cecair",
    lessWater: "Kehilangan air berkurang",
    wax: "Lapisan luar berlilin",
    spiracle: "Spirakel",
    open: "Spirakel terbuka",
    closed: "Tertutup antara pernafasan",
    gas: "Pertukaran gas",
    vapour: "Wap air",
  },
} as const;

function Arrow({
  x,
  y,
  up = false,
  small = false,
}: {
  x: number;
  y: number;
  up?: boolean;
  small?: boolean;
}) {
  return (
    <path
      transform={`translate(${x} ${y}) rotate(${up ? -90 : 0}) scale(${small ? 0.6 : 1})`}
      d="M0 0 H35 M27 -6 L35 0 L27 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}
function Diagram({ name, state, children }: { name: string; state: string; children: ReactNode }) {
  return (
    <svg
      role="img"
      aria-label={name}
      data-animal-diagram={state}
      viewBox="0 0 360 240"
      className="mx-auto block w-full max-w-sm"
      fill="none"
      color="#67e8f9"
      fontFamily="Arial, sans-serif"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}
function Vapour({ reduced = false, skin = false }: { reduced?: boolean; skin?: boolean }) {
  return (
    <g
      data-evaporation={reduced ? "reduced" : "visible"}
      stroke="#7dd3fc"
      strokeWidth="3"
      opacity={reduced ? 0.5 : 1}
    >
      {(skin ? (reduced ? [292] : [280, 310]) : [140, 180, 220]).map((x) => (
        <path key={x} d={`M${x} ${skin ? 132 : 90} q-10 -12 0 -24 t0 -24`} />
      ))}
    </g>
  );
}
function Pet({ cold = false, cat = false }: { cold?: boolean; cat?: boolean }) {
  return (
    <g data-pet={cat ? "cat" : "dog"}>
      {cold && (
        <g
          data-trapped-air="insulation"
          fill="#bae6fd"
          fillOpacity="0.16"
          stroke="#7dd3fc"
          strokeDasharray="4 4"
        >
          <ellipse cx="170" cy="140" rx="132" ry="71" />
          {[90, 120, 150, 180, 210].map((x) => (
            <circle key={x} cx={x} cy="85" r="5" />
          ))}
        </g>
      )}
      <path
        d="M96 147 Q54 137 62 102 Q70 85 79 106"
        stroke="#d6a874"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <ellipse cx="162" cy="147" rx="72" ry="42" fill="#c89663" stroke="#f3ce9b" strokeWidth="3" />
      <path
        d="M115 166 V211 H138 V174 M188 169 V211 H210 V163"
        fill="#c89663"
        stroke="#f3ce9b"
        strokeWidth="3"
      />
      {!cat && (
        <path
          d="M221 116 Q219 82 238 91 L252 126"
          fill="#a87349"
          stroke="#f3ce9b"
          strokeWidth="3"
        />
      )}
      <path
        d={
          cat
            ? "M214 122 L211 83 L235 101 L255 83 L262 124 Q258 150 234 151 Q211 143 214 122Z"
            : "M218 116 Q244 99 261 119 L284 128 Q291 147 266 153 L228 148Z"
        }
        fill="#d6a874"
        stroke="#f3ce9b"
        strokeWidth="3"
      />
      <circle cx="250" cy="122" r="3" fill="#0f172a" />
      <circle cx={cat ? 265 : 284} cy="132" r="4" fill="#0f172a" />
      {cold ? (
        <g data-fur="erect" stroke="#f3ce9b" strokeWidth="3">
          {[95, 113, 131, 149, 167, 185, 203].map((x) => (
            <path key={x} d={`M${x} 117 l-3 -20`} />
          ))}
        </g>
      ) : (
        <>
          <path
            data-tongue="extended-to-fur"
            d={cat ? "M252 147 Q238 171 214 155" : "M270 151 V172 Q264 183 258 172 V153"}
            stroke="#fb7185"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            data-wet-fur="true"
            d="M190 134 Q198 124 206 134 M179 146 Q193 136 208 144"
            stroke="#67e8f9"
            strokeWidth="4"
          />
          <Vapour />
          {!cat && (
            <path
              data-tongue-evaporation="true"
              d="M295 169 q14 -12 5 -24 t5 -24"
              stroke="#7dd3fc"
              strokeWidth="3"
            />
          )}
        </>
      )}
    </g>
  );
}
// One animal outline is shared by both surrounding-temperature states.
function Lizard() {
  return (
    <g data-lizard-body="shared" fill="#65a887" stroke="#a7f3d0" strokeWidth="3">
      <path d="M125 131 Q62 161 29 118 Q65 141 111 116 Q155 89 215 112 L255 95 Q278 98 280 119 L249 139 L211 134 Q165 155 125 131Z" />
      <path
        d="M136 123 L111 90 L83 89 M146 137 L124 175 L97 177 M207 119 L224 77 L247 72 M207 138 L231 171 L257 169"
        fill="none"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="261" cy="111" r="3" fill="#0f172a" />
    </g>
  );
}
function Snail() {
  return (
    <g data-snail-body="shared">
      <path
        d="M63 190 Q79 161 130 164 H243 L254 137 Q263 131 270 142 L281 175 Q302 182 318 193Z"
        fill="#b6c9a1"
        stroke="#d9f99d"
        strokeWidth="3"
      />
      <circle cx="161" cy="137" r="48" fill="#b88758" stroke="#f3ce9b" strokeWidth="4" />
      <path
        d="M163 179 C108 163 127 101 164 107 C203 111 198 163 169 160 C142 156 149 125 168 131 Q181 141 168 146"
        stroke="#754c30"
        strokeWidth="4"
      />
      <path d="M260 144 L251 117 M271 147 L283 121" stroke="#d9f99d" strokeWidth="4" />
      <circle cx="251" cy="116" r="4" fill="#d9f99d" />
      <circle cx="283" cy="120" r="4" fill="#d9f99d" />
      <path
        data-fluid="true"
        d="M67 199 Q131 205 186 198 T286 198"
        stroke="#67e8f9"
        strokeWidth="5"
      />
    </g>
  );
}
function Bee({ closed = false }: { closed?: boolean }) {
  return (
    <g>
      <g data-bee-body="true" strokeWidth="3">
        <ellipse
          cx="121"
          cy="67"
          rx="33"
          ry="18"
          transform="rotate(-28 121 67)"
          fill="#bae6fd"
          stroke="#e0f2fe"
        />
        <ellipse
          cx="170"
          cy="65"
          rx="33"
          ry="18"
          transform="rotate(25 170 65)"
          fill="#bae6fd"
          stroke="#e0f2fe"
        />
        <ellipse cx="169" cy="104" rx="61" ry="32" fill="#fbbf24" stroke="#fef08a" />
        <path
          d="M151 75 Q163 104 151 133 M178 74 Q190 105 178 134 M204 82 Q214 106 204 127"
          stroke="#334155"
          strokeWidth="13"
        />
        <circle cx="101" cy="101" r="23" fill="#eab308" stroke="#fef08a" />
        <circle cx="94" cy="95" r="4" fill="#0f172a" />
        <path
          d="M94 79 L86 65 M109 80 L116 60 M142 129 L128 149 M170 134 V153 M195 130 L212 147"
          stroke="#cbd5e1"
        />
        <g data-spiracle-locations="simplified" fill="#0f172a" stroke="#fef08a">
          {[143, 170, 196].map((x) => (
            <circle key={x} cx={x} cy="119" r="3" />
          ))}
        </g>
      </g>
      <path d="M170 122 L130 168 M196 122 L256 168" stroke="#94a3b8" strokeDasharray="4 4" />
      <g data-surface-detail="true">
        <rect
          x="93"
          y="169"
          width="184"
          height="49"
          rx="10"
          fill="#a16207"
          stroke="#fde68a"
          strokeWidth="2"
        />
        <path data-waxy-layer="true" d="M99 173 H271" stroke="#fef08a" strokeWidth="8" />
        <rect
          data-spiracle={closed ? "closed" : "open"}
          x="176"
          y="167"
          width="20"
          height="28"
          rx="5"
          fill="#0f172a"
          stroke="#fef08a"
          strokeWidth="2"
        />
        {closed ? (
          <path d="M179 171 L193 190 M193 171 L179 190" stroke="#fbbf24" strokeWidth="5" />
        ) : (
          <g data-gas-exchange="true" className="text-cyan-300">
            <Arrow x={177} y={164} up small />
            <g transform="rotate(90 211 144)">
              <Arrow x={211} y={144} small />
            </g>
          </g>
        )}
      </g>
    </g>
  );
}
function StateCard({
  title,
  children,
  outcome,
  emphasis = true,
}: {
  title: string;
  children: ReactNode;
  outcome: string;
  emphasis?: boolean;
}) {
  return (
    <figure
      data-state-highlighted={emphasis}
      className={`min-w-0 rounded-2xl border p-3 ${emphasis ? "border-cyan-300/50 bg-cyan-300/5" : "border-white/10 bg-slate-950/30"}`}
    >
      <figcaption className="text-center text-sm font-bold text-white">{title}</figcaption>
      {children}
      <p className="text-center text-sm font-bold leading-6 text-emerald-200">{outcome}</p>
    </figure>
  );
}
export function AnimalDetail({
  content,
  lang,
  selected,
}: {
  content: Chapter3Content;
  lang: Lang;
  selected: number;
}) {
  const c = labels[lang];
  const animal = content.animalHomeostasis[selected];
  return (
    <div data-animal-selection={selected} className="mt-4">
      <h4 className="text-lg font-bold text-white">{animal.animal}</h4>
      <p
        data-environmental-challenge="true"
        className="mb-3 mt-1 text-xs font-medium text-amber-200"
      >
        {c.challenge}:{" "}
        {selected === 0
          ? `${c.hot} / ${c.cold}`
          : selected === 1
            ? c.cold
            : selected === 2
              ? c.hot
              : selected === 3
                ? c.dry
                : c.waterLoss}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {selected === 0 && (
          <>
            <StateCard title={c.hot} outcome={c.cooler}>
              <Diagram name={`${animal.animal}: ${c.hot}`} state="pets-hot">
                <g transform="translate(-8 18) scale(.68)">
                  <Pet cat />
                </g>
                <g transform="translate(152 39) scale(.65)">
                  <Pet />
                </g>
                <text x="180" y="224" textAnchor="middle" fill="#7dd3fc" fontSize="14">
                  {c.evaporation}
                </text>
              </Diagram>
            </StateCard>
            <StateCard title={c.cold} outcome={c.heatLoss}>
              <Diagram name={`${animal.animal}: ${c.cold}`} state="pets-cold">
                <Pet cold />
                <text x="180" y="40" textAnchor="middle" fill="#7dd3fc" fontSize="14">
                  {c.air}
                </text>
              </Diagram>
            </StateCard>
          </>
        )}
        {(selected === 1 || selected === 2) &&
          [false, true].map((hot) => (
            <StateCard
              key={String(hot)}
              title={hot ? c.hot : c.cold}
              outcome={hot ? c.fast : c.slow}
              emphasis={selected === (hot ? 2 : 1)}
            >
              <Diagram
                name={`${content.animalHomeostasis[hot ? 2 : 1].animal}`}
                state={hot ? "lizard-hot" : "lizard-cold"}
              >
                <Lizard />
                <g data-body-temperature={hot ? "higher" : "lower"}>
                  <path d="M321 103 V158" stroke="#cbd5e1" strokeWidth="15" strokeLinecap="round" />
                  <circle cx="321" cy="168" r="12" fill={hot ? "#fb7185" : "#7dd3fc"} />
                  <path
                    d={`M321 161 V${hot ? 108 : 145}`}
                    stroke={hot ? "#fb7185" : "#7dd3fc"}
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </g>
                <g data-activity-speed={hot ? "faster" : "slower"} className="text-cyan-300">
                  {(hot ? [30, 75, 120] : [75]).map((x) => (
                    <Arrow key={x} x={x} y={204} small={!hot} />
                  ))}
                </g>
                {hot && (
                  <path
                    data-heartbeat="faster"
                    d="M229 40 H244 L250 30 L260 58 L269 22 L278 40 H315"
                    stroke="#fb7185"
                    strokeWidth="3"
                  />
                )}
              </Diagram>
            </StateCard>
          ))}
        {selected === 3 &&
          [false, true].map((humid) => (
            <StateCard
              key={String(humid)}
              title={humid ? c.humid : c.dry}
              outcome={humid ? c.lessWater : c.evaporation}
            >
              <Diagram
                name={`${animal.animal}: ${humid ? c.humid : c.dry}`}
                state={humid ? "snail-humid" : "snail-dry"}
              >
                {humid && (
                  <g data-humid-location="true">
                    <path
                      d="M34 185 V62 Q173 14 323 62 V186"
                      fill="#164e63"
                      fillOpacity=".45"
                      stroke="#5eead4"
                      strokeDasharray="5 5"
                    />
                    {[70, 290].map((x) => (
                      <path key={x} d={`M${x} 70 q-16 20 0 20 q16 0 0 -20`} fill="#67e8f9" />
                    ))}
                  </g>
                )}
                <Snail />
                <g data-skin-water-loss="true">
                  <Vapour reduced={humid} skin />
                </g>
                <text x="180" y="228" textAnchor="middle" fill="#7dd3fc" fontSize="14">
                  {c.fluid}
                </text>
              </Diagram>
            </StateCard>
          ))}
        {selected === 4 &&
          [false, true].map((closed) => (
            <StateCard
              key={String(closed)}
              title={closed ? c.closed : c.open}
              outcome={closed ? c.lessWater : `${c.gas} · ${c.vapour}`}
            >
              <Diagram
                name={`${animal.animal}: ${closed ? c.closed : c.open}`}
                state={closed ? "bee-closed" : "bee-open"}
              >
                <Bee closed={closed} />
                <text x="180" y="20" textAnchor="middle" fill="#fef08a" fontSize="14">
                  {c.wax}
                </text>
                {!closed && (
                  <g data-water-vapour-escape="true" className="text-cyan-300">
                    <Arrow x={238} y={161} up />
                  </g>
                )}
              </Diagram>
            </StateCard>
          ))}
      </div>
      <div
        className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-cyan-200"
        aria-hidden="true"
      >
        <span>{c.challenge}</span>
        <span>→</span>
        <span>{c.response}</span>
        <span>→</span>
        <span>{c.benefit}</span>
      </div>
      <p data-source-adaptation="true" className="mt-2 text-sm leading-6 text-slate-300">
        {animal.adaptation}
      </p>
    </div>
  );
}
export function Chapter3AnimalHomeostasis({
  content,
  lang,
}: {
  content: Chapter3Content;
  lang: Lang;
}) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const c = labels[lang];
  return (
    <section
      data-animal-homeostasis="true"
      className="min-w-0 rounded-2xl border border-white/15 bg-[#071923] p-4 sm:p-5"
    >
      <h3 className="font-bold text-white">{c.choose}</h3>
      <div
        role="group"
        aria-label={c.choose}
        className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
      >
        {content.animalHomeostasis.map((animal, index) => (
          <button
            key={index}
            type="button"
            aria-pressed={selected === index}
            aria-controls={id}
            onClick={() => setSelected(index)}
            className={`min-h-11 rounded-xl border p-2 text-left text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${selected === index ? "border-cyan-300 bg-cyan-300/15 text-white" : "border-white/15 text-slate-300"}`}
          >
            {animal.animal}
          </button>
        ))}
      </div>
      <div id={id} aria-live="polite">
        <AnimalDetail content={content} lang={lang} selected={selected} />
      </div>
      <div
        data-animal-summary="true"
        className="mt-5 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2"
      >
        {[
          [c.temperature, [0, 1]],
          [c.water, [3, 4]],
        ].map(([title, indexes]) => (
          <div key={String(title)}>
            <h4 className="text-sm font-bold text-amber-200">{title}</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {(indexes as number[]).map((index) => (
                <span
                  key={index}
                  className="rounded-lg bg-white/5 px-2 py-1 text-xs text-slate-300"
                >
                  {content.animalHomeostasis[index].animal.split(" (")[0]}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
