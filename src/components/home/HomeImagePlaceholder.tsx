type HomeImagePlaceholderProps = {
  label: string;
  aspectRatio?: string;
  mobileAspectRatio?: string;
  className?: string;
};

export function HomeImagePlaceholder({
  label,
  aspectRatio = "4 / 3",
  mobileAspectRatio,
  className = "",
}: HomeImagePlaceholderProps) {
  return (
    <div
      className={`home-image-placeholder ${className}`.trim()}
      style={
        {
          "--home-placeholder-ratio": aspectRatio,
          "--home-placeholder-mobile-ratio": mobileAspectRatio ?? aspectRatio,
        } as CSSProperties
      }
      role="img"
      aria-label={label}
    >
      <span>{label}</span>
      <small>IMAGE PLACEHOLDER · {aspectRatio}</small>
    </div>
  );
}
import type { CSSProperties } from "react";
