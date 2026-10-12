import { BriefcaseBusinessIcon, CodeXmlIcon } from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "mehrsunai",
    companyName: "MehrsunAi",
    companyWebsite: "https://mehrsunai.com",
    companyIcon: (
      <BriefcaseBusinessIcon className="size-4 text-muted-foreground" />
    ),
    location: "Tehran Province, Iran",
    locationType: "Hybrid",
    positions: [
      {
        id: "mehrsunai-se",
        title: "Software Engineer",
        employmentPeriod: {
          start: "09.2025",
          end: "09.2026",
        },
        employmentType: "Part-time",
        icon: <CodeXmlIcon />,
        description: `- Built scalable RESTful APIs with JWT/OAuth2 security, handling thousands of concurrent users.
- Automated deployment using Docker, Kubernetes, and CI/CD (GitLab/GitHub Actions), reducing release time by 40%.
- Cut API latency by 30% with Redis caching and optimized database queries.
- Set up monitoring (Prometheus/Grafana) and centralized logging (ELK) to maintain 99.9% uptime.
- Documented all APIs with Swagger and Postman for seamless team collaboration.`,
        skills: [
          "Python",
          "FastAPI",
          "Django REST Framework",
          "Docker",
          "Kubernetes",
          "CI/CD",
          "Redis",
          "PostgreSQL",
          "Prometheus",
          "Grafana",
          "ELK",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "ashtangayogahome",
    companyName: "Ashtanga Yoga Home",
    companyWebsite: "https://ashtangayogahome.com",
    companyIcon: (
      <BriefcaseBusinessIcon className="size-4 text-muted-foreground" />
    ),
    location: "Finland",
    locationType: "Remote",
    positions: [
      {
        id: "ashtanga-be",
        title: "Backend Developer",
        employmentPeriod: {
          start: "07.2023",
          end: "08.2024",
        },
        employmentType: "Freelance",
        icon: <CodeXmlIcon />,
        description: `- Developed a booking and CRM system using Django Rest Framework (MVC) with class scheduling, user auth, and subscription packages.
- Integrated secure payment gateways via webhooks and built a ticketing system—prevented double-booking using PostgreSQL transactions.
- Improved database performance by 25% through indexing, optimized SQL, and caching.
- Documented all endpoints with Swagger and created onboarding guides for frontend teams.`,
        skills: [
          "Python",
          "Django REST Framework",
          "PostgreSQL",
          "Redis",
          "Webhooks",
          "SQL",
          "Transactions",
          "Swagger",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: false,
  },
]
