/**
 * English-specific data types.
 * Completely independent from ScienceChapter2Notes — English has its own
 * visual identity, card taxonomy, and learning mechanics.
 */

export type EnglishCardType =
  | "goal"           // 🎯  Chapter / section learning goal
  | "story"          // 📖  Narrative hook — short story or scenario
  | "concept"        // 💡  Core concept explanation
  | "grammar-rule"   // ⚡  Grammar rule with a formula
  | "real-world"     // 🌍  Malaysian real-world example
  | "mistake"        // ⚠️  Common mistake — wrong vs right comparison
  | "memory-trick"   // 🧠  Mnemonic or memory aid
  | "challenge"      // 🏆  Mini challenge prompt
  | "vocab"          // 🔤  Vocabulary booster words
  | "exam-tip"       // ✏️  Exam technique or scoring tip
  | "did-you-know"   // 🤔  Fun / surprising fact
  | "table";         // 📊  Comparison or reference table

export interface VocabWord {
  word: string;
  partOfSpeech: string;   // e.g. "noun", "verb", "adjective", "idiom"
  meaning: string;
  example: string;
}

export interface EnglishCard {
  type: EnglishCardType;
  title: string;
  body?: string;           // prose explanation
  items?: string[];        // bullet-point list
  formula?: string;        // for grammar-rule: the highlighted rule string
  wrong?: string;          // for mistake cards: the wrong version
  right?: string;          // for mistake cards: the correct version
  words?: VocabWord[];     // for vocab cards
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface EnglishSection {
  title: string;
  emoji: string;
  cards: EnglishCard[];
}

export interface EnglishChapterData {
  chapterTitle: string;
  tagline: string;          // short engaging pitch for the chapter
  heroEmoji: string;        // decorative hero emoji
  theme: "grammar" | "vocabulary" | "reading" | "writing";
  learningGoals: string[];  // 3-4 specific, actionable goals
  sections: EnglishSection[];
  wordVault: VocabWord[];   // collectible vocabulary bank for this chapter
  examFacts: string[];      // quick-fire exam-ready facts
}
