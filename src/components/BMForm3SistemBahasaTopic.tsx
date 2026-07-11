import { useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import source from "@/data/bm-form3-sistem-bahasa-source.md?raw";
import { BM_FORM3_SISTEM_BAHASA_TOPICS, type TopicSlug } from "@/data/bm-form3-sistem-bahasa";

type ParsedTopic = { title: string; body: string };

const TOPIC_ORDER = BM_FORM3_SISTEM_BAHASA_TOPICS.map((t) => t.slug);

function parseTopics(md: string): Record<TopicSlug, ParsedTopic> {
  const blocks = md.split(/^#\s+\d+\s+/m).slice(1);
  const map = {} as Record<TopicSlug, ParsedTopic>;
  blocks.forEach((block, idx) => {
    const title = block.split("\n", 1)[0].trim();
    const slug = TOPIC_ORDER[idx];
    if (!slug) return;
    map[slug] = { title, body: block.split("\n").slice(1).join("\n").trim() };
  });
  return map;
}

const parsedTopics = parseTopics(source);

function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-bold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function renderParagraph(text: string) {
  return <p className="text-sm leading-7 text-white/75">{renderInline(text)}</p>;
}

function renderList(lines: string[]) {
  return (
    <ul className="space-y-2">
      {lines.map((line, i) => (
        <li key={i} className="flex items-start gap-2 text-sm leading-7 text-white/75">
          <span className="mt-0.5 text-white/35">•</span>
          <span>{renderInline(line.replace(/^•\s*/, ""))}</span>
        </li>
      ))}
    </ul>
  );
}

function renderMarkdown(md: string) {
  const lines = md.split(/\r?\n/);
  const nodes: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trimEnd();
    if (!line) {
      i += 1;
      continue;
    }
    if (line.startsWith("# ")) {
      i += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      nodes.push(
        <h2 key={`h2-${i}`} className="mt-2 text-xl font-bold text-white">
          {renderInline(line.replace(/^##\s+/, ""))}
        </h2>,
      );
      i += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      nodes.push(
        <h3 key={`h3-${i}`} className="mt-5 text-base font-bold text-white">
          {renderInline(line.replace(/^###\s+/, "").replace(/^\*\*(.*)\*\*$/, "$1"))}
        </h3>,
      );
      i += 1;
      continue;
    }
    if (/^• /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^• /.test(lines[i].trim())) {
        items.push(lines[i].trim());
        i += 1;
      }
      nodes.push(<div key={`ul-${i}`}>{renderList(items)}</div>);
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i += 1;
      }
      nodes.push(
        <ol key={`ol-${i}`} className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm leading-7 text-white/75">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[10px] font-black text-white/50">
                {index + 1}
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>,
      );
      continue;
    }
    nodes.push(<div key={`p-${i}`}>{renderParagraph(line)}</div>);
    i += 1;
  }
  return nodes;
}

function Card({ title, children, color = "#60A5FA" }: { title: string; children: React.ReactNode; color?: string }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
      <div className="px-5 py-4">
        <h3 className="text-base font-bold text-white">{title}</h3>
      </div>
      <div className="border-t border-white/[0.06] p-5" style={{ boxShadow: `inset 0 0 0 1px ${color}08` }}>
        {children}
      </div>
    </section>
  );
}

export function BMForm3SistemBahasaTopic({
  slug,
  title,
  onBack,
  onPrevious,
  onNext,
}: {
  slug: TopicSlug;
  title: string;
  onBack: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const topic = parsedTopics[slug];
  const nodes = useMemo(() => (topic ? renderMarkdown(topic.body) : []), [topic]);

  if (!topic) return null;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="mb-1 inline-flex items-center gap-2 text-[11px] font-bold text-white/40 transition-colors hover:text-white/70">
        <ChevronLeft className="h-3.5 w-3.5" /> Kembali ke Sistem Bahasa
      </button>
      <section className="rounded-[1.75rem] border border-[#60A5FA]/30 bg-[#0d1326] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#60A5FA]/30 bg-[#60A5FA]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#60A5FA]">Sistem Bahasa Tingkatan 3</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">UASA Focused</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">⏱ 8-10 min</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-sm leading-7 text-white/60">Belajar secara fokus melalui struktur yang konsisten, ringkas dan mesra UASA.</p>
      </section>

      <div className="space-y-4">{nodes}</div>

      <Card title="✅ Checklist Penguasaan">
        <div className="grid gap-2 sm:grid-cols-2">
          {["Faham isi topik", "Boleh jawab soalan UASA", "Boleh bezakan konsep", "Boleh kenal pasti contoh"].map((item) => (
            <button
              key={item}
              type="button"
              role="checkbox"
              aria-checked={!!checked[item]}
              onClick={() => setChecked((prev) => ({ ...prev, [item]: !prev[item] }))}
              className="flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors"
              style={{ borderColor: checked[item] ? "rgba(52,211,153,.35)" : "rgba(255,255,255,.08)", background: checked[item] ? "rgba(52,211,153,.09)" : "rgba(255,255,255,.025)" }}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border" style={{ borderColor: checked[item] ? "#34D399" : "rgba(255,255,255,.16)", background: checked[item] ? "#34D399" : "transparent", color: checked[item] ? "#07140f" : "transparent" }}>✓</span>
              <span className="text-sm font-semibold text-white/70">{item}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button onClick={onBack} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/[0.09]">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Sistem Bahasa
        </button>
        <div className="flex flex-col gap-3 sm:flex-row">
          {onPrevious ? (
            <button onClick={onPrevious} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-white/[0.09]">
              <ArrowLeft className="h-4 w-4" /> Topik Sebelumnya
            </button>
          ) : null}
          {onNext ? (
            <button onClick={onNext} className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, #60A5FA, #60A5FAbb)" }}>
              Topik Seterusnya <ArrowRight className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
