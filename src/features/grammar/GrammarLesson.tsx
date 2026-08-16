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
  presentContinuousQuickCheck,
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

function LessonArtwork({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <img
      className="grammar-lesson-artwork"
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
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
            <div
              className={`grammar-question-options${question.options.length === 4 ? " has-four-options" : ""}`}
            >
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
        <LessonArtwork
          src="/assets/english/form-1/grammar/nouns-articles/noun-the-dog-story.webp"
          alt="Same dog shown first generally and then identified by its red collar."
          width={1100}
          height={619}
        />
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
    {
      title: "Routine",
      example: "I wake up at 6:30 every day.",
      artwork: "/assets/english/form-1/grammar/simple-present/routine.webp",
      alt: "Morning school routine with alarm clock and backpack.",
      width: 800,
      height: 533,
    },
    {
      title: "Habit",
      example: "He usually reads before bed.",
      artwork: "/assets/english/form-1/grammar/simple-present/habit.webp",
      alt: "Student reading a book before bed.",
      width: 800,
      height: 533,
    },
    {
      title: "Repeated action",
      example: "They play football on Saturdays.",
      artwork: "/assets/english/form-1/grammar/simple-present/repeated-action.webp",
      alt: "Badminton activity shown as a repeating routine.",
      width: 800,
      height: 533,
    },
    {
      title: "Fact / general truth",
      example: "Water boils at 100°C.",
      artwork: "/assets/english/form-1/grammar/simple-present/fact.webp",
      alt: "Earth orbiting the Sun and water boiling.",
      width: 1000,
      height: 563,
    },
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
          {uses.map(({ title, example, artwork, alt, width, height }) => (
            <ConceptCard key={title} label={title} title={example}>
              <LessonArtwork src={artwork} alt={alt} width={width} height={height} />
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
            <LessonArtwork
              src="/assets/english/form-1/grammar/simple-present/compare-routine.webp"
              alt="Student playing football as a regular routine."
              width={700}
              height={467}
            />
            <p className="grammar-note">routine / repeated action</p>
          </ConceptCard>
          <ConceptCard label="Present continuous" title="I am playing football right now.">
            <LessonArtwork
              src="/assets/english/form-1/grammar/simple-present/compare-now.webp"
              alt="Student actively kicking a football now."
              width={700}
              height={467}
            />
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

function PresentContinuousLesson() {
  return (
    <>
      <MissionSection
        id="continuous-brief"
        icon={<Target />}
        eyebrow="Mission brief"
        title="Talk about actions in progress"
      >
        <div className="grammar-brief-card">
          <p>
            We use the present continuous for actions happening <strong>right now</strong>, or
            around this moment.
          </p>
          <p>
            By the end of this mission, you will know how to build it, question it, negate it, and
            tell it apart from the simple present.
          </p>
          <div className="grammar-pill-row">
            <span>Match am / is / are</span>
            <span>Form verb-ing</span>
            <span>Spot time clues</span>
          </div>
        </div>
      </MissionSection>

      <MissionSection
        id="continuous-big-idea"
        icon={<Lightbulb />}
        eyebrow="Big idea"
        title="The action is happening now"
      >
        <div className="grammar-live-now">
          <span aria-hidden="true" />
          <div>
            <strong>Happening now</strong>
            <p>The action is in progress—it started, and it is not finished yet.</p>
          </div>
        </div>
        <ConceptGrid>
          <ConceptCard label="Right now" title="I am studying now.">
            <p>The action is happening as I speak.</p>
          </ConceptCard>
          <ConceptCard label="Right now" title="She is reading.">
            <p>Her reading is currently in progress.</p>
          </ConceptCard>
          <ConceptCard label="Right now" title="They are playing football.">
            <p>The game has started and is still happening.</p>
          </ConceptCard>
          <ConceptCard label="Right now" title="He is doing his homework.">
            <p>His homework activity is not finished yet.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="continuous-formula"
        icon={<BadgeCheck />}
        eyebrow="How it works"
        title="Basic formula"
      >
        <Formula>
          <strong>Subject</strong>
          <span>+</span>
          <strong>am / is / are</strong>
          <span>+</span>
          <strong>verb-ing</strong>
        </Formula>
        <p className="grammar-centred-example">
          They <strong>are playing</strong> football. · She <strong>is reading</strong> a book.
        </p>
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>Watch out:</strong> the present continuous needs both parts: a be-verb and a
            main verb ending in -ing.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="continuous-be-verbs"
        icon={<CircleHelp />}
        eyebrow="Control panel"
        title="Choose am, is, or are"
      >
        <div className="grammar-three-grid">
          <ConceptCard label="I" title="am">
            <p>I am learning English.</p>
          </ConceptCard>
          <ConceptCard label="He / She / It" title="is">
            <p>She is learning English.</p>
          </ConceptCard>
          <ConceptCard label="You / We / They" title="are">
            <p>We are learning English.</p>
          </ConceptCard>
        </div>
      </MissionSection>

      <MissionSection
        id="continuous-ing"
        icon={<Sparkles />}
        eyebrow="Verb transformation"
        title="Adding -ing"
      >
        <div className="grammar-ing-transform" aria-label="Examples of adding ing to verbs">
          <span>
            play <strong>→ playing</strong>
          </span>
          <span>
            make <strong>→ making</strong>
          </span>
          <span>
            run <strong>→ running</strong>
          </span>
        </div>
        <div className="grammar-rule-table" role="table" aria-label="Rules for adding ing">
          <div role="row">
            <strong role="cell">Most verbs</strong>
            <span role="cell">+ ing</span>
            <span role="cell">play → playing · read → reading · study → studying</span>
          </div>
          <div role="row">
            <strong role="cell">Final silent e</strong>
            <span role="cell">drop e + ing</span>
            <span role="cell">make → making · write → writing</span>
          </div>
          <div role="row">
            <strong role="cell">Short CVC verbs</strong>
            <span role="cell">double + ing</span>
            <span role="cell">run → running · swim → swimming</span>
          </div>
        </div>
      </MissionSection>

      <MissionSection
        id="continuous-now"
        icon={<BookOpen />}
        eyebrow="See it in action"
        title="Action happening now"
      >
        <LessonArtwork
          src="/assets/english/form-1/grammar/present-continuous/now-action.webp"
          alt="People running, drinking, studying and cooking at the present moment."
          width={1100}
          height={619}
        />
        <ConceptGrid>
          <ConceptCard label="Running" title="Aiman is running.">
            <p>The action is happening now.</p>
          </ConceptCard>
          <ConceptCard label="Drinking" title="Sara is drinking water.">
            <p>The action is in progress.</p>
          </ConceptCard>
          <ConceptCard label="Studying" title="The students are studying.">
            <p>The plural subject takes are.</p>
          </ConceptCard>
          <ConceptCard label="Cooking" title="My mother is cooking.">
            <p>The singular subject takes is.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="continuous-around"
        icon={<CircleHelp />}
        eyebrow="Around now"
        title="Around this moment"
      >
        <div className="grammar-brief-card">
          <p>
            Present continuous does not only mean this exact second. It can also describe something
            happening around now, over a longer stretch of time.
          </p>
          <div className="grammar-now-window" aria-label="Time window around the current moment">
            <span>last month</span>
            <strong>this week</strong>
            <span>next month</span>
          </div>
        </div>
        <ConceptGrid>
          <ConceptCard label="This week" title="I am reading a new novel this week.">
            <p>The activity continues across several days.</p>
          </ConceptCard>
          <ConceptCard label="This month" title="She is learning Japanese this month.">
            <p>The action is temporary and happening around now.</p>
          </ConceptCard>
          <ConceptCard label="Current project" title="We are working on a school project.">
            <p>The work is in progress during the present period.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="continuous-time"
        icon={<Sparkles />}
        eyebrow="Time clues"
        title="Time expressions"
      >
        <div className="grammar-time-chips" aria-label="Present continuous time expressions">
          {["now", "right now", "at the moment", "currently", "today", "this week"].map(
            (expression) => (
              <span key={expression}>{expression}</span>
            ),
          )}
        </div>
        <p className="grammar-centred-example">
          Look for these clues, then check whether the action is still in progress.
        </p>
      </MissionSection>

      <MissionSection
        id="continuous-negative"
        icon={<X />}
        eyebrow="Negative structures"
        title="Add not after am, is, or are"
      >
        <Formula>
          <strong>Subject</strong>
          <span>+</span>
          <strong>am / is / are</strong>
          <span>+</span>
          <strong>not</strong>
          <span>+</span>
          <strong>verb-ing</strong>
        </Formula>
        <ConceptGrid>
          <ConceptCard label="I" title="I am not sleeping.">
            <p>Am not comes before the -ing verb.</p>
          </ConceptCard>
          <ConceptCard label="He / She / It" title="He is not playing.">
            <p>You can also say: He isn't playing.</p>
          </ConceptCard>
          <ConceptCard label="You / We / They" title="They are not studying.">
            <p>You can also say: They aren't studying.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="continuous-questions"
        icon={<CircleHelp />}
        eyebrow="Question structures"
        title="Move am, is, or are before the subject"
      >
        <Formula>
          <strong>Am / Is / Are</strong>
          <span>+</span>
          <strong>subject</strong>
          <span>+</span>
          <strong>verb-ing?</strong>
        </Formula>
        <ConceptGrid>
          <ConceptCard label="Are" title="Are you studying?">
            <p>Yes, I am. · No, I'm not.</p>
          </ConceptCard>
          <ConceptCard label="Is" title="Is she sleeping?">
            <p>Yes, she is. · No, she isn't.</p>
          </ConceptCard>
          <ConceptCard label="Are" title="Are they playing?">
            <p>Yes, they are. · No, they aren't.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="continuous-compare"
        icon={<BookOpen />}
        eyebrow="Compare it"
        title="Simple Present vs Present Continuous"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="Simple present" title="I play football every Saturday.">
            <LessonArtwork
              src="/assets/english/form-1/grammar/simple-present/compare-routine.webp"
              alt="Student with a football as a regular activity."
              width={700}
              height={467}
            />
            <p className="grammar-note">every Saturday · routine / repeated action</p>
          </ConceptCard>
          <ConceptCard label="Present continuous" title="I am playing football now.">
            <LessonArtwork
              src="/assets/english/form-1/grammar/simple-present/compare-now.webp"
              alt="Same student actively kicking a football now."
              width={700}
              height={467}
            />
            <p className="grammar-note">right now · happening at this moment</p>
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
      </MissionSection>

      <MissionSection
        id="continuous-errors"
        icon={<Search />}
        eyebrow="Common mistakes"
        title="Error detector"
      >
        <div className="grammar-error-grid">
          <ErrorDetector
            sentence={
              <>
                He <u>playing</u> football.
              </>
            }
            wrong="playing"
            correction="He is playing football."
            reason="Every -ing verb needs am, is, or are in front of it."
          />
          <ErrorDetector
            sentence={
              <>
                They <u>is</u> studying.
              </>
            }
            wrong="is"
            correction="They are studying."
            reason="You, we, and they take are, not is."
          />
          <ErrorDetector
            sentence={
              <>
                She is <u>read</u> a book.
              </>
            }
            wrong="read"
            correction="She is reading a book."
            reason="The main verb must end in -ing."
          />
          <ErrorDetector
            sentence={
              <>
                I am <u>play</u> football.
              </>
            }
            wrong="play"
            correction="I am playing football."
            reason="After am, is, or are, the verb needs -ing."
          />
          <ErrorDetector
            sentence={
              <>
                He is <u>runing</u>.
              </>
            }
            wrong="runing"
            correction="He is running."
            reason="Short CVC verbs double the final consonant before -ing."
          />
        </div>
      </MissionSection>

      <MissionSection
        id="continuous-real-life"
        icon={<MessageCircle />}
        eyebrow="Real-life English"
        title="After-school chat"
      >
        <div className="grammar-chat">
          <p>
            <span>Aiman</span> What <strong>are you doing</strong>?
          </p>
          <p>
            <span>Sara</span> <strong>I'm doing</strong> my homework.
          </p>
          <p>
            <span>Aiman</span> <strong>Is your brother studying</strong> too?
          </p>
          <p>
            <span>Sara</span> No, <strong>he's playing</strong> a game.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="continuous-check"
        icon={<CheckCircle2 />}
        eyebrow="Test yourself"
        title="Quick check"
      >
        <QuickCheck questions={presentContinuousQuickCheck} />
      </MissionSection>

      <MissionSection
        id="continuous-summary"
        icon={<Sparkles />}
        eyebrow="Revision map"
        title="Mission summary"
      >
        <div className="grammar-summary-grid">
          <ConceptCard title="Formula">
            <p>am / is / are + verb-ing</p>
          </ConceptCard>
          <ConceptCard title="Use it for">
            <p>actions happening now or around this moment</p>
          </ConceptCard>
          <ConceptCard title="Be-verb match">
            <p>I → am · he/she/it → is · you/we/they → are</p>
          </ConceptCard>
          <ConceptCard title="Time clues">
            <p>now · right now · at the moment · currently</p>
          </ConceptCard>
        </div>
      </MissionSection>

      <MissionSection
        id="continuous-exam"
        icon={<Target />}
        eyebrow="Exam strategy"
        title="Exam booster"
      >
        <div className="grammar-exam-list">
          <p>Look for time clues such as now and at the moment.</p>
          <p>Do not forget am, is, or are—a lone -ing verb is not a full sentence.</p>
          <p>Match the subject correctly with its be-verb.</p>
          <p>Check spelling when adding -ing, especially silent e and doubled consonants.</p>
        </div>
        <div className="grammar-exam-booster">
          <Target aria-hidden="true" />
          <p>
            <strong>Worked example:</strong> “The boys ___ football now.” Boys means they, and now
            signals present continuous: <strong>The boys are playing football.</strong>
          </p>
        </div>
      </MissionSection>
    </>
  );
}

export function GrammarLesson({ topicId }: { topicId: "01" | "02" | "03" }) {
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
  const nextTopic =
    topicId === "01"
      ? getGrammarTopic("02")
      : topicId === "02"
        ? getGrammarTopic("03")
        : getGrammarTopic("04");

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
            <h1>{topicId === "03" ? "Present Continuous Tense" : topic.title}</h1>
            <p>
              {topicId === "01"
                ? "Name it. Count it. Choose the right article."
                : topicId === "02"
                  ? "Build confident sentences about routines, habits, and facts."
                  : "Talk about actions happening now, or around this moment."}
            </p>
            <div className="grammar-pill-row">
              <span>Form 1</span>
              <span>Learn at your pace</span>
              <span>{readingProgress}% read</span>
            </div>
          </div>
          {topicId === "03" ? (
            <div className="grammar-lesson-hero__art">
              <img
                src="/assets/english/form-1/grammar/present-continuous/hero.webp"
                alt="Student running with a backpack, showing an action happening right now."
                width={720}
                height={480}
                decoding="async"
                fetchPriority="high"
              />
              <p>Something is happening—right now.</p>
            </div>
          ) : (
            <img
              src={
                topicId === "02"
                  ? "/assets/english/form-1/grammar/simple-present/hero.webp"
                  : topic.artwork
              }
              alt={
                topicId === "02"
                  ? "Daily routine sequence with school, study, football, and bedtime activities."
                  : ""
              }
              width={topicId === "02" ? 900 : 720}
              height={topicId === "02" ? 600 : 480}
              decoding="async"
              fetchPriority={topicId === "02" ? "high" : undefined}
            />
          )}
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
                : topicId === "02"
                  ? [
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
                  : [
                      "continuous-brief",
                      "continuous-big-idea",
                      "continuous-formula",
                      "continuous-be-verbs",
                      "continuous-ing",
                      "continuous-now",
                      "continuous-around",
                      "continuous-time",
                      "continuous-negative",
                      "continuous-questions",
                      "continuous-compare",
                      "continuous-errors",
                      "continuous-real-life",
                      "continuous-check",
                      "continuous-summary",
                      "continuous-exam",
                      "03-complete",
                    ]
              ).map((id) => ({ id, weight: 1 })),
            )}
          >
            {topicId === "01" ? (
              <NounsLesson />
            ) : topicId === "02" ? (
              <SimplePresentLesson />
            ) : (
              <PresentContinuousLesson />
            )}

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
