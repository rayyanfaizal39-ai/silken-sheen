export const DEFAULT_PROFILE_AVATAR_ID = "explorer";

export const PROFILE_AVATARS = [
  {
    id: "explorer",
    name: "Explorer",
    description: "Dream, learn, and achieve.",
    src: "/profile-avatars/explorer.png",
  },
  {
    id: "ai-robot",
    name: "AI Robot",
    description: "Smarter, stronger, brighter.",
    src: "/profile-avatars/ai-robot.png",
  },
  {
    id: "space-cat",
    name: "Space Cat",
    description: "Pawsitive cosmic vibes.",
    src: "/profile-avatars/space-cat.png",
  },
  {
    id: "friendly-alien",
    name: "Friendly Alien",
    description: "A cheerful friend from the stars.",
    src: "/profile-avatars/friendly-alien.png",
  },
] as const;

export type ProfileAvatarId = (typeof PROFILE_AVATARS)[number]["id"];

export function getProfileAvatar(id?: string) {
  return (
    PROFILE_AVATARS.find((avatar) => avatar.id === id) ??
    PROFILE_AVATARS.find((avatar) => avatar.id === DEFAULT_PROFILE_AVATAR_ID)!
  );
}
