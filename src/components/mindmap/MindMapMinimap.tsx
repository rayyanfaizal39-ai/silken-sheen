import { memo, useRef, useSyncExternalStore, type PointerEvent } from "react";
import type { CameraController } from "./camera";
import type { MindMapLayoutResult } from "./layout";
import { branchColor } from "./theme";
import type { TreeIndex } from "./tree";

const MAP_W = 208;
const MAP_H = 132;
const PAD = 8;

const MinimapNodes = memo(function MinimapNodes({
  layout,
  index,
  scale,
  offsetX,
  offsetY,
  selectedId,
}: {
  layout: MindMapLayoutResult;
  index: TreeIndex;
  scale: number;
  offsetX: number;
  offsetY: number;
  selectedId: string | null;
}) {
  const { minX, minY } = layout.bounds;
  return (
    <>
      {Array.from(layout.positions.entries()).map(([id, p]) => {
        const corner = {
          x: offsetX + (p.x - minX) * scale,
          y: offsetY + (p.y - p.h / 2 - minY) * scale,
        };
        const entry = index.entries.get(id);
        return (
          <rect
            key={id}
            x={corner.x}
            y={corner.y}
            width={Math.max(2, p.w * scale)}
            height={Math.max(1.5, p.h * scale)}
            rx={1.5}
            fill={id === selectedId ? "#67E8F9" : branchColor(entry?.branchIndex ?? -1)}
            opacity={id === selectedId ? 1 : 0.75}
          />
        );
      })}
    </>
  );
});

export function MindMapMinimap({
  layout,
  index,
  camera,
  viewport,
  selectedId,
  label,
  onNavigate,
}: {
  layout: MindMapLayoutResult;
  index: TreeIndex;
  camera: CameraController;
  viewport: { w: number; h: number };
  selectedId: string | null;
  label: string;
  onNavigate: (worldX: number, worldY: number, animate: boolean) => void;
}) {
  const cam = useSyncExternalStore(camera.subscribe, camera.getSnapshot, camera.getSnapshot);
  const dragging = useRef(false);
  const { minX, maxX, minY, maxY } = layout.bounds;
  const worldW = Math.max(1, maxX - minX);
  const worldH = Math.max(1, maxY - minY);
  const scale = Math.min((MAP_W - PAD * 2) / worldW, (MAP_H - PAD * 2) / worldH);
  const offsetX = PAD + (MAP_W - PAD * 2 - worldW * scale) / 2;
  const offsetY = PAD + (MAP_H - PAD * 2 - worldH * scale) / 2;
  const toMini = (x: number, y: number) => ({
    x: offsetX + (x - minX) * scale,
    y: offsetY + (y - minY) * scale,
  });
  const fromMini = (x: number, y: number) => ({
    x: minX + (x - offsetX) / scale,
    y: minY + (y - offsetY) / scale,
  });

  // Visible world rectangle under the current camera.
  const view = toMini(-cam.x / cam.s, -cam.y / cam.s);
  const viewW = (viewport.w / cam.s) * scale;
  const viewH = (viewport.h / cam.s) * scale;

  function navigate(event: PointerEvent<SVGSVGElement>, animate: boolean) {
    const rect = event.currentTarget.getBoundingClientRect();
    const point = fromMini(event.clientX - rect.left, event.clientY - rect.top);
    onNavigate(point.x, point.y, animate);
  }

  return (
    <div
      className="rounded-2xl border border-white/10 bg-[#081028]/90 p-1.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-md"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <svg
        width={MAP_W}
        height={MAP_H}
        role="img"
        aria-label={label}
        className="block cursor-pointer touch-none rounded-xl"
        onPointerDown={(event) => {
          dragging.current = true;
          event.currentTarget.setPointerCapture?.(event.pointerId);
          navigate(event, true);
        }}
        onPointerMove={(event) => dragging.current && navigate(event, false)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <MinimapNodes
          layout={layout}
          index={index}
          scale={scale}
          offsetX={offsetX}
          offsetY={offsetY}
          selectedId={selectedId}
        />
        <rect
          x={view.x}
          y={view.y}
          width={Math.max(4, viewW)}
          height={Math.max(4, viewH)}
          rx={3}
          fill="rgba(103,232,249,0.08)"
          stroke="rgba(207,250,254,0.85)"
          strokeWidth={1.25}
        />
      </svg>
    </div>
  );
}
