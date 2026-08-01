import type { ScienceF3InteractiveContent } from "../interactive-types";

export const scienceF3C1InteractiveDLP: ScienceF3InteractiveContent = {
  chapter: 1,
  blogHighlight: {
    title: "Science Gallery — Usain Bolt's Reaction Time",
    body: "At the 2016 Olympics 100 m sprint final, Usain Bolt's gold-medal reaction time was 0.155 s. Any runner whose reaction time measures under 0.1 s is actually disqualified — because that's faster than a human nervous system can physically respond, meaning it must have been a false start.",
  },
  keywords: [
    "Stimulus",
    "Response",
    "Affector (receptor)",
    "Effector",
    "Voluntary action",
    "Involuntary action",
    "Tropism",
    "Nastic movement",
    "Stereoscopic vision",
    "Monocular vision",
  ],
  sections: [
    {
      number: "1.1",
      title: "Human Nervous System",
      intro:
        "The human nervous system detects stimuli, sends impulses, interprets them, and produces the right response — all in a fraction of a second. It's built from two connected parts.",
      comparison: {
        title: "Your body's control centre",
        columns: [
          { title: "Central Nervous System", body: "The brain and the spinal cord." },
          { title: "Peripheral Nervous System", body: "12 pairs of cranial nerves connecting the brain to sensory and internal organs, and 31 pairs of spinal nerves connecting the spinal cord to skeletal muscles." },
        ],
      },
      toggles: [
        {
          title: "Conscious choice, or automatic reflex?",
          instruction: "Every response your body makes falls into one of two categories. Tap to compare.",
          options: [
            {
              id: "voluntary",
              label: "Voluntary Action",
              body: "A conscious action controlled by the brain — reading, writing, walking, eating. Pathway: stimulus → affector → nerve impulse → brain → nerve impulse → effector → response.",
            },
            {
              id: "involuntary",
              label: "Involuntary Action",
              body: "An automatic action needing no conscious thought, split into two types. Involving the medulla oblongata: heartbeat, breathing, peristalsis. Reflex actions, via the spinal cord: withdrawing a hand from a hot object, sneezing.",
            },
          ],
        },
      ],
      checks: [
        { question: "Playing badminton — voluntary or involuntary?", hint: "Voluntary — it's a conscious action controlled by the brain, even though it happens fast." },
        { question: "What happens if a person's brain is injured?", hint: "Depending on severity, the person may become temporarily, partially, or completely paralysed, or lose control of certain body functions." },
      ],
    },
    {
      number: "1.2",
      title: "Stimuli and Responses in Humans",
      intro: "Humans detect stimuli — light, sound, chemicals, touch — through five sensory organs. Tap each to see its structure and function.",
      flipCards: [
        { id: "eye", icon: "👁️", label: "Eye", fact: "Detects light. Rod cells sense brightness; cone cells (red/green/blue) sense colour in bright light." },
        { id: "ear", icon: "👂", label: "Ear", fact: "Detects sound. The outer ear collects it, the middle ear amplifies it, and the inner ear (cochlea) converts it to nerve impulses." },
        { id: "nose", icon: "👃", label: "Nose", fact: "Detects smell. About 10 million sensory cells in the nasal cavity dissolve airborne chemicals in mucus." },
        { id: "tongue", icon: "👅", label: "Tongue", fact: "Detects taste via taste buds on papillae — sweet, salty, sour, bitter, umami." },
        { id: "skin", icon: "🖐️", label: "Skin", fact: "The largest sensory organ. Five receptor types detect pain, heat, cold, touch and pressure." },
      ],
      matcher: {
        title: "Match the eye defect to its correction",
        instruction: "Pick a defect, then pick the lens that corrects it.",
        pairs: [
          { id: "short", label: "Short-sightedness", match: "Concave lens" },
          { id: "long", label: "Long-sightedness", match: "Convex lens" },
          { id: "astigmatism", label: "Astigmatism", match: "Cylindrical lens" },
        ],
      },
      accordions: [
        { title: "Limitations of sight", body: "We can't see extremely tiny objects (microorganisms) or extremely distant ones (Jupiter). Optical illusions occur when the brain misinterprets an object due to visual distractions. The blind spot has no photoreceptors at all, so images falling there are simply invisible." },
        { title: "Limitations of hearing", body: "Human ears only detect 20 Hz to 20,000 Hz. As we age, the eardrum becomes less elastic and this frequency range narrows." },
        { title: "Ageing", body: "Both sight and hearing sensitivity naturally decline with age — lenses stiffen, eardrums lose elasticity." },
      ],
      checks: [
        { question: "Why is the fingertip, not the palm, used to read Braille?", hint: "The fingertip has a large number of touch receptors and a thin epidermis, making it far more sensitive to touch than the palm." },
        { question: "Why does hot food often taste better?", hint: "Smell contributes heavily to taste perception — heat releases more aroma molecules, and the combined smell and taste signal is interpreted by the brain as fuller flavour." },
      ],
    },
    {
      number: "1.3",
      title: "Stimuli and Responses in Plants",
      intro:
        "Plants detect light, water, gravity and touch, and respond in two ways: tropism, a slow directional growth response, and nastic movement, a fast response that doesn't depend on the direction of the stimulus. The Mimosa sp. folds its leaves inward the instant it's touched — a defence against enemies and strong wind that shows nastic movement in action.",
      matcher: {
        title: "Match the tropism to its stimulus",
        instruction: "Pick a tropism type, then pick the stimulus it responds to.",
        pairs: [
          { id: "photo", label: "Phototropism", match: "Light — shoots grow towards it" },
          { id: "geo", label: "Geotropism", match: "Gravity — roots grow towards it, shoots grow away" },
          { id: "hydro", label: "Hydrotropism", match: "Water — roots grow towards it" },
          { id: "thigmo", label: "Thigmotropism", match: "Touch — tendrils twine around objects" },
        ],
      },
      checks: [
        { question: "Why does positive geotropism in roots matter for a plant's survival?", hint: "Growing downward in the direction of gravity lets roots anchor the plant firmly in the ground and reach water and minerals deep in the soil." },
      ],
    },
    {
      number: "1.4",
      title: "Importance of Responses to Stimuli in Animals",
      intro:
        "Where an animal's eyes sit on its head says everything about how it survives. Because one ear is always slightly closer to a sound source, it receives that sound a fraction of a second earlier and louder than the other — the brain uses this tiny difference, stereophonic hearing, to pinpoint exactly where a sound is coming from, helping predators locate prey and prey detect and escape predators.",
      toggles: [
        {
          title: "Predator eyes vs. prey eyes",
          instruction: "Tap to compare stereoscopic and monocular vision.",
          options: [
            {
              id: "stereo",
              label: "Stereoscopic Vision",
              body: "Both eyes face forward with heavily overlapping fields of view, producing 3D images that let the brain judge distance, size and depth accurately. This is why humans and most predators (cats, owls) have it — perfect for hunting.",
            },
            {
              id: "mono",
              label: "Monocular Vision",
              body: "Eyes sit on opposite sides of the head with little to no overlap. A wide field of view lets the animal spot danger from almost any direction, though depth perception suffers. Most prey animals (rabbits, chickens) rely on this to survive.",
            },
          ],
        },
      ],
      flipCards: [
        { id: "elephant", icon: "🐘", label: "Elephant", fact: "16 – 12,000 Hz — the lowest range of the group, good for detecting deep rumbles." },
        { id: "dog", icon: "🐕", label: "Dog", fact: "67 – 45,000 Hz — famously able to hear a 'silent' dog whistle humans can't." },
        { id: "bat", icon: "🦇", label: "Bat", fact: "2,000 – 110,000 Hz — the widest and highest range, key for echolocation in the dark." },
        { id: "dolphin", icon: "🐬", label: "Dolphin", fact: "40 – 100,000 Hz — extremely high-frequency hearing for underwater sonar." },
        { id: "sealion", icon: "🦭", label: "Sea lion", fact: "450 – 50,000 Hz — tuned for both in-air and underwater sound." },
        { id: "rat", icon: "🐀", label: "Rat", fact: "200 – 80,000 Hz — sensitive to ultrasonic squeaks other rats produce." },
      ],
      checks: [
        { question: "What kind of vision would you expect a hawk (a primary predator) to have, and why?", hint: "Stereoscopic vision — accurate depth perception is essential for judging distance while diving to catch prey." },
      ],
    },
  ],
  reflectionItems: [
    "I can describe the structure and function of the human nervous system.",
    "I can explain the mechanism of hearing and sight, and how senses combine and are limited.",
    "I can describe how plants respond to stimuli to ensure their survival.",
    "I can explain how sensory organs ensure the survival of animals on Earth.",
  ],
  miniQuiz: [
    { type: "true-false", question: "True or false: Nastic movement, like tropism, always depends on the direction of the stimulus.", answer: false, explanation: "Nastic movement does NOT depend on stimulus direction — that's exactly what separates it from tropism." },
    { type: "multiple-choice", question: "A rabbit's eyes sit on opposite sides of its head. What type of vision does this give it?", options: ["Stereoscopic vision", "Monocular vision", "Stereophonic vision", "Binocular vision"], answerIndex: 1, explanation: "Monocular vision — a wide field of view helps prey animals like rabbits spot predators from nearly any direction." },
  ],
};
