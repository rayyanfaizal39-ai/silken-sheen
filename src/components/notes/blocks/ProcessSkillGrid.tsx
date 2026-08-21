import type { ProcessSkill } from "@/content/form1/science/chapter-1/chapter1-content";

export function ProcessSkillGrid({ skills }: { skills: ProcessSkill[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {skills.map((skill, index) => (
        <article key={skill.name} className="rounded-2xl border border-border bg-secondary/40 p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              {index + 1}
            </span>
            <div>
              <h4 className="font-display text-[13px] font-bold text-foreground">{skill.name}</h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{skill.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
