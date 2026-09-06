/**
 * Deterministic overlay geometry for the three Chapter 7 apparatus photographs
 * (straight wire, circular loop, solenoid).
 *
 * The rasters are apparatus only — no arrows, no field lines, no pole letters —
 * so every teaching mark is generated here and drawn as SVG on top. Keeping the
 * numbers in one module rather than inline in JSX buys two things:
 *
 *  - **Alignment.** All coordinates are expressed in the artwork's own pixel
 *    space (1672 x 941). The overlay `<svg>` carries that as its `viewBox` and
 *    is stretched over the same box as the `<img>`, so raster and overlay scale
 *    as one at every width. Nothing here is a desktop-only pixel position.
 *  - **Testability.** "The overlay is centred on the wire", "reversing the
 *    current reverses the field", "the interior solenoid lines are parallel"
 *    are assertions about these numbers, so a test can make them without
 *    rendering or measuring anything.
 *
 * Field direction always follows one rule — the right-hand grip rule with
 * conventional current — applied here once, rather than by hand per figure.
 */

/** The artwork's intrinsic size. Every coordinate below lives in this space. */
export const CH7_ART = { width: 1672, height: 941 } as const;
export const CH7_ART_ASPECT = "16 / 9";

/** SVG `rotate()` degrees for a unit vector, 0 = +x (right), 90 = +y (down). */
function degOf(dx: number, dy: number): number {
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

/** Normalises to (-180, 180] so two headings compare cleanly in a test. */
export function normaliseDeg(deg: number): number {
  const wrapped = ((deg % 360) + 360) % 360;
  return wrapped > 180 ? wrapped - 360 : wrapped;
}

/** True when `a` and `b` point in exactly opposite directions. */
export function isOpposite(a: number, b: number): boolean {
  return Math.abs(normaliseDeg(a - b + 180)) < 1e-6;
}

// ---------------------------------------------------------------------------
// 1. Straight current-carrying wire
// ---------------------------------------------------------------------------

/**
 * The vertical copper wire and the board it passes through.
 *
 * `x` is the wire's centre line, measured off the artwork; `boardY` is where it
 * meets the board, which is also the centre of the compass ring and therefore
 * the centre every field circle must share. `perspective` is the ring's
 * ry / rx — the board is drawn in perspective, so a circle on it renders as an
 * ellipse, and the field circles have to be foreshortened by the same amount or
 * they will not sit on the board.
 */
export const STRAIGHT_WIRE = {
  x: 838,
  topY: 92,
  boardY: 528,
  /** Field circles share the wire's foot; measured against the compass ring. */
  centre: { x: 836, y: 528 },
  perspective: 0.447,
  /** Three concentric circles. The outermost lands on the ring of compasses. */
  radii: [150, 232, 311] as const,
} as const;

export type FieldArrow = { x: number; y: number; deg: number };

/**
 * Where the current arrow sits on the wire, and which way it points.
 *
 * Unreversed the conventional current flows UP the wire, so the arrowhead
 * points along -y; reversing sends it down. Nothing else about the figure
 * moves — that is the whole point the toggle is teaching.
 */
export function straightWireCurrentArrow(reversed: boolean): FieldArrow {
  return { x: STRAIGHT_WIRE.x, y: 190, deg: reversed ? 90 : -90 };
}

/**
 * Where the arrowheads sit on each field circle, as angles round the ellipse.
 *
 * Not the four compass points: the top of every circle is directly above the
 * wire's foot, which is where the wire itself is, so an arrowhead there would
 * be drawn over the copper. The far-side arrow is moved round to the upper
 * left instead, leaving the wire clear while still showing the field crossing
 * the back of the board.
 */
const STRAIGHT_WIRE_STATIONS = [0, 90, 180, 250] as const;

/**
 * Arrowheads on the concentric field circles, each with the ellipse's exact
 * tangent at that point rather than an eyeballed heading.
 *
 * With current flowing up, the right-hand grip rule gives a field that is
 * anticlockwise seen from above. In this view the far side of the board is up
 * the screen and the near side is down it, so at the right of the ring the
 * field runs away from the viewer (up the screen) and at the left it runs
 * toward them. Reversing the current flips every heading by 180 degrees, and
 * moves nothing.
 */
export function straightWireFieldArrows(reversed: boolean): FieldArrow[] {
  const { centre, perspective, radii } = STRAIGHT_WIRE;
  const flip = reversed ? 180 : 0;
  return radii.flatMap((rx) => {
    const ry = rx * perspective;
    return STRAIGHT_WIRE_STATIONS.map((angle) => {
      const t = (angle * Math.PI) / 180;
      return {
        x: centre.x + rx * Math.cos(t),
        y: centre.y + ry * Math.sin(t),
        // Travelling the way the reader sees as anticlockwise on the board.
        deg: normaliseDeg(degOf(rx * Math.sin(t), -ry * Math.cos(t)) + flip),
      };
    });
  });
}

// ---------------------------------------------------------------------------
// 2. Current-carrying circular loop
// ---------------------------------------------------------------------------

/**
 * The copper loop, measured off the artwork. The loop is seen face-on, which
 * fixes how its field must be drawn: the resultant field through the centre is
 * perpendicular to the page, so it is shown as one field-symbol cluster filling
 * the whole aperture rather than as two circles round two sides of the wire.
 *
 * That distinction is the reason this overlay exists. Drawing a separate
 * circular field around the left and right of the loop — the old schematic —
 * tells a student the loop has two fields that happen to sit near each other.
 * It has one, and every part of the loop contributes to it in the same
 * direction, which is what a filled aperture shows at a glance.
 */
export const CURRENT_LOOP = {
  centre: { x: 848, y: 336 },
  radius: 292,
} as const;

/** A field symbol: a dot for out of the page, a cross for into it. */
export type FieldSymbol = { x: number; y: number; out: boolean; r: number };

/**
 * The resultant field through the loop's aperture.
 *
 * Unreversed the current runs anticlockwise as the reader sees it, so the
 * right-hand grip rule puts the field OUT of the page through the centre. Every
 * symbol in the aperture points the same way — there is one field here, not
 * two — and they are packed more tightly than the return symbols outside
 * because the field through the centre is the stronger one.
 */
export function loopInteriorField(reversed: boolean): FieldSymbol[] {
  const { centre, radius } = CURRENT_LOOP;
  const out = !reversed;
  const step = radius * 0.42;
  const symbols: FieldSymbol[] = [];
  for (let row = -2; row <= 2; row += 1) {
    // Hexagonal packing: alternate rows are offset half a step.
    const y = centre.y + row * step * 0.86;
    const shift = row % 2 === 0 ? 0 : step / 2;
    for (let col = -2; col <= 2; col += 1) {
      const x = centre.x + col * step + shift;
      const dx = x - centre.x;
      const dy = y - centre.y;
      // Keep clear of the copper itself so a symbol never sits on the wire.
      if (Math.hypot(dx, dy) > radius - 46) continue;
      symbols.push({ x, y, out, r: 17 });
    }
  }
  return symbols;
}

/**
 * The return field outside the loop. It is the same field coming back round, so
 * it points the opposite way and is drawn sparsely — spread out means weaker.
 */
export function loopReturnField(reversed: boolean): FieldSymbol[] {
  const { centre, radius } = CURRENT_LOOP;
  const out = reversed;
  const ring = radius + 88;
  // Above and to the sides only: below the loop is the stand it is mounted on,
  // and a symbol printed over the clamps reads as part of the apparatus.
  return [180, 135, 45, 0].map((angle) => {
    const t = (angle * Math.PI) / 180;
    return {
      x: centre.x + ring * Math.cos(t),
      y: centre.y - ring * Math.sin(t),
      out,
      r: 15,
    };
  });
}

/**
 * Current arrows on the copper loop itself, at the four compass points, with
 * the tangent taken analytically so an arrowhead can never disagree with the
 * curve it sits on.
 */
export function loopCurrentArrows(reversed: boolean): FieldArrow[] {
  const { centre, radius } = CURRENT_LOOP;
  // Anticlockwise on screen: y is measured downward, so -sin puts t = 90 at the
  // top of the picture and increasing t travels the way the reader calls
  // anticlockwise.
  const dir = reversed ? -1 : 1;
  return [0, 90, 180, 270].map((angle) => {
    const t = (angle * Math.PI) / 180;
    return {
      x: centre.x + radius * Math.cos(t),
      y: centre.y - radius * Math.sin(t),
      deg: normaliseDeg(degOf(-dir * Math.sin(t), -dir * Math.cos(t))),
    };
  });
}

// ---------------------------------------------------------------------------
// 3. Solenoid
// ---------------------------------------------------------------------------

/**
 * The air-core solenoid, measured off the artwork: the axis height and the x of
 * each end turn. Field lines are laid out from these, so they enter and leave
 * the coil where the coil actually is.
 */
export const SOLENOID = {
  axisY: 350,
  leftX: 334,
  rightX: 1346,
  /** Perpendicular offsets of the interior field lines from the axis. */
  interiorOffsets: [-96, -32, 32, 96] as const,
} as const;

/** Which end is the north pole. Reversing the current swaps the two. */
export function solenoidPoles(reversed: boolean): { left: "north" | "south"; right: "north" | "south" } {
  return reversed ? { left: "north", right: "south" } : { left: "south", right: "north" };
}

export type FieldLine = { d: string; arrows: FieldArrow[] };

/**
 * The interior field: straight, parallel, closely spaced lines running the full
 * length of the coil. Straight and parallel is the physics — inside a long
 * solenoid the field is very nearly uniform — and it is also the contrast the
 * external lines are drawn against.
 *
 * The field runs from the south end to the north end inside the coil, so
 * reversing the current (which swaps the poles) reverses these too.
 */
export function solenoidInteriorLines(reversed: boolean): FieldLine[] {
  const { axisY, leftX, rightX, interiorOffsets } = SOLENOID;
  // Inside, the field runs S -> N. Unreversed the north pole is the right end.
  const deg = reversed ? 180 : 0;
  const midX = (leftX + rightX) / 2;
  return interiorOffsets.map((offset) => {
    const y = axisY + offset;
    return {
      d: `M${leftX},${y} L${rightX},${y}`,
      arrows: [
        { x: midX - 190, y, deg },
        { x: midX + 190, y, deg },
      ],
    };
  });
}

/**
 * The external return field: broad arcs that leave the north end, sweep well
 * clear of the coil and come back into the south end. Spread far apart on
 * purpose — the same number of lines occupying much more room is what "weaker
 * outside" looks like.
 */
export function solenoidExteriorLines(reversed: boolean): FieldLine[] {
  const { axisY, leftX, rightX } = SOLENOID;
  const northX = reversed ? leftX : rightX;
  const southX = reversed ? rightX : leftX;
  const midX = (leftX + rightX) / 2;
  // Each arc leaves the north end, bulges to `bulge` above/below the axis, and
  // returns to the south end. Two heights, above and below, so the whole thing
  // reads as one bar-magnet-shaped field.
  return [
    [1, 208, 296],
    [1, 300, 430],
    [-1, 208, 296],
    [-1, 300, 430],
  ].flatMap(([sign, bulge, reach]) => {
    const apexY = axisY + sign * bulge;
    const d =
      `M${northX},${axisY} ` +
      `C${northX + (northX === rightX ? reach : -reach)},${axisY} ` +
      `${midX + (northX === rightX ? reach * 0.5 : -reach * 0.5)},${apexY} ` +
      `${midX},${apexY} ` +
      `C${midX - (northX === rightX ? reach * 0.5 : -reach * 0.5)},${apexY} ` +
      `${southX - (northX === rightX ? reach : -reach)},${axisY} ` +
      `${southX},${axisY}`;
    return [
      {
        d,
        // At the apex the arc is horizontal and running north -> south.
        arrows: [{ x: midX, y: apexY, deg: northX === rightX ? 180 : 0 }],
      },
    ];
  });
}

// ---------------------------------------------------------------------------
// Bar-magnet field lines, for the permanent-magnet diagram
// ---------------------------------------------------------------------------

/** Bar-magnet geometry in the MagnetFieldDiagram's own 320 x 150 user space. */
export const BAR_MAGNET_RECT = { x: 124, y: 64, w: 72, h: 22 } as const;

/** Left half is the north pole, right half the south pole (unflipped). */
export const BAR_MAGNET_POLES = {
  north: { x1: BAR_MAGNET_RECT.x, x2: BAR_MAGNET_RECT.x + BAR_MAGNET_RECT.w / 2 },
  south: { x1: BAR_MAGNET_RECT.x + BAR_MAGNET_RECT.w / 2, x2: BAR_MAGNET_RECT.x + BAR_MAGNET_RECT.w },
} as const;

const poleCentre = (p: { x1: number; x2: number }) => (p.x1 + p.x2) / 2;

/**
 * Outside a magnet, field lines run north -> south. Every external arc below is
 * horizontal at its apex, so the arrowhead there points along +x when the south
 * pole lies to the right of the north pole, and along -x otherwise. This holds
 * above and below the magnet alike: the loop under the magnet still leaves N
 * and enters S, so it is NOT the mirror of the loop above it.
 */
export const EXTERNAL_FIELD_DEG =
  poleCentre(BAR_MAGNET_POLES.south) > poleCentre(BAR_MAGNET_POLES.north) ? 0 : 180;

const BAR_AXIS_Y = BAR_MAGNET_RECT.y + BAR_MAGNET_RECT.h / 2;

export type BarFieldArc = {
  d: string;
  points: [number, number][];
  /** Where the arrowhead goes, and the tangent heading of the curve there. */
  arrow: FieldArrow;
  /** Distance from the magnet's axis where the line meets the north pole. */
  poleOffset: number;
  /** Greatest distance the line reaches from the magnet's axis. */
  apexOffset: number;
};

/** A magnetic pole treated as a point source, `q` positive for north. */
export type PointPole = { x: number; y: number; q: number };

/**
 * The two poles of the bar magnet, at the centre of each end face.
 */
const BAR_POLE_SOURCES: PointPole[] = [
  { x: BAR_MAGNET_RECT.x, y: BAR_AXIS_Y, q: 1 },
  { x: BAR_MAGNET_RECT.x + BAR_MAGNET_RECT.w, y: BAR_AXIS_Y, q: -1 },
];

/** Unit field vector of a set of point poles. */
function fieldDirection(poles: PointPole[], x: number, y: number): [number, number] {
  let fx = 0;
  let fy = 0;
  for (const pole of poles) {
    const dx = x - pole.x;
    const dy = y - pole.y;
    const r = Math.hypot(dx, dy);
    if (r < 1e-6) continue;
    const k = pole.q / (r * r * r);
    fx += k * dx;
    fy += k * dy;
  }
  const mag = Math.hypot(fx, fy);
  return mag < 1e-12 ? [0, 0] : [fx / mag, fy / mag];
}

/** The frame both magnet figures are drawn in. */
const MAGNET_VIEWBOX = { x: 320, y: 150 } as const;

/**
 * Traces one field line away from a north pole, following the field itself with
 * a fourth-order Runge-Kutta step, until it arrives at a south pole or leaves
 * the frame.
 *
 * Tracing rather than drawing is what makes the properties these figures have
 * to demonstrate true rather than merely intended. Distinct streamlines of a
 * field can never cross — that would need two field directions at one point —
 * their spacing IS the field strength, so lines crowd where the field is strong
 * and open out where it is weak, and they cannot pass through a neutral point
 * because the field there is zero and the trace simply never goes near it. Each
 * of those is a property the chapter states in words; here the picture is
 * generated from the same physics rather than hand-drawn to resemble it.
 */
export function traceFieldLine(
  poles: PointPole[],
  from: PointPole,
  launchDeg: number,
  /** 1 follows the field away from `from`; -1 walks against it, into `from`. */
  sign: 1 | -1 = 1,
): [number, number][] {
  const seed = 4.5;
  const step = 1.6 * sign;
  const t = (launchDeg * Math.PI) / 180;
  let x = from.x + seed * Math.cos(t);
  // Screen y grows downward, so a positive launch angle rises up the picture.
  let y = from.y - seed * Math.sin(t);
  const points: [number, number][] = [[x, y]];
  for (let n = 0; n < 1400; n += 1) {
    const [k1x, k1y] = fieldDirection(poles, x, y);
    const [k2x, k2y] = fieldDirection(poles, x + (step / 2) * k1x, y + (step / 2) * k1y);
    const [k3x, k3y] = fieldDirection(poles, x + (step / 2) * k2x, y + (step / 2) * k2y);
    const [k4x, k4y] = fieldDirection(poles, x + step * k3x, y + step * k3y);
    x += (step / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
    y += (step / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
    if (x < 2 || x > MAGNET_VIEWBOX.x - 2 || y < 2 || y > MAGNET_VIEWBOX.y - 2) break;
    points.push([x, y]);
    if (poles.some((pole) => pole !== from && Math.hypot(x - pole.x, y - pole.y) < seed)) break;
  }
  // Always hand back the line in the direction the field runs, so an arrowhead
  // taken from consecutive points points the right way either way it was traced.
  return sign === 1 ? points : points.reverse();
}

/** Turns a traced line into an SVG path plus one arrowhead at its midpoint. */
function toFieldPath(points: [number, number][]): { d: string; arrow: FieldArrow } {
  const mid = Math.max(1, Math.floor(points.length / 2));
  const [ax, ay] = points[mid];
  const [bx, by] = points[Math.min(points.length - 1, mid + 1)];
  return {
    d: `M${points.map(([px, py]) => `${px.toFixed(2)},${py.toFixed(2)}`).join(" L")}`,
    arrow: { x: ax, y: ay, deg: normaliseDeg(degOf(bx - ax, by - ay)) },
  };
}

/**
 * The bar magnet's external field: three traced lines above the magnet and
 * their mirror images below.
 *
 * Launch angles are chosen so the innermost line skims the magnet and the
 * outermost swings well past both ends, which is what puts many lines into the
 * small region beside each pole and few into the large region far away — the
 * "closer lines mean a stronger field" rule, drawn rather than asserted.
 */
export const BAR_FIELD_ARCS: BarFieldArc[] = [34, 62, 86].flatMap((launch) =>
  [1, -1].map((side) => {
    const points = traceFieldLine(BAR_POLE_SOURCES, BAR_POLE_SOURCES[0], side * launch);
    return {
      ...toFieldPath(points),
      points,
      poleOffset: Math.abs(points[0][1] - BAR_AXIS_Y),
      apexOffset: points.reduce((best, [, py]) => Math.max(best, Math.abs(py - BAR_AXIS_Y)), 0),
    };
  }),
);

// ---------------------------------------------------------------------------
// Two like poles: the neutral point
// ---------------------------------------------------------------------------

/** Where the two magnets sit, and the neutral point between their like poles. */
export const LIKE_POLES = {
  left: { x: 40, y: 64, w: 72, h: 22 },
  right: { x: 208, y: 64, w: 72, h: 22 },
  /** Midway between the two facing poles, on the axis. */
  neutral: { x: 160, y: 75 },
} as const;

export type LikePoleArc = { d: string; points: [number, number][]; arrow: FieldArrow };

/**
 * The four poles of the two-magnet arrangement. Both magnets present a SOUTH
 * pole to the gap — the like-pole configuration — so the neutral point sits
 * midway between them, where their two fields are equal and opposite.
 */
const LIKE_POLE_SOURCES: PointPole[] = [
  { x: LIKE_POLES.left.x, y: LIKE_POLES.neutral.y, q: 1 },
  { x: LIKE_POLES.left.x + LIKE_POLES.left.w, y: LIKE_POLES.neutral.y, q: -1 },
  { x: LIKE_POLES.right.x, y: LIKE_POLES.neutral.y, q: -1 },
  { x: LIKE_POLES.right.x + LIKE_POLES.right.w, y: LIKE_POLES.neutral.y, q: 1 },
];

/**
 * The field around two magnets whose like poles face each other, traced from
 * the outer north pole of each.
 *
 * The previous drawing put hand-placed arcs from both magnets into the middle
 * of the gap, so lines ran together at the very point the caption calls a
 * neutral point. Tracing removes that class of mistake outright: a streamline
 * follows the resultant field, so it bends away from the midline exactly as far
 * as the opposing magnet pushes it, two of them can never meet, and none can
 * reach a point where the field is zero.
 */
export const LIKE_POLE_ARCS: LikePoleArc[] = [
  // Lines that loop over each magnet's own body, from its north end back to the
  // south end it presents to the gap.
  ...[34, 66].flatMap((launch) =>
    [1, -1].flatMap((vertical) =>
      [0, 3].map((sourceIndex) => {
        const from = LIKE_POLE_SOURCES[sourceIndex];
        // The right magnet is the mirror image of the left one.
        const mirrored = sourceIndex === 3 ? 180 - launch : launch;
        return traceFieldLine(LIKE_POLE_SOURCES, from, vertical * mirrored);
      }),
    ),
  ),
  // The lines the figure is really about: traced backwards out of each facing
  // south pole, so they show how the field arrives through the gap. It comes
  // down from above and below, then turns hard aside into one pole or the
  // other — which is the shape a neutral point makes, and the reason no line
  // reaches the middle.
  ...[46, 72, 100].flatMap((launch) =>
    [1, -1].flatMap((vertical) =>
      [1, 2].map((sinkIndex) => {
        const into = LIKE_POLE_SOURCES[sinkIndex];
        const mirrored = sinkIndex === 2 ? 180 - launch : launch;
        return traceFieldLine(LIKE_POLE_SOURCES, into, vertical * mirrored, -1);
      }),
    ),
  ),
].map((points) => ({ ...toFieldPath(points), points }));

/**
 * Smallest distance from the neutral point to any point on the like-pole field
 * lines. Exists so a test can assert the neutral region really is empty rather
 * than trusting the curves to look right.
 */
export function likePoleClearance(): number {
  const { neutral } = LIKE_POLES;
  let best = Infinity;
  for (const arc of LIKE_POLE_ARCS) {
    for (const [x, y] of arc.points) {
      best = Math.min(best, Math.hypot(x - neutral.x, y - neutral.y));
    }
  }
  return best;
}

/** Do segments p->p2 and q->q2 properly cross? Touching at an end does not count. */
function segmentsCross(
  [px, py]: [number, number],
  [p2x, p2y]: [number, number],
  [qx, qy]: [number, number],
  [q2x, q2y]: [number, number],
): boolean {
  const rx = p2x - px;
  const ry = p2y - py;
  const sx = q2x - qx;
  const sy = q2y - qy;
  const denom = rx * sy - ry * sx;
  if (Math.abs(denom) < 1e-12) return false;
  const t = ((qx - px) * sy - (qy - py) * sx) / denom;
  const u = ((qx - px) * ry - (qy - py) * rx) / denom;
  return t > 1e-9 && t < 1 - 1e-9 && u > 1e-9 && u < 1 - 1e-9;
}

/**
 * True when two polylines actually cross — one passing through the other —
 * rather than merely running close together. The distinction matters: field
 * lines crowding near a pole is the lesson, two field lines intersecting is the
 * error, and a plain distance threshold cannot tell them apart.
 */
export function polylinesCross(pa: [number, number][], pb: [number, number][]): boolean {
  for (let i = 0; i + 1 < pa.length; i += 1) {
    for (let j = 0; j + 1 < pb.length; j += 1) {
      if (segmentsCross(pa[i], pa[i + 1], pb[j], pb[j + 1])) return true;
    }
  }
  return false;
}
