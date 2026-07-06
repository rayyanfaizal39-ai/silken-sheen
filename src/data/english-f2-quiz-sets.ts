import type { QuizQuestion } from "@/data/types";

export type EnglishQuizPaperIdF2 = "paper-1";
export type EnglishQuizSetIdF2 = "objective-a" | "objective-b" | "objective-c";

export interface EnglishQuizSetMetaF2 {
  id: EnglishQuizSetIdF2;
  paperId: EnglishQuizPaperIdF2;
  badge: string;
  title: string;
  shortLabel: string;
  level: string;
  description: string;
  coverage: string[];
  tone: string;
}

export const ENGLISH_QUIZ_PAPERS_F2: Array<{
  id: EnglishQuizPaperIdF2;
  badge: string;
  title: string;
  description: string;
}> = [
  {
    id: "paper-1",
    badge: "📄",
    title: "Paper 1 Quizzes",
    description: "Objective reading and language awareness practice.",
  },
];

export const ENGLISH_QUIZ_SETS_F2: EnglishQuizSetMetaF2[] = [
  {
    id: "objective-a",
    paperId: "paper-1",
    badge: "📄",
    title: "Objective A",
    shortLabel: "Easy Practice",
    level: "Easy Practice",
    description: "Short texts & visual materials plus grammar & language awareness.",
    coverage: ["Part 1", "Part 2", "30 Questions", "Multiple Choice"],
    tone: "from-sky-500 to-cyan-500",
  },
  {
    id: "objective-b",
    paperId: "paper-1",
    badge: "📄",
    title: "Objective B",
    shortLabel: "Medium Practice",
    level: "Medium Practice",
    description: "Information transfer and reading comprehension practice.",
    coverage: ["Part 3", "Part 4", "30 Questions", "Multiple Choice"],
    tone: "from-emerald-500 to-teal-500",
  },
  {
    id: "objective-c",
    paperId: "paper-1",
    badge: "📄",
    title: "Objective C",
    shortLabel: "Hard Practice",
    level: "Hard Practice",
    description: "Gapped text and extended writing knowledge-based questions.",
    coverage: ["Part 5", "Part 6", "30 Questions", "Multiple Choice"],
    tone: "from-violet-500 to-fuchsia-500",
  },
];

type EnglishQuizTuple = [
  string,
  string,
  [string, string, string, string],
  number,
  string,
  QuizQuestion["difficulty"],
];

function buildSet(setId: EnglishQuizSetIdF2, rows: EnglishQuizTuple[]) {
  return rows.map<QuizQuestion>(([id, question, options, answerIndex, explanation, difficulty]) => ({
    id: `eng-f2-${setId}-${id}`,
    subjectId: "english",
    form: "Form 2",
    chapter: "Paper 1 Quizzes",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
  }));
}

const objectiveA = buildSet("objective-a", [
  ["q01", "WhatsApp message: 'Please bring your science notebook for the class activity tomorrow.' What should the student bring?", ["A science notebook", "A storybook", "A calculator", "A ruler only"], 0, "The message directly asks for the science notebook.", "Easy"],
  ["q02", "Notice: 'Library closes at 4.30 p.m. every Friday.' When does the library close on Friday?", ["4.00 p.m.", "4.15 p.m.", "4.30 p.m.", "5.00 p.m."], 2, "The notice gives the exact closing time.", "Easy"],
  ["q03", "Poster: 'Join the Eco Club and help keep our school clean!' What is the poster encouraging students to do?", ["Buy school uniforms", "Join the Eco Club", "Visit the canteen", "Study at home"], 1, "The poster invites students to join the club.", "Easy"],
  ["q04", "Advertisement: 'Buy two notebooks and get one pen free.' What is the free item?", ["A pencil", "A pen", "An eraser", "A ruler"], 1, "The ad states one pen is free.", "Easy"],
  ["q05", "Email: 'Dear teacher, I will be absent tomorrow because I have a fever.' Why will the student be absent?", ["He is on holiday", "He has a fever", "He forgot his books", "He has extra tuition"], 1, "The email clearly states the reason.", "Easy"],
  ["q06", "Announcement: 'The sports day rehearsal has been moved to Monday morning.' What has changed?", ["The venue", "The time of rehearsal", "The prize", "The teacher"], 1, "The rehearsal is now on Monday morning.", "Easy"],
  ["q07", "Sign: 'Do not enter. Wet paint.' What should people do?", ["Touch the wall", "Enter carefully", "Stay out", "Sit nearby"], 2, "The sign warns people not to enter.", "Easy"],
  ["q08", "Brochure: 'Our holiday camp includes games, meals and transport.' What is included in the camp?", ["Only games", "Games, meals and transport", "Only meals", "Only transport"], 1, "The brochure lists all three items.", "Easy"],
  ["q09", "Short report: 'The class collected 35 bottles and 20 cans.' What did the class collect more of?", ["Cans", "Bottles", "Paper", "None"], 1, "35 bottles is more than 20 cans.", "Easy"],
  ["q10", "Message: 'Meet me at the school gate after assembly.' Where should the student meet?", ["At the school gate", "At the library", "At the hall", "At the field"], 0, "The message gives the meeting place clearly.", "Easy"],
  ["q11", "Which sentence is correct?", ["She are my sister.", "She is my sister.", "She am my sister.", "She be my sister."], 1, "A singular subject uses is.", "Easy"],
  ["q12", "Choose the correct word: The pupils ___ in the library now.", ["study", "studies", "are studying", "studied"], 2, "Now shows present continuous tense.", "Easy"],
  ["q13", "Choose the correct article: He bought ___ umbrella.", ["a", "an", "the", "no article"], 1, "Umbrella begins with a vowel sound.", "Easy"],
  ["q14", "Choose the correct preposition: The bag is ___ the chair.", ["under", "because", "from", "through"], 0, "Under shows position.", "Easy"],
  ["q15", "Choose the correct conjunction: I wanted to play outside, ___ it rained.", ["but", "or", "and", "so"], 0, "But shows contrast.", "Easy"],
  ["q16", "Choose the correct pronoun: Amir and I finished the work. ___ were tired.", ["He", "We", "They", "It"], 1, "Amir and I becomes we.", "Easy"],
  ["q17", "Choose the correct past tense: They ___ the museum yesterday.", ["visit", "visits", "visited", "visiting"], 2, "Yesterday signals the simple past tense.", "Easy"],
  ["q18", "Choose the correct sentence.", ["The cats is sleeping.", "The cat are sleeping.", "The cat is sleeping.", "The cat sleeping is."], 2, "Cat is singular, so is sleeping is correct.", "Easy"],
  ["q19", "Which word is a noun?", ["quickly", "beautiful", "school", "happily"], 2, "School is a naming word.", "Easy"],
  ["q20", "Choose the correct adjective: The cake is very ___.", ["sweetly", "sweet", "sweeter", "sweetness"], 1, "An adjective describes the cake.", "Easy"],
  ["q21", "Which word best completes the sentence? The boy ran ___ to catch the bus.", ["slow", "slowly", "slower", "slowness"], 1, "An adverb describes how he ran.", "Easy"],
  ["q22", "Choose the correct sentence.", ["Where you are going?", "Where are you going?", "Where are going you?", "Where you going are?"], 1, "Questions need correct word order.", "Easy"],
  ["q23", "Choose the correct modal: Students ___ wear a uniform at school.", ["must", "can", "might", "could"], 0, "Must shows obligation.", "Easy"],
  ["q24", "Which sentence is punctuated correctly?", ["please close the door.", "Please close the door.", "Please close the door", "please close the door"], 1, "A sentence starts with a capital letter and ends with a full stop.", "Easy"],
  ["q25", "Choose the correct sentence.", ["My brother and I is ready.", "My brother and I are ready.", "My brother and I am ready.", "My brother and I was ready."], 1, "A plural subject uses are.", "Easy"],
  ["q26", "Choose the correct word: The teacher gave us a ___ reminder.", ["kind", "kindly", "kindness", "kinder"], 0, "Kind is an adjective describing reminder.", "Easy"],
  ["q27", "Choose the correct preposition of time: The class starts ___ 8.00 a.m.", ["in", "on", "at", "by"], 2, "At is used for a specific time.", "Easy"],
  ["q28", "Which word means 'help'?", ["assist", "leave", "hide", "fail"], 0, "Assist means help.", "Easy"],
  ["q29", "Choose the correct sentence.", ["There are many books in the shelf.", "There is many books in the shelf.", "There are many books on the shelf.", "There is many book on the shelf."], 2, "Books is plural and on the shelf is correct.", "Easy"],
  ["q30", "Choose the correct sentence.", ["The children plays in the park.", "The children play in the park.", "The children playing in the park.", "The children played in the park now."], 1, "Children is plural, so play is correct.", "Easy"],
]);

const objectiveB = buildSet("objective-b", [
  ["q01", "Table: Football 18, Badminton 24, Chess 12. Which club has the most members?", ["Football", "Badminton", "Chess", "All equal"], 1, "Badminton has the highest number.", "Easy"],
  ["q02", "Flow chart: Register -> Attend briefing -> Start activity. What happens after registering?", ["Start activity", "Attend briefing", "Go home", "Take lunch"], 1, "Briefing comes right after register.", "Easy"],
  ["q03", "Mind map: 'Ways to save water' includes fix leaks, shorter showers, reuse water. Which branch is about repairing something?", ["Fix leaks", "Shorter showers", "Reuse water", "None"], 0, "Fix leaks refers to repairing a problem.", "Easy"],
  ["q04", "Passage: 'The school canteen sells nasi lemak on Monday, noodles on Tuesday and sandwiches on Wednesday.' What is sold on Tuesday?", ["Nasi lemak", "Noodles", "Sandwiches", "Soup"], 1, "The passage directly states noodles.", "Easy"],
  ["q05", "Table: T-shirts S=9, M=15, L=11. Which size is needed the most?", ["S", "M", "L", "All equal"], 1, "Size M has the highest number.", "Easy"],
  ["q06", "A timetable shows Drama at 2.00 p.m., Choir at 2.30 p.m., and Debate at 3.00 p.m. Which activity starts last?", ["Drama", "Choir", "Debate", "All together"], 2, "Debate starts at the latest time.", "Easy"],
  ["q07", "Information: The book fair prices are comic RM6, novel RM12, dictionary RM20. Which is cheapest?", ["Comic", "Novel", "Dictionary", "All the same"], 0, "Comic has the lowest price.", "Easy"],
  ["q08", "Survey: 10 students like tea, 14 like juice and 6 like milk. How many students were surveyed?", ["20", "28", "30", "40"], 1, "10 + 14 + 6 = 30.", "Easy"],
  ["q09", "Passage: 'Mira helps her grandmother water the plants every Saturday.' What does Mira do every Saturday?", ["Cooks dinner", "Waters the plants", "Repairs a bicycle", "Visits the market"], 1, "The passage states she waters the plants.", "Easy"],
  ["q10", "Passage: 'The rain was heavy, so the match was postponed.' Why was the match postponed?", ["The players were tired", "The rain was heavy", "The field was new", "The coach was absent"], 1, "The cause is given directly.", "Easy"],
  ["q11", "Passage: 'The class monitor spoke politely to solve the problem.' How did the monitor speak?", ["Rudely", "Politely", "Loudly", "Quickly"], 1, "The passage uses the word politely.", "Easy"],
  ["q12", "What does 'nervously' mean in the sentence: 'He waited nervously for the results.'?", ["In a worried way", "In a funny way", "In a sleepy way", "In a noisy way"], 0, "Nervously means with worry or fear.", "Easy"],
  ["q13", "Passage: 'The app reminds users to drink water every two hours.' What is the app for?", ["Health", "Shopping", "Gaming", "Travel"], 0, "A reminder to drink water is about health.", "Easy"],
  ["q14", "Passage: 'The class raised money by selling bookmarks during recess.' How did the class raise money?", ["By selling bookmarks", "By washing cars", "By planting trees", "By singing songs"], 0, "The passage states they sold bookmarks.", "Easy"],
  ["q15", "Read: 'The hikers turned back when the sky became dark.' What was the likely reason?", ["They were hungry", "They were being safe", "They forgot the map", "They were bored"], 1, "Turning back in darkness is a safety choice.", "Easy"],
  ["q16", "Read: 'The school website was updated with the new exam timetable.' Where can students find the timetable?", ["On the school website", "In the canteen", "At the library desk", "On the field"], 0, "The timetable is on the website.", "Easy"],
  ["q17", "Read: 'The stray kitten hid under the bench until a pupil gently placed food nearby.' What did the pupil do?", ["Scared the kitten", "Fed the kitten gently", "Closed the door", "Removed the bench"], 1, "The pupil placed food nearby.", "Easy"],
  ["q18", "Read: 'Lina saved her project in two places to avoid losing it.' What does this show about Lina?", ["She is careful", "She is careless", "She is noisy", "She is late"], 0, "Saving work in two places shows care.", "Easy"],
  ["q19", "Choose the best heading for a text about saving electricity at home.", ["My Favourite Food", "Ways to Save Electricity", "A Day at the Beach", "The History of Football"], 1, "The heading matches the topic.", "Easy"],
  ["q20", "Choose the sentence that best completes a message asking for help.", ["Can you help me carry the boxes after school?", "I bought noodles yesterday.", "The sky is blue.", "My shoes are black."], 0, "It clearly asks for help.", "Easy"],
  ["q21", "Choose the correct sentence.", ["The players was tired after the match.", "The players were tired after the match.", "The players is tired after the match.", "The players be tired after the match."], 1, "Players is plural, so were is correct.", "Medium"],
  ["q22", "Choose the correct conjunction: She practised every day, ___ she improved quickly.", ["but", "so", "because", "or"], 1, "So shows result.", "Medium"],
  ["q23", "Choose the correct pronoun: Danial and I built the model. ___ used recycled materials.", ["We", "They", "He", "It"], 0, "Danial and I becomes we.", "Medium"],
  ["q24", "Choose the correct modal: Students ___ submit their projects by Friday.", ["must", "can", "might", "would"], 0, "Must shows a requirement.", "Medium"],
  ["q25", "Choose the best correction: 'There is many chairs in the hall.'", ["There are many chairs in the hall.", "There is many chair in the hall.", "There were much chairs in the hall.", "There are a chair in the hall."], 0, "Chairs is plural.", "Medium"],
  ["q26", "Choose the correct adverb: The coach spoke ___ to calm the team.", ["gentle", "gently", "gentleness", "gentler"], 1, "Gently describes spoke.", "Medium"],
  ["q27", "Choose the correct preposition: The committee will decide ___ the end of the month.", ["at", "by", "in", "on"], 1, "By shows a deadline.", "Medium"],
  ["q28", "Choose the correct sentence.", ["Neither of the answers are correct.", "Neither of the answers is correct.", "Neither of the answers were correct.", "Neither of the answers being correct."], 1, "Neither is singular.", "Medium"],
  ["q29", "Choose the correct word form: The manual explains the steps in a ___ way.", ["clear", "clearly", "clarity", "clearer"], 1, "Clearly is the adverb needed.", "Medium"],
  ["q30", "Choose the correct sentence.", ["Each of the students were given a badge.", "Each of the students was given a badge.", "Each of the students are given a badge.", "Each of the students giving a badge."], 1, "Each is singular, so was is correct.", "Medium"],
]);

const objectiveC = buildSet("objective-c", [
  ["q01", "Advertisement: 'Feeling overwhelmed with revision? Our tutors simplify it for you.' Who is the target audience?", ["Parents", "Students needing help with revision", "Teachers only", "Bus drivers"], 1, "The ad speaks to students who need revision support.", "Hard"],
  ["q02", "Notice: 'Effective immediately, all packages must be collected from the office, not the guardhouse.' What is the writer's intention?", ["To ban packages", "To change the collection point", "To close the office", "To cancel deliveries"], 1, "The notice changes where packages are collected.", "Hard"],
  ["q03", "Poster: 'Green Week: Every reusable bag counts.' Who is the poster most likely aimed at?", ["Only teachers", "The whole school community", "Only cleaners", "Only visitors"], 1, "A campaign poster like this targets everyone.", "Hard"],
  ["q04", "Announcement: 'We regret to inform you that the trip has been postponed until further notice.' What tone does 'we regret to inform' suggest?", ["Excited", "Apologetic", "Angry", "Funny"], 1, "It shows an apologetic tone.", "Hard"],
  ["q05", "Brochure: 'No experience needed - just curiosity.' What is this line meant to do?", ["Discourage beginners", "Encourage beginners to join", "List the schedule", "Explain the fees"], 1, "It reassures beginners and encourages sign-up.", "Hard"],
  ["q06", "Choose the correct sentence.", ["He study English every night.", "He studies English every night.", "He studying English every night.", "He studied English every night every night."], 1, "A singular subject uses studies.", "Hard"],
  ["q07", "Identify the error: 'The boys is ready for the camp.'", ["The", "boys", "is", "ready"], 2, "Boys is plural, so the verb should be are.", "Hard"],
  ["q08", "Choose the correct adverb form: The coach spoke ___ to encourage the team.", ["gentle", "gently", "gentleness", "gentler"], 1, "Gently describes how the coach spoke.", "Hard"],
  ["q09", "Read: 'Despite the traffic jam, the volunteers arrived just in time to set up the booth.' What does 'just in time' suggest?", ["They were very early", "They arrived with little time to spare", "They missed the event", "They cancelled the booth"], 1, "It means they arrived right before it was too late.", "Hard"],
  ["q10", "Read: 'The report highlighted rising attendance, yet donations remained flat.' What relationship is being shown?", ["Attendance and donations rose together", "Attendance rose while donations did not", "Both fell", "Donations rose faster"], 1, "Yet shows contrast.", "Hard"],
  ["q11", "Read: 'Although the museum tour was longer than expected, most students said it was worth it.' What is implied about the tour?", ["Students disliked it", "Students found it valuable", "The tour was cancelled", "The tour was too short"], 1, "Worth it means valuable despite the length.", "Hard"],
  ["q12", "Read: 'The manager smiled politely, but her tone suggested she was not entirely pleased with the delay.' What can be inferred?", ["She was thrilled", "Her real feelings were different from her expression", "She left immediately", "She caused the delay"], 1, "The contrast shows hidden displeasure.", "Hard"],
  ["q13", "Which sentence best shows cause and effect?", ["Because the workshop was well-organised, participants left feeling inspired.", "The workshop happened on a Tuesday.", "Participants wore name tags.", "The hall had good lighting."], 0, "It clearly links cause and effect.", "Hard"],
  ["q14", "Which option best shows paragraph unity?", ["Recycling reduces waste, and this essay also mentions football.", "Recycling reduces waste by reusing materials instead of discarding them.", "Recycling is a topic, among many others.", "This paragraph discusses several unrelated ideas."], 1, "It stays focused on one main idea.", "Hard"],
  ["q15", "Which introduction best fits an essay describing a school carnival?", ["The school carnival buzzed with laughter, music, and the smell of fried snacks.", "Carnivals are events.", "This essay is about a carnival.", "I attended an event."], 0, "It uses sensory detail for description.", "Hard"],
  ["q16", "Which vocabulary choice best strengthens a formal request email?", ["I would be grateful if you could...", "Gimme the info now.", "You better reply fast.", "Whatever works, I guess."], 0, "It is polite and formal.", "Hard"],
  ["q17", "Which sentence best links a cause to its effect?", ["Because the workshop was well-organised, participants left feeling inspired.", "The workshop happened on a Tuesday.", "Participants wore name tags.", "The hall had good lighting."], 0, "It clearly shows a cause leading to an effect.", "Hard"],
  ["q18", "Which option best matches a polite, assertive tone for declining an invitation?", ["I'm sorry, but I won't be able to make it this time.", "No way, I'm busy.", "Not interested, bye.", "Can't be bothered."], 0, "It declines politely and clearly.", "Hard"],
  ["q19", "Read: 'Even though Mei Ling had rehearsed for weeks, her hands still trembled before she stepped on stage.' What does this suggest about Mei Ling?", ["She was overconfident", "She still felt nervous despite preparation", "She forgot her lines", "She refused to perform"], 1, "Trembling hands show nervousness.", "Hard"],
  ["q20", "Read: 'The article ends by urging readers to reduce single-use plastic starting with small daily choices.' What is the author's purpose?", ["To entertain", "To persuade readers to act", "To advertise a product", "To report sports news"], 1, "Urging readers to act shows a persuasive purpose.", "Hard"],
  ["q21", "Choose the correct phrase: The teacher reminded us to hand in our work ___ Friday.", ["at", "on", "in", "under"], 1, "On is used with days.", "Medium"],
  ["q22", "Choose the best connector: We packed food and water. ___, we brought a first aid kit.", ["Besides", "Although", "Unless", "However"], 0, "Besides adds another item.", "Medium"],
  ["q23", "Choose the correct sentence.", ["Neither of the answers are correct.", "Neither of the answers is correct.", "Neither of the answers were correct.", "Neither of the answers being correct."], 1, "Neither is singular.", "Medium"],
  ["q24", "Choose the correct word form: The manual explains the steps in a ___ way.", ["clear", "clearly", "clarity", "clearer"], 1, "Clearly is the adverb.", "Medium"],
  ["q25", "Choose the correct sentence.", ["Each of the students were given a badge.", "Each of the students was given a badge.", "Each of the students are given a badge.", "Each of the students giving a badge."], 1, "Each is singular.", "Medium"],
  ["q26", "Choose the best conclusion for an essay about teamwork.", ["In conclusion, teamwork helps us achieve more together.", "Teamwork is a word with eight letters.", "I do not like teamwork.", "Some people work in teams sometimes."], 0, "It summarises the main idea clearly.", "Medium"],
  ["q27", "Choose the most suitable paragraph order for a narrative essay.", ["Beginning, middle events, ending", "Random order of events", "Only one long paragraph", "Ending before the beginning"], 0, "Narratives need a clear sequence.", "Medium"],
  ["q28", "Which sentence best replies to: 'Can you help decorate the hall on Friday?'?", ["Sure, I can help after school on Friday.", "I don't like decorating.", "Maybe next year.", "The hall is closed."], 0, "It answers politely and directly.", "Medium"],
  ["q29", "Which linking word best shows a result?", ["Therefore", "Meanwhile", "Although", "For example"], 0, "Therefore shows result.", "Medium"],
  ["q30", "Which closing best suits a formal email to a teacher?", ["See ya!", "Thanks, bye.", "Regards,", "Whatever, thanks."], 2, "Regards is formal and polite.", "Medium"],
]);

export const ENGLISH_QUIZ_QUESTIONS_F2: Record<EnglishQuizSetIdF2, QuizQuestion[]> = {
  "objective-a": objectiveA,
  "objective-b": objectiveB,
  "objective-c": objectiveC,
};

export function getEnglishQuizSetF2(setId: EnglishQuizSetIdF2) {
  return ENGLISH_QUIZ_QUESTIONS_F2[setId] ?? [];
}

export function getEnglishQuizSetsForPaperF2(paperId: EnglishQuizPaperIdF2 = "paper-1") {
  return ENGLISH_QUIZ_SETS_F2.filter((set) => set.paperId === paperId);
}
