import { useState } from "react";
import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { Arrow, Diagram, panel, type Lang } from "./Chapter4Pass1Shared";

// Presentation only: all phase ranges and scientific descriptions come from content.
const labels = {
  en: {
    model: "Textbook model",
    ovulation: "Ovulation",
    day: "Day 14",
    control: ["Brain + endocrine system", "Hormones", "Menstrual cycle"],
    hygiene: "Personal hygiene",
    irregular: "Irregular menstruation",
    causes: "Possible causes",
    effects: "Possible effects",
    next: "If fertilisation does not occur → next menstruation",
  },
  bm: {
    model: "Model buku teks",
    ovulation: "Pengovulan",
    day: "Hari ke-14",
    control: ["Otak + sistem endokrin", "Hormon", "Kitar haid"],
    hygiene: "Kebersihan diri",
    irregular: "Haid tidak teratur",
    causes: "Punca yang mungkin",
    effects: "Kesan yang mungkin",
    next: "Jika persenyawaan tidak berlaku → haid seterusnya",
  },
};
const colours = ["#fb7185", "#67e8f9", "#fbbf24", "#c084fc"];
export function UterinePhase({ phase, label }: { phase: number; label: string }) {
  return (
    <Diagram label={label} kind="uterine-phase" viewBox="0 65 360 265">
      <g data-uterus-geometry="shared-female-anatomy">
        <path
          d="M142 114 Q180 90 218 114 Q225 157 198 197 L193 225 H167 L162 197 Q135 155 142 114Z"
          fill="#9f4268"
          stroke="#f9a8d4"
          strokeWidth="3"
        />
        <path
          d="M148 124 C131 80 70 85 62 131 M212 124 C229 80 290 85 298 131"
          stroke="#f9a8d4"
          strokeWidth="7"
        />
        <path
          d="M62 128 L51 141 M62 128 L60 145 M62 128 L71 141 M298 128 L289 141 M298 128 L300 145 M298 128 L310 141"
          stroke="#f9a8d4"
          strokeWidth="3"
        />
        <ellipse cx="80" cy="154" rx="22" ry="14" fill="#fbbf24" />
        <ellipse cx="280" cy="154" rx="22" ry="14" fill="#fbbf24" />
        <path d="M164 238 L161 309 Q180 324 199 309 L196 238Z" fill="#824062" />
        <path d="M167 215 H193 V244 Q180 252 167 244Z" fill="#f9a8d4" />
      </g>
      <path
        data-lining-state={phase}
        d="M158 122 Q180 113 202 122 L184 182 V215 H176 V182Z"
        fill="#401f38"
        stroke={colours[phase]}
        strokeWidth={[2, 5, 9, 13][phase]}
        strokeDasharray={phase === 0 ? "5 7" : undefined}
      />
      {phase > 0 && (
        <path
          data-blood-vessels="true"
          d="M150 127 L155 149 L164 159 M155 149 L148 151 M210 128 L205 150 L197 160 M205 150 L212 154"
          stroke="#fb7185"
          strokeWidth={phase + 1}
        />
      )}
      {phase === 0 && (
        <g data-discharge="blood-mucus-unfertilised-ovum" fill="#fb7185">
          <path d="M171 200 l-3 8 h6Z M186 258 l-3 8 h6Z M173 292 l-3 8 h6Z" />
          <circle cx="183" cy="279" r="4" />
          <Arrow d="M180 224 V255" color="#fb7185" />
        </g>
      )}
      {phase === 2 && (
        <g data-ovulation-route="ovary-to-fallopian-tube">
          <circle cx="60" cy="148" r="6" fill="#fef3c7" />
          <Arrow d="M51 150 Q38 104 88 99" color="#fbbf24" />
        </g>
      )}
    </Diagram>
  );
}
export function Chapter4MenstrualCycle({
  content,
  lang,
}: {
  content: Chapter4Content;
  lang: Lang;
}) {
  const [selected, setSelected] = useState(0);
  const source = content.menstrualCycle;
  const c = labels[lang];
  const phase = source.phases[selected];
  return (
    <div className="space-y-4" data-pass2="menstrual-cycle">
      <p className="text-sm leading-6 text-slate-300">{source.definition}</p>
      <div className={panel}>
        <p className="font-bold text-amber-200">{source.averageLength}</p>
        <p className="mt-1 text-xs text-slate-300">
          {c.model} · {c.day} — {c.ovulation}
        </p>
        <div className="grid items-center gap-4 md:grid-cols-2">
          <Diagram
            label={`${c.model}: ${source.averageLength}`}
            kind="menstrual-cycle"
            viewBox="0 0 360 340"
          >
            {Array.from({ length: 28 }, (_, i) => {
              const day = i + 1;
              const index = source.phases.findIndex((p) => {
                const [start, end] = p.days.match(/\d+/g)!.map(Number);
                return day >= start && day <= end;
              });
              const angle = (i / 28) * Math.PI * 2 - Math.PI / 2;
              const x = 180 + Math.cos(angle) * 133,
                y = 170 + Math.sin(angle) * 133;
              return (
                <g key={day} data-cycle-day={day} data-phase-index={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r="13"
                    fill={colours[index]}
                    opacity={index === selected || day === 14 ? 1 : 0.4}
                    stroke={day === 14 ? "#fff" : "none"}
                    strokeWidth="3"
                  />
                  <text
                    x={x}
                    y={y + 4}
                    fill="#fff"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {day}
                  </text>
                </g>
              );
            })}
            <text x="180" y="150" textAnchor="middle" fill="#fff" fontSize="32" fontWeight="bold">
              28
            </text>
            <text x="180" y="177" textAnchor="middle" fill="#cbd5e1" fontSize="14">
              {c.model}
            </text>
            <text x="180" y="210" textAnchor="middle" fill="#fbbf24" fontSize="15">
              {c.day}
            </text>
            <text x="180" y="233" textAnchor="middle" fill="#fbbf24" fontSize="15">
              {c.ovulation}
            </text>
            <Arrow d="M194 242 L207 283" color="#fbbf24" />
          </Diagram>
          <div>
            <UterinePhase phase={selected} label={phase.name} />
            <p className="text-center text-sm font-bold" style={{ color: colours[selected] }}>
              {phase.name}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4" aria-label={c.model}>
          {source.phases.map((p, i) => (
            <button
              key={p.days}
              type="button"
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
              className="min-h-14 rounded-xl border p-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
              style={{
                borderColor: colours[i],
                background: selected === i ? `${colours[i]}25` : "transparent",
              }}
            >
              <span className="block font-bold" style={{ color: colours[i] }}>
                {p.days}
              </span>
              {p.name}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="mt-4 text-sm leading-6 text-slate-200">
          {phase.description}
        </p>
        <p className="mt-3 text-xs text-slate-400">{c.next}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <figure className={panel}>
          <figcaption className="font-bold text-amber-200">{c.ovulation}</figcaption>
          <Diagram label={c.ovulation} kind="ovulation" viewBox="0 0 360 135">
            <ellipse cx="46" cy="80" rx="30" ry="20" fill="#fbbf24" />
            <circle cx="133" cy="80" r="9" fill="#fef3c7" />
            <Arrow d="M81 80 H113" />
            <Arrow d="M153 80 H204" />
            <path
              d="M224 99 Q230 43 330 58 M238 104 Q245 63 331 72"
              stroke="#f9a8d4"
              strokeWidth="7"
            />
            <text x="46" y="122" textAnchor="middle" fill="#fff" fontSize="13">
              1
            </text>
            <text x="133" y="122" textAnchor="middle" fill="#fff" fontSize="13">
              2
            </text>
            <text x="285" y="122" textAnchor="middle" fill="#fff" fontSize="13">
              3
            </text>
          </Diagram>
          <p className="text-xs leading-6 text-slate-300">
            1 {content.humanReproductiveSystem.femaleParts[1].part} → 2 Ovum → 3{" "}
            {content.humanReproductiveSystem.femaleParts[0].part}
          </p>
        </figure>
        <div className={panel}>
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-cyan-200">
            {c.control.map((text, i) => (
              <span key={text}>
                {i > 0 && <span aria-hidden="true">→ </span>}
                {text}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-300">{source.controlledBy}</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
            {source.affectingFactors.map((f) => (
              <li key={f} className="rounded-lg bg-white/5 p-2">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[c.hygiene, c.irregular].map((heading, index) => (
          <div className={panel} key={String(heading)}>
            <h3 className="font-bold text-white">{heading}</h3>
            {index === 0 ? (
              <SourceList items={source.hygieneImportance} />
            ) : (
              <>
                <p className="mt-3 text-sm text-amber-200">{c.causes}</p>
                <SourceList items={source.irregularMenstruation.causes} />
                <p className="mt-3 text-sm text-rose-200">{c.effects}</p>
                <SourceList items={source.irregularMenstruation.effects} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
function SourceList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
      {items.map((item) => (
        <li className="flex gap-2" key={item}>
          <span aria-hidden="true" className="text-cyan-300">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
