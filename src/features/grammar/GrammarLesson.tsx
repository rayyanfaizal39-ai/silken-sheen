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
  Clock,
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
  pastContinuousQuickCheck,
  presentPerfectQuickCheck,
  presentQuickCheck,
  simplePastQuickCheck,
  type QuickCheckQuestion,
} from "./grammar-content";
import type {
  CardSpec,
  LessonBlock as LessonBlockSpec,
  LessonIconName,
  LessonSectionSpec,
  RichText,
} from "./grammar-lesson-blocks";
import {
  adjectivesAdverbsSections,
  futureFormsSections,
  modalsSections,
  subjectVerbSections,
} from "./grammar-topics-advanced";
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

function SimplePastLesson() {
  const irregularVerbs = [
    ["go", "went"],
    ["eat", "ate"],
    ["see", "saw"],
    ["come", "came"],
    ["take", "took"],
    ["buy", "bought"],
    ["have", "had"],
    ["do", "did"],
    ["make", "made"],
    ["write", "wrote"],
  ];

  return (
    <>
      <MissionSection
        id="past-brief"
        icon={<Target />}
        eyebrow="Mission brief"
        title="Talk about what already happened"
      >
        <div className="grammar-brief-card">
          <p>
            We use the simple past for actions and events that <strong>started and finished</strong>{" "}
            in the past.
          </p>
          <p>
            By the end of this mission, you will know how to form it with regular and irregular
            verbs, question it, negate it, and use was and were.
          </p>
          <div className="grammar-pill-row">
            <span>Build past verbs</span>
            <span>Learn irregular forms</span>
            <span>Control did / didn't</span>
          </div>
        </div>
      </MissionSection>

      <MissionSection
        id="past-big-idea"
        icon={<Lightbulb />}
        eyebrow="Big idea"
        title="The action is finished before now"
      >
        <div
          className="grammar-past-timeline"
          aria-label="Timeline showing a finished event before the present moment"
        >
          <span>event happened</span>
          <strong>now</strong>
          <em>Finished · before now</em>
        </div>
        <ConceptGrid>
          <ConceptCard label="Yesterday" title="I visited my grandmother yesterday.">
            <p>The visit started and ended in the past.</p>
          </ConceptCard>
          <ConceptCard label="Last night" title="She watched a movie last night.">
            <p>The movie is over — it is not still playing.</p>
          </ConceptCard>
          <ConceptCard label="After school" title="They played football after school.">
            <p>The game finished before this moment.</p>
          </ConceptCard>
          <ConceptCard label="Completed" title="He finished his homework.">
            <p>The work is done, so we use the past verb.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="past-formula"
        icon={<BadgeCheck />}
        eyebrow="How it works"
        title="Basic formula"
      >
        <Formula>
          <strong>Subject</strong>
          <span>+</span>
          <strong>past verb</strong>
        </Formula>
        <p className="grammar-centred-example">
          I <strong>played</strong> football. · She <strong>watched</strong> a movie. · They{" "}
          <strong>visited</strong> Melaka.
        </p>
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>Good news:</strong> the past verb stays the same for every subject. I played,
            she played, they played.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="past-regular"
        icon={<Sparkles />}
        eyebrow="Verb transformation"
        title="Regular verbs take -ed"
      >
        <div className="grammar-ing-transform" aria-label="Examples of regular past verbs">
          <span>
            play <strong>→ played</strong>
          </span>
          <span>
            live <strong>→ lived</strong>
          </span>
          <span>
            study <strong>→ studied</strong>
          </span>
          <span>
            stop <strong>→ stopped</strong>
          </span>
        </div>
        <div
          className="grammar-rule-table"
          role="table"
          aria-label="Rules for forming regular past verbs"
        >
          <div role="row">
            <strong role="cell">Most verbs</strong>
            <span role="cell">+ ed</span>
            <span role="cell">
              play → played · watch → watched · visit → visited · clean → cleaned
            </span>
          </div>
          <div role="row">
            <strong role="cell">Ends in e</strong>
            <span role="cell">+ d</span>
            <span role="cell">live → lived</span>
          </div>
          <div role="row">
            <strong role="cell">Consonant + y</strong>
            <span role="cell">y → ied</span>
            <span role="cell">study → studied</span>
          </div>
          <div role="row">
            <strong role="cell">Short CVC verbs</strong>
            <span role="cell">double + ed</span>
            <span role="cell">stop → stopped</span>
          </div>
        </div>
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>Watch out:</strong> short CVC verbs double the final consonant before -ed, so
            stop becomes stopped, not stoped.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="past-irregular"
        icon={<Target />}
        eyebrow="Learn these by heart"
        title="Irregular verbs"
      >
        <div className="grammar-brief-card">
          <p>
            Irregular verbs do <strong>not</strong> simply take -ed — they change form completely.
            There is no shortcut here; these just need to be learned.
          </p>
        </div>
        <ul className="grammar-verb-grid" aria-label="Common irregular past verbs">
          {irregularVerbs.map(([base, past]) => (
            <li key={base}>
              <span>{base}</span>
              <ArrowRight aria-hidden="true" />
              <strong>{past}</strong>
            </li>
          ))}
        </ul>
      </MissionSection>

      <MissionSection
        id="past-finished"
        icon={<BookOpen />}
        eyebrow="See it in action"
        title="Finished action in the past"
      >
        <LessonArtwork
          src="/assets/english/form-1/grammar/simple-past/finished-action.webp"
          alt="Several everyday activities shown after they have already finished."
          width={1100}
          height={506}
        />
        <ConceptGrid>
          <ConceptCard label="Badminton" title="Aiman played badminton yesterday.">
            <p>The match is already over.</p>
          </ConceptCard>
          <ConceptCard label="Visiting" title="Sara visited her aunt last weekend.">
            <p>The visit happened and ended last weekend.</p>
          </ConceptCard>
          <ConceptCard label="Movie" title="We watched a movie last night.">
            <p>The movie finished before now.</p>
          </ConceptCard>
          <ConceptCard label="Cooking" title="My father cooked dinner yesterday.">
            <p>Dinner was cooked and served in the past.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="past-time"
        icon={<Sparkles />}
        eyebrow="Time clues"
        title="Time expressions"
      >
        <div className="grammar-time-chips" aria-label="Simple past time expressions">
          {[
            "yesterday",
            "last night",
            "last week",
            "last month",
            "last year",
            "two days ago",
            "an hour ago",
          ].map((expression) => (
            <span key={expression}>{expression}</span>
          ))}
        </div>
        <p className="grammar-centred-example">
          Spot one of these clues and the sentence almost always needs the simple past.
        </p>
      </MissionSection>

      <MissionSection
        id="past-negative"
        icon={<X />}
        eyebrow="Negative structures"
        title="Did not + base verb"
      >
        <Formula>
          <strong>Subject</strong>
          <span>+</span>
          <strong>did not</strong>
          <span>+</span>
          <strong>base verb</strong>
        </Formula>
        <ConceptGrid>
          <ConceptCard label="I" title="I did not play football.">
            <p>You can also say: I didn't play football.</p>
          </ConceptCard>
          <ConceptCard label="She" title="She did not watch the movie.">
            <p>You can also say: She didn't watch the movie.</p>
          </ConceptCard>
          <ConceptCard label="They" title="They did not visit us.">
            <p>You can also say: They didn't visit us.</p>
          </ConceptCard>
        </ConceptGrid>
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>The most important rule in this lesson:</strong> after DID or DIDN'T, use the
            BASE VERB. Did already shows the past.
          </p>
        </div>
        <div className="grammar-wrong-right">
          <span>
            <X aria-hidden="true" /> She didn't went.
          </span>
          <span>
            <Check aria-hidden="true" /> She didn't go.
          </span>
        </div>
      </MissionSection>

      <MissionSection
        id="past-questions"
        icon={<CircleHelp />}
        eyebrow="Question structures"
        title="Start the question with Did"
      >
        <Formula>
          <strong>Did</strong>
          <span>+</span>
          <strong>subject</strong>
          <span>+</span>
          <strong>base verb?</strong>
        </Formula>
        <ConceptGrid>
          <ConceptCard label="Did" title="Did you play football?">
            <p>Play stays in the base form after did.</p>
          </ConceptCard>
          <ConceptCard label="Did" title="Did she visit her aunt?">
            <p>Never say: Did she visited her aunt?</p>
          </ConceptCard>
          <ConceptCard label="Did" title="Did they finish their homework?">
            <p>One did at the front is enough to show the past.</p>
          </ConceptCard>
        </ConceptGrid>
        <div className="grammar-compare-grid">
          <ConceptCard label="Short answers" title="Did you play football?">
            <p>Yes, I did.</p>
            <p>No, I didn't.</p>
          </ConceptCard>
          <ConceptCard label="Short answers" title="Did she visit her aunt?">
            <p>Yes, she did.</p>
            <p>No, she didn't.</p>
          </ConceptCard>
        </div>
      </MissionSection>

      <MissionSection
        id="past-was-were"
        icon={<BadgeCheck />}
        eyebrow="Past of be"
        title="Was and were"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="I / He / She / It" title="was">
            <p>I was tired.</p>
            <p>She was at home.</p>
          </ConceptCard>
          <ConceptCard label="You / We / They" title="were">
            <p>They were happy.</p>
            <p>We were at school.</p>
          </ConceptCard>
        </div>
        <div className="grammar-compare-grid">
          <ConceptCard label="Negatives" title="Add not after was or were">
            <p>was not → wasn't</p>
            <p>were not → weren't</p>
          </ConceptCard>
          <ConceptCard label="Questions" title="Move was or were to the front">
            <p>Was she tired?</p>
            <p>Were they at school?</p>
          </ConceptCard>
        </div>
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>Watch out:</strong> was and were do not mix and match. Check the subject before
            you choose.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="past-compare"
        icon={<BookOpen />}
        eyebrow="Compare it"
        title="Simple Present vs Simple Past"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="Simple present" title="I play football every Saturday.">
            <LessonArtwork
              src="/assets/english/form-1/grammar/simple-present/compare-routine.webp"
              alt="Student with a football as a regular activity."
              width={700}
              height={467}
            />
            <p className="grammar-note">every Saturday · routine / happens regularly</p>
          </ConceptCard>
          <ConceptCard label="Simple past" title="I played football yesterday.">
            <LessonArtwork
              src="/assets/english/form-1/grammar/simple-past/compare-past.webp"
              alt="Same student after a finished football game."
              width={700}
              height={467}
            />
            <p className="grammar-note">yesterday · finished action before now</p>
          </ConceptCard>
        </div>
        <Formula>
          <span>every Saturday</span>
          <ArrowRight aria-hidden="true" />
          <strong>simple present</strong>
          <span>yesterday</span>
          <ArrowRight aria-hidden="true" />
          <strong>simple past</strong>
        </Formula>
      </MissionSection>

      <MissionSection
        id="past-errors"
        icon={<Search />}
        eyebrow="Common mistakes"
        title="Error detector"
      >
        <div className="grammar-error-grid">
          <ErrorDetector
            sentence={
              <>
                I <u>play</u> football yesterday.
              </>
            }
            wrong="play"
            correction="I played football yesterday."
            reason="Yesterday signals the simple past, so use the past verb."
          />
          <ErrorDetector
            sentence={
              <>
                She <u>goed</u> to school.
              </>
            }
            wrong="goed"
            correction="She went to school."
            reason="Go is irregular — it never takes -ed."
          />
          <ErrorDetector
            sentence={
              <>
                He didn't <u>played</u> football.
              </>
            }
            wrong="played"
            correction="He didn't play football."
            reason="After didn't, use the base verb."
          />
          <ErrorDetector
            sentence={
              <>
                Did you <u>went</u> there?
              </>
            }
            wrong="went"
            correction="Did you go there?"
            reason="After did, use the base verb."
          />
          <ErrorDetector
            sentence={
              <>
                They <u>was</u> happy.
              </>
            }
            wrong="was"
            correction="They were happy."
            reason="You, we, and they take were, not was."
          />
        </div>
      </MissionSection>

      <MissionSection
        id="past-real-life"
        icon={<MessageCircle />}
        eyebrow="Real-life English"
        title="Talking about yesterday"
      >
        <div className="grammar-chat">
          <p>
            <span>Aiman</span> What <strong>did you do</strong> yesterday?
          </p>
          <p>
            <span>Sara</span> <strong>I visited</strong> my cousin.
          </p>
          <p>
            <span>Aiman</span> <strong>Did you stay</strong> there long?
          </p>
          <p>
            <span>Sara</span> No, <strong>I came</strong> home before dinner.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="past-check"
        icon={<CheckCircle2 />}
        eyebrow="Test yourself"
        title="Quick check"
      >
        <QuickCheck questions={simplePastQuickCheck} />
      </MissionSection>

      <MissionSection
        id="past-summary"
        icon={<Sparkles />}
        eyebrow="Revision map"
        title="Mission summary"
      >
        <div className="grammar-summary-grid">
          <ConceptCard title="Simple past">
            <p>finished actions before now</p>
          </ConceptCard>
          <ConceptCard title="Positive">
            <p>subject + past verb</p>
          </ConceptCard>
          <ConceptCard title="Negative">
            <p>subject + didn't + base verb</p>
          </ConceptCard>
          <ConceptCard title="Question">
            <p>Did + subject + base verb?</p>
          </ConceptCard>
          <ConceptCard title="Past of be">
            <p>I/he/she/it → was · you/we/they → were</p>
          </ConceptCard>
          <ConceptCard title="Time clues">
            <p>yesterday · last night · last week · ago</p>
          </ConceptCard>
        </div>
      </MissionSection>

      <MissionSection id="past-exam" icon={<Target />} eyebrow="Exam strategy" title="Exam booster">
        <div className="grammar-exam-list">
          <p>Look for past-time clues such as yesterday, last week, and ago.</p>
          <p>Regular verbs often end in -ed, so check the spelling rule you need.</p>
          <p>Learn common irregular verbs — they do not follow the -ed rule.</p>
          <p>After did or didn't, always use the base verb.</p>
          <p>Check was and were carefully — they do not mix and match with subjects.</p>
        </div>
        <div className="grammar-exam-booster">
          <Target aria-hidden="true" />
          <p>
            <strong>Worked example:</strong> “She ___ to the library yesterday.” Yesterday is a past
            clue and go is irregular, so go becomes went: <strong>She went to the library.</strong>
          </p>
        </div>
      </MissionSection>
    </>
  );
}

function PastContinuousLesson() {
  return (
    <>
      <MissionSection
        id="past-cont-brief"
        icon={<Target />}
        eyebrow="Mission brief"
        title="Talk about what was already happening"
      >
        <div className="grammar-brief-card">
          <p>
            Past continuous describes an action that <strong>was already in progress</strong> at a
            particular time in the past.
          </p>
          <p>
            By the end of this mission, you will know how to form it, use it with when and while,
            and tell it apart from the simple past.
          </p>
          <div className="grammar-pill-row">
            <span>Match was / were</span>
            <span>Form verb-ing</span>
            <span>Use when and while</span>
          </div>
        </div>
      </MissionSection>

      <MissionSection
        id="past-cont-big-idea"
        icon={<Lightbulb />}
        eyebrow="Big idea"
        title="The action was in progress at that moment"
      >
        <div
          className="grammar-progress-band"
          aria-label="Timeline showing an action in progress at a moment in the past"
        >
          <span>past</span>
          <div className="grammar-progress-band__band">action in progress</div>
          <span>now</span>
          <em className="grammar-progress-band__caption">Was happening · at that moment</em>
        </div>
        <ConceptGrid>
          <ConceptCard label="At 8 p.m." title="I was studying at 8 p.m.">
            <p>The studying had already started at that time.</p>
          </ConceptCard>
          <ConceptCard label="Interrupted" title="She was sleeping when I called.">
            <p>The sleeping was already in progress when the call came.</p>
          </ConceptCard>
          <ConceptCard label="In the evening" title="They were playing football in the evening.">
            <p>The game was underway during that part of the day.</p>
          </ConceptCard>
          <ConceptCard label="On the way" title="We were walking home.">
            <p>The walk was in progress, not finished.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="past-cont-formula"
        icon={<BadgeCheck />}
        eyebrow="How it works"
        title="Basic formula"
      >
        <Formula>
          <strong>Subject</strong>
          <span>+</span>
          <strong>was / were</strong>
          <span>+</span>
          <strong>verb-ing</strong>
        </Formula>
        <p className="grammar-centred-example">
          I <strong>was reading</strong>. · She <strong>was sleeping</strong>. · They{" "}
          <strong>were playing</strong>.
        </p>
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>Watch out:</strong> you need both parts — a past be-verb and a main verb ending
            in -ing.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="past-cont-was-were"
        icon={<CircleHelp />}
        eyebrow="Control panel"
        title="Choose was or were"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="I / He / She / It" title="was">
            <p>I was studying.</p>
            <p>He was running.</p>
          </ConceptCard>
          <ConceptCard label="You / We / They" title="were">
            <p>We were waiting.</p>
            <p>They were talking.</p>
          </ConceptCard>
        </div>
        <div className="grammar-wrong-right">
          <span>
            <X aria-hidden="true" /> They was playing.
          </span>
          <span>
            <Check aria-hidden="true" /> They were playing.
          </span>
        </div>
      </MissionSection>

      <MissionSection
        id="past-cont-ing"
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
        <div className="grammar-bridge-note">
          <strong>Already know this?</strong>
          <p>
            These are exactly the same -ing rules you used in the present continuous. Only the
            be-verb changes: am/is/are becomes was/were.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="past-cont-progress"
        icon={<BookOpen />}
        eyebrow="See it in action"
        title="Action in progress at a past time"
      >
        <LessonArtwork
          src="/assets/english/form-1/grammar/past-continuous/progress-action.webp"
          alt="Several everyday activities shown while they were still happening at a past moment."
          width={1100}
          height={619}
        />
        <ConceptGrid>
          <ConceptCard label="At 8 p.m." title="At 8 p.m., I was doing my homework.">
            <p>The homework was underway at that exact time.</p>
          </ConceptCard>
          <ConceptCard label="At noon" title="At noon, she was having lunch.">
            <p>Lunch had started and was not finished.</p>
          </ConceptCard>
          <ConceptCard label="At that time" title="At that time, they were watching TV.">
            <p>They takes were, and the verb becomes watching.</p>
          </ConceptCard>
          <ConceptCard label="At 7 a.m." title="At 7 a.m., we were waiting for the bus.">
            <p>The waiting was in progress at that moment.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="past-cont-interrupted"
        icon={<AlertTriangle />}
        eyebrow="The key pattern"
        title="Interrupted action"
      >
        <div className="grammar-brief-card">
          <p>
            A long action was already in progress when a shorter action <strong>interrupted</strong>{" "}
            it.
          </p>
        </div>
        <div
          className="grammar-interrupt"
          aria-label="A long action in progress interrupted by a short event"
        >
          <div className="grammar-interrupt__lane">
            <b>Long action</b>
            <div className="grammar-interrupt__long">I was cooking dinner</div>
          </div>
          <div className="grammar-interrupt__lane">
            <b>Short event</b>
            <div className="grammar-interrupt__short">
              <i aria-hidden="true" />
              <span>the phone rang</span>
            </div>
          </div>
        </div>
        <p className="grammar-centred-example">
          I <strong>was cooking</strong> dinner <strong>when</strong> the phone{" "}
          <strong>rang</strong>.
        </p>
        <div className="grammar-compare-grid">
          <ConceptCard label="Past continuous" title="The long, ongoing action">
            <p>was cooking</p>
          </ConceptCard>
          <ConceptCard label="Simple past" title="The short action that interrupts">
            <p>rang</p>
          </ConceptCard>
        </div>
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>Watch out:</strong> this kind of sentence uses two different tenses on purpose —
            one for the background action, one for the interruption.
          </p>
        </div>
      </MissionSection>

      <MissionSection id="past-cont-when" icon={<CircleHelp />} eyebrow="Linking word" title="When">
        <div className="grammar-brief-card">
          <p>
            <strong>When</strong> usually introduces the shorter action — the one that interrupts.
          </p>
        </div>
        <ConceptGrid>
          <ConceptCard label="When" title="I was sleeping when the alarm rang.">
            <p>The alarm is the short interrupting event.</p>
          </ConceptCard>
          <ConceptCard label="When" title="She was cooking when I arrived.">
            <p>Arriving happened during the cooking.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection id="past-cont-while" icon={<Sparkles />} eyebrow="Linking word" title="While">
        <div className="grammar-brief-card">
          <p>
            <strong>While</strong> connects two actions happening <strong>at the same time</strong>.
          </p>
        </div>
        <div className="grammar-parallel" aria-label="Two actions happening at the same time">
          <div>I was reading</div>
          <div>she was cooking</div>
        </div>
        <p className="grammar-centred-example">
          I <strong>was reading</strong> while she <strong>was cooking</strong>.
        </p>
        <ConceptGrid>
          <ConceptCard label="While" title="While I was studying, my brother was watching TV.">
            <p>Both actions were in progress together.</p>
          </ConceptCard>
          <ConceptCard label="While" title="They were talking while they were walking home.">
            <p>Two ongoing actions share the same stretch of time.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="past-cont-when-while"
        icon={<BookOpen />}
        eyebrow="Compare it"
        title="When vs while"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="When" title="Introduces the interrupting action">
            <p>I was sleeping when the phone rang.</p>
            <p className="grammar-note">long action + short event</p>
          </ConceptCard>
          <ConceptCard label="While" title="Connects two ongoing actions">
            <p>I was cooking while she was studying.</p>
            <p className="grammar-note">two actions at the same time</p>
          </ConceptCard>
        </div>
        <Formula>
          <span>when</span>
          <ArrowRight aria-hidden="true" />
          <strong>interrupts</strong>
          <span>while</span>
          <ArrowRight aria-hidden="true" />
          <strong>same time</strong>
        </Formula>
      </MissionSection>

      <MissionSection
        id="past-cont-negative"
        icon={<X />}
        eyebrow="Negative structures"
        title="Add not after was or were"
      >
        <Formula>
          <strong>Subject</strong>
          <span>+</span>
          <strong>was / were</strong>
          <span>+</span>
          <strong>not</strong>
          <span>+</span>
          <strong>verb-ing</strong>
        </Formula>
        <ConceptGrid>
          <ConceptCard label="I" title="I was not sleeping.">
            <p>You can also say: I wasn't sleeping.</p>
          </ConceptCard>
          <ConceptCard label="She" title="She was not studying.">
            <p>You can also say: She wasn't studying.</p>
          </ConceptCard>
          <ConceptCard label="They" title="They were not playing.">
            <p>You can also say: They weren't playing.</p>
          </ConceptCard>
        </ConceptGrid>
        <div className="grammar-time-chips" aria-label="Past continuous contractions">
          <span>was not → wasn't</span>
          <span>were not → weren't</span>
        </div>
      </MissionSection>

      <MissionSection
        id="past-cont-questions"
        icon={<CircleHelp />}
        eyebrow="Question structures"
        title="Move was or were before the subject"
      >
        <Formula>
          <strong>Was / Were</strong>
          <span>+</span>
          <strong>subject</strong>
          <span>+</span>
          <strong>verb-ing?</strong>
        </Formula>
        <ConceptGrid>
          <ConceptCard label="Were" title="Were you studying?">
            <p>Yes, I was. · No, I wasn't.</p>
          </ConceptCard>
          <ConceptCard label="Was" title="Was she sleeping?">
            <p>Yes, she was. · No, she wasn't.</p>
          </ConceptCard>
          <ConceptCard label="Were" title="Were they playing?">
            <p>Yes, they were. · No, they weren't.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="past-cont-compare"
        icon={<BookOpen />}
        eyebrow="Compare it"
        title="Simple Past vs Past Continuous"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="Simple past" title="I played football yesterday.">
            <LessonArtwork
              src="/assets/english/form-1/grammar/simple-past/compare-past.webp"
              alt="Student after a finished football game."
              width={700}
              height={467}
            />
            <p className="grammar-note">yesterday · finished action</p>
          </ConceptCard>
          <ConceptCard label="Past continuous" title="I was playing football at 5 p.m.">
            <LessonArtwork
              src="/assets/english/form-1/grammar/past-continuous/compare-progress.webp"
              alt="Same student mid-game, with the football action still in progress."
              width={700}
              height={467}
            />
            <p className="grammar-note">at 5 p.m. · in progress at that moment</p>
          </ConceptCard>
        </div>
        <Formula>
          <span>yesterday</span>
          <ArrowRight aria-hidden="true" />
          <strong>simple past</strong>
          <span>at 5 p.m.</span>
          <ArrowRight aria-hidden="true" />
          <strong>past continuous</strong>
        </Formula>
      </MissionSection>

      <MissionSection
        id="past-cont-errors"
        icon={<Search />}
        eyebrow="Common mistakes"
        title="Error detector"
      >
        <div className="grammar-error-grid">
          <ErrorDetector
            sentence={
              <>
                I was <u>study</u> at 8 p.m.
              </>
            }
            wrong="study"
            correction="I was studying at 8 p.m."
            reason="After was or were, the main verb needs -ing."
          />
          <ErrorDetector
            sentence={
              <>
                They <u>was</u> playing football.
              </>
            }
            wrong="was"
            correction="They were playing football."
            reason="You, we, and they take were, not was."
          />
          <ErrorDetector
            sentence={
              <>
                She <u>were</u> sleeping.
              </>
            }
            wrong="were"
            correction="She was sleeping."
            reason="He, she, and it take was, not were."
          />
          <ErrorDetector
            sentence={
              <>
                I <u>studying</u> when you called.
              </>
            }
            wrong="studying"
            correction="I was studying when you called."
            reason="An -ing verb alone is not a full sentence — it needs was or were."
          />
          <ErrorDetector
            sentence={
              <>
                We were <u>play</u> football.
              </>
            }
            wrong="play"
            correction="We were playing football."
            reason="The main verb must end in -ing after were."
          />
        </div>
      </MissionSection>

      <MissionSection
        id="past-cont-real-life"
        icon={<MessageCircle />}
        eyebrow="Real-life English"
        title="Talking about last night"
      >
        <div className="grammar-chat">
          <p>
            <span>Aiman</span> What <strong>were you doing</strong> last night?
          </p>
          <p>
            <span>Sara</span> <strong>I was studying</strong>.
          </p>
          <p>
            <span>Aiman</span> <strong>Were you studying</strong> when I messaged you?
          </p>
          <p>
            <span>Sara</span> Yes. <strong>I was finishing</strong> my homework.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="past-cont-check"
        icon={<CheckCircle2 />}
        eyebrow="Test yourself"
        title="Quick check"
      >
        <QuickCheck questions={pastContinuousQuickCheck} />
      </MissionSection>

      <MissionSection
        id="past-cont-summary"
        icon={<Sparkles />}
        eyebrow="Revision map"
        title="Mission summary"
      >
        <div className="grammar-summary-grid">
          <ConceptCard title="Past continuous">
            <p>action in progress at a past moment</p>
          </ConceptCard>
          <ConceptCard title="Formula">
            <p>subject + was / were + verb-ing</p>
          </ConceptCard>
          <ConceptCard title="Was / were match">
            <p>I/he/she/it → was · you/we/they → were</p>
          </ConceptCard>
          <ConceptCard title="Negative">
            <p>subject + wasn't / weren't + verb-ing</p>
          </ConceptCard>
          <ConceptCard title="Question">
            <p>Was / Were + subject + verb-ing?</p>
          </ConceptCard>
          <ConceptCard title="Common clues">
            <p>at 8 p.m. · at that moment · while · when</p>
          </ConceptCard>
        </div>
      </MissionSection>

      <MissionSection
        id="past-cont-exam"
        icon={<Target />}
        eyebrow="Exam strategy"
        title="Exam booster"
      >
        <div className="grammar-exam-list">
          <p>Look for a specific past moment such as at 8 p.m., or an interrupting event.</p>
          <p>Choose was or were correctly for the subject.</p>
          <p>The main verb must end in -ing — a lone -ing verb is not a full sentence.</p>
          <p>When usually introduces the shorter, interrupting action.</p>
          <p>While usually connects two actions happening together.</p>
          <p>Decide whether the action is finished (simple past) or ongoing (past continuous).</p>
        </div>
        <div className="grammar-exam-booster">
          <Target aria-hidden="true" />
          <p>
            <strong>Worked example:</strong> “At 8 p.m., Amir ___ his homework.” At 8 p.m. names a
            past moment and the homework was already underway, so:{" "}
            <strong>Amir was doing his homework.</strong>
          </p>
        </div>
      </MissionSection>
    </>
  );
}

function PresentPerfectLesson() {
  const participles = [
    ["go", "gone"],
    ["be", "been"],
    ["eat", "eaten"],
    ["see", "seen"],
    ["do", "done"],
    ["make", "made"],
    ["write", "written"],
    ["take", "taken"],
    ["buy", "bought"],
    ["have", "had"],
  ];

  return (
    <>
      <MissionSection
        id="perfect-brief"
        icon={<Target />}
        eyebrow="Mission brief"
        title="Connect the past to right now"
      >
        <div className="grammar-brief-card">
          <p>
            Present perfect links a past action to <strong>this moment</strong>. The exact past time
            is usually not the point — the connection to now is.
          </p>
          <p>
            By the end of this mission, you will be able to form it, choose have or has, use past
            participles, and tell it apart from the simple past.
          </p>
          <div className="grammar-pill-row">
            <span>Choose have / has</span>
            <span>Use past participles</span>
            <span>Spot the time clues</span>
          </div>
        </div>
      </MissionSection>

      <MissionSection
        id="perfect-big-idea"
        icon={<Lightbulb />}
        eyebrow="Big idea"
        title="Past connected to now"
      >
        <div className="grammar-bridge">
          <svg
            viewBox="0 0 320 110"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="A past moment on the left joined by a glowing bridge to now on the right."
          >
            <rect
              className="grammar-bridge__block is-past"
              x="18"
              y="66"
              width="78"
              height="32"
              rx="10"
            />
            <text className="grammar-bridge__text is-past" x="57" y="87" textAnchor="middle">
              PAST
            </text>
            <rect
              className="grammar-bridge__block is-now"
              x="224"
              y="66"
              width="78"
              height="32"
              rx="10"
            />
            <text className="grammar-bridge__text is-now" x="263" y="87" textAnchor="middle">
              NOW
            </text>
            <path className="grammar-bridge__link" d="M96,74 Q160,16 224,74" />
            <circle className="grammar-bridge__hub" cx="160" cy="40" r="17" />
            <path className="grammar-bridge__tick" d="M152,40 L158,46 L169,32" />
          </svg>
          <p className="grammar-bridge__caption">Still connected to now</p>
        </div>
        <ConceptGrid>
          <ConceptCard label="Result now" title="I have finished my homework.">
            <p>The work is done, so I am free right now.</p>
          </ConceptCard>
          <ConceptCard label="Experience" title="She has visited Japan.">
            <p>It is part of her life experience — we are not saying when.</p>
          </ConceptCard>
          <ConceptCard label="Recent" title="They have arrived.">
            <p>They are here now, and it happened only a moment ago.</p>
          </ConceptCard>
          <ConceptCard label="Result now" title="He has lost his phone.">
            <p>He still does not have it — that is why it matters.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="perfect-formula"
        icon={<BadgeCheck />}
        eyebrow="How it works"
        title="Basic formula"
      >
        <Formula>
          <strong>Subject</strong>
          <span>+</span>
          <strong>have / has</strong>
          <span>+</span>
          <strong>past participle</strong>
        </Formula>
        <p className="grammar-centred-example">
          I <strong>have eaten</strong>. · She <strong>has gone</strong> home. · They{" "}
          <strong>have finished</strong>.
        </p>
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>Watch out:</strong> you need both parts — the helping verb have or has, and the
            past participle of the main verb.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="perfect-have-has"
        icon={<CircleHelp />}
        eyebrow="Control panel"
        title="Choose have or has"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="I / You / We / They" title="have">
            <p>I have finished.</p>
            <p>We have finished.</p>
          </ConceptCard>
          <ConceptCard label="He / She / It" title="has">
            <p>She has finished.</p>
            <p>It has stopped.</p>
          </ConceptCard>
        </div>
        <div className="grammar-wrong-right">
          <span>
            <X aria-hidden="true" /> She have finished.
          </span>
          <span>
            <Check aria-hidden="true" /> She has finished.
          </span>
        </div>
      </MissionSection>

      <MissionSection
        id="perfect-participles"
        icon={<Sparkles />}
        eyebrow="Verb transformation"
        title="Past participle forms"
      >
        <div className="grammar-brief-card">
          <p>
            For <strong>regular</strong> verbs, the past participle looks exactly like the simple
            past form: just add -ed.
          </p>
        </div>
        <div className="grammar-ing-transform" aria-label="Regular past participles">
          <span>
            finish <strong>→ finished</strong>
          </span>
          <span>
            play <strong>→ played</strong>
          </span>
          <span>
            watch <strong>→ watched</strong>
          </span>
          <span>
            study <strong>→ studied</strong>
          </span>
        </div>
        <div className="grammar-brief-card">
          <p>
            <strong>Irregular</strong> participles change form and simply need to be learned. Many
            of them are different from the simple past — go became went, but the participle is gone.
          </p>
        </div>
        <ul className="grammar-verb-grid" aria-label="Common irregular past participles">
          {participles.map(([base, participle]) => (
            <li key={base}>
              <span>{base}</span>
              <ArrowRight aria-hidden="true" />
              <strong>{participle}</strong>
            </li>
          ))}
        </ul>
        <div className="grammar-compare-grid">
          <ConceptCard label="has gone" title="He has gone to Japan.">
            <p>He went and he is still there, or still on the way.</p>
          </ConceptCard>
          <ConceptCard label="has been" title="He has been to Japan.">
            <p>He went there at some point and has already come back.</p>
          </ConceptCard>
        </div>
      </MissionSection>

      <MissionSection
        id="perfect-result"
        icon={<BookOpen />}
        eyebrow="See it in action"
        title="Finished action with a result now"
      >
        <LessonArtwork
          src="/assets/english/form-1/grammar/present-perfect/result-now.webp"
          alt="Three scenes: a student locked out after losing a key, a student holding broken glasses, and a relaxed student with finished homework."
          width={1200}
          height={675}
        />
        <ConceptGrid>
          <ConceptCard label="Lost key" title="I have lost my key.">
            <p>I cannot open the door now.</p>
          </ConceptCard>
          <ConceptCard label="Broken glasses" title="She has broken her glasses.">
            <p>She cannot use them properly now.</p>
          </ConceptCard>
          <ConceptCard label="Homework done" title="They have finished their homework.">
            <p>They are free now.</p>
          </ConceptCard>
          <ConceptCard label="The pattern" title="Past action → result now">
            <p>The action is finished, but its effect is still here.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="perfect-since-for"
        icon={<Clock />}
        eyebrow="Time words"
        title="Since and for"
      >
        <div className="grammar-duration">
          <div className="grammar-duration__row is-since">
            <span className="grammar-duration__label">SINCE</span>
            <div
              className="grammar-duration__track"
              role="img"
              aria-label="A line starting at a fixed point, 2020, and running all the way to now."
            >
              <span className="grammar-duration__fill" />
              <span className="grammar-duration__mark is-start">2020</span>
              <span className="grammar-duration__mark is-end">now</span>
            </div>
          </div>
          <div className="grammar-duration__row is-for">
            <span className="grammar-duration__label">FOR</span>
            <div
              className="grammar-duration__track"
              role="img"
              aria-label="A shaded stretch of time measuring three years in length."
            >
              <span className="grammar-duration__fill" />
              <span className="grammar-duration__mark is-start">three years</span>
            </div>
          </div>
        </div>
        <div className="grammar-compare-grid">
          <ConceptCard label="Since" title="A starting point">
            <p>since Monday · since 2020 · since morning</p>
            <p className="grammar-note">Answers: when did it start?</p>
          </ConceptCard>
          <ConceptCard label="For" title="A length of time">
            <p>for two hours · for three years · for a long time</p>
            <p className="grammar-note">Answers: how long has it lasted?</p>
          </ConceptCard>
        </div>
        <p className="grammar-centred-example">
          I have lived here <strong>since 2020</strong>. · I have lived here{" "}
          <strong>for three years</strong>.
        </p>
      </MissionSection>

      <MissionSection
        id="perfect-already"
        icon={<Sparkles />}
        eyebrow="Signal words"
        title="Already, yet, and just"
      >
        <div className="grammar-three-grid">
          <ConceptCard label="Positive sentences" title="already">
            <p>Something happened before now, or sooner than expected.</p>
            <p>I have already eaten.</p>
          </ConceptCard>
          <ConceptCard label="Questions & negatives" title="yet">
            <p>Used when something is still expected to happen.</p>
            <p>Have you finished yet? · I haven't finished yet.</p>
          </ConceptCard>
          <ConceptCard label="Very recently" title="just">
            <p>It happened only a moment ago.</p>
            <p>I have just finished my homework.</p>
          </ConceptCard>
        </div>
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>Word order:</strong> already and just go between have/has and the participle.
            Yet goes at the end of the sentence.
          </p>
        </div>
      </MissionSection>

      <MissionSection
        id="perfect-experiences"
        icon={<BookOpen />}
        eyebrow="See it in action"
        title="Life experiences"
      >
        <div className="grammar-brief-card">
          <p>
            Use the present perfect for things someone has experienced at some point in their life,
            when the <strong>exact time is not important</strong>.
          </p>
        </div>
        <LessonArtwork
          src="/assets/english/form-1/grammar/present-perfect/experiences.webp"
          alt="One student surrounded by memories: travelling to a landmark, riding a horse, trying local food, and watching a movie."
          width={1200}
          height={675}
        />
        <ConceptGrid>
          <ConceptCard label="Travel" title="I have visited Penang.">
            <p>The trip is part of my experience — we do not say when.</p>
          </ConceptCard>
          <ConceptCard label="Activity" title="She has ridden a horse.">
            <p>It happened at some point in her life.</p>
          </ConceptCard>
          <ConceptCard label="Food" title="They have tried sushi.">
            <p>They know what it tastes like now.</p>
          </ConceptCard>
          <ConceptCard label="Entertainment" title="We have seen that movie.">
            <p>We already know the story.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="perfect-ever-never"
        icon={<CircleHelp />}
        eyebrow="Signal words"
        title="Ever and never"
      >
        <div className="grammar-compare-grid">
          <ConceptCard label="Ever" title="Asking about a whole life">
            <p>Have you ever visited Sabah?</p>
            <p>Have you ever ridden a horse?</p>
          </ConceptCard>
          <ConceptCard label="Never" title="Not once, at any time">
            <p>I have never ridden a horse.</p>
            <p className="grammar-note">Never is already negative — do not add not.</p>
          </ConceptCard>
        </div>
        <div className="grammar-time-chips" aria-label="Short answers with ever questions">
          <span>Yes, I have.</span>
          <span>No, I haven't.</span>
        </div>
      </MissionSection>

      <MissionSection
        id="perfect-continuing"
        icon={<Clock />}
        eyebrow="The other main use"
        title="A situation that continues until now"
      >
        <div className="grammar-brief-card">
          <p>
            Some states and situations <strong>began in the past and are still true now</strong>.
            The present perfect shows that stretch of time.
          </p>
        </div>
        <div
          className="grammar-progress-band"
          aria-label="Timeline: a situation starting in the past and continuing all the way to now."
        >
          <span>start in past</span>
          <div className="grammar-progress-band__band">still true</div>
          <span>now</span>
          <em className="grammar-progress-band__caption">Began before · continues now</em>
        </div>
        <ConceptGrid>
          <ConceptCard label="For" title="I have known Amir for five years.">
            <p>We met five years ago and we are still friends.</p>
          </ConceptCard>
          <ConceptCard label="Since" title="She has lived here since 2022.">
            <p>She moved in 2022 and she still lives here.</p>
          </ConceptCard>
          <ConceptCard label="For" title="We have studied English for many years.">
            <p>The studying started long ago and has not stopped.</p>
          </ConceptCard>
          <ConceptCard label="Careful" title="Not every sentence continues">
            <p>
              This use is for states and situations that carry on. I have lost my key is finished —
              only its result continues.
            </p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="perfect-negative"
        icon={<X />}
        eyebrow="Negative structures"
        title="Add not after have or has"
      >
        <Formula>
          <strong>Subject</strong>
          <span>+</span>
          <strong>have / has</strong>
          <span>+</span>
          <strong>not</strong>
          <span>+</span>
          <strong>past participle</strong>
        </Formula>
        <ConceptGrid>
          <ConceptCard label="I" title="I have not finished.">
            <p>You can also say: I haven't finished.</p>
          </ConceptCard>
          <ConceptCard label="She" title="She has not arrived.">
            <p>You can also say: She hasn't arrived.</p>
          </ConceptCard>
          <ConceptCard label="They" title="They have not eaten.">
            <p>You can also say: They haven't eaten.</p>
          </ConceptCard>
        </ConceptGrid>
        <div className="grammar-time-chips" aria-label="Present perfect contractions">
          <span>have not → haven't</span>
          <span>has not → hasn't</span>
        </div>
      </MissionSection>

      <MissionSection
        id="perfect-questions"
        icon={<CircleHelp />}
        eyebrow="Question structures"
        title="Move have or has before the subject"
      >
        <Formula>
          <strong>Have / Has</strong>
          <span>+</span>
          <strong>subject</strong>
          <span>+</span>
          <strong>past participle?</strong>
        </Formula>
        <ConceptGrid>
          <ConceptCard label="Have" title="Have you finished?">
            <p>Yes, I have. · No, I haven't.</p>
          </ConceptCard>
          <ConceptCard label="Has" title="Has she arrived?">
            <p>Yes, she has. · No, she hasn't.</p>
          </ConceptCard>
          <ConceptCard label="Have" title="Have they eaten?">
            <p>Yes, they have. · No, they haven't.</p>
          </ConceptCard>
        </ConceptGrid>
      </MissionSection>

      <MissionSection
        id="perfect-compare"
        icon={<BookOpen />}
        eyebrow="Compare it"
        title="Simple Past vs Present Perfect"
      >
        <div className="grammar-compare-grid is-media">
          <ConceptCard label="Simple past" title="I visited Penang last year.">
            <LessonArtwork
              src="/assets/english/form-1/grammar/present-perfect/compare-simple-past.webp"
              alt="A student photographing a Penang street on one specific trip."
              width={900}
              height={600}
            />
            <p className="grammar-note">last year · specific finished time</p>
          </ConceptCard>
          <ConceptCard label="Present perfect" title="I have visited Penang.">
            <LessonArtwork
              src="/assets/english/form-1/grammar/present-perfect/compare-present-perfect.webp"
              alt="The same student now, with the Penang trip glowing behind them as a memory."
              width={900}
              height={600}
            />
            <p className="grammar-note">no time stated · a life experience</p>
          </ConceptCard>
        </div>
        <Formula>
          <span>last year</span>
          <ArrowRight aria-hidden="true" />
          <strong>simple past</strong>
          <span>no time stated</span>
          <ArrowRight aria-hidden="true" />
          <strong>present perfect</strong>
        </Formula>
      </MissionSection>

      <MissionSection
        id="perfect-time-warning"
        icon={<AlertTriangle />}
        eyebrow="Important warning"
        title="Finished past times do not fit"
      >
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <strong>Remember:</strong> the present perfect normally does not go with a finished
            past-time expression such as yesterday, last week, last year, or in 2023.
          </p>
        </div>
        <div className="grammar-time-chips" aria-label="Finished past-time expressions">
          <span>yesterday</span>
          <span>last week</span>
          <span>last year</span>
          <span>in 2023</span>
        </div>
        <div className="grammar-wrong-right">
          <span>
            <X aria-hidden="true" /> I have visited Penang last year.
          </span>
          <span>
            <Check aria-hidden="true" /> I visited Penang last year.
          </span>
        </div>
        <p className="grammar-centred-example">
          Keeping the present perfect? Drop the finished time:{" "}
          <strong>I have visited Penang before.</strong>
        </p>
      </MissionSection>

      <MissionSection
        id="perfect-errors"
        icon={<Search />}
        eyebrow="Common mistakes"
        title="Error detector"
      >
        <div className="grammar-error-grid">
          <ErrorDetector
            sentence={
              <>
                She <u>have</u> finished.
              </>
            }
            wrong="have"
            correction="She has finished."
            reason="He, she, and it take has, not have."
          />
          <ErrorDetector
            sentence={
              <>
                I <u>has</u> eaten.
              </>
            }
            wrong="has"
            correction="I have eaten."
            reason="I, you, we, and they take have, not has."
          />
          <ErrorDetector
            sentence={
              <>
                He has <u>went</u> home.
              </>
            }
            wrong="went"
            correction="He has gone home."
            reason="After have or has, use the past participle. Went is the simple past; gone is the participle."
          />
          <ErrorDetector
            sentence={
              <>
                I have seen him <u>yesterday</u>.
              </>
            }
            wrong="yesterday"
            correction="I saw him yesterday."
            reason="Yesterday is a finished past time, so the sentence needs the simple past."
          />
          <ErrorDetector
            sentence={
              <>
                She has lived here <u>since three years</u>.
              </>
            }
            wrong="since three years"
            correction="She has lived here for three years."
            reason="For measures a length of time; since needs a starting point such as 2022."
          />
        </div>
      </MissionSection>

      <MissionSection
        id="perfect-real-life"
        icon={<MessageCircle />}
        eyebrow="Real-life English"
        title="Asking about an experience"
      >
        <div className="grammar-chat">
          <p>
            <span>Aiman</span> <strong>Have you ever been</strong> to Penang?
          </p>
          <p>
            <span>Sara</span> Yes, <strong>I have</strong>.
          </p>
          <p>
            <span>Aiman</span> When <strong>did you go</strong>?
          </p>
          <p>
            <span>Sara</span> <strong>I went</strong> there last year.
          </p>
        </div>
        <div className="grammar-compare-grid">
          <ConceptCard label="Present perfect" title="Asks about the experience">
            <p>Have you ever been to Penang?</p>
            <p className="grammar-note">no time — just: has it ever happened?</p>
          </ConceptCard>
          <ConceptCard label="Simple past" title="Asks for the specific detail">
            <p>When did you go? I went there last year.</p>
            <p className="grammar-note">once the time is named, switch to the simple past</p>
          </ConceptCard>
        </div>
      </MissionSection>

      <MissionSection
        id="perfect-check"
        icon={<CheckCircle2 />}
        eyebrow="Test yourself"
        title="Quick check"
      >
        <QuickCheck questions={presentPerfectQuickCheck} />
      </MissionSection>

      <MissionSection
        id="perfect-summary"
        icon={<Sparkles />}
        eyebrow="Revision map"
        title="Mission summary"
      >
        <div className="grammar-summary-grid">
          <ConceptCard title="Present perfect">
            <p>past connected to now</p>
          </ConceptCard>
          <ConceptCard title="Formula">
            <p>subject + have / has + past participle</p>
          </ConceptCard>
          <ConceptCard title="Have">
            <p>I / you / we / they</p>
          </ConceptCard>
          <ConceptCard title="Has">
            <p>he / she / it</p>
          </ConceptCard>
          <ConceptCard title="Common uses">
            <p>result now · life experience · recent action · continuing situation</p>
          </ConceptCard>
          <ConceptCard title="Common words">
            <p>ever · never · just · already · yet · for · since</p>
          </ConceptCard>
        </div>
      </MissionSection>

      <MissionSection
        id="perfect-exam"
        icon={<Target />}
        eyebrow="Exam strategy"
        title="Exam booster"
      >
        <div className="grammar-exam-list">
          <p>Check whether an exact finished past time is stated.</p>
          <p>
            If last year, yesterday, or a similar clue appears, the simple past is usually needed.
          </p>
          <p>Choose have or has correctly for the subject.</p>
          <p>Use the past participle, not the simple past form.</p>
          <p>Learn the common irregular participles by heart.</p>
          <p>For = duration, such as for three years.</p>
          <p>Since = starting point, such as since 2022.</p>
        </div>
        <div className="grammar-exam-booster">
          <Target aria-hidden="true" />
          <p>
            <strong>Worked example:</strong> “She ___ already ___ her homework.” The subject is she,
            so the helping verb is <strong>has</strong>; the past participle of finish is{" "}
            <strong>finished</strong>. Answer:{" "}
            <strong>She has already finished her homework.</strong>
          </p>
        </div>
      </MissionSection>
    </>
  );
}

const LESSON_ICONS: Record<LessonIconName, ReactNode> = {
  target: <Target />,
  lightbulb: <Lightbulb />,
  badge: <BadgeCheck />,
  help: <CircleHelp />,
  sparkles: <Sparkles />,
  book: <BookOpen />,
  search: <Search />,
  message: <MessageCircle />,
  check: <CheckCircle2 />,
  clock: <Clock />,
};

function RichTextView({ value }: { value: RichText }) {
  if (typeof value === "string") return <>{value}</>;
  return (
    <>
      {value.map((part, index) => {
        if (typeof part === "string") return <span key={index}>{part}</span>;
        if ("b" in part) return <strong key={index}>{part.b}</strong>;
        return <u key={index}>{part.u}</u>;
      })}
    </>
  );
}

function LessonCards({ cards, className }: { cards: CardSpec[]; className: string }) {
  return (
    <div className={className}>
      {cards.map((card) => (
        <ConceptCard key={card.title} label={card.label} title={card.title}>
          {card.body?.map((line, index) => (
            <p key={index}>
              <RichTextView value={line} />
            </p>
          ))}
          {card.note && <p className="grammar-note">{card.note}</p>}
        </ConceptCard>
      ))}
    </div>
  );
}

function LessonBlock({ block }: { block: LessonBlockSpec }) {
  switch (block.kind) {
    case "brief":
      return (
        <div className="grammar-brief-card">
          {block.paragraphs.map((paragraph, index) => (
            <p key={index}>
              <RichTextView value={paragraph} />
            </p>
          ))}
          {block.pills && (
            <div className="grammar-pill-row">
              {block.pills.map((pill) => (
                <span key={pill}>{pill}</span>
              ))}
            </div>
          )}
        </div>
      );
    case "concepts":
      return <LessonCards cards={block.cards} className="grammar-concept-grid" />;
    case "compare":
      return <LessonCards cards={block.cards} className="grammar-compare-grid" />;
    case "three":
      return <LessonCards cards={block.cards} className="grammar-three-grid" />;
    case "formula":
      return (
        <Formula>
          {block.parts.map((part, index) =>
            part === "+" ? <span key={index}>{part}</span> : <strong key={index}>{part}</strong>,
          )}
        </Formula>
      );
    case "example":
      return (
        <p className="grammar-centred-example">
          <RichTextView value={block.text} />
        </p>
      );
    case "watchout":
      return (
        <div className="grammar-watchout">
          <AlertTriangle aria-hidden="true" />
          <p>
            <RichTextView value={block.text} />
          </p>
        </div>
      );
    case "wrongRight":
      return (
        <div className="grammar-wrong-right">
          <span>
            <X aria-hidden="true" /> {block.wrong}
          </span>
          <span>
            <Check aria-hidden="true" /> {block.right}
          </span>
        </div>
      );
    case "ruleTable":
      return (
        <div className="grammar-rule-table" role="table" aria-label={block.label}>
          {block.rows.map(([name, rule, example]) => (
            <div key={name} role="row">
              <strong role="cell">{name}</strong>
              <span role="cell">{rule}</span>
              <span role="cell">{example}</span>
            </div>
          ))}
        </div>
      );
    case "transform":
      return (
        <div className="grammar-ing-transform" aria-label={block.label}>
          {block.items.map(([from, to]) => (
            <span key={from}>
              {from} <strong>→ {to}</strong>
            </span>
          ))}
        </div>
      );
    case "chips":
      return (
        <div className="grammar-time-chips" aria-label={block.label}>
          {block.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      );
    case "verbGrid":
      return (
        <ul className="grammar-verb-grid" aria-label={block.label}>
          {block.pairs.map(([from, to]) => (
            <li key={from}>
              <span>{from}</span>
              <ArrowRight aria-hidden="true" />
              <strong>{to}</strong>
            </li>
          ))}
        </ul>
      );
    case "errors":
      return (
        <div className="grammar-error-grid">
          {block.items.map((item) => (
            <ErrorDetector
              key={item.correction}
              sentence={
                <>
                  {item.before}
                  <u>{item.wrong}</u>
                  {item.after}
                </>
              }
              wrong={item.wrong}
              correction={item.correction}
              reason={item.reason}
            />
          ))}
        </div>
      );
    case "chat":
      return (
        <div className="grammar-chat">
          {block.lines.map((line, index) => (
            <p key={index}>
              <span>{line.who}</span> <RichTextView value={line.text} />
            </p>
          ))}
        </div>
      );
    case "quickCheck":
      return <QuickCheck questions={block.questions} />;
    case "summary":
      return (
        <div className="grammar-summary-grid">
          {block.cards.map((card) => (
            <ConceptCard key={card.title} title={card.title}>
              <p>{card.body}</p>
            </ConceptCard>
          ))}
        </div>
      );
    case "exam":
      return (
        <>
          <div className="grammar-exam-list">
            {block.tips.map((tip) => (
              <p key={tip}>{tip}</p>
            ))}
          </div>
          <div className="grammar-exam-booster">
            <Target aria-hidden="true" />
            <p>
              <RichTextView value={block.worked} />
            </p>
          </div>
        </>
      );
    case "bridge":
      return (
        <div className="grammar-bridge-note">
          <strong>{block.title}</strong>
          <p>
            <RichTextView value={block.text} />
          </p>
        </div>
      );
  }
}

/** Renders a whole lesson from its section data — used by Topics 07–10. */
function LessonBlocks({ sections }: { sections: LessonSectionSpec[] }) {
  return (
    <>
      {sections.map((section) => (
        <MissionSection
          key={section.id}
          id={section.id}
          icon={LESSON_ICONS[section.icon]}
          eyebrow={section.eyebrow}
          title={section.title}
        >
          {section.blocks.map((block, index) => (
            <LessonBlock key={index} block={block} />
          ))}
        </MissionSection>
      ))}
    </>
  );
}

const sectionIds = (sections: LessonSectionSpec[]) => sections.map((section) => section.id);

type GrammarTopicId = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10";

type LessonConfig = {
  heading: string;
  lead: string;
  sections: string[];
  hero: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  };
  render: () => ReactNode;
};

const LESSON_CONFIG: Record<GrammarTopicId, LessonConfig> = {
  "01": {
    heading: "Nouns & Articles",
    lead: "Name it. Count it. Choose the right article.",
    sections: [
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
    ],
    hero: {
      src: "/assets/english/form-1/grammar/landing/grammar-topic-01.webp",
      alt: "",
      width: 720,
      height: 480,
    },
    render: () => <NounsLesson />,
  },
  "02": {
    heading: "Simple Present",
    lead: "Build confident sentences about routines, habits, and facts.",
    sections: [
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
    ],
    hero: {
      src: "/assets/english/form-1/grammar/simple-present/hero.webp",
      alt: "Daily routine sequence with school, study, football, and bedtime activities.",
      width: 900,
      height: 600,
    },
    render: () => <SimplePresentLesson />,
  },
  "03": {
    heading: "Present Continuous Tense",
    lead: "Talk about actions happening now, or around this moment.",
    sections: [
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
    ],
    hero: {
      src: "/assets/english/form-1/grammar/present-continuous/hero.webp",
      alt: "Student running with a backpack, showing an action happening right now.",
      width: 720,
      height: 480,
      caption: "Something is happening—right now.",
    },
    render: () => <PresentContinuousLesson />,
  },
  "04": {
    heading: "Simple Past Tense",
    lead: "Talk about actions that happened and finished before now.",
    sections: [
      "past-brief",
      "past-big-idea",
      "past-formula",
      "past-regular",
      "past-irregular",
      "past-finished",
      "past-time",
      "past-negative",
      "past-questions",
      "past-was-were",
      "past-compare",
      "past-errors",
      "past-real-life",
      "past-check",
      "past-summary",
      "past-exam",
    ],
    hero: {
      src: "/assets/english/form-1/grammar/simple-past/hero.webp",
      alt: "Student leaving after a completed activity, representing an action finished in the past.",
      width: 1100,
      height: 619,
      caption: "It happened. It's finished.",
    },
    render: () => <SimplePastLesson />,
  },
  "05": {
    heading: "Past Continuous Tense",
    lead: "Talk about actions that were happening at a particular moment in the past.",
    sections: [
      "past-cont-brief",
      "past-cont-big-idea",
      "past-cont-formula",
      "past-cont-was-were",
      "past-cont-ing",
      "past-cont-progress",
      "past-cont-interrupted",
      "past-cont-when",
      "past-cont-while",
      "past-cont-when-while",
      "past-cont-negative",
      "past-cont-questions",
      "past-cont-compare",
      "past-cont-errors",
      "past-cont-real-life",
      "past-cont-check",
      "past-cont-summary",
      "past-cont-exam",
    ],
    hero: {
      src: "/assets/english/form-1/grammar/past-continuous/hero.webp",
      alt: "Student walking under an umbrella in the rain, showing an action already in progress in the past.",
      width: 1100,
      height: 733,
      caption: "It was already happening.",
    },
    render: () => <PastContinuousLesson />,
  },
  "06": {
    heading: "Present Perfect Tense",
    lead: "Connect the past to now — something that has already happened.",
    sections: [
      "perfect-brief",
      "perfect-big-idea",
      "perfect-formula",
      "perfect-have-has",
      "perfect-participles",
      "perfect-result",
      "perfect-since-for",
      "perfect-already",
      "perfect-experiences",
      "perfect-ever-never",
      "perfect-continuing",
      "perfect-negative",
      "perfect-questions",
      "perfect-compare",
      "perfect-time-warning",
      "perfect-errors",
      "perfect-real-life",
      "perfect-check",
      "perfect-summary",
      "perfect-exam",
    ],
    hero: {
      src: "/assets/english/form-1/grammar/landing/grammar-topic-06.webp",
      alt: "A past moment linked by a glowing path to the present.",
      width: 720,
      height: 405,
      caption: "It happened before — and it still matters now.",
    },
    render: () => <PresentPerfectLesson />,
  },
  "07": {
    heading: "Future Forms",
    lead: "Talk about things that will happen, plans, intentions, and predictions.",
    sections: sectionIds(futureFormsSections),
    hero: {
      src: "/assets/english/form-1/grammar/landing/grammar-topic-07.webp",
      alt: "A rocket heading towards a future destination.",
      width: 720,
      height: 480,
      caption: "Three ways to talk about what's next.",
    },
    render: () => <LessonBlocks sections={futureFormsSections} />,
  },
  "08": {
    heading: "Subject–Verb Agreement",
    lead: "Make sure every subject and its verb match in number.",
    sections: sectionIds(subjectVerbSections),
    hero: {
      src: "/assets/english/form-1/grammar/landing/grammar-topic-08.webp",
      alt: "Two matching pieces docking together, representing a subject and verb that agree.",
      width: 720,
      height: 480,
      caption: "Subject and verb must match.",
    },
    render: () => <LessonBlocks sections={subjectVerbSections} />,
  },
  "09": {
    heading: "Modals",
    lead: "Use can, could, may, might, should, and must with confidence.",
    sections: sectionIds(modalsSections),
    hero: {
      src: "/assets/english/form-1/grammar/landing/grammar-topic-09.webp",
      alt: "A glowing lightbulb and shield, representing ability, possibility, and obligation.",
      width: 720,
      height: 480,
      caption: "One small word changes the meaning.",
    },
    render: () => <LessonBlocks sections={modalsSections} />,
  },
  "10": {
    heading: "Adjectives & Adverbs",
    lead: "Describe nouns, and explain how actions happen.",
    sections: sectionIds(adjectivesAdverbsSections),
    hero: {
      src: "/assets/english/form-1/grammar/landing/grammar-topic-10.webp",
      alt: "A fast red car and a moving shoe, representing describing things and describing actions.",
      width: 720,
      height: 480,
      caption: "Describe the thing, or describe the action.",
    },
    render: () => <LessonBlocks sections={adjectivesAdverbsSections} />,
  },
};

export function GrammarLesson({ topicId }: { topicId: GrammarTopicId }) {
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
  const lesson = LESSON_CONFIG[topicId];
  const nextTopic = getGrammarTopic(String(Number(topicId) + 1).padStart(2, "0"));

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
            <h1>{lesson.heading}</h1>
            <p>{lesson.lead}</p>
            <div className="grammar-pill-row">
              <span>Form 1</span>
              <span>Learn at your pace</span>
              <span>{readingProgress}% read</span>
            </div>
          </div>
          {lesson.hero.caption ? (
            <div className="grammar-lesson-hero__art">
              <img
                src={lesson.hero.src}
                alt={lesson.hero.alt}
                width={lesson.hero.width}
                height={lesson.hero.height}
                decoding="async"
                fetchPriority="high"
              />
              <p>{lesson.hero.caption}</p>
            </div>
          ) : (
            <img
              src={lesson.hero.src}
              alt={lesson.hero.alt}
              width={lesson.hero.width}
              height={lesson.hero.height}
              decoding="async"
              fetchPriority={topicId === "02" ? "high" : undefined}
            />
          )}
        </header>

        <div ref={contentRef} className="grammar-lesson-content">
          <div
            data-notes-section-manifest={JSON.stringify(
              [...lesson.sections, `${topicId}-complete`].map((id) => ({ id, weight: 1 })),
            )}
          >
            {lesson.render()}

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
