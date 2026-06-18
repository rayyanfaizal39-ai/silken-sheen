export type LearningFormId = "form1" | "form2" | "form3" | "form4" | "form5";

export interface LearningFormMeta {
  id: LearningFormId;
  label: "Form 1" | "Form 2" | "Form 3" | "Form 4" | "Form 5";
  order: number;
  available: boolean;
}

export const learningForms: LearningFormMeta[] = [
  { id: "form1", label: "Form 1", order: 1, available: true },
  { id: "form2", label: "Form 2", order: 2, available: true },
  { id: "form3", label: "Form 3", order: 3, available: true },
  { id: "form4", label: "Form 4", order: 4, available: false },
  { id: "form5", label: "Form 5", order: 5, available: false },
];
