/**
 * Simplified teaching diagram illustrating the corrected Jerteh "Contoh
 * Tafsiran" (notes.ts §2.5) — NOT a reproduction of the textbook's Peta
 * 2.2. Positions are schematic, chosen only to match the verified textbook
 * facts (tanah tinggi at barat daya, Sungai Nering, padi sawah near the
 * river/Kg. Sawah/Kg. Gelang, getah at kaki bukit/Ladang Bukit Oh, Pekan
 * Jabir as a central/berpusat cluster, Ladang Baharu as berkelompok). No
 * grid lines are drawn, so the diagram never implies a fabricated grid
 * position for "RG 6605" — that figure is cited from the text only.
 */
export function WorkedMapDiagram() {
  const w = 320;
  const h = 250;

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-3">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Gambar rajah ringkas tafsiran Peta Jerteh">
        <rect x={0} y={16} width={w} height={h - 16} rx={10} className="fill-emerald-900/15" />

        <text x={w / 2} y={9} textAnchor="middle" fontSize={7.5} fontStyle="italic" className="fill-muted-foreground">
          Gambar rajah ringkas — bukan replika tepat Peta Jerteh
        </text>

        {/* Tanah tinggi — barat daya (bottom-left), per the text */}
        <path d="M0 250 L0 170 L75 170 L55 250 Z" className="fill-amber-800/25" />
        <g className="stroke-amber-700/60" fill="none" strokeWidth={1}>
          <path d="M10 240 Q35 210 15 180" />
          <path d="M28 245 Q52 215 32 185" />
        </g>
        <text x={10} y={230} fontSize={8.5} fontWeight={700} className="fill-amber-200">Tanah tinggi</text>

        {/* Sungai Nering */}
        <path d="M20 180 Q60 160 90 130 T190 90 T296 58" className="stroke-sky-400" fill="none" strokeWidth={2.5} strokeLinecap="round" />
        <text x={150} y={82} textAnchor="middle" fontSize={8.5} fontWeight={700} className="fill-sky-300">Sungai Nering</text>

        {/* Padi sawah — lowland near the river, Kg. Sawah / Kg. Gelang */}
        <g className="stroke-amber-500" strokeWidth={1} strokeDasharray="3 2">
          <line x1={108} y1={115} x2={145} y2={115} />
          <line x1={108} y1={124} x2={145} y2={124} />
          <line x1={205} y1={76} x2={242} y2={76} />
          <line x1={205} y1={85} x2={242} y2={85} />
        </g>
        <text x={126} y={140} textAnchor="middle" fontSize={8} fontWeight={700} className="fill-amber-300">Kg. Sawah</text>
        <text x={223} y={68} textAnchor="middle" fontSize={8} fontWeight={700} className="fill-amber-300">Kg. Gelang</text>
        <text x={126} y={148} textAnchor="middle" fontSize={7.5} className="fill-amber-300/80">(padi sawah)</text>

        {/* Ladang Bukit Oh — getah, kaki bukit */}
        <g className="stroke-emerald-500" strokeWidth={1.2} strokeLinecap="round">
          <line x1={60} y1={160} x2={60} y2={148} />
          <path d="M60 148 Q55 142 60 136 Q65 142 60 148 Z" className="fill-emerald-500/50" />
          <line x1={75} y1={165} x2={75} y2={153} />
          <path d="M75 153 Q70 147 75 141 Q80 147 75 153 Z" className="fill-emerald-500/50" />
        </g>
        <text x={10} y={128} fontSize={8} fontWeight={700} className="fill-emerald-300">Ladang Bukit Oh</text>
        <text x={10} y={138} fontSize={7.5} className="fill-emerald-300/80">(getah, kaki bukit)</text>

        {/* Jalan raya through Pekan Jabir */}
        <path d="M65 250 Q130 190 170 150 T272 108" className="stroke-red-500" fill="none" strokeWidth={2} strokeLinecap="round" />

        {/* Pekan Jabir — pola petempatan berpusat */}
        <g className="fill-foreground">
          {[[158, 148], [166, 142], [170, 152], [162, 156], [176, 146]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width={5} height={5} />
          ))}
        </g>
        <text x={158} y={172} textAnchor="middle" fontSize={8} fontWeight={700} className="fill-foreground">Pekan Jabir</text>
        <text x={158} y={181} textAnchor="middle" fontSize={7.5} className="fill-foreground/70">(pola berpusat)</text>

        {/* Ladang Baharu — petempatan berkelompok */}
        <g className="fill-foreground">
          {[[236, 128], [244, 126], [240, 134]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width={5} height={5} />
          ))}
        </g>
        <text x={272} y={120} textAnchor="middle" fontSize={8} fontWeight={700} className="fill-foreground">Ladang Baharu</text>
        <text x={272} y={129} textAnchor="middle" fontSize={7.5} className="fill-foreground/70">(berkelompok)</text>

        {/* Petempatan berjajar — labelled from the text's grid citation only, no grid drawn */}
        <g className="fill-foreground">
          {[262, 272, 282].map((x, i) => (
            <rect key={i} x={x} y={200} width={5} height={5} />
          ))}
        </g>
        <text x={272} y={195} textAnchor="middle" fontSize={8} fontWeight={700} className="fill-foreground">Berjajar</text>
        <text x={272} y={219} textAnchor="middle" fontSize={7.5} className="fill-foreground/70">(RG 6605, daripada teks)</text>
      </svg>
    </div>
  );
}
