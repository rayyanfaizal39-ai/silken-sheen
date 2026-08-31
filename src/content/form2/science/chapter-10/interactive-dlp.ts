import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch10-gelombang-bunyi.png";

export const scienceF2C10InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 10,
  blogHighlight: {
    title: "Science Blog — Lightning and Thunder",
    body: "Lightning and thunder actually happen at the same instant — but light reaches your eyes far faster than sound reaches your ears, which is why you always see the flash before you hear the rumble.",
    imagePath: chapterImage,
  },
  keywords: [
    "Vibration",
    "Medium",
    "Sound wave",
    "Amplitude",
    "Frequency",
    "Loudness",
    "Pitch",
    "Echo",
    "Doppler effect",
    "Ultrasound",
    "Hearing range",
    "Sonar",
  ],
  sections: [
    {
      number: "10.1",
      title: "Sound Production and Propagation",
      intro:
        "Sound is a form of energy produced by vibration. When an object vibrates, the particles around it vibrate too and collide with neighbouring particles. The vibration is passed from one particle to the next as a wave until it reaches a listener's ear. Because a sound wave has to be passed along by particles, sound needs a medium to propagate and cannot travel through a vacuum.",
      cards: [
        {
          title: "🗣️ Vocal cords",
          body: "Touch the outside of your throat while speaking — you can feel your vocal cords vibrating. That vibration is what produces your voice.",
        },
        {
          title: "🎸 Instrument strings",
          body: "A plucked guitar string vibrates up and down, which sets the air around it vibrating too.",
        },
        {
          title: "🥁 Membranes",
          body: "The surface of a drum vibrates rapidly when struck, producing sound.",
        },
        {
          title: "🔔 A bell",
          body: "The metal surface of a bell vibrates when struck, setting the nearby air particles vibrating.",
        },
      ],
      accordions: [
        {
          title: "The vacuum jar demonstration",
          body: "A ringing alarm clock is placed inside a glass jar, then the air in the jar is pumped out with a vacuum pump. The more air is removed, the fainter the ringing becomes, even though the clock is still vibrating. This shows that sound needs a medium to propagate.",
        },
        {
          title: "Why there is no sound in space",
          body: "Space is a vacuum — there are no particles to pass the vibration along. That is why astronauts communicate using radio waves rather than by speaking directly to one another.",
        },
      ],
      checks: [
        {
          question: "Can astronauts hear each other's voices directly in space?",
          hint: "No. Space is a vacuum with no particles to pass the vibration along, so sound waves cannot propagate. They use radio waves instead.",
        },
        {
          question: "What must happen to an object before it can produce sound?",
          hint: "It must vibrate. Without vibration, no sound wave is produced.",
        },
      ],
    },
    {
      number: "10.1",
      title: "Reflection, Absorption and Speed of Sound",
      intro:
        "When a sound wave strikes the surface of an object, part of it is reflected and part of it is absorbed. How much is reflected or absorbed depends on the type of surface. Sound waves also propagate at different speeds in different media, depending on how closely the particles of that medium are packed together.",
      tabs: [
        {
          title: "Hard & smooth surfaces",
          body: "Hard, smooth surfaces reflect sound well. Marble tiles and bare walls are examples.",
        },
        {
          title: "Soft & rough surfaces",
          body: "Soft, rough surfaces absorb sound well. Carpet and cork board are examples. That is why cinema walls are lined with thin soft board — to absorb sound so dialogue and music stay clear.",
        },
      ],
      soundMedia: {
        title: "🔊 Speed of sound in the three states of matter",
        instruction: "Tap each state of matter to see its particle arrangement and how fast sound propagates through it.",
        states: [
          {
            id: "solid",
            label: "Solid",
            speedRank: 1,
            speedLabel: "Fastest",
            note: "Particles in a solid are packed very closely together. When particles at one end start vibrating, the neighbouring particles vibrate almost at once, so sound is transferred quickly.",
          },
          {
            id: "liquid",
            label: "Liquid",
            speedRank: 2,
            speedLabel: "Slower",
            note: "Particles in a liquid are less closely packed than in a solid, so the sound vibration is transferred more slowly.",
          },
          {
            id: "gas",
            label: "Gas",
            speedRank: 3,
            speedLabel: "Slowest",
            note: "Gas particles are far apart from one another. That distance delays the transfer of vibration, so sound propagates most slowly through a gas.",
          },
        ],
        caption: "The more closely packed the particles, the faster the vibration is transferred.",
        hint: "Speed order: solid > liquid > gas.",
      },
      accordions: [
        {
          title: "The plastic container demonstration — what it actually compares",
          body: "In this demonstration, an ear is placed against plastic containers filled separately with air, water and flour while an alarm clock is sounded. What is compared is the loudness of the sound heard through each container. Note that this demonstration compares loudness — it does not measure the speed of sound. The speed of sound in different media is learned separately, from particle arrangement as shown above.",
        },
      ],
      checks: [
        {
          question: "Why are cinema walls lined with thin soft board?",
          hint: "Soft board absorbs sound rather than reflecting it, so unwanted reflected sound is reduced and dialogue stays clear.",
        },
        {
          question: "In which medium does a sound wave propagate fastest, and why?",
          hint: "In a solid. Its particles are the most closely packed, so vibration passes from one particle to the next most rapidly.",
        },
      ],
    },
    {
      number: "10.2",
      title: "Frequency, Amplitude and the Oscilloscope",
      intro:
        "Frequency is the number of complete vibrations in one second, and it is measured in hertz (Hz). Amplitude is the maximum displacement of the wave from the equilibrium position. Both properties can be seen on the screen of a cathode-ray oscilloscope (C.R.O.) when an audio signal generator is connected to a loudspeaker and the oscilloscope.",
      cards: [
        {
          title: "📐 Amplitude",
          body: "The maximum displacement of the wave from the equilibrium position — the height of the wave crest measured from the centre line.",
        },
        {
          title: "🔁 Frequency",
          body: "The number of complete vibrations in one second. Its unit is the hertz (Hz).",
        },
      ],
      tabs: [
        {
          title: "Reading amplitude on the C.R.O.",
          body: "The taller the wave on the oscilloscope screen, the greater the amplitude of vibration, and the louder the sound produced by the loudspeaker.",
        },
        {
          title: "Reading frequency on the C.R.O.",
          body: "The more complete waves that appear within the same time interval on the oscilloscope screen, the higher the frequency, and the higher the pitch of the sound.",
        },
      ],
      waveVisualizer: {
        title: "🎛️ The oscilloscope display — try it yourself",
        instruction:
          "Drag the amplitude and frequency sliders to watch the waveform on the oscilloscope display change. Move one slider at a time to see its effect clearly.",
      },
      checks: [
        {
          question: "What is frequency, and what is its unit?",
          hint: "Frequency is the number of complete vibrations in one second. Its unit is the hertz (Hz).",
        },
        {
          question: "On an oscilloscope screen, what does the height of the wave show?",
          hint: "The height shows the amplitude of the vibration — the maximum displacement from the equilibrium position.",
        },
      ],
    },
    {
      number: "10.2",
      title: "Loudness and Pitch of Sound",
      intro:
        "Our ears can tell sounds apart because every sound has its own loudness and pitch. The loudness of a sound depends on the amplitude of the sound wave, while the pitch of a sound depends on the frequency of the sound wave.",
      cards: [
        {
          title: "🔊 Loudness depends on amplitude",
          body: "The greater the amplitude of vibration, the louder the sound produced. The smaller the amplitude, the softer the sound.",
        },
        {
          title: "🎵 Pitch depends on frequency",
          body: "The higher the frequency of vibration, the higher the pitch of the sound. The lower the frequency, the lower the pitch.",
        },
      ],
      tabs: [
        {
          title: "Low frequency",
          body: "A cow's moo is a low-frequency sound, so its pitch is low.",
        },
        {
          title: "High frequency",
          body: "A rat's squeak is a high-frequency sound, so its pitch is high.",
        },
      ],
      checks: [
        {
          question: "A musician plays a very soft note. Which characteristic changed?",
          hint: "Loudness. A softer note means a smaller amplitude of vibration — the pitch did not change.",
        },
        {
          question: "A rat's squeak has a higher pitch than a cow's moo. What causes this?",
          hint: "The vibration producing the rat's sound has a higher frequency, and pitch depends on frequency.",
        },
      ],
    },
    {
      number: "10.2",
      title: "Sound from Musical Instruments",
      intro:
        "Musical instruments such as the piano, recorder, gendang, drum and guitar all produce sound through vibration. By changing how an instrument is played, a musician can change the loudness and the pitch of the sound separately. Notice that these two characteristics are controlled by different things.",
      tabs: [
        {
          title: "Guitar — plucked harder",
          body: "Plucking a guitar string harder produces a vibration with a greater amplitude, so the sound becomes louder. The pitch does not change — the note being played stays the same.",
        },
        {
          title: "Guitar — string tightened",
          body: "Tightening a guitar string makes it vibrate at a higher frequency, so the pitch of the sound becomes higher. This is entirely different from plucking harder.",
        },
        {
          title: "Piano",
          body: "Pressing a piano key harder produces a vibration with a greater amplitude, so the same note sounds louder.",
        },
        {
          title: "Recorder, gendang and drum",
          body: "Blowing a recorder harder, or striking a gendang or drum harder, produces a greater amplitude of vibration, so the sound is louder. The size and tension of a drum membrane affect the frequency of vibration, which is its pitch.",
        },
      ],
      checks: [
        {
          question: "What happens to the sound when a guitar string is plucked harder?",
          hint: "The amplitude of vibration becomes greater, so the sound becomes louder. Its pitch does not change.",
        },
        {
          question: "What happens to the sound when a guitar string is tightened?",
          hint: "The string vibrates at a higher frequency, so the pitch of the sound becomes higher.",
        },
      ],
    },
    {
      number: "10.3",
      title: "Echo and the Doppler Effect",
      intro:
        "The reflection of sound waves produces phenomena we meet every day. An echo is produced when a sound wave is reflected back to the listener from a hard surface. The Doppler effect happens when there is relative movement between a sound source and an observer.",
      echoDiagram: {
        title: "🔁 How an echo is produced",
        sourceLabel: "Listener",
        surfaceLabel: "Hard surface",
        outgoingLabel: "Original sound",
        reflectedLabel: "Echo",
        places: ["Enclosed hall", "Empty room", "Cave", "Tunnel", "Gorge"],
        caption:
          "The original sound travels to the hard surface, is reflected, and returns to the listener's ear a moment later.",
        hint: "The reflected sound resembles the original sound but takes a little time to reach the ear again — that is an echo.",
      },
      dopplerWavefronts: {
        title: "🚑 The Doppler effect",
        instruction: "Tap an observer's position to see what they hear.",
        observers: [
          {
            id: "ahead",
            label: "Observer ahead",
            effect: "higher",
            note: "The ambulance is approaching this observer. The wavefronts ahead of the source are closer together, so the frequency received by the observer increases and the siren sounds higher in pitch.",
          },
          {
            id: "behind",
            label: "Observer behind",
            effect: "lower",
            note: "The ambulance has already passed this observer. The wavefronts behind the source are further apart, so the frequency received decreases and the siren sounds lower in pitch.",
          },
        ],
        sourceLabel: "Ambulance",
        emittedNote:
          "The ambulance siren actually emits sound at a steady frequency the whole time. What changes is the frequency received by the observer — which is why the Doppler effect is described as an apparent change in frequency. The ambulance driver hears no change, because there is no relative movement between the driver and the siren.",
        caption:
          "Wavefronts are closer together ahead of the moving ambulance, and further apart behind it.",
        hint: "The received frequency increases as the source approaches the observer and decreases as it moves away.",
      },
      checks: [
        {
          question: "Why is an echo easier to hear in an empty room than in a furnished one?",
          hint: "An empty room has more hard surfaces that reflect sound. Furniture absorbs sound, so the echo effect is reduced.",
        },
        {
          question: "Does an ambulance siren really change its frequency as it drives past you?",
          hint: "No. The siren emits a steady frequency. What changes is the frequency received by the observer because of relative motion — an apparent change in frequency.",
        },
      ],
    },
    {
      number: "10.3",
      title: "Sonar, Sonogram and Echolocation",
      intro:
        "Ultrasound is a sound wave with a frequency greater than 20 000 Hz. Ultrasound cannot be heard by humans but can be heard by animals such as bats. The reflection of ultrasound waves is used across several sectors, because the reflected sound carries information about whatever it struck.",
      echolocation: {
        title: "📡 Sending out and receiving back",
        instruction: "Tap each application to see the path of the sound sent out and the sound reflected back.",
        modes: [
          {
            id: "sonar",
            label: "Sonar",
            medium: "water",
            emitterLabel: "Ship",
            targetLabel: "Object / fish",
            note: "A ship sends sound waves down into the water. The waves are reflected by underwater objects or a school of fish, and the reflection received back gives information about their position. Sonar is used in the shipping and fisheries sectors.",
          },
          {
            id: "bat",
            label: "Bat echolocation",
            medium: "air",
            emitterLabel: "Bat",
            targetLabel: "Object",
            note: "A bat emits ultrasound as it flies. The ultrasound is reflected by an object ahead of it and returns to the bat, letting the bat estimate how far away that object is even in complete darkness.",
          },
        ],
        outgoingLabel: "Sound sent out",
        returningLabel: "Sound reflected back",
        caption: "In both applications, sound must be sent out and received back after reflection.",
        hint: "Sonar propagates through water; a bat's ultrasound propagates through air.",
      },
      cards: [
        {
          title: "🚢 Shipping sector",
          body: "Sonar is used to detect objects under water.",
        },
        {
          title: "🎣 Fisheries sector",
          body: "Sonar helps locate schools of fish below the surface of the sea.",
        },
        {
          title: "🏥 Medical sector",
          body: "A sonogram uses reflected ultrasound to produce images of the inside of the body, for example scanning a foetus in the womb.",
        },
      ],
      checks: [
        {
          question: "What is ultrasound?",
          hint: "Ultrasound is a sound wave with a frequency greater than 20 000 Hz — too high for the human ear to hear.",
        },
        {
          question: "How does a bat estimate the distance of an object in the dark?",
          hint: "The bat emits ultrasound, which is reflected by the object and returns to the bat. The time the reflection takes gives information about how far away the object is.",
        },
      ],
    },
    {
      number: "10.3",
      title: "Human and Animal Hearing Limits",
      intro:
        "The human ear can only detect sound within a certain frequency range. The frequency of sound that the human ear can detect is limited to the range 20 Hz to 20 000 Hz. This range narrows as we grow older, because the ear becomes less sensitive to sound frequencies. Animals have their own hearing limits, and some reach far beyond the human range.",
      hearingRange: {
        title: "📊 Human and animal hearing ranges",
        entries: [
          { id: "human", label: "Human", minHz: 20, maxHz: 20000, human: true },
          { id: "bat", label: "Bat", minHz: 2000, maxHz: 110000 },
          { id: "dolphin", label: "Dolphin", minHz: 40, maxHz: 100000 },
          { id: "dog", label: "Dog", minHz: 67, maxHz: 45000 },
          { id: "horse", label: "Horse", minHz: 55, maxHz: 33500 },
          { id: "elephant", label: "Elephant", minHz: 16, maxHz: 12000 },
        ],
        ultrasoundLabel: "Ultrasound (>20 000 Hz)",
        caption: "The frequency scale is logarithmic because hearing ranges span several decades of frequency.",
        hint: "Bats, dolphins and dogs can hear far higher frequencies than humans, while elephants can hear frequencies below the human lower limit.",
      },
      checks: [
        {
          question: "What frequency range can the human ear hear?",
          hint: "20 Hz to 20 000 Hz. This range narrows as we grow older.",
        },
        {
          question: "Why can humans not hear the ultrasound a bat uses?",
          hint: "Ultrasound has a frequency greater than 20 000 Hz, which is above the upper limit of human hearing.",
        },
      ],
    },
    {
      number: "10.3",
      title: "Overcoming Human Hearing Limitations",
      intro:
        "Because human hearing is limited, we cannot hear sounds that are too weak or too far away. To overcome this, we use special devices that amplify or channel sound so that it becomes strong enough to hear.",
      cards: [
        {
          title: "🩺 Stethoscope",
          body: "A stethoscope channels and amplifies the sound of a patient's heartbeat directly to the doctor's ears, so a sound that is too weak can be heard clearly.",
        },
        {
          title: "👂 Hearing aid",
          body: "A hearing aid amplifies the sound entering the ear, helping a person with hearing difficulty hear more clearly.",
        },
        {
          title: "📢 Loudspeaker",
          body: "A loudspeaker makes a voice louder so that it can be heard from a distance.",
        },
      ],
      accordions: [
        {
          title: "What these devices actually do",
          body: "These devices amplify or channel sound so that a sound which is too weak or too far away becomes audible. They do not widen the human hearing frequency range. The biological range of the human ear remains 20 Hz to 20 000 Hz — a hearing aid does not let a human hear ultrasound.",
        },
      ],
      checks: [
        {
          question: "What kind of hearing problem do a stethoscope and a hearing aid help with?",
          hint: "Both help when a sound is too weak or too far away to hear. Both amplify or channel sound.",
        },
        {
          question: "Can a hearing aid let a human hear ultrasound?",
          hint: "No. These devices only amplify sound; they do not widen the 20 Hz to 20 000 Hz frequency range the human ear can detect.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can explain that sound is produced by vibration and needs a medium to propagate.",
    "I can explain why sound cannot propagate through a vacuum.",
    "I can compare the reflection and absorption of sound by different surfaces.",
    "I can order the speed of sound in solids, liquids and gases and explain why.",
    "I can define frequency and amplitude and read an oscilloscope display.",
    "I can relate amplitude to loudness and frequency to pitch.",
    "I can explain the separate effects of plucking harder and tightening a guitar string.",
    "I can explain echo and the Doppler effect with examples.",
    "I can explain human and animal hearing limits and how humans overcome their hearing limitations.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: Sound waves can propagate through a vacuum.",
      answer: false,
      explanation: "Sound needs a medium — solid, liquid or gas. No medium, no sound propagation.",
    },
    {
      type: "multiple-choice",
      question: "A rat's squeak has a higher pitch than a cow's moo. What does that tell you?",
      options: [
        "The rat's sound has a greater amplitude",
        "The rat's sound has a higher frequency",
        "The rat's sound propagates faster",
        "The rat's sound needs no medium",
      ],
      answerIndex: 1,
      explanation: "Pitch depends on frequency — a higher-pitched sound simply vibrates faster.",
    },
    {
      type: "multiple-choice",
      question: "A guitar string is plucked harder without changing its tension. What happens?",
      options: [
        "The pitch of the sound increases",
        "The frequency of vibration increases",
        "The loudness of the sound increases",
        "The sound propagates faster",
      ],
      answerIndex: 2,
      explanation:
        "Plucking harder produces a greater amplitude of vibration, so the sound becomes louder. Pitch changes only when frequency changes, for example when the string is tightened.",
    },
  ],
};
