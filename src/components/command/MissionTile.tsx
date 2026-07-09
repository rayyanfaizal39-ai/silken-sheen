import { Link } from "@tanstack/react-router";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  chapters: number;
  gradient: string; // "from-... to-..."
  icon: LucideIcon;
  to: string;
  accent: string; // ring color hex-ish tailwind e.g. cyan-400
}

export function MissionTile({
  title,
  subtitle,
  chapters,
  gradient,
  icon: Icon,
  to,
  accent,
}: Props) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a1327]/70 p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-[0_20px_60px_-20px_rgba(56,189,248,0.4)]"
    >
      <div
        className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} opacity-30 blur-3xl transition-opacity group-hover:opacity-60`}
        aria-hidden
      />
      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
      </div>
      <div className="relative mt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Mission
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
      </div>
      <div className="relative mt-4 flex items-center justify-between text-xs">
        <span className={`text-${accent}`}>{chapters} chapters</span>
        <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-slate-400">
          Form 1 – 3
        </span>
      </div>
    </Link>
  );
}
