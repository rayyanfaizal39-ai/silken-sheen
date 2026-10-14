import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, RotateCcw, Sparkles, Stars } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { CompanionImage } from "@/companion";
import { seoMeta } from "@/lib/seo";
import {
  ARCHETYPES, PALETTES, PERSONALITY_COLORS, generatePhase1Previews,
  type Archetype, type PreviewCard,
} from "@/features/companion-cards/phase1";
import "./companion-cards-preview.css";

export const Route = createFileRoute("/companion-cards-preview")({
  head: () => seoMeta({
    title: "Nova Card Design Lab — Prototype",
    description: "Design review for the AcadeMY Nova companion-card system.",
    path: "/companion-cards-preview",
    noindex: true,
  }),
  component: CompanionCardsPreview,
});

const DEMOS = generatePhase1Previews();
type Filter = "all" | Archetype;

function stylesFor(card: PreviewCard): CSSProperties {
  const palette = PALETTES.find((item) => item.id === card.design.paletteId) ?? PALETTES[0];
  return {
    "--nova-card-glow": palette.hex,
    "--nova-card-persona": PERSONALITY_COLORS[card.design.archetype],
  } as CSSProperties;
}

function label(value: string) {
  return value.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
}

function CompanionCardsPreview() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const selected = DEMOS[selectedIndex];
  const filtered = filter === "all" ? DEMOS : DEMOS.filter((card) => card.design.archetype === filter);
  const withinFilter = filtered.findIndex((card) => card.index === selectedIndex);

  function select(index: number) {
    setSelectedIndex(index);
    setFlipped(false);
  }
  function applyFilter(next: Filter) {
    setFilter(next);
    const first = next === "all" ? DEMOS[0] : DEMOS.find((card) => card.design.archetype === next);
    if (first) select(first.index);
  }
  function step(direction: -1 | 1) {
    const index = withinFilter < 0 ? 0 : withinFilter;
    select(filtered[(index + direction + filtered.length) % filtered.length].index);
  }

  return (
    <main className="nova-card-lab">
      <div className="nova-card-lab-inner">
        <header className="nova-lab-header">
          <a href="/companion" className="nova-lab-back-link"><ArrowLeft size={17} /> Existing Companion</a>
          <span className="nova-lab-eyebrow"><Sparkles size={15} /> AcadeMY · Nova Collection</span>
          <h1>The Companion Card Design Lab</h1>
          <p>One Nova identity. Four learning styles. Twenty distinct design combinations.</p>
          <div className="nova-lab-prototype-note" role="status">
            <Stars size={18} aria-hidden="true" />
            Design prototype only — no card is issued, saved or shareable yet. The existing Nova companion and XP remain unchanged.
          </div>
        </header>

        <section className="nova-lab-showcase" aria-label="Selected prototype card">
          <div className="nova-lab-hero-area">
            <div className="nova-lab-card-wrap">
              <div className="nova-lab-card" style={stylesFor(selected)}>
                {!flipped ? (
                  <div className={"nova-lab-face nova-lab-front nova-scene-" + selected.design.scene}>
                    <div className="nova-lab-card-top">
                      <div className="nova-lab-brand"><span className="nova-lab-brand-symbol">✦</span><strong>AcadeMY</strong><small>NOVA COMPANION</small></div>
                      <div className="nova-lab-personality"><span>✧</span>{label(selected.design.archetype)}</div>
                    </div>
                    <div className="nova-lab-character">
                      <div className="nova-lab-aura" aria-hidden="true" />
                      <div className="nova-lab-orbit nova-lab-orbit-one" aria-hidden="true" />
                      <div className="nova-lab-orbit nova-lab-orbit-two" aria-hidden="true" />
                      <CompanionImage speciesId="nova" stage="cadet" size={250} />
                      <span className="nova-lab-marking" aria-label={"Cosmetic marking: " + label(selected.design.marking)}>✦ {label(selected.design.marking)}</span>
                    </div>
                    <div className="nova-lab-nameplate">
                      <span className="nova-lab-type">NOVA · CONCEPT {String(selected.index + 1).padStart(2, "0")}</span>
                      <h2>{selected.nickname}</h2>
                      <p>{label(selected.design.archetype)} · {label(selected.design.paletteId)}</p>
                      <div className="nova-lab-card-stats">
                        <span><strong>✶</strong>{label(selected.design.scene)}<small>WORLD</small></span>
                        <span><strong>◇</strong>{label(selected.design.accessory)}<small>ACCESSORY</small></span>
                        <span><strong>◈</strong>Concept<small>NOT ISSUED</small></span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="nova-lab-face nova-lab-reverse">
                    <div className="nova-lab-card-top">
                      <div className="nova-lab-brand"><span className="nova-lab-brand-symbol">✦</span><strong>AcadeMY</strong><small>NOVA COMPANION</small></div>
                      <div className="nova-lab-personality">DESIGN LAB</div>
                    </div>
                    <div className="nova-lab-back-content">
                      <span className="nova-lab-type">MEET {selected.nickname.toUpperCase()}</span>
                      <h2>Every companion has a story.</h2>
                      <p>This design uses Nova's existing artwork. Its personality, markings and world come from approved cosmetic slots.</p>
                      <dl>
                        <div><dt>Personality</dt><dd>{label(selected.design.archetype)}</dd></div>
                        <div><dt>Palette</dt><dd>{label(selected.design.paletteId)}</dd></div>
                        <div><dt>Marking</dt><dd>{label(selected.design.marking)}</dd></div>
                        <div><dt>Accessory</dt><dd>{label(selected.design.accessory)}</dd></div>
                        <div><dt>Background</dt><dd>{label(selected.design.scene)}</dd></div>
                      </dl>
                      <div className="nova-lab-qr-pending"><span aria-hidden="true">▧</span><strong>Personal QR coming in Phase 2</strong><small>No public URL or QR is issued by this preview.</small></div>
                    </div>
                    <p className="nova-lab-footnote">LEARN ✦ GROW ✦ EXPLORE ✦ BELONG</p>
                  </div>
                )}
              </div>
            </div>
            <div className="nova-lab-card-controls">
              <button type="button" onClick={() => step(-1)} aria-label="Previous preview"><ChevronLeft size={20} /></button>
              <button type="button" className="nova-lab-flip" onClick={() => setFlipped((value) => !value)}><RotateCcw size={17} /> {flipped ? "View front" : "View back"}</button>
              <button type="button" onClick={() => step(1)} aria-label="Next preview"><ChevronRight size={20} /></button>
            </div>
          </div>

          <aside className="nova-lab-info">
            <span className="nova-lab-count">01 / Phase 1 proof</span>
            <h2>One system. A card that feels like yours.</h2>
            <p>Each preview is built from a versioned Nova master, a learning-style accent, a colour palette and approved cosmetic choices. No second creature or random AI regeneration is required.</p>
            <div className="nova-lab-rule"><Check size={18}/><div><strong>Same recognizable Nova</strong><span>Designed to preserve the current companion and XP-evolution identity.</span></div></div>
            <div className="nova-lab-rule"><Check size={18}/><div><strong>Twenty unique configurations</strong><span>Every pair differs in at least three prominent design slots.</span></div></div>
            <div className="nova-lab-rule"><Check size={18}/><div><strong>Permanent link later</strong><span>Phase 2 will issue one random card token per student; never one webpage per student.</span></div></div>
            <div className="nova-lab-rule"><Check size={18}/><div><strong>Personalization without profiling</strong><span>Ten scenario questions select a style. Optional zodiac is only visual inspiration.</span></div></div>
            <p className="nova-lab-caveat">Preview uses the existing Nova cadet artwork and sample names. Final transparent layer masks, rarity rules and QR security require approval before release.</p>
          </aside>
        </section>

        <section className="nova-lab-gallery" aria-label="All prototype cards">
          <div className="nova-lab-gallery-head"><div><span className="nova-lab-count">Design variations</span><h2>Explore the collection</h2></div><p>{filtered.length} concept cards</p></div>
          <div className="nova-lab-filters" role="group" aria-label="Filter cards by personality">
            <button type="button" onClick={() => applyFilter("all")} aria-pressed={filter === "all"}>All · 20</button>
            {ARCHETYPES.map((item) => <button key={item} type="button" onClick={() => applyFilter(item)} aria-pressed={filter === item}>{label(item)}</button>)}
          </div>
          <div className="nova-lab-grid">
            {filtered.map((card) => (
              <button
                key={card.index}
                type="button"
                className={"nova-lab-mini" + (selectedIndex === card.index ? " is-selected" : "")}
                aria-pressed={selectedIndex === card.index}
                onClick={() => select(card.index)}
                style={stylesFor(card)}
              >
                <span className="nova-lab-mini-art"><CompanionImage speciesId="nova" stage="cadet" size={78}/></span>
                <span className="nova-lab-mini-name">{card.nickname}</span>
                <span className="nova-lab-mini-style">{label(card.design.archetype)} · {label(card.design.paletteId)}</span>
              </button>
            ))}
          </div>
        </section>
        <footer className="nova-lab-footer">AcadeMY Nova Collection · Internal design proposal · No student information stored</footer>
      </div>
    </main>
  );
}
