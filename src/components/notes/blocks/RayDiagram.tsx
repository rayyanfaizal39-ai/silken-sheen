type Lang = "en" | "bm";

const REFLECTION_LABELS: Record<Lang, { normal: string; incident: string; reflected: string; mirror: string; iEqualsR: string }> = {
  en: { normal: "Normal", incident: "Incident ray", reflected: "Reflected ray", mirror: "Plane mirror", iEqualsR: "i = r, always" },
  bm: { normal: "Normal", incident: "Sinar tuju", reflected: "Sinar pantulan", mirror: "Cermin satah", iEqualsR: "i = r, sentiasa" },
};

const BEND_LABEL: Record<Lang, Record<"towardNormal" | "awayNormal" | "none", string>> = {
  en: { towardNormal: "bends toward normal", awayNormal: "bends away from normal", none: "not refracted — continues straight" },
  bm: { towardNormal: "membias mendekati normal", awayNormal: "membias menjauhi normal", none: "tidak dibiaskan — terus lurus" },
};

const REFRACTION_GEOMETRY: Record<"towardNormal" | "awayNormal" | "none", { incident: [number, number]; exit: [number, number] }> = {
  towardNormal: { incident: [70, 20], exit: [135, 180] },
  awayNormal: { incident: [95, 20], exit: [175, 180] },
  none: { incident: [110, 20], exit: [110, 180] },
};

const BEND_COLOR: Record<"towardNormal" | "awayNormal" | "none", string> = {
  towardNormal: "stroke-emerald-400",
  awayNormal: "stroke-red-400",
  none: "stroke-muted-foreground",
};

function ReflectionDiagram({ lang }: { lang: Lang }) {
  const t = REFLECTION_LABELS[lang];
  return (
    <svg viewBox="0 0 320 200" className="mx-auto w-full max-w-[300px]">
      <line x1="30" y1="170" x2="290" y2="170" className="stroke-muted-foreground" strokeWidth="4" />
      <line x1="160" y1="170" x2="160" y2="40" className="stroke-muted-foreground" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
      <text x="164" y="40" fontSize="10" className="fill-muted-foreground">
        {t.normal}
      </text>
      <line x1="70" y1="60" x2="160" y2="170" className="stroke-amber-400" strokeWidth="2.5" />
      <polygon points="160,170 152,150 168,152" className="fill-amber-400" />
      <line x1="160" y1="170" x2="250" y2="60" className="stroke-primary" strokeWidth="2.5" />
      <polygon points="250,60 238,68 245,78" className="fill-primary" />
      <path d="M 145 130 A 35 35 0 0 1 145 145" fill="none" className="stroke-amber-400" strokeWidth="1.5" />
      <path d="M 175 130 A 35 35 0 0 0 175 145" fill="none" className="stroke-primary" strokeWidth="1.5" />
      <text x="115" y="135" fontSize="12" fontWeight="700" className="fill-amber-400">
        i
      </text>
      <text x="195" y="135" fontSize="12" fontWeight="700" className="fill-primary">
        r
      </text>
      <text x="90" y="55" fontSize="10" className="fill-amber-400">
        {t.incident}
      </text>
      <text x="215" y="50" fontSize="10" className="fill-primary">
        {t.reflected}
      </text>
      <text x="140" y="190" fontSize="10" className="fill-muted-foreground">
        {t.mirror}
      </text>
      <text x="160" y="115" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-foreground">
        {t.iEqualsR}
      </text>
    </svg>
  );
}

function RefractionDiagram({ lang, bend }: { lang: Lang; bend: "towardNormal" | "awayNormal" | "none" }) {
  const geo = REFRACTION_GEOMETRY[bend];
  const colorClass = BEND_COLOR[bend];
  return (
    <svg viewBox="0 0 220 200" className="mx-auto w-full max-w-[220px]">
      <rect x="0" y="0" width="220" height="100" className="fill-sky-400" opacity="0.08" />
      <rect x="0" y="100" width="220" height="100" className="fill-primary" opacity="0.14" />
      <line x1="110" y1="10" x2="110" y2="190" className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <line x1={geo.incident[0]} y1={geo.incident[1]} x2="110" y2="100" className="stroke-amber-400" strokeWidth="2.5" />
      <polygon points="110,100 100,80 118,84" className="fill-amber-400" />
      <line x1="110" y1="100" x2={geo.exit[0]} y2={geo.exit[1]} className={colorClass} strokeWidth="2.5" />
      <text x="112" y="190" fontSize="9" fontWeight="700" className={colorClass.replace("stroke-", "fill-")}>
        {BEND_LABEL[lang][bend]}
      </text>
    </svg>
  );
}

export function RayDiagram(
  props:
    | { variant: "reflection"; lang: Lang }
    | { variant: "refraction"; lang: Lang; bend: "towardNormal" | "awayNormal" | "none" },
) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4">
      {props.variant === "reflection" ? <ReflectionDiagram lang={props.lang} /> : <RefractionDiagram lang={props.lang} bend={props.bend} />}
    </div>
  );
}
