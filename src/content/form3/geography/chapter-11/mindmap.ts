import type { MindNode } from "@/components/MindMap";

export const geoF3C11MindMap: MindNode = {
  id: "root",
  label: "Kitar Semula",
  children: [
    { id: "r3", label: "Amalan 3R", children: [
      { id: "r3-1", label: "Reduce • kurangkan penggunaan dan sisa" },
      { id: "r3-2", label: "Reuse • guna semula barangan" },
      { id: "r3-3", label: "Recycle • proses semula bahan" },
    ]},
    { id: "penting", label: "Kepentingan", children: [
      { id: "penting-1", label: "Kurangkan pencemaran • sisa tapak pelupusan" },
      { id: "penting-2", label: "Jimat sumber • tenaga • kos" },
      { id: "penting-3", label: "Pendapatan • persekitaran lebih bersih" },
    ]},
    { id: "malaysia", label: "Amalan di Malaysia", children: [
      { id: "malaysia-1", label: "Pengasingan sisa di punca" },
      { id: "malaysia-2", label: "Hari Tanpa Beg Plastik • Hari Kitar Semula" },
      { id: "malaysia-3", label: "SWCorp • pendidikan dan kempen" },
    ]},
    { id: "dunia", label: "Amalan Negara Lain", children: [
      { id: "dunia-1", label: "Jerman • sistem deposit • Green Dot" },
      { id: "dunia-2", label: "Denmark • Waste 21 • cukai hijau" },
      { id: "dunia-3", label: "Sweden • tenaga daripada sisa" },
      { id: "dunia-4", label: "Taiwan • Program 4-Dalam-1 • iTrash" },
    ]},
  ],
};
