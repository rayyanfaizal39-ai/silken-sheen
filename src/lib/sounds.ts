// Lightweight Web Audio sound effects — no assets needed.
/* eslint-disable no-empty, @typescript-eslint/no-explicit-any */
// Subtle UI feedback: hover, click, and level-up.

let ctx: AudioContext | null = null;
let muted = false;
let volumeMultiplier = 1;
let lastHover = 0;
let lastClick = 0;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (muted) return null;
  if (!ctx) {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
    } catch {
      return null;
    }
  }
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

function tone(
  freq: number,
  duration = 0.08,
  type: OscillatorType = "sine",
  gain = 0.05,
  freqEnd?: number,
) {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (freqEnd !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), t0 + duration);
  }
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain * volumeMultiplier, t0 + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

export const sfx = {
  hover() {
    const now = Date.now();
    if (now - lastHover < 60) return; // throttle
    lastHover = now;
    tone(880, 0.05, "sine", 0.018);
  },
  click() {
    const now = Date.now();
    if (now - lastClick < 40) return;
    lastClick = now;
    tone(520, 0.07, "triangle", 0.05, 260);
  },
  success() {
    tone(660, 0.09, "triangle", 0.05);
    setTimeout(() => tone(880, 0.12, "triangle", 0.05), 80);
  },
  levelUp() {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C
    notes.forEach((f, i) => setTimeout(() => tone(f, 0.18, "triangle", 0.06), i * 90));
  },
  combo(n: number) {
    const base = 440 + Math.min(n, 8) * 80;
    tone(base, 0.1, "square", 0.04);
    setTimeout(() => tone(base * 1.5, 0.12, "triangle", 0.05), 70);
  },
  perfect() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((f, i) => setTimeout(() => tone(f, 0.22, "triangle", 0.07), i * 80));
  },
  whoosh() {
    tone(720, 0.22, "sine", 0.045, 180);
  },
  ding() {
    tone(880, 0.1, "triangle", 0.06);
    setTimeout(() => tone(1318.5, 0.18, "triangle", 0.055), 70);
  },
  whomp() {
    tone(220, 0.22, "sine", 0.05, 90);
  },
  fanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];
    notes.forEach((f, i) => setTimeout(() => tone(f, 0.26, "triangle", 0.07), i * 95));
  },
  streak(n: number) {
    const base = 520 + Math.min(n, 12) * 60;
    tone(base, 0.12, "triangle", 0.05);
    setTimeout(() => tone(base * 1.5, 0.16, "triangle", 0.055), 90);
    if (n >= 10) setTimeout(() => tone(base * 2, 0.18, "triangle", 0.06), 180);
  },
  setMuted(v: boolean) {
    muted = v;
  },
  setVolume(v: number) {
    volumeMultiplier = Math.max(0, Math.min(1, v));
  },
  isMuted() {
    return muted;
  },
};

export function initSfxPreference() {
  if (typeof window === "undefined") return;
  try {
    muted = localStorage.getItem("learnnova-sfx-muted") === "1";
  } catch {}
}

export function toggleSfxMuted() {
  muted = !muted;
  try {
    localStorage.setItem("learnnova-sfx-muted", muted ? "1" : "0");
  } catch {}
  return muted;
}

// Ambient background music has moved to src/lib/bg-music.ts (adaptive engine).
