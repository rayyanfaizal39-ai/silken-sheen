import type { Flashcard } from "@/data/types";

export type EnglishFlashcardDeckIdF3 = "f3-paper-1" | "f3-paper-2" | "f3-paper-3";

export interface EnglishFlashcardDeckMetaF3 {
  id: EnglishFlashcardDeckIdF3;
  badge: string;
  title: string;
  count: number;
  description: string;
  tone: string;
}

export const ENGLISH_FLASHCARD_DECKS_F3: EnglishFlashcardDeckMetaF3[] = [
  {
    id: "f3-paper-1",
    badge: "📚",
    title: "Grammar & Language Awareness",
    count: 10,
    description: "Exam-ready grammar checks for higher-level Form 3 accuracy.",
    tone: "from-sky-500 to-cyan-500",
  },
  {
    id: "f3-paper-2",
    badge: "✍️",
    title: "Vocabulary & Idioms",
    count: 10,
    description: "Stronger word choices, idioms, and language use for UASA writing and reading.",
    tone: "from-emerald-500 to-teal-500",
  },
  {
    id: "f3-paper-3",
    badge: "📝",
    title: "Writing Skills & Exam Techniques",
    count: 20,
    description: "Planning, cohesion, inference, and exam strategy for stronger Form 3 answers.",
    tone: "from-violet-500 to-fuchsia-500",
  },
];

type FlashcardPair = [string, string];

function buildDeck(deckId: EnglishFlashcardDeckIdF3, chapter: string, pairs: FlashcardPair[]) {
  return pairs.map<Flashcard>(([front, back], index) => ({
    id: `eng-f3-${deckId}-fc${String(index + 1).padStart(3, "0")}`,
    subjectId: "english",
    form: "Form 3",
    chapter,
    front,
    back,
  }));
}

const paper1Pairs: FlashcardPair[] = [
  [
    'Identify and correct the error: "The trend in child abuse cases are worrying and requires immediate action."',
    'is\n\n"Trend" is singular, so it takes the singular verb "is".',
  ],
  [
    'Choose the correct preposition: "The Louvre Museum is located (in / on) the right bank of the Seine in Paris."',
    'on\n\nUse "on" for something situated along a bank or edge.',
  ],
  [
    'Identify and correct the error: "The George Town Festival is an annual affair who celebrates cultural heritage."',
    'which / that\n\nUse "which" or "that" for events or things, not "who".',
  ],
  [
    'Correct the word form: "Children should be given the opportunity to lead happy and save lives."',
    'safe\n\n"Safe" is the adjective that describes "lives".',
  ],
  [
    'Identify the error: "Typically, the family tree begins with the recent generation and traces backward along time."',
    'through\n\nThe correct phrase is "through time".',
  ],
  [
    'Choose the correct tense: "Fiffy (jogs / is jogging) at the park every morning to stay healthy."',
    'jogs\n\nUse Simple Present for routines and habits.',
  ],
  [
    'Correct the comparative/superlative error: "Physical abuse takes the higher percentage of documented cases in the research."',
    'highest\n\nUse the superlative when one item is compared with all others.',
  ],
  [
    'Identify the error: "Visitors can take a hole day to walk through the four levels of the museum."',
    'whole\n\n"Whole" means entire.',
  ],
  [
    'Choose the correct causative verb: "My father doesn\'t (let / got) me spend too much time on the computer."',
    'let\n\n"Let" means give permission.',
  ],
  [
    'Correct the error: "The remains of the medieval fortress could still be seen in the basement today."',
    'can\n\nUse "can" for present ability or possibility.',
  ],
];

const paper2Pairs: FlashcardPair[] = [
  ['Complete the idiom: "He is a ________."', 'chip off the old block\n\nSomeone very similar to a parent.'],
  ['What do you call food that has just been picked from the farm?', 'Fresh\n\nRecently harvested and not spoiled.'],
  ['Choose the correct idiom: "She has some ________ she would like to hide."', 'skeletons in her closet\n\nEmbarrassing or shocking secrets.'],
  ['Fill in the blank: "You need to ________ on sugary snacks."', 'cut down\n\nConsume less of something.'],
  ['Match the meaning: A person who avoids all animal products.', 'Vegan'],
  ['Complete the idiom: "I am ________ to your suggestions!"', 'all ears\n\nReady and eager to listen.'],
  ['Choose the correct homophone: "I didn\'t know (whether / weather) to bring a raincoat."', 'whether\n\nUsed when expressing a choice.'],
  ['Identify the phrasal verb: To resemble an older family member.', 'takes after\n\nExample: "She takes after her mother."'],
  ['Fill in the blank: Food that lasts for a long time without spoiling is called ________.', 'non-perishable'],
  ['Identify the error: "Coral reefs thrive due to a partnership with tiny algae who bring them energy."', 'which / that\n\nUse "which" or "that" for non-human nouns.'],
];

const paper3Pairs: FlashcardPair[] = [
  ['Which register should you use when replying to an email from your best friend?', 'Informal register.\n\nUse friendly language, contractions, and a natural tone.'],
  ['What is the purpose of a topic sentence?', 'It introduces the main idea of a paragraph and guides the reader.'],
  ['Complete the sentence: “________, many students prefer studying online because it is more flexible.”', 'Nowadays.\n\nIt is suitable for beginning a general statement.'],
  ['Why should every body paragraph focus on only one main idea?', 'It improves organisation and makes your writing easier to understand.'],
  ['What is the function of linking words such as “however”, “therefore” and “moreover”?', 'They connect ideas smoothly and improve cohesion.'],
  ['Which sentence gives a stronger opinion?\nA. I think recycling is good.\nB. I firmly believe recycling is essential for protecting our environment.', 'B.\n\nIt uses stronger vocabulary and explains the opinion clearly.'],
  ['What should you do before writing your essay?', 'Plan your ideas into an introduction, body paragraphs and conclusion.'],
  ['Why is proofreading important?', 'It helps you identify grammar, spelling and punctuation mistakes before submitting your work.'],
  ['Which sentence uses better vocabulary?\nA. The food was nice.\nB. The meal was delicious and beautifully presented.', 'B.\n\nSpecific vocabulary creates stronger descriptions.'],
  ['What should a conclusion do?', 'Summarise the main ideas and leave the reader with a clear final impression.'],
  ['What is an inference?', 'A conclusion made using clues from the text rather than information stated directly.'],
  ['How can you identify the writer’s purpose?', 'Ask why the writer wrote the text: to inform, persuade, entertain or advise.'],
  ['What is the difference between a fact and an opinion?', 'A fact can be proven.\n\nAn opinion expresses a personal belief or judgement.'],
  ['What does the tone of a text refer to?', 'The writer’s attitude or feeling, such as formal, humorous, serious or persuasive.'],
  ['When answering comprehension questions, why should you underline keywords?', 'Keywords help you locate the relevant information quickly in the passage.'],
  ['Why is scanning different from skimming?', 'Scanning looks for specific information.\n\nSkimming looks for the general idea.'],
  ['In a gapped text, why should you read the sentence before and after the gap?', 'They provide clues about logical flow and cohesion.'],
  ['What are reference words?', 'Words like he, she, it, they, this and these that refer to something mentioned earlier.'],
  ['Why should you avoid copying long sentences from a reading passage?', 'Examiners usually expect concise answers that follow the word limit.'],
  ['What is the best strategy when you are unsure of an MCQ answer?', 'Eliminate incorrect options first, then choose the most logical answer based on the text.'],
];

export const ENGLISH_FLASHCARD_DECK_CARDS_F3: Record<EnglishFlashcardDeckIdF3, Flashcard[]> = {
  "f3-paper-1": buildDeck("f3-paper-1", "Paper 1 - Reading & Language Awareness", paper1Pairs),
  "f3-paper-2": buildDeck("f3-paper-2", "Paper 2 - Writing", paper2Pairs),
  "f3-paper-3": buildDeck("f3-paper-3", "Paper 2 - Writing", paper3Pairs),
};

export function getEnglishFlashcardsForDeckF3(deckId: EnglishFlashcardDeckIdF3) {
  return ENGLISH_FLASHCARD_DECK_CARDS_F3[deckId] ?? [];
}

export function isEnglishFlashcardDeckIdF3(value: string | null): value is EnglishFlashcardDeckIdF3 {
  return value === "f3-paper-1" || value === "f3-paper-2" || value === "f3-paper-3";
}
