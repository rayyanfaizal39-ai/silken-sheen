import type { QuickCheckQuestion } from "./grammar-content";

/**
 * Data model for config-driven grammar lessons.
 *
 * Topics 01–06 are hand-written JSX because each one carries bespoke visuals.
 * Topics 07–10 are expressed purely as data and rendered by <LessonBlocks />,
 * so a new topic is a content change rather than a new component.
 */

/** Inline text with optional emphasis, e.g. ["I ", { b: "will study" }, " tonight."] */
export type RichText = string | Array<string | { b: string } | { u: string }>;

export type CardSpec = {
  label?: string;
  title: string;
  body?: RichText[];
  note?: string;
};

export type ErrorSpec = {
  /** Text before the highlighted mistake. */
  before?: string;
  /** The incorrect fragment, underlined and quoted in the reveal button. */
  wrong: string;
  /** Text after the highlighted mistake. */
  after?: string;
  correction: string;
  reason: string;
};

export type ChatLine = { who: string; text: RichText };

export type LessonBlock =
  | { kind: "brief"; paragraphs: RichText[]; pills?: string[] }
  | { kind: "concepts"; cards: CardSpec[] }
  | { kind: "compare"; cards: CardSpec[] }
  | { kind: "three"; cards: CardSpec[] }
  | { kind: "formula"; parts: string[] }
  | { kind: "example"; text: RichText }
  | { kind: "watchout"; text: RichText }
  | { kind: "wrongRight"; wrong: string; right: string }
  | { kind: "ruleTable"; label: string; rows: Array<[string, string, string]> }
  | { kind: "transform"; label: string; items: Array<[string, string]> }
  | { kind: "chips"; label: string; items: string[] }
  | { kind: "verbGrid"; label: string; pairs: Array<[string, string]> }
  | { kind: "errors"; items: ErrorSpec[] }
  | { kind: "chat"; lines: ChatLine[] }
  | { kind: "quickCheck"; questions: QuickCheckQuestion[] }
  | { kind: "summary"; cards: Array<{ title: string; body: string }> }
  | { kind: "exam"; tips: string[]; worked: RichText }
  | { kind: "bridge"; title: string; text: RichText };

export type LessonIconName =
  | "target"
  | "lightbulb"
  | "badge"
  | "help"
  | "sparkles"
  | "book"
  | "search"
  | "message"
  | "check"
  | "clock";

export type LessonSectionSpec = {
  id: string;
  icon: LessonIconName;
  eyebrow: string;
  title: string;
  blocks: LessonBlock[];
};
