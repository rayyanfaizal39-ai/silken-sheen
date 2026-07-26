const activeFades = new WeakMap<HTMLAudioElement, number>();

export function cancelAudioFade(audio: HTMLAudioElement) {
  const frame = activeFades.get(audio);
  if (frame !== undefined) {
    cancelAnimationFrame(frame);
    activeFades.delete(audio);
  }
}

export function fadeAudio(
  audio: HTMLAudioElement,
  targetVolume: number,
  durationMs: number,
  onComplete?: () => void,
) {
  cancelAudioFade(audio);

  const target = Math.max(0, Math.min(1, targetVolume));
  const startVolume = audio.volume;
  if (durationMs <= 0 || Math.abs(startVolume - target) < 0.001) {
    audio.volume = target;
    onComplete?.();
    return;
  }

  const startedAt = performance.now();
  const tick = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / durationMs);
    const eased = 1 - (1 - progress) ** 3;
    audio.volume = startVolume + (target - startVolume) * eased;

    if (progress < 1) {
      activeFades.set(audio, requestAnimationFrame(tick));
      return;
    }

    activeFades.delete(audio);
    audio.volume = target;
    onComplete?.();
  };

  activeFades.set(audio, requestAnimationFrame(tick));
}
