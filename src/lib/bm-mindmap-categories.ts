import type { Form } from "@/data/subjects-meta";

export type BahasaMelayuMindMapCategory =
  | "Tatabahasa"
  | "Peribahasa"
  | "Penulisan"
  | "Pemahaman"
  | "KOMSAS";

const COMPLETE_CATEGORIES = ["Tatabahasa", "Peribahasa", "Penulisan", "Pemahaman"] as const;

export const BAHASA_MELAYU_CATEGORY_DETAILS: Partial<
  Record<BahasaMelayuMindMapCategory, { description: string; badge: string }>
> = {
  Pemahaman: {
    description:
      "Kemahiran memahami, menganalisis dan menjawab soalan berdasarkan petikan dengan tepat.",
    badge: "READY",
  },
  KOMSAS: {
    description:
      "Memahami karya sastera melalui tema, persoalan, watak, nilai, pengajaran, gaya bahasa dan bukti daripada teks.",
    badge: "READY",
  },
};

export function getBahasaMelayuMindMapCategories(
  form: Form,
): readonly BahasaMelayuMindMapCategory[] {
  return form === "Form 1" || form === "Form 2"
    ? [...COMPLETE_CATEGORIES, "KOMSAS"]
    : COMPLETE_CATEGORIES;
}
