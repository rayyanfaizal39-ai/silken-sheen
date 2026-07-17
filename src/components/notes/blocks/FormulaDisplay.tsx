export function FormulaDisplay({ formula }: { formula: string }) {
  return (
    <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-6 text-center">
      <p className="font-display text-base font-bold leading-relaxed text-foreground sm:text-lg">
        {formula}
      </p>
    </div>
  );
}
