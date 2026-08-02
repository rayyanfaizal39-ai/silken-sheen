import { describe, expect, it } from "vitest";
import { pickVoice } from "./use-read-aloud";

function voice(name: string, lang: string, voiceURI = name): SpeechSynthesisVoice {
  return { default: false, lang, localService: true, name, voiceURI };
}

describe("Ace browser voice selection", () => {
  const voices = [
    voice("Google US English", "en-US", "google-male"),
    voice("Google UK English Female", "en-GB", "google-female"),
    voice("Microsoft Aria Online (Natural)", "en-US", "aria"),
    voice("Microsoft Ana Online (Natural)", "en-US", "ana"),
  ];

  it("prefers Ana when it is available", () => {
    expect(pickVoice(voices, "en-US")?.voiceURI).toBe("ana");
  });

  it("prefers an explicitly labelled female voice before a generic voice", () => {
    expect(pickVoice(voices.slice(0, 2), "en-US")?.voiceURI).toBe("google-female");
  });

  it("falls back to the exact requested language", () => {
    expect(pickVoice([voice("System English", "en-US")], "en-US")?.name).toBe("System English");
  });
});
