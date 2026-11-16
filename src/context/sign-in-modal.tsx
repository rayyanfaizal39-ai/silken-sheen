import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { SignInModal } from "@/components/SignInModal";

type RequestedMode = "signin" | "signup";

interface Ctx {
  open: (mode?: RequestedMode) => void;
  close: () => void;
  isOpen: boolean;
}

const SignInModalContext = createContext<Ctx>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function SignInModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback((mode?: RequestedMode) => {
    if (mode === "signup") {
      window.location.assign("/register");
      return;
    }
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);
  return (
    <SignInModalContext.Provider value={value}>
      {children}
      <SignInModal open={isOpen} onClose={close} />
    </SignInModalContext.Provider>
  );
}

export function useSignInModal() {
  return useContext(SignInModalContext);
}
