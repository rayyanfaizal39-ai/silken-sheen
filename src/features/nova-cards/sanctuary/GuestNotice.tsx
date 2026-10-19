import { cardsPaths, signInHref } from "../paths";
import "./guest-notice.css";

/** Tells a signed-out student that nothing they do here is saved. */
export function GuestNotice({ compact = false }: { compact?: boolean }) {
  const signIn = signInHref(cardsPaths.studio);
  if (compact)
    return (
      <p className="cc-guest cc-guest--compact" role="note">
        Exploring as a guest · progress isn’t saved · <a href={signIn}>Sign in</a>
      </p>
    );
  return (
    <div className="cc-guest" role="note">
      <p>
        <b>You’re exploring as a guest.</b> Your progress won’t be saved.{" "}
        <a href={signIn}>Sign in</a> to unlock your lifelong Cosmic Companion.
      </p>
    </div>
  );
}
