import type { ReactNode } from "react";
import "./homePapercraftBackground.css";

type HomePapercraftBackgroundProps = {
  children: ReactNode;
};

export function HomePapercraftBackground({ children }: HomePapercraftBackgroundProps) {
  return (
    <div className="home-papercraft-bg">
      <div className="home-papercraft-texture" aria-hidden="true" />
      <div className="home-stars" aria-hidden="true">
        <span className="home-hanging-star home-hanging-star--one" />
        <span className="home-hanging-star home-hanging-star--two" />
        <span className="home-hanging-star home-hanging-star--three" />
      </div>
      <div className="home-paper-planet" aria-hidden="true">
        <span />
      </div>
      <div className="home-paper-corner home-paper-corner--left" aria-hidden="true" />
      <div className="home-paper-corner home-paper-corner--right" aria-hidden="true" />
      <div className="home-paper-hills home-paper-hills--back" aria-hidden="true" />
      <div className="home-paper-hills home-paper-hills--middle" aria-hidden="true" />
      <div className="home-paper-hills home-paper-hills--front" aria-hidden="true" />
      <div className="home-content">{children}</div>
    </div>
  );
}
