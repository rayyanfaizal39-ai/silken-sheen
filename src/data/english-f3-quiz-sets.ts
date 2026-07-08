import type { QuizQuestion } from "@/data/types";
import imgF3Q01 from "@/assets/english posters/form 3/q01.png";
import imgF3Q02 from "@/assets/english posters/form 3/q02.png";
import imgF3Q03 from "@/assets/english posters/form 3/q03.png";
import imgF3Q04 from "@/assets/english posters/form 3/q04.png";
import imgF3Q05 from "@/assets/english posters/form 3/q05.png";
import imgF3Q06 from "@/assets/english posters/form 3/q06.png";
import imgF3Q07 from "@/assets/english posters/form 3/q07.png";
import imgF3Q08 from "@/assets/english posters/form 3/q08.png";
import imgF3Q09 from "@/assets/english posters/form 3/q09.png";
import imgF3Q10 from "@/assets/english posters/form 3/q10.png";
import imgF3Q11 from "@/assets/english posters/form 3/q11.png";
import imgF3Q12 from "@/assets/english posters/form 3/q12.png";

export type EnglishQuizPaperIdF3 = "paper-1";
export type EnglishQuizSetIdF3 = "uasa-set-1";

export interface EnglishQuizSetMetaF3 {
  id: EnglishQuizSetIdF3;
  paperId: EnglishQuizPaperIdF3;
  badge: string;
  title: string;
  shortLabel: string;
  level: string;
  description: string;
  coverage: string[];
  tone: string;
}

export const ENGLISH_QUIZ_PAPERS_F3 = [
  { id: "paper-1", badge: "📄", title: "Paper 1 Quizzes", description: "UASA-style reading and language mastery." },
] satisfies Array<{ id: EnglishQuizPaperIdF3; badge: string; title: string; description: string }>;

export const ENGLISH_QUIZ_SETS_F3: EnglishQuizSetMetaF3[] = [
  {
    id: "uasa-set-1",
    paperId: "paper-1",
    badge: "📄",
    title: "UASA Set 1",
    shortLabel: "Hard Practice",
    level: "Hard Practice",
    description: "Part 1 short texts and Part 2 grammar mastery using exam-style stimuli.",
    coverage: ["Part 1", "Part 2", "20 Questions", "Multiple Choice"],
    tone: "from-rose-500 to-orange-500",
  },
];

function buildSet(rows: Array<[
  string,
  string,
  [string, string, string, string],
  number,
  string,
  QuizQuestion["difficulty"],
  string?,
]>) {
  return rows.map<QuizQuestion>(([id, question, options, answerIndex, explanation, difficulty, visualKey]) => ({
    id: `eng-f3-uasa-set-1-${id}`,
    subjectId: "english",
    form: "Form 3",
    chapter: "Paper 1 Quizzes",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
    visualKey: visualKey ?? undefined,
    image:
      visualKey === "q01" ? imgF3Q01
      : visualKey === "q02" ? imgF3Q02
      : visualKey === "q03" ? imgF3Q03
      : visualKey === "q04" ? imgF3Q04
      : visualKey === "q05" ? imgF3Q05
      : visualKey === "q06" ? imgF3Q06
      : visualKey === "q07" ? imgF3Q07
      : visualKey === "q08" ? imgF3Q08
      : visualKey === "q09" ? imgF3Q09
      : visualKey === "q10" ? imgF3Q10
      : visualKey === "q11" ? imgF3Q11
      : visualKey === "q12" ? imgF3Q12
      : undefined,
  }));
}

export const ENGLISH_QUIZ_QUESTIONS_F3 = {
  "uasa-set-1": buildSet([
    ["q01", "Read the text or study the visual. Choose the best answer.", ["Customers will get free popcorn chicken regardless of the amount spent.", "Customers are entitled to free popcorn chicken if they spend more than RM50.", "Customers can use the coupon throughout the whole year.", "Customers must buy two meals to claim the offer."], 1, "The offer is only available for purchases of RM50 and above and is valid only during the stated promotion period.", "Easy", "q01"],
    ["q02", "The graph tells us that", ["Gardening is the most popular activity.", "More students prefer social media than any other activity.", "Video gaming is the least popular activity.", "Reading and video gaming have the same number of students."], 1, "Social Media has the highest number of students.", "Easy", "q02"],
    ["q03", "The notice states that", ["Registration must be completed before 2 December.", "Participants must bring their own lunch.", "There is no limit on the number of participants.", "The camp lasts only one day."], 0, "The closing date is 1 December and lunch is included.", "Easy", "q03"],
    ["q04", "Students are NOT required to wear", ["Gloves", "Face shield", "Hazmat suit", "Safety goggles"], 2, "Only goggles and gloves are mentioned.", "Easy", "q04"],
    ["q05", "From the headline we know", ["Peterson withdrew before the tournament.", "Fans were delighted with the result.", "Peterson was expected to remain longer in the competition.", "The championship was cancelled."], 2, "\"Early exit\" implies he lost earlier than expected.", "Hard", "q05"],
    ["q06", "The message shows that Kevin is", ["angry", "in a hurry", "sleepy", "confused"], 1, "Kevin's reply suggests he is about to go on stage.", "Easy", "q06"],
    ["q07", "The poster is mainly encouraging people to", ["help keep the beach clean", "buy new shoes", "attend a concert", "join a football team"], 0, "The campaign aims to promote a beach clean-up.", "Easy", "q07"],
    ["q08", "The pie chart shows that Melinda spends most of her Sunday on", ["chores/gardening", "relaxing", "family time", "revision"], 3, "Revision takes up the largest share at 30%.", "Easy", "q08"],
    ["q09", "The visual suggests that nano influencers usually work with", ["large international companies", "small and medium-sized local businesses", "government agencies only", "sports teams only"], 1, "The poster states that nano influencers usually work with small and medium-sized local businesses.", "Medium", "q09"],
    ["q10", "The table of contents helps the reader to", ["compare prices of products", "find topics quickly", "choose a favourite author", "write a summary"], 1, "A table of contents is used to locate information quickly.", "Medium", "q10"],
    ["q11", "The dialogue shows that Malcolm is", ["ordering food politely", "refusing the meal", "complaining about the waiter", "leaving the restaurant"], 0, "The waiter asks if he is ready to order and Malcolm responds with his meal order.", "Easy", "q11"],
    ["q12", "The advertisement mainly aims to", ["warn shoppers about danger", "promote a gadget fair with heavy discounts", "announce a school holiday", "explain how a gadget works"], 1, "The poster highlights the fair, venue, dates, and discounts up to 70%.", "Easy", "q12"],
    ["q13", "The sentence in the text uses a passive voice because", ["the doer is more important than the action", "the action is more important than who did it", "the sentence must be informal", "the subject is always plural"], 1, "Passive voice focuses on the action or result.", "Hard"],
    ["q14", "Choose the correct relative clause: The student ___ won the prize is my cousin.", ["which", "who", "where", "whose"], 1, "'Who' refers to a person.", "Medium"],
    ["q15", "Choose the correct reported speech: She said that she ___ the book.", ["has finished", "had finished", "will finish", "finishes"], 1, "Reported speech often shifts the tense back.", "Hard"],
    ["q16", "Choose the correct modal: You ___ wear a seatbelt while driving.", ["must", "might", "can", "could"], 0, "Must shows obligation.", "Medium"],
    ["q17", "Choose the correct conditional: If it rains, we ___ the match.", ["cancel", "will cancel", "cancelled", "had cancelled"], 1, "This is a first conditional sentence.", "Medium"],
    ["q18", "Choose the correct sentence.", ["The results was announced yesterday.", "The results were announced yesterday.", "The results is announced yesterday.", "The results announcing yesterday."], 1, "Results is plural, so were announced is correct.", "Medium"],
    ["q19", "Choose the correct article: She bought ___ umbrella before the trip.", ["a", "an", "the", "no article"], 1, "Umbrella begins with a vowel sound.", "Easy"],
    ["q20", "Choose the correct preposition: The bus arrived ___ the station at 6 p.m.", ["to", "at", "in", "on"], 1, "At is used with a specific place of arrival.", "Easy"],
  ]),
};

export function getEnglishQuizSetF3(setId: EnglishQuizSetIdF3) {
  return ENGLISH_QUIZ_QUESTIONS_F3[setId] ?? [];
}

export function getEnglishQuizSetsForPaperF3(paperId: EnglishQuizPaperIdF3 = "paper-1") {
  return ENGLISH_QUIZ_SETS_F3.filter((set) => set.paperId === paperId);
}
