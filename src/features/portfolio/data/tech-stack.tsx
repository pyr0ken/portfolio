import {
  ActivityIcon,
  BoxesIcon,
  CpuIcon,
  DatabaseIcon,
  GlobeIcon,
  LayersIcon,
  LineChartIcon,
  ServerIcon,
  ShieldCheckIcon,
  TerminalIcon,
  WorkflowIcon,
} from "lucide-react"

import type { TechStack } from "../types/tech-stack"

export const TECH_STACK: TechStack[] = [
  // 01: Backend & APIs
  {
    key: "python",
    title: "Python",
    href: "https://www.python.org",
    icon: <TerminalIcon className="size-3.5" />,
    categories: ["Backend & APIs"],
  },
  {
    key: "fastapi",
    title: "FastAPI",
    href: "https://fastapi.tiangolo.com",
    icon: <ServerIcon className="size-3.5" />,
    categories: ["Backend & APIs"],
  },
  {
    key: "django",
    title: "Django",
    href: "https://www.djangoproject.com",
    icon: <ServerIcon className="size-3.5" />,
    categories: ["Backend & APIs"],
  },
  {
    key: "drf",
    title: "Django REST Framework",
    href: "https://www.django-rest-framework.org",
    icon: <ServerIcon className="size-3.5" />,
    categories: ["Backend & APIs"],
  },
  {
    key: "rest",
    title: "RESTful APIs / OpenAPI",
    href: "https://www.openapis.org",
    icon: <GlobeIcon className="size-3.5" />,
    categories: ["Backend & APIs"],
  },

  // 02: Databases & Queues
  {
    key: "postgresql",
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
    icon: <DatabaseIcon className="size-3.5" />,
    categories: ["Databases & Queues"],
  },
  {
    key: "redis",
    title: "Redis",
    href: "https://redis.io",
    icon: <DatabaseIcon className="size-3.5" />,
    categories: ["Databases & Queues"],
  },
  {
    key: "rabbitmq",
    title: "RabbitMQ",
    href: "https://www.rabbitmq.com",
    icon: <BoxesIcon className="size-3.5" />,
    categories: ["Databases & Queues"],
  },
  {
    key: "celery",
    title: "Celery",
    href: "https://docs.celeryq.dev",
    icon: <WorkflowIcon className="size-3.5" />,
    categories: ["Databases & Queues"],
  },
  {
    key: "sqlcipher",
    title: "SQLite & SQLCipher",
    href: "https://www.zetetic.net/sqlcipher",
    icon: <ShieldCheckIcon className="size-3.5" />,
    categories: ["Databases & Queues"],
  },

  // 03: DevOps & Cloud
  {
    key: "docker",
    title: "Docker",
    href: "https://www.docker.com",
    icon: <BoxesIcon className="size-3.5" />,
    categories: ["DevOps & Cloud"],
  },
  {
    key: "kubernetes",
    title: "Kubernetes",
    href: "https://kubernetes.io",
    icon: <LayersIcon className="size-3.5" />,
    categories: ["DevOps & Cloud"],
  },
  {
    key: "linux",
    title: "Linux & Shell",
    href: "https://www.kernel.org",
    icon: <TerminalIcon className="size-3.5" />,
    categories: ["DevOps & Cloud"],
  },
  {
    key: "cicd",
    title: "CI/CD (GitHub Actions / GitLab)",
    href: "https://github.com/features/actions",
    icon: <WorkflowIcon className="size-3.5" />,
    categories: ["DevOps & Cloud"],
  },
  {
    key: "nginx",
    title: "NGINX",
    href: "https://nginx.org",
    icon: <ServerIcon className="size-3.5" />,
    categories: ["DevOps & Cloud"],
  },

  // 04: Observability & Monitoring
  {
    key: "prometheus",
    title: "Prometheus",
    href: "https://prometheus.io",
    icon: <ActivityIcon className="size-3.5" />,
    categories: ["Observability & Monitoring"],
  },
  {
    key: "grafana",
    title: "Grafana",
    href: "https://grafana.com",
    icon: <LineChartIcon className="size-3.5" />,
    categories: ["Observability & Monitoring"],
  },
  {
    key: "elk",
    title: "ELK Stack",
    href: "https://www.elastic.co/what-is/elk-stack",
    icon: <ActivityIcon className="size-3.5" />,
    categories: ["Observability & Monitoring"],
  },

  // 05: Systems & Languages
  {
    key: "rust",
    title: "Rust",
    href: "https://www.rust-lang.org",
    icon: <CpuIcon className="size-3.5" />,
    categories: ["Systems & Languages"],
  },
  {
    key: "kotlin",
    title: "Kotlin",
    href: "https://kotlinlang.org",
    icon: <TerminalIcon className="size-3.5" />,
    categories: ["Systems & Languages"],
  },
  {
    key: "sql",
    title: "SQL",
    href: "https://en.wikipedia.org/wiki/SQL",
    icon: <DatabaseIcon className="size-3.5" />,
    categories: ["Systems & Languages"],
  },
  {
    key: "typescript",
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
    icon: <TerminalIcon className="size-3.5" />,
    categories: ["Systems & Languages"],
  },

  // 06: Frontend & 3D
  {
    key: "react",
    title: "React",
    href: "https://react.dev",
    icon: <LayersIcon className="size-3.5" />,
    categories: ["Frontend & 3D"],
  },
  {
    key: "tailwind",
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
    icon: <GlobeIcon className="size-3.5" />,
    categories: ["Frontend & 3D"],
  },
  {
    key: "threejs",
    title: "Three.js",
    href: "https://threejs.org",
    icon: <BoxesIcon className="size-3.5" />,
    categories: ["Frontend & 3D"],
  },
  {
    key: "r3f",
    title: "React Three Fiber",
    href: "https://r3f.docs.pmnd.rs",
    icon: <BoxesIcon className="size-3.5" />,
    categories: ["Frontend & 3D"],
  },
]
