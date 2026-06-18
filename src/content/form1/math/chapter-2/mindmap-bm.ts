import type { MindNode } from "@/components/MindMap";

export const mathF1C2MindMapBM: MindNode = {
  id: "math-c2-bm-root",
  label: "Faktor dan Gandaan",
  children: [
    {
      id: "math-c2-bm-1",
      label: "Faktor",
      children: [
        { id: "math-c2-bm-1-1", label: "Faktor: nombor yang membahagi tepat" },
        { id: "math-c2-bm-1-2", label: "Faktor sepunya: faktor yang dikongsi oleh dua nombor atau lebih" },
        {
          id: "math-c2-bm-1-3",
          label: "Faktor Sepunya Terbesar (FSTB / GCF)",
          children: [
            { id: "math-c2-bm-1-3-1", label: "Kaedah senarai faktor" },
            { id: "math-c2-bm-1-3-2", label: "Kaedah pembahagian berulang" },
            { id: "math-c2-bm-1-3-3", label: "Kaedah faktor prima" },
          ],
        },
      ],
    },
    {
      id: "math-c2-bm-2",
      label: "Gandaan",
      children: [
        { id: "math-c2-bm-2-1", label: "Gandaan: hasil darab sesuatu nombor dengan integer" },
        { id: "math-c2-bm-2-2", label: "Gandaan sepunya: gandaan yang dikongsi" },
        {
          id: "math-c2-bm-2-3",
          label: "Gandaan Sepunya Terkecil (GSTK / LCM)",
          children: [
            { id: "math-c2-bm-2-3-1", label: "Kaedah senarai gandaan" },
            { id: "math-c2-bm-2-3-2", label: "Kaedah bahagi berulang" },
            { id: "math-c2-bm-2-3-3", label: "Kaedah faktor prima" },
          ],
        },
      ],
    },
    {
      id: "math-c2-bm-3",
      label: "Nombor Prima",
      children: [
        { id: "math-c2-bm-3-1", label: "Nombor dengan tepat 2 faktor: 1 dan dirinya" },
        { id: "math-c2-bm-3-2", label: "Contoh: 2, 3, 5, 7, 11, 13, ..." },
        { id: "math-c2-bm-3-3", label: "1 bukan nombor prima (hanya 1 faktor)" },
      ],
    },
    {
      id: "math-c2-bm-4",
      label: "Faktor Prima",
      children: [
        { id: "math-c2-bm-4-1", label: "Perwakilan nombor sebagai hasil darab faktor-faktor prima" },
        { id: "math-c2-bm-4-2", label: "Kaedah pokok faktor (tree method)" },
        { id: "math-c2-bm-4-3", label: "Contoh: 12 = 2² × 3" },
      ],
    },
    {
      id: "math-c2-bm-5",
      label: "Aplikasi GSTK dan FSTB",
      children: [
        { id: "math-c2-bm-5-1", label: "FSTB: masalah pembahagian/pengagihan" },
        { id: "math-c2-bm-5-2", label: "GSTK: masalah selang masa / putaran" },
        { id: "math-c2-bm-5-3", label: "Contoh: lampu berkelip, jadual bas" },
      ],
    },
  ],
};
