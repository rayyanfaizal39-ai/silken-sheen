import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { NOVA_PERSONALITIES } from "@/companion/personality";
import { useNovaBond } from "@/companion/useNovaBond";
import "@/companion/novaPersonality.css";

export function HomeNovaBond() {
  const { progress } = useProgress();
  const { bond, loading } = useNovaBond();
  if (loading || (progress.companion && progress.companion.id !== "nova"))
    return null;

  return (
    <section
      className="nova-bond-invite"
      aria-labelledby="nova-bond-invite-title"
    >
      <span className="nova-bond-invite__icon" aria-hidden="true">
        <Sparkles />
      </span>
      <div className="nova-bond-invite__copy">
        <p>
          {bond
            ? `${NOVA_PERSONALITIES[bond.personality].trait} spark · ${bond.name}`
            : "Your cosmic connection"}
        </p>
        <h2 id="nova-bond-invite-title">
          {bond
            ? NOVA_PERSONALITIES[bond.personality].greeting
            : "Discover your Nova"}
        </h2>
        {!bond && (
          <span>
            Five little choices. Meet your companion and give it a name.
          </span>
        )}
      </div>
      <Link
        to="/companion"
        search={bond ? {} : { intro: true }}
        className="nova-bond-invite__link"
      >
        {bond ? "Visit Nova" : "Meet my Nova"}
        <ArrowRight aria-hidden="true" />
      </Link>
    </section>
  );
}
