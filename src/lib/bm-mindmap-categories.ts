import type { Form } from "@/data/subjects-meta";

export type BahasaMelayuMindMapCategory = "Tatabahasa" | "Peribahasa" | "Penulisan" | "Pemahaman";

const COMPLETE_CATEGORIES = ["Tatabahasa", "Peribahasa", "Penulisan", "Pemahaman"] as const;

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
  _form: Form,
): readonly BahasaMelayuMindMapCategory[] {
  return COMPLETE_CATEGORIES;
}
