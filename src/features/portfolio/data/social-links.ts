import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles — the single source of truth.
 */
export const SOCIAL = {
  x: {
    title: "X",
    handle: "@pyr0ken",
    href: "https://x.com/pyr0ken",
    sameAs: true,
  },
  github: {
    title: "GitHub",
    handle: "pyr0ken",
    href: "https://github.com/pyr0ken",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "mohammad-hossein-yaghoubi",
    href: "https://www.linkedin.com/in/mohammad-hossein-yaghoubi/",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
