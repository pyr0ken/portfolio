import content from "@/data/portfolio-content.json"
import {
  BoxIcon,
  CalendarCheckIcon,
  CpuIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
} from "lucide-react"

import type { Project } from "../types/projects"

const PROJECT_ICONS: Record<string, React.ReactElement> = {
  oxiroute: <CpuIcon className="size-4" />,
  "interactive-3d-lab": <BoxIcon className="size-4" />,
  "online-reservation-system": <CalendarCheckIcon className="size-4" />,
  khales: <ShieldCheckIcon className="size-4" />,
  "e-commerce-platform": <ShoppingCartIcon className="size-4" />,
  vahedyar: <GraduationCapIcon className="size-4" />,
}

export const PROJECTS: Project[] = (content.projects as Project[]).map((p) => ({
  ...p,
  icon: PROJECT_ICONS[p.id] ?? <CpuIcon className="size-4" />,
}))
