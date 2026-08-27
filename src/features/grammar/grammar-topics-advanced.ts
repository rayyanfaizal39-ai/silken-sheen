import {
  adjectivesAdverbsQuickCheck,
  futureFormsQuickCheck,
  modalsQuickCheck,
  subjectVerbQuickCheck,
} from "./grammar-content";
import type { LessonSectionSpec } from "./grammar-lesson-blocks";

/**
 * Config-driven content for Grammar Topics 07–10.
 *
 * These lessons share the same renderer (<LessonBlocks />) and the same
 * section primitives as Topics 01–06 — only the content differs.
 */

export const futureFormsSections: LessonSectionSpec[] = [
  {
    id: "future-brief",
    icon: "target",
    eyebrow: "Mission brief",
    title: "Talk about what comes next",
    blocks: [
      {
        kind: "brief",
        paragraphs: [
          [
            "English has more than one way to talk about the future. The one you choose depends on ",
            { b: "how decided" },
            " the future event already is.",
          ],
          "In this mission you will learn will, be going to, and the present continuous for arrangements.",
        ],
        pills: ["Decide with will", "Plan with going to", "Arrange with -ing"],
      },
    ],
  },
  {
    id: "future-big-idea",
    icon: "lightbulb",
    eyebrow: "Big idea",
    title: "Three ways to reach the future",
    blocks: [
      {
        kind: "three",
        cards: [
          {
            label: "Will",
            title: "Decided right now",
            body: ["A decision made as you speak, a prediction, or a promise."],
            note: "I'll get some water.",
          },
          {
            label: "Be going to",
            title: "Already planned",
            body: ["An intention you decided earlier, or a prediction based on evidence."],
            note: "I'm going to study tonight.",
          },
          {
            label: "Present continuous",
            title: "Already arranged",
            body: ["A fixed arrangement, usually with a time and place."],
            note: "I'm meeting Amir tomorrow.",
          },
        ],
      },
    ],
  },
  {
    id: "future-will",
    icon: "badge",
    eyebrow: "How it works",
    title: "Will",
    blocks: [
      { kind: "formula", parts: ["Subject", "+", "will", "+", "base verb"] },
      {
        kind: "example",
        text: [
          "I ",
          { b: "will study" },
          ". · She ",
          { b: "will come" },
          ". · They ",
          { b: "will help" },
          ".",
        ],
      },
      {
        kind: "three",
        cards: [
          {
            label: "Decision now",
            title: "I'm thirsty. I'll get some water.",
            body: ["You decided at the moment of speaking."],
          },
          {
            label: "Prediction",
            title: "I think it will rain.",
            body: ["An opinion about the future."],
          },
          {
            label: "Promise / offer",
            title: "I'll help you.",
            body: ["You are offering to do something."],
          },
        ],
      },
      {
        kind: "chips",
        label: "Will contractions",
        items: ["will → 'll", "will not → won't"],
      },
      {
        kind: "watchout",
        text: [
          { b: "Watch out:" },
          " after will, use the base verb. Never will to study and never will studies.",
        ],
      },
    ],
  },
  {
    id: "future-going-to",
    icon: "badge",
    eyebrow: "How it works",
    title: "Be going to",
    blocks: [
      {
        kind: "formula",
        parts: ["Subject", "+", "am / is / are", "+", "going to", "+", "base verb"],
      },
      {
        kind: "concepts",
        cards: [
          {
            label: "Plan",
            title: "I am going to study tonight.",
            body: ["You decided this before you spoke."],
          },
          {
            label: "Intention",
            title: "She is going to visit her grandmother.",
            body: ["The intention already exists."],
          },
          {
            label: "Evidence",
            title: "Look at those clouds. It is going to rain.",
            body: ["You can see the reason right now."],
          },
        ],
      },
      {
        kind: "wrongRight",
        wrong: "They are going play football.",
        right: "They are going to play football.",
      },
    ],
  },
  {
    id: "future-arrangements",
    icon: "clock",
    eyebrow: "How it works",
    title: "Present continuous for arrangements",
    blocks: [
      {
        kind: "brief",
        paragraphs: [
          [
            "The present continuous can describe the future when something is ",
            { b: "already arranged" },
            " — usually with a time, date, or place.",
          ],
        ],
      },
      {
        kind: "three",
        cards: [
          {
            label: "Tomorrow",
            title: "I am meeting Amir tomorrow.",
            body: ["The meeting is fixed."],
          },
          {
            label: "This weekend",
            title: "We are visiting Penang this weekend.",
            body: ["The trip is already organised."],
          },
          {
            label: "On Monday",
            title: "She is seeing the dentist on Monday.",
            body: ["The appointment is booked."],
          },
        ],
      },
      {
        kind: "bridge",
        title: "Arrangement vs intention",
        text: "An arrangement feels more fixed than a general intention — someone else is usually involved, or a time is already booked.",
      },
    ],
  },
  {
    id: "future-compare",
    icon: "book",
    eyebrow: "Compare it",
    title: "Which future should you use?",
    blocks: [
      {
        kind: "three",
        cards: [
          { label: "Will", title: "Decision now · prediction · promise", body: ["I'll help you."] },
          {
            label: "Going to",
            title: "Plan · intention · evidence",
            body: ["I'm going to study."],
          },
          {
            label: "Present continuous",
            title: "Arranged event",
            body: ["I'm meeting my tutor at 10."],
          },
        ],
      },
      {
        kind: "brief",
        paragraphs: [
          [{ b: "Someone asks: " }, "“What are you doing this weekend?”"],
          [
            "“I am going to study.” = an ",
            { b: "intention" },
            ". “I am meeting my tutor at 10.” = an ",
            { b: "arrangement" },
            ".",
          ],
        ],
      },
    ],
  },
  {
    id: "future-time",
    icon: "sparkles",
    eyebrow: "Time clues",
    title: "Future time expressions",
    blocks: [
      {
        kind: "chips",
        label: "Future time expressions",
        items: ["tomorrow", "tonight", "next week", "next month", "soon", "later", "this weekend"],
      },
    ],
  },
  {
    id: "future-negative",
    icon: "badge",
    eyebrow: "Negatives and questions",
    title: "Saying no, and asking",
    blocks: [
      {
        kind: "compare",
        cards: [
          {
            label: "Negative",
            title: "will not → won't",
            body: ["I won't be late.", "She isn't going to come."],
          },
          {
            label: "Question",
            title: "Will + subject + base verb?",
            body: ["Will you help me?", "Are you going to study tonight?"],
          },
        ],
      },
    ],
  },
  {
    id: "future-errors",
    icon: "search",
    eyebrow: "Common mistakes",
    title: "Error detector",
    blocks: [
      {
        kind: "errors",
        items: [
          {
            before: "I will ",
            wrong: "to study",
            after: " tonight.",
            correction: "I will study tonight.",
            reason: "After will, use the base verb with no to.",
          },
          {
            before: "She ",
            wrong: "going",
            after: " to visit Penang.",
            correction: "She is going to visit Penang.",
            reason: "Be going to needs am, is, or are in front of it.",
          },
          {
            before: "They are going ",
            wrong: "play",
            after: " football.",
            correction: "They are going to play football.",
            reason: "The pattern is going to + base verb — do not drop to.",
          },
          {
            before: "He will ",
            wrong: "studies",
            after: " tomorrow.",
            correction: "He will study tomorrow.",
            reason: "Modals such as will never take -s on the main verb.",
          },
          {
            before: "I ",
            wrong: "meeting",
            after: " Amir tomorrow.",
            correction: "I am meeting Amir tomorrow.",
            reason: "An -ing verb alone is not a full sentence — it needs am, is, or are.",
          },
        ],
      },
    ],
  },
  {
    id: "future-real-life",
    icon: "message",
    eyebrow: "Real-life English",
    title: "Weekend plans",
    blocks: [
      {
        kind: "chat",
        lines: [
          { who: "Aiman", text: ["What ", { b: "are you doing" }, " this weekend?"] },
          { who: "Sara", text: [{ b: "I'm meeting" }, " my cousins on Saturday."] },
          { who: "Aiman", text: "Nice. What about Sunday?" },
          { who: "Sara", text: [{ b: "I'm going to finish" }, " my project."] },
          { who: "Aiman", text: [{ b: "I'll help" }, " you if you need anything."] },
        ],
      },
    ],
  },
  {
    id: "future-check",
    icon: "check",
    eyebrow: "Test yourself",
    title: "Quick check",
    blocks: [{ kind: "quickCheck", questions: futureFormsQuickCheck }],
  },
  {
    id: "future-summary",
    icon: "sparkles",
    eyebrow: "Revision map",
    title: "Mission summary",
    blocks: [
      {
        kind: "summary",
        cards: [
          { title: "Will", body: "decision now · prediction · promise" },
          { title: "Going to", body: "plan · intention · evidence" },
          { title: "Present continuous", body: "arranged future event" },
          { title: "After will", body: "base verb — no to, no -s" },
          { title: "Going to pattern", body: "am / is / are + going to + base verb" },
          { title: "Time clues", body: "tomorrow · tonight · next week · soon" },
        ],
      },
    ],
  },
  {
    id: "future-exam",
    icon: "target",
    eyebrow: "Exam strategy",
    title: "Exam booster",
    blocks: [
      {
        kind: "exam",
        tips: [
          "Decide whether the future is a decision, a plan, or an arrangement.",
          "After will, always use the base verb.",
          "Be going to needs am, is, or are — and the word to.",
          "Present evidence usually points to be going to, not will.",
          "A fixed time and place usually points to the present continuous.",
        ],
        worked: [
          { b: "Worked example:" },
          " “Look at those clouds. It ___ rain.” The clouds are evidence you can see right now, so: ",
          { b: "It is going to rain." },
        ],
      },
    ],
  },
];

export const subjectVerbSections: LessonSectionSpec[] = [
  {
    id: "sva-brief",
    icon: "target",
    eyebrow: "Mission brief",
    title: "Make every subject and verb match",
    blocks: [
      {
        kind: "brief",
        paragraphs: [
          [
            "In English the subject and the verb must ",
            { b: "agree" },
            ". A singular subject takes one verb form; a plural subject takes another.",
          ],
          "Get this right and your writing instantly sounds more accurate.",
        ],
        pills: ["Match singular and plural", "Control is / are", "Fix don't and doesn't"],
      },
    ],
  },
  {
    id: "sva-big-idea",
    icon: "lightbulb",
    eyebrow: "Big idea",
    title: "One subject, one matching verb",
    blocks: [
      {
        kind: "compare",
        cards: [
          {
            label: "Singular subject",
            title: "He / She / It → verb + s",
            body: ["He plays.", "She watches.", "It works."],
          },
          {
            label: "Plural subject",
            title: "I / You / We / They → base verb",
            body: ["I play.", "You play.", "We play.", "They play."],
          },
        ],
      },
      {
        kind: "watchout",
        text: [
          { b: "Careful:" },
          " the -s moves. A plural noun takes -s, but a singular subject puts the -s on the verb.",
        ],
      },
    ],
  },
  {
    id: "sva-core-rule",
    icon: "badge",
    eyebrow: "Core rule",
    title: "Simple present agreement",
    blocks: [
      { kind: "formula", parts: ["He / She / It", "+", "verb + s / es"] },
      {
        kind: "ruleTable",
        label: "Third-person singular verb endings",
        rows: [
          ["Most verbs", "+ s", "play → plays · run → runs"],
          ["Ends in s, sh, ch, x, o", "+ es", "watch → watches · go → goes"],
          ["Consonant + y", "y → ies", "study → studies · carry → carries"],
        ],
      },
    ],
  },
  {
    id: "sva-be",
    icon: "help",
    eyebrow: "Control panel",
    title: "Am, is, are",
    blocks: [
      {
        kind: "three",
        cards: [
          { label: "I", title: "am", body: ["I am ready."] },
          { label: "He / She / It", title: "is", body: ["She is happy."] },
          { label: "You / We / They", title: "are", body: ["They are tired."] },
        ],
      },
    ],
  },
  {
    id: "sva-have",
    icon: "help",
    eyebrow: "Control panel",
    title: "Have and has",
    blocks: [
      {
        kind: "compare",
        cards: [
          {
            label: "I / You / We / They",
            title: "have",
            body: ["I have a book.", "They have homework."],
          },
          { label: "He / She / It", title: "has", body: ["She has a bicycle."] },
        ],
      },
    ],
  },
  {
    id: "sva-do",
    icon: "badge",
    eyebrow: "Negatives",
    title: "Don't and doesn't",
    blocks: [
      {
        kind: "compare",
        cards: [
          {
            label: "I / You / We / They",
            title: "don't",
            body: ["I don't like durian.", "They don't play chess."],
          },
          {
            label: "He / She / It",
            title: "doesn't",
            body: ["He doesn't play.", "She doesn't like maths."],
          },
        ],
      },
      {
        kind: "watchout",
        text: [
          { b: "The key rule:" },
          " doesn't already carries the -s, so the main verb goes back to its base form.",
        ],
      },
      { kind: "wrongRight", wrong: "He doesn't plays.", right: "He doesn't play." },
    ],
  },
  {
    id: "sva-nouns",
    icon: "book",
    eyebrow: "See it in action",
    title: "Singular vs plural nouns",
    blocks: [
      {
        kind: "compare",
        cards: [
          {
            label: "Singular noun",
            title: "The boy plays football.",
            body: ["My friend likes music."],
            note: "one person → verb takes -s",
          },
          {
            label: "Plural noun",
            title: "The boys play football.",
            body: ["My friends like music."],
            note: "more than one → base verb",
          },
        ],
      },
    ],
  },
  {
    id: "sva-and",
    icon: "sparkles",
    eyebrow: "How it works",
    title: "Two subjects joined by and",
    blocks: [
      {
        kind: "brief",
        paragraphs: [
          ["When two subjects are joined by ", { b: "and" }, ", they usually count as plural."],
        ],
      },
      {
        kind: "compare",
        cards: [
          { label: "And", title: "Aiman and Sara are students.", body: ["Two people → are."] },
          {
            label: "And",
            title: "My brother and I play football.",
            body: ["Two people → base verb."],
          },
        ],
      },
    ],
  },
  {
    id: "sva-everyone",
    icon: "help",
    eyebrow: "Tricky subjects",
    title: "Everyone, someone, nobody",
    blocks: [
      {
        kind: "brief",
        paragraphs: [
          [
            "Words like everyone and somebody feel plural, but in grammar they are ",
            { b: "singular" },
            ".",
          ],
        ],
      },
      {
        kind: "chips",
        label: "Singular indefinite pronouns",
        items: ["everyone", "everybody", "someone", "somebody", "no one", "nobody"],
      },
      {
        kind: "compare",
        cards: [
          { label: "Singular", title: "Everyone likes the game.", body: ["Not: Everyone like."] },
          { label: "Singular", title: "Someone is outside.", body: ["Not: Someone are outside."] },
        ],
      },
    ],
  },
  {
    id: "sva-errors",
    icon: "search",
    eyebrow: "Common mistakes",
    title: "Error detector",
    blocks: [
      {
        kind: "errors",
        items: [
          {
            before: "He ",
            wrong: "play",
            after: " football.",
            correction: "He plays football.",
            reason: "He is third-person singular, so the verb takes -s.",
          },
          {
            before: "They ",
            wrong: "plays",
            after: " football.",
            correction: "They play football.",
            reason: "They is plural, so use the base verb.",
          },
          {
            before: "She ",
            wrong: "don't",
            after: " like maths.",
            correction: "She doesn't like maths.",
            reason: "He, she, and it take doesn't, not don't.",
          },
          {
            before: "He doesn't ",
            wrong: "likes",
            after: " coffee.",
            correction: "He doesn't like coffee.",
            reason: "After doesn't, the main verb returns to its base form.",
          },
          {
            before: "Everyone ",
            wrong: "are",
            after: " ready.",
            correction: "Everyone is ready.",
            reason: "Everyone is grammatically singular, so it takes is.",
          },
        ],
      },
    ],
  },
  {
    id: "sva-real-life",
    icon: "message",
    eyebrow: "Real-life English",
    title: "Who plays what?",
    blocks: [
      {
        kind: "chat",
        lines: [
          { who: "Sara", text: [{ b: "Does" }, " Amir play badminton?"] },
          { who: "Aiman", text: ["Yes, he ", { b: "does" }, "."] },
          { who: "Sara", text: [{ b: "Do" }, " his friends play too?"] },
          { who: "Aiman", text: ["Yes, they ", { b: "play" }, " every weekend."] },
        ],
      },
    ],
  },
  {
    id: "sva-check",
    icon: "check",
    eyebrow: "Test yourself",
    title: "Quick check",
    blocks: [{ kind: "quickCheck", questions: subjectVerbQuickCheck }],
  },
  {
    id: "sva-summary",
    icon: "sparkles",
    eyebrow: "Revision map",
    title: "Mission summary",
    blocks: [
      {
        kind: "summary",
        cards: [
          { title: "He / She / It", body: "usually verb + s or es" },
          { title: "I / You / We / They", body: "base verb" },
          { title: "Be", body: "I → am · he/she/it → is · you/we/they → are" },
          { title: "Have", body: "he/she/it → has · everyone else → have" },
          { title: "Negatives", body: "he/she/it → doesn't · everyone else → don't" },
          { title: "Everyone", body: "singular — takes is, has, does" },
        ],
      },
    ],
  },
  {
    id: "sva-exam",
    icon: "target",
    eyebrow: "Exam strategy",
    title: "Exam booster",
    blocks: [
      {
        kind: "exam",
        tips: [
          "Find the real subject before you choose the verb.",
          "Decide whether the subject is singular or plural.",
          "Remember that a plural noun takes -s but a singular subject puts -s on the verb.",
          "After don't and doesn't, always use the base verb.",
          "Treat everyone, somebody, and nobody as singular.",
        ],
        worked: [
          { b: "Worked example:" },
          " “Everyone ___ ready.” Everyone is singular even though it means many people, so: ",
          { b: "Everyone is ready." },
        ],
      },
    ],
  },
];

export const modalsSections: LessonSectionSpec[] = [
  {
    id: "modals-brief",
    icon: "target",
    eyebrow: "Mission brief",
    title: "Change the meaning of any verb",
    blocks: [
      {
        kind: "brief",
        paragraphs: [
          [
            "Modal verbs sit in front of a main verb and change its meaning — turning it into ",
            { b: "ability, possibility, advice, or obligation" },
            ".",
          ],
          "One small word can completely change what a sentence means.",
        ],
        pills: ["Use the base verb", "Match modal to meaning", "Avoid must / mustn't traps"],
      },
    ],
  },
  {
    id: "modals-formula",
    icon: "badge",
    eyebrow: "Core rule",
    title: "Basic formula",
    blocks: [
      { kind: "formula", parts: ["Subject", "+", "modal", "+", "base verb"] },
      {
        kind: "example",
        text: [
          "I ",
          { b: "can swim" },
          ". · You ",
          { b: "should study" },
          ". · We ",
          { b: "must leave" },
          ".",
        ],
      },
      {
        kind: "watchout",
        text: [
          { b: "The one rule that matters most:" },
          " after a modal, use the base verb. No to, no -s, no -ing.",
        ],
      },
      {
        kind: "three",
        cards: [
          { label: "Never", title: "She can swims", body: ["No -s after a modal."] },
          { label: "Never", title: "You should to study", body: ["No to after a modal."] },
          { label: "Never", title: "I can swimming", body: ["No -ing after a modal."] },
        ],
      },
    ],
  },
  {
    id: "modals-can",
    icon: "sparkles",
    eyebrow: "How it works",
    title: "Can and can't",
    blocks: [
      {
        kind: "three",
        cards: [
          { label: "Ability", title: "I can swim.", body: ["You are able to do it."] },
          { label: "Ability", title: "She can speak English.", body: ["A skill she has."] },
          { label: "Permission", title: "Can I borrow your pen?", body: ["Asking to be allowed."] },
        ],
      },
      { kind: "chips", label: "Can contractions", items: ["cannot → can't"] },
    ],
  },
  {
    id: "modals-could",
    icon: "clock",
    eyebrow: "How it works",
    title: "Could",
    blocks: [
      {
        kind: "compare",
        cards: [
          {
            label: "Past ability",
            title: "When I was six, I could swim.",
            body: ["An ability you had in the past."],
          },
          {
            label: "Polite request",
            title: "Could you help me?",
            body: ["Softer and more polite than can."],
          },
        ],
      },
    ],
  },
  {
    id: "modals-may-might",
    icon: "help",
    eyebrow: "How it works",
    title: "May and might",
    blocks: [
      {
        kind: "brief",
        paragraphs: [
          [
            "May and might both show ",
            { b: "possibility" },
            " — something is possible, but not certain.",
          ],
        ],
      },
      {
        kind: "compare",
        cards: [
          { label: "May", title: "It may rain later.", body: ["Possible, not certain."] },
          { label: "Might", title: "She might come tonight.", body: ["Possible, not certain."] },
        ],
      },
    ],
  },
  {
    id: "modals-should",
    icon: "lightbulb",
    eyebrow: "How it works",
    title: "Should and shouldn't",
    blocks: [
      {
        kind: "three",
        cards: [
          { label: "Advice", title: "You should sleep early.", body: ["A good idea."] },
          { label: "Advice", title: "You should drink more water.", body: ["A recommendation."] },
          {
            label: "Advice against",
            title: "You shouldn't stay up too late.",
            body: ["A bad idea."],
          },
        ],
      },
    ],
  },
  {
    id: "modals-must",
    icon: "badge",
    eyebrow: "How it works",
    title: "Must and mustn't",
    blocks: [
      {
        kind: "compare",
        cards: [
          {
            label: "Must",
            title: "You must wear a seat belt.",
            body: ["Strong obligation or necessity."],
          },
          {
            label: "Mustn't",
            title: "You mustn't touch that wire.",
            body: ["Prohibition — it is forbidden."],
          },
        ],
      },
      {
        kind: "watchout",
        text: [
          { b: "Important:" },
          " mustn't does not mean “not necessary”. It means “do not do this”.",
        ],
      },
    ],
  },
  {
    id: "modals-have-to",
    icon: "help",
    eyebrow: "How it works",
    title: "Have to and has to",
    blocks: [
      {
        kind: "brief",
        paragraphs: [
          [
            "Have to also shows necessity, and it often comes from a ",
            { b: "rule" },
            " rather than the speaker.",
          ],
        ],
      },
      {
        kind: "compare",
        cards: [
          {
            label: "I / You / We / They",
            title: "have to",
            body: ["I have to finish my homework."],
          },
          { label: "He / She / It", title: "has to", body: ["She has to wear a uniform."] },
        ],
      },
      {
        kind: "wrongRight",
        wrong: "She has to wears a uniform.",
        right: "She has to wear a uniform.",
      },
    ],
  },
  {
    id: "modals-compare",
    icon: "book",
    eyebrow: "Compare it",
    title: "Which modal, which meaning?",
    blocks: [
      {
        kind: "concepts",
        cards: [
          { label: "Can", title: "Ability", body: ["I can swim."] },
          { label: "May / Might", title: "Possibility", body: ["It might rain."] },
          { label: "Should", title: "Advice", body: ["You should rest."] },
          { label: "Must", title: "Strong obligation", body: ["You must stop."] },
          { label: "Mustn't", title: "Prohibition", body: ["You mustn't run here."] },
          { label: "Have to", title: "Necessity from a rule", body: ["We have to wear shoes."] },
        ],
      },
    ],
  },
  {
    id: "modals-errors",
    icon: "search",
    eyebrow: "Common mistakes",
    title: "Error detector",
    blocks: [
      {
        kind: "errors",
        items: [
          {
            before: "She can ",
            wrong: "swims",
            after: ".",
            correction: "She can swim.",
            reason: "Modals are never followed by a verb with -s.",
          },
          {
            before: "You should ",
            wrong: "to study",
            after: ".",
            correction: "You should study.",
            reason: "Modals are followed directly by the base verb, with no to.",
          },
          {
            before: "He must ",
            wrong: "goes",
            after: " now.",
            correction: "He must go now.",
            reason: "After must, use the base verb.",
          },
          {
            before: "I can ",
            wrong: "swimming",
            after: ".",
            correction: "I can swim.",
            reason: "Modals are never followed by an -ing verb.",
          },
          {
            before: "She has to ",
            wrong: "wears",
            after: " a uniform.",
            correction: "She has to wear a uniform.",
            reason: "Has to already shows the agreement, so the main verb stays base.",
          },
        ],
      },
    ],
  },
  {
    id: "modals-real-life",
    icon: "message",
    eyebrow: "Real-life English",
    title: "Before the exam",
    blocks: [
      {
        kind: "chat",
        lines: [
          { who: "Aiman", text: "I have an exam tomorrow." },
          { who: "Sara", text: ["You ", { b: "should revise" }, " tonight."] },
          { who: "Aiman", text: [{ b: "Can I study" }, " with you?"] },
          { who: "Sara", text: ["Sure. But we ", { b: "must finish" }, " before 10."] },
        ],
      },
    ],
  },
  {
    id: "modals-check",
    icon: "check",
    eyebrow: "Test yourself",
    title: "Quick check",
    blocks: [{ kind: "quickCheck", questions: modalsQuickCheck }],
  },
  {
    id: "modals-summary",
    icon: "sparkles",
    eyebrow: "Revision map",
    title: "Mission summary",
    blocks: [
      {
        kind: "summary",
        cards: [
          { title: "Can", body: "ability · permission" },
          { title: "Could", body: "past ability · polite request" },
          { title: "May / Might", body: "possibility" },
          { title: "Should", body: "advice" },
          { title: "Must / Mustn't", body: "strong obligation · prohibition" },
          { title: "Have to", body: "necessity, usually from a rule" },
        ],
      },
    ],
  },
  {
    id: "modals-exam",
    icon: "target",
    eyebrow: "Exam strategy",
    title: "Exam booster",
    blocks: [
      {
        kind: "exam",
        tips: [
          "Decide the meaning first: ability, possibility, advice, or obligation.",
          "After any modal, use the base verb.",
          "Modals never take -s, even with he, she, or it.",
          "Mustn't means forbidden, not optional.",
          "Have to and has to must still agree with the subject.",
        ],
        worked: [
          { b: "Worked example:" },
          " “Students ___ run in the science lab.” Running there is forbidden, so: ",
          { b: "Students mustn't run in the science lab." },
        ],
      },
    ],
  },
];

export const adjectivesAdverbsSections: LessonSectionSpec[] = [
  {
    id: "adjadv-brief",
    icon: "target",
    eyebrow: "Mission brief",
    title: "Describe things, and describe actions",
    blocks: [
      {
        kind: "brief",
        paragraphs: [
          [
            "An ",
            { b: "adjective" },
            " describes a noun. An ",
            { b: "adverb" },
            " usually describes how an action happens.",
          ],
          "Once you can tell which word is being described, choosing the right form becomes easy.",
        ],
        pills: ["Describe nouns", "Describe actions", "Master good vs well"],
      },
    ],
  },
  {
    id: "adjadv-big-idea",
    icon: "lightbulb",
    eyebrow: "Big idea",
    title: "What is being described?",
    blocks: [
      {
        kind: "compare",
        cards: [
          {
            label: "Adjective",
            title: "a fast car",
            body: ["Fast describes the car — a noun."],
            note: "adjective → noun",
          },
          {
            label: "Adverb",
            title: "The car moves quickly.",
            body: ["Quickly describes moves — a verb."],
            note: "adverb → verb",
          },
        ],
      },
    ],
  },
  {
    id: "adjadv-adjectives",
    icon: "book",
    eyebrow: "How it works",
    title: "Adjectives describe nouns",
    blocks: [
      {
        kind: "chips",
        label: "Example adjectives",
        items: [
          "a tall boy",
          "a beautiful beach",
          "a difficult question",
          "a red bag",
          "an interesting book",
        ],
      },
    ],
  },
  {
    id: "adjadv-position",
    icon: "help",
    eyebrow: "How it works",
    title: "Where adjectives appear",
    blocks: [
      {
        kind: "compare",
        cards: [
          {
            label: "Before the noun",
            title: "a beautiful beach",
            body: ["a difficult question", "a red bag"],
          },
          {
            label: "After be",
            title: "The beach is beautiful.",
            body: ["The student is tired.", "The questions are difficult."],
          },
        ],
      },
    ],
  },
  {
    id: "adjadv-manner",
    icon: "sparkles",
    eyebrow: "Word transformation",
    title: "Adverbs of manner",
    blocks: [
      {
        kind: "brief",
        paragraphs: [["Many adverbs are made by adding ", { b: "-ly" }, " to an adjective."]],
      },
      {
        kind: "transform",
        label: "Adjective to adverb",
        items: [
          ["quick", "quickly"],
          ["slow", "slowly"],
          ["careful", "carefully"],
          ["quiet", "quietly"],
        ],
      },
    ],
  },
  {
    id: "adjadv-spelling",
    icon: "badge",
    eyebrow: "Spelling rules",
    title: "When the spelling changes",
    blocks: [
      {
        kind: "ruleTable",
        label: "Spelling rules for -ly adverbs",
        rows: [
          ["Most adjectives", "+ ly", "quick → quickly · careful → carefully"],
          ["Ends in consonant + y", "y → ily", "easy → easily · happy → happily"],
          ["Ends in -le", "drop e + y", "gentle → gently · simple → simply"],
        ],
      },
    ],
  },
  {
    id: "adjadv-irregular",
    icon: "target",
    eyebrow: "Learn these by heart",
    title: "Special forms",
    blocks: [
      {
        kind: "brief",
        paragraphs: [
          [
            "A few words do ",
            { b: "not" },
            " follow the -ly pattern. These come up constantly, so learn them now.",
          ],
        ],
      },
      {
        kind: "verbGrid",
        label: "Irregular adjective and adverb pairs",
        pairs: [
          ["good", "well"],
          ["fast", "fast"],
          ["hard", "hard"],
        ],
      },
      {
        kind: "compare",
        cards: [
          {
            label: "Adjective",
            title: "She is a good singer.",
            body: ["He is a fast runner."],
          },
          { label: "Adverb", title: "She sings well.", body: ["He runs fast."] },
        ],
      },
      {
        kind: "watchout",
        text: [
          { b: "Watch out:" },
          " fastly and goodly are not words. Fast stays fast, and good becomes well.",
        ],
      },
    ],
  },
  {
    id: "adjadv-compare",
    icon: "book",
    eyebrow: "Compare it",
    title: "Adjective vs adverb",
    blocks: [
      {
        kind: "compare",
        cards: [
          {
            label: "Adjective",
            title: "He is a careful driver.",
            body: ["Careful describes driver."],
            note: "describes the noun",
          },
          {
            label: "Adverb",
            title: "He drives carefully.",
            body: ["Carefully describes drives."],
            note: "describes the verb",
          },
        ],
      },
      {
        kind: "compare",
        cards: [
          {
            label: "Adjective",
            title: "She is a beautiful singer.",
            body: ["Beautiful describes singer."],
          },
          {
            label: "Adverb",
            title: "She sings beautifully.",
            body: ["Beautifully describes sings."],
          },
        ],
      },
    ],
  },
  {
    id: "adjadv-good-well",
    icon: "help",
    eyebrow: "Common confusion",
    title: "Good vs well",
    blocks: [
      {
        kind: "compare",
        cards: [
          {
            label: "Good",
            title: "adjective",
            body: ["He is a good player."],
            note: "describes a noun",
          },
          { label: "Well", title: "adverb", body: ["He plays well."], note: "describes an action" },
        ],
      },
      { kind: "wrongRight", wrong: "He plays good.", right: "He plays well." },
    ],
  },
  {
    id: "adjadv-errors",
    icon: "search",
    eyebrow: "Common mistakes",
    title: "Error detector",
    blocks: [
      {
        kind: "errors",
        items: [
          {
            before: "She sings ",
            wrong: "beautiful",
            after: ".",
            correction: "She sings beautifully.",
            reason: "This describes how she sings, so it needs the adverb.",
          },
          {
            before: "He runs ",
            wrong: "quicklyly",
            after: ".",
            correction: "He runs quickly.",
            reason: "Add -ly only once: quick becomes quickly.",
          },
          {
            before: "She is a ",
            wrong: "carefully",
            after: " student.",
            correction: "She is a careful student.",
            reason: "Student is a noun, so it needs the adjective careful.",
          },
          {
            before: "He plays ",
            wrong: "good",
            after: ".",
            correction: "He plays well.",
            reason: "Good describes a noun; well describes how he plays.",
          },
          {
            before: "The car moves ",
            wrong: "slow",
            after: ".",
            correction: "The car moves slowly.",
            reason: "This describes how the car moves, so use the adverb slowly.",
          },
        ],
      },
      {
        kind: "bridge",
        title: "But what about fast?",
        text: "Fast is an exception: The car is fast (adjective) and The car moves fast (adverb) are both correct. Never write fastly.",
      },
    ],
  },
  {
    id: "adjadv-real-life",
    icon: "message",
    eyebrow: "Real-life English",
    title: "Talking about a teammate",
    blocks: [
      {
        kind: "chat",
        lines: [
          { who: "Sara", text: ["Is Amir a ", { b: "good" }, " football player?"] },
          { who: "Aiman", text: ["Yes. He plays really ", { b: "well" }, "."] },
          { who: "Sara", text: ["He's ", { b: "fast" }, " too."] },
          { who: "Aiman", text: ["Yeah. He runs very ", { b: "fast" }, "."] },
        ],
      },
    ],
  },
  {
    id: "adjadv-check",
    icon: "check",
    eyebrow: "Test yourself",
    title: "Quick check",
    blocks: [{ kind: "quickCheck", questions: adjectivesAdverbsQuickCheck }],
  },
  {
    id: "adjadv-summary",
    icon: "sparkles",
    eyebrow: "Revision map",
    title: "Mission summary",
    blocks: [
      {
        kind: "summary",
        cards: [
          { title: "Adjective", body: "describes a noun" },
          { title: "Adverb", body: "usually describes a verb or action" },
          { title: "Most adverbs", body: "adjective + ly" },
          { title: "Spelling", body: "easy → easily · gentle → gently" },
          { title: "Special forms", body: "good → well · fast → fast · hard → hard" },
          { title: "After be", body: "use an adjective: The beach is beautiful." },
        ],
      },
    ],
  },
  {
    id: "adjadv-exam",
    icon: "target",
    eyebrow: "Exam strategy",
    title: "Exam booster",
    blocks: [
      {
        kind: "exam",
        tips: [
          "Ask what is being described: a noun or an action.",
          "If it describes a noun, use an adjective.",
          "If it describes how something happens, use an adverb.",
          "Most manner adverbs end in -ly, but check the spelling rule.",
          "Learn the exceptions: good → well, fast → fast, hard → hard.",
        ],
        worked: [
          { b: "Worked example:" },
          " “She is a good singer. She sings ___.” The blank describes how she sings, so: ",
          { b: "She sings well." },
        ],
      },
    ],
  },
];
