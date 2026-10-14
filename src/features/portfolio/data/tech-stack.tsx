import content from "@/data/portfolio-content.json"

import type { TechStack } from "../types/tech-stack"

type RawTechStack = {
  key: string
  title: string
  href: string
  categories: string[]
}

const rawList: RawTechStack[] =
  (content as { techStack?: RawTechStack[] }).techStack || []

export const TECH_STACK: TechStack[] = rawList.map((item) => ({
  key: item.key || item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  title: item.title,
  href: item.href,
  categories: item.categories,
}))
