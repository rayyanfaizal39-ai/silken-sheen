import { describe, expect, it } from "vitest";
import { scienceF2C1InteractiveBM } from "./chapter-1/interactive-bm";
import { scienceF2C1InteractiveDLP } from "./chapter-1/interactive-dlp";
import { scienceF2C1QuizzesBM } from "./chapter-1/quizzes-bm";
import { scienceF2C1QuizzesDLP } from "./chapter-1/quizzes-dlp";
import { scienceF2C1FlashcardsBM } from "./chapter-1/flashcards-bm";
import { scienceF2C1FlashcardsDLP } from "./chapter-1/flashcards-dlp";
import { scienceF2C1MindMapBM } from "./chapter-1/mindmap-bm";
import { scienceF2C1MindMapDLP } from "./chapter-1/mindmap-dlp";
import { scienceF2C2InteractiveBM } from "./chapter-2/interactive-bm";
import { scienceF2C2InteractiveDLP } from "./chapter-2/interactive-dlp";
import { scienceF2C2QuizzesBM } from "./chapter-2/quizzes-bm";
import { scienceF2C2QuizzesDLP } from "./chapter-2/quizzes-dlp";
import { scienceF2C2FlashcardsBM } from "./chapter-2/flashcards-bm";
import { scienceF2C2FlashcardsDLP } from "./chapter-2/flashcards-dlp";
import { scienceF2C2MindMapBM } from "./chapter-2/mindmap-bm";
import { scienceF2C2MindMapDLP } from "./chapter-2/mindmap-dlp";
import { scienceF2C3InteractiveBM } from "./chapter-3/interactive-bm";
import { scienceF2C3InteractiveDLP } from "./chapter-3/interactive-dlp";
import { scienceF2C3QuizzesBM } from "./chapter-3/quizzes-bm";
import { scienceF2C3QuizzesDLP } from "./chapter-3/quizzes-dlp";
import { scienceF2C3FlashcardsBM } from "./chapter-3/flashcards-bm";
import { scienceF2C3FlashcardsDLP } from "./chapter-3/flashcards-dlp";
import { scienceF2C3MindMapBM } from "./chapter-3/mindmap-bm";
import { scienceF2C3MindMapDLP } from "./chapter-3/mindmap-dlp";
import { scienceF2C4InteractiveBM } from "./chapter-4/interactive-bm";
import { scienceF2C4InteractiveDLP } from "./chapter-4/interactive-dlp";
import { scienceF2C4QuizzesBM } from "./chapter-4/quizzes-bm";
import { scienceF2C4QuizzesDLP } from "./chapter-4/quizzes-dlp";
import { scienceF2C4FlashcardsBM } from "./chapter-4/flashcards-bm";
import { scienceF2C4FlashcardsDLP } from "./chapter-4/flashcards-dlp";
import { scienceF2C4MindMapBM } from "./chapter-4/mindmap-bm";
import { scienceF2C4MindMapDLP } from "./chapter-4/mindmap-dlp";
import { scienceF2C5InteractiveBM } from "./chapter-5/interactive-bm";
import { scienceF2C5InteractiveDLP } from "./chapter-5/interactive-dlp";
import { scienceF2C5QuizzesBM } from "./chapter-5/quizzes-bm";
import { scienceF2C5QuizzesDLP } from "./chapter-5/quizzes-dlp";
import { scienceF2C5FlashcardsBM } from "./chapter-5/flashcards-bm";
import { scienceF2C5FlashcardsDLP } from "./chapter-5/flashcards-dlp";
import { scienceF2C5MindMapBM } from "./chapter-5/mindmap-bm";
import { scienceF2C5MindMapDLP } from "./chapter-5/mindmap-dlp";
import { scienceF2C6InteractiveBM } from "./chapter-6/interactive-bm";
import { scienceF2C6InteractiveDLP } from "./chapter-6/interactive-dlp";
import { scienceF2C6QuizzesBM } from "./chapter-6/quizzes-bm";
import { scienceF2C6QuizzesDLP } from "./chapter-6/quizzes-dlp";
import { scienceF2C6FlashcardsBM } from "./chapter-6/flashcards-bm";
import { scienceF2C6FlashcardsDLP } from "./chapter-6/flashcards-dlp";
import { scienceF2C6MindMapBM } from "./chapter-6/mindmap-bm";
import { scienceF2C6MindMapDLP } from "./chapter-6/mindmap-dlp";

/**
 * Guards against curriculum/audit/textbook metadata leaking into learner-facing Form 2
 * Science Chapter 1-6 content — see SCIENCE_F2_CH01_03_LEARNER_FACING_QA_AUDIT.md. These are
 * live, student-facing data files (registered in src/content/registry.ts), not the dead
 * notes-{bm,dlp}.ts legacy files, which are intentionally excluded.
 */

const LIVE_SURFACES: Record<string, unknown> = {
  "ch1 interactive bm": scienceF2C1InteractiveBM,
  "ch1 interactive dlp": scienceF2C1InteractiveDLP,
  "ch1 quizzes bm": scienceF2C1QuizzesBM,
  "ch1 quizzes dlp": scienceF2C1QuizzesDLP,
  "ch1 flashcards bm": scienceF2C1FlashcardsBM,
  "ch1 flashcards dlp": scienceF2C1FlashcardsDLP,
  "ch1 mindmap bm": scienceF2C1MindMapBM,
  "ch1 mindmap dlp": scienceF2C1MindMapDLP,
  "ch2 interactive bm": scienceF2C2InteractiveBM,
  "ch2 interactive dlp": scienceF2C2InteractiveDLP,
  "ch2 quizzes bm": scienceF2C2QuizzesBM,
  "ch2 quizzes dlp": scienceF2C2QuizzesDLP,
  "ch2 flashcards bm": scienceF2C2FlashcardsBM,
  "ch2 flashcards dlp": scienceF2C2FlashcardsDLP,
  "ch2 mindmap bm": scienceF2C2MindMapBM,
  "ch2 mindmap dlp": scienceF2C2MindMapDLP,
  "ch3 interactive bm": scienceF2C3InteractiveBM,
  "ch3 interactive dlp": scienceF2C3InteractiveDLP,
  "ch3 quizzes bm": scienceF2C3QuizzesBM,
  "ch3 quizzes dlp": scienceF2C3QuizzesDLP,
  "ch3 flashcards bm": scienceF2C3FlashcardsBM,
  "ch3 flashcards dlp": scienceF2C3FlashcardsDLP,
  "ch3 mindmap bm": scienceF2C3MindMapBM,
  "ch3 mindmap dlp": scienceF2C3MindMapDLP,
  "ch4 interactive bm": scienceF2C4InteractiveBM,
  "ch4 interactive dlp": scienceF2C4InteractiveDLP,
  "ch4 quizzes bm": scienceF2C4QuizzesBM,
  "ch4 quizzes dlp": scienceF2C4QuizzesDLP,
  "ch4 flashcards bm": scienceF2C4FlashcardsBM,
  "ch4 flashcards dlp": scienceF2C4FlashcardsDLP,
  "ch4 mindmap bm": scienceF2C4MindMapBM,
  "ch4 mindmap dlp": scienceF2C4MindMapDLP,
  "ch5 interactive bm": scienceF2C5InteractiveBM,
  "ch5 interactive dlp": scienceF2C5InteractiveDLP,
  "ch5 quizzes bm": scienceF2C5QuizzesBM,
  "ch5 quizzes dlp": scienceF2C5QuizzesDLP,
  "ch5 flashcards bm": scienceF2C5FlashcardsBM,
  "ch5 flashcards dlp": scienceF2C5FlashcardsDLP,
  "ch5 mindmap bm": scienceF2C5MindMapBM,
  "ch5 mindmap dlp": scienceF2C5MindMapDLP,
  "ch6 interactive bm": scienceF2C6InteractiveBM,
  "ch6 interactive dlp": scienceF2C6InteractiveDLP,
  "ch6 quizzes bm": scienceF2C6QuizzesBM,
  "ch6 quizzes dlp": scienceF2C6QuizzesDLP,
  "ch6 flashcards bm": scienceF2C6FlashcardsBM,
  "ch6 flashcards dlp": scienceF2C6FlashcardsDLP,
  "ch6 mindmap bm": scienceF2C6MindMapBM,
  "ch6 mindmap dlp": scienceF2C6MindMapDLP,
};

const FORBIDDEN_PATTERNS: [string, RegExp][] = [
  ["literal DSKP mention", /DSKP/],
  ["KSSM DSKP", /KSSM DSKP/i],
  ["Standard Kandungan", /Standard Kandungan/i],
  ["Standard Pembelajaran", /Standard Pembelajaran/i],
  ["textbook citation (BM)", /buku teks (menyatakan|hanya)/i],
  ["textbook citation (EN)", /the textbook (states|says)/i],
  ["numbered textbook figure", /Rajah \d/],
  ["numbered textbook figure (EN)", /\bFigure \d/],
  ["numbered textbook experiment (BM)", /Eksperimen \d\.\d/],
  ["numbered textbook experiment (EN)", /Experiment \d\.\d/],
  ["numbered textbook activity (BM)", /Aktiviti \d\.\d/],
  ["numbered textbook activity (EN)", /\bActivity \d\.\d/],
  ["printed-page reference", /printed page/i],
  ["official-answer reference", /official answer/i],
  ["errata reference", /errata/i],
  // "audit air" / "water audit" is Chapter 5 curriculum vocabulary — the household
  // water-use project the syllabus asks for — not audit metadata, so it is excluded
  // by name. Everything else ("audit report", "deep audit", "audited against") still trips.
  ["audit reference", /(?<!water )\baudit\b(?! air\b)/i],
  ["remediation reference", /remediation/i],
  ["release-gate reference", /release gate/i],
  ["source-supported framing", /source-supported/i],
  ["source-aligned framing", /source-aligned/i],
  ["binding-scope framing", /binding scope/i],
  ["skop DSKP framing", /skop DSKP/i],
  ["'not core' scope-justification", /not core (DSKP|scope|requirement)/i],
  ["'bukan skop teras' scope-justification", /bukan (skop )?teras/i],
  ["'outside scope' framing", /outside (the )?(DSKP )?scope/i],
  ["'core requirement' framing", /core (DSKP )?requirement/i],
  ["mandatory-outcome framing", /mandatory outcome/i],
  ["reviewer-note bracket", /\[Nota KBAT|\[KBAT note/],
  ["bracketed 'not a textbook quotation' note", /not a textbook quotation/i],
];

describe("Form 2 Science Chapters 1-6 — learner-facing content carries no curriculum/audit metadata", () => {
  for (const [surfaceName, content] of Object.entries(LIVE_SURFACES)) {
    it(`${surfaceName}: no forbidden curriculum/audit/textbook-meta wording`, () => {
      const text = JSON.stringify(content);
      for (const [label, pattern] of FORBIDDEN_PATTERNS) {
        expect(
          pattern.test(text),
          `${surfaceName} contains ${label}: ${text.match(pattern)?.[0]}`,
        ).toBe(false);
      }
    });
  }
});
