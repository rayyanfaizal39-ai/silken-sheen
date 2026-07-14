export interface SunMethodDiagramStep {
  step: number;
  instruction: string;
}

export function SunMethodDiagram({
  whyItWorks,
  steps,
  nightMethod,
}: {
  whyItWorks: string;
  steps: SunMethodDiagramStep[];
  nightMethod: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5">
      <div className="flex justify-center">
        <svg viewBox="0 0 420 300" className="w-full max-w-[420px]">
          <text x="210" y="20" textAnchor="middle" fontSize="13" fontWeight={700} className="fill-foreground">
            Utara
          </text>
          <text x="210" y="288" textAnchor="middle" fontSize="13" fontWeight={700} className="fill-foreground">
            Selatan
          </text>
          <line x1="210" y1="32" x2="210" y2="270" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="40" y1="150" x2="380" y2="150" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />

          <circle cx="345" cy="150" r="24" className="fill-amber-400" />
          <text x="345" y="112" textAnchor="middle" fontSize="11" fontWeight={700} className="fill-amber-400">
            Matahari terbit
          </text>
          <text x="345" y="196" textAnchor="middle" fontSize="10.5" className="fill-muted-foreground">
            (Timur)
          </text>

          <circle cx="135" cy="150" r="14" className="fill-foreground" opacity="0.85" />
          <line x1="121" y1="150" x2="88" y2="150" className="stroke-red-400" strokeWidth="7" strokeLinecap="round" />
          <line x1="106" y1="150" x2="106" y2="88" className="stroke-red-400" strokeWidth="6" strokeLinecap="round" />
          <circle cx="106" cy="84" r="7" className="fill-foreground" opacity="0.85" />
          <line x1="106" y1="150" x2="106" y2="212" className="stroke-red-400" strokeWidth="6" strokeLinecap="round" />
          <circle cx="106" cy="216" r="7" className="fill-foreground" opacity="0.85" />
          <line x1="88" y1="150" x2="70" y2="133" className="stroke-primary" strokeWidth="6" strokeLinecap="round" />
          <line x1="88" y1="150" x2="70" y2="167" className="stroke-primary" strokeWidth="6" strokeLinecap="round" />

          <text x="106" y="70" textAnchor="middle" fontSize="11" fontWeight={700} className="fill-emerald-400">
            Tangan kiri → Utara
          </text>
          <text x="106" y="240" textAnchor="middle" fontSize="11" fontWeight={700} className="fill-red-400">
            Tangan kanan → Selatan
          </text>
          <text x="106" y="264" textAnchor="middle" fontSize="10" className="fill-muted-foreground">
            Anda, menghadap Timur
          </text>
        </svg>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {steps.map((s) => (
          <div key={s.step} className="flex gap-3 rounded-xl border border-border bg-background/60 p-3">
            <span className="font-display flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white">
              {s.step}
            </span>
            <span className="text-[12.5px] leading-relaxed text-muted-foreground">{s.instruction}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Kenapa ia berfungsi: </span>
        {whyItWorks}
      </p>
      <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Waktu malam: </span>
        {nightMethod}
      </p>
    </div>
  );
}
