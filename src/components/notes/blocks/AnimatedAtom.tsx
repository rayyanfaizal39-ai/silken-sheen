export interface AtomParticle {
  name: string;
  charge: string;
  location: string;
}

const DOT_CLASS = ["bg-red-400", "bg-muted-foreground", "bg-primary"];

export function AnimatedAtom({ particles }: { particles: AtomParticle[] }) {
  const [proton, neutron, electron] = particles;

  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4 sm:p-5">
      <div className="flex justify-center py-2">
        <svg width="220" height="220" viewBox="0 0 300 300" className="overflow-visible">
          <ellipse cx="150" cy="150" rx="120" ry="50" fill="none" className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="3 4" opacity="0.35" />
          <ellipse cx="150" cy="150" rx="70" ry="120" fill="none" className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="3 4" opacity="0.35" />
          <circle cx="145" cy="148" r="7" className="fill-red-400" />
          <circle cx="155" cy="150" r="7" className="fill-muted-foreground" />
          <circle cx="150" cy="140" r="7" className="fill-red-400" />
          <circle cx="148" cy="158" r="7" className="fill-muted-foreground" />
          <circle cx="158" cy="145" r="7" className="fill-red-400" />
          <g className="notes-atom-orbit-a">
            <circle cx="270" cy="150" r="6" className="fill-primary" />
          </g>
          <g className="notes-atom-orbit-b">
            <circle cx="150" cy="30" r="6" className="fill-primary" />
          </g>
        </svg>
      </div>
      <div className="mt-2 grid gap-2.5 sm:grid-cols-3">
        {[proton, neutron, electron].map((p, i) => (
          <div key={p.name} className="flex items-start gap-2 rounded-xl border border-border bg-card/60 px-3 py-2.5 text-[11.5px]">
            <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${DOT_CLASS[i]}`} />
            <span className="text-muted-foreground">
              <b className="text-foreground">{p.name}</b> ({p.charge})
              <br />
              {p.location}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
