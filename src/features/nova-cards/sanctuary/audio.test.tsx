// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AUDIO_STORAGE_KEY, SanctuarySoundscape } from "./audio";
import { AudioControls } from "./AudioControls";
import { useSanctuaryPreferences } from "./useSanctuaryPreferences";
import { soundscape } from "./audio";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
const parameter = () => ({
  value: 0,
  cancelScheduledValues: vi.fn(),
  setValueAtTime: vi.fn(),
  linearRampToValueAtTime: vi.fn(),
  setTargetAtTime: vi.fn(),
});
let sources: Array<{
  loop: boolean;
  buffer: AudioBuffer | null;
  start: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
  connect: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  onended: (() => void) | null;
}>;
let contexts: FakeContext[];
class FakeContext {
  state = "running";
  currentTime = 0;
  destination = {};
  resume = vi.fn(async () => {
    this.state = "running";
  });
  suspend = vi.fn(async () => {
    this.state = "suspended";
  });
  close = vi.fn(async () => {
    this.state = "closed";
  });
  decodeAudioData = vi.fn(async () => ({ duration: 34.2857 }) as AudioBuffer);
  createGain = vi.fn(() => ({ gain: parameter(), connect: vi.fn(), disconnect: vi.fn() }));
  createBufferSource = vi.fn(() => {
    const source = {
      loop: false,
      buffer: null as AudioBuffer | null,
      start: vi.fn(),
      stop: vi.fn(),
      connect: vi.fn(),
      disconnect: vi.fn(),
      onended: null as (() => void) | null,
    };
    sources.push(source);
    return source;
  });
  constructor() {
    contexts.push(this);
  }
}
const settle = async () => {
  for (let i = 0; i < 12; i++) await Promise.resolve();
};
const mixers: SanctuarySoundscape[] = [];
const releases: Array<() => void> = [];
let root: ReturnType<typeof createRoot> | undefined;
beforeEach(() => {
  contexts = [];
  sources = [];
  localStorage.clear();
  vi.stubGlobal("AudioContext", FakeContext);
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) })),
  );
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  releases.splice(0).forEach((release) => release());
  mixers.splice(0).forEach((mixer) => mixer.dispose());
  soundscape.dispose();
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
function mixer(preferences?: object) {
  if (preferences) localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(preferences));
  const audio = new SanctuarySoundscape();
  mixers.push(audio);
  releases.push(audio.mount());
  return audio;
}
describe("Nova original audio mixer", () => {
  it("reports an autoplay refusal without starting any sources", async () => {
    vi.stubGlobal(
      "AudioContext",
      class extends FakeContext {
        resume = vi.fn(async () => {
          throw new Error("NotAllowedError");
        });
      },
    );
    const audio = mixer({ music: true, effects: true });
    await audio.unlockFromGesture();
    await settle();
    expect(sources).toHaveLength(0);
    expect(fetch).not.toHaveBeenCalled();
    expect(audio.getSnapshot()).toMatchObject({ musicStatus: "blocked" });
    expect(audio.getSnapshot().message).toContain("silence");
  });
  it("retires a fading loop before starting another after rapid off/on toggles", async () => {
    const audio = mixer({ music: true });
    await audio.unlockFromGesture();
    await settle();
    const first = sources[0];
    audio.toggle("music");
    audio.toggle("music");
    await settle();
    expect(sources.filter((s) => s.loop)).toHaveLength(2);
    expect(first.stop).toHaveBeenLastCalledWith();
    expect(first.stop.mock.invocationCallOrder.at(-1)).toBeLessThan(
      sources[1].start.mock.invocationCallOrder[0],
    );
    expect(contexts).toHaveLength(1);
  });
  it("never creates an audio context or requests assets before a permitted interaction, even with saved preferences", async () => {
    const audio = mixer({ music: true, effects: true, volume: 0.24 });
    await audio.play("answer");
    await settle();
    expect(contexts).toHaveLength(0);
    expect(fetch).not.toHaveBeenCalled();
    await audio.unlockFromGesture();
    await settle();
    expect(contexts).toHaveLength(1);
    expect(audio.getSnapshot().musicStatus).toBe("playing");
    expect(sources.filter((s) => s.loop)).toHaveLength(1);
  });
  it("controls music and effects independently, persists both and applies a low clamped volume", async () => {
    const audio = mixer();
    audio.toggle("music");
    await settle();
    expect(audio.getSnapshot()).toMatchObject({
      music: true,
      effects: false,
      volume: 0.24,
      musicStatus: "playing",
    });
    const music = sources.find((s) => s.loop)!;
    await audio.play("summon");
    expect(sources.filter((s) => !s.loop)).toHaveLength(0);
    audio.toggle("effects");
    await settle();
    expect(audio.getSnapshot().effects).toBe(true);
    expect(music.stop).not.toHaveBeenCalled();
    audio.toggle("music");
    await settle();
    expect(audio.getSnapshot()).toMatchObject({
      music: false,
      effects: true,
      musicStatus: "paused",
    });
    expect(music.stop).toHaveBeenCalled();
    await audio.play("summon");
    expect(audio.getSnapshot().effect).toBe("summon");
    const effect = sources.at(-1)!;
    audio.toggle("effects");
    expect(effect.stop).toHaveBeenCalled();
    expect(audio.getSnapshot().effect).toBeNull();
    audio.setVolume(5);
    expect(JSON.parse(localStorage.getItem(AUDIO_STORAGE_KEY)!)).toEqual({
      music: false,
      effects: false,
      volume: 0.6,
    });
  });
  it("shares one soundtrack across repeated gesture/rerender-style calls without restarting it", async () => {
    const audio = mixer({ music: true });
    await audio.unlockFromGesture();
    await settle();
    for (let i = 0; i < 15; i++) await audio.unlockFromGesture();
    await settle();
    expect(contexts).toHaveLength(1);
    expect(sources.filter((s) => s.loop)).toHaveLength(1);
    expect(sources[0].start).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it("rate limits rapid hover/focus events and keeps a single dominant effect voice", async () => {
    const audio = mixer({ effects: true });
    await audio.unlockFromGesture();
    await settle();
    sources.at(-1)!.onended!();
    const count = sources.length;
    await Promise.all(Array.from({ length: 40 }, () => audio.play("hover")));
    await settle();
    expect(sources.length - count).toBe(1);
    const hover = sources.at(-1)!;
    await audio.play("summon");
    expect(hover.stop).toHaveBeenCalledTimes(1);
    const summon = sources.at(-1)!;
    const dominantCount = sources.length;
    await audio.play("hover");
    await audio.play("transition");
    expect(sources).toHaveLength(dominantCount);
    expect(summon.stop).not.toHaveBeenCalled();
  });
  it("suspends on hidden pages, resumes at the preserved music offset, and closes cleanly on exit", async () => {
    const audio = mixer({ music: true, effects: true });
    await audio.unlockFromGesture();
    await settle();
    const ctx = contexts[0],
      music = sources.find((s) => s.loop)!;
    ctx.currentTime = 7;
    audio.setVisible(false);
    await settle();
    expect(ctx.suspend).toHaveBeenCalledTimes(1);
    expect(music.stop).toHaveBeenCalled();
    const count = sources.length;
    await audio.play("summon");
    expect(sources).toHaveLength(count);
    audio.setVisible(true);
    await settle();
    expect(sources.filter((s) => s.loop).at(-1)!.start).toHaveBeenCalledWith(0, 7);
    releases.pop()!();
    await settle();
    expect(ctx.close).toHaveBeenCalledTimes(1);
    await audio.play("hover");
    expect(contexts).toHaveLength(1);
    expect(sources.every((s) => s.disconnect.mock.calls.length > 0)).toBe(true);
  });
  it("does not start a late decoded soundtrack after route exit", async () => {
    let resolve!: (bytes: ArrayBuffer) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        arrayBuffer: () => new Promise<ArrayBuffer>((r) => (resolve = r)),
      })),
    );
    const audio = mixer({ music: true });
    await audio.unlockFromGesture();
    await settle();
    releases.pop()!();
    resolve(new ArrayBuffer(8));
    await settle();
    expect(sources).toHaveLength(0);
    expect(contexts[0].close).toHaveBeenCalledTimes(1);
  });
  it("handles blocked playback, failed assets and unavailable local storage without breaking the quiz", async () => {
    const audio = mixer();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Private mode");
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false })),
    );
    audio.toggle("music");
    await settle();
    expect(audio.getSnapshot().musicStatus).toBe("blocked");
    expect(audio.getSnapshot().message).toContain("silence");
    contexts[0].resume.mockRejectedValueOnce(new Error("NotAllowedError"));
    audio.setVisible(false);
    await settle();
    await audio.unlockFromGesture();
    expect(audio.getSnapshot().musicStatus).not.toBe("playing");
  });
  it("keeps preferences across route remounts but requires a new gesture before playback", async () => {
    function Harness() {
      useSanctuaryPreferences();
      return (
        <main className="nova-sanctuary">
          <AudioControls />
        </main>
      );
    }
    const host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    await act(async () => root!.render(<Harness />));
    const music = host.querySelector<HTMLButtonElement>('[aria-label="Music"]')!;
    await act(async () => {
      music.click();
      await settle();
    });
    expect(music.getAttribute("aria-pressed")).toBe("true");
    expect(contexts).toHaveLength(1);
    await act(async () => root!.render(<Harness />));
    expect(contexts).toHaveLength(1);
    await act(async () => root!.unmount());
    expect(contexts[0].close).toHaveBeenCalledTimes(1);
    root = createRoot(host);
    await act(async () => root!.render(<Harness />));
    expect(host.querySelector('[aria-label="Music"]')?.getAttribute("aria-pressed")).toBe("true");
    expect(contexts).toHaveLength(1);
  });
});
