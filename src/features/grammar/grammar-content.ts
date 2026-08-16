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
    implemented: false,
  },
  {
    id: "05",
    progressKey: "Topic 05",
    title: "Past Continuous",
    shortTitle: "Past Continuous",
    description: "Describe an action in progress at a moment in the past.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-05.webp",
    accent: "violet",
    implemented: false,
  },
  {
    id: "06",
    progressKey: "Topic 06",
    title: "Present Perfect",
    shortTitle: "Present Perfect",
    description: "Connect past experiences and actions to the present.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-06.webp",
    accent: "blue",
    implemented: false,
  },
  {
    id: "07",
    progressKey: "Topic 07",
    title: "Future Forms",
    shortTitle: "Future Forms",
    description: "Talk about predictions, decisions, and plans for the future.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-07.webp",
    accent: "mint",
    implemented: false,
  },
  {
    id: "08",
    progressKey: "Topic 08",
    title: "Subject–Verb Agreement",
    shortTitle: "Subject–Verb Agreement",
    description: "Make sure every subject and verb match in number.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-08.webp",
    accent: "pink",
    implemented: false,
  },
  {
    id: "09",
    progressKey: "Topic 09",
    title: "Modals",
    shortTitle: "Modals",
    description: "Use can, should, must, may, and might with confidence.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-09.webp",
    accent: "violet",
    implemented: false,
  },
  {
    id: "10",
    progressKey: "Topic 10",
    title: "Adjectives & Adverbs",
    shortTitle: "Adjectives & Adverbs",
    description: "Describe nouns and explain how actions happen.",
    artwork: "/assets/english/form-1/grammar/landing/grammar-topic-10.webp",
    accent: "blue",
    implemented: false,
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

export function getGrammarTopic(topicId: string | undefined) {
  return grammarTopics.find((topic) => topic.id === topicId);
}
