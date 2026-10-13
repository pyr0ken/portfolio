import type { Route } from "next"

import type { NavItem } from "@/types/nav"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || "https://pyr0ken.ir",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const LICENSE = {
  name: "MIT License",
  url: "https://github.com/pyr0ken/portfolio/blob/main/LICENSE",
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Stack",
    href: "/#stack" as Route,
  },
  {
    title: "Experience",
    href: "/#experience" as Route,
  },
  {
    title: "Projects",
    href: "/#projects" as Route,
  },
  {
    title: "Honors",
    href: "/#recognition" as Route,
  },
  {
    title: "Education",
    href: "/#education" as Route,
  },
]

export const MOBILE_NAV: NavItem<Route>[] = [
  {
    title: "Home",
    href: "/",
  },
  ...MAIN_NAV,
]

export const X_HANDLE = SOCIAL.x.handle
export const GITHUB_USERNAME = SOCIAL.github.handle
export const SOURCE_CODE_GITHUB_REPO = "pyr0ken/portfolio"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/pyr0ken/portfolio"

export const SPONSORSHIP_URL = "https://github.com/pyr0ken"

export const UTM_PARAMS = {
  utm_source: "pyr0ken.ir",
}
