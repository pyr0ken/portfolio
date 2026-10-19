export type Teaching = {
  id: string
  institution: string
  role: string
  period: {
    start: string
    end?: string
  }
  description?: string
  skills?: string[]
  isExpanded?: boolean
}
