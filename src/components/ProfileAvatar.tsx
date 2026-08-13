import { getProfileAvatar, type ProfileAvatarId } from "@/data/profile-avatars";
import type { ProfileAvatarSource } from "@/hooks/use-progress";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  source?: ProfileAvatarSource;
  googleUrl?: string;
  avatarId?: ProfileAvatarId;
  name?: string;
  size?: number;
  className?: string;
}

export function ProfileAvatar({
  source = "google",
  googleUrl,
  avatarId,
  name = "Student",
  size = 40,
  className,
}: ProfileAvatarProps) {
  const useGooglePhoto = source === "google" && Boolean(googleUrl);
  const academyAvatar = getProfileAvatar(avatarId);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden bg-[#11172A] ring-1 ring-white/15",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <img
        src={useGooglePhoto ? googleUrl : academyAvatar.src}
        alt={
          useGooglePhoto
            ? `${name}'s Google profile photo`
            : `${academyAvatar.name} avatar selected by ${name}`
        }
        width={size}
        height={size}
        referrerPolicy={useGooglePhoto ? "no-referrer" : undefined}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
