import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
          "CCBot",
          "cohere-ai",
        ],
        allow: ["/", "/llms.txt", "/*.md"],
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE_INFO.url}/sitemap.xml`,
  }
}
