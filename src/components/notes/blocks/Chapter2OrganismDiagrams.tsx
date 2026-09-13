import type { Chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";

// Shape geometry keyed by canonical IDs. No organism names, grouping or notes are stored here.
export function OrganismShape({ id }: { id: string }) {
  switch (id) {
    case "amoeba":
      return (
        <g>
          <path
            data-pseudopodia
            d="M69 84 C46 70 20 82 28 101 C34 118 72 110 67 132 C60 155 30 161 43 178 C58 195 87 152 104 163 C124 175 112 206 133 207 C155 205 134 166 158 158 C182 149 202 184 216 168 C235 145 185 139 195 120 C207 104 243 110 241 89 C237 67 197 103 186 82 C173 60 205 29 183 23 C158 18 163 64 145 66 C122 68 117 30 97 39 C75 47 98 81 69 84Z"
            fill="#164e63"
            stroke="#67e8f9"
            strokeWidth="3"
          />
          <ellipse
            cx="130"
            cy="120"
            rx="21"
            ry="24"
            fill="#6d28d9"
            stroke="#c4b5fd"
            strokeWidth="2"
          />
        </g>
      );
    case "paramecium": {
      const boundary = Array.from({ length: 48 }, (_, i) => {
        const a = (i * Math.PI) / 24;
        return {
          a,
          x: 140 + 88 * Math.cos(a) - 18 * Math.exp(-Math.pow((a - 0.7) / 0.3, 2)),
          y: 115 + 58 * Math.sin(a),
        };
      });
      return (
        <g transform="rotate(-23 140 115)">
          <path
            d={`${boundary.map(({ x, y }, i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")}Z`}
            fill="#164e63"
            stroke="#67e8f9"
            strokeWidth="3"
          />
          <g data-cilia stroke="#a5f3fc" strokeWidth="2">
            {boundary.map(({ a, x, y }, i) => {
              return <path key={i} d={`M${x} ${y} l${12 * Math.cos(a)} ${12 * Math.sin(a)}`} />;
            })}
          </g>
          <path d="M179 114 Q166 122 159 141" fill="none" stroke="#a5f3fc" strokeWidth="2" />
          <ellipse
            cx="122"
            cy="103"
            rx="23"
            ry="14"
            fill="#6d28d9"
            stroke="#c4b5fd"
            strokeWidth="2"
          />
        </g>
      );
    }
    case "chlamydomonas":
      return (
        <g>
          <path
            data-flagella
            d="M127 84 C126 56 89 49 104 17 M149 84 C150 57 185 51 172 17"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="3"
          />
          <ellipse
            cx="138"
            cy="141"
            rx="57"
            ry="64"
            fill="#064e3b"
            stroke="#6ee7b7"
            strokeWidth="3"
          />
          <path
            d="M99 122 Q89 184 136 189 Q182 188 177 122 L162 137 Q164 167 136 169 Q111 166 113 137Z"
            fill="#34d399"
            opacity="0.6"
          />
          <circle cx="137" cy="137" r="13" fill="#6d28d9" stroke="#c4b5fd" strokeWidth="2" />
        </g>
      );
    case "euglena":
      return (
        <g>
          <path
            data-flagellum
            d="M178 56 Q208 51 200 30 Q195 12 224 14"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="3"
          />
          <path
            d="M178 56 C198 102 158 180 69 209 C68 155 109 71 178 56Z"
            fill="#064e3b"
            stroke="#6ee7b7"
            strokeWidth="3"
          />
          {[
            [155, 91],
            [135, 111],
            [157, 123],
            [111, 147],
            [129, 158],
            [92, 175],
          ].map(([x, y]) => (
            <ellipse
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              rx="7"
              ry="13"
              transform={`rotate(32 ${x} ${y})`}
              fill="#34d399"
            />
          ))}
          <ellipse
            cx="133"
            cy="133"
            rx="12"
            ry="15"
            fill="#6d28d9"
            stroke="#c4b5fd"
            strokeWidth="2"
          />
        </g>
      );
    case "mucor":
      return (
        <g>
          <g data-hyphae fill="none" stroke="#fde68a" strokeWidth="4" strokeLinecap="round">
            <path d="M24 186 Q81 164 127 185 T252 177 M52 178 L34 151 M79 177 L65 211 M104 180 L114 211 M159 186 L180 213 M217 184 L239 207 M114 181 Q67 137 73 80 M115 181 Q151 126 139 44 M186 184 Q203 139 218 91" />
            <path
              d="M33 152 L19 148 M64 211 L48 218 M180 212 L196 216 M237 207 L247 206"
              strokeWidth="2"
            />
          </g>
          <g data-sporangia fill="#78350f" stroke="#fde68a" strokeWidth="2">
            {[
              [73, 65],
              [139, 30],
              [220, 76],
            ].map(([x, y]) => (
              <g key={x}>
                <circle cx={x} cy={y} r="18" />
                {[
                  [-7, 0],
                  [3, -7],
                  [6, 5],
                  [-3, 9],
                ].map(([dx, dy]) => (
                  <circle key={`${dx}-${dy}`} cx={x + dx} cy={y + dy} r="2" fill="#fde68a" />
                ))}
              </g>
            ))}
          </g>
        </g>
      );
    case "spirogyra":
      return (
        <g transform="rotate(-18 140 115)">
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} data-filament-cell={i} transform={`translate(${19 + i * 48} 77)`}>
              <rect width="48" height="79" fill="#064e3b" stroke="#6ee7b7" strokeWidth="2" />
              <path d="M0 8 C48 8 0 70 48 70" fill="none" stroke="#34d399" strokeWidth="7" />
              <path
                d="M0 65 Q24 65 24 38 T48 13"
                fill="none"
                stroke="#6ee7b7"
                strokeWidth="3"
                strokeDasharray="4 3"
              />
            </g>
          ))}
        </g>
      );
    case "hydra":
      return (
        <g>
          <path
            data-tentacles
            d="M124 72 C74 75 78 31 40 35 M127 69 C94 52 119 24 83 15 M135 66 Q125 33 138 12 M145 65 Q169 46 173 18 M151 73 C194 82 195 31 230 41 M151 79 Q208 104 238 77"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M121 74 Q102 112 122 161 L123 192 Q112 197 112 204 Q137 214 162 204 Q160 197 148 192 L150 150 Q170 105 152 74Z"
            fill="#064e3b"
            stroke="#6ee7b7"
            strokeWidth="3"
          />
          <g data-body-cells stroke="#34d399" fill="none" strokeWidth="1.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                d={`M${i < 3 ? 120 : 126} ${84 + i * 18} Q135 ${94 + i * 18} ${i < 3 ? 153 : 146} ${84 + i * 18} M${i % 2 ? 132 : 139} ${84 + i * 18} l1 17`}
              />
            ))}
          </g>
        </g>
      );
    default:
      return null;
  }
}

export function Chapter2OrganismDiagrams({
  content,
  lang,
  unicellularTitle,
  multicellularTitle,
}: {
  content: Chapter2Content;
  lang: "bm" | "en";
  unicellularTitle: string;
  multicellularTitle: string;
}) {
  const en = lang === "en";
  return (
    <div data-organism-comparison className="space-y-6">
      {(["unicellular", "multicellular"] as const).map((group) => (
        <section
          key={group}
          data-organism-group={group}
          className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 p-4 sm:p-6"
        >
          <h3 className="text-lg font-bold text-white">
            {group === "unicellular" ? unicellularTitle : multicellularTitle}
          </h3>
          <p className="mt-2 text-sm leading-6 text-cyan-100">
            {group === "unicellular"
              ? en
                ? "ONE CELL → the same cell performs all life processes"
                : "SATU SEL → sel yang sama menjalankan semua proses hidup"
              : en
                ? "MANY CELLS → different cells can become specialised"
                : "BANYAK SEL → sel yang berlainan boleh menjadi khusus"}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {content.unicellularMulticellular[group].map((item) => (
              <details
                key={item.id}
                data-organism={item.id}
                className="group min-w-0 rounded-xl border border-white/15 bg-white/[0.025] open:border-cyan-200/60"
              >
                <summary className="cursor-pointer list-none rounded-xl p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">
                  <svg
                    data-organism-diagram={item.id}
                    viewBox="0 0 280 230"
                    role="img"
                    aria-label={item.name}
                    className="mx-auto w-full max-w-sm"
                  >
                    <title>{item.name}</title>
                    <OrganismShape id={item.id} />
                  </svg>
                  <span className="mt-2 flex min-h-11 items-center justify-between gap-3 font-bold text-white">
                    {item.name}
                    <span aria-hidden="true" className="text-cyan-200 group-open:rotate-180">
                      ⌄
                    </span>
                  </span>
                </summary>
                <div className="space-y-2 border-t border-white/10 p-3 text-sm leading-6">
                  <p className="font-semibold text-cyan-100">{item.recognitionClue}</p>
                  <p className="text-emerald-200">
                    {group === "unicellular" ? unicellularTitle : multicellularTitle}
                  </p>
                  <p className="text-slate-200">{item.note}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
