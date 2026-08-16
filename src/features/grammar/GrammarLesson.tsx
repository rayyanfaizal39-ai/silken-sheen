import { useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  CheckCircle2,
  CircleHelp,
  Image as ImageIcon,
  Lightbulb,
  MessageCircle,
  Search,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { useNotesProgressScope, useNotesReadingTracker } from "@/hooks/use-notes-reading-progress";
import {
  GRAMMAR_PROGRESS_SCOPE,
  getGrammarTopic,
  nounsQuickCheck,
  presentQuickCheck,
  type QuickCheckQuestion,
} from "./grammar-content";
import "./grammar-missions.css";

function MissionSection({
  id,
  icon,
  title,
  eyebrow,
  children,
}: {
  id: string;
  icon: ReactNode;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className="grammar-lesson-section" data-notes-section-id={id}>
      <div className="grammar-lesson-section__heading">
        <span aria-hidden="true">{icon}</span>
        <div>
          {eyebrow && <p>{eyebrow}</p>}
          <h2>{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function ConceptGrid({ children }: { children: ReactNode }) {
  return <div className="grammar-concept-grid">{children}</div>;
}

function ConceptCard({
  title,
  label,
  children,
}: {
  title: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <article className="grammar-concept-card">
      {label && <span>{label}</span>}
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  );
}

function Formula({ children }: { children: ReactNode }) {
  return <div className="grammar-formula">{children}</div>;
}

function IllustrationSlot({ label, wide = false }: { label: string; wide?: boolean }) {
  return (
    <div
      className={`grammar-illustration-slot${wide ? " is-wide" : ""}`}
      role="img"
      aria-label={`${label} illustration placeholder`}
    >
      <ImageIcon aria-hidden="true" />
      <span>AcadeMY illustration</span>
      <small>{label}</small>
    </div>
  );
}

function ErrorDetector({
  sentence,
  wrong,
  correction,
  reason,
}: {
  sentence: ReactNode;
  wrong: string;
  correction: string;
  reason: string;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <article className={`grammar-error-card${revealed ? " is-revealed" : ""}`}>
      <div className="grammar-error-card__scan">
        <span /> Error scan
      </div>
      <p>{sentence}</p>
      <button
        type="button"
        onClick={() => setRevealed(true)}
        disabled={revealed}
        aria-expanded={revealed}
      >
        <Search aria-hidden="true" />
        {revealed ? "Correction revealed" : `Inspect “${wrong}”`}
      </button>
      {revealed && (
        <div className="grammar-error-card__answer" role="status">
          <strong>
            <Check aria-hidden="true" /> {correction}
          </strong>
          <span>{reason}</span>
        </div>
      )}
    </article>
  );
}

function QuickCheck({ questions }: { questions: QuickCheckQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = Object.entries(answers).filter(
    ([questionIndex, optionIndex]) =>
      questions[Number(questionIndex)]?.correctIndex === optionIndex,
  ).length;

  return (
    <div className="grammar-quick-check">
      {questions.map((question, questionIndex) => {
        const selected = answers[questionIndex];
        const answered = selected !== undefined;
        const correct = selected === question.correctIndex;
        return (
          <fieldset key={question.question} className="grammar-question-card">
            <legend>
              <span>{questionIndex + 1}</span>
              {question.question}
            </legend>
            <div className="grammar-question-options">
              {question.options.map((option, optionIndex) => {
                const isSelected = selected === optionIndex;
                const isCorrectOption = answered && optionIndex === question.correctIndex;
                const isWrongSelection = answered && isSelected && !isCorrectOption;
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={answered}
                    aria-pressed={isSelected}
                    className={`${isSelected ? "is-selected" : ""}${isCorrectOption ? " is-correct" : ""}${isWrongSelection ? " is-wrong" : ""}`}
                    onClick={() =>
                      setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))
                    }
                  >
                    <span>{String.fromCharCode(65 + optionIndex)}</span>
                    {option}
                    {isCorrectOption && <Check aria-hidden="true" />}
                    {isWrongSelection && <X aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p
                className={`grammar-question-feedback ${correct ? "is-correct" : "is-wrong"}`}
                role="status"
              >
                <strong>{correct ? "Correct." : "Not quite."}</strong> {question.explanation}
              </p>
            )}
          </fieldset>
        );
      })}
      <div className="grammar-check-score" aria-live="polite">
        <CheckCircle2 aria-hidden="true" />
        <span>
          <strong>
            {score}/{questions.length}
          </strong>{" "}
          correct · Answer each card to check your understanding.
        </span>
      </div>
    </div>
  );
}

function NounsLesson() {
  return (
    <>
      <MissionSection
        id="nouns-brief"
        icon={<Target />}
        eyebrow="Mission brief"
        title="Name the world clearly"
      >
        <div className="grammar-brief-card">
          <p>
            Nouns name the people, places, things, and ideas around us. Articles help a reader know
            whether a noun is general, newly introduced, or already identified.
          </p>
          <div className="grammar-pill-row">
            <span>Identify noun types</span>
            <span>Build correct plurals</span>
            <span>Control a, an, the</span>
          </div>
        </div>
      </MissionSection>

      <MissionSection
        id="nouns-big-idea"
        icon={<Lightbulb />}
        eyebrow="Big idea"
        title="A noun gives something a name"
      >
        <ConceptGrid>
          <ConceptCard label="Person" title="Who?">
            <p>student · mother · Dr Lim</p>
          </ConceptCard>
          <ConceptCard label="Place" title="Where?">
            <p>school · beach · Malaysia</p>
          </ConceptCard>
          <ConceptCard label="Thing" title="What?">
            <p>book · phone · backpack</p>
          </ConceptCard>
          <ConceptCard label="Idea" title="What we feel or think">
            <p>hope · courage · happiness</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="nouns-categories"
        icon={<BookOpen />}
        eyebrow="How it works"
        title="Common, proper, concrete, and abstract"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="Common noun" title="A general name">
            <p>a city · a teacher · a river</p>
            <p className="grammar-note">Usually begins with a lowercase letter.</p>
          </ConceptCard>
          <ConceptCard label="Proper noun" title="A specific name">
            <p>Kuala Lumpur · Mr Tan · Sungai Pahang</p>
            <p className="grammar-note">Always begins with a capital letter.</p>
          </ConceptCard>
          <ConceptCard label="Concrete noun" title="You can sense it">
            <p>flower · thunder · chocolate</p>
          </ConceptCard>
          <ConceptCard label="Abstract noun" title="You cannot touch it">
            <p>kindness · fear · freedom</p>
          </ConceptCard>
        </div>
      </MissionSection>

      <MissionSection
        id="nouns-countability"
        icon={<CircleHelp />}
        eyebrow="Compare it"
        title="Countable vs uncountable nouns"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="Countable" title="One, two, three…">
            <p>one apple → two apples</p>
            <p>a chair · many chairs · a few books</p>
          </ConceptCard>
          <ConceptCard label="Uncountable" title="Measure, do not count">
            <p>water · rice · advice · information</p>
            <p>a glass of water · a bowl of rice</p>
          </ConceptCard>
        </div>
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>Watch out:</strong> say “some information” or “a piece of advice”, not “an
            information” or “an advice”.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="nouns-plurals"
        icon={<Sparkles />}
        eyebrow="How it works"
        title="Singular → plural"
      >
        <div className="grammar-rule-table" role="table" aria-label="Plural noun rules">
          <div role="row">
            <strong role="cell">Most nouns</strong>
            <span role="cell">+ s</span>
            <span role="cell">book → books</span>
          </div>
          <div role="row">
            <strong role="cell">Ends in s, sh, ch, x</strong>
            <span role="cell">+ es</span>
            <span role="cell">box → boxes</span>
          </div>
          <div role="row">
            <strong role="cell">Consonant + y</strong>
            <span role="cell">y → ies</span>
            <span role="cell">city → cities</span>
          </div>
          <div role="row">
            <strong role="cell">Irregular</strong>
            <span role="cell">changes form</span>
            <span role="cell">child → children</span>
          </div>
        </div>
      </MissionSection>

      <MissionSection
        id="nouns-articles"
        icon={<BadgeCheck />}
        eyebrow="Article control panel"
        title="Choose a, an, the, or no article"
      >
        <ConceptGrid>
          <ConceptCard label="A" title="One, not specific">
            <p>a book · a university</p>
            <p className="grammar-note">Use before a consonant sound.</p>
          </ConceptCard>
          <ConceptCard label="AN" title="One, not specific">
            <p>an apple · an hour</p>
            <p className="grammar-note">Use before a vowel sound.</p>
          </ConceptCard>
          <ConceptCard label="THE" title="Specific or known">
            <p>the moon · the bag on the chair</p>
            <p className="grammar-note">The listener can identify it.</p>
          </ConceptCard>
          <ConceptCard label="Ø" title="General meaning">
            <p>I like music. · Cats are playful.</p>
            <p className="grammar-note">
              No article for many general plurals, sports, and subjects.
            </p>
          </ConceptCard>
        </ConceptGrid>
        <Formula>
          <span>A / AN</span>
          <ArrowRight aria-hidden="true" />
          <strong>introduce</strong>
          <span>THE</span>
          <ArrowRight aria-hidden="true" />
          <strong>identify</strong>
        </Formula>
      </MissionSection>

      <MissionSection
        id="nouns-dog-story"
        icon={<BookOpen />}
        eyebrow="See it in action"
        title="The dog story"
      >
        <IllustrationSlot wide label="A / The dog comparison — production artwork coming later" />
        <div className="grammar-story-steps">
          <div>
            <span>A → Introduce</span>
            <p>
              “I saw <strong>a dog</strong> outside.”
            </p>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <span>The → Identify</span>
            <p>
              “<strong>The dog</strong> was wearing a red collar.”
            </p>
          </div>
        </div>
      </MissionSection>

      <MissionSection
        id="nouns-errors"
        icon={<Search />}
        eyebrow="Common mistakes"
        title="Error detector"
      >
        <div className="grammar-error-grid">
          <ErrorDetector
            sentence={
              <>
                She gave me <u>an advice</u>.
              </>
            }
            wrong="an advice"
            correction="She gave me some advice."
            reason="Advice is uncountable."
          />
          <ErrorDetector
            sentence={
              <>
                I bought <u>a umbrella</u>.
              </>
            }
            wrong="a umbrella"
            correction="I bought an umbrella."
            reason="Umbrella begins with a vowel sound."
          />
          <ErrorDetector
            sentence={
              <>
                We visited <u>museum</u> near school.
              </>
            }
            wrong="museum"
            correction="We visited the museum near school."
            reason="The phrase identifies a particular museum."
          />
        </div>
      </MissionSection>

      <MissionSection
        id="nouns-real-life"
        icon={<MessageCircle />}
        eyebrow="Real-life English"
        title="At the school canteen"
      >
        <div className="grammar-chat">
          <p>
            <span>Aina</span> Can I have <strong>a sandwich</strong>, please?
          </p>
          <p>
            <span>Cashier</span> Sure. Would you like <strong>an egg</strong> sandwich?
          </p>
          <p>
            <span>Aina</span> Yes, and <strong>the orange juice</strong> on the top shelf.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="nouns-check"
        icon={<CheckCircle2 />}
        eyebrow="Test yourself"
        title="Quick check"
      >
        <QuickCheck questions={nounsQuickCheck} />
      </MissionSection>

      <MissionSection
        id="nouns-summary"
        icon={<Sparkles />}
        eyebrow="Revision map"
        title="Mission summary"
      >
        <div className="grammar-summary-grid">
          <ConceptCard title="Nouns">
            <p>name people, places, things, and ideas</p>
          </ConceptCard>
          <ConceptCard title="Capital letters">
            <p>mark proper nouns such as Malaysia and Aina</p>
          </ConceptCard>
          <ConceptCard title="Plural clues">
            <p>s · es · ies · irregular forms</p>
          </ConceptCard>
          <ConceptCard title="Article control">
            <p>a/an introduce · the identifies · Ø generalises</p>
          </ConceptCard>
        </div>
        <div className="grammar-exam-booster">
          <Target aria-hidden="true" />
          <p>
            <strong>Exam booster:</strong> read the whole sentence. Ask whether the noun is
            countable, singular, and already known before choosing an article.
          </p>
        </div>
      </MissionSection>
    </>
  );
}

function SimplePresentLesson() {
  const uses = [
    ["Routine", "I wake up at 6:30 every day."],
    ["Habit", "She usually reads before bed."],
    ["Repeated action", "They play football on Saturdays."],
    ["Fact / general truth", "Water boils at 100°C."],
  ];
  return (
    <>
      <MissionSection
        id="present-brief"
        icon={<Target />}
        eyebrow="Mission brief"
        title="Talk about what happens regularly"
      >
        <div className="grammar-brief-card">
          <p>
            Use the simple present for routines, habits, repeated actions, and facts. Your key
            mission is to match the verb to the subject.
          </p>
          <div className="grammar-pill-row">
            <span>Choose the base verb</span>
            <span>Control s / es / ies</span>
            <span>Build negatives and questions</span>
          </div>
        </div>
      </MissionSection>

      <MissionSection
        id="present-uses"
        icon={<Lightbulb />}
        eyebrow="Big idea"
        title="When do we use the simple present?"
      >
        <ConceptGrid>
          {uses.map(([title, example]) => (
            <ConceptCard key={title} label={title} title={example}>
              <p>Look for time clues that show a usual or repeated pattern.</p>
            </ConceptCard>
          ))}
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="present-formula"
        icon={<BadgeCheck />}
        eyebrow="How it works"
        title="Basic formula"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="I / You / We / They" title="Subject + base verb">
            <Formula>
              <span>They</span>
              <strong>play</strong>
              <span>after school.</span>
            </Formula>
          </ConceptCard>
          <ConceptCard label="He / She / It" title="Subject + verb-s/es">
            <Formula>
              <span>She</span>
              <strong>plays</strong>
              <span>after school.</span>
            </Formula>
          </ConceptCard>
        </div>
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>Remember:</strong> one he, she, it, Amir, or the cat usually needs -s or -es on
            the verb.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="present-spelling"
        icon={<Sparkles />}
        eyebrow="Verb transformation"
        title="The -s / -es / -ies rule"
      >
        <div
          className="grammar-rule-table"
          role="table"
          aria-label="Third person singular spelling rules"
        >
          <div role="row">
            <strong role="cell">Most verbs</strong>
            <span role="cell">+ s</span>
            <span role="cell">play → plays</span>
          </div>
          <div role="row">
            <strong role="cell">Ends in o, s, sh, ch, x</strong>
            <span role="cell">+ es</span>
            <span role="cell">watch → watches</span>
          </div>
          <div role="row">
            <strong role="cell">Consonant + y</strong>
            <span role="cell">y → ies</span>
            <span role="cell">study → studies</span>
          </div>
          <div role="row">
            <strong role="cell">Irregular</strong>
            <span role="cell">special form</span>
            <span role="cell">have → has</span>
          </div>
        </div>
      </MissionSection>

      <MissionSection
        id="present-frequency"
        icon={<CircleHelp />}
        eyebrow="See it in action"
        title="Frequency words and time expressions"
      >
        <div className="grammar-frequency-bars">
          {[100, 80, 60, 30, 5].map((value, index) => (
            <div key={value}>
              <span>{["always", "usually", "often", "sometimes", "never"][index]}</span>
              <i>
                <b style={{ transform: `scaleX(${value / 100})` }} />
              </i>
              <em>{value}%</em>
            </div>
          ))}
        </div>
        <Formula>
          <strong>Subject</strong>
          <span>+</span>
          <strong>frequency word</strong>
          <span>+</span>
          <strong>main verb</strong>
        </Formula>
        <p className="grammar-centred-example">
          She <strong>usually walks</strong> to school. · We play badminton{" "}
          <strong>every Friday</strong>.
        </p>
      </MissionSection>

      <MissionSection
        id="present-negative"
        icon={<X />}
        eyebrow="Negative structures"
        title="Do not / does not"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="I / You / We / They" title="don't + base verb">
            <Formula>
              <span>They</span>
              <strong>don't play</strong>
              <span>on Mondays.</span>
            </Formula>
          </ConceptCard>
          <ConceptCard label="He / She / It" title="doesn't + base verb">
            <Formula>
              <span>She</span>
              <strong>doesn't play</strong>
              <span>on Mondays.</span>
            </Formula>
          </ConceptCard>
        </div>
        <div className="grammar-wrong-right">
          <span>
            <X aria-hidden="true" /> She doesn't plays.
          </span>
          <span>
            <Check aria-hidden="true" /> She doesn't play.
          </span>
        </div>
      </MissionSection>

      <MissionSection
        id="present-questions"
        icon={<CircleHelp />}
        eyebrow="Question structures"
        title="Do / Does + subject + base verb?"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="I / You / We / They" title="Do they play?">
            <p>Yes, they do. · No, they don't.</p>
          </ConceptCard>
          <ConceptCard label="He / She / It" title="Does she play?">
            <p>Yes, she does. · No, she doesn't.</p>
          </ConceptCard>
        </div>
        <Formula>
          <strong>Does</strong>
          <span>+</span>
          <strong>Aisyah</strong>
          <span>+</span>
          <strong>study</strong>
          <span>every evening?</span>
        </Formula>
      </MissionSection>

      <MissionSection
        id="present-compare"
        icon={<BookOpen />}
        eyebrow="Compare it"
        title="Routine vs right now"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="Simple present" title="I play football every Saturday.">
            <IllustrationSlot label="Repeated weekly football routine" />
            <p className="grammar-note">routine / repeated action</p>
          </ConceptCard>
          <ConceptCard label="Present continuous" title="I am playing football right now.">
            <IllustrationSlot label="Playing football at this moment" />
            <p className="grammar-note">happening now</p>
          </ConceptCard>
        </div>
        <Formula>
          <span>every Saturday</span>
          <ArrowRight aria-hidden="true" />
          <strong>simple present</strong>
          <span>right now</span>
          <ArrowRight aria-hidden="true" />
          <strong>present continuous</strong>
        </Formula>
        <div className="grammar-bridge-note">
          <strong>Subject–Verb Agreement preview</strong>
          <p>
            I/you/we/they → play · he/she/it → plays. You will master the full rule in Mission 08.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="present-errors"
        icon={<Search />}
        eyebrow="Common mistakes"
        title="Error detector"
      >
        <div className="grammar-error-grid">
          <ErrorDetector
            sentence={
              <>
                She <u>play</u> badminton every day.
              </>
            }
            wrong="play"
            correction="She plays badminton every day."
            reason="He/she/it needs -s or -es."
          />
          <ErrorDetector
            sentence={
              <>
                He <u>don't</u> like Maths.
              </>
            }
            wrong="don't"
            correction="He doesn't like Maths."
            reason="Use doesn't with he, she, or it."
          />
          <ErrorDetector
            sentence={
              <>
                Does Amir <u>plays</u> football?
              </>
            }
            wrong="plays"
            correction="Does Amir play football?"
            reason="After does, use the base verb."
          />
        </div>
      </MissionSection>

      <MissionSection
        id="present-real-life"
        icon={<MessageCircle />}
        eyebrow="Real-life English"
        title="After school"
      >
        <div className="grammar-chat">
          <p>
            <span>Aina</span> What <strong>do you usually do</strong> after school?
          </p>
          <p>
            <span>Haziq</span> I <strong>usually go</strong> home first. Then I play badminton.
          </p>
          <p>
            <span>Aina</span> <strong>Does your brother play</strong> every day too?
          </p>
          <p>
            <span>Haziq</span> No, <strong>he doesn't</strong>. He usually plays on Fridays.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="present-check"
        icon={<CheckCircle2 />}
        eyebrow="Test yourself"
        title="Quick check"
      >
        <QuickCheck questions={presentQuickCheck} />
      </MissionSection>

      <MissionSection
        id="present-summary"
        icon={<Sparkles />}
        eyebrow="Revision map"
        title="Mission summary"
      >
        <div className="grammar-summary-grid">
          <ConceptCard title="Use it for">
            <p>routines · habits · repeated actions · facts</p>
          </ConceptCard>
          <ConceptCard title="Positive">
            <p>base verb · he/she/it adds s or es</p>
          </ConceptCard>
          <ConceptCard title="Negative">
            <p>don't / doesn't + base verb</p>
          </ConceptCard>
          <ConceptCard title="Questions">
            <p>Do / Does + subject + base verb?</p>
          </ConceptCard>
        </div>
        <div className="grammar-exam-booster">
          <Target aria-hidden="true" />
          <p>
            <strong>Exam booster:</strong> check every he/she/it subject. After does or doesn't,
            return the main verb to its base form.
          </p>
        </div>
      </MissionSection>
    </>
  );
}

export function GrammarLesson({ topicId }: { topicId: "01" | "02" }) {
  const topic = getGrammarTopic(topicId)!;
  const contentRef = useRef<HTMLDivElement>(null);
  const scope = useMemo(() => GRAMMAR_PROGRESS_SCOPE, []);
  const { progress, userId, recordProgress } = useNotesProgressScope(scope);
  const readingProgress = useNotesReadingTracker({
    contentRef,
    scope,
    chapter: topic.progressKey,
    userId,
    initialProgress: progress[topic.progressKey] ?? 0,
    onProgress: recordProgress,
  });
  const nextTopic = topicId === "01" ? getGrammarTopic("02") : getGrammarTopic("03");

  return (
    <main className="grammar-shell grammar-lesson-shell">
      <div className="grammar-stars" aria-hidden="true" />
      <div className="grammar-reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${readingProgress / 100})` }} />
      </div>
      <div className="grammar-container grammar-lesson-container">
        <nav className="grammar-breadcrumb" aria-label="Breadcrumb">
          <Link to="/english/form-1/grammar" search={{}}>
            <ArrowLeft aria-hidden="true" /> Grammar Missions
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Topic {topic.id}</span>
        </nav>

        <header className="grammar-lesson-hero">
          <div>
            <span className="grammar-kicker">
              <Sparkles aria-hidden="true" /> Grammar mission {topic.id}
            </span>
            <h1>{topic.title}</h1>
            <p>
              {topicId === "01"
                ? "Name it. Count it. Choose the right article."
                : "Build confident sentences about routines, habits, and facts."}
            </p>
            <div className="grammar-pill-row">
              <span>Form 1</span>
              <span>Learn at your pace</span>
              <span>{readingProgress}% read</span>
            </div>
          </div>
          <img src={topic.artwork} alt="" width="720" height="480" decoding="async" />
        </header>

        <div ref={contentRef} className="grammar-lesson-content">
          <div
            data-notes-section-manifest={JSON.stringify(
              (topicId === "01"
                ? [
                    "nouns-brief",
                    "nouns-big-idea",
                    "nouns-categories",
                    "nouns-countability",
                    "nouns-plurals",
                    "nouns-articles",
                    "nouns-dog-story",
                    "nouns-errors",
                    "nouns-real-life",
                    "nouns-check",
                    "nouns-summary",
                    "01-complete",
                  ]
                : [
                    "present-brief",
                    "present-uses",
                    "present-formula",
                    "present-spelling",
                    "present-frequency",
                    "present-negative",
                    "present-questions",
                    "present-compare",
                    "present-errors",
                    "present-real-life",
                    "present-check",
                    "present-summary",
                    "02-complete",
                  ]
              ).map((id) => ({ id, weight: 1 })),
            )}
          >
            {topicId === "01" ? <NounsLesson /> : <SimplePresentLesson />}

            <section
              className="grammar-mission-complete"
              data-notes-section-id={`${topicId}-complete`}
            >
              <span>
                <CheckCircle2 aria-hidden="true" />
              </span>
              <p>Mission review point</p>
              <h2>{topic.title} complete</h2>
              <p>
                Your saved reading progress reaches Completed after every lesson section has been
                read.
              </p>
              <div>
                <Link to="/quizzes" search={{ subject: "english", form: 1 }}>
                  Try an English quiz
                </Link>
                <Link to="/flashcards" search={{ subject: "english", form: 1 }}>
                  Open flashcards
                </Link>
                {nextTopic?.implemented ? (
                  <Link
                    className="is-primary"
                    to="/english/form-1/grammar"
                    search={{ topic: nextTopic.id }}
                  >
                    Next: {nextTopic.shortTitle}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                ) : (
                  <Link className="is-primary" to="/english/form-1/grammar" search={{}}>
                    Back to missions
                    <ArrowRight aria-hidden="true" />
                  </Link>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
