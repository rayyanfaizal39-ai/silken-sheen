type Lang = "en" | "bm";

function Dartboard({ dots, dotClassName }: { dots: [number, number][]; dotClassName: string }) {
  return (
    <svg width="120" height="120" viewBox="0 0 140 140" className="mx-auto">
      <circle cx="70" cy="70" r="60" fill="none" className="stroke-accent" strokeWidth="2" opacity="0.3" />
      <circle cx="70" cy="70" r="40" fill="none" className="stroke-accent" strokeWidth="2" opacity="0.5" />
      <circle cx="70" cy="70" r="20" fill="none" className="stroke-accent" strokeWidth="2" opacity="0.8" />
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" className={dotClassName} />
      ))}
    </svg>
  );
}

const SUB_CAPTION: Record<Lang, [string, string, string]> = {
  en: ["Tight group, on target", "Tight group, off target", "Scattered, off target"],
  bm: ["Kelompok rapat, tepat sasaran", "Kelompok rapat, tersasar", "Berselerak, tersasar"],
};

export function AccuracyTargets({
  lang,
  accuracyTerm,
  consistencyTerm,
}: {
  lang: Lang;
  accuracyTerm: string;
  consistencyTerm: string;
}) {
  const titles: [string, string, string] = [
    `${accuracyTerm} + ${consistencyTerm}`,
    lang === "en" ? `${consistencyTerm}, not ${accuracyTerm}` : `${consistencyTerm}, bukan ${accuracyTerm}`,
    lang === "en" ? "Neither" : "Kedua-duanya Tiada",
  ];
  const subs = SUB_CAPTION[lang];

  const boards: { dots: [number, number][]; dotClassName: string }[] = [
    {
      dots: [
        [68, 66],
        [73, 70],
        [70, 74],
        [66, 71],
      ],
      dotClassName: "fill-emerald-400",
    },
    {
      dots: [
        [30, 35],
        [35, 40],
        [32, 44],
        [28, 38],
      ],
      dotClassName: "fill-amber-400",
    },
    {
      dots: [
        [70, 40],
        [40, 80],
        [95, 90],
        [60, 100],
      ],
      dotClassName: "fill-red-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {boards.map((board, i) => (
        <div key={i} className="rounded-2xl border border-border bg-secondary/40 p-4 text-center">
          <Dartboard dots={board.dots} dotClassName={board.dotClassName} />
          <p className="font-display mt-2 text-[13px] font-bold text-foreground">{titles[i]}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{subs[i]}</p>
        </div>
      ))}
    </div>
  );
}
