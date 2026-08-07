type Point = [number, number];

function polyStr(pts: Point[]): string {
  return pts.map((p) => p.join(",")).join(" ");
}

/**
 * Isometric unit-cube-stack illustration (size × size × size). This is the
 * corrected construction: every unit cube is a regular hexagon split into
 * exactly 3 rhombi (top/left/right faces) meeting at a shared center point —
 * this can never render as a triangle. All cubes are sorted by
 * depth = (x + z − y), ascending, before drawing (painter's algorithm) so
 * nearer cubes correctly paint over farther ones. Shading: top face
 * brightest, right face medium, left face darkest, with a dark dividing
 * stroke between every face.
 */
export function IsometricCubeStack({ size = 2, caption }: { size?: number; caption?: string }) {
  const L = 32;
  const pad = 20;

  function rawProject(x: number, y: number, z: number): Point {
    return [(x - z) * L * 0.866, (x + z) * L * 0.5 - y * L];
  }

  const cubes: { x: number; y: number; z: number; depth: number }[] = [];
  for (let x = 0; x < size; x++)
    for (let y = 0; y < size; y++)
      for (let z = 0; z < size; z++) cubes.push({ x, y, z, depth: x + z - y });
  cubes.sort((a, b) => a.depth - b.depth);

  const rawCenters = cubes.map((c) => rawProject(c.x, c.y, c.z));
  const minX = Math.min(...rawCenters.map((p) => p[0])) - L * 0.866;
  const maxX = Math.max(...rawCenters.map((p) => p[0])) + L * 0.866;
  const minY = Math.min(...rawCenters.map((p) => p[1])) - L;
  const maxY = Math.max(...rawCenters.map((p) => p[1])) + L;

  // The bottom label's width can exceed a tightly-fit geometric bounding box
  // for small `size` values (e.g. "2 × 2 × 2 = 8 (2³ = 8)" is wider than the
  // 2×2×2 cube stack itself) — widen the canvas symmetrically to guarantee
  // it never clips the left/right edges, whatever `size` is passed.
  const cubed = size ** 3;
  const labelText = `${size} × ${size} × ${size} = ${cubed} (${size}³ = ${cubed})`;
  const estLabelWidth = labelText.length * 7.6 + 30;
  const geomWidth = maxX - minX + pad * 2;
  const extraForLabel = Math.max(0, estLabelWidth - geomWidth);

  const ox = -minX + pad + extraForLabel / 2;
  const oy = -minY + pad;
  const width = geomWidth + extraForLabel;
  const height = maxY - minY + pad * 2 + 32;

  function project(x: number, y: number, z: number): Point {
    const [rx, ry] = rawProject(x, y, z);
    return [rx + ox, ry + oy];
  }

  function drawCube(x: number, y: number, z: number, key: string) {
    const [cx, cy] = project(x, y, z);
    const top: Point = [cx, cy - L];
    const upperRight: Point = [cx + L * 0.866, cy - L * 0.5];
    const lowerRight: Point = [cx + L * 0.866, cy + L * 0.5];
    const bottom: Point = [cx, cy + L];
    const lowerLeft: Point = [cx - L * 0.866, cy + L * 0.5];
    const upperLeft: Point = [cx - L * 0.866, cy - L * 0.5];
    const center: Point = [cx, cy];

    const topFace: Point[] = [upperLeft, top, upperRight, center];
    const rightFace: Point[] = [upperRight, lowerRight, bottom, center];
    const leftFace: Point[] = [lowerLeft, upperLeft, center, bottom];

    const stroke = "rgba(15,8,35,0.85)";
    return (
      <g key={key}>
        <polygon
          points={polyStr(leftFace)}
          fill="rgba(139,107,255,0.22)"
          stroke={stroke}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        <polygon
          points={polyStr(rightFace)}
          fill="rgba(139,107,255,0.4)"
          stroke={stroke}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        <polygon
          points={polyStr(topFace)}
          fill="rgba(139,107,255,0.6)"
          stroke={stroke}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
      </g>
    );
  }

  return (
    <div className="mt-4 flex flex-col items-center rounded-2xl border border-white/[0.08] bg-[#0c1128] p-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {cubes.map((c) => drawCube(c.x, c.y, c.z, `${c.x}-${c.y}-${c.z}`))}
        <text
          x={width / 2}
          y={height - 8}
          fontSize={13}
          fill="#eef1fb"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          {size} × {size} × {size} = {cubed} ({size}³ = {cubed})
        </text>
      </svg>
      {caption && (
        <p className="mt-2.5 max-w-sm text-center text-[11.5px] text-slate-500">{caption}</p>
      )}
    </div>
  );
}
