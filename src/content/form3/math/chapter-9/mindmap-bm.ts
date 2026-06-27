import type { MindNode } from "@/components/MindMap";

export const mathF3C9MindMapBM: MindNode = {
  id: "f3c9",
  label: "Garis Lurus",
  children: [
    {
      id: "f3c9-1",
      label: "Persamaan y=mx+c",
      children: [
        { id: "f3c9-1-1", label: "m = kecerunan, c = pintasan-y" },
        { id: "f3c9-1-2", label: "y=h selari paksi-x (m=0)" },
        { id: "f3c9-1-3", label: "x=h selari paksi-y (m tak tertakrif)" },
      ],
    },
    {
      id: "f3c9-2",
      label: "Bentuk Lain",
      children: [
        { id: "f3c9-2-1", label: "ax+by=c" },
        { id: "f3c9-2-2", label: "x/a+y/b=1: a=pintasan-x, b=pintasan-y" },
        { id: "f3c9-2-3", label: "Tukar antara bentuk dengan algebra" },
      ],
    },
    {
      id: "f3c9-3",
      label: "Titik dan Garis Selari",
      children: [
        { id: "f3c9-3-1", label: "Titik pada garis: gantikan, semak kiri=kanan" },
        { id: "f3c9-3-2", label: "Garis selari: kecerunan sama" },
      ],
    },
    {
      id: "f3c9-4",
      label: "Persamaan Garis dan Persilangan",
      children: [
        { id: "f3c9-4-1", label: "m + 1 titik -> cari c" },
        { id: "f3c9-4-2", label: "2 titik -> cari m=(y2-y1)/(x2-x1) dahulu" },
        { id: "f3c9-4-3", label: "Persilangan: persamaan serentak (penggantian/penghapusan)" },
      ],
    },
  ],
};
