import { ArrowRight } from "lucide-react";

export interface ParsedWordEquation {
  reactants: string;
  conditions?: string;
  products: string;
}

/**
 * Splits a textbook word-equation string into its parts, preserving the
 * original wording exactly. Supports two authored formats:
 *   "Reactants → Products"
 *   "Reactants --(Conditions)--> Products"
 */
export function parseWordEquation(equation: string): ParsedWordEquation {
  const conditionMatch = equation.match(/^(.*?)--\((.*?)\)-->(.*)$/);
  if (conditionMatch) {
    return {
      reactants: conditionMatch[1].trim(),
      conditions: conditionMatch[2].trim(),
      products: conditionMatch[3].trim(),
    };
  }
  const [reactants, products] = equation.split("→").map((part) => part.trim());
  return { reactants, products };
}

export function EquationFlow({
  reactants,
  conditions,
  products,
  note,
}: {
  reactants: string;
  conditions?: string;
  products: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-4 sm:p-5">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <span className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-center text-[13px] font-semibold leading-snug text-foreground sm:w-auto sm:flex-1 sm:text-sm">
          {reactants}
        </span>
        <div className="flex shrink-0 flex-col items-center gap-1">
          {conditions && (
            <span className="max-w-[10rem] text-center text-[10px] font-medium leading-tight text-muted-foreground">
              {conditions}
            </span>
          )}
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
        </div>
        <span className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-center text-[13px] font-semibold leading-snug text-foreground sm:w-auto sm:flex-1 sm:text-sm">
          {products}
        </span>
      </div>
      {note && <p className="mt-4 text-center text-[12.5px] leading-relaxed text-muted-foreground">{note}</p>}
    </div>
  );
}
