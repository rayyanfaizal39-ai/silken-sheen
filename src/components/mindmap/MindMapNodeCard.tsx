import { memo, type CSSProperties, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight, Network } from "lucide-react";
import { FONT_STACKS, labelStyleFor, typographyFor, type MindMapMetrics } from "./layout";
import { visibleSummary, type MindNode } from "./tree";
import type { MindMapStrings } from "./theme";

export type MindMapNodeCardProps = {
  node: MindNode;
  depth: number;
  width: number;
  metrics: MindMapMetrics;
  accent: string;
  expanded: boolean;
  selected: boolean;
  onPath: boolean;
  dimmed: boolean;
  tabbable: boolean;
  strings: MindMapStrings;
  onActivate: (id: string) => void;
  onOpenReader: (id: string) => void;
};

function MindMapNodeCardImpl({
  node,
  depth,
  width,
  metrics,
  accent,
  expanded,
  selected,
  onPath,
  dimmed,
  tabbable,
  strings,
  onActivate,
  onOpenReader,
}: MindMapNodeCardProps) {
  const childCount = node.children?.length ?? 0;
  const hasChildren = childCount > 0;
  const type = typographyFor(depth, metrics);
  const label = labelStyleFor(node, depth, metrics);
  const summary = visibleSummary(node, depth);
  const accentW = depth >= 1 ? metrics.accentW : 0;
  const level = depth === 0 ? "root" : depth === 1 ? "branch" : "detail";

  const style = {
    width,
    padding: `${type.padY}px ${type.padX + (hasChildren ? metrics.indicatorW : 0)}px ${type.padY}px ${type.padX + accentW}px`,
    "--mm-accent": accent,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={`mm-card mm-${level}${dimmed ? " mm-dim" : ""}${onPath ? " mm-on-path" : ""}`}
      data-node-id={node.id}
      data-mindmap-depth={depth}
      aria-expanded={hasChildren ? expanded : undefined}
      aria-current={selected ? "true" : undefined}
      tabIndex={tabbable ? 0 : -1}
      style={style}
      onClick={(event: MouseEvent) => {
        event.stopPropagation();
        onActivate(node.id);
      }}
      onDoubleClick={(event: MouseEvent) => {
        event.stopPropagation();
        onOpenReader(node.id);
      }}
    >
      {accentW > 0 && <span className="mm-accent" aria-hidden="true" />}
      {depth === 0 && (
        <span className="mm-root-icon" aria-hidden="true">
          <Network className="h-4 w-4" />
        </span>
      )}
      <span className="mm-text">
        <span
          className="mm-label"
          style={{
            fontSize: label.font,
            lineHeight: `${label.lineH}px`,
            fontWeight: label.weight,
            fontFamily: FONT_STACKS[label.family],
          }}
        >
          {node.label}
        </span>
        {summary && (
          <span
            className="mm-summary"
            style={{
              fontSize: metrics.summary.font,
              lineHeight: `${metrics.summary.lineH}px`,
              marginTop: metrics.summary.gap,
            }}
          >
            {summary}
          </span>
        )}
      </span>
      {hasChildren && (
        <>
          <span className="mm-indicator" aria-hidden="true" style={{ right: type.padX - 8 }}>
            {expanded ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <>
                <span className="mm-count">{childCount}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
          </span>
          <span className="sr-only">{`, ${strings.subtopics(childCount)}`}</span>
        </>
      )}
    </button>
  );
}

export const MindMapNodeCard = memo(MindMapNodeCardImpl);

/** Styles for the cards, connectors and canvas; injected once per map. */
export const MIND_MAP_CSS = `
.mm-canvas {
  background-color: #060B1A;
  background-image:
    radial-gradient(ellipse 80% 60% at 18% 0%, rgba(115,70,232,0.10), transparent 60%),
    radial-gradient(ellipse 70% 60% at 100% 100%, rgba(59,130,246,0.07), transparent 60%);
}
.mm-grid {
  background-image: radial-gradient(circle, rgba(148,163,184,0.11) 1px, transparent 1.2px);
  background-size: 28px 28px;
}
.mm-card {
  position: relative;
  display: block;
  box-sizing: border-box;
  text-align: left;
  border-radius: 18px;
  border: 1px solid var(--mm-border, rgba(148,163,184,0.18));
  color: #E3E9F8;
  overflow-wrap: anywhere;
  word-break: normal;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 280ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 200ms ease, background-color 200ms ease;
}
.mm-root {
  border-radius: 24px;
  color: #FFFFFF;
  border-color: rgba(196,181,253,0.55);
  background: linear-gradient(140deg, #7A4DF0 0%, #5B2BC9 48%, #44198F 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.20), 0 24px 60px -18px rgba(91,43,201,0.75), 0 2px 10px rgba(5,8,22,0.45);
}
.mm-branch {
  color: #F3F6FF;
  --mm-border: color-mix(in srgb, var(--mm-accent) 42%, transparent);
  background: linear-gradient(180deg, #152453 0%, #101B42 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 14px 34px -18px rgba(2,6,23,0.9);
}
.mm-detail {
  background: #0D1631;
  box-shadow: 0 10px 26px -18px rgba(2,6,23,0.95);
}
.mm-accent {
  position: absolute;
  left: 0; top: 12px; bottom: 12px;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--mm-accent);
  opacity: 0.9;
}
.mm-detail .mm-accent { opacity: 0.6; top: 14px; bottom: 14px; width: 3px; }
.mm-root-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; margin-bottom: 10px;
  border-radius: 10px;
  background: rgba(255,255,255,0.14);
  color: #F5E7B8;
}
.mm-text { display: block; min-width: 0; }
.mm-label { display: block; letter-spacing: -0.005em; }
.mm-summary { display: block; color: #AEBAD6; font-weight: 400; font-family: ${FONT_STACKS.body}; }
.mm-root .mm-summary { color: rgba(255,255,255,0.86); }
.mm-indicator {
  position: absolute; top: 50%;
  transform: translateY(-50%);
  display: inline-flex; align-items: center; justify-content: center; gap: 1px;
  min-width: 30px; height: 30px; padding: 0 6px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--mm-accent) 18%, transparent);
  border: 1px solid color-mix(in srgb, var(--mm-accent) 38%, transparent);
  color: #E8EEFF;
  font: 700 12px/1 ${FONT_STACKS.body};
  transition: background-color 200ms ease;
}
.mm-root .mm-indicator { background: rgba(255,255,255,0.16); border-color: rgba(255,255,255,0.28); }
.mm-count { font-variant-numeric: tabular-nums; }
.mm-card[aria-expanded="true"] .mm-indicator { background: color-mix(in srgb, var(--mm-accent) 30%, transparent); }
.mm-on-path.mm-branch, .mm-on-path.mm-detail { --mm-border: color-mix(in srgb, var(--mm-accent) 60%, transparent); }
.mm-card[aria-current="true"] {
  border-color: rgba(103,232,249,0.85);
  box-shadow: 0 0 0 2px rgba(103,232,249,0.55), 0 0 0 8px rgba(103,232,249,0.10), 0 18px 44px -16px rgba(2,6,23,0.95);
}
.mm-root[aria-current="true"] {
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 2px rgba(103,232,249,0.6), 0 0 0 9px rgba(103,232,249,0.10), 0 24px 60px -18px rgba(91,43,201,0.75);
}
.mm-card:focus-visible { outline: 3px solid #FFFFFF; outline-offset: 4px; }
.mm-dim { opacity: 0.26; }
@media (hover: hover) and (pointer: fine) {
  .mm-card:hover { transform: translateY(-1px); }
  .mm-branch:hover, .mm-detail:hover { --mm-border: color-mix(in srgb, var(--mm-accent) 70%, transparent); }
  .mm-dim:hover { opacity: 0.6; }
}
.mm-node { position: absolute; left: 0; top: 0; }
.mm-edge { fill: none; stroke-linecap: round; transition: stroke-opacity 280ms ease, stroke-width 200ms ease; }
.mm-control {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  min-width: 44px; min-height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(148,163,184,0.16);
  background: rgba(12,19,42,0.86);
  color: rgba(241,245,255,0.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.mm-control:hover { background: rgba(24,35,72,0.95); color: #FFFFFF; }
.mm-control:focus-visible { outline: 2px solid #67E8F9; outline-offset: 2px; }
.mm-control:disabled { opacity: 0.4; cursor: not-allowed; }
.mm-control[aria-pressed="true"] { border-color: rgba(103,232,249,0.55); color: #CFFAFE; background: rgba(8,51,68,0.7); }
@media (prefers-reduced-motion: reduce) {
  .mm-card, .mm-edge, .mm-control { transition: none !important; }
}
`;
