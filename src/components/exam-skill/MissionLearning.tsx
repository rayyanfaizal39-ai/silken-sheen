import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronDown, Play, Star, Trophy, XCircle, Zap } from "lucide-react";
import { useState, type ReactNode } from "react";

export interface MissionDefinition {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  kindLabel?: string;
}

export function ExamSkillLanding({ title, subtitle, missions, onSelect }: { title: string; subtitle: string; missions: MissionDefinition[]; onSelect: (index: number) => void }) {
  const unitLabel = missions[0]?.kindLabel?.toLowerCase() ?? "misi";
  return <div><section className="relative mb-7 overflow-hidden rounded-[2rem] border border-indigo-300/20 bg-[#101126] p-5 sm:p-8"><div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(129,140,248,0.2),transparent_45%),radial-gradient(circle_at_8%_100%,rgba(192,132,252,0.1),transparent_40%)]" /><div className="relative"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Mission Learning</p><h1 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">{subtitle}</p><div className="mt-5 flex items-center gap-2 text-xs font-bold text-white/40"><span className="h-2 w-2 rounded-full bg-emerald-400" />3 {unitLabel} untuk dikuasai</div></div></section><div className="grid gap-4 lg:grid-cols-3">{missions.map((mission, index) => <MissionCard key={mission.number} mission={mission} onSelect={() => onSelect(index)} />)}</div></div>;
}

export function MissionCard({ mission, onSelect }: { mission: MissionDefinition; onSelect: () => void }) {
  const Icon = mission.icon;
  return <button type="button" onClick={onSelect} className="group relative min-h-64 overflow-hidden rounded-[1.75rem] border p-5 text-left transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:translate-y-0 motion-reduce:transition-none" style={{ borderColor: `${mission.color}35`, background: `linear-gradient(145deg, ${mission.color}1c, ${mission.color}08 55%, rgba(8,12,26,.88))`, boxShadow: `0 14px 38px ${mission.color}0c` }}><span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none" style={{ boxShadow: `inset 0 0 60px ${mission.color}16, 0 18px 48px ${mission.color}22` }} /><span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border" style={{ color: mission.color, borderColor: `${mission.color}30`, background: `${mission.color}16` }}><Icon className="h-7 w-7" /></span><span className="relative mt-5 block text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: mission.color }}>{mission.kindLabel ?? "Mission"} {mission.number}</span><span className="relative mt-2 block font-display text-lg font-bold text-white">{mission.title}</span><span className="relative mt-2 block text-xs leading-6 text-white/50">{mission.description}</span><span className="relative mt-5 flex items-center justify-between text-xs font-bold" style={{ color: mission.color }}>Mulakan {mission.kindLabel?.toLowerCase() ?? "misi"} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" /></span></button>;
}

export function MissionPageShell({ mission, onBack, children }: { mission: MissionDefinition; onBack: () => void; children: ReactNode }) {
  const Icon = mission.icon;
  return <div><button type="button" onClick={onBack} className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 text-xs font-bold text-white/60 transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"><ArrowLeft className="h-4 w-4" />Semua {mission.kindLabel ? `${mission.kindLabel}` : "Misi"}</button><section className="mb-7 rounded-[1.75rem] border p-5 sm:p-7" style={{ borderColor: `${mission.color}32`, background: `linear-gradient(145deg, ${mission.color}18, rgba(10,13,28,.84))` }}><div className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ color: mission.color, background: `${mission.color}16` }}><Icon className="h-6 w-6" /></span><div><p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: mission.color }}>{mission.kindLabel ?? "Mission"} {mission.number}</p><h1 className="mt-1 font-display text-2xl font-black text-white">{mission.title}</h1><p className="mt-2 text-sm leading-6 text-white/55">{mission.description}</p></div></div></section><div className="space-y-6">{children}</div></div>;
}

export function MissionSection({ title, color, children }: { title: string; color: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]"><button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex min-h-16 w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/30"><span className="font-display text-base font-bold text-white">{title}</span><ChevronDown className="h-4 w-4 transition-transform duration-300 motion-reduce:transition-none" style={{ color, transform: open ? "rotate(180deg)" : undefined }} /></button><div className="grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}><div className="overflow-hidden"><div className="border-t border-white/[0.06] p-5">{children}</div></div></div></section>;
}

// Always-open variant of MissionSection — same header look, no collapse.
// Used for "topic"-style pages that read as one continuous scroll (matching
// BMWorldPage's per-topic detail pages) rather than an accordion of modules.
export function MissionSectionStatic({ title, color, children }: { title: string; color: string; children: ReactNode }) {
  return <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]"><div className="flex min-h-16 w-full items-center gap-3 px-5 py-4"><span className="font-display text-base font-bold text-white">{title}</span></div><div className="border-t border-white/[0.06] p-5">{children}</div></section>;
}

// Eyebrow + trophy-badge hero card for a mission's headline "formula" —
// matches the Golden Standard presentation used by Form 1's bespoke topic
// pages (e.g. Rangka Ringkasan), generalised so any subject/form can reuse
// it with its own real title/description/tags instead of duplicating markup.
export function GoldenStandardHero({ eyebrow = "Golden Standard", title, description, tags }: { eyebrow?: string; title: string; description: string; tags: Array<{ label: string; color?: string }> }) {
  return <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/20 bg-[#15130d] p-5 sm:p-7"><div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(251,191,36,0.16),transparent_45%),radial-gradient(circle_at_8%_100%,rgba(129,140,248,0.1),transparent_42%)]" /><div className="relative"><div className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/[0.1] text-amber-300"><Trophy className="h-6 w-6" /></span><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">{eyebrow}</p><h2 className="mt-1 font-display text-2xl font-black text-white">{title}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-white/60">{description}</p></div></div><div className="mt-5 flex flex-wrap gap-2">{tags.map(tag => <span key={tag.label} className="inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-[10px] font-black" style={{ color: tag.color ?? "#FBBF24", borderColor: `${tag.color ?? "#FBBF24"}35`, background: `${tag.color ?? "#FBBF24"}12` }}>{tag.label}</span>)}</div></div></section>;
}

// Decorative Nota/Kuiz/Kad Imbas tool row — matches Form 1's TopicView study
// tools row exactly (inert buttons, no wiring there either).
export function TopicToolsRow({ accent }: { accent: string }) {
  const tools: Array<{ icon: LucideIcon; label: string; color: string }> = [
    { icon: BookOpen, label: "Nota", color: accent },
    { icon: Zap, label: "Kuiz", color: "#FBBF24" },
    { icon: Star, label: "Kad Imbas", color: "#34D399" },
  ];
  return <div className="mb-6 flex flex-wrap gap-2">{tools.map(tool => { const Icon = tool.icon; return <button key={tool.label} type="button" className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-white/50 transition-all hover:bg-white/[0.07]"><span style={{ color: tool.color }}><Icon className="h-3.5 w-3.5" /></span>{tool.label}</button>; })}</div>;
}

// Collapsible folder with a description + indented left-border content area —
// matches Form 1's LearningFolder/CollapsibleSection exactly, generalised so
// it's not tied to any one subject's topic-detail pages.
export function CollapsibleFolder({ icon, title, description, accent, defaultOpen = false, children }: { icon?: ReactNode; title: string; description?: string; accent: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:border-white/[0.16]" style={open ? { borderColor: `${accent}40`, boxShadow: `0 0 28px ${accent}14` } : undefined}>
    <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]">
      <span className="flex flex-wrap items-center gap-2.5">{icon && <span className="shrink-0" style={{ color: accent }}>{icon}</span>}<span className="font-display text-sm font-bold text-white/90 sm:text-base">{title}</span></span>
      <ChevronDown className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-300" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
    </button>
    <div className="grid transition-all duration-300 ease-in-out" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
      <div className="overflow-hidden"><div className="px-5 pb-5 pt-1">
        {description && <p className="mb-4 text-xs leading-5 text-white/45">{description}</p>}
        <div className="space-y-3 border-l border-white/10 pl-3 sm:pl-4">{children}</div>
      </div></div>
    </div>
  </section>;
}

// Numbered step box — matches Form 1's RingkasanDetail "Formula / Langkah"
// numbered rows exactly.
export function NumberedStep({ index, text, color }: { index: number; text: string; color: string }) {
  return <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>{index + 1}</span>
    <p className="text-sm text-white/70">{text}</p>
  </div>;
}

// Tabbed practice switcher — matches Form 1's RingkasanPremiumDetail exactly:
// intro paragraph + fact chips + a tab row (one per practice item) + a single
// active practice card below, instead of a stacked list of every practice.
export function PracticeTabSwitcher<T extends { title: string }>({
  intro,
  facts,
  practices,
  tabCountLabel,
  color,
  renderPractice,
}: {
  intro: ReactNode;
  facts: Array<{ icon: string; label: string }>;
  practices: T[];
  tabCountLabel: string;
  color: string;
  renderPractice: (practice: T, index: number) => ReactNode;
}) {
  const [active, setActive] = useState(0);
  return <div className="space-y-6">
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">{intro}</div>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {facts.map((f, i) => <div key={i} className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-3"><span className="text-base shrink-0">{f.icon}</span><p className="text-xs font-semibold text-white/85 leading-tight">{f.label}</p></div>)}
    </div>
    <div>
      <p className="mb-3 text-[10px] font-black tracking-wide text-white/40">{tabCountLabel}</p>
      <div className="flex flex-wrap gap-2">
        {practices.map((p, i) => <button key={p.title} onClick={() => setActive(i)} className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${active === i ? "border-transparent text-white shadow-md" : "border-white/[0.08] bg-white/[0.03] text-white/45 hover:text-white/70"}`} style={active === i ? { background: `${color}28`, borderColor: `${color}45`, color } : {}}>
          <span className="hidden sm:inline">{p.title}</span>
          <span className="sm:hidden">{i + 1}</span>
        </button>)}
      </div>
    </div>
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">{renderPractice(practices[active], active)}</div>
  </div>;
}

export function MissionTimeline({ steps }: { steps: Array<{ title: string; detail: string; icon: LucideIcon; color: string }> }) {
  return <div className="mx-auto max-w-2xl space-y-2">{steps.map((step, index) => { const Icon = step.icon; return <div key={step.title}><div className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ color: step.color, background: `${step.color}15` }}><Icon className="h-5 w-5" /></span><div><p className="text-sm font-bold text-white/80">{index + 1}. {step.title}</p><p className="mt-1 text-xs leading-5 text-white/50">{step.detail}</p></div></div>{index < steps.length - 1 && <div className="py-1 text-center text-white/20">↓</div>}</div>; })}</div>;
}

export function WarningCard({ items }: { items: string[] }) { return <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.05] p-5"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-300">Kesalahan Lazim</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{items.map(item => <p key={item} className="flex items-start gap-2 text-sm text-white/65"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />{item}</p>)}</div></div>; }
export function CorrectWrongExample({ wrong, right }: { wrong: string; right: string }) { return <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.05] p-4"><p className="text-[10px] font-black uppercase tracking-widest text-rose-300">Contoh Salah</p><p className="mt-2 text-sm leading-6 text-white/60">{wrong}</p></div><div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.05] p-4"><p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Contoh Betul</p><p className="mt-2 text-sm leading-6 text-white/70">{right}</p></div></div>; }
export function QuickScoreCard({ items }: { items: string[] }) { return <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.045] p-5"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">Skor Pantas</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{items.map(item => <p key={item} className="flex items-start gap-2 text-sm text-white/70"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />{item}</p>)}</div></div>; }
export function FinalChecklist({ items, checked, onToggle }: { items: string[]; checked: boolean[]; onToggle: (index: number) => void }) { return <div className="grid gap-2 sm:grid-cols-2">{items.map((item, index) => <button key={item} type="button" role="checkbox" aria-checked={checked[index]} onClick={() => onToggle(index)} className="flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50" style={{ borderColor: checked[index] ? "rgba(52,211,153,.35)" : "rgba(255,255,255,.08)", background: checked[index] ? "rgba(52,211,153,.09)" : "rgba(255,255,255,.025)" }}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border" style={{ borderColor: checked[index] ? "#34D399" : "rgba(255,255,255,.16)", background: checked[index] ? "#34D399" : "transparent", color: checked[index] ? "#07140f" : "transparent" }}><CheckCircle2 className="h-4 w-4" /></span><span className="text-sm font-semibold text-white/70">{item}</span></button>)}</div>; }
export function QuizCTA({ label = "Mulakan Kuiz", href = "/quizzes" }: { label?: string; href?: string }) { return <a href={href} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-purple-500/15 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"><Play className="h-4 w-4 fill-current" />{label}</a>; }
