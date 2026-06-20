import { useState } from "react";
import { getRandomCompanionMessage } from "./messages";

/** Picks one encouraging message per mount (i.e. once per page load). */
export function useCompanionMessage(): string {
  const [message] = useState(getRandomCompanionMessage);
  return message;
}
