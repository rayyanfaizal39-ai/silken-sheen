import { useId, type ReactNode } from "react";
export type Lang = "bm" | "en";
export const panel = "min-w-0 rounded-2xl border border-white/15 bg-[#071923] p-4 sm:p-5";
export function Diagram({
  label,
  kind,
  children,
  viewBox = "0 0 360 280",
}: {
  label: string;
  kind: string;
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      data-reproduction-diagram={kind}
      viewBox={viewBox}
      fill="none"
      fontFamily="Arial, sans-serif"
      className="mx-auto block w-full max-w-lg"
    >
      {children}
    </svg>
  );
}
export function Arrow({ d, color = "#67e8f9" }: { d: string; color?: string }) {
  const id = useId();
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6Z" fill={color} />
        </marker>
      </defs>
      <path d={d} fill="none" stroke={color} strokeWidth="3" markerEnd={`url(#${id})`} />
    </g>
  );
}
export function Cue({
  x,
  y,
  number,
  to,
}: {
  x: number;
  y: number;
  number: number;
  to?: [number, number];
}) {
  return (
    <g>
      {to && <path d={`M${x} ${y} L${to[0]} ${to[1]}`} stroke="#94a3b8" strokeWidth="1.5" />}
      <circle cx={x} cy={y} r="12" fill="#083344" stroke="#a5f3fc" />
      <text x={x} y={y + 4} textAnchor="middle" fill="#e0f2fe" fontSize="13">
        {number}
      </text>
    </g>
  );
}
export function Cell({
  x,
  y,
  color = "#67e8f9",
  radius = 22,
}: {
  x: number;
  y: number;
  color?: string;
  radius?: number;
}) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={color}
        fillOpacity=".15"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx={x} cy={y} r={radius * 0.3} fill={color} />
    </g>
  );
}
export function Sperm({ x, y, color = "#67e8f9" }: { x: number; y: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx="10" ry="6" fill={color} />
      <path d="M-10 0 C-25 -16 -33 16 -48 0" stroke={color} strokeWidth="2" />
    </g>
  );
}
