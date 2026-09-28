import type { Sej7Content } from "@/content/form1/sejarah/chapter-7/sej7-content";

/** Ordered relationships, not a geographical map or a proportional time scale. */
export function Chapter7Flow({ items, label }: { items: string[]; label: string }) {
  return (
    <ol aria-label={label} className="flex flex-wrap items-stretch gap-2">
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-2">
          <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-semibold">
            {item}
          </span>
          {index < items.length - 1 && (
            <span aria-hidden="true" className="text-xl text-primary">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export function Chapter7ExamLadder({ exam }: { exam: Sej7Content["education"]["examSystem"] }) {
  return (
    <div data-visual="examination-ladder">
      <p className="mb-5 text-sm leading-relaxed">{exam.characteristics[1]}</p>
      <ol className="relative ml-3 border-l-2 border-primary/50 pl-6 sm:pl-8">
        {exam.stages.map((stage, index) => (
          <li key={stage.name} data-exam={stage.name} className="relative pb-7 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[35px] flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground sm:-left-[43px]"
            >
              {index + 1}
            </span>
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h4 className="text-xl font-bold text-primary">{stage.name}</h4>
              <span className="text-sm text-muted-foreground">{stage.level}</span>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-secondary/40 p-4 text-sm sm:grid-cols-3">
              {(
                [
                  ["Tempat", stage.location],
                  ["Kelayakan", stage.eligibility],
                  ["Kekerapan", stage.frequency],
                  ["Tempoh peperiksaan", stage.duration],
                  ["Bilangan calon", stage.candidates],
                  ["Kadar kelulusan", stage.passRatio],
                ] as const
              )
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label}>
                    <dt className="mb-1 text-xs text-muted-foreground">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
            </dl>
            <div className="mt-3 border-l-2 border-amber-400/70 pl-4">
              <h5 className="mb-1 text-sm font-semibold">Keistimewaan calon berjaya</h5>
              <ul className="list-disc space-y-1 pl-4 text-sm leading-relaxed text-muted-foreground">
                {stage.rewards.map((reward) => (
                  <li key={reward}>{reward}</li>
                ))}
              </ul>
            </div>
            {index < 2 && (
              <p aria-hidden="true" className="mt-3 text-primary">
                ↓
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Chapter7PaperProcess({
  paper,
}: {
  paper: Sej7Content["education"]["paperInvention"];
}) {
  return (
    <div data-visual="paper-process">
      <h3 className="mb-2 text-lg font-bold">{paper.inventor}</h3>
      <p className="mb-4 text-sm leading-relaxed">
        {paper.materials}. {paper.benefit}
      </p>
      <div className="grid grid-cols-3 gap-2 rounded-xl bg-secondary/40 p-3">
        <figure>
          <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full">
            <g fill="none" stroke="#dca96c" strokeWidth="3">
              <path d="m20 23 24-8 14 55-22 7z M28 23l13 43 M37 22l12 44" />
              <path d="m67 22 20-4 7 42-19 8z" fill="#b9a282" />
              <path d="M96 18h48v55H96z M108 18v55 M120 18v55 M132 18v55 M96 31h48 M96 44h48 M96 57h48" />
            </g>
            <path d="M30 92h100m-9-6 9 6-9 6" fill="none" stroke="#22d3ee" strokeWidth="3" />
          </svg>
          <figcaption className="text-center text-xs">Bahan</figcaption>
        </figure>
        <figure>
          <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full">
            <path d="M35 42q0 43 45 43t45-43" fill="#9d7b51" stroke="#dca96c" strokeWidth="3" />
            <ellipse cx="80" cy="42" rx="45" ry="12" fill="#b7b2a2" />
            <path
              d="m80 46 29-30 M59 37q-10-10 0-18 M77 34q-10-10 0-18"
              stroke="#e2e8f0"
              strokeWidth="3"
              fill="none"
            />
            <path d="M30 98h100m-9-6 9 6-9 6" fill="none" stroke="#22d3ee" strokeWidth="3" />
          </svg>
          <figcaption className="text-center text-xs">Proses</figcaption>
        </figure>
        <figure>
          <svg viewBox="0 0 160 110" aria-hidden="true" className="w-full">
            <path
              d="m30 44 61-10 36 36-64 15z M30 51l33 41 64-15 M30 58l33 41 64-15"
              fill="#f1ead3"
              stroke="#dca96c"
              strokeWidth="2"
            />
            <circle cx="124" cy="19" r="9" fill="#fbbf24" />
          </svg>
          <figcaption className="text-center text-xs">Kertas</figcaption>
        </figure>
      </div>
      <details className="mt-4 rounded-xl border border-border p-4">
        <summary className="cursor-pointer text-sm font-semibold">
          Proses membuat kertas — sembilan langkah
        </summary>
        <ol className="mt-4 grid list-none gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {paper.steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/50 text-xs font-bold text-primary">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
