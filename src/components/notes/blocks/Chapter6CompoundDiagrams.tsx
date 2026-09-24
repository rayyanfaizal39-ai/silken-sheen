import type { ReactNode } from "react";
import type { Chapter6Content } from "@/content/form1/science/chapter-6/chapter6-content";

type Compounds = Chapter6Content["compounds"];
const cyan = "#67e8f9",
  amber = "#fbbf24",
  purple = "#c4b5fd",
  metal = "#cbd5e1";

function Frame({
  label,
  kind,
  children,
  box = "0 0 480 300",
}: {
  label: string;
  kind: string;
  children: ReactNode;
  box?: string;
}) {
  return (
    <svg
      viewBox={box}
      role="img"
      aria-label={label}
      data-compound-diagram={kind}
      className="mx-auto w-full max-w-[640px]"
    >
      {children}
    </svg>
  );
}
function Arrow({ x, y, width = 55 }: { x: number; y: number; width?: number }) {
  return (
    <path d={`M${x} ${y}h${width}m-10-8 10 8-10 8`} stroke={cyan} strokeWidth="3" fill="none" />
  );
}
function Badge({ n, x, y, tx, ty }: { n: number; x: number; y: number; tx: number; ty: number }) {
  return (
    <g>
      <path d={`M${x} ${y}L${tx} ${ty}`} stroke="#64748b" />
      <circle cx={x} cy={y} r="12" fill="#0f172a" stroke={cyan} />
      <text x={x} y={y + 5} fill="white" fontSize="15" textAnchor="middle">
        {n}
      </text>
    </g>
  );
}

/** Same distinguishable iron rectangles and sulphur circles as the locked mixture visual. */
export function IronSulphurModel({ compound = false }: { compound?: boolean }) {
  return (
    <g data-particle-model={compound ? "iron-sulphide" : "iron-sulphur-mixture"}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 30 + (i % 3) * 51,
          y = 28 + Math.floor(i / 3) * 49;
        return compound ? (
          <g key={i} data-new-substance transform={`translate(${x} ${y})`}>
            <rect
              x="-13"
              y="-10"
              width="35"
              height="24"
              rx="8"
              fill={purple}
              fillOpacity=".2"
              stroke={purple}
            />
            <path d="M-5 2h19" stroke={purple} strokeWidth="4" />
            <rect x="-9" y="-3" width="10" height="10" fill={purple} />
            <circle cx="13" cy="2" r="6" fill={purple} />
          </g>
        ) : (
          <g key={i}>
            <rect data-material="iron" x={x - 12} y={y - 6} width="11" height="9" fill={metal} />
            <circle data-material="sulphur" cx={x + 13} cy={y + 11} r="6" fill={amber} />
          </g>
        );
      })}
    </g>
  );
}

export function CompoundFormationDiagram({ source }: { source: Compounds }) {
  return (
    <Frame
      label={`${source.labels.before}: ${source.formations[5].reactants}; ${source.labels.heat}; ${source.labels.after}: ${source.formations[5].product}`}
      kind="formation"
      box="0 0 480 135"
    >
      <rect x="5" y="10" width="175" height="114" rx="12" fill="#0f172a" stroke="#475569" />
      <g transform="translate(8 16)">
        <IronSulphurModel />
      </g>
      <Arrow x={195} y={67} width={77} />
      <path data-heat d="M232 41Q215 27 233 8Q252 32 240 41Z" fill={amber} />
      <rect x="294" y="10" width="175" height="114" rx="12" fill="#0f172a" stroke={purple} />
      <g transform="translate(297 16)">
        <IronSulphurModel compound />
      </g>
    </Frame>
  );
}

export function EverydayCompoundObject({ id, label }: { id: string; label: string }) {
  return (
    <Frame label={label} kind={`everyday-${id}`} box="0 0 180 95">
      {id === "blocks" && (
        <g stroke={cyan} strokeWidth="2" fill="#155e75">
          <path d="M24 45L86 26L153 43V78L91 94L24 76Z" />
          <path d="M24 45L91 64L153 43M91 64V94" fill="none" />
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={58 + i * 27} cy={44 - i * 4} rx="12" ry="5" fill="#22d3ee" />
          ))}
        </g>
      )}
      {id === "water" && (
        <g>
          <path d="M53 12L61 84Q90 93 119 84L127 12" stroke="#bae6fd" fill="none" strokeWidth="3" />
          <path d="M59 38Q90 48 121 38L117 82Q90 89 63 82Z" fill={cyan} fillOpacity=".45" />
          <ellipse cx="90" cy="12" rx="37" ry="6" fill="none" stroke="#bae6fd" />
        </g>
      )}
      {id === "tiles" && (
        <g fill="#cbd5e1" stroke="#64748b" strokeWidth="2">
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${30 + (i % 2) * 59} ${8 + Math.floor(i / 2) * 42})`}>
              <rect width="55" height="38" rx="2" />
              <path d="M2 28Q20 12 49 9M18 37L31 23" fill="none" stroke="#94a3b8" />
            </g>
          ))}
        </g>
      )}
    </Frame>
  );
}

function Crucible({ compound = false, lid = false }: { compound?: boolean; lid?: boolean }) {
  return (
    <g>
      <path d="M0 0H74L62 46Q37 57 12 46Z" fill="#334155" stroke={metal} strokeWidth="3" />
      <ellipse
        data-content={compound ? "compound" : "mixture"}
        cx="37"
        cy="3"
        rx="34"
        ry="9"
        fill={compound ? purple : "#475569"}
      />
      {!compound && (
        <g>
          <circle cx="20" cy="3" r="4" fill={amber} />
          <rect x="30" y="-2" width="7" height="6" fill={metal} />
          <circle cx="45" cy="4" r="4" fill={amber} />
          <rect x="52" y="-1" width="6" height="6" fill={metal} />
        </g>
      )}
      {lid && (
        <g data-part="lid">
          <path d="M-2-5Q37-27 76-5" stroke={metal} strokeWidth="4" fill="#1e293b" />
          <path d="M32-20q5-10 10 0" fill="none" stroke={metal} strokeWidth="3" />
        </g>
      )}
    </g>
  );
}

export function CompoundActivityDiagram({ source, stage }: { source: Compounds; stage: number }) {
  return (
    <Frame
      label={`${source.activity611.title}: ${source.activity611.steps[stage]}`}
      kind="activity611"
    >
      <g data-apparatus="tripod" stroke="#94a3b8" fill="none" strokeWidth="5">
        <path d="M91 154H213M106 156L74 274M198 156L230 274M155 160V249" />
      </g>
      <path
        data-apparatus="pipeclay-triangle"
        d="M104 151L154 138L202 151Z"
        stroke="#c4a477"
        strokeWidth="7"
        fill="none"
      />
      {(stage === 0 || stage === 2) && (
        <g data-apparatus="crucible-with-lid" transform="translate(117 100)">
          <Crucible lid />
        </g>
      )}
      <g data-apparatus="bunsen-burner">
        <path d="M134 273h43m-30-1v-44h17v44" fill="#334155" stroke={metal} strokeWidth="4" />
        {stage === 2 && (
          <path data-active-heat d="M150 226Q132 209 157 170Q181 208 161 226Z" fill={amber} />
        )}
      </g>
      <g data-apparatus="weighing-balance">
        <path d="M304 230H454L463 268H295Z" fill="#1e293b" stroke={metal} strokeWidth="3" />
        <path d="M373 230V210M316 210H438" stroke={metal} strokeWidth="5" />
        <rect x="329" y="239" width="99" height="20" rx="3" fill="#083344" stroke={cyan} />
        <path d="M357 249h44" stroke={cyan} strokeWidth="2" />
        {(stage === 1 || stage === 3) && (
          <g data-apparatus="crucible-with-lid" transform="translate(340 156)">
            <Crucible compound={stage === 3} lid />
          </g>
        )}
      </g>
      <Badge n={1} x={81} y={48} tx={153} ty={83} />
      <Badge n={2} x={255} y={83} tx={188} ty={122} />
      <Badge n={3} x={260} y={160} tx={198} ty={152} />
      <Badge n={4} x={47} y={213} tx={91} ty={209} />
      <Badge n={5} x={260} y={248} tx={166} ty={250} />
      <Badge n={6} x={393} y={112} tx={390} ty={239} />
    </Frame>
  );
}

export function CompoundMassDiagram({ source }: { source: Compounds }) {
  return (
    <Frame label={source.massConservationNote} kind="conserved-mass" box="0 0 480 260">
      <path d="M200 247h80L240 163Z" fill="#334155" stroke={metal} strokeWidth="3" />
      <path data-balanced-beam d="M83 118H397" stroke={cyan} strokeWidth="5" />
      <circle cx="240" cy="118" r="9" fill={cyan} />
      <path d="M240 129V231" stroke={metal} strokeWidth="5" />
      {[86, 322].map((x, i) => (
        <g
          key={x}
          data-mass-position={i === 0 ? "before" : "after"}
          transform={`translate(${x} 0)`}
        >
          <path d="M32 118L-12 201H77Z" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <g transform="translate(-4 148)">
            <Crucible compound={i === 1} />
          </g>
          <path d="M-20 201Q32 234 83 201" fill="none" stroke={metal} strokeWidth="4" />
        </g>
      ))}
      <g data-equal-mass stroke={amber} strokeWidth="5">
        <path d="M215 65h50M215 80h50" />
      </g>
    </Frame>
  );
}

export function ElectrolysisDiagram({
  source,
  selected,
}: {
  source: Compounds;
  selected: "anode" | "cathode";
}) {
  const e = source.electrolysis;
  return (
    <Frame
      label={`${source.labels.electrolysis}: ${e.products.map((p) => `${p.electrode} → ${p.gas}`).join("; ")}`}
      kind="electrolysis"
      box="0 0 480 350"
    >
      <path
        data-part="water-acid-container"
        d="M100 77V249H380V77"
        fill="none"
        stroke="#bae6fd"
        strokeWidth="3"
      />
      <path
        data-part="water-sulphuric-acid"
        d="M103 126H377V246H103Z"
        fill={cyan}
        fillOpacity=".16"
      />
      {[170, 310].map((x, i) => {
        const id = i === 0 ? "anode" : "cathode";
        return (
          <g
            key={id}
            data-electrode={id}
            data-highlighted={selected === id}
            opacity={selected === id ? 1 : 0.5}
          >
            <path
              data-collection-tube={id}
              d={`M${x - 22} 222V44Q${x} 16 ${x + 22} 44V222`}
              fill="#164e63"
              fillOpacity=".2"
              stroke="#bae6fd"
              strokeWidth="3"
            />
            <path
              data-electrode-rod
              d={`M${x} 172V258`}
              stroke={i === 0 ? purple : amber}
              strokeWidth="10"
            />
            <g
              data-gas-collection={id}
              fill="none"
              stroke={i === 0 ? purple : amber}
              strokeWidth="2"
            >
              {[0, 1, 2].map((n) => (
                <circle key={n} cx={x + (n % 2 ? 6 : -5)} cy={72 + n * 28} r="5" />
              ))}
            </g>
            <path
              d={`M${x + 31} 139V61m-6 8 6-8 6 8`}
              fill="none"
              stroke={i === 0 ? purple : amber}
              strokeWidth="2"
            />
          </g>
        );
      })}
      <path
        data-circuit="anode-positive"
        d="M170 258V310H239"
        fill="none"
        stroke={metal}
        strokeWidth="3"
      />
      <path
        data-circuit="cathode-negative"
        d="M310 258V310H280"
        fill="none"
        stroke={metal}
        strokeWidth="3"
      />
      <g data-part="dry-cells" stroke={metal} strokeWidth="3">
        <path d="M240 292V328M250 300V320M250 310H270M270 292V328M280 300V320" />
      </g>
      <text x="231" y="285" textAnchor="middle" fill={purple} fontSize="20">
        +
      </text>
      <text x="290" y="285" textAnchor="middle" fill={amber} fontSize="20">
        −
      </text>
      <g data-part="ammeter">
        <circle cx="310" cy="279" r="15" fill="#0f172a" stroke={cyan} strokeWidth="2" />
        <text x="310" y="285" textAnchor="middle" fill="white" fontSize="17">
          A
        </text>
      </g>
      <Badge n={1} x={116} y={27} tx={157} ty={58} />
      <Badge n={2} x={360} y={27} tx={322} ty={58} />
      <Badge n={3} x={418} y={147} tx={357} ty={169} />
      <Badge n={4} x={410} y={266} tx={326} ty={279} />
      <Badge n={5} x={102} y={324} tx={244} ty={313} />
    </Frame>
  );
}

export function ChangeComparisonDiagram({
  source,
  chemical,
}: {
  source: Compounds;
  chemical: boolean;
}) {
  return (
    <Frame
      label={chemical ? source.labels.chemical : source.labels.physical}
      kind={chemical ? "chemical-change" : "physical-change"}
      box="0 0 400 145"
    >
      {chemical ? (
        <>
          <g transform="translate(0 20) scale(.85)">
            <IronSulphurModel />
          </g>
          <Arrow x={155} y={70} width={55} />
          <g transform="translate(237 20) scale(.85)">
            <IronSulphurModel compound />
          </g>
        </>
      ) : (
        <>
          <path d="M17 35L70 16L129 37V108L75 127L17 106Z" stroke={cyan} fill="#164e63" />
          <path d="M17 35L75 57L129 37M75 57V127" fill="none" stroke={cyan} />
          <Arrow x={154} y={70} width={62} />
          <path
            d="M245 115Q254 70 294 88Q325 60 371 99Q399 137 287 132Q257 134 245 115Z"
            fill={cyan}
            fillOpacity=".35"
            stroke={cyan}
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} fill={cyan}>
              <circle
                data-same-material="before"
                cx={39 + (i % 3) * 24}
                cy={66 + Math.floor(i / 3) * 30}
                r="4"
              />
              <circle
                data-same-material="after"
                cx={270 + (i % 3) * 35}
                cy={105 + Math.floor(i / 3) * 17}
                r="4"
              />
            </g>
          ))}
        </>
      )}
    </Frame>
  );
}
