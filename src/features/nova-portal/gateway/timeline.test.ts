import { describe, expect, it } from "vitest";
import {
  DEPTH,
  GATEWAY_MS,
  SCENE,
  cameraZ,
  gateGlow,
  layerScale,
  nightfall,
  passOpacity,
  phaseAt,
  sceneUnit,
  vortexOpen,
} from "./timeline";

describe("Celestial Gateway timeline", () => {
  it("runs arrival, awakening, opening and entering within 4.5 seconds", () => {
    expect([0, 999, 1000, 1999, 2000, 2999, 3000, 4499].map(phaseAt)).toEqual([
      "arrival",
      "arrival",
      "awakening",
      "awakening",
      "opening",
      "opening",
      "entering",
      "entering",
    ]);
    expect(GATEWAY_MS.end).toBe(4500);
  });

  it("keeps the gate dark on arrival, lights it on awakening and opens the vortex after", () => {
    expect(gateGlow(500)).toBe(0);
    expect(gateGlow(2000)).toBeCloseTo(0.5);
    expect(gateGlow(3000)).toBe(1);
    expect(vortexOpen(1000)).toBeLessThan(0.2);
    expect(vortexOpen(3000)).toBe(1);
  });

  it("starts the camera at 2s, accelerates through 3–4.5s and passes through the ring", () => {
    expect(cameraZ(2000)).toBeCloseTo(0);
    const early = cameraZ(3000) - cameraZ(2000);
    const late = cameraZ(4500) - cameraZ(3500);
    expect(late).toBeGreaterThan(early * 4);
    const ringOnScreen = (ms: number) =>
      SCENE.portalRadius * layerScale(DEPTH.gate, cameraZ(ms)) * sceneUnit(1920, 1080);
    // By the end the opening is far wider than the screen's diagonal from the vanishing point.
    expect(ringOnScreen(GATEWAY_MS.end)).toBeGreaterThan(Math.hypot(960, 1080 * 0.56) * 3);
  });

  it("moves near layers faster than far ones, and dissolves them as they pass", () => {
    const z = cameraZ(3300);
    const scales = [DEPTH.far, DEPTH.gate, DEPTH.lanterns, DEPTH.trees].map((d) =>
      layerScale(d, z),
    );
    expect(scales[1]).toBeGreaterThan(scales[0]);
    expect(scales[2]).toBeGreaterThan(scales[1]);
    expect(scales[3]).toBeGreaterThan(scales[2]);
    expect(layerScale(DEPTH.trees, cameraZ(GATEWAY_MS.end))).toBe(0);
    expect(passOpacity(1)).toBe(1);
    expect(passOpacity(8)).toBe(0);
  });

  it("ends in the Studio's navy rather than a flash of light", () => {
    expect(nightfall(3000)).toBe(0);
    expect(nightfall(GATEWAY_MS.end)).toBe(1);
  });

  it("frames the whole gate on phones and fills wide screens", () => {
    const phone = sceneUnit(390, 844);
    expect(560 * phone).toBeLessThanOrEqual(390);
    expect(1900 * phone).toBeGreaterThanOrEqual(844);
    const desktop = sceneUnit(1920, 1080);
    expect(1600 * desktop).toBeGreaterThanOrEqual(1920);
  });
});
