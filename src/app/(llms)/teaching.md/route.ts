import { TEACHING } from "@/features/portfolio/data/teaching"

const content = `# Teaching & Mentorship

${TEACHING.map((item) => {
  const skills = item.skills?.length
    ? `\n\nSkills: ${item.skills.join(", ")}`
    : ""
  const description = item.description ? `\n\n${item.description.trim()}` : ""
  return `## ${item.role} | ${item.institution}\n\nDuration: ${item.period.start} - ${item.period.end || "Present"}${skills}${description}`
}).join("\n\n")}
`

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
