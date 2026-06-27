import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { SignInModal } from "@/components/SignInModal";

interface Ctx {
  open: () => void;
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
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <SignInModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <SignInModal open={isOpen} onClose={close} />
    </SignInModalContext.Provider>
  );
}

export function useSignInModal() {
  return useContext(SignInModalContext);
}
