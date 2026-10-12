import { useEffect, useState } from "react";
import { COMPANION_MESSAGES, getRandomCompanionMessage } from "./messages";
import { NOVA_PERSONALITIES, type NovaPersonalityId } from "./personality";

/** Picks one encouraging message per mount (i.e. once per page load). */
export function useCompanionMessage(personality?: NovaPersonalityId): string {
  // SSR and the browser must produce the same first render. Choosing randomly
  // in the state initializer made each side render different text and caused
  // React hydration error #418 in production. Randomize only after hydration.
  const [message, setMessage] = useState(COMPANION_MESSAGES[0]);

  useEffect(() => {
    const personalMessages = personality
      ? NOVA_PERSONALITIES[personality].messages
      : null;
    setMessage(
      personalMessages
        ? personalMessages[Math.floor(Math.random() * personalMessages.length)]
        : getRandomCompanionMessage(),
    );
  }, [personality]);

  return message;
}
