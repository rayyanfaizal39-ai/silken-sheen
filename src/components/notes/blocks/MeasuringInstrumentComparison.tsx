import type { ReactNode } from "react";
import type { Chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import { InstrumentVisual } from "./Chapter1Completion";

type Lang = "bm" | "en";
type Tool =
  | "mechanical-balances"
  | "digital-balance"
  | "digital-stopwatch"
  | "laboratory-thermometer"
  | "clinical-digital-thermometers"
  | "digital-ammeter"
  | "measuring-cylinder";
function Text({
  x,
  y,
  children,
  size = 14,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
}) {
  return (
    <text x={x} y={y} fill="currentColor" stroke="none" fontSize={size} fontFamily="sans-serif">
      {children}
    </text>
  );
}

/** Recognition drawings, not instrument-reading exercises. LCD values are explicitly illustrative. */
export function ComparisonInstrumentDrawing({
  tool,
  label,
  lang,
}: {
  tool: Tool;
  label: string;
  lang: Lang;
}) {
  const en = lang === "en";
  return (
    <svg
      data-instrument-visual={tool}
      viewBox="0 0 320 250"
      role="img"
      aria-label={label}
      className="h-full w-full text-slate-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <title>{label}</title>
      {tool === "mechanical-balances" && (
        <>
          <Text x={12} y={24}>
            1
          </Text>
          {/* Two pans suspended from a level lever with a central pivot and pointer. */}
          <path d="M80 102h160l-8 10H88zM156 102V32h8v70M55 40h210M160 32l-8 12h16zM160 44v22m-8-4h16" />
          <path d="M67 40 42 80h50L67 40m0 0v40M237 40l-25 40h50l-25-40m0 0v40M39 80q28 30 56 0M209 80q28 30 56 0" />
          <Text x={12} y={142}>
            2
          </Text>
          {/* Three distinct graduated beams and three movable riders; pointer meets fixed zero. */}
          <path d="M32 218h255l-12 16H44zM145 218v-58M47 169h65l-10 10H57zM80 179v33m-20 0h40M112 169h33M145 153h130M145 172h130M145 191h130M275 153v45l12 5M286 193v20m-6-10h13" />
          {[153, 172, 191].map((y, row) => (
            <g key={y}>
              {Array.from({ length: 12 }, (_, i) => (
                <path key={i} d={`M${151 + i * 10} ${y}v${i % 5 ? 5 : 9}`} />
              ))}
              <rect x={[190, 235, 165][row]} y={y - 5} width="9" height="13" />
            </g>
          ))}
        </>
      )}
      {tool === "digital-balance" && (
        <>
          <path d="m66 55 168 0 26 22H40zM40 77v10h220V77M144 87v19h32V87M55 108h210l22 87H33zM33 195v13h254v-13M48 208v12h24v-12m176 0v12h24v-12" />
          <rect x="80" y="132" width="137" height="39" rx="4" />
          <Text x={96} y={158} size={23}>
            125.4 g
          </Text>
          <rect x="227" y="140" width="22" height="11" rx="3" />
          <rect x="229" y="158" width="22" height="11" rx="3" />
        </>
      )}
      {tool === "digital-stopwatch" && (
        <>
          <path d="m92 59-8-17 32-12 9 21m68 0 9-21 32 12-8 17M130 50V32h60v18" />
          <path d="M105 55h110q35 10 35 48v79q0 39-41 43h-98q-41-4-41-43v-79q0-38 35-48z" />
          <rect x="88" y="103" width="144" height="58" rx="6" />
          <Text x={94} y={140} size={24}>
            00:12.34
          </Text>
          <Text x={117} y={91} size={12}>
            START / STOP
          </Text>
          <rect x="114" y="174" width="92" height="29" rx="8" />
          <Text x={137} y={193} size={12}>
            RESET
          </Text>
          <path d="M144 217q16-12 32 0" />
        </>
      )}
      {tool === "laboratory-thermometer" && (
        <>
          <path d="M129 24q0-10 10-10h18q10 0 10 10v184q0 26-19 26t-19-26z" />
          <path d="M148 31v173" />
          <path d="M148 111v95" strokeWidth="4" className="text-red-300" />
          <ellipse cx="148" cy="215" rx="7" ry="12" className="text-red-300" fill="currentColor" />
          {Array.from({ length: 29 }, (_, i) => (
            <path key={i} d={`M155 ${32 + i * 6}h${i % 5 ? 5 : 10}`} />
          ))}
          <Text x={183} y={40}>
            °C
          </Text>
          <Text x={183} y={105}>
            1°C
          </Text>
          <path d="M177 98h-8m8 6h-8m5-6v6" />
        </>
      )}
      {tool === "clinical-digital-thermometers" && (
        <>
          <Text x={12} y={28}>
            1
          </Text>
          {/* Narrow glass clinical thermometer, with a body-temperature scale and constriction. */}
          <path d="M29 59h251q13 0 13 12t-13 12H29q-15 0-15-12t15-12zM30 71h16l4-4 4 4h216" />
          <path d="M26 71h17m11 0h87" strokeWidth="3" className="text-red-300" />
          {Array.from({ length: 71 }, (_, i) => (
            <path key={i} d={`M${68 + i * 2.8} 61v${i % 10 ? 5 : 10}`} />
          ))}
          {[35, 37, 39, 41, 42].map((n) => (
            <Text key={n} x={60 + (n - 35) * 28} y={103} size={12}>
              {n}
            </Text>
          ))}
          <Text x={273} y={104} size={12}>
            °C
          </Text>
          <Text x={12} y={143}>
            2
          </Text>
          {/* Metal probe and compact electronic body, rather than another glass tube. */}
          <path d="M29 173h61l27-16h148q23 0 23 24t-23 24H117l-27-16H29q-11 0-11-8t11-8zM81 173v16" />
          <rect x="124" y="167" width="105" height="28" rx="3" />
          <Text x={132} y={187} size={20}>
            36.7°C
          </Text>
          <circle cx="256" cy="182" r="9" />
          <path d="M256 175v7m-4-4a6 6 0 1 0 8 0" />
        </>
      )}
      {tool === "digital-ammeter" && (
        <>
          <rect x="42" y="48" width="236" height="160" rx="9" />
          <rect x="63" y="71" width="194" height="69" rx="3" />
          <Text x={88} y={117} size={32}>
            0.34 A
          </Text>
          <circle cx="90" cy="178" r="10" />
          <circle cx="231" cy="178" r="10" />
          <Text x={83} y={161}>
            −
          </Text>
          <Text x={223} y={161}>
            +
          </Text>
          <path d="M84 178h12m140 0h-10m5-5v10" />
        </>
      )}
      {tool === "measuring-cylinder" && (
        <>
          <path d="M119 22h71l-10 14v181h-54V36zM126 217l-30 14v10h114v-10l-30-14" />
          <ellipse cx="154" cy="26" rx="30" ry="4" />
          <path d="M130 116q23 14 46 0v97h-46z" fill="currentColor" opacity=".12" stroke="none" />
          <path d="M130 116q23 14 46 0" className="text-cyan-300" strokeWidth="2.5" />
          {Array.from({ length: 17 }, (_, i) => (
            <path key={i} d={`M${i % 2 ? 171 : 165} ${48 + i * 9}H180`} />
          ))}
          <path d="M155 123h53" strokeDasharray="4 4" />
          <Text x={210} y={128} size={12}>
            {en ? "Meniscus" : "Meniskus"}
          </Text>
        </>
      )}
    </svg>
  );
}

const standardTools = [
  null,
  "mechanical-balances",
  null,
  "laboratory-thermometer",
  null,
  "measuring-cylinder",
] as const;
const higherTools = [
  null,
  "digital-balance",
  "digital-stopwatch",
  "clinical-digital-thermometers",
  "digital-ammeter",
] as const;

/** Uses canonical names/values. The brief authorizes the sample LCD values, not new experimental data. */
export function MeasuringInstrumentComparison({
  index,
  item,
  lang,
  standardLabel,
  higherLabel,
}: {
  index: number;
  item: Chapter1Content["measuringInstruments"]["instruments"][number];
  lang: Lang;
  standardLabel: string;
  higherLabel: string;
}) {
  const en = lang === "en";
  const hasHigher = Boolean(item.higherAccuracyTool);
  const standardHint =
    index === 1
      ? en
        ? "Analogue mechanical reading: observe the balance indication."
        : "Bacaan mekanikal analog: perhatikan penunjuk keseimbangan."
      : index === 3
        ? en
          ? "Smallest readable change: 1°C."
          : "Perubahan terkecil yang boleh dibaca: 1°C."
        : index === 4
          ? en
            ? "Read the needle against the graduated scale."
            : "Baca kedudukan jarum pada skala bersenggat."
          : "";
  const higherHint = [
    en
      ? "1: 0.01 cm = 0.1 mm · 2: 0.001 cm = 0.01 mm. Smaller divisions allow smaller changes in length to be read."
      : "1: 0.01 cm = 0.1 mm · 2: 0.001 cm = 0.01 mm. Senggatan lebih kecil membolehkan perubahan panjang yang lebih kecil dibaca.",
    en
      ? "Numerical digital reading. The textbook describes more accurate and consistent mass readings with a digital electronic balance."
      : "Bacaan angka digital. Buku teks menerangkan bacaan jisim yang lebih jitu dan persis dengan penimbang digital.",
    en
      ? "0.01 s: a smaller time interval than the standard stopwatch’s 0.1 s or 0.2 s."
      : "0.01 s: sela masa lebih kecil daripada 0.1 s atau 0.2 s bagi jam randik biasa.",
    en
      ? "Both read changes of 0.1°C, compared with 1°C on the laboratory thermometer. This smaller readable change illustrates greater sensitivity; appearance alone does not establish accuracy."
      : "Kedua-duanya membaca perubahan 0.1°C, berbanding 1°C pada termometer makmal. Perubahan bacaan lebih kecil menunjukkan kepekaan lebih tinggi; rupa sahaja tidak menentukan kejituan.",
    en
      ? "The textbook gives readings up to 0.01 A; the display presents the current numerically."
      : "Buku teks memberikan bacaan sehingga 0.01 A; paparan menunjukkan arus dalam bentuk angka.",
  ][index];
  return (
    <div
      data-instrument-comparison={index}
      className={`mt-4 grid gap-3 ${hasHigher ? "md:grid-cols-2" : "grid-cols-1"}`}
    >
      {[false, ...(hasHigher ? [true] : [])].map((higher) => {
        const name = higher ? item.higherAccuracyTool! : item.standardTool;
        const numbered = (higher && (index === 0 || index === 3)) || (!higher && index === 1);
        const kind = higher ? higherTools[index] : standardTools[index];
        return (
          <article
            key={String(higher)}
            data-instrument-card={higher ? "higher" : "standard"}
            className={`flex min-w-0 flex-col rounded-xl p-4 ${higher ? "bg-lime-300/[0.07]" : "bg-white/5"}`}
          >
            <p className={`text-xs ${higher ? "text-lime-200" : "text-slate-300"}`}>
              {higher ? higherLabel : standardLabel}
            </p>
            <h4 data-instrument-heading className="mt-2 min-h-12 font-bold leading-6 text-white">
              {numbered ? `1. ${name.replace(" / ", " / 2. ")}` : name}
            </h4>
            <div
              className={`mx-auto flex h-72 w-full max-w-md items-center justify-center [&>figure]:w-full [&_svg]:max-h-72 ${higher && index === 0 ? "[&_svg]:h-72" : ""}`}
            >
              {kind ? (
                <ComparisonInstrumentDrawing tool={kind} label={name} lang={lang} />
              ) : (
                <InstrumentVisual index={higher ? 6 : index} lang={lang} caption={false} />
              )}
            </div>
            {(higher ? higherHint : standardHint) && (
              <p className="mt-3 text-sm leading-6 text-slate-200">
                {higher ? higherHint : standardHint}
              </p>
            )}
            {higher && index > 0 && (
              <p data-illustrative-display className="mt-2 text-xs leading-5 text-slate-300">
                {en
                  ? "Display shown is illustrative, not a textbook measurement."
                  : "Paparan ialah ilustrasi, bukan ukuran daripada buku teks."}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
