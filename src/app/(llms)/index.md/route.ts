import { SITE_INFO } from "@/config/site"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { TECH_STACK } from "@/features/portfolio/data/tech-stack"
import { USER } from "@/features/portfolio/data/user"

const content = `# ${USER.displayName} – ${USER.jobTitle}

> ${USER.bio}

- **Website:** ${SITE_INFO.url}
- **Location:** ${USER.address}
- **Pronouns:** ${USER.pronouns}

## Overview

${USER.about.trim()}

## Navigation & Machine-Readable Endpoints

- [About](${SITE_INFO.url}/about.md): Detailed personal information, bio, and background.
- [Experience](${SITE_INFO.url}/experience.md): Production backend and DevOps roles.
- [Education](${SITE_INFO.url}/education.md): Computer Engineering degree at Kharazmi University.
- [Teaching](${SITE_INFO.url}/teaching.md): Mentorship and instructional experience.
- [Projects](${SITE_INFO.url}/projects.md): Systems architecture, Oxiroute, and Khales.
- [Recognition](${SITE_INFO.url}/recognition.md): National Innovation Award Silver Medalist.
- [Blog](${SITE_INFO.url}/blog.md): Technical articles and writeups.
- [llms.txt](${SITE_INFO.url}/llms.txt): LLM manifest file.

## Core Tech Stack

${TECH_STACK.map((item) => `- [${item.title}](${item.href})`).join("\n")}

## Profiles & Contact

${SOCIAL_LINKS.map((item) => `- [${item.title}](${item.href})`).join("\n")}
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
