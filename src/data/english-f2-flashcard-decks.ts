import type { Flashcard } from "@/data/types";

export type EnglishFlashcardDeckIdF2 =
  | "f2-grammar-language"
  | "f2-reading-vocabulary"
  | "f2-writing-techniques";

export interface EnglishFlashcardDeckMetaF2 {
  id: EnglishFlashcardDeckIdF2;
  badge: string;
  title: string;
  count: number;
  description: string;
  tone: string;
}

export const ENGLISH_FLASHCARD_DECKS_F2: EnglishFlashcardDeckMetaF2[] = [
  {
    id: "f2-grammar-language",
    badge: "📚",
    title: "Grammar & Language",
    count: 20,
    description: "Core grammar points, sentence patterns, and common errors for Tingkatan 2.",
    tone: "from-sky-500 to-cyan-500",
  },
  {
    id: "f2-reading-vocabulary",
    badge: "📖",
    title: "Reading Skills & Vocabulary",
    count: 20,
    description: "Main ideas, inference, context clues, audience, tone, and academic words.",
    tone: "from-emerald-500 to-teal-500",
  },
  {
    id: "f2-writing-techniques",
    badge: "📝",
    title: "Writing Skills & Exam Techniques",
    count: 20,
    description: "Messages, essays, connectors, paragraphs, editing, and exam strategies.",
    tone: "from-violet-500 to-fuchsia-500",
  },
];

type FlashcardPair = [string, string];

function buildDeck(deckId: EnglishFlashcardDeckIdF2, chapter: string, pairs: FlashcardPair[]) {
  return pairs.map<Flashcard>(([front, back], index) => ({
    id: `eng-f2-${deckId}-fc${String(index + 1).padStart(3, "0")}`,
    subjectId: "english",
    form: "Form 2",
    chapter,
    front,
    back,
  }));
}

const grammarPairs: FlashcardPair[] = [
  ["What does a conjunction do?", "It connects words, phrases, or clauses smoothly."],
  ["What tense is used for an action happening now?", "Present continuous tense."],
  ["She ___ to school every day. (go)", "Goes."],
  ["The pupils ___ in the library now. (study)", "Are studying."],
  ["Choose the correct article: ___ umbrella", "An."],
  ["Choose the correct article: ___ book", "A."],
  ["What pronoun replaces 'Amir and I'?", "We."],
  ["The cat is hiding ___ the chair.", "Under."],
  ["The meeting is ___ Friday.", "On."],
  ["He arrived ___ 8 a.m.", "At."],
  ["What is subject-verb agreement?", "The verb must match the subject in number."],
  ["The boys ___ ready. (is/are)", "Are."],
  ["What part of speech describes a noun?", "An adjective."],
  ["What part of speech describes a verb?", "An adverb."],
  ["Choose the correct word: She spoke ___.", "Politely."],
  ["What is a common grammar error?", "Using the wrong verb form."],
  ["Correct: The players was tired.", "The players were tired."],
  ["Correct: There is many books.", "There are many books."],
  ["Correct: Aisha and I is ready.", "Aisha and I are ready."],
  ["What does a preposition show?", "Place, time, or direction."],
];

const readingPairs: FlashcardPair[] = [
  ["What is the main idea?", "The central point of a text."],
  ["What are supporting details?", "Facts or examples that support the main idea."],
  ["What is an inference?", "A conclusion made using clues and reasoning."],
  ["What are context clues?", "Words or sentences that help you understand unfamiliar vocabulary."],
  ["What is the author's purpose?", "Why the writer wrote the text."],
  ["What is audience?", "The reader or group a text is written for."],
  ["What does tone mean?", "The writer's feeling or attitude."],
  ["What is scanning?", "Looking quickly for specific information."],
  ["What is information transfer?", "Copying exact information into a table or organiser."],
  ["What is a visual material?", "A poster, notice, chart, or table."],
  ["What does 'postponed' mean?", "Delayed to a later time."],
  ["What does 'limited' suggest?", "Only a certain number can join."],
  ["What is a synonym?", "A word with the same or similar meaning."],
  ["What is an antonym?", "A word with the opposite meaning."],
  ["What does 'assist' mean?", "Help."],
  ["What does 'cautious' mean?", "Careful and alert."],
  ["What does 'bustling' describe?", "Full of activity and movement."],
  ["What clue can show audience in an advert?", "Words like 'students', 'parents', or 'members'."],
  ["What clue can show purpose in a poster?", "Words like 'join', 'save', or 'improve'."],
  ["What is a short report?", "A factual text giving information about an event or result."],
];

const writingPairs: FlashcardPair[] = [
  ["Why should you plan before writing?", "Planning helps organise ideas clearly."],
  ["What should Task A answer?", "Every point in the message."],
  ["What is Task A usually?", "A short reply to a communicative message."],
  ["What is Task B usually?", "A short descriptive or narrative essay."],
  ["What is a topic sentence?", "The sentence that states the main idea of a paragraph."],
  ["What should one paragraph focus on?", "One main idea."],
  ["What is a linking word?", "A word that connects ideas smoothly."],
  ["Give one result connector.", "Therefore."],
  ["Give one contrast connector.", "However."],
  ["Give one sequence connector.", "First, next, then, finally."],
  ["What is formal language?", "Polite language used with teachers or officials."],
  ["What is informal language?", "Casual language used with friends."],
  ["Why edit your writing?", "To check grammar, spelling, and punctuation."],
  ["What should you do in a reply to a teacher?", "Use a polite tone."],
  ["What should you do in a reply to a friend?", "Use a friendly tone."],
  ["What makes writing clearer?", "Short, well-organised paragraphs."],
  ["What should you include in a descriptive essay?", "Sensory details and vivid vocabulary."],
  ["What should a narrative essay include?", "Characters, events, and a clear ending."],
  ["What helps a message sound natural?", "Simple, direct sentences."],
  ["What is a good exam habit?", "Leave time to check your work."],
];

export const ENGLISH_FLASHCARD_DECK_CARDS_F2: Record<EnglishFlashcardDeckIdF2, Flashcard[]> = {
  "f2-grammar-language": buildDeck("f2-grammar-language", "Grammar & Language", grammarPairs),
  "f2-reading-vocabulary": buildDeck("f2-reading-vocabulary", "Reading Skills & Vocabulary", readingPairs),
  "f2-writing-techniques": buildDeck("f2-writing-techniques", "Writing Skills & Exam Techniques", writingPairs),
};

export function getEnglishFlashcardsForDeckF2(deckId: EnglishFlashcardDeckIdF2) {
  return ENGLISH_FLASHCARD_DECK_CARDS_F2[deckId] ?? [];
}

export function isEnglishFlashcardDeckIdF2(value: string | null): value is EnglishFlashcardDeckIdF2 {
  return value === "f2-grammar-language" || value === "f2-reading-vocabulary" || value === "f2-writing-techniques";
}
