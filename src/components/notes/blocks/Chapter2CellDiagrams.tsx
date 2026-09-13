import type { ReactNode } from "react";
import type { CellStructure } from "@/content/form1/science/chapter-2/chapter2-content";

// Geometry only. Names, functions and cell membership come from the live canonical content.
const animalOutline =
  "M65 55 C105 23 167 41 207 30 C270 17 316 70 310 132 C329 192 285 253 223 256 C180 283 115 254 76 244 C22 225 21 171 34 135 C14 96 35 65 65 55Z";

function Mitochondrion({ x, y, angle = 0 }: { x: number; y: number; angle?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <ellipse rx="23" ry="11" fill="#78350f" stroke="#fcd34d" strokeWidth="2" />
      <path d="M-16 0 Q-12-9-8 0 T0 0 T8 0 T16 0" fill="none" stroke="#fde68a" strokeWidth="2" />
    </g>
  );
}

function structureShape(id: string, plant: boolean): ReactNode {
  switch (id) {
    case "cell-wall":
      return (
        <rect
          x="24"
          y="24"
          width="292"
          height="252"
          rx="24"
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="12"
        />
      );
    case "cytoplasm":
      return plant ? (
        <rect x="34" y="34" width="272" height="232" rx="16" fill="#164e63" />
      ) : (
        <path d={animalOutline} fill="#164e63" />
      );
    case "cell-membrane":
      return plant ? (
        <rect
          x="34"
          y="34"
          width="272"
          height="232"
          rx="16"
          fill="none"
          stroke="#67e8f9"
          strokeWidth="3"
        />
      ) : (
        <path d={animalOutline} fill="none" stroke="#67e8f9" strokeWidth="4" />
      );
    case "vacuole":
      return (
        <rect
          x="107"
          y="79"
          width="153"
          height="148"
          rx="30"
          fill="#0e7490"
          stroke="#a5f3fc"
          strokeWidth="3"
        />
      );
    case "nucleus":
      return (
        <g>
          <ellipse
            cx={plant ? 70 : 158}
            cy={plant ? 148 : 140}
            rx="27"
            ry="32"
            fill="#5b21b6"
            stroke="#c4b5fd"
            strokeWidth="3"
          />
          <circle cx={plant ? 75 : 163} cy={plant ? 143 : 135} r="8" fill="#ddd6fe" />
        </g>
      );
    case "mitochondria":
      return plant ? (
        <>
          <Mitochondrion x={172} y={54} />
          <Mitochondrion x={195} y={249} />
        </>
      ) : (
        <>
          <Mitochondrion x={90} y={91} angle={-25} />
          <Mitochondrion x={238} y={184} angle={35} />
          <Mitochondrion x={115} y={218} angle={-15} />
        </>
      );
    case "chloroplast":
      return (
        <>
          {[
            [67, 64, -20],
            [284, 108, 80],
            [283, 202, 90],
            [73, 228, 30],
          ].map(([x, y, angle]) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${angle})`}>
              <ellipse rx="22" ry="12" fill="#065f46" stroke="#6ee7b7" strokeWidth="2" />
              <path
                d="M-12-6 V6 M-5-6 V6 M2-6 V6 M9-6 V6 M-14 0 H14"
                stroke="#6ee7b7"
                strokeWidth="2"
              />
            </g>
          ))}
        </>
      );
    default:
      return null;
  }
}

// Anchor coordinates for numbered leaders, not another organelle content dataset.
const anchors: Record<string, { animal?: number[]; plant: number[] }> = {
  "cell-wall": { plant: [24, 25, 9, 9] },
  "cell-membrane": { animal: [298, 74, 327, 48], plant: [305, 36, 329, 10] },
  cytoplasm: { animal: [220, 103, 262, 72], plant: [99, 239, 114, 287] },
  nucleus: { animal: [140, 130, 95, 151], plant: [69, 149, 12, 149] },
  mitochondria: { animal: [238, 184, 290, 218], plant: [173, 54, 173, 10] },
  chloroplast: { plant: [285, 108, 328, 108] },
  vacuole: { plant: [190, 151, 190, 151] },
};

export function Chapter2CellDiagrams({
  structures,
  selectedId,
  animalLabel,
  plantLabel,
  lang,
}: {
  structures: CellStructure[];
  selectedId: string;
  animalLabel: string;
  plantLabel: string;
  lang: "bm" | "en";
}) {
  return (
    <div data-cell-comparison className="mt-5 grid gap-6 lg:grid-cols-2">
      {([false, true] as const).map((plant) => {
        const label = plant ? plantLabel : animalLabel;
        const present = structures.filter((s) => (plant ? s.inPlant : s.inAnimal));
        return (
          <figure key={label} className="min-w-0">
            <figcaption className="text-center text-lg font-bold text-white">{label}</figcaption>
            <p className="mt-1 text-center text-sm text-slate-300">
              {lang === "en" ? "Textbook schematic cell" : "Rajah skema sel buku teks"}
            </p>
            <svg
              data-cell-diagram={plant ? "plant" : "animal"}
              viewBox="-8 -8 360 316"
              role="img"
              aria-label={label}
              className="mx-auto mt-3 w-full max-w-lg"
            >
              <title>{label}</title>
              {[
                "cytoplasm",
                "cell-wall",
                "cell-membrane",
                "vacuole",
                "nucleus",
                "mitochondria",
                "chloroplast",
              ].map(
                (id) =>
                  present.some((s) => s.id === id) && (
                    <g
                      key={id}
                      data-cell-structure={id}
                      data-highlighted={id === selectedId}
                      opacity={id === selectedId ? 1 : 0.6}
                      className="transition-opacity duration-200 motion-reduce:transition-none"
                    >
                      {structureShape(id, plant)}
                    </g>
                  ),
              )}
              {present.map((s) => {
                const a = plant ? anchors[s.id]?.plant : anchors[s.id]?.animal;
                if (!a) return null;
                const [x, y, lx, ly] = a;
                return (
                  <g key={s.id} data-structure-label={s.id}>
                    <path d={`M${x} ${y} L${lx} ${ly}`} stroke="#e2e8f0" fill="none" />
                    <circle
                      cx={lx}
                      cy={ly}
                      r="11"
                      fill={s.id === selectedId ? "#cffafe" : "#0f172a"}
                      stroke="#a5f3fc"
                      strokeWidth={s.id === selectedId ? 3 : 1}
                    />
                    <text
                      x={lx}
                      y={ly + 4}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="700"
                      fill={s.id === selectedId ? "#0f172a" : "#f8fafc"}
                    >
                      {structures.indexOf(s) + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
            <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {present.map((s) => (
                <li
                  key={s.id}
                  value={structures.indexOf(s) + 1}
                  className={`flex items-start gap-2 ${s.id === selectedId ? "font-bold text-cyan-100" : "text-slate-300"}`}
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-200/50">
                    {structures.indexOf(s) + 1}
                  </span>
                  <span>
                    {s.name}
                    {s.id === "vacuole" && (
                      <span className="block text-sm font-normal">
                        {lang === "en" ? "Large permanent vacuole" : "Vakuol kekal yang besar"}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </figure>
        );
      })}
    </div>
  );
}
