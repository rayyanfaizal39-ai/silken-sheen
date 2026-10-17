import { AUDIO_CUES } from "./audio-cues";

export type AudioCue = keyof typeof AUDIO_CUES;
export type AudioPreferences = { music: boolean; effects: boolean; volume: number };
export type AudioSnapshot = AudioPreferences & {
  musicStatus: "idle" | "loading" | "playing" | "paused" | "blocked";
  effect: AudioCue | null;
  message: string;
};
export const AUDIO_STORAGE_KEY = "academy.nova.audio.v1";
const defaults: AudioSnapshot = {
  music: false,
  effects: false,
  volume: 0.24,
  musicStatus: "idle",
  effect: null,
  message: "",
};
const priority = (cue: AudioCue) =>
  cue === "hover"
    ? 0
    : ["summon", "complete", "bond", "hatch"].includes(cue)
      ? 3
      : cue === "transition"
        ? 1
        : 2;

/** One route-owned mixer, one looping music source, one exclusive effects voice.
 * Original MP3 assets load only after an explicit audio choice/user gesture.
 * AudioBuffers keep the music independent of React renders and question changes.
 */
export class SanctuarySoundscape {
  private snapshot: AudioSnapshot = { ...defaults };
  private listeners = new Set<() => void>();
  private context: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private effectGain: GainNode | null = null;
  private musicSource: AudioBufferSourceNode | null = null;
  private retiring = new Set<AudioBufferSourceNode>();
  private effectSource: AudioBufferSourceNode | null = null;
  private effectPriority = -1;
  private buffers = new Map<string, Promise<AudioBuffer>>();
  private controller: AbortController | null = null;
  private musicLoading: Promise<void> | null = null;
  private unlocked = false;
  private visible = true;
  private owners = 0;
  private offset = 0;
  private startedAt = 0;
  private request = 0;
  private lastHover = -Infinity;
  private lastCue = new Map<AudioCue, number>();
  private returning = false;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  getSnapshot = () => this.snapshot;
  getServerSnapshot = () => defaults;
  private update(patch: Partial<AudioSnapshot>) {
    this.snapshot = { ...this.snapshot, ...patch };
    this.listeners.forEach((listener) => listener());
  }
  mount() {
    this.owners++;
    if (this.owners === 1) {
      this.visible = document.visibilityState !== "hidden";
      try {
        const saved = JSON.parse(localStorage.getItem(AUDIO_STORAGE_KEY) ?? "null");
        this.update({
          ...defaults,
          music: saved?.music === true,
          effects: saved?.effects === true,
          volume:
            typeof saved?.volume === "number" && Number.isFinite(saved.volume)
              ? Math.min(0.6, Math.max(0, saved.volume))
              : defaults.volume,
        });
      } catch {
        this.update({ ...defaults });
      }
    }
    return () => {
      if (--this.owners === 0) this.dispose();
    };
  }
  setReturning(value: boolean) {
    this.returning = value;
  }
  private persist() {
    const { music, effects, volume } = this.snapshot;
    try {
      localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify({ music, effects, volume }));
    } catch {
      /* Private browsing can forbid storage. */
    }
  }
  private ensureContext() {
    if (this.context) return this.context;
    const ctx = new AudioContext();
    this.context = ctx;
    this.controller = new AbortController();
    this.musicGain = ctx.createGain();
    this.effectGain = ctx.createGain();
    this.musicGain.gain.value = 0;
    this.effectGain.gain.value = this.snapshot.volume * 0.65;
    this.musicGain.connect(ctx.destination);
    this.effectGain.connect(ctx.destination);
    return ctx;
  }
  /** Called only from an audio control or permitted pointer/keyboard event. */
  async unlockFromGesture() {
    if (!this.owners || !this.visible || (!this.snapshot.music && !this.snapshot.effects)) return;
    try {
      const ctx = this.ensureContext();
      if (this.unlocked && ctx.state === "running") {
        void this.syncMusic();
        return;
      }
      const first = !this.unlocked;
      await ctx.resume();
      if (ctx !== this.context) return;
      if (ctx.state !== "running") throw new Error("Playback needs another user gesture");
      this.unlocked = true;
      this.update({ message: "" });
      void this.syncMusic();
      if (first && this.snapshot.effects) void this.play(this.returning ? "welcome" : "enter");
    } catch {
      this.update({
        musicStatus: "blocked",
        message: "Audio could not start. You can continue in silence or retry the audio controls.",
      });
    }
  }
  toggle(category: "music" | "effects") {
    const enabled = !this.snapshot[category];
    this.update({ [category]: enabled, message: "" });
    this.persist();
    if (!enabled) {
      if (category === "music") this.pauseMusic(true);
      else this.stopEffect();
    } else
      void this.unlockFromGesture().then(() => {
        if (category === "effects") void this.play(this.returning ? "welcome" : "enter");
      });
  }
  setVolume(volume: number) {
    this.update({ volume: Math.min(0.6, Math.max(0, Number.isFinite(volume) ? volume : 0.24)) });
    this.persist();
    if (this.context) {
      this.effectGain?.gain.setTargetAtTime(
        this.snapshot.volume * 0.65,
        this.context.currentTime,
        0.06,
      );
      if (this.musicSource)
        this.musicGain?.gain.setTargetAtTime(this.snapshot.volume, this.context.currentTime, 0.15);
    }
  }
  private buffer(url: string, ctx: AudioContext) {
    let loading = this.buffers.get(url);
    if (!loading) {
      loading = fetch(url, { signal: this.controller?.signal })
        .then((response) => {
          if (!response.ok) throw new Error("Audio asset unavailable");
          return response.arrayBuffer();
        })
        .then((bytes) => ctx.decodeAudioData(bytes));
      this.buffers.set(url, loading);
      void loading.catch(() => {
        if (this.context === ctx) this.buffers.delete(url);
      });
    }
    return loading;
  }
  private async syncMusic() {
    const ctx = this.context;
    if (
      !ctx ||
      !this.unlocked ||
      !this.visible ||
      !this.snapshot.music ||
      !this.owners ||
      ctx.state !== "running" ||
      this.musicSource ||
      this.musicLoading
    )
      return;
    this.update({ musicStatus: "loading" });
    this.musicLoading = (async () => {
      try {
        const buffer = await this.buffer("/nova/audio/starlit-sanctuary.mp3", ctx);
        if (
          ctx !== this.context ||
          !this.owners ||
          !this.visible ||
          !this.snapshot.music ||
          this.musicSource
        )
          return;
        const source = ctx.createBufferSource();
        for (const retiring of this.retiring) {
          retiring.stop();
          retiring.disconnect();
        }
        this.retiring.clear();
        source.buffer = buffer;
        source.loop = true;
        source.connect(this.musicGain!);
        this.musicSource = source;
        this.offset %= buffer.duration;
        this.startedAt = ctx.currentTime;
        this.musicGain!.gain.cancelScheduledValues(ctx.currentTime);
        this.musicGain!.gain.setValueAtTime(0, ctx.currentTime);
        this.musicGain!.gain.linearRampToValueAtTime(this.snapshot.volume, ctx.currentTime + 0.65);
        source.start(0, this.offset);
        source.onended = () => {
          source.disconnect();
          this.retiring.delete(source);
        };
        this.update({ musicStatus: "playing" });
      } catch {
        if (ctx === this.context && this.snapshot.music && this.owners)
          this.update({
            musicStatus: "blocked",
            message: "Music is unavailable. The adventure still works in silence.",
          });
      } finally {
        if (ctx === this.context) this.musicLoading = null;
      }
    })();
    await this.musicLoading;
  }
  private pauseMusic(fade: boolean) {
    const source = this.musicSource,
      ctx = this.context;
    this.musicSource = null;
    if (source && ctx) {
      this.offset += ctx.currentTime - this.startedAt;
      const at = ctx.currentTime;
      this.musicGain?.gain.cancelScheduledValues(at);
      this.musicGain?.gain.setValueAtTime(this.musicGain.gain.value, at);
      this.musicGain?.gain.linearRampToValueAtTime(0, at + (fade ? 0.32 : 0.005));
      source.stop(at + (fade ? 0.33 : 0.01));
      this.retiring.add(source);
    }
    this.update({ musicStatus: "paused" });
  }
  private stopEffect() {
    this.request++;
    const source = this.effectSource;
    this.effectSource = null;
    this.effectPriority = -1;
    if (source) {
      try {
        source.stop();
        source.disconnect();
      } catch {
        /* Already ended. */
      }
    }
    this.update({ effect: null });
  }
  async play(cue: AudioCue) {
    const ctx = this.context;
    if (
      !ctx ||
      !this.unlocked ||
      !this.snapshot.effects ||
      !this.visible ||
      !this.owners ||
      ctx.state !== "running"
    )
      return;
    const now = performance.now();
    if (cue === "hover") {
      if (now - this.lastHover < 220 || this.effectSource || this.effectPriority >= 0) return;
      this.lastHover = now;
    }
    if (
      now - (this.lastCue.get(cue) ?? -Infinity) <
      (cue === "enter" || cue === "welcome" ? 2000 : 85)
    )
      return;
    if (priority(cue) < this.effectPriority) return;
    this.lastCue.set(cue, now);
    const token = ++this.request;
    this.effectPriority = priority(cue);
    try {
      const buffer = await this.buffer("/nova/audio/nova-magic.mp3", ctx);
      if (
        token !== this.request ||
        ctx !== this.context ||
        !this.snapshot.effects ||
        !this.visible ||
        !this.owners ||
        performance.now() - now > (cue === "hover" ? 220 : 2200)
      )
        return;
      if (this.effectSource) {
        this.effectSource.stop();
        this.effectSource.disconnect();
      }
      const source = ctx.createBufferSource();
      this.effectSource = source;
      source.buffer = buffer;
      source.connect(this.effectGain!);
      const [offset, duration] = AUDIO_CUES[cue];
      source.start(0, offset, duration);
      this.update({ effect: cue });
      source.onended = () => {
        source.disconnect();
        if (this.effectSource === source) {
          this.effectSource = null;
          this.effectPriority = -1;
          this.update({ effect: null });
        }
      };
    } catch {
      if (ctx === this.context)
        this.update({ message: "Sound effects are unavailable. You can continue in silence." });
    } finally {
      if (token === this.request && !this.effectSource) this.effectPriority = -1;
    }
  }
  setVisible(visible: boolean) {
    this.visible = visible;
    const ctx = this.context;
    if (!visible) {
      this.pauseMusic(false);
      this.stopEffect();
      if (ctx) void ctx.suspend().catch(() => {});
    } else if (ctx && this.unlocked) {
      void ctx
        .resume()
        .then(() => {
          if (ctx === this.context) void this.syncMusic();
        })
        .catch(() => this.update({ musicStatus: "blocked" }));
    }
  }
  playAnswer(question: number, answer: number) {
    const cue: AudioCue =
      question === 11
        ? "complete"
        : question === 1
          ? answer === 1
            ? "fox"
            : answer === 0
              ? "phoenix"
              : "answer"
          : question === 2
            ? (["fire", "water", "starlight", "answer"] as const)[answer]
            : "answer";
    void this.unlockFromGesture().then(() => this.play(cue));
  }
  playChime() {
    void this.play("answer");
  }
  playStarlightWhisper() {
    void this.play("transition");
  }
  playAwakeningChord() {
    void this.play("hatch");
  }
  playBondSealedChime() {
    void this.play("bond");
  }
  dispose() {
    const ctx = this.context;
    this.pauseMusic(false);
    this.stopEffect();
    for (const source of this.retiring) {
      source.stop();
      source.disconnect();
    }
    this.retiring.clear();
    this.controller?.abort();
    this.context = null;
    this.controller = null;
    this.musicGain?.disconnect();
    this.effectGain?.disconnect();
    this.musicGain = null;
    this.effectGain = null;
    this.musicLoading = null;
    this.buffers.clear();
    this.lastCue.clear();
    this.unlocked = false;
    this.offset = 0;
    this.lastHover = -Infinity;
    if (ctx && ctx.state !== "closed") void ctx.close().catch(() => {});
  }
}
export const soundscape = new SanctuarySoundscape();
if (import.meta.hot) import.meta.hot.dispose(() => soundscape.dispose());
