import type { LocalizedText, MathVisualLang } from "./mathQuestionVisual";

/** Only given values belong here. Unknown amounts remain question marks. */
export type MathFinanceVisual = {
  kind: "finance-model";
  title: LocalizedText;
  layout: "timeline" | "ledger" | "comparison";
  entries: { label: LocalizedText; value: LocalizedText }[];
  target: LocalizedText;
};

export function describeMathFinanceVisual(
  visual: MathFinanceVisual,
  lang: MathVisualLang,
) {
  return `${visual.title[lang]}. ${visual.entries.map((entry) => `${entry.label[lang]}: ${entry.value[lang]}`).join("; ")}. ${visual.target[lang]}: ?`;
}
