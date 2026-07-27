type Props = {
  /** direction of the tonal shift */
  from: "light" | "dark";
  to: "light" | "dark";
};

/**
 * A tall gradient bridge between tonal worlds so dark cinematic scenes and
 * clean editorial sections never hard-cut against each other.
 */
export default function SceneTransition({ from, to }: Props) {
  return (
    <div className={`scene-transition scene-transition--${from}-to-${to}`} aria-hidden="true" />
  );
}
