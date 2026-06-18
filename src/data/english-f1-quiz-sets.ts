import type { QuizQuestion } from "./types";

export type EnglishQuizPaperId = "paper-1" | "paper-2";
export type EnglishQuizSetId =
  | "objective-a"
  | "objective-b"
  | "objective-c"
  | "writing-skills-a"
  | "writing-skills-b";

export interface EnglishQuizSetMeta {
  id: EnglishQuizSetId;
  paperId: EnglishQuizPaperId;
  badge: string;
  title: string;
  shortLabel: string;
  level: string;
  description: string;
  coverage: string[];
  tone: string;
}

export const ENGLISH_QUIZ_PAPERS: Array<{
  id: EnglishQuizPaperId;
  badge: string;
  title: string;
  description: string;
}> = [
  {
    id: "paper-1",
    badge: "\u{1F4C4}",
    title: "Paper 1 Quizzes",
    description: "Objective reading and language awareness practice.",
  },
  {
    id: "paper-2",
    badge: "\u270F\uFE0F",
    title: "Paper 2 Quizzes",
    description: "Writing format, organisation, and language practice.",
  },
];

export const ENGLISH_QUIZ_SETS: EnglishQuizSetMeta[] = [
  {
    id: "objective-a",
    paperId: "paper-1",
    badge: "\u{1F4C4}",
    title: "Objective A",
    shortLabel: "Basic Practice",
    level: "Basic Practice",
    description: "Short texts, notices, advertisements, messages, grammar, and error correction.",
    coverage: ["Part 1", "Part 2", "30 Questions", "Multiple Choice"],
    tone: "from-sky-500 to-cyan-500",
  },
  {
    id: "objective-b",
    paperId: "paper-1",
    badge: "\u{1F4C4}",
    title: "Objective B",
    shortLabel: "Intermediate Practice",
    level: "Intermediate Practice",
    description: "Information transfer and reading comprehension practice.",
    coverage: ["Part 3", "Part 4", "30 Questions", "Multiple Choice"],
    tone: "from-emerald-500 to-teal-500",
  },
  {
    id: "objective-c",
    paperId: "paper-1",
    badge: "\u{1F4C4}",
    title: "Objective C",
    shortLabel: "Full UASA Simulation",
    level: "Full UASA Simulation",
    description: "A mixed mini UASA Paper 1 exam covering Parts 1 to 5.",
    coverage: ["Parts 1-5", "UASA Simulation", "30 Questions", "Multiple Choice"],
    tone: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "writing-skills-a",
    paperId: "paper-2",
    badge: "\u270F\uFE0F",
    title: "Writing Skills A",
    shortLabel: "Format and Sentences",
    level: "Writing Practice",
    description: "Email, message, opening sentence, closing sentence, and vocabulary practice.",
    coverage: ["Email Format", "Message Format", "30 Questions", "Multiple Choice"],
    tone: "from-amber-500 to-orange-500",
  },
  {
    id: "writing-skills-b",
    paperId: "paper-2",
    badge: "\u270F\uFE0F",
    title: "Writing Skills B",
    shortLabel: "Organisation and Cohesion",
    level: "Writing Practice",
    description: "Cohesive devices, paragraph order, essay structure, and vocabulary usage.",
    coverage: ["Essay Structure", "Paragraph Organisation", "30 Questions", "Multiple Choice"],
    tone: "from-rose-500 to-pink-500",
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

function buildSet(setId: EnglishQuizSetId, paperId: EnglishQuizPaperId, rows: EnglishQuizTuple[]) {
  return rows.map<QuizQuestion>(([id, question, options, answerIndex, explanation, difficulty]) => ({
    id: `eng-f1-${setId}-${id}`,
    subjectId: "english",
    form: "Form 1",
    chapter: paperId === "paper-1" ? "Paper 1 Quizzes" : "Paper 2 Quizzes",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
  }));
}

const objectiveA = buildSet("objective-a", "paper-1", [
  ["q01", "Read the notice: \"Bring a refillable bottle for Green Day this Friday.\" What should students bring?", ["A lunch box", "A water bottle", "A school badge", "A sports jersey"], 1, "The notice asks students to bring a refillable bottle.", "Easy"],
  ["q02", "A poster says: \"Drama Club auditions: 3.00 p.m., Music Room.\" Where will the auditions be held?", ["Library", "School hall", "Music Room", "Science lab"], 2, "The venue stated on the poster is the Music Room.", "Easy"],
  ["q03", "Message: \"Please wait for me at Gate B after practice.\" Where should the person wait?", ["Gate A", "Gate B", "The canteen", "The field"], 1, "The message clearly says Gate B.", "Easy"],
  ["q04", "Advertisement: \"Buy one notebook, get the second at half price.\" What is being promoted?", ["A book fair discount", "A sports event", "A library rule", "A bus schedule"], 0, "The advertisement promotes a discount on notebooks.", "Easy"],
  ["q05", "Banner: \"Safety Week: Use the zebra crossing.\" What is the main advice?", ["Walk quickly anywhere", "Cross at the zebra crossing", "Run across the road", "Cycle on the pavement"], 1, "The banner reminds students to use the zebra crossing.", "Easy"],
  ["q06", "Short text: \"The recycling bins are behind Block C.\" Where are the bins?", ["In front of Block C", "Behind Block C", "Beside the hall", "Near the gate"], 1, "The text states that the bins are behind Block C.", "Easy"],
  ["q07", "Notice: \"Library closed during recess for stock checking.\" When is the library closed?", ["Before assembly", "During recess", "After school", "At night"], 1, "The closure is during recess.", "Easy"],
  ["q08", "Message: \"Can you return my calculator before Maths class?\" What does the sender want?", ["To borrow a calculator", "To return a book", "To get the calculator back", "To cancel Maths class"], 2, "The sender asks for the calculator to be returned.", "Medium"],
  ["q09", "Poster: \"Join the Nature Walk. Limited to 40 students.\" What does \"limited\" mean?", ["Only a certain number can join", "Everyone must join", "The walk is cancelled", "The walk is free"], 0, "Limited means there are only 40 places.", "Medium"],
  ["q10", "Advertisement: \"Free delivery for orders above RM30.\" When is delivery free?", ["For all orders", "For orders below RM30", "For orders above RM30", "Only on weekends"], 2, "Delivery is free only when the order is above RM30.", "Medium"],
  ["q11", "Notice: \"Do not feed the cats near the canteen.\" What is prohibited?", ["Playing near the canteen", "Feeding the cats", "Buying food", "Cleaning the canteen"], 1, "The notice says not to feed the cats.", "Easy"],
  ["q12", "Message: \"I left your file with Puan Lina.\" Who has the file?", ["The sender", "Puan Lina", "The class monitor", "The librarian"], 1, "The file was left with Puan Lina.", "Easy"],
  ["q13", "Poster: \"Fitness Club meets every Wednesday.\" How often does the club meet?", ["Every day", "Every Monday", "Every Wednesday", "Once a month"], 2, "The phrase every Wednesday shows the weekly meeting day.", "Easy"],
  ["q14", "Short text: \"The bus will leave at 7.15 a.m. sharp.\" What should students do?", ["Arrive late", "Be on time", "Wait at home", "Bring extra money"], 1, "Sharp means exactly at that time, so students must be punctual.", "Medium"],
  ["q15", "Notice: \"Submit the consent form by Monday.\" What must students submit?", ["A poster", "A consent form", "A report card", "A library card"], 1, "The item to submit is the consent form.", "Easy"],
  ["q16", "Choose the correct sentence.", ["She walk to school every day.", "She walks to school every day.", "She walking to school every day.", "She walked to school every day every day."], 1, "A singular subject uses walks in the simple present tense.", "Easy"],
  ["q17", "Choose the correct word: The pupils ___ cleaning the classroom now.", ["is", "am", "are", "was"], 2, "Pupils is plural, so the correct verb is are.", "Easy"],
  ["q18", "Choose the sentence with the correct preposition.", ["The keys are in the table.", "The keys are under the table.", "The keys are quickly the table.", "The keys are because the table."], 1, "Under is a preposition that shows position.", "Easy"],
  ["q19", "Which word should replace the underlined error? \"Aiman do his homework after dinner.\"", ["does", "doing", "done", "did"], 0, "A singular subject in simple present tense uses does.", "Medium"],
  ["q20", "Choose the correct past tense: We ___ the museum yesterday.", ["visit", "visits", "visited", "visiting"], 2, "Yesterday shows past time, so visited is correct.", "Easy"],
  ["q21", "Choose the correct conjunction: I wanted to play football, ___ it rained.", ["or", "but", "because", "so"], 1, "But shows a contrast between wanting to play and the rain.", "Medium"],
  ["q22", "Identify the error: \"The girls was excited about the trip.\"", ["The", "girls", "was", "about"], 2, "Girls is plural, so the verb should be were.", "Medium"],
  ["q23", "Choose the correct adjective: The prefect gave a ___ reminder.", ["careful", "carefully", "care", "caringly"], 0, "Careful describes the noun reminder.", "Medium"],
  ["q24", "Choose the correct adverb: The team played ___ in the final match.", ["brave", "bravery", "bravely", "braver"], 2, "Bravely describes how the team played.", "Medium"],
  ["q25", "Which sentence is correctly punctuated?", ["where is your helmet?", "Where is your helmet?", "Where is your helmet", "where is your helmet"], 1, "A question starts with a capital letter and ends with a question mark.", "Easy"],
  ["q26", "Choose the correct pronoun: Siti and I made the poster. ___ used recycled paper.", ["They", "We", "She", "It"], 1, "Siti and I becomes We.", "Easy"],
  ["q27", "Choose the best correction: \"There is many books on the shelf.\"", ["There are many books on the shelf.", "There were much books on the shelf.", "There is much books on the shelf.", "There are a book on the shelf."], 0, "Books is plural, so There are is correct.", "Medium"],
  ["q28", "Choose the correct modal: Students ___ wear helmets during cycling practice.", ["must", "has", "was", "does"], 0, "Must expresses a rule or strong requirement.", "Medium"],
  ["q29", "Choose the correct article: Mei Ling saw ___ eagle during the nature camp.", ["a", "an", "the", "no article"], 1, "Eagle begins with a vowel sound, so an is correct.", "Medium"],
  ["q30", "Identify the correct sentence.", ["My brother and I am ready.", "My brother and I is ready.", "My brother and I are ready.", "My brother and I was ready."], 2, "A compound subject uses are in the present tense.", "Medium"],
]);

const objectiveB = buildSet("objective-b", "paper-1", [
  ["q01", "Information: Eco Club collected paper 18 kg, plastic 12 kg, cans 6 kg. Which item was collected the most?", ["Paper", "Plastic", "Cans", "All equal"], 0, "Paper has the highest amount at 18 kg.", "Easy"],
  ["q02", "A timetable shows badminton at 3.00 p.m., chess at 3.30 p.m., choir at 4.00 p.m. Which activity starts last?", ["Badminton", "Chess", "Choir", "All start together"], 2, "Choir starts latest at 4.00 p.m.", "Easy"],
  ["q03", "Survey: 14 students choose football, 9 choose swimming, 7 choose cycling. How many students took part?", ["21", "23", "30", "32"], 2, "14 + 9 + 7 = 30 students.", "Easy"],
  ["q04", "A bus schedule says: School 7.10, Library 7.25, Museum 7.50. How long is the journey from school to museum?", ["15 minutes", "25 minutes", "40 minutes", "50 minutes"], 2, "From 7.10 to 7.50 is 40 minutes.", "Medium"],
  ["q05", "A chart shows Monday 24 visitors, Tuesday 31, Wednesday 28. Which statement is true?", ["Monday had the most visitors", "Tuesday had the most visitors", "Wednesday had the fewest visitors", "All days had the same number"], 1, "Tuesday has the highest number, 31.", "Easy"],
  ["q06", "Information: Book Fair prices: novel RM12, comic RM8, dictionary RM20. Which item is the cheapest?", ["Novel", "Comic", "Dictionary", "Novel and dictionary"], 1, "The comic costs RM8, the lowest price.", "Easy"],
  ["q07", "A table shows Science quiz 20 marks, English quiz 30 marks, History quiz 25 marks. Which quiz has the highest full marks?", ["Science", "English", "History", "Science and History"], 1, "English has the highest full marks at 30.", "Easy"],
  ["q08", "Information: The canteen sells fried rice on Monday, noodles on Tuesday and sandwiches on Wednesday. What is sold on Tuesday?", ["Fried rice", "Noodles", "Sandwiches", "Soup"], 1, "The information states noodles are sold on Tuesday.", "Easy"],
  ["q09", "A club list shows 12 members in Art Club and 16 members in Robotics Club. How many more members are in Robotics Club?", ["2", "4", "6", "8"], 1, "16 - 12 = 4 more members.", "Medium"],
  ["q10", "A notice says the clean-up starts at 8.30 a.m. and ends at 10.00 a.m. How long is the activity?", ["30 minutes", "1 hour", "1 hour 30 minutes", "2 hours"], 2, "From 8.30 to 10.00 is 1 hour 30 minutes.", "Medium"],
  ["q11", "A table: Ali scored 26, Mei scored 29, Ravi scored 24. Who scored the lowest?", ["Ali", "Mei", "Ravi", "No one"], 2, "Ravi has the lowest score, 24.", "Easy"],
  ["q12", "Information: Bring gloves, rubbish bags and drinking water for community service. Which item is NOT listed?", ["Gloves", "Rubbish bags", "Drinking water", "Paint brushes"], 3, "Paint brushes are not mentioned.", "Easy"],
  ["q13", "A map note says the first aid booth is between the hall and the field. Where is it?", ["Near the library only", "Between the hall and the field", "Behind the office", "Inside the canteen"], 1, "The booth is between the hall and the field.", "Easy"],
  ["q14", "A programme shows talk at 9.00, quiz at 10.00, prize-giving at 11.30. What happens after the quiz?", ["Talk", "Registration", "Prize-giving", "Lunch"], 2, "Prize-giving comes after the quiz.", "Medium"],
  ["q15", "A table shows T-shirt sizes: S=8, M=15, L=10. Which size is needed most?", ["S", "M", "L", "All equal"], 1, "Size M has the highest number, 15.", "Easy"],
  ["q16", "Read the text: \"Every Saturday, Daniel helps his grandfather water the vegetable garden. He enjoys watching the plants grow.\" What does Daniel do on Saturdays?", ["He plays football", "He waters the garden", "He visits a museum", "He repairs bicycles"], 1, "Daniel helps water the vegetable garden.", "Easy"],
  ["q17", "Why does Daniel enjoy helping in the garden?", ["He likes watching plants grow", "He wants to miss school", "He dislikes vegetables", "He sells the plants"], 0, "The text says he enjoys watching the plants grow.", "Easy"],
  ["q18", "Read: \"The rain was heavy, so the netball match was postponed.\" Why was the match postponed?", ["The team was late", "The rain was heavy", "The court was booked", "The players were tired"], 1, "The heavy rain caused the postponement.", "Easy"],
  ["q19", "Read: \"Nora checked the website before leaving because the train times often changed.\" Why did Nora check the website?", ["To buy food", "To confirm train times", "To message her teacher", "To print a poster"], 1, "She checked because train times often changed.", "Medium"],
  ["q20", "Read: \"The new student smiled nervously until Farid invited him to join the group.\" How did Farid help?", ["He lent a book", "He invited the student to join", "He reported a problem", "He closed the door"], 1, "Farid helped by inviting him to the group.", "Easy"],
  ["q21", "What does \"nervously\" mean in the text?", ["In a worried way", "In a noisy way", "In a lazy way", "In an angry way"], 0, "Nervously means feeling worried or unsure.", "Medium"],
  ["q22", "Read: \"The beach clean-up was tiring, but the students felt proud when they saw the clean sand.\" How did the students feel at the end?", ["Proud", "Bored", "Afraid", "Confused"], 0, "They felt proud after seeing the clean sand.", "Easy"],
  ["q23", "Read: \"Lina saved her project in two places to avoid losing it.\" What does this show about Lina?", ["She is careless", "She is careful", "She is late", "She is noisy"], 1, "Saving work in two places shows she is careful.", "Medium"],
  ["q24", "Read: \"The hikers turned back when the sky became dark.\" What was the likely reason?", ["They were hungry", "They were being safe", "They forgot their phones", "They wanted to swim"], 1, "Turning back in dark weather is a safety decision.", "Medium"],
  ["q25", "Read: \"Although Amir was tired, he continued training for the district race.\" Which word best describes Amir?", ["Lazy", "Determined", "Careless", "Rude"], 1, "Continuing despite tiredness shows determination.", "Medium"],
  ["q26", "Read: \"The stray kitten hid under the bench until a pupil gently placed food nearby.\" What did the pupil do?", ["Scared the kitten", "Fed the kitten gently", "Took the bench away", "Closed the classroom"], 1, "The pupil placed food nearby for the kitten.", "Easy"],
  ["q27", "Read: \"The app reminds users to drink water every two hours.\" What is the app for?", ["Health", "Travel booking", "Gaming", "Shopping"], 0, "A reminder to drink water is related to health.", "Easy"],
  ["q28", "Read: \"The class raised money by selling bookmarks during recess.\" How did they raise money?", ["By washing cars", "By selling bookmarks", "By collecting tickets", "By doing homework"], 1, "They sold bookmarks during recess.", "Easy"],
  ["q29", "Read: \"Maya whispered because the baby was sleeping.\" Why did Maya whisper?", ["She had a sore throat", "The baby was sleeping", "She was in a race", "The room was empty"], 1, "She whispered so she would not wake the baby.", "Easy"],
  ["q30", "Read: \"The robotics team tested the model many times before the competition.\" What can we infer?", ["They prepared seriously", "They disliked competitions", "They forgot the rules", "They worked alone"], 0, "Testing many times shows serious preparation.", "Medium"],
]);

const objectiveC = buildSet("objective-c", "paper-1", [
  ["q01", "Notice: \"Lost: blue pencil case with a cat keychain.\" What item is missing?", ["A wallet", "A pencil case", "A school bag", "A water bottle"], 1, "The notice says a blue pencil case is lost.", "Easy"],
  ["q02", "Poster: \"Keep the field clean after Sports Day.\" What should students do?", ["Leave rubbish behind", "Clean up the field", "Cancel Sports Day", "Bring pets"], 1, "Students should keep the field clean.", "Easy"],
  ["q03", "Message: \"Please email the group photo tonight.\" What should be sent?", ["A timetable", "A group photo", "A receipt", "A map"], 1, "The message asks for the group photo.", "Easy"],
  ["q04", "Choose the correct sentence.", ["They has a new coach.", "They have a new coach.", "They having a new coach.", "They was a new coach."], 1, "They takes have in the present tense.", "Easy"],
  ["q05", "Choose the best correction: \"The boys is ready for the camp.\"", ["are", "am", "was", "has"], 0, "Boys is plural, so are is correct.", "Easy"],
  ["q06", "Choose the correct word: I stayed at home ___ I had a fever.", ["but", "because", "or", "and"], 1, "Because gives the reason.", "Easy"],
  ["q07", "Information: Recycling points: Class Amanah 42, Bestari 38, Cekal 45. Which class scored the highest?", ["Amanah", "Bestari", "Cekal", "All equal"], 2, "Cekal scored the highest with 45 points.", "Easy"],
  ["q08", "A schedule shows workshop 8.30, break 10.00, presentation 10.30. What happens after the break?", ["Workshop", "Presentation", "Registration", "Lunch"], 1, "The presentation is after the break.", "Easy"],
  ["q09", "Read: \"The river looked clearer after the clean-up campaign.\" What was the result of the campaign?", ["The river became cleaner", "The river dried up", "The school closed", "The campaign failed"], 0, "Clearer means the river became cleaner.", "Easy"],
  ["q10", "Read: \"Jason practised his speech in front of the mirror to feel more confident.\" Why did he practise?", ["To feel more confident", "To avoid the speech", "To repair the mirror", "To copy homework"], 0, "He practised to build confidence.", "Easy"],
  ["q11", "Choose the word closest in meaning to \"assist\".", ["Help", "Hide", "Push", "Forget"], 0, "Assist means help.", "Easy"],
  ["q12", "Choose the opposite of \"dangerous\".", ["Risky", "Unsafe", "Safe", "Wild"], 2, "Safe is the opposite of dangerous.", "Easy"],
  ["q13", "Cloze: The students ___ trees behind the hall last Saturday.", ["plant", "plants", "planted", "planting"], 2, "Last Saturday shows past tense, so planted is correct.", "Medium"],
  ["q14", "Cloze: You should drink enough water ___ the weather is hot.", ["when", "unless", "although", "before"], 0, "When fits the condition of hot weather.", "Medium"],
  ["q15", "Cloze: The robot moved ___ across the table.", ["smooth", "smoothly", "smoothness", "smoother"], 1, "Smoothly is an adverb describing moved.", "Medium"],
  ["q16", "Advertisement: \"School shoes: 20% off this weekend only.\" When is the offer valid?", ["Every day", "This weekend only", "Next month", "During assembly"], 1, "The advertisement says this weekend only.", "Easy"],
  ["q17", "Notice: \"Visitors must register at the office.\" What must visitors do first?", ["Go to class", "Register at the office", "Eat in the canteen", "Enter the field"], 1, "The notice requires registration at the office.", "Easy"],
  ["q18", "Choose the correct modal: We ___ respect other people's opinions.", ["should", "is", "were", "has"], 0, "Should is used to give advice.", "Medium"],
  ["q19", "Identify the error: \"I have three childs.\"", ["I", "have", "three", "childs"], 3, "The plural of child is children.", "Medium"],
  ["q20", "Information: Hiking checklist: cap, water, whistle, torch. Which item is for making a sound in an emergency?", ["Cap", "Water", "Whistle", "Torch"], 2, "A whistle is used to make a loud sound in an emergency.", "Medium"],
  ["q21", "Read: \"The class monitor spoke politely to solve the problem.\" How did the monitor speak?", ["Rudely", "Politely", "Angrily", "Loudly"], 1, "The text says the monitor spoke politely.", "Easy"],
  ["q22", "Read: \"The team lost the first game but won the next two.\" What happened overall?", ["They gave up", "They improved after losing", "They cancelled the games", "They played only one game"], 1, "Winning the next two games shows improvement.", "Medium"],
  ["q23", "Choose the best title for a text about saving electricity at home.", ["My Favourite Food", "Ways to Save Electricity", "A Day at the Beach", "The History of Football"], 1, "The title matches the topic of saving electricity.", "Easy"],
  ["q24", "Which sentence best completes a message asking for help?", ["Can you help me carry the boxes after school?", "I bought noodles yesterday.", "The sky is blue.", "My shoes are black."], 0, "The sentence clearly asks for help.", "Easy"],
  ["q25", "Choose the correct phrase: The teacher reminded us to hand in our work ___ Friday.", ["at", "on", "in", "under"], 1, "On is used with days.", "Medium"],
  ["q26", "Choose the best connector: We packed food and water. ___, we brought a first aid kit.", ["However", "Besides", "Although", "Unless"], 1, "Besides adds another item to the list.", "Medium"],
  ["q27", "Read: \"The old bridge was slippery, so the hikers crossed it slowly.\" Why did they cross slowly?", ["It was slippery", "It was new", "It was crowded", "It was closed"], 0, "They crossed slowly because the bridge was slippery.", "Easy"],
  ["q28", "Which option is a complete sentence?", ["After the bell.", "The students entered the hall.", "Because it rained.", "Under the desk."], 1, "This option has a subject and verb and expresses a complete idea.", "Medium"],
  ["q29", "Cloze: The stray dog looked hungry, ___ Adam gave it some food.", ["so", "but", "or", "although"], 0, "So shows the result of the dog looking hungry.", "Medium"],
  ["q30", "Read: \"The school website was updated with the new exam timetable.\" Where can students find the new timetable?", ["On the school website", "At the bus stop", "Inside the laboratory", "On a lunch menu"], 0, "The timetable was updated on the school website.", "Easy"],
]);

const writingSkillsA = buildSet("writing-skills-a", "paper-2", [
  ["q01", "Which is the best way to begin an email to your teacher?", ["Hey you,", "Dear Teacher,", "Oi Teacher,", "What now,"], 1, "Dear Teacher is polite and suitable.", "Easy"],
  ["q02", "Which closing is suitable for an email to a teacher?", ["Yours sincerely, Aiman", "Bye bye forever", "Okay done", "From me only"], 0, "Yours sincerely is a formal closing.", "Easy"],
  ["q03", "Which subject line is best for an email about a lost book?", ["Hello", "Lost Library Book", "Read this", "Book thing"], 1, "The subject line is clear and specific.", "Easy"],
  ["q04", "Which sentence states the purpose of an email clearly?", ["I am writing to ask about the Science project deadline.", "The sky is cloudy today.", "My brother likes noodles.", "I have many shoes."], 0, "It clearly explains why the email is written.", "Easy"],
  ["q05", "Choose the correct order for an email.", ["Closing, greeting, body", "Greeting, body, closing", "Body, closing, greeting", "Subject, closing, greeting only"], 1, "An email usually has a greeting, body and closing.", "Easy"],
  ["q06", "Which message is most suitable to ask a friend to return a ruler?", ["Return my ruler now!", "Can you please return my ruler tomorrow?", "You lost everything.", "Ruler. Tomorrow."], 1, "It is polite and clear.", "Easy"],
  ["q07", "Which opening sentence is best for thanking a neighbour?", ["I am writing to thank you for helping us clean the playground.", "Why did you come?", "This is not important.", "I want many things."], 0, "The sentence clearly thanks the neighbour.", "Easy"],
  ["q08", "Which closing sentence is best for an invitation email?", ["I hope you can join us.", "Do not come.", "The table is round.", "I forgot everything."], 0, "It politely ends an invitation.", "Easy"],
  ["q09", "Which sentence is most suitable in a message to a classmate?", ["Please bring the group poster tomorrow.", "You are a terrible person.", "I demand all your books.", "Teacher is not school."], 0, "It is clear, polite and relevant.", "Easy"],
  ["q10", "Choose the best phrase to give a reason.", ["This is because", "In the table", "Very muchly", "Next pencil"], 0, "This is because introduces a reason.", "Easy"],
  ["q11", "Choose the best connector to add information: \"We need gloves. ___, we need rubbish bags.\"", ["Besides", "However", "Although", "Unless"], 0, "Besides adds another point.", "Medium"],
  ["q12", "Choose the best connector to show contrast.", ["However", "Therefore", "Firstly", "Besides"], 0, "However shows a contrast.", "Medium"],
  ["q13", "Which sentence uses suitable vocabulary for a formal email?", ["I would like to request permission to join the trip.", "I wanna go trip.", "Let me go lah.", "Trip is cool."], 0, "The wording is polite and formal.", "Medium"],
  ["q14", "Which is the best sentence to apologise?", ["I am sorry for submitting the form late.", "You are late.", "Late form nice.", "I do not care."], 0, "The sentence is polite and direct.", "Easy"],
  ["q15", "Which detail should be included in a message about a meeting?", ["Time and place", "Your favourite song only", "A random joke", "Your shoe size"], 0, "A meeting message should include time and place.", "Easy"],
  ["q16", "Choose the best opening for an email to a friend.", ["Hi Ravi,", "Dear Principal,", "To whom it may concern,", "Respectfully yours,"], 0, "Hi Ravi is suitable for a friend.", "Easy"],
  ["q17", "Which message has the clearest instruction?", ["Meet at the library at 2.30 p.m.", "Maybe later somewhere.", "Things happen.", "Bring that thing."], 0, "It gives a clear place and time.", "Easy"],
  ["q18", "Which closing is suitable for an informal message?", ["See you soon!", "Yours faithfully,", "Officially approved,", "To the manager,"], 0, "See you soon is friendly and informal.", "Easy"],
  ["q19", "Choose the best word: \"Please ___ your attendance by Friday.\"", ["confirm", "destroy", "borrow", "hide"], 0, "Confirm means state that you will attend.", "Medium"],
  ["q20", "Which sentence is too informal for an email to the principal?", ["Can u approve this?", "I would like to request your approval.", "Thank you for your time.", "I am writing about the school campaign."], 0, "Text-message spelling is too informal.", "Medium"],
  ["q21", "Which is the best first sentence for a complaint email?", ["I am writing to inform you about the broken fan in our classroom.", "You never fix anything.", "My cat is sleeping.", "This email is yellow."], 0, "It states the complaint politely and clearly.", "Medium"],
  ["q22", "Which sentence gives a helpful suggestion?", ["Perhaps we could place recycling bins near the canteen.", "No one should try.", "Everything is bad.", "I like cakes."], 0, "It gives a practical suggestion politely.", "Medium"],
  ["q23", "Which sentence is best for ending a request email?", ["I hope you will consider my request.", "Give it now.", "Nothing else.", "The end, no reply."], 0, "It is polite and suitable for a request.", "Medium"],
  ["q24", "Choose the best replacement for \"a lot of rubbish\" in a formal report.", ["a large amount of rubbish", "loads of trashy stuff", "rubbish everywhere lah", "so much bad thing"], 0, "A large amount of rubbish is more formal.", "Medium"],
  ["q25", "Which sentence is grammatically correct?", ["I hope you are well.", "I hopes you is well.", "I hoping you well.", "I hope you well are."], 0, "The sentence has correct subject-verb agreement and word order.", "Easy"],
  ["q26", "Which phrase is best for giving sequence?", ["Firstly", "Because of", "Although", "Unlike"], 0, "Firstly introduces the first point.", "Easy"],
  ["q27", "Which sentence shows a polite reminder?", ["May I remind you to bring the consent form?", "Bring it or else.", "You always forget.", "Consent form now!"], 0, "The sentence is polite and clear.", "Medium"],
  ["q28", "Which information is most important in an invitation?", ["Date, time and venue", "The writer's height", "A random password", "The colour of the gate"], 0, "An invitation needs date, time and venue.", "Easy"],
  ["q29", "Choose the best closing for a thank-you email.", ["Thank you again for your kindness.", "That is all.", "I am bored.", "Do not reply."], 0, "It closes the thank-you email appropriately.", "Easy"],
  ["q30", "Which message is best for asking about homework?", ["Hi Sara, what pages should we complete for English homework?", "Homework thing?", "You tell now.", "English is paper."], 0, "It is polite, specific and clear.", "Easy"],
]);

const writingSkillsB = buildSet("writing-skills-b", "paper-2", [
  ["q01", "Choose the best topic sentence for a paragraph about healthy habits.", ["Healthy habits help students stay active and focused.", "My shoes are near the door.", "Yesterday was Tuesday.", "The wall is white."], 0, "A topic sentence should introduce the main idea.", "Easy"],
  ["q02", "Which sentence should come first in an essay introduction about recycling?", ["Recycling is an important habit that protects the environment.", "In conclusion, we must recycle.", "Secondly, bins are useful.", "For example, paper can be reused."], 0, "An introduction starts with the main topic.", "Medium"],
  ["q03", "Choose the best concluding sentence.", ["Therefore, everyone should help keep the school clean.", "Firstly, there are three reasons.", "My pencil is blue.", "After that, we ate."], 0, "Therefore signals a conclusion.", "Medium"],
  ["q04", "Which connector shows a result?", ["Therefore", "Although", "Besides", "Firstly"], 0, "Therefore introduces a result or conclusion.", "Medium"],
  ["q05", "Which connector shows contrast?", ["However", "Moreover", "Then", "Finally"], 0, "However shows contrast.", "Medium"],
  ["q06", "Choose the best order for a paragraph.", ["Topic sentence, supporting details, closing sentence", "Closing sentence, details, topic sentence", "Details only", "Title, title, title"], 0, "A clear paragraph has a topic sentence, details and a closing sentence.", "Easy"],
  ["q07", "Which sentence supports the topic \"Technology helps students learn\"?", ["Educational videos can explain difficult topics clearly.", "The field is wet.", "My aunt has a garden.", "The bus is late."], 0, "The sentence gives a relevant supporting detail.", "Easy"],
  ["q08", "Choose the best vocabulary: \"The school campaign was very ___. Many students joined it.\"", ["successful", "empty", "dangerous", "broken"], 0, "Successful fits a campaign joined by many students.", "Easy"],
  ["q09", "Which sentence is irrelevant in a paragraph about sports benefits?", ["Playing sports improves stamina.", "Team games teach cooperation.", "Exercise keeps us healthy.", "My favourite fruit is mango."], 3, "Mango is not related to sports benefits.", "Easy"],
  ["q10", "Choose the best transition for a second point.", ["Secondly", "In conclusion", "Once upon a time", "Suddenly"], 0, "Secondly introduces the second point.", "Easy"],
  ["q11", "Which phrase is suitable for giving an example?", ["For example", "In conclusion", "On the other hand", "As a result"], 0, "For example introduces an example.", "Easy"],
  ["q12", "Choose the best sentence to improve cohesion: \"Students should sleep early. ___, they can concentrate better in class.\"", ["As a result", "Although", "For instance", "Meanwhile"], 0, "As a result links the habit to its effect.", "Medium"],
  ["q13", "Which essay structure is most suitable?", ["Introduction, body paragraphs, conclusion", "Conclusion, title, greeting only", "Body, body, no ending", "Greeting, signature, date only"], 0, "An essay needs an introduction, body and conclusion.", "Easy"],
  ["q14", "Which sentence is best for a narrative opening?", ["It was still dark when I heard a loud knock on the door.", "In conclusion, I was happy.", "Firstly, recycling is useful.", "Yours sincerely, Daniel."], 0, "The sentence begins a story and creates interest.", "Medium"],
  ["q15", "Choose the best word: \"The volunteers worked ___ to clean the park.\"", ["together", "lonely", "angry", "broken"], 0, "Together fits the idea of volunteers cooperating.", "Easy"],
  ["q16", "Which sentence improves paragraph organisation?", ["Start a new paragraph when you introduce a new main point.", "Put all ideas in one very long sentence.", "Never use full stops.", "Write the conclusion first in every paragraph."], 0, "New main points should begin new paragraphs.", "Medium"],
  ["q17", "Choose the best closing sentence for a paragraph about friendship.", ["A good friend makes school life happier.", "The bus arrived at 6.00.", "My bag is heavy.", "I bought a ruler."], 0, "It concludes the idea about friendship.", "Easy"],
  ["q18", "Which pair of words is best for sequencing events?", ["First, next", "Because, although", "Under, beside", "Happy, happier"], 0, "First and next organise events in order.", "Easy"],
  ["q19", "Choose the sentence with the clearest meaning.", ["We cleaned the beach and collected five bags of rubbish.", "Beach rubbish clean bags five we.", "Cleaned rubbish five beach we bags.", "The beach bags cleaned us."], 0, "The sentence has clear word order.", "Easy"],
  ["q20", "Which sentence is more precise?", ["The students collected 25 plastic bottles.", "The students collected many things.", "Stuff was collected.", "They did some activity."], 0, "A specific number makes the sentence precise.", "Medium"],
  ["q21", "Choose the best connector: \"The trail was muddy. ___, the hikers continued carefully.\"", ["However", "Therefore", "Besides", "For example"], 0, "However shows contrast between difficulty and continuing.", "Medium"],
  ["q22", "Which sentence uses suitable vocabulary for an essay about safety?", ["Students should follow safety rules during outdoor activities.", "Students should simply do random things outside.", "Safety is whatever.", "Rules are very rule."], 0, "The vocabulary is clear and appropriate.", "Easy"],
  ["q23", "Which sentence should be in the conclusion?", ["In short, teamwork helps us complete tasks faster.", "The first reason is teamwork.", "For example, Ali carried the boxes.", "Next, we cleaned the hall."], 0, "In short signals a concluding statement.", "Medium"],
  ["q24", "Choose the best supporting detail for \"Reading improves vocabulary\".", ["Students learn new words from stories and articles.", "The football field is large.", "My bicycle is red.", "The canteen sells rice."], 0, "The detail explains how reading improves vocabulary.", "Easy"],
  ["q25", "Which sentence has the best tone for a formal essay?", ["We should reduce food waste in school.", "Food waste is super yuck lol.", "Don't waste lah.", "This thing is bad bad."], 0, "The tone is formal and clear.", "Medium"],
  ["q26", "Choose the best ending for a story about helping a lost child.", ["I felt relieved when the child found his mother.", "Firstly, helping is good.", "Dear Sir,", "The timetable is below."], 0, "It ends the narrative event naturally.", "Medium"],
  ["q27", "Which sentence links two ideas smoothly?", ["I wanted to join the trip, but I had to attend a family event.", "I wanted trip family event attend but join.", "Trip. Family. Join. Event.", "I join but family to wanted."], 0, "The connector but links contrasting ideas clearly.", "Medium"],
  ["q28", "Which detail belongs in a paragraph about community service?", ["We painted the old benches at the playground.", "My phone battery is low.", "The moon is far away.", "The cake was chocolate."], 0, "Painting old benches is related to community service.", "Easy"],
  ["q29", "Choose the best replacement for \"nice\" in \"The speaker gave a nice talk about health.\"", ["useful", "round", "plastic", "sleepy"], 0, "Useful is more precise in this context.", "Medium"],
  ["q30", "Which sentence best summarises an essay about protecting animals?", ["Everyone has a role in keeping animals safe.", "Animals have legs.", "My class starts early.", "The shop is closed."], 0, "The sentence summarises the essay's main message.", "Medium"],
]);

export const ENGLISH_QUIZ_QUESTIONS: Record<EnglishQuizSetId, QuizQuestion[]> = {
  "objective-a": objectiveA,
  "objective-b": objectiveB,
  "objective-c": objectiveC,
  "writing-skills-a": writingSkillsA,
  "writing-skills-b": writingSkillsB,
};

export function getEnglishQuizSet(setId: EnglishQuizSetId) {
  return ENGLISH_QUIZ_QUESTIONS[setId] ?? [];
}

export function getEnglishQuizSetsForPaper(paperId: EnglishQuizPaperId) {
  return ENGLISH_QUIZ_SETS.filter((set) => set.paperId === paperId);
}
