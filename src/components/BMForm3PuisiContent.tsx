import {
  BookOpen,
  Check,
  CheckCircle2,
  GraduationCap,
  Heart,
  Landmark,
  Lightbulb,
  ListChecks,
  Music2,
  Palette,
  Quote,
  Sparkles,
  Target,
} from "lucide-react";
import {
  InfoCards,
  ObjectiveQuestion,
  Pill,
  SectionTitle,
  StudySection,
  SubjectiveQuestion,
} from "@/components/BMForm2KomsasStructure";

export interface BMForm3PuisiQA {
  question: string;
  answer: string;
}

export interface BMForm3PuisiObjectiveQA {
  question: string;
  options: readonly string[];
  answer: string;
}

export interface BMForm3PuisiData {
  focus: string[];
  introduction: string;
  overallMeaning: string;
  stanzaLabel: string;
  stanzas: string[];
  theme: { title: string; explanation: string };
  issues: readonly (readonly [string, string])[];
  facts: readonly (readonly [string, string])[];
  language: readonly (readonly [string, string, string])[];
  sound: readonly (readonly [string, string])[];
  tone: { title: string; explanation: string };
  values: readonly (readonly [string, string])[];
  lessons: string[];
  tip: string;
  objectiveQuestions: BMForm3PuisiObjectiveQA[];
  subjectiveQuestions: BMForm3PuisiQA[];
  kbatQuestions: BMForm3PuisiQA[];
  quickNotes: readonly (readonly [string, string])[];
  keyFacts: string[];
  checklist: string[];
}

export function BMForm3PuisiContent({ data }: { data: BMForm3PuisiData }) {
  return (
    <div className="divide-y divide-white/[0.06]">
      <StudySection>
        <SectionTitle
          icon={<Target className="h-5 w-5" />}
          eyebrow="Fokus Pembelajaran"
          title="Fokus Pembelajaran"
          color="#60A5FA"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          {data.focus.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 rounded-xl bg-sky-300/[0.06] px-4 py-3 text-sm text-white/70"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              {item}
            </div>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Kenali Karya"
          title="Pengenalan"
          color="#A78BFA"
        />
        <div className="rounded-2xl border border-purple-300/15 bg-purple-300/[0.06] p-5 text-sm leading-7 text-white/70">
          {data.introduction}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Quote className="h-5 w-5" />}
          eyebrow="Maksud Keseluruhan"
          title="Maksud Keseluruhan"
          color="#FBBF24"
        />
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-5 sm:p-6">
          <p className="text-sm leading-7 text-white/70">{data.overallMeaning}</p>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Kupas Rangkap"
          title="Maksud Setiap Rangkap"
          color="#A78BFA"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {data.stanzas.map((detail, index) => (
            <article
              key={detail}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-400/10 text-xs font-black text-purple-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-white">
                  {data.stanzaLabel} {index + 1}
                </h3>
              </div>
              <p className="text-sm leading-6 text-white/65">{detail}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Idea Utama"
          title="Tema"
          color="#F472B6"
        />
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5 sm:p-6">
          <Pill color="#F472B6">Tema Utama</Pill>
          <h3 className="mt-4 font-display text-lg font-bold text-white">{data.theme.title}</h3>
          <p className="mt-3 text-sm leading-6 text-white/65">{data.theme.explanation}</p>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Lightbulb className="h-5 w-5" />}
          eyebrow="Kupas Karya"
          title="Persoalan"
          color="#60A5FA"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {data.issues.map(([title, detail], index) => (
            <article
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-xs font-black text-sky-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-bold leading-6 text-white">{title}</h3>
              </div>
              <p className="text-xs leading-5 text-white/60">{detail}</p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Palette className="h-5 w-5" />}
          eyebrow="Binaan Karya"
          title="Bentuk dan Ciri-ciri"
          color="#34D399"
        />
        <InfoCards items={data.facts} />
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Palette className="h-5 w-5" />}
          eyebrow="Seni Bahasa"
          title="Gaya Bahasa"
          color="#FBBF24"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {data.language.map(([title, detail, evidence]) => (
            <article
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <h3 className="font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm text-white/55">{detail}</p>
              <p className="mt-3 rounded-xl bg-amber-300/[0.07] px-3 py-2.5 text-sm italic text-amber-100/80">
                {evidence}
              </p>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Dengar Irama"
          title="Keindahan Bunyi"
          color="#22D3EE"
        />
        <InfoCards items={data.sound} />
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Music2 className="h-5 w-5" />}
          eyebrow="Suara Penyair"
          title="Nada"
          color="#A78BFA"
        />
        <div className="rounded-2xl border border-purple-300/15 bg-purple-300/[0.06] p-5">
          <h3 className="font-bold text-white">{data.tone.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">{data.tone.explanation}</p>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Heart className="h-5 w-5" />}
          eyebrow="Bina Peribadi"
          title="Nilai"
          color="#FB7185"
        />
        <InfoCards items={data.values} />
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<GraduationCap className="h-5 w-5" />}
          eyebrow="Amalkan"
          title="Pengajaran"
          color="#34D399"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {data.lessons.map((item, index) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-xs font-black text-emerald-300">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-white/65">{item}</p>
            </div>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Target className="h-5 w-5" />}
          eyebrow="Strategi Peperiksaan"
          title="Tip UASA"
          color="#FBBF24"
        />
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-sm leading-6 text-white/65">{data.tip}</p>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<ListChecks className="h-5 w-5" />}
          eyebrow="Uji Penguasaan"
          title="Contoh Soalan UASA"
          color="#C084FC"
        />
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-bold text-white/60">Soalan Objektif</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.objectiveQuestions.map((q, index) => (
                <ObjectiveQuestion
                  key={q.question}
                  index={index + 1}
                  question={q.question}
                  options={q.options}
                  answer={q.answer}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold text-white/60">Soalan Subjektif</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.subjectiveQuestions.map((q, index) => (
                <SubjectiveQuestion
                  key={q.question}
                  index={index + 1}
                  question={q.question}
                  answer={q.answer}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold text-white/60">Soalan KBAT</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.kbatQuestions.map((q, index) => (
                <SubjectiveQuestion
                  key={q.question}
                  index={index + 1}
                  question={q.question}
                  answer={q.answer}
                  answerLabel="Jawapan (Cadangan)"
                  badgeColor="indigo"
                />
              ))}
            </div>
          </div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Ulang Kaji Pantas"
          title="Nota Kilat"
          color="#60A5FA"
        />
        <InfoCards items={data.quickNotes} />
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<Landmark className="h-5 w-5" />}
          eyebrow="Wajib Ingat"
          title="Fakta Penting"
          color="#FBBF24"
        />
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-5">
          <ul className="space-y-2">
            {data.keyFacts.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle
          icon={<CheckCircle2 className="h-5 w-5" />}
          eyebrow="Semak Kemajuan"
          title="Checklist Penguasaan"
          color="#34D399"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          {data.checklist.map((item) => (
            <label
              key={item}
              className="flex min-h-12 items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm font-semibold text-white/65"
            >
              <input type="checkbox" className="h-4 w-4 accent-emerald-400" />
              {item}
            </label>
          ))}
        </div>
      </StudySection>
    </div>
  );
}
