import type { Chapter4Content } from "@/content/form1/science/chapter-4/chapter4-content";
import { Diagram, Cue, panel, type Lang } from "./Chapter4Pass1Shared";
const copy = {
  en: {
    title: "Sperm compared with ovum",
    sperm: "Sperm",
    ovum: "Ovum",
    scale: "Schematic diagrams — not to scale",
    spermParts: ["Head", "Nucleus", "Middle piece", "Tail"],
    ovumParts: ["Nucleus", "Cytoplasm", "Cell membrane", "Protective jelly layer"],
    puberty: "Changes at puberty",
    male: "Male",
    female: "Female",
    age: "Typical age",
  },
  bm: {
    title: "Perbandingan sperma dengan ovum",
    sperm: "Sperma",
    ovum: "Ovum",
    scale: "Rajah skematik — tidak mengikut skala",
    spermParts: ["Kepala", "Nukleus", "Bahagian tengah", "Ekor"],
    ovumParts: ["Nukleus", "Sitoplasma", "Membran sel", "Lapisan jeli pelindung"],
    puberty: "Perubahan semasa akil baligh",
    male: "Lelaki",
    female: "Perempuan",
    age: "Usia lazim",
  },
} as const;
export function GameteDiagram({ sperm, lang }: { sperm: boolean; lang: Lang }) {
  const c = copy[lang];
  return (
    <Diagram
      label={`${sperm ? c.sperm : c.ovum} · ${c.scale}`}
      kind={sperm ? "sperm-cell" : "ovum-cell"}
      viewBox="0 0 360 260"
    >
      {sperm ? (
        <>
          <ellipse
            data-cell-part="head"
            cx="75"
            cy="125"
            rx="28"
            ry="19"
            fill="#155e75"
            stroke="#67e8f9"
            strokeWidth="3"
          />
          <ellipse data-cell-part="nucleus" cx="72" cy="125" rx="16" ry="11" fill="#a5f3fc" />
          <g data-cell-part="middle-piece">
            <rect x="103" y="119" width="43" height="12" rx="5" fill="#38bdf8" />
            {[110, 119, 128, 137].map((x) => (
              <path key={x} d={`M${x} 119 V131`} stroke="#e0f2fe" strokeWidth="2" />
            ))}
          </g>
          <path
            data-cell-part="tail"
            d="M145 125 C183 78 208 170 244 125 S299 91 326 116"
            stroke="#67e8f9"
            strokeWidth="3"
          />
          <Cue number={1} x={38} y={69} to={[57, 113]} />
          <Cue number={2} x={65} y={193} to={[73, 135]} />
          <Cue number={3} x={143} y={66} to={[126, 119]} />
          <Cue number={4} x={272} y={195} to={[273, 106]} />
        </>
      ) : (
        <>
          <circle
            data-cell-part="jelly-layer"
            cx="180"
            cy="127"
            r="85"
            fill="#f9a8d4"
            fillOpacity=".13"
            stroke="#f9a8d4"
            strokeWidth="12"
          />
          <circle
            data-cell-part="cell-membrane"
            cx="180"
            cy="127"
            r="72"
            fill="#702b53"
            stroke="#fbcfe8"
            strokeWidth="3"
          />
          <circle data-cell-part="cytoplasm" cx="180" cy="127" r="67" fill="#a44772" />
          <circle
            data-cell-part="nucleus"
            cx="180"
            cy="127"
            r="24"
            fill="#e9d5ff"
            stroke="#a78bfa"
            strokeWidth="2"
          />
          <Cue number={1} x={55} y={69} to={[165, 114]} />
          <Cue number={2} x={58} y={195} to={[146, 156]} />
          <Cue number={3} x={307} y={171} to={[249, 144]} />
          <Cue number={4} x={303} y={62} to={[248, 77]} />
        </>
      )}
    </Diagram>
  );
}
export function Chapter4Gametes({ content, lang }: { content: Chapter4Content; lang: Lang }) {
  const c = copy[lang];
  return (
    <section data-gamete-comparison="true" className={panel}>
      <h3 className="text-xl font-bold text-white">{c.title}</h3>
      <p className="mt-2 text-xs text-slate-400">{c.scale}</p>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {[true, false].map((sperm) => (
          <figure key={String(sperm)}>
            <h4 className="text-center font-bold text-rose-200">{sperm ? c.sperm : c.ovum}</h4>
            <GameteDiagram sperm={sperm} lang={lang} />
            <ol className="grid grid-cols-2 gap-2 text-sm text-slate-200">
              {(sperm ? c.spermParts : c.ovumParts).map((label, index) => (
                <li key={label}>
                  <span className="mr-2 font-mono text-cyan-300">{index + 1}</span>
                  {label}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {sperm
                ? content.humanReproductiveSystem.maleParts[5].function
                : content.humanReproductiveSystem.femaleParts[1].function}
            </p>
          </figure>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {content.humanReproductiveSystem.gameteComparison.map((row) => (
          <div key={row.feature} className="rounded-xl border border-white/10 p-3">
            <h4 className="text-sm font-bold text-amber-200">{row.feature}</h4>
            <div className="mt-2 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
              <p>
                <b className="text-cyan-200">{c.sperm}: </b>
                {row.sperm}
              </p>
              <p>
                <b className="text-rose-200">{c.ovum}: </b>
                {row.ovum}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        data-shared-gamete-properties="true"
        className="mt-4 rounded-xl bg-cyan-300/5 p-3 text-sm leading-6 text-cyan-100"
      >
        {content.gameteCommon.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </section>
  );
}
export function PubertyDiagram({ female, lang }: { female: boolean; lang: Lang }) {
  const c = copy[lang];
  return (
    <Diagram
      label={`${c.puberty} · ${female ? c.female : c.male}`}
      kind={female ? "puberty-female" : "puberty-male"}
      viewBox="0 0 360 390"
    >
      <g
        data-human-outline={female ? "female" : "male"}
        fill="#263c53"
        stroke="#bae6fd"
        strokeWidth="2.5"
      >
        <ellipse cx="180" cy="43" rx="24" ry="29" />
        <path
          d={
            female
              ? "M166 72 V83 Q135 87 128 112 L112 204 Q113 219 125 216 L148 146 Q153 178 137 215 L141 250 L152 353 Q165 365 176 353 L180 256 L185 353 Q198 365 209 353 L220 250 L224 215 Q207 178 212 146 L235 216 Q249 219 248 204 L232 112 Q225 87 194 83 V72"
              : "M166 72 V83 Q126 85 119 112 L104 209 Q108 224 120 217 L146 141 L149 218 L146 250 L151 354 Q164 366 176 354 L180 252 L185 354 Q198 366 210 354 L214 250 L211 218 L214 141 L240 217 Q251 224 256 209 L241 112 Q234 85 194 83 V72"
          }
        />
      </g>
      {female ? (
        <>
          <path
            d="M151 128 Q160 143 173 129 M187 129 Q200 143 209 128"
            stroke="#f9a8d4"
            strokeWidth="2"
          />
          <path d="M144 216 Q180 233 217 216" stroke="#f9a8d4" strokeWidth="2" />
        </>
      ) : (
        <>
          <path
            d="M169 57 L173 61 M178 59 V64 M184 59 V64 M190 57 L187 62"
            stroke="#fbbf24"
            strokeWidth="2"
          />
          <circle cx="180" cy="79" r="5" fill="#fbbf24" />
          <path d="M165 124 l-3 5 M177 124 l-2 5 M189 124 l2 5" stroke="#fbbf24" />
        </>
      )}
      <g stroke="#fbbf24" strokeWidth="2">
        <path d="M142 131 l-3 5 M147 130 l-2 6 M213 130 l2 6 M218 131 l3 5 M169 221 l3 5 M177 224 v5 M184 224 v5 M192 221 l-3 5" />
      </g>
      {(female
        ? [
            [65, 130, 156, 130],
            [295, 230, 199, 221],
          ]
        : [
            [65, 78, 180, 79],
            [295, 141, 210, 132],
            [65, 240, 164, 225],
          ]
      ).map(([x, y, tx, ty], i) => (
        <Cue key={i} number={i + 1} x={x} y={y} to={[tx, ty]} />
      ))}
    </Diagram>
  );
}
export function Chapter4Puberty({ content, lang }: { content: Chapter4Content; lang: Lang }) {
  const c = copy[lang];
  return (
    <section data-puberty="true" className={panel}>
      <h3 className="text-xl font-bold text-white">{c.puberty}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{content.puberty.definition}</p>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {[false, true].map((female) => (
          <figure key={String(female)}>
            <h4 className="text-center font-bold text-rose-200">{female ? c.female : c.male}</h4>
            <p className="mt-2 text-center text-sm text-amber-200">
              {c.age}: {female ? content.puberty.femaleAge : content.puberty.maleAge}
            </p>
            <PubertyDiagram female={female} lang={lang} />
            <figcaption className="space-y-3">
              {(female ? content.puberty.femaleChanges : content.puberty.maleChanges).map(
                (group, index) => (
                  <div key={group.category} className="rounded-xl border border-white/10 p-3">
                    <h5 className="text-sm font-bold text-cyan-200">
                      {index + 1}. {group.category}
                    </h5>
                    <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-300">
                      {group.changes.map((change) => (
                        <li key={change}>{change}</li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
