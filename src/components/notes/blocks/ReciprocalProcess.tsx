import { ArrowLeft, ArrowRight, Leaf, Zap } from "lucide-react";

export interface ReciprocalProcessSide {
  title: string;
  equation: string;
  tone: "blue" | "green";
}

const TONE = {
  blue: {
    shell: "border-sky-400/30 bg-sky-500/[0.07]",
    icon: "border-sky-400/30 bg-sky-500/15 text-sky-300",
    label: "text-sky-200",
  },
  green: {
    shell: "border-emerald-400/30 bg-emerald-500/[0.07]",
    icon: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300",
    label: "text-emerald-200",
  },
} as const;

function ProcessCard({ side }: { side: ReciprocalProcessSide }) {
  const style = TONE[side.tone];
  const Icon = side.tone === "blue" ? Zap : Leaf;

  return (
    <article className={`relative min-w-0 rounded-2xl border p-4 sm:p-5 ${style.shell}`}>
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${style.icon}`}>
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <h4 className={`font-display text-sm font-bold sm:text-base ${style.label}`}>{side.title}</h4>
      </div>
      <p className="mt-4 rounded-xl border border-border bg-background/35 px-3 py-3 text-center text-[12.5px] font-semibold leading-relaxed text-foreground sm:px-4 sm:text-[13px]">
        {side.equation}
      </p>
    </article>
  );
}

function ExchangeLane({ label, direction }: { label: string; direction: "right" | "left" }) {
  const Icon = direction === "right" ? ArrowRight : ArrowLeft;
  return (
    <div className="flex items-center justify-center gap-2 text-center">
      {direction === "left" && <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-300" />}
      <span className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-[11px] font-semibold text-foreground">
        {label}
      </span>
      {direction === "right" && <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-300" />}
    </div>
  );
}

export function ReciprocalProcess({
  left,
  right,
  leftToRightLabel,
  rightToLeftLabel,
  relationship,
}: {
  left: ReciprocalProcessSide;
  right: ReciprocalProcessSide;
  leftToRightLabel: string;
  rightToLeftLabel: string;
  relationship: string;
}) {
  return (
    <figure aria-label={`${left.title} and ${right.title}`} className="space-y-4">
      <div className="grid items-stretch gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4">
        <ProcessCard side={left} />

        <div className="flex min-w-32 flex-col justify-center gap-2 rounded-2xl border border-border bg-secondary/25 px-3 py-3 md:border-0 md:bg-transparent md:px-0">
          <ExchangeLane label={leftToRightLabel} direction="right" />
          <div aria-hidden="true" className="mx-auto h-px w-16 bg-border" />
          <ExchangeLane label={rightToLeftLabel} direction="left" />
        </div>

        <ProcessCard side={right} />
      </div>

      <figcaption className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-emerald-500/[0.06] p-4 text-[13px] leading-relaxed text-muted-foreground sm:p-5">
        {relationship}
      </figcaption>
    </figure>
  );
}
