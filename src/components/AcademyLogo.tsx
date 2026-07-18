import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const ACADEMY_BRAND_ASSETS = {
  full: "/branding/academy-logo-full.svg",
  icon: "/branding/academy-icon.svg",
} as const;

type AcademyLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  variant?: keyof typeof ACADEMY_BRAND_ASSETS;
};

/** Official AcadeMY artwork. Intrinsic dimensions preserve its aspect ratio and prevent layout shift. */
export function AcademyLogo({
  variant = "full",
  className,
  alt = variant === "full" ? "AcadeMY" : "AcadeMY icon",
  ...props
}: AcademyLogoProps) {
  const isFullLogo = variant === "full";

  return (
    <img
      src={ACADEMY_BRAND_ASSETS[variant]}
      alt={alt}
      width={isFullLogo ? 136 : 32}
      height={32}
      draggable={false}
      className={cn("block max-w-full shrink-0 object-contain", className)}
      {...props}
    />
  );
}
