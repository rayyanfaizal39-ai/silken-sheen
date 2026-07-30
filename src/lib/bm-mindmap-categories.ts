import type { Form } from "@/data/subjects-meta";

export type BahasaMelayuMindMapCategory = "Tatabahasa" | "Peribahasa" | "Penulisan";

const DEFAULT_CATEGORIES = ["Tatabahasa", "Peribahasa"] as const;
const WRITING_CATEGORIES = ["Tatabahasa", "Peribahasa", "Penulisan"] as const;

export function getBahasaMelayuMindMapCategories(
  form: Form,
): readonly BahasaMelayuMindMapCategory[] {
  return form === "Form 1" || form === "Form 2" || form === "Form 3"
    ? WRITING_CATEGORIES
    : DEFAULT_CATEGORIES;
}
