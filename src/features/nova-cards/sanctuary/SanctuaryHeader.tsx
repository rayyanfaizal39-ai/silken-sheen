import { AudioControls } from "./AudioControls";
import { academyHomeHref, cardsPaths } from "../paths";
export function SanctuaryHeader({
  calm,
  onCalm,
  section,
}: {
  calm: boolean;
  onCalm: () => void;
  section: string;
}) {
  return (
    <header className="sanctuary-header">
      <a className="sanctuary-brand" href={cardsPaths.home}>
        <img src="/branding/academy-icon.png" alt="AcadeMY" width="32" height="32" />
        <span>Nova Studio</span>
      </a>
      <nav aria-label="Your Nova journey">
        <span aria-current={section === "Discovery" ? "step" : undefined}>Discovery</span>
        <i aria-hidden="true">·</i>
        <span aria-current={section === "Awakening" ? "step" : undefined}>Awakening</span>
        <i aria-hidden="true">·</i>
        <span aria-current={section === "My Nova" ? "step" : undefined}>My Nova</span>
      </nav>
      <div className="sanctuary-controls">
        <AudioControls />
        <button aria-pressed={calm} onClick={onCalm} aria-label="Toggle calm motion">
          ◌<span>Calm motion</span>
        </button>
        <a href={academyHomeHref} aria-label="Return to learning">
          ↗<span>Learning</span>
        </a>
      </div>
    </header>
  );
}
