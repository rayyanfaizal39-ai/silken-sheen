import {
  DEPTH,
  SCENE,
  layerScale,
  nightfall,
  smoothstep,
  spiralGather,
  vortexOpen,
} from "./timeline";

/** Viewport geometry shared by every renderer: size, pixels per scene unit and the vanishing point. */
export type View = { width: number; height: number; unit: number; vx: number; vy: number };

export type Renderer = { resize(view: View): void; draw(ms: number, z: number, dt: number): void };

const TAU = Math.PI * 2;
const MAX_RATIO = 1.5;

function fit(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, view: View) {
  const ratio = Math.min(window.devicePixelRatio || 1, MAX_RATIO);
  canvas.width = Math.max(1, Math.round(view.width * ratio));
  canvas.height = Math.max(1, Math.round(view.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return ratio;
}

type Rgb = [number, number, number];
const NAVY: Rgb = [5, 7, 15];
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const rgba = ([r, g, b]: Rgb, alpha = 1) =>
  `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${alpha})`;

/* ── Sky: galaxy band, moon, twinkling stars and one shooting star ─────────────────────────── */

export function createSky(canvas: HTMLCanvasElement): Renderer | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  let view: View = { width: 0, height: 0, unit: 1, vx: 0, vy: 0 };
  let backdrop: HTMLCanvasElement | null = null;
  let stars: { x: number; y: number; r: number; phase: number; speed: number }[] = [];

  function paintBackdrop(ratio: number) {
    const { width: w, height: h, unit: u, vx, vy } = view;
    const layer = document.createElement("canvas");
    layer.width = canvas.width;
    layer.height = canvas.height;
    const g = layer.getContext("2d");
    if (!g) return null;
    g.setTransform(ratio, 0, 0, ratio, 0, 0);
    g.globalCompositeOperation = "lighter";
    const band = (t: number) => {
      const a = (1 - t) ** 2;
      const b = 2 * (1 - t) * t;
      const c = t * t;
      return {
        x: a * (vx - 760 * u) + b * (vx - 420 * u) + c * (vx + 40 * u),
        y: a * (vy - 520 * u) + b * (vy - 380 * u) + c * (vy - 120 * u),
      };
    };
    const tints: Rgb[] = [
      [96, 1, 209],
      [67, 56, 202],
      [139, 92, 246],
      [168, 85, 247],
    ];
    for (let i = 0; i < 46; i++) {
      const p = band(i / 45);
      const r = (70 + Math.random() * 150) * u;
      const glow = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      glow.addColorStop(0, rgba(tints[i % tints.length], 0.06 + Math.random() * 0.06));
      glow.addColorStop(1, rgba(tints[i % tints.length], 0));
      g.fillStyle = glow;
      g.fillRect(p.x - r, p.y - r, r * 2, r * 2);
    }
    for (let i = 0; i < 700; i++) {
      const p = band(Math.random());
      const spread = 90 * u * (Math.random() + Math.random() - 1);
      g.fillStyle = `rgba(226,220,255,${0.12 + Math.random() * 0.4})`;
      g.fillRect(p.x + spread, p.y + spread * 0.6, 1, 1);
    }
    const mx = Math.min(vx + 635 * u, w * 0.86);
    const my = Math.max(vy - 290 * u, h * 0.06);
    const mr = 52 * u;
    const halo = g.createRadialGradient(mx, my, mr * 0.8, mx, my, mr * 3.2);
    halo.addColorStop(0, "rgba(167,139,250,0.2)");
    halo.addColorStop(1, "rgba(167,139,250,0)");
    g.fillStyle = halo;
    g.fillRect(mx - mr * 3.2, my - mr * 3.2, mr * 6.4, mr * 6.4);
    g.globalCompositeOperation = "source-over";
    const disc = g.createRadialGradient(mx - mr * 0.4, my - mr * 0.3, mr * 0.1, mx, my, mr);
    disc.addColorStop(0, "#e6dcff");
    disc.addColorStop(0.6, "#9886d4");
    disc.addColorStop(1, "#4a3a82");
    g.fillStyle = disc;
    g.beginPath();
    g.arc(mx, my, mr, 0, TAU);
    g.fill();
    g.save();
    g.clip();
    g.fillStyle = "rgba(12,10,32,0.72)";
    g.beginPath();
    g.arc(mx + mr * 0.5, my - mr * 0.12, mr * 0.95, 0, TAU);
    g.fill();
    g.restore();
    return layer;
  }

  return {
    resize(next) {
      view = next;
      const ratio = fit(canvas, ctx, view);
      backdrop = paintBackdrop(ratio);
      stars = Array.from({ length: Math.round(140 + (view.width * view.height) / 9000) }, () => ({
        x: Math.random() * view.width,
        y: Math.random() * view.height * 0.8,
        r: Math.random() * 1.2 + 0.25,
        phase: Math.random() * TAU,
        speed: 700 + Math.random() * 900,
      }));
    },
    draw(ms, z) {
      const { width: w, height: h, vx, vy } = view;
      const s = layerScale(DEPTH.sky, z);
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(vx, vy);
      ctx.scale(s, s);
      ctx.translate(-vx, -vy);
      if (backdrop) ctx.drawImage(backdrop, 0, 0, w, h);
      for (const star of stars) {
        const twinkle = 0.35 + 0.65 * Math.sin(ms / star.speed + star.phase) ** 2;
        ctx.fillStyle = `rgba(226,224,250,${0.2 + 0.7 * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
      const shot = (ms - 300) / 900;
      if (shot > 0 && shot < 1) {
        const x = w * (0.94 - 0.3 * shot);
        const y = h * (0.05 + 0.16 * shot);
        const tail = ctx.createLinearGradient(x, y, x + w * 0.09, y - h * 0.05);
        const alpha = Math.sin(shot * Math.PI);
        tail.addColorStop(0, `rgba(255,240,210,${0.9 * alpha})`);
        tail.addColorStop(1, "rgba(167,139,250,0)");
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w * 0.09, y - h * 0.05);
        ctx.stroke();
      }
    },
  };
}

/* ── Vortex: a living galaxy inside the ring, redrawn crisply at every camera distance ─────── */

export function createVortex(canvas: HTMLCanvasElement): Renderer | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  let view: View = { width: 0, height: 0, unit: 1, vx: 0, vy: 0 };
  let spin = 0;
  const arms = 3;
  const motes = Array.from({ length: 640 }, (_, i) => ({
    arm: i % arms,
    f: Math.random(),
    jitter: (Math.random() - 0.5) * (Math.random() < 0.3 ? 1.4 : 0.5),
    speed: 0.00006 + Math.random() * 0.00008,
    size: 0.6 + Math.random() * 1.6,
    warm: Math.random(),
  }));

  return {
    resize(next) {
      view = next;
      fit(canvas, ctx, view);
    },
    draw(ms, z, dt) {
      const { width: w, height: h, unit: u, vx, vy } = view;
      ctx.clearRect(0, 0, w, h);
      const s = layerScale(DEPTH.gate, z);
      const reach = Math.hypot(Math.max(vx, w - vx), Math.max(vy, h - vy));
      const R = s === 0 ? reach * 2 : SCENE.portalRadius * u * s;
      if (R < 2) return;
      const open = vortexOpen(ms);
      const dark = nightfall(ms);
      const light = open * (1 - dark);
      spin += dt * (0.00028 + 0.0011 * open + 0.002 * dark);

      ctx.save();
      if (R < reach) {
        ctx.beginPath();
        ctx.arc(vx, vy, R, 0, TAU);
        ctx.clip();
      }
      const shade = (dim: Rgb, bright: Rgb) => mix(mix(dim, bright, open), NAVY, dark);
      const base = ctx.createRadialGradient(vx, vy, 0, vx, vy, R);
      base.addColorStop(0, rgba(shade([40, 26, 82], [255, 241, 207])));
      base.addColorStop(0.16, rgba(shade([36, 22, 74], [246, 202, 120])));
      base.addColorStop(0.42, rgba(shade([24, 16, 58], [109, 40, 217])));
      base.addColorStop(0.78, rgba(shade([14, 11, 40], [40, 18, 92])));
      base.addColorStop(1, rgba(shade([8, 8, 24], [12, 10, 34])));
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      for (let k = 0; k < 7; k++) {
        const angle = spin * 0.7 + (k * TAU) / 7;
        const rr = R * (0.3 + 0.08 * (k % 4));
        const x = vx + Math.cos(angle) * rr;
        const y = vy + Math.sin(angle) * rr;
        const cloud = ctx.createRadialGradient(x, y, 0, x, y, R * 0.38);
        cloud.addColorStop(0, `rgba(${k % 2 ? "139,92,246" : "196,140,255"},${0.16 * light})`);
        cloud.addColorStop(1, "rgba(96,1,209,0)");
        ctx.fillStyle = cloud;
        ctx.fillRect(x - R * 0.38, y - R * 0.38, R * 0.76, R * 0.76);
      }

      const pull = 0.4 + open * 1.4 + dark * 3;
      const grow = Math.min(Math.max(s, 1), 7) * u;
      for (const m of motes) {
        m.f -= dt * m.speed * pull;
        if (m.f < 0.03) m.f = 1;
        const theta = (m.arm * TAU) / arms + spin + 2.4 * Math.log(1 / m.f) + m.jitter;
        const r = m.f * R;
        const x = vx + Math.cos(theta) * r;
        const y = vy + Math.sin(theta) * r;
        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;
        const near = 1 - m.f;
        const alpha = (0.18 + 0.82 * near) * Math.max(light, 0.12 * (1 - dark));
        ctx.fillStyle =
          m.f < 0.32 || m.warm > 0.82
            ? `rgba(255,226,170,${alpha})`
            : `rgba(${m.warm > 0.4 ? "196,170,255" : "150,110,255"},${alpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(x, y, m.size * grow * (0.5 + m.f), 0, TAU);
        ctx.fill();
      }

      const core = ctx.createRadialGradient(vx, vy, 0, vx, vy, R * 0.34);
      core.addColorStop(0, `rgba(255,244,220,${0.85 * light})`);
      core.addColorStop(0.4, `rgba(246,202,120,${0.35 * light})`);
      core.addColorStop(1, "rgba(246,202,120,0)");
      ctx.fillStyle = core;
      ctx.fillRect(vx - R * 0.34, vy - R * 0.34, R * 0.68, R * 0.68);

      ctx.globalCompositeOperation = "source-over";
      const rim = ctx.createRadialGradient(vx, vy, R * 0.82, vx, vy, R);
      rim.addColorStop(0, "rgba(5,7,15,0)");
      rim.addColorStop(1, `rgba(5,7,15,${0.55 * (1 - dark)})`);
      ctx.fillStyle = rim;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    },
  };
}

/* ── Motes: forest fireflies at many depths, and sparks spiralling into the gate ───────────── */

const MOTE_TINTS = ["255,222,165", "246,202,120", "196,170,255", "167,139,250"];

export function createMotes(canvas: HTMLCanvasElement): Renderer | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  let view: View = { width: 0, height: 0, unit: 1, vx: 0, vy: 0 };
  const float = (depthFrom: number) => ({
    x: (Math.random() - 0.5) * 1900,
    y: -420 + Math.random() * 1100,
    d: depthFrom + Math.random() * 11,
    phase: Math.random() * TAU,
    size: 0.8 + Math.random() * 1.8,
    tint: MOTE_TINTS[Math.floor(Math.random() * MOTE_TINTS.length)],
  });
  const ambient = Array.from({ length: 80 }, () => float(2.2));
  const spark = () => ({
    angle: Math.random() * TAU,
    radius: 300 + Math.random() * 520,
    speed: 0.05 + Math.random() * 0.08,
    spin: 0.0006 + Math.random() * 0.0008,
    size: 0.8 + Math.random() * 1.6,
    tint: MOTE_TINTS[Math.floor(Math.random() * MOTE_TINTS.length)],
  });
  const sparks = Array.from({ length: 130 }, spark);

  const dot = (x: number, y: number, r: number, tint: string, alpha: number) => {
    ctx.fillStyle = `rgba(${tint},${alpha * 0.18})`;
    ctx.beginPath();
    ctx.arc(x, y, r * 3, 0, TAU);
    ctx.fill();
    ctx.fillStyle = `rgba(${tint},${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
  };

  return {
    resize(next) {
      view = next;
      fit(canvas, ctx, view);
    },
    draw(ms, z, dt) {
      const { width: w, height: h, unit: u, vx, vy } = view;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const fade = 1 - nightfall(ms);

      for (const m of ambient) {
        m.y -= dt * 0.012;
        m.x += Math.sin(ms / 1300 + m.phase) * dt * 0.01;
        let s = layerScale(m.d, z);
        let x = vx + m.x * u * s;
        let y = vy + m.y * u * s;
        if (s === 0 || s > 7 || m.y < -460 || x < -40 || x > w + 40 || y < -40 || y > h + 40) {
          Object.assign(m, float(z + 3));
          s = layerScale(m.d, z);
          x = vx + m.x * u * s;
          y = vy + m.y * u * s;
        }
        const flicker = 0.35 + 0.5 * Math.sin(ms / 650 + m.phase) ** 2;
        const passing = 1 - smoothstep(3.5, 7, s);
        dot(x, y, Math.min(m.size * u * s, 9), m.tint, flicker * passing * fade);
      }

      const gather = spiralGather(ms);
      if (gather > 0) {
        const s = layerScale(DEPTH.gate, z);
        if (s > 0) {
          for (const p of sparks) {
            const inward = 1 - Math.min(1, (p.radius - 205) / 615);
            p.radius -= dt * p.speed * (1 + 2.5 * gather);
            p.angle += dt * p.spin * (1 + 5 * inward);
            if (p.radius < 205) Object.assign(p, spark(), { radius: 760 + Math.random() * 80 });
            const x = vx + Math.cos(p.angle) * p.radius * u * s;
            const y = vy + Math.sin(p.angle) * p.radius * u * s * 0.92;
            dot(x, y, p.size * u * Math.min(s, 4), p.tint, gather * (0.2 + 0.8 * inward) * fade);
          }
        }
      }
      ctx.globalCompositeOperation = "source-over";
    },
  };
}
