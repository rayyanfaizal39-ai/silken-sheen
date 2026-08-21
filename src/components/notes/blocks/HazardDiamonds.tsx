import { useState } from "react";
import { Check, ChevronRight, RotateCcw, X } from "lucide-react";
import type { HazardKind } from "@/content/form1/science/chapter-1/chapter1-canonical";

export interface HazardDiamondItem {
  kind: HazardKind;
  name: string;
  body: string;
  examples: string;
}

export function HazardPictogram({ kind, label, className = "h-28 w-28 sm:h-32 sm:w-32" }: { kind: HazardKind; label: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={`mx-auto ${className}`} role="img" aria-label={label}>
      <title>{label}</title>
      <rect x="4" y="4" width="56" height="56" rx="2" className="fill-orange-300 stroke-foreground" strokeWidth="2" />
      {kind === "irritant" && (
        <g className="stroke-foreground" strokeWidth="8" strokeLinecap="square">
          <line x1="18" y1="18" x2="46" y2="46" />
          <line x1="46" y1="18" x2="18" y2="46" />
        </g>
      )}
      {kind === "radioactive" && (
        <g className="fill-foreground">
          <circle cx="32" cy="32" r="5" />
          <path d="M29 25 21 11a23 23 0 0 1 15 0l-3 14Z" />
          <path d="m39 34 16 1a23 23 0 0 1-8 13L36 38Z" />
          <path d="m28 38-11 10a23 23 0 0 1-8-13l16-1Z" />
        </g>
      )}
      {kind === "corrosive" && (
        <g className="stroke-foreground fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m13 15 13 5m-9-9 12 5-2 5-12-5Z" />
          <path d="m38 14 12 4m-8-8 12 4-2 5-12-4Z" />
          <path d="M24 27c0 3-4 3-4 0 0-1 2-4 2-4s2 3 2 4Zm21 1c0 3-4 3-4 0 0-1 2-4 2-4s2 3 2 4Z" />
          <path d="M8 47h23l5 5H15l-7-5Zm32-9h15v8H40z" />
          <path d="m16 45 6-6 8 2" />
        </g>
      )}
      {kind === "toxic" && (
        <g className="stroke-foreground fill-none" strokeWidth="3" strokeLinecap="round">
          <line x1="14" y1="49" x2="50" y2="31" />
          <line x1="14" y1="31" x2="50" y2="49" />
          <path d="M20 25a12 12 0 1 1 24 0c0 6-3 9-7 11v6H27v-6c-4-2-7-5-7-11Z" className="fill-orange-300" />
          <circle cx="27" cy="25" r="2.5" className="fill-foreground stroke-none" />
          <circle cx="37" cy="25" r="2.5" className="fill-foreground stroke-none" />
          <path d="m30 32 2-3 2 3" />
          <line x1="29" y1="38" x2="35" y2="38" />
        </g>
      )}
      {kind === "explosive" && (
        <g className="stroke-foreground fill-foreground" strokeLinecap="round">
          <path d="m27 39 5-11 4 6 7-9 1 13 9 3-11 4 2 10-9-7-7 7 1-10-11 3 8-8-10-4Z" />
          <line x1="14" y1="15" x2="23" y2="25" strokeWidth="3" />
          <line x1="31" y1="9" x2="32" y2="20" strokeWidth="3" />
          <line x1="48" y1="13" x2="41" y2="23" strokeWidth="3" />
        </g>
      )}
      {kind === "flammable" && (
        <path
          d="M33 10c3 10-5 13 1 20 1-7 8-9 9-17 9 10 12 21 7 31-4 8-11 12-19 12-11 0-20-7-20-18 0-9 5-16 13-23-1 9 2 13 6 16 5-6 5-12 3-21Z"
          className="fill-foreground"
        />
      )}
    </svg>
  );
}

export function HazardDiamonds({ items, lang = "en" }: { items: HazardDiamondItem[]; lang?: "en" | "bm" }) {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [answer, setAnswer] = useState<HazardKind | null>(null);
  const challenge = items[challengeIndex % items.length];
  const correct = answer === challenge.kind;
  const next = () => { setChallengeIndex((index) => (index + 1) % items.length); setAnswer(null); };
  return (
    <div className="space-y-5">
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.kind} className="flex min-h-[245px] flex-col items-center rounded-2xl border border-border bg-card/60 p-3 text-center sm:p-4">
            <div className="flex min-h-32 w-full items-center justify-center"><HazardPictogram kind={item.kind} label={item.name} /></div>
            <p className="font-display mt-1 text-sm font-bold text-foreground">{item.name}</p>
            <p className="mt-1 text-xs font-semibold text-foreground/85">{item.examples}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/70 to-accent/5 p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-sm font-bold text-primary">{lang === "en" ? "Recognition challenge" : "Cabaran pengecaman"}</h3>
          <span className="rounded-full border border-border bg-card/70 px-2 py-1 text-[10px] font-semibold text-muted-foreground">SP 1.2.2</span>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">{lang === "en" ? "Identify the category represented by this textbook-aligned pictogram." : "Kenal pasti kategori yang diwakili oleh piktogram berasaskan buku teks ini."}</p>
        <div className="grid items-center gap-4 sm:grid-cols-[180px_1fr]">
          <div className="rounded-xl border border-border bg-card/80 p-2"><HazardPictogram kind={challenge.kind} label={lang === "en" ? "Warning symbol to identify" : "Simbol amaran untuk dikenal pasti"} className="h-36 w-36 sm:h-40 sm:w-40" /></div>
          <div className="grid gap-2 sm:grid-cols-2">
            {items.map((item) => {
              const selected = answer === item.kind;
              const revealCorrect = answer !== null && item.kind === challenge.kind;
              return <button key={item.kind} type="button" disabled={correct} onClick={() => setAnswer(item.kind)} className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${revealCorrect ? "border-emerald-500 bg-emerald-500/15 text-foreground" : selected ? "border-red-500 bg-red-500/15 text-foreground" : "border-border bg-card/70 text-foreground hover:border-primary/60"}`}>{revealCorrect ? <Check className="mr-2 inline h-4 w-4 text-emerald-600" aria-hidden="true" /> : selected ? <X className="mr-2 inline h-4 w-4 text-red-600" aria-hidden="true" /> : null}{item.name}</button>;
            })}
          </div>
        </div>
        {answer && <div className="mt-3 flex min-h-11 flex-wrap items-center justify-between gap-3" aria-live="polite"><p className={`text-xs font-medium ${correct ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>{correct ? (lang === "en" ? "Correct. Link the shape to its category and precaution." : "Betul. Hubungkan bentuk dengan kategori dan langkah berjaga-jaga.") : (lang === "en" ? "Not yet. Compare the shape with the teaching cards above." : "Belum tepat. Bandingkan bentuk dengan kad pengajaran di atas.")}</p><button type="button" onClick={correct ? next : () => setAnswer(null)} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{correct ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : <RotateCcw className="h-4 w-4" aria-hidden="true" />}{correct ? (lang === "en" ? "Next symbol" : "Simbol seterusnya") : (lang === "en" ? "Try again" : "Cuba lagi")}</button></div>}
      </section>
    </div>
  );
}
