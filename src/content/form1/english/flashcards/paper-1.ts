import type { Flashcard } from "@/data/types";

export type EnglishFlashcardDeckId = "paper-1-flashcards";

export interface EnglishFlashcardDeckMeta {
  id: EnglishFlashcardDeckId;
  badge: string;
  title: string;
  count: number;
  description: string;
  tone: string;
}

export const ENGLISH_FLASHCARD_DECKS: EnglishFlashcardDeckMeta[] = [
  {
    id: "paper-1-flashcards",
    badge: "\u{1F4DA}",
    title: "Paper 1 Flashcards",
    count: 120,
    description: "High-frequency UASA revision for grammar, vocabulary, reading, information transfer, gapped text, and cohesive devices.",
    tone: "from-sky-500 to-cyan-500",
  },
];

type FlashcardPair = [string, string];

function buildDeck(deckId: EnglishFlashcardDeckId, chapter: string, pairs: FlashcardPair[]) {
  return pairs.map<Flashcard>(([front, back], index) => ({
    id: `eng-f1-${deckId}-fc${String(index + 1).padStart(3, "0")}`,
    subjectId: "english",
    form: "Form 1",
    chapter,
    front,
    back,
  }));
}

const paper1Pairs: FlashcardPair[] = [
  ["She arrived ___ 8 a.m.", "At."],
  ["The club meets ___ Friday.", "On."],
  ["We visited Penang ___ June.", "In."],
  ["The exam is ___ 2026.", "In."],
  ["The keys are ___ the drawer.", "In."],
  ["The cat is hiding ___ the table.", "Under."],
  ["The hall is ___ the office and canteen.", "Between."],
  ["Walk ___ the zebra crossing.", "Across."],
  ["Put the books ___ your bag.", "Into."],
  ["Please wait ___ the school gate.", "At."],
  ["Ali and Siti are friends. ____ play football together.", "They."],
  ["Aina is absent today. ____ has a fever.", "She."],
  ["The dog is thirsty. Give ____ some water.", "It."],
  ["My brother and I joined the camp. ____ enjoyed it.", "We."],
  ["This pencil belongs to Ravi. It is ____.", "His."],
  ["This jacket belongs to Mei Ling. It is ____.", "Hers."],
  ["The teacher called Amir and ____.", "Me."],
  ["Sara lent ____ ruler to Nadia.", "Her."],
  ["The boys forgot ____ homework.", "Their."],
  ["I saw Puan Lina. I greeted ____ politely.", "Her."],
  ["I ate ____ apple after lunch.", "An."],
  ["He bought ____ umbrella yesterday.", "An."],
  ["She wears ____ uniform to school.", "A."],
  ["We saw ____ eagle near the hill.", "An."],
  ["This is ____ useful website.", "A."],
  ["Please close ____ window near you.", "The."],
  ["They visited ____ museum in town.", "The."],
  ["I need ____ pencil for the test.", "A."],
  ["She walks to school every day. What tense?", "Simple present tense."],
  ["They watched a movie yesterday. What tense?", "Simple past tense."],
  ["We will clean the park tomorrow. What tense?", "Simple future tense."],
  ["She ____ breakfast every morning.", "Eats."],
  ["They ____ badminton last Saturday.", "Played."],
  ["I ____ visit my grandmother tomorrow.", "Will."],
  ["The pupils ____ reading quietly now.", "Are."],
  ["He ____ his homework last night.", "Did."],
  ["There ____ many students in the hall.", "Are."],
  ["There ____ a cat under the bench.", "Is."],
  ["The boys ____ ready for the trip.", "Are."],
  ["My friend ____ a new bicycle.", "Has."],
  ["She ____ to school by bus.", "Goes."],
  ["I ____ a red water bottle.", "Have."],
  ["The girls ____ excited after winning.", "Were."],
  ["The team ____ training for the race.", "Is."],
  ["I stayed home ____ I was sick.", "Because."],
  ["I wanted to play, ____ it rained.", "But."],
  ["You may choose tea ____ juice.", "Or."],
  ["Aiman bought a notebook ____ a pen.", "And."],
  ["She was tired, ____ she finished her work.", "But."],
  ["We brought umbrellas ____ the sky was dark.", "Because."],
  ["Choose the noun: happy, happiness, happily.", "Happiness."],
  ["Choose the adjective: care, careful, carefully.", "Careful."],
  ["Choose the adverb: quick, quickly, quickness.", "Quickly."],
  ["She answered the question ____.", "Correctly."],
  ["The ____ of the team was excellent.", "Performance."],
  ["Please be ____ when crossing the road.", "Careful."],
  ["He spoke ____ during the presentation.", "Confidently."],
  ["The students showed great ____.", "Teamwork."],
  ["What is the synonym of \"happy\"?", "Joyful."],
  ["What is the synonym of \"big\"?", "Large."],
  ["What is the synonym of \"small\"?", "Tiny."],
  ["What is the synonym of \"fast\"?", "Quick."],
  ["What is the synonym of \"begin\"?", "Start."],
  ["What is the synonym of \"end\"?", "Finish."],
  ["What is the synonym of \"help\"?", "Assist."],
  ["What is the synonym of \"important\"?", "Significant."],
  ["What is the synonym of \"safe\"?", "Secure."],
  ["What is the synonym of \"tired\"?", "Exhausted."],
  ["What is the opposite of \"difficult\"?", "Easy."],
  ["What is the opposite of \"careful\"?", "Careless."],
  ["What is the opposite of \"dangerous\"?", "Safe."],
  ["What is the opposite of \"noisy\"?", "Quiet."],
  ["What is the opposite of \"early\"?", "Late."],
  ["What is the opposite of \"remember\"?", "Forget."],
  ["What is the opposite of \"accept\"?", "Reject."],
  ["What is the opposite of \"increase\"?", "Decrease."],
  ["What is the opposite of \"brave\"?", "Cowardly."],
  ["What is the opposite of \"polite\"?", "Rude."],
  ["A notice says \"Library Closed on Friday\". What is the main purpose?", "To inform."],
  ["A poster promotes a new tuition centre. What is its purpose?", "To advertise a service."],
  ["A sign says \"Wet Floor\". What is the purpose?", "To warn."],
  ["A message says \"Meet at Gate B after practice\". What detail is important?", "Gate B."],
  ["A banner says \"Safety Week: Wear Your Helmet\". What is the purpose?", "To advise about safety."],
  ["A notice says \"Bring your consent form by Monday\". What must students bring?", "Consent form."],
  ["Which reading skill helps find a specific date quickly?", "Scanning."],
  ["Which reading skill helps identify the main idea?", "Skimming."],
  ["Which skill helps you find a name in a timetable?", "Scanning."],
  ["Which skill helps you understand a passage quickly?", "Skimming."],
  ["A passage is mostly about recycling at school. What should you identify?", "Main idea."],
  ["A text gives examples after the main point. What are they?", "Supporting details."],
  ["The writer wants students to join a clean-up. What is the intention?", "To persuade."],
  ["The text says Ali smiled after winning. How did Ali feel?", "Happy."],
  ["A word is unfamiliar. What should you use first?", "Context clues."],
  ["A story says the sky was dark and thunder was loud. What can you infer?", "It may rain."],
  ["Pollution from cars causes ______.", "Air pollution."],
  ["Planting trees is a ______ to climate change.", "Solution."],
  ["Heavy rain caused the match to be ______.", "Postponed."],
  ["A table shows 25 pupils chose football. Which number is key?", "25."],
  ["A timetable shows choir at 4.00 p.m. What should you scan for?", "Time."],
  ["In information transfer, names, dates and numbers are ______.", "Keywords."],
  ["Problem: plastic waste. Solution: use ______ bags.", "Reusable."],
  ["Cause: no rain for weeks. Effect: the plants ______.", "Died."],
  ["Effect: students arrived late. Possible cause: the bus was ______.", "Delayed."],
  ["A chart shows RM12, RM8 and RM20. Which skill helps find the cheapest item?", "Scanning."],
  ["Which word shows contrast: Furthermore or However?", "However."],
  ["Which word shows addition: Moreover or Therefore?", "Moreover."],
  ["Which word shows result: Therefore or However?", "Therefore."],
  ["Which word shows example: For example or Finally?", "For example."],
  ["Which word shows sequence: Next or Because?", "Next."],
  ["Which word ends a sequence: Finally or Besides?", "Finally."],
  ["Which word adds another point: Besides or Although?", "Besides."],
  ["Which word shows cause: Because or Meanwhile?", "Because."],
  ["Which phrase shows conclusion: To sum up or For instance?", "To sum up."],
  ["Which word shows two things happen at the same time?", "Meanwhile."],
  ["Which reference word fits: Aiman lost his bag. ____ was blue.", "It."],
  ["Which reference word fits: The girls entered the hall. ____ sat quietly.", "They."],
  ["Which reference word fits: This activity is fun. ____ also teaches teamwork.", "It."],
  ["A gap follows \"I was tired.\" Which connector fits before an opposite idea?", "However."],
  ["A gap follows \"First, wash your hands.\" What sequence word may come next?", "Next."],
  ["A gap follows \"The road was slippery.\" Which result connector fits?", "Therefore."],
];

export const ENGLISH_FLASHCARD_DECK_CARDS: Record<EnglishFlashcardDeckId, Flashcard[]> = {
  "paper-1-flashcards": buildDeck("paper-1-flashcards", "Paper 1 Flashcards", paper1Pairs),
};

export function getEnglishFlashcardsForDeck(deckId: EnglishFlashcardDeckId) {
  return ENGLISH_FLASHCARD_DECK_CARDS[deckId] ?? [];
}

export function isEnglishFlashcardDeckId(value: string | null): value is EnglishFlashcardDeckId {
  return value === "paper-1-flashcards";
}
