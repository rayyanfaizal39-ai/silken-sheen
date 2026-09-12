import type { ReactNode } from "react";
import {
  instrumentWorkedExamples,
  reportHeadings,
} from "@/content/form1/science/chapter-1/chapter1-cleanup";

type Lang = "bm" | "en";
const panel = "rounded-2xl border border-white/15 bg-slate-950/25 p-4 sm:p-5";
function Diagram({
  title,
  id,
  children,
  viewBox = "0 0 320 180",
}: {
  title: string;
  id: string;
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      data-chapter1-diagram={id}
      viewBox={viewBox}
      role="img"
      aria-label={title}
      className="mx-auto w-full max-w-lg text-slate-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}
function Label({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <text x={x} y={y} fontSize="13" fill="currentColor" stroke="none">
      {children}
    </text>
  );
}

export function ConversionLadders({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <div className="space-y-4" data-conversion-ladders>
      {[
        { title: en ? "Mass" : "Jisim", units: ["kg", "g"], factors: [1000] },
        {
          title: en ? "Length" : "Panjang",
          units: ["km", "m", "cm", "mm"],
          factors: [1000, 100, 10],
        },
        {
          title: en ? "Time" : "Masa",
          units: en ? ["hour", "minute", "second"] : ["jam", "minit", "saat"],
          factors: [60, 60],
        },
      ].map(({ title, units, factors }) => (
        <div key={title}>
          <h4 className="text-sm font-bold text-teal-100">{title}</h4>
          <ol className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            {units.map((unit, i) => (
              <li className="flex items-center gap-2" key={unit}>
                {i > 0 && (
                  <span className="text-center font-mono text-xs">
                    <span className="block">×{factors[i - 1]} →</span>
                    <span className="block">← ÷{factors[i - 1]}</span>
                  </span>
                )}
                <span className="rounded-lg border border-white/20 px-3 py-2">{unit}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <figure className="border-t border-white/15 pt-4">
        <figcaption className="text-sm font-bold">
          {en ? "Why use standard units?" : "Mengapakah unit piawai digunakan?"}
        </figcaption>
        <Diagram
          title={
            en
              ? "The same table measured with different hand spans"
              : "Meja yang sama diukur dengan jengkal berbeza"
          }
          id="standard-units"
        >
          <path d="M40 45h240v85H40zM50 130v35m220-35v35" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${40 + i * 80} 28v10h80V28`} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${40 + i * 60} 100v10h60v-10`} />
          ))}
          <Label x={45} y={20}>
            A: {en ? "larger hand spans" : "jengkal lebih besar"}
          </Label>
          <Label x={45} y={90}>
            B: {en ? "smaller hand spans" : "jengkal lebih kecil"}
          </Label>
        </Diagram>
        <p className="text-sm leading-6">
          {en
            ? "Illustration: different hand spans give different counts for the same table."
            : "Ilustrasi: saiz jengkal berbeza menghasilkan bilangan berbeza bagi meja yang sama."}
        </p>
        <p className="mt-2 text-sm text-teal-100">
          {en
            ? "Metre (S.I.) → same measurement system → comparable results"
            : "Meter (S.I.) → sistem pengukuran yang sama → keputusan boleh dibandingkan"}
        </p>
      </figure>
    </div>
  );
}

export function InstrumentReadings({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const vernier = instrumentWorkedExamples.vernier;
  const micro = instrumentWorkedExamples.micrometer;
  return (
    <section className={`${panel} space-y-5`} data-instrument-readings>
      <h3 className="font-bold text-teal-100">
        {en ? "Reading measuring instruments" : "Membaca alat pengukur"}
      </h3>
      <figure>
        <figcaption className="text-sm font-bold">
          {en
            ? "Vernier calipers — textbook example (p.22)"
            : "Angkup vernier — contoh buku teks (m.s.22)"}
        </figcaption>
        <Diagram
          title={
            en
              ? "Main and vernier scales: the second vernier line coincides"
              : "Skala utama dan vernier: garis vernier kedua bertepatan"
          }
          id="vernier-reading"
        >
          <Label x={20} y={22}>
            {en ? "Main scale (cm)" : "Skala utama (cm)"}
          </Label>
          <path d="M30 70h240M74 100h180" />
          {Array.from({ length: 13 }, (_, i) => (
            <path key={i} d={`M${30 + i * 20} 45v25`} />
          ))}
          {[0, 5, 10].map((i) => (
            <Label key={i} x={23 + i * 20} y={40}>
              {(3 + i * 0.1).toFixed(1)}
            </Label>
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <path key={i} d={`M${74 + i * 18} 100v25`} />
          ))}
          {[0, 5, 10].map((i) => (
            <Label key={i} x={70 + i * 18} y={145}>
              {i}
            </Label>
          ))}
          <path d="M110 45v80" strokeWidth="3" strokeDasharray="3 3" className="text-teal-300" />
          <Label x={18} y={172}>
            {en ? "Vernier scale: line 2 coincides" : "Skala vernier: garis 2 bertepatan"}
          </Label>
        </Diagram>
        <p className="text-sm leading-6">
          {en
            ? "Main scale: last mark before vernier zero = "
            : "Skala utama: tanda terakhir sebelum sifar vernier = "}
          {vernier.main.toFixed(2)} cm.
          <br />
          {en ? "Vernier scale: 2 × 0.01 = " : "Skala vernier: 2 × 0.01 = "}
          {vernier.secondary.toFixed(2)} cm.
        </p>
        <p className="mt-2 font-mono text-teal-100">
          {en ? "Total" : "Jumlah"}: {vernier.main.toFixed(2)} + {vernier.secondary.toFixed(2)} ={" "}
          {vernier.total.toFixed(2)} cm
        </p>
      </figure>
      <div className="border-t border-white/15 pt-4">
        <h4 className="text-sm font-bold">
          {en
            ? "Vernier zero error — jaws closed"
            : "Ralat sifar angkup vernier — rahang dirapatkan"}
        </h4>
        <div className="mt-3 grid gap-4 lg:grid-cols-3">
          {[
            { delta: 0, line: 0, value: "0.00", en: "No zero error", bm: "Tiada ralat sifar" },
            {
              delta: 6,
              line: 3,
              value: "+0.03",
              en: "Positive zero error",
              bm: "Ralat sifar positif",
            },
            {
              delta: -12,
              line: 4,
              value: "−0.06",
              en: "Negative zero error",
              bm: "Ralat sifar negatif",
            },
          ].map((item) => (
            <figure key={item.value}>
              <figcaption className="text-sm">{item[lang]}</figcaption>
              <Diagram
                title={`${item[lang]}: ${item.value} cm`}
                id={`vernier-zero-${item.value}`}
                viewBox="0 0 300 130"
              >
                <path d="M40 50h220" />
                {Array.from({ length: 11 }, (_, i) => (
                  <path key={i} d={`M${60 + i * 20} 30v20`} />
                ))}
                <Label x={56} y={24}>
                  0
                </Label>
                {Array.from({ length: 11 }, (_, i) => (
                  <path key={i} d={`M${60 + item.delta + i * 18} 70v20`} />
                ))}
                {[0, 5, 10].map((i) => (
                  <Label key={i} x={56 + item.delta + i * 18} y={110}>
                    {i}
                  </Label>
                ))}
                <path
                  d={`M${60 + item.delta + item.line * 18} 30v60`}
                  strokeWidth="3"
                  strokeDasharray="3 3"
                  className="text-teal-300"
                />
              </Diagram>
              <p className="font-mono text-sm">{item.value} cm</p>
              <p className="text-xs leading-5">
                {item.delta < 0
                  ? en
                    ? "Count 6 divisions back from 10."
                    : "Kira 6 senggatan ke belakang dari 10."
                  : item.delta > 0
                    ? en
                      ? "Count 3 divisions from 0."
                      : "Kira 3 senggatan dari 0."
                    : en
                      ? "Both zeros align."
                      : "Kedua-dua sifar sejajar."}
              </p>
            </figure>
          ))}
        </div>
      </div>
      <figure className="border-t border-white/15 pt-4">
        <figcaption className="text-sm font-bold">
          {en
            ? "Micrometer screw gauge — textbook example (p.23)"
            : "Tolok skru mikrometer — contoh buku teks (m.s.23)"}
        </figcaption>
        <Diagram
          title={
            en
              ? "Sleeve main scale 3.50 mm; thimble scale 0.38 mm"
              : "Skala utama lengan 3.50 mm; skala bidal 0.38 mm"
          }
          id="micrometer-reading"
        >
          <path d="M30 80h255M30 45h153v85H30M183 30l75 10v90l-75 10z" />
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={`M${30 + i * 20} 80v${i % 2 ? 18 : -20}`} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <Label key={i} x={26 + i * 40} y={54}>
              {i}
            </Label>
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M183 ${40 + i * 10}h${(42 - i) % 5 ? 20 : 30}`} />
          ))}
          <Label x={217} y={64}>
            40
          </Label>
          <Label x={217} y={114}>
            35
          </Label>
          <path d="M170 98v14M183 80h60" className="text-teal-300" strokeWidth="3" />
          <Label x={15} y={163}>
            {en ? "Sleeve / main scale" : "Lengan / skala utama"}
          </Label>
          <Label x={192} y={163}>
            {en ? "Thimble" : "Bidal"}
          </Label>
        </Diagram>
        <p className="text-sm leading-6">
          {en ? "Sleeve/main scale" : "Lengan/skala utama"}: {micro.main.toFixed(2)} mm.
          <br />
          {en
            ? "Thimble scale (called vernier scale in the textbook)"
            : "Skala bidal (dinamakan skala vernier dalam buku teks)"}
          : 38 × 0.01 = {micro.secondary.toFixed(2)} mm.
        </p>
        <p className="mt-2 font-mono text-teal-100">
          {en ? "Total" : "Jumlah"}: {micro.main.toFixed(2)} + {micro.secondary.toFixed(2)} ={" "}
          {micro.total.toFixed(2)} mm
        </p>
        <p className="mt-3 text-sm leading-6">
          {en
            ? "With the measuring faces closed: aligned zeros → no zero error; +0.01 mm → positive zero error; −0.02 mm → negative zero error."
            : "Apabila muka pengukur dirapatkan: sifar sejajar → tiada ralat sifar; +0.01 mm → ralat sifar positif; −0.02 mm → ralat sifar negatif."}
        </p>
      </figure>
      <p className="border-l-2 border-teal-300 pl-3 text-sm leading-6" data-zero-correction>
        {en
          ? "Corrected reading = instrument reading − zero error. Subtract a positive error; subtracting a negative error adds its magnitude."
          : "Bacaan sebenar = bacaan alat − ralat sifar. Tolak ralat positif; menolak ralat negatif menambahkan magnitudnya."}
      </p>
    </section>
  );
}

export function DensityRelationships({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <div className={`${panel} space-y-4`}>
      <h3 className="font-bold text-teal-100">
        {en ? "Equal-volume cubes" : "Kubus sama isi padu"}
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" data-equal-volume-cubes>
        {(en ? ["Copper", "Iron", "Cork", "Wood"] : ["Kuprum", "Besi", "Gabus", "Kayu"]).map(
          (name, i) => (
            <figure key={name}>
              <Diagram title={name} id={`density-cube-${i}`} viewBox="0 0 140 120">
                <path d="m30 35 50-20 40 25v50l-50 20-40-25zm0 0 40 25 50-20M70 60v50" />
              </Diagram>
              <figcaption className="text-center text-sm">{name}</figcaption>
            </figure>
          ),
        )}
      </div>
      <p className="text-sm leading-6">
        {en
          ? "Same volume → different masses → different densities."
          : "Isi padu sama → jisim berbeza → ketumpatan berbeza."}
      </p>
      <ol className="flex flex-wrap gap-2 text-sm text-teal-100">
        {(en
          ? [
              "Measure mass",
              "Use the same volume",
              "Calculate density",
              "Compare",
              "Observe floating / sinking",
            ]
          : [
              "Ukur jisim",
              "Gunakan isi padu sama",
              "Hitung ketumpatan",
              "Bandingkan",
              "Perhatikan terapung / tenggelam",
            ]
        ).map((s, i) => (
          <li key={s}>
            {i > 0 && <span aria-hidden="true"> → </span>}
            {s}
          </li>
        ))}
      </ol>
      <figure className="border-t border-white/15 pt-4">
        <Diagram
          title={
            en ? "Mass, density and volume relationship" : "Hubungan jisim, ketumpatan dan isi padu"
          }
          id="density-formula-triangle"
          viewBox="0 0 320 200"
        >
          <path d="m160 15 140 170H20zM87 105h146M160 105v80" />
          <Label x={140} y={86}>
            {en ? "Mass" : "Jisim"}
          </Label>
          <Label x={50} y={165}>
            {en ? "Density" : "Ketumpatan"}
          </Label>
          <Label x={190} y={165}>
            {en ? "Volume" : "Isi padu"}
          </Label>
        </Diagram>
        <figcaption className="space-y-1 text-center text-sm font-mono">
          {(en
            ? ["Density = Mass ÷ Volume", "Mass = Density × Volume", "Volume = Mass ÷ Density"]
            : [
                "Ketumpatan = Jisim ÷ Isi padu",
                "Jisim = Ketumpatan × Isi padu",
                "Isi padu = Jisim ÷ Ketumpatan",
              ]
          ).map((s) => (
            <p key={s}>{s}</p>
          ))}
        </figcaption>
      </figure>
    </div>
  );
}

export function InvestigationReport({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <section className={panel} data-investigation-report>
      <h3 className="font-bold">
        {en ? "How to write the investigation report" : "Cara menulis laporan penyiasatan"}
      </h3>
      <ol className="mt-3 grid list-inside list-decimal gap-2 text-sm sm:grid-cols-3">
        {reportHeadings[lang].map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <p className="mt-4 text-sm leading-6">
        {en
          ? "Write the procedure in passive form. Example:"
          : "Tulis prosedur dalam ayat pasif. Contoh:"}
      </p>
      <p className="mt-1 text-sm leading-6">
        {en
          ? "Active: Measure the length of the pendulum. → Passive: The length of the pendulum is measured."
          : "Aktif: Ukur panjang bandul. → Pasif: Panjang bandul diukur."}
      </p>
    </section>
  );
}
