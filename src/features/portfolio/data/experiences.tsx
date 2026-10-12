import content from "@/data/portfolio-content.json"
import { BriefcaseBusinessIcon, CodeXmlIcon } from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = (
  content.experiences as Array<{
    id: string
    companyName: string
    companyWebsite?: string
    location?: string
    locationType?: string
    isCurrentEmployer?: boolean
    positions: Array<{
      id: string
      title: string
      employmentPeriod: { start: string; end?: string }
      employmentType?: string
      description?: string
      skills?: string[]
      isExpanded?: boolean
    }>
  }>
).map((exp) => ({
  ...exp,
  locationType:
    (exp.locationType as "Hybrid" | "Remote" | "On-site") || "Remote",
  companyIcon: (
    <BriefcaseBusinessIcon className="size-4 text-muted-foreground" />
  ),
  positions: exp.positions.map((pos) => ({
    ...pos,
    icon: <CodeXmlIcon />,
  })),
}))
