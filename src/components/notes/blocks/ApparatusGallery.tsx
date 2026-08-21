import type { ApparatusItem } from "@/content/form1/science/chapter-1/chapter1-content";

function ApparatusSketch({ item }: { item: ApparatusItem }) {
  const common = "stroke-foreground fill-none";
  return (
    <svg viewBox="0 0 120 100" className="mx-auto h-24 w-full max-w-[140px]" role="img" aria-label={item.name}>
      <title>{item.name}</title>
      <g className={common} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {item.id === "boiling-tube" && <path d="M48 12v56a16 16 0 0 0 32 0V12M48 12h8m16 0h8" />}
        {item.id === "test-tube" && <path d="M51 18v50a13 13 0 0 0 26 0V18M51 18h7m12 0h7" />}
        {item.id === "beaker" && <path d="M35 18v62h50V18m-50 0h12m25 0h13M38 62h44M38 51h10M38 40h10" />}
        {item.id === "conical-flask" && <path d="M53 12v27L31 80h58L67 39V12m-14 0h14M42 62h36" />}
        {item.id === "flat-bottom-flask" && <path d="M53 12v25c-16 6-22 18-20 31 2 11 9 15 27 15s25-4 27-15c2-13-4-25-20-31V12m-14 0h14M38 70h44" />}
        {item.id === "measuring-cylinder" && <path d="M51 10h18v66h9v8H42v-8h9Zm3 11h12m-12 8h7m-7 8h12m-12 8h7m-7 8h12m-12 8h7" />}
        {item.id === "burette" && <path d="M56 8h10v63H56Zm5 63v12m-11-20h22m-22 0v8m22-8v8M61 83l-4 7m4-7 4 7M58 18h6m-6 8h6m-6 8h6m-6 8h6m-6 8h6" />}
        {item.id === "pipette" && <path d="M58 8h4v23c8 5 8 17 0 22v35h-4V53c-8-5-8-17 0-22Z" />}
        {item.id === "tripod-stand" && <path d="M34 22h52M40 22 28 84m52-62 12 62M60 22v62M34 28h52" />}
        {item.id === "wire-gauze" && <g><rect x="25" y="22" width="70" height="56" /><path d="m25 22 70 56m-70 0 70-56M25 36h70M25 50h70M25 64h70M39 22v56M53 22v56M67 22v56M81 22v56" opacity="0.55" /></g>}
        {item.id === "filter-funnel" && <path d="M26 18h68L67 50v36H53V50Z" />}
        {item.id === "gas-jar" && <path d="M39 17h42v66H39Zm-5 0h52M34 83h52" />}
        {item.id === "retort-stand" && <path d="M30 86h60M43 86V12m-8 0h16m-8 18h43m-3-7v14m-10-7v8m10 0h-10M65 27v7" />}
        {item.id === "evaporating-dish" && <path d="M25 38c3 27 14 39 35 39s32-12 35-39c-18 10-52 10-70 0Zm0 0c18-10 52-10 70 0" />}
      </g>
    </svg>
  );
}

export function ApparatusGallery({ items }: { items: ApparatusItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="rounded-2xl border border-border bg-secondary/40 p-4 text-center">
          <ApparatusSketch item={item} />
          <p className="font-display mt-2 text-sm font-bold text-foreground">{item.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.function}</p>
        </article>
      ))}
    </div>
  );
}
