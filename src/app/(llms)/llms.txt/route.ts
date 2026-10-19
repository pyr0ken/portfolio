import { SITE_INFO } from "@/config/site"
import { getBlogPosts, getComponentDocs } from "@/features/doc/data/documents"

const allComponents = getComponentDocs()
const allPosts = getBlogPosts()

const content = `# ${SITE_INFO.name} (${SITE_INFO.url})

> ${SITE_INFO.description}

- [About](${SITE_INFO.url}/about.md): Overview, background, and contact details.
- [Experience](${SITE_INFO.url}/experience.md): Production backend and DevOps roles (MehrsunAi, Ashtanga Yoga Home).
- [Education](${SITE_INFO.url}/education.md): Computer Engineering at Kharazmi University.
- [Teaching](${SITE_INFO.url}/teaching.md): Python programming instruction and mentorship at Chabahar Maritime University.
- [Projects](${SITE_INFO.url}/projects.md): High-concurrency systems, AI Gateways (Oxiroute), and offline privacy tools (Khales).
- [Recognition](${SITE_INFO.url}/recognition.md): National Innovation Award Silver Medalist (Computer Science).
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
