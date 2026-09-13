import { useId } from "react";

type Lang = "bm" | "en";
type Stage = "sample" | "water" | "stain" | "cover" | "blot" | "low" | "high";

function Slide({ stain = false, onion }: { stain?: boolean; onion: boolean }) {
  return (
    <g>
      <path d="M24 98 H214 L229 115 H39Z" fill="#164e63" stroke="#a5f3fc" strokeWidth="2" />
      <ellipse
        cx="124"
        cy="104"
        rx="36"
        ry="7"
        fill={stain ? (onion ? "#d97706" : "#2563eb") : "#67e8f9"}
        opacity="0.8"
      />
      {onion ? (
        <path d="M108 101 L129 100 L142 106 L119 108Z" fill="#fef3c7" stroke="#a16207" />
      ) : (
        <g fill="#c4b5fd">
          <ellipse cx="112" cy="103" rx="6" ry="3" />
          <ellipse cx="132" cy="106" rx="5" ry="3" />
        </g>
      )}
    </g>
  );
}

function PreparationDrawing({ stage, onion }: { stage: Stage; onion: boolean }) {
  if (stage === "sample")
    return onion ? (
      <g stroke="#fde68a" strokeWidth="2" fill="none">
        <path d="M44 116 Q24 69 69 34 Q105 19 144 41 Q176 72 151 117Z" fill="#78350f" />
        <path d="M58 114 Q34 63 91 39 Q146 57 137 114 M76 114 Q53 73 95 54 Q128 72 121 114" />
        <path
          d="M133 64 Q168 81 207 49 L220 72 Q180 110 145 85Z"
          fill="#fef3c7"
          fillOpacity="0.5"
        />
        <path d="M206 48 L227 24 M210 56 L237 30" stroke="#e2e8f0" />
      </g>
    ) : (
      <g stroke="#a5f3fc" strokeWidth="2" fill="none">
        <path d="M58 122 Q29 71 54 29 Q68 16 97 20 L111 51 L125 66 L109 72 Q118 92 97 100 L99 123" />
        <path d="M101 81 Q89 72 83 85" />
        <path d="M87 84 L191 42" stroke="#fde68a" strokeWidth="6" />
        <path d="M163 51 L195 39" stroke="#e2e8f0" strokeWidth="12" />
        <path d="M73 76 Q67 92 83 103" strokeDasharray="4 4" />
      </g>
    );
  if (stage === "low" || stage === "high")
    return (
      <g stroke="#a5f3fc" strokeWidth="3" fill="#164e63">
        <path d="M76 127 H196 L183 116 H88Z" />
        <path d="M165 115 Q210 46 149 28 L143 44 Q178 58 145 113" />
        <path d="M111 19 L148 35 L136 62 L99 46Z" />
        <path d="M106 52 L98 74 L111 80 L121 58" />
        <path
          d={
            stage === "high"
              ? "M121 58 L111 88 L122 92 L135 64Z"
              : "M121 58 L116 74 L128 78 L135 64Z"
          }
          fill="#6ee7b7"
        />
        <path d="M69 98 H154" />
        <path d="M101 94 H129" stroke="#fef3c7" />
        <circle cx="164" cy="77" r="9" />
        <path d="M109 116 L118 101" />
        <path d="M54 43 V76 M48 68 L54 76 L60 68" stroke="#6ee7b7" />
      </g>
    );
  return (
    <>
      <Slide stain={stage !== "water"} onion={onion} />
      {(stage === "water" || stage === "stain") && (
        <g stroke="#e2e8f0" strokeWidth="2">
          <path d="M136 21 L155 30 L131 70 L119 63Z" fill="#164e63" />
          <path d="M141 16 Q154 4 164 16 L159 32Z" fill="#475569" />
          <path
            d="M124 78 Q110 96 124 96 Q138 96 124 78Z"
            fill={stage === "water" ? "#67e8f9" : onion ? "#f59e0b" : "#60a5fa"}
          />
        </g>
      )}
      {stage === "cover" && (
        <g fill="none" stroke="#a5f3fc" strokeWidth="3">
          <path d="M98 98 L150 46" />
          <path d="M143 56 L211 25" stroke="#e2e8f0" />
          <path d="M160 60 Q174 78 155 92 M153 83 L155 92 L164 89" stroke="#6ee7b7" />
        </g>
      )}
      {stage === "blot" && (
        <g>
          <path d="M103 98 H155 L162 109 H110Z" fill="none" stroke="#a5f3fc" />
          <path d="M155 100 L193 73 L215 90 L172 114Z" fill="#e2e8f0" stroke="#94a3b8" />
          <path
            d="M159 102 L175 95 L181 101 L170 111Z"
            fill={onion ? "#f59e0b" : "#60a5fa"}
            opacity="0.7"
          />
        </g>
      )}
    </>
  );
}

export function SlidePreparationSequence({
  onion,
  title,
  steps,
}: {
  onion: boolean;
  title: string;
  steps: readonly string[];
}) {
  const stages: Stage[] = [
    "sample",
    "water",
    "stain",
    "cover",
    "blot",
    "low",
    ...(onion ? ["high" as const] : []),
  ];
  return (
    <section
      data-slide-sequence={onion ? "onion" : "cheek"}
      className="min-w-0 rounded-2xl border border-cyan-300/20 bg-slate-950/40 p-4 sm:p-5"
    >
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <ol className="mt-4 grid gap-4 sm:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step} className="min-w-0 border-t border-white/10 pt-3">
            <svg
              data-preparation-stage={stages[index]}
              viewBox="0 0 250 145"
              role="img"
              aria-label={step}
              className="mx-auto w-full max-w-xs"
            >
              <title>{step}</title>
              <PreparationDrawing stage={stages[index]} onion={onion} />
            </svg>
            <p className="flex gap-2 text-sm leading-6 text-slate-200">
              <span className="font-mono font-bold text-cyan-200">{index + 1}.</span>
              {step}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CoverSlipTechnique({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <section
      data-cover-slip-technique
      className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 p-4 sm:p-5"
    >
      <h3 className="font-bold text-white">
        {en ? "Cover-slip technique" : "Teknik penutup kaca"}
      </h3>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {[false, true].map((correct) => {
          const caption = correct
            ? en
              ? "One edge touches liquid first → lower slowly at about 45° → fewer trapped bubbles"
              : "Satu tepi menyentuh cecair dahulu → turunkan perlahan-lahan pada kira-kira 45° → kurang gelembung udara terperangkap"
            : en
              ? "Cover slip dropped flat → trapped air bubbles"
              : "Penutup kaca dijatuhkan mendatar → gelembung udara terperangkap";
          return (
            <figure key={String(correct)}>
              <p className={`font-bold ${correct ? "text-emerald-200" : "text-amber-200"}`}>
                {correct ? (en ? "CORRECT" : "BETUL") : en ? "WRONG" : "SALAH"}
              </p>
              <svg
                data-cover-slip={correct ? "correct" : "wrong"}
                viewBox="0 0 260 145"
                role="img"
                aria-label={caption}
                className="mx-auto w-full max-w-sm"
              >
                <title>{caption}</title>
                <path d="M15 120 H245" stroke="#a5f3fc" strokeWidth="5" />
                <path d="M62 117 Q128 94 198 117Z" fill="#22d3ee" opacity="0.5" />
                {correct ? (
                  <g fill="none">
                    <path d="M74 113 L151 36" stroke="#e2e8f0" strokeWidth="4" />
                    <path d="M74 113 H183" stroke="#e2e8f0" strokeDasharray="5 4" />
                    <path d="M100 113 A26 26 0 0 0 92 95" stroke="#fde68a" />
                    <text x="110" y="99" fill="#fde68a" fontSize="16">
                      45°
                    </text>
                    <path
                      d="M166 47 Q192 65 184 88 M178 79 L184 88 L193 83"
                      stroke="#6ee7b7"
                      strokeWidth="3"
                    />
                    <circle cx="74" cy="113" r="5" stroke="#6ee7b7" strokeWidth="2" />
                  </g>
                ) : (
                  <g fill="none">
                    <path d="M73 55 H192" stroke="#e2e8f0" strokeWidth="4" />
                    <path
                      d="M90 65 V89 M84 81 L90 89 L96 81 M177 65 V89 M171 81 L177 89 L183 81"
                      stroke="#fcd34d"
                      strokeWidth="2"
                    />
                    <path d="M73 105 H192" stroke="#e2e8f0" strokeDasharray="5 4" />
                    {[94, 118, 145, 170].map((x, i) => (
                      <circle key={x} cx={x} cy="111" r={i % 2 ? 4 : 6} stroke="#fef3c7" />
                    ))}
                  </g>
                )}
              </svg>
              <figcaption className="text-sm leading-6 text-slate-200">{caption}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

export function MicroscopeFields({
  lang,
  onionLabel,
  cheekLabel,
}: {
  lang: Lang;
  onionLabel: string;
  cheekLabel: string;
}) {
  const clip = useId();
  return (
    <section
      data-microscope-fields
      className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 p-4 sm:p-5"
    >
      <h3 className="font-bold text-white">
        {lang === "en" ? "What is observed under the microscope" : "Pemerhatian di bawah mikroskop"}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        {lang === "en"
          ? "Not every structure in the textbook schematic is clearly visible under a school light microscope."
          : "Bukan semua struktur dalam rajah skema buku teks dapat dilihat dengan jelas di bawah mikroskop cahaya sekolah."}
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {[true, false].map((onion) => (
          <figure key={String(onion)}>
            <svg
              data-microscope-field={onion ? "onion" : "cheek"}
              viewBox="0 0 280 280"
              role="img"
              aria-label={onion ? onionLabel : cheekLabel}
              className="mx-auto w-full max-w-xs"
            >
              <title>{onion ? onionLabel : cheekLabel}</title>
              <defs>
                <clipPath id={`${clip}-${onion}`}>
                  <circle cx="140" cy="140" r="125" />
                </clipPath>
              </defs>
              <circle cx="140" cy="140" r="125" fill={onion ? "#fef3c7" : "#dbeafe"} />
              <g clipPath={`url(#${clip}-${onion})`}>
                {onion
                  ? [0, 1, 2, 3, 4, 5].flatMap((row) =>
                      [0, 1, 2, 3].map((col) => (
                        <g
                          key={`${row}-${col}`}
                          transform={`translate(${col * 88 - (row % 2) * 44} ${row * 48})`}
                        >
                          <rect
                            width="86"
                            height="46"
                            rx="4"
                            fill="none"
                            stroke="#a16207"
                            strokeWidth="2"
                          />
                          <ellipse cx="15" cy="25" rx="5" ry="7" fill="#92400e" opacity="0.7" />
                        </g>
                      )),
                    )
                  : [
                      [65, 74, 0],
                      [163, 62, 15],
                      [199, 155, -30],
                      [88, 178, 40],
                      [144, 237, 0],
                    ].map(([x, y, angle]) => (
                      <g key={x} transform={`translate(${x} ${y}) rotate(${angle})`}>
                        <path
                          d="M-27-15 Q-22-38 8-28 Q37-24 32 2 Q39 21 8 29 Q-31 32-33 5Z"
                          fill="#93c5fd"
                          fillOpacity="0.4"
                          stroke="#3b82f6"
                          strokeOpacity="0.7"
                          strokeWidth="2"
                        />
                        <ellipse cx="1" cy="2" rx="7" ry="9" fill="#1e40af" opacity="0.8" />
                      </g>
                    ))}
              </g>
              <circle cx="140" cy="140" r="125" fill="none" stroke="#a5f3fc" strokeWidth="4" />
            </svg>
            <figcaption className="mt-2 text-center text-sm font-bold text-slate-100">
              {onion ? onionLabel : cheekLabel}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
