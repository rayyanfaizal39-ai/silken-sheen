import type { ComponentType, CSSProperties } from "react";
import {
  Anchor,
  Archive,
  Badge,
  Bird,
  Blocks,
  BookOpen,
  Building2,
  Castle,
  CheckCircle2,
  CircleDot,
  Clock3,
  Coins,
  Columns3,
  Compass,
  Crown,
  Factory,
  FileSignature,
  Footprints,
  Gem,
  Handshake,
  Landmark,
  Map,
  MapPinned,
  Mountain,
  Navigation,
  Route,
  Sailboat,
  Scale,
  ScrollText,
  Search,
  Shield,
  Ship,
  Snowflake,
  Stamp,
  Sword,
  TentTree,
  Trees,
  UsersRound,
  Waves,
  Wheat,
} from "lucide-react";

import type { Form } from "@/data/subjects-meta";
import {
  getSejarahChapterTheme,
  type SejarahChapterTheme,
  type SejarahMotif,
} from "@/data/sejarahChapterThemes";

type ArchiveIcon = ComponentType<{ className?: string; strokeWidth?: number }>;

const motifIcons: Record<SejarahMotif, readonly [ArchiveIcon, ArchiveIcon, ArchiveIcon]> = {
  archive: [Archive, Search, ScrollText],
  glacier: [Snowflake, Mountain, Map],
  prehistoric: [Footprints, TentTree, Mountain],
  civilisation: [Landmark, Blocks, ScrollText],
  "ancient-world": [MapPinned, Landmark, CircleDot],
  classical: [Columns3, Scale, Landmark],
  "asian-empires": [Castle, ScrollText, Map],
  "islamic-world": [BookOpen, Landmark, CircleDot],
  "maritime-kingdom": [Ship, MapPinned, Waves],
  "royal-economy": [Crown, Wheat, Coins],
  "court-culture": [UsersRound, ScrollText, Landmark],
  "sacred-heritage": [Landmark, CircleDot, ScrollText],
  "melaka-port": [Sailboat, Anchor, Coins],
  "johor-riau": [Ship, Waves, Crown],
  "royal-states": [Crown, Castle, ScrollText],
  "northern-states": [MapPinned, Castle, Badge],
  "living-heritage": [Gem, ScrollText, Crown],
  borneo: [Bird, Trees, Waves],
  "western-arrival": [Compass, Navigation, Ship],
  "straits-settlements": [Anchor, Building2, Map],
  "federated-states": [Route, Building2, FileSignature],
  "unfederated-states": [Stamp, MapPinned, Shield],
  "borneo-administration": [Bird, FileSignature, Map],
  "colonial-economy": [Factory, Coins, Route],
  "local-resistance": [Sword, Shield, Footprints],
  "royal-diplomacy": [Handshake, Crown, FileSignature],
};

function chapterNumber(chapterKey: string) {
  return chapterKey.match(/\d+/)?.[0] ?? chapterKey;
}

export function SejarahChapterHero({
  form,
  chapterKey,
  title,
  readingProgress,
  chapterProgress,
  isRead,
}: {
  form: Form;
  chapterKey: string;
  title: string;
  readingProgress: number;
  chapterProgress: number;
  isRead: boolean;
}) {
  const theme = getSejarahChapterTheme(form, chapterKey);
  if (!theme) return null;

  const resolvedProgress = Math.max(
    0,
    Math.min(100, Math.round(Math.max(readingProgress, chapterProgress))),
  );
  const style = {
    "--sejarah-accent": theme.accent,
    "--sejarah-accent-soft": theme.accentSoft,
  } as CSSProperties;

  return (
    <section
      className="sejarah-chapter-hero"
      style={style}
      aria-labelledby="sejarah-chapter-title"
      data-sejarah-chapter-hero
      data-form={form}
      data-chapter={chapterKey}
      data-motif={theme.motif}
      data-layout="compact"
    >
      <div className="sejarah-hero-map-lines" aria-hidden="true" />
      <div className="sejarah-hero-dust" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="sejarah-hero-main">
        <div className="sejarah-hero-copy">
          <div className="sejarah-archive-status">
            <Archive className="h-4 w-4" aria-hidden="true" />
            <span>Arkib Sejarah</span>
            <span className="sejarah-status-dot" aria-hidden="true" />
            <span>{theme.archiveCode}</span>
          </div>

          <p className="sejarah-hero-eyebrow">{theme.eyebrow}</p>
          <div className="sejarah-title-lockup">
            <span
              className="sejarah-chapter-number"
              aria-label={`Bab ${chapterNumber(chapterKey)}`}
            >
              {chapterNumber(chapterKey).padStart(2, "0")}
            </span>
            <div>
              <p className="sejarah-form-label">{form.replace("Form", "Tingkatan")}</p>
              <h1 id="sejarah-chapter-title">{title}</h1>
            </div>
          </div>
          <p className="sejarah-hero-description">{theme.description}</p>

          <div className="sejarah-metadata-row" aria-label="Maklumat bab">
            <span>
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Nota KSSM
            </span>
            <span>
              <MapPinned className="h-4 w-4" aria-hidden="true" />
              {theme.category}
            </span>
            {isRead && (
              <span className="is-complete">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Selesai dibaca
              </span>
            )}
          </div>
        </div>

        <SejarahChapterIllustration theme={theme} />
      </div>

      <SejarahProgressPanel progress={resolvedProgress} isRead={isRead} />
    </section>
  );
}

export function SejarahChapterIllustration({ theme }: { theme: SejarahChapterTheme }) {
  const [PrimaryIcon, SecondaryIcon, TertiaryIcon] = motifIcons[theme.motif];

  return (
    <div className="sejarah-chapter-illustration" aria-hidden="true">
      <div className="sejarah-display-plaque">
        <span>KOLEKSI</span>
        <strong>{theme.archiveCode}</strong>
      </div>
      <div className="sejarah-archive-ring ring-outer" />
      <div className="sejarah-archive-ring ring-inner" />
      <div className="sejarah-illustration-orbit orbit-one">
        <SecondaryIcon />
      </div>
      <div className="sejarah-illustration-orbit orbit-two">
        <TertiaryIcon />
      </div>
      <div className="sejarah-primary-artefact">
        <PrimaryIcon strokeWidth={1.35} />
      </div>
      <div className="sejarah-museum-rule" />
      <div className="sejarah-decoration-labels">
        {theme.decorations.map((label, index) => (
          <span key={label} data-index={index + 1}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SejarahProgressPanel({ progress, isRead }: { progress: number; isRead: boolean }) {
  return (
    <div className="sejarah-progress-panel" aria-label={`Kemajuan bacaan ${progress}%`}>
      <div className="sejarah-progress-heading">
        <span className="sejarah-progress-icon">
          {isRead ? <CheckCircle2 aria-hidden="true" /> : <Clock3 aria-hidden="true" />}
        </span>
        <div>
          <p>Kemajuan bacaan</p>
          <span>
            {isRead ? "Bab telah ditandakan selesai" : "Disimpan daripada bacaan sebenar anda"}
          </span>
        </div>
      </div>
      <div className="sejarah-progress-value">
        <strong>{progress}%</strong>
        <div className="sejarah-progress-track" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  );
}
