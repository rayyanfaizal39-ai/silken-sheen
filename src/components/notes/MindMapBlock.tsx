import { MindMap, type MindNode } from "@/components/MindMap";

export function MindMapBlock({
  data,
  title,
  id,
}: {
  data: MindNode;
  title: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-8 animate-fade-up scroll-mt-24">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="font-display text-2xl font-bold">
          Mind Map <span className="gradient-text">{title}</span>
        </h2>
        <span className="text-xs text-muted-foreground">
          Click nodes to expand • Scroll or pinch to zoom • Drag to pan
        </span>
      </div>
      <MindMap data={data} height={640} />
    </div>
  );
}
