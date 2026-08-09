import { useCallback, useEffect, useRef, useState } from "react";

export type ReadAloudStatus = "idle" | "playing" | "paused";
export type ReadAloudLang = "bm" | "en";

export interface ReadAloudChunk {
  id: string;
  text: string;
}

const LANG_CODE: Record<ReadAloudLang, string> = {
  bm: "ms-MY",
  en: "en-US",
};
const isMobile = () => {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};
export function isReadAloudSupported() {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof window.SpeechSynthesisUtterance !== "undefined"
  );
}

export function pickVoice(
  voices: SpeechSynthesisVoice[],
  langCode: string,
): SpeechSynthesisVoice | undefined {
  const prefix = langCode.slice(0, 2).toLowerCase();
  const languageVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith(prefix));

  // Browsers expose system voices under slightly different names depending
  // on the operating system and browser version. Ace uses Ana whenever it is
  // available, then falls back through other familiar female voices before the
  // language-based fallback for every other device.
  if (prefix === "en") {
    const preferredNames = ["ana", "aria", "jenny", "zira", "samantha", "susan"];

    for (const preferredName of preferredNames) {
      const preferred = languageVoices.find((voice) =>
        new RegExp(`(?:^|\\s)${preferredName}(?:\\s|$)`, "i").test(voice.name),
      );
      if (preferred) return preferred;
    }

    // Chrome commonly exposes voices such as "Google UK English Female"
    // without a personal name. Prefer that explicit label before falling
    // back to the browser's first English voice, which may be male.
    const labelledFemaleVoice = languageVoices.find((voice) => /\bfemale\b/i.test(voice.name));
    if (labelledFemaleVoice) return labelledFemaleVoice;
  }

  return (
    languageVoices.find((voice) => voice.lang.toLowerCase() === langCode.toLowerCase()) ??
    languageVoices[0]
  );
}

/**
 * Free, browser-only text-to-speech via the Web Speech API. Text is spoken as
 * a queue of small chunks (rather than one long utterance) so we can track
 * which chunk is currently playing for highlighting, and so Stop/section
 * changes can cut in cleanly instead of waiting out a long utterance.
 */
export function useReadAloud() {
  const supported = isReadAloudSupported();
  const [status, setStatus] = useState<ReadAloudStatus>("idle");
  const [activeChunkId, setActiveChunkId] = useState<string | null>(null);
  const queueRef = useRef<ReadAloudChunk[]>([]);
  const indexRef = useRef(0);
  const langRef = useRef(LANG_CODE.en);
  // Bumped on every stop()/play() so late-arriving events from a cancelled
  // utterance can't resurrect a queue that's no longer current.
  const generationRef = useRef(0);

  const stop = useCallback(() => {
    generationRef.current += 1;
    if (supported) window.speechSynthesis.cancel();
    queueRef.current = [];
    indexRef.current = 0;
    setStatus("idle");
    setActiveChunkId(null);
  }, [supported]);

  const speakFrom = useCallback((generation: number) => {
    if (!isReadAloudSupported()) return;
    const queue = queueRef.current;
    const i = indexRef.current;
    if (generation !== generationRef.current) return;
    if (i >= queue.length) {
      setStatus("idle");
      setActiveChunkId(null);
      return;
    }
    const chunk = queue[i];
    setActiveChunkId(chunk.id);
    const utter = new SpeechSynthesisUtterance(chunk.text);
    utter.lang = langRef.current;
   const voices = window.speechSynthesis.getVoices();

const anaVoice = voices.find((voice) =>
  voice.name.toLowerCase().includes("microsoft ana online")
);

const fallbackVoice = pickVoice(voices, langRef.current);

if (langRef.current.startsWith("en") && anaVoice) {
  utter.voice = anaVoice;
} else if (fallbackVoice) {
  utter.voice = fallbackVoice;
}

console.log("Selected voice:", utter.voice?.name);


    utter.rate = isMobile() ? 1.0 : 1.2;
    utter.onend = () => {
      if (generation !== generationRef.current) return;
      indexRef.current += 1;
      speakFrom(generation);
    };
    utter.onerror = () => {
      if (generation !== generationRef.current) return;
      indexRef.current += 1;
      speakFrom(generation);
    };
    window.speechSynthesis.speak(utter);
  }, []);

  const play = useCallback(
    (chunks: ReadAloudChunk[], lang: ReadAloudLang) => {
      if (!supported || chunks.length === 0) return;
      generationRef.current += 1;
      const generation = generationRef.current;
      window.speechSynthesis.cancel();
      queueRef.current = chunks;
      indexRef.current = 0;
      langRef.current = LANG_CODE[lang];
      setStatus("playing");
      speakFrom(generation);
    },
    [supported, speakFrom],
  );

  const pause = useCallback(() => {
    if (!supported || status !== "playing") return;
    window.speechSynthesis.pause();
    setStatus("paused");
  }, [supported, status]);

  const resume = useCallback(() => {
    if (!supported || status !== "paused") return;
    window.speechSynthesis.resume();
    setStatus("playing");
  }, [supported, status]);

  // Stop any speech in flight when the component using this hook unmounts
  // (e.g. the student navigates away mid-sentence).
  useEffect(() => stop, [stop]);

  return {
    status,
    activeChunkId,
    supported,
    play,
    pause,
    resume,
    stop,
  };
}
