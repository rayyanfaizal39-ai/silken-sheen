import { useId, type ReactNode } from "react";
import type { SeparationMethod } from "@/content/form1/science/chapter-6/chapter6-content";

const cyan = "#67e8f9";
const glass = "#bae6fd";
const amber = "#fbbf24";

function Beaker({
  x,
  y,
  fill = 0,
  sediment = false,
}: {
  x: number;
  y: number;
  fill?: number;
  sediment?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {fill > 0 && <path d={`M4 ${80 - fill} H76 V77 H4 Z`} fill={cyan} fillOpacity=".3" />}
      {sediment && (
        <path
          data-material="sediment"
          d="M4 67 L15 63 L28 67 L45 62 L61 66 L76 63 V77 H4Z"
          fill="#b6956a"
        />
      )}
      <path d="M-5 0 H0 V80 H80 V0 H87" fill="none" stroke={glass} strokeWidth="3" />
      {[20, 35, 50, 65].map((y) => (
        <path key={y} d={`M60 ${y}h12`} stroke={glass} />
      ))}
    </g>
  );
}

function Stand({ x, top = 55, bottom = 300 }: { x: number; top?: number; bottom?: number }) {
  return (
    <g stroke="#94a3b8" strokeWidth="5" fill="none">
      <path d={`M${x - 25} ${bottom}h70 M${x} ${bottom}V${top}`} />
    </g>
  );
}

/** Apparatus geometry only. All names, procedures and results are supplied by canonical data. */
export function MixtureApparatus({ method, stage }: { method: SeparationMethod; stage: number }) {
  const uid = useId().replace(/:/g, "");
  const marker = `${uid}-flow`;
  const clip = `${uid}-funnel`;
  const arrow = (d: string, color = cyan) => (
    <path d={d} fill="none" stroke={color} strokeWidth="3" markerEnd={`url(#${marker})`} />
  );
  const key = (id: string, x: number, y: number, tx?: number, ty?: number) => {
    const i = method.apparatus.findIndex((a) => a.id === id);
    return (
      <g data-callout={id}>
        {tx !== undefined && <path d={`M${x} ${y}L${tx} ${ty}`} stroke="#94a3b8" fill="none" />}
        <circle cx={x} cy={y} r="12" fill="#0f172a" stroke={cyan} />
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fill="white"
          fontSize="15"
          fontFamily="sans-serif"
          fontWeight="700"
        >
          {i + 1}
        </text>
      </g>
    );
  };
  let drawing: ReactNode;
  switch (method.id) {
    case "filtration":
      drawing = (
        <>
          <Stand x={95} />
          <path d="M95 155H235" stroke="#94a3b8" strokeWidth="5" />
          <ellipse cx="235" cy="157" rx="39" ry="6" stroke="#94a3b8" fill="none" strokeWidth="3" />
          <g transform="translate(125 25) rotate(-28 40 40)">
            <Beaker x={0} y={0} fill={stage === 0 ? 44 : 12} />
            <path d="M4 60h72v16H4z" fill="#b6956a" opacity={stage === 0 ? 1 : 0.2} />
          </g>
          <path
            data-part="filter-funnel"
            d="M181 133L226 192V220H244V192L289 133"
            stroke={glass}
            strokeWidth="3"
            fill="#164e63"
            fillOpacity=".4"
          />
          <path
            data-part="filter-paper"
            d="M194 135L235 181L276 135"
            stroke="#f8fafc"
            strokeWidth="5"
            fill="#e2e8f0"
            fillOpacity=".25"
          />
          <path data-part="residue" d="M213 155L235 176L255 155Z" fill="#c4a477" />
          <path data-part="glass-rod" d="M157 91L229 157" stroke={glass} strokeWidth="4" />
          {stage === 1 && (
            <>
              {arrow("M187 94L216 126")}
              {arrow("M235 187V244")}
            </>
          )}
          <g data-part="filtrate">
            <Beaker x={195} y={223} fill={stage === 2 ? 38 : 12} />
          </g>
          <path
            d="M350 255l40-50m-45 54q-12 8-3 14t16-8"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="6"
          />
          {key("mixture", 70, 30, 136, 49)}
          {key("paper", 318, 116, 260, 144)}
          {key("funnel", 336, 175, 259, 174)}
          {key("residue", 313, 213, 237, 165)}
          {key("filtrate", 318, 282, 240, 282)}
          {key("rod", 87, 110, 188, 119)}
          {key("stand", 47, 233, 95, 231)}
          {key("beaker", 165, 296, 195, 284)}
          {key("spatula", 411, 257, 365, 244)}
        </>
      );
      break;
    case "distillation":
      drawing = (
        <>
          <Stand x={78} top={65} />
          <Stand x={339} top={105} />
          <path d="M78 124H162 M339 173L322 160" fill="none" stroke="#94a3b8" strokeWidth="5" />
          <path
            data-part="round-bottom-flask"
            d="M154 96V152C114 165 118 222 161 226C205 230 218 173 178 153V110L203 119L209 106L178 91V80H154Z"
            fill="#164e63"
            fillOpacity=".3"
            stroke={glass}
            strokeWidth="3"
          />
          <path
            data-part="mixture"
            d="M130 188H202Q201 223 168 223Q137 220 130 188Z"
            fill={cyan}
            fillOpacity=".35"
          />
          <g data-part="porcelain-chips" fill="white">
            <path d="M151 214l6-6 6 8z M172 215l7-8 6 7z" />
          </g>
          <path
            data-part="thermometer"
            d="M164 35v87"
            stroke="#e2e8f0"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path d="M164 65v57" stroke="#fb7185" strokeWidth="3" />
          <path
            data-part="liebig-condenser"
            d="M215 102L399 178L391 201L207 125Z"
            fill={cyan}
            fillOpacity=".18"
            stroke={glass}
            strokeWidth="3"
          />
          <path
            data-part="vapour-tube"
            d="M205 112L403 195L415 209V239"
            fill="none"
            stroke={glass}
            strokeWidth="6"
          />
          <path
            data-part="water-out"
            d="M247 115L254 91"
            fill="none"
            stroke={glass}
            strokeWidth="8"
          />
          <path
            data-part="water-in"
            d="M362 189L353 215"
            fill="none"
            stroke={glass}
            strokeWidth="8"
          />
          {arrow("M345 234L355 209")}
          {arrow("M252 93L262 69")}
          <path
            data-part="wire-gauze"
            d="M119 230H216M122 234H213"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          <path
            data-part="tripod"
            d="M133 235L118 300M199 235L215 300M166 237V290"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="4"
          />
          <g data-part="bunsen-burner">
            <path d="M149 300h37m-26-2v-23h14v23" stroke="#94a3b8" strokeWidth="4" fill="#334155" />
            {stage > 0 && <path d="M163 273Q145 266 166 241Q187 269 171 273Z" fill={amber} />}
          </g>
          <g data-part="receiver">
            <Beaker x={392} y={242} fill={stage === 2 ? 28 : 0} />
          </g>
          {stage > 0 && (
            <g data-flow="vapour-to-condenser">{arrow("M168 176V103L288 147", amber)}</g>
          )}
          {stage === 2 && (
            <g data-flow="cooled-liquid-to-receiver">{arrow("M315 158L416 202V229")}</g>
          )}
          {key("flask", 39, 159, 130, 178)}
          {key("mixture", 36, 201, 145, 194)}
          {key("chips", 51, 247, 155, 214)}
          {key("thermometer", 122, 33, 159, 44)}
          {key("burner", 256, 288, 172, 283)}
          {key("gauze", 251, 246, 209, 231)}
          {key("tripod", 87, 281, 121, 285)}
          {key("condenser", 340, 58, 314, 145)}
          {key("in", 314, 238, 353, 216)}
          {key("out", 292, 45, 255, 91)}
          {key("beaker", 451, 218, 446, 252)}
          {key("stand", 415, 103, 341, 123)}
        </>
      );
      break;
    case "magnet":
      drawing = (
        <>
          <ellipse
            data-part="petri-dish"
            cx="218"
            cy="241"
            rx="122"
            ry="34"
            fill="#164e63"
            fillOpacity=".4"
            stroke={glass}
            strokeWidth="3"
          />
          <path d="M96 240v19c30 44 215 44 244 0v-19" stroke={glass} strokeWidth="3" fill="none" />
          <path
            data-part="paper"
            d="M266 55L402 83L374 175L237 147Z"
            fill="#cbd5e1"
            fillOpacity=".15"
            stroke="#e2e8f0"
          />
          <g
            data-part="bar-magnet"
            transform={
              stage === 0 ? "translate(335 75) rotate(12)" : "translate(245 106) rotate(12)"
            }
          >
            <rect width="48" height="28" fill="#fb7185" />
            <rect x="48" width="48" height="28" fill="#38bdf8" />
          </g>
          <g data-material="sulphur" data-attracted="false" fill={amber}>
            {Array.from({ length: 12 }, (_, i) => (
              <circle key={i} cx={145 + (i % 6) * 24} cy={230 + Math.floor(i / 6) * 19} r="5" />
            ))}
          </g>
          <g data-material="iron" data-attracted={stage > 0} fill="#cbd5e1">
            {Array.from({ length: 12 }, (_, i) => (
              <rect
                key={i}
                x={stage > 0 ? 252 + (i % 6) * 12 : 153 + (i % 6) * 24}
                y={stage > 0 ? 147 + Math.floor(i / 6) * 9 : 236 + Math.floor(i / 6) * 19}
                width="7"
                height="5"
              />
            ))}
          </g>
          {stage > 0 && (
            <g data-flow="iron-only">
              {arrow("M220 215Q222 185 249 174")}
              {arrow("M260 212L277 178")}
            </g>
          )}
          <path
            d="M52 113l75-25m-80 26q-16 2-12 10t20-4"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="6"
          />
          {key("iron", 391, 217, stage > 0 ? 291 : 220, stage > 0 ? 154 : 241)}
          {key("sulphur", 369, 288, 264, 251)}
          {key("dish", 70, 291, 120, 263)}
          {key("paper", 231, 48, 271, 60)}
          {key("magnet", 409, 47, stage === 0 ? 378 : 288, stage === 0 ? 101 : 129)}
          {key("spatula", 73, 60, 80, 104)}
        </>
      );
      break;
    case "sedimentation":
      drawing = (
        <>
          <g transform={stage === 2 ? "translate(63 -27) rotate(24 170 225)" : undefined}>
            <Beaker x={100} y={160} fill={stage === 2 ? 20 : 65} sediment={stage > 0} />
            {stage === 0 && (
              <g data-part="suspended-silt" fill="#b6956a">
                {Array.from({ length: 20 }, (_, i) => (
                  <circle key={i} cx={109 + (i % 5) * 14} cy={182 + Math.floor(i / 5) * 14} r="3" />
                ))}
              </g>
            )}
          </g>
          <g data-part="clear-upper-water" opacity={stage > 0 ? 1 : 0}>
            <path d="M105 180h70" stroke={cyan} strokeWidth="3" opacity={stage === 1 ? 1 : 0} />
          </g>
          <Beaker x={322} y={220} fill={stage === 2 ? 42 : 0} />
          <path
            data-part="glass-rod"
            d={stage === 2 ? "M224 171L332 221" : "M148 106L132 217"}
            stroke={glass}
            strokeWidth="5"
          />
          {stage === 1 && <g data-flow="settling">{arrow("M217 167V226", amber)}</g>}
          {stage === 2 && <g data-flow="clear-water-poured">{arrow("M239 184L340 237")}</g>}
          {key("mixture", 55, 137, 113, 175)}
          {key("water", 242, 126, 157, 183)}
          {key("sediment", 87, 286, stage === 2 ? 178 : 134, 236)}
          {key("rod", 192, 72, stage === 2 ? 239 : 148, stage === 2 ? 182 : 115)}
          {key("beaker", 442, 278, 399, 261)}
        </>
      );
      break;
    case "floatation":
      drawing = (
        <>
          <Stand x={90} top={28} />
          <path d="M90 95H221" stroke="#94a3b8" strokeWidth="5" />
          <defs>
            <clipPath id={clip}>
              <path d="M177 51H263V90Q289 148 232 202V225H210V202Q151 148 177 90Z" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clip})`}>
            <rect
              data-layer="oil"
              x="150"
              y={stage === 2 ? 120 : 95}
              width="145"
              height="42"
              fill={amber}
              fillOpacity=".8"
            />
            <rect
              data-layer="water"
              x="150"
              y={stage === 2 ? 162 : 137}
              width="145"
              height={stage === 2 ? 68 : 93}
              fill={cyan}
              fillOpacity=".5"
            />
          </g>
          <path
            data-part="separating-funnel"
            d="M177 51H263V90Q289 148 232 202V225H210V202Q151 148 177 90Z"
            fill="none"
            stroke={glass}
            strokeWidth="3"
          />
          <path data-part="tap" d="M200 221H244M221 213V233" stroke="#cbd5e1" strokeWidth="6" />
          <path d="M214 227V246H228V227" fill="none" stroke={glass} strokeWidth="3" />
          <Beaker x={183} y={247} fill={stage === 2 ? 25 : 0} />
          <Beaker x={358} y={247} fill={0} />
          {stage === 2 && (
            <g data-flow="water-outlet" data-material="water">
              {arrow("M221 248V292")}
            </g>
          )}
          {key("oil", 324, 76, 251, 112)}
          {key("water", 328, 164, 248, 161)}
          {key("funnel", 312, 29, 257, 54)}
          {key("tap", 319, 221, 235, 221)}
          {key("beaker", 316, 302, 262, 294)}
          {key("stand", 41, 125, 91, 125)}
        </>
      );
      break;
    case "chromatography":
      drawing = (
        <>
          <path
            data-part="beaker"
            d="M118 57H130V305H345V57H357"
            stroke={glass}
            strokeWidth="3"
            fill="none"
          />
          <rect data-part="filter-paper" x="184" y="53" width="108" height="237" fill="#f1f5f9" />
          <path data-part="skewer" d="M113 51H361" stroke="#c4a477" strokeWidth="6" />
          <rect
            data-part="solvent"
            data-surface-y="269"
            x="132"
            y="269"
            width="211"
            height="34"
            fill={cyan}
            fillOpacity=".45"
          />
          <path
            data-part="pencil-baseline"
            data-y="252"
            d="M184 252H292"
            stroke="#64748b"
            strokeDasharray="4 3"
          />
          {stage < 2 && (
            <g data-part="original-ink-dots" fill="#334155">
              {[205, 238, 271].map((x) => (
                <circle key={x} cx={x} cy="252" r="5" />
              ))}
            </g>
          )}
          {stage === 1 && (
            <g data-flow="solvent-rises">
              <path d="M187 185H289V249H187Z" fill={cyan} opacity=".18" />
              {arrow("M307 243V147")}
            </g>
          )}
          {stage === 2 && (
            <g data-result="observation-required">
              <text x="238" y="165" textAnchor="middle" fill="#475569" fontSize="46">
                ?
              </text>
            </g>
          )}
          <path data-part="ruler" d="M75 87h20v158H75z" stroke="#e2e8f0" fill="#334155" />
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={`M77 ${100 + i * 18}h10`} stroke="#e2e8f0" />
          ))}
          <g data-part="marker-pens" stroke="#cbd5e1" strokeWidth="7">
            <path d="M378 174v90m15-90v90m15-90v90" />
          </g>
          {key("paper", 180, 22, 220, 77)}
          {key("baseline", 109, 244, 185, 252)}
          {key("dots", 306, 220, 272, 252)}
          {key("water", 373, 302, 330, 279)}
          {key("beaker", 416, 105, 345, 115)}
          {key("skewer", 365, 28, 343, 51)}
          {key("ruler", 50, 123, 76, 141)}
          {key("pens", 435, 197, 400, 198)}
        </>
      );
      break;
    case "sieving":
      drawing = (
        <>
          <path
            data-part="sieve"
            d="M106 137Q227 111 351 137L330 193Q229 216 128 193Z"
            fill="#334155"
            stroke={glass}
            strokeWidth="3"
          />
          <path d="M350 141L433 125M348 152L434 136" stroke={glass} strokeWidth="5" />
          <g stroke="#94a3b8">
            {Array.from({ length: 13 }, (_, i) => (
              <path key={i} d={`M${132 + i * 16} 146v45`} />
            ))}
            <path d="M121 155H345M126 170H340M130 185H331" />
          </g>
          <g data-material="impurities" data-retained="true" fill="#b6956a">
            <path d="M173 141l8-13 14 8-7 14zM248 135l12-7 12 11-17 11zM289 148l12-14 9 12-13 9z" />
          </g>
          <g data-material="flour" data-passes-through={stage > 0} fill="#f8fafc">
            {Array.from({ length: 30 }, (_, i) => (
              <circle
                key={i}
                cx={153 + (i % 10) * 17}
                cy={stage === 0 ? 151 + Math.floor(i / 10) * 10 : 219 + Math.floor(i / 10) * 17}
                r="2.5"
              />
            ))}
          </g>
          <path d="M115 270Q230 319 348 270" stroke={glass} strokeWidth="4" fill="none" />
          {stage > 0 && (
            <>
              {arrow("M100 209V252")}
              {arrow("M366 209V252")}
            </>
          )}
          {key("flour", 86, 290, 189, stage === 0 ? 171 : 253)}
          {key("impurities", 206, 80, 187, 139)}
          {key("sieve", 408, 210, 323, 180)}
        </>
      );
      break;
  }
  return (
    <svg
      viewBox="0 0 490 340"
      role="img"
      aria-label={`${method.name}: ${method.steps[stage]}`}
      data-mixture-diagram={method.id}
      data-stage={stage}
      className="mx-auto w-full max-w-[640px]"
    >
      <defs>
        <marker
          id={marker}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10Z" fill="context-stroke" />
        </marker>
      </defs>
      {drawing}
    </svg>
  );
}

export function PhysicalMixtureDiagram({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 480 130"
      role="img"
      aria-label={label}
      data-physical-mixture
      className="w-full"
    >
      {[0, 170, 340].map((x, i) => (
        <g key={x} transform={`translate(${x} 15)`}>
          <rect width="125" height="100" rx="15" fill="#0f172a" stroke="#475569" />
          {[0, 1, 2, 3].map((n) => (
            <g key={n}>
              {i !== 1 && (
                <circle
                  data-component="a"
                  cx={i === 2 ? 20 + n * 25 : 24 + (n % 2) * 70}
                  cy={i === 2 ? 30 : 27 + Math.floor(n / 2) * 47}
                  r="9"
                  fill={amber}
                />
              )}
              {i !== 0 && (
                <rect
                  data-component="b"
                  x={i === 2 ? 12 + n * 25 : 16 + (n % 2) * 70}
                  y={i === 2 ? 60 : 19 + Math.floor(n / 2) * 47}
                  width="17"
                  height="17"
                  fill={cyan}
                />
              )}
            </g>
          ))}
        </g>
      ))}
      <text x="148" y="72" fill="white" textAnchor="middle" fontSize="25">
        +
      </text>
      <path d="M305 65h24m-7-7 7 7-7 7" fill="none" stroke={cyan} strokeWidth="3" />
    </svg>
  );
}
