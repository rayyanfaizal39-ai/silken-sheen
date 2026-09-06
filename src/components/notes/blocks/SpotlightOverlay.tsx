import type * as React from "react";
import { spotlightBounds, type SpotlightShape, type SpotlightPulseGroup } from "./spotlight-shapes";

function ShapeEl({
  shape,
  ...props
}: { shape: SpotlightShape } & Omit<React.SVGProps<SVGEllipseElement>, "id">) {
  if (shape.kind === "ellipse") {
    return <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} {...props} />;
  }
  return (
    <rect
      x={shape.x}
      y={shape.y}
      width={shape.w}
      height={shape.h}
      rx={shape.rx ?? 0}
      {...(props as React.SVGProps<SVGRectElement>)}
    />
  );
}

/**
 * The visual engine behind `AnnotatedImage`'s `spotlight` mode: strongly dims
 * everything except the given shapes, draws a bright glow around them, and
 * (for a concept that names the WHOLE picture, e.g. "ecosystem" — pass no
 * `shapes`) can instead sweep two temporary colour groups across it.
 *
 * Pure SVG over a `viewBox="0 0 100 100"` with `preserveAspectRatio="none"`,
 * matching the percentage coordinates every other annotation mode in this file
 * already authors against — so it stays pixel-aligned with the artwork at
 * every width without any resize listener.
 */
export function SpotlightOverlay({
  maskId,
  shapes,
  tint,
  groupHalo = false,
  pulseGroups,
  wholeGlow = false,
}: {
  maskId: string;
  /** Shapes to keep bright. Empty (or omitted) skips dimming entirely. */
  shapes: SpotlightShape[];
  /** Tints the revealed area this CSS colour instead of just un-dimming it. */
  tint?: string;
  /** A soft unifying wash behind several shapes, so a group reads as ONE group. */
  groupHalo?: boolean;
  /** Two-phase colour sweep for a concept that dims nothing (e.g. ecosystem). */
  pulseGroups?: SpotlightPulseGroup[];
  /** Persistent soft border around the whole frame (ecosystem = everything). */
  wholeGlow?: boolean;
}) {
  const dim = shapes.length > 0;
  const halo = groupHalo && shapes.length > 1 ? spotlightBounds(shapes) : null;
  const haloPad = 4;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {dim && (
        <defs>
          <mask id={maskId} maskUnits="objectBoundingBox" maskContentUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            {shapes.map((shape) => (
              <ShapeEl
                key={shape.id}
                shape={shape}
                fill="black"
                style={{ transition: "all 200ms ease-out" }}
              />
            ))}
          </mask>
        </defs>
      )}

      {/* The dim scrim itself — a fixed dark rect with the bright shapes cut
          out of it, so the artwork underneath needs no filtering of its own. */}
      {dim && (
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="rgba(2,6,23,0.78)"
          mask={`url(#${maskId})`}
          style={{ transition: "opacity 200ms ease-out" }}
        />
      )}

      {halo && (
        <rect
          x={Math.max(0, halo.minX - haloPad)}
          y={Math.max(0, halo.minY - haloPad)}
          width={Math.min(100, halo.maxX + haloPad) - Math.max(0, halo.minX - haloPad)}
          height={Math.min(100, halo.maxY + haloPad) - Math.max(0, halo.minY - haloPad)}
          rx={6}
          className="fill-primary/[7%]"
          style={{ transition: "all 200ms ease-out" }}
        />
      )}

      {dim &&
        tint &&
        shapes.map((shape) => (
          <ShapeEl
            key={`tint-${shape.id}`}
            shape={shape}
            fill={tint}
            fillOpacity={0.16}
            style={{ transition: "all 200ms ease-out" }}
          />
        ))}

      {/* Glow: a soft wide stroke plus a tight bright one, cheaper and more
          reliably cross-browser than a blurred SVG filter under a non-uniform
          (percentage-stretched) viewBox. */}
      {dim &&
        shapes.map((shape) => (
          <ShapeEl
            key={`glow-wide-${shape.id}`}
            shape={shape}
            fill="none"
            className="stroke-primary"
            strokeWidth={2.6}
            strokeOpacity={0.35}
            vectorEffect="non-scaling-stroke"
            style={{ transition: "all 200ms ease-out" }}
          />
        ))}
      {dim &&
        shapes.map((shape) => (
          <ShapeEl
            key={`glow-tight-${shape.id}`}
            shape={shape}
            fill="none"
            className="stroke-primary"
            strokeWidth={1.2}
            strokeOpacity={0.95}
            vectorEffect="non-scaling-stroke"
            style={{
              transition: "all 200ms ease-out",
              filter: "drop-shadow(0 0 4px var(--primary))",
            }}
          />
        ))}

      {pulseGroups?.map((group, index) => (
        <g
          key={index}
          className={index === 0 ? "spotlight-pulse-a" : "spotlight-pulse-b"}
        >
          {group.shapes.map((shape) => (
            <ShapeEl
              key={shape.id}
              shape={shape}
              stroke="none"
              className={group.tone === "a" ? "fill-primary" : "fill-accent"}
            />
          ))}
        </g>
      ))}

      {wholeGlow && (
        <rect
          x={1.2}
          y={1.2}
          width={97.6}
          height={97.6}
          rx={3}
          fill="none"
          className="stroke-primary"
          strokeWidth={1.4}
          strokeOpacity={0.85}
          vectorEffect="non-scaling-stroke"
          style={{
            transition: "all 200ms ease-out",
            filter: "drop-shadow(0 0 8px var(--primary))",
          }}
        />
      )}
    </svg>
  );
}
