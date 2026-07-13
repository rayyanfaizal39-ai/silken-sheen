type Lang = "en" | "bm";

const LABELS: Record<Lang, { concave: string; convex: string; object: string; image: string; magnified: string; smaller: string }> = {
  en: { concave: "Concave mirror", convex: "Convex mirror", object: "Object", image: "Image", magnified: "(magnified, upright)", smaller: "(smaller, wider view)" },
  bm: { concave: "Cermin cekung", convex: "Cermin cembung", object: "Objek", image: "Imej", magnified: "(dibesarkan, tegak)", smaller: "(lebih kecil, pandangan lebih luas)" },
};

/** A plain circle-head + rounded-rectangle-body "person" silhouette — never arrows, so scale differences read unambiguously. */
function PersonSilhouette({ cx, cy, scale, colorClass }: { cx: number; cy: number; scale: number; colorClass: string }) {
  const headR = 7 * scale;
  const bodyW = 12 * scale;
  const bodyH = 24 * scale;
  return (
    <g>
      <circle cx={cx} cy={cy - bodyH / 2 - headR + 2} r={headR} className={colorClass} />
      <rect x={cx - bodyW / 2} y={cy - bodyH / 2 + 2} width={bodyW} height={bodyH} rx={bodyW / 3} className={colorClass} />
    </g>
  );
}

function MirrorPanel({
  lang,
  type,
  uses,
}: {
  lang: Lang;
  type: "concave" | "convex";
  uses: string[];
}) {
  const t = LABELS[lang];
  const isConcave = type === "concave";
  return (
    <div className="flex-1 rounded-2xl border border-border bg-secondary/40 p-4 text-center">
      <svg viewBox="0 0 260 200" className="mx-auto w-full max-w-[240px]">
        <path
          d={isConcave ? "M 90 30 Q 40 100 90 170" : "M 90 30 Q 140 100 90 170"}
          fill="none"
          className={isConcave ? "stroke-primary" : "stroke-violet-400"}
          strokeWidth="4"
        />
        <line x1="220" y1="100" x2="90" y2="100" className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <PersonSilhouette cx={190} cy={95} scale={1} colorClass="fill-amber-400" />
        <PersonSilhouette cx={isConcave ? 60 : 55} cy={isConcave ? 60 : 93} scale={isConcave ? 1.7 : 0.55} colorClass="fill-emerald-400" />
        <text x="130" y="18" fontSize="11" textAnchor="middle" fontWeight="700" className={isConcave ? "fill-primary" : "fill-violet-400"}>
          {isConcave ? t.concave : t.convex}
        </text>
        <text x="190" y="185" fontSize="10.5" textAnchor="middle" fontWeight="700" className="fill-amber-400">
          {t.object}
        </text>
        <text x={isConcave ? 60 : 55} y="197" fontSize="9" textAnchor="middle" className="fill-muted-foreground">
          {isConcave ? t.magnified : t.smaller}
        </text>
      </svg>
      <ul className="mt-3 flex flex-col gap-1 text-left">
        {uses.map((u) => (
          <li key={u} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-muted-foreground">
            <span className={`mt-1 h-1 w-1 shrink-0 rounded-full ${isConcave ? "bg-primary" : "bg-violet-400"}`} />
            <span>{u}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MirrorComparison({
  lang,
  concaveUses,
  convexUses,
}: {
  lang: Lang;
  concaveUses: string[];
  convexUses: string[];
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <MirrorPanel lang={lang} type="concave" uses={concaveUses} />
      <MirrorPanel lang={lang} type="convex" uses={convexUses} />
    </div>
  );
}
