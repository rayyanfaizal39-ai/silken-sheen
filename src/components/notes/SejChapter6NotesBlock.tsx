import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type {
  AthensAdministrationBody,
  Sej6Content,
} from "@/content/form1/sejarah/chapter-6/sej6-content";
import { ChipRow } from "./blocks/ChipRow";
import { FactGrid } from "./blocks/FactGrid";
import { DataTable } from "./blocks/DataTable";
import { PolisPopulationBars } from "./blocks/PolisPopulationBars";
import { GovernmentSystemCards } from "./blocks/GovernmentSystemCards";
import { DewanHierarchyTree } from "./blocks/DewanHierarchyTree";
import { RomanEraTimeline } from "./blocks/RomanEraTimeline";
import { ArchBuildingCards } from "./blocks/ArchBuildingCards";
import { bgPanel, groupGlow, neon } from "./blocks/neon-tokens";
import polisTamadunYunani from "@/assets/form1-content/polis-tamadun-yunani.png";
import seniBinaTamadunRom from "@/assets/form1-content/seni-bina-tamadun-rom.png";

const POLIS_VALUES: Record<string, number> = { Athens: 40000, Sparta: 16000, Corinth: 10000 };

function Subheading({ children }: { children: string }) {
  return (
    <h3 className="font-display text-base font-bold text-foreground sm:text-lg">{children}</h3>
  );
}

function Prose({ children }: { children: string }) {
  return <p className="text-[13.5px] leading-relaxed text-muted-foreground">{children}</p>;
}

function AthensBodyCard({ body }: { body: AthensAdministrationBody }) {
  return (
    <article className="rounded-2xl border border-border bg-secondary/20 p-4 sm:p-5">
      <h4 className="font-display text-sm font-bold text-foreground sm:text-base">{body.name}</h4>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{body.description}</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <h5 className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">
            Keanggotaan
          </h5>
          <ul className="space-y-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
            {body.membership.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-primary">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">Fungsi</h5>
          <ul className="space-y-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
            {body.functions.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-primary">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function SejChapter6NotesBlock({
  id,
  content,
  storageKey,
  isRead,
  onMarkRead,
  initialSection = 0,
}: {
  id?: string;
  content: Sej6Content;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
  initialSection?: number;
}) {
  const total = content.officialSubtopics.length + 1;
  const stateKey = storageKey ? `${storageKey}:sej-c6-section` : undefined;
  const [current, setCurrent] = useState(() => Math.max(0, Math.min(initialSection, total - 1)));

  useEffect(() => {
    if (!stateKey) return;
    const saved = window.sessionStorage.getItem(stateKey);
    const parsed = saved ? Number(saved) : 0;
    if (Number.isFinite(parsed)) setCurrent(Math.max(0, Math.min(parsed, total - 1)));
  }, [stateKey, total]);

  useEffect(() => {
    if (stateKey) window.sessionStorage.setItem(stateKey, String(current));
  }, [current, stateKey]);

  const isSummary = current === content.officialSubtopics.length;
  const officialSubtopic = isSummary ? undefined : content.officialSubtopics[current];
  const title = officialSubtopic?.title ?? content.summary.title;
  const eyebrow = officialSubtopic?.number ?? content.summary.title;
  const isLast = current === total - 1;
  const navigationItems = [
    ...content.officialSubtopics.map((subtopic) => ({
      label: `${subtopic.number} ${subtopic.navigationLabel}`,
      number: subtopic.number,
    })),
    { label: content.summary.title, number: undefined },
  ];

  function go(dir: number) {
    setCurrent((value) => Math.max(0, Math.min(total - 1, value + dir)));
  }

  return (
    <section id={id} className="mt-8 animate-fade-up">
      <nav
        aria-label="Laluan Bab 6"
        className="mb-6 flex items-stretch justify-between gap-2 overflow-x-auto pb-1"
      >
        {navigationItems.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setCurrent(index)}
            aria-current={index === current ? "step" : undefined}
            data-official-subtopic={item.number}
            data-summary-section={item.number ? undefined : "true"}
            className="flex min-h-14 min-w-24 shrink-0 flex-col items-center justify-start gap-1.5 px-1"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all ${
                index < current
                  ? "border-transparent bg-gradient-to-br from-primary to-accent text-white"
                  : index === current
                    ? "border-primary text-primary shadow-[0_0_0_4px_rgba(59,130,246,0.16)]"
                    : "border-border text-muted-foreground"
              }`}
            >
              {index < current ? (
                <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={`max-w-32 text-center text-[10px] leading-tight ${
                index === current ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8"
        data-section-number={officialSubtopic?.number}
        data-summary-section={isSummary ? "true" : undefined}
      >
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</p>
        <h2 className="font-display mb-6 text-xl font-bold text-foreground sm:text-2xl">{title}</h2>

        {current === 0 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Subheading>{content.greekCivilisation.introductionHeading}</Subheading>
              <Prose>{content.greekCivilisation.introduction}</Prose>
            </div>
            <div className="space-y-2">
              <Subheading>{content.greekCivilisation.locationHeading}</Subheading>
              {content.greekCivilisation.location.map((paragraph) => (
                <Prose key={paragraph}>{paragraph}</Prose>
              ))}
            </div>
            <div className="space-y-4">
              <Subheading>{content.greekCivilisation.polis.heading}</Subheading>
              <Prose>{content.greekCivilisation.polis.definition}</Prose>
              <Prose>{content.greekCivilisation.polis.acropolis}</Prose>
              <Prose>{content.greekCivilisation.polis.agora}</Prose>
              <div data-visual="polis-image">
                <img
                  src={polisTamadunYunani}
                  alt="Polis dalam Tamadun Yunani"
                  className="notes-figure-img rounded-2xl border border-border"
                />
              </div>
              <div data-visual="polis-comparison">
                <PolisPopulationBars
                  items={content.greekCivilisation.polis.famousPolis.map((polis) => ({
                    name: polis.name,
                    population: polis.population,
                    populationValue: POLIS_VALUES[polis.name] ?? 0,
                  }))}
                />
              </div>
              <p className="text-center text-[11px] text-muted-foreground">
                Keluasan:{" "}
                {content.greekCivilisation.polis.famousPolis
                  .map((polis) => `${polis.name} ${polis.area}`)
                  .join(" · ")}
              </p>
              <Prose>{content.greekCivilisation.polis.civicMeaning}</Prose>
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="space-y-8">
            <Prose>{content.greekGovernment.introduction}</Prose>
            <div className="space-y-4" data-visual="government-system-visual">
              <Subheading>Lima Sistem Pemerintahan</Subheading>
              <GovernmentSystemCards systems={content.greekGovernment.fiveSystems} />
            </div>
            <div className="space-y-3">
              <Subheading>{content.greekGovernment.athensDemocracy.heading}</Subheading>
              <Prose>{content.greekGovernment.athensDemocracy.development}</Prose>
              <Prose>{content.greekGovernment.athensDemocracy.type}</Prose>
              <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                {content.greekGovernment.athensDemocracy.founder} (
                {content.greekGovernment.athensDemocracy.founderDate}) ·{" "}
                {content.greekGovernment.athensDemocracy.pericles} ·{" "}
                {content.greekGovernment.athensDemocracy.end}
              </p>
            </div>
            <div className="space-y-5">
              <Subheading>{content.greekGovernment.athensAdministration.heading}</Subheading>
              <div data-visual="dewan-hierarchy-visual">
                <DewanHierarchyTree
                  top={`${content.greekGovernment.athensAdministration.hierarchy[0]} (badan tertinggi)`}
                  items={content.greekGovernment.athensAdministration.hierarchy.slice(1)}
                />
              </div>
              <div className="space-y-4">
                {content.greekGovernment.athensAdministration.bodies.map((body) => (
                  <AthensBodyCard key={body.name} body={body} />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Subheading>{content.greekGovernment.spartaAdministration.heading}</Subheading>
              <Prose>{content.greekGovernment.spartaAdministration.system}</Prose>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-secondary/20 p-4">
                  <h4 className="text-sm font-bold text-foreground">Dua orang raja</h4>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {content.greekGovernment.spartaAdministration.kings.purpose} Kedua-dua raja
                    datang daripada keluarga{" "}
                    {content.greekGovernment.spartaAdministration.kings.families.join(" dan ")}.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/20 p-4">
                  <h4 className="text-sm font-bold text-foreground">
                    {content.greekGovernment.spartaAdministration.assembly.name}
                  </h4>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {content.greekGovernment.spartaAdministration.assembly.membership}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/20 p-4">
                  <h4 className="text-sm font-bold text-foreground">Ephors</h4>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {content.greekGovernment.spartaAdministration.ephors.function}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/20 p-4">
                  <h4 className="text-sm font-bold text-foreground">
                    {content.greekGovernment.spartaAdministration.council.name}
                  </h4>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {content.greekGovernment.spartaAdministration.council.membership}{" "}
                    {content.greekGovernment.spartaAdministration.council.age}{" "}
                    {content.greekGovernment.spartaAdministration.council.term}
                  </p>
                </div>
              </div>
              <ChipRow items={content.greekGovernment.spartaAdministration.militaryDiscipline} />
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Subheading>{content.romanCivilisation.introductionHeading}</Subheading>
              <Prose>{content.romanCivilisation.introduction}</Prose>
              <ChipRow
                heading="Pesaing-pesaing yang wujud"
                items={content.romanCivilisation.rivals}
              />
            </div>
            <div className="space-y-2">
              <Subheading>{content.romanCivilisation.locationHeading}</Subheading>
              <Prose>{content.romanCivilisation.latium}</Prose>
              <Prose>{content.romanCivilisation.tiber}</Prose>
            </div>
            <div data-visual="roman-era-timeline">
              <RomanEraTimeline eras={content.romanCivilisation.eras} />
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: bgPanel, boxShadow: groupGlow(neon.amber, 16, 0.15) }}
            >
              <p className="text-[12.5px] font-bold" style={{ color: neon.amber }}>
                {content.romanCivilisation.paxRomana}
              </p>
            </div>
            <div className="space-y-3">
              <Subheading>Masyarakat dalam Tamadun Rom</Subheading>
              <DataTable
                headers={["Kelompok", "Komposisi"]}
                rows={content.romanCivilisation.socialGroups.map((group) => [
                  group.name,
                  group.composition,
                ])}
              />
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="space-y-7">
            <div className="space-y-2">
              {content.romanArchitecture.introduction.map((paragraph) => (
                <Prose key={paragraph}>{paragraph}</Prose>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.romanArchitecture.factors.map((factor) => (
                <article
                  key={factor.name}
                  className="rounded-xl border border-border bg-secondary/20 p-4"
                >
                  <h3 className="font-display text-sm font-bold text-foreground">{factor.name}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
                    {factor.detail}
                  </p>
                </article>
              ))}
            </div>
            <div data-visual="roman-architecture-image">
              <img
                src={seniBinaTamadunRom}
                alt="Seni bina Tamadun Rom"
                className="notes-figure-img rounded-2xl border border-border"
              />
            </div>
            <div className="space-y-3">
              <Subheading>{content.romanArchitecture.characteristicsHeading}</Subheading>
              <Prose>{content.romanArchitecture.characteristicsIntroduction}</Prose>
              <ChipRow items={content.romanArchitecture.characteristics} />
            </div>
            <div data-visual="roman-architecture-cards">
              <ArchBuildingCards buildings={content.romanArchitecture.buildings} />
            </div>
          </div>
        )}

        {current === 4 && (
          <div className="space-y-6">
            <FactGrid heading={content.summary.greekHeading} facts={content.summary.greek} />
            <FactGrid heading={content.summary.romanHeading} facts={content.summary.roman} />
            <Prose>{content.summary.conclusion}</Prose>
            {onMarkRead && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={onMarkRead}
                  disabled={isRead}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    isRead
                      ? "cursor-default bg-emerald-500/20 text-emerald-200"
                      : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105"
                  }`}
                >
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                  {isRead ? "Selesai ditanda" : "Tandakan Bab 6 Selesai"}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={current === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" /> Kembali
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Seksyen seterusnya <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
