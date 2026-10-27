/**
 * The Celestial Gateway's single clock. Every layer, canvas and React phase reads from these
 * pure functions, so the sequence stays in sync and can be tested without a browser.
 */

export const GATEWAY_MS = {
  awakening: 1000,
  opening: 2000,
  entering: 3000,
  end: 4500,
} as const;

/** Reduced motion: hold a still, lit frame, then cross-fade to the Studio's darkness. */
export const CALM_HOLD_MS = 1200;
export const CALM_FADE_MS = 400;

export type GatewayPhase = "arrival" | "awakening" | "opening" | "entering";

export function phaseAt(ms: number): GatewayPhase {
  if (ms < GATEWAY_MS.awakening) return "arrival";
  if (ms < GATEWAY_MS.opening) return "awakening";
  if (ms < GATEWAY_MS.entering) return "opening";
  return "entering";
}

/** Scene units: the gateway is drawn in a 1600 × 900 frame with sky above and floor below. */
export const SCENE = {
  width: 1600,
  top: -500,
  height: 1900,
  centreX: 800,
  centreY: 400,
  portalRadius: 205,
  /** The portal centre sits this far down the viewport; it is also the camera's vanishing point. */
  horizon: 0.44,
} as const;

/** Depths from the starting camera. The gate plane is 10; smaller numbers are nearer. */
export const DEPTH = {
  sky: 120,
  far: 38,
  gate: 10,
  mist: 9,
  floor: 5.5,
  lanterns: 4.4,
  trees: 2.6,
  foreground: 1.7,
} as const;

/** Pixels per scene unit: fills landscape screens, but keeps the whole gate visible on phones. */
export function sceneUnit(width: number, height: number) {
  const cover = Math.max(width / SCENE.width, height / 900);
  return Math.max(Math.min(cover, width / 720), height / 1700);
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smoothstep = (from: number, to: number, v: number) => {
  const x = clamp01((v - from) / (to - from));
  return x * x * (3 - 2 * x);
};

const CAMERA_START = -0.7;
const CAMERA_END = 9.72;

/** Drifts gently into the forest, then begins moving at 2s and accelerates through the gate. */
export function cameraZ(ms: number) {
  if (ms <= GATEWAY_MS.opening) {
    const p = clamp01(ms / GATEWAY_MS.opening);
    return CAMERA_START * (1 - Math.sin((p * Math.PI) / 2));
  }
  const p = clamp01((ms - GATEWAY_MS.opening) / (GATEWAY_MS.end - GATEWAY_MS.opening));
  return CAMERA_END * p ** 2.4;
}

/** Perspective scale of a layer at `depth` around the vanishing point; 0 once the camera passes it. */
export function layerScale(depth: number, z: number) {
  const distance = depth - z;
  return distance <= 0.05 ? 0 : depth / distance;
}

/** Near layers dissolve as they rush past the camera instead of filling the screen. */
export function passOpacity(scale: number) {
  return scale === 0 ? 0 : 1 - smoothstep(2.6, 5.5, scale);
}

/** How strongly the gate's gold markings and light are lit (0–1). */
export const gateGlow = (ms: number) =>
  0.5 * smoothstep(900, 2000, ms) + 0.5 * smoothstep(2000, 2800, ms);

/** How open and luminous the vortex is (0–1). */
export const vortexOpen = (ms: number) => 0.14 + 0.86 * smoothstep(1500, 2800, ms);

/** Spiral motes gather towards the centre from the awakening onwards (0–1). */
export const spiralGather = (ms: number) => smoothstep(1000, 1800, ms);

/** Inside the portal the light gives way to the Studio's deep navy (0–1). */
export const nightfall = (ms: number) => smoothstep(3700, GATEWAY_MS.end, ms);

/** The opening fade from darkness into the forest (0–1). */
export const arrival = (ms: number) => smoothstep(0, 650, ms);
