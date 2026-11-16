import { useEffect, useRef, useState } from "react";

const LOGIN_BACKGROUND_SRC = "/images/login/login-background.webp";

export function AuthPageBackdrop() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imageRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <img
        ref={imageRef}
        src={LOGIN_BACKGROUND_SRC}
        alt=""
        width={896}
        height={1120}
        decoding="async"
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover object-[70%_55%] transition-opacity duration-500 motion-reduce:transition-none ${loaded ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-[#050816]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(139,92,246,0.24),transparent_30%),radial-gradient(circle_at_85%_72%,rgba(14,165,233,0.15),transparent_34%)]" />
    </div>
  );
}
