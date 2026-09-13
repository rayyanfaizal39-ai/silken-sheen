import type { CellTypeCard } from "@/content/form1/science/chapter-2/chapter2-content";

export function SurfaceCell({
  x = 0,
  y = 0,
  plant = false,
}: {
  x?: number;
  y?: number;
  plant?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width="40"
        height="58"
        rx={plant ? 3 : 8}
        fill={plant ? "#064e3b" : "#312e81"}
        stroke={plant ? "#6ee7b7" : "#a5b4fc"}
        strokeWidth={plant ? 3 : 2}
      />
      <ellipse cx="20" cy="35" rx="7" ry="9" fill="#c4b5fd" />
    </g>
  );
}

// Only morphology lives here. All names, adaptations and functions are supplied by canonical content.
export function SpecialisedShape({ id, lang }: { id: string; lang: "bm" | "en" }) {
  switch (id) {
    case "nerve":
      return (
        <g>
          <path
            d="M65 76 Q78 99 97 110 Q77 118 67 146 Q56 123 35 115 Q52 101 65 76Z"
            fill="#5b21b6"
            stroke="#c4b5fd"
            strokeWidth="3"
          />
          <circle cx="64" cy="113" r="11" fill="#ddd6fe" />
          <g fill="none" stroke="#c4b5fd" strokeWidth="3">
            <path d="M65 77 L58 48 L35 31 M58 48 L77 26 M35 115 L17 109 L10 84 M17 109 L9 131 M66 145 L49 170 L28 176 M49 170 L58 192" />
            <path data-long-fibre d="M96 111 Q130 102 164 111 T235 111" strokeWidth="6" />
            <path d="M235 111 L255 76 L271 69 M255 76 L248 54 M235 111 L269 111 M235 111 L253 144 L270 155 M253 144 L247 169" />
          </g>
        </g>
      );
    case "epithelial":
      return (
        <g data-continuous-layer>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <SurfaceCell key={i} x={20 + i * 40} y={81} />
          ))}
          <path d="M20 144 H260" stroke="#c4b5fd" strokeWidth="4" />
        </g>
      );
    case "muscle":
      return (
        <g fill="#831843" stroke="#f9a8d4" strokeWidth="2">
          <path data-elongated-fibre d="M17 75 Q140 25 264 75 Q140 124 17 75Z" />
          <path d="M56 163 Q140 83 224 163 Q140 240 56 163Z" />
          <g strokeWidth="1" opacity="0.8">
            <path d="M45 75 H237 M65 65 Q140 49 218 66 M65 85 Q140 101 218 84 M80 155 Q140 113 202 155 M81 171 Q140 211 202 171" />
          </g>
          <path
            d="M25 144 H50 M44 137 L51 144 L44 151 M255 144 H230 M237 137 L230 144 L237 151"
            fill="none"
            stroke="#a5f3fc"
          />
        </g>
      );
    case "red-blood":
      return (
        <g data-biconcave-disc data-nucleus="absent">
          <ellipse
            data-top-view
            cx="78"
            cy="107"
            rx="58"
            ry="50"
            fill="#be123c"
            stroke="#fda4af"
            strokeWidth="3"
          />
          <ellipse
            cx="78"
            cy="107"
            rx="29"
            ry="24"
            fill="#fb7185"
            stroke="#fecdd3"
            strokeWidth="2"
          />
          <path
            data-side-view
            d="M162 108 C149 74 180 72 198 86 C211 96 228 94 242 83 C267 65 278 101 263 117 C251 132 231 111 218 112 C195 113 173 139 162 108Z"
            fill="#be123c"
            stroke="#fda4af"
            strokeWidth="3"
          />
          <g fill="#f8fafc" fontSize="15" textAnchor="middle">
            <text x="78" y="181">
              {lang === "en" ? "Top view" : "Pandangan atas"}
            </text>
            <text x="215" y="181">
              {lang === "en" ? "Side view" : "Pandangan sisi"}
            </text>
          </g>
        </g>
      );
    case "white-blood":
      return (
        <g>
          <path
            data-changing-outline
            d="M152 57 Q159 26 137 37 Q117 53 98 42 Q75 32 68 54 Q40 49 45 73 Q17 83 35 104 Q17 126 41 141 Q35 170 65 169 Q71 194 98 179 Q113 196 133 176 Q159 183 169 164 Q179 145 167 133 Q133 145 124 116 Q125 92 152 97 Q179 80 169 67 Q163 59 152 57Z"
            fill="#312e81"
            stroke="#c4b5fd"
            strokeWidth="3"
          />
          <path
            data-nucleus
            d="M82 72 Q103 70 100 93 Q78 111 95 126 Q116 131 107 151 Q66 159 60 121 Q54 88 82 72Z"
            fill="#7c3aed"
            stroke="#ddd6fe"
            strokeWidth="2"
          />
          <g fill="#fde68a">
            {[
              [174, 114],
              [215, 84],
              [230, 142],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="6" />
            ))}
          </g>
          <path
            d="M220 112 H191 M198 105 L190 112 L198 119"
            stroke="#fde68a"
            strokeWidth="2"
            fill="none"
          />
        </g>
      );
    case "reproductive":
      return (
        <g>
          <g data-sperm>
            <ellipse
              cx="56"
              cy="60"
              rx="10"
              ry="16"
              fill="#a5b4fc"
              stroke="#e0e7ff"
              strokeWidth="2"
            />
            <path d="M56 75 L55 93" stroke="#c4b5fd" strokeWidth="5" />
            <path d="M55 94 C14 119 92 146 58 191" fill="none" stroke="#c4b5fd" strokeWidth="3" />
          </g>
          <g data-ovum>
            <circle cx="197" cy="114" r="60" fill="#4c1d95" stroke="#c4b5fd" strokeWidth="4" />
            <circle cx="197" cy="114" r="51" fill="none" stroke="#a78bfa" />
            <circle cx="197" cy="114" r="15" fill="#ddd6fe" />
          </g>
          <g fill="#f8fafc" fontSize="16" textAnchor="middle">
            <text x="57" y="216">
              {lang === "en" ? "Sperm" : "Sperma"}
            </text>
            <text x="197" y="216">
              Ovum
            </text>
          </g>
        </g>
      );
    case "epidermal":
      return (
        <g data-tight-surface-layer>
          {[0, 1].flatMap((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => (
              <SurfaceCell key={`${row}-${col}`} x={20 + col * 40} y={55 + row * 58} plant />
            )),
          )}
        </g>
      );
    case "palisade":
      return (
        <g>
          <rect
            x="95"
            y="16"
            width="90"
            height="198"
            rx="16"
            fill="#064e3b"
            stroke="#6ee7b7"
            strokeWidth="4"
          />
          <rect
            x="116"
            y="46"
            width="47"
            height="145"
            rx="13"
            fill="#155e75"
            stroke="#a5f3fc"
            strokeWidth="2"
          />
          <g data-many-chloroplasts>
            {[0, 1, 2, 3, 4, 5].flatMap((i) =>
              [106, 174].map((x) => (
                <ellipse key={`${i}-${x}`} cx={x} cy={40 + i * 29} rx="6" ry="10" fill="#34d399" />
              )),
            )}
          </g>
          <path
            d="M29 37 L75 60 M66 48 L75 60 L61 62 M29 78 L75 102 M66 90 L75 102 L61 104"
            stroke="#fde68a"
            strokeWidth="3"
            fill="none"
          />
        </g>
      );
    case "guard":
      return (
        <g>
          <g data-guard-pair fill="#065f46" stroke="#6ee7b7" strokeWidth="3">
            <path d="M127 41 C53 20 42 179 116 179 Q140 177 120 153 C83 119 106 79 128 63 Q141 50 127 41Z" />
            <path d="M153 41 C227 20 238 179 164 179 Q140 177 160 153 C197 119 174 79 152 63 Q139 50 153 41Z" />
          </g>
          <ellipse
            data-stoma
            cx="140"
            cy="110"
            rx="22"
            ry="43"
            fill="#020617"
            stroke="#a5f3fc"
            strokeDasharray="3 3"
          />
          <g fill="#34d399">
            {[
              [95, 66],
              [79, 101],
              [88, 141],
              [185, 66],
              [201, 101],
              [192, 141],
            ].map(([x, y]) => (
              <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="6" ry="9" />
            ))}
          </g>
          <path d="M140 157 V192" stroke="#a5f3fc" fill="none" />
          <text x="140" y="213" textAnchor="middle" fontSize="16" fill="#f8fafc">
            Stoma
          </text>
        </g>
      );
    case "root-hair":
      return (
        <g>
          <path
            data-long-root-extension
            d="M36 51 H99 Q111 51 111 68 V87 Q139 107 238 92 Q263 91 263 104 Q261 119 237 119 Q159 115 111 125 V176 Q111 188 99 188 H36 Q23 188 23 175 V65 Q23 51 36 51Z"
            fill="#064e3b"
            stroke="#6ee7b7"
            strokeWidth="4"
          />
          <path
            d="M40 68 H94 V97 Q142 115 244 102 Q251 104 243 110 Q148 109 94 118 V170 H40Z"
            fill="none"
            stroke="#a5f3fc"
            strokeWidth="2"
          />
          <ellipse cx="56" cy="143" rx="10" ry="14" fill="#a78bfa" />
          <g fill="none" stroke="#67e8f9" strokeWidth="2">
            <path d="M183 50 V81 M177 72 L183 82 L189 72 M215 164 V131 M209 141 L215 130 L221 141" />
          </g>
        </g>
      );
    default:
      return null;
  }
}

export function Chapter2SpecialisedDiagrams({
  items,
  title,
  group,
  lang,
}: {
  items: CellTypeCard[];
  title: string;
  group: "animal" | "plant";
  lang: "bm" | "en";
}) {
  return (
    <section data-specialised-group={group} className="space-y-4">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            data-specialised-cell={item.id}
            className="min-w-0 rounded-2xl border border-cyan-300/20 bg-slate-950/40 p-4"
          >
            <h4 className="font-bold text-cyan-100">{item.name}</h4>
            <svg
              data-specialised-diagram={item.id}
              viewBox="0 0 280 230"
              role="img"
              aria-label={item.name}
              className="mx-auto my-3 w-full max-w-sm"
            >
              <title>{item.name}</title>
              <SpecialisedShape id={item.id} lang={lang} />
            </svg>
            <div className="text-center text-sm leading-6">
              <p className="font-semibold text-emerald-200">{item.adaptation}</p>
              <span aria-hidden="true" className="my-2 block text-xl text-cyan-300">
                ↓
              </span>
              <p className="text-slate-200">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
