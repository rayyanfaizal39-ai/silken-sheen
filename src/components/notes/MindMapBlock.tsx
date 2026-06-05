import { MindMap, type MindNode } from "@/components/MindMap";

export function MindMapBlock({ data, title, id }: { data: MindNode; title: string; id?: string }) {
  return (
    <div id={id} className="mb-8 animate-fade-up scroll-mt-24">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="font-display text-2xl font-bold">
          Interactive <span className="gradient-text">Mind Maps</span>
        </h2>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.06] px-3 py-1 text-xs font-bold text-[#94A3B8]">
          Visual learning made easy
        </span>
      </div>
      <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-3 shadow-[0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-2">
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-muted-foreground">
            Click nodes to expand • Scroll or pinch to zoom • Drag to pan
          </p>
        </div>
        <MindMap data={data} height={640} />
      </div>
    </div>
  );
}
