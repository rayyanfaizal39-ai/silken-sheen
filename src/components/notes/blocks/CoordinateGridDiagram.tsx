export function CoordinateGridDiagram({
  latLabel,
  lonLabel,
  pointLabel,
}: {
  latLabel: string;
  lonLabel: string;
  pointLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4">
      <div className="flex justify-center">
        <svg viewBox="0 0 360 300" className="w-full max-w-[340px]">
          <line x1="40" y1="80" x2="320" y2="80" className="stroke-border" strokeWidth="1.5" />
          <line x1="40" y1="150" x2="320" y2="150" className="stroke-amber-400" strokeWidth="2" />
          <line x1="40" y1="220" x2="320" y2="220" className="stroke-border" strokeWidth="1.5" />

          <line x1="110" y1="40" x2="110" y2="260" className="stroke-border" strokeWidth="1.5" />
          <line x1="220" y1="40" x2="220" y2="260" className="stroke-primary" strokeWidth="2" />
          <line x1="290" y1="40" x2="290" y2="260" className="stroke-border" strokeWidth="1.5" />

          <circle cx="220" cy="150" r="7" className="fill-foreground" />
          <text x="235" y="145" fontSize="13" fontWeight={700} className="fill-foreground">
            {pointLabel}
          </text>

          <text x="30" y="154" textAnchor="end" fontSize="11" fontWeight={700} className="fill-amber-400">
            ① {latLabel}
          </text>
          <text x="220" y="30" textAnchor="middle" fontSize="11" fontWeight={700} className="fill-primary">
            ② {lonLabel}
          </text>
        </svg>
      </div>
      <div className="mx-auto flex max-w-[420px] flex-col gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
        <div>
          <b className="text-amber-400">① </b>Kenal pasti garisan latitud {pointLabel} — {latLabel}
        </div>
        <div>
          <b className="text-primary">② </b>Kenal pasti garisan longitud {pointLabel} — {lonLabel}
        </div>
        <div>
          <b className="text-foreground">③ </b>Titik persilangan ialah kedudukan {pointLabel}
        </div>
      </div>
      <p className="mt-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Kedudukan titik {pointLabel} ialah{" "}
        <b className="text-foreground">
          {latLabel}, {lonLabel}
        </b>
      </p>
    </div>
  );
}
