import type { Form } from "@/data/subjects-meta";

export type BahasaMelayuMindMapCategory = "Tatabahasa" | "Peribahasa" | "Penulisan";

const DEFAULT_CATEGORIES = ["Tatabahasa", "Peribahasa"] as const;
const FORM_1_CATEGORIES = ["Tatabahasa", "Peribahasa", "Penulisan"] as const;

export function getBahasaMelayuMindMapCategories(
  form: Form,
): readonly BahasaMelayuMindMapCategory[] {
  return form === "Form 1" ? FORM_1_CATEGORIES : DEFAULT_CATEGORIES;
}
