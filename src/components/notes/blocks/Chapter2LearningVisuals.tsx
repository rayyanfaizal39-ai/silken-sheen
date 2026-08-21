import { useMemo, useState } from "react";
import type { Chapter2Content } from "@/content/form1/science/chapter-2/chapter2-content";
import type { LocalizedChapter2PracticalArea } from "@/content/form1/science/chapter-2/chapter2-activities";
import animalPlantCellImage from "@/assets/chapters/science/form-1/chapter-2/animal-plant-cell.webp";
import unicellularMulticellularImage from "@/assets/chapters/science/form-1/chapter-2/unicellular-multicellular.webp";
import specialisedCellsImage from "@/assets/chapters/science/form-1/chapter-2/specialised-cells.webp";
import levelsOfOrganisationImage from "@/assets/chapters/science/form-1/chapter-2/levels-of-organisation.webp";
import photosynthesisStarchTestImage from "@/assets/chapters/science/form-1/chapter-2/photosynthesis-starch-test.webp";
import humanBodySystemsImage from "@/assets/chapters/science/form-1/chapter-2/human-body-systems.webp";

type Lang = "en" | "bm";

interface LabelledItem {
  id: string;
  label: string;
  detail?: string;
  group?: string;
}

interface Marker {
  id: string;
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
}

interface CellCallout {
  id: string;
  structureId: string;
  label: string;
  detail: string;
  cell: "animal" | "plant";
  labelY: number;
  targetX: number;
  targetY: number;
}

const COPY = {
  en: {
    animal: "Animal cell",
    plant: "Plant cell",
    unicellular: "Unicellular",
    multicellular: "Multicellular",
    animalCells: "Specialised animal cells",
    plantCells: "Specialised plant cells",
    visualKey: "Visual key",
    tap: "Select a label to connect the visual with its function.",
    visualGuide: "Visual guide only — this does not record completion of the physical practical.",
    photosynthesis: "Photosynthesis requirements and the starch test",
    systems: "Select a body system to reveal its organs and function.",
    organs: "Organs",
    function: "Function",
  },
  bm: {
    animal: "Sel haiwan",
    plant: "Sel tumbuhan",
    unicellular: "Unisel",
    multicellular: "Multisel",
    animalCells: "Sel haiwan khusus",
    plantCells: "Sel tumbuhan khusus",
    visualKey: "Petunjuk visual",
    tap: "Pilih label untuk menghubungkan visual dengan fungsinya.",
    visualGuide: "Panduan visual sahaja — ini tidak merekodkan penyelesaian amali fizikal.",
    photosynthesis: "Keperluan fotosintesis dan ujian kanji",
    systems: "Pilih sistem badan untuk melihat organ dan fungsinya.",
    organs: "Organ",
    function: "Fungsi",
  },
} as const;

function LearningVisual({
  src,
  alt,
  items,
  markers,
  lang,
  children,
}: {
  src: string;
  alt: string;
  items: LabelledItem[];
  markers: Marker[];
  lang: Lang;
  children?: React.ReactNode;
}) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const selected = items.find((item) => item.id === selectedId);

  return (
    <figure className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 shadow-sm">
      <div className="relative isolate">
        <img
          src={src}
          alt={alt}
          width={1672}
          height={941}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full object-contain"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        >
          {markers
            .filter((marker) => marker.targetX !== undefined && marker.targetY !== undefined)
            .map((marker) => (
              <line
                key={`${marker.id}-${marker.x}-${marker.y}`}
                x1={marker.x}
                y1={marker.y}
                x2={marker.targetX}
                y2={marker.targetY}
                vectorEffect="non-scaling-stroke"
                className="stroke-cyan-200"
                strokeWidth="2"
              />
            ))}
        </svg>
        <div className="absolute inset-0 hidden md:block">
          {markers.map((marker) => {
            const itemIndex = items.findIndex((item) => item.id === marker.id);
            if (itemIndex < 0) return null;
            const isSelected = selectedId === marker.id;
            return (
              <button
                key={`${marker.id}-${marker.x}-${marker.y}`}
                type="button"
                onClick={() => setSelectedId(marker.id)}
                aria-label={items[itemIndex].label}
                aria-pressed={isSelected}
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                className={`absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-sm font-black shadow-lg transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                  isSelected
                    ? "z-20 scale-110 border-white bg-cyan-400 text-slate-950"
                    : "z-10 border-cyan-100 bg-slate-950/90 text-white hover:scale-105 hover:bg-blue-800"
                }`}
              >
                {itemIndex + 1}
              </button>
            );
          })}
        </div>
      </div>
      <figcaption className="border-t border-white/15 bg-slate-950/90 p-4 text-white sm:p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
          {COPY[lang].visualKey}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-300">{COPY[lang].tap}</p>
        {children}
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const isSelected = selectedId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                aria-pressed={isSelected}
                className={`min-h-11 rounded-xl border px-3 py-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${
                  isSelected
                    ? "border-cyan-300 bg-cyan-300/15 text-white"
                    : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 font-black text-slate-950">
                  {index + 1}
                </span>
                <span className="font-semibold">{item.label}</span>
                {item.group && (
                  <span className="ml-2 text-[10px] uppercase tracking-wide text-cyan-300">
                    {item.group}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {selected?.detail && (
          <p
            aria-live="polite"
            className="mt-3 rounded-xl border border-cyan-300/25 bg-cyan-300/10 p-3 text-xs leading-relaxed text-slate-100"
          >
            <span className="font-bold text-cyan-200">{selected.label}:</span> {selected.detail}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

export function AnimalPlantCellVisual({ content, lang }: { content: Chapter2Content; lang: Lang }) {
  const structureById = new Map(
    content.cellStructures.map((structure) => [structure.id, structure]),
  );
  const specs: Array<Omit<CellCallout, "label" | "detail">> = [
    {
      id: "animal-cytoplasm",
      structureId: "cytoplasm",
      cell: "animal",
      labelY: 23,
      targetX: 21,
      targetY: 27,
    },
    {
      id: "animal-mitochondria",
      structureId: "mitochondria",
      cell: "animal",
      labelY: 38,
      targetX: 32,
      targetY: 34,
    },
    {
      id: "animal-nucleus",
      structureId: "nucleus",
      cell: "animal",
      labelY: 53,
      targetX: 26,
      targetY: 47,
    },
    {
      id: "animal-cell-membrane",
      structureId: "cell-membrane",
      cell: "animal",
      labelY: 72,
      targetX: 21,
      targetY: 72,
    },
    {
      id: "plant-cell-wall",
      structureId: "cell-wall",
      cell: "plant",
      labelY: 12,
      targetX: 89,
      targetY: 18,
    },
    {
      id: "plant-chloroplast",
      structureId: "chloroplast",
      cell: "plant",
      labelY: 24,
      targetX: 83,
      targetY: 28,
    },
    {
      id: "plant-cytoplasm",
      structureId: "cytoplasm",
      cell: "plant",
      labelY: 36,
      targetX: 70,
      targetY: 30,
    },
    {
      id: "plant-mitochondria",
      structureId: "mitochondria",
      cell: "plant",
      labelY: 48,
      targetX: 82,
      targetY: 44,
    },
    {
      id: "plant-nucleus",
      structureId: "nucleus",
      cell: "plant",
      labelY: 60,
      targetX: 62,
      targetY: 47,
    },
    {
      id: "plant-vacuole",
      structureId: "vacuole",
      cell: "plant",
      labelY: 72,
      targetX: 75,
      targetY: 50,
    },
    {
      id: "plant-cell-membrane",
      structureId: "cell-membrane",
      cell: "plant",
      labelY: 84,
      targetX: 57.8,
      targetY: 72.5,
    },
  ];
  const callouts = specs.flatMap<CellCallout>((spec) => {
    const structure = structureById.get(spec.structureId);
    return structure ? [{ ...spec, label: structure.name, detail: structure.function }] : [];
  });
  const [selectedCalloutId, setSelectedCalloutId] = useState("animal-nucleus");
  const selected = callouts.find((callout) => callout.id === selectedCalloutId) ?? callouts[0];

  const canvasTarget = (callout: CellCallout) => ({
    x: 14 + callout.targetX * 0.72,
    y: 14 + callout.targetY * 0.72,
  });

  const calloutButton = (callout: CellCallout, mobile = false) => {
    const isSelected = selected?.id === callout.id;
    return (
      <button
        key={`${mobile ? "mobile" : "desktop"}-${callout.id}`}
        type="button"
        onClick={() => setSelectedCalloutId(callout.id)}
        aria-pressed={isSelected}
        className={`${
          mobile
            ? "min-h-11 w-full px-3 py-2 text-left"
            : "absolute min-h-11 w-[13%] px-2 py-1 text-center"
        } cursor-pointer rounded-xl border text-xs font-bold leading-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
          isSelected
            ? "border-cyan-200 bg-cyan-300 text-slate-950 shadow-lg"
            : "border-white/25 bg-slate-950/95 text-white hover:border-cyan-300 hover:bg-blue-900"
        }`}
        style={
          mobile
            ? undefined
            : callout.cell === "animal"
              ? { left: "1%", top: `${callout.labelY}%`, transform: "translateY(-50%)" }
              : { right: "1%", top: `${callout.labelY}%`, transform: "translateY(-50%)" }
        }
      >
        {callout.label}
      </button>
    );
  };

  return (
    <figure className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 shadow-sm">
      <div className="relative hidden aspect-video w-full overflow-hidden md:block">
        <img
          src={animalPlantCellImage}
          alt={
            lang === "en"
              ? "Animal and plant cell comparison with interactive structure labels"
              : "Perbandingan sel haiwan dan sel tumbuhan dengan label struktur interaktif"
          }
          width={1672}
          height={941}
          loading="lazy"
          decoding="async"
          className="absolute left-[14%] top-[14%] h-[72%] w-[72%] object-contain"
        />
        <div
          aria-hidden="true"
          className="absolute left-[14%] top-2 w-[36%] text-center text-sm font-bold text-violet-200"
        >
          {COPY[lang].animal}
        </div>
        <div
          aria-hidden="true"
          className="absolute right-[14%] top-2 w-[36%] text-center text-sm font-bold text-emerald-200"
        >
          {COPY[lang].plant}
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {callouts.map((callout) => {
            const target = canvasTarget(callout);
            const isSelected = selected?.id === callout.id;
            return (
              <g key={`line-${callout.id}`}>
                <line
                  x1={callout.cell === "animal" ? 14 : 86}
                  y1={callout.labelY}
                  x2={target.x}
                  y2={target.y}
                  vectorEffect="non-scaling-stroke"
                  className={isSelected ? "stroke-cyan-300" : "stroke-slate-300/80"}
                  strokeWidth={isSelected ? 3 : 1.5}
                />
                <circle
                  cx={target.x}
                  cy={target.y}
                  r={isSelected ? 1.35 : 0.85}
                  vectorEffect="non-scaling-stroke"
                  className={
                    isSelected ? "fill-cyan-300 stroke-slate-950" : "fill-white stroke-slate-950"
                  }
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>
        {callouts.map((callout) => calloutButton(callout))}
        {callouts.map((callout) => {
          const target = canvasTarget(callout);
          const isSelected = selected?.id === callout.id;
          return (
            <button
              key={`target-${callout.id}`}
              type="button"
              onClick={() => setSelectedCalloutId(callout.id)}
              aria-label={`${COPY[lang][callout.cell]}, ${callout.label}`}
              aria-pressed={isSelected}
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
              className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              <span className="sr-only">{callout.label}</span>
            </button>
          );
        })}
      </div>

      <div className="md:hidden">
        <div className="relative">
          <img
            src={animalPlantCellImage}
            alt={
              lang === "en"
                ? "Animal cell beside a plant cell"
                : "Sel haiwan bersebelahan sel tumbuhan"
            }
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full object-contain"
          />
          {selected && (
            <span
              aria-hidden="true"
              style={{ left: `${selected.targetX}%`, top: `${selected.targetY}%` }}
              className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-950 bg-cyan-300 shadow-[0_0_0_4px_rgba(103,232,249,0.55)]"
            />
          )}
        </div>
        <div className="grid gap-4 border-t border-white/15 p-4">
          {(["animal", "plant"] as const).map((cell) => (
            <section key={cell} aria-labelledby={`cell-callouts-${cell}-${lang}`}>
              <h4
                id={`cell-callouts-${cell}-${lang}`}
                className="mb-2 text-sm font-bold text-cyan-200"
              >
                {COPY[lang][cell]}
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {callouts
                  .filter((callout) => callout.cell === cell)
                  .map((callout) => calloutButton(callout, true))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <figcaption className="border-t border-white/15 bg-slate-950/90 p-4 text-white sm:p-5">
        <p className="text-xs leading-relaxed text-slate-300">{COPY[lang].tap}</p>
        {selected && (
          <p
            aria-live="polite"
            className="mt-3 rounded-xl border border-cyan-300/25 bg-cyan-300/10 p-3 text-sm leading-relaxed text-slate-100"
          >
            <span className="font-bold text-cyan-200">{selected.label}:</span> {selected.detail}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

export function OrganismVisual({ content, lang }: { content: Chapter2Content; lang: Lang }) {
  const unicellular = content.unicellularMulticellular.unicellular.map((item) => ({
    id: item.id,
    label: item.name,
    detail: item.note,
    group: COPY[lang].unicellular,
  }));
  const multicellular = content.unicellularMulticellular.multicellular.map((item) => ({
    id: item.id,
    label: item.name,
    detail: item.note,
    group: COPY[lang].multicellular,
  }));
  return (
    <LearningVisual
      src={unicellularMulticellularImage}
      alt={
        lang === "en"
          ? "Examples of unicellular and multicellular organisms"
          : "Contoh organisma unisel dan multisel"
      }
      items={[...unicellular, ...multicellular]}
      markers={[
        { id: "amoeba", x: 14, y: 29 },
        { id: "paramecium", x: 36, y: 29 },
        { id: "euglena", x: 17, y: 68 },
        { id: "chlamydomonas", x: 37, y: 70 },
        { id: "mucor", x: 63, y: 28 },
        { id: "spirogyra", x: 64, y: 69 },
        { id: "hydra", x: 88, y: 52 },
      ]}
      lang={lang}
    />
  );
}

export function SpecialisedCellsVisual({
  content,
  lang,
}: {
  content: Chapter2Content;
  lang: Lang;
}) {
  const items = [
    ...content.animalCellTypes.map((item) => ({
      ...item,
      label: item.name,
      detail: item.description,
      group: COPY[lang].animalCells,
    })),
    ...content.plantCellTypes.map((item) => ({
      ...item,
      label: item.name,
      detail: item.description,
      group: COPY[lang].plantCells,
    })),
  ];
  return (
    <LearningVisual
      src={specialisedCellsImage}
      alt={
        lang === "en"
          ? "Specialised animal and plant cell types"
          : "Jenis sel haiwan dan tumbuhan yang khusus"
      }
      items={items}
      markers={[
        { id: "nerve", x: 11, y: 25 },
        { id: "epithelial", x: 29, y: 30 },
        { id: "muscle", x: 44, y: 30 },
        { id: "red-blood", x: 56, y: 31 },
        { id: "white-blood", x: 68, y: 31 },
        { id: "reproductive", x: 86, y: 30 },
        { id: "palisade", x: 14, y: 73 },
        { id: "guard", x: 31, y: 73 },
        { id: "epidermal", x: 55, y: 73 },
        { id: "root-hair", x: 76, y: 73 },
      ]}
      lang={lang}
    />
  );
}

export function OrganisationVisual({ content, lang }: { content: Chapter2Content; lang: Lang }) {
  const animal = content.organisationExamples.animal.map((label, index) => ({
    id: `animal-${index}`,
    label,
    detail: content.organisationHierarchy[index]?.description,
    group: content.organisationExamples.animalTitle,
  }));
  const plant = content.organisationExamples.plant.map((label, index) => ({
    id: `plant-${index}`,
    label,
    detail: content.organisationHierarchy[index]?.description,
    group: content.organisationExamples.plantTitle,
  }));
  const items = [...animal, ...plant];
  const animalX = [10, 29, 48, 69, 89];
  const plantX = [10, 29, 48, 69, 89];
  return (
    <LearningVisual
      src={levelsOfOrganisationImage}
      alt={
        lang === "en"
          ? "Animal and plant examples across five levels of organisation"
          : "Contoh haiwan dan tumbuhan merentasi lima tahap organisasi"
      }
      items={items}
      markers={[
        ...animal.map((item, index) => ({ id: item.id, x: animalX[index], y: 31 })),
        ...plant.map((item, index) => ({ id: item.id, x: plantX[index], y: 72 })),
      ]}
      lang={lang}
    >
      <div className="mt-3 space-y-2 text-xs font-semibold">
        {[
          {
            title: content.organisationExamples.animalTitle,
            values: content.organisationExamples.animal,
          },
          {
            title: content.organisationExamples.plantTitle,
            values: content.organisationExamples.plant,
          },
        ].map((path) => (
          <div key={path.title} className="rounded-xl border border-white/15 bg-white/5 p-3">
            <span className="block text-cyan-200">{path.title}</span>
            <span className="mt-1 block leading-relaxed text-white">{path.values.join(" → ")}</span>
          </div>
        ))}
      </div>
    </LearningVisual>
  );
}

export function PhotosynthesisVisual({
  content,
  area,
  lang,
}: {
  content: Chapter2Content;
  area?: LocalizedChapter2PracticalArea;
  lang: Lang;
}) {
  const starch = area?.investigations?.find((item) => item.id === "starch");
  const requirements = content.photosynthesis.requirements.map((label, index) => ({
    id: `requirement-${index}`,
    label,
    detail: content.photosynthesis.definition,
    group: COPY[lang].photosynthesis,
  }));
  const steps = (starch?.visualSteps ?? []).map((label, index) => ({
    id: `starch-${index}`,
    label,
    detail: index === 4 ? starch?.observeInfer : starch?.setup,
    group: starch?.title,
  }));
  return (
    <LearningVisual
      src={photosynthesisStarchTestImage}
      alt={
        lang === "en"
          ? "Plant photosynthesis requirements and the five-stage leaf starch test"
          : "Keperluan fotosintesis tumbuhan dan ujian kanji daun lima peringkat"
      }
      items={[...requirements, ...steps]}
      markers={[
        { id: "requirement-0", x: 9, y: 15 },
        { id: "requirement-1", x: 35, y: 31 },
        { id: "requirement-2", x: 14, y: 78 },
        { id: "requirement-3", x: 29, y: 47 },
        { id: "starch-0", x: 45, y: 54 },
        { id: "starch-1", x: 58, y: 52 },
        { id: "starch-2", x: 72, y: 54 },
        { id: "starch-3", x: 84, y: 55 },
        { id: "starch-4", x: 95, y: 56 },
      ]}
      lang={lang}
    >
      <p className="mt-3 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3 text-xs leading-relaxed text-amber-100">
        {area?.practicalNotice ?? COPY[lang].visualGuide}
      </p>
    </LearningVisual>
  );
}

export function BodySystemsVisual({ content, lang }: { content: Chapter2Content; lang: Lang }) {
  const items = useMemo(
    () =>
      content.bodySystems.map((system, index) => ({
        id: `system-${index}`,
        label: system.name,
        detail: `${COPY[lang].organs}: ${system.organs}. ${COPY[lang].function}: ${system.function}`,
      })),
    [content.bodySystems, lang],
  );
  const coordinates = [
    [76, 29],
    [62, 28],
    [24, 69],
    [22, 29],
    [63, 69],
    [91, 69],
    [10, 28],
    [36, 69],
    [90, 28],
    [77, 69],
    [10, 69],
  ];
  return (
    <LearningVisual
      src={humanBodySystemsImage}
      alt={
        lang === "en"
          ? "Eleven human body systems surrounding a human figure"
          : "Sebelas sistem badan manusia mengelilingi figura manusia"
      }
      items={items}
      markers={items.map((item, index) => ({
        id: item.id,
        x: coordinates[index][0],
        y: coordinates[index][1],
      }))}
      lang={lang}
    >
      <p className="mt-3 text-xs leading-relaxed text-slate-300">{COPY[lang].systems}</p>
    </LearningVisual>
  );
}
