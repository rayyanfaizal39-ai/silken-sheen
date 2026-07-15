// Adaptive background music engine for AcadeMY.
/* eslint-disable no-empty, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-expressions */
// - Auto-plays a section-appropriate lo-fi track after the first user interaction.
// - Crossfades between sections (home / quiz / flashcards / notes).
// - Automatically ducks when videos, other audio, or speech synthesis play.
// - No UI. Users cannot directly control it (Shift+M mute is a hidden fallback).

export type Section = "home" | "quiz" | "flashcards" | "notes";

type TrackConfig = {
  url: string;
  volume: number; // 0..1 target volume for this section
};

// Curated CC-BY lo-fi tracks. Swap URLs to change the identity.
// (When ElevenLabs Music is wired in later, generate 4 files and replace these URLs.)
const TRACKS: Record<Section, TrackConfig> = {
  home: {
    url: "https://archive.org/download/cozy-alone-lofi-chill-out-beats/Cozy%20Alone%20Lofi%20Chill%20Out%20Beats%20Music%20Mix.mp3",
    volume: 0.18,
  },
  quiz: {
    // Slightly more energetic lo-fi mix
    url: "https://archive.org/download/lofi-hip-hop-radio-beats-to-relaxstudy-to/Lofi%20Hip%20Hop%20Radio%20-%20Beats%20To%20Relax_Study%20To.mp3",
    volume: 0.2,
  },
  flashcards: {
    // Calm ambient piano — for memorisation sessions
    url: "https://archive.org/download/jamendo-418019/01-1684726-DHDMusic-Ambient%20Soft%20Piano.mp3",
    volume: 0.15,
  },
  notes: {
    // Softest variant — use home track at lower volume for consistent identity
    url: "https://archive.org/download/cozy-alone-lofi-chill-out-beats/Cozy%20Alone%20Lofi%20Chill%20Out%20Beats%20Music%20Mix.mp3",
    volume: 0.14,
  },
};

const MUTE_KEY = "academy-bg-music-muted";
const FADE_IN_MS = 2000;
const CROSSFADE_MS = 1800;
const DUCK_MS = 400;
const UNDUCK_MS = 800;
const DUCK_MULTIPLIER = 0.05; // near-silent while ducked

type EngineState = {
  currentSection: Section | null;
  currentAudio: HTMLAudioElement | null;
  nextAudio: HTMLAudioElement | null;
  muted: boolean;
  initialised: boolean;
  duckReasons: Set<string>;
  fadeTimers: WeakMap<HTMLAudioElement, number>;
};

let engine: EngineState | null = null;
let preferenceVolume = 1;
let enabledSections: Record<Section, boolean> = {
  home: true,
  quiz: true,
  flashcards: true,
  notes: true,
};

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function ensureEngine(): EngineState | null {
  if (!isBrowser()) return null;
  if (engine) return engine;
  let muted = false;
  try {
    muted = window.localStorage.getItem(MUTE_KEY) === "1";
  } catch {}
  engine = {
    currentSection: null,
    currentAudio: null,
    nextAudio: null,
    muted,
    initialised: false,
    duckReasons: new Set(),
    fadeTimers: new WeakMap(),
  };
  installGlobalListeners(engine);
  installUnlockOnce(engine);
  installKeyboardShortcut(engine);
  return engine;
}

function cancelFade(e: EngineState, audio: HTMLAudioElement) {
  const t = e.fadeTimers.get(audio);
  if (t) {
    window.clearInterval(t);
    e.fadeTimers.delete(audio);
  }
}

function fadeTo(
  e: EngineState,
  audio: HTMLAudioElement,
  target: number,
  durationMs: number,
  onDone?: () => void,
) {
  cancelFade(e, audio);
  const start = audio.volume;
  const delta = target - start;
  const steps = Math.max(1, Math.round(durationMs / 40));
  let i = 0;
  const id = window.setInterval(() => {
    i += 1;
    const t = Math.min(1, i / steps);
    // easeInOutQuad
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    try {
      audio.volume = Math.max(0, Math.min(1, start + delta * eased));
    } catch {}
    if (i >= steps) {
      window.clearInterval(id);
      e.fadeTimers.delete(audio);
      onDone?.();
    }
  }, 40);
  e.fadeTimers.set(audio, id);
}

function targetVolumeFor(e: EngineState, section: Section): number {
  if (e.muted || !enabledSections[section]) return 0;
  const base = TRACKS[section].volume * preferenceVolume;
  if (e.duckReasons.size > 0) return base * DUCK_MULTIPLIER;
  return base;
}

function createAudio(url: string): HTMLAudioElement {
  const a = new Audio();
  a.src = url;
  a.loop = true;
  a.preload = "auto";
  a.crossOrigin = "anonymous";
  a.volume = 0;
  // Mark so our own audio isn't caught by the media-duck listener.
  (a as any).dataset && ((a as any).dataset.bgMusic = "1");
  return a;
}

function isBgMusicElement(node: EventTarget | null): boolean {
  if (!(node instanceof HTMLMediaElement)) return false;
  const e = ensureEngine();
  if (!e) return false;
  return node === e.currentAudio || node === e.nextAudio;
}

function installUnlockOnce(e: EngineState) {
  const unlock = () => {
    e.initialised = true;
    // If a section was set before user interacted, start it now.
    if (e.currentSection && !e.currentAudio) {
      startInitial(e, e.currentSection);
    } else if (e.currentAudio && e.currentAudio.paused && !e.muted) {
      e.currentAudio.play().catch(() => {});
    }
  };
  const opts = { once: true, passive: true } as AddEventListenerOptions;
  window.addEventListener("pointerdown", unlock, opts);
  window.addEventListener("keydown", unlock, opts);
  window.addEventListener("touchstart", unlock, opts);
}

function installGlobalListeners(e: EngineState) {
  // Any <video> or non-bg <audio> playing = duck.
  const onPlay = (ev: Event) => {
    const t = ev.target;
    if (!(t instanceof HTMLMediaElement)) return;
    if (isBgMusicElement(t)) return;
    duck(`media:${t.tagName}`);
    const cleanup = () => {
      unduck(`media:${t.tagName}`);
      t.removeEventListener("pause", cleanup);
      t.removeEventListener("ended", cleanup);
      t.removeEventListener("emptied", cleanup);
    };
    t.addEventListener("pause", cleanup);
    t.addEventListener("ended", cleanup);
    t.addEventListener("emptied", cleanup);
  };
  document.addEventListener("play", onPlay, true);

  // speechSynthesis — Cikgu AI read-aloud
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    const originalSpeak = synth.speak.bind(synth);
    synth.speak = (utterance: SpeechSynthesisUtterance) => {
      duck("speech");
      const clear = () => unduck("speech");
      utterance.addEventListener("end", clear);
      utterance.addEventListener("error", clear);
      utterance.addEventListener("cancel", clear);
      return originalSpeak(utterance);
    };
    // Also unduck if speech is cancelled globally.
    const origCancel = synth.cancel.bind(synth);
    synth.cancel = () => {
      unduck("speech");
      return origCancel();
    };
  }
}

function installKeyboardShortcut(e: EngineState) {
  window.addEventListener("keydown", (ev) => {
    if (
      ev.shiftKey &&
      (ev.key === "M" || ev.key === "m") &&
      !ev.metaKey &&
      !ev.ctrlKey &&
      !ev.altKey
    ) {
      // Ignore when typing in inputs.
      const active = document.activeElement as HTMLElement | null;
      if (
        active &&
        (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)
      )
        return;
      toggleMute();
    }
  });
}

function startInitial(e: EngineState, section: Section) {
  const cfg = TRACKS[section];
  const audio = createAudio(cfg.url);
  e.currentAudio = audio;
  e.currentSection = section;
  audio.play().then(
    () => {
      fadeTo(e, audio, targetVolumeFor(e, section), FADE_IN_MS);
    },
    () => {
      // Autoplay blocked — will retry on next user interaction via unlock handler.
    },
  );
}

function crossfadeTo(e: EngineState, section: Section) {
  const cfg = TRACKS[section];
  const prev = e.currentAudio;
  const prevSection = e.currentSection;

  // Same URL and section? Just adjust volume.
  if (prev && prevSection && TRACKS[prevSection].url === cfg.url) {
    e.currentSection = section;
    fadeTo(e, prev, targetVolumeFor(e, section), CROSSFADE_MS);
    return;
  }

  const next = createAudio(cfg.url);
  e.nextAudio = next;
  e.currentSection = section;

  next.play().then(
    () => {
      fadeTo(e, next, targetVolumeFor(e, section), CROSSFADE_MS);
      if (prev) {
        fadeTo(e, prev, 0, CROSSFADE_MS, () => {
          try {
            prev.pause();
            prev.src = "";
            prev.load();
          } catch {}
        });
      }
      e.currentAudio = next;
      e.nextAudio = null;
    },
    () => {
      // If play fails, keep previous track.
      e.nextAudio = null;
    },
  );
}

// ---------- Public API ----------

export function setSection(section: Section) {
  const e = ensureEngine();
  if (!e) return;
  if (e.currentSection === section && e.currentAudio) return;

  if (!e.initialised || !e.currentAudio) {
    // Remember the section; will start on first user interaction.
    e.currentSection = section;
    if (e.initialised && !e.currentAudio) {
      startInitial(e, section);
    }
    return;
  }
  crossfadeTo(e, section);
}

export function duck(reason: string) {
  const e = ensureEngine();
  if (!e) return;
  const wasEmpty = e.duckReasons.size === 0;
  e.duckReasons.add(reason);
  if (wasEmpty && e.currentAudio && e.currentSection) {
    fadeTo(e, e.currentAudio, targetVolumeFor(e, e.currentSection), DUCK_MS);
  }
}

export function unduck(reason: string) {
  const e = ensureEngine();
  if (!e) return;
  if (!e.duckReasons.has(reason)) return;
  e.duckReasons.delete(reason);
  if (e.duckReasons.size === 0 && e.currentAudio && e.currentSection) {
    fadeTo(e, e.currentAudio, targetVolumeFor(e, e.currentSection), UNDUCK_MS);
  }
}

export function toggleMute(): boolean {
  const e = ensureEngine();
  if (!e) return false;
  e.muted = !e.muted;
  try {
    window.localStorage.setItem(MUTE_KEY, e.muted ? "1" : "0");
  } catch {}
  if (e.currentAudio && e.currentSection) {
    fadeTo(e, e.currentAudio, targetVolumeFor(e, e.currentSection), 400);
  }
  return e.muted;
}

export function isMuted(): boolean {
  const e = ensureEngine();
  return e?.muted ?? false;
}

export function configureMusic(options: {
  volume: number;
  home: boolean;
  quiz: boolean;
  flashcards: boolean;
}) {
  preferenceVolume = Math.max(0, Math.min(1, options.volume));
  enabledSections = {
    home: options.home,
    quiz: options.quiz,
    flashcards: options.flashcards,
    notes: options.home,
  };
  const e = ensureEngine();
  if (e?.currentAudio && e.currentSection)
    fadeTo(e, e.currentAudio, targetVolumeFor(e, e.currentSection), 200);
}

export function sectionFromPath(pathname: string): Section {
  if (!pathname) return "home";
  const p = pathname.toLowerCase();
  if (p.startsWith("/quizzes") || p.startsWith("/quiz")) return "quiz";
  if (p.startsWith("/flashcards") || p.startsWith("/flashcard")) return "flashcards";
  if (p.startsWith("/notes") || p.startsWith("/note")) return "notes";
  return "home";
}
