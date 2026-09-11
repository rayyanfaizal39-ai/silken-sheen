import type { ApparatusItem } from "@/content/form1/science/chapter-1/chapter1-content";

export type LaboratoryApparatusId = ApparatusItem["id"];

type Props = {
  apparatus: LaboratoryApparatusId;
  label: string;
  className?: string;
  decorative?: boolean;
};

/**
 * Deterministic textbook-style line drawings for the canonical Form 1 apparatus.
 * Geometry is deliberately shared by BM and DLP; only the accessible label changes.
 */
export function LaboratoryApparatusVisual({
  apparatus,
  label,
  className = "",
  decorative = false,
}: Props) {
  return (
    <svg
      viewBox="0 0 160 140"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      data-apparatus-visual={apparatus}
    >
      {!decorative && <title>{label}</title>}
      <g
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        {apparatus === "boiling-tube" && (
          <>
            <ellipse cx="80" cy="20" rx="23" ry="5" />
            <path d="M57 20v77a23 23 0 0 0 46 0V20" />
            <path d="M64 25v70a16 16 0 0 0 5 12" opacity=".38" />
          </>
        )}

        {apparatus === "test-tube" && (
          <>
            <ellipse cx="80" cy="27" rx="14" ry="3.5" />
            <path d="M66 27v68a14 14 0 0 0 28 0V27" />
            <path d="M71 31v62a9 9 0 0 0 3 8" opacity=".38" />
          </>
        )}

        {apparatus === "beaker" && (
          <>
            <path d="M31 28h86l12-7-5 11v78a10 10 0 0 1-10 10H43a10 10 0 0 1-10-10V28" />
            <path d="M31 28c15 7 72 7 93 4" opacity=".55" />
            <path d="M105 48h14m-9 13h9m-14 13h14m-9 13h9" />
            <path d="M42 39v64" opacity=".38" />
          </>
        )}

        {apparatus === "conical-flask" && (
          <>
            <ellipse cx="80" cy="17" rx="14" ry="3.5" />
            <path d="M66 17v38L35 111c-4 7 1 11 9 11h72c8 0 13-4 9-11L94 55V17" />
            <path d="M50 99h60" opacity=".55" />
            <path d="M72 25v31L47 104" opacity=".38" />
          </>
        )}

        {apparatus === "flat-bottom-flask" && (
          <>
            <ellipse cx="80" cy="17" rx="13" ry="3.5" />
            <path d="M67 17v36C45 59 34 75 34 96c0 13 6 20 17 23h58c11-3 17-10 17-23 0-21-11-37-33-43V17" />
            <path d="M74 25v30c-17 6-27 20-27 37" opacity=".38" />
          </>
        )}

        {apparatus === "measuring-cylinder" && (
          <>
            <path d="M64 17h34l-8 7v84H72V24l-8-7Z" />
            <ellipse cx="81" cy="17" rx="17" ry="4" />
            <path d="M72 108h18v7l25 6v5H47v-5l25-6v-7Z" />
            <path d="M78 32h12m-7 9h7m-12 9h12m-7 9h7m-12 9h12m-7 9h7m-12 9h12m-7 9h7" />
          </>
        )}

        {apparatus === "burette" && (
          <>
            <path d="M75 9h10v87H75z" />
            <path d="M78 18h7m-7 8h4m-4 8h7m-7 8h4m-4 8h7m-7 8h4m-4 8h7m-7 8h4m-4 8h7" />
            <path d="M80 96v7m-18 0h36M68 98v10m24-10v10M80 103v16l-5 12m5-12 5 12" />
            <circle cx="80" cy="103" r="3.5" />
          </>
        )}

        {apparatus === "pipette" && (
          <>
            <path d="M77 8h6v37c0 4 13 9 13 25s-9 21-13 25v36h-6V95c-4-4-13-9-13-25s13-21 13-25V8Z" />
            <path d="M80 131v4M75 30h10" />
          </>
        )}

        {apparatus === "tripod-stand" && (
          <>
            <ellipse cx="80" cy="34" rx="40" ry="12" />
            <ellipse cx="80" cy="34" rx="30" ry="7" opacity=".55" />
            <path d="M45 39 25 122m90-83 20 83M80 46v76" />
            <path d="M20 122h13m47 0h10m37 0h13" />
          </>
        )}

        {apparatus === "wire-gauze" && (
          <>
            <rect x="30" y="20" width="100" height="100" />
            <path
              d="M30 40h100M30 60h100M30 80h100M30 100h100M50 20v100M70 20v100M90 20v100m20-100v100"
              opacity=".48"
            />
            <circle cx="80" cy="70" r="25" />
          </>
        )}

        {apparatus === "filter-funnel" && (
          <>
            <ellipse cx="80" cy="25" rx="43" ry="9" />
            <path d="M37 25 70 74v56h20V74l33-49" />
            <path d="M49 27 75 65h10l26-38" opacity=".5" />
            <path d="M70 92h20" />
          </>
        )}

        {apparatus === "gas-jar" && (
          <>
            <ellipse cx="80" cy="21" rx="28" ry="6" />
            <path d="M52 21v92c0 6 5 9 11 9h34c6 0 11-3 11-9V21" />
            <path d="M52 113c12 6 44 6 56 0M61 31v73" opacity=".45" />
          </>
        )}

        {apparatus === "retort-stand" && (
          <>
            <path d="M25 121h83l17 8H18l7-8Z" />
            <path d="M43 121V15h8v106" />
            <path d="M47 38h55m-7-6h14v13H95z" />
            <path d="M109 38h19m0-8v16m0-16 10-7m-10 23 10 7" />
            <circle cx="102" cy="38" r="3" />
          </>
        )}

        {apparatus === "evaporating-dish" && (
          <>
            <path d="M24 54c5 45 24 66 56 66s51-21 56-66l-11 5" />
            <path d="M24 54c19-13 90-13 112 0-20 17-92 17-112 0Z" />
            <path d="M37 65c8 31 23 45 43 45" opacity=".38" />
          </>
        )}
      </g>
    </svg>
  );
}

export function HeatingSupportVisual({
  className = "",
  lang = "en",
}: {
  className?: string;
  lang?: "en" | "bm";
}) {
  return (
    <svg
      viewBox="0 0 220 190"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={
        lang === "en"
          ? "1 Beaker, 2 Wire gauze, 3 Tripod stand, 4 Heat source"
          : "1 Bikar, 2 Kasa dawai, 3 Tungku kaki tiga, 4 Sumber haba"
      }
      data-heating-support-visual
    >
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M76 15h58l8-5-4 8v47c0 5-4 8-8 8H84c-4 0-8-3-8-8V15Z" />
        <path d="M76 15c10 5 49 5 62 3M87 55h40" opacity=".5" />
        <path d="m58 82 105 8-4 10-105-8 4-10Z" />
        <path
          d="m65 83-4 10m18-9-4 10m18-9-4 10m18-9-4 10m18-9-4 10m18-9-4 10m18-8-4 10M56 86l105 8"
          opacity=".45"
        />
        <ellipse cx="108" cy="105" rx="49" ry="10" />
        <path d="m65 108-23 65m109-65 23 65m-66-58v58" />
        <path d="M36 173h13m59 0h10m50 0h13" />
        <path d="M91 172h34l-5 9H96l-5-9Zm8 0v-25h18v25m-18-18h18" />
        <path d="M108 145c-8-9-5-18 0-25 5 7 8 16 0 25Z" className="text-amber-300" />
        {[
          [1, 28, 40, 76, 40],
          [2, 192, 85, 160, 91],
          [3, 192, 130, 164, 145],
          [4, 28, 156, 98, 156],
        ].map(([n, x, y, tx, ty]) => (
          <g key={n}>
            <path d={`M${x} ${y}L${tx} ${ty}`} strokeDasharray="3 3" />
            <circle cx={x} cy={y} r="10" fill="#071b22" />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fill="currentColor"
              stroke="none"
              fontSize="12"
            >
              {n}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
