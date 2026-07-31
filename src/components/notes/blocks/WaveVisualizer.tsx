import { useMemo, useState } from "react";

const WIDTH = 400;
const HEIGHT = 120;
const MID_Y = HEIGHT / 2;
const POINTS = 200;

function buildPath(amplitude: number, frequency: number) {
  let d = `M 0 ${MID_Y}`;
  for (let i = 0; i <= POINTS; i++) {
    const x = (i / POINTS) * WIDTH;
    const y = MID_Y - amplitude * Math.sin((i / POINTS) * Math.PI * 2 * frequency);
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

export function WaveVisualizer({ lang }: { lang: "en" | "bm" }) {
  const [amplitude, setAmplitude] = useState(20);
  const [frequency, setFrequency] = useState(4);

  const path = useMemo(() => buildPath(amplitude, frequency), [amplitude, frequency]);

  const ampLabel =
    amplitude < 20
      ? lang === "bm" ? "Senyap" : "Quiet"
      : amplitude < 35
        ? lang === "bm" ? "Sederhana" : "Medium"
        : lang === "bm" ? "Lantang" : "Loud";
  const freqLabel =
    frequency < 4
      ? lang === "bm" ? "Kelaraban rendah" : "Low pitch"
      : frequency < 7
        ? lang === "bm" ? "Kelaraban sederhana" : "Medium pitch"
        : lang === "bm" ? "Kelaraban tinggi" : "High pitch";

  return (
    <div className="mt-3 rounded-2xl border border-border bg-secondary/25 p-4">
      <div className="w-full overflow-hidden rounded-xl bg-black/20 text-primary">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" height={HEIGHT} preserveAspectRatio="none">
          <path d={path} stroke="currentColor" strokeWidth={3} fill="none" />
        </svg>
      </div>
      <div className="mt-4 flex flex-col gap-3.5">
        <div className="flex items-center gap-3">
          <label className="w-28 shrink-0 text-xs text-muted-foreground">
            {lang === "bm" ? "Amplitud (kelantangan)" : "Amplitude (loudness)"}
          </label>
          <input
            type="range"
            min={5}
            max={50}
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <div className="w-24 shrink-0 text-right font-display text-[12.5px] text-foreground">{ampLabel}</div>
        </div>
        <div className="flex items-center gap-3">
          <label className="w-28 shrink-0 text-xs text-muted-foreground">
            {lang === "bm" ? "Frekuensi (kelaraban)" : "Frequency (pitch)"}
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <div className="w-24 shrink-0 text-right font-display text-[12.5px] text-foreground">{freqLabel}</div>
        </div>
      </div>
      <p className="mt-3 text-center text-[13px] text-muted-foreground">
        <b className="font-display text-foreground">
          {ampLabel}, {freqLabel}
        </b>{" "}
        {lang === "bm"
          ? "— cuba seret kedua-duanya untuk mendengar bagaimana lenguhan lembu (frekuensi rendah) berbeza daripada lengkingan tikus (frekuensi tinggi)."
          : "— try dragging both to hear how a cow's moo (low freq) differs from a rat's squeak (high freq)."}
      </p>
    </div>
  );
}
