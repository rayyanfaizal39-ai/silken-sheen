import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Compass, Egg, Sparkles } from "lucide-react";
import { CompanionImage } from "@/companion";
import {
  IDENTITY_QUESTIONS,
  IDENTITY_TYPES,
  scoreLearningIdentity,
  type LearningIdentityResult,
  type NovaArchetype,
} from "@/lib/learning-identity";
import "./LearningIdentityPanel.css";

type Step = "intro" | "questions" | "reward";

export function LearningIdentityPanel({
  identity,
  onComplete,
}: {
  identity?: LearningIdentityResult;
  onComplete: (result: LearningIdentityResult) => void;
}) {
  const [step, setStep] = useState<Step>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<NovaArchetype | null>>(
    () => IDENTITY_QUESTIONS.map(() => null),
  );

  const reward = identity;
  const type = reward ? IDENTITY_TYPES[reward.archetype] : null;
  const question = IDENTITY_QUESTIONS[index];
  const selected = answers[index];
  const progress = (index / IDENTITY_QUESTIONS.length) * 100;

  function finishQuestion() {
    if (!selected) return;
    if (index < IDENTITY_QUESTIONS.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    const validAnswers = answers.filter((answer): answer is NovaArchetype => answer !== null);
    if (validAnswers.length !== IDENTITY_QUESTIONS.length) return;
    onComplete({
      archetype: scoreLearningIdentity(validAnswers),
      awardedAt: new Date().toISOString(),
      quizVersion: 1,
    });
    setStep("reward");
  }

  return (
    <section className="explorer-profile-panel discovery-panel" aria-labelledby="discovery-title">
      <div className="explorer-profile-section-heading">
        <div>
          <p>Self-discovery mission</p>
          <h2 id="discovery-title">Mengenal Diri</h2>
        </div>
        <Compass aria-hidden="true" />
      </div>

      {reward ? (
        <div className="discovery-reward" style={{ "--discovery-glow": type?.glow } as React.CSSProperties}>
          <div className="discovery-egg-wrap">
            <CompanionImage speciesId="nova" stage="egg" size={148} className="discovery-egg" />
            <Sparkles className="discovery-sparkle" aria-hidden="true" />
          </div>
          <span className="discovery-eyebrow"><Check aria-hidden="true" /> MISI SELESAI · TELUR NOVA DIPEROLEH</span>
          <h3>{type?.title} <span>· {type?.tagline}</span></h3>
          <p>{type?.description}</p>
          <p className="discovery-caption">
            Ini hanyalah gambaran gaya belajar kamu. Tiada jawapan betul atau salah.
          </p>
          <Link to="/companion" className="discovery-primary">
            Lihat Nova saya <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      ) : step === "questions" ? (
        <div className="discovery-question" aria-live="polite">
          <div className="discovery-counter">
            <span>Soalan {index + 1} daripada {IDENTITY_QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="discovery-progress-track" aria-hidden="true">
            <div style={{ width: String(progress) + "%" }} />
          </div>
          <h3>{question.prompt}</h3>
          <div className="discovery-options" role="group" aria-label="Pilih jawapan yang paling menggambarkan diri kamu">
            {question.options.map((option) => (
              <button
                key={option.type}
                type="button"
                aria-pressed={selected === option.type}
                className={selected === option.type ? "discovery-option is-selected" : "discovery-option"}
                onClick={() => setAnswers((current) => current.map((value, position) =>
                  position === index ? option.type : value,
                ))}
              >
                <span className="discovery-option-mark" aria-hidden="true">
                  {selected === option.type ? <Check /> : null}
                </span>
                <span>{option.text}</span>
              </button>
            ))}
          </div>
          <div className="discovery-navigation">
            <button type="button" onClick={() => index === 0 ? setStep("intro") : setIndex(index - 1)}>
              <ArrowLeft aria-hidden="true" /> Kembali
            </button>
            <button type="button" disabled={!selected} onClick={finishQuestion}>
              {index === IDENTITY_QUESTIONS.length - 1 ? "Dapatkan Telur" : "Seterusnya"}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <p className="discovery-caption">Jawab mengikut diri sendiri. Tiada markah atau jawapan salah.</p>
        </div>
      ) : (
        <div className="discovery-intro">
          <div className="discovery-egg-wrap">
            <CompanionImage speciesId="nova" stage="egg" size={148} className="discovery-egg" />
            <Sparkles className="discovery-sparkle" aria-hidden="true" />
          </div>
          <span className="discovery-eyebrow"><Egg aria-hidden="true" /> NOVA EGG QUEST</span>
          <h3>Siapakah diri kamu sebagai seorang pelajar?</h3>
          <p>Jawab 8 soalan ringkas untuk menemui gaya belajar unik kamu dan memperoleh Telur Nova istimewa!</p>
          <div className="discovery-intro-facts">
            <span>8 soalan</span><span>± 2 minit</span><span>Tiada jawapan salah</span>
          </div>
          <button type="button" className="discovery-primary" onClick={() => setStep("questions")}>
            Mulakan Penerokaan <ArrowRight aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
