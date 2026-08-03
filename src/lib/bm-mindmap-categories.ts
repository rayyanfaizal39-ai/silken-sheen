import type { Form } from "@/data/subjects-meta";

export type BahasaMelayuMindMapCategory = "Tatabahasa" | "Peribahasa" | "Penulisan" | "Pemahaman";

const DEFAULT_CATEGORIES = ["Tatabahasa", "Peribahasa"] as const;
const WRITING_CATEGORIES = ["Tatabahasa", "Peribahasa", "Penulisan"] as const;
const FORM_1_CATEGORIES = ["Tatabahasa", "Peribahasa", "Penulisan", "Pemahaman"] as const;

export const BAHASA_MELAYU_CATEGORY_DETAILS: Partial<
  Record<BahasaMelayuMindMapCategory, { description: string; badge: string }>
> = {
  Pemahaman: {
    description:
      "Kemahiran memahami, menganalisis dan menjawab soalan berdasarkan petikan dengan tepat.",
    badge: "READY",
  },
};

export function getBahasaMelayuMindMapCategories(
  form: Form,
): readonly BahasaMelayuMindMapCategory[] {
  if (form === "Form 1") return FORM_1_CATEGORIES;
  return form === "Form 2" || form === "Form 3" ? WRITING_CATEGORIES : DEFAULT_CATEGORIES;
}
