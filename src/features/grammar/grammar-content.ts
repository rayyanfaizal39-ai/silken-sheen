export type GrammarTopic = {
  id: string;
  progressKey: string;
  title: string;
  shortTitle: string;
  description: string;
  artwork: string;
  accent: "violet" | "blue" | "mint" | "pink";
  implemented: boolean;
};

export type QuickCheckQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const GRAMMAR_PROGRESS_SCOPE = {
  subject: "english",
  form: "Form 1",
  variant: "grammar",
} as const;

export const grammarTopics: GrammarTopic[] = [
  {
    id: "01",
    progressKey: "Topic 01",
    title: "Nouns & Articles",
    shortTitle: "Nouns & Articles",
    description: "Name people, places, things, and ideas — then choose a, an, or the.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-01.webp",
    accent: "violet",
    implemented: true,
  },
  {
    id: "02",
    progressKey: "Topic 02",
    title: "Simple Present",
    shortTitle: "Simple Present",
    description: "Describe routines, habits, repeated actions, and facts.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-02.webp",
    accent: "blue",
    implemented: true,
  },
  {
    id: "03",
    progressKey: "Topic 03",
    title: "Present Continuous",
    shortTitle: "Present Continuous",
    description: "Talk about actions happening right now or around this moment.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-03.webp",
    accent: "mint",
    implemented: true,
  },
  {
    id: "04",
    progressKey: "Topic 04",
    title: "Simple Past",
    shortTitle: "Simple Past",
    description: "Describe finished actions that happened before now.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-04.webp",
    accent: "pink",
    implemented: true,
  },
  {
    id: "05",
    progressKey: "Topic 05",
    title: "Past Continuous",
    shortTitle: "Past Continuous",
    description: "Describe an action in progress at a moment in the past.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-05.webp",
    accent: "violet",
    implemented: true,
  },
  {
    id: "06",
    progressKey: "Topic 06",
    title: "Present Perfect",
    shortTitle: "Present Perfect",
    description: "Connect past experiences and actions to the present.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-06.webp",
    accent: "blue",
    implemented: true,
  },
  {
    id: "07",
    progressKey: "Topic 07",
    title: "Future Forms",
    shortTitle: "Future Forms",
    description: "Talk about predictions, decisions, and plans for the future.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-07.webp",
    accent: "mint",
    implemented: true,
  },
  {
    id: "08",
    progressKey: "Topic 08",
    title: "Subject–Verb Agreement",
    shortTitle: "Subject–Verb Agreement",
    description: "Make sure every subject and verb match in number.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-08.webp",
    accent: "pink",
    implemented: true,
  },
  {
    id: "09",
    progressKey: "Topic 09",
    title: "Modals",
    shortTitle: "Modals",
    description: "Use can, should, must, may, and might with confidence.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-09.webp",
    accent: "violet",
    implemented: true,
  },
  {
    id: "10",
    progressKey: "Topic 10",
    title: "Adjectives & Adverbs",
    shortTitle: "Adjectives & Adverbs",
    description: "Describe nouns and explain how actions happen.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-10.webp",
    accent: "blue",
    implemented: true,
  },
];

export const nounsQuickCheck: QuickCheckQuestion[] = [
  {
    question: "Which word is a proper noun?",
    options: ["city", "Kuala Lumpur", "teacher"],
    correctIndex: 1,
    explanation: "Kuala Lumpur is the specific name of a place, so it begins with capital letters.",
  },
  {
    question: "Which noun is uncountable?",
    options: ["bottle", "water", "apple"],
    correctIndex: 1,
    explanation:
      "We do not normally count water as one water, two waters. We use a measure such as a glass of water.",
  },
  {
    question: "Choose the correct phrase.",
    options: ["a umbrella", "an umbrella", "the umbrella (first mention)"],
    correctIndex: 1,
    explanation: "Umbrella begins with a vowel sound, so use an.",
  },
  {
    question: "Complete: I saw a dog. ___ dog had a red collar.",
    options: ["A", "An", "The"],
    correctIndex: 2,
    explanation: "Use the because the second sentence identifies the dog already introduced.",
  },
  {
    question: "Which sentence uses zero article correctly?",
    options: ["The football is fun.", "I like football.", "I like a football."],
    correctIndex: 1,
    explanation: "Use no article when speaking generally about sports such as football.",
  },
];

export const presentQuickCheck: QuickCheckQuestion[] = [
  {
    question: "She ___ to school by bus every day.",
    options: ["go", "goes", "going"],
    correctIndex: 1,
    explanation: "She is third-person singular, so go changes to goes.",
  },
  {
    question: "They ___ football on Saturdays.",
    options: ["plays", "play", "playing"],
    correctIndex: 1,
    explanation: "Use the base verb with they: they play.",
  },
  {
    question: "He doesn't ___ coffee.",
    options: ["likes", "liked", "like"],
    correctIndex: 2,
    explanation: "After doesn't, always use the base verb: like.",
  },
  {
    question: "___ Aisyah study every evening?",
    options: ["Do", "Does", "Is"],
    correctIndex: 1,
    explanation: "Aisyah is one person, so the question begins with Does.",
  },
  {
    question: "Which sentence describes a routine?",
    options: ["I am studying now.", "I studied yesterday.", "I study every night."],
    correctIndex: 2,
    explanation: "Every night signals a repeated routine, so use the simple present.",
  },
];

export const presentContinuousQuickCheck: QuickCheckQuestion[] = [
  {
    question: "Choose the correct sentence.",
    options: [
      "She is read a book.",
      "She reading a book.",
      "She is reading a book.",
      "She are reading a book.",
    ],
    correctIndex: 2,
    explanation: "Present continuous needs is before the verb ending in -ing: is reading.",
  },
  {
    question: "They ___ football now.",
    options: ["play", "plays", "are playing", "is playing"],
    correctIndex: 2,
    explanation: "They takes are, and the main verb becomes playing.",
  },
  {
    question: "Which sentence describes something happening now?",
    options: [
      "I walk to school every day.",
      "I am walking to school now.",
      "I walked to school yesterday.",
      "I will walk to school tomorrow.",
    ],
    correctIndex: 1,
    explanation: "Now is a time clue for an action in progress, so use am walking.",
  },
  {
    question: "Choose the correct negative.",
    options: [
      "He not sleeping.",
      "He is not sleeping.",
      "He does not sleeping.",
      "He are not sleeping.",
    ],
    correctIndex: 1,
    explanation: "Put not after the correct be-verb: he is not sleeping.",
  },
  {
    question: "Choose the correct question.",
    options: ["You are studying?", "Do you studying?", "Are you studying?", "Is you studying?"],
    correctIndex: 2,
    explanation: "Move the be-verb before the subject: Are you studying?",
  },
];

export const simplePastQuickCheck: QuickCheckQuestion[] = [
  {
    question: "Yesterday, I ___ football.",
    options: ["play", "plays", "played", "playing"],
    correctIndex: 2,
    explanation: "Yesterday is a past-time clue, so play becomes the past verb played.",
  },
  {
    question: "She ___ to school early this morning.",
    options: ["go", "went", "goes", "going"],
    correctIndex: 1,
    explanation: "Go is irregular, so its past form is went — never goed.",
  },
  {
    question: "Choose the correct negative.",
    options: ["He didn't played.", "He didn't play.", "He not played.", "He doesn't played."],
    correctIndex: 1,
    explanation:
      "Didn't already carries the past meaning, so the main verb stays as the base verb.",
  },
  {
    question: "Choose the correct question.",
    options: ["Did you went home?", "Do you went home?", "Did you go home?", "Were you go home?"],
    correctIndex: 2,
    explanation: "Past questions use Did + subject + base verb, so it is Did you go home?",
  },
  {
    question: "They ___ very tired after the match.",
    options: ["was", "were", "is", "are"],
    correctIndex: 1,
    explanation: "They is plural, so the past be-verb is were.",
  },
];

export const pastContinuousQuickCheck: QuickCheckQuestion[] = [
  {
    question: "At 9 p.m., I ___ my homework.",
    options: ["did", "was doing", "am doing", "do"],
    correctIndex: 1,
    explanation:
      "At 9 p.m. names a moment in the past, and the homework was already in progress then, so use was doing.",
  },
  {
    question: "They ___ football when it started to rain.",
    options: ["were playing", "played", "was playing", "are playing"],
    correctIndex: 0,
    explanation:
      "The game was the long action already in progress, and they is plural, so use were playing.",
  },
  {
    question: "Choose the correct sentence.",
    options: ["She were sleeping.", "She was sleep.", "She was sleeping.", "She sleeping."],
    correctIndex: 2,
    explanation: "She takes was, and the main verb must end in -ing: she was sleeping.",
  },
  {
    question: "I was studying ___ the phone rang.",
    options: ["while", "when", "now", "yesterday"],
    correctIndex: 1,
    explanation: "The phone ringing is a short action that interrupts, so use when.",
  },
  {
    question: "While I was reading, my brother ___ TV.",
    options: ["watched", "was watching", "watches", "is watching"],
    correctIndex: 1,
    explanation:
      "While joins two actions happening at the same time, so both verbs use the past continuous.",
  },
];

export const presentPerfectQuickCheck: QuickCheckQuestion[] = [
  {
    question: "She ___ finished her homework.",
    options: ["have", "has", "had", "having"],
    correctIndex: 1,
    explanation: "She is he/she/it, so the helping verb is has: she has finished.",
  },
  {
    question: "I have ___ that movie before.",
    options: ["saw", "see", "seen", "seeing"],
    correctIndex: 2,
    explanation: "After have, use the past participle. The participle of see is seen, not saw.",
  },
  {
    question: "Choose the correct sentence.",
    options: ["He has went home.", "He has gone home.", "He have gone home.", "He gone home."],
    correctIndex: 1,
    explanation: "He takes has, and the past participle of go is gone — went is the simple past.",
  },
  {
    question: "I have lived here ___ three years.",
    options: ["since", "for", "yet", "ever"],
    correctIndex: 1,
    explanation: "Three years is a length of time, so use for. Since needs a starting point.",
  },
  {
    question: "Which sentence is correct?",
    options: [
      "I have visited Johor last year.",
      "I visited Johor last year.",
      "I have visit Johor last year.",
      "I has visited Johor last year.",
    ],
    correctIndex: 1,
    explanation:
      "Last year is a finished past time, so the sentence needs the simple past: I visited Johor last year.",
  },
];

export const futureFormsQuickCheck: QuickCheckQuestion[] = [
  {
    question: "I think Malaysia ___ win.",
    options: ["will", "is", "going", "does"],
    correctIndex: 0,
    explanation: "I think signals a prediction or opinion, so use will + base verb.",
  },
  {
    question: "Look at those dark clouds. It ___ rain.",
    options: ["will to", "is going to", "going", "is"],
    correctIndex: 1,
    explanation:
      "The clouds are present evidence, so use be going to for an evidence-based prediction.",
  },
  {
    question: "She ___ her dentist tomorrow at 3 p.m.",
    options: ["meets always", "is meeting", "will meeting", "going meet"],
    correctIndex: 1,
    explanation:
      "A fixed time and date means this is an arrangement, so use the present continuous.",
  },
  {
    question: "Choose the correct sentence.",
    options: ["I will to help you.", "I will helping you.", "I will help you.", "I helping you."],
    correctIndex: 2,
    explanation: "After will, use the base verb — no to and no -ing.",
  },
  {
    question: "We are going ___ football tonight.",
    options: ["play", "playing", "to play", "played"],
    correctIndex: 2,
    explanation: "The pattern is be going to + base verb, so it is going to play.",
  },
];

export const subjectVerbQuickCheck: QuickCheckQuestion[] = [
  {
    question: "She ___ to school every day.",
    options: ["walk", "walks", "walking", "walked"],
    correctIndex: 1,
    explanation: "She is third-person singular, so the verb takes -s: walks.",
  },
  {
    question: "They ___ football after school.",
    options: ["plays", "play", "playing", "played"],
    correctIndex: 1,
    explanation: "They is plural, so use the base verb: play.",
  },
  {
    question: "He doesn't ___ coffee.",
    options: ["likes", "liked", "like", "liking"],
    correctIndex: 2,
    explanation: "Doesn't already carries the -s, so the main verb stays as the base verb.",
  },
  {
    question: "Everyone ___ ready.",
    options: ["are", "were", "is", "be"],
    correctIndex: 2,
    explanation: "Everyone looks plural but is grammatically singular, so it takes is.",
  },
  {
    question: "Aiman and Sara ___ classmates.",
    options: ["is", "are", "am", "has"],
    correctIndex: 1,
    explanation: "Two subjects joined by and are plural, so use are.",
  },
];

export const modalsQuickCheck: QuickCheckQuestion[] = [
  {
    question: "She can ___ very fast.",
    options: ["runs", "run", "running", "ran"],
    correctIndex: 1,
    explanation: "After a modal such as can, always use the base verb: run.",
  },
  {
    question: "You ___ drink more water.",
    options: ["should", "should to", "should drinking", "shoulds"],
    correctIndex: 0,
    explanation: "Should gives advice and is followed directly by the base verb — no to.",
  },
  {
    question: "It ___ rain later.",
    options: ["might", "mights", "might to", "might raining"],
    correctIndex: 0,
    explanation: "Might shows possibility. Modals never take -s, to, or -ing.",
  },
  {
    question: "Students ___ run in the science lab.",
    options: ["must", "can", "mustn't", "should"],
    correctIndex: 2,
    explanation: "Running in a lab is forbidden, and mustn't expresses prohibition.",
  },
  {
    question: "She has to ___ a uniform.",
    options: ["wears", "wearing", "wear", "wore"],
    correctIndex: 2,
    explanation: "Has to is followed by the base verb: has to wear.",
  },
];

export const adjectivesAdverbsQuickCheck: QuickCheckQuestion[] = [
  {
    question: "She is a ___ student.",
    options: ["carefully", "careful", "care", "carefulness"],
    correctIndex: 1,
    explanation: "Student is a noun, so it needs the adjective careful.",
  },
  {
    question: "She speaks English ___.",
    options: ["fluent", "fluently", "fluency", "fluenting"],
    correctIndex: 1,
    explanation: "This describes how she speaks, so use the adverb fluently.",
  },
  {
    question: "Choose the correct sentence.",
    options: ["He runs fastly.", "He runs fast.", "He runs fastestly.", "He fast runs."],
    correctIndex: 1,
    explanation: "Fast is both the adjective and the adverb — fastly is not a word.",
  },
  {
    question: "She is a good singer. She sings ___.",
    options: ["good", "well", "goodly", "betterly"],
    correctIndex: 1,
    explanation: "Good describes a noun; well describes how she sings.",
  },
  {
    question: "The teacher spoke ___.",
    options: ["quiet", "quietly", "quietness", "quieter"],
    correctIndex: 1,
    explanation: "This describes how the teacher spoke, so use the adverb quietly.",
  },
];

export function getGrammarTopic(topicId: string | undefined) {
  return grammarTopics.find((topic) => topic.id === topicId);
}
