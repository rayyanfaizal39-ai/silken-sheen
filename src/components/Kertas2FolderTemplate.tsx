import { useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Brain, PenLine, Star } from "lucide-react";
import { ExamSkillLanding, MissionPageShell, type MissionDefinition } from "@/components/exam-skill/MissionLearning";

export interface Kertas2FolderItem {
  id: string;
  title: string;
  description?: string;
  badge?: string;
}

export interface Kertas2HubItem { id: string; label: string; description: string; icon: ReactNode; color: string; count: string }

export function Kertas2HubGrid({ hubs, onSelect }: { hubs: Kertas2HubItem[]; onSelect: (hubId: string) => void }) {
  return <div><div className="mb-6"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300">Kertas 2</p><h1 className="mt-1 font-display text-2xl font-black text-white sm:text-3xl">Penulisan Bahasa Melayu</h1><p className="mt-2 text-sm leading-6 text-white/50">Pilih satu hub untuk meneruskan pembelajaran.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">{hubs.map(hub => <button key={hub.id} type="button" onClick={() => onSelect(hub.id)} className="group relative flex min-h-52 flex-col overflow-hidden rounded-[1.5rem] border p-5 text-left transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:translate-y-0 motion-reduce:transition-none lg:col-span-2" style={{ borderColor: `${hub.color}40`, background: `linear-gradient(135deg, ${hub.color}12 0%, transparent 80%)` }}><span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 40px ${hub.color}14, 0 8px 32px ${hub.color}28` }} /><span className="relative flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: `${hub.color}20`, color: hub.color }}>{hub.icon}</span><span className="relative mt-4 font-bold text-white">{hub.label}</span><span className="relative mt-2 flex-1 text-xs leading-6 text-white/45">{hub.description}</span><span className="relative mt-5 flex items-center justify-between"><span className="rounded-full px-2 py-1 text-[10px] font-bold" style={{ background: `${hub.color}18`, color: hub.color }}>{hub.count}</span><ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" style={{ color: hub.color }} /></span></button>)}</div></div>;
}

const FOLDERS: MissionDefinition[] = [
  { number: "01", kindLabel: "Folder", title: "Asas & Formula", description: "Fahami format, struktur dan formula penting.", icon: Star, color: "#FBBF24" },
  { number: "02", kindLabel: "Folder", title: "Teknik Menjawab", description: "Pelajari langkah dan teknik menjawab dengan teratur.", icon: PenLine, color: "#60A5FA" },
  { number: "03", kindLabel: "Folder", title: "Contoh & Latihan", description: "Kukuhkan penguasaan melalui contoh dan latihan.", icon: Brain, color: "#C084FC" },
];

export function splitIntoKertas2Folders(items: Kertas2FolderItem[]): Kertas2FolderItem[][] {
  if (items.length <= 1) return FOLDERS.map(() => items);
  const groups: Kertas2FolderItem[][] = [[], [], []];
  items.forEach((item, index) => groups[Math.min(2, Math.floor(index * 3 / items.length))].push(item));
  return groups.map((group, index) => group.length ? group : [items[Math.min(index, items.length - 1)]]);
}

export function Kertas2FolderTemplate({ title, subtitle, groups, onSelectItem, footer }: { title: string; subtitle: string; groups: Kertas2FolderItem[][]; onSelectItem: (itemId: string) => void; footer?: ReactNode }) {
  const [activeFolder, setActiveFolder] = useState<number | null>(null);
  if (activeFolder === null) return <ExamSkillLanding title={title} subtitle={subtitle} missions={FOLDERS} onSelect={setActiveFolder} />;
  const folder = FOLDERS[activeFolder];
  const items = groups[activeFolder] ?? [];
  return <MissionPageShell mission={folder} onBack={() => setActiveFolder(null)}>
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => <button key={`${item.id}-${index}`} type="button" onClick={() => onSelectItem(item.id)} className="group flex min-h-28 items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-left transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:translate-y-0 motion-reduce:transition-none"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black" style={{ color: folder.color, background: `${folder.color}16` }}>{String(index + 1).padStart(2, "0")}</span><span className="min-w-0 flex-1"><span className="block font-display text-sm font-bold leading-6 text-white">{item.title}</span>{item.description && <span className="mt-1 line-clamp-2 block text-xs leading-5 text-white/45">{item.description}</span>}{item.badge && <span className="mt-2 inline-flex rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-wide" style={{ color: folder.color, background: `${folder.color}14` }}>{item.badge}</span>}</span><ArrowRight className="h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></button>)}
    </div>
    {footer}
  </MissionPageShell>;
}

export function Kertas2FolderBackButton({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-bold text-white/60 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"><ArrowLeft className="h-4 w-4" />Semua Folder</button>;
}
