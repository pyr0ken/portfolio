import content from "@/data/portfolio-content.json"

import type { Teaching } from "@/features/portfolio/types/teaching"

export const TEACHING: Teaching[] = (content.teaching || []) as Teaching[]
