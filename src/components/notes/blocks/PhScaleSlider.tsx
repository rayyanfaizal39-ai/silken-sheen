import { useRef, useState } from "react";
import type { PhScalePoint } from "@/content/form2/science/interactive-types";

function clampToScale(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

export function PhScaleSlider({
  scale,
  initialValue = 7,
  gradient,
  unitLabel = "pH",
  ariaLabel = "pH scale",
  tickLabels,
}: {
  scale: PhScalePoint[];
  initialValue?: number;
  gradient?: string;
  unitLabel?: string;
  /**
   * Accessible name for the track. Defaults to the pH wording this block was
   * built for; any other subject must pass its own, since a star chart
   * announcing itself as a pH scale is simply wrong.
   */
  ariaLabel?: string;
  /**
   * Labels under the track. Defaults to the raw scale values, which are
   * meaningful only when the value IS the quantity being read (pH). Elsewhere
   * the numbers are array indices and must be replaced with real labels.
   */
  tickLabels?: string[];
}) {
  const min = scale[0]?.value ?? 0;
  const max = scale[scale.length - 1]?.value ?? 14;
  const trackRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(clampToScale(initialValue, min, max));

  const current = scale.find((point) => point.value === value) ?? scale[0];
  const pct = ((value - min) / (max - min)) * 100;

  function setFromClientX(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setValue(clampToScale(min + ratio * (max - min), min, max));
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.buttons !== 1) return;
    setFromClientX(e.clientX);
  }

  return (
    <div className="mt-3">
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={ariaLabel}
        aria-valuetext={current?.name}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") setValue((v) => clampToScale(v - 1, min, max));
          if (e.key === "ArrowRight" || e.key === "ArrowUp") setValue((v) => clampToScale(v + 1, min, max));
        }}
        className="relative h-6 cursor-pointer touch-none rounded-full"
        style={{ background: gradient ?? "linear-gradient(90deg,#ff4d4d,#ffb937,#5be3b0,#4d7cfe,#8b6bff)" }}
      >
        <div
          className="absolute -top-2 h-10 w-1 -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between gap-0.5 px-0.5 text-[10.5px] leading-tight text-muted-foreground">
        {scale.map((point, i) => (
          <span key={point.value} className="min-w-0 flex-1 text-center [overflow-wrap:anywhere]">
            {tickLabels?.[i] ?? point.value}
          </span>
        ))}
      </div>
      {current && (
        <div className="mt-4 rounded-xl border border-border bg-card/60 p-3.5 text-center text-[13.5px] text-muted-foreground">
          <b className="font-display block text-base text-foreground">
            {unitLabel ? `${unitLabel} ${current.value} — ${current.name}` : current.name}
          </b>
          {current.description}
        </div>
      )}
    </div>
  );
}
