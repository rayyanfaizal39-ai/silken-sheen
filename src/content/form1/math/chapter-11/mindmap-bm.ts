import type { MindNode } from "@/components/MindMap";

export const mathF1C11MindMapBM: MindNode = {
  id: "math-c11-bm-root",
  label: "Pengenalan Set",
  children: [
    {
      id: "math-c11-bm-1",
      label: "Asas Set",
      children: [
        { id: "math-c11-bm-1-1", label: "Set: koleksi objek yang taktif / terdefinisi dengan jelas" },
        { id: "math-c11-bm-1-2", label: "Ahli/Elemen: objek dalam set (∈)" },
        { id: "math-c11-bm-1-3", label: "Bukan ahli: tidak berada dalam set (∉)" },
        { id: "math-c11-bm-1-4", label: "Set semesta: semua ahli yang berkaitan (ξ)" },
      ],
    },
    {
      id: "math-c11-bm-2",
      label: "Penulisan Set",
      children: [
        { id: "math-c11-bm-2-1", label: "Senarai: A = {1, 2, 3, 4}" },
        { id: "math-c11-bm-2-2", label: "Perwakilan: A = {x : x ialah integer antara 1 dan 5}" },
        { id: "math-c11-bm-2-3", label: "Huruf besar untuk set, huruf kecil untuk elemen" },
      ],
    },
    {
      id: "math-c11-bm-3",
      label: "Jenis Set",
      children: [
        { id: "math-c11-bm-3-1", label: "Set kosong: {} atau ∅ (tiada elemen)" },
        { id: "math-c11-bm-3-2", label: "Set terhingga: bilangan elemen boleh dikira" },
        { id: "math-c11-bm-3-3", label: "Set tidak terhingga: bilangan elemen tidak terbatas" },
        { id: "math-c11-bm-3-4", label: "Subset: A ⊂ B (semua elemen A dalam B)" },
        { id: "math-c11-bm-3-5", label: "Set sama: A = B (elemen sama)" },
      ],
    },
    {
      id: "math-c11-bm-4",
      label: "Operasi Set",
      children: [
        {
          id: "math-c11-bm-4-1",
          label: "Kesatuan (∪)",
          children: [
            { id: "math-c11-bm-4-1-1", label: "Semua elemen dalam A atau B" },
            { id: "math-c11-bm-4-1-2", label: "A ∪ B = {semua elemen dalam A dan B tanpa ulangan}" },
          ],
        },
        {
          id: "math-c11-bm-4-2",
          label: "Persilangan (∩)",
          children: [
            { id: "math-c11-bm-4-2-1", label: "Elemen yang ada dalam kedua-dua A dan B" },
            { id: "math-c11-bm-4-2-2", label: "A ∩ B = {elemen sepunya}" },
          ],
        },
        {
          id: "math-c11-bm-4-3",
          label: "Pelengkap (A')",
          children: [
            { id: "math-c11-bm-4-3-1", label: "Elemen dalam ξ tetapi BUKAN dalam A" },
          ],
        },
      ],
    },
    {
      id: "math-c11-bm-5",
      label: "Gambar Rajah Venn",
      children: [
        { id: "math-c11-bm-5-1", label: "Segi empat tepat = set semesta (ξ)" },
        { id: "math-c11-bm-5-2", label: "Bulatan = set" },
        { id: "math-c11-bm-5-3", label: "Kawasan bertindih = persilangan" },
        { id: "math-c11-bm-5-4", label: "Lukis & lorekkan kawasan yang ditanya" },
      ],
    },
  ],
};
