import { useMemo, useState } from "react";

/**
 * The oscilloscope (O.S.K.) trace a learner can drive themselves.
 *
 * The two controls are deliberately independent: moving the amplitude slider
 * changes only the height of the trace, and moving the frequency slider changes
 * only how many complete waves fit in the same time window. That separation is
 * the lesson — amplitude sets loudness, frequency sets pitch — so neither slider
 * may ever be allowed to disturb the other's quantity.
 */

const WIDTH = 400;
const HEIGHT = 132;
const MID_Y = HEIGHT / 2;
const POINTS = 200;

export const AMPLITUDE_MIN = 5;
export const AMPLITUDE_MAX = 50;
export const FREQUENCY_MIN = 1;
export const FREQUENCY_MAX = 10;

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
  const bm = lang === "bm";

  const path = useMemo(() => buildPath(amplitude, frequency), [amplitude, frequency]);

  const ampLabel =
    amplitude < 20
      ? bm ? "Perlahan" : "Quiet"
      : amplitude < 35
        ? bm ? "Sederhana" : "Medium"
        : bm ? "Nyaring" : "Loud";
  const freqLabel =
    frequency < 4
      ? bm ? "Kelangsingan rendah" : "Low pitch"
      : frequency < 7
        ? bm ? "Kelangsingan sederhana" : "Medium pitch"
        : bm ? "Kelangsingan tinggi" : "High pitch";

  return (
    <div className="mt-3 rounded-2xl border border-border bg-secondary/25 p-4">
      <div className="w-full overflow-hidden rounded-xl bg-black/20 text-primary">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width="100%"
          height={HEIGHT}
          preserveAspectRatio="none"
          role="img"
          aria-label={
            bm
              ? `Paparan O.S.K.: amplitud ${ampLabel.toLowerCase()}, ${freqLabel.toLowerCase()} dengan ${frequency} gelombang lengkap dalam satu saat`
              : `Oscilloscope display: ${ampLabel.toLowerCase()} amplitude, ${freqLabel.toLowerCase()} with ${frequency} complete waves in one second`
          }
        >
          <path d={path} stroke="currentColor" strokeWidth={3} fill="none" />
        </svg>
      </div>
      {/* The label takes its own line on narrow screens; below about 400px the
          three-column row cannot hold a label, a usable track and a value like
          "Kelangsingan sederhana" without pushing the value out of view. */}
      <div className="mt-4 flex flex-col gap-3.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <label
            className="w-full shrink-0 text-xs text-muted-foreground sm:w-28"
            htmlFor="osk-amplitude"
          >
            {bm ? "Amplitud (kenyaringan)" : "Amplitude (loudness)"}
          </label>
          <input
            id="osk-amplitude"
            type="range"
            min={AMPLITUDE_MIN}
            max={AMPLITUDE_MAX}
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
            className="min-w-[110px] flex-1 accent-primary"
            aria-label={bm ? "Amplitud gelombang" : "Wave amplitude"}
            aria-valuetext={ampLabel}
          />
          <div className="w-24 shrink-0 text-right font-display text-[12.5px] text-foreground">{ampLabel}</div>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <label
            className="w-full shrink-0 text-xs text-muted-foreground sm:w-28"
            htmlFor="osk-frequency"
          >
            {bm ? "Frekuensi (kelangsingan)" : "Frequency (pitch)"}
          </label>
          <input
            id="osk-frequency"
            type="range"
            min={FREQUENCY_MIN}
            max={FREQUENCY_MAX}
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="min-w-[110px] flex-1 accent-primary"
            aria-label={bm ? "Frekuensi gelombang" : "Wave frequency"}
            aria-valuetext={freqLabel}
          />
          <div className="w-24 shrink-0 text-right font-display text-[12.5px] text-foreground">{freqLabel}</div>
        </div>
      </div>
      <p className="mt-3 text-center text-[13px] text-muted-foreground">
        <b className="font-display text-foreground">
          {ampLabel}, {freqLabel}
        </b>{" "}
        {bm
          ? "— seret amplitud sahaja dan perhatikan bilangan gelombang tidak berubah; seret frekuensi sahaja dan perhatikan tinggi gelombang tidak berubah."
          : "— drag amplitude alone and notice the number of waves does not change; drag frequency alone and notice the wave height does not change."}
      </p>
    </div>
  );
}
