import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpenCheck, Clock3, Sparkles } from "lucide-react";
import { useNotesProgressScope } from "@/hooks/use-notes-reading-progress";
import { GRAMMAR_PROGRESS_SCOPE, grammarTopics, type GrammarTopic } from "./grammar-content";
import "./grammar-missions.css";

function topicStatus(progress: number) {
  if (progress >= 100) return "Completed";
  if (progress > 0) return "In Progress";
  return "New";
}

function GrammarTopicCard({ topic, progress }: { topic: GrammarTopic; progress: number }) {
  const status = topicStatus(progress);
  const content = (
    <>
      <span className="grammar-topic-card__glow" aria-hidden="true" />
      <div className="grammar-topic-card__meta">
        <span>Topic {topic.id}</span>
        <span
          className={`grammar-status grammar-status--${status.toLowerCase().replace(" ", "-")}`}
        >
          {status}
        </span>
      </div>
      <div className="grammar-topic-card__art">
        <img
          src={topic.artwork}
          alt=""
          width="720"
          height="480"
          loading={topic.id === "01" || topic.id === "02" ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="grammar-topic-card__content">
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
        <div
          className="grammar-progress"
          role="progressbar"
          aria-label={`${topic.title} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <span className={`grammar-topic-card__action${topic.implemented ? "" : " is-muted"}`}>
          {topic.implemented
            ? progress > 0
              ? "Continue mission"
              : "Start mission"
            : "Lesson coming soon"}
          {topic.implemented && <ArrowRight aria-hidden="true" />}
        </span>
      </div>
    </>
  );

  if (!topic.implemented) {
    return (
      <article
        className={`grammar-topic-card grammar-accent--${topic.accent}`}
        aria-label={`${topic.title}, coming soon`}
      >
        {content}
      </article>
    );
  }

  return (
    <Link
      to="/english/form-1/grammar"
      search={{ topic: topic.id }}
      className={`grammar-topic-card grammar-accent--${topic.accent}`}
      aria-label={`${progress > 0 ? "Continue" : "Start"} ${topic.title}`}
    >
      {content}
    </Link>
  );
}

export function GrammarMissionHub() {
  const { progress, loading } = useNotesProgressScope(GRAMMAR_PROGRESS_SCOPE);
  const completed = grammarTopics.filter(
    (topic) => (progress[topic.progressKey] ?? 0) >= 100,
  ).length;
  const started = grammarTopics.filter((topic) => {
    const value = progress[topic.progressKey] ?? 0;
    return value > 0 && value < 100;
  }).length;

  return (
    <main className="grammar-shell">
      <div className="grammar-stars" aria-hidden="true" />
      <div className="grammar-container">
        <nav className="grammar-breadcrumb" aria-label="Breadcrumb">
          <Link to="/notes" search={{ subject: "english", form: 1 }}>
            <ArrowLeft aria-hidden="true" />
            Form 1 English
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Grammar</span>
        </nav>

        <header className="grammar-hub-hero">
          <span className="grammar-kicker">
            <Sparkles aria-hidden="true" /> Grammar mission
          </span>
          <h1>Grammar Mission</h1>
          <p className="grammar-hub-hero__lead">
            Master the building blocks of English, one skill at a time.
          </p>
          <p className="grammar-hub-hero__support">
            Learn the rule, see how it works, avoid common mistakes, and use it confidently.
          </p>
          <div className="grammar-hub-stats" aria-label="Grammar mission progress">
            <div>
              <strong>{completed}/10</strong>
              <span>Missions complete</span>
            </div>
            <div>
              <strong>{started}</strong>
              <span>In progress</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Lessons ready</span>
            </div>
          </div>
        </header>

        <div className="grammar-section-heading">
          <div>
            <span className="grammar-section-heading__icon">
              <BookOpenCheck aria-hidden="true" />
            </span>
            <div>
              <h2>Choose your mission</h2>
              <p>Open any available lesson for learning or revision.</p>
            </div>
          </div>
          <span>
            <Clock3 aria-hidden="true" /> 10 grammar topics
          </span>
        </div>

        <section
          className={`grammar-topic-grid${loading ? " is-loading" : ""}`}
          aria-label="Grammar topics"
          aria-busy={loading}
        >
          {grammarTopics.map((topic) => (
            <GrammarTopicCard
              key={topic.id}
              topic={topic}
              progress={progress[topic.progressKey] ?? 0}
            />
          ))}
        </section>

        <aside className="grammar-ace-note">
          <span aria-hidden="true">
            <Sparkles />
          </span>
          <p>
            <strong>Ace says:</strong> Pick up where you left off, or explore any available mission
            whenever you are ready.
          </p>
        </aside>
      </div>
    </main>
  );
}
