import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch10-gelombang-bunyi.png";

export const scienceF2C10InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 10,
  blogHighlight: {
    title: "Science Blog — Lightning and Thunder",
    body: "Lightning and thunder actually happen at the exact same instant — but light reaches your eyes far faster than sound reaches your ears, which is why you always see the flash before you hear the rumble.",
    imagePath: chapterImage,
  },
  keywords: [
    "Vibration",
    "Medium",
    "Amplitude",
    "Frequency",
    "Echo",
    "Pitch",
    "Ultrasound",
    "Sonar",
  ],
  sections: [
    {
      number: "10.1",
      title: "Characteristics of Sound Waves",
      intro:
        "Every sound starts as a vibration — your vocal cords, a guitar string, a speaker cone, a ringing bell. That vibration is passed from one air molecule to the next in the form of a wave until it reaches a listener's ears. But sound can't travel through nothing: it needs a medium (solid, liquid, or gas) to propagate, which is exactly why there's no sound in the vacuum of space.",
      cards: [
        { title: "🪨 Solids", body: "Fastest — particles are packed tightly together, so vibration passes from one to the next almost instantly." },
        { title: "💧 Liquids", body: "Slower than solids — particles are more loosely arranged." },
        { title: "💨 Gases", body: "Slowest of all — particles are far apart, delaying the transfer of vibration." },
      ],
      tabs: [
        { title: "Hard & smooth", body: "Marble tiles and bare walls are good sound reflectors — sound bounces right back, which is what creates an echo." },
        { title: "Soft & rough", body: "Carpet and softboard are good sound absorbers — that's why cinema hall walls are lined with soft boards, to cut down on echo." },
      ],
      checks: [
        { question: "Can astronauts hear each other clearly in the vacuum of space?", hint: "No — sound needs a medium to travel, and space is a vacuum. That's why astronauts communicate by radio, not by shouting." },
      ],
    },
    {
      number: "10.2",
      title: "Loudness and Pitch of Sound",
      intro:
        "Loudness depends on amplitude — how big the vibration is; the greater the amplitude, the louder the sound. Pitch depends on frequency — how fast it vibrates, measured in hertz (Hz); the higher the frequency, the higher the pitch. A cow's low moo is low frequency; a rat's squeak is high frequency.",
      cards: [
        {
          title: "The Doppler effect",
          body: "Ever notice an ambulance siren sound higher-pitched as it approaches, then drop lower as it passes? That's the Doppler effect — the apparent change in frequency caused by relative movement between the sound source and the observer.",
        },
      ],
      waveVisualizer: {
        title: "🎛️ Play with the wave yourself",
        instruction: "Drag the amplitude and frequency sliders and watch the waveform redraw in real time.",
      },
      checks: [
        { question: "A musician plays a very soft note. What characteristic changed?", hint: "Amplitude — a softer note means a smaller vibration, which is lower loudness, not a change in pitch." },
      ],
    },
    {
      number: "10.3",
      title: "Phenomenon and Application of Reflection",
      intro:
        "An echo happens when a sound wave reflects off a hard surface and reaches your ears again, slightly delayed — common in empty halls, caves, tunnels and gorges. Ultrasound is sound above 20,000 Hz — too high for human ears (whose hearing range is roughly 20 Hz to 20,000 Hz), but not for bats, which use it to navigate in the dark. Reflected sound waves power real technology too.",
      cards: [
        { title: "🚢 Sonar", body: "Detects underwater objects for ships, used in shipping, medical and fisheries sectors." },
        { title: "🏥 Medical ultrasound", body: "Images inside the body, such as scanning a foetus in the womb." },
        { title: "🎣 Fisheries", body: "Locates schools of fish using reflected sound waves." },
        { title: "🦇 Bat echolocation", body: "Natural navigation in the dark — bats emit ultrasound and listen for its echo." },
      ],
      checks: [
        { question: "Why do cinema halls line their walls with soft boards instead of leaving them bare?", hint: "Soft boards absorb sound instead of reflecting it, cutting down unwanted echo so dialogue and music stay clear." },
      ],
    },
  ],
  reflectionItems: [
    "I can explain how sound propagates and is reflected/absorbed.",
    "I can relate amplitude to loudness and frequency to pitch.",
    "I can explain echo and real-world applications of sound reflection.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: Sound waves can travel through a vacuum.",
      answer: false,
      explanation: "Sound needs a medium — solid, liquid, or gas. No medium, no sound.",
    },
    {
      type: "multiple-choice",
      question: "A rat's squeak has a higher pitch than a cow's moo. What does that tell you?",
      options: ["The rat's sound has a bigger amplitude", "The rat's sound has a higher frequency", "The rat's sound travels faster", "The rat's sound needs no medium"],
      answerIndex: 1,
      explanation: "Pitch depends on frequency — a higher-pitched sound simply vibrates faster.",
    },
  ],
};
